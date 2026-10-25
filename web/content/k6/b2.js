// Kelas 6 · Bab 2: Rasio dan Penerapannya
import { T, bar } from '../helpers.js';
import { objs } from '../k1/kit.js';

// 6 apel dan 4 jeruk (lingkaran oranye)
const fruit = () => [...objs('a', 'apple', 6, 70, 90, { dx: 44, size: 34 }), ...Array.from({ length: 4 }, (_, i) => ({ id: `j${i}`, t: 'circle', x: 70 + i * 44, y: 170, r: 15, fill: 'acc', stroke: 'ink', sw: 1.5 }))];

// ---------- 2.1 Rasio ----------
const l1 = {
  id: 'k6b2-1',
  title: 'Rasio',
  hook: 'Rasio membandingkan dua banyaknya dengan pembagian. 6 apel dan 4 jeruk ditulis 6 : 4, lalu disederhanakan menjadi 3 : 2.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Di keranjang ada 6 apel dan 4 jeruk. Rasio apel terhadap jeruk, dalam bentuk paling sederhana, adalah?',
          add: fruit(),
          ask: {
            options: [
              { t: '3 : 2', ok: true, why: '6 : 4, kedua bilangan dibagi 2 menjadi 3 : 2.' },
              { t: '2 : 3', why: 'Urutannya penting. Apel dulu, baru jeruk.' },
              { t: '6 : 10', why: '10 adalah jumlah semuanya. Yang ditanya apel terhadap jeruk.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menulis rasio',
      steps: [
        {
          say: 'Rasio apel terhadap jeruk: 6 banding 4, ditulis 6 : 4.',
          clear: true,
          add: [...fruit(), T('r', '6 : 4', 340, 130, { size: 30, c: 'pos' })],
        },
        {
          say: 'Kelompokkan berdua-dua. Ada 3 kelompok apel dan 2 kelompok jeruk. Rasionya 3 : 2.',
          add: [T('s', '= {g:3 : 2}', 340, 175, { size: 26 })],
        },
        {
          say: 'Menyederhanakan rasio sama seperti menyederhanakan pecahan: bagi keduanya dengan FPB-nya.',
          add: [T('n', '6 : 4 → bagi 2 → 3 : 2', 200, 250, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Urutan penting',
      steps: [
        {
          say: 'Rasio jeruk terhadap apel kebalikannya: 4 : 6, yaitu 2 : 3.',
          clear: true,
          add: [T('a', 'apel : jeruk = 3 : 2', 200, 100, { size: 24 }), T('b', 'jeruk : apel = {g:2 : 3}', 200, 150, { size: 24 })],
        },
        {
          say: 'Rasio apel terhadap semua buah: 6 : 10, yaitu 3 : 5. Artinya 3/5 buah adalah apel.',
          add: [T('c', 'apel : semua = 6 : 10 = 3 : 5', 200, 210, { size: 22, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Di kelas ada 12 siswa laki-laki dan 18 siswa perempuan. Rasio laki-laki terhadap perempuan?',
          clear: true,
          add: [T('q', '12 : 18 = ?', 200, 110, { size: 38, c: 'pos' })],
          ask: {
            options: [
              { t: '2 : 3', ok: true, why: 'FPB 12 dan 18 adalah 6. 12 : 6 = 2, 18 : 6 = 3.' },
              { t: '3 : 2', why: 'Urutannya laki-laki dulu: 12 : 18.' },
              { t: '6 : 9', why: 'Masih bisa disederhanakan lagi dengan 3.' },
            ],
          },
        },
        {
          say: 'FPB dari 12 dan 18 adalah 6. Bagi keduanya dengan 6: 2 : 3.',
          add: [T('a', '= {g:2 : 3}', 200, 180, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    { q: 'Rasio 8 : 12 paling sederhana adalah …', options: [{ t: '2 : 3', ok: true }, { t: '4 : 6', why: 'Masih bisa dibagi 2.' }, { t: '3 : 2', why: 'Urutannya terbalik.' }], steps: ['FPB = 4.', '8 : 12 = 2 : 3.'] },
    { q: 'Ada 5 kucing dan 3 anjing. Rasio anjing terhadap kucing …', options: [{ t: '3 : 5', ok: true }, { t: '5 : 3', why: 'Anjing dulu.' }, { t: '3 : 8', why: '8 adalah jumlah semua hewan.' }], steps: ['anjing : kucing = 3 : 5.'] },
    { q: 'Rasio 15 : 25 paling sederhana adalah …', options: [{ t: '3 : 5', ok: true }, { t: '5 : 3', why: 'Urutan tetap.' }, { t: '1 : 2', why: '15 : 5 = 3, 25 : 5 = 5.' }], steps: ['FPB = 5.', '3 : 5.'] },
    { q: 'Ada 4 merah dan 6 biru. Rasio merah terhadap semua manik …', options: [{ t: '2 : 5', ok: true }, { t: '2 : 3', why: 'Itu merah terhadap biru.' }, { t: '4 : 6', why: 'Semua = 10.' }], steps: ['4 : 10 = 2 : 5.'] },
    { q: 'Rasio yang senilai dengan 1 : 4 adalah …', options: [{ t: '3 : 12', ok: true }, { t: '4 : 1', why: 'Urutan terbalik.' }, { t: '2 : 6', why: '2 : 6 = 1 : 3.' }], steps: ['3 : 12 = 1 : 4.'] },
  ],
};

// ---------- 2.2 Membagi dengan rasio ----------
const l2 = {
  id: 'k6b2-2',
  title: 'Membagi dengan Rasio',
  hook: 'Membagi 30 kelereng dengan rasio 2 : 3 berarti membagi menjadi 5 bagian sama, lalu satu anak mendapat 2 bagian dan yang lain 3 bagian.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dina dan Eko membagi 30 kelereng dengan rasio 2 : 3. Berapa kelereng Dina?',
          add: [T('q', '30 kelereng, Dina : Eko = 2 : 3', 200, 110, { size: 22, c: 'pos' })],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Ada 5 bagian. Satu bagian 6. Dina 2 bagian = 12.' },
              { t: '15', why: '15 itu kalau dibagi sama rata. Rasionya 2 : 3.' },
              { t: '20', why: 'Dina mendapat bagian yang lebih sedikit.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diagram pita',
      steps: [
        {
          say: 'Gambar pita dengan 2 bagian untuk Dina dan 3 bagian untuk Eko. Semuanya 5 bagian.',
          clear: true,
          add: [bar('p', 200, 120, 5, 0, { w: 300, h: 44, colors: ['pos', 'pos', 'acc', 'acc', 'acc'] }), T('d', 'Dina', 110, 165, { size: 16, c: 'pos' }), T('e', 'Eko', 260, 165, { size: 16, c: 'acc' }), T('t', '30', 200, 75, { size: 20 })],
        },
        {
          say: '30 dibagi 5 bagian. Satu bagian berisi 6.',
          set: { p: { lab: ['6', '6', '6', '6', '6'] } },
          add: [T('a', '30 : 5 = 6', 200, 215, { size: 22 })],
        },
        {
          say: 'Dina 2 bagian: 2 kali 6, 12. Eko 3 bagian: 3 kali 6, 18. Cek: 12 tambah 18 sama dengan 30.',
          add: [T('b', 'Dina {g:12}, Eko {g:18}', 200, 260, { size: 22 })],
        },
      ],
    },
    {
      title: 'Jika satu bagian diketahui',
      steps: [
        {
          say: 'Perbandingan tepung dan gula 5 : 2. Jika gula 300 gram, tepungnya berapa?',
          clear: true,
          add: [bar('p', 200, 110, 7, 0, { w: 300, h: 40, colors: ['pos', 'pos', 'pos', 'pos', 'pos', 'acc', 'acc'] }), T('d', 'tepung', 140, 150, { size: 15, c: 'pos' }), T('e', 'gula', 307, 150, { size: 15, c: 'acc' })],
        },
        {
          say: 'Gula 2 bagian = 300 gram, jadi satu bagian 150 gram. Tepung 5 bagian: 5 kali 150 sama dengan 750 gram.',
          set: { p: { lab: ['150', '150', '150', '150', '150', '150', '150'], lsize: 11 } },
          add: [T('a', '300 : 2 = 150 → 5 × 150 = {g:750 g}', 200, 210, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Uang Rp40.000 dibagi untuk Ani dan Budi dengan rasio 3 : 1. Berapa bagian Ani?',
          clear: true,
          add: [bar('p', 200, 120, 4, 0, { w: 280, h: 44, colors: ['pos', 'pos', 'pos', 'acc'] })],
          ask: {
            options: [
              { t: 'Rp30.000', ok: true, why: '4 bagian, satu bagian Rp10.000. Ani 3 bagian.' },
              { t: 'Rp10.000', why: 'Itu satu bagian, atau bagian Budi.' },
              { t: 'Rp13.333', why: 'Bagilah dengan jumlah bagian 3 + 1 = 4, bukan 3.' },
            ],
          },
        },
        {
          say: '40 ribu dibagi 4 bagian, satu bagian 10 ribu. Ani 3 bagian: 30 ribu.',
          set: { p: { lab: ['10rb', '10rb', '10rb', '10rb'] } },
          add: [T('a', 'Ani = 3 × 10.000 = {g:Rp30.000}', 200, 200, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '20 permen dibagi rasio 1 : 4. Bagian yang lebih banyak …', ans: ['16'], wrong: { '4': 'Itu satu bagian.', '5': '20 : 5 = 4 per bagian.' }, steps: ['5 bagian, satu bagian 4.', '4 × 4 = 16.'] },
    { type: 'num', q: '35 buku dibagi rasio 3 : 4. Bagian yang lebih sedikit …', ans: ['15'], wrong: { '20': 'Itu yang lebih banyak.' }, steps: ['7 bagian, satu bagian 5.', '3 × 5 = 15.'] },
    { type: 'num', q: 'Rasio umur ayah : anak = 4 : 1. Umur anak 9 tahun. Umur ayah …', ans: ['36'], wrong: { '13': '4 bagian, satu bagian 9.' }, steps: ['Satu bagian = 9.', '4 × 9 = 36.'] },
    { type: 'num', q: 'Kopi : susu = 1 : 3. Susu 240 ml. Kopi … ml', ans: ['80'], wrong: { '720': 'Kopi lebih sedikit dari susu.' }, steps: ['3 bagian = 240, 1 bagian = 80.'] },
    { type: 'num', q: '48 siswa, laki-laki : perempuan = 5 : 7. Banyak perempuan …', ans: ['28'], wrong: { '20': 'Itu laki-laki.' }, steps: ['12 bagian, satu bagian 4.', '7 × 4 = 28.'] },
  ],
};

export default {
  id: 'k6b2',
  no: 2,
  title: 'Rasio',
  desc: 'Menulis dan menyederhanakan rasio, memperhatikan urutan, serta membagi suatu banyak dengan rasio memakai diagram pita.',
  lessons: [l1, l2],
  extra: [
    { q: 'Rasio 18 : 24 paling sederhana …', options: [{ t: '3 : 4', ok: true }, { t: '9 : 12', why: 'Masih bisa dibagi 3.' }, { t: '4 : 3', why: 'Urutan terbalik.' }], steps: ['FPB = 6.', '3 : 4.'] },
    { type: 'num', q: '60 kg beras dibagi rasio 2 : 1. Bagian terbesar … kg', ans: ['40'], steps: ['3 bagian, satu bagian 20.', '2 × 20 = 40.'] },
    { type: 'num', q: 'Merah : putih = 2 : 5. Putih ada 25. Merah …', ans: ['10'], steps: ['5 bagian = 25, 1 bagian = 5.', '2 × 5 = 10.'] },
  ],
};
