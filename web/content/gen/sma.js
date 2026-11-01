// Generator soal SMA Kelas 10 sampai 12 (wajib dan lanjut).
import { K10 } from './sma/k10.js';
import { K11 } from './sma/k11.js';
import { K11L } from './sma/k11l.js';
import { K12 } from './sma/k12.js';
import { K12L } from './sma/k12l.js';

// Perapi teks: koefisien 1 tidak ditulis (1√3 → √3, −1A → −A), minus tipografis,
// dan bilangan negatif setelah tanda operasi diberi kurung (+ −3 → + (−3)). Kunci isian tidak diubah.
export function tidy(s) {
  if (typeof s !== 'string') return s;
  return s
    .replace(/(^|[\s(=+×−-])1(?=[√π])/g, '$1')
    .replace(/(^|[\s(=+×])([−-]?)1(?=[a-zA-Z](?![a-zA-Z]))/g, '$1$2')
    .replace(/(^|[\s(,=·])-(?=\d)/g, '$1−')
    .replace(/([+−×] )−(\d+(?:[,.]\d+)?(?:\/\d+)?)(?![\d/,.]*[a-zA-Z√π])/g, '$1(−$2)');
}
const dedupe = (opts) => {
  const ok = opts.find((o) => o.ok);
  const seen = new Set(ok ? [ok.t] : []);
  return opts.filter((o) => o.ok || (!seen.has(o.t) && seen.add(o.t)));
};
const tidyQ = (q) => ({
  ...q,
  q: tidy(q.q),
  steps: q.steps && q.steps.map(tidy),
  // pengecoh yang sama dengan pilihan lain setelah dirapikan dibuang (mis. luas juring = panjang busur)
  options: q.options && dedupe(q.options.map((o) => ({ ...o, t: tidy(o.t), why: tidy(o.why) }))),
  wrong: q.wrong && Object.fromEntries(Object.entries(q.wrong).map(([k, v]) => [k, tidy(v)])),
});
const isNum = (s) => /^-?[\d,]+(\/\d+)?$/.test(String(s));
const wrap = (g) => {
  const w = (rnd, lang) => tidyQ(g(rnd, lang));
  if (g.solve) w.solve = (m, lang) => {
    const v = g.solve(m, lang);
    return isNum(v) ? v : tidy(v);
  };
  return w;
};

const ALL = { ...K10, ...K11, ...K11L, ...K12, ...K12L };
export const SMA = Object.fromEntries(Object.entries(ALL).map(([id, gs]) => [id, gs.map(wrap)]));
