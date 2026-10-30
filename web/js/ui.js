// Bagian tampilan yang dipakai banyak halaman: topbar, status kelas, ikon, dan fungsi bantu.
import { KELAS, LESSONS, ORDER, kelasOf } from '../content/index.js';
import { store } from './store.js';
import { BRAND } from './brand.js';
import { t, getLang, setLang } from './i18n.js';
import { ensureContentLang, kelasName, jenjangName } from './l10n.js';
import { auth } from './auth.js';
import { sync } from './sync.js';
import { FREE_SET } from './config.js';

export const app = document.getElementById('app');
export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- Halaman aktif (untuk dibersihkan saat pindah) ----------
let current = null;
export const setCurrent = (c) => {
  current = c;
};
export const cleanup = () => {
  if (current && current.destroy) current.destroy();
  current = null;
};
let rerender = () => {};
export const setRerender = (f) => {
  rerender = f;
};

// ---------- Kelas yang sedang dibuka ----------
export let kelasNo = kelasOf(store.settings.kelas) ? String(store.settings.kelas) : KELAS[0].key;
export function setKelas(key) {
  if (!kelasOf(key) || String(key) === kelasNo) return;
  kelasNo = String(key);
  store.setSetting('kelas', kelasNo);
}
export const kName = (key = kelasNo) => kelasName(kelasOf(key));
export const kFull = (key = kelasNo) => `${jenjangName(kelasOf(key).jenjang)} ${kName(key)}`;

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

// ---------- Ikon ----------
export const ICON = {
  sun: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 21a8 8 0 0 1 16 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  books: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h5v16H4zM10 4h5v16h-5zM16.5 4.5l4 .9-3.2 14.6-4-.9z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16M7 16v-5M12 16V6M17 16v-8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9a14 14 0 0 1 18 0M6 12.5a9 9 0 0 1 12 0M9 16a4 4 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/><path d="M4 4l16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  eye: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 12l2.5 2.5 4.5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
};

// Bendera untuk pemilih bahasa (SVG supaya tampil sama di semua perangkat; emoji bendera tidak muncul di Windows)
export const FLAG = {
  id: '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="10" fill="#E12531"/><rect y="10" width="30" height="10" fill="#FFFFFF"/><rect width="30" height="20" fill="none" stroke="rgba(0,0,0,.18)"/></svg>',
  en: '<svg class="flag" viewBox="0 0 60 40" aria-hidden="true"><clipPath id="fgb"><rect width="60" height="40"/></clipPath><g clip-path="url(#fgb)"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="12"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="7"/></g></svg>',
};

const BRAND_MARK = '<img class="brand-mark" src="./img/capie-head.webp" alt="" width="40" height="40">';

export const initials = (name = '?') => name.trim().charAt(0).toUpperCase();
export const avatar = (p, size = 36) =>
  `<span class="avatar" style="--av:${p?.color || '#9DB6FF'};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.45)}px" aria-hidden="true">${initials(p?.name)}</span>`;

function syncDot() {
  if (!auth.profile) return '';
  const s = sync.status;
  const label = t(`sync.${s}`);
  return `<span class="sync-dot sync-${s}" role="status" title="${label}"><span class="sr-only">${label}</span></span>`;
}

// mode: 'app' (aplikasi) atau 'landing' (halaman jual)
export function topbar(mode = 'app') {
  const th = effectiveTheme();
  const lg = getLang();
  const home = auth.loggedIn ? '#/belajar' : '#/';
  const who = auth.profile || (auth.account ? { name: auth.account.name, color: '#C9D4F5' } : null);
  const right = auth.loggedIn
    ? `<a class="me-btn" href="#/akun" aria-label="${t('nav.account', { name: who.name })}">${avatar(who, 34)}${syncDot()}</a>`
    : mode === 'landing'
      ? `<a class="btn btn-ghost btn-sm top-login" href="#/masuk">${t('nav.login')}</a><a class="btn btn-primary btn-sm top-cta" href="#/coba">${t('nav.try')}</a>`
      : `<a class="btn btn-ghost btn-sm" href="#/masuk">${t('nav.login')}</a>`;
  const links =
    mode === 'landing'
      ? `<nav class="top-links" aria-label="${t('nav.sections')}"><a href="#cara">${t('nav.how')}</a><a href="#unggul">${t('nav.why')}</a><a href="#coba">${t('nav.free')}</a><a href="#harga">${t('nav.price')}</a></nav>`
      : auth.loggedIn
        ? `<nav class="top-links" aria-label="${t('nav.main')}"><a href="#/belajar">${t('nav.learn')}</a>${auth.role === 'ortu' || auth.role === 'guru' ? `<a href="#/ortu">${auth.role === 'guru' ? t('nav.class') : t('nav.parent')}</a>` : ''}${auth.role !== 'anak' && !auth.hasAccess ? `<a href="#/paket">${t('nav.price')}</a>` : ''}</nav>`
        : `<nav class="top-links" aria-label="${t('nav.main')}"><a href="#/belajar">${t('nav.learn')}</a><a href="#/coba">${t('nav.free')}</a><a href="#/paket">${t('nav.price')}</a></nav>`;
  return `
  <header class="topbar${auth.loggedIn ? '' : ' is-guest'}">
    <a class="brand" href="${home}" aria-label="${t('nav.home', { name: BRAND.name })}">
      ${BRAND_MARK}
      <span class="brand-name">${BRAND.name}</span>
      ${mode === 'app' && auth.profile ? `<span class="brand-sub">${kFull()}</span>` : ''}
    </a>
    ${links}
    <div class="top-actions">
      <div class="lang-seg" role="group" aria-label="${t('lang.group')}">
        <button type="button" data-lang="id" lang="id" aria-pressed="${lg === 'id'}" aria-label="Bahasa Indonesia" title="Bahasa Indonesia">${FLAG.id}<span>ID</span></button>
        <button type="button" data-lang="en" lang="en" aria-pressed="${lg === 'en'}" aria-label="English" title="English">${FLAG.en}<span>EN</span></button>
      </div>
      <button type="button" class="icon-btn" id="themeBtn" aria-label="${th === 'dark' ? t('theme.toLight') : t('theme.toDark')}">${th === 'dark' ? ICON.sun : ICON.moon}</button>
      ${right}
    </div>
  </header>`;
}

export function bindTopbar() {
  const b = document.getElementById('themeBtn');
  if (b)
    b.addEventListener('click', () => {
      const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store.setSetting('theme', next);
      b.innerHTML = next === 'dark' ? ICON.sun : ICON.moon;
      b.setAttribute('aria-label', next === 'dark' ? t('theme.toLight') : t('theme.toDark'));
    });
  app.querySelectorAll('.lang-seg button').forEach((x) =>
    x.addEventListener('click', async () => {
      if (x.dataset.lang === getLang()) return;
      setLang(x.dataset.lang);
      await ensureContentLang();
      const y = window.scrollY;
      rerender();
      window.scrollTo({ top: y });
      app.querySelector(`.lang-seg [data-lang="${getLang()}"]`)?.focus();
    }),
  );
  // tautan jangkar (#cara, #harga, …) menggulir halaman tanpa mengganti rute
  app.querySelectorAll('a[href^="#"]:not([href^="#/"])').forEach((a) =>
    a.addEventListener('click', (e) => {
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }),
  );
}

// perbarui titik status sinkronisasi tanpa menggambar ulang halaman
sync.onChange(() => {
  const d = app.querySelector('.sync-dot');
  if (!d) return;
  const s = sync.status;
  d.className = `sync-dot sync-${s}`;
  d.title = t(`sync.${s}`);
  d.innerHTML = `<span class="sr-only">${t(`sync.${s}`)}</span>`;
});

// ---------- Bantuan ----------
export const lessonHref = (id) => `#/materi/${id}`;
export const practiceHref = (id) => `#/latihan/${id}`;
export const isFree = (id) => FREE_SET.has(id);

export function babProgress(b) {
  const watched = b.lessons.filter((l) => store.isWatched(l.id)).length;
  const practiced = b.lessons.filter((l) => store.score(l.id)).length;
  return { watched, practiced, total: b.lessons.length };
}

export function scoreBadge(id) {
  const s = store.score(id);
  if (!s) return '';
  return `<span class="tag ${s.best === s.total ? 'tag-ok' : ''}">${t('bab.tagScore', { b: s.best, t: s.total })}</span>`;
}

export function nextLessonId(id) {
  const k = ORDER.indexOf(id);
  const nx = k >= 0 && k < ORDER.length - 1 ? ORDER[k + 1] : null;
  // tidak menyeberang ke kelas lain
  return nx && LESSONS.get(nx).kelas === LESSONS.get(id).kelas ? nx : null;
}

export function continueTarget() {
  const last = store.last;
  if (last && LESSONS.has(last) && LESSONS.get(last).kelas === kelasNo) {
    const done = store.isWatched(last) && store.score(last);
    if (!done) return { id: last, label: t('home.continue') };
    const nx = nextLessonId(last);
    if (nx) return { id: nx, label: t('home.next') };
  }
  return null;
}

export function setTitle(s) {
  document.title = s ? `${s} · ${BRAND.name}` : `${BRAND.name} · ${t('title.tag')}`;
}

export function focusMain() {
  const h = app.querySelector('h1');
  if (h) {
    h.setAttribute('tabindex', '-1');
    h.focus({ preventScroll: true });
  }
}

export const fmt = (x) => x.toLocaleString(getLang() === 'en' ? 'en-US' : 'id-ID');
export const fmtDate = (ms) => new Date(ms).toLocaleDateString(getLang() === 'en' ? 'en-GB' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
export const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Angka isi aplikasi, dihitung dari isi (bukan ditulis tangan)
export function contentFacts() {
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

export function stateBox(title, body, actions = '') {
  return `<div class="state-box"><h1 class="state-title">${title}</h1><p>${body}</p>${actions ? `<div class="end-actions">${actions}</div>` : ''}</div>`;
}
