// Kelas 1 · Bab 4: Mengenal Bentuk
import { T, dot } from '../helpers.js';

// ---------- bentuk datar ----------
const tri = (id, x, y, s = 60, o = {}) => ({ id, t: 'poly', x, y, pts: [[0, -s * 0.6], [s * 0.6, s * 0.45], [-s * 0.6, s * 0.45]], fill: 'acc-soft', stroke: 'acc', sw: 3, ...o });
const sq = (id, x, y, s = 60, o = {}) => ({ id, t: 'rect', x, y, w: s, h: s, fill: 'pos-soft', stroke: 'pos', sw: 3, ...o });
const rect = (id, x, y, w = 90, h = 55, o = {}) => ({ id, t: 'rect', x, y, w, h, fill: 'ok-soft', stroke: 'ok', sw: 3, ...o });
const circ = (id, x, y, s = 60, o = {}) => ({ id, t: 'circle', x, y, r: s / 2, fill: 'neg-soft', stroke: 'neg', sw: 3, ...o });
const corners = (p, pts, c = 'ink') => pts.map(([a, b], i) => dot(`${p}${i}`, a, b, c, { r: 6 }));

// ---------- bentuk ruang (gambar sederhana) ----------
function box3(id, x, y, w, h, d, c = 'pos') {
  const dx = d * 0.6;
  const dy = d * 0.45;
  const L = x - w / 2;
  const Tp = y - h / 2 + dy / 2;
  return [
    { id: `${id}f`, t: 'poly', x: 0, y: 0, pts: [[L, Tp], [L + w, Tp], [L + w, Tp + h], [L, Tp + h]], fill: `${c}-soft`, stroke: c, sw: 2.5 },
    { id: `${id}t`, t: 'poly', x: 0, y: 0, pts: [[L, Tp], [L + dx, Tp - dy], [L + w + dx, Tp - dy], [L + w, Tp]], fill: 'paper', stroke: c, sw: 2.5 },
    { id: `${id}s`, t: 'poly', x: 0, y: 0, pts: [[L + w, Tp], [L + w + dx, Tp - dy], [L + w + dx, Tp + h - dy], [L + w, Tp + h]], fill: `${c}-soft`, stroke: c, sw: 2.5, o: 0.85 },
  ];
}
const ball = (id, x, y, r = 32) => [
  { id: `${id}b`, t: 'circle', x, y, r, fill: 'neg-soft', stroke: 'neg', sw: 2.5 },
  { id: `${id}e`, t: 'path', x: 0, y: 0, d: `M${x - r},${y} A${r},${r * 0.3} 0 0 0 ${x + r},${y}`, stroke: 'neg', sw: 1.5, dash: '4 4' },
];
const can = (id, x, y, r = 28, h = 64) => {
  const ry = r * 0.32;
  return [
    { id: `${id}b`, t: 'path', x: 0, y: 0, d: `M${x - r},${y - h / 2} V${y + h / 2} A${r},${ry} 0 0 0 ${x + r},${y + h / 2} V${y - h / 2}`, fill: 'ok-soft', stroke: 'ok', sw: 2.5 },
    { id: `${id}t`, t: 'path', x: 0, y: 0, d: `M${x - r},${y - h / 2} A${r},${ry} 0 0 1 ${x + r},${y - h / 2} A${r},${ry} 0 0 1 ${x - r},${y - h / 2} Z`, fill: 'paper', stroke: 'ok', sw: 2.5 },
  ];
};
const cone = (id, x, y, r = 30, h = 70) => {
  const ry = r * 0.32;
  return [{ id: `${id}b`, t: 'path', x: 0, y: 0, d: `M${x},${y - h / 2} L${x - r},${y + h / 2} A${r},${ry} 0 0 0 ${x + r},${y + h / 2} Z`, fill: 'acc-soft', stroke: 'acc', sw: 2.5 }];
};

// ---------- 4.1 Bangun datar ----------
const l1 = {
  id: 'k1b4-1',
  title: 'Bangun Datar',
  hook: 'Segitiga punya 3 sisi dan 3 sudut. Segi empat punya 4 sisi dan 4 sudut. Lingkaran bulat, tidak punya sudut.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bentuk ini punya 3 sudut. Apa namanya?',
          add: [tri('a', 200, 120, 110), ...corners('c', [[200, 54], [266, 170], [134, 170]], 'neg')],
          ask: {
            options: [
              { t: 'segitiga', ok: true, why: 'Segitiga punya 3 sudut dan 3 sisi.' },
              { t: 'persegi', why: 'Persegi punya 4 sudut.' },
              { t: 'lingkaran', why: 'Lingkaran tidak punya sudut.' },
              { t: 'persegi panjang', why: 'Persegi panjang punya 4 sudut.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kenali bentuknya',
      steps: [
        {
          say: 'Ini segitiga. Hitung sudutnya: satu, dua, tiga.',
          clear: true,
          add: [tri('a', 80, 110, 80), ...corners('ca', [[80, 62], [128, 146], [32, 146]], 'neg'), T('la', 'segitiga', 80, 190, { size: 16 }), T('na', '3 sudut', 80, 215, { size: 14, c: 'mut' })],
        },
        {
          say: 'Ini persegi. Empat sisinya sama panjang. Ada 4 sudut.',
          add: [sq('b', 200, 110, 72), ...corners('cb', [[164, 74], [236, 74], [236, 146], [164, 146]], 'neg'), T('lb', 'persegi', 200, 190, { size: 16 }), T('nb', '4 sudut', 200, 215, { size: 14, c: 'mut' })],
        },
        {
          say: 'Ini persegi panjang. Dua sisinya panjang, dua sisinya pendek. Juga 4 sudut.',
          add: [rect('d', 320, 110, 96, 56), ...corners('cd', [[272, 82], [368, 82], [368, 138], [272, 138]], 'neg'), T('ld', 'persegi panjang', 320, 190, { size: 16 }), T('nd', '4 sudut', 320, 215, { size: 14, c: 'mut' })],
        },
        {
          say: 'Dan ini lingkaran. Bulat, tidak punya sudut.',
          clear: true,
          add: [circ('e', 200, 120, 110), T('le', 'lingkaran', 200, 205, { size: 18 }), T('ne', 'tidak punya sudut', 200, 232, { size: 14, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Di sekitar kita',
      steps: [
        {
          say: 'Bentuk-bentuk ini ada di sekitar kita. Jam dinding berbentuk lingkaran. Ubin berbentuk persegi. Papan tulis berbentuk persegi panjang.',
          clear: true,
          add: [circ('j', 80, 110, 80), T('lj', 'jam', 80, 175, { size: 16 }), sq('u', 200, 110, 70), T('lu', 'ubin', 200, 175, { size: 16 }), rect('p', 320, 110, 100, 60), T('lp', 'papan tulis', 320, 175, { size: 16 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa sudut yang dimiliki persegi panjang?',
          clear: true,
          add: [rect('d', 200, 110, 140, 80)],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Persegi panjang punya 4 sudut, satu di setiap pojok.' },
              { t: '3', why: '3 sudut adalah segitiga.' },
              { t: '0', why: 'Lingkaran yang tidak punya sudut.' },
              { t: '2', why: 'Hitung semua pojoknya.' },
            ],
          },
        },
        {
          say: 'Hitung pojoknya: satu, dua, tiga, empat.',
          add: [...corners('c', [[130, 70], [270, 70], [270, 150], [130, 150]], 'neg'), T('a', '{g:4} sudut', 200, 210, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bentuk ini bernama …',
      fig: [circ('f', 200, 150, 110)],
      options: [
        { t: 'lingkaran', ok: true },
        { t: 'segitiga', why: 'Segitiga punya 3 sudut.' },
        { t: 'persegi', why: 'Persegi punya 4 sudut.' },
      ],
      steps: ['Bulat, tanpa sudut.', 'Lingkaran.'],
    },
    {
      q: 'Bentuk ini bernama …',
      fig: [sq('f', 200, 150, 110)],
      options: [
        { t: 'persegi', ok: true },
        { t: 'persegi panjang', why: 'Keempat sisinya sama panjang. Itu persegi.' },
        { t: 'segitiga', why: 'Ada 4 sudut, bukan 3.' },
      ],
      steps: ['4 sisi sama panjang.', 'Persegi.'],
    },
    {
      type: 'num',
      q: 'Segitiga punya berapa sudut?',
      ans: ['3'],
      wrong: { '4': '4 sudut adalah segi empat.', '0': 'Lingkaran yang tidak punya sudut.' },
      steps: ['Segi-tiga: tiga sudut.'],
    },
    {
      q: 'Benda yang berbentuk lingkaran adalah …',
      options: [
        { t: 'uang logam', ok: true },
        { t: 'buku', why: 'Buku berbentuk persegi panjang.' },
        { t: 'papan tulis', why: 'Papan tulis berbentuk persegi panjang.' },
        { t: 'ubin', why: 'Ubin biasanya berbentuk persegi.' },
      ],
      steps: ['Uang logam bulat.', 'Bentuknya lingkaran.'],
    },
    {
      q: 'Bentuk ini bernama …',
      fig: [tri('f', 200, 155, 120)],
      options: [
        { t: 'segitiga', ok: true },
        { t: 'persegi', why: 'Hitung sudutnya: hanya 3.' },
        { t: 'lingkaran', why: 'Bentuk ini punya sudut.' },
      ],
      steps: ['3 sudut, 3 sisi.', 'Segitiga.'],
    },
  ],
};

// ---------- 4.2 Bangun ruang ----------
const l2 = {
  id: 'k1b4-2',
  title: 'Bangun Ruang',
  hook: 'Benda yang bisa dipegang punya bentuk ruang: kubus, balok, bola, tabung, dan kerucut. Bola bisa menggelinding ke segala arah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Benda mana yang paling mudah menggelinding ke segala arah?',
          add: [...box3('k', 90, 130, 60, 60, 40), ...ball('b', 200, 130), ...can('t', 310, 130)],
          ask: {
            options: [
              { t: 'bola', ok: true, why: 'Bola bulat ke semua arah, jadi bisa menggelinding ke mana saja.' },
              { t: 'kubus', why: 'Kubus punya sisi datar dan pojok, jadi tidak bisa menggelinding.' },
              { t: 'tabung', why: 'Tabung bisa menggelinding, tetapi hanya ke satu arah. Kalau berdiri, ia tidak menggelinding.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kenali bentuknya',
      steps: [
        {
          say: 'Ini kubus, seperti dadu. Semua sisinya persegi.',
          clear: true,
          add: [...box3('k', 70, 100, 56, 56, 36), T('lk', 'kubus', 75, 160, { size: 16 }), T('ek', 'dadu', 75, 182, { size: 13, c: 'mut' })],
        },
        {
          say: 'Ini balok, seperti kotak susu. Sisinya persegi panjang.',
          add: [...box3('bk', 200, 100, 80, 50, 34, 'ok'), T('ll', 'balok', 205, 160, { size: 16 }), T('el', 'kotak susu', 205, 182, { size: 13, c: 'mut' })],
        },
        {
          say: 'Ini bola, seperti bola sepak.',
          add: [...ball('b', 330, 100), T('lb', 'bola', 330, 160, { size: 16 }), T('eb', 'bola sepak', 330, 182, { size: 13, c: 'mut' })],
        },
        {
          say: 'Ini tabung, seperti kaleng. Dan ini kerucut, seperti topi ulang tahun.',
          add: [...can('t', 130, 245, 26, 50), T('lt', 'tabung', 195, 245, { size: 16 }), ...cone('c', 270, 245, 26, 56), T('lc', 'kerucut', 335, 245, { size: 16 })],
        },
      ],
    },
    {
      title: 'Bisa menggelinding?',
      steps: [
        {
          say: 'Bola, tabung, dan kerucut punya bagian melengkung, jadi bisa menggelinding. Kubus dan balok semua sisinya datar, jadi tidak bisa menggelinding, tetapi mudah ditumpuk.',
          clear: true,
          add: [T('a', 'bisa menggelinding', 110, 50, { size: 18, c: 'ok' }), ...ball('b', 60, 120, 28), ...can('t', 150, 120, 24, 50), T('b2', 'mudah ditumpuk', 300, 50, { size: 18, c: 'pos' }), ...box3('k', 300, 160, 56, 56, 34), ...box3('k2', 300, 100, 56, 56, 34)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kaleng minuman berbentuk apa?',
          clear: true,
          add: [...can('t', 200, 120, 40, 90)],
          ask: {
            options: [
              { t: 'tabung', ok: true, why: 'Kaleng punya dua lingkaran di atas dan bawah, dan sisi melengkung.' },
              { t: 'kubus', why: 'Kubus semua sisinya persegi.' },
              { t: 'bola', why: 'Bola bulat ke segala arah, tidak punya sisi datar.' },
              { t: 'kerucut', why: 'Kerucut punya ujung lancip di atas.' },
            ],
          },
        },
        {
          say: 'Kaleng berbentuk tabung.',
          add: [T('a', '{g:tabung}', 200, 220, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Dadu berbentuk …',
      options: [
        { t: 'kubus', ok: true },
        { t: 'bola', why: 'Dadu punya sisi datar dan pojok.' },
        { t: 'tabung', why: 'Tabung punya sisi melengkung.' },
      ],
      steps: ['Semua sisi dadu persegi.', 'Kubus.'],
    },
    {
      q: 'Bentuk ini bernama …',
      fig: ball('f', 200, 150, 60),
      options: [
        { t: 'bola', ok: true },
        { t: 'lingkaran', why: 'Lingkaran itu bentuk datar. Benda bulat yang bisa dipegang adalah bola.' },
        { t: 'tabung', why: 'Tabung punya sisi datar di atas dan bawah.' },
      ],
      steps: ['Bulat ke segala arah.', 'Bola.'],
    },
    {
      q: 'Benda yang berbentuk balok adalah …',
      options: [
        { t: 'kotak pensil', ok: true },
        { t: 'kelereng', why: 'Kelereng berbentuk bola.' },
        { t: 'topi ulang tahun', why: 'Topi ulang tahun berbentuk kerucut.' },
        { t: 'kaleng', why: 'Kaleng berbentuk tabung.' },
      ],
      steps: ['Sisi-sisinya persegi panjang.', 'Balok.'],
    },
    {
      q: 'Bentuk mana yang TIDAK bisa menggelinding?',
      options: [
        { t: 'kubus', ok: true },
        { t: 'bola', why: 'Bola bisa menggelinding ke segala arah.' },
        { t: 'tabung', why: 'Tabung bisa menggelinding jika dibaringkan.' },
      ],
      steps: ['Semua sisi kubus datar.', 'Kubus tidak menggelinding.'],
    },
    {
      q: 'Bentuk ini bernama …',
      fig: cone('f', 200, 150, 50, 120),
      options: [
        { t: 'kerucut', ok: true },
        { t: 'segitiga', why: 'Segitiga itu bentuk datar. Ini benda dengan alas bulat.' },
        { t: 'tabung', why: 'Tabung tidak punya ujung lancip.' },
      ],
      steps: ['Alas bulat, ujung lancip.', 'Kerucut.'],
    },
  ],
};

export default {
  id: 'k1b4',
  no: 4,
  title: 'Mengenal Bentuk',
  desc: 'Bangun datar (segitiga, persegi, persegi panjang, lingkaran) dan bangun ruang (kubus, balok, bola, tabung, kerucut).',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Persegi punya berapa sudut?',
      ans: ['4'],
      wrong: { '3': '3 sudut adalah segitiga.' },
      steps: ['Persegi punya 4 pojok.', '4 sudut.'],
    },
    {
      q: 'Bola sepak berbentuk …',
      options: [
        { t: 'bola', ok: true },
        { t: 'kubus', why: 'Bola sepak tidak punya pojok.' },
        { t: 'tabung', why: 'Bola sepak tidak punya sisi datar.' },
      ],
      steps: ['Bulat ke segala arah.', 'Bola.'],
    },
    {
      q: 'Jam dinding biasanya berbentuk …',
      options: [
        { t: 'lingkaran', ok: true },
        { t: 'segitiga', why: 'Jam dinding biasanya bulat.' },
        { t: 'persegi panjang', why: 'Jam dinding biasanya bulat, tanpa sudut.' },
      ],
      steps: ['Bulat, tanpa sudut.', 'Lingkaran.'],
    },
  ],
};
