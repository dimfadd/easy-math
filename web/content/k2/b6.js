// Kelas 2 · Bab 6: Pengukuran (panjang dengan satuan tidak baku, berat)
import { T, ln, box, balance, tiltSet } from '../helpers.js';
import { obj } from '../k1/kit.js';

// ---------- 6.1 Satuan yang sama ----------
const MX = 60; // ujung kiri meja
const MW = 280; // panjang meja (piksel)
const table = () => ({ id: 'mj', t: 'rect', x: MX + MW / 2, y: 90, w: MW, h: 22, r: 3, fill: 'acc-soft', stroke: 'acc', sw: 2.5 });
const span = (p, n, len, y, c) => Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'rect', x: MX + len / 2 + i * len, y, w: len - 3, h: 16, r: 8, fill: `${c}-soft`, stroke: c, sw: 2 }));

const l1 = {
  id: 'k2b6-1',
  title: 'Satuan Harus Sama',
  hook: 'Benda yang sama bisa diukur 4 jengkal atau 7 pensil. Supaya hasilnya bisa dibandingkan, satuannya harus sama.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ani mengukur meja: 4 jengkal. Budi mengukur meja yang sama: 7 pensil. Siapa yang salah?',
          add: [table(), ...span('j', 4, 70, 130, 'pos'), T('lj', 'Ani: 4 jengkal', 200, 160, { size: 15, c: 'pos' }), ...span('p', 7, 40, 195, 'neg'), T('lp', 'Budi: 7 pensil', 200, 225, { size: 15, c: 'neg' })],
          ask: {
            options: [
              { t: 'tidak ada yang salah', ok: true, why: 'Keduanya benar. Satuannya berbeda: jengkal lebih panjang dari pensil, jadi butuh lebih sedikit.' },
              { t: 'Ani, karena angkanya lebih kecil', why: 'Jengkal Ani lebih panjang, jadi wajar jumlahnya lebih sedikit.' },
              { t: 'Budi, karena angkanya lebih besar', why: 'Pensil lebih pendek, jadi wajar butuh lebih banyak.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Satuan pendek, angka besar',
      steps: [
        {
          say: 'Meja yang sama diukur dengan jengkal. Hasilnya 4 jengkal.',
          clear: true,
          add: [table(), ...span('j', 4, 70, 130, 'pos'), T('lj', '4 jengkal', 200, 152, { size: 14, c: 'pos' })],
        },
        {
          say: 'Diukur dengan pensil yang lebih pendek, hasilnya 7 pensil. Satuan yang lebih pendek membuat angkanya lebih besar.',
          add: [...span('p', 7, 40, 178, 'neg'), T('lp', '7 pensil', 200, 198, { size: 14, c: 'neg' })],
        },
        {
          say: 'Karena itu, saat membandingkan panjang, pakai satuan yang sama. Jengkal tiap orang juga berbeda-beda, jadi lebih adil memakai benda yang sama, misalnya pensil yang sama.',
          add: [T('k', 'bandingkan dengan satuan yang sama', 200, 240, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Papan diukur 3 buku atau 9 penghapus. Mana yang lebih panjang, buku atau penghapus?',
          clear: true,
          add: [table(), ...span('j', 3, MW / 3, 130, 'ok'), T('lj', '3 buku', 200, 160, { size: 15, c: 'ok' }), ...span('p', 9, MW / 9, 195, 'acc'), T('lp', '9 penghapus', 200, 225, { size: 15, c: 'acc' })],
          ask: {
            options: [
              { t: 'buku', ok: true, why: 'Papan yang sama hanya butuh 3 buku tetapi 9 penghapus. Buku lebih panjang.' },
              { t: 'penghapus', why: 'Penghapus dibutuhkan lebih banyak, berarti setiap penghapus lebih pendek.' },
              { t: 'sama panjang', why: 'Kalau sama panjang, jumlahnya akan sama.' },
            ],
          },
        },
        {
          say: 'Butuh lebih sedikit buku, jadi buku lebih panjang dari penghapus.',
          add: [T('a', 'lebih sedikit → satuannya {g:lebih panjang}', 200, 265, { size: 17 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Meja diukur 5 jengkal Ayah dan 8 jengkal Adik. Jengkal siapa yang lebih panjang?',
      options: [
        { t: 'Ayah', ok: true },
        { t: 'Adik', why: 'Adik butuh lebih banyak jengkal, berarti jengkalnya lebih pendek.' },
        { t: 'sama', why: 'Jumlahnya berbeda, jadi jengkalnya tidak sama.' },
      ],
      steps: ['Lebih sedikit jengkal → jengkal lebih panjang.', 'Ayah.'],
    },
    {
      q: 'Supaya hasil mengukur bisa dibandingkan, satuannya harus …',
      options: [
        { t: 'sama', ok: true },
        { t: 'berbeda-beda', why: 'Satuan berbeda membuat angka tidak bisa dibandingkan.' },
        { t: 'berwarna', why: 'Warna tidak memengaruhi ukuran.' },
      ],
      steps: ['Pakai satuan yang sama.'],
    },
    {
      type: 'num',
      q: 'Pita A panjangnya 6 klip. Pita B panjangnya 9 klip. Pita B lebih panjang … klip.',
      ans: ['3'],
      wrong: { '15': 'Selisih memakai pengurangan.' },
      steps: ['9 − 6.', '= 3 klip.'],
    },
    {
      q: 'Benda yang sama diukur dengan satuan yang lebih pendek. Angka hasilnya akan …',
      options: [
        { t: 'lebih besar', ok: true },
        { t: 'lebih kecil', why: 'Satuan pendek harus dipakai lebih banyak kali.' },
        { t: 'sama saja', why: 'Satuan berbeda memberi angka berbeda.' },
      ],
      steps: ['Satuan pendek → dipakai lebih banyak kali.'],
    },
    {
      type: 'num',
      q: 'Tali panjangnya 4 jengkal. Tali lain panjangnya 2 kali tali itu. Panjangnya … jengkal.',
      ans: ['8'],
      wrong: { '6': '2 kali berarti 4 + 4.', '2': '2 kali berarti dua kali lipat.' },
      steps: ['4 + 4.', '= 8 jengkal.'],
    },
  ],
};

// ---------- 6.2 Berat ----------
const BX = 200;
const BY = 95;
const B0 = balance('bl', BX, BY, 0, 110);
const T1 = -12; // kiri turun
const B1 = balance('bl', BX, BY, T1, 110);
const onL = (b, dx = 0) => ({ x: b.left.x + dx, y: b.left.y - 16 });
const onR = (b, dx = 0) => ({ x: b.right.x + dx, y: b.right.y - 16 });

const l2 = {
  id: 'k2b6-2',
  title: 'Lebih Berat, Lebih Ringan',
  hook: 'Timbangan turun di sisi benda yang lebih berat. Benda besar belum tentu lebih berat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Apel di kiri, bola plastik besar di kanan. Timbangan turun di sisi kiri. Mana yang lebih berat?',
          add: [...B1.els, obj('ap', 'apple', ...Object.values(onL(B1)), 40), { id: 'bo', t: 'circle', ...onR(B1), y: B1.right.y - 26, r: 26, fill: 'pos-soft', stroke: 'pos', sw: 2 }],
          ask: {
            options: [
              { t: 'apel', ok: true, why: 'Timbangan turun di sisi yang lebih berat, yaitu sisi apel.' },
              { t: 'bola plastik', why: 'Bola lebih besar, tetapi timbangan naik di sisi bola. Bola lebih ringan.' },
              { t: 'sama berat', why: 'Kalau sama berat, timbangan akan datar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membaca timbangan',
      steps: [
        {
          say: 'Timbangan masih datar. Letakkan apel di kiri dan bola plastik di kanan.',
          clear: true,
          add: [...B0.els, obj('ap', 'apple', ...Object.values(onL(B0)), 40), { id: 'bo', t: 'circle', ...onR(B0), y: B0.right.y - 26, r: 26, fill: 'pos-soft', stroke: 'pos', sw: 2 }],
        },
        {
          say: 'Timbangan turun di sisi apel. Apel lebih berat. Bola plastik lebih ringan, walaupun lebih besar.',
          set: { ...tiltSet('bl', BX, BY, T1, 110), ap: onL(B1), bo: { ...onR(B1), y: B1.right.y - 26 } },
          add: [T('a', 'apel {g:lebih berat}', 200, 250, { size: 20 }), T('b', 'bola {n:lebih ringan}', 200, 278, { size: 16 })],
        },
      ],
    },
    {
      title: 'Mengukur berat dengan benda',
      steps: [
        {
          say: 'Berat juga bisa diukur dengan benda yang sama. Buku di kiri seimbang dengan 6 kelereng di kanan. Berat buku sama dengan 6 kelereng.',
          clear: true,
          add: [...B0.els, box('bk', B0.left.x, B0.left.y - 16, 50, 26, { fill: 'ok-soft', stroke: 'ok', sw: 2, r: 3 }), ...Array.from({ length: 6 }, (_, i) => ({ id: `k${i}`, t: 'circle', x: B0.right.x - 25 + (i % 3) * 25, y: B0.right.y - 10 - Math.floor(i / 3) * 18, r: 9, fill: 'acc', stroke: 'ink', sw: 1.5 })), T('a', 'buku = 6 kelereng', 200, 260, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Timbangan ini datar. Apa artinya?',
          clear: true,
          add: [...B0.els, obj('ap', 'apple', ...Object.values(onL(B0, -14)), 36), obj('ap2', 'apple', ...Object.values(onL(B0, 14)), 36), obj('s', 'star', ...Object.values(onR(B0)), 44)],
          ask: {
            options: [
              { t: 'kedua sisi sama berat', ok: true, why: 'Timbangan datar berarti kedua sisi sama berat.' },
              { t: 'apel lebih berat', why: 'Kalau apel lebih berat, sisi kiri turun.' },
              { t: 'bintang lebih berat', why: 'Kalau bintang lebih berat, sisi kanan turun.' },
            ],
          },
        },
        {
          say: 'Timbangan datar. Dua apel sama berat dengan bintang.',
          add: [T('a', 'datar = {g:sama berat}', 200, 260, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Timbangan turun di sisi kanan. Benda di kanan …',
      options: [
        { t: 'lebih berat', ok: true },
        { t: 'lebih ringan', why: 'Sisi yang turun adalah sisi yang lebih berat.' },
        { t: 'sama berat', why: 'Sama berat membuat timbangan datar.' },
      ],
      steps: ['Sisi yang turun → lebih berat.'],
    },
    {
      q: 'Mana yang biasanya lebih berat?',
      options: [
        { t: 'batu bata', ok: true },
        { t: 'bulu ayam', why: 'Bulu ayam sangat ringan.' },
        { t: 'balon', why: 'Balon berisi udara, sangat ringan.' },
      ],
      steps: ['Batu bata padat dan berat.'],
    },
    {
      q: 'Benda yang lebih besar pasti lebih berat. Pernyataan ini …',
      options: [
        { t: 'salah', ok: true },
        { t: 'benar', why: 'Bola plastik besar bisa lebih ringan dari apel.' },
      ],
      steps: ['Besar belum tentu berat.', 'Contoh: bola plastik dan apel.'],
    },
    {
      type: 'num',
      q: 'Kotak pensil seimbang dengan 8 kelereng. Penghapus seimbang dengan 3 kelereng. Kotak pensil lebih berat … kelereng.',
      ans: ['5'],
      wrong: { '11': 'Selisih memakai pengurangan.' },
      steps: ['8 − 3.', '= 5 kelereng.'],
    },
    {
      q: 'Timbangan datar berarti …',
      options: [
        { t: 'kedua sisi sama berat', ok: true },
        { t: 'timbangan rusak', why: 'Timbangan datar berarti seimbang.' },
        { t: 'sisi kiri lebih berat', why: 'Kalau kiri lebih berat, sisi kiri turun.' },
      ],
      steps: ['Seimbang → sama berat.'],
    },
  ],
};

export default {
  id: 'k2b6',
  no: 6,
  title: 'Pengukuran',
  desc: 'Mengukur panjang dengan satuan tidak baku yang sama, serta membandingkan berat dengan timbangan.',
  lessons: [l1, l2],
  extra: [
    {
      q: 'Lemari diukur 6 langkah kaki Ayah dan 10 langkah kaki Adik. Langkah siapa yang lebih panjang?',
      options: [
        { t: 'Ayah', ok: true },
        { t: 'Adik', why: 'Adik butuh lebih banyak langkah.' },
      ],
      steps: ['Lebih sedikit langkah → langkah lebih panjang.'],
    },
    {
      q: 'Timbangan turun di sisi kiri. Benda di kanan …',
      options: [
        { t: 'lebih ringan', ok: true },
        { t: 'lebih berat', why: 'Sisi kanan naik, berarti lebih ringan.' },
      ],
      steps: ['Sisi yang naik → lebih ringan.'],
    },
    {
      type: 'num',
      q: 'Buku seimbang dengan 7 kelereng. 2 buku yang sama seimbang dengan … kelereng.',
      ans: ['14'],
      wrong: { '9': '2 buku = 7 + 7.', '7': 'Itu untuk 1 buku.' },
      steps: ['7 + 7.', '= 14 kelereng.'],
    },
  ],
};
