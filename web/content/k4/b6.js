// Kelas 4 · Bab 6: Piktogram dan Diagram Batang
import { T } from '../helpers.js';

// Simbol piktogram: lingkaran penuh = 2, setengah lingkaran = 1
const R = 13;
const full = (id, x, y) => ({ id, t: 'circle', x, y, r: R, fill: 'acc', stroke: 'ink', sw: 1.5 });
const half = (id, x, y) => ({ id, t: 'path', x: 0, y: 0, d: `M${x},${y - R} A${R},${R} 0 0 0 ${x},${y + R} Z`, fill: 'acc', stroke: 'ink', sw: 1.5 });
function picto(p, rows, { x0 = 140, y0 = 60, dy = 44, dx = 32 } = {}) {
  const els = [];
  rows.forEach(([lab, v], r) => {
    const y = y0 + r * dy;
    els.push(T(`${p}l${r}`, lab, x0 - 75, y, { size: 15 }));
    for (let i = 0; i < Math.floor(v / 2); i++) els.push(full(`${p}${r}_${i}`, x0 + i * dx, y));
    if (v % 2) els.push(half(`${p}${r}_h`, x0 + Math.floor(v / 2) * dx, y));
  });
  return els;
}
const key = (p, x, y) => [full(`${p}k`, x, y), T(`${p}kt`, '= 2 orang', x + 50, y, { size: 14 })];
const BUAH = [['apel', 8], ['jeruk', 5], ['mangga', 10], ['pisang', 3]];
const COLS = ['neg', 'acc', 'ok', 'pos'];
const bars = (id, data, o = {}) => ({ id, t: 'bars', x: 215, y: 140, w: 290, h: 180, max: 30, tick: 5, vals: true, data: data.map(([l, v], i) => ({ l, v, c: COLS[i % 4] })), ...o });
const HARI = [['Senin', 15], ['Selasa', 25], ['Rabu', 10], ['Kamis', 20]];

// ---------- 6.1 Piktogram ----------
const l1 = {
  id: 'k4b6-1',
  title: 'Piktogram',
  hook: 'Pada piktogram, satu gambar bisa mewakili lebih dari satu. Bacalah keterangannya dulu, misalnya satu lingkaran = 2 orang.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini piktogram buah kesukaan. Satu lingkaran mewakili 2 orang. Berapa orang yang suka mangga?',
          add: [...picto('p', BUAH), ...key('k', 280, 245)],
          ask: {
            options: [
              { t: '10', ok: true, why: 'Ada 5 lingkaran pada baris mangga. 5 × 2 = 10.' },
              { t: '5', why: '5 adalah banyak lingkaran. Setiap lingkaran mewakili 2 orang.' },
              { t: '7', why: 'Kalikan banyak lingkaran dengan 2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membaca keterangan',
      steps: [
        {
          say: 'Keterangan menyebutkan: satu lingkaran sama dengan 2 orang. Jadi hitung lingkarannya, lalu kalikan 2.',
          clear: true,
          add: [...picto('p', BUAH), ...key('k', 280, 245)],
          hl: ['kk'],
        },
        {
          say: 'Apel: 4 lingkaran, jadi 8 orang. Mangga: 5 lingkaran, jadi 10 orang.',
          add: [T('va', '8', 370, 60, { size: 18, c: 'ok' }), T('vm', '10', 370, 148, { size: 18, c: 'ok' })],
        },
        {
          say: 'Setengah lingkaran berarti 1 orang. Jeruk: 2 lingkaran dan setengah, jadi 4 tambah 1, sama dengan 5 orang.',
          add: [T('vj', '5', 370, 104, { size: 18, c: 'ok' }), T('vp', '3', 370, 192, { size: 18, c: 'ok' }), T('h', '½ lingkaran = 1 orang', 120, 245, { size: 14, c: 'mut' })],
          hl: ['p1_h'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa orang yang suka pisang?',
          clear: true,
          add: [...picto('p', BUAH), ...key('k', 280, 245)],
          ask: {
            options: [
              { t: '3', ok: true, why: '1 lingkaran = 2, setengah = 1. 2 + 1 = 3.' },
              { t: '2', why: 'Setengah lingkaran juga dihitung: 1 orang.' },
              { t: '1,5', why: 'Satu lingkaran mewakili 2 orang, bukan 1.' },
            ],
          },
        },
        {
          say: 'Satu lingkaran penuh, 2 orang. Setengah lingkaran, 1 orang. Jadi 3 orang.',
          add: [T('a', '2 + 1 = {g:3}', 345, 192, { size: 18 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa orang yang suka apel?',
      fig: [...picto('f', BUAH, { y0: 80 }), ...key('k', 280, 265)],
      ans: ['8'],
      wrong: { '4': 'Setiap lingkaran = 2 orang.' },
      steps: ['4 lingkaran × 2.', '= 8.'],
    },
    {
      type: 'num',
      q: 'Berapa orang semuanya?',
      fig: [...picto('f', BUAH, { y0: 80 }), ...key('k', 280, 265)],
      ans: ['26'],
      wrong: { '13': 'Setiap lingkaran = 2 orang.', '25': '8 + 5 + 10 + 3 = 26.' },
      steps: ['8 + 5 + 10 + 3.', '= 26.'],
    },
    {
      type: 'num',
      q: 'Mangga lebih banyak berapa orang dari jeruk?',
      fig: [...picto('f', BUAH, { y0: 80 }), ...key('k', 280, 265)],
      ans: ['5'],
      wrong: { '15': 'Selisih memakai pengurangan.' },
      steps: ['10 − 5.', '= 5.'],
    },
    {
      type: 'num',
      q: 'Satu gambar mewakili 5 buku. Ada 6 gambar. Banyak buku …',
      ans: ['30'],
      wrong: { '11': 'Kalikan: 6 × 5.', '6': '6 adalah banyak gambar.' },
      steps: ['6 × 5.', '= 30 buku.'],
    },
    {
      type: 'num',
      q: 'Satu gambar mewakili 4 anak. 20 anak digambar dengan … gambar.',
      ans: ['5'],
      wrong: { '80': 'Bagi, bukan kali: 20 : 4.', '20': '20 adalah banyak anak.' },
      steps: ['20 : 4.', '= 5 gambar.'],
    },
  ],
};

// ---------- 6.2 Diagram batang ----------
const l2 = {
  id: 'k4b6-2',
  title: 'Diagram Batang dengan Skala',
  hook: 'Pada diagram batang, angka di sumbu tegak bisa naik 5-5 atau 10-10. Baca ujung batang dengan teliti, termasuk yang berada di antara garis.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Diagram ini mencatat pengunjung perpustakaan. Garis-garisnya naik 5. Hari apa paling banyak pengunjung?',
          add: [bars('g', HARI, { vals: false })],
          ask: {
            options: [
              { t: 'Selasa', ok: true, why: 'Batang Selasa paling tinggi, sampai 25.' },
              { t: 'Kamis', why: 'Kamis 20, Selasa 25.' },
              { t: 'Senin', why: 'Senin 15.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membaca skala',
      steps: [
        {
          say: 'Lihat angka di kiri: 0, 5, 10, 15, sampai 30. Setiap garis naik 5.',
          clear: true,
          add: [bars('g', HARI, { vals: false })],
        },
        {
          say: 'Ujung batang Senin sejajar garis 15. Selasa 25, Rabu 10, Kamis 20.',
          set: { g: bars('g', HARI) },
        },
        {
          say: 'Selasa lebih banyak 15 pengunjung dari Rabu, karena 25 kurang 10 sama dengan 15.',
          add: [T('k', '25 − 10 = 15', 210, 270, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Batang di antara garis',
      steps: [
        {
          say: 'Kadang ujung batang ada di antara dua garis. Batang A berada di antara garis 10 dan 15, sedikit di bawah tengahnya, yaitu 12. Supaya tidak salah baca, angkanya biasanya ditulis di atas batang.',
          clear: true,
          add: [bars('g', [['A', 12], ['B', 18], ['C', 27]])],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa pengunjung pada hari Senin dan Kamis seluruhnya?',
          clear: true,
          add: [bars('g', HARI)],
          ask: {
            options: [
              { t: '35', ok: true, why: 'Senin 15 + Kamis 20 = 35.' },
              { t: '5', why: 'Itu selisihnya.' },
              { t: '70', why: 'Jumlahkan hanya Senin dan Kamis.' },
            ],
          },
        },
        {
          say: 'Senin 15, Kamis 20. 15 tambah 20 sama dengan 35.',
          add: [T('a', '15 + 20 = {g:35}', 210, 270, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa pengunjung hari Rabu?',
      fig: [bars('f', HARI)],
      ans: ['10'],
      wrong: { '2': 'Baca angka di sumbu, bukan banyak garis.' },
      steps: ['Batang Rabu sampai 10.'],
    },
    {
      type: 'num',
      q: 'Berapa pengunjung selama 4 hari?',
      fig: [bars('f', HARI)],
      ans: ['70'],
      wrong: { '60': '15 + 25 + 10 + 20 = 70.' },
      steps: ['15 + 25 + 10 + 20.', '= 70.'],
    },
    {
      type: 'num',
      q: 'Kamis lebih banyak berapa pengunjung dari Senin?',
      fig: [bars('f', HARI)],
      ans: ['5'],
      wrong: { '35': 'Selisih memakai pengurangan.' },
      steps: ['20 − 15.', '= 5.'],
    },
    {
      q: 'Hari dengan pengunjung paling sedikit adalah …',
      fig: [bars('f', HARI)],
      options: [
        { t: 'Rabu', ok: true },
        { t: 'Senin', why: 'Senin 15, Rabu 10.' },
        { t: 'Selasa', why: 'Selasa paling banyak.' },
      ],
      steps: ['Batang terpendek: Rabu.'],
    },
    {
      q: 'Pada diagram batang, sumbu tegak naik 5-5. Garis keempat dari bawah (tanpa 0) menunjukkan …',
      options: [
        { t: '20', ok: true },
        { t: '4', why: 'Setiap garis bernilai 5: 5, 10, 15, 20.' },
        { t: '25', why: 'Garis kelima yang menunjukkan 25.' },
      ],
      steps: ['5, 10, 15, 20.'],
    },
  ],
};

export default {
  id: 'k4b6',
  no: 6,
  title: 'Piktogram dan Diagram Batang',
  desc: 'Piktogram dengan satu gambar mewakili beberapa dan setengah gambar, serta diagram batang dengan skala 5-5.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Satu gambar mewakili 10 kg. Ada 3 gambar dan setengah gambar. Beratnya … kg.',
      ans: ['35'],
      wrong: { '30': 'Setengah gambar = 5 kg.', '3.5': 'Setiap gambar = 10 kg.' },
      steps: ['3 × 10 + 5.', '= 35 kg.'],
    },
    {
      type: 'num',
      q: 'Berapa pengunjung hari Selasa?',
      fig: [bars('f', HARI)],
      ans: ['25'],
      wrong: { '5': 'Baca angka di sumbu.' },
      steps: ['Batang Selasa sampai 25.'],
    },
    {
      type: 'num',
      q: 'Satu gambar mewakili 2 orang. 7 orang digambar dengan berapa gambar? (setengah gambar ditulis 0,5)',
      ans: ['3.5', '3,5', '7/2'],
      wrong: { '14': 'Bagi, bukan kali: 7 : 2.', '3': 'Masih ada sisa 1 orang: setengah gambar.' },
      steps: ['7 : 2 = 3 sisa 1.', '3 gambar dan setengah gambar = 3,5.'],
    },
  ],
};
