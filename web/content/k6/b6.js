// Kelas 6 · Bab 6: Perbesaran, Perkecilan, dan Skala
import { T, ln } from '../helpers.js';
import { grid } from './kit.js';

// Bentuk L pada petak: daftar sel [kolom, baris]
const L_CELLS = [[0, 0], [0, 1], [0, 2], [1, 2]];
const shape = (p, cells, x0, y0, s, c) => grid(p, x0, y0, s, 3, 2, (r, cc) => (cells.some(([a, b]) => a === cc && b === r) ? c : 'paper'), { sw: 1 });

// ---------- 6.1 Perbesaran dan perkecilan ----------
const l1 = {
  id: 'k6b6-1',
  title: 'Perbesaran dan Perkecilan',
  hook: 'Gambar yang diperbesar 2 kali memiliki setiap sisi 2 kali lebih panjang, dan bentuknya tetap sama. Besar sudutnya juga tidak berubah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Persegi panjang 3 cm kali 2 cm diperbesar 2 kali. Berapa ukurannya sekarang?',
          add: [{ id: 'a', t: 'rect', x: 110, y: 130, w: 60, h: 40, r: 0, fill: 'pos-soft', stroke: 'pos' }, T('la', '3 × 2', 110, 170, { size: 15 })],
          ask: {
            options: [
              { t: '6 cm × 4 cm', ok: true, why: 'Setiap sisi dikali 2: 3 × 2 = 6 dan 2 × 2 = 4.' },
              { t: '5 cm × 4 cm', why: 'Sisi tidak ditambah 2. Setiap sisi dikali 2.' },
              { t: '6 cm × 2 cm', why: 'Kedua sisi harus diperbesar, bukan hanya satu.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Setiap sisi dikali',
      steps: [
        {
          say: 'Bentuk L ini diperbesar 2 kali. Setiap petak menjadi 2 kali lebih panjang sisinya.',
          clear: true,
          add: [...shape('a', L_CELLS, 40, 90, 22, 'pos'), ...shape('b', L_CELLS, 180, 40, 44, 'ok'), T('x', '× 2', 135, 70, { size: 20, c: 'mut' })],
        },
        {
          say: 'Bentuknya sama, hanya ukurannya berbeda. Tinggi 3 menjadi 6, lebar 2 menjadi 4.',
          add: [T('t', 'tinggi 3 → 6, lebar 2 → 4', 200, 280, { size: 18 })],
        },
        {
          say: 'Perkecilan sebaliknya: setiap sisi dikali bilangan kurang dari 1, misalnya 1/2.',
          add: [T('k', 'perkecilan: × 1/2', 335, 150, { size: 15, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Sudut tetap',
      steps: [
        {
          say: 'Pada perbesaran, panjang sisi berubah, tetapi besar sudut tetap. Sudut siku-siku tetap siku-siku.',
          clear: true,
          add: [
            { id: 's1', t: 'poly', x: 0, y: 0, pts: [[50, 220], [130, 220], [50, 160]], fill: 'pos-soft', stroke: 'pos', sw: 2 },
            { id: 's2', t: 'poly', x: 0, y: 0, pts: [[180, 240], [340, 240], [180, 120]], fill: 'ok-soft', stroke: 'ok', sw: 2 },
            T('a1', '4', 90, 238, { size: 14 }), T('a2', '3', 38, 190, { size: 14 }), T('b1', '8', 260, 258, { size: 14 }), T('b2', '6', 166, 180, { size: 14 }),
            { id: 'r1', t: 'arc', x: 50, y: 220, r: 14, a1: 0, a2: 90, c: 'neg', right: true },
            { id: 'r2', t: 'arc', x: 180, y: 240, r: 14, a1: 0, a2: 90, c: 'neg', right: true },
          ],
        },
        {
          say: 'Sisi 4 dan 3 menjadi 8 dan 6. Semuanya dikali 2.',
          add: [T('m', '× 2', 145, 140, { size: 20, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Foto 4 cm kali 6 cm diperbesar 3 kali. Berapa ukurannya?',
          clear: true,
          add: [T('q', '4 cm × 6 cm, diperbesar 3 kali', 200, 110, { size: 22, c: 'pos' })],
          ask: {
            options: [
              { t: '12 cm × 18 cm', ok: true, why: '4 × 3 = 12, 6 × 3 = 18.' },
              { t: '7 cm × 9 cm', why: 'Sisi dikali 3, bukan ditambah 3.' },
              { t: '12 cm × 6 cm', why: 'Kedua sisi diperbesar.' },
            ],
          },
        },
        {
          say: '4 kali 3 sama dengan 12. 6 kali 3 sama dengan 18. Ukurannya 12 cm kali 18 cm.',
          add: [T('a', '{g:12 cm × 18 cm}', 200, 180, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Sisi 5 cm diperbesar 4 kali menjadi … cm', ans: ['20'], wrong: { '9': 'Dikali, bukan ditambah.' }, steps: ['5 × 4 = 20.'] },
    { type: 'num', q: 'Sisi 12 cm diperkecil 1/3 kali menjadi … cm', ans: ['4'], steps: ['12 × 1/3 = 4.'] },
    { type: 'num', q: 'Sudut 60° pada gambar diperbesar 2 kali. Besar sudutnya menjadi …°', ans: ['60'], wrong: { '120': 'Sudut tidak berubah pada perbesaran.' }, steps: ['Sudut tetap = 60°.'] },
    { type: 'num', q: 'Sisi 3 cm menjadi 15 cm. Diperbesar … kali', ans: ['5'], wrong: { '12': 'Bagi: 15 : 3.' }, steps: ['15 : 3 = 5.'] },
    {
      q: 'Pada perbesaran, yang tidak berubah adalah …',
      options: [
        { t: 'besar sudut', ok: true },
        { t: 'panjang sisi', why: 'Panjang sisi dikali faktor perbesaran.' },
        { t: 'keliling', why: 'Keliling ikut membesar.' },
      ],
      steps: ['Bentuk dan sudut tetap.'],
    },
  ],
};

// ---------- 6.2 Skala ----------
const l2 = {
  id: 'k6b6-2',
  title: 'Skala pada Peta',
  hook: 'Skala 1 : 100.000 artinya 1 cm pada peta sama dengan 100.000 cm, yaitu 1 km, pada jarak sebenarnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pada peta berskala 1 : 100.000, jarak dua kota 5 cm. Berapa jarak sebenarnya?',
          add: [{ id: 'A', t: 'circle', x: 90, y: 140, r: 9, fill: 'neg', stroke: 'ink', sw: 1.5 }, { id: 'B', t: 'circle', x: 310, y: 140, r: 9, fill: 'neg', stroke: 'ink', sw: 1.5 }, ln('d', 90, 140, 310, 140, { sw: 2, dash: '6 5', c: 'ink' }), T('cm', '5 cm', 200, 120, { size: 18 }), T('sk', 'skala 1 : 100.000', 200, 230, { size: 18, c: 'pos' })],
          ask: {
            options: [
              { t: '5 km', ok: true, why: '5 × 100.000 = 500.000 cm = 5 km.' },
              { t: '500 km', why: '500.000 cm sama dengan 5 km, bukan 500 km.' },
              { t: '50 km', why: 'Ubah cm ke km dengan membagi 100.000.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jarak sebenarnya',
      steps: [
        {
          say: 'Skala 1 : 100.000. Jarak pada peta dikali 100.000.',
          clear: true,
          add: [T('a', '5 cm × 100.000 = 500.000 cm', 200, 70, { size: 22 })],
        },
        {
          say: 'Ubah ke kilometer: 1 km sama dengan 100.000 cm. Jadi 500.000 cm sama dengan 5 km.',
          add: [T('b', '500.000 cm = {g:5 km}', 200, 130, { size: 24 })],
        },
        {
          say: 'Rumusnya: jarak sebenarnya sama dengan jarak peta dikali penyebut skala.',
          add: [T('r', 'jarak sebenarnya = jarak peta × penyebut skala', 200, 210, { size: 15, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Jarak pada peta',
      steps: [
        {
          say: 'Sebaliknya: jarak sebenarnya 30 km, skala 1 : 500.000. Berapa cm di peta?',
          clear: true,
          add: [T('a', '30 km = 3.000.000 cm', 200, 70, { size: 22 })],
        },
        {
          say: 'Ubah dulu ke cm, lalu bagi dengan 500.000. Hasilnya 6 cm.',
          add: [T('b', '3.000.000 : 500.000 = {g:6 cm}', 200, 130, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Skala denah 1 : 200. Panjang kamar di denah 2 cm. Berapa meter panjang sebenarnya?',
          clear: true,
          add: [T('q', 'skala 1 : 200, denah 2 cm', 200, 110, { size: 24, c: 'pos' })],
          ask: {
            options: [
              { t: '4 m', ok: true, why: '2 × 200 = 400 cm = 4 m.' },
              { t: '400 m', why: '400 itu dalam cm. 400 cm = 4 m.' },
              { t: '100 m', why: 'Dikali 200, bukan dibagi.' },
            ],
          },
        },
        {
          say: '2 kali 200 sama dengan 400 cm, yaitu 4 meter.',
          add: [T('a', '2 × 200 = 400 cm = {g:4 m}', 200, 180, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: 'Skala 1 : 100.000, jarak peta 8 cm. Jarak sebenarnya … km', ans: ['8'], wrong: { '800000': 'Itu dalam cm. Ubah ke km.' }, steps: ['8 × 100.000 = 800.000 cm.', '= 8 km.'] },
    { type: 'num', q: 'Skala 1 : 250.000, jarak peta 4 cm. Jarak sebenarnya … km', ans: ['10'], steps: ['4 × 250.000 = 1.000.000 cm.', '= 10 km.'] },
    { type: 'num', q: 'Jarak sebenarnya 20 km, skala 1 : 400.000. Jarak peta … cm', ans: ['5'], steps: ['2.000.000 cm : 400.000.', '= 5 cm.'] },
    { type: 'num', q: 'Skala denah 1 : 100. Lebar ruang 5 m. Di denah … cm', ans: ['5'], wrong: { '500': 'Bagi 100: 500 cm : 100.' }, steps: ['5 m = 500 cm.', '500 : 100 = 5 cm.'] },
    { type: 'num', q: 'Jarak peta 3 cm mewakili 15 km. Skalanya 1 : …', ans: ['500000', '500.000'], wrong: { '5': 'Ubah 15 km ke cm dulu.' }, steps: ['15 km = 1.500.000 cm.', '1.500.000 : 3 = 500.000.'] },
  ],
};

export default {
  id: 'k6b6',
  no: 6,
  title: 'Perbesaran, Perkecilan, dan Skala',
  desc: 'Memperbesar dan memperkecil bangun dengan mengalikan setiap sisi, memahami bahwa sudut tetap, serta menghitung jarak dengan skala peta dan denah.',
  lessons: [l1, l2],
  extra: [
    { type: 'num', q: 'Persegi sisi 3 cm diperbesar 2 kali. Luasnya menjadi … cm²', ans: ['36'], wrong: { '18': 'Sisi menjadi 6 cm. Luas = 6 × 6.' }, steps: ['Sisi 6 cm.', '6 × 6 = 36.'] },
    { type: 'num', q: 'Skala 1 : 50.000, jarak peta 6 cm. Jarak sebenarnya … km', ans: ['3'], steps: ['6 × 50.000 = 300.000 cm.', '= 3 km.'] },
    { type: 'num', q: 'Skala 1 : 300, panjang denah 5 cm. Panjang sebenarnya … m', ans: ['15'], steps: ['1.500 cm.', '= 15 m.'] },
  ],
};
