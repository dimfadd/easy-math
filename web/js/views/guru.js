// Dasbor guru: kelas dengan kode gabung, tugas bertenggat, matriks siswa × tugas,
// analisis soal yang paling sering salah, tambah siswa, dan ekspor CSV.
import { KELAS, LESSONS, kelasOf } from '../../content/index.js';
import * as api from '../api.js';
import { t } from '../i18n.js';
import { auth } from '../auth.js';
import { kelasName, babTitle, lessonTitle, localLesson, localExtra } from '../l10n.js';
import { stripMarkup } from '../shapes.js';
import { app, topbar, bindTopbar, ICON, avatar, setTitle, fmtDate, esc, lessonHref, stateBox } from '../ui.js';
import { taskStatus, taskTitle, streak } from '../habits.js';

const DAY = 86400000;
const errText = (e) => t(`err.${e?.code}`) !== `err.${e?.code}` ? t(`err.${e.code}`) : t('err.generic');
const dateInput = (ms) => new Date(ms - new Date(ms).getTimezoneOffset() * 60000).toISOString().slice(0, 10);

// Label soal untuk analisis: teks soal bank, atau "soal acak jenis N" untuk soal generator
function itemLabel(key) {
  const g = key.match(/^(.+)~g(\d+)$/);
  if (g) {
    const e = LESSONS.get(g[1]);
    return { lesson: g[1], text: e ? `${lessonTitle(e.lesson)} · ${t('guru.genType', { n: +g[2] + 1 })}` : key };
  }
  const h = key.match(/^(.+)#(x?)(\d+)$/);
  if (!h) return { lesson: null, text: key };
  if (h[2]) {
    const b = Object.values(KELAS).flatMap((k) => k.babs).find((x) => x.id === h[1]);
    const q = b ? localExtra(b)[+h[3]] : null;
    return { lesson: null, text: q ? stripMarkup(q.q) : key };
  }
  const e = LESSONS.get(h[1]);
  const q = e ? localLesson(e.lesson).quiz[+h[3]] : null;
  return { lesson: h[1], text: q ? stripMarkup(q.q) : key };
}

function hardest(students) {
  const agg = {};
  for (const s of students)
    for (const [k, [n, w]] of Object.entries(s.progress.items || {})) {
      const a = (agg[k] = agg[k] || { n: 0, w: 0, who: 0 });
      a.n += n;
      a.w += w;
      if (w) a.who++;
    }
  return Object.entries(agg)
    .filter(([, a]) => a.n >= 2 && a.w > 0)
    .sort((x, y) => y[1].w / y[1].n - x[1].w / x[1].n || y[1].w - x[1].w)
    .slice(0, 6)
    .map(([k, a]) => ({ key: k, ...a, ...itemLabel(k) }));
}

function targetOptions(kelas, kind) {
  const k = kelasOf(kelas);
  if (!k) return '';
  if (kind === 'uji') return k.babs.map((b) => `<option value="${b.id}">${esc(t('bab.short', { no: b.no, title: babTitle(b) }))}</option>`).join('');
  return k.babs
    .map((b) => `<optgroup label="${esc(t('bab.short', { no: b.no, title: babTitle(b) }))}">${b.lessons.map((l, i) => `<option value="${l.id}">${b.no}.${i + 1} ${esc(lessonTitle(l))}</option>`).join('')}</optgroup>`)
    .join('');
}

function csv(rep) {
  const cols = rep.assignments;
  const head = [t('guru.csvName'), t('login.uname'), ...cols.map((c) => taskTitle(c))];
  const rows = rep.students.map((s) => [
    s.profile.name,
    s.profile.username,
    ...cols.map((c) => {
      const st = taskStatus(c, s.progress);
      return st.done ? (st.score ? `${st.score.ok}/${st.score.total}` : t('guru.done')) : st.overdue ? t('guru.missing') : '';
    }),
  ]);
  return [head, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
}

export async function viewGuru(params = {}) {
  setTitle(t('nav.class'));
  app.innerHTML = `${topbar('app')}<main id="main" class="page-dash"><p class="muted">${t('dash.loading')}</p></main>`;
  bindTopbar();
  const st = { classes: [], cur: null, rep: null, form: null, err: '', newStudent: null, busy: false };
  try {
    st.classes = await api.listClasses(auth.account.id);
  } catch {
    st.err = t('err.offline');
  }
  st.cur = st.classes.find((c) => c.id === params.c)?.id || st.classes[0]?.id || null;

  const load = async () => {
    st.rep = st.cur ? await api.classReport(auth.account.id, st.cur).catch(() => null) : null;
  };
  await load();

  const render = () => {
    const rep = st.rep;
    const cls = rep?.cls;
    const now = Date.now();
    const students = rep?.students || [];
    const tasks = rep?.assignments || [];
    const hard = rep ? hardest(students) : [];
    const picker =
      st.classes.length > 1
        ? `<label class="cls-pick">${t('guru.class')} <select id="clsSel">${st.classes.map((c) => `<option value="${c.id}" ${c.id === st.cur ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>`
        : '';
    const taskRows = tasks
      .map((tk) => {
        const sts = students.map((s) => taskStatus(tk, s.progress, now));
        const done = sts.filter((x) => x.done).length;
        const scored = sts.filter((x) => x.score);
        const avg = scored.length ? Math.round((scored.reduce((a, x) => a + x.score.ok / x.score.total, 0) / scored.length) * 100) : null;
        const over = now > tk.due;
        return `<li class="task-row">
          <div class="task-main">
            <span class="task-kind k-${tk.kind}">${t(`task.kind.${tk.kind}`)}</span>
            <strong>${esc(taskTitle(tk))}</strong>
            <span class="muted small">${t('guru.due', { date: fmtDate(tk.due) })}${over ? ` · ${t('guru.closed')}` : ''}</span>
          </div>
          <div class="task-meta">
            <span class="task-count"><strong>${done}/${students.length}</strong> ${t('guru.doneShort')}</span>
            ${avg !== null ? `<span class="task-avg">${t('guru.avg', { n: avg })}</span>` : ''}
            <button type="button" class="btn btn-ghost btn-sm" data-del="${tk.id}" aria-label="${t('guru.delete')}">${ICON.x}</button>
          </div>
        </li>`;
      })
      .join('');
    const matrix = tasks.length && students.length
      ? `<div class="mx-wrap"><table class="mx">
          <thead><tr><th scope="col">${t('guru.student')}</th>${tasks.map((tk, i) => `<th scope="col" title="${esc(taskTitle(tk))}">${t('guru.taskN', { n: tasks.length - i })}</th>`).join('')}<th scope="col">${t('guru.streak')}</th></tr></thead>
          <tbody>${students
            .map((s) => `<tr><th scope="row"><span class="mx-name">${avatar(s.profile, 26)}${esc(s.profile.name)}</span></th>${tasks
              .map((tk) => {
                const x = taskStatus(tk, s.progress, now);
                if (x.done) return `<td class="mx-ok${x.late ? ' mx-late' : ''}" title="${x.late ? t('guru.late') : t('guru.done')}">${x.score ? `${x.score.ok}/${x.score.total}` : ICON.check}</td>`;
                return `<td class="${x.overdue ? 'mx-miss' : 'mx-todo'}">${x.overdue ? t('guru.missingShort') : '·'}</td>`;
              })
              .join('')}<td>${streak(s.progress.days)}</td></tr>`)
            .join('')}</tbody>
        </table></div>
        <p class="muted small mx-key"><span class="mx-ok">3/5</span> ${t('guru.keyDone')} <span class="mx-ok mx-late">3/5</span> ${t('guru.keyLate')} <span class="mx-miss">${t('guru.missingShort')}</span> ${t('guru.keyMiss')}</p>`
      : '';
    const form =
      st.form === 'task'
        ? `<form class="form panel-form" id="f-task">
            <h3>${t('guru.newTask')}</h3>
            <label for="tk-kind">${t('guru.kind')}</label>
            <select id="tk-kind"><option value="latihan">${t('task.kind.latihan')}</option><option value="materi">${t('task.kind.materi')}</option><option value="uji">${t('task.kind.uji')}</option></select>
            <label for="tk-target">${t('guru.target')}</label>
            <select id="tk-target">${targetOptions(cls.kelas, 'latihan')}</select>
            <label for="tk-due">${t('guru.dueLabel')}</label>
            <input id="tk-due" type="date" value="${dateInput(now + 7 * DAY)}" min="${dateInput(now)}">
            ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
            <div class="end-actions"><button class="btn btn-primary" type="submit" ${st.busy ? 'disabled' : ''}>${t('guru.give')}</button><button class="btn btn-ghost" type="button" data-act="cancel">${t('guru.cancel')}</button></div>
          </form>`
        : st.form === 'student'
          ? `<form class="form panel-form" id="f-stu">
              <h3>${t('guru.addStudent')}</h3>
              <label for="stu-name">${t('prof.childName')}</label><input id="stu-name" autocomplete="off" required>
              ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
              <div class="end-actions"><button class="btn btn-primary" type="submit" ${st.busy ? 'disabled' : ''}>${t('guru.add')}</button><button class="btn btn-ghost" type="button" data-act="cancel">${t('guru.cancel')}</button></div>
            </form>`
          : st.form === 'class'
            ? `<form class="form panel-form" id="f-cls">
                <h3>${t('guru.newClass')}</h3>
                <label for="cls-name">${t('guru.className')}</label><input id="cls-name" placeholder="${t('guru.classPh')}" required>
                <label for="cls-k">${t('signup.kelas')}</label><select id="cls-k">${KELAS.map((k) => `<option value="${k.key}">${esc(kelasName(k))}</option>`).join('')}</select>
                ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
                <div class="end-actions"><button class="btn btn-primary" type="submit" ${st.busy ? 'disabled' : ''}>${t('guru.create')}</button><button class="btn btn-ghost" type="button" data-act="cancel">${t('guru.cancel')}</button></div>
              </form>`
            : '';

    app.innerHTML = `${topbar('app')}<main id="main" class="page-dash page-guru">
      <header class="dash-head">
        <div><p class="pill">${esc(auth.account.school || t('nav.class'))}</p><h1>${cls ? esc(cls.name) : t('guru.h')}</h1></div>
        <div class="dash-head-act">${picker}<button type="button" class="btn btn-ghost btn-sm" data-act="class">${t('guru.newClass')}</button></div>
      </header>
      ${
        !cls
          ? stateBox(t('guru.noClass'), t('guru.noClassB'), `<button type="button" class="btn btn-primary" data-act="class">${t('guru.newClass')}</button>`) + form
          : `
      <section class="code-card" aria-labelledby="code-h">
        <div>
          <h2 id="code-h">${t('guru.codeH')}</h2>
          <p class="muted">${t('guru.codeB')}</p>
        </div>
        <div class="code-box"><span class="code" aria-label="${t('guru.codeH')}">${esc(cls.code)}</span><button type="button" class="btn btn-ghost btn-sm" data-copy="${esc(cls.code)}">${t('guru.copy')}</button></div>
        <p class="muted small">${t('guru.size', { n: students.length, k: esc(kelasName(kelasOf(cls.kelas))) })}</p>
      </section>
      ${st.newStudent ? `<div class="banner ok"><div><strong>${t('guru.added', { name: esc(st.newStudent.name) })}</strong><p>${t('login.uname')}: <strong>${esc(st.newStudent.username)}</strong> · PIN: <strong>${esc(st.newStudent.pin)}</strong></p></div></div>` : ''}

      <section class="dash-sec" aria-labelledby="tasks-h">
        <div class="sec-head"><h2 id="tasks-h">${t('guru.tasks')}</h2><button type="button" class="btn btn-primary btn-sm" data-act="task">${t('guru.newTask')}</button></div>
        ${form}
        ${tasks.length ? `<ul class="task-list">${taskRows}</ul>` : `<p class="muted">${t('guru.noTasks')}</p>`}
      </section>

      <section class="dash-sec" aria-labelledby="mx-h">
        <div class="sec-head"><h2 id="mx-h">${t('guru.progress')}</h2>
          <div class="sec-act">${tasks.length && students.length ? `<button type="button" class="btn btn-ghost btn-sm" data-act="csv">${t('guru.csv')}</button>` : ''}<button type="button" class="btn btn-ghost btn-sm" data-act="student">${t('guru.addStudent')}</button></div>
        </div>
        ${students.length ? matrix || `<p class="muted">${t('guru.noTasks')}</p>` : `<p class="muted">${t('guru.noStudents')}</p>`}
      </section>

      <section class="dash-sec" aria-labelledby="hard-h">
        <h2 id="hard-h">${t('guru.hard')}</h2>
        <p class="muted">${t('guru.hardB')}</p>
        ${
          hard.length
            ? `<ol class="hard-list">${hard
                .map(
                  (h) => `<li><div class="hard-q"><span class="hard-pct">${Math.round((h.w / h.n) * 100)}%</span><span>${esc(h.text)}</span></div>
                  <p class="muted small">${t('guru.hardN', { w: h.w, n: h.n, who: h.who })}${h.lesson ? ` · <a href="${lessonHref(h.lesson)}">${t('guru.reteach')}</a>` : ''}</p></li>`,
                )
                .join('')}</ol>`
            : `<p class="muted">${t('guru.hardNone')}</p>`
        }
      </section>`
      }
    </main>`;
    bindTopbar();
    bind();
  };

  const run = async (fn) => {
    st.busy = true;
    st.err = '';
    try {
      await fn();
      st.form = null;
    } catch (e) {
      st.err = errText(e);
    }
    st.busy = false;
    render();
  };

  const bind = () => {
    const on = (act, fn) => app.querySelectorAll(`[data-act="${act}"]`).forEach((b) => b.addEventListener('click', fn));
    ['task', 'student', 'class'].forEach((f) =>
      on(f, () => {
        st.form = f;
        st.err = '';
        st.newStudent = null;
        render();
        app.querySelector('.panel-form select, .panel-form input')?.focus();
      }),
    );
    on('cancel', () => {
      st.form = null;
      render();
    });
    app.querySelector('#clsSel')?.addEventListener('change', async (e) => {
      st.cur = e.target.value;
      await load();
      render();
    });
    app.querySelector('#tk-kind')?.addEventListener('change', (e) => {
      app.querySelector('#tk-target').innerHTML = targetOptions(st.rep.cls.kelas, e.target.value);
    });
    app.querySelector('#f-task')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const kind = app.querySelector('#tk-kind').value;
      const target = app.querySelector('#tk-target').value;
      const dueStr = app.querySelector('#tk-due').value;
      const due = dueStr ? new Date(`${dueStr}T23:59:00`).getTime() : Date.now() + 7 * DAY;
      run(async () => {
        await api.createAssignment(auth.account.id, { classId: st.cur, kind, target, due });
        await load();
      });
    });
    app.querySelector('#f-stu')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = app.querySelector('#stu-name').value;
      run(async () => {
        st.newStudent = await api.addStudent(auth.account.id, st.cur, name);
        await load();
      });
    });
    app.querySelector('#f-cls')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = app.querySelector('#cls-name').value;
      const kelas = app.querySelector('#cls-k').value;
      run(async () => {
        const c = await api.createClass(auth.account.id, { name, kelas });
        st.classes = await api.listClasses(auth.account.id);
        st.cur = c.id;
        await load();
      });
    });
    app.querySelectorAll('[data-del]').forEach((b) =>
      b.addEventListener('click', () => {
        if (!window.confirm(t('guru.deleteConfirm'))) return;
        run(async () => {
          await api.deleteAssignment(auth.account.id, b.dataset.del);
          await load();
        });
      }),
    );
    app.querySelector('[data-copy]')?.addEventListener('click', async (e) => {
      const b = e.currentTarget;
      try {
        await navigator.clipboard.writeText(b.dataset.copy);
        b.textContent = t('guru.copied');
      } catch {
        b.textContent = b.dataset.copy;
      }
    });
    on('csv', () => {
      const blob = new Blob(['﻿' + csv(st.rep)], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${st.rep.cls.name.replace(/\s+/g, '-')}-${dateInput(Date.now())}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
  };
  render();
}
