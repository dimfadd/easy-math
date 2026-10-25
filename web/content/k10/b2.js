// Kelas 10 · Bab 2: Barisan dan Deret
import { T, F, box, ln, hop, eqRow } from '../helpers.js';
import { chain } from './kit.js';

const sup = (n) => `{^:${n}}`;

// ---------- 2.1 Barisan aritmetika ----------
const U = 18;
const colX = (k) => 60 + k * 55;
const cellY = (j) => 250 - (j + 0.5) * U;
// Menara ke-k: 2 + 3k kotak. Tiga kotak teratas berwarna kuning (tambahan baru).
const tower = (k) =>
  Array.from({ length: 2 + 3 * k }, (_, j) => ({
    id: `t${k}_${j}`,
    t: 'rect',
    x: colX(k),
    y: cellY(j),
    w: U,
    h: U,
    r: 2,
    sw: 1.5,
    fill: k > 0 && j >= 3 * k - 1 ? 'acc' : 'pos-soft',
    ...(k > 0 && j >= 3 * k - 1 ? { from: { x: colX(k), y: cellY(j) - 40 } } : {}),
  }));
const topLab = (k) => T(`v${k}`, String(2 + 3 * k), colX(k), cellY(2 + 3 * k - 1) - 22, { size: 18 });

const CA = chain('u', [2, 5, 8, 11, 14], 50, 75, 120, { w: 50 });
const uLab = (i) => T(`ul${i}`, `U${'₁₂₃₄₅'[i]}`, CA.X(i), 152, { size: 15, c: 'mut' });

const l1 = {
  id: 'k10b2-1',
  title: 'Barisan Aritmetika',
  hook: 'Barisan yang selalu bertambah dengan jumlah yang sama. Suku ke-100 pun bisa dicari tanpa menulis semuanya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Di sebuah gedung, baris pertama ada 10 kursi. Setiap baris di belakangnya bertambah 2 kursi. Ada berapa kursi di baris ke-20?',
          add: [T('a', 'baris 1: 10 kursi', 200, 90, { size: 22 }), T('b', 'setiap baris +2', 200, 130, { size: 22, c: 'pos' }), T('c', 'baris 20: ?', 200, 190, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '48', ok: true, why: 'Dari baris 1 ke baris 20 ada 19 kali tambah 2: 10 + 38 = 48.' },
              { t: '50', why: 'Baris 1 belum ditambah. Penambahannya hanya 19 kali, bukan 20.' },
              { t: '40', why: 'Itu 20 × 2. Jangan lupa baris pertama sudah 10.' },
              { t: '30', why: 'Itu 10 + 20. Setiap baris bertambah 2, bukan 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pola tumbuh',
      steps: [
        {
          say: 'Lihat menara kotak ini. Menara pertama punya 2 kotak.',
          clear: true,
          add: [tower(0), topLab(0)],
        },
        {
          say: 'Menara berikutnya: sama dengan sebelumnya, ditambah 3 kotak kuning. Jadi 5.',
          add: [tower(1), topLab(1)],
        },
        {
          say: 'Tambah 3 lagi: 8. Lalu 11.',
          add: [tower(2), topLab(2)],
        },
        {
          say: 'Tambah 3 lagi: 11.',
          add: [tower(3), topLab(3), T('d', '2, 5, 8, 11, …', 320, 110, { size: 20 })],
        },
        {
          say: 'Barisan yang selisihnya selalu sama disebut barisan aritmetika. Selisihnya disebut beda, ditulis b. Di sini b sama dengan 3.',
          add: [T('b', 'beda b = 3', 320, 150, { size: 20, c: 'acc' }), T('a', 'suku awal a = 2', 320, 185, { size: 16, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Rumus suku ke-n',
      steps: [
        {
          say: 'Tulis barisannya berjajar. U satu adalah suku pertama, U dua suku kedua, dan seterusnya.',
          clear: true,
          add: [...CA.els, ...[0, 1, 2, 3, 4].map(uLab)],
        },
        {
          say: 'Dari U satu ke U lima ada 4 lompatan tambah 3. Bukan 5 lompatan.',
          add: [[0, 1, 2, 3].map((i) => hop(`h${i}`, CA.X(i), CA.X(i + 1), 104, { label: '+3', lsize: 13 }))],
          pulse: ['u4'],
        },
        {
          say: 'Jadi U lima sama dengan 2 tambah 4 kali 3, yaitu 14. Untuk suku ke-n, lompatannya n dikurangi 1 kali.',
          add: [T('e', `U₅ = 2 + 4 × 3 = 14`, 200, 200, { size: 22 })],
        },
        {
          say: 'Rumusnya: U n sama dengan a tambah n dikurangi 1, dikali b.',
          add: [T('f', 'Uₙ = a + (n − 1) × b', 200, 252, { size: 28, c: 'pos' })],
          pulse: ['f'],
        },
      ],
    },
    {
      title: 'Suku jauh',
      steps: [
        {
          say: 'Sekarang suku ke-20 barisan tadi tanpa menulis semuanya. a sama dengan 2, b sama dengan 3, n sama dengan 20.',
          clear: true,
          add: [T('f', 'Uₙ = a + (n − 1) × b', 200, 60, { size: 26, c: 'pos' }), T('a', 'U₂₀ = 2 + 19 × 3', 200, 130, { size: 26 })],
        },
        {
          say: '19 kali 3 sama dengan 57. Ditambah 2, jadi 59.',
          add: [T('b', '= 2 + 57 = {g:59}', 200, 185, { size: 26 })],
        },
        {
          say: 'Bedanya juga bisa negatif. 50, 46, 42, dan seterusnya punya beda minus 4. Barisannya turun.',
          add: [T('c', '50, 46, 42, …  →  b = {n:−4}', 200, 250, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Suku ke-10 dari barisan 7, 11, 15, dan seterusnya adalah …',
          clear: true,
          add: [T('q', '7, 11, 15, …', 200, 100, { size: 36 }), T('q2', 'U₁₀ = ?', 200, 165, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '43', ok: true, why: 'a = 7, b = 4. U₁₀ = 7 + 9 × 4 = 43.' },
              { t: '47', why: 'Itu 7 + 10 × 4. Dari suku 1 ke suku 10 hanya 9 lompatan.' },
              { t: '40', why: 'Itu 10 × 4. Suku pertamanya 7.' },
              { t: '39', why: 'Itu 3 + 9 × 4. Suku pertamanya 7.' },
            ],
          },
        },
        {
          say: 'a sama dengan 7 dan b sama dengan 4. U sepuluh sama dengan 7 tambah 9 kali 4, yaitu 43.',
          add: [T('a', 'U₁₀ = 7 + 9 × 4 = {g:43}', 200, 230, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Suku ke-15 dari barisan 3, 8, 13, 18, … adalah …',
      ans: ['73'],
      wrong: { '78': 'Lompatannya 14 kali, bukan 15: 3 + 14 × 5.', '75': 'Itu 15 × 5. Suku pertamanya 3.' },
      steps: ['a = 3, b = 5.', 'U₁₅ = 3 + 14 × 5 = 73.'],
    },
    {
      type: 'num',
      q: 'Beda barisan 20, 17, 14, 11, … adalah …',
      ans: ['-3'],
      wrong: { '3': 'Barisannya turun, jadi bedanya negatif: 17 − 20 = −3.' },
      steps: ['b = U₂ − U₁ = 17 − 20.', 'b = −3.'],
    },
    {
      type: 'num',
      q: 'Pada barisan 4, 7, 10, 13, …, bilangan 100 adalah suku ke- …',
      ans: ['33'],
      wrong: { '32': '4 + (n − 1) × 3 = 100 → n − 1 = 32 → n = 33.', '25': 'Bedanya 3, bukan 4.' },
      steps: ['4 + (n − 1) × 3 = 100.', '(n − 1) × 3 = 96 → n − 1 = 32 → n = 33.'],
    },
    {
      type: 'num',
      q: 'Suatu barisan aritmetika memiliki U₃ = 11 dan U₇ = 23. Nilai U₁₀ adalah …',
      ans: ['32'],
      wrong: { '35': 'b = 3 dan a = 5. U₁₀ = 5 + 9 × 3 = 32.', '30': 'Cari a dulu: U₃ = a + 2b = 11.' },
      steps: ['Dari U₃ ke U₇ ada 4 lompatan: 4b = 12 → b = 3.', 'a = 11 − 2 × 3 = 5.', 'U₁₀ = 5 + 9 × 3 = 32.'],
    },
    {
      type: 'num',
      q: 'Uang saku Dika bulan pertama Rp50.000 dan naik Rp10.000 setiap bulan. Uang sakunya pada bulan ke-12 adalah Rp …',
      ans: ['160000'],
      wrong: { '170000': 'Kenaikannya 11 kali, bukan 12.', '120000': 'Itu 12 × 10.000. Jangan lupa uang saku awalnya.' },
      steps: ['a = 50.000, b = 10.000.', 'U₁₂ = 50.000 + 11 × 10.000 = Rp160.000.'],
    },
  ],
};

// ---------- 2.2 Deret aritmetika ----------
const S = 24;
const sx = (i) => 72 + i * S;
const sy = (j) => 250 - (j + 0.5) * S;
const stair = () =>
  [0, 1, 2, 3, 4].flatMap((i) => Array.from({ length: i + 1 }, (_, j) => box(`s${i}_${j}`, sx(i), sy(j), S, S, { r: 2, sw: 1.5, fill: 'pos-soft' })));
const copy = () =>
  [0, 1, 2, 3, 4].flatMap((i) =>
    Array.from({ length: 5 - i }, (_, k) => {
      const j = i + 1 + k;
      return box(`c${i}_${j}`, sx(i), sy(j), S, S, { r: 2, sw: 1.5, fill: 'acc', from: { x: sx(i) + 150, y: sy(j) } });
    }),
  );

const l2 = {
  id: 'k10b2-2',
  title: 'Deret Aritmetika',
  hook: 'Menjumlahkan 1 sampai 100 hanya butuh satu perkalian, kalau tahu caranya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa jumlah 1 tambah 2 tambah 3, terus sampai 100?',
          add: [T('q', '1 + 2 + 3 + … + 100 = ?', 200, 140, { size: 32 })],
          ask: {
            options: [
              { t: '5.050', ok: true, why: 'Ada 50 pasangan yang masing-masing berjumlah 101: 50 × 101 = 5.050.' },
              { t: '10.000', why: 'Itu 100 × 100. Bilangannya tidak semuanya 100.' },
              { t: '10.100', why: 'Itu 100 × 101, dua kali jumlah sebenarnya.' },
              { t: '5.000', why: 'Hampir. Pasangkan 1 + 100, 2 + 99, …: 50 pasangan bernilai 101.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tangga dan salinannya',
      steps: [
        {
          say: 'Kita mulai yang kecil: 1 tambah 2 tambah 3 tambah 4 tambah 5. Susun sebagai tangga kotak biru.',
          clear: true,
          add: [stair(), T('a', '1 + 2 + 3 + 4 + 5', 300, 60, { size: 20 })],
        },
        {
          say: 'Buat salinan tangga yang sama, lalu balik dan tempelkan di atasnya. Kotak kuning ini juga 1 tambah 2 tambah 3 tambah 4 tambah 5.',
          add: [copy()],
        },
        {
          say: 'Hasilnya persegi panjang 5 kali 6, yaitu 30 kotak. Tangga aslinya separuhnya, jadi 15.',
          add: [T('w', '5', 120, 268, { size: 16, c: 'mut' }), T('hh', '6', 196, 178, { size: 16, c: 'mut' }), T('b', '5 × 6 = 30', 300, 120, { size: 22 }), T('c', '30 ÷ 2 = {g:15}', 300, 165, { size: 24 })],
        },
        {
          say: 'Perhatikan 6 berasal dari suku pertama tambah suku terakhir: 1 tambah 5. Dan 5 adalah banyaknya suku.',
          add: [T('d', '6 = 1 + 5', 300, 215, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Rumus jumlah',
      steps: [
        {
          say: 'Penjumlahan suku-suku barisan aritmetika disebut deret aritmetika. Jumlah n suku pertama ditulis S n.',
          clear: true,
          add: [eqRow('f', 80, ['Sₙ =', ['n', '2'], '× (a + Uₙ)'], { size: 30, c: 'pos' })],
        },
        {
          say: 'Artinya: banyak suku dibagi 2, dikali suku pertama tambah suku terakhir.',
          add: [T('a', 'banyak suku ÷ 2 × (pertama + terakhir)', 200, 150, { size: 18 })],
        },
        {
          say: 'Kalau suku terakhir belum diketahui, ganti U n dengan a tambah n dikurangi 1 kali b.',
          add: [eqRow('g', 225, ['Sₙ =', ['n', '2'], '× (2a + (n − 1)b)'], { size: 24 })],
        },
      ],
    },
    {
      title: 'Cara Gauss',
      steps: [
        {
          say: 'Kembali ke 1 sampai 100. Pasangkan yang pertama dengan yang terakhir: 1 tambah 100 sama dengan 101.',
          clear: true,
          add: [T('a', '1 + 100 = 101', 200, 60, { size: 24 }), T('b', '2 + 99 = 101', 200, 95, { size: 24 }), T('c', '3 + 98 = 101', 200, 130, { size: 24 })],
        },
        {
          say: 'Setiap pasangan berjumlah 101. Ada 100 bilangan, jadi ada 50 pasangan.',
          add: [T('d', '…  50 pasangan', 200, 170, { size: 22, c: 'mut' })],
        },
        {
          say: '50 kali 101 sama dengan 5.050. Sama persis dengan rumus: 100 per 2, dikali 1 tambah 100.',
          add: [T('e', '50 × 101 = {g:5.050}', 200, 225, { size: 30 })],
          pulse: ['e'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 2 tambah 4 tambah 6, terus sampai 20. Berapa jumlahnya?',
          clear: true,
          add: [T('q', '2 + 4 + 6 + … + 20 = ?', 200, 110, { size: 32 })],
          ask: {
            options: [
              { t: '110', ok: true, why: 'Ada 10 suku. 10 ÷ 2 × (2 + 20) = 5 × 22 = 110.' },
              { t: '220', why: 'Jangan lupa dibagi 2.' },
              { t: '100', why: '10 ÷ 2 × 22 = 110.' },
              { t: '242', why: 'Banyak sukunya 10, bukan 11. Bilangan genap dari 2 sampai 20 ada 10.' },
            ],
          },
        },
        {
          say: 'Bilangan genap dari 2 sampai 20 ada 10 suku. S sepuluh sama dengan 10 per 2 dikali 2 tambah 20, yaitu 5 kali 22, sama dengan 110.',
          add: [T('a', 'n = 10', 200, 170, { size: 22, c: 'mut' }), T('b', 'S₁₀ = 5 × (2 + 20) = {g:110}', 200, 225, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jumlah 1 + 2 + 3 + … + 50 adalah …',
      ans: ['1275'],
      wrong: { '2550': 'Jangan lupa dibagi 2: 50 ÷ 2 × 51.', '1250': '25 × 51 = 1.275.' },
      steps: ['S₅₀ = 50 ÷ 2 × (1 + 50).', '= 25 × 51 = 1.275.'],
    },
    {
      type: 'num',
      q: 'Jumlah 10 suku pertama deret 3 + 7 + 11 + … adalah …',
      ans: ['210'],
      wrong: { '195': 'U₁₀ = 3 + 9 × 4 = 39. S₁₀ = 5 × (3 + 39) = 210.', '420': 'Jangan lupa dibagi 2.' },
      steps: ['a = 3, b = 4, U₁₀ = 3 + 9 × 4 = 39.', 'S₁₀ = 10 ÷ 2 × (3 + 39) = 5 × 42 = 210.'],
    },
    {
      type: 'num',
      q: 'Jumlah 20 suku pertama deret 5 + 8 + 11 + … adalah …',
      ans: ['670'],
      wrong: { '700': 'U₂₀ = 5 + 19 × 3 = 62, bukan 65.', '1340': 'Jangan lupa dibagi 2.' },
      steps: ['U₂₀ = 5 + 19 × 3 = 62.', 'S₂₀ = 10 × (5 + 62) = 670.'],
    },
    {
      type: 'num',
      q: 'Sebuah gedung pertunjukan punya 10 baris kursi. Baris pertama 20 kursi, dan setiap baris berikutnya bertambah 2 kursi. Banyak kursi seluruhnya adalah …',
      ans: ['290'],
      wrong: { '200': 'Kursinya bertambah setiap baris, jadi bukan 10 × 20.', '38': '38 adalah banyak kursi di baris ke-10.' },
      steps: ['U₁₀ = 20 + 9 × 2 = 38.', 'S₁₀ = 5 × (20 + 38) = 290.'],
    },
    {
      type: 'num',
      q: 'Jumlah n suku pertama suatu deret adalah Sₙ = n² + 2n. Suku ke-5 deret itu adalah …',
      ans: ['11'],
      wrong: { '35': '35 adalah jumlah 5 suku (S₅). U₅ = S₅ − S₄.' },
      steps: ['S₅ = 25 + 10 = 35, S₄ = 16 + 8 = 24.', 'U₅ = S₅ − S₄ = 11.'],
    },
  ],
};

// ---------- 2.3 Barisan dan deret geometri ----------
const FLOOR = 260;
const bounce = (id, x1, x2, h) => ({ id, t: 'path', x: 0, y: 0, d: `M${x1},${FLOOR} Q${(x1 + x2) / 2},${FLOOR - 2 * h} ${x2},${FLOOR}`, stroke: 'pos', sw: 2.5, dash: '6 5' });
const ball = (x, y) => ({ id: 'ball', t: 'circle', x, y, r: 10, fill: 'neg', stroke: 'ink', sw: 2 });
const CG = chain('g', [1, 2, 4, 8, 16], 60, 70, 110, { w: 48 });

const l3 = {
  id: 'k10b2-3',
  title: 'Barisan dan Deret Geometri',
  hook: 'Barisan yang selalu dikali dengan bilangan yang sama, seperti tinggi pantulan bola.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bola dijatuhkan dari ketinggian 16 meter. Setiap memantul, tingginya tinggal setengah. Berapa tinggi pantulan keempat?',
          add: [ln('fl', 20, FLOOR, 380, FLOOR, { sw: 3, draw: false }), ball(40, 100), T('h0', '16 m', 80, 100, { size: 16 })],
          ask: {
            options: [
              { t: '1 m', ok: true, why: '16 → 8 → 4 → 2 → 1. Pantulan keempat tingginya 1 m.' },
              { t: '2 m', why: '2 m adalah pantulan ketiga.' },
              { t: '4 m', why: 'Itu 16 ÷ 4. Setiap pantulan dibagi 2, empat kali.' },
              { t: '8 m', why: '8 m adalah pantulan pertama.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bola memantul',
      steps: [
        {
          say: 'Bola jatuh, lalu memantul setinggi 8 meter.',
          add: [ln('drop', 40, 110, 40, FLOOR - 10, { sw: 2, dash: '4 4', c: 'mut' }), bounce('b1', 40, 160, 80), T('h1', '8 m', 100, 162, { size: 15 })],
          set: { ball: { x: 100, y: FLOOR - 80 } },
        },
        {
          say: 'Pantulan berikutnya 4 meter, lalu 2 meter.',
          add: [bounce('b2', 160, 245, 40), bounce('b3', 245, 305, 20), T('h2', '4 m', 202, 203, { size: 15 }), T('h3', '2 m', 275, 223, { size: 15 })],
          set: { ball: { x: 275, y: FLOOR - 20 } },
        },
        {
          say: 'Setiap tinggi didapat dari tinggi sebelumnya dikali setengah. Barisan seperti ini disebut barisan geometri. Pengali tetapnya disebut rasio, ditulis r.',
          add: [T('s', '16, 8, 4, 2, …', 260, 60, { size: 22 }), T('r', 'rasio r = ½', 260, 95, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Rumus suku ke-n',
      steps: [
        {
          say: 'Contoh lain: 3, 6, 12, 24. Rasionya 2. Dari suku pertama ke suku ke-n, kita mengali dengan r sebanyak n dikurangi 1 kali.',
          clear: true,
          add: [T('a', '3, 6, 12, 24, …', 200, 60, { size: 28 }), T('b', 'r = 6 ÷ 3 = 2', 200, 105, { size: 20, c: 'acc' })],
        },
        {
          say: 'Rumusnya: U n sama dengan a kali r pangkat n dikurangi 1.',
          add: [T('f', `Uₙ = a × r${sup('n − 1')}`, 200, 165, { size: 32, c: 'pos' })],
          pulse: ['f'],
        },
        {
          say: 'U enam sama dengan 3 kali 2 pangkat 5, yaitu 3 kali 32, sama dengan 96.',
          add: [T('c', `U₆ = 3 × 2${sup(5)} = 3 × 32 = {g:96}`, 200, 230, { size: 24 })],
        },
      ],
    },
    {
      title: 'Jumlah deret geometri',
      steps: [
        {
          say: 'Sekarang menjumlahkan. Lihat kotak 1, 2, 4, 8. Jumlahnya 15.',
          clear: true,
          add: [...CG.els.slice(0, 4), T('a', '1 + 2 + 4 + 8 = 15', 200, 175, { size: 24 })],
        },
        {
          say: 'Suku berikutnya 16. Jumlah semua suku sebelumnya selalu kurang 1 dari suku berikutnya: 16 dikurangi 1 sama dengan 15.',
          add: [{ ...CG.els[4], fill: 'acc-soft', dash: '5 4' }, T('b', '16 − 1 = 15', 200, 215, { size: 22, c: 'acc' })],
          pulse: ['g4'],
        },
        {
          say: 'Dari pola ini muncul rumus jumlah n suku pertama deret geometri.',
          clear: true,
          add: [T('f0', 'Sₙ =', 115, 80, { size: 30, c: 'pos' }), F('f1', 'a(rⁿ − 1)', 'r − 1', 245, 80, { size: 26, c: 'pos' }), T('n', 'dipakai untuk r > 1', 200, 140, { size: 16, c: 'mut' })],
        },
        {
          say: 'Contoh: 3 tambah 6 tambah 12 tambah 24 tambah 48. a sama dengan 3, r sama dengan 2, n sama dengan 5. Hasilnya 3 kali 31, yaitu 93.',
          add: [T('a', '3 + 6 + 12 + 24 + 48', 200, 190, { size: 20 }), T('b', `S₅ = 3 × (2${sup(5)} − 1) ÷ 1 = {g:93}`, 200, 240, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Suku ke-5 dari barisan 2, 6, 18, dan seterusnya adalah …',
          clear: true,
          add: [T('q', '2, 6, 18, …', 200, 100, { size: 36 }), T('q2', 'U₅ = ?', 200, 165, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '162', ok: true, why: 'r = 3. U₅ = 2 × 3⁴ = 2 × 81 = 162.' },
              { t: '486', why: 'Itu 2 × 3⁵. Pangkatnya n − 1 = 4.' },
              { t: '54', why: '54 adalah U₄. Kalikan 3 sekali lagi.' },
              { t: '30', why: 'Barisan ini dikali 3, bukan ditambah.' },
            ],
          },
        },
        {
          say: 'Rasionya 3. U lima sama dengan 2 kali 3 pangkat 4, yaitu 2 kali 81, sama dengan 162.',
          add: [T('a', `U₅ = 2 × 3${sup(4)} = 2 × 81 = {g:162}`, 200, 230, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Suku ke-6 dari barisan 5, 10, 20, … adalah …',
      ans: ['160'],
      wrong: { '320': 'Itu 5 × 2⁶. Pangkatnya n − 1 = 5.', '30': 'Barisan geometri dikali, bukan ditambah.' },
      steps: ['a = 5, r = 2.', 'U₆ = 5 × 2⁵ = 160.'],
    },
    {
      type: 'num',
      q: 'Rasio barisan 81, 27, 9, 3, … adalah … (boleh ditulis sebagai pecahan)',
      ans: ['1/3'],
      wrong: { '3': 'Barisannya mengecil, jadi rasionya kurang dari 1: 27 ÷ 81 = ⅓.', '-54': 'Itu selisih. Rasio = suku ÷ suku sebelumnya.' },
      steps: ['r = U₂ ÷ U₁ = 27 ÷ 81.', 'r = ⅓.'],
    },
    {
      type: 'num',
      q: 'Jumlah 5 suku pertama deret 2 + 6 + 18 + … adalah …',
      ans: ['242'],
      wrong: { '162': '162 adalah suku ke-5, bukan jumlahnya.', '484': 'Bagi dengan r − 1 = 2.' },
      steps: ['a = 2, r = 3, n = 5.', 'S₅ = 2 × (3⁵ − 1) ÷ (3 − 1) = 2 × 242 ÷ 2 = 242.'],
    },
    {
      type: 'num',
      q: 'Suatu barisan geometri memiliki U₂ = 6 dan U₅ = 48. Nilai U₇ adalah …',
      ans: ['192'],
      wrong: { '96': '96 adalah U₆.', '384': 'U₇ = 3 × 2⁶ = 192.' },
      steps: ['Dari U₂ ke U₅ dikali r tiga kali: r³ = 48 ÷ 6 = 8 → r = 2.', 'a = 6 ÷ 2 = 3.', 'U₇ = 3 × 2⁶ = 192.'],
    },
    {
      type: 'num',
      q: 'Nilai 1 + 2 + 4 + 8 + … + 512 adalah …',
      ans: ['1023'],
      wrong: { '1024': 'Jumlahnya kurang 1 dari suku berikutnya: 1.024 − 1.', '511': '511 = 512 − 1, tetapi 512 sendiri juga dijumlahkan.' },
      steps: ['Suku berikutnya setelah 512 adalah 1.024.', 'Jumlah = 1.024 − 1 = 1.023.'],
    },
  ],
};

// ---------- 2.4 Deret geometri tak hingga ----------
function halves(n) {
  let R = { x: 50, y: 50, w: 200, h: 200 };
  const out = [];
  const labs = ['½', '¼', '⅛', '1/16'];
  for (let i = 0; i < n; i++) {
    let p;
    if (i % 2 === 0) {
      p = { x: R.x, y: R.y, w: R.w / 2, h: R.h };
      R = { x: R.x + R.w / 2, y: R.y, w: R.w / 2, h: R.h };
    } else {
      p = { x: R.x, y: R.y, w: R.w, h: R.h / 2 };
      R = { x: R.x, y: R.y + R.h / 2, w: R.w, h: R.h / 2 };
    }
    out.push(box(`p${i}`, p.x + p.w / 2, p.y + p.h / 2, p.w, p.h, { r: 0, sw: 1.5, fill: i % 2 ? 'acc' : 'pos', ...(labs[i] ? { label: labs[i], lsize: i < 3 ? 22 : 13, lc: i % 2 ? 'ink' : 'onfill' } : {}) }));
  }
  return out;
}
const SUMS = ['½', '¾', '⅞', '15/16', '31/32', '63/64'];

const l4 = {
  id: 'k10b2-4',
  title: 'Deret Geometri Tak Hingga',
  hook: 'Menjumlahkan bilangan yang tidak ada habisnya, tetapi hasilnya tetap.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Setengah tambah seperempat tambah seperdelapan, dan seterusnya tanpa henti. Berapa hasilnya?',
          add: [T('q', '½ + ¼ + ⅛ + … = ?', 200, 140, { size: 36 })],
          ask: {
            options: [
              { t: '1', ok: true, why: 'Setiap potongan mengisi separuh sisa ruang. Lama-lama satu persegi penuh, tetapi tidak pernah lebih.' },
              { t: 'tak terhingga', why: 'Potongannya makin kecil dengan cepat, jadi jumlahnya tidak membesar tanpa batas.' },
              { t: '2', why: 'Coba gambar di satu persegi: potongan-potongannya tidak pernah melebihi persegi itu.' },
              { t: '⅞', why: 'Itu baru tiga suku. Masih ada suku-suku berikutnya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mengisi persegi',
      steps: [
        {
          say: 'Ambil satu persegi yang luasnya 1. Warnai setengahnya.',
          clear: true,
          add: [box('sq', 150, 150, 200, 200, { r: 0, sw: 2.5, fill: 'paper' }), halves(1), T('sl', 'jumlah:', 325, 115, { size: 18, c: 'mut' }), T('s', '½', 325, 150, { size: 26 })],
        },
        {
          say: 'Tambah seperempat: separuh dari sisanya. Jumlahnya tiga perempat.',
          add: [halves(2).slice(1)],
          set: { s: { text: SUMS[1] } },
        },
        {
          say: 'Tambah seperdelapan: tujuh perdelapan. Lalu seperenam belas: lima belas perenam belas.',
          add: [halves(4).slice(2)],
          set: { s: { text: SUMS[3] } },
        },
        {
          say: 'Terus dan terus. Setiap potongan hanya mengisi separuh sisa ruang, jadi persegi itu makin penuh, tetapi tidak pernah meluap.',
          add: [halves(8).slice(4)],
          set: { s: { text: `${SUMS[5]}…` } },
        },
        {
          say: 'Kalau dilanjutkan tanpa henti, jumlahnya mendekati 1. Kita tulis: jumlah tak hingganya sama dengan 1.',
          add: [T('r', '= 1', 325, 200, { size: 34, c: 'ok' })],
          pulse: ['r'],
        },
      ],
    },
    {
      title: 'Rumusnya',
      steps: [
        {
          say: 'Deret geometri tak hingga bisa dijumlah kalau rasionya di antara minus 1 dan 1. Suku-sukunya makin lama makin kecil.',
          clear: true,
          add: [T('f0', 'S∞ =', 145, 85, { size: 34, c: 'pos' }), F('f1', 'a', '1 − r', 250, 85, { size: 30, c: 'pos' }), T('s', 'syarat: −1 < r < 1', 200, 150, { size: 20, c: 'mut' })],
        },
        {
          say: 'Cek dengan deret tadi: a sama dengan setengah, r sama dengan setengah. Setengah dibagi setengah sama dengan 1. Cocok.',
          add: [T('g0', 'S∞ =', 95, 225, { size: 26 }), F('g1', '½', '1 − ½', 175, 225, { size: 24 }), T('g2', '=', 228, 225, { size: 26 }), F('g3', '½', '½', 258, 225, { size: 24 }), T('g4', '= 1', 305, 225, { size: 26 })],
        },
      ],
    },
    {
      title: 'Bola yang tak berhenti',
      steps: [
        {
          say: 'Bola dijatuhkan dari 10 meter dan setiap memantul tingginya tiga perempat tinggi sebelumnya. Berapa jarak total yang ditempuhnya?',
          clear: true,
          add: [T('a', 'jatuh 10 m, pantulan ¾ tinggi sebelumnya', 200, 45, { size: 17 })],
        },
        {
          say: 'Setelah jatuh 10 meter, bola naik lalu turun lagi. Setiap pantulan ditempuh dua kali, naik dan turun.',
          add: [T('b', 'naik: 7,5 + 5,625 + …', 200, 95, { size: 20 }), T('c', '= 7,5 ÷ (1 − ¾) = 30 m', 200, 135, { size: 20 })],
        },
        {
          say: 'Total: 10 tambah 2 kali 30, yaitu 70 meter.',
          add: [T('d', 'total = 10 + 2 × 30 = {g:70 m}', 200, 200, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 8 tambah 4 tambah 2 tambah 1, dan seterusnya tanpa henti. Berapa jumlahnya?',
          clear: true,
          add: [T('q', '8 + 4 + 2 + 1 + … = ?', 200, 110, { size: 34 })],
          ask: {
            options: [
              { t: '16', ok: true, why: 'a = 8, r = ½. S∞ = 8 ÷ ½ = 16.' },
              { t: '15', why: '8 + 4 + 2 + 1 = 15, tetapi masih ada suku-suku berikutnya.' },
              { t: '4', why: 'Itu 8 × ½. Rumusnya a ÷ (1 − r).' },
              { t: 'tak terhingga', why: 'r = ½ ada di antara −1 dan 1, jadi jumlahnya tertentu.' },
            ],
          },
        },
        {
          say: 'a sama dengan 8 dan r sama dengan setengah. 8 dibagi setengah sama dengan 16.',
          add: [T('a0', 'S∞ =', 95, 215, { size: 26, c: 'ok' }), F('a1', '8', '1 − ½', 175, 215, { size: 24, c: 'ok' }), T('a2', '=', 228, 215, { size: 26, c: 'ok' }), F('a3', '8', '½', 258, 215, { size: 24, c: 'ok' }), T('a4', '= 16', 310, 215, { size: 26, c: 'ok' })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jumlah tak hingga deret 9 + 3 + 1 + ⅓ + … adalah … (boleh pakai koma)',
      ans: ['13,5'],
      wrong: { '13': 'Masih ada ⅓ + ⅑ + … yang ditambahkan.', '27': 'r = ⅓, jadi 1 − r = ⅔. 9 ÷ ⅔ = 13,5.' },
      steps: ['a = 9, r = ⅓.', 'S∞ = 9 ÷ (1 − ⅓) = 9 ÷ ⅔ = 13,5.'],
    },
    {
      type: 'num',
      q: 'Jumlah tak hingga deret 12 − 6 + 3 − 1,5 + … adalah …',
      ans: ['8'],
      wrong: { '24': 'Rasionya −½ (tandanya bergantian), jadi 1 − r = 1,5.', '6': '12 ÷ 1,5 = 8.' },
      steps: ['a = 12, r = −6 ÷ 12 = −½.', 'S∞ = 12 ÷ (1 − (−½)) = 12 ÷ 1,5 = 8.'],
    },
    {
      type: 'num',
      q: 'Suatu deret geometri tak hingga memiliki suku pertama 5 dan jumlah 20. Rasionya adalah … (boleh ditulis sebagai pecahan)',
      ans: ['3/4'],
      wrong: { '1/4': '1 − r = ¼, jadi r = ¾.', '4': 'Rasio deret tak hingga harus di antara −1 dan 1.' },
      steps: ['5 ÷ (1 − r) = 20 → 1 − r = ¼.', 'r = ¾.'],
    },
    {
      type: 'num',
      q: 'Bola dijatuhkan dari ketinggian 6 m. Setiap memantul tingginya ½ dari tinggi sebelumnya. Panjang lintasan bola sampai berhenti adalah … m',
      ans: ['18'],
      wrong: { '12': 'Itu hanya jarak turun. Setiap pantulan naik lalu turun.', '24': 'Jatuh pertama (6 m) hanya sekali: 6 + 2 × 6.' },
      steps: ['Naik: 3 + 1,5 + … = 3 ÷ (1 − ½) = 6 m.', 'Total = 6 + 2 × 6 = 18 m.'],
    },
    {
      q: 'Deret geometri tak hingga manakah yang memiliki jumlah tertentu?',
      options: [
        { t: '20 + 10 + 5 + …', ok: true },
        { t: '1 + 2 + 4 + …', why: 'r = 2 > 1, jadi jumlahnya terus membesar.' },
        { t: '3 + 3 + 3 + …', why: 'r = 1, jumlahnya terus bertambah 3.' },
        { t: '1 − 3 + 9 − …', why: 'r = −3, sukunya makin besar (tanpa tanda).' },
      ],
      steps: ['Syarat: −1 < r < 1.', 'Hanya 20 + 10 + 5 + … yang punya r = ½.'],
    },
  ],
};

export default {
  id: 'k10b2',
  no: 2,
  title: 'Barisan dan Deret',
  desc: 'Barisan dan deret aritmetika, barisan dan deret geometri, serta deret geometri tak hingga.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: 'Rumus suku ke-n barisan 2, 5, 8, 11, … adalah …',
      options: [
        { t: 'Uₙ = 3n − 1', ok: true },
        { t: 'Uₙ = 3n + 2', why: 'Untuk n = 1 hasilnya 5, padahal U₁ = 2.' },
        { t: 'Uₙ = 2n + 3', why: 'Bedanya 3, jadi koefisien n harus 3.' },
        { t: 'Uₙ = n + 3', why: 'Bedanya 3, bukan 1.' },
      ],
      steps: ['Uₙ = 2 + (n − 1) × 3.', '= 3n − 1.'],
    },
    {
      type: 'num',
      q: 'Jumlah semua bilangan genap dari 2 sampai 100 adalah …',
      ans: ['2550'],
      wrong: { '5050': 'Itu jumlah semua bilangan 1 sampai 100. Yang genap saja ada 50 suku.', '2500': '25 × 102 = 2.550.' },
      steps: ['Ada 50 bilangan genap.', 'S₅₀ = 25 × (2 + 100) = 2.550.'],
    },
    {
      type: 'num',
      q: 'Selembar kertas dilipat dua berulang kali. Setelah 1 lipatan ada 2 lapisan, setelah 2 lipatan ada 4 lapisan. Banyak lapisan setelah 8 lipatan adalah …',
      ans: ['256'],
      wrong: { '16': 'Itu 8 × 2. Setiap lipatan menggandakan lapisan.', '128': '128 adalah setelah 7 lipatan.' },
      steps: ['Banyak lapisan = 2ⁿ.', '2⁸ = 256.'],
    },
  ],
};
