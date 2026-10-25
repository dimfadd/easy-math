// Kelas 4 · Bab 3: Pola Gambar dan Pola Bilangan
import { T, ln, table, box } from '../helpers.js';

// Deretan segitiga dari batang korek (n segitiga bersambung), mulai x0
const S = 34;
function sticks(p, n, x0, y, c = 'acc') {
  const els = [];
  const H = S * 0.866;
  let k = 0;
  const add = (a, b, cc, d) => els.push(ln(`${p}${k++}`, a, b, cc, d, { sw: 4, c, draw: false }));
  for (let i = 0; i < n; i++) {
    const x = x0 + (i * S) / 2;
    if (i % 2 === 0) {
      if (i === 0) add(x, y, x + S / 2, y - H);
      add(x + S / 2, y - H, x + S, y);
      add(x, y, x + S, y);
    } else {
      add(x, y - H, x + S, y - H);
      add(x + S / 2, y, x + S, y - H);
    }
  }
  return els;
}

// ---------- 3.1 Pola gambar ----------
const l1 = {
  id: 'k4b3-1',
  title: 'Pola Gambar',
  hook: 'Pola gambar bertambah dengan aturan tetap. Temukan berapa yang bertambah setiap langkah, lalu tebak langkah berikutnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Batang korek disusun menjadi segitiga. 1 segitiga butuh 3 batang. 2 segitiga butuh 5 batang. 3 segitiga butuh 7 batang. Berapa batang untuk 4 segitiga?',
          add: [...sticks('a', 1, 30, 100), T('la', '3', 47, 125, { size: 16 }), ...sticks('b', 2, 110, 100), T('lb', '5', 135, 125, { size: 16 }), ...sticks('c', 3, 210, 100), T('lc', '7', 245, 125, { size: 16 })],
          ask: {
            options: [
              { t: '9', ok: true, why: 'Setiap tambah 1 segitiga, batangnya bertambah 2. 7 + 2 = 9.' },
              { t: '12', why: '4 × 3 = 12 jika segitiganya terpisah. Di sini segitiga berbagi batang.' },
              { t: '8', why: 'Polanya bertambah 2, bukan 1.' },
              { t: '10', why: '3, 5, 7, lalu 9.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bertambah 2 setiap langkah',
      steps: [
        {
          say: 'Satu segitiga: 3 batang.',
          clear: true,
          add: sticks('s', 1, 60, 110),
        },
        {
          say: 'Tambah satu segitiga. Hanya perlu 2 batang baru, karena satu batang dipakai bersama.',
          add: sticks('s', 2, 60, 110).slice(3),
        },
        {
          say: 'Begitu seterusnya. Setiap segitiga baru menambah 2 batang.',
          add: sticks('s', 4, 60, 110).slice(5),
        },
        {
          say: 'Tulis dalam tabel. Banyak batang: 3, 5, 7, 9. Selalu bertambah 2.',
          add: [table('tb', 200, 200, [['segitiga', '1', '2', '3', '4'], ['batang', '3', '5', '7', '9']], { cw: [80, 50, 50, 50, 50], rh: 30, size: 16, head: false }), T('k', '+2 setiap langkah', 200, 255, { size: 16, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa batang untuk 6 segitiga?',
          clear: true,
          add: [table('tb', 200, 100, [['segitiga', '1', '2', '3', '4', '5', '6'], ['batang', '3', '5', '7', '9', '11', '?']], { cw: [80, 40, 40, 40, 40, 40, 40], rh: 32, size: 16, head: false })],
          ask: {
            options: [
              { t: '13', ok: true, why: '11 + 2 = 13.' },
              { t: '12', why: 'Polanya bertambah 2, bukan 1.' },
              { t: '18', why: 'Segitiga berbagi batang, jadi tidak 6 × 3.' },
            ],
          },
        },
        {
          say: '11 tambah 2 sama dengan 13 batang.',
          add: [T('a', '11 + 2 = {g:13}', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Pola gambar: 2, 4, 6, 8 kotak. Gambar berikutnya berisi … kotak.',
      ans: ['10'],
      wrong: { '9': 'Polanya bertambah 2.' },
      steps: ['+2 setiap langkah.', '8 + 2 = 10.'],
    },
    {
      type: 'num',
      q: 'Batang korek untuk 5 segitiga bersambung adalah …',
      ans: ['11'],
      wrong: { '15': 'Segitiga berbagi batang: 3, 5, 7, 9, 11.', '10': '9 + 2 = 11.' },
      steps: ['3, 5, 7, 9, 11.'],
    },
    {
      type: 'num',
      q: 'Pola kursi: 1 meja untuk 4 kursi, 2 meja untuk 6 kursi, 3 meja untuk 8 kursi. 4 meja untuk … kursi.',
      ans: ['10'],
      wrong: { '16': 'Polanya bertambah 2, bukan 4 × 4.', '12': '8 + 2 = 10.' },
      steps: ['4, 6, 8: +2.', '8 + 2 = 10.'],
    },
    {
      q: 'Aturan pola 5, 10, 15, 20 adalah …',
      options: [
        { t: 'tambah 5', ok: true },
        { t: 'tambah 10', why: '5 ke 10 bertambah 5.' },
        { t: 'kali 2', why: '10 × 2 = 20, bukan 15.' },
      ],
      steps: ['Setiap langkah +5.'],
    },
    {
      type: 'num',
      q: 'Pola gambar: 1, 3, 5, 7 bintang. Gambar ke-6 berisi … bintang.',
      ans: ['11'],
      wrong: { '9': 'Itu gambar ke-5.', '12': 'Polanya +2: 9, lalu 11.' },
      steps: ['Ke-5: 9. Ke-6: 11.'],
    },
  ],
};

// ---------- 3.2 Pola bilangan ----------
const l2 = {
  id: 'k4b3-2',
  title: 'Pola Bilangan',
  hook: 'Pola bilangan bisa bertambah, berkurang, atau berlipat. Cari aturan antara dua bilangan berurutan, lalu periksa pada bilangan lainnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '2, 4, 8, 16. Bilangan berikutnya berapa?',
          add: [T('q', '2,  4,  8,  16,  …', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '32', ok: true, why: 'Setiap bilangan dikali 2. 16 × 2 = 32.' },
              { t: '18', why: '2 ke 4 memang +2, tetapi 4 ke 8 adalah +4. Aturannya kali 2.' },
              { t: '24', why: 'Periksa: 8 ke 16 bukan +8 terus. Aturannya × 2.' },
              { t: '20', why: 'Selisihnya tidak tetap. Coba kali.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mencari aturan',
      steps: [
        {
          say: 'Hitung perubahan antara bilangan yang berurutan. 3, 7, 11, 15: setiap kali bertambah 4.',
          clear: true,
          add: [T('a', '3   7   11   15', 200, 60, { size: 30 }), ...[0, 1, 2].map((i) => T(`d${i}`, '+4', 125 + i * 72, 95, { size: 16, c: 'ok' })), T('a2', 'berikutnya: 15 + 4 = 19', 200, 130, { size: 18, c: 'mut' })],
        },
        {
          say: '50, 45, 40, 35: setiap kali berkurang 5.',
          add: [T('b', '50   45   40   35', 200, 180, { size: 30 }), ...[0, 1, 2].map((i) => T(`e${i}`, '−5', 125 + i * 72, 215, { size: 16, c: 'neg' })), T('b2', 'berikutnya: 35 − 5 = 30', 200, 250, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Ganjil dan genap',
      steps: [
        {
          say: 'Bilangan genap: 2, 4, 6, 8, dan seterusnya, bisa dibagi dua sama rata. Bilangan ganjil: 1, 3, 5, 7, dan seterusnya, selalu sisa satu.',
          clear: true,
          add: [...Array.from({ length: 10 }, (_, i) => box(`c${i}`, 38 + i * 36, 90, 32, 40, { r: 6, fill: (i + 1) % 2 ? 'acc-soft' : 'pos-soft', stroke: (i + 1) % 2 ? 'acc' : 'pos', sw: 2, label: String(i + 1), lsize: 18 })), T('g', 'genap: 2, 4, 6, 8, 10', 200, 160, { size: 20, c: 'pos' }), T('j', 'ganjil: 1, 3, 5, 7, 9', 200, 195, { size: 20, c: 'acc' })],
        },
        {
          say: 'Cara cepat: lihat angka satuannya. Satuan 0, 2, 4, 6, atau 8 berarti genap.',
          add: [T('k', '346 → satuan 6 → genap', 200, 245, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 81, 72, 63, 54. Bilangan berikutnya berapa?',
          clear: true,
          add: [T('q', '81,  72,  63,  54,  …', 200, 110, { size: 38, c: 'pos' })],
          ask: {
            options: [
              { t: '45', ok: true, why: 'Setiap kali berkurang 9. 54 − 9 = 45.' },
              { t: '63', why: '63 sudah ada sebelumnya. Polanya terus berkurang.' },
              { t: '46', why: 'Berkurang 9, bukan 8.' },
              { t: '50', why: 'Hitung: 81 − 72 = 9.' },
            ],
          },
        },
        {
          say: 'Setiap kali berkurang 9. 54 kurang 9 sama dengan 45.',
          add: [T('a', '54 − 9 = {g:45}', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '6, 12, 18, 24, … Bilangan berikutnya adalah …',
      ans: ['30'],
      wrong: { '28': 'Polanya +6.' },
      steps: ['+6 setiap langkah.', '24 + 6 = 30.'],
    },
    {
      type: 'num',
      q: '100, 90, 80, 70, … Bilangan berikutnya adalah …',
      ans: ['60'],
      wrong: { '80': 'Polanya terus berkurang.' },
      steps: ['−10.', '70 − 10 = 60.'],
    },
    {
      type: 'num',
      q: '1, 3, 9, 27, … Bilangan berikutnya adalah …',
      ans: ['81'],
      wrong: { '45': 'Aturannya kali 3, bukan tambah.', '36': '27 × 3 = 81.' },
      steps: ['× 3.', '27 × 3 = 81.'],
    },
    {
      q: 'Bilangan genap adalah …',
      options: [
        { t: '458', ok: true },
        { t: '371', why: 'Satuan 1, ganjil.' },
        { t: '125', why: 'Satuan 5, ganjil.' },
      ],
      steps: ['Satuan 8 → genap.'],
    },
    {
      type: 'num',
      q: 'Bilangan ganjil sesudah 49 adalah …',
      ans: ['51'],
      wrong: { '50': '50 genap.', '48': '48 genap dan sebelum 49.' },
      steps: ['50 genap, 51 ganjil.'],
    },
  ],
};

export default {
  id: 'k4b3',
  no: 3,
  title: 'Pola Gambar dan Pola Bilangan',
  desc: 'Pola gambar yang bertambah, tabel pola, aturan pola bilangan bertambah, berkurang, dan berlipat, serta bilangan ganjil dan genap.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: '4, 8, 12, 16, … Bilangan ke-6 adalah …',
      ans: ['24'],
      wrong: { '20': 'Itu bilangan ke-5.' },
      steps: ['Ke-5: 20. Ke-6: 24.'],
    },
    {
      q: 'Aturan pola 3, 6, 12, 24 adalah …',
      options: [
        { t: 'kali 2', ok: true },
        { t: 'tambah 3', why: '6 ke 12 bertambah 6, bukan 3.' },
        { t: 'tambah 6', why: '3 ke 6 bertambah 3.' },
      ],
      steps: ['3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24.'],
    },
    {
      type: 'num',
      q: 'Batang korek untuk 7 segitiga bersambung adalah …',
      ans: ['15'],
      wrong: { '21': 'Segitiga berbagi batang.', '14': '3, 5, 7, 9, 11, 13, 15.' },
      steps: ['3 + 2 × 6 = 15.'],
    },
  ],
};
