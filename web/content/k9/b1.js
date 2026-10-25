// Kelas 9 · Bab 1: Persamaan Kuadrat
import { T, box, ln, dot, range, table } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { parabola } from './curve.js';

const tile = (id, kind, x, y, o = {}) => ({ id, t: 'tile', kind, x, y, u: 18, ...o });
const U = 18;
const L = U * 3.2;

// ---------- 1.1 Mengenal persamaan kuadrat ----------
const RX = 70;
const RY = 70;
const W = 160; // x + 3: x = 110 px, 3 = 50 px
const XW = 110;
const H = 110;

const l1 = {
  id: 'k9b1-1',
  title: 'Mengenal Persamaan Kuadrat',
  hook: 'Kalau yang belum diketahui dikalikan dengan dirinya sendiri, muncul x². Itulah persamaan kuadrat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah kebun persegi panjang. Panjangnya 3 meter lebih dari lebarnya, dan luasnya 40 meter persegi. Berapa lebarnya?',
          add: [box('kb', RX + W / 2, RY + H / 2, W, H, { fill: 'ok-soft', r: 2, label: 'luas 40 m²', lsize: 16 }), T('lw', 'x', RX - 14, RY + H / 2, { size: 18 }), T('lp', 'x + 3', RX + W / 2, RY - 14, { size: 18 })],
          ask: {
            options: [
              { t: '5 m', ok: true, why: 'Panjangnya 8, dan 5 × 8 = 40.' },
              { t: '18,5 m', why: 'Ini mencari dari keliling. Luas = panjang × lebar.' },
              { t: '10 m', why: 'Kalau lebar 10, panjang 13, luasnya 130.' },
              { t: '4 m', why: 'Kalau lebar 4, panjang 7, luasnya 28.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Muncul x kuadrat',
      steps: [
        {
          say: 'Bagi kebunnya menjadi dua bagian. Bagian kiri persegi, sisinya x dan x. Luasnya x kali x, yaitu x kuadrat.',
          set: { kb: { label: '', fill: 'paper' } },
          add: [box('sq', RX + XW / 2, RY + H / 2, XW, H, { fill: 'pos-soft', r: 0, label: 'x²', lsize: 24 })],
        },
        {
          say: 'Bagian kanan persegi panjang, ukurannya x kali 3. Luasnya 3 x.',
          add: [box('st', RX + XW + (W - XW) / 2, RY + H / 2, W - XW, H, { fill: 'acc-soft', r: 0, label: '3x', lsize: 20 })],
        },
        {
          say: 'Luas seluruhnya 40. Jadi x kuadrat tambah 3 x sama dengan 40.',
          add: [T('e1', 'x² + 3x = 40', 315, 100, { size: 22 })],
        },
        {
          say: 'Pindahkan 40 ke kiri: x kuadrat tambah 3 x dikurangi 40 sama dengan 0. Persamaan dengan pangkat tertinggi 2 seperti ini disebut persamaan kuadrat.',
          add: [T('e2', 'x² + 3x − 40 = 0', 315, 145, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Bentuk umum',
      steps: [
        {
          say: 'Bentuk umum persamaan kuadrat: a x kuadrat tambah b x tambah c sama dengan 0, dengan a tidak boleh 0.',
          clear: true,
          add: [box('rb', 200, 70, 280, 50, { fill: 'acc-soft', r: 10, label: 'ax² + bx + c = 0,  a ≠ 0', lsize: 20 })],
        },
        {
          say: 'Pada x kuadrat tambah 3 x dikurangi 40 sama dengan 0: a sama dengan 1, b sama dengan 3, dan c sama dengan minus 40.',
          add: [T('e', 'x² + 3x − 40 = 0', 200, 140, { size: 26 }), T('abc', '{p:a = 1},  {a:b = 3},  {n:c = −40}', 200, 185, { size: 22 })],
        },
        {
          say: 'Kalau a sama dengan 0, x kuadratnya hilang dan persamaannya bukan kuadrat lagi.',
          add: [T('n', '0x² + 2x + 1 = 0 → 2x + 1 = 0 (linear)', 200, 240, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Akar persamaan',
      steps: [
        {
          say: 'Nilai x yang membuat persamaan benar disebut akar. Kita coba beberapa nilai x pada x kuadrat tambah 3 x.',
          clear: true,
          add: [table('tb', 200, 110, [['x', '3', '4', '5'], ['x² + 3x', '18', '28', '40']], { cw: [100, 60, 60, 60], rh: 40, size: 18, head: true })],
        },
        {
          say: 'x sama dengan 5 menghasilkan 40. Jadi 5 adalah akar. Lebar kebunnya 5 meter dan panjangnya 8 meter.',
          set: { tb: { hl: [[0, 3], [1, 3]] } },
          add: [T('r', 'x = 5 ✓  →  lebar 5 m, panjang 8 m', 200, 190, { size: 20, c: 'ok' })],
        },
        {
          say: 'Persamaan kuadrat bisa punya dua akar. Di sini x sama dengan minus 8 juga benar: 64 dikurangi 24 sama dengan 40. Tapi lebar tidak mungkin negatif, jadi untuk kebun kita pakai 5.',
          add: [T('r2', 'x = −8 juga akar: 64 − 24 = 40', 200, 235, { size: 17, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Manakah akar dari x kuadrat dikurangi 5 x tambah 6 sama dengan 0?',
          clear: true,
          add: [T('q', 'x² − 5x + 6 = 0', 200, 120, { size: 34 })],
          ask: {
            options: [
              { t: 'x = 2', ok: true, why: '4 − 10 + 6 = 0.' },
              { t: 'x = 1', why: '1 − 5 + 6 = 2, bukan 0.' },
              { t: 'x = 5', why: '25 − 25 + 6 = 6, bukan 0.' },
              { t: 'x = 6', why: '36 − 30 + 6 = 12, bukan 0.' },
            ],
          },
        },
        {
          say: 'Masukkan x sama dengan 2: 4 dikurangi 10 tambah 6 sama dengan 0. Benar. Akar yang lain adalah 3.',
          clear: true,
          add: [T('a', 'x = 2: 4 − 10 + 6 = 0 ✓', 200, 90, { size: 26, c: 'ok' }), T('b', 'x = 3: 9 − 15 + 6 = 0 ✓', 200, 140, { size: 22, c: 'mut' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Manakah yang merupakan persamaan kuadrat?',
      options: [
        { t: '2x² − 7 = 0', ok: true },
        { t: '3x + 5 = 0', why: 'Pangkat tertinggi x adalah 1, jadi linear.' },
        { t: 'x³ + x = 0', why: 'Pangkat tertingginya 3.' },
        { t: '4x − 1 = 2x', why: 'Tidak ada x², jadi linear.' },
      ],
      steps: ['Persamaan kuadrat: pangkat tertinggi variabel adalah 2.', '2x² − 7 = 0 memenuhi.'],
    },
    {
      q: 'Pada persamaan 3x² − x + 8 = 0, nilai a, b, dan c berturut-turut adalah …',
      options: [
        { t: '3, −1, 8', ok: true },
        { t: '3, 1, 8', why: '−x berarti b = −1.' },
        { t: '3, 0, 8', why: 'Ada suku −x, jadi b = −1.' },
        { t: '8, −1, 3', why: 'a adalah koefisien x², yaitu 3.' },
      ],
      steps: ['a = koefisien x² = 3.', 'b = koefisien x = −1, c = 8.'],
    },
    {
      type: 'num',
      q: 'Salah satu akar x² + kx − 10 = 0 adalah x = 2. Nilai k adalah …',
      ans: ['3'],
      wrong: { '-3': '4 + 2k − 10 = 0 → 2k = 6 → k = 3.', '7': '4 + 2k − 10 = 0, jadi 2k = 6.' },
      steps: ['Masukkan x = 2: 4 + 2k − 10 = 0.', '2k = 6 → k = 3.'],
    },
    {
      q: 'Bentuk umum dari x(x + 4) = 12 adalah …',
      options: [
        { t: 'x² + 4x − 12 = 0', ok: true },
        { t: 'x² + 4 − 12 = 0', why: 'x × 4 = 4x, bukan 4.' },
        { t: 'x² + 4x + 12 = 0', why: 'Saat dipindah ke kiri, 12 menjadi −12.' },
        { t: '2x + 4 − 12 = 0', why: 'x × x = x², bukan 2x.' },
      ],
      steps: ['x(x + 4) = x² + 4x.', 'x² + 4x = 12 → x² + 4x − 12 = 0.'],
    },
    {
      q: 'Bilangan manakah yang merupakan akar dari x² − 9 = 0?',
      options: [
        { t: '3 dan −3', ok: true },
        { t: '3 saja', why: '(−3)² = 9 juga, jadi −3 juga akar.' },
        { t: '9 dan −9', why: '9² = 81, bukan 9.' },
        { t: '4,5', why: '4,5² = 20,25.' },
      ],
      steps: ['x² = 9.', 'x = 3 atau x = −3, karena keduanya jika dikuadratkan hasilnya 9.'],
    },
  ],
};

// ---------- 1.2 Faktorisasi ----------
const OX = 50;
const OY = 45;
const arr = {
  q0: { x: OX + L / 2, y: OY + L / 2 },
  ...Object.fromEntries(range(0, 3).map((j) => [`v${j}`, { x: OX + L + U / 2 + j * U, y: OY + L / 2 }])),
  ...Object.fromEntries(range(0, 2).map((i) => [`h${i}`, { x: OX + L / 2, y: OY + L + U / 2 + i * U }])),
  ...Object.fromEntries(range(0, 6).map((k) => [`u${k}`, { x: OX + L + U / 2 + (k % 3) * U, y: OY + L + U / 2 + Math.floor(k / 3) * U }])),
};

const l2 = {
  id: 'k9b1-2',
  title: 'Menyelesaikan dengan Pemfaktoran',
  hook: 'Susun ubin x², x, dan 1 menjadi persegi panjang. Panjang dan lebarnya adalah faktornya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'x kuadrat tambah 5 x tambah 6 bisa ditulis sebagai perkalian dua kurung. Yang mana?',
          add: [T('q', 'x² + 5x + 6 = ( … )( … )', 200, 120, { size: 28 })],
          ask: {
            options: [
              { t: '(x + 2)(x + 3)', ok: true, why: '2 × 3 = 6 dan 2 + 3 = 5.' },
              { t: '(x + 1)(x + 6)', why: '1 × 6 = 6, tapi 1 + 6 = 7, bukan 5.' },
              { t: '(x + 5)(x + 6)', why: 'Hasilnya x² + 11x + 30.' },
              { t: '(x − 2)(x − 3)', why: 'Hasilnya x² − 5x + 6. Tanda tengahnya minus.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ubin menjadi persegi panjang',
      steps: [
        {
          say: 'Siapkan ubin: satu x kuadrat, lima x, dan enam satuan.',
          clear: true,
          add: [
            tile('q0', 'x2', 60, 200),
            ...range(0, 3).map((j) => tile(`v${j}`, 'x', 120 + j * 22, 200, { vert: true })),
            ...range(0, 2).map((i) => tile(`h${i}`, 'x', 230, 180 + i * 26)),
            ...range(0, 6).map((k) => tile(`u${k}`, '1', 290 + (k % 3) * 24, 188 + Math.floor(k / 3) * 24)),
            T('e', 'x² + 5x + 6', 200, 270, { size: 22 }),
          ],
        },
        {
          say: 'Susun menjadi persegi panjang: x kuadrat di pojok, tiga x di kanan, dua x di bawah, dan enam satuan di pojok kanan bawah.',
          set: arr,
        },
        {
          say: 'Lebarnya x tambah 3, tingginya x tambah 2. Jadi x kuadrat tambah 5 x tambah 6 sama dengan x tambah 2 dikali x tambah 3.',
          add: [T('tw', 'x', OX + L / 2, OY - 14, { size: 17 }), T('tw2', '+3', OX + L + 1.5 * U, OY - 14, { size: 17, c: 'acc' }), T('th', 'x', OX - 14, OY + L / 2, { size: 17 }), T('th2', '+2', OX - 16, OY + L + U, { size: 17, c: 'acc' }), T('r', '= (x + 2)(x + 3)', 300, 90, { size: 22, c: 'ok' })],
          del: ['e'],
        },
      ],
    },
    {
      title: 'Cara cepat',
      steps: [
        {
          say: 'Cara cepat untuk x kuadrat tambah b x tambah c: cari dua bilangan yang hasil kalinya c dan jumlahnya b.',
          clear: true,
          add: [box('rb', 200, 50, 340, 44, { fill: 'acc-soft', r: 10, label: 'dua bilangan: kali = c, jumlah = b', lsize: 17 })],
        },
        {
          say: 'Contoh x kuadrat tambah x dikurangi 12. Hasil kali minus 12, jumlah 1. Coba pasangan faktor 12.',
          add: [T('e', 'x² + x − 12', 200, 105, { size: 26 }), table('tb', 200, 175, [['pasangan', 'kali', 'jumlah'], ['−3 dan 4', '−12', '1 ✓'], ['3 dan −4', '−12', '−1'], ['−2 dan 6', '−12', '4']], { cw: [110, 70, 80], rh: 28, size: 15, head: true, hl: [[1, 0], [1, 2]] })],
        },
        {
          say: 'Pasangannya minus 3 dan 4. Jadi x kuadrat tambah x dikurangi 12 sama dengan x dikurangi 3 dikali x tambah 4.',
          add: [T('r', '= (x − 3)(x + 4)', 200, 260, { size: 24, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Hasil kali nol',
      steps: [
        {
          say: 'Sekarang selesaikan x dikurangi 3 dikali x tambah 4 sama dengan 0. Kalau dua bilangan dikalikan hasilnya 0, salah satunya pasti 0.',
          clear: true,
          add: [T('a', '(x − 3)(x + 4) = 0', 200, 60, { size: 28 })],
        },
        {
          say: 'Jadi x dikurangi 3 sama dengan 0, atau x tambah 4 sama dengan 0.',
          add: [T('b1', 'x − 3 = 0', 120, 125, { size: 24 }), T('or', 'atau', 200, 125, { size: 16, c: 'mut' }), T('b2', 'x + 4 = 0', 280, 125, { size: 24 })],
        },
        {
          say: 'Akarnya x sama dengan 3 atau x sama dengan minus 4.',
          add: [T('c1', 'x = {a:3}', 120, 175, { size: 26 }), T('c2', 'x = {a:−4}', 280, 175, { size: 26 })],
        },
        {
          say: 'Cek x sama dengan 3: 9 tambah 3 dikurangi 12 sama dengan 0. Benar.',
          add: [T('d', 'cek: 3² + 3 − 12 = 0 ✓', 200, 235, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Bentuk khusus',
      steps: [
        {
          say: 'Kalau tidak ada c, keluarkan x. x kuadrat dikurangi 4 x sama dengan x dikali x dikurangi 4. Akarnya 0 dan 4.',
          clear: true,
          add: [T('a', 'x² − 4x = x(x − 4) = 0', 200, 70, { size: 24 }), T('a2', 'x = 0 atau x = 4', 200, 110, { size: 20, c: 'acc' })],
        },
        {
          say: 'Selisih dua kuadrat: x kuadrat dikurangi 9 sama dengan x dikurangi 3 dikali x tambah 3. Akarnya 3 dan minus 3.',
          add: [T('b', 'x² − 9 = (x − 3)(x + 3) = 0', 200, 170, { size: 22 }), T('b2', 'x = 3 atau x = −3', 200, 210, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Selesaikan x kuadrat dikurangi 7 x tambah 10 sama dengan 0.',
          clear: true,
          add: [T('q', 'x² − 7x + 10 = 0', 200, 120, { size: 34 })],
          ask: {
            options: [
              { t: 'x = 2 atau x = 5', ok: true, why: '(x − 2)(x − 5) = 0.' },
              { t: 'x = −2 atau x = −5', why: '(x + 2)(x + 5) = x² + 7x + 10. Tandanya terbalik.' },
              { t: 'x = 1 atau x = 10', why: '1 + 10 = 11, bukan 7.' },
              { t: 'x = 7 atau x = 10', why: 'Cari dua bilangan: kali 10, jumlah −7.' },
            ],
          },
        },
        {
          say: 'Dua bilangan yang hasil kalinya 10 dan jumlahnya minus 7: minus 2 dan minus 5. Jadi x dikurangi 2 dikali x dikurangi 5 sama dengan 0. Akarnya 2 dan 5.',
          clear: true,
          add: [T('a', '(−2) × (−5) = 10,  (−2) + (−5) = −7', 200, 80, { size: 18 }), T('b', '(x − 2)(x − 5) = 0', 200, 135, { size: 28 }), T('c', 'x = {a:2} atau x = {a:5}', 200, 190, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bentuk faktor dari x² + 7x + 12 adalah …',
      options: [
        { t: '(x + 3)(x + 4)', ok: true },
        { t: '(x + 2)(x + 6)', why: '2 + 6 = 8, bukan 7.' },
        { t: '(x + 1)(x + 12)', why: '1 + 12 = 13.' },
        { t: '(x − 3)(x − 4)', why: 'Hasilnya x² − 7x + 12.' },
      ],
      steps: ['Kali 12, jumlah 7: 3 dan 4.', 'x² + 7x + 12 = (x + 3)(x + 4).'],
    },
    {
      q: 'Akar-akar dari x² − 2x − 15 = 0 adalah …',
      options: [
        { t: '5 dan −3', ok: true },
        { t: '−5 dan 3', why: '(x + 5)(x − 3) = x² + 2x − 15. Tanda tengahnya beda.' },
        { t: '15 dan −1', why: '15 + (−1) = 14, bukan −2.' },
        { t: '3 dan 5', why: '3 × 5 = 15, bukan −15.' },
      ],
      steps: ['Kali −15, jumlah −2: −5 dan 3.', '(x − 5)(x + 3) = 0 → x = 5 atau x = −3.'],
    },
    {
      q: 'Akar-akar dari x² − 6x = 0 adalah …',
      options: [
        { t: '0 dan 6', ok: true },
        { t: '6 saja', why: 'x = 0 juga membuat x² − 6x = 0.' },
        { t: '−6 dan 6', why: 'x(x − 6) = 0 → x = 0 atau x = 6.' },
        { t: '0 dan −6', why: 'x − 6 = 0 → x = 6.' },
      ],
      steps: ['x² − 6x = x(x − 6).', 'x = 0 atau x = 6.'],
    },
    {
      type: 'num',
      q: 'Akar positif dari x² − 49 = 0 adalah …',
      ans: ['7'],
      wrong: { '49': 'x² = 49, jadi x = √49.', '24.5': 'Bukan dibagi 2. x² = 49 → x = 7.' },
      steps: ['x² − 49 = (x − 7)(x + 7) = 0.', 'Akar positif: 7.'],
    },
    {
      type: 'num',
      q: 'Hasil kali dua bilangan bulat positif berurutan adalah 56. Bilangan yang lebih kecil adalah …',
      ans: ['7'],
      wrong: { '8': '8 adalah bilangan yang lebih besar.', '28': 'n(n + 1) = 56. Coba 7 × 8.' },
      steps: ['n(n + 1) = 56 → n² + n − 56 = 0.', '(n + 8)(n − 7) = 0 → n = 7 (positif).'],
    },
  ],
};

// ---------- 1.3 Rumus kuadrat dan diskriminan ----------
const CF = { x: 50, y: 30, w: 300, h: 220, xmin: -2, xmax: 4, ymin: -4, ymax: 6 };
const PL = plane('pl', CF);

const l3 = {
  id: 'k9b1-3',
  title: 'Rumus Kuadrat dan Diskriminan',
  hook: 'Kalau sulit difaktorkan, pakai rumus kuadrat. Diskriminan memberi tahu ada berapa akar sebelum menghitung.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'x kuadrat tambah 3 x tambah 1 sama dengan 0. Bisakah difaktorkan dengan bilangan bulat?',
          add: [T('q', 'x² + 3x + 1 = 0', 200, 120, { size: 34 })],
          ask: {
            options: [
              { t: 'Tidak bisa', ok: true, why: 'Kali 1 dan jumlah 3: tidak ada pasangan bilangan bulat. Kita perlu cara lain.' },
              { t: 'Bisa: (x + 1)(x + 3)', why: '(x + 1)(x + 3) = x² + 4x + 3.' },
              { t: 'Bisa: (x + 1)(x + 2)', why: '(x + 1)(x + 2) = x² + 3x + 2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Rumus kuadrat',
      steps: [
        {
          say: 'Untuk a x kuadrat tambah b x tambah c sama dengan 0, akarnya bisa dihitung dengan rumus ini. Sering disebut rumus ABC.',
          clear: true,
          add: [box('rb', 200, 75, 300, 70, { fill: 'acc-soft', r: 12 }), T('f1', 'x = −b ± √(b² − 4ac)', 200, 62, { size: 22 }), ln('fl', 90, 80, 310, 80, { sw: 2, draw: false }), T('f2', '2a', 200, 96, { size: 20 })],
        },
        {
          say: 'Contoh: 2 x kuadrat tambah 3 x dikurangi 2 sama dengan 0. a sama dengan 2, b sama dengan 3, c sama dengan minus 2.',
          add: [T('e', '2x² + 3x − 2 = 0', 200, 150, { size: 22 }), T('abc', '{p:a = 2},  {a:b = 3},  {n:c = −2}', 200, 180, { size: 18 })],
        },
        {
          say: 'b kuadrat dikurangi 4 a c: 9 dikurangi 4 kali 2 kali minus 2, yaitu 9 tambah 16, sama dengan 25. Akar 25 sama dengan 5.',
          add: [T('d', 'b² − 4ac = 9 + 16 = 25,  √25 = 5', 200, 215, { size: 18 })],
        },
        {
          say: 'x sama dengan minus 3 tambah atau kurang 5, dibagi 4. Hasilnya setengah, atau minus 2.',
          add: [T('r', 'x = (−3 ± 5) ÷ 4 → x = {a:½} atau x = {a:−2}', 200, 255, { size: 18 })],
        },
      ],
    },
    {
      title: 'Diskriminan',
      steps: [
        {
          say: 'Bagian di bawah akar, b kuadrat dikurangi 4 a c, disebut diskriminan, ditulis D. Nilainya menentukan banyak akar.',
          clear: true,
          add: [...PL.els, box('rb', 200, 18, 230, 30, { fill: 'acc-soft', r: 8, label: 'D = b² − 4ac', lsize: 17, z: 3 })],
        },
        {
          say: 'Kalau D positif, ada dua akar. Grafiknya memotong sumbu x di dua titik. Contoh x kuadrat dikurangi 2 x dikurangi 3: D sama dengan 16.',
          add: [parabola('p1', PL, 1, -2, -3, CF, { stroke: 'ok' }), dot('r1', ...PL.at(-1, 0), 'ok'), dot('r2', ...PL.at(3, 0), 'ok'), box('t1', 315, 238, 150, 26, { fill: 'paper', stroke: 'none', sw: 0, label: 'D = 16 > 0: dua akar', lsize: 14, lc: 'ok', z: 3 })],
        },
        {
          say: 'Kalau D sama dengan 0, hanya ada satu akar. Grafiknya menyentuh sumbu x. Contoh x kuadrat dikurangi 2 x tambah 1.',
          del: ['p1', 'r1', 'r2', 't1'],
          add: [parabola('p2', PL, 1, -2, 1, CF, { stroke: 'acc' }), dot('r3', ...PL.at(1, 0), 'acc'), box('t2', 315, 238, 150, 26, { fill: 'paper', stroke: 'none', sw: 0, label: 'D = 0: satu akar', lsize: 14, lc: 'acc', z: 3 })],
        },
        {
          say: 'Kalau D negatif, tidak ada akar bilangan real. Grafiknya tidak menyentuh sumbu x sama sekali. Contoh x kuadrat dikurangi 2 x tambah 3.',
          del: ['p2', 'r3', 't2'],
          add: [parabola('p3', PL, 1, -2, 3, CF, { stroke: 'neg' }), box('t3', 315, 238, 160, 26, { fill: 'paper', stroke: 'none', sw: 0, label: 'D = −8 < 0: tidak ada', lsize: 14, lc: 'neg', z: 3 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Persamaan x kuadrat tambah 4 x tambah 4 sama dengan 0 memiliki berapa akar?',
          clear: true,
          add: [T('q', 'x² + 4x + 4 = 0', 200, 110, { size: 34 }), T('q2', 'banyak akar = ?', 200, 170, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: 'satu akar', ok: true, why: 'D = 16 − 16 = 0.' },
              { t: 'dua akar', why: 'D = 4² − 4 × 1 × 4 = 0, bukan positif.' },
              { t: 'tidak ada akar', why: 'D = 0, bukan negatif.' },
            ],
          },
        },
        {
          say: 'D sama dengan 4 kuadrat dikurangi 4 kali 1 kali 4, yaitu 16 dikurangi 16, sama dengan 0. Jadi satu akar: x sama dengan minus 2. Memang x tambah 2 dikuadratkan.',
          clear: true,
          add: [T('a', 'D = 16 − 16 = 0', 200, 90, { size: 28 }), T('b', '(x + 2)² = 0 → x = {a:−2}', 200, 150, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Diskriminan dari x² − 5x + 4 = 0 adalah …',
      ans: ['9'],
      wrong: { '41': 'b² − 4ac = 25 − 16, bukan 25 + 16.', '-9': '(−5)² = 25, positif.' },
      steps: ['a = 1, b = −5, c = 4.', 'D = 25 − 16 = 9.'],
    },
    {
      q: 'Persamaan x² + 2x + 5 = 0 memiliki …',
      options: [
        { t: 'tidak ada akar real', ok: true },
        { t: 'dua akar berbeda', why: 'D = 4 − 20 = −16, negatif.' },
        { t: 'satu akar', why: 'D = −16, bukan 0.' },
        { t: 'akar x = −5', why: '25 − 10 + 5 = 20, bukan 0.' },
      ],
      steps: ['D = 2² − 4 × 1 × 5 = 4 − 20 = −16.', 'D < 0 → tidak ada akar real.'],
    },
    {
      q: 'Akar-akar dari x² − 4x + 1 = 0 adalah …',
      options: [
        { t: '2 ± √3', ok: true },
        { t: '4 ± √3', why: 'Bagi juga dengan 2a = 2: (4 ± 2√3) ÷ 2.' },
        { t: '−2 ± √3', why: '−b = 4, bukan −4.' },
        { t: '2 ± √12', why: '√12 = 2√3, lalu dibagi 2 menjadi √3.' },
      ],
      steps: ['D = 16 − 4 = 12, √12 = 2√3.', 'x = (4 ± 2√3) ÷ 2 = 2 ± √3.'],
    },
    {
      type: 'num',
      q: 'Persamaan x² + 6x + k = 0 memiliki tepat satu akar. Nilai k adalah …',
      ans: ['9'],
      wrong: { '36': 'D = 36 − 4k = 0 → k = 9.', '3': 'D = 0 → 4k = 36 → k = 9.' },
      steps: ['Satu akar → D = 0.', '36 − 4k = 0 → k = 9.'],
    },
    {
      q: 'Akar-akar dari 2x² − 5x − 3 = 0 adalah …',
      options: [
        { t: '3 dan −½', ok: true },
        { t: '−3 dan ½', why: '−b = 5. x = (5 ± 7) ÷ 4.' },
        { t: '6 dan −1', why: 'Bagi dengan 2a = 4, bukan 2.' },
        { t: '3 dan ½', why: '(5 − 7) ÷ 4 = −½.' },
      ],
      steps: ['D = 25 + 24 = 49, √49 = 7.', 'x = (5 ± 7) ÷ 4 → 3 atau −½.'],
    },
  ],
};

export default {
  id: 'k9b1',
  no: 1,
  title: 'Persamaan Kuadrat',
  desc: 'Bentuk persamaan kuadrat, akar, pemfaktoran dengan ubin aljabar, rumus kuadrat, dan diskriminan.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Sebuah persegi panjang memiliki panjang 2 cm lebih dari lebarnya dan luasnya 48 cm². Lebarnya adalah … cm',
      ans: ['6'],
      wrong: { '8': '8 adalah panjangnya.', '-8': 'Lebar tidak mungkin negatif.' },
      steps: ['l(l + 2) = 48 → l² + 2l − 48 = 0.', '(l + 8)(l − 6) = 0 → l = 6.'],
    },
    {
      q: 'Jika p dan q akar-akar dari x² − 8x + 15 = 0, maka p + q = …',
      options: [
        { t: '8', ok: true },
        { t: '15', why: '15 adalah p × q.' },
        { t: '−8', why: 'Akarnya 3 dan 5, jumlahnya 8.' },
        { t: '2', why: '5 − 3 = 2 adalah selisihnya.' },
      ],
      steps: ['(x − 3)(x − 5) = 0 → akar 3 dan 5.', 'p + q = 8.'],
    },
    {
      q: 'Persamaan kuadrat yang akar-akarnya 2 dan −4 adalah …',
      options: [
        { t: 'x² + 2x − 8 = 0', ok: true },
        { t: 'x² − 2x − 8 = 0', why: '(x − 2)(x + 4) = x² + 2x − 8.' },
        { t: 'x² + 2x + 8 = 0', why: '2 × (−4) = −8.' },
        { t: 'x² − 6x + 8 = 0', why: 'Itu untuk akar 2 dan 4.' },
      ],
      steps: ['(x − 2)(x + 4) = 0.', 'x² + 4x − 2x − 8 = x² + 2x − 8.'],
    },
  ],
};
