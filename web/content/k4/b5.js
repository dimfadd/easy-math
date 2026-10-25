// Kelas 4 · Bab 5: Bangun Datar
import { T } from '../helpers.js';

const poly = (id, pts, c = 'pos', o = {}) => ({ id, t: 'poly', x: 0, y: 0, pts, fill: `${c}-soft`, stroke: c, sw: 2.5, ...o });
const at = (pts, x, y, s = 1) => pts.map(([a, b]) => [x + a * s, y + b * s]);
const SHAPES = {
  persegi: [[-30, -30], [30, -30], [30, 30], [-30, 30]],
  'persegi panjang': [[-45, -26], [45, -26], [45, 26], [-45, 26]],
  jajargenjang: [[-30, -26], [50, -26], [30, 26], [-50, 26]],
  trapesium: [[-24, -26], [24, -26], [48, 26], [-48, 26]],
  'belah ketupat': [[0, -38], [30, 0], [0, 38], [-30, 0]],
  'layang-layang': [[0, -36], [28, -10], [0, 40], [-28, -10]],
};
const COL = ['pos', 'ok', 'acc', 'neg', 'pos', 'ok'];

// ---------- 5.1 Segi empat ----------
const l1 = {
  id: 'k4b5-1',
  title: 'Macam-macam Segi Empat',
  hook: 'Semua segi empat punya 4 sisi, tetapi cirinya berbeda: sisi mana yang sejajar, sisi mana yang sama panjang, dan apakah sudutnya siku-siku.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segi empat ini punya dua pasang sisi sejajar, tetapi sudutnya tidak siku-siku. Apa namanya?',
          add: [poly('s', at(SHAPES.jajargenjang, 200, 110, 1.6), 'acc')],
          ask: {
            options: [
              { t: 'jajargenjang', ok: true, why: 'Jajargenjang: sisi berhadapan sejajar dan sama panjang, sudutnya tidak siku-siku.' },
              { t: 'persegi panjang', why: 'Persegi panjang sudutnya siku-siku.' },
              { t: 'trapesium', why: 'Trapesium hanya punya satu pasang sisi sejajar.' },
              { t: 'belah ketupat', why: 'Belah ketupat keempat sisinya sama panjang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Enam segi empat',
      steps: [
        {
          say: 'Persegi: 4 sisi sama panjang, 4 sudut siku-siku. Persegi panjang: sisi berhadapan sama panjang, 4 sudut siku-siku.',
          clear: true,
          add: [poly('a', at(SHAPES.persegi, 80, 70), COL[0]), T('la', 'persegi', 80, 125, { size: 14 }), poly('b', at(SHAPES['persegi panjang'], 210, 70), COL[1]), T('lb', 'persegi panjang', 210, 125, { size: 14 })],
        },
        {
          say: 'Jajargenjang: sisi berhadapan sejajar dan sama panjang, tetapi miring. Trapesium: hanya satu pasang sisi sejajar.',
          add: [poly('c', at(SHAPES.jajargenjang, 335, 70), COL[2]), T('lc', 'jajargenjang', 335, 125, { size: 14 }), poly('d', at(SHAPES.trapesium, 80, 200), COL[3]), T('ld', 'trapesium', 80, 255, { size: 14 })],
        },
        {
          say: 'Belah ketupat: 4 sisi sama panjang, tetapi sudutnya tidak siku-siku. Layang-layang: dua pasang sisi berdekatan sama panjang.',
          add: [poly('e', at(SHAPES['belah ketupat'], 210, 200), COL[4]), T('le', 'belah ketupat', 210, 255, { size: 14 }), poly('f', at(SHAPES['layang-layang'], 335, 196), COL[5]), T('lf', 'layang-layang', 335, 255, { size: 14 })],
        },
      ],
    },
    {
      title: 'Persegi juga persegi panjang',
      steps: [
        {
          say: 'Persegi punya semua ciri persegi panjang: sisi berhadapan sama panjang dan semua sudut siku-siku. Jadi persegi adalah persegi panjang yang istimewa, keempat sisinya sama.',
          clear: true,
          add: [poly('a', at(SHAPES.persegi, 120, 110, 1.4), 'pos'), poly('b', at(SHAPES['persegi panjang'], 280, 110, 1.2), 'ok'), T('k', 'persegi = persegi panjang dengan 4 sisi sama', 200, 220, { size: 16, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segi empat ini hanya punya satu pasang sisi sejajar. Apa namanya?',
          clear: true,
          add: [poly('s', at(SHAPES.trapesium, 200, 110, 1.7), 'neg')],
          ask: {
            options: [
              { t: 'trapesium', ok: true, why: 'Sisi atas dan bawah sejajar, sisi miringnya tidak. Hanya satu pasang.' },
              { t: 'jajargenjang', why: 'Jajargenjang punya dua pasang sisi sejajar.' },
              { t: 'layang-layang', why: 'Layang-layang tidak punya sisi sejajar.' },
            ],
          },
        },
        {
          say: 'Sisi atas sejajar sisi bawah. Sisi kiri dan kanan tidak sejajar. Itu trapesium.',
          add: [T('a', '{g:trapesium}', 200, 210, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Segi empat dengan 4 sisi sama panjang dan 4 sudut siku-siku adalah …',
      options: [
        { t: 'persegi', ok: true },
        { t: 'belah ketupat', why: 'Sudut belah ketupat tidak harus siku-siku.' },
        { t: 'persegi panjang', why: 'Sisi persegi panjang tidak harus sama semua.' },
      ],
      steps: ['4 sisi sama + 4 siku-siku → persegi.'],
    },
    {
      q: 'Bangun ini bernama …',
      fig: [poly('f', at(SHAPES['belah ketupat'], 200, 150, 2), 'pos')],
      options: [
        { t: 'belah ketupat', ok: true },
        { t: 'persegi', why: 'Sudutnya tidak siku-siku.' },
        { t: 'layang-layang', why: 'Keempat sisinya sama panjang.' },
      ],
      steps: ['4 sisi sama, sudut tidak siku-siku.'],
    },
    {
      type: 'num',
      q: 'Jajargenjang punya berapa pasang sisi sejajar?',
      ans: ['2'],
      wrong: { '1': 'Itu trapesium.', '4': 'Satu pasang = dua sisi berhadapan.' },
      steps: ['Atas ∥ bawah, kiri ∥ kanan.'],
    },
    {
      q: 'Bangun ini bernama …',
      fig: [poly('f', at(SHAPES['layang-layang'], 200, 145, 2), 'ok')],
      options: [
        { t: 'layang-layang', ok: true },
        { t: 'belah ketupat', why: 'Sisi atas lebih pendek dari sisi bawah.' },
        { t: 'trapesium', why: 'Tidak ada sisi yang sejajar.' },
      ],
      steps: ['Dua pasang sisi berdekatan sama panjang.'],
    },
    {
      q: 'Pernyataan yang benar adalah …',
      options: [
        { t: 'setiap persegi adalah persegi panjang', ok: true },
        { t: 'setiap persegi panjang adalah persegi', why: 'Persegi panjang belum tentu keempat sisinya sama.' },
        { t: 'trapesium punya dua pasang sisi sejajar', why: 'Trapesium hanya satu pasang.' },
      ],
      steps: ['Persegi punya semua ciri persegi panjang.'],
    },
  ],
};

// ---------- 5.2 Segitiga dan menyusun bangun ----------
const TRI = {
  'sama sisi': [[0, -40], [46, 40], [-46, 40]],
  'sama kaki': [[0, -50], [32, 40], [-32, 40]],
  'siku-siku': [[-40, -40], [40, 40], [-40, 40]],
};

const l2 = {
  id: 'k4b5-2',
  title: 'Segitiga dan Menyusun Bangun',
  hook: 'Segitiga dibedakan dari sisinya (sama sisi, sama kaki) dan sudutnya (siku-siku). Bangun besar bisa disusun dari segitiga dan segi empat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segitiga ini punya satu sudut siku-siku. Apa namanya?',
          add: [poly('s', at(TRI['siku-siku'], 200, 120, 1.4), 'acc'), { id: 'm', t: 'arc', x: 144, y: 176, r: 18, a1: 0, a2: 90, c: 'neg', right: true }],
          ask: {
            options: [
              { t: 'segitiga siku-siku', ok: true, why: 'Punya satu sudut siku-siku di pojok kiri bawah.' },
              { t: 'segitiga sama sisi', why: 'Sisi miringnya lebih panjang dari dua sisi lain.' },
              { t: 'persegi', why: 'Bangun ini hanya punya 3 sisi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tiga macam segitiga',
      steps: [
        {
          say: 'Segitiga sama sisi: ketiga sisinya sama panjang. Segitiga sama kaki: dua sisinya sama panjang. Segitiga siku-siku: punya satu sudut siku-siku.',
          clear: true,
          add: Object.entries(TRI).flatMap(([n, pts], i) => [poly(`t${i}`, at(pts, 70 + i * 130, 110), ['pos', 'ok', 'acc'][i]), T(`l${i}`, n, 70 + i * 130, 175, { size: 15 })]),
        },
      ],
    },
    {
      title: 'Menyusun bangun',
      steps: [
        {
          say: 'Dua segitiga siku-siku yang sama bisa disusun menjadi persegi panjang.',
          clear: true,
          add: [poly('a', [[60, 70], [160, 130], [60, 130]], 'acc'), poly('b', [[220, 70], [320, 70], [320, 130]], 'neg')],
        },
        {
          say: 'Geser segitiga merah sampai sisi miringnya menempel. Jadilah persegi panjang.',
          set: { b: { x: -160 } },
          add: [T('k', '2 segitiga siku-siku = 1 persegi panjang', 200, 190, { size: 16, c: 'ok' })],
        },
        {
          say: 'Dua segitiga yang sama bisa juga disusun menjadi jajargenjang, kalau salah satunya dibalik.',
          add: [poly('c', [[140, 210], [240, 210], [180, 260]], 'pos'), poly('d', [[240, 210], [280, 260], [180, 260]], 'ok'), T('k2', 'jajargenjang', 330, 235, { size: 15 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga dengan tepat dua sisi sama panjang disebut apa?',
          clear: true,
          add: [poly('s', at(TRI['sama kaki'], 200, 120, 1.5), 'ok')],
          ask: {
            options: [
              { t: 'segitiga sama kaki', ok: true, why: 'Dua sisi miringnya sama panjang, seperti dua kaki.' },
              { t: 'segitiga sama sisi', why: 'Sama sisi berarti ketiga sisinya sama.' },
              { t: 'segitiga siku-siku', why: 'Tidak ada sudut siku-siku.' },
            ],
          },
        },
        {
          say: 'Dua sisinya sama panjang. Itu segitiga sama kaki.',
          add: [T('a', '{g:segitiga sama kaki}', 200, 230, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Segitiga yang ketiga sisinya sama panjang disebut …',
      options: [
        { t: 'segitiga sama sisi', ok: true },
        { t: 'segitiga sama kaki', why: 'Sama kaki hanya dua sisi sama.' },
        { t: 'segitiga siku-siku', why: 'Siku-siku dilihat dari sudutnya.' },
      ],
      steps: ['Ketiga sisi sama → sama sisi.'],
    },
    {
      type: 'num',
      q: 'Berapa segitiga siku-siku yang sama untuk menyusun satu persegi panjang?',
      ans: ['2'],
      wrong: { '4': 'Dua segitiga sudah cukup, ditempel pada sisi miringnya.' },
      steps: ['Dua segitiga ditempel sisi miringnya.'],
    },
    {
      q: 'Pojok buku membentuk sudut siku-siku. Segitiga yang punya sudut seperti itu adalah …',
      options: [
        { t: 'segitiga siku-siku', ok: true },
        { t: 'segitiga sama sisi', why: 'Sudut segitiga sama sisi lebih kecil dari siku-siku.' },
      ],
      steps: ['Sudut siku-siku → segitiga siku-siku.'],
    },
    {
      type: 'num',
      q: 'Segitiga sama sisi punya berapa sisi yang sama panjang?',
      ans: ['3'],
      wrong: { '2': 'Itu segitiga sama kaki.' },
      steps: ['Semua sisi sama: 3.'],
    },
    {
      q: 'Bangun ini bernama …',
      fig: [poly('f', at(TRI['sama sisi'], 200, 150, 1.6), 'pos')],
      options: [
        { t: 'segitiga sama sisi', ok: true },
        { t: 'segitiga siku-siku', why: 'Tidak ada sudut siku-siku.' },
        { t: 'belah ketupat', why: 'Bangun ini hanya punya 3 sisi.' },
      ],
      steps: ['3 sisi sama panjang.'],
    },
  ],
};

export default {
  id: 'k4b5',
  no: 5,
  title: 'Bangun Datar',
  desc: 'Ciri persegi, persegi panjang, jajargenjang, trapesium, belah ketupat, dan layang-layang; macam segitiga; serta menyusun bangun dari segitiga.',
  lessons: [l1, l2],
  extra: [
    {
      q: 'Segi empat yang tidak punya sisi sejajar adalah …',
      options: [
        { t: 'layang-layang', ok: true },
        { t: 'persegi', why: 'Persegi punya 2 pasang sisi sejajar.' },
        { t: 'trapesium', why: 'Trapesium punya 1 pasang sisi sejajar.' },
      ],
      steps: ['Layang-layang tidak punya sisi sejajar.'],
    },
    {
      type: 'num',
      q: 'Berapa sudut siku-siku pada persegi panjang?',
      ans: ['4'],
      wrong: { '2': 'Semua pojoknya siku-siku.' },
      steps: ['4 pojok, semua siku-siku.'],
    },
    {
      q: 'Belah ketupat dan persegi sama-sama punya …',
      options: [
        { t: '4 sisi sama panjang', ok: true },
        { t: '4 sudut siku-siku', why: 'Sudut belah ketupat tidak harus siku-siku.' },
        { t: '3 sisi', why: 'Keduanya segi empat.' },
      ],
      steps: ['Keduanya 4 sisi sama panjang.'],
    },
  ],
};
