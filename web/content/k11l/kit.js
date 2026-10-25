// Fungsi bantu untuk materi kelas 11 Tingkat Lanjut
import { textWidth } from '../helpers.js';

// Matriks: elemen sebagai teks terpisah (id `${id}_${baris}${kolom}`) + kurung siku
export function mat(id, rows, x, y, { size = 22, c = 'ink', cw, rh } = {}) {
  const nr = rows.length;
  const nc = rows[0].length;
  const w = cw ?? Math.max(...rows.flat().map((v) => textWidth(String(v), size))) + size * 0.9;
  const h = rh ?? size * 1.45;
  const x0 = x - ((nc - 1) * w) / 2;
  const y0 = y - ((nr - 1) * h) / 2;
  const els = [];
  rows.forEach((row, r) => row.forEach((v, k) => els.push({ id: `${id}_${r}${k}`, t: 'text', text: String(v), x: x0 + k * w, y: y0 + r * h, size, w: 800, c })));
  const L = x - (nc * w) / 2 + 2;
  const R = x + (nc * w) / 2 - 2;
  const T = y - (nr * h) / 2;
  const B = y + (nr * h) / 2;
  const br = (bid, xx, d) => ({ id: bid, t: 'path', x: 0, y: 0, d: `M${(xx + d * 7).toFixed(1)},${T.toFixed(1)} L${xx.toFixed(1)},${T.toFixed(1)} L${xx.toFixed(1)},${B.toFixed(1)} L${(xx + d * 7).toFixed(1)},${B.toFixed(1)}`, stroke: c, sw: 2.2 });
  els.push(br(`${id}L`, L, 1), br(`${id}R`, R, -1));
  return { els, pos: (r, k) => [x0 + k * w, y0 + r * h], w, h, left: L, right: R };
}
