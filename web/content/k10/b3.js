// Kelas 10 · Bab 3: Vektor
import { T, ln, dot } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag, colvec, vec, vecAt } from './kit.js';

const CV = { x: 30, y: 30, w: 240, h: 180, xmin: 0, xmax: 8, ymin: 0, ymax: 6 };
const PV = plane('pl', CV);
const at = PV.at;

// ---------- 3.1 Mengenal vektor ----------
const l1 = {
  id: 'k10b3-1',
  title: 'Mengenal Vektor',
  hook: 'Vektor adalah panah: punya panjang dan punya arah. "3 ke kanan, 4 ke atas" adalah sebuah vektor.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah drone terbang lurus dari A ke B: 3 kotak ke kanan dan 4 kotak ke atas. Berapa kotak jarak terbangnya?',
          add: [...PV.els, dot('A', ...at(1, 1), 'pos'), dot('B', ...at(4, 5), 'neg'), T('Al', 'A', ...at(0.6, 0.6), { size: 16, c: 'pos' }), T('Bl', 'B', ...at(4.4, 5.4), { size: 16, c: 'neg' })],
          ask: {
            options: [
              { t: '5 kotak', ok: true, why: 'Jalur lurusnya adalah sisi miring segitiga 3-4-5.' },
              { t: '7 kotak', why: '3 + 4 = 7 adalah jalan berbelok. Drone terbang lurus, jadi lebih pendek.' },
              { t: '12 kotak', why: 'Itu 3 × 4. Jaraknya dicari dengan Pythagoras.' },
              { t: '4 kotak', why: 'Jalur miring lebih panjang dari 4.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Panah punya arah dan panjang',
      steps: [
        {
          say: 'Gambar panah dari A ke B. Panah ini adalah vektor AB. Vektor punya panjang dan arah.',
          add: [vec('ab', PV, 1, 1, 4, 5)],
        },
        {
          say: 'Uraikan perjalanannya: 3 kotak ke kanan, lalu 4 kotak ke atas.',
          add: [ln('cx', ...at(1, 1), ...at(4, 1), { sw: 2.5, dash: '6 4', c: 'acc' }), ln('cy', ...at(4, 1), ...at(4, 5), { sw: 2.5, dash: '6 4', c: 'acc' }), T('lx', '3', ...at(2.5, 0.6), { size: 16, c: 'acc' }), T('ly', '4', ...at(4.4, 3), { size: 16, c: 'acc' })],
        },
        {
          say: 'Vektor ditulis dengan dua angka bertumpuk. Angka atas: geser ke kanan. Angka bawah: geser ke atas.',
          add: [T('n', 'AB =', 310, 100, { size: 22 }), ...colvec('v', 3, 4, 362, 100, { size: 24, c: 'pos' })],
        },
        {
          say: 'Kalau angkanya negatif, artinya ke kiri atau ke bawah. Vektor ini kadang juga ditulis mendatar: 3 koma 4.',
          add: [T('k1', 'angka atas: + ke kanan, − ke kiri', 200, 250, { size: 15 }), T('k2', 'angka bawah: + ke atas, − ke bawah', 200, 274, { size: 15 })],
        },
      ],
    },
    {
      title: 'Di mana pun sama',
      steps: [
        {
          say: 'Panah yang panjang dan arahnya sama adalah vektor yang sama, walaupun tempatnya berbeda.',
          clear: true,
          keep: ['pl*'],
          add: [vec('ab', PV, 1, 1, 4, 5), vec('cd', PV, 4, 0, 7, 4, 'pos', { from: { x: at(1, 1)[0], y: at(1, 1)[1] } }), T('n', 'sama:', 330, 80, { size: 18 }), ...colvec('v', 3, 4, 330, 125, { size: 22, c: 'pos' })],
        },
        {
          say: 'Panah dengan panjang sama tetapi arahnya berlawanan adalah vektor negatifnya. Kebalikan dari 3 ke kanan 4 ke atas adalah 3 ke kiri 4 ke bawah.',
          add: [vec('ba', PV, 7, 6, 4, 2, 'neg'), T('n2', 'lawannya:', 330, 185, { size: 18, c: 'neg' }), ...colvec('w', '−3', '−4', 330, 230, { size: 22, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Panjang vektor',
      steps: [
        {
          say: 'Panjang vektor dicari dengan Pythagoras. Geser 3 dan 4 adalah sisi tegak segitiga siku-siku.',
          clear: true,
          keep: ['pl*'],
          add: [vec('ab', PV, 1, 1, 4, 5), ln('cx', ...at(1, 1), ...at(4, 1), { sw: 2.5, dash: '6 4', c: 'acc' }), ln('cy', ...at(4, 1), ...at(4, 5), { sw: 2.5, dash: '6 4', c: 'acc' }), T('lx', '3', ...at(2.5, 0.6), { size: 16, c: 'acc' }), T('ly', '4', ...at(4.4, 3), { size: 16, c: 'acc' })],
        },
        {
          say: 'Panjangnya akar dari 3 kuadrat tambah 4 kuadrat, yaitu akar 25, sama dengan 5.',
          add: [T('a', '|AB| = √(3² + 4²)', 335, 90, { size: 16 }), T('b', '= √25 = {g:5}', 335, 125, { size: 20 })],
        },
        {
          say: 'Rumus umumnya: panjang vektor x koma y sama dengan akar dari x kuadrat tambah y kuadrat. Garis tegak di kiri dan kanan berarti panjang.',
          add: [T('f', '|v| = √(x² + y²)', 200, 262, { size: 26, c: 'pos' })],
          pulse: ['f'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa panjang vektor 6 koma 8?',
          clear: true,
          add: [T('n', 'v =', 160, 110, { size: 30 }), ...colvec('v', 6, 8, 215, 110, { size: 30 }), T('q', '|v| = ?', 200, 200, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '10', ok: true, why: '√(36 + 64) = √100 = 10.' },
              { t: '14', why: '6 + 8 = 14 adalah jalan berbelok. Pakai Pythagoras.' },
              { t: '100', why: '100 adalah 6² + 8². Masih harus diakarkan.' },
              { t: '48', why: 'Itu 6 × 8.' },
            ],
          },
        },
        {
          say: '6 kuadrat tambah 8 kuadrat sama dengan 36 tambah 64, yaitu 100. Akar 100 sama dengan 10.',
          set: { q: { text: '|v| = √(36 + 64) = √100 = {g:10}', size: 24 } },
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Titik A(1, 2) dan B(4, 6). Vektor AB adalah …',
      options: [
        { t: '(3, 4)', ok: true },
        { t: '(5, 8)', why: 'Itu A + B. Vektor AB = B − A.' },
        { t: '(−3, −4)', why: 'Itu vektor BA (dari B ke A).' },
        { t: '(4, 6)', why: 'Itu koordinat B saja. Kurangi dengan A.' },
      ],
      steps: ['AB = B − A.', '= (4 − 1, 6 − 2) = (3, 4).'],
    },
    {
      type: 'num',
      q: 'Panjang vektor (−5, 12) adalah …',
      ans: ['13'],
      wrong: { '7': 'Tanda negatif hilang saat dikuadratkan: 25 + 144 = 169.', '17': '5 + 12 = 17 bukan panjang vektor. Pakai Pythagoras.', '169': 'Masih harus diakarkan: √169 = 13.' },
      steps: ['|v| = √((−5)² + 12²) = √(25 + 144).', '= √169 = 13.'],
    },
    {
      q: 'Lawan (negatif) dari vektor (2, −7) adalah …',
      options: [
        { t: '(−2, 7)', ok: true },
        { t: '(−2, −7)', why: 'Kedua komponen harus berganti tanda.' },
        { t: '(7, −2)', why: 'Lawan vektor tidak menukar urutan, hanya mengganti tanda.' },
        { t: '(2, 7)', why: 'Komponen pertama juga berganti tanda.' },
      ],
      steps: ['−v: setiap komponen dikali −1.', '−(2, −7) = (−2, 7).'],
    },
    {
      type: 'num',
      q: 'Panjang vektor (8, −6) adalah …',
      ans: ['10'],
      wrong: { '2': 'Kuadratkan dulu: 64 + 36 = 100.', '14': 'Pakai Pythagoras, bukan penjumlahan.' },
      steps: ['|v| = √(64 + 36).', '= √100 = 10.'],
    },
    {
      q: 'Vektor p = (3, 1). Vektor manakah yang sama dengan p?',
      options: [
        { t: 'vektor dari (2, 2) ke (5, 3)', ok: true },
        { t: 'vektor dari (0, 0) ke (1, 3)', why: 'Itu (1, 3): komponennya tertukar.' },
        { t: 'vektor dari (3, 1) ke (0, 0)', why: 'Itu (−3, −1), arahnya berlawanan.' },
        { t: 'vektor dari (1, 1) ke (3, 3)', why: 'Itu (2, 2).' },
      ],
      steps: ['(5 − 2, 3 − 2) = (3, 1).', 'Tempat awal boleh berbeda, asalkan geserannya sama.'],
    },
  ],
};

// ---------- 3.2 Penjumlahan dan pengurangan ----------
const sumRow = (y, A, B, R, op = '+', lab = 'a + b =') => [
  T('s0', lab, 75, y, { size: 18 }),
  ...colvec('s1', A[0], A[1], 145, y, { size: 18, c: 'pos' }),
  T('s2', op, 180, y, { size: 18 }),
  ...colvec('s3', B[0], B[1], 215, y, { size: 18, c: 'acc' }),
  T('s4', '=', 250, y, { size: 18 }),
  ...colvec('s5', R[0], R[1], 285, y, { size: 18, c: 'ok' }),
];

const l2 = {
  id: 'k10b3-2',
  title: 'Penjumlahan dan Pengurangan Vektor',
  hook: 'Menjumlahkan vektor sama dengan berjalan dua kali: panah kedua dimulai dari ujung panah pertama.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Drone terbang mengikuti vektor biru, lalu vektor kuning. Di mana posisi akhirnya kalau dibandingkan dengan titik awal?',
          add: [...PV.els, vec('a', PV, 1, 1, 4, 2), vec('b', PV, 1, 1, 2, 4, 'acc'), tag('la', 'a = (3, 1)', 335, 70, 'pos', 16), tag('lb', 'b = (1, 3)', 335, 100, 'acc', 16)],
          ask: {
            options: [
              { t: '4 ke kanan, 4 ke atas', ok: true, why: 'Kanannya 3 + 1 = 4, atasnya 1 + 3 = 4.' },
              { t: '3 ke kanan, 3 ke atas', why: 'Geseran kanan dijumlah: 3 + 1 = 4.' },
              { t: '2 ke kanan, 2 ke atas', why: 'Kedua geseran dijumlah, bukan dikurang.' },
              { t: '4 ke kanan, 1 ke atas', why: 'Geseran atas juga dijumlah: 1 + 3 = 4.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ujung ke pangkal',
      steps: [
        {
          say: 'Pindahkan panah kuning supaya pangkalnya menempel di ujung panah biru. Bentuk dan arahnya tidak berubah.',
          set: { b: vecAt(PV, 4, 2, 5, 5) },
        },
        {
          say: 'Sekarang tarik panah dari titik awal ke ujung terakhir. Panah hijau ini adalah a tambah b, disebut resultan.',
          add: [vec('r', PV, 1, 1, 5, 5, 'ok', { z: -1 }), tag('lr', 'a + b', 335, 130, 'ok', 16)],
        },
        {
          say: 'Hitungannya cukup menjumlahkan angka atas dengan atas, bawah dengan bawah: 3 tambah 1, dan 1 tambah 3. Hasilnya 4 koma 4.',
          add: [sumRow(258, [3, 1], [1, 3], [4, 4])],
        },
      ],
    },
    {
      title: 'Aturan jajargenjang',
      steps: [
        {
          say: 'Cara lain: letakkan kedua panah di pangkal yang sama.',
          clear: true,
          keep: ['pl*'],
          add: [vec('a', PV, 1, 1, 4, 2), vec('b', PV, 1, 1, 2, 4, 'acc')],
        },
        {
          say: 'Lengkapi menjadi jajargenjang dengan garis putus-putus. Diagonalnya adalah a tambah b, sama seperti tadi.',
          add: [ln('p1', ...at(4, 2), ...at(5, 5), { sw: 2, dash: '5 4', c: 'mut' }), ln('p2', ...at(2, 4), ...at(5, 5), { sw: 2, dash: '5 4', c: 'mut' }), vec('r', PV, 1, 1, 5, 5, 'ok', { z: -1 }), tag('lr', 'a + b = (4, 4)', 335, 130, 'ok', 16)],
        },
      ],
    },
    {
      title: 'Pengurangan',
      steps: [
        {
          say: 'a dikurangi b sama dengan a tambah lawan b. Lawan b adalah panah b yang dibalik arahnya.',
          clear: true,
          keep: ['pl*'],
          add: [vec('a', PV, 1, 3, 4, 4), vec('b', PV, 6, 0, 7, 3, 'acc'), tag('la', 'a = (3, 1)', 335, 70, 'pos', 15), tag('lb', 'b = (1, 3)', 335, 100, 'acc', 15)],
        },
        {
          say: 'b sama dengan 1 koma 3. Lawannya minus 1 koma minus 3. Tempelkan di ujung a.',
          add: [vec('nb', PV, 4, 4, 3, 1, 'neg'), tag('lnb', '−b = (−1, −3)', 335, 130, 'neg', 15)],
        },
        {
          say: 'Resultannya dari pangkal a ke ujung lawan b: 2 koma minus 2.',
          add: [vec('r', PV, 1, 3, 3, 1, 'ok', { z: -1 }), tag('lr', 'a − b', 335, 160, 'ok', 15), sumRow(258, [3, 1], [1, 3], [2, '−2'], '−', 'a − b =')],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 2 koma 5 ditambah 4 koma minus 1 sama dengan …',
          clear: true,
          add: [...colvec('q1', 2, 5, 120, 120, { size: 28 }), T('qp', '+', 170, 120, { size: 28 }), ...colvec('q2', 4, '−1', 220, 120, { size: 28 }), T('qe', '= ?', 285, 120, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '(6, 4)', ok: true, why: '2 + 4 = 6 dan 5 + (−1) = 4.' },
              { t: '(6, 6)', why: '5 + (−1) = 4, bukan 6.' },
              { t: '(−2, 6)', why: 'Itu pengurangan. Soalnya penjumlahan.' },
              { t: '(7, 3)', why: 'Jumlahkan atas dengan atas: 2 + 4, dan bawah dengan bawah: 5 + (−1).' },
            ],
          },
        },
        {
          say: 'Atas dengan atas: 2 tambah 4 sama dengan 6. Bawah dengan bawah: 5 tambah minus 1 sama dengan 4.',
          del: ['qe'],
          add: [T('qe2', '=', 270, 120, { size: 28 }), ...colvec('q3', 6, 4, 315, 120, { size: 28, c: 'ok' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Jika a = (2, −3) dan b = (5, 1), maka a + b = …',
      options: [
        { t: '(7, −2)', ok: true },
        { t: '(7, −4)', why: '−3 + 1 = −2.' },
        { t: '(−3, −4)', why: 'Itu a − b.' },
        { t: '(10, −3)', why: 'Komponen dijumlah, bukan dikali.' },
      ],
      steps: ['(2 + 5, −3 + 1).', '= (7, −2).'],
    },
    {
      q: 'Jika p = (6, 4) dan q = (2, 7), maka p − q = …',
      options: [
        { t: '(4, −3)', ok: true },
        { t: '(4, 3)', why: '4 − 7 = −3.' },
        { t: '(−4, 3)', why: 'Itu q − p.' },
        { t: '(8, 11)', why: 'Itu p + q.' },
      ],
      steps: ['(6 − 2, 4 − 7).', '= (4, −3).'],
    },
    {
      type: 'num',
      q: 'Jika a = (1, 2) dan b = (2, 2), panjang vektor a + b adalah …',
      ans: ['5'],
      wrong: { '7': 'a + b = (3, 4). Panjangnya √(9 + 16) = 5.', '25': 'Masih harus diakarkan.' },
      steps: ['a + b = (3, 4).', '|a + b| = √(9 + 16) = 5.'],
    },
    {
      q: 'Seseorang berjalan (4, 0) lalu (0, −3), lalu (−1, 2). Perpindahan totalnya adalah …',
      options: [
        { t: '(3, −1)', ok: true },
        { t: '(5, 5)', why: 'Perhatikan tanda negatif.' },
        { t: '(3, 1)', why: '0 + (−3) + 2 = −1.' },
        { t: '(4, −3)', why: 'Langkah ketiga juga dijumlahkan.' },
      ],
      steps: ['Kanan: 4 + 0 + (−1) = 3.', 'Atas: 0 + (−3) + 2 = −1.'],
    },
    {
      q: 'Jika a + b = (5, 3) dan a = (2, 4), maka b = …',
      options: [
        { t: '(3, −1)', ok: true },
        { t: '(7, 7)', why: 'b = (a + b) − a, jadi dikurang.' },
        { t: '(−3, 1)', why: 'Itu a − (a + b). Urutannya terbalik.' },
        { t: '(3, 1)', why: '3 − 4 = −1.' },
      ],
      steps: ['b = (5, 3) − (2, 4).', '= (3, −1).'],
    },
  ],
};

// ---------- 3.3 Perkalian skalar ----------
const l3 = {
  id: 'k10b3-3',
  title: 'Perkalian Vektor dengan Skalar',
  hook: 'Mengalikan vektor dengan bilangan membuat panahnya memanjang, memendek, atau berbalik arah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Vektor a sama dengan 2 koma 1. Seperti apa vektor 3 kali a?',
          add: [...PV.els, vec('a1', PV, 1, 1, 3, 2), tag('la', 'a = (2, 1)', 335, 70, 'pos', 16)],
          ask: {
            options: [
              { t: '(6, 3), searah dan 3 kali lebih panjang', ok: true, why: 'Kedua komponen dikali 3, arahnya tetap.' },
              { t: '(6, 1), lebih miring', why: 'Kedua komponen dikali 3, bukan hanya yang atas.' },
              { t: '(5, 4), bergeser 3', why: 'Mengali tidak sama dengan menambah 3.' },
              { t: '(2, 3), berputar', why: 'Perkalian dengan bilangan positif tidak memutar arah panah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Disambung-sambung',
      steps: [
        {
          say: '3 kali a sama dengan a tambah a tambah a. Sambung panah a ujung ke pangkal.',
          add: [vec('a2', PV, 3, 2, 5, 3, 'pos', { from: { x: at(1, 1)[0], y: at(1, 1)[1] } }), vec('a3', PV, 5, 3, 7, 4, 'pos', { from: { x: at(3, 2)[0], y: at(3, 2)[1] } })],
        },
        {
          say: 'Tiga panah itu membentuk satu panah lurus yang tiga kali lebih panjang. Arahnya sama.',
          del: ['a1', 'a2', 'a3'],
          add: [vec('a3x', PV, 1, 1, 7, 4, 'acc'), tag('l3', '3a = (6, 3)', 335, 110, 'acc', 16)],
        },
        {
          say: 'Hitungannya: setiap komponen dikali 3. 3 kali 2 sama dengan 6, 3 kali 1 sama dengan 3.',
          add: [T('s0', '3 ×', 120, 258, { size: 20 }), ...colvec('s1', 2, 1, 165, 258, { size: 20, c: 'pos' }), T('s2', '=', 205, 258, { size: 20 }), ...colvec('s3', 6, 3, 245, 258, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Negatif dan pecahan',
      steps: [
        {
          say: 'Dikali minus 1, panahnya berbalik arah. Minus a sama dengan minus 2 koma minus 1.',
          clear: true,
          keep: ['pl*'],
          add: [vec('a', PV, 1, 1, 3, 2), tag('la', 'a = (2, 1)', 335, 70, 'pos', 15), vec('na', PV, 7, 5, 5, 4, 'neg'), tag('lna', '−a = (−2, −1)', 335, 100, 'neg', 15)],
        },
        {
          say: 'Dikali minus 2: berbalik dan dua kali lebih panjang.',
          add: [vec('n2', PV, 7, 3, 3, 1, 'neg'), tag('ln2', '−2a = (−4, −2)', 335, 130, 'neg', 15)],
        },
        {
          say: 'Dikali setengah: searah, tetapi panjangnya tinggal separuh.',
          add: [vec('h', PV, 1, 4, 2, 4.5, 'ok'), tag('lh', '½a = (1, ½)', 335, 160, 'ok', 15)],
        },
        {
          say: 'Jadi bilangan positif menjaga arah, bilangan negatif membalik arah. Besar bilangannya mengatur panjang.',
          add: [T('k', 'positif: searah · negatif: berbalik', 200, 262, { size: 16 })],
        },
      ],
    },
    {
      title: 'Menggabungkan operasi',
      steps: [
        {
          say: 'Sekarang 2a tambah b, dengan a sama dengan 2 koma 1 dan b sama dengan minus 1 koma 2.',
          clear: true,
          keep: ['pl*'],
          add: [vec('a2', PV, 1, 1, 5, 3), tag('la', '2a = (4, 2)', 335, 70, 'pos', 15)],
        },
        {
          say: 'Sambungkan b di ujung 2a, lalu tarik resultannya.',
          add: [vec('b', PV, 5, 3, 4, 5, 'acc'), tag('lb', 'b = (−1, 2)', 335, 100, 'acc', 15), vec('r', PV, 1, 1, 4, 5, 'ok', { z: -1 }), tag('lr', '2a + b = (3, 4)', 335, 130, 'ok', 15)],
        },
        {
          say: 'Cek dengan hitungan: 2 kali 2 koma 1 sama dengan 4 koma 2. Ditambah minus 1 koma 2, hasilnya 3 koma 4.',
          add: [T('c', '(4, 2) + (−1, 2) = (3, 4)', 200, 258, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Jika a sama dengan 1 koma minus 2 dan b sama dengan 2 koma 1, berapa 3a dikurangi b?',
          clear: true,
          add: [T('q1', 'a = (1, −2),  b = (2, 1)', 200, 100, { size: 24 }), T('q2', '3a − b = ?', 200, 160, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '(1, −7)', ok: true, why: '3a = (3, −6). (3 − 2, −6 − 1) = (1, −7).' },
              { t: '(5, −5)', why: 'Itu 3a + b.' },
              { t: '(1, −5)', why: '−6 − 1 = −7.' },
              { t: '(−1, −3)', why: 'a harus dikali 3 dulu sebelum dikurangi b.' },
            ],
          },
        },
        {
          say: '3a sama dengan 3 koma minus 6. Dikurangi 2 koma 1, hasilnya 1 koma minus 7.',
          add: [T('a1', '3a = (3, −6)', 200, 210, { size: 24 }), T('a2', '3a − b = (3 − 2, −6 − 1) = {g:(1, −7)}', 200, 255, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Jika v = (−3, 5), maka 4v = …',
      options: [
        { t: '(−12, 20)', ok: true },
        { t: '(1, 9)', why: 'Dikali 4, bukan ditambah 4.' },
        { t: '(−12, 5)', why: 'Kedua komponen dikali 4.' },
        { t: '(12, −20)', why: 'Itu −4v.' },
      ],
      steps: ['4v = (4 × (−3), 4 × 5).', '= (−12, 20).'],
    },
    {
      q: 'Jika a = (2, 3) dan b = (1, −1), maka 2a + 3b = …',
      options: [
        { t: '(7, 3)', ok: true },
        { t: '(3, 2)', why: 'Kalikan dulu: 2a = (4, 6) dan 3b = (3, −3).' },
        { t: '(7, 9)', why: '3 × (−1) = −3.' },
        { t: '(5, 5)', why: '2a + 3b = (4 + 3, 6 − 3).' },
      ],
      steps: ['2a = (4, 6), 3b = (3, −3).', '2a + 3b = (7, 3).'],
    },
    {
      type: 'num',
      q: 'Panjang vektor a = (3, 4) adalah 5. Panjang vektor −2a adalah …',
      ans: ['10'],
      wrong: { '-10': 'Panjang selalu positif. Tanda negatif hanya membalik arah.', '5': 'Dikali 2 membuat panjangnya dua kali lipat.' },
      steps: ['−2a = (−6, −8).', 'Panjangnya √(36 + 64) = 10, yaitu 2 × 5.'],
    },
    {
      q: 'Vektor manakah yang sejajar (searah) dengan (2, −1)?',
      options: [
        { t: '(6, −3)', ok: true },
        { t: '(−1, 2)', why: 'Itu komponennya ditukar, arahnya berbeda.' },
        { t: '(4, 1)', why: '(4, 1) bukan kelipatan (2, −1).' },
        { t: '(2, 1)', why: 'Komponen keduanya berbeda tanda.' },
      ],
      steps: ['Sejajar berarti kelipatan.', '(6, −3) = 3 × (2, −1).'],
    },
    {
      type: 'num',
      q: 'Jika k × (2, 5) = (8, 20), nilai k adalah …',
      ans: ['4'],
      wrong: { '6': '8 − 2 = 6 adalah selisih. k adalah pengali: 2 × k = 8.', '15': 'Cek komponen pertama: 2 × k = 8.' },
      steps: ['2k = 8 → k = 4.', 'Cek: 5 × 4 = 20.'],
    },
  ],
};

export default {
  id: 'k10b3',
  no: 3,
  title: 'Vektor',
  desc: 'Vektor sebagai panah, notasi kolom, panjang vektor, penjumlahan, pengurangan, dan perkalian dengan skalar.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Kapal berlayar 9 km ke timur lalu 12 km ke utara. Jarak kapal dari titik awal adalah … km',
      ans: ['15'],
      wrong: { '21': 'Itu jarak tempuh berbelok. Jarak lurusnya √(81 + 144).' },
      steps: ['Perpindahan = (9, 12).', '√(81 + 144) = √225 = 15 km.'],
    },
    {
      q: 'Titik P(2, 1), Q(5, 3), dan R(4, 7). Vektor PQ + QR sama dengan …',
      options: [
        { t: 'PR = (2, 6)', ok: true },
        { t: '(4, 2)', why: 'Ujung ke pangkal: PQ + QR = PR = R − P.' },
        { t: '(11, 11)', why: 'Itu P + Q + R, bukan vektor.' },
        { t: 'QP = (−3, −2)', why: 'PQ + QR berakhir di R.' },
      ],
      steps: ['PQ = (3, 2), QR = (−1, 4).', 'Jumlah = (2, 6) = PR.'],
    },
    {
      type: 'num',
      q: 'Jika a = (x, 4) dan panjang a adalah 5, dengan x positif, nilai x adalah …',
      ans: ['3'],
      wrong: { '1': 'x² + 16 = 25 → x² = 9.', '9': 'x² = 9, jadi x = 3.' },
      steps: ['x² + 4² = 5².', 'x² = 9 → x = 3.'],
    },
  ],
};
