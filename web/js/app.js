import { BAB, KELAS, LESSONS, ORDER, kelasOf } from '../content/index.js';
import { Player, Stage, stageSVG, compileLesson } from './player.js';
import { renderQuiz, shuffle } from './quiz.js';
import { store } from './store.js';
import { spansHTML } from './shapes.js';
import { BRAND } from './brand.js';
import { DEMOS } from './demos.js';
import { t, getLang, setLang } from './i18n.js';
import { ensureContentLang, kelasName, jenjangName, kelasDesc, kelasFoot, babTitle, babDesc, lessonTitle, lessonHook, localLesson, localExtra } from './l10n.js';

const app = document.getElementById('app');
let current = null; // pemutar/demo aktif yang perlu dibersihkan saat pindah halaman

// Kelas yang sedang dibuka (diingat di perangkat)
let kelasNo = kelasOf(store.settings.kelas) ? String(store.settings.kelas) : KELAS[0].key;
function setKelas(key) {
  if (!kelasOf(key) || String(key) === kelasNo) return;
  kelasNo = String(key);
  store.setSetting('kelas', kelasNo);
}
const kName = (key = kelasNo) => kelasName(kelasOf(key));
const kFull = (key = kelasNo) => `${jenjangName(kelasOf(key).jenjang)} ${kName(key)}`;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Tema ----------
function effectiveTheme() {
  const th = document.documentElement.dataset.theme;
  if (th === 'light' || th === 'dark') return th;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function applyTheme(th) {
  document.documentElement.dataset.theme = th;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = th === 'dark' ? '#0F1330' : '#F5F7FB';
}
if (store.settings.theme) applyTheme(store.settings.theme);

const THEME_ICON = {
  light: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  dark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor"/></svg>',
};

function topbar() {
  const th = effectiveTheme();
  const lg = getLang();
  return `
  <header class="topbar">
    <a class="brand" href="#/" aria-label="${t('nav.home', { name: BRAND.name })}">
      <svg class="brand-mark" viewBox="0 0 34 34" aria-hidden="true"><rect x="1" y="1" width="32" height="32" rx="10" fill="#2D5BE3"/><circle cx="12" cy="17" r="5" fill="#FFC22E"/><path d="M20 17h7M23.5 13.5v7" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>
      <span class="brand-name">${BRAND.name}</span>
      <span class="brand-sub">${kFull()}</span>
    </a>
    <div class="top-actions">
      <div class="lang-seg" role="group" aria-label="${t('lang.group')}">
        <button type="button" data-lang="id" lang="id" aria-pressed="${lg === 'id'}" aria-label="Bahasa Indonesia">ID</button>
        <button type="button" data-lang="en" lang="en" aria-pressed="${lg === 'en'}" aria-label="English">EN</button>
      </div>
      <button type="button" class="icon-btn" id="themeBtn" aria-label="${th === 'dark' ? t('theme.toLight') : t('theme.toDark')}">${th === 'dark' ? THEME_ICON.light : THEME_ICON.dark}</button>
    </div>
  </header>`;
}

function bindTopbar() {
  const b = document.getElementById('themeBtn');
  if (b)
    b.addEventListener('click', () => {
      const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store.setSetting('theme', next);
      b.innerHTML = next === 'dark' ? THEME_ICON.light : THEME_ICON.dark;
      b.setAttribute('aria-label', next === 'dark' ? t('theme.toLight') : t('theme.toDark'));
    });
  app.querySelectorAll('.lang-seg button').forEach((x) =>
    x.addEventListener('click', async () => {
      if (x.dataset.lang === getLang()) return;
      setLang(x.dataset.lang);
      await ensureContentLang();
      const y = window.scrollY;
      route({ keepScroll: true });
      window.scrollTo({ top: y });
      app.querySelector(`.lang-seg [data-lang="${getLang()}"]`)?.focus();
    }),
  );
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
  return `<span class="tag ${s.best === s.total ? 'tag-ok' : ''}">${t('bab.tagScore', { b: s.best, t: s.total })}</span>`;
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
    if (!done) return { id: last, label: t('home.continue') };
    const nx = nextLessonId(last);
    if (nx) return { id: nx, label: t('home.next') };
  }
  return null;
}

function setTitle(s) {
  document.title = s ? `${s} · ${BRAND.name} ${kName()}` : t('title.home', { name: BRAND.name, kelas: kFull() });
}

function focusMain() {
  const h = app.querySelector('h1');
  if (h) {
    h.setAttribute('tabindex', '-1');
    h.focus({ preventScroll: true });
  }
}

// ---------- Demo bergantian di beranda ----------
const demoText = (D) => (getLang() === 'en' && D.en ? { ...D, ...D.en } : D);

function mountDemo(fig) {
  const el = fig.querySelector('.demo-stage');
  el.innerHTML = stageSVG('');
  const svg = el.querySelector('svg');
  const stage = new Stage(svg);
  const compiled = DEMOS.map((d) => compileLesson(d.lesson));
  const $ = (s) => fig.querySelector(s);
  const dots = [...fig.querySelectorAll('.demo-dot')];
  let d = 0;
  let i = 0;
  let timer = null;

  const label = (k) => {
    const D = demoText(DEMOS[k]);
    $('.demo-badge').textContent = D.badge;
    $('.demo-title').textContent = D.title;
    $('.demo-cap').textContent = D.cap;
    $('.demo-link').href = D.href;
    svg.setAttribute('aria-label', t('home.demoAria', { badge: D.badge, title: D.title, cap: D.cap }));
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
const fmt = (x) => x.toLocaleString(getLang() === 'en' ? 'en-US' : 'id-ID');

// ---------- Pemilih kelas ----------
const JENJANG = ['SD', 'SMP', 'SMA'];
function kelasPicker() {
  return `<nav class="kelas-pick" aria-label="${t('map.pick')}">${JENJANG.map((j) => {
    const ks = KELAS.filter((k) => k.jenjang === j);
    if (!ks.length) return '';
    return `<div class="kp-group"><span class="kp-label">${jenjangName(j)}</span><div class="kp-row">${ks
      .map((k) => {
        const lanjut = /lanjut/i.test(k.key);
        return `<a class="kp-chip${lanjut ? ' kp-wide' : ''}" href="#/kelas/${k.key}" aria-label="${kelasName(k)}"${k.key === kelasNo ? ' aria-current="page"' : ''}>${k.no}${lanjut ? `<small>${t('kelas.lanjut')}</small>` : ''}</a>`;
      })
      .join('')}</div></div>`;
  }).join('')}</nav>`;
}

function babState(pr) {
  if (pr.watched === pr.total) return { cls: 'is-done', text: t('bab.done') };
  if (pr.watched > 0 || pr.practiced > 0) return { cls: 'is-cur', text: t('bab.cur') };
  return { cls: '', text: t('bab.todo') };
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
    : `<a class="btn btn-primary btn-lg" href="${lessonHref(first.id)}">${t('home.start')}</a>`;
  app.innerHTML = `
    ${topbar()}
    <main id="main">
      <section class="hero">
        <div class="hero-text">
          <p class="pill">${t('home.pill')}</p>
          <h1>${spansHTML(t('brand.tagline'))}</h1>
          <p class="lead">${t('brand.lead')}</p>
          <div class="hero-cta">${cta}<a class="btn btn-ghost btn-lg" href="#peta">${t('home.allBab')}</a></div>
        </div>
        <figure class="hero-demo">
          <div class="demo-top"><span class="demo-badge"></span><span class="demo-title"></span></div>
          <div class="demo-stage"></div>
          <figcaption class="demo-foot">
            <span class="demo-cap"></span>
            <span class="demo-nav">
              <span class="demo-dots" role="group" aria-label="${t('home.demoGroup')}">${DEMOS.map((D0, j) => {
                const D = demoText(D0);
                return `<button type="button" class="demo-dot" aria-label="${t('home.demoN', { n: j + 1, badge: D.badge, title: D.title })}"></button>`;
              }).join('')}</span>
              <a class="demo-link" href="#/">${t('home.demoOpen')}</a>
            </span>
          </figcaption>
        </figure>
      </section>

      <section class="facts" aria-label="${t('home.factsAria')}">
        <div class="fact"><strong>${fmt(facts.materi)}</strong><span>${t('fact.materi')}</span></div>
        <div class="fact"><strong>${fmt(facts.soal)}</strong><span>${t('fact.soal')}</span></div>
        <div class="fact"><strong>${t('fact.kelas')}</strong><span>${t('fact.kelasSub')}</span></div>
        <div class="fact"><strong>${t('fact.offline')}</strong><span>${t('fact.offlineSub')}</span></div>
      </section>

      ${
        contEntry
          ? `<a class="cont-card" href="${lessonHref(cont.id)}">
              <span class="cont-body">
                <span class="cont-kicker">${cont.label}</span>
                <span class="cont-title">${lessonTitle(contEntry.lesson)}</span>
                <span class="cont-sub">${kName()} · ${t('bab.short', { no: contEntry.bab.no, title: babTitle(contEntry.bab) })}</span>
              </span>
              <span class="cont-play" aria-hidden="true">${ICON_PLAY}</span>
            </a>`
          : ''
      }

      <section id="peta" class="map" aria-labelledby="peta-h">
        <div class="map-head">
          <h2 id="peta-h">${t('map.title')}</h2>
          ${kelasPicker()}
          <p class="kelas-desc"><strong>${kName()} · ${jenjangName(K.jenjang)} ${t('kelas.fase', { fase: K.fase })}.</strong> ${kelasDesc(K)}</p>
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
                  <span class="bab-title">${t('bab.full', { no: b.no, title: babTitle(b) })}</span>
                  <span class="bab-desc">${babDesc(b)}</span>
                  <span class="bab-meta"><span class="bab-state">${st.text}</span> · ${t('bab.count', { w: pr.watched, n: pr.total })}${uji ? ` · ${t('bab.uji', { b: uji.best, t: uji.total })}` : ''}</span>
                  <span class="meter" aria-hidden="true"><span style="transform:scaleX(${pct / 100})"></span></span>
                </span>
              </a>
            </li>`;
            })
            .join('')}
        </ol>
      </section>

      <footer class="foot">
        <p>${kelasFoot(K)}</p>
        <p>${store.persistent ? t('foot.local') : t('foot.noStore')}</p>
        <button type="button" class="btn btn-ghost btn-sm" id="resetBtn">${t('foot.reset')}</button>
      </footer>
    </main>`;
  bindTopbar();
  current = mountDemo(app.querySelector('.hero-demo'));
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (window.confirm(t('foot.confirm'))) {
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
  setTitle(t('bab.short', { no: b.no, title: babTitle(b) }));
  const uji = store.score(b.id);
  const nextBab = kelasOf(b.kelas).babs[b.no];
  const pr = babProgress(b);
  const curIdx = b.lessons.findIndex((l) => !store.isWatched(l.id));
  app.innerHTML = `
    ${topbar()}
    <main id="main" class="page-bab">
      <a class="back" href="#/kelas/${b.kelas}">← ${t('map.mapOf', { kelas: kName(b.kelas) })}</a>
      <header class="bab-head">
        <p class="pill">${kName(b.kelas)} · ${t('bab.label', { no: b.no })}</p>
        <h1>${babTitle(b)}</h1>
        <p class="lead">${babDesc(b)}</p>
        <div class="bab-progress">
          <span class="meter" aria-hidden="true"><span style="transform:scaleX(${pr.watched / pr.total})"></span></span>
          <span class="bab-progress-t">${t('bab.watched', { w: pr.watched, n: pr.total })}</span>
        </div>
      </header>
      <ol class="path lesson-list">
        ${b.lessons
          .map((l, k) => {
            const done = store.isWatched(l.id);
            const cls = done ? 'is-done' : k === curIdx ? 'is-cur' : '';
            return `<li class="path-item ${cls}">
            <span class="path-node" aria-hidden="true">${done ? ICON_CHECK : `${b.no}.${k + 1}`}</span>
            <div class="path-card">
              ${k === curIdx ? `<p class="path-flag">${t('bab.startHere')}</p>` : ''}
              <h2 class="lesson-title">${lessonTitle(l)}</h2>
              <p class="lesson-hook">${spansHTML(lessonHook(l) || '')}</p>
              <p class="lesson-tags">${done ? `<span class="tag tag-ok">${t('bab.tagWatched')}</span>` : ''}${scoreBadge(l.id)}</p>
              <div class="lesson-actions">
                <a class="btn ${done ? 'btn-ghost' : 'btn-primary'}" href="${lessonHref(l.id)}">${done ? t('bab.rewatch') : t('bab.watch')}</a>
                <a class="btn ${done && !store.score(l.id) ? 'btn-primary' : 'btn-ghost'}" href="${practiceHref(l.id)}">${t('bab.practice', { n: l.quiz.length })}</a>
              </div>
            </div>
          </li>`;
          })
          .join('')}
        <li class="path-item path-uji${uji ? ' is-done' : ''}">
          <span class="path-node" aria-hidden="true">${ICON_STAR}</span>
          <div class="path-card uji-box">
            <div>
              <h2>${t('bab.ujiTitle', { no: b.no })}</h2>
              <p>${t('bab.ujiDesc')}${uji ? ` ${t('bab.ujiBest', { b: uji.best, t: uji.total })}` : ''}</p>
            </div>
            <a class="btn btn-primary" href="#/uji/${b.id}">${uji ? t('bab.ujiRedo') : t('bab.ujiStart')}</a>
          </div>
        </li>
      </ol>
      ${nextBab ? `<p class="next-bab"><a href="#/bab/${nextBab.id}">${t('bab.short', { no: nextBab.no, title: babTitle(nextBab) })} →</a></p>` : ''}
    </main>`;
  bindTopbar();
}

function viewMateri(id) {
  const entry = LESSONS.get(id);
  if (!entry) return viewNotFound();
  const { bab, i } = entry;
  const loc = localLesson(entry.lesson);
  const lesson = loc.lesson;
  setKelas(bab.kelas);
  setTitle(lesson.title);
  store.setLast(id);
  app.innerHTML = `
    ${topbar()}
    <main id="main" class="page-materi">
      <div class="materi-head">
        <a class="back" href="#/bab/${bab.id}">← ${t('bab.short', { no: bab.no, title: babTitle(bab) })}</a>
        <h1 class="materi-title"><span class="materi-no">${bab.no}.${i + 1}</span> ${lesson.title}</h1>
        ${getLang() === 'en' && loc.lang !== 'en' ? `<p class="lang-note" lang="en">${t('materi.idOnly')}</p>` : ''}
      </div>
      <div id="player"${loc.lang !== getLang() ? ` lang="${loc.lang}"` : ''}></div>
      <p class="skip"><a href="${practiceHref(id)}">${t('materi.skip')}</a></p>
    </main>`;
  bindTopbar();
  const nx = nextLessonId(id);
  current = new Player(app.querySelector('#player'), lesson, {
    onComplete: () => store.markWatched(id),
    practiceHref: practiceHref(id),
    nextHref: nx ? lessonHref(nx) : null,
    lang: loc.lang,
  });
  window.__player = current; // dipakai skrip uji otomatis
}

function viewLatihan(id) {
  const entry = LESSONS.get(id);
  if (!entry) return viewNotFound();
  const { bab, i } = entry;
  const loc = localLesson(entry.lesson);
  const title = loc.lesson.title;
  setKelas(bab.kelas);
  setTitle(t('latihan.title', { no: `${bab.no}.${i + 1}`, title }));
  const isLastInBab = i === bab.lessons.length - 1;
  const nx = nextLessonId(id);
  app.innerHTML = `${topbar()}<main id="main" class="page-quiz"></main>`;
  bindTopbar();
  renderQuiz(app.querySelector('#main'), {
    id,
    title: t('latihan.title', { no: `${bab.no}.${i + 1}`, title }),
    backHref: `#/bab/${bab.id}`,
    backLabel: t('bab.short', { no: bab.no, title: babTitle(bab) }),
    questions: loc.quiz,
    nextHref: isLastInBab ? `#/uji/${bab.id}` : nx ? lessonHref(nx) : null,
    nextLabel: isLastInBab ? t('latihan.toUji', { no: bab.no }) : nx ? t('latihan.nextMateri', { title: lessonTitle(LESSONS.get(nx).lesson) }) : '',
    numHint: numHint(bab.kelas),
  });
}

// Petunjuk isian yang sesuai jenjang: anak SD tidak perlu membaca soal bilangan negatif
function numHint(kelas) {
  if (kelasOf(kelas).jenjang !== 'SD') return getLang() === 'en' ? t('hint.default') : undefined;
  return +kelasOf(kelas).no >= 4 ? t('hint.sdHigh') : t('hint.sdLow');
}

function pickUji(b) {
  const pool = b.lessons.map((l) => shuffle(localLesson(l).quiz));
  const picked = [];
  // satu soal dari tiap materi dulu, lalu isi sisanya secara acak
  pool.forEach((qs) => qs.length && picked.push(qs.shift()));
  const rest = shuffle([...pool.flat(), ...localExtra(b)]);
  while (picked.length < 10 && rest.length) picked.push(rest.shift());
  return shuffle(picked);
}

function viewUji(id) {
  const b = BAB.find((x) => x.id === id);
  if (!b) return viewNotFound();
  setKelas(b.kelas);
  const title = t('uji.title', { no: b.no, title: babTitle(b) });
  setTitle(title);
  const nextBab = kelasOf(b.kelas).babs[b.no];
  app.innerHTML = `${topbar()}<main id="main" class="page-quiz"></main>`;
  bindTopbar();
  renderQuiz(app.querySelector('#main'), {
    id: b.id,
    title,
    backHref: `#/bab/${b.id}`,
    backLabel: t('bab.short', { no: b.no, title: babTitle(b) }),
    questions: pickUji(b),
    nextHref: nextBab ? `#/bab/${nextBab.id}` : `#/kelas/${b.kelas}`,
    nextLabel: nextBab ? t('uji.next', { no: nextBab.no, title: babTitle(nextBab) }) : t('uji.back'),
    kind: t('q.kindUji'),
    numHint: numHint(b.kelas),
  });
}

function viewNotFound() {
  setTitle(t('nf.title'));
  app.innerHTML = `
    ${topbar()}
    <main id="main">
      <div class="state-box">
        <h1 class="state-title">${t('nf.title')}</h1>
        <p>${t('nf.body')}</p>
        <a class="btn btn-primary" href="#/">${t('nf.back')}</a>
      </div>
    </main>`;
  bindTopbar();
}

// ---------- Router ----------
function route({ keepScroll = false } = {}) {
  if (current && current.destroy) current.destroy();
  current = null;
  const h = location.hash.replace(/^#\/?/, '');
  if (h === 'peta') {
    // tautan jangkar ke peta belajar di beranda
    viewHome();
    if (!keepScroll) document.getElementById('peta')?.scrollIntoView();
    return;
  }
  const [page, id] = h.split('/');
  if (!keepScroll) window.scrollTo({ top: 0 });
  try {
    if (!page) viewHome();
    else if (page === 'kelas') {
      if (!kelasOf(id)) return viewNotFound();
      setKelas(id);
      viewHome();
      if (!keepScroll) document.getElementById('peta')?.scrollIntoView();
    } else if (page === 'bab') viewBab(id);
    else if (page === 'materi') viewMateri(id);
    else if (page === 'latihan') viewLatihan(id);
    else if (page === 'uji') viewUji(id);
    else viewNotFound();
    if (!keepScroll) focusMain();
  } catch (err) {
    console.error(err);
    app.innerHTML = `${topbar()}<main id="main"><div class="state-box"><h1 class="state-title">${t('err.title')}</h1><p>${t('err.body')}</p><p class="muted small">${String(err && err.message ? err.message : err).replace(/</g, '&lt;')}</p><a class="btn btn-primary" href="#/">${t('nf.back')}</a></div></main>`;
    bindTopbar();
  }
}

window.addEventListener('hashchange', () => route());
ensureContentLang().then(() => route());

// ---------- PWA ----------
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
