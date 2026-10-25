// Kelas 2 · Bab 3: Bentuk di Sekitar Kita
import { T, dot } from '../helpers.js';

const NAMA = { 3: 'segitiga', 4: 'segi empat', 5: 'segi lima', 6: 'segi enam' };
const COL = { 3: 'acc', 4: 'pos', 5: 'ok', 6: 'neg' };
const vtx = (x, y, n, r, rot = -90) => Array.from({ length: n }, (_, i) => {
  const a = ((rot + (360 * i) / n) * Math.PI) / 180;
  return [x + r * Math.cos(a), y + r * Math.sin(a)];
});
const reg = (id, x, y, n, r, o = {}) => ({ id, t: 'poly', x: 0, y: 0, pts: vtx(x, y, n, r, n === 4 ? -45 : -90), fill: `${COL[n]}-soft`, stroke: COL[n], sw: 3, ...o });
const corners = (p, x, y, n, r) => vtx(x, y, n, r, n === 4 ? -45 : -90).map(([a, b], i) => dot(`${p}${i}`, a, b, 'ink', { r: 5 }));

// ---------- 3.1 Sisi dan titik sudut ----------
const l1 = {
  id: 'k2b3-1',
  title: 'Sisi dan Titik Sudut',
  hook: 'Bangun datar diberi nama menurut banyak sisinya. Banyak sisi selalu sama dengan banyak titik sudut.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bentuk ini punya berapa sisi?',
          add: [reg('s', 200, 120, 6, 80)],
          ask: {
            options: [
              { t: '6', ok: true, why: 'Hitung garis lurusnya: ada 6. Bentuk ini segi enam.' },
              { t: '5', why: 'Hitung lagi pelan-pelan, mulai dari sisi atas.' },
              { t: '8', why: 'Hanya ada 6 garis lurus.' },
              { t: '4', why: 'Segi empat punya 4 sisi. Bentuk ini punya lebih banyak.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sisi dan titik sudut',
      steps: [
        {
          say: 'Garis lurus di tepi bentuk disebut sisi. Titik tempat dua sisi bertemu disebut titik sudut.',
          clear: true,
          add: [reg('s', 200, 120, 4, 80), ...corners('c', 200, 120, 4, 80), T('l1', 'sisi', 200, 52, { size: 16, c: 'pos' }), T('l2', 'titik sudut', 300, 50, { size: 16 })],
        },
        {
          say: 'Segi empat punya 4 sisi dan 4 titik sudut. Banyak sisi selalu sama dengan banyak titik sudut.',
          add: [T('a', '4 sisi, 4 titik sudut', 200, 230, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Nama menurut banyak sisi',
      steps: [
        {
          say: '3 sisi: segitiga. 4 sisi: segi empat.',
          clear: true,
          add: [reg('a', 70, 100, 3, 45), T('la', 'segitiga', 70, 170, { size: 15 }), reg('b', 165, 100, 4, 45), T('lb', 'segi empat', 165, 170, { size: 15 })],
        },
        {
          say: '5 sisi: segi lima. 6 sisi: segi enam. Nama bentuk mengikuti banyak sisinya.',
          add: [reg('c', 255, 100, 5, 42), T('lc', 'segi lima', 255, 170, { size: 15 }), reg('d', 345, 100, 6, 42), T('ld', 'segi enam', 345, 170, { size: 15 }), T('k', 'nama = banyak sisi', 200, 230, { size: 20, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Apa nama bentuk ini?',
          clear: true,
          add: [reg('s', 200, 120, 5, 80), ...corners('c', 200, 120, 5, 80)],
          ask: {
            options: [
              { t: 'segi lima', ok: true, why: 'Ada 5 sisi dan 5 titik sudut.' },
              { t: 'segi enam', why: 'Hitung titik sudutnya: hanya 5.' },
              { t: 'segi empat', why: 'Ada lebih dari 4 sisi.' },
              { t: 'lingkaran', why: 'Lingkaran tidak punya sisi lurus.' },
            ],
          },
        },
        {
          say: 'Hitung titik sudutnya: satu, dua, tiga, empat, lima. Ini segi lima.',
          add: [T('a', '{g:segi lima}', 200, 235, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa banyak sisi bentuk ini?',
      fig: [reg('f', 200, 150, 5, 90)],
      ans: ['5'],
      wrong: { '4': 'Hitung lagi semua garis lurusnya.', '6': 'Hanya ada 5 sisi.' },
      steps: ['Ada 5 garis lurus.', 'Segi lima.'],
    },
    {
      type: 'num',
      q: 'Segi enam punya berapa titik sudut?',
      ans: ['6'],
      wrong: { '5': 'Banyak titik sudut sama dengan banyak sisi: 6.', '12': 'Banyak titik sudut sama dengan banyak sisi, bukan dua kalinya.' },
      steps: ['Segi enam: 6 sisi.', 'Maka 6 titik sudut.'],
    },
    {
      q: 'Bentuk dengan 3 sisi disebut …',
      options: [
        { t: 'segitiga', ok: true },
        { t: 'segi empat', why: 'Segi empat punya 4 sisi.' },
        { t: 'segi lima', why: 'Segi lima punya 5 sisi.' },
      ],
      steps: ['3 sisi → segitiga.'],
    },
    {
      q: 'Apa nama bentuk ini?',
      fig: [reg('f', 200, 150, 6, 95)],
      options: [
        { t: 'segi enam', ok: true },
        { t: 'segi lima', why: 'Hitung sisinya: ada 6.' },
        { t: 'lingkaran', why: 'Bentuk ini punya sisi lurus.' },
      ],
      steps: ['6 sisi → segi enam.'],
    },
    {
      q: 'Bentuk yang tidak punya titik sudut adalah …',
      options: [
        { t: 'lingkaran', ok: true },
        { t: 'segitiga', why: 'Segitiga punya 3 titik sudut.' },
        { t: 'segi empat', why: 'Segi empat punya 4 titik sudut.' },
      ],
      steps: ['Lingkaran tidak punya sisi lurus.', 'Jadi tidak punya titik sudut.'],
    },
  ],
};

// ---------- 3.2 Menyusun dan memecah bentuk ----------
const S = 70;
const triA = (id, x, y, o = {}) => ({ id, t: 'poly', x, y, pts: [[-S / 2, -S / 2], [S / 2, -S / 2], [-S / 2, S / 2]], fill: 'acc-soft', stroke: 'acc', sw: 3, ...o });
const triB = (id, x, y, o = {}) => ({ id, t: 'poly', x, y, pts: [[S / 2, -S / 2], [S / 2, S / 2], [-S / 2, S / 2]], fill: 'neg-soft', stroke: 'neg', sw: 3, ...o });
const sqr = (id, x, y, c = 'pos', o = {}) => ({ id, t: 'rect', x, y, w: S, h: S, r: 0, fill: `${c}-soft`, stroke: c, sw: 3, ...o });

const l2 = {
  id: 'k2b3-2',
  title: 'Menyusun dan Memecah Bentuk',
  hook: 'Bentuk-bentuk kecil bisa disusun menjadi bentuk yang lebih besar. Dua segitiga bisa menjadi satu persegi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua segitiga ini didekatkan sampai sisi miringnya menempel. Bentuk apa yang terjadi?',
          add: [triA('a', 120, 120), triB('b', 280, 120)],
          ask: {
            options: [
              { t: 'persegi', ok: true, why: 'Sisi miring keduanya menempel, membentuk persegi dengan 4 sisi sama panjang.' },
              { t: 'segitiga besar', why: 'Coba gabungkan: hasilnya punya 4 sisi.' },
              { t: 'lingkaran', why: 'Gabungan dua segitiga tetap punya sisi lurus.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dua segitiga jadi persegi',
      steps: [
        {
          say: 'Ada dua segitiga.',
          clear: true,
          add: [triA('a', 120, 120), triB('b', 280, 120)],
        },
        {
          say: 'Geser sampai sisi miringnya menempel. Jadilah persegi.',
          set: { a: { x: 200 }, b: { x: 200 } },
          add: [T('k', '2 segitiga = 1 persegi', 200, 210, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Dua persegi jadi persegi panjang',
      steps: [
        {
          say: 'Dua persegi disusun berdampingan menjadi persegi panjang.',
          clear: true,
          add: [sqr('a', 100, 110, 'pos'), sqr('b', 300, 110, 'ok')],
        },
        {
          say: 'Tempelkan.',
          set: { a: { x: 200 - S / 2 }, b: { x: 200 + S / 2 } },
          add: [T('k', '2 persegi = 1 persegi panjang', 200, 200, { size: 20, c: 'ok' })],
        },
        {
          say: 'Sebaliknya, persegi panjang bisa dipecah menjadi dua persegi. Persegi bisa dipecah menjadi dua segitiga.',
          add: [T('k2', 'bentuk besar bisa dipecah jadi bentuk kecil', 200, 240, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa segitiga kecil yang dibutuhkan untuk menyusun persegi panjang ini?',
          clear: true,
          add: [sqr('a', 200 - S / 2, 110, 'pos'), sqr('b', 200 + S / 2, 110, 'pos'), { id: 'd1', t: 'line', x: 200 - S, y: 110 + S / 2, x2: 200, y2: 110 - S / 2, sw: 2, c: 'mut', dash: '5 4', draw: false }, { id: 'd2', t: 'line', x: 200, y: 110 + S / 2, x2: 200 + S, y2: 110 - S / 2, sw: 2, c: 'mut', dash: '5 4', draw: false }],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Persegi panjang = 2 persegi. Setiap persegi = 2 segitiga. 2 + 2 = 4.' },
              { t: '2', why: '2 segitiga hanya cukup untuk satu persegi.' },
              { t: '3', why: 'Setiap persegi butuh 2 segitiga. Ada 2 persegi.' },
            ],
          },
        },
        {
          say: 'Setiap persegi terdiri dari 2 segitiga. Ada 2 persegi, jadi 4 segitiga.',
          add: [T('ans', '2 + 2 = {g:4} segitiga', 200, 210, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa segitiga untuk membuat satu persegi seperti di pelajaran?',
      ans: ['2'],
      wrong: { '4': '4 segitiga untuk persegi panjang dari 2 persegi.', '3': 'Satu persegi dibagi diagonal menjadi 2 segitiga.' },
      steps: ['Persegi dipotong diagonal.', 'Jadi 2 segitiga.'],
    },
    {
      q: 'Dua persegi yang sama besar ditempel berdampingan menjadi …',
      options: [
        { t: 'persegi panjang', ok: true },
        { t: 'segitiga', why: 'Hasilnya punya 4 sisi.' },
        { t: 'persegi yang lebih besar', why: 'Panjangnya 2 kali lebarnya, jadi persegi panjang.' },
      ],
      steps: ['Panjang 2 sisi, lebar 1 sisi.', 'Persegi panjang.'],
    },
    {
      type: 'num',
      q: 'Berapa persegi kecil dalam gambar ini?',
      fig: [0, 1, 2].map((i) => sqr(`f${i}`, 130 + i * S, 150, 'pos')),
      ans: ['3'],
      wrong: { '1': 'Ada garis pemisah. Hitung kotak kecilnya.', '4': 'Hanya ada 3 kotak.' },
      steps: ['Hitung kotak kecil.', 'Ada 3.'],
    },
    {
      q: 'Persegi dipotong menurut garis diagonal. Hasilnya …',
      options: [
        { t: '2 segitiga', ok: true },
        { t: '2 persegi', why: 'Garis diagonal miring, menghasilkan segitiga.' },
        { t: '4 segitiga', why: 'Satu garis diagonal hanya membagi menjadi 2 bagian.' },
      ],
      steps: ['Satu potongan diagonal → 2 segitiga.'],
    },
    {
      type: 'num',
      q: 'Berapa segitiga dalam gambar ini?',
      fig: [triA('f1', 160, 150), triB('f2', 160, 150), triA('f3', 240, 150), triB('f4', 240, 150)],
      ans: ['4'],
      wrong: { '2': 'Setiap persegi terbagi menjadi 2 segitiga.', '1': 'Hitung setiap bagian berwarna.' },
      steps: ['2 persegi, masing-masing 2 segitiga.', '= 4.'],
    },
  ],
};

export default {
  id: 'k2b3',
  no: 3,
  title: 'Bentuk di Sekitar Kita',
  desc: 'Sisi dan titik sudut, nama bangun datar menurut banyak sisi, serta menyusun dan memecah bentuk.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Segi lima punya berapa sisi?',
      ans: ['5'],
      steps: ['Segi lima: 5 sisi.'],
      wrong: { '4': 'Segi empat yang punya 4 sisi.' },
    },
    {
      q: 'Banyak titik sudut segitiga adalah …',
      options: [
        { t: '3', ok: true },
        { t: '4', why: 'Segi empat yang punya 4 titik sudut.' },
        { t: '0', why: 'Lingkaran yang tidak punya titik sudut.' },
      ],
      steps: ['Segitiga: 3 sisi, 3 titik sudut.'],
    },
    {
      type: 'num',
      q: 'Berapa sisi bentuk ini?',
      fig: [reg('f', 200, 150, 4, 90)],
      ans: ['4'],
      wrong: { '3': 'Hitung lagi semua sisinya.' },
      steps: ['Ada 4 sisi.'],
    },
  ],
};
