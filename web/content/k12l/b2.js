// Kelas 12 Tingkat Lanjut · Bab 2: Limit
import { T, F, dot, table } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag, curve } from '../k10/kit.js';
import { mk, fpath } from '../k12/kit.js';

const RX = 335;
const R = (id, text, y, c = 'ink', size = 14) => T(id, text, RX, y, { size, c });
// Tulisan limit: "lim" dengan keterangan "x → a" kecil di bawahnya
const LIM = (id, a, x, y, size = 24, c = 'ink') => [T(`${id}l`, 'lim', x, y, { size, c }), T(`${id}s`, `x → ${a}`, x, y + size * 1.0, { size: size * 0.48, c })];

// ---------- 2.1 Konsep limit ----------
const B = mk(5);
const hole = (id, a, b, c = 'pos') => ({ id, t: 'circle', x: B.P.X(a), y: B.P.Y(b), r: 6, fill: 'paper', stroke: c, sw: 2.5, z: 2 });
const pt = (id, a, b, c = 'neg') => dot(id, B.P.X(a), B.P.Y(b), c, { r: 6, z: 3 });
const at = (a, b) => ({ x: B.P.X(a), y: B.P.Y(b) });

const l1 = {
  id: 'k12lb2-1',
  title: 'Konsep Limit',
  hook: 'Limit menanyakan nilai yang didekati f(x) ketika x makin dekat ke suatu angka, walaupun di angka itu sendiri fungsinya tidak terdefinisi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Fungsi f x sama dengan x kuadrat dikurangi 1, dibagi x dikurangi 1. Di x sama dengan 1, hasilnya 0 per 0, tidak terdefinisi. Tetapi kalau x makin dekat ke 1, nilai f x makin dekat ke berapa?',
          add: [F('fr', 'x² − 1', 'x − 1', 200, 90, { size: 30, c: 'pos' }), T('fx', 'f(x) =', 88, 90, { size: 26, c: 'pos' }), T('q', 'x → 1,  f(x) → ?', 200, 185, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '2', ok: true, why: 'x² − 1 = (x − 1)(x + 1), jadi untuk x ≠ 1, f(x) = x + 1. Dekat x = 1, nilainya dekat 2.' },
              { t: '0', why: 'Pembilang mendekati 0, tetapi penyebutnya juga mendekati 0. Hasil baginya tidak mendekati 0.' },
              { t: 'tidak ada', why: 'f(1) memang tidak ada, tetapi nilai di sekitarnya mendekati satu angka tertentu.' },
              { t: '1', why: '1 adalah angka yang didekati x, bukan f(x).' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mendekat dari dua arah',
      steps: [
        {
          say: 'Untuk x selain 1, f x sama dengan x tambah 1. Grafiknya garis lurus dengan satu lubang di titik 1 koma 2.',
          clear: true,
          add: [...B.P.els, fpath('ln', B, (x) => x + 1, -5, 4, { z: -1 }), hole('h', 1, 2), tag('e', 'f(x) = x + 1, x ≠ 1', RX, 50, 'pos', 12)],
        },
        {
          say: 'Dekati x sama dengan 1 dari kiri: x sama dengan 0, lalu 0,5, lalu 0,9. Nilai f x: 1, lalu 1,5, lalu 1,9.',
          add: [pt('pl', -1, 0), table('tb', RX, 150, [['x', 'f(x)'], ['0,9', '1,9'], ['0,99', '1,99'], ['1,01', '2,01'], ['1,1', '2,1']], { cw: [55, 55], rh: 26, size: 13, head: true })],
        },
        {
          say: 'Titik merah merayap mendekati lubang.',
          set: { pl: at(0.85, 1.85) },
        },
        {
          say: 'Dari kanan juga: x sama dengan 1,1, lalu 1,01. Nilai f x 2,1, lalu 2,01. Dari kedua arah, f x makin dekat ke 2.',
          add: [pt('pr', 3, 4, 'acc')],
        },
        {
          say: 'Kedua titik makin dekat ke lubang di ketinggian 2.',
          set: { pr: at(1.15, 2.15) },
          add: [R('k', 'mendekati 2', 245, 'ok', 15)],
        },
      ],
    },
    {
      title: 'Cara menulisnya',
      steps: [
        {
          say: 'Ditulis: limit f x untuk x mendekati 1 sama dengan 2.',
          clear: true,
          add: [...LIM('a', 1, 120, 70, 30, 'pos'), T('a2', 'f(x) = 2', 225, 70, { size: 30, c: 'pos' })],
        },
        {
          say: 'Limit tidak sama dengan nilai fungsi. f 1 tidak terdefinisi, tetapi limitnya ada, yaitu 2. Limit hanya melihat nilai di sekitar 1, bukan tepat di 1.',
          add: [T('b', 'f(1) = 0/0 → tidak terdefinisi', 200, 150, { size: 18, c: 'neg' }), T('c', 'limit melihat sekitar x = 1, bukan tepat di 1', 200, 190, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Limit kiri dan kanan',
      steps: [
        {
          say: 'Fungsi ini melompat di x sama dengan 2. Dari kiri, nilainya mendekati 3. Dari kanan, nilainya mendekati 1.',
          clear: true,
          add: [...B.P.els, fpath('a', B, (x) => x + 1, -5, 2, { z: -1 }), fpath('b', B, () => 1, 2, 5, { stroke: 'acc', z: -1 }), hole('h', 2, 3), dot('d', B.P.X(2), B.P.Y(1), 'acc', { r: 6, stroke: 'acc' }), R('a1', 'dari kiri → 3', 60, 'pos'), R('a2', 'dari kanan → 1', 85, 'acc')],
        },
        {
          say: 'Limit kiri dan limit kanan berbeda, jadi limit di x sama dengan 2 tidak ada. Limit ada hanya jika limit kiri sama dengan limit kanan.',
          add: [tag('k', 'kiri ≠ kanan', RX, 135, 'neg', 15), R('k2', 'limit tidak ada', 165, 'neg', 14)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari tabel ini, berapa limit f x untuk x mendekati 3?',
          clear: true,
          add: [table('tb', 200, 90, [['x', '2,9', '2,99', '3,01', '3,1'], ['f(x)', '5,9', '5,99', '6,01', '6,1']], { cw: [60, 60, 60, 60, 60], rh: 34, size: 16, head: false }), T('q', 'x → 3,  f(x) → ?', 200, 180, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '6', ok: true, why: 'Dari kiri 5,9 → 5,99. Dari kanan 6,1 → 6,01. Keduanya mendekati 6.' },
              { t: '3', why: '3 adalah angka yang didekati x.' },
              { t: '5,99', why: 'Itu salah satu nilai di tabel. Limit adalah angka yang didekati.' },
              { t: 'tidak ada', why: 'Kiri dan kanan mendekati angka yang sama, jadi limitnya ada.' },
            ],
          },
        },
        {
          say: 'Dari kiri dan dari kanan, f x makin dekat ke 6. Jadi limitnya 6.',
          add: [...LIM('a', 3, 150, 240, 26), T('a2', 'f(x) = {g:6}', 240, 240, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai lim(x → 2) (3x + 1) adalah …',
      ans: ['7'],
      wrong: { '6': '3 × 2 + 1 = 7.', '5': 'Kalikan dulu: 3 × 2 = 6, lalu + 1.' },
      steps: ['Fungsi linear: substitusi x = 2.', '3 × 2 + 1 = 7.'],
    },
    {
      q: 'Saat x mendekati 5 dari kiri, f(x) mendekati 4. Saat x mendekati 5 dari kanan, f(x) juga mendekati 4. Nilai lim(x → 5) f(x) adalah …',
      options: [
        { t: '4', ok: true },
        { t: '5', why: '5 adalah angka yang didekati x.' },
        { t: 'tidak ada', why: 'Limit kiri dan kanan sama, jadi limitnya ada.' },
        { t: 'f(5)', why: 'Limit tidak harus sama dengan f(5). Yang menentukan adalah nilai yang didekati.' },
      ],
      steps: ['Limit kiri = limit kanan = 4.', 'Limitnya 4.'],
    },
    {
      q: 'Limit kiri f(x) di x = 1 adalah 3, sedangkan limit kanannya 5. Maka lim(x → 1) f(x) …',
      options: [
        { t: 'tidak ada', ok: true },
        { t: '4', why: 'Limit bukan rata-rata kiri dan kanan.' },
        { t: '3', why: 'Limit kanan juga harus sama.' },
        { t: '5', why: 'Limit kiri juga harus sama.' },
      ],
      steps: ['Limit ada hanya jika kiri = kanan.', '3 ≠ 5, jadi limit tidak ada.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → 1) (x² − 1) ÷ (x − 1) adalah …',
      ans: ['2'],
      wrong: { '0': '0/0 bukan jawaban. Faktorkan: (x − 1)(x + 1) ÷ (x − 1) = x + 1.', '1': 'Setelah difaktorkan, x + 1 dengan x = 1 bernilai 2.' },
      steps: ['(x² − 1) ÷ (x − 1) = x + 1 untuk x ≠ 1.', 'x → 1: 1 + 1 = 2.'],
    },
    {
      q: 'Jika f(2) tidak terdefinisi, maka lim(x → 2) f(x) …',
      options: [
        { t: 'bisa saja ada', ok: true },
        { t: 'pasti tidak ada', why: 'Contohnya (x² − 4) ÷ (x − 2): f(2) tidak ada, tetapi limitnya 4.' },
        { t: 'pasti 0', why: 'Limit dilihat dari nilai di sekitar 2, tidak harus 0.' },
        { t: 'pasti tak hingga', why: 'Limit bisa berupa bilangan biasa walaupun f(2) tidak ada.' },
      ],
      steps: ['Limit melihat nilai di sekitar x = 2.', 'Nilai tepat di 2 tidak menentukan.'],
    },
  ],
};

// ---------- 2.2 Menghitung limit aljabar ----------
const l2 = {
  id: 'k12lb2-2',
  title: 'Menghitung Limit Aljabar',
  hook: 'Coba substitusi dulu. Kalau hasilnya 0/0, faktorkan atau kalikan sekawan agar faktor penyebab nol bisa dicoret.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa limit x kuadrat dikurangi 9, dibagi x dikurangi 3, untuk x mendekati 3?',
          add: [...LIM('a', 3, 110, 100, 28, 'pos'), F('fr', 'x² − 9', 'x − 3', 220, 100, { size: 28, c: 'pos' }), T('q', '= ?', 315, 100, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '6', ok: true, why: 'x² − 9 = (x − 3)(x + 3). Coret x − 3, sisa x + 3 → 3 + 3 = 6.' },
              { t: '0', why: 'Substitusi menghasilkan 0/0, yang belum berarti 0. Faktorkan dulu.' },
              { t: '3', why: 'Setelah difaktorkan, sisa x + 3. Dengan x = 3 hasilnya 6.' },
              { t: 'tidak ada', why: '0/0 artinya perlu diolah lagi, bukan berarti limitnya tidak ada.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Substitusi langsung',
      steps: [
        {
          say: 'Langkah pertama selalu substitusi. Limit x kuadrat tambah 3x untuk x mendekati 2: masukkan 2. 4 tambah 6 sama dengan 10.',
          clear: true,
          add: [...LIM('a', 2, 100, 70, 26), T('a2', '(x² + 3x) = 4 + 6 = {g:10}', 245, 70, { size: 24 })],
        },
        {
          say: 'Kalau substitusi menghasilkan bilangan biasa, itulah limitnya. Kalau menghasilkan 0 per 0, bentuknya harus diolah.',
          add: [T('b', 'hasil bilangan biasa → selesai', 200, 150, { size: 18, c: 'ok' }), T('c', 'hasil 0/0 → olah dulu', 200, 185, { size: 18, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Bentuk 0/0: faktorkan',
      steps: [
        {
          say: 'Kembali ke x kuadrat dikurangi 9, dibagi x dikurangi 3. Substitusi x sama dengan 3 memberi 0 per 0.',
          clear: true,
          add: [F('f1', 'x² − 9', 'x − 3', 110, 70, { size: 26, c: 'pos' }), T('s', 'x = 3 → 0/0', 280, 70, { size: 20, c: 'neg' })],
        },
        {
          say: 'Faktorkan pembilangnya: x dikurangi 3, kali x tambah 3.',
          add: [T('e1', '=', 48, 155, { size: 26 }), F('f2', '(x − 3)(x + 3)', 'x − 3', 190, 155, { size: 24 })],
        },
        {
          say: 'Faktor x dikurangi 3 ada di atas dan di bawah. Karena x hanya mendekati 3, bukan sama dengan 3, faktor itu tidak nol dan boleh dicoret. Sisanya x tambah 3.',
          add: [T('e2', '= x + 3', 120, 235, { size: 26, c: 'acc' }), T('n', 'x ≠ 3, jadi x − 3 ≠ 0', 290, 235, { size: 15, c: 'mut' })],
        },
        {
          say: 'Sekarang substitusi: 3 tambah 3 sama dengan 6.',
          add: [T('e3', '→ 6', 330, 155, { size: 30, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Bentuk akar: kalikan sekawan',
      steps: [
        {
          say: 'Limit akar x dikurangi 2, dibagi x dikurangi 4, untuk x mendekati 4. Substitusi memberi 0 per 0. Bentuk akar tidak mudah difaktorkan.',
          clear: true,
          add: [...LIM('a', 4, 70, 60, 24), F('f1', '√x − 2', 'x − 4', 170, 60, { size: 24, c: 'pos' }), T('s', '0/0', 300, 60, { size: 20, c: 'neg' })],
        },
        {
          say: 'Kalikan atas dan bawah dengan sekawannya, akar x tambah 2. Pembilangnya menjadi x dikurangi 4.',
          add: [T('e1', '= (x − 4) ÷ ((x − 4)(√x + 2))', 200, 140, { size: 20 })],
        },
        {
          say: 'Coret x dikurangi 4. Sisa 1 per akar x tambah 2. Substitusi 4: 1 per 2 tambah 2, yaitu 1 per 4.',
          add: [T('e2', '= 1 ÷ (√x + 2) → 1 ÷ (2 + 2) = {g:1/4}', 200, 200, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa limit x kuadrat dikurangi 5x tambah 6, dibagi x dikurangi 2, untuk x mendekati 2?',
          clear: true,
          add: [...LIM('a', 2, 80, 100, 26, 'pos'), F('fr', 'x² − 5x + 6', 'x − 2', 210, 100, { size: 26, c: 'pos' }), T('q', '= ?', 330, 100, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '−1', ok: true, why: 'x² − 5x + 6 = (x − 2)(x − 3). Sisa x − 3 → 2 − 3 = −1.' },
              { t: '0', why: '0/0 belum jawaban. Faktorkan dulu.' },
              { t: '1', why: 'Sisa faktornya x − 3, bukan 3 − x.' },
              { t: '5', why: 'Faktorkan: (x − 2)(x − 3), lalu substitusi x = 2 ke x − 3.' },
            ],
          },
        },
        {
          say: 'Faktorkan: x dikurangi 2, kali x dikurangi 3. Coret x dikurangi 2. Sisa x dikurangi 3, dengan x sama dengan 2 hasilnya minus 1.',
          add: [T('a2', '(x − 2)(x − 3) ÷ (x − 2) = x − 3 → {g:−1}', 200, 200, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai lim(x → 1) (x² + 2x + 3) adalah …',
      ans: ['6'],
      wrong: { '5': '1 + 2 + 3 = 6.', '0': 'Tidak ada bentuk 0/0. Substitusi langsung.' },
      steps: ['Substitusi x = 1.', '1 + 2 + 3 = 6.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → 5) (x² − 25) ÷ (x − 5) adalah …',
      ans: ['10'],
      wrong: { '0': 'Faktorkan: (x − 5)(x + 5) ÷ (x − 5) = x + 5.', '5': 'Sisa x + 5, dengan x = 5: 10.' },
      steps: ['= x + 5 untuk x ≠ 5.', '5 + 5 = 10.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → −2) (x² − 4) ÷ (x + 2) adalah …',
      ans: ['-4'],
      wrong: { '4': 'Sisa x − 2, dengan x = −2: −2 − 2 = −4.', '0': 'Faktorkan: (x + 2)(x − 2) ÷ (x + 2).' },
      steps: ['= x − 2 untuk x ≠ −2.', '−2 − 2 = −4.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → 9) (√x − 3) ÷ (x − 9) adalah …',
      ans: ['1/6'],
      wrong: { '6': 'Hasilnya 1 ÷ (√x + 3) = 1/6, bukan 6.', '0': 'Kalikan sekawan √x + 3 dulu.' },
      steps: ['Kalikan sekawan: = 1 ÷ (√x + 3).', 'x → 9: 1 ÷ (3 + 3) = 1/6.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → 1) (x² + x − 2) ÷ (x − 1) adalah …',
      ans: ['3'],
      wrong: { '0': 'Faktorkan: (x − 1)(x + 2).', '2': 'Sisa x + 2, dengan x = 1: 3.' },
      steps: ['x² + x − 2 = (x − 1)(x + 2).', 'Sisa x + 2 → 1 + 2 = 3.'],
    },
  ],
};

// ---------- 2.3 Limit di tak hingga ----------
const CI = { x: 30, y: 30, w: 240, h: 240, xmin: -1, xmax: 10, ymin: -1, ymax: 4 };
const PI = plane('pl', { ...CI, every: 2 });

const l3 = {
  id: 'k12lb2-3',
  title: 'Limit di Tak Hingga',
  hook: 'Ketika x menjadi sangat besar, suku dengan pangkat tertinggi yang menentukan. Bagi semua suku dengan pangkat tertinggi penyebut.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'x dibuat makin besar tanpa batas: 10, 100, sejuta, dan seterusnya. Nilai 1 per x mendekati berapa?',
          add: [...LIM('a', '∞', 150, 100, 30, 'pos'), F('fr', '1', 'x', 220, 100, { size: 30, c: 'pos' }), T('q', '= ?', 280, 100, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '0', ok: true, why: '1 dibagi bilangan yang sangat besar hasilnya sangat kecil, makin dekat ke 0.' },
              { t: '1', why: '1 per 1 = 1, tetapi x tidak tetap 1, terus membesar.' },
              { t: '∞', why: 'Yang membesar adalah penyebut, jadi hasil baginya mengecil.' },
              { t: '−1', why: '1/x untuk x positif selalu positif.' },
            ],
          },
        },
      ],
    },
    {
      title: '1/x makin kecil',
      steps: [
        {
          say: 'Grafik y sama dengan 1 per x untuk x positif. Makin ke kanan, kurvanya makin rapat ke sumbu x, tetapi tidak pernah menyentuhnya.',
          clear: true,
          add: [...PI.els, curve('cv', PI, (x) => 1 / x, CI, { from: 0.26, to: 10 }), tag('e', 'y = 1/x', RX, 50, 'pos', 16)],
        },
        {
          say: 'x sama dengan 10, nilainya 0,1. x sama dengan 100, nilainya 0,01. x sama dengan 1000, nilainya 0,001. Makin dekat ke 0.',
          add: [table('tb', RX, 145, [['x', '1/x'], ['10', '0,1'], ['100', '0,01'], ['1000', '0,001']], { cw: [55, 55], rh: 26, size: 13, head: true })],
        },
        {
          say: 'Jadi limit 1 per x untuk x mendekati tak hingga sama dengan 0. Begitu juga 5 per x, atau 1 per x kuadrat.',
          add: [tag('k', '→ 0', RX, 235, 'ok', 18)],
        },
      ],
    },
    {
      title: 'Bagi pangkat tertinggi',
      steps: [
        {
          say: 'Limit 3x kuadrat tambah x, dibagi x kuadrat tambah 5, untuk x mendekati tak hingga. Pangkat tertinggi penyebut adalah x kuadrat.',
          clear: true,
          add: [...LIM('a', '∞', 80, 60, 24), F('f1', '3x² + x', 'x² + 5', 190, 60, { size: 24, c: 'pos' })],
        },
        {
          say: 'Bagi setiap suku dengan x kuadrat. 3x kuadrat per x kuadrat menjadi 3. x per x kuadrat menjadi 1 per x. 5 per x kuadrat tetap ditulis.',
          add: [T('e1', '=', 60, 150, { size: 24 }), F('f2', '3 + 1/x', '1 + 5/x²', 180, 150, { size: 24 })],
        },
        {
          say: 'Saat x mendekati tak hingga, 1 per x dan 5 per x kuadrat mendekati 0. Sisa 3 per 1, yaitu 3.',
          add: [T('e2', '→ (3 + 0) ÷ (1 + 0) = {g:3}', 200, 235, { size: 24 })],
        },
      ],
    },
    {
      title: 'Tiga kemungkinan',
      steps: [
        {
          say: 'Bandingkan pangkat tertinggi pembilang dan penyebut. Jika pangkat atas lebih kecil, limitnya 0.',
          clear: true,
          add: [T('a', 'pangkat atas < bawah → 0', 200, 70, { size: 22, c: 'pos' })],
        },
        {
          say: 'Jika pangkatnya sama, limitnya adalah perbandingan koefisien pangkat tertinggi. Seperti tadi, 3 per 1.',
          add: [T('b', 'pangkat sama → rasio koefisien', 200, 130, { size: 22, c: 'acc' })],
        },
        {
          say: 'Jika pangkat atas lebih besar, nilainya terus membesar. Limitnya tak hingga.',
          add: [T('c', 'pangkat atas > bawah → ∞', 200, 190, { size: 22, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa limit 4x pangkat 3 dikurangi x, dibagi 2x pangkat 3 tambah 7, untuk x mendekati tak hingga?',
          clear: true,
          add: [...LIM('a', '∞', 90, 100, 26, 'pos'), F('fr', '4x³ − x', '2x³ + 7', 210, 100, { size: 26, c: 'pos' }), T('q', '= ?', 320, 100, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '2', ok: true, why: 'Pangkat sama (3). Koefisien 4 ÷ 2 = 2.' },
              { t: '0', why: 'Limit 0 kalau pangkat atas lebih kecil. Di sini pangkatnya sama.' },
              { t: '∞', why: 'Tak hingga kalau pangkat atas lebih besar. Di sini sama.' },
              { t: '−1/7', why: 'Itu nilai saat x = 0. Kita mencari x yang sangat besar.' },
            ],
          },
        },
        {
          say: 'Pangkat tertinggi atas dan bawah sama-sama 3. Limitnya 4 dibagi 2, yaitu 2.',
          add: [T('a2', 'pangkat sama → 4 ÷ 2 = {g:2}', 200, 200, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai lim(x → ∞) (5x + 1) ÷ (x − 2) adalah …',
      ans: ['5'],
      wrong: { '-1/2': 'Itu nilai saat x = 0.', '0': 'Pangkat sama, jadi limitnya 5 ÷ 1.' },
      steps: ['Pangkat atas = pangkat bawah = 1.', '5 ÷ 1 = 5.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → ∞) (2x + 3) ÷ (x² + 1) adalah …',
      ans: ['0'],
      wrong: { '2': 'Pangkat atas (1) lebih kecil dari pangkat bawah (2).', '3': 'Itu nilai saat x = 0.' },
      steps: ['Pangkat atas 1 < pangkat bawah 2.', 'Limit = 0.'],
    },
    {
      q: 'Nilai lim(x → ∞) x³ ÷ (x² + 1) adalah …',
      options: [
        { t: '∞', ok: true },
        { t: '0', why: 'Pangkat atas lebih besar, bukan lebih kecil.' },
        { t: '1', why: 'Pangkatnya berbeda: 3 dan 2.' },
        { t: '3/2', why: 'Pangkat tidak dibagi.' },
      ],
      steps: ['Pangkat atas 3 > pangkat bawah 2.', 'Limit = ∞.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → ∞) (6x² − x) ÷ (3x² + 4) adalah …',
      ans: ['2'],
      wrong: { '0': 'Pangkat sama, jadi 6 ÷ 3.', '-1/4': 'Bukan nilai saat x = 0.' },
      steps: ['Pangkat sama (2).', '6 ÷ 3 = 2.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → ∞) (1 − 2x²) ÷ (x² + 3) adalah …',
      ans: ['-2'],
      wrong: { '2': 'Koefisien x² di atas adalah −2.', '1/3': 'Itu nilai saat x = 0.' },
      steps: ['Pangkat sama (2).', '−2 ÷ 1 = −2.'],
    },
  ],
};

export default {
  id: 'k12lb2',
  no: 2,
  title: 'Limit',
  desc: 'Arti limit dari dua arah, limit kiri dan kanan, menghitung limit bentuk 0/0 dengan faktorisasi dan sekawan, serta limit di tak hingga.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Nilai lim(x → 3) (2x² − 18) ÷ (x − 3) adalah …',
      ans: ['12'],
      wrong: { '6': '2(x − 3)(x + 3) ÷ (x − 3) = 2(x + 3) → 2 × 6 = 12.', '0': 'Faktorkan dulu.' },
      steps: ['2x² − 18 = 2(x − 3)(x + 3).', 'Sisa 2(x + 3) → 2 × 6 = 12.'],
    },
    {
      q: 'Nilai lim(x → ∞) (x + 1) ÷ x adalah …',
      options: [
        { t: '1', ok: true },
        { t: '0', why: 'Pangkat sama, koefisien 1 ÷ 1.' },
        { t: '∞', why: 'Pembilang dan penyebut sama-sama membesar dengan laju yang sama.' },
        { t: '2', why: '(x + 1) ÷ x = 1 + 1/x → 1 + 0.' },
      ],
      steps: ['(x + 1) ÷ x = 1 + 1/x.', '1/x → 0, jadi limit = 1.'],
    },
    {
      type: 'num',
      q: 'Nilai lim(x → 4) (x² − 16) ÷ (x − 4) adalah …',
      ans: ['8'],
      wrong: { '4': 'Sisa x + 4, dengan x = 4: 8.', '0': 'Faktorkan: (x − 4)(x + 4).' },
      steps: ['= x + 4 untuk x ≠ 4.', '4 + 4 = 8.'],
    },
  ],
};
