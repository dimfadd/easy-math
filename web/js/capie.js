// Capie, maskot yang menemani anak dari daftar akun sampai latihan soal.
//
// Semua pose ada di satu gambar atlas: img/capie.webp (8 kolom × 4 baris, sel 176×232 px).
// Animasinya pose-ke-pose: berganti pose dengan sedikit "pantulan", ditambah gerak napas halus.
//
// Capie sebagai pemandu (bawaan): hanya ada SATU Capie yang berpindah-pindah.
//   Setiap capie() di halaman adalah "tempat hinggap". Capie terbang dari tempat terakhirnya
//   (di halaman yang sama atau halaman sebelumnya) ke tempat hinggap terbaru yang terlihat di layar,
//   lalu mendarat. Saat halaman digulir, Capie menyusul ke tempat hinggap yang baru terlihat.
//   Tempat hinggap yang ditinggalkan dibiarkan kosong.
//
// Pakai:
//   capie('hi', { size: 'md', say: 'Halo!' })   → HTML tempat hinggap (Capie terbang ke sini)
//   capie('think', { guide: false })             → Capie diam di tempat (misalnya etalase)
//   setMood(el, 'yes')                           → ganti suasana hati Capie
import { t } from './i18n.js';

const COLS = 8;
const ROWS = 4;

// Nomor sel di atlas (baris demi baris, mulai 0)
// 0–3 menyapa · 4–7 benar · 8–11 salah · 12–15 terbang · 16–19 mendarat · 20–23 berpikir · 24–31 pose tambahan
const P = { stand: 19, wink: 31, cheer: 25, worried: 24, surprised: 30, sleepy: 29, shy: 3, back: 27 };
const FLY = [12, 13, 14, 15];
const LAND = [17, 18, 19];

// seq: urutan pose; ms: lama tiap pose; loop: diulang; then: suasana hati setelah selesai
export const MOODS = {
  idle: { seq: [P.stand], loop: true },
  hi: { seq: [0, 2, 0, 2, 1], ms: 420, then: 'idle' },
  talk: { seq: [P.stand, 0, P.stand, 1], ms: 1100, loop: true },
  yes: { seq: [4, 5, 6, 7, 5], ms: 360, then: 'idle' },
  no: { seq: [10, 11, P.worried], ms: 650, hold: true },
  think: { seq: [20, 21, 22, 23], ms: 950, loop: true },
  fly: { seq: FLY, ms: 240, loop: true },
  land: { seq: [16, 17, 18, 19], ms: 260, then: 'idle' },
  oops: { seq: [16, 17, 8], ms: 320, hold: true },
  worried: { seq: [P.worried], hold: true },
  surprised: { seq: [P.surprised], hold: true },
  sleepy: { seq: [P.sleepy], hold: true },
  // versi berulang untuk etalase di halaman jual
  yesLoop: { seq: [4, 5, 6, 7], ms: 800, loop: true },
  noLoop: { seq: [10, 11, P.worried, 2], ms: 1100, loop: true },
  cheer: { seq: [P.cheer, 7, P.cheer, 4], ms: 520, then: 'idle' },
  // reaksi saat Capie disentuh
  giggle: { seq: [P.wink, 5, P.wink, 4], ms: 300, then: 'idle' },
  wave: { seq: [2, 0, 2, 0], ms: 300, then: 'idle' },
};
const POKES = ['giggle', 'cheer', 'wave', 'yes'];

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function pos(cell) {
  const c = cell % COLS;
  const r = Math.floor(cell / COLS);
  return `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`;
}

// Pose yang ditampilkan bila gerak dimatikan: pose terakhir untuk reaksi, pose pertama untuk yang berulang.
const stillCell = (m) => (m.loop ? m.seq[0] : m.seq[m.seq.length - 1]);

export function capie(mood = 'idle', { size = 'md', say = '', cls = '', label = '', tag = 'div', guide = true } = {}) {
  const m = MOODS[mood] ? mood : 'idle';
  const fig = `<span class="capie capie-${size}${guide ? ' capie-away' : ''}" data-capie="${m}"${guide ? ' data-guide' : ''} role="img" aria-label="${label || t('capie.alt')}"><span class="capie-f" style="background-position:${pos(stillCell(MOODS[m]))}"></span></span>`;
  if (!say) return cls ? `<span class="${cls}">${fig}</span>` : fig;
  return `<${tag} class="capie-say-row ${cls}">${fig}<p class="capie-bubble">${say}</p></${tag}>`;
}

// ---------- Pose dan suasana hati ----------
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
    if (m.then) timers.set(el, setTimeout(() => setMood(el, el.dataset.back || m.then), (m.ms || 600) + 500));
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

const figOf = (target) => {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return null;
  return el.matches('[data-capie]') ? el : el.querySelector('[data-capie]');
};

export function setMood(target, mood) {
  const fig = figOf(target);
  if (!fig || !MOODS[mood]) return;
  delete fig.dataset.back;
  fig.dataset.capie = mood;
  run(fig);
}

// Reaksi sementara, lalu kembali ke suasana hati semula (dipakai saat disentuh dan saat bangun tidur)
function react(fig, mood) {
  const back = fig.dataset.back || fig.dataset.capie;
  fig.dataset.capie = mood;
  fig.dataset.back = MOODS[back]?.then && !MOODS[back].loop ? MOODS[back].then : back;
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

// ---------- Pemandu yang terbang ----------
// Satu "aktor" melayang di atas halaman. Ia hanya terlihat selama terbang dan mendarat;
// setelah mendarat, Capie di tempat hinggap yang dimunculkan dan aktor disembunyikan.
const G = {
  actor: null,
  frame: null,
  current: null, // tempat hinggap yang sedang ditempati
  last: null, // posisi terakhir di layar {x, y, w}, bertahan saat pindah halaman
  seen: new Map(), // tempat hinggap → waktu terakhir masuk layar
  io: null,
  flying: null,
  queued: false,
};

function actor() {
  if (G.actor) return G.actor;
  const a = document.createElement('div');
  a.className = 'capie-actor';
  a.setAttribute('aria-hidden', 'true');
  a.innerHTML = '<span class="capie-f"></span>';
  document.body.appendChild(a);
  G.actor = a;
  G.frame = a.firstChild;
  return a;
}

const rectOf = (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.height };
};

function reveal(slot) {
  slot.classList.remove('capie-away');
  const b = slot.parentElement?.querySelector('.capie-bubble');
  if (b) {
    b.classList.remove('capie-bubble-in');
    void b.offsetWidth;
    b.classList.add('capie-bubble-in');
  }
  run(slot);
}

function settle(slot) {
  G.current = slot;
  G.last = rectOf(slot);
  if (G.actor) G.actor.style.display = 'none';
  reveal(slot);
}

// Pilih tujuan: tempat hinggap yang paling baru masuk layar dan masih terlihat.
function pick() {
  let best = null;
  let at = -1;
  for (const [slot, time] of G.seen) {
    if (!slot.isConnected) {
      G.seen.delete(slot);
      continue;
    }
    if (time > at) {
      best = slot;
      at = time;
    }
  }
  return best;
}

function schedule() {
  if (G.queued) return;
  G.queued = true;
  requestAnimationFrame(() => {
    G.queued = false;
    const target = pick();
    if (!target || target === G.current || target === G.flying?.to) return;
    flyTo(target);
  });
}

function flyTo(slot) {
  const to = rectOf(slot);
  const from = G.last;
  const prev = G.current;
  if (prev && prev !== slot && prev.isConnected) prev.classList.add('capie-away');
  // Tanpa animasi: gerak dimatikan, belum ada posisi asal, atau jaraknya terlalu dekat.
  if (reduce() || typeof Element.prototype.animate !== 'function') return settle(slot);
  const start = from
    ? { x: Math.min(Math.max(from.x, -from.w), innerWidth), y: Math.min(Math.max(from.y, -from.w * 1.4), innerHeight), w: from.w }
    : { x: to.x + Math.min(120, innerWidth * 0.2), y: -to.h - 20, w: to.w };
  const dx = to.x - start.x;
  const dy = to.y - start.y;
  const dist = Math.hypot(dx, dy);
  if (from && dist < 24) return settle(slot);

  G.flying?.cancel();
  const a = actor();
  a.style.display = 'block';
  a.style.width = `${to.w}px`;
  const s0 = start.w / to.w;
  const lift = Math.min(170, 50 + dist * 0.3);
  const dur = Math.min(1100, Math.max(520, dist * 1.1));
  const dir = dx < -4 ? -1 : 1;
  const tilt = Math.max(-14, Math.min(14, dx / 30));
  // lintasan melengkung: titik kontrol di atas garis lurus
  const cx = start.x + dx / 2;
  const cy = Math.min(start.y, to.y) - lift;
  const N = 14;
  const frames = [];
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    const x = (1 - p) ** 2 * start.x + 2 * (1 - p) * p * cx + p * p * to.x;
    const y = (1 - p) ** 2 * start.y + 2 * (1 - p) * p * cy + p * p * to.y;
    const s = s0 + (1 - s0) * p;
    const r = tilt * Math.sin(Math.PI * p);
    frames.push({ transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${s})` });
  }
  G.frame.style.transform = `scaleX(${dir})`;
  let k = 0;
  G.frame.style.backgroundPosition = pos(FLY[0]);
  const flap = setInterval(() => (G.frame.style.backgroundPosition = pos(FLY[++k % FLY.length])), 110);
  const anim = a.animate(frames, { duration: dur, easing: 'cubic-bezier(.45,.05,.25,1)', fill: 'forwards' });
  let landTimer = null;
  G.flying = {
    to: slot,
    cancel() {
      clearInterval(flap);
      clearTimeout(landTimer);
      anim.cancel();
      G.flying = null;
    },
  };
  anim.onfinish = () => {
    clearInterval(flap);
    if (!slot.isConnected) {
      G.flying = null;
      a.style.display = 'none';
      return schedule();
    }
    // posisi akhir dikunci ke tempat hinggap (bisa bergeser bila halaman digulir saat terbang)
    const end = rectOf(slot);
    a.style.transform = `translate(${end.x}px, ${end.y}px)`;
    anim.cancel();
    G.frame.style.transform = '';
    let j = 0;
    const land = () => {
      if (j < LAND.length) {
        G.frame.style.backgroundPosition = pos(LAND[j++]);
        G.frame.classList.remove('capie-pop');
        void G.frame.offsetWidth;
        G.frame.classList.add('capie-pop');
        landTimer = setTimeout(land, 120);
        return;
      }
      G.flying = null;
      settle(slot);
      schedule();
    };
    land();
  };
}

function watch(slot) {
  if (!G.io) {
    G.io = new IntersectionObserver(
      (entries) => {
        const now = performance.now();
        for (const e of entries) {
          if (e.isIntersecting) G.seen.set(e.target, now);
          else G.seen.delete(e.target);
        }
        schedule();
      },
      { threshold: 0.6 },
    );
  }
  G.io.observe(slot);
}

// Bagian di bawah hanya berjalan di browser (uji di Node ikut memuat berkas ini).
const BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';

if (BROWSER) {
  // Posisi terakhir ikut diperbarui saat halaman digulir, supaya Capie terbang dari tempat yang benar.
  let scrollQueued = false;
  addEventListener(
    'scroll',
    () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        if (G.current?.isConnected && !G.flying) G.last = rectOf(G.current);
      });
    },
    { passive: true },
  );

  // ---------- Interaksi ----------
  // Disentuh: Capie bereaksi lucu (bergiliran), lalu kembali ke suasana hati semula.
  let pokeN = 0;
  document.addEventListener('click', (e) => {
    const fig = e.target.closest?.('.capie:not(.capie-away)');
    if (!fig || reduce()) return;
    fig.classList.remove('capie-hop');
    void fig.offsetWidth;
    fig.classList.add('capie-hop');
    react(fig, POKES[pokeN++ % POKES.length]);
  });

  // Tidak ada aktivitas 40 detik: Capie tertidur. Aktivitas apa pun membangunkannya.
  const SLEEP_MS = 40000;
  let sleepTimer = null;
  let sleeping = null;
  function wake() {
    clearTimeout(sleepTimer);
    if (sleeping) {
      const fig = sleeping;
      sleeping = null;
      if (fig.isConnected) {
        const back = fig.dataset.back || 'idle';
        fig.dataset.capie = 'surprised';
        run(fig);
        setTimeout(() => fig.isConnected && fig.dataset.capie === 'surprised' && setMood(fig, back), 700);
      }
    }
    sleepTimer = setTimeout(() => {
      const fig = G.current;
      if (!fig?.isConnected || document.hidden || reduce()) return;
      fig.dataset.back = fig.dataset.capie;
      fig.dataset.capie = 'sleepy';
      run(fig);
      sleeping = fig;
    }, SLEEP_MS);
  }
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((ev) => addEventListener(ev, wake, { passive: true }));
  wake();
}

// ---------- Capie baru di halaman ----------
function scan(root) {
  if (root.nodeType !== 1) return;
  const list = root.matches('[data-capie]') ? [root] : [...root.querySelectorAll('[data-capie]')];
  for (const el of list) {
    run(el);
    if (el.hasAttribute('data-guide')) {
      if (typeof IntersectionObserver === 'undefined') el.classList.remove('capie-away');
      else watch(el);
    }
  }
}
if (BROWSER && typeof MutationObserver !== 'undefined') {
  new MutationObserver((list) =>
    list.forEach((r) => {
      r.addedNodes.forEach(scan);
      if (r.removedNodes.length) schedule();
    }),
  ).observe(document.documentElement, { childList: true, subtree: true });
}
