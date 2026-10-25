// Kelas 9 · Bab 4: Kekongruenan dan Kesebangunan
import { T, box, ln, range } from '../helpers.js';

// Segitiga dengan titik asal di titik beratnya, supaya bisa diputar di tempat
function triC(id, pts, x, y, o = {}) {
  const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
  const cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
  return { id, t: 'poly', x, y, pts: pts.map(([a, b]) => [a - cx, b - cy]), fill: 'pos-soft', stroke: 'pos', sw: 2.5, ...o };
}
const label = (id, txt, x, y, c = 'ink', size = 15) => T(id, txt, x, y, { size, c });
// segitiga dasar: siku-siku di kiri bawah, alas 120, tinggi 90 (sisi miring 150)
const BASE = [[0, 90], [120, 90], [0, 0]];

// ---------- 4.1 Kekongruenan ----------
const l1 = {
  id: 'k9b4-1',
  title: 'Kekongruenan',
  hook: 'Dua bangun kongruen kalau bentuk dan ukurannya sama persis. Yang satu bisa menutupi yang lain dengan tepat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua segitiga ini posisinya berbeda. Apakah yang satu bisa menutupi yang lain dengan tepat?',
          add: [triC('A', BASE, 100, 150, { z: 2 }), triC('B', BASE, 290, 150, { rot: 90, fill: 'acc-soft', stroke: 'acc' })],
          ask: {
            options: [
              { t: 'Bisa, ukurannya sama', ok: true, why: 'Kita geser dan putar untuk membuktikannya.' },
              { t: 'Tidak, karena posisinya beda', why: 'Posisi tidak penting. Yang penting bentuk dan ukurannya.' },
              { t: 'Tidak, karena yang kanan lebih besar', why: 'Ukurannya sama, hanya diputar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menutup dengan tepat',
      steps: [
        { say: 'Geser segitiga biru ke tempat segitiga kuning.', set: { A: { x: 290 } } },
        { say: 'Putar 90 derajat.', set: { A: { rot: 90, o: 0.75 } } },
        {
          say: 'Pas sekali! Dua bangun yang bisa saling menutupi dengan tepat disebut kongruen. Simbolnya sama dengan bergelombang.',
          add: [T('k', 'kongruen: ≅', 200, 40, { size: 24, c: 'ok' })],
          pulse: ['A'],
        },
      ],
    },
    {
      title: 'Sisi dan sudut yang bersesuaian',
      steps: [
        {
          say: 'Pada bangun kongruen, sisi-sisi yang bersesuaian sama panjang, dan sudut-sudut yang bersesuaian sama besar.',
          clear: true,
          add: [
            { id: 't1', t: 'poly', x: 0, y: 0, pts: [[40, 220], [160, 220], [40, 130]], fill: 'pos-soft', stroke: 'pos', sw: 2.5 },
            { id: 't2', t: 'poly', x: 0, y: 0, pts: [[240, 220], [360, 220], [240, 130]], fill: 'acc-soft', stroke: 'acc', sw: 2.5 },
            label('a1', '4', 100, 238), label('b1', '3', 26, 175), label('c1', '5', 110, 165),
            label('a2', '4', 300, 238), label('b2', '3', 226, 175), label('c2', '5', 310, 165),
          ],
        },
        {
          say: 'Sisi 4 dengan 4, sisi 3 dengan 3, sisi 5 dengan 5. Semua sudutnya juga sama.',
          hl: ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'],
          add: [T('n', 'sisi bersesuaian sama, sudut bersesuaian sama', 200, 60, { size: 16 })],
        },
      ],
    },
    {
      title: 'Syarat segitiga kongruen',
      steps: [
        {
          say: 'Untuk segitiga, tidak perlu memeriksa semuanya. Cukup salah satu dari tiga syarat. Pertama: sisi, sisi, sisi. Ketiga sisinya sama panjang.',
          clear: true,
          add: [box('s1', 200, 60, 340, 50, { fill: 'pos-soft', r: 10, label: 'sisi – sisi – sisi (s.s.s)', lsize: 18 })],
        },
        {
          say: 'Kedua: sisi, sudut, sisi. Dua sisi sama panjang, dan sudut di antara keduanya sama besar.',
          add: [box('s2', 200, 130, 340, 50, { fill: 'acc-soft', r: 10, label: 'sisi – sudut – sisi (s.sd.s)', lsize: 18 })],
        },
        {
          say: 'Ketiga: sudut, sisi, sudut. Dua sudut sama besar, dan sisi di antara keduanya sama panjang.',
          add: [box('s3', 200, 200, 340, 50, { fill: 'ok-soft', r: 10, label: 'sudut – sisi – sudut (sd.s.sd)', lsize: 18 })],
        },
        {
          say: 'Hati-hati: tiga sudut sama saja tidak cukup. Segitiganya bisa sama bentuk tapi berbeda ukuran.',
          add: [T('x', 'sudut – sudut – sudut saja tidak cukup', 200, 260, { size: 16, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga PQR kongruen dengan segitiga KLM. PQ sama dengan 7 sentimeter dan PQ bersesuaian dengan KL. Berapa panjang KL?',
          clear: true,
          add: [T('q', '△PQR ≅ △KLM', 200, 100, { size: 30 }), T('q2', 'PQ = 7 cm, PQ bersesuaian dengan KL', 200, 155, { size: 18 }), T('q3', 'KL = ?', 200, 200, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '7 cm', ok: true, why: 'Sisi yang bersesuaian pada bangun kongruen sama panjang.' },
              { t: '14 cm', why: 'Kongruen berarti ukurannya sama, tidak diperbesar.' },
              { t: '3,5 cm', why: 'Kongruen berarti ukurannya sama, tidak diperkecil.' },
              { t: 'tidak bisa ditentukan', why: 'Bisa: sisi yang bersesuaian sama panjang.' },
            ],
          },
        },
        {
          say: 'Kongruen artinya ukurannya sama persis. Jadi KL juga 7 sentimeter.',
          clear: true,
          add: [T('a', 'KL = PQ = {a:7 cm}', 200, 120, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Dua bangun disebut kongruen jika …',
      options: [
        { t: 'bentuk dan ukurannya sama', ok: true },
        { t: 'bentuknya sama, ukurannya boleh berbeda', why: 'Itu sebangun.' },
        { t: 'kelilingnya sama', why: 'Keliling sama belum tentu bentuknya sama.' },
        { t: 'letaknya sama', why: 'Posisi tidak menentukan kongruen.' },
      ],
      steps: ['Kongruen: dapat saling menutupi dengan tepat.'],
    },
    {
      q: 'Dua segitiga memiliki dua sisi yang sama panjang dan sudut di antaranya sama besar. Kedua segitiga itu kongruen berdasarkan syarat …',
      options: [
        { t: 'sisi – sudut – sisi', ok: true },
        { t: 'sisi – sisi – sisi', why: 'Yang diketahui baru dua sisi dan satu sudut.' },
        { t: 'sudut – sisi – sudut', why: 'Yang diketahui dua sisi, bukan dua sudut.' },
        { t: 'sudut – sudut – sudut', why: 'Tiga sudut saja tidak cukup untuk kongruen.' },
      ],
      steps: ['Dua sisi + sudut apit → s.sd.s.'],
    },
    {
      type: 'num',
      q: '△ABC ≅ △DEF dengan ∠A = 50° dan ∠B = 70°. Besar ∠F adalah … °',
      ans: ['60'],
      wrong: { '50': '∠F bersesuaian dengan ∠C, bukan ∠A.', '70': '∠F bersesuaian dengan ∠C.' },
      steps: ['∠C = 180° − 50° − 70° = 60°.', '∠F bersesuaian dengan ∠C, jadi 60°.'],
    },
    {
      q: 'Manakah yang pasti kongruen?',
      options: [
        { t: 'dua persegi dengan sisi 5 cm', ok: true },
        { t: 'dua persegi panjang dengan luas 12 cm²', why: '3 × 4 dan 2 × 6 sama-sama 12 cm², tapi bentuknya berbeda.' },
        { t: 'dua segitiga dengan sudut 30°, 60°, 90°', why: 'Sudut sama, tapi ukurannya bisa berbeda.' },
        { t: 'dua lingkaran sembarang', why: 'Jari-jarinya bisa berbeda.' },
      ],
      steps: ['Persegi bersisi sama → bentuk dan ukuran sama.'],
    },
    {
      type: 'num',
      q: 'Persegi panjang ABCD kongruen dengan persegi panjang PQRS. AB = 8 cm dan BC = 5 cm. Keliling PQRS adalah … cm',
      ans: ['26'],
      wrong: { '40': '40 adalah luasnya.', '13': 'Keliling = 2 × (8 + 5).' },
      steps: ['PQRS berukuran sama: 8 × 5.', 'Keliling = 2(8 + 5) = 26 cm.'],
    },
  ],
};

// ---------- 4.2 Kesebangunan ----------
const rectB = (id, x, y, w, h, fill) => box(id, x, y, w, h, { fill, r: 2, sw: 2 });

const l2 = {
  id: 'k9b4-2',
  title: 'Kesebangunan',
  hook: 'Bangun sebangun punya bentuk sama tapi ukuran boleh berbeda: sudutnya sama, sisinya sebanding.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Foto 4 kali 6 sentimeter diperbesar. Ukuran mana yang gambarnya tidak gepeng atau melar?',
          add: [rectB('f', 70, 130, 40, 60, 'pos-soft'), label('lf', '4 × 6', 70, 180), rectB('a', 180, 130, 60, 90, 'acc-soft'), label('la', '6 × 9', 180, 190), rectB('b', 300, 130, 80, 90, 'neg-soft'), label('lb', '8 × 9', 300, 190)],
          ask: {
            options: [
              { t: '6 × 9', ok: true, why: '4 × 1,5 = 6 dan 6 × 1,5 = 9. Keduanya dikali angka yang sama.' },
              { t: '8 × 9', why: 'Lebar dikali 2, tapi tinggi hanya dikali 1,5. Gambarnya jadi melar.' },
              { t: 'keduanya sama saja', why: 'Hanya 6 × 9 yang sisinya sebanding dengan 4 × 6.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sisi sebanding',
      steps: [
        {
          say: 'Bandingkan sisi-sisinya. 6 dibagi 4 sama dengan 1 koma 5. 9 dibagi 6 juga 1 koma 5. Perbandingannya sama, jadi sebangun.',
          add: [T('r1', '6/4 = 9/6 = 1,5 ✓', 180, 245, { size: 16, c: 'ok' })],
        },
        {
          say: 'Untuk 8 kali 9: 8 dibagi 4 sama dengan 2, tapi 9 dibagi 6 sama dengan 1 koma 5. Tidak sama, jadi tidak sebangun.',
          add: [T('r2', '8/4 ≠ 9/6 ✗', 300, 245, { size: 16, c: 'neg' })],
        },
        {
          say: 'Dua bangun sebangun kalau sudut-sudut yang bersesuaian sama besar dan sisi-sisi yang bersesuaian sebanding.',
          add: [box('rb', 200, 40, 340, 40, { fill: 'acc-soft', r: 10, label: 'sebangun: sudut sama, sisi sebanding', lsize: 16 })],
        },
      ],
    },
    {
      title: 'Segitiga sebangun',
      steps: [
        {
          say: 'Pada segitiga, cukup periksa sudutnya. Kalau dua pasang sudut sama besar, segitiganya pasti sebangun.',
          clear: true,
          add: [
            { id: 't1', t: 'poly', x: 0, y: 0, pts: [[40, 230], [120, 230], [40, 170]], fill: 'pos-soft', stroke: 'pos', sw: 2.5 },
            { id: 't2', t: 'poly', x: 0, y: 0, pts: [[190, 230], [350, 230], [190, 110]], fill: 'acc-soft', stroke: 'acc', sw: 2.5 },
            label('a1', '4', 80, 247), label('b1', '3', 26, 200), label('a2', '8', 270, 247), label('b2', '6', 174, 170), label('c2', '?', 282, 160, 'acc'), label('c1', '5', 90, 190),
          ],
        },
        {
          say: 'Segitiga besar dua kali segitiga kecil: 8 dibagi 4 sama dengan 2, 6 dibagi 3 sama dengan 2. Faktor skalanya 2.',
          add: [T('k', 'faktor skala = 8 ÷ 4 = 6 ÷ 3 = 2', 200, 50, { size: 18 })],
        },
        {
          say: 'Jadi sisi miring segitiga besar juga 2 kali sisi miring kecil: 2 kali 5 sama dengan 10.',
          set: { c2: { text: '10' } },
          add: [T('k2', '? = 2 × 5 = {a:10}', 200, 85, { size: 20 })],
        },
      ],
    },
    {
      title: 'Kongruen atau sebangun?',
      steps: [
        {
          say: 'Kongruen pasti sebangun, dengan faktor skala 1. Tapi sebangun belum tentu kongruen.',
          clear: true,
          add: [box('k1', 105, 130, 180, 120, { fill: 'ok-soft', r: 12, label: 'kongruen\nbentuk sama\nukuran sama', lsize: 16 }), box('k2', 295, 130, 180, 120, { fill: 'acc-soft', r: 12, label: 'sebangun\nbentuk sama\nukuran boleh beda', lsize: 16 }), T('n', 'semua yang kongruen pasti sebangun', 200, 230, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga ABC sebangun dengan segitiga PQR. AB 6, BC 8, dan PQ 9. Kalau BC bersesuaian dengan QR, berapa QR?',
          clear: true,
          add: [T('q', '△ABC ~ △PQR', 200, 80, { size: 28 }), T('q2', 'AB = 6, BC = 8, PQ = 9', 200, 130, { size: 22 }), T('q3', 'QR = ?', 200, 180, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Faktor skala 9 ÷ 6 = 1,5. QR = 8 × 1,5 = 12.' },
              { t: '11', why: '9 − 6 = 3 lalu 8 + 3 = 11. Sebangun memakai perkalian, bukan penjumlahan.' },
              { t: '5,33', why: 'Itu 8 × 6 ÷ 9. Perbandingannya terbalik.' },
              { t: '8', why: 'Ukurannya berbeda, jadi QR bukan 8.' },
            ],
          },
        },
        {
          say: 'PQ dibagi AB sama dengan 9 dibagi 6, yaitu 1 koma 5. QR sama dengan 8 kali 1 koma 5, yaitu 12.',
          clear: true,
          add: [T('a', 'k = PQ ÷ AB = 9 ÷ 6 = 1,5', 200, 90, { size: 24 }), T('b', 'QR = 8 × 1,5 = {a:12}', 200, 150, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Persegi panjang manakah yang sebangun dengan persegi panjang 3 cm × 5 cm?',
      options: [
        { t: '9 cm × 15 cm', ok: true },
        { t: '5 cm × 7 cm', why: 'Ditambah 2 tidak menjaga perbandingan: 3/5 ≠ 5/7.' },
        { t: '6 cm × 8 cm', why: '6/3 = 2 tapi 8/5 = 1,6.' },
        { t: '3 cm × 3 cm', why: 'Persegi tidak sebangun dengan persegi panjang 3 × 5.' },
      ],
      steps: ['9/3 = 3 dan 15/5 = 3.', 'Perbandingan sama → sebangun.'],
    },
    {
      type: 'num',
      q: 'Dua segitiga sebangun dengan faktor skala 3. Sisi terpendek segitiga kecil 4 cm. Sisi terpendek segitiga besar adalah … cm',
      ans: ['12'],
      wrong: { '7': 'Dikali 3, bukan ditambah 3.', '1.33': 'Segitiga besar, jadi dikali.' },
      steps: ['4 × 3 = 12 cm.'],
    },
    {
      q: 'Syarat dua segitiga sebangun adalah …',
      options: [
        { t: 'sudut-sudut yang bersesuaian sama besar', ok: true },
        { t: 'sisi-sisi yang bersesuaian sama panjang', why: 'Itu syarat kongruen. Sebangun cukup sebanding.' },
        { t: 'luasnya sama', why: 'Segitiga sebangun bisa berbeda luas.' },
        { t: 'kelilingnya sama', why: 'Segitiga sebangun bisa berbeda keliling.' },
      ],
      steps: ['Sudut sama → sisi pasti sebanding → sebangun.'],
    },
    {
      type: 'num',
      q: '△ABC ~ △DEF dengan AB = 4, AC = 6, DE = 10. Jika AC bersesuaian dengan DF, panjang DF adalah …',
      ans: ['15'],
      wrong: { '12': 'Faktor skala 10 ÷ 4 = 2,5, bukan selisih 6.', '2.4': 'Perbandingan terbalik. DF = 6 × 2,5.' },
      steps: ['k = DE ÷ AB = 10 ÷ 4 = 2,5.', 'DF = 6 × 2,5 = 15.'],
    },
    {
      q: 'Pernyataan yang benar adalah …',
      options: [
        { t: 'semua persegi sebangun', ok: true },
        { t: 'semua persegi panjang sebangun', why: '2 × 3 dan 2 × 8 tidak sebangun.' },
        { t: 'semua segitiga sebangun', why: 'Sudutnya bisa berbeda.' },
        { t: 'semua belah ketupat sebangun', why: 'Sudut belah ketupat bisa berbeda.' },
      ],
      steps: ['Semua persegi bersudut 90° dan sisi-sisinya sebanding.'],
    },
  ],
};

// ---------- 4.3 Penerapan kesebangunan ----------
const GY = 240;
const l3 = {
  id: 'k9b4-3',
  title: 'Penerapan Kesebangunan',
  hook: 'Dengan sebatang tiang dan bayangannya, kita bisa mengukur tinggi pohon tanpa memanjatnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tiang setinggi 2 meter punya bayangan 3 meter. Pada saat yang sama, bayangan pohon 12 meter. Berapa tinggi pohon?',
          add: [
            ln('gr', 20, GY, 380, GY, { sw: 2.5, draw: false }),
            ln('tiang', 60, GY, 60, GY - 40, { sw: 5, c: 'ink' }),
            ln('sh1', 60, GY, 120, GY, { sw: 6, c: 'mut' }),
            label('lt', '2 m', 44, GY - 20, 'ink', 14),
            label('ls', '3 m', 90, GY + 14, 'mut', 14),
            ln('pohon', 200, GY, 200, GY - 160, { sw: 8, c: 'ok' }),
            { id: 'daun', t: 'circle', x: 200, y: GY - 165, r: 30, fill: 'ok-soft', stroke: 'ok', sw: 2 },
            ln('sh2', 200, GY, 380, GY, { sw: 6, c: 'mut' }),
            label('ls2', '12 m', 290, GY + 14, 'mut', 14),
            label('lq', '?', 182, GY - 80, 'acc', 20),
          ],
          ask: {
            options: [
              { t: '8 m', ok: true, why: 'Bayangan 4 kali lebih panjang, jadi pohon 4 kali tiang.' },
              { t: '11 m', why: '12 − 3 + 2? Sebangun memakai perbandingan, bukan selisih.' },
              { t: '18 m', why: '12 × 3 ÷ 2 terbalik. Tinggi : bayangan = 2 : 3.' },
              { t: '6 m', why: '12 ÷ 2 = 6. Bandingkan dengan bayangan tiang (3 m).' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dua segitiga sebangun',
      steps: [
        {
          say: 'Sinar matahari membentuk dua segitiga: tiang dengan bayangannya, dan pohon dengan bayangannya. Sudut sinarnya sama, jadi kedua segitiga sebangun.',
          add: [ln('ray1', 60, GY - 40, 120, GY, { sw: 2, c: 'acc', dash: '5 4' }), ln('ray2', 200, GY - 160, 380, GY, { sw: 2, c: 'acc', dash: '5 4' })],
        },
        {
          say: 'Bayangan pohon 12 dibagi bayangan tiang 3 sama dengan 4. Faktor skalanya 4.',
          add: [T('k', 'faktor skala = 12 ÷ 3 = 4', 95, 40, { size: 15 })],
        },
        {
          say: 'Tinggi pohon 4 kali tinggi tiang: 4 kali 2 sama dengan 8 meter.',
          set: { lq: { text: '8 m', x: 176 } },
          add: [T('k2', 'pohon = 4 × 2 = {a:8 m}', 95, 68, { size: 16 })],
        },
      ],
    },
    {
      title: 'Segitiga di dalam segitiga',
      steps: [
        {
          say: 'Garis yang sejajar alas memotong segitiga menjadi segitiga kecil di atas. Segitiga kecil dan besar sebangun, karena sudut-sudutnya sama.',
          clear: true,
          add: [
            { id: 'big', t: 'poly', x: 0, y: 0, pts: [[80, 240], [320, 240], [200, 40]], fill: 'pos-soft', stroke: 'pos', sw: 2.5 },
            { id: 'sm', t: 'poly', x: 0, y: 0, pts: [[140, 140], [260, 140], [200, 40]], fill: 'acc-soft', stroke: 'acc', sw: 2.5 },
            label('l1', '6', 160, 82), label('l2', '6', 102, 192), label('b1', 'DE = ?', 200, 156, 'acc'), label('b2', 'BC = 16', 200, 258),
          ],
        },
        {
          say: 'Sisi kiri segitiga kecil 6, sisi kiri segitiga besar 6 tambah 6, yaitu 12. Perbandingannya 6 banding 12, atau 1 banding 2.',
          add: [T('a', 'AD : AB = 6 : 12\n= 1 : 2', 335, 60, { size: 15, lh: 1.3 })],
        },
        {
          say: 'Jadi DE setengah dari BC: setengah kali 16 sama dengan 8.',
          set: { b1: { text: 'DE = 8' } },
          add: [T('b', 'DE = ½ × 16 = {a:8}', 330, 105, { size: 16 })],
        },
      ],
    },
    {
      title: 'Peta dan maket',
      steps: [
        {
          say: 'Peta dan maket juga sebangun dengan aslinya. Skala 1 banding 200 artinya 1 sentimeter di maket sama dengan 200 sentimeter di aslinya.',
          clear: true,
          add: [box('m', 110, 140, 100, 70, { fill: 'acc-soft', r: 4, label: 'maket\n6 cm × 4 cm', lsize: 13 }), box('a', 290, 140, 150, 105, { fill: 'pos-soft', r: 4, label: 'asli\n12 m × 8 m', lsize: 15 }), T('s', 'skala 1 : 200', 200, 50, { size: 20 })],
        },
        {
          say: 'Panjang maket 6 sentimeter, dikali 200 sama dengan 1200 sentimeter, yaitu 12 meter.',
          add: [T('c', '6 cm × 200 = 1.200 cm = 12 m', 200, 235, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tongkat 1 meter punya bayangan 1 koma 5 meter. Gedung punya bayangan 30 meter. Berapa tinggi gedung?',
          clear: true,
          add: [T('q', 'tongkat 1 m → bayangan 1,5 m', 200, 100, { size: 22 }), T('q2', 'gedung ? → bayangan 30 m', 200, 145, { size: 22 })],
          ask: {
            options: [
              { t: '20 m', ok: true, why: '30 ÷ 1,5 = 20, lalu 20 × 1 m = 20 m.' },
              { t: '45 m', why: '30 × 1,5 terbalik. Gedung lebih pendek dari bayangannya.' },
              { t: '29,5 m', why: 'Sebangun memakai perbandingan.' },
              { t: '30 m', why: 'Tinggi tongkat dan bayangannya tidak sama, jadi gedung juga tidak.' },
            ],
          },
        },
        {
          say: 'Bayangan gedung 30 dibagi 1 koma 5 sama dengan 20 kali bayangan tongkat. Jadi gedung 20 kali tongkat: 20 meter.',
          clear: true,
          add: [T('a', 'k = 30 ÷ 1,5 = 20', 200, 90, { size: 26 }), T('b', 'tinggi gedung = 20 × 1 m = {a:20 m}', 200, 150, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Tiang 3 m memiliki bayangan 4 m. Pada saat yang sama, bayangan menara 20 m. Tinggi menara adalah … m',
      ans: ['15'],
      wrong: { '26.67': 'Terbalik: tinggi : bayangan = 3 : 4.', '19': 'Pakai perbandingan, bukan selisih.' },
      steps: ['k = 20 ÷ 4 = 5.', 'Tinggi = 3 × 5 = 15 m.'],
    },
    {
      type: 'num',
      q: 'Pada segitiga ABC, DE sejajar BC dengan D pada AB dan E pada AC. AD = 4 cm, DB = 2 cm, dan BC = 12 cm. Panjang DE adalah … cm',
      ans: ['8'],
      wrong: { '6': 'Bandingkan AD dengan AB = 4 + 2 = 6, bukan dengan DB.', '24': 'DE lebih pendek dari BC.' },
      steps: ['AD : AB = 4 : 6 = 2 : 3.', 'DE = ⅔ × 12 = 8 cm.'],
    },
    {
      type: 'num',
      q: 'Skala denah 1 : 100. Panjang kamar pada denah 4 cm. Panjang kamar sebenarnya adalah … m',
      ans: ['4'],
      wrong: { '400': '400 cm = 4 m.', '0.04': 'Ukuran sebenarnya lebih besar: dikali 100.' },
      steps: ['4 × 100 = 400 cm.', '400 cm = 4 m.'],
    },
    {
      q: 'Sebuah foto 10 cm × 15 cm ditempel pada karton dengan lebar karton 20 cm. Agar karton sebangun dengan foto, tinggi karton harus …',
      options: [
        { t: '30 cm', ok: true },
        { t: '25 cm', why: 'Ditambah 10 tidak menjaga perbandingan. Faktor skala 20 ÷ 10 = 2.' },
        { t: '20 cm', why: 'Karton persegi tidak sebangun dengan foto 10 × 15.' },
        { t: '7,5 cm', why: 'Karton lebih besar, jadi dikali 2.' },
      ],
      steps: ['k = 20 ÷ 10 = 2.', 'Tinggi = 15 × 2 = 30 cm.'],
    },
    {
      type: 'num',
      q: 'Seorang anak setinggi 150 cm berdiri 2 m dari lampu jalan dan bayangannya 1 m. Ujung bayangan, kepala anak, dan lampu segaris. Tinggi lampu adalah … cm',
      ans: ['450'],
      wrong: { '300': 'Jarak ujung bayangan ke tiang lampu 1 + 2 = 3 m, jadi 3 kali tinggi anak.', '225': 'Bandingkan dengan jarak total 3 m.' },
      steps: ['Segitiga kecil: tinggi 150, alas 1 m.', 'Segitiga besar: alas 1 + 2 = 3 m → k = 3.', 'Tinggi lampu = 150 × 3 = 450 cm.'],
    },
  ],
};

export default {
  id: 'k9b4',
  no: 4,
  title: 'Kekongruenan dan Kesebangunan',
  desc: 'Bangun kongruen, syarat segitiga kongruen, bangun sebangun, faktor skala, dan penerapannya.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Dua segitiga sebangun dengan faktor skala 2. Perbandingan luas segitiga besar dan kecil adalah …',
      options: [
        { t: '4 : 1', ok: true },
        { t: '2 : 1', why: 'Alas dan tinggi sama-sama dikali 2, jadi luas dikali 4.' },
        { t: '8 : 1', why: '8 untuk volume bangun ruang.' },
        { t: '1 : 1', why: 'Ukurannya berbeda, jadi luasnya juga.' },
      ],
      steps: ['Luas = ½ × alas × tinggi.', 'Keduanya × 2 → luas × 4.'],
    },
    {
      type: 'num',
      q: 'Bayangan pohon 6 m dan bayangan tiang setinggi 1,5 m adalah 2 m. Tinggi pohon adalah … m',
      ans: ['4.5'],
      wrong: { '8': '6 ÷ 2 = 3 → 1,5 × 3 = 4,5.', '5.5': 'Pakai perbandingan, bukan selisih.' },
      steps: ['k = 6 ÷ 2 = 3.', 'Tinggi pohon = 1,5 × 3 = 4,5 m.'],
    },
    {
      q: '△PQR dan △XYZ memiliki ∠P = ∠X = 40° dan ∠Q = ∠Y = 75°. Pernyataan yang benar adalah …',
      options: [
        { t: 'keduanya pasti sebangun', ok: true },
        { t: 'keduanya pasti kongruen', why: 'Sudut sama hanya menjamin sebangun, ukurannya bisa berbeda.' },
        { t: 'keduanya tidak sebangun', why: 'Dua sudut sama → sudut ketiga juga sama → sebangun.' },
        { t: 'tidak bisa disimpulkan', why: 'Dua pasang sudut sama sudah cukup untuk sebangun.' },
      ],
      steps: ['∠R = ∠Z = 65°.', 'Ketiga sudut sama → sebangun.'],
    },
  ],
};
