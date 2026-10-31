// Fungsi bantu khusus generator SMP (Kelas 7 sampai 9).
import { L, D, N, F, gcd } from '../util.js';

// Bilangan untuk teks soal dengan tanda minus tipografis: −5 (id) / −2.5 (en)
export const M = (lang, x) => N(lang, x).replace('-', '−');
// Bilangan dalam kurung bila negatif: (−4)
export const P = (lang, x) => (x < 0 ? `(${M(lang, x)})` : M(lang, x));
// Bilangan dengan pemisah ribuan: 1.250.000 (id) / 1,250,000 (en)
export const G = (lang, x) => {
  const [i, d] = D(Math.abs(x)).split(',');
  const g = i.replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'en' ? ',' : '.');
  return (x < 0 ? '−' : '') + g + (d ? (lang === 'en' ? '.' : ',') + d : '');
};
export const rp = (lang, x) => 'Rp' + G(lang, x);
// Pecahan untuk teks: F() dengan minus tipografis
export const FR = (p, q) => F(p, q).replace('-', '−');

// Bentuk aljabar dari daftar suku [[koef, 'x'], [konstanta, '']]
export function ex(terms) {
  let s = '';
  for (const [c, v] of terms) {
    if (!c) continue;
    const a = Math.abs(c);
    const body = (a === 1 && v ? '' : String(a)) + v;
    s += s ? (c < 0 ? ' − ' : ' + ') + body : (c < 0 ? '−' : '') + body;
  }
  return s || '0';
}

// Nilai bilangan dari kunci bergaya D()/F(): '2,5', '-3', '3/4'
export function val(s) {
  s = String(s).replace('−', '-').replace(',', '.');
  if (s.includes('/')) {
    const [a, b] = s.split('/');
    return Number(a) / Number(b);
  }
  return Number(s);
}

// Soal isian. ans: bilangan (lewat D) atau teks kunci (mis. dari F). wl: [[nilai, kenapa keliru], ...]
export function num(q, ans, wl, steps, meta, extra = {}) {
  const a = typeof ans === 'number' ? D(ans) : ans;
  const av = val(a);
  const wrong = {};
  for (const [v, why] of wl) {
    if (v === null || v === undefined || (typeof v === 'number' && !Number.isFinite(v))) continue;
    const k = typeof v === 'number' ? D(v) : String(v);
    const kv = val(k);
    if (!Number.isFinite(kv) || Math.abs(kv - av) < 1e-9 || wrong[k]) continue;
    if (/,\d{4,}/.test(k)) continue; // desimal panjang bukan kesalahan yang wajar
    wrong[k] = why;
  }
  return { type: 'num', q, ans: [a], wrong, steps, meta, ...extra };
}

// Soal pilihan ganda. Pilihan kembar atau sama dengan kunci dibuang.
export function mc(q, ok, wl, steps, meta, extra = {}) {
  const norm = (s) => String(s).replace(/\s+/g, '');
  const seen = new Set([norm(ok)]);
  const options = [{ t: ok, ok: true }];
  for (const [t, why] of wl) {
    if (t === null || t === undefined || options.length >= 4) continue;
    const k = norm(t);
    if (seen.has(k)) continue;
    seen.add(k);
    options.push({ t, why });
  }
  return { q, options, steps, meta, ...extra };
}

export const NAMES = ['Ani', 'Budi', 'Citra', 'Dodi', 'Eka', 'Fajar', 'Gita', 'Hana', 'Intan', 'Joko', 'Kiki', 'Lina', 'Rudi', 'Sari', 'Tono', 'Wati'];
export { L, D, N, F, gcd };
export const lcm = (a, b) => (a / gcd(a, b)) * b;
export const sum = (a) => a.reduce((s, x) => s + x, 0);
// Acak urutan array dengan rnd
export function shuf(rnd, arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
