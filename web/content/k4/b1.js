// Kelas 4 · Bab 1: Bilangan Cacah sampai 10.000
import { T, box, table, ln } from '../helpers.js';

const PLACES = ['ribuan', 'ratusan', 'puluhan', 'satuan'];
const PC = ['neg', 'ok', 'pos', 'acc'];
const PX = [110, 170, 230, 290];
// Kartu angka dengan warna per tempat
const digits = (p, str, y, o = {}) => [...str].map((d, i) => box(`${p}${i}`, PX[i], y, 50, 58, { r: 8, fill: `${PC[i]}-soft`, stroke: PC[i], sw: 2.5, label: d, lsize: 30, ...o }));
const heads = (y) => PLACES.map((n, i) => T(`h${i}`, n, PX[i], y, { size: 12, c: PC[i] }));
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// ---------- 1.1 Ribuan ----------
const l1 = {
  id: 'k4b1-1',
  title: 'Ribuan dan Nilai Tempat',
  hook: 'Sepuluh ratusan menjadi seribu. Pada 3.245, angka 3 bernilai 3.000 karena berada di tempat ribuan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa nilai angka 3 pada bilangan 3.245?',
          add: [...heads(55), ...digits('d', '3245', 100)],
          ask: {
            options: [
              { t: '3.000', ok: true, why: 'Angka 3 ada di tempat ribuan, jadi nilainya 3 × 1.000 = 3.000.' },
              { t: '3', why: '3 hanya angkanya. Nilainya tergantung tempatnya.' },
              { t: '300', why: '300 untuk tempat ratusan. Angka 3 di tempat ribuan.' },
              { t: '30', why: '30 untuk tempat puluhan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Seribu',
      steps: [
        {
          say: 'Ingat: 10 satuan menjadi 1 puluhan, 10 puluhan menjadi 1 ratusan. Begitu juga, 10 ratusan menjadi 1 ribuan, ditulis 1.000.',
          clear: true,
          add: [T('a', '10 satuan = 1 puluhan = 10', 200, 60, { size: 18, c: 'acc' }), T('b', '10 puluhan = 1 ratusan = 100', 200, 100, { size: 18, c: 'pos' }), T('c', '10 ratusan = 1 ribuan = 1.000', 200, 140, { size: 20, c: 'neg' })],
        },
        {
          say: 'Titik pada 1.000 memisahkan tiga angka dari belakang, supaya bilangan besar mudah dibaca.',
          add: [T('d', '1.000   seribu', 200, 210, { size: 30 })],
        },
      ],
    },
    {
      title: 'Bentuk panjang',
      steps: [
        {
          say: 'Bilangan 3.245 punya 4 tempat: ribuan, ratusan, puluhan, satuan.',
          clear: true,
          add: [...heads(45), ...digits('d', '3245', 90)],
        },
        {
          say: 'Nilai setiap angka: 3.000, 200, 40, dan 5. Dijumlahkan menjadi 3.245. Ini disebut bentuk panjang.',
          add: [table('tb', 200, 165, [['3.000', '200', '40', '5']], { cw: [60, 60, 60, 60], rh: 30, size: 16 }), T('a', '3.245 = 3.000 + 200 + 40 + 5', 200, 215, { size: 20, c: 'ok' })],
        },
        {
          say: 'Dibaca tiga ribu dua ratus empat puluh lima.',
          add: [T('b', 'tiga ribu dua ratus empat puluh lima', 200, 255, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Lima ribu tujuh puluh dua ditulis bagaimana?',
          clear: true,
          add: [T('q', 'lima ribu tujuh puluh dua', 200, 100, { size: 26, c: 'pos' })],
          ask: {
            options: [
              { t: '5.072', ok: true, why: '5 ribuan, 0 ratusan, 7 puluhan, 2 satuan.' },
              { t: '572', why: 'Ada ribuan, jadi harus 4 angka. Ratusannya 0.' },
              { t: '5.720', why: 'Tujuh puluh di tempat puluhan, bukan ratusan.' },
              { t: '50.072', why: 'Lima ribu ditulis 5.000, bukan 50.000.' },
            ],
          },
        },
        {
          say: 'Tidak ada ratusan, jadi tempat ratusan diisi 0.',
          add: [...heads(150), ...digits('d', '5072', 195)],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai angka 6 pada bilangan 6.418 adalah …',
      ans: ['6000', '6.000'],
      wrong: { '6': 'Angka 6 ada di tempat ribuan.', '600': '600 untuk tempat ratusan.' },
      steps: ['6 di tempat ribuan.', 'Nilainya 6.000.'],
    },
    {
      type: 'num',
      q: '4.000 + 300 + 7 = …',
      ans: ['4307', '4.307'],
      wrong: { '437': 'Tempat puluhan diisi 0: 4.307.', '4370': '7 adalah satuan, bukan puluhan.' },
      steps: ['4 ribuan, 3 ratusan, 0 puluhan, 7 satuan.', '= 4.307.'],
    },
    {
      type: 'num',
      q: 'Dua ribu lima ratus ditulis …',
      ans: ['2500', '2.500'],
      wrong: { '25': 'Dua ribu = 2.000, ditambah 500.', '2005': 'Lima ratus = 500, di tempat ratusan.' },
      steps: ['2.000 + 500.', '= 2.500.'],
    },
    {
      type: 'num',
      q: 'Nilai angka 9 pada bilangan 7.890 adalah …',
      ans: ['90'],
      wrong: { '9': 'Angka 9 di tempat puluhan: 90.', '900': '900 untuk tempat ratusan.' },
      steps: ['7.890 = 7.000 + 800 + 90 + 0.', 'Nilai angka 9 = 90.'],
    },
    {
      type: 'num',
      q: '10 ratusan sama dengan …',
      ans: ['1000', '1.000'],
      wrong: { '100': '1 ratusan = 100. 10 ratusan = 1.000.' },
      steps: ['10 × 100.', '= 1.000.'],
    },
  ],
};

// ---------- 1.2 Membandingkan dan membulatkan ----------
const NX = (v) => 40 + ((v - 3000) / 1000) * 320; // garis bilangan 3.000–4.000
const nl = () => [ln('nl', 40, 140, 360, 140, { sw: 3, c: 'ink', draw: false }), ...Array.from({ length: 11 }, (_, i) => [ln(`tk${i}`, NX(3000 + i * 100), 132, NX(3000 + i * 100), 148, { sw: 2, c: 'ink', draw: false }), ...(i % 5 === 0 ? [T(`tl${i}`, fmt(3000 + i * 100), NX(3000 + i * 100), 165, { size: 12 })] : [])]).flat()];

const l2 = {
  id: 'k4b1-2',
  title: 'Membandingkan dan Membulatkan',
  hook: 'Bandingkan dari tempat terbesar. Untuk membulatkan, lihat bilangan itu lebih dekat ke ratusan atau ribuan yang mana.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bilangan 3.700 lebih dekat ke 3.000 atau ke 4.000?',
          add: [...nl(), { id: 'p', t: 'circle', x: NX(3700), y: 140, r: 7, fill: 'neg', stroke: 'ink', sw: 1.5 }, T('pl', '3.700', NX(3700), 115, { size: 16, c: 'neg' })],
          ask: {
            options: [
              { t: '4.000', ok: true, why: '3.700 hanya 300 dari 4.000, tetapi 700 dari 3.000.' },
              { t: '3.000', why: 'Angka depannya memang 3, tetapi jaraknya ke 4.000 lebih pendek.' },
              { t: 'sama dekat', why: 'Yang sama dekat adalah 3.500.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membandingkan',
      steps: [
        {
          say: 'Bandingkan 4.582 dan 4.528. Ribuan sama, ratusan sama. Puluhan 8 lebih besar dari 2. Jadi 4.582 lebih besar.',
          clear: true,
          add: [...heads(40), ...digits('a', '4582', 85), ...digits('b', '4528', 155), T('k', '4.582 > 4.528', 200, 225, { size: 28, c: 'ok' })],
          hl: ['a2', 'b2'],
        },
      ],
    },
    {
      title: 'Membulatkan ke ribuan terdekat',
      steps: [
        {
          say: 'Pada garis bilangan, 3.700 lebih dekat ke 4.000. Jadi 3.700 dibulatkan ke ribuan terdekat menjadi 4.000.',
          clear: true,
          add: [...nl(), { id: 'p', t: 'circle', x: NX(3700), y: 140, r: 7, fill: 'neg', stroke: 'ink', sw: 1.5 }, T('pl', '3.700', NX(3700), 115, { size: 16, c: 'neg' }), T('a', '3.700 → {g:4.000}', 200, 220, { size: 26 })],
        },
        {
          say: 'Cara cepat: lihat angka ratusan. 5 atau lebih, bulatkan ke atas. Kurang dari 5, bulatkan ke bawah. 3.200 menjadi 3.000.',
          add: [T('b', 'ratusan ≥ 5 → naik,  < 5 → turun', 200, 255, { size: 16, c: 'mut' }), T('c', '3.200 → 3.000', 200, 282, { size: 18, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 6.481 dibulatkan ke ribuan terdekat menjadi berapa?',
          clear: true,
          add: [T('q', '6.481 ≈ ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '6.000', ok: true, why: 'Angka ratusannya 4, kurang dari 5. Bulatkan ke bawah.' },
              { t: '7.000', why: 'Ratusan 4 masih kurang dari 5, jadi turun.' },
              { t: '6.500', why: 'Dibulatkan ke ribuan, bukan ke ratusan.' },
            ],
          },
        },
        {
          say: 'Ratusannya 4, kurang dari 5. Jadi dibulatkan ke bawah: 6.000.',
          add: [T('a', '6.481 ≈ {g:6.000}', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '7.305 … 7.350',
      options: [
        { t: '<', ok: true },
        { t: '>', why: 'Ribuan dan ratusan sama. Puluhan 0 < 5.' },
        { t: '=', why: 'Nilainya berbeda.' },
      ],
      steps: ['Puluhan 0 < 5.', '7.305 < 7.350.'],
    },
    {
      type: 'num',
      q: '2.716 dibulatkan ke ribuan terdekat menjadi …',
      ans: ['3000', '3.000'],
      wrong: { '2000': 'Ratusan 7 ≥ 5, jadi naik.', '2700': 'Dibulatkan ke ribuan, bukan ratusan.' },
      steps: ['Ratusan 7 ≥ 5.', 'Naik: 3.000.'],
    },
    {
      type: 'num',
      q: '5.238 dibulatkan ke ratusan terdekat menjadi …',
      ans: ['5200', '5.200'],
      wrong: { '5300': 'Lihat puluhan: 3 < 5, jadi turun.', '5000': 'Dibulatkan ke ratusan, bukan ribuan.' },
      steps: ['Lihat puluhan: 3 < 5.', 'Turun: 5.200.'],
    },
    {
      type: 'num',
      q: 'Bilangan terbesar dari 8.099, 8.909, 8.990, 8.900 adalah …',
      ans: ['8990', '8.990'],
      wrong: { '8909': 'Ratusan sama 9. Puluhan 9 > 0.' },
      steps: ['Ribuan sama 8. Ratusan 9: 8.909, 8.990, 8.900.', 'Puluhan terbesar 9: 8.990.'],
    },
    {
      type: 'num',
      q: 'Bilangan terkecil empat angka adalah …',
      ans: ['1000', '1.000'],
      wrong: { '0000': 'Bilangan empat angka tidak diawali 0.', '1111': '1.000 lebih kecil dari 1.111.' },
      steps: ['Ribuan terkecil 1, sisanya 0.', '1.000.'],
    },
  ],
};

// ---------- 1.3 Perkalian dan pembagian ----------
const l3 = {
  id: 'k4b1-3',
  title: 'Perkalian dan Pembagian',
  hook: 'Perkalian dua angka dengan satu angka bisa dipecah: 23 × 4 = 20 × 4 + 3 × 4. Pembagian adalah kebalikannya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa 23 kali 4?',
          add: [T('q', '23 × 4 = ?', 200, 110, { size: 44, c: 'pos' })],
          ask: {
            options: [
              { t: '92', ok: true, why: '20 × 4 = 80 dan 3 × 4 = 12. 80 + 12 = 92.' },
              { t: '812', why: '80 dan 12 harus dijumlahkan, bukan ditulis berdampingan.' },
              { t: '27', why: '23 + 4 = 27. Perkalian berbeda dengan penjumlahan.' },
              { t: '82', why: '20 × 4 = 80, 3 × 4 = 12. 80 + 12 = 92.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pecah puluhan dan satuan',
      steps: [
        {
          say: 'Gambar persegi panjang 23 kali 4. Pecah 23 menjadi 20 dan 3.',
          clear: true,
          add: [box('a', 150, 110, 200, 80, { r: 0, fill: 'pos-soft', stroke: 'pos', sw: 2.5, label: '20 × 4', lsize: 20 }), box('b', 280, 110, 60, 80, { r: 0, fill: 'acc-soft', stroke: 'acc', sw: 2.5, label: '3 × 4', lsize: 16 }), T('la', '20', 150, 60, { size: 16 }), T('lb', '3', 280, 60, { size: 16 }), T('l4', '4', 35, 110, { size: 16 })],
        },
        {
          say: '20 kali 4 sama dengan 80. 3 kali 4 sama dengan 12. Jumlahkan: 92.',
          set: { a: { label: '80' }, b: { label: '12' } },
          add: [T('k', '80 + 12 = {g:92}', 200, 210, { size: 30 })],
        },
      ],
    },
    {
      title: 'Pembagian',
      steps: [
        {
          say: '84 bagi 4. Pecah 84 menjadi 80 dan 4. 80 bagi 4 sama dengan 20. 4 bagi 4 sama dengan 1. Hasilnya 21.',
          clear: true,
          add: [T('a', '84 : 4', 200, 60, { size: 32, c: 'pos' }), T('b', '= 80 : 4 + 4 : 4', 200, 115, { size: 26 }), T('c', '= 20 + 1 = {g:21}', 200, 165, { size: 28 })],
        },
        {
          say: 'Cek dengan perkalian: 21 kali 4 sama dengan 84. Benar.',
          add: [T('d', 'cek: 21 × 4 = 84', 200, 225, { size: 20, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 36 kali 3?',
          clear: true,
          add: [T('q', '36 × 3 = ?', 200, 110, { size: 44, c: 'pos' })],
          ask: {
            options: [
              { t: '108', ok: true, why: '30 × 3 = 90, 6 × 3 = 18. 90 + 18 = 108.' },
              { t: '98', why: '90 + 18 = 108.' },
              { t: '39', why: 'Itu 36 + 3.' },
              { t: '9018', why: '90 dan 18 dijumlahkan.' },
            ],
          },
        },
        {
          say: '30 kali 3 sama dengan 90. 6 kali 3 sama dengan 18. 90 tambah 18 sama dengan 108.',
          add: [T('a', '90 + 18 = {g:108}', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '14 × 5 = …',
      ans: ['70'],
      wrong: { '19': 'Itu 14 + 5.', '520': '10 × 5 = 50, 4 × 5 = 20, lalu dijumlah: 70.' },
      steps: ['10 × 5 = 50, 4 × 5 = 20.', '50 + 20 = 70.'],
    },
    {
      type: 'num',
      q: '27 × 3 = …',
      ans: ['81'],
      wrong: { '30': 'Itu 27 + 3.', '61': '20 × 3 = 60, 7 × 3 = 21. 60 + 21 = 81.' },
      steps: ['60 + 21.', '= 81.'],
    },
    {
      type: 'num',
      q: '96 : 3 = …',
      ans: ['32'],
      wrong: { '93': 'Itu 96 − 3.', '23': 'Cek: 23 × 3 = 69.' },
      steps: ['90 : 3 = 30, 6 : 3 = 2.', '30 + 2 = 32.'],
    },
    {
      type: 'num',
      q: 'Satu kotak berisi 24 pensil. 4 kotak berisi … pensil.',
      ans: ['96'],
      wrong: { '28': 'Itu 24 + 4.', '86': '20 × 4 = 80, 4 × 4 = 16. 80 + 16 = 96.' },
      steps: ['24 × 4.', '= 96 pensil.'],
    },
    {
      type: 'num',
      q: '75 kelereng dibagi sama rata untuk 5 anak. Setiap anak mendapat …',
      ans: ['15'],
      wrong: { '70': 'Itu 75 − 5.', '13': 'Cek: 13 × 5 = 65.' },
      steps: ['50 : 5 = 10, 25 : 5 = 5.', '10 + 5 = 15.'],
    },
  ],
};

export default {
  id: 'k4b1',
  no: 1,
  title: 'Bilangan Cacah sampai 10.000',
  desc: 'Ribuan dan nilai tempat, bentuk panjang, membandingkan dan membulatkan, serta perkalian dan pembagian dengan memecah bilangan.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: '8.000 + 50 + 3 = …',
      ans: ['8053', '8.053'],
      wrong: { '853': 'Tempat ratusan diisi 0.', '8530': '3 adalah satuan.' },
      steps: ['8 ribuan, 0 ratusan, 5 puluhan, 3 satuan.', '= 8.053.'],
    },
    {
      type: 'num',
      q: '4.650 dibulatkan ke ribuan terdekat menjadi …',
      ans: ['5000', '5.000'],
      wrong: { '4000': 'Ratusan 6 ≥ 5, jadi naik.' },
      steps: ['Ratusan 6 ≥ 5.', 'Naik: 5.000.'],
    },
    {
      type: 'num',
      q: '45 × 2 = …',
      ans: ['90'],
      wrong: { '47': 'Itu 45 + 2.', '80': '40 × 2 = 80, 5 × 2 = 10. 80 + 10 = 90.' },
      steps: ['80 + 10.', '= 90.'],
    },
  ],
};
