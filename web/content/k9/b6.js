// Kelas 9 · Bab 6: Bangun Ruang Sisi Lengkung
import { T, box, ln, range } from '../helpers.js';

const K = 0.32; // pipihnya elips alas (ry = K × r)
const r1 = (v) => Math.round(v * 10) / 10;

// Tabung: pusat alas (cx, cy), jari-jari r, tinggi h
function cylinder(id, cx, cy, r, h, { fill = 'pos-soft', top = 'pos', z = 0 } = {}) {
  const ry = r * K;
  return [
    { id: `${id}H`, t: 'path', x: cx, y: cy, d: `M${-r},0 A${r},${r1(ry)} 0 0 1 ${r},0`, stroke: 'mut', sw: 1.5, dash: '5 4', z: z - 1 },
    { id: `${id}B`, t: 'path', x: cx, y: cy, d: `M${-r},${-h} L${-r},0 A${r},${r1(ry)} 0 0 0 ${r},0 L${r},${-h} Z`, fill, stroke: 'ink', sw: 2, z },
    { id: `${id}T`, t: 'path', x: cx, y: cy - h, d: `M${-r},0 A${r},${r1(ry)} 0 1 0 ${r},0 A${r},${r1(ry)} 0 1 0 ${-r},0 Z`, fill: top, stroke: 'ink', sw: 2, z: z + 1 },
  ];
}
// Kerucut: pusat alas (cx, cy), jari-jari r, tinggi h
function cone(id, cx, cy, r, h, { fill = 'acc-soft', z = 0 } = {}) {
  const ry = r * K;
  return [
    { id: `${id}H`, t: 'path', x: cx, y: cy, d: `M${-r},0 A${r},${r1(ry)} 0 0 1 ${r},0`, stroke: 'mut', sw: 1.5, dash: '5 4', z: z - 1 },
    { id: `${id}B`, t: 'path', x: cx, y: cy, d: `M0,${-h} L${-r},0 A${r},${r1(ry)} 0 0 0 ${r},0 Z`, fill, stroke: 'ink', sw: 2, z },
  ];
}
// Bola
function sphere(id, cx, cy, r, { fill = 'ok-soft' } = {}) {
  const ry = r * K;
  return [
    { id: `${id}S`, t: 'circle', x: cx, y: cy, r, fill, stroke: 'ink', sw: 2 },
    { id: `${id}E`, t: 'path', x: cx, y: cy, d: `M${-r},0 A${r},${r1(ry)} 0 0 0 ${r},0`, stroke: 'ink', sw: 1.5, z: 1 },
    { id: `${id}F`, t: 'path', x: cx, y: cy, d: `M${-r},0 A${r},${r1(ry)} 0 0 1 ${r},0`, stroke: 'mut', sw: 1.2, dash: '5 4', z: 1 },
  ];
}
const circ = (id, x, y, r, o = {}) => ({ id, t: 'circle', x, y, r, fill: 'pos', stroke: 'ink', sw: 2, ...o });

// ---------- 6.1 Tabung ----------
const l1 = {
  id: 'k9b6-1',
  title: 'Tabung',
  hook: 'Buka kaleng susu: dua lingkaran dan satu persegi panjang yang panjangnya sama dengan keliling lingkaran.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Label kaleng berbentuk tabung dilepas dan dibentangkan. Bentuk apa labelnya?',
          add: cylinder('c', 200, 220, 60, 130),
          ask: {
            options: [
              { t: 'persegi panjang', ok: true, why: 'Selimut tabung yang dibuka berbentuk persegi panjang.' },
              { t: 'lingkaran', why: 'Lingkaran adalah tutup dan alasnya, bukan labelnya.' },
              { t: 'segitiga', why: 'Label yang mengelilingi kaleng dibuka menjadi persegi panjang.' },
              { t: 'juring', why: 'Juring adalah selimut kerucut.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jaring-jaring tabung',
      steps: [
        {
          say: 'Tabung terdiri dari tiga bagian: alas berbentuk lingkaran, tutup berbentuk lingkaran, dan selimut yang melengkung.',
          set: { cB: { fill: 'acc-soft' } },
          add: [T('a', 'selimut', 300, 150, { size: 16, c: 'acc' }), T('b', 'tutup', 300, 90, { size: 16, c: 'pos' })],
        },
        {
          say: 'Buka selimutnya. Hasilnya persegi panjang. Lebarnya tinggi tabung. Panjangnya sama dengan keliling lingkaran, 2 pi r, karena selimut itu tadinya melingkari alas.',
          clear: true,
          add: [box('sel', 210, 150, 240, 90, { fill: 'acc-soft', r: 0, label: 'selimut\npanjang = keliling = 2πr', lsize: 14 }), circ('t1', 210, 66, 38), circ('t2', 210, 234, 38), T('lh', 't', 76, 150, { size: 18 }), T('lr', 'r', 230, 60, { size: 14, c: 'onfill' })],
        },
      ],
    },
    {
      title: 'Luas permukaan',
      steps: [
        {
          say: 'Luas permukaan: dua lingkaran ditambah selimut. Dua lingkaran: 2 pi r kuadrat. Selimut: 2 pi r kali t.',
          clear: true,
          add: [box('rb', 200, 60, 300, 50, { fill: 'acc-soft', r: 10, label: 'L = 2πr² + 2πrt', lsize: 21 }), T('a', '2 lingkaran + selimut', 200, 100, { size: 15, c: 'mut' })],
        },
        {
          say: 'Contoh: jari-jari 7, tinggi 10. Dua lingkaran: 2 kali 154 sama dengan 308. Selimut: 44 kali 10 sama dengan 440. Total 748 sentimeter persegi.',
          add: [T('b', '2 × (22/7 × 7 × 7) = 308', 200, 150, { size: 18 }), T('c', '2 × 22/7 × 7 × 10 = 440', 200, 185, { size: 18 }), T('d', 'L = 308 + 440 = {a:748 cm²}', 200, 230, { size: 22 })],
        },
      ],
    },
    {
      title: 'Volume',
      steps: [
        {
          say: 'Tabung seperti tumpukan koin yang sama. Volumenya luas alas kali tinggi, sama seperti prisma.',
          clear: true,
          add: range(0, 7).flatMap((k) => cylinder(`k${k}`, 120, 230 - k * 18, 55, 16, { fill: k % 2 ? 'acc-soft' : 'pos-soft', top: k === 6 ? 'pos' : 'pos-soft', z: k * 3 })),
        },
        {
          say: 'Luas alas pi r kuadrat. Jadi volume tabung sama dengan pi r kuadrat kali t.',
          add: [box('rb', 300, 100, 160, 50, { fill: 'acc-soft', r: 10, label: 'V = πr²t', lsize: 22 })],
        },
        {
          say: 'Contoh: jari-jari 7, tinggi 10. Volume: 154 kali 10 sama dengan 1540 sentimeter kubik.',
          add: [T('e', '154 × 10 = {a:1.540 cm³}', 300, 160, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tabung berjari-jari 10 sentimeter dan tinggi 20 sentimeter. Berapa volumenya? Pakai pi sama dengan 3 koma 14.',
          clear: true,
          add: [...cylinder('c', 140, 230, 60, 150), T('r', 'r = 10', 300, 100, { size: 20 }), T('t', 't = 20', 300, 140, { size: 20 })],
          ask: {
            options: [
              { t: '6.280 cm³', ok: true, why: '3,14 × 100 × 20 = 6.280.' },
              { t: '1.256 cm³', why: '1.256 = 3,14 × 10 × 20 × 2 adalah luas selimut. Volume = πr²t.' },
              { t: '628 cm³', why: 'r² = 100, bukan 10.' },
              { t: '12.560 cm³', why: 'Itu memakai diameter (20) sebagai jari-jari.' },
            ],
          },
        },
        {
          say: 'Luas alas: 3 koma 14 kali 100 sama dengan 314. Dikali tinggi 20: 6280 sentimeter kubik.',
          clear: true,
          add: [T('a', 'V = 3,14 × 10 × 10 × 20', 200, 90, { size: 26 }), T('b', '= 314 × 20 = {a:6.280 cm³}', 200, 150, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Volume tabung dengan jari-jari 7 cm dan tinggi 12 cm adalah … cm³ (π = 22/7)',
      ans: ['1848'],
      wrong: { '528': '528 adalah luas selimut (2πrt).', '264': 'r² = 49, bukan 7.' },
      steps: ['Luas alas: 22/7 × 49 = 154.', 'V = 154 × 12 = 1.848 cm³.'],
    },
    {
      type: 'num',
      q: 'Luas selimut tabung dengan jari-jari 7 cm dan tinggi 5 cm adalah … cm² (π = 22/7)',
      ans: ['220'],
      wrong: { '110': 'Selimut = 2πrt, jangan lupa dikali 2.', '770': '770 adalah volume.' },
      steps: ['Selimut = 2 × 22/7 × 7 × 5 = 220 cm².'],
    },
    {
      q: 'Jaring-jaring tabung terdiri dari …',
      options: [
        { t: '2 lingkaran dan 1 persegi panjang', ok: true },
        { t: '1 lingkaran dan 1 juring', why: 'Itu jaring-jaring kerucut.' },
        { t: '2 lingkaran dan 2 persegi panjang', why: 'Selimutnya hanya satu.' },
        { t: '3 lingkaran', why: 'Selimut tabung dibuka menjadi persegi panjang.' },
      ],
      steps: ['Alas + tutup = 2 lingkaran. Selimut = persegi panjang.'],
    },
    {
      type: 'num',
      q: 'Luas permukaan tabung tanpa tutup dengan jari-jari 10 cm dan tinggi 15 cm adalah … cm² (π = 3,14)',
      ans: ['1256'],
      wrong: { '1570': '1.570 memakai dua lingkaran. Tanpa tutup, hanya satu.', '942': 'Tambahkan juga alasnya: 314.' },
      steps: ['Alas: 3,14 × 100 = 314.', 'Selimut: 2 × 3,14 × 10 × 15 = 942.', 'Total: 1.256 cm².'],
    },
    {
      type: 'num',
      q: 'Sebuah drum berbentuk tabung berdiameter 70 cm dan tinggi 100 cm. Volumenya … liter (π = 22/7)',
      ans: ['385'],
      wrong: { '385000': 'Itu dalam cm³. Bagi 1.000 untuk liter.', '1540': 'Jari-jarinya 35, bukan 70.' },
      steps: ['r = 35. Luas alas: 22/7 × 1.225 = 3.850.', 'V = 3.850 × 100 = 385.000 cm³ = 385 liter.'],
    },
  ],
};

// ---------- 6.2 Kerucut ----------
const TB = [245, 230];
const third = 150 / 3;
const water = (k) => cylinder(`w${k}`, TB[0], TB[1] - k * third, 55, third, { fill: 'pos-soft', top: 'pos-soft', z: -6 + k * 2 });

const l2 = {
  id: 'k9b6-2',
  title: 'Kerucut',
  hook: 'Kerucut berisi sepertiga tabung yang alas dan tingginya sama, persis seperti limas dan prisma.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kerucut dan tabung ini alas dan tingginya sama. Kerucut diisi air lalu dituang ke tabung. Berapa kali tuang sampai penuh?',
          add: [...cone('k', 80, 230, 55, 150), ...cylinder('t', ...TB, 55, 150, { fill: 'none', top: 'none' })],
          ask: {
            options: [
              { t: '3 kali', ok: true, why: 'Kita lihat tuangannya.' },
              { t: '2 kali', why: 'Kerucut lebih kecil dari setengah tabung.' },
              { t: '4 kali', why: 'Kita lihat tuangannya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tuang tiga kali',
      steps: [
        { say: 'Tuangan pertama.', add: water(0) },
        { say: 'Tuangan kedua.', add: water(1) },
        { say: 'Tuangan ketiga: penuh!', add: water(2) },
        {
          say: 'Jadi volume kerucut sepertiga volume tabung: sepertiga pi r kuadrat t.',
          add: [box('rb', 200, 30, 220, 40, { fill: 'acc-soft', r: 10, label: 'V = ⅓ × πr²t', lsize: 19 })],
        },
      ],
    },
    {
      title: 'Garis pelukis',
      steps: [
        {
          say: 'Garis dari puncak ke tepi alas disebut garis pelukis, ditulis s. Jari-jari, tinggi, dan garis pelukis membentuk segitiga siku-siku.',
          clear: true,
          add: [...cone('k', 140, 230, 90, 170), ln('t', 140, 60, 140, 230, { sw: 2, dash: '5 4', c: 'pos' }), ln('r', 140, 230, 230, 230, { sw: 2.5, c: 'pos' }), ln('s', 140, 60, 230, 230, { sw: 3.5, c: 'neg' }), T('lt', 't', 128, 150, { size: 17, c: 'pos' }), T('lr', 'r', 185, 245, { size: 17, c: 'pos' }), T('ls', 's', 198, 135, { size: 17, c: 'neg' })],
        },
        {
          say: 'Jadi s bisa dihitung dengan Pythagoras: s sama dengan akar dari r kuadrat tambah t kuadrat. Contoh r 6 dan t 8: s sama dengan 10.',
          add: [T('f', 's = √(r² + t²)', 315, 100, { size: 18 }), T('e', 'r = 6, t = 8 → s = 10', 315, 140, { size: 15 })],
        },
      ],
    },
    {
      title: 'Luas permukaan',
      steps: [
        {
          say: 'Jaring-jaring kerucut: satu lingkaran untuk alas dan satu juring untuk selimut.',
          clear: true,
          add: [{ id: 'jr', t: 'path', x: 200, y: 40, d: 'M0,0 L-95,120 A153,153 0 0 0 95,120 Z', fill: 'acc-soft', stroke: 'ink', sw: 2 }, circ('al', 200, 230, 45, { fill: 'pos-soft' }), T('lj', 'selimut (juring)', 320, 100, { size: 15, c: 'acc' }), T('la', 'alas', 280, 235, { size: 15, c: 'pos' })],
        },
        {
          say: 'Luas selimut sama dengan pi r s. Luas permukaan: pi r kuadrat tambah pi r s.',
          add: [box('rb', 200, 285, 260, 26, { fill: 'acc-soft', r: 8, label: 'L = πr² + πrs', lsize: 17, z: 3 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kerucut berjari-jari 7 sentimeter dan tinggi 12 sentimeter. Berapa volumenya? Pakai pi sama dengan 22 per 7.',
          clear: true,
          add: [...cone('k', 140, 230, 70, 160), T('r', 'r = 7', 290, 100, { size: 20 }), T('t', 't = 12', 290, 140, { size: 20 })],
          ask: {
            options: [
              { t: '616 cm³', ok: true, why: '⅓ × 154 × 12 = 616.' },
              { t: '1.848 cm³', why: '1.848 adalah volume tabung. Kerucut hanya ⅓-nya.' },
              { t: '264 cm³', why: 'Luas alas πr² = 154, bukan 22.' },
              { t: '308 cm³', why: '⅓ × 154 × 12 = 616.' },
            ],
          },
        },
        {
          say: 'Luas alas 154. Sepertiga kali 154 kali 12: 154 kali 4 sama dengan 616.',
          clear: true,
          add: [T('a', 'V = ⅓ × 154 × 12', 200, 90, { size: 28 }), T('b', '= 154 × 4 = {a:616 cm³}', 200, 150, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Volume kerucut dengan jari-jari 6 cm dan tinggi 10 cm adalah … cm³ (π = 3,14)',
      ans: ['376.8'],
      wrong: { '1130.4': 'Itu volume tabung. Kerucut ⅓-nya.', '62.8': 'r² = 36.' },
      steps: ['V = ⅓ × 3,14 × 36 × 10.', '= 376,8 cm³.'],
    },
    {
      type: 'num',
      q: 'Kerucut dengan jari-jari 5 cm dan tinggi 12 cm memiliki garis pelukis … cm',
      ans: ['13'],
      wrong: { '17': 'Bukan dijumlah: s = √(25 + 144).', '169': '169 adalah s².' },
      steps: ['s = √(5² + 12²) = √169 = 13 cm.'],
    },
    {
      type: 'num',
      q: 'Luas selimut kerucut dengan jari-jari 7 cm dan garis pelukis 10 cm adalah … cm² (π = 22/7)',
      ans: ['220'],
      wrong: { '374': 'Itu sudah ditambah alas. Yang ditanya selimut saja.', '440': 'Selimut kerucut = πrs, tanpa dikali 2.' },
      steps: ['Selimut = 22/7 × 7 × 10 = 220 cm².'],
    },
    {
      q: 'Jaring-jaring kerucut terdiri dari …',
      options: [
        { t: 'lingkaran dan juring', ok: true },
        { t: 'dua lingkaran dan persegi panjang', why: 'Itu tabung.' },
        { t: 'lingkaran dan segitiga', why: 'Selimut kerucut melengkung, jadi juring.' },
        { t: 'persegi dan empat segitiga', why: 'Itu limas segi empat.' },
      ],
      steps: ['Alas = lingkaran, selimut = juring.'],
    },
    {
      type: 'num',
      q: 'Sebuah tabung dan kerucut memiliki alas dan tinggi sama. Volume tabung 900 cm³. Volume kerucut … cm³',
      ans: ['300'],
      wrong: { '2700': 'Kerucut lebih kecil: ⅓ × 900.', '450': 'Kerucut ⅓ tabung, bukan ½.' },
      steps: ['V kerucut = ⅓ × 900 = 300 cm³.'],
    },
  ],
};

// ---------- 6.3 Bola ----------
const l3 = {
  id: 'k9b6-3',
  title: 'Bola',
  hook: 'Kulit jeruk yang dikupas tepat menutupi 4 lingkaran yang sama besar. Itu sebabnya luas bola 4πr².',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kulit sebuah jeruk dikupas, lalu ditempel di lingkaran-lingkaran yang jari-jarinya sama dengan jeruk. Berapa lingkaran yang tertutup?',
          add: [...sphere('j', 90, 140, 55, { fill: 'acc' }), ...range(0, 4).map((k) => circ(`c${k}`, 200 + (k % 2) * 110, 85 + Math.floor(k / 2) * 115, 50, { fill: 'paper' }))],
          ask: {
            options: [
              { t: '4 lingkaran', ok: true, why: 'Kita tempel kulitnya satu per satu.' },
              { t: '2 lingkaran', why: 'Lebih dari 2. Kita lihat.' },
              { t: '1 lingkaran', why: 'Kulit bola jauh lebih luas dari satu lingkaran.' },
              { t: '3 lingkaran', why: 'Hampir. Kita lihat.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kulit jeruk',
      steps: [
        ...range(0, 4).map((k) => ({
          say: k === 0 ? 'Lingkaran pertama tertutup.' : k === 3 ? 'Lingkaran keempat tertutup, dan kulitnya habis!' : `Lingkaran ${['', 'kedua', 'ketiga'][k]}.`,
          set: { [`c${k}`]: { fill: 'acc-soft' }, ...(k === 3 ? { jS: { fill: 'paper' } } : {}) },
        })),
        {
          say: 'Luas satu lingkaran pi r kuadrat. Jadi luas permukaan bola sama dengan 4 pi r kuadrat.',
          add: [box('rb', 200, 275, 220, 36, { fill: 'acc-soft', r: 10, label: 'L = 4πr²', lsize: 20, z: 3 })],
        },
      ],
    },
    {
      title: 'Volume bola',
      steps: [
        {
          say: 'Masukkan bola ke dalam tabung yang pas: jari-jarinya r dan tingginya 2 r. Volume tabung itu pi r kuadrat kali 2 r, yaitu 2 pi r pangkat 3.',
          clear: true,
          add: [...cylinder('t', 130, 250, 70, 140, { fill: 'none', top: 'none' }), ...sphere('b', 130, 180, 70), T('a', 'tabung: V = πr² × 2r = 2πr³', 300, 60, { size: 13 })],
        },
        {
          say: 'Archimedes menemukan: bola mengisi tepat dua pertiga tabung itu.',
          add: [T('b', 'bola = ⅔ tabung', 300, 110, { size: 17, c: 'ok' })],
        },
        {
          say: 'Dua pertiga kali 2 pi r pangkat 3 sama dengan empat pertiga pi r pangkat 3.',
          add: [box('rb', 300, 170, 160, 50, { fill: 'acc-soft', r: 10, label: 'V = ⁴⁄₃ πr³', lsize: 20 })],
        },
      ],
    },
    {
      title: 'Menghitung',
      steps: [
        {
          say: 'Bola berjari-jari 3 sentimeter. Luas permukaan: 4 kali 3 koma 14 kali 9, sama dengan 113 koma 04.',
          clear: true,
          add: [...sphere('b', 90, 140, 60), T('r', 'r = 3 cm', 90, 225, { size: 16 }), T('a', 'L = 4 × 3,14 × 9 = 113,04 cm²', 270, 100, { size: 15 })],
        },
        {
          say: 'Volume: empat pertiga kali 3 koma 14 kali 27. 27 dibagi 3 sama dengan 9, jadi 4 kali 3 koma 14 kali 9, sama dengan 113 koma 04 sentimeter kubik.',
          add: [T('b', 'V = ⁴⁄₃ × 3,14 × 27', 270, 150, { size: 15 }), T('c', '= 4 × 3,14 × 9 = 113,04 cm³', 270, 180, { size: 15 })],
        },
        {
          say: 'Angkanya kebetulan sama karena r sama dengan 3, tapi satuannya berbeda: luas dalam sentimeter persegi, volume dalam sentimeter kubik.',
          add: [T('n', 'cm² untuk luas, cm³ untuk volume', 270, 230, { size: 13, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Bola berjari-jari 7 sentimeter. Berapa luas permukaannya? Pakai pi sama dengan 22 per 7.',
          clear: true,
          add: [...sphere('b', 120, 140, 70), T('r', 'r = 7 cm', 290, 120, { size: 20 }), T('q', 'L = ?', 290, 160, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: '616 cm²', ok: true, why: '4 × 22/7 × 49 = 616.' },
              { t: '154 cm²', why: '154 adalah luas satu lingkaran. Bola = 4 lingkaran.' },
              { t: '1.437,3 cm²', why: 'Itu volume (⁴⁄₃πr³).' },
              { t: '88 cm²', why: '88 = 4 × 22. Luas = 4 × 22/7 × 7 × 7.' },
            ],
          },
        },
        {
          say: '4 kali 22 per 7 kali 7 kali 7: 4 kali 154 sama dengan 616 sentimeter persegi.',
          clear: true,
          add: [T('a', 'L = 4 × 22/7 × 7 × 7', 200, 90, { size: 28 }), T('b', '= 4 × 154 = {a:616 cm²}', 200, 150, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Luas permukaan bola dengan jari-jari 10 cm adalah … cm² (π = 3,14)',
      ans: ['1256'],
      wrong: { '314': '314 adalah luas satu lingkaran. Bola = 4πr².', '4186.67': 'Itu volume.' },
      steps: ['L = 4 × 3,14 × 100 = 1.256 cm².'],
    },
    {
      type: 'num',
      q: 'Volume bola dengan jari-jari 3 cm adalah … cm³ (π = 3,14)',
      ans: ['113.04'],
      wrong: { '84.78': 'r³ = 27; ⁴⁄₃ × 3,14 × 27 = 113,04.', '339.12': 'Kalikan ⁴⁄₃, bukan 4.' },
      steps: ['V = ⁴⁄₃ × 3,14 × 27.', '= 4 × 3,14 × 9 = 113,04 cm³.'],
    },
    {
      q: 'Volume bola yang tepat masuk ke dalam tabung (diameter dan tinggi tabung sama dengan diameter bola) adalah … volume tabung.',
      options: [
        { t: '⅔', ok: true },
        { t: '⅓', why: '⅓ untuk kerucut.' },
        { t: '½', why: 'Archimedes membuktikan ⅔.' },
        { t: '¾', why: 'Bola mengisi ⅔ tabung.' },
      ],
      steps: ['V tabung = 2πr³, V bola = ⁴⁄₃πr³.', '⁴⁄₃ ÷ 2 = ⅔.'],
    },
    {
      type: 'num',
      q: 'Luas permukaan setengah bola padat (termasuk alas datarnya) dengan jari-jari 7 cm adalah … cm² (π = 22/7)',
      ans: ['462'],
      wrong: { '308': 'Tambahkan alas lingkaran: 154.', '616': 'Itu luas bola penuh.' },
      steps: ['Setengah kulit bola: 2πr² = 308.', 'Alas lingkaran: 154.', 'Total 462 cm².'],
    },
    {
      q: 'Jika jari-jari bola dijadikan 2 kali, volumenya menjadi …',
      options: [
        { t: '8 kali', ok: true },
        { t: '2 kali', why: 'Volume memakai r³: 2³ = 8.' },
        { t: '4 kali', why: '4 kali untuk luas permukaan (r²).' },
        { t: '6 kali', why: '(2r)³ = 8r³.' },
      ],
      steps: ['V ∝ r³.', '(2r)³ = 8r³.'],
    },
  ],
};

export default {
  id: 'k9b6',
  no: 6,
  title: 'Bangun Ruang Sisi Lengkung',
  desc: 'Tabung, kerucut, dan bola: jaring-jaring, luas permukaan, dan volume.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Sebuah es krim berbentuk kerucut (r = 3 cm, t = 10 cm) dengan setengah bola di atasnya (r = 3 cm). Volume total … cm³ (π = 3,14)',
      ans: ['150.72'],
      wrong: { '94.2': 'Itu kerucut saja. Tambah setengah bola: 56,52.', '207.24': 'Setengah bola, bukan bola penuh.' },
      steps: ['Kerucut: ⅓ × 3,14 × 9 × 10 = 94,2.', 'Setengah bola: ⅔ × 3,14 × 27 = 56,52.', 'Total: 150,72 cm³.'],
    },
    {
      q: 'Tabung, kerucut, dan bola memiliki jari-jari r. Tinggi tabung dan kerucut 2r. Perbandingan volume tabung : kerucut : bola adalah …',
      options: [
        { t: '3 : 1 : 2', ok: true },
        { t: '1 : 2 : 3', why: 'Tabung terbesar: 2πr³. Kerucut ⅔πr³, bola ⁴⁄₃πr³.' },
        { t: '3 : 2 : 1', why: 'Bola (⁴⁄₃πr³) lebih besar dari kerucut (⅔πr³).' },
        { t: '2 : 1 : 3', why: 'Hitung: 2 : ⅔ : ⁴⁄₃ = 6 : 2 : 4 = 3 : 1 : 2.' },
      ],
      steps: ['Tabung 2πr³, kerucut ⅓ × πr² × 2r = ⅔πr³, bola ⁴⁄₃πr³.', '2 : ⅔ : ⁴⁄₃ = 6 : 2 : 4 = 3 : 1 : 2.'],
    },
    {
      type: 'num',
      q: 'Sebuah bola dimasukkan ke dalam kubus dan pas menyentuh semua sisi. Rusuk kubus 14 cm. Volume bola … cm³ (π = 22/7, bulatkan ke bilangan bulat)',
      ans: ['1437'],
      wrong: { '2744': '2.744 adalah volume kubus.', '11499': 'Jari-jari bola 7, bukan 14.' },
      steps: ['r = 7.', 'V = ⁴⁄₃ × 22/7 × 343 = 1.437,3 ≈ 1.437 cm³.'],
    },
  ],
};
