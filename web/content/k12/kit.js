// Fungsi bantu untuk materi kelas 12
import { plane } from '../k8/plot.js';

// Bidang dengan satuan sama di x dan y, di sisi kiri panggung
export const mk = (lim, o = {}) => {
  const C = { x: 30, y: 30, w: 240, h: 240, xmin: -lim, xmax: lim, ymin: -lim, ymax: lim };
  const P = plane(o.id ?? 'pl', { ...C, every: lim > 5 ? 2 : 1 });
  return { C, P, lim, U: P.X(1) - P.X(0), O: P.at(0, 0) };
};

// Kurva y = f(x) yang koordinatnya relatif terhadap titik asal O,
// supaya x/y menggeser, sx/sy mencerminkan, dan rot memutar terhadap O.
export function fpath(id, B, f, a, b, o = {}) {
  const { ymin = -B.lim, ymax = B.lim, n = 120, ...rest } = o;
  let d = '';
  let pen = false;
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    const y = f(x);
    if (!Number.isFinite(y) || y < ymin - 1e-9 || y > ymax + 1e-9) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${(x * B.U).toFixed(1)},${(-y * B.U).toFixed(1)} `;
    pen = true;
  }
  return { id, t: 'path', x: B.O[0], y: B.O[1], d: d.trim() || 'M0,0', stroke: 'pos', sw: 3, ...rest };
}

// Posisi set untuk menggeser kurva fpath sejauh (h, k) satuan
export const shift = (B, h, k) => ({ x: B.O[0] + h * B.U, y: B.O[1] - k * B.U });

// Tulis bilangan negatif dengan tanda minus yang benar
export const neg = (v) => (v < 0 ? `−${String(-v).replace('.', ',')}` : String(v).replace('.', ','));
