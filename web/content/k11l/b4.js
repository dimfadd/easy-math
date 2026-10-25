// Kelas 11 Tingkat Lanjut · Bab 4: Transformasi Geometri dengan Matriks
import { T, ln, dot } from '../helpers.js';
import { plane, lineOn } from '../k8/plot.js';
import { tag } from '../k10/kit.js';
import { mat } from './kit.js';

// Bidang dengan satuan sama di x dan y
const mk = (lim) => {
  const C = { x: 30, y: 30, w: 240, h: 240, xmin: -lim, xmax: lim, ymin: -lim, ymax: lim };
  const P = plane('pl', { ...C, every: lim > 5 ? 2 : 1 });
  return { C, P, U: P.X(1) - P.X(0), O: P.at(0, 0) };
};
const B5 = mk(5);
const B6 = mk(6);
const TRI = [[1, 1], [3, 1], [1, 2]];
// Segitiga berpusat di titik asal bidang, supaya rot/sx/sy/s memutar dan mencerminkan terhadap O
const tri = (id, B, o = {}) => ({ id, t: 'poly', x: B.O[0], y: B.O[1], pts: TRI.map(([a, b]) => [a * B.U, -b * B.U]), fill: 'pos-soft', stroke: 'pos', sw: 2.5, ...o });
const ghost = (B, id = 'g0') => tri(id, B, { fill: 'none', stroke: 'mut', sw: 1.5, dash: '4 4', z: -1 });
const abs = (id, B, pts, o = {}) => ({ id, t: 'poly', x: 0, y: 0, pts: pts.map(([a, b]) => B.P.at(a, b)), fill: 'acc-soft', stroke: 'acc', sw: 2.5, ...o });
const RX = 335; // kolom kanan untuk matriks dan keterangan
const neg = (v) => (v < 0 ? `−${-v}` : String(v));
const M = (id, rows, y, o = {}) => mat(id, rows.map((r) => r.map(neg)), RX, y, { size: 20, ...o }).els;

// ---------- 4.1 Translasi dan refleksi ----------
const l1 = {
  id: 'k11lb4-1',
  title: 'Translasi dan Refleksi dengan Matriks',
  hook: 'Setiap refleksi bisa ditulis sebagai matriks 2 × 2. Bayangan titik didapat dengan mengalikan matriks itu dengan koordinat titik.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Titik 2 koma 3 dicerminkan terhadap sumbu x. Di mana bayangannya?',
          add: [...B5.P.els, dot('p', ...B5.P.at(2, 3), 'pos'), tag('pt', '(2, 3)', ...B5.P.at(3.2, 3.6), 'pos', 13)],
          ask: {
            options: [
              { t: '(2, −3)', ok: true, why: 'Sumbu x seperti cermin mendatar: x tetap, y berganti tanda.' },
              { t: '(−2, 3)', why: 'Itu pencerminan terhadap sumbu y.' },
              { t: '(3, 2)', why: 'Itu pencerminan terhadap garis y = x.' },
              { t: '(−2, −3)', why: 'Itu rotasi 180°.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Translasi: menjumlah',
      steps: [
        {
          say: 'Translasi atau pergeseran ditulis dengan matriks kolom. Geser segitiga 4 ke kiri dan 1 ke atas: tambahkan minus 4 koma 1 pada setiap titik.',
          clear: true,
          add: [...B5.P.els, ghost(B5), tri('t', B5), ...M('v', [[-4], [1]], 70, { c: 'acc' }), T('vl', 'geser', RX, 30, { size: 14, c: 'mut' })],
        },
        {
          say: 'Titik 1 koma 1 pindah ke minus 3 koma 2. Semua titik bergeser sama.',
          set: { t: { x: B5.O[0] - 4 * B5.U, y: B5.O[1] - B5.U, fill: 'acc-soft', stroke: 'acc' } },
          add: [T('f', '(x, y) → (x − 4, y + 1)', RX, 195, { size: 13 }), T('f2', '(1, 1) → (−3, 2)', RX, 220, { size: 14, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Refleksi: mengalikan',
      steps: [
        {
          say: 'Refleksi terhadap sumbu x: x tetap, y berganti tanda. Dalam matriks: 1, 0, 0, minus 1.',
          clear: true,
          add: [...B5.P.els, ghost(B5), tri('t', B5), T('ml', 'cermin sumbu x', RX, 30, { size: 14, c: 'mut' }), ...M('m', [[1, 0], [0, -1]], 75, { c: 'acc' })],
        },
        {
          say: 'Kalikan matriks itu dengan koordinat titik 3 koma 1: 1 kali 3 tambah 0 kali 1 sama dengan 3. 0 kali 3 tambah minus 1 kali 1 sama dengan minus 1. Bayangannya 3 koma minus 1.',
          set: { t: { sy: -1, fill: 'acc-soft', stroke: 'acc' } },
          add: [T('c', '(3, 1) → (3, −1)', RX, 195, { size: 15, c: 'acc' }), lineOn('ax', B5.P, 0, 0, B5.C, { c: 'neg', sw: 3, z: -1 })],
        },
        {
          say: 'Refleksi terhadap sumbu y: matriks minus 1, 0, 0, 1. x berganti tanda, y tetap.',
          clear: true,
          add: [...B5.P.els, ghost(B5), tri('t', B5), T('ml', 'cermin sumbu y', RX, 30, { size: 14, c: 'mut' }), ...M('m', [[-1, 0], [0, 1]], 75, { c: 'acc' })],
        },
        {
          say: 'Titik 3 koma 1 menjadi minus 3 koma 1.',
          set: { t: { sx: -1, fill: 'acc-soft', stroke: 'acc' } },
          add: [T('c', '(3, 1) → (−3, 1)', RX, 195, { size: 15, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Cermin garis y = x',
      steps: [
        {
          say: 'Refleksi terhadap garis y sama dengan x menukar koordinat: x koma y menjadi y koma x. Matriksnya 0, 1, 1, 0.',
          clear: true,
          add: [...B5.P.els, ghost(B5), tri('t', B5), lineOn('yx', B5.P, 1, 0, B5.C, { c: 'neg', sw: 2, dash: '6 5', z: -1 }), T('ml', 'cermin y = x', RX, 30, { size: 14, c: 'mut' }), ...M('m', [[0, 1], [1, 0]], 75, { c: 'acc' })],
        },
        {
          say: 'Titik 3 koma 1 menjadi 1 koma 3.',
          set: { t: { sy: -1, rot: -90, fill: 'acc-soft', stroke: 'acc' } },
          add: [T('c', '(3, 1) → (1, 3)', RX, 195, { size: 15, c: 'acc' })],
        },
        {
          say: 'Cara mengingat matriks transformasi: kolom pertama adalah bayangan titik 1 koma 0, kolom kedua adalah bayangan titik 0 koma 1. Untuk cermin y sama dengan x, 1 koma 0 menjadi 0 koma 1, dan 0 koma 1 menjadi 1 koma 0.',
          add: [T('k1', 'kolom 1 =\nbayangan (1, 0)', RX, 237, { size: 13 }), T('k2', 'kolom 2 =\nbayangan (0, 1)', RX, 276, { size: 13 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik 5 koma minus 2 dicerminkan terhadap garis y sama dengan x. Bayangannya …',
          clear: true,
          add: [T('q', '(5, −2), cermin y = x', 200, 100, { size: 28 }), T('q2', 'bayangan = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '(−2, 5)', ok: true, why: 'Cermin y = x menukar koordinat: (x, y) → (y, x).' },
              { t: '(5, 2)', why: 'Itu cermin sumbu x.' },
              { t: '(−5, −2)', why: 'Itu cermin sumbu y.' },
              { t: '(2, −5)', why: 'Itu cermin terhadap garis y = −x.' },
            ],
          },
        },
        {
          say: 'Kalikan matriks 0, 1, 1, 0 dengan kolom 5, minus 2. Baris pertama memberi minus 2, baris kedua memberi 5. Bayangannya minus 2 koma 5.',
          add: [T('a', '[[0, 1], [1, 0]] × (5, −2) = {g:(−2, 5)}', 200, 220, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bayangan titik (4, −1) oleh translasi (−2, 5) adalah …',
      options: [
        { t: '(2, 4)', ok: true },
        { t: '(6, −6)', why: 'Translasi ditambahkan: 4 + (−2), −1 + 5.' },
        { t: '(−8, −5)', why: 'Translasi dijumlah, bukan dikali.' },
        { t: '(2, −6)', why: '−1 + 5 = 4.' },
      ],
      steps: ['(4 + (−2), −1 + 5).', '= (2, 4).'],
    },
    {
      q: 'Matriks refleksi terhadap sumbu y adalah …',
      options: [
        { t: '[[−1, 0], [0, 1]]', ok: true },
        { t: '[[1, 0], [0, −1]]', why: 'Itu refleksi terhadap sumbu x.' },
        { t: '[[0, 1], [1, 0]]', why: 'Itu refleksi terhadap y = x.' },
        { t: '[[−1, 0], [0, −1]]', why: 'Itu rotasi 180°.' },
      ],
      steps: ['(1, 0) → (−1, 0), (0, 1) → (0, 1).', 'Kolom: (−1, 0) dan (0, 1).'],
    },
    {
      q: 'Bayangan titik (−3, 4) oleh refleksi terhadap sumbu x adalah …',
      options: [
        { t: '(−3, −4)', ok: true },
        { t: '(3, 4)', why: 'Itu refleksi sumbu y.' },
        { t: '(4, −3)', why: 'Refleksi sumbu x tidak menukar koordinat.' },
        { t: '(3, −4)', why: 'x tetap −3.' },
      ],
      steps: ['Sumbu x: (x, y) → (x, −y).', '(−3, −4).'],
    },
    {
      q: 'Matriks [[0, −1], [−1, 0]] menyatakan refleksi terhadap …',
      options: [
        { t: 'garis y = −x', ok: true },
        { t: 'garis y = x', why: 'Matriks y = x adalah [[0, 1], [1, 0]].' },
        { t: 'sumbu x', why: 'Matriks sumbu x adalah [[1, 0], [0, −1]].' },
        { t: 'titik asal', why: 'Pencerminan titik asal adalah [[−1, 0], [0, −1]].' },
      ],
      steps: ['(x, y) → (−y, −x).', 'Contoh (1, 0) → (0, −1): cermin y = −x.'],
    },
    {
      type: 'num',
      q: 'Titik (a, 2) dicerminkan terhadap garis y = x menjadi (2, 7). Nilai a adalah …',
      ans: ['7'],
      wrong: { '2': 'Cermin y = x menukar koordinat: (a, 2) → (2, a).' },
      steps: ['(a, 2) → (2, a) = (2, 7).', 'a = 7.'],
    },
  ],
};

// ---------- 4.2 Rotasi dan dilatasi ----------
const l2 = {
  id: 'k11lb4-2',
  title: 'Rotasi dan Dilatasi dengan Matriks',
  hook: 'Rotasi dan dilatasi terhadap titik asal juga punya matriks. Matriksnya bisa ditemukan dari bayangan titik (1, 0) dan (0, 1).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Titik 1 koma 0 diputar 90 derajat berlawanan arah jarum jam dengan pusat titik asal. Ke mana perginya?',
          add: [...B5.P.els, dot('p', ...B5.P.at(1, 0), 'pos'), tag('pt', '(1, 0)', ...B5.P.at(1.6, -0.7), 'pos', 13)],
          ask: {
            options: [
              { t: '(0, 1)', ok: true, why: 'Seperempat putaran ke kiri membawa titik di sumbu x positif ke sumbu y positif.' },
              { t: '(0, −1)', why: 'Itu diputar searah jarum jam.' },
              { t: '(−1, 0)', why: 'Itu setengah putaran (180°).' },
              { t: '(1, 1)', why: 'Jaraknya ke pusat harus tetap 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Rotasi 90°',
      steps: [
        {
          say: 'Bayangan 1 koma 0 adalah 0 koma 1. Bayangan 0 koma 1 adalah minus 1 koma 0. Jadikan kolom: matriks rotasi 90 derajat adalah 0, minus 1, 1, 0.',
          clear: true,
          add: [...B5.P.els, ghost(B5), tri('t', B5), T('ml', 'rotasi 90°', RX, 30, { size: 14, c: 'mut' }), ...M('m', [[0, -1], [1, 0]], 75, { c: 'acc' })],
        },
        {
          say: 'Terapkan pada segitiga. Titik 3 koma 1 menjadi minus 1 koma 3.',
          set: { t: { rot: -90, fill: 'acc-soft', stroke: 'acc' } },
          add: [T('c', '(3, 1) → (−1, 3)', RX, 195, { size: 15, c: 'acc' }), T('f', '(x, y) → (−y, x)', RX, 220, { size: 13 })],
        },
        {
          say: 'Putar lagi 90 derajat, menjadi 180 derajat. Matriksnya minus 1, 0, 0, minus 1: kedua koordinat berganti tanda.',
          set: { t: { rot: -180 } },
          del: ['m*'],
          add: [...M('n', [[-1, 0], [0, -1]], 75, { c: 'neg' })],
        },
      ],
    },
    {
      title: 'Rumus umum rotasi',
      steps: [
        {
          say: 'Untuk rotasi sebesar theta, bayangan 1 koma 0 adalah cos theta koma sin theta. Bayangan 0 koma 1 adalah minus sin theta koma cos theta.',
          clear: true,
          add: [T('a', 'R(θ) =', 110, 90, { size: 24 }), ...mat('r', [['cos θ', '−sin θ'], ['sin θ', 'cos θ']], 230, 90, { size: 20 }).els],
        },
        {
          say: 'Cek untuk 90 derajat: cos 90 sama dengan 0, sin 90 sama dengan 1. Hasilnya 0, minus 1, 1, 0. Sama seperti tadi.',
          add: [T('b', 'θ = 90°:  cos = 0, sin = 1  →  [[0, −1], [1, 0]] ✓', 200, 170, { size: 16 })],
        },
        {
          say: 'Arah berlawanan jarum jam dihitung positif. Rotasi searah jarum jam memakai sudut negatif.',
          add: [T('c', 'berlawanan jarum jam: +   ·   searah jarum jam: −', 200, 220, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Dilatasi',
      steps: [
        {
          say: 'Dilatasi dengan faktor k terhadap titik asal mengalikan setiap koordinat dengan k. Matriksnya k, 0, 0, k. Untuk k sama dengan 2: 2, 0, 0, 2.',
          clear: true,
          add: [...B6.P.els, ghost(B6), tri('t', B6), T('ml', 'dilatasi k = 2', RX, 30, { size: 14, c: 'mut' }), ...M('m', [[2, 0], [0, 2]], 75, { c: 'acc' })],
        },
        {
          say: 'Segitiga membesar dua kali dari titik asal. Titik 3 koma 1 menjadi 6 koma 2. Luasnya menjadi 4 kali, sesuai determinan matriksnya, 4.',
          set: { t: { s: 2, fill: 'acc-soft', stroke: 'acc' } },
          add: [T('c', '(3, 1) → (6, 2)', RX, 195, { size: 15, c: 'acc' }), T('d', 'luas × det = × 4', RX, 220, { size: 13 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik 2 koma 3 diputar 90 derajat berlawanan arah jarum jam dengan pusat titik asal. Bayangannya …',
          clear: true,
          add: [T('q', '(2, 3), rotasi 90°', 200, 100, { size: 28 }), T('q2', 'bayangan = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '(−3, 2)', ok: true, why: 'Rotasi 90°: (x, y) → (−y, x).' },
              { t: '(3, −2)', why: 'Itu rotasi −90° (searah jarum jam).' },
              { t: '(−2, −3)', why: 'Itu rotasi 180°.' },
              { t: '(3, 2)', why: 'Itu cermin terhadap y = x.' },
            ],
          },
        },
        {
          say: 'Matriks 0, minus 1, 1, 0 dikali kolom 2, 3. Baris pertama: minus 3. Baris kedua: 2. Bayangannya minus 3 koma 2.',
          add: [T('a', '[[0, −1], [1, 0]] × (2, 3) = {g:(−3, 2)}', 200, 220, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Matriks rotasi 180° dengan pusat O adalah …',
      options: [
        { t: '[[−1, 0], [0, −1]]', ok: true },
        { t: '[[0, −1], [1, 0]]', why: 'Itu rotasi 90°.' },
        { t: '[[1, 0], [0, −1]]', why: 'Itu refleksi sumbu x.' },
        { t: '[[0, 1], [−1, 0]]', why: 'Itu rotasi −90°.' },
      ],
      steps: ['cos 180° = −1, sin 180° = 0.', '[[−1, 0], [0, −1]].'],
    },
    {
      q: 'Bayangan titik (4, 1) oleh rotasi −90° (searah jarum jam) dengan pusat O adalah …',
      options: [
        { t: '(1, −4)', ok: true },
        { t: '(−1, 4)', why: 'Itu rotasi +90°.' },
        { t: '(−4, −1)', why: 'Itu rotasi 180°.' },
        { t: '(1, 4)', why: 'Itu cermin y = x.' },
      ],
      steps: ['Rotasi −90°: (x, y) → (y, −x).', '(4, 1) → (1, −4).'],
    },
    {
      q: 'Bayangan titik (−2, 5) oleh dilatasi faktor 3 dengan pusat O adalah …',
      options: [
        { t: '(−6, 15)', ok: true },
        { t: '(1, 8)', why: 'Dilatasi mengalikan, bukan menambah 3.' },
        { t: '(6, −15)', why: 'Faktor positif tidak membalik tanda.' },
        { t: '(−6, 5)', why: 'Kedua koordinat dikali 3.' },
      ],
      steps: ['(3 × (−2), 3 × 5).', '= (−6, 15).'],
    },
    {
      type: 'num',
      q: 'Segitiga dengan luas 5 satuan didilatasi dengan faktor 3. Luas bayangannya adalah … satuan',
      ans: ['45'],
      wrong: { '15': 'Panjang dikali 3, luas dikali 3² = 9.', '25': 'Luas dikali k² = 9.' },
      steps: ['Luas dikali k² (det matriks = 9).', '5 × 9 = 45.'],
    },
    {
      q: 'Matriks [[0, −1], [1, 0]] menyatakan …',
      options: [
        { t: 'rotasi 90° berlawanan jarum jam', ok: true },
        { t: 'rotasi 90° searah jarum jam', why: 'Searah jarum jam: [[0, 1], [−1, 0]].' },
        { t: 'refleksi y = x', why: 'Refleksi y = x: [[0, 1], [1, 0]].' },
        { t: 'dilatasi', why: 'Dilatasi berbentuk [[k, 0], [0, k]].' },
      ],
      steps: ['(1, 0) → (0, 1) dan (0, 1) → (−1, 0).', 'Rotasi +90°.'],
    },
  ],
};

// ---------- 4.3 Komposisi transformasi ----------
const l3 = {
  id: 'k11lb4-3',
  title: 'Komposisi Transformasi',
  hook: 'Dua transformasi berturut-turut sama dengan satu transformasi yang matriksnya hasil kali kedua matriks. Urutannya penting.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segitiga dicerminkan terhadap sumbu x, lalu hasilnya diputar 90 derajat. Apakah hasilnya sama dengan kalau diputar dulu baru dicerminkan?',
          add: [...B5.P.els, tri('t', B5)],
          ask: {
            options: [
              { t: 'tidak, urutannya berpengaruh', ok: true, why: 'Seperti perkalian matriks: R × M biasanya tidak sama dengan M × R.' },
              { t: 'ya, sama saja', why: 'Coba lakukan keduanya: hasilnya ada di tempat berbeda.' },
              { t: 'ya, karena keduanya tidak mengubah ukuran', why: 'Ukuran memang tetap, tetapi posisinya berbeda.' },
              { t: 'tidak bisa dilakukan berurutan', why: 'Transformasi bisa dilakukan berurutan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dua langkah',
      steps: [
        {
          say: 'Langkah 1: cerminkan terhadap sumbu x.',
          clear: true,
          add: [...B5.P.els, ghost(B5), tri('t', B5), T('s1', '1) cermin sumbu x', RX, 30, { size: 14, c: 'acc' })],
        },
        {
          say: 'Segitiga terbalik ke bawah.',
          set: { t: { sy: -1, fill: 'acc-soft', stroke: 'acc' } },
        },
        {
          say: 'Langkah 2: putar hasilnya 90 derajat berlawanan arah jarum jam.',
          set: { t: { rot: -90, fill: 'ok-soft', stroke: 'ok' } },
          add: [T('s2', '2) rotasi 90°', RX, 55, { size: 14, c: 'ok' })],
        },
        {
          say: 'Perhatikan hasil akhirnya: sama persis dengan cermin terhadap garis y sama dengan x!',
          add: [lineOn('yx', B5.P, 1, 0, B5.C, { c: 'neg', sw: 2, dash: '6 5', z: -1 }), T('s3', '= cermin y = x', RX, 85, { size: 15, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Hasil kali matriks',
      steps: [
        {
          say: 'Matriks gabungannya adalah hasil kali kedua matriks. Yang dikerjakan belakangan ditulis di kiri: matriks rotasi kali matriks cermin sumbu x.',
          clear: true,
          add: [T('o', 'R(90°) × M(sumbu x)', 200, 40, { size: 20 }), ...mat('a', [[0, '−1'], [1, 0]], 80, 110).els, T('x', '×', 140, 110, { size: 22 }), ...mat('b', [[1, 0], [0, '−1']], 200, 110).els, T('e', '=', 262, 110, { size: 22 }), ...mat('c', [[0, 1], [1, 0]], 320, 110, { c: 'ok' }).els],
        },
        {
          say: 'Hasilnya 0, 1, 1, 0, yaitu matriks cermin terhadap y sama dengan x. Cocok dengan gambar tadi.',
          add: [T('k', '= matriks cermin y = x', 200, 180, { size: 20, c: 'ok' })],
        },
        {
          say: 'Kalau urutannya dibalik, putar dulu baru cermin, matriksnya cermin kali rotasi: 0, minus 1, minus 1, 0. Itu cermin terhadap garis y sama dengan minus x. Hasilnya berbeda.',
          add: [T('r', 'M × R = [[0, −1], [−1, 0]] = cermin y = −x', 200, 235, { size: 16, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik 1 koma 3 didilatasi dengan faktor 2, lalu diputar 180 derajat terhadap titik asal. Bayangannya …',
          clear: true,
          add: [T('q', '(1, 3): dilatasi 2, lalu rotasi 180°', 200, 100, { size: 22 }), T('q2', 'bayangan = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '(−2, −6)', ok: true, why: 'Dilatasi: (2, 6). Rotasi 180°: (−2, −6). Matriks gabungannya [[−2, 0], [0, −2]].' },
              { t: '(2, 6)', why: 'Itu baru dilatasi. Masih diputar 180°.' },
              { t: '(−1, −3)', why: 'Itu baru rotasi. Masih didilatasi 2.' },
              { t: '(6, 2)', why: 'Rotasi 180° tidak menukar koordinat.' },
            ],
          },
        },
        {
          say: 'Matriks gabungannya minus 1, 0, 0, minus 1 kali 2, 0, 0, 2, yaitu minus 2, 0, 0, minus 2. Dikali kolom 1, 3: minus 2 koma minus 6.',
          add: [T('a', '[[−2, 0], [0, −2]] × (1, 3) = {g:(−2, −6)}', 200, 220, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Titik (2, 1) dicerminkan terhadap sumbu x, lalu terhadap sumbu y. Bayangannya …',
      options: [
        { t: '(−2, −1)', ok: true },
        { t: '(2, −1)', why: 'Itu baru langkah pertama.' },
        { t: '(−2, 1)', why: 'Kedua koordinat berganti tanda.' },
        { t: '(1, 2)', why: 'Tidak ada pertukaran koordinat.' },
      ],
      steps: ['Sumbu x: (2, −1).', 'Sumbu y: (−2, −1).'],
    },
    {
      q: 'Matriks transformasi untuk "rotasi 90°, kemudian dilatasi faktor 3" adalah …',
      options: [
        { t: '[[0, −3], [3, 0]]', ok: true },
        { t: '[[3, −1], [1, 3]]', why: 'Hasil kali matriks: [[3, 0], [0, 3]] × [[0, −1], [1, 0]].' },
        { t: '[[0, −1], [1, 0]]', why: 'Itu rotasi saja.' },
        { t: '[[0, 3], [−3, 0]]', why: 'Itu rotasi −90° lalu dilatasi 3.' },
      ],
      steps: ['D × R = [[3, 0], [0, 3]] × [[0, −1], [1, 0]].', '= [[0, −3], [3, 0]].'],
    },
    {
      q: 'Dua kali rotasi 90° berturut-turut sama dengan …',
      options: [
        { t: 'rotasi 180°', ok: true },
        { t: 'rotasi 90°', why: 'Sudutnya dijumlah: 90° + 90°.' },
        { t: 'refleksi sumbu x', why: 'R × R = [[−1, 0], [0, −1]], itu rotasi 180°.' },
        { t: 'identitas', why: 'Butuh empat kali rotasi 90° untuk kembali ke semula.' },
      ],
      steps: ['[[0, −1], [1, 0]]² = [[−1, 0], [0, −1]].', 'Rotasi 180°.'],
    },
    {
      q: 'Pada komposisi "transformasi A dulu, lalu transformasi B", matriks gabungannya adalah …',
      options: [
        { t: 'B × A', ok: true },
        { t: 'A × B', why: 'Yang dikerjakan belakangan ditulis di kiri.' },
        { t: 'A + B', why: 'Komposisi memakai perkalian matriks.' },
        { t: 'A × B atau B × A sama saja', why: 'Perkalian matriks umumnya tidak komutatif.' },
      ],
      steps: ['Titik P: A dikerjakan dulu → A·P, lalu B → B·(A·P) = (B·A)·P.'],
    },
    {
      q: 'Titik (3, −2) diputar 90° dengan pusat O, lalu dicerminkan terhadap sumbu y. Bayangannya …',
      options: [
        { t: '(−2, 3)', ok: true },
        { t: '(2, 3)', why: 'Itu baru rotasi 90°. Lalu x berganti tanda.' },
        { t: '(2, −3)', why: 'Rotasi 90°: (3, −2) → (2, 3), lalu cermin sumbu y: (−2, 3).' },
        { t: '(−3, −2)', why: 'Kerjakan rotasi dulu.' },
      ],
      steps: ['Rotasi 90°: (x, y) → (−y, x) = (2, 3).', 'Cermin sumbu y: (−2, 3).'],
    },
  ],
};

export default {
  id: 'k11lb4',
  no: 4,
  title: 'Transformasi Geometri dengan Matriks',
  desc: 'Translasi, matriks refleksi, rotasi, dan dilatasi, cara menemukan matriks dari bayangan (1, 0) dan (0, 1), serta komposisi transformasi.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Bayangan titik (1, 4) oleh transformasi matriks [[2, 1], [0, 3]] adalah …',
      options: [
        { t: '(6, 12)', ok: true },
        { t: '(2, 12)', why: 'Baris 1: 2·1 + 1·4 = 6.' },
        { t: '(3, 7)', why: 'Itu menjumlah, bukan mengalikan baris dengan kolom.' },
        { t: '(6, 7)', why: 'Baris 2: 0·1 + 3·4 = 12.' },
      ],
      steps: ['(2·1 + 1·4, 0·1 + 3·4).', '= (6, 12).'],
    },
    {
      type: 'num',
      q: 'Persegi dengan luas 2 satuan ditransformasi oleh matriks [[3, 1], [1, 2]]. Luas bayangannya adalah … satuan',
      ans: ['10'],
      wrong: { '14': 'det = 3·2 − 1·1 = 5, bukan 7.', '5': '5 adalah faktor pengalinya. Luas = 2 × 5.' },
      steps: ['det = 6 − 1 = 5.', 'Luas = 2 × 5 = 10.'],
    },
    {
      q: 'Rotasi 90° dilanjutkan rotasi 270° dengan pusat yang sama menghasilkan …',
      options: [
        { t: 'posisi semula (identitas)', ok: true },
        { t: 'rotasi 180°', why: '90° + 270° = 360°.' },
        { t: 'refleksi sumbu y', why: 'Rotasi berturut-turut tetap rotasi.' },
        { t: 'rotasi 270°', why: 'Sudutnya dijumlah: 360°.' },
      ],
      steps: ['90° + 270° = 360° = satu putaran penuh.'],
    },
  ],
};
