// Bab 8 (lanjutan): Rata-rata, median, dan modus
import { T, box, ln, range } from './helpers.js';

// ---------- Menara balok untuk rata-rata ----------
const SX = [80, 140, 200, 260, 320];
const BASE = 232;
const U = 24;
const cube = (id, i, j, fill = 'pos') => box(id, SX[i], BASE - U / 2 - j * U, 22, 22, { fill, r: 3, sw: 1.5 });
const at = (i, j) => ({ x: SX[i], y: BASE - U / 2 - j * U });
const CANDY = [2, 6, 3, 5, 4];
const NAMES = ['Ani', 'Budi', 'Cici', 'Dodi', 'Eka'];
const towers = () => CANDY.flatMap((v, i) => range(0, v).map((j) => cube(`s${i}_${j}`, i, j)));

// ---------- Kartu angka untuk median ----------
const card = (id, x, y, v, o = {}) => box(id, x, y, 46, 56, { fill: 'paper', r: 8, label: String(v), lsize: 24, ...o });
const CX = (k, n) => 200 + (k - (n - 1) / 2) * 56;

const l4 = {
  id: 'b8-4',
  title: 'Rata-rata, Median, dan Modus',
  hook: 'Satu angka untuk mewakili sekumpulan data. Rata-rata itu seperti meratakan menara balok.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Lima anak punya permen: 2, 6, 3, 5, dan 4. Kalau semua permen dikumpulkan lalu dibagi sama rata, masing-masing dapat berapa?',
          add: [...towers(), ...NAMES.map((n, i) => T(`nm${i}`, n, SX[i], 252, { size: 14 })), T('q', 'dibagi sama rata, tiap anak dapat … ?', 200, 40, { size: 20, w: 700 })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Kita ratakan menaranya dan lihat hasilnya.' },
              { t: '20', why: '20 adalah jumlah semua permen. Itu masih harus dibagi 5 anak.' },
              { t: '3', why: '3 adalah permen Cici. Coba ratakan semua menara.' },
              { t: '6', why: '6 adalah menara tertinggi, bukan hasil pembagian rata.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Meratakan menara',
      steps: [
        {
          say: 'Setiap balok adalah satu permen. Menara Budi paling tinggi, menara Ani paling rendah.',
          del: ['q'],
          add: [ln('lv', 50, BASE - 4 * U, 350, BASE - 4 * U, { dash: '5 5', c: 'acc', sw: 2 })],
          hl: ['s1_5', 's0_1'],
        },
        {
          say: 'Pindahkan 2 balok dari Budi ke Ani.',
          set: { s1_4: { ...at(0, 2), fill: 'acc' }, s1_5: { ...at(0, 3), fill: 'acc' } },
        },
        {
          say: 'Pindahkan 1 balok dari Dodi ke Cici.',
          set: { s3_4: { ...at(2, 3), fill: 'acc' } },
        },
        {
          say: 'Sekarang semua menara sama tinggi: 4 balok. Inilah rata-rata. Rata-ratanya 4 permen.',
          add: [T('r', 'semua sama tinggi → {a:rata-rata = 4}', 200, 40, { size: 22 })],
        },
      ],
    },
    {
      title: 'Cara menghitung',
      steps: [
        {
          say: 'Tanpa memindahkan balok, kita bisa menghitung. Jumlahkan semua data dulu. 2 tambah 6 tambah 3 tambah 5 tambah 4 sama dengan 20.',
          clear: true,
          add: [T('a', '2 + 6 + 3 + 5 + 4 = 20', 200, 70, { size: 28 })],
        },
        {
          say: 'Lalu bagi dengan banyak data, yaitu 5 anak. 20 dibagi 5 sama dengan 4.',
          add: [T('b', '20 ÷ 5 = {a:4}', 200, 125, { size: 32 })],
        },
        {
          say: 'Jadi rumusnya: rata-rata sama dengan jumlah semua data dibagi banyak data.',
          add: [box('fr', 200, 210, 370, 64, { fill: 'acc-soft', r: 12 }), T('f', 'rata-rata = jumlah data ÷ banyak data', 200, 210, { size: 17 })],
        },
      ],
    },
    {
      title: 'Median: yang di tengah',
      steps: [
        {
          say: 'Ukuran kedua adalah median. Ini nilai ulangan lima anak: 7, 3, 9, 5, 6.',
          clear: true,
          add: [7, 3, 9, 5, 6].map((v, k) => card(`c${v}`, CX(k, 5), 110, v)),
        },
        {
          say: 'Urutkan dulu dari yang terkecil: 3, 5, 6, 7, 9.',
          set: Object.fromEntries([3, 5, 6, 7, 9].map((v, k) => [`c${v}`, { x: CX(k, 5) }])),
          add: [T('u', 'diurutkan', 200, 55, { size: 16, c: 'mut' })],
        },
        {
          say: 'Median adalah data yang tepat di tengah. Ada 2 kartu di kiri dan 2 kartu di kanan. Mediannya 6.',
          set: { c6: { fill: 'acc', lc: 'onacc' } },
          pulse: ['c6'],
          add: [T('m', '{a:median = 6}', 200, 190, { size: 28 })],
        },
        {
          say: 'Kalau banyak datanya genap, ada dua data di tengah. Misalnya 3, 5, 6, 7, 9, 10. Yang di tengah 6 dan 7.',
          clear: true,
          add: [3, 5, 6, 7, 9, 10].map((v, k) => card(`d${v}`, CX(k, 6), 110, v, v === 6 || v === 7 ? { fill: 'acc', lc: 'onacc' } : {})),
        },
        {
          say: 'Median adalah nilai tengah keduanya: 6 tambah 7, dibagi 2, sama dengan 6 koma 5.',
          add: [T('m', 'median = (6 + 7) ÷ 2 = {a:6,5}', 200, 200, { size: 26 })],
        },
      ],
    },
    {
      title: 'Modus: yang paling sering',
      steps: [
        {
          say: 'Ukuran ketiga adalah modus. Ini ukuran sepatu tujuh anak.',
          clear: true,
          add: [38, 37, 39, 38, 40, 38, 39].map((v, k) => card(`e${k}`, 200 + (k - 3) * 52, 70, v, { lsize: 20 })),
        },
        {
          say: 'Kelompokkan ukuran yang sama. Susun bertumpuk di atas ukurannya.',
          set: (() => {
            const data = [38, 37, 39, 38, 40, 38, 39];
            const cnt = {};
            const o = {};
            data.forEach((v, k) => {
              cnt[v] = (cnt[v] || 0) + 1;
              o[`e${k}`] = { x: 80 + (v - 37) * 80, y: 236 - (cnt[v] - 1) * 60 };
            });
            return o;
          })(),
        },
        {
          say: 'Ukuran 38 paling banyak, muncul 3 kali. Data yang paling sering muncul disebut modus. Modusnya 38.',
          set: { e0: { fill: 'acc', lc: 'onacc' }, e3: { fill: 'acc', lc: 'onacc' }, e5: { fill: 'acc', lc: 'onacc' } },
          add: [T('m', '{a:modus = 38}', 290, 70, { size: 26 })],
        },
      ],
    },
    {
      title: 'Tiga ukuran',
      steps: [
        {
          say: 'Ringkasnya ada tiga ukuran. Rata-rata: jumlah dibagi banyak data.',
          clear: true,
          add: [box('k1', 200, 70, 340, 56, { fill: 'pos-soft', r: 10 }), T('t1', '{p:Rata-rata}: jumlah ÷ banyak data', 200, 70, { size: 18 })],
        },
        {
          say: 'Median: urutkan, lalu ambil yang di tengah.',
          add: [box('k2', 200, 145, 340, 56, { fill: 'acc-soft', r: 10 }), T('t2', '{a:Median}: urutkan, ambil yang tengah', 200, 145, { size: 18 })],
        },
        {
          say: 'Modus: data yang paling sering muncul.',
          add: [box('k3', 200, 220, 340, 56, { fill: 'neg-soft', r: 10 }), T('t3', '{n:Modus}: paling sering muncul', 200, 220, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Nilai kuis enam anak: 8, 6, 9, 6, 7, 6. Berapa modusnya?',
          clear: true,
          add: [T('q', '8, 6, 9, 6, 7, 6', 200, 110, { size: 32 }), T('q2', 'modus = ?', 200, 170, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '6', ok: true, why: '6 muncul tiga kali, paling sering.' },
              { t: '7', why: '7 adalah rata-ratanya. Modus adalah yang paling sering muncul.' },
              { t: '9', why: '9 adalah nilai terbesar dan hanya muncul sekali.' },
              { t: '6,5', why: '6,5 adalah mediannya. Modus adalah yang paling sering muncul.' },
            ],
          },
        },
        {
          say: '6 muncul tiga kali. Nilai lain hanya sekali. Jadi modusnya 6.',
          clear: true,
          add: [...[8, 6, 9, 6, 7, 6].map((v, k) => card(`g${k}`, CX(k, 6), 110, v, v === 6 ? { fill: 'acc', lc: 'onacc' } : {})), T('r', '{a:modus = 6}', 200, 200, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Rata-rata dari 6, 7, 8, 9, 10 adalah …',
      options: [
        { t: '8', ok: true },
        { t: '40', why: '40 adalah jumlahnya. Masih harus dibagi banyak data, yaitu 5.' },
        { t: '10', why: '10 adalah nilai terbesar.' },
        { t: '7', why: 'Jumlahnya 40, dan 40 ÷ 5 = 8.' },
      ],
      steps: ['Jumlah: 6 + 7 + 8 + 9 + 10 = 40.', 'Rata-rata: 40 ÷ 5 = 8.'],
    },
    {
      q: 'Median dari data 8, 3, 9, 5, 2, 7, 6 adalah …',
      options: [
        { t: '6', ok: true },
        { t: '5', why: '5 ada di tengah daftar yang belum diurutkan. Urutkan dulu.' },
        { t: '9', why: '9 adalah nilai terbesar.' },
        { t: '7', why: 'Setelah diurutkan: 2, 3, 5, 6, 7, 8, 9. Yang tengah adalah data ke-4.' },
      ],
      steps: ['Urutkan: 2, 3, 5, 6, 7, 8, 9.', 'Ada 7 data, yang tengah adalah data ke-4, yaitu 6.'],
    },
    {
      q: 'Modus dari data 5, 7, 7, 8, 6, 7, 5, 8 adalah …',
      options: [
        { t: '7', ok: true },
        { t: '5', why: '5 muncul 2 kali, sedangkan 7 muncul 3 kali.' },
        { t: '8', why: '8 muncul 2 kali, sedangkan 7 muncul 3 kali.' },
        { t: '6,6', why: 'Itu kira-kira rata-ratanya. Modus adalah yang paling sering muncul.' },
      ],
      steps: ['Hitung kemunculan: 5 (2 kali), 6 (1 kali), 7 (3 kali), 8 (2 kali).', 'Paling sering: 7.'],
    },
    {
      type: 'num',
      q: 'Median dari data 10, 4, 8, 6 adalah …',
      ans: ['7'],
      wrong: { '6': 'Datanya genap, jadi ada dua data di tengah: 6 dan 8. Ambil nilai tengahnya.', '8': 'Datanya genap, jadi ada dua data di tengah: 6 dan 8. Ambil nilai tengahnya.' },
      steps: ['Urutkan: 4, 6, 8, 10.', 'Dua data di tengah: 6 dan 8.', 'Median = (6 + 8) ÷ 2 = 7.'],
    },
    {
      type: 'num',
      q: 'Rata-rata nilai 4 anak adalah 70. Setelah nilai Rudi ditambahkan, rata-ratanya menjadi 72. Nilai Rudi adalah …',
      ans: ['80'],
      wrong: { '72': 'Jumlah nilai 4 anak = 280. Jumlah nilai 5 anak = 5 × 72 = 360.', '74': 'Jumlah nilai 4 anak = 280. Jumlah nilai 5 anak = 5 × 72 = 360. Selisihnya nilai Rudi.', '2': 'Itu kenaikan rata-ratanya, bukan nilai Rudi.' },
      steps: ['Jumlah nilai 4 anak: 4 × 70 = 280.', 'Jumlah nilai 5 anak: 5 × 72 = 360.', 'Nilai Rudi: 360 − 280 = 80.'],
    },
  ],
};

export const ukuranLessons = [l4];
