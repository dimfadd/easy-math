// Generator soal Kelas 3 SD.
import { L, ri, pick, num, mc, pool, names, name, sample, cap, words, G } from './common.js';
import { txt } from '../util.js';
import { hto } from '../../k3/kit.js';
import { ln, dot, table } from '../../helpers.js';

const pl = (n, w) => (n === 1 ? w : w + 's');

// ---------- Bab 1: Bilangan sampai 1.000 ----------
const htoWidth = (r, t, s) => r * 88 + (r ? 6 : 0) + t * 12 + (t ? 8 : 0) + Math.ceil(s / 5) * 11 + 4;
const readHTO = (rnd, lang) => {
  let r;
  let t;
  let s;
  do {
    r = ri(rnd, 1, 3);
    t = ri(rnd, 0, 9);
    s = ri(rnd, 0, 9);
  } while (htoWidth(r, t, s) > 380);
  const n = r * 100 + t * 10 + s;
  return num({
    q: L(lang, 'Bilangan berapa ini? (pelat = 100, batang = 10, kubus = 1)', 'What number is this? (flat = 100, rod = 10, cube = 1)'),
    fig: hto('f', r, t, s, 200 - htoWidth(r, t, s) / 2, 150),
    ans: n,
    wrong: [
      [r + t + s, L(lang, 'Pelat bernilai 100 dan batang bernilai 10, bukan 1.', 'A flat is worth 100 and a rod 10, not 1.')],
      [t === 0 ? r * 10 + s : null, L(lang, 'Tidak ada batang puluhan, jadi angka puluhannya 0.', 'There are no rods, so the tens digit is 0.')],
      [s * 100 + t * 10 + r, L(lang, 'Ratusan ditulis paling depan.', 'Hundreds are written first.')],
    ],
    steps: [L(lang, `${r} ratusan = ${r * 100}, ${t} puluhan = ${t * 10}, ${s} satuan.`, `${r} ${pl(r, 'hundred')} = ${r * 100}, ${t} ${pl(t, 'ten')} = ${t * 10}, ${s} ${pl(s, 'one')}.`), `${r * 100} + ${t * 10} + ${s} = ${n}.`],
    meta: { r, t, s },
  });
};
readHTO.solve = (m) => Number(`${m.r}${m.t}${m.s}`);

const placeH = (rnd, lang) => {
  const kind = pick(rnd, ['make', 'value', 'word', 'word']);
  const r = ri(rnd, 1, 9);
  const t = rnd() < 0.25 ? 0 : ri(rnd, 0, 9);
  const s = rnd() < 0.2 ? 0 : ri(rnd, 0, 9);
  const n = r * 100 + t * 10 + s;
  if (kind === 'make')
    return num({
      q: L(lang, `${r} ratusan, ${t} puluhan, dan ${s} satuan adalah …`, `${r} ${pl(r, 'hundred')}, ${t} ${pl(t, 'ten')} and ${s} ${pl(s, 'one')} make …`),
      ans: n,
      wrong: [[r + t + s, L(lang, 'Setiap tempat punya nilai berbeda: ratusan, puluhan, satuan.', 'Each place has a different value: hundreds, tens, ones.')], [s * 100 + t * 10 + r, L(lang, 'Ratusan ditulis paling depan.', 'Hundreds are written first.')]],
      steps: [`${r * 100} + ${t * 10} + ${s} = ${n}.`],
      meta: { kind, r, t, s },
    });
  if (kind === 'word')
    return num({
      q: L(lang, `${cap(words(lang, n))} ditulis …`, `${cap(words(lang, n))} is written as …`),
      ans: n,
      wrong: [
        [Number(`${r}00${t * 10 + s}`), L(lang, `${r * 100} dan ${t * 10 + s} ditulis ${n}, bukan ${r}00${t * 10 + s}.`, `${r * 100} and ${t * 10 + s} is written ${n}, not ${r}00${t * 10 + s}.`)],
        [t === 0 ? r * 10 + s : null, L(lang, 'Tidak ada puluhan, jadi tulis 0 di tempat puluhan.', 'There are no tens, so write 0 in the tens place.')],
        [s === 0 && t > 0 ? r * 10 + t : null, L(lang, 'Tidak ada satuan, jadi tulis 0 di tempat satuan.', 'There are no ones, so write 0 in the ones place.')],
      ],
      steps: [L(lang, `${r} ratusan, ${t} puluhan, ${s} satuan.`, `${r} ${pl(r, 'hundred')}, ${t} ${pl(t, 'ten')}, ${s} ${pl(s, 'one')}.`), `= ${n}.`],
      meta: { kind, r, t, s },
    });
  // nilai angka
  const digs = [r, t, s];
  const pos = pick(rnd, [0, 1, 2].filter((p) => digs[p] !== 0 && digs.indexOf(digs[p]) === p && digs.lastIndexOf(digs[p]) === p));
  if (pos === undefined) return placeH(rnd, lang);
  const d = digs[pos];
  const v = d * 10 ** (2 - pos);
  return num({
    q: L(lang, `Nilai angka ${d} pada bilangan ${n} adalah …`, `The value of the digit ${d} in ${n} is …`),
    ans: v,
    wrong: [
      [pos < 2 ? d : null, L(lang, `Angka ${d} ada di tempat ${pos === 0 ? 'ratusan' : 'puluhan'}, jadi nilainya bukan ${d}.`, `The ${d} is in the ${pos === 0 ? 'hundreds' : 'tens'} place, so its value is not ${d}.`)],
      [pos === 1 ? d * 100 : pos === 2 ? d * 10 : d * 10, L(lang, 'Lihat lagi tempatnya: hitung dari kanan, satuan, puluhan, ratusan.', 'Check the place again: from the right, ones, tens, hundreds.')],
    ],
    steps: [L(lang, `${n} = ${r} ratusan, ${t} puluhan, ${s} satuan.`, `${n} = ${r} ${pl(r, 'hundred')}, ${t} ${pl(t, 'ten')}, ${s} ${pl(s, 'one')}.`), L(lang, `Angka ${d} di tempat ${['ratusan', 'puluhan', 'satuan'][pos]}: nilainya ${v}.`, `The ${d} is in the ${['hundreds', 'tens', 'ones'][pos]} place: its value is ${v}.`)],
    meta: { kind, n, pos },
  });
};
placeH.solve = (m) => (m.kind === 'value' ? Number(String(m.n)[m.pos]) * 10 ** (2 - m.pos) : m.r * 100 + m.t * 10 + m.s);

const cmp1000 = (rnd, lang) => {
  const a = ri(rnd, 100, 999);
  const ds = String(a).split('').map(Number);
  let b;
  const k = rnd();
  if (k < 0.12) b = a;
  else if (k < 0.45) {
    // tukar dua angka
    const [i, j] = sample(rnd, [0, 1, 2], 2);
    const x = ds.slice();
    [x[i], x[j]] = [x[j], x[i]];
    b = x[0] === 0 ? a + 10 : Number(x.join(''));
  } else if (k < 0.75) b = Math.floor(a / 100) * 100 + ri(rnd, 0, 99);
  else b = ri(rnd, 100, 999);
  if (b === a && k >= 0.12) b = a < 999 ? a + 1 : a - 1;
  if (b > 999) b = 999;
  const sign = a > b ? '>' : a < b ? '<' : '=';
  return mc({
    q: `${a} … ${b}`,
    ok: sign,
    bad: ['<', '>', '='].filter((x) => x !== sign).map((x) => [x, sign === '=' ? L(lang, 'Kedua bilangan sama persis.', 'The two numbers are exactly the same.') : x === '=' ? L(lang, 'Kedua bilangan tidak sama.', 'The numbers are not equal.') : L(lang, `Bandingkan dari ratusan. ${Math.max(a, b)} lebih besar, jadi mulut tanda menghadap ke sana.`, `Compare from the hundreds. ${Math.max(a, b)} is greater, so the open side faces it.`)]),
    fixed: true,
    steps: [L(lang, 'Bandingkan ratusan, lalu puluhan, lalu satuan.', 'Compare hundreds, then tens, then ones.'), `${a} ${sign} ${b}.`],
    meta: { a, b },
  });
};
cmp1000.solve = (m) => (m.a > m.b ? '>' : m.a < m.b ? '<' : '=');

const order1000 = (rnd, lang) => {
  const kind = pick(rnd, ['max', 'min', 'build', 'after']);
  if (kind === 'after') {
    const n = pick(rnd, [199, 299, 399, 499, 599, 699, 799, 899, ri(rnd, 1, 9) * 100 + 9 + ri(rnd, 0, 8) * 10]);
    return num({
      q: L(lang, `Bilangan sesudah ${n} adalah …`, `The number after ${n} is …`),
      ans: n + 1,
      wrong: [[n - 1, L(lang, 'Itu bilangan sebelumnya.', 'That is the number before.')], [n % 100 === 99 ? n + 1 - 100 : n + 1 - 10, n % 100 === 99 ? L(lang, 'Satuan dan puluhan sudah penuh, jadi ratusannya bertambah 1.', 'The ones and tens are full, so the hundreds go up by 1.') : L(lang, 'Satuan sudah penuh, jadi puluhannya bertambah 1.', 'The ones are full, so the tens go up by 1.')]],
      steps: [`${n} + 1 = ${n + 1}.`],
      meta: { kind, n },
    });
  }
  if (kind === 'build') {
    const ds = sample(rnd, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
    const big = rnd() < 0.5;
    const sorted = ds.slice().sort((x, y) => (big ? y - x : x - y));
    if (!big && sorted[0] === 0) [sorted[0], sorted[1]] = [sorted[1], sorted[0]];
    const ans = Number(sorted.join(''));
    const naive = ds.slice().sort((x, y) => x - y).join('');
    return num({
      q: L(lang, `Bilangan ${big ? 'terbesar' : 'terkecil'} yang dapat dibuat dari angka ${ds.join(', ')} (setiap angka dipakai sekali${ds.includes(0) ? ', tidak diawali 0' : ''}) adalah …`, `The ${big ? 'greatest' : 'smallest'} number you can make from the digits ${ds.join(', ')} (each used once${ds.includes(0) ? ', not starting with 0' : ''}) is …`),
      ans,
      wrong: [
        [!big && naive[0] === '0' ? Number(naive) : null, L(lang, 'Bilangan tiga angka tidak boleh diawali 0. Taruh angka terkecil selain 0 di depan.', 'A three-digit number cannot start with 0. Put the smallest non-zero digit first.')],
        [Number(ds.slice().sort((x, y) => (big ? x - y : y - x)).join('')), L(lang, `Itu bilangan yang ${big ? 'terkecil' : 'terbesar'}.`, `That is the ${big ? 'smallest' : 'greatest'}.`)],
      ],
      steps: [big ? L(lang, 'Taruh angka terbesar di ratusan, lalu yang berikutnya.', 'Put the biggest digit in the hundreds, then the next.') : L(lang, 'Taruh angka terkecil (bukan 0) di ratusan, lalu sisanya dari kecil.', 'Put the smallest non-zero digit in the hundreds, then the rest from small to big.'), `= ${ans}.`],
      meta: { kind, ds, big },
    });
  }
  const base = ri(rnd, 1, 9);
  const set = new Set();
  const p = String(base * 100 + ri(rnd, 0, 99)).padStart(3, '0').split('');
  while (set.size < 4) {
    const x = sample(rnd, p, 3).join('');
    if (x[0] !== '0') set.add(Number(x));
    if (set.size < 4 && rnd() < 0.3) set.add(ri(rnd, 100, 999));
  }
  const xs = [...set].slice(0, 4);
  const mx = kind === 'max';
  const ans = mx ? Math.max(...xs) : Math.min(...xs);
  return num({
    q: L(lang, `Bilangan ${mx ? 'terbesar' : 'terkecil'} dari ${xs.join(', ')} adalah …`, `The ${mx ? 'greatest' : 'smallest'} of ${xs.join(', ')} is …`),
    ans,
    wrong: [[mx ? Math.min(...xs) : Math.max(...xs), L(lang, `Itu yang ${mx ? 'terkecil' : 'terbesar'}.`, `That is the ${mx ? 'smallest' : 'greatest'}.`)]],
    steps: [L(lang, 'Bandingkan ratusannya dulu. Kalau sama, puluhannya.', 'Compare the hundreds first. If equal, the tens.'), `= ${ans}.`],
    meta: { kind, xs },
  });
};
order1000.solve = (m) => {
  if (m.kind === 'after') return m.n + 1;
  if (m.kind === 'build') {
    const d = m.ds.slice().sort((a, b) => a - b);
    if (m.big) return Number(d.reverse().join(''));
    const first = d.find((x) => x > 0);
    d.splice(d.indexOf(first), 1);
    return Number([first, ...d].join(''));
  }
  return m.kind === 'max' ? Math.max(...m.xs) : Math.min(...m.xs);
};

const colAdd = (rnd, lang) => {
  let a;
  let b;
  do {
    a = ri(rnd, 100, 699);
    b = ri(rnd, 100, 499);
  } while (a + b > 999);
  const s = a + b;
  const story = rnd() < 0.35;
  const ctx = pick(rnd, [['Perpustakaan punya', 'buku cerita', 'buku pelajaran', 'Jumlah semua buku', 'A library has', 'story books', 'textbooks', 'How many books in all'], ['Kebun Pak Tani punya', 'pohon jeruk', 'pohon mangga', 'Jumlah semua pohon', "Pak Tani's farm has", 'orange trees', 'mango trees', 'How many trees in all'], ['Sekolah mengumpulkan', 'botol plastik', 'kaleng bekas', 'Jumlah semua barang bekas', 'A school collects', 'plastic bottles', 'old cans', 'How many items in all']]);
  const noCarry = (a % 10) + (b % 10) < 10 && (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) < 10;
  const c1 = (a % 10) + (b % 10) >= 10 ? 1 : 0;
  return num({
    q: story ? L(lang, `${ctx[0]} ${a} ${ctx[1]} dan ${b} ${ctx[2]}. ${ctx[3]} …`, `${ctx[4]} ${a} ${ctx[5]} and ${b} ${ctx[6]}. ${ctx[7]}?`) : `${a} + ${b} = …`,
    ans: s,
    wrong: [
      [noCarry ? null : Number(String(Math.floor(a / 100) + Math.floor(b / 100)) + String((Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10)) + String((a % 10) + (b % 10))), L(lang, 'Hasil satu tempat tidak boleh lebih dari 9. Simpan 1 ke tempat sebelah kiri.', 'One place cannot hold more than 9. Carry 1 to the left.')],
      [noCarry ? null : s - 10 * c1 - (c1 ? 0 : 100), L(lang, 'Ada yang lupa disimpan.', 'A carry was forgotten.')],
      [Math.abs(a - b), L(lang, 'Itu pengurangan. Soal ini penjumlahan.', 'That is subtracting. This is adding.')],
    ],
    steps: [
      L(lang, `Satuan: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}${c1 ? ', simpan 1' : ''}.`, `Ones: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}${c1 ? ', carry 1' : ''}.`),
      L(lang, `Puluhan, lalu ratusan, dengan cara yang sama.`, 'Then the tens and hundreds the same way.'),
      `${a} + ${b} = ${s}.`,
    ],
    meta: { a, b },
  });
};
colAdd.solve = (m) => m.a + m.b;

const colSub = (rnd, lang) => {
  const a = ri(rnd, 300, 999);
  const b = ri(rnd, 100, a - 50);
  const d = a - b;
  const story = rnd() < 0.35;
  const who = name(rnd);
  const borrow1 = a % 10 < b % 10;
  // salah umum: mengurangi angka kecil dari angka besar di setiap tempat
  const flip = Number([0, 1, 2].map((i) => Math.abs(Number(String(a)[i]) - Number(String(b)[i]))).join(''));
  return num({
    q: story ? L(lang, `Toko ${who} punya ${a} buku tulis. Sebanyak ${b} buku terjual. Sisa buku tulis …`, `${who}'s shop has ${a} exercise books. ${b} are sold. How many are left?`) : `${a} − ${b} = …`,
    ans: d,
    wrong: [
      [flip !== d ? flip : null, L(lang, 'Jangan membalik angka. Kalau angka atas lebih kecil, pinjam dari tempat sebelah kiri.', 'Do not swap the digits. If the top digit is smaller, borrow from the left.')],
      [a + b, L(lang, 'Itu penjumlahan. Soal ini pengurangan.', 'That is adding. This is subtracting.')],
      [borrow1 ? d + 10 : null, L(lang, 'Setelah meminjam, angka puluhan berkurang 1.', 'After borrowing, the tens digit goes down by 1.')],
    ],
    steps: [
      borrow1 ? L(lang, `Satuan ${a % 10} kurang dari ${b % 10}: pinjam 1 puluhan, ${(a % 10) + 10} − ${b % 10} = ${(a % 10) + 10 - (b % 10)}.`, `${a % 10} is less than ${b % 10}: borrow 1 ten, ${(a % 10) + 10} − ${b % 10} = ${(a % 10) + 10 - (b % 10)}.`) : L(lang, `Satuan: ${a % 10} − ${b % 10} = ${(a % 10) - (b % 10)}.`, `Ones: ${a % 10} − ${b % 10} = ${(a % 10) - (b % 10)}.`),
      L(lang, 'Lanjutkan ke puluhan dan ratusan.', 'Carry on with the tens and hundreds.'),
      `${a} − ${b} = ${d}.`,
    ],
    meta: { a, b },
  });
};
colSub.solve = (m) => m.a - m.b;

// ---------- Bab 2: Kalimat matematika, perkalian, pembagian ----------
const boxEq = (rnd, lang) => {
  const kind = pick(rnd, ['a+?', '?+a', '?-b', 'c-?']);
  const x = ri(rnd, 12, 70);
  const y = ri(rnd, 11, 60);
  let q;
  let ans;
  let wrong;
  if (kind === 'a+?' || kind === '?+a') {
    const c = x + y;
    q = kind === 'a+?' ? `${x} + □ = ${c}` : `□ + ${x} = ${c}`;
    ans = y;
    wrong = [[x + c, L(lang, `Cari bilangan yang ditambah ${x} menjadi ${c}: kurangi, ${c} − ${x}.`, `Find what adds to ${x} to make ${c}: subtract, ${c} − ${x}.`)]];
  } else if (kind === '?-b') {
    const c = y;
    q = `□ − ${x} = ${c}`;
    ans = x + c;
    wrong = [[Math.abs(c - x), L(lang, `□ dikurangi ${x} tersisa ${c}, jadi □ lebih besar: ${c} + ${x}.`, `□ take away ${x} leaves ${c}, so □ is bigger: ${c} + ${x}.`)]];
  } else {
    const c = x + y;
    q = `${c} − □ = ${x}`;
    ans = y;
    wrong = [[c + x, L(lang, `Yang diambil dari ${c} supaya tersisa ${x}: ${c} − ${x}.`, `What is taken from ${c} to leave ${x}: ${c} − ${x}.`)]];
  }
  return num({
    q: L(lang, `${q}. Nilai □ adalah …`, `${q}. The value of □ is …`),
    ans,
    wrong,
    steps: [kind === '?-b' ? L(lang, 'Kebalikan dari mengurangi adalah menjumlah.', 'The opposite of subtracting is adding.') : kind === 'c-?' ? L(lang, 'Bilangan yang diambil = bilangan awal − sisanya.', 'The amount taken = the start − what is left.') : L(lang, 'Kebalikan dari menjumlah adalah mengurangi.', 'The opposite of adding is subtracting.'), L(lang, `□ = ${ans}. Periksa: ${q.replace('□', ans)}.`, `□ = ${ans}. Check: ${q.replace('□', ans)}.`)],
    meta: { q },
  });
};
boxEq.solve = (m) => {
  const [lhs, rhs] = m.q.split(' = ');
  const nums = (s) => s.split(' ').filter((t) => /\d/.test(t)).map(Number);
  const r = Number(rhs);
  if (lhs.includes('+')) return r - nums(lhs)[0];
  if (lhs.startsWith('□')) return r + nums(lhs)[0];
  return nums(lhs)[0] - r;
};

const storySentence = (rnd, lang) => {
  const kind = pick(rnd, ['add', 'sub']);
  const who = name(rnd);
  const a = ri(rnd, 12, 48);
  const c = a + ri(rnd, 12, 48);
  if (kind === 'add')
    return mc({
      q: L(lang, `${who} punya ${a} kelereng. Ia membeli lagi sehingga kelerengnya menjadi ${c}. Kalimat matematika yang tepat adalah …`, `${who} has ${a} marbles and buys more until there are ${c}. Which number sentence fits?`),
      ok: `${a} + □ = ${c}`,
      bad: [[`${a} + ${c} = □`, L(lang, `${c} adalah banyak akhirnya, bukan yang ditambahkan.`, `${c} is the final amount, not the amount added.`)], [`${c} + □ = ${a}`, L(lang, `Mula-mula ${a}, bukan ${c}.`, `It starts at ${a}, not ${c}.`)], [`□ − ${a} = ${c}`, L(lang, 'Kelereng bertambah, jadi kalimatnya penjumlahan dari yang dipunya.', 'The marbles increase, so start from what he has and add.')]],
      steps: [L(lang, `Mula-mula ${a}, ditambah □, menjadi ${c}.`, `Start with ${a}, add □, get ${c}.`), `${a} + □ = ${c}.`],
      meta: { kind, a, c },
    });
  return mc({
    q: L(lang, `${who} punya ${c} kartu. Ia memberikan beberapa kartu kepada adik, dan sisanya ${a}. Kalimat matematika yang tepat adalah …`, `${who} has ${c} cards and gives some to a little brother. ${a} are left. Which number sentence fits?`),
    ok: `${c} − □ = ${a}`,
    bad: [[`${c} + □ = ${a}`, L(lang, 'Kartunya berkurang, jadi pengurangan.', 'The cards go down, so it is subtraction.')], [`${c} − ${a} = □ − ${a}`, L(lang, 'Kalimat ini tidak menggambarkan cerita.', 'This sentence does not match the story.')], [`${a} − □ = ${c}`, L(lang, `Mula-mula ${c}, bukan ${a}.`, `It starts at ${c}, not ${a}.`)]],
    steps: [L(lang, `Mula-mula ${c}, diberikan □, sisa ${a}.`, `Start with ${c}, give away □, ${a} left.`), `${c} − □ = ${a}.`],
    meta: { kind, a, c },
  });
};
storySentence.solve = (m) => (m.kind === 'add' ? `${m.a} + □ = ${m.c}` : `${m.c} − □ = ${m.a}`);

const missingStory = (rnd, lang) => {
  const who = name(rnd);
  const a = ri(rnd, 20, 60);
  const c = a + ri(rnd, 13, 39);
  const give = rnd() < 0.5;
  return num({
    q: give ? L(lang, `${who} punya ${c} kartu. Ia memberikan beberapa kartu kepada adik, dan sisanya ${a} kartu. Berapa kartu yang diberikan?`, `${who} has ${c} cards, gives some away and has ${a} left. How many were given away?`) : L(lang, `Ibu membeli ${a} telur, lalu membeli lagi sehingga telurnya menjadi ${c}. Berapa telur yang dibeli lagi?`, `Mum buys ${a} eggs, then buys more until she has ${c}. How many more did she buy?`),
    ans: c - a,
    wrong: [[a + c, L(lang, 'Bilangan yang dicari adalah selisihnya, jadi kurangi.', 'We want the difference, so subtract.')], [a, L(lang, `${a} sudah ada di soal. Yang dicari □.`, `${a} is given. We need □.`)]],
    steps: [give ? `${c} − □ = ${a}.` : `${a} + □ = ${c}.`, `□ = ${c} − ${a} = ${c - a}.`],
    meta: { a, c },
  });
};
missingStory.solve = (m) => m.c - m.a;

const LEGS = [
  ['meja', 'tables', 'kaki', 'legs', 4],
  ['kursi', 'chairs', 'kaki', 'legs', 4],
  ['motor', 'motorbikes', 'roda', 'wheels', 2],
  ['becak', 'pedicabs', 'roda', 'wheels', 3],
  ['ayam', 'chickens', 'kaki', 'legs', 2],
  ['kucing', 'cats', 'kaki', 'legs', 4],
  ['laba-laba', 'spiders', 'kaki', 'legs', 8],
  ['kotak', 'boxes', 'kue', 'cakes', 6],
  ['bungkus', 'packs', 'permen', 'sweets', 5],
];
const mulFact = (rnd, lang) => {
  const kind = pick(rnd, ['bare', 'rep', 'comm', 'story']);
  if (kind === 'story') {
    const [oi, oe, pi, pe, k] = pick(rnd, LEGS);
    const n = ri(rnd, 3, 9);
    return num({
      q: L(lang, `Satu ${oi} punya ${k} ${pi}. ${n} ${oi} punya … ${pi}.`, `One of the ${oe} has ${k} ${pe}. ${n} ${oe} have … ${pe}.`),
      ans: n * k,
      wrong: [[n + k, L(lang, `Itu ${n} + ${k}. Ada ${n} kelompok berisi ${k}, jadi dikali.`, `That is ${n} + ${k}. There are ${n} groups of ${k}, so multiply.`)], [n * k - k, L(lang, `Hitung ${n} kelompok, jangan kurang satu.`, `Count all ${n} groups.`)]],
      steps: [`${n} × ${k} = ${Array(n).fill(k).join(' + ')}`, `= ${n * k}.`],
      meta: { kind, a: n, b: k },
    });
  }
  const a = ri(rnd, 2, 9);
  const b = ri(rnd, 2, 10);
  if (kind === 'rep')
    return num({
      q: `${Array(a).fill(b).join(' + ')} = ${a} × …`,
      ans: b,
      wrong: [[a * b, L(lang, 'Yang ditanya bilangan yang dikali, bukan hasilnya.', 'We need the number being multiplied, not the answer.')], [a, L(lang, `${a} adalah banyak kelompok. Isi setiap kelompok ${b}.`, `${a} is the number of groups. Each group has ${b}.`)]],
      steps: [L(lang, `${b} dijumlah ${a} kali.`, `${b} added ${a} times.`), `= ${a} × ${b}.`],
      meta: { kind, a, b },
    });
  if (kind === 'comm')
    return num({
      q: `${a} × ${b} = ${b} × …`,
      ans: a,
      wrong: [[a * b, L(lang, 'Yang ditanya bilangan di kotak, bukan hasil kalinya.', 'We need the missing number, not the product.')], [b, L(lang, 'Urutan perkalian boleh ditukar: kedua bilangan berpindah tempat.', 'You can swap the order: the two numbers change places.')]],
      steps: [L(lang, 'Urutan perkalian boleh ditukar, hasilnya sama.', 'Swapping the order gives the same answer.'), `${a} × ${b} = ${b} × ${a}.`],
      meta: { kind, a, b },
    });
  return num({
    q: `${a} × ${b} = …`,
    ans: a * b,
    wrong: [[a + b, L(lang, 'Itu penjumlahan. Kali berarti penjumlahan berulang.', 'That is adding. Times means repeated adding.')], [a * b - b, L(lang, `Jumlahkan ${b} sebanyak ${a} kali, jangan kurang.`, `Add ${b} exactly ${a} times.`)], [a * b + b, L(lang, `Jumlahkan ${b} sebanyak ${a} kali, jangan lebih.`, `Add ${b} exactly ${a} times.`)]],
    steps: [`${Array(a).fill(b).join(' + ')}`, `= ${a * b}.`],
    meta: { kind, a, b },
  });
};
mulFact.solve = (m) => (m.kind === 'rep' ? m.b : m.kind === 'comm' ? m.a : m.a * m.b);

const arrayCount = (rnd, lang) => {
  const r = ri(rnd, 2, 5);
  const c = ri(rnd, 2, 6);
  const ic = pick(rnd, ['star', 'apple']);
  const dx = 46;
  const dy = 48;
  const fig = [];
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) fig.push({ id: `o${i}_${j}`, t: 'icon', name: ic, x: 200 - ((c - 1) * dx) / 2 + j * dx, y: 145 - ((r - 1) * dy) / 2 + i * dy, size: 34 });
  const nm = ic === 'star' ? L(lang, 'bintang', 'stars') : L(lang, 'apel', 'apples');
  return num({
    q: L(lang, `Ada ${r} baris, setiap baris ${c} ${nm}. Berapa semua ${nm}?`, `There are ${r} rows with ${c} ${nm} in each. How many ${nm} altogether?`),
    fig,
    ans: r * c,
    wrong: [[r + c, L(lang, `Itu ${r} + ${c}. Ada ${r} baris berisi ${c}, jadi ${r} × ${c}.`, `That is ${r} + ${c}. ${r} rows of ${c} is ${r} × ${c}.`)]],
    steps: [`${r} × ${c} = ${Array(r).fill(c).join(' + ')}`, `= ${r * c}.`],
    meta: { r, c },
  });
};
arrayCount.solve = (m) => m.r * m.c;

const divFact = (rnd, lang) => {
  const kind = pick(rnd, ['bare', 'bare', 'family']);
  const b = ri(rnd, 2, 9);
  const qn = ri(rnd, 2, 9);
  const a = b * qn;
  if (kind === 'family')
    return num({
      q: L(lang, `${b} × ${qn} = ${a}, maka ${a} : ${b} = …`, `${b} × ${qn} = ${a}, so ${a} ÷ ${b} = …`),
      ans: qn,
      wrong: [[a * b, L(lang, 'Pembagian adalah kebalikan perkalian, hasilnya lebih kecil.', 'Division undoes multiplication, so the answer is smaller.')], [b, L(lang, `${b} adalah pembaginya.`, `${b} is the number we divide by.`)]],
      steps: [L(lang, `${a} : ${b} artinya ${b} × … = ${a}.`, `${a} ÷ ${b} means ${b} × … = ${a}.`), `= ${qn}.`],
      meta: { a, b },
    });
  return num({
    q: L(lang, `${a} : ${b} = …`, `${a} ÷ ${b} = …`),
    ans: qn,
    wrong: [[a - b, L(lang, 'Itu pengurangan. Bagi berarti membagi sama rata.', 'That is subtracting. Divide means share equally.')], [qn + 1, L(lang, `Periksa: ${b} × ${qn + 1} = ${b * (qn + 1)}, bukan ${a}.`, `Check: ${b} × ${qn + 1} = ${b * (qn + 1)}, not ${a}.`)]],
    steps: [L(lang, `Cari: ${b} × … = ${a}.`, `Find: ${b} × … = ${a}.`), L(lang, `${b} × ${qn} = ${a}, jadi hasilnya ${qn}.`, `${b} × ${qn} = ${a}, so the answer is ${qn}.`)],
    meta: { a, b },
  });
};
divFact.solve = (m) => m.a / m.b;

const divStory = (rnd, lang) => {
  const share = rnd() < 0.5;
  const b = ri(rnd, 2, 9);
  const qn = ri(rnd, 2, 9);
  const a = b * qn;
  const t = pick(rnd, [['permen', 'sweets'], ['kue', 'cakes'], ['pensil', 'pencils'], ['jeruk', 'oranges'], ['kelereng', 'marbles']]);
  return num({
    q: share ? L(lang, `${a} ${t[0]} dibagi sama rata untuk ${b} anak. Setiap anak mendapat …`, `${a} ${t[1]} are shared equally among ${b} children. Each child gets …`) : L(lang, `${a} siswa dibagi menjadi kelompok berisi ${b} siswa. Banyak kelompok adalah …`, `${a} pupils are put into groups of ${b}. How many groups are there?`),
    ans: qn,
    wrong: [[a * b, L(lang, 'Membagi membuat bilangannya lebih kecil, bukan lebih besar.', 'Sharing makes the number smaller, not bigger.')], [a - b, L(lang, 'Itu pengurangan sekali. Kita perlu membagi.', 'That subtracts once. We need to divide.')]],
    steps: [`${a} ${L(lang, ':', '÷')} ${b} = …`, L(lang, `${b} × ${qn} = ${a}, jadi ${qn}.`, `${b} × ${qn} = ${a}, so ${qn}.`)],
    meta: { a, b },
  });
};
divStory.solve = (m) => m.a / m.b;

// ---------- Bab 3: Pengukuran ----------
const PX = 30;
const RX0 = 45;
function ruler(p, y, n = 11) {
  let d = `M${RX0 - 8},${y} h${n * PX + 16} v34 h${-(n * PX + 16)} Z`;
  for (let k = 0; k <= n * 2; k++) d += ` M${RX0 + (k * PX) / 2},${y} v${k % 2 ? 7 : 13}`;
  const els = [{ id: `${p}r`, t: 'path', x: 0, y: 0, d, fill: 'acc-soft', stroke: 'ink', sw: 1.5, z: -1 }];
  for (let k = 0; k <= n; k++) els.push(txt(`${p}n${k}`, String(k), RX0 + k * PX, y + 24, { size: 11 }));
  return els;
}
const pencil = (id, a, b, y, c = 'pos') => {
  const x0 = RX0 + a * PX;
  const len = (b - a) * PX;
  return { id, t: 'poly', x: 0, y: 0, pts: [[x0, y - 10], [x0 + len - 18, y - 10], [x0 + len, y], [x0 + len - 18, y + 10], [x0, y + 10]], fill: `${c}-soft`, stroke: c, sw: 2.5 };
};
const rulerRead = (rnd, lang) => {
  const a = rnd() < 0.55 ? 0 : ri(rnd, 1, 4);
  const b = ri(rnd, a + 3, 11);
  const obj = pick(rnd, [['pensil', 'pencil'], ['krayon', 'crayon'], ['paku', 'nail']]);
  return num({
    q: L(lang, `Berapa sentimeter panjang ${obj[0]} ini?`, `How many centimetres long is this ${obj[1]}?`),
    fig: [...ruler('r', 150), pencil('p', a, b, 125), ln('ga', RX0 + a * PX, 112, RX0 + a * PX, 150, { sw: 1.5, c: 'mut', dash: '3 3' }), ln('gb', RX0 + b * PX, 112, RX0 + b * PX, 150, { sw: 1.5, c: 'mut', dash: '3 3' })],
    ans: b - a,
    wrong: [
      [a > 0 ? b : null, L(lang, `Ujung kiri tidak di 0, tetapi di ${a}. Hitung dari ${a} sampai ${b}.`, `The left end is not at 0 but at ${a}. Count from ${a} to ${b}.`)],
      [b - a + 1, L(lang, 'Hitung jarak antar garis (sentimeter), bukan banyak angka.', 'Count the spaces (centimetres), not the numbers.')],
    ],
    steps: a > 0 ? [L(lang, `Ujung kiri di ${a}, ujung kanan di ${b}.`, `Left end at ${a}, right end at ${b}.`), `${b} − ${a} = ${b - a} cm.`] : [L(lang, `Ujung kiri di 0, ujung kanan di ${b}.`, `Left end at 0, right end at ${b}.`), L(lang, `Panjangnya ${b} cm.`, `It is ${b} cm long.`)],
    meta: { a, b },
  });
};
rulerRead.solve = (m) => m.b - m.a;

const cmDiff = (rnd, lang) => {
  const kind = pick(rnd, ['diff', 'ends', 'sum']);
  const a = ri(rnd, 3, 20);
  const b = a + ri(rnd, 2, 15);
  if (kind === 'ends') {
    const x = ri(rnd, 1, 5);
    const y = x + ri(rnd, 3, 9);
    return num({
      q: L(lang, `Ujung kiri benda di angka ${x} penggaris, ujung kanan di angka ${y}. Panjangnya … cm.`, `The left end of an object is at ${x} on a ruler and the right end at ${y}. It is … cm long.`),
      ans: y - x,
      wrong: [[y, L(lang, 'Itu angka ujung kanan. Benda tidak mulai dari 0, jadi kurangi dengan angka ujung kiri.', 'That is the right-end number. It does not start at 0, so subtract the left-end number.')], [y - x + 1, L(lang, 'Hitung jarak antar angka, bukan banyak angka.', 'Count the spaces between numbers, not the numbers.')]],
      steps: [`${y} − ${x} = ${y - x} cm.`],
      meta: { kind, x, y },
    });
  }
  const [c1, c2] = pick(rnd, [[['merah', 'red'], ['biru', 'blue']], [['kuning', 'yellow'], ['hijau', 'green']], [['ungu', 'purple'], ['putih', 'white']]]);
  if (kind === 'sum')
    return num({
      q: L(lang, `Pita ${c1[0]} ${a} cm dan pita ${c2[0]} ${b} cm disambung (tanpa tumpang tindih). Panjangnya … cm.`, `A ${c1[1]} ribbon ${a} cm and a ${c2[1]} ribbon ${b} cm are joined end to end. The total is … cm.`),
      ans: a + b,
      wrong: [[b - a, L(lang, 'Disambung berarti panjangnya dijumlah.', 'Joined means the lengths are added.')]],
      steps: [`${a} + ${b} = ${a + b} cm.`],
      meta: { kind, a, b },
    });
  return num({
    q: L(lang, `Pita ${c1[0]} ${b} cm, pita ${c2[0]} ${a} cm. Pita ${c1[0]} lebih panjang … cm.`, `The ${c1[1]} ribbon is ${b} cm and the ${c2[1]} ribbon is ${a} cm. The ${c1[1]} ribbon is … cm longer.`),
    ans: b - a,
    wrong: [[a + b, L(lang, 'Lebih panjang berapa: kurangi.', 'How much longer: subtract.')], [b, L(lang, 'Itu panjang pita seluruhnya.', 'That is the whole ribbon.')]],
    steps: [`${b} − ${a} = ${b - a} cm.`],
    meta: { kind, a, b },
  });
};
cmDiff.solve = (m) => (m.kind === 'ends' ? m.y - m.x : m.kind === 'sum' ? m.a + m.b : m.b - m.a);

const mCm = (rnd, lang) => {
  const kind = pick(rnd, ['m2cm', 'mix', 'cm2m', 'cut']);
  const m = ri(rnd, 1, 9);
  const c = ri(rnd, 1, 9) * 10 + (rnd() < 0.3 ? ri(rnd, 1, 9) : 0);
  if (kind === 'm2cm')
    return num({
      q: `${m} m = … cm`,
      ans: m * 100,
      wrong: [[m * 10, L(lang, '1 m = 100 cm, bukan 10 cm.', '1 m = 100 cm, not 10 cm.')], [m * 1000, L(lang, '1 m = 100 cm. 1.000 itu untuk gram dan kilogram.', '1 m = 100 cm. 1,000 is for grams and kilograms.')]],
      steps: [`1 m = 100 cm.`, `${m} × 100 = ${m * 100} cm.`],
      meta: { kind, m },
    });
  if (kind === 'mix')
    return num({
      q: `${m} m ${c} cm = … cm`,
      ans: m * 100 + c,
      wrong: [[m + c, L(lang, `${m} m harus diubah dulu menjadi ${m * 100} cm.`, `Change ${m} m into ${m * 100} cm first.`)], [Number(`${m}0${c}`) !== m * 100 + c ? Number(`${m}0${c}`) : null, L(lang, `${m * 100} + ${c} = ${m * 100 + c}.`, `${m * 100} + ${c} = ${m * 100 + c}.`)]],
      steps: [`${m} m = ${m * 100} cm.`, `${m * 100} + ${c} = ${m * 100 + c} cm.`],
      meta: { kind, m, c },
    });
  if (kind === 'cm2m')
    return num({
      q: `${m * 100} cm = … m`,
      ans: m,
      wrong: [[m * 10, L(lang, '100 cm = 1 m, jadi bagi dengan 100.', '100 cm = 1 m, so divide by 100.')], [m * 10000, L(lang, 'Meter lebih panjang dari sentimeter, jadi angkanya mengecil.', 'A metre is longer than a centimetre, so the number gets smaller.')]],
      steps: [`100 cm = 1 m.`, `${m * 100} ${L(lang, ':', '÷')} 100 = ${m} m.`],
      meta: { kind, m },
    });
  const mm = ri(rnd, 2, 5);
  const cut = ri(rnd, 1, 9) * 10;
  return num({
    q: L(lang, `Tali ${mm} m dipotong ${cut} cm. Sisa tali … cm.`, `A ${mm} m rope has ${cut} cm cut off. … cm of rope is left.`),
    ans: mm * 100 - cut,
    wrong: [[mm * 100 + cut, L(lang, 'Dipotong berarti berkurang.', 'Cutting off makes it shorter.')], [Math.abs(cut - mm), L(lang, `Ubah dulu ${mm} m menjadi ${mm * 100} cm.`, `Change ${mm} m into ${mm * 100} cm first.`)]],
    steps: [`${mm} m = ${mm * 100} cm.`, `${mm * 100} − ${cut} = ${mm * 100 - cut} cm.`],
    meta: { kind, m: mm, c: cut },
  });
};
mCm.solve = (m) => ({ m2cm: m.m * 100, mix: m.m * 100 + m.c, cm2m: m.m, cut: m.m * 100 - m.c })[m.kind];

const kgG = (rnd, lang) => {
  const kind = pick(rnd, ['kg2g', 'mix', 'g2kg', 'use']);
  const k = ri(rnd, 1, 9);
  const g = ri(rnd, 1, 9) * 100 + (rnd() < 0.25 ? 50 : 0);
  if (kind === 'kg2g')
    return num({
      q: `${k} kg = … g`,
      ans: k * 1000,
      wrong: [[k * 100, L(lang, '1 kg = 1.000 g, bukan 100 g.', '1 kg = 1,000 g, not 100 g.')], [k * 10, L(lang, '1 kg = 1.000 g.', '1 kg = 1,000 g.')]],
      steps: ['1 kg = 1.000 g.', `${k} × 1.000 = ${G(lang, k * 1000)} g.`].map((s) => (lang === 'en' ? s.replace('1.000', '1,000') : s)),
      meta: { kind, k },
    });
  if (kind === 'mix')
    return num({
      q: `${k} kg ${g} g = … g`,
      ans: k * 1000 + g,
      wrong: [[k + g, L(lang, `Ubah dulu ${k} kg menjadi ${G(lang, k * 1000)} g.`, `Change ${k} kg into ${G(lang, k * 1000)} g first.`)], [k * 100 + g, L(lang, '1 kg = 1.000 g, bukan 100 g.', '1 kg = 1,000 g, not 100 g.')]],
      steps: [`${k} kg = ${G(lang, k * 1000)} g.`, `${G(lang, k * 1000)} + ${g} = ${G(lang, k * 1000 + g)} g.`],
      meta: { kind, k, g },
    });
  if (kind === 'g2kg')
    return num({
      q: `${G(lang, k * 1000)} g = … kg`,
      ans: k,
      wrong: [[k * 10, L(lang, '1.000 g = 1 kg, jadi bagi dengan 1.000.', '1,000 g = 1 kg, so divide by 1,000.')], [k * 100, L(lang, '1.000 g = 1 kg, jadi bagi dengan 1.000.', '1,000 g = 1 kg, so divide by 1,000.')]],
      steps: [L(lang, '1.000 g = 1 kg.', '1,000 g = 1 kg.'), `${G(lang, k * 1000)} ${L(lang, ':', '÷')} ${G(lang, 1000)} = ${k} kg.`],
      meta: { kind, k },
    });
  const kk = ri(rnd, 1, 3);
  const used = ri(rnd, 1, 9) * 100;
  const item = pick(rnd, [['gula', 'sugar'], ['tepung', 'flour'], ['beras', 'rice']]);
  return num({
    q: L(lang, `Ibu membeli ${kk} kg ${item[0]}, lalu memakai ${used} g. Sisa ${item[0]} … g.`, `Mum buys ${kk} kg of ${item[1]} and uses ${used} g. … g of ${item[1]} is left.`),
    ans: kk * 1000 - used,
    wrong: [[kk * 1000 + used, L(lang, 'Dipakai berarti berkurang.', 'Using some makes it less.')], [kk * 100 - used > 0 ? kk * 100 - used : null, L(lang, '1 kg = 1.000 g, bukan 100 g.', '1 kg = 1,000 g, not 100 g.')]],
    steps: [`${kk} kg = ${G(lang, kk * 1000)} g.`, `${G(lang, kk * 1000)} − ${used} = ${G(lang, kk * 1000 - used)} g.`],
    meta: { kind, k: kk, g: used },
  });
};
kgG.solve = (m) => ({ kg2g: m.k * 1000, mix: m.k * 1000 + m.g, g2kg: m.k, use: m.k * 1000 - m.g })[m.kind];

// Satuan yang cocok
const UNIT_OBJ = [
  ['panjang pensil', 'the length of a pencil', 'cm'],
  ['lebar buku tulis', 'the width of an exercise book', 'cm'],
  ['panjang penghapus', 'the length of an eraser', 'cm'],
  ['panjang lapangan sepak bola', 'the length of a football pitch', 'm'],
  ['panjang kolam renang', 'the length of a swimming pool', 'm'],
  ['tinggi tiang bendera', 'the height of a flagpole', 'm'],
  ['berat sebutir telur', 'the weight of an egg', 'g'],
  ['berat sebuah permen', 'the weight of a sweet', 'g'],
  ['berat sendok', 'the weight of a spoon', 'g'],
  ['berat karung beras', 'the weight of a sack of rice', 'kg'],
  ['berat semangka', 'the weight of a watermelon', 'kg'],
  ['berat badanmu', 'your body weight', 'kg'],
];
const UNIT_NAME = { cm: ['sentimeter', 'centimetres'], m: ['meter', 'metres'], g: ['gram', 'grams'], kg: ['kilogram', 'kilograms'] };
const unitPickGen = (kinds) => {
  const g = (rnd, lang) => {
    const list = UNIT_OBJ.filter((o) => kinds.includes(o[2]));
    const i = UNIT_OBJ.indexOf(pick(rnd, list));
    const [oi, oe, u] = UNIT_OBJ[i];
    const isLen = u === 'cm' || u === 'm';
    const why = (x) =>
      x === 'cm' || x === 'g'
          ? L(lang, `${cap(UNIT_NAME[x][0])} terlalu kecil untuk benda ini.`, `${cap(UNIT_NAME[x][1])} are too small for this.`)
          : L(lang, `${cap(UNIT_NAME[x][0])} terlalu besar untuk benda sekecil ini.`, `${cap(UNIT_NAME[x][1])} are too big for something this small.`);
    const whyFull = (x) => ((x === 'cm' || x === 'm') !== isLen ? L(lang, `${cap(UNIT_NAME[x][0])} adalah satuan ${isLen ? 'berat' : 'panjang'}, bukan satuan ${isLen ? 'panjang' : 'berat'}.`, `${cap(UNIT_NAME[x][1])} measure ${isLen ? 'weight' : 'length'}, not ${isLen ? 'length' : 'weight'}.`) : why(x));
    return mc({
      q: L(lang, `Satuan yang cocok untuk mengukur ${oi} adalah …`, `The best unit for measuring ${oe} is …`),
      ok: L(lang, UNIT_NAME[u][0], UNIT_NAME[u][1]),
      bad: ['cm', 'm', 'g', 'kg'].filter((x) => x !== u).map((x) => [L(lang, UNIT_NAME[x][0], UNIT_NAME[x][1]), whyFull(x)]),
      max: 3,
      steps: [isLen ? L(lang, 'Ini mengukur panjang: cm untuk benda pendek, m untuk yang panjang.', 'This measures length: cm for short things, m for long things.') : L(lang, 'Ini mengukur berat: g untuk benda ringan, kg untuk yang berat.', 'This measures weight: g for light things, kg for heavy things.'), L(lang, `Jadi ${UNIT_NAME[u][0]}.`, `So ${UNIT_NAME[u][1]}.`)],
      meta: { i },
    });
  };
  g.solve = (m, lang) => {
    const u = UNIT_OBJ[m.i][2];
    return L(lang, UNIT_NAME[u][0], UNIT_NAME[u][1]);
  };
  return g;
};
const unitLen = unitPickGen(['cm', 'm']);
const unitW = unitPickGen(['g', 'kg']);

// ---------- Bab 4: Sudut dan garis ----------
const rad = (d) => (d * Math.PI) / 180;
function angleFig(p, x, y, deg, base, L0 = 120) {
  return [
    ln(`${p}a`, x, y, x + L0 * Math.cos(rad(base)), y - L0 * Math.sin(rad(base)), { sw: 3.5, c: 'ink', draw: false }),
    ln(`${p}b`, x, y, x + L0 * Math.cos(rad(base + deg)), y - L0 * Math.sin(rad(base + deg)), { sw: 3.5, c: 'ink', draw: false }),
    { id: `${p}m`, t: 'arc', x, y, r: 26, a1: base, a2: base + deg, c: 'pos', right: deg === 90 },
    dot(`${p}v`, x, y, 'ink', { r: 4, stroke: 'none' }),
  ];
}
const ANG = [['siku-siku', 'a right angle'], ['lebih kecil dari siku-siku', 'smaller than a right angle'], ['lebih besar dari siku-siku', 'bigger than a right angle']];
const angleKind = (rnd, lang) => {
  const k = pick(rnd, [0, 0, 1, 2]);
  const deg = k === 0 ? 90 : k === 1 ? pick(rnd, [25, 35, 45, 55, 65]) : pick(rnd, [115, 125, 135, 145, 155]);
  const base = pick(rnd, [0, 0, 10, 20, -10]);
  const x = deg > 100 ? 220 : 130;
  const fig = angleFig('f', x + (base > 0 ? -10 : 0), 215, deg, base, 130);
  return mc({
    q: L(lang, 'Sudut ini …', 'This angle is …'),
    fig,
    ok: L(lang, ...ANG[k]),
    bad: [0, 1, 2].filter((x) => x !== k).map((x) => [L(lang, ...ANG[x]), x === 0 ? L(lang, 'Tempelkan pojok kertas. Sudut ini tidak pas dengan pojoknya.', 'Hold a paper corner against it. It does not fit exactly.') : x === 1 ? L(lang, 'Bukaan sudut ini tidak lebih sempit dari pojok buku.', 'This angle is not narrower than a book corner.') : L(lang, 'Bukaan sudut ini tidak lebih lebar dari pojok buku.', 'This angle is not wider than a book corner.')]),
    fixed: true,
    steps: [L(lang, 'Bandingkan dengan pojok kertas (siku-siku).', 'Compare it with a paper corner (a right angle).'), L(lang, `Sudut ini ${ANG[k][0]}.`, `This angle is ${ANG[k][1]}.`)],
    meta: { deg },
  });
};
angleKind.solve = (m, lang) => L(lang, ...ANG[m.deg === 90 ? 0 : m.deg < 90 ? 1 : 2]);

const clockAngle = (rnd, lang) => {
  const h = pick(rnd, [1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 9, 10, 11]);
  const hx = 200 + 45 * Math.sin(rad(h * 30));
  const hy = 145 - 45 * Math.cos(rad(h * 30));
  const fig = [
    { id: 'face', t: 'circle', x: 200, y: 145, r: 100, fill: 'paper', stroke: 'ink', sw: 3 },
    ...[12, 3, 6, 9].map((v) => txt(`n${v}`, String(v), 200 + 80 * Math.sin(rad(v * 30)), 145 - 80 * Math.cos(rad(v * 30)), { size: 18 })),
    ln('mh', 200, 145, 200, 80, { sw: 4, c: 'ink', draw: false }),
    ln('hh', 200, 145, hx, hy, { sw: 6, c: 'neg', draw: false }),
    dot('c', 200, 145, 'ink', { r: 5 }),
  ];
  const deg = Math.min(h, 12 - h) * 30;
  const k = deg === 90 ? 0 : deg < 90 ? 1 : 2;
  return mc({
    q: L(lang, `Pukul ${h}.00. Sudut antara kedua jarum jam …`, `It is ${h} o'clock. The angle between the hands is …`),
    fig,
    ok: L(lang, ...ANG[k]),
    bad: [0, 1, 2].filter((x) => x !== k).map((x) => [L(lang, ...ANG[x]), L(lang, 'Bandingkan bukaan kedua jarum dengan pojok buku.', 'Compare the opening between the hands with a book corner.')]),
    fixed: true,
    steps: [L(lang, 'Pada pukul 3.00 dan 9.00 jarum membentuk siku-siku.', 'At 3 and 9 o\'clock the hands make a right angle.'), L(lang, `Pukul ${h}.00: ${ANG[k][0]}.`, `At ${h} o'clock: ${ANG[k][1]}.`)],
    meta: { h },
  });
};
clockAngle.solve = (m, lang) => {
  const d = Math.abs(m.h * 30 - 0);
  const a = d > 180 ? 360 - d : d;
  return L(lang, ...ANG[a === 90 ? 0 : a < 90 ? 1 : 2]);
};

const LINES = [['sejajar', 'parallel'], ['tegak lurus', 'perpendicular'], ['berpotongan, tidak tegak lurus', 'crossing, not perpendicular']];
const linePair = (rnd, lang) => {
  const k = pick(rnd, [0, 1, 2]);
  const rot = pick(rnd, [0, 15, 30, 60, 90, 120, 150]);
  const c = [200, 145];
  const seg = (id, ang, off, len = 130, shift = 0) => {
    const ux = Math.cos(rad(ang));
    const uy = -Math.sin(rad(ang));
    const nx = -uy;
    const ny = ux;
    const cx = c[0] + nx * off + ux * shift;
    const cy = c[1] + ny * off + uy * shift;
    return ln(id, cx - ux * len, cy - uy * len, cx + ux * len, cy + uy * len, { sw: 4, c: id === 'l1' ? 'pos' : 'neg', draw: false });
  };
  const fig = k === 0 ? [seg('l1', rot, -40), seg('l2', rot, 40, 110, ri(rnd, -20, 20))] : k === 1 ? [seg('l1', rot, 0), seg('l2', rot + 90, 0, 100, ri(rnd, -30, 30)), { id: 'm', t: 'arc', x: c[0], y: c[1], r: 18, a1: rot, a2: rot + 90, c: 'ok', right: true }] : [seg('l1', rot, 0), seg('l2', rot + pick(rnd, [35, 50, 130, 145]), 0, 110)];
  return mc({
    q: L(lang, 'Kedua garis ini …', 'These two lines are …'),
    fig,
    ok: L(lang, ...LINES[k]),
    bad: [0, 1, 2].filter((x) => x !== k).map((x) => [L(lang, ...LINES[x]), x === 0 ? L(lang, 'Garis sejajar tidak pernah bertemu.', 'Parallel lines never meet.') : x === 1 ? L(lang, k === 0 ? 'Garis tegak lurus harus bertemu.' : 'Sudut pertemuannya bukan siku-siku.', k === 0 ? 'Perpendicular lines must meet.' : 'They do not meet at a right angle.') : L(lang, k === 0 ? 'Kedua garis tidak bertemu.' : 'Ada tanda siku-siku di pertemuannya.', k === 0 ? 'The lines do not meet.' : 'There is a right-angle mark where they meet.')]),
    fixed: true,
    steps: [k === 0 ? L(lang, 'Jaraknya selalu sama dan tidak bertemu: sejajar.', 'Always the same distance apart and never meet: parallel.') : k === 1 ? L(lang, 'Bertemu dan membentuk siku-siku: tegak lurus.', 'They meet at a right angle: perpendicular.') : L(lang, 'Bertemu, tetapi sudutnya bukan siku-siku.', 'They meet, but not at a right angle.')],
    meta: { k },
  });
};
linePair.solve = (m, lang) => L(lang, ...LINES[m.k]);

const lineExamples = pool([
  (l) => ({ q: L(l, 'Dua rel kereta api saling …', 'The two rails of a railway track are …'), ok: L(l, 'sejajar', 'parallel'), bad: [[L(l, 'tegak lurus', 'perpendicular'), L(l, 'Rel tidak pernah bertemu.', 'The rails never meet.')]], steps: [L(l, 'Jarak rel selalu sama dan tidak bertemu.', 'The rails stay the same distance apart and never meet.')] }),
  (l) => ({ q: L(l, 'Tiang bendera dan tanah datar saling …', 'A flagpole and flat ground are …'), ok: L(l, 'tegak lurus', 'perpendicular'), bad: [[L(l, 'sejajar', 'parallel'), L(l, 'Tiang dan tanah bertemu.', 'The pole and the ground meet.')]], steps: [L(l, 'Tiang berdiri tegak di atas tanah, membentuk siku-siku.', 'The pole stands straight up, making a right angle.')] }),
  (l) => ({ q: L(l, 'Garis-garis pada buku tulis bergaris saling …', 'The lines on lined paper are …'), ok: L(l, 'sejajar', 'parallel'), bad: [[L(l, 'tegak lurus', 'perpendicular'), L(l, 'Garis-garis itu tidak pernah bertemu.', 'Those lines never meet.')]], steps: [L(l, 'Jaraknya sama dan tidak bertemu.', 'Same distance apart, never meeting.')] }),
  (l) => ({ q: L(l, 'Sisi bawah dan sisi kiri persegi panjang saling …', 'The bottom side and the left side of a rectangle are …'), ok: L(l, 'tegak lurus', 'perpendicular'), bad: [[L(l, 'sejajar', 'parallel'), L(l, 'Kedua sisi bertemu di pojok.', 'The two sides meet at a corner.')]], steps: [L(l, 'Keduanya bertemu di pojok yang siku-siku.', 'They meet at a right-angled corner.')] }),
  (l) => ({ q: L(l, 'Sisi atas dan sisi bawah persegi panjang saling …', 'The top and bottom sides of a rectangle are …'), ok: L(l, 'sejajar', 'parallel'), bad: [[L(l, 'tegak lurus', 'perpendicular'), L(l, 'Sisi atas dan bawah tidak bertemu.', 'The top and bottom do not meet.')]], steps: [L(l, 'Sisi yang berhadapan pada persegi panjang sejajar.', 'Opposite sides of a rectangle are parallel.')] }),
  (l) => ({ q: L(l, 'Persegi panjang punya berapa pasang sisi yang sejajar?', 'How many pairs of parallel sides does a rectangle have?'), ok: '2', bad: [['1', L(l, 'Atas-bawah sejajar, kiri-kanan juga sejajar.', 'Top-bottom is one pair, left-right is another.')], ['4', L(l, 'Ada 4 sisi, tetapi pasangannya hanya 2.', 'There are 4 sides but only 2 pairs.')]], steps: [L(l, 'Atas dengan bawah, kiri dengan kanan.', 'Top with bottom, left with right.'), L(l, 'Ada 2 pasang.', '2 pairs.')] }),
  (l) => ({ q: L(l, 'Persegi punya berapa sudut siku-siku?', 'How many right angles does a square have?'), ok: '4', bad: [['2', L(l, 'Setiap pojok persegi siku-siku.', 'Every corner of a square is a right angle.')], ['0', L(l, 'Pojok persegi seperti pojok buku.', 'A square corner is like a book corner.')]], steps: [L(l, 'Persegi punya 4 pojok, semuanya siku-siku.', 'A square has 4 corners, all right angles.')] }),
  (l) => ({ q: L(l, 'Dua garis yang jaraknya selalu sama dan tidak pernah bertemu disebut …', 'Two lines that stay the same distance apart and never meet are …'), ok: L(l, 'sejajar', 'parallel'), bad: [[L(l, 'tegak lurus', 'perpendicular'), L(l, 'Garis tegak lurus bertemu.', 'Perpendicular lines meet.')], [L(l, 'berpotongan', 'crossing'), L(l, 'Garis berpotongan bertemu di satu titik.', 'Crossing lines meet at a point.')]], steps: [L(l, 'Tidak pernah bertemu: sejajar.', 'Never meet: parallel.')] }),
  (l) => ({ q: L(l, 'Garis tegak lurus bertemu dan membentuk sudut …', 'Perpendicular lines meet and make …'), ok: L(l, 'siku-siku', 'a right angle'), bad: [[L(l, 'lebih kecil dari siku-siku', 'an angle smaller than a right angle'), L(l, 'Itu garis berpotongan biasa.', 'That is just crossing lines.')], [L(l, 'tidak ada sudut', 'no angle'), L(l, 'Garis yang bertemu selalu membentuk sudut.', 'Lines that meet always make an angle.')]], steps: [L(l, 'Tegak lurus berarti bertemu dengan sudut siku-siku.', 'Perpendicular means meeting at a right angle.')] }),
  (l) => ({ q: L(l, 'Anak tangga pada tangga saling …', 'The rungs of a ladder are …'), ok: L(l, 'sejajar', 'parallel'), bad: [[L(l, 'tegak lurus', 'perpendicular'), L(l, 'Anak tangga tidak saling bertemu.', 'The rungs do not meet each other.')]], steps: [L(l, 'Anak tangga berjarak sama dan tidak bertemu.', 'The rungs are evenly spaced and never meet.')] }),
  (l) => ({ q: L(l, 'Kaki meja dan permukaan lantai saling …', 'A table leg and the floor are …'), ok: L(l, 'tegak lurus', 'perpendicular'), bad: [[L(l, 'sejajar', 'parallel'), L(l, 'Kaki meja menyentuh lantai.', 'The leg touches the floor.')]], steps: [L(l, 'Kaki meja berdiri tegak di lantai: siku-siku.', 'The leg stands straight up from the floor: a right angle.')] }),
]);

// ---------- Bab 5: Tabel ----------
const COLORS = [['merah', 'red'], ['biru', 'blue'], ['hijau', 'green'], ['kuning', 'yellow'], ['ungu', 'purple']];
const rawCount = (rnd, lang) => {
  const cols = sample(rnd, COLORS, 3);
  const cnt = cols.map(() => ri(rnd, 1, 5));
  const data = [];
  cols.forEach((c, i) => {
    for (let k = 0; k < cnt[i]; k++) data.push(i);
  });
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  const total = rnd() < 0.3;
  const t = ri(rnd, 0, 2);
  return num({
    q: L(lang, `Warna kesukaan anak: ${data.map((i) => cols[i][0]).join(', ')}. ${total ? 'Berapa anak semuanya?' : `Berapa anak yang memilih ${cols[t][0]}?`}`, `Favourite colours: ${data.map((i) => cols[i][1]).join(', ')}. ${total ? 'How many children in all?' : `How many children chose ${cols[t][1]}?`}`),
    ans: total ? data.length : cnt[t],
    wrong: total ? [[3, L(lang, 'Itu banyak warna. Hitung setiap anak.', 'That is the number of colours. Count every child.')], [data.length - 1, L(lang, 'Ada yang terlewat. Coret setiap data yang sudah dihitung.', 'One was missed. Cross off each one as you count.')]] : [[cnt[t] + 1, L(lang, 'Ada yang terhitung dua kali. Coret yang sudah dihitung.', 'One was counted twice. Cross off as you count.')], [cnt[t] - 1, L(lang, 'Ada yang terlewat.', 'One was missed.')]],
    steps: [L(lang, `Kelompokkan: ${cols.map((c, i) => `${c[0]} ${cnt[i]}`).join(', ')}.`, `Group them: ${cols.map((c, i) => `${c[1]} ${cnt[i]}`).join(', ')}.`), total ? `${cnt.join(' + ')} = ${data.length}.` : L(lang, `${cap(cols[t][0])}: ${cnt[t]}.`, `${cap(cols[t][1])}: ${cnt[t]}.`)],
    meta: { data, total, t },
  });
};
rawCount.solve = (m) => (m.total ? m.data.length : m.data.filter((x) => x === m.t).length);

const tallyGroups = (rnd, lang) => {
  const g = ri(rnd, 1, 4);
  const r = ri(rnd, 0, 4);
  const c = pick(rnd, COLORS);
  return num({
    q: L(lang, `Turus untuk warna ${c[0]} berisi ${g} ikatan dan ${r} garis lagi. Banyaknya …`, `The tally for ${c[1]} has ${g} ${g > 1 ? 'bundles' : 'bundle'} and ${r} more ${r === 1 ? 'line' : 'lines'}. How many is that?`),
    ans: g * 5 + r,
    wrong: [[g + r, L(lang, 'Satu ikatan bernilai 5, bukan 1.', 'One bundle is worth 5, not 1.')], [g * 4 + r, L(lang, 'Satu ikatan berisi 4 garis tegak dan 1 garis miring: 5.', 'A bundle is 4 upright lines and 1 slanted line: 5.')]],
    steps: [`${g} × 5 = ${g * 5}.`, `${g * 5} + ${r} = ${g * 5 + r}.`],
    meta: { g, r },
  });
};
tallyGroups.solve = (m) => 5 * m.g + m.r;

const tablePool = pool([
  (l) => ({ q: L(l, 'Bagian paling atas tabel yang berisi nama setiap kolom disebut …', 'The top part of a table that names each column is the …'), ok: L(l, 'judul kolom', 'column heading'), bad: [[L(l, 'baris terakhir', 'last row'), L(l, 'Baris terakhir ada di bawah.', 'The last row is at the bottom.')], [L(l, 'jumlah', 'total'), L(l, 'Jumlah adalah hasil penjumlahan data.', 'The total is the sum of the data.')]], steps: [L(l, 'Judul kolom memberi tahu isi setiap kolom.', 'Column headings tell what each column holds.')] }),
  (l) => ({ q: L(l, 'Mengapa data ditulis dalam tabel?', 'Why do we write data in a table?'), ok: L(l, 'supaya mudah dibaca dan dibandingkan', 'so it is easy to read and compare'), bad: [[L(l, 'supaya datanya bertambah', 'so the data grows'), L(l, 'Tabel tidak menambah data.', 'A table does not add data.')], [L(l, 'supaya angkanya berubah', 'so the numbers change'), L(l, 'Angkanya tetap sama.', 'The numbers stay the same.')]], steps: [L(l, 'Tabel merapikan data.', 'A table tidies up data.')] }),
  (l) => ({ q: L(l, 'Pada turus, garis miring dibuat pada garis ke- …', 'In a tally, the slanted line is the … line.'), ok: '5', bad: [['4', L(l, 'Empat garis tegak dulu, lalu yang kelima miring.', 'Four upright lines first, then the fifth is slanted.')], ['10', L(l, 'Setiap ikatan berisi 5 garis.', 'Each bundle has 5 lines.')]], steps: [L(l, 'Garis ke-5 dibuat miring untuk mengikat.', 'The 5th line is slanted to tie the bundle.')] }),
  (l) => ({ q: L(l, 'Sebelum membuat tabel dari data acak, langkah pertama adalah …', 'Before making a table from messy data, the first step is to …'), ok: L(l, 'mengelompokkan data yang sama', 'group the same data together'), bad: [[L(l, 'menjumlah semua angka', 'add up all the numbers'), L(l, 'Data perlu dikelompokkan dulu.', 'The data must be grouped first.')], [L(l, 'menghapus data', 'delete some data'), L(l, 'Semua data harus dipakai.', 'All data must be used.')]], steps: [L(l, 'Kelompokkan, hitung, lalu tulis di tabel.', 'Group, count, then write in the table.')] }),
  (l) => ({ q: L(l, 'Tabel buah: apel 6, jeruk 4. Kolom pertama berisi …', 'Fruit table: apple 6, orange 4. The first column holds …'), ok: L(l, 'nama buah', 'the fruit names'), bad: [[L(l, 'banyak anak', 'the number of children'), L(l, 'Banyak anak ada di kolom kedua.', 'The numbers are in the second column.')], [L(l, 'jumlah semua', 'the total'), L(l, 'Jumlah tidak ditulis di kolom pertama.', 'The total is not in the first column.')]], steps: [L(l, 'Kolom pertama: nama. Kolom kedua: banyaknya.', 'First column: names. Second column: amounts.')] }),
  (l) => ({ q: L(l, 'Tabel: bola 3, renang 5, lari 2. Kegiatan yang paling disukai adalah …', 'Table: football 3, swimming 5, running 2. The most liked activity is …'), ok: L(l, 'renang', 'swimming'), bad: [[L(l, 'bola', 'football'), L(l, '3 kurang dari 5.', '3 is less than 5.')], [L(l, 'lari', 'running'), L(l, 'Lari paling sedikit.', 'Running is the least.')]], steps: [L(l, 'Cari angka terbesar: 5.', 'Find the biggest number: 5.')] }),
  (l) => ({ q: L(l, 'Turus ini: |||| dicoret, lalu |||. Banyaknya …', 'This tally: a crossed bundle, then |||. How many?'), ok: '8', bad: [['7', L(l, 'Satu ikatan bernilai 5. 5 + 3 = 8.', 'A bundle is 5. 5 + 3 = 8.')], ['4', L(l, 'Ikatan bernilai 5, bukan 1.', 'A bundle is worth 5, not 1.')]], steps: ['5 + 3 = 8.'] }),
  (l) => ({ q: L(l, 'Data tinggi badan sebaiknya diberi satuan di …', 'Height data should have its unit written in the …'), ok: L(l, 'judul kolom', 'column heading'), bad: [[L(l, 'tidak perlu ditulis', 'nowhere'), L(l, 'Tanpa satuan, angkanya tidak jelas.', 'Without a unit, the numbers are unclear.')], [L(l, 'nama anak', 'children\'s names'), L(l, 'Satuan ditulis di judul kolom angka.', 'The unit goes in the heading of the number column.')]], steps: [L(l, 'Contoh judul kolom: tinggi (cm).', 'Example heading: height (cm).')] }),
  (l) => ({ q: L(l, 'Tabel: merah 4, biru 3, hijau 2, kuning 1. Berapa anak semuanya?', 'Table: red 4, blue 3, green 2, yellow 1. How many children in all?'), ok: '10', bad: [['4', L(l, 'Itu banyak warna, atau yang terbanyak saja.', 'That is just the number of colours, or the biggest.')], ['9', L(l, '4 + 3 + 2 + 1 = 10.', '4 + 3 + 2 + 1 = 10.')]], steps: ['4 + 3 + 2 + 1 = 10.'] }),
  (l) => ({ q: L(l, 'Pada tabel, satu baris biasanya berisi data tentang …', 'In a table, one row usually holds data about …'), ok: L(l, 'satu hal atau satu kelompok', 'one thing or one group'), bad: [[L(l, 'semua hal sekaligus', 'everything at once'), L(l, 'Setiap baris untuk satu kelompok.', 'Each row is for one group.')], [L(l, 'judul tabel saja', 'only the title'), L(l, 'Judul ada di atas, baris berisi data.', 'The title is on top; rows hold data.')]], steps: [L(l, 'Satu baris, satu kelompok data.', 'One row, one group of data.')] }),
]);

const DAYS = [['Senin', 'Monday'], ['Selasa', 'Tuesday'], ['Rabu', 'Wednesday'], ['Kamis', 'Thursday'], ['Jumat', 'Friday']];
const CTX = [['buku dipinjam', 'books borrowed', 'buku yang dipinjam', 'books borrowed'], ['pengunjung kantin', 'canteen visitors', 'pengunjung kantin', 'canteen visitors'], ['botol terkumpul', 'bottles collected', 'botol yang terkumpul', 'bottles collected']];
const readTable = (rnd, lang) => {
  const v = sample(rnd, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20], 5);
  const c = pick(rnd, CTX);
  const kind = pick(rnd, ['one', 'diff', 'sum']);
  const [i, j] = sample(rnd, [0, 1, 2, 3, 4], 2);
  const d = (k) => L(lang, DAYS[k][0], DAYS[k][1]);
  const [hi, lo] = v[i] > v[j] ? [i, j] : [j, i];
  const ans = kind === 'one' ? v[i] : kind === 'diff' ? v[hi] - v[lo] : v[i] + v[j];
  return num({
    q: kind === 'one' ? L(lang, `Berapa ${c[2]} pada hari ${d(i)}?`, `How many ${c[3]} on ${d(i)}?`) : kind === 'diff' ? L(lang, `Selisih ${c[2]} hari ${d(hi)} dan ${d(lo)} adalah …`, `The difference between ${d(hi)} and ${d(lo)} is …`) : L(lang, `Jumlah ${c[2]} hari ${d(i)} dan ${d(j)} adalah …`, `The total for ${d(i)} and ${d(j)} is …`),
    fig: [table('tb', 200, 145, [[L(lang, 'hari', 'day'), L(lang, c[0], c[1])], ...v.map((x, k) => [d(k), String(x)])], { cw: [120, 170], rh: 32, size: 16, head: true })],
    ans,
    wrong: kind === 'one' ? [[v[(i + 1) % 5], L(lang, 'Itu baris hari lain. Cari nama harinya dulu.', 'That is another day\'s row. Find the day first.')]] : kind === 'diff' ? [[v[hi] + v[lo], L(lang, 'Selisih dicari dengan pengurangan.', 'Find the difference by subtracting.')]] : [[v[hi] - v[lo], L(lang, 'Jumlah dicari dengan penjumlahan.', 'Find the total by adding.')]],
    steps: kind === 'one' ? [L(lang, `Baris ${d(i)}: ${v[i]}.`, `${d(i)} row: ${v[i]}.`)] : [L(lang, `${d(i)}: ${v[i]}, ${d(j)}: ${v[j]}.`, `${d(i)}: ${v[i]}, ${d(j)}: ${v[j]}.`), kind === 'diff' ? `${v[hi]} − ${v[lo]} = ${ans}.` : `${v[i]} + ${v[j]} = ${ans}.`],
    meta: { kind, v, i, j },
  });
};
readTable.solve = (m) => (m.kind === 'one' ? m.v[m.i] : m.kind === 'diff' ? Math.abs(m.v[m.i] - m.v[m.j]) : m.v[m.i] + m.v[m.j]);

const tableMost = (rnd, lang) => {
  const v = sample(rnd, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 5);
  const c = pick(rnd, CTX);
  const most = rnd() < 0.5;
  const k = v.indexOf(most ? Math.max(...v) : Math.min(...v));
  const d = (x) => L(lang, DAYS[x][0], DAYS[x][1]);
  return mc({
    q: L(lang, `Hari dengan ${c[2]} paling ${most ? 'banyak' : 'sedikit'} adalah …`, `The day with the ${most ? 'most' : 'fewest'} ${c[3]} is …`),
    fig: [table('tb', 200, 145, [[L(lang, 'hari', 'day'), L(lang, c[0], c[1])], ...v.map((x, q) => [d(q), String(x)])], { cw: [120, 170], rh: 32, size: 16, head: true })],
    ok: d(k),
    bad: [0, 1, 2, 3, 4].filter((x) => x !== k).map((x) => [d(x), L(lang, `${d(x)}: ${v[x]}. Bandingkan semua angka.`, `${d(x)}: ${v[x]}. Compare all the numbers.`)]),
    max: 3,
    steps: [L(lang, `Angka paling ${most ? 'besar' : 'kecil'}: ${v[k]}.`, `The ${most ? 'biggest' : 'smallest'} number: ${v[k]}.`), L(lang, `Harinya ${d(k)}.`, `The day is ${d(k)}.`)],
    meta: { v, most },
  });
};
tableMost.solve = (m, lang) => {
  const x = m.most ? Math.max(...m.v) : Math.min(...m.v);
  const k = m.v.indexOf(x);
  return L(lang, DAYS[k][0], DAYS[k][1]);
};

export const K3 = {
  'k3b1-1': [readHTO, placeH],
  'k3b1-2': [cmp1000, order1000],
  'k3b1-3': [colAdd, colSub],
  'k3b2-1': [boxEq, storySentence, missingStory],
  'k3b2-2': [mulFact, arrayCount],
  'k3b2-3': [divFact, divStory],
  'k3b3-1': [rulerRead, cmDiff],
  'k3b3-2': [mCm, unitLen],
  'k3b3-3': [kgG, unitW],
  'k3b4-1': [angleKind, clockAngle],
  'k3b4-2': [linePair, lineExamples],
  'k3b5-1': [rawCount, tallyGroups, tablePool],
  'k3b5-2': [readTable, tableMost],
};
