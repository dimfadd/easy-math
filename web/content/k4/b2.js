// Kelas 4 · Bab 2: Pecahan
import { T, F, ln } from '../helpers.js';

const W = 240;
const X0 = 80;
// Pita dibagi n bagian sama besar, k bagian berwarna
function strip(p, n, k, y, { c = 'acc', h = 34, w = W, x0 = X0 } = {}) {
  return Array.from({ length: n }, (_, i) => ({ id: `${p}${i}`, t: 'rect', x: x0 + (w / n) * (i + 0.5), y, w: w / n, h, r: 0, fill: i < k ? `${c}-soft` : 'paper', stroke: 'ink', sw: 2 }));
}

// ---------- 2.1 Pembilang dan penyebut ----------
const l1 = {
  id: 'k4b2-1',
  title: 'Pembilang dan Penyebut',
  hook: 'Pecahan 3/4 berarti satu utuh dibagi 4 bagian sama besar, lalu diambil 3 bagian. Angka bawah penyebut, angka atas pembilang.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Cokelat dibagi menjadi 4 bagian sama besar. 3 bagian dimakan. Pecahan berapa yang dimakan?',
          add: strip('s', 4, 3, 110, { c: 'neg' }),
          ask: {
            options: [
              { t: '3/4', ok: true, why: '3 bagian dari 4 bagian sama besar: 3/4.' },
              { t: '4/3', why: 'Angka bawah adalah banyak bagian seluruhnya: 4.' },
              { t: '1/4', why: '1/4 adalah bagian yang tersisa.' },
              { t: '3/7', why: 'Bagian seluruhnya 4, bukan 3 + 4.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membaca pecahan',
      steps: [
        {
          say: 'Satu utuh dibagi 4 bagian sama besar. Angka 4 ini disebut penyebut, ditulis di bawah.',
          clear: true,
          add: [...strip('s', 4, 0, 80, { c: 'neg' }), F('f', ' ', '4', 200, 175, { size: 34 }), T('ld', 'penyebut: banyak bagian', 300, 192, { size: 13, c: 'mut' })],
        },
        {
          say: 'Ambil 3 bagian. Angka 3 disebut pembilang, ditulis di atas. Pecahannya tiga per empat.',
          set: { s0: { fill: 'neg-soft' }, s1: { fill: 'neg-soft' }, s2: { fill: 'neg-soft' }, f: { n: '3' } },
          add: [T('ln', 'pembilang: diambil', 300, 158, { size: 13, c: 'mut' })],
        },
        {
          say: 'Kalau 4 bagian diambil semua, pecahannya 4 per 4, sama dengan 1 utuh.',
          add: [T('k', '4/4 = 1 utuh', 200, 250, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Pecahan dari kumpulan',
      steps: [
        {
          say: 'Ada 8 bola, 3 di antaranya merah. Bagian bola merah adalah 3 per 8.',
          clear: true,
          add: [...Array.from({ length: 8 }, (_, i) => ({ id: `b${i}`, t: 'circle', x: 60 + i * 40, y: 100, r: 15, fill: i < 3 ? 'neg' : 'pos', stroke: 'ink', sw: 1.5 })), F('f', '3', '8', 200, 190, { size: 34, c: 'neg' }), T('k', 'merah dari semua bola', 300, 190, { size: 13, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Bagian berwarna menunjukkan pecahan berapa?',
          clear: true,
          add: strip('s', 5, 2, 110, { c: 'ok' }),
          ask: {
            options: [
              { t: '2/5', ok: true, why: '2 bagian berwarna dari 5 bagian sama besar.' },
              { t: '2/3', why: 'Penyebut adalah semua bagian: 5, bukan yang tidak berwarna.' },
              { t: '3/5', why: '3/5 adalah bagian yang tidak berwarna.' },
              { t: '5/2', why: 'Banyak bagian seluruhnya ditulis di bawah.' },
            ],
          },
        },
        {
          say: '2 bagian berwarna dari 5 bagian. Dua per lima.',
          add: [F('f', '2', '5', 200, 200, { size: 36, c: 'ok' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Pecahan bagian berwarna adalah …',
      fig: strip('f', 3, 1, 150, { c: 'pos' }),
      options: [
        { t: '1/3', ok: true },
        { t: '1/2', why: 'Ada 3 bagian sama besar, bukan 2.' },
        { t: '3/1', why: 'Penyebut 3 ditulis di bawah.' },
      ],
      steps: ['1 dari 3 bagian.', '1/3.'],
    },
    {
      type: 'num',
      q: 'Pada pecahan 5/8, penyebutnya adalah …',
      ans: ['8'],
      wrong: { '5': '5 adalah pembilang, di atas.' },
      steps: ['Penyebut di bawah: 8.'],
    },
    {
      type: 'num',
      q: 'Pizza dibagi 6 potong sama besar. 6 potong dimakan semua. Bagian yang dimakan = … utuh.',
      ans: ['1'],
      wrong: { '6': '6/6 sama dengan 1 utuh.' },
      steps: ['6/6.', '= 1.'],
    },
    {
      q: 'Ada 10 kue, 7 kue rasa cokelat. Pecahan kue cokelat adalah …',
      options: [
        { t: '7/10', ok: true },
        { t: '3/10', why: '3/10 adalah kue yang bukan cokelat.' },
        { t: '10/7', why: 'Banyak semua kue ditulis di bawah.' },
      ],
      steps: ['7 dari 10.', '7/10.'],
    },
    {
      q: 'Pecahan yang dibaca "dua per tujuh" adalah …',
      options: [
        { t: '2/7', ok: true },
        { t: '7/2', why: 'Yang disebut lebih dulu (dua) adalah pembilang, di atas.' },
        { t: '2/9', why: 'Penyebutnya tujuh.' },
      ],
      steps: ['Pembilang 2, penyebut 7.'],
    },
  ],
};

// ---------- 2.2 Pecahan senilai ----------
const l2 = {
  id: 'k4b2-2',
  title: 'Pecahan Senilai',
  hook: '1/2, 2/4, dan 4/8 terlihat berbeda, tetapi menunjukkan bagian yang sama besar. Pecahan seperti ini disebut senilai.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pita atas diwarnai setengah. Pita bawah dibagi 4 dan diwarnai 2. Mana yang lebih panjang bagian berwarnanya?',
          add: [...strip('a', 2, 1, 80), ...strip('b', 4, 2, 150)],
          ask: {
            options: [
              { t: 'sama panjang', ok: true, why: 'Bagian berwarna keduanya berakhir di tengah pita. 1/2 = 2/4.' },
              { t: 'pita bawah', why: 'Ada 2 bagian berwarna, tetapi setiap bagiannya lebih kecil.' },
              { t: 'pita atas', why: 'Bandingkan ujung kanan bagian berwarna. Keduanya di tengah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bagi lebih kecil',
      steps: [
        {
          say: 'Setengah pita.',
          clear: true,
          add: [...strip('a', 2, 1, 60), F('fa', '1', '2', 355, 60, { size: 20 })],
        },
        {
          say: 'Bagi setiap bagian menjadi dua. Sekarang ada 4 bagian, 2 berwarna. Panjangnya tetap sama: 2 per 4.',
          add: [...strip('b', 4, 2, 125), F('fb', '2', '4', 355, 125, { size: 20 })],
        },
        {
          say: 'Bagi lagi menjadi 8. Sekarang 4 dari 8. Tetap sama panjang. Jadi setengah sama dengan 2 per 4 sama dengan 4 per 8.',
          add: [...strip('c', 8, 4, 190), F('fc', '4', '8', 355, 190, { size: 20 }), ln('m', 200, 40, 200, 210, { sw: 2, c: 'neg', dash: '5 4' }), T('k', '1/2 = 2/4 = 4/8', 200, 255, { size: 24, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Kali atas dan bawah',
      steps: [
        {
          say: 'Pecahan senilai didapat dengan mengalikan pembilang dan penyebut dengan bilangan yang sama.',
          clear: true,
          add: [T('a', '1/2 = (1 × 2)/(2 × 2) = 2/4', 200, 80, { size: 24 }), T('b', '1/2 = (1 × 4)/(2 × 4) = 4/8', 200, 130, { size: 24 })],
        },
        {
          say: 'Bisa juga dibagi dengan bilangan yang sama. 6 per 9, bagi atas dan bawah dengan 3, menjadi 2 per 3.',
          add: [T('c', '6/9 = (6 : 3)/(9 : 3) = 2/3', 200, 195, { size: 24, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Pecahan mana yang senilai dengan 1 per 3?',
          clear: true,
          add: [T('q', '1/3 = ?', 200, 110, { size: 44, c: 'pos' })],
          ask: {
            options: [
              { t: '2/6', ok: true, why: '1 × 2 = 2 dan 3 × 2 = 6.' },
              { t: '2/3', why: 'Hanya pembilang yang dikali. Penyebut juga harus dikali.' },
              { t: '1/6', why: 'Hanya penyebut yang dikali. Pembilang juga harus dikali.' },
              { t: '3/1', why: 'Pecahan dibalik tidak senilai.' },
            ],
          },
        },
        {
          say: 'Kalikan atas dan bawah dengan 2: 2 per 6.',
          add: [T('a', '(1 × 2)/(3 × 2) = {g:2/6}', 200, 190, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Pecahan yang senilai dengan 1/4 adalah …',
      options: [
        { t: '2/8', ok: true },
        { t: '2/4', why: '2/4 = 1/2.' },
        { t: '1/8', why: 'Pembilang juga harus dikali 2.' },
      ],
      steps: ['1 × 2 = 2, 4 × 2 = 8.', '2/8.'],
    },
    {
      type: 'num',
      q: '3/5 = 6/…',
      ans: ['10'],
      wrong: { '5': 'Pembilang dikali 2, penyebut juga dikali 2.', '8': 'Dikali, bukan ditambah 3.' },
      steps: ['3 × 2 = 6.', '5 × 2 = 10.'],
    },
    {
      type: 'num',
      q: '4/12 = 1/…',
      ans: ['3'],
      wrong: { '12': 'Penyebut juga dibagi 4.', '8': 'Dibagi, bukan dikurangi.' },
      steps: ['4 : 4 = 1.', '12 : 4 = 3.'],
    },
    {
      q: 'Benarkah 2/3 = 4/6?',
      options: [
        { t: 'benar', ok: true },
        { t: 'salah', why: '2 × 2 = 4 dan 3 × 2 = 6. Senilai.' },
      ],
      steps: ['Kalikan atas dan bawah dengan 2.'],
    },
    {
      type: 'num',
      q: '1/2 = …/10',
      ans: ['5'],
      wrong: { '1': 'Penyebut dikali 5, pembilang juga dikali 5.', '2': '1 × 5 = 5.' },
      steps: ['2 × 5 = 10.', '1 × 5 = 5.'],
    },
  ],
};

// ---------- 2.3 Membandingkan pecahan ----------
const l3 = {
  id: 'k4b2-3',
  title: 'Membandingkan Pecahan',
  hook: 'Kalau penyebutnya sama, bandingkan pembilangnya. Kalau pembilangnya sama, penyebut yang lebih kecil justru pecahan yang lebih besar.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mana yang lebih besar, 1 per 3 atau 1 per 5?',
          add: [T('a', '1/3   atau   1/5', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '1/3', ok: true, why: 'Dibagi 3 menghasilkan potongan lebih besar daripada dibagi 5.' },
              { t: '1/5', why: 'Angka 5 lebih besar, tetapi dibagi 5 membuat potongannya lebih kecil.' },
              { t: 'sama besar', why: 'Potongannya berbeda ukuran.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Penyebut sama',
      steps: [
        {
          say: '3 per 7 dan 5 per 7. Bagiannya sama besar karena penyebutnya sama. 5 bagian lebih banyak dari 3 bagian. Jadi 5 per 7 lebih besar.',
          clear: true,
          add: [...strip('a', 7, 3, 70, { c: 'pos', w: 252 }), T('la', '3/7', 360, 70, { size: 20 }), ...strip('b', 7, 5, 130, { c: 'acc', w: 252 }), T('lb', '5/7', 360, 130, { size: 20 }), T('k', '3/7 < 5/7', 200, 200, { size: 28, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Pembilang sama',
      steps: [
        {
          say: '1 per 3 dan 1 per 5. Keduanya diambil 1 bagian. Tetapi pita yang dibagi 3 bagiannya lebih besar. Jadi 1 per 3 lebih besar.',
          clear: true,
          add: [...strip('a', 3, 1, 70, { c: 'pos' }), T('la', '1/3', 355, 70, { size: 20 }), ...strip('b', 5, 1, 130, { c: 'acc' }), T('lb', '1/5', 355, 130, { size: 20 }), T('k', '1/3 > 1/5', 200, 200, { size: 28, c: 'ok' }), T('k2', 'dibagi lebih banyak → potongan lebih kecil', 200, 240, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tanda apa di antara 2 per 9 dan 2 per 5?',
          clear: true,
          add: [T('q', '2/9   ?   2/5', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '<', ok: true, why: 'Pembilang sama. Dibagi 9 potongannya lebih kecil dari dibagi 5.' },
              { t: '>', why: '9 lebih besar dari 5, tetapi potongan per sembilan lebih kecil.' },
              { t: '=', why: 'Potongannya berbeda ukuran.' },
            ],
          },
        },
        {
          say: 'Pembilang sama-sama 2. Penyebut 9 membuat potongan lebih kecil. Jadi 2 per 9 kurang dari 2 per 5.',
          add: [T('a', '2/9 {g:<} 2/5', 200, 190, { size: 34 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '4/9 … 7/9',
      options: [
        { t: '<', ok: true },
        { t: '>', why: 'Penyebut sama. Pembilang 4 < 7.' },
        { t: '=', why: 'Pembilangnya berbeda.' },
      ],
      steps: ['Penyebut sama.', '4 < 7: 4/9 < 7/9.'],
    },
    {
      q: '1/4 … 1/6',
      options: [
        { t: '>', ok: true },
        { t: '<', why: 'Pembilang sama. Dibagi 4 potongannya lebih besar.' },
        { t: '=', why: 'Potongannya berbeda ukuran.' },
      ],
      steps: ['Pembilang sama.', 'Penyebut lebih kecil → pecahan lebih besar.'],
    },
    {
      q: 'Pecahan terbesar adalah …',
      options: [
        { t: '5/6', ok: true },
        { t: '1/6', why: 'Penyebut sama. Pembilang 1 paling kecil.' },
        { t: '3/6', why: '3 < 5.' },
      ],
      steps: ['Penyebut sama 6.', 'Pembilang terbesar 5.'],
    },
    {
      q: 'Ani makan 1/2 pizza, Budi makan 1/3 pizza yang sama besar. Siapa makan lebih banyak?',
      options: [
        { t: 'Ani', ok: true },
        { t: 'Budi', why: 'Setengah lebih besar dari sepertiga.' },
        { t: 'sama banyak', why: '1/2 dan 1/3 berbeda.' },
      ],
      steps: ['Pembilang sama 1.', 'Penyebut 2 < 3: 1/2 lebih besar.'],
    },
    {
      q: '2/4 … 1/2',
      options: [
        { t: '=', ok: true },
        { t: '>', why: '2/4 senilai dengan 1/2.' },
        { t: '<', why: '2/4 senilai dengan 1/2.' },
      ],
      steps: ['2/4 = 1/2.'],
    },
  ],
};

export default {
  id: 'k4b2',
  no: 2,
  title: 'Pecahan',
  desc: 'Pembilang dan penyebut, pecahan dari bentuk dan kumpulan, pecahan senilai, serta membandingkan pecahan.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: '2/7 = 4/…',
      ans: ['14'],
      wrong: { '7': 'Penyebut juga dikali 2.', '9': 'Dikali, bukan ditambah.' },
      steps: ['2 × 2 = 4, 7 × 2 = 14.'],
    },
    {
      q: '3/8 … 5/8',
      options: [
        { t: '<', ok: true },
        { t: '>', why: 'Penyebut sama. 3 < 5.' },
      ],
      steps: ['Penyebut sama, 3 < 5.'],
    },
    {
      q: 'Pecahan yang senilai dengan 1/2 adalah …',
      options: [
        { t: '3/6', ok: true },
        { t: '2/6', why: '2/6 = 1/3.' },
        { t: '1/6', why: 'Pembilang juga harus dikali 3.' },
      ],
      steps: ['1 × 3 = 3, 2 × 3 = 6.'],
    },
  ],
};
