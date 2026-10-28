import { BAB, KELAS, LESSONS, ORDER, kelasOf } from '../content/index.js';
import { Player, Stage, stageSVG, compileLesson } from './player.js';
import { renderQuiz, shuffle } from './quiz.js';
import { store } from './store.js';
import { spansHTML } from './shapes.js';
import { BRAND } from './brand.js';
import { DEMOS } from './demos.js';

const app = document.getElementById('app');
let current = null; // pemutar/demo aktif yang perlu dibersihkan saat pindah halaman

// Kelas yang sedang dibuka (diingat di perangkat)
let kelasNo = kelasOf(store.settings.kelas) ? String(store.settings.kelas) : KELAS[0].key;
function setKelas(key) {
  if (!kelasOf(key) || String(key) === kelasNo) return;
  kelasNo = String(key);
  store.setSetting('kelas', kelasNo);
}
const kName = (key = kelasNo) => kelasOf(key).name;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Tema ----------
function effectiveTheme() {
  const t = document.documentElement.dataset.theme;
  if (t === 'light' || t === 'dark') return t;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = t === 'dark' ? '#0F1330' : '#F5F7FB';
}
if (store.settings.theme) applyTheme(store.settings.theme);

const THEME_ICON = {
  light: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  dark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor"/></svg>',
};

function topbar() {
  const t = effectiveTheme();
  return `
  <header class="topbar">
    <a class="brand" href="#/" aria-label="${BRAND.name}, ke beranda">
      <svg class="brand-mark" viewBox="0 0 34 34" aria-hidden="true"><rect x="1" y="1" width="32" height="32" rx="10" fill="#2D5BE3"/><circle cx="12" cy="17" r="5" fill="#FFC22E"/><path d="M20 17h7M23.5 13.5v7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>
      <span class="brand-name">${BRAND.name}</span>
      <span class="brand-sub">${kelasOf(kelasNo).jenjang} ${kName()}</span>
    </a>
    <button type="button" class="icon-btn" id="themeBtn" aria-label="${t === 'dark' ? 'Pakai tema terang' : 'Pakai tema gelap'}">${t === 'dark' ? THEME_ICON.light : THEME_ICON.dark}</button>
  </header>`;
}

function bindTopbar() {
  const b = document.getElementById('themeBtn');
  if (!b) return;
  b.addEventListener('click', () => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    store.setSetting('theme', next);
    b.innerHTML = next === 'dark' ? THEME_ICON.light : THEME_ICON.dark;
    b.setAttribute('aria-label', next === 'dark' ? 'Pakai tema terang' : 'Pakai tema gelap');
  });
}

// ---------- Bantuan ----------
const lessonHref = (id) => `#/materi/${id}`;
const practiceHref = (id) => `#/latihan/${id}`;

function babProgress(b) {
  const watched = b.lessons.filter((l) => store.isWatched(l.id)).length;
  const practiced = b.lessons.filter((l) => store.score(l.id)).length;
  return { watched, practiced, total: b.lessons.length };
}

function scoreBadge(id) {
  const s = store.score(id);
  if (!s) return '';
  return `<span class="tag ${s.best === s.total ? 'tag-ok' : ''}">Latihan ${s.best}/${s.total}</span>`;
}

function nextLessonId(id) {
  const k = ORDER.indexOf(id);
  const nx = k >= 0 && k < ORDER.length - 1 ? ORDER[k + 1] : null;
  // tidak menyeberang ke kelas lain
  return nx && LESSONS.get(nx).kelas === LESSONS.get(id).kelas ? nx : null;
}

function continueTarget() {
  const last = store.last;
  if (last && LESSONS.has(last) && LESSONS.get(last).kelas === kelasNo) {
    const done = store.isWatched(last) && store.score(last);
    if (!done) return { id: last, label: 'Lanjutkan' };
    const nx = nextLessonId(last);
    if (nx) return { id: nx, label: 'Materi berikutnya' };
  }
  return null;
}

function setTitle(t) {
  document.title = t ? `${t} · ${BRAND.name} ${kName()}` : `${BRAND.name} · Matematika ${kelasOf(kelasNo).jenjang} ${kName()}`;
}

function focusMain() {
  const h = app.querySelector('h1');
  if (h) {
    h.setAttribute('tabindex', '-1');
    h.focus({ preventScroll: true });
  }
}

// ---------- Demo bergantian di beranda ----------
function mountDemo(fig) {
  const el = fig.querySelector('.demo-stage');
  el.innerHTML = stageSVG('Contoh animasi materi');
  const svg = el.querySelector('svg');
  const stage = new Stage(svg);
  const compiled = DEMOS.map((d) => compileLesson(d.lesson));
  const $ = (s) => fig.querySelector(s);
  const dots = [...fig.querySelectorAll('.demo-dot')];
  let d = 0;
  let i = 0;
  let timer = null;

  const label = (k) => {
    const D = DEMOS[k];
    $('.demo-badge').textContent = D.badge;
    $('.demo-title').textContent = D.title;
    $('.demo-cap').textContent = D.cap;
    $('.demo-link').href = D.href;
    svg.setAttribute('aria-label', `Contoh animasi ${D.badge}, ${D.title}. ${D.cap}`);
    dots.forEach((b, j) => b.setAttribute('aria-current', j === k ? 'true' : 'false'));
  };
  const showDemo = (k, { frame = 0 } = {}) => {
    d = (k + DEMOS.length) % DEMOS.length;
    i = frame;
    label(d);
    stage.render(compiled[d][i].state, { instant: true });
  };
  const tick = () => {
    const frames = compiled[d];
    const last = i === frames.length - 1;
    const wait = last ? 2600 : i === 0 ? 900 : 1200;
    timer = setTimeout(() => {
      if (last) {
        fig.classList.add('demo-fade');
        timer = setTimeout(() => {
          showDemo(d + 1);
          fig.classList.remove('demo-fade');
          tick();
        }, 260);
        return;
      }
      i++;
      stage.render(frames[i].state, { instant: false });
      tick();
    }, wait);
  };

  dots.forEach((b, j) =>
    b.addEventListener('click', () => {
      clearTimeout(timer);
      if (reduceMotion) return showDemo(j, { frame: compiled[j].length - 1 });
      showDemo(j);
      tick();
    }),
  );

  if (reduceMotion) {
    showDemo(0, { frame: compiled[0].length - 1 });
    return { destroy() {} };
  }
  showDemo(0);
  tick();
  return { destroy: () => clearTimeout(timer) };
}

// ---------- Angka konten (dihitung dari isi, bukan ditulis tangan) ----------
function contentFacts() {
  let m = 0;
  let q = 0;
  for (const k of KELAS)
    for (const b of k.babs) {
      q += (b.extra || []).length;
      for (const l of b.lessons) {
        m++;
        q += l.quiz.length;
        for (const c of l.chapters) for (const s of c.steps) if (s.ask) q++;
      }
    }
  return { materi: m, soal: q };
}
const fmt = (x) => x.toLocaleString('id-ID');

// ---------- Pemilih kelas ----------
const JENJANG = ['SD', 'SMP', 'SMA'];
function kelasPicker() {
  return `<nav class="kelas-pick" aria-label="Pilih kelas">${JENJANG.map((j) => {
    const ks = KELAS.filter((k) => k.jenjang === j);
    if (!ks.length) return '';
    return `<div class="kp-group"><span class="kp-label">${j}</span><div class="kp-row">${ks
      .map((k) => {
        const lanjut = /lanjut/i.test(k.key);
        return `<a class="kp-chip${lanjut ? ' kp-wide' : ''}" href="#/kelas/${k.key}" aria-label="${k.name}"${k.key === kelasNo ? ' aria-current="page"' : ''}>${k.no}${lanjut ? '<small>Lanjut</small>' : ''}</a>`;
      })
      .join('')}</div></div>`;
  }).join('')}</nav>`;
}

function babState(pr) {
  if (pr.watched === pr.total) return { cls: 'is-done', text: 'Selesai' };
  if (pr.watched > 0 || pr.practiced > 0) return { cls: 'is-cur', text: 'Sedang belajar' };
  return { cls: '', text: 'Belum mulai' };
}

const ICON_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>';
const ICON_STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

// ---------- Halaman ----------
function viewHome() {
  setTitle('');
  const K = kelasOf(kelasNo);
  const babs = K.babs;
  const cont = continueTarget();
  const first = babs[0].lessons[0];
  const facts = contentFacts();
  const contEntry = cont && LESSONS.get(cont.id);
  const cta = cont
    ? `<a class="btn btn-primary btn-lg" href="${lessonHref(cont.id)}">${cont.label}</a>`
    : `<a class="btn btn-primary btn-lg" href="${lessonHref(first.id)}">Mulai materi pertama</a>`;
  app.innerHTML = `
    ${topbar()}
    <main id="main">
      <section class="hero">
        <div class="hero-text">
          <p class="pill">SD · SMP · SMA · Kurikulum Merdeka</p>
          <h1>${spansHTML(BRAND.tagline)}</h1>
          <p class="lead">${BRAND.lead}</p>
          <div class="hero-cta">${cta}<a class="btn btn-ghost btn-lg" href="#peta">Lihat semua bab</a></div>
        </div>
        <figure class="hero-demo">
          <div class="demo-top"><span class="demo-badge"></span><span class="demo-title"></span></div>
          <div class="demo-stage"></div>
          <figcaption class="demo-foot">
            <span class="demo-cap"></span>
            <span class="demo-nav">
              <span class="demo-dots" role="group" aria-label="Pilih contoh animasi">${DEMOS.map((D, j) => `<button type="button" class="demo-dot" aria-label="Contoh ${j + 1}: ${D.badge}, ${D.title}"></button>`).join('')}</span>
              <a class="demo-link" href="#/">Buka materinya →</a>
            </span>
          </figcaption>
        </figure>
      </section>

      <section class="facts" aria-label="Isi aplikasi">
        <div class="fact"><strong>${fmt(facts.materi)}</strong><span>materi animasi</span></div>
        <div class="fact"><strong>${fmt(facts.soal)}</strong><span>soal dengan pembahasan</span></div>
        <div class="fact"><strong>Kelas 1–12</strong><span>termasuk Tingkat Lanjut</span></div>
        <div class="fact"><strong>Offline</strong><span>tetap jalan tanpa kuota</span></div>
      </section>

      ${
        contEntry
          ? `<a class="cont-card" href="${lessonHref(cont.id)}">
              <span class="cont-body">
                <span class="cont-kicker">${cont.label}</span>
                <span class="cont-title">${contEntry.lesson.title}</span>
                <span class="cont-sub">${K.name} · Bab ${contEntry.bab.no}: ${contEntry.bab.title}</span>
              </span>
              <span class="cont-play" aria-hidden="true">${ICON_PLAY}</span>
            </a>`
          : ''
      }

      <section id="peta" class="map" aria-labelledby="peta-h">
        <div class="map-head">
          <h2 id="peta-h">Peta belajar</h2>
          ${kelasPicker()}
          <p class="kelas-desc"><strong>${K.name} · ${K.jenjang} Fase ${K.fase}.</strong> ${K.desc}</p>
        </div>
        <ol class="bab-list">
          ${babs
            .map((b) => {
              const pr = babProgress(b);
              const pct = Math.round((pr.watched / pr.total) * 100);
              const st = babState(pr);
              const uji = store.score(b.id);
              return `<li class="bab-item">
              <a class="bab-link ${st.cls}" href="#/bab/${b.id}">
                <span class="bab-no" aria-hidden="true">${st.cls === 'is-done' ? ICON_CHECK : b.no}</span>
                <span class="bab-body">
                  <span class="bab-title">Bab ${b.no}. ${b.title}</span>
                  <span class="bab-desc">${b.desc}</span>
                  <span class="bab-meta"><span class="bab-state">${st.text}</span> · ${pr.watched}/${pr.total} materi${uji ? ` · Uji bab ${uji.best}/${uji.total}` : ''}</span>
                  <span class="meter" aria-hidden="true"><span style="transform:scaleX(${pct / 100})"></span></span>
                </span>
              </a>
            </li>`;
            })
            .join('')}
        </ol>
      </section>

      <footer class="foot">
        <p>${K.foot}</p>
        <p>${store.persistent ? 'Progresmu tersimpan di perangkat ini saja, tanpa akun.' : 'Penyimpanan perangkat sedang tidak bisa dipakai (misalnya mode privat), jadi progres tidak tersimpan setelah halaman ditutup.'}</p>
        <button type="button" class="btn btn-ghost btn-sm" id="resetBtn">Hapus progres di perangkat ini</button>
      </footer>
    </main>`;
  bindTopbar();
  current = mountDemo(app.querySelector('.hero-demo'));
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (window.confirm('Hapus semua progres materi dan skor latihan di perangkat ini?')) {
      store.reset();
      viewHome();
    }
  });
  document.querySelector('a[href="#peta"]').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('peta').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
}

function viewBab(id) {
  const b = BAB.find((x) => x.id === id);
  if (!b) return viewNotFound();
  setKelas(b.kelas);
  setTitle(`Bab ${b.no}: ${b.title}`);
  const uji = store.score(b.id);
  const nextBab = kelasOf(b.kelas).babs[b.no];
  const pr = babProgress(b);
  const curIdx = b.lessons.findIndex((l) => !store.isWatched(l.id));
  app.innerHTML = `
    ${topbar()}
    <main id="main" class="page-bab">
      <a class="back" href="#/kelas/${b.kelas}">← Peta belajar ${kName(b.kelas).toLowerCase()}</a>
      <header class="bab-head">
        <p class="pill">${kName(b.kelas)} · Bab ${b.no}</p>
        <h1>${b.title}</h1>
        <p class="lead">${b.desc}</p>
        <div class="bab-progress">
          <span class="meter" aria-hidden="true"><span style="transform:scaleX(${pr.watched / pr.total})"></span></span>
          <span class="bab-progress-t">${pr.watched} dari ${pr.total} materi ditonton</span>
        </div>
      </header>
      <ol class="path">
        ${b.lessons
          .map((l, k) => {
            const done = store.isWatched(l.id);
            const cls = done ? 'is-done' : k === curIdx ? 'is-cur' : '';
            return `<li class="path-item ${cls}">
            <span class="path-node" aria-hidden="true">${done ? ICON_CHECK : `${b.no}.${k + 1}`}</span>
            <div class="path-card">
              ${k === curIdx ? '<p class="path-flag">Mulai di sini</p>' : ''}
              <h2 class="lesson-title">${l.title}</h2>
              <p class="lesson-hook">${spansHTML(l.hook || '')}</p>
              <p class="lesson-tags">${done ? '<span class="tag tag-ok">Sudah ditonton</span>' : ''}${scoreBadge(l.id)}</p>
              <div class="lesson-actions">
                <a class="btn ${done ? 'btn-ghost' : 'btn-primary'}" href="${lessonHref(l.id)}">${done ? 'Tonton lagi' : 'Tonton materi'}</a>
                <a class="btn ${done && !store.score(l.id) ? 'btn-primary' : 'btn-ghost'}" href="${practiceHref(l.id)}">Latihan ${l.quiz.length} soal</a>
              </div>
            </div>
          </li>`;
          })
          .join('')}
        <li class="path-item path-uji${uji ? ' is-done' : ''}">
          <span class="path-node" aria-hidden="true">${ICON_STAR}</span>
          <div class="path-card uji-box">
            <div>
              <h2>Uji Bab ${b.no}</h2>
              <p>10 soal campuran dari semua materi bab ini, urutannya diacak setiap kali.${uji ? ` Skor terbaikmu: <strong>${uji.best}/${uji.total}</strong>.` : ''}</p>
            </div>
            <a class="btn btn-primary" href="#/uji/${b.id}">${uji ? 'Ulangi uji bab' : 'Mulai uji bab'}</a>
          </div>
        </li>
      </ol>
      ${nextBab ? `<p class="next-bab"><a href="#/bab/${nextBab.id}">Bab ${nextBab.no}: ${nextBab.title} →</a></p>` : ''}
    </main>`;
  bindTopbar();
}

function viewMateri(id) {
  const entry = LESSONS.get(id);
  if (!entry) return viewNotFound();
  const { lesson, bab, i } = entry;
  setKelas(bab.kelas);
  setTitle(lesson.title);
  store.setLast(id);
  app.innerHTML = `
    ${topbar()}
    <main id="main" class="page-materi">
      <div class="materi-head">
        <a class="back" href="#/bab/${bab.id}">← Bab ${bab.no}: ${bab.title}</a>
        <h1 class="materi-title"><span class="materi-no">${bab.no}.${i + 1}</span> ${lesson.title}</h1>
      </div>
      <div id="player"></div>
      <p class="skip"><a href="${practiceHref(id)}">Langsung ke latihan soal</a></p>
    </main>`;
  bindTopbar();
  const nx = nextLessonId(id);
  current = new Player(app.querySelector('#player'), lesson, {
    onComplete: () => store.markWatched(id),
    practiceHref: practiceHref(id),
    nextHref: nx ? lessonHref(nx) : null,
  });
  window.__player = current; // dipakai skrip uji otomatis
}

function viewLatihan(id) {
  const entry = LESSONS.get(id);
  if (!entry) return viewNotFound();
  const { lesson, bab, i } = entry;
  setKelas(bab.kelas);
  setTitle(`Latihan: ${lesson.title}`);
  const isLastInBab = i === bab.lessons.length - 1;
  const nx = nextLessonId(id);
  app.innerHTML = `${topbar()}<main id="main" class="page-quiz"></main>`;
  bindTopbar();
  renderQuiz(app.querySelector('#main'), {
    id,
    title: `Latihan ${bab.no}.${i + 1}: ${lesson.title}`,
    backHref: `#/bab/${bab.id}`,
    backLabel: `Bab ${bab.no}: ${bab.title}`,
    questions: lesson.quiz,
    nextHref: isLastInBab ? `#/uji/${bab.id}` : nx ? lessonHref(nx) : null,
    nextLabel: isLastInBab ? `Kerjakan Uji Bab ${bab.no}` : nx ? `Materi berikutnya: ${LESSONS.get(nx).lesson.title}` : '',
    numHint: sdHint(bab.kelas),
  });
}

// Petunjuk isian yang sesuai jenjang: anak SD tidak perlu membaca soal bilangan negatif
function sdHint(kelas) {
  if (kelasOf(kelas).jenjang !== 'SD') return undefined;
  return +kelasOf(kelas).no >= 4 ? 'Tulis angkanya saja. Pecahan ditulis dengan garis miring, misalnya 3/4. Desimal boleh pakai koma, misalnya 2,5.' : 'Tulis angkanya saja, misalnya 12.';
}

function pickUji(b) {
  const pool = b.lessons.map((l) => shuffle(l.quiz));
  const picked = [];
  // satu soal dari tiap materi dulu, lalu isi sisanya secara acak
  pool.forEach((qs) => qs.length && picked.push(qs.shift()));
  const rest = shuffle([...pool.flat(), ...(b.extra || [])]);
  while (picked.length < 10 && rest.length) picked.push(rest.shift());
  return shuffle(picked);
}

function viewUji(id) {
  const b = BAB.find((x) => x.id === id);
  if (!b) return viewNotFound();
  setKelas(b.kelas);
  setTitle(`Uji Bab ${b.no}: ${b.title}`);
  const nextBab = kelasOf(b.kelas).babs[b.no];
  app.innerHTML = `${topbar()}<main id="main" class="page-quiz"></main>`;
  bindTopbar();
  renderQuiz(app.querySelector('#main'), {
    id: b.id,
    title: `Uji Bab ${b.no}: ${b.title}`,
    backHref: `#/bab/${b.id}`,
    backLabel: `Bab ${b.no}: ${b.title}`,
    questions: pickUji(b),
    nextHref: nextBab ? `#/bab/${nextBab.id}` : `#/kelas/${b.kelas}`,
    nextLabel: nextBab ? `Lanjut ke Bab ${nextBab.no}: ${nextBab.title}` : 'Kembali ke peta belajar',
    kind: 'uji bab',
    numHint: sdHint(b.kelas),
  });
}

function viewNotFound() {
  setTitle('Halaman tidak ditemukan');
  app.innerHTML = `
    ${topbar()}
    <main id="main">
      <div class="state-box">
        <h1 class="state-title">Halaman ini tidak ada.</h1>
        <p>Mungkin tautannya salah ketik atau materinya sudah dipindah.</p>
        <a class="btn btn-primary" href="#/">Kembali ke peta belajar</a>
      </div>
    </main>`;
  bindTopbar();
}

// ---------- Router ----------
function route() {
  if (current && current.destroy) current.destroy();
  current = null;
  const h = location.hash.replace(/^#\/?/, '');
  if (h === 'peta') {
    // tautan jangkar ke peta belajar di beranda
    viewHome();
    document.getElementById('peta')?.scrollIntoView();
    return;
  }
  const [page, id] = h.split('/');
  window.scrollTo({ top: 0 });
  try {
    if (!page) viewHome();
    else if (page === 'kelas') {
      if (!kelasOf(id)) return viewNotFound();
      setKelas(id);
      viewHome();
      document.getElementById('peta')?.scrollIntoView();
    } else if (page === 'bab') viewBab(id);
    else if (page === 'materi') viewMateri(id);
    else if (page === 'latihan') viewLatihan(id);
    else if (page === 'uji') viewUji(id);
    else viewNotFound();
    focusMain();
  } catch (err) {
    console.error(err);
    app.innerHTML = `${topbar()}<main id="main"><div class="state-box"><h1 class="state-title">Ada yang rusak di halaman ini.</h1><p>Coba muat ulang. Kalau masih terjadi, kembali ke peta belajar.</p><p class="muted small">${String(err && err.message ? err.message : err).replace(/</g, '&lt;')}</p><a class="btn btn-primary" href="#/">Kembali ke peta belajar</a></div></main>`;
    bindTopbar();
  }
}

window.addEventListener('hashchange', route);
route();

// ---------- PWA ----------
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
