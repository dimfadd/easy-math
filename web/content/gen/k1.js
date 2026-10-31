// Generator soal Kelas 1 SD. Setiap materi punya 1–3 jenis soal yang angkanya diacak.
import { L, ri, pick, S, wrongs, row, grid, txt } from './util.js';
import { tenframe } from '../k1/kit.js';

const thing = (rnd) => pick(rnd, ['apple', 'star']);
const nm = (lang, icon) => (icon === 'apple' ? L(lang, 'apel', 'apples') : L(lang, 'bintang', 'stars'));
const NAMES = ['Ani', 'Budi', 'Citra', 'Dodi', 'Eka', 'Fajar', 'Gita', 'Hana'];
const two = (rnd) => {
  const a = pick(rnd, NAMES);
  let b = pick(rnd, NAMES);
  while (b === a) b = pick(rnd, NAMES);
  return [a, b];
};
const THINGS = [
  ['pensil', 'pencils'],
  ['kelereng', 'marbles'],
  ['permen', 'sweets'],
  ['buku', 'books'],
  ['bola', 'balls'],
  ['kue', 'cakes'],
];

// ---------- Bab 1: Membilang sampai 10 ----------
const count5 = (rnd, lang) => {
  const n = ri(rnd, 1, 5);
  const ic = thing(rnd);
  return {
    type: 'num',
    q: L(lang, `Ada berapa ${nm(lang, ic)}?`, `How many ${nm(lang, ic)} are there?`),
    fig: row('f', ic, n, 200, 150, { dx: 60, size: 46 }),
    ans: [S(n)],
    wrong: wrongs(n, [
      [n + 1, L(lang, 'Ada yang terhitung dua kali. Tunjuk setiap benda sekali saja.', 'One was counted twice. Point to each one only once.')],
      [n - 1, L(lang, 'Ada yang terlewat. Hitung dari kiri sampai ujung kanan.', 'One was missed. Count from the left all the way to the right.')],
    ]),
    steps: [L(lang, 'Tunjuk satu per satu sambil membilang.', 'Point to each one as you count.'), L(lang, `Ada ${n}.`, `There are ${n}.`)],
  };
};
const count10 = (rnd, lang) => {
  const n = ri(rnd, 6, 10);
  return {
    type: 'num',
    q: L(lang, 'Ada berapa bulatan?', 'How many dots are there?'),
    fig: tenframe('f', 200, 150, n),
    ans: [S(n)],
    wrong: wrongs(n, [
      [n - 5, L(lang, 'Itu hanya baris bawah. Baris atas berisi 5.', 'That is only the bottom row. The top row has 5.')],
      [n + 1, L(lang, 'Hitung lagi pelan-pelan, satu kotak satu bulatan.', 'Count again slowly, one dot per box.')],
      [n - 1, L(lang, 'Ada yang terlewat.', 'One was missed.')],
      [10 - n, L(lang, 'Itu kotak yang kosong. Yang ditanya bulatannya.', 'Those are the empty boxes. The question asks for the dots.')],
    ]),
    steps: [L(lang, 'Baris atas penuh: 5.', 'Top row is full: 5.'), L(lang, `5 lalu terus: ${n}.`, `5 and keep counting: ${n}.`)],
  };
};
const moreLess = (rnd, lang) => {
  let a = ri(rnd, 2, 8);
  let b = ri(rnd, 2, 8);
  while (a === b) b = ri(rnd, 2, 8);
  const more = rnd() < 0.5;
  const ansApple = more ? a > b : a < b;
  const word = more ? L(lang, 'lebih banyak', 'more') : L(lang, 'lebih sedikit', 'fewer');
  return {
    q: L(lang, `Mana yang ${word}?`, `Which has ${word}?`),
    fig: [...row('a', 'apple', a, 200, 100, { dx: 44, size: 36 }), ...row('s', 'star', b, 200, 190, { dx: 44, size: 36 })],
    options: [
      ansApple ? { t: L(lang, 'apel', 'apples'), ok: true } : { t: L(lang, 'apel', 'apples'), why: L(lang, `Apel ada ${a}, bintang ada ${b}.`, `There are ${a} apples and ${b} stars.`) },
      !ansApple ? { t: L(lang, 'bintang', 'stars'), ok: true } : { t: L(lang, 'bintang', 'stars'), why: L(lang, `Bintang ada ${b}, apel ada ${a}.`, `There are ${b} stars and ${a} apples.`) },
      { t: L(lang, 'sama banyak', 'the same'), why: L(lang, 'Pasangkan satu apel dengan satu bintang. Ada yang tidak punya pasangan.', 'Pair each apple with a star. Some are left without a partner.') },
    ],
    fixed: true,
    steps: [L(lang, `Apel ${a}, bintang ${b}.`, `Apples ${a}, stars ${b}.`), L(lang, `Yang ${word}: ${ansApple ? 'apel' : 'bintang'}.`, `The one with ${word}: ${ansApple ? 'apples' : 'stars'}.`)],
  };
};

// ---------- Bab 2: Penjumlahan sampai 10 ----------
const join = (rnd, lang) => {
  const a = ri(rnd, 1, 6);
  const b = ri(rnd, 1, 10 - a);
  const s = a + b;
  const story = rnd() < 0.5;
  const ic = thing(rnd);
  const q = story ? L(lang, `${a} ${nm(lang, ic)} tambah ${b} ${nm(lang, ic)}. Ada berapa ${nm(lang, ic)}?`, `${a} ${nm(lang, ic)} and ${b} more ${nm(lang, ic)}. How many ${nm(lang, ic)}?`) : `${a} + ${b} = …`;
  return {
    type: 'num',
    q,
    fig: story && s <= 8 ? [...row('a', ic, a, 200 - (b * 22 + 22), 150, { dx: 44, size: 36 }), txt('p', '+', 200 + (a - b) * 11, 150, { size: 30 }), ...row('b', ic, b, 200 + (a * 22 + 22), 150, { dx: 44, size: 36 })] : undefined,
    ans: [S(s)],
    wrong: wrongs(s, [
      [Math.abs(a - b), L(lang, 'Itu dikurangi. Tambah berarti bertambah banyak.', 'That is subtracting. Adding makes more.')],
      [s - 1, L(lang, `Mulai dari ${Math.max(a, b)}, lalu maju ${Math.min(a, b)} langkah.`, `Start at ${Math.max(a, b)}, then count on ${Math.min(a, b)}.`)],
      [s + 1, L(lang, `Mulai dari ${Math.max(a, b)}, maju tepat ${Math.min(a, b)} langkah.`, `Start at ${Math.max(a, b)} and count on exactly ${Math.min(a, b)}.`)],
      [Number(`${a}${b}`), L(lang, 'Angkanya ditulis berdampingan. Kita perlu menjumlah.', 'The digits were written side by side. We need to add.')],
    ]),
    steps: [L(lang, `Mulai dari ${Math.max(a, b)}, maju ${Math.min(a, b)}.`, `Start at ${Math.max(a, b)}, count on ${Math.min(a, b)}.`), `= ${s}.`],
  };
};
const partWhole = (rnd, lang) => {
  const n = ri(rnd, 4, 10);
  const a = ri(rnd, 1, n - 1);
  const b = n - a;
  return {
    type: 'num',
    q: `${n} = ${a} + …`,
    fig: n >= 6 && rnd() < 0.5 ? tenframe('f', 200, 150, a).concat([]) : undefined,
    ans: [S(b)],
    wrong: wrongs(b, [
      [n + a, L(lang, `Kita mencari bagian yang kurang, bukan menjumlah ${n} dan ${a}.`, `We need the missing part, not ${n} plus ${a}.`)],
      [n, L(lang, `${n} adalah jumlah semuanya. Berapa yang perlu ditambah ke ${a}?`, `${n} is the whole. How many do we add to ${a}?`)],
      [a, L(lang, `${a} + ${a} bukan ${n}.`, `${a} + ${a} is not ${n}.`)],
    ]),
    steps: [L(lang, `Dari ${a} maju sampai ${n}.`, `Count on from ${a} to ${n}.`), L(lang, `Maju ${b} langkah: ${n} = ${a} + ${b}.`, `${b} steps: ${n} = ${a} + ${b}.`)],
  };
};

// ---------- Bab 3: Pengurangan sampai 10 ----------
const takeAway = (rnd, lang) => {
  const a = ri(rnd, 3, 10);
  const b = ri(rnd, 1, a - 1);
  const d = a - b;
  const story = rnd() < 0.5;
  const ic = thing(rnd);
  return {
    type: 'num',
    q: story
      ? ic === 'apple'
        ? L(lang, `Ada ${a} apel. ${b} apel dimakan. Sisa apel ada …`, `There are ${a} apples. ${b} are eaten. How many apples are left?`)
        : L(lang, `Ada ${a} bintang. ${b} bintang dihapus. Sisa bintang ada …`, `There are ${a} stars. ${b} are rubbed out. How many stars are left?`)
      : `${a} − ${b} = …`,
    fig: story ? row('f', ic, a, 200, 150, { dx: Math.min(50, 320 / a), size: 34 }) : undefined,
    ans: [S(d)],
    wrong: wrongs(d, [
      [a + b, L(lang, `Itu ${a} tambah ${b}. Dikurangi berarti mundur.`, `That is ${a} plus ${b}. Taking away means counting back.`)],
      [b, L(lang, `${b} adalah yang diambil. Yang ditanya sisanya.`, `${b} is the amount taken away. The question asks what is left.`)],
      [a, L(lang, 'Setelah diambil, banyaknya berkurang.', 'After taking some away, there are fewer.')],
      [d + 1, L(lang, `Mundur tepat ${b} langkah dari ${a}.`, `Count back exactly ${b} steps from ${a}.`)],
    ]),
    steps: [L(lang, `Mundur ${b} dari ${a}.`, `Count back ${b} from ${a}.`), `= ${d}.`],
  };
};
const difference = (rnd, lang) => {
  const a = ri(rnd, 4, 10);
  const b = ri(rnd, 1, a - 1);
  const [p1, p2] = two(rnd);
  const [id, en] = pick(rnd, THINGS);
  return {
    type: 'num',
    q: L(lang, `${p1} punya ${a} ${id}. ${p2} punya ${b} ${id}. ${id[0].toUpperCase() + id.slice(1)} ${p1} lebih banyak …`, `${p1} has ${a} ${en}. ${p2} has ${b} ${en}. How many more ${en} does ${p1} have?`),
    ans: [S(a - b)],
    wrong: wrongs(a - b, [
      [a + b, L(lang, 'Selisih dicari dengan pengurangan, bukan penjumlahan.', 'The difference is found by subtracting, not adding.')],
      [b, L(lang, `${b} adalah milik ${p2}. Yang ditanya selisihnya.`, `${b} is what ${p2} has. The question asks for the difference.`)],
      [a, L(lang, `${a} adalah milik ${p1}. Yang ditanya kelebihannya.`, `${a} is what ${p1} has. The question asks how many more.`)],
    ]),
    steps: [L(lang, `Pasangkan ${b} dengan ${b}.`, `Pair ${b} with ${b}.`), `${a} − ${b} = ${a - b}.`],
  };
};
const factFamily = (rnd, lang) => {
  const a = ri(rnd, 1, 8);
  const b = ri(rnd, 1, 10 - a);
  const c = a + b;
  const takeA = rnd() < 0.5;
  const sub = takeA ? a : b;
  const ans = takeA ? b : a;
  return {
    type: 'num',
    q: L(lang, `${a} + ${b} = ${c}, maka ${c} − ${sub} = …`, `${a} + ${b} = ${c}, so ${c} − ${sub} = …`),
    ans: [S(ans)],
    wrong: wrongs(ans, [
      [sub, L(lang, `${sub} adalah yang diambil.`, `${sub} is the part taken away.`)],
      [c + sub, L(lang, `Itu ${c} + ${sub}.`, `That is ${c} + ${sub}.`)],
      [c, L(lang, `${c} adalah jumlah semuanya.`, `${c} is the whole.`)],
    ]),
    steps: [L(lang, `${c} terbuat dari ${a} dan ${b}.`, `${c} is made of ${a} and ${b}.`), `${c} − ${sub} = ${ans}.`],
  };
};

// ---------- Bab 4: Mengenal Bentuk ----------
const SHAPES = [
  { k: 'circle', id: 'lingkaran', en: 'circle', corners: 0, el: () => ({ id: 's', t: 'circle', x: 200, y: 150, r: 58, fill: 'neg-soft', stroke: 'neg', sw: 3 }) },
  { k: 'tri', id: 'segitiga', en: 'triangle', corners: 3, el: () => ({ id: 's', t: 'poly', x: 200, y: 160, pts: [[0, -72], [72, 54], [-72, 54]], fill: 'acc-soft', stroke: 'acc', sw: 3 }) },
  { k: 'sq', id: 'persegi', en: 'square', corners: 4, el: () => ({ id: 's', t: 'rect', x: 200, y: 150, w: 120, h: 120, fill: 'pos-soft', stroke: 'pos', sw: 3 }) },
  { k: 'rect', id: 'persegi panjang', en: 'rectangle', corners: 4, el: () => ({ id: 's', t: 'rect', x: 200, y: 150, w: 190, h: 100, fill: 'ok-soft', stroke: 'ok', sw: 3 }) },
];
const shapeWhy = (lang, s) =>
  ({
    circle: L(lang, 'Lingkaran bulat dan tidak punya sudut.', 'A circle is round and has no corners.'),
    tri: L(lang, 'Segitiga punya 3 sudut.', 'A triangle has 3 corners.'),
    sq: L(lang, 'Persegi punya 4 sisi yang sama panjang.', 'A square has 4 equal sides.'),
    rect: L(lang, 'Persegi panjang punya 2 sisi panjang dan 2 sisi pendek.', 'A rectangle has 2 long sides and 2 short sides.'),
  })[s.k];
const shapeName = (rnd, lang) => {
  const s = pick(rnd, SHAPES);
  const others = SHAPES.filter((x) => x !== s);
  return {
    q: L(lang, 'Bentuk ini bernama …', 'This shape is called …'),
    fig: [s.el()],
    options: [{ t: L(lang, s.id, s.en), ok: true }, ...others.map((o) => ({ t: L(lang, o.id, o.en), why: shapeWhy(lang, o) }))],
    steps: [shapeWhy(lang, s), L(lang, `Namanya ${s.id}.`, `It is a ${s.en}.`)],
  };
};
const shapeCorners = (rnd, lang) => {
  const s = pick(rnd, SHAPES);
  return {
    type: 'num',
    q: L(lang, `Berapa banyak sudut ${s.id}?`, `How many corners does a ${s.en} have?`),
    fig: [s.el()],
    ans: [S(s.corners)],
    wrong: wrongs(s.corners, [
      [s.corners + 1, L(lang, 'Tunjuk setiap pojok sekali saja.', 'Point to each corner only once.')],
      [s.corners === 0 ? 1 : s.corners - 1, s.corners === 0 ? L(lang, 'Lingkaran melengkung terus, tidak ada pojok.', 'A circle curves all the way round, with no corners.') : L(lang, 'Ada pojok yang terlewat.', 'One corner was missed.')],
    ]),
    steps: [shapeWhy(lang, s)],
  };
};
const SOLIDS = [
  { id: 'bola', en: 'sphere', items: [['bola sepak', 'a football'], ['jeruk', 'an orange'], ['kelereng', 'a marble']] },
  { id: 'kubus', en: 'cube', items: [['dadu', 'a dice'], ['kotak hadiah yang semua sisinya sama', 'a gift box with equal sides']] },
  { id: 'balok', en: 'cuboid', items: [['kotak sepatu', 'a shoebox'], ['batu bata', 'a brick'], ['kotak susu', 'a milk carton']] },
  { id: 'tabung', en: 'cylinder', items: [['kaleng susu', 'a tin can'], ['gelas', 'a drinking glass'], ['pipa', 'a pipe']] },
  { id: 'kerucut', en: 'cone', items: [['topi ulang tahun', 'a party hat'], ['cone es krim', 'an ice cream cone']] },
];
const solidWhy = {
  bola: ['Bola bulat ke segala arah, tidak punya sisi datar.', 'A sphere is round all over with no flat faces.'],
  kubus: ['Kubus punya 6 sisi persegi yang sama besar.', 'A cube has 6 equal square faces.'],
  balok: ['Balok punya 6 sisi, tidak semuanya sama besar.', 'A cuboid has 6 faces that are not all the same.'],
  tabung: ['Tabung punya alas dan tutup lingkaran, dan sisi lengkung.', 'A cylinder has round top and bottom faces and a curved side.'],
  kerucut: ['Kerucut punya alas lingkaran dan ujung lancip.', 'A cone has a round base and a pointed tip.'],
};
const solidOf = (rnd, lang) => {
  const s = pick(rnd, SOLIDS);
  const [iid, ien] = pick(rnd, s.items);
  const others = SOLIDS.filter((x) => x !== s);
  const opts = [others[Math.floor(rnd() * others.length)]];
  while (opts.length < 3) {
    const o = pick(rnd, others);
    if (!opts.includes(o)) opts.push(o);
  }
  return {
    q: L(lang, `Bentuk ${iid} seperti …`, `The shape of ${ien} is like a …`),
    options: [{ t: L(lang, s.id, s.en), ok: true }, ...opts.map((o) => ({ t: L(lang, o.id, o.en), why: L(lang, ...solidWhy[o.id]) }))],
    steps: [L(lang, ...solidWhy[s.id]), L(lang, `Jadi ${iid} berbentuk ${s.id}.`, `So ${ien} is shaped like a ${s.en}.`)],
  };
};

// ---------- Bab 5: Membilang sampai 20 ----------
const tenAnd = (rnd, lang) => {
  const n = ri(rnd, 1, 9);
  const show = rnd() < 0.5;
  return {
    type: 'num',
    q: show ? L(lang, 'Ada berapa bulatan?', 'How many dots are there?') : L(lang, `10 dan ${n} adalah …`, `10 and ${n} make …`),
    fig: show ? [...tenframe('a', 200, 95, 10), ...tenframe('b', 200, 205, n)] : undefined,
    ans: [S(10 + n)],
    wrong: wrongs(10 + n, [
      [n, L(lang, 'Kotak atas penuh: itu 10. Tambahkan dengan kotak bawah.', 'The top frame is full: that is 10. Add the bottom frame.')],
      [10, L(lang, `Masih ada ${n} lagi selain 10.`, `There are ${n} more besides the 10.`)],
      [Number(`10${n}`), L(lang, `Sepuluh dan ${n} ditulis ${10 + n}, bukan 10${n}.`, `Ten and ${n} is written ${10 + n}, not 10${n}.`)],
      [10 + n - 1, L(lang, 'Ada yang terlewat.', 'One was missed.')],
    ]),
    steps: [L(lang, `10 dan ${n}.`, `10 and ${n}.`), `= ${10 + n}.`],
  };
};
const order20 = (rnd, lang) => {
  const kind = pick(rnd, ['after', 'before', 'between']);
  const n = ri(rnd, 2, 19);
  if (kind === 'after')
    return {
      type: 'num',
      q: L(lang, `Angka sesudah ${n} adalah …`, `The number after ${n} is …`),
      ans: [S(n + 1)],
      wrong: wrongs(n + 1, [[n - 1, L(lang, `${n - 1} datang sebelum ${n}.`, `${n - 1} comes before ${n}.`)]]),
      steps: [`${n}, ${n + 1}.`],
    };
  if (kind === 'before')
    return {
      type: 'num',
      q: L(lang, `Angka sebelum ${n} adalah …`, `The number before ${n} is …`),
      ans: [S(n - 1)],
      wrong: wrongs(n - 1, [[n + 1, L(lang, `${n + 1} datang sesudah ${n}.`, `${n + 1} comes after ${n}.`)]]),
      steps: [`${n - 1}, ${n}.`],
    };
  const m = Math.min(n, 18);
  return {
    type: 'num',
    q: L(lang, `${m - 1}, …, ${m + 1}. Angka yang hilang adalah …`, `${m - 1}, …, ${m + 1}. The missing number is …`),
    ans: [S(m)],
    wrong: wrongs(m, [
      [m + 2, L(lang, 'Angka yang hilang ada di tengah, di antara keduanya.', 'The missing number is in the middle, between the two.')],
      [m - 2, L(lang, 'Angka yang hilang ada di tengah, di antara keduanya.', 'The missing number is in the middle, between the two.')],
    ]),
    steps: [`${m - 1}, ${m}, ${m + 1}.`],
  };
};

// ---------- Bab 6: Penjumlahan dan pengurangan sampai 20 ----------
const makeTen = (rnd, lang) => {
  const a = ri(rnd, 6, 9);
  const b = ri(rnd, 11 - a, 9);
  const s = a + b;
  const need = 10 - a;
  return {
    type: 'num',
    q: `${a} + ${b} = …`,
    ans: [S(s)],
    wrong: wrongs(s, [
      [Math.abs(a - b), L(lang, `Itu ${Math.max(a, b)} kurang ${Math.min(a, b)}.`, `That is ${Math.max(a, b)} minus ${Math.min(a, b)}.`)],
      [s - 1, L(lang, `${a} + ${need} = 10, sisa ${b - need}. 10 + ${b - need} = ${s}.`, `${a} + ${need} = 10, with ${b - need} left. 10 + ${b - need} = ${s}.`)],
      [s + 1, L(lang, `${a} + ${need} = 10, sisa ${b - need}. 10 + ${b - need} = ${s}.`, `${a} + ${need} = 10, with ${b - need} left. 10 + ${b - need} = ${s}.`)],
      [10 + b, L(lang, `${a} perlu ${need} untuk menjadi 10, jadi ${b} tinggal ${b - need}.`, `${a} needs ${need} to make 10, so only ${b - need} is left from ${b}.`)],
    ]),
    steps: [L(lang, `${a} + ${need} = 10, sisa ${b - need}.`, `${a} + ${need} = 10, with ${b - need} left.`), `10 + ${b - need} = ${s}.`],
  };
};
const subTeen = (rnd, lang) => {
  const a = ri(rnd, 11, 18);
  const b = ri(rnd, a - 9, 9);
  const d = a - b;
  const first = a - 10;
  return {
    type: 'num',
    q: `${a} − ${b} = …`,
    ans: [S(d)],
    wrong: wrongs(d, [
      [10, L(lang, `Itu baru ${a} − ${first}. Ambil ${b - first} lagi.`, `That is only ${a} − ${first}. Take away ${b - first} more.`)],
      [a + b, L(lang, `Itu ${a} + ${b}.`, `That is ${a} + ${b}.`)],
      [d + 1, L(lang, `${a} − ${first} = 10, lalu 10 − ${b - first} = ${d}.`, `${a} − ${first} = 10, then 10 − ${b - first} = ${d}.`)],
      [b - first, L(lang, `Mulai dari ${a}, bukan dari 10.`, `Start from ${a}, not from 10.`)],
    ]),
    steps: [`${a} − ${first} = 10.`, `10 − ${b - first} = ${d}.`],
  };
};
const story20 = (rnd, lang) => {
  const [p] = two(rnd);
  const [id, en] = pick(rnd, THINGS);
  const add = rnd() < 0.5;
  const a = add ? ri(rnd, 5, 9) : ri(rnd, 11, 18);
  const b = add ? ri(rnd, 11 - a, 9) : ri(rnd, a - 9, 9);
  const ans = add ? a + b : a - b;
  return {
    type: 'num',
    q: add
      ? L(lang, `${p} punya ${a} ${id}. Ia mendapat ${b} ${id} lagi. ${id[0].toUpperCase() + id.slice(1)} ${p} sekarang …`, `${p} has ${a} ${en} and gets ${b} more. How many ${en} does ${p} have now?`)
      : L(lang, `${p} punya ${a} ${id}. ${b} ${id} diberikan kepada temannya. Sisa ${id} ${p} …`, `${p} has ${a} ${en} and gives ${b} to a friend. How many ${en} are left?`),
    ans: [S(ans)],
    wrong: wrongs(ans, [
      [add ? Math.abs(a - b) : a + b, add ? L(lang, 'Mendapat lagi berarti bertambah.', 'Getting more means adding.') : L(lang, 'Diberikan berarti berkurang.', 'Giving away means subtracting.')],
      [ans - 1, L(lang, 'Gunakan cara membuat 10 lalu cek lagi.', 'Use the make-10 strategy and check again.')],
    ]),
    steps: add ? [`${a} + ${b} = ${ans}.`] : [`${a} − ${b} = ${ans}.`],
  };
};

// ---------- Bab 7: Mengukur panjang ----------
const ribbon = (id, x0, y, len, c) => ({ id, t: 'poly', x: 0, y: 0, pts: [[x0, y - 9], [x0 + len, y - 9], [x0 + len + 18, y], [x0 + len, y + 9], [x0, y + 9]], fill: `${c}-soft`, stroke: c, sw: 2.5 });
const compareLen = (rnd, lang) => {
  let a = ri(rnd, 6, 14) * 20;
  let b = ri(rnd, 6, 14) * 20;
  while (a === b) b = ri(rnd, 6, 14) * 20;
  const longer = rnd() < 0.5;
  const redWins = longer ? a > b : a < b;
  const w = longer ? L(lang, 'lebih panjang', 'longer') : L(lang, 'lebih pendek', 'shorter');
  return {
    q: L(lang, `Pita mana yang ${w}?`, `Which ribbon is ${w}?`),
    fig: [ribbon('a', 50, 110, a, 'neg'), ribbon('b', 50, 190, b, 'pos'), { id: 'g', t: 'line', x: 50, y: 85, x2: 50, y2: 215, sw: 2, c: 'mut', dash: '5 5' }],
    options: [
      redWins ? { t: L(lang, 'pita merah', 'the red ribbon'), ok: true } : { t: L(lang, 'pita merah', 'the red ribbon'), why: L(lang, 'Ujung kiri sudah sejajar. Lihat ujung kanannya.', 'The left ends line up. Look at the right ends.') },
      !redWins ? { t: L(lang, 'pita biru', 'the blue ribbon'), ok: true } : { t: L(lang, 'pita biru', 'the blue ribbon'), why: L(lang, 'Ujung kiri sudah sejajar. Lihat ujung kanannya.', 'The left ends line up. Look at the right ends.') },
    ],
    fixed: true,
    steps: [L(lang, 'Ujung kiri kedua pita sejajar.', 'Both ribbons start at the same line.'), L(lang, `Pita yang ujung kanannya ${longer ? 'lebih jauh' : 'lebih dekat'} adalah yang ${w}.`, `The one whose right end is ${longer ? 'further' : 'closer'} is ${w}.`)],
  };
};
const measureClips = (rnd, lang) => {
  const n = ri(rnd, 3, 9);
  const cw = 30;
  const x0 = 200 - (n * cw) / 2;
  const clips = Array.from({ length: n }, (_, i) => ({ id: `c${i}`, t: 'rect', x: x0 + cw / 2 + i * cw, y: 170, w: cw - 2, h: 12, r: 6, fill: 'paper', stroke: 'mut', sw: 2 }));
  const obj = rnd() < 0.5;
  return {
    type: 'num',
    q: obj ? L(lang, 'Panjang pita ini berapa klip?', 'How many clips long is this ribbon?') : L(lang, 'Panjang pensil ini berapa klip?', 'How many clips long is this pencil?'),
    fig: [{ id: 'p', t: 'rect', x: 200, y: 125, w: n * cw, h: 18, r: 3, fill: obj ? 'neg-soft' : 'pos-soft', stroke: obj ? 'neg' : 'pos', sw: 2 }, ...clips],
    ans: [S(n)],
    wrong: wrongs(n, [
      [n + 1, L(lang, 'Ada klip yang terhitung dua kali.', 'One clip was counted twice.')],
      [n - 1, L(lang, 'Ada klip yang terlewat. Hitung dari ujung ke ujung.', 'One clip was missed. Count from end to end.')],
    ]),
    steps: [L(lang, 'Klip disusun rapat dari ujung ke ujung.', 'The clips are placed end to end with no gaps.'), L(lang, `Ada ${n} klip.`, `There are ${n} clips.`)],
  };
};

// ---------- Bab 8: Diagram gambar ----------
function picto(rows, lang) {
  const els = [];
  rows.forEach(([icon, n], r) => {
    const y = 80 + r * 70;
    els.push(txt(`l${r}`, nm(lang, icon), 60, y, { size: 16 }));
    for (let i = 0; i < n; i++) els.push({ id: `f${r}_${i}`, t: 'icon', name: icon, x: 125 + i * 36, y, size: 28 });
  });
  return els;
}
const readPicto = (rnd, lang) => {
  const a = ri(rnd, 1, 7);
  let b = ri(rnd, 1, 7);
  const ask = pick(rnd, ['apple', 'star', 'total']);
  const ans = ask === 'apple' ? a : ask === 'star' ? b : a + b;
  return {
    type: 'num',
    q: ask === 'total' ? L(lang, 'Ada berapa benda seluruhnya pada diagram?', 'How many things are on the chart altogether?') : L(lang, `Ada berapa ${nm(lang, ask)} pada diagram?`, `How many ${nm(lang, ask)} are on the chart?`),
    fig: picto([['apple', a], ['star', b]], lang),
    ans: [S(ans)],
    wrong: wrongs(ans, [
      [ask === 'apple' ? b : a, L(lang, 'Itu baris yang lain. Baca labelnya dulu.', 'That is the other row. Read the label first.')],
      [ans + 1, L(lang, 'Hitung gambar di baris itu sekali lagi.', 'Count the pictures in that row again.')],
      [ask === 'total' ? Math.max(a, b) : a + b, ask === 'total' ? L(lang, 'Jumlahkan kedua baris.', 'Add both rows.') : L(lang, 'Yang ditanya satu baris saja.', 'Only one row is asked for.')],
    ]),
    steps: [L(lang, `Apel ${a}, bintang ${b}.`, `Apples ${a}, stars ${b}.`), `${ans}.`],
  };
};
const comparePicto = (rnd, lang) => {
  const a = ri(rnd, 1, 7);
  let b = ri(rnd, 1, 7);
  while (a === b) b = ri(rnd, 1, 7);
  const big = a > b ? 'apple' : 'star';
  const small = big === 'apple' ? 'star' : 'apple';
  const asNum = rnd() < 0.5;
  const d = Math.abs(a - b);
  if (asNum)
    return {
      type: 'num',
      q: L(lang, `${nm(lang, big)[0].toUpperCase() + nm(lang, big).slice(1)} lebih banyak berapa dari ${nm(lang, small)}?`, `How many more ${nm(lang, big)} than ${nm(lang, small)} are there?`),
      fig: picto([['apple', a], ['star', b]], lang),
      ans: [S(d)],
      wrong: wrongs(d, [
        [a + b, L(lang, 'Yang ditanya selisihnya, bukan jumlahnya.', 'The question asks for the difference, not the total.')],
        [Math.max(a, b), L(lang, 'Bandingkan kedua baris. Hitung yang tidak punya pasangan.', 'Compare the rows. Count the ones without a partner.')],
      ]),
      steps: [`${Math.max(a, b)} − ${Math.min(a, b)} = ${d}.`],
    };
  return {
    q: L(lang, 'Mana yang paling banyak?', 'Which has the most?'),
    fig: picto([['apple', a], ['star', b]], lang),
    options: [
      { t: L(lang, 'apel', 'apples'), ...(big === 'apple' ? { ok: true } : { why: L(lang, `Apel ${a}, bintang ${b}.`, `Apples ${a}, stars ${b}.`) }) },
      { t: L(lang, 'bintang', 'stars'), ...(big === 'star' ? { ok: true } : { why: L(lang, `Bintang ${b}, apel ${a}.`, `Stars ${b}, apples ${a}.`) }) },
    ],
    fixed: true,
    steps: [L(lang, 'Baris yang lebih panjang berisi lebih banyak.', 'The longer row has more.')],
  };
};

export const K1 = {
  'k1b1-1': [count5],
  'k1b1-2': [count10],
  'k1b1-3': [moreLess],
  'k1b2-1': [join],
  'k1b2-2': [partWhole],
  'k1b3-1': [takeAway],
  'k1b3-2': [difference],
  'k1b3-3': [factFamily],
  'k1b4-1': [shapeName, shapeCorners],
  'k1b4-2': [solidOf],
  'k1b5-1': [tenAnd],
  'k1b5-2': [order20],
  'k1b6-1': [makeTen, story20],
  'k1b6-2': [subTeen, story20],
  'k1b7-1': [compareLen],
  'k1b7-2': [measureClips],
  'k1b8-1': [readPicto],
  'k1b8-2': [comparePicto, readPicto],
};
