// Kelas 10 · Bab 1: Eksponen dan Logaritma
import { T, ln, dot, hop, eqRow } from '../helpers.js';
import { plane, lineOn } from '../k8/plot.js';
import { tag, curve, chain } from './kit.js';

const sup = (n) => `{^:${n}}`;

// ---------- 1.1 Fungsi eksponen ----------
const cell = (i) => [70 + (i % 4) * 32, 100 + Math.floor(i / 4) * 32];
const germ = (i, from) => ({ id: `g${i}`, t: 'circle', x: cell(i)[0], y: cell(i)[1], r: 11, fill: 'ok', stroke: 'ink', sw: 1.5, ...(from !== undefined ? { from: { x: cell(from)[0], y: cell(from)[1] } } : {}) });
const born = (a, b) => Array.from({ length: b - a }, (_, k) => germ(a + k, a + k - a));

const CG = { x: 50, y: 25, w: 300, h: 230, xmin: 0, xmax: 5, ymin: 0, ymax: 32 };
const PG = plane('pl', { ...CG, ystep: 4, yevery: 8, xl: 't' });

const decay = (n) => ({
  id: 'br',
  t: 'bars',
  x: 210,
  y: 150,
  w: 280,
  h: 170,
  max: 80,
  tick: 20,
  vals: true,
  fc: 'neg',
  data: [80, 40, 20, 10, 5].map((v, i) => ({ l: `jam ${i}`, v, show: i < n ? 1 : 0 })),
});

const l1 = {
  id: 'k10b1-1',
  title: 'Fungsi Eksponen',
  hook: 'Sesuatu yang berlipat ganda setiap waktu tumbuh sangat cepat. Polanya ditulis dengan pangkat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Satu bakteri membelah menjadi dua setiap jam. Setelah 10 jam, kira-kira ada berapa bakteri?',
          add: [germ(0), T('q', 'membelah 2 setiap jam', 280, 100, { size: 18 }), T('q2', '10 jam → ?', 280, 140, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '1.024', ok: true, why: 'Setiap jam jumlahnya dikali 2. Dikali 2 sebanyak 10 kali = 2¹⁰ = 1.024.' },
              { t: '20', why: 'Itu kalau bertambah 2 setiap jam. Bakteri berlipat dua, jadi dikali 2.' },
              { t: '11', why: 'Bakteri tidak bertambah satu-satu, tetapi berlipat dua.' },
              { t: '100', why: 'Hitung: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1.024.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Berlipat dua',
      steps: [
        {
          say: 'Jam ke-0: ada 1 bakteri.',
          clear: true,
          add: [germ(0), T('h0', `jam 0: 1 = 2${sup(0)}`, 290, 80, { size: 18 })],
        },
        {
          say: 'Jam ke-1: bakteri itu membelah. Sekarang 2.',
          add: [born(1, 2), T('h1', `jam 1: 2 = 2${sup(1)}`, 290, 112, { size: 18 })],
        },
        {
          say: 'Jam ke-2: masing-masing membelah lagi. 4 bakteri.',
          add: [born(2, 4), T('h2', `jam 2: 4 = 2${sup(2)}`, 290, 144, { size: 18 })],
        },
        {
          say: 'Jam ke-3: 8 bakteri. Jumlahnya selalu dikali 2.',
          add: [born(4, 8), T('h3', `jam 3: 8 = 2${sup(3)}`, 290, 176, { size: 18 })],
        },
        {
          say: 'Jam ke-4: 16 bakteri.',
          add: [born(8, 16), T('h4', `jam 4: 16 = 2${sup(4)}`, 290, 208, { size: 18 })],
        },
        {
          say: 'Setelah t jam, banyaknya 2 pangkat t. Waktunya ada di pangkat. Inilah fungsi eksponen.',
          add: [T('f', `banyak bakteri = 2${sup('t')}`, 200, 262, { size: 24, c: 'pos' })],
          pulse: ['f'],
        },
      ],
    },
    {
      title: 'Lambat lalu melesat',
      steps: [
        {
          say: 'Bandingkan dengan sesuatu yang bertambah 3 setiap jam: 1, 4, 7, 10, dan seterusnya. Garisnya lurus.',
          clear: true,
          add: [...PG.els, lineOn('ln', PG, 3, 1, CG, { c: 'acc' }), tag('tl', 'y = 1 + 3t', 110, 72, 'acc', 15)],
        },
        {
          say: 'Sekarang 2 pangkat t: 1, 2, 4, 8, 16, 32. Awalnya kalah dari garis lurus.',
          add: [...[0, 1, 2, 3, 4, 5].map((t) => dot(`p${t}`, ...PG.at(t, 2 ** t), 'pos')), curve('cv', PG, (x) => 2 ** x, CG, { z: -1 }), tag('te', `y = 2${sup('t')}`, 110, 45, 'pos', 15)],
        },
        {
          say: 'Tapi setelah jam ke-4, 2 pangkat t menyusul lalu melesat jauh. Grafik eksponen melengkung naik makin curam.',
          pulse: ['p4', 'p5'],
        },
        {
          say: 'Perhatikan juga: grafik 2 pangkat t memotong sumbu y di 1, karena 2 pangkat 0 sama dengan 1.',
          pulse: ['p0'],
        },
      ],
    },
    {
      title: 'Meluruh',
      steps: [
        {
          say: 'Kebalikannya juga ada. Di dalam darah ada 80 miligram obat. Setiap jam, obatnya tinggal setengah.',
          clear: true,
          add: [decay(1), tag('tt', 'obat (mg), tinggal ½ setiap jam', 210, 25, 'ink', 14)],
        },
        {
          say: '80, lalu 40, lalu 20.',
          set: { br: decay(3) },
        },
        {
          say: 'Lalu 10, lalu 5. Selalu dikali setengah. Rumusnya: 80 kali setengah pangkat t.',
          set: { br: decay(5) },
          add: [tag('f', `80 × (½)${sup('t')}`, 300, 75, 'neg', 18)],
        },
      ],
    },
    {
      title: 'Bentuk umum',
      steps: [
        {
          say: 'Fungsi eksponen ditulis y sama dengan a kali b pangkat x. a adalah nilai awal, b adalah pengali setiap langkah.',
          clear: true,
          add: [T('f', `y = {a:a} × {p:b}${sup('x')}`, 200, 80, { size: 40 }), T('a', '{a:a} = nilai awal', 200, 140, { size: 20 }), T('b', '{p:b} = pengali setiap langkah', 200, 172, { size: 20 })],
        },
        {
          say: 'Kalau b lebih dari 1, nilainya tumbuh. Kalau b di antara 0 dan 1, nilainya meluruh.',
          add: [T('g1', 'b > 1  →  tumbuh', 200, 225, { size: 20, c: 'ok' }), T('g2', '0 < b < 1  →  meluruh', 200, 257, { size: 20, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sebuah pesan berantai: setiap orang meneruskannya ke 3 orang baru. Pada putaran ke-4, berapa orang baru yang menerima?',
          clear: true,
          add: [T('q', 'putaran 1: 3 orang', 200, 90, { size: 22 }), T('q2', 'putaran 2: 9 orang', 200, 130, { size: 22 }), T('q3', 'putaran 4: ?', 200, 190, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '81', ok: true, why: '3 × 3 × 3 × 3 = 3⁴ = 81.' },
              { t: '12', why: 'Itu 3 × 4. Jumlahnya dikali 3 setiap putaran, bukan ditambah.' },
              { t: '27', why: '27 adalah putaran ke-3. Putaran ke-4: 27 × 3.' },
              { t: '64', why: '64 = 4³. Yang benar 3⁴.' },
            ],
          },
        },
        {
          say: 'Setiap putaran dikali 3: 3, 9, 27, 81. Jadi 3 pangkat 4 sama dengan 81 orang.',
          set: { q: { y: 60 }, q2: { y: 100 }, q3: { text: `putaran 4: 3${sup(4)} = {g:81}`, y: 200 } },
          add: [T('q4', 'putaran 3: 27 orang', 200, 140, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jika f(x) = 3ˣ, nilai f(4) adalah …',
      ans: ['81'],
      wrong: { '12': '3ˣ berarti 3 dipangkatkan x, bukan 3 dikali x.', '64': '3⁴ = 3 × 3 × 3 × 3 = 81.' },
      steps: ['f(4) = 3⁴.', '= 3 × 3 × 3 × 3 = 81.'],
    },
    {
      q: 'Manakah fungsi yang menggambarkan pertumbuhan?',
      options: [
        { t: 'y = 2 × 3ˣ', ok: true },
        { t: 'y = 5 × (½)ˣ', why: 'Pengalinya ½, kurang dari 1. Itu peluruhan.' },
        { t: 'y = 100 × (0,9)ˣ', why: '0,9 < 1, jadi nilainya terus mengecil.' },
        { t: 'y = 8 × (¼)ˣ', why: '¼ < 1, jadi meluruh.' },
      ],
      steps: ['Tumbuh jika pengali b > 1.', 'Hanya y = 2 × 3ˣ yang punya b = 3 > 1.'],
    },
    {
      type: 'num',
      q: 'Tabungan Rp1.000.000 mendapat bunga majemuk 10% per tahun (bunga ikut berbunga). Setelah 2 tahun, tabungan menjadi Rp …',
      ans: ['1210000'],
      wrong: { '1200000': 'Itu bunga tunggal. Pada bunga majemuk, tahun kedua bunganya dihitung dari Rp1.100.000.', '1100000': 'Itu baru 1 tahun.' },
      steps: ['Setiap tahun dikali 1,1.', '1.000.000 × 1,1 × 1,1 = 1.000.000 × 1,21 = Rp1.210.000.'],
    },
    {
      type: 'num',
      q: 'Zat radioaktif 64 gram meluruh menjadi setengahnya setiap 5 tahun. Sisa zat setelah 15 tahun adalah … gram',
      ans: ['8'],
      wrong: { '16': '15 tahun = 3 kali waktu paruh: 64 → 32 → 16 → 8.', '32': 'Itu baru 5 tahun.', '21': 'Zat tidak berkurang sama banyak, tetapi tinggal setengah.' },
      steps: ['15 ÷ 5 = 3 kali paruh.', '64 × (½)³ = 64 ÷ 8 = 8 gram.'],
    },
    {
      q: 'Grafik y = 2ˣ memotong sumbu y di titik …',
      options: [
        { t: '(0, 1)', ok: true },
        { t: '(0, 0)', why: '2⁰ = 1, bukan 0.' },
        { t: '(0, 2)', why: 'Di sumbu y, x = 0. 2⁰ = 1.' },
        { t: '(1, 0)', why: 'Grafik y = 2ˣ tidak pernah menyentuh sumbu x.' },
      ],
      steps: ['Titik potong sumbu y: x = 0.', 'y = 2⁰ = 1, jadi (0, 1).'],
    },
  ],
};

// ---------- 1.2 Persamaan eksponen ----------
const node = (id, v, x, y, leaf = false) => ({ id, t: 'circle', x, y, r: 15, fill: leaf ? 'acc' : 'paper', stroke: 'ink', sw: 2, label: String(v), lsize: 15 });
const TREE = [
  ['n0', 32, 110, 45], ['n1', 2, 80, 95, 1], ['n2', 16, 140, 95],
  ['n3', 2, 110, 145, 1], ['n4', 8, 170, 145],
  ['n5', 2, 140, 195, 1], ['n6', 4, 200, 195],
  ['n7', 2, 170, 245, 1], ['n8', 2, 230, 245, 1],
];
const EDGES = [['n0', 'n1'], ['n0', 'n2'], ['n2', 'n3'], ['n2', 'n4'], ['n4', 'n5'], ['n4', 'n6'], ['n6', 'n7'], ['n6', 'n8']];
const at = Object.fromEntries(TREE.map(([id, , x, y]) => [id, [x, y]]));
const treeEls = () => [
  ...EDGES.map(([a, b], i) => ln(`e${i}`, ...at[a], ...at[b], { sw: 2, c: 'mut', draw: false, z: -1 })),
  ...TREE.map(([id, v, x, y, leaf]) => node(id, v, x, y, !!leaf)),
];

const l2 = {
  id: 'k10b1-2',
  title: 'Persamaan Eksponen',
  hook: 'Kalau basisnya sama, cukup samakan pangkatnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '2 pangkat x sama dengan 32. Berapa x?',
          add: [T('q', `2${sup('x')} = 32`, 200, 140, { size: 48 })],
          ask: {
            options: [
              { t: '5', ok: true, why: '2 × 2 × 2 × 2 × 2 = 32. Ada lima angka 2.' },
              { t: '16', why: '16 adalah 32 ÷ 2. Pangkat bukan pembagian.' },
              { t: '30', why: 'Pangkat tidak dicari dengan pengurangan.' },
              { t: '6', why: '2⁶ = 64, terlalu besar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pecah menjadi faktor 2',
      steps: [
        {
          say: 'Pecah 32 dengan pohon faktor. 32 sama dengan 2 kali 16, 16 sama dengan 2 kali 8, dan seterusnya.',
          clear: true,
          add: [...treeEls(), T('eq', `2${sup('x')} = 32`, 310, 60, { size: 28 })],
        },
        {
          say: 'Hitung daun kuningnya. Ada lima angka 2. Jadi 32 sama dengan 2 pangkat 5.',
          pulse: ['n1', 'n3', 'n5', 'n7', 'n8'],
          add: [T('r1', `32 = 2${sup(5)}`, 310, 115, { size: 26, c: 'acc' })],
        },
        {
          say: 'Sekarang kedua ruas berbasis 2: 2 pangkat x sama dengan 2 pangkat 5.',
          add: [T('r2', `2${sup('x')} = 2${sup(5)}`, 310, 170, { size: 28 })],
        },
        {
          say: 'Basisnya sama, jadi pangkatnya juga harus sama. x sama dengan 5.',
          add: [T('r3', 'x = 5', 310, 225, { size: 32, c: 'ok' })],
          pulse: ['r3'],
        },
      ],
    },
    {
      title: 'Aturannya',
      steps: [
        {
          say: 'Aturannya: kalau a pangkat f sama dengan a pangkat g, maka f sama dengan g. Syaratnya basis a positif dan bukan 1.',
          clear: true,
          add: [T('r', `a${sup('f')} = a${sup('g')}  →  f = g`, 200, 110, { size: 36, c: 'pos' }), T('s', 'syarat: a > 0 dan a ≠ 1', 200, 175, { size: 20, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Basis berbeda',
      steps: [
        {
          say: '9 pangkat x sama dengan 27. Basisnya berbeda. Cari basis yang sama: 9 sama dengan 3 kuadrat, 27 sama dengan 3 pangkat 3.',
          clear: true,
          add: [T('a', `9${sup('x')} = 27`, 200, 45, { size: 30 }), T('b', `(3${sup(2)})${sup('x')} = 3${sup(3)}`, 200, 95, { size: 30 })],
        },
        {
          say: 'Pangkat dari pangkat dikali: 3 pangkat 2x sama dengan 3 pangkat 3.',
          add: [T('c', `{p:3}${sup('2x')} = {p:3}${sup(3)}`, 200, 145, { size: 30 })],
        },
        {
          say: 'Basis sudah sama, samakan pangkatnya: 2x sama dengan 3. Jadi x sama dengan 3 per 2.',
          add: [T('d', '2x = 3', 200, 195, { size: 30 }), eqRow('e', 255, ['x =', [3, 2]], { size: 30, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Pangkat berbentuk aljabar',
      steps: [
        {
          say: '2 pangkat x tambah 1 sama dengan 16. Ubah 16 menjadi 2 pangkat 4.',
          clear: true,
          add: [T('a', `2${sup('x + 1')} = 16`, 200, 60, { size: 32 }), T('b', `2${sup('x + 1')} = 2${sup(4)}`, 200, 120, { size: 32 })],
        },
        {
          say: 'Samakan pangkatnya: x tambah 1 sama dengan 4, jadi x sama dengan 3.',
          add: [T('c', 'x + 1 = 4', 200, 180, { size: 30 }), T('d', 'x = 3', 200, 235, { size: 32, c: 'ok' })],
        },
        {
          say: 'Satu lagi: 5 pangkat x dikurangi 2 sama dengan 1. Ingat, 1 sama dengan 5 pangkat 0. Jadi x dikurangi 2 sama dengan 0, x sama dengan 2.',
          clear: true,
          add: [T('a', `5${sup('x − 2')} = 1`, 200, 70, { size: 32 }), T('b', `5${sup('x − 2')} = 5${sup(0)}`, 200, 130, { size: 32 }), T('c', 'x − 2 = 0  →  x = 2', 200, 200, { size: 30, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 3 pangkat x dikurangi 1 sama dengan 81. Berapa x?',
          clear: true,
          add: [T('q', `3${sup('x − 1')} = 81`, 200, 130, { size: 44 })],
          ask: {
            options: [
              { t: '5', ok: true, why: '81 = 3⁴, jadi x − 1 = 4 dan x = 5.' },
              { t: '4', why: 'x − 1 = 4, jadi x = 5.' },
              { t: '28', why: '81 ÷ 3 = 27 bukan cara menyelesaikan persamaan pangkat. Ubah 81 menjadi 3⁴.' },
              { t: '3', why: '3³ = 27, bukan 81.' },
            ],
          },
        },
        {
          say: '81 sama dengan 3 pangkat 4. Maka x dikurangi 1 sama dengan 4, dan x sama dengan 5.',
          add: [T('a', `3${sup('x − 1')} = 3${sup(4)}`, 200, 190, { size: 28 }), T('b', 'x − 1 = 4  →  x = 5', 200, 240, { size: 28, c: 'ok' })],
          set: { q: { y: 80, size: 34 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai x yang memenuhi 5ˣ = 125 adalah …',
      ans: ['3'],
      wrong: { '25': '125 ÷ 5 = 25 bukan pangkatnya. 5 × 5 × 5 = 125.' },
      steps: ['125 = 5³.', '5ˣ = 5³ → x = 3.'],
    },
    {
      type: 'num',
      q: 'Nilai x yang memenuhi 2³ˣ = 64 adalah …',
      ans: ['2'],
      wrong: { '6': '3x = 6, jadi x = 2.', '21': 'Ubah 64 menjadi 2⁶.' },
      steps: ['64 = 2⁶.', '3x = 6 → x = 2.'],
    },
    {
      type: 'num',
      q: 'Nilai x yang memenuhi 8ˣ = 32 adalah … (boleh ditulis sebagai pecahan)',
      ans: ['5/3'],
      wrong: { '4': '8 dan 32 bukan pangkat satu sama lain. Ubah keduanya ke basis 2.', '0,6': 'Terbalik. 3x = 5, jadi x = 5/3.' },
      steps: ['8 = 2³ dan 32 = 2⁵.', '2³ˣ = 2⁵ → 3x = 5 → x = 5/3.'],
    },
    {
      type: 'num',
      q: 'Nilai x yang memenuhi 7²ˣ⁻⁴ = 1 adalah …',
      ans: ['2'],
      wrong: { '0': '1 = 7⁰, jadi 2x − 4 = 0 dan x = 2.', '2,5': '2x − 4 = 0, bukan 1.' },
      steps: ['1 = 7⁰.', '2x − 4 = 0 → x = 2.'],
    },
    {
      type: 'num',
      q: 'Nilai x yang memenuhi 3ˣ⁺² = 1/9 adalah …',
      ans: ['-4'],
      wrong: { '0': '1/9 = 3⁻², jadi x + 2 = −2.', '-2': 'x + 2 = −2, jadi x = −4.', '4': 'Pangkatnya negatif: 1/9 = 3⁻².' },
      steps: ['1/9 = 3⁻².', 'x + 2 = −2 → x = −4.'],
    },
  ],
};

// ---------- 1.3 Logaritma ----------
const C2 = chain('c', [1, 2, 4, 8, 16, 32, 64], 35, 55, 150);
const hops2 = (a, b, c = 'acc', o = {}) => Array.from({ length: b - a }, (_, k) => hop(`h${a + k}`, C2.X(a + k), C2.X(a + k + 1), 132, { label: '×2', c, lsize: 12, ...o }));
const C10 = chain('t', [1, 10, 100, 1000], 65, 90, 150, { w: 60 });

const l3 = {
  id: 'k10b1-3',
  title: 'Logaritma',
  hook: 'Logaritma menjawab pertanyaan: dipangkatkan berapa?',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '2 dipangkatkan berapa supaya hasilnya 64?',
          add: [T('q', `2${sup('?')} = 64`, 200, 140, { size: 48 })],
          ask: {
            options: [
              { t: '6', ok: true, why: '2, 4, 8, 16, 32, 64. Enam kali dikali 2.' },
              { t: '32', why: '32 adalah 64 ÷ 2, bukan pangkatnya.' },
              { t: '8', why: '8 × 8 = 64, tetapi basisnya 2, bukan 8.' },
              { t: '5', why: '2⁵ = 32. Kurang satu kali lagi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Hitung lompatan',
      steps: [
        {
          say: 'Mulai dari 1. Setiap lompatan dikali 2.',
          clear: true,
          add: [...C2.els],
        },
        {
          say: 'Dari 1 ke 8: satu, dua, tiga lompatan. Jadi 2 pangkat 3 sama dengan 8.',
          add: [hops2(0, 3), T('cnt', `3 lompatan: 2${sup(3)} = 8`, 200, 215, { size: 22 })],
          pulse: ['c3'],
        },
        {
          say: 'Banyak lompatan itu diberi nama logaritma. Ditulis: logaritma 8 dengan basis 2 sama dengan 3.',
          add: [T('lg', `${sup(2)}log 8 = 3`, 200, 260, { size: 30, c: 'pos' })],
          pulse: ['lg'],
        },
        {
          say: 'Dari 1 ke 64: enam lompatan. Jadi logaritma 64 basis 2 sama dengan 6.',
          add: [hops2(3, 6)],
          set: { cnt: { text: `6 lompatan: 2${sup(6)} = 64` }, lg: { text: `${sup(2)}log 64 = 6` } },
          pulse: ['c6'],
        },
      ],
    },
    {
      title: 'Pangkat dan logaritma',
      steps: [
        {
          say: 'Pangkat dan logaritma adalah dua cara menulis hal yang sama.',
          clear: true,
          add: [T('a', `{p:2}${sup(3)} = {a:8}`, 200, 70, { size: 40 }), T('ar', '⇕', 200, 125, { size: 30, c: 'mut' }), T('b', `${sup(2)}log {a:8} = {g:3}`, 200, 180, { size: 40 })],
        },
        {
          say: 'Angka kecil di kiri atas adalah basis, yaitu 2. Angka setelah log adalah hasil pangkatnya, disebut numerus, yaitu 8. Jawabannya adalah pangkatnya, yaitu 3.',
          add: [T('k', 'basis 2 · numerus {a:8} · hasil {g:3}', 200, 245, { size: 18 })],
        },
        {
          say: 'Basis harus positif dan bukan 1. Numerus harus positif.',
          add: [T('s', 'basis > 0, basis ≠ 1, numerus > 0', 200, 278, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Basis 10',
      steps: [
        {
          say: 'Basis yang paling sering dipakai adalah 10. Setiap lompatan dikali 10.',
          clear: true,
          add: [...C10.els, ...[0, 1, 2].map((i) => hop(`h${i}`, C10.X(i), C10.X(i + 1), 132, { label: '×10', lsize: 12 }))],
        },
        {
          say: 'Dari 1 ke 1000 ada 3 lompatan. Logaritma basis 10 biasanya ditulis tanpa basis: log 1000 sama dengan 3. Sama dengan banyak nol-nya.',
          add: [T('a', 'log 1000 = 3', 200, 220, { size: 30, c: 'pos' }), T('b', `(karena 10${sup(3)} = 1000)`, 200, 260, { size: 18, c: 'mut' })],
          pulse: ['t3'],
        },
      ],
    },
    {
      title: 'Dua hal yang selalu benar',
      steps: [
        {
          say: 'Dari 1 ke 2 cukup satu lompatan kali 2. Jadi logaritma 2 basis 2 sama dengan 1. Logaritma suatu bilangan dengan basis dirinya sendiri selalu 1.',
          clear: true,
          add: [...C2.els, hops2(0, 1), T('a', `${sup('a')}log a = 1`, 120, 225, { size: 28, c: 'pos' })],
          pulse: ['c1'],
        },
        {
          say: 'Untuk sampai di 1, tidak perlu melompat sama sekali. Logaritma 1 dengan basis apa pun sama dengan 0.',
          add: [T('b', `${sup('a')}log 1 = 0`, 280, 225, { size: 28, c: 'acc' })],
          pulse: ['c0'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Logaritma 81 basis 3 sama dengan …',
          clear: true,
          add: [T('q', `${sup(3)}log 81 = ?`, 200, 130, { size: 44 })],
          ask: {
            options: [
              { t: '4', ok: true, why: '3 × 3 × 3 × 3 = 81, empat kali dikali 3.' },
              { t: '27', why: '27 = 81 ÷ 3. Yang dicari adalah pangkatnya.' },
              { t: '9', why: '9 × 9 = 81, tetapi basisnya 3.' },
              { t: '3', why: '3³ = 27, belum 81.' },
            ],
          },
        },
        {
          say: '3, 9, 27, 81. Empat lompatan. Jadi logaritma 81 basis 3 sama dengan 4, karena 3 pangkat 4 sama dengan 81.',
          add: [T('a', '3 → 9 → 27 → 81', 200, 200, { size: 26 }), T('b', `3${sup(4)} = 81  →  ${sup(3)}log 81 = {g:4}`, 200, 250, { size: 24 })],
          set: { q: { y: 80, size: 34 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai ⁵log 125 adalah …',
      ans: ['3'],
      wrong: { '25': '25 = 125 ÷ 5. Yang dicari: 5 pangkat berapa = 125.' },
      steps: ['5³ = 125.', 'Jadi ⁵log 125 = 3.'],
    },
    {
      type: 'num',
      q: 'Nilai log 10.000 adalah …',
      ans: ['4'],
      wrong: { '1000': 'log basis 10: 10 pangkat berapa = 10.000?' },
      steps: ['10⁴ = 10.000.', 'log 10.000 = 4.'],
    },
    {
      q: 'Bentuk logaritma dari 3⁴ = 81 adalah …',
      options: [
        { t: '³log 81 = 4', ok: true },
        { t: '⁴log 81 = 3', why: 'Basisnya 3 (bilangan yang dipangkatkan), bukan 4.' },
        { t: '³log 4 = 81', why: 'Numerus adalah hasil pangkat, yaitu 81.' },
        { t: '⁸¹log 3 = 4', why: 'Basis pangkatnya 3.' },
      ],
      steps: ['aⁿ = b ditulis ᵃlog b = n.', '3⁴ = 81 → ³log 81 = 4.'],
    },
    {
      type: 'num',
      q: 'Nilai ²log ⅛ adalah …',
      ans: ['-3'],
      wrong: { '3': '⅛ lebih kecil dari 1, jadi pangkatnya negatif: 2⁻³ = ⅛.', '4': '2 pangkat berapa = ⅛? Jawabannya −3.' },
      steps: ['⅛ = 1/2³ = 2⁻³.', '²log ⅛ = −3.'],
    },
    {
      type: 'num',
      q: 'Nilai ⁴log 2 adalah … (boleh ditulis sebagai pecahan)',
      ans: ['1/2'],
      wrong: { '2': '4² = 16, bukan 2.', '0': '4⁰ = 1, bukan 2.' },
      steps: ['√4 = 2, artinya 4^½ = 2.', '⁴log 2 = ½.'],
    },
  ],
};

// ---------- 1.4 Sifat logaritma ----------
const l4 = {
  id: 'k10b1-4',
  title: 'Sifat-sifat Logaritma',
  hook: 'Perkalian menjadi penjumlahan lompatan. Itulah kekuatan logaritma.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Logaritma 4 basis 2 ditambah logaritma 8 basis 2 sama dengan …',
          add: [T('q', `${sup(2)}log 4 + ${sup(2)}log 8 = ?`, 200, 140, { size: 34 })],
          ask: {
            options: [
              { t: '5', ok: true, why: '²log 4 = 2 dan ²log 8 = 3. Jumlahnya 5.' },
              { t: '²log 12', why: 'Logaritma tidak dijumlah dengan menjumlahkan numerusnya.' },
              { t: '32', why: '32 adalah 4 × 8. Logaritmanya adalah 5.' },
              { t: '6', why: '2 + 3 = 5.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kali menjadi tambah',
      steps: [
        {
          say: 'Pakai lagi deretan lompatan kali 2. Logaritma 4 basis 2: dua lompatan biru.',
          clear: true,
          add: [...C2.els, hops2(0, 2, 'pos'), T('a', `${sup(2)}log 4 = {p:2}`, 110, 215, { size: 22 })],
        },
        {
          say: 'Lalu kalikan dengan 8, yaitu tiga lompatan lagi. Kita sampai di 32.',
          add: [hops2(2, 5, 'acc'), T('b', `${sup(2)}log 8 = {a:3}`, 290, 215, { size: 22 })],
          pulse: ['c5'],
        },
        {
          say: '4 kali 8 sama dengan 32, dan 2 tambah 3 sama dengan 5 lompatan. Jadi logaritma dari hasil kali sama dengan jumlah logaritmanya.',
          add: [T('r', `${sup('a')}log (b × c) = ${sup('a')}log b + ${sup('a')}log c`, 200, 262, { size: 20, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Bagi menjadi kurang',
      steps: [
        {
          say: 'Sekarang mulai dari 64 dan bagi dengan 4. Membagi berarti melompat mundur.',
          clear: true,
          add: [...C2.els, T('a', `${sup(2)}log 64 = 6`, 200, 240, { size: 22 })],
          pulse: ['c6'],
        },
        {
          say: 'Dibagi 4 artinya mundur dua lompatan. Kita sampai di 16.',
          add: [hop('b5', C2.X(6), C2.X(5), 168, { below: true, label: '÷2', lsize: 12, c: 'neg' }), hop('b4', C2.X(5), C2.X(4), 168, { below: true, label: '÷2', lsize: 12, c: 'neg' })],
          pulse: ['c4'],
        },
        {
          say: '6 dikurangi 2 sama dengan 4, dan logaritma 16 basis 2 memang 4. Logaritma dari hasil bagi sama dengan selisih logaritmanya.',
          set: { a: { text: `${sup(2)}log (64 ÷ 4) = 6 − 2 = 4` } },
          add: [T('r', `${sup('a')}log (b ÷ c) = ${sup('a')}log b − ${sup('a')}log c`, 200, 276, { size: 19, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Pangkat menjadi pengali',
      steps: [
        {
          say: 'Logaritma 8 kuadrat basis 2. 8 kuadrat sama dengan 8 kali 8: tiga lompatan, lalu tiga lompatan lagi.',
          clear: true,
          add: [...C2.els, hops2(0, 3, 'pos'), hops2(3, 6, 'acc')],
        },
        {
          say: 'Totalnya 6 lompatan, yaitu 2 kali 3. Pangkatnya pindah ke depan menjadi pengali.',
          add: [T('a', `${sup(2)}log 8${sup(2)} = 2 × ${sup(2)}log 8 = 2 × 3 = 6`, 200, 215, { size: 20 }), T('r', `${sup('a')}log b${sup('n')} = n × ${sup('a')}log b`, 200, 262, { size: 22, c: 'pos' })],
          pulse: ['c6'],
        },
      ],
    },
    {
      title: 'Menghitung tanpa kalkulator',
      steps: [
        {
          say: 'Diketahui log 2 kira-kira 0,301. Dengan sifat tadi, kita bisa mencari log 8 dan log 5.',
          clear: true,
          add: [T('k', 'log 2 ≈ 0,301', 200, 45, { size: 26, c: 'acc' })],
        },
        {
          say: 'log 8 sama dengan log 2 pangkat 3, sama dengan 3 kali 0,301, yaitu 0,903.',
          add: [T('a', `log 8 = log 2${sup(3)} = 3 × 0,301 = 0,903`, 200, 115, { size: 20 })],
        },
        {
          say: 'log 5 sama dengan log 10 dibagi 2, yaitu log 10 dikurangi log 2. 1 dikurangi 0,301 sama dengan 0,699.',
          add: [T('b', 'log 5 = log (10 ÷ 2) = 1 − 0,301 = 0,699', 200, 185, { size: 20 })],
        },
        {
          say: 'Ingat log 10 sama dengan 1, karena basisnya juga 10.',
          add: [T('c', 'log 10 = 1', 200, 245, { size: 22, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Logaritma 54 basis 3 dikurangi logaritma 2 basis 3 sama dengan …',
          clear: true,
          add: [T('q', `${sup(3)}log 54 − ${sup(3)}log 2 = ?`, 200, 130, { size: 32 })],
          ask: {
            options: [
              { t: '3', ok: true, why: '³log (54 ÷ 2) = ³log 27 = 3.' },
              { t: '³log 52', why: 'Selisih logaritma = logaritma hasil bagi, bukan selisih numerus.' },
              { t: '27', why: '27 adalah numerusnya. ³log 27 = 3.' },
              { t: '2', why: '3² = 9, bukan 27.' },
            ],
          },
        },
        {
          say: 'Selisih logaritma menjadi logaritma hasil bagi. 54 dibagi 2 sama dengan 27, dan 3 pangkat 3 sama dengan 27. Jadi hasilnya 3.',
          add: [T('a', `= ${sup(3)}log (54 ÷ 2) = ${sup(3)}log 27`, 200, 190, { size: 26 }), T('b', '= {g:3}', 200, 245, { size: 30 })],
          set: { q: { y: 80 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai ²log 16 + ²log 2 adalah …',
      ans: ['5'],
      wrong: { '32': '32 adalah numerusnya. ²log 32 = 5.', '18': 'Numerus dikali, bukan dijumlah.' },
      steps: ['²log 16 + ²log 2 = ²log 32.', '2⁵ = 32, jadi hasilnya 5.'],
    },
    {
      type: 'num',
      q: 'Nilai log 50 + log 2 adalah …',
      ans: ['2'],
      wrong: { '100': 'log 100 = 2.', '52': 'Logaritma dijumlah → numerus dikali: 50 × 2 = 100.' },
      steps: ['log 50 + log 2 = log 100.', '10² = 100, jadi hasilnya 2.'],
    },
    {
      type: 'num',
      q: 'Nilai ³log 18 − ³log 2 adalah …',
      ans: ['2'],
      wrong: { '9': '9 adalah numerusnya. ³log 9 = 2.', '16': 'Logaritma dikurang → numerus dibagi: 18 ÷ 2 = 9.' },
      steps: ['³log 18 − ³log 2 = ³log 9.', '3² = 9, jadi hasilnya 2.'],
    },
    {
      type: 'num',
      q: 'Nilai ⁵log 25³ adalah …',
      ans: ['6'],
      wrong: { '2': 'Pangkat 3 pindah ke depan: 3 × ⁵log 25 = 3 × 2.', '5': '3 × 2 = 6.' },
      steps: ['⁵log 25³ = 3 × ⁵log 25.', '= 3 × 2 = 6.'],
    },
    {
      type: 'num',
      q: 'Jika log 3 ≈ 0,477, maka log 9 ≈ …',
      ans: ['0,954'],
      wrong: { '0,477': 'log 9 = log 3² = 2 × log 3.', '1,431': 'Itu 3 × log 3 = log 27.' },
      steps: ['log 9 = log 3² = 2 × log 3.', '= 2 × 0,477 = 0,954.'],
    },
  ],
};

export default {
  id: 'k10b1',
  no: 1,
  title: 'Eksponen dan Logaritma',
  desc: 'Fungsi eksponen (tumbuh dan meluruh), persamaan eksponen, logaritma, dan sifat-sifat logaritma.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      type: 'num',
      q: 'Ada 200 bakteri. Setiap jam jumlahnya menjadi 3 kali lipat. Banyak bakteri setelah 3 jam adalah …',
      ans: ['5400'],
      wrong: { '1800': '200 × 3 × 3 × 3, bukan 200 × 3 × 3.', '600': 'Itu setelah 1 jam.', '1200': '3 kali lipat setiap jam berarti dikali 3 tiga kali: 200 × 27.' },
      steps: ['200 × 3³.', '= 200 × 27 = 5.400.'],
    },
    {
      type: 'num',
      q: 'Jika ²log x = 5, maka x = …',
      ans: ['32'],
      wrong: { '10': 'Bukan 2 × 5. Artinya 2⁵ = x.', '25': '2⁵ = 32.' },
      steps: ['²log x = 5 artinya 2⁵ = x.', 'x = 32.'],
    },
    {
      q: 'Penyelesaian 2ˣ = 10 dapat ditulis sebagai …',
      options: [
        { t: 'x = ²log 10', ok: true },
        { t: 'x = 5', why: '2⁵ = 32, bukan 10.' },
        { t: 'x = ¹⁰log 2', why: 'Basisnya adalah bilangan yang dipangkatkan, yaitu 2.' },
        { t: 'x = 10 ÷ 2', why: 'Pangkat dicari dengan logaritma, bukan pembagian.' },
      ],
      steps: ['aⁿ = b ↔ n = ᵃlog b.', '2ˣ = 10 → x = ²log 10 (sekitar 3,32).'],
    },
  ],
};
