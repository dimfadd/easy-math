// Generator soal SMP Kelas 7 (materi b1 sampai b9).
import { ri, pick } from '../util.js';
import { L, D, F, M, P, G, rp, FR, ex, num, mc, NAMES, gcd, lcm, sum, shuf } from './u.js';

const moveB = (lang, b, res) => (b > 0 ? L(lang, `Kurangi kedua ruas dengan ${b}: ${res}.`, `Subtract ${b} from both sides: ${res}.`) : L(lang, `Tambahkan ${-b} ke kedua ruas: ${res}.`, `Add ${-b} to both sides: ${res}.`));
const plus = (e) => (e.startsWith('−') ? '− ' + e.slice(1) : '+ ' + e);
const withSolve = (g, s) => ((g.solve = s), g);
const nz = (rnd, a, b) => {
  let v = 0;
  while (!v) v = ri(rnd, a, b);
  return v;
};
const two = (rnd) => {
  const a = pick(rnd, NAMES);
  let b = pick(rnd, NAMES);
  while (b === a) b = pick(rnd, NAMES);
  return [a, b];
};

// ================= Bab 1: Bilangan Bulat =================
const fixOrder = (q, order) => {
  q.options.sort((x, y) => order.indexOf(x.t) - order.indexOf(y.t));
  return q;
};
const cmpNeg = withSolve(
  (rnd, lang) => {
    const a = ri(rnd, -15, 4);
    let b = ri(rnd, -15, -1);
    while (b === a) b = ri(rnd, -15, -1);
    const kind = ri(rnd, 0, 1);
    if (kind === 0) {
      const ok = a > b ? '>' : '<';
      return fixOrder(mc(
        L(lang, `Tanda yang tepat untuk mengisi ${M(lang, a)} … ${M(lang, b)} adalah …`, `Which sign fills the gap: ${M(lang, a)} … ${M(lang, b)}?`),
        ok,
        [
          [ok === '>' ? '<' : '>', L(lang, 'Pada garis bilangan, bilangan yang letaknya lebih kanan lebih besar. Untuk bilangan negatif, yang lebih jauh dari nol justru lebih kecil.', 'On the number line, the number further right is greater. For negatives, the one further from zero is smaller.')],
          ['=', L(lang, 'Kedua bilangan berbeda, jadi tidak sama.', 'The two numbers are different, so they are not equal.')],
        ],
        [L(lang, `Bayangkan garis bilangan: ${M(lang, Math.max(a, b))} lebih kanan daripada ${M(lang, Math.min(a, b))}.`, `Picture the number line: ${M(lang, Math.max(a, b))} is to the right of ${M(lang, Math.min(a, b))}.`), `${M(lang, a)} ${ok} ${M(lang, b)}`],
        { a, b, kind },
        { fixed: true },
      ), ['>', '<', '=']);
    }
    const colder = a < b ? 'A' : 'B';
    const tA = L(lang, 'Kota A lebih dingin', 'City A is colder');
    const tB = L(lang, 'Kota B lebih dingin', 'City B is colder');
    return fixOrder(mc(
      L(lang, `Suhu kota A ${M(lang, a)} °C dan suhu kota B ${M(lang, b)} °C. Pernyataan yang benar adalah …`, `The temperature in city A is ${M(lang, a)} °C and in city B it is ${M(lang, b)} °C. Which statement is true?`),
      colder === 'A' ? tA : tB,
      [
        [colder === 'A' ? tB : tA, L(lang, 'Suhu yang lebih kecil lebih dingin. Bilangan negatif yang lebih jauh dari nol lebih kecil.', 'The smaller temperature is colder. A negative number further from zero is smaller.')],
        [L(lang, 'Sama dinginnya', 'They are equally cold'), L(lang, 'Suhunya berbeda.', 'The temperatures are different.')],
      ],
      [L(lang, 'Makin kecil bilangannya, makin dingin.', 'The smaller the number, the colder.'), `${M(lang, Math.min(a, b))} < ${M(lang, Math.max(a, b))}`],
      { a, b, kind },
      { fixed: true },
    ), [tA, tB, L(lang, 'Sama dinginnya', 'They are equally cold')]);
  },
  (m, lang) => (m.kind === 0 ? (m.a > m.b ? '>' : '<') : m.a < m.b ? L(lang, 'Kota A lebih dingin', 'City A is colder') : L(lang, 'Kota B lebih dingin', 'City B is colder')),
);

const orderInt = withSolve(
  (rnd, lang) => {
    const set = new Set();
    const nNeg = ri(rnd, 2, 3);
    while (set.size < nNeg) set.add(ri(rnd, -12, -1));
    while (set.size < 5) set.add(ri(rnd, 0, 9));
    const nums = shuf(rnd, [...set]);
    const txt = (arr) => arr.map((x) => M(lang, x)).join(', ');
    const asc = nums.slice().sort((x, y) => x - y);
    const byAbs = nums.slice().sort((x, y) => Math.abs(x) - Math.abs(y) || x - y);
    const negWrong = [...nums.filter((x) => x < 0).sort((x, y) => y - x), ...nums.filter((x) => x >= 0).sort((x, y) => x - y)];
    return mc(
      L(lang, `Urutan dari yang terkecil untuk ${txt(nums)} adalah …`, `Order from smallest: ${txt(nums)}`),
      txt(asc),
      [
        [txt(negWrong), L(lang, 'Untuk bilangan negatif, yang lebih jauh dari nol lebih kecil. Jadi bilangan negatif terbesar jaraknya ditaruh paling depan.', 'For negatives, the one further from zero is smaller, so the negative with the biggest distance goes first.')],
        [txt(byAbs), L(lang, 'Itu urutan jarak dari nol, bukan urutan nilai.', 'That orders the distance from zero, not the value.')],
        [txt(asc.slice().reverse()), L(lang, 'Itu urutan dari yang terbesar.', 'That is from largest to smallest.')],
        [txt([asc[1], asc[0], ...asc.slice(2)]), L(lang, `${M(lang, asc[0])} lebih jauh di kiri nol daripada ${M(lang, asc[1])}, jadi lebih kecil.`, `${M(lang, asc[0])} is further left of zero than ${M(lang, asc[1])}, so it is smaller.`)],
      ],
      [L(lang, 'Letakkan semua bilangan di garis bilangan, lalu baca dari kiri ke kanan.', 'Place all numbers on the number line and read from left to right.'), txt(asc)],
      { nums },
    );
  },
  (m, lang) => m.nums.slice().sort((x, y) => x - y).map((x) => M(lang, x)).join(', '),
);

const addInt = withSolve(
  (rnd, lang) => {
    let a = nz(rnd, -25, 25);
    let b = nz(rnd, -25, 25);
    if (a > 0 && b > 0) a = -a;
    if (a === -b) b += b > 0 ? 3 : -3;
    const s = a + b;
    const same = (a < 0) === (b < 0);
    return num(
      `${M(lang, a)} + ${P(lang, b)} = …`,
      s,
      [
        [-s, L(lang, 'Tandanya terbalik. Hasil mengikuti tanda bilangan yang jaraknya dari nol lebih besar.', 'The sign is flipped. The result takes the sign of the number further from zero.')],
        [a - b, L(lang, 'Itu pengurangan. Soal ini penjumlahan.', 'That is subtraction. This question is addition.')],
        [same ? null : Math.abs(a) + Math.abs(b), L(lang, 'Tandanya berbeda, jadi jaraknya dikurangkan, bukan dijumlahkan.', 'The signs differ, so subtract the distances instead of adding them.')],
      ],
      same
        ? [L(lang, `Tandanya sama (negatif): jumlahkan jaraknya, ${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(s)}.`, `Same signs (negative): add the distances, ${Math.abs(a)} + ${Math.abs(b)} = ${Math.abs(s)}.`), L(lang, `Tanda tetap negatif: ${M(lang, s)}.`, `Keep the negative sign: ${M(lang, s)}.`)]
        : [L(lang, `Tandanya berbeda: kurangkan jaraknya, ${Math.max(Math.abs(a), Math.abs(b))} − ${Math.min(Math.abs(a), Math.abs(b))} = ${Math.abs(s)}.`, `Different signs: subtract the distances, ${Math.max(Math.abs(a), Math.abs(b))} − ${Math.min(Math.abs(a), Math.abs(b))} = ${Math.abs(s)}.`), L(lang, `Ikuti tanda bilangan yang jaraknya lebih besar: ${M(lang, s)}.`, `Take the sign of the number with the bigger distance: ${M(lang, s)}.`)],
      { a, b },
    );
  },
  (m) => D(m.a + m.b),
);

const tempStory = withSolve(
  (rnd, lang) => {
    const t = ri(rnd, -12, 3);
    const k = ri(rnd, 2, 15);
    const up = rnd() < 0.5;
    const r = up ? t + k : t - k;
    const place = pick(rnd, [['Puncak Jaya', 'Puncak Jaya'], ['kota Moskow', 'Moscow'], ['sebuah kulkas', 'a freezer'], ['Dieng', 'Dieng']]);
    return num(
      up
        ? L(lang, `Suhu di ${place[0]} pagi hari ${M(lang, t)} °C. Siang harinya suhu naik ${k} derajat. Suhu siang hari adalah … °C`, `The morning temperature in ${place[1]} is ${M(lang, t)} °C. By noon it rises ${k} degrees. What is the noon temperature in °C?`)
        : L(lang, `Suhu di ${place[0]} sore hari ${M(lang, t)} °C. Malam harinya suhu turun ${k} derajat. Suhu malam hari adalah … °C`, `The evening temperature in ${place[1]} is ${M(lang, t)} °C. At night it drops ${k} degrees. What is the night temperature in °C?`),
      r,
      [
        [up ? t - k : t + k, L(lang, up ? 'Naik berarti ditambah, bukan dikurangi.' : 'Turun berarti dikurangi, bukan ditambah.', up ? 'Rising means adding, not subtracting.' : 'Dropping means subtracting, not adding.')],
        [-r, L(lang, 'Tandanya terbalik. Cek lagi di termometer: apakah hasilnya di atas atau di bawah nol?', 'The sign is flipped. Check on a thermometer: is the result above or below zero?')],
        [Math.abs(t) + k, L(lang, 'Tanda negatif suhu awal terlupa.', 'The negative sign of the starting temperature was forgotten.')],
      ],
      [up ? `${M(lang, t)} + ${k} = ${M(lang, r)}` : `${M(lang, t)} − ${k} = ${M(lang, r)}`, L(lang, `Suhunya ${M(lang, r)} °C.`, `The temperature is ${M(lang, r)} °C.`)],
      { t, k, up },
    );
  },
  (m) => D(m.up ? m.t + m.k : m.t - m.k),
);

const subInt = withSolve(
  (rnd, lang) => {
    const a = ri(rnd, -20, 20);
    let b = nz(rnd, -20, 20);
    if (a >= 0 && b > 0 && b <= a) b = -b;
    const r = a - b;
    return num(
      `${M(lang, a)} − ${P(lang, b)} = …`,
      r,
      [
        [a + b, L(lang, 'Mengurangi sama dengan menambah lawannya. Lawan bilangan pengurangnya belum diambil.', 'Subtracting is the same as adding the opposite. The opposite was not taken.')],
        [-r, L(lang, 'Tandanya terbalik.', 'The sign is flipped.')],
        [b - a, L(lang, 'Urutannya tertukar. Yang dikurangi bilangan pertama.', 'The order was swapped. Start from the first number.')],
      ],
      [L(lang, `Mengurangi ${P(lang, b)} sama dengan menambah ${P(lang, -b)}.`, `Subtracting ${P(lang, b)} is the same as adding ${P(lang, -b)}.`), `${M(lang, a)} + ${P(lang, -b)} = ${M(lang, r)}`],
      { a, b },
    );
  },
  (m) => D(m.a - m.b),
);

const diffTemp = withSolve(
  (rnd, lang) => {
    const lo = ri(rnd, -15, -1);
    const hi = ri(rnd, 3, 30);
    const s = pick(rnd, [['di puncak gunung', 'di kaki gunung', 'at the mountain top', 'at the foot of the mountain'], ['di dalam freezer', 'di dapur', 'inside the freezer', 'in the kitchen'], ['kota Oslo', 'kota Jakarta', 'Oslo', 'Jakarta']]);
    return num(
      L(lang, `Suhu ${s[0]} ${M(lang, lo)} °C dan suhu ${s[1]} ${hi} °C. Selisih kedua suhu itu adalah … °C`, `The temperature ${s[2]} is ${M(lang, lo)} °C and ${s[3]} it is ${hi} °C. What is the difference between them in °C?`),
      hi - lo,
      [
        [hi + lo, L(lang, `Selisih = ${hi} − (${M(lang, lo)}). Mengurangi bilangan negatif berarti menambah.`, `Difference = ${hi} − (${M(lang, lo)}). Subtracting a negative means adding.`)],
        [lo - hi, L(lang, 'Selisih suhu dinyatakan sebagai jarak, jadi bernilai positif.', 'A difference is a distance, so it is positive.')],
      ],
      [`${hi} − ${P(lang, lo)} = ${hi} + ${-lo}`, `= ${hi - lo}`],
      { lo, hi },
    );
  },
  (m) => D(m.hi + Math.abs(m.lo)),
);

const mulDivInt = withSolve(
  (rnd, lang) => {
    let a = nz(rnd, -12, 12);
    let b = nz(rnd, -12, 12);
    if (a > 0 && b > 0) b = -b;
    if (Math.abs(a) === 1) a = a * 3;
    const div = rnd() < 0.5;
    if (div) {
      const p = a * b;
      return num(
        `${M(lang, p)} ÷ ${P(lang, b)} = …`,
        a,
        [
          [-a, L(lang, 'Aturan tanda: tanda sama hasilnya positif, tanda berbeda hasilnya negatif.', 'Sign rule: same signs give positive, different signs give negative.')],
          [p - b, L(lang, 'Itu pengurangan, bukan pembagian.', 'That is subtraction, not division.')],
        ],
        [L(lang, `${Math.abs(p)} ÷ ${Math.abs(b)} = ${Math.abs(a)}.`, `${Math.abs(p)} ÷ ${Math.abs(b)} = ${Math.abs(a)}.`), L(lang, `Tanda ${(p < 0) === (b < 0) ? 'sama, hasil positif' : 'berbeda, hasil negatif'}: ${M(lang, a)}.`, `${(p < 0) === (b < 0) ? 'Same signs, positive' : 'Different signs, negative'}: ${M(lang, a)}.`)],
        { p, b, div },
      );
    }
    return num(
      `${P(lang, a)} × ${P(lang, b)} = …`,
      a * b,
      [
        [-a * b, L(lang, 'Aturan tanda: tanda sama hasilnya positif, tanda berbeda hasilnya negatif.', 'Sign rule: same signs give positive, different signs give negative.')],
        [a + b, L(lang, 'Itu penjumlahan, bukan perkalian.', 'That is addition, not multiplication.')],
      ],
      [`${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(a * b)}`, L(lang, `Tanda ${(a < 0) === (b < 0) ? 'sama, hasil positif' : 'berbeda, hasil negatif'}: ${M(lang, a * b)}.`, `${(a < 0) === (b < 0) ? 'Same signs, positive' : 'Different signs, negative'}: ${M(lang, a * b)}.`)],
      { p: a * b, b, div },
    );
  },
  (m) => D(m.div ? m.p / m.b : m.p),
);

const mulStory = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const k = ri(rnd, 3, 25);
      const t = ri(rnd, 2, 9);
      return num(
        L(lang, `Kapal selam turun ${k} meter setiap menit dari permukaan laut. Posisinya setelah ${t} menit adalah … meter (pakai tanda negatif untuk di bawah permukaan)`, `A submarine goes down ${k} metres every minute from sea level. Where is it after ${t} minutes, in metres? (use a negative sign for below sea level)`),
        -k * t,
        [
          [k * t, L(lang, 'Di bawah permukaan laut ditulis negatif.', 'Below sea level is written as negative.')],
          [-(k + t), L(lang, 'Turun berulang kali artinya dikalikan, bukan dijumlahkan.', 'Going down repeatedly means multiplying, not adding.')],
        ],
        [L(lang, `Setiap menit berubah ${M(lang, -k)} m.`, `Each minute changes the position by ${M(lang, -k)} m.`), `${t} × ${P(lang, -k)} = ${M(lang, -k * t)}`],
        { kind, k, t, s: 0 },
      );
    }
    if (kind === 1) {
      const s = ri(rnd, 0, 8);
      const k = ri(rnd, 2, 4);
      const t = ri(rnd, 3, 6);
      return num(
        L(lang, `Suhu sebuah ruang pendingin mula-mula ${s} °C. Suhunya turun ${k} °C setiap jam. Suhu setelah ${t} jam adalah … °C`, `A cold room starts at ${s} °C. Its temperature drops ${k} °C every hour. What is the temperature after ${t} hours, in °C?`),
        s - k * t,
        [
          [k * t - s, L(lang, 'Tandanya terbalik.', 'The sign is flipped.')],
          [-k * t, L(lang, `Suhu awal ${s} °C belum diperhitungkan.`, `The starting ${s} °C was left out.`)],
          [s - k - t, L(lang, 'Turun setiap jam artinya penurunan dikalikan banyak jam.', 'Dropping every hour means multiplying the drop by the number of hours.')],
        ],
        [`${t} × ${P(lang, -k)} = ${M(lang, -k * t)}`, `${s} + ${P(lang, -k * t)} = ${M(lang, s - k * t)}`],
        { kind, k, t, s },
      );
    }
    const xs = [nz(rnd, -6, 6), nz(rnd, -6, 6), nz(rnd, -5, 5)].map((v, i) => (i === 0 ? -Math.abs(v) - 1 : v));
    const pr = xs[0] * xs[1] * xs[2];
    const negs = xs.filter((v) => v < 0).length;
    return num(
      xs.map((v) => P(lang, v)).join(' × ') + ' = …',
      pr,
      [
        [-pr, L(lang, `Ada ${negs} faktor negatif. Banyak faktor negatif ganjil hasilnya negatif, genap hasilnya positif.`, `There are ${negs} negative factors. An odd number of negatives gives a negative result; an even number gives positive.`)],
        [sum(xs), L(lang, 'Itu penjumlahan, bukan perkalian.', 'That is addition, not multiplication.')],
      ],
      [L(lang, `Kalikan jaraknya: ${xs.map((v) => Math.abs(v)).join(' × ')} = ${Math.abs(pr)}.`, `Multiply the sizes: ${xs.map((v) => Math.abs(v)).join(' × ')} = ${Math.abs(pr)}.`), L(lang, `Ada ${negs} tanda negatif, jadi hasilnya ${pr < 0 ? 'negatif' : 'positif'}: ${M(lang, pr)}.`, `There ${negs === 1 ? 'is 1 negative' : `are ${negs} negatives`}, so the result is ${pr < 0 ? 'negative' : 'positive'}: ${M(lang, pr)}.`)],
      { kind, xs },
    );
  },
  (m) => D(m.kind === 0 ? -(m.k * m.t) : m.kind === 1 ? m.s - m.k * m.t : m.xs.reduce((p, v) => p * v, 1)),
);

const factorsOf = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const nFactors = withSolve(
  (rnd, lang) => {
    const n = pick(rnd, [12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 44, 45, 48, 50, 54, 56, 60, 63, 64, 72, 75, 80, 84, 90, 96, 100]);
    const fs = factorsOf(n);
    return num(
      L(lang, `Berapa banyak faktor dari ${n}?`, `How many factors does ${n} have?`),
      fs.length,
      [
        [fs.length - 2, L(lang, `1 dan ${n} juga termasuk faktor.`, `1 and ${n} are factors too.`)],
        [fs.length - 1, L(lang, `Ada faktor yang terlewat. Ingat 1 dan ${n} juga faktor.`, `A factor was missed. Remember 1 and ${n} are factors too.`)],
        [fs.length / 2, L(lang, 'Itu banyak pasangan faktor. Setiap pasangan berisi dua faktor.', 'That is the number of factor pairs. Each pair has two factors.')],
      ],
      [L(lang, `Cari pasangan perkalian yang hasilnya ${n}.`, `Find the multiplication pairs that make ${n}.`), L(lang, `Faktornya: ${fs.join(', ')}. Ada ${fs.length}.`, `Factors: ${fs.join(', ')}. There are ${fs.length}.`)],
      { n },
    );
  },
  (m) => {
    let c = 0;
    for (let d = 1; d * d <= m.n; d++) if (m.n % d === 0) c += d * d === m.n ? 1 : 2;
    return D(c);
  },
);

const powTxt = (pf) => pf.map(([p, e]) => (e > 1 ? `${p}{^:${e}}` : `${p}`)).join(' × ');
const primeFact = withSolve(
  (rnd, lang) => {
    const opts = [
      [[2, ri(rnd, 2, 4)], [3, 1]],
      [[2, ri(rnd, 1, 3)], [3, 2]],
      [[2, 2], [5, ri(rnd, 1, 2)]],
      [[2, ri(rnd, 1, 3)], [3, 1], [5, 1]],
      [[2, 1], [3, 1], [7, 1]],
      [[2, 3], [7, 1]],
      [[3, 2], [5, 1]],
      [[2, 2], [3, 1], [7, 1]],
      [[2, 4], [5, 1]],
      [[3, 3], [2, 1]],
    ];
    const pf = pick(rnd, opts).slice().sort((x, y) => x[0] - y[0]);
    const n = pf.reduce((v, [p, e]) => v * p ** e, 1);
    const fs = factorsOf(n).filter((d) => d > 1 && d < n && d * d <= n);
    const d = fs[fs.length - 1];
    const flat = pf.map(([p]) => p).join(' × ');
    const bump = pf.map(([p, e], i) => [p, i === 0 ? e + 1 : e]);
    return mc(
      L(lang, `Faktorisasi prima dari ${n} adalah …`, `The prime factorisation of ${n} is …`),
      powTxt(pf),
      [
        [`${d} × ${n / d}`, L(lang, `${d} × ${n / d} memang ${n}, tetapi belum semua faktornya prima.`, `${d} × ${n / d} is ${n}, but not all of those factors are prime.`)],
        [flat, L(lang, `${flat} = ${pf.reduce((v, [p]) => v * p, 1)}, bukan ${n}. Pangkatnya terlupa.`, `${flat} = ${pf.reduce((v, [p]) => v * p, 1)}, not ${n}. The powers are missing.`)],
        [powTxt(bump), L(lang, `Hasil perkaliannya ${2 * n}, bukan ${n}.`, `That multiplies to ${2 * n}, not ${n}.`)],
      ],
      [L(lang, `Bagi terus ${n} dengan bilangan prima terkecil sampai habis (pohon faktor).`, `Keep dividing ${n} by the smallest prime until you reach 1 (factor tree).`), `${n} = ${powTxt(pf)}`],
      { n },
    );
  },
  (m) => {
    let n = m.n;
    const pf = [];
    for (let p = 2; n > 1; p++) {
      let e = 0;
      while (n % p === 0) {
        n /= p;
        e++;
      }
      if (e) pf.push([p, e]);
    }
    return powTxt(pf);
  },
);

const fpbStory = withSolve(
  (rnd, lang) => {
    const g = ri(rnd, 3, 15);
    let p = ri(rnd, 2, 7);
    let q = ri(rnd, 2, 9);
    while (q === p || gcd(p, q) !== 1) q = ri(rnd, 2, 9);
    const a = g * p;
    const b = g * q;
    const story = rnd() < 0.6;
    const it = pick(rnd, [['pensil', 'buku', 'pencils', 'books'], ['apel', 'jeruk', 'apples', 'oranges'], ['permen', 'cokelat', 'sweets', 'chocolates'], ['kelereng merah', 'kelereng biru', 'red marbles', 'blue marbles']]);
    const nm = pick(rnd, NAMES);
    return num(
      story
        ? L(lang, `${nm} punya ${a} ${it[0]} dan ${b} ${it[1]}. Semuanya dibagikan sama rata ke beberapa anak tanpa sisa. Paling banyak berapa anak yang mendapat bagian?`, `${nm} has ${a} ${it[2]} and ${b} ${it[3]}. All of them are shared equally among some children with nothing left over. What is the greatest number of children?`)
        : L(lang, `FPB dari ${a} dan ${b} adalah …`, `The GCF (greatest common factor) of ${a} and ${b} is …`),
      g,
      [
        [a * b / g, L(lang, 'Itu KPK. Untuk membagi sama rata dicari faktor persekutuan terbesar.', 'That is the LCM. Sharing equally needs the greatest common factor.')],
        [g % 2 === 0 ? g / 2 : null, L(lang, 'Itu faktor persekutuan, tetapi bukan yang terbesar.', 'That is a common factor, but not the greatest.')],
        [a + b, L(lang, 'FPB dicari dari faktor kedua bilangan, bukan dijumlah.', 'The GCF comes from the factors, not from adding.')],
      ],
      [L(lang, `Faktor persekutuan ${a} dan ${b} yang terbesar adalah ${g}.`, `The greatest common factor of ${a} and ${b} is ${g}.`), L(lang, `${a} = ${g} × ${p} dan ${b} = ${g} × ${q}.`, `${a} = ${g} × ${p} and ${b} = ${g} × ${q}.`)],
      { a, b },
    );
  },
  (m) => D(gcd(m.a, m.b)),
);

const kpkStory = withSolve(
  (rnd, lang) => {
    const pool = [4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 25, 30];
    let a = pick(rnd, pool);
    let b = pick(rnd, pool);
    while (b === a || a % b === 0 || b % a === 0 || lcm(a, b) > 180) b = pick(rnd, pool);
    const l = lcm(a, b);
    const story = rnd() < 0.6;
    const ctx = pick(rnd, [
      ['Bus A berangkat setiap', 'bus B setiap', 'menit', 'keduanya berangkat bersama lagi', 'Bus A leaves every', 'bus B every', 'minutes', 'they leave together again'],
      ['Lampu merah berkedip setiap', 'lampu hijau setiap', 'detik', 'keduanya berkedip bersama lagi', 'A red light blinks every', 'a green light every', 'seconds', 'they blink together again'],
    ]);
    return num(
      story
        ? L(lang, `${ctx[0]} ${a} ${ctx[2]}, ${ctx[1]} ${b} ${ctx[2]}. Saat ini keduanya bersamaan. Berapa ${ctx[2]} lagi ${ctx[3]}?`, `${ctx[4]} ${a} ${ctx[6]} and ${ctx[5]} ${b} ${ctx[6]}. They start together now. After how many ${ctx[6]} will ${ctx[7]}?`)
        : L(lang, `KPK dari ${a} dan ${b} adalah …`, `The LCM (least common multiple) of ${a} and ${b} is …`),
      l,
      [
        [a * b, L(lang, `${a} × ${b} memang kelipatan persekutuan, tetapi bukan yang terkecil.`, `${a} × ${b} is a common multiple, but not the least.`)],
        [gcd(a, b), L(lang, 'Itu FPB. Waktu bersamaan lagi dicari dengan KPK.', 'That is the GCF. Meeting again needs the LCM.')],
        [a + b, L(lang, 'KPK dicari dari kelipatan, bukan dijumlah.', 'The LCM comes from the multiples, not from adding.')],
      ],
      [L(lang, `Kelipatan ${a}: ${[1, 2, 3, 4].map((i) => a * i).join(', ')}, …`, `Multiples of ${a}: ${[1, 2, 3, 4].map((i) => a * i).join(', ')}, …`), L(lang, `Kelipatan persekutuan terkecil ${a} dan ${b} adalah ${l}.`, `The least common multiple of ${a} and ${b} is ${l}.`)],
      { a, b },
    );
  },
  (m) => {
    let k = m.a;
    while (k % m.b) k += m.a;
    return D(k);
  },
);

// ================= Bab 2: Bilangan Rasional =================
const coprime = (rnd, qa, qb) => {
  const q = ri(rnd, qa, qb);
  let p = ri(rnd, 1, q - 1);
  while (gcd(p, q) !== 1) p = ri(rnd, 1, q - 1);
  return [p, q];
};

const simplifyFrac = withSolve(
  (rnd, lang) => {
    const [p, q] = coprime(rnd, 3, 11);
    const k = ri(rnd, 2, 9);
    return num(
      L(lang, `Bentuk paling sederhana dari ${k * p}/${k * q} adalah …`, `Write ${k * p}/${k * q} in simplest form.`),
      F(p, q),
      [
        [`${q}/${p}`, L(lang, 'Pembilang dan penyebutnya tertukar.', 'The numerator and denominator are swapped.')],
        [`${k * p - k + 1}/${k * q - k + 1}`, L(lang, 'Menyederhanakan berarti membagi pembilang dan penyebut dengan bilangan yang sama, bukan mengurangi.', 'Simplifying means dividing top and bottom by the same number, not subtracting.')],
      ],
      [L(lang, `FPB dari ${k * p} dan ${k * q} adalah ${k}.`, `The GCF of ${k * p} and ${k * q} is ${k}.`), `${k * p}/${k * q} = ${k * p}÷${k} / ${k * q}÷${k} = ${p}/${q}`],
      { a: k * p, b: k * q },
      { exact: true },
    );
  },
  (m) => {
    const g = gcd(m.a, m.b);
    return `${m.a / g}/${m.b / g}`;
  },
);

const fillEquiv = withSolve(
  (rnd, lang) => {
    const [p, q] = coprime(rnd, 3, 10);
    const k = ri(rnd, 2, 8);
    return num(
      L(lang, `Isilah titik-titiknya: ${p}/${q} = …/${q * k}`, `Fill in the blank: ${p}/${q} = …/${q * k}`),
      p * k,
      [
        [p + q * k - q, L(lang, 'Pecahan senilai didapat dengan mengalikan, bukan menambahkan.', 'Equivalent fractions come from multiplying, not adding.')],
        [k, L(lang, `${k} adalah pengalinya. Pembilang ${p} juga harus dikalikan ${k}.`, `${k} is the multiplier. The numerator ${p} must also be multiplied by ${k}.`)],
      ],
      [L(lang, `${q} × ${k} = ${q * k}, jadi pengalinya ${k}.`, `${q} × ${k} = ${q * k}, so the multiplier is ${k}.`), `${p} × ${k} = ${p * k}`],
      { p, q, d: q * k },
    );
  },
  (m) => D((m.p * m.d) / m.q),
);

const largestFrac = withSolve(
  (rnd, lang) => {
    const fr = [];
    const vals = new Set();
    while (fr.length < 4) {
      const [p, q] = coprime(rnd, 3, 12);
      const v = Math.round((p / q) * 1e6);
      if (vals.has(v)) continue;
      vals.add(v);
      fr.push([p, q]);
    }
    const big = rnd() < 0.7;
    const sorted = fr.slice().sort((x, y) => x[0] / x[1] - y[0] / y[1]);
    const ok = big ? sorted[3] : sorted[0];
    const t = (f) => `${f[0]}/${f[1]}`;
    const w = big ? L(lang, 'terbesar', 'largest') : L(lang, 'terkecil', 'smallest');
    return mc(
      L(lang, `Pecahan ${w} di antara ${fr.map(t).join(', ')} adalah …`, `The ${w} fraction among ${fr.map(t).join(', ')} is …`),
      t(ok),
      fr.filter((f) => f !== ok).map((f) => [t(f), L(lang, `Samakan penyebutnya atau ubah ke desimal: ${t(f)} ≈ ${(f[0] / f[1]).toFixed(2).replace('.', ',')}.`, `Use a common denominator or decimals: ${t(f)} ≈ ${(f[0] / f[1]).toFixed(2)}.`)]),
      [L(lang, 'Ubah setiap pecahan ke desimal (atau samakan penyebutnya).', 'Change each fraction to a decimal (or use a common denominator).'), sorted.map((f) => `${t(f)} ≈ ${lang === 'en' ? (f[0] / f[1]).toFixed(2) : (f[0] / f[1]).toFixed(2).replace('.', ',')}`).join('; ')],
      { fr, big },
    );
  },
  (m) => {
    let best = m.fr[0];
    for (const f of m.fr) if (m.big ? f[0] * best[1] > best[0] * f[1] : f[0] * best[1] < best[0] * f[1]) best = f;
    return `${best[0]}/${best[1]}`;
  },
);

const addFrac = withSolve(
  (rnd, lang) => {
    let [a, b] = coprime(rnd, 2, 9);
    let [c, d] = coprime(rnd, 2, 9);
    while (d === b) [c, d] = coprime(rnd, 2, 9);
    let minus = rnd() < 0.5;
    if (minus && a * d < c * b) [a, b, c, d] = [c, d, a, b];
    const n = minus ? a * d - c * b : a * d + c * b;
    const story = minus && rnd() < 0.5;
    const it = pick(rnd, [['gula', 'sugar'], ['tepung', 'flour'], ['beras', 'rice']]);
    return num(
      story
        ? L(lang, `Ibu punya ${a}/${b} kg ${it[0]}, lalu memakai ${c}/${d} kg untuk membuat kue. Sisa ${it[0]} ibu adalah … kg`, `Mum has ${a}/${b} kg of ${it[1]} and uses ${c}/${d} kg to bake a cake. How many kg of ${it[1]} are left?`)
        : `${a}/${b} ${minus ? '−' : '+'} ${c}/${d} = …`,
      F(n, b * d),
      [
        [minus ? (b !== d && a - c >= 0 ? `${a - c}/${Math.abs(b - d)}` : null) : `${a + c}/${b + d}`, L(lang, 'Penyebut tidak dijumlahkan atau dikurangkan. Samakan penyebutnya dulu.', 'Denominators are not added or subtracted. Make them the same first.')],
        [`${minus ? a - c : a + c}/${b * d}`, L(lang, 'Setelah penyebut disamakan, pembilangnya juga harus ikut dikalikan.', 'After making a common denominator, the numerators must be multiplied too.')],
      ],
      [L(lang, `Samakan penyebut: ${a}/${b} = ${a * d}/${b * d} dan ${c}/${d} = ${c * b}/${b * d}.`, `Common denominator: ${a}/${b} = ${a * d}/${b * d} and ${c}/${d} = ${c * b}/${b * d}.`), `${a * d}/${b * d} ${minus ? '−' : '+'} ${c * b}/${b * d} = ${n}/${b * d}` + (F(n, b * d) !== `${n}/${b * d}` ? ` = ${F(n, b * d)}` : '')],
      { a, b, c, d, minus },
    );
  },
  (m) => {
    const l = lcm(m.b, m.d);
    const n = (m.a * l) / m.b + (m.minus ? -1 : 1) * ((m.c * l) / m.d);
    return F(n, l);
  },
);

const addMixed = withSolve(
  (rnd, lang) => {
    const w1 = ri(rnd, 1, 4);
    const w2 = ri(rnd, 1, 4);
    const [a, b] = coprime(rnd, 2, 6);
    let [c, d] = coprime(rnd, 2, 8);
    while (d === b && rnd() < 0.5) [c, d] = coprime(rnd, 2, 8);
    const n = (w1 * b + a) * d + (w2 * d + c) * b;
    const den = b * d;
    const v = F(n, den);
    const [pn, pd] = v.includes('/') ? v.split('/').map(Number) : [Number(v), 1];
    const mixed = pd === 1 ? `${pn}` : `${Math.floor(pn / pd)} ${pn % pd}/${pd}`;
    return num(
      `${w1} ${a}/${b} + ${w2} ${c}/${d} = …`,
      mixed,
      [
        [`${w1 + w2} ${a + c}/${b + d}`, L(lang, 'Penyebut tidak dijumlahkan. Samakan penyebut pecahannya dulu.', 'Do not add the denominators. Make the fractions share a denominator first.')],
        [w1 + w2, L(lang, 'Bagian pecahannya belum dijumlahkan.', 'The fraction parts were not added.')],
      ],
      [L(lang, `Jumlahkan bilangan bulatnya: ${w1} + ${w2} = ${w1 + w2}.`, `Add the whole numbers: ${w1} + ${w2} = ${w1 + w2}.`), L(lang, `Jumlahkan pecahannya: ${a}/${b} + ${c}/${d} = ${F(a * d + c * b, den)}. Hasilnya ${mixed}.`, `Add the fractions: ${a}/${b} + ${c}/${d} = ${F(a * d + c * b, den)}. The answer is ${mixed}.`)],
      { w1, a, b, w2, c, d },
    );
  },
  (m) => F((m.w1 * m.b + m.a) * m.d + (m.w2 * m.d + m.c) * m.b, m.b * m.d),
);

const mulDivFrac = withSolve(
  (rnd, lang) => {
    const [a, b] = coprime(rnd, 2, 9);
    const [c, d] = coprime(rnd, 2, 9);
    const div = rnd() < 0.5;
    if (div)
      return num(
        `${a}/${b} ÷ ${c}/${d} = …`,
        F(a * d, b * c),
        [
          [F(a * c, b * d), L(lang, 'Membagi dengan pecahan berarti mengalikan dengan kebalikannya. Pecahan kedua belum dibalik.', 'Dividing by a fraction means multiplying by its reciprocal. The second fraction was not flipped.')],
          [F(b * c, a * d), L(lang, 'Yang dibalik pecahan kedua (pembagi), bukan yang pertama.', 'Flip the second fraction (the divisor), not the first.')],
        ],
        [`${a}/${b} ÷ ${c}/${d} = ${a}/${b} × ${d}/${c}`, `= ${a * d}/${b * c}` + (F(a * d, b * c) !== `${a * d}/${b * c}` ? ` = ${F(a * d, b * c)}` : '')],
        { a, b, c, d, div },
      );
    return num(
      `${a}/${b} × ${c}/${d} = …`,
      F(a * c, b * d),
      [
        [F(a * d, b * c), L(lang, 'Itu pembagian. Pada perkalian, pembilang kali pembilang dan penyebut kali penyebut.', 'That is division. To multiply, multiply tops together and bottoms together.')],
        [F(a + c, b + d), L(lang, 'Pembilang dan penyebut dikalikan, bukan dijumlahkan.', 'Multiply the numerators and the denominators, do not add them.')],
      ],
      [L(lang, 'Pembilang × pembilang, penyebut × penyebut.', 'Numerator × numerator, denominator × denominator.'), `${a * c}/${b * d}` + (F(a * c, b * d) !== `${a * c}/${b * d}` ? ` = ${F(a * c, b * d)}` : '')],
      { a, b, c, d, div },
    );
  },
  (m) => (m.div ? F(m.a * m.d, m.b * m.c) : F(m.a * m.c, m.b * m.d)),
);

const ribbon = withSolve(
  (rnd, lang) => {
    const [p, q] = coprime(rnd, 2, 6);
    const k = ri(rnd, 2, 9);
    const W = p * k;
    const it = pick(rnd, [['Pita', 'ribbon', 'm'], ['Tali', 'rope', 'm'], ['Kain', 'cloth', 'm']]);
    return num(
      L(lang, `${it[0]} sepanjang ${W} m dipotong-potong, setiap potong panjangnya ${p}/${q} m. Banyak potongan adalah …`, `A ${it[1]} ${W} m long is cut into pieces, each ${p}/${q} m long. How many pieces are there?`),
      W * q / p,
      [
        [F(W * p, q), L(lang, `Banyak potongan dicari dengan membagi: ${W} ÷ ${p}/${q}.`, `Find the number of pieces by dividing: ${W} ÷ ${p}/${q}.`)],
        [W * q, L(lang, `${W} × ${q} belum dibagi ${p}.`, `${W} × ${q} still has to be divided by ${p}.`)],
      ],
      [`${W} ÷ ${p}/${q} = ${W} × ${q}/${p}`, p === 1 ? `= ${W * q}` : `= ${W * q}/${p} = ${(W * q) / p}`],
      { W, p, q },
    );
  },
  (m) => D(m.W / (m.p / m.q)),
);

const decPct = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const q = pick(rnd, [2, 4, 5, 8, 10, 20, 25, 50]);
      let p = ri(rnd, 1, q - 1);
      while (gcd(p, q) !== 1) p = ri(rnd, 1, q - 1);
      return num(
        L(lang, `${p}/${q} dalam bentuk desimal adalah …`, `Write ${p}/${q} as a decimal.`),
        p / q,
        [
          [Number(`${p}.${q}`), L(lang, 'Pecahan bukan ditulis pembilang koma penyebut. Bagi pembilang dengan penyebut.', 'A fraction is not "numerator point denominator". Divide the numerator by the denominator.')],
          [q / p, L(lang, 'Yang dibagi pembilang oleh penyebut, bukan sebaliknya.', 'Divide the numerator by the denominator, not the other way round.')],
        ],
        [L(lang, `${p} ÷ ${q} = ${M(lang, p / q)}`, `${p} ÷ ${q} = ${M(lang, p / q)}`), L(lang, `Atau ubah penyebut menjadi 10, 100, atau 1000 dulu.`, 'Or first change the denominator to 10, 100, or 1000.')],
        { kind, p, q },
      );
    }
    if (kind === 1) {
      const pc = pick(rnd, [5, 8, 12, 15, 25, 30, 45, 60, 75, 2.5, 120]);
      const d = pc / 100;
      return num(
        L(lang, `${M(lang, d)} dalam bentuk persen adalah … %`, `Write ${M(lang, d)} as a percentage (%).`),
        pc,
        [
          [d * 10, L(lang, 'Persen berarti per seratus, jadi kalikan dengan 100, bukan 10.', 'Percent means per hundred, so multiply by 100, not 10.')],
          [d, L(lang, 'Desimal perlu dikalikan 100 untuk menjadi persen.', 'Multiply the decimal by 100 to get a percentage.')],
        ],
        [L(lang, 'Kalikan dengan 100%.', 'Multiply by 100%.'), `${M(lang, d)} × 100% = ${M(lang, pc)}%`],
        { kind, d },
      );
    }
    const n = pick(rnd, [20, 25, 30, 32, 36, 40, 45, 48, 50]);
    let pc = pick(rnd, [10, 20, 25, 30, 40, 50, 60, 75, 80]);
    while ((n * pc) % 100) pc = pick(rnd, [10, 20, 25, 30, 40, 50, 60, 75, 80]);
    const hob = pick(rnd, [['bola voli', 'volleyball'], ['membaca', 'reading'], ['menari', 'dancing'], ['catur', 'chess']]);
    return num(
      L(lang, `Dari ${n} siswa, ${pc}% suka ${hob[0]}. Banyak siswa yang suka ${hob[0]} adalah …`, `Of ${n} students, ${pc}% like ${hob[1]}. How many students like ${hob[1]}?`),
      (n * pc) / 100,
      [
        [pc, L(lang, `${pc} adalah persennya, bukan banyak siswa.`, `${pc} is the percentage, not the number of students.`)],
        [n - (n * pc) / 100, L(lang, 'Itu siswa yang tidak suka.', 'Those are the students who do not like it.')],
      ],
      [`${pc}% × ${n} = ${pc}/100 × ${n}`, `= ${(n * pc) / 100}`],
      { kind, n, pc },
    );
  },
  (m) => D(m.kind === 0 ? m.p / m.q : m.kind === 1 ? m.d * 100 : (m.pc * m.n) / 100),
);

const discount = withSolve(
  (rnd, lang) => {
    const price = pick(rnd, [40, 60, 80, 90, 120, 150, 200, 240, 250, 300, 360, 400]) * 1000;
    const pc = pick(rnd, [5, 10, 15, 20, 25, 30, 40, 50]);
    const cut = (price * pc) / 100;
    const it = pick(rnd, [['sepatu', 'pair of shoes'], ['tas', 'bag'], ['jaket', 'jacket'], ['kaos', 'T-shirt'], ['helm', 'helmet']]);
    return num(
      L(lang, `Harga ${it[0]} ${rp(lang, price)} mendapat diskon ${pc}%. Harga yang harus dibayar adalah Rp …`, `A ${it[1]} costs ${rp(lang, price)} with a ${pc}% discount. How much do you pay, in Rp?`),
      price - cut,
      [
        [cut, L(lang, 'Itu besar diskonnya. Harga bayar = harga awal − diskon.', 'That is the discount. Price to pay = original price − discount.')],
        [price + cut, L(lang, 'Diskon mengurangi harga, bukan menambah.', 'A discount lowers the price, it does not raise it.')],
        [price - pc * 1000, L(lang, `Diskon ${pc}% bukan ${rp(lang, pc * 1000)}. Hitung ${pc}% dari harganya.`, `A ${pc}% discount is not ${rp(lang, pc * 1000)}. Work out ${pc}% of the price.`)],
      ],
      [L(lang, `Diskon = ${pc}% × ${rp(lang, price)} = ${rp(lang, cut)}.`, `Discount = ${pc}% × ${rp(lang, price)} = ${rp(lang, cut)}.`), L(lang, `Bayar = ${rp(lang, price)} − ${rp(lang, cut)} = ${rp(lang, price - cut)}.`, `Pay = ${rp(lang, price)} − ${rp(lang, cut)} = ${rp(lang, price - cut)}.`)],
      { price, pc },
    );
  },
  (m) => D((m.price * (100 - m.pc)) / 100),
);

// ================= Bab 3: Bentuk Aljabar =================
const VARS = [['x', 'y'], ['a', 'b'], ['p', 'q'], ['m', 'n']];
const coefQ = withSolve(
  (rnd, lang) => {
    const [u, v] = pick(rnd, VARS);
    const a = nz(rnd, -9, 9);
    let b = nz(rnd, -9, 9);
    while (Math.abs(b) === Math.abs(a)) b = nz(rnd, -9, 9);
    let c = nz(rnd, -12, 12);
    while ([a, b].map(Math.abs).includes(Math.abs(c))) c = nz(rnd, -12, 12);
    const e = ex([[a, u], [b, v], [c, '']]);
    const ask = ri(rnd, 0, 2);
    const ok = [a, b, c][ask];
    const what = ask === 0 ? L(lang, `koefisien dari ${u}`, `the coefficient of ${u}`) : ask === 1 ? L(lang, `koefisien dari ${v}`, `the coefficient of ${v}`) : L(lang, 'konstantanya', 'the constant');
    return mc(
      L(lang, `Pada bentuk ${e}, ${what} adalah …`, `In ${e}, ${what} is …`),
      M(lang, ok),
      [
        [M(lang, -ok), L(lang, 'Tanda di depan suku ikut menjadi bagian dari koefisien atau konstanta.', 'The sign in front of a term belongs to its coefficient or constant.')],
        ...[a, b, c].filter((x, i) => i !== ask).map((x) => [M(lang, x), L(lang, 'Itu milik suku yang lain.', 'That belongs to another term.')]),
      ],
      [L(lang, `Suku-sukunya: ${[[a, u], [b, v], [c, '']].map(([k, w]) => (k < 0 ? '−' : '+') + Math.abs(k) + w).join(', ')}.`, `The terms are: ${[[a, u], [b, v], [c, '']].map(([k, w]) => (k < 0 ? '−' : '+') + Math.abs(k) + w).join(', ')}.`), L(lang, `Jadi ${what} adalah ${M(lang, ok)}.`, `So ${what} is ${M(lang, ok)}.`)],
      { a, b, c, ask },
    );
  },
  (m, lang) => M(lang, [m.a, m.b, m.c][m.ask]),
);

const likeTerms = withSolve(
  (rnd, lang) => {
    const u = pick(rnd, ['x', 'a', 'p', 'y', 'm']);
    const a = ri(rnd, 2, 9);
    let c = nz(rnd, -8, 8);
    while (a + c === 0) c = nz(rnd, -8, 8);
    const b = nz(rnd, -10, 10);
    let d = nz(rnd, -10, 10);
    while (b + d === 0) d = nz(rnd, -10, 10);
    const e = ex([[a, u], [b, ''], [c, u], [d, '']]);
    return mc(
      L(lang, `Bentuk sederhana dari ${e} adalah …`, `Simplify ${e}.`),
      ex([[a + c, u], [b + d, '']]),
      [
        [ex([[a - c, u], [b + d, '']]), L(lang, `Tanda di depan ${Math.abs(c)}${u} ikut dihitung: ${a} ${c < 0 ? '−' : '+'} ${Math.abs(c)}.`, `The sign in front of ${Math.abs(c)}${u} counts: ${a} ${c < 0 ? '−' : '+'} ${Math.abs(c)}.`)],
        [ex([[a + c, u], [b - d, '']]), L(lang, 'Konstantanya perlu dihitung dengan tandanya masing-masing.', 'Combine the constants using their own signs.')],
        [ex([[a + c + b + d, u]]), L(lang, `Suku ber-${u} dan konstanta tidak sejenis, jadi tidak bisa digabung.`, `Terms with ${u} and constants are not like terms, so they cannot be combined.`)],
        [ex([[a + c, u], [Math.abs(b) + Math.abs(d), '']]), L(lang, 'Tanda negatif konstanta terlupa.', 'A negative sign on a constant was forgotten.')],
      ],
      [L(lang, `Kelompokkan suku sejenis: (${ex([[a, u], [c, u]])}) + (${ex([[b, ''], [d, '']])}).`, `Group like terms: (${ex([[a, u], [c, u]])}) + (${ex([[b, ''], [d, '']])}).`), ex([[a + c, u], [b + d, '']])],
      { a, b, c, d, u },
    );
  },
  (m) => ex([[m.a + m.c, m.u], [m.b + m.d, '']]),
);

const addSubAlg = withSolve(
  (rnd, lang) => {
    const u = pick(rnd, ['x', 'a', 'p', 'y']);
    const a = ri(rnd, 2, 9);
    let c = ri(rnd, 1, 8);
    while (c === a) c = ri(rnd, 1, 8);
    const b = nz(rnd, -9, 9);
    let d = nz(rnd, -9, 9);
    while (d === b || d === -b) d = nz(rnd, -9, 9);
    const minus = rnd() < 0.65;
    const A = ex([[a, u], [b, '']]);
    const B = ex([[c, u], [d, '']]);
    const okT = minus ? ex([[a - c, u], [b - d, '']]) : ex([[a + c, u], [b + d, '']]);
    return mc(
      `(${A}) ${minus ? '−' : '+'} (${B}) = …`,
      okT,
      minus
        ? [
            [ex([[a - c, u], [b + d, '']]), L(lang, `Tanda minus di depan kurung mengubah tanda semua suku di dalamnya, termasuk ${M(lang, d)}.`, `The minus sign before the bracket changes the sign of every term inside, including ${M(lang, d)}.`)],
            [ex([[a + c, u], [b - d, '']]), L(lang, `Suku ${c}${u} juga ikut dikurangkan.`, `The ${c}${u} term must be subtracted too.`)],
            [ex([[a + c, u], [b + d, '']]), L(lang, 'Itu penjumlahan. Soal ini pengurangan.', 'That is addition. This question is subtraction.')],
          ]
        : [
            [ex([[a + c, u], [b - d, '']]), L(lang, 'Konstanta dijumlahkan dengan tandanya masing-masing.', 'Add the constants with their own signs.')],
            [ex([[a - c, u], [b - d, '']]), L(lang, 'Itu pengurangan. Soal ini penjumlahan.', 'That is subtraction. This question is addition.')],
            [ex([[a + c + b + d, u]]), L(lang, 'Suku ber-variabel dan konstanta tidak sejenis.', 'Variable terms and constants are not like terms.')],
          ],
      [minus ? `= ${A} ${plus(ex([[-c, u], [-d, '']]))}` : `= ${A} + ${B}`, `= ${okT}`],
      { a, b, c, d, u, minus },
    );
  },
  (m) => {
    const s = m.minus ? -1 : 1;
    return ex([[m.a + s * m.c, m.u], [m.b + s * m.d, '']]);
  },
);

const evalAlg = withSolve(
  (rnd, lang) => {
    const x = nz(rnd, -5, 6);
    const a = ri(rnd, 2, 6);
    const b = nz(rnd, -9, 9);
    let c = ri(rnd, 1, 5);
    while (c === a) c = ri(rnd, 1, 5);
    const d = nz(rnd, -9, 9);
    const A = ex([[a, 'x'], [b, '']]);
    const B = ex([[c, 'x'], [d, '']]);
    const r = a * x + b - (c * x + d);
    return num(
      L(lang, `Jika x = ${M(lang, x)}, nilai dari (${A}) − (${B}) adalah …`, `If x = ${M(lang, x)}, what is the value of (${A}) − (${B})?`),
      r,
      [
        [a * x + b - c * x + d, L(lang, `Tanda minus di depan kurung juga berlaku untuk ${M(lang, d)}.`, `The minus before the bracket also applies to ${M(lang, d)}.`)],
        [a * x + b + c * x + d, L(lang, 'Itu dijumlahkan. Soal meminta pengurangan.', 'That adds them. The question asks for subtraction.')],
      ],
      [L(lang, `Sederhanakan dulu: ${ex([[a - c, 'x'], [b - d, '']])}.`, `Simplify first: ${ex([[a - c, 'x'], [b - d, '']])}.`), `${M(lang, a - c)} × ${P(lang, x)}${b - d ? ` ${b - d < 0 ? '−' : '+'} ${Math.abs(b - d)}` : ''} = ${M(lang, r)}`],
      { x, a, b, c, d },
    );
  },
  (m) => D(m.a * m.x + m.b - m.c * m.x - m.d),
);

const distrib = withSolve(
  (rnd, lang) => {
    const u = pick(rnd, ['x', 'y', 'a', 'm']);
    const k = nz(rnd, -7, 9);
    const a = ri(rnd, 1, 6);
    const b = nz(rnd, -9, 9);
    const flipFirst = rnd() < 0.3;
    const inner = flipFirst ? ex([[b, ''], [-a, u]]) : ex([[a, u], [b, '']]);
    const A = flipFirst ? -a : a;
    const ord = (t1, t2) => (flipFirst ? ex([t2, t1]) : ex([t1, t2]));
    return mc(
      `${k === -1 ? '−' : k === 1 ? '' : M(lang, k)}(${inner}) = …`,
      ord([k * A, u], [k * b, '']),
      [
        [ord([k * A, u], [b, '']), L(lang, `${M(lang, k)} harus dikalikan ke semua suku di dalam kurung.`, `${M(lang, k)} must multiply every term inside the bracket.`)],
        [ord([k * A, u], [-k * b, '']), L(lang, 'Aturan tanda perkalian: tanda sama positif, tanda berbeda negatif.', 'Sign rule: same signs give positive, different signs give negative.')],
        [ord([-k * A, u], [k * b, '']), L(lang, 'Tanda suku pertama keliru.', 'The sign of the first term is wrong.')],
        [ord([k + A, u], [k + b, '']), L(lang, 'Itu dijumlahkan. Bilangan di luar kurung dikalikan.', 'That adds. The number outside the bracket multiplies.')],
      ],
      [L(lang, `Kalikan ${M(lang, k)} ke setiap suku.`, `Multiply each term by ${M(lang, k)}.`), `= ${ord([k * A, u], [k * b, ''])}`],
      { k, a: A, b, u, flipFirst },
    );
  },
  (m) => {
    const t1 = [m.k * m.a, m.u];
    const t2 = [m.k * m.b, ''];
    return m.flipFirst ? ex([t2, t1]) : ex([t1, t2]);
  },
);

const binom = withSolve(
  (rnd, lang) => {
    const u = pick(rnd, ['x', 'a', 'y']);
    const p = nz(rnd, -7, 9);
    let q = nz(rnd, -7, 9);
    while (p + q === 0) q = nz(rnd, -7, 9);
    const f = (r) => `(${ex([[1, u], [r, '']])})`;
    const sq = `${u}²`;
    return mc(
      `${f(p)}${f(q)} = …`,
      ex([[1, sq], [p + q, u], [p * q, '']]),
      [
        [ex([[1, sq], [p * q, '']]), L(lang, `Suku tengah terlupa: ${u} × ${M(lang, q)} dan ${M(lang, p)} × ${u}.`, `The middle term is missing: ${u} × ${M(lang, q)} and ${M(lang, p)} × ${u}.`)],
        [ex([[1, sq], [p + q, u], [p + q, '']]), L(lang, `Suku konstanta adalah hasil kali ${M(lang, p)} × ${M(lang, q)}, bukan jumlahnya.`, `The constant is ${M(lang, p)} × ${M(lang, q)}, not their sum.`)],
        [ex([[1, sq], [p * q, u], [p + q, '']]), L(lang, 'Koefisien suku tengah adalah jumlah, konstanta adalah hasil kali.', 'The middle coefficient is the sum; the constant is the product.')],
        [ex([[2, u], [p + q, '']]), L(lang, `${u} × ${u} = ${sq}, bukan 2${u}.`, `${u} × ${u} = ${sq}, not 2${u}.`)],
      ],
      [`${u} × ${u} + ${u} × ${P(lang, q)} + ${P(lang, p)} × ${u} + ${P(lang, p)} × ${P(lang, q)}`, `= ${ex([[1, sq], [p + q, u], [p * q, '']])}`],
      { p, q, u },
    );
  },
  (m) => ex([[1, `${m.u}²`], [m.p + m.q, m.u], [m.p * m.q, '']]),
);

// ================= Bab 4: Persamaan dan Pertidaksamaan =================
const lin1 = withSolve(
  (rnd, lang) => {
    const x = nz(rnd, -9, 12);
    const a = ri(rnd, 1, 9);
    const b = nz(rnd, -15, 15);
    const c = a * x + b;
    return num(
      L(lang, `Jika ${ex([[a, 'x'], [b, '']])} = ${M(lang, c)}, maka x = …`, `If ${ex([[a, 'x'], [b, '']])} = ${M(lang, c)}, then x = …`),
      x,
      [
        [a === 1 ? null : (c + b) / a, L(lang, `Saat ${M(lang, b)} dipindah ruas, tandanya berubah. Kurangi kedua ruas dengan ${P(lang, b)}.`, `When ${M(lang, b)} moves across, its sign changes. Subtract ${P(lang, b)} from both sides.`)],
        [a === 1 ? c + b : null, L(lang, `Kedua ruas dikurangi ${P(lang, b)}, bukan ditambah.`, `Subtract ${P(lang, b)} from both sides, do not add.`)],
        [a === 1 ? null : c - b, L(lang, `Setelah itu, kedua ruas masih harus dibagi ${a}.`, `Then both sides still need to be divided by ${a}.`)],
        [-x, L(lang, 'Tanda hasilnya terbalik.', 'The sign of the answer is flipped.')],
      ],
      [moveB(lang, b, `${ex([[a, 'x']])} = ${M(lang, c - b)}`), a === 1 ? `x = ${M(lang, x)}` : L(lang, `Bagi kedua ruas dengan ${a}: x = ${M(lang, x)}.`, `Divide both sides by ${a}: x = ${M(lang, x)}.`)],
      { a, b, c },
    );
  },
  (m) => D((m.c - m.b) / m.a),
);

const lin2 = withSolve(
  (rnd, lang) => {
    const x = nz(rnd, -8, 9);
    const a = ri(rnd, 2, 9);
    let c = ri(rnd, 1, 8);
    while (c === a) c = ri(rnd, 1, 8);
    const b = nz(rnd, -12, 12);
    const d = (a - c) * x + b;
    const brk = rnd() < 0.35;
    if (brk) {
      // k(x + h) = r
      const k = ri(rnd, 2, 6);
      const h = nz(rnd, -6, 6);
      const r = k * (x + h);
      return num(
        L(lang, `Nilai x yang memenuhi ${k}(${ex([[1, 'x'], [h, '']])}) = ${M(lang, r)} adalah …`, `Find x if ${k}(${ex([[1, 'x'], [h, '']])}) = ${M(lang, r)}.`),
        x,
        [
          [(r - h) / k, L(lang, `Kurung dibuka dulu: ${k} dikalikan ke x dan ke ${M(lang, h)}.`, `Expand the bracket first: ${k} multiplies both x and ${M(lang, h)}.`)],
          [r / k + h, L(lang, `Setelah dibagi ${k}, ${M(lang, h)} dipindah dengan tanda berlawanan.`, `After dividing by ${k}, move ${M(lang, h)} with the opposite sign.`)],
        ],
        [L(lang, `Bagi kedua ruas dengan ${k}: ${ex([[1, 'x'], [h, '']])} = ${M(lang, r / k)}.`, `Divide both sides by ${k}: ${ex([[1, 'x'], [h, '']])} = ${M(lang, r / k)}.`), `x = ${M(lang, x)}`],
        { k, h, r, brk },
      );
    }
    return num(
      L(lang, `Penyelesaian dari ${ex([[a, 'x'], [b, '']])} = ${ex([[c, 'x'], [d, '']])} adalah x = …`, `Solve ${ex([[a, 'x'], [b, '']])} = ${ex([[c, 'x'], [d, '']])}. x = …`),
      x,
      [
        [-x, L(lang, 'Ada tanda yang tidak berubah saat suku dipindah ruas.', 'A sign was not changed when a term moved across.')],
        [(d - b) / (a + c), L(lang, `${c}x dipindah ke kiri menjadi −${c}x, jadi koefisiennya ${a} − ${c}.`, `Moving ${c}x to the left gives −${c}x, so the coefficient is ${a} − ${c}.`)],
        [(d + b) / (a - c), L(lang, `${M(lang, b)} dipindah ke kanan menjadi ${M(lang, -b)}.`, `Moving ${M(lang, b)} to the right gives ${M(lang, -b)}.`)],
      ],
      [L(lang, `Kumpulkan suku x di kiri dan konstanta di kanan: ${ex([[a - c, 'x']])} = ${M(lang, d - b)}.`, `Collect x terms on the left and numbers on the right: ${ex([[a - c, 'x']])} = ${M(lang, d - b)}.`), a - c === 1 ? `x = ${M(lang, x)}` : `x = ${M(lang, d - b)} ÷ ${P(lang, a - c)} = ${M(lang, x)}`],
      { a, b, c, d, brk },
    );
  },
  (m) => D(m.brk ? m.r / m.k - m.h : (m.d - m.b) / (m.a - m.c)),
);

const consec = withSolve(
  (rnd, lang) => {
    const even = ri(rnd, 0, 2);
    const n = even === 2 ? ri(rnd, 3, 40) : 2 * ri(rnd, 2, 30) + (even === 1 ? 1 : 0);
    const st = even === 2 ? 1 : 2;
    const S = 3 * n + 3 * st;
    const big = rnd() < 0.3;
    const kind = [L(lang, 'genap', 'even'), L(lang, 'ganjil', 'odd'), ''][even];
    return num(
      L(lang, `Jumlah tiga bilangan ${kind ? kind + ' ' : 'bulat '}berurutan adalah ${S}. Bilangan yang ${big ? 'terbesar' : 'terkecil'} adalah …`, `Three consecutive ${kind ? kind + ' ' : ''}numbers add up to ${S}. What is the ${big ? 'largest' : 'smallest'} number?`),
      big ? n + 2 * st : n,
      [
        [n + st, L(lang, 'Itu bilangan yang tengah.', 'That is the middle number.')],
        [st === 2 ? (big ? n + 3 : n + 1) : null, L(lang, `Bilangan ${kind} berurutan selisihnya 2, bukan 1.`, `Consecutive ${kind} numbers differ by 2, not 1.`)],
        [big ? n : n + 2 * st, L(lang, big ? 'Itu yang terkecil.' : 'Itu yang terbesar.', big ? 'That is the smallest.' : 'That is the largest.')],
      ],
      [L(lang, `Misalkan bilangannya n, n + ${st}, n + ${2 * st}. Jumlahnya 3n + ${3 * st} = ${S}.`, `Call them n, n + ${st}, n + ${2 * st}. Their sum is 3n + ${3 * st} = ${S}.`), L(lang, `3n = ${S - 3 * st}, n = ${n}. Bilangannya ${n}, ${n + st}, ${n + 2 * st}.`, `3n = ${S - 3 * st}, n = ${n}. The numbers are ${n}, ${n + st}, ${n + 2 * st}.`)],
      { S, st, big },
    );
  },
  (m) => D(m.S / 3 + (m.big ? m.st : -m.st)),
);

const FLIP = { '>': '<', '<': '>', '≥': '≤', '≤': '≥' };
const ineq = withSolve(
  (rnd, lang) => {
    const k = nz(rnd, -6, 8);
    let a = nz(rnd, -6, 6);
    if (Math.abs(a) === 1) a *= 2;
    const b = rnd() < 0.3 ? 0 : nz(rnd, -10, 10);
    const c = a * k + b;
    const op = pick(rnd, ['>', '<', '≥', '≤']);
    const sol = a < 0 ? FLIP[op] : op;
    const strict = { '>': '≥', '<': '≤', '≥': '>', '≤': '<' };
    return mc(
      L(lang, `Penyelesaian dari ${ex([[a, 'x'], [b, '']])} ${op} ${M(lang, c)} adalah …`, `Solve ${ex([[a, 'x'], [b, '']])} ${op} ${M(lang, c)}.`),
      `x ${sol} ${M(lang, k)}`,
      [
        [`x ${FLIP[sol]} ${M(lang, k)}`, a < 0 ? L(lang, 'Saat kedua ruas dibagi bilangan negatif, tanda pertidaksamaan harus dibalik.', 'When dividing both sides by a negative number, the inequality sign must flip.') : L(lang, 'Membagi dengan bilangan positif tidak membalik tanda.', 'Dividing by a positive number does not flip the sign.')],
        [`x ${sol} ${M(lang, -k)}`, L(lang, 'Tanda bilangannya keliru saat memindahkan atau membagi.', 'The sign of the number went wrong when moving or dividing.')],
        [`x ${strict[sol]} ${M(lang, k)}`, L(lang, `Tanda ${op} ${op === '>' || op === '<' ? 'tidak memuat' : 'memuat'} kesamaan, jadi jenis tandanya tetap.`, `The sign ${op} ${op === '>' || op === '<' ? 'does not include' : 'includes'} equality, so that part stays the same.`)],
        [b ? `x ${sol} ${M(lang, (c + b) / a)}` : null, L(lang, `${M(lang, b)} dipindah ruas dengan tanda berlawanan.`, `Move ${M(lang, b)} across with the opposite sign.`)],
      ],
      [b ? moveB(lang, b, `${ex([[a, 'x']])} ${op} ${M(lang, c - b)}`) : L(lang, 'Tidak ada konstanta di ruas kiri.', 'There is no constant on the left.'), a < 0 ? L(lang, `Bagi dengan ${M(lang, a)} (negatif), tanda dibalik: x ${sol} ${M(lang, k)}.`, `Divide by ${M(lang, a)} (negative) and flip the sign: x ${sol} ${M(lang, k)}.`) : L(lang, `Bagi dengan ${a}: x ${sol} ${M(lang, k)}.`, `Divide by ${a}: x ${sol} ${M(lang, k)}.`)],
      { a, b, c, op },
    );
  },
  (m, lang) => {
    const k = (m.c - m.b) / m.a;
    const s = m.a < 0 ? { '>': '<', '<': '>', '≥': '≤', '≤': '≥' }[m.op] : m.op;
    return `x ${s} ${M(lang, k)}`;
  },
);

const lift = withSolve(
  (rnd, lang) => {
    const C = pick(rnd, [300, 400, 450, 500, 600, 750, 800, 1000]);
    const w = ri(rnd, 50, 80);
    const m = pick(rnd, [15, 20, 25, 30, 35, 40, 45]);
    const n = Math.floor((C - w) / m);
    const nm = pick(rnd, NAMES);
    return num(
      L(lang, `Lift dapat mengangkut paling banyak ${C} kg. ${nm} (${w} kg) membawa kotak-kotak yang masing-masing ${m} kg. Paling banyak berapa kotak yang bisa ikut?`, `A lift can carry at most ${C} kg. ${nm} (${w} kg) is moving boxes of ${m} kg each. At most how many boxes can go in the lift?`),
      n,
      [
        [(C - w) % m ? n + 1 : null, L(lang, `${n + 1} kotak membuat beban ${w + (n + 1) * m} kg, melebihi ${C} kg. Bulatkan ke bawah.`, `${n + 1} boxes make ${w + (n + 1) * m} kg, more than ${C} kg. Round down.`)],
        [Math.floor(C / m), L(lang, `Berat ${nm} juga harus dihitung.`, `${nm}'s own weight counts too.`)],
      ],
      [`${w} + ${m}n ≤ ${C}  →  ${m}n ≤ ${C - w}`, L(lang, `n ≤ ${M(lang, Math.round(((C - w) / m) * 100) / 100)}, jadi paling banyak ${n} kotak.`, `n ≤ ${M(lang, Math.round(((C - w) / m) * 100) / 100)}, so at most ${n} boxes.`)],
      { C, w, m },
    );
  },
  (m) => {
    let n = 0;
    while (m.w + (n + 1) * m.m <= m.C) n++;
    return D(n);
  },
);

// ================= Bab 5: Rasio dan Perbandingan =================
const ratioSimp = withSolve(
  (rnd, lang) => {
    const [p, q] = coprime(rnd, 2, 9);
    const units = rnd() < 0.35;
    if (units) {
      const kind = pick(rnd, [[100, 'cm', 'm'], [1000, 'g', 'kg'], [60, L(lang, 'menit', 'minutes'), L(lang, 'jam', 'hours')]]);
      // a (small unit) : b (big unit) with a = p*t, b*conv = q*t
      const conv = kind[0];
      let b = ri(rnd, 1, 5);
      let t = (b * conv) / q;
      let tries = 0;
      while (!Number.isInteger(t) && tries++ < 30) {
        b = ri(rnd, 1, 5);
        t = (b * conv) / q;
      }
      if (!Number.isInteger(t)) {
        b = q;
        t = conv;
      }
      const a = p * t;
      return mc(
        L(lang, `Rasio ${a} ${kind[1]} : ${b} ${kind[2]} dalam bentuk paling sederhana adalah …`, `Write the ratio ${a} ${kind[1]} : ${b} ${kind[2]} in simplest form.`),
        `${p} : ${q}`,
        [
          [`${a / gcd(a, b)} : ${b / gcd(a, b)}`, L(lang, 'Satuannya harus disamakan dulu.', 'The units must be made the same first.')],
          [`${q} : ${p}`, L(lang, 'Urutannya tertukar.', 'The order is swapped.')],
          [`${p} : ${q * 10}`, L(lang, `Periksa lagi: 1 ${kind[2]} = ${conv} ${kind[1]}.`, `Check again: 1 ${kind[2]} = ${conv} ${kind[1]}.`)],
        ],
        [L(lang, `Samakan satuan: ${b} ${kind[2]} = ${b * conv} ${kind[1]}.`, `Same units: ${b} ${kind[2]} = ${b * conv} ${kind[1]}.`), L(lang, `${a} : ${b * conv}, bagi dengan FPB ${gcd(a, b * conv)}: ${p} : ${q}.`, `${a} : ${b * conv}, divide by the GCF ${gcd(a, b * conv)}: ${p} : ${q}.`)],
        { a, b: b * conv },
      );
    }
    const k = ri(rnd, 2, 12);
    const h = gcd(k, 6) > 1 && k > 2 ? gcd(k, 6) : null;
    return mc(
      L(lang, `Bentuk paling sederhana dari ${k * p} : ${k * q} adalah …`, `Write ${k * p} : ${k * q} in simplest form.`),
      `${p} : ${q}`,
      [
        [`${q} : ${p}`, L(lang, 'Urutannya tertukar.', 'The order is swapped.')],
        [h && h !== k ? `${(k * p) / h} : ${(k * q) / h}` : null, L(lang, 'Masih bisa disederhanakan lagi. Bagi dengan FPB-nya.', 'It can still be simplified. Divide by the GCF.')],
        [`${p + 1} : ${q + 1}`, L(lang, 'Rasio disederhanakan dengan membagi kedua bilangan dengan bilangan yang sama.', 'A ratio is simplified by dividing both numbers by the same number.')],
        [`${k * q} : ${k * p}`, L(lang, 'Urutannya tertukar dan belum disederhanakan.', 'The order is swapped and it is not simplified.')],
      ],
      [L(lang, `FPB dari ${k * p} dan ${k * q} adalah ${k}.`, `The GCF of ${k * p} and ${k * q} is ${k}.`), `${k * p} : ${k * q} = ${p} : ${q}`],
      { a: k * p, b: k * q },
    );
  },
  (m) => `${m.a / gcd(m.a, m.b)} : ${m.b / gcd(m.a, m.b)}`,
);

const ratioPart = withSolve(
  (rnd, lang) => {
    const [p, q] = coprime(rnd, 2, 9);
    const k = ri(rnd, 2, 12);
    const diff = rnd() < 0.4;
    const [n1, n2] = two(rnd);
    const fruit = pick(rnd, [['apel', 'jeruk', 'apples', 'oranges'], ['kelereng merah', 'kelereng biru', 'red marbles', 'blue marbles'], ['siswa putra', 'siswa putri', 'boys', 'girls']]);
    if (diff) {
      const [P1, Q1] = p > q ? [p, q] : [q, p];
      const u = pick(rnd, [1000, 2000, 5000]);
      return num(
        L(lang, `Rasio uang ${n1} dan ${n2} ${P1} : ${Q1}. Uang ${n1} ${rp(lang, k * (P1 - Q1) * u)} lebih banyak dari uang ${n2}. Uang ${n2} adalah Rp …`, `The ratio of ${n1}'s money to ${n2}'s is ${P1} : ${Q1}. ${n1} has ${rp(lang, k * (P1 - Q1) * u)} more than ${n2}. How much does ${n2} have, in Rp?`),
        k * Q1 * u,
        [
          [k * P1 * u, L(lang, `Itu uang ${n1}.`, `That is ${n1}'s money.`)],
          [k * (P1 + Q1) * u, L(lang, 'Itu jumlah uang keduanya.', 'That is their total.')],
          [k * (P1 - Q1) * u * Q1, L(lang, `Selisih ${P1 - Q1} bagian bernilai ${rp(lang, k * (P1 - Q1) * u)}. Cari dulu nilai 1 bagian.`, `The difference of ${P1 - Q1} parts is worth ${rp(lang, k * (P1 - Q1) * u)}. Find 1 part first.`)],
        ],
        [L(lang, `Selisih rasio ${P1} − ${Q1} = ${P1 - Q1} bagian = ${rp(lang, k * (P1 - Q1) * u)}, jadi 1 bagian = ${rp(lang, k * u)}.`, `The ratio difference is ${P1} − ${Q1} = ${P1 - Q1} parts = ${rp(lang, k * (P1 - Q1) * u)}, so 1 part = ${rp(lang, k * u)}.`), L(lang, `Uang ${n2} = ${Q1} × ${rp(lang, k * u)} = ${rp(lang, k * Q1 * u)}.`, `${n2}'s money = ${Q1} × ${rp(lang, k * u)} = ${rp(lang, k * Q1 * u)}.`)],
        { diff, P1, Q1, D: k * (P1 - Q1) * u },
      );
    }
    const T = k * (p + q);
    const askSecond = rnd() < 0.5;
    return num(
      L(lang, `Rasio ${fruit[0]} dan ${fruit[1]} ${p} : ${q}. Jumlah seluruhnya ${T}. Banyak ${askSecond ? fruit[1] : fruit[0]} adalah …`, `The ratio of ${fruit[2]} to ${fruit[3]} is ${p} : ${q}. There are ${T} altogether. How many ${askSecond ? fruit[3] : fruit[2]} are there?`),
      k * (askSecond ? q : p),
      [
        [k * (askSecond ? p : q), L(lang, 'Itu banyak yang satunya lagi.', 'That is the other group.')],
        [Number.isInteger(T / (askSecond ? q : p)) ? T / (askSecond ? q : p) : null, L(lang, `Bagi dulu ${T} dengan jumlah bagian ${p + q}.`, `First divide ${T} by the total parts ${p + q}.`)],
        [(askSecond ? q : p) * T, L(lang, 'Kalikan dengan nilai satu bagian, bukan dengan jumlah seluruhnya.', 'Multiply by the value of one part, not by the total.')],
      ],
      [L(lang, `Jumlah bagian ${p} + ${q} = ${p + q}, jadi 1 bagian = ${T} ÷ ${p + q} = ${k}.`, `Total parts ${p} + ${q} = ${p + q}, so 1 part = ${T} ÷ ${p + q} = ${k}.`), `${askSecond ? q : p} × ${k} = ${k * (askSecond ? q : p)}`],
      { diff, p, q, T, askSecond },
    );
  },
  (m) => (m.diff ? D((m.D / (m.P1 - m.Q1)) * m.Q1) : D((m.T * (m.askSecond ? m.q : m.p)) / (m.p + m.q))),
);

const direct = withSolve(
  (rnd, lang) => {
    const ctx = pick(rnd, [
      ['kg beras', 'kg of rice', 'Harga', 'cost', 14000, 'rp'],
      ['buku tulis', 'exercise books', 'Harga', 'cost', 4500, 'rp'],
      ['liter bensin', 'litres of petrol', 'Jarak tempuh dengan', 'distance travelled on', 12, 'km'],
      ['porsi kue', 'portions of cake', 'Tepung untuk', 'flour needed for', 75, 'g'],
    ]);
    let n1 = ri(rnd, 2, 8);
    let n2 = ri(rnd, 3, 15);
    while (n2 === n1) n2 = ri(rnd, 3, 15);
    const u = ctx[4] * (ctx[5] === 'rp' ? 1 : ri(rnd, 1, 2));
    const v1 = n1 * u;
    const fmt = (x) => (ctx[5] === 'rp' ? rp(lang, x) : `${G(lang, x)} ${ctx[5]}`);
    return num(
      L(lang, `${ctx[2]} ${n1} ${ctx[0]} adalah ${fmt(v1)}. ${ctx[2]} ${n2} ${ctx[0]} adalah ${ctx[5] === 'rp' ? 'Rp …' : '… ' + ctx[5]}`, ctx[5] === 'rp' ? `${n1} ${ctx[1]} ${ctx[3]} ${fmt(v1)}. How much do ${n2} ${ctx[1]} cost, in Rp?` : `The ${ctx[3]} ${n1} ${ctx[1]} is ${fmt(v1)}. What is the ${ctx[3]} ${n2} ${ctx[1]}, in ${ctx[5]}?`),
      n2 * u,
      [
        [v1 + (n2 - n1), L(lang, 'Perbandingan senilai dihitung dengan perkalian, bukan menambah selisihnya.', 'Direct proportion uses multiplication, not adding the difference.')],
        [Number.isInteger((v1 * n1) / n2) ? (v1 * n1) / n2 : null, L(lang, 'Itu cara berbalik nilai. Di sini makin banyak, makin besar.', 'That is inverse proportion. Here more items means more.')],
        [u, L(lang, 'Itu nilai untuk 1 saja.', 'That is the value for just 1.')],
      ],
      [L(lang, `Nilai untuk 1: ${fmt(v1)} ÷ ${n1} = ${fmt(u)}.`, `For 1: ${fmt(v1)} ÷ ${n1} = ${fmt(u)}.`), L(lang, `Untuk ${n2}: ${n2} × ${fmt(u)} = ${fmt(n2 * u)}.`, `For ${n2}: ${n2} × ${fmt(u)} = ${fmt(n2 * u)}.`)],
      { n1, v1, n2 },
    );
  },
  (m) => D((m.v1 / m.n1) * m.n2),
);

const mapDirect = withSolve(
  (rnd, lang) => {
    const a = ri(rnd, 2, 5);
    const b = ri(rnd, 3, 12);
    let c = ri(rnd, 3, 15);
    while (c === a || ((c * b) / a) * 10 !== Math.round(((c * b) / a) * 10)) c = ri(rnd, 3, 15);
    return num(
      L(lang, `Pada sebuah peta, ${a} cm mewakili ${b} km. Jarak ${c} cm pada peta itu mewakili … km`, `On a map, ${a} cm represents ${b} km. What distance in km does ${c} cm represent?`),
      (c * b) / a,
      [
        [c * b, L(lang, `${a} cm (bukan 1 cm) yang mewakili ${b} km. Bagi dulu dengan ${a}.`, `${a} cm (not 1 cm) stands for ${b} km. Divide by ${a} first.`)],
        [b + c - a, L(lang, 'Perbandingan senilai memakai perkalian, bukan menambah selisih.', 'Direct proportion uses multiplication, not adding the difference.')],
      ],
      [`${c}/${a} × ${b}`, `= ${M(lang, (c * b) / a)} km`],
      { a, b, c },
    );
  },
  (m) => D((m.b / m.a) * m.c),
);

const inverse = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 1) {
      const SP = [30, 40, 45, 50, 60, 75, 80, 90, 100, 120];
      let v1;
      let v2;
      let t1;
      do {
        v1 = pick(rnd, SP);
        v2 = pick(rnd, SP);
        t1 = (lcm(v1, v2) / v1) * ri(rnd, 1, 3);
      } while (v1 === v2 || t1 > 8);
      const D_ = t1 * v1;
      return num(
        L(lang, `Dengan kecepatan ${v1} km/jam, sebuah perjalanan ditempuh dalam ${t1} jam. Jika kecepatannya ${v2} km/jam, waktu tempuhnya … jam`, `At ${v1} km/h a journey takes ${t1} hours. At ${v2} km/h, how many hours does it take?`),
        D_ / v2,
        [
          [Number.isInteger((t1 * v2) / v1 * 10) ? (t1 * v2) / v1 : null, L(lang, 'Makin cepat, makin singkat waktunya. Ini perbandingan berbalik nilai.', 'Faster means less time. This is inverse proportion.')],
          [D_, L(lang, 'Itu jaraknya. Bagi jarak dengan kecepatan baru.', 'That is the distance. Divide it by the new speed.')],
        ],
        [L(lang, `Jarak = ${v1} × ${t1} = ${D_} km.`, `Distance = ${v1} × ${t1} = ${D_} km.`), L(lang, `Waktu = ${D_} ÷ ${v2} = ${M(lang, D_ / v2)} jam.`, `Time = ${D_} ÷ ${v2} = ${M(lang, D_ / v2)} hours.`)],
        { kind, a1: v1, b1: t1, a2: v2 },
      );
    }
    let w1;
    let w2;
    let tot;
    do {
      w1 = ri(rnd, 3, 15);
      w2 = ri(rnd, 3, 20);
      tot = lcm(w1, w2) * ri(rnd, 1, 4);
    } while (w1 === w2 || tot / w1 > 40 || tot / w2 > 40 || tot / w1 < 2 || tot / w2 < 2);
    const d1 = tot / w1;
    const d2 = tot / w2;
    const job = pick(rnd, [['membangun sebuah pos ronda', 'build a guard post'], ['mengecat pagar sekolah', 'paint the school fence'], ['memanen sawah', 'harvest a rice field']]);
    if (kind === 2 && w2 > w1)
      return num(
        L(lang, `Pekerjaan ${job[0]} selesai dalam ${d1} hari oleh ${w1} orang. Agar selesai dalam ${d2} hari, diperlukan tambahan pekerja sebanyak … orang`, `${w1} workers can ${job[1]} in ${d1} days. To finish in ${d2} days, how many extra workers are needed?`),
        w2 - w1,
        [
          [w2, L(lang, `${w2} adalah jumlah pekerja seluruhnya. Yang ditanya tambahannya.`, `${w2} is the total number of workers. The question asks for the extra ones.`)],
          [Number.isInteger((w1 * d2) / d1) ? (w1 * d2) / d1 : null, L(lang, 'Ini perbandingan berbalik nilai: makin cepat selesai, makin banyak pekerja.', 'This is inverse proportion: finishing faster needs more workers.')],
        ],
        [L(lang, `${w1} × ${d1} = ${tot} hari-orang. Untuk ${d2} hari: ${tot} ÷ ${d2} = ${w2} orang.`, `${w1} × ${d1} = ${tot} worker-days. For ${d2} days: ${tot} ÷ ${d2} = ${w2} workers.`), L(lang, `Tambahan: ${w2} − ${w1} = ${w2 - w1} orang.`, `Extra: ${w2} − ${w1} = ${w2 - w1} workers.`)],
        { kind: 2, a1: w1, b1: d1, b2: d2 },
      );
    return num(
      L(lang, `${w1} orang dapat ${job[0]} dalam ${d1} hari. Jika dikerjakan ${w2} orang, pekerjaan itu selesai dalam … hari`, `${w1} people can ${job[1]} in ${d1} days. How many days would ${w2} people take?`),
      d2,
      [
        [Number.isInteger((d1 * w2) / w1) ? (d1 * w2) / w1 : null, L(lang, 'Ini perbandingan berbalik nilai: makin banyak pekerja, makin cepat selesai.', 'This is inverse proportion: more workers means fewer days.')],
        [tot, L(lang, `${tot} adalah total hari-orang. Bagi dengan ${w2}.`, `${tot} is the total worker-days. Divide by ${w2}.`)],
      ],
      [L(lang, `${w1} × ${d1} = ${tot} hari-orang.`, `${w1} × ${d1} = ${tot} worker-days.`), `${tot} ÷ ${w2} = ${d2}`],
      { kind: 0, a1: w1, b1: d1, a2: w2 },
    );
  },
  (m) => D(m.kind === 2 ? (m.a1 * m.b1) / m.b2 - m.a1 : (m.a1 * m.b1) / m.a2),
);

const SCALES = [1000, 2000, 5000, 10000, 50000, 100000, 200000, 250000, 400000, 500000, 1000000, 1500000, 2000000, 2500000];
const scale = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const S = pick(rnd, SCALES.filter((s) => s >= 100000));
      const cm = ri(rnd, 2, 12);
      return num(
        L(lang, `Skala peta 1 : ${G(lang, S)}. Jarak dua kota di peta ${cm} cm. Jarak sebenarnya … km`, `A map has scale 1 : ${G(lang, S)}. Two towns are ${cm} cm apart on the map. What is the real distance in km?`),
        (cm * S) / 100000,
        [
          [cm * S, L(lang, 'Itu masih dalam cm. 1 km = 100.000 cm.', 'That is still in cm. 1 km = 100,000 cm.')],
          [(cm * S) / 1000, L(lang, 'Periksa konversinya: 1 km = 100.000 cm.', 'Check the conversion: 1 km = 100,000 cm.')],
        ],
        [L(lang, `Jarak sebenarnya = ${cm} × ${G(lang, S)} = ${G(lang, cm * S)} cm.`, `Real distance = ${cm} × ${G(lang, S)} = ${G(lang, cm * S)} cm.`), L(lang, `${G(lang, cm * S)} cm = ${M(lang, (cm * S) / 100000)} km.`, `${G(lang, cm * S)} cm = ${M(lang, (cm * S) / 100000)} km.`)],
        { kind, S, cm },
      );
    }
    if (kind === 1) {
      const S = pick(rnd, [500, 1000, 2000, 2500, 5000]);
      const cm = ri(rnd, 2, 12);
      const real = (cm * S) / 100;
      const thing = pick(rnd, [['Lapangan', 'A field'], ['Gedung sekolah', 'A school building'], ['Kolam renang', 'A swimming pool']]);
      return num(
        L(lang, `${thing[0]} sepanjang ${G(lang, real)} m digambar dengan skala 1 : ${G(lang, S)}. Panjangnya pada gambar adalah … cm`, `${thing[1]} ${G(lang, real)} m long is drawn with scale 1 : ${G(lang, S)}. How long is it in the drawing, in cm?`),
        cm,
        [
          [real / S, L(lang, 'Ubah meter ke cm dulu: 1 m = 100 cm.', 'Convert metres to cm first: 1 m = 100 cm.')],
          [real * S, L(lang, 'Ukuran pada gambar lebih kecil, jadi dibagi skala, bukan dikali.', 'The drawing is smaller, so divide by the scale, do not multiply.')],
        ],
        [`${G(lang, real)} m = ${G(lang, real * 100)} cm`, `${G(lang, real * 100)} ÷ ${G(lang, S)} = ${cm} cm`],
        { kind, S, real },
      );
    }
    const S = pick(rnd, SCALES.filter((s) => s >= 100000));
    const cm = ri(rnd, 2, 10);
    const km = (cm * S) / 100000;
    return mc(
      L(lang, `Jarak dua kota ${M(lang, km)} km. Pada peta, jaraknya ${cm} cm. Skala peta itu adalah …`, `Two towns are ${M(lang, km)} km apart. On the map they are ${cm} cm apart. What is the map's scale?`),
      `1 : ${G(lang, S)}`,
      [
        [`1 : ${G(lang, S / 10)}`, L(lang, '1 km = 100.000 cm. Periksa konversinya.', '1 km = 100,000 cm. Check the conversion.')],
        [`1 : ${G(lang, S * 10)}`, L(lang, '1 km = 100.000 cm. Periksa konversinya.', '1 km = 100,000 cm. Check the conversion.')],
        [Number.isInteger(km / cm) ? `1 : ${G(lang, km / cm)}` : `1 : ${G(lang, km * cm)}`, L(lang, 'Satuan jarak sebenarnya harus diubah ke cm dulu.', 'Change the real distance to cm first.')],
      ],
      [`${M(lang, km)} km = ${G(lang, km * 100000)} cm`, L(lang, `Skala = ${cm} : ${G(lang, km * 100000)} = 1 : ${G(lang, S)}`, `Scale = ${cm} : ${G(lang, km * 100000)} = 1 : ${G(lang, S)}`)],
      { kind, cm, km },
    );
  },
  (m, lang) => (m.kind === 0 ? D((m.cm * m.S) / 100000) : m.kind === 1 ? D((m.real * 100) / m.S) : `1 : ${G(lang, (m.km * 100000) / m.cm)}`),
);

// ================= Bab 6: Garis dan Sudut =================
const ANG = [
  ['lancip', 'acute', 'kurang dari 90°', 'less than 90°'],
  ['siku-siku', 'right', 'tepat 90°', 'exactly 90°'],
  ['tumpul', 'obtuse', 'antara 90° dan 180°', 'between 90° and 180°'],
  ['lurus', 'straight', 'tepat 180°', 'exactly 180°'],
  ['refleks', 'reflex', 'antara 180° dan 360°', 'between 180° and 360°'],
];
const angType = (a) => (a < 90 ? 0 : a === 90 ? 1 : a < 180 ? 2 : a === 180 ? 3 : 4);
const classify = withSolve(
  (rnd, lang) => {
    const t = ri(rnd, 0, 4);
    const a = [ri(rnd, 5, 89), 90, ri(rnd, 91, 179), 180, ri(rnd, 181, 359)][t];
    const others = shuf(rnd, [0, 1, 2, 3, 4].filter((i) => i !== t)).slice(0, 3);
    return mc(
      L(lang, `Sudut ${a}° termasuk jenis sudut …`, `An angle of ${a}° is …`),
      L(lang, ANG[t][0], ANG[t][1]),
      others.map((i) => [L(lang, ANG[i][0], ANG[i][1]), L(lang, `Sudut ${ANG[i][0]} besarnya ${ANG[i][2]}.`, `A${i === 0 || i === 2 ? 'n' : ''} ${ANG[i][1]} angle is ${ANG[i][3]}.`)]),
      [L(lang, `${a}° besarnya ${ANG[t][2]}.`, `${a}° is ${ANG[t][3]}.`), L(lang, `Jadi sudut ${ANG[t][0]}.`, `So it is ${t === 0 || t === 2 ? 'an' : 'a'} ${ANG[t][1]} angle.`)],
      { a },
    );
  },
  (m, lang) => L(lang, ANG[angType(m.a)][0], ANG[angType(m.a)][1]),
);

const clock = withSolve(
  (rnd, lang) => {
    const h = ri(rnd, 1, 11);
    const half = rnd() < 0.3;
    const mm = half ? 30 : 0;
    let ang = Math.abs(30 * h + 0.5 * mm - 6 * mm);
    if (ang > 180) ang = 360 - ang;
    return num(
      L(lang, `Pukul ${h}.${half ? '30' : '00'}, besar sudut terkecil antara jarum jam dan jarum menit adalah …°`, `At ${h}:${half ? '30' : '00'}, what is the smaller angle between the hour hand and the minute hand, in degrees?`),
      ang,
      [
        [360 - ang, L(lang, 'Itu sudut yang besar. Yang ditanya sudut terkecil.', 'That is the larger angle. The question asks for the smaller one.')],
        [half ? Math.abs(30 * h - 180) > 180 ? 360 - Math.abs(30 * h - 180) : Math.abs(30 * h - 180) : null, L(lang, 'Pada pukul setengah, jarum jam sudah bergeser setengah jalan (15°) ke angka berikutnya.', 'At half past, the hour hand has moved halfway (15°) towards the next number.')],
        [h * 6, L(lang, 'Setiap angka pada jam berjarak 30°, bukan 6°.', 'Each number on the clock is 30° apart, not 6°.')],
      ],
      [L(lang, 'Satu putaran 360° dibagi 12 angka: 30° per angka.', 'A full turn of 360° split into 12 numbers: 30° per number.'), half ? L(lang, `Jarum menit di 6 (180°), jarum jam di ${h},5 (${M(lang, 30 * h + 15)}°). Selisihnya ${ang}°.`, `Minute hand at 6 (180°), hour hand at ${h}.5 (${30 * h + 15}°). The gap is ${ang}°.`) : L(lang, `Jarum menit di 12, jarum jam di ${h}: ${Math.min(h, 12 - h)} × 30° = ${ang}°.`, `Minute hand at 12, hour hand at ${h}: ${Math.min(h, 12 - h)} × 30° = ${ang}°.`)],
      { h, mm },
    );
  },
  (m) => {
    const hh = (m.h % 12) * 30 + m.mm / 2;
    const d = Math.abs(hh - m.mm * 6) % 360;
    return D(Math.min(d, 360 - d));
  },
);

const compSupp = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const supp = rnd() < 0.5;
      const a = supp ? ri(rnd, 15, 165) : ri(rnd, 5, 85);
      const T = supp ? 180 : 90;
      return num(
        L(lang, `${supp ? 'Pelurus' : 'Penyiku'} dari sudut ${a}° adalah …°`, `The ${supp ? 'supplement' : 'complement'} of ${a}° is …°`),
        T - a,
        [
          [(supp ? 90 : 180) - a > 0 ? (supp ? 90 : 180) - a : null, L(lang, supp ? 'Pelurus berjumlah 180°, penyiku yang berjumlah 90°.' : 'Penyiku berjumlah 90°, pelurus yang berjumlah 180°.', supp ? 'Supplementary angles add up to 180°; complementary ones add up to 90°.' : 'Complementary angles add up to 90°; supplementary ones add up to 180°.')],
          [360 - a, L(lang, '360° adalah satu putaran penuh.', '360° is a full turn.')],
        ],
        [L(lang, `${supp ? 'Sudut berpelurus' : 'Sudut berpenyiku'} berjumlah ${T}°.`, `${supp ? 'Supplementary' : 'Complementary'} angles add up to ${T}°.`), `${T}° − ${a}° = ${T - a}°`],
        { kind, T, a },
      );
    }
    if (kind === 1) {
      const supp = rnd() < 0.6;
      const T = supp ? 180 : 90;
      const pairs = [];
      for (let p = 1; p <= 9; p++) for (let q = p + 1; q <= 9; q++) if (gcd(p, q) === 1 && T % (p + q) === 0) pairs.push([p, q]);
      const [p, q] = pick(rnd, pairs);
      const small = rnd() < 0.5;
      const u = T / (p + q);
      return num(
        L(lang, `Dua sudut ${supp ? 'berpelurus' : 'berpenyiku'} dengan perbandingan ${p} : ${q}. Sudut yang lebih ${small ? 'kecil' : 'besar'} adalah …°`, `Two ${supp ? 'supplementary' : 'complementary'} angles are in the ratio ${p} : ${q}. What is the ${small ? 'smaller' : 'larger'} angle in degrees?`),
        (small ? p : q) * u,
        [
          [(small ? q : p) * u, L(lang, small ? 'Itu sudut yang lebih besar.' : 'Itu sudut yang lebih kecil.', small ? 'That is the larger angle.' : 'That is the smaller angle.')],
          [Number.isInteger(((supp ? 90 : 180) * (small ? p : q)) / (p + q)) ? ((supp ? 90 : 180) * (small ? p : q)) / (p + q) : null, L(lang, `Jumlah sudut ${supp ? 'berpelurus 180°' : 'berpenyiku 90°'}.`, `${supp ? 'Supplementary angles add to 180°' : 'Complementary angles add to 90°'}.`)],
        ],
        [L(lang, `${p + q} bagian = ${T}°, jadi 1 bagian = ${u}°.`, `${p + q} parts = ${T}°, so 1 part = ${u}°.`), `${small ? p : q} × ${u}° = ${(small ? p : q) * u}°`],
        { kind, T, p, q, small },
      );
    }
    const supp = rnd() < 0.5;
    const T = supp ? 180 : 90;
    const a = ri(rnd, 2, 5);
    const c = ri(rnd, 1, 3);
    let x;
    let b;
    let d;
    do {
      x = ri(rnd, 5, 40);
      b = ri(rnd, -15, 20);
      d = T - (a + c) * x - b;
    } while (a * x + b <= 0 || c * x + d <= 0 || Math.abs(d) > 60);
    const e1 = ex([[a, 'x'], [b, '']]);
    const e2 = ex([[c, 'x'], [d, '']]);
    return num(
      L(lang, `Sudut (${e1})° dan (${e2})° saling ${supp ? 'berpelurus' : 'berpenyiku'}. Nilai x adalah …`, `The angles (${e1})° and (${e2})° are ${supp ? 'supplementary' : 'complementary'}. Find x.`),
      x,
      [
        [Number.isInteger(((supp ? 90 : 180) - b - d) / (a + c)) ? ((supp ? 90 : 180) - b - d) / (a + c) : null, L(lang, `Jumlah kedua sudut ${T}°, bukan ${supp ? 90 : 180}°.`, `The two angles add up to ${T}°, not ${supp ? 90 : 180}°.`)],
        [a * x + b, L(lang, 'Itu besar sudut pertama, bukan nilai x.', 'That is the first angle, not x.')],
      ],
      [`${e1} + ${e2} = ${T}  →  ${a + c}x ${b + d < 0 ? '−' : '+'} ${Math.abs(b + d)} = ${T}`, `${a + c}x = ${T - b - d}, x = ${x}`],
      { kind, T, a, b, c, d },
    );
  },
  (m) => (m.kind === 0 ? D(m.T - m.a) : m.kind === 1 ? D((m.T / (m.p + m.q)) * (m.small ? m.p : m.q)) : D((m.T - m.b - m.d) / (m.a + m.c))),
);

const PAIRS = [
  ['sehadap', 'corresponding', true],
  ['dalam berseberangan', 'alternate interior', true],
  ['luar berseberangan', 'alternate exterior', true],
  ['dalam sepihak', 'co-interior (same-side interior)', false],
  ['luar sepihak', 'same-side exterior', false],
];
const parallel = withSolve(
  (rnd, lang) => {
    const t = ri(rnd, 0, 4);
    const [pid, pen, eq] = PAIRS[t];
    const algebra = rnd() < 0.45;
    if (!algebra) {
      const a = ri(rnd, 35, 145);
      if (a === 90) return parallel(rnd, lang);
      const ans = eq ? a : 180 - a;
      return num(
        L(lang, `Dua garis sejajar dipotong sebuah garis transversal. Sudut P dan sudut Q adalah sepasang sudut ${pid}. Jika sudut P = ${a}°, besar sudut Q adalah …°`, `Two parallel lines are cut by a transversal. Angles P and Q are a pair of ${pen} angles. If P = ${a}°, what is Q in degrees?`),
        ans,
        [[eq ? 180 - a : a, eq ? L(lang, `Sudut ${pid} sama besar.`, `${pen[0].toUpperCase() + pen.slice(1)} angles are equal.`) : L(lang, `Sudut ${pid} berjumlah 180°, bukan sama besar.`, `${pen[0].toUpperCase() + pen.slice(1)} angles add up to 180°; they are not equal.`)]],
        [eq ? L(lang, `Pasangan sudut ${pid} sama besar.`, `${pen[0].toUpperCase() + pen.slice(1)} angles are equal.`) : L(lang, `Pasangan sudut ${pid} berjumlah 180°.`, `${pen[0].toUpperCase() + pen.slice(1)} angles add up to 180°.`), eq ? `Q = ${a}°` : `Q = 180° − ${a}° = ${ans}°`],
        { t, a, alg: false },
      );
    }
    let x;
    let a;
    let b;
    let c;
    let d;
    do {
      x = ri(rnd, 8, 40);
      a = ri(rnd, 2, 5);
      c = ri(rnd, 1, a - 1);
      b = ri(rnd, -10, 20);
      d = eq ? (a - c) * x + b : 180 - (a + c) * x - b;
    } while (a * x + b <= 0 || c * x + d <= 0 || Math.abs(d) > 90 || a * x + b >= 180);
    const e1 = ex([[a, 'x'], [b, '']]);
    const e2 = ex([[c, 'x'], [d, '']]);
    return num(
      L(lang, `Dua garis sejajar dipotong transversal. Sepasang sudut ${pid} besarnya (${e1})° dan (${e2})°. Nilai x adalah …`, `Two parallel lines are cut by a transversal. A pair of ${pen} angles measure (${e1})° and (${e2})°. Find x.`),
      x,
      [
        [eq ? (Number.isInteger((180 - b - d) / (a + c)) ? (180 - b - d) / (a + c) : null) : Number.isInteger((d - b) / (a - c)) ? (d - b) / (a - c) : null, eq ? L(lang, `Sudut ${pid} sama besar, jadi kedua bentuk disamakan.`, `${pen[0].toUpperCase() + pen.slice(1)} angles are equal, so set the two expressions equal.`) : L(lang, `Sudut ${pid} berjumlah 180°.`, `${pen[0].toUpperCase() + pen.slice(1)} angles add up to 180°.`)],
        [a * x + b, L(lang, 'Itu besar sudutnya, bukan nilai x.', 'That is the angle, not x.')],
      ],
      [eq ? `${e1} = ${e2}` : `${e1} + ${e2} = 180`, `x = ${x}`],
      { t, a, b, c, d, alg: true },
    );
  },
  (m) => {
    const eq = m.t <= 2;
    if (!m.alg) return D(eq ? m.a : 180 - m.a);
    return D(eq ? (m.d - m.b) / (m.a - m.c) : (180 - m.b - m.d) / (m.a + m.c));
  },
);

// ================= Bab 7: Segitiga dan Segi Empat =================
const triAngles = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const a = ri(rnd, 20, 100);
      const b = ri(rnd, 15, 160 - a);
      return num(
        L(lang, `Sudut-sudut sebuah segitiga besarnya ${a}°, ${b}°, dan x°. Nilai x adalah …`, `The angles of a triangle are ${a}°, ${b}°, and x°. Find x.`),
        180 - a - b,
        [
          [360 - a - b, L(lang, 'Jumlah sudut segitiga 180°, bukan 360°.', 'The angles of a triangle add up to 180°, not 360°.')],
          [a + b, L(lang, 'x adalah sisa dari 180°, bukan jumlah dua sudut.', 'x is what is left of 180°, not the sum of the two angles.')],
        ],
        [L(lang, 'Jumlah sudut dalam segitiga 180°.', 'The angles in a triangle add up to 180°.'), `x = 180 − ${a} − ${b} = ${180 - a - b}`],
        { kind, a, b },
      );
    }
    if (kind === 1) {
      const trip = [];
      for (let p = 1; p <= 6; p++) for (let q = p; q <= 7; q++) for (let r = q; r <= 9; r++) if (180 % (p + q + r) === 0 && !(p === q && q === r)) trip.push([p, q, r]);
      const [p, q, r] = pick(rnd, trip);
      const x = 180 / (p + q + r);
      return num(
        L(lang, `Sudut-sudut sebuah segitiga besarnya ${ex([[p, 'x']])}°, ${ex([[q, 'x']])}°, dan ${ex([[r, 'x']])}°. Nilai x adalah …`, `The angles of a triangle are ${ex([[p, 'x']])}°, ${ex([[q, 'x']])}°, and ${ex([[r, 'x']])}°. Find x.`),
        x,
        [
          [Number.isInteger(360 / (p + q + r)) ? 360 / (p + q + r) : null, L(lang, 'Jumlah sudut segitiga 180°, bukan 360°.', 'The angles of a triangle add up to 180°, not 360°.')],
          [r * x, L(lang, 'Itu besar sudut terbesar, bukan nilai x.', 'That is the largest angle, not x.')],
        ],
        [`${p + q + r}x = 180`, `x = 180 ÷ ${p + q + r} = ${x}`],
        { kind, s: p + q + r },
      );
    }
    const a = ri(rnd, 25, 80);
    const b = ri(rnd, 25, 80);
    return num(
      L(lang, `Sebuah sudut luar segitiga besarnya ${a + b}°. Salah satu sudut dalam yang tidak bersebelahan dengannya ${a}°. Sudut dalam tak bersebelahan yang lain besarnya …°`, `An exterior angle of a triangle is ${a + b}°. One of the interior angles not next to it is ${a}°. What is the other non-adjacent interior angle in degrees?`),
      b,
      [
        [180 - (a + b), L(lang, 'Itu sudut dalam yang bersebelahan dengan sudut luar.', 'That is the interior angle next to the exterior angle.')],
        [a + b + a, L(lang, 'Sudut luar sama dengan jumlah dua sudut dalam yang tidak bersebelahan, jadi dikurangi.', 'The exterior angle equals the sum of the two opposite interior angles, so subtract.')],
      ],
      [L(lang, 'Sudut luar = jumlah dua sudut dalam yang tidak bersebelahan.', 'Exterior angle = sum of the two opposite interior angles.'), `${a + b} − ${a} = ${b}`],
      { kind, e: a + b, a },
    );
  },
  (m) => D(m.kind === 0 ? 180 - m.a - m.b : m.kind === 1 ? 180 / m.s : m.e - m.a),
);

const rectQ = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    const p = ri(rnd, 5, 25);
    let l = ri(rnd, 3, 20);
    while (l === p) l = ri(rnd, 3, 20);
    if (kind === 0)
      return num(
        L(lang, `Luas persegi panjang berukuran ${p} cm × ${l} cm adalah … cm²`, `What is the area of a ${p} cm × ${l} cm rectangle, in cm²?`),
        p * l,
        [[2 * (p + l), L(lang, 'Itu kelilingnya. Luas = panjang × lebar.', 'That is the perimeter. Area = length × width.')], [p + l, L(lang, 'Luas didapat dari perkalian, bukan penjumlahan.', 'Area comes from multiplying, not adding.')]],
        [L(lang, 'Luas = panjang × lebar', 'Area = length × width'), `${p} × ${l} = ${p * l}`],
        { kind, p, l },
      );
    if (kind === 1) {
      const sq = rnd() < 0.5;
      const w = sq ? p : l;
      return num(
        sq ? L(lang, `Keliling persegi dengan sisi ${p} cm adalah … cm`, `What is the perimeter of a square with side ${p} cm, in cm?`) : L(lang, `Keliling persegi panjang berukuran ${p} cm × ${l} cm adalah … cm`, `What is the perimeter of a ${p} cm × ${l} cm rectangle, in cm?`),
        2 * (p + w),
        [[p * w, L(lang, 'Itu luasnya. Keliling = jumlah semua sisi.', 'That is the area. Perimeter = sum of all sides.')], [p + w, L(lang, 'Itu baru setengah keliling.', 'That is only half the perimeter.')]],
        [L(lang, 'Keliling = jumlah panjang semua sisi.', 'Perimeter = total length of all sides.'), sq ? `4 × ${p} = ${4 * p}` : `2 × (${p} + ${l}) = ${2 * (p + l)}`],
        { kind, p, l: w },
      );
    }
    if (kind === 2)
      return num(
        L(lang, `Luas sebuah persegi panjang ${p * l} cm² dan panjangnya ${p} cm. Lebarnya adalah … cm`, `A rectangle has area ${p * l} cm² and length ${p} cm. What is its width in cm?`),
        l,
        [[p * l - p, L(lang, 'Lebar = luas ÷ panjang, bukan luas − panjang.', 'Width = area ÷ length, not area − length.')], [p * l * p, L(lang, 'Luas dibagi panjang, bukan dikali.', 'Divide the area by the length, do not multiply.')]],
        [L(lang, 'Luas = panjang × lebar, jadi lebar = luas ÷ panjang.', 'Area = length × width, so width = area ÷ length.'), `${p * l} ÷ ${p} = ${l}`],
        { kind, A: p * l, p },
      );
    const fm = ri(rnd, 2, 6);
    const fn = ri(rnd, 2, 5);
    const t = pick(rnd, [20, 25, 40, 50]);
    const n = ((fm * 100) / t) * ((fn * 100) / t);
    return num(
      L(lang, `Lantai berukuran ${fm} m × ${fn} m akan dipasang ubin persegi berukuran ${t} cm × ${t} cm. Banyak ubin yang dibutuhkan adalah …`, `A ${fm} m × ${fn} m floor is covered with square tiles of ${t} cm × ${t} cm. How many tiles are needed?`),
      n,
      [
        [(fm * 100) / t + (fn * 100) / t, L(lang, 'Banyak ubin sepanjang dan selebar lantai harus dikalikan.', 'Multiply the tiles along the length by the tiles along the width.')],
        [fm * fn * t, L(lang, 'Luas lantai dibagi luas satu ubin, dengan satuan yang sama (cm²).', 'Divide the floor area by the area of one tile, in the same units (cm²).')],
      ],
      [L(lang, `Sepanjang lantai: ${fm * 100} ÷ ${t} = ${(fm * 100) / t} ubin. Selebar lantai: ${fn * 100} ÷ ${t} = ${(fn * 100) / t} ubin.`, `Along the length: ${fm * 100} ÷ ${t} = ${(fm * 100) / t} tiles. Along the width: ${fn * 100} ÷ ${t} = ${(fn * 100) / t} tiles.`), `${(fm * 100) / t} × ${(fn * 100) / t} = ${n}`],
      { kind, fm, fn, t },
    );
  },
  (m) => D(m.kind === 0 ? m.p * m.l : m.kind === 1 ? 2 * m.p + 2 * m.l : m.kind === 2 ? m.A / m.p : (m.fm * m.fn * 10000) / (m.t * m.t)),
);

const paraTri = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const a = ri(rnd, 4, 20);
    let t = ri(rnd, 3, 16);
    if (kind !== 0 && (a * t) % 2) t++;
    if (kind === 0)
      return num(
        L(lang, `Luas jajargenjang dengan alas ${a} cm dan tinggi ${t} cm adalah … cm²`, `What is the area of a parallelogram with base ${a} cm and height ${t} cm, in cm²?`),
        a * t,
        [[(a * t) / 2, L(lang, 'Jajargenjang tidak dibagi 2. Rumus ½ × a × t untuk segitiga.', 'A parallelogram is not halved. ½ × b × h is for triangles.')], [2 * (a + t), L(lang, 'Luas = alas × tinggi.', 'Area = base × height.')]],
        [L(lang, 'Jajargenjang bisa dipotong dan digeser menjadi persegi panjang.', 'A parallelogram can be cut and moved into a rectangle.'), `L = ${a} × ${t} = ${a * t}`],
        { kind, a, t },
      );
    if (kind === 1)
      return num(
        L(lang, `Luas segitiga dengan alas ${a} cm dan tinggi ${t} cm adalah … cm²`, `What is the area of a triangle with base ${a} cm and height ${t} cm, in cm²?`),
        (a * t) / 2,
        [[a * t, L(lang, 'Luas segitiga setengah dari alas × tinggi.', 'A triangle is half of base × height.')], [a + t, L(lang, 'Alas dan tinggi dikalikan, bukan dijumlah.', 'Multiply base and height, do not add.')]],
        [L(lang, 'Luas segitiga = ½ × alas × tinggi', 'Triangle area = ½ × base × height'), `½ × ${a} × ${t} = ${(a * t) / 2}`],
        { kind, a, t },
      );
    const A = (a * t) / 2;
    return num(
      L(lang, `Luas sebuah segitiga ${A} cm² dan alasnya ${a} cm. Tingginya adalah … cm`, `A triangle has area ${A} cm² and base ${a} cm. What is its height in cm?`),
      t,
      [[Number.isInteger(A / a) ? A / a : t / 2, L(lang, `Ingat rumus ½ × alas × tinggi. Tinggi = 2 × luas ÷ alas.`, `Remember ½ × base × height. Height = 2 × area ÷ base.`)], [A - a, L(lang, 'Tinggi dicari dengan pembagian.', 'Find the height by dividing.')]],
      [`½ × ${a} × t = ${A}`, `t = 2 × ${A} ÷ ${a} = ${t}`],
      { kind: 2, A, a },
    );
  },
  (m) => D(m.kind === 0 ? m.a * m.t : m.kind === 1 ? 0.5 * m.a * m.t : (2 * m.A) / m.a),
);

const quadArea = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0 || kind === 3) {
      const a = ri(rnd, 4, 16);
      let b = ri(rnd, a + 2, 24);
      let t = ri(rnd, 3, 14);
      if (((a + b) * t) % 2) t++;
      const A = ((a + b) * t) / 2;
      if (kind === 0)
        return num(
          L(lang, `Trapesium dengan sisi sejajar ${a} cm dan ${b} cm serta tinggi ${t} cm luasnya … cm²`, `A trapezium has parallel sides ${a} cm and ${b} cm and height ${t} cm. What is its area in cm²?`),
          A,
          [[(a + b) * t, L(lang, 'Jumlah sisi sejajar × tinggi masih harus dibagi 2.', 'The sum of parallel sides × height must be halved.')], [a * b * t / 2, L(lang, 'Sisi sejajar dijumlahkan, bukan dikalikan.', 'Add the parallel sides, do not multiply them.')]],
          [L(lang, 'Luas trapesium = ½ × (jumlah sisi sejajar) × tinggi', 'Trapezium area = ½ × (sum of parallel sides) × height'), `½ × (${a} + ${b}) × ${t} = ${A}`],
          { kind, a, b, t },
        );
      return num(
        L(lang, `Luas trapesium ${A} cm². Sisi sejajarnya ${a} cm dan ${b} cm. Tinggi trapesium adalah … cm`, `A trapezium has area ${A} cm² and parallel sides ${a} cm and ${b} cm. What is its height in cm?`),
        t,
        [[A / (a + b), L(lang, 'Ingat ada ½ pada rumus, jadi tinggi = 2 × luas ÷ (jumlah sisi sejajar).', 'Remember the ½: height = 2 × area ÷ (sum of parallel sides).')], [2 * A, L(lang, 'Belum dibagi jumlah sisi sejajar.', 'Still needs dividing by the sum of the parallel sides.')]],
        [`½ × (${a} + ${b}) × t = ${A}`, `t = 2 × ${A} ÷ ${a + b} = ${t}`],
        { kind, a, b, A },
      );
    }
    const d1 = ri(rnd, 4, 24);
    let d2 = ri(rnd, 4, 24);
    if ((d1 * d2) % 2) d2++;
    const kite = kind === 2;
    return num(
      L(lang, `${kite ? 'Layang-layang' : 'Belah ketupat'} dengan diagonal ${d1} cm dan ${d2} cm luasnya … cm²`, `A ${kite ? 'kite' : 'rhombus'} has diagonals ${d1} cm and ${d2} cm. What is its area in cm²?`),
      (d1 * d2) / 2,
      [[d1 * d2, L(lang, 'Hasil kali diagonal masih harus dibagi 2.', 'The product of the diagonals must be halved.')], [d1 + d2, L(lang, 'Diagonal dikalikan, bukan dijumlahkan.', 'Multiply the diagonals, do not add them.')]],
      [L(lang, 'Luas = ½ × d₁ × d₂', 'Area = ½ × d₁ × d₂'), `½ × ${d1} × ${d2} = ${(d1 * d2) / 2}`],
      { kind, d1, d2 },
    );
  },
  (m) => D(m.kind === 0 ? ((m.a + m.b) / 2) * m.t : m.kind === 3 ? (2 * m.A) / (m.a + m.b) : (m.d1 / 2) * m.d2),
);

// ================= Bab 8: Data dan Diagram =================
const freqTable = withSolve(
  (rnd, lang) => {
    const vals = [6, 7, 8, 9, 10];
    const f = vals.map(() => ri(rnd, 1, 10));
    const tbl = vals.map((v, i) => L(lang, `nilai ${v}: ${f[i]} siswa`, `score ${v}: ${f[i]} students`)).join(', ');
    const kind = ri(rnd, 0, 2);
    const v = ri(rnd, 7, 9);
    const q =
      kind === 0
        ? L(lang, `Tabel frekuensi nilai ulangan: ${tbl}. Banyak siswa seluruhnya adalah …`, `A frequency table of test scores: ${tbl}. How many students are there altogether?`)
        : kind === 1
          ? L(lang, `Tabel frekuensi nilai ulangan: ${tbl}. Banyak siswa yang nilainya lebih dari ${v} adalah …`, `A frequency table of test scores: ${tbl}. How many students scored more than ${v}?`)
          : L(lang, `Tabel frekuensi nilai ulangan: ${tbl}. Banyak siswa yang nilainya paling sedikit ${v} adalah …`, `A frequency table of test scores: ${tbl}. How many students scored at least ${v}?`);
    const ans = kind === 0 ? sum(f) : sum(f.filter((_, i) => (kind === 1 ? vals[i] > v : vals[i] >= v)));
    return num(
      q,
      ans,
      [
        [kind === 0 ? sum(vals) : null, L(lang, 'Yang dijumlah frekuensinya (banyak siswa), bukan nilainya.', 'Add the frequencies (numbers of students), not the scores.')],
        [kind === 1 ? sum(f.filter((_, i) => vals[i] >= v)) : null, L(lang, `"Lebih dari ${v}" tidak termasuk nilai ${v}.`, `"More than ${v}" does not include ${v}.`)],
        [kind === 2 ? sum(f.filter((_, i) => vals[i] > v)) : null, L(lang, `"Paling sedikit ${v}" artinya ${v} atau lebih, jadi nilai ${v} ikut.`, `"At least ${v}" means ${v} or more, so ${v} is included.`)],
        [kind !== 0 ? sum(vals.filter((x) => (kind === 1 ? x > v : x >= v))) : null, L(lang, 'Yang dijumlah frekuensinya, bukan nilainya.', 'Add the frequencies, not the scores.')],
      ],
      [kind === 0 ? L(lang, 'Jumlahkan semua frekuensi.', 'Add all the frequencies.') : L(lang, `Pilih baris nilai ${kind === 1 ? `di atas ${v}` : `${v} ke atas`}, lalu jumlahkan frekuensinya.`, `Pick the rows ${kind === 1 ? `above ${v}` : `from ${v} up`}, then add their frequencies.`), `= ${ans}`],
      { f, kind, v },
    );
  },
  (m) => {
    const vals = [6, 7, 8, 9, 10];
    let s = 0;
    m.f.forEach((x, i) => {
      if (m.kind === 0 || (m.kind === 1 && vals[i] > m.v) || (m.kind === 2 && vals[i] >= m.v)) s += x;
    });
    return D(s);
  },
);

const DATA_ITEMS = [
  ['warna kesukaan siswa', 'students’ favourite colours', 0],
  ['merek ponsel yang dipakai', 'brands of phone used', 0],
  ['golongan darah siswa', 'students’ blood types', 0],
  ['jenis olahraga kesukaan', 'favourite sports', 0],
  ['kota tempat lahir', 'city of birth', 0],
  ['jenis kendaraan ke sekolah', 'way of travelling to school', 0],
  ['tinggi badan siswa', 'students’ heights', 1],
  ['banyak saudara kandung', 'number of siblings', 1],
  ['nilai ulangan matematika', 'maths test scores', 1],
  ['berat tas sekolah', 'weight of school bags', 1],
  ['waktu tempuh ke sekolah', 'travel time to school', 1],
  ['ukuran sepatu', 'shoe sizes', 1],
];
const dataType = withSolve(
  (rnd, lang) => {
    const want = ri(rnd, 0, 1);
    const ok = pick(rnd, DATA_ITEMS.filter((d) => d[2] === want));
    const others = shuf(rnd, DATA_ITEMS.filter((d) => d[2] !== want)).slice(0, 3);
    const nm = want === 0 ? L(lang, 'data kualitatif (kategori)', 'qualitative (categorical) data') : L(lang, 'data kuantitatif (bilangan)', 'quantitative (numerical) data');
    return mc(
      L(lang, `Data berikut yang termasuk ${nm} adalah …`, `Which of these is ${nm}?`),
      L(lang, ok[0], ok[1]),
      others.map((d) => [L(lang, d[0], d[1]), want === 0 ? L(lang, 'Data ini berupa bilangan hasil mengukur atau membilang, jadi kuantitatif.', 'This data is a number from measuring or counting, so it is quantitative.') : L(lang, 'Data ini berupa kategori atau nama, jadi kualitatif.', 'This data is a category or name, so it is qualitative.')]),
      [L(lang, 'Data kualitatif berupa kategori; data kuantitatif berupa bilangan hasil membilang atau mengukur.', 'Qualitative data are categories; quantitative data are numbers from counting or measuring.'), L(lang, `${ok[0][0].toUpperCase() + ok[0].slice(1)} termasuk ${nm}.`, `${ok[1][0].toUpperCase() + ok[1].slice(1)} is ${nm}.`)],
      { item: ok[0] },
    );
  },
  (m, lang) => {
    const it = DATA_ITEMS.find((d) => d[0] === m.item);
    return L(lang, it[0], it[1]);
  },
);

const DAYS = [['Senin', 'Monday'], ['Selasa', 'Tuesday'], ['Rabu', 'Wednesday'], ['Kamis', 'Thursday'], ['Jumat', 'Friday']];
const barData = (rnd) => {
  const v = [];
  while (v.length < 5) {
    const x = ri(rnd, 3, 30);
    if (!v.includes(x)) v.push(x);
  }
  return v;
};
const barNum = withSolve(
  (rnd, lang) => {
    const v = barData(rnd);
    const ctx = pick(rnd, [['pengunjung perpustakaan', 'library visitors'], ['buku yang dipinjam', 'books borrowed'], ['siswa yang membawa bekal', 'students bringing lunch']]);
    const list = v.map((x, i) => `${L(lang, DAYS[i][0], DAYS[i][1])} ${x}`).join(', ');
    const total = rnd() < 0.4;
    const i = ri(rnd, 0, 4);
    let j = ri(rnd, 0, 4);
    while (j === i) j = ri(rnd, 0, 4);
    const [hi, lo] = v[i] > v[j] ? [i, j] : [j, i];
    return num(
      total
        ? L(lang, `Diagram batang menunjukkan banyak ${ctx[0]}: ${list}. Jumlah selama lima hari adalah …`, `A bar chart shows the number of ${ctx[1]}: ${list}. What is the total for the five days?`)
        : L(lang, `Diagram batang menunjukkan banyak ${ctx[0]}: ${list}. Selisih hari ${DAYS[hi][0]} dan ${DAYS[lo][0]} adalah …`, `A bar chart shows the number of ${ctx[1]}: ${list}. What is the difference between ${DAYS[hi][1]} and ${DAYS[lo][1]}?`),
      total ? sum(v) : v[hi] - v[lo],
      total
        ? [[sum(v) / 5, L(lang, 'Itu rata-ratanya. Yang ditanya jumlahnya.', 'That is the mean. The question asks for the total.')], [Math.max(...v), L(lang, 'Itu nilai tertinggi saja.', 'That is just the highest value.')]]
        : [[v[hi] + v[lo], L(lang, 'Selisih berarti dikurangkan.', 'Difference means subtracting.')], [Math.max(...v) - Math.min(...v), L(lang, 'Itu selisih tertinggi dan terendah. Perhatikan hari yang ditanya.', 'That is highest minus lowest. Check which days are asked.')]],
      [total ? L(lang, 'Jumlahkan kelima nilai.', 'Add the five values.') : L(lang, `${DAYS[hi][0]} ${v[hi]}, ${DAYS[lo][0]} ${v[lo]}.`, `${DAYS[hi][1]} ${v[hi]}, ${DAYS[lo][1]} ${v[lo]}.`), total ? `${v.join(' + ')} = ${sum(v)}` : `${v[hi]} − ${v[lo]} = ${v[hi] - v[lo]}`],
      { v, total, i, j },
    );
  },
  (m) => D(m.total ? m.v.reduce((s, x) => s + x, 0) : Math.abs(m.v[m.i] - m.v[m.j])),
);

const barPick = withSolve(
  (rnd, lang) => {
    const v = barData(rnd);
    const most = rnd() < 0.5;
    const list = v.map((x, i) => `${L(lang, DAYS[i][0], DAYS[i][1])} ${x}`).join(', ');
    const k = v.indexOf(most ? Math.max(...v) : Math.min(...v));
    return mc(
      L(lang, `Diagram batang banyak pengunjung kantin: ${list}. Hari dengan pengunjung paling ${most ? 'banyak' : 'sedikit'} adalah …`, `A bar chart of canteen visitors: ${list}. Which day had the ${most ? 'most' : 'fewest'} visitors?`),
      L(lang, DAYS[k][0], DAYS[k][1]),
      DAYS.map((d, i) => [i, d]).filter(([i]) => i !== k).map(([i, d]) => [L(lang, d[0], d[1]), L(lang, `${d[0]} hanya ${v[i]}, ${most ? 'masih ada yang lebih banyak' : 'masih ada yang lebih sedikit'}.`, `${d[1]} had ${v[i]}; another day had ${most ? 'more' : 'fewer'}.`)]),
      [L(lang, `Cari batang yang paling ${most ? 'tinggi' : 'pendek'}.`, `Find the ${most ? 'tallest' : 'shortest'} bar.`), L(lang, `${DAYS[k][0]}: ${v[k]}.`, `${DAYS[k][1]}: ${v[k]}.`)],
      { v, most },
    );
  },
  (m, lang) => {
    let k = 0;
    m.v.forEach((x, i) => {
      if (m.most ? x > m.v[k] : x < m.v[k]) k = i;
    });
    return L(lang, DAYS[k][0], DAYS[k][1]);
  },
);

const pie = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    if (kind === 0) {
      const T = pick(rnd, [24, 30, 36, 40, 45, 60, 72, 90, 120]);
      let n = ri(rnd, 1, T - 1);
      while ((n * 360) % T) n = ri(rnd, 1, T - 1);
      const sub = pick(rnd, [['IPA', 'science'], ['seni', 'art'], ['olahraga', 'sport'], ['bahasa', 'languages']]);
      return num(
        L(lang, `Dari ${T} siswa, ${n} siswa memilih ${sub[0]}. Besar sudut juring ${sub[0]} pada diagram lingkaran adalah …°`, `Of ${T} students, ${n} chose ${sub[1]}. What is the angle of the ${sub[1]} sector in a pie chart, in degrees?`),
        (n * 360) / T,
        [[Number.isInteger((n * 100) / T) ? (n * 100) / T : null, L(lang, 'Itu persentasenya. Sudut satu lingkaran penuh 360°.', 'That is the percentage. A full circle is 360°.')], [n, L(lang, 'Banyak siswa harus diubah menjadi bagian dari 360°.', 'The count must be turned into a share of 360°.')]],
        [`${n}/${T} × 360°`, `= ${(n * 360) / T}°`],
        { kind, n, T },
      );
    }
    if (kind === 1) {
      const pc = pick(rnd, [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 75]);
      return num(
        L(lang, `Juring yang mewakili ${pc}% besarnya …°`, `A sector that represents ${pc}% has an angle of …°`),
        (pc * 360) / 100,
        [[pc, L(lang, 'Persen harus diubah ke derajat: kalikan dengan 360°.', 'Convert the percentage to degrees: multiply by 360°.')], [(pc * 180) / 100, L(lang, 'Satu lingkaran 360°, bukan 180°.', 'A full circle is 360°, not 180°.')]],
        [`${pc}% × 360°`, `= ${(pc * 360) / 100}°`],
        { kind, pc },
      );
    }
    const T = pick(rnd, [36, 40, 60, 72, 90, 120, 180]);
    let a = pick(rnd, [30, 45, 60, 72, 90, 120, 135, 150]);
    while ((a * T) % 360) a = pick(rnd, [30, 45, 60, 72, 90, 120, 135, 150]);
    return num(
      L(lang, `Diagram lingkaran menggambarkan ${T} siswa. Juring kelompok C besarnya ${a}°. Banyak siswa pada kelompok C adalah …`, `A pie chart shows ${T} students. The sector for group C is ${a}°. How many students are in group C?`),
      (a * T) / 360,
      [[a, L(lang, 'Itu besar sudutnya, bukan banyak siswa.', 'That is the angle, not the number of students.')], [Number.isInteger((a * T) / 180) ? (a * T) / 180 : null, L(lang, 'Satu lingkaran 360°, bukan 180°.', 'A full circle is 360°, not 180°.')]],
      [`${a}/360 × ${T}`, `= ${(a * T) / 360}`],
      { kind, a, T },
    );
  },
  (m) => D(m.kind === 0 ? (360 / m.T) * m.n : m.kind === 1 ? 3.6 * m.pc : (m.T / 360) * m.a),
);

const centre = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 3);
    if (kind === 0) {
      const n = ri(rnd, 4, 7);
      const mean = ri(rnd, 5, 15);
      let xs;
      do {
        xs = Array.from({ length: n }, () => mean + ri(rnd, -4, 4));
        xs[n - 1] = mean * n - sum(xs.slice(0, n - 1));
      } while (xs[n - 1] < 1 || Math.abs(xs[n - 1] - mean) > 6);
      const S = sum(xs);
      return num(
        L(lang, `Rata-rata dari ${xs.join(', ')} adalah …`, `What is the mean of ${xs.join(', ')}?`),
        S / n,
        [[S, L(lang, 'Itu jumlahnya. Rata-rata = jumlah ÷ banyak data.', 'That is the total. Mean = total ÷ number of values.')], [xs.slice().sort((a, b) => a - b)[Math.floor(n / 2)], L(lang, 'Itu nilai tengah (median), bukan rata-rata.', 'That is the middle value (median), not the mean.')]],
        [L(lang, `Jumlah = ${S}, banyak data = ${n}.`, `Total = ${S}, number of values = ${n}.`), `${S} ÷ ${n} = ${M(lang, S / n)}`],
        { kind, xs },
      );
    }
    if (kind === 1) {
      const n = pick(rnd, [5, 6, 7, 8]);
      const xs = Array.from({ length: n }, () => ri(rnd, 1, 20));
      const s = xs.slice().sort((a, b) => a - b);
      const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
      const unsortedMid = n % 2 ? xs[(n - 1) / 2] : (xs[n / 2 - 1] + xs[n / 2]) / 2;
      return num(
        L(lang, `Median dari data ${xs.join(', ')} adalah …`, `What is the median of ${xs.join(', ')}?`),
        med,
        [[unsortedMid, L(lang, 'Data harus diurutkan dulu sebelum mencari nilai tengah.', 'Sort the data first before finding the middle.')], [Math.round((sum(xs) / n) * 100) / 100, L(lang, 'Itu rata-rata, bukan median.', 'That is the mean, not the median.')]],
        [L(lang, `Urutkan: ${s.join(', ')}.`, `Sort: ${s.join(', ')}.`), n % 2 ? L(lang, `Nilai tengahnya ${med}.`, `The middle value is ${med}.`) : L(lang, `Dua nilai tengah ${s[n / 2 - 1]} dan ${s[n / 2]}, rata-ratanya ${M(lang, med)}.`, `The two middle values are ${s[n / 2 - 1]} and ${s[n / 2]}; their mean is ${M(lang, med)}.`)],
        { kind, xs },
      );
    }
    if (kind === 2) {
      const m = ri(rnd, 3, 12);
      const others = shuf(rnd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].filter((x) => x !== m)).slice(0, 4);
      const xs = shuf(rnd, [m, m, m, others[0], others[0], others[1], others[2], others[3]]);
      return num(
        L(lang, `Modus dari data ${xs.join(', ')} adalah …`, `What is the mode of ${xs.join(', ')}?`),
        m,
        [[others[0], L(lang, `${others[0]} muncul 2 kali, ada yang muncul lebih sering.`, `${others[0]} appears twice; another value appears more often.`)], [3, L(lang, 'Itu frekuensinya. Modus adalah nilai yang paling sering muncul.', 'That is how often it appears. The mode is the value itself.')]],
        [L(lang, 'Hitung berapa kali setiap nilai muncul.', 'Count how often each value appears.'), L(lang, `${m} muncul 3 kali, paling sering.`, `${m} appears 3 times, the most often.`)],
        { kind, xs },
      );
    }
    const n = ri(rnd, 3, 9);
    const m1 = ri(rnd, 60, 80);
    const m2 = m1 + pick(rnd, [-3, -2, -1, 1, 2, 3, 4]);
    const x = (n + 1) * m2 - n * m1;
    const nm = pick(rnd, NAMES);
    return num(
      L(lang, `Rata-rata nilai ${n} anak adalah ${m1}. Setelah nilai ${nm} ditambahkan, rata-ratanya menjadi ${m2}. Nilai ${nm} adalah …`, `The mean score of ${n} children is ${m1}. After adding ${nm}'s score, the mean becomes ${m2}. What is ${nm}'s score?`),
      x,
      [[m2, L(lang, 'Itu rata-rata baru, bukan nilai yang ditambahkan.', 'That is the new mean, not the added score.')], [m2 + (m2 - m1), L(lang, 'Hitung dengan jumlah nilai: jumlah baru − jumlah lama.', 'Use the totals: new total − old total.')]],
      [L(lang, `Jumlah lama = ${n} × ${m1} = ${n * m1}. Jumlah baru = ${n + 1} × ${m2} = ${(n + 1) * m2}.`, `Old total = ${n} × ${m1} = ${n * m1}. New total = ${n + 1} × ${m2} = ${(n + 1) * m2}.`), `${(n + 1) * m2} − ${n * m1} = ${x}`],
      { kind, n, m1, m2 },
    );
  },
  (m) => {
    if (m.kind === 0) return D(m.xs.reduce((s, x) => s + x, 0) / m.xs.length);
    if (m.kind === 1) {
      const s = m.xs.slice().sort((a, b) => a - b);
      const k = s.length;
      return D(k % 2 ? s[(k - 1) / 2] : (s[k / 2 - 1] + s[k / 2]) / 2);
    }
    if (m.kind === 2) {
      const c = {};
      m.xs.forEach((x) => (c[x] = (c[x] || 0) + 1));
      return D(Number(Object.keys(c).sort((a, b) => c[b] - c[a])[0]));
    }
    return D(m.m2 + m.n * (m.m2 - m.m1));
  },
);

// ================= Bab 9: Aritmetika Sosial =================
const profit = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const B = pick(rnd, [20, 40, 50, 60, 80, 100, 120, 150, 200, 250, 400, 500]) * 1000;
    const pc = pick(rnd, [5, 10, 12, 15, 20, 25, 30, 40]);
    const gain = rnd() < 0.65;
    const S = gain ? B * (1 + pc / 100) : B * (1 - pc / 100);
    const it = pick(rnd, [['sepeda', 'bicycle'], ['ponsel bekas', 'used phone'], ['tas', 'bag'], ['jam tangan', 'watch'], ['rak buku', 'bookshelf']]);
    if (kind === 0)
      return num(
        L(lang, `Sebuah ${it[0]} dibeli ${rp(lang, B)} dan dijual ${rp(lang, S)}. Persentase ${gain ? 'untungnya' : 'ruginya'} adalah … %`, `A ${it[1]} is bought for ${rp(lang, B)} and sold for ${rp(lang, S)}. What is the percentage ${gain ? 'profit' : 'loss'}?`),
        pc,
        [
          [Math.round((Math.abs(S - B) / S) * 10000) / 100, L(lang, 'Persentase untung atau rugi dihitung dari harga beli, bukan harga jual.', 'Profit or loss percentage is based on the buying price, not the selling price.')],
          [Math.abs(S - B) / 1000, L(lang, 'Itu besar untung atau rugi dalam ribuan rupiah, belum dijadikan persen.', 'That is the amount in thousands of rupiah, not a percentage.')],
        ],
        [L(lang, `${gain ? 'Untung' : 'Rugi'} = ${rp(lang, Math.abs(S - B))}.`, `${gain ? 'Profit' : 'Loss'} = ${rp(lang, Math.abs(S - B))}.`), `${G(lang, Math.abs(S - B))}/${G(lang, B)} × 100% = ${pc}%`],
        { kind, B, S },
      );
    if (kind === 1)
      return num(
        L(lang, `Harga beli sebuah ${it[0]} ${rp(lang, B)}. Agar ${gain ? 'untung' : 'cepat laku walau rugi'} ${pc}%, barang itu dijual seharga Rp …`, `A ${it[1]} is bought for ${rp(lang, B)}. To make a ${pc}% ${gain ? 'profit' : 'loss'}, what should it be sold for, in Rp?`),
        S,
        [
          [gain ? B * (1 - pc / 100) : B * (1 + pc / 100), gain ? L(lang, 'Untung berarti harga jual lebih tinggi dari harga beli.', 'A profit means selling for more than the buying price.') : L(lang, 'Rugi berarti harga jual lebih rendah dari harga beli.', 'A loss means selling for less than the buying price.')],
          [(B * pc) / 100, L(lang, `Itu besar ${gain ? 'untungnya' : 'ruginya'} saja.`, `That is just the ${gain ? 'profit' : 'loss'}.`)],
        ],
        [L(lang, `${gain ? 'Untung' : 'Rugi'} = ${pc}% × ${rp(lang, B)} = ${rp(lang, (B * pc) / 100)}.`, `${gain ? 'Profit' : 'Loss'} = ${pc}% × ${rp(lang, B)} = ${rp(lang, (B * pc) / 100)}.`), `${rp(lang, B)} ${gain ? '+' : '−'} ${rp(lang, (B * pc) / 100)} = ${rp(lang, S)}`],
        { kind, B, pc, gain },
      );
    const U = (B * pc) / 100;
    const nm = pick(rnd, NAMES);
    return num(
      L(lang, `${nm} menjual sebuah ${it[0]} dan mendapat untung ${rp(lang, U)}. Untung itu sama dengan ${pc}% dari harga beli. Harga beli ${it[0]} itu adalah Rp …`, `${nm} sells a ${it[1]} at a profit of ${rp(lang, U)}. That profit is ${pc}% of the buying price. What was the buying price, in Rp?`),
      B,
      [
        [(U * pc) / 100, L(lang, `${rp(lang, U)} adalah ${pc}% dari harga beli, jadi harga beli = ${rp(lang, U)} × 100/${pc}.`, `${rp(lang, U)} is ${pc}% of the price, so price = ${rp(lang, U)} × 100/${pc}.`)],
        [B + U, L(lang, 'Itu harga jualnya.', 'That is the selling price.')],
      ],
      [`${pc}% × ${L(lang, 'harga beli', 'price')} = ${rp(lang, U)}`, `${L(lang, 'Harga beli', 'Price')} = ${rp(lang, U)} × 100/${pc} = ${rp(lang, B)}`],
      { kind, U, pc },
    );
  },
  (m) => (m.kind === 0 ? D((Math.abs(m.S - m.B) * 100) / m.B) : m.kind === 1 ? D(m.B + ((m.gain ? 1 : -1) * m.B * m.pc) / 100) : D((m.U * 100) / m.pc)),
);

const discTax = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const pc = pick(rnd, [10, 20, 25, 30, 40, 50]);
    if (kind === 0) {
      const after = pick(rnd, [60, 75, 90, 120, 150, 180, 210, 240, 300]) * 1000;
      const before = (after * 100) / (100 - pc);
      if (!Number.isInteger(before / 100)) return discTax(rnd, lang);
      const it = pick(rnd, [['jaket', 'jacket'], ['sepatu', 'pair of shoes'], ['tas', 'bag']]);
      return num(
        L(lang, `Setelah diskon ${pc}%, harga sebuah ${it[0]} menjadi ${rp(lang, after)}. Harga sebelum diskon adalah Rp …`, `After a ${pc}% discount, a ${it[1]} costs ${rp(lang, after)}. What was the price before the discount, in Rp?`),
        before,
        [
          [after * (1 + pc / 100), L(lang, `${rp(lang, after)} adalah ${100 - pc}% dari harga awal, bukan 100%. Jadi tidak cukup menambah ${pc}% darinya.`, `${rp(lang, after)} is ${100 - pc}% of the original price, not 100%. Adding ${pc}% of it is not enough.`)],
          [(after * pc) / 100, L(lang, 'Itu bukan harga awal.', 'That is not the original price.')],
        ],
        [L(lang, `Harga setelah diskon = ${100 - pc}% × harga awal.`, `Price after discount = ${100 - pc}% × original price.`), `${rp(lang, after)} × 100/${100 - pc} = ${rp(lang, before)}`],
        { kind, after, pc },
      );
    }
    const tp = pick(rnd, [5, 10, 11, 12]);
    const bill = pick(rnd, [50, 80, 100, 120, 150, 200, 250, 300]) * 1000;
    if (kind === 1)
      return num(
        L(lang, `Harga makanan di restoran ${rp(lang, bill)}, ditambah pajak ${tp}%. Jumlah yang dibayar adalah Rp …`, `A restaurant bill is ${rp(lang, bill)} plus ${tp}% tax. How much is paid in total, in Rp?`),
        bill + (bill * tp) / 100,
        [
          [(bill * tp) / 100, L(lang, 'Itu besar pajaknya saja.', 'That is only the tax.')],
          [bill - (bill * tp) / 100, L(lang, 'Pajak menambah jumlah yang dibayar.', 'Tax adds to the amount paid.')],
        ],
        [L(lang, `Pajak = ${tp}% × ${rp(lang, bill)} = ${rp(lang, (bill * tp) / 100)}.`, `Tax = ${tp}% × ${rp(lang, bill)} = ${rp(lang, (bill * tp) / 100)}.`), `${rp(lang, bill)} + ${rp(lang, (bill * tp) / 100)} = ${rp(lang, bill + (bill * tp) / 100)}`],
        { kind, bill, tp },
      );
    const p = pick(rnd, [100, 120, 150, 200]) * 1000;
    const d = pick(rnd, [10, 20, 25]);
    const net = p * (1 - d / 100);
    return num(
      L(lang, `Sebuah ${pick(rnd, ['sepatu', 'tas', 'jaket'])} seharga ${rp(lang, p)} mendapat diskon ${d}%, lalu dikenai pajak ${tp}% dari harga setelah diskon. Harga yang dibayar adalah Rp …`, `An item priced ${rp(lang, p)} gets a ${d}% discount, then ${tp}% tax on the discounted price. How much is paid, in Rp?`),
      net * (1 + tp / 100),
      [
        [p * (1 - d / 100 + tp / 100), L(lang, 'Pajak dihitung dari harga setelah diskon, bukan dari harga awal.', 'The tax is on the discounted price, not the original price.')],
        [net, L(lang, 'Pajaknya belum ditambahkan.', 'The tax has not been added.')],
      ],
      [L(lang, `Setelah diskon: ${rp(lang, p)} − ${rp(lang, (p * d) / 100)} = ${rp(lang, net)}.`, `After discount: ${rp(lang, p)} − ${rp(lang, (p * d) / 100)} = ${rp(lang, net)}.`), L(lang, `Pajak ${tp}% × ${rp(lang, net)} = ${rp(lang, (net * tp) / 100)}. Total ${rp(lang, net * (1 + tp / 100))}.`, `Tax ${tp}% × ${rp(lang, net)} = ${rp(lang, (net * tp) / 100)}. Total ${rp(lang, net * (1 + tp / 100))}.`)],
      { kind, p, d, tp },
    );
  },
  (m) => (m.kind === 0 ? D(m.after / (1 - m.pc / 100)) : m.kind === 1 ? D((m.bill * (100 + m.tp)) / 100) : D((m.p * (100 - m.d) * (100 + m.tp)) / 10000)),
);

const interest = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const M0 = pick(rnd, [1, 1.2, 1.5, 2, 2.4, 3, 4, 5, 6]) * 1000000;
    const r = pick(rnd, [4, 5, 6, 8, 10, 12]);
    const nm = pick(rnd, NAMES);
    if (kind === 0) {
      const t = ri(rnd, 2, 4);
      const I = (M0 * r * t) / 100;
      return num(
        L(lang, `${nm} menabung ${rp(lang, M0)} dengan bunga tunggal ${r}% per tahun. Besar tabungan setelah ${t} tahun adalah Rp …`, `${nm} saves ${rp(lang, M0)} at ${r}% simple interest per year. How much is in the account after ${t} years, in Rp?`),
        M0 + I,
        [
          [I, L(lang, 'Itu bunganya saja. Tabungan akhir = modal + bunga.', 'That is only the interest. Final amount = principal + interest.')],
          [M0 + (M0 * r) / 100, L(lang, `Bunga ${t} tahun, bukan 1 tahun.`, `Interest for ${t} years, not 1 year.`)],
        ],
        [L(lang, `Bunga = ${r}% × ${rp(lang, M0)} × ${t} = ${rp(lang, I)}.`, `Interest = ${r}% × ${rp(lang, M0)} × ${t} = ${rp(lang, I)}.`), `${rp(lang, M0)} + ${rp(lang, I)} = ${rp(lang, M0 + I)}`],
        { kind, M0, r, t },
      );
    }
    if (kind === 1) {
      const mo = pick(rnd, [3, 4, 6, 8, 9]);
      const I = (M0 * r * mo) / 1200;
      if (!Number.isInteger(I)) return interest(rnd, lang);
      return num(
        L(lang, `Uang ${rp(lang, M0)} ditabung dengan bunga tunggal ${r}% per tahun selama ${mo} bulan. Bunganya adalah Rp …`, `${rp(lang, M0)} is saved at ${r}% simple interest per year for ${mo} months. How much interest is earned, in Rp?`),
        I,
        [
          [(M0 * r) / 100, L(lang, `Itu bunga 1 tahun. Untuk ${mo} bulan kalikan ${mo}/12.`, `That is one year of interest. For ${mo} months multiply by ${mo}/12.`)],
          [(M0 * r * mo) / 100, L(lang, 'Bunga per tahun, jadi bulan harus diubah ke tahun (dibagi 12).', 'The rate is per year, so convert months to years (divide by 12).')],
        ],
        [L(lang, `Bunga 1 tahun = ${r}% × ${rp(lang, M0)} = ${rp(lang, (M0 * r) / 100)}.`, `One year of interest = ${r}% × ${rp(lang, M0)} = ${rp(lang, (M0 * r) / 100)}.`), `${mo}/12 × ${rp(lang, (M0 * r) / 100)} = ${rp(lang, I)}`],
        { kind, M0, r, mo },
      );
    }
    const n = pick(rnd, [10, 12]);
    const tot = M0 * (1 + r / 100);
    if (!Number.isInteger(tot / n)) return interest(rnd, lang);
    return num(
      L(lang, `${nm} meminjam ${rp(lang, M0)} dengan bunga tunggal ${r}% per tahun. Pinjaman dikembalikan dalam 1 tahun dengan ${n} kali cicilan bulanan yang sama. Besar cicilan per bulan adalah Rp …`, `${nm} borrows ${rp(lang, M0)} at ${r}% simple interest per year and repays it within 1 year in ${n} equal monthly instalments. How much is each instalment, in Rp?`),
      tot / n,
      [
        [M0 / n, L(lang, 'Bunganya belum ditambahkan.', 'The interest has not been added.')],
        [tot, L(lang, `Itu total pinjaman. Bagi dengan ${n}.`, `That is the total to repay. Divide by ${n}.`)],
      ],
      [L(lang, `Total = ${rp(lang, M0)} + ${r}% × ${rp(lang, M0)} = ${rp(lang, tot)}.`, `Total = ${rp(lang, M0)} + ${r}% × ${rp(lang, M0)} = ${rp(lang, tot)}.`), `${rp(lang, tot)} ÷ ${n} = ${rp(lang, tot / n)}`],
      { kind, M0, r, n },
    );
  },
  (m) => (m.kind === 0 ? D(m.M0 * (1 + (m.r * m.t) / 100)) : m.kind === 1 ? D((((m.M0 * m.r) / 100) * m.mo) / 12) : D((m.M0 + (m.M0 * m.r) / 100) / m.n)),
);

const bruto = withSolve(
  (rnd, lang) => {
    const kind = ri(rnd, 0, 2);
    const it = pick(rnd, [['karung beras', 'sack of rice'], ['karung gula', 'sack of sugar'], ['peti buah', 'crate of fruit'], ['karung kentang', 'sack of potatoes']]);
    if (kind === 0) {
      const B = pick(rnd, [20, 25, 40, 50, 60, 100]);
      const T = pick(rnd, [0.5, 1, 1.5, 2, 2.5]);
      const askN = rnd() < 0.6;
      return num(
        askN
          ? L(lang, `Sebuah ${it[0]} memiliki bruto ${M(lang, B)} kg dan tara ${M(lang, T)} kg. Netonya adalah … kg`, `A ${it[1]} has a gross weight of ${M(lang, B)} kg and a tare of ${M(lang, T)} kg. What is the net weight in kg?`)
          : L(lang, `Sebuah ${it[0]} memiliki neto ${M(lang, B - T)} kg dan tara ${M(lang, T)} kg. Brutonya adalah … kg`, `A ${it[1]} has a net weight of ${M(lang, B - T)} kg and a tare of ${M(lang, T)} kg. What is the gross weight in kg?`),
        askN ? B - T : B,
        [[askN ? B + T : B - 2 * T, L(lang, 'Bruto = neto + tara. Neto = bruto − tara.', 'Gross = net + tare. Net = gross − tare.')], [askN ? B : B - T, L(lang, 'Tara (berat wadah) belum diperhitungkan.', 'The tare (container weight) was left out.')]],
        [L(lang, 'Bruto = neto + tara', 'Gross = net + tare'), askN ? `${M(lang, B)} − ${M(lang, T)} = ${M(lang, B - T)}` : `${M(lang, B - T)} + ${M(lang, T)} = ${M(lang, B)}`],
        { kind, B, T, askN },
      );
    }
    if (kind === 1) {
      const B = pick(rnd, [20, 25, 40, 50, 80, 100]);
      const pc = pick(rnd, [1, 2, 4, 5, 10]);
      const asPct = rnd() < 0.5;
      const T = (B * pc) / 100;
      if (asPct)
        return num(
          L(lang, `Sebuah ${it[0]} memiliki bruto ${B} kg dan neto ${M(lang, B - T)} kg. Persentase taranya terhadap bruto adalah … %`, `A ${it[1]} has gross weight ${B} kg and net weight ${M(lang, B - T)} kg. What percentage of the gross weight is the tare?`),
          pc,
          [[T, L(lang, 'Itu besar taranya dalam kg, belum dijadikan persen.', 'That is the tare in kg, not a percentage.')], [Math.round(((B - T) / B) * 10000) / 100, L(lang, 'Itu persentase neto.', 'That is the net percentage.')]],
          [L(lang, `Tara = ${B} − ${M(lang, B - T)} = ${M(lang, T)} kg.`, `Tare = ${B} − ${M(lang, B - T)} = ${M(lang, T)} kg.`), `${M(lang, T)}/${B} × 100% = ${pc}%`],
          { kind, B, N: B - T, asPct },
        );
      return num(
        L(lang, `Sebuah ${it[0]} memiliki bruto ${B} kg dengan tara ${pc}%. Netonya adalah … kg`, `A ${it[1]} has gross weight ${B} kg with a tare of ${pc}%. What is the net weight in kg?`),
        B - T,
        [[T, L(lang, 'Itu taranya. Neto = bruto − tara.', 'That is the tare. Net = gross − tare.')], [B - pc, L(lang, `Tara ${pc}% bukan ${pc} kg. Hitung ${pc}% × ${B} kg.`, `A tare of ${pc}% is not ${pc} kg. Work out ${pc}% × ${B} kg.`)]],
        [L(lang, `Tara = ${pc}% × ${B} = ${M(lang, T)} kg.`, `Tare = ${pc}% × ${B} = ${M(lang, T)} kg.`), `${B} − ${M(lang, T)} = ${M(lang, B - T)}`],
        { kind, B, pc, asPct },
      );
    }
    const n = ri(rnd, 2, 5);
    const B = pick(rnd, [25, 50]);
    const T = pick(rnd, [0.5, 1]);
    const h = pick(rnd, [12000, 13000, 14000, 15000, 16000]);
    const tot = n * (B - T) * h;
    return num(
      L(lang, `Pedagang membeli ${n} ${it[0]}, masing-masing bruto ${B} kg dan tara ${M(lang, T)} kg. Harganya ${rp(lang, h)} per kg neto. Pedagang harus membayar Rp …`, `A trader buys ${n} of a ${it[1]}, each with gross weight ${B} kg and tare ${M(lang, T)} kg. The price is ${rp(lang, h)} per kg net. How much does the trader pay, in Rp?`),
      tot,
      [[n * B * h, L(lang, 'Yang dibayar hanya neto, bukan bruto.', 'Only the net weight is paid for, not the gross.')], [(B - T) * h, L(lang, `Ada ${n} ${it[0].split(' ')[0]}, bukan 1.`, `There are ${n} of them, not 1.`)]],
      [L(lang, `Neto total = ${n} × (${B} − ${M(lang, T)}) = ${M(lang, n * (B - T))} kg.`, `Total net = ${n} × (${B} − ${M(lang, T)}) = ${M(lang, n * (B - T))} kg.`), `${M(lang, n * (B - T))} × ${rp(lang, h)} = ${rp(lang, tot)}`],
      { kind, n, B, T, h },
    );
  },
  (m) => {
    if (m.kind === 0) return D(m.askN ? m.B - m.T : m.B);
    if (m.kind === 1) return D(m.asPct ? ((m.B - m.N) * 100) / m.B : m.B * (1 - m.pc / 100));
    return D(m.n * m.h * (m.B - m.T));
  },
);

export const K7 = {
  'b1-1': [cmpNeg, orderInt],
  'b1-2': [addInt, tempStory],
  'b1-3': [subInt, diffTemp],
  'b1-4': [mulDivInt, mulStory],
  'b1-5': [nFactors, primeFact],
  'b1-6': [fpbStory, kpkStory],
  'b2-1': [simplifyFrac, fillEquiv, largestFrac],
  'b2-2': [addFrac, addMixed],
  'b2-3': [mulDivFrac, ribbon],
  'b2-4': [decPct, discount],
  'b3-1': [coefQ, likeTerms],
  'b3-2': [addSubAlg, evalAlg],
  'b3-3': [distrib, binom],
  'b4-1': [lin1, lin2, consec],
  'b4-2': [ineq, lift],
  'b5-1': [ratioSimp, ratioPart],
  'b5-2': [direct, mapDirect],
  'b5-3': [inverse],
  'b5-4': [scale],
  'b6-1': [classify, clock],
  'b6-2': [compSupp],
  'b6-3': [parallel],
  'b7-1': [triAngles],
  'b7-2': [rectQ],
  'b7-3': [paraTri],
  'b7-4': [quadArea],
  'b8-1': [freqTable, dataType],
  'b8-2': [barNum, barPick],
  'b8-3': [pie],
  'b8-4': [centre],
  'b9-1': [profit],
  'b9-2': [discTax, discount],
  'b9-3': [interest],
  'b9-4': [bruto],
};
