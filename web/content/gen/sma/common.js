// Fungsi bantu khusus generator SMA (tanda minus, pangkat, polinomial, pilihan ganda).
import { L, ri, pick, D, N, F, gcd } from '../util.js';

export { L, ri, pick, D, N, F, gcd };

// Pasang fungsi pemeriksa kunci (solve) pada generator
export const G = (fn, solve) => {
  fn.solve = solve;
  return fn;
};

// Tanda minus tipografis untuk teks
export const mi = (s) => String(s).replace(/-/g, '−');
// Angka untuk teks soal (koma/titik sesuai bahasa, minus tipografis)
export const M = (lang, n) => mi(N(lang, n));
// Pecahan paling sederhana untuk teks
export const Fr = (p, q) => mi(F(p, q));
// Pecahan untuk kunci jawaban (minus biasa)
export const FK = (p, q) => F(p, q);

const SUPS = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '-': '⁻', '−': '⁻', '+': '⁺', x: 'ˣ', n: 'ⁿ', t: 'ᵗ', '(': '⁽', ')': '⁾', ' ': '' };
const SUBS = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉', n: 'ₙ' };
export const sup = (s) => [...String(s)].map((c) => SUPS[c] ?? c).join('');
export const sub = (s) => [...String(s)].map((c) => SUBS[c] ?? c).join('');
// Logaritma basis b: ²log 8 (basis 10 ditulis log saja)
export const lg = (b, x) => (b === 10 ? `log ${x}` : `${sup(b)}log ${x}`);

// Acak tanpa nol, rentang simetris
export const nz = (rnd, a, b) => {
  let v = 0;
  while (v === 0) v = ri(rnd, a, b);
  return v;
};
export const sgn = (rnd) => (rnd() < 0.5 ? -1 : 1);
export const shuf = (rnd, arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
export const C = (n, k) => (k < 0 || k > n ? 0 : Math.round(fact(n) / (fact(k) * fact(n - k))));
export const P = (n, k) => Math.round(fact(n) / fact(n - k));

// Polinomial dari pasangan [koefisien, pangkat]: poly([[3,2],[-2,1],[1,0]]) = '3x² − 2x + 1'
export function poly(terms, v = 'x', lang = 'id') {
  let s = '';
  for (const [c, p] of terms) {
    if (!c) continue;
    const a = Math.abs(c);
    const coef = p === 0 ? N(lang, a) : a === 1 ? '' : N(lang, a);
    const body = p === 0 ? coef : `${coef}${v}${p === 1 ? '' : sup(p)}`;
    if (!s) s = (c < 0 ? '−' : '') + body;
    else s += (c < 0 ? ' − ' : ' + ') + body;
  }
  return s || '0';
}
// Polinomial dari array koefisien pangkat turun: pc([1, -3, 2]) = 'x² − 3x + 2'
export const pc = (cs, v = 'x', lang = 'id') => poly(cs.map((c, i) => [c, cs.length - 1 - i]), v, lang);
// Bentuk (x − a) / (x + a)
export const xm = (a, v = 'x') => (a === 0 ? v : a > 0 ? `(${v} − ${a})` : `(${v} + ${-a})`);
// "x − a" tanpa kurung
export const xmr = (a, v = 'x') => (a === 0 ? v : a > 0 ? `${v} − ${a}` : `${v} + ${-a}`);
// Suku tambahan: ' + 3' / ' − 3' / ''
export const plus = (k, lang = 'id') => (k === 0 ? '' : k > 0 ? ` + ${N(lang, k)}` : ` − ${N(lang, -k)}`);
// Titik / vektor (a, b)
export const pt = (...xs) => `(${xs.map((x) => mi(x)).join(', ')})`;
export const ptl = (lang, ...xs) => `(${xs.map((x) => M(lang, x)).join(', ')})`;
// Matriks sebaris: [[1, 2], [3, 4]]
export const mat = (m) => `[${m.map((r) => `[${r.map((x) => mi(x)).join(', ')}]`).join(', ')}]`;

// Nilai numerik kunci/pecahan teks: '3/4', '-2', '1,5'
const val = (s) => {
  const t = String(s).replace('−', '-');
  const m = t.match(/^(-?\d+)\/(\d+)$/);
  return m ? +m[1] / +m[2] : Number(t.replace(',', '.'));
};
// Jawaban keliru untuk isian. Nilai boleh negatif; angka diubah lewat D(); teks (mis. F(1,2)) dipakai apa adanya.
export function WR(ans, list) {
  const out = {};
  const a = val(ans);
  for (const [v, why] of list) {
    if (v === null || v === undefined) continue;
    const k = typeof v === 'number' ? D(v) : String(v);
    const x = val(k);
    if (!Number.isFinite(x) || Math.abs(x - a) < 1e-9 || out[k]) continue;
    out[k] = why;
  }
  return out;
}
// Pilihan ganda: jawaban benar + pengecoh berbeda teks (maks n pilihan)
const nrm = (s) => String(s).replace(/\s+/g, '');
export function MC(ok, list, n = 4) {
  const seen = new Set([nrm(ok)]);
  const out = [{ t: ok, ok: true }];
  for (const [t, why] of list) {
    if (out.length >= n) break;
    if (t === null || t === undefined || seen.has(nrm(t))) continue;
    seen.add(nrm(t));
    out.push({ t, why });
  }
  return out;
}
// Soal isian
export const NUM = (q, ans, wrong, steps, meta, extra = {}) => ({ type: 'num', q, ans: [ans], wrong, steps, meta, ...extra });
// Soal pilihan ganda
export const OPT = (q, ok, list, steps, meta, extra = {}) => ({ q, options: MC(ok, list), steps, meta, ...extra });

// Bilangan kompleks a + bi sebagai teks
export function cx(a, b) {
  const im = b === 0 ? '' : Math.abs(b) === 1 ? 'i' : `${Math.abs(b)}i`;
  if (b === 0) return mi(a);
  if (a === 0) return (b < 0 ? '−' : '') + im;
  return `${mi(a)} ${b < 0 ? '−' : '+'} ${im}`;
}

// Tripel Pythagoras dasar
export const TRIPLES = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
];
// Tripel dikali k, sisi miring tetap wajar
export const triple = (rnd, maxH = 60) => {
  let t;
  do {
    const b = pick(rnd, TRIPLES);
    const k = ri(rnd, 1, 4);
    t = b.map((x) => x * k);
  } while (t[2] > maxH);
  return rnd() < 0.5 ? t : [t[1], t[0], t[2]];
};
