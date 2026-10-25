// Kelas 1 · Bab 2: Penjumlahan sampai 10
import { T } from '../helpers.js';
import { objs, objAt, tenframe, tenDot } from './kit.js';

const at = (i, x0, y0, dx = 50) => objAt(i, x0, y0, { dx });

// ---------- 2.1 Menggabungkan ----------
const l1 = {
  id: 'k1b2-1',
  title: 'Menggabungkan',
  hook: 'Menjumlahkan berarti menggabungkan dua kelompok benda, lalu menghitung semuanya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 3 apel di kiri dan 2 apel di kanan. Kalau digabung, ada berapa apel?',
          add: [...objs('a', 'apple', 3, 60, 110, { dx: 50, size: 42 }), ...objs('b', 'apple', 2, 290, 110, { dx: 50, size: 42 })],
          ask: {
            options: [
              { t: '5', ok: true, why: 'Tiga, lalu tambah dua lagi: empat, lima.' },
              { t: '3', why: '3 hanya apel di kiri. Apel di kanan juga dihitung.' },
              { t: '2', why: '2 hanya apel di kanan.' },
              { t: '6', why: 'Hitung semuanya pelan-pelan. Ada 5.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Digabung',
      steps: [
        {
          say: 'Ada 3 apel dan 2 apel.',
          clear: true,
          add: [...objs('a', 'apple', 3, 60, 110, { dx: 50, size: 42 }), ...objs('b', 'apple', 2, 290, 110, { dx: 50, size: 42 }), T('la', '3', 110, 170, { size: 30, c: 'pos' }), T('lb', '2', 315, 170, { size: 30, c: 'acc' })],
        },
        {
          say: 'Gabungkan menjadi satu kelompok.',
          set: { b0: at(3, 60, 110), b1: at(4, 60, 110), lb: { x: 285 } },
        },
        {
          say: 'Hitung semuanya. Satu, dua, tiga, empat, lima. Ada 5 apel.',
          add: [T('t', 'semua: {g:5}', 160, 220, { size: 28 })],
        },
      ],
    },
    {
      title: 'Tanda tambah',
      steps: [
        {
          say: 'Menggabungkan ditulis dengan tanda tambah. 3 tambah 2 sama dengan 5.',
          clear: true,
          add: [T('a', '3 + 2 = 5', 200, 100, { size: 50 })],
        },
        {
          say: 'Tanda ini dibaca tambah. Tanda dua garis ini dibaca sama dengan.',
          add: [T('b', '+  dibaca "tambah"', 200, 180, { size: 22, c: 'pos' }), T('c', '=  dibaca "sama dengan"', 200, 215, { size: 22, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 4 bintang tambah 3 bintang. Ada berapa bintang?',
          clear: true,
          add: [...objs('a', 'star', 4, 50, 110, { dx: 44, size: 38 }), ...objs('b', 'star', 3, 270, 110, { dx: 44, size: 38 }), T('q', '4 + 3 = ?', 200, 200, { size: 34, c: 'acc' })],
          ask: {
            options: [
              { t: '7', ok: true, why: 'Empat, lalu lima, enam, tujuh.' },
              { t: '6', why: 'Hitung lagi bintang di kanan: ada 3.' },
              { t: '8', why: 'Hitung pelan-pelan. Ada 7.' },
              { t: '1', why: '1 adalah selisihnya. Tambah berarti digabung.' },
            ],
          },
        },
        {
          say: 'Mulai dari 4, lalu hitung maju 3 kali: lima, enam, tujuh. 4 tambah 3 sama dengan 7.',
          set: { b0: at(4, 50, 110, 44), b1: at(5, 50, 110, 44), b2: at(6, 50, 110, 44) },
          add: [T('ans', '4 + 3 = {g:7}', 200, 250, { size: 34 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '2 apel tambah 2 apel. Ada berapa apel?',
      fig: [...objs('a', 'apple', 2, 100, 150, { dx: 50, size: 40 }), T('p', '+', 200, 150, { size: 30 }), ...objs('b', 'apple', 2, 250, 150, { dx: 50, size: 40 })],
      ans: ['4'],
      wrong: { '2': 'Gabungkan kedua kelompok.', '3': 'Hitung lagi semuanya.' },
      steps: ['2 + 2.', '= 4.'],
    },
    {
      type: 'num',
      q: '1 + 4 = …',
      ans: ['5'],
      wrong: { '4': 'Mulai dari 4, hitung maju 1: 5.', '3': 'Tambah berarti bertambah banyak.' },
      steps: ['Mulai dari 4, maju 1.', '= 5.'],
    },
    {
      type: 'num',
      q: '6 + 2 = …',
      ans: ['8'],
      wrong: { '4': 'Itu 6 kurang 2. Tambah berarti maju.', '7': 'Maju 2 kali: 7, 8.' },
      steps: ['Mulai dari 6, maju 2: 7, 8.', '= 8.'],
    },
    {
      type: 'num',
      q: 'Rina punya 3 bola. Ia diberi 3 bola lagi. Sekarang bola Rina ada …',
      ans: ['6'],
      wrong: { '3': 'Bola Rina bertambah 3.', '0': 'Diberi berarti bertambah.' },
      steps: ['3 + 3.', '= 6 bola.'],
    },
    {
      type: 'num',
      q: '5 + 4 = …',
      fig: [...tenframe('f', 200, 150, 5), ...[5, 6, 7, 8].map((i) => tenDot('f', i, 200, 150, { c: 'pos' }))],
      ans: ['9'],
      wrong: { '10': 'Masih ada satu kotak kosong.', '1': 'Itu selisihnya. Tambah berarti digabung.' },
      steps: ['Merah 5, biru 4.', '5 + 4 = 9.'],
    },
  ],
};

// ---------- 2.2 Menyusun dan mengurai bilangan ----------
const FX = 200;
const FY = 110;
const two = (id, a, b, x = FX, y = FY) => [...tenframe(id, x, y, a), ...Array.from({ length: b }, (_, k) => tenDot(id, a + k, x, y, { c: 'pos' }))];

const l2 = {
  id: 'k1b2-2',
  title: 'Menyusun dan Mengurai Bilangan',
  hook: 'Satu bilangan bisa dibuat dari dua bilangan yang lebih kecil. 5 bisa dari 2 dan 3, atau 1 dan 4.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 6 bulatan. 4 merah. Berapa yang biru?',
          add: two('t', 4, 2),
          ask: {
            options: [
              { t: '2', ok: true, why: '4 dan 2 membuat 6.' },
              { t: '4', why: '4 adalah yang merah.' },
              { t: '6', why: '6 adalah semuanya.' },
              { t: '10', why: '10 adalah banyak kotak, bukan banyak bulatan biru.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Banyak cara membuat 5',
      steps: [
        {
          say: '5 bisa dibuat dari 4 dan 1.',
          clear: true,
          add: [...two('t', 4, 1), T('a', '5 = 4 + 1', FX, 190, { size: 30 })],
        },
        {
          say: '5 juga bisa dari 3 dan 2.',
          set: { tc3: { fill: 'pos' }, a: { text: '5 = 3 + 2' } },
        },
        {
          say: 'Atau 2 dan 3. Atau 1 dan 4. Semuanya tetap 5.',
          set: { tc2: { fill: 'pos' }, tc1: { fill: 'pos' }, a: { text: '5 = 1 + 4' } },
        },
      ],
    },
    {
      title: 'Pasangan 10',
      steps: [
        {
          say: '7 merah. Berapa biru lagi supaya penuh 10? Hitung kotak yang kosong: 3.',
          clear: true,
          add: [...two('t', 7, 3), T('a', '7 + 3 = 10', FX, 190, { size: 30 })],
        },
        {
          say: 'Pasangan yang membuat 10: 1 dan 9, 2 dan 8, 3 dan 7, 4 dan 6, 5 dan 5. Pasangan ini sangat berguna. Hafalkan, ya.',
          add: [T('b', '1+9   2+8   3+7   4+6   5+5', FX, 245, { size: 22, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 6 tambah berapa sama dengan 10?',
          clear: true,
          add: [...tenframe('t', FX, FY, 6), T('q', '6 + ? = 10', FX, 190, { size: 34, c: 'acc' })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Ada 4 kotak kosong. 6 + 4 = 10.' },
              { t: '6', why: '6 + 6 = 12, lebih dari 10.' },
              { t: '3', why: '6 + 3 = 9, belum penuh.' },
              { t: '10', why: '10 adalah hasilnya.' },
            ],
          },
        },
        {
          say: 'Isi kotak yang kosong. Ada 4. 6 tambah 4 sama dengan 10.',
          add: [6, 7, 8, 9].map((i) => tenDot('t', i, FX, FY, { c: 'pos' })),
          set: { q: { text: '6 + {g:4} = 10' } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '8 = 5 + …',
      ans: ['3'],
      wrong: { '8': '5 + 8 = 13. Cari yang membuat 8.', '13': 'Kita mencari bagian, bukan menjumlah.' },
      steps: ['5, lalu 6, 7, 8: maju 3.', '8 = 5 + 3.'],
    },
    {
      type: 'num',
      q: '10 = 7 + …',
      fig: two('f', 7, 0, 200, 150),
      ans: ['3'],
      wrong: { '7': 'Hitung kotak yang kosong.', '4': 'Kotak kosong ada 3.' },
      steps: ['Kotak kosong ada 3.', '7 + 3 = 10.'],
    },
    {
      type: 'num',
      q: 'Pasangan 4 supaya menjadi 10 adalah …',
      ans: ['6'],
      wrong: { '5': '4 + 5 = 9, belum 10.', '4': '4 + 4 = 8.' },
      steps: ['4 + 6 = 10.'],
    },
    {
      type: 'num',
      q: 'Ada berapa bulatan semuanya?',
      fig: two('f', 3, 4, 200, 150),
      ans: ['7'],
      wrong: { '3': 'Bulatan biru juga dihitung.', '4': 'Bulatan merah juga dihitung.' },
      steps: ['Merah 3, biru 4.', '3 + 4 = 7.'],
    },
    {
      type: 'num',
      q: '3 + … = 5',
      ans: ['2'],
      wrong: { '8': '3 + 8 terlalu banyak. Cari yang membuat 5.', '5': '3 + 5 = 8.' },
      steps: ['3, lalu 4, 5: maju 2.', '3 + 2 = 5.'],
    },
  ],
};

export default {
  id: 'k1b2',
  no: 2,
  title: 'Penjumlahan sampai 10',
  desc: 'Menjumlahkan dengan menggabungkan benda, tanda tambah dan sama dengan, menyusun bilangan, dan pasangan 10.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: '2 + 5 = …',
      ans: ['7'],
      wrong: { '3': 'Itu 5 kurang 2.', '6': 'Mulai dari 5, maju 2: 6, 7.' },
      steps: ['Mulai dari 5, maju 2.', '= 7.'],
    },
    {
      type: 'num',
      q: '9 = 4 + …',
      ans: ['5'],
      wrong: { '4': '4 + 4 = 8.', '13': 'Cari bagian yang membuat 9.' },
      steps: ['4 + 5 = 9.'],
    },
    {
      type: 'num',
      q: 'Budi punya 5 kelereng, lalu menemukan 3 kelereng. Kelereng Budi sekarang …',
      ans: ['8'],
      wrong: { '2': 'Menemukan berarti bertambah.', '5': 'Tambahkan 3 kelereng yang ditemukan.' },
      steps: ['5 + 3.', '= 8 kelereng.'],
    },
  ],
};
