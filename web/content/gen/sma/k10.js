// Generator soal Kelas 10 SMA.
import { L, ri, pick, D, N, F, gcd, G, mi, M, Fr, sup, sub, lg, nz, sgn, shuf, P, WR, MC, NUM, OPT, poly, pc, xm, plus, pt, triple } from './common.js';

// ================= Bab 1: Eksponen dan Logaritma =================
const expEval = G(
  (rnd, lang) => {
    let a, b, x;
    do {
      a = pick(rnd, [1, 2, 3, 5]);
      b = ri(rnd, 2, 5);
      x = ri(rnd, 2, 4);
    } while (a * b ** x > 1000);
    const f = a === 1 ? `${b}${sup('x')}` : `${a} × ${b}${sup('x')}`;
    const y = a * b ** x;
    return NUM(
      L(lang, `Jika f(x) = ${f}, nilai f(${x}) adalah …`, `If f(x) = ${f}, the value of f(${x}) is …`),
      D(y),
      WR(D(y), [
        [a * b * x, L(lang, `${b}${sup(x)} bukan ${b} × ${x}. Pangkat berarti perkalian berulang.`, `${b}${sup(x)} is not ${b} × ${x}. A power means repeated multiplication.`)],
        [a > 1 ? (a * b) ** x : null, L(lang, `Pangkat hanya berlaku untuk ${b}, bukan untuk ${a} × ${b}.`, `The power applies only to ${b}, not to ${a} × ${b}.`)],
        [a * b ** (x - 1), L(lang, `Kalikan ${b} sebanyak ${x} kali, bukan ${x - 1} kali.`, `Multiply by ${b} exactly ${x} times, not ${x - 1}.`)],
      ]),
      [`${b}${sup(x)} = ${b ** x}`, a > 1 ? `f(${x}) = ${a} × ${b ** x} = ${y}` : `f(${x}) = ${y}`],
      { a, b, x },
    );
  },
  (m) => D(m.a * Math.pow(m.b, m.x)),
);

const expGrowth = G(
  (rnd, lang) => {
    if (rnd() < 0.5) {
      // peluruhan waktu paruh
      const n = ri(rnd, 2, 4);
      const T = pick(rnd, [2, 3, 5, 6, 8, 10]);
      const end = ri(rnd, 1, 6);
      const m0 = end * 2 ** n;
      const ans = m0 / 2 ** n;
      return NUM(
        L(lang, `Zat radioaktif ${m0} gram meluruh menjadi setengahnya setiap ${T} tahun. Sisa zat setelah ${n * T} tahun adalah … gram`, `A ${m0} gram radioactive sample halves every ${T} years. How many grams remain after ${n * T} years?`),
        D(ans),
        WR(D(ans), [
          [m0 / 2 / n, L(lang, 'Zatnya dibagi 2 berulang kali, bukan dibagi sekali lalu dibagi banyak periode.', 'The amount is halved repeatedly, not halved once and then split.')],
          [m0 - (m0 / 2) * n > 0 ? m0 - (m0 / 2) * n : null, L(lang, 'Setiap periode yang hilang setengah dari sisa, bukan setengah dari awal.', 'Each period removes half of what is left, not half of the start.')],
          [m0 / 2 ** (n - 1), L(lang, `Ada ${n} kali paruh, bukan ${n - 1}.`, `There are ${n} halvings, not ${n - 1}.`)],
        ]),
        [L(lang, `Banyak periode: ${n * T} ÷ ${T} = ${n}.`, `Number of periods: ${n * T} ÷ ${T} = ${n}.`), `${m0} × (½)${sup(n)} = ${m0} ÷ ${2 ** n} = ${ans}`],
        { kind: 'decay', m0, T, t: n * T },
      );
    }
    const r = pick(rnd, [5, 10, 20]);
    const n = r === 5 ? 2 : ri(rnd, 2, 3);
    const P0 = pick(rnd, [1000000, 2000000, 4000000]);
    const ans = Math.round(P0 * (1 + r / 100) ** n);
    const simple = P0 * (1 + (r * n) / 100);
    return NUM(
      L(lang, `Tabungan Rp${P0.toLocaleString('id-ID')} mendapat bunga majemuk ${r}% per tahun. Setelah ${n} tahun, tabungan menjadi Rp …`, `Savings of Rp${P0.toLocaleString('en-US')} earn ${r}% compound interest per year. After ${n} years the savings are Rp …`),
      D(ans),
      WR(D(ans), [
        [simple, L(lang, 'Itu bunga tunggal. Pada bunga majemuk, bunga ikut berbunga, jadi dikali berulang.', 'That is simple interest. With compound interest the interest also earns interest, so multiply repeatedly.')],
        [Math.round(P0 * (1 + r / 100)), L(lang, `Itu baru 1 tahun. Kalikan ${n} kali.`, `That is only 1 year. Multiply ${n} times.`)],
      ]),
      [L(lang, `Setiap tahun dikali (1 + ${r}%) = ${N(lang, 1 + r / 100)}.`, `Each year multiply by (1 + ${r}%) = ${N(lang, 1 + r / 100)}.`), `${P0} × ${N(lang, 1 + r / 100)}${sup(n)} = ${ans}`],
      { kind: 'int', P0, r, n },
    );
  },
  (m) => (m.kind === 'decay' ? D(m.m0 * Math.pow(0.5, m.t / m.T)) : D(Math.round(m.P0 * Math.pow(1 + m.r / 100, m.n)))),
);

const BASES = [
  ['2', 2],
  ['3', 3],
  ['5', 5],
  ['(½)', 0.5],
  ['(⅓)', 1 / 3],
  ['(¼)', 0.25],
  ['(1,5)', 1.5],
  ['(0,9)', 0.9],
  ['(0,8)', 0.8],
  ['(1,1)', 1.1],
];
const expKind = G(
  (rnd, lang) => {
    const growth = rnd() < 0.5;
    const ups = shuf(rnd, BASES.filter((b) => b[1] > 1));
    const downs = shuf(rnd, BASES.filter((b) => b[1] < 1));
    const coef = () => pick(rnd, [2, 3, 5, 8, 10, 100]);
    const show = (b) => `y = ${coef()} × ${lang === 'en' ? b[0].replace(',', '.') : b[0]}${sup('x')}`;
    const ok = growth ? ups[0] : downs[0];
    const bad = growth ? downs.slice(0, 3) : ups.slice(0, 3);
    const okT = show(ok);
    return {
      q: growth ? L(lang, 'Manakah fungsi yang menggambarkan pertumbuhan?', 'Which function describes growth?') : L(lang, 'Manakah fungsi yang menggambarkan peluruhan?', 'Which function describes decay?'),
      options: MC(
        okT,
        bad.map((b) => [show(b), growth ? L(lang, 'Basisnya kurang dari 1, jadi nilainya makin kecil (peluruhan).', 'Its base is less than 1, so it shrinks (decay).') : L(lang, 'Basisnya lebih dari 1, jadi nilainya makin besar (pertumbuhan).', 'Its base is more than 1, so it grows.')]),
      ),
      steps: [L(lang, 'Lihat basis pangkatnya: lebih dari 1 berarti tumbuh, antara 0 dan 1 berarti meluruh.', 'Look at the base: above 1 means growth, between 0 and 1 means decay.'), L(lang, `Jawabannya ${okT}.`, `The answer is ${okT}.`)],
      meta: { okT },
    };
  },
  (m) => m.okT,
);

// Nilai b^k sebagai teks: 125, 1, 1/9
const powText = (b, k) => (k >= 0 ? String(b ** k) : `1/${b ** -k}`);

const expEq = G(
  (rnd, lang) => {
    let b, x, p, q, k;
    do {
      b = pick(rnd, [2, 3, 5, 7]);
      x = ri(rnd, -3, 4);
      p = pick(rnd, [1, 1, 2, 3]);
      q = ri(rnd, -4, 4);
      k = p * x + q;
    } while (b ** Math.abs(k) > 729 || (p === 1 && q === 0 && rnd() < 0.5));
    const ex = p === 1 ? (q === 0 ? 'x' : `x${q > 0 ? '+' : '−'}${Math.abs(q)}`) : q === 0 ? `${p}x` : `${p}x${q > 0 ? '+' : '−'}${Math.abs(q)}`;
    const rhs = powText(b, k);
    return NUM(
      L(lang, `Nilai x yang memenuhi ${b}${sup(ex)} = ${rhs} adalah …`, `The value of x that satisfies ${b}${sup(ex)} = ${rhs} is …`),
      D(x),
      WR(D(x), [
        [q !== 0 ? (k + q) / p : null, L(lang, `Saat memindahkan ${mi(q)}, tandanya harus berubah.`, `When moving ${mi(q)} across, its sign must change.`)],
        [p > 1 ? k - q : null, L(lang, `Jangan lupa membagi dengan ${p}.`, `Remember to divide by ${p}.`)],
        [k !== x ? k : null, L(lang, `${k} adalah pangkat ruas kanan. Setarakan dengan ${ex}, lalu selesaikan x.`, `${k} is the exponent on the right. Set it equal to ${ex} and solve for x.`)],
        [k < 0 ? -x : null, L(lang, `${rhs} adalah ${b} pangkat negatif.`, `${rhs} is ${b} to a negative power.`)],
      ]),
      [L(lang, `Tulis ruas kanan sebagai pangkat ${b}: ${rhs} = ${b}${sup(k)}.`, `Write the right side as a power of ${b}: ${rhs} = ${b}${sup(k)}.`), `${ex} = ${mi(k)}`, `x = ${mi(x)}`],
      { b, p, q, rhs: k },
    );
  },
  (m) => D((m.rhs - m.q) / m.p),
);

const expEqBase = G(
  (rnd, lang) => {
    const c = pick(rnd, [2, 3]);
    let mm, n;
    do {
      mm = ri(rnd, 2, c === 2 ? 5 : 3);
      n = ri(rnd, 1, c === 2 ? 6 : 5);
    } while (n === mm || n % mm === 0);
    const left = c ** mm;
    const right = c ** n;
    const ans = F(n, mm);
    return NUM(
      L(lang, `Nilai x yang memenuhi ${left}${sup('x')} = ${right} adalah … (boleh ditulis sebagai pecahan)`, `The value of x that satisfies ${left}${sup('x')} = ${right} is … (a fraction is fine)`),
      ans,
      WR(ans, [
        [F(mm, n), L(lang, 'Pecahannya terbalik. Setarakan pangkatnya: pangkat kiri × x = pangkat kanan.', 'The fraction is upside down. Match the exponents: left exponent × x = right exponent.')],
        [n - mm, L(lang, 'Pangkatnya dibagi, bukan dikurangi.', 'Divide the exponents, do not subtract them.')],
        [right / left !== Math.round(right / left) ? null : right / left, L(lang, 'Bilangannya tidak bisa langsung dibagi. Ubah ke basis yang sama dulu.', 'You cannot just divide the numbers. Rewrite with a common base first.')],
      ]),
      [`${left} = ${c}${sup(mm)}, ${right} = ${c}${sup(n)}`, `${c}${sup(mm + 'x')} = ${c}${sup(n)} → ${mm}x = ${n}`, `x = ${n}/${mm}${gcd(n, mm) > 1 ? ` = ${ans}` : ''}`],
      { c, m: mm, n },
    );
  },
  (m) => F(m.n, m.m),
);

const logBasic = G(
  (rnd, lang) => {
    const b = pick(rnd, [2, 3, 5, 10, 2, 3]);
    let k;
    do k = ri(rnd, -3, 5);
    while (k === 0 || b ** Math.abs(k) > 10000 || (k > 0 && b ** k < 4));
    const arg = k > 0 ? (b === 10 ? (10 ** k).toLocaleString(lang === 'en' ? 'en-US' : 'id-ID') : String(b ** k)) : `1/${b ** -k}`;
    return NUM(
      L(lang, `Nilai ${lg(b, arg)} adalah …`, `The value of ${lg(b, arg)} is …`),
      D(k),
      WR(D(k), [
        [-k, k < 0 ? L(lang, `${arg} adalah kebalikan dari ${b ** -k}, jadi pangkatnya negatif.`, `${arg} is the reciprocal of ${b ** -k}, so the power is negative.`) : L(lang, 'Tandanya terbalik.', 'The sign is flipped.')],
        [k > 0 ? b ** k / b : null, L(lang, `Logaritma menanyakan pangkat, bukan hasil bagi ${b ** k} ÷ ${b}.`, `A logarithm asks for the power, not ${b ** k} ÷ ${b}.`)],
        [k + 1, L(lang, `Cek: ${b}${sup(k + 1)} bukan ${arg}.`, `Check: ${b}${sup(k + 1)} is not ${arg}.`)],
      ]),
      [L(lang, `${b} dipangkatkan berapa agar menjadi ${arg}?`, `${b} to what power gives ${arg}?`), `${b}${sup(k)} = ${arg}`, `${lg(b, arg)} = ${mi(k)}`],
      { b, k },
    );
  },
  (m) => D(Math.round(Math.log(m.k > 0 ? Math.pow(m.b, m.k) : 1 / Math.pow(m.b, -m.k)) / Math.log(m.b))),
);

const logFrac = G(
  (rnd, lang) => {
    const c = pick(rnd, [2, 3]);
    let a, n;
    do {
      a = ri(rnd, 2, c === 2 ? 5 : 3);
      n = ri(rnd, 1, c === 2 ? 5 : 4);
    } while (n % a === 0);
    const base = c ** a;
    const arg = c ** n;
    const ans = F(n, a);
    return NUM(
      L(lang, `Nilai ${lg(base, arg)} adalah … (boleh ditulis sebagai pecahan)`, `The value of ${lg(base, arg)} is … (a fraction is fine)`),
      ans,
      WR(ans, [
        [F(a, n), L(lang, 'Pecahannya terbalik. Pangkat basis jadi penyebut.', 'The fraction is upside down. The power of the base goes in the denominator.')],
        [n, L(lang, `Itu ${lg(c, arg)}. Basisnya ${base}, bukan ${c}.`, `That is ${lg(c, arg)}. The base is ${base}, not ${c}.`)],
      ]),
      [`${base} = ${c}${sup(a)}, ${arg} = ${c}${sup(n)}`, L(lang, `Cari x: (${c}${sup(a)})${sup('x')} = ${c}${sup(n)} → ${a}x = ${n}`, `Find x: (${c}${sup(a)})${sup('x')} = ${c}${sup(n)} → ${a}x = ${n}`), `x = ${ans}`],
      { base, arg },
    );
  },
  (m) => {
    // cari pecahan p/q dengan base^(p/q) = arg
    for (let q = 1; q <= 12; q++) for (let p = 1; p <= 40; p++) if (Math.abs(Math.pow(m.base, p / q) - m.arg) < 1e-6) return F(p, q);
  },
);

const logForm = G(
  (rnd, lang) => {
    let a, k;
    do {
      a = ri(rnd, 2, 7);
      k = ri(rnd, 2, 5);
    } while (a ** k > 1000 || a === k);
    const n = a ** k;
    const okT = `${lg(a, n)} = ${k}`;
    return OPT(
      L(lang, `Bentuk logaritma dari ${a}${sup(k)} = ${n} adalah …`, `The logarithm form of ${a}${sup(k)} = ${n} is …`),
      okT,
      [
        [`${lg(k, n)} = ${a}`, L(lang, 'Basis dan pangkatnya tertukar. Basis pangkat menjadi basis logaritma.', 'The base and the power are swapped. The base of the power becomes the base of the log.')],
        [`${lg(a, k)} = ${n}`, L(lang, 'Hasil logaritma adalah pangkatnya, bukan hasil pangkat.', 'The result of a logarithm is the power, not the value.')],
        [`${lg(n, a)} = ${k}`, L(lang, `Basis logaritmanya ${a}, bukan ${n}.`, `The log base is ${a}, not ${n}.`)],
      ],
      [L(lang, 'aᵏ = n ditulis ᵃlog n = k.', 'aᵏ = n is written ᵃlog n = k.'), okT],
      { a, k },
    );
  },
  (m) => `${lg(m.a, Math.pow(m.a, m.k))} = ${m.k}`,
);

const logRules = G(
  (rnd, lang) => {
    const b = pick(rnd, [2, 3, 5, 10]);
    const kind = pick(rnd, ['sum', 'diff', 'pow']);
    if (kind === 'pow') {
      const m = ri(rnd, 2, b === 10 ? 3 : 3);
      const n = ri(rnd, 2, 5);
      const base = b ** m;
      const ans = m * n;
      return NUM(
        L(lang, `Nilai ${lg(b, `${base}${sup(n)}`)} adalah …`, `The value of ${lg(b, `${base}${sup(n)}`)} is …`),
        D(ans),
        WR(D(ans), [
          [m + n, L(lang, 'Pangkat di dalam logaritma dikalikan, bukan dijumlah.', 'A power inside a log is multiplied, not added.')],
          [n, L(lang, `${lg(b, base)} = ${m}, bukan 1.`, `${lg(b, base)} = ${m}, not 1.`)],
          [m ** n, L(lang, `Sifatnya: ${lg(b, `aⁿ`)} = n × ${lg(b, 'a')}. Hasilnya n kali, bukan dipangkatkan.`, `The rule: ${lg(b, `aⁿ`)} = n × ${lg(b, 'a')}. Multiply by n, do not raise to a power.`)],
        ]),
        [`${lg(b, `${base}${sup(n)}`)} = ${n} × ${lg(b, base)}`, `= ${n} × ${m} = ${ans}`],
        { kind, b, base, n },
      );
    }
    const k = ri(rnd, 2, b === 10 ? 3 : b === 5 ? 3 : 4);
    const T = b ** k;
    let x, y;
    let z = 1;
    if (kind === 'sum' && b === 10) {
      y = pick(rnd, k === 2 ? [2, 4, 5, 20, 25] : [2, 4, 5, 8, 20, 25, 40, 50]);
      x = T / y;
    } else if (kind === 'sum') {
      z = pick(rnd, [3, 5, 6, 7].filter((d) => d % b !== 0));
      const i = ri(rnd, 1, k - 1);
      x = z * b ** i;
      y = b ** (k - i);
    } else {
      y = pick(rnd, [2, 3, 4, 5, 6, 7].filter((d) => d % b !== 0));
      x = T * y;
    }
    const op = kind === 'sum' ? '+' : '−';
    const ex = `${lg(b, x)} ${op} ${lg(b, y)}${z > 1 ? ` − ${lg(b, z)}` : ''}`;
    return NUM(
      L(lang, `Nilai ${ex} adalah …`, `The value of ${ex} is …`),
      D(k),
      WR(D(k), [
        [T, L(lang, `${T} adalah hasil ${kind === 'sum' ? 'kali' : 'bagi'}nya. Masih harus dicari ${lg(b, T)}.`, `${T} is the ${kind === 'sum' ? 'product' : 'quotient'}. You still need ${lg(b, T)}.`)],
        [kind === 'sum' ? null : Number.isInteger(Math.log(x - y) / Math.log(b)) ? Math.log(x - y) / Math.log(b) : null, L(lang, 'Selisih logaritma menjadi pembagian, bukan pengurangan bilangannya.', 'A difference of logs becomes division, not subtraction.')],
        [k + 1, L(lang, `Cek: ${b}${sup(k + 1)} bukan ${T}.`, `Check: ${b}${sup(k + 1)} is not ${T}.`)],
      ]),
      [kind === 'sum' ? `${ex} = ${lg(b, z > 1 ? `(${x} × ${y} ÷ ${z})` : `(${x} × ${y})`)} = ${lg(b, T)}` : `${lg(b, x)} − ${lg(b, y)} = ${lg(b, `(${x} ÷ ${y})`)} = ${lg(b, T)}`, `${b}${sup(k)} = ${T}, ${L(lang, 'jadi hasilnya', 'so the answer is')} ${k}`],
      { kind, b, x, y, z },
    );
  },
  (m) => {
    if (m.kind === 'pow') return D(Math.round((m.n * Math.log(m.base)) / Math.log(m.b)));
    const v = m.kind === 'sum' ? (m.x * m.y) / m.z : m.x / m.y;
    return D(Math.round(Math.log(v) / Math.log(m.b)));
  },
);

const logApprox = G(
  (rnd, lang) => {
    let a, b, c, n;
    do {
      a = ri(rnd, 0, 3);
      b = ri(rnd, 0, 2);
      c = ri(rnd, -1, 1);
      n = 2 ** a * 3 ** b * 10 ** c;
    } while (a + b < 2 || n < 1 || n > 1000 || (a === 0 && b === 0));
    const v = a * 0.301 + b * 0.477 + c;
    const nT = M(lang, n);
    return NUM(
      L(lang, `Jika log 2 ≈ 0,301 dan log 3 ≈ 0,477, maka log ${nT} ≈ …`, `If log 2 ≈ 0.301 and log 3 ≈ 0.477, then log ${nT} ≈ …`),
      D(v),
      WR(D(v), [
        [a && b && c === 0 ? 0.301 ** a * 0.477 ** b : null, L(lang, 'Logaritma dari hasil kali adalah jumlah logaritma, bukan hasil kali logaritma.', 'The log of a product is the sum of the logs, not their product.')],
        [c !== 0 ? v - c : null, L(lang, `Jangan lupa log 10 = 1${c < 0 ? ' (di sini dikurangi karena dibagi 10)' : ''}.`, `Remember log 10 = 1${c < 0 ? ' (subtracted here because we divide by 10)' : ''}.`)],
        [(a > 1 || b > 1) ? (a ? 0.301 : 0) + (b ? 0.477 : 0) + c : null, L(lang, 'Faktor yang berulang harus dihitung sebanyak pangkatnya.', 'A repeated factor must be counted as many times as it appears.')],
      ]),
      [`${nT} = ${[a ? `2${a > 1 ? sup(a) : ''}` : '', b ? `3${b > 1 ? sup(b) : ''}` : ''].filter(Boolean).join(' × ')}${c > 0 ? ' × 10' : c < 0 ? ' ÷ 10' : ''}`, `log ${nT} ≈ ${[a ? `${a > 1 ? a + ' × ' : ''}${M(lang, 0.301)}` : '', b ? `${b > 1 ? b + ' × ' : ''}${M(lang, 0.477)}` : ''].filter(Boolean).join(' + ')}${c > 0 ? ' + 1' : c < 0 ? ' − 1' : ''} = ${M(lang, v)}`],
      { n },
    );
  },
  (m) => {
    let n = m.n;
    let e10 = 0;
    while (n >= 10 && n % 10 === 0) (n /= 10), e10++;
    while (Math.abs(n - Math.round(n)) > 1e-9) (n *= 10), e10--;
    n = Math.round(n);
    let e2 = 0;
    let e3 = 0;
    while (n % 2 === 0) (n /= 2), e2++;
    while (n % 3 === 0) (n /= 3), e3++;
    while (n % 5 === 0) (n /= 5), e10++, (e2 -= 1);
    return D(e2 * 0.301 + e3 * 0.477 + e10);
  },
);

// ================= Bab 2: Barisan dan Deret =================
const seqText = (a, b, k = 4, lang = 'id') => Array.from({ length: k }, (_, i) => M(lang, a + i * b)).join(', ') + ', …';

const arithTerm = G(
  (rnd, lang) => {
    const a = ri(rnd, -10, 25);
    const b = nz(rnd, -9, 9);
    const n = ri(rnd, 8, 30);
    const story = rnd() < 0.3 && b > 0 && a > 0;
    const u = a + (n - 1) * b;
    if (story) {
      const a0 = ri(rnd, 3, 10) * 10000;
      const d0 = ri(rnd, 1, 5) * 5000;
      const nn = ri(rnd, 6, 12);
      const v = a0 + (nn - 1) * d0;
      return NUM(
        L(lang, `Uang saku bulan pertama Rp${a0.toLocaleString('id-ID')} dan naik Rp${d0.toLocaleString('id-ID')} setiap bulan. Uang saku bulan ke-${nn} adalah Rp …`, `Pocket money is Rp${a0.toLocaleString('en-US')} in the first month and rises by Rp${d0.toLocaleString('en-US')} every month. In month ${nn} it is Rp …`),
        D(v),
        WR(D(v), [
          [a0 + nn * d0, L(lang, `Bulan pertama belum naik. Kenaikannya baru ${nn - 1} kali.`, `There is no rise in the first month, so only ${nn - 1} rises.`)],
          [nn * d0, L(lang, 'Jangan lupa uang saku awal.', 'Do not forget the starting amount.')],
        ]),
        [`U${sub(nn)} = a + (n − 1)b`, `= ${a0} + ${nn - 1} × ${d0} = ${v}`],
        { a: a0, b: d0, n: nn },
      );
    }
    return NUM(
      L(lang, `Suku ke-${n} dari barisan ${seqText(a, b, 4, lang)} adalah …`, `Term ${n} of the sequence ${seqText(a, b, 4, lang)} is …`),
      D(u),
      WR(D(u), [
        [a + n * b, L(lang, `Dari suku pertama ke suku ke-${n} ada ${n - 1} langkah, bukan ${n}.`, `From term 1 to term ${n} there are ${n - 1} steps, not ${n}.`)],
        [n * b, L(lang, 'Jangan lupa suku pertama a.', 'Do not forget the first term a.')],
        [a - (n - 1) * b, L(lang, `Bedanya ${mi(b)}. Perhatikan tandanya.`, `The difference is ${mi(b)}. Watch the sign.`)],
      ]),
      [L(lang, `a = ${mi(a)}, b = ${mi(b)}`, `a = ${mi(a)}, d = ${mi(b)}`), `U${sub(n)} = ${mi(a)} + (${n} − 1) × ${b < 0 ? `(${mi(b)})` : b} = ${mi(u)}`],
      { a, b, n },
    );
  },
  (m) => D(m.a + (m.n - 1) * m.b),
);

const arithWhich = G(
  (rnd, lang) => {
    const a = ri(rnd, 1, 15);
    const b = ri(rnd, 2, 7);
    const n = ri(rnd, 10, 40);
    const v = a + (n - 1) * b;
    return NUM(
      L(lang, `Pada barisan ${seqText(a, b, 4, lang)}, bilangan ${v} adalah suku ke- …`, `In the sequence ${seqText(a, b, 4, lang)}, the number ${v} is term number …`),
      D(n),
      WR(D(n), [
        [n - 1, L(lang, `(${v} − ${a}) ÷ ${b} = ${n - 1} adalah banyak langkah. Suku ke-nya ditambah 1.`, `(${v} − ${a}) ÷ ${b} = ${n - 1} is the number of steps. Add 1 for the term number.`)],
        [Number.isInteger(v / b) ? v / b : null, L(lang, `Kurangi dulu dengan suku pertama ${a}.`, `Subtract the first term ${a} first.`)],
      ]),
      [`${a} + (n − 1) × ${b} = ${v}`, `n − 1 = (${v} − ${a}) ÷ ${b} = ${n - 1}`, `n = ${n}`],
      { a, b, v },
    );
  },
  (m) => D((m.v - m.a) / m.b + 1),
);

const arithTwo = G(
  (rnd, lang) => {
    const a = ri(rnd, -5, 15);
    const b = nz(rnd, -6, 6);
    const p = ri(rnd, 2, 5);
    const q = p + ri(rnd, 2, 5);
    const r = q + ri(rnd, 1, 6);
    const U = (k) => a + (k - 1) * b;
    return NUM(
      L(lang, `Suatu barisan aritmetika memiliki U${sub(p)} = ${mi(U(p))} dan U${sub(q)} = ${mi(U(q))}. Nilai U${sub(r)} adalah …`, `An arithmetic sequence has U${sub(p)} = ${mi(U(p))} and U${sub(q)} = ${mi(U(q))}. Find U${sub(r)}.`),
      D(U(r)),
      WR(D(U(r)), [
        [U(q) + (r - q) * (U(q) - U(p)), L(lang, `Selisih ${mi(U(q) - U(p))} itu untuk ${q - p} langkah. Bedanya ${mi(U(q) - U(p))} ÷ ${q - p}.`, `The gap ${mi(U(q) - U(p))} covers ${q - p} steps. The difference is ${mi(U(q) - U(p))} ÷ ${q - p}.`)],
        [U(r) - b, L(lang, `Dari U${sub(q)} ke U${sub(r)} ada ${r - q} langkah.`, `From U${sub(q)} to U${sub(r)} there are ${r - q} steps.`)],
        [a + r * b, L(lang, 'Rumusnya a + (n − 1)b.', 'The formula is a + (n − 1)d.')],
      ]),
      [L(lang, `Beda: (${mi(U(q))} − ${U(p) < 0 ? `(${mi(U(p))})` : U(p)}) ÷ (${q} − ${p}) = ${mi(b)}`, `Difference: (${mi(U(q))} − ${U(p) < 0 ? `(${mi(U(p))})` : U(p)}) ÷ (${q} − ${p}) = ${mi(b)}`), `U${sub(r)} = U${sub(q)} + ${r - q} × ${b < 0 ? `(${mi(b)})` : b} = ${mi(U(r))}`],
      { p, q, r, up: U(p), uq: U(q) },
    );
  },
  (m) => {
    const b = (m.uq - m.up) / (m.q - m.p);
    return D(m.up + (m.r - m.p) * b);
  },
);

const arithSum = G(
  (rnd, lang) => {
    const story = rnd() < 0.35;
    const a = story ? ri(rnd, 10, 30) : ri(rnd, -5, 12);
    const b = story ? ri(rnd, 1, 4) : nz(rnd, -4, 6);
    const n = story ? ri(rnd, 8, 20) : ri(rnd, 8, 25);
    const S = (n * (2 * a + (n - 1) * b)) / 2;
    const un = a + (n - 1) * b;
    const q = story
      ? L(lang, `Sebuah gedung punya ${n} baris kursi. Baris pertama ${a} kursi, dan setiap baris berikutnya bertambah ${b} kursi. Banyak kursi seluruhnya adalah …`, `A hall has ${n} rows of seats. The first row has ${a} seats and each next row has ${b} more. How many seats are there in total?`)
      : L(lang, `Jumlah ${n} suku pertama deret ${seqText(a, b, 3, lang).replace(/, /g, ' + ').replace(' + …', ' + …')} adalah …`, `The sum of the first ${n} terms of ${seqText(a, b, 3, lang).replace(/, /g, ' + ')} is …`);
    return NUM(
      q,
      D(S),
      WR(D(S), [
        [un, L(lang, `${mi(un)} adalah suku ke-${n}, bukan jumlahnya.`, `${mi(un)} is term ${n}, not the sum.`)],
        [n * (a + un), L(lang, 'Jangan lupa dibagi 2.', 'Remember to divide by 2.')],
        [(n * (2 * a + n * b)) / 2, L(lang, 'Suku ke-n adalah a + (n − 1)b, bukan a + nb.', 'Term n is a + (n − 1)d, not a + nd.')],
      ]),
      [`U${sub(n)} = ${mi(a)} + ${n - 1} × ${b < 0 ? `(${mi(b)})` : b} = ${mi(un)}`, `S${sub(n)} = ${n}/2 × (${mi(a)} + ${un < 0 ? `(${mi(un)})` : un}) = ${mi(S)}`],
      { a, b, n },
    );
  },
  (m) => {
    let s = 0;
    for (let i = 0; i < m.n; i++) s += m.a + i * m.b;
    return D(s);
  },
);

const arithSn = G(
  (rnd, lang) => {
    const p = nz(rnd, -3, 4);
    const q = ri(rnd, -6, 6);
    const k = ri(rnd, 3, 10);
    const S = (n) => p * n * n + q * n;
    const u = S(k) - S(k - 1);
    return NUM(
      L(lang, `Jumlah n suku pertama suatu deret adalah S${sub('n')} = ${poly([[p, 2], [q, 1]], 'n')}. Suku ke-${k} deret itu adalah …`, `The sum of the first n terms of a series is S${sub('n')} = ${poly([[p, 2], [q, 1]], 'n')}. Find term ${k}.`),
      D(u),
      WR(D(u), [
        [S(k), L(lang, `S${sub(k)} adalah jumlah ${k} suku. Suku ke-${k} = S${sub(k)} − S${sub(k - 1)}.`, `S${sub(k)} is the sum of ${k} terms. Term ${k} = S${sub(k)} − S${sub(k - 1)}.`)],
        [S(k) - S(k - 2), L(lang, `Kurangi dengan S${sub(k - 1)}, bukan S${sub(k - 2)}.`, `Subtract S${sub(k - 1)}, not S${sub(k - 2)}.`)],
      ]),
      [`S${sub(k)} = ${mi(S(k))}, S${sub(k - 1)} = ${mi(S(k - 1))}`, `U${sub(k)} = S${sub(k)} − S${sub(k - 1)} = ${mi(u)}`],
      { p, q, k },
    );
  },
  (m) => D(m.p * (2 * m.k - 1) + m.q),
);

const geoTerm = G(
  (rnd, lang) => {
    const r = pick(rnd, [2, 3, -2, 2, 3]);
    const a = ri(rnd, 1, 6) * (rnd() < 0.2 ? -1 : 1);
    let n;
    do n = ri(rnd, 5, 9);
    while (Math.abs(a * r ** (n - 1)) > 20000);
    const u = a * r ** (n - 1);
    return NUM(
      L(lang, `Suku ke-${n} dari barisan ${[a, a * r, a * r * r].map((x) => M(lang, x)).join(', ')}, … adalah …`, `Term ${n} of the sequence ${[a, a * r, a * r * r].map((x) => M(lang, x)).join(', ')}, … is …`),
      D(u),
      WR(D(u), [
        [a * r ** n, L(lang, `Pangkat rasionya n − 1 = ${n - 1}, bukan ${n}.`, `The power of the ratio is n − 1 = ${n - 1}, not ${n}.`)],
        [a + (n - 1) * r, L(lang, 'Ini barisan geometri: dikali rasio, bukan ditambah.', 'This is a geometric sequence: multiply by the ratio, do not add.')],
        [r < 0 ? -u : null, L(lang, 'Rasionya negatif. Perhatikan tanda pangkatnya.', 'The ratio is negative. Watch the sign of the power.')],
      ]),
      [`a = ${mi(a)}, r = ${mi(r)}`, `U${sub(n)} = ${mi(a)} × ${r < 0 ? `(${mi(r)})` : r}${sup(n - 1)} = ${mi(u)}`],
      { a, r, n },
    );
  },
  (m) => {
    let u = m.a;
    for (let i = 1; i < m.n; i++) u *= m.r;
    return D(u);
  },
);

const geoSum = G(
  (rnd, lang) => {
    const r = pick(rnd, [2, 3]);
    const a = ri(rnd, 1, 5);
    const n = r === 2 ? ri(rnd, 5, 9) : ri(rnd, 4, 6);
    const S = (a * (r ** n - 1)) / (r - 1);
    return NUM(
      L(lang, `Jumlah ${n} suku pertama deret ${a} + ${a * r} + ${a * r * r} + … adalah …`, `The sum of the first ${n} terms of ${a} + ${a * r} + ${a * r * r} + … is …`),
      D(S),
      WR(D(S), [
        [a * r ** (n - 1), L(lang, `Itu suku ke-${n}. Yang ditanya jumlahnya.`, `That is term ${n}. The question asks for the sum.`)],
        [(a * (r ** (n - 1) - 1)) / (r - 1), L(lang, `Pangkatnya n = ${n}.`, `The power is n = ${n}.`)],
        [a * (r ** n - 1), L(lang, `Jangan lupa dibagi (r − 1) = ${r - 1}.`, `Remember to divide by (r − 1) = ${r - 1}.`)],
      ]),
      [`S${sub(n)} = a(r${sup('n')} − 1)/(r − 1)`, `= ${a}(${r}${sup(n)} − 1)/${r - 1} = ${a} × ${r ** n - 1}/${r - 1} = ${S}`],
      { a, r, n },
    );
  },
  (m) => {
    let s = 0;
    for (let i = 0; i < m.n; i++) s += m.a * Math.pow(m.r, i);
    return D(s);
  },
);

const geoTwo = G(
  (rnd, lang) => {
    const r = pick(rnd, [2, 3, -2]);
    const a = ri(rnd, 1, 4);
    const p = ri(rnd, 1, 3);
    const q = p + 3;
    let s;
    do s = q + ri(rnd, 1, 3);
    while (Math.abs(a * r ** (s - 1)) > 5000);
    const U = (k) => a * r ** (k - 1);
    return NUM(
      L(lang, `Suatu barisan geometri memiliki U${sub(p)} = ${mi(U(p))} dan U${sub(q)} = ${mi(U(q))}. Nilai U${sub(s)} adalah …`, `A geometric sequence has U${sub(p)} = ${mi(U(p))} and U${sub(q)} = ${mi(U(q))}. Find U${sub(s)}.`),
      D(U(s)),
      WR(D(U(s)), [
        [U(q) * (U(q) / U(p)) ** (s - q), L(lang, `${mi(U(q) / U(p))} adalah r${sup(q - p)}, bukan r.`, `${mi(U(q) / U(p))} is r${sup(q - p)}, not r.`)],
        [U(q) + (s - q) * ((U(q) - U(p)) / (q - p)), L(lang, 'Barisan geometri dikali rasio, bukan ditambah beda.', 'A geometric sequence multiplies by a ratio; it does not add a difference.')],
      ]),
      [`r${sup(q - p)} = ${mi(U(q))} ÷ ${mi(U(p))} = ${mi(U(q) / U(p))} → r = ${mi(r)}`, `U${sub(s)} = U${sub(q)} × r${sup(s - q)} = ${mi(U(s))}`],
      { p, q, s, up: U(p), uq: U(q) },
    );
  },
  (m) => {
    const r = Math.round(Math.cbrt(m.uq / m.up));
    return D(m.uq * Math.pow(r, m.s - m.q));
  }
);

// r = p/q; suku-suku dibuat bulat
const RATIOS = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [3, 4],
  [-1, 2],
  [-1, 3],
  [-2, 3],
];
const geoInf = G(
  (rnd, lang) => {
    const [p, q] = pick(rnd, RATIOS);
    const a = q * q * ri(rnd, 1, q === 4 ? 2 : 3);
    const terms = [a, (a * p) / q, (a * p * p) / (q * q)];
    const ans = F(a * q, q - p);
    const txt = terms.map((t, i) => (i === 0 ? M(lang, t) : t < 0 ? `− ${M(lang, -t)}` : `+ ${M(lang, t)}`)).join(' ');
    return NUM(
      L(lang, `Jumlah tak hingga deret ${txt} + … adalah … (boleh pecahan atau desimal)`, `The sum to infinity of ${txt} + … is … (fraction or decimal)`),
      ans,
      WR(ans, [
        [F(a * q, q + p), L(lang, 'Rumusnya a ÷ (1 − r). Perhatikan tanda r.', 'The formula is a ÷ (1 − r). Watch the sign of r.')],
        [F(a * (q - p), q), L(lang, 'Suku pertama dibagi (1 − r), bukan dikali.', 'Divide the first term by (1 − r), do not multiply.')],
        [F(a * q, p), L(lang, 'Pembaginya 1 − r, bukan r.', 'The divisor is 1 − r, not r.')],
      ]),
      [`a = ${M(lang, a)}, r = ${Fr(p, q)}`, `S∞ = ${M(lang, a)} ÷ (1 − ${p < 0 ? `(${Fr(p, q)})` : Fr(p, q)}) = ${M(lang, a)} ÷ ${Fr(q - p, q)} = ${mi(ans)}`],
      { a, b: terms[1] },
    );
  },
  (m) => {
    const r = m.b / m.a;
    const v = m.a / (1 - r);
    for (let d = 1; d <= 12; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-9) return F(Math.round(v * d), d);
  },
);

const geoInfR = G(
  (rnd, lang) => {
    if (rnd() < 0.5) {
      const [p, q] = pick(rnd, RATIOS.filter((r) => r[0] > 0));
      const a = (q - p) * ri(rnd, 1, 5);
      const S = (a * q) / (q - p);
      const ans = F(p, q);
      return NUM(
        L(lang, `Suatu deret geometri tak hingga memiliki suku pertama ${a} dan jumlah ${S}. Rasionya adalah … (boleh pecahan)`, `An infinite geometric series has first term ${a} and sum ${S}. Its ratio is … (fraction allowed)`),
        ans,
        WR(ans, [
          [F(a, S), L(lang, `${a}/${S} adalah 1 − r, bukan r.`, `${a}/${S} is 1 − r, not r.`)],
          [F(S - a, a), L(lang, 'Dari S = a ÷ (1 − r): 1 − r = a ÷ S.', 'From S = a ÷ (1 − r): 1 − r = a ÷ S.')],
        ]),
        [`${S} = ${a} ÷ (1 − r) → 1 − r = ${a}/${S}`, `r = 1 − ${Fr(a, S)} = ${ans}`],
        { kind: 'r', a, S },
      );
    }
    // bola memantul
    const [p, q] = pick(rnd, [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ]);
    const h = q * ri(rnd, 1, 4) * (q === 2 ? 2 : 1);
    const ans = (h * (q + p)) / (q - p);
    return NUM(
      L(lang, `Bola dijatuhkan dari ketinggian ${h} m. Setiap memantul tingginya ${Fr(p, q)} dari tinggi sebelumnya. Panjang lintasan bola sampai berhenti adalah … m`, `A ball is dropped from ${h} m. Each bounce reaches ${Fr(p, q)} of the previous height. The total distance travelled until it stops is … m`),
      D(ans),
      WR(D(ans), [
        [(h * q) / (q - p), L(lang, 'Itu hanya lintasan turun. Setelah memantul, bola juga naik.', 'That is only the downward path. After each bounce the ball also goes up.')],
        [(2 * h * q) / (q - p), L(lang, 'Jatuhan pertama hanya turun, tidak naik. Jangan dihitung dua kali.', 'The first drop only goes down. Do not count it twice.')],
      ]),
      [L(lang, `Turun: ${h} ÷ (1 − ${Fr(p, q)}) = ${M(lang, (h * q) / (q - p))}`, `Down: ${h} ÷ (1 − ${Fr(p, q)}) = ${M(lang, (h * q) / (q - p))}`), L(lang, `Naik: ${M(lang, (h * p) / q)} ÷ (1 − ${Fr(p, q)}) = ${M(lang, (h * p) / (q - p))}`, `Up: ${M(lang, (h * p) / q)} ÷ (1 − ${Fr(p, q)}) = ${M(lang, (h * p) / (q - p))}`), L(lang, `Total = ${M(lang, ans)} m`, `Total = ${M(lang, ans)} m`)],
      { kind: 'ball', h, p, q },
    );
  },
  (m) => {
    if (m.kind === 'r') return F(m.S - m.a, m.S);
    let tot = m.h;
    let hh = m.h;
    for (let i = 0; i < 400; i++) {
      hh = (hh * m.p) / m.q;
      tot += 2 * hh;
    }
    return D(tot);
  },
);

// ================= Bab 3: Vektor =================
const V = (lang, x, y) => `(${M(lang, x)}, ${M(lang, y)})`;
const vecAB = G(
  (rnd, lang) => {
    const A = [ri(rnd, -5, 6), ri(rnd, -5, 6)];
    let B;
    do B = [ri(rnd, -5, 8), ri(rnd, -5, 8)];
    while (B[0] === A[0] || B[1] === A[1]);
    const d = [B[0] - A[0], B[1] - A[1]];
    const okT = V(lang, ...d);
    return OPT(
      L(lang, `Titik A${V(lang, ...A)} dan B${V(lang, ...B)}. Vektor AB adalah …`, `Points A${V(lang, ...A)} and B${V(lang, ...B)}. Vector AB is …`),
      okT,
      [
        [V(lang, -d[0], -d[1]), L(lang, 'Itu vektor BA. Vektor AB = B − A (ujung dikurangi pangkal).', 'That is vector BA. Vector AB = B − A (end minus start).')],
        [V(lang, A[0] + B[0], A[1] + B[1]), L(lang, 'Koordinatnya dikurangkan, bukan dijumlahkan.', 'Subtract the coordinates, do not add them.')],
        [V(lang, ...B), L(lang, 'Itu posisi titik B. Kurangi dengan A.', 'That is the position of B. Subtract A.')],
        [V(lang, d[1], d[0]), L(lang, 'Komponennya tertukar.', 'The components are swapped.')],
      ],
      ['AB = B − A', `= ${V(lang, B[0], B[1])} − ${V(lang, A[0], A[1])} = ${okT}`],
      { A, B },
    );
  },
  (m, lang) => V(lang, m.B[0] - m.A[0], m.B[1] - m.A[1]),
);

const vecLen = G(
  (rnd, lang) => {
    const [x0, y0, h] = triple(rnd, 40);
    const x = x0 * sgn(rnd);
    const y = y0 * sgn(rnd);
    if (rnd() < 0.3) {
      const k = nz(rnd, -3, 3);
      return NUM(
        L(lang, `Panjang vektor a = ${V(lang, x, y)} adalah ${h}. Panjang vektor ${k === -1 ? '−' : mi(k)}a adalah …`, `The length of a = ${V(lang, x, y)} is ${h}. The length of ${k === -1 ? '−' : mi(k)}a is …`),
        D(Math.abs(k) * h),
        WR(D(Math.abs(k) * h), [
          [k * h, L(lang, 'Panjang vektor selalu positif. Tanda minus hanya membalik arah.', 'A length is never negative. The minus sign only reverses direction.')],
          [k * k * h, L(lang, `Panjang dikali ${Math.abs(k)}, bukan ${k * k}.`, `The length is multiplied by ${Math.abs(k)}, not ${k * k}.`)],
        ]),
        ['|ka| = |k| × |a|', `= ${Math.abs(k)} × ${h} = ${Math.abs(k) * h}`],
        { x, y, k },
      );
    }
    return NUM(
      L(lang, `Panjang vektor ${V(lang, x, y)} adalah …`, `The length of the vector ${V(lang, x, y)} is …`),
      D(h),
      WR(D(h), [
        [Math.abs(x) + Math.abs(y), L(lang, 'Komponennya tidak dijumlah langsung. Pakai Pythagoras.', 'Do not just add the components. Use Pythagoras.')],
        [x * x + y * y, L(lang, 'Itu kuadrat panjangnya. Ambil akarnya.', 'That is the square of the length. Take the square root.')],
        [x + y, L(lang, 'Panjang = √(x² + y²).', 'Length = √(x² + y²).')],
      ]),
      [`√(${x < 0 ? `(${mi(x)})` : x}² + ${y < 0 ? `(${mi(y)})` : y}²) = √${x * x + y * y}`, `= ${h}`],
      { x, y, k: 1 },
    );
  },
  (m) => D(Math.abs(m.k) * Math.hypot(m.x, m.y)),
);

const vecAdd = G(
  (rnd, lang) => {
    const a = [nz(rnd, -6, 8), nz(rnd, -6, 8)];
    const b = [nz(rnd, -6, 8), nz(rnd, -6, 8)];
    const kind = pick(rnd, ['+', '−', 'find']);
    if (kind === 'find') {
      const s = [a[0] + b[0], a[1] + b[1]];
      const okT = V(lang, ...b);
      return OPT(
        L(lang, `Jika a + b = ${V(lang, ...s)} dan a = ${V(lang, ...a)}, maka b = …`, `If a + b = ${V(lang, ...s)} and a = ${V(lang, ...a)}, then b = …`),
        okT,
        [
          [V(lang, s[0] + a[0], s[1] + a[1]), L(lang, 'b = (a + b) − a. Kurangi, jangan dijumlah.', 'b = (a + b) − a. Subtract, do not add.')],
          [V(lang, -b[0], -b[1]), L(lang, 'Urutan pengurangannya terbalik: a − (a + b).', 'The subtraction is the wrong way round: a − (a + b).')],
          [V(lang, b[0], -b[1]), L(lang, 'Komponen kedua salah tanda.', 'The second component has the wrong sign.')],
          [V(lang, -b[0], b[1]), L(lang, 'Komponen pertama salah tanda.', 'The first component has the wrong sign.')],
        ],
        [`b = ${V(lang, ...s)} − ${V(lang, ...a)}`, `= ${okT}`],
        { kind, a, s },
      );
    }
    const sg = kind === '+' ? 1 : -1;
    const r = [a[0] + sg * b[0], a[1] + sg * b[1]];
    const okT = V(lang, ...r);
    return OPT(
      L(lang, `Jika a = ${V(lang, ...a)} dan b = ${V(lang, ...b)}, maka a ${kind} b = …`, `If a = ${V(lang, ...a)} and b = ${V(lang, ...b)}, then a ${kind} b = …`),
      okT,
      [
        [V(lang, a[0] - sg * b[0], a[1] - sg * b[1]), L(lang, `Itu a ${kind === '+' ? '−' : '+'} b. Perhatikan operasinya.`, `That is a ${kind === '+' ? '−' : '+'} b. Check the operation.`)],
        [V(lang, r[0], a[1] - sg * b[1]), L(lang, 'Komponen kedua salah hitung.', 'The second component is wrong.')],
        [V(lang, a[0] - sg * b[0], r[1]), L(lang, 'Komponen pertama salah hitung.', 'The first component is wrong.')],
        [V(lang, a[0] * b[0], a[1] * b[1]), L(lang, 'Komponennya dijumlah atau dikurang, bukan dikali.', 'Add or subtract components, do not multiply.')],
      ],
      [L(lang, 'Operasikan komponen yang seletak.', 'Combine matching components.'), `(${M(lang, a[0])} ${kind} ${b[0] < 0 ? `(${M(lang, b[0])})` : b[0]}, ${M(lang, a[1])} ${kind} ${b[1] < 0 ? `(${M(lang, b[1])})` : b[1]}) = ${okT}`],
      { kind, a, b },
    );
  },
  (m, lang) => (m.kind === 'find' ? V(lang, m.s[0] - m.a[0], m.s[1] - m.a[1]) : m.kind === '+' ? V(lang, m.a[0] + m.b[0], m.a[1] + m.b[1]) : V(lang, m.a[0] - m.b[0], m.a[1] - m.b[1])),
);

const vecSumLen = G(
  (rnd, lang) => {
    const [x0, y0, h] = triple(rnd, 30);
    const s = [x0 * sgn(rnd), y0 * sgn(rnd)];
    const a = [ri(rnd, -4, 6), ri(rnd, -4, 6)];
    const b = [s[0] - a[0], s[1] - a[1]];
    return NUM(
      L(lang, `Jika a = ${V(lang, ...a)} dan b = ${V(lang, ...b)}, panjang vektor a + b adalah …`, `If a = ${V(lang, ...a)} and b = ${V(lang, ...b)}, the length of a + b is …`),
      D(h),
      WR(D(h), [
        [Math.abs(s[0]) + Math.abs(s[1]), L(lang, 'Panjang dihitung dengan Pythagoras, bukan menjumlah komponen.', 'Use Pythagoras for the length, not the sum of components.')],
        [s[0] * s[0] + s[1] * s[1], L(lang, 'Itu kuadrat panjangnya. Ambil akarnya.', 'That is the length squared. Take the square root.')],
      ]),
      [`a + b = ${V(lang, ...s)}`, `|a + b| = √(${s[0] * s[0]} + ${s[1] * s[1]}) = √${h * h} = ${h}`],
      { a, b },
    );
  },
  (m) => D(Math.hypot(m.a[0] + m.b[0], m.a[1] + m.b[1])),
);

const vecScalar = G(
  (rnd, lang) => {
    const a = [nz(rnd, -5, 5), nz(rnd, -5, 5)];
    const b = [nz(rnd, -5, 5), nz(rnd, -5, 5)];
    const k = pick(rnd, [2, 3, 4, -2, -3]);
    const j = pick(rnd, [1, 2, 3, -1, -2]);
    const r = [k * a[0] + j * b[0], k * a[1] + j * b[1]];
    const okT = V(lang, ...r);
    const ex = `${mi(k)}a ${j < 0 ? '−' : '+'} ${Math.abs(j) === 1 ? '' : Math.abs(j)}b`;
    return OPT(
      L(lang, `Jika a = ${V(lang, ...a)} dan b = ${V(lang, ...b)}, maka ${ex} = …`, `If a = ${V(lang, ...a)} and b = ${V(lang, ...b)}, then ${ex} = …`),
      okT,
      [
        [V(lang, k * a[0] + j * b[0], a[1] + j * b[1]), L(lang, `Komponen kedua a juga dikali ${mi(k)}.`, `The second component of a must also be multiplied by ${mi(k)}.`)],
        [V(lang, k * a[0] - j * b[0], k * a[1] - j * b[1]), L(lang, 'Tanda untuk b terbalik.', 'The sign for b is flipped.')],
        [V(lang, a[0] + b[0] + k + j, a[1] + b[1] + k + j), L(lang, 'Skalar mengalikan setiap komponen, bukan ditambahkan.', 'A scalar multiplies each component; it is not added.')],
        [V(lang, k * a[0] + b[0], k * a[1] + b[1]), L(lang, `b juga harus dikali ${mi(j)}.`, `b must also be multiplied by ${mi(j)}.`)],
        [V(lang, a[0] + j * b[0], a[1] + j * b[1]), L(lang, `a juga harus dikali ${mi(k)}.`, `a must also be multiplied by ${mi(k)}.`)],
      ],
      [`${mi(k)}a = ${V(lang, k * a[0], k * a[1])}, ${mi(j)}b = ${V(lang, j * b[0], j * b[1])}`, `${L(lang, 'Jumlahkan', 'Add')}: ${okT}`],
      { a, b, k, j },
    );
  },
  (m, lang) => V(lang, m.k * m.a[0] + m.j * m.b[0], m.k * m.a[1] + m.j * m.b[1]),
);

const vecPar = G(
  (rnd, lang) => {
    let p, q;
    do {
      p = nz(rnd, -4, 4);
      q = nz(rnd, -4, 4);
    } while (Math.abs(p) === Math.abs(q) || gcd(p, q) !== 1);
    if (rnd() < 0.5) {
      const k = pick(rnd, [-5, -4, -3, -2, -1, 2, 3, 4, 5, 6]);
      return NUM(
        L(lang, `Jika k × ${V(lang, p, q)} = ${V(lang, k * p, k * q)}, nilai k adalah …`, `If k × ${V(lang, p, q)} = ${V(lang, k * p, k * q)}, the value of k is …`),
        D(k),
        WR(D(k), [
          [-k, L(lang, 'Perhatikan tandanya.', 'Watch the sign.')],
          [k * p - p, L(lang, 'Bagi, jangan kurangi.', 'Divide, do not subtract.')],
        ]),
        [`k × ${p < 0 ? `(${M(lang, p)})` : p} = ${M(lang, k * p)} → k = ${M(lang, k)}`, L(lang, `Cek komponen kedua: ${M(lang, k)} × ${M(lang, q)} = ${M(lang, k * q)}`, `Check the second component: ${M(lang, k)} × ${M(lang, q)} = ${M(lang, k * q)}`)],
        { kind: 'k', p, kp: k * p },
      );
    }
    const k = pick(rnd, [2, 3, -2, -3, 4]);
    const okT = V(lang, k * p, k * q);
    return OPT(
      L(lang, `Vektor manakah yang sejajar dengan ${V(lang, p, q)}?`, `Which vector is parallel to ${V(lang, p, q)}?`),
      okT,
      [
        [V(lang, q, p), L(lang, 'Komponennya ditukar, arahnya berubah.', 'Swapping components changes the direction.')],
        [V(lang, k * p, -k * q), L(lang, 'Hanya satu komponen yang berganti tanda, jadi arahnya berbeda.', 'Only one component changed sign, so the direction differs.')],
        [V(lang, p + k, q + k), L(lang, 'Vektor sejajar didapat dengan mengalikan, bukan menambah.', 'Parallel vectors come from multiplying, not adding.')],
        [V(lang, -q, p), L(lang, 'Vektor ini tegak lurus, bukan sejajar.', 'This one is perpendicular, not parallel.')],
      ],
      [L(lang, 'Vektor sejajar adalah kelipatan k × v.', 'Parallel vectors are multiples k × v.'), `${mi(k)} × ${V(lang, p, q)} = ${okT}`],
      { kind: 'par', p, q, k },
    );
  },
  (m, lang) => (m.kind === 'k' ? D(m.kp / m.p) : V(lang, m.k * m.p, m.k * m.q)),
);

// ================= Bab 4: Trigonometri =================
const RAT = { sin: (a, b, c) => [a, c], cos: (a, b, c) => [b, c], tan: (a, b) => [a, b] };
const trigRatio = G(
  (rnd, lang) => {
    const [a, b, c] = triple(rnd, 50);
    const f = pick(rnd, ['sin', 'cos', 'tan']);
    const [p, q] = RAT[f](a, b, c);
    const ans = F(p, q);
    const others = ['sin', 'cos', 'tan'].filter((g) => g !== f);
    return NUM(
      L(lang, `Segitiga siku-siku memiliki sisi depan sudut A = ${a}, sisi samping = ${b}, dan sisi miring = ${c}. Nilai ${f} A adalah … (boleh pecahan atau desimal)`, `A right triangle has opposite side ${a}, adjacent side ${b} and hypotenuse ${c} for angle A. Find ${f} A. (fraction or decimal)`),
      ans,
      WR(ans, [
        ...others.map((g) => [F(...RAT[g](a, b, c)), L(lang, `Itu nilai ${g} A. ${f === 'sin' ? 'sin = depan/miring' : f === 'cos' ? 'cos = samping/miring' : 'tan = depan/samping'}.`, `That is ${g} A. ${f === 'sin' ? 'sin = opposite/hypotenuse' : f === 'cos' ? 'cos = adjacent/hypotenuse' : 'tan = opposite/adjacent'}.`)]),
        [F(q, p), L(lang, 'Pecahannya terbalik.', 'The fraction is upside down.')],
      ]),
      [f === 'sin' ? L(lang, 'sin A = depan/miring', 'sin A = opposite/hypotenuse') : f === 'cos' ? L(lang, 'cos A = samping/miring', 'cos A = adjacent/hypotenuse') : L(lang, 'tan A = depan/samping', 'tan A = opposite/adjacent'), `= ${p}/${q}${gcd(p, q) > 1 ? ` = ${ans}` : ''}`],
      { a, b, c, f },
    );
  },
  (m) => {
    const opp = m.a;
    const adj = m.b;
    const hyp = Math.hypot(opp, adj);
    return F(...(m.f === 'sin' ? [opp, hyp] : m.f === 'cos' ? [adj, hyp] : [opp, adj]).map(Math.round));
  },
);

const trigFromOne = G(
  (rnd, lang) => {
    const [a, b, c] = pick(rnd, [
      [3, 4, 5],
      [4, 3, 5],
      [5, 12, 13],
      [12, 5, 13],
      [8, 15, 17],
      [15, 8, 17],
      [7, 24, 25],
    ]);
    if (rnd() < 0.5) {
      // dari sin, cari cos atau tan
      const g = pick(rnd, ['cos', 'tan']);
      const okT = g === 'cos' ? `${b}/${c}` : `${a}/${b}`;
      return OPT(
        L(lang, `Jika sin A = ${a}/${c} (A sudut lancip), maka ${g} A = …`, `If sin A = ${a}/${c} (A acute), then ${g} A = …`),
        okT,
        [
          [`${b}/${c}`, L(lang, `${b}/${c} adalah cos A (samping/miring).`, `${b}/${c} is cos A (adjacent/hypotenuse).`)],
          [`${a}/${b}`, L(lang, `${a}/${b} adalah tan A (depan/samping).`, `${a}/${b} is tan A (opposite/adjacent).`)],
          [`${b}/${a}`, L(lang, 'Pecahannya terbalik.', 'The fraction is upside down.')],
          [`${c}/${a}`, L(lang, 'Itu kebalikan sin A.', 'That is the reciprocal of sin A.')],
          [`${c - a}/${c}`, L(lang, 'Sisi samping dicari dengan Pythagoras, bukan pengurangan biasa.', 'Find the adjacent side with Pythagoras, not plain subtraction.')],
        ],
        [L(lang, `Depan ${a}, miring ${c}, maka samping = √(${c}² − ${a}²) = ${b}.`, `Opposite ${a}, hypotenuse ${c}, so adjacent = √(${c}² − ${a}²) = ${b}.`), `${g} A = ${okT}`],
        { kind: 'mc', a, c, g },
      );
    }
    const k = ri(rnd, 1, 4);
    return NUM(
      L(lang, `Pada segitiga siku-siku, sisi miringnya ${c * k} cm dan sin θ = ${a}/${c}. Panjang sisi depan sudut θ adalah … cm`, `In a right triangle the hypotenuse is ${c * k} cm and sin θ = ${a}/${c}. The side opposite θ is … cm`),
      D(a * k),
      WR(D(a * k), [
        [b * k, L(lang, 'Itu sisi samping. sin memakai sisi depan.', 'That is the adjacent side. Sine uses the opposite side.')],
        [(c * k * c) / a, L(lang, 'Kalikan sisi miring dengan sin θ, bukan dibagi.', 'Multiply the hypotenuse by sin θ, do not divide.')],
        [a, L(lang, `Sisi miringnya ${c * k}, bukan ${c}. Kalikan dengan ${a}/${c}.`, `The hypotenuse is ${c * k}, not ${c}. Multiply by ${a}/${c}.`)],
      ]),
      [L(lang, 'depan = miring × sin θ', 'opposite = hypotenuse × sin θ'), `= ${c * k} × ${a}/${c} = ${a * k}`],
      { kind: 'num', a, c, h: c * k },
    );
  },
  (m) => {
    if (m.kind === 'num') return D((m.h * m.a) / m.c);
    const b = Math.round(Math.sqrt(m.c * m.c - m.a * m.a));
    return m.g === 'cos' ? `${b}/${m.c}` : `${m.a}/${b}`;
  },
);

const SV = {
  sin: { 0: '0', 30: '½', 45: '½√2', 60: '½√3', 90: '1' },
  cos: { 0: '1', 30: '½√3', 45: '½√2', 60: '½', 90: '0' },
  tan: { 0: '0', 30: '⅓√3', 45: '1', 60: '√3' },
};
const special = G(
  (rnd, lang) => {
    const f = pick(rnd, ['sin', 'cos', 'tan']);
    const ang = pick(rnd, f === 'tan' ? [30, 45, 60] : [30, 45, 60, 0, 90, 30, 60]);
    const okT = SV[f][ang];
    const pool = ['0', '½', '½√2', '½√3', '1', '⅓√3', '√3'].filter((v) => v !== okT);
    const whoHas = (v) => {
      for (const g of ['sin', 'cos', 'tan']) for (const [a, x] of Object.entries(SV[g])) if (x === v && !(g === f && +a === ang) && (g !== 'tan' || f === 'tan')) return `${g} ${a}°`;
      for (const g of ['sin', 'cos', 'tan']) for (const [a, x] of Object.entries(SV[g])) if (x === v) return `${g} ${a}°`;
    };
    const close = { '½': ['½√3', '½√2', '√3'], '½√3': ['½', '√3', '½√2'], '½√2': ['½', '½√3', '√2'], '⅓√3': ['√3', '½', '½√3'], '√3': ['⅓√3', '½√3', '1'], 1: ['0', '½', '√3'], 0: ['1', '½', '½√2'] }[okT] || pool;
    const ds = [...close, ...pool].filter((v) => v !== okT);
    return OPT(
      L(lang, `Nilai ${f} ${ang}° adalah …`, `The value of ${f} ${ang}° is …`),
      okT,
      ds.map((v) => [v, whoHas(v) ? L(lang, `${v} adalah nilai ${whoHas(v)}.`, `${v} is the value of ${whoHas(v)}.`) : L(lang, 'Bukan nilai sudut istimewa ini.', 'That is not the value for this special angle.')]),
      [f === 'tan' ? L(lang, 'tan = sin ÷ cos.', 'tan = sin ÷ cos.') : L(lang, 'Ingat tabel: sin 0°, 30°, 45°, 60°, 90° = 0, ½, ½√2, ½√3, 1; cos urutannya terbalik.', 'Recall: sin 0°, 30°, 45°, 60°, 90° = 0, ½, ½√2, ½√3, 1; cos goes in reverse.'), `${f} ${ang}° = ${okT}`],
      { f, ang },
    );
  },
  (m) => {
    const r = (m.ang * Math.PI) / 180;
    const v = Math[m.f](r);
    const tab = [
      [0, '0'],
      [0.5, '½'],
      [Math.SQRT2 / 2, '½√2'],
      [Math.sqrt(3) / 2, '½√3'],
      [1, '1'],
      [Math.sqrt(3) / 3, '⅓√3'],
      [Math.sqrt(3), '√3'],
    ];
    return tab.find(([x]) => Math.abs(x - v) < 1e-9)[1];
  },
);

// suku rasional: [teks, nilai p/q]
const RTERM = [
  ['sin 30°', 1, 2],
  ['cos 60°', 1, 2],
  ['tan 45°', 1, 1],
  ['sin 90°', 1, 1],
  ['cos 0°', 1, 1],
  ['sin² 45°', 1, 2],
  ['cos² 45°', 1, 2],
  ['sin² 60°', 3, 4],
  ['cos² 30°', 3, 4],
  ['tan² 60°', 3, 1],
  ['tan² 30°', 1, 3],
  ['sin² 30°', 1, 4],
  ['cos 90°', 0, 1],
];
const specialExpr = G(
  (rnd, lang) => {
    let t1, t2;
    do {
      t1 = pick(rnd, RTERM);
      t2 = pick(rnd, RTERM);
    } while (t1 === t2 || t1[1] === 0);
    const c1 = pick(rnd, [1, 2, 3, 4]);
    const c2 = pick(rnd, [1, 2, 3, -1, -2]);
    const num = c1 * t1[1] * t2[2] + c2 * t2[1] * t1[2];
    const den = t1[2] * t2[2];
    const ans = F(num, den);
    const ex = `${c1 === 1 ? '' : c1 + ' '}${t1[0]} ${c2 < 0 ? '−' : '+'} ${Math.abs(c2) === 1 ? '' : Math.abs(c2) + ' '}${t2[0]}`;
    return NUM(
      L(lang, `Nilai ${ex} adalah … (boleh pecahan atau desimal)`, `The value of ${ex} is … (fraction or decimal)`),
      ans,
      WR(ans, [
        [F(t1[1] * t2[2] + Math.sign(c2) * t2[1] * t1[2], den), L(lang, 'Jangan lupa mengalikan dengan koefisien di depannya.', 'Remember to multiply by the coefficients in front.')],
        [F(c1 * t1[1] * t2[2] - c2 * t2[1] * t1[2], den), L(lang, 'Perhatikan tanda di tengah.', 'Watch the sign in the middle.')],
      ]),
      [`${t1[0]} = ${Fr(t1[1], t1[2])}, ${t2[0]} = ${Fr(t2[1], t2[2])}`, `${c1 === 1 ? '' : c1 + ' × '}${Fr(t1[1], t1[2])} ${c2 < 0 ? '−' : '+'} ${Math.abs(c2) === 1 ? '' : Math.abs(c2) + ' × '}${Fr(t2[1], t2[2])} = ${mi(ans)}`],
      { ex: [c1, t1[0], c2, t2[0]] },
    );
  },
  (m) => {
    const val = (s) => {
      const mt = s.match(/^(sin|cos|tan)(²?) (\d+)°$/);
      const v = Math[mt[1]]((+mt[3] * Math.PI) / 180);
      return mt[2] ? v * v : v;
    };
    const x = m.ex[0] * val(m.ex[1]) + m.ex[2] * val(m.ex[3]);
    for (let d = 1; d <= 24; d++) if (Math.abs(x * d - Math.round(x * d)) < 1e-9) return F(Math.round(x * d), d);
  },
);

const trigApply = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['elev45', 'ladder60', 'kite30', 'dep45', 'ladder30']);
    const L0 = ri(rnd, 2, 30) * 2;
    let q, ans, wrong, steps;
    if (kind === 'elev45') {
      q = L(lang, `Dari jarak ${L0} m, puncak sebuah tiang terlihat dengan sudut elevasi 45°. Tinggi tiang adalah … m`, `From ${L0} m away, the top of a pole is seen at an angle of elevation of 45°. The pole is … m tall`);
      ans = L0;
      wrong = [[L0 / 2, L(lang, 'tan 45° = 1, bukan ½.', 'tan 45° = 1, not ½.')]];
      steps = [L(lang, 'tinggi = jarak × tan 45°', 'height = distance × tan 45°'), `= ${L0} × 1 = ${L0}`];
    } else if (kind === 'dep45') {
      q = L(lang, `Dari puncak menara setinggi ${L0} m, sebuah mobil terlihat dengan sudut depresi 45°. Jarak mobil ke kaki menara adalah … m`, `From the top of a ${L0} m tower, a car is seen at an angle of depression of 45°. How far is the car from the foot of the tower? … m`);
      ans = L0;
      wrong = [[L0 / 2, L(lang, 'tan 45° = 1, jadi jaraknya sama dengan tinggi.', 'tan 45° = 1, so the distance equals the height.')]];
      steps = [L(lang, 'tan 45° = tinggi ÷ jarak = 1', 'tan 45° = height ÷ distance = 1'), L(lang, `jarak = ${L0} m`, `distance = ${L0} m`)];
    } else if (kind === 'ladder60') {
      q = L(lang, `Tangga ${L0} m bersandar ke dinding dan membentuk sudut 60° dengan lantai. Jarak kaki tangga ke dinding adalah … m`, `A ${L0} m ladder leans on a wall, making a 60° angle with the floor. How far is its foot from the wall? … m`);
      ans = L0 / 2;
      wrong = [
        [L0, L(lang, 'Kalikan panjang tangga dengan cos 60° = ½.', 'Multiply the ladder length by cos 60° = ½.')],
        [L0 * 2, L(lang, 'Kalikan dengan cos 60°, jangan dibagi.', 'Multiply by cos 60°, do not divide.')],
      ];
      steps = [L(lang, 'jarak = panjang tangga × cos 60°', 'distance = ladder × cos 60°'), `= ${L0} × ½ = ${L0 / 2}`];
    } else if (kind === 'ladder30') {
      q = L(lang, `Tangga ${L0} m bersandar ke dinding dan membentuk sudut 30° dengan lantai. Tinggi ujung atas tangga dari lantai adalah … m`, `A ${L0} m ladder leans on a wall, making a 30° angle with the floor. How high up the wall does it reach? … m`);
      ans = L0 / 2;
      wrong = [
        [L0, L(lang, 'Kalikan dengan sin 30° = ½.', 'Multiply by sin 30° = ½.')],
        [L0 * 2, L(lang, 'Kalikan dengan sin 30°, jangan dibagi.', 'Multiply by sin 30°, do not divide.')],
      ];
      steps = [L(lang, 'tinggi = panjang tangga × sin 30°', 'height = ladder × sin 30°'), `= ${L0} × ½ = ${L0 / 2}`];
    } else {
      q = L(lang, `Benang layang-layang ${L0} m membentuk sudut 30° dengan tanah. Tinggi layang-layang adalah … m`, `A kite string of ${L0} m makes a 30° angle with the ground. How high is the kite? … m`);
      ans = L0 / 2;
      wrong = [
        [L0, L(lang, 'Panjang benang adalah sisi miring. Kalikan dengan sin 30°.', 'The string is the hypotenuse. Multiply by sin 30°.')],
        [L0 * 2, L(lang, 'Kalikan dengan sin 30°, jangan dibagi.', 'Multiply by sin 30°, do not divide.')],
      ];
      steps = [L(lang, 'tinggi = panjang benang × sin 30°', 'height = string × sin 30°'), `= ${L0} × ½ = ${L0 / 2}`];
    }
    return NUM(q, D(ans), WR(D(ans), wrong), steps, { kind, L0 });
  },
  (m) => {
    const r = (d) => (d * Math.PI) / 180;
    const v = { elev45: m.L0 * Math.tan(r(45)), dep45: m.L0 / Math.tan(r(45)), ladder60: m.L0 * Math.cos(r(60)), ladder30: m.L0 * Math.sin(r(30)), kite30: m.L0 * Math.sin(r(30)) }[m.kind];
    return D(v);
  },
);

const trigShadow = G(
  (rnd, lang) => {
    const ang = pick(rnd, [30, 60]);
    const s = ri(rnd, 1, 8) * 3;
    const okT = ang === 60 ? `${s}√3 m` : `${s / 3}√3 m`;
    const alt = ang === 60 ? `${s / 3}√3 m` : `${s}√3 m`;
    return OPT(
      L(lang, `Bayangan sebuah tiang panjangnya ${s} m saat sinar matahari membentuk sudut ${ang}° dengan tanah. Tinggi tiang adalah …`, `A pole casts a shadow ${s} m long when the sun's rays make a ${ang}° angle with the ground. The pole is … tall`),
      okT,
      [
        [alt, L(lang, `Itu memakai tan ${90 - ang}°. Sudutnya ${ang}°.`, `That uses tan ${90 - ang}°. The angle is ${ang}°.`)],
        [`${s / 2} m`, L(lang, `Itu memakai sin 30°. Tinggi = bayangan × tan ${ang}°.`, `That uses sin 30°. Height = shadow × tan ${ang}°.`)],
        [`${2 * s} m`, L(lang, 'Itu kalau tan sudutnya 2. Pakai tan sudut istimewa.', 'That would need tan of the angle to be 2. Use the special value.')],
        [`${s} m`, L(lang, 'Itu hanya benar untuk sudut 45°.', 'That is only right for a 45° angle.')],
      ],
      [L(lang, `tinggi = bayangan × tan ${ang}°`, `height = shadow × tan ${ang}°`), `= ${s} × ${SV.tan[ang]} = ${okT}`],
      { s, ang },
    );
  },
  (m) => {
    const k = m.s * Math.tan((m.ang * Math.PI) / 180) / Math.sqrt(3);
    return `${Math.round(k)}√3 m`;
  },
);

// ================= Bab 5: SPLTV dan pertidaksamaan =================
const eqTxt = (c, r) => `${poly([[c[0], 1]], 'x')}${c[1] ? (c[1] < 0 ? ' − ' : ' + ') + (Math.abs(c[1]) === 1 ? '' : Math.abs(c[1])) + 'y' : ''}${c[2] ? (c[2] < 0 ? ' − ' : ' + ') + (Math.abs(c[2]) === 1 ? '' : Math.abs(c[2])) + 'z' : ''} = ${mi(r)}`;
const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
const spltv = G(
  (rnd, lang) => {
    const s = [ri(rnd, 1, 6), ri(rnd, -3, 6), ri(rnd, 1, 6)];
    let A;
    do A = [0, 1, 2].map(() => [pick(rnd, [1, 1, 2]), pick(rnd, [1, -1, 2, 1]), pick(rnd, [1, -1, 1, 2])]);
    while (det3(A) === 0);
    const r = A.map((row) => row[0] * s[0] + row[1] * s[1] + row[2] * s[2]);
    const ask = pick(rnd, ['x', 'y', 'z', 'x + y + z']);
    const ans = ask === 'x' ? s[0] : ask === 'y' ? s[1] : ask === 'z' ? s[2] : s[0] + s[1] + s[2];
    return NUM(
      L(lang, `Diketahui ${eqTxt(A[0], r[0])}, ${eqTxt(A[1], r[1])}, dan ${eqTxt(A[2], r[2])}. Nilai ${ask} adalah …`, `Given ${eqTxt(A[0], r[0])}, ${eqTxt(A[1], r[1])} and ${eqTxt(A[2], r[2])}. Find ${ask}.`),
      D(ans),
      WR(D(ans), [
        [ask !== 'x' ? s[0] : null, L(lang, 'Itu nilai x.', 'That is the value of x.')],
        [ask !== 'y' ? s[1] : null, L(lang, 'Itu nilai y.', 'That is the value of y.')],
        [ask !== 'z' ? s[2] : null, L(lang, 'Itu nilai z.', 'That is the value of z.')],
      ]),
      [L(lang, 'Eliminasi satu variabel dari dua pasang persamaan, lalu selesaikan SPLDV yang tersisa.', 'Eliminate one variable from two pairs of equations, then solve the remaining 2-variable system.'), `x = ${mi(s[0])}, y = ${mi(s[1])}, z = ${mi(s[2])}`, L(lang, `Cek ke persamaan pertama: ${mi(r[0])} ✓`, `Check in the first equation: ${mi(r[0])} ✓`)],
      { A, r, ask },
    );
  },
  (m) => {
    // aturan Cramer
    const d = det3(m.A);
    const col = (k) => m.A.map((row, i) => row.map((v, j) => (j === k ? m.r[i] : v)));
    const s = [0, 1, 2].map((k) => det3(col(k)) / d);
    return D(m.ask === 'x' ? s[0] : m.ask === 'y' ? s[1] : m.ask === 'z' ? s[2] : s[0] + s[1] + s[2]);
  },
);

const ITEMS3 = [
  ['pensil', 'buku', 'penghapus', 'pencil', 'book', 'eraser'],
  ['roti', 'yogurt', 'telur', 'bun', 'yogurt', 'egg'],
  ['apel', 'jeruk', 'pir', 'apple', 'orange', 'pear'],
];
const spltvPrice = G(
  (rnd, lang) => {
    const it = pick(rnd, ITEMS3);
    const p = [ri(rnd, 2, 9), ri(rnd, 2, 9), ri(rnd, 1, 9)].map((v) => v * 1000);
    const S1 = p[0] + p[1] + p[2];
    const S2 = 2 * p[0] + p[1] + p[2];
    const S3 = p[0] + 2 * p[1] + p[2];
    const k = ri(rnd, 0, 2);
    const R = (v) => `Rp${v.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')}`;
    const n = (i) => L(lang, it[i], it[i + 3]);
    return NUM(
      L(lang, `Harga 1 ${n(0)}, 1 ${n(1)}, dan 1 ${n(2)} ${R(S1)}. Harga 2 ${n(0)}, 1 ${n(1)}, dan 1 ${n(2)} ${R(S2)}. Harga 1 ${n(0)}, 2 ${n(1)}, dan 1 ${n(2)} ${R(S3)}. Harga 1 ${n(k)} adalah Rp …`, `1 ${n(0)}, 1 ${n(1)} and 1 ${n(2)} cost ${R(S1)}. 2 ${n(0)}s, 1 ${n(1)} and 1 ${n(2)} cost ${R(S2)}. 1 ${n(0)}, 2 ${n(1)}s and 1 ${n(2)} cost ${R(S3)}. One ${n(k)} costs Rp …`),
      D(p[k]),
      WR(D(p[k]), p.map((v, i) => [i !== k ? v : null, L(lang, `Itu harga ${n(i)}.`, `That is the price of the ${n(i)}.`)])),
      [L(lang, `Persamaan 2 − persamaan 1: harga ${n(0)} = ${S2 - S1}.`, `Equation 2 − equation 1: ${n(0)} = ${S2 - S1}.`), L(lang, `Persamaan 3 − persamaan 1: harga ${n(1)} = ${S3 - S1}.`, `Equation 3 − equation 1: ${n(1)} = ${S3 - S1}.`), L(lang, `${n(2)} = ${S1} − ${p[0]} − ${p[1]} = ${p[2]}.`, `${n(2)} = ${S1} − ${p[0]} − ${p[1]} = ${p[2]}.`)],
      { S: [S1, S2, S3], k },
    );
  },
  (m) => {
    const x = m.S[1] - m.S[0];
    const y = m.S[2] - m.S[0];
    return D([x, y, m.S[0] - x - y][m.k]);
  },
);

const INEQ = ['≤', '≥', '<', '>'];
const holds = (v, op, c) => (op === '≤' ? v <= c : op === '≥' ? v >= c : op === '<' ? v < c : v > c);
const linTxt = (a, b) => `${poly([[a, 1]], 'x')} ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y`;
const ineqPoint = G(
  (rnd, lang) => {
    let a, b, c, op, yes, no;
    do {
      a = pick(rnd, [1, 2, 3, -1]);
      b = pick(rnd, [1, 2, 1, -1]);
      c = ri(rnd, 2, 10);
      op = pick(rnd, INEQ);
      yes = [];
      no = [];
      for (let x = -1; x <= 5; x++) for (let y = -1; y <= 5; y++) (holds(a * x + b * y, op, c) ? yes : no).push([x, y]);
    } while (yes.length < 3 || no.length < 3);
    const okP = pick(rnd, yes);
    const bad = shuf(rnd, no).slice(0, 3);
    const okT = pt(...okP);
    const ex = `${linTxt(a, b)} ${op} ${c}`;
    return OPT(
      L(lang, `Titik manakah yang memenuhi ${ex}?`, `Which point satisfies ${ex}?`),
      okT,
      bad.map((P0) => [pt(...P0), L(lang, `Substitusi: ${mi(a * P0[0] + b * P0[1])} ${op} ${c} salah.`, `Substitute: ${mi(a * P0[0] + b * P0[1])} ${op} ${c} is false.`)]),
      [L(lang, 'Substitusikan setiap titik ke ruas kiri, lalu bandingkan dengan ruas kanan.', 'Substitute each point into the left side and compare with the right side.'), L(lang, `${okT}: ${mi(a * okP[0] + b * okP[1])} ${op} ${c} benar.`, `${okT}: ${mi(a * okP[0] + b * okP[1])} ${op} ${c} is true.`)],
      { a, b, c, op, pts: [okP, ...bad] },
    );
  },
  (m) => pt(...m.pts.find((P0) => holds(m.a * P0[0] + m.b * P0[1], m.op, m.c))),
);

const ineqCount = G(
  (rnd, lang) => {
    const a = pick(rnd, [1, 1, 2]);
    const b = a === 2 ? 1 : pick(rnd, [1, 2]);
    const n = ri(rnd, 2, 5);
    let cnt = 0;
    for (let x = 0; x <= n; x++) cnt += Math.floor((n - a * x) / b) + 1 > 0 && a * x <= n ? Math.floor((n - a * x) / b) + 1 : 0;
    let inner = 0;
    for (let x = 1; x <= n; x++) for (let y = 1; y <= n; y++) if (a * x + b * y <= n) inner++;
    const ex = `${linTxt(a, b)} ≤ ${n}`;
    const tri = ((n + 1) * (n + 2)) / 2;
    return NUM(
      L(lang, `Banyak titik dengan koordinat bilangan bulat (x, y) yang memenuhi x ≥ 0, y ≥ 0, dan ${ex} adalah …`, `How many points (x, y) with whole-number coordinates satisfy x ≥ 0, y ≥ 0 and ${ex}?`),
      D(cnt),
      WR(D(cnt), [
        [inner, L(lang, 'Titik pada sumbu (x = 0 atau y = 0) juga ikut, karena tandanya ≥.', 'Points on the axes (x = 0 or y = 0) count too, since the signs include equality.')],
        [a !== 1 || b !== 1 ? tri : null, L(lang, `Itu untuk x + y ≤ ${n}. Perhatikan koefisiennya.`, `That is for x + y ≤ ${n}. Check the coefficients.`)],
        [cnt - 1, L(lang, 'Titik (0, 0) juga memenuhi.', 'The point (0, 0) also works.')],
      ]),
      [L(lang, 'Hitung per nilai x, mulai x = 0.', 'Count for each x value, starting at x = 0.'), ...Array.from({ length: Math.floor(n / a) + 1 }, (_, x) => x)
        .slice(0, 3)
        .map((x) => L(lang, `x = ${x}: y = 0 sampai ${Math.floor((n - a * x) / b)} (${Math.floor((n - a * x) / b) + 1} titik)`, `x = ${x}: y = 0 to ${Math.floor((n - a * x) / b)} (${Math.floor((n - a * x) / b) + 1} points)`)), L(lang, `Total ${cnt} titik.`, `Total ${cnt} points.`)],
      { a, b, n },
    );
  },
  (m) => {
    let c = 0;
    for (let x = 0; x <= 20; x++) for (let y = 0; y <= 20; y++) if (m.a * x + m.b * y <= m.n) c++;
    return D(c);
  },
);

const ineqRegion = G(
  (rnd, lang) => {
    let p, q;
    do {
      p = ri(rnd, 2, 6);
      q = ri(rnd, 2, 6);
    } while (p === q && rnd() < 0.7);
    const g = gcd(p, q);
    const A = p / g;
    const B = q / g;
    const Cc = (p * q) / g;
    const hasO = rnd() < 0.5;
    const solid = rnd() < 0.6;
    const op = hasO ? (solid ? '≤' : '<') : solid ? '≥' : '>';
    const lhs = `${A === 1 ? '' : A}x + ${B === 1 ? '' : B}y`;
    const okT = `${lhs} ${op} ${Cc}`;
    const flip = { '≤': '≥', '≥': '≤', '<': '>', '>': '<' };
    const strict = { '≤': '<', '<': '≤', '≥': '>', '>': '≥' };
    return OPT(
      L(lang, `Daerah ${hasO ? 'yang memuat' : 'yang tidak memuat'} titik (0, 0) dan dibatasi garis ${solid ? 'utuh' : 'putus-putus'} melalui (0, ${p}) dan (${q}, 0) adalah penyelesaian dari …`, `The region ${hasO ? 'containing' : 'not containing'} (0, 0), bounded by a ${solid ? 'solid' : 'dashed'} line through (0, ${p}) and (${q}, 0), is the solution of …`),
      okT,
      [
        [`${lhs} ${flip[op]} ${Cc}`, L(lang, `Uji (0, 0): 0 ${flip[op]} ${Cc} ${hasO ? 'salah, padahal (0, 0) termasuk' : 'benar, padahal (0, 0) tidak termasuk'}.`, `Test (0, 0): 0 ${flip[op]} ${Cc} is ${hasO ? 'false, but (0, 0) is included' : 'true, but (0, 0) is not included'}.`)],
        [`${lhs} ${strict[op]} ${Cc}`, solid ? L(lang, 'Garis utuh berarti titik pada garis ikut, jadi pakai ≤ atau ≥.', 'A solid line means points on it count, so use ≤ or ≥.') : L(lang, 'Garis putus-putus berarti titik pada garis tidak ikut, jadi pakai < atau >.', 'A dashed line means points on it do not count, so use < or >.')],
        [`${B === 1 ? '' : B}x + ${A === 1 ? '' : A}y ${op} ${Cc}`, L(lang, `Koefisien tertukar. Cek titik (0, ${p}): harus tepat pada garis.`, `The coefficients are swapped. Check (0, ${p}): it must lie on the line.`)],
        [`x + y ${op} ${p + q}`, L(lang, 'Garis ini tidak melalui kedua titik itu.', 'This line does not pass through both points.')],
      ],
      [L(lang, `Garis melalui (0, ${p}) dan (${q}, 0): ${p}x + ${q}y = ${p * q}${g > 1 ? `, disederhanakan ${A === 1 ? '' : A}x + ${B === 1 ? '' : B}y = ${Cc}` : ''}.`, `Line through (0, ${p}) and (${q}, 0): ${p}x + ${q}y = ${p * q}${g > 1 ? `, simplified ${A === 1 ? '' : A}x + ${B === 1 ? '' : B}y = ${Cc}` : ''}.`), L(lang, `Garis ${solid ? 'utuh → tanda memuat sama dengan' : 'putus-putus → tanda tidak memuat sama dengan'}. (0, 0) ${hasO ? 'termasuk' : 'tidak termasuk'} → ${okT}.`, `${solid ? 'Solid line → include equality' : 'Dashed line → strict sign'}. (0, 0) ${hasO ? 'included' : 'not included'} → ${okT}.`)],
      { p, q, hasO, solid },
    );
  },
  (m) => {
    const g = gcd(m.p, m.q);
    const A = m.p / g;
    const B = m.q / g;
    const op = m.solid ? (m.hasO ? '≤' : '≥') : m.hasO ? '<' : '>';
    return `${A === 1 ? '' : A}x + ${B === 1 ? '' : B}y ${op} ${(m.p * m.q) / g}`;
  },
);

const optimum = G(
  (rnd, lang) => {
    let p, t, r, s;
    do {
      p = ri(rnd, 3, 9);
      t = ri(rnd, 3, 9);
      r = ri(rnd, 1, p - 1);
      s = ri(rnd, 1, t - 1);
    } while (r / p + s / t <= 1.05);
    const pts = [
      [0, 0],
      [p, 0],
      [r, s],
      [0, t],
    ];
    const a = ri(rnd, 1, 6);
    const b = ri(rnd, 1, 6);
    const max = rnd() < 0.7;
    const vals = pts.map(([x, y]) => a * x + b * y);
    const best = max ? Math.max(...vals) : Math.min(...vals.slice(1));
    const use = max ? pts : pts.slice(1);
    const other = max ? Math.min(...vals.slice(1)) : Math.max(...vals);
    return NUM(
      L(lang, `Titik pojok daerah penyelesaian adalah ${use.map((P0) => pt(...P0)).join(', ')}. Nilai ${max ? 'maksimum' : 'minimum'} f = ${a === 1 ? '' : a}x + ${b === 1 ? '' : b}y adalah …`, `The corner points of a feasible region are ${use.map((P0) => pt(...P0)).join(', ')}. The ${max ? 'maximum' : 'minimum'} of f = ${a === 1 ? '' : a}x + ${b === 1 ? '' : b}y is …`),
      D(best),
      WR(D(best), [
        [other, L(lang, `Itu nilai ${max ? 'terkecil' : 'terbesar'}. Yang ditanya ${max ? 'maksimum' : 'minimum'}.`, `That is the ${max ? 'smallest' : 'largest'} value. The question asks for the ${max ? 'maximum' : 'minimum'}.`)],
        [a * r + b * s !== best ? a * s + b * r : null, L(lang, 'Koordinat x dan y tertukar saat substitusi.', 'x and y were swapped when substituting.')],
      ]),
      [L(lang, 'Hitung f di setiap titik pojok:', 'Evaluate f at each corner:'), use.map((P0) => `f${pt(...P0)} = ${a * P0[0] + b * P0[1]}`).join(', '), L(lang, `Nilai ${max ? 'terbesar' : 'terkecil'}: ${best}.`, `${max ? 'Largest' : 'Smallest'}: ${best}.`)],
      { use, a, b, max },
    );
  },
  (m) => {
    const v = m.use.map(([x, y]) => m.a * x + m.b * y);
    return D(m.max ? Math.max(...v) : Math.min(...v));
  },
);

const CTX_LP = [
  ['Lahan parkir luasnya', 'm²', 'mobil', 'bus', 'A car park has', 'm²', 'car', 'bus', 'cars', 'buses'],
  ['Gudang luasnya', 'm²', 'kardus kecil', 'kardus besar', 'A storeroom has', 'm²', 'small box', 'large box', 'small boxes', 'large boxes'],
  ['Tepung yang tersedia', 'gram', 'roti', 'kue', 'A baker has', 'grams of flour', 'loaf of bread', 'cake', 'loaves', 'cakes'],
];
const lpModel = G(
  (rnd, lang) => {
    const c = pick(rnd, CTX_LP);
    let u, v;
    do {
      u = ri(rnd, 1, 5);
      v = ri(rnd, 1, 5);
    } while (u === v);
    const k = pick(rnd, [5, 10, 20, 50]);
    const tot = ri(rnd, 10, 40) * u * v;
    const g = gcd(gcd(u, v), tot);
    const A = u / g;
    const B = v / g;
    const T = tot / g;
    const okT = `${A === 1 ? '' : A}x + ${B === 1 ? '' : B}y ≤ ${T}`;
    return OPT(
      L(lang, `${c[0]} ${tot * k} ${c[1]}. Satu ${c[2]} butuh ${u * k} ${c[1]} dan satu ${c[3]} butuh ${v * k} ${c[1]}. Jika x = banyak ${c[2]} dan y = banyak ${c[3]}, pertidaksamaannya adalah …`, `${c[4]} has ${tot * k} ${c[5]}. One ${c[6]} needs ${u * k} ${c[5].replace(' of flour', '')} and one ${c[7]} needs ${v * k} ${c[5].replace(' of flour', '')}. If x = number of ${c[8]} and y = number of ${c[9]}, the inequality is …`),
      okT,
      [
        [`${B === 1 ? '' : B}x + ${A === 1 ? '' : A}y ≤ ${T}`, L(lang, 'Koefisien x dan y tertukar.', 'The coefficients of x and y are swapped.')],
        [`${A === 1 ? '' : A}x + ${B === 1 ? '' : B}y ≥ ${T}`, L(lang, 'Yang dipakai tidak boleh melebihi yang tersedia, jadi ≤.', 'What is used cannot exceed what is available, so ≤.')],
        [`x + y ≤ ${tot * k}`, L(lang, 'Setiap barang memakai tempat/bahan berbeda, jadi perlu koefisien.', 'Each item uses a different amount, so coefficients are needed.')],
      ],
      [`${u * k}x + ${v * k}y ≤ ${tot * k}`, L(lang, `Bagi dengan ${k * g}: ${okT}`, `Divide by ${k * g}: ${okT}`)],
      { u, v, tot },
    );
  },
  (m) => {
    const g = gcd(gcd(m.u, m.v), m.tot);
    return `${m.u / g === 1 ? '' : m.u / g}x + ${m.v / g === 1 ? '' : m.v / g}y ≤ ${m.tot / g}`;
  },
);

// ================= Bab 6: Fungsi Kuadrat =================
const vtx = (a, h, k) => `y = ${a === 1 ? '' : a === -1 ? '−' : mi(a)}${h === 0 ? 'x²' : `${xm(h)}²`}${plus(k)}`;
const vertexForm = G(
  (rnd, lang) => {
    const a = pick(rnd, [1, 1, 2, -1, -2, 3]);
    const h = nz(rnd, -6, 6);
    let k;
    do k = nz(rnd, -8, 8);
    while (Math.abs(k) === Math.abs(h));
    const f = vtx(a, h, k);
    const kind = pick(rnd, ['vertex', 'ext', 'axis', 'shift']);
    if (kind === 'vertex') {
      const okT = pt(h, k);
      return OPT(
        L(lang, `Titik puncak grafik ${f} adalah …`, `The vertex of ${f} is …`),
        okT,
        [
          [pt(-h, k), L(lang, `Bentuk (x − h)²: h = ${mi(h)}. Tanda di dalam kurung dibalik.`, `In (x − h)², h = ${mi(h)}. The sign inside the bracket flips.`)],
          [pt(k, h), L(lang, 'Koordinatnya tertukar.', 'The coordinates are swapped.')],
          [pt(h, -k), L(lang, 'Nilai k tidak berubah tanda.', 'The value of k keeps its sign.')],
          [pt(-h, -k), L(lang, 'Hanya h yang dibaca dengan tanda terbalik.', 'Only h is read with the opposite sign.')],
        ],
        [L(lang, 'Bentuk y = a(x − h)² + k berpuncak (h, k).', 'y = a(x − h)² + k has vertex (h, k).'), `${L(lang, 'Puncak', 'Vertex')} ${okT}`],
        { kind, a, h, k },
      );
    }
    if (kind === 'shift') {
      const okT = vtx(1, h, k);
      const dx = h > 0 ? L(lang, `${h} satuan ke kanan`, `${h} units right`) : L(lang, `${-h} satuan ke kiri`, `${-h} units left`);
      const dy = k > 0 ? L(lang, `${k} satuan ke atas`, `${k} units up`) : L(lang, `${-k} satuan ke bawah`, `${-k} units down`);
      return OPT(
        L(lang, `Grafik y = x² digeser ${dx} dan ${dy}. Persamaannya menjadi …`, `The graph of y = x² is shifted ${dx} and ${dy}. Its equation becomes …`),
        okT,
        [
          [vtx(1, -h, k), L(lang, 'Geser ke kanan h berarti (x − h)², ke kiri berarti (x + h)².', 'Shifting right by h gives (x − h)², left gives (x + h)².')],
          [vtx(1, h, -k), L(lang, 'Geser ke atas berarti menambah, ke bawah berarti mengurangi.', 'Up means add, down means subtract.')],
          [vtx(1, k, h), L(lang, 'Pergeseran mendatar dan tegak tertukar.', 'The horizontal and vertical shifts are swapped.')],
        ],
        [L(lang, `Mendatar: ${xm(h)}². Tegak: ${plus(k).trim()}.`, `Horizontal: ${xm(h)}². Vertical: ${plus(k).trim()}.`), okT],
        { kind, a: 1, h, k },
      );
    }
    if (kind === 'axis')
      return NUM(
        L(lang, `Persamaan sumbu simetri grafik ${f} adalah x = …`, `The axis of symmetry of ${f} is x = …`),
        D(h),
        WR(D(h), [
          [-h, L(lang, 'Tanda di dalam kurung dibalik: (x − h)² berarti sumbu x = h.', 'Flip the sign inside the bracket: (x − h)² means the axis is x = h.')],
          [k, L(lang, `${mi(k)} adalah nilai ekstrem, bukan sumbu simetri.`, `${mi(k)} is the extreme value, not the axis.`)],
        ]),
        [L(lang, 'Sumbu simetri melalui puncak: x = h.', 'The axis passes through the vertex: x = h.'), `x = ${mi(h)}`],
        { kind, a, h, k },
      );
    return NUM(
      L(lang, `Nilai ${a > 0 ? 'minimum' : 'maksimum'} fungsi ${f} adalah …`, `The ${a > 0 ? 'minimum' : 'maximum'} value of ${f} is …`),
      D(k),
      WR(D(k), [
        [h, L(lang, `${mi(h)} adalah letak x puncak, bukan nilainya.`, `${mi(h)} is the x of the vertex, not the value.`)],
        [-k, L(lang, 'Tanda k tidak dibalik.', 'Do not flip the sign of k.')],
        [a * k, L(lang, 'Nilai a tidak mengubah nilai puncak.', 'a does not change the vertex value.')],
      ]),
      [L(lang, `Saat x = ${mi(h)}, bagian kuadrat bernilai 0.`, `When x = ${mi(h)}, the squared part is 0.`), L(lang, `Nilai ${a > 0 ? 'minimum' : 'maksimum'} = ${mi(k)}`, `${a > 0 ? 'Minimum' : 'Maximum'} = ${mi(k)}`)],
      { kind, a, h, k },
    );
  },
  (m, lang) => {
    if (m.kind === 'vertex') return pt(m.h, m.k);
    if (m.kind === 'shift') return vtx(1, m.h, m.k);
    if (m.kind === 'axis') return D(m.h);
    // nilai ekstrem: cari dengan menelusuri x
    let best = null;
    for (let x = -20; x <= 20; x += 0.5) {
      const y = m.a * (x - m.h) ** 2 + m.k;
      if (best === null || (m.a > 0 ? y < best : y > best)) best = y;
    }
    return D(best);
  },
);

const completeSq = G(
  (rnd, lang) => {
    const p = nz(rnd, -7, 7);
    const b = 2 * p;
    const kind = pick(rnd, ['c', 'q', 'vertex', 'min']);
    const c = ri(rnd, -10, 15);
    const q = c - p * p;
    if (kind === 'c')
      return NUM(
        L(lang, `Agar x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x + c menjadi kuadrat sempurna, nilai c adalah …`, `For x² ${b < 0 ? '−' : '+'} ${Math.abs(b)}x + c to be a perfect square, c must be …`),
        D(p * p),
        WR(D(p * p), [
          [Math.abs(p), L(lang, 'Setengah koefisien x masih harus dikuadratkan.', 'Half the x-coefficient must still be squared.')],
          [b * b, L(lang, 'Koefisien x dibagi 2 dulu, baru dikuadratkan.', 'Halve the x-coefficient first, then square it.')],
          [2 * Math.abs(b), null],
        ].filter((w) => w[1])),
        [L(lang, `Setengah dari ${mi(b)} adalah ${mi(p)}.`, `Half of ${mi(b)} is ${mi(p)}.`), `c = (${mi(p)})² = ${p * p}`],
        { kind, b },
      );
    const f = pc([1, b, c]);
    if (kind === 'q')
      return NUM(
        L(lang, `Jika ${f} = ${xm(-p)}² + q, nilai q adalah …`, `If ${f} = ${xm(-p)}² + q, the value of q is …`),
        D(q),
        WR(D(q), [
          [c + p * p, L(lang, `${xm(-p)}² menghasilkan +${p * p}, jadi harus dikurangi.`, `${xm(-p)}² produces +${p * p}, so it must be subtracted.`)],
          [p * p, L(lang, `${p * p} adalah suku yang ditambahkan. q = c − ${p * p}.`, `${p * p} is the added term. q = c − ${p * p}.`)],
        ]),
        [`${xm(-p)}² = ${pc([1, b, p * p])}`, `q = ${mi(c)} − ${p * p} = ${mi(q)}`],
        { kind, b, c },
      );
    if (kind === 'vertex') {
      const okT = pt(-p, q);
      return OPT(
        L(lang, `Titik puncak y = ${f} adalah …`, `The vertex of y = ${f} is …`),
        okT,
        [
          [pt(p, q), L(lang, `x puncak = −b/2 = ${mi(-p)}.`, `Vertex x = −b/2 = ${mi(-p)}.`)],
          [pt(-p, c), L(lang, `${mi(c)} adalah titik potong sumbu y, bukan nilai puncak.`, `${mi(c)} is the y-intercept, not the vertex value.`)],
          [pt(-b, c - b * b), L(lang, 'x puncak = −b/(2a), jangan lupa dibagi 2.', 'Vertex x = −b/(2a); remember to divide by 2.')],
          [pt(-p, c + p * p), L(lang, `Kurangi ${p * p}, bukan tambah.`, `Subtract ${p * p}, do not add.`)],
        ],
        [`y = ${xm(-p)}²${plus(q)}`, `${L(lang, 'Puncak', 'Vertex')} ${okT}`],
        { kind, b, c },
      );
    }
    return NUM(
      L(lang, `Nilai minimum fungsi y = ${f} adalah …`, `The minimum value of y = ${f} is …`),
      D(q),
      WR(D(q), [
        [-p, L(lang, `${mi(-p)} adalah letak x puncak.`, `${mi(-p)} is the x of the vertex.`)],
        [c, L(lang, `${mi(c)} adalah nilai saat x = 0, belum tentu minimum.`, `${mi(c)} is the value at x = 0, not necessarily the minimum.`)],
        [c + p * p, L(lang, `Kurangi ${p * p}, bukan tambah.`, `Subtract ${p * p}, do not add.`)],
      ]),
      [`y = ${xm(-p)}²${plus(q)}`, L(lang, `Minimum saat ${xm(-p)}² = 0, yaitu ${mi(q)}.`, `Minimum when ${xm(-p)}² = 0: ${mi(q)}.`)],
      { kind, b, c },
    );
  },
  (m) => {
    if (m.kind === 'c') return D((m.b * m.b) / 4);
    const xv = -m.b / 2;
    const yv = xv * xv + m.b * xv + m.c;
    if (m.kind === 'q' || m.kind === 'min') return D(yv);
    return pt(xv, yv);
  },
);

const buildQuad = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['roots', 'vertex', 'mc']);
    const a = pick(rnd, [1, 2, 3, -1, -2, -3]);
    if (kind === 'roots') {
      const p = nz(rnd, -5, 5);
      let q;
      do q = nz(rnd, -5, 7);
      while (q === p);
      let x0;
      do x0 = ri(rnd, -4, 8);
      while (x0 === p || x0 === q);
      const y0 = a * (x0 - p) * (x0 - q);
      return NUM(
        L(lang, `Parabola y = a${xm(p)}${xm(q)} melalui titik ${pt(x0, y0)}. Nilai a adalah …`, `The parabola y = a${xm(p)}${xm(q)} passes through ${pt(x0, y0)}. Find a.`),
        D(a),
        WR(D(a), [
          [-a, L(lang, 'Perhatikan tanda saat mensubstitusi.', 'Watch the signs when substituting.')],
          [y0, L(lang, `Masih harus dibagi ${(x0 - p) * (x0 - q)}.`, `You still need to divide by ${(x0 - p) * (x0 - q)}.`)],
        ]),
        [`${mi(y0)} = a × (${mi(x0 - p)}) × (${mi(x0 - q)}) = ${mi((x0 - p) * (x0 - q))}a`, `a = ${mi(y0)} ÷ ${(x0 - p) * (x0 - q) < 0 ? `(${mi((x0 - p) * (x0 - q))})` : (x0 - p) * (x0 - q)} = ${mi(a)}`],
        { kind, p, q, x0, y0 },
      );
    }
    if (kind === 'vertex') {
      const h = ri(rnd, -4, 4);
      const k = ri(rnd, -6, 8);
      let x0;
      do x0 = h + nz(rnd, -3, 3);
      while (false);
      const y0 = a * (x0 - h) ** 2 + k;
      return NUM(
        L(lang, `Parabola dengan titik puncak ${pt(h, k)} melalui ${pt(x0, y0)}. Nilai a pada y = a${h === 0 ? 'x' : xm(h)}²${plus(k)} adalah …`, `A parabola with vertex ${pt(h, k)} passes through ${pt(x0, y0)}. Find a in y = a${h === 0 ? 'x' : xm(h)}²${plus(k)}.`),
        D(a),
        WR(D(a), [
          [(y0 - k) / (x0 - h), L(lang, `(x − h) harus dikuadratkan: (${mi(x0 - h)})² = ${(x0 - h) ** 2}.`, `(x − h) must be squared: (${mi(x0 - h)})² = ${(x0 - h) ** 2}.`)],
          [(y0 + k) / (x0 - h) ** 2, L(lang, `Pindahkan ${mi(k)} ke ruas kiri dengan tanda berlawanan.`, `Move ${mi(k)} to the other side with the opposite sign.`)],
          [-a, L(lang, 'Perhatikan tanda.', 'Watch the sign.')],
        ]),
        [`${mi(y0)} = a × (${mi(x0 - h)})²${plus(k)}`, `${mi(y0 - k)} = ${(x0 - h) ** 2 === 1 ? '' : (x0 - h) ** 2}a → a = ${mi(a)}`],
        { kind, h, k, x0, y0 },
      );
    }
    const p = nz(rnd, -4, 4);
    let q;
    do q = nz(rnd, -4, 5);
    while (q === p || q === -p);
    const aa = pick(rnd, [1, 1, -1]);
    const f = (A, s, c) => `y = ${pc([A, s, c])}`;
    const okT = f(aa, -aa * (p + q), aa * p * q);
    return OPT(
      L(lang, `Fungsi kuadrat yang grafiknya memotong sumbu x di ${mi(p)} dan ${mi(q)} serta melalui ${pt(0, aa * p * q)} adalah …`, `The quadratic whose graph cuts the x-axis at ${mi(p)} and ${mi(q)} and passes through ${pt(0, aa * p * q)} is …`),
      okT,
      [
        [f(aa, aa * (p + q), aa * p * q), L(lang, `Akar ${mi(p)} memberi faktor ${xm(p)}. Tanda di faktor berlawanan dengan akarnya.`, `Root ${mi(p)} gives factor ${xm(p)}. The sign in the factor is opposite to the root.`)],
        [f(-aa, aa * (p + q), -aa * p * q), L(lang, `Cek titik potong sumbu y: harus ${mi(aa * p * q)}.`, `Check the y-intercept: it must be ${mi(aa * p * q)}.`)],
        [f(aa, 0, aa * p * q), L(lang, 'Suku x hilang. Jabarkan (x − p)(x − q) dengan lengkap.', 'The x-term is missing. Expand (x − p)(x − q) fully.')],
        [f(-aa, aa * (p + q), aa * p * q), L(lang, 'Koefisien x² tidak cocok dengan titik (0, c).', 'The x² coefficient does not fit the point (0, c).')],
      ],
      [`y = a${xm(p)}${xm(q)}`, L(lang, `x = 0: a × ${mi(-p)} × ${mi(-q)} = ${mi(aa * p * q)} → a = ${mi(aa)}`, `x = 0: a × ${mi(-p)} × ${mi(-q)} = ${mi(aa * p * q)} → a = ${mi(aa)}`), okT],
      { kind, p, q, c: aa * p * q },
    );
  },
  (m) => {
    if (m.kind === 'roots') return D(m.y0 / ((m.x0 - m.p) * (m.x0 - m.q)));
    if (m.kind === 'vertex') return D((m.y0 - m.k) / Math.pow(m.x0 - m.h, 2));
    const a = m.c / (m.p * m.q);
    return `y = ${pc([a, -a * (m.p + m.q), m.c])}`;
  },
);

const quadMax = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['sum', 'rect', 'fence', 'ball', 'rev']);
    if (kind === 'sum') {
      const S = ri(rnd, 4, 25) * 2;
      return NUM(
        L(lang, `Dua bilangan jumlahnya ${S}. Hasil kali terbesar kedua bilangan itu adalah …`, `Two numbers add up to ${S}. The greatest possible product is …`),
        D((S * S) / 4),
        WR(D((S * S) / 4), [
          [S / 2, L(lang, `${S / 2} adalah masing-masing bilangannya. Yang ditanya hasil kalinya.`, `${S / 2} is each number. The question asks for the product.`)],
          [(S * S) / 2, L(lang, 'Hasil kalinya (S/2)², bukan S²/2.', 'The product is (S/2)², not S²/2.')],
        ]),
        [`P = x(${S} − x) = −x² + ${S}x`, L(lang, `Puncak di x = ${S / 2}, P = ${S / 2} × ${S / 2} = ${(S * S) / 4}`, `Peak at x = ${S / 2}, P = ${S / 2} × ${S / 2} = ${(S * S) / 4}`)],
        { kind, v: S },
      );
    }
    if (kind === 'rect') {
      const K = ri(rnd, 3, 15) * 4;
      return NUM(
        L(lang, `Persegi panjang dengan keliling ${K} cm memiliki luas terbesar … cm²`, `A rectangle with perimeter ${K} cm has a largest possible area of … cm²`),
        D((K / 4) ** 2),
        WR(D((K / 4) ** 2), [
          [(K / 2) ** 2, L(lang, 'Panjang + lebar = setengah keliling.', 'Length + width = half the perimeter.')],
          [K / 4, L(lang, 'Itu panjang sisinya. Yang ditanya luasnya.', 'That is the side length. The question asks for the area.')],
        ]),
        [L(lang, `p + l = ${K / 2}, L = p(${K / 2} − p)`, `l + w = ${K / 2}, A = l(${K / 2} − l)`), L(lang, `Maksimum saat p = ${K / 4}: L = ${(K / 4) ** 2}`, `Maximum when l = ${K / 4}: A = ${(K / 4) ** 2}`)],
        { kind, v: K },
      );
    }
    if (kind === 'fence') {
      const Pf = ri(rnd, 5, 25) * 4;
      return NUM(
        L(lang, `Pagar ${Pf} m dipakai untuk tiga sisi kandang persegi panjang (sisi keempat tembok). Luas terbesar kandang adalah … m²`, `${Pf} m of fencing is used for three sides of a rectangular pen (a wall is the fourth side). The largest area is … m²`),
        D((Pf * Pf) / 8),
        WR(D((Pf * Pf) / 8), [
          [(Pf * Pf) / 16, L(lang, 'Pagarnya hanya tiga sisi, bukan empat.', 'The fence covers three sides, not four.')],
          [Pf / 4, L(lang, `${Pf / 4} m adalah lebar terbaiknya. Yang ditanya luasnya.`, `${Pf / 4} m is the best width. The question asks for the area.`)],
        ]),
        [L(lang, `Lebar x, panjang ${Pf} − 2x. L = x(${Pf} − 2x)`, `Width x, length ${Pf} − 2x. A = x(${Pf} − 2x)`), L(lang, `Puncak x = ${Pf / 4}: L = ${Pf / 4} × ${Pf / 2} = ${(Pf * Pf) / 8}`, `Peak at x = ${Pf / 4}: A = ${Pf / 4} × ${Pf / 2} = ${(Pf * Pf) / 8}`)],
        { kind, v: Pf },
      );
    }
    if (kind === 'ball') {
      const v = ri(rnd, 2, 6) * 10;
      return NUM(
        L(lang, `Tinggi bola h(t) = ${v}t − 5t² meter. Tinggi maksimum bola adalah … m`, `A ball's height is h(t) = ${v}t − 5t² metres. Its maximum height is … m`),
        D((v * v) / 20),
        WR(D((v * v) / 20), [
          [v / 10, L(lang, `${v / 10} adalah waktunya (detik). Masukkan ke h(t).`, `${v / 10} is the time (seconds). Substitute it into h(t).`)],
          [(v * v) / 10, L(lang, 'Jangan lupa suku −5t².', 'Do not forget the −5t² term.')],
        ]),
        [`t = ${v} ÷ (2 × 5) = ${v / 10}`, `h = ${v} × ${v / 10} − 5 × ${(v / 10) ** 2} = ${(v * v) / 20}`],
        { kind, v },
      );
    }
    const c = ri(rnd, 3, 15) * 20;
    return NUM(
      L(lang, `Pendapatan toko R = x(${c} − x) ribu rupiah, dengan x banyak barang terjual. Pendapatan terbesar adalah … ribu rupiah`, `A shop's revenue is R = x(${c} − x) thousand rupiah, where x is the number of items sold. The greatest revenue is … thousand rupiah`),
      D((c * c) / 4),
      WR(D((c * c) / 4), [
        [c / 2, L(lang, `${c / 2} adalah banyak barangnya. Hitung pendapatannya.`, `${c / 2} is the number of items. Work out the revenue.`)],
        [c * c, L(lang, `Pendapatan maksimum di x = ${c / 2}, bukan x = ${c}.`, `The maximum is at x = ${c / 2}, not x = ${c}.`)],
      ]),
      [L(lang, `Puncak di x = ${c / 2}`, `Peak at x = ${c / 2}`), `R = ${c / 2} × ${c / 2} = ${(c * c) / 4}`],
      { kind, v: c },
    );
  },
  (m) => {
    const f = { sum: (x) => x * (m.v - x), rect: (x) => x * (m.v / 2 - x), fence: (x) => x * (m.v - 2 * x), ball: (t) => m.v * t - 5 * t * t, rev: (x) => x * (m.v - x) }[m.kind];
    let best = -Infinity;
    for (let x = 0; x <= m.v; x += 0.25) best = Math.max(best, f(x));
    return D(best);
  },
);

// ================= Bab 7: Statistika =================
const classInfo = G(
  (rnd, lang) => {
    const p = pick(rnd, [5, 10, 10, 4, 6]);
    const lo = ri(rnd, 2, 15) * p + 1;
    const hi = lo + p - 1;
    const kind = pick(rnd, ['len', 'mid', 'tb', 'ta']);
    const val = { len: p, mid: (lo + hi) / 2, tb: lo - 0.5, ta: hi + 0.5 }[kind];
    const name = { len: L(lang, 'Panjang kelas', 'The class width'), mid: L(lang, 'Titik tengah kelas', 'The midpoint of class'), tb: L(lang, 'Tepi bawah kelas', 'The lower boundary of class'), ta: L(lang, 'Tepi atas kelas', 'The upper boundary of class') }[kind];
    return NUM(
      kind === 'len' ? L(lang, `Panjang kelas interval ${lo}–${hi} adalah …`, `The width of the class interval ${lo}–${hi} is …`) : L(lang, `${name} ${lo}–${hi} adalah … (boleh pakai koma)`, `${name} ${lo}–${hi} is … (decimals allowed)`),
      D(val),
      WR(D(val), [
        [kind === 'len' ? hi - lo : null, L(lang, `Panjang kelas = tepi atas − tepi bawah = ${M(lang, hi + 0.5)} − ${M(lang, lo - 0.5)}, bukan ${hi} − ${lo}.`, `Width = upper boundary − lower boundary = ${M(lang, hi + 0.5)} − ${M(lang, lo - 0.5)}, not ${hi} − ${lo}.`)],
        [kind === 'tb' ? lo : kind === 'ta' ? hi : null, L(lang, 'Tepi kelas berselisih 0,5 dari batas kelas.', 'A class boundary is 0.5 away from the class limit.')],
        [kind === 'tb' ? lo + 0.5 : kind === 'ta' ? hi - 0.5 : null, L(lang, `Tepi ${kind === 'tb' ? 'bawah = batas bawah − 0,5' : 'atas = batas atas + 0,5'}.`, `The ${kind === 'tb' ? 'lower boundary = lower limit − 0.5' : 'upper boundary = upper limit + 0.5'}.`)],
        [kind === 'mid' ? (lo + hi + 1) / 2 : null, L(lang, `Titik tengah = (${lo} + ${hi}) ÷ 2.`, `Midpoint = (${lo} + ${hi}) ÷ 2.`)],
      ]),
      [
        { len: L(lang, `Tepi bawah ${M(lang, lo - 0.5)}, tepi atas ${M(lang, hi + 0.5)}`, `Lower boundary ${M(lang, lo - 0.5)}, upper boundary ${M(lang, hi + 0.5)}`), mid: `(${lo} + ${hi}) ÷ 2`, tb: `${lo} − ${M(lang, 0.5)}`, ta: `${hi} + ${M(lang, 0.5)}` }[kind],
        `= ${M(lang, val)}`,
      ],
      { kind, lo, hi },
    );
  },
  (m) => {
    const tb = m.lo - 0.5;
    const ta = m.hi + 0.5;
    return D({ len: ta - tb, mid: (tb + ta) / 2, tb, ta }[m.kind]);
  },
);

const histTotal = G(
  (rnd, lang) => {
    const T = pick(rnd, [20, 25, 40, 50]);
    const pct = pick(rnd, T === 25 ? [8, 12, 16, 20, 24, 28] : T === 20 ? [10, 15, 20, 25, 30] : T === 40 ? [10, 15, 20, 25, 30] : [10, 12, 14, 16, 20, 24, 30]);
    const top = (pct * T) / 100;
    const rest = T - top;
    const fs = [];
    let left = rest;
    for (let i = 0; i < 3; i++) {
      const v = ri(rnd, 1, Math.max(1, Math.floor(left / (4 - i)) * 2 - 1));
      fs.push(Math.min(v, left - (3 - i)));
      left -= fs[i];
    }
    fs.push(left);
    const freq = [...fs, top];
    if (rnd() < 0.5)
      return NUM(
        L(lang, `Histogram nilai ujian memiliki frekuensi ${freq.join(', ')} untuk lima kelas berurutan. Banyak siswa seluruhnya adalah …`, `A histogram of test scores has frequencies ${freq.join(', ')} for five consecutive classes. How many students are there?`),
        D(T),
        WR(D(T), [
          [5, L(lang, 'Itu banyak kelasnya. Jumlahkan frekuensinya.', 'That is the number of classes. Add the frequencies.')],
          [T - top, L(lang, 'Ada kelas yang belum dijumlahkan.', 'One class was not added.')],
        ]),
        [`${freq.join(' + ')} = ${T}`],
        { kind: 'n', freq },
      );
    return NUM(
      L(lang, `Frekuensi lima kelas berurutan adalah ${freq.join(', ')}. Persentase data di kelas tertinggi (kelas terakhir) adalah … %`, `Five consecutive classes have frequencies ${freq.join(', ')}. What percentage of the data is in the top (last) class? … %`),
      D(pct),
      WR(D(pct), [
        [top, L(lang, 'Itu frekuensinya. Ubah ke persen: frekuensi ÷ total × 100.', 'That is the frequency. Convert to percent: frequency ÷ total × 100.')],
        [(top / 5) * 100, L(lang, 'Bagi dengan banyak data, bukan banyak kelas.', 'Divide by the number of data values, not the number of classes.')],
      ]),
      [L(lang, `Total = ${T}`, `Total = ${T}`), `${top} ÷ ${T} × 100% = ${pct}%`],
      { kind: 'pct', freq },
    );
  },
  (m) => {
    const T = m.freq.reduce((a, b) => a + b, 0);
    return D(m.kind === 'n' ? T : (m.freq[m.freq.length - 1] / T) * 100);
  },
);

const groupedMean = G(
  (rnd, lang) => {
    const p = pick(rnd, [5, 10]);
    const start = p === 5 ? ri(rnd, 0, 8) * 5 + 1 : ri(rnd, 3, 6) * 10 + 1;
    const k = pick(rnd, [3, 4]);
    let f, sum, n;
    do {
      f = Array.from({ length: k }, () => ri(rnd, 1, 8));
      n = f.reduce((a, b) => a + b, 0);
      sum = f.reduce((a, fi, i) => a + fi * (start + i * p + (p - 1) / 2), 0);
    } while (Math.round((sum / n) * 100) !== (sum / n) * 100 || !Number.isInteger(Math.round(sum * 2) / 2));
    const mids = f.map((_, i) => start + i * p + (p - 1) / 2);
    const mean = sum / n;
    const cls = f.map((fi, i) => `${start + i * p}–${start + i * p + p - 1} (${fi})`).join(', ');
    return NUM(
      L(lang, `Data berkelompok (kelas dan frekuensinya): ${cls}. Rata-ratanya adalah … (boleh pakai koma)`, `Grouped data (class and frequency): ${cls}. The mean is … (decimals allowed)`),
      D(mean),
      WR(D(mean), [
        [mids.reduce((a, b) => a + b, 0) / k, L(lang, 'Setiap titik tengah harus dikali frekuensinya dulu.', 'Each midpoint must be multiplied by its frequency first.')],
        [sum / k, L(lang, `Bagi dengan total frekuensi ${n}, bukan banyak kelas.`, `Divide by the total frequency ${n}, not the number of classes.`)],
        [f.reduce((a, fi, i) => a + fi * (start + i * p), 0) / n, L(lang, 'Pakai titik tengah kelas, bukan batas bawahnya.', 'Use the class midpoints, not the lower limits.')],
      ]),
      [L(lang, `Titik tengah: ${mids.map((x) => M(lang, x)).join(', ')}`, `Midpoints: ${mids.map((x) => M(lang, x)).join(', ')}`), `Σfx = ${M(lang, sum)}, Σf = ${n}`, `x̄ = ${M(lang, sum)} ÷ ${n} = ${M(lang, mean)}`],
      { start, p, f },
    );
  },
  (m) => {
    let s = 0;
    let n = 0;
    m.f.forEach((fi, i) => {
      const lo = m.start + i * m.p;
      s += (fi * (lo + lo + m.p - 1)) / 2;
      n += fi;
    });
    return D(s / n);
  },
);

const groupedMedMode = G(
  (rnd, lang) => {
    const p = pick(rnd, [5, 10]);
    const Tb = ri(rnd, 3, 8) * 10 - 0.5;
    if (rnd() < 0.5) {
      let f, n, fk;
      do {
        f = ri(rnd, 4, 15);
        n = ri(rnd, 10, 30) * 2;
        fk = ri(rnd, Math.max(0, n / 2 - f + 1), n / 2 - 1);
      } while (fk < 0 || ((n / 2 - fk) * p * 2) % f !== 0);
      const me = Tb + ((n / 2 - fk) / f) * p;
      return NUM(
        L(lang, `Kelas median memiliki Tb = ${M(lang, Tb)}, p = ${p}, f = ${f}. Jika n = ${n} dan fk = ${fk}, median data adalah … (boleh pakai koma)`, `The median class has lower boundary Tb = ${M(lang, Tb)}, p = ${p}, f = ${f}. If n = ${n} and fk = ${fk}, the median is … (decimals allowed)`),
        D(me),
        WR(D(me), [
          [Tb + (n / 2 / f) * p, L(lang, 'Kurangi dulu n/2 dengan frekuensi kumulatif fk.', 'Subtract the cumulative frequency fk from n/2 first.')],
          [Tb + ((n - fk) / f) * p, L(lang, 'Letak median adalah n/2, bukan n.', 'The median position is n/2, not n.')],
          [Tb + 0.5 + ((n / 2 - fk) / f) * p, L(lang, 'Pakai tepi bawah Tb, bukan batas bawah kelas.', 'Use the lower boundary Tb, not the class limit.')],
        ]),
        [`Me = Tb + ((n/2 − fk) ÷ f) × p`, `= ${M(lang, Tb)} + ((${n / 2} − ${fk}) ÷ ${f}) × ${p} = ${M(lang, me)}`],
        { kind: 'med', Tb, p, f, n, fk },
      );
    }
    let d1, d2;
    do {
      d1 = ri(rnd, 1, 9);
      d2 = ri(rnd, 1, 9);
    } while (((d1 * p * 2) % (d1 + d2)) !== 0 || d1 === d2);
    const mo = Tb + (d1 / (d1 + d2)) * p;
    return NUM(
      L(lang, `Kelas modus memiliki tepi bawah ${M(lang, Tb)} dan panjang kelas ${p}. Selisih frekuensinya dengan kelas sebelum ${d1} dan dengan kelas sesudah ${d2}. Modusnya adalah … (boleh pakai koma)`, `The modal class has lower boundary ${M(lang, Tb)} and width ${p}. Its frequency exceeds the class before by ${d1} and the class after by ${d2}. The mode is … (decimals allowed)`),
      D(mo),
      WR(D(mo), [
        [Tb + (d2 / (d1 + d2)) * p, L(lang, 'Pembilangnya d₁ (selisih dengan kelas sebelum), bukan d₂.', 'The numerator is d₁ (difference with the class before), not d₂.')],
        [Tb + (d1 / d2) * p, L(lang, 'Penyebutnya d₁ + d₂.', 'The denominator is d₁ + d₂.')],
      ]),
      [`Mo = Tb + (d₁ ÷ (d₁ + d₂)) × p`, `= ${M(lang, Tb)} + (${d1} ÷ ${d1 + d2}) × ${p} = ${M(lang, mo)}`],
      { kind: 'mo', Tb, p, d1, d2 },
    );
  },
  (m) => {
    if (m.kind === 'mo') return D(m.Tb + (m.p * m.d1) / (m.d1 + m.d2));
    return D(m.Tb + (m.p * (m.n / 2 - m.fk)) / m.f);
  },
);

const medianClass = G(
  (rnd, lang) => {
    let f, n, cls;
    do {
      f = Array.from({ length: 5 }, () => ri(rnd, 2, 14));
      n = f.reduce((a, b) => a + b, 0);
      let c = 0;
      cls = f.findIndex((fi) => (c += fi) >= n / 2) + 1;
    } while (n % 2 || f.indexOf(Math.max(...f)) + 1 === cls);
    const modeCls = f.indexOf(Math.max(...f)) + 1;
    return NUM(
      L(lang, `Frekuensi lima kelas berurutan adalah ${f.join(', ')} (jumlah ${n}). Median ada di kelas ke- …`, `Five consecutive classes have frequencies ${f.join(', ')} (total ${n}). The median is in class number …`),
      D(cls),
      WR(D(cls), [
        [modeCls, L(lang, 'Itu kelas dengan frekuensi terbesar (kelas modus).', 'That is the class with the largest frequency (the modal class).')],
        [3, L(lang, 'Kelas median bukan selalu kelas yang di tengah. Pakai frekuensi kumulatif.', 'The median class is not always the middle class. Use cumulative frequency.')],
      ]),
      [L(lang, `Data ke-${n / 2} adalah letak median.`, `The median is at position ${n / 2}.`), L(lang, `Frekuensi kumulatif: ${f.map((_, i) => f.slice(0, i + 1).reduce((a, b) => a + b, 0)).join(', ')}`, `Cumulative frequency: ${f.map((_, i) => f.slice(0, i + 1).reduce((a, b) => a + b, 0)).join(', ')}`), L(lang, `Kumulatif pertama yang mencapai ${n / 2} ada di kelas ke-${cls}.`, `The first cumulative total to reach ${n / 2} is in class ${cls}.`)],
      { f },
    );
  },
  (m) => {
    const n = m.f.reduce((a, b) => a + b, 0);
    let c = 0;
    for (let i = 0; i < m.f.length; i++) {
      c += m.f[i];
      if (c >= n / 2) return D(i + 1);
    }
  },
);

const spread = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['var', 'sr', 'sd']);
    let xs, mean, v, sr;
    do {
      const n = pick(rnd, [3, 4, 5]);
      const c = ri(rnd, 3, 12);
      xs = Array.from({ length: n }, () => c + ri(rnd, -4, 4));
      mean = xs.reduce((a, b) => a + b, 0) / n;
      v = xs.reduce((a, x) => a + (x - mean) ** 2, 0) / n;
      sr = xs.reduce((a, x) => a + Math.abs(x - mean), 0) / n;
    } while (!Number.isInteger(mean) || v === 0 || (kind === 'sd' ? !Number.isInteger(Math.sqrt(v)) : kind === 'var' ? Math.round(v * 100) !== v * 100 : false));
    const n = xs.length;
    const ss = xs.reduce((a, x) => a + (x - mean) ** 2, 0);
    const sa = xs.reduce((a, x) => a + Math.abs(x - mean), 0);
    const name = { var: L(lang, 'Ragam', 'The variance'), sr: L(lang, 'Simpangan rata-rata', 'The mean deviation'), sd: L(lang, 'Simpangan baku', 'The standard deviation') }[kind];
    const ans = kind === 'var' ? D(v) : kind === 'sd' ? D(Math.sqrt(v)) : F(sa, n);
    return NUM(
      L(lang, `${name} data ${xs.join(', ')} adalah … ${kind === 'sr' ? '(boleh pecahan)' : ''}`.trim(), `${name} of the data ${xs.join(', ')} is … ${kind === 'sr' ? '(fraction allowed)' : ''}`.trim()),
      ans,
      WR(ans, [
        [kind === 'sr' ? sa : ss, L(lang, `Jangan lupa dibagi banyak data (${n}).`, `Remember to divide by the number of values (${n}).`)],
        [kind === 'var' ? Math.sqrt(v) : kind === 'sd' ? v : null, kind === 'var' ? L(lang, 'Itu simpangan baku. Ragam adalah kuadratnya.', 'That is the standard deviation. The variance is its square.') : L(lang, 'Itu ragam. Simpangan baku adalah akar ragam.', 'That is the variance. The standard deviation is its square root.')],
        [kind !== 'sr' ? ss / (n - 1) : null, L(lang, `Bagi dengan n = ${n}, bukan n − 1.`, `Divide by n = ${n}, not n − 1.`)],
        [kind === 'sr' ? 0 : null, L(lang, 'Simpangan dijumlah dalam nilai mutlak, jadi tidak saling meniadakan.', 'Deviations are added as absolute values, so they do not cancel out.')],
      ]),
      [L(lang, `Rata-rata = ${mean}`, `Mean = ${mean}`), kind === 'sr' ? `Σ|x − x̄| = ${sa}` : `Σ(x − x̄)² = ${ss}`, kind === 'sr' ? `SR = ${sa}/${n} = ${F(sa, n)}` : kind === 'var' ? `${L(lang, 'Ragam', 'Variance')} = ${ss} ÷ ${n} = ${M(lang, v)}` : `${L(lang, 'Ragam', 'Variance')} = ${ss} ÷ ${n} = ${M(lang, v)}, SB = √${M(lang, v)} = ${M(lang, Math.sqrt(v))}`],
      { kind, xs },
    );
  },
  (m) => {
    const n = m.xs.length;
    const mean = m.xs.reduce((a, b) => a + b, 0) / n;
    if (m.kind === 'sr') return F(m.xs.reduce((a, x) => a + Math.abs(x - mean), 0), n);
    const v = m.xs.reduce((a, x) => a + (x - mean) * (x - mean), 0) / n;
    return D(m.kind === 'var' ? v : Math.sqrt(v));
  },
);

const spreadCompare = G(
  (rnd, lang) => {
    const names = pick(rnd, [
      ['A', 'B'],
      ['P', 'Q'],
      ['X', 'Y'],
    ]);
    let s1, s2;
    do {
      s1 = ri(rnd, 5, 60) / 10;
      s2 = ri(rnd, 5, 60) / 10;
    } while (Math.abs(s1 - s2) < 0.8);
    const kind = rnd() < 0.5 ? 'sd' : 'var';
    const v1 = kind === 'sd' ? s1 : s1 * s1;
    const v2 = kind === 'sd' ? s2 : s2 * s2;
    const lo = v1 < v2 ? names[0] : names[1];
    const hi = v1 < v2 ? names[1] : names[0];
    const okT = L(lang, `data ${lo} lebih konsisten daripada ${hi}`, `data ${lo} is more consistent than ${hi}`);
    const lbl = kind === 'sd' ? L(lang, 'simpangan baku', 'standard deviation') : L(lang, 'ragam', 'variance');
    return OPT(
      L(lang, `Dua kelompok punya rata-rata sama. ${lbl[0].toUpperCase() + lbl.slice(1)} kelompok ${names[0]} = ${M(lang, Math.round(v1 * 100) / 100)} dan ${names[1]} = ${M(lang, Math.round(v2 * 100) / 100)}. Pernyataan yang benar adalah …`, `Two groups have the same mean. The ${lbl} of group ${names[0]} is ${M(lang, Math.round(v1 * 100) / 100)} and of ${names[1]} is ${M(lang, Math.round(v2 * 100) / 100)}. Which statement is true?`),
      okT,
      [
        [L(lang, `data ${hi} lebih konsisten daripada ${lo}`, `data ${hi} is more consistent than ${lo}`), L(lang, `${lbl[0].toUpperCase() + lbl.slice(1)} yang lebih besar berarti data lebih menyebar.`, `A larger ${lbl} means the data is more spread out.`)],
        [L(lang, `nilai ${hi} lebih tinggi daripada ${lo}`, `${hi} has higher values than ${lo}`), L(lang, `${lbl[0].toUpperCase() + lbl.slice(1)} mengukur sebaran, bukan besar nilai. Rata-ratanya sama.`, `The ${lbl} measures spread, not size. The means are equal.`)],
        [L(lang, `${names[0]} dan ${names[1]} sama sebarannya`, `${names[0]} and ${names[1]} are equally spread`), L(lang, `${lbl[0].toUpperCase() + lbl.slice(1)}nya berbeda, jadi sebarannya berbeda.`, `The ${lbl}s differ, so the spreads differ.`)],
      ],
      [L(lang, `Makin kecil ${lbl}, makin rapat data di sekitar rata-rata.`, `The smaller the ${lbl}, the tighter the data around the mean.`), okT],
      { names, v1, v2 },
    );
  },
  (m, lang) => {
    const [a, b] = m.v1 < m.v2 ? m.names : [m.names[1], m.names[0]];
    return L(lang, `data ${a} lebih konsisten daripada ${b}`, `data ${a} is more consistent than ${b}`);
  },
);

// ================= Bab 8: Peluang =================
const countRule = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['outfit', 'route', 'coins']);
    if (kind === 'outfit') {
      const a = ri(rnd, 2, 6);
      const b = ri(rnd, 2, 5);
      const c = ri(rnd, 2, 4);
      const nm = pick(rnd, ['Dito', 'Rina', 'Sari', 'Bayu', 'Nadia']);
      return NUM(
        L(lang, `${nm} punya ${a} kemeja, ${b} celana, dan ${c} pasang sepatu. Banyak cara ${nm} berpakaian adalah …`, `${nm} has ${a} shirts, ${b} pairs of trousers and ${c} pairs of shoes. How many different outfits are possible?`),
        D(a * b * c),
        WR(D(a * b * c), [[a + b + c, L(lang, 'Setiap pilihan dipasangkan dengan semua pilihan lain, jadi dikalikan.', 'Each choice pairs with every other choice, so multiply.')], [a * b, L(lang, 'Sepatu juga dipilih.', 'Shoes are chosen too.')]]),
        [L(lang, 'Aturan perkalian:', 'Multiplication rule:'), `${a} × ${b} × ${c} = ${a * b * c}`],
        { kind, xs: [a, b, c] },
      );
    }
    if (kind === 'route') {
      const a = ri(rnd, 2, 5);
      const b = ri(rnd, 2, 5);
      const back = rnd() < 0.3;
      return NUM(
        back
          ? L(lang, `Dari kota A ke B ada ${a} jalan, dan dari B ke C ada ${b} jalan. Banyak rute pergi-pulang A → C → A (lewat B) jika jalan pulang tidak boleh sama dengan jalan pergi adalah …`, `There are ${a} roads from A to B and ${b} roads from B to C. How many round trips A → C → A (through B) are there if no road is used twice?`)
          : L(lang, `Dari kota A ke B ada ${a} jalan, dan dari B ke C ada ${b} jalan. Banyak rute dari A ke C melalui B adalah …`, `There are ${a} roads from A to B and ${b} roads from B to C. How many routes go from A to C through B?`),
        D(back ? a * b * (a - 1) * (b - 1) : a * b),
        WR(D(back ? a * b * (a - 1) * (b - 1) : a * b), [
          [a + b, L(lang, 'Rute tersusun dari dua tahap, jadi banyak pilihannya dikalikan.', 'A route has two stages, so multiply the choices.')],
          [back ? (a * b) ** 2 : null, L(lang, 'Jalan pulang tidak boleh sama, jadi pilihannya berkurang satu.', 'The return roads must differ, so there is one fewer choice each.')],
        ]),
        back ? [L(lang, `Pergi: ${a} × ${b}. Pulang: ${b - 1} × ${a - 1}.`, `Going: ${a} × ${b}. Returning: ${b - 1} × ${a - 1}.`), `${a * b} × ${(a - 1) * (b - 1)} = ${a * b * (a - 1) * (b - 1)}`] : [`${a} × ${b} = ${a * b}`],
        { kind, xs: back ? [a, b, b - 1, a - 1] : [a, b] },
      );
    }
    const c = ri(rnd, 1, 4);
    const d = ri(rnd, 0, 2);
    const tot = 2 ** c * 6 ** d;
    const what = d ? L(lang, `${c} koin dan ${d} dadu`, `${c} coin${c > 1 ? 's' : ''} and ${d} dice`) : L(lang, `${c} koin`, `${c} coins`);
    return NUM(
      L(lang, `${what[0].toUpperCase() + what.slice(1)} dilempar bersamaan. Banyak anggota ruang sampelnya adalah …`, `${what[0].toUpperCase() + what.slice(1)} are tossed together. How many outcomes are in the sample space?`),
      D(tot),
      WR(D(tot), [
        [2 * c + 6 * d, L(lang, 'Hasil setiap benda dipasangkan, jadi dikalikan, bukan dijumlah.', 'Outcomes are paired, so multiply, do not add.')],
        [c > 1 ? 2 * c * (d ? 6 ** d : 1) : null, L(lang, `Setiap koin punya 2 hasil: 2${sup(c)}, bukan 2 × ${c}.`, `Each coin has 2 outcomes: 2${sup(c)}, not 2 × ${c}.`)],
        [c + 1, L(lang, 'Itu banyak kemungkinan jumlah angka, bukan banyak titik sampel.', 'That counts the possible number of heads, not the outcomes.')],
      ]),
      [`${[...Array(c).fill('2'), ...Array(d).fill('6')].join(' × ')} = ${tot}`],
      { kind, xs: [...Array(c).fill(2), ...Array(d).fill(6)] },
    );
  },
  (m) => D(m.xs.reduce((a, b) => a * b, 1)),
);

const digits = G(
  (rnd, lang) => {
    const k = ri(rnd, 4, 7);
    const r = ri(rnd, 2, 3);
    const rep = rnd() < 0.5;
    const ds = Array.from({ length: k }, (_, i) => i + 1).join(', ');
    const ans = rep ? k ** r : P(k, r);
    return NUM(
      L(lang, `Banyak bilangan ${r} angka ${rep ? '' : 'berbeda '}yang dapat disusun dari angka ${ds}${rep ? ' jika angka boleh berulang' : ''} adalah …`, `How many ${r}-digit numbers ${rep ? '' : 'with different digits '}can be made from the digits ${ds}${rep ? ' if digits may repeat' : ''}?`),
      D(ans),
      WR(D(ans), [
        [rep ? P(k, r) : k ** r, rep ? L(lang, 'Angka boleh berulang, jadi setiap tempat punya pilihan yang sama banyak.', 'Digits may repeat, so every place has the same number of choices.') : L(lang, 'Angkanya harus berbeda, jadi pilihan berkurang satu di setiap tempat.', 'Digits must differ, so each place has one fewer choice.')],
        [k * r, L(lang, 'Banyak pilihan setiap tempat dikalikan, bukan k × r.', 'Multiply the choices for each place, not k × r.')],
      ]),
      [rep ? `${Array(r).fill(k).join(' × ')} = ${ans}` : `${Array.from({ length: r }, (_, i) => k - i).join(' × ')} = ${ans}`],
      { k, r, rep },
    );
  },
  (m) => {
    let c = 0;
    const go = (depth, used) => {
      if (depth === m.r) return void c++;
      for (let d = 1; d <= m.k; d++) if (m.rep || !used.includes(d)) go(depth + 1, [...used, d]);
    };
    go(0, []);
    return D(c);
  },
);

const DIE_EV = [
  ['ganjil', 'odd', (x) => x % 2 === 1],
  ['genap', 'even', (x) => x % 2 === 0],
  ['prima', 'prime', (x) => [2, 3, 5].includes(x)],
  ['kurang dari 3', 'less than 3', (x) => x < 3],
  ['lebih dari 4', 'greater than 4', (x) => x > 4],
  ['lebih dari 3', 'greater than 3', (x) => x > 3],
  ['kelipatan 3', 'a multiple of 3', (x) => x % 3 === 0],
  ['faktor dari 6', 'a factor of 6', (x) => 6 % x === 0],
];
const dieN = (f) => [1, 2, 3, 4, 5, 6].filter(f).length;
const unionDie = G(
  (rnd, lang) => {
    let i, j;
    do {
      i = ri(rnd, 0, DIE_EV.length - 1);
      j = ri(rnd, 0, DIE_EV.length - 1);
    } while (i === j);
    const [A, B] = [DIE_EV[i], DIE_EV[j]];
    const nA = dieN(A[2]);
    const nB = dieN(B[2]);
    const nAB = dieN((x) => A[2](x) && B[2](x));
    const ans = F(nA + nB - nAB, 6);
    return NUM(
      L(lang, `Satu dadu dilempar. Peluang muncul angka ${A[0]} atau angka ${B[0]} adalah … (tulis sebagai pecahan)`, `A die is rolled. The probability of a number that is ${A[1]} or ${B[1]} is … (write a fraction)`),
      ans,
      WR(ans, [
        [nAB ? F(nA + nB, 6) : null, L(lang, `Ada ${nAB} angka yang terhitung dua kali (irisan). Kurangi sekali.`, `${nAB} number(s) were counted twice (the overlap). Subtract once.`)],
        [nAB ? F(nAB, 6) : null, L(lang, '"Atau" berarti gabungan, bukan irisan.', '"Or" means the union, not the overlap.')],
        [F(nA * nB, 36), L(lang, 'Untuk "atau", banyak anggota gabungan dihitung lalu dibagi 6. Peluangnya tidak dikalikan.', 'For "or", count the members of the union and divide by 6. Do not multiply the probabilities.')],
      ]),
      [`A = {${[1, 2, 3, 4, 5, 6].filter(A[2]).join(', ')}}, B = {${[1, 2, 3, 4, 5, 6].filter(B[2]).join(', ')}}`, `A ∪ B ${L(lang, 'punya', 'has')} ${nA + nB - nAB} ${L(lang, 'anggota', 'members')}`, `P = ${nA + nB - nAB}/6${gcd(nA + nB - nAB, 6) > 1 ? ` = ${ans}` : ''}`],
      { i, j },
    );
  },
  (m) => {
    const s = [1, 2, 3, 4, 5, 6].filter((x) => DIE_EV[m.i][2](x) || DIE_EV[m.j][2](x));
    return F(s.length, 6);
  },
);

const unionNum = G(
  (rnd, lang) => {
    if (rnd() < 0.5) {
      let a, b, c;
      do {
        a = ri(rnd, 1, 8) / 10;
        b = ri(rnd, 1, 8) / 10;
        c = ri(rnd, 0, Math.min(a, b) * 10 - 1) / 10;
      } while (a + b - c > 1 || c < 0);
      const u = a + b - c;
      return NUM(
        L(lang, `Jika P(A) = ${M(lang, a)}, P(B) = ${M(lang, b)}, dan P(A ∩ B) = ${M(lang, c)}, maka P(A ∪ B) = …`, `If P(A) = ${M(lang, a)}, P(B) = ${M(lang, b)} and P(A ∩ B) = ${M(lang, c)}, then P(A ∪ B) = …`),
        D(u),
        WR(D(u), [
          [c > 0 ? a + b : null, L(lang, 'Irisannya terhitung dua kali, jadi dikurangi.', 'The overlap was counted twice, so subtract it.')],
          [a + b - 2 * c, L(lang, 'Irisan dikurangi sekali saja.', 'Subtract the overlap only once.')],
          [a * b, L(lang, 'Gabungan memakai penjumlahan, bukan perkalian.', 'A union uses addition, not multiplication.')],
        ]),
        ['P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', `= ${M(lang, a)} + ${M(lang, b)} − ${M(lang, c)} = ${M(lang, u)}`],
        { kind: 'p', a, b, c },
      );
    }
    const n = pick(rnd, [30, 36, 40, 32, 24]);
    let a, b, c;
    do {
      a = ri(rnd, 5, n - 5);
      b = ri(rnd, 5, n - 5);
      c = ri(rnd, 1, Math.min(a, b) - 1);
    } while (a + b - c > n);
    const [s1, s2, e1, e2] = pick(rnd, [
      ['basket', 'voli', 'basketball', 'volleyball'],
      ['membaca', 'menggambar', 'reading', 'drawing'],
      ['matematika', 'biologi', 'maths', 'biology'],
    ]);
    const ans = F(a + b - c, n);
    return NUM(
      L(lang, `Di kelas berisi ${n} siswa, ${a} suka ${s1}, ${b} suka ${s2}, dan ${c} suka keduanya. Peluang seorang siswa yang dipilih acak suka ${s1} atau ${s2} adalah … (tulis sebagai pecahan)`, `In a class of ${n} students, ${a} like ${e1}, ${b} like ${e2} and ${c} like both. The probability that a random student likes ${e1} or ${e2} is … (write a fraction)`),
      ans,
      WR(ans, [
        [F(a + b, n), L(lang, `${c} siswa terhitung dua kali. Kurangi sekali.`, `${c} students were counted twice. Subtract them once.`)],
        [F(c, n), L(lang, 'Itu peluang suka keduanya.', 'That is the probability of liking both.')],
        [F(a + b - 2 * c, n), L(lang, 'Itu yang suka tepat satu. "Atau" juga memuat yang suka keduanya.', 'That counts exactly one. "Or" includes those who like both.')],
      ]),
      [`${a} + ${b} − ${c} = ${a + b - c}`, `P = ${a + b - c}/${n}${gcd(a + b - c, n) > 1 ? ` = ${ans}` : ''}`],
      { kind: 'n', a, b, c, n },
    );
  },
  (m) => (m.kind === 'p' ? D(m.a + m.b - m.c) : F(m.a + m.b - m.c, m.n)),
);

const independent = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['dec', 'coin', 'balls']);
    if (kind === 'dec') {
      const a = ri(rnd, 1, 9) / 10;
      const b = ri(rnd, 1, 9) / 10;
      return NUM(
        L(lang, `A dan B saling bebas dengan P(A) = ${M(lang, a)} dan P(B) = ${M(lang, b)}. Nilai P(A ∩ B) adalah …`, `A and B are independent with P(A) = ${M(lang, a)} and P(B) = ${M(lang, b)}. Find P(A ∩ B).`),
        D(a * b),
        WR(D(a * b), [
          [a + b, L(lang, 'Kejadian saling bebas: peluangnya dikalikan.', 'For independent events, multiply the probabilities.')],
          [Math.min(a, b), L(lang, 'Kalikan kedua peluang.', 'Multiply both probabilities.')],
        ]),
        [`P(A ∩ B) = P(A) × P(B)`, `= ${M(lang, a)} × ${M(lang, b)} = ${M(lang, a * b)}`],
        { kind, a, b },
      );
    }
    if (kind === 'coin') {
      const ev = pick(rnd, DIE_EV);
      const side = pick(rnd, [L(lang, 'angka', 'heads'), L(lang, 'gambar', 'tails')]);
      const k = dieN(ev[2]);
      const ans = F(k, 12);
      return NUM(
        L(lang, `Sebuah koin dan sebuah dadu dilempar. Peluang muncul ${side} pada koin dan angka ${ev[0]} pada dadu adalah … (tulis sebagai pecahan)`, `A coin and a die are tossed. The probability of ${side} on the coin and a number that is ${ev[1]} on the die is … (write a fraction)`),
        ans,
        WR(ans, [
          [F(6 + 2 * k, 12), L(lang, 'Kedua kejadian harus terjadi bersama, jadi peluangnya dikalikan, bukan dijumlah.', 'Both must happen, so multiply the probabilities, do not add.')],
          [F(k, 6), L(lang, 'Itu peluang dadu saja. Kalikan dengan ½ untuk koin.', 'That is the die alone. Multiply by ½ for the coin.')],
        ]),
        [`P(${L(lang, 'koin', 'coin')}) = 1/2, P(${L(lang, 'dadu', 'die')}) = ${k}/6`, `1/2 × ${k}/6 = ${k}/12${gcd(k, 12) > 1 ? ` = ${ans}` : ''}`],
        { kind, k },
      );
    }
    const r = ri(rnd, 2, 6);
    const b = ri(rnd, 2, 7);
    const n = r + b;
    const back = rnd() < 0.5;
    const ans = back ? F(r * r, n * n) : F(r * (r - 1), n * (n - 1));
    return NUM(
      L(lang, `Kotak berisi ${r} bola merah dan ${b} bola biru. Diambil dua bola satu per satu ${back ? 'dengan pengembalian' : 'tanpa pengembalian'}. Peluang keduanya merah adalah … (tulis sebagai pecahan)`, `A box has ${r} red and ${b} blue balls. Two balls are drawn one at a time ${back ? 'with replacement' : 'without replacement'}. The probability that both are red is … (write a fraction)`),
      ans,
      WR(ans, [
        [back ? F(r * (r - 1), n * (n - 1)) : F(r * r, n * n), back ? L(lang, 'Bola dikembalikan, jadi peluang pengambilan kedua tetap sama.', 'The ball is put back, so the second draw has the same probability.') : L(lang, 'Bola tidak dikembalikan, jadi pengambilan kedua tinggal ' + (r - 1) + ' merah dari ' + (n - 1) + '.', 'The ball is not replaced, so the second draw has ' + (r - 1) + ' red out of ' + (n - 1) + '.')],
        [F(r, n), L(lang, 'Itu peluang satu pengambilan saja.', 'That is only one draw.')],
        [F(2 * r, n), L(lang, 'Peluang kedua pengambilan dikalikan, bukan dijumlah.', 'Multiply the two probabilities, do not add.')],
      ]),
      [back ? `${r}/${n} × ${r}/${n} = ${r * r}/${n * n}` : `${r}/${n} × ${r - 1}/${n - 1} = ${r * (r - 1)}/${n * (n - 1)}`, L(lang, `Disederhanakan: ${ans}`, `Simplified: ${ans}`)],
      { kind, r, b, back },
    );
  },
  (m) => {
    if (m.kind === 'dec') return D(m.a * m.b);
    if (m.kind === 'coin') return F(m.k, 12);
    // hitung semua pasangan berurutan
    const n = m.r + m.b;
    let good = 0;
    let all = 0;
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        if (!m.back && i === j) continue;
        all++;
        if (i < m.r && j < m.r) good++;
      }
    return F(good, all);
  },
);

export const K10 = {
  'k10b1-1': [expEval, expGrowth, expKind],
  'k10b1-2': [expEq, expEqBase],
  'k10b1-3': [logBasic, logFrac, logForm],
  'k10b1-4': [logRules, logApprox],
  'k10b2-1': [arithTerm, arithWhich, arithTwo],
  'k10b2-2': [arithSum, arithSn],
  'k10b2-3': [geoTerm, geoSum, geoTwo],
  'k10b2-4': [geoInf, geoInfR],
  'k10b3-1': [vecAB, vecLen],
  'k10b3-2': [vecAdd, vecSumLen],
  'k10b3-3': [vecScalar, vecPar],
  'k10b4-1': [trigRatio, trigFromOne],
  'k10b4-2': [special, specialExpr],
  'k10b4-3': [trigApply, trigShadow],
  'k10b5-1': [spltv, spltvPrice],
  'k10b5-2': [ineqPoint, ineqCount, ineqRegion],
  'k10b5-3': [optimum, lpModel],
  'k10b6-1': [vertexForm],
  'k10b6-2': [completeSq],
  'k10b6-3': [buildQuad],
  'k10b6-4': [quadMax],
  'k10b7-1': [classInfo, histTotal],
  'k10b7-2': [groupedMean, groupedMedMode, medianClass],
  'k10b7-3': [spread, spreadCompare],
  'k10b8-1': [countRule, digits],
  'k10b8-2': [unionDie, unionNum],
  'k10b8-3': [independent],
};
