// Fungsi bantu untuk materi kelas 1–2 SD
import { box } from '../helpers.js';

// Satu benda (apel, bintang, …)
export const obj = (id, name, x, y, size = 30, o = {}) => ({ id, t: 'icon', name, x, y, size, ...o });

// Benda berjajar dalam baris dan kolom; mengembalikan elemen dengan id `${p}${i}`
export function objs(p, name, n, x0, y0, { dx = 40, dy = 42, cols = 10, size = 30, start = 0, ...o } = {}) {
  return Array.from({ length: n }, (_, k) => {
    const i = start + k;
    return obj(`${p}${i}`, name, x0 + (i % cols) * dx, y0 + Math.floor(i / cols) * dy, size, o);
  });
}
// Posisi benda ke-i pada susunan objs
export const objAt = (i, x0, y0, { dx = 40, dy = 42, cols = 10 } = {}) => ({ x: x0 + (i % cols) * dx, y: y0 + Math.floor(i / cols) * dy });

// Kotak sepuluh: 2 baris × 5 kolom, terisi n bulatan
export function tenframe(id, x, y, n, { cell = 36, c = 'neg', start = 0 } = {}) {
  const w = cell * 5;
  const h = cell * 2;
  let d = `M${x - w / 2},${y - h / 2} h${w} v${h} h${-w} Z M${x - w / 2},${y} h${w}`;
  for (let k = 1; k < 5; k++) d += ` M${x - w / 2 + k * cell},${y - h / 2} v${h}`;
  const els = start ? [] : [{ id: `${id}f`, t: 'path', x: 0, y: 0, d, stroke: 'ink', sw: 2.5, fill: 'paper', z: -1 }];
  for (let i = start; i < n; i++) els.push(tenDot(id, i, x, y, { cell, c }));
  return els;
}
export const tenDot = (id, i, x, y, { cell = 36, c = 'neg' } = {}) => ({
  id: `${id}c${i}`,
  t: 'circle',
  x: x - cell * 2 + (i % 5) * cell,
  y: y - cell / 2 + Math.floor(i / 5) * cell,
  r: cell * 0.36,
  fill: c,
  stroke: 'ink',
  sw: 1.5,
});

// Kartu angka
export const card = (id, v, x, y, o = {}) => box(id, x, y, o.w ?? 46, o.h ?? 54, { r: 8, fill: 'paper', sw: 2.5, label: String(v), lsize: o.lsize ?? 28, ...o });
