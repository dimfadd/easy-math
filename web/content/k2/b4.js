// Kelas 2 · Bab 4: Posisi Benda dan Pola
import { T, box } from '../helpers.js';
import { obj } from '../k1/kit.js';

// Rak 3 × 3 berisi benda
const CX = [130, 200, 270];
const CY = [70, 140, 210];
const shelf = () => {
  let d = '';
  for (let i = 0; i <= 3; i++) d += `M95,${35 + i * 70} H305 `;
  for (let j = 0; j <= 3; j++) d += `M${95 + j * 70},35 V245 `;
  return { id: 'rak', t: 'path', x: 0, y: 0, d, stroke: 'ink', sw: 2.5, z: -1 };
};
const ballO = (id, x, y) => ({ id, t: 'circle', x, y, r: 20, fill: 'pos', stroke: 'ink', sw: 1.5 });
const ITEMS = [
  ['apel', (id, x, y) => obj(id, 'apple', x, y, 46), 1, 0],
  ['bola', ballO, 0, 1],
  ['bintang', (id, x, y) => obj(id, 'star', x, y, 46), 1, 1],
  ['buku', (id, x, y) => box(id, x, y, 34, 44, { fill: 'ok-soft', stroke: 'ok', sw: 2.5, r: 3 }), 2, 1],
  ['kotak', (id, x, y) => box(id, x, y, 40, 30, { fill: 'acc-soft', stroke: 'acc', sw: 2.5, r: 3 }), 1, 2],
];
const shelfEls = () => [shelf(), ...ITEMS.map(([n, f, c, r]) => f(`i_${n}`, CX[c], CY[r]))];

// ---------- 4.1 Posisi benda ----------
const l1 = {
  id: 'k2b4-1',
  title: 'Posisi Benda',
  hook: 'Posisi benda dijelaskan dengan kata atas, bawah, kiri, kanan, dan di antara. Posisi selalu dilihat dari benda lain.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bintang ada di tengah rak. Benda apa yang ada di atas bintang?',
          add: shelfEls(),
          ask: {
            options: [
              { t: 'apel', ok: true, why: 'Apel ada tepat di kotak atas bintang.' },
              { t: 'kotak', why: 'Kotak ada di bawah bintang.' },
              { t: 'bola', why: 'Bola ada di sebelah kiri bintang.' },
              { t: 'buku', why: 'Buku ada di sebelah kanan bintang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Atas, bawah, kiri, kanan',
      steps: [
        {
          say: 'Lihat bintang. Apel ada di atas bintang. Kotak ada di bawah bintang.',
          clear: true,
          add: [...shelfEls(), T('a', 'atas', 350, 70, { size: 16, c: 'neg' }), T('b', 'bawah', 350, 210, { size: 16, c: 'acc' })],
          hl: ['i_apel', 'i_kotak'],
        },
        {
          say: 'Bola ada di kiri bintang. Buku ada di kanan bintang.',
          hl: ['i_bola', 'i_buku'],
          add: [T('c', 'kiri: bola', 50, 140, { size: 14, c: 'pos' }), T('d', 'kanan: buku', 350, 140, { size: 14, c: 'ok' })],
        },
        {
          say: 'Bintang ada di antara bola dan buku.',
          hl: ['i_bintang'],
          add: [T('e', 'bintang di antara bola dan buku', 200, 275, { size: 16 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Benda apa yang ada di sebelah kiri bintang?',
          clear: true,
          add: shelfEls(),
          ask: {
            options: [
              { t: 'bola', ok: true, why: 'Bola ada tepat di kotak kiri bintang.' },
              { t: 'buku', why: 'Buku ada di kanan bintang.' },
              { t: 'apel', why: 'Apel ada di atas bintang.' },
              { t: 'kotak', why: 'Kotak ada di bawah bintang.' },
            ],
          },
        },
        {
          say: 'Bola ada di sebelah kiri bintang.',
          hl: ['i_bola'],
          add: [T('a', 'kiri bintang: {g:bola}', 200, 275, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Benda apa yang ada di bawah bintang?',
      fig: shelfEls(),
      options: [
        { t: 'kotak', ok: true },
        { t: 'apel', why: 'Apel ada di atas bintang.' },
        { t: 'buku', why: 'Buku ada di kanan bintang.' },
      ],
      steps: ['Lihat kotak di bawah bintang.', 'Kotak.'],
    },
    {
      q: 'Benda apa yang ada di kanan bintang?',
      fig: shelfEls(),
      options: [
        { t: 'buku', ok: true },
        { t: 'bola', why: 'Bola ada di kiri bintang.' },
        { t: 'kotak', why: 'Kotak ada di bawah bintang.' },
      ],
      steps: ['Lihat kotak di kanan bintang.', 'Buku.'],
    },
    {
      q: 'Apel ada di … bintang.',
      fig: shelfEls(),
      options: [
        { t: 'atas', ok: true },
        { t: 'bawah', why: 'Kotak yang ada di bawah bintang.' },
        { t: 'kiri', why: 'Bola yang ada di kiri bintang.' },
      ],
      steps: ['Apel tepat di atas bintang.'],
    },
    {
      q: 'Bintang ada di antara …',
      fig: shelfEls(),
      options: [
        { t: 'bola dan buku', ok: true },
        { t: 'apel dan bola', why: 'Apel di atas, bola di kiri. Bintang tidak di antara keduanya dalam satu baris.' },
        { t: 'buku dan kotak', why: 'Buku di kanan, kotak di bawah.' },
      ],
      steps: ['Baris tengah: bola, bintang, buku.'],
    },
    {
      q: 'Kebalikan dari "kiri" adalah …',
      options: [
        { t: 'kanan', ok: true },
        { t: 'atas', why: 'Kebalikan atas adalah bawah.' },
        { t: 'depan', why: 'Kebalikan depan adalah belakang.' },
      ],
      steps: ['Kiri ↔ kanan.'],
    },
  ],
};

// ---------- 4.2 Pola ----------
const PIC = { a: (id, x, y) => obj(id, 'apple', x, y, 34), s: (id, x, y) => obj(id, 'star', x, y, 34), b: (id, x, y) => ({ id, t: 'circle', x, y, r: 14, fill: 'pos', stroke: 'ink', sw: 1.5 }) };
const row = (p, seq, y, x0 = 50, dx = 42) => seq.map((k, i) => (k === '?' ? box(`${p}${i}`, x0 + i * dx, y, 32, 32, { r: 6, fill: 'paper', stroke: 'acc', sw: 2.5, label: '?', lsize: 18 }) : PIC[k](`${p}${i}`, x0 + i * dx, y)));

const l2 = {
  id: 'k2b4-2',
  title: 'Pola',
  hook: 'Pola adalah susunan yang berulang atau bertambah dengan aturan tetap. Temukan aturannya, lalu tebak yang berikutnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Apel, bintang, apel, bintang, apel, bintang. Apa yang datang berikutnya?',
          add: row('r', ['a', 's', 'a', 's', 'a', 's', '?'], 110),
          ask: {
            options: [
              { t: 'apel', ok: true, why: 'Polanya apel, bintang, berulang. Setelah bintang datang apel.' },
              { t: 'bintang', why: 'Bintang baru saja muncul. Setelah bintang selalu apel.' },
              { t: 'bola', why: 'Bola tidak ada dalam pola ini.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pola berulang',
      steps: [
        {
          say: 'Bagian yang berulang adalah apel, bintang. Kita tandai setiap ulangannya.',
          clear: true,
          add: [...row('r', ['a', 's', 'a', 's', 'a', 's'], 110), ...[0, 1, 2].map((i) => box(`g${i}`, 71 + i * 84, 110, 78, 50, { r: 10, fill: 'none', stroke: 'ok', sw: 2, z: -1 }))],
        },
        {
          say: 'Pola bisa lebih panjang. Apel, bola, bola, lalu berulang: apel, bola, bola.',
          add: [...row('t', ['a', 'b', 'b', 'a', 'b', 'b', 'a', '?'], 200), T('k', 'berikutnya: bola', 200, 250, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Pola bilangan',
      steps: [
        {
          say: 'Bilangan juga bisa membentuk pola. 2, 4, 6, 8: setiap kali bertambah 2. Berikutnya 10.',
          clear: true,
          add: [T('a', '2,  4,  6,  8,  …', 200, 70, { size: 32, c: 'pos' }), T('a2', '+2 setiap langkah → 10', 200, 115, { size: 18, c: 'mut' })],
        },
        {
          say: '5, 10, 15, 20: setiap kali bertambah 5. Berikutnya 25.',
          add: [T('b', '5,  10,  15,  20,  …', 200, 175, { size: 32, c: 'acc' }), T('b2', '+5 setiap langkah → 25', 200, 220, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 10, 20, 30, 40. Berapa bilangan berikutnya?',
          clear: true,
          add: [T('q', '10,  20,  30,  40,  …', 200, 100, { size: 34, c: 'pos' })],
          ask: {
            options: [
              { t: '50', ok: true, why: 'Setiap langkah bertambah 10. 40 + 10 = 50.' },
              { t: '41', why: 'Polanya bertambah 10, bukan 1.' },
              { t: '60', why: '60 datang dua langkah lagi.' },
              { t: '45', why: 'Setiap langkah bertambah 10.' },
            ],
          },
        },
        {
          say: 'Setiap langkah bertambah 10. 40 tambah 10 sama dengan 50.',
          add: [T('a', '40 + 10 = {g:50}', 200, 180, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Apa gambar berikutnya?',
      fig: row('f', ['s', 's', 'a', 's', 's', 'a', 's', '?'], 150),
      options: [
        { t: 'bintang', ok: true },
        { t: 'apel', why: 'Polanya bintang, bintang, apel. Setelah satu bintang datang bintang lagi.' },
        { t: 'bola', why: 'Bola tidak ada dalam pola ini.' },
      ],
      steps: ['Pola: bintang, bintang, apel.', 'Berikutnya bintang.'],
    },
    {
      type: 'num',
      q: '3, 6, 9, 12, … Bilangan berikutnya adalah …',
      ans: ['15'],
      wrong: { '13': 'Polanya bertambah 3.', '14': '12 + 3 = 15.' },
      steps: ['Setiap langkah +3.', '12 + 3 = 15.'],
    },
    {
      type: 'num',
      q: '20, 18, 16, 14, … Bilangan berikutnya adalah …',
      ans: ['12'],
      wrong: { '16': 'Polanya berkurang 2.', '13': '14 − 2 = 12.' },
      steps: ['Setiap langkah −2.', '14 − 2 = 12.'],
    },
    {
      type: 'num',
      q: '5, 10, 15, …, 25. Bilangan yang hilang adalah …',
      ans: ['20'],
      wrong: { '16': 'Polanya bertambah 5.' },
      steps: ['15 + 5 = 20.'],
    },
    {
      q: 'Bagian yang berulang dari pola merah, biru, merah, biru, … adalah …',
      options: [
        { t: 'merah, biru', ok: true },
        { t: 'merah saja', why: 'Biru juga ikut berulang.' },
        { t: 'biru, biru', why: 'Tidak ada dua biru berurutan.' },
      ],
      steps: ['Merah, biru, lalu berulang.'],
    },
  ],
};

export default {
  id: 'k2b4',
  no: 4,
  title: 'Posisi Benda dan Pola',
  desc: 'Atas, bawah, kiri, kanan, dan di antara; pola gambar berulang dan pola bilangan bertambah atau berkurang.',
  lessons: [l1, l2],
  extra: [
    {
      q: 'Benda apa yang ada di kiri buku?',
      fig: shelfEls(),
      options: [
        { t: 'bintang', ok: true },
        { t: 'apel', why: 'Apel ada di atas bintang, bukan di baris buku.' },
        { t: 'kotak', why: 'Kotak ada di baris bawah.' },
      ],
      steps: ['Baris tengah: bola, bintang, buku.', 'Kiri buku: bintang.'],
    },
    {
      type: 'num',
      q: '30, 35, 40, 45, … Bilangan berikutnya adalah …',
      ans: ['50'],
      wrong: { '46': 'Polanya bertambah 5.' },
      steps: ['45 + 5 = 50.'],
    },
    {
      q: 'Apa gambar berikutnya?',
      fig: row('f', ['a', 'b', 'a', 'b', 'a', '?'], 150, 90),
      options: [
        { t: 'bola', ok: true },
        { t: 'apel', why: 'Setelah apel selalu bola.' },
        { t: 'bintang', why: 'Bintang tidak ada dalam pola.' },
      ],
      steps: ['Pola: apel, bola.', 'Setelah apel: bola.'],
    },
  ],
};
