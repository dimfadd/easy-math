// Kelas 1 · Bab 6: Penjumlahan dan Pengurangan sampai 20
import { T } from '../helpers.js';
import { tenframe, tenDot } from './kit.js';

const TX = 200;
const TY1 = 70;
const TY2 = 150;
const cell = (i, y) => {
  const d = tenDot('x', i, TX, y);
  return { x: d.x, y: d.y };
};

// ---------- 6.1 Membuat 10 dulu ----------
const l1 = {
  id: 'k1b6-1',
  title: 'Penjumlahan dengan Membuat 10',
  hook: 'Untuk menghitung 8 + 5, penuhi dulu kotak sepuluh: 8 + 2 = 10, lalu tambah sisanya 3. Hasilnya 13.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 8 bulatan merah dan 5 bulatan biru. Ada berapa semuanya?',
          add: [...tenframe('ta', TX, TY1, 8), ...tenframe('tb', TX, TY2, 5, { c: 'pos' })],
          ask: {
            options: [
              { t: '13', ok: true, why: 'Pindahkan 2 biru untuk memenuhi kotak atas: 10. Sisa 3 biru. 10 dan 3 adalah 13.' },
              { t: '12', why: 'Hitung lagi sisa biru setelah kotak atas penuh: ada 3.' },
              { t: '3', why: '3 adalah selisihnya. Tambah berarti digabung.' },
              { t: '85', why: '8 tambah 5 tidak ditulis 85. Gabungkan bendanya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Penuhi kotak sepuluh',
      steps: [
        {
          say: '8 merah di kotak atas. Masih ada 2 kotak kosong.',
          clear: true,
          add: [...tenframe('ta', TX, TY1, 8), ...tenframe('tb', TX, TY2, 5, { c: 'pos' }), T('q', '8 + 5', 340, 110, { size: 26 })],
        },
        {
          say: 'Pindahkan 2 biru ke atas. Kotak atas penuh: 10.',
          set: { tbc3: cell(8, TY1), tbc4: cell(9, TY1) },
          add: [T('a', '8 + 2 = 10', TX, 210, { size: 24, c: 'neg' })],
        },
        {
          say: 'Di bawah tersisa 3. 10 dan 3 adalah 13.',
          add: [T('b', '10 + 3 = {g:13}', TX, 250, { size: 28 })],
        },
      ],
    },
    {
      title: 'Langkahnya',
      steps: [
        {
          say: '5 dipecah menjadi 2 dan 3. 2 untuk membuat 10, sisanya 3 ditambahkan.',
          clear: true,
          add: [T('a', '8 + 5', 200, 60, { size: 34, c: 'pos' }), T('b', '= 8 + 2 + 3', 200, 115, { size: 30 }), T('c', '= 10 + 3', 200, 165, { size: 30 }), T('d', '= 13', 200, 215, { size: 34, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 9 tambah 4?',
          clear: true,
          add: [...tenframe('ta', TX, TY1, 9), ...tenframe('tb', TX, TY2, 4, { c: 'pos' }), T('q', '9 + 4 = ?', TX, 225, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '13', ok: true, why: '9 + 1 = 10, sisa 3. 10 + 3 = 13.' },
              { t: '14', why: 'Setelah 1 dipindah, sisa biru tinggal 3.' },
              { t: '5', why: '5 adalah selisihnya.' },
              { t: '12', why: '10 dan 3 adalah 13.' },
            ],
          },
        },
        {
          say: 'Pindahkan 1 biru ke atas. Kotak atas 10, sisa 3. Jadi 13.',
          set: { tbc3: cell(9, TY1) },
          add: [T('a', '9 + 1 + 3 = {g:13}', TX, 262, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '9 + 3 = …',
      ans: ['12'],
      wrong: { '6': 'Itu 9 kurang 3.', '11': '9 + 1 = 10, sisa 2. 10 + 2 = 12.' },
      steps: ['9 + 1 = 10, sisa 2.', '10 + 2 = 12.'],
    },
    {
      type: 'num',
      q: '8 + 6 = …',
      ans: ['14'],
      wrong: { '2': 'Itu selisihnya.', '13': '8 + 2 = 10, sisa 4. 10 + 4 = 14.' },
      steps: ['8 + 2 = 10, sisa 4.', '10 + 4 = 14.'],
    },
    {
      type: 'num',
      q: '7 + 5 = …',
      ans: ['12'],
      wrong: { '11': '7 + 3 = 10, sisa 2. 10 + 2 = 12.' },
      steps: ['7 + 3 = 10, sisa 2.', '10 + 2 = 12.'],
    },
    {
      type: 'num',
      q: '10 + 7 = …',
      ans: ['17'],
      wrong: { '3': 'Itu 10 kurang 7.', '107': '10 dan 7 adalah 17.' },
      steps: ['10 dan 7.', '= 17.'],
    },
    {
      type: 'num',
      q: 'Ani punya 6 kelereng. Ia membeli 8 kelereng lagi. Kelereng Ani sekarang …',
      ans: ['14'],
      wrong: { '2': 'Membeli berarti bertambah.', '13': '8 + 2 = 10, sisa 4. 10 + 4 = 14.' },
      steps: ['6 + 8 = 8 + 6.', '8 + 2 + 4 = 14.'],
    },
  ],
};

// ---------- 6.2 Pengurangan dari belasan ----------
const l2 = {
  id: 'k1b6-2',
  title: 'Pengurangan dari Belasan',
  hook: 'Untuk menghitung 13 − 5, ambil dulu 3 supaya tinggal 10, lalu ambil 2 lagi. Hasilnya 8.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 13 bulatan. Diambil 5. Berapa yang tersisa?',
          add: [...tenframe('ta', TX, TY1, 10), ...tenframe('tb', TX, TY2, 3, { c: 'pos' }), T('q', '13 − 5', 340, 110, { size: 26 })],
          ask: {
            options: [
              { t: '8', ok: true, why: 'Ambil 3 dulu, tinggal 10. Ambil 2 lagi, tinggal 8.' },
              { t: '18', why: '18 adalah 13 + 5. Diambil berarti berkurang.' },
              { t: '7', why: 'Setelah 10, ambil 2 lagi: tinggal 8.' },
              { t: '10', why: 'Baru 3 yang diambil. Masih harus ambil 2 lagi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ambil sampai 10 dulu',
      steps: [
        {
          say: 'Ada 13: 10 di atas dan 3 di bawah. Kita akan mengambil 5.',
          clear: true,
          add: [...tenframe('ta', TX, TY1, 10), ...tenframe('tb', TX, TY2, 3, { c: 'pos' }), T('q', '13 − 5', 340, 110, { size: 26 })],
        },
        {
          say: 'Ambil 3 di bawah dulu. Tinggal 10.',
          set: { tbc0: { o: 0.15 }, tbc1: { o: 0.15 }, tbc2: { o: 0.15 } },
          add: [T('a', '13 − 3 = 10', TX, 210, { size: 24, c: 'pos' })],
        },
        {
          say: 'Masih harus ambil 2 lagi. Ambil 2 dari kotak atas. Tinggal 8.',
          set: { tac8: { o: 0.15 }, tac9: { o: 0.15 } },
          add: [T('b', '10 − 2 = {g:8}', TX, 250, { size: 28 })],
        },
      ],
    },
    {
      title: 'Langkahnya',
      steps: [
        {
          say: '5 dipecah menjadi 3 dan 2. Ambil 3 dulu sampai tinggal 10, lalu ambil 2 lagi.',
          clear: true,
          add: [T('a', '13 − 5', 200, 60, { size: 34, c: 'pos' }), T('b', '= 13 − 3 − 2', 200, 115, { size: 30 }), T('c', '= 10 − 2', 200, 165, { size: 30 }), T('d', '= 8', 200, 215, { size: 34, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 12 kurang 4?',
          clear: true,
          add: [...tenframe('ta', TX, TY1, 10), ...tenframe('tb', TX, TY2, 2, { c: 'pos' }), T('q', '12 − 4 = ?', TX, 225, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '8', ok: true, why: '12 − 2 = 10, lalu 10 − 2 = 8.' },
              { t: '16', why: '16 adalah 12 + 4.' },
              { t: '9', why: 'Setelah 10, ambil 2 lagi: 8.' },
              { t: '10', why: 'Baru 2 yang diambil. Ambil 2 lagi.' },
            ],
          },
        },
        {
          say: 'Ambil 2 di bawah, tinggal 10. Ambil 2 lagi dari atas, tinggal 8.',
          set: { tbc0: { o: 0.15 }, tbc1: { o: 0.15 }, tac8: { o: 0.15 }, tac9: { o: 0.15 } },
          add: [T('a', '12 − 2 − 2 = {g:8}', TX, 262, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '14 − 6 = …',
      ans: ['8'],
      wrong: { '20': 'Itu 14 + 6.', '10': 'Itu baru 14 − 4. Ambil 2 lagi.' },
      steps: ['14 − 4 = 10.', '10 − 2 = 8.'],
    },
    {
      type: 'num',
      q: '11 − 3 = …',
      ans: ['8'],
      wrong: { '14': 'Itu 11 + 3.', '9': '11 − 1 = 10, lalu 10 − 2 = 8.' },
      steps: ['11 − 1 = 10.', '10 − 2 = 8.'],
    },
    {
      type: 'num',
      q: '15 − 5 = …',
      ans: ['10'],
      wrong: { '20': 'Itu 15 + 5.' },
      steps: ['Ambil yang 5 di bawah.', 'Tinggal 10.'],
    },
    {
      type: 'num',
      q: '17 − 7 = …',
      ans: ['10'],
      wrong: { '24': 'Itu 17 + 7.', '7': '17 adalah 10 dan 7. Ambil 7, tinggal 10.' },
      steps: ['17 = 10 dan 7.', 'Ambil 7, tinggal 10.'],
    },
    {
      type: 'num',
      q: 'Ada 16 kue. 9 kue dimakan. Sisa kue ada …',
      ans: ['7'],
      wrong: { '25': 'Dimakan berarti berkurang.', '9': '9 adalah kue yang dimakan.' },
      steps: ['16 − 6 = 10.', '10 − 3 = 7.'],
    },
  ],
};

export default {
  id: 'k1b6',
  no: 6,
  title: 'Penjumlahan dan Pengurangan sampai 20',
  desc: 'Menjumlahkan dengan membuat 10 terlebih dahulu dan mengurangi dari bilangan belasan melalui 10.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: '6 + 7 = …',
      ans: ['13'],
      wrong: { '1': 'Itu selisihnya.', '12': '7 + 3 = 10, sisa 3. 10 + 3 = 13.' },
      steps: ['7 + 3 = 10, sisa 3.', '10 + 3 = 13.'],
    },
    {
      type: 'num',
      q: '13 − 8 = …',
      ans: ['5'],
      wrong: { '21': 'Itu 13 + 8.', '6': '13 − 3 = 10, lalu 10 − 5 = 5.' },
      steps: ['13 − 3 = 10.', '10 − 5 = 5.'],
    },
    {
      type: 'num',
      q: 'Di kelas ada 9 anak laki-laki dan 8 anak perempuan. Semuanya ada … anak.',
      ans: ['17'],
      wrong: { '1': 'Semuanya berarti dijumlah.', '16': '9 + 1 = 10, sisa 7. 10 + 7 = 17.' },
      steps: ['9 + 1 = 10, sisa 7.', '10 + 7 = 17.'],
    },
  ],
};
