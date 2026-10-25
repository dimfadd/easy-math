import { BAB, KELAS, LESSONS, ORDER, kelasOf } from '../content/index.js';
import { Player, Stage, stageSVG, compileLesson } from './player.js';
import { renderQuiz, shuffle } from './quiz.js';
import { store } from './store.js';
import { spansHTML } from './shapes.js';

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
  if (meta) meta.content = t === 'dark' ? '#12161C' : '#F3EEE3';
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
    <a class="brand" href="#/" aria-label="Easy Math, ke beranda">
      <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="15" cy="20" r="11" class="f-pos"/><circle cx="25" cy="20" r="11" class="f-neg" fill-opacity=".92"/><path d="M10 20h10M15 15v10" stroke="#fff" stroke-width="3" stroke-linecap="round"/><path d="M21.5 20h8" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>
      <span class="brand-name">Easy Math</span>
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
  document.title = t ? `${t} · Easy Math ${kName()}` : `Easy Math · Matematika ${kelasOf(kelasNo).jenjang} ${kName()}`;
}

function focusMain() {
  const h = app.querySelector('h1');
  if (h) {
    h.setAttribute('tabindex', '-1');
    h.focus({ preventScroll: true });
  }
}

// ---------- Demo kecil di beranda ----------
const DEMO = {
  id: 'demo',
  title: 'Contoh',
  chapters: [
    {
      title: 'Contoh',
      steps: [
        { add: [{ id: 'q', t: 'text', x: 200, y: 48, text: '{p:5} + ({n:−3}) = ?', size: 34, w: 800 }] },
        { add: [0, 1, 2, 3, 4].map((i) => ({ id: `p${i}`, t: 'icon', name: 'chipP', size: 34, x: 80 + i * 60, y: 140 })) },
        { add: [0, 1, 2].map((i) => ({ id: `n${i}`, t: 'icon', name: 'chipN', size: 34, x: 80 + i * 60, y: 205 })) },
        { set: { n0: { y: 172 }, n1: { y: 172 }, n2: { y: 172 }, p0: { y: 172, x: 80 }, p1: { y: 172 }, p2: { y: 172 } } },
        { set: { 'p0': { o: 0 }, p1: { o: 0 }, p2: { o: 0 }, n0: { o: 0 }, n1: { o: 0 }, n2: { o: 0 } } },
        { set: { p3: { x: 170 }, p4: { x: 230 }, q: { text: '{p:5} + ({n:−3}) = {p:2}' } } },
      ],
    },
  ],
};

function mountDemo(el) {
  el.innerHTML = stageSVG('Contoh animasi: lima keping positif dan tiga keping negatif saling menghapus, sisa dua.');
  const stage = new Stage(el.querySelector('svg'));
  const frames = compileLesson(DEMO);
  if (reduceMotion) {
    stage.render(frames[frames.length - 1].state, { instant: true });
    return { destroy() {} };
  }
  let i = 0;
  let timer = null;
  const tick = () => {
    stage.render(frames[i].state, { instant: i === 0 });
    const wait = i === frames.length - 1 ? 2600 : i === 0 ? 900 : 1100;
    i = (i + 1) % frames.length;
    timer = setTimeout(tick, wait);
  };
  tick();
  return { destroy: () => clearTimeout(timer) };
}

// ---------- Halaman ----------
function kelasTabs() {
  if (KELAS.length < 2) return '';
  return `<nav class="kelas-tabs" aria-label="Pilih kelas">${KELAS.map(
    (k) => `<a class="kelas-tab" href="#/kelas/${k.key}"${k.key === kelasNo ? ' aria-current="page"' : ''}><strong>${k.name}</strong><span>${k.desc}</span></a>`,
  ).join('')}</nav>`;
}

function viewHome() {
  setTitle('');
  const K = kelasOf(kelasNo);
  const babs = K.babs;
  const cont = continueTarget();
  const first = babs[0].lessons[0];
  const cta = cont
    ? `<a class="btn btn-primary btn-lg" href="${lessonHref(cont.id)}">${cont.label}: ${LESSONS.get(cont.id).lesson.title}</a>`
    : `<a class="btn btn-primary btn-lg" href="${lessonHref(first.id)}">Mulai dari Bab 1: ${first.title}</a>`;
  app.innerHTML = `
    ${topbar()}
    <main id="main">
      <section class="intro">
        <div class="intro-text">
          <p class="kicker">Matematika ${K.jenjang} ${K.name} · Fase ${K.fase}</p>
          <h1>Belajar matematika dengan melihat <span class="hl-word">kenapa</span>, bukan cuma menghafal caranya.</h1>
          <p class="lead">Tiap materi berupa animasi pendek yang bercerita: dimulai dari pertanyaan, lalu dijawab dengan benda yang bisa dilihat. Setelah itu ada soal latihan, dan tiap jawaban salah dijelaskan letak kelirunya.</p>
          <div class="intro-cta">${cta}<a class="btn btn-ghost btn-lg" href="#peta">Lihat semua bab</a></div>
        </div>
        <figure class="intro-demo">
          <div class="demo-stage"></div>
          <figcaption>Contoh dari kelas 7, Bab 1: lima keping biru dan tiga keping merah. Sepasang biru dan merah bernilai nol.</figcaption>
        </figure>
      </section>

      <section id="peta" class="map" aria-labelledby="peta-h">
        <h2 id="peta-h">Peta belajar ${K.name.toLowerCase()}</h2>
        ${kelasTabs()}
        <ol class="bab-list">
          ${babs.map((b) => {
            const pr = babProgress(b);
            const pct = Math.round((pr.watched / pr.total) * 100);
            return `<li class="bab-item">
              <a class="bab-link" href="#/bab/${b.id}">
                <span class="bab-no" aria-hidden="true">${String(b.no).padStart(2, '0')}</span>
                <span class="bab-body">
                  <span class="bab-title">Bab ${b.no}. ${b.title}</span>
                  <span class="bab-desc">${b.desc}</span>
                  <span class="bab-meta">${pr.total} materi${pr.watched ? ` · ${pr.watched} sudah ditonton` : ''}${store.score(b.id) ? ` · Uji bab ${store.score(b.id).best}/${store.score(b.id).total}` : ''}</span>
                  <span class="meter" aria-hidden="true"><span style="transform:scaleX(${pct / 100})"></span></span>
                </span>
              </a>
            </li>`;
          }).join('')}
        </ol>
      </section>

      <footer class="foot">
        <p>${K.foot}</p>
        <p>${store.persistent ? 'Progresmu tersimpan di perangkat ini saja, tanpa akun.' : 'Penyimpanan perangkat sedang tidak bisa dipakai (misalnya mode privat), jadi progres tidak tersimpan setelah halaman ditutup.'}</p>
        <button type="button" class="btn btn-ghost btn-sm" id="resetBtn">Hapus progres di perangkat ini</button>
      </footer>
    </main>`;
  bindTopbar();
  current = mountDemo(app.querySelector('.demo-stage'));
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
  app.innerHTML = `
    ${topbar()}
    <main id="main" class="page-bab">
      <a class="back" href="#/kelas/${b.kelas}">← Peta belajar ${kName(b.kelas).toLowerCase()}</a>
      <header class="bab-head">
        <p class="kicker">Bab ${b.no}</p>
        <h1>${b.title}</h1>
        <p class="lead">${b.desc}</p>
      </header>
      <ol class="lesson-list">
        ${b.lessons
          .map(
            (l, k) => `<li class="lesson">
            <div class="lesson-no" aria-hidden="true">${b.no}.${k + 1}</div>
            <div class="lesson-body">
              <h2 class="lesson-title">${l.title}</h2>
              <p class="lesson-hook">${spansHTML(l.hook || '')}</p>
              <p class="lesson-tags">${store.isWatched(l.id) ? '<span class="tag tag-ok">Sudah ditonton</span>' : ''}${scoreBadge(l.id)}</p>
              <div class="lesson-actions">
                <a class="btn ${store.isWatched(l.id) ? 'btn-ghost' : 'btn-primary'}" href="${lessonHref(l.id)}">${store.isWatched(l.id) ? 'Tonton lagi' : 'Tonton materi'}</a>
                <a class="btn ${store.isWatched(l.id) && !store.score(l.id) ? 'btn-primary' : 'btn-ghost'}" href="${practiceHref(l.id)}">Latihan ${l.quiz.length} soal</a>
              </div>
            </div>
          </li>`,
          )
          .join('')}
      </ol>
      <section class="uji-box">
        <div>
          <h2>Uji Bab ${b.no}</h2>
          <p>10 soal campuran dari semua materi bab ini, urutannya diacak setiap kali.${uji ? ` Skor terbaikmu: <strong>${uji.best}/${uji.total}</strong>.` : ''}</p>
        </div>
        <a class="btn btn-primary" href="#/uji/${b.id}">${uji ? 'Ulangi uji bab' : 'Mulai uji bab'}</a>
      </section>
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
  });
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
