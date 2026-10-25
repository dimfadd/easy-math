// Kelas 11 Tingkat Lanjut · Bab 1: Bilangan Kompleks
import { T, ln, dot } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag, curve, vec, vecAt } from '../k10/kit.js';

const CC = { x: 80, y: 30, w: 240, h: 240, xmin: -5, xmax: 5, ymin: -5, ymax: 5 };
const PC = plane('pl', { ...CC, xl: 'Re', yl: 'Im' });
const at = PC.at;
const U = PC.X(1) - PC.X(0);
const pt = (id, a, b, c = 'pos', lab, dx = 0, dy = -16) => [dot(id, ...at(a, b), c), ...(lab ? [tag(`${id}t`, lab, at(a, b)[0] + dx, at(a, b)[1] + dy, c, 13)] : [])];

// ---------- 1.1 Mengenal bilangan kompleks ----------
const CQ = { x: 60, y: 25, w: 280, h: 230, xmin: -3, xmax: 3, ymin: -2, ymax: 8 };
const PQ = plane('pq', CQ);

const l1 = {
  id: 'k11lb1-1',
  title: 'Mengenal Bilangan Kompleks',
  hook: 'Tidak ada bilangan real yang kuadratnya negatif. Maka matematikawan menciptakan bilangan baru: i, dengan i² = −1.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Apakah persamaan x kuadrat tambah 1 sama dengan 0 punya penyelesaian bilangan real? Lihat grafik y sama dengan x kuadrat tambah 1.',
          add: [...PQ.els, curve('p', PQ, (x) => x * x + 1, CQ), tag('e', 'y = x² + 1', 280, 50, 'pos', 15)],
          ask: {
            options: [
              { t: 'tidak, grafiknya tidak memotong sumbu x', ok: true, why: 'x² selalu ≥ 0, jadi x² + 1 selalu ≥ 1. Tidak pernah 0.' },
              { t: 'ya, x = 1', why: '1² + 1 = 2, bukan 0.' },
              { t: 'ya, x = −1', why: '(−1)² + 1 = 2. Kuadrat bilangan negatif tetap positif.' },
              { t: 'ya, x = 0', why: '0² + 1 = 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bilangan baru: i',
      steps: [
        {
          say: 'x kuadrat harus sama dengan minus 1. Tidak ada bilangan real seperti itu. Jadi kita definisikan bilangan baru, i, yang kuadratnya minus 1.',
          clear: true,
          add: [T('a', 'x² = −1', 200, 60, { size: 30 }), T('b', 'i² = −1', 200, 120, { size: 44, c: 'pos' }), T('c', 'i = √−1  (satuan imajiner)', 200, 175, { size: 18, c: 'mut' })],
        },
        {
          say: 'Dengan i, akar bilangan negatif bisa ditulis. Akar minus 9 sama dengan akar 9 kali akar minus 1, yaitu 3i.',
          add: [T('d', '√−9 = √9 × √−1 = 3i', 200, 235, { size: 24 })],
        },
        {
          say: 'Bilangan kompleks adalah bilangan berbentuk a tambah bi. a disebut bagian real, b disebut bagian imajiner. Contohnya 3 tambah 2i.',
          clear: true,
          add: [T('f', 'z = {a:a} + {p:b}i', 200, 80, { size: 40 }), T('g', '{a:a} = bagian real,  {p:b} = bagian imajiner', 200, 140, { size: 18 }), T('h', 'contoh: 3 + 2i,  −1 − 4i,  5 (= 5 + 0i),  2i', 200, 200, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Bidang kompleks',
      steps: [
        {
          say: 'Bilangan kompleks digambar di bidang. Sumbu mendatar untuk bagian real, sumbu tegak untuk bagian imajiner.',
          clear: true,
          add: [...PC.els],
        },
        {
          say: '3 tambah 2i berada 3 ke kanan dan 2 ke atas.',
          add: [pt('z1', 3, 2, 'pos', '3 + 2i', 0, -18)],
        },
        {
          say: 'Minus 2 tambah i ada di kiri atas. Minus 1 dikurangi 3i ada di kiri bawah. 4i tepat di sumbu imajiner.',
          add: [pt('z2', -2, 1, 'acc', '−2 + i', 0, -18), pt('z3', -1, -3, 'neg', '−1 − 3i', 30, 14), pt('z4', 0, 4, 'ok', '4i', 22, 0)],
        },
        {
          say: 'Bilangan real seperti 5 hanyalah bilangan kompleks dengan bagian imajiner 0. Letaknya di sumbu real.',
          add: [pt('z5', 5, 0, 'mut')],
          pulse: ['z5'],
        },
      ],
    },
    {
      title: 'Pangkat i berputar',
      steps: [
        {
          say: 'Perhatikan pangkat i. i pangkat 1 sama dengan i. i kuadrat sama dengan minus 1. i pangkat 3 sama dengan i kuadrat kali i, yaitu minus i. i pangkat 4 sama dengan minus 1 kali minus 1, yaitu 1.',
          clear: true,
          add: [T('a', 'i¹ = i', 200, 50, { size: 24 }), T('b', 'i² = −1', 200, 90, { size: 24 }), T('c', 'i³ = i² × i = −i', 200, 130, { size: 24 }), T('d', 'i⁴ = i² × i² = 1', 200, 170, { size: 24 })],
        },
        {
          say: 'Setelah itu polanya berulang setiap 4: i, minus 1, minus i, 1, lalu i lagi. Di bidang kompleks, setiap dikali i, titiknya berputar seperempat putaran.',
          clear: true,
          add: [...PC.els, { id: 'cr', t: 'circle', x: at(0, 0)[0], y: at(0, 0)[1], r: 3 * U, fill: 'none', stroke: 'mut', sw: 1.5, dash: '5 5', z: -1 }, dot('w', ...at(3, 0), 'neg', { r: 8 }), tag('wt', '3', ...at(4, -0.8), 'neg', 14)],
        },
        {
          say: 'Kali i: 3 menjadi 3i.',
          set: { w: { x: at(0, 3)[0], y: at(0, 3)[1] }, wt: tag('wt', '3i', ...at(1, 3.8), 'neg', 14) },
        },
        {
          say: 'Kali i lagi: minus 3. Lalu minus 3i. Lalu kembali ke 3. Empat kali kali i kembali ke tempat semula.',
          set: { w: { x: at(-3, 0)[0], y: at(-3, 0)[1] }, wt: tag('wt', '−3', ...at(-3.9, 0.8), 'neg', 14) },
        },
        {
          say: 'Minus 3i, lalu 3 lagi.',
          set: { w: { x: at(0, -3)[0], y: at(0, -3)[1] }, wt: tag('wt', '−3i', ...at(1.1, -3.8), 'neg', 14) },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa i pangkat 7?',
          clear: true,
          add: [T('q', 'i⁷ = ?', 200, 120, { size: 46 })],
          ask: {
            options: [
              { t: '−i', ok: true, why: '7 = 4 + 3, jadi i⁷ = i⁴ × i³ = 1 × (−i) = −i.' },
              { t: 'i', why: 'i⁵ = i. i⁷ dua langkah lagi: −1, lalu −i.' },
              { t: '−1', why: 'Itu i⁶. Satu langkah lagi: −i.' },
              { t: '7i', why: 'Pangkat bukan perkalian dengan 7.' },
            ],
          },
        },
        {
          say: 'Pola berulang setiap 4. 7 dibagi 4 sisa 3. Jadi i pangkat 7 sama dengan i pangkat 3, yaitu minus i.',
          add: [T('a', '7 = 4 + 3  →  i⁷ = i³ = {g:−i}', 200, 200, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai i² adalah …',
      ans: ['-1'],
      wrong: { '1': 'i didefinisikan supaya i² = −1.', '2': 'i² = i × i = −1.' },
      steps: ['Definisi: i² = −1.'],
    },
    {
      type: 'num',
      q: 'Nilai i¹⁰ adalah …',
      ans: ['-1'],
      wrong: { '1': '10 = 8 + 2, jadi i¹⁰ = i² = −1.', '10': 'Pangkat bukan perkalian.' },
      steps: ['10 dibagi 4 sisa 2.', 'i¹⁰ = i² = −1.'],
    },
    {
      type: 'num',
      q: 'Bagian imajiner dari z = 3 − 4i adalah …',
      ans: ['-4'],
      wrong: { '4': 'Tandanya ikut: z = 3 + (−4)i.', '3': '3 adalah bagian real.' },
      steps: ['z = a + bi dengan a = 3, b = −4.'],
    },
    {
      q: 'Bentuk sederhana √−16 adalah …',
      options: [
        { t: '4i', ok: true },
        { t: '−4', why: '(−4)² = 16, bukan −16.' },
        { t: '16i', why: '√16 = 4, jadi 4i.' },
        { t: 'tidak ada', why: 'Dengan bilangan kompleks, √−16 = 4i.' },
      ],
      steps: ['√−16 = √16 × √−1.', '= 4i.'],
    },
    {
      q: 'Penyelesaian x² + 9 = 0 adalah …',
      options: [
        { t: 'x = 3i atau x = −3i', ok: true },
        { t: 'x = 3 atau x = −3', why: '3² + 9 = 18, bukan 0.' },
        { t: 'x = 9i', why: '(9i)² = −81.' },
        { t: 'tidak ada penyelesaian', why: 'Tidak ada penyelesaian real, tetapi ada penyelesaian kompleks.' },
      ],
      steps: ['x² = −9.', 'x = ±√−9 = ±3i.'],
    },
  ],
};

// ---------- 1.2 Operasi bilangan kompleks ----------
const C2 = { x: 80, y: 25, w: 240, h: 240, xmin: -2, xmax: 6, ymin: -2, ymax: 6 };
const P2 = plane('pl', { ...C2, xl: 'Re', yl: 'Im' });
const C3 = { x: 80, y: 25, w: 240, h: 240, xmin: -4, xmax: 4, ymin: -1, ymax: 7 };
const P3 = plane('pl', { ...C3, xl: 'Re', yl: 'Im' });

const l2 = {
  id: 'k11lb1-2',
  title: 'Operasi Bilangan Kompleks',
  hook: 'Bagian real dijumlah dengan bagian real, imajiner dengan imajiner. Pada perkalian, ingat i² = −1.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '3 tambah 2i, ditambah 1 tambah 3i, sama dengan …',
          add: [T('q', '(3 + 2i) + (1 + 3i) = ?', 200, 130, { size: 32 })],
          ask: {
            options: [
              { t: '4 + 5i', ok: true, why: 'Real: 3 + 1 = 4. Imajiner: 2 + 3 = 5.' },
              { t: '9i', why: 'Bagian real dan imajiner tidak bisa digabung jadi satu.' },
              { t: '3 + 6i', why: '2i + 3i = 5i, dan bagian real 3 + 1 = 4.' },
              { t: '4 + 6i', why: '2 + 3 = 5, bukan 6.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menjumlah seperti vektor',
      steps: [
        {
          say: 'Gambar 3 tambah 2i sebagai panah biru dari titik 0, dan 1 tambah 3i sebagai panah kuning.',
          clear: true,
          add: [...P2.els, vec('a', P2, 0, 0, 3, 2), vec('b', P2, 0, 0, 1, 3, 'acc'), tag('la', '3 + 2i', ...P2.at(4, 1.5), 'pos', 13), tag('lb', '1 + 3i', ...P2.at(-0.3, 3.5), 'acc', 13)],
        },
        {
          say: 'Geser panah kuning ke ujung panah biru, lalu tarik panah dari 0 ke ujung akhir. Hasilnya 4 tambah 5i, persis seperti penjumlahan vektor.',
          set: { b: vecAt(P2, 3, 2, 4, 5), lb: tag('lb', '1 + 3i', ...P2.at(4.6, 3.4), 'acc', 13) },
          add: [vec('r', P2, 0, 0, 4, 5, 'ok', { z: -1 }), tag('lr', '4 + 5i', ...P2.at(3.2, 5.6), 'ok', 14)],
        },
        {
          say: 'Pengurangan juga sama: 5 tambah 4i dikurangi 2 tambah i sama dengan 3 tambah 3i. Real dikurangi real, imajiner dikurangi imajiner.',
          add: [tag('s', '(5 + 4i) − (2 + i) = 3 + 3i', 200, 285, 'ink', 14)],
        },
      ],
    },
    {
      title: 'Perkalian',
      steps: [
        {
          say: 'Perkalian dikerjakan seperti mengalikan dua bentuk aljabar. 2 tambah 3i dikali 1 tambah 2i.',
          clear: true,
          add: [T('a', '(2 + 3i)(1 + 2i)', 200, 45, { size: 28 })],
        },
        {
          say: 'Kalikan setiap suku: 2 kali 1, 2 kali 2i, 3i kali 1, 3i kali 2i.',
          add: [T('b', '= 2 + 4i + 3i + 6i²', 200, 95, { size: 26 })],
        },
        {
          say: 'Ganti i kuadrat dengan minus 1. 6i kuadrat menjadi minus 6.',
          add: [T('c', '= 2 + 7i + 6(−1)', 200, 145, { size: 26 })],
        },
        {
          say: 'Hasilnya 2 dikurangi 6, ditambah 7i, yaitu minus 4 tambah 7i.',
          add: [T('d', '= {g:−4 + 7i}', 200, 200, { size: 30 })],
        },
      ],
    },
    {
      title: 'Kali i = putar 90°',
      steps: [
        {
          say: 'Ambil z sama dengan 3 tambah i. Kalikan dengan i: 3i tambah i kuadrat, yaitu minus 1 tambah 3i.',
          clear: true,
          add: [...P3.els, vec('z', P3, 0, 0, 3, 1), tag('lz', 'z = 3 + i', ...P3.at(3, 0.3), 'pos', 13), T('c', 'i(3 + i) = 3i + i² = −1 + 3i', 200, 285, { size: 16 })],
        },
        {
          say: 'Panah hasilnya tegak lurus panah semula. Mengalikan dengan i memutar titik 90 derajat berlawanan arah jarum jam.',
          add: [vec('iz', P3, 0, 0, -1, 3, 'acc'), tag('liz', 'iz = −1 + 3i', ...P3.at(-2.2, 3.6), 'acc', 13), { id: 'ra', t: 'arc', x: P3.X(0), y: P3.Y(0), r: 22, a1: 18.43, a2: 108.43, right: true, c: 'neg' }],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 2 tambah i, dikali 3 dikurangi i, sama dengan …',
          clear: true,
          add: [T('q', '(2 + i)(3 − i) = ?', 200, 110, { size: 34 })],
          ask: {
            options: [
              { t: '7 + i', ok: true, why: '6 − 2i + 3i − i² = 6 + i + 1 = 7 + i.' },
              { t: '5 + i', why: '−i² = −(−1) = +1, jadi 6 + 1 = 7.' },
              { t: '6 − i²', why: 'Masih ada suku −2i + 3i, dan i² harus diganti −1.' },
              { t: '7 − i', why: '−2i + 3i = +i.' },
            ],
          },
        },
        {
          say: '2 kali 3 sama dengan 6. 2 kali minus i sama dengan minus 2i. i kali 3 sama dengan 3i. i kali minus i sama dengan minus i kuadrat, yaitu 1. Totalnya 7 tambah i.',
          add: [T('a', '6 − 2i + 3i − i² = 6 + i + 1', 200, 180, { size: 22 }), T('b', '= {g:7 + i}', 200, 230, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '(3 + 2i) + (1 − 5i) = …',
      options: [
        { t: '4 − 3i', ok: true },
        { t: '4 + 7i', why: '2i + (−5i) = −3i.' },
        { t: '2 + 7i', why: 'Itu pengurangan.' },
        { t: '1i', why: 'Real dan imajiner tidak digabung.' },
      ],
      steps: ['Real: 3 + 1 = 4.', 'Imajiner: 2 − 5 = −3.'],
    },
    {
      q: '(5 − 2i) − (1 + 3i) = …',
      options: [
        { t: '4 − 5i', ok: true },
        { t: '4 + i', why: '−2i − 3i = −5i.' },
        { t: '6 + i', why: 'Itu penjumlahan.' },
        { t: '4 − i', why: '−2 − 3 = −5.' },
      ],
      steps: ['Real: 5 − 1 = 4.', 'Imajiner: −2 − 3 = −5.'],
    },
    {
      q: '(1 + i)² = …',
      options: [
        { t: '2i', ok: true },
        { t: '2', why: '(1 + i)² = 1 + 2i + i² = 1 + 2i − 1.' },
        { t: '1 + i²', why: '(a + b)² = a² + 2ab + b², bukan a² + b².' },
        { t: '2 + 2i', why: 'i² = −1 membuat 1 + (−1) = 0.' },
      ],
      steps: ['1 + 2i + i².', '= 1 + 2i − 1 = 2i.'],
    },
    {
      q: 'i(4 + 3i) = …',
      options: [
        { t: '−3 + 4i', ok: true },
        { t: '4i + 3', why: '3i × i = 3i² = −3.' },
        { t: '4 + 3i', why: 'Mengalikan dengan i mengubah bilangannya.' },
        { t: '3 − 4i', why: 'Bagian imajiner 4i datang dari i × 4.' },
      ],
      steps: ['4i + 3i² = 4i − 3.', '= −3 + 4i.'],
    },
    {
      q: '(3 + 2i)(3 − 2i) = …',
      options: [
        { t: '13', ok: true },
        { t: '5', why: '9 − 4i² = 9 + 4, bukan 9 − 4.' },
        { t: '9 − 4i', why: 'Suku 6i dan −6i saling hapus, dan −4i² = 4.' },
        { t: '9 + 4i²', why: 'Masih perlu disederhanakan: 4i² = −4, dan tandanya minus.' },
      ],
      steps: ['9 − 6i + 6i − 4i².', '= 9 + 4 = 13.'],
    },
  ],
};

// ---------- 1.3 Konjugat, modulus, argumen ----------
const C5 = { x: 80, y: 22, w: 240, h: 250, xmin: -1, xmax: 5, ymin: -5, ymax: 5 };
const P5b = plane('pl', { ...C5, xl: 'Re', yl: 'Im' });

const C6 = { x: 60, y: 30, w: 240, h: 240, xmin: -1, xmax: 5, ymin: -1, ymax: 5 };
const P6 = plane('pl', { ...C6, xl: 'Re', yl: 'Im' });

const l3 = {
  id: 'k11lb1-3',
  title: 'Konjugat, Modulus, dan Argumen',
  hook: 'Konjugat adalah pencerminan, modulus adalah jarak ke titik 0, dan argumen adalah sudut arahnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Titik 3 tambah 4i berjarak berapa dari titik 0?',
          add: [...P6.els, dot('z', ...P6.at(3, 4), 'pos'), tag('zt', '3 + 4i', ...P6.at(3.9, 4.4), 'pos', 13)],
          ask: {
            options: [
              { t: '5', ok: true, why: '√(3² + 4²) = √25 = 5.' },
              { t: '7', why: '3 + 4 adalah jalan berbelok. Jarak lurusnya pakai Pythagoras.' },
              { t: '25', why: '25 masih harus diakarkan.' },
              { t: '1', why: 'Jarak tidak dicari dengan 4 − 3.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Modulus dan argumen',
      steps: [
        {
          say: 'Jarak dari 0 ke z disebut modulus, ditulis garis tegak z garis tegak. Dengan Pythagoras: akar 3 kuadrat tambah 4 kuadrat, sama dengan 5.',
          add: [ln('r', ...P6.at(0, 0), ...P6.at(3, 4), { sw: 3, c: 'pos' }), ln('hx', ...P6.at(0, 0), ...P6.at(3, 0), { sw: 2, dash: '5 4', c: 'acc' }), ln('hy', ...P6.at(3, 0), ...P6.at(3, 4), { sw: 2, dash: '5 4', c: 'acc' }), tag('m', '|z| = √(3² + 4²) = 5', 300, 290, 'pos', 14)],
        },
        {
          say: 'Sudut antara sumbu real positif dan garis ke z disebut argumen. Tangen sudutnya 4 per 3, jadi argumennya kira-kira 53 derajat.',
          add: [{ id: 'ag', t: 'arc', x: P6.X(0), y: P6.Y(0), r: 36, a1: 0, a2: 53.13, c: 'neg', label: 'θ', lsize: 15 }, tag('a', 'tan θ = 4/3 → θ ≈ 53,1°', 120, 290, 'neg', 13)],
        },
        {
          say: 'Jadi bilangan kompleks bisa dikenali dari panjang dan arahnya, seperti vektor.',
        },
      ],
    },
    {
      title: 'Konjugat: cermin',
      steps: [
        {
          say: 'Konjugat dari a tambah bi adalah a dikurangi bi. Tanda bagian imajinernya dibalik. Konjugat 3 tambah 4i adalah 3 dikurangi 4i.',
          clear: true,
          add: [...P5b.els, dot('z', ...P5b.at(3, 4), 'pos'), tag('zt', 'z = 3 + 4i', ...P5b.at(3.6, 4.6), 'pos', 13)],
        },
        {
          say: 'Di bidang kompleks, konjugat adalah pencerminan terhadap sumbu real.',
          add: [dot('zb', ...P5b.at(3, -4), 'acc', { from: { x: P5b.X(3), y: P5b.Y(4) } }), tag('zbt', 'z̄ = 3 − 4i', ...P5b.at(3.6, -4.6), 'acc', 13), ln('mr', ...P5b.at(3, 4), ...P5b.at(3, -4), { sw: 1.5, dash: '4 4', c: 'mut', z: -1 })],
        },
        {
          say: 'z kali konjugatnya selalu bilangan real: 3 tambah 4i kali 3 dikurangi 4i sama dengan 9 tambah 16, yaitu 25. Itu modulus kuadrat.',
          add: [tag('k', 'z × z̄ = 9 + 16 = 25 = |z|²', 300, 100, 'ok', 14)],
        },
      ],
    },
    {
      title: 'Membagi dengan konjugat',
      steps: [
        {
          say: 'Konjugat dipakai untuk membagi. 5 dibagi 2 tambah i. Kalikan pembilang dan penyebut dengan konjugat penyebut, yaitu 2 dikurangi i.',
          clear: true,
          add: [T('a', '5 ÷ (2 + i)', 200, 45, { size: 28 }), T('b', '= 5(2 − i) ÷ ((2 + i)(2 − i))', 200, 100, { size: 22 })],
        },
        {
          say: 'Penyebutnya menjadi real: 4 tambah 1, yaitu 5. Pembilangnya 10 dikurangi 5i.',
          add: [T('c', '= (10 − 5i) ÷ 5', 200, 155, { size: 24 })],
        },
        {
          say: 'Hasilnya 2 dikurangi i.',
          add: [T('d', '= {g:2 − i}', 200, 210, { size: 30 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa modulus dari minus 6 tambah 8i?',
          clear: true,
          add: [T('q', '|−6 + 8i| = ?', 200, 120, { size: 40 })],
          ask: {
            options: [
              { t: '10', ok: true, why: '√(36 + 64) = √100 = 10.' },
              { t: '2', why: '−6 + 8 bukan caranya. Kuadratkan dulu.' },
              { t: '14', why: 'Pakai Pythagoras: √(6² + 8²).' },
              { t: '−10', why: 'Modulus adalah jarak, selalu tidak negatif.' },
            ],
          },
        },
        {
          say: 'Minus 6 kuadrat 36, 8 kuadrat 64. Jumlahnya 100, akarnya 10.',
          add: [T('a', '√((−6)² + 8²) = √100 = {g:10}', 200, 200, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Konjugat dari 2 − 7i adalah …',
      options: [
        { t: '2 + 7i', ok: true },
        { t: '−2 + 7i', why: 'Hanya tanda bagian imajiner yang dibalik.' },
        { t: '−2 − 7i', why: 'Bagian real tetap 2.' },
        { t: '7 − 2i', why: 'Konjugat tidak menukar bagian real dan imajiner.' },
      ],
      steps: ['Konjugat a + bi adalah a − bi.', '2 − 7i → 2 + 7i.'],
    },
    {
      type: 'num',
      q: 'Modulus dari 5 + 12i adalah …',
      ans: ['13'],
      wrong: { '17': 'Pakai Pythagoras: √(25 + 144).', '169': 'Masih harus diakarkan.' },
      steps: ['|z| = √(25 + 144) = √169.', '= 13.'],
    },
    {
      type: 'num',
      q: 'Argumen dari z = 1 + i adalah … °',
      ans: ['45'],
      wrong: { '90': 'tan θ = 1/1 = 1, jadi θ = 45°.', '1': 'Itu nilai tangennya, bukan sudutnya.' },
      steps: ['tan θ = 1 ÷ 1 = 1.', 'θ = 45°.'],
    },
    {
      type: 'num',
      q: 'Nilai (3 + 4i)(3 − 4i) adalah …',
      ans: ['25'],
      wrong: { '-7': '−16i² = +16, jadi 9 + 16.', '7': '9 − 16i² = 9 + 16 = 25.' },
      steps: ['z × z̄ = a² + b².', '9 + 16 = 25.'],
    },
    {
      q: 'Hasil 10 ÷ (1 + 2i) adalah …',
      options: [
        { t: '2 − 4i', ok: true },
        { t: '10 − 5i', why: 'Penyebutnya juga dikali konjugat: (1 + 2i)(1 − 2i) = 5.' },
        { t: '2 + 4i', why: 'Pembilang dikali konjugat (1 − 2i), jadi bagian imajinernya negatif.' },
        { t: '10 + 5i', why: 'Kalikan pembilang dan penyebut dengan 1 − 2i.' },
      ],
      steps: ['10(1 − 2i) ÷ ((1 + 2i)(1 − 2i)) = (10 − 20i) ÷ 5.', '= 2 − 4i.'],
    },
  ],
};

export default {
  id: 'k11lb1',
  no: 1,
  title: 'Bilangan Kompleks',
  desc: 'Satuan imajiner i, bidang kompleks, operasi bilangan kompleks, konjugat, modulus, argumen, dan pembagian.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Nilai i¹⁰⁰ adalah …',
      ans: ['1'],
      wrong: { '-1': '100 habis dibagi 4, jadi i¹⁰⁰ = (i⁴)²⁵ = 1.', '100': 'Pangkat bukan perkalian.' },
      steps: ['100 = 4 × 25.', 'i¹⁰⁰ = (i⁴)²⁵ = 1.'],
    },
    {
      q: 'Jika z = 2 + 3i, maka z + z̄ = …',
      options: [
        { t: '4', ok: true },
        { t: '6i', why: 'Bagian imajinernya saling hapus: 3i + (−3i) = 0.' },
        { t: '4 + 6i', why: 'z̄ = 2 − 3i, jadi bagian imajinernya saling hapus.' },
        { t: '13', why: '13 adalah z × z̄.' },
      ],
      steps: ['(2 + 3i) + (2 − 3i).', '= 4.'],
    },
    {
      type: 'num',
      q: 'Jika (a + 2) + (b − 1)i = 5 + 3i dengan a dan b real, nilai a + b adalah …',
      ans: ['7'],
      wrong: { '8': 'a = 3 dan b = 4, jadi a + b = 7.', '5': 'Samakan bagian real dan imajinernya: a + 2 = 5, b − 1 = 3.' },
      steps: ['a + 2 = 5 → a = 3. b − 1 = 3 → b = 4.', 'a + b = 7.'],
    },
  ],
};
