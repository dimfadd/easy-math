// Fungsi bantu generator soal.
// Setiap generator: (rnd, lang) => soal dengan format yang sama seperti soal tulisan tangan:
//   isian:  { type: 'num', q, fig?, ans: ['12'], wrong: { '6': 'kenapa keliru' }, steps: [...] }
//   pilihan: { q, fig?, options: [{ t, ok: true } | { t, why }], steps: [...] }
// Teks ditulis dua bahasa sekaligus lewat L(lang, 'Indonesia', 'English').

export const L = (lang, id, en) => (lang === 'en' ? en : id);
export const ri = (rnd, a, b) => a + Math.floor(rnd() * (b - a + 1));
export const pick = (rnd, arr) => arr[Math.floor(rnd() * arr.length)];
export const S = (n) => String(n);

// Pasangan jawaban keliru; jawaban yang sama dengan kunci atau tidak valid dibuang
export function wrongs(ans, list) {
  const out = {};
  for (const [v, why] of list) {
    if (v === null || v === undefined || Number.isNaN(v)) continue;
    const k = String(v);
    if (k === String(ans) || out[k] || (typeof v === 'number' && v < 0)) continue;
    out[k] = why;
  }
  return out;
}

// Satu baris benda (apel/bintang) dipusatkan di (cx, y)
export function row(p, name, n, cx, y, { dx = 50, size = 40 } = {}) {
  const x0 = cx - ((n - 1) * dx) / 2;
  return Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'icon', name, x: x0 + i * dx, y, size }));
}

// Benda dalam beberapa baris (maks `cols` per baris), dipusatkan
export function grid(p, name, n, cx, cy, { cols = 5, dx = 50, dy = 50, size = 38 } = {}) {
  const rows = Math.ceil(n / cols);
  const out = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols);
    const inRow = r === rows - 1 ? n - r * cols : cols;
    const c = i % cols;
    out.push({ id: `${p}${i}`, t: 'icon', name, x: cx - ((inRow - 1) * dx) / 2 + c * dx, y: cy - ((rows - 1) * dy) / 2 + r * dy, size });
  }
  return out;
}

export const txt = (id, text, x, y, o = {}) => ({ id, t: 'text', text, x, y, size: 26, w: 800, ...o });

// Angka untuk kunci jawaban: gaya Indonesia (koma desimal, tanpa pemisah ribuan), sisa galat float dibuang.
// Contoh: D(2.5) = '2,5', D(-0.1 + 0.3) = '0,2', D(1250) = '1250'
export const D = (n, dp = 6) => {
  const v = Math.round(n * 10 ** dp) / 10 ** dp;
  return String(Object.is(v, -0) ? 0 : v).replace('.', ',');
};
// Angka untuk teks soal sesuai bahasa: 2,5 (id) atau 2.5 (en)
export const N = (lang, n, dp = 6) => (lang === 'en' ? D(n, dp).replace(',', '.') : D(n, dp));
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
// Pecahan paling sederhana sebagai teks: F(6, 8) = '3/4', F(4, 2) = '2', F(-3, 6) = '-1/2'
export const F = (p, q) => {
  if (q < 0) [p, q] = [-p, -q];
  const g = gcd(p, q) || 1;
  return q / g === 1 ? String(p / g) : `${p / g}/${q / g}`;
};
