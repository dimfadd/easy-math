// Kelas 12 · Bab 1: Transformasi Fungsi
import { T, dot } from '../helpers.js';
import { tag } from '../k10/kit.js';
import { mk, fpath, shift } from './kit.js';

const B = mk(5);
const X = B.P.X;
const Y = B.P.Y;
const RX = 335; // kolom kanan untuk persamaan dan keterangan
const sq = (x) => x * x;
const ghost = (f, a, b, id = 'g0') => fpath(id, B, f, a, b, { stroke: 'mut', sw: 1.5, dash: '5 4', z: -1 });
const pt = (id, a, b, c = 'neg') => dot(id, X(a), Y(b), c, { r: 6 });
const at = (a, b) => ({ x: X(a), y: Y(b) });
const R = (id, text, y, c = 'ink', size = 14) => T(id, text, RX, y, { size, c });

// ---------- 1.1 Translasi fungsi ----------
const l1 = {
  id: 'k12b1-1',
  title: 'Translasi Fungsi',
  hook: 'Menggeser grafik berarti menambah atau mengurangi x dan y. Geser ke kanan justru ditulis dengan tanda minus.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini grafik y sama dengan x kuadrat. Seluruh grafik digeser 3 satuan ke kanan. Persamaan grafik barunya apa?',
          add: [...B.P.els, fpath('f', B, sq, -2.2, 2.2), tag('fe', 'y = x²', RX, 60, 'pos', 16), R('q', 'geser 3 ke kanan', 110, 'acc', 15)],
          ask: {
            options: [
              { t: 'y = (x − 3)²', ok: true, why: 'Puncak baru di x = 3, dan (3 − 3)² = 0. Geser ke kanan ditulis x − 3.' },
              { t: 'y = (x + 3)²', why: 'Puncak (x + 3)² ada di x = −3, berarti bergeser ke kiri.' },
              { t: 'y = x² + 3', why: 'Menambah 3 di luar menggeser grafik ke atas, bukan ke kanan.' },
              { t: 'y = x² − 3', why: 'Mengurangi 3 di luar menggeser grafik ke bawah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Geser naik dan turun',
      steps: [
        {
          say: 'Kita mulai dengan geser ke atas. Tiga titik merah ada di grafik y sama dengan x kuadrat.',
          clear: true,
          add: [...B.P.els, ghost(sq, -1.7, 1.7), fpath('f', B, sq, -1.7, 1.7), pt('d0', -1, 1), pt('d1', 0, 0), pt('d2', 1, 1), tag('fe', 'y = x²', RX, 50, 'pos', 16)],
        },
        {
          say: 'Geser seluruh grafik 2 satuan ke atas. Titik 0 koma 0 pindah ke 0 koma 2. Titik 1 koma 1 pindah ke 1 koma 3.',
          set: { f: { ...shift(B, 0, 2), stroke: 'acc' }, d0: at(-1, 3), d1: at(0, 2), d2: at(1, 3) },
          add: [R('a1', '(0, 0) → (0, 2)', 100), R('a2', '(1, 1) → (1, 3)', 125)],
        },
        {
          say: 'Nilai y setiap titik bertambah 2. Jadi persamaannya y sama dengan x kuadrat tambah 2. Kalau digeser ke bawah, nilai y dikurangi.',
          add: [tag('ge', 'y = x² + 2', RX, 175, 'acc', 16), R('k', 'y tiap titik + 2', 215, 'mut', 13)],
        },
      ],
    },
    {
      title: 'Geser kanan dan kiri',
      steps: [
        {
          say: 'Sekarang geser y sama dengan x kuadrat 3 satuan ke kanan.',
          clear: true,
          add: [...B.P.els, ghost(sq, -1.7, 1.7), fpath('f', B, sq, -1.7, 1.7), pt('d0', -1, 1), pt('d1', 0, 0), pt('d2', 1, 1), tag('fe', 'y = x²', RX, 50, 'pos', 16)],
        },
        {
          say: 'Puncaknya pindah dari 0 koma 0 ke 3 koma 0. Setiap titik bergeser 3 ke kanan.',
          set: { f: { ...shift(B, 3, 0), stroke: 'acc' }, d0: at(2, 1), d1: at(3, 0), d2: at(4, 1) },
          add: [R('a1', '(0, 0) → (3, 0)', 100)],
        },
        {
          say: 'Persamaan baru harus bernilai 0 saat x sama dengan 3. x kuadrat tidak memenuhi, karena 3 kuadrat sama dengan 9. Yang memenuhi adalah x dikurangi 3, lalu dikuadratkan.',
          add: [R('c', 'x = 3 → (3 − 3)² = 0', 135, 'ink', 13), tag('ge', 'y = (x − 3)²', RX, 175, 'acc', 16)],
        },
        {
          say: 'Jadi geser ke kanan ditulis dengan tanda minus di dalam kurung. Geser ke kiri memakai tanda plus.',
          add: [R('k1', 'kanan 3 → x − 3', 220, 'ok', 13), R('k2', 'kiri 3 → x + 3', 245, 'neg', 13)],
        },
      ],
    },
    {
      title: 'Rumus umum',
      steps: [
        {
          say: 'Grafik y sama dengan f x yang digeser h satuan mendatar dan k satuan tegak menjadi y sama dengan f dari x dikurangi h, tambah k. Pergeseran ini ditulis translasi h koma k.',
          clear: true,
          add: [T('f', 'y = f(x − h) + k', 200, 60, { size: 32, c: 'pos' }), T('t', 'translasi (h, k)', 200, 105, { size: 18, c: 'mut' })],
        },
        {
          say: 'h positif berarti ke kanan, h negatif ke kiri. k positif berarti ke atas, k negatif ke bawah.',
          add: [T('h', 'h > 0: kanan    h < 0: kiri', 200, 145, { size: 17 }), T('k', 'k > 0: atas    k < 0: bawah', 200, 175, { size: 17 })],
        },
        {
          say: 'Contoh: y sama dengan x kuadrat ditranslasi minus 2 koma 1. h sama dengan minus 2, jadi x dikurangi minus 2, yaitu x tambah 2. Hasilnya y sama dengan x tambah 2 kuadrat, tambah 1.',
          add: [T('e', 'y = x² ditranslasi (−2, 1)', 200, 220, { size: 17 }), T('e2', '→ y = (x + 2)² + 1', 200, 255, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Grafik y sama dengan x kuadrat digeser 1 satuan ke kiri dan 4 satuan ke bawah. Persamaannya apa?',
          clear: true,
          add: [T('q', 'y = x²', 200, 90, { size: 32, c: 'pos' }), T('q2', 'geser 1 ke kiri, 4 ke bawah', 200, 150, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: 'y = (x + 1)² − 4', ok: true, why: 'Translasi (−1, −4): x − (−1) = x + 1, lalu dikurangi 4.' },
              { t: 'y = (x − 1)² − 4', why: 'x − 1 menggeser ke kanan. Ke kiri ditulis x + 1.' },
              { t: 'y = (x + 1)² + 4', why: 'Ke bawah berarti dikurangi 4.' },
              { t: 'y = (x − 4)² + 1', why: 'Angka geser mendatar dan tegak tertukar.' },
            ],
          },
        },
        {
          say: 'Ke kiri 1 ditulis x tambah 1 di dalam kurung. Ke bawah 4 ditulis dikurangi 4. Puncaknya pindah ke minus 1 koma minus 4.',
          clear: true,
          add: [...B.P.els, ghost(sq, -2.2, 2.2), fpath('f', B, sq, -2.9, 2.9, { stroke: 'acc', ...shift(B, -1, -4) }), pt('d1', -1, -4), tag('ge', 'y = (x + 1)² − 4', RX, 60, 'acc', 14), R('p', 'puncak (−1, −4)', 100, 'neg')],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Grafik y = x² digeser 5 satuan ke atas menjadi y = x² + k. Nilai k adalah …',
      ans: ['5'],
      wrong: { '-5': 'Ke atas berarti nilai y bertambah, jadi ditambah 5.' },
      steps: ['Geser ke atas 5 → setiap nilai y + 5.', 'y = x² + 5, jadi k = 5.'],
    },
    {
      q: 'Grafik y = x² digeser 2 satuan ke kanan. Persamaan bayangannya adalah …',
      options: [
        { t: 'y = (x − 2)²', ok: true },
        { t: 'y = (x + 2)²', why: 'x + 2 menggeser ke kiri.' },
        { t: 'y = x² + 2', why: 'Itu geser ke atas.' },
        { t: 'y = x² − 2', why: 'Itu geser ke bawah.' },
      ],
      steps: ['Geser kanan 2 → ganti x dengan x − 2.', 'y = (x − 2)².'],
    },
    {
      type: 'num',
      q: 'Grafik y = (x − 4)² + 1 adalah hasil translasi y = x². Puncaknya di titik (h, 1). Nilai h adalah …',
      ans: ['4'],
      wrong: { '-4': 'x − 4 berarti bergeser ke kanan 4. Puncaknya di x = 4, karena (4 − 4)² = 0.' },
      steps: ['(x − 4)² bernilai 0 saat x = 4.', 'Puncak (4, 1), jadi h = 4.'],
    },
    {
      q: 'Garis f(x) = 2x + 1 ditranslasi (0, 3). Persamaan bayangannya adalah …',
      options: [
        { t: 'y = 2x + 4', ok: true },
        { t: 'y = 2x − 2', why: 'k = 3 positif, jadi geser ke atas: ditambah 3.' },
        { t: 'y = 2(x − 3) + 1', why: 'Itu geser ke kanan 3. Translasi (0, 3) hanya geser ke atas.' },
        { t: 'y = 5x + 1', why: 'Translasi tidak mengubah kemiringan garis.' },
      ],
      steps: ['Translasi (0, 3) → tambah 3 di luar.', 'y = 2x + 1 + 3 = 2x + 4.'],
    },
    {
      type: 'num',
      q: 'Titik (1, 1) pada grafik y = x² ditranslasi (2, −3) menjadi (a, b). Nilai a + b adalah …',
      ans: ['1'],
      wrong: { '7': 'b = 1 + (−3) = −2, bukan 4.', '3': 'a + b = 3 + (−2) = 1.' },
      steps: ['a = 1 + 2 = 3, b = 1 − 3 = −2.', 'a + b = 3 + (−2) = 1.'],
    },
  ],
};

// ---------- 1.2 Refleksi fungsi ----------
const f2 = (x) => (x - 2) ** 2 + 1;

const l2 = {
  id: 'k12b1-2',
  title: 'Refleksi Fungsi',
  hook: 'Mencerminkan grafik terhadap sumbu x mengganti tanda y. Mencerminkan terhadap sumbu y mengganti tanda x.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Grafik ini punya puncak di 2 koma 1. Grafik dicerminkan terhadap sumbu x. Di mana puncak bayangannya?',
          add: [...B.P.els, fpath('f', B, f2, 0, 4), pt('p', 2, 1), R('pl', 'puncak (2, 1)', 60, 'neg', 15), R('q', 'cermin: sumbu x', 100, 'acc', 15)],
          ask: {
            options: [
              { t: '(2, −1)', ok: true, why: 'Sumbu x seperti cermin mendatar: x tetap, y berganti tanda.' },
              { t: '(−2, 1)', why: 'Itu pencerminan terhadap sumbu y.' },
              { t: '(−2, −1)', why: 'Itu rotasi 180° terhadap titik asal.' },
              { t: '(1, 2)', why: 'Itu pencerminan terhadap garis y = x.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Terhadap sumbu x',
      steps: [
        {
          say: 'Persamaan grafik ini y sama dengan x dikurangi 2, kuadrat, tambah 1. Titik merah 3 koma 2 ada di grafik.',
          clear: true,
          add: [...B.P.els, ghost(f2, 0, 4), fpath('f', B, f2, 0, 4), pt('p', 3, 2), tag('fe', 'f(x) = (x − 2)² + 1', RX, 50, 'pos', 13)],
        },
        {
          say: 'Cerminkan terhadap sumbu x. Titik 3 koma 2 pindah ke 3 koma minus 2. x tetap, y berganti tanda.',
          set: { f: { sy: -1, stroke: 'acc' }, p: at(3, -2) },
          add: [R('a1', '(3, 2) → (3, −2)', 95)],
        },
        {
          say: 'Semua nilai y dikali minus 1, jadi y sama dengan minus f x. Hasilnya minus, kurung x dikurangi 2, kuadrat, dikurangi 1.',
          add: [tag('ge', 'y = −f(x)', RX, 140, 'acc', 16), R('g2', '= −(x − 2)² − 1', 180, 'acc', 14)],
        },
      ],
    },
    {
      title: 'Terhadap sumbu y',
      steps: [
        {
          say: 'Kembali ke grafik semula. Sekarang cerminkan terhadap sumbu y.',
          clear: true,
          add: [...B.P.els, ghost(f2, 0, 4), fpath('f', B, f2, 0, 4), pt('p', 3, 2), tag('fe', 'f(x) = (x − 2)² + 1', RX, 50, 'pos', 13)],
        },
        {
          say: 'Titik 3 koma 2 pindah ke minus 3 koma 2. Kali ini y tetap, x yang berganti tanda.',
          set: { f: { sx: -1, stroke: 'acc' }, p: at(-3, 2) },
          add: [R('a1', '(3, 2) → (−3, 2)', 95)],
        },
        {
          say: 'Karena x berganti tanda, setiap x di dalam rumus diganti minus x. y sama dengan f dari minus x.',
          add: [tag('ge', 'y = f(−x)', RX, 140, 'acc', 16), R('g2', '= (−x − 2)² + 1', 180, 'acc', 14)],
        },
        {
          say: 'Minus x dikurangi 2 adalah lawan dari x tambah 2, dan kuadrat dua bilangan yang berlawanan tanda selalu sama. Jadi bentuk sederhananya x tambah 2, kuadrat, tambah 1. Puncaknya di minus 2 koma 1.',
          add: [R('g3', '= (x + 2)² + 1', 215, 'ok', 14)],
        },
      ],
    },
    {
      title: 'Di luar atau di dalam',
      steps: [
        {
          say: 'Cermin sumbu x: tanda minus diletakkan di luar f, mengalikan seluruh nilai y.',
          clear: true,
          add: [T('a', 'sumbu x  →  y = −f(x)', 200, 80, { size: 24, c: 'pos' }), T('a2', 'minus di luar: y berganti tanda', 200, 115, { size: 16, c: 'mut' })],
        },
        {
          say: 'Cermin sumbu y: tanda minus diletakkan di dalam f, menggantikan x.',
          add: [T('b', 'sumbu y  →  y = f(−x)', 200, 180, { size: 24, c: 'acc' }), T('b2', 'minus di dalam: x berganti tanda', 200, 215, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Garis f x sama dengan 2x tambah 3 dicerminkan terhadap sumbu y. Persamaan bayangannya apa?',
          clear: true,
          add: [T('q', 'f(x) = 2x + 3', 200, 90, { size: 32, c: 'pos' }), T('q2', 'dicerminkan terhadap sumbu y', 200, 150, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: 'y = −2x + 3', ok: true, why: 'f(−x) = 2(−x) + 3 = −2x + 3.' },
              { t: 'y = −2x − 3', why: 'Itu −f(x), pencerminan terhadap sumbu x.' },
              { t: 'y = 2x − 3', why: 'Sumbu y mengganti tanda x, bukan konstanta.' },
              { t: 'y = 2x + 3', why: 'Garis ini tidak simetris terhadap sumbu y, jadi bayangannya berbeda.' },
            ],
          },
        },
        {
          say: 'Ganti x dengan minus x. 2 kali minus x sama dengan minus 2x. Jadi y sama dengan minus 2x tambah 3.',
          add: [T('a', 'f(−x) = 2(−x) + 3 = {g:−2x + 3}', 200, 220, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Grafik y = x² + 1 dicerminkan terhadap sumbu x. Persamaan bayangannya adalah …',
      options: [
        { t: 'y = −x² − 1', ok: true },
        { t: 'y = −x² + 1', why: 'Seluruh nilai y dikali −1, termasuk konstanta 1.' },
        { t: 'y = x² − 1', why: 'Bagian x² juga ikut berganti tanda.' },
        { t: 'y = (−x)² + 1', why: 'Itu pencerminan terhadap sumbu y, dan hasilnya sama dengan grafik semula.' },
      ],
      steps: ['Sumbu x → y = −f(x).', 'y = −(x² + 1) = −x² − 1.'],
    },
    {
      type: 'num',
      q: 'f(x) = 3x − 6 dicerminkan terhadap sumbu x menjadi g(x). Nilai g(1) adalah …',
      ans: ['3'],
      wrong: { '-3': 'g(1) = −f(1) = −(3 − 6) = −(−3) = 3.' },
      steps: ['g(x) = −f(x) = −3x + 6.', 'g(1) = −3 + 6 = 3.'],
    },
    {
      type: 'num',
      q: 'Grafik y = (x − 5)² dicerminkan terhadap sumbu y. Puncak bayangannya di (a, 0). Nilai a adalah …',
      ans: ['-5'],
      wrong: { '5': 'Itu puncak semula. Cermin sumbu y mengganti tanda x.' },
      steps: ['Puncak semula (5, 0).', 'Cermin sumbu y → (−5, 0), jadi a = −5.'],
    },
    {
      q: 'Grafik y = 2ˣ dicerminkan terhadap sumbu y. Persamaan bayangannya adalah …',
      options: [
        { t: 'y = 2⁻ˣ', ok: true },
        { t: 'y = −2ˣ', why: 'Itu pencerminan terhadap sumbu x.' },
        { t: 'y = −2⁻ˣ', why: 'Itu rotasi 180°: tanda x dan y sama-sama berganti.' },
        { t: 'y = 2ˣ − 1', why: 'Itu geser ke bawah 1.' },
      ],
      steps: ['Sumbu y → ganti x dengan −x.', 'y = 2⁻ˣ.'],
    },
    {
      type: 'num',
      q: 'Titik (4, −7) ada pada grafik y = f(x). Setelah grafik dicerminkan terhadap sumbu x, titik itu menjadi (4, b). Nilai b adalah …',
      ans: ['7'],
      wrong: { '-7': 'Cermin sumbu x mengganti tanda y: −7 menjadi 7.', '-4': 'x tetap 4. Yang berganti tanda adalah y.' },
      steps: ['Sumbu x → (x, y) menjadi (x, −y).', '(4, −7) → (4, 7), jadi b = 7.'],
    },
  ],
};

// ---------- 1.3 Dilatasi fungsi ----------
const f3 = (x) => x * x - 4;
const VPTS = [[-3, 5], [-2, 0], [0, -4], [2, 0], [3, 5]];
const HPTS = [[-2, 0], [-1, -3], [0, -4], [1, -3], [2, 0]];

const l3 = {
  id: 'k12b1-3',
  title: 'Dilatasi Fungsi',
  hook: 'Dilatasi merenggangkan atau memampatkan grafik. Arah tegak mengalikan y, arah mendatar membagi x.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Grafik y sama dengan f x direnggangkan ke arah tegak, sehingga setiap titik dua kali lebih jauh dari sumbu x. Persamaannya apa?',
          add: [...B.P.els, fpath('f', B, f3, -3, 3), tag('fe', 'f(x) = x² − 4', RX, 60, 'pos', 14), R('q', 'renggang tegak ×2', 100, 'acc', 14)],
          ask: {
            options: [
              { t: 'y = 2·f(x)', ok: true, why: 'Setiap nilai y dikali 2, jadi seluruh f(x) dikali 2.' },
              { t: 'y = f(2x)', why: 'Itu memampatkan ke arah mendatar.' },
              { t: 'y = f(x) + 2', why: 'Itu geser ke atas, jarak ke sumbu x tidak berlipat.' },
              { t: 'y = f(x ÷ 2)', why: 'Itu merenggangkan ke arah mendatar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dilatasi tegak',
      steps: [
        {
          say: 'Kita mampatkan grafik ke arah sumbu x dengan faktor setengah. Lihat lima titik merah.',
          clear: true,
          add: [...B.P.els, ghost(f3, -3, 3), ...VPTS.map(([a, b], i) => pt(`d${i}`, a, b)), tag('fe', 'f(x) = x² − 4', RX, 50, 'pos', 14)],
        },
        {
          say: 'Setiap nilai y dikali setengah. Titik 0 koma minus 4 pindah ke 0 koma minus 2. Titik di sumbu x tidak bergerak, karena 0 kali setengah tetap 0.',
          set: Object.fromEntries(VPTS.map(([a, b], i) => [`d${i}`, at(a, b / 2)])),
          add: [R('a1', '(0, −4) → (0, −2)', 95), R('a2', '(2, 0) tetap', 120, 'mut')],
        },
        {
          say: 'Hubungkan titik-titiknya. Inilah y sama dengan setengah kali f x.',
          add: [fpath('g1', B, (x) => f3(x) / 2, -3, 3, { stroke: 'acc' }), tag('ge', 'y = ½·f(x)', RX, 165, 'acc', 16), R('g2', '= ½(x² − 4)', 205, 'acc')],
        },
      ],
    },
    {
      title: 'Dilatasi mendatar',
      steps: [
        {
          say: 'Kembali ke grafik semula. Sekarang renggangkan ke arah mendatar dengan faktor 2.',
          clear: true,
          add: [...B.P.els, ghost(f3, -3, 3), ...HPTS.map(([a, b], i) => pt(`d${i}`, a, b)), tag('fe', 'f(x) = x² − 4', RX, 50, 'pos', 14)],
        },
        {
          say: 'Setiap nilai x dikali 2. Titik 2 koma 0 pindah ke 4 koma 0. Titik di sumbu y tidak bergerak.',
          set: Object.fromEntries(HPTS.map(([a, b], i) => [`d${i}`, at(a * 2, b)])),
          add: [R('a1', '(2, 0) → (4, 0)', 95), R('a2', '(0, −4) tetap', 120, 'mut')],
        },
        {
          say: 'Titik baru di x sama dengan 4 harus bernilai sama dengan titik lama di x sama dengan 2. Jadi di dalam rumus, x dibagi 2. Kebalikan lagi, seperti pada translasi.',
          add: [fpath('g1', B, (x) => f3(x / 2), -5, 5, { stroke: 'acc' }), tag('ge', 'y = f(x ÷ 2)', RX, 165, 'acc', 16), R('g2', '= (x ÷ 2)² − 4', 205, 'acc')],
        },
      ],
    },
    {
      title: 'Ringkasan',
      steps: [
        {
          say: 'Dilatasi tegak dengan faktor a: y sama dengan a kali f x. Titik di sumbu x tetap.',
          clear: true,
          add: [T('a', 'tegak, faktor a  →  y = a·f(x)', 200, 80, { size: 22, c: 'pos' }), T('a2', 'titik di sumbu x tetap', 200, 112, { size: 15, c: 'mut' })],
        },
        {
          say: 'Dilatasi mendatar dengan faktor k: y sama dengan f dari x dibagi k. Titik di sumbu y tetap.',
          add: [T('b', 'mendatar, faktor k  →  y = f(x ÷ k)', 200, 170, { size: 22, c: 'acc' }), T('b2', 'titik di sumbu y tetap', 200, 202, { size: 15, c: 'mut' })],
        },
        {
          say: 'Faktor lebih dari 1 merenggangkan. Faktor antara 0 dan 1 memampatkan.',
          add: [T('c', 'faktor > 1: renggang    0 < faktor < 1: mampat', 200, 255, { size: 15 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Grafik f x sama dengan x kuadrat dikurangi 4 didilatasi tegak dengan faktor 3. Di mana titik puncak bayangannya?',
          clear: true,
          add: [T('q', 'f(x) = x² − 4,  puncak (0, −4)', 200, 90, { size: 24, c: 'pos' }), T('q2', 'dilatasi tegak, faktor 3', 200, 150, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: '(0, −12)', ok: true, why: 'Nilai y dikali 3: −4 × 3 = −12.' },
              { t: '(0, −4)', why: 'Puncak tidak di sumbu x, jadi ikut berpindah.' },
              { t: '(0, −7)', why: 'Dilatasi mengalikan, bukan mengurangi 3.' },
              { t: '(0, −4/3)', why: 'Faktor 3 merenggangkan, jadi y dikali 3, bukan dibagi.' },
            ],
          },
        },
        {
          say: 'Dilatasi tegak mengalikan y dengan 3. Minus 4 kali 3 sama dengan minus 12.',
          add: [T('a', 'y = 3(x² − 4)  →  puncak {g:(0, −12)}', 200, 220, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'f(x) = x² + 2x dan g(x) = 3·f(x). Nilai g(1) adalah …',
      ans: ['9'],
      wrong: { '3': 'Itu f(1). g(1) = 3 × f(1) = 3 × 3.', '6': 'f(1) = 1 + 2 = 3, lalu dikali 3.' },
      steps: ['f(1) = 1 + 2 = 3.', 'g(1) = 3 × 3 = 9.'],
    },
    {
      q: 'Grafik y = f(x) didilatasi mendatar dengan faktor 2. Persamaan bayangannya adalah …',
      options: [
        { t: 'y = f(x ÷ 2)', ok: true },
        { t: 'y = f(2x)', why: 'f(2x) memampatkan mendatar dengan faktor ½.' },
        { t: 'y = 2·f(x)', why: 'Itu dilatasi tegak.' },
        { t: 'y = f(x) + 2', why: 'Itu geser ke atas.' },
      ],
      steps: ['Mendatar faktor k → y = f(x ÷ k).', 'k = 2 → y = f(x ÷ 2).'],
    },
    {
      type: 'num',
      q: 'Titik (2, 5) ada pada grafik y = f(x). Grafik didilatasi tegak dengan faktor 4, sehingga titik menjadi (2, b). Nilai b adalah …',
      ans: ['20'],
      wrong: { '5': 'Dilatasi tegak mengubah y.', '9': 'Dikali 4, bukan ditambah 4.' },
      steps: ['Tegak → y dikali 4.', 'b = 5 × 4 = 20.'],
    },
    {
      type: 'num',
      q: 'Titik (3, 1) ada pada grafik y = f(x). Grafik didilatasi mendatar dengan faktor 2, sehingga titik menjadi (a, 1). Nilai a adalah …',
      ans: ['6'],
      wrong: { '1.5': 'Faktor 2 merenggangkan: x dikali 2. Pembagian hanya muncul di dalam rumus f(x ÷ 2).', '3': 'Mendatar mengubah x.' },
      steps: ['Mendatar → x dikali 2.', 'a = 3 × 2 = 6.'],
    },
    {
      q: 'Pada dilatasi tegak, titik grafik yang tidak berpindah adalah titik yang …',
      options: [
        { t: 'terletak pada sumbu x', ok: true },
        { t: 'terletak pada sumbu y', why: 'Titik di sumbu y bisa punya y ≠ 0, jadi ikut dikali.' },
        { t: 'merupakan puncak grafik', why: 'Puncak ikut berpindah kalau y-nya bukan 0.' },
        { t: 'semua titik grafik', why: 'Hanya titik dengan y = 0 yang tetap.' },
      ],
      steps: ['Dilatasi tegak mengalikan y.', 'Hanya y = 0 yang tetap, yaitu titik di sumbu x.'],
    },
  ],
};

// ---------- 1.4 Rotasi fungsi ----------
const half = (x) => x / 2 + 2;

const l4 = {
  id: 'k12b1-4',
  title: 'Rotasi Fungsi',
  hook: 'Memutar grafik 180° terhadap titik asal mengganti tanda x dan y sekaligus. Memutar 90° menukar peran x dan y.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Titik 3 koma 1 diputar 180 derajat dengan pusat titik asal O. Di mana bayangannya?',
          add: [...B.P.els, pt('p', 3, 1), R('pl', '(3, 1)', 60, 'neg', 16), R('q', 'putar 180°, pusat O', 100, 'acc', 14)],
          ask: {
            options: [
              { t: '(−3, −1)', ok: true, why: 'Putaran setengah lingkaran membawa titik ke seberang O: x dan y berganti tanda.' },
              { t: '(−1, 3)', why: 'Itu putaran 90° berlawanan arah jarum jam.' },
              { t: '(3, −1)', why: 'Itu pencerminan terhadap sumbu x.' },
              { t: '(1, 3)', why: 'Itu pencerminan terhadap garis y = x.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Putar 180°',
      steps: [
        {
          say: 'Ini lagi grafik f x sama dengan x dikurangi 2, kuadrat, tambah 1. Titik merah 3 koma 2 ada di grafik.',
          clear: true,
          add: [...B.P.els, ghost(f2, 0, 4), fpath('f', B, f2, 0, 4), pt('p', 3, 2), tag('fe', 'f(x) = (x − 2)² + 1', RX, 50, 'pos', 13)],
        },
        {
          say: 'Putar seluruh grafik 180 derajat dengan pusat O. Titik 3 koma 2 pindah ke minus 3 koma minus 2.',
          set: { f: { rot: -180, stroke: 'acc' }, p: at(-3, -2) },
          add: [R('a1', '(x, y) → (−x, −y)', 95), R('a2', '(3, 2) → (−3, −2)', 120)],
        },
        {
          say: 'x dan y sama-sama berganti tanda, jadi persamaannya y sama dengan minus f dari minus x. Hasilnya minus, kurung x tambah 2, kuadrat, dikurangi 1.',
          add: [tag('ge', 'y = −f(−x)', RX, 165, 'acc', 16), R('g2', '= −(x + 2)² − 1', 205, 'acc')],
        },
        {
          say: 'Putar 180 derajat sama dengan dicerminkan terhadap sumbu x, lalu dicerminkan lagi terhadap sumbu y.',
          add: [R('k', 'cermin x + cermin y', 245, 'mut', 13)],
        },
      ],
    },
    {
      title: 'Putar 90°',
      steps: [
        {
          say: 'Sekarang garis y sama dengan setengah x tambah 2. Garis ini melewati 0 koma 2 dan minus 4 koma 0.',
          clear: true,
          add: [...B.P.els, ghost(half, -5, 2), fpath('f', B, half, -5, 2), pt('pa', 0, 2), pt('pb', -4, 0), tag('fe', 'y = ½x + 2', RX, 50, 'pos', 15)],
        },
        {
          say: 'Putar garis 90 derajat berlawanan arah jarum jam dengan pusat O. Titik x koma y pindah ke minus y koma x. Titik 0 koma 2 pindah ke minus 2 koma 0, dan minus 4 koma 0 pindah ke 0 koma minus 4.',
          set: { f: { rot: -90, stroke: 'acc' }, pa: at(-2, 0), pb: at(0, -4) },
          add: [R('a1', '(x, y) → (−y, x)', 85), R('a2', '(0, 2) → (−2, 0)', 108), R('a3', '(−4, 0) → (0, −4)', 131)],
        },
        {
          say: 'Garis baru melewati minus 2 koma 0 dan 0 koma minus 4. Gradiennya minus 4 dibagi 2, yaitu minus 2. Persamaannya y sama dengan minus 2x dikurangi 4.',
          add: [tag('ge', 'y = −2x − 4', RX, 190, 'acc', 16)],
        },
        {
          say: 'Gradien lama setengah, gradien baru minus 2. Hasil kalinya minus 1, artinya kedua garis saling tegak lurus. Tentu saja, karena diputar 90 derajat.',
          add: [R('k', '½ × (−2) = −1', 230, 'ok', 14), R('k2', 'tegak lurus', 252, 'mut', 13)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Garis y sama dengan x tambah 1 diputar 180 derajat dengan pusat O. Persamaan bayangannya apa?',
          clear: true,
          add: [T('q', 'y = x + 1', 200, 90, { size: 32, c: 'pos' }), T('q2', 'diputar 180°, pusat O', 200, 150, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: 'y = x − 1', ok: true, why: '−f(−x) = −(−x + 1) = x − 1.' },
              { t: 'y = −x − 1', why: 'Itu −f(x), pencerminan terhadap sumbu x saja.' },
              { t: 'y = −x + 1', why: 'Itu f(−x), pencerminan terhadap sumbu y saja.' },
              { t: 'y = x + 1', why: 'Garis ini tidak melewati O, jadi bayangannya berpindah.' },
            ],
          },
        },
        {
          say: 'Ganti x dengan minus x, lalu kalikan seluruhnya dengan minus 1. Minus kurung minus x tambah 1 sama dengan x dikurangi 1.',
          add: [T('a', '−f(−x) = −(−x + 1) = {g:x − 1}', 200, 220, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Titik (5, −2) diputar 180° dengan pusat O menjadi (a, b). Nilai a + b adalah …',
      ans: ['-3'],
      wrong: { '3': 'Bayangannya (−5, 2): a + b = −5 + 2 = −3.', '7': 'Kedua koordinat berganti tanda: (−5, 2).' },
      steps: ['(x, y) → (−x, −y): (5, −2) → (−5, 2).', 'a + b = −5 + 2 = −3.'],
    },
    {
      q: 'Rotasi 180° dengan pusat O pada grafik y = f(x) menghasilkan …',
      options: [
        { t: 'y = −f(−x)', ok: true },
        { t: 'y = −f(x)', why: 'Itu pencerminan terhadap sumbu x.' },
        { t: 'y = f(−x)', why: 'Itu pencerminan terhadap sumbu y.' },
        { t: 'y = f(x) − 180', why: 'Rotasi tidak menggeser grafik ke bawah.' },
      ],
      steps: ['x dan y berganti tanda.', 'y = −f(−x).'],
    },
    {
      type: 'num',
      q: 'Titik (2, 3) diputar 90° berlawanan arah jarum jam dengan pusat O menjadi (a, b). Nilai b adalah …',
      ans: ['2'],
      wrong: { '3': '(x, y) → (−y, x), jadi b = x = 2.', '-3': 'Itu nilai a.' },
      steps: ['(x, y) → (−y, x).', '(2, 3) → (−3, 2), jadi b = 2.'],
    },
    {
      type: 'num',
      q: 'Garis y = 3x diputar 90° dengan pusat O. Gradien garis bayangannya adalah …',
      ans: ['-1/3'],
      wrong: { '-3': 'Garis bayangan tegak lurus: 3 × m = −1, jadi m = −1/3.', '3': 'Diputar 90° berarti tegak lurus, gradiennya berubah.', '1/3': 'Tandanya negatif: 3 × m = −1.' },
      steps: ['Diputar 90° → tegak lurus garis semula.', '3 × m = −1 → m = −1/3.'],
    },
    {
      type: 'num',
      q: 'Grafik y = (x − 3)² + 2 diputar 180° dengan pusat O. Puncak bayangannya (a, b). Nilai a + b adalah …',
      ans: ['-5'],
      wrong: { '5': 'Puncak (3, 2) berpindah ke (−3, −2).', '-1': 'Kedua koordinat berganti tanda: (−3, −2).' },
      steps: ['Puncak semula (3, 2).', 'Putar 180° → (−3, −2), a + b = −5.'],
    },
  ],
};

// ---------- 1.5 Komposisi transformasi ----------
const l5 = {
  id: 'k12b1-5',
  title: 'Komposisi Transformasi',
  hook: 'Beberapa transformasi bisa dilakukan berurutan. Urutannya berpengaruh pada hasil akhir.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Grafik y sama dengan x kuadrat dicerminkan terhadap sumbu x, lalu digeser 3 satuan ke atas. Persamaan akhirnya apa?',
          add: [T('q', 'y = x²', 200, 80, { size: 32, c: 'pos' }), T('q2', '1) cermin sumbu x', 200, 135, { size: 20 }), T('q3', '2) geser 3 ke atas', 200, 170, { size: 20 })],
          ask: {
            options: [
              { t: 'y = −x² + 3', ok: true, why: 'Cermin: y = −x². Geser atas 3: tambah 3.' },
              { t: 'y = −(x² + 3)', why: 'Itu urutan terbalik: geser dulu, baru dicerminkan.' },
              { t: 'y = −x² − 3', why: 'Ke atas berarti ditambah 3.' },
              { t: 'y = (x − 3)²', why: 'Itu geser ke kanan, tanpa pencerminan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Satu per satu',
      steps: [
        {
          say: 'Mulai dari y sama dengan x kuadrat. Kita lakukan dua transformasi berurutan.',
          clear: true,
          add: [...B.P.els, ghost(sq, -2.2, 2.2), fpath('f', B, sq, -2.2, 2.2), tag('fe', 'y = x²', RX, 50, 'pos', 16)],
        },
        {
          say: 'Langkah 1: dilatasi tegak dengan faktor 2. Setiap nilai y dikali 2, jadi y sama dengan 2x kuadrat. Grafiknya lebih ramping.',
          set: { f: fpath('f', B, (x) => 2 * x * x, -1.5, 1.5, { stroke: 'acc' }) },
          add: [R('s1', '1) tegak ×2', 85, 'mut'), tag('e1', 'y = 2x²', RX, 110, 'acc', 15)],
        },
        {
          say: 'Langkah 2: translasi 1 koma minus 3, yaitu geser 1 ke kanan dan 3 ke bawah. x diganti x dikurangi 1, lalu dikurangi 3.',
          set: { f: shift(B, 1, -3) },
          add: [R('s2', '2) translasi (1, −3)', 135, 'mut', 13), tag('e2', 'y = 2(x − 1)² − 3', RX, 198, 'ok', 13)],
        },
        {
          say: 'Puncaknya sekarang di 1 koma minus 3.',
          add: [pt('p', 1, -3), R('pk', 'puncak (1, −3)', 235, 'neg')],
        },
      ],
    },
    {
      title: 'Urutan berpengaruh',
      steps: [
        {
          say: 'Urutan A: dilatasi tegak faktor 2, lalu geser 1 ke atas. 2x kuadrat ditambah 1.',
          clear: true,
          add: [T('a', 'A: tegak ×2, lalu naik 1', 200, 60, { size: 20, c: 'pos' }), T('a2', 'x² → 2x² → 2x² + 1', 200, 95, { size: 22 })],
        },
        {
          say: 'Urutan B: geser 1 ke atas dulu, lalu dilatasi tegak faktor 2. Seluruh x kuadrat tambah 1 ikut dikali 2, sehingga hasilnya 2x kuadrat tambah 2.',
          add: [T('b', 'B: naik 1, lalu tegak ×2', 200, 155, { size: 20, c: 'acc' }), T('b2', 'x² → x² + 1 → 2(x² + 1) = 2x² + 2', 200, 190, { size: 20 })],
        },
        {
          say: 'Hasilnya berbeda. Pada urutan B, pergeseran ikut terkena dilatasi. Jadi selalu kerjakan sesuai urutan yang diminta.',
          add: [T('k', '2x² + 1  ≠  2x² + 2', 200, 250, { size: 24, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Membaca persamaan',
      steps: [
        {
          say: 'Persamaan y sama dengan minus 2, kurung x tambah 1, kuadrat, tambah 3 bisa dibaca sebagai rangkaian transformasi dari y sama dengan x kuadrat.',
          clear: true,
          add: [T('f', 'y = −2(x + 1)² + 3', 200, 55, { size: 30, c: 'pos' })],
        },
        {
          say: 'Angka 2 berarti dilatasi tegak faktor 2. Tanda minus berarti dicerminkan terhadap sumbu x. x tambah 1 berarti geser 1 ke kiri. Tambah 3 berarti geser 3 ke atas.',
          add: [T('a', '2 → dilatasi tegak ×2', 200, 110, { size: 18 }), T('b', '− → cermin sumbu x', 200, 140, { size: 18 }), T('c', 'x + 1 → geser 1 ke kiri', 200, 170, { size: 18 }), T('d', '+ 3 → geser 3 ke atas', 200, 200, { size: 18 })],
        },
        {
          say: 'Jadi puncaknya di minus 1 koma 3, dan grafiknya terbuka ke bawah.',
          add: [T('e', 'puncak (−1, 3), terbuka ke bawah', 200, 250, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Grafik y sama dengan x kuadrat didilatasi tegak dengan faktor 3, lalu ditranslasi 2 koma minus 1. Persamaan akhirnya apa?',
          clear: true,
          add: [T('q', 'y = x²', 200, 70, { size: 32, c: 'pos' }), T('q2', '1) dilatasi tegak ×3', 200, 125, { size: 20 }), T('q3', '2) translasi (2, −1)', 200, 160, { size: 20 })],
          ask: {
            options: [
              { t: 'y = 3(x − 2)² − 1', ok: true, why: 'Dilatasi: 3x². Translasi (2, −1): x diganti x − 2, lalu dikurangi 1.' },
              { t: 'y = 3(x + 2)² − 1', why: 'h = 2 berarti ke kanan: x − 2.' },
              { t: 'y = 3((x − 2)² − 1)', why: 'Itu urutan terbalik: translasi dulu, baru dilatasi.' },
              { t: 'y = (3x − 2)² − 1', why: 'Dilatasi tegak mengalikan seluruh x², bukan x saja.' },
            ],
          },
        },
        {
          say: 'Langkah 1 memberi 3x kuadrat. Langkah 2 mengganti x dengan x dikurangi 2, lalu dikurangi 1.',
          add: [T('a', 'x² → 3x² → {g:3(x − 2)² − 1}', 200, 230, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Grafik y = x² digeser 2 satuan ke kanan, lalu dicerminkan terhadap sumbu x. Persamaan akhirnya adalah …',
      options: [
        { t: 'y = −(x − 2)²', ok: true },
        { t: 'y = −(x + 2)²', why: 'Geser ke kanan ditulis x − 2.' },
        { t: 'y = (−x − 2)²', why: 'Itu pencerminan terhadap sumbu y.' },
        { t: 'y = −x² + 2', why: 'Geser ke kanan mengubah x di dalam kuadrat, bukan menambah 2 di luar.' },
      ],
      steps: ['Geser kanan 2: y = (x − 2)².', 'Cermin sumbu x: y = −(x − 2)².'],
    },
    {
      type: 'num',
      q: 'Puncak grafik y = 3(x − 4)² + 5 adalah (a, b). Nilai a + b adalah …',
      ans: ['9'],
      wrong: { '1': 'x − 4 berarti puncak di x = 4, bukan −4.', '12': 'Faktor 3 tidak mengubah letak puncak ini: puncak (4, 5).' },
      steps: ['(x − 4)² = 0 saat x = 4, lalu y = 5.', 'a + b = 4 + 5 = 9.'],
    },
    {
      type: 'num',
      q: 'f(x) = x² didilatasi tegak dengan faktor 2, lalu digeser 1 satuan ke atas, menjadi g(x). Nilai g(2) adalah …',
      ans: ['9'],
      wrong: { '10': 'Itu urutan terbalik. Di sini dilatasi dulu: g(x) = 2x² + 1.', '5': 'Jangan lupa dikali 2: 2 × 4 + 1.' },
      steps: ['g(x) = 2x² + 1.', 'g(2) = 2 × 4 + 1 = 9.'],
    },
    {
      type: 'num',
      q: 'f(x) = x² digeser 1 satuan ke atas, lalu didilatasi tegak dengan faktor 2, menjadi g(x). Nilai g(0) adalah …',
      ans: ['2'],
      wrong: { '1': 'Pergeseran ikut dikali 2: g(x) = 2(x² + 1).', '0': 'g(0) = 2(0 + 1) = 2.' },
      steps: ['g(x) = 2(x² + 1) = 2x² + 2.', 'g(0) = 2.'],
    },
    {
      q: 'Grafik y = −(x + 3)² dapat diperoleh dari y = x² dengan cara …',
      options: [
        { t: 'geser 3 ke kiri, lalu cermin terhadap sumbu x', ok: true },
        { t: 'geser 3 ke kanan, lalu cermin terhadap sumbu x', why: 'x + 3 berarti geser ke kiri.' },
        { t: 'geser 3 ke kiri, lalu cermin terhadap sumbu y', why: 'Tanda minus di luar berarti cermin sumbu x.' },
        { t: 'geser 3 ke bawah, lalu cermin terhadap sumbu x', why: 'Angka 3 ada di dalam kurung bersama x, jadi geser mendatar.' },
      ],
      steps: ['x + 3 → geser 3 ke kiri.', 'Minus di luar → cermin sumbu x.'],
    },
  ],
};

export default {
  id: 'k12b1',
  no: 1,
  title: 'Transformasi Fungsi',
  desc: 'Menggeser, mencerminkan, merenggangkan, dan memutar grafik fungsi, lalu menggabungkan beberapa transformasi berurutan.',
  lessons: [l1, l2, l3, l4, l5],
  extra: [
    {
      type: 'num',
      q: 'Grafik y = x² ditranslasi (3, 2). Nilai y bayangan saat x = 5 adalah …',
      ans: ['6'],
      wrong: { '27': 'Translasi (3, 2): y = (x − 3)² + 2, bukan (x + 3)² + 2.', '4': 'Jangan lupa tambah 2: (5 − 3)² + 2.' },
      steps: ['y = (x − 3)² + 2.', 'x = 5 → (2)² + 2 = 6.'],
    },
    {
      q: 'Grafik dicerminkan terhadap sumbu y, lalu dicerminkan terhadap sumbu x. Hasilnya sama dengan rotasi dengan pusat O sebesar …',
      options: [
        { t: '180°', ok: true },
        { t: '90°', why: 'Rotasi 90° menukar x dan y, bukan hanya mengganti tanda.' },
        { t: '270°', why: '270° juga menukar x dan y.' },
        { t: '360°', why: 'Rotasi 360° kembali ke grafik semula.' },
      ],
      steps: ['Cermin y: (x, y) → (−x, y). Cermin x: → (−x, −y).', '(x, y) → (−x, −y) adalah rotasi 180°.'],
    },
    {
      type: 'num',
      q: 'f(x) = 2x + 1 didilatasi mendatar dengan faktor 3 menjadi g(x) = f(x ÷ 3). Nilai g(6) adalah …',
      ans: ['5'],
      wrong: { '13': 'Itu f(6). g(6) = f(6 ÷ 3) = f(2).', '39': 'Mendatar membagi x, bukan mengalikan hasilnya.' },
      steps: ['g(6) = f(6 ÷ 3) = f(2).', 'f(2) = 2 × 2 + 1 = 5.'],
    },
  ],
};
