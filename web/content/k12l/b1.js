// Kelas 12 Tingkat Lanjut · Bab 1: Geometri Analitik (irisan kerucut)
import { T, ln, dot } from '../helpers.js';
import { lineOn } from '../k8/plot.js';
import { tag } from '../k10/kit.js';
import { mk, fpath } from '../k12/kit.js';
import { pcurve } from './kit.js';

const RX = 335;
const R = (id, text, y, c = 'ink', size = 14) => T(id, text, RX, y, { size, c });
const seg = (id, B, a, b, c, d, col = 'acc', o = {}) => ln(id, B.P.X(a), B.P.Y(b), B.P.X(c), B.P.Y(d), { sw: 2.5, c: col, draw: false, ...o });
const pt = (id, B, a, b, c = 'neg', o = {}) => dot(id, B.P.X(a), B.P.Y(b), c, { r: 6, ...o });

// ---------- 1.1 Irisan kerucut dan parabola ----------
const BP = mk(5);
const coneEls = () => [
  ln('c1', 70, 40, 190, 260, { sw: 2.5, c: 'ink', draw: false }),
  ln('c2', 190, 40, 70, 260, { sw: 2.5, c: 'ink', draw: false }),
  { id: 'ct', t: 'path', x: 0, y: 0, d: 'M70,40 A60,12 0 0 0 190,40 A60,12 0 0 0 70,40 M70,260 A60,12 0 0 0 190,260 A60,12 0 0 0 70,260', stroke: 'mut', sw: 1.5 },
];
const CUTS = {
  lingkaran: [80, 220, 180, 220],
  elips: [78, 196, 186, 240],
  parabola: [184, 106, 100, 260],
  hiperbola: [150, 25, 150, 275],
};
const cut = (k) => ln('cut', ...CUTS[k], { sw: 4, c: 'neg', draw: false });
const PP = [[2, 1], [4, 4], [-2, 1]];
const parPt = ([a, b]) => [pt('p', BP, a, b), seg('pf', BP, a, b, 0, 1, 'acc'), seg('pd', BP, a, b, a, -1, 'ok')];

const l1 = {
  id: 'k12lb1-1',
  title: 'Irisan Kerucut dan Parabola',
  hook: 'Kerucut yang dipotong bidang menghasilkan lingkaran, elips, parabola, atau hiperbola. Parabola adalah titik-titik yang jaraknya ke satu titik sama dengan jaraknya ke satu garis.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Titik F ada di 0 koma 1, dan garis hijau adalah y sama dengan minus 1. Kumpulan semua titik yang jaraknya ke F sama dengan jaraknya ke garis hijau membentuk kurva apa?',
          add: [...BP.P.els, pt('f', BP, 0, 1, 'acc'), tag('fl', 'F', ...BP.P.at(0.7, 1.6), 'acc', 13), lineOn('dr', BP.P, 0, -1, BP.C, { c: 'ok', sw: 2.5, dash: '6 5' }), R('q', 'jarak ke F', 70, 'acc'), R('q2', '= jarak ke garis', 95, 'ok')],
          ask: {
            options: [
              { t: 'parabola', ok: true, why: 'Titik yang jauh dari F juga jauh dari garis, sehingga kurvanya terbuka ke atas seperti mangkuk.' },
              { t: 'lingkaran', why: 'Lingkaran adalah titik-titik yang jaraknya sama ke satu titik saja.' },
              { t: 'garis lurus', why: 'Coba titik (2, 1) dan (4, 4): keduanya memenuhi, tetapi tidak segaris dengan (0, 0).' },
              { t: 'elips', why: 'Elips memakai dua titik fokus, bukan satu titik dan satu garis.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Memotong kerucut',
      steps: [
        {
          say: 'Bayangkan dua kerucut yang bertemu di puncaknya. Kalau dipotong mendatar, potongannya berbentuk lingkaran.',
          clear: true,
          add: [...coneEls(), cut('lingkaran'), T('nm', 'lingkaran', 310, 150, { size: 22, c: 'neg' })],
        },
        {
          say: 'Kalau potongannya sedikit miring, hasilnya lingkaran yang lonjong: elips.',
          set: { cut: cut('elips'), nm: { text: 'elips' } },
        },
        {
          say: 'Kalau kemiringannya sejajar sisi kerucut, potongannya tidak pernah menutup. Hasilnya parabola.',
          set: { cut: cut('parabola'), nm: { text: 'parabola' } },
        },
        {
          say: 'Kalau dipotong tegak sehingga mengenai kedua kerucut, hasilnya dua lengkungan terpisah: hiperbola. Keempatnya disebut irisan kerucut.',
          set: { cut: cut('hiperbola'), nm: { text: 'hiperbola' } },
          add: [T('k', 'irisan kerucut', 310, 190, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Fokus dan direktris',
      steps: [
        {
          say: 'Kembali ke titik F dan garis hijau. Titik F disebut fokus, garis hijau disebut direktris. Titik 2 koma 1 jaraknya 2 ke F, dan 2 juga ke direktris.',
          clear: true,
          add: [...BP.P.els, pt('f', BP, 0, 1, 'acc'), tag('fl', 'F', ...BP.P.at(-0.7, 1.6), 'acc', 13), lineOn('dr', BP.P, 0, -1, BP.C, { c: 'ok', sw: 2.5, dash: '6 5' }), ...parPt(PP[0]), R('a', 'P(2, 1)', 60, 'neg'), R('a2', 'PF = 2,  PD = 2', 85)],
        },
        {
          say: 'Titik 4 koma 4: jaraknya ke F adalah akar dari 16 tambah 9, yaitu 5. Jaraknya ke direktris 4 tambah 1, juga 5.',
          set: { p: { x: BP.P.X(4), y: BP.P.Y(4) }, pf: seg('pf', BP, 4, 4, 0, 1, 'acc'), pd: seg('pd', BP, 4, 4, 4, -1, 'ok'), a: { text: 'P(4, 4)' }, a2: { text: 'PF = 5,  PD = 5' } },
        },
        {
          say: 'Hubungkan semua titik seperti itu. Hasilnya parabola dengan puncak di titik asal.',
          add: [fpath('cv', BP, (x) => (x * x) / 4, -4.4, 4.4, { z: -1 }), tag('e', 'x² = 4y', RX, 135, 'pos', 18)],
        },
      ],
    },
    {
      title: 'Persamaannya',
      steps: [
        {
          say: 'Jika fokus di 0 koma p dan direktris y sama dengan minus p, persamaannya x kuadrat sama dengan 4py. Pada contoh tadi p sama dengan 1, jadi x kuadrat sama dengan 4y.',
          clear: true,
          add: [T('a', 'x² = 4py', 200, 60, { size: 32, c: 'pos' }), T('a2', 'fokus (0, p), direktris y = −p, terbuka ke atas', 200, 100, { size: 15, c: 'mut' })],
        },
        {
          say: 'Kalau x dan y bertukar, parabolanya terbuka ke kanan: y kuadrat sama dengan 4px, dengan fokus p koma 0 dan direktris x sama dengan minus p.',
          add: [T('b', 'y² = 4px', 200, 160, { size: 32, c: 'acc' }), T('b2', 'fokus (p, 0), direktris x = −p, terbuka ke kanan', 200, 200, { size: 15, c: 'mut' })],
        },
        {
          say: 'Contoh: y kuadrat sama dengan 12x. 4p sama dengan 12, jadi p sama dengan 3. Fokusnya 3 koma 0.',
          add: [T('c', 'y² = 12x → 4p = 12 → p = 3 → fokus (3, 0)', 200, 255, { size: 17, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Di mana fokus parabola x kuadrat sama dengan 8y?',
          clear: true,
          add: [T('q', 'x² = 8y', 200, 100, { size: 36, c: 'pos' }), T('q2', 'fokus = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '(0, 2)', ok: true, why: '4p = 8, jadi p = 2. Bentuk x² = 4py berfokus di (0, p).' },
              { t: '(2, 0)', why: 'Bentuk x² = 4py terbuka ke atas, fokusnya di sumbu y.' },
              { t: '(0, 8)', why: '8 adalah 4p. Bagi 4 dulu.' },
              { t: '(0, −2)', why: 'Itu letak direktris y = −2, bukan fokus.' },
            ],
          },
        },
        {
          say: '4p sama dengan 8, jadi p sama dengan 2. Fokusnya 0 koma 2, dan direktrisnya y sama dengan minus 2.',
          add: [T('a', '4p = 8 → p = 2 → fokus {g:(0, 2)}', 200, 225, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Parabola y² = 12x memiliki fokus (p, 0). Nilai p adalah …',
      ans: ['3'],
      wrong: { '12': '12 adalah 4p. p = 12 ÷ 4.', '4': '4p = 12 → p = 3.' },
      steps: ['4p = 12.', 'p = 3.'],
    },
    {
      q: 'Fokus parabola x² = 16y adalah …',
      options: [
        { t: '(0, 4)', ok: true },
        { t: '(4, 0)', why: 'x² = 4py terbuka ke atas, fokusnya di sumbu y.' },
        { t: '(0, 16)', why: '16 = 4p, jadi p = 4.' },
        { t: '(0, −4)', why: 'y = −4 adalah direktrisnya.' },
      ],
      steps: ['4p = 16 → p = 4.', 'Fokus (0, 4).'],
    },
    {
      type: 'num',
      q: 'Titik (6, b) terletak pada parabola x² = 4y. Nilai b adalah …',
      ans: ['9'],
      wrong: { '36': '36 = 4b, jadi b = 9.', '1.5': 'x dikuadratkan: 6² = 36 = 4b.' },
      steps: ['6² = 4b → 36 = 4b.', 'b = 9.'],
    },
    {
      q: 'Persamaan direktris parabola y² = 8x adalah …',
      options: [
        { t: 'x = −2', ok: true },
        { t: 'x = 2', why: 'x = 2 melewati fokus (2, 0). Direktris ada di sisi berlawanan.' },
        { t: 'y = −2', why: 'Parabola y² = 4px terbuka ke kanan, direktrisnya garis tegak x = −p.' },
        { t: 'x = −8', why: '4p = 8 → p = 2.' },
      ],
      steps: ['4p = 8 → p = 2.', 'Direktris x = −2.'],
    },
    {
      type: 'num',
      q: 'Parabola memiliki fokus (0, 3) dan direktris y = −3. Persamaannya x² = ky. Nilai k adalah …',
      ans: ['12'],
      wrong: { '3': 'k = 4p = 4 × 3.', '6': 'k = 4p, bukan 2p.' },
      steps: ['p = 3.', 'x² = 4py = 12y, jadi k = 12.'],
    },
  ],
};

// ---------- 1.2 Elips ----------
const BE = mk(6);
const ellipse = (o = {}) => pcurve('cv', BE, (t) => 5 * Math.cos(t), (t) => 4 * Math.sin(t), 0, 2 * Math.PI, { n: 180, z: -1, ...o });
const foci = (c) => [pt('f1', BE, -c, 0, 'acc'), pt('f2', BE, c, 0, 'acc'), tag('fl1', 'F₁', ...BE.P.at(-c, -0.9), 'acc', 12), tag('fl2', 'F₂', ...BE.P.at(c, -0.9), 'acc', 12)];
const ePt = (a, b) => [pt('p', BE, a, b), seg('s1', BE, a, b, -3, 0, 'acc'), seg('s2', BE, a, b, 3, 0, 'ok')];

const l2 = {
  id: 'k12lb1-2',
  title: 'Elips',
  hook: 'Elips adalah titik-titik yang jumlah jaraknya ke dua titik fokus selalu sama.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua paku ditancapkan, lalu seutas tali yang lebih panjang dari jarak kedua paku diikatkan ke paku itu. Pensil menarik tali sampai tegang dan berkeliling. Kurva apa yang tergambar?',
          add: [...BE.P.els, ...foci(3), ...ePt(3, 3.2), R('q', 'tali tetap 10', 70, 'ink'), R('q2', 'kurvanya?', 100, 'acc', 16)],
          ask: {
            options: [
              { t: 'elips', ok: true, why: 'Panjang tali tetap, jadi jumlah jarak pensil ke kedua paku selalu sama. Itulah definisi elips.' },
              { t: 'lingkaran', why: 'Lingkaran terjadi kalau kedua paku berimpit di satu titik.' },
              { t: 'parabola', why: 'Parabola tidak tertutup, padahal pensil bisa berkeliling.' },
              { t: 'hiperbola', why: 'Hiperbola memakai selisih jarak, bukan jumlah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jumlah jarak tetap',
      steps: [
        {
          say: 'Fokus F1 di minus 3 koma 0, F2 di 3 koma 0. Titik 3 koma 3,2 berjarak 3,2 ke F2 dan 6,8 ke F1. Jumlahnya 10.',
          clear: true,
          add: [...BE.P.els, ...foci(3), ...ePt(3, 3.2), R('a', '6,8 + 3,2 = 10', 70)],
        },
        {
          say: 'Titik 5 koma 0: jaraknya 8 ke F1 dan 2 ke F2. Jumlahnya juga 10.',
          set: { p: { x: BE.P.X(5), y: BE.P.Y(0) }, s1: seg('s1', BE, 5, 0, -3, 0, 'acc'), s2: seg('s2', BE, 5, 0, 3, 0, 'ok', { o: 0.6 }), a: { text: '8 + 2 = 10' } },
        },
        {
          say: 'Titik 0 koma 4: jaraknya 5 ke masing-masing fokus. 5 tambah 5, tetap 10.',
          set: { p: { x: BE.P.X(0), y: BE.P.Y(4) }, s1: seg('s1', BE, 0, 4, -3, 0, 'acc'), s2: seg('s2', BE, 0, 4, 3, 0, 'ok'), a: { text: '5 + 5 = 10' } },
        },
        {
          say: 'Semua titik seperti itu membentuk elips.',
          add: [ellipse(), tag('e', 'jumlah = 10', RX, 110, 'pos', 15)],
        },
      ],
    },
    {
      title: 'a, b, dan c',
      steps: [
        {
          say: 'Setengah sumbu panjang disebut a. Di sini a sama dengan 5, karena jumlah jaraknya 10, yaitu 2a.',
          clear: true,
          add: [...BE.P.els, ellipse(), ...foci(3), seg('sa', BE, 0, 0, 5, 0, 'neg', { sw: 4 }), tag('la', 'a = 5', ...BE.P.at(2.5, 0.8), 'neg', 13), R('a', 'jumlah = 2a', 70)],
        },
        {
          say: 'Setengah sumbu pendek disebut b, di sini 4. Jarak pusat ke fokus disebut c, di sini 3.',
          add: [seg('sb', BE, 0, 0, 0, 4, 'pos', { sw: 4 }), tag('lb', 'b = 4', ...BE.P.at(-1.2, 2.2), 'pos', 13), R('b', 'c = 3 (ke fokus)', 100, 'acc', 14)],
        },
        {
          say: 'Garis dari 0 koma 4 ke fokus panjangnya a, yaitu 5. Jadi a, b, c membentuk segitiga siku-siku: a kuadrat sama dengan b kuadrat tambah c kuadrat.',
          add: [seg('sc', BE, 0, 4, 3, 0, 'neg', { dash: '5 4' }), tag('rel', 'a² = b² + c²', RX, 145, 'ok', 15), R('c', '25 = 16 + 9', 180, 'mut', 13)],
        },
      ],
    },
    {
      title: 'Persamaannya',
      steps: [
        {
          say: 'Elips berpusat di titik asal dengan sumbu panjang mendatar punya persamaan x kuadrat per a kuadrat tambah y kuadrat per b kuadrat sama dengan 1.',
          clear: true,
          add: [T('a', 'x²/a² + y²/b² = 1', 200, 60, { size: 32, c: 'pos' }), T('a2', 'fokus (±c, 0),  c² = a² − b²', 200, 105, { size: 18, c: 'mut' })],
        },
        {
          say: 'Contoh tadi: a sama dengan 5 dan b sama dengan 4. Persamaannya x kuadrat per 25 tambah y kuadrat per 16 sama dengan 1.',
          add: [T('b', 'x²/25 + y²/16 = 1', 200, 165, { size: 28, c: 'acc' }), T('b2', 'c² = 25 − 16 = 9 → c = 3', 200, 205, { size: 18 })],
        },
        {
          say: 'Cek titik 3 koma 3,2: 9 per 25 tambah 10,24 per 16 sama dengan 0,36 tambah 0,64, yaitu 1. Cocok.',
          add: [T('c', '9/25 + 10,24/16 = 0,36 + 0,64 = 1', 200, 255, { size: 17, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Elips x kuadrat per 169 tambah y kuadrat per 25 sama dengan 1. Di mana fokusnya?',
          clear: true,
          add: [T('q', 'x²/169 + y²/25 = 1', 200, 100, { size: 30, c: 'pos' }), T('q2', 'fokus = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '(±12, 0)', ok: true, why: 'c² = 169 − 25 = 144, jadi c = 12.' },
              { t: '(±13, 0)', why: '13 adalah a, ujung sumbu panjang. Fokus ada di dalam elips.' },
              { t: '(±√194, 0)', why: 'Pada elips, c² = a² − b², bukan a² + b².' },
              { t: '(0, ±12)', why: 'a² = 169 ada di bawah x², jadi sumbu panjangnya mendatar.' },
            ],
          },
        },
        {
          say: 'c kuadrat sama dengan 169 dikurangi 25, yaitu 144. Jadi c sama dengan 12, dan fokusnya plus minus 12 koma 0.',
          add: [T('a', 'c² = 169 − 25 = 144 → {g:(±12, 0)}', 200, 225, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Elips x²/36 + y²/20 = 1 memiliki fokus (±c, 0). Nilai c adalah …',
      ans: ['4'],
      wrong: { '16': 'Itu c². c = √16 = 4.', '56': 'Pada elips c² = a² − b² = 36 − 20.' },
      steps: ['c² = 36 − 20 = 16.', 'c = 4.'],
    },
    {
      type: 'num',
      q: 'Panjang sumbu mayor (sumbu panjang) elips x²/49 + y²/9 = 1 adalah …',
      ans: ['14'],
      wrong: { '7': '7 adalah a, setengah sumbu mayor. Panjangnya 2a.', '49': 'a² = 49 → a = 7 → 2a = 14.' },
      steps: ['a² = 49 → a = 7.', 'Sumbu mayor = 2a = 14.'],
    },
    {
      q: 'Untuk setiap titik pada elips, jumlah jaraknya ke kedua fokus sama dengan …',
      options: [
        { t: '2a', ok: true },
        { t: '2b', why: '2b adalah panjang sumbu pendek.' },
        { t: '2c', why: '2c adalah jarak antara kedua fokus.' },
        { t: 'a + b', why: 'Coba titik (a, 0): jaraknya (a + c) + (a − c) = 2a.' },
      ],
      steps: ['Di titik (a, 0): (a + c) + (a − c).', '= 2a.'],
    },
    {
      type: 'num',
      q: 'Elips berpusat di O dengan fokus (±4, 0) dan sumbu mayor 10. Nilai b adalah …',
      ans: ['3'],
      wrong: { '9': 'Itu b². b = √9 = 3.', '6': 'a = 5, c = 4 → b² = 25 − 16 = 9.' },
      steps: ['2a = 10 → a = 5. c = 4.', 'b² = 25 − 16 = 9 → b = 3.'],
    },
    {
      type: 'num',
      q: 'Elips x²/25 + y²/9 = 1 memotong sumbu y positif di titik (0, b). Nilai b adalah …',
      ans: ['3'],
      wrong: { '9': 'x = 0 → y² = 9 → y = 3.', '5': '5 adalah perpotongan dengan sumbu x.' },
      steps: ['x = 0 → y²/9 = 1.', 'y = 3.'],
    },
  ],
};

// ---------- 1.3 Hiperbola ----------
const BH = mk(6);
const branch = (id, s, o = {}) => pcurve(id, BH, (t) => s * 3 * Math.cosh(t), (t) => 4 * Math.sinh(t), -1.25, 1.25, { z: -1, ...o });
const hfoci = () => [pt('f1', BH, -5, 0, 'acc'), pt('f2', BH, 5, 0, 'acc'), tag('fl1', 'F₁', ...BH.P.at(-5, -0.9), 'acc', 12), tag('fl2', 'F₂', ...BH.P.at(5, -0.9), 'acc', 12)];
const HY = 16 / 3;

const l3 = {
  id: 'k12lb1-3',
  title: 'Hiperbola',
  hook: 'Hiperbola adalah titik-titik yang selisih jaraknya ke dua titik fokus selalu sama. Kedua lengkungannya makin lama makin mendekati dua garis yang disebut asimtot.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pada elips, jumlah jarak ke dua fokus tetap. Bagaimana kalau yang tetap adalah selisih jaraknya? Kurvanya seperti apa?',
          add: [...BH.P.els, ...hfoci(), R('q', 'selisih jarak', 70, 'ink'), R('q2', 'ke F₁ dan F₂ tetap', 95, 'ink'), R('q3', 'kurvanya?', 125, 'acc', 16)],
          ask: {
            options: [
              { t: 'dua lengkungan terpisah', ok: true, why: 'Titik bisa lebih dekat ke F₁ atau lebih dekat ke F₂, jadi ada dua cabang. Kurva ini disebut hiperbola.' },
              { t: 'elips yang lebih besar', why: 'Elips memakai jumlah jarak, bukan selisih.' },
              { t: 'lingkaran', why: 'Lingkaran hanya punya satu titik pusat.' },
              { t: 'satu parabola', why: 'Parabola memakai satu fokus dan satu garis.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Selisih jarak tetap',
      steps: [
        {
          say: 'Fokus di minus 5 koma 0 dan 5 koma 0. Titik 3 koma 0 berjarak 8 ke F1 dan 2 ke F2. Selisihnya 6.',
          clear: true,
          add: [...BH.P.els, ...hfoci(), pt('p', BH, 3, 0), seg('s1', BH, 3, 0, -5, 0, 'acc', { o: 0.6 }), seg('s2', BH, 3, 0, 5, 0, 'ok'), R('a', '8 − 2 = 6', 70)],
        },
        {
          say: 'Titik 5 koma 5,33: jaraknya 11,33 ke F1 dan 5,33 ke F2. Selisihnya tetap 6.',
          set: { p: { x: BH.P.X(5), y: BH.P.Y(HY) }, s1: seg('s1', BH, 5, HY, -5, 0, 'acc'), s2: seg('s2', BH, 5, HY, 5, 0, 'ok'), a: { text: '11,33 − 5,33 = 6' } },
        },
        {
          say: 'Hubungkan semua titik seperti itu. Titik yang lebih dekat ke F1 membentuk cabang kiri. Hiperbola punya dua cabang.',
          add: [branch('br', 1), branch('bl', -1), tag('e', 'selisih = 6 = 2a', RX, 120, 'pos', 14)],
        },
      ],
    },
    {
      title: 'Persamaan dan asimtot',
      steps: [
        {
          say: 'Di sini a sama dengan 3, setengah selisih jarak, dan c sama dengan 5. Pada hiperbola, c kuadrat sama dengan a kuadrat tambah b kuadrat, jadi b sama dengan 4.',
          clear: true,
          add: [...BH.P.els, branch('br', 1), branch('bl', -1), ...hfoci(), R('a', 'a = 3, c = 5', 60), tag('r', 'c² = a² + b²', RX, 95, 'ok', 14), R('b', 'b = 4', 128)],
        },
        {
          say: 'Persamaannya x kuadrat per 9 dikurangi y kuadrat per 16 sama dengan 1. Tanda minus inilah bedanya dengan elips.',
          add: [tag('e', 'x²/9 − y²/16 = 1', RX, 185, 'pos', 13)],
        },
        {
          say: 'Makin jauh, cabangnya makin dekat dengan dua garis putus-putus, yaitu asimtot y sama dengan plus minus b per a x. Di sini plus minus 4 per 3 x.',
          add: [lineOn('as1', BH.P, 4 / 3, 0, BH.C, { c: 'mut', sw: 2, dash: '6 5', z: -2 }), lineOn('as2', BH.P, -4 / 3, 0, BH.C, { c: 'mut', sw: 2, dash: '6 5', z: -2 }), R('as', 'asimtot y = ±4/3 x', 225, 'mut', 13)],
        },
      ],
    },
    {
      title: 'Elips dan hiperbola',
      steps: [
        {
          say: 'Elips: jumlah jarak tetap, persamaannya memakai tanda plus, dan c kuadrat sama dengan a kuadrat dikurangi b kuadrat.',
          clear: true,
          add: [T('a', 'elips', 200, 45, { size: 24, c: 'pos' }), T('a2', 'jumlah jarak = 2a', 200, 80, { size: 17 }), T('a3', 'x²/a² + y²/b² = 1,   c² = a² − b²', 200, 110, { size: 17 })],
        },
        {
          say: 'Hiperbola: selisih jarak tetap, persamaannya memakai tanda minus, dan c kuadrat sama dengan a kuadrat tambah b kuadrat.',
          add: [T('b', 'hiperbola', 200, 170, { size: 24, c: 'acc' }), T('b2', 'selisih jarak = 2a', 200, 205, { size: 17 }), T('b3', 'x²/a² − y²/b² = 1,   c² = a² + b²', 200, 235, { size: 17 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Apa persamaan asimtot hiperbola x kuadrat per 16 dikurangi y kuadrat per 9 sama dengan 1?',
          clear: true,
          add: [T('q', 'x²/16 − y²/9 = 1', 200, 100, { size: 30, c: 'pos' }), T('q2', 'asimtot = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: 'y = ±(3/4)x', ok: true, why: 'a = 4, b = 3. Asimtot y = ±(b/a)x.' },
              { t: 'y = ±(4/3)x', why: 'b/a, bukan a/b. b = 3 di bawah y².' },
              { t: 'y = ±(9/16)x', why: 'Pakai a dan b, bukan a² dan b².' },
              { t: 'y = ±5x', why: '5 adalah c. Asimtot memakai b/a.' },
            ],
          },
        },
        {
          say: 'a kuadrat 16, jadi a sama dengan 4. b kuadrat 9, jadi b sama dengan 3. Asimtotnya y sama dengan plus minus 3 per 4 x.',
          add: [T('a', 'a = 4, b = 3 → {g:y = ±(3/4)x}', 200, 225, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Hiperbola x²/9 − y²/16 = 1 memiliki fokus (±c, 0). Nilai c adalah …',
      ans: ['5'],
      wrong: { '7': 'c² = 9 + 16 = 25, bukan c = 3 + 4.', '3': 'Itu a. Pada hiperbola c² = a² + b².' },
      steps: ['c² = 9 + 16 = 25.', 'c = 5.'],
    },
    {
      q: 'Persamaan asimtot hiperbola x²/4 − y²/25 = 1 adalah …',
      options: [
        { t: 'y = ±(5/2)x', ok: true },
        { t: 'y = ±(2/5)x', why: 'Asimtot y = ±(b/a)x dengan b = 5, a = 2.' },
        { t: 'y = ±(25/4)x', why: 'Pakai a dan b, bukan kuadratnya.' },
        { t: 'y = ±5x', why: 'b dibagi a = 2.' },
      ],
      steps: ['a = 2, b = 5.', 'y = ±(5/2)x.'],
    },
    {
      type: 'num',
      q: 'Jarak kedua titik puncak hiperbola x²/36 − y²/64 = 1 adalah …',
      ans: ['12'],
      wrong: { '6': '6 adalah a. Kedua puncak di (±6, 0), jaraknya 12.', '20': '20 adalah jarak kedua fokus (2c).' },
      steps: ['Puncak (±a, 0) dengan a = 6.', 'Jarak = 2a = 12.'],
    },
    {
      q: 'Pada hiperbola x²/a² − y²/b² = 1, hubungan a, b, dan c adalah …',
      options: [
        { t: 'c² = a² + b²', ok: true },
        { t: 'c² = a² − b²', why: 'Itu untuk elips.' },
        { t: 'c = a + b', why: 'Hubungannya lewat kuadrat.' },
        { t: 'a² = b² + c²', why: 'Itu juga untuk elips.' },
      ],
      steps: ['Hiperbola: fokus lebih jauh dari puncak.', 'c² = a² + b².'],
    },
    {
      type: 'num',
      q: 'Titik P pada hiperbola x²/25 − y²/144 = 1. Selisih jarak P ke kedua fokus adalah …',
      ans: ['10'],
      wrong: { '5': 'Selisihnya 2a, bukan a.', '26': '26 adalah jarak kedua fokus (2c).' },
      steps: ['a² = 25 → a = 5.', 'Selisih = 2a = 10.'],
    },
  ],
};

export default {
  id: 'k12lb1',
  no: 1,
  title: 'Geometri Analitik',
  desc: 'Irisan kerucut: parabola dengan fokus dan direktris, elips dengan jumlah jarak tetap, serta hiperbola dengan selisih jarak tetap dan asimtotnya.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Parabola y² = 20x memiliki fokus (p, 0). Nilai p adalah …',
      ans: ['5'],
      wrong: { '20': '20 = 4p → p = 5.', '10': '4p = 20, bukan 2p.' },
      steps: ['4p = 20.', 'p = 5.'],
    },
    {
      q: 'Kurva x²/16 + y²/16 = 1 adalah …',
      options: [
        { t: 'lingkaran berjari-jari 4', ok: true },
        { t: 'elips dengan fokus (±4, 0)', why: 'a = b = 4, jadi c = 0. Kedua fokus berimpit di pusat: lingkaran.' },
        { t: 'hiperbola', why: 'Tandanya plus, bukan minus.' },
        { t: 'lingkaran berjari-jari 16', why: 'Kalikan 16: x² + y² = 16, jari-jarinya √16 = 4.' },
      ],
      steps: ['Kalikan 16: x² + y² = 16.', 'Lingkaran berjari-jari 4.'],
    },
    {
      type: 'num',
      q: 'Jarak kedua fokus elips x²/100 + y²/64 = 1 adalah …',
      ans: ['12'],
      wrong: { '6': '6 adalah c. Jarak kedua fokus 2c.', '36': 'Itu c². c = 6, jarak 2c = 12.' },
      steps: ['c² = 100 − 64 = 36 → c = 6.', 'Jarak = 2c = 12.'],
    },
  ],
};
