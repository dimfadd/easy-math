// Kurva untuk materi kelas 9 (dipakai bersama bidang koordinat dari k8/plot.js)

// Parabola y = a x² + b x + c pada bidang pl, dipotong di dalam rentang cfg
export function parabola(id, pl, a, b, c, cfg, o = {}) {
  const { xmin, xmax, ymin, ymax } = cfg;
  const f = (x) => a * x * x + b * x + c;
  let d = '';
  let pen = false;
  const N = 160;
  for (let i = 0; i <= N; i++) {
    const x = xmin + ((xmax - xmin) * i) / N;
    const y = f(x);
    if (y < ymin - 1e-9 || y > ymax + 1e-9) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${pl.X(x).toFixed(1)},${pl.Y(y).toFixed(1)} `;
    pen = true;
  }
  return { id, t: 'path', x: 0, y: 0, d: d.trim() || 'M0,0', stroke: 'pos', sw: 3, ...o };
}
