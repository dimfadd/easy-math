// Kelas 6 · Bab 7: Besaran dan Satuan (kecepatan dan debit)
import { T, ln, box } from '../helpers.js';

const road = () => [ln('rd', 40, 170, 360, 170, { sw: 3, c: 'ink' }), ...[0, 1, 2, 3].map((i) => T(`km${i}`, `${i * 60} km`, 40 + i * 100, 195, { size: 13, c: 'mut' })), ...[0, 1, 2, 3].map((i) => ln(`tk${i}`, 40 + i * 100, 163, 40 + i * 100, 177, { sw: 2, c: 'ink' }))];
const car = (x) => box('car', x, 150, 34, 20, { fill: 'neg', r: 5 });

// ---------- 7.1 Kecepatan ----------
const l1 = {
  id: 'k6b7-1',
  title: 'Kecepatan',
  hook: 'Kecepatan adalah jarak yang ditempuh dalam satu satuan waktu. Kecepatan = jarak : waktu, misalnya km/jam.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah mobil menempuh 180 km dalam 3 jam. Berapa kecepatannya?',
          add: [...road(), car(40)],
          ask: {
            options: [
              { t: '60 km/jam', ok: true, why: '180 : 3 = 60. Setiap jam 60 km.' },
              { t: '540 km/jam', why: 'Jarak dibagi waktu, bukan dikali.' },
              { t: '183 km/jam', why: 'Jarak dan waktu tidak dijumlahkan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jarak tiap jam',
      steps: [
        {
          say: 'Setelah 1 jam, mobil sampai di 60 km.',
          clear: true,
          add: [...road(), car(140), T('j', '1 jam', 140, 120, { size: 15, c: 'pos' })],
        },
        {
          say: 'Setelah 3 jam, mobil sampai di 180 km. Setiap jam bertambah 60 km.',
          set: { car: { x: 340 }, j: { x: 340, text: '3 jam' } },
        },
        {
          say: 'Jadi kecepatannya 180 dibagi 3, yaitu 60 kilometer per jam.',
          add: [T('a', 'kecepatan = 180 : 3 = {g:60 km/jam}', 200, 60, { size: 22 })],
        },
      ],
    },
    {
      title: 'Segitiga rumus',
      steps: [
        {
          say: 'Tiga rumus berhubungan: kecepatan sama dengan jarak dibagi waktu.',
          clear: true,
          add: [T('a', 'kecepatan = jarak : waktu', 200, 70, { size: 22, c: 'pos' })],
        },
        {
          say: 'Jarak sama dengan kecepatan kali waktu. Waktu sama dengan jarak dibagi kecepatan.',
          add: [T('b', 'jarak = kecepatan × waktu', 200, 120, { size: 22 }), T('c', 'waktu = jarak : kecepatan', 200, 170, { size: 22 })],
        },
        {
          say: 'Contoh: sepeda 15 km/jam selama 2 jam menempuh 30 km.',
          add: [T('d', '15 × 2 = {g:30 km}', 200, 235, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Jarak 120 km ditempuh dengan kecepatan 40 km/jam. Berapa lama?',
          clear: true,
          add: [T('q', '120 km, 40 km/jam', 200, 110, { size: 30, c: 'pos' })],
          ask: {
            options: [
              { t: '3 jam', ok: true, why: 'Waktu = jarak : kecepatan = 120 : 40 = 3.' },
              { t: '4.800 jam', why: 'Waktu dicari dengan membagi, bukan mengali.' },
              { t: '80 jam', why: '120 − 40 = 80 bukan waktu. Bagi 120 dengan 40.' },
            ],
          },
        },
        {
          say: '120 dibagi 40 sama dengan 3 jam.',
          add: [T('a', '120 : 40 = {g:3 jam}', 200, 180, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Jarak 200 km ditempuh 4 jam. Kecepatan … km/jam', ans: ['50'], wrong: { '800': 'Bagi, jangan kali.' }, steps: ['200 : 4 = 50.'] },
    { type: 'num', q: 'Kecepatan 70 km/jam selama 3 jam. Jarak … km', ans: ['210'], steps: ['70 × 3 = 210.'] },
    { type: 'num', q: 'Jarak 90 km, kecepatan 45 km/jam. Waktu … jam', ans: ['2'], steps: ['90 : 45 = 2.'] },
    { type: 'num', q: 'Berjalan 5 km/jam selama 30 menit. Jarak … km', ans: ['2.5', '2,5', '5/2'], wrong: { '150': '30 menit = 1/2 jam.' }, steps: ['30 menit = 1/2 jam.', '5 × 1/2 = 2,5.'] },
    { type: 'num', q: 'Jarak 150 km, kecepatan 60 km/jam. Waktu … jam', ans: ['2.5', '2,5', '5/2'], wrong: { '90': 'Bagi jarak dengan kecepatan.' }, steps: ['150 : 60 = 2,5 jam.', '= 2 jam 30 menit.'] },
  ],
};

// ---------- 7.2 Debit ----------
const tank = (lvl) => [box('tk', 200, 160, 120, 140, { fill: 'paper', stroke: 'ink', r: 2 }), box('w', 200, 230 - (lvl * 140) / 2, 116, (lvl * 140), { fill: 'pos-soft', stroke: 'pos', sw: 0, r: 0 })];

const l2 = {
  id: 'k6b7-2',
  title: 'Debit',
  hook: 'Debit adalah banyaknya air yang mengalir setiap satuan waktu. Debit = volume : waktu, misalnya liter/menit.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Keran mengisi 60 liter dalam 5 menit. Berapa debitnya?',
          add: tank(0.2),
          ask: {
            options: [
              { t: '12 liter/menit', ok: true, why: '60 : 5 = 12. Setiap menit 12 liter.' },
              { t: '300 liter/menit', why: 'Volume dibagi waktu, bukan dikali.' },
              { t: '55 liter/menit', why: 'Volume dan waktu tidak dikurangkan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Air tiap menit',
      steps: [
        {
          say: 'Setiap menit air bertambah sama banyak. Setelah 5 menit, bak berisi 60 liter.',
          clear: true,
          add: [...tank(0.2), T('t', '0 menit', 330, 80, { size: 16, c: 'mut' })],
        },
        {
          say: 'Air naik sampai 60 liter.',
          set: { w: { h: 0.8 * 140, y: 230 - (0.8 * 140) / 2 }, t: { text: '5 menit · 60 L' } },
        },
        {
          say: 'Debit sama dengan 60 dibagi 5, yaitu 12 liter per menit.',
          add: [T('a', 'debit = 60 : 5 = {g:12 L/menit}', 200, 270, { size: 20 })],
        },
      ],
    },
    {
      title: 'Rumus debit',
      steps: [
        {
          say: 'Seperti kecepatan, debit punya tiga rumus.',
          clear: true,
          add: [T('a', 'debit = volume : waktu', 200, 70, { size: 22, c: 'pos' }), T('b', 'volume = debit × waktu', 200, 120, { size: 22 }), T('c', 'waktu = volume : debit', 200, 170, { size: 22 })],
        },
        {
          say: 'Contoh: debit 8 liter/menit selama 15 menit, volumenya 120 liter.',
          add: [T('d', '8 × 15 = {g:120 L}', 200, 235, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Bak 200 liter diisi dengan debit 10 liter per menit. Berapa menit sampai penuh?',
          clear: true,
          add: [T('q', '200 L, 10 L/menit', 200, 110, { size: 30, c: 'pos' })],
          ask: {
            options: [
              { t: '20 menit', ok: true, why: 'Waktu = volume : debit = 200 : 10.' },
              { t: '2.000 menit', why: 'Bagi, jangan kali.' },
              { t: '190 menit', why: 'Bagi 200 dengan 10.' },
            ],
          },
        },
        {
          say: '200 dibagi 10 sama dengan 20 menit.',
          add: [T('a', '200 : 10 = {g:20 menit}', 200, 180, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '90 liter dalam 6 menit. Debit … L/menit', ans: ['15'], steps: ['90 : 6 = 15.'] },
    { type: 'num', q: 'Debit 4 L/menit selama 25 menit. Volume … L', ans: ['100'], steps: ['4 × 25 = 100.'] },
    { type: 'num', q: 'Bak 150 L, debit 5 L/menit. Waktu … menit', ans: ['30'], steps: ['150 : 5 = 30.'] },
    { type: 'num', q: 'Debit 2 L/detik. Dalam 1 menit … L', ans: ['120'], wrong: { '2': '1 menit = 60 detik.' }, steps: ['60 detik × 2 = 120.'] },
    { type: 'num', q: '3.000 cm³ air mengalir dalam 2 menit. Debit … L/menit', ans: ['1.5', '1,5', '3/2'], wrong: { '1500': 'Ubah ke liter: 3.000 cm³ = 3 L.' }, steps: ['3.000 cm³ = 3 L.', '3 : 2 = 1,5.'] },
  ],
};

export default {
  id: 'k6b7',
  no: 7,
  title: 'Kecepatan dan Debit',
  desc: 'Besaran turunan dalam kehidupan sehari-hari: kecepatan sebagai jarak per waktu dan debit sebagai volume per waktu, beserta rumus jarak, volume, dan waktu.',
  lessons: [l1, l2],
  extra: [
    { type: 'num', q: '240 km dalam 4 jam. Kecepatan … km/jam', ans: ['60'], steps: ['240 : 4 = 60.'] },
    { type: 'num', q: 'Kecepatan 12 km/jam selama 1,5 jam. Jarak … km', ans: ['18'], steps: ['12 × 1,5 = 18.'] },
    { type: 'num', q: 'Debit 6 L/menit, volume 48 L. Waktu … menit', ans: ['8'], steps: ['48 : 6 = 8.'] },
  ],
};
