// Kelas 5 · Bab 3: Pecahan dan Desimal
import { T, F, ln, box } from '../helpers.js';

const W = 240;
const X0 = 70;
const strip = (p, n, k, y, c = 'acc', start = 0) => Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'rect', x: X0 + (W / n) * (i + 0.5), y, w: W / n, h: 30, r: 0, fill: i >= start && i < start + k ? `${c}-soft` : 'paper', stroke: 'ink', sw: 2 }));

// ---------- 3.1 Menjumlah dan mengurangi pecahan ----------
const l1 = {
  id: 'k5b3-1',
  title: 'Menjumlah Pecahan Berbeda Penyebut',
  hook: 'Pecahan hanya bisa dijumlah kalau potongannya sama besar. Samakan penyebutnya dengan KPK, lalu jumlahkan pembilangnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa setengah tambah sepertiga?',
          add: [T('q', '1/2 + 1/3 = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '5/6', ok: true, why: '1/2 = 3/6 dan 1/3 = 2/6. 3/6 + 2/6 = 5/6.' },
              { t: '2/5', why: 'Pembilang dan penyebut tidak dijumlah begitu saja. Potongannya harus sama besar dulu.' },
              { t: '2/6', why: 'Ubah dulu kedua pecahan menjadi per enam: 3/6 dan 2/6.' },
              { t: '1/5', why: 'Hasilnya pasti lebih besar dari 1/2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Samakan potongannya',
      steps: [
        {
          say: 'Setengah dan sepertiga punya potongan yang berbeda ukuran. Tidak bisa langsung dijumlah.',
          clear: true,
          add: [...strip('a', 2, 1, 60, 'pos'), F('fa', '1', '2', 345, 60, { size: 20 }), ...strip('b', 3, 1, 115, 'acc'), F('fb', '1', '3', 345, 115, { size: 20 })],
        },
        {
          say: 'KPK dari 2 dan 3 adalah 6. Bagi kedua pita menjadi 6 potong. Setengah sama dengan 3 per 6, sepertiga sama dengan 2 per 6.',
          clear: true,
          add: [...strip('a', 6, 3, 60, 'pos'), F('fa', '3', '6', 345, 60, { size: 20 }), ...strip('b', 6, 2, 115, 'acc'), F('fb', '2', '6', 345, 115, { size: 20 })],
        },
        {
          say: 'Sekarang potongannya sama. 3 potong tambah 2 potong sama dengan 5 potong: 5 per 6.',
          add: [...strip('c', 6, 3, 180, 'pos'), ...strip('d', 6, 2, 180, 'acc', 3).slice(3, 5), F('fc', '5', '6', 345, 180, { size: 20, c: 'ok' }), T('k', '1/2 + 1/3 = 3/6 + 2/6 = {g:5/6}', 200, 245, { size: 20 })],
        },
      ],
    },
    {
      title: 'Mengurangi dan menyederhanakan',
      steps: [
        {
          say: 'Pengurangan juga sama. 3 per 4 dikurangi 1 per 6. KPK dari 4 dan 6 adalah 12. 9 per 12 dikurangi 2 per 12 sama dengan 7 per 12.',
          clear: true,
          add: [T('a', '3/4 − 1/6 = 9/12 − 2/12 = {g:7/12}', 200, 70, { size: 22 })],
        },
        {
          say: 'Hasil bisa disederhanakan dengan membagi pembilang dan penyebut dengan FPB-nya. Misalnya 6 per 8: FPB 6 dan 8 adalah 2, jadi 3 per 4.',
          add: [T('b', '6/8 = (6 : 2)/(8 : 2) = {g:3/4}', 200, 140, { size: 22 }), T('c', 'bagi dengan FPB', 200, 180, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 1 per 4 tambah 2 per 3?',
          clear: true,
          add: [T('q', '1/4 + 2/3 = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '11/12', ok: true, why: 'KPK 12: 3/12 + 8/12 = 11/12.' },
              { t: '3/7', why: 'Samakan penyebut dulu, jangan menjumlah penyebut.' },
              { t: '3/12', why: '2/3 = 8/12, bukan 2/12.' },
              { t: '9/12', why: '1/4 = 3/12 dan 2/3 = 8/12. 3 + 8 = 11.' },
            ],
          },
        },
        {
          say: 'KPK dari 4 dan 3 adalah 12. 1 per 4 sama dengan 3 per 12. 2 per 3 sama dengan 8 per 12. Jumlahnya 11 per 12.',
          add: [T('a', '3/12 + 8/12 = {g:11/12}', 200, 190, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '1/3 + 1/6 = … (tulis sebagai pecahan paling sederhana)',
      ans: ['1/2', '3/6'],
      wrong: { '2/9': 'Samakan penyebut: 2/6 + 1/6.', '2/6': '1/3 = 2/6. 2/6 + 1/6 = 3/6.' },
      steps: ['2/6 + 1/6 = 3/6.', '= 1/2.'],
    },
    {
      type: 'num',
      q: '2/5 + 1/2 = …',
      ans: ['9/10'],
      wrong: { '3/7': 'Samakan penyebut dulu: 4/10 + 5/10.' },
      steps: ['KPK 10: 4/10 + 5/10.', '= 9/10.'],
    },
    {
      type: 'num',
      q: '5/6 − 1/3 = … (paling sederhana)',
      ans: ['1/2', '3/6'],
      wrong: { '4/3': 'Samakan penyebut: 5/6 − 2/6.', '4/6': '1/3 = 2/6, bukan 1/6.' },
      steps: ['5/6 − 2/6 = 3/6.', '= 1/2.'],
    },
    {
      type: 'num',
      q: 'Bentuk paling sederhana dari 8/12 adalah …',
      ans: ['2/3'],
      wrong: { '4/6': 'Masih bisa disederhanakan: FPB(8, 12) = 4.', '4/12': 'Bagi pembilang dan penyebut dengan bilangan yang sama.' },
      steps: ['FPB(8, 12) = 4.', '8/12 = 2/3.'],
    },
    {
      type: 'num',
      q: 'Ibu memakai 1/4 kg gula untuk kue dan 1/2 kg untuk minuman. Gula yang dipakai … kg.',
      ans: ['3/4'],
      wrong: { '2/6': 'Samakan penyebut: 1/4 + 2/4.', '1/3': '1/4 + 2/4 = 3/4.' },
      steps: ['1/2 = 2/4.', '1/4 + 2/4 = 3/4 kg.'],
    },
  ],
};

// ---------- 3.2 Pecahan campuran ----------
const pie = (p, x, y, n, k, r = 40, c = 'acc') => [
  ...Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'arc', x, y, r, a1: 90 - (360 / n) * (i + 1), a2: 90 - (360 / n) * i, c: i < k ? c : 'mut' })),
  { id: `${p}s`, t: 'path', x: 0, y: 0, d: Array.from({ length: n }, (_, i) => { const t = ((90 - (360 / n) * i) * Math.PI) / 180; return `M${x},${y} L${(x + r * Math.cos(t)).toFixed(1)},${(y - r * Math.sin(t)).toFixed(1)}`; }).join(' '), stroke: 'ink', sw: 1.5 },
  { id: `${p}o`, t: 'circle', x, y, r, fill: 'none', stroke: 'ink', sw: 2 },
];

const l2 = {
  id: 'k5b3-2',
  title: 'Pecahan Campuran',
  hook: 'Pecahan yang pembilangnya lebih besar dari penyebut bisa ditulis sebagai bilangan utuh dan pecahan: 7/4 = 1¾.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 7 potong kue, setiap potong seperempat kue. Berapa kue utuh dan sisanya?',
          add: [...pie('a', 120, 120, 4, 4), ...pie('b', 260, 120, 4, 3)],
          ask: {
            options: [
              { t: '1 kue utuh dan 3/4', ok: true, why: '4 potong membentuk 1 kue utuh. Sisa 3 potong: 3/4.' },
              { t: '7 kue utuh', why: 'Setiap potong hanya seperempat kue.' },
              { t: '1 kue utuh dan 1/4', why: 'Sisa potongnya 7 − 4 = 3.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dari pecahan biasa ke campuran',
      steps: [
        {
          say: '7 per 4: bagi 7 dengan 4. Hasilnya 1 sisa 3. Jadi 1 utuh dan 3 per 4, ditulis 1 tiga per empat.',
          clear: true,
          add: [...pie('a', 110, 110, 4, 4), ...pie('b', 250, 110, 4, 3), T('ta', '1 utuh', 110, 170, { size: 16 }), T('tb', '3/4', 250, 170, { size: 16 }), T('k', '7/4 = 1¾', 200, 225, { size: 30, c: 'ok' }), T('k2', '7 : 4 = 1 sisa 3', 200, 265, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Dari campuran ke pecahan biasa',
      steps: [
        {
          say: 'Sebaliknya, 2 dua per lima. 2 utuh sama dengan 10 per 5. Ditambah 2 per 5, menjadi 12 per 5.',
          clear: true,
          add: [T('a', '2⅖ = ?', 200, 60, { size: 30, c: 'pos' }), T('b', '2 utuh = 10/5', 200, 115, { size: 22 }), T('c', '10/5 + 2/5 = {g:12/5}', 200, 160, { size: 26 })],
        },
        {
          say: 'Cara cepat: kalikan bilangan utuh dengan penyebut, lalu tambah pembilang. 2 kali 5 tambah 2 sama dengan 12.',
          add: [T('d', '(2 × 5 + 2)/5 = 12/5', 200, 220, { size: 22, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 11 per 3 sama dengan pecahan campuran berapa?',
          clear: true,
          add: [T('q', '11/3 = ?', 200, 110, { size: 44, c: 'pos' })],
          ask: {
            options: [
              { t: '3⅔', ok: true, why: '11 : 3 = 3 sisa 2. Jadi 3 utuh dan 2/3.' },
              { t: '2⅓', why: '3 × 2 = 6, masih sisa 5. 3 × 3 = 9, sisa 2.' },
              { t: '3⅓', why: 'Sisanya 11 − 9 = 2, bukan 1.' },
            ],
          },
        },
        {
          say: '11 bagi 3 sama dengan 3 sisa 2. Jadi 3 dua per tiga.',
          add: [T('a', '11 : 3 = 3 sisa 2 → {g:3⅔}', 200, 190, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '5/2 = …',
      options: [
        { t: '2½', ok: true },
        { t: '1½', why: '5 : 2 = 2 sisa 1.' },
        { t: '2⅕', why: 'Sisa 1 dari penyebut 2: 1/2.' },
      ],
      steps: ['5 : 2 = 2 sisa 1.', '2½.'],
    },
    {
      type: 'num',
      q: '1¾ = …/4',
      ans: ['7'],
      wrong: { '4': '1 utuh = 4/4, ditambah 3/4.', '5': '1 × 4 + 3 = 7.' },
      steps: ['1 × 4 + 3 = 7.', '7/4.'],
    },
    {
      type: 'num',
      q: '3½ = …/2',
      ans: ['7'],
      wrong: { '4': '3 × 2 + 1 = 7.', '5': '3 utuh = 6/2, ditambah 1/2.' },
      steps: ['3 × 2 + 1 = 7.', '7/2.'],
    },
    {
      q: '9/4 = …',
      options: [
        { t: '2¼', ok: true },
        { t: '2¾', why: '9 − 8 = 1, jadi sisa 1/4.' },
        { t: '1¼', why: '4 × 2 = 8, jadi 2 utuh.' },
      ],
      steps: ['9 : 4 = 2 sisa 1.', '2¼.'],
    },
    {
      type: 'num',
      q: 'Ada 13 potong kue, setiap potong 1/5 kue. Banyak kue utuh yang bisa dibentuk adalah …',
      ans: ['2'],
      wrong: { '13': 'Setiap potong hanya 1/5.', '3': '5 × 3 = 15, lebih dari 13.' },
      steps: ['13 : 5 = 2 sisa 3.', '2 kue utuh.'],
    },
  ],
};

// ---------- 3.3 Desimal ----------
const NX = (v) => 40 + v * 320;
const nl = (y) => [ln('nl', 35, y, 365, y, { sw: 2.5, c: 'ink', draw: false }), ...Array.from({ length: 11 }, (_, i) => [ln(`t${i}`, NX(i / 10), y - (i % 5 ? 6 : 10), NX(i / 10), y + (i % 5 ? 6 : 10), { sw: 1.8, c: 'ink', draw: false }), T(`n${i}`, i === 0 ? '0' : i === 10 ? '1' : `0,${i}`, NX(i / 10), y + 22, { size: 11, c: 'mut' })]).flat()];

const l3 = {
  id: 'k5b3-3',
  title: 'Pecahan Desimal',
  hook: 'Pecahan berpenyebut 10 atau 100 bisa ditulis dengan koma. 3/10 = 0,3 dan 25/100 = 0,25.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pita dibagi 10 bagian sama besar. 3 bagian berwarna. Bagaimana menulisnya dengan koma?',
          add: [...Array.from({ length: 10 }, (_, i) => box(`s${i}`, 65 + i * 30, 110, 30, 34, { r: 0, fill: i < 3 ? 'pos-soft' : 'paper', stroke: 'ink', sw: 1.8 }))],
          ask: {
            options: [
              { t: '0,3', ok: true, why: '3/10 ditulis 0,3: angka 3 di tempat persepuluhan.' },
              { t: '3,0', why: '3,0 adalah tiga utuh.' },
              { t: '0,03', why: '0,03 adalah 3/100.' },
              { t: '3,10', why: 'Pecahan desimal tidak menulis penyebutnya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Persepuluhan',
      steps: [
        {
          say: 'Garis bilangan dari 0 sampai 1 dibagi menjadi 10 bagian. Setiap langkah adalah satu per sepuluh, ditulis 0,1.',
          clear: true,
          add: nl(110),
        },
        {
          say: '3 per 10 ditulis 0,3. 7 per 10 ditulis 0,7. Angka setelah koma menunjukkan persepuluhan.',
          add: [{ id: 'p3', t: 'circle', x: NX(0.3), y: 110, r: 7, fill: 'pos', stroke: 'ink', sw: 1.5 }, { id: 'p7', t: 'circle', x: NX(0.7), y: 110, r: 7, fill: 'acc', stroke: 'ink', sw: 1.5 }, T('a', '3/10 = 0,3      7/10 = 0,7', 200, 185, { size: 22 })],
        },
      ],
    },
    {
      title: 'Perseratusan',
      steps: [
        {
          say: 'Petak 10 kali 10 berisi 100 kotak kecil. 25 kotak berwarna adalah 25 per 100, ditulis 0,25.',
          clear: true,
          add: [...Array.from({ length: 100 }, (_, i) => box(`g${i}`, 80 + (i % 10) * 16, 50 + Math.floor(i / 10) * 16, 16, 16, { r: 0, fill: i < 25 ? 'ok-soft' : 'paper', stroke: 'mut', sw: 0.8 })), T('a', '25/100', 320, 90, { size: 24 }), T('b', '= 0,25', 320, 130, { size: 28, c: 'ok' })],
        },
        {
          say: 'Dua angka di belakang koma menunjukkan perseratusan. 0,25 dibaca nol koma dua lima.',
          add: [T('c', 'dua angka di', 320, 180, { size: 13, c: 'mut' }), T('d', 'belakang koma', 320, 198, { size: 13, c: 'mut' }), T('e', '= perseratusan', 320, 216, { size: 13, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 7 per 100 ditulis sebagai desimal berapa?',
          clear: true,
          add: [T('q', '7/100 = ?', 200, 110, { size: 44, c: 'pos' })],
          ask: {
            options: [
              { t: '0,07', ok: true, why: 'Perseratusan berarti dua angka di belakang koma: 0,07.' },
              { t: '0,7', why: '0,7 = 7/10.' },
              { t: '7,00', why: '7,00 adalah tujuh utuh.' },
            ],
          },
        },
        {
          say: 'Per seratus berarti dua angka di belakang koma. 7 ditulis 07: jadi 0,07.',
          add: [T('a', '7/100 = {g:0,07}', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '9/10 = … (tulis desimal)',
      ans: ['0.9', '0,9'],
      wrong: { '0.09': '0,09 = 9/100.', '9': '9/10 kurang dari 1.' },
      steps: ['Persepuluhan: 0,9.'],
    },
    {
      type: 'num',
      q: '0,45 = …/100',
      ans: ['45'],
      wrong: { '4.5': '0,45 = 45 per seratus.' },
      steps: ['Dua angka di belakang koma → perseratusan.', '45/100.'],
    },
    {
      q: 'Mana yang lebih besar?',
      options: [
        { t: '0,5', ok: true },
        { t: '0,35', why: '0,5 = 0,50 > 0,35.' },
      ],
      steps: ['0,5 = 0,50.', '50 > 35.'],
    },
    {
      type: 'num',
      q: '1/2 = … (tulis desimal)',
      ans: ['0.5', '0,5', '0,50'],
      wrong: { '0.2': '1/2 = 5/10.', '1.2': 'Pecahan tidak ditulis begitu.' },
      steps: ['1/2 = 5/10.', '= 0,5.'],
    },
    {
      type: 'num',
      q: '3/4 = … (tulis desimal)',
      ans: ['0.75', '0,75'],
      wrong: { '0.34': '3/4 = 75/100.', '3.4': 'Pecahan tidak ditulis begitu.' },
      steps: ['3/4 = 75/100.', '= 0,75.'],
    },
  ],
};

export default {
  id: 'k5b3',
  no: 3,
  title: 'Pecahan dan Desimal',
  desc: 'Menjumlah dan mengurangi pecahan berbeda penyebut, menyederhanakan, pecahan campuran, serta pecahan desimal persepuluhan dan perseratusan.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: '1/2 + 1/4 = …',
      ans: ['3/4'],
      wrong: { '2/6': 'Samakan penyebut: 2/4 + 1/4.' },
      steps: ['2/4 + 1/4 = 3/4.'],
    },
    {
      q: '10/3 = …',
      options: [
        { t: '3⅓', ok: true },
        { t: '3⅔', why: '10 − 9 = 1, sisa 1/3.' },
        { t: '1⅓', why: '3 × 3 = 9, jadi 3 utuh.' },
      ],
      steps: ['10 : 3 = 3 sisa 1.'],
    },
    {
      type: 'num',
      q: '0,6 = …/10',
      ans: ['6'],
      wrong: { '60': '0,6 = 6/10 (atau 60/100).' },
      steps: ['0,6 = 6/10.'],
    },
  ],
};
