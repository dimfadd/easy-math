// Bab 2: Bilangan Rasional (pecahan, desimal, persen)
import { T, F, numberLine, dot, hop, ln, bar, areaCells, areaFill, eqRow, table } from './helpers.js';

const PEN_Q = eqRow('q', 58, [[3, 4], '−', [1, 6], '=', '?'], { size: 32 });
const dashMark = (id, x, y1, y2) => ln(id, x, y1, x, y2, { dash: '5 5', c: 'acc', sw: 2.5 });

// ---------- 2.1 Pecahan dan pecahan senilai ----------
const l1 = {
  id: 'b2-1',
  title: 'Pecahan dan Pecahan Senilai',
  hook: 'Mana yang lebih besar, 1/3 atau 1/4? Angka 4 lebih besar, tapi potongannya justru lebih kecil.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mana yang lebih besar, sepertiga atau seperempat?',
          add: [T('q', 'Mana yang lebih besar?', 200, 62, { size: 22, w: 700 }), F('a', 1, 3, 130, 150, { size: 48 }), F('b', 1, 4, 270, 150, { size: 48 })],
          ask: {
            options: [
              { t: '1/3', ok: true, why: 'Dibagi 3 bagian membuat potongan lebih besar daripada dibagi 4 bagian.' },
              { t: '1/4', why: 'Angka 4 memang lebih besar dari 3. Tapi penyebut 4 berarti satu utuh dibagi 4, jadi tiap potongannya lebih kecil.' },
              { t: 'Sama besar', why: 'Pembilangnya sama-sama 1, tapi ukuran potongannya berbeda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Arti pecahan',
      steps: [
        {
          say: 'Tiga per empat artinya satu utuh dibagi menjadi 4 bagian sama besar, lalu diambil 3 bagian.',
          clear: true,
          add: [bar('b', 200, 105, 4, 3, { h: 46 }), F('f', 3, 4, 140, 215, { size: 40 })],
        },
        {
          say: 'Angka atas disebut pembilang, yaitu banyak bagian yang diambil. Angka bawah disebut penyebut, yaitu banyak bagian seluruhnya.',
          add: [T('lt', '← pembilang: diambil 3', 170, 190, { size: 16, a: 'start', c: 'pos' }), T('lb', '← penyebut: ada 4 bagian', 170, 241, { size: 16, a: 'start', c: 'mut' })],
        },
      ],
    },
    {
      title: 'Penyebut besar, potongan kecil',
      steps: [
        {
          say: 'Bandingkan setengah, sepertiga, seperempat, dan seperenam. Semua batang sama panjang, masing-masing diarsir 1 potong.',
          clear: true,
          add: [2, 3, 4, 6].flatMap((d, i) => [F(`f${d}`, 1, d, 48, 64 + i * 58, { size: 20 }), bar(`b${d}`, 228, 64 + i * 58, d, 1, { w: 270, h: 32 })]),
        },
        {
          say: 'Makin besar penyebutnya, makin kecil tiap potongan. Jadi sepertiga lebih besar daripada seperempat.',
          hl: ['b3', 'b4'],
          add: [dashMark('m3', 93 + 270 / 3, 40, 200)],
        },
      ],
    },
    {
      title: 'Pecahan senilai',
      steps: [
        { say: 'Ini setengah.', clear: true, add: [F('fa', 1, 2, 45, 70, { size: 22 }), bar('a', 225, 70, 2, 1, { w: 280 })] },
        {
          say: 'Potong setiap bagian jadi dua. Sekarang ada 4 bagian, yang diarsir 2. Dua per empat.',
          add: [F('fb', 2, 4, 45, 140, { size: 22 }), bar('b', 225, 140, 4, 2, { w: 280 })],
        },
        {
          say: 'Potong lagi jadi 8 bagian. Yang diarsir 4. Empat per delapan.',
          add: [F('fc', 4, 8, 45, 210, { size: 22 }), bar('c', 225, 210, 8, 4, { w: 280 })],
        },
        {
          say: 'Panjang arsirannya sama. Jadi setengah, dua per empat, dan empat per delapan adalah pecahan senilai.',
          add: [dashMark('mid', 225, 42, 236), T('eq', 'arsirannya sama panjang', 225, 266, { size: 17, c: 'acc' })],
        },
        {
          say: 'Cara membuat pecahan senilai: kalikan pembilang dan penyebut dengan bilangan yang sama.',
          clear: true,
          add: [...eqRow('r', 120, [[1, 2], '=', ['1 × 4', '2 × 4'], '=', [4, 8]], { size: 34 }), T('rl', 'pembilang dan penyebut dikali bilangan yang sama', 200, 220, { size: 16, w: 700 })],
        },
      ],
    },
    {
      title: 'Menyederhanakan',
      steps: [
        { say: 'Ini enam per delapan.', clear: true, add: [F('fa', 6, 8, 45, 85, { size: 22 }), bar('a', 225, 85, 8, 6, { w: 280 })] },
        {
          say: 'Gabungkan setiap dua potong. Sekarang ada 4 bagian, yang diarsir 3. Tiga per empat, arsirannya sama panjang.',
          add: [F('fb', 3, 4, 45, 160, { size: 22 }), bar('b', 225, 160, 4, 3, { w: 280 }), dashMark('m', 85 + 280 * 0.75, 58, 188)],
        },
        {
          say: 'Ini sama dengan membagi pembilang dan penyebut dengan bilangan yang sama. Bagi dengan FPB-nya supaya langsung paling sederhana.',
          add: eqRow('d', 245, [[6, 8], '=', ['6 ÷ 2', '8 ÷ 2'], '=', [3, 4]], { size: 26 }),
        },
      ],
    },
    {
      title: 'Membandingkan',
      steps: [
        {
          say: 'Mana yang lebih besar, dua per tiga atau tiga per lima? Ukuran potongannya berbeda, jadi sulit dibandingkan langsung.',
          clear: true,
          add: [F('a', 2, 3, 130, 62, { size: 32 }), T('vs', 'atau', 200, 62, { size: 18, c: 'mut' }), F('b', 3, 5, 270, 62, { size: 32 }), bar('ba', 200, 150, 3, 2), bar('bb', 200, 205, 5, 3, { fc: 'acc' })],
        },
        {
          say: 'Samakan penyebutnya. KPK dari 3 dan 5 adalah 15. Dua per tiga sama dengan 10 per 15. Tiga per lima sama dengan 9 per 15.',
          del: ['vs'],
          set: { a: { x: 60 }, b: { x: 245 }, ba: { parts: 15, filled: 10 }, bb: { parts: 15, filled: 9 } },
          add: [T('e1', '=', 103, 62, { size: 28 }), F('a2', 10, 15, 148, 62, { size: 32 }), T('e2', '=', 288, 62, { size: 28 }), F('b2', 9, 15, 333, 62, { size: 32 })],
        },
        {
          say: '10 per 15 lebih besar dari 9 per 15. Jadi dua per tiga lebih besar.',
          add: [T('res', 'arsiran biru lebih panjang, jadi 2/3 lebih besar', 200, 260, { size: 17, w: 800 })],
          hl: ['ba'],
        },
      ],
    },
    {
      title: 'Pecahan negatif',
      steps: [
        {
          say: 'Pecahan juga bisa negatif. Negatif setengah ada di antara minus 1 dan 0.',
          clear: true,
          add: [
            numberLine('nl', 200, 150, 360, -2, 2, { step: 0.5, every: 1 }).el,
            dot('d1', numberLine('nl', 200, 150, 360, -2, 2).at(-0.5), 150, 'neg'),
            F('l1', 1, 2, numberLine('nl', 200, 150, 360, -2, 2).at(-0.5), 100, { size: 20, sign: '−', c: 'neg' }),
          ],
        },
        {
          say: 'Tiga per dua sama dengan satu setengah. Letaknya di antara 1 dan 2.',
          add: [dot('d2', numberLine('nl', 200, 150, 360, -2, 2).at(1.5), 150, 'pos'), F('l2', 3, 2, numberLine('nl', 200, 150, 360, -2, 2).at(1.5), 100, { size: 20, c: 'pos' })],
        },
        {
          say: 'Bilangan yang bisa ditulis sebagai pecahan a per b, dengan b bukan nol, disebut bilangan rasional. Bilangan bulat juga termasuk, misalnya 3 sama dengan 3 per 1.',
          add: [T('def', 'Bilangan rasional: bisa ditulis a/b, dengan b ≠ 0', 200, 232, { size: 16, w: 800 }), T('ex', 'contoh: 3 = 3/1,  −0,5 = −1/2,  2,25 = 9/4', 200, 262, { size: 15, w: 700, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Pecahan mana yang senilai dengan tiga per lima?',
          clear: true,
          add: [T('q', 'Pecahan yang senilai dengan', 200, 72, { size: 20, w: 700 }), F('f', 3, 5, 200, 150, { size: 48 })],
          ask: {
            options: [
              { t: '6/10', ok: true, why: 'Pembilang dan penyebut sama-sama dikali 2.' },
              { t: '4/6', why: 'Menambah 1 pada pembilang dan penyebut tidak menghasilkan pecahan senilai. Yang benar: kalikan keduanya dengan bilangan yang sama.' },
              { t: '3/10', why: 'Hanya penyebutnya yang dikali 2. Pembilangnya juga harus dikali 2.' },
            ],
          },
        },
        {
          say: 'Tiga per lima, kalikan pembilang dan penyebut dengan 2, jadi enam per sepuluh. Arsirannya sama panjang.',
          clear: true,
          add: [F('fa', 3, 5, 45, 100, { size: 22 }), bar('a', 225, 100, 5, 3, { w: 280 }), F('fb', 6, 10, 45, 180, { size: 22 }), bar('b', 225, 180, 10, 6, { w: 280 }), dashMark('m', 85 + 280 * 0.6, 72, 208)],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bagian yang diarsir pada gambar menunjukkan pecahan …',
      fig: [{ id: 'b', t: 'bar', x: 200, y: 150, w: 300, h: 46, parts: 6, filled: 4 }],
      viewBox: '40 118 320 64',
      figLabel: 'Batang dibagi 6 bagian sama besar, 4 bagian diarsir',
      options: [
        { t: '4/6', ok: true },
        { t: '4/2', why: 'Penyebut adalah banyak bagian seluruhnya, yaitu 6, bukan banyak bagian yang tidak diarsir.' },
        { t: '2/6', why: '2 adalah bagian yang tidak diarsir. Yang diarsir ada 4.' },
        { t: '6/4', why: 'Pembilang dan penyebutnya tertukar.' },
      ],
      steps: ['Batang dibagi 6 bagian sama besar: penyebutnya 6.', 'Yang diarsir 4 bagian: pembilangnya 4. Jadi 4/6 (senilai dengan 2/3).'],
    },
    {
      type: 'num',
      q: 'Bentuk paling sederhana dari 12/18 adalah …',
      ans: ['2/3'],
      exact: true,
      exactWhy: 'Nilainya sudah benar, tapi masih bisa disederhanakan lagi.',
      wrong: { '6/9': 'Masih bisa disederhanakan: 6 dan 9 sama-sama habis dibagi 3.', '4/6': 'Masih bisa disederhanakan: 4 dan 6 sama-sama habis dibagi 2.' },
      steps: ['FPB dari 12 dan 18 adalah 6.', '12 ÷ 6 = 2 dan 18 ÷ 6 = 3, jadi 12/18 = 2/3.'],
    },
    {
      q: 'Pecahan terbesar di antara 3/4, 2/3, 5/8, dan 7/12 adalah …',
      options: [
        { t: '3/4', ok: true },
        { t: '7/12', why: 'Pembilang dan penyebutnya paling besar, tapi itu tidak membuat pecahannya paling besar. Samakan penyebutnya: 7/12 = 14/24, sedangkan 3/4 = 18/24.' },
        { t: '5/8', why: 'Samakan penyebutnya jadi 24: 5/8 = 15/24, sedangkan 3/4 = 18/24.' },
        { t: '2/3', why: 'Samakan penyebutnya jadi 24: 2/3 = 16/24, sedangkan 3/4 = 18/24.' },
      ],
      steps: ['KPK dari 4, 3, 8, dan 12 adalah 24.', '3/4 = 18/24, 2/3 = 16/24, 5/8 = 15/24, 7/12 = 14/24.', 'Yang terbesar 18/24, yaitu 3/4.'],
    },
    {
      type: 'num',
      q: 'Isilah titik-titiknya: 2/7 = …/21',
      ans: ['6'],
      wrong: { '16': 'Ini menambah 14 pada pembilang, mengikuti 7 + 14 = 21. Yang benar: penyebut dikali 3, jadi pembilang juga dikali 3.', '14': 'Penyebut 7 dikali 3 menjadi 21, jadi pembilangnya 2 × 3.' },
      steps: ['7 dikali 3 menjadi 21.', 'Pembilang juga dikali 3: 2 × 3 = 6.'],
    },
    {
      q: 'Bilangan yang terletak di antara {n:−1} dan 0 adalah …',
      options: [
        { t: '{n:−1/2}', ok: true },
        { t: '{p:1/2}', why: '1/2 ada di antara 0 dan 1, di sebelah kanan nol.' },
        { t: '{n:−3/2}', why: '{n:−3/2} sama dengan {n:−1 1/2}, lebih kecil dari {n:−1}.' },
        { t: '{n:−2}', why: '{n:−2} ada di kiri {n:−1}.' },
      ],
      steps: ['Di antara {n:−1} dan 0 ada bilangan negatif yang jaraknya ke nol kurang dari 1.', '{n:−1/2} berjarak setengah dari nol, jadi di antaranya.'],
    },
  ],
};

// ---------- 2.2 Penjumlahan dan pengurangan pecahan ----------
const l2 = {
  id: 'b2-2',
  title: 'Menjumlah dan Mengurangkan Pecahan',
  hook: '1/2 + 1/3 bukan 2/5. Hasil itu malah lebih kecil dari 1/2, padahal kita menambah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Setengah tambah sepertiga, berapa?',
          add: eqRow('q', 140, [[1, 2], '+', [1, 3], '=', '?'], { size: 48 }),
          ask: {
            options: [
              { t: '5/6', ok: true, why: 'Sekarang kita lihat kenapa.' },
              { t: '2/5', why: 'Ini menjumlahkan atas dengan atas dan bawah dengan bawah. Hasilnya malah lebih kecil dari 1/2, padahal kita menambah.' },
              { t: '2/6', why: 'Penyebut 2 dan 3 tidak bisa langsung dipakai. Ukuran potongannya harus disamakan dulu.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kenapa bukan 2/5?',
      steps: [
        {
          say: 'Bandingkan setengah dengan dua per lima.',
          clear: true,
          add: [F('fa', 1, 2, 48, 90, { size: 22 }), bar('a', 230, 90, 2, 1, { w: 260 }), F('fr', 2, 5, 48, 175, { size: 22 }), bar('r', 230, 175, 5, 2, { w: 260, fc: 'neg' })],
        },
        {
          say: 'Dua per lima lebih kecil dari setengah. Padahal kita menambahkan sesuatu ke setengah. Hasilnya tidak mungkin lebih kecil.',
          add: [dashMark('m', 230, 60, 205), T('w', '2/5 lebih pendek dari 1/2', 230, 250, { size: 18, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Penyebut sama',
      steps: [
        {
          say: 'Kalau penyebutnya sama, ukuran potongannya sama. Satu per lima ...',
          clear: true,
          add: [...eqRow('q', 62, [[1, 5], '+', [2, 5]], { size: 34 }), bar('x', 200, 150, 5, null, { colors: ['pos', null, null, null, null], h: 44 })],
        },
        { say: 'ditambah dua per lima. Totalnya tiga potong.', set: { x: { colors: ['pos', 'acc', 'acc', null, null] } } },
        {
          say: 'Hasilnya tiga per lima. Penyebutnya tetap, karena ukuran potongannya tidak berubah.',
          del: ['q*'],
          add: [...eqRow('q2', 62, [[1, 5], '+', [2, 5], '=', [3, 5]], { size: 34 }), T('n', 'penyebut tetap, pembilang dijumlahkan', 200, 225, { size: 17, w: 700 })],
        },
      ],
    },
    {
      title: 'Samakan potongannya',
      steps: [
        {
          say: 'Kembali ke setengah tambah sepertiga. Ukuran potongannya berbeda.',
          clear: true,
          add: [F('fa', 1, 2, 48, 72, { size: 22 }), bar('a', 230, 72, 2, 1, { w: 260 }), F('fb', 1, 3, 48, 145, { size: 22 }), bar('b', 230, 145, 3, 1, { w: 260, fc: 'acc' })],
        },
        {
          say: 'Potong keduanya menjadi seperenam, karena KPK dari 2 dan 3 adalah 6. Setengah sama dengan 3 per 6. Sepertiga sama dengan 2 per 6.',
          set: { a: { parts: 6, filled: 3 }, b: { parts: 6, filled: 2 }, fa: { n: 3, d: 6 }, fb: { n: 2, d: 6 } },
        },
        {
          say: 'Sekarang potongannya sama. 3 per 6 tambah 2 per 6 sama dengan 5 per 6.',
          add: [F('fs', 5, 6, 48, 220, { size: 22 }), bar('s', 230, 220, 6, null, { w: 260, colors: ['pos', 'pos', 'pos', 'acc', 'acc', null] })],
        },
        { say: 'Kuncinya: samakan penyebut dulu, baru jumlahkan pembilangnya.', add: [T('k', 'samakan penyebut dulu', 230, 268, { size: 17, c: 'acc' })] },
      ],
    },
    {
      title: 'Pengurangan',
      steps: [
        {
          say: 'Pengurangan juga sama. Tiga per empat kurang seperenam.',
          clear: true,
          add: [...PEN_Q, bar('x', 200, 140, 4, 3, { h: 40 })],
        },
        {
          say: 'KPK dari 4 dan 6 adalah 12. Tiga per empat sama dengan 9 per 12. Seperenam sama dengan 2 per 12.',
          set: { x: { parts: 12, filled: 9 } },
          add: eqRow('c', 215, [[3, 4], '=', [9, 12], '   ', [1, 6], '=', [2, 12]], { size: 24 }),
        },
        {
          say: 'Ambil 2 per 12 dari 9 per 12. Sisanya 7 per 12.',
          set: { x: { colors: ['pos', 'pos', 'pos', 'pos', 'pos', 'pos', 'pos', 'neg-soft', 'neg-soft', null, null, null] } },
          del: ['q4'],
          add: [F('ans', 7, 12, PEN_Q[4].x, 58, { size: 26, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Pecahan campuran',
      steps: [
        {
          say: 'Dua sepertiga tambah satu setengah.',
          clear: true,
          add: eqRow('q', 66, ['2', [1, 3], '+', '1', [1, 2], '=', '?'], { size: 34, gap: 4 }),
        },
        {
          say: 'Jumlahkan bagian bulatnya: 2 tambah 1 sama dengan 3. Lalu bagian pecahannya: sepertiga tambah setengah sama dengan 5 per 6.',
          add: [T('s1', 'bagian bulat: 2 + 1 = 3', 200, 140, { size: 20 }), ...eqRow('s2', 200, ['pecahan:', [1, 3], '+', [1, 2], '=', [2, 6], '+', [3, 6], '=', [5, 6]], { size: 22, gap: 5 })],
        },
        {
          say: 'Hasilnya tiga, lima per enam.',
          add: eqRow('r', 262, ['hasil:', '3', [5, 6]], { size: 26, gap: 6, c: 'pos' }),
        },
      ],
    },
    {
      title: 'Dengan negatif',
      steps: [
        {
          say: 'Minus setengah tambah tiga per empat.',
          clear: true,
          add: [
            T('q', '{n:−1/2} + {p:3/4} = ?', 200, 60, { size: 30 }),
            numberLine('nl', 200, 165, 360, -1, 1, { step: 0.25, every: 1 }).el,
            dot('s', numberLine('nl', 200, 165, 360, -1, 1).at(-0.5), 165, 'neg'),
            T('l1', '{n:−1/2}', numberLine('nl', 200, 165, 360, -1, 1).at(-0.5), 198, { size: 15 }),
          ],
        },
        {
          say: 'Mulai dari minus setengah, melangkah tiga per empat ke kanan. Kita sampai di seperempat.',
          add: [
            hop('h', numberLine('nl', 200, 165, 360, -1, 1).at(-0.5), numberLine('nl', 200, 165, 360, -1, 1).at(0.25), 165, { c: 'pos', label: '+3/4' }),
            dot('e', numberLine('nl', 200, 165, 360, -1, 1).at(0.25), 165, 'ok'),
            T('l2', '{p:1/4}', numberLine('nl', 200, 165, 360, -1, 1).at(0.25), 198, { size: 15 }),
          ],
        },
        {
          say: 'Hitungannya: minus setengah sama dengan minus 2 per 4. Minus 2 per 4 tambah 3 per 4 sama dengan seperempat.',
          add: [T('calc', '{n:−2/4} + {p:3/4} = {p:1/4}', 200, 252, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dua per tiga kurang seperempat, berapa?',
          clear: true,
          add: eqRow('q', 140, [[2, 3], '−', [1, 4], '=', '?'], { size: 46 }),
          ask: {
            options: [
              { t: '5/12', ok: true, why: 'Samakan penyebut jadi 12: 8/12 − 3/12.' },
              { t: '1/1', why: 'Pembilang dan penyebut tidak dikurangkan langsung. Samakan penyebutnya dulu: 8/12 − 3/12.' },
              { t: '1/12', why: 'Saat penyebut 3 dikali 4, pembilangnya juga dikali 4: 2/3 = 8/12, bukan 4/12.' },
            ],
          },
        },
        {
          say: 'Dua per tiga sama dengan 8 per 12. Seperempat sama dengan 3 per 12. 8 per 12 kurang 3 per 12 sama dengan 5 per 12.',
          clear: true,
          add: [...eqRow('a', 80, [[2, 3], '=', [8, 12]], { size: 30 }), ...eqRow('b', 150, [[1, 4], '=', [3, 12]], { size: 30 }), ...eqRow('c', 230, [[8, 12], '−', [3, 12], '=', [5, 12, { c: 'pos' }]], { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '3/8 + 1/8 = …',
      ans: ['4/8'],
      wrong: { '4/16': 'Penyebut tidak dijumlahkan. Ukuran potongannya tetap perdelapan, jadi 4/8.' },
      hint: 'Penyebutnya sudah sama, jadi cukup jumlahkan pembilangnya.',
      steps: ['Penyebut sama, jumlahkan pembilang: 3 + 1 = 4.', 'Hasilnya 4/8, yang senilai dengan 1/2.'],
    },
    {
      q: '2/5 + 1/3 = …',
      options: [
        { t: '11/15', ok: true },
        { t: '3/8', why: 'Ini menjumlahkan pembilang dengan pembilang dan penyebut dengan penyebut. Samakan penyebutnya dulu.' },
        { t: '3/15', why: 'Saat penyebut diubah jadi 15, pembilang juga harus dikali: 2/5 = 6/15 dan 1/3 = 5/15.' },
        { t: '7/15', why: '1/3 sama dengan 5/15, bukan 1/15. Pembilangnya ikut dikali 5.' },
      ],
      steps: ['KPK dari 5 dan 3 adalah 15.', '2/5 = 6/15 dan 1/3 = 5/15.', '6/15 + 5/15 = 11/15.'],
    },
    {
      type: 'num',
      q: '5/6 − 1/4 = …',
      ans: ['7/12'],
      wrong: {
        '4/2': 'Pembilang dan penyebut tidak dikurangkan langsung. Samakan penyebutnya dulu.',
        '2': 'Pembilang dan penyebut tidak dikurangkan langsung. Samakan penyebutnya dulu.',
        '4/12': '5/6 sama dengan 10/12, bukan 5/12. Pembilangnya juga dikali 2.',
      },
      steps: ['KPK dari 6 dan 4 adalah 12.', '5/6 = 10/12 dan 1/4 = 3/12.', '10/12 − 3/12 = 7/12.'],
    },
    {
      q: 'Ibu membeli 3/4 kg gula, lalu memakai 1/3 kg untuk membuat kue. Sisa gula ibu adalah …',
      options: [
        { t: '5/12 kg', ok: true },
        { t: '2 kg', why: 'Ini mengurangkan pembilang dan penyebut langsung: (3 − 1)/(4 − 3). Samakan penyebutnya dulu.' },
        { t: '13/12 kg', why: 'Ini menjumlahkan, padahal gulanya dipakai sehingga berkurang.' },
        { t: '2/1 kg', why: 'Sisa gula tidak mungkin lebih banyak dari gula awal (3/4 kg).' },
      ],
      steps: ['Sisa = 3/4 − 1/3.', 'Samakan penyebut jadi 12: 9/12 − 4/12.', 'Hasilnya 5/12 kg.'],
    },
    {
      type: 'num',
      q: '1 1/2 + 2 3/4 = …',
      ans: ['4 1/4'],
      numHint: 'Pecahan campuran ditulis dengan spasi, misalnya 3 1/2. Boleh juga pecahan biasa (17/4) atau desimal (4,25).',
      wrong: { '3 4/6': 'Penyebut tidak dijumlahkan. 1/2 + 3/4 = 2/4 + 3/4 = 5/4 = 1 1/4, lalu ditambah 3.', '3 1/4': 'Bagian pecahannya 5/4 lebih dari 1, jadi 1 utuhnya ikut ditambahkan ke bagian bulat.' },
      steps: ['Bagian bulat: 1 + 2 = 3.', 'Bagian pecahan: 1/2 + 3/4 = 2/4 + 3/4 = 5/4 = 1 1/4.', 'Total: 3 + 1 1/4 = 4 1/4.'],
    },
  ],
};

// ---------- 2.3 Perkalian dan pembagian pecahan ----------
const l3 = {
  id: 'b2-3',
  title: 'Mengalikan dan Membagi Pecahan',
  hook: 'Kenapa dikali malah jadi lebih kecil, dan dibagi malah jadi lebih besar? Lihat dengan model luas dan potongan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Setengah kali sepertiga, berapa?',
          add: eqRow('q', 140, [[1, 2], '×', [1, 3], '=', '?'], { size: 48 }),
          ask: {
            options: [
              { t: '1/6', ok: true, why: 'Hasil kali dua pecahan yang kurang dari 1 justru makin kecil. Kita lihat kenapa.' },
              { t: '2/6', why: 'Pembilang dikali pembilang: 1 × 1 = 1, bukan 2.' },
              { t: '2/5', why: 'Ini menjumlahkan pembilang dan penyebut. Perkalian pecahan tidak begitu.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kali artinya "dari"',
      steps: [
        {
          say: 'Setengah kali sepertiga artinya setengah dari sepertiga. Mulai dari sepertiga: persegi panjang dibagi 3, diarsir 1.',
          clear: true,
          add: [...eqRow('q', 44, [[1, 2], '×', [1, 3]], { size: 26 }), ...areaCells('c', 200, 152, 240, 150, 1, 3, (r, c) => (c === 0 ? 'pos-soft' : 'paper'))],
        },
        {
          say: 'Sekarang ambil setengahnya. Bagi menjadi 2 baris, lalu ambil 1 baris dari bagian yang diarsir.',
          del: ['c*'],
          add: areaCells('g', 200, 152, 240, 150, 2, 3, (r, c) => (c === 0 ? (r === 0 ? 'pos' : 'pos-soft') : 'paper')),
          pulse: ['g0_0'],
        },
        {
          say: 'Persegi panjang itu sekarang punya 6 kotak sama besar. Yang diarsir tebal hanya 1. Jadi setengah kali sepertiga sama dengan seperenam.',
          add: [T('res', '1 dari 6 kotak, jadi hasilnya 1/6', 200, 258, { size: 20 })],
        },
      ],
    },
    {
      title: 'Aturannya',
      steps: [
        {
          say: 'Dua per tiga kali tiga per empat. Arsir dua per tiga: 2 dari 3 kolom.',
          clear: true,
          add: [...eqRow('q', 40, [[2, 3], '×', [3, 4]], { size: 24 }), ...areaCells('g', 200, 145, 240, 150, 4, 3, (r, c) => (c < 2 ? 'pos-soft' : 'paper'))],
        },
        {
          say: 'Lalu arsir tiga per empat: 3 dari 4 baris. Daerah yang terarsir dua kali ada 6 kotak dari 12 kotak.',
          set: areaFill('g', 4, 3, (r, c) => (c < 2 && r < 3 ? 'pos' : c < 2 ? 'pos-soft' : r < 3 ? 'acc-soft' : 'paper')),
        },
        {
          say: '6 adalah 2 kali 3, dan 12 adalah 3 kali 4. Jadi pembilang dikali pembilang, penyebut dikali penyebut. Hasilnya 6 per 12, sama dengan setengah.',
          add: eqRow('r', 258, [['2 × 3', '3 × 4'], '=', [6, 12], '=', [1, 2]], { size: 24 }),
        },
      ],
    },
    {
      title: 'Pembagian: ada berapa?',
      steps: [
        {
          say: 'Pembagian menanyakan: ada berapa banyak? 3 dibagi seperempat artinya, dalam 3 utuh ada berapa potong seperempat?',
          clear: true,
          add: [...eqRow('q', 44, ['3', '÷', [1, 4], '=', '?'], { size: 28 }), bar('b0', 200, 108, 1, 1, { w: 280, fc: 'pos-soft' }), bar('b1', 200, 156, 1, 1, { w: 280, fc: 'pos-soft' }), bar('b2', 200, 204, 1, 1, { w: 280, fc: 'pos-soft' })],
        },
        {
          say: 'Potong setiap utuh menjadi 4. Ada 3 kali 4, yaitu 12 potong.',
          set: { b0: { parts: 4, lab: '1/4' }, b1: { parts: 4, lab: '1/4' }, b2: { parts: 4, lab: '1/4' } },
        },
        {
          say: 'Jadi 3 dibagi seperempat sama dengan 12, sama dengan 3 kali 4.',
          set: { q4: { text: '12', c: 'pos' } },
          add: [T('r', 'sama dengan 3 × 4 = 12', 200, 258, { size: 22 })],
        },
      ],
    },
    {
      title: 'Kali kebalikannya',
      steps: [
        {
          say: 'Dua per tiga dibagi seperenam. Ada berapa potong seperenam di dalam dua per tiga?',
          clear: true,
          add: [...eqRow('q', 44, [[2, 3], '÷', [1, 6], '=', '?'], { size: 28 }), bar('a', 200, 120, 3, 2, { h: 44 })],
        },
        {
          say: 'Potong menjadi seperenam. Dua per tiga sama dengan 4 potong seperenam. Jawabannya 4.',
          set: { a: { parts: 6, filled: 4, lab: ['1', '2', '3', '4', '', ''] }, q4: { text: '4', c: 'pos' } },
        },
        {
          say: 'Hasil yang sama didapat dengan mengalikan kebalikan pembaginya. Seperenam dibalik menjadi 6 per 1. Dua per tiga kali 6 sama dengan 12 per 3, yaitu 4.',
          add: [...eqRow('r', 196, [[2, 3], '×', [6, 1], '=', [12, 3], '=', '4'], { size: 26 }), T('rk', 'membagi = mengalikan dengan kebalikan pembagi', 200, 258, { size: 16, w: 800, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tiga per empat dibagi tiga per delapan, berapa?',
          clear: true,
          add: eqRow('q', 140, [[3, 4], '÷', [3, 8], '=', '?'], { size: 46 }),
          ask: {
            options: [
              { t: '2', ok: true, why: 'Dalam 3/4 ada dua kelompok 3/8.' },
              { t: '9/32', why: 'Ini mengalikan langsung tanpa membalik pembagi.' },
              { t: '1/2', why: 'Yang dibalik harus pembaginya (3/8), bukan pecahan yang dibagi (3/4).' },
            ],
          },
        },
        {
          say: 'Tiga per empat sama dengan 6 per 8. Di dalamnya ada dua kelompok 3 per 8. Jadi jawabannya 2.',
          clear: true,
          add: [
            bar('a', 200, 100, 8, null, { colors: ['pos', 'pos', 'pos', 'acc', 'acc', 'acc', null, null], h: 44 }),
            T('g1', 'kelompok 1', 106, 140, { size: 15, c: 'pos' }),
            T('g2', 'kelompok 2', 219, 140, { size: 15, c: 'acc' }),
            ...eqRow('r', 222, [[3, 4], '×', [8, 3], '=', [24, 12], '=', '2'], { size: 28 }),
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '2/5 × 3/4 = …',
      ans: ['6/20'],
      wrong: { '5/9': 'Ini menjumlahkan pembilang dan penyebut, bukan mengalikan.', '8/15': 'Ini mengalikan silang. Pada perkalian, pembilang dikali pembilang dan penyebut dikali penyebut.' },
      steps: ['Pembilang × pembilang: 2 × 3 = 6.', 'Penyebut × penyebut: 5 × 4 = 20.', '6/20 = 3/10.'],
    },
    {
      q: '4 × 3/8 = …',
      options: [
        { t: '1 1/2', ok: true },
        { t: '12/32', why: 'Bilangan 4 sama dengan 4/1, jadi penyebutnya dikali 1, bukan 4.' },
        { t: '3/32', why: '4 dikalikan ke pembilang, bukan ke penyebut.' },
        { t: '4 3/8', why: 'Ini menuliskan 4 dan 3/8 berdampingan (penjumlahan), bukan mengalikan.' },
      ],
      steps: ['4 × 3/8 = 12/8.', '12/8 = 3/2 = 1 1/2.'],
    },
    {
      type: 'num',
      q: '5/6 ÷ 5/12 = …',
      ans: ['2'],
      wrong: { '25/72': 'Pembagian dikerjakan dengan mengalikan kebalikan pembagi: 5/6 × 12/5.', '1/2': 'Yang dibalik harus pembaginya (5/12), bukan 5/6.' },
      steps: ['5/6 ÷ 5/12 = 5/6 × 12/5.', '= 60/30 = 2.', 'Cek: dalam 5/6 = 10/12 ada dua kelompok 5/12.'],
    },
    {
      q: 'Pita sepanjang 6 m dipotong-potong, setiap potong panjangnya 3/4 m. Banyak potongan pita adalah …',
      options: [
        { t: '8', ok: true },
        { t: '4 1/2', why: 'Ini 6 × 3/4. Kita mencari ada berapa potong 3/4 m dalam 6 m, jadi dibagi.' },
        { t: '6 3/4', why: 'Ini menjumlahkan 6 dan 3/4.' },
        { t: '18', why: '6 ÷ 3/4 = 6 × 4/3, bukan 6 × 3.' },
      ],
      steps: ['Banyak potongan = 6 ÷ 3/4.', '= 6 × 4/3 = 24/3 = 8 potong.'],
    },
    {
      q: 'Luas persegi panjang dengan panjang 2/3 m dan lebar 3/5 m adalah …',
      options: [
        { t: '2/5 m²', ok: true },
        { t: '19/15 m²', why: 'Ini menjumlahkan panjang dan lebar. Luas = panjang × lebar.' },
        { t: '5/8 m²', why: 'Ini menjumlahkan pembilang dan penyebut.' },
        { t: '10/9 m²', why: 'Ini membagi panjang dengan lebar. Luas = panjang × lebar.' },
      ],
      steps: ['Luas = 2/3 × 3/5.', '= 6/15 = 2/5 m².'],
    },
  ],
};

// ---------- 2.4 Desimal dan persen ----------
const l4 = {
  id: 'b2-4',
  title: 'Desimal dan Persen',
  hook: 'Mana yang lebih besar, 0,5 atau 0,45? Banyak yang memilih 0,45 karena 45 lebih besar dari 5.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mana yang lebih besar, 0,5 atau 0,45?',
          add: [T('q', 'Mana yang lebih besar?', 200, 70, { size: 22, w: 700 }), T('a', '0,5', 130, 150, { size: 52 }), T('b', '0,45', 270, 150, { size: 52 })],
          ask: {
            options: [
              { t: '0,5', ok: true, why: '0,5 sama dengan 0,50, yaitu 50 perseratus.' },
              { t: '0,45', why: 'Banyak yang membandingkan 5 dengan 45. Padahal 0,5 = 0,50, yaitu 50 perseratus, lebih besar dari 45 perseratus.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Persepuluhan dan perseratusan',
      steps: [
        {
          say: 'Angka pertama di belakang koma adalah persepuluhan. 0,5 artinya 5 dari 10 bagian.',
          clear: true,
          add: [bar('t', 200, 100, 10, 5, { w: 320, h: 42 }), ...eqRow('tl', 170, ['0,5', '=', [5, 10]], { size: 28 })],
        },
        {
          say: 'Sekarang bagi menjadi 100 kotak. 0,5 sama dengan 0,50, yaitu 50 kotak. 0,45 adalah 45 kotak.',
          clear: true,
          add: [
            { id: 'g1', t: 'grid', x: 110, y: 135, rows: 10, cols: 10, cell: 15, filled: 50, fc: 'pos' },
            { id: 'g2', t: 'grid', x: 290, y: 135, rows: 10, cols: 10, cell: 15, filled: 45, fc: 'acc' },
            T('l1', '0,50 = 50 kotak', 110, 232, { size: 18 }),
            T('l2', '0,45 = 45 kotak', 290, 232, { size: 18 }),
          ],
        },
        { say: '50 kotak lebih banyak dari 45 kotak. Jadi 0,5 lebih besar.', add: [T('c', '0,5 > 0,45', 200, 270, { size: 26 })], pulse: ['g1'] },
      ],
    },
    {
      title: 'Pecahan ke desimal',
      steps: [
        {
          say: 'Untuk mengubah pecahan ke desimal, ubah penyebutnya menjadi 10 atau 100. Tiga per empat sama dengan 75 per 100, yaitu 0,75.',
          clear: true,
          add: eqRow('r1', 70, [[3, 4], '=', ['3 × 25', '4 × 25'], '=', [75, 100], '=', '0,75'], { size: 26 }),
        },
        { say: 'Dua per lima sama dengan 4 per 10, yaitu 0,4.', add: eqRow('r2', 150, [[2, 5], '=', ['2 × 2', '5 × 2'], '=', [4, 10], '=', '0,4'], { size: 26 }) },
        {
          say: 'Ada juga yang tidak berhenti. Sepertiga sama dengan 0,333 dan seterusnya, angka 3 berulang terus.',
          add: [...eqRow('r3', 225, [[1, 3], '=', '0,333…'], { size: 26 }), T('n3', 'angka 3 berulang terus', 200, 270, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Persen',
      steps: [
        {
          say: 'Persen artinya per seratus. 25 persen berarti 25 dari 100 kotak.',
          clear: true,
          add: [{ id: 'g', t: 'grid', x: 120, y: 150, rows: 10, cols: 10, cell: 17, filled: 25, fc: 'acc' }, T('p', '25%', 300, 95, { size: 44 })],
        },
        {
          say: 'Jadi 25 persen sama dengan 25 per 100, sama dengan seperempat, sama dengan 0,25.',
          add: [...eqRow('p2', 160, ['=', [25, 100]], { size: 26, cx: 300 }), ...eqRow('p3', 222, ['=', [1, 4], '=', '0,25'], { size: 26, cx: 300 })],
        },
      ],
    },
    {
      title: 'Tiga bentuk, satu nilai',
      steps: [
        {
          say: 'Pecahan, desimal, dan persen hanyalah tiga cara menulis nilai yang sama. Ini pasangan yang paling sering dipakai.',
          clear: true,
          add: [
            table(
              'tab',
              200,
              150,
              [
                ['Pecahan', 'Desimal', 'Persen'],
                ['1/2', '0,5', '50%'],
                ['1/4', '0,25', '25%'],
                ['3/4', '0,75', '75%'],
                ['1/5', '0,2', '20%'],
                ['1/10', '0,1', '10%'],
              ],
              { cw: [100, 100, 100], rh: 38, size: 18, head: true },
            ),
          ],
        },
      ],
    },
    {
      title: 'Persen dari harga',
      steps: [
        {
          say: 'Harga baju 50 ribu rupiah, diskon 20 persen. Berapa yang harus dibayar?',
          clear: true,
          add: [T('q', 'Rp50.000, diskon 20%', 200, 50, { size: 24 }), bar('b', 200, 125, 1, 1, { w: 330, h: 46, fc: 'pos-soft', lab: 'Rp50.000 = 100%' })],
        },
        { say: 'Seratus persen dibagi menjadi 5 bagian. Masing-masing 20 persen.', set: { b: { parts: 5, filled: 5, lab: '20%' } } },
        {
          say: 'Setiap bagian bernilai 50 ribu dibagi 5, yaitu 10 ribu rupiah.',
          set: { b: { lab: '10.000' } },
          add: [T('c', 'Rp50.000 ÷ 5 = Rp10.000', 200, 185, { size: 20 })],
        },
        {
          say: 'Diskonnya satu bagian, 10 ribu rupiah. Yang dibayar 4 bagian, yaitu 40 ribu rupiah.',
          set: { b: { colors: ['neg-soft', 'pos-soft', 'pos-soft', 'pos-soft', 'pos-soft'] } },
          add: [T('d', 'diskon Rp10.000', 85, 92, { size: 14, c: 'neg' }), T('pay', 'dibayar Rp40.000', 200, 245, { size: 24, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Urutkan dari yang terkecil: 0,3, seperempat, dan 28 persen.',
          clear: true,
          add: [T('q', 'Urutkan dari yang terkecil', 200, 70, { size: 20, w: 700 }), T('a', '0,3', 90, 150, { size: 38 }), F('b', 1, 4, 200, 150, { size: 38 }), T('c', '28%', 310, 150, { size: 38 })],
          ask: {
            options: [
              { t: '1/4, 28%, 0,3', ok: true, why: 'Ubah ke desimal: 0,25; 0,28; 0,30.' },
              { t: '0,3, 1/4, 28%', why: 'Ubah semuanya ke bentuk yang sama dulu. 1/4 = 0,25 dan 28% = 0,28, keduanya lebih kecil dari 0,3.' },
              { t: '28%, 1/4, 0,3', why: '28% = 0,28, lebih besar dari 1/4 = 0,25.' },
            ],
          },
        },
        {
          say: 'Ubah semuanya ke desimal. Seperempat sama dengan 0,25. 28 persen sama dengan 0,28. 0,3 sama dengan 0,30. Jadi urutannya seperempat, 28 persen, lalu 0,3.',
          set: { a: { x: 310, y: 120, size: 30 }, b: { x: 90, y: 120, size: 30 }, c: { x: 200, y: 120, size: 30 } },
          add: [T('d1', '0,25', 90, 190, { size: 26, c: 'pos' }), T('d2', '0,28', 200, 190, { size: 26, c: 'pos' }), T('d3', '0,30', 310, 190, { size: 26, c: 'pos' }), T('o', '<', 145, 190, { size: 26 }), T('o2', '<', 255, 190, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bilangan terbesar di antara 0,7; 0,65; 0,099; dan 0,8 adalah …',
      options: [
        { t: '0,8', ok: true },
        { t: '0,65', why: '65 memang lebih besar dari 8, tapi 0,65 = 65 perseratus, sedangkan 0,8 = 80 perseratus.' },
        { t: '0,099', why: 'Angka di belakang koma yang lebih banyak tidak membuat bilangannya lebih besar. 0,099 bahkan kurang dari 0,1.' },
        { t: '0,7', why: '0,7 = 70 perseratus, lebih kecil dari 0,8 = 80 perseratus.' },
      ],
      steps: ['Samakan banyak angka di belakang koma: 0,700; 0,650; 0,099; 0,800.', 'Yang terbesar 0,800, yaitu 0,8.'],
    },
    {
      type: 'num',
      q: '3/5 dalam bentuk desimal adalah …',
      ans: ['0.6'],
      inputmode: 'decimal',
      numHint: 'Desimal boleh ditulis dengan koma atau titik, misalnya 0,6.',
      wrong: { '3.5': 'Pecahan 3/5 bukan "3 koma 5". Ubah penyebut jadi 10: 3/5 = 6/10 = 0,6.', '0.35': 'Ubah penyebut jadi 10: 3/5 = 6/10 = 0,6.' },
      steps: ['Ubah penyebut menjadi 10: 3/5 = 6/10.', '6/10 = 0,6.'],
    },
    {
      type: 'num',
      q: '0,08 dalam bentuk persen adalah …',
      ans: ['8'],
      unit: '%',
      inputmode: 'decimal',
      wrong: { '80': '0,08 = 8/100 = 8%. Yang sama dengan 80% adalah 0,8.', '0.8': 'Persen berarti per seratus: 0,08 = 8/100 = 8%.' },
      steps: ['0,08 = 8/100.', 'Per seratus = persen, jadi 8%.'],
    },
    {
      q: 'Harga sepatu Rp200.000 mendapat diskon 15%. Harga yang harus dibayar adalah …',
      options: [
        { t: 'Rp170.000', ok: true },
        { t: 'Rp30.000', why: 'Itu besar diskonnya. Yang dibayar = harga awal − diskon.' },
        { t: 'Rp185.000', why: 'Diskon 15% bukan Rp15.000. 15% dari Rp200.000 = Rp30.000.' },
        { t: 'Rp230.000', why: 'Diskon mengurangi harga, bukan menambah.' },
      ],
      steps: ['Diskon = 15/100 × 200.000 = 30.000.', 'Dibayar = 200.000 − 30.000 = Rp170.000.'],
    },
    {
      q: 'Dari 40 siswa, 30% suka bola voli. Banyak siswa yang suka bola voli adalah …',
      options: [
        { t: '12 siswa', ok: true },
        { t: '30 siswa', why: '30% bukan 30 orang. 30% dari 40 = 30/100 × 40.' },
        { t: '10 siswa', why: '30% dari 40 = 30/100 × 40 = 12.' },
        { t: '28 siswa', why: '28 adalah yang tidak suka voli (70%).' },
      ],
      steps: ['30% dari 40 = 30/100 × 40.', '= 1.200/100 = 12 siswa.'],
    },
  ],
};

export default {
  id: 'b2',
  no: 2,
  title: 'Bilangan Rasional',
  desc: 'Pecahan, pecahan senilai, operasi pecahan, desimal, dan persen.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: 'Nilai dari 1/2 + 0,25 + 10% adalah …',
      options: [
        { t: '0,85', ok: true },
        { t: '0,37', why: '1/2 bukan 0,12. Ubah ke desimal dengan benar: 1/2 = 0,5 dan 10% = 0,1.' },
        { t: '10,75', why: '10% sama dengan 0,1, bukan 10.' },
      ],
      steps: ['1/2 = 0,5 dan 10% = 0,1.', '0,5 + 0,25 + 0,1 = 0,85.'],
    },
    {
      type: 'num',
      q: '{n:−3/4} + 1/2 = …',
      ans: ['-1/4'],
      wrong: { '1/4': 'Bagian negatif (3/4) lebih besar daripada bagian positif (1/2 = 2/4), jadi hasilnya negatif.', '-5/4': 'Tandanya berbeda, jadi bukan dijumlahkan. {n:−3/4} + 2/4 = {n:−1/4}.' },
      steps: ['1/2 = 2/4.', '{n:−3/4} + 2/4 = {n:−1/4}.'],
    },
    {
      q: 'Ayah memiliki tanah seluas 1/2 hektare. Sebanyak 2/5 bagian dari tanah itu ditanami jagung. Luas tanah yang ditanami jagung adalah …',
      options: [
        { t: '1/5 hektare', ok: true },
        { t: '9/10 hektare', why: 'Ini menjumlahkan. "2/5 bagian dari" berarti dikali.' },
        { t: '5/4 hektare', why: 'Ini membagi. "2/5 bagian dari" berarti dikali.' },
        { t: '3/7 hektare', why: 'Ini menjumlahkan pembilang dan penyebut.' },
      ],
      steps: ['2/5 bagian dari 1/2 = 2/5 × 1/2.', '= 2/10 = 1/5 hektare.'],
    },
  ],
};
