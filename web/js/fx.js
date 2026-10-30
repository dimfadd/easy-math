// Efek gerak ringan di atas halaman: debu saat Capie mendarat, percikan saat jawaban benar,
// konfeti saat merayakan, hati saat Capie disentuh, garis kecepatan saat terbang.
//
// Rumus efek diadaptasi untuk browser dari pustaka fx.mjs dan core.mjs di
// claude-animation-skill (https://github.com/buildwithhanif/claude-animation-skill),
// MIT License, Copyright (c) 2026 Hanif (@hanifproduktif). Teks lisensi: web/licenses/claude-animation-skill.txt
// Pustaka aslinya merender video MP4 di Node. Di sini hanya rumus efek yang dipakai, digambar di satu
// kanvas transparan yang hanya berjalan selama ada efek aktif.
//
// Prinsip gerak yang diikuti (references/motion.md di skill tersebut):
// pop cepat lalu diam, overshoot kecil (eBack), efek hilang dalam ±0,3–0,6 detik, kelompok dibuat bertahap.

const INK = '#15213B';
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const eOut = (k) => 1 - Math.pow(1 - clamp(k), 3);
export const eBack = (k, s = 1.8) => {
  k = clamp(k) - 1;
  return 1 + (s + 1) * k * k * k + s * k * k;
};
const rng = (seed) => {
  let s = Math.max(1, Math.floor(seed)) % 2147483647;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
};
function ellipse(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), 0, 0, Math.PI * 2);
}

// ---------- rumus efek (fungsi murni dari waktu d sejak efek mulai, dalam detik) ----------
function particles(ctx, d, x, y, o) {
  const { n = 14, speed = 420, life = 0.6, gravity = 900, colors, size = 7, kind = 'spark', seed = 1, spread = Math.PI * 2, dir = -Math.PI / 2 } = o;
  if (d > life * 1.6) return false;
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const a = dir + (r() - 0.5) * spread;
    const sp = speed * (0.45 + r() * 0.75);
    const L = life * (0.6 + r() * 0.6);
    const dd = Math.min(d, L);
    const fade = 1 - clamp(d / L);
    const sz = size * (0.6 + r() * 0.8);
    if (fade <= 0) continue;
    const px = x + Math.cos(a) * sp * dd;
    const py = y + Math.sin(a) * sp * dd + 0.5 * gravity * dd * dd;
    const col = colors[i % colors.length];
    ctx.save();
    ctx.globalAlpha *= fade;
    if (kind === 'spark') {
      const vx = Math.cos(a) * sp;
      const vy = Math.sin(a) * sp + gravity * dd;
      const vl = Math.hypot(vx, vy) || 1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - (vx / vl) * sz * 2.6, py - (vy / vl) * sz * 2.6);
      ctx.lineWidth = sz * 0.55;
      ctx.lineCap = 'round';
      ctx.strokeStyle = col;
      ctx.stroke();
    } else if (kind === 'confetti') {
      ctx.translate(px, py);
      ctx.rotate(d * 8 + i);
      ctx.scale(Math.cos(d * 10 + i), 1);
      ctx.fillStyle = col;
      ctx.fillRect(-sz / 2, -sz * 0.7, sz, sz * 1.4);
    } else if (kind === 'dust') {
      const s2 = sz * (1 + d * 3);
      ellipse(ctx, px, py, s2, s2 * 0.7);
      ctx.fillStyle = col;
      ctx.fill();
    }
    ctx.restore();
  }
  return true;
}

// dua gumpal debu meluncur ke samping di kaki saat mendarat
function landDust(ctx, d, x, y, s, color) {
  const D = 0.45;
  if (d > D) return false;
  const k = eOut(d / D);
  ctx.save();
  ctx.globalAlpha *= 1 - d / D;
  for (const sg of [-1, 1])
    for (let i = 0; i < 3; i++) {
      const px = x + sg * (10 + k * (24 + i * 11)) * s;
      const py = y - (2 + i * 3) * s - k * 4 * s;
      const r = (6 + i * 2) * s * (1 - 0.3 * k);
      ellipse(ctx, px, py, r, r * 0.75);
      ctx.fillStyle = color;
      ctx.fill();
    }
  ctx.restore();
  return true;
}

function ring(ctx, d, x, y, r1, { dur = 0.35, w = 4, color = '#FFC22E', squash = 1 } = {}) {
  if (d > dur) return false;
  const k = eOut(d / dur);
  ctx.save();
  ctx.globalAlpha *= 1 - d / dur;
  ctx.beginPath();
  ctx.ellipse(x, y, Math.max(1, r1 * k), Math.max(1, r1 * k * squash), 0, 0, Math.PI * 2);
  ctx.lineWidth = w * (1 - k * 0.7);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.restore();
  return true;
}

function heart(ctx, d, x, y, s) {
  const D = 0.9;
  if (d > D) return false;
  const k = eBack(clamp(d / 0.18), 2);
  const a = 1 - clamp((d - D * 0.55) / (D * 0.45));
  const yy = y - eOut(d / D) * 46;
  ctx.save();
  ctx.globalAlpha *= a;
  ctx.translate(x + Math.sin(d * 9) * 4, yy);
  ctx.scale(k * s, k * s);
  ctx.beginPath();
  for (let i = 0; i <= 30; i++) {
    const t = (i / 30) * Math.PI * 2;
    const hx = 16 * Math.pow(Math.sin(t), 3);
    const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    i ? ctx.lineTo(hx * 0.5, hy * 0.5) : ctx.moveTo(hx * 0.5, hy * 0.5);
  }
  ctx.closePath();
  ctx.fillStyle = '#E5484D';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.restore();
  return true;
}

// garis kecepatan di belakang benda yang sedang terbang; pos() memberi posisi dan arah terkini
function speedLines(ctx, d, o) {
  const p = o.pos();
  if (!p || d > o.max) return false;
  const { x, y, vx, vy, s } = p;
  const v = Math.hypot(vx, vy);
  if (v < 0.2) return true;
  const ux = vx / v;
  const uy = vy / v;
  ctx.save();
  ctx.strokeStyle = o.color;
  ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) {
    const off = (i - 1) * 9 * s;
    const len = (14 + ((i * 7 + Math.floor(d * 30)) % 3) * 6) * s;
    const bx = x - ux * (18 * s) + -uy * off;
    const by = y - uy * (18 * s) + ux * off;
    ctx.globalAlpha = 0.55 - i * 0.12;
    ctx.lineWidth = 2.4 * s;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx - ux * len, by - uy * len);
    ctx.stroke();
  }
  ctx.restore();
  return true;
}

// ---------- satu kanvas untuk semua efek ----------
const reduce = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const live = [];
let canvas = null;
let ctx = null;
let raf = 0;
let seedN = 1;

function ensure() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.className = 'fx-layer';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  const size = () => {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  addEventListener('resize', size);
}

function loop(now) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = live.length - 1; i >= 0; i--) {
    const e = live[i];
    const d = (now - e.t0) / 1000;
    if (d < 0) continue;
    if (!e.draw(ctx, d)) live.splice(i, 1);
  }
  raf = live.length ? requestAnimationFrame(loop) : 0;
  if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
}

function add(draw, delay = 0) {
  if (typeof document === 'undefined' || reduce()) return;
  ensure();
  live.push({ draw, t0: performance.now() + delay });
  if (!raf) raf = requestAnimationFrame(loop);
}

const css = (name, fallback) => (typeof getComputedStyle === 'function' ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() : '') || fallback;

// ---------- efek siap pakai (koordinat layar, px) ----------
export const fx = {
  // debu di kaki saat mendarat
  land(x, y, s = 1) {
    const col = css('--mut', '#A0AABC');
    add((c, d) => landDust(c, d, x, y, s, col));
  },
  // percikan kecil + cincin: jawaban benar
  sparkle(x, y, s = 1) {
    const seed = seedN++ * 97;
    const colors = [css('--acc', '#FFC22E'), css('--ok', '#138A5B'), '#FFF3C4'];
    add((c, d) => ring(c, d, x, y, 34 * s, { color: colors[0] }));
    add((c, d) => particles(c, d, x, y, { n: 12, speed: 260 * s, life: 0.45, gravity: 500, size: 5 * s, colors, seed }), 40);
  },
  // konfeti dari satu titik ke atas: merayakan
  confetti(x, y, s = 1) {
    const seed = seedN++ * 131;
    const colors = ['#FFC22E', '#2D5BE3', '#138A5B', '#E5533A', '#8EA8FF'];
    add((c, d) => particles(c, d, x, y, { kind: 'confetti', n: 46, speed: 620 * s, life: 1.25, gravity: 760, size: 9 * s, spread: Math.PI * 0.9, colors, seed }));
    add((c, d) => particles(c, d, x, y, { kind: 'confetti', n: 30, speed: 480 * s, life: 1.2, gravity: 720, size: 8 * s, spread: Math.PI * 1.1, colors, seed: seed + 7 }), 140);
  },
  // hati melayang: Capie disentuh
  heart(x, y, s = 1) {
    add((c, d) => heart(c, d, x, y, s));
  },
  // garis kecepatan mengikuti benda yang terbang
  trail(pos, max = 1.4) {
    const color = css('--mut', '#A0AABC');
    add((c, d) => speedLines(c, d, { pos, max, color }));
  },
};
