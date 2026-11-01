// Generator soal Kelas 6 SD.
import { L, ri, pick, num, mc, pool, names, name, sample, cap, G, Rp, F, gcd, D, N } from './common.js';
import { blockOf } from '../../k6/kit.js';

const dv = (lang) => L(lang, ':', '÷');
const coprime = (rnd, maxD = 9) => {
  let a;
  let b;
  do {
    b = ri(rnd, 2, maxD);
    a = ri(rnd, 1, b - 1);
  } while (gcd(a, b) !== 1);
  return [a, b];
};
const EXW = (lang) => L(lang, 'Nilainya benar, tetapi tulis dalam bentuk paling sederhana.', 'The value is right, but write it in simplest form.');

// ---------- Bab 1: Pecahan dan persen ----------
const fracMul = (rnd, lang) => {
  const kind = pick(rnd, ['ff', 'ff', 'wf']);
  if (kind === 'wf') {
    const [a, b] = coprime(rnd, 8);
    const w = ri(rnd, 2, 9);
    return num({
      q: `${w} × ${a}/${b} = …`,
      ans: F(w * a, b),
      exact: true,
      exactWhy: EXW(lang),
      wrong: [[`${w * a}/${w * b}`, L(lang, 'Bilangan bulat hanya dikali dengan pembilang.', 'The whole number multiplies only the numerator.')], [`${a}/${w * b}`, L(lang, 'Bilangan bulat dikali pembilang, bukan penyebut.', 'Multiply the numerator, not the denominator.')]],
      steps: [`${w} × ${a}/${b} = ${w * a}/${b}`, `= ${F(w * a, b)}.`],
      meta: { kind, a, b, c: w, d: 1 },
    });
  }
  const [a, b] = coprime(rnd, 6);
  const [c, d] = coprime(rnd, 6);
  return num({
    q: L(lang, `${a}/${b} × ${c}/${d} = … (sederhanakan)`, `${a}/${b} × ${c}/${d} = … (simplify)`),
    ans: F(a * c, b * d),
    exact: true,
    exactWhy: EXW(lang),
    wrong: [[b + d !== b * d ? `${a * c}/${b + d}` : null, L(lang, 'Penyebut juga dikali, bukan dijumlah.', 'Multiply the denominators too, do not add them.')], [`${a * d}/${b * c}`, L(lang, 'Itu cara membagi. Untuk mengali: atas × atas, bawah × bawah.', 'That is dividing. To multiply: top × top, bottom × bottom.')]],
    steps: [L(lang, 'Pembilang × pembilang, penyebut × penyebut.', 'Top × top, bottom × bottom.'), `${a}/${b} × ${c}/${d} = ${a * c}/${b * d}${F(a * c, b * d) !== `${a * c}/${b * d}` ? ` = ${F(a * c, b * d)}` : ''}.`],
    meta: { kind, a, b, c, d },
  });
};
fracMul.solve = (m) => F(m.a * m.c, m.b * m.d);

const fracMulStory = (rnd, lang) => {
  const kind = pick(rnd, ['rib', 'cmp']);
  if (kind === 'cmp') {
    const [a, b] = coprime(rnd, 8);
    const [c, d] = coprime(rnd, 8);
    return mc({
      q: L(lang, `Hasil ${a}/${b} × ${c}/${d} dibandingkan ${c}/${d} adalah …`, `Compared with ${c}/${d}, the result of ${a}/${b} × ${c}/${d} is …`),
      ok: L(lang, 'lebih kecil', 'smaller'),
      bad: [[L(lang, 'lebih besar', 'bigger'), L(lang, `Dikali pecahan kurang dari 1 berarti mengambil sebagian, jadi hasilnya mengecil.`, 'Multiplying by a fraction less than 1 takes a part, so it gets smaller.')], [L(lang, 'sama', 'the same'), L(lang, `Hanya sama kalau dikali 1. ${a}/${b} kurang dari 1.`, `It stays the same only when multiplied by 1. ${a}/${b} is less than 1.`)]],
      fixed: true,
      steps: [L(lang, `${a}/${b} × ${c}/${d} berarti ${a}/${b} bagian dari ${c}/${d}.`, `${a}/${b} × ${c}/${d} means ${a}/${b} of ${c}/${d}.`), L(lang, 'Sebagian selalu lebih kecil dari utuhnya.', 'A part is smaller than the whole.')],
      meta: { kind, a, b },
    });
  }
  const [a, b] = coprime(rnd, 6);
  const [c, d] = pick(rnd, [[1, 2], [1, 3], [1, 4], [2, 3], [3, 4]]);
  const t = pick(rnd, [['Pita', 'A ribbon', 'm', 'dipotong', 'is cut off'], ['Tali', 'A rope', 'm', 'dipakai', 'is used'], ['Kue', 'A cake weighing', 'kg', 'dimakan', 'is eaten']]);
  return num({
    q: L(lang, `${t[0]} ${a}/${b} ${t[2]}. Sebanyak ${c}/${d} bagiannya ${t[3]}. Panjang atau berat bagian itu … ${t[2]}. (sederhanakan)`, `${t[1]} ${a}/${b} ${t[2]}. ${c}/${d} of it ${t[4]}. How many ${t[2]} is that part? (simplify)`).replace('Panjang atau berat bagian itu', t[2] === 'kg' ? 'Berat bagian itu' : 'Panjang bagian itu'),
    ans: F(a * c, b * d),
    exact: true,
    exactWhy: EXW(lang),
    wrong: [[F(a * d, b * c), L(lang, '"Bagian dari" berarti dikali, bukan dibagi.', '"Of" means multiply, not divide.')], [F(a * d - c * b > 0 ? a * d - c * b : c * b - a * d, b * d), L(lang, 'Kalikan kedua pecahan, jangan dikurangi.', 'Multiply the fractions; do not subtract.')]],
    steps: [`${c}/${d} × ${a}/${b} = ${a * c}/${b * d}.`, `${L(lang, 'Jadi', 'So')} ${F(a * c, b * d)} ${t[2]}.`],
    meta: { kind, a, b, c, d },
  });
};
fracMulStory.solve = (m, lang) => (m.kind === 'cmp' ? L(lang, 'lebih kecil', 'smaller') : F(m.a * m.c, m.b * m.d));

const fracDiv = (rnd, lang) => {
  const kind = pick(rnd, ['wu', 'ff', 'fw', 'recip']);
  if (kind === 'recip') {
    const [a, b] = coprime(rnd, 9);
    return mc({
      q: L(lang, `Kebalikan dari ${a}/${b} adalah …`, `The reciprocal of ${a}/${b} is …`),
      ok: `${b}/${a}`,
      bad: [[`−${a}/${b}`, L(lang, 'Kebalikan bukan lawan tanda. Tukar pembilang dan penyebut.', 'A reciprocal is not the negative. Swap top and bottom.')], [`${a}/${b}`, L(lang, 'Itu pecahan semula.', 'That is the same fraction.')], [`${a * 2}/${b * 2}`, L(lang, 'Itu pecahan senilai, bukan kebalikan.', 'That is an equivalent fraction, not the reciprocal.')]],
      steps: [L(lang, 'Tukar pembilang dan penyebut.', 'Swap the numerator and denominator.'), `${a}/${b} → ${b}/${a}.`],
      meta: { kind, a, b },
    });
  }
  if (kind === 'wu') {
    const w = ri(rnd, 2, 9);
    const b = ri(rnd, 2, 6);
    return num({
      q: `${w} ${dv(lang)} 1/${b} = …`,
      ans: w * b,
      wrong: [[`${w}/${b}`, L(lang, 'Membagi dengan 1/' + b + ' sama dengan mengali dengan ' + b + '.', 'Dividing by 1/' + b + ' is the same as multiplying by ' + b + '.')], [w + b, L(lang, 'Kalikan dengan kebalikannya.', 'Multiply by the reciprocal.')]],
      steps: [L(lang, `Ada berapa 1/${b} di dalam ${w}? Setiap 1 berisi ${b}.`, `How many 1/${b}s are in ${w}? Each 1 holds ${b}.`), `${w} × ${b} = ${w * b}.`],
      meta: { kind, a: w, b: 1, c: 1, d: b },
    });
  }
  if (kind === 'fw') {
    const [a, b] = coprime(rnd, 9);
    const w = ri(rnd, 2, 5);
    return num({
      q: L(lang, `${a}/${b} ${dv(lang)} ${w} = … (sederhanakan)`, `${a}/${b} ${dv(lang)} ${w} = … (simplify)`),
      ans: F(a, b * w),
      exact: true,
      exactWhy: EXW(lang),
      wrong: [[F(a * w, b), L(lang, `Membagi dengan ${w} sama dengan mengali dengan 1/${w}.`, `Dividing by ${w} is multiplying by 1/${w}.`)]],
      steps: [`${a}/${b} × 1/${w} = ${a}/${b * w}`, `= ${F(a, b * w)}.`],
      meta: { kind, a, b, c: w, d: 1 },
    });
  }
  // pecahan : pecahan dengan hasil bilangan bulat
  let c;
  let d;
  let res;
  let a;
  let b;
  do {
    [c, d] = coprime(rnd, 8);
    res = ri(rnd, 2, 6);
    const g = gcd(res * c, d);
    [a, b] = [(res * c) / g, d / g];
  } while (b === 1);
  return num({
    q: `${a}/${b} ${dv(lang)} ${c}/${d} = …`,
    ans: res,
    wrong: [[`${a * c}/${b * d}`, L(lang, 'Itu perkalian. Untuk membagi, kalikan dengan kebalikan.', 'That is multiplying. To divide, multiply by the reciprocal.')], [F(b * c, a * d), L(lang, 'Yang dibalik adalah pecahan pembagi (yang kedua).', 'Flip the second fraction (the divisor), not the first.')]],
    steps: [`${a}/${b} × ${d}/${c} = ${a * d}/${b * c}`, `= ${res}.`],
    meta: { kind, a, b, c, d },
  });
};
fracDiv.solve = (m) => (m.kind === 'recip' ? `${m.b}/${m.a}` : F(m.a * m.d, m.b * m.c));

const bottles = (rnd, lang) => {
  const [p, q] = pick(rnd, [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 3], [2, 3]]);
  const n = ri(rnd, 2, 8) * p;
  const total = (n * p) / q;
  const tot = n * p / q;
  if (Math.abs(tot - Math.round(tot)) > 1e-9) return bottles(rnd, lang);
  const t = pick(rnd, [
    [`Air ${total} liter dituang ke botol yang masing-masing berisi ${p}/${q} liter. Banyak botol …`, `${total} litres of water are poured into bottles holding ${p}/${q} litre each. How many bottles?`, 'liter', 'litre'],
    [`Jus ${total} liter dibagi ke gelas yang masing-masing berisi ${p}/${q} liter. Banyak gelas …`, `${total} litres of juice are shared into glasses of ${p}/${q} litre each. How many glasses?`, 'liter', 'litre'],
    [`Pita ${total} m dipotong-potong, setiap potong ${p}/${q} m. Banyak potongan …`, `A ${total} m ribbon is cut into pieces of ${p}/${q} m. How many pieces?`, 'm', 'm'],
  ]);
  return num({
    q: L(lang, t[0], t[1]),
    ans: n,
    wrong: [[F(total * p, q), L(lang, `Itu dikali ${p}/${q}. Kita perlu membagi.`, `That multiplies by ${p}/${q}. We need to divide.`)], [total, L(lang, `Setiap bagian kurang dari 1 ${t[2]}, jadi banyaknya lebih dari ${total}.`, `Each part is less than 1 ${t[3]}, so there are more than ${total}.`)]],
    steps: [`${total} ${dv(lang)} ${p}/${q} = ${total} × ${q}/${p}`, `= ${n}.`],
    meta: { total, p, q },
  });
};
bottles.solve = (m) => (m.total * m.q) / m.p;

const percentOf = (rnd, lang) => {
  const kind = pick(rnd, ['of', 'of', 'story']);
  const p = pick(rnd, [10, 20, 25, 30, 40, 50, 60, 75, 5, 15]);
  const base = 100 / gcd(p, 100);
  const n = base * ri(rnd, 1, Math.max(1, Math.floor(400 / base)));
  if (n < 20) return percentOf(rnd, lang);
  const ans = (p * n) / 100;
  if (kind === 'story') {
    const t = pick(rnd, [['siswa', 'pupils', 'suka voli', 'like volleyball'], ['buah', 'pieces of fruit', 'busuk', 'are rotten'], ['peserta', 'participants', 'datang naik sepeda', 'came by bike']]);
    return num({
      q: L(lang, `Dari ${n} ${t[0]}, ${p}% ${t[2]}. Banyaknya …`, `Of ${n} ${t[1]}, ${p}% ${t[3]}. How many is that?`),
      ans,
      wrong: [[n - ans, L(lang, 'Itu sisanya.', 'That is the rest.')], [p, L(lang, `${p}% bukan ${p} ${t[0]}. Hitung ${p}/100 × ${n}.`, `${p}% is not ${p}. Work out ${p}/100 × ${n}.`)]],
      steps: [`${p}/100 × ${n}`, `= ${ans}.`],
      meta: { p, n },
    });
  }
  return num({
    q: L(lang, `${p}% dari ${n} = …`, `${p}% of ${n} = …`),
    ans,
    wrong: [[n / p === Math.round(n / p) && n / p !== ans ? n / p : null, L(lang, `Persen artinya per seratus: ${p}/100 × ${n}.`, `Percent means per hundred: ${p}/100 × ${n}.`)], [p * n, L(lang, 'Jangan lupa dibagi 100.', 'Remember to divide by 100.')]],
    steps: [`${p}/100 × ${n}`, `= ${ans}.`],
    meta: { p, n },
  });
};
percentOf.solve = (m) => (m.n / 100) * m.p;

const toPercent = (rnd, lang) => {
  const kind = pick(rnd, ['frac', 'dec']);
  if (kind === 'frac') {
    const [a, b] = pick(rnd, [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [1, 20], [3, 20], [1, 25], [6, 25], [1, 50]]);
    return num({
      q: L(lang, `${a}/${b} = …% (tulis angkanya)`, `${a}/${b} = …% (write the number)`),
      ans: (a * 100) / b,
      wrong: [[Number(`${a}${b}`), L(lang, 'Ubah penyebut menjadi 100 dulu.', 'Make the denominator 100 first.')], [(a / b) * 10, L(lang, 'Persen per seratus, jadi kali 100.', 'Percent is per hundred, so multiply by 100.')]],
      steps: [`${a}/${b} = ${(a * 100) / b}/100`, `= ${(a * 100) / b}%.`],
      meta: { kind, a, b },
    });
  }
  const h = pick(rnd, [ri(rnd, 1, 9) * 10, ri(rnd, 11, 99)]);
  const v = h / 100;
  return num({
    q: L(lang, `${N(lang, v)} = …% (tulis angkanya)`, `${N(lang, v)} = …% (write the number)`),
    ans: h,
    wrong: [[h % 10 === 0 ? h / 10 : null, L(lang, `${N(lang, v)} = ${N(lang, v)}0 = ${h} perseratus.`, `${N(lang, v)} = ${N(lang, v)}0 = ${h} hundredths.`)], [v, L(lang, 'Kalikan dengan 100.', 'Multiply by 100.')]],
    steps: [`${N(lang, v)} × 100 = ${h}.`, `= ${h}%.`],
    meta: { kind, h },
  });
};
toPercent.solve = (m) => (m.kind === 'frac' ? (100 / m.b) * m.a : m.h);

// ---------- Bab 2: Rasio ----------
const ratioSimp = (rnd, lang) => {
  const kind = pick(rnd, ['simp', 'equiv']);
  const [a, b] = (() => {
    let x;
    let y;
    do {
      x = ri(rnd, 1, 7);
      y = ri(rnd, 1, 7);
    } while (x === y || gcd(x, y) !== 1);
    return [x, y];
  })();
  const k = ri(rnd, 2, 6);
  if (kind === 'equiv')
    return mc({
      q: L(lang, `Rasio yang senilai dengan ${a} : ${b} adalah …`, `Which ratio is equivalent to ${a} : ${b}?`),
      ok: `${a * k} : ${b * k}`,
      bad: [[`${b * k} : ${a * k}`, L(lang, 'Urutannya tertukar.', 'The order is swapped.')], [`${a + k} : ${b + k}`, L(lang, 'Rasio senilai dibuat dengan mengali, bukan menambah.', 'Equivalent ratios come from multiplying, not adding.')], [`${a * k} : ${b * (k + 1)}`, L(lang, 'Kedua bagian harus dikali dengan bilangan yang sama.', 'Both parts must be multiplied by the same number.')]],
      steps: [L(lang, `Kalikan kedua bagian dengan ${k}.`, `Multiply both parts by ${k}.`), `${a} : ${b} = ${a * k} : ${b * k}.`],
      meta: { kind, a, b, k },
    });
  return mc({
    q: L(lang, `Rasio ${a * k} : ${b * k} paling sederhana adalah …`, `${a * k} : ${b * k} in simplest form is …`),
    ok: `${a} : ${b}`,
    bad: [[`${b} : ${a}`, L(lang, 'Urutannya harus tetap.', 'The order must stay the same.')], [k % 2 === 0 && k > 2 ? `${a * 2} : ${b * 2}` : `${a * k - 1} : ${b * k - 1}`, k % 2 === 0 && k > 2 ? L(lang, 'Masih bisa disederhanakan lagi.', 'It can be simplified further.') : L(lang, 'Bagi, jangan dikurangi.', 'Divide, do not subtract.')], [`${a * k - b * k > 0 ? a * k - b * k : b * k - a * k} : ${b * k}`, L(lang, 'Bagi kedua bagian dengan FPB-nya.', 'Divide both parts by their HCF.')]],
    steps: [L(lang, `FPB ${a * k} dan ${b * k} = ${k}.`, `HCF of ${a * k} and ${b * k} = ${k}.`), `${a * k} : ${b * k} = ${a} : ${b}.`],
    meta: { kind, x: a * k, y: b * k },
  });
};
ratioSimp.solve = (m) => (m.kind === 'equiv' ? `${m.a * m.k} : ${m.b * m.k}` : `${m.x / gcd(m.x, m.y)} : ${m.y / gcd(m.x, m.y)}`);

const ratioStory = (rnd, lang) => {
  const pair = pick(rnd, [[['kucing', 'cats'], ['anjing', 'dogs']], [['manik merah', 'red beads'], ['manik biru', 'blue beads']], [['siswa laki-laki', 'boys'], ['siswa perempuan', 'girls']], [['apel', 'apples'], ['jeruk', 'oranges']]]);
  let x;
  let y;
  do {
    x = ri(rnd, 2, 12);
    y = ri(rnd, 2, 12);
  } while (x === y);
  const kind = pick(rnd, ['rev', 'whole']);
  const g = gcd(x, y);
  const gw = gcd(x, x + y);
  if (kind === 'rev')
    return mc({
      q: L(lang, `Ada ${x} ${pair[0][0]} dan ${y} ${pair[1][0]}. Rasio ${pair[1][0]} terhadap ${pair[0][0]} adalah …`, `There are ${x} ${pair[0][1]} and ${y} ${pair[1][1]}. The ratio of ${pair[1][1]} to ${pair[0][1]} is …`),
      ok: `${y / g} : ${x / g}`,
      bad: [[`${x / g} : ${y / g}`, L(lang, `Urutannya mengikuti kalimat: ${pair[1][0]} dulu.`, `Follow the order in the question: ${pair[1][1]} first.`)], [`${y / g} : ${(x + y) / g}`, L(lang, 'Yang dibandingkan dengan kelompok lain, bukan dengan semuanya.', 'Compare with the other group, not with the total.')]],
      steps: [`${y} : ${x}.`, g > 1 ? L(lang, `Sederhanakan: ${y / g} : ${x / g}.`, `Simplify: ${y / g} : ${x / g}.`) : L(lang, 'Sudah paling sederhana.', 'Already in simplest form.')],
      meta: { kind, x, y },
    });
  return mc({
    q: L(lang, `Ada ${x} ${pair[0][0]} dan ${y} ${pair[1][0]}. Rasio ${pair[0][0]} terhadap semuanya adalah …`, `There are ${x} ${pair[0][1]} and ${y} ${pair[1][1]}. The ratio of ${pair[0][1]} to all of them is …`),
    ok: `${x / gw} : ${(x + y) / gw}`,
    bad: [[`${x / g} : ${y / g}`, L(lang, `Itu rasio terhadap ${pair[1][0]}. Semuanya = ${x} + ${y} = ${x + y}.`, `That compares with ${pair[1][1]}. All of them = ${x} + ${y} = ${x + y}.`)], [`${(x + y) / gw} : ${x / gw}`, L(lang, 'Urutannya tertukar.', 'The order is swapped.')]],
    steps: [L(lang, `Semuanya ${x + y}. Rasio ${x} : ${x + y}.`, `All = ${x + y}. Ratio ${x} : ${x + y}.`), gw > 1 ? L(lang, `Sederhanakan: ${x / gw} : ${(x + y) / gw}.`, `Simplify: ${x / gw} : ${(x + y) / gw}.`) : L(lang, 'Sudah paling sederhana.', 'Already in simplest form.')],
    meta: { kind, x, y },
  });
};
ratioStory.solve = (m) => {
  if (m.kind === 'rev') {
    const g = gcd(m.y, m.x);
    return `${m.y / g} : ${m.x / g}`;
  }
  const t = m.x + m.y;
  const g = gcd(m.x, t);
  return `${m.x / g} : ${t / g}`;
};

const ratioShare = (rnd, lang) => {
  let a;
  let b;
  do {
    a = ri(rnd, 1, 7);
    b = ri(rnd, 1, 7);
  } while (a === b || gcd(a, b) !== 1);
  const k = ri(rnd, 2, 12);
  const total = (a + b) * k;
  const more = rnd() < 0.5;
  const t = pick(rnd, [['permen', 'sweets'], ['kelereng', 'marbles'], ['buku', 'books'], ['kartu', 'cards']]);
  const [p, q] = names(rnd, 2);
  const ans = (more ? Math.max(a, b) : Math.min(a, b)) * k;
  return num({
    q: L(lang, `${total} ${t[0]} dibagi untuk ${p} dan ${q} dengan rasio ${a} : ${b}. Bagian yang lebih ${more ? 'banyak' : 'sedikit'} …`, `${total} ${t[1]} are shared between ${p} and ${q} in the ratio ${a} : ${b}. The ${more ? 'larger' : 'smaller'} share is …`),
    ans,
    wrong: [[total / 2, L(lang, 'Dibagi menurut rasio, bukan sama rata.', 'Share by the ratio, not equally.')], [Math.round(total / (more ? Math.max(a, b) : Math.min(a, b))), L(lang, `Jumlah bagian ${a} + ${b} = ${a + b}. Satu bagian = ${total} ${dv(lang)} ${a + b}.`, `Total parts ${a} + ${b} = ${a + b}. One part = ${total} ${dv(lang)} ${a + b}.`)], [more ? Math.min(a, b) * k : Math.max(a, b) * k, L(lang, `Itu bagian yang lebih ${more ? 'sedikit' : 'banyak'}.`, `That is the ${more ? 'smaller' : 'larger'} share.`)]],
    steps: [L(lang, `Jumlah bagian: ${a} + ${b} = ${a + b}. Satu bagian: ${total} ${dv(lang)} ${a + b} = ${k}.`, `Total parts: ${a} + ${b} = ${a + b}. One part: ${total} ${dv(lang)} ${a + b} = ${k}.`), `${more ? Math.max(a, b) : Math.min(a, b)} × ${k} = ${ans}.`],
    meta: { a, b, total, more },
  });
};
ratioShare.solve = (m) => (m.total / (m.a + m.b)) * (m.more ? Math.max(m.a, m.b) : Math.min(m.a, m.b));

const ratioKnown = (rnd, lang) => {
  const kind = pick(rnd, ['age', 'mix', 'class']);
  if (kind === 'class') {
    let a;
    let b;
    do {
      a = ri(rnd, 2, 7);
      b = ri(rnd, 2, 7);
    } while (a === b || gcd(a, b) !== 1);
    const k = ri(rnd, 2, 5);
    return num({
      q: L(lang, `Ada ${(a + b) * k} siswa, laki-laki : perempuan = ${a} : ${b}. Banyak siswa perempuan …`, `There are ${(a + b) * k} pupils, boys : girls = ${a} : ${b}. How many girls?`),
      ans: b * k,
      wrong: [[a * k, L(lang, 'Itu banyak laki-laki.', 'That is the number of boys.')], [b, L(lang, `${b} adalah bagian rasio. Kalikan dengan ${k}.`, `${b} is the ratio part. Multiply by ${k}.`)]],
      steps: [`${(a + b) * k} ${dv(lang)} ${a + b} = ${k}.`, `${b} × ${k} = ${b * k}.`],
      meta: { kind, a, b, known: (a + b) * k, total: true },
    });
  }
  const [a, b] = kind === 'age' ? [pick(rnd, [3, 4, 5, 6]), 1] : [1, pick(rnd, [2, 3, 4, 5])];
  const k = kind === 'age' ? ri(rnd, 5, 12) : ri(rnd, 2, 9) * 10;
  const knownB = kind === 'age';
  return num({
    q: kind === 'age' ? L(lang, `Rasio umur ayah : anak = ${a} : ${b}. Umur anak ${k} tahun. Umur ayah … tahun.`, `Dad's age : child's age = ${a} : ${b}. The child is ${k}. Dad is … years old.`) : L(lang, `Sirup : air = ${a} : ${b}. Air ${b * k} ml. Sirup … ml.`, `Syrup : water = ${a} : ${b}. There is ${b * k} ml of water. How many ml of syrup?`),
    ans: kind === 'age' ? a * k : k,
    wrong: kind === 'age' ? [[k + a, L(lang, 'Rasio berarti kelipatan, bukan selisih.', 'A ratio means times as many, not a difference.')], [k * (a + b), L(lang, 'Ayah sendiri hanya 4 bagian, bukan semua bagian.'.replace('4', String(a)), `Dad alone is ${a} parts, not all the parts.`)]] : [[b * k * b, L(lang, 'Bagi, jangan kali.', 'Divide, do not multiply.')], [b * k - b, L(lang, 'Rasio berarti dibagi, bukan dikurangi.', 'Use division, not subtraction.')]],
    steps: kind === 'age' ? [L(lang, `Satu bagian = ${k} tahun.`, `One part = ${k} years.`), `${a} × ${k} = ${a * k}.`] : [L(lang, `Satu bagian = ${b * k} ${dv(lang)} ${b} = ${k} ml.`, `One part = ${b * k} ${dv(lang)} ${b} = ${k} ml.`), L(lang, `Sirup 1 bagian: ${k} ml.`, `Syrup is 1 part: ${k} ml.`)],
    meta: { kind, a, b, known: knownB ? k : b * k, total: false },
  });
};
ratioKnown.solve = (m) => (m.kind === 'class' ? (m.known / (m.a + m.b)) * m.b : m.kind === 'age' ? (m.known / m.b) * m.a : (m.known / m.b) * m.a);

// ---------- Bab 3: Volume ----------
const volCuboid = (rnd, lang) => {
  const kind = pick(rnd, ['plt', 'plt', 'base', 'missing', 'pool']);
  const p = ri(rnd, 2, 12);
  const l = ri(rnd, 2, 10);
  const t = ri(rnd, 2, 10);
  if (kind === 'base')
    return num({
      q: L(lang, `Luas alas balok ${p * l} cm², tinggi ${t} cm. Volume … cm³`, `A cuboid has a base area of ${p * l} cm² and a height of ${t} cm. Volume = … cm³`),
      ans: p * l * t,
      wrong: [[p * l + t, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')], [p * l, L(lang, `Itu luas alas saja. Kalikan dengan tinggi ${t}.`, `That is only the base. Multiply by the height ${t}.`)]],
      steps: [L(lang, 'Volume = luas alas × tinggi.', 'Volume = base area × height.'), `${p * l} × ${t} = ${p * l * t} cm³.`],
      meta: { kind, A: p * l, t },
    });
  if (kind === 'missing')
    return num({
      q: L(lang, `Balok bervolume ${p * l * t} cm³, panjang ${p} cm, lebar ${l} cm. Tinggi … cm`, `A cuboid has volume ${p * l * t} cm³, length ${p} cm and width ${l} cm. Height = … cm`),
      ans: t,
      wrong: [[p * l * t - p - l, L(lang, 'Bagi volume dengan luas alas, jangan dikurangi.', 'Divide the volume by the base area; do not subtract.')], [p * l, L(lang, 'Itu luas alas. Volume dibagi luas alas.', 'That is the base area. Divide the volume by it.')]],
      steps: [`${p} × ${l} = ${p * l}.`, `${p * l * t} ${dv(lang)} ${p * l} = ${t} cm.`],
      meta: { kind, V: p * l * t, p, l },
    });
  const unit = kind === 'pool' ? 'm' : 'cm';
  return num({
    q: kind === 'pool' ? L(lang, `Kolam berbentuk balok ${p} m × ${l} m × ${Math.min(t, 3)} m. Volume … m³`, `A pool is ${p} m × ${l} m × ${Math.min(t, 3)} m. Volume = … m³`) : L(lang, `Balok ${p} cm × ${l} cm × ${t} cm. Volume … cm³`, `A cuboid is ${p} cm × ${l} cm × ${t} cm. Volume = … cm³`),
    ans: p * l * (kind === 'pool' ? Math.min(t, 3) : t),
    wrong: [[p + l + (kind === 'pool' ? Math.min(t, 3) : t), L(lang, 'Kalikan ketiganya, bukan jumlahkan.', 'Multiply all three, do not add.')], [p * l, L(lang, 'Itu luas alas. Kalikan juga dengan tinggi.', 'That is the base area. Multiply by the height too.')]],
    steps: [`${p} × ${l} = ${p * l}.`, `${p * l} × ${kind === 'pool' ? Math.min(t, 3) : t} = ${p * l * (kind === 'pool' ? Math.min(t, 3) : t)} ${unit}³.`],
    meta: { kind, p, l, t: kind === 'pool' ? Math.min(t, 3) : t },
  });
};
volCuboid.solve = (m) => (m.kind === 'base' ? m.A * m.t : m.kind === 'missing' ? m.V / (m.p * m.l) : m.p * m.l * m.t);

const volBlocks = (rnd, lang) => {
  const a = ri(rnd, 2, 5);
  const b = ri(rnd, 1, 3);
  const h = ri(rnd, 1, 3);
  const CU = 26;
  const w = a * CU + b * CU * 0.55;
  const ht = h * CU + b * CU * 0.42;
  return num({
    q: L(lang, 'Berapa kubus satuan yang mengisi balok ini?', 'How many unit cubes fill this cuboid?'),
    fig: blockOf('k', a, b, h, 200 - w / 2, 150 + ht / 2, pick(rnd, ['acc', 'pos', 'ok']), h, CU),
    ans: a * b * h,
    wrong: [[a * b * h - (a - 1) * (b - 1) * (h - 1), L(lang, 'Ada kubus yang tersembunyi. Pakai panjang × lebar × tinggi.', 'Some cubes are hidden. Use length × width × height.')], [a + b + h, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')], [h > 1 ? a * b : a * h, h > 1 ? L(lang, `Itu satu lapis. Ada ${h} lapis.`, `That is one layer. There are ${h} layers.`) : L(lang, 'Ada kubus di barisan belakang juga.', 'There are cubes in the back row too.')]],
    steps: [L(lang, `Panjang ${a}, lebar ${b}, tinggi ${h}.`, `Length ${a}, width ${b}, height ${h}.`), `${a} × ${b} × ${h} = ${a * b * h}.`],
    meta: { a, b, h },
  });
};
volBlocks.solve = (m) => m.a * m.b * m.h;

const volCube = (rnd, lang) => {
  const kind = pick(rnd, ['cube', 'root', 'l2cm', 'tank']);
  if (kind === 'cube') {
    const s = ri(rnd, 2, 12);
    return num({
      q: L(lang, `Volume kubus dengan rusuk ${s} cm … cm³`, `The volume of a cube with edge ${s} cm is … cm³`),
      ans: s ** 3,
      wrong: [[s * s, L(lang, 'Itu luas satu sisi. Kalikan sekali lagi dengan rusuk.', 'That is one face. Multiply by the edge once more.')], [3 * s, L(lang, 's × s × s, bukan 3 × s.', 's × s × s, not 3 × s.')]],
      steps: [`${s} × ${s} × ${s} = ${G(lang, s ** 3)} cm³.`],
      meta: { kind, s },
    });
  }
  if (kind === 'root') {
    const s = ri(rnd, 2, 10);
    return num({
      q: L(lang, `Kubus bervolume ${G(lang, s ** 3)} cm³. Rusuknya … cm`, `A cube has volume ${G(lang, s ** 3)} cm³. Its edge is … cm`),
      ans: s,
      wrong: [[(s ** 3) / 3 === Math.round((s ** 3) / 3) ? (s ** 3) / 3 : null, L(lang, 'Bukan dibagi 3. Cari bilangan yang dikali tiga kali dengan dirinya.', 'Not divided by 3. Find the number that times itself three times.')], [s * s, L(lang, `${s * s} × ${s * s} × ${s * s} terlalu besar.`, `${s * s} × ${s * s} × ${s * s} is far too big.`)]],
      steps: [`${s} × ${s} × ${s} = ${G(lang, s ** 3)}.`, L(lang, `Rusuknya ${s} cm.`, `The edge is ${s} cm.`)],
      meta: { kind, V: s ** 3 },
    });
  }
  if (kind === 'l2cm') {
    const k = ri(rnd, 2, 12);
    const back = rnd() < 0.4;
    return num({
      q: back ? L(lang, `${G(lang, k * 1000)} cm³ = … liter`, `${G(lang, k * 1000)} cm³ = … litres`) : L(lang, `${k} liter = … cm³`, `${k} litres = … cm³`),
      ans: back ? k : k * 1000,
      wrong: back ? [[k * 100, L(lang, '1 liter = 1.000 cm³.', '1 litre = 1,000 cm³.')]] : [[k * 100, L(lang, '1 liter = 1.000 cm³, bukan 100.', '1 litre = 1,000 cm³, not 100.')], [k * 10, L(lang, '1 liter = 1.000 cm³.', '1 litre = 1,000 cm³.')]],
      steps: [L(lang, '1 liter = 1.000 cm³ (kubus berusuk 10 cm).', '1 litre = 1,000 cm³ (a 10 cm cube).'), back ? `${G(lang, k * 1000)} ${dv(lang)} ${G(lang, 1000)} = ${k}.` : `${k} × ${G(lang, 1000)} = ${G(lang, k * 1000)}.`],
      meta: { kind, k, back },
    });
  }
  const p = pick(rnd, [50, 60, 80, 100, 120]);
  const l = pick(rnd, [20, 30, 40, 50]);
  const t = pick(rnd, [20, 25, 30, 40, 50]);
  const V = p * l * t;
  return num({
    q: L(lang, `Bak ${p} cm × ${l} cm × ${t} cm. Isinya … liter`, `A tank is ${p} cm × ${l} cm × ${t} cm. It holds … litres`),
    ans: V / 1000,
    wrong: [[V, L(lang, 'Itu dalam cm³. Bagi 1.000 untuk menjadi liter.', 'That is in cm³. Divide by 1,000 for litres.')], [V / 100, L(lang, '1 liter = 1.000 cm³, bukan 100.', '1 litre = 1,000 cm³, not 100.')]],
    steps: [`${p} × ${l} × ${t} = ${G(lang, V)} cm³.`, `${G(lang, V)} ${dv(lang)} ${G(lang, 1000)} = ${N(lang, V / 1000)} ${L(lang, 'liter', 'litres')}.`],
    meta: { kind, p, l, t },
  });
};
volCube.solve = (m) => ({ cube: () => m.s * m.s * m.s, root: () => Math.round(Math.cbrt(m.V)), l2cm: () => (m.back ? m.k : m.k * 1000), tank: () => (m.p * m.l * m.t) / 1000 })[m.kind]();

// ---------- Bab 4: Kombinatorik dan peluang ----------
const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
const countWays = (rnd, lang) => {
  const kind = pick(rnd, ['pairs', 'routes', 'line', 'digits', 'menu']);
  if (kind === 'line') {
    const n = ri(rnd, 3, 5);
    return num({
      q: L(lang, `Banyak cara ${n} anak berbaris berjajar …`, `In how many ways can ${n} children stand in a line?`),
      ans: fact(n),
      wrong: [[n * n, L(lang, `Tempat pertama ${n} pilihan, berikutnya berkurang satu: ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}.`, `First place has ${n} choices, then one fewer each time: ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}.`)], [n, L(lang, 'Itu banyak anak, bukan banyak susunan.', 'That is the number of children, not arrangements.')]],
      steps: [Array.from({ length: n }, (_, i) => n - i).join(' × '), `= ${fact(n)}.`],
      meta: { kind, n },
    });
  }
  if (kind === 'digits') {
    const n = ri(rnd, 3, 5);
    const ds = sample(rnd, [1, 2, 3, 4, 5, 6, 7, 8, 9], n).sort((a, b) => a - b);
    return num({
      q: L(lang, `Bilangan dua angka berbeda yang disusun dari angka ${ds.join(', ')}. Banyaknya …`, `Two-digit numbers with different digits made from ${ds.join(', ')}. How many are there?`),
      ans: n * (n - 1),
      wrong: [[n * n, L(lang, 'Angkanya harus berbeda, jadi angka kedua tinggal ' + (n - 1) + ' pilihan.', `The digits must differ, so the second digit has only ${n - 1} choices.`)], [(n * (n - 1)) / 2, L(lang, '12 dan 21 adalah bilangan berbeda. Urutan penting.', '12 and 21 are different numbers. Order matters.')]],
      steps: [L(lang, `Puluhan: ${n} pilihan. Satuan: ${n - 1} pilihan.`, `Tens: ${n} choices. Ones: ${n - 1} choices.`), `${n} × ${n - 1} = ${n * (n - 1)}.`],
      meta: { kind, n },
    });
  }
  if (kind === 'menu') {
    const a = ri(rnd, 2, 4);
    const b = ri(rnd, 2, 4);
    const c = ri(rnd, 2, 3);
    return num({
      q: L(lang, `Kantin menjual ${a} jenis nasi, ${b} jenis lauk, dan ${c} jenis minuman. Banyak paket berisi 1 nasi, 1 lauk, 1 minuman …`, `A canteen has ${a} kinds of rice, ${b} side dishes and ${c} drinks. How many meals of 1 rice, 1 side dish and 1 drink?`),
      ans: a * b * c,
      wrong: [[a + b + c, L(lang, 'Setiap pilihan dipasangkan dengan semua pilihan lain, jadi dikali.', 'Each choice pairs with every other choice, so multiply.')], [a * b, L(lang, 'Minumannya juga dipilih.', 'Drinks are chosen too.')]],
      steps: [`${a} × ${b} × ${c} = ${a * b * c}.`],
      meta: { kind, a, b, c },
    });
  }
  const a = ri(rnd, 2, 6);
  const b = ri(rnd, 2, 5);
  return num({
    q: kind === 'routes' ? L(lang, `Ada ${a} jalan dari A ke B dan ${b} jalan dari B ke C. Banyak rute dari A ke C lewat B …`, `There are ${a} roads from A to B and ${b} roads from B to C. How many routes from A to C through B?`) : L(lang, `${a} kaus dan ${b} celana. Banyak pasangan kaus dan celana …`, `${a} T-shirts and ${b} pairs of trousers. How many outfits of one T-shirt and one pair of trousers?`),
    ans: a * b,
    wrong: [[a + b, L(lang, `Setiap ${kind === 'routes' ? 'jalan pertama' : 'kaus'} bisa dipasangkan dengan ${b} pilihan, jadi dikali.`, `Each first choice goes with all ${b} second choices, so multiply.`)]],
    steps: [L(lang, `Diagram pohon: ${a} cabang, masing-masing ${b}.`, `Tree diagram: ${a} branches, each with ${b}.`), `${a} × ${b} = ${a * b}.`],
    meta: { kind, a, b, c: 1 },
  });
};
countWays.solve = (m) => ({ line: () => fact(m.n), digits: () => m.n * (m.n - 1), menu: () => m.a * m.b * m.c, routes: () => m.a * m.b, pairs: () => m.a * m.b })[m.kind]();

const prob = (rnd, lang) => {
  const kind = pick(rnd, ['coin', 'die', 'balls', 'die7']);
  if (kind === 'coin')
    return num({
      q: L(lang, `Koin dilempar sekali. Peluang muncul ${pick(rnd, ['gambar', 'angka'])} …`, `A coin is tossed once. The probability of ${pick(rnd, ['heads', 'tails'])} is …`),
      ans: '1/2',
      wrong: [[1, L(lang, 'Belum pasti, masih bisa muncul sisi lain.', 'It is not certain; the other side could come up.')], ['2/1', L(lang, 'Peluang tidak lebih dari 1. Harapan / semua hasil = 1/2.', 'A probability is never more than 1. Wanted / all = 1/2.')]],
      steps: [L(lang, 'Ada 2 hasil, 1 yang diharapkan.', 'There are 2 outcomes, 1 is wanted.'), '1/2.'],
      meta: { kind, w: 1, t: 2 },
    });
  if (kind === 'die7') {
    const x = pick(rnd, [7, 8, 0, 9]);
    return num({
      q: L(lang, `Dadu dilempar. Peluang muncul angka ${x} …`, `A dice is rolled. The probability of rolling ${x === 8 ? 'an' : 'a'} ${x} is …`),
      ans: 0,
      wrong: [[`1/6`, L(lang, 'Angka itu tidak ada di dadu, jadi mustahil.', 'That number is not on a dice, so it is impossible.')]],
      steps: [L(lang, 'Dadu hanya berisi 1 sampai 6.', 'A dice only has 1 to 6.'), L(lang, 'Mustahil: peluangnya 0.', 'Impossible: probability 0.')],
      meta: { kind, w: 0, t: 6 },
    });
  }
  if (kind === 'die') {
    const ev = pick(rnd, [['genap', 'an even number', [2, 4, 6]], ['ganjil', 'an odd number', [1, 3, 5]], ['lebih dari 4', 'more than 4', [5, 6]], ['kurang dari 3', 'less than 3', [1, 2]], ['faktor dari 6', 'a factor of 6', [1, 2, 3, 6]], ['3', 'a 3', [3]], ['lebih dari 2', 'more than 2', [3, 4, 5, 6]]]);
    const w = ev[2].length;
    return num({
      q: L(lang, `Dadu dilempar sekali. Peluang muncul angka ${ev[0]} …`, `A dice is rolled once. The probability of ${ev[1]} is …`),
      ans: F(w, 6),
      wrong: [[`${w}/${6 - w}`, L(lang, 'Penyebutnya semua hasil (6), bukan hasil yang lain.', 'The denominator is all outcomes (6), not the other outcomes.')], [w !== 1 ? `1/${w}` : null, L(lang, `Hasil yang diharapkan: ${ev[2].join(', ')}, ada ${w}.`, `Wanted outcomes: ${ev[2].join(', ')}, that is ${w}.`)]],
      steps: [L(lang, `Hasil yang diharapkan: ${ev[2].join(', ')} (${w}). Semua hasil: 6.`, `Wanted: ${ev[2].join(', ')} (${w}). All outcomes: 6.`), `${w}/6${F(w, 6) !== `${w}/6` ? ` = ${F(w, 6)}` : ''}.`],
      meta: { kind, w, t: 6 },
    });
  }
  const r = ri(rnd, 1, 9);
  const o = ri(rnd, 1, 9);
  const col = pick(rnd, [['merah', 'red', 'putih', 'white'], ['biru', 'blue', 'kuning', 'yellow'], ['hijau', 'green', 'hitam', 'black']]);
  return num({
    q: L(lang, `Kantong berisi ${r} bola ${col[0]} dan ${o} bola ${col[2]}. Diambil satu tanpa melihat. Peluang terambil bola ${col[0]} …`, `A bag has ${r} ${col[1]} and ${o} ${col[3]} balls. One is picked without looking. The probability it is ${col[1]} is …`),
    ans: F(r, r + o),
    wrong: [[r !== o ? `${r}/${o}` : null, L(lang, `Penyebutnya semua bola: ${r} + ${o} = ${r + o}.`, `The denominator is all the balls: ${r} + ${o} = ${r + o}.`)], [F(o, r + o) !== F(r, r + o) ? `${o}/${r + o}` : null, L(lang, `Itu peluang bola ${col[2]}.`, `That is the probability of ${col[3]}.`)]],
    steps: [L(lang, `Bola ${col[0]}: ${r}. Semua bola: ${r + o}.`, `${cap(col[1])}: ${r}. All balls: ${r + o}.`), `${r}/${r + o}${F(r, r + o) !== `${r}/${r + o}` ? ` = ${F(r, r + o)}` : ''}.`],
    meta: { kind, w: r, t: r + o },
  });
};
prob.solve = (m) => (m.w === 0 ? 0 : F(m.w, m.t));

const probWords = pool([
  (l) => ({ q: L(l, 'Peluang matahari terbit dari timur besok adalah …', 'The probability that the sun rises in the east tomorrow is …'), ok: '1', bad: [['0', L(l, 'Itu untuk kejadian mustahil.', 'That is for impossible events.')], ['1/2', L(l, 'Kejadian ini pasti, bukan setengah-setengah.', 'This is certain, not a 50-50 chance.')]], steps: [L(l, 'Kejadian pasti: peluang 1.', 'A certain event: probability 1.')] }),
  (l) => ({ q: L(l, 'Peluang muncul angka 7 pada dadu biasa adalah …', 'The probability of rolling a 7 on a normal dice is …'), ok: '0', bad: [['1/6', L(l, 'Tidak ada angka 7 di dadu.', 'There is no 7 on a dice.')], ['1/7', L(l, 'Dadu hanya punya 6 sisi, dan tidak ada 7.', 'A dice has 6 faces and no 7.')]], steps: [L(l, 'Mustahil: peluang 0.', 'Impossible: probability 0.')] }),
  (l) => ({ q: L(l, 'Nilai peluang selalu berada di antara …', 'A probability is always between …'), ok: L(l, '0 dan 1', '0 and 1'), bad: [[L(l, '1 dan 10', '1 and 10'), L(l, 'Peluang tidak lebih dari 1.', 'A probability is never more than 1.')], [L(l, '0 dan 100', '0 and 100'), L(l, 'Kalau ditulis pecahan, peluang paling besar 1.', 'As a fraction, the largest probability is 1.')]], steps: [L(l, '0 = mustahil, 1 = pasti.', '0 = impossible, 1 = certain.')] }),
  (l) => ({ q: L(l, 'Kantong berisi 5 bola merah saja. Peluang terambil bola merah …', 'A bag has only 5 red balls. The probability of picking red is …'), ok: '1', bad: [['1/5', L(l, 'Semua bola merah, jadi pasti merah.', 'All the balls are red, so it is certain.')], ['5', L(l, 'Peluang tidak lebih dari 1.', 'A probability is never more than 1.')]], steps: ['5/5 = 1.'] }),
  (l) => ({ q: L(l, 'Kantong berisi 5 bola merah saja. Peluang terambil bola biru …', 'A bag has only 5 red balls. The probability of picking blue is …'), ok: '0', bad: [['1/5', L(l, 'Tidak ada bola biru.', 'There are no blue balls.')], ['1', L(l, 'Itu untuk kejadian pasti.', 'That is for certain events.')]], steps: ['0/5 = 0.'] }),
  (l) => ({ q: L(l, 'Koin dilempar. Peluang muncul gambar dan peluang muncul angka …', 'A coin is tossed. The chances of heads and of tails are …'), ok: L(l, 'sama besar', 'equal'), bad: [[L(l, 'gambar lebih besar', 'heads is bigger'), L(l, 'Kedua sisi sama kemungkinannya.', 'Both sides are equally likely.')], [L(l, 'angka lebih besar', 'tails is bigger'), L(l, 'Kedua sisi sama kemungkinannya.', 'Both sides are equally likely.')]], steps: [L(l, 'Masing-masing 1/2.', 'Each is 1/2.')] }),
  (l) => ({ q: L(l, 'Kejadian yang peluangnya 0 disebut …', 'An event with probability 0 is …'), ok: L(l, 'mustahil', 'impossible'), bad: [[L(l, 'pasti', 'certain'), L(l, 'Pasti peluangnya 1.', 'Certain has probability 1.')], [L(l, 'mungkin', 'possible'), L(l, 'Peluang 0 berarti tidak mungkin terjadi.', 'Probability 0 means it cannot happen.')]], steps: [L(l, 'Peluang 0: mustahil.', 'Probability 0: impossible.')] }),
  (l) => ({ q: L(l, 'Dadu dilempar. Peluang muncul angka kurang dari 7 …', 'A dice is rolled. The probability of a number less than 7 is …'), ok: '1', bad: [['6/7', L(l, 'Semua angka dadu (1 sampai 6) kurang dari 7.', 'Every number on a dice (1 to 6) is less than 7.')], ['1/2', L(l, 'Semua hasil memenuhi.', 'Every outcome works.')]], steps: ['6/6 = 1.'] }),
  (l) => ({ q: L(l, 'Peluang besok hari Senin jika hari ini Minggu adalah …', 'If today is Sunday, the probability that tomorrow is Monday is …'), ok: '1', bad: [['1/7', L(l, 'Urutan hari sudah pasti.', 'The order of days is certain.')], ['0', L(l, 'Sesudah Minggu pasti Senin.', 'Monday always follows Sunday.')]], steps: [L(l, 'Pasti terjadi: 1.', 'Certain: 1.')] }),
  (l) => ({ q: L(l, 'Kantong berisi 2 bola merah dan 2 bola biru. Peluang merah dibanding peluang biru …', 'A bag has 2 red and 2 blue balls. The chance of red compared with blue is …'), ok: L(l, 'sama', 'the same'), bad: [[L(l, 'merah lebih besar', 'red is bigger'), L(l, 'Banyaknya sama: 2 dan 2.', 'They are equal: 2 and 2.')], [L(l, 'biru lebih besar', 'blue is bigger'), L(l, 'Banyaknya sama: 2 dan 2.', 'They are equal: 2 and 2.')]], steps: [L(l, 'Masing-masing 2/4 = 1/2.', 'Each is 2/4 = 1/2.')] }),
]);

// ---------- Bab 5: Perbandingan senilai dan berbalik nilai ----------
const direct = (rnd, lang) => {
  const kind = pick(rnd, ['price', 'fuel', 'eggs', 'print']);
  const a = ri(rnd, 2, 5);
  let b = ri(rnd, 2, 10);
  while (b === a) b = ri(rnd, 2, 10);
  if (kind === 'price') {
    const unit = pick(rnd, [5000, 6000, 7500, 8000, 12000, 15000]);
    const it = pick(rnd, [['kg gula', 'kg of sugar'], ['kg beras', 'kg of rice'], ['buku tulis', 'exercise books'], ['liter minyak', 'litres of oil']]);
    return num({
      q: L(lang, `${a} ${it[0]} harganya ${Rp(lang, unit * a)}. Harga ${b} ${it[0]} … (rupiah)`, `${a} ${it[1]} cost ${Rp(lang, unit * a)}. How much do ${b} ${it[1]} cost (rupiah)?`),
      ans: unit * b,
      wrong: [[unit * a * b, L(lang, `Cari harga 1 dulu: ${G(lang, unit * a)} ${dv(lang)} ${a}.`, `Find the price of 1 first: ${G(lang, unit * a)} ${dv(lang)} ${a}.`)], [unit * a + (b - a), L(lang, 'Harga naik sebanding, bukan ditambah selisih banyaknya.', 'The price grows in proportion, not by the difference in amount.')]],
      steps: [L(lang, `Harga 1: ${G(lang, unit * a)} ${dv(lang)} ${a} = ${G(lang, unit)}.`, `Price of 1: ${G(lang, unit * a)} ${dv(lang)} ${a} = ${G(lang, unit)}.`), `${b} × ${G(lang, unit)} = ${G(lang, unit * b)}.`],
      meta: { kind, a, b, A: unit * a },
    });
  }
  const per = { fuel: pick(rnd, [30, 35, 40, 45, 50]), eggs: pick(rnd, [2, 3, 4]), print: pick(rnd, [20, 25, 30, 40, 50]) }[kind];
  const t = {
    fuel: [`Motor menempuh ${per * a} km dengan ${a} liter bensin. Dengan ${b} liter … km`, `A motorbike goes ${per * a} km on ${a} litres of petrol. On ${b} litres it goes … km`],
    eggs: [`${per * a} telur untuk ${a} kue. ${per * b} telur untuk … kue`, `${per * a} eggs make ${a} cakes. ${per * b} eggs make … cakes`],
    print: [`Dalam ${a} menit mesin mencetak ${per * a} lembar. Dalam ${b} menit … lembar`, `A machine prints ${per * a} sheets in ${a} minutes. In ${b} minutes it prints … sheets`],
  }[kind];
  const ans = kind === 'eggs' ? b : per * b;
  return num({
    q: L(lang, ...t),
    ans,
    wrong: [[kind === 'eggs' ? per * b * a : per * a * b, L(lang, 'Cari dulu nilai untuk 1, lalu kalikan.', 'Find the value for 1 first, then multiply.')], [kind === 'eggs' ? null : per * a + (b - a), L(lang, 'Senilai berarti dikali, bukan ditambah selisih.', 'Direct proportion means multiplying, not adding the difference.')]],
    steps: kind === 'eggs' ? [L(lang, `1 kue butuh ${per * a} ${dv(lang)} ${a} = ${per} telur.`, `1 cake needs ${per * a} ${dv(lang)} ${a} = ${per} eggs.`), `${per * b} ${dv(lang)} ${per} = ${b}.`] : [L(lang, `Untuk 1: ${per * a} ${dv(lang)} ${a} = ${per}.`, `For 1: ${per * a} ${dv(lang)} ${a} = ${per}.`), `${b} × ${per} = ${per * b}.`],
    meta: { kind, a, b, A: per * a, ...(kind === 'eggs' ? { B: per * b } : {}) },
  });
};
direct.solve = (m) => (m.kind === 'eggs' ? (m.B * m.a) / m.A : (m.A / m.a) * m.b);

const inverse = (rnd, lang) => {
  const kind = pick(rnd, ['work', 'share', 'pump', 'feed']);
  const P = pick(rnd, [12, 24, 36, 48, 60, 72, 120]);
  const divs = Array.from({ length: P }, (_, i) => i + 1).filter((d) => P % d === 0 && d >= 2 && d <= 15 && P / d >= 2);
  const [a, b] = sample(rnd, divs, 2);
  const t = {
    work: [`${a} orang menyelesaikan pekerjaan dalam ${P / a} hari. ${b} orang selesai dalam … hari`, `${a} workers finish a job in ${P / a} days. ${b} workers finish it in … days`],
    share: [`Permen dibagi ke ${a} anak, masing-masing ${P / a}. Jika dibagi ke ${b} anak, masing-masing …`, `Sweets are shared among ${a} children, ${P / a} each. Shared among ${b} children, each gets …`],
    pump: [`Kolam dikuras ${a} pompa selama ${P / a} jam. Dengan ${b} pompa … jam`, `${a} pumps empty a pool in ${P / a} hours. ${b} pumps take … hours`],
    feed: [`Pakan cukup untuk ${a} kambing selama ${P / a} hari. Untuk ${b} kambing cukup … hari`, `Feed lasts ${a} goats for ${P / a} days. For ${b} goats it lasts … days`],
  }[kind];
  return num({
    q: L(lang, ...t),
    ans: P / b,
    wrong: [[(P / a) * b / a === Math.round((P / a) * b / a) && (P / a) * b / a !== P / b ? ((P / a) * b) / a : null, L(lang, 'Ini berbalik nilai: semakin banyak, semakin sedikit.', 'This is inverse: more of one means less of the other.')], [P, L(lang, `Itu hasil kalinya (${a} × ${P / a}). Bagi dengan ${b}.`, `That is the product (${a} × ${P / a}). Divide by ${b}.`)]],
    steps: [L(lang, `Hasil kali tetap: ${a} × ${P / a} = ${P}.`, `The product stays the same: ${a} × ${P / a} = ${P}.`), `${P} ${dv(lang)} ${b} = ${P / b}.`],
    meta: { a, x: P / a, b },
  });
};
inverse.solve = (m) => (m.a * m.x) / m.b;

const propKind = pool([
  (l) => ({ q: L(l, 'Manakah yang senilai?', 'Which is a direct proportion?'), ok: L(l, 'banyak barang dan total harga', 'number of items and total price'), bad: [[L(l, 'banyak pekerja dan lama pekerjaan', 'number of workers and time taken'), L(l, 'Itu berbalik nilai.', 'That is inverse.')], [L(l, 'kecepatan dan waktu tempuh', 'speed and travel time'), L(l, 'Itu berbalik nilai.', 'That is inverse.')]], steps: [L(l, 'Barang 2 kali, harga juga 2 kali.', 'Twice the items, twice the price.')] }),
  (l) => ({ q: L(l, 'Manakah yang berbalik nilai?', 'Which is an inverse proportion?'), ok: L(l, 'banyak pekerja dan lama pekerjaan', 'number of workers and time taken'), bad: [[L(l, 'banyak buku dan harganya', 'number of books and their price'), L(l, 'Itu senilai.', 'That is direct.')], [L(l, 'liter bensin dan jarak tempuh', 'litres of petrol and distance'), L(l, 'Itu senilai.', 'That is direct.')]], steps: [L(l, 'Pekerja 2 kali, waktunya setengah.', 'Twice the workers, half the time.')] }),
  (l) => ({ q: L(l, 'Manakah yang senilai?', 'Which is a direct proportion?'), ok: L(l, 'liter bensin dan jarak tempuh', 'litres of petrol and distance travelled'), bad: [[L(l, 'banyak anak dan bagian tiap anak', 'number of children and each child\'s share'), L(l, 'Anak bertambah, bagian mengecil: berbalik nilai.', 'More children, smaller shares: inverse.')], [L(l, 'banyak pompa dan lama menguras', 'number of pumps and emptying time'), L(l, 'Itu berbalik nilai.', 'That is inverse.')]], steps: [L(l, 'Bensin 2 kali, jarak 2 kali.', 'Twice the petrol, twice the distance.')] }),
  (l) => ({ q: L(l, 'Manakah yang berbalik nilai?', 'Which is an inverse proportion?'), ok: L(l, 'kecepatan dan waktu tempuh untuk jarak yang sama', 'speed and travel time for the same distance'), bad: [[L(l, 'waktu dan jarak dengan kecepatan tetap', 'time and distance at a steady speed'), L(l, 'Itu senilai.', 'That is direct.')], [L(l, 'banyak telur dan banyak kue', 'number of eggs and number of cakes'), L(l, 'Itu senilai.', 'That is direct.')]], steps: [L(l, 'Lebih cepat, waktunya lebih singkat.', 'Faster means less time.')] }),
  (l) => ({ q: L(l, 'Dua besaran senilai. Yang satu menjadi 3 kali. Yang lain menjadi …', 'Two quantities are in direct proportion. One becomes 3 times as much. The other becomes …'), ok: L(l, '3 kali', '3 times as much'), bad: [[L(l, 'sepertiganya', 'a third'), L(l, 'Itu berbalik nilai.', 'That is inverse.')], [L(l, 'tetap', 'unchanged'), L(l, 'Senilai berarti ikut berubah sama.', 'Direct means it changes the same way.')]], steps: [L(l, 'Senilai: ikut naik dengan kelipatan sama.', 'Direct: it grows by the same factor.')] }),
  (l) => ({ q: L(l, 'Dua besaran berbalik nilai. Yang satu menjadi 2 kali. Yang lain menjadi …', 'Two quantities are in inverse proportion. One doubles. The other becomes …'), ok: L(l, 'setengahnya', 'half'), bad: [[L(l, '2 kali', 'double'), L(l, 'Itu senilai.', 'That is direct.')], [L(l, 'tetap', 'unchanged'), L(l, 'Berbalik nilai berarti berubah berlawanan.', 'Inverse means it changes the opposite way.')]], steps: [L(l, 'Hasil kali tetap, jadi yang lain setengahnya.', 'The product stays fixed, so the other halves.')] }),
  (l) => ({ q: L(l, 'Pada perbandingan senilai, yang selalu tetap adalah …', 'In a direct proportion, what always stays the same?'), ok: L(l, 'hasil baginya', 'the quotient'), bad: [[L(l, 'hasil kalinya', 'the product'), L(l, 'Hasil kali tetap pada berbalik nilai.', 'The product is fixed in inverse proportion.')], [L(l, 'jumlahnya', 'the sum'), L(l, 'Jumlahnya berubah.', 'The sum changes.')]], steps: [L(l, 'Misalnya harga ÷ banyak barang = harga satuan.', 'For example price ÷ items = unit price.')] }),
  (l) => ({ q: L(l, 'Pada perbandingan berbalik nilai, yang selalu tetap adalah …', 'In an inverse proportion, what always stays the same?'), ok: L(l, 'hasil kalinya', 'the product'), bad: [[L(l, 'hasil baginya', 'the quotient'), L(l, 'Hasil bagi tetap pada senilai.', 'The quotient is fixed in direct proportion.')], [L(l, 'selisihnya', 'the difference'), L(l, 'Selisihnya berubah.', 'The difference changes.')]], steps: [L(l, 'Misalnya pekerja × hari = tetap.', 'For example workers × days = constant.')] }),
  (l) => ({ q: L(l, 'Manakah yang senilai?', 'Which is a direct proportion?'), ok: L(l, 'lama mesin bekerja dan banyak lembar yang dicetak', 'printing time and number of sheets printed'), bad: [[L(l, 'banyak kambing dan lama pakan habis', 'number of goats and how long feed lasts'), L(l, 'Kambing bertambah, pakan cepat habis: berbalik nilai.', 'More goats, feed runs out sooner: inverse.')], [L(l, 'banyak pekerja dan lama pekerjaan', 'number of workers and time taken'), L(l, 'Itu berbalik nilai.', 'That is inverse.')]], steps: [L(l, 'Waktu 2 kali, lembar 2 kali.', 'Twice the time, twice the sheets.')] }),
  (l) => ({ q: L(l, 'Manakah yang berbalik nilai?', 'Which is an inverse proportion?'), ok: L(l, 'banyak anak dan bagian kue tiap anak', 'number of children and each child\'s share of a cake'), bad: [[L(l, 'banyak kue dan banyak tepung', 'number of cakes and amount of flour'), L(l, 'Itu senilai.', 'That is direct.')], [L(l, 'lama berjalan dan jarak yang ditempuh', 'walking time and distance walked'), L(l, 'Itu senilai.', 'That is direct.')]], steps: [L(l, 'Anak bertambah, bagian tiap anak mengecil.', 'More children, smaller shares.')] }),
]);

// ---------- Bab 6: Perbesaran dan skala ----------
const enlarge = (rnd, lang) => {
  const kind = pick(rnd, ['up', 'down', 'factor', 'angle']);
  if (kind === 'angle') {
    const deg = pick(rnd, [30, 45, 60, 75, 90, 110, 120]);
    const k = ri(rnd, 2, 4);
    return num({
      q: L(lang, `Sudut ${deg}° pada gambar diperbesar ${k} kali. Besar sudutnya menjadi …°`, `A ${deg}° angle in a picture is enlarged ${k} times. The angle becomes …°`),
      ans: deg,
      wrong: [[deg * k, L(lang, 'Perbesaran tidak mengubah besar sudut, hanya panjang sisi.', 'Enlarging does not change angles, only side lengths.')]],
      steps: [L(lang, 'Bentuknya tetap sama, jadi sudutnya tetap.', 'The shape stays the same, so the angles stay the same.'), `${deg}°.`],
      meta: { kind, deg },
    });
  }
  const s = ri(rnd, 2, 9);
  const k = ri(rnd, 2, 5);
  if (kind === 'down')
    return num({
      q: L(lang, `Sisi ${s * k} cm diperkecil 1/${k} kali menjadi … cm`, `A ${s * k} cm side is reduced by a factor of 1/${k}. It becomes … cm`),
      ans: s,
      wrong: [[s * k * k, L(lang, 'Diperkecil berarti mengecil.', 'Reducing makes it smaller.')], [s * k - k, L(lang, `Dikali 1/${k} berarti dibagi ${k}.`, `Times 1/${k} means divide by ${k}.`)]],
      steps: [`${s * k} × 1/${k} = ${s * k} ${dv(lang)} ${k}`, `= ${s} cm.`],
      meta: { kind, x: s * k, k },
    });
  if (kind === 'factor')
    return num({
      q: L(lang, `Sisi ${s} cm menjadi ${s * k} cm. Diperbesar … kali`, `A ${s} cm side becomes ${s * k} cm. It was enlarged … times`),
      ans: k,
      wrong: [[s * k - s, L(lang, 'Itu selisihnya. Faktor perbesaran = sisi baru ÷ sisi lama.', 'That is the difference. Scale factor = new ÷ old.')]],
      steps: [`${s * k} ${dv(lang)} ${s} = ${k}.`],
      meta: { kind, s, n: s * k },
    });
  return num({
    q: L(lang, `Sisi ${s} cm diperbesar ${k} kali menjadi … cm`, `A ${s} cm side is enlarged ${k} times. It becomes … cm`),
    ans: s * k,
    wrong: [[s + k, L(lang, `${k} kali berarti dikali ${k}.`, `${k} times means multiply by ${k}.`)], [s, L(lang, 'Diperbesar berarti sisinya bertambah panjang.', 'Enlarging makes the side longer.')]],
    steps: [`${s} × ${k} = ${s * k} cm.`],
    meta: { kind, s, k },
  });
};
enlarge.solve = (m) => ({ angle: () => m.deg, down: () => m.x / m.k, factor: () => m.n / m.s, up: () => m.s * m.k })[m.kind]();

const enlargePool = pool([
  (l) => ({ q: L(l, 'Pada perbesaran, yang tidak berubah adalah …', 'When a shape is enlarged, what does not change?'), ok: L(l, 'besar sudut', 'the angles'), bad: [[L(l, 'panjang sisi', 'the side lengths'), L(l, 'Sisi ikut membesar.', 'Sides get longer.')], [L(l, 'keliling', 'the perimeter'), L(l, 'Keliling ikut membesar.', 'The perimeter grows too.')]], steps: [L(l, 'Bentuk tetap, jadi sudut tetap.', 'Same shape, same angles.')] }),
  (l) => ({ q: L(l, 'Persegi bersisi 3 cm diperbesar 2 kali. Kelilingnya menjadi …', 'A 3 cm square is enlarged 2 times. Its perimeter becomes …'), ok: '24 cm', bad: [['12 cm', L(l, 'Itu keliling semula.', 'That is the old perimeter.')], ['48 cm', L(l, 'Keliling hanya 2 kali, bukan 4 kali.', 'The perimeter doubles, not quadruples.')]], steps: [L(l, 'Sisi baru 6 cm. Keliling 4 × 6 = 24 cm.', 'New side 6 cm. Perimeter 4 × 6 = 24 cm.')] }),
  (l) => ({ q: L(l, 'Foto 4 cm × 6 cm diperbesar 3 kali. Ukurannya menjadi …', 'A 4 cm × 6 cm photo is enlarged 3 times. It becomes …'), ok: '12 cm × 18 cm', bad: [['7 cm × 9 cm', L(l, 'Dikali 3, bukan ditambah 3.', 'Multiply by 3, do not add 3.')], ['12 cm × 6 cm', L(l, 'Kedua sisi diperbesar.', 'Both sides are enlarged.')]], steps: ['4 × 3 = 12, 6 × 3 = 18.'] }),
  (l) => ({ q: L(l, 'Segitiga diperkecil 1/2 kali. Bentuknya …', 'A triangle is reduced by a factor of 1/2. Its shape …'), ok: L(l, 'tetap sama', 'stays the same'), bad: [[L(l, 'menjadi persegi', 'becomes a square'), L(l, 'Perkecilan tidak mengubah jenis bangun.', 'Reducing does not change the type of shape.')], [L(l, 'menjadi lebih runcing', 'gets pointier'), L(l, 'Sudutnya tidak berubah.', 'The angles do not change.')]], steps: [L(l, 'Hanya ukurannya yang berubah.', 'Only the size changes.')] }),
  (l) => ({ q: L(l, 'Gambar diperbesar 2 kali. Setiap sisi menjadi …', 'A picture is enlarged 2 times. Each side becomes …'), ok: L(l, '2 kali lebih panjang', 'twice as long'), bad: [[L(l, '2 cm lebih panjang', '2 cm longer'), L(l, 'Dikali 2, bukan ditambah 2.', 'Multiply by 2, do not add 2.')], [L(l, 'setengahnya', 'half as long'), L(l, 'Itu perkecilan.', 'That is a reduction.')]], steps: [L(l, 'Setiap sisi dikali 2.', 'Each side is multiplied by 2.')] }),
  (l) => ({ q: L(l, 'Persegi panjang 10 cm × 4 cm diperkecil menjadi 5 cm × 2 cm. Faktor perkecilannya …', 'A 10 cm × 4 cm rectangle is reduced to 5 cm × 2 cm. The scale factor is …'), ok: '1/2', bad: [['2', L(l, 'Gambarnya mengecil, jadi faktornya kurang dari 1.', 'It got smaller, so the factor is less than 1.')], ['5', L(l, 'Itu selisih panjangnya.', 'That is the difference in length.')]], steps: ['5/10 = 2/4 = 1/2.'] }),
  (l) => ({ q: L(l, 'Mana yang merupakan perbesaran dari persegi panjang 2 cm × 3 cm?', 'Which is an enlargement of a 2 cm × 3 cm rectangle?'), ok: '4 cm × 6 cm', bad: [['4 cm × 5 cm', L(l, 'Sisi kedua tidak dikali dengan bilangan yang sama.', 'The second side was not multiplied by the same number.')], ['3 cm × 4 cm', L(l, 'Itu ditambah 1, bukan dikali.', 'That adds 1 instead of multiplying.')]], steps: [L(l, 'Kedua sisi dikali 2.', 'Both sides times 2.')] }),
  (l) => ({ q: L(l, 'Sudut siku-siku pada gambar diperkecil 1/3 kali. Sudutnya menjadi …', 'A right angle in a picture is reduced by a factor of 1/3. The angle becomes …'), ok: '90°', bad: [['30°', L(l, 'Sudut tidak ikut diperkecil.', 'Angles are not reduced.')], ['270°', L(l, 'Sudut tidak berubah.', 'Angles do not change.')]], steps: [L(l, 'Sudut tetap 90°.', 'The angle stays 90°.')] }),
  (l) => ({ q: L(l, 'Pada perbesaran 3 kali, perbandingan sisi gambar baru dan lama adalah …', 'In a 3 times enlargement, new side : old side is …'), ok: '3 : 1', bad: [['1 : 3', L(l, 'Urutannya baru : lama.', 'The order is new : old.')], ['3 : 3', L(l, 'Sisi baru 3 kali sisi lama.', 'The new side is 3 times the old.')]], steps: [L(l, 'Sisi baru = 3 × sisi lama.', 'New side = 3 × old side.')] }),
  (l) => ({ q: L(l, 'Lingkaran berjari-jari 2 cm diperbesar 4 kali. Jari-jarinya menjadi …', 'A circle of radius 2 cm is enlarged 4 times. The radius becomes …'), ok: '8 cm', bad: [['6 cm', L(l, 'Dikali 4, bukan ditambah 4.', 'Multiply by 4, do not add 4.')], ['2 cm', L(l, 'Jari-jari ikut membesar.', 'The radius grows too.')]], steps: ['2 × 4 = 8 cm.'] }),
]);

const mapScale = (rnd, lang) => {
  const kind = pick(rnd, ['toReal', 'toReal', 'toMap', 'plan', 'findScale']);
  const S = pick(rnd, [100000, 200000, 250000, 400000, 500000, 1000000]);
  const kmPerCm = S / 100000;
  if (kind === 'plan') {
    const m = ri(rnd, 2, 12);
    const sc = pick(rnd, [100, 200]);
    return num({
      q: L(lang, `Skala denah 1 : ${sc}. Panjang ruang sebenarnya ${m} m. Di denah … cm`, `A floor plan has scale 1 : ${sc}. A room is ${m} m long. On the plan it is … cm`),
      ans: (m * 100) / sc,
      wrong: [[m * sc, L(lang, 'Jarak di denah lebih kecil. Bagi dengan skala.', 'The plan is smaller. Divide by the scale.')], [m * 100, L(lang, `Ubah ke cm, lalu bagi ${sc}.`, `Change to cm, then divide by ${sc}.`)]],
      steps: [`${m} m = ${m * 100} cm.`, `${m * 100} ${dv(lang)} ${sc} = ${N(lang, (m * 100) / sc)} cm.`],
      meta: { kind, m, sc },
    });
  }
  if (kind === 'findScale') {
    const d = ri(rnd, 2, 8);
    return num({
      q: L(lang, `Jarak peta ${d} cm mewakili ${d * kmPerCm} km. Skalanya 1 : …`, `${d} cm on a map stands for ${d * kmPerCm} km. The scale is 1 : …`),
      ans: S,
      wrong: [[kmPerCm, L(lang, 'Ubah km ke cm dulu: 1 km = 100.000 cm.', 'Change km to cm first: 1 km = 100,000 cm.')], [S * d, L(lang, `Bagi dengan ${d} cm untuk mendapat 1 cm.`, `Divide by ${d} cm to get 1 cm.`)]],
      steps: [`${d * kmPerCm} km = ${G(lang, d * S)} cm.`, `${G(lang, d * S)} ${dv(lang)} ${d} = ${G(lang, S)}.`],
      meta: { kind, d, km: d * kmPerCm },
    });
  }
  if (kind === 'toMap') {
    const d = ri(rnd, 2, 9);
    return num({
      q: L(lang, `Jarak sebenarnya ${d * kmPerCm} km, skala 1 : ${G(lang, S)}. Jarak peta … cm`, `The real distance is ${d * kmPerCm} km at a scale of 1 : ${G(lang, S)}. The map distance is … cm`),
      ans: d,
      wrong: [[d * kmPerCm * kmPerCm !== d ? d * kmPerCm * kmPerCm : null, L(lang, `1 cm di peta = ${kmPerCm} km. Bagi, jangan kali.`, `1 cm on the map = ${kmPerCm} km. Divide, do not multiply.`)], [d * kmPerCm, L(lang, 'Itu jarak sebenarnya dalam km.', 'That is the real distance in km.')]],
      steps: [L(lang, `1 cm di peta = ${G(lang, S)} cm = ${kmPerCm} km.`, `1 cm on the map = ${G(lang, S)} cm = ${kmPerCm} km.`), `${d * kmPerCm} ${dv(lang)} ${kmPerCm} = ${d} cm.`],
      meta: { kind, km: d * kmPerCm, S },
    });
  }
  const d = ri(rnd, 2, 12);
  return num({
    q: L(lang, `Skala 1 : ${G(lang, S)}, jarak peta ${d} cm. Jarak sebenarnya … km`, `Scale 1 : ${G(lang, S)}, map distance ${d} cm. The real distance is … km`),
    ans: d * kmPerCm,
    wrong: [[d * S, L(lang, 'Itu masih dalam cm. Ubah ke km: bagi 100.000.', 'That is still in cm. Change to km: divide by 100,000.')], [kmPerCm !== 1 ? d : null, L(lang, `1 cm di peta = ${kmPerCm} km, bukan 1 km.`, `1 cm on the map = ${kmPerCm} km, not 1 km.`)]],
    steps: [`${d} × ${G(lang, S)} = ${G(lang, d * S)} cm.`, `${G(lang, d * S)} cm = ${d * kmPerCm} km.`],
    meta: { kind, d, S },
  });
};
mapScale.solve = (m) => ({ plan: () => (m.m * 100) / m.sc, findScale: () => (m.km * 100000) / m.d, toMap: () => (m.km * 100000) / m.S, toReal: () => (m.d * m.S) / 100000 })[m.kind]();

// ---------- Bab 7: Kecepatan dan debit ----------
const speed = (rnd, lang) => {
  const kind = pick(rnd, ['v', 's', 't', 'half']);
  const v = pick(rnd, [4, 5, 20, 30, 40, 45, 50, 60, 70, 80]);
  const t = ri(rnd, 2, 5);
  const veh = v <= 5 ? [['Berjalan', 'Walking']] : [['Mobil', 'A car'], ['Bus', 'A bus'], ['Motor', 'A motorbike']];
  const who = pick(rnd, veh);
  if (kind === 'half') {
    const tt = pick(rnd, [0.5, 1.5, 2.5]);
    const vv = pick(rnd, [4, 6, 10, 20, 40, 60]);
    const findT = rnd() < 0.5;
    return num({
      q: findT ? L(lang, `Jarak ${N(lang, vv * tt)} km ditempuh dengan kecepatan ${vv} km/jam. Waktu … jam`, `A distance of ${N(lang, vv * tt)} km at ${vv} km/h takes … hours`) : L(lang, `Kecepatan ${vv} km/jam selama ${tt * 60} menit. Jarak … km`, `At ${vv} km/h for ${tt * 60} minutes, the distance is … km`),
      ans: findT ? tt : vv * tt,
      wrong: findT ? [[vv * tt * vv, L(lang, 'Waktu = jarak : kecepatan.', 'Time = distance ÷ speed.')]] : [[vv * tt * 60, L(lang, `Ubah menit ke jam dulu: ${tt * 60} menit = ${N(lang, tt)} jam.`, `Change minutes to hours first: ${tt * 60} minutes = ${N(lang, tt)} hours.`)], [vv * (tt * 60) / 100, L(lang, '1 jam = 60 menit, bukan 100.', '1 hour = 60 minutes, not 100.')]],
      steps: findT ? [`${N(lang, vv * tt)} ${dv(lang)} ${vv} = ${N(lang, tt)} ${L(lang, 'jam', 'hours')}.`] : [`${tt * 60} ${L(lang, 'menit', 'minutes')} = ${N(lang, tt)} ${L(lang, 'jam', 'hours')}.`, `${vv} × ${N(lang, tt)} = ${N(lang, vv * tt)} km.`],
      meta: { kind, findT, v: vv, t: tt },
    });
  }
  const s = v * t;
  const q = {
    v: [`Jarak ${s} km ditempuh ${t} jam. Kecepatan … km/jam`, `${s} km is covered in ${t} hours. The speed is … km/h`],
    s: [`${who[0]} dengan kecepatan ${v} km/jam selama ${t} jam. Jarak … km`, `${who[1]} goes at ${v} km/h for ${t} hours. The distance is … km`],
    t: [`Jarak ${s} km, kecepatan ${v} km/jam. Waktu … jam`, `${s} km at ${v} km/h takes … hours`],
  }[kind];
  const ans = { v, s, t }[kind];
  return num({
    q: L(lang, ...q),
    ans,
    wrong: kind === 's' ? [[v + t, L(lang, 'Jarak = kecepatan × waktu.', 'Distance = speed × time.')]] : kind === 'v' ? [[s * t, L(lang, 'Kecepatan = jarak : waktu.', 'Speed = distance ÷ time.')], [s - t, L(lang, 'Bagi, jangan kurangi.', 'Divide, do not subtract.')]] : [[s * v, L(lang, 'Waktu = jarak : kecepatan.', 'Time = distance ÷ speed.')], [s - v, L(lang, 'Bagi, jangan kurangi.', 'Divide, do not subtract.')]],
    steps: kind === 's' ? [`${v} × ${t} = ${s} km.`] : kind === 'v' ? [`${s} ${dv(lang)} ${t} = ${v} km/${L(lang, 'jam', 'h')}.`] : [`${s} ${dv(lang)} ${v} = ${t} ${L(lang, 'jam', 'hours')}.`],
    meta: { kind, v, t },
  });
};
speed.solve = (m) => {
  if (m.kind === 'half') return m.findT ? (m.v * m.t) / m.v : m.v * m.t;
  return { v: m.v, s: m.v * m.t, t: (m.v * m.t) / m.v }[m.kind];
};

const flow = (rnd, lang) => {
  const kind = pick(rnd, ['Q', 'V', 'T', 'perSec', 'cm3']);
  const Q = ri(rnd, 2, 25);
  const T = ri(rnd, 3, 30);
  if (kind === 'perSec') {
    const q = ri(rnd, 1, 5);
    return num({
      q: L(lang, `Debit ${q} L/detik. Dalam 1 menit … L`, `A flow of ${q} L per second. In 1 minute: … L`),
      ans: q * 60,
      wrong: [[q, L(lang, '1 menit = 60 detik.', '1 minute = 60 seconds.')], [q * 100, L(lang, '1 menit = 60 detik, bukan 100.', '1 minute = 60 seconds, not 100.')]],
      steps: [`${q} × 60 = ${q * 60} L.`],
      meta: { kind, q },
    });
  }
  if (kind === 'cm3') {
    const L1 = pick(rnd, [3000, 6000, 4000, 9000, 12000]);
    const m = pick(rnd, [2, 3, 4]);
    if ((L1 / 1000 / m) * 10 !== Math.round((L1 / 1000 / m) * 10)) return flow(rnd, lang);
    return num({
      q: L(lang, `${G(lang, L1)} cm³ air mengalir dalam ${m} menit. Debit … L/menit`, `${G(lang, L1)} cm³ of water flows in ${m} minutes. The flow is … L per minute`),
      ans: L1 / 1000 / m,
      wrong: [[L1 / m, L(lang, 'Ubah cm³ ke liter dulu: bagi 1.000.', 'Change cm³ to litres first: divide by 1,000.')], [(L1 / 1000) * m, L(lang, 'Debit = volume : waktu.', 'Flow = volume ÷ time.')]],
      steps: [`${G(lang, L1)} cm³ = ${L1 / 1000} L.`, `${L1 / 1000} ${dv(lang)} ${m} = ${N(lang, L1 / 1000 / m)} L/${L(lang, 'menit', 'min')}.`],
      meta: { kind, V: L1, m },
    });
  }
  const V = Q * T;
  const q = {
    Q: [`${V} liter air mengalir dalam ${T} menit. Debit … L/menit`, `${V} litres flow in ${T} minutes. The flow is … L per minute`],
    V: [`Debit ${Q} L/menit selama ${T} menit. Volume … L`, `A flow of ${Q} L per minute for ${T} minutes. Volume = … L`],
    T: [`Bak ${V} L diisi dengan debit ${Q} L/menit. Waktu … menit`, `A ${V} L tank is filled at ${Q} L per minute. It takes … minutes`],
  }[kind];
  const ans = { Q, V, T }[kind];
  return num({
    q: L(lang, ...q),
    ans,
    wrong: kind === 'V' ? [[Q + T, L(lang, 'Volume = debit × waktu.', 'Volume = flow × time.')]] : [[kind === 'Q' ? V * T : V * Q, L(lang, 'Bagi, jangan kali.', 'Divide, do not multiply.')], [kind === 'Q' ? V - T : V - Q, L(lang, 'Bagi, jangan kurangi.', 'Divide, do not subtract.')]],
    steps: kind === 'V' ? [`${Q} × ${T} = ${V} L.`] : kind === 'Q' ? [`${V} ${dv(lang)} ${T} = ${Q} L/${L(lang, 'menit', 'min')}.`] : [`${V} ${dv(lang)} ${Q} = ${T} ${L(lang, 'menit', 'minutes')}.`],
    meta: { kind, Q, T },
  });
};
flow.solve = (m) => ({ perSec: () => m.q * 60, cm3: () => m.V / 1000 / m.m, Q: () => m.Q, V: () => m.Q * m.T, T: () => (m.Q * m.T) / m.Q })[m.kind]();

// ---------- Bab 8: Statistik ----------
const meanGen = (rnd, lang) => {
  const kind = pick(rnd, ['mean', 'mean', 'money']);
  const n = ri(rnd, 3, 6);
  const avg = kind === 'money' ? ri(rnd, 3, 9) * 1000 : ri(rnd, 5, 90);
  const step = kind === 'money' ? 1000 : avg < 10 ? 1 : pick(rnd, [1, 2, 5]);
  let xs;
  do {
    xs = Array.from({ length: n - 1 }, () => avg + ri(rnd, -3, 3) * step);
    xs.push(avg * n - xs.reduce((a, b) => a + b, 0));
  } while (xs.some((x) => x <= 0) || Math.abs(xs[n - 1] - avg) > 4 * step);
  const sum = xs.reduce((a, b) => a + b, 0);
  return num({
    q: kind === 'money' ? L(lang, `Uang jajan ${n} hari (rupiah): ${xs.map((x) => G(lang, x)).join('; ')}. Rata-ratanya …`, `Pocket money for ${n} days (rupiah): ${xs.map((x) => G(lang, x)).join('; ')}. The mean is …`) : L(lang, `Rata-rata dari ${xs.join(', ')} adalah …`, `The mean of ${xs.join(', ')} is …`),
    ans: avg,
    wrong: [[sum, L(lang, `Itu jumlahnya. Bagi dengan banyak data (${n}).`, `That is the total. Divide by how many (${n}).`)], [n % 2 ? xs.slice().sort((a, b) => a - b)[(n - 1) / 2] : null, L(lang, 'Itu nilai tengah (median), bukan rata-rata.', 'That is the middle value (median), not the mean.')]],
    steps: [`${xs.map((x) => G(lang, x)).join(' + ')} = ${G(lang, sum)}.`, `${G(lang, sum)} ${dv(lang)} ${n} = ${G(lang, avg)}.`],
    meta: { xs },
  });
};
meanGen.solve = (m) => m.xs.reduce((a, b) => a + b, 0) / m.xs.length;

const meanBack = (rnd, lang) => {
  const kind = pick(rnd, ['sum', 'missing']);
  if (kind === 'sum') {
    const n = ri(rnd, 3, 8);
    const avg = ri(rnd, 4, 30);
    return num({
      q: L(lang, `Rata-rata ${n} bilangan adalah ${avg}. Jumlah semuanya …`, `The mean of ${n} numbers is ${avg}. Their total is …`),
      ans: n * avg,
      wrong: [[avg, L(lang, 'Itu rata-ratanya. Jumlah = rata-rata × banyak data.', 'That is the mean. Total = mean × how many.')], [n + avg, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')]],
      steps: [`${avg} × ${n} = ${n * avg}.`],
      meta: { kind, n, avg },
    });
  }
  const n = ri(rnd, 2, 4);
  const avg = pick(rnd, [70, 75, 80, 85, 90]);
  const known = Array.from({ length: n - 1 }, () => Math.min(100, avg + ri(rnd, -3, 3) * 5));
  const last = avg * n - known.reduce((a, b) => a + b, 0);
  if (last > 100 || last < 40) return meanBack(rnd, lang);
  const [who] = names(rnd, 1);
  return num({
    q: L(lang, `Rata-rata ${n} nilai ulangan ${who} adalah ${avg}. Nilai sebelumnya ${known.join(', ')}. Nilai terakhir …`, `The mean of ${who}'s ${n} test scores is ${avg}. The earlier scores are ${known.join(', ')}. The last score is …`),
    ans: last,
    wrong: [[avg, L(lang, 'Hitung jumlah semua nilai dulu: rata-rata × banyak nilai.', 'Find the total first: mean × number of scores.')], [avg * (n - 1) - known.reduce((a, b) => a + b, 0) > 0 ? avg * (n - 1) - known.reduce((a, b) => a + b, 0) : null, L(lang, `Jumlah semua nilai = ${avg} × ${n}, bukan × ${n - 1}.`, `Total = ${avg} × ${n}, not × ${n - 1}.`)]],
    steps: [`${avg} × ${n} = ${avg * n}.`, `${avg * n} − ${known.reduce((a, b) => a + b, 0)} = ${last}.`],
    meta: { kind, n, avg, known },
  });
};
meanBack.solve = (m) => (m.kind === 'sum' ? m.n * m.avg : m.avg * m.n - m.known.reduce((a, b) => a + b, 0));

const centre = (rnd, lang) => {
  const kind = pick(rnd, ['medOdd', 'medEven', 'mode', 'range']);
  if (kind === 'mode') {
    const m = ri(rnd, 1, 20);
    const others = sample(rnd, Array.from({ length: 20 }, (_, i) => i + 1).filter((x) => x !== m), 3);
    const xs = [m, m, m, ...others, others[0]];
    for (let i = xs.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [xs[i], xs[j]] = [xs[j], xs[i]];
    }
    return num({
      q: L(lang, `Modus dari ${xs.join(', ')} adalah …`, `The mode of ${xs.join(', ')} is …`),
      ans: m,
      wrong: [[3, L(lang, `3 adalah berapa kali ${m} muncul. Modusnya ${m}.`, `3 is how often ${m} appears. The mode is ${m}.`)], [Math.max(...xs) !== m ? Math.max(...xs) : null, L(lang, 'Modus bukan nilai terbesar.', 'The mode is not the largest value.')]],
      steps: [L(lang, `${m} muncul 3 kali, paling sering.`, `${m} appears 3 times, the most.`)],
      meta: { kind, xs },
    });
  }
  const n = kind === 'medOdd' ? pick(rnd, [5, 7]) : pick(rnd, [4, 6]);
  let xs;
  do xs = sample(rnd, Array.from({ length: 30 }, (_, i) => i + 1), n);
  while (kind === 'medEven' && (xs.slice().sort((a, b) => a - b)[n / 2 - 1] + xs.slice().sort((a, b) => a - b)[n / 2]) % 2);
  const s = xs.slice().sort((a, b) => a - b);
  if (kind === 'range')
    return num({
      q: L(lang, `Jangkauan dari ${xs.join(', ')} adalah …`, `The range of ${xs.join(', ')} is …`),
      ans: s[n - 1] - s[0],
      wrong: [[xs[xs.length - 1] - xs[0] > 0 && xs[xs.length - 1] - xs[0] !== s[n - 1] - s[0] ? xs[xs.length - 1] - xs[0] : null, L(lang, 'Pakai data terbesar dan terkecil, bukan data terakhir dan pertama.', 'Use the largest and smallest values, not the last and first.')], [s[n - 1], L(lang, 'Kurangi dengan data terkecil.', 'Subtract the smallest value.')]],
      steps: [L(lang, `Terbesar ${s[n - 1]}, terkecil ${s[0]}.`, `Largest ${s[n - 1]}, smallest ${s[0]}.`), `${s[n - 1]} − ${s[0]} = ${s[n - 1] - s[0]}.`],
      meta: { kind, xs },
    });
  const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  return num({
    q: L(lang, `Median dari ${xs.join(', ')} adalah …`, `The median of ${xs.join(', ')} is …`),
    ans: med,
    wrong: [[n % 2 ? xs[(n - 1) / 2] : null, L(lang, 'Urutkan datanya dulu, baru ambil yang di tengah.', 'Sort the data first, then take the middle.')], [Number.isInteger(s.reduce((x, y) => x + y, 0) / n) ? s.reduce((x, y) => x + y, 0) / n : null, L(lang, 'Itu rata-rata. Median adalah nilai tengah setelah diurutkan.', 'That is the mean. The median is the middle value after sorting.')], [n % 2 === 0 ? s[n / 2 - 1] : null, L(lang, 'Ada dua data di tengah. Ambil rata-rata keduanya.', 'There are two middle values. Take their mean.')]],
    steps: [L(lang, `Urutkan: ${s.join(', ')}.`, `Sort: ${s.join(', ')}.`), n % 2 ? L(lang, `Tengahnya: ${med}.`, `The middle: ${med}.`) : `(${s[n / 2 - 1]} + ${s[n / 2]}) ${dv(lang)} 2 = ${med}.`],
    meta: { kind, xs },
  });
};
centre.solve = (m) => {
  const s = m.xs.slice().sort((a, b) => a - b);
  const n = s.length;
  if (m.kind === 'range') return s[n - 1] - s[0];
  if (m.kind === 'mode') {
    const c = {};
    s.forEach((x) => (c[x] = (c[x] || 0) + 1));
    return Number(Object.keys(c).reduce((a, b) => (c[b] > c[a] ? b : a)));
  }
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};

const outlier = (rnd, lang) => {
  const base = ri(rnd, 1, 5);
  const xs = [base, base + 1, base + 1, base + 2, base + ri(rnd, 10, 20)];
  const mean = xs.reduce((a, b) => a + b, 0) / 5;
  const nm = [['rata-rata', 'the mean'], ['median', 'the median'], ['modus', 'the mode']];
  return mc({
    q: L(lang, `Data: ${xs.join(', ')}. Nilai mana yang paling besar?`, `Data: ${xs.join(', ')}. Which is the largest?`),
    ok: L(lang, ...nm[0]),
    bad: [[L(lang, ...nm[1]), L(lang, `Median = ${base + 1}, sedangkan rata-rata = ${N(lang, mean)}.`, `Median = ${base + 1}, but the mean = ${N(lang, mean)}.`)], [L(lang, ...nm[2]), L(lang, `Modus = ${base + 1}, sedangkan rata-rata = ${N(lang, mean)}.`, `Mode = ${base + 1}, but the mean = ${N(lang, mean)}.`)]],
    steps: [L(lang, `Rata-rata: ${xs.reduce((a, b) => a + b, 0)} ${dv(lang)} 5 = ${N(lang, mean)}.`, `Mean: ${xs.reduce((a, b) => a + b, 0)} ${dv(lang)} 5 = ${N(lang, mean)}.`), L(lang, `Median dan modus ${base + 1}. Data ${xs[4]} yang besar menarik rata-rata ke atas.`, `Median and mode are ${base + 1}. The big value ${xs[4]} pulls the mean up.`)],
    meta: { xs },
  });
};
outlier.solve = (m, lang) => {
  const s = m.xs.slice().sort((a, b) => a - b);
  const mean = s.reduce((a, b) => a + b, 0) / s.length;
  const med = s[2];
  const c = {};
  s.forEach((x) => (c[x] = (c[x] || 0) + 1));
  const mode = Number(Object.keys(c).reduce((a, b) => (c[b] > c[a] ? b : a)));
  const best = [[mean, ['rata-rata', 'the mean']], [med, ['median', 'the median']], [mode, ['modus', 'the mode']]].reduce((a, b) => (b[0] > a[0] ? b : a));
  return L(lang, ...best[1]);
};

export const K6 = {
  'k6b1-1': [fracMul, fracMulStory],
  'k6b1-2': [fracDiv, bottles],
  'k6b1-3': [percentOf, toPercent],
  'k6b2-1': [ratioSimp, ratioStory],
  'k6b2-2': [ratioShare, ratioKnown],
  'k6b3-1': [volCuboid, volBlocks],
  'k6b3-2': [volCube],
  'k6b4-1': [countWays],
  'k6b4-2': [prob, probWords],
  'k6b5-1': [direct, propKind],
  'k6b5-2': [inverse, propKind],
  'k6b6-1': [enlarge, enlargePool],
  'k6b6-2': [mapScale],
  'k6b7-1': [speed],
  'k6b7-2': [flow],
  'k6b8-1': [meanGen, meanBack],
  'k6b8-2': [centre, outlier],
};
