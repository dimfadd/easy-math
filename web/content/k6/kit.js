// Alat gambar kelas 6
import { box } from '../helpers.js';

// Petak persegi: rows × cols, fill(r, c) -> warna
export function grid(p, x0, y0, size, rows, cols, fill = () => 'paper', o = {}) {
  const els = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) els.push(box(`${p}${r}_${c}`, x0 + size * (c + 0.5), y0 + size * (r + 0.5), size, size, { r: 0, fill: fill(r, c), stroke: 'ink', sw: 1, ...o }));
  return els;
}

// Kubus satuan dalam proyeksi miring; (i kanan, j ke belakang, k ke atas)
export function cube(id, i, j, k, x0, y0, c = 'acc', CU = 24) {
  const DX = CU * 0.55;
  const DY = CU * 0.42;
  const X = x0 + i * CU + j * DX;
  const Y = y0 - k * CU - j * DY;
  return [
    { id: `${id}f`, t: 'poly', x: 0, y: 0, pts: [[X, Y], [X + CU, Y], [X + CU, Y - CU], [X, Y - CU]], fill: `${c}-soft`, stroke: c, sw: 1.5 },
    { id: `${id}t`, t: 'poly', x: 0, y: 0, pts: [[X, Y - CU], [X + CU, Y - CU], [X + CU + DX, Y - CU - DY], [X + DX, Y - CU - DY]], fill: 'paper', stroke: c, sw: 1.5 },
    { id: `${id}s`, t: 'poly', x: 0, y: 0, pts: [[X + CU, Y], [X + CU + DX, Y - DY], [X + CU + DX, Y - CU - DY], [X + CU, Y - CU]], fill: `${c}-soft`, stroke: c, sw: 1.5, o: 0.8 },
  ];
}

// Balok a × b × h dari kubus satuan; urutan gambar belakang ke depan, bawah ke atas
export function blockOf(p, a, b, h, x0, y0, c = 'acc', upto = h, CU = 24) {
  const els = [];
  for (let k = 0; k < Math.min(h, upto); k++) for (let j = b - 1; j >= 0; j--) for (let i = 0; i < a; i++) els.push(...cube(`${p}${i}${j}${k}`, i, j, k, x0, y0, c, CU));
  return els;
}
