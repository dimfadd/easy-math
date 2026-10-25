// Kelas 9 · Bab 2: Fungsi Kuadrat
import { T, box, ln, dot, table, textWidth } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { parabola } from './curve.js';

const tag = (id, text, x, y, c = 'ink', size = 15) => box(id, x, y, textWidth(text, size) + 12, size + 8, { fill: 'paper', stroke: 'none', sw: 0, r: 4, label: text, lsize: size, lc: c, z: 3 });

// ---------- 2.1 Grafik fungsi kuadrat ----------
const C1 = { x: 50, y: 25, w: 300, h: 230, xmin: -3, xmax: 3, ymin: -2, ymax: 9 };
const P1 = plane('pl', C1);
const C2 = { x: 50, y: 25, w: 300, h: 230, xmin: -3, xmax: 3, ymin: -5, ymax: 6 };
const P2 = plane('pl', C2);

const l1 = {
  id: 'k9b2-1',
  title: 'Grafik Fungsi Kuadrat',
  hook: 'Lintasan bola yang dilempar membentuk lengkungan yang disebut parabola. Itulah grafik fungsi kuadrat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Titik-titik dari fungsi y sama dengan x kuadrat digambar pada bidang koordinat. Bentuk apa yang terjadi kalau titik-titiknya dihubungkan?',
          add: [...P1.els, ...[-3, -2, -1, 0, 1, 2, 3].map((x) => dot(`d${x + 3}`, ...P1.at(x, x * x), 'acc'))],
          ask: {
            options: [
              { t: 'lengkungan seperti huruf U', ok: true, why: 'Grafik fungsi kuadrat berbentuk parabola.' },
              { t: 'garis lurus', why: 'Kenaikannya tidak tetap: 0, 1, 4, 9. Jadi bukan garis lurus.' },
              { t: 'lingkaran', why: 'Ujung-ujungnya terus naik, tidak kembali menutup.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dari tabel ke parabola',
      steps: [
        {
          say: 'Tabel y sama dengan x kuadrat: x minus 3 sampai 3. Hasilnya 9, 4, 1, 0, 1, 4, 9. Nilai positif dan negatif memberi hasil yang sama.',
          add: [tag('tb', 'x: −3 −2 −1 0 1 2 3  →  y: 9 4 1 0 1 4 9', 200, 14, 'ink', 12)],
        },
        {
          say: 'Hubungkan titik-titiknya dengan lengkungan halus. Inilah parabola.',
          add: [parabola('p', P1, 1, 0, 0, C1, { z: -1 }), tag('eq', 'y = x²', 300, 60, 'pos', 18)],
        },
        {
          say: 'Parabola ini simetris. Sisi kiri dan kanan seperti bayangan cermin terhadap sumbu y. Titik paling bawahnya, 0 koma 0, disebut titik puncak.',
          add: [ln('sym', ...P1.at(0, -2), ...P1.at(0, 9), { sw: 2, dash: '6 5', c: 'acc' }), tag('pk', 'titik puncak (0, 0)', 270, 235, 'acc')],
          pulse: ['d3'],
        },
      ],
    },
    {
      title: 'Peran a',
      steps: [
        {
          say: 'Bentuk umum fungsi kuadrat: y sama dengan a x kuadrat tambah b x tambah c. Kita lihat dulu pengaruh a.',
          clear: true,
          add: [...P2.els, parabola('p', P2, 1, 0, 0, C2), tag('eq', 'y = x²  (a = 1)', 290, 40, 'pos', 16)],
        },
        {
          say: 'a sama dengan 3: parabolanya lebih sempit, naik lebih cepat.',
          set: { p: parabola('p', P2, 3, 0, 0, C2), eq: tag('eq', 'y = 3x²  (a = 3)', 290, 40, 'pos', 16) },
        },
        {
          say: 'a sama dengan setengah: lebih lebar.',
          set: { p: parabola('p', P2, 0.5, 0, 0, C2), eq: tag('eq', 'y = ½x²  (a = ½)', 290, 40, 'pos', 16) },
        },
        {
          say: 'a negatif, misalnya minus 1: parabolanya terbalik, terbuka ke bawah. Titik puncaknya menjadi titik tertinggi.',
          set: { p: parabola('p', P2, -1, 0, 0, C2, { stroke: 'neg' }), eq: tag('eq', 'y = −x²  (a = −1)', 290, 40, 'neg', 16) },
        },
        {
          say: 'Jadi: a positif terbuka ke atas, a negatif terbuka ke bawah. Semakin besar angka a, semakin sempit.',
          add: [tag('k', 'a > 0: ∪    a < 0: ∩', 110, 40, 'ink', 16)],
        },
      ],
    },
    {
      title: 'Peran c',
      steps: [
        {
          say: 'Sekarang c. y sama dengan x kuadrat tambah 2: seluruh parabola naik 2.',
          clear: true,
          add: [...P2.els, parabola('p0', P2, 1, 0, 0, C2, { stroke: 'mut', sw: 2 }), parabola('p', P2, 1, 0, 2, C2), tag('eq', 'y = x² + 2', 290, 40, 'pos', 16), dot('c', ...P2.at(0, 2), 'acc')],
        },
        {
          say: 'y sama dengan x kuadrat dikurangi 3: turun 3. c adalah titik potong grafik dengan sumbu y.',
          set: { p: parabola('p', P2, 1, 0, -3, C2), eq: tag('eq', 'y = x² − 3', 290, 40, 'pos', 16), c: { y: P2.at(0, -3)[1] } },
          add: [tag('cl', 'memotong sumbu y di c', 110, 235, 'acc')],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Grafik y sama dengan minus 2 x kuadrat tambah 5 terbuka ke arah mana, dan memotong sumbu y di mana?',
          clear: true,
          add: [T('q', 'y = −2x² + 5', 200, 120, { size: 36 })],
          ask: {
            options: [
              { t: 'ke bawah, di (0, 5)', ok: true, why: 'a = −2 negatif → ke bawah. c = 5 → (0, 5).' },
              { t: 'ke atas, di (0, 5)', why: 'a = −2 negatif, jadi terbuka ke bawah.' },
              { t: 'ke bawah, di (0, −2)', why: 'Titik potong sumbu y adalah c = 5.' },
              { t: 'ke atas, di (5, 0)', why: 'Titik potong sumbu y berbentuk (0, c).' },
            ],
          },
        },
        {
          say: 'a minus 2 negatif, jadi terbuka ke bawah. c sama dengan 5, jadi memotong sumbu y di 0 koma 5.',
          clear: true,
          add: [...P2.els, parabola('p', P2, -2, 0, 5, C2, { stroke: 'neg' }), dot('c', ...P2.at(0, 5), 'acc'), tag('eq', 'y = −2x² + 5', 290, 40, 'neg', 16)],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Grafik fungsi y = −x² + 4 …',
      options: [
        { t: 'terbuka ke bawah dan memotong sumbu y di (0, 4)', ok: true },
        { t: 'terbuka ke atas dan memotong sumbu y di (0, 4)', why: 'a = −1 negatif → terbuka ke bawah.' },
        { t: 'terbuka ke bawah dan memotong sumbu y di (0, −1)', why: 'c = 4.' },
        { t: 'berupa garis lurus', why: 'Ada x², jadi parabola.' },
      ],
      steps: ['a = −1 < 0 → terbuka ke bawah.', 'c = 4 → (0, 4).'],
    },
    {
      type: 'num',
      q: 'Jika f(x) = x² − 3x + 2, nilai f(4) adalah …',
      ans: ['6'],
      wrong: { '30': '−3x berarti dikurangi: 16 − 12 + 2 = 6.', '-2': '16 − 12 + 2 = 6.' },
      steps: ['f(4) = 16 − 12 + 2.', '= 6.'],
    },
    {
      q: 'Manakah parabola yang paling sempit?',
      options: [
        { t: 'y = 4x²', ok: true },
        { t: 'y = x²', why: 'Semakin besar nilai a (tanpa tanda), semakin sempit. 4 > 1.' },
        { t: 'y = ¼x²', why: '¼ kecil, jadi lebar.' },
        { t: 'y = 2x²', why: '4 lebih besar dari 2.' },
      ],
      steps: ['Lebar parabola ditentukan oleh besar a.', 'a terbesar: 4 → paling sempit.'],
    },
    {
      q: 'Titik manakah yang terletak pada grafik y = x² + 1?',
      options: [
        { t: '(2, 5)', ok: true },
        { t: '(5, 2)', why: 'x = 5 → y = 26.' },
        { t: '(2, 4)', why: '2² + 1 = 5.' },
        { t: '(0, 0)', why: 'x = 0 → y = 1.' },
      ],
      steps: ['x = 2: y = 4 + 1 = 5.', 'Titik (2, 5).'],
    },
    {
      q: 'Grafik y = x² digeser 3 satuan ke bawah. Persamaan grafik barunya adalah …',
      options: [
        { t: 'y = x² − 3', ok: true },
        { t: 'y = x² + 3', why: 'Ditambah 3 berarti naik.' },
        { t: 'y = 3x²', why: 'Itu membuat parabola lebih sempit, tidak menggeser.' },
        { t: 'y = (x − 3)²', why: 'Itu menggeser ke kanan.' },
      ],
      steps: ['Turun 3 satuan → c berkurang 3.', 'y = x² − 3.'],
    },
  ],
};

// ---------- 2.2 Titik puncak dan sketsa ----------
const C3 = { x: 50, y: 25, w: 300, h: 230, xmin: -1, xmax: 5, ymin: -2, ymax: 6 };
const P3 = plane('pl', C3);
const C4 = { x: 60, y: 30, w: 290, h: 220, xmin: 0, xmax: 4, ymin: 0, ymax: 25 };
const P4 = plane('pl', { ...C4, ystep: 5, yevery: 5, xl: 't', yl: 'h' });

const l2 = {
  id: 'k9b2-2',
  title: 'Titik Puncak dan Sketsa Grafik',
  hook: 'Titik puncak ada di tengah-tengah dua titik potong sumbu x. Rumusnya x = −b ÷ 2a.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Grafik y sama dengan x kuadrat dikurangi 4 x tambah 3 memotong sumbu x di 1 dan 3. Di x berapa titik puncaknya?',
          add: [...P3.els, dot('r1', ...P3.at(1, 0), 'ok'), dot('r2', ...P3.at(3, 0), 'ok'), tag('eq', 'y = x² − 4x + 3', 290, 40, 'pos', 16)],
          ask: {
            options: [
              { t: 'x = 2', ok: true, why: 'Parabola simetris, jadi puncaknya tepat di tengah 1 dan 3.' },
              { t: 'x = 0', why: 'Puncaknya di tengah kedua titik potong, bukan di sumbu y.' },
              { t: 'x = 4', why: 'Tengah-tengah 1 dan 3 adalah 2.' },
              { t: 'x = 3', why: '3 adalah titik potong, bukan puncak.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Langkah membuat sketsa',
      steps: [
        {
          say: 'Langkah 1: titik potong sumbu x. Selesaikan x kuadrat dikurangi 4 x tambah 3 sama dengan 0: x dikurangi 1 dikali x dikurangi 3. Jadi 1 dan 3.',
          pulse: ['r1', 'r2'],
          add: [tag('s1', '1) potong x: (1, 0), (3, 0)', 165, 62, 'ok', 13)],
        },
        {
          say: 'Langkah 2: titik potong sumbu y. Masukkan x sama dengan 0: y sama dengan 3. Titiknya 0 koma 3.',
          add: [dot('cy', ...P3.at(0, 3), 'acc'), tag('s2', '2) potong y: (0, 3)', 165, 84, 'acc', 13)],
        },
        {
          say: 'Langkah 3: sumbu simetri, x sama dengan minus b dibagi 2 a. Minus minus 4, dibagi 2, sama dengan 2.',
          add: [ln('sym', ...P3.at(2, -2), ...P3.at(2, 6), { sw: 2, dash: '6 5', c: 'mut' }), tag('s3', '3) x = −b ÷ 2a = 2', 165, 106, 'ink', 13)],
        },
        {
          say: 'Langkah 4: titik puncak. Masukkan x sama dengan 2: 4 dikurangi 8 tambah 3 sama dengan minus 1. Puncaknya 2 koma minus 1.',
          add: [dot('pk', ...P3.at(2, -1), 'neg', { r: 8 }), tag('s4', '4) puncak (2, −1)', 165, 128, 'neg', 13)],
        },
        {
          say: 'Hubungkan semua titik dengan lengkungan halus.',
          add: [parabola('p', P3, 1, -4, 3, C3, { z: -1 })],
        },
      ],
    },
    {
      title: 'Nilai terbesar dan terkecil',
      steps: [
        {
          say: 'Bola dilempar ke atas. Tingginya setelah t detik: h sama dengan 20 t dikurangi 5 t kuadrat. Kapan bola paling tinggi?',
          clear: true,
          add: [...P4.els, tag('eq', 'h = 20t − 5t²', 290, 40, 'neg', 16)],
        },
        {
          say: 'a minus 5 negatif, jadi parabolanya terbuka ke bawah. Puncaknya adalah titik tertinggi.',
          add: [parabola('p', P4, -5, 20, 0, C4, { stroke: 'neg' })],
        },
        {
          say: 't puncak sama dengan minus b dibagi 2 a: minus 20 dibagi minus 10, yaitu 2 detik.',
          add: [ln('sym', ...P4.at(2, 0), ...P4.at(2, 20), { sw: 2, dash: '6 5', c: 'mut' }), tag('a', 't = −20 ÷ (−10) = 2', 140, 40, 'ink', 14)],
        },
        {
          say: 'Tinggi saat itu: 20 kali 2 dikurangi 5 kali 4, yaitu 40 dikurangi 20, sama dengan 20 meter. Itulah tinggi maksimum.',
          add: [dot('pk', ...P4.at(2, 20), 'acc', { r: 8 }), tag('b', 'h maks = 40 − 20 = 20 m', 300, 75, 'acc', 14)],
          pulse: ['pk'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik puncak y sama dengan x kuadrat tambah 6 x tambah 5 adalah …',
          clear: true,
          add: [T('q', 'y = x² + 6x + 5', 200, 110, { size: 34 }), T('q2', 'titik puncak = ?', 200, 170, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: '(−3, −4)', ok: true, why: 'x = −6 ÷ 2 = −3; y = 9 − 18 + 5 = −4.' },
              { t: '(3, 32)', why: 'x = −b ÷ 2a = −6 ÷ 2 = −3, bukan 3.' },
              { t: '(−3, 5)', why: 'Masukkan x = −3 ke rumus: y = 9 − 18 + 5.' },
              { t: '(−6, 5)', why: 'Bagi dengan 2a: −6 ÷ 2 = −3.' },
            ],
          },
        },
        {
          say: 'x puncak: minus 6 dibagi 2, yaitu minus 3. y puncak: 9 dikurangi 18 tambah 5 sama dengan minus 4.',
          clear: true,
          add: [T('a', 'x = −6 ÷ (2 × 1) = −3', 200, 90, { size: 26 }), T('b', 'y = 9 − 18 + 5 = −4', 200, 140, { size: 26 }), T('c', 'puncak {a:(−3, −4)}', 200, 200, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Persamaan sumbu simetri grafik y = x² − 8x + 7 adalah …',
      options: [
        { t: 'x = 4', ok: true },
        { t: 'x = −4', why: 'x = −b ÷ 2a = −(−8) ÷ 2 = 4.' },
        { t: 'x = 8', why: 'Bagi dengan 2a = 2.' },
        { t: 'x = 7', why: '7 adalah c.' },
      ],
      steps: ['x = −b ÷ 2a = 8 ÷ 2 = 4.'],
    },
    {
      q: 'Titik puncak grafik y = x² − 2x − 3 adalah …',
      options: [
        { t: '(1, −4)', ok: true },
        { t: '(−1, 0)', why: '(−1, 0) adalah titik potong sumbu x.' },
        { t: '(1, −3)', why: 'y = 1 − 2 − 3 = −4.' },
        { t: '(2, −3)', why: 'x = 2 ÷ 2 = 1.' },
      ],
      steps: ['x = 2 ÷ 2 = 1.', 'y = 1 − 2 − 3 = −4.'],
    },
    {
      q: 'Titik potong grafik y = x² − 5x + 6 dengan sumbu x adalah …',
      options: [
        { t: '(2, 0) dan (3, 0)', ok: true },
        { t: '(0, 6)', why: 'Itu titik potong sumbu y.' },
        { t: '(−2, 0) dan (−3, 0)', why: '(x − 2)(x − 3) = 0 → x = 2, 3.' },
        { t: '(1, 0) dan (6, 0)', why: '1 + 6 = 7, bukan 5.' },
      ],
      steps: ['x² − 5x + 6 = (x − 2)(x − 3) = 0.', 'x = 2 atau 3.'],
    },
    {
      type: 'num',
      q: 'Tinggi peluru h = 40t − 5t² (meter, t dalam detik). Tinggi maksimum peluru adalah … m',
      ans: ['80'],
      wrong: { '4': '4 detik adalah waktunya. Masukkan t = 4 ke rumus.', '160': '40 × 4 − 5 × 16 = 160 − 80 = 80.' },
      steps: ['t puncak = −40 ÷ (−10) = 4.', 'h = 160 − 80 = 80 m.'],
    },
    {
      type: 'num',
      q: 'Nilai minimum fungsi f(x) = x² + 4x + 1 adalah …',
      ans: ['-3'],
      wrong: { '-2': '−2 adalah x puncaknya. Nilai minimum = f(−2).', '1': 'f(−2) = 4 − 8 + 1 = −3.' },
      steps: ['x puncak = −4 ÷ 2 = −2.', 'f(−2) = 4 − 8 + 1 = −3.'],
    },
  ],
};

export default {
  id: 'k9b2',
  no: 2,
  title: 'Fungsi Kuadrat',
  desc: 'Parabola, pengaruh a dan c, titik potong, sumbu simetri, titik puncak, serta nilai maksimum dan minimum.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Keliling persegi panjang 20 cm. Luas terbesar yang mungkin adalah … cm²',
      ans: ['25'],
      wrong: { '100': 'p + l = 10. Luas = x(10 − x), maksimum saat x = 5.', '20': 'Luas = 5 × 5 = 25.' },
      steps: ['p + l = 10, luas L = x(10 − x) = −x² + 10x.', 'Puncak x = 5, L = 25 cm².'],
    },
    {
      q: 'Grafik fungsi y = ax² + bx + c terbuka ke bawah dan memotong sumbu y di bawah titik (0, 0). Maka …',
      options: [
        { t: 'a < 0 dan c < 0', ok: true },
        { t: 'a > 0 dan c < 0', why: 'Terbuka ke bawah berarti a negatif.' },
        { t: 'a < 0 dan c > 0', why: 'Memotong sumbu y di bawah 0 berarti c negatif.' },
        { t: 'a > 0 dan c > 0', why: 'Keduanya negatif.' },
      ],
      steps: ['Terbuka ke bawah → a < 0.', 'Titik potong sumbu y (0, c) di bawah 0 → c < 0.'],
    },
    {
      type: 'num',
      q: 'Grafik y = x² − 6x + k memiliki titik puncak di (3, 2). Nilai k adalah …',
      ans: ['11'],
      wrong: { '2': 'Masukkan (3, 2): 9 − 18 + k = 2.', '-7': '9 − 18 + k = 2 → k = 11.' },
      steps: ['Titik (3, 2) ada di grafik: 9 − 18 + k = 2.', 'k = 11.'],
    },
  ],
};
