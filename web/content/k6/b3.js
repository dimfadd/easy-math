// Kelas 6 · Bab 3: Volume Kubus dan Balok
import { T, ln } from '../helpers.js';
import { blockOf } from './kit.js';

const BX = 70;
const BY = 230;

// ---------- 3.1 Volume balok ----------
const l1 = {
  id: 'k6b3-1',
  title: 'Volume Balok',
  hook: 'Volume adalah banyaknya kubus satuan yang mengisi bangun ruang. Volume balok = panjang × lebar × tinggi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Balok ini tersusun dari kubus 1 cm. Panjangnya 4, lebarnya 3, tingginya 2. Berapa volumenya?',
          add: blockOf('c', 4, 3, 2, BX, BY),
          ask: {
            options: [
              { t: '24 cm³', ok: true, why: '4 × 3 = 12 per lapis. 2 lapis = 24.' },
              { t: '9 cm³', why: '4 + 3 + 2 = 9. Volume dihitung dengan perkalian, bukan penjumlahan.' },
              { t: '12 cm³', why: 'Itu satu lapis saja. Ada 2 lapis.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Lapis demi lapis',
      steps: [
        {
          say: 'Lapis paling bawah: 4 kubus ke kanan, 3 baris ke belakang. 4 kali 3 sama dengan 12 kubus.',
          clear: true,
          add: [...blockOf('c', 4, 3, 2, BX, BY, 'acc', 1), T('a', 'lapis 1: 4 × 3 = 12', 300, 70, { size: 18 })],
        },
        {
          say: 'Tambahkan lapis kedua. Isinya juga 12. Dua lapis: 12 kali 2 sama dengan 24 kubus.',
          add: blockOf('c', 4, 3, 2, BX, BY).slice(36),
        },
        {
          say: 'Satu kubus bervolume 1 sentimeter kubik. Jadi volume balok 24 sentimeter kubik.',
          add: [T('b', '4 × 3 × 2 = {g:24 cm³}', 300, 110, { size: 20 })],
        },
      ],
    },
    {
      title: 'Rumus',
      steps: [
        {
          say: 'Rumusnya: volume balok sama dengan panjang kali lebar kali tinggi.',
          clear: true,
          add: [T('r', 'V = p × l × t', 200, 80, { size: 36, c: 'pos' })],
        },
        {
          say: 'Panjang kali lebar adalah luas alas. Jadi volume juga sama dengan luas alas kali tinggi.',
          add: [T('s', 'V = luas alas × t', 200, 150, { size: 26 })],
        },
        {
          say: 'Contoh: akuarium 50 cm kali 30 cm kali 40 cm. Volumenya 60.000 sentimeter kubik.',
          add: [T('c', '50 × 30 × 40 = {g:60.000 cm³}', 200, 220, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kotak berukuran panjang 10 cm, lebar 5 cm, tinggi 3 cm. Berapa volumenya?',
          clear: true,
          add: [T('q', '10 × 5 × 3 = ?', 200, 110, { size: 38, c: 'pos' })],
          ask: {
            options: [
              { t: '150 cm³', ok: true, why: '10 × 5 = 50, lalu 50 × 3 = 150.' },
              { t: '18 cm³', why: 'Itu jumlahnya. Volume = perkalian.' },
              { t: '50 cm³', why: 'Itu luas alasnya. Kalikan dengan tinggi 3.' },
            ],
          },
        },
        {
          say: '10 kali 5 sama dengan 50. 50 kali 3 sama dengan 150 sentimeter kubik.',
          add: [T('a', '= {g:150 cm³}', 200, 180, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Balok 6 cm × 4 cm × 5 cm. Volume … cm³', ans: ['120'], wrong: { '15': 'Kalikan, jangan jumlahkan.', '24': 'Jangan lupa tinggi 5.' }, steps: ['6 × 4 × 5 = 120.'] },
    { type: 'num', q: 'Luas alas balok 30 cm², tinggi 8 cm. Volume … cm³', ans: ['240'], steps: ['30 × 8 = 240.'] },
    { type: 'num', q: 'Balok bervolume 72 cm³, panjang 6 cm, lebar 4 cm. Tinggi … cm', ans: ['3'], wrong: { '62': 'Bagi, jangan kurangi: 72 : 24.' }, steps: ['6 × 4 = 24.', '72 : 24 = 3.'] },
    { type: 'num', q: 'Berapa kubus satuan yang mengisi balok 5 × 2 × 2?', ans: ['20'], steps: ['5 × 2 × 2 = 20.'] },
    { type: 'num', q: 'Kolam 10 m × 4 m × 2 m. Volume … m³', ans: ['80'], steps: ['10 × 4 × 2 = 80.'] },
  ],
};

// ---------- 3.2 Volume kubus dan satuan ----------
const l2 = {
  id: 'k6b3-2',
  title: 'Volume Kubus dan Liter',
  hook: 'Kubus punya panjang, lebar, dan tinggi yang sama: V = s × s × s. Kubus berusuk 10 cm bervolume 1.000 cm³, sama dengan 1 liter.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kubus ini rusuknya 3 cm. Berapa volumenya?',
          add: blockOf('c', 3, 3, 3, 120, 240, 'ok'),
          ask: {
            options: [
              { t: '27 cm³', ok: true, why: '3 × 3 × 3 = 27.' },
              { t: '9 cm³', why: '3 × 3 hanya satu lapis. Ada 3 lapis.' },
              { t: '12 cm³', why: 'Rusuk 3 dikali tiga kali: 3 × 3 × 3.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kubus',
      steps: [
        {
          say: 'Panjang, lebar, dan tinggi kubus sama, yaitu rusuk s. Volumenya s kali s kali s.',
          clear: true,
          add: [...blockOf('c', 3, 3, 3, 90, 240, 'ok'), T('r', 'V = s × s × s', 300, 80, { size: 24, c: 'pos' })],
        },
        {
          say: 'Rusuk 3: 3 kali 3 kali 3 sama dengan 27 sentimeter kubik.',
          add: [T('a', '3 × 3 × 3 = {g:27}', 300, 130, { size: 22 })],
        },
      ],
    },
    {
      title: 'Liter',
      steps: [
        {
          say: 'Kubus dengan rusuk 10 sentimeter bervolume 10 kali 10 kali 10, yaitu 1.000 sentimeter kubik.',
          clear: true,
          add: [{ id: 'k', t: 'poly', x: 0, y: 0, pts: [[110, 240], [230, 240], [230, 120], [110, 120]], fill: 'pos-soft', stroke: 'pos', sw: 2 }, { id: 'kt', t: 'poly', x: 0, y: 0, pts: [[110, 120], [230, 120], [280, 80], [160, 80]], fill: 'paper', stroke: 'pos', sw: 2 }, { id: 'ks', t: 'poly', x: 0, y: 0, pts: [[230, 240], [280, 200], [280, 80], [230, 120]], fill: 'pos-soft', stroke: 'pos', sw: 2 }, T('s', '10 cm', 170, 262, { size: 15 }), T('a', '10 × 10 × 10 = 1.000 cm³', 200, 40, { size: 20 })],
        },
        {
          say: 'Isi kubus ini tepat 1 liter. Jadi 1 liter sama dengan 1.000 sentimeter kubik, atau 1 desimeter kubik.',
          add: [T('b', '{g:1 liter} = 1 dm³', 340, 140, { size: 16 }), T('b2', '= 1.000 cm³', 340, 165, { size: 16 })],
        },
        {
          say: 'Satu sentimeter kubik juga disebut satu mililiter.',
          add: [T('c', '1 cm³ = 1 mL', 330, 210, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Akuarium 50 cm kali 20 cm kali 30 cm diisi penuh. Berapa liter airnya?',
          clear: true,
          add: [T('q', '50 × 20 × 30 cm³ = … liter', 200, 110, { size: 24, c: 'pos' })],
          ask: {
            options: [
              { t: '30 liter', ok: true, why: '30.000 cm³ : 1.000 = 30 liter.' },
              { t: '30.000 liter', why: '30.000 itu dalam cm³. Bagi 1.000 untuk liter.' },
              { t: '3 liter', why: '30.000 : 1.000 = 30, bukan 3.' },
            ],
          },
        },
        {
          say: 'Volumenya 30.000 sentimeter kubik. Dibagi 1.000 menjadi 30 liter.',
          add: [T('a', '30.000 cm³ = {g:30 liter}', 200, 180, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Volume kubus dengan rusuk 4 cm … cm³', ans: ['64'], wrong: { '16': 'Itu 4 × 4. Kalikan sekali lagi.', '12': '4 × 4 × 4.' }, steps: ['4 × 4 × 4 = 64.'] },
    { type: 'num', q: 'Volume kubus dengan rusuk 5 cm … cm³', ans: ['125'], wrong: { '25': 'Kalikan sekali lagi dengan 5.' }, steps: ['5 × 5 × 5 = 125.'] },
    { type: 'num', q: 'Kubus bervolume 8 cm³. Rusuknya … cm', ans: ['2'], wrong: { '4': '4 × 4 × 4 = 64.' }, steps: ['2 × 2 × 2 = 8.'] },
    { type: 'num', q: '2 liter = … cm³', ans: ['2000', '2.000'], wrong: { '200': '1 liter = 1.000 cm³.' }, steps: ['2 × 1.000 = 2.000.'] },
    { type: 'num', q: 'Bak 100 cm × 50 cm × 40 cm. Isinya … liter', ans: ['200'], wrong: { '200000': 'Itu dalam cm³. Bagi 1.000.' }, steps: ['200.000 cm³.', ': 1.000 = 200 liter.'] },
  ],
};

export default {
  id: 'k6b3',
  no: 3,
  title: 'Volume Kubus dan Balok',
  desc: 'Menghitung volume balok lapis demi lapis, rumus p × l × t, volume kubus s × s × s, dan hubungan cm³ dengan liter.',
  lessons: [l1, l2],
  extra: [
    { type: 'num', q: 'Balok 8 × 5 × 3 cm. Volume … cm³', ans: ['120'], steps: ['8 × 5 × 3 = 120.'] },
    { type: 'num', q: 'Volume kubus rusuk 10 cm … cm³', ans: ['1000', '1.000'], steps: ['10 × 10 × 10 = 1.000.'] },
    { type: 'num', q: '3.500 cm³ = … liter', ans: ['3.5', '3,5', '7/2'], wrong: { '35': 'Bagi 1.000, bukan 100.' }, steps: ['3.500 : 1.000 = 3,5.'] },
  ],
};
