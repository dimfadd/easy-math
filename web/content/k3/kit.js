// Fungsi bantu untuk materi kelas 3 SD: ratusan, puluhan, satuan (skala kecil)
export const u = 8; // sisi satu kubus satuan

// Pelat ratusan 10 × 10 berpusat di (x, y)
export function flat(id, x, y, o = {}) {
  const s = u * 10;
  let d = `M${x - s / 2},${y - s / 2} h${s} v${s} h${-s} Z`;
  for (let k = 1; k < 10; k++) d += ` M${x - s / 2 + k * u},${y - s / 2} v${s} M${x - s / 2},${y - s / 2 + k * u} h${s}`;
  return { id, t: 'path', x: 0, y: 0, d, fill: 'ok-soft', stroke: 'ok', sw: 1, ...o };
}
// Batang puluhan tegak
export function rod(id, x, y, o = {}) {
  const h = u * 10;
  let d = `M${x - u / 2},${y - h / 2} h${u} v${h} h${-u} Z`;
  for (let k = 1; k < 10; k++) d += ` M${x - u / 2},${y - h / 2 + k * u} h${u}`;
  return { id, t: 'path', x: 0, y: 0, d, fill: 'pos-soft', stroke: 'pos', sw: 1, ...o };
}
export const unit = (id, x, y, o = {}) => ({ id, t: 'rect', x, y, w: u, h: u, r: 1, fill: 'acc-soft', stroke: 'acc', sw: 1, ...o });

// Bilangan sebagai ratusan, puluhan, satuan; mengembalikan elemen dan lebar total
export function hto(p, r, t, s, x0, y) {
  const els = [];
  let x = x0;
  for (let i = 0; i < r; i++) els.push(flat(`${p}h${i}`, x + 40 + i * 88, y));
  x += r * 88 + (r ? 6 : 0);
  for (let i = 0; i < t; i++) els.push(rod(`${p}t${i}`, x + 4 + i * 12, y));
  x += t * 12 + (t ? 8 : 0);
  for (let i = 0; i < s; i++) els.push(unit(`${p}u${i}`, x + 4 + Math.floor(i / 5) * 11, y + 36 - (i % 5) * 11));
  return els;
}
