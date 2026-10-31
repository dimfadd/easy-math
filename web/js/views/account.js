// Halaman akun: masuk, daftar, pilih profil, dasbor orang tua/guru, dan pengaturan akun.
import { KELAS, LESSONS, kelasOf } from '../../content/index.js';
import * as api from '../api.js';
import { DEMO_ACCOUNTS, DEMO_KIDS } from '../mockdb.js';
import { t } from '../i18n.js';
import { kelasName, babTitle, lessonTitle } from '../l10n.js';
import { auth } from '../auth.js';
import { sync } from '../sync.js';
import { MAX_CHILDREN, PLANS, rupiah } from '../config.js';
import { app, topbar, bindTopbar, ICON, avatar, setTitle, setKelas, fmtDate, esc, lessonHref, stateBox } from '../ui.js';
import { capie } from '../capie.js';
import { streak, weekDays, taskStatus, taskTitle } from '../habits.js';

const go = (h) => {
  location.hash = h;
};
const errText = (e) => {
  const c = e && e.code;
  return t(`err.${['bad_credentials', 'offline', 'email_taken', 'bad_email', 'short_pass', 'missing', 'too_many', 'trial_used'].includes(c) ? c : 'generic'}`);
};
const kelasOptions = (sel) =>
  KELAS.map((k) => `<option value="${k.key}"${String(sel) === k.key ? ' selected' : ''}>${kelasName(k)}</option>`).join('');

function afterLogin(next) {
  if (next) return go(`#/${next}`);
  const r = auth.role;
  if (r === 'ortu' || r === 'guru') return go('#/ortu');
  if (auth.profile) setKelas(auth.profile.kelas);
  go('#/belajar');
}

// ---------- Masuk ----------
const guide = (mood, say) => capie(mood, { size: 'sm', say, cls: 'auth-capie' });

export function viewMasuk(params = {}) {
  setTitle(t('login.h'));
  const st = { tab: params.tab === 'anak' ? 'anak' : 'akun', busy: false, err: '' };
  const render = () => {
    app.innerHTML = `${topbar('landing')}<main id="main" class="page-auth">
      <div class="auth-wrap">
        <section class="auth-card" aria-labelledby="login-h">
          ${guide(st.err ? 'no' : st.busy ? 'think' : 'hi', st.err ? t('capie.oops') : st.busy ? t('capie.busy') : st.tab === 'anak' ? t('capie.loginKid') : t('capie.login'))}
          <h1 id="login-h">${t('login.h')}</h1>
          <div class="tabs-seg" role="tablist" aria-label="${t('login.who')}">
            <button type="button" role="tab" aria-selected="${st.tab === 'akun'}" data-tab="akun">${t('login.tabAcc')}</button>
            <button type="button" role="tab" aria-selected="${st.tab === 'anak'}" data-tab="anak">${t('login.tabKid')}</button>
          </div>
          ${
            st.tab === 'akun'
              ? `<form class="form" id="f-acc" novalidate>
                  <label for="email">${t('login.email')}</label>
                  <input id="email" type="email" autocomplete="username" required>
                  <label for="pass">${t('login.pass')}</label>
                  <input id="pass" type="password" autocomplete="current-password" required>
                  ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
                  <button class="btn btn-primary btn-lg" type="submit" ${st.busy ? 'disabled' : ''}>${st.busy ? t('login.busy') : t('login.submit')}</button>
                </form>`
              : `<form class="form" id="f-kid" novalidate>
                  <p class="muted">${t('login.kidHint')}</p>
                  <label for="uname">${t('login.uname')}</label>
                  <input id="uname" autocomplete="username" autocapitalize="none" required>
                  <label for="pin">${t('login.pin')}</label>
                  <input id="pin" type="password" inputmode="numeric" maxlength="6" autocomplete="current-password" required>
                  ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
                  <button class="btn btn-primary btn-lg" type="submit" ${st.busy ? 'disabled' : ''}>${st.busy ? t('login.busy') : t('login.submit')}</button>
                </form>`
          }
          <p class="auth-alt">${t('login.noAcc')} <a href="#/daftar${params.next ? `?next=${esc(params.next)}` : ''}">${t('login.toSignup')}</a></p>
        </section>
        <aside class="demo-card" aria-labelledby="demo-h">
          <h2 id="demo-h">${t('login.demoH')}</h2>
          <p class="muted small">${t('login.demoB')}</p>
          <ul class="demo-list">
            ${DEMO_ACCOUNTS.map((d) => `<li><button type="button" class="demo-acc" data-email="${d.email}"><strong>${d.email}</strong><span>${t(`demo.${d.email}`)}</span></button></li>`).join('')}
          </ul>
          <p class="muted small">${t('login.demoKids')}</p>
          <ul class="demo-list">
            ${DEMO_KIDS.map((d) => `<li><button type="button" class="demo-kid" data-u="${d.username}"><strong>${d.username}</strong><span>${t(`demo.${d.username}`)}</span></button></li>`).join('')}
          </ul>
          <button type="button" class="btn btn-ghost btn-sm" data-act="reset">${t('login.reset')}</button>
        </aside>
      </div>
    </main>`;
    bindTopbar();
    bind();
  };
  const submit = async (fn) => {
    st.busy = true;
    st.err = '';
    const keep = [...app.querySelectorAll('.form input')].map((i) => i.value);
    render();
    app.querySelectorAll('.form input').forEach((i, k) => (i.value = keep[k] || ''));
    try {
      await fn(...keep);
      afterLogin(params.next);
    } catch (e) {
      st.busy = false;
      st.err = errText(e);
      render();
      app.querySelectorAll('.form input').forEach((i, k) => (i.value = keep[k] || ''));
      app.querySelector('.form input')?.focus();
    }
  };
  const bind = () => {
    app.querySelectorAll('[data-tab]').forEach((b) =>
      b.addEventListener('click', () => {
        st.tab = b.dataset.tab;
        st.err = '';
        render();
        app.querySelector(`[data-tab="${st.tab}"]`).focus();
      }),
    );
    app.querySelector('#f-acc')?.addEventListener('submit', (e) => {
      e.preventDefault();
      submit((email, pass) => auth.login(email, pass));
    });
    app.querySelector('#f-kid')?.addEventListener('submit', (e) => {
      e.preventDefault();
      submit((u, pin) => auth.loginKid(u, pin));
    });
    app.querySelectorAll('.demo-acc').forEach((b) =>
      b.addEventListener('click', () => {
        if (st.tab !== 'akun') {
          st.tab = 'akun';
          render();
        }
        app.querySelector('#email').value = b.dataset.email;
        app.querySelector('#pass').value = 'demo123';
        app.querySelector('#f-acc').requestSubmit();
      }),
    );
    app.querySelectorAll('.demo-kid').forEach((b) =>
      b.addEventListener('click', () => {
        if (st.tab !== 'anak') {
          st.tab = 'anak';
          render();
        }
        app.querySelector('#uname').value = b.dataset.u;
        app.querySelector('#pin').value = '1234';
        app.querySelector('#f-kid').requestSubmit();
      }),
    );
    app.querySelector('[data-act="reset"]')?.addEventListener('click', () => {
      if (!window.confirm(t('login.resetConfirm'))) return;
      api.resetDemo();
      auth.logout();
      render();
    });
  };
  render();
}

// ---------- Daftar ----------
export function viewDaftar(params = {}) {
  setTitle(t('signup.h'));
  const st = { role: 'ortu', busy: false, err: '' };
  const render = (keep = {}) => {
    app.innerHTML = `${topbar('landing')}<main id="main" class="page-auth">
      <div class="auth-wrap single">
        <section class="auth-card" aria-labelledby="su-h">
          ${guide(st.err ? 'no' : st.busy ? 'think' : 'hi', st.err ? t('capie.oops') : st.busy ? t('capie.busy') : t('capie.signup'))}
          <h1 id="su-h">${t('signup.h')}</h1>
          <p class="muted">${t('signup.lead')}</p>
          <form class="form" id="f-su" novalidate>
            <fieldset class="role-pick"><legend>${t('signup.who')}</legend>
              <label class="role-opt${st.role === 'ortu' ? ' on' : ''}"><input type="radio" name="role" value="ortu" ${st.role === 'ortu' ? 'checked' : ''}><span class="role-txt"><strong>${t('signup.ortu')}</strong><small>${t('signup.ortuSub')}</small></span></label>
              <label class="role-opt${st.role === 'siswa' ? ' on' : ''}"><input type="radio" name="role" value="siswa" ${st.role === 'siswa' ? 'checked' : ''}><span class="role-txt"><strong>${t('signup.siswa')}</strong><small>${t('signup.siswaSub')}</small></span></label>
            </fieldset>
            <label for="nm">${t('signup.name')}</label>
            <input id="nm" autocomplete="name" required value="${esc(keep.nm)}">
            <label for="em">${t('login.email')}</label>
            <input id="em" type="email" autocomplete="email" required value="${esc(keep.em)}">
            <label for="pw">${t('login.pass')}</label>
            <input id="pw" type="password" autocomplete="new-password" minlength="6" required aria-describedby="pw-h" value="${esc(keep.pw)}">
            <p id="pw-h" class="muted small">${t('signup.passHint')}</p>
            ${st.role === 'siswa' ? `<label for="kl">${t('signup.kelas')}</label><select id="kl">${kelasOptions(keep.kl || '7')}</select>` : ''}
            ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
            <button class="btn btn-primary btn-lg" type="submit" ${st.busy ? 'disabled' : ''}>${st.busy ? t('login.busy') : t('signup.submit')}</button>
            <p class="muted small">${t('signup.legal')}</p>
          </form>
          <p class="auth-alt">${t('signup.haveAcc')} <a href="#/masuk${params.next ? `?next=${esc(params.next)}` : ''}">${t('nav.login')}</a></p>
        </section>
      </div>
    </main>`;
    bindTopbar();
    const val = () => ({ nm: app.querySelector('#nm').value, em: app.querySelector('#em').value, pw: app.querySelector('#pw').value, kl: app.querySelector('#kl')?.value });
    app.querySelectorAll('input[name="role"]').forEach((r) =>
      r.addEventListener('change', () => {
        const v = val();
        st.role = r.value;
        render(v);
        app.querySelector(`input[value="${st.role}"]`).focus();
      }),
    );
    app.querySelector('#f-su').addEventListener('submit', async (e) => {
      e.preventDefault();
      const v = val();
      st.busy = true;
      st.err = '';
      render(v);
      try {
        await auth.signup({ name: v.nm, email: v.em, pass: v.pw, role: st.role, kelas: v.kl });
        if (params.next) return go(`#/${params.next}`);
        if (st.role === 'ortu') return go('#/profil');
        if (auth.profile) setKelas(auth.profile.kelas);
        go('#/belajar');
      } catch (err) {
        st.busy = false;
        st.err = errText(err);
        render(v);
      }
    });
  };
  render();
}

function needLogin() {
  app.innerHTML = `${topbar('app')}<main id="main">${stateBox(t('acc.needLogin'), t('acc.needLoginB'), `<a class="btn btn-primary" href="#/masuk">${t('nav.login')}</a>`)}</main>`;
  bindTopbar();
}

// ---------- Pilih profil ----------
export async function viewProfil() {
  setTitle(t('prof.h'));
  if (!auth.loggedIn) return needLogin();
  const profiles = await api.listProfiles(auth.account.id).catch(() => []);
  const st = { adding: false, err: '', busy: false };
  const canAdd = auth.role === 'ortu' && profiles.length < MAX_CHILDREN;
  const render = () => {
    app.innerHTML = `${topbar('app')}<main id="main" class="page-profil">
      ${guide(profiles.length ? 'hi' : 'think', profiles.length ? t('capie.profile') : t('capie.profileEmpty'))}
      <h1>${t('prof.h')}</h1>
      <p class="lead">${profiles.length ? t('prof.lead') : t('prof.empty')}</p>
      <ul class="prof-grid">
        ${profiles
          .map(
            (p) => `<li><button type="button" class="prof-card${auth.profile?.id === p.id ? ' on' : ''}" data-pid="${p.id}">${avatar(p, 72)}<strong>${esc(p.name)}</strong><span>${kelasName(kelasOf(p.kelas))}</span></button></li>`,
          )
          .join('')}
        ${canAdd ? `<li><button type="button" class="prof-card prof-add" data-act="add"><span class="avatar add" aria-hidden="true">+</span><strong>${t('prof.add')}</strong><span>${t('prof.addSub', { n: MAX_CHILDREN })}</span></button></li>` : ''}
      </ul>
      ${
        st.adding
          ? `<form class="form add-form" id="f-add"><h2>${t('prof.add')}</h2>
              <label for="cn">${t('prof.childName')}</label><input id="cn" required autocomplete="off">
              <label for="ck">${t('signup.kelas')}</label><select id="ck">${kelasOptions('1')}</select>
              ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
              <div class="end-actions"><button class="btn btn-primary" type="submit" ${st.busy ? 'disabled' : ''}>${t('prof.save')}</button><button class="btn btn-ghost" type="button" data-act="cancel">${t('prof.cancel')}</button></div>
            </form>`
          : ''
      }
      ${auth.role === 'ortu' || auth.role === 'guru' ? `<p class="next-bab"><a href="#/ortu">${auth.role === 'guru' ? t('nav.class') : t('nav.parent')} →</a></p>` : ''}
    </main>`;
    bindTopbar();
    app.querySelectorAll('[data-pid]').forEach((b) =>
      b.addEventListener('click', async () => {
        await auth.selectProfile(b.dataset.pid);
        if (auth.profile) setKelas(auth.profile.kelas);
        go('#/belajar');
      }),
    );
    app.querySelector('[data-act="add"]')?.addEventListener('click', () => {
      st.adding = true;
      render();
      app.querySelector('#cn').focus();
    });
    app.querySelector('[data-act="cancel"]')?.addEventListener('click', () => {
      st.adding = false;
      render();
    });
    app.querySelector('#f-add')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = app.querySelector('#cn').value;
      const kelas = app.querySelector('#ck').value;
      st.busy = true;
      try {
        const p = await api.addChild(auth.account.id, { name, kelas });
        profiles.push(p);
        auth.setAccount(await api.getAccount(auth.account.id));
        st.adding = false;
        st.err = '';
      } catch (err) {
        st.err = errText(err);
      }
      st.busy = false;
      render();
    });
  };
  render();
}

// ---------- Dasbor orang tua / guru ----------
const DAY = 86400000;
function childStats(profile, progress) {
  const w = progress.watched || {};
  const s = progress.scores || {};
  const scores = Object.values(s);
  const avg = scores.length ? Math.round((scores.reduce((a, x) => a + x.best / x.total, 0) / scores.length) * 100) : null;
  // aktivitas 7 hari terakhir: banyaknya materi ditonton + latihan dikerjakan per hari
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, k) => ({ from: start.getTime() - (6 - k) * DAY, n: 0 }));
  for (const at of [...Object.values(w), ...scores.map((x) => x.at)]) {
    const d = days.find((x) => at >= x.from && at < x.from + DAY);
    if (d) d.n++;
  }
  const lastAt = Math.max(0, ...Object.values(w), ...scores.map((x) => x.at || 0));
  const k = kelasOf(profile.kelas);
  const babs = (k ? k.babs : []).map((b) => {
    const n = b.lessons.length;
    const watched = b.lessons.filter((l) => w[l.id]).length;
    const sc = b.lessons.map((l) => s[l.id]).filter(Boolean);
    const pct = sc.length ? sc.reduce((a, x) => a + x.best / x.total, 0) / sc.length : 0;
    const state = watched === 0 && !sc.length ? 'todo' : watched === n && pct >= 0.8 ? 'mastered' : sc.length && pct < 0.6 ? 'help' : 'cur';
    return { b, n, watched, pct, state };
  });
  const attention = Object.entries(s)
    .filter(([, x]) => x.best / x.total < 0.6)
    .map(([id, x]) => ({ id, x, e: LESSONS.get(id) }))
    .filter((a) => a.e);
  return { watched: Object.keys(w).length, avg, days, lastAt, babs, attention };
}

// Ringkasan mingguan untuk dikirim lewat WhatsApp (teks biasa, tanpa data sensitif)
function waText(profile, S, wk, goal, open) {
  const lines = [
    t('wa.title', { name: profile.name }),
    t('wa.days', { wk, goal }),
    t('wa.stats', { w: S.watched, avg: S.avg === null ? '-' : `${S.avg}%` }),
  ];
  if (S.attention.length) lines.push(t('wa.attention', { title: lessonTitle(S.attention[0].e.lesson) }));
  if (open) lines.push(t('wa.tasks', { n: open }));
  lines.push(t('wa.footer'));
  return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
}

function childCard(profile, progress, role, tasks = []) {
  const S = childStats(profile, progress);
  const goal = profile.goal || 3;
  const wk = weekDays(progress.days || {});
  const stk = streak(progress.days || {});
  const now = Date.now();
  const tk = tasks.map((x) => ({ x, s: taskStatus(x, progress, now) }));
  const openTasks = tk.filter((r) => !r.s.done);
  const max = Math.max(1, ...S.days.map((d) => d.n));
  const dayName = (ms) => new Date(ms).toLocaleDateString(t('locale'), { weekday: 'short' });
  const shown = S.babs.filter((x) => x.state !== 'todo').concat(S.babs.filter((x) => x.state === 'todo').slice(0, 1)).slice(0, 5);
  const stateLabel = { mastered: t('dash.mastered'), cur: t('bab.cur'), help: t('dash.needHelp'), todo: t('bab.todo') };
  return `<article class="child-card">
    <header class="child-head">${avatar(profile, 52)}<div><h2>${esc(profile.name)}</h2><p>${kelasName(kelasOf(profile.kelas))} · ${S.lastAt ? t('dash.lastActive', { date: fmtDate(S.lastAt) }) : t('dash.never')}</p></div></header>
    <div class="child-stats">
      <div><strong>${S.watched}</strong><span>${t('dash.watched')}</span></div>
      <div><strong>${S.avg === null ? '–' : `${S.avg}%`}</strong><span>${t('dash.avg')}</span></div>
      <div><strong>${S.days.reduce((a, d) => a + d.n, 0)}</strong><span>${t('dash.week')}</span></div>
    </div>
    <div class="goal-row">
      <div class="goal-ring" style="--p:${Math.min(1, wk / goal)}" aria-hidden="true"><span>${wk}/${goal}</span></div>
      <div class="goal-txt"><strong>${wk >= goal ? t('goal.done') : t('goal.left', { n: goal - wk })}</strong><span>${t('goal.streak', { n: stk })}</span></div>
      ${role === 'ortu' ? `<label class="goal-set">${t('goal.set')} <select data-goal="${profile.id}">${[1, 2, 3, 4, 5, 6, 7].map((n) => `<option value="${n}" ${n === goal ? 'selected' : ''}>${t('goal.opt', { n })}</option>`).join('')}</select></label>` : ''}
    </div>
    <div class="week" role="img" aria-label="${t('dash.weekAria')}: ${S.days.map((d) => `${dayName(d.from)} ${d.n}`).join(', ')}">
      ${S.days.map((d) => `<div class="wk"><span class="wk-bar${d.n ? '' : ' zero'}" style="height:${d.n ? Math.max(10, (d.n / max) * 64) : 4}px"></span><span class="wk-d">${dayName(d.from)}</span></div>`).join('')}
    </div>
    <h3 class="child-sub">${t('dash.chapters')}</h3>
    <ul class="mastery">
      ${shown.map((x) => `<li><div class="ms-row"><span>${t('bab.label', { no: x.b.no })}: ${babTitle(x.b)}</span><span class="ms-${x.state}">${stateLabel[x.state]}</span></div><span class="meter"><span class="ms-bar-${x.state}" style="transform:scaleX(${x.n ? x.watched / x.n : 0})"></span></span></li>`).join('')}
    </ul>
    ${
      S.attention.length
        ? `<div class="attention"><h3>${t('dash.attention')}</h3><ul>${S.attention
            .slice(0, 3)
            .map((a) => `<li>${t('dash.lowScore', { title: lessonTitle(a.e.lesson), b: a.x.best, t: a.x.total })} <a href="${lessonHref(a.id)}">${t('dash.review')}</a></li>`)
            .join('')}</ul></div>`
        : `<p class="all-good">${ICON.check}${t('dash.allGood')}</p>`
    }
    ${
      tasks.length
        ? `<div class="kid-tasks"><h3>${t('goal.tasks', { cls: esc(tasks[0].className) })}</h3><ul>${tk
            .slice(0, 4)
            .map(({ x, s }) => `<li class="${s.done ? 'is-done' : s.overdue ? 'is-overdue' : ''}">${s.done ? ICON.check : ''}<span>${esc(taskTitle(x))}</span><span class="muted small">${s.done ? (s.score ? `${s.score.ok}/${s.score.total}` : t('guru.done')) : s.overdue ? t('guru.missing') : t('guru.due', { date: fmtDate(x.due) })}</span></li>`)
            .join('')}</ul></div>`
        : ''
    }
    <div class="child-act">
      ${role === 'ortu' ? `<button type="button" class="btn btn-primary btn-sm" data-learn="${profile.id}">${t('dash.learnAs', { name: esc(profile.name) })}</button>` : ''}
      ${role === 'ortu' ? `<a class="btn btn-ghost btn-sm" href="${waText(profile, S, wk, goal, openTasks.length)}" target="_blank" rel="noopener">${t('wa.send')}</a>` : ''}
      ${role === 'ortu' ? `<details class="kid-login"><summary>${t('join.forChild')}</summary><form class="join-form" data-join="${profile.id}"><label class="sr-only" for="jc-${profile.id}">${t('join.code')}</label><input id="jc-${profile.id}" placeholder="${t('join.ph')}" autocomplete="off" autocapitalize="characters" maxlength="8"><button class="btn btn-ghost btn-sm" type="submit">${t('join.go')}</button></form><p class="join-msg muted small" role="status"></p></details>` : ''}
      <details class="kid-login"><summary>${t('dash.kidLogin')}</summary><p>${t('dash.kidLoginB')}</p><p class="kid-cred"><span>${t('login.uname')}: <strong>${esc(profile.username)}</strong></span><span>PIN: <strong>${esc(profile.pin)}</strong></span></p></details>
    </div>
  </article>`;
}

export async function viewOrtu() {
  setTitle(t('nav.parent'));
  if (!auth.loggedIn) return needLogin();
  if (auth.role !== 'ortu' && auth.role !== 'guru') return go('#/belajar');
  app.innerHTML = `${topbar('app')}<main id="main" class="page-dash"><p class="muted">${t('dash.loading')}</p></main>`;
  bindTopbar();
  let rows = [];
  let offline = false;
  try {
    rows = await api.familyReport(auth.account.id);
  } catch {
    offline = true;
  }
  const a = auth.account;
  const plan = a.plan || {};
  const guru = a.role === 'guru';
  app.innerHTML = `${topbar('app')}<main id="main" class="page-dash">
    <header class="dash-head">
      <div><p class="pill">${guru ? esc(a.school || t('nav.class')) : t('nav.parent')}</p><h1>${guru ? t('dash.hGuru') : t('dash.h', { name: esc(a.name.split(' ')[0]) })}</h1></div>
      ${guru ? '' : `<a class="btn btn-ghost" href="#/profil">${t('dash.switch')}</a>`}
    </header>
    ${
      api.planActive(plan)
        ? `<div class="banner ok"><div><strong>${plan.status === 'trial' ? t('pay.trialOn', { date: fmtDate(plan.until) }) : t('pay.activeOn', { date: fmtDate(plan.until) })}</strong></div><div class="banner-act"><a class="btn btn-ghost btn-sm" href="#/akun">${t('acc.manage')}</a></div></div>`
        : `<div class="banner"><div><strong>${t('learn.noPlanTitle')}</strong><p>${t('dash.noPlan')}</p></div><div class="banner-act"><a class="btn btn-primary" href="#/paket">${t('learn.seePlans')}</a></div></div>`
    }
    ${offline ? `<div class="banner"><div><strong>${t('err.offline')}</strong></div></div>` : ''}
    ${rows.length ? `<div class="child-grid">${rows.map((r) => childCard(r.profile, r.progress, a.role, r.assignments || [])).join('')}</div>` : stateBox(t('dash.noKids'), t('dash.noKidsB'), `<a class="btn btn-primary" href="#/profil">${t('prof.add')}</a>`)}
  </main>`;
  bindTopbar();
  app.querySelectorAll('[data-goal]').forEach((sel) =>
    sel.addEventListener('change', async () => {
      try {
        await api.setGoal(sel.dataset.goal, sel.value);
      } catch {
        /* offline: pilihan dicoba lagi saat halaman dibuka ulang */
      }
      viewOrtu();
    }),
  );
  app.querySelectorAll('[data-join]').forEach((f) =>
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = f.parentElement.querySelector('.join-msg');
      try {
        const r = await api.joinClass(f.dataset.join, f.querySelector('input').value);
        msg.textContent = t('join.ok', { cls: r.cls.name, teacher: r.cls.teacher });
        setTimeout(viewOrtu, 900);
      } catch (err) {
        msg.textContent = err?.code === 'bad_code' ? t('join.bad') : t('err.generic');
      }
    }),
  );
  app.querySelectorAll('[data-learn]').forEach((b) =>
    b.addEventListener('click', async () => {
      await auth.selectProfile(b.dataset.learn);
      if (auth.profile) setKelas(auth.profile.kelas);
      go('#/belajar');
    }),
  );
}

// ---------- Akun ----------
export function viewAkun() {
  setTitle(t('acc.h'));
  if (!auth.loggedIn) return needLogin();
  const a = auth.account;
  const plan = a.plan || {};
  const active = api.planActive(plan);
  const planName = PLANS.find((p) => p.id === plan.planId) ? t(`plan.${plan.planId}`) : plan.planId === 'sekolah' ? t('plan.school') : '';
  const render = () => {
    app.innerHTML = `${topbar('app')}<main id="main" class="page-akun">
      <header class="hello">${avatar(auth.profile || { name: a.name, color: '#C9D4F5' }, 60)}<div><p class="hello-sub">${t(`role.${auth.role}`)}${auth.profile && auth.role !== 'anak' && auth.role !== 'siswa' ? ` · ${t('acc.learningAs', { name: esc(auth.profile.name) })}` : ''}</p><h1>${esc(auth.profile && auth.role === 'anak' ? auth.profile.name : a.name)}</h1>${auth.role !== 'anak' ? `<p class="muted">${esc(a.email)}</p>` : ''}</div></header>

      <section class="acc-sec" aria-labelledby="acc-plan">
        <h2 id="acc-plan">${t('acc.plan')}</h2>
        ${
          active
            ? `<p><strong>${planName}</strong> · ${plan.status === 'trial' ? t('pay.trialOn', { date: fmtDate(plan.until) }) : t('pay.activeOn', { date: fmtDate(plan.until) })}</p>${plan.status === 'active' && plan.autoRenew === false ? `<p class="muted">${t('acc.noRenew')}</p>` : ''}`
            : `<p>${t('acc.noPlan')}</p>`
        }
        <div class="end-actions">
          ${auth.role === 'anak' ? '' : `<a class="btn ${active ? 'btn-ghost' : 'btn-primary'}" href="#/paket">${active ? t('acc.extend') : t('learn.seePlans')}</a>`}
          ${active && plan.status === 'active' && plan.autoRenew !== false && auth.role !== 'anak' && plan.planId !== 'sekolah' ? `<button type="button" class="btn btn-ghost" data-act="cancel">${t('acc.cancel')}</button>` : ''}
        </div>
        ${
          auth.role !== 'anak' && (a.invoices || []).length
            ? `<h3>${t('acc.invoices')}</h3><ul class="inv-list">${a.invoices
                .slice(0, 5)
                .map((i) => `<li><span>${esc(i.id)} · ${t(`plan.${i.planId}`)}</span><span>${rupiah(i.amount)}</span><span class="tag ${i.status === 'paid' ? 'tag-ok' : ''}">${i.status === 'paid' ? t('acc.paid') : t('acc.pending')}</span></li>`)
                .join('')}</ul>`
            : ''
        }
      </section>

      ${
        auth.profile
          ? `<section class="acc-sec" aria-labelledby="acc-sync">
              <h2 id="acc-sync">${t('acc.sync')}</h2>
              <p><span class="sync-dot sync-${sync.status} inline" aria-hidden="true"></span> ${t(`sync.${sync.status}`)}${sync.lastSync ? ` · ${t('acc.lastSync', { time: new Date(sync.lastSync).toLocaleTimeString(t('locale'), { hour: '2-digit', minute: '2-digit' }) })}` : ''}</p>
              <p class="muted small">${t('acc.syncB')}</p>
              <button type="button" class="btn btn-ghost btn-sm" data-act="sync">${t('acc.syncNow')}</button>
            </section>`
          : ''
      }

      ${
        auth.profile && (auth.role === 'anak' || auth.role === 'siswa')
          ? `<section class="acc-sec" aria-labelledby="acc-cls">
              <h2 id="acc-cls">${t('join.h')}</h2>
              <p class="muted small">${t('join.b')}</p>
              <form class="join-form" id="f-join"><label class="sr-only" for="jc">${t('join.code')}</label><input id="jc" placeholder="${t('join.ph')}" autocomplete="off" autocapitalize="characters" maxlength="8"><button class="btn btn-primary btn-sm" type="submit">${t('join.go')}</button></form>
              <p class="join-msg muted small" role="status"></p>
            </section>`
          : ''
      }

      <section class="acc-sec" aria-labelledby="acc-nav">
        <h2 id="acc-nav">${t('acc.more')}</h2>
        <div class="end-actions">
          <a class="btn btn-ghost" href="#/belajar">${t('nav.learn')}</a>
          ${auth.role === 'ortu' || auth.role === 'guru' ? `<a class="btn btn-ghost" href="#/ortu">${auth.role === 'guru' ? t('nav.class') : t('nav.parent')}</a>` : ''}
          ${auth.role === 'ortu' ? `<a class="btn btn-ghost" href="#/profil">${t('dash.switch')}</a>` : ''}
          <button type="button" class="btn btn-ghost" data-act="logout">${t('acc.logout')}</button>
        </div>
      </section>
    </main>`;
    bindTopbar();
    app.querySelector('[data-act="logout"]').addEventListener('click', () => {
      auth.logout();
      go('#/');
    });
    app.querySelector('#f-join')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = app.querySelector('.join-msg');
      try {
        const r = await api.joinClass(auth.profile.id, app.querySelector('#jc').value);
        auth.setProfile?.(r.profile);
        msg.textContent = t('join.ok', { cls: r.cls.name, teacher: r.cls.teacher });
      } catch (err) {
        msg.textContent = err?.code === 'bad_code' ? t('join.bad') : err?.code === 'offline' ? t('err.offline') : t('err.generic');
      }
    });
    app.querySelector('[data-act="sync"]')?.addEventListener('click', async () => {
      await sync.pull(auth.profile.id);
      render();
    });
    app.querySelector('[data-act="cancel"]')?.addEventListener('click', async () => {
      if (!window.confirm(t('acc.cancelConfirm', { date: fmtDate(plan.until) }))) return;
      try {
        auth.setAccount(await api.cancelRenewal(a.id));
      } catch {
        /* offline: biarkan */
      }
      viewAkun();
    });
  };
  render();
}
