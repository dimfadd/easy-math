// Kelas 1 · Bab 3: Pengurangan sampai 10
import { T, ln } from '../helpers.js';
import { objs, tenframe, tenDot } from './kit.js';

// ---------- 3.1 Mengambil ----------
const AX = 70;
const AY = 120;
const ADX = 55;

const l1 = {
  id: 'k1b3-1',
  title: 'Mengambil',
  hook: 'Mengurangi berarti mengambil sebagian benda, lalu menghitung yang tersisa.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 5 apel. Adik memakan 2 apel. Berapa apel yang tersisa?',
          add: [...objs('a', 'apple', 5, AX, AY, { dx: ADX, size: 42 })],
          ask: {
            options: [
              { t: '3', ok: true, why: '5 apel, diambil 2. Sisanya tiga.' },
              { t: '2', why: '2 adalah apel yang dimakan, bukan yang tersisa.' },
              { t: '7', why: 'Apelnya dimakan, jadi berkurang, bukan bertambah.' },
              { t: '5', why: 'Setelah dimakan, apelnya tidak lagi 5.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diambil',
      steps: [
        {
          say: 'Ada 5 apel.',
          clear: true,
          add: [...objs('a', 'apple', 5, AX, AY, { dx: ADX, size: 42 }), T('n', '5', 200, 60, { size: 30, c: 'pos' })],
        },
        {
          say: 'Dua apel diambil.',
          set: { a3: { y: AY + 100, o: 0.3 }, a4: { y: AY + 100, o: 0.3 } },
          add: [T('m', 'diambil 2', AX + 3.5 * ADX, AY + 145, { size: 18, c: 'neg' })],
        },
        {
          say: 'Hitung yang tersisa. Satu, dua, tiga. Tersisa 3 apel.',
          add: [T('s', 'sisa {g:3}', AX + ADX, AY + 55, { size: 24 })],
        },
      ],
    },
    {
      title: 'Tanda kurang',
      steps: [
        {
          say: 'Mengambil ditulis dengan tanda kurang. 5 kurang 2 sama dengan 3.',
          clear: true,
          add: [T('a', '5 − 2 = 3', 200, 100, { size: 50 })],
        },
        {
          say: 'Tanda garis mendatar ini dibaca kurang.',
          add: [T('b', '−  dibaca "kurang"', 200, 190, { size: 22, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ada 7 bintang. 3 bintang diambil. Berapa yang tersisa?',
          clear: true,
          add: [...objs('a', 'star', 7, 50, AY, { dx: 50, size: 38 }), T('q', '7 − 3 = ?', 200, 222, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Mundur 3 dari 7: enam, lima, empat.' },
              { t: '10', why: 'Itu 7 tambah 3. Diambil berarti berkurang.' },
              { t: '3', why: '3 adalah yang diambil.' },
              { t: '5', why: 'Mundur 3 kali dari 7: 6, 5, 4.' },
            ],
          },
        },
        {
          say: 'Ambil 3 bintang. Tersisa 4. 7 kurang 3 sama dengan 4.',
          set: { a4: { y: AY + 60, o: 0.3 }, a5: { y: AY + 60, o: 0.3 }, a6: { y: AY + 60, o: 0.3 } },
          add: [T('ans', '7 − 3 = {g:4}', 200, 275, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '4 − 1 = …',
      ans: ['3'],
      wrong: { '5': 'Itu 4 tambah 1. Kurang berarti mundur.', '4': 'Setelah diambil 1, tidak lagi 4.' },
      steps: ['Mundur 1 dari 4.', '= 3.'],
    },
    {
      type: 'num',
      q: 'Ada 6 apel. 2 apel dimakan. Sisa apel ada …',
      fig: objs('f', 'apple', 6, 75, 150, { dx: 50, size: 40 }),
      ans: ['4'],
      wrong: { '8': 'Dimakan berarti berkurang.', '2': '2 adalah yang dimakan.' },
      steps: ['6 − 2.', '= 4 apel.'],
    },
    {
      type: 'num',
      q: '9 − 4 = …',
      ans: ['5'],
      wrong: { '13': 'Itu 9 tambah 4.', '4': 'Mundur 4 dari 9: 8, 7, 6, 5.' },
      steps: ['Mundur 4 dari 9: 8, 7, 6, 5.', '= 5.'],
    },
    {
      type: 'num',
      q: 'Sinta punya 8 balon. 3 balon terbang. Balon Sinta tinggal …',
      ans: ['5'],
      wrong: { '11': 'Terbang berarti berkurang.', '3': '3 adalah balon yang terbang.' },
      steps: ['8 − 3.', '= 5 balon.'],
    },
    {
      type: 'num',
      q: '10 − 10 = …',
      ans: ['0'],
      wrong: { '10': 'Semuanya diambil, tidak ada yang tersisa.', '20': 'Itu tambah. Ini kurang.' },
      steps: ['Semua diambil.', 'Sisa 0.'],
    },
  ],
};

// ---------- 3.2 Selisih ----------
const PX = 80;
const PDX = 50;

const l2 = {
  id: 'k1b3-2',
  title: 'Selisih',
  hook: 'Selisih adalah berapa lebih banyak. Pasangkan benda, lalu hitung yang tidak punya pasangan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 6 apel dan 4 bintang. Apel lebih banyak berapa?',
          add: [...objs('a', 'apple', 6, PX, 90, { dx: PDX, size: 38 }), ...objs('s', 'star', 4, PX, 190, { dx: PDX, size: 38 })],
          ask: {
            options: [
              { t: '2', ok: true, why: 'Setelah dipasangkan, ada 2 apel yang tidak punya pasangan.' },
              { t: '10', why: '10 adalah jumlah semuanya. Selisih dicari dengan pengurangan.' },
              { t: '6', why: '6 adalah banyak apel.' },
              { t: '4', why: '4 adalah banyak bintang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pasangkan, lalu hitung sisanya',
      steps: [
        {
          say: 'Pasangkan satu apel dengan satu bintang.',
          clear: true,
          add: [...objs('a', 'apple', 6, PX, 90, { dx: PDX, size: 38 }), ...objs('s', 'star', 4, PX, 190, { dx: PDX, size: 38 }), ...[0, 1, 2, 3].map((i) => ln(`p${i}`, PX + i * PDX, 113, PX + i * PDX, 167, { sw: 2.5, c: 'ok' }))],
        },
        {
          say: 'Dua apel tidak punya pasangan. Apel lebih banyak 2.',
          hl: ['a4', 'a5'],
          add: [T('k', 'lebih banyak {g:2}', 200, 245, { size: 24 })],
        },
        {
          say: 'Selisih ditulis dengan pengurangan. 6 kurang 4 sama dengan 2.',
          add: [T('f', '6 − 4 = 2', 200, 280, { size: 26, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ada 3 apel dan 8 bintang. Bintang lebih banyak berapa?',
          clear: true,
          add: [...objs('a', 'apple', 3, 50, 90, { dx: 44, size: 34 }), ...objs('s', 'star', 8, 50, 190, { dx: 44, size: 34 })],
          ask: {
            options: [
              { t: '5', ok: true, why: '8 − 3 = 5. Lima bintang tidak punya pasangan.' },
              { t: '11', why: '11 adalah jumlah semuanya.' },
              { t: '3', why: '3 adalah banyak apel.' },
              { t: '8', why: '8 adalah banyak bintang.' },
            ],
          },
        },
        {
          say: 'Pasangkan. Lima bintang tersisa. 8 kurang 3 sama dengan 5.',
          add: [...[0, 1, 2].map((i) => ln(`p${i}`, 50 + i * 44, 110, 50 + i * 44, 170, { sw: 2.5, c: 'ok' })), T('k', '8 − 3 = {g:5}', 200, 255, { size: 28 })],
          hl: ['s3', 's4', 's5', 's6', 's7'],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Apel lebih banyak berapa dari bintang?',
      fig: [...objs('a', 'apple', 5, 100, 100, { dx: 50, size: 36 }), ...objs('s', 'star', 2, 100, 190, { dx: 50, size: 36 })],
      ans: ['3'],
      wrong: { '7': 'Itu jumlah semuanya.', '5': '5 adalah banyak apel.' },
      steps: ['5 − 2.', '= 3.'],
    },
    {
      type: 'num',
      q: 'Ani punya 7 pensil. Budi punya 4 pensil. Pensil Ani lebih banyak …',
      ans: ['3'],
      wrong: { '11': 'Selisih dicari dengan pengurangan.', '4': '4 adalah pensil Budi.' },
      steps: ['7 − 4.', '= 3 pensil.'],
    },
    {
      type: 'num',
      q: 'Selisih 9 dan 6 adalah …',
      ans: ['3'],
      wrong: { '15': 'Itu 9 + 6. Selisih memakai pengurangan.' },
      steps: ['9 − 6.', '= 3.'],
    },
    {
      type: 'num',
      q: 'Bintang lebih banyak berapa dari apel?',
      fig: [...objs('a', 'apple', 1, 100, 100, { dx: 50, size: 36 }), ...objs('s', 'star', 5, 100, 190, { dx: 50, size: 36 })],
      ans: ['4'],
      wrong: { '6': 'Itu jumlah semuanya.', '5': '5 adalah banyak bintang.' },
      steps: ['5 − 1.', '= 4.'],
    },
    {
      type: 'num',
      q: 'Selisih 5 dan 5 adalah …',
      ans: ['0'],
      wrong: { '10': 'Itu 5 + 5.', '5': 'Keduanya sama banyak, tidak ada yang lebih.' },
      steps: ['5 − 5.', '= 0.'],
    },
  ],
};

// ---------- 3.3 Tambah dan kurang berpasangan ----------
const FX = 200;
const FY = 100;

const l3 = {
  id: 'k1b3-3',
  title: 'Tambah dan Kurang Berpasangan',
  hook: 'Kalau 3 + 2 = 5, maka 5 − 2 = 3 dan 5 − 3 = 2. Penjumlahan dan pengurangan saling berkaitan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kita tahu 3 tambah 2 sama dengan 5. Berapa 5 kurang 2?',
          add: [T('a', '3 + 2 = 5', 200, 80, { size: 36, c: 'pos' }), T('q', '5 − 2 = ?', 200, 150, { size: 36, c: 'acc' })],
          ask: {
            options: [
              { t: '3', ok: true, why: '5 terbuat dari 3 dan 2. Ambil 2, tersisa 3.' },
              { t: '7', why: '7 adalah 5 + 2. Kurang berarti mengambil.' },
              { t: '2', why: '2 adalah yang diambil.' },
              { t: '5', why: 'Setelah diambil 2, tidak lagi 5.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Satu gambar, empat kalimat',
      steps: [
        {
          say: 'Ada 3 bulatan merah dan 2 bulatan biru. Semuanya 5.',
          clear: true,
          add: [...tenframe('t', FX, FY, 3), tenDot('t', 3, FX, FY, { c: 'pos' }), tenDot('t', 4, FX, FY, { c: 'pos' })],
        },
        {
          say: '3 tambah 2 sama dengan 5. 2 tambah 3 juga sama dengan 5.',
          add: [T('a', '3 + 2 = 5', 120, 175, { size: 26, c: 'pos' }), T('b', '2 + 3 = 5', 280, 175, { size: 26, c: 'pos' })],
        },
        {
          say: 'Ambil yang biru: 5 kurang 2 sama dengan 3. Ambil yang merah: 5 kurang 3 sama dengan 2.',
          add: [T('c', '5 − 2 = 3', 120, 225, { size: 26, c: 'neg' }), T('d', '5 − 3 = 2', 280, 225, { size: 26, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 4 tambah 5 sama dengan 9. Berapa 9 kurang 5?',
          clear: true,
          add: [T('a', '4 + 5 = 9', 200, 80, { size: 36, c: 'pos' }), T('q', '9 − 5 = ?', 200, 150, { size: 36, c: 'acc' })],
          ask: {
            options: [
              { t: '4', ok: true, why: '9 terbuat dari 4 dan 5. Ambil 5, tersisa 4.' },
              { t: '14', why: '14 adalah 9 + 5.' },
              { t: '5', why: '5 adalah yang diambil.' },
              { t: '9', why: 'Setelah diambil 5, tidak lagi 9.' },
            ],
          },
        },
        {
          say: '9 terbuat dari 4 dan 5. Kalau 5 diambil, tersisa 4.',
          add: [T('a2', '9 − 5 = {g:4}', 200, 220, { size: 34 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '6 + 2 = 8, maka 8 − 2 = …',
      ans: ['6'],
      wrong: { '10': 'Itu 8 + 2.', '2': '2 adalah yang diambil.' },
      steps: ['8 terbuat dari 6 dan 2.', '8 − 2 = 6.'],
    },
    {
      type: 'num',
      q: '3 + 4 = 7, maka 7 − 3 = …',
      ans: ['4'],
      wrong: { '10': 'Itu 7 + 3.', '3': '3 adalah yang diambil.' },
      steps: ['7 terbuat dari 3 dan 4.', '7 − 3 = 4.'],
    },
    {
      type: 'num',
      q: '10 − 4 = 6, maka 6 + 4 = …',
      ans: ['10'],
      wrong: { '2': 'Itu 6 − 4.', '6': 'Tambah 4 ke 6.' },
      steps: ['6 dan 4 membuat 10.', '6 + 4 = 10.'],
    },
    {
      type: 'num',
      q: '5 + … = 8',
      ans: ['3'],
      wrong: { '13': 'Cari bagian yang hilang: 8 − 5.' },
      steps: ['8 − 5 = 3.', '5 + 3 = 8.'],
    },
    {
      type: 'num',
      q: '… − 2 = 4',
      ans: ['6'],
      wrong: { '2': 'Cek: 2 − 2 = 0, bukan 4.', '8': 'Cek: 8 − 2 = 6, bukan 4.' },
      steps: ['4 + 2 = 6.', '6 − 2 = 4.'],
    },
  ],
};

export default {
  id: 'k1b3',
  no: 3,
  title: 'Pengurangan sampai 10',
  desc: 'Mengurangi dengan mengambil benda, tanda kurang, selisih dua kelompok, serta hubungan penjumlahan dan pengurangan.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: '7 − 5 = …',
      ans: ['2'],
      wrong: { '12': 'Itu 7 + 5.' },
      steps: ['Mundur 5 dari 7.', '= 2.'],
    },
    {
      type: 'num',
      q: 'Ada 10 burung di pohon. 6 burung terbang. Burung yang tinggal …',
      ans: ['4'],
      wrong: { '16': 'Terbang berarti berkurang.', '6': '6 adalah yang terbang.' },
      steps: ['10 − 6.', '= 4 burung.'],
    },
    {
      type: 'num',
      q: '2 + 7 = 9, maka 9 − 7 = …',
      ans: ['2'],
      wrong: { '16': 'Itu 9 + 7.', '7': '7 adalah yang diambil.' },
      steps: ['9 terbuat dari 2 dan 7.', '9 − 7 = 2.'],
    },
  ],
};
