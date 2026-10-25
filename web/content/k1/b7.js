// Kelas 1 · Bab 7: Mengukur Panjang Benda
import { T, ln } from '../helpers.js';

// Pensil mendatar dari x0 sepanjang len
const pencil = (id, x0, y, len, c = 'pos', o = {}) => ({
  id,
  t: 'poly',
  x: 0,
  y: 0,
  pts: [[x0, y - 9], [x0 + len - 20, y - 9], [x0 + len, y], [x0 + len - 20, y + 9], [x0, y + 9]],
  fill: `${c}-soft`,
  stroke: c,
  sw: 2.5,
  ...o,
});
const CW = 30; // panjang satu klip
const clip = (id, x, y, o = {}) => ({ id, t: 'rect', x, y, w: CW - 2, h: 12, r: 6, fill: 'paper', stroke: 'mut', sw: 2, ...o });
const clips = (p, n, x0, y) => Array.from({ length: n }, (_, i) => clip(`${p}${i}`, x0 + CW / 2 + i * CW, y));

// ---------- 7.1 Membandingkan panjang ----------
const l1 = {
  id: 'k1b7-1',
  title: 'Membandingkan Panjang',
  hook: 'Untuk membandingkan panjang, sejajarkan dulu ujung kedua benda. Ujung lain yang lebih jauh berarti lebih panjang.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pensil mana yang lebih panjang, merah atau biru?',
          add: [pencil('a', 60, 90, 180, 'neg'), pencil('b', 150, 170, 200, 'pos')],
          ask: {
            options: [
              { t: 'biru', ok: true, why: 'Pensil biru 200, pensil merah 180. Sejajarkan ujung kirinya, biru lebih panjang.' },
              { t: 'merah', why: 'Pensil merah dimulai lebih kiri, tetapi panjangnya lebih pendek. Sejajarkan dulu ujungnya.' },
              { t: 'sama panjang', why: 'Sejajarkan ujung kirinya. Ujung kanan biru lebih jauh.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sejajarkan ujungnya',
      steps: [
        {
          say: 'Kedua pensil belum sejajar. Pensil merah dimulai lebih kiri, jadi sulit dibandingkan.',
          clear: true,
          add: [pencil('a', 60, 90, 180, 'neg'), pencil('b', 150, 170, 200, 'pos')],
        },
        {
          say: 'Geser pensil biru supaya ujung kirinya sejajar dengan pensil merah.',
          set: { b: { x: -90 } },
          add: [ln('g', 60, 60, 60, 200, { sw: 2, c: 'mut', dash: '5 5' })],
        },
        {
          say: 'Sekarang terlihat. Ujung kanan pensil biru lebih jauh. Pensil biru lebih panjang. Pensil merah lebih pendek.',
          add: [T('k', 'biru {g:lebih panjang}', 200, 235, { size: 22 }), T('k2', 'merah {n:lebih pendek}', 200, 265, { size: 18 })],
        },
      ],
    },
    {
      title: 'Lebih tinggi, lebih rendah',
      steps: [
        {
          say: 'Untuk benda yang berdiri, kita bilang lebih tinggi atau lebih rendah. Kedua anak berdiri di lantai yang sama. Anak kanan lebih tinggi.',
          clear: true,
          add: [ln('fl', 80, 240, 320, 240, { sw: 3, c: 'ink', draw: false }), { id: 'p1', t: 'icon', name: 'person', x: 150, y: 197, size: 90, c: 'pos' }, { id: 'p2', t: 'icon', name: 'person', x: 260, y: 175, size: 134, c: 'acc' }, T('l1', 'lebih rendah', 150, 270, { size: 15, c: 'pos' }), T('l2', 'lebih tinggi', 260, 270, { size: 15, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Pensil mana yang paling pendek?',
          clear: true,
          add: [pencil('a', 60, 70, 220, 'neg'), pencil('b', 60, 140, 130, 'pos'), pencil('c', 60, 210, 170, 'ok'), ln('g', 60, 45, 60, 235, { sw: 2, c: 'mut', dash: '5 5' })],
          ask: {
            options: [
              { t: 'biru', ok: true, why: 'Ujung kiri sudah sejajar. Ujung kanan biru paling dekat.' },
              { t: 'merah', why: 'Pensil merah justru paling panjang.' },
              { t: 'hijau', why: 'Pensil hijau lebih panjang dari biru.' },
            ],
          },
        },
        {
          say: 'Ujung kanan pensil biru paling dekat. Pensil biru paling pendek. Pensil merah paling panjang.',
          add: [T('k', 'biru {n:paling pendek}', 300, 140, { size: 16 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Pita mana yang lebih panjang?',
      fig: [pencil('a', 60, 110, 160, 'neg'), pencil('b', 60, 190, 240, 'pos'), ln('g', 60, 85, 60, 215, { sw: 2, c: 'mut', dash: '5 5' })],
      options: [
        { t: 'biru', ok: true },
        { t: 'merah', why: 'Ujung kanan biru lebih jauh.' },
        { t: 'sama panjang', why: 'Ujung kanannya tidak sejajar.' },
      ],
      steps: ['Ujung kiri sejajar.', 'Ujung kanan biru lebih jauh: biru lebih panjang.'],
    },
    {
      q: 'Sebelum membandingkan panjang dua benda, kita harus …',
      options: [
        { t: 'menyejajarkan salah satu ujungnya', ok: true },
        { t: 'melihat warnanya', why: 'Warna tidak memengaruhi panjang.' },
        { t: 'menghitung beratnya', why: 'Berat berbeda dengan panjang.' },
      ],
      steps: ['Sejajarkan ujungnya dulu.'],
    },
    {
      q: 'Mana yang lebih tinggi?',
      fig: [ln('fl', 80, 250, 320, 250, { sw: 3, c: 'ink', draw: false }), { id: 'p1', t: 'icon', name: 'person', x: 140, y: 190, size: 140, c: 'pos' }, { id: 'p2', t: 'icon', name: 'person', x: 260, y: 215, size: 84, c: 'acc' }, T('l1', 'Dodi', 140, 275, { size: 16 }), T('l2', 'Rani', 260, 275, { size: 16 })],
      options: [
        { t: 'Dodi', ok: true },
        { t: 'Rani', why: 'Kepala Dodi lebih jauh dari lantai.' },
      ],
      steps: ['Keduanya berdiri di lantai yang sama.', 'Dodi lebih tinggi.'],
    },
    {
      q: 'Pensil mana yang paling panjang?',
      fig: [pencil('a', 60, 90, 150, 'neg'), pencil('b', 60, 150, 250, 'pos'), pencil('c', 60, 210, 200, 'ok'), ln('g', 60, 65, 60, 235, { sw: 2, c: 'mut', dash: '5 5' })],
      options: [
        { t: 'biru', ok: true },
        { t: 'merah', why: 'Merah paling pendek.' },
        { t: 'hijau', why: 'Ujung kanan biru lebih jauh dari hijau.' },
      ],
      steps: ['Ujung kanan biru paling jauh.'],
    },
    {
      q: 'Kebalikan dari "lebih panjang" adalah …',
      options: [
        { t: 'lebih pendek', ok: true },
        { t: 'lebih tinggi', why: 'Kebalikan lebih tinggi adalah lebih rendah.' },
        { t: 'lebih berat', why: 'Berat bukan ukuran panjang.' },
      ],
      steps: ['Panjang ↔ pendek.'],
    },
  ],
};

// ---------- 7.2 Mengukur dengan klip ----------
const X0 = 60;

const l2 = {
  id: 'k1b7-2',
  title: 'Mengukur dengan Benda',
  hook: 'Panjang bisa diukur dengan benda kecil yang sama, misalnya klip. Susun berderet tanpa celah, lalu hitung banyaknya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pensil ini diukur dengan klip. Berapa klip panjangnya?',
          add: [pencil('p', X0, 100, CW * 6, 'pos'), ...clips('c', 6, X0, 140)],
          ask: {
            options: [
              { t: '6 klip', ok: true, why: 'Ada 6 klip berderet dari ujung ke ujung pensil.' },
              { t: '5 klip', why: 'Hitung lagi semua klipnya.' },
              { t: '7 klip', why: 'Klip terakhir tepat di ujung pensil. Ada 6.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Cara mengukur',
      steps: [
        {
          say: 'Letakkan klip pertama tepat di ujung pensil.',
          clear: true,
          add: [pencil('p', X0, 100, CW * 5, 'ok'), clip('c0', X0 + CW / 2, 140), ln('g', X0, 75, X0, 160, { sw: 2, c: 'mut', dash: '5 5' })],
        },
        {
          say: 'Susun klip berikutnya berderet, tanpa celah dan tidak bertumpuk.',
          add: clips('c', 5, X0, 140).slice(1),
        },
        {
          say: 'Hitung klipnya: satu, dua, tiga, empat, lima. Panjang pensil 5 klip.',
          add: [...[1, 2, 3, 4, 5].map((k) => T(`n${k}`, String(k), X0 + CW / 2 + (k - 1) * CW, 168, { size: 15, c: 'pos' })), T('a', 'panjang = {g:5 klip}', 200, 225, { size: 26 })],
        },
      ],
    },
    {
      title: 'Jangan ada celah',
      steps: [
        {
          say: 'Kalau klip disusun dengan celah, hasilnya salah. Klip yang renggang terlihat lebih sedikit, padahal pensilnya sama.',
          clear: true,
          add: [pencil('p', X0, 80, CW * 5, 'ok'), ...[0, 1, 2].map((i) => clip(`w${i}`, X0 + CW / 2 + i * 55, 118, { stroke: 'neg' })), T('x', '3 klip? salah', 320, 118, { size: 16, c: 'neg' }), pencil('q', X0, 180, CW * 5, 'ok'), ...clips('c', 5, X0, 218), T('y', '5 klip, benar', 320, 218, { size: 16, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa klip panjang pita ini?',
          clear: true,
          add: [{ id: 'pt', t: 'rect', x: X0 + CW * 4, y: 100, w: CW * 8, h: 20, r: 3, fill: 'neg-soft', stroke: 'neg', sw: 2 }, ...clips('c', 8, X0, 140)],
          ask: {
            options: [
              { t: '8 klip', ok: true, why: 'Ada 8 klip berderet dari ujung ke ujung.' },
              { t: '6 klip', why: 'Hitung semua klipnya sampai ujung pita.' },
              { t: '10 klip', why: 'Hanya ada 8 klip.' },
            ],
          },
        },
        {
          say: 'Hitung: satu sampai delapan. Panjang pita 8 klip.',
          add: [...Array.from({ length: 8 }, (_, i) => T(`n${i}`, String(i + 1), X0 + CW / 2 + i * CW, 168, { size: 15, c: 'pos' })), T('a', 'panjang = {g:8 klip}', 200, 225, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Panjang pensil ini berapa klip?',
      fig: [pencil('p', 80, 120, CW * 4, 'pos'), ...clips('c', 4, 80, 160)],
      ans: ['4'],
      wrong: { '3': 'Hitung semua klipnya.', '5': 'Hanya ada 4 klip.' },
      steps: ['Ada 4 klip berderet.', 'Panjang 4 klip.'],
    },
    {
      type: 'num',
      q: 'Panjang pita ini berapa klip?',
      fig: [{ id: 'pt', t: 'rect', x: 60 + CW * 3.5, y: 120, w: CW * 7, h: 18, r: 3, fill: 'neg-soft', stroke: 'neg', sw: 2 }, ...clips('c', 7, 60, 160)],
      ans: ['7'],
      wrong: { '6': 'Masih ada satu klip lagi.', '8': 'Hanya ada 7 klip.' },
      steps: ['Ada 7 klip.', 'Panjang 7 klip.'],
    },
    {
      q: 'Saat mengukur dengan klip, klip harus disusun …',
      options: [
        { t: 'berderet tanpa celah', ok: true },
        { t: 'dengan celah lebar', why: 'Celah membuat hasilnya terlalu sedikit.' },
        { t: 'bertumpuk', why: 'Klip yang bertumpuk membuat hasilnya terlalu banyak.' },
      ],
      steps: ['Rapat, tanpa celah, tidak bertumpuk.'],
    },
    {
      type: 'num',
      q: 'Buku panjangnya 9 klip. Pensil panjangnya 5 klip. Buku lebih panjang … klip.',
      ans: ['4'],
      wrong: { '14': 'Selisih dicari dengan pengurangan: 9 − 5.' },
      steps: ['9 − 5.', '= 4 klip.'],
    },
    {
      q: 'Benda mana yang paling cocok untuk mengukur panjang meja?',
      options: [
        { t: 'jengkal tangan', ok: true },
        { t: 'butir beras', why: 'Butir beras terlalu kecil. Butuh sangat banyak.' },
        { t: 'batu besar', why: 'Batu tidak bisa disusun lurus dan rapat.' },
      ],
      steps: ['Jengkal cukup besar dan mudah dipakai.'],
    },
  ],
};

export default {
  id: 'k1b7',
  no: 7,
  title: 'Mengukur Panjang Benda',
  desc: 'Membandingkan panjang dan tinggi dengan menyejajarkan ujung, serta mengukur panjang dengan benda seperti klip.',
  lessons: [l1, l2],
  extra: [
    {
      q: 'Saat membandingkan tinggi dua anak, keduanya harus …',
      options: [
        { t: 'berdiri di lantai yang sama', ok: true },
        { t: 'memakai baju yang sama', why: 'Baju tidak memengaruhi tinggi.' },
        { t: 'duduk di kursi', why: 'Kursi yang berbeda membuat perbandingan tidak adil.' },
      ],
      steps: ['Ujung bawah harus sejajar: lantai yang sama.'],
    },
    {
      type: 'num',
      q: 'Tali panjangnya 6 jengkal. Dipotong 2 jengkal. Sisa tali … jengkal.',
      ans: ['4'],
      wrong: { '8': 'Dipotong berarti berkurang.' },
      steps: ['6 − 2.', '= 4 jengkal.'],
    },
    {
      type: 'num',
      q: 'Panjang ini berapa klip?',
      fig: [pencil('p', 80, 120, CW * 3, 'ok'), ...clips('c', 3, 80, 160)],
      ans: ['3'],
      wrong: { '2': 'Hitung semua klipnya.', '4': 'Hanya ada 3 klip.' },
      steps: ['Ada 3 klip.'],
    },
  ],
};
