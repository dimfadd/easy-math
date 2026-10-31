// Generator soal Kelas 2 SD.
import { L, ri, pick, num, mc, pool, names, name, sample, cap, words } from './common.js';
import { txt, row } from '../util.js';
import { blocks } from '../../k2/kit.js';
import { box, balance, table } from '../../helpers.js';

const THINGS = [
  ['kelereng', 'marbles'],
  ['pensil', 'pencils'],
  ['permen', 'sweets'],
  ['buku', 'books'],
  ['kartu', 'cards'],
  ['stiker', 'stickers'],
  ['manik-manik', 'beads'],
  ['telur', 'eggs'],
];
const thing = (rnd) => pick(rnd, THINGS);
const tn = (lang, t) => L(lang, t[0], t[1]);

// ---------- Bab 1: Membilang sampai 50 ----------
const readBlocks = (rnd, lang) => {
  const t = ri(rnd, 1, 4);
  const s = ri(rnd, 0, 9);
  const n = t * 10 + s;
  return num({
    q: L(lang, 'Bilangan berapa ini?', 'What number is this?'),
    fig: blocks('f', t, s, 200 - (t * 24 + 30) / 2, 140, { gap: 24 }),
    ans: n,
    wrong: [
      [s * 10 + t, L(lang, `Puluhan ditulis di depan: ${t} puluhan, ${s} satuan.`, `Tens are written first: ${t} ten${t > 1 ? 's' : ''}, ${s} one${s === 1 ? '' : 's'}.`)],
      [t + s, L(lang, 'Setiap balok bernilai 10, bukan 1.', 'Each rod is worth 10, not 1.')],
      [n + 1, L(lang, 'Hitung kubus satuan sekali lagi dengan teliti.', 'Count the single cubes again carefully.')],
    ],
    steps: [L(lang, `${t} balok = ${t} puluhan = ${t * 10}.`, `${t} rod${t > 1 ? 's' : ''} = ${t} ten${t > 1 ? 's' : ''} = ${t * 10}.`), L(lang, `${t * 10} + ${s} = ${n}.`, `${t * 10} + ${s} = ${n}.`)],
    meta: { t, s },
  });
};
readBlocks.solve = (m) => m.t * 10 + m.s;

const placeTO = (rnd, lang) => {
  const kind = pick(rnd, ['make', 'tens', 'ones', 'word']);
  const t = ri(rnd, 1, 4);
  const s = ri(rnd, kind === 'ones' ? 1 : 0, 9);
  const n = t * 10 + s;
  if (kind === 'make')
    return num({
      q: L(lang, `${t} puluhan dan ${s} satuan adalah …`, `${t} tens and ${s} ones make …`),
      ans: n,
      wrong: [
        [s * 10 + t, L(lang, 'Puluhan ditulis di depan.', 'The tens digit is written first.')],
        [t + s, L(lang, `${t} puluhan = ${t * 10}, bukan ${t}.`, `${t} tens = ${t * 10}, not ${t}.`)],
      ],
      steps: [`${t * 10} + ${s}.`, `= ${n}.`],
      meta: { kind, t, s },
    });
  if (kind === 'word')
    return num({
      q: L(lang, `${cap(words(lang, n))} ditulis …`, `${cap(words(lang, n))} is written as …`),
      ans: n,
      wrong: [
        [s * 10 + t, L(lang, 'Angka puluhan ditulis di depan.', 'The tens digit comes first.')],
        [Number(`${t * 10}${s}`), L(lang, `${t * 10} dan ${s} ditulis ${n}.`, `${t * 10} and ${s} is written ${n}.`)],
      ],
      steps: [L(lang, `${t} puluhan dan ${s} satuan.`, `${t} tens and ${s} ones.`), `= ${n}.`],
      meta: { kind, t, s },
    });
  const tens = kind === 'tens';
  return num({
    q: tens ? L(lang, `Pada bilangan ${n}, ada berapa puluhan?`, `How many tens are in the number ${n}?`) : L(lang, `Pada bilangan ${n}, angka satuannya adalah …`, `In the number ${n}, the ones digit is …`),
    ans: tens ? t : s,
    wrong: tens
      ? [
          [s, L(lang, `${s} adalah satuannya.`, `${s} is the ones digit.`)],
          [t * 10, L(lang, `Nilainya ${t * 10}, tetapi banyak puluhannya ${t}.`, `Its value is ${t * 10}, but the number of tens is ${t}.`)],
        ]
      : [[t, L(lang, `${t} adalah angka puluhan, di depan.`, `${t} is the tens digit, in front.`)]],
    steps: [L(lang, `${n} = ${t} puluhan dan ${s} satuan.`, `${n} = ${t} tens and ${s} ones.`)],
    meta: { kind, t, s },
  });
};
placeTO.solve = (m) => (m.kind === 'make' || m.kind === 'word' ? 10 * m.t + m.s : m.kind === 'tens' ? m.t : m.s);

const compare50 = (rnd, lang) => {
  const a = ri(rnd, 10, 50);
  let b = ri(rnd, 10, 50);
  if (rnd() < 0.5) b = Math.floor(a / 10) * 10 + ri(rnd, 0, 9);
  while (b === a || b > 50) b = ri(rnd, 10, 50);
  const big = rnd() < 0.5;
  const ans = big ? Math.max(a, b) : Math.min(a, b);
  const other = ans === a ? b : a;
  const sameT = Math.floor(a / 10) === Math.floor(b / 10);
  return mc({
    q: L(lang, `Mana yang lebih ${big ? 'besar' : 'kecil'}, ${a} atau ${b}?`, `Which is ${big ? 'greater' : 'smaller'}, ${a} or ${b}?`),
    ok: String(ans),
    bad: [[String(other), sameT ? L(lang, 'Puluhannya sama, jadi bandingkan satuannya.', 'The tens are the same, so compare the ones.') : L(lang, 'Bandingkan puluhannya dulu, bukan satuannya.', 'Compare the tens first, not the ones.')]],
    fixed: true,
    steps: [sameT ? L(lang, `Puluhan sama. Satuan: ${a % 10} dan ${b % 10}.`, `Same tens. Ones: ${a % 10} and ${b % 10}.`) : L(lang, `Puluhan: ${Math.floor(a / 10)} dan ${Math.floor(b / 10)}.`, `Tens: ${Math.floor(a / 10)} and ${Math.floor(b / 10)}.`), L(lang, `Yang lebih ${big ? 'besar' : 'kecil'}: ${ans}.`, `The ${big ? 'greater' : 'smaller'} one: ${ans}.`)],
    meta: { a, b, big },
  });
};
compare50.solve = (m) => String(m.big ? Math.max(m.a, m.b) : Math.min(m.a, m.b));

const order50 = (rnd, lang) => {
  const kind = pick(rnd, ['max', 'min', 'after', 'before']);
  if (kind === 'after' || kind === 'before') {
    const after = kind === 'after';
    const n = after ? pick(rnd, [19, 29, 39, ri(rnd, 11, 48)]) : pick(rnd, [20, 30, 40, 50, ri(rnd, 12, 49)]);
    const ans = after ? n + 1 : n - 1;
    return num({
      q: L(lang, `Bilangan ${after ? 'sesudah' : 'sebelum'} ${n} adalah …`, `The number ${after ? 'after' : 'before'} ${n} is …`),
      ans,
      wrong: [
        [after ? n - 1 : n + 1, L(lang, `Itu bilangan ${after ? 'sebelum' : 'sesudah'} ${n}.`, `That is the number ${after ? 'before' : 'after'} ${n}.`)],
        [after && n % 10 === 9 ? n + 11 : null, L(lang, `Sesudah ${n} satuannya habis, jadi puluhannya bertambah satu: ${ans}.`, `After ${n} the ones run out, so the tens go up by one: ${ans}.`)],
      ],
      steps: [after ? `${n}, ${ans}.` : `${ans}, ${n}.`],
      meta: { kind, n },
    });
  }
  const set = new Set();
  while (set.size < 4) set.add(ri(rnd, 10, 50));
  const xs = [...set];
  const mx = kind === 'max';
  const ans = mx ? Math.max(...xs) : Math.min(...xs);
  const bigOnes = xs.reduce((p, x) => (x % 10 > p % 10 ? x : p), xs[0]);
  return num({
    q: L(lang, `Bilangan ${mx ? 'terbesar' : 'terkecil'} dari ${xs.join(', ')} adalah …`, `The ${mx ? 'greatest' : 'smallest'} number of ${xs.join(', ')} is …`),
    ans,
    wrong: [
      [mx ? Math.min(...xs) : Math.max(...xs), L(lang, `Itu yang ${mx ? 'terkecil' : 'terbesar'}.`, `That is the ${mx ? 'smallest' : 'greatest'}.`)],
      [mx ? bigOnes : null, L(lang, 'Satuannya memang besar, tetapi lihat puluhannya dulu.', 'Its ones digit is big, but look at the tens first.')],
    ],
    steps: [L(lang, 'Lihat puluhannya dulu, lalu satuannya.', 'Look at the tens first, then the ones.'), L(lang, `${mx ? 'Terbesar' : 'Terkecil'}: ${ans}.`, `${mx ? 'Greatest' : 'Smallest'}: ${ans}.`)],
    meta: { kind, xs },
  });
};
order50.solve = (m) => (m.kind === 'after' ? m.n + 1 : m.kind === 'before' ? m.n - 1 : m.kind === 'max' ? Math.max(...m.xs) : Math.min(...m.xs));

// ---------- Bab 2: Penjumlahan dan pengurangan ----------
// a + b tanpa menyimpan
const addPlain = (rnd, lang) => {
  const kind = pick(rnd, ['tt', 'to', 'tens', 'story']);
  let a;
  let b;
  if (kind === 'tens') {
    a = ri(rnd, 1, 8) * 10;
    b = ri(rnd, 1, 9 - a / 10) * 10;
  } else if (kind === 'to') {
    a = ri(rnd, 2, 8) * 10 + ri(rnd, 0, 8);
    b = ri(rnd, 1, 9 - (a % 10));
  } else {
    const at = ri(rnd, 1, 7);
    const as = ri(rnd, 0, 8);
    a = at * 10 + as;
    b = ri(rnd, 1, 9 - at) * 10 + ri(rnd, 0, 9 - as);
  }
  const s = a + b;
  const t = thing(rnd);
  const who = name(rnd);
  const q = kind === 'story' ? L(lang, `${who} punya ${a} ${t[0]}. Lalu ${who} mendapat ${b} ${t[0]} lagi. Sekarang ${t[0]} ${who} ada …`, `${who} has ${a} ${t[1]} and then gets ${b} more. How many ${t[1]} does ${who} have now?`) : `${a} + ${b} = …`;
  return num({
    q,
    ans: s,
    wrong: [
      [Math.abs(a - b), L(lang, 'Itu pengurangan. Soal ini penjumlahan.', 'That is subtracting. This one is adding.')],
      [b < 10 ? Math.floor(a / 10) * 10 + b * 10 + (a % 10) : null, L(lang, `${b} adalah satuan, jadi dijumlah dengan satuan ${a % 10}.`, `${b} is ones, so add it to the ones digit ${a % 10}.`)],
      [s + 10, L(lang, 'Tidak ada yang perlu disimpan. Jumlahkan puluhan dengan puluhan saja.', 'Nothing needs carrying. Just add tens to tens.')],
    ],
    steps: [
      L(lang, `Satuan: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}.`, `Ones: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}.`),
      L(lang, `Puluhan: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} = ${Math.floor(a / 10) + Math.floor(b / 10)}.`, `Tens: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} = ${Math.floor(a / 10) + Math.floor(b / 10)}.`),
      L(lang, `Hasilnya ${s}.`, `The answer is ${s}.`),
    ],
    meta: { a, b },
  });
};
addPlain.solve = (m) => m.a + m.b;

const subPlain = (rnd, lang) => {
  const kind = pick(rnd, ['tt', 'to', 'tens', 'story']);
  let a;
  let b;
  if (kind === 'tens') {
    a = ri(rnd, 3, 9) * 10;
    b = ri(rnd, 1, a / 10 - 1) * 10;
  } else if (kind === 'to') {
    a = ri(rnd, 2, 9) * 10 + ri(rnd, 2, 9);
    b = ri(rnd, 1, a % 10);
  } else {
    const at = ri(rnd, 2, 9);
    const as = ri(rnd, 1, 9);
    a = at * 10 + as;
    b = ri(rnd, 1, at - 1) * 10 + ri(rnd, 0, as);
  }
  const d = a - b;
  const t = pick(rnd, [['balon', 'balloons', 'pecah', 'burst'], ['kue', 'cakes', 'dimakan', 'are eaten'], ['kelereng', 'marbles', 'diberikan kepada adik', 'are given to a little brother'], ['jeruk', 'oranges', 'dijual', 'are sold']]);
  const q = kind === 'story' ? L(lang, `Ada ${a} ${t[0]}. ${b} ${t[0]} ${t[2]}. ${cap(t[0])} yang tersisa ada …`, `There are ${a} ${t[1]}. ${b} ${t[1]} ${t[3]}. How many ${t[1]} are left?`) : `${a} − ${b} = …`;
  return num({
    q,
    ans: d,
    wrong: [
      [a + b, L(lang, 'Itu penjumlahan. Yang ditanya sisanya, jadi dikurangi.', 'That is adding. The question asks what is left, so subtract.')],
      [b < 10 ? a - b * 10 : null, L(lang, `${b} adalah satuan. Kurangi dari satuan ${a % 10}.`, `${b} is ones. Take it from the ones digit ${a % 10}.`)],
      [d + 10, L(lang, 'Periksa lagi puluhannya.', 'Check the tens again.')],
    ],
    steps: [
      L(lang, `Satuan: ${a % 10} − ${b % 10} = ${(a % 10) - (b % 10)}.`, `Ones: ${a % 10} − ${b % 10} = ${(a % 10) - (b % 10)}.`),
      L(lang, `Puluhan: ${Math.floor(a / 10)} − ${Math.floor(b / 10)} = ${Math.floor(a / 10) - Math.floor(b / 10)}.`, `Tens: ${Math.floor(a / 10)} − ${Math.floor(b / 10)} = ${Math.floor(a / 10) - Math.floor(b / 10)}.`),
      L(lang, `Hasilnya ${d}.`, `The answer is ${d}.`),
    ],
    meta: { a, b },
  });
};
subPlain.solve = (m) => m.a - m.b;

const addCarry = (rnd, lang) => {
  let a;
  let b;
  do {
    a = ri(rnd, 11, 79);
    b = rnd() < 0.4 ? ri(rnd, 3, 9) : ri(rnd, 11, 49);
  } while ((a % 10) + (b % 10) < 10 || a + b > 99);
  const s = a + b;
  const story = rnd() < 0.35;
  const who = name(rnd);
  const t = thing(rnd);
  return num({
    q: story ? L(lang, `${who} punya ${a} ${t[0]}, lalu mendapat ${b} ${t[0]} lagi. ${cap(t[0])} ${who} sekarang …`, `${who} has ${a} ${t[1]} and gets ${b} more. How many ${t[1]} now?`) : `${a} + ${b} = …`,
    ans: s,
    wrong: [
      [s - 10, L(lang, `Satuan ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Sepuluhnya disimpan menjadi 1 puluhan.`, `Ones ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Carry the ten as 1 ten.`)],
      [(Math.floor(a / 10) + Math.floor(b / 10)) * 100 + (a % 10) + (b % 10), L(lang, 'Hasil satuan lebih dari 9. Tukar 10 satuan dengan 1 puluhan.', 'The ones add to more than 9. Trade 10 ones for 1 ten.')],
    ],
    steps: [
      L(lang, `Satuan: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Tulis ${((a % 10) + (b % 10)) % 10}, simpan 1.`, `Ones: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Write ${((a % 10) + (b % 10)) % 10}, carry 1.`),
      L(lang, `Puluhan: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} + 1 = ${Math.floor(s / 10)}.`, `Tens: ${Math.floor(a / 10)} + ${Math.floor(b / 10)} + 1 = ${Math.floor(s / 10)}.`),
      L(lang, `Hasilnya ${s}.`, `The answer is ${s}.`),
    ],
    meta: { op: '+', a, b },
  });
};
addCarry.solve = (m) => m.a + m.b;

const subBorrow = (rnd, lang) => {
  let a;
  let b;
  do {
    a = ri(rnd, 20, 95);
    b = rnd() < 0.4 ? ri(rnd, 3, 9) : ri(rnd, 11, 59);
  } while (a % 10 >= b % 10 || b >= a);
  const d = a - b;
  const story = rnd() < 0.35;
  const who = name(rnd);
  return num({
    q: story ? L(lang, `${who} punya ${a} stiker. ${b} stiker ditempel di buku. Stiker yang tersisa …`, `${who} has ${a} stickers and sticks ${b} of them in a book. How many stickers are left?`) : `${a} − ${b} = …`,
    ans: d,
    wrong: [
      [Math.abs(Math.floor(a / 10) - Math.floor(b / 10)) * 10 + ((b % 10) - (a % 10)), L(lang, `Satuan ${a % 10} kurang dari ${b % 10}, jadi pinjam 1 puluhan. Jangan membalik ${b % 10} − ${a % 10}.`, `${a % 10} ones is less than ${b % 10}, so borrow 1 ten. Do not flip it to ${b % 10} − ${a % 10}.`)],
      [d + 10, L(lang, 'Setelah meminjam, puluhannya berkurang 1.', 'After borrowing, the tens go down by 1.')],
      [a + b, L(lang, 'Itu penjumlahan. Soal ini pengurangan.', 'That is adding. This is subtracting.')],
    ],
    steps: [
      L(lang, `Satuan ${a % 10} kurang dari ${b % 10}. Pinjam 1 puluhan: ${(a % 10) + 10} − ${b % 10} = ${(a % 10) + 10 - (b % 10)}.`, `${a % 10} is less than ${b % 10}. Borrow 1 ten: ${(a % 10) + 10} − ${b % 10} = ${(a % 10) + 10 - (b % 10)}.`),
      L(lang, `Puluhan: ${Math.floor(a / 10) - 1} − ${Math.floor(b / 10)} = ${Math.floor(a / 10) - 1 - Math.floor(b / 10)}.`, `Tens: ${Math.floor(a / 10) - 1} − ${Math.floor(b / 10)} = ${Math.floor(a / 10) - 1 - Math.floor(b / 10)}.`),
      L(lang, `Hasilnya ${d}.`, `The answer is ${d}.`),
    ],
    meta: { op: '-', a, b },
  });
};
subBorrow.solve = (m) => m.a - m.b;

// ---------- Bab 3: Bentuk ----------
const SH = { 3: ['segitiga', 'triangle'], 4: ['segi empat', 'quadrilateral'], 5: ['segi lima', 'pentagon'], 6: ['segi enam', 'hexagon'] };
const SHC = { 3: 'acc', 4: 'pos', 5: 'ok', 6: 'neg' };
const vtx = (x, y, n, r, rot) => Array.from({ length: n }, (_, i) => {
  const a = ((rot + (360 * i) / n) * Math.PI) / 180;
  return [x + r * Math.cos(a), y + r * Math.sin(a)];
});
// Segi-n; kadang tidak beraturan supaya anak menghitung, bukan menghafal bentuk
function polyN(id, n, rnd) {
  const pts = vtx(200, 150, n, 95, n === 4 ? -45 + ri(rnd, 0, 1) * 45 : -90 + ri(rnd, 0, 1) * 180).map(([x, y]) => [x + ri(rnd, -14, 14), y + ri(rnd, -12, 12)]);
  return { id, t: 'poly', x: 0, y: 0, pts, fill: `${SHC[n]}-soft`, stroke: SHC[n], sw: 3 };
}
const sidesCount = (rnd, lang) => {
  const n = ri(rnd, 3, 6);
  const what = pick(rnd, ['sides', 'corners']);
  const showFig = rnd() < 0.7;
  const w = what === 'sides' ? L(lang, 'sisi', 'sides') : L(lang, 'titik sudut', 'corners');
  return num({
    q: showFig ? L(lang, `Berapa banyak ${w} bentuk ini?`, `How many ${w} does this shape have?`) : L(lang, `${cap(SH[n][0])} punya berapa ${w}?`, `How many ${w} does a ${SH[n][1]} have?`),
    fig: showFig ? [polyN('s', n, rnd)] : undefined,
    ans: n,
    wrong: [
      [n + 1, L(lang, 'Ada yang terhitung dua kali. Beri tanda pada yang sudah dihitung.', 'One was counted twice. Mark each one as you count it.')],
      [n - 1, L(lang, 'Ada yang terlewat. Kelilingi bentuk sampai kembali ke awal.', 'One was missed. Go all the way round back to the start.')],
    ],
    steps: [L(lang, 'Hitung sambil menelusuri tepi bentuk.', 'Count as you trace around the edge.'), L(lang, `Banyak sisi = banyak titik sudut = ${n}.`, `Number of sides = number of corners = ${n}.`)],
    meta: { n },
  });
};
sidesCount.solve = (m) => m.n;

const shapeNameN = (rnd, lang) => {
  const n = ri(rnd, 3, 6);
  const showFig = rnd() < 0.6;
  const others = [3, 4, 5, 6].filter((k) => k !== n);
  return mc({
    q: showFig ? L(lang, 'Apa nama bentuk ini?', 'What is this shape called?') : L(lang, `Bentuk dengan ${n} sisi disebut …`, `A shape with ${n} sides is called a …`),
    fig: showFig ? [polyN('s', n, rnd)] : undefined,
    ok: L(lang, SH[n][0], SH[n][1]),
    bad: [...others.map((k) => [L(lang, SH[k][0], SH[k][1]), L(lang, `${cap(SH[k][0])} punya ${k} sisi.`, `A ${SH[k][1]} has ${k} sides.`)]), [L(lang, 'lingkaran', 'circle'), L(lang, 'Lingkaran tidak punya sisi lurus.', 'A circle has no straight sides.')]],
    max: 4,
    steps: [L(lang, `Ada ${n} sisi.`, `There are ${n} sides.`), L(lang, `Bentuk dengan ${n} sisi adalah ${SH[n][0]}.`, `A shape with ${n} sides is a ${SH[n][1]}.`)],
    meta: { n },
  });
};
shapeNameN.solve = (m, lang) => L(lang, SH[m.n][0], SH[m.n][1]);

// Persegi berjajar, kadang dipotong diagonal menjadi segitiga
const countPieces = (rnd, lang) => {
  const k = ri(rnd, 2, 4);
  const rows = rnd() < 0.4 ? 2 : 1;
  const tri = rnd() < 0.5;
  const S = 60;
  const x0 = 200 - (k * S) / 2;
  const y0 = 150 - (rows * S) / 2;
  const fig = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < k; c++) {
      const x = x0 + c * S + S / 2;
      const y = y0 + r * S + S / 2;
      fig.push({ id: `q${r}_${c}`, t: 'rect', x, y, w: S, h: S, r: 0, fill: tri ? 'acc-soft' : 'pos-soft', stroke: tri ? 'acc' : 'pos', sw: 3 });
      if (tri) fig.push({ id: `d${r}_${c}`, t: 'line', x: x - S / 2, y: y - S / 2, x2: x + S / 2, y2: y + S / 2, c: 'acc', sw: 3, draw: false });
    }
  const sq = k * rows;
  const ans = tri ? sq * 2 : sq;
  return num({
    q: tri ? L(lang, 'Setiap persegi dipotong garis miring. Berapa segitiga dalam gambar ini?', 'Each square is cut by a slanted line. How many triangles are in the picture?') : L(lang, 'Berapa persegi kecil dalam gambar ini?', 'How many small squares are in the picture?'),
    fig,
    ans,
    wrong: tri ? [[sq, L(lang, 'Itu banyak persegi. Setiap persegi terbelah menjadi 2 segitiga.', 'That is the number of squares. Each square splits into 2 triangles.')], [ans + 1, L(lang, 'Hitung lagi satu per satu.', 'Count again one by one.')]] : [[sq + 1, L(lang, 'Persegi besar di luar tidak dihitung. Hitung yang kecil saja.', 'Do not count the big outline. Count only the small squares.')], [sq * 4, L(lang, 'Itu banyak sisi. Yang ditanya banyak persegi.', 'That counts sides. The question asks for squares.')]],
    steps: tri ? [L(lang, `Ada ${sq} persegi.`, `There are ${sq} squares.`), L(lang, `Setiap persegi = 2 segitiga: ${sq} + ${sq} = ${ans}.`, `Each square = 2 triangles: ${sq} + ${sq} = ${ans}.`)] : [L(lang, `${rows > 1 ? `${rows} baris, setiap baris ${k}` : `Satu baris berisi ${k}`}.`, `${rows > 1 ? `${rows} rows of ${k}` : `One row of ${k}`}.`), L(lang, `Semuanya ${ans} persegi.`, `${ans} squares in all.`)],
    meta: { k, rows, tri },
  });
};
countPieces.solve = (m) => m.k * m.rows * (m.tri ? 2 : 1);

const composePool = pool([
  (l) => ({ q: L(l, 'Dua segitiga siku-siku yang sama besar disatukan pada sisi miringnya. Bisa menjadi …', 'Two equal right triangles joined along their slanted sides can make a …'), ok: L(l, 'persegi', 'square'), bad: [[L(l, 'lingkaran', 'circle'), L(l, 'Lingkaran tidak punya sisi lurus.', 'A circle has no straight sides.')], [L(l, 'segi lima', 'pentagon'), L(l, 'Hasilnya punya 4 sisi, bukan 5.', 'The result has 4 sides, not 5.')]], steps: [L(l, 'Dua segitiga menutup dua bagian persegi.', 'The two triangles fill the two halves of a square.')] }),
  (l) => ({ q: L(l, 'Dua persegi sama besar ditempel berdampingan. Hasilnya …', 'Two equal squares placed side by side make a …'), ok: L(l, 'persegi panjang', 'rectangle'), bad: [[L(l, 'segitiga', 'triangle'), L(l, 'Hasilnya punya 4 sisi.', 'The result has 4 sides.')], [L(l, 'persegi yang lebih besar', 'bigger square'), L(l, 'Panjangnya jadi 2 kali lebarnya, jadi bukan persegi.', 'It is twice as long as it is wide, so not a square.')]], steps: [L(l, 'Panjangnya 2 sisi, lebarnya 1 sisi.', 'It is 2 sides long and 1 side wide.'), L(l, 'Itu persegi panjang.', 'That is a rectangle.')] }),
  (l) => ({ q: L(l, 'Persegi dipotong menurut garis diagonal. Hasilnya …', 'A square is cut along a diagonal. You get …'), ok: L(l, '2 segitiga', '2 triangles'), bad: [[L(l, '2 persegi', '2 squares'), L(l, 'Potongan miring menghasilkan bentuk bersisi 3.', 'A slanted cut gives 3-sided pieces.')], [L(l, '4 segitiga', '4 triangles'), L(l, 'Satu garis membelah menjadi 2 bagian saja.', 'One line cuts it into only 2 pieces.')]], steps: [L(l, 'Satu garis diagonal membelah persegi menjadi 2 segitiga.', 'One diagonal splits the square into 2 triangles.')] }),
  (l) => ({ q: L(l, 'Persegi dipotong dengan dua garis diagonal. Hasilnya berapa segitiga?', 'A square is cut along both diagonals. How many triangles?'), ok: '4', bad: [['2', L(l, 'Ada dua garis, jadi potongannya lebih dari 2.', 'There are two lines, so more than 2 pieces.')], ['3', L(l, 'Kedua garis bersilang di tengah dan membuat 4 bagian.', 'The lines cross in the middle and make 4 pieces.')], ['8', L(l, 'Hitung bagian yang terbentuk: hanya 4.', 'Count the pieces: there are only 4.')]], steps: [L(l, 'Dua diagonal bersilang di tengah.', 'The two diagonals cross in the middle.'), L(l, 'Terbentuk 4 segitiga.', '4 triangles are formed.')] }),
  (l) => ({ q: L(l, 'Persegi panjang dipotong tepat di tengah dari atas ke bawah. Hasilnya …', 'A rectangle is cut straight down the middle. You get …'), ok: L(l, '2 bentuk segi empat', '2 four-sided shapes'), bad: [[L(l, '2 segitiga', '2 triangles'), L(l, 'Potongan lurus tegak tidak membuat sudut lancip.', 'A straight up-and-down cut does not make triangles.')], [L(l, '3 bentuk segi empat', '3 four-sided shapes'), L(l, 'Satu potongan membuat 2 bagian.', 'One cut makes 2 pieces.')]], steps: [L(l, 'Setiap potongan masih punya 4 sisi.', 'Each piece still has 4 sides.')] }),
  (l) => ({ q: L(l, 'Berapa persegi kecil untuk menyusun persegi besar yang 2 kali lebih lebar dan 2 kali lebih tinggi?', 'How many small squares make a big square twice as wide and twice as tall?'), ok: '4', bad: [['2', L(l, '2 persegi berjajar hanya membuat persegi panjang.', '2 squares in a row only make a rectangle.')], ['3', L(l, 'Susunannya 2 baris berisi 2.', 'It is 2 rows of 2.')], ['6', L(l, '2 baris berisi 2 adalah 4.', '2 rows of 2 is 4.')]], steps: [L(l, '2 baris, setiap baris 2 persegi.', '2 rows of 2 squares.'), '2 + 2 = 4.'] }),
  (l) => ({ q: L(l, 'Tiga segitiga sama besar disusun menjadi satu bentuk. Berapa titik sudut setiap segitiga?', 'Three equal triangles are put together. How many corners does each triangle have?'), ok: '3', bad: [['9', L(l, 'Yang ditanya titik sudut satu segitiga.', 'The question asks about one triangle.')], ['4', L(l, 'Segitiga punya 3 titik sudut.', 'A triangle has 3 corners.')]], steps: [L(l, 'Segitiga selalu punya 3 sisi dan 3 titik sudut.', 'A triangle always has 3 sides and 3 corners.')] }),
  (l) => ({ q: L(l, 'Untuk membuat persegi panjang dari segitiga siku-siku yang sama, paling sedikit dibutuhkan …', 'To make a rectangle from equal right triangles, the fewest you need is …'), ok: L(l, '2 segitiga', '2 triangles'), bad: [[L(l, '1 segitiga', '1 triangle'), L(l, 'Satu segitiga hanya setengah persegi panjang.', 'One triangle is only half a rectangle.')], [L(l, '3 segitiga', '3 triangles'), L(l, 'Dua sudah cukup: masing-masing setengah.', 'Two is enough: each is one half.')]], steps: [L(l, 'Segitiga siku-siku adalah setengah persegi panjang.', 'A right triangle is half a rectangle.'), L(l, 'Dua setengah menjadi satu utuh.', 'Two halves make a whole.')] }),
  (l) => ({ q: L(l, 'Empat persegi sama besar disusun berjajar dalam satu baris. Hasilnya …', 'Four equal squares are lined up in one row. They make a …'), ok: L(l, 'persegi panjang', 'rectangle'), bad: [[L(l, 'persegi', 'square'), L(l, 'Panjangnya 4 kali lebarnya, jadi bukan persegi.', 'It is 4 times as long as it is wide, so not a square.')], [L(l, 'segi enam', 'hexagon'), L(l, 'Garis tepi luarnya hanya 4 sisi.', 'The outline has only 4 sides.')]], steps: [L(l, 'Garis tepi luar punya 4 sisi, dua panjang dan dua pendek.', 'The outline has 4 sides, two long and two short.')] }),
  (l) => ({ q: L(l, 'Segi enam bisa dipotong menjadi segitiga dari titik tengahnya. Berapa segitiga?', 'A hexagon can be cut into triangles from its centre. How many triangles?'), ok: '6', bad: [['3', L(l, 'Setiap sisi segi enam menjadi alas satu segitiga.', 'Each side of the hexagon is the base of one triangle.')], ['4', L(l, 'Segi enam punya 6 sisi, jadi ada 6 segitiga.', 'A hexagon has 6 sides, so there are 6 triangles.')], ['12', L(l, 'Satu segitiga untuk setiap sisi: 6.', 'One triangle per side: 6.')]], steps: [L(l, 'Tarik garis dari tengah ke setiap titik sudut.', 'Draw a line from the centre to each corner.'), L(l, '6 sisi, jadi 6 segitiga.', '6 sides, so 6 triangles.')] }),
]);

// ---------- Bab 4: Posisi dan pola ----------
const CX = [130, 200, 270];
const CY = [70, 140, 210];
const OBJ = [
  ['apel', 'apple', (id, x, y) => ({ id, t: 'icon', name: 'apple', x, y, size: 46 })],
  ['bintang', 'star', (id, x, y) => ({ id, t: 'icon', name: 'star', x, y, size: 46 })],
  ['bola', 'ball', (id, x, y) => ({ id, t: 'circle', x, y, r: 20, fill: 'pos', stroke: 'ink', sw: 1.5 })],
  ['buku', 'book', (id, x, y) => box(id, x, y, 34, 44, { fill: 'ok-soft', stroke: 'ok', sw: 2.5, r: 3 })],
  ['kotak', 'box', (id, x, y) => box(id, x, y, 40, 30, { fill: 'acc-soft', stroke: 'acc', sw: 2.5, r: 3 })],
];
const shelfPath = () => {
  let d = '';
  for (let i = 0; i <= 3; i++) d += `M95,${35 + i * 70} H305 `;
  for (let j = 0; j <= 3; j++) d += `M${95 + j * 70},35 V245 `;
  return { id: 'rak', t: 'path', x: 0, y: 0, d: d.trim(), stroke: 'ink', sw: 2.5, z: -1 };
};
const DIRS = { atas: [0, -1, 'above'], bawah: [0, 1, 'below'], kiri: [-1, 0, 'left of'], kanan: [1, 0, 'right of'] };
// Tata letak acak: 5 benda di rak 3 × 3, dengan satu pasangan bertetangga pada arah tertentu
function layout(rnd) {
  const cells = sample(rnd, Array.from({ length: 9 }, (_, i) => [i % 3, Math.floor(i / 3)]), 5);
  return cells.map((c, i) => ({ o: OBJ[i], c: c[0], r: c[1] }));
}
const shelfFig = (lay) => [shelfPath(), ...lay.map((it, i) => it.o[2](`i${i}`, CX[it.c], CY[it.r]))];
function neighbourPairs(lay) {
  const out = [];
  for (const a of lay)
    for (const [dir, [dx, dy]] of Object.entries(DIRS)) {
      const b = lay.find((x) => x.c === a.c + dx && x.r === a.r + dy);
      if (b) out.push([a, dir, b]);
    }
  return out;
}
const whichAt = (rnd, lang) => {
  let lay;
  let pairs;
  do {
    lay = layout(rnd);
    pairs = neighbourPairs(lay);
  } while (!pairs.length);
  const [ref, dir, ans] = pick(rnd, pairs);
  const others = lay.filter((x) => x !== ref && x !== ans);
  const dEn = DIRS[dir][2];
  return mc({
    q: L(lang, `Benda apa yang ada tepat di ${dir} ${ref.o[0]}?`, `What is right ${dEn} the ${ref.o[1]}?`),
    fig: shelfFig(lay),
    ok: L(lang, ans.o[0], ans.o[1]),
    bad: others.map((x) => [L(lang, x.o[0], x.o[1]), L(lang, `${cap(x.o[0])} tidak tepat di ${dir} ${ref.o[0]}. Cari dulu ${ref.o[0]}, lalu lihat ke ${dir}.`, `The ${x.o[1]} is not right ${dEn} the ${ref.o[1]}. Find the ${ref.o[1]} first, then look ${dir === 'atas' ? 'up' : dir === 'bawah' ? 'down' : dir === 'kiri' ? 'left' : 'right'}.`)]),
    max: 3,
    steps: [L(lang, `Cari ${ref.o[0]} dulu.`, `Find the ${ref.o[1]} first.`), L(lang, `Tepat di ${dir}nya ada ${ans.o[0]}.`, `Right ${dEn} it is the ${ans.o[1]}.`)],
    meta: { lay: lay.map((x) => [OBJ.indexOf(x.o), x.c, x.r]), ref: OBJ.indexOf(ref.o), dir },
  });
};
whichAt.solve = (m, lang) => {
  const [dx, dy] = DIRS[m.dir];
  const r = m.lay.find((x) => x[0] === m.ref);
  const hit = m.lay.find((x) => x[1] === r[1] + dx && x[2] === r[2] + dy);
  return L(lang, OBJ[hit[0]][0], OBJ[hit[0]][1]);
};

const whereIs = (rnd, lang) => {
  let lay;
  let pairs;
  do {
    lay = layout(rnd);
    pairs = neighbourPairs(lay);
  } while (!pairs.length);
  const [ref, dir, obj] = pick(rnd, pairs);
  const en = { atas: 'above', bawah: 'below', kiri: 'to the left of', kanan: 'to the right of' };
  const opp = { atas: 'bawah', bawah: 'atas', kiri: 'kanan', kanan: 'kiri' };
  return mc({
    q: L(lang, `${cap(obj.o[0])} ada di … ${ref.o[0]}.`, `The ${obj.o[1]} is … the ${ref.o[1]}.`),
    fig: shelfFig(lay),
    ok: L(lang, dir, en[dir]),
    bad: Object.keys(DIRS)
      .filter((d) => d !== dir)
      .map((d) => [L(lang, d, en[d]), d === opp[dir] ? L(lang, `Arahnya terbalik. Mulai dari ${ref.o[0]}, lalu cari ${obj.o[0]}.`, `That is the wrong way round. Start from the ${ref.o[1]}, then find the ${obj.o[1]}.`) : L(lang, `Mulai dari ${ref.o[0]}, lalu cari ${obj.o[0]}.`, `Start from the ${ref.o[1]}, then find the ${obj.o[1]}.`)]),
    fixed: true,
    steps: [L(lang, `Mulai dari ${ref.o[0]}.`, `Start at the ${ref.o[1]}.`), L(lang, `${cap(obj.o[0])} ada di ${dir}nya.`, `The ${obj.o[1]} is ${en[dir]} it.`)],
    meta: { lay: lay.map((x) => [OBJ.indexOf(x.o), x.c, x.r]), ref: OBJ.indexOf(ref.o), obj: OBJ.indexOf(obj.o) },
  });
};
whereIs.solve = (m, lang) => {
  const a = m.lay.find((x) => x[0] === m.ref);
  const b = m.lay.find((x) => x[0] === m.obj);
  const d = b[2] < a[2] ? 'atas' : b[2] > a[2] ? 'bawah' : b[1] < a[1] ? 'kiri' : 'kanan';
  return L(lang, d, { atas: 'above', bawah: 'below', kiri: 'to the left of', kanan: 'to the right of' }[d]);
};

const seqNext = (rnd, lang) => {
  const step = pick(rnd, [2, 3, 4, 5, 10]);
  const down = rnd() < 0.35;
  const len = 4;
  const start = down ? ri(rnd, step * (len + 1), step * (len + 1) + 20) : ri(rnd, 1, 20);
  const xs = Array.from({ length: len + 1 }, (_, i) => start + (down ? -1 : 1) * step * i);
  const gap = rnd() < 0.4 ? ri(rnd, 1, len - 1) : len;
  const shown = xs.map((x, i) => (i === gap ? '…' : String(x)));
  const ans = xs[gap];
  return num({
    q: gap === len ? L(lang, `${shown.slice(0, len).join(', ')}, … Bilangan berikutnya adalah …`, `${shown.slice(0, len).join(', ')}, … The next number is …`) : L(lang, `${shown.join(', ')}. Bilangan yang hilang adalah …`, `${shown.join(', ')}. The missing number is …`),
    ans,
    wrong: [
      [down ? ans - 1 : ans + 1, L(lang, `Aturannya ${down ? 'kurang' : 'tambah'} ${step}, bukan ${down ? 'kurang' : 'tambah'} 1.`, `The rule is ${down ? 'take away' : 'add'} ${step}, not 1.`)],
      [down ? ans + 2 * step : ans - 2 * step, L(lang, `Polanya ${down ? 'turun' : 'naik'}, bukan ${down ? 'naik' : 'turun'}.`, `The pattern goes ${down ? 'down' : 'up'}, not ${down ? 'up' : 'down'}.`)],
      [gap === len ? xs[len - 1] + (down ? -1 : 1) * (step + 1) : null, L(lang, `Selisih setiap bilangan tetap ${step}.`, `Each step is always ${step}.`)],
    ],
    steps: [L(lang, `Aturannya: ${down ? 'kurang' : 'tambah'} ${step}.`, `Rule: ${down ? 'take away' : 'add'} ${step}.`), L(lang, `Bilangan itu ${ans}.`, `The number is ${ans}.`)],
    meta: { shown: xs.map((x, i) => (i === gap ? '?' : x)), gap },
  });
};
seqNext.solve = (m) => {
  const known = m.shown.map((x, i) => [x, i]).filter(([x]) => x !== '?');
  const [[a, i], [b, j]] = [known[0], known[known.length - 1]];
  return a + ((b - a) / (j - i)) * (m.gap - i);
};

const PIC = {
  a: [['apel', 'apple'], (id, x, y) => ({ id, t: 'icon', name: 'apple', x, y, size: 34 })],
  s: [['bintang', 'star'], (id, x, y) => ({ id, t: 'icon', name: 'star', x, y, size: 34 })],
  b: [['bola', 'ball'], (id, x, y) => ({ id, t: 'circle', x, y, r: 14, fill: 'pos', stroke: 'ink', sw: 1.5 })],
  k: [['kotak', 'box'], (id, x, y) => box(id, x, y, 28, 24, { fill: 'acc-soft', stroke: 'acc', sw: 2.5, r: 3 })],
};
const UNITS = ['ab', 'aab', 'abb', 'abc', 'abcc'];
const picPattern = (rnd, lang) => {
  const u = pick(rnd, UNITS);
  const keys = sample(rnd, Object.keys(PIC), 3);
  const unit = [...u].map((ch) => keys['abc'.indexOf(ch)]);
  const n = ri(rnd, Math.max(5, unit.length + 2), 7);
  const seq = Array.from({ length: n + 1 }, (_, i) => unit[i % unit.length]);
  const ans = seq[n];
  const dx = 42;
  const x0 = 200 - (n * dx) / 2;
  const fig = [...seq.slice(0, n).map((k, i) => PIC[k][1](`p${i}`, x0 + i * dx, 140)), box('q', x0 + n * dx, 140, 32, 32, { r: 6, fill: 'paper', stroke: 'acc', sw: 2.5, label: '?', lsize: 18 })];
  const used = [...new Set(unit)];
  const nm = (k) => L(lang, PIC[k][0][0], PIC[k][0][1]);
  return mc({
    q: L(lang, 'Apa gambar berikutnya?', 'What comes next?'),
    fig,
    ok: nm(ans),
    bad: [...used, ...keys].filter((k) => k !== ans).map((k) => [nm(k), L(lang, `Bagian yang berulang: ${unit.map(nm).join(', ')}. Lanjutkan dari gambar terakhir.`, `The repeating part is ${unit.map(nm).join(', ')}. Carry on from the last picture.`)]),
    max: 3,
    steps: [L(lang, `Bagian yang berulang: ${unit.map(nm).join(', ')}.`, `Repeating part: ${unit.map(nm).join(', ')}.`), L(lang, `Berikutnya ${nm(ans)}.`, `Next comes the ${nm(ans)}.`)],
    meta: { unit, n },
  });
};
picPattern.solve = (m, lang) => {
  const k = m.unit[m.n % m.unit.length];
  return L(lang, PIC[k][0][0], PIC[k][0][1]);
};

// ---------- Bab 5: Setengah dan seperempat ----------
const partsRect = (p, x, y, n, filled, { w = 180, h = 90, c = 'acc', cuts } = {}) => {
  const xs = cuts || Array.from({ length: n + 1 }, (_, i) => (w / n) * i);
  return Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'rect', x: x - w / 2 + (xs[i] + xs[i + 1]) / 2, y, w: xs[i + 1] - xs[i], h, r: 0, fill: filled.includes(i) ? `${c}-soft` : 'paper', stroke: 'ink', sw: 2.5 }));
};
const pieN = (p, x, y, n, filled, r = 60) => [
  ...Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'arc', x, y, r, a1: 90 + (360 / n) * i, a2: 90 + (360 / n) * (i + 1), c: filled.includes(i) ? 'acc' : 'mut' })),
  { id: `${p}o`, t: 'circle', x, y, r, fill: 'none', stroke: 'ink', sw: 2.5 },
];
const shareOf = (k) => (rnd, lang) => {
  const per = ri(rnd, 1, k === 2 ? 10 : 6);
  const n = per * k;
  const ic = pick(rnd, ['apple', 'star']);
  const showFig = n <= 16 && rnd() < 0.5;
  const nm = ic === 'apple' ? L(lang, 'apel', 'apples') : L(lang, 'bintang', 'stars');
  const frac = k === 2 ? L(lang, 'Setengah', 'Half') : L(lang, 'Seperempat', 'A quarter');
  const story = !showFig && rnd() < 0.5;
  const [who] = names(rnd, 1);
  const t = thing(rnd);
  return num({
    q: showFig ? L(lang, `${frac} dari ${n} ${nm} adalah …`, `${frac} of ${n} ${nm} is …`) : story ? L(lang, `${who} punya ${n} ${t[0]}. ${frac} dari ${t[0]} itu diberikan kepada adik. Berapa yang diberikan?`, `${who} has ${n} ${t[1]} and gives ${frac.toLowerCase()} of them to a little sister. How many are given?`) : L(lang, `${frac} dari ${n} adalah …`, `${frac} of ${n} is …`),
    fig: showFig ? [...row('a', ic, Math.min(n, 8), 200, n > 8 ? 110 : 150, { dx: 42, size: 32 }), ...(n > 8 ? row('b', ic, n - 8, 200, 180, { dx: 42, size: 32 }) : [])] : undefined,
    ans: per,
    wrong: [
      [n - per, L(lang, `Itu sisanya. ${frac} berarti 1 dari ${k} bagian sama besar.`, `That is what is left. ${frac} means 1 of ${k} equal parts.`)],
      [n * k, L(lang, `Kita membagi menjadi ${k} bagian, bukan mengalikan.`, `We share into ${k} parts, not multiply.`)],
      [k === 4 ? n / 2 : null, L(lang, 'Itu setengah. Seperempat berarti dibagi 4 sama rata.', 'That is a half. A quarter means sharing into 4 equal parts.')],
    ],
    steps: [L(lang, `Bagi ${n} menjadi ${k} bagian sama besar.`, `Share ${n} into ${k} equal parts.`), L(lang, `Setiap bagian ${per}.`, `Each part is ${per}.`)],
    meta: { n, k },
  });
};
const halfOf = shareOf(2);
halfOf.solve = (m) => m.n / 2;
const quarterOf = shareOf(4);
quarterOf.solve = (m) => m.n / 4;

const whichHalf = (rnd, lang) => {
  const shape = pick(rnd, ['rect', 'pie']);
  const okA = rnd() < 0.5;
  const goodFig = (p, x) => (shape === 'rect' ? partsRect(p, x, 140, 2, [0], { w: 140, h: 90 }) : pieN(p, x, 140, 2, [0], 55));
  const badKind = pick(rnd, ['uneq', 'three']);
  const badFig = (p, x) => (badKind === 'uneq' ? partsRect(p, x, 140, 2, [0], { w: 140, h: 90, cuts: [0, 40, 140] }) : shape === 'pie' ? pieN(p, x, 140, 3, [0], 55) : partsRect(p, x, 140, 3, [0], { w: 140, h: 90 }));
  const xA = 105;
  const xB = 295;
  const fig = [...(okA ? goodFig('a', xA) : badFig('a', xA)), ...(okA ? badFig('b', xB) : goodFig('b', xB)), txt('la', 'A', xA, 225, { size: 22 }), txt('lb', 'B', xB, 225, { size: 22 })];
  const why = badKind === 'uneq' ? L(lang, 'Kedua bagiannya tidak sama besar.', 'The two parts are not the same size.') : L(lang, 'Gambar itu dibagi 3, bukan 2.', 'That picture is cut into 3, not 2.');
  return mc({
    q: L(lang, 'Gambar mana yang bagian berwarnanya setengah?', 'In which picture is the coloured part one half?'),
    fig,
    ok: okA ? 'A' : 'B',
    bad: [[okA ? 'B' : 'A', why]],
    fixed: true,
    steps: [L(lang, 'Setengah: dibagi 2 sama besar, diwarnai 1.', 'A half: cut into 2 equal parts, 1 is coloured.'), L(lang, `Gambar ${okA ? 'A' : 'B'} cocok.`, `Picture ${okA ? 'A' : 'B'} fits.`)],
    meta: { okA },
  });
};
whichHalf.solve = (m) => (m.okA ? 'A' : 'B');

const FRN = { '1/4': ['seperempat', 'a quarter'], '1/2': ['setengah', 'a half'], '1/1': ['satu utuh', 'one whole'], '3/4': ['tiga perempat', 'three quarters'] };
const nameFrac = (rnd, lang) => {
  const n = rnd() < 0.7 ? 4 : 2;
  const k = n === 4 ? pick(rnd, [1, 2, 4]) : pick(rnd, [1, 2]);
  const key = k === n ? '1/1' : n === 4 && k === 1 ? '1/4' : '1/2';
  const shape = pick(rnd, ['rect', 'pie']);
  const filled = sample(rnd, Array.from({ length: n }, (_, i) => i), k);
  const fig = shape === 'rect' ? partsRect('f', 200, 140, n, filled, { w: 220, h: 90 }) : pieN('f', 200, 140, n, filled, 75);
  const nm = (x) => L(lang, FRN[x][0], FRN[x][1]);
  return mc({
    q: L(lang, 'Bagian berwarna menunjukkan …', 'The coloured part shows …'),
    fig,
    ok: nm(key),
    bad: ['1/4', '1/2', '1/1']
      .filter((x) => x !== key)
      .map((x) => [nm(x), L(lang, `Ada ${n} bagian sama besar dan ${k} yang berwarna.`, `There are ${n} equal parts and ${k} ${k === 1 ? 'is' : 'are'} coloured.`)]),
    fixed: true,
    steps: [L(lang, `${k} dari ${n} bagian berwarna.`, `${k} of ${n} parts are coloured.`), n === 4 && k === 2 ? L(lang, 'Dua seperempat sama dengan setengah.', 'Two quarters make a half.') : L(lang, `Itu ${FRN[key][0]}.`, `That is ${FRN[key][1]}.`)],
    meta: { n, k },
  });
};
nameFrac.solve = (m, lang) => {
  const key = m.k === m.n ? '1/1' : m.k * 4 === m.n ? '1/4' : '1/2';
  return L(lang, FRN[key][0], FRN[key][1]);
};

const quartersCount = (rnd, lang) => {
  const kind = pick(rnd, ['whole', 'half', 'wholes']);
  const w = ri(rnd, 2, 3);
  const ans = kind === 'whole' ? 4 : kind === 'half' ? 2 : 4 * w;
  const food = pick(rnd, [['kue', 'cake'], ['roti', 'loaf of bread'], ['pizza', 'pizza'], ['semangka', 'watermelon']]);
  return num({
    q: kind === 'whole' ? L(lang, `Berapa potong seperempat ${food[0]} yang sama dengan satu ${food[0]} utuh?`, `How many quarters of a ${food[1]} make one whole ${food[1]}?`) : kind === 'half' ? L(lang, `Berapa potong seperempat ${food[0]} yang sama dengan setengah ${food[0]}?`, `How many quarters of a ${food[1]} make half a ${food[1]}?`) : L(lang, `${w} ${food[0]} dipotong-potong seperempat. Ada berapa potong?`, `${w} ${food[1] === 'loaf of bread' ? 'loaves of bread' : food[1] + 's'} are cut into quarters. How many pieces are there?`),
    fig: kind === 'whole' ? pieN('f', 200, 140, 4, [0], 75) : undefined,
    ans,
    wrong: [
      [kind === 'half' ? 4 : 2, L(lang, 'Seperempat berarti 4 potong sama besar untuk satu utuh.', 'A quarter means one of 4 equal pieces of a whole.')],
      [kind === 'wholes' ? w + 4 : null, L(lang, `Setiap ${food[0]} menjadi 4 potong. ${w} kali 4 potong.`, `Each one makes 4 pieces. ${w} lots of 4.`)],
      [kind === 'whole' ? 1 : null, L(lang, 'Satu potong hanya seperempat.', 'One piece is only a quarter.')],
    ],
    steps: kind === 'wholes' ? [L(lang, 'Satu utuh = 4 potong seperempat.', 'One whole = 4 quarters.'), `${Array(w).fill(4).join(' + ')} = ${ans}.`] : [L(lang, 'Satu utuh = 4 seperempat.', 'One whole = 4 quarters.'), kind === 'half' ? L(lang, 'Setengah = 2 seperempat.', 'A half = 2 quarters.') : L(lang, 'Jadi 4 potong.', 'So 4 pieces.')],
    meta: { kind, w },
  });
};
quartersCount.solve = (m) => (m.kind === 'whole' ? 4 : m.kind === 'half' ? 2 : 4 * m.w);

// ---------- Bab 6: Mengukur ----------
const ribbonDiff = (rnd, lang) => {
  const kind = pick(rnd, ['diff', 'times', 'sum']);
  const unit = pick(rnd, [['klip', 'paper clips'], ['jengkal', 'hand spans'], ['pensil', 'pencils'], ['langkah', 'steps']]);
  const obj = unit[0] === 'langkah' ? [['Halaman A', 'Yard A'], ['Halaman B', 'Yard B']] : [['Pita A', 'Ribbon A'], ['Pita B', 'Ribbon B']];
  const a = ri(rnd, 3, 9);
  const b = a + ri(rnd, 1, 6);
  const k = ri(rnd, 2, 3);
  if (kind === 'diff')
    return num({
      q: L(lang, `${obj[0][0]} panjangnya ${a} ${unit[0]}. ${obj[1][0]} panjangnya ${b} ${unit[0]}. ${obj[1][0]} lebih panjang … ${unit[0]}.`, `${obj[0][1]} is ${a} ${unit[1]} long. ${obj[1][1]} is ${b} ${unit[1]} long. ${obj[1][1]} is … ${unit[1]} longer.`),
      ans: b - a,
      wrong: [[a + b, L(lang, 'Selisih dicari dengan pengurangan.', 'Find the difference by subtracting.')], [b, L(lang, `${b} adalah panjang ${obj[1][0]}. Yang ditanya kelebihannya.`, `${b} is the length of ${obj[1][1]}. The question asks how much longer.`)]],
      steps: [`${b} − ${a} = ${b - a}.`],
      meta: { kind, a, b },
    });
  if (kind === 'times')
    return num({
      q: L(lang, `Tali panjangnya ${a} ${unit[0]}. Tali lain panjangnya ${k} kali tali itu. Panjangnya … ${unit[0]}.`, `A rope is ${a} ${unit[1]} long. Another rope is ${k} times as long. It is … ${unit[1]} long.`),
      ans: a * k,
      wrong: [[a + k, L(lang, `${k} kali berarti ${a} dijumlah ${k} kali.`, `${k} times means adding ${a} ${k} times.`)], [a, L(lang, 'Tali lain lebih panjang.', 'The other rope is longer.')]],
      steps: [`${Array(k).fill(a).join(' + ')} = ${a * k}.`],
      meta: { kind, a, k },
    });
  return num({
    q: L(lang, `Meja panjangnya ${a} ${unit[0]}. Meja kedua panjangnya ${b} ${unit[0]}. Kedua meja dijajarkan. Panjang seluruhnya … ${unit[0]}.`, `One table is ${a} ${unit[1]} long. A second table is ${b} ${unit[1]} long. They are put end to end. The total length is … ${unit[1]}.`),
    ans: a + b,
    wrong: [[b - a, L(lang, 'Dijajarkan berarti panjangnya digabung, jadi dijumlah.', 'End to end means the lengths join up, so add.')]],
    steps: [`${a} + ${b} = ${a + b}.`],
    meta: { kind, a, b },
  });
};
ribbonDiff.solve = (m) => (m.kind === 'diff' ? m.b - m.a : m.kind === 'times' ? m.a * m.k : m.a + m.b);

const whoseSpan = (rnd, lang) => {
  const [p1, p2] = pick(rnd, [[['Ayah', 'Dad'], ['Adik', 'little brother']], [['Kakak', 'big sister'], ['Adik', 'little sister']], [['Bu Guru', 'the teacher'], ['Rani', 'Rani']], [['Paman', 'Uncle'], ['Dodi', 'Dodi']]]);
  const unit = pick(rnd, [['jengkal', 'hand spans'], ['langkah', 'steps'], ['hasta', 'forearm lengths']]);
  const obj = unit[0] === 'langkah' ? ['Halaman', 'The yard'] : pick(rnd, [['Meja', 'The table'], ['Papan tulis', 'The board'], ['Kasur', 'The bed']]);
  const a = ri(rnd, 3, 7);
  const b = a + ri(rnd, 2, 5);
  const flip = rnd() < 0.5;
  const [x, y] = flip ? [b, a] : [a, b];
  const q = L(lang, `${obj[0]} diukur ${x} ${unit[0]} ${p1[0]} dan ${y} ${unit[0]} ${p2[0]}. ${cap(unit[0])} siapa yang lebih panjang?`, `${obj[1]} measures ${x} ${unit[1]} for ${p1[1]} and ${y} ${unit[1]} for ${p2[1]}. Whose ${unit[0] === 'langkah' ? 'step' : unit[0] === 'hasta' ? 'forearm' : 'hand span'} is longer?`);
  const ans = x < y ? p1 : p2;
  const oth = x < y ? p2 : p1;
  const cp = (p) => L(lang, p[0], cap(p[1]));
  return mc({
    q,
    ok: cp(ans),
    bad: [[cp(oth), L(lang, 'Angkanya lebih besar karena satuannya lebih pendek, jadi perlu lebih banyak.', 'The number is bigger because the unit is shorter, so more are needed.')], [L(lang, 'sama', 'the same'), L(lang, 'Hasilnya berbeda, jadi panjang satuannya berbeda.', 'The counts differ, so the units differ.')]],
    fixed: true,
    steps: [L(lang, 'Satuan yang lebih panjang cukup dipakai lebih sedikit kali.', 'A longer unit is needed fewer times.'), L(lang, `${Math.min(x, y)} lebih sedikit dari ${Math.max(x, y)}, jadi ${unit[0]} ${ans[0]} lebih panjang.`, `${Math.min(x, y)} is fewer than ${Math.max(x, y)}, so ${ans[1]}'s is longer.`)],
    meta: { x, y, p1, p2 },
  });
};
whoseSpan.solve = (m, lang) => {
  const p = m.x < m.y ? m.p1 : m.p2;
  return L(lang, p[0], cap(p[1]));
};

const balanceMarbles = (rnd, lang) => {
  const objs = sample(rnd, [['Kotak pensil', 'The pencil case'], ['Penghapus', 'The eraser'], ['Buku tulis', 'The notebook'], ['Jeruk', 'The orange'], ['Mainan mobil', 'The toy car'], ['Gelas', 'The cup']], 2);
  const a = ri(rnd, 6, 15);
  const b = ri(rnd, 2, a - 1);
  const unit = pick(rnd, [['kelereng', 'marbles'], ['kubus', 'cubes'], ['koin', 'coins']]);
  return num({
    q: L(lang, `${objs[0][0]} seimbang dengan ${a} ${unit[0]}. ${objs[1][0]} seimbang dengan ${b} ${unit[0]}. ${objs[0][0]} lebih berat … ${unit[0]}.`, `${objs[0][1]} balances ${a} ${unit[1]}. ${objs[1][1]} balances ${b} ${unit[1]}. ${objs[0][1]} is heavier by … ${unit[1]}.`),
    ans: a - b,
    wrong: [[a + b, L(lang, 'Yang ditanya selisihnya, jadi dikurangi.', 'The question asks for the difference, so subtract.')], [a, L(lang, `${a} adalah berat ${objs[0][0].toLowerCase()} seluruhnya.`, `${a} is its whole weight.`)]],
    steps: [`${a} − ${b} = ${a - b}.`, L(lang, `Lebih berat ${a - b} ${unit[0]}.`, `Heavier by ${a - b}.`)],
    meta: { a, b },
  });
};
balanceMarbles.solve = (m) => m.a - m.b;

const balanceRead = (rnd, lang) => {
  const state = pick(rnd, ['L', 'R', 'E']);
  const tilt = state === 'L' ? -12 : state === 'R' ? 12 : 0;
  const bal = balance('b', 200, 120, tilt, 110);
  const pair = sample(rnd, [['P', 'P'], ['Q', 'Q'], ['R', 'R'], ['S', 'S']], 2);
  const fig = [...bal.els, box('oa', bal.left.x, bal.left.y - 20, 40, 34, { r: 4, fill: 'acc-soft', stroke: 'acc', sw: 2.5, label: pair[0][0], lsize: 18 }), box('ob', bal.right.x, bal.right.y - 20, 40, 34, { r: 4, fill: 'pos-soft', stroke: 'pos', sw: 2.5, label: pair[1][0], lsize: 18 })];
  const nm = (x) => L(lang, `kotak ${x}`, `box ${x}`);
  const same = L(lang, 'sama berat', 'they weigh the same');
  const ok = state === 'L' ? nm(pair[0][0]) : state === 'R' ? nm(pair[1][0]) : same;
  return mc({
    q: L(lang, 'Mana yang lebih berat?', 'Which is heavier?'),
    fig,
    ok,
    bad: [
      [nm(pair[0][0]), state === 'E' ? L(lang, 'Timbangan datar, jadi tidak ada yang lebih berat.', 'The scale is level, so neither is heavier.') : L(lang, 'Sisi yang lebih berat turun ke bawah.', 'The heavier side goes down.')],
      [nm(pair[1][0]), state === 'E' ? L(lang, 'Timbangan datar, jadi tidak ada yang lebih berat.', 'The scale is level, so neither is heavier.') : L(lang, 'Sisi yang lebih berat turun ke bawah.', 'The heavier side goes down.')],
      [same, L(lang, 'Timbangan miring, jadi beratnya berbeda.', 'The scale is tilted, so the weights differ.')],
    ],
    fixed: true,
    steps: [state === 'E' ? L(lang, 'Timbangan datar berarti kedua sisi sama berat.', 'A level scale means both sides weigh the same.') : L(lang, `Sisi ${state === 'L' ? 'kiri' : 'kanan'} turun, jadi lebih berat.`, `The ${state === 'L' ? 'left' : 'right'} side goes down, so it is heavier.`)],
    meta: { state, a: pair[0][0], b: pair[1][0] },
  });
};
balanceRead.solve = (m, lang) => (m.state === 'E' ? L(lang, 'sama berat', 'they weigh the same') : L(lang, `kotak ${m.state === 'L' ? m.a : m.b}`, `box ${m.state === 'L' ? m.a : m.b}`));

// ---------- Bab 7: Bilangan sampai 100 ----------
const to100 = (rnd, lang) => {
  const kind = pick(rnd, ['make', 'word', 'plus1', 'tens']);
  const t = ri(rnd, 5, 9);
  const s = ri(rnd, 0, 9);
  const n = t * 10 + s;
  if (kind === 'plus1') {
    const m = pick(rnd, [59, 69, 79, 89, 99, ri(rnd, 51, 98)]);
    return num({
      q: `${m} + 1 = …`,
      ans: m + 1,
      wrong: [[m % 10 === 9 ? m - 9 + 100 : null, L(lang, `Sesudah ${m}, satuan habis dan puluhannya bertambah 1.`, `After ${m}, the ones run out and the tens go up by 1.`)], [m - 1, L(lang, 'Tambah 1 berarti maju satu.', 'Adding 1 means one step forward.')]],
      steps: [L(lang, `Bilangan sesudah ${m} adalah ${m + 1}.`, `The number after ${m} is ${m + 1}.`)],
      meta: { kind, m },
    });
  }
  if (kind === 'tens') {
    const k = pick(rnd, [10, ri(rnd, 5, 9)]);
    return num({
      q: L(lang, `Berapa puluhan dalam ${k * 10}?`, `How many tens are in ${k * 10}?`),
      ans: k,
      wrong: [[k * 10, L(lang, `Banyak puluhannya: ${k * 10} dibagi 10.`, `The number of tens is ${k * 10} split into tens.`)], [k === 10 ? 100 : null, L(lang, '100 = 10 puluhan.', '100 = 10 tens.')]],
      steps: [L(lang, `${k * 10} = ${k} puluhan.`, `${k * 10} = ${k} tens.`)],
      meta: { kind, k },
    });
  }
  if (kind === 'word')
    return num({
      q: L(lang, `${cap(words(lang, n))} ditulis …`, `${cap(words(lang, n))} is written as …`),
      ans: n,
      wrong: [[s * 10 + t, L(lang, 'Angka puluhan ditulis di depan.', 'The tens digit comes first.')], [Number(`${t * 10}${s}`), L(lang, `${t * 10} dan ${s} ditulis ${n}.`, `${t * 10} and ${s} is written ${n}.`)]],
      steps: [L(lang, `${t} puluhan dan ${s} satuan = ${n}.`, `${t} tens and ${s} ones = ${n}.`)],
      meta: { kind, t, s },
    });
  return num({
    q: L(lang, `${t} puluhan dan ${s} satuan adalah …`, `${t} tens and ${s} ones make …`),
    fig: rnd() < 0.5 ? blocks('f', t, s, 200 - (t * 22 + 30) / 2, 140, { gap: 22 }) : undefined,
    ans: n,
    wrong: [[s * 10 + t, L(lang, 'Puluhan ditulis di depan.', 'Tens are written first.')], [t + s, L(lang, `${t} puluhan = ${t * 10}.`, `${t} tens = ${t * 10}.`)]],
    steps: [`${t * 10} + ${s} = ${n}.`],
    meta: { kind, t, s },
  });
};
to100.solve = (m) => (m.kind === 'plus1' ? m.m + 1 : m.kind === 'tens' ? m.k : 10 * m.t + m.s);

const board = (n) => {
  // potongan papan ratusan 3 × 3 di sekitar n, sel tengah ditandai
  const r0 = Math.floor((n - 1) / 10);
  const c0 = (n - 1) % 10;
  const els = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      const r = r0 + dr;
      const c = c0 + dc;
      if (r < 0 || r > 9 || c < 0 || c > 9) continue;
      const v = r * 10 + c + 1;
      const centre = dr === 0 && dc === 0;
      els.push(box(`g${dr + 1}${dc + 1}`, 200 + dc * 64, 140 + dr * 64, 60, 60, { r: 4, fill: centre ? 'acc-soft' : 'paper', stroke: centre ? 'acc' : 'mut', sw: centre ? 2.5 : 1.5, label: centre ? String(v) : '?', lsize: 20 }));
    }
  return els;
};
const hundredBoard = (rnd, lang) => {
  const dir = pick(rnd, ['atas', 'bawah', 'kiri', 'kanan']);
  let n;
  do n = ri(rnd, 12, 89);
  while (n % 10 === 0 || n % 10 === 1);
  const ans = { atas: n - 10, bawah: n + 10, kiri: n - 1, kanan: n + 1 }[dir];
  const en = { atas: 'above', bawah: 'below', kiri: 'to the left of', kanan: 'to the right of' }[dir];
  const vert = dir === 'atas' || dir === 'bawah';
  return num({
    q: L(lang, `Pada papan ratusan, bilangan tepat di ${dir} ${n} adalah …`, `On a hundred square, the number just ${en} ${n} is …`),
    fig: board(n),
    ans,
    wrong: [
      [vert ? (dir === 'atas' ? n - 1 : n + 1) : null, L(lang, 'Satu baris ke atas atau ke bawah berubah 10, bukan 1.', 'One row up or down changes by 10, not 1.')],
      [!vert ? (dir === 'kiri' ? n - 10 : n + 10) : null, L(lang, 'Ke kiri atau ke kanan hanya berubah 1.', 'Left or right changes by only 1.')],
      [{ atas: n + 10, bawah: n - 10, kiri: n + 1, kanan: n - 1 }[dir], L(lang, `Arahnya terbalik. ${cap(dir)}: ${dir === 'atas' || dir === 'kiri' ? 'lebih kecil' : 'lebih besar'}.`, `That is the wrong way. Going ${dir === 'atas' ? 'up' : dir === 'bawah' ? 'down' : dir === 'kiri' ? 'left' : 'right'} makes the number ${dir === 'atas' || dir === 'kiri' ? 'smaller' : 'bigger'}.`)],
    ],
    steps: [vert ? L(lang, `Satu baris ke ${dir}: ${dir === 'atas' ? 'kurang' : 'tambah'} 10.`, `One row ${dir === 'atas' ? 'up: take away' : 'down: add'} 10.`) : L(lang, `Satu kotak ke ${dir}: ${dir === 'kiri' ? 'kurang' : 'tambah'} 1.`, `One square ${dir === 'kiri' ? 'left: take away' : 'right: add'} 1.`), `${n} ${dir === 'atas' || dir === 'kiri' ? '−' : '+'} ${vert ? 10 : 1} = ${ans}.`],
    meta: { n, dir },
  });
};
hundredBoard.solve = (m) => m.n + ({ atas: -10, bawah: 10, kiri: -1, kanan: 1 }[m.dir]);

const signCmp = (rnd, lang) => {
  const kind = rnd();
  let a = ri(rnd, 10, 99);
  let b;
  if (kind < 0.15) b = a;
  else if (kind < 0.5) b = (a % 10) * 10 + Math.floor(a / 10);
  else if (kind < 0.75) b = Math.floor(a / 10) * 10 + ri(rnd, 0, 9);
  else b = ri(rnd, 10, 100);
  if (b < 10 || (b === a && kind >= 0.15)) b = a === 100 ? 99 : a + 1;
  if (rnd() < 0.1) [a, b] = [100, ri(rnd, 90, 99)];
  const sign = a > b ? '>' : a < b ? '<' : '=';
  const nm = { '>': L(lang, 'lebih dari', 'greater than'), '<': L(lang, 'kurang dari', 'less than'), '=': L(lang, 'sama dengan', 'equal to') };
  return mc({
    q: `${a} … ${b}`,
    ok: sign,
    bad: ['<', '>', '=']
      .filter((x) => x !== sign)
      .map((x) => [x, sign === '=' ? L(lang, 'Kedua bilangan sama.', 'The two numbers are the same.') : x === '=' ? L(lang, 'Kedua bilangan tidak sama.', 'The numbers are not equal.') : L(lang, `Mulut tanda terbuka ke bilangan yang lebih besar, yaitu ${Math.max(a, b)}.`, `The open side faces the bigger number, ${Math.max(a, b)}.`)]),
    fixed: true,
    steps: [L(lang, 'Bandingkan puluhannya dulu, lalu satuannya.', 'Compare the tens first, then the ones.'), L(lang, `${a} ${nm[sign]} ${b}: ${a} ${sign} ${b}.`, `${a} is ${nm[sign]} ${b}: ${a} ${sign} ${b}.`)],
    meta: { a, b },
  });
};
signCmp.solve = (m) => (m.a > m.b ? '>' : m.a < m.b ? '<' : '=');

const digitSwap = (rnd, lang) => {
  let x;
  let y;
  do {
    x = ri(rnd, 1, 9);
    y = ri(rnd, 0, 9);
  } while (x === y || y === 0);
  const set = new Set([x * 10 + y, y * 10 + x, x * 10 + ri(rnd, 0, 9), y * 10 + ri(rnd, 0, 9)]);
  while (set.size < 4) set.add(ri(rnd, 10, 99));
  const xs = sample(rnd, [...set], 4);
  const mx = rnd() < 0.5;
  const ans = mx ? Math.max(...xs) : Math.min(...xs);
  return num({
    q: L(lang, `Bilangan ${mx ? 'terbesar' : 'terkecil'} dari ${xs.join(', ')} adalah …`, `The ${mx ? 'greatest' : 'smallest'} of ${xs.join(', ')} is …`),
    ans,
    wrong: [[mx ? Math.min(...xs) : Math.max(...xs), L(lang, `Itu yang ${mx ? 'terkecil' : 'terbesar'}.`, `That is the ${mx ? 'smallest' : 'greatest'}.`)], [(ans % 10) * 10 + Math.floor(ans / 10), L(lang, 'Angkanya sama tetapi tempatnya tertukar. Puluhan menentukan lebih dulu.', 'Same digits, swapped places. The tens decide first.')]],
    steps: [L(lang, 'Bandingkan angka puluhan dulu.', 'Compare the tens digits first.'), L(lang, `${mx ? 'Terbesar' : 'Terkecil'}: ${ans}.`, `${mx ? 'Greatest' : 'Smallest'}: ${ans}.`)],
    meta: { xs, mx },
  });
};
digitSwap.solve = (m) => (m.mx ? Math.max(...m.xs) : Math.min(...m.xs));

// ---------- Bab 8: Turus, tabel, diagram batang ----------
function tally(id, n, x, y, { h = 40, dx = 10, gap = 20 } = {}) {
  let d = '';
  let cx = x;
  for (let g = 0; g < Math.ceil(n / 5); g++) {
    const k = Math.min(5, n - g * 5);
    for (let i = 0; i < Math.min(4, k); i++) d += `M${cx + i * dx},${y - h / 2} V${y + h / 2} `;
    if (k === 5) d += `M${cx - 5},${y + h / 2 - 4} L${cx + 3 * dx + 5},${y - h / 2 + 4} `;
    cx += 4 * dx + gap;
  }
  return { id, t: 'path', x: 0, y: 0, d: d.trim(), stroke: 'ink', sw: 3 };
}
const tallyRead = (rnd, lang) => {
  const n = ri(rnd, 3, 19);
  const groups = Math.ceil(n / 5);
  const w = groups * 40 + (groups - 1) * 20;
  return num({
    q: L(lang, 'Turus ini mencatat berapa banyak?', 'How many does this tally show?'),
    fig: [tally('t', n, 200 - w / 2 + 5, 140)],
    ans: n,
    wrong: [
      [Math.floor(n / 5) * 4 + (n % 5), L(lang, 'Garis miring juga dihitung. Satu ikatan = 5.', 'The slanted line counts too. One bundle = 5.')],
      [Math.floor(n / 5) + (n % 5), L(lang, 'Satu ikatan bernilai 5, bukan 1.', 'One bundle is worth 5, not 1.')],
    ],
    steps: [L(lang, `${Math.floor(n / 5)} ikatan = ${Math.floor(n / 5) * 5}.`, `${Math.floor(n / 5)} bundles = ${Math.floor(n / 5) * 5}.`), n % 5 ? L(lang, `Ditambah ${n % 5} garis: ${n}.`, `Plus ${n % 5} line${n % 5 > 1 ? 's' : ''}: ${n}.`) : L(lang, `Jadi ${n}.`, `So ${n}.`)],
    meta: { n },
  });
};
tallyRead.solve = (m) => m.n;

const FRUITS = [['apel', 'apple', 'apples'], ['jeruk', 'orange', 'oranges'], ['pisang', 'banana', 'bananas'], ['mangga', 'mango', 'mangoes'], ['salak', 'snake fruit', 'snake fruit'], ['jambu', 'guava', 'guavas'], ['semangka', 'watermelon', 'watermelon']];
const tableRead = (rnd, lang) => {
  const fr = sample(rnd, FRUITS, 4);
  const v = fr.map(() => ri(rnd, 2, 10));
  const kind = pick(rnd, ['one', 'total', 'diff']);
  const i = ri(rnd, 0, 3);
  let j = ri(rnd, 0, 3);
  while (j === i || v[j] === v[i]) {
    j = ri(rnd, 0, 3);
    if (v.every((x) => x === v[i])) v[(i + 1) % 4]++;
  }
  const fig = [table('tb', 200, 140, [[L(lang, 'buah', 'fruit'), L(lang, 'banyak anak', 'children')], ...fr.map((f, k) => [L(lang, f[0], f[1]), String(v[k])])], { cw: [130, 130], rh: 34, size: 17, head: true })];
  const tot = v.reduce((a, b) => a + b, 0);
  const [hi, lo] = v[i] > v[j] ? [i, j] : [j, i];
  const fn = (k) => L(lang, fr[k][0], fr[k][1]);
  const q =
    kind === 'one'
      ? L(lang, `Tabel buah kesukaan. Berapa anak yang menyukai ${fr[i][0]}?`, `Favourite fruit table. How many children like ${fr[i][2]}?`)
      : kind === 'total'
        ? L(lang, 'Tabel buah kesukaan. Berapa anak semuanya?', 'Favourite fruit table. How many children in all?')
        : L(lang, `Penyuka ${fr[hi][0]} lebih banyak berapa anak dari penyuka ${fr[lo][0]}?`, `How many more children like ${fr[hi][2]} than ${fr[lo][2]}?`);
  const ans = kind === 'one' ? v[i] : kind === 'total' ? tot : v[hi] - v[lo];
  return num({
    q,
    fig,
    ans,
    wrong:
      kind === 'total'
        ? [[tot - v[3], L(lang, 'Ada baris yang terlewat. Jumlahkan keempat baris.', 'A row was missed. Add all four rows.')], [4, L(lang, 'Itu banyak jenis buah, bukan banyak anak.', 'That is the number of fruits, not children.')]]
        : kind === 'diff'
          ? [[v[hi] + v[lo], L(lang, 'Selisih dicari dengan pengurangan.', 'Find the difference by subtracting.')], [v[hi], L(lang, 'Kurangi dengan yang lebih sedikit.', 'Take away the smaller amount.')]]
          : [[v[(i + 1) % 4], L(lang, 'Baca baris yang tepat: cari nama buahnya dulu.', 'Read the right row: find the fruit name first.')]],
    steps: kind === 'total' ? [`${v.join(' + ')} = ${tot}.`] : kind === 'diff' ? [`${v[hi]} − ${v[lo]} = ${ans}.`] : [L(lang, `Baris ${fn(i)}: ${v[i]}.`, `Row ${fn(i)}: ${v[i]}.`)],
    meta: { kind, v, i, hi, lo },
  });
};
tableRead.solve = (m) => (m.kind === 'one' ? m.v[m.i] : m.kind === 'total' ? m.v.reduce((a, b) => a + b, 0) : m.v[m.hi] - m.v[m.lo]);

const COLS = ['neg', 'acc', 'ok', 'pos'];
const barsFig = (lang, fr, v) => [{ id: 'bc', t: 'bars', x: 210, y: 140, w: 280, h: 190, max: 10, tick: 1, data: fr.map((f, k) => ({ l: L(lang, f[0], f[1]), v: v[k], c: COLS[k] })) }];
const barRead = (rnd, lang) => {
  const fr = sample(rnd, FRUITS.filter((f) => f[1] !== 'snake fruit' && f[1] !== 'watermelon'), 4);
  const v = sample(rnd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);
  const kind = pick(rnd, ['one', 'diff', 'sum']);
  const [i, j] = sample(rnd, [0, 1, 2, 3], 2);
  const [hi, lo] = v[i] > v[j] ? [i, j] : [j, i];
  const ans = kind === 'one' ? v[i] : kind === 'diff' ? v[hi] - v[lo] : v[i] + v[j];
  const fn = (k) => L(lang, fr[k][0], fr[k][1]);
  return num({
    q: kind === 'one' ? L(lang, `Berapa anak yang menyukai ${fr[i][0]}?`, `How many children like ${fr[i][2]}?`) : kind === 'diff' ? L(lang, `Penyuka ${fr[hi][0]} lebih banyak berapa dari penyuka ${fr[lo][0]}?`, `How many more children like ${fr[hi][2]} than ${fr[lo][2]}?`) : L(lang, `Berapa anak yang menyukai ${fr[i][0]} atau ${fr[j][0]}?`, `How many children like ${fr[i][2]} or ${fr[j][2]}?`),
    fig: barsFig(lang, fr, v),
    ans,
    wrong:
      kind === 'one'
        ? [[ans + 1, L(lang, 'Ikuti ujung batang mendatar ke angka di kiri.', 'Follow the top of the bar across to the number on the left.')], [ans - 1, L(lang, 'Ikuti ujung batang mendatar ke angka di kiri.', 'Follow the top of the bar across to the number on the left.')]]
        : kind === 'diff'
          ? [[v[hi] + v[lo], L(lang, 'Lebih banyak berapa: kurangi.', 'How many more: subtract.')]]
          : [[Math.abs(v[i] - v[j]), L(lang, '"Atau" berarti keduanya digabung, jadi dijumlah.', '"Or" means both groups together, so add.')]],
    steps: kind === 'one' ? [L(lang, `Ujung batang ${fn(i)} di angka ${v[i]}.`, `The ${fn(i)} bar ends at ${v[i]}.`)] : [L(lang, `${cap(fn(i))} ${v[i]}, ${fn(j)} ${v[j]}.`, `${cap(fn(i))} ${v[i]}, ${fn(j)} ${v[j]}.`), kind === 'diff' ? `${v[hi]} − ${v[lo]} = ${ans}.` : `${v[i]} + ${v[j]} = ${ans}.`],
    meta: { kind, v, i, j },
  });
};
barRead.solve = (m) => (m.kind === 'one' ? m.v[m.i] : m.kind === 'diff' ? Math.abs(m.v[m.i] - m.v[m.j]) : m.v[m.i] + m.v[m.j]);

const barMost = (rnd, lang) => {
  const fr = sample(rnd, FRUITS.filter((f) => f[1] !== 'snake fruit' && f[1] !== 'watermelon'), 4);
  const v = sample(rnd, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);
  const most = rnd() < 0.5;
  const k = v.indexOf(most ? Math.max(...v) : Math.min(...v));
  const fn = (x) => L(lang, fr[x][0], fr[x][1]);
  return mc({
    q: L(lang, `Buah apa yang paling ${most ? 'banyak' : 'sedikit'} disukai?`, `Which fruit is liked by the ${most ? 'most' : 'fewest'} children?`),
    fig: barsFig(lang, fr, v),
    ok: fn(k),
    bad: [0, 1, 2, 3].filter((x) => x !== k).map((x) => [fn(x), L(lang, `Batang ${fn(x)} bukan yang paling ${most ? 'tinggi' : 'pendek'}.`, `The ${fn(x)} bar is not the ${most ? 'tallest' : 'shortest'}.`)]),
    max: 3,
    steps: [L(lang, `Cari batang yang paling ${most ? 'tinggi' : 'pendek'}.`, `Find the ${most ? 'tallest' : 'shortest'} bar.`), L(lang, `Itu ${fn(k)}: ${v[k]}.`, `It is ${fn(k)}: ${v[k]}.`)],
    meta: { v, most, fr },
  });
};
barMost.solve = (m, lang) => {
  let k = 0;
  m.v.forEach((x, i) => {
    if (m.most ? x > m.v[k] : x < m.v[k]) k = i;
  });
  return L(lang, m.fr[k][0], m.fr[k][1]);
};

export const K2 = {
  'k2b1-1': [readBlocks, placeTO],
  'k2b1-2': [compare50, order50],
  'k2b2-1': [addPlain],
  'k2b2-2': [subPlain],
  'k2b2-3': [addCarry, subBorrow],
  'k2b3-1': [sidesCount, shapeNameN],
  'k2b3-2': [countPieces, composePool],
  'k2b4-1': [whichAt, whereIs],
  'k2b4-2': [seqNext, picPattern],
  'k2b5-1': [halfOf, whichHalf],
  'k2b5-2': [quarterOf, nameFrac, quartersCount],
  'k2b6-1': [ribbonDiff, whoseSpan],
  'k2b6-2': [balanceMarbles, balanceRead],
  'k2b7-1': [to100, hundredBoard],
  'k2b7-2': [signCmp, digitSwap],
  'k2b8-1': [tallyRead, tableRead],
  'k2b8-2': [barRead, barMost],
};
