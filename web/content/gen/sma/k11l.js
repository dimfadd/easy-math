// Generator soal Kelas 11 SMA (matematika lanjut).
import { L, ri, pick, D, N, F, gcd, G, mi, M, Fr, sup, sub, lg, nz, shuf, fact, C, WR, MC, NUM, OPT, poly, pc, xm, plus, pt, mat, cx, triple } from './common.js';

// ================= Bab 1: Bilangan kompleks =================
const IP = ['1', 'i', '−1', '−i'];
const iPow = G(
  (rnd, lang) => {
    const n = ri(rnd, 2, 40);
    const okT = IP[n % 4];
    return {
      q: L(lang, `Nilai i${sup(n)} adalah …`, `The value of i${sup(n)} is …`),
      options: IP.map((t) =>
        t === okT
          ? { t, ok: true }
          : { t, why: t === IP[(n + 2) % 4] ? L(lang, `Sisa ${n} dibagi 4 adalah ${n % 4}. Perhatikan tandanya.`, `${n} divided by 4 leaves ${n % 4}. Watch the sign.`) : L(lang, `Pangkat i berulang setiap 4: i¹ = i, i² = −1, i³ = −i, i⁴ = 1. Sisa ${n} ÷ 4 = ${n % 4}.`, `Powers of i repeat every 4: i¹ = i, i² = −1, i³ = −i, i⁴ = 1. ${n} ÷ 4 leaves ${n % 4}.`) },
      ),
      fixed: true,
      steps: [L(lang, `${n} = 4 × ${Math.floor(n / 4)} + ${n % 4}`, `${n} = 4 × ${Math.floor(n / 4)} + ${n % 4}`), `i${sup(n)} = i${sup(n % 4 || 4)} = ${okT}`],
      meta: { n },
    };
  },
  (m) => {
    let re = 1;
    let im = 0;
    for (let k = 0; k < m.n; k++) [re, im] = [-im, re];
    return re === 1 ? '1' : re === -1 ? '−1' : im === 1 ? 'i' : '−i';
  },
);

const cxParts = G(
  (rnd, lang) => {
    const a = ri(rnd, -9, 9);
    const b = nz(rnd, -9, 9);
    const re = rnd() < 0.5;
    const ans = re ? a : b;
    return NUM(
      L(lang, `Bagian ${re ? 'real' : 'imajiner'} dari z = ${cx(a, b)} adalah …`, `The ${re ? 'real' : 'imaginary'} part of z = ${cx(a, b)} is …`),
      D(ans),
      WR(D(ans), [
        [re ? b : a, L(lang, `Itu bagian ${re ? 'imajiner' : 'real'}nya.`, `That is the ${re ? 'imaginary' : 'real'} part.`)],
        [-ans, L(lang, 'Tandanya ikut.', 'Keep the sign.')],
      ]),
      [L(lang, 'z = a + bi: a bagian real, b bagian imajiner (tanpa i).', 'z = a + bi: a is the real part, b is the imaginary part (without i).'), `${re ? 'Re' : 'Im'}(z) = ${mi(ans)}`],
      { a, b, re },
    );
  },
  (m) => D(m.re ? m.a : m.b),
);

const sqrtNeg = G(
  (rnd, lang) => {
    const k = ri(rnd, 2, 12);
    if (rnd() < 0.5) {
      const okT = `${k}i`;
      return OPT(
        L(lang, `Bentuk sederhana √−${k * k} adalah …`, `The simplest form of √−${k * k} is …`),
        okT,
        [
          [`−${k}`, L(lang, 'Akar bilangan negatif bukan bilangan negatif biasa. √−1 = i.', 'The root of a negative number is not an ordinary negative number. √−1 = i.')],
          [`${k * k}i`, L(lang, `√${k * k} = ${k}, jadi hasilnya ${k}i.`, `√${k * k} = ${k}, so the answer is ${k}i.`)],
          [L(lang, 'tidak ada', 'does not exist'), L(lang, 'Dalam bilangan kompleks, akar bilangan negatif ada.', 'In the complex numbers, roots of negatives exist.')],
        ],
        [`√−${k * k} = √${k * k} × √−1`, `= ${k}i`],
        { kind: 'sqrt', n: k * k },
      );
    }
    const okT = `x = ${k}i ${L(lang, 'atau', 'or')} x = −${k}i`;
    return OPT(
      L(lang, `Penyelesaian x² + ${k * k} = 0 adalah …`, `The solutions of x² + ${k * k} = 0 are …`),
      okT,
      [
        [`x = ${k} ${L(lang, 'atau', 'or')} x = −${k}`, L(lang, `Cek: ${k}² + ${k * k} = ${2 * k * k}, bukan 0.`, `Check: ${k}² + ${k * k} = ${2 * k * k}, not 0.`)],
        [`x = ${k * k}i`, L(lang, `x² = −${k * k}, jadi x = ±${k}i.`, `x² = −${k * k}, so x = ±${k}i.`)],
        [L(lang, 'tidak ada penyelesaian', 'no solution'), L(lang, 'Tidak ada penyelesaian real, tetapi ada penyelesaian kompleks.', 'There is no real solution, but there are complex ones.')],
      ],
      [`x² = −${k * k}`, `x = ±√−${k * k} = ±${k}i`],
      { kind: 'eq', n: k * k },
    );
  },
  (m, lang) => {
    const k = Math.round(Math.sqrt(m.n));
    return m.kind === 'sqrt' ? `${k}i` : `x = ${k}i ${L(lang, 'atau', 'or')} x = −${k}i`;
  },
);

const cxAdd = G(
  (rnd, lang) => {
    const [a, b, c, d] = [ri(rnd, -8, 8), nz(rnd, -8, 8), ri(rnd, -8, 8), nz(rnd, -8, 8)];
    const plusOp = rnd() < 0.5;
    const s = plusOp ? 1 : -1;
    const okT = cx(a + s * c, b + s * d);
    return OPT(
      `(${cx(a, b)}) ${plusOp ? '+' : '−'} (${cx(c, d)}) = …`,
      okT,
      [
        [cx(a - s * c, b - s * d), L(lang, plusOp ? 'Itu hasil pengurangan.' : 'Tanda minus berlaku untuk kedua bagian, real dan imajiner.', plusOp ? 'That is the difference.' : 'The minus sign applies to both the real and imaginary parts.')],
        [cx(a + s * c, b - s * d), L(lang, 'Bagian imajiner dihitung dengan operasi yang sama.', 'Use the same operation on the imaginary parts.')],
        [cx(a - s * c, b + s * d), L(lang, 'Bagian real dihitung dengan operasi yang sama.', 'Use the same operation on the real parts.')],
        [cx(a + s * d, b + s * c), L(lang, 'Real dengan real, imajiner dengan imajiner.', 'Real with real, imaginary with imaginary.')],
      ],
      [L(lang, 'Real dengan real, imajiner dengan imajiner.', 'Real with real, imaginary with imaginary.'), okT],
      { a, b, c, d, s },
    );
  },
  (m) => cx(m.a + m.s * m.c, m.b + m.s * m.d),
);

const cxMul = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['gen', 'conj', 'sq', 'i']);
    let a, b, c, d;
    if (kind === 'conj') {
      a = ri(rnd, 1, 7);
      b = nz(rnd, -7, 7);
      [c, d] = [a, -b];
    } else if (kind === 'sq') {
      a = nz(rnd, -4, 4);
      b = nz(rnd, -4, 4);
      [c, d] = [a, b];
    } else if (kind === 'i') {
      [a, b] = [0, pick(rnd, [1, -1, 2, 3])];
      [c, d] = [nz(rnd, -6, 6), nz(rnd, -6, 6)];
    } else {
      [a, b, c, d] = [nz(rnd, -5, 5), nz(rnd, -5, 5), nz(rnd, -5, 5), nz(rnd, -5, 5)];
    }
    const re = a * c - b * d;
    const im = a * d + b * c;
    const okT = cx(re, im);
    const q = kind === 'sq' ? `(${cx(a, b)})² = …` : kind === 'i' ? `${cx(a, b)}(${cx(c, d)}) = …` : `(${cx(a, b)})(${cx(c, d)}) = …`;
    return OPT(
      q,
      okT,
      [
        [cx(a * c + b * d, im), L(lang, 'i² = −1, jadi hasil kali bagian imajiner dikurangkan.', 'i² = −1, so the product of the imaginary parts is subtracted.')],
        [cx(a * c, b * d), L(lang, 'Kalikan setiap suku dengan setiap suku (seperti (a + b)(c + d)).', 'Multiply every term by every term, like (a + b)(c + d).')],
        [cx(re, -im), L(lang, 'Perhatikan tanda bagian imajiner.', 'Check the sign of the imaginary part.')],
        [cx(a * c + b * d, a * d - b * c), L(lang, 'Ada tanda yang tertukar. Ingat i² = −1.', 'Some signs are swapped. Remember i² = −1.')],
      ],
      [`${mi(a * c)} ${a * d < 0 ? '−' : '+'} ${Math.abs(a * d) === 1 ? '' : Math.abs(a * d)}i ${b * c < 0 ? '−' : '+'} ${Math.abs(b * c) === 1 ? '' : Math.abs(b * c)}i ${b * d < 0 ? '−' : '+'} ${Math.abs(b * d) === 1 ? '' : Math.abs(b * d)}i²`.replace(/ [+−] 0i/g, '').replace(/^0 [+]/, '').trim(), L(lang, `i² = −1: ${okT}`, `i² = −1: ${okT}`)],
      { a, b, c, d },
    );
  },
  (m) => {
    // perkalian lewat bentuk polar tidak bulat; pakai matriks [[a, −b], [b, a]]
    const A = [
      [m.a, -m.b],
      [m.b, m.a],
    ];
    return cx(A[0][0] * m.c + A[0][1] * m.d, A[1][0] * m.c + A[1][1] * m.d);
  },
);

const cxMod = G(
  (rnd, lang) => {
    const [x, y, r] = triple(rnd, 30);
    const a = x * (rnd() < 0.5 ? -1 : 1);
    const b = y * (rnd() < 0.5 ? -1 : 1);
    if (rnd() < 0.5)
      return NUM(
        L(lang, `Modulus dari ${cx(a, b)} adalah …`, `The modulus of ${cx(a, b)} is …`),
        D(r),
        WR(D(r), [
          [Math.abs(a) + Math.abs(b), L(lang, '|z| = √(a² + b²), bukan a + b.', '|z| = √(a² + b²), not a + b.')],
          [r * r, L(lang, 'Itu |z|². Ambil akarnya.', 'That is |z|². Take the square root.')],
        ]),
        [`|z| = √(${x}² + ${y}²) = √${r * r}`, `= ${r}`],
        { kind: 'mod', a, b },
      );
    const p = nz(rnd, -6, 6);
    const q = nz(rnd, -6, 6);
    return NUM(
      L(lang, `Nilai (${cx(p, q)})(${cx(p, -q)}) adalah …`, `The value of (${cx(p, q)})(${cx(p, -q)}) is …`),
      D(p * p + q * q),
      WR(D(p * p + q * q), [
        [p * p - q * q, L(lang, '−(bi)² = −b²i² = +b², jadi dijumlah.', '−(bi)² = −b²i² = +b², so they add.')],
        [p + q, L(lang, 'z × z̄ = a² + b².', 'z × z̄ = a² + b².')],
      ]),
      [`z × z̄ = a² + b²`, `= ${p * p} + ${q * q} = ${p * p + q * q}`],
      { kind: 'zz', a: p, b: q },
    );
  },
  (m) => (m.kind === 'mod' ? D(Math.hypot(m.a, m.b)) : D(m.a * m.a + m.b * m.b)),
);

const cxConjDiv = G(
  (rnd, lang) => {
    if (rnd() < 0.5) {
      const a = ri(rnd, -9, 9);
      const b = nz(rnd, -9, 9);
      const okT = cx(a, -b);
      return OPT(
        L(lang, `Konjugat dari ${cx(a, b)} adalah …`, `The conjugate of ${cx(a, b)} is …`),
        okT,
        [
          [cx(-a, b), L(lang, 'Yang berganti tanda hanya bagian imajiner.', 'Only the imaginary part changes sign.')],
          [cx(-a, -b), L(lang, 'Itu −z. Konjugat hanya membalik tanda bagian imajiner.', 'That is −z. The conjugate only flips the imaginary part.')],
          [cx(b, a), L(lang, 'Bagian real dan imajiner tidak ditukar.', 'The real and imaginary parts are not swapped.')],
          [cx(a, b * 2), L(lang, 'Konjugat tidak mengubah besar bagian imajiner.', 'The conjugate does not change the size of the imaginary part.')],
        ],
        [L(lang, 'Konjugat a + bi adalah a − bi.', 'The conjugate of a + bi is a − bi.'), okT],
        { kind: 'conj', a, b },
      );
    }
    const a = nz(rnd, -3, 3);
    const b = nz(rnd, -3, 3);
    const n2 = a * a + b * b;
    const k = ri(rnd, 1, 3);
    const num = k * n2;
    const okT = cx(k * a, -k * b);
    return OPT(
      `${num} ÷ (${cx(a, b)}) = …`,
      okT,
      [
        [cx(k * a, k * b), L(lang, 'Kalikan dengan konjugat penyebut, jadi tanda bagian imajiner berbalik.', 'Multiply by the conjugate of the denominator, so the imaginary sign flips.')],
        [cx(num * a, -num * b), L(lang, `Penyebutnya menjadi ${a < 0 ? `(${mi(a)})` : a}² + ${b < 0 ? `(${mi(b)})` : b}² = ${n2}. Jangan lupa membaginya.`, `The denominator becomes ${a < 0 ? `(${mi(a)})` : a}² + ${b < 0 ? `(${mi(b)})` : b}² = ${n2}. Remember to divide by it.`)],
        [cx(-k * a, k * b), L(lang, 'Bagian real tidak berganti tanda.', 'The real part does not change sign.')],
      ],
      [L(lang, `Kalikan atas dan bawah dengan konjugat ${cx(a, -b)}.`, `Multiply top and bottom by the conjugate ${cx(a, -b)}.`), `${num}(${cx(a, -b)}) ÷ ${n2} = ${okT}`],
      { kind: 'div', a, b, num },
    );
  },
  (m) => {
    if (m.kind === 'conj') return cx(m.a, -m.b);
    // cari w dengan w × (a + bi) = num
    for (let x = -30; x <= 30; x++) for (let y = -30; y <= 30; y++) if (x * m.a - y * m.b === m.num && x * m.b + y * m.a === 0) return cx(x, y);
  },
);

const R3 = Math.sqrt(3);
const ARGS = [
  ['1 + i', 1, 1, 45],
  ['−1 + i', -1, 1, 135],
  ['−1 − i', -1, -1, 225],
  ['1 − i', 1, -1, 315],
  ['i', 0, 1, 90],
  ['−1', -1, 0, 180],
  ['−i', 0, -1, 270],
  ['√3 + i', R3, 1, 30],
  ['1 + √3 i', 1, R3, 60],
  ['−√3 + i', -R3, 1, 150],
  ['−1 + √3 i', -1, R3, 120],
  ['3 + 3i', 3, 3, 45],
  ['2i', 0, 2, 90],
  ['−5', -5, 0, 180],
  ['2 − 2i', 2, -2, 315],
  ['−√3 − i', -R3, -1, 210],
];
const cxArg = G(
  (rnd, lang) => {
    const [z, re, im, ang] = pick(rnd, ARGS);
    return NUM(
      L(lang, `Argumen dari z = ${z} (antara 0° dan 360°) adalah … °`, `The argument of z = ${z} (between 0° and 360°) is … °`),
      D(ang),
      WR(D(ang), [
        [ang > 90 && ang < 360 ? (ang > 270 ? ang - 360 : 180 - ang) : null, L(lang, `Perhatikan kuadran titik ${z}.`, `Check the quadrant of ${z}.`)],
        [90 - ang > 0 ? 90 - ang : null, L(lang, 'Argumen diukur dari sumbu real positif, bukan dari sumbu imajiner.', 'The argument is measured from the positive real axis, not the imaginary axis.')],
      ]),
      [L(lang, `Gambar ${z} di bidang kompleks dan lihat kuadrannya.`, `Plot ${z} on the complex plane and note its quadrant.`), `arg z = ${ang}°`],
      { re, im },
    );
  },
  (m) => {
    let a = (Math.atan2(m.im, m.re) * 180) / Math.PI;
    if (a < 0) a += 360;
    return D(Math.round(a));
  }
);

// ================= Bab 2: Polinomial =================
const randPoly = (rnd, deg) => {
  const cs = Array.from({ length: deg + 1 }, (_, i) => (i === 0 ? nz(rnd, -5, 5) : rnd() < 0.3 ? 0 : nz(rnd, -7, 7)));
  return cs;
};
const polyInfo = G(
  (rnd, lang) => {
    const deg = ri(rnd, 3, 6);
    const cs = randPoly(rnd, deg);
    // susun acak suku untuk soal derajat
    const terms = cs.map((c, i) => [c, deg - i]).filter((t) => t[0]);
    const shown = rnd() < 0.5 ? shuf(rnd, terms) : terms;
    const mids = terms.filter((t) => t[1] > 0 && t[1] < deg).map((t) => t[1]);
    let kind = pick(rnd, ['deg', 'coef', 'const', 'lead']);
    if ((kind === 'coef' && !mids.length) || (kind === 'const' && !cs[deg])) kind = 'lead';
    const p = kind === 'coef' ? pick(rnd, mids) : 0;
    const coefOf = (k) => (terms.find((t) => t[1] === k) || [0])[0];
    const ans = { deg, coef: coefOf(p), const: coefOf(0), lead: cs[0] }[kind];
    const name = { deg: L(lang, 'Derajat', 'The degree of'), coef: L(lang, `Koefisien x${p === 1 ? '' : sup(p)} dalam`, `The coefficient of x${p === 1 ? '' : sup(p)} in`), const: L(lang, 'Suku tetap dari', 'The constant term of'), lead: L(lang, 'Koefisien utama (koefisien suku pangkat tertinggi) dari', 'The leading coefficient of') }[kind];
    return NUM(
      L(lang, `${name} polinomial ${poly(shown)} adalah …`, `${name} the polynomial ${poly(shown)} is …`),
      D(ans),
      WR(D(ans), [
        [kind === 'deg' ? terms.length : null, L(lang, 'Derajat adalah pangkat tertinggi, bukan banyak suku.', 'The degree is the highest power, not the number of terms.')],
        [kind === 'deg' ? shown[0][1] : null, L(lang, 'Suku pertama belum tentu pangkat tertinggi. Cari pangkat terbesar.', 'The first term is not always the highest power. Find the largest power.')],
        [kind === 'lead' ? shown[0][0] : null, L(lang, 'Koefisien utama milik suku dengan pangkat tertinggi.', 'The leading coefficient belongs to the highest-power term.')],
        [kind === 'coef' || kind === 'const' || kind === 'lead' ? -ans : null, L(lang, 'Tanda di depan suku ikut menjadi bagian koefisien.', 'The sign in front of a term is part of its coefficient.')],
        [kind === 'coef' ? p : null, L(lang, 'Itu pangkatnya. Koefisien adalah angka di depan x.', 'That is the power. The coefficient is the number in front of x.')],
      ]),
      [L(lang, `Urutkan: ${poly(terms)}`, `In order: ${poly(terms)}`), `${{ deg: L(lang, 'Derajat', 'Degree'), coef: L(lang, 'Koefisien', 'Coefficient'), const: L(lang, 'Suku tetap', 'Constant'), lead: L(lang, 'Koefisien utama', 'Leading coefficient') }[kind]} = ${mi(ans)}`],
      { cs, kind, p },
    );
  },
  (m) => {
    const deg = m.cs.length - 1;
    if (m.kind === 'deg') return D(deg - m.cs.findIndex((c) => c !== 0));
    if (m.kind === 'lead') return D(m.cs.find((c) => c !== 0));
    if (m.kind === 'const') return D(m.cs[deg]);
    return D(m.cs[deg - m.p]);
  },
);

const polyEval = G(
  (rnd, lang) => {
    const cs = [1, ri(rnd, -4, 4), ri(rnd, -5, 5), ri(rnd, -6, 6)];
    if (rnd() < 0.5) cs[0] = pick(rnd, [2, -1, 3]);
    const x = nz(rnd, -3, 3);
    const v = cs.reduce((a, c) => a * x + c, 0);
    const vAbs = cs.reduce((a, c) => a * Math.abs(x) + c, 0);
    return NUM(
      L(lang, `Jika f(x) = ${pc(cs)}, nilai f(${mi(x)}) adalah …`, `If f(x) = ${pc(cs)}, the value of f(${mi(x)}) is …`),
      D(v),
      WR(D(v), [
        [x < 0 ? vAbs : null, L(lang, `Masukkan x = ${mi(x)} dengan tandanya: pangkat ganjil dari bilangan negatif tetap negatif.`, `Substitute x = ${mi(x)} with its sign: odd powers of a negative stay negative.`)],
        [cs[0] * x * 3 + cs[1] * x * 2 + cs[2] * x + cs[3], L(lang, 'x³ berarti x × x × x, bukan 3x.', 'x³ means x × x × x, not 3x.')],
        [cs[3] ? v - cs[3] : null, L(lang, `Jangan lupa suku tetap ${mi(cs[3])}.`, `Do not forget the constant term ${mi(cs[3])}.`)],
      ]),
      [`f(${mi(x)}) = ${cs.map((c, i) => [c, 3 - i]).filter(([c]) => c).map(([c, p], j) => `${c < 0 ? (j ? ' − ' : '−') : j ? ' + ' : ''}${p === 0 ? Math.abs(c) : `${Math.abs(c) === 1 ? '' : Math.abs(c) + '·'}(${mi(x)})${p === 1 ? '' : sup(p)}`}`).join('')}`, `= ${mi(v)}`],
      { cs, x },
    );
  },
  (m) => D(m.cs[0] * m.x ** 3 + m.cs[1] * m.x ** 2 + m.cs[2] * m.x + m.cs[3]),
);

const NONPOLY = [
  ['x² + 3/x', 'x pada penyebut berarti pangkat negatif (x⁻¹).', 'x in a denominator means a negative power (x⁻¹).'],
  ['√x + 1', '√x = x^½, pangkatnya bukan bilangan cacah.', '√x = x^½, not a whole-number power.'],
  ['2ˣ + 1', 'x ada di pangkat. Itu fungsi eksponen.', 'x is in the exponent. That is an exponential function.'],
  ['x⁻² + x', 'Pangkat negatif tidak boleh dalam polinomial.', 'Negative powers are not allowed in a polynomial.'],
  ['1/(x + 1)', 'Ada variabel di penyebut.', 'There is a variable in the denominator.'],
];
const POLYS = ['5', 'x⁴ − 1', '½x + 7', '3x³ − x² + 2', '−x⁵', '√2 x² + x', '0,5x² − 3', '(x + 1)²', 'x/3 + 4', 'πx²'];
const notPoly = G(
  (rnd, lang) => {
    const i = ri(rnd, 0, NONPOLY.length - 1);
    const okT = NONPOLY[i][0];
    const others = shuf(rnd, POLYS).slice(0, 3);
    return OPT(
      L(lang, 'Manakah yang bukan polinomial?', 'Which one is not a polynomial?'),
      okT,
      others.map((t) => [lang === 'en' ? t.replace('0,5', '0.5') : t, L(lang, 'Semua pangkat x bilangan cacah, jadi ini polinomial. Koefisien boleh pecahan atau akar.', 'Every power of x is a whole number, so this is a polynomial. Coefficients may be fractions or roots.')]),
      [L(lang, 'Polinomial hanya memuat pangkat bilangan cacah dari x.', 'A polynomial only has whole-number powers of x.'), L(lang, NONPOLY[i][1], NONPOLY[i][2])],
      { i },
    );
  },
  (m) => NONPOLY[m.i][0],
);

const polyAddSub = G(
  (rnd, lang) => {
    const p = [nz(rnd, -5, 5), ri(rnd, -6, 6), ri(rnd, -6, 6)];
    const q = [nz(rnd, -4, 4), nz(rnd, -6, 6), nz(rnd, -6, 6)];
    const sub = rnd() < 0.7;
    const s = sub ? -1 : 1;
    const r = p.map((c, i) => c + s * q[i]);
    const t = (cs) => pc(cs[0] ? cs : cs[1] ? cs.slice(1) : cs.slice(2));
    const okT = t(r);
    return OPT(
      `(${t(p)}) ${sub ? '−' : '+'} (${t(q)}) = …`,
      okT,
      [
        [t([p[0] + s * q[0], p[1] - s * q[1], p[2] - s * q[2]]), L(lang, 'Tanda minus di depan kurung berlaku untuk semua suku di dalamnya.', 'A minus in front of the bracket applies to every term inside.')],
        [t(p.map((c, i) => c - s * q[i])), L(lang, sub ? 'Itu hasil penjumlahan.' : 'Itu hasil pengurangan.', sub ? 'That is the sum.' : 'That is the difference.')],
        [t([r[0], r[1], p[2] - s * q[2]]), L(lang, 'Suku tetapnya salah tanda.', 'The constant term has the wrong sign.')],
        [t([r[0], p[1] - s * q[1], r[2]]), L(lang, 'Suku x-nya salah tanda.', 'The x-term has the wrong sign.')],
      ],
      [L(lang, 'Kelompokkan suku sejenis.', 'Group like terms.'), okT],
      { p, q, s },
    );
  },
  (m) => {
    const r = m.p.map((c, i) => c + m.s * m.q[i]);
    return pc(r[0] ? r : r[1] ? r.slice(1) : r.slice(2));
  },
);

const mulPoly = (A, B) => {
  const out = Array(A.length + B.length - 1).fill(0);
  A.forEach((a, i) => B.forEach((b, j) => (out[i + j] += a * b)));
  return out;
};
const polyMul = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['coef', 'cube', 'diff']);
    if (kind === 'coef') {
      const A = [nz(rnd, -3, 3), nz(rnd, -5, 5)];
      const B = [1, nz(rnd, -5, 5), nz(rnd, -6, 6)];
      const prod = mulPoly(A, B);
      const k = pick(rnd, [1, 2]);
      const ans = prod[3 - k];
      return NUM(
        L(lang, `Koefisien x${k === 1 ? '' : sup(k)} pada hasil kali (${pc(A)})(${pc(B)}) adalah …`, `The coefficient of x${k === 1 ? '' : sup(k)} in (${pc(A)})(${pc(B)}) is …`),
        D(ans),
        WR(D(ans), [
          [k === 1 ? A[0] * B[2] : A[0] * B[1], L(lang, `Ada dua pasangan suku yang menghasilkan x${k === 1 ? '' : sup(k)}. Jumlahkan keduanya.`, `Two pairs of terms give x${k === 1 ? '' : sup(k)}. Add both.`)],
          [k === 1 ? A[1] * B[1] : A[1] * B[0], L(lang, `Ada dua pasangan suku yang menghasilkan x${k === 1 ? '' : sup(k)}. Jumlahkan keduanya.`, `Two pairs of terms give x${k === 1 ? '' : sup(k)}. Add both.`)],
        ]),
        [k === 1 ? `(${mi(A[0])}x)(${mi(B[2])}) + (${mi(A[1])})(${mi(B[1])}x)` : `(${mi(A[0])}x)(${mi(B[1])}x) + (${mi(A[1])})(x²)`, `= ${mi(ans)}x${k === 1 ? '' : sup(k)}`],
        { kind, A, B, k },
      );
    }
    if (kind === 'cube') {
      const a = nz(rnd, -3, 3);
      const k = ri(rnd, 0, 2);
      const ans = C(3, k) * a ** (3 - k);
      return NUM(
        L(lang, `${k === 0 ? 'Suku tetap' : `Koefisien x${k === 1 ? '' : sup(k)}`} pada ${xm(-a)}³ adalah …`, `The ${k === 0 ? 'constant term' : `coefficient of x${k === 1 ? '' : sup(k)}`} in ${xm(-a)}³ is …`),
        D(ans),
        WR(D(ans), [
          [k > 0 ? C(3, k) : null, L(lang, `Jangan lupa pangkat dari ${mi(a)}: (${mi(a)})${sup(3 - k)}.`, `Remember the power of ${mi(a)}: (${mi(a)})${sup(3 - k)}.`)],
          [a ** (3 - k), L(lang, `Kalikan juga dengan koefisien binomial ${C(3, k)}.`, `Also multiply by the binomial coefficient ${C(3, k)}.`)],
          [a < 0 ? -ans : null, L(lang, 'Perhatikan tanda: pangkat ganjil dari bilangan negatif tetap negatif.', 'Watch the sign: odd powers of a negative stay negative.')],
        ]),
        [`${xm(-a)}³ = ${pc(mulPoly(mulPoly([1, a], [1, a]), [1, a]))}`, `${L(lang, 'Jawab', 'Answer')}: ${mi(ans)}`],
        { kind, a, k },
      );
    }
    const d1 = ri(rnd, 1, 4);
    const d2 = ri(rnd, 1, 4);
    const A = [1, ...Array(d1 - 1).fill(0), nz(rnd, -4, 4)];
    const B = [1, ...Array(d2 - 1).fill(0), nz(rnd, -4, 4)];
    return NUM(
      L(lang, `Derajat hasil kali (${pc(A)})(${pc(B)}) adalah …`, `The degree of (${pc(A)})(${pc(B)}) is …`),
      D(d1 + d2),
      WR(D(d1 + d2), [
        [d1 * d2, L(lang, 'Pangkat tertinggi dijumlah saat dikali (xᵃ · xᵇ = xᵃ⁺ᵇ).', 'Highest powers add when multiplied (xᵃ · xᵇ = xᵃ⁺ᵇ).')],
        [Math.max(d1, d2), L(lang, 'Derajat hasil kali adalah jumlah derajat keduanya.', 'The degree of a product is the sum of the degrees.')],
      ]),
      [`x${sup(d1)} × x${sup(d2)} = x${sup(d1 + d2)}`, L(lang, `Derajat ${d1 + d2}`, `Degree ${d1 + d2}`)],
      { kind, A, B },
    );
  },
  (m) => {
    if (m.kind === 'coef') return D(mulPoly(m.A, m.B)[3 - m.k]);
    if (m.kind === 'cube') {
      const r = mulPoly(mulPoly([1, m.a], [1, m.a]), [1, m.a]);
      return D(r[3 - m.k]);
    }
    return D(mulPoly(m.A, m.B).length - 1);
  },
);

const remThm = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['rem', 'k', 'rem']);
    if (kind === 'rem') {
      const cs = [nz(rnd, -2, 3), ri(rnd, -4, 4), ri(rnd, -5, 5), ri(rnd, -6, 6)];
      if (rnd() < 0.3) cs.unshift(1);
      const a = nz(rnd, -3, 3);
      const ev = (x) => cs.reduce((s, c) => s * x + c, 0);
      return NUM(
        L(lang, `Sisa pembagian ${pc(cs)} oleh ${xm(a).slice(1, -1)} adalah …`, `The remainder when ${pc(cs)} is divided by ${xm(a).slice(1, -1)} is …`),
        D(ev(a)),
        WR(D(ev(a)), [
          [ev(-a), L(lang, `Pembagi ${xm(a).slice(1, -1)} berarti substitusi x = ${mi(a)}, bukan ${mi(-a)}.`, `Dividing by ${xm(a).slice(1, -1)} means substituting x = ${mi(a)}, not ${mi(-a)}.`)],
          [cs[cs.length - 1], L(lang, 'Itu suku tetapnya. Sisa = f(a).', 'That is the constant term. The remainder is f(a).')],
        ]),
        [L(lang, `Teorema sisa: sisa = f(${mi(a)})`, `Remainder theorem: remainder = f(${mi(a)})`), `f(${mi(a)}) = ${mi(ev(a))}`],
        { kind, cs, a },
      );
    }
    const a = nz(rnd, -3, 3);
    const p = ri(rnd, -3, 3);
    const k = ri(rnd, -8, 8);
    // f(x) = x³ + p x² + k x + q, f(a) = 0
    const q = -(a ** 3 + p * a * a + k * a);
    const fT = `x³${p ? (p < 0 ? ' − ' : ' + ') + (Math.abs(p) === 1 ? '' : Math.abs(p)) + 'x²' : ''} + kx${plus(q)}`;
    return NUM(
      L(lang, `Polinomial f(x) = ${fT} habis dibagi ${xm(a).slice(1, -1)}. Nilai k adalah …`, `The polynomial f(x) = ${fT} is divisible by ${xm(a).slice(1, -1)}. Find k.`),
      D(k),
      WR(D(k), [
        [-k, L(lang, 'Perhatikan tanda saat memindahkan ruas.', 'Watch the signs when rearranging.')],
        [(-((-a) ** 3) - p * a * a - q) / -a, L(lang, `Habis dibagi ${xm(a).slice(1, -1)} berarti f(${mi(a)}) = 0, bukan f(${mi(-a)}) = 0.`, `Divisible by ${xm(a).slice(1, -1)} means f(${mi(a)}) = 0, not f(${mi(-a)}) = 0.`)],
      ]),
      [`f(${mi(a)}) = 0`, `${mi(a ** 3 + p * a * a + q)} ${a < 0 ? '−' : '+'} ${Math.abs(a) === 1 ? '' : Math.abs(a)}k = 0 → k = ${mi(k)}`],
      { kind, a, p, q },
    );
  },
  (m) => {
    if (m.kind === 'rem') {
      // pembagian bersusun (Horner)
      let r = 0;
      for (const c of m.cs) r = r * m.a + c;
      return D(r);
    }
    return D(-(m.a ** 3 + m.p * m.a * m.a + m.q) / m.a);
  },
);

const factorPick = G(
  (rnd, lang) => {
    const roots = new Set();
    while (roots.size < 3) roots.add(nz(rnd, -4, 4));
    const rs = [...roots];
    const cs = mulPoly(mulPoly([1, -rs[0]], [1, -rs[1]]), [1, -rs[2]]);
    if (rnd() < 0.4) {
      // hasil bagi
      const okT = xmr(rs[1]);
      const f2 = mulPoly([1, -rs[0]], [1, -rs[1]]);
      return OPT(
        L(lang, `Hasil bagi ${pc(f2)} oleh (${xmr(rs[0])}) adalah …`, `The quotient of ${pc(f2)} divided by (${xmr(rs[0])}) is …`),
        okT,
        [
          [xmr(-rs[1]), L(lang, 'Perhatikan tanda: cek dengan mengalikan kembali.', 'Watch the sign: check by multiplying back.')],
          [xmr(rs[0] + rs[1]), L(lang, 'Cek dengan mengalikan kembali: hasilnya tidak sama dengan polinomial semula.', 'Check by multiplying back: it does not give the original polynomial.')],
          [`x² ${rs[1] > 0 ? '−' : '+'} ${Math.abs(rs[1])}`, L(lang, 'Membagi polinomial derajat 2 dengan derajat 1 menghasilkan derajat 1.', 'Dividing a degree-2 polynomial by degree 1 gives degree 1.')],
        ],
        [`${pc(f2)} = (${xmr(rs[0])})(${xmr(rs[1])})`, L(lang, `Hasil bagi: ${okT}`, `Quotient: ${okT}`)],
        { kind: 'quot', f2, r: rs[0] },
      );
    }
    const bad = [];
    for (let c = -5; c <= 5 && bad.length < 6; c++) if (c && !rs.includes(c)) bad.push(c);
    const pickBad = shuf(rnd, bad.sort((p, q) => Math.abs(rs.indexOf(-p)) - Math.abs(rs.indexOf(-q)))).slice(0, 3);
    const neg = rs.find((r) => !rs.includes(-r) && Math.abs(r) <= 5);
    const ds = [...(neg !== undefined ? [-neg] : []), ...pickBad].filter((c, i, arr) => arr.indexOf(c) === i && !rs.includes(c)).slice(0, 3);
    const okR = pick(rnd, rs);
    return OPT(
      L(lang, `Manakah faktor dari ${pc(cs)}?`, `Which is a factor of ${pc(cs)}?`),
      xmr(okR),
      ds.map((c) => [xmr(c), L(lang, `f(${mi(c)}) ≠ 0, jadi ${xmr(c)} bukan faktor.`, `f(${mi(c)}) ≠ 0, so ${xmr(c)} is not a factor.`)]),
      [L(lang, '(x − a) faktor jika f(a) = 0.', '(x − a) is a factor when f(a) = 0.'), `f(${mi(okR)}) = 0 → ${xmr(okR)}`],
      { kind: 'fac', cs, opts: [okR, ...ds] },
    );
  },
  (m) => {
    if (m.kind === 'quot') {
      // pembagian sintetis
      const b = m.f2[1] + m.r;
      return xmr(-b);
    }
    const ev = (x) => m.cs.reduce((s, c) => s * x + c, 0);
    return xmr(m.opts.find((c) => ev(c) === 0));
  },
);

// ================= Bab 3: Matriks =================
const rmat = (rnd, r, c, lo = -6, hi = 9) => Array.from({ length: r }, () => Array.from({ length: c }, () => ri(rnd, lo, hi)));
const matOrder = G(
  (rnd, lang) => {
    let r, c;
    do {
      r = ri(rnd, 1, 4);
      c = ri(rnd, 1, 4);
    } while (r === c || r * c < 2);
    const A = rmat(rnd, r, c);
    const okT = `${r} × ${c}`;
    return OPT(
      L(lang, `Matriks ${mat(A)} berordo …`, `The matrix ${mat(A)} has order …`),
      okT,
      [
        [`${c} × ${r}`, L(lang, 'Ordo ditulis baris × kolom.', 'Order is written rows × columns.')],
        [String(r * c), L(lang, 'Itu banyak elemennya. Ordo ditulis baris × kolom.', 'That is the number of entries. Order is rows × columns.')],
        [`${r} × ${r}`, L(lang, 'Hitung kolomnya: banyak elemen dalam satu baris.', 'Count the columns: entries in one row.')],
        [`${c} × ${c}`, L(lang, 'Hitung barisnya: banyak kurung di dalam.', 'Count the rows: the inner brackets.')],
      ],
      [L(lang, `${r} baris, ${c} kolom`, `${r} rows, ${c} columns`), okT],
      { A },
    );
  },
  (m) => `${m.A.length} × ${m.A[0].length}`,
);

const matElem = G(
  (rnd, lang) => {
    const r = ri(rnd, 2, 3);
    const c = ri(rnd, 2, 3);
    let A;
    do A = rmat(rnd, r, c);
    while (new Set(A.flat()).size < r * c);
    const tr = rnd() < 0.4;
    const i = ri(rnd, 1, 2);
    const j = i === 1 ? ri(rnd, 2, Math.min(r, c)) : 1;
    const ans = tr ? A[j - 1][i - 1] : A[i - 1][j - 1];
    const swapped = tr ? (i <= r && j <= c ? A[i - 1][j - 1] : null) : j <= r && i <= c ? A[j - 1][i - 1] : null;
    return NUM(
      tr ? L(lang, `Jika A = ${mat(A)}, elemen baris ${i} kolom ${j} dari Aᵗ adalah …`, `If A = ${mat(A)}, the entry in row ${i}, column ${j} of Aᵗ is …`) : L(lang, `Pada matriks ${mat(A)}, elemen a${sub(`${i}${j}`)} adalah …`, `In the matrix ${mat(A)}, the entry a${sub(`${i}${j}`)} is …`),
      D(ans),
      WR(D(ans), [[swapped, tr ? L(lang, 'Itu elemen A, belum ditranspos. Transpos menukar baris dan kolom.', 'That is from A itself. The transpose swaps rows and columns.') : L(lang, `a${sub(`${i}${j}`)} berarti baris ${i}, kolom ${j}. Baris dulu, baru kolom.`, `a${sub(`${i}${j}`)} means row ${i}, column ${j}. Row first, then column.`)]]),
      [tr ? L(lang, `Baris ${i} kolom ${j} dari Aᵗ = baris ${j} kolom ${i} dari A`, `Row ${i}, column ${j} of Aᵗ = row ${j}, column ${i} of A`) : L(lang, `Baris ${i}, kolom ${j}`, `Row ${i}, column ${j}`), `= ${mi(ans)}`],
      { A, i, j, tr },
    );
  },
  (m) => {
    const T = m.tr ? m.A[0].map((_, c) => m.A.map((row) => row[c])) : m.A;
    return D(T[m.i - 1][m.j - 1]);
  },
);

const matEq = G(
  (rnd, lang) => {
    const x = ri(rnd, -5, 9);
    const y = ri(rnd, -5, 9);
    const p = ri(rnd, -4, 6);
    const k = pick(rnd, [1, 2, 3]);
    const b = ri(rnd, -6, 9);
    const c = ri(rnd, -6, 9);
    const A = [
      [`x${plus(p)}`, mi(b)],
      [mi(c), `${k === 1 ? '' : k}y`],
    ];
    const B = [
      [x + p, b],
      [c, k * y],
    ];
    const ask = pick(rnd, ['x + y', 'x', 'y', 'x − y']);
    const ans = { 'x + y': x + y, x: x, y: y, 'x − y': x - y }[ask];
    return NUM(
      L(lang, `Jika [[${A[0].join(', ')}], [${A[1].join(', ')}]] = ${mat(B)}, nilai ${ask} adalah …`, `If [[${A[0].join(', ')}], [${A[1].join(', ')}]] = ${mat(B)}, the value of ${ask} is …`),
      D(ans),
      WR(D(ans), [
        [ask.includes('x') ? { 'x + y': x + p + y, x: x + p, y: null, 'x − y': x + p - y }[ask] : null, L(lang, `x${plus(p)} = ${mi(x + p)}, jadi x = ${mi(x)}.`, `x${plus(p)} = ${mi(x + p)}, so x = ${mi(x)}.`)],
        [k > 1 && ask.includes('y') ? { 'x + y': x + k * y, y: k * y, 'x − y': x - k * y, x: null }[ask] : null, L(lang, `${k}y = ${mi(k * y)}, jadi y = ${mi(y)}.`, `${k}y = ${mi(k * y)}, so y = ${mi(y)}.`)],
      ]),
      [L(lang, 'Elemen yang seletak sama.', 'Matching entries are equal.'), `x${plus(p)} = ${mi(x + p)} → x = ${mi(x)}; ${k === 1 ? '' : k}y = ${mi(k * y)} → y = ${mi(y)}`, `${ask} = ${mi(ans)}`],
      { p, k, B, ask },
    );
  },
  (m) => {
    const x = m.B[0][0] - m.p;
    const y = m.B[1][1] / m.k;
    return D({ 'x + y': x + y, x, y, 'x − y': x - y }[m.ask]);
  },
);

const matAdd = G(
  (rnd, lang) => {
    const A = rmat(rnd, 2, 2, -5, 6);
    const B = rmat(rnd, 2, 2, -5, 6);
    const kind = pick(rnd, ['+', '−', 'k']);
    const k = pick(rnd, [2, 3, -2, -1]);
    const R = A.map((r, i) => r.map((v, j) => (kind === '+' ? v + B[i][j] : kind === '−' ? v - B[i][j] : k * v)));
    const okT = mat(R);
    if (kind === 'k')
      return OPT(
        L(lang, `Jika A = ${mat(A)}, maka ${mi(k)}A = …`, `If A = ${mat(A)}, then ${mi(k)}A = …`),
        okT,
        [
          [mat(A.map((r, i) => r.map((v, j) => (i === 0 && j === 0 ? k * v : v)))), L(lang, 'Setiap elemen dikali skalar, bukan hanya elemen pertama.', 'Every entry is multiplied by the scalar, not just the first.')],
          [mat(A.map((r) => r.map((v) => v + k))), L(lang, 'Skalar mengalikan, bukan ditambahkan.', 'A scalar multiplies; it is not added.')],
          [mat(A.map((r) => r.map((v) => -k * v))), L(lang, 'Perhatikan tanda skalar.', 'Watch the sign of the scalar.')],
          [mat(A.map((r, i) => r.map((v, j) => (i === 0 ? k * v : v)))), L(lang, 'Baris kedua juga dikali.', 'The second row must be multiplied too.')],
        ],
        [L(lang, `Kalikan setiap elemen dengan ${mi(k)}.`, `Multiply every entry by ${mi(k)}.`), okT],
        { kind, A, k },
      );
    const s = kind === '+' ? 1 : -1;
    return OPT(
      `${mat(A)} ${kind} ${mat(B)} = …`,
      okT,
      [
        [mat(A.map((r, i) => r.map((v, j) => v - s * B[i][j]))), L(lang, kind === '+' ? 'Itu hasil pengurangan.' : 'Itu hasil penjumlahan.', kind === '+' ? 'That is the difference.' : 'That is the sum.')],
        [mat(R.map((r, i) => r.map((v, j) => (i === 1 && j === 1 ? A[1][1] - s * B[1][1] : v)))), L(lang, 'Elemen baris 2 kolom 2 salah hitung.', 'The entry in row 2, column 2 is wrong.')],
        [mat(R.map((r, i) => r.map((v, j) => (i === 0 && j === 1 ? A[0][1] - s * B[0][1] : v)))), L(lang, 'Elemen baris 1 kolom 2 salah hitung.', 'The entry in row 1, column 2 is wrong.')],
        [mat(A.map((r, i) => r.map((v, j) => v * B[i][j]))), L(lang, 'Elemen seletak dijumlah atau dikurang, bukan dikali.', 'Matching entries are added or subtracted, not multiplied.')],
      ],
      [L(lang, 'Operasikan elemen yang seletak.', 'Combine matching entries.'), okT],
      { kind, A, B },
    );
  },
  (m) => mat(m.A.map((r, i) => r.map((v, j) => (m.kind === 'k' ? m.k * v : m.kind === '+' ? v + m.B[i][j] : v - m.B[i][j])))),
);

const matMulEl = G(
  (rnd, lang) => {
    const A = rmat(rnd, 2, 2, -4, 6);
    const B = rmat(rnd, 2, 2, -4, 6);
    const i = ri(rnd, 1, 2);
    const j = ri(rnd, 1, 2);
    const ans = A[i - 1][0] * B[0][j - 1] + A[i - 1][1] * B[1][j - 1];
    return NUM(
      L(lang, `Jika A = ${mat(A)} dan B = ${mat(B)}, elemen baris ${i} kolom ${j} dari AB adalah …`, `If A = ${mat(A)} and B = ${mat(B)}, the entry in row ${i}, column ${j} of AB is …`),
      D(ans),
      WR(D(ans), [
        [A[i - 1][j - 1] * B[i - 1][j - 1], L(lang, 'Perkalian matriks bukan perkalian elemen seletak. Kalikan baris A dengan kolom B.', 'Matrix multiplication is not entry-by-entry. Multiply a row of A by a column of B.')],
        [A[0][j - 1] * B[i - 1][0] + A[1][j - 1] * B[i - 1][1], L(lang, `Itu elemen dari BA. Pakai baris ${i} dari A dan kolom ${j} dari B.`, `That entry is from BA. Use row ${i} of A and column ${j} of B.`)],
        [A[i - 1][0] * B[j - 1][0] + A[i - 1][1] * B[j - 1][1], L(lang, `Pakai kolom ${j} dari B, bukan baris ${j}.`, `Use column ${j} of B, not row ${j}.`)],
      ]),
      [L(lang, `Baris ${i} A × kolom ${j} B`, `Row ${i} of A × column ${j} of B`), `(${mi(A[i - 1][0])})(${mi(B[0][j - 1])}) + (${mi(A[i - 1][1])})(${mi(B[1][j - 1])}) = ${mi(ans)}`],
      { A, B, i, j },
    );
  },
  (m) => {
    let s = 0;
    for (let k = 0; k < 2; k++) s += m.A[m.i - 1][k] * m.B[k][m.j - 1];
    return D(s);
  },
);

const matDims = G(
  (rnd, lang) => {
    const m = ri(rnd, 1, 4);
    const n = ri(rnd, 2, 4);
    const p = ri(rnd, 1, 4);
    const ok = rnd() < 0.7;
    const n2 = ok ? n : pick(rnd, [1, 2, 3, 4, 5].filter((v) => v !== n));
    const okT = ok ? `${m} × ${p}` : L(lang, 'tidak bisa dikalikan', 'cannot be multiplied');
    return OPT(
      L(lang, `Matriks A berordo ${m} × ${n} dan B berordo ${n2} × ${p}. Ordo AB adalah …`, `Matrix A is ${m} × ${n} and B is ${n2} × ${p}. The order of AB is …`),
      okT,
      [
        [ok ? L(lang, 'tidak bisa dikalikan', 'cannot be multiplied') : `${m} × ${p}`, ok ? L(lang, `Kolom A (${n}) sama dengan baris B (${n2}), jadi bisa dikalikan.`, `Columns of A (${n}) equal rows of B (${n2}), so they can be multiplied.`) : L(lang, `Kolom A (${n}) tidak sama dengan baris B (${n2}).`, `Columns of A (${n}) do not equal rows of B (${n2}).`)],
        [`${n} × ${n2}`, L(lang, 'Ordo AB = baris A × kolom B.', 'The order of AB = rows of A × columns of B.')],
        [`${m} × ${n}`, L(lang, 'Itu ordo A. Ordo AB = baris A × kolom B.', 'That is the order of A. AB has rows of A × columns of B.')],
        [`${p} × ${m}`, L(lang, 'Urutannya baris A dulu, lalu kolom B.', 'Rows of A first, then columns of B.')],
      ],
      [L(lang, `Syarat: kolom A = baris B (${n} ${ok ? '=' : '≠'} ${n2}).`, `Condition: columns of A = rows of B (${n} ${ok ? '=' : '≠'} ${n2}).`), okT],
      { m, n, n2, p },
    );
  },
  (mm, lang) => (mm.n === mm.n2 ? `${mm.m} × ${mm.p}` : L(lang, 'tidak bisa dikalikan', 'cannot be multiplied')),
);

const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const matDet = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['det', 'x', 'k']);
    if (kind === 'det') {
      const A = rmat(rnd, 2, 2, -6, 9);
      const d = det2(A);
      return NUM(
        L(lang, `Determinan matriks ${mat(A)} adalah …`, `The determinant of ${mat(A)} is …`),
        D(d),
        WR(D(d), [
          [A[0][0] * A[1][1] + A[0][1] * A[1][0], L(lang, 'det = ad − bc. Dikurangi, bukan ditambah.', 'det = ad − bc. Subtract, do not add.')],
          [A[0][1] * A[1][0] - A[0][0] * A[1][1], L(lang, 'Urutannya ad − bc (diagonal utama dulu).', 'It is ad − bc (main diagonal first).')],
          [A[0][0] * A[0][1] - A[1][0] * A[1][1], L(lang, 'Kalikan secara diagonal, bukan per baris.', 'Multiply along the diagonals, not along rows.')],
        ]),
        [`det = (${mi(A[0][0])})(${mi(A[1][1])}) − (${mi(A[0][1])})(${mi(A[1][0])})`, `= ${mi(A[0][0] * A[1][1])} − ${A[0][1] * A[1][0] < 0 ? `(${mi(A[0][1] * A[1][0])})` : A[0][1] * A[1][0]} = ${mi(d)}`],
        { kind, A },
      );
    }
    if (kind === 'x') {
      const x = ri(rnd, 2, 8);
      const p = ri(rnd, 1, 6);
      const q = ri(rnd, -3, 6);
      const v = x * x - p * q;
      return NUM(
        L(lang, `Determinan [[x, ${p}], [${mi(q)}, x]] sama dengan ${mi(v)}. Jika x positif, nilai x adalah …`, `The determinant of [[x, ${p}], [${mi(q)}, x]] is ${mi(v)}. If x is positive, x = …`),
        D(x),
        WR(D(x), [
          [v + p * q, L(lang, `Itu x². Ambil akarnya.`, `That is x². Take the square root.`)],
          [Number.isInteger(Math.sqrt(v - p * q)) && v - p * q > 0 ? Math.sqrt(v - p * q) : null, L(lang, `x² − (${p})(${mi(q)}) = ${mi(v)}, jadi x² = ${mi(v)} + ${mi(p * q)}.`, `x² − (${p})(${mi(q)}) = ${mi(v)}, so x² = ${mi(v)} + ${mi(p * q)}.`)],
        ]),
        [`x² − ${p * q < 0 ? `(${mi(p * q)})` : p * q} = ${mi(v)} → x² = ${x * x}`, `x = ${x}`],
        { kind, p, q, v },
      );
    }
    const dA = nz(rnd, -6, 8);
    const k = pick(rnd, [2, 3, -2, 4]);
    return NUM(
      L(lang, `A matriks 2 × 2 dengan det A = ${mi(dA)}. Nilai det(${mi(k)}A) adalah …`, `A is a 2 × 2 matrix with det A = ${mi(dA)}. Find det(${mi(k)}A).`),
      D(k * k * dA),
      WR(D(k * k * dA), [
        [k * dA, L(lang, `Setiap baris dikali ${mi(k)}, jadi determinannya dikali ${mi(k)}² = ${k * k}.`, `Each row is multiplied by ${mi(k)}, so the determinant is multiplied by ${mi(k)}² = ${k * k}.`)],
        [-k * k * dA, L(lang, 'k² selalu positif.', 'k² is never negative.')],
      ]),
      [`det(kA) = k² × det A`, `= ${k * k} × ${mi(dA)} = ${mi(k * k * dA)}`],
      { kind, dA, k },
    );
  },
  (m) => {
    if (m.kind === 'det') return D(det2(m.A));
    if (m.kind === 'x') return D(Math.sqrt(m.v + m.p * m.q));
    const A = [
      [m.k * m.dA, 0],
      [0, m.k],
    ];
    return D(det2(A));
  },
);

const matInv = G(
  (rnd, lang) => {
    let A;
    do A = rmat(rnd, 2, 2, -4, 7);
    while (Math.abs(det2(A)) !== 1 || A.flat().filter((v) => v === 0).length > 1);
    const d = det2(A);
    const [[a, b], [c, e]] = A;
    const inv = [
      [e * d, -b * d],
      [-c * d, a * d],
    ];
    const okT = mat(inv);
    return OPT(
      L(lang, `Invers matriks ${mat(A)} (determinannya ${mi(d)}) adalah …`, `The inverse of ${mat(A)} (its determinant is ${mi(d)}) is …`),
      okT,
      [
        [mat([[e, b], [c, a]].map((r) => r.map((v) => v * d))), L(lang, 'Elemen b dan c juga berganti tanda.', 'Entries b and c must also change sign.')],
        [mat([[-a, -b], [-c, -e]].map((r) => r.map((v) => v * d))), L(lang, 'a dan d ditukar letaknya, b dan c diganti tandanya.', 'Swap a and d; change the signs of b and c.')],
        [mat([[a, c], [b, e]]), L(lang, 'Itu transpos, bukan invers.', 'That is the transpose, not the inverse.')],
        [mat([[e, -b], [-c, a]].map((r) => r.map((v) => -v * d))), L(lang, `Kalikan dengan 1/det = ${mi(d)}. Perhatikan tandanya.`, `Multiply by 1/det = ${mi(d)}. Watch the sign.`)],
      ],
      [`A⁻¹ = (1/det) × [[d, −b], [−c, a]]`, `= ${mi(d)} × ${mat([[e, -b], [-c, a]])} = ${okT}`],
      { A },
    );
  },
  (m) => {
    // selesaikan A·X = I kolom demi kolom dengan aturan Cramer
    const [[a, b], [c, d]] = m.A;
    const dt = a * d - b * c;
    const col = (e1, e2) => [(e1 * d - b * e2) / dt, (a * e2 - c * e1) / dt];
    const [p, q] = col(1, 0);
    const [r, s] = col(0, 1);
    return mat([
      [p, r],
      [q, s],
    ]);
  }
);

const matSing = G(
  (rnd, lang) => {
    const a = nz(rnd, -4, 5);
    const b = nz(rnd, -4, 5);
    const k = pick(rnd, [2, 3, -2, -1]);
    const S = [
      [a, b],
      [k * a, k * b],
    ];
    const Sx = rnd() < 0.5 ? S : [S[1], S[0]];
    const others = [];
    while (others.length < 3) {
      const B = rmat(rnd, 2, 2, -4, 6);
      if (det2(B) !== 0 && !others.some((o) => mat(o) === mat(B))) others.push(B);
    }
    return OPT(
      L(lang, 'Matriks manakah yang singular (tidak punya invers)?', 'Which matrix is singular (has no inverse)?'),
      mat(Sx),
      others.map((B) => [mat(B), L(lang, `Determinannya ${mi(det2(B))}, bukan 0.`, `Its determinant is ${mi(det2(B))}, not 0.`)]),
      [L(lang, 'Matriks singular memiliki determinan 0.', 'A singular matrix has determinant 0.'), `det ${mat(Sx)} = ${mi(Sx[0][0] * Sx[1][1])} − ${Sx[0][1] * Sx[1][0] < 0 ? `(${mi(Sx[0][1] * Sx[1][0])})` : Sx[0][1] * Sx[1][0]} = 0`],
      { all: [Sx, ...others] },
    );
  },
  (m) => mat(m.all.find((A) => det2(A) === 0)),
);

// ================= Bab 4: Transformasi =================
const TR = {
  sx: { id: 'sumbu x', en: 'the x-axis', M: [[1, 0], [0, -1]] },
  sy: { id: 'sumbu y', en: 'the y-axis', M: [[-1, 0], [0, 1]] },
  yx: { id: 'garis y = x', en: 'the line y = x', M: [[0, 1], [1, 0]] },
  ynx: { id: 'garis y = −x', en: 'the line y = −x', M: [[0, -1], [-1, 0]] },
  o: { id: 'titik asal O', en: 'the origin O', M: [[-1, 0], [0, -1]] },
};
const app = (Mx, [x, y]) => [Mx[0][0] * x + Mx[0][1] * y, Mx[1][0] * x + Mx[1][1] * y];
const reflPoint = G(
  (rnd, lang) => {
    const P0 = [nz(rnd, -6, 6), nz(rnd, -6, 6)];
    if (Math.abs(P0[0]) === Math.abs(P0[1])) P0[1] += P0[1] > 0 ? 1 : -1;
    if (rnd() < 0.3) {
      const t = [nz(rnd, -5, 5), nz(rnd, -5, 5)];
      const okT = pt(P0[0] + t[0], P0[1] + t[1]);
      return OPT(
        L(lang, `Bayangan titik ${pt(...P0)} oleh translasi ${pt(...t)} adalah …`, `The image of ${pt(...P0)} under the translation ${pt(...t)} is …`),
        okT,
        [
          [pt(P0[0] - t[0], P0[1] - t[1]), L(lang, 'Translasi menambahkan vektornya, bukan mengurangi.', 'A translation adds the vector; it does not subtract.')],
          [pt(P0[0] * t[0], P0[1] * t[1]), L(lang, 'Translasi bukan perkalian.', 'A translation is not multiplication.')],
          [pt(P0[0] + t[0], P0[1] - t[1]), L(lang, 'Komponen kedua juga ditambahkan.', 'Add the second component too.')],
          [pt(P0[0] + t[1], P0[1] + t[0]), L(lang, 'Komponen x ditambah ke x, y ke y.', 'Add x to x and y to y.')],
        ],
        [`(${mi(P0[0])} + ${t[0] < 0 ? `(${mi(t[0])})` : t[0]}, ${mi(P0[1])} + ${t[1] < 0 ? `(${mi(t[1])})` : t[1]})`, `= ${okT}`],
        { kind: 't', P0, t },
      );
    }
    const k = pick(rnd, Object.keys(TR));
    const okT = pt(...app(TR[k].M, P0));
    return OPT(
      L(lang, `Bayangan titik ${pt(...P0)} oleh refleksi terhadap ${TR[k].id} adalah …`, `The image of ${pt(...P0)} under reflection in ${TR[k].en} is …`),
      okT,
      Object.keys(TR)
        .filter((o) => o !== k)
        .map((o) => [pt(...app(TR[o].M, P0)), L(lang, `Itu refleksi terhadap ${TR[o].id}.`, `That is reflection in ${TR[o].en}.`)]),
      [L(lang, `Matriks refleksi terhadap ${TR[k].id}: ${mat(TR[k].M)}`, `Reflection matrix for ${TR[k].en}: ${mat(TR[k].M)}`), `${mat(TR[k].M)} × ${pt(...P0)} = ${okT}`],
      { kind: 'r', P0, k },
    );
  },
  (m) => {
    if (m.kind === 't') return pt(m.P0[0] + m.t[0], m.P0[1] + m.t[1]);
    // pencerminan dengan rumus geometri
    const [x, y] = m.P0;
    return pt(...{ sx: [x, -y], sy: [-x, y], yx: [y, x], ynx: [-y, -x], o: [-x, -y] }[m.k]);
  },
);

const ROTS = {
  r90: { id: 'rotasi 90° berlawanan arah jarum jam', en: 'rotation by 90° anticlockwise', M: [[0, -1], [1, 0]] },
  r270: { id: 'rotasi 90° searah jarum jam', en: 'rotation by 90° clockwise', M: [[0, 1], [-1, 0]] },
  r180: { id: 'rotasi 180°', en: 'rotation by 180°', M: [[-1, 0], [0, -1]] },
};
const ALLT = (lang) => [
  ...Object.values(TR).map((t) => [L(lang, `refleksi terhadap ${t.id}`, `reflection in ${t.en}`), t.M]),
  ...Object.values(ROTS).map((t) => [L(lang, t.id, t.en), t.M]),
];
const matMeaning = G(
  (rnd, lang) => {
    const all = ALLT(lang).filter((t, i) => i !== 4); // refleksi O sama dengan rotasi 180°
    const i = ri(rnd, 0, all.length - 1);
    const [name, Mx] = all[i];
    if (rnd() < 0.5) {
      return OPT(
        L(lang, `Matriks ${mat(Mx)} menyatakan …`, `The matrix ${mat(Mx)} represents …`),
        name,
        shuf(rnd, all.filter((_, j) => j !== i)).map(([n2, M2]) => [n2, L(lang, `Matriks ${n2} adalah ${mat(M2)}.`, `The matrix for ${n2} is ${mat(M2)}.`)]),
        [L(lang, 'Lihat ke mana titik (1, 0) dan (0, 1) dipetakan: kolom-kolom matriks.', 'See where (1, 0) and (0, 1) go: the columns of the matrix.'), name],
        { i, dir: 'name' },
      );
    }
    return OPT(
      L(lang, `Matriks ${name} adalah …`, `The matrix for ${name} is …`),
      mat(Mx),
      shuf(rnd, all.filter((_, j) => j !== i)).map(([n2, M2]) => [mat(M2), L(lang, `Itu matriks ${n2}.`, `That is the matrix for ${n2}.`)]),
      [L(lang, 'Kolom pertama = bayangan (1, 0), kolom kedua = bayangan (0, 1).', 'Column 1 = image of (1, 0), column 2 = image of (0, 1).'), mat(Mx)],
      { i, dir: 'mat' },
    );
  },
  (m, lang) => {
    const all = ALLT(lang).filter((t, i) => i !== 4);
    return m.dir === 'name' ? all[m.i][0] : mat(all[m.i][1]);
  },
);

const rotDil = G(
  (rnd, lang) => {
    const P0 = [nz(rnd, -6, 6), nz(rnd, -6, 6)];
    if (Math.abs(P0[0]) === Math.abs(P0[1])) P0[0] += P0[0] > 0 ? 1 : -1;
    if (rnd() < 0.3) {
      const k = pick(rnd, [2, 3, -2, 4]);
      const okT = pt(k * P0[0], k * P0[1]);
      return OPT(
        L(lang, `Bayangan titik ${pt(...P0)} oleh dilatasi faktor ${mi(k)} dengan pusat O adalah …`, `The image of ${pt(...P0)} under a dilation with factor ${mi(k)} about O is …`),
        okT,
        [
          [pt(P0[0] + k, P0[1] + k), L(lang, 'Dilatasi mengalikan koordinat, bukan menambah.', 'A dilation multiplies the coordinates; it does not add.')],
          [pt(-k * P0[0], -k * P0[1]), L(lang, 'Perhatikan tanda faktor skala.', 'Watch the sign of the scale factor.')],
          [pt(k * P0[0], P0[1]), L(lang, 'Kedua koordinat dikali.', 'Both coordinates are multiplied.')],
        ],
        [`${mi(k)} × ${pt(...P0)} = ${okT}`],
        { kind: 'd', P0, k },
      );
    }
    const key = pick(rnd, Object.keys(ROTS));
    const okT = pt(...app(ROTS[key].M, P0));
    return OPT(
      L(lang, `Bayangan titik ${pt(...P0)} oleh ${ROTS[key].id} dengan pusat O adalah …`, `The image of ${pt(...P0)} under ${ROTS[key].en} about O is …`),
      okT,
      [
        ...Object.keys(ROTS)
          .filter((o) => o !== key)
          .map((o) => [pt(...app(ROTS[o].M, P0)), L(lang, `Itu ${ROTS[o].id}.`, `That is ${ROTS[o].en}.`)]),
        [pt(P0[1], P0[0]), L(lang, 'Itu refleksi terhadap garis y = x, bukan rotasi.', 'That is reflection in y = x, not a rotation.')],
      ],
      [`${mat(ROTS[key].M)} × ${pt(...P0)}`, `= ${okT}`],
      { kind: 'r', P0, key },
    );
  },
  (m) => {
    if (m.kind === 'd') return pt(m.k * m.P0[0], m.P0[1] * m.k);
    const ang = { r90: 90, r270: -90, r180: 180 }[m.key];
    const t = (ang * Math.PI) / 180;
    const [x, y] = m.P0;
    return pt(Math.round(x * Math.cos(t) - y * Math.sin(t)), Math.round(x * Math.sin(t) + y * Math.cos(t)));
  },
);

const dilArea = G(
  (rnd, lang) => {
    const A = ri(rnd, 2, 15);
    const k = pick(rnd, [2, 3, 4, -2, -3, 5]);
    const fig = pick(rnd, [L(lang, 'Segitiga', 'A triangle'), L(lang, 'Persegi panjang', 'A rectangle'), L(lang, 'Jajargenjang', 'A parallelogram')]);
    return NUM(
      L(lang, `${fig} dengan luas ${A} satuan didilatasi dengan faktor ${mi(k)}. Luas bayangannya adalah … satuan`, `${fig} with area ${A} square units is dilated by a factor of ${mi(k)}. The area of the image is … square units`),
      D(k * k * A),
      WR(D(k * k * A), [
        [Math.abs(k) * A, L(lang, `Panjang dikali ${Math.abs(k)}, jadi luas dikali ${k * k}.`, `Lengths are multiplied by ${Math.abs(k)}, so area is multiplied by ${k * k}.`)],
        [k * A, L(lang, 'Luas tidak pernah negatif, dan dikali k².', 'Area is never negative, and it is multiplied by k².')],
      ]),
      [L(lang, 'Luas bayangan = k² × luas awal', 'Image area = k² × original area'), `= ${k * k} × ${A} = ${k * k * A}`],
      { A, k },
    );
  },
  (m) => D(m.A * m.k * m.k),
);

const TF = (lang) => ({
  sx: [L(lang, 'dicerminkan terhadap sumbu x', 'reflected in the x-axis'), [[1, 0], [0, -1]]],
  sy: [L(lang, 'dicerminkan terhadap sumbu y', 'reflected in the y-axis'), [[-1, 0], [0, 1]]],
  yx: [L(lang, 'dicerminkan terhadap garis y = x', 'reflected in the line y = x'), [[0, 1], [1, 0]]],
  r90: [L(lang, 'diputar 90° berlawanan arah jarum jam dengan pusat O', 'rotated 90° anticlockwise about O'), [[0, -1], [1, 0]]],
  r180: [L(lang, 'diputar 180° dengan pusat O', 'rotated 180° about O'), [[-1, 0], [0, -1]]],
  d2: [L(lang, 'didilatasi dengan faktor 2 dan pusat O', 'dilated by factor 2 about O'), [[2, 0], [0, 2]]],
});
const composite = G(
  (rnd, lang) => {
    const tf = TF(lang);
    const keys = Object.keys(tf);
    let k1, k2, P0, res, rev;
    do {
      k1 = pick(rnd, keys);
      k2 = pick(rnd, keys.filter((k) => k !== k1));
      P0 = [nz(rnd, -5, 5), nz(rnd, -5, 5)];
      res = app(tf[k2][1], app(tf[k1][1], P0));
      rev = app(tf[k1][1], app(tf[k2][1], P0));
    } while (Math.abs(P0[0]) === Math.abs(P0[1]) || (res[0] === rev[0] && res[1] === rev[1] && rnd() < 0.7));
    const okT = pt(...res);
    const mid = app(tf[k1][1], P0);
    return OPT(
      L(lang, `Titik ${pt(...P0)} ${tf[k1][0]}, lalu ${tf[k2][0]}. Bayangannya …`, `The point ${pt(...P0)} is ${tf[k1][0]}, then ${tf[k2][0]}. Its image is …`),
      okT,
      [
        [pt(...rev), L(lang, 'Urutannya terbalik. Kerjakan transformasi pertama lebih dulu.', 'The order is reversed. Apply the first transformation first.')],
        [pt(...mid), L(lang, 'Itu baru hasil transformasi pertama.', 'That is only after the first transformation.')],
        [pt(...app(tf[k2][1], P0)), L(lang, 'Transformasi pertama terlewat.', 'The first transformation was skipped.')],
        [pt(-res[0], -res[1]), L(lang, 'Periksa tanda hasil akhirnya.', 'Check the signs of the final result.')],
      ],
      [L(lang, `Pertama: ${pt(...mid)}`, `First: ${pt(...mid)}`), L(lang, `Kedua: ${okT}`, `Second: ${okT}`)],
      { k1, k2, P0 },
    );
  },
  (m) => {
    // matriks gabungan B × A
    const tf = TF('id');
    const A = tf[m.k1][1];
    const B = tf[m.k2][1];
    const BA = [0, 1].map((i) => [0, 1].map((j) => B[i][0] * A[0][j] + B[i][1] * A[1][j]));
    return pt(...app(BA, m.P0));
  },
);

const compMatrix = G(
  (rnd, lang) => {
    const tf = TF(lang);
    const keys = ['sx', 'sy', 'yx', 'r90'];
    const k1 = pick(rnd, keys);
    const k = pick(rnd, [2, 3, -2, 4]);
    const Mx = tf[k1][1].map((r) => r.map((v) => v * k));
    const okT = mat(Mx);
    return OPT(
      L(lang, `Matriks transformasi untuk "${tf[k1][0]}, kemudian didilatasi dengan faktor ${mi(k)} dan pusat O" adalah …`, `The matrix for "${tf[k1][0]}, then dilated by factor ${mi(k)} about O" is …`),
      okT,
      [
        [mat(tf[k1][1]), L(lang, `Dilatasi faktor ${mi(k)} belum dikalikan.`, `The dilation by ${mi(k)} has not been applied.`)],
        [mat(tf[k1][1].map((r, i) => r.map((v, j) => v + (i === j ? k : 0)))), L(lang, 'Komposisi berarti perkalian matriks, bukan penjumlahan.', 'Composition means multiplying matrices, not adding them.')],
        [mat(tf[k1][1].map((r) => r.map((v) => -v * k))), L(lang, 'Perhatikan tanda.', 'Watch the signs.')],
        [mat([[k, 0], [0, k]]), L(lang, 'Itu hanya matriks dilatasinya.', 'That is only the dilation matrix.')],
      ],
      [L(lang, `Matriks gabungan = D × T = ${mat([[k, 0], [0, k]])} × ${mat(tf[k1][1])}`, `Combined matrix = D × T = ${mat([[k, 0], [0, k]])} × ${mat(tf[k1][1])}`), okT],
      { k1, k },
    );
  },
  (m) => {
    const T = TF('id')[m.k1][1];
    const Dm = [
      [m.k, 0],
      [0, m.k],
    ];
    return mat([0, 1].map((i) => [0, 1].map((j) => Dm[i][0] * T[0][j] + Dm[i][1] * T[1][j])));
  },
);

// ================= Bab 5: Fungsi dan pemodelan =================
const trigGraph = G(
  (rnd, lang) => {
    const a = nz(rnd, -6, 6);
    const b = pick(rnd, [1, 2, 3, 4, 5, 6]);
    const d = ri(rnd, -5, 8);
    const f = pick(rnd, ['sin', 'cos']);
    const kind = pick(rnd, ['amp', 'per', 'max', 'min']);
    const ex = `y = ${a === 1 ? '' : a === -1 ? '−' : mi(a) + ' '}${f} ${b === 1 ? 'x' : `${b}x`}${plus(d)}`;
    const ans = { amp: Math.abs(a), per: 360 / b, max: d + Math.abs(a), min: d - Math.abs(a) }[kind];
    const name = { amp: L(lang, 'Amplitudo', 'The amplitude of'), per: L(lang, 'Periode', 'The period of'), max: L(lang, 'Nilai maksimum', 'The maximum value of'), min: L(lang, 'Nilai minimum', 'The minimum value of') }[kind];
    return NUM(
      L(lang, `${name} fungsi ${ex} adalah …${kind === 'per' ? ' °' : ''}`, `${name} ${ex} is …${kind === 'per' ? ' °' : ''}`),
      D(ans),
      WR(D(ans), [
        [kind === 'per' ? 360 * b : null, L(lang, `Periode = 360° ÷ ${b}, bukan dikali.`, `Period = 360° ÷ ${b}, not times.`)],
        [kind === 'per' ? 360 : null, L(lang, `Koefisien x (${b}) mengubah periode.`, `The coefficient of x (${b}) changes the period.`)],
        [kind === 'amp' ? a : null, L(lang, 'Amplitudo selalu positif: |a|.', 'Amplitude is always positive: |a|.')],
        [kind === 'amp' || kind === 'max' ? Math.abs(a) + d * (kind === 'amp' ? 1 : 0) : null, L(lang, kind === 'amp' ? 'Konstanta yang ditambahkan menggeser grafik, tidak mengubah amplitudo.' : `Tambahkan ${mi(d)}.`, kind === 'amp' ? 'The added constant shifts the graph; it does not change the amplitude.' : `Add ${mi(d)}.`)],
        [kind === 'max' ? d + a : kind === 'min' ? d + Math.abs(a) : null, L(lang, kind === 'max' ? 'Maksimum = konstanta + |a|.' : 'Minimum = konstanta − |a|.', kind === 'max' ? 'Maximum = constant + |a|.' : 'Minimum = constant − |a|.')],
        [kind === 'min' ? -Math.abs(a) : null, L(lang, `Jangan lupa konstanta ${mi(d)}.`, `Do not forget the constant ${mi(d)}.`)],
      ]),
      [{ amp: `|${mi(a)}| = ${Math.abs(a)}`, per: `360° ÷ ${b} = ${M(lang, 360 / b)}°`, max: `${mi(d)} + ${Math.abs(a)} = ${mi(ans)}`, min: `${mi(d)} − ${Math.abs(a)} = ${mi(ans)}` }[kind], L(lang, `${f} bernilai antara −1 dan 1.`, `${f} takes values between −1 and 1.`)],
      { a, b, d, kind },
    );
  },
  (m) => {
    if (m.kind === 'per') return D(360 / m.b);
    let mx = -Infinity;
    let mn = Infinity;
    for (let t = 0; t <= 360; t++) {
      const v = m.a * Math.sin((t * Math.PI) / 180) + m.d;
      mx = Math.max(mx, v);
      mn = Math.min(mn, v);
    }
    return D(Math.round({ amp: (mx - mn) / 2, max: mx, min: mn }[m.kind] * 1e6) / 1e6);
  },
);

const TRIG_POOL = [
  ['Grafik y = sin x untuk 0° ≤ x ≤ 360° memotong sumbu x di …', 'For 0° ≤ x ≤ 360°, y = sin x crosses the x-axis at …', '0°, 180°, dan 360°', '0°, 180° and 360°', [['90° dan 270°', '90° and 270°', 'Itu titik potong y = cos x.', 'Those are where y = cos x crosses.'], ['0° dan 360° saja', '0° and 360° only', 'sin 180° = 0 juga.', 'sin 180° = 0 too.'], ['45° dan 225°', '45° and 225°', 'sin 45° = ½√2, bukan 0.', 'sin 45° = ½√2, not 0.']]],
  ['Grafik y = cos x untuk 0° ≤ x ≤ 360° memotong sumbu x di …', 'For 0° ≤ x ≤ 360°, y = cos x crosses the x-axis at …', '90° dan 270°', '90° and 270°', [['0°, 180°, dan 360°', '0°, 180° and 360°', 'Itu titik potong y = sin x.', 'Those are where y = sin x crosses.'], ['180° saja', '180° only', 'cos 180° = −1, bukan 0.', 'cos 180° = −1, not 0.'], ['45° dan 135°', '45° and 135°', 'cos 45° = ½√2, bukan 0.', 'cos 45° = ½√2, not 0.']]],
  ['Pada 0° ≤ x ≤ 360°, y = sin x mencapai nilai maksimum di x = …', 'For 0° ≤ x ≤ 360°, y = sin x reaches its maximum at x = …', '90°', '90°', [['0°', '0°', 'sin 0° = 0.', 'sin 0° = 0.'], ['180°', '180°', 'sin 180° = 0.', 'sin 180° = 0.'], ['270°', '270°', 'sin 270° = −1, itu minimum.', 'sin 270° = −1, the minimum.']]],
  ['Pada 0° ≤ x ≤ 360°, y = sin x mencapai nilai minimum di x = …', 'For 0° ≤ x ≤ 360°, y = sin x reaches its minimum at x = …', '270°', '270°', [['90°', '90°', 'sin 90° = 1, itu maksimum.', 'sin 90° = 1, the maximum.'], ['180°', '180°', 'sin 180° = 0.', 'sin 180° = 0.'], ['360°', '360°', 'sin 360° = 0.', 'sin 360° = 0.']]],
  ['Pada 0° ≤ x ≤ 360°, y = cos x mencapai nilai minimum di x = …', 'For 0° ≤ x ≤ 360°, y = cos x reaches its minimum at x = …', '180°', '180°', [['0°', '0°', 'cos 0° = 1, itu maksimum.', 'cos 0° = 1, the maximum.'], ['90°', '90°', 'cos 90° = 0.', 'cos 90° = 0.'], ['270°', '270°', 'cos 270° = 0.', 'cos 270° = 0.']]],
  ['Grafik y = cos x memotong sumbu y di titik …', 'The graph of y = cos x crosses the y-axis at …', '(0, 1)', '(0, 1)', [['(0, 0)', '(0, 0)', 'cos 0° = 1, bukan 0.', 'cos 0° = 1, not 0.'], ['(90, 0)', '(90, 0)', 'Itu titik potong sumbu x.', 'That is an x-intercept.'], ['(0, −1)', '(0, −1)', 'cos 0° = 1.', 'cos 0° = 1.']]],
  ['Nilai y = sin x selalu berada pada rentang …', 'The values of y = sin x always lie in …', '−1 ≤ y ≤ 1', '−1 ≤ y ≤ 1', [['0 ≤ y ≤ 1', '0 ≤ y ≤ 1', 'sin x juga bisa negatif, misalnya sin 270° = −1.', 'sin x can be negative, e.g. sin 270° = −1.'], ['0 ≤ y ≤ 360', '0 ≤ y ≤ 360', 'Itu rentang sudut, bukan nilai.', 'That is the range of angles, not values.'], ['semua bilangan real', 'all real numbers', 'sin x tidak pernah lebih dari 1.', 'sin x never exceeds 1.']]],
  ['Grafik y = −sin x adalah grafik y = sin x yang …', 'The graph of y = −sin x is y = sin x …', 'dicerminkan terhadap sumbu x', 'reflected in the x-axis', [['digeser 1 ke bawah', 'shifted 1 down', 'Itu y = sin x − 1.', 'That is y = sin x − 1.'], ['dicerminkan terhadap sumbu y', 'reflected in the y-axis', 'Itu y = sin(−x). Untuk sinus hasilnya sama, tetapi tanda minus di luar berarti cermin sumbu x.', 'That is y = sin(−x). The outer minus means reflection in the x-axis.'], ['periodenya menjadi negatif', 'given a negative period', 'Periode tidak pernah negatif.', 'A period is never negative.']]],
  ['Grafik y = sin x + 3 adalah grafik y = sin x yang …', 'The graph of y = sin x + 3 is y = sin x …', 'digeser 3 satuan ke atas', 'shifted 3 units up', [['digeser 3 satuan ke kanan', 'shifted 3 units right', 'Geser kanan mengubah x, misalnya sin(x − 3).', 'A right shift changes x, like sin(x − 3).'], ['amplitudonya menjadi 3', 'given amplitude 3', 'Amplitudo adalah pengali di depan sin.', 'The amplitude is the multiplier in front of sin.'], ['periodenya menjadi 3', 'given period 3', 'Periode ditentukan oleh koefisien x.', 'The period depends on the coefficient of x.']]],
  ['Periode fungsi y = tan x adalah …', 'The period of y = tan x is …', '180°', '180°', [['360°', '360°', 'Itu periode sin x dan cos x.', 'That is the period of sin x and cos x.'], ['90°', '90°', 'tan x berulang setiap 180°.', 'tan x repeats every 180°.'], ['tidak ada', 'none', 'tan x tetap periodik.', 'tan x is still periodic.']]],
];
const trigPool = G(
  (rnd, lang) => {
    const i = ri(rnd, 0, TRIG_POOL.length - 1);
    const [qi, qe, ai, ae, ds] = TRIG_POOL[i];
    return OPT(L(lang, qi, qe), L(lang, ai, ae), ds.map((d) => [L(lang, d[0], d[1]), L(lang, d[2], d[3])]), [L(lang, 'Ingat nilai sin dan cos di 0°, 90°, 180°, 270°, 360°: sin 0, 1, 0, −1, 0; cos 1, 0, −1, 0, 1.', 'Recall sin and cos at 0°, 90°, 180°, 270°, 360°: sin 0, 1, 0, −1, 0; cos 1, 0, −1, 0, 1.'), L(lang, ai, ae)], { i });
  },
  (m, lang) => L(lang, TRIG_POOL[m.i][2], TRIG_POOL[m.i][3]),
);

const logGraph = G(
  (rnd, lang) => {
    const b = pick(rnd, [2, 3, 5, 10]);
    const k = ri(rnd, -2, b === 10 ? 4 : 5);
    const x = k >= 0 ? b ** k : `1/${b ** -k}`;
    const findY = rnd() < 0.6;
    if (findY)
      return NUM(
        L(lang, `Titik (${x}, b) terletak pada grafik y = ${lg(b, 'x')}. Nilai b adalah …`, `The point (${x}, b) lies on y = ${lg(b, 'x')}. Find b.`),
        D(k),
        WR(D(k), [
          [k >= 0 && b ** k / b !== k ? b ** k / b : null, L(lang, 'Logaritma menanyakan pangkat, bukan hasil bagi.', 'A logarithm asks for the power, not a quotient.')],
          [-k, L(lang, 'Perhatikan tandanya.', 'Watch the sign.')],
        ]),
        [`b = ${lg(b, x)}`, `${b}${sup(k)} = ${x} → b = ${mi(k)}`],
        { b, k, findY },
      );
    return NUM(
      L(lang, `Titik (a, ${mi(k)}) terletak pada grafik y = ${lg(b, 'x')}. Nilai a adalah … ${k < 0 ? L(lang, '(boleh pecahan)', '(fraction allowed)') : ''}`.trim(), `The point (a, ${mi(k)}) lies on y = ${lg(b, 'x')}. Find a. ${k < 0 ? '(fraction allowed)' : ''}`.trim()),
      k >= 0 ? D(b ** k) : F(1, b ** -k),
      WR(k >= 0 ? D(b ** k) : F(1, b ** -k), [
        [b * k, L(lang, `a = ${b}${sup(k)}, bukan ${b} × ${mi(k)}.`, `a = ${b}${sup(k)}, not ${b} × ${mi(k)}.`)],
        [k ** b, L(lang, 'Basisnya yang dipangkatkan.', 'The base is raised to the power.')],
        [k < 0 ? -(b ** -k) : null, L(lang, 'Pangkat negatif berarti kebalikan, bukan bilangan negatif.', 'A negative power means a reciprocal, not a negative number.')],
      ]),
      [`${mi(k)} = ${lg(b, 'a')} → a = ${b}${sup(k)}`, `a = ${x}`],
      { b, k, findY },
    );
  },
  (m) => (m.findY ? D(m.k) : m.k >= 0 ? D(Math.pow(m.b, m.k)) : F(1, Math.pow(m.b, -m.k))),
);

const logModel = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['db', 'ph', 'h']);
    if (kind === 'db') {
      const B = ri(rnd, 3, 7) * 10;
      const k = ri(rnd, 1, 4);
      return NUM(
        L(lang, `Suara A ${B + 10 * k} dB dan suara B ${B} dB. Intensitas suara A adalah … kali intensitas suara B`, `Sound A is ${B + 10 * k} dB and sound B is ${B} dB. The intensity of A is … times that of B`),
        D(10 ** k),
        WR(D(10 ** k), [
          [10 * k, L(lang, `Setiap naik 10 dB, intensitas dikali 10. Naik ${10 * k} dB berarti dikali 10${sup(k)}.`, `Each 10 dB rise multiplies intensity by 10. A ${10 * k} dB rise multiplies it by 10${sup(k)}.`)],
          [(B + 10 * k) / B, L(lang, 'Skala desibel adalah skala logaritma, bukan perbandingan biasa.', 'The decibel scale is logarithmic, not a plain ratio.')],
          [k, L(lang, `${k} adalah selisih log-nya. Intensitasnya 10${sup(k)} kali.`, `${k} is the difference in logs. The intensity ratio is 10${sup(k)}.`)],
        ]),
        [L(lang, `Selisih ${10 * k} dB = ${k} × 10 dB`, `Difference ${10 * k} dB = ${k} × 10 dB`), `10${sup(k)} = ${10 ** k}`],
        { kind, d: 10 * k },
      );
    }
    const p = ri(rnd, 1, 13);
    if (kind === 'ph')
      return NUM(
        L(lang, `pH larutan dihitung dengan pH = −log[H⁺]. Jika [H⁺] = 10${sup(-p)}, nilai pH adalah …`, `pH is computed as pH = −log[H⁺]. If [H⁺] = 10${sup(-p)}, the pH is …`),
        D(p),
        WR(D(p), [[-p, L(lang, 'Ada tanda minus di depan log, jadi hasilnya positif.', 'There is a minus sign in front of log, so the result is positive.')]]),
        [`log 10${sup(-p)} = ${mi(-p)}`, `pH = −(${mi(-p)}) = ${p}`],
        { kind, p },
      );
    return NUM(
      L(lang, `pH suatu larutan adalah ${p}. Dengan pH = −log[H⁺], konsentrasi [H⁺] = 10ⁿ. Nilai n adalah …`, `A solution has pH ${p}. With pH = −log[H⁺], the concentration is [H⁺] = 10ⁿ. Find n.`),
      D(-p),
      WR(D(-p), [[p, L(lang, `log[H⁺] = −${p}, jadi pangkatnya negatif.`, `log[H⁺] = −${p}, so the power is negative.`)]]),
      [`log[H⁺] = −${p}`, `[H⁺] = 10${sup(-p)} → n = ${mi(-p)}`],
      { kind, p },
    );
  },
  (m) => (m.kind === 'db' ? D(Math.pow(10, m.d / 10)) : m.kind === 'ph' ? D(-Math.log10(Math.pow(10, -m.p))) : D(Math.log10(Math.pow(10, -m.p)))),
);

const logDomain = G(
  (rnd, lang) => {
    const a = nz(rnd, -6, 6);
    const b = pick(rnd, [2, 3, 10]);
    const okT = `x > ${mi(a)}`;
    return OPT(
      L(lang, `Daerah asal fungsi y = ${lg(b, `(x ${a > 0 ? '−' : '+'} ${Math.abs(a)})`)} adalah …`, `The domain of y = ${lg(b, `(x ${a > 0 ? '−' : '+'} ${Math.abs(a)})`)} is …`),
      okT,
      [
        [`x > ${mi(-a)}`, L(lang, `x ${a > 0 ? '−' : '+'} ${Math.abs(a)} > 0 berarti x > ${mi(a)}.`, `x ${a > 0 ? '−' : '+'} ${Math.abs(a)} > 0 means x > ${mi(a)}.`)],
        [`x ≥ ${mi(a)}`, L(lang, 'log 0 tidak terdefinisi, jadi tidak boleh sama dengan.', 'log 0 is not defined, so equality is not allowed.')],
        [L(lang, 'semua bilangan real', 'all real numbers'), L(lang, 'Bilangan yang dilogaritmakan harus positif.', 'The number inside a log must be positive.')],
        ['x > 0', L(lang, 'Yang harus positif adalah seluruh isi logaritma.', 'The whole expression inside the log must be positive.')],
      ],
      [`x ${a > 0 ? '−' : '+'} ${Math.abs(a)} > 0`, okT],
      { a },
    );
  },
  (m) => `x > ${mi(m.a)}`,
);

const algebraFn = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['ratio', 'time', 'sqrt']);
    if (kind === 'ratio') {
      const x = pick(rnd, [2, 3, 4, 5, 6, 8]);
      const y = ri(rnd, 2, 9);
      const k = x * y;
      return NUM(
        L(lang, `Jika f(x) = ${k} ÷ x, nilai f(${x}) adalah …`, `If f(x) = ${k} ÷ x, the value of f(${x}) is …`),
        D(y),
        WR(D(y), [
          [k * x, L(lang, 'Dibagi x, bukan dikali.', 'Divide by x, do not multiply.')],
          [k - x, L(lang, 'Dibagi x, bukan dikurangi.', 'Divide by x, do not subtract.')],
        ]),
        [`f(${x}) = ${k} ÷ ${x} = ${y}`],
        { kind, k, x },
      );
    }
    if (kind === 'time') {
      const v = pick(rnd, [20, 30, 40, 50, 60, 80]);
      const t = ri(rnd, 2, 6);
      const d = v * t;
      return NUM(
        L(lang, `Waktu (jam) untuk menempuh ${d} km dengan kecepatan v km/jam adalah t = ${d} ÷ v. Jika v = ${v}, nilai t adalah …`, `The time (hours) to travel ${d} km at v km/h is t = ${d} ÷ v. If v = ${v}, t = …`),
        D(t),
        WR(D(t), [
          [d * v, L(lang, 'Waktu = jarak ÷ kecepatan.', 'Time = distance ÷ speed.')],
          [d - v, L(lang, 'Bagi, jangan kurangi.', 'Divide, do not subtract.')],
        ]),
        [`t = ${d} ÷ ${v} = ${t}`],
        { kind, k: d, x: v },
      );
    }
    const s = ri(rnd, 3, 15);
    return NUM(
      L(lang, `Sisi persegi s = √L, dengan L luasnya. Sisi persegi yang luasnya ${s * s} cm² adalah … cm`, `The side of a square is s = √A, where A is the area. A square with area ${s * s} cm² has side … cm`),
      D(s),
      WR(D(s), [
        [(s * s) / 2, L(lang, 'Akar kuadrat, bukan dibagi 2.', 'Square root, not divide by 2.')],
        [(s * s) / 4, L(lang, 'Itu kalau luas dibagi 4. Pakai akar kuadrat.', 'That divides the area by 4. Use the square root.')],
      ]),
      [`s = √${s * s} = ${s}`],
      { kind, a: s * s },
    );
  },
  (m) => (m.kind === 'sqrt' ? D(Math.sqrt(m.a)) : D(m.k / m.x)),
);

const asym = G(
  (rnd, lang) => {
    const a = nz(rnd, -6, 6);
    const b = ri(rnd, -5, 5);
    const k = pick(rnd, [1, 2, 3, 5]);
    const vert = rnd() < 0.6 || b === 0;
    const f = `y = ${k} ÷ (x ${a > 0 ? '−' : '+'} ${Math.abs(a)})${plus(b)}`;
    const okT = vert ? `x = ${mi(a)}` : `y = ${mi(b)}`;
    return OPT(
      L(lang, `Asimtot ${vert ? 'tegak' : 'datar'} grafik ${f} adalah …`, `The ${vert ? 'vertical' : 'horizontal'} asymptote of ${f} is …`),
      okT,
      [
        [`x = ${mi(-a)}`, L(lang, `Penyebut nol saat x = ${mi(a)}.`, `The denominator is zero when x = ${mi(a)}.`)],
        [vert ? (b ? `y = ${mi(b)}` : `y = ${mi(a)}`) : `x = ${mi(a)}`, vert ? L(lang, 'Itu bentuk asimtot datar.', 'That is the form of a horizontal asymptote.') : L(lang, 'Itu asimtot tegak.', 'That is the vertical asymptote.')],
        [vert ? 'x = 0' : 'y = 0', vert ? L(lang, 'Asimtot tegak ada di nilai x yang membuat penyebut nol.', 'The vertical asymptote is where the denominator is zero.') : L(lang, `Grafik digeser ${mi(b)} secara tegak.`, `The graph is shifted ${mi(b)} vertically.`)],
        [`y = ${k}`, L(lang, 'Pembilang tidak menentukan asimtot.', 'The numerator does not give the asymptote.')],
      ],
      [vert ? L(lang, `Penyebut = 0: x ${a > 0 ? '−' : '+'} ${Math.abs(a)} = 0 → x = ${mi(a)}`, `Denominator = 0: x ${a > 0 ? '−' : '+'} ${Math.abs(a)} = 0 → x = ${mi(a)}`) : L(lang, `Untuk x sangat besar, pecahan mendekati 0, jadi y mendekati ${mi(b)}.`, `For very large x, the fraction tends to 0, so y tends to ${mi(b)}.`), okT],
      { a, b, k, vert },
    );
  },
  (m) => {
    if (m.vert) return `x = ${mi(m.a)}`;
    const big = m.k / (1e9 - m.a) + m.b;
    return `y = ${mi(Math.round(big))}`;
  },
);

const MODEL_POOL = [
  ['Banyak bakteri menjadi 2 kali lipat setiap jam.', 'The number of bacteria doubles every hour.', 0],
  ['Harga tiket Rp5.000 per orang, jadi total biaya sebanding dengan banyak orang.', 'A ticket costs Rp5,000 per person, so the total cost is proportional to the number of people.', 1],
  ['Tinggi bola yang dilempar ke atas naik lalu turun membentuk lengkung.', 'The height of a ball thrown upward rises then falls in an arch.', 2],
  ['Ketinggian air laut naik turun secara berulang setiap 12 jam.', 'The sea level rises and falls, repeating every 12 hours.', 3],
  ['Zat radioaktif tinggal setengahnya setiap 5 tahun.', 'A radioactive substance halves every 5 years.', 0],
  ['Pulsa berkurang Rp2.000 setiap hari secara tetap.', 'Phone credit drops by a fixed Rp2,000 every day.', 1],
  ['Luas persegi sebagai fungsi panjang sisinya.', 'The area of a square as a function of its side length.', 2],
  ['Panjang hari (jam siang) sepanjang tahun yang berulang setiap tahun.', 'Daylight hours over the year, repeating every year.', 3],
  ['Tabungan dengan bunga majemuk 5% per tahun.', 'Savings with 5% compound interest per year.', 0],
  ['Jarak tempuh mobil yang melaju dengan kecepatan tetap 60 km/jam.', 'Distance travelled by a car at a constant 60 km/h.', 1],
  ['Pendapatan R = x(100 − x) yang punya nilai maksimum.', 'Revenue R = x(100 − x), which has a maximum.', 2],
  ['Posisi ujung jarum jam yang berputar terus.', 'The position of the tip of a clock hand that keeps turning.', 3],
];
const MODELS = (lang) => [L(lang, 'fungsi eksponen', 'exponential function'), L(lang, 'fungsi linear', 'linear function'), L(lang, 'fungsi kuadrat', 'quadratic function'), L(lang, 'fungsi trigonometri', 'trigonometric function')];
const MODEL_WHY = (lang) => [L(lang, 'Eksponen cocok untuk pertumbuhan/peluruhan dengan faktor kali tetap.', 'Exponential fits growth/decay by a constant factor.'), L(lang, 'Linear cocok untuk perubahan tetap (ditambah/dikurang sama setiap kali).', 'Linear fits a constant change (same amount added each time).'), L(lang, 'Kuadrat cocok untuk lengkung dengan satu puncak.', 'Quadratic fits an arch with one peak.'), L(lang, 'Trigonometri cocok untuk pola yang berulang (periodik).', 'Trigonometric fits a repeating (periodic) pattern.')];
const modelPick = G(
  (rnd, lang) => {
    const i = ri(rnd, 0, MODEL_POOL.length - 1);
    const [di, de, k] = MODEL_POOL[i];
    const ms = MODELS(lang);
    const wy = MODEL_WHY(lang);
    return {
      q: L(lang, `${di} Model yang paling tepat adalah …`, `${de} The most suitable model is …`),
      options: ms.map((t, j) => (j === k ? { t, ok: true } : { t, why: wy[j] })),
      fixed: true,
      steps: [wy[k], ms[k]],
      meta: { i },
    };
  },
  (m, lang) => MODELS(lang)[MODEL_POOL[m.i][2]],
);

const xmr = (a) => (a === 0 ? 'x' : a > 0 ? `x − ${a}` : `x + ${-a}`);

export const K11L = {
  'k11lb1-1': [iPow, cxParts, sqrtNeg],
  'k11lb1-2': [cxAdd, cxMul],
  'k11lb1-3': [cxMod, cxConjDiv, cxArg],
  'k11lb2-1': [polyInfo, polyEval, notPoly],
  'k11lb2-2': [polyAddSub, polyMul],
  'k11lb2-3': [remThm, factorPick],
  'k11lb3-1': [matOrder, matElem, matEq],
  'k11lb3-2': [matAdd, matMulEl, matDims],
  'k11lb3-3': [matDet, matInv, matSing],
  'k11lb4-1': [reflPoint, matMeaning],
  'k11lb4-2': [rotDil, dilArea],
  'k11lb4-3': [composite, compMatrix],
  'k11lb5-1': [trigGraph, trigPool],
  'k11lb5-2': [logGraph, logModel, logDomain],
  'k11lb5-3': [algebraFn, asym, modelPick],
};
