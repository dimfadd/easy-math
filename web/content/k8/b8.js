// Kelas 8 · Bab 8: Peluang
import { T, box, ln, range, table, F } from '../helpers.js';

// Dadu: kotak dengan titik-titik
const PIPS = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};
function die(id, x, y, n, { size = 44, fill = 'paper', pip = 'ink' } = {}) {
  const g = size * 0.27;
  const d = PIPS[n].map(([a, b]) => `M${(a * g + 2.6).toFixed(1)},${(b * g).toFixed(1)} a2.6,2.6 0 1 0 -5.2,0 a2.6,2.6 0 1 0 5.2,0`).join(' ');
  return [
    box(`${id}`, x, y, size, size, { fill, r: 8, sw: 2 }),
    { id: `${id}p`, t: 'path', x, y, d, fill: pip, stroke: pip, sw: 1, z: 1 },
  ];
}
const coin = (id, x, y, face, o = {}) => ({ id, t: 'circle', x, y, r: 22, fill: face === 'A' ? 'acc' : 'acc-soft', stroke: 'ink', sw: 2, label: face, lsize: 18, lc: face === 'A' ? 'onacc' : 'ink', ...o });
const ball = (id, x, y, fill) => ({ id, t: 'circle', x, y, r: 13, fill, stroke: 'ink', sw: 1.5 });

// Hasil 30 kali melempar koin (A = angka, G = gambar), dibuat tetap supaya animasinya sama setiap kali
const TOSS = 'AGGAAGAGAAGGAGAAAGGAGAGGAAGAGA'.split('');
const countA = (n) => TOSS.slice(0, n).filter((c) => c === 'A').length;

// ---------- 8.1 Percobaan dan peluang empiris ----------
const l1 = {
  id: 'k8b8-1',
  title: 'Ruang Sampel dan Peluang Empiris',
  hook: 'Peluang mengukur seberapa mungkin sesuatu terjadi. Cara pertama: coba berulang kali, lalu hitung.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah koin dilempar 30 kali. Kira-kira berapa kali muncul sisi angka?',
          add: [coin('c1', 150, 120, 'A'), coin('c2', 250, 120, 'G'), T('la', 'Angka', 150, 165, { size: 15 }), T('lg', 'Gambar', 250, 165, { size: 15 })],
          ask: {
            options: [
              { t: 'sekitar 15', ok: true, why: 'Angka dan gambar sama-sama mungkin, jadi kira-kira setengahnya.' },
              { t: 'pasti tepat 15', why: 'Tidak pasti tepat 15. Hasil percobaan bisa sedikit berbeda, misalnya 14 atau 17.' },
              { t: 'sekitar 30', why: 'Gambar juga bisa muncul, jadi tidak semuanya angka.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ruang sampel',
      steps: [
        {
          say: 'Semua hasil yang mungkin dari sebuah percobaan disebut ruang sampel. Melempar koin: angka atau gambar. Ruang sampelnya berisi 2.',
          clear: true,
          add: [coin('c1', 110, 90, 'A'), coin('c2', 160, 90, 'G'), T('s1', 'S = {A, G}, n(S) = 2', 290, 90, { size: 18 })],
        },
        {
          say: 'Melempar dadu: 1, 2, 3, 4, 5, atau 6. Ruang sampelnya berisi 6. Setiap anggotanya disebut titik sampel.',
          add: [...range(1, 7).flatMap((n) => die(`d${n}`, 40 + (n - 1) * 46, 180, n, { size: 38 })), T('s2', 'S = {1, 2, 3, 4, 5, 6}, n(S) = 6', 200, 235, { size: 18 })],
        },
      ],
    },
    {
      title: 'Melakukan percobaan',
      steps: [
        {
          say: 'Sekarang kita lempar koin 30 kali dan catat hasilnya.',
          clear: true,
          add: [T('h', 'hasil 30 lemparan', 200, 30, { size: 16, c: 'mut' })],
        },
        ...[10, 20, 30].map((n) => ({
          say: n === 10 ? '10 lemparan pertama.' : n === 20 ? '10 lemparan berikutnya.' : 'Dan 10 lemparan terakhir.',
          add: range(n - 10, n).map((i) => coin(`t${i}`, 47 + (i % 10) * 34, 70 + Math.floor(i / 10) * 44, TOSS[i], { r: 14, lsize: 13 })),
        })),
        {
          say: `Hitung: angka muncul ${countA(30)} kali dari 30 lemparan.`,
          add: [T('r', `angka: ${countA(30)} kali, gambar: ${30 - countA(30)} kali`, 200, 225, { size: 18 })],
        },
      ],
    },
    {
      title: 'Peluang empiris',
      steps: [
        {
          say: `Peluang empiris, atau frekuensi relatif, adalah banyak kejadian dibagi banyak percobaan. Angka muncul ${countA(30)} kali dari 30, jadi ${countA(30)} per 30.`,
          clear: true,
          add: [box('rb', 200, 70, 300, 58, { fill: 'acc-soft', r: 10, label: 'peluang empiris =\nbanyak kejadian ÷ banyak percobaan', lsize: 14 }), T('a', 'P(angka) =', 160, 150, { size: 24 }), F('f', countA(30), 30, 245, 150, { size: 24 })],
        },
        {
          say: 'Hasilnya dekat dengan setengah. Semakin banyak percobaan, peluang empiris biasanya semakin dekat dengan setengah.',
          add: [T('b', `${countA(30)} ÷ 30 ≈ ${(countA(30) / 30).toFixed(2).replace('.', ',')}  (dekat ½)`, 200, 225, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dadu dilempar 60 kali, dan mata dadu 6 muncul 12 kali. Berapa peluang empiris muncul mata dadu 6?',
          clear: true,
          add: [...die('d', 200, 90, 6, { size: 60 }), T('q', '60 lemparan, mata 6 muncul 12 kali', 200, 170, { size: 17 }), T('q2', 'peluang empiris = ?', 200, 210, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: '1/5', ok: true, why: '12 ÷ 60 = 1/5.' },
              { t: '1/6', why: '1/6 adalah peluang teoretis. Peluang empiris dihitung dari hasil percobaan: 12/60.' },
              { t: '12', why: '12 adalah banyak kejadiannya. Bagi dengan 60.' },
              { t: '5', why: '60 ÷ 12 = 5 terbalik. Kejadian dibagi percobaan.' },
            ],
          },
        },
        {
          say: '12 dibagi 60 sama dengan 1 per 5.',
          clear: true,
          add: [T('a', 'P = 12 ÷ 60', 200, 100, { size: 30 }), T('b', '= {a:1/5}', 200, 160, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Banyak titik sampel pada pelemparan sebuah dadu adalah …',
      ans: ['6'],
      wrong: { '1': 'Ada 6 hasil yang mungkin: 1 sampai 6.', '2': 'Itu banyak titik sampel koin.' },
      steps: ['S = {1, 2, 3, 4, 5, 6}.', 'n(S) = 6.'],
    },
    {
      q: 'Ruang sampel pelemparan dua koin sekaligus adalah …',
      options: [
        { t: '{AA, AG, GA, GG}', ok: true },
        { t: '{A, G}', why: 'Itu untuk satu koin. Dua koin punya pasangan hasil.' },
        { t: '{AA, AG, GG}', why: 'AG dan GA berbeda: koin pertama angka, kedua gambar, atau sebaliknya.' },
        { t: '{AA, GG}', why: 'Kedua koin bisa menunjukkan sisi berbeda.' },
      ],
      steps: ['Koin 1: A atau G. Koin 2: A atau G.', 'Pasangan: AA, AG, GA, GG.'],
    },
    {
      q: 'Sebuah koin dilempar 50 kali dan muncul gambar 23 kali. Peluang empiris muncul angka adalah …',
      options: [
        { t: '27/50', ok: true },
        { t: '23/50', why: 'Itu peluang empiris gambar. Angka muncul 50 − 23 = 27 kali.' },
        { t: '1/2', why: '½ adalah peluang teoretis. Empiris dari data: 27/50.' },
        { t: '27/23', why: 'Bagi dengan banyak percobaan (50), bukan dengan banyak gambar.' },
      ],
      steps: ['Angka muncul 50 − 23 = 27 kali.', 'Peluang empiris = 27/50.'],
    },
    {
      type: 'num',
      q: 'Seorang pemain basket mencoba 40 tembakan dan masuk 28. Peluang empiris tembakannya masuk (dalam desimal) adalah …',
      ans: ['0.7'],
      wrong: { '28': 'Bagi dengan 40.', '1.43': '40 ÷ 28 terbalik. Kejadian dibagi percobaan.' },
      steps: ['28 ÷ 40 = 0,7.'],
    },
    {
      q: 'Banyak titik sampel pelemparan sebuah koin dan sebuah dadu sekaligus adalah …',
      options: [
        { t: '12', ok: true },
        { t: '8', why: 'Bukan dijumlah. Setiap sisi koin bisa berpasangan dengan 6 mata dadu: 2 × 6.' },
        { t: '6', why: 'Koin juga punya 2 kemungkinan: 2 × 6 = 12.' },
        { t: '36', why: '36 untuk dua dadu.' },
      ],
      steps: ['Koin: 2 hasil. Dadu: 6 hasil.', 'Pasangan: 2 × 6 = 12.'],
    },
  ],
};

// ---------- 8.2 Peluang teoretis ----------
const BAG = ['neg', 'neg', 'neg', 'pos', 'pos', 'acc', 'acc', 'acc', 'acc', 'acc'];
const BX = (i) => 120 + (i % 5) * 40;
const BY = (i) => 105 + Math.floor(i / 5) * 40;

const l2 = {
  id: 'k8b8-2',
  title: 'Peluang Teoretis',
  hook: 'Tanpa mencoba pun peluang bisa dihitung: banyak hasil yang kita mau, dibagi banyak semua hasil.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dadu dilempar sekali. Berapa peluang muncul mata dadu genap?',
          add: range(1, 7).flatMap((n) => die(`d${n}`, 60 + (n - 1) * 56, 120, n)),
          ask: {
            options: [
              { t: '3/6 = 1/2', ok: true, why: 'Genap: 2, 4, 6. Ada 3 dari 6.' },
              { t: '1/6', why: 'Ada tiga mata genap, bukan satu.' },
              { t: '2/6', why: 'Genap ada 3: 2, 4, dan 6.' },
              { t: '1', why: 'Peluang 1 berarti pasti terjadi. Mata ganjil juga bisa muncul.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Rumus peluang',
      steps: [
        {
          say: 'Tandai mata dadu yang genap: 2, 4, dan 6. Itulah kejadian yang kita mau. Ada 3.',
          set: { d2: { fill: 'acc-soft' }, d4: { fill: 'acc-soft' }, d6: { fill: 'acc-soft' } },
          add: [T('a', 'genap: 3 hasil', 200, 180, { size: 18, c: 'acc' })],
        },
        {
          say: 'Semua hasil yang mungkin ada 6. Peluangnya 3 per 6, atau setengah.',
          add: [T('b', 'P(genap) = 3/6 = {a:1/2}', 200, 220, { size: 22 })],
        },
        {
          say: 'Rumusnya: peluang kejadian A sama dengan banyak hasil kejadian A dibagi banyak anggota ruang sampel.',
          add: [box('rb', 200, 268, 230, 40, { fill: 'acc-soft', r: 10, label: 'P(A) = n(A) ÷ n(S)', lsize: 18 })],
        },
      ],
    },
    {
      title: 'Bola dalam kantong',
      steps: [
        {
          say: 'Di kantong ada 3 bola merah, 2 bola biru, dan 5 bola kuning. Diambil satu bola tanpa melihat.',
          clear: true,
          add: [box('bag', 200, 125, 230, 110, { fill: 'mut-soft', r: 24 }), ...BAG.map((c, i) => ball(`b${i}`, BX(i), BY(i), c))],
        },
        {
          say: 'Peluang terambil bola merah: 3 dari 10 bola, yaitu 3 per 10.',
          set: { b0: { r: 16 }, b1: { r: 16 }, b2: { r: 16 } },
          add: [T('r', 'P(merah) = {n:3/10}', 110, 215, { size: 18 })],
        },
        {
          say: 'Peluang biru: 2 per 10. Peluang kuning: 5 per 10, atau setengah.',
          add: [T('b', 'P(biru) = {p:2/10}', 290, 215, { size: 18 }), T('k', 'P(kuning) = {a:5/10} = ½', 200, 250, { size: 18 })],
        },
        {
          say: 'Perhatikan: 3 per 10 tambah 2 per 10 tambah 5 per 10 sama dengan 1. Jumlah peluang semua kemungkinan selalu 1.',
          add: [T('s', '3/10 + 2/10 + 5/10 = 1', 200, 282, { size: 16, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Mustahil, pasti, dan komplemen',
      steps: [
        {
          say: 'Peluang selalu di antara 0 dan 1. Kejadian yang tidak mungkin terjadi peluangnya 0, misalnya muncul mata dadu 7.',
          clear: true,
          add: [ln('sc', 40, 120, 360, 120, { sw: 3, draw: false }), T('z', '0', 40, 145, { size: 18 }), T('o', '1', 360, 145, { size: 18 }), T('h', '½', 200, 145, { size: 18 }), T('lz', 'mustahil\n(mata 7)', 60, 80, { size: 14, c: 'neg', lh: 1.3 })],
        },
        {
          say: 'Kejadian yang pasti terjadi peluangnya 1, misalnya muncul mata dadu kurang dari 7.',
          add: [T('lo', 'pasti\n(mata < 7)', 345, 80, { size: 14, c: 'ok', lh: 1.3 })],
        },
        {
          say: 'Peluang suatu kejadian tidak terjadi sama dengan 1 dikurangi peluang kejadian itu. Peluang tidak muncul 6: 1 dikurangi seperenam, yaitu lima per enam.',
          add: [box('rb', 200, 210, 280, 44, { fill: 'acc-soft', r: 10, label: 'P(bukan A) = 1 − P(A)', lsize: 18 }), T('e', 'P(bukan 6) = 1 − 1/6 = 5/6', 200, 260, { size: 18 })],
        },
      ],
    },
    {
      title: 'Frekuensi harapan',
      steps: [
        {
          say: 'Kalau dadu dilempar 120 kali, berapa kali kira-kira muncul mata 6? Kalikan peluangnya dengan banyak percobaan: seperenam kali 120 sama dengan 20.',
          clear: true,
          add: [...die('d', 90, 110, 6, { size: 60 }), T('a', 'P(6) = 1/6', 260, 80, { size: 20 }), T('b', '120 lemparan', 260, 115, { size: 18, c: 'mut' }), T('c', '1/6 × 120 = {a:20} kali', 260, 160, { size: 20 })],
        },
        {
          say: 'Ini disebut frekuensi harapan. Hasil sebenarnya bisa sedikit berbeda, tapi biasanya dekat dengan 20.',
          add: [box('rb', 200, 240, 280, 58, { fill: 'acc-soft', r: 10, label: 'frekuensi harapan =\nP(A) × banyak percobaan', lsize: 15 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari kartu bernomor 1 sampai 10, diambil satu kartu. Berapa peluang terambil kartu bernomor prima?',
          clear: true,
          add: [...range(1, 11).map((n) => box(`k${n}`, 40 + ((n - 1) % 5) * 80, 80 + Math.floor((n - 1) / 5) * 60, 50, 48, { fill: 'paper', r: 6, label: String(n), lsize: 20 })), T('q', 'P(prima) = ?', 200, 230, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: '4/10', ok: true, why: 'Prima: 2, 3, 5, 7. Ada 4 dari 10.' },
              { t: '5/10', why: '1 bukan prima. Prima di 1–10: 2, 3, 5, 7.' },
              { t: '3/10', why: '2 juga prima.' },
              { t: '6/10', why: 'Itu peluang bukan prima.' },
            ],
          },
        },
        {
          say: 'Bilangan prima dari 1 sampai 10: 2, 3, 5, dan 7. Ada 4. Peluangnya 4 per 10, atau 2 per 5.',
          set: { k2: { fill: 'acc', lc: 'onacc' }, k3: { fill: 'acc', lc: 'onacc' }, k5: { fill: 'acc', lc: 'onacc' }, k7: { fill: 'acc', lc: 'onacc' } },
          del: ['q'],
          add: [T('r', 'P(prima) = 4/10 = {a:2/5}', 200, 230, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Sebuah dadu dilempar sekali. Peluang muncul mata dadu lebih dari 4 adalah …',
      options: [
        { t: '1/3', ok: true },
        { t: '1/2', why: 'Lebih dari 4: hanya 5 dan 6. Ada 2 dari 6.' },
        { t: '1/6', why: 'Ada dua mata: 5 dan 6.' },
        { t: '2/3', why: '2/3 = 4/6 adalah peluang mata 4 atau kurang (1, 2, 3, 4).' },
      ],
      steps: ['Lebih dari 4: {5, 6}, ada 2.', 'P = 2/6 = 1/3.'],
    },
    {
      q: 'Dalam kantong ada 4 kelereng merah dan 6 kelereng putih. Peluang terambil kelereng putih adalah …',
      options: [
        { t: '3/5', ok: true },
        { t: '2/5', why: 'Itu peluang merah.' },
        { t: '6/4', why: 'Bagi dengan semua kelereng (10), bukan dengan yang merah.' },
        { t: '1/6', why: 'Ada 6 putih dari 10 kelereng.' },
      ],
      steps: ['n(putih) = 6, n(S) = 10.', 'P = 6/10 = 3/5.'],
    },
    {
      type: 'num',
      q: 'Peluang hari ini hujan adalah 0,35. Peluang hari ini tidak hujan adalah …',
      ans: ['0.65'],
      wrong: { '0.35': 'Tidak hujan = 1 − P(hujan).', '1.35': 'Dikurangi, bukan ditambah: 1 − 0,35.' },
      steps: ['P(tidak hujan) = 1 − 0,35.', '= 0,65.'],
    },
    {
      type: 'num',
      q: 'Sebuah koin dilempar 80 kali. Frekuensi harapan muncul gambar adalah …',
      ans: ['40'],
      wrong: { '80': 'Kalikan dengan peluangnya (½).', '160': 'Dikali ½, bukan dikali 2.' },
      steps: ['P(gambar) = ½.', 'Frekuensi harapan = ½ × 80 = 40.'],
    },
    {
      q: 'Dua dadu dilempar bersamaan. Peluang muncul mata dadu berjumlah 7 adalah …',
      options: [
        { t: '1/6', ok: true },
        { t: '1/12', why: 'Pasangan berjumlah 7 ada 6: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).' },
        { t: '7/36', why: 'Ada 6 pasangan berjumlah 7, bukan 7.' },
        { t: '1/11', why: 'Ruang sampel dua dadu berisi 36 pasangan, bukan 11 jumlah.' },
      ],
      steps: ['n(S) = 6 × 6 = 36.', 'Jumlah 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → 6.', 'P = 6/36 = 1/6.'],
    },
  ],
};

export default {
  id: 'k8b8',
  no: 8,
  title: 'Peluang',
  desc: 'Ruang sampel, percobaan dan peluang empiris, peluang teoretis, komplemen, dan frekuensi harapan.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Dari 40 siswa, 15 suka matematika. Jika dipilih satu siswa secara acak, peluang terpilih siswa yang tidak suka matematika adalah … (tulis pecahan sederhana)',
      ans: ['5/8'],
      wrong: { '3/8': 'Itu peluang suka matematika. Tidak suka: 25 dari 40.', '25': 'Bagi dengan 40.' },
      steps: ['Tidak suka: 40 − 15 = 25.', 'P = 25/40 = 5/8.'],
    },
    {
      q: 'Peluang Andi lulus ujian 0,8. Dari 50 siswa dengan peluang yang sama, kira-kira berapa yang tidak lulus?',
      options: [
        { t: '10', ok: true },
        { t: '40', why: '40 adalah frekuensi harapan lulus.' },
        { t: '8', why: 'P(tidak lulus) = 0,2. 0,2 × 50 = 10.' },
        { t: '2', why: '0,2 × 50 = 10.' },
      ],
      steps: ['P(tidak lulus) = 1 − 0,8 = 0,2.', 'Frekuensi harapan = 0,2 × 50 = 10.'],
    },
    {
      q: 'Dua koin dilempar bersamaan. Peluang muncul paling sedikit satu angka adalah …',
      options: [
        { t: '3/4', ok: true },
        { t: '1/2', why: 'Hasilnya AA, AG, GA, GG. Yang punya angka: AA, AG, GA.' },
        { t: '1/4', why: '1/4 adalah peluang dua angka (AA) saja, atau tanpa angka (GG).' },
        { t: '2/3', why: 'Ruang sampelnya 4, bukan 3.' },
      ],
      steps: ['S = {AA, AG, GA, GG}.', 'Paling sedikit satu angka: AA, AG, GA → 3.', 'P = 3/4.'],
    },
  ],
};
