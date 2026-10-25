// Fungsi bantu untuk materi kelas 12 Tingkat Lanjut
// Kurva parametrik (x(t), y(t)) pada bidang B (dari mk di k12/kit.js), dipotong di dalam rentang bidang
export function pcurve(id, B, fx, fy, t0, t1, o = {}) {
  const { n = 160, lim = B.lim, ...rest } = o;
  let d = '';
  let pen = false;
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    const x = fx(t);
    const y = fy(t);
    if (!Number.isFinite(x) || !Number.isFinite(y) || Math.abs(x) > lim + 1e-9 || Math.abs(y) > lim + 1e-9) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'}${B.P.X(x).toFixed(1)},${B.P.Y(y).toFixed(1)} `;
    pen = true;
  }
  return { id, t: 'path', x: 0, y: 0, d: d.trim() || 'M0,0', stroke: 'pos', sw: 3, ...rest };
}
