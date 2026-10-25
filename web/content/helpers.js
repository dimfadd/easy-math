// Fungsi bantu untuk menulis materi. Panggung: 400 × 300.
import { nlX, panPos, stripMarkup } from '../js/shapes.js';

// Teks
export const T = (id, text, x, y, o = {}) => ({ id, t: 'text', text, x, y, size: 26, w: 800, ...o });

// Keping: kind '+' atau '-'
export function chips(prefix, kind, n, x0, y0, { dx = 36, dy = 38, cols = 10, size = 28, start = 0, ...rest } = {}) {
  return Array.from({ length: n }, (_, i) => ({
    id: `${prefix}${start + i}`,
    t: 'icon',
    name: kind === '+' ? 'chipP' : 'chipN',
    size,
    x: x0 + (i % cols) * dx,
    y: y0 + Math.floor(i / cols) * dy,
    ...rest,
  }));
}

// Objek "set" untuk memindahkan sederet id ke posisi baris
export function place(prefix, idxs, x0, y0, { dx = 36, dy = 38, cols = 10, ...rest } = {}) {
  const out = {};
  idxs.forEach((idx, i) => {
    out[`${prefix}${idx}`] = { x: x0 + (i % cols) * dx, y: y0 + Math.floor(i / cols) * dy, ...rest };
  });
  return out;
}

export const range = (a, b) => Array.from({ length: b - a }, (_, i) => a + i);

// Garis bilangan
export function numberLine(id, x, y, w, min, max, extra = {}) {
  const cfg = { x, w, min, max };
  return { el: { id, t: 'nline', x, y, w, min, max, ...extra }, at: (v) => nlX(cfg, v), y };
}

// Titik di garis bilangan
export const dot = (id, x, y, c = 'acc', o = {}) => ({ id, t: 'circle', x, y, r: 7, fill: c, stroke: 'paper', sw: 2, ...o });

// Lompatan
export const hop = (id, x1, x2, y, o = {}) => ({ id, t: 'hop', x: x1, x2, y, ...o });

// Kotak
export const box = (id, x, y, w, h, o = {}) => ({ id, t: 'rect', x, y, w, h, ...o });

// Garis
export const ln = (id, x1, y1, x2, y2, o = {}) => ({ id, t: 'line', x: x1, y: y1, x2, y2, ...o });

// Pecahan
export const F = (id, nn, d, x, y, o = {}) => ({ id, t: 'frac', n: nn, d, x, y, size: 24, ...o });

// Timbangan dua lengan. Mengembalikan elemen dasar + posisi piring.
// tilt: derajat, positif = sisi kanan turun.
export const PAN_Y = 52;
export function balance(prefix, cx, cy, tilt = 0, len = 120) {
  const pans = panPos(cx, cy, len, tilt);
  const panY = PAN_Y;
  const els = [
    { id: `${prefix}base`, t: 'poly', x: cx, y: cy, pts: [[-26, 96], [26, 96], [0, 0]], fill: 'mut-soft', stroke: 'ink', sw: 2.5, z: -2 },
    { id: `${prefix}beam`, t: 'rect', x: cx, y: cy, w: len * 2 + 16, h: 8, r: 4, fill: 'ink', stroke: 'ink', sw: 1, rot: tilt, z: -1 },
    { id: `${prefix}pivot`, t: 'circle', x: cx, y: cy, r: 6, fill: 'acc', stroke: 'ink', sw: 2 },
    { id: `${prefix}panL`, t: 'path', x: pans.left.x, y: pans.left.y + panY, d: 'M-52,0 Q0,16 52,0 Z', fill: 'mut-soft', stroke: 'ink', sw: 2.5, z: -1 },
    { id: `${prefix}panR`, t: 'path', x: pans.right.x, y: pans.right.y + panY, d: 'M-52,0 Q0,16 52,0 Z', fill: 'mut-soft', stroke: 'ink', sw: 2.5, z: -1 },
    { id: `${prefix}strL`, t: 'path', x: pans.left.x, y: pans.left.y, d: `M0,0 L-46,${panY} M0,0 L46,${panY}`, stroke: 'mut', sw: 1.5, z: -3 },
    { id: `${prefix}strR`, t: 'path', x: pans.right.x, y: pans.right.y, d: `M0,0 L-46,${panY} M0,0 L46,${panY}`, stroke: 'mut', sw: 1.5, z: -3 },
  ];
  return { els, left: { x: pans.left.x, y: pans.left.y + panY }, right: { x: pans.right.x, y: pans.right.y + panY } };
}

// Posisi "set" timbangan untuk kemiringan baru (dipakai bersama balance())
export function tiltSet(prefix, cx, cy, tilt, len = 120) {
  const pans = panPos(cx, cy, len, tilt);
  const panY = PAN_Y;
  return {
    [`${prefix}beam`]: { rot: tilt },
    [`${prefix}panL`]: { x: pans.left.x, y: pans.left.y + panY },
    [`${prefix}panR`]: { x: pans.right.x, y: pans.right.y + panY },
    [`${prefix}strL`]: { x: pans.left.x, y: pans.left.y },
    [`${prefix}strR`]: { x: pans.right.x, y: pans.right.y },
  };
}

// Benda di atas piring: menumpuk dari tengah piring, baris bawah dulu.
export function onPan(pan, count, { size = 22, gap = 3, cols = 4 } = {}) {
  const pos = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const inRow = Math.min(cols, count - r * cols);
    const c = i % cols;
    pos.push({ x: pan.x + (c - (inRow - 1) / 2) * (size + gap), y: pan.y - size / 2 - 4 - r * (size + gap) });
  }
  return pos;
}

// Tabel cepat
export const table = (id, x, y, rows, o = {}) => ({ id, t: 'table', x, y, rows, ...o });

// Model luas: persegi panjang dibagi rows × cols sel. fill(r, c) -> kelas warna
export function areaCells(prefix, x, y, w, h, rows, cols, fill = () => 'paper') {
  const cw = w / cols;
  const ch = h / rows;
  const els = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      els.push({ id: `${prefix}${r}_${c}`, t: 'rect', x: x - w / 2 + cw * (c + 0.5), y: y - h / 2 + ch * (r + 0.5), w: cw, h: ch, r: 0, fill: fill(r, c), stroke: 'ink', sw: 1.5 });
  return els;
}
export function areaFill(prefix, rows, cols, fill) {
  const out = {};
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out[`${prefix}${r}_${c}`] = { fill: fill(r, c) };
  return out;
}

// Batang pecahan
export const bar = (id, x, y, parts, filled, o = {}) => ({ id, t: 'bar', x, y, w: 300, h: 34, parts, filled, ...o });

// Perkiraan lebar teks (Nunito tebal) dalam satuan panggung
const CW = { ' ': 0.27, '(': 0.34, ')': 0.34, ',': 0.27, '.': 0.27, ':': 0.27, '−': 0.6, '+': 0.6, '=': 0.6, '×': 0.56, '÷': 0.6, '<': 0.6, '>': 0.6, '%': 0.85, '²': 0.38, 'm': 0.86, 'w': 0.8, '½': 0.85, '⅓': 0.85, '∪': 0.7, '∩': 0.7, '√': 0.6, '≠': 0.6, '≤': 0.6, '≥': 0.6, '¼': 0.85, '¾': 0.85, '⅛': 0.85, '…': 0.8 };
export function textWidth(str, size) {
  return [...stripMarkup(String(str))].reduce((a, ch) => a + (CW[ch] ?? (/[0-9]/.test(ch) ? 0.58 : /[A-Z]/.test(ch) ? 0.66 : 0.53)), 0) * size;
}

// Baris persamaan yang memuat pecahan bertumpuk.
// items: string (teks biasa, boleh markup warna) atau [pembilang, penyebut, opsi?]
// Contoh: eqRow('r', 120, [[1, 2], '+', [1, 3], '=', [5, 6]])
export function eqRow(prefix, y, items, { size = 26, cx = 200, gap = 11, c } = {}) {
  const fs = size * 0.82;
  const w = items.map((it) =>
    Array.isArray(it) ? Math.max(textWidth(it[0], fs), textWidth(it[1], fs)) + fs * 0.4 : Math.max(size * 0.3, textWidth(it, size)),
  );
  const total = w.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = cx - total / 2;
  return items.map((it, i) => {
    const xm = x + w[i] / 2;
    x += w[i] + gap;
    // teks berisi spasi saja hanya dipakai sebagai jarak
    if (!Array.isArray(it) && !String(it).trim()) return null;
    if (Array.isArray(it)) return { id: `${prefix}${i}`, t: 'frac', n: it[0], d: it[1], x: xm, y, size: fs, ...(c ? { c } : {}), ...(it[2] || {}) };
    return { id: `${prefix}${i}`, t: 'text', text: String(it), x: xm, y, size, w: 800, ...(c ? { c } : {}) };
  }).filter(Boolean);
}
