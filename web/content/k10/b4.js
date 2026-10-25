// Kelas 10 · Bab 4: Trigonometri
import { T, ln, table } from '../helpers.js';
import { tag } from './kit.js';

const arc = (id, x, y, a1, a2, o = {}) => ({ id, t: 'arc', x, y, r: 34, a1, a2, ...o });
const poly = (id, pts, o = {}) => ({ id, t: 'poly', x: 0, y: 0, pts, fill: 'pos-soft', stroke: 'ink', sw: 2.5, ...o });

// ---------- 4.1 Perbandingan trigonometri ----------
// Segitiga siku-siku: A di kiri bawah (sudut θ), C siku-siku, B di atas C. Skala s mengecilkan dari A.
const AX = 50;
const AY = 240;
const tri = (s = 1) => ({ id: 'tri', t: 'poly', x: AX, y: AY, pts: [[0, 0], [200, 0], [200, -150]], fill: 'pos-soft', stroke: 'ink', sw: 2.5, s });
const rc = (s = 1) => ({ id: 'rc', t: 'arc', x: AX + 200 * s, y: AY, r: 22, a1: 90, a2: 180, right: true, c: 'ink' });
const angA = () => arc('ang', AX, AY, 0, 36.87, { label: 'θ', lsize: 18 });
const sideLabs = (s, [sa, de, mi]) => [
  T('lsa', sa, AX + 100 * s, AY + 18, { size: 15, c: 'acc' }),
  T('lde', de, AX + 200 * s + 10, AY - 75 * s, { size: 15, c: 'neg', a: 'start' }),
  T('lmi', mi, AX + 100 * s - 14, AY - 75 * s - 18, { size: 15, c: 'pos' }),
];
const labPos = (s) => ({
  lsa: { x: AX + 100 * s, y: AY + 18 },
  lde: { x: AX + 200 * s + 10, y: AY - 75 * s },
  lmi: { x: AX + 100 * s - 14, y: AY - 75 * s - 18 },
});

const l1 = {
  id: 'k10b4-1',
  title: 'Perbandingan Trigonometri',
  hook: 'Pada segitiga siku-siku, perbandingan sisi-sisinya hanya bergantung pada besar sudut, tidak pada besar segitiganya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua tangga bersandar dengan kemiringan yang sama. Satu pendek, satu panjang. Bagaimana perbandingan tinggi ujung tangga dengan panjang tangganya?',
          add: [ln('g', 30, 250, 370, 250, { sw: 3, draw: false }), ln('w', 330, 250, 330, 40, { sw: 4, draw: false, c: 'mut' }), ln('t1', 250, 250, 330, 190, { sw: 6, c: 'acc' }), ln('t2', 130, 250, 330, 100, { sw: 6, c: 'pos' })],
          ask: {
            options: [
              { t: 'sama untuk kedua tangga', ok: true, why: 'Kemiringan sama berarti segitiganya sebangun, jadi perbandingan sisinya sama.' },
              { t: 'tangga panjang lebih besar', why: 'Tinggi dan panjangnya sama-sama membesar dengan faktor yang sama.' },
              { t: 'tangga pendek lebih besar', why: 'Segitiga sebangun punya perbandingan sisi yang sama.' },
              { t: 'tidak bisa dibandingkan', why: 'Bisa. Kemiringan yang sama menghasilkan perbandingan yang sama.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Nama ketiga sisi',
      steps: [
        {
          say: 'Ini segitiga siku-siku. Kita perhatikan sudut di kiri bawah, namanya theta.',
          clear: true,
          add: [tri(), rc(), angA()],
        },
        {
          say: 'Sisi di seberang sudut theta disebut sisi depan.',
          add: [sideLabs(1, ['', 'depan', ''])[1]],
          pulse: ['lde'],
        },
        {
          say: 'Sisi yang menempel pada sudut theta, selain sisi miring, disebut sisi samping.',
          add: [sideLabs(1, ['samping', '', ''])[0]],
          pulse: ['lsa'],
        },
        {
          say: 'Sisi terpanjang, di seberang sudut siku-siku, disebut sisi miring.',
          add: [sideLabs(1, ['', '', 'miring'])[2]],
          pulse: ['lmi'],
        },
      ],
    },
    {
      title: 'Besar berubah, perbandingan tetap',
      steps: [
        {
          say: 'Misalkan sisi depan 3, samping 4, dan miring 5. Depan dibagi miring sama dengan 3 dibagi 5, yaitu 0,6.',
          set: { lsa: { text: '4' }, lde: { text: '3' }, lmi: { text: '5' } },
          add: [T('r1', 'depan ÷ miring', 330, 40, { size: 14, c: 'mut' }), T('r2', '3 ÷ 5 = 0,6', 330, 66, { size: 18 })],
        },
        {
          say: 'Sekarang kecilkan segitiganya menjadi separuh, sudutnya tetap. Sisinya menjadi 1,5, 2, dan 2,5.',
          set: { tri: { s: 0.5 }, rc: { x: AX + 100 }, ...labPos(0.5), lsa: { ...labPos(0.5).lsa, text: '2' }, lde: { ...labPos(0.5).lde, text: '1,5' }, lmi: { ...labPos(0.5).lmi, text: '2,5' } },
        },
        {
          say: 'Depan dibagi miring: 1,5 dibagi 2,5. Hasilnya tetap 0,6. Selama sudutnya sama, perbandingannya sama.',
          add: [T('r3', '1,5 ÷ 2,5 = 0,6', 330, 96, { size: 18, c: 'ok' })],
          pulse: ['r3'],
        },
      ],
    },
    {
      title: 'Sinus, kosinus, tangen',
      steps: [
        {
          say: 'Karena perbandingannya hanya bergantung pada sudut, perbandingan itu diberi nama. Sinus theta sama dengan depan dibagi miring.',
          clear: true,
          add: [tri(0.8), rc(0.8), angA(), ...sideLabs(0.8, ['4', '3', '5']), T('s', 'sin θ = depan ÷ miring = 3/5', 200, 28, { size: 17, c: 'neg' })],
        },
        {
          say: 'Kosinus theta sama dengan samping dibagi miring, yaitu 4 per 5.',
          add: [T('c', 'cos θ = samping ÷ miring = 4/5', 200, 56, { size: 17, c: 'acc' })],
        },
        {
          say: 'Tangen theta sama dengan depan dibagi samping, yaitu 3 per 4.',
          add: [T('t', 'tan θ = depan ÷ samping = 3/4', 200, 84, { size: 17, c: 'pos' })],
        },
        {
          say: 'Cara mengingatnya: sin de-mi, cos sa-mi, tan de-sa. Depan miring, samping miring, depan samping.',
          add: [tag('m', 'sin de-mi · cos sa-mi · tan de-sa', 200, 284, 'ink', 14)],
          pulse: ['m'],
        },
      ],
    },
    {
      title: 'Tergantung sudut mana',
      steps: [
        {
          say: 'Hati-hati: depan dan samping bergantung pada sudut yang dilihat. Kalau kita melihat sudut di atas, sisi depannya adalah sisi bawah yang panjangnya 4.',
          clear: true,
          add: [tri(0.8), rc(0.8), arc('angB', AX + 160, AY - 120, 216.87, 270, { label: 'β', lsize: 18, r: 30 }), ...sideLabs(0.8, ['4', '3', '5'])],
          hl: ['lsa'],
        },
        {
          say: 'Jadi sinus beta sama dengan 4 per 5, sedangkan sinus theta tadi 3 per 5.',
          add: [T('a', 'sin β = 4/5', 300, 60, { size: 20 }), T('b', 'cos β = 3/5', 300, 92, { size: 20 }), T('c', 'tan β = 4/3', 300, 124, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga siku-siku punya sisi 5, 12, dan miring 13. Sisi 5 ada di depan sudut theta. Berapa sinus theta?',
          clear: true,
          add: [poly('q', [[60, 230], [300, 230], [300, 130]]), arc('qa', 60, 230, 0, 22.62, { label: 'θ', lsize: 16, r: 44, lpad: 14 }), T('q5', '5', 314, 180, { size: 16 }), T('q12', '12', 180, 248, { size: 16 }), T('q13', '13', 170, 160, { size: 16 }), T('qq', 'sin θ = ?', 200, 60, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '5/13', ok: true, why: 'Depan 5, miring 13.' },
              { t: '12/13', why: 'Itu cos θ (samping ÷ miring).' },
              { t: '5/12', why: 'Itu tan θ (depan ÷ samping).' },
              { t: '13/5', why: 'Terbalik. Sinus = depan ÷ miring.' },
            ],
          },
        },
        {
          say: 'Sisi depan theta adalah 5, sisi miringnya 13. Sinus theta sama dengan 5 per 13.',
          set: { qq: { text: 'sin θ = depan ÷ miring = {g:5/13}', size: 22 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Segitiga siku-siku memiliki sisi depan sudut A = 8, sisi samping = 6, dan sisi miring = 10. Nilai cos A adalah … (boleh pecahan atau desimal)',
      ans: ['3/5'],
      wrong: { '0,8': 'Itu sin A (8 ÷ 10). cos A = samping ÷ miring.', '4/3': 'Itu tan A.' },
      steps: ['cos A = samping ÷ miring.', '= 6 ÷ 10 = 3/5 = 0,6.'],
    },
    {
      q: 'Segitiga siku-siku memiliki sisi 7, 24, dan miring 25. Sisi 7 ada di depan sudut θ. Nilai tan θ adalah …',
      options: [
        { t: '7/24', ok: true },
        { t: '24/7', why: 'Terbalik. tan = depan ÷ samping.' },
        { t: '7/25', why: 'Itu sin θ.' },
        { t: '24/25', why: 'Itu cos θ.' },
      ],
      steps: ['tan θ = depan ÷ samping.', '= 7/24.'],
    },
    {
      q: 'Jika sin A = 3/5 (A sudut lancip), maka cos A = …',
      options: [
        { t: '4/5', ok: true },
        { t: '3/4', why: 'Itu tan A.' },
        { t: '5/3', why: 'Nilai cos sudut lancip selalu kurang dari 1.' },
        { t: '2/5', why: 'Sisi samping dicari dengan Pythagoras: √(25 − 9) = 4.' },
      ],
      steps: ['Depan 3, miring 5 → samping = √(25 − 9) = 4.', 'cos A = 4/5.'],
    },
    {
      type: 'num',
      q: 'Pada segitiga siku-siku, sisi miringnya 26 cm dan sin θ = 5/13. Panjang sisi depan sudut θ adalah … cm',
      ans: ['10'],
      wrong: { '5': 'Miringnya 26, bukan 13. Depan = 26 × 5/13.', '24': '24 adalah sisi samping.' },
      steps: ['sin θ = depan ÷ miring → depan = 26 × 5/13.', '= 10 cm.'],
    },
    {
      q: 'Perbandingan sisi depan dengan sisi samping disebut …',
      options: [
        { t: 'tangen', ok: true },
        { t: 'sinus', why: 'Sinus = depan ÷ miring.' },
        { t: 'kosinus', why: 'Kosinus = samping ÷ miring.' },
        { t: 'gradien', why: 'Gradien memang mirip, tetapi nama perbandingan trigonometrinya tangen.' },
      ],
      steps: ['tan de-sa: depan ÷ samping.'],
    },
  ],
};

// ---------- 4.2 Sudut istimewa ----------
const H3 = 138.6; // tinggi segitiga sama sisi bersisi 160
const l2 = {
  id: 'k10b4-2',
  title: 'Sudut Istimewa',
  hook: 'Nilai sin, cos, dan tan untuk 30°, 45°, dan 60° bisa dicari dari segitiga sama sisi dan persegi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tanpa kalkulator, berapa sinus 30 derajat?',
          add: [T('q', 'sin 30° = ?', 200, 140, { size: 46 })],
          ask: {
            options: [
              { t: '½', ok: true, why: 'Sisi depan sudut 30° adalah setengah sisi miring, seperti yang akan kita lihat.' },
              { t: '⅓', why: '30° adalah ⅓ dari 90°, tetapi sinus tidak sebanding dengan besar sudut.' },
              { t: '30', why: 'Sinus adalah perbandingan sisi, nilainya tidak lebih dari 1.' },
              { t: '1', why: 'sin 90° = 1. sin 30° lebih kecil.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Segitiga sama sisi dibelah',
      steps: [
        {
          say: 'Gambar segitiga sama sisi dengan panjang sisi 2. Semua sudutnya 60 derajat.',
          clear: true,
          add: [poly('eq', [[70, 250], [230, 250], [150, 250 - H3]]), T('s1', '2', 98, 175, { size: 16 }), T('s2', '2', 202, 175, { size: 16 }), T('s3', '2', 150, 266, { size: 16 })],
        },
        {
          say: 'Belah dua dari puncak tegak lurus ke bawah. Kita dapat segitiga siku-siku dengan sudut 30 dan 60 derajat.',
          add: [ln('alt', 150, 250 - H3, 150, 250, { sw: 2, dash: '6 4' }), poly('half', [[150, 250], [230, 250], [150, 250 - H3]], { fill: 'acc-soft', z: 1 })],
          set: { s1: { o: 0.25 }, s3: { o: 0 } },
        },
        {
          say: 'Sisi bawahnya tinggal 1, sisi miringnya tetap 2. Tingginya dari Pythagoras: akar dari 4 dikurangi 1, yaitu akar 3.',
          add: [T('h1', '1', 190, 266, { size: 16 }), T('h3', '√3', 134, 190, { size: 16 }), arc('a60', 230, 250, 120, 180, { label: '60°', lsize: 13, r: 26, lpad: 18 }), arc('a30', 150, 250 - H3, 270, 300, { label: '30°', lsize: 13, r: 30, lpad: 16 })],
        },
        {
          say: 'Sudut 30 derajat ada di puncak. Sisi depannya 1, miringnya 2. Jadi sinus 30 sama dengan setengah. Kosinus 30 sama dengan akar 3 per 2.',
          add: [T('v1', 'sin 30° = ½', 320, 60, { size: 17 }), T('v2', 'cos 30° = ½√3', 320, 88, { size: 17 }), T('v3', 'tan 30° = ⅓√3', 320, 116, { size: 17 })],
        },
        {
          say: 'Sudut 60 derajat di kanan bawah. Sisi depannya akar 3. Jadi sinus 60 sama dengan akar 3 per 2, kosinus 60 sama dengan setengah, tangen 60 sama dengan akar 3.',
          add: [T('w1', 'sin 60° = ½√3', 320, 160, { size: 17, c: 'pos' }), T('w2', 'cos 60° = ½', 320, 188, { size: 17, c: 'pos' }), T('w3', 'tan 60° = √3', 320, 216, { size: 17, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Persegi dibelah diagonal',
      steps: [
        {
          say: 'Untuk 45 derajat, ambil persegi bersisi 1 dan tarik diagonalnya.',
          clear: true,
          add: [poly('sq', [[60, 250], [200, 250], [200, 110], [60, 110]], { fill: 'paper' }), ln('dg', 60, 250, 200, 110, { sw: 2.5 })],
        },
        {
          say: 'Separuh persegi adalah segitiga siku-siku sama kaki. Sudutnya 45 derajat. Diagonalnya akar dari 1 tambah 1, yaitu akar 2.',
          add: [poly('h', [[60, 250], [200, 250], [200, 110]], { fill: 'acc-soft', z: 1 }), arc('a45', 60, 250, 0, 45, { label: '45°', lsize: 13, r: 32, lpad: 18 }), T('b1', '1', 130, 266, { size: 16 }), T('b2', '1', 214, 180, { size: 16 }), T('b3', '√2', 116, 166, { size: 16 })],
        },
        {
          say: 'Sinus 45 sama dengan 1 per akar 2, yaitu setengah akar 2. Kosinus 45 juga setengah akar 2. Tangen 45 sama dengan 1 per 1, yaitu 1.',
          add: [T('v1', 'sin 45° = ½√2', 315, 110, { size: 17 }), T('v2', 'cos 45° = ½√2', 315, 140, { size: 17 }), T('v3', 'tan 45° = 1', 315, 170, { size: 17 })],
        },
      ],
    },
    {
      title: 'Tabel dan polanya',
      steps: [
        {
          say: 'Kumpulkan dalam satu tabel.',
          clear: true,
          add: [table('tb', 200, 130, [['', '30°', '45°', '60°'], ['sin', '½', '½√2', '½√3'], ['cos', '½√3', '½√2', '½'], ['tan', '⅓√3', '1', '√3']], { cw: [70, 80, 80, 80], rh: 40, size: 18, head: true })],
        },
        {
          say: 'Pola mudahnya: sinus 30, 45, 60 adalah setengah akar 1, setengah akar 2, setengah akar 3. Kosinus adalah kebalikan urutannya.',
          add: [T('p', 'sin: ½√1, ½√2, ½√3 → cos: urutan terbalik', 200, 255, { size: 15, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sinus 30 derajat ditambah kosinus 60 derajat sama dengan …',
          clear: true,
          add: [T('q', 'sin 30° + cos 60° = ?', 200, 120, { size: 32 })],
          ask: {
            options: [
              { t: '1', ok: true, why: '½ + ½ = 1.' },
              { t: '½', why: 'Keduanya bernilai ½. Jumlahnya 1.' },
              { t: '√3', why: 'sin 30° = ½ dan cos 60° = ½.' },
              { t: '90', why: 'Yang dijumlahkan nilai sinus dan kosinusnya, bukan sudutnya.' },
            ],
          },
        },
        {
          say: 'Sinus 30 sama dengan setengah, kosinus 60 juga setengah. Jumlahnya 1.',
          add: [T('a', '½ + ½ = {g:1}', 200, 200, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Nilai cos 60° adalah …',
      options: [
        { t: '½', ok: true },
        { t: '½√3', why: 'Itu cos 30° atau sin 60°.' },
        { t: '½√2', why: 'Itu cos 45°.' },
        { t: '√3', why: 'Itu tan 60°.' },
      ],
      steps: ['Pada segitiga 30-60-90, sudut 60° bersebelahan dengan sisi 1 dan miring 2.', 'cos 60° = ½.'],
    },
    {
      type: 'num',
      q: 'Nilai sin 45° × cos 45° adalah … (boleh pecahan atau desimal)',
      ans: ['1/2'],
      wrong: { '1': '½√2 × ½√2 = ¼ × 2 = ½.' },
      steps: ['½√2 × ½√2 = ¼ × 2.', '= ½.'],
    },
    {
      type: 'num',
      q: 'Nilai 2 sin 30° + tan 45° adalah …',
      ans: ['2'],
      wrong: { '1,5': '2 × ½ = 1, ditambah tan 45° = 1. Hasilnya 2.', '3': 'sin 30° = ½, jadi 2 sin 30° = 1.' },
      steps: ['2 × ½ + 1.', '= 2.'],
    },
    {
      q: 'Nilai tan 30° adalah …',
      options: [
        { t: '⅓√3', ok: true },
        { t: '√3', why: 'Itu tan 60°.' },
        { t: '½', why: 'Itu sin 30°.' },
        { t: '1', why: 'Itu tan 45°.' },
      ],
      steps: ['tan 30° = depan ÷ samping = 1 ÷ √3.', '= ⅓√3.'],
    },
    {
      type: 'num',
      q: 'Nilai (sin 60°)² + (cos 60°)² adalah …',
      ans: ['1'],
      wrong: { '0,5': '(½√3)² = ¾ dan (½)² = ¼. Jumlahnya 1.' },
      steps: ['(½√3)² + (½)² = ¾ + ¼.', '= 1.'],
    },
  ],
};

// ---------- 4.3 Penerapan ----------
const ground = () => ln('gr', 20, 250, 380, 250, { sw: 3, draw: false });
const l3 = {
  id: 'k10b4-3',
  title: 'Penerapan Trigonometri',
  hook: 'Tinggi pohon, gedung, dan layang-layang bisa diukur tanpa memanjatnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Benang layang-layang sepanjang 40 meter terentang lurus dan membentuk sudut 30 derajat dengan tanah. Berapa tinggi layang-layang?',
          add: [ground(), ln('str', 80, 250, 288, 130, { sw: 2.5, c: 'ink' }), { id: 'kite', t: 'poly', x: 288, y: 130, pts: [[0, -18], [12, 0], [0, 22], [-12, 0]], fill: 'neg', stroke: 'ink', sw: 2 }, arc('a', 80, 250, 0, 30, { label: '30°', lsize: 13, r: 44, lpad: 18 }), T('l', '40 m', 170, 172, { size: 16 })],
          ask: {
            options: [
              { t: '20 m', ok: true, why: 'tinggi = 40 × sin 30° = 40 × ½ = 20 m.' },
              { t: '40 m', why: 'Benangnya miring, jadi tinggi layang-layang lebih pendek dari benang.' },
              { t: '30 m', why: 'Tinggi dihitung dengan sinus: 40 × ½.' },
              { t: '80 m', why: 'Tinggi tidak mungkin lebih panjang dari benangnya.' },
            ],
          },
        },
        {
          say: 'Tinggi adalah sisi depan sudut 30 derajat, benang adalah sisi miring. Tinggi sama dengan 40 kali sinus 30, yaitu 20 meter.',
          add: [ln('ht', 288, 152, 288, 250, { sw: 2, dash: '6 4', c: 'acc' }), T('hl', '20 m', 318, 200, { size: 16, c: 'acc' }), T('f', 'depan = miring × sin θ', 200, 40, { size: 18 })],
        },
      ],
    },
    {
      title: 'Sudut elevasi',
      steps: [
        {
          say: 'Kita berdiri 12 meter dari pohon dan melihat puncaknya. Sudut antara tanah dan garis pandang disebut sudut elevasi. Di sini 45 derajat.',
          clear: true,
          add: [ground(), { id: 'trunk', t: 'rect', x: 280, y: 180, w: 14, h: 140, r: 2, fill: 'acc', stroke: 'ink', sw: 1.5 }, { id: 'leaf', t: 'circle', x: 280, y: 85, r: 38, fill: 'ok', stroke: 'ink', sw: 2 }, ln('sight', 80, 250, 280, 50, { sw: 2, dash: '6 4' }), arc('a', 80, 250, 0, 45, { label: '45°', lsize: 13, r: 40, lpad: 18 }), T('d', '12 m', 180, 266, { size: 16 })],
        },
        {
          say: 'Tinggi pohon adalah sisi depan, jarak adalah sisi samping. Jadi pakai tangen: tinggi sama dengan 12 kali tangen 45. Tangen 45 sama dengan 1, jadi tingginya 12 meter.',
          add: [T('f', 'tinggi = 12 × tan 45°', 200, 30, { size: 17 }), T('h', '= 12 m', 340, 150, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Gedung tinggi',
      steps: [
        {
          say: 'Dari jarak 30 meter, puncak gedung terlihat dengan sudut elevasi 60 derajat.',
          clear: true,
          add: [ground(), { id: 'bd', t: 'rect', x: 260, y: 146, w: 60, h: 208, r: 2, fill: 'mut-soft', stroke: 'ink', sw: 2 }, ln('sight', 110, 250, 230, 42, { sw: 2, dash: '6 4' }), arc('a', 110, 250, 0, 60, { label: '60°', lsize: 13, r: 36, lpad: 18 }), T('d', '30 m', 170, 266, { size: 16 })],
        },
        {
          say: 'Tinggi sama dengan 30 kali tangen 60, yaitu 30 akar 3. Kira-kira 52 meter.',
          add: [T('f', 'tinggi = 30 × tan 60° = 30√3', 200, 24, { size: 16 }), T('h', '≈ 52 m', 340, 146, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Sudut depresi',
      steps: [
        {
          say: 'Sekarang dari puncak menara setinggi 50 meter, kita melihat ke bawah ke sebuah perahu. Sudut antara garis mendatar dan garis pandang ke bawah disebut sudut depresi: 30 derajat.',
          clear: true,
          add: [ln('sea', 20, 250, 380, 250, { sw: 3, draw: false, c: 'pos' }), { id: 'tw', t: 'rect', x: 70, y: 190, w: 28, h: 120, r: 2, fill: 'mut-soft', stroke: 'ink', sw: 2 }, ln('hz', 70, 130, 330, 130, { sw: 2, dash: '5 4', c: 'mut' }), ln('sight', 70, 130, 278, 250, { sw: 2, dash: '6 4' }), { id: 'boat', t: 'poly', x: 290, y: 243, pts: [[-22, -8], [22, -8], [14, 6], [-14, 6]], fill: 'neg', stroke: 'ink', sw: 2 }, arc('a', 70, 130, 330, 360, { label: '30°', lsize: 13, r: 48, lpad: 16 }), T('t', '50 m', 30, 190, { size: 15 })],
        },
        {
          say: 'Sudut depresi sama besar dengan sudut elevasi dari perahu ke puncak menara, karena garis mendatar dan permukaan laut sejajar.',
          add: [arc('b', 278, 250, 150, 180, { label: '30°', lsize: 13, r: 44, lpad: 16 })],
        },
        {
          say: 'Jarak perahu sama dengan 50 dibagi tangen 30, yaitu 50 akar 3, kira-kira 86,6 meter.',
          add: [T('f', 'jarak = 50 ÷ tan 30° = 50√3 ≈ 86,6 m', 200, 280, { size: 15, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tangga sepanjang 6 meter bersandar ke dinding dan membentuk sudut 60 derajat dengan tanah. Seberapa tinggi ujung atas tangga?',
          clear: true,
          add: [ground(), ln('w', 300, 250, 300, 40, { sw: 5, draw: false, c: 'mut' }), ln('lad', 180, 250, 300, 42, { sw: 6, c: 'acc' }), arc('a', 180, 250, 0, 60, { label: '60°', lsize: 13, r: 34, lpad: 16 }), T('l', '6 m', 222, 140, { size: 16 }), T('q', 'tinggi = ?', 90, 80, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: '3√3 m', ok: true, why: '6 × sin 60° = 6 × ½√3 = 3√3 m (sekitar 5,2 m).' },
              { t: '3 m', why: 'Itu 6 × cos 60°, yaitu jarak kaki tangga ke dinding.' },
              { t: '6√3 m', why: 'Itu 6 × tan 60°. Tangga adalah sisi miring, jadi pakai sinus.' },
              { t: '6 m', why: 'Tangganya miring, jadi tingginya kurang dari 6 m.' },
            ],
          },
        },
        {
          say: 'Tinggi adalah sisi depan sudut 60 derajat, tangga adalah sisi miring. Tinggi sama dengan 6 kali sinus 60, yaitu 3 akar 3, sekitar 5,2 meter.',
          set: { q: { text: '6 × sin 60° = {g:3√3} ≈ 5,2 m', size: 17, x: 110 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Dari jarak 10 m, puncak sebuah tiang terlihat dengan sudut elevasi 45°. Tinggi tiang adalah … m',
      ans: ['10'],
      wrong: { '5': 'tan 45° = 1, jadi tinggi = 10 × 1.' },
      steps: ['tinggi = 10 × tan 45°.', '= 10 × 1 = 10 m.'],
    },
    {
      type: 'num',
      q: 'Tangga 4 m bersandar ke dinding dan membentuk sudut 60° dengan lantai. Jarak kaki tangga ke dinding adalah … m',
      ans: ['2'],
      wrong: { '3,46': 'Itu tinggi ujung tangga (4 sin 60°). Jarak ke dinding = 4 cos 60°.' },
      steps: ['Jarak ke dinding = sisi samping sudut 60°.', '4 × cos 60° = 4 × ½ = 2 m.'],
    },
    {
      type: 'num',
      q: 'Benang layang-layang 50 m membentuk sudut 30° dengan tanah. Tinggi layang-layang adalah … m',
      ans: ['25'],
      wrong: { '43,3': 'Itu 50 cos 30°. Tinggi adalah sisi depan, jadi pakai sinus.' },
      steps: ['tinggi = 50 × sin 30°.', '= 50 × ½ = 25 m.'],
    },
    {
      type: 'num',
      q: 'Dari puncak menara setinggi 30 m, sebuah mobil terlihat dengan sudut depresi 45°. Jarak mobil ke kaki menara adalah … m',
      ans: ['30'],
      wrong: { '15': 'tan 45° = 1, jadi jaraknya sama dengan tinggi menara.' },
      steps: ['Sudut elevasi dari mobil = 45°.', 'jarak = 30 ÷ tan 45° = 30 m.'],
    },
    {
      q: 'Bayangan sebuah tiang panjangnya 6 m saat sinar matahari membentuk sudut 60° dengan tanah. Tinggi tiang adalah …',
      options: [
        { t: '6√3 m', ok: true },
        { t: '3 m', why: 'Tinggi = 6 × tan 60°, bukan 6 × cos 60°.' },
        { t: '2√3 m', why: 'Itu 6 ÷ tan 60° = 6 × tan 30°.' },
        { t: '12 m', why: 'Itu sisi miring (6 ÷ cos 60°).' },
      ],
      steps: ['Bayangan = sisi samping, tinggi = sisi depan.', 'tinggi = 6 × tan 60° = 6√3 m.'],
    },
  ],
};

export default {
  id: 'k10b4',
  no: 4,
  title: 'Trigonometri',
  desc: 'Sinus, kosinus, dan tangen pada segitiga siku-siku, sudut istimewa, serta sudut elevasi dan depresi.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Jika sin θ = 8/17 (θ lancip), maka tan θ = …',
      options: [
        { t: '8/15', ok: true },
        { t: '15/8', why: 'Terbalik. tan = depan ÷ samping.' },
        { t: '15/17', why: 'Itu cos θ.' },
        { t: '8/9', why: 'Sisi samping = √(289 − 64) = 15.' },
      ],
      steps: ['Depan 8, miring 17 → samping = √(289 − 64) = 15.', 'tan θ = 8/15.'],
    },
    {
      type: 'num',
      q: 'Sebuah jalan landai panjangnya 10 m dan membentuk sudut 30° dengan tanah. Tinggi ujung atas jalan itu dari tanah adalah … m',
      ans: ['5'],
      wrong: { '8,66': 'Itu 10 cos 30°, jarak mendatarnya.' },
      steps: ['tinggi = 10 × sin 30°.', '= 5 m.'],
    },
    {
      type: 'num',
      q: 'Nilai cos 30° × tan 30° adalah … (boleh pecahan atau desimal)',
      ans: ['1/2'],
      wrong: { '1': '½√3 × ⅓√3 = 3/6 = ½.' },
      steps: ['½√3 × ⅓√3 = (1/6) × 3.', '= ½ (sama dengan sin 30°).'],
    },
  ],
};
