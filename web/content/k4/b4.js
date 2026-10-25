// Kelas 4 · Bab 4: Pengukuran Luas dan Volume
import { T, box } from '../helpers.js';

// Petak persegi satuan
const CS = 30;
function cells(p, cols, rows, x0, y0, { fill = 'pos-soft', stroke = 'pos', skip = [] } = {}) {
  const els = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) if (!skip.includes(`${c},${r}`)) els.push(box(`${p}${r}_${c}`, x0 + CS * c + CS / 2, y0 + CS * r + CS / 2, CS, CS, { r: 0, fill, stroke, sw: 1.5 }));
  return els;
}
// Kubus satuan dalam proyeksi miring; (i kanan, j ke belakang, k ke atas)
const CU = 26;
const DX = CU * 0.55;
const DY = CU * 0.42;
function cube(id, i, j, k, x0, y0, c = 'acc') {
  const X = x0 + i * CU + j * DX;
  const Y = y0 - k * CU - j * DY;
  return [
    { id: `${id}f`, t: 'poly', x: 0, y: 0, pts: [[X, Y], [X + CU, Y], [X + CU, Y - CU], [X, Y - CU]], fill: `${c}-soft`, stroke: c, sw: 1.5 },
    { id: `${id}t`, t: 'poly', x: 0, y: 0, pts: [[X, Y - CU], [X + CU, Y - CU], [X + CU + DX, Y - CU - DY], [X + DX, Y - CU - DY]], fill: 'paper', stroke: c, sw: 1.5 },
    { id: `${id}s`, t: 'poly', x: 0, y: 0, pts: [[X + CU, Y], [X + CU + DX, Y - DY], [X + CU + DX, Y - CU - DY], [X + CU, Y - CU]], fill: `${c}-soft`, stroke: c, sw: 1.5, o: 0.8 },
  ];
}
// Balok p × l × t dari kubus satuan; urutan gambar belakang ke depan, bawah ke atas
function blockOf(p, a, b, h, x0, y0, c = 'acc', upto = h) {
  const els = [];
  for (let k = 0; k < Math.min(h, upto); k++) for (let j = b - 1; j >= 0; j--) for (let i = 0; i < a; i++) els.push(...cube(`${p}${i}${j}${k}`, i, j, k, x0, y0, c));
  return els;
}

// ---------- 4.1 Luas ----------
const l1 = {
  id: 'k4b4-1',
  title: 'Luas dengan Persegi Satuan',
  hook: 'Luas adalah banyak persegi satuan yang menutupi suatu daerah. Persegi panjang 4 petak × 3 baris luasnya 12 persegi satuan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bangun A dan bangun B tersusun dari persegi kecil yang sama. Mana yang lebih luas?',
          add: [...cells('a', 4, 3, 40, 60), T('la', 'A', 100, 175, { size: 18 }), ...cells('b', 6, 2, 200, 75, { fill: 'acc-soft', stroke: 'acc' }), T('lb', 'B', 290, 175, { size: 18 })],
          ask: {
            options: [
              { t: 'sama luas', ok: true, why: 'A berisi 4 × 3 = 12 petak, B berisi 6 × 2 = 12 petak.' },
              { t: 'A', why: 'A terlihat lebih tinggi, tetapi hitung petaknya: 12.' },
              { t: 'B', why: 'B terlihat lebih panjang, tetapi hitung petaknya: juga 12.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menghitung petak',
      steps: [
        {
          say: 'Satu persegi kecil disebut persegi satuan. Luas adalah banyak persegi satuan yang menutupi bangun.',
          clear: true,
          add: [...cells('a', 4, 3, 140, 50), T('k', '1 petak = 1 persegi satuan', 200, 170, { size: 16, c: 'mut' })],
          hl: ['a0_0'],
        },
        {
          say: 'Tidak perlu menghitung satu per satu. Ada 3 baris, setiap baris 4 petak. 3 kali 4 sama dengan 12.',
          add: [T('a', '3 baris × 4 petak = {g:12}', 200, 215, { size: 24 }), T('b', 'luas = 12 persegi satuan', 200, 255, { size: 18, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Bentuk berbeda, luas sama',
      steps: [
        {
          say: 'Bentuk L ini juga tersusun dari petak. Hitung: 8 petak. Bentuk yang berbeda bisa punya luas yang sama.',
          clear: true,
          add: [...cells('l', 3, 4, 70, 40, { skip: ['1,0', '2,0', '1,1', '2,1'], fill: 'ok-soft', stroke: 'ok' }), T('ll', '8 petak', 115, 180, { size: 16, c: 'ok' }), ...cells('r', 4, 2, 230, 70, { fill: 'neg-soft', stroke: 'neg' }), T('lr', '8 petak', 290, 180, { size: 16, c: 'neg' }), T('k', 'luasnya sama', 200, 230, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa luas persegi panjang ini?',
          clear: true,
          add: cells('a', 5, 3, 125, 60, { fill: 'acc-soft', stroke: 'acc' }),
          ask: {
            options: [
              { t: '15 persegi satuan', ok: true, why: '3 baris × 5 petak = 15.' },
              { t: '8 persegi satuan', why: '5 + 3 = 8 adalah jumlah sisi, bukan luas.' },
              { t: '16 persegi satuan', why: 'Itu keliling: 5 + 3 + 5 + 3. Luas menghitung petak di dalam.' },
            ],
          },
        },
        {
          say: '3 baris, setiap baris 5 petak. 3 kali 5 sama dengan 15.',
          add: [T('a', '3 × 5 = {g:15}', 200, 200, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa persegi satuan luas bangun ini?',
      fig: cells('f', 6, 2, 110, 120),
      ans: ['12'],
      wrong: { '8': '2 baris × 6 petak.', '16': 'Itu keliling. Hitung petak di dalam.' },
      steps: ['2 × 6.', '= 12.'],
    },
    {
      type: 'num',
      q: 'Lantai disusun 7 ubin per baris, sebanyak 4 baris. Banyak ubin …',
      ans: ['28'],
      wrong: { '11': 'Kalikan, bukan jumlahkan.' },
      steps: ['4 × 7.', '= 28 ubin.'],
    },
    {
      type: 'num',
      q: 'Berapa persegi satuan luas bentuk L ini?',
      fig: cells('f', 3, 3, 155, 105, { skip: ['1,0', '2,0'] }),
      ans: ['7'],
      wrong: { '9': 'Dua petak di kanan atas kosong.', '6': 'Hitung lagi semua petak.' },
      steps: ['9 petak dikurangi 2 yang kosong.', '= 7.'],
    },
    {
      q: 'Luas adalah …',
      options: [
        { t: 'banyak persegi satuan yang menutupi daerah', ok: true },
        { t: 'panjang garis tepi bangun', why: 'Itu keliling.' },
        { t: 'berat bangun', why: 'Berat bukan ukuran luas.' },
      ],
      steps: ['Luas mengukur daerah, dihitung dengan petak.'],
    },
    {
      type: 'num',
      q: 'Persegi berukuran 6 petak × 6 petak. Luasnya … persegi satuan.',
      ans: ['36'],
      wrong: { '12': '6 + 6 bukan luas. 6 × 6.', '24': 'Itu keliling.' },
      steps: ['6 × 6.', '= 36.'],
    },
  ],
};

// ---------- 4.2 Volume ----------
const BX = 120;
const BY = 210;

const l2 = {
  id: 'k4b4-2',
  title: 'Volume dengan Kubus Satuan',
  hook: 'Volume adalah banyak kubus satuan yang mengisi suatu ruang. Hitung satu lapisan, lalu kalikan dengan banyak lapisan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Balok ini tersusun dari kubus kecil: 3 kubus memanjang, 2 kubus ke belakang, dan 2 lapis ke atas. Berapa kubus semuanya?',
          add: blockOf('c', 3, 2, 2, BX, BY),
          ask: {
            options: [
              { t: '12', ok: true, why: 'Satu lapis 3 × 2 = 6 kubus. Dua lapis: 6 × 2 = 12.' },
              { t: '7', why: '3 + 2 + 2 menjumlah ukurannya, bukan menghitung kubus.' },
              { t: '6', why: '6 hanya satu lapisan. Ada 2 lapis.' },
              { t: '8', why: 'Ada kubus yang tersembunyi di belakang. Hitung per lapis.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Lapis demi lapis',
      steps: [
        {
          say: 'Lapisan bawah: 3 kubus memanjang, 2 baris ke belakang. 3 kali 2 sama dengan 6 kubus.',
          clear: true,
          add: [...blockOf('c', 3, 2, 2, BX, BY, 'acc', 1), T('a', 'lapis 1: 3 × 2 = 6', 300, 80, { size: 18 })],
        },
        {
          say: 'Tambah lapisan kedua, juga 6 kubus. Dua lapis: 6 kali 2 sama dengan 12 kubus.',
          add: blockOf('c', 3, 2, 2, BX, BY).slice(18),
        },
        {
          say: 'Volume balok ini 12 kubus satuan.',
          add: [T('b', '6 × 2 = {g:12}', 300, 125, { size: 24 }), T('c', 'volume = 12 kubus satuan', 200, 265, { size: 18, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Balok ini 4 kubus memanjang, 2 ke belakang, dan 3 lapis. Berapa volumenya?',
          clear: true,
          add: blockOf('c', 4, 2, 3, 90, 230, 'pos'),
          ask: {
            options: [
              { t: '24 kubus satuan', ok: true, why: 'Satu lapis 4 × 2 = 8. Tiga lapis: 8 × 3 = 24.' },
              { t: '9 kubus satuan', why: '4 + 2 + 3 bukan volume.' },
              { t: '8 kubus satuan', why: '8 hanya satu lapis.' },
            ],
          },
        },
        {
          say: 'Satu lapis 4 kali 2 sama dengan 8. Tiga lapis: 8 kali 3 sama dengan 24.',
          add: [T('a', '8 × 3 = {g:24}', 310, 70, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa kubus satuan balok ini?',
      fig: blockOf('f', 2, 2, 2, 150, 220),
      ans: ['8'],
      wrong: { '6': 'Ada kubus tersembunyi. Satu lapis 2 × 2 = 4, dua lapis = 8.', '4': '4 hanya satu lapis.' },
      steps: ['Satu lapis 2 × 2 = 4.', 'Dua lapis: 8.'],
    },
    {
      type: 'num',
      q: 'Satu lapis kotak berisi 5 × 3 kubus. Ada 2 lapis. Volumenya … kubus satuan.',
      ans: ['30'],
      wrong: { '15': '15 hanya satu lapis.', '10': '5 × 3 = 15 per lapis.' },
      steps: ['5 × 3 = 15.', '15 × 2 = 30.'],
    },
    {
      q: 'Volume adalah …',
      options: [
        { t: 'banyak kubus satuan yang mengisi ruang', ok: true },
        { t: 'banyak persegi satuan yang menutupi daerah', why: 'Itu luas.' },
        { t: 'panjang tepi bangun', why: 'Itu keliling.' },
      ],
      steps: ['Volume mengukur ruang dengan kubus.'],
    },
    {
      type: 'num',
      q: 'Kubus besar tersusun 3 × 3 × 3 kubus kecil. Banyak kubus kecil …',
      ans: ['27'],
      wrong: { '9': '9 hanya satu lapis.', '18': '9 × 3 = 27.' },
      steps: ['3 × 3 = 9 per lapis.', '9 × 3 = 27.'],
    },
    {
      type: 'num',
      q: 'Kardus diisi kotak susu: 6 kotak memanjang, 2 ke belakang, 1 lapis. Banyak kotak susu …',
      ans: ['12'],
      wrong: { '8': 'Kalikan: 6 × 2.' },
      steps: ['6 × 2 × 1.', '= 12.'],
    },
  ],
};

export default {
  id: 'k4b4',
  no: 4,
  title: 'Pengukuran Luas dan Volume',
  desc: 'Luas dengan persegi satuan, bentuk berbeda dengan luas sama, serta volume dengan kubus satuan lapis demi lapis.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Persegi panjang 8 petak × 3 baris luasnya … persegi satuan.',
      ans: ['24'],
      wrong: { '11': 'Kalikan, bukan jumlahkan.', '22': 'Itu keliling.' },
      steps: ['8 × 3 = 24.'],
    },
    {
      type: 'num',
      q: 'Balok 2 × 3 × 4 kubus satuan volumenya …',
      ans: ['24'],
      wrong: { '9': 'Kalikan ketiganya.' },
      steps: ['2 × 3 = 6, 6 × 4 = 24.'],
    },
    {
      q: 'Dua bangun berbeda bentuk bisa punya luas yang sama. Pernyataan ini …',
      options: [
        { t: 'benar', ok: true },
        { t: 'salah', why: '4 × 3 dan 6 × 2 sama-sama 12 petak.' },
      ],
      steps: ['Contoh: 4 × 3 = 6 × 2 = 12.'],
    },
  ],
};
