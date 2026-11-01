// Generator soal Kelas 4 SD.
import { L, ri, pick, num, mc, pool, names, name, sample, cap, words, G, F, gcd } from './common.js';
import { txt } from '../util.js';
import { box } from '../../helpers.js';
import { blockOf } from '../../k6/kit.js';

const PLACE = [['ribuan', 'thousands'], ['ratusan', 'hundreds'], ['puluhan', 'tens'], ['satuan', 'ones']];
const dv = (lang) => L(lang, ':', '÷');

// ---------- Bab 1: Bilangan sampai 10.000 ----------
const thouValue = (rnd, lang) => {
  const kind = pick(rnd, ['value', 'expand', 'word']);
  const ds = [ri(rnd, 1, 9), ri(rnd, 0, 9), rnd() < 0.3 ? 0 : ri(rnd, 0, 9), ri(rnd, 0, 9)];
  const n = Number(ds.join(''));
  if (kind === 'value') {
    const cand = [0, 1, 2, 3].filter((p) => ds[p] !== 0 && ds.indexOf(ds[p]) === p && ds.lastIndexOf(ds[p]) === p);
    if (!cand.length) return thouValue(rnd, lang);
    const p = pick(rnd, cand);
    const v = ds[p] * 10 ** (3 - p);
    return num({
      q: L(lang, `Nilai angka ${ds[p]} pada bilangan ${G(lang, n)} adalah …`, `The value of the digit ${ds[p]} in ${G(lang, n)} is …`),
      ans: v,
      wrong: [[p < 3 ? ds[p] : null, L(lang, `Angka ${ds[p]} di tempat ${PLACE[p][0]}, jadi nilainya lebih dari ${ds[p]}.`, `The ${ds[p]} is in the ${PLACE[p][1]} place, so it is worth more than ${ds[p]}.`)], [p > 0 ? v * 10 : v / 10, L(lang, 'Hitung tempatnya dari kanan: satuan, puluhan, ratusan, ribuan.', 'Count the places from the right: ones, tens, hundreds, thousands.')]],
      steps: [L(lang, `Angka ${ds[p]} ada di tempat ${PLACE[p][0]}.`, `The ${ds[p]} is in the ${PLACE[p][1]} place.`), L(lang, `Nilainya ${G(lang, v)}.`, `Its value is ${G(lang, v)}.`)],
      meta: { kind, n, p },
    });
  }
  if (kind === 'expand') {
    const parts = ds.map((d, i) => d * 10 ** (3 - i)).filter((x) => x > 0);
    return num({
      q: `${parts.map((x) => G(lang, x)).join(' + ')} = …`,
      ans: n,
      wrong: [[ds.some((d) => d === 0) ? Number(ds.filter((d) => d).join('')) : null, L(lang, 'Ada tempat yang kosong. Tulis 0 di tempat itu.', 'One place is empty. Write 0 there.')], [ds.reduce((a, b) => a + b, 0), L(lang, 'Jumlahkan nilainya, bukan angkanya saja.', 'Add the values, not just the digits.')]],
      steps: [L(lang, `${ds[0]} ribuan, ${ds[1]} ratusan, ${ds[2]} puluhan, ${ds[3]} satuan.`, `${ds[0]} thousands, ${ds[1]} hundreds, ${ds[2]} tens, ${ds[3]} ones.`), `= ${G(lang, n)}.`],
      meta: { kind, ds },
    });
  }
  return num({
    q: L(lang, `${cap(words(lang, n))} ditulis …`, `${cap(words(lang, n))} is written as …`),
    ans: n,
    wrong: [[Number(`${ds[0]}000${n % 1000}`) !== n ? Number(`${ds[0]}000${n % 1000}`) : null, L(lang, `${G(lang, ds[0] * 1000)} dan ${n % 1000} digabung menjadi ${G(lang, n)}.`, `${G(lang, ds[0] * 1000)} and ${n % 1000} make ${G(lang, n)}.`)], [ds[1] === 0 ? ds[0] * 100 + (n % 100) : null, L(lang, 'Tidak ada ratusan, jadi tulis 0 di tempat ratusan.', 'There are no hundreds, so write 0 there.')]],
    steps: [L(lang, `${ds[0]} ribuan, ${ds[1]} ratusan, ${ds[2]} puluhan, ${ds[3]} satuan.`, `${ds[0]} thousands, ${ds[1]} hundreds, ${ds[2]} tens, ${ds[3]} ones.`), `= ${G(lang, n)}.`],
    meta: { kind, ds },
  });
};
thouValue.solve = (m) => (m.kind === 'value' ? Number(String(m.n)[m.p]) * 10 ** (3 - m.p) : m.ds.reduce((a, d) => a * 10 + d, 0));

const regroup = (rnd, lang) => {
  const kind = pick(rnd, ['h2n', 'n2h', 't2n']);
  if (kind === 'h2n') {
    const k = pick(rnd, [10, 20, 30, 15, 25, 12, 40]);
    return num({
      q: L(lang, `${k} ratusan sama dengan …`, `${k} hundreds is the same as …`),
      ans: k * 100,
      wrong: [[k * 10, L(lang, 'Satu ratusan = 100, bukan 10.', 'One hundred is 100, not 10.')], [k * 1000, L(lang, 'Satu ratusan = 100.', 'One hundred is 100.')]],
      steps: [`${k} × 100 = ${G(lang, k * 100)}.`],
      meta: { kind, k },
    });
  }
  if (kind === 'n2h') {
    const k = ri(rnd, 2, 9) * 10 + pick(rnd, [0, 0, 5]);
    return num({
      q: L(lang, `${G(lang, k * 100)} = … ratusan`, `${G(lang, k * 100)} = … hundreds`),
      ans: k,
      wrong: [[Math.floor(k / 10), L(lang, 'Itu banyak ribuan. Yang ditanya banyak ratusan.', 'That is the number of thousands. We want hundreds.')], [k * 10, L(lang, 'Itu banyak puluhan.', 'That is the number of tens.')]],
      steps: [L(lang, `${G(lang, k * 100)} ${dv(lang)} 100 = ${k}.`, `${G(lang, k * 100)} ${dv(lang)} 100 = ${k}.`)],
      meta: { kind, k },
    });
  }
  const t = ri(rnd, 1, 9);
  const h = ri(rnd, 0, 9);
  return num({
    q: L(lang, `${t} ribuan dan ${h} ratusan = …`, `${t} thousands and ${h} hundreds = …`),
    ans: t * 1000 + h * 100,
    wrong: [[t * 100 + h * 10, L(lang, '1 ribuan = 1.000 dan 1 ratusan = 100.', '1 thousand = 1,000 and 1 hundred = 100.')], [t + h, L(lang, 'Gunakan nilai tempatnya.', 'Use the place values.')]],
    steps: [`${G(lang, t * 1000)} + ${h * 100} = ${G(lang, t * 1000 + h * 100)}.`],
    meta: { kind, t, h },
  });
};
regroup.solve = (m) => (m.kind === 'h2n' ? m.k * 100 : m.kind === 'n2h' ? m.k : m.t * 1000 + m.h * 100);

const cmp4 = (rnd, lang) => {
  const a = ri(rnd, 1000, 9999);
  const s = String(a).split('');
  let b;
  const k = rnd();
  if (k < 0.1) b = a;
  else if (k < 0.6) {
    const i = ri(rnd, 1, 2);
    const x = s.slice();
    [x[i], x[i + 1]] = [x[i + 1], x[i]];
    b = Number(x.join(''));
    if (b === a) b = a + 10 <= 9999 ? a + 10 : a - 10;
  } else b = Math.floor(a / 1000) * 1000 + ri(rnd, 0, 999);
  if (b === a && k >= 0.1) b = a + 1 <= 9999 ? a + 1 : a - 1;
  const sign = a > b ? '>' : a < b ? '<' : '=';
  return mc({
    q: `${G(lang, a)} … ${G(lang, b)}`,
    ok: sign,
    bad: ['<', '>', '='].filter((x) => x !== sign).map((x) => [x, sign === '=' ? L(lang, 'Kedua bilangan sama.', 'The numbers are the same.') : x === '=' ? L(lang, 'Ada angka yang berbeda.', 'Some digits differ.') : L(lang, `Bandingkan dari ribuan, lalu ratusan, dan seterusnya. ${G(lang, Math.max(a, b))} lebih besar.`, `Compare from the thousands, then hundreds, and so on. ${G(lang, Math.max(a, b))} is greater.`)]),
    fixed: true,
    steps: [L(lang, 'Bandingkan angka dari tempat terbesar.', 'Compare digits from the biggest place.'), `${G(lang, a)} ${sign} ${G(lang, b)}.`],
    meta: { a, b },
  });
};
cmp4.solve = (m) => (m.a > m.b ? '>' : m.a < m.b ? '<' : '=');

const round4 = (rnd, lang) => {
  const to = pick(rnd, [10, 100, 1000]);
  let n;
  do n = ri(rnd, 1000, 9899);
  while (n % to === 0);
  const ans = Math.round(n / to) * to;
  const down = Math.floor(n / to) * to;
  const up = down + to;
  const nm = { 10: ['puluhan', 'ten'], 100: ['ratusan', 'hundred'], 1000: ['ribuan', 'thousand'] }[to];
  return num({
    q: L(lang, `${G(lang, n)} dibulatkan ke ${nm[0]} terdekat menjadi …`, `${G(lang, n)} rounded to the nearest ${nm[1]} is …`),
    ans,
    wrong: [[ans === up ? down : up, ans === up ? L(lang, `Angka di kanannya ${n % to >= to / 2 ? '5 atau lebih' : 'kurang dari 5'}, jadi dibulatkan ke atas.`, `The next digit is 5 or more, so round up.`) : L(lang, 'Angka di kanannya kurang dari 5, jadi dibulatkan ke bawah.', 'The next digit is less than 5, so round down.')], [to > 10 ? Math.round(n / (to / 10)) * (to / 10) : null, L(lang, `Itu pembulatan ke tempat yang lebih kecil. Bulatkan ke ${nm[0]}.`, `That rounds to a smaller place. Round to the nearest ${nm[1]}.`)]],
    steps: [L(lang, `${G(lang, n)} ada di antara ${G(lang, down)} dan ${G(lang, up)}.`, `${G(lang, n)} is between ${G(lang, down)} and ${G(lang, up)}.`), L(lang, `Lebih dekat ke ${G(lang, ans)}.`, `It is closer to ${G(lang, ans)}.`)],
    meta: { n, to },
  });
};
round4.solve = (m) => {
  const r = m.n % m.to;
  return r * 2 >= m.to ? m.n - r + m.to : m.n - r;
};

const mul21 = (rnd, lang) => {
  const kind = pick(rnd, ['mul', 'mul', 'div', 'storyM', 'storyD']);
  const b = ri(rnd, 2, 9);
  if (kind === 'mul' || kind === 'storyM') {
    const a = ri(rnd, 12, 49);
    const p = a * b;
    const t = Math.floor(a / 10) * 10;
    const box2 = pick(rnd, [['kotak', 'box', 'pensil', 'pencils'], ['pak', 'pack', 'buku tulis', 'exercise books'], ['keranjang', 'basket', 'telur', 'eggs'], ['rak', 'shelf', 'buku', 'books']]);
    return num({
      q: kind === 'mul' ? `${a} × ${b} = …` : L(lang, `Satu ${box2[0]} berisi ${a} ${box2[2]}. ${b} ${box2[0]} berisi … ${box2[2]}.`, `One ${box2[1]} holds ${a} ${box2[3]}. ${b} ${box2[1] === 'box' ? 'boxes' : box2[1] === 'shelf' ? 'shelves' : box2[1] + 's'} hold … ${box2[3]}.`),
      ans: p,
      wrong: [[t * b + (a % 10), L(lang, `Satuannya juga dikali: ${a % 10} × ${b}.`, `Multiply the ones too: ${a % 10} × ${b}.`)], [Math.floor(a / 10) * b * 10 + ((a % 10) * b) % 10, L(lang, 'Ada simpanan dari satuan yang lupa ditambahkan.', 'A carry from the ones was forgotten.')], [a + b, L(lang, 'Itu penjumlahan.', 'That is adding.')]],
      steps: [`${a} × ${b} = ${t} × ${b} + ${a % 10} × ${b}`, `= ${t * b} + ${(a % 10) * b} = ${p}.`],
      meta: { kind, a, b },
    });
  }
  const qn = ri(rnd, 11, 30);
  const a = qn * b;
  return num({
    q: kind === 'div' ? `${a} ${dv(lang)} ${b} = …` : L(lang, `${a} kelereng dibagi sama rata untuk ${b} anak. Setiap anak mendapat …`, `${a} marbles are shared equally among ${b} children. Each child gets …`),
    ans: qn,
    wrong: [[a - b, L(lang, 'Itu pengurangan, bukan pembagian.', 'That is subtracting, not dividing.')], [qn + 1, L(lang, `Periksa: ${b} × ${qn + 1} = ${b * (qn + 1)}.`, `Check: ${b} × ${qn + 1} = ${b * (qn + 1)}.`)]],
    steps: [L(lang, `Cari bilangan yang dikali ${b} menjadi ${a}.`, `Find the number that times ${b} makes ${a}.`), `${b} × ${qn} = ${a}, ${L(lang, 'jadi', 'so')} ${a} ${dv(lang)} ${b} = ${qn}.`],
    meta: { kind, a, b },
  });
};
mul21.solve = (m) => (m.kind === 'mul' || m.kind === 'storyM' ? m.a * m.b : m.a / m.b);

// ---------- Bab 2: Pecahan ----------
const strip = (p, n, filled, y = 140, c = 'acc', w = 280, x0 = 60) => Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'rect', x: x0 + (w / n) * (i + 0.5), y, w: w / n, h: 50, r: 0, fill: filled.includes(i) ? `${c}-soft` : 'paper', stroke: 'ink', sw: 2 }));
const fracFig = (rnd, lang) => {
  const n = ri(rnd, 2, 10);
  const k = ri(rnd, 1, n - 1);
  const filled = sample(rnd, Array.from({ length: n }, (_, i) => i), k);
  return mc({
    q: L(lang, 'Pecahan bagian berwarna adalah …', 'What fraction is coloured?'),
    fig: strip('f', n, filled, 140, pick(rnd, ['acc', 'pos', 'ok'])),
    ok: `${k}/${n}`,
    bad: [[`${n}/${k}`, L(lang, 'Penyebut (bawah) adalah banyak semua bagian.', 'The denominator (bottom) is the number of all parts.')], [`${n - k}/${n}`, L(lang, 'Itu bagian yang tidak berwarna.', 'That is the uncoloured part.')], [`${k}/${n - k}`, L(lang, 'Penyebut adalah semua bagian, bukan bagian yang tidak berwarna.', 'The denominator is all the parts, not just the uncoloured ones.')]],
    steps: [L(lang, `Ada ${n} bagian sama besar, ${k} berwarna.`, `There are ${n} equal parts, ${k} coloured.`), `${k}/${n}.`],
    meta: { n, k },
  });
};
fracFig.solve = (m) => `${m.k}/${m.n}`;

const fracParts = (rnd, lang) => {
  const kind = pick(rnd, ['den', 'num', 'story', 'whole']);
  const n = ri(rnd, 3, 12);
  const k = ri(rnd, 1, n - 1);
  if (kind === 'story') {
    const t = pick(rnd, [['kue', 'cakes', 'rasa cokelat', 'are chocolate'], ['kelereng', 'marbles', 'berwarna merah', 'are red'], ['siswa', 'pupils', 'memakai topi', 'wear hats'], ['bunga', 'flowers', 'berwarna kuning', 'are yellow']]);
    return mc({
      q: L(lang, `Ada ${n} ${t[0]}, ${k} ${t[0]} ${t[2]}. Pecahan ${t[0]} yang ${t[2]} adalah …`, `There are ${n} ${t[1]} and ${k} ${t[3]}. What fraction ${t[3]}?`),
      ok: `${k}/${n}`,
      bad: [[`${n - k}/${n}`, L(lang, 'Itu bagian yang lain.', 'That is the other part.')], [`${n}/${k}`, L(lang, 'Semua benda ditulis di bawah (penyebut).', 'All the things go on the bottom (denominator).')], [`${k}/${n - k}`, L(lang, 'Penyebutnya semua benda, bukan sisanya.', 'The denominator is all of them, not the rest.')]],
      steps: [L(lang, `Semua: ${n} (penyebut). Yang dimaksud: ${k} (pembilang).`, `All: ${n} (denominator). The ones we want: ${k} (numerator).`), `${k}/${n}.`],
      meta: { kind, n, k },
    });
  }
  if (kind === 'whole')
    return num({
      q: L(lang, `Pizza dibagi ${n} potong sama besar. ${n} potong dimakan semua. Bagian yang dimakan = … utuh.`, `A pizza is cut into ${n} equal slices and all ${n} are eaten. The part eaten = … whole.`),
      ans: 1,
      wrong: [[n, L(lang, `${n}/${n} berarti semua potong, yaitu 1 utuh.`, `${n}/${n} means every slice, which is 1 whole.`)]],
      steps: [`${n}/${n} = 1.`],
      meta: { kind, n },
    });
  const den = kind === 'den';
  return num({
    q: L(lang, `Pada pecahan ${k}/${n}, ${den ? 'penyebut' : 'pembilang'}nya adalah …`, `In the fraction ${k}/${n}, the ${den ? 'denominator' : 'numerator'} is …`),
    ans: den ? n : k,
    wrong: [[den ? k : n, den ? L(lang, 'Penyebut adalah angka bawah.', 'The denominator is the bottom number.') : L(lang, 'Pembilang adalah angka atas.', 'The numerator is the top number.')]],
    steps: [L(lang, `${k} di atas (pembilang), ${n} di bawah (penyebut).`, `${k} on top (numerator), ${n} at the bottom (denominator).`)],
    meta: { kind, n, k },
  });
};
fracParts.solve = (m) => (m.kind === 'story' ? `${m.k}/${m.n}` : m.kind === 'whole' ? 1 : m.kind === 'den' ? m.n : m.k);

const equivMissing = (rnd, lang) => {
  const kind = pick(rnd, ['up', 'up', 'down']);
  let a;
  let b;
  do {
    b = ri(rnd, 2, 6);
    a = ri(rnd, 1, b - 1);
  } while (gcd(a, b) !== 1);
  const k = ri(rnd, 2, 5);
  const hideTop = rnd() < 0.5;
  if (kind === 'up') {
    const q = hideTop ? `${a}/${b} = …/${b * k}` : `${a}/${b} = ${a * k}/…`;
    const ans = hideTop ? a * k : b * k;
    return num({
      q,
      ans,
      wrong: [[hideTop ? a + (b * k - b) : b + (a * k - a), L(lang, 'Pecahan senilai dibuat dengan mengali, bukan menambah.', 'Equivalent fractions come from multiplying, not adding.')], [hideTop ? a : b, L(lang, `Pembilang dan penyebut sama-sama dikali ${k}.`, `Both top and bottom are multiplied by ${k}.`)]],
      steps: [L(lang, `${hideTop ? b : a} × ${k} = ${hideTop ? b * k : a * k}, jadi kalikan juga dengan ${k}.`, `${hideTop ? b : a} × ${k} = ${hideTop ? b * k : a * k}, so multiply by ${k} too.`), `${a} × ${k} = ${a * k}, ${b} × ${k} = ${b * k}.`],
      meta: { kind, a, b, k, hideTop },
    });
  }
  const q = hideTop ? `${a * k}/${b * k} = …/${b}` : `${a * k}/${b * k} = ${a}/…`;
  return num({
    q,
    ans: hideTop ? a : b,
    wrong: [[hideTop ? a * k - (b * k - b) : null, L(lang, 'Bagi, jangan kurangi.', 'Divide, do not subtract.')], [hideTop ? a * k : b * k, L(lang, `Pembilang dan penyebut sama-sama dibagi ${k}.`, `Divide both top and bottom by ${k}.`)]],
    steps: [L(lang, `${hideTop ? b * k : a * k} ${dv(lang)} ${k} = ${hideTop ? b : a}, jadi bagi juga dengan ${k}.`, `${hideTop ? b * k : a * k} ${dv(lang)} ${k} = ${hideTop ? b : a}, so divide by ${k} too.`), `${a * k}/${b * k} = ${a}/${b}.`],
    meta: { kind, a, b, k, hideTop },
  });
};
equivMissing.solve = (m) => {
  if (m.kind === 'up') return m.hideTop ? (m.a * (m.b * m.k)) / m.b : (m.b * (m.a * m.k)) / m.a;
  return m.hideTop ? (m.a * m.k * m.b) / (m.b * m.k) : (m.b * m.k * m.a) / (m.a * m.k);
};

const equivPick = (rnd, lang) => {
  let a;
  let b;
  do {
    b = ri(rnd, 2, 6);
    a = ri(rnd, 1, b - 1);
  } while (gcd(a, b) !== 1);
  const k = ri(rnd, 2, 4);
  return mc({
    q: L(lang, `Pecahan yang senilai dengan ${a}/${b} adalah …`, `Which fraction is equivalent to ${a}/${b}?`),
    ok: `${a * k}/${b * k}`,
    bad: [[`${a * k}/${b}`, L(lang, 'Hanya pembilang yang dikali. Penyebut juga harus dikali.', 'Only the top was multiplied. The bottom must be too.')], [`${a + k}/${b + k}`, L(lang, 'Menambah angka yang sama tidak membuat pecahan senilai.', 'Adding the same number does not make an equivalent fraction.')], [`${a}/${b * k}`, L(lang, 'Hanya penyebut yang dikali. Pembilang juga harus dikali.', 'Only the bottom was multiplied. The top must be too.')]],
    steps: [L(lang, `Kalikan pembilang dan penyebut dengan ${k}.`, `Multiply top and bottom by ${k}.`), `${a}/${b} = ${a * k}/${b * k}.`],
    meta: { a, b, k },
  });
};
equivPick.solve = (m) => `${m.a * m.k}/${m.b * m.k}`;

const fracCmp = (rnd, lang) => {
  const kind = pick(rnd, ['sameD', 'sameN', 'equiv']);
  let a;
  let b;
  let c;
  let d;
  if (kind === 'sameD') {
    b = d = ri(rnd, 3, 12);
    [a, c] = sample(rnd, Array.from({ length: b - 1 }, (_, i) => i + 1), 2);
  } else if (kind === 'sameN') {
    a = c = ri(rnd, 1, 3);
    [b, d] = sample(rnd, [2, 3, 4, 5, 6, 8, 10].filter((x) => x > a), 2);
  } else {
    b = ri(rnd, 2, 5);
    a = ri(rnd, 1, b - 1);
    const k = ri(rnd, 2, 3);
    [c, d] = [a * k, b * k];
    if (rnd() < 0.5) [a, b, c, d] = [c, d, a, b];
  }
  const v = a * d - c * b;
  const sign = v > 0 ? '>' : v < 0 ? '<' : '=';
  return mc({
    q: `${a}/${b} … ${c}/${d}`,
    ok: sign,
    bad: ['<', '>', '='].filter((x) => x !== sign).map((x) => [x, kind === 'sameD' ? L(lang, 'Penyebutnya sama, jadi bandingkan pembilangnya.', 'Same denominators, so compare the numerators.') : kind === 'sameN' ? L(lang, 'Pembilangnya sama. Penyebut lebih besar berarti potongannya lebih kecil.', 'Same numerators. A bigger denominator means smaller pieces.') : L(lang, 'Sederhanakan atau samakan penyebutnya dulu. Keduanya senilai.', 'Simplify or make the denominators the same first. They are equivalent.')]),
    fixed: true,
    steps: [kind === 'sameD' ? L(lang, `Penyebut sama: bandingkan ${a} dan ${c}.`, `Same denominators: compare ${a} and ${c}.`) : kind === 'sameN' ? L(lang, `Pembilang sama: 1/${Math.min(b, d)} lebih besar dari 1/${Math.max(b, d)}.`, `Same numerators: 1/${Math.min(b, d)} is bigger than 1/${Math.max(b, d)}.`) : L(lang, 'Keduanya menunjukkan bagian yang sama.', 'Both show the same amount.'), `${a}/${b} ${sign} ${c}/${d}.`],
    meta: { a, b, c, d },
  });
};
fracCmp.solve = (m) => (m.a * m.d > m.c * m.b ? '>' : m.a * m.d < m.c * m.b ? '<' : '=');

const fracWho = (rnd, lang) => {
  const [p, q] = names(rnd, 2);
  const [b, d] = sample(rnd, [2, 3, 4, 5, 6, 8], 2);
  const food = pick(rnd, [['pizza', 'pizza'], ['kue bolu', 'sponge cake'], ['martabak', 'martabak'], ['roti', 'loaf of bread']]);
  const ans = b < d ? p : q;
  return mc({
    q: L(lang, `${p} makan 1/${b} ${food[0]}, ${q} makan 1/${d} ${food[0]} yang sama besar. Siapa makan lebih banyak?`, `${p} eats 1/${b} of a ${food[1]} and ${q} eats 1/${d} of a same-size ${food[1]}. Who eats more?`),
    ok: ans,
    bad: [[ans === p ? q : p, L(lang, 'Penyebut lebih besar berarti potongannya lebih kecil.', 'A bigger denominator means a smaller piece.')], [L(lang, 'sama banyak', 'the same'), L(lang, 'Penyebutnya berbeda, jadi potongannya tidak sama.', 'The denominators differ, so the pieces differ.')]],
    fixed: true,
    steps: [L(lang, `Dibagi ${Math.min(b, d)} potongannya lebih besar daripada dibagi ${Math.max(b, d)}.`, `Cutting into ${Math.min(b, d)} gives bigger pieces than cutting into ${Math.max(b, d)}.`), L(lang, `Jadi ${ans}.`, `So ${ans}.`)],
    meta: { p, q, b, d },
  });
};
fracWho.solve = (m) => (1 / m.b > 1 / m.d ? m.p : m.q);

// ---------- Bab 3: Pola ----------
const SHAPE_PAT = [
  // [nama id, nama en, a (suku pertama), beda, satuan id, satuan en, objek id, objek en]
  ['segitiga bersambung dari batang korek', 'triangles in a row made of matchsticks', 3, 2, 'batang', 'matchsticks'],
  ['persegi bersambung dari batang korek', 'squares in a row made of matchsticks', 4, 3, 'batang', 'matchsticks'],
  ['meja yang disambung (setiap meja persegi)', 'square tables joined in a row', 4, 2, 'kursi', 'chairs'],
  ['segi lima bersambung dari batang korek', 'pentagons in a row made of matchsticks', 5, 4, 'batang', 'matchsticks'],
];
const growPattern = (rnd, lang) => {
  const i = ri(rnd, 0, SHAPE_PAT.length - 1);
  const [ni, ne, a, d, ui, ue] = SHAPE_PAT[i];
  const n = ri(rnd, 4, 8);
  const ans = a + (n - 1) * d;
  const shown = [1, 2, 3].map((k) => a + (k - 1) * d);
  return num({
    q: L(lang, `Pola ${ni}: 1 → ${shown[0]} ${ui}, 2 → ${shown[1]} ${ui}, 3 → ${shown[2]} ${ui}. Untuk ${n} butuh … ${ui}.`, `Pattern of ${ne}: 1 → ${shown[0]} ${ue}, 2 → ${shown[1]} ${ue}, 3 → ${shown[2]} ${ue}. For ${n} you need … ${ue}.`),
    ans,
    wrong: [[a * n, L(lang, `Tidak setiap bangun butuh ${a} ${ui} baru, karena ada yang dipakai bersama. Setiap langkah bertambah ${d}.`, `Not every new shape needs ${a} new ${ue}; some are shared. Each step adds ${d}.`)], [ans + d, L(lang, 'Hitung langkahnya dengan teliti.', 'Count the steps carefully.')], [d * n, L(lang, `Mulainya dari ${a}, bukan dari ${d}.`, `It starts at ${a}, not at ${d}.`)]],
    steps: [L(lang, `Setiap langkah bertambah ${d}.`, `Each step adds ${d}.`), `${shown.join(', ')}, … → ${ans}.`],
    meta: { i, n },
  });
};
growPattern.solve = (m) => {
  const [, , a, d] = SHAPE_PAT[m.i];
  return a + d * (m.n - 1);
};

const dotsFig = (counts) => {
  const els = [];
  counts.forEach((c, j) => {
    const cx = 60 + j * 95;
    els.push(txt(`l${j}`, String(j + 1), cx, 255, { size: 15 }));
    for (let i = 0; i < c; i++) els.push({ id: `d${j}_${i}`, t: 'rect', x: cx - 12 + (i % 2) * 24, y: 225 - Math.floor(i / 2) * 22, w: 18, h: 18, r: 3, fill: 'pos-soft', stroke: 'pos', sw: 2 });
  });
  return els;
};
const picSeq = (rnd, lang) => {
  const a = ri(rnd, 1, 3);
  const d = pick(rnd, [1, 2]);
  const counts = [0, 1, 2, 3].map((k) => a + k * d);
  if (counts[3] > 18) return picSeq(rnd, lang);
  const n = pick(rnd, [5, 6, 7, 10]);
  const ans = a + (n - 1) * d;
  return num({
    q: L(lang, `Gambar ke-1 sampai ke-4 berisi ${counts.join(', ')} kotak. Gambar ke-${n} berisi … kotak.`, `Pictures 1 to 4 have ${counts.join(', ')} squares. Picture ${n} has … squares.`),
    fig: dotsFig(counts),
    ans,
    wrong: [[counts[3] + d, L(lang, `Itu gambar ke-5. Lanjutkan sampai gambar ke-${n}.`, `That is picture 5. Keep going to picture ${n}.`)], [n * d, L(lang, `Mulai dari ${a}, bukan dari ${d}.`, `Start from ${a}, not ${d}.`)]],
    steps: [L(lang, `Setiap gambar bertambah ${d}.`, `Each picture adds ${d}.`), L(lang, `Gambar ke-${n}: ${a} + ${n - 1} × ${d} = ${ans}.`, `Picture ${n}: ${a} + ${n - 1} × ${d} = ${ans}.`)],
    meta: { a, d, n },
  });
};
picSeq.solve = (m) => {
  let x = m.a;
  for (let k = 1; k < m.n; k++) x += m.d;
  return x;
};

const numPattern = (rnd, lang) => {
  const kind = pick(rnd, ['add', 'sub', 'mul']);
  let xs;
  let rule;
  if (kind === 'add') {
    const d = pick(rnd, [3, 4, 6, 7, 8, 9, 11, 12, 15, 25]);
    const s = ri(rnd, 1, 30);
    xs = [0, 1, 2, 3, 4].map((k) => s + k * d);
    rule = [`tambah ${d}`, `add ${d}`];
  } else if (kind === 'sub') {
    const d = pick(rnd, [3, 4, 5, 6, 7, 8, 9, 10, 25]);
    const s = d * ri(rnd, 6, 12) + ri(rnd, 0, d - 1);
    xs = [0, 1, 2, 3, 4].map((k) => s - k * d);
    rule = [`kurang ${d}`, `take away ${d}`];
  } else {
    const r = pick(rnd, [2, 3]);
    const s = r === 2 ? ri(rnd, 1, 5) : ri(rnd, 1, 2);
    xs = [0, 1, 2, 3, 4].map((k) => s * r ** k);
    rule = [`kali ${r}`, `times ${r}`];
  }
  const ans = xs[4];
  return num({
    q: L(lang, `${xs.slice(0, 4).join(', ')}, … Bilangan berikutnya adalah …`, `${xs.slice(0, 4).join(', ')}, … The next number is …`),
    ans,
    wrong: [[kind === 'mul' ? xs[3] + (xs[3] - xs[2]) : null, L(lang, 'Selisihnya tidak tetap. Coba lihat apakah dikali.', 'The gaps are not the same. Check whether it multiplies.')], [kind === 'sub' ? xs[3] + (xs[2] - xs[3]) : null, L(lang, 'Polanya turun, bukan naik.', 'The pattern goes down, not up.')], [kind === 'add' ? ans + 1 : null, L(lang, 'Hitung lagi selisihnya.', 'Check the gap again.')]],
    steps: [L(lang, `Aturannya: ${rule[0]}.`, `Rule: ${rule[1]}.`), `${xs[3]} → ${ans}.`],
    meta: { xs: xs.slice(0, 4), kind },
  });
};
numPattern.solve = (m) => {
  const [a, b, c, d] = m.xs;
  if (c - b === b - a && d - c === c - b) return d + (d - c);
  return d * (d / c);
};

const oddEven = (rnd, lang) => {
  const kind = pick(rnd, ['pickEven', 'pickOdd', 'next']);
  if (kind === 'next') {
    const odd = rnd() < 0.5;
    const n = ri(rnd, 21, 199);
    const ans = n + 1 + ((n + 1) % 2 === (odd ? 1 : 0) ? 0 : 1);
    return num({
      q: L(lang, `Bilangan ${odd ? 'ganjil' : 'genap'} sesudah ${n} adalah …`, `The ${odd ? 'odd' : 'even'} number after ${n} is …`),
      ans,
      wrong: [[n + 1 !== ans ? n + 1 : null, L(lang, `${n + 1} adalah bilangan ${odd ? 'genap' : 'ganjil'}.`, `${n + 1} is ${odd ? 'even' : 'odd'}.`)]],
      steps: [L(lang, `${odd ? 'Ganjil' : 'Genap'}: satuannya ${odd ? '1, 3, 5, 7, 9' : '0, 2, 4, 6, 8'}.`, `${odd ? 'Odd' : 'Even'}: ends in ${odd ? '1, 3, 5, 7, 9' : '0, 2, 4, 6, 8'}.`), `= ${ans}.`],
      meta: { kind, n, odd },
    });
  }
  const even = kind === 'pickEven';
  const okN = ri(rnd, 50, 499) * 2 + (even ? 0 : 1);
  const bad = sample(rnd, Array.from({ length: 400 }, (_, i) => 101 + i * 2 + (even ? 0 : 1)), 2);
  return mc({
    q: L(lang, `Bilangan ${even ? 'genap' : 'ganjil'} adalah …`, `Which number is ${even ? 'even' : 'odd'}?`),
    ok: String(okN),
    bad: bad.map((x) => [String(x), L(lang, `Satuannya ${x % 10}, jadi ${x} bilangan ${even ? 'ganjil' : 'genap'}.`, `It ends in ${x % 10}, so ${x} is ${even ? 'odd' : 'even'}.`)]),
    steps: [L(lang, 'Lihat angka satuannya.', 'Look at the ones digit.'), L(lang, `${okN} berakhir ${okN % 10}: ${even ? 'genap' : 'ganjil'}.`, `${okN} ends in ${okN % 10}: ${even ? 'even' : 'odd'}.`)],
    meta: { kind, opts: [okN, ...bad], even },
  });
};
oddEven.solve = (m) => {
  if (m.kind === 'next') {
    let x = m.n + 1;
    while (x % 2 !== (m.odd ? 1 : 0)) x++;
    return x;
  }
  return String(m.opts.find((x) => (x % 2 === 0) === m.even));
};

// ---------- Bab 4: Luas dan volume ----------
const CS = 28;
function cells(p, cols, rows, x0, y0, skip = []) {
  const els = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if (!skip.includes(`${c},${r}`)) els.push(box(`${p}${r}_${c}`, x0 + CS * c + CS / 2, y0 + CS * r + CS / 2, CS, CS, { r: 0, fill: 'pos-soft', stroke: 'pos', sw: 1.5 }));
  return els;
}
const areaCells = (rnd, lang) => {
  const cols = ri(rnd, 3, 9);
  const rows = ri(rnd, 2, 6);
  const L_ = rnd() < 0.4 && cols > 3 && rows > 2;
  const cw = L_ ? ri(rnd, 1, cols - 2) : 0;
  const ch = L_ ? ri(rnd, 1, rows - 1) : 0;
  const skip = [];
  for (let c = cols - cw; c < cols; c++) for (let r = 0; r < ch; r++) skip.push(`${c},${r}`);
  const area = cols * rows - cw * ch;
  return num({
    q: L(lang, `Berapa persegi satuan luas bangun ini?`, 'How many unit squares is the area of this shape?'),
    fig: cells('c', cols, rows, 200 - (cols * CS) / 2, 145 - (rows * CS) / 2, skip),
    ans: area,
    wrong: [[2 * (cols + rows), L(lang, 'Itu keliling (tepi). Luas adalah banyak persegi di dalam.', 'That is the perimeter (edge). Area is the squares inside.')], [L_ ? cols * rows : cols + rows, L_ ? L(lang, 'Ada bagian yang kosong. Jangan dihitung.', 'Part is missing. Do not count it.') : L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')]],
    steps: L_ ? [L(lang, `Persegi panjang penuh: ${rows} × ${cols} = ${rows * cols}.`, `Full rectangle: ${rows} × ${cols} = ${rows * cols}.`), L(lang, `Dikurangi bagian kosong ${ch} × ${cw} = ${ch * cw}: ${area}.`, `Take away the missing ${ch} × ${cw} = ${ch * cw}: ${area}.`)] : [L(lang, `${rows} baris, setiap baris ${cols}.`, `${rows} rows of ${cols}.`), `${rows} × ${cols} = ${area}.`],
    meta: { cols, rows, cw, ch },
  });
};
areaCells.solve = (m) => m.cols * m.rows - m.cw * m.ch;

const areaStory = (rnd, lang) => {
  const kind = pick(rnd, ['tiles', 'square']);
  if (kind === 'square') {
    const s = ri(rnd, 3, 10);
    return num({
      q: L(lang, `Persegi berukuran ${s} petak × ${s} petak. Luasnya … persegi satuan.`, `A square is ${s} squares by ${s} squares. Its area is … unit squares.`),
      ans: s * s,
      wrong: [[4 * s, L(lang, 'Itu keliling. Luas = sisi × sisi.', 'That is the perimeter. Area = side × side.')], [2 * s, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')]],
      steps: [`${s} × ${s} = ${s * s}.`],
      meta: { kind, a: s, b: s },
    });
  }
  const a = ri(rnd, 4, 12);
  const b = ri(rnd, 2, 9);
  return num({
    q: L(lang, `Lantai ditutup ubin: ${a} ubin per baris, sebanyak ${b} baris. Banyak ubin …`, `A floor is covered with tiles: ${a} tiles in each row, ${b} rows. How many tiles?`),
    ans: a * b,
    wrong: [[a + b, L(lang, 'Kalikan banyak baris dengan isi setiap baris.', 'Multiply the rows by the tiles in each row.')], [2 * (a + b), L(lang, 'Itu hanya ubin di tepi (keliling).', 'That counts only round the edge.')]],
    steps: [`${b} × ${a} = ${a * b}.`],
    meta: { kind, a, b },
  });
};
areaStory.solve = (m) => m.a * m.b;

const volCubes = (rnd, lang) => {
  const a = ri(rnd, 2, 4);
  const b = ri(rnd, 1, 3);
  const h = ri(rnd, 1, 3);
  const CU = 26;
  const w = a * CU + b * CU * 0.55;
  const ht = h * CU + b * CU * 0.42;
  return num({
    q: L(lang, 'Berapa kubus satuan yang menyusun balok ini?', 'How many unit cubes make this cuboid?'),
    fig: blockOf('k', a, b, h, 200 - w / 2, 150 + ht / 2, pick(rnd, ['acc', 'pos', 'ok']), h, CU),
    ans: a * b * h,
    wrong: [[a * b * h - (a - 1) * (b - 1) * (h - 1), L(lang, 'Ada kubus tersembunyi di belakang. Hitung per lapisan.', 'Some cubes are hidden at the back. Count layer by layer.')], [a + b + h, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')], [a * b, L(lang, `Itu satu lapis. Ada ${h} lapis.`, `That is one layer. There are ${h} layers.`)]],
    steps: [L(lang, `Satu lapis: ${a} × ${b} = ${a * b}.`, `One layer: ${a} × ${b} = ${a * b}.`), L(lang, `${h} lapis: ${a * b} × ${h} = ${a * b * h}.`, `${h} ${h > 1 ? 'layers' : 'layer'}: ${a * b} × ${h} = ${a * b * h}.`)],
    meta: { a, b, h },
  });
};
volCubes.solve = (m) => m.a * m.b * m.h;

const volStory = (rnd, lang) => {
  const kind = pick(rnd, ['layers', 'cube', 'box']);
  if (kind === 'cube') {
    const s = ri(rnd, 2, 5);
    return num({
      q: L(lang, `Kubus besar tersusun ${s} × ${s} × ${s} kubus kecil. Banyak kubus kecil …`, `A big cube is made of ${s} × ${s} × ${s} small cubes. How many small cubes?`),
      ans: s ** 3,
      wrong: [[s * s, L(lang, `Itu satu lapis. Ada ${s} lapis.`, `That is one layer. There are ${s} layers.`)], [3 * s, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')]],
      steps: [`${s} × ${s} = ${s * s}.`, `${s * s} × ${s} = ${s ** 3}.`],
      meta: { kind, a: s, b: s, h: s },
    });
  }
  const a = ri(rnd, 2, 7);
  const b = ri(rnd, 2, 5);
  const h = ri(rnd, 2, 4);
  if (kind === 'box')
    return num({
      q: L(lang, `Kardus diisi kotak susu: ${a} kotak memanjang, ${b} ke belakang, ${h} lapis. Banyak kotak susu …`, `A carton is packed with milk boxes: ${a} along, ${b} back, ${h} layers. How many milk boxes?`),
      ans: a * b * h,
      wrong: [[a * b, L(lang, `Itu satu lapis. Ada ${h} lapis.`, `That is one layer. There are ${h} layers.`)], [a + b + h, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')]],
      steps: [`${a} × ${b} = ${a * b}.`, `${a * b} × ${h} = ${a * b * h}.`],
      meta: { kind, a, b, h },
    });
  return num({
    q: L(lang, `Satu lapis kotak berisi ${a} × ${b} kubus. Ada ${h} lapis. Volumenya … kubus satuan.`, `One layer of a box holds ${a} × ${b} cubes. There are ${h} layers. The volume is … unit cubes.`),
    ans: a * b * h,
    wrong: [[a * b, L(lang, `Itu satu lapis. Kalikan dengan ${h}.`, `That is one layer. Multiply by ${h}.`)], [a * b + h, L(lang, 'Banyak lapis dikalikan, bukan ditambah.', 'Multiply by the layers, do not add them.')]],
    steps: [`${a} × ${b} = ${a * b}.`, `${a * b} × ${h} = ${a * b * h}.`],
    meta: { kind, a, b, h },
  });
};
volStory.solve = (m) => m.a * m.b * m.h;

// ---------- Bab 5: Segi empat dan segitiga ----------
const QUADS = {
  persegi: [['persegi', 'square'], [[-70, -70], [70, -70], [70, 70], [-70, 70]], 'Semua sisi sama dan semua sudut siku-siku.', 'All sides equal and all angles right angles.'],
  ppanjang: [['persegi panjang', 'rectangle'], [[-110, -55], [110, -55], [110, 55], [-110, 55]], 'Sisi berhadapan sama panjang, semua sudut siku-siku.', 'Opposite sides equal, all angles right angles.'],
  jajar: [['jajargenjang', 'parallelogram'], [[-60, -55], [115, -55], [60, 55], [-115, 55]], 'Dua pasang sisi sejajar, tetapi sudutnya tidak siku-siku.', 'Two pairs of parallel sides, but no right angles.'],
  trapesium: [['trapesium', 'trapezium'], [[-55, -55], [55, -55], [115, 55], [-115, 55]], 'Hanya satu pasang sisi sejajar.', 'Only one pair of parallel sides.'],
  belah: [['belah ketupat', 'rhombus'], [[0, -85], [60, 0], [0, 85], [-60, 0]], 'Empat sisi sama panjang, sudutnya tidak siku-siku.', 'Four equal sides, but no right angles.'],
  layang: [['layang-layang', 'kite'], [[0, -80], [55, -30], [0, 95], [-55, -30]], 'Dua pasang sisi berdekatan sama panjang.', 'Two pairs of equal sides next to each other.'],
};
const quadName = (rnd, lang) => {
  const key = pick(rnd, Object.keys(QUADS));
  const [nm, pts, wi, we] = QUADS[key];
  const s = 0.85 + rnd() * 0.25;
  const flip = rnd() < 0.5 && key !== 'persegi' && key !== 'ppanjang' ? -1 : 1;
  const c = pick(rnd, ['pos', 'acc', 'ok', 'neg']);
  const others = sample(rnd, Object.keys(QUADS).filter((k) => k !== key), 3);
  return mc({
    q: L(lang, 'Bangun ini bernama …', 'This shape is called a …'),
    fig: [{ id: 'q', t: 'poly', x: 0, y: 0, pts: pts.map(([x, y]) => [200 + x * s * flip, 145 + y * s]), fill: `${c}-soft`, stroke: c, sw: 3 }],
    ok: L(lang, ...nm),
    bad: others.map((k) => [L(lang, ...QUADS[k][0]), L(lang, `${cap(QUADS[k][0][0])}: ${QUADS[k][2].toLowerCase()}`, `${cap(QUADS[k][0][1])}: ${QUADS[k][3].toLowerCase()}`)]),
    steps: [L(lang, wi, we), L(lang, `Itu ${nm[0]}.`, `It is a ${nm[1]}.`)],
    meta: { key },
  });
};
quadName.solve = (m, lang) => L(lang, ...QUADS[m.key][0]);

const quadPool = pool([
  (l) => ({ q: L(l, 'Segi empat dengan 4 sisi sama panjang dan 4 sudut siku-siku adalah …', 'A quadrilateral with 4 equal sides and 4 right angles is a …'), ok: L(l, 'persegi', 'square'), bad: [[L(l, 'belah ketupat', 'rhombus'), L(l, 'Sudut belah ketupat tidak siku-siku.', 'A rhombus has no right angles.')], [L(l, 'persegi panjang', 'rectangle'), L(l, 'Sisi persegi panjang tidak semuanya sama.', 'A rectangle\'s sides are not all equal.')]], steps: [L(l, 'Sisi sama dan sudut siku-siku: persegi.', 'Equal sides and right angles: a square.')] }),
  (l) => ({ q: L(l, 'Jajargenjang punya berapa pasang sisi sejajar?', 'How many pairs of parallel sides does a parallelogram have?'), ok: '2', bad: [['1', L(l, 'Itu trapesium.', 'That is a trapezium.')], ['4', L(l, 'Ada 4 sisi, tetapi pasangannya 2.', 'There are 4 sides, but 2 pairs.')]], steps: [L(l, 'Atas-bawah sejajar, kiri-kanan juga sejajar.', 'Top-bottom and left-right are both parallel.')] }),
  (l) => ({ q: L(l, 'Trapesium punya berapa pasang sisi sejajar?', 'How many pairs of parallel sides does a trapezium have?'), ok: '1', bad: [['2', L(l, 'Dua pasang sisi sejajar itu jajargenjang.', 'Two pairs is a parallelogram.')], ['0', L(l, 'Trapesium punya satu pasang sisi sejajar.', 'A trapezium has one pair.')]], steps: [L(l, 'Trapesium: tepat satu pasang sisi sejajar.', 'Trapezium: exactly one pair of parallel sides.')] }),
  (l) => ({ q: L(l, 'Pernyataan yang benar adalah …', 'Which statement is true?'), ok: L(l, 'setiap persegi adalah persegi panjang', 'every square is a rectangle'), bad: [[L(l, 'setiap persegi panjang adalah persegi', 'every rectangle is a square'), L(l, 'Persegi panjang tidak harus punya sisi sama.', 'A rectangle need not have equal sides.')], [L(l, 'trapesium punya dua pasang sisi sejajar', 'a trapezium has two pairs of parallel sides'), L(l, 'Trapesium hanya satu pasang.', 'A trapezium has only one pair.')]], steps: [L(l, 'Persegi punya semua ciri persegi panjang.', 'A square has every property of a rectangle.')] }),
  (l) => ({ q: L(l, 'Segi empat yang keempat sisinya sama panjang tetapi sudutnya tidak siku-siku adalah …', 'A quadrilateral with 4 equal sides but no right angles is a …'), ok: L(l, 'belah ketupat', 'rhombus'), bad: [[L(l, 'persegi', 'square'), L(l, 'Sudut persegi siku-siku.', 'A square has right angles.')], [L(l, 'layang-layang', 'kite'), L(l, 'Sisi layang-layang tidak semuanya sama.', 'A kite\'s sides are not all equal.')]], steps: [L(l, 'Sisi sama, sudut miring: belah ketupat.', 'Equal sides, slanted angles: a rhombus.')] }),
  (l) => ({ q: L(l, 'Persegi panjang punya berapa sudut siku-siku?', 'How many right angles does a rectangle have?'), ok: '4', bad: [['2', L(l, 'Setiap pojok persegi panjang siku-siku.', 'Every corner of a rectangle is a right angle.')], ['0', L(l, 'Pojok persegi panjang seperti pojok buku.', 'Rectangle corners are like book corners.')]], steps: [L(l, '4 pojok, semuanya siku-siku.', '4 corners, all right angles.')] }),
  (l) => ({ q: L(l, 'Layang-layang punya …', 'A kite has …'), ok: L(l, 'dua pasang sisi berdekatan yang sama panjang', 'two pairs of equal sides next to each other'), bad: [[L(l, 'empat sisi sama panjang', 'four equal sides'), L(l, 'Itu belah ketupat atau persegi.', 'That is a rhombus or a square.')], [L(l, 'dua pasang sisi sejajar', 'two pairs of parallel sides'), L(l, 'Itu jajargenjang.', 'That is a parallelogram.')]], steps: [L(l, 'Dua sisi atas sama, dua sisi bawah sama.', 'The two top sides match and the two bottom sides match.')] }),
  (l) => ({ q: L(l, 'Sisi-sisi yang berhadapan pada jajargenjang …', 'Opposite sides of a parallelogram are …'), ok: L(l, 'sejajar dan sama panjang', 'parallel and equal'), bad: [[L(l, 'tegak lurus', 'perpendicular'), L(l, 'Sisi berhadapan tidak bertemu.', 'Opposite sides do not meet.')], [L(l, 'berbeda panjang', 'different lengths'), L(l, 'Sisi berhadapan jajargenjang sama panjang.', 'They are equal in length.')]], steps: [L(l, 'Jajargenjang: sisi berhadapan sejajar dan sama panjang.', 'Parallelogram: opposite sides parallel and equal.')] }),
  (l) => ({ q: L(l, 'Bangun yang punya 4 sudut siku-siku tetapi sisinya tidak semuanya sama adalah …', 'A shape with 4 right angles whose sides are not all equal is a …'), ok: L(l, 'persegi panjang', 'rectangle'), bad: [[L(l, 'persegi', 'square'), L(l, 'Sisi persegi semuanya sama.', 'A square\'s sides are all equal.')], [L(l, 'trapesium', 'trapezium'), L(l, 'Trapesium biasanya tidak punya 4 siku-siku.', 'A trapezium does not have 4 right angles.')]], steps: [L(l, 'Empat siku-siku, sisi panjang dan pendek: persegi panjang.', 'Four right angles, long and short sides: a rectangle.')] }),
  (l) => ({ q: L(l, 'Setiap belah ketupat juga merupakan …', 'Every rhombus is also a …'), ok: L(l, 'jajargenjang', 'parallelogram'), bad: [[L(l, 'persegi', 'square'), L(l, 'Belah ketupat tidak harus punya sudut siku-siku.', 'A rhombus need not have right angles.')], [L(l, 'trapesium', 'trapezium'), L(l, 'Belah ketupat punya dua pasang sisi sejajar.', 'A rhombus has two pairs of parallel sides.')]], steps: [L(l, 'Sisi berhadapan belah ketupat sejajar: ciri jajargenjang.', 'A rhombus has parallel opposite sides, like a parallelogram.')] }),
]);

const TRI = [['segitiga sama sisi', 'equilateral triangle'], ['segitiga sama kaki', 'isosceles triangle'], ['segitiga siku-siku', 'right triangle']];
const triType = (rnd, lang) => {
  const k = ri(rnd, 0, 2);
  let pts;
  let labs;
  if (k === 0) {
    const s = ri(rnd, 4, 9);
    pts = [[200, 50], [290, 206], [110, 206]];
    labs = [s, s, s];
  } else if (k === 1) {
    const s = ri(rnd, 6, 10);
    const bse = pick(rnd, [3, 4, 5].filter((x) => x !== s));
    pts = [[200, 40], [255, 215], [145, 215]];
    labs = [s, bse, s];
  } else {
    const m = ri(rnd, 1, 3);
    pts = [[110, 60], [110, 215], [300, 215]];
    labs = [3 * m, 4 * m, 5 * m];
  }
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const cen = [(pts[0][0] + pts[1][0] + pts[2][0]) / 3, (pts[0][1] + pts[1][1] + pts[2][1]) / 3];
  const lab = (i, a, b) => {
    const [mx, my] = mid(a, b);
    const dx = mx - cen[0];
    const dy = my - cen[1];
    const d = Math.hypot(dx, dy);
    return txt(`s${i}`, `${labs[i]} cm`, mx + (dx / d) * 26, my + (dy / d) * 20, { size: 15 });
  };
  const fig = [{ id: 't', t: 'poly', x: 0, y: 0, pts, fill: 'ok-soft', stroke: 'ok', sw: 3 }, lab(0, pts[0], pts[1]), lab(1, pts[1], pts[2]), lab(2, pts[2], pts[0])];
  if (k === 2) fig.push({ id: 'ra', t: 'arc', x: 110, y: 215, r: 20, a1: 0, a2: 90, c: 'neg', right: true });
  return mc({
    q: L(lang, 'Segitiga ini bernama …', 'This triangle is a …'),
    fig,
    ok: L(lang, ...TRI[k]),
    bad: [0, 1, 2].filter((x) => x !== k).map((x) => [L(lang, ...TRI[x]), x === 0 ? L(lang, 'Ketiga sisinya tidak sama panjang.', 'The three sides are not all equal.') : x === 1 ? L(lang, k === 0 ? 'Ketiga sisinya sama, bukan hanya dua.' : 'Tidak ada dua sisi yang sama panjang.', k === 0 ? 'All three sides are equal, not just two.' : 'No two sides are equal.') : L(lang, 'Tidak ada sudut siku-siku.', 'There is no right angle.')]),
    fixed: true,
    steps: [k === 0 ? L(lang, `Ketiga sisi ${labs[0]} cm.`, `All three sides are ${labs[0]} cm.`) : k === 1 ? L(lang, `Dua sisi sama: ${labs[0]} cm.`, `Two sides are equal: ${labs[0]} cm.`) : L(lang, 'Ada tanda sudut siku-siku.', 'There is a right-angle mark.'), L(lang, `Jadi ${TRI[k][0]}.`, `So it is an ${TRI[k][1]}.`.replace('an right', 'a right'))],
    meta: { labs, right: k === 2 },
  });
};
triType.solve = (m, lang) => {
  const [a, b, c] = m.labs;
  const k = m.right ? 2 : a === b && b === c ? 0 : 1;
  return L(lang, ...TRI[k]);
};

const triPool = pool([
  (l) => ({ q: L(l, 'Segitiga yang ketiga sisinya sama panjang disebut …', 'A triangle with three equal sides is …'), ok: L(l, 'segitiga sama sisi', 'an equilateral triangle'), bad: [[L(l, 'segitiga sama kaki', 'an isosceles triangle'), L(l, 'Sama kaki: hanya dua sisi sama.', 'Isosceles: only two equal sides.')], [L(l, 'segitiga siku-siku', 'a right triangle'), L(l, 'Siku-siku dilihat dari sudutnya.', 'A right triangle is about its angle.')]], steps: [L(l, 'Tiga sisi sama: sama sisi.', 'Three equal sides: equilateral.')] }),
  (l) => ({ q: L(l, 'Berapa segitiga siku-siku yang sama untuk menyusun satu persegi panjang?', 'How many identical right triangles make one rectangle?'), ok: '2', bad: [['4', L(l, 'Dua sudah cukup, masing-masing setengah.', 'Two is enough: each is a half.')], ['3', L(l, 'Satu segitiga siku-siku = setengah persegi panjang.', 'One right triangle is half a rectangle.')]], steps: [L(l, 'Setengah + setengah = satu persegi panjang.', 'Half + half = one rectangle.')] }),
  (l) => ({ q: L(l, 'Segitiga sama sisi punya berapa sisi yang sama panjang?', 'How many equal sides does an equilateral triangle have?'), ok: '3', bad: [['2', L(l, 'Itu sama kaki.', 'That is isosceles.')], ['0', L(l, 'Semua sisinya sama.', 'All its sides are equal.')]], steps: [L(l, 'Sama sisi: ketiga sisi sama.', 'Equilateral: all three sides equal.')] }),
  (l) => ({ q: L(l, 'Segitiga sama kaki punya berapa sisi yang sama panjang?', 'How many equal sides does an isosceles triangle have?'), ok: '2', bad: [['3', L(l, 'Tiga sisi sama itu sama sisi.', 'Three equal sides is equilateral.')], ['1', L(l, 'Sama kaki: dua "kaki" yang sama.', 'Isosceles: two equal "legs".')]], steps: [L(l, 'Dua sisi sama panjang.', 'Two sides are equal.')] }),
  (l) => ({ q: L(l, 'Pojok buku membentuk sudut siku-siku. Segitiga yang punya sudut seperti itu adalah …', 'A book corner is a right angle. A triangle with such an angle is …'), ok: L(l, 'segitiga siku-siku', 'a right triangle'), bad: [[L(l, 'segitiga sama sisi', 'an equilateral triangle'), L(l, 'Sudut segitiga sama sisi tidak siku-siku.', 'An equilateral triangle has no right angle.')]], steps: [L(l, 'Punya sudut siku-siku: segitiga siku-siku.', 'Has a right angle: a right triangle.')] }),
  (l) => ({ q: L(l, 'Dua segitiga sama kaki yang sama besar ditempel pada alasnya. Bangun yang terbentuk adalah …', 'Two identical isosceles triangles are joined along their bases. The new shape is a …'), ok: L(l, 'layang-layang atau belah ketupat', 'kite or rhombus'), bad: [[L(l, 'trapesium', 'trapezium'), L(l, 'Bangunnya simetris dan keempat sisinya sama berpasangan.', 'The shape is symmetrical with equal sides in pairs.')], [L(l, 'segitiga besar', 'big triangle'), L(l, 'Hasilnya punya 4 sisi.', 'The result has 4 sides.')]], steps: [L(l, 'Kaki-kaki yang sama bertemu: 4 sisi sama panjang.', 'The equal legs meet: 4 equal sides.')] }),
  (l) => ({ q: L(l, 'Persegi dipotong menurut diagonalnya. Hasilnya dua segitiga …', 'A square is cut along a diagonal. You get two triangles that are …'), ok: L(l, 'siku-siku sama kaki', 'right and isosceles'), bad: [[L(l, 'sama sisi', 'equilateral'), L(l, 'Sisi miringnya lebih panjang dari sisi lain.', 'The slanted side is longer than the others.')], [L(l, 'tidak punya sudut siku-siku', 'without a right angle'), L(l, 'Pojok persegi tetap siku-siku.', 'The square\'s corner stays a right angle.')]], steps: [L(l, 'Ada sudut siku-siku dan dua sisi sama.', 'There is a right angle and two equal sides.')] }),
  (l) => ({ q: L(l, 'Dua segitiga siku-siku yang sama, satu dibalik, ditempel pada sisi miringnya. Bisa menjadi …', 'Two identical right triangles, one flipped, are joined along the long side. They can make a …'), ok: L(l, 'persegi panjang', 'rectangle'), bad: [[L(l, 'lingkaran', 'circle'), L(l, 'Tidak ada sisi lengkung.', 'There are no curved sides.')], [L(l, 'segi lima', 'pentagon'), L(l, 'Hasilnya punya 4 sisi.', 'The result has 4 sides.')]], steps: [L(l, 'Dua setengah persegi panjang menjadi satu.', 'Two halves make a whole rectangle.')] }),
  (l) => ({ q: L(l, 'Segitiga dengan sisi 5 cm, 5 cm, dan 8 cm adalah …', 'A triangle with sides 5 cm, 5 cm and 8 cm is …'), ok: L(l, 'segitiga sama kaki', 'an isosceles triangle'), bad: [[L(l, 'segitiga sama sisi', 'an equilateral triangle'), L(l, 'Sisi 8 cm berbeda.', 'The 8 cm side is different.')]], steps: [L(l, 'Dua sisi 5 cm sama.', 'The two 5 cm sides are equal.')] }),
  (l) => ({ q: L(l, 'Segitiga sama sisi punya berapa sudut siku-siku?', 'How many right angles does an equilateral triangle have?'), ok: '0', bad: [['1', L(l, 'Sudut segitiga sama sisi lebih kecil dari siku-siku.', 'Its angles are smaller than a right angle.')], ['3', L(l, 'Tidak ada yang siku-siku.', 'None of them are right angles.')]], steps: [L(l, 'Semua sudutnya sama dan lebih kecil dari siku-siku.', 'All its angles are equal and smaller than a right angle.')] }),
]);

// ---------- Bab 6: Piktogram dan diagram batang ----------
const R = 12;
const symFull = (id, x, y) => ({ id, t: 'circle', x, y, r: R, fill: 'acc', stroke: 'ink', sw: 1.5 });
const symHalf = (id, x, y) => ({ id, t: 'path', x: 0, y: 0, d: `M${x},${y - R} A${R},${R} 0 0 0 ${x},${y + R} Z`, fill: 'acc', stroke: 'ink', sw: 1.5 });
const FRUITS = [['apel', 'apples'], ['jeruk', 'oranges'], ['mangga', 'mangoes'], ['pisang', 'bananas'], ['salak', 'snake fruit'], ['jambu', 'guavas']];
const pictoFig = (lang, labels, counts, k, halves) => {
  const els = [];
  counts.forEach((c, r) => {
    const y = 55 + r * 44;
    els.push(txt(`l${r}`, labels[r], 70, y, { size: 15 }));
    for (let i = 0; i < c; i++) els.push(symFull(`s${r}_${i}`, 140 + i * 30, y));
    if (halves[r]) els.push(symHalf(`s${r}_h`, 140 + c * 30, y));
  });
  els.push(symFull('key', 250, 245), txt('kt', L(lang, `= ${k} orang`, `= ${k} people`), 305, 245, { size: 15 }));
  return els;
};
const pictoRead = (rnd, lang) => {
  const k = pick(rnd, [2, 4, 5, 10]);
  const fr = sample(rnd, FRUITS, 4);
  const counts = fr.map(() => ri(rnd, 1, 7));
  const halves = fr.map(() => (k % 2 === 0 && rnd() < 0.3 ? 1 : 0));
  const vals = counts.map((c, i) => c * k + (halves[i] * k) / 2);
  const kind = pick(rnd, ['one', 'total', 'diff']);
  const [i, j] = sample(rnd, [0, 1, 2, 3], 2);
  const [hi, lo] = vals[i] >= vals[j] ? [i, j] : [j, i];
  if (kind === 'diff' && vals[hi] === vals[lo]) return pictoRead(rnd, lang);
  const ans = kind === 'one' ? vals[i] : kind === 'total' ? vals.reduce((a, b) => a + b, 0) : vals[hi] - vals[lo];
  const fn = (x) => L(lang, fr[x][0], fr[x][1]);
  return num({
    q: kind === 'one' ? L(lang, `Berapa orang yang suka ${fr[i][0]}?`, `How many people like ${fr[i][1]}?`) : kind === 'total' ? L(lang, 'Berapa orang semuanya?', 'How many people altogether?') : L(lang, `Penyuka ${fr[hi][0]} lebih banyak berapa orang dari penyuka ${fr[lo][0]}?`, `How many more people like ${fr[hi][1]} than ${fr[lo][1]}?`),
    fig: pictoFig(lang, fr.map((f) => L(lang, f[0], f[1])), counts, k, halves),
    ans,
    wrong: kind === 'one' ? [[counts[i] + halves[i], L(lang, `Satu gambar mewakili ${k} orang, bukan 1.`, `One symbol stands for ${k} people, not 1.`)], [halves[i] ? (counts[i] + 1) * k : null, L(lang, `Setengah gambar = ${k / 2} orang.`, `Half a symbol = ${k / 2} people.`)]] : kind === 'total' ? [[counts.reduce((a, b) => a + b, 0) + halves.reduce((a, b) => a + b, 0), L(lang, `Setiap gambar bernilai ${k}.`, `Each symbol is worth ${k}.`)]] : [[vals[hi] + vals[lo], L(lang, 'Lebih banyak berapa: kurangi.', 'How many more: subtract.')], [counts[hi] - counts[lo], L(lang, `Itu selisih gambarnya. Kalikan dengan ${k}.`, `That is the difference in symbols. Multiply by ${k}.`)]],
    steps: kind === 'one' ? [L(lang, `${counts[i]} gambar${halves[i] ? ' dan setengah' : ''}, setiap gambar = ${k}.`, `${counts[i]} symbols${halves[i] ? ' and a half' : ''}, each = ${k}.`), `= ${vals[i]}.`] : kind === 'total' ? [L(lang, `${vals.join(' + ')}`, `${vals.join(' + ')}`), `= ${ans}.`] : [`${fn(hi)} ${vals[hi]}, ${fn(lo)} ${vals[lo]}.`, `${vals[hi]} − ${vals[lo]} = ${ans}.`],
    meta: { kind, k, counts, halves, i, j },
  });
};
pictoRead.solve = (m) => {
  const v = m.counts.map((c, x) => (c + m.halves[x] / 2) * m.k);
  return m.kind === 'one' ? v[m.i] : m.kind === 'total' ? v.reduce((a, b) => a + b, 0) : Math.abs(v[m.i] - v[m.j]);
};

const pictoKey = (rnd, lang) => {
  const k = pick(rnd, [2, 3, 4, 5, 10]);
  const n = ri(rnd, 2, 9);
  const t = pick(rnd, [['buku', 'books'], ['anak', 'children'], ['mobil', 'cars'], ['botol', 'bottles']]);
  const rev = rnd() < 0.5;
  return num({
    q: rev ? L(lang, `Satu gambar mewakili ${k} ${t[0]}. ${n * k} ${t[0]} digambar dengan … gambar.`, `One symbol stands for ${k} ${t[1]}. ${n * k} ${t[1]} are shown with … symbols.`) : L(lang, `Satu gambar mewakili ${k} ${t[0]}. Ada ${n} gambar. Banyak ${t[0]} …`, `One symbol stands for ${k} ${t[1]}. There are ${n} symbols. How many ${t[1]}?`),
    ans: rev ? n : n * k,
    wrong: rev ? [[n * k * k, L(lang, `Bagi dengan ${k}, jangan dikali.`, `Divide by ${k}, do not multiply.`)], [n * k - k, L(lang, `Bagi dengan ${k}.`, `Divide by ${k}.`)]] : [[n + k, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')], [n, L(lang, `Setiap gambar bernilai ${k}.`, `Each symbol is worth ${k}.`)]],
    steps: rev ? [`${n * k} ${dv(lang)} ${k} = ${n}.`] : [`${n} × ${k} = ${n * k}.`],
    meta: { rev, k, n },
  });
};
pictoKey.solve = (m) => (m.rev ? (m.n * m.k) / m.k : m.n * m.k);

const DAYS = [['Senin', 'Mon'], ['Selasa', 'Tue'], ['Rabu', 'Wed'], ['Kamis', 'Thu'], ['Jumat', 'Fri']];
const COLS = ['neg', 'acc', 'ok', 'pos', 'neg'];
const scaleBars = (rnd, lang) => {
  const step = pick(rnd, [5, 10]);
  const max = step * 6;
  const nd = ri(rnd, 4, 5);
  const v = sample(rnd, Array.from({ length: max / 5 }, (_, x) => (x + 1) * 5), nd);
  const kind = pick(rnd, ['one', 'total', 'diff']);
  const [i, j] = sample(rnd, Array.from({ length: nd }, (_, x) => x), 2);
  const [hi, lo] = v[i] > v[j] ? [i, j] : [j, i];
  const ans = kind === 'one' ? v[i] : kind === 'total' ? v.reduce((a, b) => a + b, 0) : v[hi] - v[lo];
  const d = (x) => L(lang, DAYS[x][0], DAYS[x][1]);
  return num({
    q: kind === 'one' ? L(lang, `Berapa pengunjung perpustakaan hari ${DAYS[i][0]}?`, `How many library visitors on ${DAYS[i][1]}?`) : kind === 'total' ? L(lang, `Berapa pengunjung selama ${nd} hari?`, `How many visitors over the ${nd} days?`) : L(lang, `${DAYS[hi][0]} lebih banyak berapa pengunjung dari ${DAYS[lo][0]}?`, `How many more visitors on ${DAYS[hi][1]} than on ${DAYS[lo][1]}?`),
    fig: [{ id: 'bc', t: 'bars', x: 215, y: 140, w: 290, h: 180, max, tick: step, data: v.map((x, k) => ({ l: d(k), v: x, c: COLS[k] })) }],
    ans,
    wrong: kind === 'one' ? [[v[i] % step ? v[i] - 5 : null, L(lang, `Garis naik ${step}-${step}. Ujung batang di tengah dua garis berarti ${v[i] - 5} + 5.`, `The lines go up in ${step}s. A bar ending halfway between lines is ${v[i] - 5} + 5.`)], [v[i] % step ? v[i] + 5 : null, L(lang, 'Ujung batang belum sampai garis berikutnya.', 'The bar does not reach the next line.')], [v[i] % step ? null : v[i] / step, L(lang, `Setiap garis bernilai ${step}, bukan 1.`, `Each line is worth ${step}, not 1.`)]] : kind === 'total' ? [[v.reduce((a, b) => a + b, 0) - v[nd - 1], L(lang, 'Ada hari yang terlewat.', 'A day was missed.')]] : [[v[hi] + v[lo], L(lang, 'Lebih banyak berapa: kurangi.', 'How many more: subtract.')]],
    steps: kind === 'one' ? [L(lang, `Sumbu tegak naik ${step}-${step}.`, `The scale goes up in ${step}s.`), L(lang, `Batang ${d(i)} sampai ${v[i]}.`, `The ${d(i)} bar reaches ${v[i]}.`)] : kind === 'total' ? [`${v.join(' + ')} = ${ans}.`] : [`${v[hi]} − ${v[lo]} = ${ans}.`],
    meta: { kind, v, i, j },
  });
};
scaleBars.solve = (m) => (m.kind === 'one' ? m.v[m.i] : m.kind === 'total' ? m.v.reduce((a, b) => a + b, 0) : Math.abs(m.v[m.i] - m.v[m.j]));

const scaleLine = (rnd, lang) => {
  const step = pick(rnd, [2, 5, 10, 20, 50]);
  const k = ri(rnd, 2, 6);
  return num({
    q: L(lang, `Pada diagram batang, sumbu tegak naik ${step}-${step}, dimulai dari 0. Garis ke-${k} dari bawah (tanpa 0) menunjukkan …`, `On a bar chart the scale goes up in ${step}s from 0. The ${k}${k === 2 ? 'nd' : k === 3 ? 'rd' : 'th'} line from the bottom (not counting 0) shows …`),
    ans: k * step,
    wrong: [[k, L(lang, `Setiap garis bernilai ${step}, bukan 1.`, `Each line is worth ${step}, not 1.`)], [(k + 1) * step, L(lang, 'Garis 0 tidak dihitung.', 'Do not count the 0 line.')], [k + step, L(lang, 'Kalikan, bukan jumlahkan.', 'Multiply, do not add.')]],
    steps: [`${Array.from({ length: k }, (_, x) => (x + 1) * step).join(', ')}.`, L(lang, `Garis ke-${k}: ${k * step}.`, `Line ${k}: ${k * step}.`)],
    meta: { step, k },
  });
};
scaleLine.solve = (m) => m.step * m.k;

export const K4 = {
  'k4b1-1': [thouValue, regroup],
  'k4b1-2': [cmp4, round4],
  'k4b1-3': [mul21],
  'k4b2-1': [fracFig, fracParts],
  'k4b2-2': [equivMissing, equivPick],
  'k4b2-3': [fracCmp, fracWho],
  'k4b3-1': [growPattern, picSeq],
  'k4b3-2': [numPattern, oddEven],
  'k4b4-1': [areaCells, areaStory],
  'k4b4-2': [volCubes, volStory],
  'k4b5-1': [quadName, quadPool],
  'k4b5-2': [triType, triPool],
  'k4b6-1': [pictoRead, pictoKey],
  'k4b6-2': [scaleBars, scaleLine],
};
