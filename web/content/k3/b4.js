// Kelas 3 · Bab 4: Unsur-unsur Bangun Datar
import { T, ln, dot } from '../helpers.js';

const rad = (d) => (d * Math.PI) / 180;
// Sudut dengan titik sudut (x, y), kaki pertama mendatar ke kanan, kaki kedua pada derajat deg
function angle(p, x, y, deg, L = 110, c = 'pos') {
  return [
    ln(`${p}a`, x, y, x + L, y, { sw: 3.5, c: 'ink', draw: false }),
    ln(`${p}b`, x, y, x + L * Math.cos(rad(deg)), y - L * Math.sin(rad(deg)), { sw: 3.5, c: 'ink', draw: false }),
    { id: `${p}m`, t: 'arc', x, y, r: 26, a1: 0, a2: deg, c, right: deg === 90 },
    dot(`${p}v`, x, y, 'ink', { r: 4, stroke: 'none' }),
  ];
}
// Pojok kertas (penguji siku-siku)
const tester = (id, x, y, o = {}) => ({ id, t: 'poly', x, y, pts: [[0, 0], [70, 0], [70, -10], [10, -10], [10, -70], [0, -70]], fill: 'acc-soft', stroke: 'acc', sw: 2, o: 0.85, ...o });

// ---------- 4.1 Sudut siku-siku ----------
const l1 = {
  id: 'k3b4-1',
  title: 'Sudut Siku-siku',
  hook: 'Sudut siku-siku seperti pojok buku. Gunakan pojok kertas untuk memeriksa: sudut lain bisa lebih kecil atau lebih besar.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sudut mana yang sama dengan pojok buku?',
          add: [...angle('a', 30, 160, 50, 90), T('la', 'A', 80, 190, { size: 18 }), ...angle('b', 150, 160, 90, 90), T('lb', 'B', 200, 190, { size: 18 }), ...angle('c', 280, 160, 130, 90), T('lc', 'C', 300, 190, { size: 18 })],
          ask: {
            options: [
              { t: 'B', ok: true, why: 'Sudut B tegak lurus seperti pojok buku. Itu sudut siku-siku.' },
              { t: 'A', why: 'Sudut A lebih sempit dari pojok buku.' },
              { t: 'C', why: 'Sudut C lebih lebar dari pojok buku.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Periksa dengan pojok kertas',
      steps: [
        {
          say: 'Lipat kertas menjadi pojok yang tegak. Tempelkan pada sudut. Kalau pas, sudutnya siku-siku. Sudut siku-siku diberi tanda kotak kecil.',
          clear: true,
          add: [...angle('b', 150, 180, 90, 110), tester('tt', 150, 180)],
        },
        {
          say: 'Sudut yang lebih sempit dari pojok kertas lebih kecil dari siku-siku. Yang lebih lebar, lebih besar dari siku-siku.',
          clear: true,
          add: [...angle('a', 40, 180, 50, 90), tester('t1', 40, 180), T('la', 'lebih kecil', 85, 215, { size: 15, c: 'pos' }), ...angle('c', 260, 180, 130, 90), tester('t2', 260, 180), T('lc', 'lebih besar', 280, 215, { size: 15, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Di sekitar kita',
      steps: [
        {
          say: 'Pojok buku, pojok papan tulis, dan pojok ubin adalah sudut siku-siku. Jarum jam yang menunjuk pukul 3 juga membentuk sudut siku-siku.',
          clear: true,
          add: [{ id: 'cl', t: 'circle', x: 200, y: 130, r: 80, fill: 'paper', stroke: 'ink', sw: 3 }, ln('h1', 200, 130, 200, 70, { sw: 4, c: 'ink', draw: false }), ln('h2', 200, 130, 260, 130, { sw: 4, c: 'neg', draw: false }), { id: 'm', t: 'arc', x: 200, y: 130, r: 22, a1: 0, a2: 90, c: 'pos', right: true }, T('a', 'pukul 3', 200, 240, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa sudut siku-siku pada persegi panjang?',
          clear: true,
          add: [{ id: 'pp', t: 'rect', x: 200, y: 120, w: 200, h: 110, r: 0, fill: 'ok-soft', stroke: 'ok', sw: 3 }],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Keempat pojok persegi panjang adalah sudut siku-siku.' },
              { t: '2', why: 'Periksa semua pojok, bukan hanya dua.' },
              { t: '0', why: 'Pojok persegi panjang pas dengan pojok kertas.' },
            ],
          },
        },
        {
          say: 'Keempat pojoknya siku-siku.',
          add: [[100, 65, 0], [300, 65, 270], [300, 175, 180], [100, 175, 90]].map(([x, y, a], i) => ({ id: `m${i}`, t: 'arc', x, y, r: 18, a1: a - 90 < 0 ? a + 270 : a - 90, a2: a, c: 'pos', right: true })).concat([T('a', '{g:4} sudut siku-siku', 200, 230, { size: 24 })]),
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Sudut ini …',
      fig: angle('f', 140, 220, 90, 120),
      options: [
        { t: 'siku-siku', ok: true },
        { t: 'lebih kecil dari siku-siku', why: 'Kedua kaki tegak lurus, ada tanda kotak.' },
        { t: 'lebih besar dari siku-siku', why: 'Kedua kaki tegak lurus.' },
      ],
      steps: ['Tanda kotak berarti siku-siku.'],
    },
    {
      q: 'Sudut ini …',
      fig: angle('f', 120, 220, 40, 140),
      options: [
        { t: 'lebih kecil dari siku-siku', ok: true },
        { t: 'siku-siku', why: 'Kakinya lebih rapat dari pojok kertas.' },
        { t: 'lebih besar dari siku-siku', why: 'Kakinya lebih rapat, jadi lebih kecil.' },
      ],
      steps: ['Lebih sempit dari pojok kertas.'],
    },
    {
      q: 'Sudut ini …',
      fig: angle('f', 220, 220, 140, 120),
      options: [
        { t: 'lebih besar dari siku-siku', ok: true },
        { t: 'siku-siku', why: 'Kakinya lebih terbuka dari pojok kertas.' },
        { t: 'lebih kecil dari siku-siku', why: 'Kakinya lebih terbuka.' },
      ],
      steps: ['Lebih lebar dari pojok kertas.'],
    },
    {
      q: 'Jarum jam membentuk sudut siku-siku pada pukul …',
      options: [
        { t: '3.00', ok: true },
        { t: '6.00', why: 'Pukul 6 jarum membentuk garis lurus.' },
        { t: '12.00', why: 'Pukul 12 kedua jarum berimpit.' },
      ],
      steps: ['Pukul 3: jarum panjang ke 12, jarum pendek ke 3.'],
    },
    {
      type: 'num',
      q: 'Persegi punya berapa sudut siku-siku?',
      ans: ['4'],
      wrong: { '2': 'Keempat pojoknya siku-siku.' },
      steps: ['Keempat pojok persegi siku-siku.'],
    },
  ],
};

// ---------- 4.2 Garis sejajar dan tegak lurus ----------
const l2 = {
  id: 'k3b4-2',
  title: 'Garis Sejajar dan Tegak Lurus',
  hook: 'Garis sejajar tidak pernah bertemu, seperti rel kereta. Garis tegak lurus bertemu membentuk sudut siku-siku.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua rel kereta ini diperpanjang terus. Apakah keduanya akan bertemu?',
          add: [ln('r1', 40, 100, 360, 100, { sw: 5, c: 'ink', draw: false }), ln('r2', 40, 160, 360, 160, { sw: 5, c: 'ink', draw: false }), ...Array.from({ length: 8 }, (_, i) => ln(`s${i}`, 60 + i * 40, 92, 60 + i * 40, 168, { sw: 6, c: 'acc', draw: false, z: -1 }))],
          ask: {
            options: [
              { t: 'tidak pernah bertemu', ok: true, why: 'Jarak kedua rel selalu sama. Garis seperti ini disebut sejajar.' },
              { t: 'bertemu di ujung jauh', why: 'Rel terlihat menyempit dari kejauhan, tetapi jaraknya tetap sama.' },
              { t: 'bertemu di tengah', why: 'Kedua rel tidak saling menyilang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sejajar dan tegak lurus',
      steps: [
        {
          say: 'Garis sejajar: jaraknya selalu sama dan tidak pernah bertemu.',
          clear: true,
          add: [ln('a1', 40, 70, 180, 70, { sw: 3.5, c: 'pos', draw: false }), ln('a2', 40, 120, 180, 120, { sw: 3.5, c: 'pos', draw: false }), T('la', 'sejajar', 110, 160, { size: 18, c: 'pos' })],
        },
        {
          say: 'Garis tegak lurus: kedua garis bertemu dan membentuk sudut siku-siku.',
          add: [ln('b1', 230, 120, 370, 120, { sw: 3.5, c: 'neg', draw: false }), ln('b2', 300, 50, 300, 190, { sw: 3.5, c: 'neg', draw: false }), { id: 'bm', t: 'arc', x: 300, y: 120, r: 16, a1: 0, a2: 90, c: 'neg', right: true }, T('lb', 'tegak lurus', 300, 215, { size: 18, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Pada persegi panjang',
      steps: [
        {
          say: 'Pada persegi panjang, sisi atas sejajar dengan sisi bawah. Sisi kiri sejajar dengan sisi kanan.',
          clear: true,
          add: [{ id: 'pp', t: 'rect', x: 200, y: 120, w: 220, h: 120, r: 0, fill: 'ok-soft', stroke: 'ink', sw: 2 }, ln('t', 90, 60, 310, 60, { sw: 5, c: 'pos', draw: false }), ln('bt', 90, 180, 310, 180, { sw: 5, c: 'pos', draw: false })],
        },
        {
          say: 'Sisi yang bersebelahan, misalnya sisi bawah dan sisi kiri, saling tegak lurus.',
          add: [ln('l', 90, 60, 90, 180, { sw: 5, c: 'neg', draw: false }), { id: 'm', t: 'arc', x: 90, y: 180, r: 18, a1: 0, a2: 90, c: 'neg', right: true }, T('k', 'atas ∥ bawah,  kiri ⊥ bawah', 200, 230, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dua garis ini bertemu membentuk sudut siku-siku. Disebut apa?',
          clear: true,
          add: [ln('b1', 100, 150, 300, 150, { sw: 4, c: 'ink', draw: false }), ln('b2', 200, 50, 200, 250, { sw: 4, c: 'ink', draw: false }), { id: 'bm', t: 'arc', x: 200, y: 150, r: 18, a1: 0, a2: 90, c: 'pos', right: true }],
          ask: {
            options: [
              { t: 'tegak lurus', ok: true, why: 'Bertemu dan membentuk sudut siku-siku.' },
              { t: 'sejajar', why: 'Garis sejajar tidak pernah bertemu.' },
              { t: 'melengkung', why: 'Kedua garis lurus.' },
            ],
          },
        },
        {
          say: 'Dua garis yang bertemu membentuk sudut siku-siku disebut tegak lurus.',
          add: [T('a', '{g:tegak lurus}', 320, 90, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Dua garis yang jaraknya selalu sama dan tidak pernah bertemu disebut …',
      options: [
        { t: 'sejajar', ok: true },
        { t: 'tegak lurus', why: 'Garis tegak lurus saling bertemu.' },
        { t: 'berpotongan', why: 'Garis berpotongan saling bertemu.' },
      ],
      steps: ['Tidak pernah bertemu → sejajar.'],
    },
    {
      q: 'Contoh garis tegak lurus adalah …',
      options: [
        { t: 'tiang bendera dan tanah datar', ok: true },
        { t: 'dua rel kereta', why: 'Rel kereta sejajar.' },
        { t: 'garis-garis pada buku tulis', why: 'Garis buku tulis sejajar.' },
      ],
      steps: ['Tiang tegak berdiri di tanah datar.', 'Membentuk sudut siku-siku.'],
    },
    {
      type: 'num',
      q: 'Persegi panjang punya berapa pasang sisi yang sejajar?',
      ans: ['2'],
      wrong: { '4': 'Atas-bawah adalah satu pasang, kiri-kanan pasangan kedua.', '1': 'Kiri dan kanan juga sejajar.' },
      steps: ['Atas ∥ bawah, kiri ∥ kanan.', '2 pasang.'],
    },
    {
      q: 'Sisi bawah dan sisi kiri persegi panjang saling …',
      options: [
        { t: 'tegak lurus', ok: true },
        { t: 'sejajar', why: 'Keduanya bertemu di pojok.' },
      ],
      steps: ['Bertemu di pojok dengan sudut siku-siku.'],
    },
    {
      q: 'Garis-garis pada buku tulis bergaris saling …',
      options: [
        { t: 'sejajar', ok: true },
        { t: 'tegak lurus', why: 'Garis-garisnya tidak saling bertemu.' },
      ],
      steps: ['Jaraknya sama, tidak bertemu.'],
    },
  ],
};

export default {
  id: 'k3b4',
  no: 4,
  title: 'Unsur-unsur Bangun Datar',
  desc: 'Sudut siku-siku dan cara memeriksanya, sudut yang lebih kecil atau lebih besar, serta garis sejajar dan tegak lurus pada bangun datar.',
  lessons: [l1, l2],
  extra: [
    {
      q: 'Benda yang pojoknya membentuk sudut siku-siku adalah …',
      options: [
        { t: 'buku', ok: true },
        { t: 'bola', why: 'Bola tidak punya pojok.' },
        { t: 'piring bundar', why: 'Piring bundar tidak punya pojok.' },
      ],
      steps: ['Pojok buku siku-siku.'],
    },
    {
      type: 'num',
      q: 'Segitiga yang punya satu sudut siku-siku punya berapa sudut siku-siku?',
      ans: ['1'],
      wrong: { '3': 'Hanya satu yang siku-siku.' },
      steps: ['Disebutkan satu sudut siku-siku.'],
    },
    {
      q: 'Dua garis yang bertemu tetapi tidak membentuk sudut siku-siku disebut …',
      options: [
        { t: 'berpotongan', ok: true },
        { t: 'sejajar', why: 'Garis sejajar tidak bertemu.' },
        { t: 'tegak lurus', why: 'Tegak lurus harus membentuk sudut siku-siku.' },
      ],
      steps: ['Bertemu → berpotongan.', 'Bukan siku-siku → bukan tegak lurus.'],
    },
  ],
};
