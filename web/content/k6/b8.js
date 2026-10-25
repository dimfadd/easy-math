// Kelas 6 · Bab 8: Pengolahan Data
import { T, box } from '../helpers.js';

const COLS = ['neg', 'acc', 'ok', 'pos', 'mut'];
const bars = (id, data, o = {}) => ({ id, t: 'bars', x: 200, y: 140, w: 300, h: 170, max: 10, tick: 2, vals: true, data: data.map(([l, v], i) => ({ l, v, c: COLS[i % 5] })), ...o });
const cards = (p, vals, y = 90, o = {}) => vals.map((v, i) => box(`${p}${i}`, 200 + (i - (vals.length - 1) / 2) * 44, y, 38, 38, { label: String(v), lsize: 17, ...o }));

// ---------- 8.1 Rata-rata ----------
const BUKU = [['Ani', 4], ['Budi', 8], ['Cici', 6], ['Dodi', 2]];

const l1 = {
  id: 'k6b8-1',
  title: 'Rata-rata',
  hook: 'Rata-rata adalah nilai yang diperoleh jika semua data diratakan. Rata-rata = jumlah semua data : banyak data.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Empat anak membaca buku: 4, 8, 6, dan 2. Kalau bukunya dibagi sama rata, setiap anak membaca berapa buku?',
          add: [bars('g', BUKU)],
          ask: {
            options: [
              { t: '5', ok: true, why: '4 + 8 + 6 + 2 = 20. 20 : 4 = 5.' },
              { t: '20', why: '20 adalah jumlahnya. Bagi dengan 4 anak.' },
              { t: '6', why: '6 adalah nilai di tengah daftar, bukan hasil meratakan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Meratakan',
      steps: [
        {
          say: 'Budi punya 8, lebih 3 dari 5. Dodi punya 2, kurang 3 dari 5. Pindahkan 3 dari Budi ke Dodi.',
          clear: true,
          add: [bars('g', BUKU)],
        },
        {
          say: 'Cici punya 6, lebih 1. Ani punya 4, kurang 1. Pindahkan 1 dari Cici ke Ani. Sekarang semua sama, 5.',
          set: { g: bars('g', [['Ani', 5], ['Budi', 5], ['Cici', 5], ['Dodi', 5]]) },
          add: [T('a', 'rata-rata = {g:5}', 330, 40, { size: 20 })],
        },
        {
          say: 'Cara hitung: jumlahkan semua, lalu bagi dengan banyak data. 20 dibagi 4 sama dengan 5.',
          add: [T('b', '(4 + 8 + 6 + 2) : 4 = 20 : 4 = 5', 200, 285, { size: 17 })],
        },
      ],
    },
    {
      title: 'Mencari data yang hilang',
      steps: [
        {
          say: 'Rata-rata nilai 3 ulangan adalah 80. Nilai ulangan pertama 75 dan kedua 85. Berapa nilai ketiga?',
          clear: true,
          add: [T('a', 'rata-rata 3 nilai = 80', 200, 60, { size: 22 })],
        },
        {
          say: 'Jumlah ketiga nilai harus 3 kali 80, yaitu 240.',
          add: [T('b', 'jumlah = 3 × 80 = 240', 200, 115, { size: 22 })],
        },
        {
          say: 'Nilai ketiga: 240 dikurangi 75 dikurangi 85, yaitu 80.',
          add: [T('c', '240 − 75 − 85 = {g:80}', 200, 170, { size: 24 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tinggi 5 tanaman: 10, 12, 9, 11, 13 cm. Berapa rata-ratanya?',
          clear: true,
          add: cards('c', [10, 12, 9, 11, 13], 100),
          ask: {
            options: [
              { t: '11 cm', ok: true, why: 'Jumlahnya 55. 55 : 5 = 11.' },
              { t: '55 cm', why: '55 adalah jumlahnya. Bagi dengan 5.' },
              { t: '9 cm', why: '9 adalah nilai terkecil.' },
            ],
          },
        },
        {
          say: 'Jumlahnya 55. 55 dibagi 5 sama dengan 11.',
          add: [T('a', '55 : 5 = {g:11 cm}', 200, 180, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Rata-rata dari 6, 8, 10 adalah …', ans: ['8'], wrong: { '24': 'Bagi jumlahnya dengan 3.' }, steps: ['6 + 8 + 10 = 24.', '24 : 3 = 8.'] },
    { type: 'num', q: 'Rata-rata dari 70, 80, 90, 60 adalah …', ans: ['75'], steps: ['Jumlah 300.', '300 : 4 = 75.'] },
    { type: 'num', q: 'Rata-rata 4 bilangan adalah 7. Jumlah keempatnya …', ans: ['28'], steps: ['4 × 7 = 28.'] },
    { type: 'num', q: 'Rata-rata 2 nilai 85. Nilai pertama 90. Nilai kedua …', ans: ['80'], steps: ['Jumlah 170.', '170 − 90 = 80.'] },
    { type: 'num', q: 'Uang jajan 5 hari: 3.000, 5.000, 4.000, 4.000, 4.000. Rata-rata …', ans: ['4000', '4.000'], steps: ['Jumlah 20.000.', '20.000 : 5 = 4.000.'] },
  ],
};

// ---------- 8.2 Median, modus, jangkauan ----------
const DATA = [7, 3, 9, 5, 5, 8, 6];
const SORTED = [...DATA].sort((a, b) => a - b);

const l2 = {
  id: 'k6b8-2',
  title: 'Median, Modus, dan Jangkauan',
  hook: 'Median adalah nilai tengah data yang sudah diurutkan. Modus adalah nilai yang paling sering muncul. Jangkauan adalah data terbesar dikurangi data terkecil.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Data: 7, 3, 9, 5, 5, 8, 6. Berapa nilai tengahnya setelah diurutkan?',
          add: cards('c', DATA),
          ask: {
            options: [
              { t: '6', ok: true, why: 'Urutan: 3, 5, 5, 6, 7, 8, 9. Yang ke-4 adalah 6.' },
              { t: '5', why: 'Urutkan dulu: 3, 5, 5, 6, 7, 8, 9. Tengahnya 6.' },
              { t: '9', why: '9 adalah data terbesar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Median',
      steps: [
        {
          say: 'Urutkan dari terkecil sampai terbesar.',
          clear: true,
          add: [...cards('c', DATA), ...cards('s', SORTED, 170, { fill: 'pos-soft' })],
        },
        {
          say: 'Ada 7 data. Yang tengah adalah data ke-4, yaitu 6. Itulah median.',
          set: { s3: { fill: 'ok' } },
          add: [T('a', 'median = {g:6}', 200, 240, { size: 24 })],
        },
        {
          say: 'Kalau banyak data genap, median adalah rata-rata dua data di tengah.',
          add: [T('b', 'contoh: 2, 4, 6, 8 → (4 + 6) : 2 = 5', 200, 280, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Modus dan jangkauan',
      steps: [
        {
          say: 'Modus: nilai yang paling sering muncul. 5 muncul dua kali, jadi modusnya 5.',
          clear: true,
          add: [...cards('s', SORTED, 90, { fill: 'pos-soft' }), T('a', 'modus = {g:5}', 200, 160, { size: 24 })],
          hl: ['s1', 's2'],
        },
        {
          say: 'Jangkauan: data terbesar dikurangi data terkecil. 9 dikurangi 3 sama dengan 6.',
          add: [T('b', 'jangkauan = 9 − 3 = {g:6}', 200, 210, { size: 24 })],
          hl: ['s0', 's6'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Data: 4, 9, 2, 7, 4. Berapa mediannya?',
          clear: true,
          add: cards('c', [4, 9, 2, 7, 4]),
          ask: {
            options: [
              { t: '4', ok: true, why: 'Urutan: 2, 4, 4, 7, 9. Yang tengah 4.' },
              { t: '2', why: 'Urutkan dulu. 2 data terkecil.' },
              { t: '5,2', why: 'Itu rata-rata. Median adalah nilai tengah.' },
            ],
          },
        },
        {
          say: 'Urutkan: 2, 4, 4, 7, 9. Data ke-3 adalah 4.',
          add: [...cards('s', [2, 4, 4, 7, 9], 170, { fill: 'pos-soft' }), T('a', 'median = {g:4}', 200, 240, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Median dari 8, 3, 5, 9, 1 adalah …', ans: ['5'], wrong: { '9': 'Urutkan dulu: 1, 3, 5, 8, 9.' }, steps: ['1, 3, 5, 8, 9.', 'Tengah = 5.'] },
    { type: 'num', q: 'Median dari 2, 4, 6, 10 adalah …', ans: ['5'], wrong: { '4': 'Data genap: rata-rata dua tengah.' }, steps: ['Tengah 4 dan 6.', '(4 + 6) : 2 = 5.'] },
    { type: 'num', q: 'Modus dari 3, 6, 6, 2, 6, 3 adalah …', ans: ['6'], steps: ['6 muncul 3 kali.'] },
    { type: 'num', q: 'Jangkauan dari 12, 5, 20, 8 adalah …', ans: ['15'], wrong: { '7': 'Terbesar 20, terkecil 5.' }, steps: ['20 − 5 = 15.'] },
    {
      q: 'Data: 1, 2, 2, 3, 12. Nilai mana yang paling besar?',
      options: [
        { t: 'rata-rata', ok: true, why: 'Rata-rata = 4, median = 2, modus = 2. Nilai 12 menarik rata-rata ke atas.' },
        { t: 'median', why: 'Median = 2, rata-rata = 4.' },
        { t: 'modus', why: 'Modus = 2, rata-rata = 4.' },
      ],
      steps: ['Rata-rata 20 : 5 = 4.', 'Median 2, modus 2.'],
    },
  ],
};

export default {
  id: 'k6b8',
  no: 8,
  title: 'Pengolahan Data',
  desc: 'Menghitung rata-rata dengan meratakan data, mencari data yang hilang, serta menentukan median, modus, dan jangkauan.',
  lessons: [l1, l2],
  extra: [
    { type: 'num', q: 'Rata-rata 5, 7, 9, 11 adalah …', ans: ['8'], steps: ['32 : 4 = 8.'] },
    { type: 'num', q: 'Median 6, 1, 8, 3, 4, 9 adalah …', ans: ['5'], steps: ['1, 3, 4, 6, 8, 9.', '(4 + 6) : 2 = 5.'] },
    { type: 'num', q: 'Jangkauan 15, 22, 9, 30 adalah …', ans: ['21'], steps: ['30 − 9 = 21.'] },
  ],
};
