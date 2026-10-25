// Kelas 3 · Bab 3: Pengukuran Panjang dan Berat
import { T, box, table } from '../helpers.js';

const PX = 30; // piksel per cm
const RX0 = 50; // posisi 0 cm
// Penggaris 0–n cm
function ruler(p, y, n = 11) {
  let d = `M${RX0 - 8},${y} h${n * PX + 16} v34 h${-(n * PX + 16)} Z`;
  for (let k = 0; k <= n * 2; k++) {
    const x = RX0 + (k * PX) / 2;
    d += ` M${x},${y} v${k % 2 ? 7 : 13}`;
  }
  const els = [{ id: `${p}r`, t: 'path', x: 0, y: 0, d, fill: 'acc-soft', stroke: 'ink', sw: 1.5, z: -1 }];
  for (let k = 0; k <= n; k++) els.push(T(`${p}n${k}`, String(k), RX0 + k * PX, y + 24, { size: 11, c: 'ink' }));
  return els;
}
// Pensil dari a cm ke b cm di atas penggaris
const pencil = (id, a, b, y, c = 'pos') => {
  const x0 = RX0 + a * PX;
  const len = (b - a) * PX;
  return { id, t: 'poly', x: 0, y: 0, pts: [[x0, y - 9], [x0 + len - 18, y - 9], [x0 + len, y], [x0 + len - 18, y + 9], [x0, y + 9]], fill: `${c}-soft`, stroke: c, sw: 2.5 };
};

// ---------- 3.1 Mengukur dengan penggaris ----------
const l1 = {
  id: 'k3b3-1',
  title: 'Mengukur dengan Penggaris',
  hook: 'Satuan baku membuat hasil ukur semua orang sama. Penggaris memakai sentimeter (cm). Ujung benda harus mulai dari angka 0.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pensil ini diletakkan di atas penggaris, mulai dari angka 2 sampai angka 8. Berapa panjangnya?',
          add: [...ruler('r', 110), pencil('p', 2, 8, 90)],
          ask: {
            options: [
              { t: '6 cm', ok: true, why: 'Pensil tidak mulai dari 0. Hitung jaraknya: 8 − 2 = 6 cm.' },
              { t: '8 cm', why: '8 adalah ujung kanan. Ujung kirinya di 2, bukan 0.' },
              { t: '10 cm', why: 'Pensil berakhir di 8, dan dimulai dari 2.' },
              { t: '2 cm', why: '2 adalah tempat pensil dimulai.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mulai dari nol',
      steps: [
        {
          say: 'Letakkan ujung pensil tepat di angka 0. Lihat angka di ujung lainnya: 7. Panjang pensil 7 sentimeter.',
          clear: true,
          add: [...ruler('r', 110), pencil('p', 0, 7, 90), T('a', 'panjang = {g:7 cm}', 200, 200, { size: 28 })],
        },
        {
          say: 'Satu sentimeter adalah jarak dari satu angka ke angka berikutnya. Garis pendek di tengah menunjukkan setengah sentimeter.',
          add: [T('b', '1 cm = jarak 0 ke 1', 200, 245, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Kalau tidak mulai dari nol',
      steps: [
        {
          say: 'Kalau ujung pensil di angka 2, kurangi: ujung kanan dikurangi ujung kiri. 8 kurang 2 sama dengan 6 sentimeter.',
          clear: true,
          add: [...ruler('r', 110), pencil('p', 2, 8, 90), T('a', '8 − 2 = {g:6 cm}', 200, 200, { size: 28 })],
        },
        {
          say: 'Cek dengan menggeser pensil ke angka 0. Ujung kanannya di angka 6. Hasilnya sama.',
          set: { p: { x: -2 * PX } },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Pita ini dari angka 3 sampai 10. Berapa panjangnya?',
          clear: true,
          add: [...ruler('r', 110), box('pt', RX0 + 6.5 * PX, 90, 7 * PX, 16, { r: 3, fill: 'neg-soft', stroke: 'neg', sw: 2 })],
          ask: {
            options: [
              { t: '7 cm', ok: true, why: '10 − 3 = 7 cm.' },
              { t: '10 cm', why: 'Pita dimulai dari 3, bukan 0.' },
              { t: '13 cm', why: 'Ujung kanan dikurangi ujung kiri: 10 − 3.' },
            ],
          },
        },
        {
          say: '10 kurang 3 sama dengan 7. Panjang pita 7 sentimeter.',
          add: [T('a', '10 − 3 = {g:7 cm}', 200, 200, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa sentimeter panjang pensil ini?',
      fig: [...ruler('f', 170), pencil('p', 0, 9, 150)],
      ans: ['9', '9 cm'],
      wrong: { '10': 'Ujung kanan pensil ada di angka 9.' },
      steps: ['Mulai dari 0, berakhir di 9.', '9 cm.'],
    },
    {
      type: 'num',
      q: 'Berapa sentimeter panjang pensil ini?',
      fig: [...ruler('f', 170), pencil('p', 4, 9, 150)],
      ans: ['5', '5 cm'],
      wrong: { '9': 'Pensil mulai dari 4, bukan 0.', '13': 'Kurangi: 9 − 4.' },
      steps: ['9 − 4.', '= 5 cm.'],
    },
    {
      q: 'Mengapa kita memakai satuan baku seperti sentimeter?',
      options: [
        { t: 'supaya hasil ukur semua orang sama', ok: true },
        { t: 'supaya bendanya lebih panjang', why: 'Satuan tidak mengubah panjang benda.' },
        { t: 'supaya tidak perlu menghitung', why: 'Kita tetap membaca angka pada penggaris.' },
      ],
      steps: ['Jengkal setiap orang berbeda.', 'Sentimeter sama untuk semua.'],
    },
    {
      type: 'num',
      q: 'Pita merah 12 cm, pita biru 8 cm. Pita merah lebih panjang … cm.',
      ans: ['4'],
      wrong: { '20': 'Selisih memakai pengurangan.' },
      steps: ['12 − 8.', '= 4 cm.'],
    },
    {
      type: 'num',
      q: 'Ujung kiri benda di angka 1, ujung kanan di angka 7. Panjangnya … cm.',
      ans: ['6'],
      wrong: { '7': 'Benda mulai dari 1, bukan 0.', '8': 'Kurangi: 7 − 1.' },
      steps: ['7 − 1.', '= 6 cm.'],
    },
  ],
};

// ---------- 3.2 Meter dan sentimeter ----------
const l2 = {
  id: 'k3b3-2',
  title: 'Meter dan Sentimeter',
  hook: 'Benda panjang diukur dengan meter (m). 1 meter sama dengan 100 sentimeter.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tinggi pintu kira-kira 2 meter. Berapa sentimeter itu?',
          add: [T('q', '2 m = … cm', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '200 cm', ok: true, why: '1 m = 100 cm, jadi 2 m = 200 cm.' },
              { t: '20 cm', why: '20 cm hanya sepanjang pensil. 1 m = 100 cm.' },
              { t: '2 cm', why: 'Meter jauh lebih panjang dari sentimeter.' },
              { t: '102 cm', why: '2 meter berarti 100 cm dua kali.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Satu meter',
      steps: [
        {
          say: 'Bayangkan 100 penggaris kecil sepanjang 1 sentimeter disambung. Panjangnya 1 meter. Kira-kira selebar pintu kelas.',
          clear: true,
          add: [box('m', 200, 100, 300, 24, { r: 3, fill: 'ok-soft', stroke: 'ok', sw: 2 }), ...Array.from({ length: 11 }, (_, i) => T(`t${i}`, String(i * 10), 50 + i * 30, 130, { size: 10, c: 'mut' })), T('a', '1 m = 100 cm', 200, 180, { size: 32, c: 'ok' })],
        },
        {
          say: 'Jadi 2 meter sama dengan 200 sentimeter, dan 3 meter sama dengan 300 sentimeter.',
          add: [T('b', '2 m = 200 cm     3 m = 300 cm', 200, 235, { size: 20 })],
        },
      ],
    },
    {
      title: 'Meter dan sentimeter bersama',
      steps: [
        {
          say: 'Tinggi Budi 1 meter 35 sentimeter. Berapa sentimeter seluruhnya? 1 meter adalah 100 sentimeter, ditambah 35, jadi 135 sentimeter.',
          clear: true,
          add: [T('a', '1 m 35 cm', 200, 70, { size: 34, c: 'pos' }), T('b', '= 100 cm + 35 cm', 200, 125, { size: 26 }), T('c', '= {g:135 cm}', 200, 175, { size: 30 })],
        },
        {
          say: 'Sebaliknya, 250 sentimeter adalah 2 meter 50 sentimeter.',
          add: [T('d', '250 cm = 2 m 50 cm', 200, 240, { size: 22, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 3 meter 20 sentimeter sama dengan berapa sentimeter?',
          clear: true,
          add: [T('q', '3 m 20 cm = … cm', 200, 110, { size: 36, c: 'pos' })],
          ask: {
            options: [
              { t: '320 cm', ok: true, why: '3 m = 300 cm, ditambah 20 cm: 320 cm.' },
              { t: '23 cm', why: '3 meter adalah 300 cm, bukan 3 cm.' },
              { t: '50 cm', why: 'Meter dan sentimeter tidak boleh dijumlah langsung.' },
              { t: '3020 cm', why: '300 + 20 = 320.' },
            ],
          },
        },
        {
          say: '3 meter sama dengan 300 sentimeter. Ditambah 20, jadi 320 sentimeter.',
          add: [T('a', '300 + 20 = {g:320 cm}', 200, 190, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '4 m = … cm',
      ans: ['400'],
      wrong: { '40': '1 m = 100 cm.', '4': 'Ubah ke sentimeter: 4 × 100.' },
      steps: ['4 × 100.', '= 400 cm.'],
    },
    {
      type: 'num',
      q: '1 m 60 cm = … cm',
      ans: ['160'],
      wrong: { '61': '1 m = 100 cm, bukan 1 cm.', '70': 'Ubah meter ke sentimeter dulu.' },
      steps: ['100 + 60.', '= 160 cm.'],
    },
    {
      type: 'num',
      q: '500 cm = … m',
      ans: ['5'],
      wrong: { '50': '100 cm = 1 m. 500 cm = 5 m.' },
      steps: ['500 : 100.', '= 5 m.'],
    },
    {
      q: 'Satuan yang cocok untuk mengukur panjang lapangan sepak bola adalah …',
      options: [
        { t: 'meter', ok: true },
        { t: 'sentimeter', why: 'Lapangan terlalu panjang, angkanya akan sangat besar.' },
        { t: 'kilogram', why: 'Kilogram adalah satuan berat.' },
      ],
      steps: ['Benda panjang → meter.'],
    },
    {
      type: 'num',
      q: 'Tali 2 m dipotong 50 cm. Sisa tali … cm.',
      ans: ['150'],
      wrong: { '250': 'Dipotong berarti berkurang.', '48': '2 m = 200 cm dulu, lalu 200 − 50.' },
      steps: ['2 m = 200 cm.', '200 − 50 = 150 cm.'],
    },
  ],
};

// ---------- 3.3 Kilogram dan gram ----------
const l3 = {
  id: 'k3b3-3',
  title: 'Kilogram dan Gram',
  hook: 'Berat diukur dengan kilogram (kg) dan gram (g). 1 kilogram sama dengan 1.000 gram.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sekantong beras beratnya 1 kilogram. Berapa gram itu?',
          add: [T('q', '1 kg = … g', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '1.000 g', ok: true, why: 'Kilo berarti seribu. 1 kg = 1.000 g.' },
              { t: '100 g', why: '100 cm = 1 m, tetapi 1 kg = 1.000 g.' },
              { t: '10 g', why: 'Gram jauh lebih ringan. 1 kg = 1.000 g.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Benda berat dan ringan',
      steps: [
        {
          say: 'Benda berat diukur dengan kilogram, misalnya beras, semangka, atau badanmu. Benda ringan diukur dengan gram, misalnya permen atau pensil.',
          clear: true,
          add: [table('tb', 200, 110, [['kilogram (kg)', 'gram (g)'], ['beras', 'permen'], ['semangka', 'pensil'], ['badanmu', 'kertas']], { cw: [140, 140], rh: 32, size: 16, head: true })],
        },
        {
          say: 'Kilo berarti seribu. Jadi 1 kilogram sama dengan 1.000 gram.',
          add: [T('a', '1 kg = 1.000 g', 200, 235, { size: 32, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Mengubah satuan',
      steps: [
        {
          say: '2 kilogram sama dengan 2.000 gram. 1 kilogram 500 gram sama dengan 1.000 tambah 500, yaitu 1.500 gram.',
          clear: true,
          add: [T('a', '2 kg = 2.000 g', 200, 70, { size: 28 }), T('b', '1 kg 500 g = 1.000 g + 500 g', 200, 130, { size: 22 }), T('c', '= {g:1.500 g}', 200, 170, { size: 28 })],
        },
        {
          say: 'Setengah kilogram sama dengan 500 gram.',
          add: [T('d', '½ kg = 500 g', 200, 235, { size: 24, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 3 kilogram 250 gram sama dengan berapa gram?',
          clear: true,
          add: [T('q', '3 kg 250 g = … g', 200, 110, { size: 36, c: 'pos' })],
          ask: {
            options: [
              { t: '3.250 g', ok: true, why: '3 kg = 3.000 g, ditambah 250 g: 3.250 g.' },
              { t: '253 g', why: '3 kg adalah 3.000 g, bukan 3 g.' },
              { t: '550 g', why: '3 kg = 3.000 g.' },
            ],
          },
        },
        {
          say: '3 kilogram sama dengan 3.000 gram. Ditambah 250, jadi 3.250 gram.',
          add: [T('a', '3.000 + 250 = {g:3.250 g}', 200, 190, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '5 kg = … g',
      ans: ['5000'],
      wrong: { '500': '1 kg = 1.000 g, bukan 100 g.', '50': '1 kg = 1.000 g.' },
      steps: ['5 × 1.000.', '= 5.000 g.'],
    },
    {
      type: 'num',
      q: '2 kg 300 g = … g',
      ans: ['2300'],
      wrong: { '302': '2 kg = 2.000 g.', '500': 'Ubah kg ke gram dulu.' },
      steps: ['2.000 + 300.', '= 2.300 g.'],
    },
    {
      q: 'Satuan yang cocok untuk menimbang sebutir telur adalah …',
      options: [
        { t: 'gram', ok: true },
        { t: 'kilogram', why: 'Telur terlalu ringan untuk diukur dengan kilogram.' },
        { t: 'meter', why: 'Meter adalah satuan panjang.' },
      ],
      steps: ['Benda ringan → gram.'],
    },
    {
      type: 'num',
      q: '4.000 g = … kg',
      ans: ['4'],
      wrong: { '40': '1.000 g = 1 kg.', '400': '1.000 g = 1 kg.' },
      steps: ['4.000 : 1.000.', '= 4 kg.'],
    },
    {
      type: 'num',
      q: 'Ibu membeli 1 kg gula, lalu memakai 400 g. Sisa gula … g.',
      ans: ['600'],
      wrong: { '1400': 'Memakai berarti berkurang.', '400': '400 g adalah gula yang dipakai.' },
      steps: ['1 kg = 1.000 g.', '1.000 − 400 = 600 g.'],
    },
  ],
};

export default {
  id: 'k3b3',
  no: 3,
  title: 'Pengukuran Panjang dan Berat',
  desc: 'Mengukur panjang dengan penggaris (cm), hubungan meter dan sentimeter, serta kilogram dan gram.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: '3 m 5 cm = … cm',
      ans: ['305'],
      wrong: { '35': '3 m = 300 cm. Ditambah 5 cm: 305 cm.', '350': '5 cm, bukan 50 cm.' },
      steps: ['300 + 5.', '= 305 cm.'],
    },
    {
      type: 'num',
      q: '1 kg 50 g = … g',
      ans: ['1050'],
      wrong: { '1500': '50 g, bukan 500 g.', '51': '1 kg = 1.000 g.' },
      steps: ['1.000 + 50.', '= 1.050 g.'],
    },
    {
      type: 'num',
      q: 'Benda dari angka 5 sampai 11 pada penggaris panjangnya … cm.',
      ans: ['6'],
      wrong: { '11': 'Benda mulai dari 5, bukan 0.', '16': 'Kurangi: 11 − 5.' },
      steps: ['11 − 5 = 6 cm.'],
    },
  ],
};
