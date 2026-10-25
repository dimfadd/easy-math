// Kelas 11 · Bab 4: Permutasi, Kombinasi, dan Peluang Bersyarat
import { T, box, table } from '../helpers.js';
import { tag } from '../k10/kit.js';

const COL = { A: 'neg', B: 'pos', C: 'ok', D: 'acc', E: 'mut' };
const kid = (id, n, x, y, o = {}) => ({ id, t: 'circle', x, y, r: 14, fill: COL[n], stroke: 'ink', sw: 2, label: n, lsize: 13, lc: n === 'D' || n === 'E' ? 'ink' : 'onfill', ...o });
const slot = (id, x, y, lab = '', o = {}) => box(id, x, y, 50, 50, { r: 8, fill: 'paper', sw: 2.5, ...(lab ? { label: lab, lsize: 22 } : {}), ...o });

// ---------- 4.1 Permutasi ----------
const PERMS = ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA'];

const l1 = {
  id: 'k11b4-1',
  title: 'Permutasi',
  hook: 'Permutasi menghitung banyak susunan ketika urutan diperhatikan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ana, Budi, dan Cici berfoto berjajar. Ada berapa cara mereka berdiri?',
          add: [kid('a', 'A', 160, 120), kid('b', 'B', 200, 120), kid('c', 'C', 240, 120), T('q', 'berjajar: berapa susunan?', 200, 180, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: '6', ok: true, why: 'Posisi kiri 3 pilihan, tengah 2, kanan 1: 3 × 2 × 1 = 6.' },
              { t: '3', why: 'Setiap orang bisa di posisi mana saja, bukan hanya bergiliran di depan.' },
              { t: '9', why: '3 × 3 berarti orang yang sama boleh berdiri di dua tempat.' },
              { t: '27', why: 'Satu orang tidak bisa menempati dua posisi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Isi posisi satu per satu',
      steps: [
        {
          say: 'Posisi paling kiri bisa diisi siapa saja: 3 pilihan.',
          clear: true,
          add: [slot('s0', 120, 80, '3'), slot('s1', 200, 80), slot('s2', 280, 80), T('m0', '×', 160, 80, { size: 22, c: 'mut' }), T('m1', '×', 240, 80, { size: 22, c: 'mut' })],
        },
        {
          say: 'Satu orang sudah berdiri, jadi posisi tengah tinggal 2 pilihan. Posisi kanan tinggal 1.',
          set: { s1: slot('s1', 200, 80, '2'), s2: slot('s2', 280, 80, '1') },
        },
        {
          say: '3 kali 2 kali 1 sama dengan 6. Ini semua susunannya.',
          add: PERMS.flatMap((p, i) => [...p].map((n, j) => kid(`p${i}${j}`, n, 80 + (i % 3) * 115 + j * 28, 165 + Math.floor(i / 3) * 50, { r: 12 }))),
        },
        {
          say: 'Perkalian 3 kali 2 kali 1 ditulis 3 faktorial, 3 tanda seru. n faktorial adalah hasil kali n, n dikurangi 1, dan seterusnya sampai 1.',
          add: [tag('f', '3! = 3 × 2 × 1 = 6', 200, 280, 'ok', 16)],
        },
      ],
    },
    {
      title: 'Memilih sebagian',
      steps: [
        {
          say: 'Dari 5 calon, akan dipilih ketua dan wakil. Urutan penting: Ana ketua dan Budi wakil berbeda dengan Budi ketua dan Ana wakil.',
          clear: true,
          add: [...'ABCDE'.split('').map((n, i) => kid(`k${i}`, n, 120 + i * 40, 50)), slot('s0', 160, 140, '5'), slot('s1', 240, 140), T('l0', 'ketua', 160, 182, { size: 14, c: 'mut' }), T('l1', 'wakil', 240, 182, { size: 14, c: 'mut' }), T('m0', '×', 200, 140, { size: 22, c: 'mut' })],
        },
        {
          say: 'Ketua 5 pilihan, wakil 4 pilihan. 5 kali 4 sama dengan 20 susunan.',
          set: { s1: slot('s1', 240, 140, '4') },
          add: [T('a', '5 × 4 = 20', 200, 225, { size: 26, c: 'ok' })],
        },
        {
          say: 'Ini disebut permutasi 2 dari 5, ditulis P 5 koma 2. Rumusnya n faktorial dibagi n dikurangi r, faktorial.',
          add: [T('f', 'P(n, r) = n! ÷ (n − r)!    P(5, 2) = 5! ÷ 3! = 20', 200, 268, { size: 16, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Ada unsur yang sama',
      steps: [
        {
          say: 'Berapa susunan huruf dari kata AAB? Kalau kedua A dibedakan, ada 3 faktorial, yaitu 6. Tetapi menukar kedua A tidak menghasilkan susunan baru.',
          clear: true,
          add: [T('a', 'A₁A₂B  A₂A₁B  →  AAB', 200, 70, { size: 20 }), T('b', 'A₁BA₂  A₂BA₁  →  ABA', 200, 105, { size: 20 }), T('c', 'BA₁A₂  BA₂A₁  →  BAA', 200, 140, { size: 20 })],
        },
        {
          say: 'Setiap susunan terhitung 2 kali, yaitu 2 faktorial. Jadi 6 dibagi 2, hanya 3 susunan.',
          add: [T('d', '3! ÷ 2! = 6 ÷ 2 = {g:3}', 200, 200, { size: 26 }), T('e', 'bagi dengan faktorial banyak unsur yang sama', 200, 245, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Lomba diikuti 6 peserta. Juara 1, 2, dan 3 akan ditentukan. Ada berapa kemungkinan susunan juara?',
          clear: true,
          add: [T('q', '6 peserta → juara 1, 2, 3', 200, 100, { size: 26 }), T('q2', 'banyak susunan = ?', 200, 160, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '120', ok: true, why: '6 × 5 × 4 = 120.' },
              { t: '20', why: '20 adalah kombinasi. Pada juara, urutan penting.' },
              { t: '720', why: '720 = 6!, menyusun keenam peserta. Hanya 3 juara.' },
              { t: '18', why: '6 × 3 bukan caranya. Juara 1 punya 6 pilihan, juara 2 punya 5, juara 3 punya 4.' },
            ],
          },
        },
        {
          say: 'Juara 1 ada 6 pilihan, juara 2 ada 5, juara 3 ada 4. 6 kali 5 kali 4 sama dengan 120.',
          add: [T('a', 'P(6, 3) = 6 × 5 × 4 = {g:120}', 200, 225, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai 4! adalah …',
      ans: ['24'],
      wrong: { '10': 'Faktorial adalah perkalian, bukan penjumlahan: 4 × 3 × 2 × 1.', '16': '4! = 4 × 3 × 2 × 1 = 24.' },
      steps: ['4! = 4 × 3 × 2 × 1.', '= 24.'],
    },
    {
      type: 'num',
      q: 'Dari 6 siswa akan dipilih ketua dan sekretaris. Banyak susunan yang mungkin adalah …',
      ans: ['30'],
      wrong: { '15': 'Ketua dan sekretaris jabatannya berbeda, jadi urutan penting: 6 × 5.', '36': 'Satu orang tidak bisa memegang dua jabatan.' },
      steps: ['P(6, 2) = 6 × 5.', '= 30.'],
    },
    {
      type: 'num',
      q: 'Banyak susunan huruf berbeda dari kata KAKAK adalah …',
      ans: ['10'],
      wrong: { '120': 'Ada huruf yang sama: 3 huruf K dan 2 huruf A. Bagi dengan 3! × 2!.', '20': '5! ÷ (3! × 2!) = 120 ÷ 12 = 10.' },
      steps: ['5 huruf: K ada 3, A ada 2.', '5! ÷ (3! × 2!) = 120 ÷ 12 = 10.'],
    },
    {
      type: 'num',
      q: 'Banyak kode 3 angka berbeda yang dapat disusun dari angka 0 sampai 9 (angka 0 boleh di depan) adalah …',
      ans: ['720'],
      wrong: { '1000': 'Angkanya harus berbeda: 10 × 9 × 8.', '120': '120 adalah kombinasi. Pada kode, urutan penting.' },
      steps: ['P(10, 3) = 10 × 9 × 8.', '= 720.'],
    },
    {
      type: 'num',
      q: 'Lima buku berbeda disusun berjajar di rak. Banyak susunannya adalah …',
      ans: ['120'],
      wrong: { '25': '5 × 5 berarti satu buku bisa di dua tempat.', '15': '5! = 5 × 4 × 3 × 2 × 1 = 120.' },
      steps: ['5! = 5 × 4 × 3 × 2 × 1.', '= 120.'],
    },
  ],
};

// ---------- 4.2 Kombinasi ----------
const PAIRS = [];
'ABCD'.split('').forEach((a) => 'ABCD'.split('').forEach((b) => a !== b && PAIRS.push(a + b)));
const pairEl = (p, i, o = {}) => [kid(`q${i}a`, p[0], 60 + (i % 4) * 90, 70 + Math.floor(i / 4) * 55, { r: 12, ...o }), kid(`q${i}b`, p[1], 86 + (i % 4) * 90, 70 + Math.floor(i / 4) * 55, { r: 12, ...o })];

const l2 = {
  id: 'k11b4-2',
  title: 'Kombinasi',
  hook: 'Kombinasi menghitung banyak cara memilih ketika urutan tidak diperhatikan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dari 4 siswa, A, B, C, D, dipilih 2 orang untuk mewakili kelas. Tidak ada jabatan. Ada berapa cara?',
          add: ['ABCD'.split('').map((n, i) => kid(`k${i}`, n, 140 + i * 40, 110)), T('q', 'pilih 2 dari 4 (tanpa jabatan)', 200, 170, { size: 20, c: 'acc' })],
          ask: {
            options: [
              { t: '6', ok: true, why: 'AB, AC, AD, BC, BD, CD. Memilih A-B sama dengan memilih B-A.' },
              { t: '12', why: '12 menghitung A-B dan B-A sebagai dua pilihan. Tanpa jabatan, keduanya sama.' },
              { t: '8', why: 'Coba daftar semua pasangannya: ada 6.' },
              { t: '4', why: 'Setiap siswa bisa berpasangan dengan 3 siswa lain.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Urutan tidak penting',
      steps: [
        {
          say: 'Kalau urutan diperhatikan, ada 4 kali 3, yaitu 12 susunan.',
          clear: true,
          add: [PAIRS.flatMap((p, i) => pairEl(p, i))],
        },
        {
          say: 'Tetapi A-B dan B-A adalah pasangan yang sama. Setiap pasangan terhitung dua kali.',
          set: Object.fromEntries(PAIRS.flatMap((p, i) => (p[0] > p[1] ? [[`q${i}a`, { o: 0.25 }], [`q${i}b`, { o: 0.25 }]] : []))),
        },
        {
          say: 'Jadi 12 dibagi 2, hanya 6 pasangan. Pembaginya 2 faktorial, yaitu banyak cara menyusun 2 orang yang terpilih.',
          add: [T('a', '12 ÷ 2! = {g:6}', 200, 250, { size: 28 })],
        },
      ],
    },
    {
      title: 'Rumus kombinasi',
      steps: [
        {
          say: 'Kombinasi r dari n ditulis C n koma r. Rumusnya permutasi dibagi r faktorial: n faktorial dibagi r faktorial kali n dikurangi r faktorial.',
          clear: true,
          add: [T('f', 'C(n, r) = n! ÷ (r! × (n − r)!)', 200, 70, { size: 26, c: 'pos' })],
        },
        {
          say: 'Contoh: memilih 3 dari 5 orang. 5 kali 4 kali 3 sama dengan 60 susunan berurutan, dibagi 3 faktorial, yaitu 6. Hasilnya 10.',
          add: [T('a', 'C(5, 3) = (5 × 4 × 3) ÷ (3 × 2 × 1)', 200, 135, { size: 22 }), T('b', '= 60 ÷ 6 = {g:10}', 200, 175, { size: 26 })],
        },
        {
          say: 'Memilih 3 yang ikut sama dengan memilih 2 yang tidak ikut. Jadi C 5 koma 3 sama dengan C 5 koma 2, keduanya 10.',
          add: [T('c', 'C(5, 3) = C(5, 2) = 10', 200, 230, { size: 20, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Permutasi atau kombinasi?',
      steps: [
        {
          say: 'Tanyakan: kalau dua orang ditukar, apakah hasilnya berbeda? Kalau berbeda, pakai permutasi. Kalau sama, pakai kombinasi.',
          clear: true,
          add: [T('h', 'ditukar → berbeda?', 200, 45, { size: 22 }), T('p1', 'ketua dan wakil: ya → permutasi', 200, 100, { size: 18, c: 'pos' }), T('p2', 'urutan juara: ya → permutasi', 200, 135, { size: 18, c: 'pos' }), T('c1', 'anggota panitia: tidak → kombinasi', 200, 180, { size: 18, c: 'ok' }), T('c2', 'berjabat tangan: tidak → kombinasi', 200, 215, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Enam orang saling berjabat tangan, setiap dua orang tepat satu kali. Ada berapa jabat tangan?',
          clear: true,
          add: [T('q', '6 orang, setiap pasang 1 kali', 200, 100, { size: 24 }), T('q2', 'banyak jabat tangan = ?', 200, 160, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '15', ok: true, why: 'C(6, 2) = (6 × 5) ÷ 2 = 15.' },
              { t: '30', why: 'Jabat tangan A-B sama dengan B-A. Bagi 2.' },
              { t: '36', why: 'Seseorang tidak berjabat tangan dengan dirinya sendiri, dan setiap pasang hanya sekali.' },
              { t: '12', why: 'Setiap orang berjabat tangan dengan 5 orang: 6 × 5 ÷ 2.' },
            ],
          },
        },
        {
          say: 'Menukar dua orang tetap jabat tangan yang sama, jadi kombinasi. C 6 koma 2 sama dengan 6 kali 5 dibagi 2, yaitu 15.',
          add: [T('a', 'C(6, 2) = (6 × 5) ÷ 2 = {g:15}', 200, 225, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai C(6, 2) adalah …',
      ans: ['15'],
      wrong: { '30': '30 adalah P(6, 2). Bagi dengan 2!.', '12': '(6 × 5) ÷ 2 = 15.' },
      steps: ['C(6, 2) = (6 × 5) ÷ (2 × 1).', '= 15.'],
    },
    {
      type: 'num',
      q: 'Dari 7 siswa akan dipilih 3 siswa untuk mengikuti lomba cerdas cermat. Banyak cara memilih adalah …',
      ans: ['35'],
      wrong: { '210': '210 adalah permutasi. Tim lomba tidak punya urutan: bagi dengan 3!.', '21': '(7 × 6 × 5) ÷ 6 = 35.' },
      steps: ['C(7, 3) = (7 × 6 × 5) ÷ (3 × 2 × 1).', '= 210 ÷ 6 = 35.'],
    },
    {
      type: 'num',
      q: 'Sebuah tim terdiri dari 3 putra (dari 5 calon putra) dan 2 putri (dari 4 calon putri). Banyak cara membentuk tim adalah …',
      ans: ['60'],
      wrong: { '16': 'Pilihan putra dan putri dikalikan, bukan dijumlah: 10 × 6.', '126': 'Itu C(9, 5), tanpa membedakan putra dan putri.' },
      steps: ['C(5, 3) = 10, C(4, 2) = 6.', '10 × 6 = 60.'],
    },
    {
      q: 'Manakah yang diselesaikan dengan kombinasi?',
      options: [
        { t: 'memilih 4 anggota paduan suara dari 10 siswa', ok: true },
        { t: 'menyusun nomor antrean 4 orang', why: 'Nomor antrean punya urutan, jadi permutasi.' },
        { t: 'memilih ketua, wakil, dan bendahara', why: 'Jabatannya berbeda, jadi urutan penting.' },
        { t: 'membuat kata sandi 4 huruf', why: 'Urutan huruf mengubah kata sandi.' },
      ],
      steps: ['Anggota paduan suara tidak punya urutan.', 'Kombinasi C(10, 4).'],
    },
    {
      type: 'num',
      q: 'Jika C(n, 2) = 10, nilai n adalah …',
      ans: ['5'],
      wrong: { '20': 'n(n − 1) ÷ 2 = 10 → n(n − 1) = 20 → n = 5.', '10': 'C(10, 2) = 45.' },
      steps: ['n(n − 1) ÷ 2 = 10 → n(n − 1) = 20.', 'n = 5 (karena 5 × 4 = 20).'],
    },
  ],
};

// ---------- 4.3 Peluang bersyarat ----------
// 30 siswa: 16 perempuan (10 suka matematika), 14 laki-laki (7 suka)
const person = (id, x, y, c) => ({ id, t: 'icon', name: 'person', x, y, size: 22, c });
const block = (p, n, likes, x0) => Array.from({ length: n }, (_, i) => person(`${p}${i}`, x0 + (i % 4) * 26, 85 + Math.floor(i / 4) * 34, i < likes ? 'pos' : 'mut'));

const l3 = {
  id: 'k11b4-3',
  title: 'Peluang Bersyarat',
  hook: 'Kalau kita sudah tahu sebagian informasi, ruang sampelnya menyempit dan peluangnya berubah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Di kelas ada 30 siswa: 16 perempuan dan 14 laki-laki. 10 perempuan dan 7 laki-laki suka matematika. Satu siswa dipilih acak, dan ternyata perempuan. Berapa peluang ia suka matematika?',
          add: [table('tb', 200, 120, [['', 'suka', 'tidak', 'jumlah'], ['perempuan', '10', '6', '16'], ['laki-laki', '7', '7', '14'], ['jumlah', '17', '13', '30']], { cw: [100, 70, 70, 80], rh: 34, size: 16, head: true })],
          ask: {
            options: [
              { t: '10/16', ok: true, why: 'Karena sudah tahu ia perempuan, cukup lihat 16 perempuan. 10 di antaranya suka.' },
              { t: '10/30', why: '10/30 adalah peluang perempuan dan suka, sebelum tahu jenis kelaminnya.' },
              { t: '17/30', why: '17/30 adalah peluang suka matematika tanpa informasi apa pun.' },
              { t: '16/30', why: '16/30 adalah peluang terpilih perempuan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ruang sampel menyempit',
      steps: [
        {
          say: 'Gambarkan semua siswa. Biru berarti suka matematika. Kiri perempuan, kanan laki-laki.',
          clear: true,
          add: [...block('f', 16, 10, 60), ...block('m', 14, 7, 250), T('lf', 'perempuan (16)', 99, 50, { size: 15 }), T('lm', 'laki-laki (14)', 289, 50, { size: 15 }), box('bd', 200, 140, 2, 150, { r: 0, fill: 'mut', stroke: 'none', sw: 0 })],
        },
        {
          say: 'Tanpa informasi apa pun, peluang suka matematika adalah 17 dari 30.',
          add: [tag('p1', 'P(suka) = 17/30', 200, 260, 'pos', 16)],
        },
        {
          say: 'Sekarang kita tahu yang terpilih perempuan. Laki-laki tidak mungkin lagi, jadi coret. Ruang sampelnya tinggal 16 siswa.',
          set: Object.fromEntries([...Array(14)].map((_, i) => [`m${i}`, { o: 0.15 }])),
        },
        {
          say: 'Dari 16 perempuan, 10 suka matematika. Peluangnya 10 per 16, yaitu 5 per 8. Ditulis P suka dengan syarat perempuan.',
          set: { p1: tag('p1', 'P(suka | perempuan) = 10/16 = 5/8', 200, 260, 'ok', 16) },
        },
      ],
    },
    {
      title: 'Rumusnya',
      steps: [
        {
          say: 'Peluang A dengan syarat B sama dengan peluang A dan B, dibagi peluang B.',
          clear: true,
          add: [T('f', 'P(A | B) = P(A ∩ B) ÷ P(B)', 200, 70, { size: 28, c: 'pos' }), T('k', 'dibaca: peluang A jika B sudah terjadi', 200, 110, { size: 16, c: 'mut' })],
        },
        {
          say: 'Pada contoh tadi: P perempuan dan suka sama dengan 10 per 30, P perempuan sama dengan 16 per 30. 10 per 30 dibagi 16 per 30 sama dengan 10 per 16. Sama dengan cara menghitung langsung.',
          add: [T('a', '(10/30) ÷ (16/30) = 10/16', 200, 170, { size: 24 })],
        },
        {
          say: 'Hati-hati, P A dengan syarat B biasanya tidak sama dengan P B dengan syarat A. Peluang perempuan dengan syarat suka matematika adalah 10 per 17, bukan 10 per 16.',
          add: [T('b', 'P(perempuan | suka) = 10/17', 200, 225, { size: 20, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari kelas yang sama, siswa yang terpilih ternyata suka matematika. Berapa peluang ia laki-laki?',
          clear: true,
          add: [table('tb', 200, 110, [['', 'suka', 'tidak', 'jumlah'], ['perempuan', '10', '6', '16'], ['laki-laki', '7', '7', '14'], ['jumlah', '17', '13', '30']], { cw: [100, 70, 70, 80], rh: 34, size: 16, head: true })],
          ask: {
            options: [
              { t: '7/17', ok: true, why: 'Ruang sampelnya 17 siswa yang suka. 7 di antaranya laki-laki.' },
              { t: '7/14', why: 'Itu P(suka | laki-laki). Syaratnya di sini suka matematika.' },
              { t: '7/30', why: 'Itu P(laki-laki dan suka) tanpa syarat.' },
              { t: '14/30', why: 'Itu P(laki-laki) tanpa informasi apa pun.' },
            ],
          },
        },
        {
          say: 'Syaratnya suka matematika, jadi ruang sampelnya kolom suka: 17 siswa. Laki-laki di kolom itu ada 7. Peluangnya 7 per 17.',
          add: [T('a', 'P(laki-laki | suka) = {g:7/17}', 200, 225, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Sebuah dadu dilempar dan diketahui hasilnya genap. Peluang hasilnya lebih dari 3 adalah … (tulis sebagai pecahan)',
      ans: ['2/3'],
      wrong: { '1/2': 'Ruang sampelnya tinggal {2, 4, 6}. Yang lebih dari 3: 4 dan 6.', '1/3': 'Yang genap dan lebih dari 3 ada dua: 4 dan 6.' },
      steps: ['Ruang sampel baru: {2, 4, 6}.', 'Lebih dari 3: {4, 6} → 2/3.'],
    },
    {
      type: 'num',
      q: 'Jika P(A ∩ B) = 0,2 dan P(B) = 0,5, maka P(A | B) = …',
      ans: ['0,4'],
      wrong: { '0,1': 'Itu 0,2 × 0,5. Rumusnya dibagi: 0,2 ÷ 0,5.', '2,5': 'Terbalik. 0,2 ÷ 0,5 = 0,4.' },
      steps: ['P(A | B) = 0,2 ÷ 0,5.', '= 0,4.'],
    },
    {
      type: 'num',
      q: 'Dari 40 siswa, 25 ikut OSIS. Di antara anggota OSIS itu, 15 perempuan. Jika dipilih acak seorang anggota OSIS, peluang ia perempuan adalah … (tulis sebagai pecahan)',
      ans: ['3/5'],
      wrong: { '3/8': 'Syaratnya anggota OSIS, jadi pembaginya 25, bukan 40.', '15/40': 'Pembaginya 25 anggota OSIS.' },
      steps: ['Ruang sampel: 25 anggota OSIS.', '15/25 = 3/5.'],
    },
    {
      type: 'num',
      q: 'Satu kartu diambil dari kartu bernomor 1 sampai 10, dan diketahui nomornya lebih dari 5. Peluang nomornya genap adalah … (tulis sebagai pecahan)',
      ans: ['3/5'],
      wrong: { '1/2': 'Ruang sampel baru {6, 7, 8, 9, 10}. Genap: 6, 8, 10.', '3/10': 'Pembaginya 5 kartu, bukan 10.' },
      steps: ['Ruang sampel: {6, 7, 8, 9, 10}.', 'Genap: {6, 8, 10} → 3/5.'],
    },
    {
      q: 'Pernyataan yang benar tentang peluang bersyarat adalah …',
      options: [
        { t: 'P(A | B) dan P(B | A) umumnya berbeda', ok: true },
        { t: 'P(A | B) selalu sama dengan P(B | A)', why: 'Contoh di kelas: P(suka | perempuan) = 10/16, P(perempuan | suka) = 10/17.' },
        { t: 'P(A | B) selalu lebih kecil dari P(A)', why: 'Bisa lebih besar. P(suka | perempuan) = 5/8 > P(suka) = 17/30.' },
        { t: 'P(A | B) = P(A) × P(B)', why: 'Itu P(A ∩ B) untuk kejadian saling bebas.' },
      ],
      steps: ['P(A | B) = P(A ∩ B) ÷ P(B), sedangkan P(B | A) = P(A ∩ B) ÷ P(A).', 'Pembaginya berbeda.'],
    },
  ],
};

export default {
  id: 'k11b4',
  no: 4,
  title: 'Permutasi, Kombinasi, dan Peluang Bersyarat',
  desc: 'Faktorial, permutasi, susunan dengan unsur sama, kombinasi, dan peluang bersyarat dari tabel dua arah.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Banyak susunan huruf berbeda dari kata BUKU adalah …',
      ans: ['12'],
      wrong: { '24': 'Ada dua huruf U yang sama: 4! ÷ 2!.', '6': '4! ÷ 2! = 24 ÷ 2 = 12.' },
      steps: ['4 huruf, U muncul 2 kali.', '4! ÷ 2! = 12.'],
    },
    {
      type: 'num',
      q: 'Dalam turnamen, setiap tim bertanding satu kali dengan setiap tim lain. Jika ada 10 tim, banyak pertandingan adalah …',
      ans: ['45'],
      wrong: { '90': 'Pertandingan A lawan B sama dengan B lawan A. Bagi 2.', '100': 'C(10, 2) = (10 × 9) ÷ 2 = 45.' },
      steps: ['C(10, 2) = (10 × 9) ÷ 2.', '= 45.'],
    },
    {
      type: 'num',
      q: 'Sebuah keluarga punya dua anak. Diketahui sedikitnya satu anak laki-laki. Peluang kedua anaknya laki-laki adalah … (tulis sebagai pecahan)',
      ans: ['1/3'],
      wrong: { '1/2': 'Ruang sampel yang memuat sedikitnya satu laki-laki: LL, LP, PL. Hanya LL yang memenuhi.', '1/4': 'Syaratnya sudah membuang PP, jadi ruang sampel tinggal 3.' },
      steps: ['Ruang sampel awal: LL, LP, PL, PP. Syarat sedikitnya satu L: LL, LP, PL.', 'P(LL) = 1/3.'],
    },
  ],
};
