// Generator soal SMP Kelas 9 (materi k9b1 sampai k9b6).
import { ri, pick } from '../util.js';
import { L, D, F, M, P, G, FR, ex, num, mc, shuf } from './u.js';

const withSolve = (g, s) => ((g.solve = s), g);
const nz = (rnd, a, b) => {
  let v = 0;
  while (!v) v = ri(rnd, a, b);
  return v;
};
const pt = (lang, x, y) => `(${M(lang, x)}, ${M(lang, y)})`;
// ax² + bx + c
const quad = (a, b, c, v = 'x') => ex([[a, `${v}²`], [b, v], [c, '']]);
const fac = (r) => `(${ex([[1, 'x'], [-r, '']])})`;

// ================= Bab 1: Persamaan Kuadrat =================
const pkIntro = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const r = nz(rnd, -6, 6);
      let s = nz(rnd, -8, 8);
      if (s === r) s = -s || 3;
      const c = r * s;
      const k = -(r + s);
      if (k === 0) return pkIntro(rnd, lang);
      return num(
        L(lang, `Salah satu akar x² + kx ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0 adalah x = ${M(lang, r)}. Nilai k adalah …`, `One root of x² + kx ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0 is x = ${M(lang, r)}. Find k.`),
        k,
        [
          [-k, L(lang, 'Tandanya terbalik. Periksa saat memindahkan suku ke ruas lain.', 'The sign is flipped. Check when moving terms across.')],
          [s, L(lang, 'Itu akar yang lain, bukan k.', 'That is the other root, not k.')],
        ],
        [L(lang, `Substitusi x = ${M(lang, r)}: ${P(lang, r)}² + k × ${P(lang, r)} ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0.`, `Substitute x = ${M(lang, r)}: ${P(lang, r)}² + k × ${P(lang, r)} ${c < 0 ? '−' : '+'} ${Math.abs(c)} = 0.`), `${M(lang, r * r + c)} ${r < 0 ? '−' : '+'} ${Math.abs(r)}k = 0  →  k = ${M(lang, k)}`],
        { kind, r, c },
      );
    }
    if (kind === 1) {
      const a = nz(rnd, -5, 6);
      const b = nz(rnd, -9, 9);
      const c = nz(rnd, -12, 12);
      const abc = (x, y, z) => `${M(lang, x)}, ${M(lang, y)}, ${M(lang, z)}`;
      return mc(
        L(lang, `Pada persamaan ${quad(a, b, c)} = 0, nilai a, b, dan c berturut-turut adalah …`, `In the equation ${quad(a, b, c)} = 0, the values of a, b, and c are …`),
        abc(a, b, c),
        [
          [abc(a, Math.abs(b), c), L(lang, 'Tanda di depan suku ikut menjadi bagian koefisien.', 'The sign in front of a term belongs to its coefficient.')],
          [abc(c, b, a), L(lang, 'a adalah koefisien x², c adalah konstanta.', 'a is the coefficient of x²; c is the constant.')],
          [abc(a, c, b), L(lang, 'b adalah koefisien x, c adalah konstanta.', 'b is the coefficient of x; c is the constant.')],
          [abc(a, 0, c), L(lang, 'Suku x ada, jadi b tidak nol.', 'There is an x term, so b is not zero.')],
        ],
        [L(lang, 'Bentuk umum ax² + bx + c = 0.', 'General form ax² + bx + c = 0.'), `a = ${M(lang, a)}, b = ${M(lang, b)}, c = ${M(lang, c)}`],
        { kind, a, b, c },
      );
    }
    const p = nz(rnd, -7, 7);
    const q = ri(rnd, 2, 30);
    return mc(
      L(lang, `Bentuk umum dari x(${ex([[1, 'x'], [p, '']])}) = ${q} adalah …`, `The general form of x(${ex([[1, 'x'], [p, '']])}) = ${q} is …`),
      `${quad(1, p, -q)} = 0`,
      [
        [`${quad(1, p, q)} = 0`, L(lang, `${q} dipindah ke kiri menjadi −${q}.`, `Moving ${q} to the left gives −${q}.`)],
        [`${ex([[1, 'x²'], [p, ''], [-q, '']])} = 0`, L(lang, `x dikali ${M(lang, p)} menjadi ${ex([[p, 'x']])}, bukan ${M(lang, p)}.`, `x times ${M(lang, p)} is ${ex([[p, 'x']])}, not ${M(lang, p)}.`)],
        [`${ex([[2, 'x'], [p, ''], [-q, '']])} = 0`, L(lang, 'x × x = x², bukan 2x.', 'x × x = x², not 2x.')],
      ],
      [`x × x + x × ${P(lang, p)} = ${q}`, `${quad(1, p, -q)} = 0`],
      { kind, p, q },
    );
  },
  (m, lang) => {
    if (m.kind === 0) return D(-(m.r * m.r + m.c) / m.r);
    if (m.kind === 1) return `${M(lang, m.a)}, ${M(lang, m.b)}, ${M(lang, m.c)}`;
    return `${quad(1, m.p, -m.q)} = 0`;
  },
);

const rootsTxt = (lang, r, s) => (r === s ? L(lang, `${M(lang, r)} saja`, `${M(lang, r)} only`) : L(lang, `${M(lang, Math.max(r, s))} dan ${M(lang, Math.min(r, s))}`, `${M(lang, Math.max(r, s))} and ${M(lang, Math.min(r, s))}`));
const factorQ = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const r = ri(rnd, -8, 8);
    let s = nz(rnd, -9, 9);
    if (s === r || s === -r) s = r + 3 || 2;
    const b = -(r + s);
    const c = r * s;
    if (kind === 0) {
      if (r === 0) return factorQ(rnd, lang);
      const [hi, lo] = r > s ? [r, s] : [s, r];
      const okT = `${fac(hi)}${fac(lo)}`;
      return mc(
        L(lang, `Bentuk faktor dari ${quad(1, b, c)} adalah …`, `Factorise ${quad(1, b, c)}.`),
        okT,
        [
          [`${fac(-hi)}${fac(-lo)}`, L(lang, 'Tandanya terbalik. Periksa: hasil kali harus memberi suku tengah yang benar.', 'The signs are flipped. Check by expanding: the middle term must match.')],
          [Math.abs(c) > 1 ? `${fac(1)}${fac(c)}` : null, L(lang, `Hasil kalinya ${M(lang, c)}, tetapi jumlahnya harus ${M(lang, -b)}.`, `They multiply to ${M(lang, c)}, but they must add to ${M(lang, -b)}.`)],
          [`${fac(hi)}${fac(-lo)}`, L(lang, 'Periksa tanda: jika dikalikan, hasilnya berbeda.', 'Check the signs: expanding gives a different result.')],
        ],
        [L(lang, `Cari dua bilangan yang hasil kalinya ${M(lang, c)} dan jumlahnya ${M(lang, b)}: ${M(lang, -r)} dan ${M(lang, -s)}.`, `Find two numbers that multiply to ${M(lang, c)} and add to ${M(lang, b)}: ${M(lang, -r)} and ${M(lang, -s)}.`), okT],
        { kind, b, c },
      );
    }
    if (kind === 1)
      return mc(
        L(lang, `Akar-akar dari ${quad(1, b, c)} = 0 adalah …`, `The roots of ${quad(1, b, c)} = 0 are …`),
        rootsTxt(lang, r, s),
        [
          [rootsTxt(lang, -r, -s), L(lang, 'Dari (x − p) = 0 didapat x = p, jadi tandanya tidak dibalik dua kali.', 'From (x − p) = 0 we get x = p; do not flip the sign twice.')],
          [r === 0 ? rootsTxt(lang, s, s) : rootsTxt(lang, r, -s), L(lang, r === 0 ? 'x = 0 juga akar.' : 'Periksa setiap akar dengan substitusi.', r === 0 ? 'x = 0 is also a root.' : 'Check each root by substituting.')],
          [c !== 0 && Math.abs(c) !== Math.abs(r) ? rootsTxt(lang, c, 1) : rootsTxt(lang, s + 1, r - 1), L(lang, 'Kedua bilangan harus berjumlah −b dan berhasil kali c.', 'The two numbers must add to −b and multiply to c.')],
        ],
        [r === 0 ? `x${fac(s)} = 0` : `${fac(r)}${fac(s)} = 0`, `x = ${M(lang, r)} ${L(lang, 'atau', 'or')} x = ${M(lang, s)}`],
        { kind, b, c },
      );
    if (kind === 2) {
      const n = ri(rnd, 2, 15);
      return num(
        L(lang, `Akar positif dari x² − ${n * n} = 0 adalah …`, `What is the positive root of x² − ${n * n} = 0?`),
        n,
        [[(n * n) / 2, L(lang, 'x² = ' + n * n + ', jadi x = √' + n * n + ', bukan dibagi 2.', 'x² = ' + n * n + ', so x = √' + n * n + ', not half of it.')], [n * n, L(lang, 'Itu x². Ambil akarnya.', 'That is x². Take the square root.')]],
        [`x² = ${n * n}`, `x = ±${n}, ${L(lang, 'akar positif', 'positive root')} ${n}`],
        { kind: 2, n2: n * n },
      );
    }
    const n = ri(rnd, 3, 20);
    const step = pick(rnd, [1, 2]);
    return num(
      L(lang, `Hasil kali dua bilangan ${step === 2 ? (n % 2 ? 'ganjil' : 'genap') + ' ' : ''}positif berurutan adalah ${n * (n + step)}. Bilangan yang lebih kecil adalah …`, `Two consecutive positive ${step === 2 ? (n % 2 ? 'odd' : 'even') + ' ' : ''}numbers multiply to ${n * (n + step)}. What is the smaller number?`),
      n,
      [[n + step, L(lang, 'Itu bilangan yang lebih besar.', 'That is the larger number.')], [-(n + step), L(lang, 'Bilangannya positif, jadi akar negatif dibuang.', 'The numbers are positive, so drop the negative root.')]],
      [`x(${ex([[1, 'x'], [step, '']])}) = ${n * (n + step)}  →  ${quad(1, step, -n * (n + step))} = 0`, `${fac(n)}${fac(-(n + step))} = 0  →  x = ${n}`],
      { kind: 3, step, P: n * (n + step) },
    );
  },
  (m, lang) => {
    if (m.kind === 2) return D(Math.sqrt(m.n2));
    if (m.kind === 3) return D((-m.step + Math.sqrt(m.step * m.step + 4 * m.P)) / 2);
    const d = Math.sqrt(m.b * m.b - 4 * m.c);
    const r = (-m.b + d) / 2;
    const s = (-m.b - d) / 2;
    if (m.kind === 1) return rootsTxt(lang, r, s);
    return `${fac(r)}${fac(s)}`;
  },
);

const discQ = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 2) {
      const h = nz(rnd, -8, 8);
      const b = 2 * h;
      return num(
        L(lang, `Persamaan ${ex([[1, 'x²'], [b, 'x']])} + k = 0 memiliki tepat satu akar (akar kembar). Nilai k adalah …`, `The equation ${ex([[1, 'x²'], [b, 'x']])} + k = 0 has exactly one root (a repeated root). Find k.`),
        h * h,
        [[b * b, L(lang, 'Syaratnya D = b² − 4ac = 0, jadi k = b²/4.', 'The condition is D = b² − 4ac = 0, so k = b²/4.')], [-(h * h), L(lang, 'Tandanya keliru: b² − 4k = 0 berarti k = b²/4 (positif).', 'Sign error: b² − 4k = 0 means k = b²/4 (positive).')], [Math.abs(h), L(lang, 'Itu akar kembarnya (atau lawannya), bukan k.', 'That is (the size of) the repeated root, not k.')]],
        [L(lang, 'Tepat satu akar: D = 0.', 'Exactly one root: D = 0.'), `${M(lang, b)}² − 4 × 1 × k = 0  →  k = ${h * h}`],
        { kind, b },
      );
    }
    const a = nz(rnd, -3, 4);
    const b = nz(rnd, -9, 9);
    const c = nz(rnd, -10, 10);
    const Dv = b * b - 4 * a * c;
    if (kind === 0)
      return num(
        L(lang, `Diskriminan dari ${quad(a, b, c)} = 0 adalah …`, `What is the discriminant of ${quad(a, b, c)} = 0?`),
        Dv,
        [[b * b + 4 * a * c, L(lang, 'D = b² − 4ac. Perhatikan tanda a dan c.', 'D = b² − 4ac. Watch the signs of a and c.')], [-(b * b) - 4 * a * c, L(lang, `b² selalu positif: ${P(lang, b)}² = ${b * b}.`, `b² is always positive: ${P(lang, b)}² = ${b * b}.`)], [b - 4 * a * c, L(lang, 'b harus dikuadratkan.', 'b must be squared.')]],
        [`D = b² − 4ac = ${P(lang, b)}² − 4 × ${P(lang, a)} × ${P(lang, c)}`, `= ${b * b} ${-4 * a * c < 0 ? '−' : '+'} ${Math.abs(4 * a * c)} = ${M(lang, Dv)}`],
        { kind, a, b, c },
      );
    // jenis akar: buat agak seimbang
    const want = ri(rnd, 0, 2);
    let A = 1;
    let B;
    let C;
    if (want === 1) {
      const h = nz(rnd, -6, 6);
      B = 2 * h;
      C = h * h;
      A = 1;
    } else {
      do {
        A = nz(rnd, -2, 3);
        B = ri(rnd, -8, 8);
        C = nz(rnd, -10, 10);
      } while (want === 0 ? B * B - 4 * A * C <= 0 : B * B - 4 * A * C >= 0);
    }
    const Dw = B * B - 4 * A * C;
    const T = [L(lang, 'dua akar real berbeda', 'two different real roots'), L(lang, 'satu akar real (akar kembar)', 'one real root (repeated)'), L(lang, 'tidak ada akar real', 'no real roots')];
    const k = Dw > 0 ? 0 : Dw === 0 ? 1 : 2;
    return mc(
      L(lang, `Persamaan ${quad(A, B, C)} = 0 memiliki …`, `The equation ${quad(A, B, C)} = 0 has …`),
      T[k],
      [0, 1, 2].filter((i) => i !== k).map((i) => [T[i], L(lang, `Hitung D = b² − 4ac = ${M(lang, Dw)}. D ${Dw > 0 ? '> 0' : Dw === 0 ? '= 0' : '< 0'}.`, `Work out D = b² − 4ac = ${M(lang, Dw)}. D ${Dw > 0 ? '> 0' : Dw === 0 ? '= 0' : '< 0'}.`)]),
      [`D = ${P(lang, B)}² − 4 × ${P(lang, A)} × ${P(lang, C)} = ${M(lang, Dw)}`, L(lang, `D ${Dw > 0 ? '> 0: dua akar real berbeda' : Dw === 0 ? '= 0: akar kembar' : '< 0: tidak ada akar real'}.`, `D ${Dw > 0 ? '> 0: two different real roots' : Dw === 0 ? '= 0: a repeated root' : '< 0: no real roots'}.`)],
      { kind, A, B, C },
      { fixed: true },
    );
  },
  (m, lang) => {
    if (m.kind === 2) return D((m.b * m.b) / 4);
    if (m.kind === 0) return D(m.b * m.b - 4 * m.a * m.c);
    const Dw = m.B * m.B - 4 * m.A * m.C;
    return Dw > 0 ? L(lang, 'dua akar real berbeda', 'two different real roots') : Dw === 0 ? L(lang, 'satu akar real (akar kembar)', 'one real root (repeated)') : L(lang, 'tidak ada akar real', 'no real roots');
  },
);

const formula = withSolve(
  (rnd, lang) => {
    // akar p ± √q
    const p = nz(rnd, -5, 5);
    const q = pick(rnd, [2, 3, 5, 6, 7]);
    const b = -2 * p;
    const c = p * p - q;
    const t = (u, w) => `${M(lang, u)} ± √${w}`;
    return mc(
      L(lang, `Akar-akar dari ${quad(1, b, c)} = 0 adalah …`, `The roots of ${quad(1, b, c)} = 0 are …`),
      t(p, q),
      [
        [t(-p, q), L(lang, 'Rumusnya x = (−b ± √D) / 2a. Tanda −b sering terlupa.', 'The formula is x = (−b ± √D) / 2a. The −b is often forgotten.')],
        [t(2 * p, q), L(lang, 'Hasil (−b ± √D) masih harus dibagi 2a.', '(−b ± √D) must still be divided by 2a.')],
        [t(p, 4 * q), L(lang, `√${4 * q} = 2√${q}, lalu dibagi 2 menjadi √${q}.`, `√${4 * q} = 2√${q}; dividing by 2 gives √${q}.`)],
      ],
      [`D = ${P(lang, b)}² − 4 × 1 × ${P(lang, c)} = ${4 * q}`, `x = (${M(lang, -b)} ± √${4 * q}) / 2 = ${t(p, q)}`],
      { b, c },
    );
  },
  (m, lang) => {
    const p = -m.b / 2;
    const Dq = (m.b * m.b - 4 * m.c) / 4;
    return `${M(lang, p)} ± √${Dq}`;
  },
);

// ================= Bab 2: Fungsi Kuadrat =================
const fq = (a, b, c) => `f(x) = ${quad(a, b, c)}`;
const qfVal = withSolve(
  (rnd, lang) => {
    const a = nz(rnd, -3, 3);
    const b = ri(rnd, -6, 6);
    const c = ri(rnd, -9, 9);
    const kind = ri(rnd, 0, 1);
    const x = nz(rnd, -4, 5);
    const v = a * x * x + b * x + c;
    if (kind === 0)
      return num(
        L(lang, `Jika ${fq(a, b, c)}, nilai f(${M(lang, x)}) adalah …`, `If ${fq(a, b, c)}, what is f(${M(lang, x)})?`),
        v,
        [
          [x < 0 ? -a * x * x + b * x + c : null, L(lang, `${P(lang, x)}² = ${x * x}, positif.`, `${P(lang, x)}² = ${x * x}, which is positive.`)],
          [a * 2 * x + b * x + c, L(lang, `x² artinya x × x, bukan 2 × x.`, 'x² means x × x, not 2 × x.')],
          [(a * x) ** 2 + b * x + c, L(lang, `Hanya x yang dikuadratkan: ${M(lang, a)} × ${P(lang, x)}².`, `Only x is squared: ${M(lang, a)} × ${P(lang, x)}².`)],
        ],
        [`f(${M(lang, x)}) = ${a === 1 ? '' : a === -1 ? '−' : `${M(lang, a)} × `}${P(lang, x)}² ${b ? `${b < 0 ? '−' : '+'} ${Math.abs(b)} × ${P(lang, x)} ` : ''}${c ? `${c < 0 ? '−' : '+'} ${Math.abs(c)}` : ''}`, `= ${M(lang, v)}`],
        { kind, a, b, c, x },
      );
    const w = v + pick(rnd, [-2, -1, 1, 2]);
    const xs = shuf(rnd, [x, x + 1, -x]);
    return mc(
      L(lang, `Titik manakah yang terletak pada grafik y = ${quad(a, b, c)}?`, `Which point lies on the graph of y = ${quad(a, b, c)}?`),
      pt(lang, x, v),
      [
        [pt(lang, x, w), L(lang, `Untuk x = ${M(lang, x)}, nilai y = ${M(lang, v)}.`, `For x = ${M(lang, x)}, y = ${M(lang, v)}.`)],
        [pt(lang, v, x), L(lang, 'Urutan koordinat (x, y) tertukar.', 'The coordinates (x, y) are swapped.')],
        ...xs.filter((t) => t !== x).map((t) => [pt(lang, t, v), L(lang, `Untuk x = ${M(lang, t)}, nilai y = ${M(lang, a * t * t + b * t + c)}.`, `For x = ${M(lang, t)}, y = ${M(lang, a * t * t + b * t + c)}.`)]),
      ].filter((o) => !(o[0] === pt(lang, -x, v) && a * x * x + b * -x + c === v) && !(o[0] === pt(lang, x + 1, v) && a * (x + 1) ** 2 + b * (x + 1) + c === v) && !(o[0] === pt(lang, v, x) && a * v * v + b * v + c === x)),
      [L(lang, 'Substitusi x ke rumus, lalu bandingkan y.', 'Substitute x into the formula and compare y.'), `x = ${M(lang, x)}: y = ${M(lang, v)}  →  ${pt(lang, x, v)}`],
      { kind, a, b, c, x },
    );
  },
  (m, lang) => {
    const v = m.a * m.x * m.x + m.b * m.x + m.c;
    return m.kind === 0 ? D(v) : pt(lang, m.x, v);
  },
);

const shapeQ = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 1);
    if (kind === 0) {
      const a = pick(rnd, [1, -1, 2, -2, 3]);
      const c = nz(rnd, -6, 6);
      const up = a > 0;
      const t = (o, k) => L(lang, `terbuka ke ${o ? 'atas' : 'bawah'} dan memotong sumbu y di ${pt(lang, 0, k)}`, `opens ${o ? 'upward' : 'downward'} and crosses the y-axis at ${pt(lang, 0, k)}`);
      return mc(
        L(lang, `Grafik fungsi y = ${quad(a, 0, c)} …`, `The graph of y = ${quad(a, 0, c)} …`),
        t(up, c),
        [
          [t(!up, c), L(lang, `a = ${M(lang, a)} ${up ? 'positif' : 'negatif'}, jadi terbuka ke ${up ? 'atas' : 'bawah'}.`, `a = ${M(lang, a)} is ${up ? 'positive' : 'negative'}, so it opens ${up ? 'upward' : 'downward'}.`)],
          [t(up, -c), L(lang, `Titik potong sumbu y: x = 0, y = ${M(lang, c)}.`, `y-intercept: x = 0 gives y = ${M(lang, c)}.`)],
          [t(up, a), L(lang, 'Titik potong sumbu y adalah konstanta c, bukan a.', 'The y-intercept is the constant c, not a.')],
          [L(lang, 'berupa garis lurus', 'is a straight line'), L(lang, 'Ada suku x², jadi grafiknya parabola.', 'There is an x² term, so it is a parabola.')],
        ],
        [L(lang, `a = ${M(lang, a)} ${up ? '> 0: terbuka ke atas' : '< 0: terbuka ke bawah'}.`, `a = ${M(lang, a)} ${up ? '> 0: opens upward' : '< 0: opens downward'}.`), L(lang, `x = 0 → y = ${M(lang, c)}.`, `x = 0 → y = ${M(lang, c)}.`)],
        { kind, a, c },
      );
    }
    const k = nz(rnd, -6, 6);
    const horiz = rnd() < 0.5;
    const dir = horiz ? (k > 0 ? L(lang, 'kanan', 'right') : L(lang, 'kiri', 'left')) : k > 0 ? L(lang, 'atas', 'up') : L(lang, 'bawah', 'down');
    const okT = horiz ? `y = (${ex([[1, 'x'], [-k, '']])})²` : `y = ${quad(1, 0, k)}`;
    return mc(
      L(lang, `Grafik y = x² digeser ${Math.abs(k)} satuan ke ${dir}. Persamaan grafik barunya adalah …`, `The graph of y = x² is shifted ${Math.abs(k)} units ${dir}. What is the new equation?`),
      okT,
      horiz
        ? [
            [`y = (${ex([[1, 'x'], [k, '']])})²`, L(lang, `Geser ke ${dir} ${Math.abs(k)} satuan berarti x diganti (${ex([[1, 'x'], [-k, '']])}).`, `Shifting ${dir} by ${Math.abs(k)} replaces x with (${ex([[1, 'x'], [-k, '']])}).`)],
            [`y = ${quad(1, 0, k)}`, L(lang, 'Itu pergeseran ke atas atau ke bawah.', 'That is an up or down shift.')],
            [`y = ${quad(1, 0, -k)}`, L(lang, 'Pergeseran mendatar mengubah x, bukan konstanta.', 'A horizontal shift changes x, not the constant.')],
          ]
        : [
            [`y = ${quad(1, 0, -k)}`, L(lang, `Geser ke ${dir} berarti ${k > 0 ? 'ditambah' : 'dikurangi'} ${Math.abs(k)}.`, `Shifting ${dir} means ${k > 0 ? 'adding' : 'subtracting'} ${Math.abs(k)}.`)],
            [`y = (${ex([[1, 'x'], [-k, '']])})²`, L(lang, 'Itu pergeseran mendatar.', 'That is a horizontal shift.')],
            [`y = ${Math.abs(k)}x²`, L(lang, 'Mengalikan x² mengubah lebar parabola, bukan menggeser.', 'Multiplying x² changes the width, not the position.')],
          ],
      [horiz ? L(lang, `Geser mendatar h satuan: y = (x − h)², dengan h = ${M(lang, k)}.`, `Horizontal shift by h: y = (x − h)², with h = ${M(lang, k)}.`) : L(lang, `Geser tegak k satuan: y = x² + k, dengan k = ${M(lang, k)}.`, `Vertical shift by k: y = x² + k, with k = ${M(lang, k)}.`), okT],
      { kind, k, horiz },
    );
  },
  (m, lang) => {
    if (m.kind === 0) return L(lang, `terbuka ke ${m.a > 0 ? 'atas' : 'bawah'} dan memotong sumbu y di ${pt(lang, 0, m.c)}`, `opens ${m.a > 0 ? 'upward' : 'downward'} and crosses the y-axis at ${pt(lang, 0, m.c)}`);
    return m.horiz ? `y = (${ex([[1, 'x'], [-m.k, '']])})²` : `y = ${quad(1, 0, m.k)}`;
  },
);

const vertex = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const a = kind === 3 ? 1 : pick(rnd, [1, 1, -1, 2]);
    const h = nz(rnd, -5, 5);
    const k = ri(rnd, -9, 9);
    // y = a(x − h)² + k = ax² − 2ah x + ah² + k
    const b = -2 * a * h;
    const c = a * h * h + k;
    if (kind === 0)
      return mc(
        L(lang, `Titik puncak grafik y = ${quad(a, b, c)} adalah …`, `The vertex of y = ${quad(a, b, c)} is …`),
        pt(lang, h, k),
        [
          [pt(lang, -h, 4 * a * h * h + k), L(lang, 'x puncak = −b/(2a). Tanda −b sering terlupa.', 'The vertex x = −b/(2a). The minus sign is often forgotten.')],
          [pt(lang, h, c), L(lang, `y puncak bukan konstanta c. Substitusi x = ${M(lang, h)}.`, `The vertex y is not the constant c. Substitute x = ${M(lang, h)}.`)],
          [pt(lang, -b, k), L(lang, 'Ingat x puncak = −b dibagi 2a.', 'Remember x = −b divided by 2a.')],
        ],
        [`x = −b/(2a) = ${M(lang, -b)}/${M(lang, 2 * a)} = ${M(lang, h)}`, `y = ${M(lang, k)}  →  ${pt(lang, h, k)}`],
        { kind, a, b, c },
      );
    if (kind === 1)
      return num(
        L(lang, `Persamaan sumbu simetri grafik y = ${quad(a, b, c)} adalah x = …`, `The axis of symmetry of y = ${quad(a, b, c)} is x = …`),
        h,
        [[-h, L(lang, 'x = −b/(2a). Tandanya terbalik.', 'x = −b/(2a). The sign is flipped.')], [-b, L(lang, 'Masih harus dibagi 2a.', 'It must still be divided by 2a.')]],
        [`x = −b/(2a)`, `= ${M(lang, -b)}/${M(lang, 2 * a)} = ${M(lang, h)}`],
        { kind, a, b, c },
      );
    if (kind === 2)
      return num(
        L(lang, `Nilai ${a > 0 ? 'minimum' : 'maksimum'} fungsi ${fq(a, b, c)} adalah …`, `What is the ${a > 0 ? 'minimum' : 'maximum'} value of ${fq(a, b, c)}?`),
        k,
        [[h, L(lang, 'Itu nilai x saat minimum atau maksimum. Yang ditanya nilai f-nya.', 'That is the x-value. The question asks for the value of f.')], [c, L(lang, 'Konstanta c adalah f(0), bukan nilai ekstrem.', 'The constant c is f(0), not the extreme value.')]],
        [`x = −b/(2a) = ${M(lang, h)}`, `f(${M(lang, h)}) = ${M(lang, k)}`],
        { kind, a, b, c },
      );
    const v = pick(rnd, [10, 20, 30, 40, 50, 60]);
    // h(t) = v t − 5t², puncak di t = v/10, tinggi v²/20
    return num(
      L(lang, `Tinggi bola h = ${v}t − 5t² (meter, t dalam detik). Tinggi maksimum bola adalah … m`, `A ball's height is h = ${v}t − 5t² (metres, t in seconds). What is the maximum height in metres?`),
      (v * v) / 20,
      [[v / 10, L(lang, 'Itu waktunya. Substitusi t ke rumus tinggi.', 'That is the time. Substitute t into the height formula.')], [(v * v) / 10, L(lang, 'Periksa lagi: h = −D/(4a).', 'Check again: h = −D/(4a).')]],
      [`t = −b/(2a) = ${v}/10 = ${M(lang, v / 10)}`, `h = ${v} × ${M(lang, v / 10)} − 5 × ${M(lang, v / 10)}² = ${M(lang, (v * v) / 20)}`],
      { kind, a: -5, b: v, c: 0 },
    );
  },
  (m, lang) => {
    const h = -m.b / (2 * m.a);
    const k = m.a * h * h + m.b * h + m.c;
    if (m.kind === 0) return pt(lang, h, k);
    if (m.kind === 1) return D(h);
    return D(k);
  },
);

// ================= Bab 3: Transformasi Geometri =================
const trans = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const x = ri(rnd, -7, 7);
    const y = ri(rnd, -7, 7);
    const a = nz(rnd, -6, 6);
    const b = nz(rnd, -6, 6);
    const T = (p, q) => `T(${M(lang, p)}, ${M(lang, q)})`;
    if (kind === 0)
      return mc(
        L(lang, `Titik A${pt(lang, x, y)} ditranslasi ${T(a, b)}. Bayangannya adalah …`, `Point A${pt(lang, x, y)} is translated by ${T(a, b)}. Its image is …`),
        `A'${pt(lang, x + a, y + b)}`,
        [
          [`A'${pt(lang, x - a, y - b)}`, L(lang, 'Translasi menambahkan, bukan mengurangkan.', 'A translation adds; it does not subtract.')],
          [`A'${pt(lang, x + b, y + a)}`, L(lang, 'Komponen pertama untuk x, komponen kedua untuk y.', 'The first component goes with x, the second with y.')],
          [`A'${pt(lang, x * a, y * b)}`, L(lang, 'Translasi bukan perkalian.', 'A translation is not multiplication.')],
          [`A'${pt(lang, x + a, y - b)}`, L(lang, 'Periksa tanda komponen kedua.', 'Check the sign of the second component.')],
        ],
        [`(${M(lang, x)} + ${P(lang, a)}, ${M(lang, y)} + ${P(lang, b)})`, `A'${pt(lang, x + a, y + b)}`],
        { kind, x, y, a, b },
      );
    if (kind === 1)
      return mc(
        L(lang, `Titik P${pt(lang, x, y)} ditranslasi menjadi P'${pt(lang, x + a, y + b)}. Translasinya adalah …`, `Point P${pt(lang, x, y)} is translated to P'${pt(lang, x + a, y + b)}. What is the translation?`),
        T(a, b),
        [
          [T(-a, -b), L(lang, 'Translasi = bayangan − titik asal, bukan sebaliknya.', 'Translation = image − original, not the other way round.')],
          [T(x + a, y + b), L(lang, 'Itu koordinat bayangannya.', 'Those are the image coordinates.')],
          [T(b, a), L(lang, 'Komponennya tertukar.', 'The components are swapped.')],
        ],
        [`a = ${M(lang, x + a)} − ${P(lang, x)} = ${M(lang, a)}`, `b = ${M(lang, y + b)} − ${P(lang, y)} = ${M(lang, b)}`],
        { kind, x, y, a, b },
      );
    return num(
      L(lang, `Titik (k, ${M(lang, y)}) ditranslasi ${T(a, b)} menjadi ${pt(lang, x + a, y + b)}. Nilai k adalah …`, `The point (k, ${M(lang, y)}) is translated by ${T(a, b)} to ${pt(lang, x + a, y + b)}. Find k.`),
      x,
      [[x + 2 * a, L(lang, `k + ${P(lang, a)} = ${M(lang, x + a)}, jadi k = ${M(lang, x + a)} − ${P(lang, a)}.`, `k + ${P(lang, a)} = ${M(lang, x + a)}, so k = ${M(lang, x + a)} − ${P(lang, a)}.`)], [x + a, L(lang, 'Itu absis bayangan.', 'That is the image x-coordinate.')]],
      [`k + ${P(lang, a)} = ${M(lang, x + a)}`, `k = ${M(lang, x)}`],
      { kind, a, xi: x + a },
    );
  },
  (m, lang) => {
    if (m.kind === 0) return `A'${pt(lang, m.x + m.a, m.y + m.b)}`;
    if (m.kind === 1) return `T(${M(lang, m.a)}, ${M(lang, m.b)})`;
    return D(m.xi - m.a);
  },
);

const MIRRORS = [
  { id: 'sumbu x', en: 'the x-axis', f: (x, y) => [x, -y] },
  { id: 'sumbu y', en: 'the y-axis', f: (x, y) => [-x, y] },
  { id: 'garis y = x', en: 'the line y = x', f: (x, y) => [y, x] },
  { id: 'garis y = −x', en: 'the line y = −x', f: (x, y) => [-y, -x] },
  { id: 'titik asal O', en: 'the origin O', f: (x, y) => [-x, -y] },
];
const reflect = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    let x = nz(rnd, -8, 8);
    let y = nz(rnd, -8, 8);
    if (Math.abs(x) === Math.abs(y)) y = y > 0 ? y + 1 : y - 1;
    if (kind === 2) {
      const vert = rnd() < 0.5;
      let h = nz(rnd, -4, 5);
      if (h === (vert ? x : y)) h += 1;
      const img = vert ? [2 * h - x, y] : [x, 2 * h - y];
      const line = vert ? `x = ${M(lang, h)}` : `y = ${M(lang, h)}`;
      return mc(
        L(lang, `Bayangan titik ${pt(lang, x, y)} oleh refleksi terhadap garis ${line} adalah …`, `The image of ${pt(lang, x, y)} reflected in the line ${line} is …`),
        pt(lang, ...img),
        [
          [vert ? pt(lang, -x, y) : pt(lang, x, -y), L(lang, `Cerminnya garis ${line}, bukan sumbu ${vert ? 'y' : 'x'}.`, `The mirror is the line ${line}, not the ${vert ? 'y' : 'x'}-axis.`)],
          [vert ? pt(lang, x, 2 * h - y) : pt(lang, 2 * h - x, y), L(lang, `Garis ${line} ${vert ? 'tegak' : 'mendatar'}, jadi yang berubah koordinat ${vert ? 'x' : 'y'}.`, `The line ${line} is ${vert ? 'vertical' : 'horizontal'}, so the ${vert ? 'x' : 'y'}-coordinate changes.`)],
          [vert ? pt(lang, h, y) : pt(lang, x, h), L(lang, 'Itu titik pada cermin. Bayangan berjarak sama di seberang cermin.', 'That point is on the mirror. The image is the same distance on the other side.')],
          [vert ? pt(lang, h - x, y) : pt(lang, x, h - y), L(lang, `Rumusnya ${vert ? "x' = 2h − x" : "y' = 2k − y"}.`, `The rule is ${vert ? "x' = 2h − x" : "y' = 2k − y"}.`)],
        ],
        [L(lang, `Jarak ke cermin: ${Math.abs((vert ? x : y) - h)} satuan.`, `Distance to the mirror: ${Math.abs((vert ? x : y) - h)} units.`), `${vert ? "x' = 2 × " + P(lang, h) + ' − ' + P(lang, x) : "y' = 2 × " + P(lang, h) + ' − ' + P(lang, y)} = ${M(lang, vert ? img[0] : img[1])}  →  ${pt(lang, ...img)}`],
        { kind, x, y, h, vert },
      );
    }
    const mi = ri(rnd, 0, kind === 0 ? 4 : 2);
    const R = MIRRORS[mi];
    const img = R.f(x, y);
    if (kind === 0) {
      const others = shuf(rnd, MIRRORS.filter((_, i) => i !== mi));
      return mc(
        L(lang, `Bayangan titik ${pt(lang, x, y)} oleh refleksi terhadap ${R.id} adalah …`, `The image of ${pt(lang, x, y)} reflected in ${R.en} is …`),
        pt(lang, ...img),
        others.map((O) => [pt(lang, ...O.f(x, y)), L(lang, `Itu hasil refleksi terhadap ${O.id}.`, `That is the reflection in ${O.en}.`)]),
        [L(lang, `Refleksi terhadap ${R.id}: ${['(x, y) → (x, −y)', '(x, y) → (−x, y)', '(x, y) → (y, x)', '(x, y) → (−y, −x)', '(x, y) → (−x, −y)'][mi]}.`, `Reflection in ${R.en}: ${['(x, y) → (x, −y)', '(x, y) → (−x, y)', '(x, y) → (y, x)', '(x, y) → (−y, −x)', '(x, y) → (−x, −y)'][mi]}.`), pt(lang, ...img)],
        { kind, x, y, mi },
      );
    }
    // kind 1: cari titik asal dari bayangan
    const others = shuf(rnd, MIRRORS.filter((_, i) => i !== mi)).slice(0, 2);
    return mc(
      L(lang, `Titik P dicerminkan terhadap ${R.id} dan bayangannya ${pt(lang, ...img)}. Koordinat P adalah …`, `Point P is reflected in ${R.en} and its image is ${pt(lang, ...img)}. What are the coordinates of P?`),
      pt(lang, x, y),
      [
        [pt(lang, ...img), L(lang, 'Itu bayangannya. Titik asal ada di seberang cermin.', 'That is the image. The original is on the other side of the mirror.')],
        ...others.map((O) => [pt(lang, ...O.f(...img)), L(lang, `Itu jika cerminnya ${O.id}.`, `That would be for ${O.en}.`)]),
      ],
      [L(lang, `Refleksi dua kali terhadap cermin yang sama kembali ke titik asal, jadi cerminkan bayangannya terhadap ${R.id}.`, `Reflecting twice in the same mirror returns to the start, so reflect the image in ${R.en}.`), `P = ${pt(lang, x, y)}`],
      { kind, img, mi },
    );
  },
  (m, lang) => {
    if (m.kind === 2) return m.vert ? pt(lang, 2 * m.h - m.x, m.y) : pt(lang, m.x, 2 * m.h - m.y);
    if (m.kind === 0) return pt(lang, ...MIRRORS[m.mi].f(m.x, m.y));
    return pt(lang, ...MIRRORS[m.mi].f(...m.img));
  },
);

const ROT = [
  { id: '90° berlawanan arah jarum jam', en: '90° anticlockwise', f: (x, y) => [-y, x] },
  { id: '180°', en: '180°', f: (x, y) => [-x, -y] },
  { id: '90° searah jarum jam', en: '90° clockwise', f: (x, y) => [y, -x] },
  { id: '270° berlawanan arah jarum jam', en: '270° anticlockwise', f: (x, y) => [y, -x] },
];
const rotate = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 1);
    let x = nz(rnd, -8, 8);
    let y = nz(rnd, -8, 8);
    if (Math.abs(x) === Math.abs(y)) y = y > 0 ? y + 1 : y - 1;
    const ri_ = ri(rnd, 0, 3);
    const R = ROT[ri_];
    const img = R.f(x, y);
    const cands = [
      [pt(lang, y, -x), L(lang, 'Itu rotasi 90° searah jarum jam.', 'That is a 90° clockwise rotation.')],
      [pt(lang, -y, x), L(lang, 'Itu rotasi 90° berlawanan arah jarum jam.', 'That is a 90° anticlockwise rotation.')],
      [pt(lang, -x, -y), L(lang, 'Itu rotasi 180°.', 'That is a 180° rotation.')],
      [pt(lang, y, x), L(lang, 'Itu refleksi terhadap garis y = x, bukan rotasi.', 'That is a reflection in y = x, not a rotation.')],
      [pt(lang, x, -y), L(lang, 'Itu refleksi terhadap sumbu x.', 'That is a reflection in the x-axis.')],
    ];
    if (kind === 0)
      return mc(
        L(lang, `Bayangan titik ${pt(lang, x, y)} oleh rotasi ${R.id} dengan pusat O adalah …`, `The image of ${pt(lang, x, y)} after a rotation of ${R.en} about O is …`),
        pt(lang, ...img),
        cands,
        [L(lang, `Rotasi ${R.id}: ${['(x, y) → (−y, x)', '(x, y) → (−x, −y)', '(x, y) → (y, −x)', '(x, y) → (y, −x)'][ri_]}.`, `Rotation ${R.en}: ${['(x, y) → (−y, x)', '(x, y) → (−x, −y)', '(x, y) → (y, −x)', '(x, y) → (y, −x)'][ri_]}.`), pt(lang, ...img)],
        { kind, x, y, r: ri_ },
      );
    // cari titik asal dari bayangan rotasi 90° berlawanan
    const im = ROT[0].f(x, y);
    return mc(
      L(lang, `Titik P diputar 90° berlawanan arah jarum jam dengan pusat O, bayangannya P'${pt(lang, ...im)}. Koordinat P adalah …`, `Point P is rotated 90° anticlockwise about O and its image is P'${pt(lang, ...im)}. What are the coordinates of P?`),
      pt(lang, x, y),
      [
        [pt(lang, ...ROT[0].f(...im)), L(lang, 'Itu hasil memutar bayangannya sekali lagi. Untuk kembali, putar 90° searah jarum jam.', 'That rotates the image once more. To go back, rotate 90° clockwise.')],
        [pt(lang, ...im), L(lang, 'Itu bayangannya.', 'That is the image.')],
        [pt(lang, -x, -y), L(lang, 'Itu titik asal yang diputar 180°.', 'That is the original rotated 180°.')],
      ],
      [L(lang, 'Untuk mencari titik asal, putar balik: 90° searah jarum jam, (x, y) → (y, −x).', 'To find the original, rotate back 90° clockwise: (x, y) → (y, −x).'), `P = ${pt(lang, x, y)}`],
      { kind, im },
    );
  },
  (m, lang) => (m.kind === 0 ? pt(lang, ...ROT[m.r].f(m.x, m.y)) : pt(lang, ...ROT[2].f(...m.im))),
);

const dilate = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const k = pick(rnd, [2, 3, -2, 4, -1, 0.5]);
      let x = nz(rnd, -6, 6);
      let y = nz(rnd, -6, 6);
      if (k === 0.5) {
        x *= 2;
        y *= 2;
      }
      return mc(
        L(lang, `Bayangan titik ${pt(lang, x, y)} oleh dilatasi faktor ${M(lang, k)} dengan pusat O adalah …`, `The image of ${pt(lang, x, y)} after a dilation with scale factor ${M(lang, k)} about O is …`),
        pt(lang, k * x, k * y),
        [
          [pt(lang, x + k, y + k), L(lang, 'Dilatasi mengalikan koordinat, bukan menambah.', 'A dilation multiplies the coordinates; it does not add.')],
          [pt(lang, k * x, y), L(lang, 'Kedua koordinat dikalikan faktor skala.', 'Both coordinates are multiplied by the scale factor.')],
          [pt(lang, -k * x, -k * y), L(lang, 'Tandanya keliru.', 'The sign is wrong.')],
          [pt(lang, x / k, y / k), L(lang, 'Koordinat dikalikan k, bukan dibagi.', 'Multiply by k, do not divide.')],
        ],
        [`(${M(lang, k)} × ${P(lang, x)}, ${M(lang, k)} × ${P(lang, y)})`, pt(lang, k * x, k * y)],
        { kind, x, y, k },
      );
    }
    if (kind === 1) {
      const A = ri(rnd, 2, 12);
      const k = pick(rnd, [2, 3, 4, 5]);
      const side = rnd() < 0.4;
      return num(
        side ? L(lang, `Sebuah persegi bersisi ${A} cm didilatasi dengan faktor ${k}. Panjang sisi bayangannya adalah … cm`, `A square with side ${A} cm is dilated by a factor of ${k}. How long is the image's side, in cm?`) : L(lang, `Segitiga dengan luas ${A} cm² didilatasi dengan faktor ${k}. Luas bayangannya adalah … cm²`, `A triangle with area ${A} cm² is dilated by a factor of ${k}. What is the image's area, in cm²?`),
        side ? A * k : A * k * k,
        side ? [[A + k, L(lang, 'Panjang dikalikan faktor, bukan ditambah.', 'Lengths are multiplied by the factor, not added.')], [A * k * k, L(lang, 'Itu untuk luas. Panjang sisi cukup dikali k.', 'That is for area. A length is just multiplied by k.')]] : [[A * k, L(lang, `Luas berubah k² kali, yaitu ${k * k} kali, bukan ${k} kali.`, `Area changes by k², that is ${k * k} times, not ${k} times.`)], [A * k * k * k, L(lang, 'Itu k³ (untuk volume). Luas berubah k² kali.', 'That is k³ (for volume). Area changes by k².')]],
        side ? [`${A} × ${k} = ${A * k}`] : [L(lang, `Luas berubah k² = ${k * k} kali.`, `Area scales by k² = ${k * k}.`), `${A} × ${k * k} = ${A * k * k}`],
        { kind, A, k, side },
      );
    }
    const k0 = pick(rnd, [[2, 3], [1, 2], [3, 2], [3, 4], [5, 2], [1, 3], [4, 3]]);
    const u = ri(rnd, 1, 4);
    const x = k0[1] * u * pick(rnd, [1, -1]);
    const y = k0[1] * ri(rnd, 1, 3) * pick(rnd, [1, -1]);
    const xi = (x * k0[0]) / k0[1];
    const yi = (y * k0[0]) / k0[1];
    return num(
      L(lang, `Titik P${pt(lang, x, y)} didilatasi dengan pusat O menjadi P'${pt(lang, xi, yi)}. Faktor dilatasinya adalah … (boleh pecahan)`, `P${pt(lang, x, y)} is dilated about O to P'${pt(lang, xi, yi)}. What is the scale factor? (a fraction is fine)`),
      F(k0[0], k0[1]),
      [[F(k0[1], k0[0]), L(lang, "k = bayangan ÷ asal, bukan asal ÷ bayangan.", "k = image ÷ original, not original ÷ image.")], [D(xi - x), L(lang, 'Itu selisih, bukan faktor. Dilatasi memakai perkalian.', 'That is a difference, not a factor. Dilation uses multiplication.')]],
      [`k = ${M(lang, xi)} ÷ ${P(lang, x)}`, `= ${FR(k0[0], k0[1])}`],
      { kind, x, xi },
    );
  },
  (m, lang) => {
    if (m.kind === 0) return pt(lang, m.k * m.x, m.k * m.y);
    if (m.kind === 1) return D(m.side ? m.A * m.k : m.A * m.k ** 2);
    return F(m.xi, m.x);
  },
);

// ================= Bab 4: Kekongruenan dan Kesebangunan =================
const congNum = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 1);
    if (kind === 0) {
      const A = ri(rnd, 30, 90);
      const B = ri(rnd, 25, 150 - A);
      const C = 180 - A - B;
      const ask = pick(rnd, [['D', A], ['E', B], ['F', C]]);
      const given = shuf(rnd, [['A', A], ['B', B], ['C', C]].filter((g) => g[0] !== { D: 'A', E: 'B', F: 'C' }[ask[0]]));
      return num(
        L(lang, `△ABC ≅ △DEF dengan ∠${given[0][0]} = ${given[0][1]}° dan ∠${given[1][0]} = ${given[1][1]}°. Besar ∠${ask[0]} adalah …°`, `△ABC ≅ △DEF with ∠${given[0][0]} = ${given[0][1]}° and ∠${given[1][0]} = ${given[1][1]}°. What is ∠${ask[0]} in degrees?`),
        ask[1],
        [[given[0][1], L(lang, `∠${ask[0]} bersesuaian dengan ∠${{ D: 'A', E: 'B', F: 'C' }[ask[0]]}, bukan ∠${given[0][0]}.`, `∠${ask[0]} corresponds to ∠${{ D: 'A', E: 'B', F: 'C' }[ask[0]]}, not ∠${given[0][0]}.`)], [given[0][1] + given[1][1], L(lang, 'Sudut ketiga = 180° dikurangi dua sudut lainnya.', 'The third angle = 180° minus the other two.')]],
        [L(lang, `∠${ask[0]} bersesuaian dengan ∠${{ D: 'A', E: 'B', F: 'C' }[ask[0]]}.`, `∠${ask[0]} corresponds to ∠${{ D: 'A', E: 'B', F: 'C' }[ask[0]]}.`), `180° − ${given[0][1]}° − ${given[1][1]}° = ${ask[1]}°`],
        { kind, g1: given[0][1], g2: given[1][1] },
      );
    }
    const p = ri(rnd, 4, 20);
    let l = ri(rnd, 2, 15);
    if (l === p) l++;
    const askK = rnd() < 0.5;
    return num(
      L(lang, `Persegi panjang ABCD kongruen dengan persegi panjang PQRS. AB = ${p} cm dan BC = ${l} cm. ${askK ? 'Keliling' : 'Luas'} PQRS adalah … ${askK ? 'cm' : 'cm²'}`, `Rectangle ABCD is congruent to rectangle PQRS. AB = ${p} cm and BC = ${l} cm. What is the ${askK ? 'perimeter' : 'area'} of PQRS, in ${askK ? 'cm' : 'cm²'}?`),
      askK ? 2 * (p + l) : p * l,
      [[askK ? p + l : 2 * (p + l), askK ? L(lang, 'Itu setengah keliling.', 'That is half the perimeter.') : L(lang, 'Itu kelilingnya.', 'That is the perimeter.')], [askK ? p * l : p + l, askK ? L(lang, 'Itu luasnya.', 'That is the area.') : L(lang, 'Luas = panjang × lebar.', 'Area = length × width.')]],
      [L(lang, 'Bangun kongruen punya ukuran yang sama persis.', 'Congruent shapes have exactly the same size.'), askK ? `2 × (${p} + ${l}) = ${2 * (p + l)}` : `${p} × ${l} = ${p * l}`],
      { kind, p, l, askK },
    );
  },
  (m) => (m.kind === 0 ? D(180 - m.g1 - m.g2) : D(m.askK ? 2 * m.p + 2 * m.l : m.p * m.l)),
);

// Pool konseptual kekongruenan (ditulis baru, bukan salinan soal bank)
const CONG_POOL = [
  ['Dua segitiga memiliki tiga pasang sisi yang sama panjang. Keduanya kongruen berdasarkan syarat …', 'Two triangles have three pairs of equal sides. They are congruent by …', 'sisi – sisi – sisi', 'side – side – side', ['sudut – sisi – sudut', 'sisi – sudut – sisi', 'sudut – sudut – sudut']],
  ['Dua segitiga memiliki dua pasang sudut sama besar dan sisi di antara kedua sudut itu sama panjang. Syarat kongruennya …', 'Two triangles have two pairs of equal angles and the side between them is equal. The congruence condition is …', 'sudut – sisi – sudut', 'angle – side – angle', ['sisi – sisi – sisi', 'sisi – sudut – sisi', 'sudut – sudut – sudut']],
  ['Dua segitiga memiliki dua pasang sisi sama panjang dan sudut yang diapit kedua sisi itu sama besar. Syarat kongruennya …', 'Two triangles have two pairs of equal sides and the angle between those sides is equal. The congruence condition is …', 'sisi – sudut – sisi', 'side – angle – side', ['sisi – sisi – sisi', 'sudut – sisi – sudut', 'sudut – sudut – sudut']],
  ['Syarat manakah yang TIDAK menjamin dua segitiga kongruen?', 'Which condition does NOT guarantee that two triangles are congruent?', 'sudut – sudut – sudut', 'angle – angle – angle', ['sisi – sisi – sisi', 'sisi – sudut – sisi', 'sudut – sisi – sudut']],
  ['Manakah pasangan bangun yang pasti kongruen?', 'Which pair of shapes is certainly congruent?', 'dua lingkaran berjari-jari 4 cm', 'two circles of radius 4 cm', ['dua persegi panjang yang luasnya 20 cm²', 'dua segitiga sama sisi sembarang', 'dua belah ketupat bersisi 5 cm']],
  ['Manakah pasangan bangun yang pasti kongruen?', 'Which pair of shapes is certainly congruent?', 'dua segitiga sama sisi bersisi 6 cm', 'two equilateral triangles with side 6 cm', ['dua segitiga dengan sudut 40°, 60°, dan 80°', 'dua persegi panjang dengan keliling 24 cm', 'dua jajargenjang dengan alas 8 cm']],
  ['Jika △KLM ≅ △XYZ, sisi yang sama panjang dengan LM adalah …', 'If △KLM ≅ △XYZ, the side equal to LM is …', 'YZ', 'YZ', ['XY', 'XZ', 'KM']],
  ['Jika △PQR ≅ △STU, sudut yang sama besar dengan ∠Q adalah …', 'If △PQR ≅ △STU, the angle equal to ∠Q is …', '∠T', '∠T', ['∠S', '∠U', '∠R']],
  ['Dua bangun yang kongruen pasti memiliki …', 'Two congruent shapes always have …', 'bentuk dan ukuran yang sama', 'the same shape and size', ['letak yang sama', 'warna yang sama', 'bentuk sama, ukuran boleh berbeda']],
  ['Sebuah segitiga dicerminkan terhadap sebuah garis. Bayangannya …', 'A triangle is reflected in a line. Its image is …', 'kongruen dengan segitiga semula', 'congruent to the original triangle', ['lebih besar dari segitiga semula', 'sebangun tetapi tidak kongruen', 'tidak sebangun dengan segitiga semula']],
  ['Persegi ABCD kongruen dengan persegi PQRS. Jika keliling ABCD 36 cm, panjang sisi PQRS adalah …', 'Square ABCD is congruent to square PQRS. If the perimeter of ABCD is 36 cm, the side of PQRS is …', '9 cm', '9 cm', ['36 cm', '18 cm', '6 cm']],
  ['Dua segitiga siku-siku memiliki sisi miring sama panjang dan satu sisi siku-siku sama panjang. Kedua segitiga itu …', 'Two right triangles have equal hypotenuses and one equal leg. The two triangles are …', 'pasti kongruen', 'certainly congruent', ['hanya sebangun', 'belum tentu kongruen', 'tidak mungkin kongruen']],
];
const WHY_C = ['Periksa lagi unsur yang diketahui dan urutannya.', 'Check again which parts are given and in what order.'];
const congPool = withSolve(
  (rnd, lang) => {
    const i = ri(rnd, 0, CONG_POOL.length - 1);
    const [qi, qe, ai, ae, wr] = CONG_POOL[i];
    const WR_EN = {
      'sudut – sisi – sudut': 'angle – side – angle',
      'sisi – sudut – sisi': 'side – angle – side',
      'sudut – sudut – sudut': 'angle – angle – angle',
      'sisi – sisi – sisi': 'side – side – side',
      'dua persegi panjang yang luasnya 20 cm²': 'two rectangles with area 20 cm²',
      'dua segitiga sama sisi sembarang': 'any two equilateral triangles',
      'dua belah ketupat bersisi 5 cm': 'two rhombuses with side 5 cm',
      'dua segitiga dengan sudut 40°, 60°, dan 80°': 'two triangles with angles 40°, 60°, and 80°',
      'dua persegi panjang dengan keliling 24 cm': 'two rectangles with perimeter 24 cm',
      'dua jajargenjang dengan alas 8 cm': 'two parallelograms with base 8 cm',
      'letak yang sama': 'the same position',
      'warna yang sama': 'the same colour',
      'bentuk sama, ukuran boleh berbeda': 'the same shape but possibly different sizes',
      'lebih besar dari segitiga semula': 'larger than the original',
      'sebangun tetapi tidak kongruen': 'similar but not congruent',
      'tidak sebangun dengan segitiga semula': 'not similar to the original',
      'hanya sebangun': 'only similar',
      'belum tentu kongruen': 'not necessarily congruent',
      'tidak mungkin kongruen': 'never congruent',
    };
    const why = (t) =>
      ({
        'sudut – sudut – sudut': L(lang, 'Tiga sudut sama hanya menjamin sebangun, ukurannya bisa berbeda.', 'Three equal angles only guarantee similarity; the sizes can differ.'),
        'dua persegi panjang yang luasnya 20 cm²': L(lang, 'Luas sama belum tentu ukurannya sama, misalnya 4 × 5 dan 2 × 10.', 'Equal area does not mean equal size, e.g. 4 × 5 and 2 × 10.'),
        'dua segitiga sama sisi sembarang': L(lang, 'Panjang sisinya bisa berbeda.', 'Their sides can be different lengths.'),
        'dua belah ketupat bersisi 5 cm': L(lang, 'Sudutnya bisa berbeda, jadi bentuknya belum tentu sama.', 'Their angles can differ, so the shapes may not match.'),
        'dua segitiga dengan sudut 40°, 60°, dan 80°': L(lang, 'Sudut sama hanya menjamin sebangun.', 'Equal angles only guarantee similarity.'),
        'dua persegi panjang dengan keliling 24 cm': L(lang, 'Keliling sama belum tentu ukurannya sama, misalnya 5 × 7 dan 4 × 8.', 'Equal perimeter does not mean equal size, e.g. 5 × 7 and 4 × 8.'),
        'dua jajargenjang dengan alas 8 cm': L(lang, 'Sisi miring dan sudutnya bisa berbeda.', 'The other side and the angles can differ.'),
        '36 cm': L(lang, 'Itu kelilingnya. Sisi persegi = keliling ÷ 4.', 'That is the perimeter. Side = perimeter ÷ 4.'),
        '18 cm': L(lang, 'Persegi punya 4 sisi, jadi bagi 4.', 'A square has 4 sides, so divide by 4.'),
        '6 cm': L(lang, '6 × 4 = 24, bukan 36.', '6 × 4 = 24, not 36.'),
      })[t] || L(lang, ...WHY_C);
    return mc(
      L(lang, qi, qe),
      L(lang, ai, ae),
      wr.map((w) => [L(lang, w, WR_EN[w] || w), why(w)]),
      [L(lang, 'Bangun kongruen: bentuk dan ukurannya sama. Syarat segitiga kongruen: sisi-sisi-sisi, sisi-sudut-sisi, sudut-sisi-sudut.', 'Congruent shapes have the same shape and size. Triangle conditions: SSS, SAS, ASA.'), L(lang, `Jawaban: ${ai}.`, `Answer: ${ae}.`)],
      { i },
    );
  },
  (m, lang) => L(lang, CONG_POOL[m.i][2], CONG_POOL[m.i][3]),
);

const similar = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const a = ri(rnd, 2, 9);
      let b = ri(rnd, 3, 12);
      if (b === a) b++;
      const k = pick(rnd, [2, 3, 1.5, 2.5, 4]);
      const okT = `${M(lang, a * k)} cm × ${M(lang, b * k)} cm`;
      return mc(
        L(lang, `Persegi panjang manakah yang sebangun dengan persegi panjang ${a} cm × ${b} cm?`, `Which rectangle is similar to a ${a} cm × ${b} cm rectangle?`),
        okT,
        [
          [`${a + 2} cm × ${b + 2} cm`, L(lang, 'Kedua sisi ditambah sama banyak, tetapi perbandingannya berubah.', 'Adding the same amount to both sides changes the ratio.')],
          [`${M(lang, a * k)} cm × ${b + 1} cm`, L(lang, 'Kedua sisi harus dikali dengan faktor yang sama.', 'Both sides must be multiplied by the same factor.')],
          [`${a} cm × ${a} cm`, L(lang, 'Itu persegi; perbandingan sisinya berbeda.', 'That is a square; its side ratio is different.')],
        ],
        [L(lang, `Perbandingan sisi harus sama: ${a} : ${b}.`, `The side ratio must match: ${a} : ${b}.`), `${M(lang, a * k)} : ${M(lang, b * k)} = ${a} : ${b}`],
        { kind, a, b, k },
      );
    }
    const s1 = ri(rnd, 2, 9);
    const s2 = ri(rnd, s1 + 1, 14);
    const k = pick(rnd, [2, 3, 1.5, 2.5]);
    if (kind === 1)
      return num(
        L(lang, `△ABC sebangun dengan △DEF. AB = ${s1} cm, AC = ${s2} cm, dan DE = ${M(lang, s1 * k)} cm. Jika AC bersesuaian dengan DF, panjang DF adalah … cm`, `△ABC is similar to △DEF. AB = ${s1} cm, AC = ${s2} cm, and DE = ${M(lang, s1 * k)} cm. If AC corresponds to DF, how long is DF, in cm?`),
        s2 * k,
        [[s2 + s1 * k - s1, L(lang, 'Sisi sebangun memakai perkalian dengan faktor skala, bukan penjumlahan selisih.', 'Similar sides use multiplication by the scale factor, not adding the difference.')], [(s2 * s1) / (s1 * k), L(lang, 'Faktor skala = DE ÷ AB. Kalikan AC dengan faktor itu.', 'Scale factor = DE ÷ AB. Multiply AC by it.')]],
        [L(lang, `Faktor skala = ${M(lang, s1 * k)} ÷ ${s1} = ${M(lang, k)}.`, `Scale factor = ${M(lang, s1 * k)} ÷ ${s1} = ${M(lang, k)}.`), `DF = ${s2} × ${M(lang, k)} = ${M(lang, s2 * k)}`],
        { kind, ab: s1, ac: s2, de: s1 * k },
      );
    const kk = ri(rnd, 2, 4);
    return num(
      L(lang, `Dua segitiga sebangun dengan faktor skala ${kk}. Sisi terpendek segitiga kecil ${s1} cm. Sisi terpendek segitiga besar adalah … cm`, `Two similar triangles have a scale factor of ${kk}. The shortest side of the small triangle is ${s1} cm. How long is the shortest side of the large triangle, in cm?`),
      s1 * kk,
      [[s1 + kk, L(lang, 'Faktor skala berarti dikalikan.', 'A scale factor means multiplying.')], [s1 * kk * kk, L(lang, 'Panjang sisi dikali k, bukan k².', 'Lengths are multiplied by k, not k².')]],
      [`${s1} × ${kk} = ${s1 * kk}`],
      { kind, s1, kk },
    );
  },
  (m, lang) => {
    if (m.kind === 0) return `${M(lang, m.a * m.k)} cm × ${M(lang, m.b * m.k)} cm`;
    if (m.kind === 1) return D((m.ac * m.de) / m.ab);
    return D(m.s1 * m.kk);
  },
);

const simApp = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0) {
      const t = ri(rnd, 1, 4);
      const s = ri(rnd, 2, 6);
      const k = ri(rnd, 3, 8);
      const obj = pick(rnd, [['menara', 'tower'], ['pohon', 'tree'], ['gedung', 'building'], ['tiang bendera', 'flagpole']]);
      return num(
        L(lang, `Tongkat setinggi ${t} m memiliki bayangan ${s} m. Pada saat yang sama, bayangan ${obj[0]} ${s * k} m. Tinggi ${obj[0]} adalah … m`, `A ${t} m stick casts a ${s} m shadow. At the same time, a ${obj[1]} casts a ${s * k} m shadow. How tall is the ${obj[1]}, in m?`),
        t * k,
        [[Number.isInteger((s * s * k) / t) ? (s * s * k) / t : null, L(lang, 'Perbandingannya tinggi : bayangan, jangan terbalik.', 'Use height : shadow, not the other way round.')], [s * k + t - s, L(lang, 'Kesebangunan memakai perbandingan, bukan selisih.', 'Similarity uses ratios, not differences.')]],
        [`${t}/${s} = t/${s * k}`, `t = ${t} × ${s * k} ÷ ${s} = ${t * k}`],
        { kind, t, s, S: s * k },
      );
    }
    if (kind === 1) {
      const ad = ri(rnd, 2, 8);
      const db = ri(rnd, 1, 6);
      const ab = ad + db;
      const de = ri(rnd, 2, 6) * ad;
      const bc = (de * ab) / ad;
      return num(
        L(lang, `Pada segitiga ABC, DE sejajar BC dengan D pada AB dan E pada AC. AD = ${ad} cm, DB = ${db} cm, dan BC = ${bc} cm. Panjang DE adalah … cm`, `In triangle ABC, DE is parallel to BC with D on AB and E on AC. AD = ${ad} cm, DB = ${db} cm, and BC = ${bc} cm. How long is DE, in cm?`),
        de,
        [[Number.isInteger((bc * ad) / db) ? (bc * ad) / db : null, L(lang, 'Bandingkan AD dengan AB (seluruh sisi), bukan dengan DB.', 'Compare AD with AB (the whole side), not with DB.')], [bc - db, L(lang, 'Gunakan perbandingan, bukan pengurangan.', 'Use a ratio, not subtraction.')]],
        [`DE/BC = AD/AB = ${ad}/${ab}`, `DE = ${ad}/${ab} × ${bc} = ${de}`],
        { kind, ad, db, bc },
      );
    }
    if (kind === 2) {
      const w = pick(rnd, [10, 12, 15, 20, 24]);
      const h = pick(rnd, [15, 18, 20, 30, 36]);
      const k = pick(rnd, [1.5, 2, 2.5, 3]);
      if (w === h) return simApp(rnd, lang);
      return num(
        L(lang, `Sebuah foto ${w} cm × ${h} cm (lebar × tinggi) ditempel pada karton yang lebarnya ${M(lang, w * k)} cm. Agar karton sebangun dengan foto, tinggi karton harus … cm`, `A ${w} cm × ${h} cm photo (width × height) is mounted on card ${M(lang, w * k)} cm wide. For the card to be similar to the photo, how tall must it be, in cm?`),
        h * k,
        [[h + w * k - w, L(lang, 'Sebangun berarti dikali faktor yang sama, bukan ditambah selisih yang sama.', 'Similar means multiplying by the same factor, not adding the same amount.')], [w * k, L(lang, 'Itu lebarnya.', 'That is the width.')]],
        [L(lang, `Faktor = ${M(lang, w * k)} ÷ ${w} = ${M(lang, k)}.`, `Factor = ${M(lang, w * k)} ÷ ${w} = ${M(lang, k)}.`), `${h} × ${M(lang, k)} = ${M(lang, h * k)}`],
        { kind, w, h, W: w * k },
      );
    }
    const S = pick(rnd, [50, 100, 200, 250, 500]);
    const cm = ri(rnd, 2, 12);
    return num(
      L(lang, `Skala denah 1 : ${S}. Panjang kamar pada denah ${cm} cm. Panjang kamar sebenarnya adalah … m`, `A floor plan has scale 1 : ${S}. A room is ${cm} cm long on the plan. How long is the real room, in m?`),
      (cm * S) / 100,
      [[cm * S, L(lang, 'Itu dalam cm. Ubah ke meter (bagi 100).', 'That is in cm. Convert to metres (divide by 100).')], [cm / S, L(lang, 'Ukuran sebenarnya lebih besar, jadi dikali skala.', 'The real size is bigger, so multiply by the scale.')]],
      [`${cm} × ${S} = ${cm * S} cm`, `= ${M(lang, (cm * S) / 100)} m`],
      { kind, S, cm },
    );
  },
  (m) => {
    if (m.kind === 0) return D((m.t * m.S) / m.s);
    if (m.kind === 1) return D((m.bc * m.ad) / (m.ad + m.db));
    if (m.kind === 2) return D((m.h * m.W) / m.w);
    return D((m.cm * m.S) / 100);
  },
);

// ================= Bab 5 & 6: Lingkaran dan Bangun Ruang Sisi Lengkung =================
// pilih π dan jari-jari yang cocok
const piPick = (rnd, lang, { rmax = 21 } = {}) => {
  const seven = rnd() < 0.55;
  const r = seven ? 7 * ri(rnd, 1, Math.max(1, Math.floor(rmax / 7))) : pick(rnd, [2, 3, 4, 5, 6, 8, 10, 12, 15, 20].filter((v) => v <= rmax));
  return { r, pi: seven ? 22 / 7 : 3.14, piT: seven ? '22/7' : M(lang, 3.14), seven };
};
const PIQ = (lang, piT) => L(lang, `(π = ${piT})`, `(π = ${piT})`);
const PI = (seven) => (seven ? 22 / 7 : 3.14);

const circum = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const { r, piT, seven } = piPick(rnd, lang);
    const pi = PI(seven);
    if (kind === 0 || kind === 1) {
      const useD = kind === 1;
      return num(
        L(lang, `Keliling lingkaran ber${useD ? 'diameter' : 'jari-jari'} ${useD ? 2 * r : r} cm adalah … cm ${PIQ(lang, piT)}`, `What is the circumference of a circle with ${useD ? 'diameter' : 'radius'} ${useD ? 2 * r : r} cm, in cm? ${PIQ(lang, piT)}`),
        2 * pi * r,
        [[pi * r, L(lang, 'Keliling = 2πr = πd. Jari-jari harus dikali 2.', 'Circumference = 2πr = πd. The radius must be doubled.')], [pi * r * r, L(lang, 'Itu luasnya.', 'That is the area.')], [useD ? 4 * pi * r : null, L(lang, 'Diameter tidak perlu dikali 2 lagi. K = πd.', 'Do not double the diameter again. C = πd.')]],
        [useD ? `K = π × d = ${piT} × ${2 * r}` : `K = 2 × π × r = 2 × ${piT} × ${r}`, `= ${M(lang, 2 * pi * r)}`],
        { kind, r, seven },
      );
    }
    if (kind === 2) {
      const C = 2 * pi * r;
      return num(
        L(lang, `Keliling sebuah lingkaran ${M(lang, C)} cm. Jari-jarinya adalah … cm ${PIQ(lang, piT)}`, `A circle has circumference ${M(lang, C)} cm. What is its radius, in cm? ${PIQ(lang, piT)}`),
        r,
        [[2 * r, L(lang, 'Itu diameternya. Jari-jari = d ÷ 2.', 'That is the diameter. Radius = d ÷ 2.')]],
        [`2 × ${piT} × r = ${M(lang, C)}`, `r = ${M(lang, C)} ÷ (2 × ${piT}) = ${r}`],
        { kind, C, seven },
      );
    }
    const d = pick(rnd, [42, 56, 63, 70, 84]);
    const n = pick(rnd, [50, 100, 200, 500]);
    return num(
      L(lang, `Roda sepeda berdiameter ${d} cm berputar ${n} kali. Jarak yang ditempuh adalah … m ${PIQ(lang, '22/7')}`, `A bicycle wheel with diameter ${d} cm turns ${n} times. How far does it travel, in m? ${PIQ(lang, '22/7')}`),
      ((22 / 7) * d * n) / 100,
      [[(22 / 7) * d * n, L(lang, 'Itu dalam cm. Ubah ke meter.', 'That is in cm. Convert to metres.')], [((22 / 7) * d * n) / 200, L(lang, 'Satu putaran = keliling = πd (diameter, bukan jari-jari).', 'One turn = circumference = πd (diameter, not radius).')]],
      [L(lang, `Satu putaran = 22/7 × ${d} = ${(22 / 7) * d} cm.`, `One turn = 22/7 × ${d} = ${(22 / 7) * d} cm.`), `${n} × ${(22 / 7) * d} = ${G_(lang, (22 / 7) * d * n)} cm = ${M(lang, ((22 / 7) * d * n) / 100)} m`],
      { kind, d, n },
    );
  },
  (m) => {
    const pi = m.seven ? 22 / 7 : 3.14;
    if (m.kind <= 1) return D(2 * pi * m.r);
    if (m.kind === 2) return D(m.C / (2 * pi));
    return D(((22 / 7) * m.d * m.n) / 100);
  },
);
const G_ = (lang, x) => G(lang, Math.round(x));

const circArea = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const { r, piT, seven } = piPick(rnd, lang);
    const pi = PI(seven);
    if (kind === 0 || kind === 1) {
      const useD = kind === 1;
      return num(
        L(lang, `Luas lingkaran ber${useD ? 'diameter' : 'jari-jari'} ${useD ? 2 * r : r} cm adalah … cm² ${PIQ(lang, piT)}`, `What is the area of a circle with ${useD ? 'diameter' : 'radius'} ${useD ? 2 * r : r} cm, in cm²? ${PIQ(lang, piT)}`),
        pi * r * r,
        [[2 * pi * r, L(lang, 'Itu kelilingnya. Luas = πr².', 'That is the circumference. Area = πr².')], [useD ? pi * 4 * r * r : null, L(lang, 'Pakai jari-jari (setengah diameter), bukan diameter.', 'Use the radius (half the diameter), not the diameter.')], [useD ? null : pi * r * 2, L(lang, 'r² artinya r × r, bukan r × 2.', 'r² means r × r, not r × 2.')]],
        [useD ? L(lang, `r = ${2 * r} ÷ 2 = ${r}.`, `r = ${2 * r} ÷ 2 = ${r}.`) : 'L = π × r²', `${piT} × ${r} × ${r} = ${M(lang, pi * r * r)}`],
        { kind, r, seven },
      );
    }
    if (kind === 2) {
      const A = pi * r * r;
      return num(
        L(lang, `Luas sebuah lingkaran ${M(lang, A)} cm². Jari-jarinya adalah … cm ${PIQ(lang, piT)}`, `A circle has area ${M(lang, A)} cm². What is its radius, in cm? ${PIQ(lang, piT)}`),
        r,
        [[r * r, L(lang, 'Itu r². Ambil akarnya.', 'That is r². Take the square root.')], [2 * r, L(lang, 'Itu diameternya.', 'That is the diameter.')]],
        [`r² = ${M(lang, A)} ÷ ${piT} = ${r * r}`, `r = ${r}`],
        { kind, A, seven },
      );
    }
    const d = 2 * r;
    return num(
      L(lang, `Taman berbentuk setengah lingkaran dengan diameter ${d} m. Luas taman adalah … m² ${PIQ(lang, piT)}`, `A garden is a semicircle with diameter ${d} m. What is its area, in m²? ${PIQ(lang, piT)}`),
      (pi * r * r) / 2,
      [[pi * r * r, L(lang, 'Itu luas satu lingkaran penuh. Bagi 2.', 'That is a full circle. Halve it.')], [(pi * d * d) / 2, L(lang, 'Pakai jari-jari, bukan diameter.', 'Use the radius, not the diameter.')]],
      [L(lang, `r = ${r} m. Luas lingkaran penuh = ${piT} × ${r}² = ${M(lang, pi * r * r)}.`, `r = ${r} m. Full circle = ${piT} × ${r}² = ${M(lang, pi * r * r)}.`), `½ × ${M(lang, pi * r * r)} = ${M(lang, (pi * r * r) / 2)}`],
      { kind, r, seven },
    );
  },
  (m) => {
    const pi = m.seven ? 22 / 7 : 3.14;
    if (m.kind === 2) return D(Math.sqrt(m.A / pi));
    return D((pi * m.r * m.r) / (m.kind === 3 ? 2 : 1));
  },
);

const sector = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 2) {
      const c = pick(rnd, [40, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160]);
      const toIns = rnd() < 0.6;
      return num(
        toIns
          ? L(lang, `Sudut pusat ${c}° menghadap busur yang sama dengan sudut keliling. Besar sudut keliling adalah …°`, `A central angle of ${c}° and an inscribed angle stand on the same arc. What is the inscribed angle, in degrees?`)
          : L(lang, `Sudut keliling ${c / 2}° menghadap busur yang sama dengan sudut pusat. Besar sudut pusat adalah …°`, `An inscribed angle of ${c / 2}° and a central angle stand on the same arc. What is the central angle, in degrees?`),
        toIns ? c / 2 : c,
        [[toIns ? 2 * c : c / 4, L(lang, 'Sudut keliling setengah dari sudut pusat.', 'The inscribed angle is half the central angle.')], [toIns ? c : c / 2, L(lang, 'Kedua sudut tidak sama besar.', 'The two angles are not equal.')], [toIns ? 180 - c : null, L(lang, 'Ini bukan sudut berpelurus.', 'These are not supplementary angles.')]],
        [L(lang, 'Sudut pusat = 2 × sudut keliling (menghadap busur yang sama).', 'Central angle = 2 × inscribed angle (same arc).'), toIns ? `${c}° ÷ 2 = ${c / 2}°` : `2 × ${c / 2}° = ${c}°`],
        { kind, c, toIns },
      );
    }
    const ang = pick(rnd, [30, 45, 60, 72, 90, 120, 135, 144, 150, 180, 240, 270]);
    const seven = rnd() < 0.6;
    const r = seven ? 7 * ri(rnd, 1, 4) : pick(rnd, [10, 20, 5, 6, 12]);
    const pi = PI(seven);
    const piT = seven ? '22/7' : M(lang, 3.14);
    const fr = ang / 360;
    if (kind === 0)
      return num(
        L(lang, `Panjang busur dengan sudut pusat ${ang}° pada lingkaran berjari-jari ${r} cm adalah … cm ${PIQ(lang, piT)}`, `What is the arc length for a central angle of ${ang}° in a circle of radius ${r} cm, in cm? ${PIQ(lang, piT)}`),
        fr * 2 * pi * r,
        [[fr * pi * r * r, L(lang, 'Itu luas juring. Panjang busur memakai keliling 2πr.', 'That is the sector area. Arc length uses the circumference 2πr.')], [2 * pi * r, L(lang, 'Itu keliling penuh. Kalikan dengan sudut/360°.', 'That is the full circumference. Multiply by angle/360°.')], [fr * pi * r, L(lang, 'Keliling = 2πr, jangan lupa 2.', 'Circumference = 2πr; do not forget the 2.')]],
        [`${ang}/360 × 2 × ${piT} × ${r}`, `= ${M(lang, fr * 2 * pi * r)}`],
        { kind, ang, r, seven },
      );
    if (kind === 1)
      return num(
        L(lang, `Luas juring dengan sudut pusat ${ang}° pada lingkaran berjari-jari ${r} cm adalah … cm² ${PIQ(lang, piT)}`, `What is the area of a sector with central angle ${ang}° in a circle of radius ${r} cm, in cm²? ${PIQ(lang, piT)}`),
        fr * pi * r * r,
        [[fr * 2 * pi * r, L(lang, 'Itu panjang busur. Luas juring memakai πr².', 'That is the arc length. Sector area uses πr².')], [pi * r * r, L(lang, 'Itu luas lingkaran penuh. Kalikan dengan sudut/360°.', 'That is the full circle. Multiply by angle/360°.')]],
        [`${ang}/360 × ${piT} × ${r}²`, `= ${M(lang, fr * pi * r * r)}`],
        { kind, ang, r, seven },
      );
    const C = pick(rnd, [24, 36, 44, 60, 72, 88, 120]);
    const arc = (C * ang) / 360;
    if (!Number.isInteger(arc * 10)) return sector(rnd, lang);
    return num(
      L(lang, `Panjang busur suatu juring ${M(lang, arc)} cm dan keliling lingkarannya ${C} cm. Besar sudut pusatnya adalah …°`, `A sector's arc is ${M(lang, arc)} cm long and the circle's circumference is ${C} cm. What is the central angle, in degrees?`),
      ang,
      [[Math.round((arc / C) * 100 * 100) / 100, L(lang, 'Itu persentasenya. Kalikan dengan 360°.', 'That is a percentage. Multiply by 360°.')], [(arc / C) * 180, L(lang, 'Satu putaran 360°, bukan 180°.', 'A full turn is 360°, not 180°.')]],
      [`${M(lang, arc)}/${C} × 360°`, `= ${ang}°`],
      { kind, arc, C },
    );
  },
  (m) => {
    if (m.kind === 2) return D(m.toIns ? m.c / 2 : m.c);
    if (m.kind === 3) return D((m.arc / m.C) * 360);
    const pi = m.seven ? 22 / 7 : 3.14;
    return D(m.kind === 0 ? (m.ang / 360) * 2 * pi * m.r : (m.ang / 360) * pi * m.r * m.r);
  },
);

const cylinder = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const { r, piT, seven } = piPick(rnd, lang, { rmax: 14 });
    const pi = PI(seven);
    const t = ri(rnd, 3, 20);
    if (kind === 0)
      return num(
        L(lang, `Volume tabung dengan jari-jari ${r} cm dan tinggi ${t} cm adalah … cm³ ${PIQ(lang, piT)}`, `What is the volume of a cylinder with radius ${r} cm and height ${t} cm, in cm³? ${PIQ(lang, piT)}`),
        pi * r * r * t,
        [[2 * pi * r * t, L(lang, 'Itu luas selimut. Volume = πr²t.', 'That is the curved surface. Volume = πr²t.')], [(pi * r * r * t) / 3, L(lang, 'Itu volume kerucut. Tabung tidak dibagi 3.', 'That is a cone. A cylinder is not divided by 3.')], [pi * r * t, L(lang, 'r² artinya r × r.', 'r² means r × r.')]],
        [L(lang, 'V = luas alas × tinggi = πr²t', 'V = base area × height = πr²h'), `${piT} × ${r}² × ${t} = ${M(lang, pi * r * r * t)}`],
        { kind, r, t, seven },
      );
    if (kind === 1)
      return num(
        L(lang, `Luas selimut tabung dengan jari-jari ${r} cm dan tinggi ${t} cm adalah … cm² ${PIQ(lang, piT)}`, `What is the curved surface area of a cylinder with radius ${r} cm and height ${t} cm, in cm²? ${PIQ(lang, piT)}`),
        2 * pi * r * t,
        [[pi * r * t, L(lang, 'Selimut = keliling alas × tinggi = 2πrt.', 'Curved surface = base circumference × height = 2πrh.')], [pi * r * r * t, L(lang, 'Itu volumenya.', 'That is the volume.')], [2 * pi * r * (r + t), L(lang, 'Itu luas permukaan seluruhnya (dengan tutup dan alas).', 'That is the total surface area (with top and base).')]],
        [L(lang, 'Selimut tabung berbentuk persegi panjang: keliling alas × tinggi.', 'The curved surface unrolls into a rectangle: base circumference × height.'), `2 × ${piT} × ${r} × ${t} = ${M(lang, 2 * pi * r * t)}`],
        { kind, r, t, seven },
      );
    if (kind === 2) {
      const open = rnd() < 0.5;
      const A = open ? pi * r * r + 2 * pi * r * t : 2 * pi * r * r + 2 * pi * r * t;
      return num(
        L(lang, `Luas permukaan tabung ${open ? 'tanpa tutup ' : ''}dengan jari-jari ${r} cm dan tinggi ${t} cm adalah … cm² ${PIQ(lang, piT)}`, `What is the surface area of a cylinder ${open ? 'without a lid ' : ''}with radius ${r} cm and height ${t} cm, in cm²? ${PIQ(lang, piT)}`),
        A,
        [[open ? 2 * pi * r * r + 2 * pi * r * t : pi * r * r + 2 * pi * r * t, open ? L(lang, 'Tabung tanpa tutup hanya punya satu lingkaran.', 'Without a lid there is only one circle.') : L(lang, 'Tabung punya dua lingkaran: alas dan tutup.', 'A cylinder has two circles: top and base.')], [2 * pi * r * t, L(lang, 'Luas lingkarannya belum ditambahkan.', 'The circle area is missing.')]],
        [L(lang, `Selimut = 2 × ${piT} × ${r} × ${t} = ${M(lang, 2 * pi * r * t)}. Satu lingkaran = ${piT} × ${r}² = ${M(lang, pi * r * r)}.`, `Curved = 2 × ${piT} × ${r} × ${t} = ${M(lang, 2 * pi * r * t)}. One circle = ${piT} × ${r}² = ${M(lang, pi * r * r)}.`), `${open ? '' : '2 × '}${M(lang, pi * r * r)} + ${M(lang, 2 * pi * r * t)} = ${M(lang, A)}`],
        { kind, r, t, seven, open },
      );
    }
    const d = pick(rnd, [14, 28, 42, 56, 70]);
    const h = pick(rnd, [20, 50, 60, 100]);
    const V = (22 / 7) * (d / 2) ** 2 * h;
    return num(
      L(lang, `Sebuah drum berbentuk tabung berdiameter ${d} cm dan tinggi ${h} cm. Volumenya … liter (π = 22/7)`, `A drum is a cylinder with diameter ${d} cm and height ${h} cm. What is its volume in litres? (π = 22/7)`),
      V / 1000,
      [[V, L(lang, 'Itu dalam cm³. 1 liter = 1.000 cm³.', 'That is in cm³. 1 litre = 1,000 cm³.')], [((22 / 7) * d * d * h) / 1000, L(lang, 'Pakai jari-jari, bukan diameter.', 'Use the radius, not the diameter.')]],
      [`22/7 × ${d / 2}² × ${h} = ${M(lang, V)} cm³`, `= ${M(lang, V / 1000)} ${L(lang, 'liter', 'litres')}`],
      { kind, d, h },
    );
  },
  (m) => {
    const pi = m.seven ? 22 / 7 : 3.14;
    if (m.kind === 0) return D(pi * m.r ** 2 * m.t);
    if (m.kind === 1) return D(2 * pi * m.r * m.t);
    if (m.kind === 2) return D((m.open ? 1 : 2) * pi * m.r ** 2 + 2 * pi * m.r * m.t);
    return D(((22 / 7) * (m.d / 2) ** 2 * m.h) / 1000);
  },
);

const CONE_T = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [7, 24, 25], [9, 12, 15], [8, 15, 17], [12, 16, 20], [14, 48, 50], [21, 20, 29], [7, 24, 25]];
const cone = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 1) {
      const [r, t, s] = pick(rnd, CONE_T);
      const askS = rnd() < 0.6;
      return num(
        askS ? L(lang, `Kerucut dengan jari-jari ${r} cm dan tinggi ${t} cm memiliki garis pelukis … cm`, `A cone with radius ${r} cm and height ${t} cm has slant height … cm`) : L(lang, `Kerucut dengan jari-jari ${r} cm dan garis pelukis ${s} cm memiliki tinggi … cm`, `A cone with radius ${r} cm and slant height ${s} cm has height … cm`),
        askS ? s : t,
        [[askS ? r + t : s - r, L(lang, 'Pakai Pythagoras: s² = r² + t².', 'Use Pythagoras: s² = r² + h².')], [askS ? s * s : t * t, L(lang, 'Itu kuadratnya. Ambil akarnya.', 'That is the square. Take the root.')]],
        [askS ? `s = √(${r}² + ${t}²) = √${s * s}` : `${L(lang, 't', 'h')} = √(${s}² − ${r}²) = √${t * t}`, `= ${askS ? s : t}`],
        { kind, r, o: askS ? t : s, askS },
      );
    }
    if (kind === 3) {
      const Vt = pick(rnd, [300, 450, 600, 900, 1200, 1500]);
      const toCone = rnd() < 0.6;
      return num(
        toCone
          ? L(lang, `Sebuah tabung dan kerucut memiliki alas dan tinggi sama. Volume tabung ${Vt} cm³. Volume kerucut … cm³`, `A cylinder and a cone have the same base and height. The cylinder's volume is ${Vt} cm³. What is the cone's volume, in cm³?`)
          : L(lang, `Sebuah tabung dan kerucut memiliki alas dan tinggi sama. Volume kerucut ${Vt / 3} cm³. Volume tabung … cm³`, `A cylinder and a cone have the same base and height. The cone's volume is ${Vt / 3} cm³. What is the cylinder's volume, in cm³?`),
        toCone ? Vt / 3 : Vt,
        [[toCone ? Vt * 3 : Vt / 9, L(lang, 'Volume kerucut sepertiga volume tabung, bukan tiga kali.', 'The cone is one third of the cylinder, not three times.')], [toCone ? Vt / 2 : (Vt / 3) * 2, L(lang, 'Perbandingannya 1 : 3.', 'The ratio is 1 : 3.')]],
        [L(lang, 'V kerucut = ⅓ × V tabung', 'Cone volume = ⅓ × cylinder volume'), toCone ? `⅓ × ${Vt} = ${Vt / 3}` : `3 × ${Vt / 3} = ${Vt}`],
        { kind, Vt, toCone },
      );
    }
    const seven = rnd() < 0.5;
    const r = seven ? 7 * ri(rnd, 1, 3) : pick(rnd, [3, 5, 6, 10]);
    const pi = PI(seven);
    const piT = seven ? '22/7' : M(lang, 3.14);
    if (kind === 0) {
      let t = ri(rnd, 3, 24);
      if (!seven && (r * r * t) % 3) t += 3 - ((r * r * t) % 3);
      const V = (pi * r * r * t) / 3;
      return num(
        L(lang, `Volume kerucut dengan jari-jari ${r} cm dan tinggi ${t} cm adalah … cm³ ${PIQ(lang, piT)}`, `What is the volume of a cone with radius ${r} cm and height ${t} cm, in cm³? ${PIQ(lang, piT)}`),
        V,
        [[pi * r * r * t, L(lang, 'Volume kerucut = ⅓πr²t. Jangan lupa ⅓.', 'Cone volume = ⅓πr²h. Remember the ⅓.')], [(pi * r * t) / 3, L(lang, 'r² artinya r × r.', 'r² means r × r.')]],
        [`⅓ × ${piT} × ${r}² × ${t}`, `= ${M(lang, V)}`],
        { kind, r, t, seven },
      );
    }
    const s = r + ri(rnd, 2, 10);
    return num(
      L(lang, `Luas selimut kerucut dengan jari-jari ${r} cm dan garis pelukis ${s} cm adalah … cm² ${PIQ(lang, piT)}`, `What is the curved surface area of a cone with radius ${r} cm and slant height ${s} cm, in cm²? ${PIQ(lang, piT)}`),
      pi * r * s,
      [[pi * r * r + pi * r * s, L(lang, 'Itu luas permukaan (dengan alas). Selimut saja = πrs.', 'That includes the base. The curved surface alone is πrs.')], [2 * pi * r * s, L(lang, 'Selimut kerucut = πrs, bukan 2πrs.', 'A cone’s curved surface is πrs, not 2πrs.')]],
      [L(lang, 'Selimut kerucut = π × r × s', 'Curved surface = π × r × s'), `${piT} × ${r} × ${s} = ${M(lang, pi * r * s)}`],
      { kind, r, s, seven },
    );
  },
  (m) => {
    if (m.kind === 1) return D(m.askS ? Math.hypot(m.r, m.o) : Math.sqrt(m.o ** 2 - m.r ** 2));
    if (m.kind === 3) return D(m.toCone ? m.Vt / 3 : m.Vt);
    const pi = m.seven ? 22 / 7 : 3.14;
    return D(m.kind === 0 ? (pi * m.r ** 2 * m.t) / 3 : pi * m.r * m.s);
  },
);

const sphere = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 3) {
      const k = pick(rnd, [2, 3, 4]);
      const vol = rnd() < 0.5;
      const T = [L(lang, `${vol ? k ** 3 : k * k} kali`, `${vol ? k ** 3 : k * k} times`), L(lang, `${k} kali`, `${k} times`), L(lang, `${vol ? k * k : k ** 3} kali`, `${vol ? k * k : k ** 3} times`), L(lang, `${2 * k} kali`, `${2 * k} times`)];
      return mc(
        L(lang, `Jika jari-jari bola dijadikan ${k} kali, ${vol ? 'volumenya' : 'luas permukaannya'} menjadi …`, `If a sphere's radius is multiplied by ${k}, its ${vol ? 'volume' : 'surface area'} becomes …`),
        T[0],
        [
          [T[1], L(lang, `${vol ? 'Volume memuat r³' : 'Luas memuat r²'}, jadi tidak cukup dikali ${k}.`, `${vol ? 'Volume contains r³' : 'Area contains r²'}, so it is not just × ${k}.`)],
          [T[2], vol ? L(lang, 'Itu perubahan luas (r²). Volume memuat r³.', 'That is how area changes (r²). Volume contains r³.') : L(lang, 'Itu perubahan volume (r³). Luas memuat r².', 'That is how volume changes (r³). Area contains r².')],
          [T[3], L(lang, 'Perubahan ukuran mengikuti pangkat r, bukan dikali 2.', 'The change follows the power of r, not doubling.')],
        ],
        [vol ? L(lang, `V = 4/3 πr³, jadi berubah ${k}³ = ${k ** 3} kali.`, `V = 4/3 πr³, so it changes by ${k}³ = ${k ** 3}.`) : L(lang, `L = 4πr², jadi berubah ${k}² = ${k * k} kali.`, `A = 4πr², so it changes by ${k}² = ${k * k}.`)],
        { kind, k, vol },
      );
    }
    const seven = rnd() < 0.45;
    const r = seven ? 7 * ri(rnd, 1, 3) : pick(rnd, [3, 5, 6, 9, 10, 12, 15]);
    const pi = PI(seven);
    const piT = seven ? '22/7' : M(lang, 3.14);
    if (kind === 0)
      return num(
        L(lang, `Luas permukaan bola dengan jari-jari ${r} cm adalah … cm² ${PIQ(lang, piT)}`, `What is the surface area of a sphere with radius ${r} cm, in cm²? ${PIQ(lang, piT)}`),
        4 * pi * r * r,
        [[pi * r * r, L(lang, 'Itu luas satu lingkaran. Luas bola = 4πr².', 'That is one circle. Sphere area = 4πr².')], [(4 / 3) * pi * r ** 3, L(lang, 'Itu volumenya.', 'That is the volume.')], [2 * pi * r * r, L(lang, 'Itu setengah bola tanpa alas.', 'That is a hemisphere without its base.')]],
        [L(lang, 'L = 4πr²', 'A = 4πr²'), `4 × ${piT} × ${r}² = ${M(lang, 4 * pi * r * r)}`],
        { kind, r, seven },
      );
    if (kind === 1) {
      const rr = seven ? 21 : pick(rnd, [3, 6, 9, 12, 15]);
      const V = (4 / 3) * pi * rr ** 3;
      return num(
        L(lang, `Volume bola dengan jari-jari ${rr} cm adalah … cm³ ${PIQ(lang, piT)}`, `What is the volume of a sphere with radius ${rr} cm, in cm³? ${PIQ(lang, piT)}`),
        V,
        [[4 * pi * rr * rr, L(lang, 'Itu luas permukaannya. Volume = 4/3 πr³.', 'That is the surface area. Volume = 4/3 πr³.')], [pi * rr ** 3, L(lang, 'Jangan lupa pengali 4/3.', 'Do not forget the factor 4/3.')]],
        [L(lang, 'V = 4/3 × π × r³', 'V = 4/3 × π × r³'), `4/3 × ${piT} × ${rr}³ = ${M(lang, V)}`],
        { kind, r: rr, seven },
      );
    }
    return num(
      L(lang, `Luas permukaan setengah bola padat (termasuk alas datarnya) dengan jari-jari ${r} cm adalah … cm² ${PIQ(lang, piT)}`, `What is the surface area of a solid hemisphere (including its flat base) with radius ${r} cm, in cm²? ${PIQ(lang, piT)}`),
      3 * pi * r * r,
      [[2 * pi * r * r, L(lang, 'Alas datarnya (lingkaran) belum ditambahkan.', 'The flat circular base is missing.')], [4 * pi * r * r, L(lang, 'Itu luas bola penuh.', 'That is a whole sphere.')]],
      [L(lang, `Lengkung = ½ × 4πr² = 2πr². Alas = πr². Total 3πr².`, 'Curved = ½ × 4πr² = 2πr². Base = πr². Total 3πr².'), `3 × ${piT} × ${r}² = ${M(lang, 3 * pi * r * r)}`],
      { kind, r, seven },
    );
  },
  (m, lang) => {
    if (m.kind === 3) return L(lang, `${m.vol ? m.k ** 3 : m.k ** 2} kali`, `${m.vol ? m.k ** 3 : m.k ** 2} times`);
    const pi = m.seven ? 22 / 7 : 3.14;
    if (m.kind === 0) return D(4 * pi * m.r ** 2);
    if (m.kind === 1) return D((4 / 3) * pi * m.r ** 3);
    return D(3 * pi * m.r ** 2);
  },
);

export const K9 = {
  'k9b1-1': [pkIntro],
  'k9b1-2': [factorQ],
  'k9b1-3': [discQ, formula],
  'k9b2-1': [qfVal, shapeQ],
  'k9b2-2': [vertex],
  'k9b3-1': [trans],
  'k9b3-2': [reflect],
  'k9b3-3': [rotate],
  'k9b3-4': [dilate],
  'k9b4-1': [congNum, congPool],
  'k9b4-2': [similar],
  'k9b4-3': [simApp],
  'k9b5-1': [circum],
  'k9b5-2': [circArea],
  'k9b5-3': [sector],
  'k9b6-1': [cylinder],
  'k9b6-2': [cone],
  'k9b6-3': [sphere],
};
