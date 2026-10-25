// Bidang koordinat untuk materi kelas 8 (fungsi, garis lurus, SPLDV)
import { T } from '../helpers.js';

// Membuat sumbu x dan y dengan kisi.
// cfg: { x, y, w, h } = kotak area di panggung; xmin..xmax, ymin..ymax = rentang nilai
// Mengembalikan { els, at(x, y) -> [px, py], X(x), Y(y) }
export function plane(id, cfg) {
  const { x, y, w, h, xmin, xmax, ymin, ymax, step = 1, every = 1, lsize = 11, labels = true, xl = 'x', yl = 'y' } = cfg;
  const ystep = cfg.ystep ?? step;
  const yevery = cfg.yevery ?? every;
  const X = (v) => x + ((v - xmin) / (xmax - xmin)) * w;
  const Y = (v) => y + h - ((v - ymin) / (ymax - ymin)) * h;
  let grid = '';
  for (let v = Math.ceil(xmin / step) * step; v <= xmax + 1e-9; v += step) grid += `M${X(v).toFixed(1)},${y} V${y + h} `;
  for (let v = Math.ceil(ymin / ystep) * ystep; v <= ymax + 1e-9; v += ystep) grid += `M${x},${Y(v).toFixed(1)} H${x + w} `;
  const ax0 = X(Math.min(Math.max(0, xmin), xmax));
  const ay0 = Y(Math.min(Math.max(0, ymin), ymax));
  const els = [
    { id: `${id}g`, t: 'path', x: 0, y: 0, d: grid.trim(), stroke: 'mut', sw: 0.6, z: -3 },
    { id: `${id}x`, t: 'line', x: x - 4, y: ay0, x2: x + w + 10, y2: ay0, sw: 2, arrow: 'end', draw: false, z: -2 },
    { id: `${id}y`, t: 'line', x: ax0, y: y + h + 4, x2: ax0, y2: y - 10, sw: 2, arrow: 'end', draw: false, z: -2 },
    T(`${id}xl`, xl, x + w + 14, ay0 + 12, { size: 13, c: 'mut' }),
    T(`${id}yl`, yl, ax0 + 14, y - 8, { size: 13, c: 'mut' }),
  ];
  if (labels) {
    for (let v = Math.ceil(xmin / every) * every; v <= xmax + 1e-9; v += every) if (v !== 0) els.push(T(`${id}tx${v}`, v < 0 ? `−${-v}` : String(v), X(v), ay0 + 12, { size: lsize, c: 'mut' }));
    for (let v = Math.ceil(ymin / yevery) * yevery; v <= ymax + 1e-9; v += yevery) if (v !== 0) els.push(T(`${id}ty${v}`, v < 0 ? `−${-v}` : String(v), ax0 - 9, Y(v), { size: lsize, c: 'mut' }));
    // label 0 dilewati kalau terlalu dekat dengan label −1 di sumbu y
    if (ymin >= 0 || h / (ymax - ymin) >= 28) els.push(T(`${id}t0`, '0', ax0 - 8, ay0 + 11, { size: lsize, c: 'mut' }));
  }
  return { els, X, Y, at: (a, b) => [X(a), Y(b)] };
}

// Garis lurus y = m x + c, dipotong pada rentang bidang
export function lineOn(id, pl, m, c, cfg, o = {}) {
  const { xmin, xmax, ymin, ymax } = cfg;
  const pts = [];
  const push = (a, b) => {
    if (a >= xmin - 1e-9 && a <= xmax + 1e-9 && b >= ymin - 1e-9 && b <= ymax + 1e-9 && !pts.some((p) => Math.abs(p[0] - a) < 1e-9 && Math.abs(p[1] - b) < 1e-9)) pts.push([a, b]);
  };
  push(xmin, m * xmin + c);
  push(xmax, m * xmax + c);
  if (m !== 0) {
    push((ymin - c) / m, ymin);
    push((ymax - c) / m, ymax);
  }
  pts.sort((p, q) => p[0] - q[0]);
  const [p0, p1] = [pts[0], pts[pts.length - 1]];
  return { id, t: 'line', x: pl.X(p0[0]), y: pl.Y(p0[1]), x2: pl.X(p1[0]), y2: pl.Y(p1[1]), sw: 3, c: 'pos', ...o };
}
