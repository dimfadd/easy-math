// Generator soal SMP Kelas 8 (materi k8b1 sampai k8b8).
import { ri, pick } from '../util.js';
import { L, D, F, M, P, G, FR, ex, num, mc, NAMES, gcd, sum, shuf } from './u.js';

const withSolve = (g, s) => ((g.solve = s), g);
const nz = (rnd, a, b) => {
  let v = 0;
  while (!v) v = ri(rnd, a, b);
  return v;
};
const pw = (b, e) => `${b < 0 ? `(${M('id', b)})` : b}{^:${M('id', e)}}`;
const pt = (lang, x, y) => `(${M(lang, x)}, ${M(lang, y)})`;
// y = mx + c sebagai teks; m boleh pecahan [p, q]
const lineTxt = (m, c) => {
  const mt = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '−x' : `${M('id', m)}x`;
  if (!mt) return `y = ${M('id', c)}`;
  return `y = ${mt}${c ? ` ${c < 0 ? '−' : '+'} ${Math.abs(c)}` : ''}`;
};

// ================= Bab 1: Bilangan Berpangkat dan Bentuk Akar =================
const powVal = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 2) {
      const step = pick(rnd, [10, 15, 20, 30]);
      const n = ri(rnd, 3, 7);
      const T = step * n;
      const tt = T % 60 === 0 ? L(lang, `${T / 60} jam`, `${T / 60} hour${T > 60 ? 's' : ''}`) : L(lang, `${T} menit`, `${T} minutes`);
      return num(
        L(lang, `Satu bakteri membelah menjadi 2 setiap ${step} menit. Setelah ${tt}, ada berapa bakteri?`, `One bacterium splits into 2 every ${step} minutes. How many bacteria are there after ${tt}?`),
        2 ** n,
        [
          [2 * n, L(lang, 'Setiap membelah, banyaknya dikali 2, bukan ditambah 2.', 'Each split doubles the number; it does not add 2.')],
          [2 ** (n - 1), L(lang, `Ada ${n} kali pembelahan, jadi 2 dipangkatkan ${n}.`, `There are ${n} splits, so the answer is 2 to the power ${n}.`)],
        ],
        [L(lang, `${T} menit ÷ ${step} menit = ${n} kali membelah.`, `${T} minutes ÷ ${step} minutes = ${n} splits.`), `2{^:${n}} = ${2 ** n}`],
        { kind, b: 2, n },
      );
    }
    const b = pick(rnd, [2, 3, 4, 5, -2, -3, 10]);
    const max = { 2: 8, 3: 5, 4: 4, 5: 4, '-2': 7, '-3': 5, 10: 6 }[b];
    const n = ri(rnd, 2, max);
    const v = b ** n;
    if (kind === 1) {
      const prod = Array(n).fill(b < 0 ? `(${M(lang, b)})` : String(b)).join(' × ');
      return mc(
        L(lang, `Bentuk pangkat dari ${prod} adalah …`, `Write ${prod} as a power.`),
        pw(b, n),
        [
          [pw(n, Math.abs(b)), L(lang, 'Bilangan pokok dan pangkatnya tertukar.', 'The base and the exponent are swapped.')],
          [`${b < 0 ? `(${M(lang, b)})` : b} × ${n}`, L(lang, 'Perkalian berulang ditulis sebagai pangkat, bukan perkalian dengan banyaknya.', 'Repeated multiplication is a power, not a multiplication by the count.')],
          [pw(b, n + 1), L(lang, `Hitung lagi: ada ${n} faktor.`, `Count again: there are ${n} factors.`)],
        ],
        [L(lang, `Ada ${n} faktor ${M(lang, b)} yang dikalikan.`, `${n} factors of ${M(lang, b)} are multiplied.`), pw(b, n)],
        { kind, b, n },
      );
    }
    return num(
      L(lang, `Nilai dari ${pw(b, n)} adalah …`, `What is the value of ${pw(b, n)}?`),
      v,
      [
        [b * n, L(lang, `${pw(b, n)} artinya ${M(lang, b)} dikalikan ${n} kali, bukan ${M(lang, b)} × ${n}.`, `${pw(b, n)} means ${n} factors of ${M(lang, b)}, not ${M(lang, b)} × ${n}.`)],
        [b < 0 ? -v : null, L(lang, `Banyak faktor negatif ${n}, ${n % 2 ? 'ganjil, jadi hasilnya negatif' : 'genap, jadi hasilnya positif'}.`, `There are ${n} negative factors, ${n % 2 ? 'an odd number, so the result is negative' : 'an even number, so the result is positive'}.`)],
        [b ** (n - 1), L(lang, `Faktornya ada ${n}, bukan ${n - 1}.`, `There are ${n} factors, not ${n - 1}.`)],
      ],
      [Array(n).fill(b < 0 ? `(${M(lang, b)})` : String(b)).join(' × '), `= ${M(lang, v)}`],
      { kind, b, n },
    );
  },
  (m) => (m.kind === 1 ? pw(m.b, m.n) : D(Math.pow(m.b, m.n))),
);

const powRules = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const b = pick(rnd, [2, 3, 5, 7, 'a', 'x', 'p']);
    const m = ri(rnd, 2, 9);
    let n = ri(rnd, 2, 7);
    if (kind === 1) n = ri(rnd, 1, m - 1);
    if (kind === 1 && m < 3) return powRules(rnd, lang);
    const B = (e) => `${b}{^:${e}}`;
    if (kind === 0)
      return mc(
        L(lang, `Bentuk sederhana dari ${B(m)} × ${B(n)} adalah …`, `Simplify ${B(m)} × ${B(n)}.`),
        B(m + n),
        [
          [B(m * n), L(lang, 'Pada perkalian bilangan pokok sama, pangkatnya dijumlah, bukan dikali.', 'When multiplying with the same base, add the exponents; do not multiply them.')],
          [typeof b === 'number' ? `${b * b}{^:${m + n}}` : null, L(lang, 'Bilangan pokoknya tetap, tidak ikut dikalikan.', 'The base stays the same; it is not multiplied.')],
          [m !== n ? B(Math.abs(m - n)) : null, L(lang, 'Pada perkalian, pangkatnya dijumlah, bukan dikurangkan.', 'When multiplying, add the exponents; do not subtract them.')],
          [typeof b === 'number' ? `${b * b}{^:${m * n}}` : B(m + n + 1), L(lang, 'Ingat: aᵐ × aⁿ = aᵐ⁺ⁿ.', 'Remember: aᵐ × aⁿ = aᵐ⁺ⁿ.')],
        ],
        [L(lang, 'aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ × aⁿ = aᵐ⁺ⁿ'), `${B(m)} × ${B(n)} = ${B(m + n)}`],
        { kind, b, m, n },
      );
    if (kind === 1)
      return mc(
        L(lang, `Bentuk sederhana dari ${B(m)} ÷ ${B(n)} adalah …`, `Simplify ${B(m)} ÷ ${B(n)}.`),
        B(m - n),
        [
          [B(m + n), L(lang, 'Pada pembagian bilangan pokok sama, pangkatnya dikurangkan.', 'When dividing with the same base, subtract the exponents.')],
          [`1{^:${m - n}}`, L(lang, 'Bilangan pokoknya tetap, tidak ikut dibagi.', 'The base stays the same; it is not divided.')],
          [Number.isInteger(m / n) && m / n !== m - n ? B(m / n) : B(m * n), L(lang, 'Pangkatnya dikurangkan, bukan dibagi atau dikali.', 'Subtract the exponents; do not divide or multiply them.')],
        ],
        [L(lang, 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ'), `${B(m)} ÷ ${B(n)} = ${B(m - n)}`],
        { kind, b, m, n },
      );
    if (kind === 2)
      return mc(
        L(lang, `Bentuk sederhana dari (${B(m)}){^:${n}} adalah …`, `Simplify (${B(m)}){^:${n}}.`),
        B(m * n),
        [
          [B(m + n), L(lang, 'Pangkat dipangkatkan lagi: pangkatnya dikali, bukan dijumlah.', 'A power of a power: multiply the exponents, do not add them.')],
          [typeof b === 'number' ? `${b * n}{^:${m}}` : `${n}${b}{^:${m}}`, L(lang, 'Bilangan pokoknya tidak dikali dengan pangkat luar.', 'The base is not multiplied by the outer exponent.')],
          [B(m ** n <= 99 && m ** n !== m * n ? m ** n : m * n + 1), L(lang, 'Ingat: (aᵐ)ⁿ = aᵐˣⁿ.', 'Remember: (aᵐ)ⁿ = aᵐˣⁿ.')],
        ],
        [L(lang, '(aᵐ)ⁿ = aᵐˣⁿ', '(aᵐ)ⁿ = aᵐˣⁿ'), `(${B(m)}){^:${n}} = ${B(m * n)}`],
        { kind, b, m, n },
      );
    // nilai 2^m ÷ 2^n atau 3^m × 3^-
    const base = pick(rnd, [2, 3, 10]);
    const d = base === 2 ? ri(rnd, 2, 7) : ri(rnd, 2, 4);
    const big = ri(rnd, d + 2, d + 8);
    return num(
      L(lang, `Nilai dari ${base}{^:${big}} ÷ ${base}{^:${big - d}} adalah …`, `What is the value of ${base}{^:${big}} ÷ ${base}{^:${big - d}}?`),
      base ** d,
      [
        [base ** (big - d) === base ** d ? null : d, L(lang, `${d} adalah pangkatnya. Hitung nilai ${base}{^:${d}}.`, `${d} is the exponent. Work out ${base}{^:${d}}.`)],
        [Number.isInteger(big / (big - d)) ? base ** (big / (big - d)) : base * d, L(lang, 'Pangkatnya dikurangkan, bukan dibagi.', 'Subtract the exponents; do not divide them.')],
      ],
      [`${base}{^:${big}} ÷ ${base}{^:${big - d}} = ${base}{^:${big} − ${big - d}} = ${base}{^:${d}}`, `= ${base ** d}`],
      { kind, base, big, small: big - d },
    );
  },
  (m) => (m.kind === 3 ? D(m.base ** m.big / m.base ** m.small) : `${m.b}{^:${m.kind === 0 ? m.m + m.n : m.kind === 1 ? m.m - m.n : m.m * m.n}}`),
);

const negPow = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const b = pick(rnd, [2, 3, 4, 5, 10]);
      const n = b === 2 ? ri(rnd, 1, 5) : ri(rnd, 1, 3);
      return num(
        L(lang, `Nilai dari ${b}{^:−${n}} adalah … (boleh ditulis sebagai pecahan)`, `What is the value of ${b}{^:−${n}}? (you may write a fraction)`),
        F(1, b ** n),
        [
          [D(-(b ** n)), L(lang, 'Pangkat negatif tidak membuat hasilnya negatif. a⁻ⁿ = 1/aⁿ.', 'A negative exponent does not make the value negative. a⁻ⁿ = 1/aⁿ.')],
          [D(-b * n), L(lang, 'Pangkat bukan perkalian dengan pangkatnya.', 'An exponent is not multiplication by the exponent.')],
          [F(1, b * n) === F(1, b ** n) ? null : F(1, b * n), L(lang, `${b}{^:${n}} = ${b ** n}, bukan ${b * n}.`, `${b}{^:${n}} = ${b ** n}, not ${b * n}.`)],
        ],
        [L(lang, `a⁻ⁿ = 1/aⁿ, jadi ${b}{^:−${n}} = 1/${b}{^:${n}}.`, `a⁻ⁿ = 1/aⁿ, so ${b}{^:−${n}} = 1/${b}{^:${n}}.`), `= ${F(1, b ** n)}`],
        { kind, b, n },
      );
    }
    if (kind === 1) {
      const b = pick(rnd, [2, 3, 5, 10]);
      const m = ri(rnd, 1, 4);
      const n = ri(rnd, m + 1, m + (b === 2 ? 5 : 3));
      const r = n - m;
      return num(
        L(lang, `Nilai dari ${b}{^:−${m}} × ${b}{^:${n}} adalah …`, `What is the value of ${b}{^:−${m}} × ${b}{^:${n}}?`),
        b ** r,
        [
          [b ** (n + m), L(lang, `Pangkatnya dijumlah dengan tandanya: −${m} + ${n} = ${r}.`, `Add the exponents with their signs: −${m} + ${n} = ${r}.`)],
          [r, L(lang, `${r} adalah pangkatnya. Hitung nilai ${b}{^:${r}}.`, `${r} is the exponent. Work out ${b}{^:${r}}.`)],
        ],
        [`${b}{^:−${m} + ${n}} = ${b}{^:${r}}`, `= ${b ** r}`],
        { kind, b, m, n },
      );
    }
    const b = nz(rnd, -9, 12);
    const neg = rnd() < 0.4;
    return num(
      L(lang, `Nilai dari ${neg ? `−${Math.abs(b)}{^:0}` : `${b < 0 ? `(${M(lang, b)})` : b}{^:0}`} adalah …`, `What is the value of ${neg ? `−${Math.abs(b)}{^:0}` : `${b < 0 ? `(${M(lang, b)})` : b}{^:0}`}?`),
      neg ? -1 : 1,
      [
        [0, L(lang, 'Bilangan (bukan nol) berpangkat nol hasilnya 1, bukan 0.', 'Any non-zero number to the power 0 is 1, not 0.')],
        [neg ? 1 : -1, neg ? L(lang, `Pangkat nol hanya mengenai ${Math.abs(b)}, tanda minus di depannya tetap.`, `The power 0 applies only to ${Math.abs(b)}; the minus sign in front stays.`) : L(lang, 'Bilangan berpangkat nol hasilnya 1.', 'A number to the power 0 equals 1.')],
        [b, L(lang, 'Pangkat nol tidak membuat bilangannya tetap.', 'The power 0 does not leave the number unchanged.')],
      ],
      [L(lang, 'a⁰ = 1 untuk a ≠ 0.', 'a⁰ = 1 for a ≠ 0.'), neg ? `−(${Math.abs(b)}{^:0}) = −1` : `= 1`],
      { kind, neg },
    );
  },
  (m) => (m.kind === 0 ? F(1, Math.pow(m.b, m.n)) : m.kind === 1 ? D(Math.pow(m.b, m.n - m.m)) : D(m.neg ? -1 : 1)),
);

const sciTxt = (lang, a, e) => `${M(lang, a)} × 10{^:${M('id', e)}}`;
const sciNot = withSolve(
  (rnd, lang) => {
    const digits = ri(rnd, 11, 99);
    const a = digits / 10;
    const small = rnd() < 0.5;
    const e = small ? -ri(rnd, 2, 6) : ri(rnd, 3, 9);
    const value = a * 10 ** e;
    const shown = small ? N_(lang, value) : G(lang, Math.round(value));
    return mc(
      L(lang, `Notasi ilmiah dari ${shown} adalah …`, `The scientific notation of ${shown} is …`),
      sciTxt(lang, a, e),
      [
        [sciTxt(lang, a, e > 0 ? e - 1 : e + 1), L(lang, 'Hitung lagi berapa tempat koma digeser.', 'Count again how many places the decimal point moves.')],
        [sciTxt(lang, a, -e), L(lang, small ? 'Bilangan kurang dari 1 berpangkat negatif.' : 'Bilangan besar berpangkat positif.', small ? 'Numbers less than 1 have a negative exponent.' : 'Large numbers have a positive exponent.')],
        [`${digits} × 10{^:${M('id', e - 1)}}`, L(lang, 'Bilangan di depan harus antara 1 dan 10.', 'The front number must be between 1 and 10.')],
      ],
      [L(lang, `Geser koma sampai bilangan di depan antara 1 dan 10: ${M(lang, a)}.`, `Move the decimal point until the front number is between 1 and 10: ${M(lang, a)}.`), L(lang, `Koma bergeser ${Math.abs(e)} tempat ke ${small ? 'kanan, pangkat negatif' : 'kiri, pangkat positif'}: ${sciTxt(lang, a, e)}.`, `The point moves ${Math.abs(e)} places ${small ? 'right, so the exponent is negative' : 'left, so the exponent is positive'}: ${sciTxt(lang, a, e)}.`)],
      { digits, e },
    );
  },
  (m, lang) => sciTxt(lang, m.digits / 10, m.e),
);
// desimal kecil tanpa notasi e
function N_(lang, v) {
  const s = v.toFixed(12).replace(/0+$/, '');
  return lang === 'en' ? s : s.replace('.', ',');
}

const SQF = [2, 3, 5, 6, 7, 10, 11];
const surd = (k, m) => (k === 1 ? `√${m}` : `${k}√${m}`);
const roots = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0) {
      const r = ri(rnd, 4, 25);
      const sq = rnd() < 0.4;
      return num(
        sq ? L(lang, `Sebuah persegi luasnya ${r * r} cm². Panjang sisinya adalah … cm`, `A square has area ${r * r} cm². How long is its side, in cm?`) : L(lang, `Nilai dari √${r * r} adalah …`, `What is √${r * r}?`),
        r,
        [
          [r % 2 === 0 ? (r * r) / 2 : null, L(lang, 'Akar bukan dibagi 2. Cari bilangan yang jika dikuadratkan hasilnya sama.', 'A square root is not halving. Find the number that squares to it.')],
          [r * r * r <= 9999 ? r * r * r : null, L(lang, 'Akar kuadrat adalah kebalikan dari mengkuadratkan, bukan dikalikan lagi.', 'A square root undoes squaring; do not multiply again.')],
        ],
        [L(lang, `${r} × ${r} = ${r * r}.`, `${r} × ${r} = ${r * r}.`), `√${r * r} = ${r}`],
        { kind, n: r * r },
      );
    }
    if (kind === 1) {
      const m = pick(rnd, SQF);
      const k = ri(rnd, 2, m <= 3 ? 7 : 5);
      const n = k * k * m;
      const half = k % 2 === 0 ? surd(k / 2, 4 * m) : null;
      return mc(
        L(lang, `Bentuk sederhana dari √${n} adalah …`, `Simplify √${n}.`),
        surd(k, m),
        [
          [half, L(lang, `${4 * m} masih memuat faktor kuadrat 4, jadi belum paling sederhana.`, `${4 * m} still contains the square factor 4, so it is not fully simplified.`)],
          [surd(k * k, m), L(lang, `√${k * k} = ${k}, bukan ${k * k}.`, `√${k * k} = ${k}, not ${k * k}.`)],
          [surd(m, k * k === m ? k + 1 : k), L(lang, 'Bilangan di luar dan di dalam akar tertukar.', 'The numbers inside and outside the root are swapped.')],
          [surd(k, m + 1), L(lang, `Periksa: ${k}² × ${m} = ${n}.`, `Check: ${k}² × ${m} = ${n}.`)],
        ],
        [L(lang, `Pecah menjadi faktor kuadrat terbesar: ${n} = ${k * k} × ${m}.`, `Split off the largest square factor: ${n} = ${k * k} × ${m}.`), `√${n} = √${k * k} × √${m} = ${surd(k, m)}`],
        { kind, n },
      );
    }
    if (kind === 2) {
      let n = ri(rnd, 5, 150);
      while (Number.isInteger(Math.sqrt(n))) n = ri(rnd, 5, 150);
      const f = Math.floor(Math.sqrt(n));
      return mc(
        L(lang, `√${n} terletak di antara …`, `√${n} lies between …`),
        L(lang, `${f} dan ${f + 1}`, `${f} and ${f + 1}`),
        [
          [L(lang, `${f - 1} dan ${f}`, `${f - 1} and ${f}`), L(lang, `${f}² = ${f * f} masih kurang dari ${n}.`, `${f}² = ${f * f} is still less than ${n}.`)],
          [L(lang, `${f + 1} dan ${f + 2}`, `${f + 1} and ${f + 2}`), L(lang, `${f + 1}² = ${(f + 1) ** 2} sudah lebih dari ${n}.`, `${f + 1}² = ${(f + 1) ** 2} is already more than ${n}.`)],
          [Math.floor(n / 2) !== f ? L(lang, `${Math.floor(n / 2)} dan ${Math.floor(n / 2) + 1}`, `${Math.floor(n / 2)} and ${Math.floor(n / 2) + 1}`) : null, L(lang, 'Akar bukan setengah dari bilangannya.', 'A square root is not half the number.')],
        ],
        [`${f}² = ${f * f} < ${n} < ${(f + 1) ** 2} = ${f + 1}²`, L(lang, `Jadi √${n} di antara ${f} dan ${f + 1}.`, `So √${n} is between ${f} and ${f + 1}.`)],
        { kind, n },
      );
    }
    const m = pick(rnd, SQF);
    const p = ri(rnd, 1, 9);
    const q = ri(rnd, 1, 9);
    const minus = rnd() < 0.4 && p !== q;
    const r = minus ? p - q : p + q;
    return mc(
      `${surd(p, m)} ${minus ? '−' : '+'} ${surd(q, m)} = …`,
      r === 0 ? '0' : r < 0 ? '−' + surd(-r, m) : surd(r, m),
      [
        [r > 0 ? surd(r, 2 * m) : null, L(lang, 'Bilangan di dalam akar tidak dijumlahkan. Akar sejenis seperti suku sejenis.', 'The numbers under the root are not added. Like surds work like like terms.')],
        [String(minus ? Math.abs(r) : r), L(lang, `Akarnya tidak hilang: ${surd(p, m)} dan ${surd(q, m)} sama-sama memuat √${m}.`, `The root does not disappear: both terms contain √${m}.`)],
        [surd(p * q, m), L(lang, 'Koefisiennya dijumlah atau dikurang, bukan dikali.', 'Add or subtract the coefficients; do not multiply them.')],
        [minus ? (r < 0 ? surd(-r, m) : '−' + surd(r, m)) : surd(r + 1, m), L(lang, 'Periksa lagi hitungan koefisiennya.', 'Check the coefficients again.')],
      ],
      [L(lang, `Keduanya memuat √${m}, jadi koefisiennya digabung.`, `Both contain √${m}, so combine the coefficients.`), `(${p} ${minus ? '−' : '+'} ${q})√${m} = ${r === 0 ? '0' : r < 0 ? '−' + surd(-r, m) : surd(r, m)}`],
      { kind, p, q, m, minus },
    );
  },
  (m, lang) => {
    if (m.kind === 0) return D(Math.round(Math.sqrt(m.n)));
    if (m.kind === 1) {
      let k = 1;
      for (let i = 2; i * i <= m.n; i++) if (m.n % (i * i) === 0) k = i;
      return surd(k, m.n / (k * k));
    }
    if (m.kind === 2) {
      let f = 0;
      while ((f + 1) * (f + 1) <= m.n) f++;
      return L(lang, `${f} dan ${f + 1}`, `${f} and ${f + 1}`);
    }
    const r = m.minus ? m.p - m.q : m.p + m.q;
    return r === 0 ? '0' : r < 0 ? '−' + surd(-r, m.m) : surd(r, m.m);
  },
);

// ================= Bab 2: Teorema Pythagoras =================
const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]];
const triple = (rnd, max = 60) => {
  let t;
  let k;
  do {
    t = pick(rnd, TRIPLES);
    k = ri(rnd, 1, 6);
  } while (t[2] * k > max);
  return t.map((v) => v * k);
};

const pythHyp = withSolve(
  (rnd, lang) => {
    const [a, b, c] = triple(rnd);
    const kind = ri(rnd, 0, 1);
    if (kind === 1)
      return num(
        L(lang, `Luas persegi pada dua sisi siku-siku sebuah segitiga adalah ${a * a} cm² dan ${b * b} cm². Luas persegi pada sisi miringnya adalah … cm²`, `The squares on the two shorter sides of a right triangle have areas ${a * a} cm² and ${b * b} cm². What is the area of the square on the hypotenuse, in cm²?`),
        c * c,
        [
          [c, L(lang, 'Itu panjang sisi miringnya. Yang ditanya luas perseginya.', 'That is the hypotenuse length. The question asks for the square’s area.')],
          [b * b - a * a, L(lang, 'Luas persegi pada sisi miring adalah jumlah dua luas yang lain.', 'The square on the hypotenuse is the sum of the other two squares.')],
        ],
        [L(lang, 'Teorema Pythagoras: c² = a² + b².', 'Pythagoras: c² = a² + b².'), `${a * a} + ${b * b} = ${c * c}`],
        { kind, a, b },
      );
    return num(
      L(lang, `Segitiga siku-siku memiliki sisi siku-siku ${a} cm dan ${b} cm. Panjang sisi miringnya adalah … cm`, `A right triangle has legs ${a} cm and ${b} cm. How long is the hypotenuse, in cm?`),
      c,
      [
        [a + b, L(lang, 'Sisi miring bukan jumlah dua sisi. Pakai c² = a² + b².', 'The hypotenuse is not the sum of the legs. Use c² = a² + b².')],
        [c * c, L(lang, 'Itu c². Jangan lupa ambil akarnya.', 'That is c². Remember to take the square root.')],
      ],
      [`c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}`, `c = √${c * c} = ${c}`],
      { kind, a, b },
    );
  },
  (m) => (m.kind === 1 ? D(m.a ** 2 + m.b ** 2) : D(Math.hypot(m.a, m.b))),
);

const pythLeg = withSolve(
  (rnd, lang) => {
    const [a, b, c] = triple(rnd);
    const kind = ri(rnd, 0, 2);
    if (kind === 0)
      return num(
        L(lang, `Sisi miring sebuah segitiga siku-siku ${c} cm dan satu sisi siku-sikunya ${a} cm. Panjang sisi siku-siku yang lain adalah … cm`, `A right triangle has hypotenuse ${c} cm and one leg ${a} cm. How long is the other leg, in cm?`),
        b,
        [
          [c - a, L(lang, 'Sisi tidak dikurangkan langsung. Pakai b² = c² − a².', 'Do not subtract the sides directly. Use b² = c² − a².')],
          [Math.round(Math.sqrt(c * c + a * a) * 100) / 100, L(lang, 'Untuk sisi siku-siku, kuadratnya dikurangkan, bukan dijumlahkan.', 'For a leg, subtract the squares, do not add them.')],
        ],
        [`b² = ${c}² − ${a}² = ${c * c} − ${a * a} = ${b * b}`, `b = √${b * b} = ${b}`],
        { kind, x: c, y: a },
      );
    if (kind === 1) {
      // segitiga sama kaki: alas 2a, kaki c, tinggi b
      return num(
        L(lang, `Sebuah segitiga sama kaki memiliki alas ${2 * a} cm dan kaki ${c} cm. Tinggi segitiga itu adalah … cm`, `An isosceles triangle has base ${2 * a} cm and equal sides ${c} cm. What is its height in cm?`),
        b,
        [
          [Number.isInteger(Math.sqrt(c * c - 4 * a * a)) ? Math.sqrt(c * c - 4 * a * a) : c - a, L(lang, `Tinggi membagi alas menjadi dua: ${a} cm dan ${a} cm. Pakai setengah alas.`, `The height splits the base in half: ${a} cm each. Use half the base.`)],
        ],
        [L(lang, `Tinggi membagi alas sama panjang, jadi setengah alas = ${a} cm.`, `The height cuts the base in half, so half the base = ${a} cm.`), `t = √(${c}² − ${a}²) = √${b * b} = ${b}`],
        { kind, x: c, y: a },
      );
    }
    return num(
      L(lang, `Sebuah persegi panjang berukuran ${a} cm × ${b} cm. Panjang diagonalnya adalah … cm`, `A rectangle measures ${a} cm × ${b} cm. How long is its diagonal, in cm?`),
      c,
      [
        [a + b, L(lang, 'Diagonal adalah sisi miring segitiga siku-siku, bukan jumlah sisi.', 'The diagonal is the hypotenuse of a right triangle, not the sum of the sides.')],
        [a * b, L(lang, 'Itu luasnya.', 'That is the area.')],
      ],
      [L(lang, 'Diagonal membagi persegi panjang menjadi dua segitiga siku-siku.', 'The diagonal splits the rectangle into two right triangles.'), `d = √(${a}² + ${b}²) = √${c * c} = ${c}`],
      { kind, x: a, y: b },
    );
  },
  (m) => D(m.kind === 2 ? Math.sqrt(m.x ** 2 + m.y ** 2) : Math.sqrt(m.x ** 2 - m.y ** 2)),
);

const TRI_T = [
  ['siku-siku', 'right'],
  ['lancip', 'acute'],
  ['tumpul', 'obtuse'],
];
const triKind = withSolve(
  (rnd, lang) => {
    let s;
    const want = ri(rnd, 0, 2);
    do {
      if (want === 0) s = triple(rnd, 50);
      else {
        const a = ri(rnd, 3, 15);
        const b = ri(rnd, a, 16);
        const c = ri(rnd, b, a + b - 1);
        s = [a, b, c];
      }
    } while (want !== (s[0] ** 2 + s[1] ** 2 === s[2] ** 2 ? 0 : s[0] ** 2 + s[1] ** 2 > s[2] ** 2 ? 1 : 2));
    const [a, b, c] = s;
    const sq = a * a + b * b;
    const rel = sq === c * c ? '=' : sq > c * c ? '>' : '<';
    return mc(
      L(lang, `Segitiga dengan sisi ${a} cm, ${b} cm, dan ${c} cm termasuk segitiga …`, `A triangle with sides ${a} cm, ${b} cm, and ${c} cm is …`),
      L(lang, TRI_T[want][0], `a${want === 0 ? '' : want === 1 ? 'n' : 'n'} ${TRI_T[want][1]} triangle`),
      [0, 1, 2]
        .filter((i) => i !== want)
        .map((i) => [L(lang, TRI_T[i][0], `a${i === 0 ? '' : 'n'} ${TRI_T[i][1]} triangle`), L(lang, `Bandingkan ${a}² + ${b}² = ${sq} dengan ${c}² = ${c * c}.`, `Compare ${a}² + ${b}² = ${sq} with ${c}² = ${c * c}.`)])
        .concat([[L(lang, 'tidak bisa dibentuk', 'impossible to make'), L(lang, `${a} + ${b} > ${c}, jadi segitiganya bisa dibentuk.`, `${a} + ${b} > ${c}, so the triangle can be made.`)]]),
      [`${a}² + ${b}² = ${sq}, ${c}² = ${c * c}`, L(lang, `${sq} ${rel} ${c * c}, jadi segitiga ${TRI_T[want][0]}.`, `${sq} ${rel} ${c * c}, so it is ${want === 0 ? 'a' : 'an'} ${TRI_T[want][1]} triangle.`)],
      { a, b, c },
    );
  },
  (m, lang) => {
    const d = m.a * m.a + m.b * m.b - m.c * m.c;
    const i = d === 0 ? 0 : d > 0 ? 1 : 2;
    return L(lang, TRI_T[i][0], `a${i === 0 ? '' : 'n'} ${TRI_T[i][1]} triangle`);
  },
);

const tripleFind = withSolve(
  (rnd, lang) => {
    const [a, b, c] = triple(rnd, 90);
    const askC = rnd() < 0.6;
    return num(
      askC
        ? L(lang, `Bilangan ${a}, ${b}, dan p adalah tripel Pythagoras dengan p bilangan terbesar. Nilai p adalah …`, `${a}, ${b}, and p form a Pythagorean triple with p the largest. Find p.`)
        : L(lang, `Bilangan ${a}, p, dan ${c} adalah tripel Pythagoras dengan ${c} bilangan terbesar. Nilai p adalah …`, `${a}, p, and ${c} form a Pythagorean triple with ${c} the largest. Find p.`),
      askC ? c : b,
      [
        [askC ? a + b : c - a, L(lang, 'Tripel Pythagoras memenuhi a² + b² = c², bukan a + b = c.', 'A Pythagorean triple satisfies a² + b² = c², not a + b = c.')],
        [askC ? c * c : b * b, L(lang, 'Itu kuadratnya. Ambil akarnya.', 'That is the square. Take the square root.')],
      ],
      askC ? [`p² = ${a}² + ${b}² = ${c * c}`, `p = ${c}`] : [`p² = ${c}² − ${a}² = ${b * b}`, `p = ${b}`],
      { a, o: askC ? b : c, askC },
    );
  },
  (m) => D(m.askC ? Math.sqrt(m.a ** 2 + m.o ** 2) : Math.sqrt(m.o ** 2 - m.a ** 2)),
);

const pythApp = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const [a, b, c] = triple(rnd, 50);
    if (kind === 0)
      return num(
        L(lang, `Tangga sepanjang ${c} m bersandar pada tembok. Ujung atas tangga berada ${b} m dari tanah. Jarak kaki tangga ke tembok adalah … m`, `A ${c} m ladder leans against a wall. Its top is ${b} m above the ground. How far is the foot of the ladder from the wall, in m?`),
        a,
        [[c - b, L(lang, 'Pakai Pythagoras: jarak² = tangga² − tinggi².', 'Use Pythagoras: distance² = ladder² − height².')], [Math.round(Math.hypot(b, c) * 100) / 100, L(lang, 'Tangga adalah sisi miring, jadi kuadratnya dikurangkan.', 'The ladder is the hypotenuse, so subtract the squares.')]],
        [`${c}² − ${b}² = ${c * c} − ${b * b} = ${a * a}`, `√${a * a} = ${a}`],
        { kind, h: c, s: b },
      );
    if (kind === 1) {
      const x1 = ri(rnd, -5, 5);
      const y1 = ri(rnd, -5, 5);
      const sx = pick(rnd, [1, -1]);
      const sy = pick(rnd, [1, -1]);
      const [dx, dy] = rnd() < 0.5 ? [a, b] : [b, a];
      if (c > 20) return pythApp(rnd, lang);
      const x2 = x1 + sx * dx;
      const y2 = y1 + sy * dy;
      return num(
        L(lang, `Jarak antara titik A${pt(lang, x1, y1)} dan B${pt(lang, x2, y2)} adalah … satuan`, `What is the distance between A${pt(lang, x1, y1)} and B${pt(lang, x2, y2)}, in units?`),
        c,
        [[dx + dy, L(lang, 'Jarak lurus bukan jumlah selisih x dan y. Pakai Pythagoras.', 'The straight distance is not the sum of the x and y differences. Use Pythagoras.')]],
        [L(lang, `Selisih x = ${dx}, selisih y = ${dy}.`, `x difference = ${dx}, y difference = ${dy}.`), `√(${dx}² + ${dy}²) = √${c * c} = ${c}`],
        { kind, x1, y1, x2, y2 },
      );
    }
    if (kind === 2) {
      const dirs = pick(rnd, [['barat', 'selatan', 'west', 'south'], ['utara', 'timur', 'north', 'east'], ['timur', 'utara', 'east', 'north']]);
      const nm = pick(rnd, NAMES);
      return num(
        L(lang, `${nm} berjalan ${a} m ke ${dirs[0]}, lalu ${b} m ke ${dirs[1]}. Jarak ${nm} dari titik awal adalah … m`, `${nm} walks ${a} m ${dirs[2]}, then ${b} m ${dirs[3]}. How far is ${nm} from the starting point, in m?`),
        c,
        [[a + b, L(lang, 'Itu panjang jalan yang ditempuh. Jarak dari titik awal adalah garis lurusnya.', 'That is the distance walked. The distance from the start is the straight line.')], [b - a > 0 ? b - a : a - b, L(lang, 'Kedua arah saling tegak lurus, jadi pakai Pythagoras.', 'The two directions are perpendicular, so use Pythagoras.')]],
        [L(lang, 'Kedua arah membentuk sudut siku-siku.', 'The two directions make a right angle.'), `√(${a}² + ${b}²) = √${c * c} = ${c}`],
        { kind, a, b },
      );
    }
    return num(
      L(lang, `Sebuah lapangan berbentuk persegi panjang ${a * 2} m × ${b * 2} m. Budi berjalan dari satu pojok ke pojok seberang melalui diagonal, sedangkan Ani berjalan memutar melalui tepi. Selisih jarak tempuh mereka adalah … m`, `A rectangular field is ${a * 2} m × ${b * 2} m. Budi walks corner to opposite corner along the diagonal; Ani walks around the edges. What is the difference in the distances they walk, in m?`),
      2 * (a + b - c),
      [[2 * c, L(lang, 'Itu panjang diagonal. Yang ditanya selisihnya.', 'That is the diagonal. The question asks for the difference.')], [2 * (a + b), L(lang, 'Itu jarak tempuh Ani.', 'That is the distance Ani walks.')]],
      [L(lang, `Diagonal = √(${2 * a}² + ${2 * b}²) = ${2 * c} m. Jalan memutar = ${2 * a} + ${2 * b} = ${2 * (a + b)} m.`, `Diagonal = √(${2 * a}² + ${2 * b}²) = ${2 * c} m. Around the edges = ${2 * a} + ${2 * b} = ${2 * (a + b)} m.`), `${2 * (a + b)} − ${2 * c} = ${2 * (a + b - c)}`],
      { kind, a: 2 * a, b: 2 * b },
    );
  },
  (m) => {
    if (m.kind === 0) return D(Math.sqrt(m.h ** 2 - m.s ** 2));
    if (m.kind === 1) return D(Math.hypot(m.x2 - m.x1, m.y2 - m.y1));
    if (m.kind === 2) return D(Math.hypot(m.a, m.b));
    return D(m.a + m.b - Math.hypot(m.a, m.b));
  },
);

// ================= Bab 3: Relasi dan Fungsi =================
const setTxt = (arr) => `{${arr.join(', ')}}`;
const pairsTxt = (prs) => `{${prs.map(([x, y]) => `(${x}, ${y})`).join(', ')}}`;
const factorRel = withSolve(
  (rnd, lang) => {
    const A = shuf(rnd, [2, 3, 4, 5, 6]).slice(0, 3).sort((x, y) => x - y);
    const Bset = new Set();
    while (Bset.size < 4) Bset.add(ri(rnd, 4, 30));
    const B = [...Bset].sort((x, y) => x - y);
    const prs = [];
    for (const a of A) for (const b of B) if (b % a === 0) prs.push([a, b]);
    if (prs.length < 2) return factorRel(rnd, lang);
    return num(
      L(lang, `A = ${setTxt(A)} dan B = ${setTxt(B)}. Relasi "faktor dari" dari A ke B. Banyak pasangan berurutannya adalah …`, `A = ${setTxt(A)} and B = ${setTxt(B)}. The relation "is a factor of" goes from A to B. How many ordered pairs are there?`),
      prs.length,
      [
        [new Set(prs.map((p) => p[1])).size, L(lang, 'Satu anggota B boleh dipasangkan dengan lebih dari satu anggota A. Hitung semua pasangan.', 'One member of B can pair with more than one member of A. Count every pair.')],
        [new Set(prs.map((p) => p[0])).size, L(lang, 'Satu anggota A boleh punya lebih dari satu pasangan.', 'One member of A can have more than one partner.')],
      ],
      [L(lang, 'Pasangkan a dengan b jika b habis dibagi a.', 'Pair a with b when b is divisible by a.'), `${pairsTxt(prs)}: ${prs.length}`],
      { A, B },
    );
  },
  (m) => {
    let c = 0;
    m.A.forEach((a) => m.B.forEach((b) => (c += b % a === 0 ? 1 : 0)));
    return D(c);
  },
);

const RULES = [
  { id: 'setengah dari', en: 'is half of', f: (a) => 2 * a },
  { id: 'dua kurangnya dari', en: 'is two less than', f: (a) => a + 2 },
  { id: 'satu kurangnya dari', en: 'is one less than', f: (a) => a + 1 },
  { id: 'tiga kurangnya dari', en: 'is three less than', f: (a) => a + 3 },
  { id: 'sepertiga dari', en: 'is a third of', f: (a) => 3 * a },
  { id: 'dua lebihnya dari', en: 'is two more than', f: (a) => a - 2 },
  { id: 'kuadrat dari', en: 'is the square of', f: (a) => Math.sqrt(a) },
  { id: 'dua kali dari', en: 'is twice', f: (a) => a / 2 },
];
const relRule = withSolve(
  (rnd, lang) => {
    const k = ri(rnd, 0, 4);
    const start = ri(rnd, 1, 4);
    const A = [start, start + 1, start + 2];
    const prs = A.map((a) => [a, RULES[k].f(a)]);
    const others = shuf(rnd, RULES.map((_, i) => i).filter((i) => i !== k && !A.every((a) => RULES[i].f(a) === RULES[k].f(a)))).slice(0, 3);
    return mc(
      L(lang, `Sebuah relasi dari A = ${setTxt(A)} ke B dinyatakan dengan pasangan berurutan ${pairsTxt(prs)}. Relasi yang tepat adalah …`, `A relation from A = ${setTxt(A)} to B is given by the ordered pairs ${pairsTxt(prs)}. Which rule describes it?`),
      L(lang, RULES[k].id, RULES[k].en),
      others.map((i) => [L(lang, RULES[i].id, RULES[i].en), L(lang, `Uji pasangan (${prs[0][0]}, ${prs[0][1]}): apakah ${prs[0][0]} ${RULES[i].id} ${prs[0][1]}? Tidak.`, `Test (${prs[0][0]}, ${prs[0][1]}): ${prs[0][0]} ${RULES[i].en} ${prs[0][1]}? No.`)]),
      [L(lang, 'Baca setiap pasangan (a, b) sebagai "a … b".', 'Read each pair (a, b) as "a … b".'), L(lang, `${prs[0][0]} ${RULES[k].id} ${prs[0][1]}, ${prs[1][0]} ${RULES[k].id} ${prs[1][1]}, dan seterusnya.`, `${prs[0][0]} ${RULES[k].en} ${prs[0][1]}, ${prs[1][0]} ${RULES[k].en} ${prs[1][1]}, and so on.`)],
      { prs },
    );
  },
  (m, lang) => {
    const r = RULES.find((R) => m.prs.every(([a, b]) => R.f(a) === b));
    return L(lang, r.id, r.en);
  },
);

const isFunc = (prs, A) => A.every((a) => prs.filter((p) => p[0] === a).length === 1) && prs.every((p) => A.includes(p[0]));
const funcPick = withSolve(
  (rnd, lang) => {
    const A = [1, 2, 3];
    const B = pick(rnd, [['p', 'q', 'r'], ['a', 'b', 'c'], ['x', 'y', 'z']]);
    const good = A.map((a) => [a, pick(rnd, B)]);
    const missing = shuf(rnd, good).slice(0, 2).sort((x, y) => x[0] - y[0]);
    const dupA = pick(rnd, A);
    const extraB = B.find((b) => b !== good[dupA - 1][1]);
    const twice = [...good, [dupA, extraB]].sort((x, y) => x[0] - y[0]);
    const rev = good.map(([a, b]) => [b, a]);
    const opts = [good, missing, twice, rev];
    return mc(
      L(lang, `Manakah himpunan pasangan berurutan yang merupakan fungsi dari A = ${setTxt(A)} ke B = ${setTxt(B)}?`, `Which set of ordered pairs is a function from A = ${setTxt(A)} to B = ${setTxt(B)}?`),
      pairsTxt(good),
      [
        [pairsTxt(missing), L(lang, `Ada anggota A yang tidak punya pasangan.`, 'A member of A has no partner.')],
        [pairsTxt(twice), L(lang, `${dupA} punya dua pasangan. Pada fungsi, setiap anggota A tepat satu pasangan.`, `${dupA} has two partners. In a function each member of A has exactly one.`)],
        [pairsTxt(rev), L(lang, 'Pasangannya terbalik: anggota pertama harus dari A.', 'The pairs are reversed: the first entry must come from A.')],
      ],
      [L(lang, 'Fungsi: setiap anggota A punya tepat satu pasangan di B.', 'Function: every member of A has exactly one partner in B.'), pairsTxt(good)],
      { opts },
    );
  },
  (m) => pairsTxt(m.opts.find((o) => isFunc(o, [1, 2, 3]))),
);

const rangeCount = withSolve(
  (rnd, lang) => {
    const nA = ri(rnd, 3, 5);
    const nB = ri(rnd, 3, 5);
    const A = ['a', 'b', 'c', 'd', 'e'].slice(0, nA);
    const B = Array.from({ length: nB }, (_, i) => i + 1);
    const prs = A.map((x) => [x, pick(rnd, B)]);
    const r = new Set(prs.map((p) => p[1])).size;
    const ask = ri(rnd, 0, 1);
    return num(
      ask === 0
        ? L(lang, `Fungsi dari A = ${setTxt(A)} ke B = ${setTxt(B)} berupa ${pairsTxt(prs)}. Banyak anggota range-nya adalah …`, `A function from A = ${setTxt(A)} to B = ${setTxt(B)} is ${pairsTxt(prs)}. How many members does its range have?`)
        : L(lang, `Fungsi dari A = ${setTxt(A)} ke B = ${setTxt(B)} berupa ${pairsTxt(prs)}. Banyak anggota kodomain-nya adalah …`, `A function from A = ${setTxt(A)} to B = ${setTxt(B)} is ${pairsTxt(prs)}. How many members does its codomain have?`),
      ask === 0 ? r : nB,
      ask === 0
        ? [[nB, L(lang, 'Itu kodomain (seluruh B). Range hanya anggota B yang punya pasangan.', 'That is the codomain (all of B). The range is only the members of B that are used.')], [nA, L(lang, 'Itu domain. Range adalah hasil fungsinya.', 'That is the domain. The range is the set of outputs.')]]
        : [[r, L(lang, 'Itu range. Kodomain adalah seluruh himpunan B.', 'That is the range. The codomain is all of B.')], [nA, L(lang, 'Itu banyak anggota domain.', 'That is the size of the domain.')]],
      ask === 0 ? [L(lang, 'Range = himpunan hasil (anggota B yang dipakai).', 'Range = the set of outputs (members of B that are used).'), `${setTxt([...new Set(prs.map((p) => p[1]))].sort())}: ${r}`] : [L(lang, 'Kodomain = himpunan B seluruhnya.', 'Codomain = the whole set B.'), `${setTxt(B)}: ${nB}`],
      { prs, nB, ask },
    );
  },
  (m) => D(m.ask === 0 ? new Set(m.prs.map((p) => p[1])).size : m.nB),
);

const fx = (a, b, v = 'x') => `f(${v}) = ${ex([[a, 'x'], [b, '']])}`;
const funcVal = withSolve(
  (rnd, lang) => {
    const a = nz(rnd, -6, 8);
    const b = nz(rnd, -12, 12);
    const kind = ri(rnd, 0, 1);
    const x = nz(rnd, -6, 9);
    const v = a * x + b;
    if (kind === 0)
      return num(
        L(lang, `Diketahui ${fx(a, b)}. Nilai f(${M(lang, x)}) adalah …`, `Given ${fx(a, b)}, find f(${M(lang, x)}).`),
        v,
        [
          [a + x + b, L(lang, `${ex([[a, 'x']])} artinya ${M(lang, a)} dikali x.`, `${ex([[a, 'x']])} means ${M(lang, a)} times x.`)],
          [a * x - b, L(lang, 'Tanda konstanta terbalik.', 'The sign of the constant is flipped.')],
          [x < 0 ? -a * x + b : null, L(lang, 'Ganti x dengan bilangan negatif memakai kurung.', 'Substitute the negative number using brackets.')],
        ],
        [`f(${M(lang, x)}) = ${M(lang, a)} × ${P(lang, x)} ${b < 0 ? '−' : '+'} ${Math.abs(b)}`, `= ${M(lang, v)}`],
        { kind, a, b, x },
      );
    return num(
      L(lang, `Diketahui ${fx(a, b)}. Jika f(k) = ${M(lang, v)}, nilai k adalah …`, `Given ${fx(a, b)}. If f(k) = ${M(lang, v)}, find k.`),
      x,
      [
        [a * v + b, L(lang, `Yang dicari k sehingga ${ex([[a, 'k'], [b, '']])} = ${M(lang, v)}, bukan f(${M(lang, v)}).`, `Find k with ${ex([[a, 'k'], [b, '']])} = ${M(lang, v)}, not f(${M(lang, v)}).`)],
        [(v + b) / a, L(lang, `${M(lang, b)} dipindah ruas dengan tanda berlawanan.`, `Move ${M(lang, b)} across with the opposite sign.`)],
      ],
      [`${ex([[a, 'k'], [b, '']])} = ${M(lang, v)}  →  ${ex([[a, 'k']])} = ${M(lang, v - b)}`, `k = ${M(lang, x)}`],
      { kind, a, b, v },
    );
  },
  (m) => D(m.kind === 0 ? m.a * m.x + m.b : (m.v - m.b) / m.a),
);

const funcFormula = withSolve(
  (rnd, lang) => {
    const a = nz(rnd, -5, 6);
    const b = nz(rnd, -9, 9);
    const table = rnd() < 0.5;
    const f = (x) => a * x + b;
    let q;
    let meta;
    if (table) {
      const x0 = ri(rnd, 1, 3);
      const xs = [x0, x0 + 1, x0 + 2];
      q = L(lang, `Tabel fungsi linear: x = ${xs.join(', ')} menghasilkan f(x) = ${xs.map((x) => M(lang, f(x))).join(', ')}. Rumus fungsinya adalah …`, `A linear function table: x = ${xs.join(', ')} gives f(x) = ${xs.map((x) => M(lang, f(x))).join(', ')}. What is the formula?`);
      meta = { x1: xs[0], y1: f(xs[0]), x2: xs[1], y2: f(xs[1]) };
    } else {
      const k = ri(rnd, 1, 4);
      q = L(lang, `Fungsi linear f memenuhi f(0) = ${M(lang, b)} dan f(${k}) = ${M(lang, f(k))}. Rumus fungsinya adalah …`, `A linear function f has f(0) = ${M(lang, b)} and f(${k}) = ${M(lang, f(k))}. What is its formula?`);
      meta = { x1: 0, y1: b, x2: k, y2: f(k) };
    }
    return mc(
      q,
      fx(a, b),
      [
        [fx(b, a), L(lang, 'Koefisien x dan konstantanya tertukar.', 'The coefficient of x and the constant are swapped.')],
        [fx(a, -b), L(lang, `Cek f(0): harus ${M(lang, b)}.`, `Check f(0): it must be ${M(lang, b)}.`)],
        [fx(-a, b), L(lang, 'Tanda kemiringannya keliru. Lihat apakah f(x) naik atau turun.', 'The slope has the wrong sign. Check whether f(x) goes up or down.')],
        [fx(a + 1, b), L(lang, `Selisih f(x) setiap x naik 1 adalah ${M(lang, a)}.`, `f(x) changes by ${M(lang, a)} each time x goes up by 1.`)],
      ],
      [L(lang, `Kemiringan a = (${M(lang, meta.y2)} − ${P(lang, meta.y1)}) ÷ (${meta.x2} − ${meta.x1}) = ${M(lang, a)}.`, `Slope a = (${M(lang, meta.y2)} − ${P(lang, meta.y1)}) ÷ (${meta.x2} − ${meta.x1}) = ${M(lang, a)}.`), L(lang, `f(0) = ${M(lang, b)}, jadi ${fx(a, b)}.`, `f(0) = ${M(lang, b)}, so ${fx(a, b)}.`)],
      meta,
    );
  },
  (m) => {
    const a = (m.y2 - m.y1) / (m.x2 - m.x1);
    return fx(a, m.y1 - a * m.x1);
  },
);

// ================= Bab 4: Persamaan Garis Lurus =================
const QUAD = ['I', 'II', 'III', 'IV'];
const coordQ = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const x = nz(rnd, -9, 9);
      const y = nz(rnd, -9, 9);
      const qd = x > 0 ? (y > 0 ? 0 : 3) : y > 0 ? 1 : 2;
      return mc(
        L(lang, `Titik P${pt(lang, x, y)} terletak di kuadran …`, `Point P${pt(lang, x, y)} lies in quadrant …`),
        QUAD[qd],
        QUAD.filter((_, i) => i !== qd).map((t) => [t, L(lang, `Kuadran ${t}: ${{ I: 'x positif, y positif', II: 'x negatif, y positif', III: 'x negatif, y negatif', IV: 'x positif, y negatif' }[t]}.`, `Quadrant ${t}: ${{ I: 'x positive, y positive', II: 'x negative, y positive', III: 'x negative, y negative', IV: 'x positive, y negative' }[t]}.`)]),
        [L(lang, `x = ${M(lang, x)} (${x > 0 ? 'positif' : 'negatif'}), y = ${M(lang, y)} (${y > 0 ? 'positif' : 'negatif'}).`, `x = ${M(lang, x)} (${x > 0 ? 'positive' : 'negative'}), y = ${M(lang, y)} (${y > 0 ? 'positive' : 'negative'}).`), L(lang, `Jadi kuadran ${QUAD[qd]}.`, `So quadrant ${QUAD[qd]}.`)],
        { kind, x, y },
        { fixed: true },
      );
    }
    const m = nz(rnd, -4, 5);
    const r = nz(rnd, -6, 6);
    const c = -m * r;
    if (kind === 1) {
      const x = nz(rnd, -5, 6);
      return num(
        L(lang, `Titik (${M(lang, x)}, k) terletak pada garis ${lineTxt(m, c + 1)}. Nilai k adalah …`, `The point (${M(lang, x)}, k) lies on the line ${lineTxt(m, c + 1)}. Find k.`),
        m * x + c + 1,
        [
          [Number.isInteger((x - c - 1) / m) ? (x - c - 1) / m : null, L(lang, 'k adalah nilai y. Ganti x dengan bilangan yang diketahui.', 'k is the y-value. Substitute the given x.')],
          [m * x - c - 1, L(lang, 'Tanda konstantanya terbalik.', 'The sign of the constant is flipped.')],
        ],
        [`k = ${M(lang, m)} × ${P(lang, x)} ${c + 1 < 0 ? '−' : '+'} ${Math.abs(c + 1)}`, `k = ${M(lang, m * x + c + 1)}`],
        { kind, m, c: c + 1, x },
      );
    }
    const axisX = rnd() < 0.6;
    const okT = axisX ? pt(lang, r, 0) : pt(lang, 0, c);
    return mc(
      L(lang, `Garis ${lineTxt(m, c)} memotong sumbu ${axisX ? 'x' : 'y'} di titik …`, `The line ${lineTxt(m, c)} crosses the ${axisX ? 'x' : 'y'}-axis at …`),
      okT,
      [
        [axisX ? pt(lang, 0, c) : pt(lang, r, 0), L(lang, axisX ? 'Itu titik potong sumbu y. Pada sumbu x, y = 0.' : 'Itu titik potong sumbu x. Pada sumbu y, x = 0.', axisX ? 'That is the y-intercept. On the x-axis, y = 0.' : 'That is the x-intercept. On the y-axis, x = 0.')],
        [axisX ? pt(lang, -r, 0) : pt(lang, 0, -c), L(lang, 'Tandanya terbalik.', 'The sign is flipped.')],
        [axisX ? pt(lang, c, 0) : pt(lang, c, 0), L(lang, 'Koordinat titik potong belum tepat. Ganti x = 0 atau y = 0.', 'The coordinates are not right. Substitute x = 0 or y = 0.')],
        [axisX ? pt(lang, 0, r) : pt(lang, 0, m), L(lang, 'Periksa lagi: titik pada sumbu x punya y = 0, titik pada sumbu y punya x = 0.', 'Check: a point on the x-axis has y = 0; a point on the y-axis has x = 0.')],
      ],
      axisX ? [L(lang, `Pada sumbu x, y = 0: 0 = ${ex([[m, 'x'], [c, '']])}.`, `On the x-axis, y = 0: 0 = ${ex([[m, 'x'], [c, '']])}.`), `x = ${M(lang, r)}  →  ${okT}`] : [L(lang, `Pada sumbu y, x = 0: y = ${M(lang, c)}.`, `On the y-axis, x = 0: y = ${M(lang, c)}.`), okT],
      { kind, m, c, axisX },
    );
  },
  (m, lang) => {
    if (m.kind === 0) return QUAD[m.x > 0 ? (m.y > 0 ? 0 : 3) : m.y > 0 ? 1 : 2];
    if (m.kind === 1) return D(m.m * m.x + m.c);
    return m.axisX ? pt(lang, -m.c / m.m, 0) : pt(lang, 0, m.c);
  },
);

const slope = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 1);
    if (kind === 0) {
      const x1 = ri(rnd, -5, 5);
      const y1 = ri(rnd, -6, 6);
      let dx = nz(rnd, -5, 6);
      const dy = nz(rnd, -9, 9);
      if (rnd() < 0.6) dx = pick(rnd, [1, 2, -1, -2, Math.abs(dy) > 1 ? dy : 2]);
      const x2 = x1 + dx;
      const y2 = y1 + dy;
      return num(
        L(lang, `Gradien garis yang melalui titik ${pt(lang, x1, y1)} dan ${pt(lang, x2, y2)} adalah … (boleh pecahan)`, `What is the gradient of the line through ${pt(lang, x1, y1)} and ${pt(lang, x2, y2)}? (a fraction is fine)`),
        F(dy, dx),
        [
          [F(dx, dy), L(lang, 'Gradien = perubahan y ÷ perubahan x, bukan sebaliknya.', 'Gradient = change in y ÷ change in x, not the other way round.')],
          [F(-dy, dx), L(lang, 'Urutan pengurangan y dan x harus sama.', 'Subtract the y-values and the x-values in the same order.')],
          [D(dy), L(lang, `Perubahan y masih harus dibagi perubahan x (${M(lang, dx)}).`, `The change in y must be divided by the change in x (${M(lang, dx)}).`)],
        ],
        [`m = (${M(lang, y2)} − ${P(lang, y1)}) ÷ (${M(lang, x2)} − ${P(lang, x1)})`, `= ${M(lang, dy)} ÷ ${P(lang, dx)} = ${FR(dy, dx)}`],
        { kind, x1, y1, x2, y2 },
      );
    }
    const a = pick(rnd, [1, 2, 3, 4]);
    const m = nz(rnd, -5, 5);
    const c = nz(rnd, -9, 9);
    const form = ri(rnd, 0, 1);
    // form 0: a·y = (a·m)x + c ; form 1: (a·m)x − a·y + c = 0 → y = m x + c/a
    const eq = form === 0 ? `${a === 1 ? '' : a}y = ${ex([[a * m, 'x'], [c, '']])}` : `${ex([[a * m, 'x'], [-a, 'y'], [c, '']])} = 0`;
    return mc(
      L(lang, `Gradien garis ${eq} adalah …`, `What is the gradient of the line ${eq}?`),
      M(lang, m),
      [
        [a !== 1 ? M(lang, a * m) : null, L(lang, `Ubah dulu ke bentuk y = mx + c: bagi dengan ${a}.`, `First write it as y = mx + c: divide by ${a}.`)],
        [M(lang, -m), L(lang, 'Tandanya terbalik saat menyusun ke bentuk y = mx + c.', 'The sign flipped while rearranging to y = mx + c.')],
        [Number.isInteger(c / a) ? M(lang, c / a) : FR(c, a), L(lang, 'Itu konstantanya (titik potong sumbu y), bukan gradien.', 'That is the constant (y-intercept), not the gradient.')],
        [FR(1, m), L(lang, 'Gradien adalah koefisien x setelah y sendirian di ruas kiri.', 'The gradient is the coefficient of x once y is alone on the left.')],
      ],
      [L(lang, `Ubah ke bentuk y = mx + c.`, 'Rewrite as y = mx + c.'), L(lang, `y = ${ex([[m, 'x']])} ${c / a < 0 ? '−' : '+'} ${Number.isInteger(c / a) ? Math.abs(c / a) : FR(Math.abs(c), a)}, jadi m = ${M(lang, m)}.`, `y = ${ex([[m, 'x']])} ${c / a < 0 ? '−' : '+'} ${Number.isInteger(c / a) ? Math.abs(c / a) : FR(Math.abs(c), a)}, so m = ${M(lang, m)}.`)],
      { kind, a, am: a * m, form },
    );
  },
  (m, lang) => (m.kind === 0 ? F(m.y2 - m.y1, m.x2 - m.x1) : M(lang, m.am / m.a)),
);

const lineEq = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const m = nz(rnd, -4, 5);
    const c = nz(rnd, -8, 8);
    if (kind === 2) {
      const perp = rnd() < 0.6;
      const p = nz(rnd, -5, 5);
      const q = pick(rnd, [1, 1, 2, 3]);
      const g = F(p, q);
      const ans = perp ? F(-q, p) : g;
      return num(
        L(lang, `Garis yang ${perp ? 'tegak lurus' : 'sejajar'} dengan garis bergradien ${FR(p, q)} memiliki gradien … (boleh pecahan)`, `A line ${perp ? 'perpendicular' : 'parallel'} to a line with gradient ${FR(p, q)} has gradient … (a fraction is fine)`),
        ans,
        perp
          ? [
              [F(q, p), L(lang, 'Gradien tegak lurus adalah lawan dari kebalikannya: tandanya juga berubah.', 'A perpendicular gradient is the negative reciprocal: the sign changes too.')],
              [F(-p, q), L(lang, 'Selain tandanya, gradiennya juga dibalik.', 'Besides changing the sign, flip the fraction too.')],
              [g, L(lang, 'Gradien sama berarti sejajar, bukan tegak lurus.', 'Equal gradients mean parallel, not perpendicular.')],
            ]
          : [
              [F(-q, p), L(lang, 'Itu gradien garis yang tegak lurus. Garis sejajar punya gradien sama.', 'That is the perpendicular gradient. Parallel lines have equal gradients.')],
              [F(-p, q), L(lang, 'Garis sejajar punya gradien yang sama persis, termasuk tandanya.', 'Parallel lines have exactly the same gradient, sign included.')],
            ],
        perp ? [L(lang, 'Dua garis tegak lurus: m₁ × m₂ = −1.', 'Perpendicular lines: m₁ × m₂ = −1.'), `m₂ = −1 ÷ ${P(lang, p / q) === M(lang, p / q) && q === 1 ? M(lang, p) : `(${FR(p, q)})`} = ${FR(-q, p)}`] : [L(lang, 'Garis sejajar punya gradien sama.', 'Parallel lines have the same gradient.'), `m = ${FR(p, q)}`],
        { kind, p, q, perp },
      );
    }
    let meta;
    let q;
    if (kind === 0) {
      const x1 = nz(rnd, -4, 5);
      const y1 = m * x1 + c;
      q = L(lang, `Persamaan garis yang melalui ${pt(lang, x1, y1)} dengan gradien ${M(lang, m)} adalah …`, `The equation of the line through ${pt(lang, x1, y1)} with gradient ${M(lang, m)} is …`);
      meta = { x1, y1, x2: x1 + 1, y2: y1 + m };
    } else {
      const x1 = ri(rnd, -3, 2);
      const x2 = x1 + ri(rnd, 1, 3);
      q = L(lang, `Persamaan garis yang melalui ${pt(lang, x1, m * x1 + c)} dan ${pt(lang, x2, m * x2 + c)} adalah …`, `The equation of the line through ${pt(lang, x1, m * x1 + c)} and ${pt(lang, x2, m * x2 + c)} is …`);
      meta = { x1, y1: m * x1 + c, x2, y2: m * x2 + c };
    }
    const { x1, y1 } = meta;
    return mc(
      q,
      lineTxt(m, c),
      [
        [lineTxt(m, y1 + m * x1), L(lang, 'Tanda saat memindahkan m·x₁ keliru. Pakai y − y₁ = m(x − x₁).', 'The sign of m·x₁ went wrong. Use y − y₁ = m(x − x₁).')],
        [lineTxt(m, y1), L(lang, `${M(lang, y1)} adalah nilai y di x = ${M(lang, x1)}, belum tentu titik potong sumbu y.`, `${M(lang, y1)} is the y-value at x = ${M(lang, x1)}, not necessarily the y-intercept.`)],
        [lineTxt(-m, c), L(lang, 'Tanda gradiennya terbalik.', 'The gradient has the wrong sign.')],
        [lineTxt(c, m), L(lang, 'Gradien dan konstantanya tertukar.', 'The gradient and the constant are swapped.')],
      ],
      [kind === 1 ? L(lang, `m = (${M(lang, meta.y2)} − ${P(lang, y1)}) ÷ (${meta.x2} − ${P(lang, x1)}) = ${M(lang, m)}.`, `m = (${M(lang, meta.y2)} − ${P(lang, y1)}) ÷ (${meta.x2} − ${P(lang, x1)}) = ${M(lang, m)}.`) : `y − ${P(lang, y1)} = ${M(lang, m)}(x − ${P(lang, x1)})`, L(lang, `c = ${M(lang, y1)} − ${P(lang, m)} × ${P(lang, x1)} = ${M(lang, c)}, jadi ${lineTxt(m, c)}.`, `c = ${M(lang, y1)} − ${P(lang, m)} × ${P(lang, x1)} = ${M(lang, c)}, so ${lineTxt(m, c)}.`)],
      { kind, ...meta },
    );
  },
  (m) => {
    if (m.kind === 2) return m.perp ? F(-m.q, m.p) : F(m.p, m.q);
    const g = (m.y2 - m.y1) / (m.x2 - m.x1);
    return lineTxt(g, m.y1 - g * m.x1);
  },
);

// ================= Bab 5: SPLDV =================
const spldvPair = withSolve(
  (rnd, lang) => {
    const x = ri(rnd, -3, 9);
    const y = ri(rnd, -3, 9);
    if (x === y) return spldvPair(rnd, lang);
    const a = pick(rnd, [1, 1, 2]);
    const e1 = `${ex([[a, 'x'], [1, 'y']])} = ${M(lang, a * x + y)}`;
    const e2 = `${ex([[1, 'x'], [-1, 'y']])} = ${M(lang, x - y)}`;
    const t = (p, q) => `x = ${M(lang, p)}, y = ${M(lang, q)}`;
    return mc(
      L(lang, `Penyelesaian dari ${e1} dan ${e2} adalah …`, `Solve ${e1} and ${e2}.`),
      t(x, y),
      [
        [t(y, x), L(lang, 'Nilai x dan y tertukar. Cek ke persamaan kedua.', 'x and y are swapped. Check with the second equation.')],
        [t(x + 1, a * x + y - a * (x + 1)), L(lang, 'Pasangan ini hanya memenuhi persamaan pertama.', 'This pair only satisfies the first equation.')],
        [t(x - y + (y + 1), y + 1), L(lang, 'Pasangan ini hanya memenuhi persamaan kedua.', 'This pair only satisfies the second equation.')],
      ],
      [a === 1 ? L(lang, `Jumlahkan kedua persamaan: 2x = ${M(lang, 2 * x)}, x = ${M(lang, x)}.`, `Add the equations: 2x = ${M(lang, 2 * x)}, x = ${M(lang, x)}.`) : L(lang, `Jumlahkan kedua persamaan: 3x = ${M(lang, 3 * x)}, x = ${M(lang, x)}.`, `Add the equations: 3x = ${M(lang, 3 * x)}, x = ${M(lang, x)}.`), L(lang, `Substitusi: y = ${M(lang, x)} − ${P(lang, x - y)} = ${M(lang, y)}.`, `Substitute: y = ${M(lang, x)} − ${P(lang, x - y)} = ${M(lang, y)}.`)],
      { a, s: a * x + y, d: x - y },
    );
  },
  (m, lang) => {
    const x = (m.s + m.d) / (m.a + 1);
    return `x = ${M(lang, x)}, y = ${M(lang, x - m.d)}`;
  },
);

const spldvSub = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 2) {
      const k = ri(rnd, 2, 5);
      const andi = ri(rnd, 6, 15);
      const nm = pick(rnd, NAMES);
      const rel = pick(rnd, [['ayah', 'father'], ['ibu', 'mother'], ['paman', 'uncle']]);
      return num(
        L(lang, `Umur ${rel[0]} ${k} kali umur ${nm}. Jumlah umur mereka ${(k + 1) * andi} tahun. Umur ${nm} adalah … tahun`, `${nm}'s ${rel[1]} is ${k} times as old as ${nm}. Their ages add up to ${(k + 1) * andi} years. How old is ${nm}?`),
        andi,
        [
          [k * andi, L(lang, `Itu umur ${rel[0]}.`, `That is the ${rel[1]}'s age.`)],
          [Number.isInteger(((k + 1) * andi) / k) ? ((k + 1) * andi) / k : null, L(lang, `Misalkan umur ${nm} = a, maka a + ${k}a = ${k + 1}a.`, `Let ${nm}'s age be a; then a + ${k}a = ${k + 1}a.`)],
        ],
        [L(lang, `Misalkan umur ${nm} a, umur ${rel[0]} ${k}a.`, `Let ${nm}'s age be a; the ${rel[1]}'s age is ${k}a.`), `a + ${k}a = ${(k + 1) * andi}  →  a = ${andi}`],
        { kind, k, S: (k + 1) * andi },
      );
    }
    const x = nz(rnd, -4, 9);
    const k = pick(rnd, [2, 3, 4, -2, -1]);
    if (kind === 0) {
      const y = k * x;
      let b = ri(rnd, 1, 3);
      if (b + k === 0) b++;
      const S = b * x + y;
      const askY = rnd() < 0.5;
      return num(
        L(lang, `Diketahui y = ${ex([[k, 'x']])} dan ${ex([[b, 'x'], [1, 'y']])} = ${M(lang, S)}. Nilai ${askY ? 'y' : 'x'} adalah …`, `Given y = ${ex([[k, 'x']])} and ${ex([[b, 'x'], [1, 'y']])} = ${M(lang, S)}. Find ${askY ? 'y' : 'x'}.`),
        askY ? y : x,
        [[askY ? x : y, L(lang, askY ? 'Itu nilai x.' : 'Itu nilai y.', askY ? 'That is x.' : 'That is y.')], [Number.isInteger(S / (b + 1)) ? S / (b + 1) : null, L(lang, `y diganti ${ex([[k, 'x']])}, bukan x.`, `Replace y with ${ex([[k, 'x']])}, not with x.`)]],
        [L(lang, `Substitusi y = ${ex([[k, 'x']])}: ${ex([[b, 'x']])} + (${ex([[k, 'x']])}) = ${M(lang, S)}, jadi ${ex([[b + k, 'x']])} = ${M(lang, S)}.`, `Substitute y = ${ex([[k, 'x']])}: ${ex([[b, 'x']])} + (${ex([[k, 'x']])}) = ${M(lang, S)}, so ${ex([[b + k, 'x']])} = ${M(lang, S)}.`), `x = ${M(lang, x)}, y = ${M(lang, y)}`],
        { kind, k, b, S, askY },
      );
    }
    let y = nz(rnd, -5, 8);
    if (y === x) y = x + 2;
    const a = ri(rnd, 2, 4);
    const S = x + y;
    const T = a * x - y;
    return num(
      L(lang, `Diketahui ${ex([[1, 'x'], [1, 'y']])} = ${M(lang, S)} dan ${ex([[a, 'x'], [-1, 'y']])} = ${M(lang, T)}. Nilai x adalah …`, `Given x + y = ${M(lang, S)} and ${ex([[a, 'x'], [-1, 'y']])} = ${M(lang, T)}. Find x.`),
      x,
      [[y, L(lang, 'Itu nilai y.', 'That is y.')], [Number.isInteger((T + S) / a) ? (T + S) / a : null, L(lang, `Setelah kurung dibuka, ${a}x + x = ${a + 1}x.`, `After expanding, ${a}x + x = ${a + 1}x.`)], [Number.isInteger((T - S) / (a - 1)) && a !== 2 ? (T - S) / (a - 1) : null, L(lang, `Dari x + y = ${M(lang, S)}, y = ${M(lang, S)} − x. Tanda saat substitusi harus diperhatikan.`, `From x + y = ${M(lang, S)}, y = ${M(lang, S)} − x. Watch the signs when substituting.`)]],
      [L(lang, `Dari persamaan pertama: y = ${M(lang, S)} − x.`, `From the first equation: y = ${M(lang, S)} − x.`), `${a}x − (${M(lang, S)} − x) = ${M(lang, T)}  →  ${a + 1}x = ${M(lang, T + S)}  →  x = ${M(lang, x)}`],
      { kind, a, S, T },
    );
  },
  (m) => {
    if (m.kind === 2) return D(m.S / (m.k + 1));
    if (m.kind === 0) {
      const x = m.S / (m.b + m.k);
      return D(m.askY ? m.k * x : x);
    }
    return D((m.S + m.T) / (m.a + 1));
  },
);

const spldvElim = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0) {
      const x = nz(rnd, -5, 9);
      const y = nz(rnd, -5, 9);
      let a1 = ri(rnd, 1, 5);
      let b1 = ri(rnd, 1, 5);
      let a2 = ri(rnd, 1, 5);
      let b2 = ri(rnd, 1, 5);
      while (a1 * b2 === a2 * b1) b2 = ri(rnd, 1, 5);
      const askY = rnd() < 0.5;
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x + b2 * y;
      return num(
        L(lang, `Diketahui ${ex([[a1, 'x'], [b1, 'y']])} = ${M(lang, c1)} dan ${ex([[a2, 'x'], [b2, 'y']])} = ${M(lang, c2)}. Nilai ${askY ? 'y' : 'x'} adalah …`, `Given ${ex([[a1, 'x'], [b1, 'y']])} = ${M(lang, c1)} and ${ex([[a2, 'x'], [b2, 'y']])} = ${M(lang, c2)}. Find ${askY ? 'y' : 'x'}.`),
        askY ? y : x,
        [[askY ? x : y, L(lang, askY ? 'Itu nilai x.' : 'Itu nilai y.', askY ? 'That is x.' : 'That is y.')], [-(askY ? y : x), L(lang, 'Tandanya terbalik. Cek ke salah satu persamaan.', 'The sign is flipped. Check with one of the equations.')]],
        [L(lang, `Samakan koefisien ${askY ? 'x' : 'y'}, lalu kurangkan kedua persamaan.`, `Make the ${askY ? 'x' : 'y'} coefficients equal, then subtract the equations.`), `x = ${M(lang, x)}, y = ${M(lang, y)}`],
        { kind, a1, b1, c1, a2, b2, c2, askY },
      );
    }
    if (kind === 1) {
      const u = pick(rnd, [3, 4, 5, 6, 8, 10, 12, 15]) * 1000;
      let v = pick(rnd, [2, 3, 4, 5, 6, 8, 10, 12]) * 1000;
      while (v === u) v = pick(rnd, [2, 3, 4, 5, 6, 8, 10, 12]) * 1000;
      const it = pick(rnd, [['kg gula', 'kg beras', 'kg of sugar', 'kg of rice'], ['buku', 'pensil', 'book', 'pencil'], ['tas', 'topi', 'bag', 'hat']]);
      const en = (n, w) => (n === 1 || w.startsWith('kg') ? w : w + 's');
      const p = ri(rnd, 1, 3);
      const q = ri(rnd, 1, 3);
      let r = ri(rnd, 1, 3);
      let s = ri(rnd, 1, 3);
      while (p * s === q * r) s = ri(rnd, 1, 4);
      const askV = rnd() < 0.5;
      const t1 = p * u + q * v;
      const t2 = r * u + s * v;
      return num(
        L(lang, `Harga ${p} ${it[0]} dan ${q} ${it[1]} adalah ${rpL(lang, t1)}. Harga ${r} ${it[0]} dan ${s} ${it[1]} adalah ${rpL(lang, t2)}. Harga 1 ${askV ? it[1] : it[0]} adalah Rp …`, `${p} ${en(p, it[2])} and ${q} ${en(q, it[3])} cost ${rpL(lang, t1)}. ${r} ${en(r, it[2])} and ${s} ${en(s, it[3])} cost ${rpL(lang, t2)}. How much does 1 ${askV ? it[3] : it[2]} cost, in Rp?`),
        askV ? v : u,
        [[askV ? u : v, L(lang, `Itu harga 1 ${askV ? it[0] : it[1]}.`, `That is the price of the other item.`)]],
        [L(lang, `Misalkan x = harga 1 ${it[0]}, y = harga 1 ${it[1]}: ${ex([[p, 'x'], [q, 'y']])} = ${G(lang, t1)}, ${ex([[r, 'x'], [s, 'y']])} = ${G(lang, t2)}.`, `Let x = price of 1 ${it[2]}, y = price of 1 ${it[3]}: ${ex([[p, 'x'], [q, 'y']])} = ${G(lang, t1)}, ${ex([[r, 'x'], [s, 'y']])} = ${G(lang, t2)}.`), L(lang, `Dengan eliminasi: x = ${G(lang, u)}, y = ${G(lang, v)}.`, `By elimination: x = ${G(lang, u)}, y = ${G(lang, v)}.`)],
        { kind, a1: p, b1: q, c1: t1, a2: r, b2: s, c2: t2, askY: askV },
      );
    }
    if (kind === 2) {
      const mobil = ri(rnd, 3, 20);
      const motor = ri(rnd, 3, 25);
      return num(
        L(lang, `Di tempat parkir ada ${mobil + motor} kendaraan terdiri dari mobil (4 roda) dan motor (2 roda). Jumlah roda ${4 * mobil + 2 * motor}. Banyak mobil adalah …`, `A car park has ${mobil + motor} vehicles: cars (4 wheels) and motorbikes (2 wheels). There are ${4 * mobil + 2 * motor} wheels. How many cars are there?`),
        mobil,
        [[motor, L(lang, 'Itu banyak motor.', 'That is the number of motorbikes.')], [Number.isInteger((4 * mobil + 2 * motor) / 4) ? (4 * mobil + 2 * motor) / 4 : null, L(lang, 'Roda motor juga ikut terhitung. Pakai dua persamaan.', 'The motorbike wheels count too. Use two equations.')]],
        [`x + y = ${mobil + motor}, 4x + 2y = ${4 * mobil + 2 * motor}`, L(lang, `Kurangi 2 × persamaan pertama: 2x = ${2 * mobil}, x = ${mobil}.`, `Subtract 2 × the first equation: 2x = ${2 * mobil}, x = ${mobil}.`)],
        { kind, a1: 1, b1: 1, c1: mobil + motor, a2: 4, b2: 2, c2: 4 * mobil + 2 * motor, askY: false },
      );
    }
    const l = ri(rnd, 3, 15);
    const d = ri(rnd, 1, 8);
    const p = l + d;
    const K = 2 * (p + l);
    const askP = rnd() < 0.5;
    return num(
      L(lang, `Keliling persegi panjang ${K} cm. Panjangnya ${d} cm lebih dari lebarnya. ${askP ? 'Panjang' : 'Lebar'} persegi panjang itu adalah … cm`, `A rectangle has perimeter ${K} cm. Its length is ${d} cm more than its width. What is its ${askP ? 'length' : 'width'} in cm?`),
      askP ? p : l,
      [[askP ? l : p, L(lang, askP ? 'Itu lebarnya.' : 'Itu panjangnya.', askP ? 'That is the width.' : 'That is the length.')], [K / 2 - d, L(lang, 'Keliling dibagi 2 dulu (p + l), baru dikurangi selisihnya lalu dibagi 2.', 'Halve the perimeter (p + l), then subtract the difference and halve again.')]],
      [`p + l = ${K / 2}, p − l = ${d}`, `p = ${p}, l = ${l}`],
      { kind, a1: 1, b1: 1, c1: K / 2, a2: 1, b2: -1, c2: d, askY: !askP },
    );
  },
  (m) => {
    const det = m.a1 * m.b2 - m.a2 * m.b1;
    const x = (m.c1 * m.b2 - m.c2 * m.b1) / det;
    const y = (m.a1 * m.c2 - m.a2 * m.c1) / det;
    return D(m.askY ? y : x);
  },
);
const rpL = (lang, x) => 'Rp' + G(lang, x);

// ================= Bab 6: Bangun Ruang Sisi Datar =================
const cubeArea = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0) {
      const s = ri(rnd, 2, 15);
      return num(
        L(lang, `Luas permukaan kubus dengan rusuk ${s} cm adalah … cm²`, `What is the surface area of a cube with edge ${s} cm, in cm²?`),
        6 * s * s,
        [[s * s * s, L(lang, 'Itu volumenya. Luas permukaan = 6 × s².', 'That is the volume. Surface area = 6 × s².')], [4 * s * s, L(lang, 'Kubus punya 6 sisi, bukan 4.', 'A cube has 6 faces, not 4.')], [s * s, L(lang, 'Itu luas satu sisi saja.', 'That is just one face.')]],
        [L(lang, 'Kubus punya 6 sisi persegi yang sama.', 'A cube has 6 equal square faces.'), `6 × ${s}² = 6 × ${s * s} = ${6 * s * s}`],
        { kind, s },
      );
    }
    if (kind === 1) {
      const p = ri(rnd, 3, 15);
      const l = ri(rnd, 2, 12);
      const t = ri(rnd, 2, 10);
      return num(
        L(lang, `Luas permukaan balok berukuran ${p} cm × ${l} cm × ${t} cm adalah … cm²`, `What is the surface area of a ${p} cm × ${l} cm × ${t} cm cuboid, in cm²?`),
        2 * (p * l + p * t + l * t),
        [[p * l * t, L(lang, 'Itu volumenya.', 'That is the volume.')], [p * l + p * t + l * t, L(lang, 'Setiap pasang sisi ada dua, jadi dikali 2.', 'Each pair of faces appears twice, so multiply by 2.')]],
        [L(lang, 'L = 2(pl + pt + lt)', 'SA = 2(lw + lh + wh)'), `2(${p * l} + ${p * t} + ${l * t}) = ${2 * (p * l + p * t + l * t)}`],
        { kind, p, l, t },
      );
    }
    if (kind === 2) {
      const s = ri(rnd, 2, 12);
      return num(
        L(lang, `Luas permukaan sebuah kubus ${6 * s * s} cm². Panjang rusuknya adalah … cm`, `A cube has surface area ${6 * s * s} cm². How long is each edge, in cm?`),
        s,
        [[s * s, L(lang, 'Itu luas satu sisi. Ambil akarnya.', 'That is one face. Take its square root.')], [Number.isInteger(6 * s * s / 6 / 2) ? (s * s) / 2 : null, L(lang, 'Luas satu sisi = luas permukaan ÷ 6, lalu diakarkan.', 'One face = surface area ÷ 6, then take the square root.')]],
        [`${6 * s * s} ÷ 6 = ${s * s}`, `√${s * s} = ${s}`],
        { kind, A: 6 * s * s },
      );
    }
    const s = ri(rnd, 4, 20);
    return num(
      L(lang, `Kotak kado tanpa tutup berbentuk kubus dengan rusuk ${s} cm. Kertas yang dibutuhkan untuk melapisi bagian luarnya adalah … cm²`, `A gift box without a lid is a cube with edge ${s} cm. How much paper is needed to cover the outside, in cm²?`),
      5 * s * s,
      [[6 * s * s, L(lang, 'Kotaknya tanpa tutup, jadi hanya 5 sisi.', 'There is no lid, so only 5 faces.')], [4 * s * s, L(lang, 'Alasnya juga dilapisi.', 'The base is covered too.')]],
      [L(lang, 'Tanpa tutup: 5 sisi persegi.', 'No lid: 5 square faces.'), `5 × ${s * s} = ${5 * s * s}`],
      { kind, s },
    );
  },
  (m) => D(m.kind === 0 ? 6 * m.s ** 2 : m.kind === 1 ? 2 * (m.p * m.l + m.p * m.t + m.l * m.t) : m.kind === 2 ? Math.sqrt(m.A / 6) : 5 * m.s ** 2),
);

const cubeVol = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0) {
      const s = ri(rnd, 2, 15);
      return num(
        L(lang, `Volume kubus dengan rusuk ${s} cm adalah … cm³`, `What is the volume of a cube with edge ${s} cm, in cm³?`),
        s ** 3,
        [[6 * s * s, L(lang, 'Itu luas permukaannya.', 'That is the surface area.')], [3 * s, L(lang, 's³ artinya s × s × s, bukan 3 × s.', 's³ means s × s × s, not 3 × s.')], [s * s, L(lang, 'Itu s², bukan s³.', 'That is s², not s³.')]],
        [L(lang, 'V = s × s × s', 'V = s × s × s'), `${s} × ${s} × ${s} = ${s ** 3}`],
        { kind, s },
      );
    }
    if (kind === 1) {
      const p = ri(rnd, 3, 20);
      const l = ri(rnd, 2, 12);
      const t = ri(rnd, 2, 12);
      return num(
        L(lang, `Volume balok berukuran ${p} cm × ${l} cm × ${t} cm adalah … cm³`, `What is the volume of a ${p} cm × ${l} cm × ${t} cm cuboid, in cm³?`),
        p * l * t,
        [[p + l + t, L(lang, 'Ukurannya dikalikan, bukan dijumlahkan.', 'Multiply the dimensions, do not add them.')], [2 * (p * l + p * t + l * t), L(lang, 'Itu luas permukaannya.', 'That is the surface area.')]],
        [L(lang, 'V = p × l × t', 'V = l × w × h'), `${p} × ${l} × ${t} = ${p * l * t}`],
        { kind, p, l, t },
      );
    }
    if (kind === 2) {
      const p = pick(rnd, [40, 50, 60, 80, 100, 120]);
      const l = pick(rnd, [30, 40, 50, 60]);
      const t = pick(rnd, [25, 40, 50, 60, 70]);
      return num(
        L(lang, `Bak mandi berbentuk balok berukuran ${p} cm × ${l} cm × ${t} cm. Volume air saat penuh adalah … liter`, `A bath tub is a cuboid ${p} cm × ${l} cm × ${t} cm. How many litres does it hold when full?`),
        (p * l * t) / 1000,
        [[p * l * t, L(lang, 'Itu dalam cm³. 1 liter = 1.000 cm³.', 'That is in cm³. 1 litre = 1,000 cm³.')], [(p * l * t) / 100, L(lang, '1 liter = 1.000 cm³, bukan 100 cm³.', '1 litre = 1,000 cm³, not 100 cm³.')]],
        [`${p} × ${l} × ${t} = ${G(lang, p * l * t)} cm³`, L(lang, `${G(lang, p * l * t)} ÷ 1.000 = ${M(lang, (p * l * t) / 1000)} liter`, `${G(lang, p * l * t)} ÷ 1,000 = ${M(lang, (p * l * t) / 1000)} litres`)],
        { kind, p, l, t },
      );
    }
    const s = ri(rnd, 2, 12);
    return num(
      L(lang, `Volume sebuah kubus ${s ** 3} cm³. Panjang rusuknya adalah … cm`, `A cube has volume ${s ** 3} cm³. How long is each edge, in cm?`),
      s,
      [[Number.isInteger(s ** 3 / 3) ? s ** 3 / 3 : null, L(lang, 'Rusuk dicari dengan akar pangkat tiga, bukan dibagi 3.', 'Find the edge with a cube root, not by dividing by 3.')], [s * s, L(lang, 'Cari bilangan yang jika dipangkat tiga hasilnya sama.', 'Find the number that cubes to the volume.')]],
      [`${s} × ${s} × ${s} = ${s ** 3}`, L(lang, `Jadi rusuknya ${s} cm.`, `So the edge is ${s} cm.`)],
      { kind, V: s ** 3 },
    );
  },
  (m) => D(m.kind === 0 ? m.s ** 3 : m.kind === 1 ? m.p * m.l * m.t : m.kind === 2 ? (m.p * m.l * m.t) / 1000 : Math.round(Math.cbrt(m.V))),
);

const prism = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const [a, b, c] = triple(rnd, 30);
    const t = ri(rnd, 4, 20);
    const La = (a * b) / 2;
    if (kind === 0)
      return num(
        L(lang, `Prisma dengan alas segitiga siku-siku bersisi siku-siku ${a} cm dan ${b} cm, tinggi prisma ${t} cm. Volumenya … cm³`, `A prism has a right-triangle base with legs ${a} cm and ${b} cm, and the prism is ${t} cm tall. What is its volume in cm³?`),
        La * t,
        [[a * b * t, L(lang, 'Luas alas segitiga = ½ × alas × tinggi. Jangan lupa ½.', 'Triangle base area = ½ × base × height. Remember the ½.')], [Number.isInteger(La * t / 3) ? (La * t) / 3 : null, L(lang, 'Itu rumus limas. Volume prisma = luas alas × tinggi.', 'That is the pyramid formula. Prism volume = base area × height.')]],
        [L(lang, `Luas alas = ½ × ${a} × ${b} = ${La} cm².`, `Base area = ½ × ${a} × ${b} = ${La} cm².`), `V = ${La} × ${t} = ${La * t}`],
        { kind, a, b, t },
      );
    if (kind === 1) {
      const Lp = 2 * La + (a + b + c) * t;
      return num(
        L(lang, `Prisma dengan alas segitiga siku-siku bersisi ${a} cm, ${b} cm, dan ${c} cm, tinggi prisma ${t} cm. Luas permukaannya … cm²`, `A prism has a right-triangle base with sides ${a} cm, ${b} cm, and ${c} cm, and the prism is ${t} cm tall. What is its surface area in cm²?`),
        Lp,
        [[La + (a + b + c) * t, L(lang, 'Ada dua alas (atas dan bawah).', 'There are two bases (top and bottom).')], [La * t, L(lang, 'Itu volumenya.', 'That is the volume.')], [(a + b + c) * t, L(lang, 'Itu luas sisi tegak saja. Tambahkan 2 × luas alas.', 'That is only the side faces. Add 2 × the base area.')]],
        [L(lang, `2 × luas alas = 2 × ${La} = ${2 * La}. Luas sisi tegak = keliling alas × tinggi = ${a + b + c} × ${t} = ${(a + b + c) * t}.`, `2 × base area = 2 × ${La} = ${2 * La}. Side faces = base perimeter × height = ${a + b + c} × ${t} = ${(a + b + c) * t}.`), `${2 * La} + ${(a + b + c) * t} = ${Lp}`],
        { kind, a, b, c, t },
      );
    }
    const A = pick(rnd, [12, 15, 20, 24, 25, 30, 36, 40, 48]);
    return num(
      L(lang, `Volume prisma ${A * t} cm³ dan luas alasnya ${A} cm². Tinggi prisma adalah … cm`, `A prism has volume ${A * t} cm³ and base area ${A} cm². How tall is it, in cm?`),
      t,
      [[3 * t, L(lang, 'Itu rumus limas. Pada prisma, tinggi = volume ÷ luas alas.', 'That is the pyramid formula. For a prism, height = volume ÷ base area.')], [A * t - A, L(lang, 'Volume dibagi luas alas, bukan dikurangi.', 'Divide the volume by the base area, do not subtract.')]],
      [L(lang, 'V = luas alas × tinggi', 'V = base area × height'), `t = ${A * t} ÷ ${A} = ${t}`],
      { kind, V: A * t, A },
    );
  },
  (m) => D(m.kind === 0 ? 0.5 * m.a * m.b * m.t : m.kind === 1 ? m.a * m.b + (m.a + m.b + m.c) * m.t : m.V / m.A),
);

const pyramid = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0) {
      const s = ri(rnd, 3, 15);
      let t = ri(rnd, 3, 18);
      while ((s * s * t) % 3) t++;
      return num(
        L(lang, `Volume limas dengan alas persegi bersisi ${s} cm dan tinggi ${t} cm adalah … cm³`, `What is the volume of a pyramid with a square base of side ${s} cm and height ${t} cm, in cm³?`),
        (s * s * t) / 3,
        [[s * s * t, L(lang, 'Volume limas = ⅓ × luas alas × tinggi. Jangan lupa ⅓.', 'Pyramid volume = ⅓ × base area × height. Remember the ⅓.')], [(s * s * t) / 2, L(lang, 'Pengalinya ⅓, bukan ½.', 'The factor is ⅓, not ½.')]],
        [L(lang, `Luas alas = ${s}² = ${s * s} cm².`, `Base area = ${s}² = ${s * s} cm².`), `V = ⅓ × ${s * s} × ${t} = ${(s * s * t) / 3}`],
        { kind, s, t },
      );
    }
    if (kind === 1) {
      const s = ri(rnd, 4, 16);
      const h = ri(rnd, 3, 15);
      return num(
        L(lang, `Limas alas persegi bersisi ${s} cm. Tinggi segitiga tegaknya ${h} cm. Luas permukaan limas … cm²`, `A pyramid has a square base of side ${s} cm. Each triangular face has height ${h} cm. What is its surface area in cm²?`),
        s * s + 2 * s * h,
        [[s * s + 4 * s * h, L(lang, 'Luas satu segitiga = ½ × alas × tinggi.', 'One triangle = ½ × base × height.')], [2 * s * h, L(lang, 'Luas alas belum ditambahkan.', 'The base area is missing.')], [s * s + s * h, L(lang, 'Ada 4 segitiga tegak.', 'There are 4 triangular faces.')]],
        [L(lang, `Alas = ${s * s}. Satu segitiga = ½ × ${s} × ${h} = ${(s * h) / 2}.`, `Base = ${s * s}. One triangle = ½ × ${s} × ${h} = ${(s * h) / 2}.`), `${s * s} + 4 × ${(s * h) / 2} = ${s * s + 2 * s * h}`],
        { kind, s, h },
      );
    }
    if (kind === 2) {
      const A = pick(rnd, [20, 25, 30, 36, 40, 45, 50, 60, 64, 81, 100]);
      const t = ri(rnd, 3, 18);
      let V = (A * t) / 3;
      if (!Number.isInteger(V)) return pyramid(rnd, lang);
      return num(
        L(lang, `Volume limas ${V} cm³ dan luas alasnya ${A} cm². Tinggi limas adalah … cm`, `A pyramid has volume ${V} cm³ and base area ${A} cm². How tall is it, in cm?`),
        t,
        [[Number.isInteger(V / A) ? V / A : null, L(lang, 'Ingat ⅓ pada rumus: t = 3 × V ÷ luas alas.', 'Remember the ⅓: h = 3 × V ÷ base area.')], [3 * V, L(lang, 'Masih harus dibagi luas alas.', 'It still needs dividing by the base area.')]],
        [`${V} = ⅓ × ${A} × t`, `t = 3 × ${V} ÷ ${A} = ${t}`],
        { kind, V, A },
      );
    }
    const Vp = pick(rnd, [90, 120, 150, 180, 210, 240, 270, 300, 360, 450, 600]);
    const toPyr = rnd() < 0.6;
    return num(
      toPyr
        ? L(lang, `Sebuah prisma dan limas memiliki alas dan tinggi yang sama. Volume prisma ${Vp} cm³. Volume limas adalah … cm³`, `A prism and a pyramid have the same base and height. The prism's volume is ${Vp} cm³. What is the pyramid's volume, in cm³?`)
        : L(lang, `Sebuah prisma dan limas memiliki alas dan tinggi yang sama. Volume limas ${Vp / 3} cm³. Volume prisma adalah … cm³`, `A prism and a pyramid have the same base and height. The pyramid's volume is ${Vp / 3} cm³. What is the prism's volume, in cm³?`),
      toPyr ? Vp / 3 : Vp,
      [[toPyr ? 3 * Vp : Vp / 9, L(lang, 'Volume limas sepertiga volume prisma, bukan tiga kali.', 'The pyramid is one third of the prism, not three times.')], [toPyr ? Vp / 2 : (2 * Vp) / 3, L(lang, 'Perbandingannya 1 : 3, bukan 1 : 2.', 'The ratio is 1 : 3, not 1 : 2.')]],
      [L(lang, 'V limas = ⅓ × V prisma (alas dan tinggi sama).', 'Pyramid volume = ⅓ × prism volume (same base and height).'), toPyr ? `⅓ × ${Vp} = ${Vp / 3}` : `3 × ${Vp / 3} = ${Vp}`],
      { kind, Vp, toPyr },
    );
  },
  (m) => {
    if (m.kind === 0) return D((m.s ** 2 * m.t) / 3);
    if (m.kind === 1) return D(m.s ** 2 + 4 * 0.5 * m.s * m.h);
    if (m.kind === 2) return D((3 * m.V) / m.A);
    return D(m.toPyr ? m.Vp / 3 : m.Vp);
  },
);

// ================= Bab 7: Statistika =================
const freqStats = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 3) {
      const n1 = ri(rnd, 10, 25);
      let n2 = ri(rnd, 10, 25);
      if (n2 === n1) n2 += 5;
      const m1 = ri(rnd, 60, 85);
      let m2 = ri(rnd, 60, 90);
      let tries = 0;
      while ((m2 === m1 || ((n1 * m1 + n2 * m2) * 10) % (n1 + n2) !== 0) && tries++ < 60) m2 = ri(rnd, 60, 90);
      if (m2 === m1 || ((n1 * m1 + n2 * m2) * 10) % (n1 + n2) !== 0) return freqStats(rnd, lang);
      const mean = (n1 * m1 + n2 * m2) / (n1 + n2);
      return num(
        L(lang, `Rata-rata nilai ${n1} siswa putra ${m1} dan rata-rata ${n2} siswa putri ${m2}. Rata-rata nilai seluruh siswa adalah …`, `The mean score of ${n1} boys is ${m1} and the mean of ${n2} girls is ${m2}. What is the mean score of all the students?`),
        mean,
        [[(m1 + m2) / 2, L(lang, 'Banyak siswanya berbeda, jadi tidak cukup merata-ratakan dua rata-rata. Pakai jumlah nilai.', 'The groups are different sizes, so averaging the two means is not enough. Use the totals.')]],
        [L(lang, `Jumlah nilai = ${n1} × ${m1} + ${n2} × ${m2} = ${n1 * m1 + n2 * m2}.`, `Total = ${n1} × ${m1} + ${n2} × ${m2} = ${n1 * m1 + n2 * m2}.`), `${n1 * m1 + n2 * m2} ÷ ${n1 + n2} = ${M(lang, mean)}`],
        { kind, n1, m1, n2, m2 },
      );
    }
    const v0 = pick(rnd, [5, 6, 36]);
    const vals = [v0, v0 + 1, v0 + 2, v0 + 3];
    let f;
    let tries = 0;
    do {
      f = vals.map(() => ri(rnd, 1, 9));
    } while (tries++ < 200 && ((kind === 0 && (sum(vals.map((v, i) => v * f[i])) * 10) % sum(f) !== 0) || (kind === 1 && f.filter((x) => x === Math.max(...f)).length > 1)));
    if (kind === 0 && (sum(vals.map((v, i) => v * f[i])) * 10) % sum(f) !== 0) return freqStats(rnd, lang);
    if (kind === 1 && f.filter((x) => x === Math.max(...f)).length > 1) return freqStats(rnd, lang);
    const tbl = vals.map((v, i) => `${v} (${f[i]})`).join(', ');
    const n = sum(f);
    const what = v0 > 30 ? L(lang, 'ukuran sepatu', 'shoe size') : L(lang, 'nilai', 'score');
    const qHead = L(lang, `Tabel frekuensi ${what} (frekuensi dalam kurung): ${tbl}.`, `A frequency table of ${what}s (frequency in brackets): ${tbl}.`);
    if (kind === 0) {
      const S = sum(vals.map((v, i) => v * f[i]));
      return num(
        `${qHead} ${L(lang, 'Rata-ratanya adalah …', 'What is the mean?')}`,
        S / n,
        [[sum(vals) / 4, L(lang, 'Setiap nilai harus dikalikan frekuensinya dulu.', 'Multiply each value by its frequency first.')], [S, L(lang, 'Itu jumlah nilainya. Bagi dengan banyak data.', 'That is the total. Divide by the number of data.')]],
        [L(lang, `Σ(nilai × frekuensi) = ${S}, banyak data = ${n}.`, `Σ(value × frequency) = ${S}, number of data = ${n}.`), `${S} ÷ ${n} = ${M(lang, S / n)}`],
        { kind, vals, f },
      );
    }
    if (kind === 1) {
      const mo = vals[f.indexOf(Math.max(...f))];
      return num(
        `${qHead} ${L(lang, 'Modusnya adalah …', 'What is the mode?')}`,
        mo,
        [[Math.max(...f), L(lang, 'Itu frekuensinya. Modus adalah nilai dengan frekuensi terbesar.', 'That is the frequency. The mode is the value with the highest frequency.')]],
        [L(lang, `Frekuensi terbesar ${Math.max(...f)}.`, `The highest frequency is ${Math.max(...f)}.`), L(lang, `Modus = ${mo}.`, `Mode = ${mo}.`)],
        { kind, vals, f },
      );
    }
    const med = medianF(vals, f);
    return num(
      `${qHead} ${L(lang, 'Mediannya adalah …', 'What is the median?')}`,
      med,
      [[(vals[1] + vals[2]) / 2 === med ? null : (vals[1] + vals[2]) / 2, L(lang, 'Median dicari dari data yang diurutkan lengkap dengan frekuensinya, bukan dari daftar nilainya saja.', 'Find the median from the full ordered data (with frequencies), not just the list of values.')], [f[Math.floor(f.length / 2)], L(lang, 'Itu frekuensi, bukan nilai data.', 'That is a frequency, not a data value.')]],
      [L(lang, `Banyak data ${n}. Median ada di data ke-${n % 2 ? (n + 1) / 2 : `${n / 2} dan ${n / 2 + 1}`}.`, `There are ${n} data. The median is at position ${n % 2 ? (n + 1) / 2 : `${n / 2} and ${n / 2 + 1}`}.`), L(lang, `Median = ${M(lang, med)}.`, `Median = ${M(lang, med)}.`)],
      { kind, vals, f },
    );
  },
  (m) => {
    if (m.kind === 3) return D((m.n1 * m.m1 + m.n2 * m.m2) / (m.n1 + m.n2));
    if (m.kind === 0) return D(m.vals.reduce((s, v, i) => s + v * m.f[i], 0) / m.f.reduce((s, x) => s + x, 0));
    if (m.kind === 1) {
      let k = 0;
      m.f.forEach((x, i) => (x > m.f[k] ? (k = i) : 0));
      return D(m.vals[k]);
    }
    const all = [];
    m.vals.forEach((v, i) => {
      for (let j = 0; j < m.f[i]; j++) all.push(v);
    });
    const n = all.length;
    return D(n % 2 ? all[(n - 1) / 2] : (all[n / 2 - 1] + all[n / 2]) / 2);
  },
);
function medianF(vals, f) {
  const all = [];
  vals.forEach((v, i) => {
    for (let j = 0; j < f[i]; j++) all.push(v);
  });
  const n = all.length;
  return n % 2 ? all[(n - 1) / 2] : (all[n / 2 - 1] + all[n / 2]) / 2;
}

const quartile = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const n = kind === 0 ? ri(rnd, 5, 8) : pick(rnd, [7, 11]);
    const set = new Set();
    while (set.size < n) set.add(ri(rnd, 1, 40));
    const xs = [...set];
    const s = xs.slice().sort((a, b) => a - b);
    if (kind === 0)
      return num(
        L(lang, `Jangkauan dari data ${xs.join(', ')} adalah …`, `What is the range of ${xs.join(', ')}?`),
        s[n - 1] - s[0],
        [[xs[xs.length - 1] - xs[0], L(lang, 'Jangkauan = data terbesar − data terkecil, bukan data terakhir − data pertama.', 'Range = largest − smallest, not last − first.')], [s[n - 1], L(lang, 'Itu data terbesar saja.', 'That is just the largest value.')]],
        [L(lang, `Terbesar ${s[n - 1]}, terkecil ${s[0]}.`, `Largest ${s[n - 1]}, smallest ${s[0]}.`), `${s[n - 1]} − ${s[0]} = ${s[n - 1] - s[0]}`],
        { kind, xs },
      );
    const h = (n - 1) / 2;
    const lower = s.slice(0, h);
    const upper = s.slice(h + 1);
    const med = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2);
    const Q1 = med(lower);
    const Q3 = med(upper);
    const Q2 = s[h];
    const ans = kind === 1 ? Q1 : kind === 2 ? Q3 : Q3 - Q1;
    const name = [null, L(lang, 'Kuartil bawah (Q1)', 'The lower quartile (Q1)'), L(lang, 'Kuartil atas (Q3)', 'The upper quartile (Q3)'), L(lang, 'Jangkauan antarkuartilnya', 'The interquartile range')][kind];
    return num(
      L(lang, `Data urut: ${s.join(', ')}. ${name} adalah …`, `Ordered data: ${s.join(', ')}. ${name} is …`),
      ans,
      [
        [kind === 3 ? s[n - 1] - s[0] : Q2, kind === 3 ? L(lang, 'Itu jangkauan. Jangkauan antarkuartil = Q3 − Q1.', 'That is the range. Interquartile range = Q3 − Q1.') : L(lang, 'Itu median (Q2).', 'That is the median (Q2).')],
        [kind === 1 ? Q3 : kind === 2 ? Q1 : Q3 + Q1, L(lang, kind === 3 ? 'Kuartilnya dikurangkan.' : kind === 1 ? 'Itu kuartil atas.' : 'Itu kuartil bawah.', kind === 3 ? 'Subtract the quartiles.' : kind === 1 ? 'That is the upper quartile.' : 'That is the lower quartile.')],
      ],
      [L(lang, `Median Q2 = ${Q2}. Separuh bawah: ${lower.join(', ')}; separuh atas: ${upper.join(', ')}.`, `Median Q2 = ${Q2}. Lower half: ${lower.join(', ')}; upper half: ${upper.join(', ')}.`), kind === 3 ? `Q1 = ${M(lang, Q1)}, Q3 = ${M(lang, Q3)}, Q3 − Q1 = ${M(lang, Q3 - Q1)}` : `Q1 = ${M(lang, Q1)}, Q3 = ${M(lang, Q3)}`],
      { kind, xs: s },
    );
  },
  (m) => {
    const s = m.xs.slice().sort((a, b) => a - b);
    if (m.kind === 0) return D(Math.max(...s) - Math.min(...s));
    const n = s.length;
    const md = (a) => {
      const k = a.length;
      return k % 2 ? a[(k - 1) / 2] : (a[k / 2 - 1] + a[k / 2]) / 2;
    };
    const lo = md(s.filter((_, i) => i < (n - 1) / 2));
    const hi = md(s.filter((_, i) => i > (n - 1) / 2));
    return D(m.kind === 1 ? lo : m.kind === 2 ? hi : hi - lo);
  },
);

// ================= Bab 8: Peluang =================
const sampleSpace = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 1);
    if (kind === 0) {
      const c = ri(rnd, 0, 3);
      const d = ri(rnd, c === 0 ? 2 : c === 1 ? 1 : 0, 2);
      const parts = [];
      if (c) parts.push(L(lang, `${c === 1 ? 'sebuah' : c} koin`, `${c === 1 ? 'a' : c} coin${c > 1 ? 's' : ''}`));
      if (d) parts.push(L(lang, `${d === 1 ? 'sebuah' : d} dadu`, `${d === 1 ? 'a' : d} ${d > 1 ? 'dice' : 'die'}`));
      const n = 2 ** c * 6 ** d;
      return num(
        L(lang, `Banyak titik sampel pada pelemparan ${parts.join(' dan ')} sekaligus adalah …`, `How many outcomes are in the sample space when tossing ${parts.join(' and ')} at the same time?`),
        n,
        [[2 * c + 6 * d, L(lang, 'Banyak hasil setiap benda dikalikan, bukan dijumlahkan.', 'Multiply the number of outcomes of each object; do not add.')], [c + d > 1 ? 2 ** c * 6 ** d / 2 : null, L(lang, 'Ada hasil yang terlewat. Pakai tabel atau diagram pohon.', 'Some outcomes were missed. Use a table or tree diagram.')]],
        [L(lang, 'Koin punya 2 hasil, dadu punya 6 hasil.', 'A coin has 2 outcomes; a die has 6.'), `${[...Array(c).fill(2), ...Array(d).fill(6)].join(' × ')} = ${n}`],
        { kind, c, d },
      );
    }
    const N = pick(rnd, [20, 25, 40, 50, 80, 100, 200]);
    const k = ri(rnd, 1, N - 1);
    const ctx = pick(rnd, [
      [`Sebuah koin dilempar ${N} kali dan muncul gambar ${k} kali. Peluang empiris muncul gambar adalah …`, `A coin is tossed ${N} times and lands heads ${k} times. What is the experimental probability of heads?`, k],
      [`Sebuah koin dilempar ${N} kali dan muncul gambar ${k} kali. Peluang empiris muncul angka adalah …`, `A coin is tossed ${N} times and lands heads ${k} times. What is the experimental probability of tails?`, N - k],
      [`Seorang pemain basket mencoba ${N} tembakan dan masuk ${k}. Peluang empiris tembakannya masuk adalah …`, `A basketball player takes ${N} shots and scores ${k}. What is the experimental probability of scoring?`, k],
    ]);
    return num(
      L(lang, ctx[0] + ' (boleh pecahan atau desimal)', ctx[1] + ' (fraction or decimal)'),
      F(ctx[2], N),
      [[ctx[2] === k ? F(N - k, N) : F(k, N), L(lang, 'Perhatikan kejadian yang ditanya.', 'Check which outcome is asked for.')], [F(1, 2), L(lang, 'Itu peluang teoretis. Peluang empiris dihitung dari hasil percobaan.', 'That is the theoretical probability. Experimental probability uses the results.')], [F(ctx[2], N - ctx[2] || 1), L(lang, 'Penyebutnya banyak percobaan seluruhnya.', 'The denominator is the total number of trials.')]],
      [L(lang, 'Peluang empiris = banyak kejadian ÷ banyak percobaan.', 'Experimental probability = number of times ÷ number of trials.'), `${ctx[2]}/${N} = ${F(ctx[2], N)}`],
      { kind, a: ctx[2], N },
    );
  },
  (m) => (m.kind === 0 ? D(Math.pow(2, m.c) * Math.pow(6, m.d)) : F(m.a, m.N)),
);

const DIE_EV = [
  ['lebih dari 4', 'greater than 4', (x) => x > 4],
  ['kurang dari 3', 'less than 3', (x) => x < 3],
  ['bilangan genap', 'an even number', (x) => x % 2 === 0],
  ['bilangan ganjil', 'an odd number', (x) => x % 2 === 1],
  ['bilangan prima', 'a prime number', (x) => [2, 3, 5].includes(x)],
  ['faktor dari 6', 'a factor of 6', (x) => 6 % x === 0],
  ['paling sedikit 3', 'at least 3', (x) => x >= 3],
  ['kelipatan 3', 'a multiple of 3', (x) => x % 3 === 0],
];
const prob = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 4);
    if (kind === 0) {
      const e = ri(rnd, 0, DIE_EV.length - 1);
      const n = [1, 2, 3, 4, 5, 6].filter(DIE_EV[e][2]).length;
      return num(
        L(lang, `Sebuah dadu dilempar sekali. Peluang muncul mata dadu ${DIE_EV[e][0]} adalah …`, `A die is rolled once. What is the probability of rolling ${DIE_EV[e][1]}?`),
        F(n, 6),
        [[F(6 - n, 6), L(lang, 'Itu peluang kejadian sebaliknya.', 'That is the probability of the opposite event.')], [F(1, 6) === F(n, 6) ? null : F(1, 6), L(lang, `Ada ${n} mata dadu yang memenuhi, bukan 1.`, `${n} faces work, not 1.`)]],
        [L(lang, `Mata dadu yang memenuhi: ${[1, 2, 3, 4, 5, 6].filter(DIE_EV[e][2]).join(', ')} (${n} dari 6).`, `Faces that work: ${[1, 2, 3, 4, 5, 6].filter(DIE_EV[e][2]).join(', ')} (${n} of 6).`), `P = ${n}/6 = ${F(n, 6)}`],
        { kind, e },
      );
    }
    if (kind === 1) {
      const r = ri(rnd, 2, 9);
      const w = ri(rnd, 2, 9);
      const b = ri(rnd, 0, 5);
      const col = pick(rnd, [0, 1, 2].filter((i) => [r, w, b][i] > 0));
      const names = [L(lang, 'merah', 'red'), L(lang, 'putih', 'white'), L(lang, 'biru', 'blue')];
      const cnt = [r, w, b][col];
      const T = r + w + b;
      return num(
        L(lang, `Dalam kantong ada ${r} kelereng merah, ${w} kelereng putih${b ? `, dan ${b} kelereng biru` : ''}. Satu kelereng diambil acak. Peluang terambil kelereng ${names[col]} adalah …`, `A bag holds ${r} red, ${w} white${b ? `, and ${b} blue` : ''} marbles. One is taken at random. What is the probability it is ${names[col]}?`),
        F(cnt, T),
        [[F(cnt, T - cnt), L(lang, 'Penyebutnya banyak kelereng seluruhnya.', 'The denominator is the total number of marbles.')], [F(T - cnt, T), L(lang, `Itu peluang tidak terambil ${names[col]}.`, `That is the probability of not ${names[col]}.`)]],
        [L(lang, `Banyak kelereng ${T}, yang ${names[col]} ${cnt}.`, `There are ${T} marbles, ${cnt} ${names[col]}.`), `P = ${cnt}/${T} = ${F(cnt, T)}`],
        { kind, cnt, T },
      );
    }
    if (kind === 2) {
      const p = pick(rnd, [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9]);
      return num(
        L(lang, `Peluang hari ini hujan adalah ${M(lang, p)}. Peluang hari ini tidak hujan adalah …`, `The probability of rain today is ${M(lang, p)}. What is the probability of no rain?`),
        1 - p,
        [[p, L(lang, 'Itu peluang hujan.', 'That is the probability of rain.')], [100 - p * 100, L(lang, 'Peluang ditulis antara 0 dan 1, bukan persen.', 'Probability is between 0 and 1, not a percentage.')]],
        [L(lang, 'P(tidak A) = 1 − P(A)', 'P(not A) = 1 − P(A)'), `1 − ${M(lang, p)} = ${M(lang, 1 - p)}`],
        { kind, p },
      );
    }
    if (kind === 3) {
      const coin = rnd() < 0.5;
      const N = coin ? pick(rnd, [20, 40, 50, 60, 80, 100, 120, 200]) : pick(rnd, [30, 60, 90, 120, 180, 240, 300]);
      const e = coin ? null : ri(rnd, 0, DIE_EV.length - 1);
      const n = coin ? 1 : [1, 2, 3, 4, 5, 6].filter(DIE_EV[e][2]).length;
      const den = coin ? 2 : 6;
      return num(
        coin ? L(lang, `Sebuah koin dilempar ${N} kali. Frekuensi harapan muncul gambar adalah …`, `A coin is tossed ${N} times. What is the expected number of heads?`) : L(lang, `Sebuah dadu dilempar ${N} kali. Frekuensi harapan muncul mata dadu ${DIE_EV[e][0]} adalah …`, `A die is rolled ${N} times. What is the expected number of times it shows ${DIE_EV[e][1]}?`),
        (N * n) / den,
        [[F(n, den), L(lang, 'Itu peluangnya. Frekuensi harapan = peluang × banyak percobaan.', 'That is the probability. Expected frequency = probability × number of trials.')], [N, L(lang, 'Kalikan banyak percobaan dengan peluangnya.', 'Multiply the number of trials by the probability.')]],
        [`P = ${F(n, den)}`, `${F(n, den)} × ${N} = ${(N * n) / den}`],
        { kind, N, n, den },
      );
    }
    const target = ri(rnd, 2, 12);
    let ways = 0;
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) ways += a + b === target ? 1 : 0;
    return num(
      L(lang, `Dua dadu dilempar bersamaan. Peluang muncul mata dadu berjumlah ${target} adalah …`, `Two dice are rolled together. What is the probability that the total is ${target}?`),
      F(ways, 36),
      [[F(1, 11), L(lang, 'Jumlah 2 sampai 12 tidak sama peluangnya. Ada 36 pasangan hasil.', 'The totals 2 to 12 are not equally likely. There are 36 outcome pairs.')], [F(target, 36), L(lang, `Hitung pasangan yang jumlahnya ${target}, bukan memakai ${target} sebagai pembilang.`, `Count the pairs that add to ${target}; do not use ${target} as the numerator.`)]],
      [L(lang, `Pasangan berjumlah ${target}: ${ways} dari 36.`, `Pairs that add to ${target}: ${ways} of 36.`), `P = ${ways}/36 = ${F(ways, 36)}`],
      { kind, target },
    );
  },
  (m) => {
    if (m.kind === 0) return F([1, 2, 3, 4, 5, 6].filter(DIE_EV[m.e][2]).length, 6);
    if (m.kind === 1) return F(m.cnt, m.T);
    if (m.kind === 2) return D(1 - m.p);
    if (m.kind === 3) return D((m.N * m.n) / m.den);
    return F(6 - Math.abs(m.target - 7), 36);
  },
);

export const K8 = {
  'k8b1-1': [powVal],
  'k8b1-2': [powRules],
  'k8b1-3': [negPow, sciNot],
  'k8b1-4': [roots],
  'k8b2-1': [pythHyp],
  'k8b2-2': [pythLeg, pythHyp],
  'k8b2-3': [triKind, tripleFind],
  'k8b2-4': [pythApp],
  'k8b3-1': [factorRel, relRule],
  'k8b3-2': [funcPick, rangeCount],
  'k8b3-3': [funcVal, funcFormula],
  'k8b4-1': [coordQ],
  'k8b4-2': [slope],
  'k8b4-3': [lineEq],
  'k8b5-1': [spldvPair, spldvElim],
  'k8b5-2': [spldvSub],
  'k8b5-3': [spldvElim],
  'k8b6-1': [cubeArea],
  'k8b6-2': [cubeVol],
  'k8b6-3': [prism],
  'k8b6-4': [pyramid],
  'k8b7-1': [freqStats],
  'k8b7-2': [quartile],
  'k8b8-1': [sampleSpace],
  'k8b8-2': [prob],
};
