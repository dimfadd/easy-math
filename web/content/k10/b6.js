// Kelas 10 · Bab 6: Fungsi Kuadrat (lanjutan dari kelas 9)
import { T, dot } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag, curve } from './kit.js';

const sq = (x) => x * x;

// ---------- 6.1 Bentuk puncak dan pergeseran ----------
const C1 = { x: 50, y: 25, w: 300, h: 230, xmin: -4, xmax: 5, ymin: -5, ymax: 7 };
const P1 = plane('pl', C1);
const ux = P1.X(1) - P1.X(0);
const uy = P1.Y(0) - P1.Y(1);
// Parabola dasar y = x² (dibatasi y ≤ 5.5 supaya tetap di bidang setelah digeser)
const base = (id, o = {}) => curve(id, P1, sq, { ...C1, ymax: 5.5 }, o);

const l1 = {
  id: 'k10b6-1',
  title: 'Bentuk Puncak dan Pergeseran',
  hook: 'Setiap parabola y = (x − p)² + q adalah parabola y = x² yang digeser. Titik puncaknya langsung terbaca: (p, q).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Grafik y sama dengan x dikurangi 3, dikuadratkan, adalah grafik y sama dengan x kuadrat yang digeser. Ke mana?',
          add: [T('q', 'y = (x − 3)²', 200, 140, { size: 44 })],
          ask: {
            options: [
              { t: '3 satuan ke kanan', ok: true, why: 'Puncaknya di x = 3, karena (3 − 3)² = 0.' },
              { t: '3 satuan ke kiri', why: 'Tanda minus terasa seperti ke kiri, tetapi puncaknya di x = 3, yaitu di kanan.' },
              { t: '3 satuan ke bawah', why: 'Pengurangan ada di dalam kurung, jadi menggeser mendatar.' },
              { t: 'tidak bergeser, hanya melebar', why: 'Lebar parabola diatur oleh a. Di sini a = 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Geser mendatar',
      steps: [
        {
          say: 'Ini parabola y sama dengan x kuadrat, puncaknya di 0 koma 0.',
          clear: true,
          add: [...P1.els, base('p0', { stroke: 'mut', sw: 2, dash: '6 5' }), base('p'), dot('v', ...P1.at(0, 0), 'acc'), tag('e', 'y = x²', 300, 45, 'pos', 16)],
        },
        {
          say: 'Geser 2 satuan ke kanan. Persamaannya menjadi y sama dengan x dikurangi 2, dikuadratkan. Puncaknya pindah ke 2 koma 0.',
          set: { p: { x: 2 * ux }, v: { x: P1.X(2) }, e: tag('e', 'y = (x − 2)²', 300, 45, 'pos', 16) },
        },
        {
          say: 'Kenapa dikurangi? Karena nilai x sama dengan 2 yang sekarang membuat isi kurung bernilai 0, sama seperti x sama dengan 0 dulu.',
          add: [tag('w', 'x = 2 → (2 − 2)² = 0', 300, 78, 'ink', 14)],
        },
      ],
    },
    {
      title: 'Geser tegak',
      steps: [
        {
          say: 'Sekarang naikkan 1 satuan. Tambahkan 1 di luar kurung: y sama dengan x dikurangi 2 dikuadratkan, tambah 1. Puncaknya 2 koma 1.',
          del: ['w'],
          set: { p: { x: 2 * ux, y: -uy }, v: { y: P1.Y(1) }, e: tag('e', 'y = (x − 2)² + 1', 290, 45, 'pos', 16) },
        },
        {
          say: 'Kalau dikurangi, misalnya y sama dengan x dikurangi 2 dikuadratkan, dikurangi 3, parabolanya turun dan puncaknya 2 koma minus 3.',
          del: ['p'],
          add: [curve('p3', P1, (x) => sq(x - 2) - 3, C1)],
          set: { v: { y: P1.Y(-3) }, e: tag('e', 'y = (x − 2)² − 3', 290, 45, 'pos', 16) },
          pulse: ['v'],
        },
      ],
    },
    {
      title: 'Bentuk puncak',
      steps: [
        {
          say: 'Bentuk umumnya: y sama dengan a kali x dikurangi p dikuadratkan, tambah q. Titik puncaknya p koma q. Nilai a tetap mengatur arah buka dan lebarnya.',
          clear: true,
          add: [T('f', 'y = a(x − {a:p})² + {p:q}', 200, 90, { size: 36 }), T('v', 'puncak ({a:p}, {p:q})', 200, 150, { size: 26 }), T('s', 'sumbu simetri x = {a:p}', 200, 195, { size: 20, c: 'mut' })],
        },
        {
          say: 'Hati-hati dengan tanda. y sama dengan x tambah 1 dikuadratkan sama dengan x dikurangi minus 1 dikuadratkan. Jadi p sama dengan minus 1.',
          add: [T('h', '(x + 1)² = (x − (−1))²  →  p = −1', 200, 250, { size: 20, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik puncak y sama dengan x tambah 1 dikuadratkan, dikurangi 4, adalah …',
          clear: true,
          add: [T('q', 'y = (x + 1)² − 4', 200, 120, { size: 36 })],
          ask: {
            options: [
              { t: '(−1, −4)', ok: true, why: 'x + 1 = x − (−1), jadi p = −1. q = −4.' },
              { t: '(1, −4)', why: 'x + 1 = 0 saat x = −1, jadi puncaknya di x = −1.' },
              { t: '(−1, 4)', why: 'Di luar kurung ada − 4, jadi q = −4.' },
              { t: '(4, 1)', why: 'Urutannya (p, q) dengan p dari dalam kurung.' },
            ],
          },
        },
        {
          say: 'x tambah 1 bernilai 0 saat x sama dengan minus 1. Bagian luar kurung minus 4. Jadi puncaknya minus 1 koma minus 4.',
          clear: true,
          add: [...P1.els, base('p', { z: 0 }), tag('e', 'y = (x + 1)² − 4', 290, 45, 'pos', 16)],
        },
        {
          say: 'Geser y sama dengan x kuadrat 1 satuan ke kiri dulu.',
          set: { p: { x: -ux } },
        },
        {
          say: 'Lalu 4 ke bawah. Puncaknya minus 1 koma minus 4.',
          del: ['p'],
          add: [curve('p2', P1, (x) => sq(x + 1) - 4, C1), dot('v', ...P1.at(-1, -4), 'acc', { r: 8 }), tag('vt', '(−1, −4)', ...P1.at(1.4, -4.2), 'acc', 14)],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Titik puncak grafik y = (x − 4)² + 1 adalah …',
      options: [
        { t: '(4, 1)', ok: true },
        { t: '(−4, 1)', why: '(x − 4) bernilai 0 saat x = 4.' },
        { t: '(1, 4)', why: 'Urutannya (p, q): p = 4, q = 1.' },
        { t: '(4, −1)', why: 'Di luar kurung + 1, jadi q = 1.' },
      ],
      steps: ['Bentuk a(x − p)² + q dengan p = 4, q = 1.', 'Puncak (4, 1).'],
    },
    {
      q: 'Grafik y = x² digeser 2 satuan ke kiri dan 3 satuan ke bawah. Persamaannya menjadi …',
      options: [
        { t: 'y = (x + 2)² − 3', ok: true },
        { t: 'y = (x − 2)² − 3', why: 'Ke kiri berarti puncak di x = −2, jadi (x + 2).' },
        { t: 'y = (x + 2)² + 3', why: 'Ke bawah berarti dikurangi 3.' },
        { t: 'y = (x − 3)² + 2', why: 'Geser mendatar di dalam kurung, geser tegak di luar.' },
      ],
      steps: ['Puncak pindah ke (−2, −3).', 'y = (x − (−2))² + (−3) = (x + 2)² − 3.'],
    },
    {
      type: 'num',
      q: 'Nilai minimum fungsi y = 2(x − 1)² + 5 adalah …',
      ans: ['5'],
      wrong: { '1': '1 adalah nilai x saat minimum. Nilai minimumnya q = 5.', '7': '(x − 1)² terkecil 0, jadi y terkecil 2 × 0 + 5 = 5.' },
      steps: ['(x − 1)² ≥ 0, paling kecil 0 saat x = 1.', 'y minimum = 0 + 5 = 5.'],
    },
    {
      type: 'num',
      q: 'Persamaan sumbu simetri grafik y = −(x + 3)² + 2 adalah x = …',
      ans: ['-3'],
      wrong: { '3': '(x + 3) bernilai 0 saat x = −3.', '2': '2 adalah nilai maksimum, bukan sumbu simetri.' },
      steps: ['x + 3 = x − (−3), jadi p = −3.', 'Sumbu simetri x = −3.'],
    },
    {
      q: 'Fungsi y = −(x − 1)² + 4 memiliki …',
      options: [
        { t: 'nilai maksimum 4', ok: true },
        { t: 'nilai minimum 4', why: 'a = −1 negatif, parabola terbuka ke bawah, jadi puncaknya titik tertinggi.' },
        { t: 'nilai maksimum 1', why: '1 adalah nilai x di puncak. Nilai maksimumnya 4.' },
        { t: 'nilai minimum −4', why: 'Parabola terbuka ke bawah tidak punya nilai minimum.' },
      ],
      steps: ['a = −1 < 0 → terbuka ke bawah.', 'Puncak (1, 4) → maksimum 4.'],
    },
  ],
};

// ---------- 6.2 Melengkapkan kuadrat ----------
const U = 18;
const L = U * 3.2;
const X0 = 110;
const Y0 = 120;
const tile = (id, kind, x, y, o = {}) => ({ id, t: 'tile', kind, u: U, x, y, ...o });
const right = (i) => [X0 + L / 2 + U / 2 + i * U, Y0];
const below = (i) => [X0, Y0 + L / 2 + U / 2 + i * U];
const corner = (i, j) => [X0 + L / 2 + U / 2 + i * U, Y0 + L / 2 + U / 2 + j * U];

const l2 = {
  id: 'k10b6-2',
  title: 'Melengkapkan Kuadrat Sempurna',
  hook: 'Bentuk x² + bx + c bisa diubah menjadi bentuk puncak dengan "melengkapkan" ubin menjadi persegi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'x kuadrat tambah 4x tambah berapa supaya menjadi bentuk kuadrat sempurna, seperti x tambah 2 dikuadratkan?',
          add: [T('q', 'x² + 4x + ? = (x + 2)²', 200, 140, { size: 34 })],
          ask: {
            options: [
              { t: '4', ok: true, why: '(x + 2)² = x² + 4x + 4.' },
              { t: '2', why: '(x + 2)² = (x + 2)(x + 2) = x² + 2x + 2x + 4.' },
              { t: '16', why: 'Yang ditambahkan adalah (4 ÷ 2)² = 4, bukan 4².' },
              { t: '8', why: 'Coba kalikan (x + 2)(x + 2).' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ubin menjadi persegi',
      steps: [
        {
          say: 'Pakai ubin aljabar: satu ubin x kuadrat dan empat ubin x.',
          clear: true,
          add: [tile('X', 'x2', X0, Y0), ...[0, 1, 2, 3].map((i) => tile(`x${i}`, 'x', 270, 70 + i * 26)), T('e', 'x² + 4x', 300, 210, { size: 24 })],
        },
        {
          say: 'Bagi ubin x menjadi dua kelompok: dua di kanan, dua di bawah.',
          set: {
            x0: { x: right(0)[0], y: right(0)[1], vert: true },
            x1: { x: right(1)[0], y: right(1)[1], vert: true },
            x2: { x: below(0)[0], y: below(0)[1] },
            x3: { x: below(1)[0], y: below(1)[1] },
          },
        },
        {
          say: 'Hampir persegi. Pojok kanan bawah kosong. Perlu 2 kali 2, yaitu 4 ubin satuan.',
          add: [[0, 1].flatMap((i) => [0, 1].map((j) => tile(`u${i}${j}`, '1', ...corner(i, j), { o: 0.35 })))],
        },
        {
          say: 'Tambahkan 4 ubin satuan itu. Sekarang persegi utuh dengan sisi x tambah 2. Jadi x kuadrat tambah 4x tambah 4 sama dengan x tambah 2 dikuadratkan.',
          set: { u00: { o: 1 }, u01: { o: 1 }, u10: { o: 1 }, u11: { o: 1 } },
          add: [T('s1', 'sisi = x + 2', X0 + 18, 30, { size: 16, c: 'mut' }), T('e2', 'x² + 4x + 4 = (x + 2)²', 280, 245, { size: 18, c: 'ok' })],
        },
        {
          say: 'Karena kita menambah 4, maka untuk menjaga nilainya harus dikurangi 4 lagi: x kuadrat tambah 4x sama dengan x tambah 2 dikuadratkan dikurangi 4.',
          set: { e: { text: 'x² + 4x = (x + 2)² − 4' , size: 18, x: 280 } },
        },
      ],
    },
    {
      title: 'Aturan cepat',
      steps: [
        {
          say: 'Aturannya: separuh koefisien x, lalu kuadratkan. Untuk 4x, separuhnya 2, kuadratnya 4.',
          clear: true,
          add: [T('r', 'x² + bx = (x + b/2)² − (b/2)²', 200, 60, { size: 26, c: 'pos' })],
        },
        {
          say: 'Contoh: y sama dengan x kuadrat tambah 4x tambah 1. Ganti x kuadrat tambah 4x dengan x tambah 2 dikuadratkan dikurangi 4.',
          add: [T('a', 'y = x² + 4x + 1', 200, 120, { size: 24 }), T('b', '= (x + 2)² − 4 + 1', 200, 160, { size: 24 })],
        },
        {
          say: 'Hasilnya x tambah 2 dikuadratkan dikurangi 3. Puncaknya minus 2 koma minus 3.',
          add: [T('c', '= (x + 2)² − 3', 200, 200, { size: 24 }), T('d', 'puncak (−2, −3)', 200, 250, { size: 24, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ubah x kuadrat dikurangi 6x tambah 5 menjadi bentuk puncak.',
          clear: true,
          add: [T('q', 'x² − 6x + 5 = ?', 200, 110, { size: 36 })],
          ask: {
            options: [
              { t: '(x − 3)² − 4', ok: true, why: 'Separuh dari −6 adalah −3, kuadratnya 9. 5 − 9 = −4.' },
              { t: '(x − 3)² + 5', why: 'Menambah 9 harus diimbangi dengan mengurangi 9: 5 − 9 = −4.' },
              { t: '(x − 6)² + 5', why: 'Yang dipakai separuh koefisien x: −6 ÷ 2 = −3.' },
              { t: '(x + 3)² − 4', why: 'Koefisien x negatif, jadi (x − 3).' },
            ],
          },
        },
        {
          say: 'Separuh dari minus 6 adalah minus 3. Kuadratnya 9. Jadi x dikurangi 3 dikuadratkan, dikurangi 9, tambah 5, sama dengan x dikurangi 3 dikuadratkan dikurangi 4.',
          add: [T('a', '= (x − 3)² − 9 + 5', 200, 170, { size: 26 }), T('b', '= {g:(x − 3)² − 4}', 200, 220, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bentuk x² + 8x + 16 sama dengan …',
      options: [
        { t: '(x + 4)²', ok: true },
        { t: '(x + 8)²', why: '(x + 8)² = x² + 16x + 64.' },
        { t: '(x + 16)²', why: 'Separuh dari 8 adalah 4, dan 4² = 16.' },
        { t: '(x − 4)²', why: 'Koefisien x positif, jadi (x + 4).' },
      ],
      steps: ['Separuh dari 8 adalah 4, 4² = 16.', 'x² + 8x + 16 = (x + 4)².'],
    },
    {
      type: 'num',
      q: 'Agar x² − 10x + c menjadi kuadrat sempurna, nilai c adalah …',
      ans: ['25'],
      wrong: { '100': 'Separuh koefisien x dulu: −10 ÷ 2 = −5, lalu (−5)² = 25.', '-25': 'Hasil kuadrat selalu positif.' },
      steps: ['Separuh dari −10 adalah −5.', 'c = (−5)² = 25.'],
    },
    {
      type: 'num',
      q: 'Jika x² + 6x + 2 = (x + 3)² + q, nilai q adalah …',
      ans: ['-7'],
      wrong: { '11': '(x + 3)² = x² + 6x + 9. Agar sama, q = 2 − 9.', '2': 'Kurangi dengan 9 yang ditambahkan: 2 − 9 = −7.' },
      steps: ['(x + 3)² = x² + 6x + 9.', 'q = 2 − 9 = −7.'],
    },
    {
      q: 'Titik puncak y = x² − 4x + 7 adalah …',
      options: [
        { t: '(2, 3)', ok: true },
        { t: '(−2, 3)', why: '(x − 2)² bernilai 0 saat x = 2.' },
        { t: '(2, 7)', why: 'x² − 4x + 7 = (x − 2)² − 4 + 7 = (x − 2)² + 3.' },
        { t: '(4, 7)', why: 'Gunakan separuh koefisien x: −4 ÷ 2 = −2.' },
      ],
      steps: ['x² − 4x + 7 = (x − 2)² − 4 + 7.', '= (x − 2)² + 3 → puncak (2, 3).'],
    },
    {
      type: 'num',
      q: 'Nilai minimum fungsi y = x² + 2x − 8 adalah …',
      ans: ['-9'],
      wrong: { '-8': 'x² + 2x − 8 = (x + 1)² − 1 − 8 = (x + 1)² − 9.', '-1': '−1 adalah nilai x di puncak.' },
      steps: ['y = (x + 1)² − 1 − 8 = (x + 1)² − 9.', 'Minimum −9 saat x = −1.'],
    },
  ],
};

// ---------- 6.3 Menyusun fungsi kuadrat ----------
const C3 = { x: 50, y: 25, w: 300, h: 230, xmin: -1, xmax: 6, ymin: -5, ymax: 6 };
const P3 = plane('pl', C3);
const C4 = { x: 50, y: 25, w: 300, h: 230, xmin: -1, xmax: 5, ymin: -2, ymax: 6 };
const P4 = plane('pl', C4);

const l3 = {
  id: 'k10b6-3',
  title: 'Menyusun Fungsi Kuadrat',
  hook: 'Dari beberapa titik yang diketahui, rumus parabolanya bisa disusun kembali.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah parabola memotong sumbu x di 1 dan 5, dan memotong sumbu y di 5. Rumus mana yang cocok?',
          add: [...P3.els, dot('r1', ...P3.at(1, 0), 'ok'), dot('r2', ...P3.at(5, 0), 'ok'), dot('c', ...P3.at(0, 5), 'acc')],
          ask: {
            options: [
              { t: 'y = x² − 6x + 5', ok: true, why: '(x − 1)(x − 5) = x² − 6x + 5, dan saat x = 0, y = 5.' },
              { t: 'y = x² + 6x + 5', why: 'Rumus ini nol di x = −1 dan −5, bukan 1 dan 5.' },
              { t: 'y = x² − 5', why: 'Rumus ini nol di x = ±√5.' },
              { t: 'y = 5x² − 6x + 1', why: 'Saat x = 0, rumus ini memberi y = 1, bukan 5.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dari titik potong sumbu x',
      steps: [
        {
          say: 'Kalau parabola memotong sumbu x di x1 dan x2, rumusnya y sama dengan a kali x dikurangi x1, kali x dikurangi x2. Di sini: a kali x dikurangi 1, kali x dikurangi 5.',
          add: [tag('f', 'y = a(x − 1)(x − 5)', 260, 40, 'pos', 16)],
        },
        {
          say: 'Nilai a dicari dari titik lain. Masukkan titik 0 koma 5: 5 sama dengan a kali minus 1 kali minus 5, yaitu 5a. Jadi a sama dengan 1.',
          add: [tag('g', '5 = a(−1)(−5) = 5a → a = 1', 230, 72, 'ink', 14)],
          pulse: ['c'],
        },
        {
          say: 'Rumusnya y sama dengan x dikurangi 1, kali x dikurangi 5, yaitu x kuadrat dikurangi 6x tambah 5.',
          add: [curve('p', P3, (x) => (x - 1) * (x - 5), C3, { z: -1 }), tag('h', 'y = x² − 6x + 5', 260, 104, 'ok', 15)],
        },
      ],
    },
    {
      title: 'Dari titik puncak',
      steps: [
        {
          say: 'Sekarang yang diketahui titik puncaknya, 2 koma 4, dan grafik melalui 0 koma 0. Pakai bentuk puncak: y sama dengan a kali x dikurangi 2 dikuadratkan, tambah 4.',
          clear: true,
          add: [...P4.els, dot('v', ...P4.at(2, 4), 'acc', { r: 8 }), dot('o', ...P4.at(0, 0), 'ok'), tag('f', 'y = a(x − 2)² + 4', 290, 35, 'pos', 15)],
        },
        {
          say: 'Masukkan 0 koma 0: 0 sama dengan 4a tambah 4. Jadi a sama dengan minus 1.',
          add: [tag('g', '0 = 4a + 4 → a = −1', 290, 58, 'ink', 14)],
          pulse: ['o'],
        },
        {
          say: 'Rumusnya y sama dengan minus, x dikurangi 2 dikuadratkan, tambah 4. a negatif, jadi terbuka ke bawah.',
          add: [curve('p', P4, (x) => -sq(x - 2) + 4, C4, { z: -1, stroke: 'neg' })],
          set: { f: tag('f', 'y = −(x − 2)² + 4', 290, 35, 'neg', 15) },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Parabola memotong sumbu x di minus 1 dan 3, dan melalui titik 0 koma minus 3. Berapa nilai a?',
          clear: true,
          add: [T('q', 'y = a(x + 1)(x − 3)', 200, 90, { size: 30 }), T('q2', 'melalui (0, −3)', 200, 140, { size: 22, c: 'mut' }), T('q3', 'a = ?', 200, 195, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '1', ok: true, why: '−3 = a(1)(−3) = −3a → a = 1.' },
              { t: '−1', why: 'a(0 + 1)(0 − 3) = −3a. −3a = −3 → a = 1.' },
              { t: '3', why: '−3a = −3, jadi a = 1.' },
              { t: '−3', why: '−3 adalah nilai y, bukan a.' },
            ],
          },
        },
        {
          say: 'Masukkan x sama dengan 0: a kali 1 kali minus 3 sama dengan minus 3a. Ini harus sama dengan minus 3, jadi a sama dengan 1.',
          set: { q3: { text: 'a(1)(−3) = −3 → a = {g:1}', size: 24 } },
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Fungsi kuadrat yang grafiknya memotong sumbu x di −1 dan 3 serta melalui (0, −3) adalah …',
      options: [
        { t: 'y = x² − 2x − 3', ok: true },
        { t: 'y = x² + 2x − 3', why: 'Rumus ini nol di x = 1 dan −3.' },
        { t: 'y = −x² + 2x + 3', why: 'Saat x = 0 rumus ini memberi 3, bukan −3.' },
        { t: 'y = x² − 3', why: 'Rumus ini nol di x = ±√3.' },
      ],
      steps: ['y = a(x + 1)(x − 3). Dari (0, −3): −3a = −3 → a = 1.', 'y = (x + 1)(x − 3) = x² − 2x − 3.'],
    },
    {
      q: 'Fungsi kuadrat dengan titik puncak (0, 4) yang melalui (2, 0) adalah …',
      options: [
        { t: 'y = −x² + 4', ok: true },
        { t: 'y = x² + 4', why: 'Saat x = 2, rumus ini memberi 8, bukan 0.' },
        { t: 'y = −(x − 2)² + 4', why: 'Puncak rumus ini di (2, 4), bukan (0, 4).' },
        { t: 'y = x² − 4', why: 'Puncak rumus ini di (0, −4).' },
      ],
      steps: ['y = a x² + 4. Dari (2, 0): 4a + 4 = 0 → a = −1.', 'y = −x² + 4.'],
    },
    {
      type: 'num',
      q: 'Parabola y = a(x − 2)(x − 6) melalui titik (4, −8). Nilai a adalah …',
      ans: ['2'],
      wrong: { '-2': 'a(2)(−2) = −4a = −8 → a = 2.', '-8': '−8 adalah nilai y.' },
      steps: ['−8 = a(4 − 2)(4 − 6) = −4a.', 'a = 2.'],
    },
    {
      type: 'num',
      q: 'Parabola dengan titik puncak (3, 5) melalui (1, −3). Nilai a pada y = a(x − 3)² + 5 adalah …',
      ans: ['-2'],
      wrong: { '2': '−3 = 4a + 5 → 4a = −8 → a = −2.', '-8': 'Bagi dengan 4: a = −2.' },
      steps: ['−3 = a(1 − 3)² + 5 = 4a + 5.', '4a = −8 → a = −2.'],
    },
    {
      type: 'num',
      q: 'Fungsi f(x) = a(x − 1)(x − 4) melalui (0, 8). Nilai f(5) adalah …',
      ans: ['8'],
      wrong: { '4': 'Cari a dulu: 4a = 8 → a = 2. f(5) = 2 × 4 × 1.', '2': '2 adalah nilai a.' },
      steps: ['f(0) = a(−1)(−4) = 4a = 8 → a = 2.', 'f(5) = 2 × 4 × 1 = 8.'],
    },
  ],
};

// ---------- 6.4 Masalah nilai maksimum ----------
const K = 4;
const WALL = 50;
const pen = (x) => {
  const w = (40 - 2 * x) * K;
  const h = x * K;
  return { id: 'pen', t: 'rect', x: 110, y: WALL + h / 2, w, h, r: 0, fill: 'ok', stroke: 'ink', sw: 2.5 };
};
const C5 = { x: 235, y: 45, w: 140, h: 190, xmin: 0, xmax: 20, ymin: 0, ymax: 200 };
const P5 = plane('gp', { ...C5, step: 5, every: 10, ystep: 50, yevery: 100, xl: 'x', yl: 'L' });
const area = (x) => x * (40 - 2 * x);
const readout = (x) => T('ro', `x = ${x} m → L = ${area(x)} m²`, 110, 275, { size: 16 });

const l4 = {
  id: 'k10b6-4',
  title: 'Masalah Nilai Maksimum',
  hook: 'Kandang terluas dari pagar yang terbatas ada di puncak sebuah parabola.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pak Budi punya pagar 40 meter untuk kandang persegi panjang yang menempel ke tembok. Pagar hanya untuk tiga sisi. Kandang terluas berapa?',
          add: [{ id: 'wall', t: 'rect', x: 110, y: WALL - 6, w: 200, h: 12, r: 0, fill: 'mut-soft', stroke: 'ink', sw: 1.5 }, T('wl', 'tembok', 110, 25, { size: 14, c: 'mut' }), pen(10), T('q', 'pagar 40 m (3 sisi)', 110, 150, { size: 16 })],
          ask: {
            options: [
              { t: '200 m²', ok: true, why: 'Lebar 10 m dan panjang 20 m: 10 × 20 = 200 m².' },
              { t: '100 m²', why: 'Itu persegi 10 × 10, tetapi pagarnya hanya terpakai 30 m.' },
              { t: '400 m²', why: 'Sisi yang menempel tembok tidak dipagari, tetapi pagar total tetap 40 m.' },
              { t: '133 m²', why: 'Bentuk terluas bukan persegi, karena satu sisi sudah ditutup tembok.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mencoba beberapa ukuran',
      steps: [
        {
          say: 'Misalkan lebar sisi yang tegak lurus tembok x meter. Dua sisi lebar memakai 2x, sisa pagar untuk panjang: 40 dikurangi 2x.',
          clear: true,
          keep: ['wall', 'wl'],
          add: [pen(5), T('lx', 'x', 110 - (40 - 10) * K / 2 - 12, WALL + 10, { size: 15, c: 'acc' }), ...P5.els, curve('cv', P5, area, C5, { stroke: 'mut', sw: 2, dash: '5 4' }), dot('pt', ...P5.at(5, area(5)), 'neg'), readout(5)],
        },
        {
          say: 'Lebar 5 meter: panjangnya 30 meter, luasnya 150 meter persegi.',
          pulse: ['pt'],
        },
        {
          say: 'Lebar 15 meter: panjangnya tinggal 10 meter. Luasnya juga 150. Terlalu lebar ternyata tidak lebih baik.',
          set: { pen: pen(15), pt: { x: P5.X(15), y: P5.Y(area(15)) }, ro: { text: readout(15).text }, lx: { x: 110 - (40 - 30) * K / 2 - 12 } },
        },
        {
          say: 'Lebar 10 meter: panjangnya 20 meter, luasnya 200 meter persegi. Ini titik tertinggi grafik.',
          set: { pen: pen(10), pt: { x: P5.X(10), y: P5.Y(area(10)) }, ro: { text: readout(10).text }, lx: { x: 110 - (40 - 20) * K / 2 - 12 } },
          pulse: ['pt'],
        },
      ],
    },
    {
      title: 'Dihitung dengan rumus',
      steps: [
        {
          say: 'Luasnya L sama dengan x kali 40 dikurangi 2x, yaitu minus 2x kuadrat tambah 40x. Ini fungsi kuadrat yang terbuka ke bawah.',
          clear: true,
          add: [T('a', 'L = x(40 − 2x) = −2x² + 40x', 200, 70, { size: 24 })],
        },
        {
          say: 'Puncaknya di x sama dengan minus b dibagi 2a: minus 40 dibagi minus 4, yaitu 10.',
          add: [T('b', 'x = −40 ÷ (2 × (−2)) = 10', 200, 130, { size: 22 })],
        },
        {
          say: 'Luas maksimumnya L dari 10: 10 kali 20, sama dengan 200 meter persegi.',
          add: [T('c', 'L maks = 10 × 20 = {g:200 m²}', 200, 190, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kawat 24 meter dibentuk menjadi persegi panjang, keempat sisinya dari kawat. Luas terbesarnya berapa?',
          clear: true,
          add: [T('q', 'keliling 24 m, luas terbesar = ?', 200, 120, { size: 24 })],
          ask: {
            options: [
              { t: '36 m²', ok: true, why: 'p + l = 12. L = x(12 − x) terbesar di x = 6: 6 × 6 = 36.' },
              { t: '144 m²', why: 'Itu 12 × 12. Panjang + lebar hanya 12.' },
              { t: '35 m²', why: '5 × 7 = 35, tetapi 6 × 6 = 36 lebih besar.' },
              { t: '24 m²', why: 'Keliling dan luas berbeda. Coba 6 × 6.' },
            ],
          },
        },
        {
          say: 'Panjang tambah lebar sama dengan 12. Luasnya x kali 12 dikurangi x, terbesar saat x sama dengan 6. Jadi persegi 6 kali 6, luasnya 36.',
          add: [T('a', 'L = x(12 − x), puncak x = 6', 200, 180, { size: 22 }), T('b', 'L maks = 6 × 6 = {g:36 m²}', 200, 225, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Dua bilangan jumlahnya 20. Hasil kali terbesar kedua bilangan itu adalah …',
      ans: ['100'],
      wrong: { '99': '9 × 11 = 99, tetapi 10 × 10 = 100 lebih besar.', '20': 'Hasil kali x(20 − x) terbesar di x = 10.' },
      steps: ['P = x(20 − x) = −x² + 20x.', 'Puncak x = 10 → P = 100.'],
    },
    {
      type: 'num',
      q: 'Pagar 60 m dipakai untuk tiga sisi kandang persegi panjang (sisi keempat tembok). Luas terbesar kandang adalah … m²',
      ans: ['450'],
      wrong: { '225': 'Itu persegi 15 × 15. Lebar 15, panjang 60 − 30 = 30: luas 450.', '900': 'Pagar untuk tiga sisi: x + x + panjang = 60.' },
      steps: ['L = x(60 − 2x) = −2x² + 60x.', 'x = 15 → L = 15 × 30 = 450 m².'],
    },
    {
      type: 'num',
      q: 'Tinggi bola h(t) = 30t − 5t² meter. Tinggi maksimum bola adalah … m',
      ans: ['45'],
      wrong: { '3': '3 detik adalah waktunya. h(3) = 90 − 45.', '90': 'h(3) = 30 × 3 − 5 × 9 = 45.' },
      steps: ['t = −30 ÷ (−10) = 3.', 'h(3) = 90 − 45 = 45 m.'],
    },
    {
      type: 'num',
      q: 'Pendapatan toko R = x(100 − x) ribu rupiah, dengan x banyak barang terjual. Pendapatan terbesar adalah … ribu rupiah',
      ans: ['2500'],
      wrong: { '50': '50 adalah banyak barang. R(50) = 50 × 50.', '10000': 'R maksimum di x = 50, bukan 100.' },
      steps: ['R = −x² + 100x, puncak x = 50.', 'R = 50 × 50 = 2.500 ribu rupiah.'],
    },
    {
      type: 'num',
      q: 'Persegi panjang dengan keliling 36 cm memiliki luas terbesar … cm²',
      ans: ['81'],
      wrong: { '80': '8 × 10 = 80, tetapi 9 × 9 = 81 lebih besar.', '324': 'p + l = 18, bukan 36.' },
      steps: ['p + l = 18 → L = x(18 − x).', 'x = 9 → L = 81 cm².'],
    },
  ],
};

export default {
  id: 'k10b6',
  no: 6,
  title: 'Fungsi Kuadrat',
  desc: 'Bentuk puncak dan pergeseran grafik, melengkapkan kuadrat sempurna, menyusun fungsi kuadrat, dan masalah nilai maksimum.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: 'Titik puncak grafik y = 2x² − 8x + 3 adalah …',
      options: [
        { t: '(2, −5)', ok: true },
        { t: '(2, 3)', why: 'y(2) = 8 − 16 + 3 = −5.' },
        { t: '(−2, −5)', why: 'x = −b ÷ 2a = 8 ÷ 4 = 2.' },
        { t: '(4, 3)', why: 'x puncak = 8 ÷ (2 × 2) = 2.' },
      ],
      steps: ['x = −(−8) ÷ (2 × 2) = 2.', 'y = 8 − 16 + 3 = −5.'],
    },
    {
      q: 'Fungsi kuadrat dengan puncak (−1, 2) dan a = 3 adalah …',
      options: [
        { t: 'y = 3(x + 1)² + 2', ok: true },
        { t: 'y = 3(x − 1)² + 2', why: 'Puncak di x = −1 berarti (x + 1).' },
        { t: 'y = 3(x + 1)² − 2', why: 'q = 2, jadi + 2.' },
        { t: 'y = (x + 3)² + 2', why: 'a = 3 adalah pengali di depan kurung.' },
      ],
      steps: ['y = a(x − p)² + q dengan a = 3, p = −1, q = 2.', 'y = 3(x + 1)² + 2.'],
    },
    {
      type: 'num',
      q: 'Dua bilangan jumlahnya 10. Hasil kali terbesarnya adalah …',
      ans: ['25'],
      wrong: { '24': '4 × 6 = 24, tetapi 5 × 5 = 25.', '100': 'Hasil kalinya x(10 − x).' },
      steps: ['P = x(10 − x).', 'x = 5 → P = 25.'],
    },
  ],
};
