// Capie, maskot yang menemani anak dari daftar akun sampai latihan soal.
//
// Semua pose ada di satu gambar atlas: img/capie.webp (8 kolom × 4 baris, sel 176×232 px).
// Animasinya pose-ke-pose: berganti pose dengan sedikit "pantulan", ditambah gerak napas halus.
// Gambar sumbernya bukan frame animasi berurutan, jadi pergantian dibuat cepat dan diberi efek pantul
// supaya tidak terasa patah-patah.
//
// Pakai:
//   capie('hi', { size: 'md', say: 'Halo!' })  → HTML (otomatis bergerak saat masuk halaman)
//   setMood(el, 'yes')                          → ganti suasana hati Capie yang sudah tampil
import { t } from './i18n.js';

const COLS = 8;
const ROWS = 4;

// Nomor sel di atlas (baris demi baris, mulai 0)
// 0–3 menyapa · 4–7 benar · 8–11 salah · 12–15 terbang · 16–19 mendarat · 20–23 berpikir · 24–31 pose tambahan
const P = { stand: 19, wink: 31, cheer: 25, worried: 24, surprised: 30, sleepy: 29, shy: 3, back: 27 };

// seq: urutan pose; ms: lama tiap pose; loop: diulang; then: suasana hati setelah selesai
export const MOODS = {
  idle: { seq: [P.stand], loop: true },
  hi: { seq: [0, 2, 0, 2, 1], ms: 420, then: 'idle' },
  talk: { seq: [P.stand, 0, P.stand, 1], ms: 1100, loop: true },
  yes: { seq: [4, 5, 6, 7, 5], ms: 360, then: 'idle' },
  no: { seq: [10, 11, P.worried], ms: 650, hold: true },
  think: { seq: [20, 21, 22, 23], ms: 950, loop: true },
  fly: { seq: [12, 13, 14, 15], ms: 240, loop: true },
  land: { seq: [16, 17, 18, 19], ms: 260, then: 'idle' },
  oops: { seq: [16, 17, 8], ms: 320, hold: true },
  worried: { seq: [P.worried], hold: true },
  surprised: { seq: [P.surprised], hold: true },
  sleepy: { seq: [P.sleepy], hold: true },
  // versi berulang untuk etalase di halaman jual
  yesLoop: { seq: [4, 5, 6, 7], ms: 800, loop: true },
  noLoop: { seq: [10, 11, P.worried, 2], ms: 1100, loop: true },
  cheer: { seq: [P.cheer, 7, P.cheer, 4], ms: 520, then: 'idle' },
};

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pos(cell) {
  const c = cell % COLS;
  const r = Math.floor(cell / COLS);
  return `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`;
}

// Pose yang ditampilkan bila gerak dimatikan: pose terakhir untuk reaksi, pose pertama untuk yang berulang.
const stillCell = (m) => (m.loop ? m.seq[0] : m.seq[m.seq.length - 1]);

export function capie(mood = 'idle', { size = 'md', say = '', cls = '', label = '', tag = 'div' } = {}) {
  const m = MOODS[mood] ? mood : 'idle';
  const fig = `<span class="capie capie-${size}" data-capie="${m}" role="img" aria-label="${label || t('capie.alt')}"><span class="capie-f" style="background-position:${pos(stillCell(MOODS[m]))}"></span></span>`;
  if (!say) return cls ? `<span class="${cls}">${fig}</span>` : fig;
  return `<${tag} class="capie-say-row ${cls}">${fig}<p class="capie-bubble">${say}</p></${tag}>`;
}

// ---------- Penggerak ----------
const timers = new WeakMap();

function show(el, cell, bounce) {
  const f = el.querySelector('.capie-f');
  if (!f) return;
  f.style.backgroundPosition = pos(cell);
  if (bounce) {
    f.classList.remove('capie-pop');
    void f.offsetWidth;
    f.classList.add('capie-pop');
  }
}

function run(el) {
  clearTimeout(timers.get(el));
  const name = el.dataset.capie;
  const m = MOODS[name] || MOODS.idle;
  el.classList.toggle('capie-flying', name === 'fly');
  if (reduce()) {
    show(el, stillCell(m), false);
    return;
  }
  let k = 0;
  const step = () => {
    if (!el.isConnected) return;
    show(el, m.seq[k], k > 0 || name !== 'idle');
    k++;
    if (k < m.seq.length) return timers.set(el, setTimeout(step, m.ms || 600));
    if (m.loop) {
      k = 0;
      // diam sejenak pada pose idle, sesekali mengedip
      if (name === 'idle') return timers.set(el, setTimeout(blink, 3200 + Math.random() * 3800));
      return timers.set(el, setTimeout(step, m.ms || 600));
    }
    if (m.then) timers.set(el, setTimeout(() => setMood(el, m.then), (m.ms || 600) + 500));
  };
  const blink = () => {
    if (!el.isConnected || el.dataset.capie !== 'idle') return;
    show(el, Math.random() < 0.6 ? P.wink : P.cheer, true);
    timers.set(
      el,
      setTimeout(() => {
        if (!el.isConnected || el.dataset.capie !== 'idle') return;
        show(el, P.stand, true);
        timers.set(el, setTimeout(blink, 3600 + Math.random() * 4200));
      }, 650),
    );
  };
  step();
}

export function setMood(target, mood) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const fig = el.matches('[data-capie]') ? el : el.querySelector('[data-capie]');
  if (!fig || !MOODS[mood]) return;
  fig.dataset.capie = mood;
  run(fig);
}

export function sayIn(row, text, mood) {
  const el = typeof row === 'string' ? document.querySelector(row) : row;
  if (!el) return;
  const b = el.querySelector('.capie-bubble');
  if (b && text != null) {
    b.innerHTML = text;
    b.classList.remove('capie-bubble-in');
    void b.offsetWidth;
    b.classList.add('capie-bubble-in');
  }
  if (mood) setMood(el, mood);
}

// Capie yang baru masuk ke halaman langsung bergerak, tanpa tiap halaman harus memanggil apa pun.
function scan(root) {
  if (root.nodeType !== 1) return;
  if (root.matches('[data-capie]')) run(root);
  root.querySelectorAll('[data-capie]').forEach(run);
}
if (typeof MutationObserver !== 'undefined') {
  new MutationObserver((list) => list.forEach((r) => r.addedNodes.forEach(scan))).observe(document.documentElement, { childList: true, subtree: true });
}
