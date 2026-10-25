// Fungsi bantu untuk materi kelas 2 SD: balok puluhan dan kubus satuan
export const U = 13; // sisi satu kubus satuan

// Balok puluhan tegak (10 kubus) berpusat di (x, y)
export function rod(id, x, y, o = {}) {
  const h = U * 10;
  let d = `M${x - U / 2},${y - h / 2} h${U} v${h} h${-U} Z`;
  for (let k = 1; k < 10; k++) d += ` M${x - U / 2},${y - h / 2 + k * U} h${U}`;
  return { id, t: 'path', x: 0, y: 0, d, fill: 'pos-soft', stroke: 'pos', sw: 1.5, ...o };
}
// Kubus satuan
export const unit = (id, x, y, o = {}) => ({ id, t: 'rect', x, y, w: U, h: U, r: 2, fill: 'acc-soft', stroke: 'acc', sw: 1.5, ...o });

// Bilangan sebagai balok: t puluhan berjajar mulai x0, s satuan dalam kolom 2 × 5 di kanannya
export function blocks(p, t, s, x0, y, { gap = 20, ux } = {}) {
  const els = [];
  for (let i = 0; i < t; i++) els.push(rod(`${p}r${i}`, x0 + i * gap, y));
  const uX = ux ?? x0 + t * gap + 12;
  for (let i = 0; i < s; i++) els.push(unit(`${p}u${i}`, ...unitAt(i, uX, y)));
  return els;
}
// Posisi kubus satuan ke-i (kolom berisi 5, dari bawah ke atas)
export const unitAt = (i, uX, y) => [uX + Math.floor(i / 5) * (U + 3), y + U * 5 - U / 2 - (i % 5) * (U + 2)];
