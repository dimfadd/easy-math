// Kelas 11 Tingkat Lanjut · Bab 2: Polinomial
import { T, ln, dot, box, table } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag, curve } from '../k10/kit.js';

// ---------- 2.1 Polinomial dan fungsi polinomial ----------
const CG = { x: 60, y: 25, w: 280, h: 230, xmin: -3, xmax: 3, ymin: -6, ymax: 6 };
const PG = plane('pl', { ...CG, ystep: 1, yevery: 2 });

const l1 = {
  id: 'k11lb2-1',
  title: 'Polinomial dan Derajatnya',
  hook: 'Polinomial adalah jumlah suku-suku berbentuk angka kali x berpangkat bilangan cacah. Pangkat tertingginya menentukan bentuk grafiknya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Manakah yang termasuk polinomial?',
          add: [T('a', '3x² − 5x + 1', 110, 90, { size: 22 }), T('b', '1/x + 2', 290, 90, { size: 22 }), T('c', '√x − 4', 110, 160, { size: 22 }), T('d', '2ˣ + 1', 290, 160, { size: 22 })],
          ask: {
            options: [
              { t: '3x² − 5x + 1', ok: true, why: 'Pangkat x-nya 2, 1, dan 0, semuanya bilangan cacah.' },
              { t: '1/x + 2', why: '1/x = x⁻¹. Pangkat negatif tidak boleh.' },
              { t: '√x − 4', why: '√x = x^½. Pangkat pecahan tidak boleh.' },
              { t: '2ˣ + 1', why: 'x ada di pangkat. Itu fungsi eksponen.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bagian-bagian polinomial',
      steps: [
        {
          say: 'Ambil polinomial 4x pangkat 3 dikurangi 2x kuadrat tambah 7x dikurangi 5.',
          clear: true,
          add: [T('p', '4x³ − 2x² + 7x − 5', 200, 70, { size: 36 })],
        },
        {
          say: 'Pangkat tertinggi x adalah 3. Itu disebut derajat polinomial. Polinomial berderajat 3 disebut polinomial kubik.',
          add: [T('a', 'derajat = 3', 200, 135, { size: 22, c: 'pos' })],
        },
        {
          say: 'Angka di depan suku berpangkat tertinggi disebut koefisien utama, yaitu 4. Suku tanpa x disebut suku tetap atau konstanta, yaitu minus 5.',
          add: [T('b', 'koefisien utama = 4', 200, 175, { size: 20, c: 'acc' }), T('c', 'suku tetap = −5', 200, 210, { size: 20, c: 'neg' })],
        },
        {
          say: 'Koefisien x kuadrat adalah minus 2, dan koefisien x adalah 7. Tanda minus ikut menjadi bagian koefisien.',
          add: [T('d', 'koefisien x² = −2,  koefisien x = 7', 200, 255, { size: 17, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Derajat dan bentuk grafik',
      steps: [
        {
          say: 'Derajat 1: grafiknya garis lurus, contohnya y sama dengan x.',
          clear: true,
          add: [...PG.els, curve('g', PG, (x) => x, CG), tag('e', 'y = x  (derajat 1)', 270, 40, 'pos', 14)],
        },
        {
          say: 'Derajat 2: parabola, dengan satu kali berbelok. Contohnya y sama dengan x kuadrat dikurangi 2.',
          set: { g: curve('g', PG, (x) => x * x - 2, CG, { stroke: 'acc' }), e: tag('e', 'y = x² − 2  (derajat 2)', 270, 40, 'acc', 14) },
        },
        {
          say: 'Derajat 3: grafik bisa berbelok dua kali, seperti huruf S. Contohnya y sama dengan x pangkat 3 dikurangi 3x. Grafik ini memotong sumbu x di tiga titik.',
          set: { g: curve('g', PG, (x) => x ** 3 - 3 * x, CG, { stroke: 'neg' }), e: tag('e', 'y = x³ − 3x  (derajat 3)', 270, 40, 'neg', 14) },
          add: [dot('r1', ...PG.at(-Math.sqrt(3), 0), 'ok', { r: 5 }), dot('r2', ...PG.at(0, 0), 'ok', { r: 5 }), dot('r3', ...PG.at(Math.sqrt(3), 0), 'ok', { r: 5 })],
        },
        {
          say: 'Aturannya: polinomial berderajat n paling banyak memotong sumbu x di n titik, dan paling banyak berbelok n dikurangi 1 kali.',
          add: [tag('k', 'derajat n: ≤ n titik potong, ≤ n − 1 belokan', 200, 282, 'ink', 13)],
        },
      ],
    },
    {
      title: 'Nilai fungsi polinomial',
      steps: [
        {
          say: 'Nilai polinomial dihitung dengan substitusi. f dari x sama dengan x pangkat 3 dikurangi 2x tambah 1. Berapa f dari 2?',
          clear: true,
          add: [T('a', 'f(x) = x³ − 2x + 1', 200, 70, { size: 28 })],
        },
        {
          say: 'Ganti setiap x dengan 2: 8 dikurangi 4 tambah 1, yaitu 5.',
          add: [T('b', 'f(2) = 2³ − 2·2 + 1', 200, 130, { size: 24 }), T('c', '= 8 − 4 + 1 = {g:5}', 200, 180, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa derajat polinomial hasil kali x kuadrat tambah 1, dengan x pangkat 3 dikurangi x?',
          clear: true,
          add: [T('q', '(x² + 1)(x³ − x)', 200, 110, { size: 34 }), T('q2', 'derajat = ?', 200, 170, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '5', ok: true, why: 'Suku berpangkat tertinggi: x² × x³ = x⁵.' },
              { t: '6', why: 'Pangkat dijumlah saat dikali: 2 + 3 = 5, bukan 2 × 3.' },
              { t: '3', why: 'Hasil kalinya punya suku x⁵.' },
              { t: '2', why: 'Lihat suku tertinggi setelah dikalikan.' },
            ],
          },
        },
        {
          say: 'Suku tertinggi berasal dari x kuadrat kali x pangkat 3, yaitu x pangkat 5. Derajatnya 5.',
          add: [T('a', 'x² × x³ = x⁵  →  derajat {g:5}', 200, 230, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Derajat polinomial 2x⁵ − x + 3 adalah …',
      ans: ['5'],
      wrong: { '2': '2 adalah koefisien utama. Derajat adalah pangkat tertinggi.', '3': '3 adalah suku tetap.' },
      steps: ['Pangkat tertinggi x adalah 5.'],
    },
    {
      type: 'num',
      q: 'Koefisien x² dalam 3x³ − 4x² + x adalah …',
      ans: ['-4'],
      wrong: { '4': 'Tanda minus ikut menjadi bagian koefisien.', '3': '3 adalah koefisien x³.' },
      steps: ['Suku x²: −4x².', 'Koefisiennya −4.'],
    },
    {
      type: 'num',
      q: 'Jika f(x) = x³ + 2x² − x + 3, nilai f(−1) adalah …',
      ans: ['5'],
      wrong: { '1': '(−1)³ = −1, 2(−1)² = 2, −(−1) = 1. −1 + 2 + 1 + 3 = 5.', '3': 'Hitung setiap suku: −1 + 2 + 1 + 3.' },
      steps: ['−1 + 2 + 1 + 3.', '= 5.'],
    },
    {
      type: 'num',
      q: 'Suku tetap dari (x + 2)(x − 3) adalah …',
      ans: ['-6'],
      wrong: { '-1': '−1 adalah koefisien x. Suku tetap = 2 × (−3).', '6': '2 × (−3) = −6.' },
      steps: ['Suku tetap = hasil kali suku-suku tetap.', '2 × (−3) = −6.'],
    },
    {
      q: 'Manakah yang bukan polinomial?',
      options: [
        { t: 'x² + 3/x', ok: true },
        { t: '5', why: '5 = 5x⁰ adalah polinomial berderajat 0.' },
        { t: 'x⁴ − 1', why: 'Pangkatnya 4 dan 0, keduanya bilangan cacah.' },
        { t: '½x + 7', why: 'Koefisien boleh pecahan. Yang tidak boleh pangkat pecahan atau negatif.' },
      ],
      steps: ['3/x = 3x⁻¹, pangkat negatif.', 'Jadi x² + 3/x bukan polinomial.'],
    },
  ],
};

// ---------- 2.2 Operasi polinomial ----------
const GX = [180, 255, 330];
const GY = [130, 185];
const cell = (id, r, c, text, o = {}) => box(id, GX[c], GY[r], 72, 50, { r: 0, fill: 'paper', sw: 1.5, label: text, lsize: 17, ...o });

const l2 = {
  id: 'k11lb2-2',
  title: 'Operasi pada Polinomial',
  hook: 'Polinomial dijumlah dengan menggabungkan suku sejenis, dan dikali dengan mengalikan setiap suku. Tabel membuat perkalian rapi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '2x kuadrat tambah 3x dikurangi 1, ditambah x kuadrat dikurangi 5x tambah 4, sama dengan …',
          add: [T('q', '(2x² + 3x − 1) + (x² − 5x + 4)', 200, 120, { size: 24 })],
          ask: {
            options: [
              { t: '3x² − 2x + 3', ok: true, why: 'x²: 2 + 1 = 3. x: 3 − 5 = −2. Tetap: −1 + 4 = 3.' },
              { t: '3x² + 8x + 3', why: '3x + (−5x) = −2x.' },
              { t: '3x⁴ − 2x² + 3', why: 'Saat dijumlah, pangkat tidak berubah.' },
              { t: '4x', why: 'Suku yang tidak sejenis tidak bisa digabung.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jumlah dan selisih',
      steps: [
        {
          say: 'Susun suku sejenis dalam kolom yang sama: kolom x kuadrat, kolom x, dan kolom suku tetap.',
          clear: true,
          add: [table('tb', 200, 110, [['', 'x²', 'x', 'tetap'], ['pertama', '2', '3', '−1'], ['kedua', '1', '−5', '4']], { cw: [90, 70, 70, 70], rh: 36, size: 18, head: true })],
        },
        {
          say: 'Jumlahkan setiap kolom: 3, minus 2, dan 3. Hasilnya 3x kuadrat dikurangi 2x tambah 3.',
          add: [T('a', 'jumlah:   3x²  −  2x  +  3', 200, 200, { size: 22, c: 'ok' })],
        },
        {
          say: 'Untuk pengurangan, ganti tanda semua suku polinomial kedua, lalu jumlahkan. Hasil yang pertama dikurangi yang kedua: x kuadrat tambah 8x dikurangi 5.',
          add: [T('b', 'selisih: x² + 8x − 5', 200, 245, { size: 20, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Perkalian dengan tabel',
      steps: [
        {
          say: 'Kalikan x tambah 2 dengan x kuadrat dikurangi x tambah 3. Tulis suku-suku yang satu di samping, yang lain di atas.',
          clear: true,
          add: [T('q', '(x + 2)(x² − x + 3)', 200, 40, { size: 24 }), ...['x²', '−x', '3'].map((v, c) => T(`h${c}`, v, GX[c], 88, { size: 18, c: 'pos' })), ...['x', '2'].map((v, r) => T(`v${r}`, v, 120, GY[r], { size: 18, c: 'acc' })), ...[0, 1].flatMap((r) => [0, 1, 2].map((c) => cell(`c${r}${c}`, r, c, ' ')))],
        },
        {
          say: 'Isi setiap kotak dengan hasil kali judulnya. Baris x: x pangkat 3, minus x kuadrat, 3x.',
          set: { c00: cell('c00', 0, 0, 'x³'), c01: cell('c01', 0, 1, '−x²'), c02: cell('c02', 0, 2, '3x') },
        },
        {
          say: 'Baris 2: 2x kuadrat, minus 2x, 6.',
          set: { c10: cell('c10', 1, 0, '2x²'), c11: cell('c11', 1, 1, '−2x'), c12: cell('c12', 1, 2, '6') },
        },
        {
          say: 'Gabungkan suku sejenis. Minus x kuadrat tambah 2x kuadrat sama dengan x kuadrat. 3x dikurangi 2x sama dengan x. Hasilnya x pangkat 3 tambah x kuadrat tambah x tambah 6.',
          set: { c01: cell('c01', 0, 1, '−x²', { fill: 'acc-soft' }), c10: cell('c10', 1, 0, '2x²', { fill: 'acc-soft' }), c02: cell('c02', 0, 2, '3x', { fill: 'ok-soft' }), c11: cell('c11', 1, 1, '−2x', { fill: 'ok-soft' }) },
          add: [T('r', '= x³ + x² + x + 6', 200, 250, { size: 26, c: 'ok' })],
        },
        {
          say: 'Perhatikan derajatnya: derajat 1 kali derajat 2 menghasilkan derajat 3. Saat dikali, derajatnya dijumlahkan.',
          add: [T('k', 'derajat: 1 + 2 = 3', 200, 282, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. x dikurangi 1, dikali x kuadrat tambah x tambah 1, sama dengan …',
          clear: true,
          add: [T('q', '(x − 1)(x² + x + 1) = ?', 200, 110, { size: 30 })],
          ask: {
            options: [
              { t: 'x³ − 1', ok: true, why: 'x³ + x² + x − x² − x − 1. Suku tengahnya saling hapus.' },
              { t: 'x³ + 1', why: 'Suku tetapnya (−1) × 1 = −1.' },
              { t: 'x³ − 2x² − 1', why: 'x² − x² = 0, bukan −2x².' },
              { t: 'x² − 1', why: 'Derajatnya 1 + 2 = 3.' },
            ],
          },
        },
        {
          say: 'Baris x: x pangkat 3, x kuadrat, x. Baris minus 1: minus x kuadrat, minus x, minus 1. Suku tengah saling menghapus. Hasilnya x pangkat 3 dikurangi 1.',
          add: [T('a', 'x³ + x² + x − x² − x − 1', 200, 180, { size: 22 }), T('b', '= {g:x³ − 1}', 200, 230, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '(3x² − x) − (x² + 2x − 5) = …',
      options: [
        { t: '2x² − 3x + 5', ok: true },
        { t: '2x² + x − 5', why: 'Semua tanda polinomial kedua dibalik: −x² − 2x + 5.' },
        { t: '4x² + x − 5', why: 'Itu penjumlahan.' },
        { t: '2x² − 3x − 5', why: '−(−5) = +5.' },
      ],
      steps: ['3x² − x − x² − 2x + 5.', '= 2x² − 3x + 5.'],
    },
    {
      q: '(x + 3)(x − 3) = …',
      options: [
        { t: 'x² − 9', ok: true },
        { t: 'x² + 9', why: '3 × (−3) = −9.' },
        { t: 'x² − 6x − 9', why: '−3x + 3x = 0.' },
        { t: 'x² − 6', why: 'Suku tetapnya 3 × (−3) = −9.' },
      ],
      steps: ['x² − 3x + 3x − 9.', '= x² − 9.'],
    },
    {
      type: 'num',
      q: 'Koefisien x pada hasil kali (2x + 1)(x² − 3x + 4) adalah …',
      ans: ['5'],
      wrong: { '8': 'Ada dua sumber suku x: 2x × 4 = 8x dan 1 × (−3x) = −3x.', '-3': 'Tambahkan juga 2x × 4 = 8x.' },
      steps: ['Suku x: 2x × 4 + 1 × (−3x) = 8x − 3x.', '= 5x.'],
    },
    {
      type: 'num',
      q: 'Derajat hasil kali (x³ + 1)(x² − 2) adalah …',
      ans: ['5'],
      wrong: { '6': 'Pangkat dijumlah: 3 + 2.', '3': 'Suku tertingginya x³ × x² = x⁵.' },
      steps: ['x³ × x² = x⁵.', 'Derajat 5.'],
    },
    {
      type: 'num',
      q: 'Koefisien x² pada (x + 1)³ adalah …',
      ans: ['3'],
      wrong: { '1': '(x + 1)³ = x³ + 3x² + 3x + 1.', '2': '(x + 1)² = x² + 2x + 1, dikali (x + 1) lagi: x² punya koefisien 2 + 1 = 3.' },
      steps: ['(x + 1)² = x² + 2x + 1.', '× (x + 1): x³ + 3x² + 3x + 1.'],
    },
  ],
};

// ---------- 2.3 Pembagian dan teorema sisa ----------
const HX = [130, 190, 250, 310];
const HY = [90, 140, 195];
const hn = (id, v, c, r, col = 'ink') => T(id, String(v), HX[c], HY[r], { size: 22, c: col });
const hornerFrame = (a) => [
  T('ha', String(a), 75, HY[0], { size: 22, c: 'acc' }),
  ln('hv', 100, 65, 100, 165, { sw: 2, draw: false }),
  ln('hh', 100, 166, 340, 166, { sw: 2, draw: false }),
];
const arrow = (id, c) => ln(id, HX[c] + 10, HY[2] - 12, HX[c + 1] - 12, HY[1] + 12, { sw: 1.5, arrow: 'end', c: 'mut' });
const CF = { x: 60, y: 25, w: 280, h: 230, xmin: -0.5, xmax: 4, ymin: -3, ymax: 3 };
const PF = plane('pf', CF);

const l3 = {
  id: 'k11lb2-3',
  title: 'Pembagian Polinomial dan Teorema Sisa',
  hook: 'Sisa pembagian f(x) oleh (x − a) bisa ditemukan tanpa membagi: cukup hitung f(a).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'f dari x sama dengan x pangkat 3 dikurangi 2x tambah 5 dibagi x dikurangi 2. Berapa sisanya?',
          add: [T('q', '(x³ − 2x + 5) ÷ (x − 2)', 200, 110, { size: 28 }), T('q2', 'sisa = ?', 200, 170, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '9', ok: true, why: 'Teorema sisa: sisa = f(2) = 8 − 4 + 5 = 9.' },
              { t: '5', why: '5 adalah suku tetapnya, bukan sisa pembagian.' },
              { t: '0', why: 'f(2) = 9, bukan 0, jadi tidak habis dibagi.' },
              { t: '−9', why: 'Gunakan x = 2 (dari x − 2 = 0), bukan x = −2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Cara Horner',
      steps: [
        {
          say: 'Cara cepat membagi dengan x dikurangi a adalah cara Horner. Tulis semua koefisien f: 1, 0 untuk x kuadrat yang tidak ada, minus 2, dan 5. Di kiri tulis a, yaitu 2.',
          clear: true,
          add: [...hornerFrame(2), ...[1, 0, -2, 5].map((v, c) => hn(`t${c}`, v < 0 ? `−${-v}` : v, c, 0))],
        },
        {
          say: 'Turunkan koefisien pertama, 1.',
          add: [hn('b0', 1, 0, 2, 'pos')],
        },
        {
          say: 'Kalikan dengan 2, tulis di bawah koefisien berikutnya: 2. Jumlahkan: 0 tambah 2 sama dengan 2.',
          add: [arrow('ar0', 0), hn('m1', 2, 1, 1, 'mut'), hn('b1', 2, 1, 2, 'pos')],
        },
        {
          say: '2 kali 2 sama dengan 4. Minus 2 tambah 4 sama dengan 2.',
          add: [arrow('ar1', 1), hn('m2', 4, 2, 1, 'mut'), hn('b2', 2, 2, 2, 'pos')],
        },
        {
          say: '2 kali 2 sama dengan 4. 5 tambah 4 sama dengan 9. Angka terakhir adalah sisa.',
          add: [arrow('ar2', 2), hn('m3', 4, 3, 1, 'mut'), hn('b3', 9, 3, 2, 'neg'), box('sb', HX[3], HY[2], 40, 36, { r: 6, fill: 'none', stroke: 'neg', sw: 2 })],
        },
        {
          say: 'Angka 1, 2, 2 adalah koefisien hasil bagi, derajatnya turun satu: x kuadrat tambah 2x tambah 2. Sisanya 9.',
          add: [T('r', 'hasil bagi: x² + 2x + 2,  sisa: {n:9}', 200, 250, { size: 20 })],
        },
      ],
    },
    {
      title: 'Teorema sisa',
      steps: [
        {
          say: 'Sekarang hitung f dari 2: 8 dikurangi 4 tambah 5, yaitu 9. Sama dengan sisanya!',
          clear: true,
          add: [T('a', 'f(2) = 8 − 4 + 5 = 9', 200, 70, { size: 26 })],
        },
        {
          say: 'Ini teorema sisa: sisa pembagian f dari x oleh x dikurangi a sama dengan f dari a. Alasannya, f dari x sama dengan x dikurangi a kali hasil bagi, tambah sisa. Saat x sama dengan a, bagian pertama menjadi nol.',
          add: [T('f', 'f(x) = (x − a) · h(x) + s', 200, 130, { size: 24, c: 'pos' }), T('g', 'x = a:  f(a) = 0 · h(a) + s = s', 200, 175, { size: 20 })],
        },
      ],
    },
    {
      title: 'Teorema faktor',
      steps: [
        {
          say: 'Kalau sisanya nol, x dikurangi a adalah faktor. Contoh: f dari x sama dengan x pangkat 3 dikurangi 6x kuadrat tambah 11x dikurangi 6. f dari 1 sama dengan 1 dikurangi 6 tambah 11 dikurangi 6, yaitu 0.',
          clear: true,
          add: [T('a', 'f(x) = x³ − 6x² + 11x − 6', 200, 40, { size: 22 }), T('b', 'f(1) = 1 − 6 + 11 − 6 = 0', 200, 75, { size: 20, c: 'ok' })],
        },
        {
          say: 'Jadi x dikurangi 1 adalah faktor. Dengan Horner, hasil baginya x kuadrat dikurangi 5x tambah 6, yaitu x dikurangi 2 kali x dikurangi 3.',
          add: [T('c', 'f(x) = (x − 1)(x² − 5x + 6) = (x − 1)(x − 2)(x − 3)', 200, 110, { size: 15 })],
        },
        {
          say: 'Artinya grafik f memotong sumbu x di 1, 2, dan 3.',
          add: [...PF.els, curve('cv', PF, (x) => (x - 1) * (x - 2) * (x - 3), CF, { z: 1 }), ...[1, 2, 3].map((r, i) => dot(`rt${i}`, ...PF.at(r, 0), 'ok', { r: 6, z: 2 })), tag('ft', '(x − 1)(x − 2)(x − 3)', 150, 40, 'pos', 14)],
          del: ['a', 'b', 'c'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa sisa pembagian x pangkat 3 tambah x kuadrat dikurangi 4 oleh x tambah 2?',
          clear: true,
          add: [T('q', '(x³ + x² − 4) ÷ (x + 2)', 200, 110, { size: 28 }), T('q2', 'sisa = ?', 200, 170, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '−8', ok: true, why: 'x + 2 = x − (−2), jadi sisa = f(−2) = −8 + 4 − 4 = −8.' },
              { t: '8', why: 'Pakai f(−2), bukan f(2).' },
              { t: '−4', why: 'Itu suku tetap. Hitung f(−2).' },
              { t: '0', why: 'f(−2) = −8, bukan 0.' },
            ],
          },
        },
        {
          say: 'x tambah 2 sama dengan x dikurangi minus 2. Jadi sisanya f dari minus 2: minus 8 tambah 4 dikurangi 4, yaitu minus 8.',
          add: [T('a', 'f(−2) = −8 + 4 − 4 = {g:−8}', 200, 230, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Sisa pembagian x⁴ − 3x + 2 oleh (x − 1) adalah …',
      ans: ['0'],
      wrong: { '2': 'Sisa = f(1) = 1 − 3 + 2 = 0.', '6': 'Gunakan x = 1, bukan x = −1.' },
      steps: ['f(1) = 1 − 3 + 2.', '= 0 → (x − 1) adalah faktor.'],
    },
    {
      type: 'num',
      q: 'Polinomial f(x) = x³ + kx − 6 habis dibagi (x − 2). Nilai k adalah …',
      ans: ['-1'],
      wrong: { '1': '8 + 2k − 6 = 0 → 2k = −2 → k = −1.', '-7': 'Masukkan x = 2: 8 + 2k − 6 = 0.' },
      steps: ['Habis dibagi → f(2) = 0.', '8 + 2k − 6 = 0 → k = −1.'],
    },
    {
      q: 'Hasil bagi x² − 7x + 10 oleh (x − 2) adalah …',
      options: [
        { t: 'x − 5', ok: true },
        { t: 'x + 5', why: '(x − 2)(x + 5) = x² + 3x − 10.' },
        { t: 'x − 7', why: '(x − 2)(x − 7) = x² − 9x + 14.' },
        { t: 'x² − 5', why: 'Derajat hasil bagi turun satu: 2 − 1 = 1.' },
      ],
      steps: ['x² − 7x + 10 = (x − 2)(x − 5).', 'Hasil bagi: x − 5.'],
    },
    {
      type: 'num',
      q: 'Sisa pembagian 2x³ − x + 3 oleh (x + 1) adalah …',
      ans: ['2'],
      wrong: { '4': 'Gunakan x = −1: −2 + 1 + 3 = 2.', '-2': '2(−1)³ = −2, −(−1) = +1. −2 + 1 + 3 = 2.' },
      steps: ['Sisa = f(−1).', '−2 + 1 + 3 = 2.'],
    },
    {
      q: 'Manakah faktor dari x³ − 7x + 6?',
      options: [
        { t: 'x − 1', ok: true },
        { t: 'x + 1', why: 'f(−1) = −1 + 7 + 6 = 12, bukan 0.' },
        { t: 'x − 3', why: 'f(3) = 27 − 21 + 6 = 12.' },
        { t: 'x + 2', why: 'f(−2) = −8 + 14 + 6 = 12.' },
      ],
      steps: ['f(1) = 1 − 7 + 6 = 0.', 'Jadi (x − 1) faktor.'],
    },
  ],
};

export default {
  id: 'k11lb2',
  no: 2,
  title: 'Polinomial',
  desc: 'Derajat dan koefisien, bentuk grafik, operasi polinomial, pembagian cara Horner, teorema sisa, dan teorema faktor.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Jika f(x) = 2x³ − 5x² + 4, nilai f(3) adalah …',
      ans: ['13'],
      wrong: { '58': '2 × 27 = 54, 5 × 9 = 45. 54 − 45 + 4 = 13.', '-5': '2(3)³ = 54, bukan 18.' },
      steps: ['54 − 45 + 4.', '= 13.'],
    },
    {
      q: 'Jika (x − 3) faktor dari f(x), maka …',
      options: [
        { t: 'f(3) = 0', ok: true },
        { t: 'f(−3) = 0', why: 'x − 3 = 0 saat x = 3.' },
        { t: 'f(0) = 3', why: 'Teorema faktor tentang f(3).' },
        { t: 'f(3) = 3', why: 'Faktor berarti sisanya 0.' },
      ],
      steps: ['Teorema faktor: (x − a) faktor ⟺ f(a) = 0.'],
    },
    {
      type: 'num',
      q: 'Akar-akar x³ − 6x² + 11x − 6 = 0 adalah 1, 2, dan 3. Jumlah ketiga akar itu adalah …',
      ans: ['6'],
      wrong: { '-6': '1 + 2 + 3 = 6.' },
      steps: ['1 + 2 + 3 = 6.', 'Sama dengan −(koefisien x²) ÷ (koefisien x³) = 6.'],
    },
  ],
};
