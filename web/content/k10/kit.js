// Fungsi bantu untuk materi kelas 10
import { box, textWidth } from '../helpers.js';

// Label berlatar kertas (tidak tertimpa garis grafik)
export const tag = (id, text, x, y, c = 'ink', size = 15) =>
  box(id, x, y, textWidth(text, size) + 12, size + 8, { fill: 'paper', stroke: 'none', sw: 0, r: 4, label: text, lsize: size, lc: c, z: 3 });

// Kurva y = f(x) pada bidang pl, dipotong di dalam rentang cfg
export function curve(id, pl, f, cfg, o = {}) {
  const { xmin, xmax, ymin, ymax } = cfg;
  const x0 = o.from ?? xmin;
  const x1 = o.to ?? xmax;
  let d = '';
  let pen = false;
  const N = o.n ?? 160;
  for (let i = 0; i <= N; i++) {
    const x = x0 + ((x1 - x0) * i) / N;
    const y = f(x);
    if (!Number.isFinite(y) || y < ymin - 1e-9 || y > ymax + 1e-9) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${pl.X(x).toFixed(1)},${pl.Y(y).toFixed(1)} `;
    pen = true;
  }
  const { from, to, n, ...rest } = o;
  return { id, t: 'path', x: 0, y: 0, d: d.trim() || 'M0,0', stroke: 'pos', sw: 3, ...rest };
}

// Deretan kotak angka (misalnya 1, 2, 4, 8, …) dengan posisi tengah tiap kotak
export function chain(prefix, vals, x0, dx, y, { w = 44, h = 32, size = 16, fill = 'paper' } = {}) {
  const X = (i) => x0 + i * dx;
  const els = vals.map((v, i) => box(`${prefix}${i}`, X(i), y, w, h, { label: String(v), lsize: size, fill, r: 6 }));
  return { els, X };
}

// Vektor kolom: dua angka bertumpuk diapit kurung (kurung digambar sebagai path)
export function colvec(id, a, b, x, y, { size = 22, c = 'ink' } = {}) {
  const tw = Math.max(textWidth(String(a), size), textWidth(String(b), size));
  const w = tw / 2 + size * 0.3;
  const h = size * 1.15;
  const paren = (pid, sx, dir) => ({ id: pid, t: 'path', x: 0, y: 0, d: `M${(sx + dir * 3).toFixed(1)},${(y - h).toFixed(1)} Q${(sx - dir * 5).toFixed(1)},${y} ${(sx + dir * 3).toFixed(1)},${(y + h).toFixed(1)}`, stroke: c === 'ink' ? 'ink' : c, sw: 2 });
  return [
    { id: `${id}v`, t: 'text', text: `${a}\n${b}`, x, y, size, w: 800, lh: 1.1, c },
    paren(`${id}l`, x - w, 1),
    paren(`${id}r`, x + w, -1),
  ];
}

// Panah vektor dari (x1, y1) ke (x2, y2) dalam koordinat bidang pl
export const vec = (id, pl, x1, y1, x2, y2, c = 'pos', o = {}) => ({ id, t: 'line', x: pl.X(x1), y: pl.Y(y1), x2: pl.X(x2), y2: pl.Y(y2), sw: 3.5, arrow: 'end', c, ...o });
// Objek set untuk menggeser panah vektor tanpa mengubah bentuknya
export const vecAt = (pl, x1, y1, x2, y2) => ({ x: pl.X(x1), y: pl.Y(y1), x2: pl.X(x2), y2: pl.Y(y2) });
