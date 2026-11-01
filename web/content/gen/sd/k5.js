// Generator soal Kelas 5 SD.
import { L, ri, pick, num, mc, pool, names, name, sample, cap, words, G, Rp, F, gcd, D, N } from './common.js';
import { txt } from '../util.js';
import { ln, table } from '../../helpers.js';

const dv = (lang) => L(lang, ':', '÷');
const lcm = (a, b) => (a * b) / gcd(a, b);
const PL6 = [['ratus ribuan', 'hundred thousands'], ['puluh ribuan', 'ten thousands'], ['ribuan', 'thousands'], ['ratusan', 'hundreds'], ['puluhan', 'tens'], ['satuan', 'ones']];

// ---------- Bab 1: Bilangan sampai satu juta ----------
const bigPlace = (rnd, lang) => {
  const kind = pick(rnd, ['value', 'word', 'expand']);
  const ds = [ri(rnd, 1, 9), ...Array.from({ length: 5 }, () => (rnd() < 0.3 ? 0 : ri(rnd, 0, 9)))];
  const n = Number(ds.join(''));
  if (kind === 'value') {
    const cand = [0, 1, 2, 3, 4].filter((p) => ds[p] !== 0 && ds.indexOf(ds[p]) === p && ds.lastIndexOf(ds[p]) === p);
    if (!cand.length) return bigPlace(rnd, lang);
    const p = pick(rnd, cand);
    const v = ds[p] * 10 ** (5 - p);
    return num({
      q: L(lang, `Nilai angka ${ds[p]} pada ${G(lang, n)} adalah …`, `The value of the digit ${ds[p]} in ${G(lang, n)} is …`),
      ans: v,
      wrong: [[v / 10, L(lang, 'Hitung tempatnya dari kanan dengan teliti.', 'Count the places from the right carefully.')], [v * 10, L(lang, 'Hitung tempatnya dari kanan dengan teliti.', 'Count the places from the right carefully.')], [ds[p], L(lang, 'Yang ditanya nilainya, bukan angkanya.', 'We want its value, not the digit.')]],
      steps: [L(lang, `Angka ${ds[p]} di tempat ${PL6[p][0]}.`, `The ${ds[p]} is in the ${PL6[p][1]} place.`), L(lang, `Nilainya ${G(lang, v)}.`, `Its value is ${G(lang, v)}.`)],
      meta: { kind, n, p },
    });
  }
  if (kind === 'expand') {
    const parts = ds.map((d, i) => d * 10 ** (5 - i)).filter((x) => x);
    return num({
      q: `${parts.map((x) => G(lang, x)).join(' + ')} = …`,
      ans: n,
      wrong: [[ds.includes(0) ? Number(ds.filter((d) => d).join('')) : null, L(lang, 'Ada tempat yang kosong. Isi dengan 0.', 'Some places are empty. Fill them with 0.')]],
      steps: [L(lang, 'Tulis setiap angka di tempatnya, isi 0 untuk tempat yang kosong.', 'Write each digit in its place, with 0 in empty places.'), `= ${G(lang, n)}.`],
      meta: { kind, ds },
    });
  }
  const th = Math.floor(n / 1000);
  const rest = n % 1000;
  return num({
    q: L(lang, `${cap(words(lang, n))} ditulis …`, `${cap(words(lang, n))} is written as …`),
    ans: n,
    wrong: [[Number(`${th}${rest}`) !== n ? Number(`${th}${rest}`) : null, L(lang, `Setelah ribu selalu ada tiga angka: ${G(lang, th * 1000)} + ${rest} = ${G(lang, n)}.`, `After thousand there are always three digits: ${G(lang, th * 1000)} + ${rest} = ${G(lang, n)}.`)], [Number(`${th}000${rest}`) !== n ? Number(`${th}000${rest}`) : null, L(lang, `${G(lang, th * 1000)} dan ${rest} digabung menjadi ${G(lang, n)}.`, `${G(lang, th * 1000)} and ${rest} combine to ${G(lang, n)}.`)]],
    steps: [L(lang, `${words(lang, th)} ribu = ${G(lang, th * 1000)}.`, `${words(lang, th)} thousand = ${G(lang, th * 1000)}.`), `${G(lang, th * 1000)} + ${rest} = ${G(lang, n)}.`],
    meta: { kind, ds },
  });
};
bigPlace.solve = (m) => (m.kind === 'value' ? Number(String(m.n)[m.p]) * 10 ** (5 - m.p) : m.ds.reduce((a, d) => a * 10 + d, 0));

const bigCompare = (rnd, lang) => {
  const kind = pick(rnd, ['max', 'min', 'units']);
  if (kind === 'units') {
    const u = pick(rnd, [[100000, 'ratus ribuan', 'hundred thousands', 10], [10000, 'puluh ribuan', 'ten thousands', 100], [1000, 'ribuan', 'thousands', 1000]]);
    return num({
      q: L(lang, `Berapa ${u[1]} dalam 1.000.000?`, `How many ${u[2]} are in 1,000,000?`),
      ans: u[3],
      wrong: [[u[3] * 10, L(lang, 'Hitung banyak nolnya dengan teliti.', 'Count the zeros carefully.')], [u[3] / 10 >= 1 ? u[3] / 10 : null, L(lang, 'Hitung banyak nolnya dengan teliti.', 'Count the zeros carefully.')]],
      steps: [`${G(lang, 1000000)} ${dv(lang)} ${G(lang, u[0])} = ${G(lang, u[3])}.`],
      meta: { kind, u: u[0] },
    });
  }
  const a = ri(rnd, 100, 999) * 1000 + ri(rnd, 0, 999);
  const s = String(a).split('');
  const set = new Set([a]);
  while (set.size < 3) {
    const x = s.slice();
    const [i, j] = sample(rnd, [1, 2, 3, 4, 5], 2);
    [x[i], x[j]] = [x[j], x[i]];
    set.add(Number(x.join('')));
  }
  const xs = [...set];
  xs.push(Number(s.slice(1).join('')) + (rnd() < 0.5 ? 0 : 99999 - Number(s.slice(1).join(''))));
  const vals = [...new Set(xs)].filter((x) => x >= 1000);
  const mx = kind === 'max';
  const ans = mx ? Math.max(...vals) : Math.min(...vals);
  return mc({
    q: L(lang, `Bilangan ${mx ? 'terbesar' : 'terkecil'} adalah …`, `Which number is the ${mx ? 'greatest' : 'smallest'}?`),
    ok: G(lang, ans),
    bad: vals.filter((x) => x !== ans).map((x) => [G(lang, x), String(x).length !== String(ans).length ? L(lang, 'Hitung banyak angkanya dulu. Bilangan 6 angka selalu lebih besar dari bilangan 5 angka.', 'Count the digits first. A 6-digit number is always bigger than a 5-digit number.') : L(lang, 'Bandingkan angka dari tempat terbesar, satu per satu.', 'Compare digits from the biggest place, one by one.')]),
    steps: [L(lang, 'Bandingkan banyak angka, lalu angka dari kiri.', 'Compare how many digits, then digits from the left.'), L(lang, `${mx ? 'Terbesar' : 'Terkecil'}: ${G(lang, ans)}.`, `${mx ? 'Greatest' : 'Smallest'}: ${G(lang, ans)}.`)],
    meta: { kind, vals },
  });
};
bigCompare.solve = (m, lang) => (m.kind === 'units' ? 1000000 / m.u : G(lang, m.kind === 'max' ? Math.max(...m.vals) : Math.min(...m.vals)));

const bigAddSub = (rnd, lang) => {
  const kind = pick(rnd, ['add', 'sub', 'money', 'crowd']);
  if (kind === 'money') {
    const a = ri(rnd, 40, 99) * 1000;
    const b = ri(rnd, 10, a / 1000 - 5) * 1000 + pick(rnd, [0, 500]);
    const who = pick(rnd, [['Ayah', 'Dad'], ['Ibu', 'Mum'], ['Kakak', 'Big sister']]);
    return num({
      q: L(lang, `Tabungan ${who[0]} ${Rp(lang, a)}. ${who[0]} memakai ${Rp(lang, b)}. Sisa tabungan Rp …`, `${who[1]} has savings of ${Rp(lang, a)} and spends ${Rp(lang, b)}. How much is left (Rp)?`),
      ans: a - b,
      wrong: [[a + b, L(lang, 'Dipakai berarti berkurang.', 'Spending makes it less.')], [a - b + 1000, L(lang, 'Setelah meminjam, angka di sebelah kiri berkurang 1.', 'After borrowing, the digit on the left goes down by 1.')]],
      steps: [`${G(lang, a)} − ${G(lang, b)} = ${G(lang, a - b)}.`],
      meta: { op: '-', a, b },
    });
  }
  const a = ri(rnd, 10000, 69999);
  const b = ri(rnd, 10000, kind === 'sub' ? a - 1000 : 29999);
  if (kind === 'crowd')
    return num({
      q: L(lang, `Stadion terisi ${G(lang, a)} penonton di tribun utara dan ${G(lang, b)} di tribun selatan. Jumlah penonton …`, `A stadium has ${G(lang, a)} fans in the north stand and ${G(lang, b)} in the south stand. How many fans altogether?`),
      ans: a + b,
      wrong: [[a + b - 1000, L(lang, 'Ada simpanan yang lupa ditambahkan.', 'A carry was forgotten.')], [Math.abs(a - b), L(lang, 'Jumlah berarti ditambah.', 'Altogether means add.')]],
      steps: [L(lang, 'Sejajarkan tempatnya, jumlahkan dari satuan.', 'Line up the places and add from the ones.'), `${G(lang, a)} + ${G(lang, b)} = ${G(lang, a + b)}.`],
      meta: { op: '+', a, b },
    });
  const add = kind === 'add';
  const ans = add ? a + b : a - b;
  return num({
    q: `${G(lang, a)} ${add ? '+' : '−'} ${G(lang, b)} = …`,
    ans,
    wrong: add ? [[ans - 1000, L(lang, 'Ada simpanan yang lupa ditambahkan.', 'A carry was forgotten.')], [ans - 10, L(lang, 'Ada simpanan yang lupa ditambahkan.', 'A carry was forgotten.')]] : [[ans + 1000, L(lang, 'Setelah meminjam, angka sebelah kiri berkurang 1.', 'After borrowing, the digit to the left goes down by 1.')], [a + b, L(lang, 'Itu penjumlahan.', 'That is adding.')]],
    steps: [L(lang, `Sejajarkan tempatnya. Mulai dari satuan, ${add ? 'simpan' : 'pinjam'} bila perlu.`, `Line up the places. Start from the ones and ${add ? 'carry' : 'borrow'} when needed.`), `${G(lang, a)} ${add ? '+' : '−'} ${G(lang, b)} = ${G(lang, ans)}.`],
    meta: { op: add ? '+' : '-', a, b },
  });
};
bigAddSub.solve = (m) => (m.op === '+' ? m.a + m.b : m.a - m.b);

// ---------- Bab 2: KPK dan FPB ----------
const lcmGen = (rnd, lang) => {
  const kind = pick(rnd, ['lcm', 'lcm', 'nth']);
  if (kind === 'nth') {
    const a = ri(rnd, 3, 12);
    const k = ri(rnd, 2, 6);
    return num({
      q: L(lang, `Kelipatan ${a} yang ke-${k} adalah …`, `The ${k}${k === 2 ? 'nd' : k === 3 ? 'rd' : 'th'} multiple of ${a} is …`),
      ans: a * k,
      wrong: [[a + k, L(lang, 'Kelipatan ke-k = a × k.', 'The k-th multiple is a × k.')], [a * (k + 1), L(lang, `Kelipatan pertama adalah ${a} itu sendiri.`, `The first multiple is ${a} itself.`)], [a * (k - 1), L(lang, 'Hitung sampai urutan yang ditanya.', 'Count up to the one asked for.')]],
      steps: [`${Array.from({ length: k }, (_, i) => a * (i + 1)).join(', ')}.`, L(lang, `Yang ke-${k}: ${a * k}.`, `Number ${k}: ${a * k}.`)],
      meta: { kind, a, k },
    });
  }
  let a;
  let b;
  do {
    [a, b] = sample(rnd, [2, 3, 4, 5, 6, 8, 9, 10, 12, 15], 2);
  } while (lcm(a, b) > 60);
  const l = lcm(a, b);
  return num({
    q: L(lang, `KPK dari ${a} dan ${b} adalah …`, `The LCM of ${a} and ${b} is …`),
    ans: l,
    wrong: [[a * b !== l ? a * b : null, L(lang, `${a} × ${b} memang kelipatan bersama, tetapi bukan yang terkecil.`, `${a} × ${b} is a common multiple, but not the smallest.`)], [gcd(a, b), L(lang, 'Itu FPB. KPK adalah kelipatan bersama yang terkecil.', 'That is the HCF. The LCM is the smallest common multiple.')], [Math.max(a, b) % Math.min(a, b) ? Math.max(a, b) : null, L(lang, `${Math.max(a, b)} bukan kelipatan ${Math.min(a, b)}.`, `${Math.max(a, b)} is not a multiple of ${Math.min(a, b)}.`)]],
    steps: [L(lang, `Kelipatan ${a}: ${Array.from({ length: Math.min(6, l / a) }, (_, i) => a * (i + 1)).join(', ')}.`, `Multiples of ${a}: ${Array.from({ length: Math.min(6, l / a) }, (_, i) => a * (i + 1)).join(', ')}.`), L(lang, `Kelipatan ${b}: ${Array.from({ length: Math.min(6, l / b) }, (_, i) => b * (i + 1)).join(', ')}.`, `Multiples of ${b}: ${Array.from({ length: Math.min(6, l / b) }, (_, i) => b * (i + 1)).join(', ')}.`), L(lang, `Pertama kali sama: ${l}.`, `First common one: ${l}.`)],
    meta: { kind, a, b },
  });
};
lcmGen.solve = (m) => {
  if (m.kind === 'nth') return m.a * m.k;
  let x = m.a;
  while (x % m.b) x += m.a;
  return x;
};

const lcmStory = (rnd, lang) => {
  let a;
  let b;
  do {
    [a, b] = sample(rnd, [2, 3, 4, 5, 6, 8, 10, 12], 2);
  } while (lcm(a, b) > 40 || lcm(a, b) === Math.max(a, b));
  const [p, q] = names(rnd, 2);
  const ctx = pick(rnd, [['berenang', 'swims', 'hari', 'days'], ['ke perpustakaan', 'visits the library', 'hari', 'days'], ['menyiram tanaman', 'waters the plants', 'hari', 'days']]);
  const lamp = rnd() < 0.3;
  return num({
    q: lamp ? L(lang, `Lampu merah berkedip setiap ${a} detik, lampu hijau setiap ${b} detik. Keduanya baru saja berkedip bersama. Mereka akan berkedip bersama lagi … detik lagi.`, `A red light flashes every ${a} seconds and a green light every ${b} seconds. They just flashed together. They will flash together again in … seconds.`) : L(lang, `${p} ${ctx[0]} setiap ${a} ${ctx[2]}, ${q} setiap ${b} ${ctx[2]}. Hari ini mereka ${ctx[0]} bersama. Mereka akan ${ctx[0]} bersama lagi … hari lagi.`, `${p} ${ctx[1]} every ${a} days and ${q} every ${b} days. Today they go together. They will next go together in … days.`),
    ans: lcm(a, b),
    wrong: [[a + b, L(lang, 'Waktu bertemu lagi adalah KPK, bukan jumlahnya.', 'The next meeting is the LCM, not the sum.')], [gcd(a, b) > 1 ? gcd(a, b) : null, L(lang, 'Itu FPB. Cari kelipatan bersama terkecil.', 'That is the HCF. Find the lowest common multiple.')], [a * b !== lcm(a, b) ? a * b : null, L(lang, 'Itu memang bertemu, tetapi ada waktu yang lebih awal.', 'They do meet then, but there is an earlier time.')]],
    steps: [L(lang, 'Cari KPK.', 'Find the LCM.'), L(lang, `KPK ${a} dan ${b} = ${lcm(a, b)}.`, `LCM of ${a} and ${b} = ${lcm(a, b)}.`)],
    meta: { a, b },
  });
};
lcmStory.solve = (m) => {
  for (let x = Math.max(m.a, m.b); ; x++) if (x % m.a === 0 && x % m.b === 0) return x;
};

const gcdGen = (rnd, lang) => {
  const g = pick(rnd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
  let x;
  let y;
  do {
    [x, y] = sample(rnd, [1, 2, 3, 4, 5, 7], 2);
  } while (gcd(x, y) !== 1 || g * Math.max(x, y) > 72 || (g === 1 && Math.min(x, y) === 1));
  const a = g * x;
  const b = g * y;
  return num({
    q: L(lang, `FPB dari ${a} dan ${b} adalah …`, `The HCF of ${a} and ${b} is …`),
    ans: g,
    wrong: [[lcm(a, b), L(lang, 'Itu KPK. FPB adalah faktor bersama yang terbesar.', 'That is the LCM. The HCF is the biggest common factor.')], [g > 1 && g % 2 === 0 ? g / 2 : null, L(lang, 'Itu faktor bersama, tetapi bukan yang terbesar.', 'That is a common factor, but not the biggest.')], [Math.min(a, b) !== g ? Math.min(a, b) : null, L(lang, `${Math.min(a, b)} tidak membagi habis ${Math.max(a, b)}.`, `${Math.min(a, b)} does not divide ${Math.max(a, b)} exactly.`)]],
    steps: [L(lang, `Faktor ${a} dan ${b} yang sama, ambil yang terbesar.`, `List the factors of ${a} and ${b}, take the biggest shared one.`), L(lang, `${a} = ${g} × ${x}, ${b} = ${g} × ${y}. FPB = ${g}.`, `${a} = ${g} × ${x}, ${b} = ${g} × ${y}. HCF = ${g}.`)],
    meta: { a, b },
  });
};
gcdGen.solve = (m) => {
  for (let d = Math.min(m.a, m.b); d >= 1; d--) if (m.a % d === 0 && m.b % d === 0) return d;
};

const factors = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
const gcdStory = (rnd, lang) => {
  const kind = pick(rnd, ['basket', 'factors']);
  if (kind === 'factors') {
    const n = pick(rnd, [6, 8, 10, 12, 14, 15, 16, 18, 20, 21, 24]);
    const f = factors(n);
    const extra = pick(rnd, [4, 3, 5, 6, 7].filter((x) => n % x));
    const withX = [...f, extra].sort((a, b) => a - b);
    return mc({
      q: L(lang, `Faktor dari ${n} adalah …`, `The factors of ${n} are …`),
      ok: f.join(', '),
      bad: [[[n, 2 * n, 3 * n].join(', '), L(lang, 'Itu kelipatan, bukan faktor.', 'Those are multiples, not factors.')], [withX.join(', '), L(lang, `${extra} tidak membagi habis ${n}.`, `${extra} does not divide ${n} exactly.`)], [f.slice(1, -1).join(', ') || '1', L(lang, `1 dan ${n} juga faktor dari ${n}.`, `1 and ${n} are factors of ${n} too.`)]],
      steps: [L(lang, `Cari pasangan yang hasil kalinya ${n}.`, `Find pairs that multiply to ${n}.`), L(lang, `Faktor ${n}: ${f.join(', ')}.`, `Factors of ${n}: ${f.join(', ')}.`)],
      meta: { kind, n },
    });
  }
  const g = pick(rnd, [3, 4, 5, 6, 8, 10, 12]);
  let x;
  let y;
  do {
    [x, y] = sample(rnd, [2, 3, 4, 5], 2);
  } while (gcd(x, y) !== 1);
  const t = pick(rnd, [[['apel', 'apples'], ['jeruk', 'oranges'], 'keranjang', 'baskets'], [['pensil', 'pencils'], ['buku', 'books'], 'paket', 'packs'], [['roti', 'buns'], ['susu kotak', 'cartons of milk'], 'bingkisan', 'gift bags']]);
  return num({
    q: L(lang, `${g * x} ${t[0][0]} dan ${g * y} ${t[1][0]} dibagi ke beberapa ${t[2]} sama banyak tanpa sisa. Paling banyak … ${t[2]}.`, `${g * x} ${t[0][1]} and ${g * y} ${t[1][1]} are shared equally into ${t[3]} with none left over. What is the greatest number of ${t[3]}?`),
    ans: g,
    wrong: [[lcm(g * x, g * y), L(lang, 'Itu KPK. Membagi sama rata memakai FPB.', 'That is the LCM. Equal sharing uses the HCF.')], [g * x + g * y, L(lang, 'Cari faktor bersama terbesar.', 'Find the biggest common factor.')], [g % 2 === 0 ? g / 2 : null, L(lang, 'Bisa, tetapi bukan yang paling banyak.', 'That works, but it is not the most.')]],
    steps: [L(lang, `FPB dari ${g * x} dan ${g * y}.`, `HCF of ${g * x} and ${g * y}.`), `= ${g}.`],
    meta: { kind, a: g * x, b: g * y },
  });
};
gcdStory.solve = (m) => (m.kind === 'factors' ? factors(m.n).join(', ') : gcd(m.a, m.b));

// ---------- Bab 3: Pecahan ----------
const fracAdd = (rnd, lang) => {
  let a;
  let b;
  let c;
  let d;
  let op;
  let p;
  let q;
  do {
    [b, d] = sample(rnd, [2, 3, 4, 5, 6, 8, 10, 12], 2);
    a = ri(rnd, 1, b - 1);
    c = ri(rnd, 1, d - 1);
    op = rnd() < 0.6 ? '+' : '−';
    if (op === '−' && a * d < c * b) [a, b, c, d] = [c, d, a, b];
    p = op === '+' ? a * d + c * b : a * d - c * b;
    q = b * d;
  } while (lcm(b, d) > 24 || p <= 0 || p >= q || gcd(a, b) !== 1 || gcd(c, d) !== 1);
  const l = lcm(b, d);
  const ans = F(p, q);
  const story = op === '+' && rnd() < 0.3;
  const [n] = names(rnd, 1);
  return num({
    q: story ? L(lang, `${n} memakai ${a}/${b} kg gula untuk kue dan ${c}/${d} kg untuk minuman. Gula yang dipakai … kg. (bentuk paling sederhana)`, `${n} uses ${a}/${b} kg of sugar for a cake and ${c}/${d} kg for drinks. How many kg in all? (simplest form)`) : L(lang, `${a}/${b} ${op} ${c}/${d} = … (bentuk paling sederhana)`, `${a}/${b} ${op} ${c}/${d} = … (simplest form)`),
    ans,
    exact: true,
    exactWhy: L(lang, 'Nilainya benar, tetapi sederhanakan dulu pecahannya.', 'The value is right, but simplify the fraction.'),
    wrong: [[op === '+' ? `${a + c}/${b + d}` : a - c > 0 ? `${a - c}/${Math.abs(b - d) || 1}` : null, L(lang, 'Penyebut tidak ikut dijumlah atau dikurangi. Samakan penyebutnya dulu.', 'Do not add or subtract the denominators. Make them the same first.')], [op === '+' || a > c ? `${op === '+' ? a + c : a - c}/${l}` : null, L(lang, `Ubah dulu pembilangnya: ${a}/${b} = ${(a * l) / b}/${l} dan ${c}/${d} = ${(c * l) / d}/${l}.`, `Change the numerators too: ${a}/${b} = ${(a * l) / b}/${l} and ${c}/${d} = ${(c * l) / d}/${l}.`)]],
    steps: [L(lang, `Samakan penyebut dengan KPK ${b} dan ${d} = ${l}.`, `Use the LCM of ${b} and ${d}: ${l}.`), `${(a * l) / b}/${l} ${op} ${(c * l) / d}/${l} = ${(p * l) / q}/${l}.`, L(lang, `Sederhanakan: ${ans}.`, `Simplify: ${ans}.`)],
    meta: { a, b, c, d, op },
  });
};
fracAdd.solve = (m) => {
  const p = m.op === '+' ? m.a * m.d + m.c * m.b : m.a * m.d - m.c * m.b;
  return F(p, m.b * m.d);
};

const simplify = (rnd, lang) => {
  let a;
  let b;
  do {
    b = ri(rnd, 2, 9);
    a = ri(rnd, 1, b - 1);
  } while (gcd(a, b) !== 1);
  const k = ri(rnd, 2, 6);
  return num({
    q: L(lang, `Bentuk paling sederhana dari ${a * k}/${b * k} adalah …`, `The simplest form of ${a * k}/${b * k} is …`),
    ans: `${a}/${b}`,
    exact: true,
    exactWhy: L(lang, 'Masih bisa disederhanakan lagi.', 'It can still be simplified.'),
    wrong: [[`${a}/${b * k}`, L(lang, 'Pembilang dan penyebut harus dibagi dengan bilangan yang sama.', 'Divide the top and the bottom by the same number.')], [`${b}/${a}`, L(lang, 'Pembilang dan penyebut tertukar.', 'The top and bottom are swapped.')]],
    steps: [L(lang, `FPB ${a * k} dan ${b * k} = ${k}.`, `HCF of ${a * k} and ${b * k} = ${k}.`), `${a * k} ${dv(lang)} ${k} = ${a}, ${b * k} ${dv(lang)} ${k} = ${b}.`],
    meta: { p: a * k, q: b * k },
  });
};
simplify.solve = (m) => F(m.p, m.q);

const toMixed = (rnd, lang) => {
  const b = pick(rnd, [2, 3, 4, 5, 6, 8]);
  const w = ri(rnd, 1, 4);
  let r = ri(rnd, 1, b - 1);
  while (gcd(r, b) !== 1) r = ri(rnd, 1, b - 1);
  const a = w * b + r;
  const kind = rnd() < 0.5 ? 'imp2mix' : 'mix2imp';
  if (kind === 'mix2imp')
    return num({
      q: `${w} ${r}/${b} = …/${b}`,
      ans: a,
      wrong: [[w + r, L(lang, `Setiap utuh berisi ${b} bagian: ${w} × ${b} = ${w * b}.`, `Each whole has ${b} parts: ${w} × ${b} = ${w * b}.`)], [w * b, L(lang, `Jangan lupa tambahkan ${r} bagian.`, `Do not forget to add the ${r} parts.`)], [w * r + b, L(lang, `Kalikan bilangan utuh dengan penyebut: ${w} × ${b}.`, `Multiply the whole number by the denominator: ${w} × ${b}.`)]],
      steps: [`${w} × ${b} = ${w * b}.`, `${w * b} + ${r} = ${a}, ${L(lang, 'jadi', 'so')} ${a}/${b}.`],
      meta: { kind, w, r, b },
    });
  return mc({
    q: `${a}/${b} = …`,
    ok: `${w} ${r}/${b}`,
    bad: [[`${w} ${b - r}/${b}`, L(lang, `Sisanya ${r}, bukan ${b - r}.`, `The remainder is ${r}, not ${b - r}.`)], [`${w + 1} ${r}/${b}`, L(lang, `${a} ${dv(lang)} ${b} = ${w} sisa ${r}.`, `${a} ${dv(lang)} ${b} = ${w} remainder ${r}.`)], [w > 1 ? `${w - 1} ${r}/${b}` : `${w} ${r}/${a}`, L(lang, `${a} ${dv(lang)} ${b} = ${w} sisa ${r}, dan penyebutnya tetap ${b}.`, `${a} ${dv(lang)} ${b} = ${w} remainder ${r}, and the denominator stays ${b}.`)]],
    steps: [L(lang, `${a} ${dv(lang)} ${b} = ${w} sisa ${r}.`, `${a} ${dv(lang)} ${b} = ${w} remainder ${r}.`), `${w} ${r}/${b}.`],
    meta: { kind, a, b },
  });
};
toMixed.solve = (m) => (m.kind === 'mix2imp' ? m.w * m.b + m.r : `${Math.floor(m.a / m.b)} ${m.a % m.b}/${m.b}`);

const piecesWhole = (rnd, lang) => {
  const b = pick(rnd, [3, 4, 5, 6, 8]);
  const n = ri(rnd, b + 1, 4 * b - 1);
  const food = pick(rnd, [['kue', 'cake'], ['pizza', 'pizza'], ['roti', 'loaf']]);
  return num({
    q: L(lang, `Ada ${n} potong ${food[0]}, setiap potong 1/${b} ${food[0]}. Berapa ${food[0]} utuh yang bisa dibentuk?`, `There are ${n} pieces, each 1/${b} of a ${food[1]}. How many whole ${food[1]}${food[1] === 'loaf' ? '' : 's'} can be made?`.replace('whole loaf can', 'whole loaves can')),
    ans: Math.floor(n / b),
    wrong: [[Math.ceil(n / b), L(lang, `Sisa ${n % b} potong belum cukup untuk satu utuh.`, `The ${n % b} leftover pieces are not enough for a whole.`)], [n * b, L(lang, `Bagi dengan ${b}, jangan dikali.`, `Divide by ${b}, do not multiply.`)]],
    steps: [L(lang, `${b} potong = 1 utuh.`, `${b} pieces = 1 whole.`), L(lang, `${n} ${dv(lang)} ${b} = ${Math.floor(n / b)} sisa ${n % b}.`, `${n} ${dv(lang)} ${b} = ${Math.floor(n / b)} remainder ${n % b}.`)],
    meta: { n, b },
  });
};
piecesWhole.solve = (m) => (m.n - (m.n % m.b)) / m.b;

const decConv = (rnd, lang) => {
  const kind = pick(rnd, ['t10', 't100', 'back', 'common']);
  if (kind === 'common') {
    const [p, q] = pick(rnd, [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 20], [3, 20], [7, 25], [9, 50]]);
    const v = p / q;
    return num({
      q: L(lang, `${p}/${q} = … (tulis desimal)`, `${p}/${q} = … (write as a decimal)`),
      ans: v,
      wrong: [[Number(`${p}.${q}`), L(lang, 'Pembilang dan penyebut tidak boleh ditulis berdampingan dengan koma.', 'Do not just write the top and bottom with a point between.')], [q === 4 && p === 1 ? 0.4 : null, L(lang, '1/4 = 25/100, bukan 4/10.', '1/4 = 25/100, not 4/10.')]],
      steps: [L(lang, `Ubah penyebut menjadi 10 atau 100: ${p}/${q} = ${Math.round(v * 100)}/100.`, `Make the denominator 10 or 100: ${p}/${q} = ${Math.round(v * 100)}/100.`), `= ${N(lang, v)}.`],
      meta: { kind, p, q },
    });
  }
  if (kind === 'back') {
    const h = ri(rnd, 11, 99);
    return num({
      q: L(lang, `${N(lang, h / 100)} = …/100`, `${N(lang, h / 100)} = …/100`),
      ans: h,
      wrong: [[h / 10, L(lang, 'Ada dua angka di belakang koma, jadi per seratus.', 'There are two decimal places, so it is hundredths.')]],
      steps: [L(lang, `Dua angka di belakang koma: perseratus.`, 'Two decimal places: hundredths.'), `${N(lang, h / 100)} = ${h}/100.`],
      meta: { kind, h },
    });
  }
  const hundred = kind === 't100';
  const p = hundred ? ri(rnd, 1, 99) : ri(rnd, 1, 9);
  const q = hundred ? 100 : 10;
  if (hundred && p % 10 === 0) return decConv(rnd, lang);
  return num({
    q: L(lang, `${p}/${q} = … (tulis desimal)`, `${p}/${q} = … (write as a decimal)`),
    ans: p / q,
    wrong: [[hundred && p < 10 ? p / 10 : null, L(lang, `Per seratus berarti dua angka di belakang koma: 0,0${p}.`, `Hundredths means two decimal places: 0.0${p}.`)], [!hundred ? p / 100 : null, L(lang, 'Per sepuluh berarti satu angka di belakang koma.', 'Tenths means one decimal place.')]],
    steps: [L(lang, `Penyebut ${q}: ${hundred ? 'dua angka' : 'satu angka'} di belakang koma.`, `Denominator ${q}: ${hundred ? 'two' : 'one'} decimal place${hundred ? 's' : ''}.`), `= ${N(lang, p / q)}.`],
    meta: { kind, p, q },
  });
};
decConv.solve = (m) => (m.kind === 'back' ? m.h : m.p / m.q);

const decCmp = (rnd, lang) => {
  const a = ri(rnd, 1, 9) / 10;
  let b;
  do b = ri(rnd, 11, 99) / 100;
  while (Math.abs(b * 10 - Math.round(b * 10)) < 1e-9 || Math.abs(a - b) < 0.02);
  const big = rnd() < 0.6;
  const ans = big ? Math.max(a, b) : Math.min(a, b);
  const oth = ans === a ? b : a;
  return mc({
    q: L(lang, `Mana yang lebih ${big ? 'besar' : 'kecil'}?`, `Which is ${big ? 'greater' : 'smaller'}?`),
    ok: N(lang, ans),
    bad: [[N(lang, oth), L(lang, `Lebih banyak angka di belakang koma tidak berarti lebih besar. Tulis ${N(lang, a)} sebagai ${N(lang, a).replace(/(\d)$/, '$10')}, lalu bandingkan.`, `More decimal places does not mean bigger. Write ${N(lang, a)} as ${N(lang, a)}0, then compare.`)]],
    fixed: true,
    steps: [L(lang, `${N(lang, a)} = ${N(lang, a).replace(/(\d)$/, '$10')}.`, `${N(lang, a)} = ${N(lang, a)}0.`), L(lang, `Bandingkan ${Math.round(a * 100)} perseratus dan ${Math.round(b * 100)} perseratus.`, `Compare ${Math.round(a * 100)} hundredths and ${Math.round(b * 100)} hundredths.`)],
    meta: { a, b, big },
  });
};
decCmp.solve = (m, lang) => N(lang, m.big ? Math.max(m.a, m.b) : Math.min(m.a, m.b));

// ---------- Bab 4: Keliling dan luas ----------
const U = 18;
const rectFig = (w, h, lw, lh, unit = 'cm', fill = 'pos') => {
  const W = Math.min(300, w * U);
  const H = Math.min(170, h * U);
  return [
    { id: 'r', t: 'rect', x: 200, y: 135, w: W, h: H, r: 0, fill: `${fill}-soft`, stroke: fill, sw: 3 },
    txt('lw', `${lw} ${unit}`, 200, 135 + H / 2 + 18, { size: 16 }),
    txt('lh', `${lh} ${unit}`, 200 + W / 2 + 32, 135, { size: 16 }),
  ];
};
const perim = (rnd, lang) => {
  const kind = pick(rnd, ['sq', 'rect', 'tri']);
  if (kind === 'tri') {
    const s = [ri(rnd, 4, 15), ri(rnd, 4, 15), ri(rnd, 4, 15)].sort((x, y) => x - y);
    if (s[0] + s[1] <= s[2]) s[2] = s[0] + s[1] - 1;
    return num({
      q: L(lang, `Segitiga dengan sisi ${s.join(' cm, ')} cm kelilingnya … cm.`, `A triangle with sides ${s.join(' cm, ')} cm has a perimeter of … cm.`),
      ans: s[0] + s[1] + s[2],
      wrong: [[s[0] * s[1] * s[2], L(lang, 'Keliling dijumlah, bukan dikali.', 'Perimeter means adding, not multiplying.')], [s[0] + s[1], L(lang, 'Ketiga sisi dijumlah.', 'Add all three sides.')]],
      steps: [`${s.join(' + ')} = ${s[0] + s[1] + s[2]} cm.`],
      meta: { kind, s },
    });
  }
  const sq = kind === 'sq';
  const w = ri(rnd, 3, 16);
  const h = sq ? w : ri(rnd, 2, w - 1);
  return num({
    q: sq ? L(lang, `Keliling persegi dengan sisi ${w} cm adalah … cm.`, `The perimeter of a square with side ${w} cm is … cm.`) : L(lang, `Keliling persegi panjang ${w} cm × ${h} cm adalah … cm.`, `The perimeter of a ${w} cm × ${h} cm rectangle is … cm.`),
    fig: rnd() < 0.5 ? rectFig(w, h, w, h) : undefined,
    ans: 2 * (w + h),
    wrong: [[w * h, L(lang, 'Itu luas. Keliling = jumlah semua sisi.', 'That is the area. Perimeter = all the sides added.')], [w + h, L(lang, 'Itu baru dua sisi. Ada empat sisi.', 'That is only two sides. There are four.')]],
    steps: sq ? [`4 × ${w} = ${4 * w} cm.`] : [`2 × (${w} + ${h}) = 2 × ${w + h}`, `= ${2 * (w + h)} cm.`],
    meta: { kind, w, h },
  });
};
perim.solve = (m) => (m.kind === 'tri' ? m.s[0] + m.s[1] + m.s[2] : m.w + m.h + m.w + m.h);

const perimBack = (rnd, lang) => {
  const kind = pick(rnd, ['side', 'width', 'fence']);
  if (kind === 'fence') {
    const w = ri(rnd, 5, 20);
    const h = ri(rnd, 3, w);
    const shp = w === h;
    return num({
      q: L(lang, `Pak Tani memagari kebun ${w} m × ${h} m di sekelilingnya. Panjang pagar … m.`, `A farmer puts a fence all round a ${w} m × ${h} m garden. How many metres of fence?`),
      ans: 2 * (w + h),
      wrong: [[w * h, L(lang, 'Itu luas kebun. Pagar mengelilingi tepinya.', 'That is the area. The fence goes round the edge.')], [w + h, L(lang, 'Itu baru dua sisi.', 'That is only two sides.')]],
      steps: [`2 × (${w} + ${h}) = ${2 * (w + h)} m.`],
      meta: { kind, w, h, shp },
    });
  }
  if (kind === 'side') {
    const s = ri(rnd, 3, 25);
    return num({
      q: L(lang, `Persegi berkeliling ${4 * s} cm. Panjang sisinya … cm.`, `A square has a perimeter of ${4 * s} cm. Each side is … cm.`),
      ans: s,
      wrong: [[2 * s, L(lang, 'Persegi punya 4 sisi sama, jadi bagi dengan 4.', 'A square has 4 equal sides, so divide by 4.')], [4 * s * 4, L(lang, 'Bagi, jangan kali.', 'Divide, do not multiply.')]],
      steps: [`${4 * s} ${dv(lang)} 4 = ${s} cm.`],
      meta: { kind, P: 4 * s },
    });
  }
  const w = ri(rnd, 6, 20);
  const h = ri(rnd, 2, w - 1);
  return num({
    q: L(lang, `Persegi panjang berkeliling ${2 * (w + h)} cm dan panjangnya ${w} cm. Lebarnya … cm.`, `A rectangle has a perimeter of ${2 * (w + h)} cm and a length of ${w} cm. Its width is … cm.`),
    ans: h,
    wrong: [[2 * (w + h) - w, L(lang, 'Panjang ada dua sisi. Bagi keliling dengan 2 dulu.', 'There are two lengths. Halve the perimeter first.')]],
    steps: [`${2 * (w + h)} ${dv(lang)} 2 = ${w + h}.`, `${w + h} − ${w} = ${h} cm.`],
    meta: { kind, P: 2 * (w + h), w },
  });
};
perimBack.solve = (m) => (m.kind === 'fence' ? 2 * m.w + 2 * m.h : m.kind === 'side' ? m.P / 4 : m.P / 2 - m.w);

const areaRect = (rnd, lang) => {
  const sq = rnd() < 0.35;
  const w = ri(rnd, 3, 15);
  const h = sq ? w : ri(rnd, 2, 12);
  if (!sq && h === w) return areaRect(rnd, lang);
  const unit = pick(rnd, ['cm', 'm']);
  return num({
    q: sq ? L(lang, `Luas persegi dengan sisi ${w} ${unit} adalah … ${unit}².`, `The area of a square with side ${w} ${unit} is … ${unit}².`) : L(lang, `Luas persegi panjang ${w} ${unit} × ${h} ${unit} adalah … ${unit}².`, `The area of a ${w} ${unit} × ${h} ${unit} rectangle is … ${unit}².`),
    fig: rnd() < 0.5 ? rectFig(w, h, w, h, unit, 'ok') : undefined,
    ans: w * h,
    wrong: [[2 * (w + h), L(lang, 'Itu keliling. Luas = panjang × lebar.', 'That is the perimeter. Area = length × width.')], [w + h, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')], [sq ? 2 * w : null, L(lang, 'Sisi × sisi, bukan sisi × 2.', 'Side × side, not side × 2.')]],
    steps: [`${w} × ${h} = ${w * h} ${unit}².`],
    meta: { w, h },
  });
};
areaRect.solve = (m) => m.w * m.h;

const areaBack = (rnd, lang) => {
  const kind = pick(rnd, ['width', 'paint', 'tiles']);
  if (kind === 'paint') {
    const per = pick(rnd, [2, 3, 4, 5, 6]);
    let w;
    let h;
    do {
      w = ri(rnd, 2, 8);
      h = ri(rnd, 2, 6);
    } while ((w * h) % per);
    return num({
      q: L(lang, `Dinding ${w} m × ${h} m dicat. Satu kaleng cat cukup untuk ${per} m². Butuh … kaleng.`, `A ${w} m × ${h} m wall is painted. One tin covers ${per} m². How many tins are needed?`),
      ans: (w * h) / per,
      wrong: [[w * h, L(lang, `Itu luas dinding. Bagi dengan ${per}.`, `That is the wall area. Divide by ${per}.`)], [(2 * (w + h)) % per ? null : (2 * (w + h)) / per, L(lang, 'Cat menutupi luas, bukan keliling.', 'Paint covers the area, not the perimeter.')]],
      steps: [L(lang, `Luas: ${w} × ${h} = ${w * h} m².`, `Area: ${w} × ${h} = ${w * h} m².`), `${w * h} ${dv(lang)} ${per} = ${(w * h) / per}.`],
      meta: { kind, w, h, per },
    });
  }
  if (kind === 'tiles') {
    const a = ri(rnd, 2, 6);
    const b = ri(rnd, 2, 5);
    return num({
      q: L(lang, `Lantai ${a} m × ${b} m ditutup ubin berukuran 1 m × 1 m. Banyak ubin …`, `A ${a} m × ${b} m floor is covered with 1 m × 1 m tiles. How many tiles?`),
      ans: a * b,
      wrong: [[2 * (a + b), L(lang, 'Itu keliling. Ubin menutupi luas.', 'That is the perimeter. Tiles cover the area.')]],
      steps: [`${a} × ${b} = ${a * b}.`],
      meta: { kind, w: a, h: b, per: 1 },
    });
  }
  const w = ri(rnd, 3, 12);
  const h = ri(rnd, 2, 9);
  return num({
    q: L(lang, `Persegi panjang luasnya ${w * h} cm² dan panjangnya ${w} cm. Lebarnya … cm.`, `A rectangle has an area of ${w * h} cm² and a length of ${w} cm. Its width is … cm.`),
    ans: h,
    wrong: [[w * h - w, L(lang, 'Bagi luas dengan panjang, jangan dikurangi.', 'Divide the area by the length; do not subtract.')], [w * h * w, L(lang, 'Bagi, jangan kali.', 'Divide, do not multiply.')]],
    steps: [`${w * h} ${dv(lang)} ${w} = ${h} cm.`],
    meta: { kind, A: w * h, w },
  });
};
areaBack.solve = (m) => (m.kind === 'width' ? m.A / m.w : (m.w * m.h) / m.per);

const triFig = (base, height, right) => {
  const B = Math.min(260, base * 16);
  const H = Math.min(170, height * 16);
  const x0 = 200 - B / 2;
  const y0 = 225;
  const apexX = right ? x0 : x0 + B * 0.35;
  const els = [{ id: 't', t: 'poly', x: 0, y: 0, pts: [[x0, y0], [x0 + B, y0], [apexX, y0 - H]], fill: 'acc-soft', stroke: 'acc', sw: 3 }, txt('lb', `${base} cm`, 200, y0 + 18, { size: 15 })];
  if (!right) els.push(ln('h', apexX, y0 - H, apexX, y0, { sw: 2, c: 'neg', dash: '5 4' }));
  els.push({ id: 'ra', t: 'arc', x: apexX, y: y0, r: 14, a1: right ? 0 : 0, a2: 90, c: 'neg', right: true }, txt('lh', `${height} cm`, right ? apexX - 34 : apexX + 32, right ? y0 - H / 2 : y0 - H * 0.35, { size: 15 }));
  return els;
};
const triArea = (rnd, lang) => {
  let a;
  let t;
  do {
    a = ri(rnd, 3, 16);
    t = ri(rnd, 3, 12);
  } while ((a * t) % 2);
  const right = rnd() < 0.4;
  return num({
    q: right ? L(lang, `Luas segitiga siku-siku dengan sisi siku ${a} cm dan ${t} cm adalah … cm².`, `The area of a right triangle with legs ${a} cm and ${t} cm is … cm².`) : L(lang, `Luas segitiga dengan alas ${a} cm dan tinggi ${t} cm adalah … cm².`, `The area of a triangle with base ${a} cm and height ${t} cm is … cm².`),
    fig: rnd() < 0.6 ? triFig(a, t, right) : undefined,
    ans: (a * t) / 2,
    wrong: [[a * t, L(lang, 'Itu luas persegi panjang. Segitiga hanya setengahnya.', 'That is the rectangle. A triangle is only half.')], [a + t, L(lang, 'Kalikan alas dan tinggi, lalu bagi 2.', 'Multiply base by height, then halve.')]],
    steps: [`½ × ${a} × ${t}`, `= ${(a * t) / 2} cm².`],
    meta: { a, t },
  });
};
triArea.solve = (m) => 0.5 * m.a * m.t;

const triBack = (rnd, lang) => {
  const kind = pick(rnd, ['height', 'base', 'cut']);
  const a = ri(rnd, 4, 16);
  const t = ri(rnd, 3, 12);
  if ((a * t) % 2) return triBack(rnd, lang);
  if (kind === 'cut')
    return num({
      q: L(lang, `Persegi panjang ${a} cm × ${t} cm dipotong menurut diagonalnya. Luas satu bagian … cm².`, `A ${a} cm × ${t} cm rectangle is cut along a diagonal. The area of one piece is … cm².`),
      ans: (a * t) / 2,
      wrong: [[a * t, L(lang, 'Itu luas seluruh persegi panjang. Satu bagian setengahnya.', 'That is the whole rectangle. One piece is half.')]],
      steps: [`${a} × ${t} = ${a * t}.`, `${a * t} ${dv(lang)} 2 = ${N(lang, (a * t) / 2)} cm².`],
      meta: { kind, a, t },
    });
  const A = (a * t) / 2;
  const findH = kind === 'height';
  return num({
    q: findH ? L(lang, `Segitiga luasnya ${A} cm² dan alasnya ${a} cm. Tingginya … cm.`, `A triangle has an area of ${A} cm² and a base of ${a} cm. Its height is … cm.`) : L(lang, `Segitiga luasnya ${A} cm² dan tingginya ${t} cm. Alasnya … cm.`, `A triangle has an area of ${A} cm² and a height of ${t} cm. Its base is … cm.`),
    ans: findH ? t : a,
    wrong: [[findH ? A / a : A / t, L(lang, 'Ingat ½. Kalikan luas dengan 2 dulu.', 'Remember the ½. Double the area first.')]],
    steps: [`2 × ${A} = ${2 * A}.`, `${2 * A} ${dv(lang)} ${findH ? a : t} = ${findH ? t : a} cm.`],
    meta: { kind, A, k: findH ? a : t },
  });
};
triBack.solve = (m) => (m.kind === 'cut' ? (m.a * m.t) / 2 : (2 * m.A) / m.k);

// ---------- Bab 5: Sudut ----------
const rad = (d) => (d * Math.PI) / 180;
const ray = (id, x, y, deg, len) => ln(id, x, y, x + len * Math.cos(rad(deg)), y - len * Math.sin(rad(deg)), { sw: 3.5, c: 'pos', draw: false });
const protRead = (rnd, lang) => {
  const deg = ri(rnd, 1, 17) * 10;
  const fromLeft = rnd() < 0.35;
  const fig = [{ id: 'p', t: 'prot', x: 200, y: 230, r: 150, double: true }, ray('k1', 200, 230, fromLeft ? 180 : 0, 175), ray('k2', 200, 230, fromLeft ? 180 - deg : deg, 175)];
  return num({
    q: L(lang, 'Berapa derajat sudut ini?', 'How many degrees is this angle?'),
    fig,
    ans: deg,
    wrong: [[180 - deg, L(lang, 'Pakai skala yang angka 0-nya ada di kaki pertama.', 'Use the scale that starts at 0 on the first arm.')], [deg + 10, L(lang, 'Baca tepat di garis kaki kedua.', 'Read exactly where the second arm crosses.')]],
    steps: [L(lang, `Kaki pertama di 0 pada skala ${fromLeft ? 'dalam' : 'luar'}.`, `The first arm is at 0 on the ${fromLeft ? 'inner' : 'outer'} scale.`), L(lang, `Kaki kedua menunjuk ${deg}.`, `The second arm points to ${deg}.`)],
    meta: { deg },
  });
};
protRead.solve = (m) => m.deg;

const clockDeg = (rnd, lang) => {
  const kind = pick(rnd, ['clock', 'clock', 'fact']);
  if (kind === 'fact') {
    const f = pick(rnd, [['Satu putaran penuh', 'A full turn', 360], ['Sudut siku-siku', 'A right angle', 90], ['Sudut lurus', 'A straight angle', 180], ['Setengah putaran', 'Half a turn', 180], ['Seperempat putaran', 'A quarter turn', 90], ['Tiga perempat putaran', 'Three quarters of a turn', 270]]);
    return num({
      q: L(lang, `${f[0]} besarnya … derajat.`, `${f[1]} is … degrees.`),
      ans: f[2],
      wrong: [[f[2] === 360 ? 180 : 360, L(lang, 'Satu putaran = 360°, setengah = 180°, seperempat = 90°.', 'A full turn = 360°, a half = 180°, a quarter = 90°.')], [100, L(lang, 'Derajat tidak dihitung per seratus.', 'Degrees are not counted in hundreds.')]],
      steps: [L(lang, 'Satu putaran penuh = 360°.', 'A full turn = 360°.'), `= ${f[2]}°.`],
      meta: { kind, v: f[2] },
    });
  }
  const h = ri(rnd, 1, 11);
  const ans = Math.min(h, 12 - h) * 30;
  return num({
    q: L(lang, `Sudut terkecil yang dibentuk jarum jam pada pukul ${h}.00 adalah … derajat.`, `The smaller angle between the clock hands at ${h} o'clock is … degrees.`),
    ans,
    wrong: [[h * 30 !== ans ? h * 30 : 360 - ans, L(lang, 'Ambil sudut yang lebih kecil.', 'Take the smaller angle.')], [Math.min(h, 12 - h) * 5, L(lang, 'Setiap angka jam berjarak 30°, bukan 5°.', 'Each hour mark is 30° apart, not 5°.')]],
    steps: [L(lang, '360° dibagi 12 angka = 30° per angka.', '360° ÷ 12 hours = 30° per hour.'), `${Math.min(h, 12 - h)} × 30 = ${ans}°.`],
    meta: { kind, h },
  });
};
clockDeg.solve = (m) => {
  if (m.kind === 'fact') return m.v;
  const d = (m.h * 360) / 12;
  return d > 180 ? 360 - d : d;
};

const KINDS = [['lancip', 'acute'], ['siku-siku', 'right'], ['tumpul', 'obtuse'], ['lurus', 'straight']];
const kindOf = (d) => (d < 90 ? 0 : d === 90 ? 1 : d < 180 ? 2 : 3);
const angleType = (rnd, lang) => {
  const k = pick(rnd, [0, 0, 1, 2, 2, 3]);
  const d = k === 0 ? ri(rnd, 1, 17) * 5 : k === 1 ? 90 : k === 2 ? ri(rnd, 19, 35) * 5 : 180;
  const draw = rnd() < 0.5 && k !== 3;
  const fig = draw ? [ray('a', 200 - (d > 90 ? -60 : 70), 210, 0, 150), ray('b', 200 - (d > 90 ? -60 : 70), 210, d, 150), { id: 'm', t: 'arc', x: 200 - (d > 90 ? -60 : 70), y: 210, r: 28, a1: 0, a2: d, c: 'neg', label: `${d}°`, right: d === 90 }] : undefined;
  return mc({
    q: L(lang, `Sudut ${d}° termasuk sudut …`, `An angle of ${d}° is …`),
    fig,
    ok: L(lang, ...KINDS[k]),
    bad: [0, 1, 2, 3].filter((x) => x !== k).map((x) => [L(lang, ...KINDS[x]), [L(lang, 'Lancip: kurang dari 90°.', 'Acute: less than 90°.'), L(lang, 'Siku-siku: tepat 90°.', 'Right: exactly 90°.'), L(lang, 'Tumpul: antara 90° dan 180°.', 'Obtuse: between 90° and 180°.'), L(lang, 'Lurus: tepat 180°.', 'Straight: exactly 180°.')][x]]),
    fixed: true,
    steps: [L(lang, 'Lancip < 90°, siku-siku = 90°, tumpul antara 90° dan 180°, lurus = 180°.', 'Acute < 90°, right = 90°, obtuse between 90° and 180°, straight = 180°.'), L(lang, `${d}°: ${KINDS[k][0]}.`, `${d}°: ${KINDS[k][1]}.`)],
    meta: { d },
  });
};
angleType.solve = (m, lang) => L(lang, ...KINDS[kindOf(m.d)]);

const angleObjects = pool([
  (l) => ({ q: L(l, 'Pojok buku membentuk sudut …', 'The corner of a book makes a … angle.'), ok: L(l, 'siku-siku', 'right'), bad: [[L(l, 'lancip', 'acute'), L(l, 'Pojok buku tepat 90°.', 'A book corner is exactly 90°.')], [L(l, 'tumpul', 'obtuse'), L(l, 'Pojok buku tepat 90°.', 'A book corner is exactly 90°.')]], steps: [L(l, 'Pojok buku = 90°: siku-siku.', 'Book corner = 90°: right angle.')] }),
  (l) => ({ q: L(l, 'Jarum jam pada pukul 6.00 membentuk sudut …', 'At 6 o\'clock the hands make a … angle.'), ok: L(l, 'lurus', 'straight'), bad: [[L(l, 'tumpul', 'obtuse'), L(l, 'Kedua jarum segaris: 180°.', 'The hands are in a line: 180°.')], [L(l, 'siku-siku', 'right'), L(l, 'Itu pukul 3.00 atau 9.00.', 'That is 3 or 9 o\'clock.')]], steps: [L(l, '6 × 30° = 180°.', '6 × 30° = 180°.')] }),
  (l) => ({ q: L(l, 'Jarum jam pada pukul 1.00 membentuk sudut …', 'At 1 o\'clock the hands make a … angle.'), ok: L(l, 'lancip', 'acute'), bad: [[L(l, 'siku-siku', 'right'), L(l, 'Hanya 30°.', 'It is only 30°.')], [L(l, 'tumpul', 'obtuse'), L(l, '30° kurang dari 90°.', '30° is less than 90°.')]], steps: [L(l, '1 × 30° = 30°: lancip.', '1 × 30° = 30°: acute.')] }),
  (l) => ({ q: L(l, 'Jarum jam pada pukul 5.00 membentuk sudut …', 'At 5 o\'clock the hands make a … angle.'), ok: L(l, 'tumpul', 'obtuse'), bad: [[L(l, 'lancip', 'acute'), L(l, '150° lebih dari 90°.', '150° is more than 90°.')], [L(l, 'lurus', 'straight'), L(l, 'Lurus itu pukul 6.00.', 'Straight is 6 o\'clock.')]], steps: [L(l, '5 × 30° = 150°: tumpul.', '5 × 30° = 150°: obtuse.')] }),
  (l) => ({ q: L(l, 'Sudut yang lebih besar dari 90° tetapi kurang dari 180° disebut …', 'An angle more than 90° but less than 180° is …'), ok: L(l, 'tumpul', 'obtuse'), bad: [[L(l, 'lancip', 'acute'), L(l, 'Lancip kurang dari 90°.', 'Acute is less than 90°.')], [L(l, 'lurus', 'straight'), L(l, 'Lurus tepat 180°.', 'Straight is exactly 180°.')]], steps: [L(l, 'Antara 90° dan 180°: tumpul.', 'Between 90° and 180°: obtuse.')] }),
  (l) => ({ q: L(l, 'Penggaris segitiga punya sudut 30°. Sudut itu …', 'A set square has a 30° angle. That angle is …'), ok: L(l, 'lancip', 'acute'), bad: [[L(l, 'tumpul', 'obtuse'), L(l, '30° kurang dari 90°.', '30° is less than 90°.')], [L(l, 'siku-siku', 'right'), L(l, 'Siku-siku tepat 90°.', 'Right is exactly 90°.')]], steps: [L(l, '30° < 90°: lancip.', '30° < 90°: acute.')] }),
  (l) => ({ q: L(l, 'Saat mengukur sudut, titik tengah busur diletakkan di …', 'When measuring an angle, the centre of the protractor goes on …'), ok: L(l, 'titik sudut', 'the vertex'), bad: [[L(l, 'ujung kaki sudut', 'the end of an arm'), L(l, 'Titik tengah busur harus tepat di titik sudut.', 'The centre must sit on the vertex.')], [L(l, 'mana saja', 'anywhere'), L(l, 'Kalau tidak di titik sudut, hasilnya salah.', 'If it is not on the vertex, the reading is wrong.')]], steps: [L(l, 'Titik tengah di titik sudut, garis 0 di salah satu kaki.', 'Centre on the vertex, 0 line on one arm.')] }),
  (l) => ({ q: L(l, 'Pintu yang terbuka lebar sekali, hampir menempel ke dinding, membentuk sudut …', 'A door opened very wide, almost touching the wall, makes a … angle.'), ok: L(l, 'tumpul', 'obtuse'), bad: [[L(l, 'lancip', 'acute'), L(l, 'Bukaannya sudah lebih dari siku-siku.', 'It is opened wider than a right angle.')], [L(l, 'siku-siku', 'right'), L(l, 'Bukaannya lebih lebar dari 90°.', 'It is wider than 90°.')]], steps: [L(l, 'Lebih dari 90° tetapi belum 180°: tumpul.', 'More than 90° but not yet 180°: obtuse.')] }),
  (l) => ({ q: L(l, 'Satu putaran penuh besarnya …', 'A full turn is …'), ok: '360°', bad: [['180°', L(l, 'Itu setengah putaran.', 'That is half a turn.')], ['100°', L(l, 'Derajat tidak per seratus.', 'Degrees are not in hundreds.')]], steps: [L(l, 'Satu putaran = 360°.', 'A full turn = 360°.')] }),
  (l) => ({ q: L(l, 'Jarum jam pada pukul 9.00 membentuk sudut …', 'At 9 o\'clock the hands make a … angle.'), ok: L(l, 'siku-siku', 'right'), bad: [[L(l, 'tumpul', 'obtuse'), L(l, 'Sudut terkecilnya 90°.', 'The smaller angle is 90°.')], [L(l, 'lurus', 'straight'), L(l, 'Lurus itu pukul 6.00.', 'Straight is 6 o\'clock.')]], steps: [L(l, '3 angka × 30° = 90°.', '3 hours × 30° = 90°.')] }),
]);

// ---------- Bab 6: Data ----------
const modeData = (rnd, lang) => {
  const ctx = pick(rnd, [['Nilai ulangan', 'Test scores', 5, 10, ''], ['Tinggi tanaman (cm)', 'Plant heights (cm)', 11, 18, ''], ['Ukuran sepatu', 'Shoe sizes', 33, 38, ''], ['Banyak saudara', 'Number of siblings', 0, 4, '']]);
  const vals = sample(rnd, Array.from({ length: ctx[3] - ctx[2] + 1 }, (_, i) => ctx[2] + i), 4);
  const mode = vals[0];
  const counts = [ri(rnd, 3, 4), ...vals.slice(1).map(() => ri(rnd, 1, 2))];
  const data = [];
  vals.forEach((v, i) => {
    for (let k = 0; k < counts[i]; k++) data.push(v);
  });
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  const sorted = data.slice().sort((a, b) => a - b);
  return num({
    q: L(lang, `${ctx[0]}: ${data.join(', ')}. Modusnya …`, `${ctx[1]}: ${data.join(', ')}. The mode is …`),
    ans: mode,
    wrong: [[Math.max(...data) !== mode ? Math.max(...data) : null, L(lang, 'Modus bukan nilai terbesar, tetapi yang paling sering muncul.', 'The mode is not the largest value; it is the most frequent.')], [counts[0], L(lang, `${counts[0]} adalah banyaknya muncul. Modusnya nilai itu sendiri.`, `${counts[0]} is how often it appears. The mode is the value itself.`)], [sorted[Math.floor(sorted.length / 2)] !== mode ? sorted[Math.floor(sorted.length / 2)] : null, L(lang, 'Itu nilai tengah, bukan yang paling sering.', 'That is the middle value, not the most frequent.')]],
    steps: [L(lang, `Hitung: ${vals.map((v, i) => `${v} muncul ${counts[i]} kali`).join(', ')}.`, `Count: ${vals.map((v, i) => `${v} appears ${counts[i]} times`).join(', ')}.`), L(lang, `Paling sering: ${mode}.`, `Most frequent: ${mode}.`)],
    meta: { data },
  });
};
modeData.solve = (m) => {
  const c = {};
  m.data.forEach((x) => (c[x] = (c[x] || 0) + 1));
  return Number(Object.keys(c).reduce((a, b) => (c[b] > c[a] ? b : a)));
};

const freqTable = (rnd, lang) => {
  const start = ri(rnd, 5, 6);
  const vals = [start, start + 1, start + 2, start + 3, start + 4].slice(0, 5);
  const f = sample(rnd, [1, 2, 3, 4, 5, 6, 7], 5);
  const kind = pick(rnd, ['one', 'total', 'mode', 'atleast']);
  const i = ri(rnd, 0, 4);
  const fig = [table('tb', 200, 140, [[L(lang, 'nilai', 'score'), L(lang, 'banyak anak', 'children')], ...vals.map((v, k) => [String(v), String(f[k])])], { cw: [110, 140], rh: 30, size: 15, head: true })];
  const tot = f.reduce((a, b) => a + b, 0);
  const mi = f.indexOf(Math.max(...f));
  const thr = vals[3];
  const ans = kind === 'one' ? f[i] : kind === 'total' ? tot : kind === 'mode' ? vals[mi] : f[3] + f[4];
  return num({
    q: kind === 'one' ? L(lang, `Menurut tabel, berapa anak yang mendapat nilai ${vals[i]}?`, `From the table, how many children scored ${vals[i]}?`) : kind === 'total' ? L(lang, 'Menurut tabel, berapa anak seluruhnya?', 'From the table, how many children in total?') : kind === 'mode' ? L(lang, 'Menurut tabel, modus nilainya …', 'From the table, the mode score is …') : L(lang, `Berapa anak yang mendapat nilai ${thr} atau lebih?`, `How many children scored ${thr} or more?`),
    fig,
    ans,
    wrong: kind === 'mode' ? [[f[mi], L(lang, 'Itu banyak anaknya. Modus adalah nilainya.', 'That is how many children. The mode is the score.')], [vals[4], L(lang, 'Modus bukan nilai terbesar.', 'The mode is not the highest score.')]] : kind === 'total' ? [[vals.reduce((a, b) => a + b, 0), L(lang, 'Jumlahkan kolom banyak anak, bukan kolom nilai.', 'Add the children column, not the score column.')], [5, L(lang, 'Itu banyak baris.', 'That is the number of rows.')]] : kind === 'atleast' ? [[f[4], L(lang, `"Atau lebih" berarti ${thr} juga dihitung.`, `"Or more" includes ${thr} too.`)]] : [[vals[i], L(lang, 'Itu nilainya. Lihat kolom banyak anak.', 'That is the score. Look at the children column.')]],
    steps: kind === 'one' ? [L(lang, `Baris nilai ${vals[i]}: ${f[i]} anak.`, `Row for ${vals[i]}: ${f[i]} children.`)] : kind === 'total' ? [`${f.join(' + ')} = ${tot}.`] : kind === 'mode' ? [L(lang, `Frekuensi terbesar ${f[mi]}, yaitu nilai ${vals[mi]}.`, `The biggest frequency is ${f[mi]}, for score ${vals[mi]}.`)] : [`${f[3]} + ${f[4]} = ${f[3] + f[4]}.`],
    meta: { kind, vals, f, i },
  });
};
freqTable.solve = (m) => {
  if (m.kind === 'one') return m.f[m.i];
  if (m.kind === 'total') return m.f.reduce((a, b) => a + b, 0);
  if (m.kind === 'mode') return m.vals[m.f.indexOf(Math.max(...m.f))];
  return m.f.filter((_, k) => m.vals[k] >= m.vals[3]).reduce((a, b) => a + b, 0);
};

const FOOD = [['roti', 'bread'], ['nasi', 'rice'], ['susu', 'milk'], ['buah', 'fruit'], ['bubur', 'porridge']];
const COLS = ['neg', 'acc', 'ok', 'pos', 'neg'];
const barData = (rnd, lang) => {
  const nb = ri(rnd, 4, 5);
  const fr = sample(rnd, FOOD, nb);
  const v = sample(rnd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], nb);
  const kind = pick(rnd, ['one', 'diff', 'sum', 'total']);
  const [i, j] = sample(rnd, Array.from({ length: nb }, (_, x) => x), 2);
  const [hi, lo] = v[i] > v[j] ? [i, j] : [j, i];
  const tot = v.reduce((a, b) => a + b, 0);
  const ans = kind === 'one' ? v[i] : kind === 'diff' ? v[hi] - v[lo] : kind === 'sum' ? v[i] + v[j] : tot;
  const fn = (x) => L(lang, fr[x][0], fr[x][1]);
  return num({
    q: kind === 'one' ? L(lang, `Berapa siswa yang memilih ${fr[i][0]} untuk sarapan?`, `How many pupils chose ${fr[i][1]} for breakfast?`) : kind === 'diff' ? L(lang, `Berapa selisih pemilih ${fr[hi][0]} dan ${fr[lo][0]}?`, `What is the difference between ${fr[hi][1]} and ${fr[lo][1]}?`) : kind === 'sum' ? L(lang, `Berapa siswa yang memilih ${fr[i][0]} atau ${fr[j][0]}?`, `How many pupils chose ${fr[i][1]} or ${fr[j][1]}?`) : L(lang, 'Berapa banyak siswa seluruhnya?', 'How many pupils in total?'),
    fig: [{ id: 'bc', t: 'bars', x: 215, y: 150, w: 300, h: 170, max: 10, tick: 2, data: v.map((x, k) => ({ l: fn(k), v: x, c: COLS[k] })) }],
    ans,
    wrong: kind === 'one' ? [v[i] % 2 ? [v[i] + 1, L(lang, 'Garis naik 2-2. Ujung batang di tengah dua garis berarti bilangan ganjil di antaranya.', 'The lines go up in 2s. A bar ending between lines is the odd number in between.')] : [v[i] + 2, L(lang, 'Ikuti ujung batang lurus ke angka di kiri.', 'Follow the top of the bar straight across to the scale.')]] : kind === 'diff' ? [[v[hi] + v[lo], L(lang, 'Selisih: kurangi.', 'Difference: subtract.')]] : kind === 'sum' ? [[v[hi] - v[lo], L(lang, '"Atau" berarti dijumlah.', '"Or" means add them.')]] : [[tot - v[nb - 1], L(lang, 'Ada batang yang terlewat.', 'A bar was missed.')], [nb, L(lang, 'Itu banyak jenis makanan.', 'That is the number of food types.')]],
    steps: kind === 'one' ? [L(lang, `Ujung batang ${fn(i)} di ${v[i]}.`, `The ${fn(i)} bar ends at ${v[i]}.`)] : kind === 'diff' ? [`${v[hi]} − ${v[lo]} = ${ans}.`] : kind === 'sum' ? [`${v[i]} + ${v[j]} = ${ans}.`] : [`${v.join(' + ')} = ${tot}.`],
    meta: { kind, v, i, j },
  });
};
barData.solve = (m) => (m.kind === 'one' ? m.v[m.i] : m.kind === 'diff' ? Math.abs(m.v[m.i] - m.v[m.j]) : m.kind === 'sum' ? m.v[m.i] + m.v[m.j] : m.v.reduce((a, b) => a + b, 0));

const barMode = (rnd, lang) => {
  const nb = ri(rnd, 4, 5);
  const fr = sample(rnd, FOOD, nb);
  const v = sample(rnd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], nb);
  const k = v.indexOf(Math.max(...v));
  const fn = (x) => L(lang, fr[x][0], fr[x][1]);
  return mc({
    q: L(lang, 'Modus data pada diagram ini adalah …', 'The mode of the data in this chart is …'),
    fig: [{ id: 'bc', t: 'bars', x: 215, y: 150, w: 300, h: 170, max: 10, tick: 2, data: v.map((x, q) => ({ l: fn(q), v: x, c: COLS[q] })) }],
    ok: fn(k),
    bad: Array.from({ length: nb }, (_, x) => x).filter((x) => x !== k).map((x) => [fn(x), x === v.indexOf(Math.min(...v)) ? L(lang, 'Itu batang paling pendek. Modus = batang paling tinggi.', 'That is the shortest bar. The mode is the tallest bar.') : x === nb - 1 ? L(lang, 'Modus bukan batang paling kanan, tetapi yang paling tinggi.', 'The mode is not the rightmost bar, but the tallest.') : L(lang, `Batang ${fn(x)} bukan yang paling tinggi.`, `The ${fn(x)} bar is not the tallest.`)]),
    max: 4,
    steps: [L(lang, 'Modus ditunjukkan batang paling tinggi.', 'The mode is shown by the tallest bar.'), L(lang, `Itu ${fn(k)} (${v[k]}).`, `That is ${fn(k)} (${v[k]}).`)],
    meta: { v, fr },
  });
};
barMode.solve = (m, lang) => {
  let k = 0;
  m.v.forEach((x, i) => {
    if (x > m.v[k]) k = i;
  });
  return L(lang, m.fr[k][0], m.fr[k][1]);
};

export const K5 = {
  'k5b1-1': [bigPlace, bigCompare],
  'k5b1-2': [bigAddSub],
  'k5b2-1': [lcmGen, lcmStory],
  'k5b2-2': [gcdGen, gcdStory],
  'k5b3-1': [fracAdd, simplify],
  'k5b3-2': [toMixed, piecesWhole],
  'k5b3-3': [decConv, decCmp],
  'k5b4-1': [perim, perimBack],
  'k5b4-2': [areaRect, areaBack],
  'k5b4-3': [triArea, triBack],
  'k5b5-1': [protRead, clockDeg],
  'k5b5-2': [angleType, angleObjects],
  'k5b6-1': [modeData, freqTable],
  'k5b6-2': [barData, barMode],
};
