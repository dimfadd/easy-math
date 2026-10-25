// Kelas 12 · Bab 3: Kombinatorik (lanjutan dari permutasi dan kombinasi kelas 11)
import { T, box } from '../helpers.js';
import { tag } from '../k10/kit.js';

const COL = { A: 'neg', B: 'pos', C: 'ok', D: 'acc', E: 'mut', F: 'ink' };
const kid = (id, n, x, y, o = {}) => ({ id, t: 'circle', x, y, r: 15, fill: COL[n], stroke: 'ink', sw: 2, label: n, lsize: 13, lc: n === 'D' || n === 'E' ? 'ink' : 'onfill', ...o });
const slot = (id, x, y, lab = '', o = {}) => box(id, x, y, 50, 50, { r: 8, fill: 'paper', sw: 2.5, ...(lab ? { label: lab, lsize: 22 } : {}), ...o });
const sub = (id, text, x, y, c = 'mut') => T(id, text, x, y, { size: 13, c });
const mul = (id, x, y) => T(id, '×', x, y, { size: 22, c: 'mut' });

// ---------- 3.1 Aturan pengisian tempat bersyarat ----------
const l1 = {
  id: 'k12b3-1',
  title: 'Pengisian Tempat Bersyarat',
  hook: 'Kalau ada syarat, isi dulu tempat yang paling ketat. Kalau syaratnya bercabang, pecah menjadi beberapa kasus lalu jumlahkan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dari angka 0, 1, 2, 3, dan 4 akan dibuat bilangan tiga angka dengan angka berbeda. Ada berapa bilangan?',
          add: [T('d', '0  1  2  3  4', 200, 70, { size: 32, c: 'pos' }), T('q', 'bilangan 3 angka, angka berbeda', 200, 130, { size: 20 }), T('q2', 'banyaknya = ?', 200, 175, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '48', ok: true, why: 'Ratusan tidak boleh 0: 4 pilihan. Puluhan 4, satuan 3. 4 × 4 × 3 = 48.' },
              { t: '60', why: '5 × 4 × 3 menghitung juga bilangan seperti 012, padahal itu bukan bilangan tiga angka.' },
              { t: '100', why: 'Angkanya harus berbeda, jadi pilihannya berkurang di setiap tempat.' },
              { t: '125', why: '5 × 5 × 5 membolehkan angka berulang dan angka 0 di depan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Isi yang paling ketat dulu',
      steps: [
        {
          say: 'Ada tiga tempat: ratusan, puluhan, dan satuan. Tempat ratusan punya syarat: tidak boleh 0. Isi tempat ini lebih dulu: 4 pilihan.',
          clear: true,
          add: [slot('s0', 120, 100, '4'), slot('s1', 200, 100), slot('s2', 280, 100), mul('m0', 160, 100), mul('m1', 240, 100), sub('l0', 'ratusan', 120, 142), sub('l1', 'puluhan', 200, 142), sub('l2', 'satuan', 280, 142), sub('k0', 'bukan 0', 120, 60, 'neg')],
        },
        {
          say: 'Puluhan boleh 0, tetapi satu angka sudah dipakai di ratusan. Dari 5 angka tersisa 4 pilihan. Satuan tinggal 3 pilihan.',
          set: { s1: slot('s1', 200, 100, '4'), s2: slot('s2', 280, 100, '3') },
        },
        {
          say: '4 kali 4 kali 3 sama dengan 48 bilangan.',
          add: [T('a', '4 × 4 × 3 = {g:48}', 200, 200, { size: 30 })],
        },
        {
          say: 'Kalau tempat yang bebas diisi dulu, kita bisa bingung: apakah angka 0 sudah terpakai atau belum? Karena itu, tempat bersyarat selalu diisi pertama.',
          add: [T('k', 'tempat bersyarat diisi pertama', 200, 250, { size: 17, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Syarat bercabang: pecah kasus',
      steps: [
        {
          say: 'Sekarang bilangannya harus genap. Satuan harus 0, 2, atau 4. Tetapi ada masalah: kalau satuannya 0, ratusan punya 4 pilihan. Kalau satuannya 2 atau 4, ratusan hanya 3 pilihan. Jadi kita pecah menjadi dua kasus.',
          clear: true,
          add: [T('q', 'genap, angka berbeda, dari 0 1 2 3 4', 200, 35, { size: 17, c: 'pos' })],
        },
        {
          say: 'Kasus A, satuan 0. Satuan 1 pilihan. Ratusan bebas dari 1 sampai 4: 4 pilihan. Puluhan 3 pilihan. Hasilnya 12.',
          add: [T('ka', 'A: satuan 0', 70, 80, { size: 15, c: 'acc' }), slot('a0', 160, 80, '4', { w: 40, h: 40 }), slot('a1', 215, 80, '3', { w: 40, h: 40 }), slot('a2', 270, 80, '1', { w: 40, h: 40 }), T('ar', '= 12', 340, 80, { size: 20, c: 'acc' })],
        },
        {
          say: 'Kasus B, satuan 2 atau 4: 2 pilihan. Ratusan tidak boleh 0 dan tidak boleh sama dengan satuan: 3 pilihan. Puluhan 3 pilihan. Hasilnya 18.',
          add: [T('kb', 'B: satuan 2/4', 70, 140, { size: 15, c: 'neg' }), slot('b0', 160, 140, '3', { w: 40, h: 40 }), slot('b1', 215, 140, '3', { w: 40, h: 40 }), slot('b2', 270, 140, '2', { w: 40, h: 40 }), T('br', '= 18', 340, 140, { size: 20, c: 'neg' })],
        },
        {
          say: 'Kasus A dan kasus B tidak mungkin terjadi bersamaan. Jadi hasilnya dijumlah: 12 tambah 18 sama dengan 30.',
          add: [T('t', '12 + 18 = {g:30}', 200, 210, { size: 30 })],
        },
      ],
    },
    {
      title: 'Kali atau tambah?',
      steps: [
        {
          say: 'Aturan perkalian dipakai untuk langkah yang dilakukan berurutan, seperti mengisi tempat demi tempat. Kata kuncinya: lalu, dan.',
          clear: true,
          add: [T('a', 'berurutan (lalu, dan) → kali', 200, 70, { size: 22, c: 'pos' }), T('a2', 'A ke B lewat 3 jalan, lalu B ke C lewat 2 jalan: 3 × 2 = 6', 200, 105, { size: 14, c: 'mut' })],
        },
        {
          say: 'Aturan penjumlahan dipakai untuk kasus yang terpisah, ketika kita memilih salah satu. Kata kuncinya: atau.',
          add: [T('b', 'kasus terpisah (atau) → tambah', 200, 170, { size: 22, c: 'acc' }), T('b2', 'ke sekolah naik 3 bus atau 2 angkot: 3 + 2 = 5', 200, 205, { size: 14, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari angka 1 sampai 6 dibuat bilangan tiga angka berbeda yang lebih dari 400. Ada berapa bilangan?',
          clear: true,
          add: [T('d', '1  2  3  4  5  6', 200, 70, { size: 30, c: 'pos' }), T('q', '3 angka berbeda, lebih dari 400', 200, 130, { size: 20 }), T('q2', 'banyaknya = ?', 200, 175, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '60', ok: true, why: 'Ratusan 4, 5, atau 6: 3 pilihan. Puluhan 5, satuan 4. 3 × 5 × 4 = 60.' },
              { t: '120', why: '6 × 5 × 4 menghitung juga bilangan yang ratusannya 1, 2, atau 3.' },
              { t: '90', why: 'Angka berbeda: setelah ratusan dipilih, puluhan tinggal 5 pilihan, bukan 6.' },
              { t: '36', why: 'Puluhan masih punya 5 pilihan, termasuk angka 1, 2, dan 3.' },
            ],
          },
        },
        {
          say: 'Ratusan paling ketat: harus 4, 5, atau 6. Lalu puluhan 5 pilihan dan satuan 4 pilihan. 3 kali 5 kali 4 sama dengan 60.',
          add: [T('a', '3 × 5 × 4 = {g:60}', 200, 235, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Dari angka 0, 1, 2, 3 dibuat bilangan dua angka dengan angka berbeda. Banyak bilangan yang dapat dibuat adalah …',
      ans: ['9'],
      wrong: { '12': 'Puluhan tidak boleh 0: 3 pilihan. Satuan 3 pilihan.', '16': 'Angkanya harus berbeda dan puluhan tidak boleh 0.' },
      steps: ['Puluhan: 1, 2, 3 → 3 pilihan. Satuan: 3 pilihan tersisa.', '3 × 3 = 9.'],
    },
    {
      type: 'num',
      q: 'Dari angka 1, 2, 3, 4, 5 dibuat bilangan tiga angka berbeda yang ganjil. Banyak bilangan itu adalah …',
      ans: ['36'],
      wrong: { '60': 'Itu semua bilangan tiga angka berbeda. Satuan harus 1, 3, atau 5.', '27': 'Angka berbeda: setelah satuan dipilih, ratusan 4 pilihan dan puluhan 3 pilihan.' },
      steps: ['Satuan dulu: 1, 3, 5 → 3 pilihan. Ratusan 4, puluhan 3.', '3 × 4 × 3 = 36.'],
    },
    {
      type: 'num',
      q: 'Kode loker terdiri dari 2 huruf vokal (A, I, U, E, O) diikuti 2 angka (0–9). Huruf dan angka boleh berulang. Banyak kode yang mungkin adalah …',
      ans: ['2500'],
      wrong: { '2000': 'Angka boleh berulang: 10 × 10 untuk dua angka.', '1800': 'Huruf dan angka boleh berulang: 5 × 5 × 10 × 10.' },
      steps: ['Huruf: 5 × 5. Angka: 10 × 10.', '25 × 100 = 2.500.'],
    },
    {
      q: 'Dari rumah ke perpustakaan Rani bisa naik salah satu dari 3 angkot atau salah satu dari 2 ojek. Banyak cara Rani pergi adalah …',
      options: [
        { t: '5', ok: true },
        { t: '6', why: 'Rani memilih angkot atau ojek, bukan keduanya berurutan. Pakai penjumlahan.' },
        { t: '3', why: 'Pilihan ojek juga dihitung.' },
        { t: '9', why: 'Hanya ada 3 + 2 kendaraan untuk dipilih.' },
      ],
      steps: ['Kasus terpisah (atau) → tambah.', '3 + 2 = 5.'],
    },
    {
      type: 'num',
      q: 'Dari angka 0, 1, 2, 3, 4, 5 dibuat bilangan tiga angka. Angka boleh berulang. Banyak bilangan itu adalah …',
      ans: ['180'],
      wrong: { '216': 'Ratusan tidak boleh 0: 5 pilihan, bukan 6.', '100': 'Angka boleh berulang: puluhan dan satuan masing-masing 6 pilihan.' },
      steps: ['Ratusan: 5 pilihan (bukan 0). Puluhan 6, satuan 6.', '5 × 6 × 6 = 180.'],
    },
  ],
};

// ---------- 3.2 Permutasi siklis ----------
const RC = [130, 150];
const RR = 62;
const seat = (k, n = 4) => {
  const a = Math.PI / 2 - (2 * Math.PI * k) / n;
  return [RC[0] + RR * Math.cos(a), RC[1] - RR * Math.sin(a)];
};
const table4 = () => ({ id: 'tb', t: 'circle', x: RC[0], y: RC[1], r: 40, fill: 'acc-soft', stroke: 'acc', sw: 2 });
const RX = 315;

const l2 = {
  id: 'k12b3-2',
  title: 'Permutasi Siklis',
  hook: 'Pada susunan melingkar, memutar semua orang tidak menghasilkan susunan baru. Karena itu banyak susunannya (n − 1)!.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ana, Budi, Cici, dan Dodi duduk mengelilingi meja bundar. Yang dihitung hanya siapa di sebelah siapa. Ada berapa susunan berbeda?',
          add: [table4(), ...'ABCD'.split('').map((n, i) => kid(`k${n}`, n, ...seat(i))), T('q', 'meja bundar', RX, 110, { size: 18, c: 'acc' }), T('q2', 'susunan = ?', RX, 150, { size: 22 })],
          ask: {
            options: [
              { t: '6', ok: true, why: 'Kunci satu orang, tiga lainnya disusun: 3! = 6.' },
              { t: '24', why: '4! = 24 menghitung putaran yang sama sebagai susunan berbeda. Setiap susunan terhitung 4 kali.' },
              { t: '12', why: '12 adalah 4! ÷ 2. Pada meja bundar, yang dibagi adalah 4, banyak cara memutar.' },
              { t: '4', why: 'Susunan berbeda kalau urutan tetangganya berbeda, dan ada lebih dari 4.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diputar, susunannya sama',
      steps: [
        {
          say: 'Perhatikan urutan searah jarum jam: A, B, C, D. Sekarang semua orang bergeser satu kursi.',
          clear: true,
          add: [table4(), ...'ABCD'.split('').map((n, i) => kid(`k${n}`, n, ...seat(i))), T('a', 'A → B → C → D', RX, 80, { size: 17 })],
        },
        {
          say: 'Posisi kursinya berubah, tetapi setiap orang masih bersebelahan dengan orang yang sama. Susunan melingkarnya tidak berubah.',
          set: Object.fromEntries('ABCD'.split('').map((n, i) => [`k${n}`, { x: seat(i + 1)[0], y: seat(i + 1)[1] }])),
          add: [T('b', 'tetap A → B → C → D', RX, 110, { size: 15, c: 'ok' })],
        },
        {
          say: 'Bergeser satu kali lagi, dua kali lagi, tetap sama. Jadi 4 susunan berjajar ABCD, BCDA, CDAB, dan DABC hanya terhitung 1 susunan melingkar.',
          set: Object.fromEntries('ABCD'.split('').map((n, i) => [`k${n}`, { x: seat(i + 2)[0], y: seat(i + 2)[1] }])),
          add: [T('c', 'ABCD = BCDA', RX, 160, { size: 17, c: 'pos' }), T('c2', '= CDAB = DABC', RX, 188, { size: 17, c: 'pos' })],
        },
        {
          say: 'Karena itu, 4 faktorial harus dibagi 4. 24 dibagi 4 sama dengan 6.',
          add: [T('d', '4! ÷ 4 = 6', RX, 240, { size: 24, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Kunci satu orang',
      steps: [
        {
          say: 'Cara lain: kunci posisi Ana. Karena meja diputar tidak berpengaruh, Ana boleh di mana saja.',
          clear: true,
          add: [table4(), kid('kA', 'A', ...seat(0)), ...[1, 2, 3].map((k) => slot(`s${k}`, ...seat(k), '', { w: 32, h: 32 })), T('a', 'A dikunci', RX, 80, { size: 17, c: 'neg' })],
        },
        {
          say: 'Tiga kursi sisanya diisi Budi, Cici, dan Dodi dengan urutan bebas: 3 faktorial, yaitu 6.',
          add: [T('b', 'sisa 3 orang: 3! = 6', RX, 125, { size: 17 })],
        },
        {
          say: 'Untuk n benda yang disusun melingkar, banyak susunannya n dikurangi 1, faktorial.',
          add: [tag('f', 'P siklis = (n − 1)!', RX, 185, 'pos', 18)],
        },
      ],
    },
    {
      title: 'Gelang dan kalung',
      steps: [
        {
          say: 'Gelang manik-manik bisa dibalik. Urutan searah jarum jam dan berlawanan jarum jam terlihat sama.',
          clear: true,
          add: [{ id: 'g', t: 'circle', x: RC[0], y: RC[1], r: RR, fill: 'none', stroke: 'mut', sw: 3 }, ...'ABCDE'.split('').map((n, i) => kid(`k${n}`, n, ...seat(i, 5), { r: 13 })), T('a', 'dibalik = sama', RX, 90, { size: 17, c: 'acc' })],
        },
        {
          say: 'Jadi hasil permutasi siklis dibagi 2 lagi. Untuk 5 manik berbeda: 4 faktorial dibagi 2, yaitu 12.',
          add: [tag('f', '(n − 1)! ÷ 2', RX, 145, 'acc', 18), T('b', '5 manik: 4! ÷ 2 = 12', RX, 195, { size: 16 })],
        },
        {
          say: 'Pembagian 2 hanya untuk benda yang bisa dibalik, seperti gelang atau kalung. Orang di meja bundar tidak bisa dibalik.',
          add: [T('c', 'meja bundar: tidak dibagi 2', RX, 240, { size: 13, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Enam orang duduk mengelilingi meja bundar. Ada berapa susunan berbeda?',
          clear: true,
          add: [T('q', '6 orang, meja bundar', 200, 100, { size: 28, c: 'pos' }), T('q2', 'susunan = ?', 200, 155, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '120', ok: true, why: '(6 − 1)! = 5! = 120.' },
              { t: '720', why: '6! = 720 menghitung putaran yang sama berkali-kali.' },
              { t: '60', why: '5! ÷ 2 = 60 hanya untuk gelang yang bisa dibalik.' },
              { t: '30', why: '(6 − 1)! = 5 × 4 × 3 × 2 × 1 = 120.' },
            ],
          },
        },
        {
          say: '6 dikurangi 1 sama dengan 5. 5 faktorial sama dengan 120.',
          add: [T('a', '(6 − 1)! = 5! = {g:120}', 200, 225, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Lima orang duduk mengelilingi meja bundar. Banyak susunan duduk yang berbeda adalah …',
      ans: ['24'],
      wrong: { '120': 'Itu 5!. Susunan melingkar: (5 − 1)!.', '12': 'Orang di meja bundar tidak dibagi 2.' },
      steps: ['(5 − 1)! = 4!.', '= 24.'],
    },
    {
      type: 'num',
      q: 'Tujuh anggota keluarga duduk mengelilingi meja makan bundar. Banyak susunan duduknya adalah …',
      ans: ['720'],
      wrong: { '5040': 'Itu 7!. Susunan melingkar: 6!.', '360': 'Tidak dibagi 2 karena orang tidak bisa dibalik seperti gelang.' },
      steps: ['(7 − 1)! = 6!.', '= 720.'],
    },
    {
      type: 'num',
      q: 'Enam manik-manik berbeda warna dirangkai menjadi gelang. Banyak gelang berbeda yang dapat dibuat adalah …',
      ans: ['60'],
      wrong: { '120': 'Gelang bisa dibalik, jadi 5! dibagi 2.', '360': '(6 − 1)! ÷ 2 = 120 ÷ 2 = 60.' },
      steps: ['(6 − 1)! ÷ 2 = 120 ÷ 2.', '= 60.'],
    },
    {
      type: 'num',
      q: 'Lima orang duduk mengelilingi meja bundar. Ana dan Budi harus duduk berdampingan. Banyak susunannya adalah …',
      ans: ['12'],
      wrong: { '6': 'Ana dan Budi bisa bertukar tempat: dikali 2.', '24': 'Anggap Ana dan Budi satu kelompok: 4 unsur melingkar = 3! = 6, lalu × 2.' },
      steps: ['Ana-Budi dianggap satu: 4 unsur melingkar → 3! = 6.', 'Ana dan Budi bertukar: 6 × 2 = 12.'],
    },
    {
      q: 'Banyak susunan n benda berbeda yang disusun melingkar adalah …',
      options: [
        { t: '(n − 1)!', ok: true },
        { t: 'n!', why: 'n! menghitung putaran yang sama sebagai susunan berbeda.' },
        { t: '(n − 1)! ÷ 2', why: 'Itu untuk gelang atau kalung yang bisa dibalik.' },
        { t: 'n! ÷ 2', why: 'Susunan melingkar membagi n!, dengan n, bukan 2.' },
      ],
      steps: ['n! ÷ n = (n − 1)!.'],
    },
  ],
};

// ---------- 3.3 Segitiga Pascal dan binomial Newton ----------
const PASCAL = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, 10, 10, 5, 1]];
const pX = (n, k) => 200 + (k - n / 2) * 46;
const pY = (n) => 40 + n * 34;
const pcell = (n, k, o = {}) => box(`p${n}${k}`, pX(n, k), pY(n), 38, 26, { r: 6, fill: 'paper', sw: 1.5, label: String(PASCAL[n][k]), lsize: 15, ...o });
const prow = (n, o) => PASCAL[n].map((_, k) => pcell(n, k, o));

const l3 = {
  id: 'k12b3-3',
  title: 'Segitiga Pascal dan Binomial Newton',
  hook: 'Koefisien hasil pangkat (a + b)ⁿ adalah bilangan kombinasi. Segitiga Pascal menyusunnya dengan cara menjumlah dua angka di atasnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bentuk x tambah 1 pangkat 4 dijabarkan. Berapa koefisien x kuadrat?',
          add: [T('q', '(x + 1)⁴ = x⁴ + … x² + …', 200, 100, { size: 28, c: 'pos' }), T('q2', 'koefisien x² = ?', 200, 160, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '6', ok: true, why: 'x² muncul ketika x dipilih dari 2 kurung dan 1 dari 2 kurung lainnya: C(4, 2) = 6.' },
              { t: '4', why: '4 adalah koefisien x³ dan x.' },
              { t: '2', why: 'Pangkat 2 bukan koefisiennya.' },
              { t: '8', why: 'Koefisiennya mengikuti baris 1, 4, 6, 4, 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Segitiga Pascal',
      steps: [
        {
          say: 'Mulai dari angka 1 di puncak. Setiap baris diawali dan diakhiri 1.',
          clear: true,
          add: [...prow(0), ...prow(1), ...prow(2)],
        },
        {
          say: 'Angka di tengah adalah jumlah dua angka tepat di atasnya. 1 tambah 2 sama dengan 3.',
          add: [...prow(3)],
          hl: ['p21', 'p22', 'p32'],
        },
        {
          say: 'Baris berikutnya: 1, 4, 6, 4, 1. Angka 6 berasal dari 3 tambah 3.',
          add: [...prow(4)],
          hl: ['p31', 'p32', 'p42'],
        },
        {
          say: 'Lalu 1, 5, 10, 10, 5, 1. Begitu seterusnya.',
          add: [...prow(5)],
        },
      ],
    },
    {
      title: 'Kenapa sama dengan kombinasi?',
      steps: [
        {
          say: 'x tambah 1 pangkat 4 adalah empat kurung yang dikalikan. Dari setiap kurung kita ambil x atau 1.',
          clear: true,
          add: [T('a', '(x + 1)(x + 1)(x + 1)(x + 1)', 200, 50, { size: 24, c: 'pos' })],
        },
        {
          say: 'Untuk mendapat x kuadrat, pilih x dari 2 kurung di antara 4 kurung. Banyak caranya C 4 koma 2, yaitu 6.',
          add: [T('b', 'x² : pilih 2 kurung dari 4 → C(4, 2) = 6', 200, 100, { size: 18 })],
        },
        {
          say: 'Begitu juga suku lainnya. Hasilnya adalah baris keempat segitiga Pascal.',
          add: [T('c', 'C(4,0)  C(4,1)  C(4,2)  C(4,3)  C(4,4)', 200, 160, { size: 16, c: 'mut' }), T('d', '1       4       6       4       1', 200, 190, { size: 22, c: 'acc' }), T('e', '(x + 1)⁴ = x⁴ + 4x³ + 6x² + 4x + 1', 200, 250, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Binomial Newton',
      steps: [
        {
          say: 'Bentuk umumnya disebut binomial Newton. Koefisien suku ke-k adalah C n koma k. Pangkat a turun, pangkat b naik.',
          clear: true,
          add: [T('f', '(a + b)ⁿ: koefisien C(n, k) · aⁿ⁻ᵏ · bᵏ', 200, 50, { size: 20, c: 'pos' })],
        },
        {
          say: 'Contoh: x tambah 2 pangkat 3. Koefisien baris ketiga: 1, 3, 3, 1. Pangkat 2 naik: 1, 2, 4, 8.',
          add: [T('a', '(x + 2)³', 200, 100, { size: 26 }), T('b', 'Pascal:    1     3     3     1', 200, 140, { size: 18, c: 'acc' }), T('c', 'pangkat 2:  1     2     4     8', 200, 170, { size: 18, c: 'neg' })],
        },
        {
          say: 'Kalikan pasangannya: 1, 6, 12, 8. Jadi x tambah 2 pangkat 3 sama dengan x pangkat 3 tambah 6x kuadrat tambah 12x tambah 8.',
          add: [T('d', '= x³ + 6x² + 12x + 8', 200, 225, { size: 26, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa koefisien x kuadrat pada x tambah 3 pangkat 4?',
          clear: true,
          add: [T('q', '(x + 3)⁴', 200, 90, { size: 36, c: 'pos' }), T('q2', 'koefisien x² = ?', 200, 150, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '54', ok: true, why: 'C(4, 2) × 3² = 6 × 9 = 54.' },
              { t: '6', why: '6 dari segitiga Pascal masih harus dikali 3².' },
              { t: '18', why: 'Angka 3 dipangkatkan 2, menjadi 9, bukan dikali 3.' },
              { t: '81', why: '81 = 3⁴, suku konstanta.' },
            ],
          },
        },
        {
          say: 'x kuadrat berarti b, yaitu 3, dipilih dari 2 kurung. C 4 koma 2 sama dengan 6, dikali 3 kuadrat sama dengan 9. 6 kali 9 sama dengan 54.',
          add: [T('a', 'C(4, 2) × 3² = 6 × 9 = {g:54}', 200, 220, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Baris segitiga Pascal 1, 5, 10, 10, 5, 1. Baris berikutnya diawali 1, 6, … Angka ketiganya adalah …',
      ans: ['15'],
      wrong: { '20': '20 adalah angka tengah. Angka ketiga = 5 + 10.', '11': 'Jumlahkan dua angka di atasnya: 5 + 10.' },
      steps: ['Angka ketiga = 5 + 10.', '= 15.'],
    },
    {
      type: 'num',
      q: 'Koefisien x³ pada penjabaran (x + 1)⁵ adalah …',
      ans: ['10'],
      wrong: { '5': '5 adalah koefisien x⁴ dan x. Untuk x³: C(5, 3).', '3': 'Pangkat 3 bukan koefisiennya.' },
      steps: ['Koefisien x³ = C(5, 3).', '= 10.'],
    },
    {
      type: 'num',
      q: 'Suku konstanta (tanpa x) pada penjabaran (x + 2)³ adalah …',
      ans: ['8'],
      wrong: { '6': 'Suku konstanta = 2³.', '2': '2 dipangkatkan 3: 8.' },
      steps: ['Suku konstanta muncul saat 2 dipilih dari ketiga kurung.', '2³ = 8.'],
    },
    {
      type: 'num',
      q: 'Koefisien x pada penjabaran (x − 1)⁴ adalah …',
      ans: ['-4'],
      wrong: { '4': 'Suku x memakai (−1)³ = −1, jadi tandanya negatif.', '-1': 'C(4, 3) × (−1)³ = 4 × (−1) = −4.' },
      steps: ['Suku x: C(4, 3) · x · (−1)³.', '= 4 × (−1) = −4.'],
    },
    {
      type: 'num',
      q: 'Jumlah semua koefisien pada penjabaran (x + 1)⁶ adalah …',
      ans: ['64'],
      wrong: { '7': 'Itu banyak suku. Jumlah koefisien = nilai saat x = 1: 2⁶.', '36': '(1 + 1)⁶ = 2⁶ = 64.' },
      steps: ['Jumlah koefisien = nilai bentuk itu saat x = 1.', '(1 + 1)⁶ = 2⁶ = 64.'],
    },
  ],
};

// ---------- 3.4 Peluang dengan kombinatorik ----------
const ball = (id, c, lab, x, y, o = {}) => ({ id, t: 'circle', x, y, r: 12, fill: c, stroke: 'ink', sw: 1.5, label: lab, lsize: 11, lc: 'onfill', ...o });
const BALLS = [['neg', '1'], ['neg', '2'], ['neg', '3'], ['pos', '1'], ['pos', '2']];
const PAIRS = [];
for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) PAIRS.push([i, j]);
const pairX = (k) => 60 + (k % 5) * 70;
const pairY = (k) => 130 + Math.floor(k / 5) * 60;
const pairEls = (k, o = {}) => {
  const [i, j] = PAIRS[k];
  return [ball(`q${k}a`, BALLS[i][0], BALLS[i][1], pairX(k) - 13, pairY(k), o), ball(`q${k}b`, BALLS[j][0], BALLS[j][1], pairX(k) + 13, pairY(k), o)];
};
const bag = () => [{ id: 'bg', t: 'rect', x: 200, y: 50, w: 190, h: 50, r: 14, fill: 'mut-soft', stroke: 'mut', sw: 2 }, ...BALLS.map(([c, l], i) => ball(`b${i}`, c, l, 136 + i * 32, 50))];

const l4 = {
  id: 'k12b3-4',
  title: 'Peluang dengan Kombinatorik',
  hook: 'Kalau beberapa benda diambil sekaligus, banyak kejadian dan banyak ruang sampel dihitung dengan kombinasi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kantong berisi 3 bola merah dan 2 bola biru. Diambil 2 bola sekaligus. Berapa peluang keduanya merah?',
          add: [...bag(), T('q', 'ambil 2 sekaligus', 200, 130, { size: 20 }), T('q2', 'P(keduanya merah) = ?', 200, 175, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '3/10', ok: true, why: 'Ada C(5, 2) = 10 pasangan, dan C(3, 2) = 3 pasangan merah-merah.' },
              { t: '9/25', why: '3/5 × 3/5 berlaku kalau bola dikembalikan. Di sini diambil sekaligus.' },
              { t: '3/5', why: '3/5 adalah peluang satu bola merah saja.' },
              { t: '2/5', why: 'Hitung pasangan: ada 10 pasangan, 3 di antaranya merah-merah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Hitung ruang sampel',
      steps: [
        {
          say: 'Diambil sekaligus berarti urutan tidak penting. Banyak pasangan yang mungkin adalah C 5 koma 2, yaitu 10. Ini semua pasangannya.',
          clear: true,
          add: [...bag(), ...PAIRS.flatMap((_, k) => pairEls(k)), T('n', 'n(S) = C(5, 2) = 10', 200, 245, { size: 20 })],
        },
        {
          say: 'Pasangan yang keduanya merah ada 3. Itu sama dengan C 3 koma 2, memilih 2 dari 3 bola merah.',
          hl: ['q0a', 'q0b', 'q1a', 'q1b', 'q4a', 'q4b'],
          add: [T('a', 'n(A) = C(3, 2) = 3', 200, 277, { size: 18, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Rumus peluangnya',
      steps: [
        {
          say: 'Peluang sama dengan banyak kejadian dibagi banyak ruang sampel. 3 dibagi 10.',
          clear: true,
          add: [T('f', 'P(A) = n(A) ÷ n(S)', 200, 60, { size: 26, c: 'pos' }), T('a', 'P(2 merah) = C(3, 2) ÷ C(5, 2) = 3/10', 200, 110, { size: 20 })],
        },
        {
          say: 'Bagaimana dengan 1 merah dan 1 biru? Pilih 1 dari 3 merah dan 1 dari 2 biru: 3 kali 2 sama dengan 6. Peluangnya 6 per 10, yaitu 3 per 5.',
          add: [T('b', 'P(1 merah, 1 biru) = C(3, 1) × C(2, 1) ÷ C(5, 2)', 200, 170, { size: 17 }), T('b2', '= 3 × 2 ÷ 10 = 6/10 = 3/5', 200, 200, { size: 20, c: 'acc' })],
        },
        {
          say: 'Dan 2 biru: C 2 koma 2, yaitu 1. Peluangnya 1 per 10. Ketiga peluang itu jika dijumlah sama dengan 1.',
          add: [T('c', 'P(2 biru) = 1/10', 200, 240, { size: 18, c: 'pos' }), T('d', '3/10 + 6/10 + 1/10 = 1', 200, 275, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kotak berisi 4 bola merah dan 3 bola putih. Diambil 3 bola sekaligus. Berapa peluang ketiganya merah?',
          clear: true,
          add: [T('q', '4 merah, 3 putih, ambil 3 sekaligus', 200, 100, { size: 22, c: 'pos' }), T('q2', 'P(3 merah) = ?', 200, 155, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '4/35', ok: true, why: 'C(4, 3) = 4 dan C(7, 3) = 35.' },
              { t: '4/7', why: '4/7 adalah peluang satu bola merah saja.' },
              { t: '64/343', why: '(4/7)³ berlaku kalau bola dikembalikan.' },
              { t: '3/7', why: 'Hitung dengan kombinasi: C(4, 3) ÷ C(7, 3).' },
            ],
          },
        },
        {
          say: 'Banyak cara mengambil 3 merah: C 4 koma 3, yaitu 4. Banyak cara mengambil 3 bola apa saja: C 7 koma 3, yaitu 35. Peluangnya 4 per 35.',
          add: [T('a', 'C(4, 3) ÷ C(7, 3) = 4 ÷ 35 = {g:4/35}', 200, 225, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Kantong berisi 5 bola merah dan 3 bola biru. Banyak cara mengambil 2 bola merah sekaligus adalah …',
      ans: ['10'],
      wrong: { '20': 'Diambil sekaligus, urutan tidak penting: C(5, 2) = 10.', '28': 'Itu C(8, 2), semua bola. Yang diminta hanya bola merah.' },
      steps: ['C(5, 2) = (5 × 4) ÷ 2.', '= 10.'],
    },
    {
      type: 'num',
      q: 'Kantong berisi 5 bola merah dan 3 bola biru. Diambil 2 bola sekaligus. Peluang keduanya merah adalah …',
      ans: ['5/14', '10/28'],
      wrong: { '25/64': 'Itu kalau bola dikembalikan. Pakai C(5, 2) ÷ C(8, 2).', '5/8': 'Itu peluang satu bola merah saja.' },
      steps: ['C(5, 2) = 10, C(8, 2) = 28.', 'P = 10/28 = 5/14.'],
    },
    {
      type: 'num',
      q: 'Dari 6 siswa putra dan 4 siswa putri dipilih 3 orang secara acak. Peluang ketiganya putri adalah …',
      ans: ['1/30', '4/120'],
      wrong: { '4/10': 'Hitung dengan kombinasi: C(4, 3) ÷ C(10, 3).', '1/10': 'C(10, 3) = 120, jadi 4/120 = 1/30.' },
      steps: ['C(4, 3) = 4, C(10, 3) = 120.', 'P = 4/120 = 1/30.'],
    },
    {
      q: 'Dari seperangkat kartu remi (52 kartu, 4 kartu As) diambil 2 kartu sekaligus. Peluang keduanya As adalah …',
      options: [
        { t: 'C(4, 2) ÷ C(52, 2)', ok: true },
        { t: '4/52 × 4/52', why: 'Itu kalau kartu pertama dikembalikan.' },
        { t: '2/52', why: 'Banyak kejadian dan ruang sampel dihitung dengan kombinasi.' },
        { t: 'C(2, 4) ÷ C(52, 4)', why: 'Yang diambil 2 kartu dari 4 As dan 2 kartu dari 52 kartu.' },
      ],
      steps: ['n(A) = C(4, 2), n(S) = C(52, 2).', 'P = C(4, 2) ÷ C(52, 2) = 6/1326 = 1/221.'],
    },
    {
      type: 'num',
      q: 'Kantong berisi 3 bola merah dan 2 bola biru. Diambil 2 bola sekaligus. Peluang terambil 1 merah dan 1 biru adalah …',
      ans: ['3/5', '6/10'],
      wrong: { '1/2': 'C(3, 1) × C(2, 1) = 6, dibagi C(5, 2) = 10.', '6/25': 'Pakai kombinasi, bukan perkalian peluang dengan pengembalian.' },
      steps: ['C(3, 1) × C(2, 1) = 6. C(5, 2) = 10.', 'P = 6/10 = 3/5.'],
    },
  ],
};

export default {
  id: 'k12b3',
  no: 3,
  title: 'Kombinatorik',
  desc: 'Pengisian tempat dengan syarat dan pembagian kasus, permutasi siklis, segitiga Pascal dan binomial Newton, serta peluang dengan kombinasi.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      type: 'num',
      q: 'Dari angka 1, 2, 3, 4, 5, 6 dibuat bilangan dua angka berbeda yang kurang dari 40. Banyak bilangan itu adalah …',
      ans: ['15'],
      wrong: { '18': 'Angka berbeda: setelah puluhan dipilih, satuan tinggal 5 pilihan.', '30': 'Puluhan hanya boleh 1, 2, atau 3.' },
      steps: ['Puluhan: 1, 2, 3 → 3 pilihan. Satuan: 5 pilihan.', '3 × 5 = 15.'],
    },
    {
      type: 'num',
      q: 'Delapan orang duduk mengelilingi meja bundar. Banyak susunan duduknya adalah …',
      ans: ['5040'],
      wrong: { '40320': 'Itu 8!. Susunan melingkar: 7!.', '2520': 'Orang di meja bundar tidak dibagi 2.' },
      steps: ['(8 − 1)! = 7!.', '= 5.040.'],
    },
    {
      type: 'num',
      q: 'Koefisien x²y² pada penjabaran (x + y)⁴ adalah …',
      ans: ['6'],
      wrong: { '4': 'Koefisien x²y² = C(4, 2).', '2': 'C(4, 2) = 6.' },
      steps: ['Pilih y dari 2 kurung di antara 4.', 'C(4, 2) = 6.'],
    },
  ],
};
