// Kelas 10 · Bab 8: Peluang (pencacahan dan kejadian majemuk)
import { T, ln, box, areaCells, areaFill } from '../helpers.js';
import { tag } from './kit.js';

// ---------- 8.1 Kaidah pencacahan ----------
const SHIRT = [['M', 'neg', 60], ['B', 'pos', 150], ['H', 'ok', 240]];
const PANTS = [['J', -24], ['K', 24]];
const node = (id, lab, x, y, fill) => ({ id, t: 'circle', x, y, r: 15, fill, stroke: 'ink', sw: 2, label: lab, lsize: 14, lc: fill === 'acc' ? 'ink' : 'onfill' });
const leaf = (id, lab, x, y) => box(id, x, y, 30, 22, { r: 4, fill: 'mut-soft', label: lab, lsize: 13 });
const slot = (id, x, lab = '') => box(id, x, 150, 56, 56, { r: 8, fill: 'paper', sw: 2.5, ...(lab ? { label: lab, lsize: 24 } : {}) });

const l1 = {
  id: 'k10b8-1',
  title: 'Kaidah Pencacahan',
  hook: 'Banyaknya pilihan bisa dihitung tanpa mendaftar satu per satu: cukup dikalikan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Rani punya 3 baju: merah, biru, hijau. Ia juga punya 2 celana: jin dan kain. Berapa banyak pasangan baju dan celana yang bisa ia pakai?',
          add: [...SHIRT.map(([l, c], i) => node(`s${i}`, l, 120 + i * 50, 100, c)), ...PANTS.map(([l], i) => leaf(`p${i}`, l, 175 + i * 50, 170))],
          ask: {
            options: [
              { t: '6', ok: true, why: 'Setiap baju bisa dipasangkan dengan 2 celana: 3 × 2 = 6.' },
              { t: '5', why: 'Itu 3 + 2. Setiap baju punya 2 pilihan celana, jadi dikali.' },
              { t: '3', why: 'Setiap baju bisa dipakai dengan dua celana yang berbeda.' },
              { t: '8', why: 'Coba daftar: M-J, M-K, B-J, B-K, H-J, H-K. Ada 6.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diagram pohon',
      steps: [
        {
          say: 'Gambar diagram pohon. Dari titik awal, ada 3 cabang untuk memilih baju.',
          clear: true,
          add: [{ id: 'r', t: 'circle', x: 40, y: 150, r: 6, fill: 'ink', stroke: 'ink', sw: 1 }, ...SHIRT.map(([l, c, y], i) => [ln(`e${i}`, 40, 150, 115, y, { sw: 2, c: 'mut' }), node(`s${i}`, l, 130, y, c)]).flat()],
        },
        {
          say: 'Dari setiap baju, ada 2 cabang untuk celana: jin atau kain.',
          add: SHIRT.flatMap(([l, , y], i) => PANTS.flatMap(([p, dy], j) => [ln(`f${i}${j}`, 145, y, 222, y + dy, { sw: 2, c: 'mut' }), leaf(`l${i}${j}`, p, 238, y + dy)])),
        },
        {
          say: 'Setiap ujung cabang adalah satu pasangan. Ada 6 ujung: 3 kelompok, masing-masing 2.',
          add: SHIRT.flatMap(([l, , y], i) => PANTS.map(([p, dy], j) => T(`t${i}${j}`, `${l}-${p}`, 300, y + dy, { size: 15 }))),
          pulse: ['l00', 'l01', 'l10', 'l11', 'l20', 'l21'],
        },
        {
          say: 'Jadi 3 kali 2 sama dengan 6. Kalau ada 2 pasang sepatu juga, setiap pasangan tadi bercabang 2 lagi: 6 kali 2 sama dengan 12.',
          add: [tag('k', '3 × 2 = 6', 356, 150, 'ok', 16)],
        },
      ],
    },
    {
      title: 'Aturan perkalian',
      steps: [
        {
          say: 'Aturan perkalian: kalau langkah pertama punya n1 pilihan dan langkah kedua punya n2 pilihan, maka seluruhnya ada n1 kali n2 cara.',
          clear: true,
          add: [T('r', 'banyak cara = n₁ × n₂ × n₃ × …', 200, 70, { size: 26, c: 'pos' })],
        },
        {
          say: 'Contoh: membuat kode 3 angka dari angka 1 sampai 5, tanpa angka yang sama. Kotak pertama punya 5 pilihan.',
          add: [slot('k0', 120, '5'), slot('k1', 200), slot('k2', 280), T('m0', '×', 160, 150, { size: 24, c: 'mut' }), T('m1', '×', 240, 150, { size: 24, c: 'mut' })],
        },
        {
          say: 'Satu angka sudah dipakai, jadi kotak kedua tinggal 4 pilihan. Kotak ketiga 3 pilihan.',
          set: { k1: slot('k1', 200, '4'), k2: slot('k2', 280, '3') },
        },
        {
          say: '5 kali 4 kali 3 sama dengan 60 kode. Kalau angka boleh berulang, setiap kotak punya 5 pilihan: 5 kali 5 kali 5 sama dengan 125.',
          add: [T('a', 'tanpa berulang: 5 × 4 × 3 = {g:60}', 200, 225, { size: 20 }), T('b', 'boleh berulang: 5 × 5 × 5 = 125', 200, 260, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sebuah kantin menjual 4 jenis makanan dan 3 jenis minuman. Berapa paket makan dan minum yang berbeda?',
          clear: true,
          add: [T('q', '4 makanan, 3 minuman', 200, 100, { size: 28 }), T('q2', 'banyak paket = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '12', ok: true, why: '4 × 3 = 12 paket.' },
              { t: '7', why: '4 + 3 menghitung pilihan, bukan pasangan.' },
              { t: '64', why: 'Itu 4³. Hanya ada dua langkah: pilih makanan, lalu minuman.' },
              { t: '81', why: 'Itu 3⁴. Cukup 4 × 3.' },
            ],
          },
        },
        {
          say: 'Pilih makanan: 4 cara. Untuk setiap makanan, pilih minuman: 3 cara. Totalnya 4 kali 3 sama dengan 12 paket.',
          add: [T('a', '4 × 3 = {g:12}', 200, 225, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Dito punya 4 kemeja, 3 celana, dan 2 pasang sepatu. Banyak cara ia berpakaian adalah …',
      ans: ['24'],
      wrong: { '9': 'Itu 4 + 3 + 2. Pilihan berpakaian dikalikan.', '12': 'Sepatu juga dipilih: 4 × 3 × 2.' },
      steps: ['Aturan perkalian.', '4 × 3 × 2 = 24.'],
    },
    {
      type: 'num',
      q: 'Banyak bilangan 3 angka berbeda yang dapat disusun dari angka 1, 2, 3, 4 adalah …',
      ans: ['24'],
      wrong: { '64': 'Angkanya harus berbeda, jadi pilihannya berkurang: 4 × 3 × 2.', '12': 'Ada tiga kotak: 4 × 3 × 2.' },
      steps: ['Ratusan 4 pilihan, puluhan 3, satuan 2.', '4 × 3 × 2 = 24.'],
    },
    {
      type: 'num',
      q: 'Banyak bilangan 3 angka yang dapat disusun dari angka 1, 2, 3, 4 jika angka boleh berulang adalah …',
      ans: ['64'],
      wrong: { '24': 'Angka boleh berulang, jadi setiap kotak tetap punya 4 pilihan.', '12': '4 × 4 × 4 = 64.' },
      steps: ['Setiap kotak 4 pilihan.', '4 × 4 × 4 = 64.'],
    },
    {
      type: 'num',
      q: 'Dari kota A ke B ada 3 jalan, dan dari B ke C ada 2 jalan. Banyak rute dari A ke C melalui B adalah …',
      ans: ['6'],
      wrong: { '5': 'Setiap jalan A–B bisa disambung dengan 2 jalan B–C: 3 × 2.' },
      steps: ['3 pilihan lalu 2 pilihan.', '3 × 2 = 6 rute.'],
    },
    {
      type: 'num',
      q: 'Tiga koin dilempar bersamaan. Banyak anggota ruang sampelnya adalah …',
      ans: ['8'],
      wrong: { '6': 'Setiap koin punya 2 hasil: 2 × 2 × 2.', '3': 'Ruang sampel adalah semua kemungkinan hasil: 2 × 2 × 2 = 8.' },
      steps: ['Setiap koin: angka atau gambar (2).', '2 × 2 × 2 = 8.'],
    },
  ],
};

// ---------- 8.2 Gabungan dan irisan ----------
const POS = {
  2: [95, 115], 4: [80, 160], 8: [110, 200], 10: [135, 135],
  6: [200, 150],
  3: [262, 125], 9: [272, 180],
  1: [40, 60], 5: [360, 60], 7: [355, 250],
};
const num = (v, c = 'ink') => T(`n${v}`, String(v), ...POS[v], { size: 20, c });
const circ = (id, x, c, o = {}) => ({ id, t: 'circle', x, y: 155, r: 95, fill: 'none', stroke: c, sw: 3, ...o });

const l2 = {
  id: 'k10b8-2',
  title: 'Gabungan dan Irisan Kejadian',
  hook: 'Peluang "A atau B" tidak selalu P(A) + P(B). Bagian yang sama jangan dihitung dua kali.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sepuluh kartu bernomor 1 sampai 10 dikocok, lalu diambil satu. Berapa peluang terambil kartu genap atau kelipatan 3?',
          add: [T('q', 'kartu 1–10, ambil satu', 200, 90, { size: 24 }), T('q2', 'P(genap atau kelipatan 3) = ?', 200, 150, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: '7/10', ok: true, why: 'Genap atau kelipatan 3: 2, 3, 4, 6, 8, 9, 10. Ada 7 kartu.' },
              { t: '8/10', why: '5 genap + 3 kelipatan 3 = 8, tetapi kartu 6 terhitung dua kali.' },
              { t: '1/10', why: '1/10 hanya kartu 6, yang genap dan kelipatan 3 sekaligus.' },
              { t: '15/100', why: 'Itu 5/10 × 3/10. "Atau" tidak dihitung dengan perkalian.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diagram Venn',
      steps: [
        {
          say: 'Letakkan kesepuluh kartu dalam diagram Venn. Lingkaran biru untuk genap, lingkaran kuning untuk kelipatan 3.',
          clear: true,
          add: [box('U', 200, 155, 380, 290, { r: 8, fill: 'none', stroke: 'mut', sw: 1.5 }), circ('A', 140, 'pos'), circ('B', 255, 'acc'), T('la', 'genap', 70, 35, { size: 15, c: 'pos' }), T('lb', 'kelipatan 3', 320, 35, { size: 15, c: 'acc' }), ...[2, 4, 8, 10].map((v) => num(v, 'pos')), num(6, 'ok'), ...[3, 9].map((v) => num(v, 'acc')), ...[1, 5, 7].map((v) => num(v, 'mut'))],
        },
        {
          say: 'Kartu 6 ada di bagian yang sama, karena 6 genap dan juga kelipatan 3. Bagian ini disebut irisan.',
          pulse: ['n6'],
        },
        {
          say: 'Genap ada 5 kartu. Kelipatan 3 ada 3 kartu. Kalau langsung dijumlah, 8. Tetapi kartu 6 terhitung dua kali.',
          add: [tag('s', '5 + 3 = 8 → 6 terhitung dua kali', 200, 282, 'neg', 14)],
        },
        {
          say: 'Jadi kurangi sekali: 5 tambah 3 dikurangi 1 sama dengan 7. Peluangnya 7 per 10.',
          set: { s: tag('s', 'P(A ∪ B) = 5/10 + 3/10 − 1/10 = 7/10', 200, 282, 'ok', 14) },
        },
      ],
    },
    {
      title: 'Rumusnya',
      steps: [
        {
          say: 'Rumus peluang gabungan: P dari A atau B sama dengan P A tambah P B dikurangi P dari A dan B.',
          clear: true,
          add: [T('f', 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', 200, 80, { size: 22, c: 'pos' }), T('k1', '∪ = atau (gabungan)', 200, 130, { size: 18 }), T('k2', '∩ = dan (irisan)', 200, 160, { size: 18 })],
        },
        {
          say: 'Kalau dua kejadian tidak punya irisan, disebut saling lepas. Misalnya genap dan angka 5 atau 7. Rumusnya cukup dijumlah.',
          add: [T('g', 'saling lepas: P(A ∪ B) = P(A) + P(B)', 200, 220, { size: 20, c: 'ok' }), T('h', 'contoh: 5/10 + 2/10 = 7/10', 200, 255, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Satu dadu dilempar. Berapa peluang muncul angka genap atau angka lebih dari 4?',
          clear: true,
          add: [T('q', 'genap: 2, 4, 6', 200, 80, { size: 24, c: 'pos' }), T('q2', 'lebih dari 4: 5, 6', 200, 120, { size: 24, c: 'acc' }), T('q3', 'P(genap atau > 4) = ?', 200, 180, { size: 24 })],
          ask: {
            options: [
              { t: '2/3', ok: true, why: '3/6 + 2/6 − 1/6 = 4/6 = 2/3. Angkanya 2, 4, 5, 6.' },
              { t: '5/6', why: 'Angka 6 terhitung dua kali. Kurangi 1/6.' },
              { t: '1/6', why: 'Itu hanya irisannya, angka 6.' },
              { t: '1/2', why: 'Hitung semua angka yang genap atau lebih dari 4: 2, 4, 5, 6.' },
            ],
          },
        },
        {
          say: 'Angka 6 ada di keduanya. 3 per 6 tambah 2 per 6 dikurangi 1 per 6 sama dengan 4 per 6, yaitu 2 per 3.',
          add: [T('a', '3/6 + 2/6 − 1/6 = 4/6 = {g:2/3}', 200, 240, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Satu kartu diambil dari 52 kartu remi. Peluang terambil kartu As atau kartu hati adalah …',
      options: [
        { t: '16/52', ok: true },
        { t: '17/52', why: 'As hati terhitung dua kali. 4 + 13 − 1 = 16.' },
        { t: '4/52', why: 'Itu hanya kartu As.' },
        { t: '1/52', why: 'Itu hanya As hati (irisannya).' },
      ],
      steps: ['P(As) = 4/52, P(hati) = 13/52, P(As hati) = 1/52.', '4/52 + 13/52 − 1/52 = 16/52.'],
    },
    {
      type: 'num',
      q: 'Satu dadu dilempar. Peluang muncul angka ganjil atau angka 2 adalah … (tulis sebagai pecahan)',
      ans: ['2/3'],
      wrong: { '1/2': 'Ganjil (3 angka) ditambah angka 2: 4 dari 6.', '1/6': 'Itu hanya angka 2.' },
      steps: ['Saling lepas: 2 bukan ganjil.', '3/6 + 1/6 = 4/6 = 2/3.'],
    },
    {
      q: 'Pada pelemparan satu dadu, pasangan kejadian manakah yang saling lepas?',
      options: [
        { t: 'muncul angka 1 dan muncul angka genap', ok: true },
        { t: 'muncul angka genap dan muncul angka prima', why: 'Angka 2 genap dan juga prima, jadi ada irisan.' },
        { t: 'muncul angka ganjil dan muncul angka kurang dari 3', why: 'Angka 1 ada di keduanya.' },
        { t: 'muncul angka lebih dari 3 dan muncul angka genap', why: 'Angka 4 dan 6 ada di keduanya.' },
      ],
      steps: ['Saling lepas: tidak ada hasil yang sama.', '1 bukan bilangan genap.'],
    },
    {
      type: 'num',
      q: 'Jika P(A) = 0,5, P(B) = 0,4, dan P(A ∩ B) = 0,2, maka P(A ∪ B) = …',
      ans: ['0,7'],
      wrong: { '0,9': 'Kurangi irisannya: 0,5 + 0,4 − 0,2.', '0,2': 'Itu P(A ∩ B).' },
      steps: ['P(A ∪ B) = 0,5 + 0,4 − 0,2.', '= 0,7.'],
    },
    {
      type: 'num',
      q: 'Di kelas berisi 30 siswa, 18 suka basket, 15 suka voli, dan 8 suka keduanya. Peluang seorang siswa yang dipilih acak suka basket atau voli adalah … (tulis sebagai pecahan)',
      ans: ['5/6'],
      wrong: { '33/30': 'Peluang tidak mungkin lebih dari 1. Kurangi 8 yang terhitung dua kali.', '11/10': '18 + 15 − 8 = 25, jadi 25/30.' },
      steps: ['Suka basket atau voli: 18 + 15 − 8 = 25 siswa.', 'Peluang = 25/30 = 5/6.'],
    },
  ],
};

// ---------- 8.3 Kejadian saling bebas ----------
const GX = 120;
const GY = 160;
const GS = 180;
const CELL = GS / 6;
const gridFill = (cols, rows) => (r, c) => {
  const inC = cols.includes(c + 1);
  const inR = rows.includes(6 - r);
  return inC && inR ? 'ok' : inC ? 'pos-soft' : inR ? 'acc-soft' : 'paper';
};
const EVEN = [2, 4, 6];
const BIG = [5, 6];
const ball = (id, x, y, c) => ({ id, t: 'circle', x, y, r: 13, fill: c, stroke: 'ink', sw: 2 });

const l3 = {
  id: 'k10b8-3',
  title: 'Kejadian Saling Bebas',
  hook: 'Kalau hasil yang satu tidak memengaruhi yang lain, peluang keduanya terjadi cukup dikalikan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah koin dan sebuah dadu dilempar bersamaan. Berapa peluang muncul gambar pada koin dan angka 6 pada dadu?',
          add: [T('q', 'koin: gambar   dadu: 6', 200, 100, { size: 26 }), T('q2', 'P(keduanya) = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '1/12', ok: true, why: 'Ada 2 × 6 = 12 hasil, dan hanya satu yang gambar-6. Atau ½ × 1/6.' },
              { t: '2/3', why: 'Itu ½ + 1/6. "Dan" pada kejadian saling bebas dihitung dengan perkalian.' },
              { t: '1/8', why: 'Ruang sampelnya 2 × 6 = 12.' },
              { t: '1/6', why: 'Itu hanya peluang dadu 6. Koin juga harus gambar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tabel dua dadu',
      steps: [
        {
          say: 'Sekarang dua dadu, merah dan biru. Ada 6 kali 6, yaitu 36 hasil. Setiap kotak adalah satu hasil.',
          clear: true,
          add: [...areaCells('g', GX, GY, GS, GS, 6, 6), ...[1, 2, 3, 4, 5, 6].map((v) => T(`cx${v}`, String(v), GX - GS / 2 + CELL * (v - 0.5), GY + GS / 2 + 13, { size: 13, c: 'neg' })), ...[1, 2, 3, 4, 5, 6].map((v) => T(`ry${v}`, String(v), GX - GS / 2 - 12, GY + GS / 2 - CELL * (v - 0.5), { size: 13, c: 'pos' })), T('xl', 'dadu merah', GX, GY + GS / 2 + 32, { size: 13, c: 'neg' }), T('yl', 'dadu biru', GX - GS / 2 + 30, GY - GS / 2 - 14, { size: 13, c: 'pos' })],
        },
        {
          say: 'Kejadian A: dadu merah genap. Itu 3 kolom dari 6, peluangnya setengah.',
          set: areaFill('g', 6, 6, gridFill(EVEN, [])),
          add: [T('pa', 'P(A) = 18/36 = ½', 305, 70, { size: 17, c: 'pos' })],
        },
        {
          say: 'Kejadian B: dadu biru lebih dari 4. Itu 2 baris dari 6, peluangnya sepertiga.',
          set: areaFill('g', 6, 6, gridFill(EVEN, BIG)),
          add: [T('pb', 'P(B) = 12/36 = ⅓', 305, 105, { size: 17, c: 'acc' })],
        },
        {
          say: 'A dan B terjadi bersama di kotak hijau: 3 kolom kali 2 baris, yaitu 6 kotak. 6 per 36 sama dengan seperenam, tepat setengah kali sepertiga.',
          add: [T('pab', 'P(A ∩ B) = 6/36 = 1/6', 305, 150, { size: 17, c: 'ok' }), T('pm', '= ½ × ⅓', 305, 180, { size: 17, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Aturan perkalian peluang',
      steps: [
        {
          say: 'Dua kejadian disebut saling bebas kalau hasil yang satu tidak memengaruhi yang lain. Untuk kejadian saling bebas, P dari A dan B sama dengan P A kali P B.',
          clear: true,
          add: [T('f', 'P(A ∩ B) = P(A) × P(B)', 200, 80, { size: 28, c: 'pos' })],
        },
        {
          say: 'Contoh: koin dilempar 3 kali. Peluang ketiganya gambar: setengah kali setengah kali setengah, yaitu seperdelapan.',
          add: [T('a', 'P(GGG) = ½ × ½ × ½ = ⅛', 200, 150, { size: 24 })],
        },
      ],
    },
    {
      title: 'Tanpa pengembalian',
      steps: [
        {
          say: 'Hati-hati. Kotak berisi 3 bola merah dan 2 bola putih. Ambil satu bola tanpa dikembalikan, lalu ambil lagi. Pengambilan kedua dipengaruhi yang pertama.',
          clear: true,
          add: [box('bx', 110, 160, 170, 90, { r: 10, fill: 'none', stroke: 'ink', sw: 2.5 }), ...[0, 1, 2].map((i) => ball(`m${i}`, 50 + i * 30, 160, 'neg')), ...[0, 1].map((i) => ball(`w${i}`, 140 + i * 30, 160, 'paper'))],
        },
        {
          say: 'Pengambilan pertama merah: peluangnya 3 per 5. Bola merah itu tidak dikembalikan.',
          set: { m2: { x: 300, y: 90 } },
          add: [T('a', 'pertama merah: 3/5', 300, 140, { size: 18 })],
        },
        {
          say: 'Sekarang tersisa 2 merah dari 4 bola. Peluang merah lagi 2 per 4. Jadi peluang keduanya merah: 3 per 5 kali 2 per 4, yaitu 3 per 10.',
          set: { m1: { x: 334, y: 90 } },
          add: [T('b', 'kedua merah: 2/4', 300, 175, { size: 18 }), T('c', '3/5 × 2/4 = {g:3/10}', 300, 215, { size: 20 })],
        },
        {
          say: 'Kalau bolanya dikembalikan, kedua pengambilan saling bebas: 3 per 5 kali 3 per 5, yaitu 9 per 25.',
          add: [T('d', 'dikembalikan: 3/5 × 3/5 = 9/25', 200, 270, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dua dadu dilempar. Berapa peluang keduanya muncul angka 6?',
          clear: true,
          add: [T('q', 'P(6 dan 6) = ?', 200, 120, { size: 34 })],
          ask: {
            options: [
              { t: '1/36', ok: true, why: '1/6 × 1/6 = 1/36. Hanya satu kotak dari 36.' },
              { t: '1/6', why: 'Itu peluang satu dadu saja.' },
              { t: '2/6', why: 'Itu 1/6 + 1/6. Untuk "dan" dikalikan.' },
              { t: '1/12', why: 'Ruang sampel dua dadu 36, bukan 12.' },
            ],
          },
        },
        {
          say: 'Kedua dadu saling bebas. Seperenam kali seperenam sama dengan 1 per 36.',
          add: [T('a', '1/6 × 1/6 = {g:1/36}', 200, 200, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Sebuah koin dan sebuah dadu dilempar. Peluang muncul angka pada koin dan bilangan prima pada dadu adalah … (tulis sebagai pecahan)',
      ans: ['1/4'],
      wrong: { '1/2': 'Bilangan prima pada dadu: 2, 3, 5, peluangnya 3/6 = ½. Lalu ½ × ½.', '1': 'Itu ½ + ½. "Dan" dikalikan.' },
      steps: ['P(angka) = ½, P(prima) = 3/6 = ½.', '½ × ½ = ¼.'],
    },
    {
      type: 'num',
      q: 'Tiga koin dilempar. Peluang ketiganya muncul angka adalah … (tulis sebagai pecahan)',
      ans: ['1/8'],
      wrong: { '3/2': 'Itu ½ + ½ + ½. Dikalikan, bukan dijumlah.', '1/6': '½ × ½ × ½ = ⅛.' },
      steps: ['Setiap koin ½, saling bebas.', '½ × ½ × ½ = ⅛.'],
    },
    {
      type: 'num',
      q: 'A dan B saling bebas dengan P(A) = 0,3 dan P(B) = 0,5. Nilai P(A ∩ B) adalah …',
      ans: ['0,15'],
      wrong: { '0,8': 'Itu P(A) + P(B). Untuk irisan saling bebas, dikalikan.', '1,5': '0,3 × 0,5 = 0,15.' },
      steps: ['P(A ∩ B) = P(A) × P(B).', '= 0,3 × 0,5 = 0,15.'],
    },
    {
      type: 'num',
      q: 'Kotak berisi 4 bola merah dan 6 bola biru. Diambil satu bola, dikembalikan, lalu diambil lagi. Peluang keduanya merah adalah … (tulis sebagai pecahan)',
      ans: ['4/25'],
      wrong: { '2/15': 'Itu tanpa pengembalian. Bola dikembalikan, jadi 4/10 × 4/10.', '4/5': 'Itu 4/10 + 4/10.' },
      steps: ['Dikembalikan → saling bebas.', '4/10 × 4/10 = 16/100 = 4/25.'],
    },
    {
      type: 'num',
      q: 'Kotak berisi 4 bola merah dan 6 bola biru. Diambil dua bola satu per satu tanpa pengembalian. Peluang keduanya merah adalah … (tulis sebagai pecahan)',
      ans: ['2/15'],
      wrong: { '4/25': 'Itu dengan pengembalian. Setelah satu merah diambil, tinggal 3 merah dari 9 bola.' },
      steps: ['Pertama: 4/10. Kedua: 3/9.', '4/10 × 3/9 = 12/90 = 2/15.'],
    },
  ],
};

export default {
  id: 'k10b8',
  no: 8,
  title: 'Peluang',
  desc: 'Kaidah pencacahan, peluang gabungan dan irisan, kejadian saling lepas, dan kejadian saling bebas.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Kata sandi terdiri dari 2 huruf (A–Z, boleh berulang) diikuti 1 angka (0–9). Banyak kata sandi yang mungkin adalah …',
      ans: ['6760'],
      wrong: { '62': 'Itu 26 + 26 + 10. Gunakan aturan perkalian.', '6500': '26 × 26 × 10 = 6.760.' },
      steps: ['26 × 26 × 10.', '= 6.760.'],
    },
    {
      type: 'num',
      q: 'A dan B saling lepas dengan P(A) = 1/4 dan P(B) = 1/3. Nilai P(A ∪ B) adalah … (tulis sebagai pecahan)',
      ans: ['7/12'],
      wrong: { '1/12': 'Itu P(A) × P(B). Saling lepas → dijumlah.', '2/7': 'Samakan penyebut: 3/12 + 4/12.' },
      steps: ['Saling lepas: P(A ∪ B) = P(A) + P(B).', '3/12 + 4/12 = 7/12.'],
    },
    {
      type: 'num',
      q: 'Dua dadu dilempar. Peluang jumlah kedua mata dadu sama dengan 7 adalah … (tulis sebagai pecahan)',
      ans: ['1/6'],
      wrong: { '7/36': 'Pasangan berjumlah 7 ada 6: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).', '1/12': 'Ada 6 pasangan, bukan 3.' },
      steps: ['Pasangan berjumlah 7: 6 pasangan.', '6/36 = 1/6.'],
    },
  ],
};
