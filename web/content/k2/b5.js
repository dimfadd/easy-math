// Kelas 2 · Bab 5: Pecahan (setengah dan seperempat)
import { T, F, ln } from '../helpers.js';
import { objs } from '../k1/kit.js';

const W = 180;
const H = 100;
// Persegi panjang dibagi n bagian tegak; bagian berwarna = filled
function parts(p, x, y, n, filled = [], { w = W, h = H, c = 'acc' } = {}) {
  return Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'rect', x: x - w / 2 + (w / n) * (i + 0.5), y, w: w / n, h, r: 0, fill: filled.includes(i) ? `${c}-soft` : 'paper', stroke: 'ink', sw: 2.5 }));
}
// Lingkaran (kue) dibagi 2 atau 4
const pie = (p, x, y, n, filled = [], r = 60) => [
  ...Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'arc', x, y, r, a1: 90 + (360 / n) * i, a2: 90 + (360 / n) * (i + 1), c: filled.includes(i) ? 'acc' : 'mut' })),
  { id: `${p}o`, t: 'circle', x, y, r, fill: 'none', stroke: 'ink', sw: 2.5 },
];

// ---------- 5.1 Setengah ----------
const l1 = {
  id: 'k2b5-1',
  title: 'Setengah',
  hook: 'Setengah berarti satu dari dua bagian yang sama besar. Ditulis ½.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Roti ini dipotong menjadi dua. Apakah ini dibagi menjadi setengah?',
          add: [...parts('a', 200, 110, 1, [0], { w: W }), ln('cut', 150, 55, 150, 165, { sw: 3, c: 'neg', draw: false })],
          ask: {
            options: [
              { t: 'bukan, potongannya tidak sama besar', ok: true, why: 'Setengah harus dua bagian yang sama besar. Potongan kiri lebih kecil.' },
              { t: 'ya, karena ada dua potong', why: 'Dua potong saja belum cukup. Keduanya harus sama besar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dua bagian sama besar',
      steps: [
        {
          say: 'Potong tepat di tengah. Kedua bagian sama besar.',
          clear: true,
          add: parts('a', 200, 100, 2, [0]),
        },
        {
          say: 'Satu bagian berwarna dari dua bagian yang sama besar disebut setengah. Ditulis 1 per 2.',
          add: [F('f', '1', '2', 200, 195, { size: 30, c: 'acc' }), T('k', 'setengah', 290, 195, { size: 20, c: 'mut' })],
        },
        {
          say: 'Angka bawah, 2, adalah banyak bagian yang sama besar. Angka atas, 1, adalah bagian yang diambil.',
          add: [T('b', 'bawah: dibagi 2 sama besar', 200, 258, { size: 15, c: 'mut' }), T('c', 'atas: diambil 1', 200, 282, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Setengah dari kumpulan',
      steps: [
        {
          say: 'Ada 6 apel. Bagi menjadi dua kelompok yang sama banyak.',
          clear: true,
          add: objs('a', 'apple', 6, 80, 100, { dx: 48, size: 40 }),
        },
        {
          say: 'Setiap kelompok berisi 3 apel. Jadi setengah dari 6 adalah 3.',
          set: { a3: { x: 260 }, a4: { x: 308 }, a5: { x: 356 } },
          add: [ln('sep', 220, 70, 220, 130, { sw: 2.5, c: 'mut', dash: '5 5' }), T('k', 'setengah dari 6 = {g:3}', 200, 200, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Setengah dari 10 apel ada berapa?',
          clear: true,
          add: objs('a', 'apple', 10, 50, 100, { dx: 34, size: 30 }),
          ask: {
            options: [
              { t: '5', ok: true, why: '10 dibagi dua kelompok sama banyak: 5 dan 5.' },
              { t: '2', why: '2 adalah banyak kelompoknya, bukan isi setiap kelompok.' },
              { t: '10', why: '10 adalah semuanya.' },
              { t: '8', why: 'Kelompok 8 dan 2 tidak sama banyak.' },
            ],
          },
        },
        {
          say: 'Bagi menjadi dua kelompok sama banyak: 5 dan 5. Setengah dari 10 adalah 5.',
          set: Object.fromEntries([5, 6, 7, 8, 9].map((i) => [`a${i}`, { x: 50 + i * 34 + 20 }])),
          add: [ln('sep', 50 + 4.5 * 34 + 10, 75, 50 + 4.5 * 34 + 10, 125, { sw: 2.5, c: 'mut', dash: '5 5' }), T('k', 'setengah dari 10 = {g:5}', 200, 200, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Gambar mana yang menunjukkan setengah?',
      fig: [...parts('a', 110, 150, 2, [0], { w: 140, h: 80 }), T('la', 'A', 110, 210, { size: 18 }), ...parts('b', 290, 150, 3, [0], { w: 140, h: 80 }), T('lb', 'B', 290, 210, { size: 18 })],
      options: [
        { t: 'A', ok: true },
        { t: 'B', why: 'B dibagi menjadi 3 bagian, jadi satu bagiannya sepertiga.' },
      ],
      steps: ['A: 1 dari 2 bagian sama besar.', 'Setengah.'],
    },
    {
      type: 'num',
      q: 'Setengah dari 8 adalah …',
      ans: ['4'],
      wrong: { '16': 'Setengah berarti dibagi dua, bukan dikali dua.', '2': 'Bagi 8 menjadi 2 kelompok: masing-masing 4.' },
      steps: ['8 dibagi 2 kelompok sama banyak.', 'Setiap kelompok 4.'],
    },
    {
      type: 'num',
      q: 'Setengah dari 4 kue adalah … kue.',
      fig: objs('f', 'apple', 4, 125, 150, { dx: 50, size: 40 }),
      ans: ['2'],
      wrong: { '8': 'Setengah berarti dibagi dua.', '4': '4 adalah semuanya.' },
      steps: ['4 dibagi 2 kelompok.', '2 kue.'],
    },
    {
      q: 'Pecahan setengah ditulis …',
      options: [
        { t: '1/2', ok: true },
        { t: '2/1', why: 'Angka bawah adalah banyak bagian: 2. Ditulis 1/2.' },
        { t: '1/4', why: '1/4 adalah seperempat.' },
      ],
      steps: ['1 bagian dari 2: 1/2.'],
    },
    {
      q: 'Roti dibagi dua untuk dua anak. Supaya adil, potongannya harus …',
      options: [
        { t: 'sama besar', ok: true },
        { t: 'satu besar, satu kecil', why: 'Tidak adil. Setengah berarti sama besar.' },
        { t: 'berbeda warna', why: 'Warna tidak memengaruhi besar potongan.' },
      ],
      steps: ['Setengah = dua bagian sama besar.'],
    },
  ],
};

// ---------- 5.2 Seperempat ----------
const l2 = {
  id: 'k2b5-2',
  title: 'Seperempat',
  hook: 'Seperempat berarti satu dari empat bagian yang sama besar. Ditulis ¼. Dua seperempat sama dengan setengah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kue dipotong menjadi 4 bagian sama besar. Satu potong diambil. Berapa bagian kue yang diambil?',
          add: pie('p', 200, 120, 4, [0]),
          ask: {
            options: [
              { t: 'seperempat', ok: true, why: '1 bagian dari 4 bagian yang sama besar: seperempat, 1/4.' },
              { t: 'setengah', why: 'Setengah adalah 2 dari 4 potong.' },
              { t: 'sepertiga', why: 'Kuenya dibagi 4, bukan 3.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Empat bagian sama besar',
      steps: [
        {
          say: 'Bagi setengah sekali lagi menjadi dua. Sekarang ada 4 bagian sama besar.',
          clear: true,
          add: pie('p', 120, 120, 4, [0]),
        },
        {
          say: 'Satu bagian dari 4 disebut seperempat, ditulis 1 per 4.',
          add: [F('f', '1', '4', 280, 100, { size: 34, c: 'acc' }), T('k', 'seperempat', 280, 160, { size: 18, c: 'mut' })],
        },
        {
          say: 'Dua bagian dari 4 sama dengan setengah kue.',
          set: { p1: { c: 'acc' } },
          add: [T('k2', '2 seperempat = setengah', 200, 240, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Seperempat dari kumpulan',
      steps: [
        {
          say: 'Ada 8 apel. Bagi menjadi 4 kelompok yang sama banyak. Setiap kelompok berisi 2. Jadi seperempat dari 8 adalah 2.',
          clear: true,
          add: [...[0, 1, 2, 3].flatMap((g) => objs(`a${g}_`, 'apple', 2, 55 + g * 90, 110, { dx: 36, size: 32 })), ...[1, 2, 3].map((g) => ln(`s${g}`, 37 + g * 90, 80, 37 + g * 90, 140, { sw: 2, c: 'mut', dash: '5 5' })), T('k', 'seperempat dari 8 = {g:2}', 200, 200, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Bagian berwarna menunjukkan pecahan berapa?',
          clear: true,
          add: parts('a', 200, 110, 4, [2]),
          ask: {
            options: [
              { t: '1/4', ok: true, why: '1 bagian berwarna dari 4 bagian yang sama besar.' },
              { t: '1/2', why: 'Setengah berarti 2 dari 4 bagian berwarna.' },
              { t: '4/1', why: 'Angka bawah adalah banyak bagian: 4. Ditulis 1/4.' },
            ],
          },
        },
        {
          say: 'Satu bagian berwarna dari empat bagian. Itu seperempat.',
          add: [F('f', '1', '4', 200, 220, { size: 34, c: 'ok' })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Seperempat dari 12 adalah …',
      ans: ['3'],
      wrong: { '4': '4 adalah banyak kelompoknya.', '6': '6 adalah setengah dari 12.' },
      steps: ['12 dibagi 4 kelompok sama banyak.', 'Setiap kelompok 3.'],
    },
    {
      q: 'Bagian berwarna menunjukkan …',
      fig: pie('f', 200, 150, 4, [0, 1], 80),
      options: [
        { t: 'setengah', ok: true },
        { t: 'seperempat', why: 'Ada 2 bagian berwarna dari 4, sama dengan setengah.' },
        { t: 'satu utuh', why: 'Masih ada 2 bagian yang tidak berwarna.' },
      ],
      steps: ['2 dari 4 bagian.', 'Sama dengan setengah.'],
    },
    {
      q: 'Seperempat ditulis …',
      options: [
        { t: '1/4', ok: true },
        { t: '1/2', why: '1/2 adalah setengah.' },
        { t: '4/1', why: 'Angka bawah adalah banyak bagian: 4.' },
      ],
      steps: ['1 bagian dari 4: 1/4.'],
    },
    {
      type: 'num',
      q: 'Berapa seperempat yang sama dengan satu kue utuh?',
      ans: ['4'],
      wrong: { '2': '2 seperempat adalah setengah.', '1': 'Satu seperempat hanya 1 potong.' },
      steps: ['Kue utuh = 4 potong seperempat.'],
    },
    {
      q: 'Mana yang lebih besar, setengah atau seperempat kue yang sama?',
      options: [
        { t: 'setengah', ok: true },
        { t: 'seperempat', why: 'Kue yang dibagi 4 menghasilkan potongan lebih kecil daripada dibagi 2.' },
      ],
      steps: ['Dibagi 2 → potongan besar.', 'Dibagi 4 → potongan kecil.'],
    },
  ],
};

export default {
  id: 'k2b5',
  no: 5,
  title: 'Pecahan',
  desc: 'Setengah dan seperempat dari bentuk dan dari kumpulan benda, serta cara menulisnya.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Setengah dari 14 adalah …',
      ans: ['7'],
      wrong: { '28': 'Setengah berarti dibagi dua.' },
      steps: ['14 dibagi 2.', '= 7.'],
    },
    {
      type: 'num',
      q: 'Seperempat dari 20 adalah …',
      ans: ['5'],
      wrong: { '10': '10 adalah setengah dari 20.', '4': '4 adalah banyak kelompok.' },
      steps: ['20 dibagi 4 kelompok.', '= 5.'],
    },
    {
      q: 'Dua seperempat sama dengan …',
      options: [
        { t: 'setengah', ok: true },
        { t: 'satu utuh', why: 'Satu utuh adalah empat seperempat.' },
        { t: 'seperempat', why: 'Dua potong lebih banyak dari satu potong.' },
      ],
      steps: ['2 dari 4 bagian = setengah.'],
    },
  ],
};
