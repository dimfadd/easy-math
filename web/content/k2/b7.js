// Kelas 2 · Bab 7: Membilang sampai 100
import { T, box } from '../helpers.js';
import { blocks } from './kit.js';

// Papan ratusan 10 × 10 berisi 1–100
const GX = 70;
const GY = 30;
const C = 24;
const board = (hl = []) =>
  Array.from({ length: 100 }, (_, i) =>
    box(`g${i}`, GX + (i % 10) * C, GY + Math.floor(i / 10) * C, C - 1, C - 1, { r: 2, fill: hl.includes(i + 1) ? 'acc-soft' : 'paper', stroke: 'mut', sw: 1, label: String(i + 1), lsize: 9.5 }),
  );

// ---------- 7.1 Bilangan sampai 100 ----------
const l1 = {
  id: 'k2b7-1',
  title: 'Bilangan sampai 100',
  hook: 'Sepuluh puluhan sama dengan seratus. Pada papan ratusan, bergerak ke bawah satu baris berarti bertambah 10.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 10 balok puluhan. Berapa semuanya?',
          add: blocks('b', 10, 0, 90, 130, { gap: 24 }),
          ask: {
            options: [
              { t: '100', ok: true, why: '10 puluhan = 10, 20, 30, …, 100. Seratus.' },
              { t: '10', why: 'Setiap balok bernilai 10, bukan 1.' },
              { t: '1000', why: '10 × 10 = 100, bukan 1000.' },
              { t: '20', why: 'Ada 10 balok, masing-masing 10.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membilang puluhan',
      steps: [
        {
          say: 'Hitung baloknya per sepuluh: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.',
          clear: true,
          add: [...blocks('b', 10, 0, 90, 120, { gap: 24 }), ...Array.from({ length: 10 }, (_, i) => T(`n${i}`, String((i + 1) * 10), 90 + i * 24, 200, { size: 11, c: 'pos' }))],
        },
        {
          say: 'Sepuluh puluhan disebut seratus, ditulis 100.',
          add: [T('a', '10 puluhan = {g:100}', 200, 250, { size: 28 })],
        },
      ],
    },
    {
      title: 'Papan ratusan',
      steps: [
        {
          say: 'Ini papan ratusan, berisi bilangan 1 sampai 100. Setiap baris berisi 10 bilangan.',
          clear: true,
          add: board(),
        },
        {
          say: 'Kolom paling kanan: 10, 20, 30, sampai 100. Setiap turun satu baris, bertambah 10.',
          set: Object.fromEntries([10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => [`g${v - 1}`, { fill: 'acc-soft' }])),
        },
        {
          say: 'Lihat 34. Di bawahnya 44, di atasnya 24. Di kanannya 35, di kirinya 33.',
          set: Object.fromEntries([[24, 'pos-soft'], [44, 'pos-soft'], [33, 'ok-soft'], [35, 'ok-soft'], [34, 'neg-soft']].map(([v, f]) => [`g${v - 1}`, { fill: f }])),
          add: [T('k', '↓ +10   → +1', 340, 270, { size: 14, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Pada papan ratusan, bilangan apa yang ada tepat di bawah 57?',
          clear: true,
          add: board([57]),
          ask: {
            options: [
              { t: '67', ok: true, why: 'Turun satu baris berarti bertambah 10. 57 + 10 = 67.' },
              { t: '58', why: '58 ada di kanan 57.' },
              { t: '47', why: '47 ada di atas 57.' },
              { t: '75', why: 'Turun satu baris hanya menambah 10.' },
            ],
          },
        },
        {
          say: 'Turun satu baris berarti tambah 10. 57 tambah 10 sama dengan 67.',
          set: { g66: { fill: 'ok-soft' } },
          add: [T('a', '57 + 10 = {g:67}', 340, 270, { size: 16 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '6 puluhan dan 3 satuan adalah …',
      ans: ['63'],
      wrong: { '36': 'Puluhan ditulis di depan.', '9': '6 puluhan = 60.' },
      steps: ['60 + 3.', '= 63.'],
    },
    {
      type: 'num',
      q: 'Delapan puluh lima ditulis …',
      ans: ['85'],
      wrong: { '58': 'Delapan puluh = 8 puluhan, ditulis di depan.', '805': 'Ditulis 85.' },
      steps: ['8 puluhan, 5 satuan.', '= 85.'],
    },
    {
      type: 'num',
      q: 'Pada papan ratusan, bilangan di atas 72 adalah …',
      ans: ['62'],
      wrong: { '82': '82 ada di bawah 72.', '71': '71 ada di kiri 72.' },
      steps: ['Naik satu baris berarti kurang 10.', '72 − 10 = 62.'],
    },
    {
      type: 'num',
      q: '99 + 1 = …',
      ans: ['100'],
      wrong: { '910': 'Satuan 9 + 1 = 10, menjadi puluhan baru: 100.', '98': 'Itu 99 − 1.' },
      steps: ['Sesudah 99 adalah 100.'],
    },
    {
      type: 'num',
      q: 'Berapa puluhan dalam 100?',
      ans: ['10'],
      wrong: { '100': 'Banyak puluhannya: 100 ÷ 10.', '1': '1 ratusan sama dengan 10 puluhan.' },
      steps: ['10, 20, …, 100: ada 10 puluhan.'],
    },
  ],
};

// ---------- 7.2 Lebih dari, kurang dari ----------
const l2 = {
  id: 'k2b7-2',
  title: 'Tanda Lebih dari dan Kurang dari',
  hook: 'Tanda > dibaca "lebih dari", tanda < dibaca "kurang dari". Mulut tanda selalu terbuka ke arah bilangan yang lebih besar.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tanda apa yang tepat di antara 68 dan 86?',
          add: [T('a', '68  ?  86', 200, 110, { size: 50 })],
          ask: {
            options: [
              { t: '<', ok: true, why: '68 lebih kecil dari 86, jadi 68 < 86. Mulut tanda terbuka ke 86.' },
              { t: '>', why: '68 punya 6 puluhan, 86 punya 8 puluhan. 68 lebih kecil.' },
              { t: '=', why: 'Kedua bilangan berbeda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mulut terbuka ke yang besar',
      steps: [
        {
          say: 'Bayangkan tanda ini mulut yang lapar. Mulutnya selalu terbuka ke bilangan yang lebih besar.',
          clear: true,
          add: [T('a', '75  >  52', 200, 80, { size: 46 }), T('a2', '75 lebih dari 52', 200, 125, { size: 18, c: 'pos' })],
        },
        {
          say: '41 kurang dari 90. Mulutnya terbuka ke 90.',
          add: [T('b', '41  <  90', 200, 185, { size: 46 }), T('b2', '41 kurang dari 90', 200, 230, { size: 18, c: 'acc' })],
        },
        {
          say: 'Kalau sama besar, pakai tanda sama dengan.',
          add: [T('c', '60 = 60', 200, 275, { size: 26, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Bandingkan puluhan dulu',
      steps: [
        {
          say: 'Bandingkan 47 dan 74. Puluhan 4 lebih kecil dari 7. Jadi 47 kurang dari 74.',
          clear: true,
          add: [T('a', '47  <  74', 200, 80, { size: 44 }), T('a2', 'puluhan: 4 < 7', 200, 125, { size: 18, c: 'mut' })],
        },
        {
          say: 'Bandingkan 83 dan 89. Puluhannya sama-sama 8. Lihat satuan: 3 kurang dari 9. Jadi 83 kurang dari 89.',
          add: [T('b', '83  <  89', 200, 185, { size: 44 }), T('b2', 'puluhan sama, satuan: 3 < 9', 200, 230, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tanda apa yang tepat di antara 92 dan 29?',
          clear: true,
          add: [T('a', '92  ?  29', 200, 110, { size: 50 })],
          ask: {
            options: [
              { t: '>', ok: true, why: '92 punya 9 puluhan, 29 hanya 2. 92 > 29.' },
              { t: '<', why: 'Mulut tanda harus terbuka ke bilangan yang lebih besar, yaitu 92.' },
              { t: '=', why: 'Angkanya sama tetapi tempatnya tertukar. Nilainya berbeda.' },
            ],
          },
        },
        {
          say: '92 lebih dari 29. Mulutnya terbuka ke 92.',
          add: [T('b', '92  {g:>}  29', 200, 200, { size: 44 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '56 … 65',
      options: [
        { t: '<', ok: true },
        { t: '>', why: '56 punya 5 puluhan, 65 punya 6 puluhan.' },
        { t: '=', why: 'Nilainya berbeda.' },
      ],
      steps: ['Puluhan 5 < 6.', '56 < 65.'],
    },
    {
      q: '78 … 71',
      options: [
        { t: '>', ok: true },
        { t: '<', why: 'Puluhan sama. Satuan 8 > 1.' },
        { t: '=', why: 'Satuannya berbeda.' },
      ],
      steps: ['Puluhan sama: 7.', 'Satuan 8 > 1: 78 > 71.'],
    },
    {
      q: 'Tanda > dibaca …',
      options: [
        { t: 'lebih dari', ok: true },
        { t: 'kurang dari', why: 'Kurang dari ditulis <.' },
        { t: 'sama dengan', why: 'Sama dengan ditulis =.' },
      ],
      steps: ['> : lebih dari.'],
    },
    {
      type: 'num',
      q: 'Bilangan terbesar dari 49, 94, 59, 90 adalah …',
      ans: ['94'],
      wrong: { '90': 'Puluhan sama-sama 9. Satuan 4 > 0.', '59': 'Puluhan 9 lebih besar dari 5.' },
      steps: ['Puluhan terbesar: 9 → 94 dan 90.', 'Satuan 4 > 0: 94.'],
    },
    {
      q: '100 … 99',
      options: [
        { t: '>', ok: true },
        { t: '<', why: '100 datang sesudah 99, jadi lebih besar.' },
        { t: '=', why: 'Berbeda 1.' },
      ],
      steps: ['100 = 99 + 1.', '100 > 99.'],
    },
  ],
};

export default {
  id: 'k2b7',
  no: 7,
  title: 'Membilang sampai 100',
  desc: 'Sepuluh puluhan sama dengan seratus, papan ratusan, serta membandingkan bilangan dengan tanda >, <, dan =.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: '9 puluhan dan 0 satuan adalah …',
      ans: ['90'],
      wrong: { '9': '9 puluhan = 90.' },
      steps: ['9 puluhan = 90.'],
    },
    {
      q: '38 … 83',
      options: [
        { t: '<', ok: true },
        { t: '>', why: 'Puluhan 3 < 8.' },
      ],
      steps: ['Puluhan 3 < 8.', '38 < 83.'],
    },
    {
      type: 'num',
      q: '40, 50, 60, …, 80. Bilangan yang hilang adalah …',
      ans: ['70'],
      wrong: { '61': 'Polanya bertambah 10.' },
      steps: ['60 + 10 = 70.'],
    },
  ],
};
