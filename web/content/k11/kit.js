// Fungsi bantu untuk materi kelas 11
import { T, box, ln } from '../helpers.js';

// Diagram panah: dua oval berisi anggota himpunan, dan panah-panah dari kiri ke kanan.
// left/right: daftar label; pairs: [[iKiri, iKanan], ...]
export function arrows(p, left, right, pairs, { lx = 110, rx = 290, cy = 150, gap = 38, ln: lname = 'A', rn = 'B' } = {}) {
  const ly = (i, n) => cy + (i - (n - 1) / 2) * gap;
  const h = (n) => Math.max(n * gap + 30, 110);
  const els = [
    box(`${p}oL`, lx, cy, 74, h(left.length), { r: 36, fill: 'pos-soft', stroke: 'ink', sw: 2, z: -2 }),
    box(`${p}oR`, rx, cy, 74, h(right.length), { r: 36, fill: 'acc-soft', stroke: 'ink', sw: 2, z: -2 }),
    T(`${p}nL`, lname, lx, cy - h(left.length) / 2 - 14, { size: 16, c: 'pos' }),
    T(`${p}nR`, rn, rx, cy - h(right.length) / 2 - 14, { size: 16, c: 'acc' }),
    ...left.map((v, i) => T(`${p}l${i}`, String(v), lx, ly(i, left.length), { size: 18 })),
    ...right.map((v, i) => T(`${p}r${i}`, String(v), rx, ly(i, right.length), { size: 18 })),
  ];
  const arr = pairs.map(([a, b], k) => ln(`${p}a${k}`, lx + 16, ly(a, left.length), rx - 18, ly(b, right.length), { sw: 2, arrow: 'end', c: 'ink' }));
  return { els, arr, ly: (i) => ly(i, left.length), ry: (i) => ly(i, right.length) };
}

// Mesin fungsi: kotak berlabel
export const machine = (id, x, y, label, fill = 'acc-soft', w = 92) => box(id, x, y, w, 64, { r: 10, fill, stroke: 'ink', sw: 2.5, label, lsize: 16 });

// Bola angka yang lewat mesin
export const token = (id, x, y, v, fill = 'pos') => ({ id, t: 'circle', x, y, r: 19, fill, stroke: 'ink', sw: 2, label: String(v), lsize: 15, lc: fill === 'acc' ? 'ink' : 'onfill' });
