// Bab 7: Segitiga dan Segi Empat
import { T, ln, box, areaCells, dot } from './helpers.js';

const deg = (r) => (r * 180) / Math.PI;
const dirDeg = (P, Q) => {
  const d = deg(Math.atan2(-(Q.y - P.y), Q.x - P.x));
  return d < 0 ? d + 360 : d;
};
// Poligon dengan titik mutlak; origin bisa dipindah agar rotasi/geser terjadi di titik itu
const P = (id, pts, o = {}, origin = { x: 0, y: 0 }) => ({ id, t: 'poly', x: origin.x, y: origin.y, pts: pts.map(([x, y]) => [x - origin.x, y - origin.y]), sw: 2.5, ...o });
const wedge = (id, V, a1, a2, c, o = {}) => ({ id, t: 'arc', x: V.x, y: V.y, a1, a2, r: 30, c, ...o });

// ---------- 7.1 Sudut segitiga ----------
const A = { x: 70, y: 230 };
const B = { x: 330, y: 230 };
const C = { x: 150, y: 70 };
const aA = [dirDeg(A, B), dirDeg(A, C)];
const aB = [dirDeg(B, C), dirDeg(B, A)];
const aC = [dirDeg(C, A), dirDeg(C, B)];
const sizeA = Math.round(aA[1] - aA[0]);
const O = { x: 280, y: 275 };

const l1 = {
  id: 'b7-1',
  title: 'Sudut-sudut Segitiga',
  hook: 'Kenapa jumlah sudut segitiga selalu 180°? Sobek ketiga sudutnya, lalu jajarkan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua sudut sebuah segitiga besarnya 50 derajat dan 70 derajat. Berapa sudut ketiga?',
          add: [P('tri', [[80, 220], [320, 220], [210, 70]], { fill: 'pos-soft' }), T('a', '50°', 120, 200, { size: 20 }), T('b', '70°', 285, 200, { size: 20 }), T('c', '?', 210, 108, { size: 24 })],
          ask: {
            options: [
              { t: '60°', ok: true, why: '180° − 50° − 70° = 60°.' },
              { t: '120°', why: '120° adalah 50° + 70°. Jumlah ketiga sudut 180°, jadi sudut ketiga 180° − 120°.' },
              { t: '240°', why: 'Jumlah sudut segitiga 180°, bukan 360°.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sobek ketiga sudutnya',
      steps: [
        {
          say: 'Ambil segitiga sembarang. Tandai ketiga sudutnya dengan warna berbeda.',
          clear: true,
          add: [P('tri', [[A.x, A.y], [B.x, B.y], [C.x, C.y]], { fill: 'paper' }), wedge('wa', A, aA[0], aA[1], 'pos'), wedge('wb', B, aB[0], aB[1], 'neg'), wedge('wc', C, aC[0], aC[1], 'acc')],
        },
        {
          say: 'Sobek ketiga sudut itu, lalu jajarkan di satu titik pada garis lurus.',
          add: [ln('base', O.x - 90, O.y, O.x + 90, O.y, { sw: 3 })],
          set: { wa: { x: O.x, y: O.y }, wb: { x: O.x, y: O.y }, wc: { x: O.x, y: O.y, rot: 180 } },
        },
        {
          say: 'Ketiganya pas membentuk garis lurus, yaitu 180 derajat. Ini berlaku untuk segitiga apa pun.',
          add: [T('s', 'a + b + c = 180°', 290, 90, { size: 24 })],
          pulse: ['wa', 'wb', 'wc'],
        },
      ],
    },
    {
      title: 'Jenis segitiga',
      steps: [
        {
          say: 'Berdasarkan sudutnya, segitiga lancip punya tiga sudut lancip. Segitiga siku-siku punya satu sudut 90 derajat. Segitiga tumpul punya satu sudut tumpul.',
          clear: true,
          add: [
            P('t1', [[25, 140], [125, 140], [70, 55]], { fill: 'pos-soft' }),
            T('l1', 'lancip', 75, 165, { size: 16 }),
            P('t2', [[155, 140], [255, 140], [155, 55]], { fill: 'pos-soft' }),
            { id: 'sq', t: 'arc', x: 155, y: 140, a1: 0, a2: 90, r: 14, right: true },
            T('l2', 'siku-siku', 205, 165, { size: 16 }),
            P('t3', [[285, 140], [385, 140], [255, 85]], { fill: 'pos-soft' }),
            T('l3', 'tumpul', 335, 165, { size: 16 }),
          ],
        },
        {
          say: 'Berdasarkan sisinya: segitiga sama sisi, ketiga sisinya sama. Sama kaki, dua sisinya sama. Sembarang, ketiga sisinya berbeda.',
          add: [
            P('s1', [[25, 270], [125, 270], [75, 184]], { fill: 'acc-soft' }),
            T('k1', 'sama sisi', 75, 290, { size: 15 }),
            P('s2', [[160, 270], [250, 270], [205, 190]], { fill: 'acc-soft' }),
            T('k2', 'sama kaki', 205, 290, { size: 15 }),
            P('s3', [[280, 270], [385, 270], [305, 200]], { fill: 'acc-soft' }),
            T('k3', 'sembarang', 335, 290, { size: 15 }),
          ],
        },
      ],
    },
    {
      title: 'Sudut luar',
      steps: [
        {
          say: 'Perpanjang alas segitiga. Sudut yang terbentuk di luar disebut sudut luar.',
          clear: true,
          add: [P('tri', [[60, 210], [250, 210], [192.5, 52]], { fill: 'pos-soft' }), ln('ext', 250, 210, 370, 210, { sw: 3, dash: '7 5' }), T('a', '50°', 104, 196, { size: 18 }), T('c', '60°', 192, 86, { size: 18 }), { id: 'luar', t: 'arc', x: 250, y: 210, a1: 0, a2: dirDeg({ x: 250, y: 210 }, { x: 192.5, y: 52 }), r: 30, c: 'pos', label: '?' }],
        },
        {
          say: 'Sudut luar sama dengan jumlah dua sudut dalam yang tidak bersebelahan dengannya: 50 tambah 60, yaitu 110 derajat.',
          set: { luar: { label: '110°' } },
          add: [T('r', 'sudut luar = 50° + 60° = 110°', 200, 262, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga sama kaki punya sudut puncak 40 derajat. Berapa besar masing-masing sudut alasnya?',
          clear: true,
          add: [P('tri', [[110, 230], [290, 230], [200, 60]], { fill: 'pos-soft' }), T('t', '40°', 200, 100, { size: 20 }), T('a', '?', 140, 212, { size: 22 }), T('b', '?', 260, 212, { size: 22 })],
          ask: {
            options: [
              { t: '70°', ok: true, why: '180° − 40° = 140°, dibagi dua sudut alas yang sama.' },
              { t: '140°', why: '140° adalah jumlah kedua sudut alas. Masing-masing setengahnya.' },
              { t: '40°', why: 'Sudut alas segitiga sama kaki sama satu dengan yang lain, bukan sama dengan sudut puncak.' },
            ],
          },
        },
        { say: '180 kurang 40 sama dengan 140. Dua sudut alasnya sama, jadi masing-masing 70 derajat.', set: { a: { text: '70°', size: 18 }, b: { text: '70°', size: 18 } }, add: [T('r', '(180° − 40°) ÷ 2 = 70°', 200, 270, { size: 20 })] },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Sudut-sudut sebuah segitiga besarnya 35°, 85°, dan x°. Nilai x adalah …',
      ans: ['60'],
      wrong: { '120': '120 adalah 35 + 85. Sudut ketiga = 180 − 120.', '240': 'Jumlah sudut segitiga 180°, bukan 360°.' },
      steps: ['35 + 85 + x = 180.', 'x = 180 − 120 = 60.'],
    },
    {
      q: 'Segitiga dengan sudut 30°, 60°, dan 90° termasuk segitiga …',
      options: [
        { t: 'siku-siku', ok: true },
        { t: 'lancip', why: 'Segitiga lancip semua sudutnya kurang dari 90°. Di sini ada sudut 90°.' },
        { t: 'tumpul', why: 'Tidak ada sudut yang lebih dari 90°.' },
        { t: 'sama kaki', why: 'Ketiga sudutnya berbeda, jadi ketiga sisinya juga berbeda.' },
      ],
      steps: ['Ada satu sudut 90°.', 'Jadi segitiga siku-siku.'],
    },
    {
      q: 'Sudut-sudut sebuah segitiga besarnya 2x°, 3x°, dan 4x°. Nilai x adalah …',
      options: [
        { t: '20', ok: true },
        { t: '45', why: 'Ketiga sudut dijumlahkan: 2x + 3x + 4x = 9x = 180.' },
        { t: '40', why: '9x = 180, jadi x = 20.' },
        { t: '30', why: 'Cek: 2(30) + 3(30) + 4(30) = 270, bukan 180.' },
      ],
      steps: ['2x + 3x + 4x = 180.', '9x = 180, x = 20.', 'Sudutnya 40°, 60°, dan 80°.'],
    },
    {
      type: 'num',
      q: 'Sebuah sudut luar segitiga besarnya 125°. Salah satu sudut dalam yang tidak bersebelahan dengannya 60°. Sudut dalam tak bersebelahan yang lain besarnya …°',
      ans: ['65'],
      wrong: { '55': '55° adalah sudut dalam yang bersebelahan dengan sudut luar. Yang ditanya sudut lainnya: 125 − 60.', '185': 'Sudut luar = jumlah dua sudut dalam tak bersebelahan, jadi dikurangkan: 125 − 60.' },
      steps: ['Sudut luar = jumlah dua sudut dalam tak bersebelahan.', '125 = 60 + x, x = 65°.'],
    },
    {
      q: 'Mungkinkah sebuah segitiga memiliki dua sudut tumpul?',
      options: [
        { t: 'Tidak, karena jumlah dua sudut tumpul sudah lebih dari 180°', ok: true },
        { t: 'Ya, asalkan sudut ketiganya kecil', why: 'Dua sudut tumpul saja jumlahnya sudah lebih dari 180°, tidak tersisa untuk sudut ketiga.' },
        { t: 'Ya, pada segitiga sama kaki', why: 'Dua sudut alas segitiga sama kaki selalu lancip, karena jumlah sudutnya 180°.' },
        { t: 'Tidak, karena sudut tumpul hanya ada pada segi empat', why: 'Segitiga boleh punya satu sudut tumpul, tapi tidak dua.' },
      ],
      steps: ['Sudut tumpul lebih dari 90°.', 'Dua sudut tumpul jumlahnya lebih dari 180°, padahal jumlah ketiga sudut tepat 180°.'],
    },
  ],
};

// ---------- 7.2 Persegi panjang dan persegi ----------
const R = { l: 80, t: 70, w: 240, h: 160 };
const corner = { tl: { x: R.l, y: R.t }, tr: { x: R.l + R.w, y: R.t }, br: { x: R.l + R.w, y: R.t + R.h }, bl: { x: R.l, y: R.t + R.h } };

const l2 = {
  id: 'b7-2',
  title: 'Keliling dan Luas Persegi Panjang',
  hook: 'Keliling itu panjang pagar, luas itu banyak ubin. Dua bangun bisa sama luas tapi beda keliling.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Persegi panjang berukuran 6 sentimeter kali 4 sentimeter. Berapa kelilingnya?',
          add: [box('r', 200, 140, 240, 160, { fill: 'pos-soft', r: 0 }), T('p', '6 cm', 200, 42, { size: 20 }), T('l', '4 cm', 50, 140, { size: 20 })],
          ask: {
            options: [
              { t: '20 cm', ok: true, why: '6 + 4 + 6 + 4 = 20.' },
              { t: '24 cm', why: '24 adalah luasnya (6 × 4), dalam cm². Keliling adalah panjang semua sisi.' },
              { t: '10 cm', why: '10 baru dua sisi (6 + 4). Persegi panjang punya empat sisi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Keliling: berjalan mengitari',
      steps: [
        {
          say: 'Keliling adalah panjang jalan mengitari bangun sampai kembali ke titik awal. Mulai dari pojok kiri atas.',
          clear: true,
          add: [box('r', 200, 150, R.w, R.h, { fill: 'paper', r: 0 }), T('p', '6 cm', 200, 52, { size: 18 }), T('l', '4 cm', 52, 150, { size: 18 }), dot('ant', corner.tl.x, corner.tl.y, 'acc', { r: 9 }), T('k', '0 cm', 200, 268, { size: 26 })],
        },
        { say: 'Ke kanan 6.', set: { ant: corner.tr, k: { text: '6 cm' } }, add: [ln('e1', corner.tl.x, corner.tl.y, corner.tr.x, corner.tr.y, { c: 'acc', sw: 5 })] },
        { say: 'Ke bawah 4. Jadi 10.', set: { ant: corner.br, k: { text: '6 + 4 = 10 cm' } }, add: [ln('e2', corner.tr.x, corner.tr.y, corner.br.x, corner.br.y, { c: 'acc', sw: 5 })] },
        { say: 'Ke kiri 6. Jadi 16.', set: { ant: corner.bl, k: { text: '6 + 4 + 6 = 16 cm' } }, add: [ln('e3', corner.br.x, corner.br.y, corner.bl.x, corner.bl.y, { c: 'acc', sw: 5 })] },
        { say: 'Ke atas 4, kembali ke awal. Kelilingnya 20 sentimeter.', set: { ant: corner.tl, k: { text: 'keliling = 2 × (6 + 4) = 20 cm' } }, add: [ln('e4', corner.bl.x, corner.bl.y, corner.tl.x, corner.tl.y, { c: 'acc', sw: 5 })] },
      ],
    },
    {
      title: 'Luas: menghitung persegi satuan',
      steps: [
        {
          say: 'Luas adalah banyaknya persegi satuan yang menutupi bangun. Setiap persegi kecil berukuran 1 sentimeter kali 1 sentimeter.',
          clear: true,
          add: [...areaCells('c', 200, 150, R.w, R.h, 4, 6, () => 'pos-soft'), T('p', '6 cm', 200, 52, { size: 18 }), T('l', '4 cm', 52, 150, { size: 18 })],
        },
        { say: 'Ada 4 baris, setiap baris 6 persegi. Jumlahnya 4 kali 6, yaitu 24 sentimeter persegi.', add: [T('k', 'luas = 6 × 4 = 24 cm²', 200, 268, { size: 26 })], pulse: ['c0_*'] },
      ],
    },
    {
      title: 'Persegi',
      steps: [
        {
          say: 'Persegi adalah persegi panjang yang keempat sisinya sama. Kalau sisinya 5 sentimeter, kelilingnya 4 kali 5, yaitu 20 sentimeter.',
          clear: true,
          add: [...areaCells('c', 130, 150, 160, 160, 5, 5, () => 'acc-soft'), T('s', '5 cm', 130, 56, { size: 18 }), T('k', 'keliling = 4 × 5 = 20 cm', 300, 120, { size: 18 })],
        },
        { say: 'Luasnya 5 kali 5, yaitu 25 sentimeter persegi.', add: [T('l', 'luas = 5 × 5 = 25 cm²', 300, 170, { size: 18 })] },
      ],
    },
    {
      title: 'Sama luas, beda keliling',
      steps: [
        {
          say: 'Tiga persegi panjang ini luasnya sama-sama 12 persegi satuan.',
          clear: true,
          add: [
            ...areaCells('a', 200, 55, 288, 24, 1, 12, () => 'pos-soft'),
            ...areaCells('b', 110, 170, 144, 48, 2, 6, () => 'pos-soft'),
            ...areaCells('c', 305, 170, 96, 72, 3, 4, () => 'pos-soft'),
            T('la', '12 × 1', 200, 90, { size: 16 }),
            T('lb', '6 × 2', 110, 215, { size: 16 }),
            T('lc', '4 × 3', 305, 228, { size: 16 }),
          ],
        },
        {
          say: 'Tapi kelilingnya berbeda: 26, 16, dan 14. Luas sama tidak berarti keliling sama.',
          set: { la: { text: '12 × 1: keliling 26' }, lb: { text: '6 × 2: keliling 16' }, lc: { text: '4 × 3: keliling 14' } },
          add: [T('n', 'makin mendekati persegi, makin kecil kelilingnya', 200, 270, { size: 15, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Bangun gabungan',
      steps: [
        {
          say: 'Bangun berbentuk huruf L ini bisa dipotong menjadi dua persegi panjang.',
          clear: true,
          add: [P('L', [[80, 60], [180, 60], [180, 160], [260, 160], [260, 260], [80, 260]], { fill: 'pos-soft' }), T('t1', '5', 130, 46, { size: 16 }), T('t2', '10', 62, 160, { size: 16 }), T('t3', '9', 170, 278, { size: 16 }), T('t4', '5', 274, 210, { size: 16 }), T('t5', '4', 220, 146, { size: 16 })],
        },
        {
          say: 'Potong di sini. Bagian kiri 5 kali 10, yaitu 50. Bagian kanan 4 kali 5, yaitu 20.',
          add: [ln('cut', 180, 160, 180, 260, { dash: '6 5', c: 'acc', sw: 3 }), T('a1', '5 × 10 = 50', 130, 165, { size: 16 }), T('a2', '4 × 5 = 20', 220, 212, { size: 15 })],
        },
        { say: 'Luas totalnya 50 tambah 20, yaitu 70 satuan persegi.', add: [T('tot', 'luas = 50 + 20 = 70', 290, 90, { size: 20, c: 'pos' })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Keliling sebuah persegi 36 sentimeter. Berapa luasnya?',
          clear: true,
          add: [box('s', 200, 140, 150, 150, { fill: 'acc-soft', r: 0 }), T('k', 'keliling = 36 cm', 200, 245, { size: 22 }), T('q', 'luas = ?', 200, 278, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: '81 cm²', ok: true, why: 'Sisi = 36 ÷ 4 = 9, luas = 9 × 9.' },
              { t: '36 cm²', why: 'Keliling dan luas tidak sama. Cari sisinya dulu: 36 ÷ 4 = 9.' },
              { t: '1.296 cm²', why: 'Ini 36 × 36. Padahal 36 adalah keliling, bukan sisi.' },
            ],
          },
        },
        { say: 'Sisi persegi sama dengan 36 dibagi 4, yaitu 9 sentimeter. Luasnya 9 kali 9, yaitu 81 sentimeter persegi.', set: { q: { text: 'sisi = 36 ÷ 4 = 9 cm,  luas = 9 × 9 = 81 cm²', c: 'pos', size: 17 } } },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Luas persegi panjang berukuran 12 cm × 7 cm adalah …',
      unit: 'cm²',
      ans: ['84'],
      wrong: { '38': 'Itu kelilingnya. Luas = panjang × lebar.', '19': 'Itu panjang + lebar. Luas = panjang × lebar.' },
      steps: ['Luas = 12 × 7 = 84 cm².'],
    },
    {
      type: 'num',
      q: 'Keliling persegi dengan sisi 15 cm adalah …',
      unit: 'cm',
      ans: ['60'],
      wrong: { '225': 'Itu luasnya (15 × 15). Keliling = 4 × sisi.', '30': 'Persegi punya 4 sisi, bukan 2.' },
      steps: ['Keliling = 4 × 15 = 60 cm.'],
    },
    {
      q: 'Luas sebuah persegi panjang 72 cm² dan panjangnya 9 cm. Lebarnya adalah …',
      options: [
        { t: '8 cm', ok: true },
        { t: '63 cm', why: 'Luas = panjang × lebar, jadi lebar = 72 ÷ 9, bukan 72 − 9.' },
        { t: '27 cm', why: 'Ini (72 ÷ 2) − 9, seolah 72 adalah keliling. 72 adalah luas.' },
        { t: '648 cm', why: 'Lebar = 72 ÷ 9, bukan 72 × 9.' },
      ],
      steps: ['Luas = p × l, jadi 72 = 9 × l.', 'l = 72 ÷ 9 = 8 cm.'],
    },
    {
      q: 'Luas bangun pada gambar adalah …',
      fig: [P('L', [[60, 60], [240, 60], [240, 114], [312, 114], [312, 168], [60, 168]], { fill: 'pos-soft' }), T('a', '10 cm', 150, 44, { size: 15 }), T('b', '6 cm', 36, 114, { size: 15 }), T('c', '14 cm', 186, 186, { size: 15 }), T('d', '3 cm', 336, 141, { size: 15 }), T('e', '4 cm', 276, 98, { size: 15 })],
      viewBox: '10 30 370 170',
      figLabel: 'Bangun berbentuk tangga: bagian kiri 10 cm kali 6 cm, ditambah bagian kanan bawah 4 cm kali 3 cm',
      options: [
        { t: '72 cm²', ok: true },
        { t: '84 cm²', why: 'Ini 14 × 6, seolah bangunnya persegi panjang penuh. Bagian kanan atas kosong.' },
        { t: '40 cm²', why: 'Itu kelilingnya (14 + 6 + 10 + 3 + 4 + 3). Luas dihitung dari persegi satuan.' },
        { t: '60 cm²', why: 'Bagian kanan bawah (4 × 3 = 12) belum ditambahkan.' },
      ],
      steps: ['Potong jadi dua: kiri 10 × 6 = 60 cm².', 'Kanan bawah 4 × 3 = 12 cm².', 'Total 72 cm².'],
    },
    {
      q: 'Lantai berukuran 4 m × 3 m akan dipasang ubin persegi berukuran 20 cm × 20 cm. Banyak ubin yang dibutuhkan adalah …',
      options: [
        { t: '300', ok: true },
        { t: '3', why: 'Satuannya harus disamakan: 4 m = 400 cm dan 3 m = 300 cm.' },
        { t: '30', why: '400 ÷ 20 = 20 ubin per baris, dan 300 ÷ 20 = 15 baris. 20 × 15 = 300.' },
        { t: '600', why: 'Ini membagi luas dengan 20, bukan dengan luas satu ubin (20 × 20 = 400 cm²).' },
      ],
      steps: ['Luas lantai: 400 × 300 = 120.000 cm².', 'Luas satu ubin: 20 × 20 = 400 cm².', '120.000 ÷ 400 = 300 ubin.'],
    },
  ],
};

// ---------- 7.3 Jajargenjang dan segitiga ----------
const JG = { bl: [60, 210], br: [268, 210], tr: [346, 106], tl: [138, 106] };
const TRI = { a: { x: 80, y: 220 }, b: { x: 280, y: 220 }, c: { x: 140, y: 100 } };
const M = { x: (TRI.b.x + TRI.c.x) / 2, y: (TRI.b.y + TRI.c.y) / 2 };

const l3 = {
  id: 'b7-3',
  title: 'Luas Jajargenjang dan Segitiga',
  hook: 'Jajargenjang bisa dipotong dan digeser menjadi persegi panjang. Segitiga adalah setengahnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Jajargenjang ini alasnya 8, sisi miringnya 5, dan tingginya 4. Berapa luasnya?',
          add: [P('jg', [JG.bl, JG.br, JG.tr, JG.tl], { fill: 'pos-soft' }), ln('h', 138, 106, 138, 210, { dash: '6 5', c: 'acc', sw: 2.5 }), T('a', 'alas 8', 164, 230, { size: 17 }), T('t', 't = 4', 168, 160, { size: 16 }), T('m', '5', 318, 160, { size: 16 })],
          ask: {
            options: [
              { t: '32', ok: true, why: 'Alas × tinggi = 8 × 4.' },
              { t: '40', why: 'Ini alas × sisi miring. Tinggi harus diukur tegak lurus terhadap alas.' },
              { t: '26', why: '26 adalah kelilingnya (8 + 5 + 8 + 5).' },
            ],
          },
        },
      ],
    },
    {
      title: 'Potong dan geser',
      steps: [
        {
          say: 'Potong jajargenjang di sepanjang garis tinggi.',
          clear: true,
          add: [
            P('tri', [JG.tl, [138, 210], JG.bl], { fill: 'acc-soft' }, { x: 138, y: 106 }),
            P('quad', [JG.tl, JG.tr, JG.br, [138, 210]], { fill: 'pos-soft' }),
            ln('h', 138, 106, 138, 210, { dash: '6 5', c: 'acc', sw: 2.5 }),
          ],
        },
        { say: 'Geser potongan segitiga ke sisi kanan.', set: { tri: { x: 138 + 208 } } },
        {
          say: 'Hasilnya persegi panjang dengan panjang sama dengan alas, dan lebar sama dengan tinggi. Luasnya tidak berubah.',
          add: [T('a', 'alas', 242, 230, { size: 17 }), T('t', 'tinggi', 105, 158, { size: 16 }), T('r', 'luas = alas × tinggi', 242, 268, { size: 22, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Segitiga: setengah jajargenjang',
      steps: [
        {
          say: 'Sekarang segitiga. Buat salinannya.',
          clear: true,
          add: [
            P('t0', [[TRI.a.x, TRI.a.y], [TRI.b.x, TRI.b.y], [TRI.c.x, TRI.c.y]], { fill: 'pos-soft' }),
            P('t1', [[TRI.a.x, TRI.a.y], [TRI.b.x, TRI.b.y], [TRI.c.x, TRI.c.y]], { fill: 'acc-soft', o: 0.9 }, M),
          ],
        },
        { say: 'Putar salinannya setengah putaran. Kedua segitiga membentuk jajargenjang.', set: { t1: { rot: 180 } } },
        {
          say: 'Jadi luas segitiga adalah setengah luas jajargenjang: setengah kali alas kali tinggi.',
          add: [ln('h', TRI.c.x, TRI.c.y, TRI.c.x, TRI.a.y, { dash: '6 5', c: 'ink', sw: 2 }), T('a', 'alas', 180, 240, { size: 16 }), T('t', 'tinggi', 62, 160, { size: 15 }), T('r', 'luas segitiga = ½ × alas × tinggi', 200, 272, { size: 20, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Tinggi harus tegak lurus',
      steps: [
        {
          say: 'Tinggi segitiga selalu tegak lurus terhadap alas. Pada segitiga tumpul, garis tingginya bisa jatuh di luar segitiga.',
          clear: true,
          add: [P('t', [[150, 220], [290, 220], [80, 100]], { fill: 'pos-soft' }), ln('ext', 80, 220, 150, 220, { dash: '6 5', c: 'mut', sw: 2 }), ln('h', 80, 100, 80, 220, { dash: '6 5', c: 'acc', sw: 3 }), { id: 'sq', t: 'arc', x: 80, y: 220, a1: 0, a2: 90, r: 12, right: true }, T('a', 'alas', 220, 240, { size: 16 }), T('tt', 'tinggi', 52, 160, { size: 15 })],
        },
        { say: 'Rumusnya tetap: setengah kali alas kali tinggi.', add: [T('r', '½ × alas × tinggi', 270, 120, { size: 20, c: 'pos' })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga beralas 10 sentimeter dan tingginya 6 sentimeter. Berapa luasnya?',
          clear: true,
          add: [P('t', [[90, 220], [310, 220], [170, 90]], { fill: 'pos-soft' }), ln('h', 170, 90, 170, 220, { dash: '6 5', c: 'acc', sw: 2.5 }), T('a', '10 cm', 200, 240, { size: 17 }), T('t2', '6 cm', 192, 160, { size: 16 })],
          ask: {
            options: [
              { t: '30 cm²', ok: true, why: '½ × 10 × 6 = 30.' },
              { t: '60 cm²', why: '10 × 6 adalah luas jajargenjang. Segitiga setengahnya.' },
              { t: '16 cm²', why: 'Ini 10 + 6. Luas dihitung dengan perkalian.' },
            ],
          },
        },
        { say: 'Setengah kali 10 kali 6 sama dengan 30 sentimeter persegi.', add: [T('r', '½ × 10 × 6 = 30 cm²', 200, 272, { size: 22, c: 'pos' })] },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Luas jajargenjang dengan alas 12 cm dan tinggi 7 cm adalah …',
      unit: 'cm²',
      ans: ['84'],
      wrong: { '42': 'Itu luas segitiga. Jajargenjang tidak dikali ½.', '19': 'Luas dihitung dengan perkalian alas × tinggi.' },
      steps: ['Luas = alas × tinggi = 12 × 7 = 84 cm².'],
    },
    {
      q: 'Luas segitiga pada gambar adalah …',
      fig: [P('t', [[70, 210], [250, 210], [190, 50]], { fill: 'pos-soft' }), ln('h', 190, 50, 190, 210, { dash: '6 5', c: 'acc', sw: 2.5 }), T('a', '9 cm', 160, 228, { size: 15 }), T('h2', '8 cm', 214, 130, { size: 15 }), T('s', '10 cm', 108, 120, { size: 15 })],
      viewBox: '40 30 260 215',
      figLabel: 'Segitiga dengan alas 9 cm, tinggi 8 cm, dan sisi miring 10 cm',
      options: [
        { t: '36 cm²', ok: true },
        { t: '45 cm²', why: 'Ini ½ × 9 × 10. Sisi miring 10 cm bukan tinggi, karena tidak tegak lurus alas.' },
        { t: '72 cm²', why: 'Luas segitiga harus dikali ½.' },
        { t: '27 cm²', why: 'Tingginya 8 cm, bukan 6 cm: ½ × 9 × 8.' },
      ],
      steps: ['Tinggi adalah garis putus-putus yang tegak lurus alas: 8 cm.', 'Luas = ½ × 9 × 8 = 36 cm².'],
    },
    {
      type: 'num',
      q: 'Luas sebuah segitiga 48 cm² dan alasnya 12 cm. Tingginya adalah …',
      unit: 'cm',
      ans: ['8'],
      wrong: { '4': 'Luas = ½ × alas × tinggi. 48 = 6 × tinggi, jadi tinggi = 8.', '36': 'Tinggi dicari dengan membagi, bukan mengurangi.' },
      steps: ['48 = ½ × 12 × t = 6t.', 't = 48 ÷ 6 = 8 cm.'],
    },
    {
      q: 'Jajargenjang dengan alas 10 cm dan tinggi 6 cm dipotong dan digeser menjadi persegi panjang. Ukuran persegi panjang itu adalah …',
      options: [
        { t: '10 cm × 6 cm', ok: true },
        { t: '10 cm × sisi miringnya', why: 'Lebar persegi panjang sama dengan tinggi jajargenjang, bukan sisi miringnya.' },
        { t: '5 cm × 6 cm', why: 'Panjangnya tetap sama dengan alas, yaitu 10 cm.' },
        { t: '16 cm × 6 cm', why: 'Potongan yang digeser hanya pindah tempat, panjang alasnya tetap 10 cm.' },
      ],
      steps: ['Potongan segitiga dipindah dari kiri ke kanan.', 'Panjang = alas = 10 cm, lebar = tinggi = 6 cm.'],
    },
    {
      q: 'Luas segitiga tumpul pada gambar adalah …',
      fig: [P('t', [[150, 210], [270, 210], [70, 110]], { fill: 'pos-soft' }), ln('ext', 70, 210, 150, 210, { dash: '6 5', c: 'mut', sw: 2 }), ln('h', 70, 110, 70, 210, { dash: '6 5', c: 'acc', sw: 2.5 }), T('a', '6 cm', 210, 228, { size: 15 }), T('h2', '5 cm', 46, 160, { size: 15 })],
      viewBox: '20 80 280 170',
      figLabel: 'Segitiga tumpul dengan alas 6 cm dan tinggi 5 cm yang jatuh di luar segitiga',
      options: [
        { t: '15 cm²', ok: true },
        { t: '30 cm²', why: 'Jangan lupa dikali ½.' },
        { t: '11 cm²', why: 'Luas dihitung dengan perkalian: ½ × 6 × 5.' },
        { t: 'Tidak bisa dihitung', why: 'Tinggi boleh jatuh di luar segitiga. Rumusnya tetap ½ × alas × tinggi.' },
      ],
      steps: ['Alas 6 cm, tinggi 5 cm (tegak lurus perpanjangan alas).', 'Luas = ½ × 6 × 5 = 15 cm².'],
    },
  ],
};

// ---------- 7.4 Trapesium, belah ketupat, layang-layang ----------
const TZ = { bl: { x: 40, y: 220 }, br: { x: 220, y: 220 }, tr: { x: 190, y: 148 }, tl: { x: 82, y: 148 } };
const MZ = { x: (TZ.br.x + TZ.tr.x) / 2, y: (TZ.br.y + TZ.tr.y) / 2 };
const tzPts = [TZ.bl, TZ.br, TZ.tr, TZ.tl].map((p) => [p.x, p.y]);

const l4 = {
  id: 'b7-4',
  title: 'Luas Trapesium, Belah Ketupat, dan Layang-layang',
  hook: 'Dua trapesium yang sama, satu diputar, menjadi jajargenjang. Dari situ rumus trapesium muncul sendiri.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Trapesium ini punya sisi sejajar 6 dan 10, dengan tinggi 4. Berapa luasnya?',
          add: [P('tz', [[80, 210], [320, 210], [260, 114], [116, 114]], { fill: 'pos-soft' }), T('b', '10', 200, 230, { size: 18 }), T('a', '6', 188, 98, { size: 18 }), ln('h', 116, 114, 116, 210, { dash: '6 5', c: 'acc', sw: 2.5 }), T('t', '4', 130, 162, { size: 17 })],
          ask: {
            options: [
              { t: '32', ok: true, why: '½ × (6 + 10) × 4 = 32.' },
              { t: '64', why: 'Ini (6 + 10) × 4, belum dibagi 2.' },
              { t: '240', why: 'Ini 6 × 10 × 4. Kedua sisi sejajar dijumlahkan, bukan dikalikan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dua trapesium',
      steps: [
        {
          say: 'Ambil trapesium dengan sisi sejajar a dan b, dan tinggi t. Buat salinannya.',
          clear: true,
          add: [P('z0', tzPts, { fill: 'pos-soft' }), P('z1', tzPts, { fill: 'acc-soft', o: 0.9 }, MZ), T('lb', 'b', 130, 236, { size: 18 }), T('la', 'a', 136, 134, { size: 18 })],
        },
        { say: 'Putar salinannya setengah putaran. Keduanya membentuk jajargenjang.', set: { z1: { rot: 180 } } },
        {
          say: 'Alas jajargenjang ini a tambah b, dan tingginya t. Luasnya a tambah b, dikali t. Satu trapesium luasnya setengahnya.',
          add: [T('ab', 'a + b', 184, 258, { size: 18, c: 'pos' }), T('r', 'luas trapesium = ½ × (a + b) × t', 200, 285, { size: 18, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Belah ketupat',
      steps: [
        {
          say: 'Belah ketupat punya dua diagonal yang saling tegak lurus. Gambar persegi panjang di sekelilingnya.',
          clear: true,
          add: [box('rect', 200, 150, 220, 150, { fill: 'mut-soft', dash: '6 5', r: 0 }), P('rh', [[90, 150], [200, 75], [310, 150], [200, 225]], { fill: 'pos-soft' }), ln('d1', 90, 150, 310, 150, { dash: '5 4', sw: 2 }), ln('d2', 200, 75, 200, 225, { dash: '5 4', sw: 2 })],
        },
        {
          say: 'Empat segitiga di luar belah ketupat sama persis dengan empat segitiga di dalamnya. Jadi luas belah ketupat setengah luas persegi panjang: setengah kali diagonal 1 kali diagonal 2.',
          add: [T('d1l', 'd₁', 255, 140, { size: 17 }), T('d2l', 'd₂', 212, 112, { size: 17 }), T('r', 'luas = ½ × d₁ × d₂', 200, 262, { size: 22, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Layang-layang',
      steps: [
        {
          say: 'Layang-layang juga punya dua diagonal yang tegak lurus. Rumusnya sama: setengah kali diagonal 1 kali diagonal 2.',
          clear: true,
          add: [box('rect', 200, 150, 160, 180, { fill: 'mut-soft', dash: '6 5', r: 0 }), P('kt', [[200, 60], [280, 115], [200, 240], [120, 115]], { fill: 'acc-soft' }), ln('d1', 200, 60, 200, 240, { dash: '5 4', sw: 2 }), ln('d2', 120, 115, 280, 115, { dash: '5 4', sw: 2 }), T('r', 'luas = ½ × d₁ × d₂', 200, 272, { size: 22, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Layang-layang dengan diagonal 12 sentimeter dan 9 sentimeter. Berapa luasnya?',
          clear: true,
          add: [P('kt', [[200, 60], [280, 115], [200, 240], [120, 115]], { fill: 'acc-soft' }), ln('d1', 200, 60, 200, 240, { dash: '5 4', sw: 2 }), ln('d2', 120, 115, 280, 115, { dash: '5 4', sw: 2 }), T('a', '12 cm', 200, 258, { size: 16 }), T('b', '9 cm', 162, 130, { size: 16 })],
          ask: {
            options: [
              { t: '54 cm²', ok: true, why: '½ × 12 × 9 = 54.' },
              { t: '108 cm²', why: 'Itu luas persegi panjang di sekelilingnya. Layang-layang setengahnya.' },
              { t: '21 cm²', why: 'Diagonal dikalikan, bukan dijumlahkan.' },
            ],
          },
        },
        { say: 'Setengah kali 12 kali 9 sama dengan 54 sentimeter persegi.', add: [T('r', '½ × 12 × 9 = 54 cm²', 300, 200, { size: 20, c: 'pos' })] },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Trapesium dengan sisi sejajar 8 cm dan 14 cm serta tinggi 5 cm luasnya …',
      unit: 'cm²',
      ans: ['55'],
      wrong: { '110': 'Ini (8 + 14) × 5, belum dikali ½.', '560': 'Sisi sejajar dijumlahkan, bukan dikalikan.' },
      steps: ['Luas = ½ × (8 + 14) × 5.', '= ½ × 22 × 5 = 55 cm².'],
    },
    {
      type: 'num',
      q: 'Belah ketupat dengan diagonal 16 cm dan 10 cm luasnya …',
      unit: 'cm²',
      ans: ['80'],
      wrong: { '160': 'Itu luas persegi panjang di sekelilingnya. Kalikan ½.', '26': 'Diagonal dikalikan, bukan dijumlahkan.' },
      steps: ['Luas = ½ × 16 × 10 = 80 cm².'],
    },
    {
      q: 'Luas trapesium 84 cm². Sisi sejajarnya 9 cm dan 15 cm. Tinggi trapesium adalah …',
      options: [
        { t: '7 cm', ok: true },
        { t: '3,5 cm', why: 'Jangan lupa ½: 84 = ½ × 24 × t = 12t.' },
        { t: '14 cm', why: 'Cek: ½ × 24 × 14 = 168, bukan 84.' },
        { t: '60 cm', why: 'Tinggi dicari dengan membagi: 84 ÷ 12.' },
      ],
      steps: ['84 = ½ × (9 + 15) × t = 12t.', 't = 84 ÷ 12 = 7 cm.'],
    },
    {
      q: 'Luas layang-layang pada gambar adalah …',
      fig: [P('kt', [[200, 50], [260, 100], [200, 250], [140, 100]], { fill: 'acc-soft' }), ln('d1', 200, 50, 200, 250, { dash: '5 4', sw: 2, draw: false }), ln('d2', 140, 100, 260, 100, { dash: '5 4', sw: 2, draw: false }), T('a', '20 cm', 200, 266, { size: 15 }), T('b', '12 cm', 172, 116, { size: 15 })],
      viewBox: '110 40 180 240',
      figLabel: 'Layang-layang dengan diagonal 20 cm dan 12 cm',
      options: [
        { t: '120 cm²', ok: true },
        { t: '240 cm²', why: 'Itu luas persegi panjang di sekelilingnya. Kalikan ½.' },
        { t: '32 cm²', why: 'Diagonal dikalikan, bukan dijumlahkan.' },
        { t: '64 cm²', why: 'Ini 2 × (20 + 12), bukan luas.' },
      ],
      steps: ['Luas = ½ × 20 × 12 = 120 cm².'],
    },
    {
      q: 'Belah ketupat memiliki sisi 10 cm serta diagonal 12 cm dan 16 cm. Keliling dan luasnya berturut-turut adalah …',
      options: [
        { t: '40 cm dan 96 cm²', ok: true },
        { t: '40 cm dan 192 cm²', why: 'Luas belah ketupat = ½ × d₁ × d₂ = ½ × 12 × 16 = 96.' },
        { t: '56 cm dan 96 cm²', why: 'Keliling dihitung dari sisi (4 × 10), bukan dari diagonal.' },
        { t: '100 cm dan 96 cm²', why: 'Keliling = 4 × sisi = 40 cm. 100 adalah sisi × sisi.' },
      ],
      steps: ['Keliling = 4 × 10 = 40 cm.', 'Luas = ½ × 12 × 16 = 96 cm².'],
    },
  ],
};

export default {
  id: 'b7',
  no: 7,
  title: 'Segitiga dan Segi Empat',
  desc: 'Jumlah sudut segitiga, keliling dan luas persegi panjang, jajargenjang, segitiga, trapesium, belah ketupat, dan layang-layang.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: 'Sebuah persegi panjang berukuran 16 cm × 4 cm. Sebuah persegi luasnya sama dengan persegi panjang itu. Panjang sisi persegi adalah …',
      options: [
        { t: '8 cm', ok: true },
        { t: '10 cm', why: 'Ini (16 + 4) ÷ 2. Yang sama adalah luasnya (64 cm²), jadi sisi × sisi = 64.' },
        { t: '16 cm', why: 'Persegi bersisi 16 cm luasnya 256 cm², bukan 64 cm².' },
        { t: '32 cm', why: '32 adalah setengah dari 64. Sisi persegi s memenuhi s × s = 64.' },
      ],
      steps: ['Luas persegi panjang: 16 × 4 = 64 cm².', 'Sisi persegi: s × s = 64, jadi s = 8 cm.'],
    },
    {
      q: 'Segitiga siku-siku memiliki sisi siku-siku 6 cm dan 8 cm. Luasnya adalah …',
      options: [
        { t: '24 cm²', ok: true },
        { t: '48 cm²', why: 'Jangan lupa ½: ½ × 6 × 8.' },
        { t: '14 cm²', why: 'Luas dihitung dengan perkalian.' },
        { t: '40 cm²', why: 'Pada segitiga siku-siku, kedua sisi siku-siku adalah alas dan tinggi: ½ × 6 × 8.' },
      ],
      steps: ['Sisi siku-siku saling tegak lurus, jadi bisa dipakai sebagai alas dan tinggi.', 'Luas = ½ × 6 × 8 = 24 cm².'],
    },
    {
      type: 'num',
      q: 'Taman berbentuk persegi panjang 20 m × 15 m. Di tengahnya ada kolam persegi bersisi 5 m. Luas taman di luar kolam adalah …',
      unit: 'm²',
      ans: ['275'],
      wrong: { '325': 'Luas kolam dikurangkan, bukan ditambahkan.', '280': 'Luas kolam 5 × 5 = 25, bukan 20.' },
      steps: ['Luas taman: 20 × 15 = 300 m².', 'Luas kolam: 5 × 5 = 25 m².', '300 − 25 = 275 m².'],
    },
  ],
};
