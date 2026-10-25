// Kelas 1 · Bab 8: Mengenal Diagram
import { T, ln } from '../helpers.js';
import { obj } from './kit.js';

// Benda untuk dikelompokkan: apel, bintang, bola (lingkaran biru)
const ballIcon = (id, x, y, s = 30) => ({ id, t: 'circle', x, y, r: s * 0.42, fill: 'pos', stroke: 'ink', sw: 1.5 });
const thing = (kind, id, x, y, s = 30) => (kind === 'b' ? ballIcon(id, x, y, s) : obj(id, kind === 'a' ? 'apple' : 'star', x, y, s));
const MIX = ['a', 's', 'b', 'a', 'b', 's', 'a', 'a', 'b', 's', 'a', 'b', 'a'];
const SCATTER = [[60, 60], [150, 50], [250, 70], [340, 55], [90, 130], [190, 120], [300, 135], [50, 200], [140, 190], [230, 210], [330, 200], [100, 255], [280, 255]];
const ROW = { a: 0, s: 1, b: 2 };
const LAB = { a: 'apel', s: 'bintang', b: 'bola' };

// Piktogram: setiap baris berisi label dan sejumlah simbol
function picto(p, rows, { x0 = 120, y0 = 70, dy = 60, dx = 38, size = 30 } = {}) {
  const els = [];
  rows.forEach(([kind, n, label], r) => {
    const y = y0 + r * dy;
    els.push(T(`${p}l${r}`, label, x0 - 60, y, { size: 16 }));
    for (let i = 0; i < n; i++) els.push(thing(kind, `${p}${r}_${i}`, x0 + i * dx, y, size));
    if (r > 0) els.push(ln(`${p}g${r}`, x0 - 100, y - dy / 2, x0 + 7 * dx, y - dy / 2, { sw: 1, c: 'mut', draw: false, z: -1 }));
  });
  return els;
}

// ---------- 8.1 Mengelompokkan dan membuat diagram ----------
const sorted = () => {
  const seen = { a: 0, s: 0, b: 0 };
  return MIX.map((k) => {
    const i = seen[k]++;
    return { x: 120 + i * 38, y: 70 + ROW[k] * 60 };
  });
};

const l1 = {
  id: 'k1b8-1',
  title: 'Mengelompokkan dan Membuat Diagram',
  hook: 'Benda yang berantakan sulit dihitung. Kelompokkan menurut jenisnya, lalu susun berbaris menjadi diagram gambar.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada banyak benda berantakan. Mana yang paling banyak: apel, bintang, atau bola?',
          add: MIX.map((k, i) => thing(k, `m${i}`, ...SCATTER[i])),
          ask: {
            options: [
              { t: 'apel', ok: true, why: 'Apel ada 6, bola 4, bintang 3.' },
              { t: 'bola', why: 'Bola ada 4. Apel lebih banyak: 6.' },
              { t: 'bintang', why: 'Bintang paling sedikit: 3.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kelompokkan dan susun',
      steps: [
        {
          say: 'Benda yang berantakan sulit dihitung. Kita kelompokkan menurut jenisnya.',
          clear: true,
          add: MIX.map((k, i) => thing(k, `m${i}`, ...SCATTER[i])),
        },
        {
          say: 'Susun setiap jenis dalam satu baris. Apel di baris atas, bintang di tengah, bola di bawah.',
          set: Object.fromEntries(sorted().map((p, i) => [`m${i}`, p])),
          add: ['a', 's', 'b'].map((k) => T(`l${k}`, LAB[k], 50, 70 + ROW[k] * 60, { size: 16 })),
        },
        {
          say: 'Sekarang mudah dihitung. Apel 6, bintang 3, bola 4. Susunan ini disebut diagram gambar.',
          add: [T('na', '6', 370, 70, { size: 22, c: 'neg' }), T('ns', '3', 370, 130, { size: 22, c: 'acc' }), T('nb', '4', 370, 190, { size: 22, c: 'pos' }), T('k', 'diagram gambar', 200, 250, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari diagram tadi, ada berapa bola?',
          clear: true,
          add: picto('p', [['a', 6, 'apel'], ['s', 3, 'bintang'], ['b', 4, 'bola']]),
          ask: {
            options: [
              { t: '4', ok: true, why: 'Baris bola berisi 4 gambar.' },
              { t: '6', why: '6 adalah banyak apel.' },
              { t: '3', why: '3 adalah banyak bintang.' },
            ],
          },
        },
        {
          say: 'Lihat baris bola. Ada 4.',
          hl: ['pl2'],
          add: [T('a', 'bola: {g:4}', 200, 260, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Ada berapa apel pada diagram?',
      fig: picto('f', [['a', 5, 'apel'], ['s', 2, 'bintang']], { y0: 110 }),
      ans: ['5'],
      wrong: { '2': '2 adalah banyak bintang.', '7': 'Hitung baris apel saja.' },
      steps: ['Baris apel berisi 5 gambar.'],
    },
    {
      type: 'num',
      q: 'Ada berapa bintang pada diagram?',
      fig: picto('f', [['a', 3, 'apel'], ['s', 6, 'bintang']], { y0: 110 }),
      ans: ['6'],
      wrong: { '3': '3 adalah banyak apel.' },
      steps: ['Baris bintang berisi 6 gambar.'],
    },
    {
      q: 'Mengapa benda dikelompokkan sebelum dihitung?',
      options: [
        { t: 'supaya mudah dihitung', ok: true },
        { t: 'supaya bendanya bertambah', why: 'Mengelompokkan tidak menambah benda.' },
        { t: 'supaya warnanya berubah', why: 'Warna benda tetap sama.' },
      ],
      steps: ['Benda yang tersusun rapi mudah dihitung.'],
    },
    {
      q: 'Mana yang paling sedikit?',
      fig: picto('f', [['a', 4, 'apel'], ['s', 2, 'bintang'], ['b', 5, 'bola']]),
      options: [
        { t: 'bintang', ok: true },
        { t: 'apel', why: 'Apel 4, bintang hanya 2.' },
        { t: 'bola', why: 'Bola paling banyak.' },
      ],
      steps: ['Bintang hanya 2.', 'Paling sedikit.'],
    },
    {
      type: 'num',
      q: 'Ada berapa benda semuanya?',
      fig: picto('f', [['a', 3, 'apel'], ['b', 4, 'bola']], { y0: 110 }),
      ans: ['7'],
      wrong: { '3': 'Bola juga dihitung.', '4': 'Apel juga dihitung.' },
      steps: ['Apel 3, bola 4.', '3 + 4 = 7.'],
    },
  ],
};

// ---------- 8.2 Membaca diagram ----------
const DATA = [['a', 5, 'apel'], ['s', 2, 'bintang'], ['b', 4, 'bola']];

const l2 = {
  id: 'k1b8-2',
  title: 'Membaca Diagram Gambar',
  hook: 'Diagram gambar menjawab pertanyaan: mana yang paling banyak, paling sedikit, dan berapa selisihnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini hasil memilih hadiah kesukaan teman sekelas. Hadiah mana yang paling sedikit dipilih?',
          add: picto('p', DATA),
          ask: {
            options: [
              { t: 'bintang', ok: true, why: 'Baris bintang paling pendek, hanya 2.' },
              { t: 'apel', why: 'Apel paling banyak, 5.' },
              { t: 'bola', why: 'Bola 4, masih lebih banyak dari bintang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Baris terpanjang dan terpendek',
      steps: [
        {
          say: 'Baris terpanjang menunjukkan yang paling banyak: apel, 5.',
          clear: true,
          add: picto('p', DATA),
          hl: ['pl0'],
        },
        {
          say: 'Baris terpendek menunjukkan yang paling sedikit: bintang, 2.',
          hl: ['pl1'],
          add: [T('a', 'paling banyak: {g:apel}    paling sedikit: {n:bintang}', 200, 250, { size: 17 })],
        },
      ],
    },
    {
      title: 'Selisih dan jumlah',
      steps: [
        {
          say: 'Berapa lebih banyak apel dari bola? Apel 5, bola 4. 5 kurang 4 sama dengan 1.',
          clear: true,
          add: [...picto('p', DATA), T('a', 'apel − bola = 5 − 4 = 1', 200, 245, { size: 20 })],
        },
        {
          say: 'Berapa anak semuanya? Jumlahkan: 5 tambah 2 tambah 4 sama dengan 11.',
          add: [T('b', 'semua: 5 + 2 + 4 = {g:11}', 200, 278, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Bola lebih banyak berapa dari bintang?',
          clear: true,
          add: picto('p', DATA),
          ask: {
            options: [
              { t: '2', ok: true, why: 'Bola 4, bintang 2. 4 − 2 = 2.' },
              { t: '6', why: '6 adalah jumlah bola dan bintang. Selisih memakai pengurangan.' },
              { t: '4', why: '4 adalah banyak bola.' },
            ],
          },
        },
        {
          say: 'Bola 4, bintang 2. 4 kurang 2 sama dengan 2.',
          add: [T('a', '4 − 2 = {g:2}', 200, 250, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Mana yang paling banyak dipilih?',
      fig: picto('f', [['a', 3, 'apel'], ['s', 6, 'bintang'], ['b', 2, 'bola']]),
      options: [
        { t: 'bintang', ok: true },
        { t: 'apel', why: 'Apel 3, bintang 6.' },
        { t: 'bola', why: 'Bola paling sedikit.' },
      ],
      steps: ['Baris bintang paling panjang.'],
    },
    {
      type: 'num',
      q: 'Bintang lebih banyak berapa dari apel?',
      fig: picto('f', [['a', 3, 'apel'], ['s', 6, 'bintang'], ['b', 2, 'bola']]),
      ans: ['3'],
      wrong: { '9': 'Selisih memakai pengurangan.', '6': '6 adalah banyak bintang.' },
      steps: ['6 − 3.', '= 3.'],
    },
    {
      type: 'num',
      q: 'Berapa semuanya?',
      fig: picto('f', [['a', 3, 'apel'], ['s', 6, 'bintang'], ['b', 2, 'bola']]),
      ans: ['11'],
      wrong: { '10': 'Hitung lagi: 3 + 6 + 2.', '6': 'Semua baris dijumlahkan.' },
      steps: ['3 + 6 + 2.', '= 11.'],
    },
    {
      type: 'num',
      q: 'Ada berapa bola?',
      fig: picto('f', [['a', 4, 'apel'], ['b', 5, 'bola']], { y0: 110 }),
      ans: ['5'],
      wrong: { '4': '4 adalah banyak apel.' },
      steps: ['Baris bola berisi 5.'],
    },
    {
      q: 'Pada diagram gambar, baris yang paling pendek menunjukkan …',
      options: [
        { t: 'yang paling sedikit', ok: true },
        { t: 'yang paling banyak', why: 'Yang paling banyak ditunjukkan baris terpanjang.' },
        { t: 'jumlah semuanya', why: 'Jumlah semua didapat dari menjumlahkan setiap baris.' },
      ],
      steps: ['Baris pendek → sedikit.'],
    },
  ],
};

export default {
  id: 'k1b8',
  no: 8,
  title: 'Mengenal Diagram',
  desc: 'Mengelompokkan benda, menyusun diagram gambar, dan membaca diagram: paling banyak, paling sedikit, selisih, dan jumlah.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Ada berapa apel?',
      fig: picto('f', [['a', 7, 'apel'], ['s', 3, 'bintang']], { y0: 110 }),
      ans: ['7'],
      wrong: { '3': '3 adalah banyak bintang.' },
      steps: ['Baris apel berisi 7.'],
    },
    {
      type: 'num',
      q: 'Apel lebih banyak berapa dari bintang?',
      fig: picto('f', [['a', 7, 'apel'], ['s', 3, 'bintang']], { y0: 110 }),
      ans: ['4'],
      wrong: { '10': 'Selisih memakai pengurangan.' },
      steps: ['7 − 3.', '= 4.'],
    },
    {
      q: 'Mana yang sama banyak?',
      fig: picto('f', [['a', 4, 'apel'], ['s', 4, 'bintang'], ['b', 2, 'bola']]),
      options: [
        { t: 'apel dan bintang', ok: true },
        { t: 'apel dan bola', why: 'Apel 4, bola 2.' },
        { t: 'bintang dan bola', why: 'Bintang 4, bola 2.' },
      ],
      steps: ['Apel 4, bintang 4.', 'Sama banyak.'],
    },
  ],
};
