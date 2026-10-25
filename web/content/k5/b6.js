// Kelas 5 · Bab 6: Data
import { T, box, table } from '../helpers.js';

const COLS = ['neg', 'acc', 'ok', 'pos', 'mut'];
const bars = (id, data, o = {}) => ({ id, t: 'bars', x: 215, y: 150, w: 300, h: 170, max: 10, tick: 2, vals: true, data: data.map(([l, v], i) => ({ l, v, c: COLS[i % 5] })), ...o });

// Nilai ulangan 15 anak
const RAW = [7, 8, 6, 8, 9, 7, 8, 10, 6, 8, 7, 9, 8, 7, 8];
const FREQ = [6, 7, 8, 9, 10].map((v) => [String(v), RAW.filter((x) => x === v).length]);
const rawCards = (p, upto = RAW.length, mark = -1) =>
  RAW.slice(0, upto).map((v, i) => box(`${p}${i}`, 60 + (i % 8) * 40, 55 + Math.floor(i / 8) * 42, 34, 34, { label: String(v), lsize: 16, fill: v === mark ? 'ok' : 'paper' }));
const freqTable = (id, y = 175, o = {}) => table(id, 200, y, [['nilai', 'banyak anak'], ...FREQ.map(([a, b]) => [a, String(b)])], { cw: [110, 130], rh: 26, size: 15, head: true, ...o });

// ---------- 6.1 Tabel frekuensi dan modus ----------
const l1 = {
  id: 'k5b6-1',
  title: 'Tabel Frekuensi dan Modus',
  hook: 'Data yang berserakan lebih mudah dibaca setelah dirapikan menjadi tabel frekuensi. Nilai yang paling sering muncul disebut modus.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini nilai ulangan 15 anak. Nilai berapa yang paling sering muncul?',
          add: rawCards('r'),
          ask: {
            options: [
              { t: '8', ok: true, why: 'Nilai 8 muncul 6 kali, paling banyak.' },
              { t: '7', why: 'Nilai 7 muncul 4 kali. Nilai 8 muncul 6 kali.' },
              { t: '10', why: '10 nilai terbesar, tetapi hanya muncul sekali.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Merapikan data',
      steps: [
        {
          say: 'Menghitung langsung dari data acak mudah keliru. Kita rapikan dengan menghitung setiap nilai.',
          clear: true,
          add: rawCards('r'),
        },
        {
          say: 'Tandai semua nilai 8. Ada 6.',
          set: Object.fromEntries(RAW.map((v, i) => [`r${i}`, { fill: v === 8 ? 'ok' : 'paper' }])),
        },
        {
          say: 'Lakukan hal yang sama untuk nilai lain, lalu tulis dalam tabel. Ini tabel frekuensi. Frekuensi artinya banyaknya.',
          add: [freqTable('tb', 200, { rh: 24 })],
        },
        {
          say: 'Periksa: jumlah semua frekuensi harus sama dengan banyak data. 2 + 4 + 6 + 2 + 1 = 15. Cocok.',
          add: [T('cek', '2 + 4 + 6 + 2 + 1 = {g:15}', 200, 288, { size: 18 })],
        },
      ],
    },
    {
      title: 'Modus',
      steps: [
        {
          say: 'Modus adalah nilai dengan frekuensi terbesar. Di tabel, frekuensi terbesar 6, milik nilai 8.',
          clear: true,
          add: [freqTable('tb', 120, { hl: [[3, 0], [3, 1]] })],
        },
        {
          say: 'Jadi modus nilai ulangan itu 8. Hati-hati: modus adalah nilainya, yaitu 8, bukan frekuensinya, yaitu 6.',
          add: [T('a', 'modus = {g:8}', 200, 245, { size: 26 }), T('b', 'bukan 6', 200, 278, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ukuran sepatu 7 anak: 34, 35, 35, 36, 35, 34, 37. Berapa modusnya?',
          clear: true,
          add: [34, 35, 35, 36, 35, 34, 37].map((v, i) => box(`s${i}`, 80 + i * 40, 110, 34, 34, { label: String(v), lsize: 15 })),
          ask: {
            options: [
              { t: '35', ok: true, why: '35 muncul 3 kali, paling sering.' },
              { t: '3', why: '3 adalah frekuensinya. Modus adalah nilainya.' },
              { t: '37', why: '37 ukuran terbesar, bukan yang paling sering.' },
            ],
          },
        },
        {
          say: '35 muncul tiga kali, lebih sering daripada ukuran lain. Modusnya 35.',
          set: { s1: { fill: 'ok' }, s2: { fill: 'ok' }, s4: { fill: 'ok' } },
          add: [T('a', 'modus = {g:35}', 200, 190, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Data: 5, 6, 6, 7, 6, 8, 5. Modusnya …',
      ans: ['6'],
      wrong: { '3': 'Itu frekuensinya. Modus adalah nilainya.', '8': 'Modus bukan nilai terbesar.' },
      steps: ['6 muncul 3 kali.', 'Modus = 6.'],
    },
    {
      type: 'num',
      q: 'Menurut tabel ini, berapa anak yang mendapat nilai 9?',
      fig: [freqTable('tb', 150)],
      ans: ['2'],
      wrong: { '9': 'Lihat kolom banyak anak di baris nilai 9.' },
      steps: ['Baris nilai 9 → 2 anak.'],
    },
    {
      type: 'num',
      q: 'Menurut tabel ini, berapa banyak anak seluruhnya?',
      fig: [freqTable('tb', 150)],
      ans: ['15'],
      wrong: { '5': 'Jumlahkan kolom banyak anak, bukan banyak baris.', '40': 'Jumlahkan kolom banyak anak.' },
      steps: ['2 + 4 + 6 + 2 + 1.', '= 15.'],
    },
    {
      q: 'Modus adalah …',
      options: [
        { t: 'nilai yang paling sering muncul', ok: true },
        { t: 'nilai terbesar', why: 'Nilai terbesar belum tentu paling sering muncul.' },
        { t: 'banyaknya data', why: 'Itu jumlah frekuensi.' },
      ],
      steps: ['Modus = nilai yang paling sering muncul.'],
    },
    {
      type: 'num',
      q: 'Tinggi tanaman (cm): 12, 15, 12, 14, 15, 15, 13. Modusnya …',
      ans: ['15'],
      wrong: { '12': '12 muncul 2 kali, 15 muncul 3 kali.', '3': 'Itu frekuensinya.' },
      steps: ['15 muncul 3 kali.', 'Modus = 15.'],
    },
  ],
};

// ---------- 6.2 Diagram batang ----------
const JAJAN = [['roti', 6], ['susu', 9], ['buah', 4], ['nasi', 8]];

const l2 = {
  id: 'k5b6-2',
  title: 'Membaca dan Membuat Diagram Batang',
  hook: 'Diagram batang memudahkan kita membandingkan data. Batang paling tinggi menunjukkan modus.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Diagram ini menunjukkan jajanan kesukaan siswa. Jajanan apa yang paling disukai?',
          add: [T('h', 'Jajanan Kesukaan', 215, 28, { size: 17, c: 'pos' }), bars('g', JAJAN, { vals: false })],
          ask: {
            options: [
              { t: 'susu', ok: true, why: 'Batang susu paling tinggi, 9 anak.' },
              { t: 'nasi', why: 'Batang nasi tinggi (8), tetapi susu lebih tinggi (9).' },
              { t: 'buah', why: 'Batang buah justru paling pendek.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membuat diagram dari tabel',
      steps: [
        {
          say: 'Mulai dari tabel. Garis tegak diberi skala 0, 2, 4, sampai 10. Garis mendatar berisi nama jajanan.',
          clear: true,
          add: [table('tb', 200, 150, [['jajanan', 'banyak'], ...JAJAN.map(([a, b]) => [a, String(b)])], { cw: [110, 100], rh: 30, size: 16, head: true })],
        },
        {
          say: 'Setiap jajanan diberi batang setinggi banyaknya. Roti 6, susu 9, buah 4, nasi 8. Susu ada di antara 8 dan 10.',
          del: ['tb'],
          add: [T('h', 'Jajanan Kesukaan', 215, 28, { size: 17, c: 'pos' }), bars('g', JAJAN)],
        },
      ],
    },
    {
      title: 'Membaca diagram',
      steps: [
        {
          say: 'Selisih susu dan buah: 9 kurang 4 sama dengan 5 anak.',
          clear: true,
          add: [bars('g', JAJAN), T('a', '9 − 4 = {g:5}', 330, 40, { size: 20 })],
          hl: ['g'],
        },
        {
          say: 'Banyak siswa seluruhnya: 6 tambah 9 tambah 4 tambah 8 sama dengan 27.',
          add: [T('b', '6 + 9 + 4 + 8 = {g:27}', 215, 290, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa anak yang lebih menyukai nasi daripada roti?',
          clear: true,
          add: [bars('g', JAJAN)],
          ask: {
            options: [
              { t: '2', ok: true, why: 'Nasi 8, roti 6. 8 − 6 = 2.' },
              { t: '14', why: '14 adalah jumlahnya. Yang ditanya selisihnya.' },
              { t: '8', why: '8 banyak penyuka nasi saja.' },
            ],
          },
        },
        {
          say: 'Nasi 8 dan roti 6. Selisihnya 2 anak.',
          add: [T('a', '8 − 6 = {g:2}', 330, 40, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa anak yang menyukai roti?',
      fig: [bars('g', JAJAN)],
      ans: ['6'],
      steps: ['Batang roti di 6.'],
    },
    {
      type: 'num',
      q: 'Berapa selisih penyuka susu dan nasi?',
      fig: [bars('g', JAJAN)],
      ans: ['1'],
      wrong: { '17': 'Itu jumlahnya. Cari selisih: 9 − 8.' },
      steps: ['9 − 8 = 1.'],
    },
    {
      type: 'num',
      q: 'Berapa banyak siswa yang menyukai roti atau buah?',
      fig: [bars('g', JAJAN)],
      ans: ['10'],
      wrong: { '2': 'Atau berarti dijumlahkan: 6 + 4.' },
      steps: ['6 + 4 = 10.'],
    },
    {
      q: 'Modus data pada diagram batang ditunjukkan oleh …',
      options: [
        { t: 'batang paling tinggi', ok: true },
        { t: 'batang paling pendek', why: 'Batang terpendek = frekuensi terkecil.' },
        { t: 'batang paling kanan', why: 'Urutan batang tidak menentukan modus.' },
      ],
      steps: ['Modus = frekuensi terbesar = batang tertinggi.'],
    },
    {
      type: 'num',
      q: 'Berapa banyak siswa seluruhnya?',
      fig: [bars('g', JAJAN)],
      ans: ['27'],
      wrong: { '4': 'Itu banyak jenis jajanan. Jumlahkan semua batang.' },
      steps: ['6 + 9 + 4 + 8 = 27.'],
    },
  ],
};

export default {
  id: 'k5b6',
  no: 6,
  title: 'Data',
  desc: 'Merapikan data menjadi tabel frekuensi, menentukan modus, serta membuat dan membaca diagram batang.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Data: 3, 4, 4, 5, 3, 4, 6, 4. Modusnya …',
      ans: ['4'],
      wrong: { '4 kali': 'Tulis nilainya saja.' },
      steps: ['4 muncul 4 kali.', 'Modus = 4.'],
    },
    {
      type: 'num',
      q: 'Tabel frekuensi: nilai 6 → 3 anak, nilai 7 → 5 anak, nilai 8 → 2 anak. Banyak anak seluruhnya …',
      ans: ['10'],
      wrong: { '21': 'Jumlahkan frekuensinya, bukan nilainya.' },
      steps: ['3 + 5 + 2 = 10.'],
    },
    {
      q: 'Nilai 6 → 3 anak, nilai 7 → 5 anak, nilai 8 → 2 anak. Modusnya …',
      options: [
        { t: '7', ok: true },
        { t: '5', why: '5 adalah frekuensinya. Modus = nilainya.' },
        { t: '8', why: 'Nilai 8 hanya 2 anak.' },
      ],
      steps: ['Frekuensi terbesar 5 → nilai 7.'],
    },
  ],
};
