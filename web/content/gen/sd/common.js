// Fungsi bantu bersama untuk generator soal SD Kelas 2 sampai 6.
import { L, ri, pick, D, F, gcd } from '../util.js';

export const NAMES = ['Ani', 'Budi', 'Citra', 'Dodi', 'Eka', 'Fajar', 'Gita', 'Hana', 'Intan', 'Joko', 'Kiki', 'Lina', 'Rudi', 'Sari', 'Tono', 'Wati'];
export const name = (rnd) => pick(rnd, NAMES);
export function names(rnd, k = 2) {
  const out = [];
  while (out.length < k) {
    const n = pick(rnd, NAMES);
    if (!out.includes(n)) out.push(n);
  }
  return out;
}
// Ambil k unsur berbeda dari daftar
export function sample(rnd, arr, k) {
  const a = arr.slice();
  const out = [];
  while (out.length < k && a.length) out.push(a.splice(Math.floor(rnd() * a.length), 1)[0]);
  return out;
}
export const cap = (s) => s[0].toUpperCase() + s.slice(1);

// Bilangan dengan pemisah ribuan sesuai bahasa: 12.500 (id) atau 12,500 (en)
export const G = (lang, n) => {
  const neg = n < 0;
  const [i, f] = D(Math.abs(n)).split(',');
  const s = i.replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'en' ? ',' : '.');
  return (neg ? '−' : '') + (f ? s + (lang === 'en' ? '.' : ',') + f : s);
};
export const Rp = (lang, n) => (lang === 'en' ? `Rp${G(lang, n)}` : `Rp${G(lang, n)}`);

// Nilai bilangan dari teks kunci ('3/4', '1 1/2', '2,5', '12')
export function val(s) {
  const t = String(s).trim().replace('−', '-');
  let m = t.match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/);
  if (m) return (m[1] ? -1 : 1) * (+m[2] + +m[3] / +m[4]);
  m = t.match(/^(-?\d+(?:,\d+)?)\/(\d+)$/);
  if (m) return +m[1].replace(',', '.') / +m[2];
  const v = Number(t.replace(',', '.'));
  return Number.isFinite(v) ? v : NaN;
}

// Soal isian. ans: bilangan atau teks kunci (pecahan). wrong: [[nilai, kenapa], ...]
export function num({ q, ans, wrong = [], steps, meta, fig, exact, exactWhy }) {
  const key = typeof ans === 'number' ? D(ans) : String(ans);
  const v = val(key);
  const w = {};
  for (const [x, why] of wrong) {
    if (x === null || x === undefined) continue;
    const k = typeof x === 'number' ? D(x) : String(x);
    const kv = val(k);
    if (!Number.isFinite(kv) || kv < 0 || Math.abs(kv - v) < 1e-9 || w[k]) continue;
    w[k] = why;
  }
  const out = { type: 'num', q, ans: [key], wrong: w, steps, meta };
  if (fig) out.fig = fig;
  if (exact) out.exact = true;
  if (exactWhy) out.exactWhy = exactWhy;
  return out;
}

// Soal pilihan ganda. ok: teks benar. bad: [[teks, kenapa], ...]; teks kembar dibuang.
export function mc({ q, ok, bad, steps, meta, fig, fixed, max = 4 }) {
  const seen = new Set([String(ok).replace(/\s+/g, '')]);
  const opts = [{ t: String(ok), ok: true }];
  for (const [t, why] of bad) {
    const k = String(t).replace(/\s+/g, '');
    if (seen.has(k) || opts.length >= max) continue;
    seen.add(k);
    opts.push({ t: String(t), why });
  }
  const out = { q, options: opts, steps, meta };
  if (fig) out.fig = fig;
  if (fixed) out.fixed = true;
  return out;
}

// Generator "pool": memilih satu dari daftar soal konseptual tulisan tangan.
// Setiap butir: (lang) => { q, ok, bad, steps } ; jawaban tersimpan di meta.ok (dicek manual).
export function pool(items) {
  const g = (rnd, lang) => {
    const i = Math.floor(rnd() * items.length);
    const it = items[i](lang);
    return mc({ ...it, meta: { i, ok: it.ok } });
  };
  g.solve = (m, lang) => items[m.i](lang).ok;
  return g;
}

// Kata bilangan sampai 999.999
const ID1 = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
function idWords(n) {
  if (n < 12) return ID1[n];
  if (n < 20) return `${ID1[n - 10]} belas`;
  if (n < 100) return `${ID1[Math.floor(n / 10)]} puluh${n % 10 ? ' ' + ID1[n % 10] : ''}`;
  if (n < 1000) {
    const h = Math.floor(n / 100);
    return `${h === 1 ? 'seratus' : ID1[h] + ' ratus'}${n % 100 ? ' ' + idWords(n % 100) : ''}`;
  }
  const t = Math.floor(n / 1000);
  return `${t === 1 ? 'seribu' : idWords(t) + ' ribu'}${n % 1000 ? ' ' + idWords(n % 1000) : ''}`;
}
const EN1 = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN10 = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function enWords(n) {
  if (n < 20) return EN1[n];
  if (n < 100) return EN10[Math.floor(n / 10)] + (n % 10 ? '-' + EN1[n % 10] : '');
  if (n < 1000) return `${EN1[Math.floor(n / 100)]} hundred${n % 100 ? ' and ' + enWords(n % 100) : ''}`;
  const r = n % 1000;
  return `${enWords(Math.floor(n / 1000))} thousand${r ? (r < 100 ? ' and ' : ' ') + enWords(r) : ''}`;
}
export const words = (lang, n) => (lang === 'en' ? enWords(n) : idWords(n));

export { L, ri, pick, D, F, gcd };
