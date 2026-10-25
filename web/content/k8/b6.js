// Kelas 8 · Bab 6: Bangun Ruang Sisi Datar
import { T, box, dot, range } from '../helpers.js';
import { cuboid, cuboidCorners, unitCube, triPrism, pyramid, proj } from './solid.js';

const P = (b, e) => `${b}{^:${e}}`;

// ---------- 6.1 Kubus dan balok: unsur dan luas permukaan ----------
const O1 = [110, 225];
const S = 50;
// jaring-jaring kubus: deretan 4 persegi + 1 di atas + 1 di bawah
const NET = {
  kiri: [100, 150],
  depan: [150, 150],
  kanan: [200, 150],
  belakang: [250, 150],
  tutup: [150, 100],
  alas: [150, 200],
};
const netSq = (name, [x, y], o = {}) => box(`n_${name}`, x, y, S, S, { fill: 'pos-soft', r: 0, sw: 2, label: name, lsize: 11, ...o });

// jaring-jaring balok p = 6, l = 4, t = 3 (skala 15 px)
const K = 15;
const BN = [
  ['b1', 150, 60, 6, 4, 'pos-soft', 'p×l'],
  ['b2', 150, 112.5, 6, 3, 'acc-soft', 'p×t'],
  ['b3', 150, 165, 6, 4, 'pos-soft', 'p×l'],
  ['b4', 150, 217.5, 6, 3, 'acc-soft', 'p×t'],
  ['b5', 75, 112.5, 4, 3, 'ok-soft', 'l×t'],
  ['b6', 225, 112.5, 4, 3, 'ok-soft', 'l×t'],
];

const l1 = {
  id: 'k8b6-1',
  title: 'Kubus dan Balok: Unsur dan Luas Permukaan',
  hook: 'Buka kardus sampai rata: enam persegi panjang. Luas permukaan adalah jumlah luas keenamnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah kardus berbentuk kubus. Berapa banyak sisinya, yaitu bidang datar yang membungkusnya?',
          add: cuboid('c', O1, 130, 130, 110),
          ask: {
            options: [
              { t: '6', ok: true, why: 'Depan, belakang, kiri, kanan, atas, dan bawah.' },
              { t: '8', why: '8 adalah banyak titik sudut.' },
              { t: '12', why: '12 adalah banyak rusuk (garis tepi).' },
              { t: '4', why: 'Jangan lupa sisi atas dan bawah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sisi, rusuk, titik sudut',
      steps: [
        {
          say: 'Bidang datarnya disebut sisi. Kubus punya 6 sisi, termasuk yang tersembunyi di belakang dan bawah.',
          set: { cF: { fill: 'acc-soft' } },
          add: [T('s', '6 sisi', 350, 60, { size: 20, c: 'acc' })],
        },
        {
          say: 'Garis tempat dua sisi bertemu disebut rusuk. Ada 12 rusuk: 4 di depan, 4 di belakang, dan 4 yang menghubungkan.',
          set: { cF: { fill: 'pos-soft' }, cH: { stroke: 'neg', sw: 2.5 } },
          add: [T('r', '12 rusuk', 350, 100, { size: 20, c: 'neg' })],
        },
        {
          say: 'Titik pertemuan rusuk disebut titik sudut. Ada 8.',
          add: [...cuboidCorners(O1, 130, 130, 110).map(([x, y], i) => dot(`v${i}`, x, y, 'ok', { r: 6 })), T('v', '8 titik\nsudut', 350, 150, { size: 20, c: 'ok', lh: 1.2 })],
        },
      ],
    },
    {
      title: 'Jaring-jaring kubus',
      steps: [
        {
          say: 'Kalau kardusnya dibuka dan diratakan, hasilnya disebut jaring-jaring. Kita buka satu per satu.',
          clear: true,
          add: Object.keys(NET).map((nm) => netSq(nm, NET.depan, { o: nm === 'depan' ? 1 : 0 })),
        },
        ...['tutup', 'alas', 'kiri', 'kanan', 'belakang'].map((nm) => ({
          say: nm === 'tutup' ? 'Tutup dibuka ke atas.' : nm === 'alas' ? 'Alas ke bawah.' : nm === 'kiri' ? 'Sisi kiri.' : nm === 'kanan' ? 'Sisi kanan.' : 'Dan sisi belakang, menempel di sisi kanan.',
          set: { [`n_${nm}`]: { x: NET[nm][0], y: NET[nm][1], o: 1 } },
        })),
        {
          say: 'Enam persegi yang sama besar. Jadi luas permukaan kubus adalah 6 kali luas satu persegi: 6 kali s kali s.',
          add: [box('rb', 200, 268, 230, 40, { fill: 'acc-soft', r: 10, label: `L = 6 × s × s`, lsize: 19 })],
        },
      ],
    },
    {
      title: 'Luas permukaan balok',
      steps: [
        {
          say: 'Jaring-jaring balok juga enam persegi panjang, tapi berpasangan. Balok ini panjang 6, lebar 4, tinggi 3.',
          clear: true,
          add: BN.map(([id, x, y, a, b, f, lab]) => box(id, x, y, a * K, b * K, { fill: f, r: 0, sw: 2, label: lab, lsize: 12 })),
        },
        {
          say: 'Sepasang berukuran panjang kali lebar: 6 kali 4 sama dengan 24. Sepasang panjang kali tinggi: 18. Sepasang lebar kali tinggi: 12.',
          add: [T('a', '{p:p×l} = 24', 330, 60, { size: 17 }), T('b', '{a:p×t} = 18', 330, 95, { size: 17 }), T('c', '{g:l×t} = 12', 330, 130, { size: 17 })],
        },
        {
          say: 'Setiap ukuran ada dua, jadi luas permukaan sama dengan 2 kali, 24 tambah 18 tambah 12, yaitu 108.',
          add: [T('f', 'L = 2(pl + pt + lt)', 315, 180, { size: 16 }), T('g', '= 2(24 + 18 + 12) = {a:108}', 315, 210, { size: 15 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kubus dengan rusuk 4 sentimeter. Berapa luas permukaannya?',
          clear: true,
          add: [...cuboid('c', [130, 225], 120, 120, 100), T('s', '4 cm', 190, 245, { size: 18 }), T('q', 'L = ?', 355, 60, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '96 cm²', ok: true, why: '6 × 4 × 4 = 96.' },
              { t: '16 cm²', why: '16 adalah luas satu sisi saja. Ada 6 sisi.' },
              { t: '64 cm²', why: '64 = 4 × 4 × 4 adalah volume, bukan luas permukaan.' },
              { t: '24 cm²', why: '24 = 6 × 4. Luas satu sisi 4 × 4.' },
            ],
          },
        },
        {
          say: 'Luas satu sisi 4 kali 4, yaitu 16. Ada 6 sisi: 6 kali 16 sama dengan 96 sentimeter persegi.',
          clear: true,
          add: [T('a', 'L = 6 × 4 × 4', 200, 100, { size: 30 }), T('b', '= 6 × 16 = {a:96 cm²}', 200, 160, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Banyak rusuk pada balok adalah …',
      ans: ['12'],
      wrong: { '8': '8 adalah banyak titik sudut.', '6': '6 adalah banyak sisi.' },
      steps: ['4 rusuk di depan, 4 di belakang, 4 yang menghubungkan.', 'Total 12.'],
    },
    {
      type: 'num',
      q: 'Luas permukaan kubus dengan rusuk 5 cm adalah … cm²',
      ans: ['150'],
      wrong: { '125': '125 adalah volume (5 × 5 × 5).', '25': '25 adalah luas satu sisi.', '30': '6 × 5 = 30. Luas satu sisi 5 × 5.' },
      steps: ['Luas satu sisi: 5 × 5 = 25.', 'L = 6 × 25 = 150 cm².'],
    },
    {
      type: 'num',
      q: 'Luas permukaan balok berukuran 8 cm × 5 cm × 2 cm adalah … cm²',
      ans: ['132'],
      wrong: { '80': '80 adalah volume.', '66': 'Setiap ukuran sisi ada dua. Kalikan dengan 2.' },
      steps: ['pl = 40, pt = 16, lt = 10.', 'L = 2(40 + 16 + 10) = 2 × 66 = 132 cm².'],
    },
    {
      type: 'num',
      q: 'Luas permukaan sebuah kubus 216 cm². Panjang rusuknya adalah … cm',
      ans: ['6'],
      wrong: { '36': '36 adalah luas satu sisi. Rusuknya √36.', '72': '216 ÷ 6 = 36 adalah luas satu sisi, bukan rusuk.' },
      steps: ['Luas satu sisi: 216 ÷ 6 = 36.', 'Rusuk = √36 = 6 cm.'],
    },
    {
      q: 'Kotak kado tanpa tutup berbentuk kubus dengan rusuk 10 cm. Kertas kado yang dibutuhkan untuk melapisi bagian luarnya adalah …',
      options: [
        { t: '500 cm²', ok: true },
        { t: '600 cm²', why: 'Tanpa tutup, jadi hanya 5 sisi.' },
        { t: '1.000 cm²', why: '1.000 adalah volume.' },
        { t: '400 cm²', why: 'Alas juga dilapisi. Yang tidak ada hanya tutupnya: 5 sisi.' },
      ],
      steps: ['Tanpa tutup: 5 sisi.', '5 × 10 × 10 = 500 cm².'],
    },
  ],
};

// ---------- 6.2 Volume kubus dan balok ----------
const OV = [130, 230];
const UV = 30;
const layer = (j, nx, nz, fill) => range(0, nz).flatMap((k) => range(0, nx).map((i) => unitCube(`u${i}_${j}_${k}`, OV, i, j, nz - 1 - k, UV, fill)));

const l2 = {
  id: 'k8b6-2',
  title: 'Volume Kubus dan Balok',
  hook: 'Volume adalah banyaknya kubus satuan yang bisa mengisi bangun itu. Hitung satu lapis, lalu kalikan banyak lapisnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kotak ini panjangnya 3, lebarnya 2, dan tingginya 2 kubus kecil. Berapa kubus kecil yang bisa mengisinya?',
          add: [...cuboid('c', OV, 3 * UV, 2 * UV, 2 * UV, { front: 'none', top: 'none', side: 'none' }), T('q', 'berapa kubus kecil?', 300, 60, { size: 18, c: 'mut' })],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Satu lapis 3 × 2 = 6, ada 2 lapis.' },
              { t: '7', why: '3 + 2 + 2 = 7. Ukurannya dikalikan, bukan dijumlahkan.' },
              { t: '6', why: '6 baru satu lapis. Ada 2 lapis.' },
              { t: '16', why: 'Hitung per lapis: 3 × 2 = 6, lalu × 2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mengisi lapis demi lapis',
      steps: [
        {
          say: 'Lapisan bawah: 3 kubus ke kanan, 2 kubus ke belakang. 3 kali 2 sama dengan 6 kubus.',
          del: ['q'],
          add: [...layer(0, 3, 2, 'pos-soft'), T('l1', 'lapis 1: 3 × 2 = 6', 300, 60, { size: 17, c: 'pos' })],
        },
        {
          say: 'Lapisan kedua sama: 6 kubus lagi.',
          add: [...layer(1, 3, 2, 'acc-soft'), T('l2', 'lapis 2: 6', 300, 90, { size: 17, c: 'acc' })],
        },
        {
          say: 'Totalnya 6 kali 2, yaitu 12 kubus satuan. Jadi volumenya 12 satuan kubik.',
          add: [T('t', '6 × 2 = {a:12}', 300, 130, { size: 22 })],
        },
        {
          say: 'Rumusnya: volume balok sama dengan panjang kali lebar kali tinggi.',
          add: [box('rb', 322, 195, 140, 64, { fill: 'acc-soft', r: 10, label: 'V = p × l × t\n3 × 2 × 2 = 12', lsize: 15 })],
        },
      ],
    },
    {
      title: 'Volume kubus',
      steps: [
        {
          say: 'Kubus panjang, lebar, dan tingginya sama, yaitu s. Jadi volume kubus sama dengan s kali s kali s, atau s pangkat 3.',
          clear: true,
          add: [...range(0, 3).flatMap((j) => range(0, 3).flatMap((k) => range(0, 3).map((i) => unitCube(`k${i}_${j}_${k}`, [110, 240], i, j, 2 - k, 30, 'ok-soft')))), box('rb', 328, 90, 124, 64, { fill: 'acc-soft', r: 10, label: `V = s × s × s\n= s{^:3}`, lsize: 16 })],
        },
        {
          say: 'Kubus dengan rusuk 3 berisi 3 kali 3 kali 3, yaitu 27 kubus satuan.',
          add: [T('e', `${P(3, 3)} = 27`, 328, 180, { size: 24 })],
        },
      ],
    },
    {
      title: 'Liter',
      steps: [
        {
          say: 'Untuk air, volume sering ditulis dalam liter. 1 liter sama dengan 1 desimeter kubik, yaitu kubus dengan rusuk 10 sentimeter. Isinya 1000 sentimeter kubik.',
          clear: true,
          add: [...cuboid('L', [40, 215], 90, 90, 70, { front: 'pos-soft', top: 'pos-soft', side: 'pos-soft' }), T('lt', '10 cm', 85, 233, { size: 15 }), T('eq', '1 liter = 1 dm³ = 1.000 cm³', 285, 60, { size: 16 })],
        },
        {
          say: 'Akuarium berukuran 50 kali 30 kali 40 sentimeter. Volumenya 60 ribu sentimeter kubik. Dibagi 1000, jadi 60 liter.',
          add: [T('a', '50 × 30 × 40 = 60.000 cm³', 285, 140, { size: 16 }), T('b', '60.000 ÷ 1.000 = {a:60 liter}', 285, 175, { size: 17 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Balok berukuran 5 kali 4 kali 3 sentimeter. Berapa volumenya?',
          clear: true,
          add: [...cuboid('c', [120, 225], 150, 90, 100), T('p', '5', 195, 243, { size: 18 }), T('t', '3', 104, 180, { size: 18 }), T('l', '4', 300, 198, { size: 18 })],
          ask: {
            options: [
              { t: '60 cm³', ok: true, why: '5 × 4 × 3 = 60.' },
              { t: '12 cm³', why: '5 + 4 + 3 = 12. Volume = dikalikan.' },
              { t: '94 cm³', why: '94 adalah luas permukaannya.' },
              { t: '20 cm³', why: '20 baru alasnya (5 × 4). Kalikan juga dengan tinggi 3.' },
            ],
          },
        },
        {
          say: 'Satu lapis 5 kali 4 sama dengan 20. Ada 3 lapis: 60 sentimeter kubik.',
          clear: true,
          add: [T('a', 'V = 5 × 4 × 3', 200, 100, { size: 30 }), T('b', '= 20 × 3 = {a:60 cm³}', 200, 160, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Volume kubus dengan rusuk 6 cm adalah … cm³',
      ans: ['216'],
      wrong: { '36': '36 adalah luas satu sisi. Volume = 6 × 6 × 6.', '18': '6 × 3 = 18. Volume = 6³.' },
      steps: ['V = s³ = 6 × 6 × 6.', '= 216 cm³.'],
    },
    {
      type: 'num',
      q: 'Volume balok berukuran 12 cm × 5 cm × 4 cm adalah … cm³',
      ans: ['240'],
      wrong: { '21': 'Ukurannya dikalikan, bukan dijumlahkan.', '60': '60 baru alasnya. Kalikan dengan tinggi.' },
      steps: ['V = 12 × 5 × 4.', '= 240 cm³.'],
    },
    {
      type: 'num',
      q: 'Bak mandi berbentuk balok berukuran 80 cm × 50 cm × 60 cm. Volume air saat penuh adalah … liter',
      ans: ['240'],
      wrong: { '240000': 'Itu dalam cm³. Bagi 1.000 untuk mendapat liter.', '2400': '1 liter = 1.000 cm³, jadi bagi dengan 1.000, bukan 100.' },
      steps: ['V = 80 × 50 × 60 = 240.000 cm³.', '240.000 ÷ 1.000 = 240 liter.'],
    },
    {
      type: 'num',
      q: 'Volume sebuah kubus 125 cm³. Panjang rusuknya adalah … cm',
      ans: ['5'],
      wrong: { '25': '25 × 25 × 25 jauh lebih dari 125. Cari s dengan s³ = 125.', '41.67': 'Bukan dibagi 3. Cari bilangan yang dipangkat 3 hasilnya 125.' },
      steps: ['s³ = 125.', '5 × 5 × 5 = 125, jadi s = 5 cm.'],
    },
    {
      q: 'Rusuk sebuah kubus diperbesar 2 kali. Volumenya menjadi …',
      options: [
        { t: '8 kali semula', ok: true },
        { t: '2 kali semula', why: 'Panjang, lebar, dan tinggi masing-masing 2 kali: 2 × 2 × 2 = 8.' },
        { t: '4 kali semula', why: '4 kali untuk luas sisi. Volume punya tiga ukuran: 2 × 2 × 2.' },
        { t: '6 kali semula', why: '(2s)³ = 8s³.' },
      ],
      steps: ['V baru = (2s)³ = 8s³.', 'Jadi 8 kali volume semula.'],
    },
  ],
};

// ---------- 6.3 Prisma ----------
const OP = [50, 225];
const OPV = [40, 235];
const l3 = {
  id: 'k8b6-3',
  title: 'Prisma',
  hook: 'Prisma adalah tumpukan alas yang sama dari bawah sampai atas. Volumenya: luas alas kali tinggi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tenda ini berbentuk prisma segitiga. Berapa banyak sisinya?',
          add: triPrism('p', OP, 130, 100, 150),
          ask: {
            options: [
              { t: '5', ok: true, why: '2 segitiga (depan dan belakang) + 3 persegi panjang.' },
              { t: '6', why: 'Itu kubus atau balok. Prisma segitiga punya 2 segitiga + 3 persegi panjang.' },
              { t: '3', why: 'Jangan lupa sisi segitiga di depan dan belakang.' },
              { t: '9', why: '9 adalah banyak rusuknya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Alas dan tutup',
      steps: [
        {
          say: 'Prisma punya dua sisi yang sama dan sejajar: alas dan tutup. Di sini bentuknya segitiga, jadi namanya prisma segitiga.',
          pulse: ['pF'],
          add: [T('a', 'alas = segitiga', 322, 60, { size: 17, c: 'acc' })],
        },
        {
          say: 'Sisi-sisi lainnya berbentuk persegi panjang, disebut sisi tegak. Balok sebenarnya juga prisma, alasnya persegi panjang.',
          add: [T('b', 'sisi tegak:\npersegi panjang', 325, 110, { size: 15, lh: 1.4 }), T('c', 'balok = prisma\nsegi empat', 325, 175, { size: 15, c: 'mut', lh: 1.4 })],
        },
      ],
    },
    {
      title: 'Volume prisma',
      steps: [
        {
          say: 'Bayangkan selembar segitiga. Alasnya 6, tingginya 4. Luasnya setengah kali 6 kali 4, yaitu 12.',
          clear: true,
          add: [{ id: 's0', t: 'poly', x: 0, y: 0, pts: [proj(OPV, [0, 0, 0]), proj(OPV, [150, 0, 0]), proj(OPV, [75, 100, 0])], fill: 'acc', stroke: 'ink', sw: 2 }, T('la', 'luas alas = ½ × 6 × 4 = 12', 200, 28, { size: 16 })],
        },
        {
          say: 'Tumpuk lembar yang sama ke belakang, lapis demi lapis.',
          add: range(1, 6).map((k) => ({ id: `s${k}`, t: 'poly', x: 0, y: 0, pts: [proj(OPV, [0, 0, k * 28]), proj(OPV, [150, 0, k * 28]), proj(OPV, [75, 100, k * 28])], fill: 'acc-soft', stroke: 'ink', sw: 1.2, z: -k })),
        },
        {
          say: 'Kalau tumpukannya setinggi 10, volumenya luas alas kali tinggi: 12 kali 10 sama dengan 120.',
          add: [box('rb', 333, 150, 125, 54, { fill: 'acc-soft', r: 10, label: 'V = luas alas\n× tinggi', lsize: 14 }), T('e', '12 × 10 = {a:120}', 330, 210, { size: 20 })],
        },
      ],
    },
    {
      title: 'Luas permukaan prisma',
      steps: [
        {
          say: 'Jaring-jaring prisma segitiga: dua segitiga dan satu persegi panjang panjang. Segitiganya bersisi 3, 4, dan 5, tinggi prismanya 10.',
          clear: true,
          add: [
            box('r1', 65, 150, 3 * 15, 150, { fill: 'pos-soft', r: 0, label: '3', lsize: 13 }),
            box('r2', 117.5, 150, 4 * 15, 150, { fill: 'pos-soft', r: 0, label: '4', lsize: 13 }),
            box('r3', 185, 150, 5 * 15, 150, { fill: 'pos-soft', r: 0, label: '5', lsize: 13 }),
            { id: 't1', t: 'poly', x: 0, y: 0, pts: [[87.5, 75], [147.5, 75], [87.5, 30]], fill: 'acc-soft', stroke: 'ink', sw: 2 },
            { id: 't2', t: 'poly', x: 0, y: 0, pts: [[87.5, 225], [147.5, 225], [87.5, 270]], fill: 'acc-soft', stroke: 'ink', sw: 2 },
          ],
        },
        {
          say: 'Dua segitiga: masing-masing setengah kali 3 kali 4, yaitu 6. Jadi 12.',
          add: [T('a', 'alas + tutup:\n2 × 6 = 12', 312, 60, { size: 14, c: 'acc', lh: 1.4 })],
        },
        {
          say: 'Persegi panjang: lebarnya keliling segitiga, 3 tambah 4 tambah 5 sama dengan 12. Panjangnya 10. Luasnya 120.',
          add: [T('b', 'sisi tegak:\n12 × 10 = 120', 312, 115, { size: 14, c: 'pos', lh: 1.4 })],
        },
        {
          say: 'Luas permukaan prisma: 2 kali luas alas tambah keliling alas kali tinggi. 12 tambah 120 sama dengan 132.',
          add: [box('rb', 312, 185, 130, 60, { fill: 'acc-soft', r: 10, label: '2 × alas\n+ keliling × t', lsize: 13 }), T('e', 'L = {a:132}', 312, 245, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Prisma segitiga, alas segitiganya 10 dan tinggi segitiganya 6. Panjang prisma 8. Berapa volumenya?',
          clear: true,
          add: [...triPrism('p', [30, 230], 140, 90, 130), T('q', 'alas segitiga:\na = 10, t = 6', 320, 60, { size: 15, lh: 1.4 }), T('q2', 'tinggi prisma\n= 8', 320, 130, { size: 15, lh: 1.4 })],
          ask: {
            options: [
              { t: '240', ok: true, why: 'Luas alas ½ × 10 × 6 = 30, dikali 8 = 240.' },
              { t: '480', why: 'Luas segitiga pakai ½: ½ × 10 × 6 = 30.' },
              { t: '24', why: 'Kalikan: 30 × 8, bukan dijumlah.' },
              { t: '80', why: 'Luas alasnya ½ × 10 × 6 = 30, bukan 10.' },
            ],
          },
        },
        {
          say: 'Luas alas: setengah kali 10 kali 6 sama dengan 30. Volume: 30 kali 8 sama dengan 240.',
          clear: true,
          add: [T('a', 'luas alas = ½ × 10 × 6 = 30', 200, 90, { size: 24 }), T('b', 'V = 30 × 8 = {a:240}', 200, 150, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Banyak rusuk pada prisma segitiga adalah …',
      ans: ['9'],
      wrong: { '6': '6 adalah banyak titik sudut.', '5': '5 adalah banyak sisi.' },
      steps: ['3 rusuk di alas, 3 di tutup, 3 rusuk tegak.', 'Total 9.'],
    },
    {
      type: 'num',
      q: 'Prisma dengan alas segitiga siku-siku bersisi 6 cm dan 8 cm (sisi siku-siku), tinggi prisma 15 cm. Volumenya … cm³',
      ans: ['360'],
      wrong: { '720': 'Luas segitiga = ½ × 6 × 8 = 24, bukan 48.', '29': 'Volume = luas alas × tinggi.' },
      steps: ['Luas alas: ½ × 6 × 8 = 24.', 'V = 24 × 15 = 360 cm³.'],
    },
    {
      q: 'Rumus luas permukaan prisma adalah …',
      options: [
        { t: '2 × luas alas + keliling alas × tinggi', ok: true },
        { t: 'luas alas × tinggi', why: 'Itu rumus volume.' },
        { t: '2 × luas alas × tinggi', why: 'Sisi tegak dihitung dari keliling alas × tinggi.' },
        { t: '⅓ × luas alas × tinggi', why: 'Itu volume limas.' },
      ],
      steps: ['Alas + tutup = 2 × luas alas.', 'Sisi tegak = keliling alas × tinggi.'],
    },
    {
      type: 'num',
      q: 'Prisma alas segitiga sisi 5, 12, 13 cm (siku-siku), tinggi prisma 10 cm. Luas permukaannya … cm²',
      ans: ['360'],
      wrong: { '300': 'Tambahkan juga 2 × luas alas: 2 × 30 = 60.', '330': 'Ada dua segitiga (alas dan tutup).' },
      steps: ['Luas alas: ½ × 5 × 12 = 30. Dua alas: 60.', 'Keliling × t = 30 × 10 = 300.', 'L = 60 + 300 = 360 cm².'],
    },
    {
      type: 'num',
      q: 'Volume prisma 450 cm³ dan luas alasnya 30 cm². Tinggi prisma adalah … cm',
      ans: ['15'],
      wrong: { '13500': 'Volume dibagi luas alas, bukan dikalikan.', '45': 'Tinggi = 450 ÷ 30 = 15.' },
      steps: ['V = luas alas × t.', 't = 450 ÷ 30 = 15 cm.'],
    },
  ],
};

// ---------- 6.4 Limas ----------
const OB = [215, 235];
const BW = 120;
const BH = 165;
const BD = 100;
const water = (k) => cuboid(`w${k}`, [OB[0], OB[1] - (k * BH) / 3], BW, BH / 3, BD, { front: 'pos-soft', top: 'pos-soft', side: 'pos-soft', hidden: false, z: -5 + k });

const l4 = {
  id: 'k8b6-4',
  title: 'Limas',
  hook: 'Limas berujung lancip. Isinya hanya sepertiga prisma yang alas dan tingginya sama.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Limas dan balok ini alasnya sama dan tingginya sama. Limas diisi pasir lalu dituang ke balok. Berapa kali tuang sampai balok penuh?',
          add: [...pyramid('py', [40, 235], 120, BH, BD), ...cuboid('bx', OB, BW, BH, BD, { front: 'none', top: 'none', side: 'none' })],
          ask: {
            options: [
              { t: '3 kali', ok: true, why: 'Kita lihat tuangannya.' },
              { t: '2 kali', why: 'Limas lebih kecil dari setengah balok. Kita lihat tuangannya.' },
              { t: '4 kali', why: 'Hampir. Kita lihat tuangannya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tuang tiga kali',
      steps: [
        { say: 'Tuangan pertama: sepertiga balok terisi.', add: water(0) },
        { say: 'Tuangan kedua: dua pertiga.', add: water(1) },
        { say: 'Tuangan ketiga: penuh!', add: water(2), pulse: ['bxF'] },
        {
          say: 'Jadi volume limas adalah sepertiga volume prisma yang alas dan tingginya sama.',
          add: [box('rb', 200, 272, 300, 40, { fill: 'acc-soft', r: 10, label: 'V limas = ⅓ × luas alas × t', lsize: 16 })],
        },
      ],
    },
    {
      title: 'Menghitung volume',
      steps: [
        {
          say: 'Limas dengan alas persegi bersisi 6 dan tinggi 10. Luas alasnya 6 kali 6, yaitu 36.',
          clear: true,
          add: [...pyramid('py', [30, 245], 130, 170, 90), T('a', 'luas alas = 6 × 6 = 36', 300, 80, { size: 16 })],
        },
        {
          say: 'Volume: sepertiga kali 36 kali 10 sama dengan 120.',
          add: [T('b', 'V = ⅓ × 36 × 10', 300, 125, { size: 18 }), T('c', '= {a:120}', 300, 160, { size: 24 })],
        },
      ],
    },
    {
      title: 'Luas permukaan limas',
      steps: [
        {
          say: 'Luas permukaan limas: luas alas ditambah luas semua segitiga tegaknya. Limas ini alasnya persegi 6, tingginya 4.',
          clear: true,
          add: [...pyramid('py', [30, 245], 130, 150, 90), T('a', 'alas 6 × 6, tinggi 4', 300, 50, { size: 16 })],
        },
        {
          say: 'Tinggi segitiga tegak belum diketahui. Pakai Pythagoras: setengah alas 3, tinggi limas 4. Tinggi segitiganya akar dari 9 tambah 16, yaitu 5.',
          add: [T('b', 'tinggi Δ = √(3² + 4²) = 5', 300, 95, { size: 15, c: 'ok' })],
        },
        {
          say: 'Satu segitiga: setengah kali 6 kali 5 sama dengan 15. Ada 4 segitiga: 60. Ditambah alas 36, luas permukaannya 96.',
          add: [T('c', '4 × (½ × 6 × 5) = 60', 300, 140, { size: 15 }), T('d', 'L = 36 + 60 = {a:96}', 300, 185, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Limas alas persegi bersisi 9, tingginya 12. Berapa volumenya?',
          clear: true,
          add: [...pyramid('py', [30, 245], 130, 170, 90), T('q', 'alas 9 × 9, t = 12', 300, 80, { size: 17 })],
          ask: {
            options: [
              { t: '324', ok: true, why: '⅓ × 81 × 12 = 324.' },
              { t: '972', why: '972 = 81 × 12 adalah volume prisma. Limas hanya ⅓-nya.' },
              { t: '108', why: 'Luas alas 9 × 9 = 81, bukan 27.' },
              { t: '36', why: '⅓ × 9 × 12 = 36 memakai sisi, bukan luas alas.' },
            ],
          },
        },
        {
          say: 'Luas alas 81. Volume: sepertiga kali 81 kali 12. 81 dibagi 3 sama dengan 27, dikali 12 sama dengan 324.',
          clear: true,
          add: [T('a', 'V = ⅓ × 81 × 12', 200, 100, { size: 30 }), T('b', '= 27 × 12 = {a:324}', 200, 160, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Volume limas dengan alas persegi 10 cm dan tinggi 12 cm adalah … cm³',
      ans: ['400'],
      wrong: { '1200': 'Itu volume prisma. Limas = ⅓ × luas alas × t.', '40': 'Luas alas 10 × 10 = 100.' },
      steps: ['Luas alas = 100.', 'V = ⅓ × 100 × 12 = 400 cm³.'],
    },
    {
      q: 'Limas segi empat memiliki banyak sisi …',
      options: [
        { t: '5', ok: true },
        { t: '4', why: 'Jangan lupa alasnya.' },
        { t: '8', why: '8 adalah banyak rusuknya.' },
        { t: '6', why: '1 alas persegi + 4 segitiga = 5.' },
      ],
      steps: ['1 alas + 4 sisi tegak segitiga.', 'Total 5 sisi.'],
    },
    {
      type: 'num',
      q: 'Limas alas persegi bersisi 8 cm. Tinggi segitiga tegaknya 5 cm. Luas permukaan limas … cm²',
      ans: ['144'],
      wrong: { '80': 'Tambahkan luas alas 8 × 8 = 64.', '224': 'Luas segitiga = ½ × 8 × 5 = 20, bukan 40.' },
      steps: ['Alas: 8 × 8 = 64.', '4 segitiga: 4 × ½ × 8 × 5 = 80.', 'L = 64 + 80 = 144 cm².'],
    },
    {
      type: 'num',
      q: 'Volume limas 200 cm³ dan luas alasnya 50 cm². Tinggi limas … cm',
      ans: ['12'],
      wrong: { '4': '200 = ⅓ × 50 × t, jadi t = 600 ÷ 50.', '1.33': 'Kalikan 200 dengan 3 dulu: 600 ÷ 50.' },
      steps: ['200 = ⅓ × 50 × t.', '600 = 50 × t → t = 12 cm.'],
    },
    {
      q: 'Sebuah prisma dan limas memiliki alas dan tinggi yang sama. Volume prisma 270 cm³. Volume limas adalah …',
      options: [
        { t: '90 cm³', ok: true },
        { t: '810 cm³', why: 'Limas lebih kecil dari prisma: ⅓ × 270.' },
        { t: '135 cm³', why: 'Limas ⅓ prisma, bukan ½.' },
        { t: '270 cm³', why: 'Limas berujung lancip, isinya lebih sedikit.' },
      ],
      steps: ['V limas = ⅓ V prisma.', '⅓ × 270 = 90 cm³.'],
    },
  ],
};

export default {
  id: 'k8b6',
  no: 6,
  title: 'Bangun Ruang Sisi Datar',
  desc: 'Kubus, balok, prisma, dan limas: unsur, jaring-jaring, luas permukaan, dan volume.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      type: 'num',
      q: 'Sebuah kolam berbentuk balok 4 m × 3 m × 1 m diisi air sampai penuh. Volume airnya … liter (1 m³ = 1.000 liter)',
      ans: ['12000'],
      wrong: { '12': 'Itu dalam m³. Kalikan 1.000 untuk liter.', '8': 'Ukuran dikalikan: 4 × 3 × 1.' },
      steps: ['V = 4 × 3 × 1 = 12 m³.', '12 × 1.000 = 12.000 liter.'],
    },
    {
      q: 'Jumlah panjang semua rusuk sebuah kubus 60 cm. Volume kubus itu adalah …',
      options: [
        { t: '125 cm³', ok: true },
        { t: '216.000 cm³', why: '60 adalah jumlah 12 rusuk. Satu rusuk 60 ÷ 12 = 5.' },
        { t: '1.000 cm³', why: 'Kubus punya 12 rusuk, bukan 6. Rusuk = 5 cm.' },
        { t: '150 cm³', why: '150 adalah luas permukaannya.' },
      ],
      steps: ['Satu rusuk: 60 ÷ 12 = 5 cm.', 'V = 5³ = 125 cm³.'],
    },
    {
      type: 'num',
      q: 'Sebuah balok berukuran 6 cm × 4 cm × 3 cm. Berapa banyak kubus kecil berusuk 1 cm yang bisa dimasukkan?',
      ans: ['72'],
      wrong: { '13': 'Ukuran dikalikan, bukan dijumlah.', '108': '108 adalah luas permukaan.' },
      steps: ['Banyak kubus = volume = 6 × 4 × 3.', '= 72 kubus.'],
    },
  ],
};
