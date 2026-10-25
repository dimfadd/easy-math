// Kelas 2 · Bab 1: Membilang sampai 50 (puluhan dan satuan)
import { T, table } from '../helpers.js';
import { unit, blocks, U } from './kit.js';

const Y = 130;

// ---------- 1.1 Puluhan dan satuan ----------
const l1 = {
  id: 'k2b1-1',
  title: 'Puluhan dan Satuan',
  hook: 'Sepuluh satuan dikumpulkan menjadi satu puluhan. Bilangan 34 berarti 3 puluhan dan 4 satuan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Satu balok biru berisi 10 kubus. Ada 3 balok biru dan 4 kubus kuning. Bilangan berapa ini?',
          add: blocks('b', 3, 4, 140, Y, { gap: 24 }),
          ask: {
            options: [
              { t: '34', ok: true, why: '3 balok berarti 3 puluhan: 30. Ditambah 4 satuan: 34.' },
              { t: '7', why: 'Setiap balok berisi 10, bukan 1. 3 balok = 30.' },
              { t: '43', why: 'Puluhannya 3 dan satuannya 4, jadi 34, bukan 43.' },
              { t: '304', why: '30 dan 4 ditulis 34.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sepuluh jadi satu puluhan',
      steps: [
        {
          say: 'Ada 10 kubus satuan. Hitung: satu sampai sepuluh.',
          clear: true,
          add: Array.from({ length: 10 }, (_, i) => unit(`u${i}`, 80 + i * 26, 80)),
        },
        {
          say: 'Tumpuk kesepuluh kubus menjadi satu balok. Satu balok berisi 10. Kita sebut satu puluhan.',
          set: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`u${i}`, { x: 200, y: 215 - i * U }])),
          add: [T('a', '10 satuan = 1 puluhan', 200, 270, { size: 22, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Membaca bilangan',
      steps: [
        {
          say: '2 puluhan dan 3 satuan. 2 puluhan adalah 20. Ditambah 3, menjadi 23, dua puluh tiga.',
          clear: true,
          add: [...blocks('b', 2, 3, 80, Y, { gap: 24 }), T('a', '2 puluhan, 3 satuan', 290, 90, { size: 18 }), T('b', '= 23', 290, 130, { size: 34, c: 'ok' }), T('c', 'dua puluh tiga', 290, 170, { size: 16, c: 'mut' })],
        },
        {
          say: 'Pada bilangan 23, angka 2 di depan menunjukkan puluhan. Angka 3 di belakang menunjukkan satuan.',
          add: [table('tb', 200, 250, [['puluhan', 'satuan'], ['2', '3']], { cw: [90, 90], rh: 30, size: 18, head: true })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Bilangan berapa ini?',
          clear: true,
          add: blocks('b', 4, 7, 110, Y, { gap: 24 }),
          ask: {
            options: [
              { t: '47', ok: true, why: '4 puluhan = 40, ditambah 7 satuan = 47.' },
              { t: '74', why: 'Balok puluhan ada 4, kubus satuan ada 7. Puluhan ditulis di depan: 47.' },
              { t: '11', why: 'Setiap balok bernilai 10. 4 balok = 40.' },
              { t: '407', why: '40 dan 7 ditulis 47.' },
            ],
          },
        },
        {
          say: '4 puluhan dan 7 satuan. Empat puluh tujuh.',
          add: [T('a', '40 + 7 = {g:47}', 200, 250, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Bilangan berapa ini?',
      fig: blocks('f', 2, 5, 140, 150, { gap: 24 }),
      ans: ['25'],
      wrong: { '52': 'Puluhan ditulis di depan: 2 puluhan, 5 satuan.', '7': 'Setiap balok bernilai 10.' },
      steps: ['2 puluhan = 20, 5 satuan.', '= 25.'],
    },
    {
      type: 'num',
      q: '3 puluhan dan 8 satuan adalah …',
      ans: ['38'],
      wrong: { '83': 'Puluhan ditulis di depan.', '11': '3 puluhan = 30, bukan 3.' },
      steps: ['30 + 8.', '= 38.'],
    },
    {
      type: 'num',
      q: 'Pada bilangan 46, angka 4 menunjukkan berapa puluhan?',
      ans: ['4'],
      wrong: { '6': '6 adalah satuannya.', '40': 'Nilainya 40, tetapi banyak puluhannya 4.' },
      steps: ['46 = 4 puluhan dan 6 satuan.'],
    },
    {
      type: 'num',
      q: 'Empat puluh dua ditulis …',
      ans: ['42'],
      wrong: { '24': 'Empat puluh = 4 puluhan, ditulis di depan.', '402': 'Empat puluh dua ditulis 42.' },
      steps: ['4 puluhan dan 2 satuan.', '= 42.'],
    },
    {
      type: 'num',
      q: '50 = … puluhan',
      ans: ['5'],
      wrong: { '50': 'Banyak puluhannya: 50 ÷ 10.', '0': '0 adalah satuannya.' },
      steps: ['50 = 5 puluhan dan 0 satuan.'],
    },
  ],
};

// ---------- 1.2 Membandingkan dan mengurutkan ----------
const l2 = {
  id: 'k2b1-2',
  title: 'Membandingkan dan Mengurutkan',
  hook: 'Untuk membandingkan dua bilangan, lihat puluhannya dulu. Kalau puluhannya sama, baru lihat satuannya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mana yang lebih besar, 32 atau 28?',
          add: [T('a', '32', 130, 110, { size: 50, c: 'pos' }), T('b', '28', 270, 110, { size: 50, c: 'acc' })],
          ask: {
            options: [
              { t: '32', ok: true, why: '32 punya 3 puluhan, 28 hanya 2 puluhan.' },
              { t: '28', why: 'Angka 8 memang lebih besar dari 2, tetapi itu satuan. Lihat puluhannya dulu.' },
              { t: 'sama besar', why: 'Puluhannya berbeda, jadi tidak sama besar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Lihat puluhan dulu',
      steps: [
        {
          say: '32 adalah 3 balok dan 2 kubus. 28 adalah 2 balok dan 8 kubus.',
          clear: true,
          add: [...blocks('a', 3, 2, 60, Y, { gap: 22 }), T('la', '32', 100, 225, { size: 28, c: 'pos' }), ...blocks('b', 2, 8, 250, Y, { gap: 22 }), T('lb', '28', 290, 225, { size: 28, c: 'acc' })],
        },
        {
          say: 'Satu balok lebih banyak dari 8 kubus, karena satu balok berisi 10. Jadi 32 lebih besar dari 28.',
          hl: ['ar2'],
          add: [T('k', '32 {g:lebih besar} dari 28', 200, 265, { size: 22 })],
        },
      ],
    },
    {
      title: 'Puluhan sama, lihat satuan',
      steps: [
        {
          say: '45 dan 41 sama-sama punya 4 puluhan. Bandingkan satuannya: 5 lebih besar dari 1. Jadi 45 lebih besar.',
          clear: true,
          add: [T('a', '45   dan   41', 200, 80, { size: 34 }), T('b', 'puluhan sama: 4 dan 4', 200, 140, { size: 18, c: 'mut' }), T('c', 'satuan: 5 > 1', 200, 175, { size: 20, c: 'pos' }), T('d', '45 {g:lebih besar}', 200, 225, { size: 26 })],
        },
      ],
    },
    {
      title: 'Mengurutkan',
      steps: [
        {
          say: 'Urutkan 27, 41, 19, dan 35 dari yang terkecil. Lihat puluhannya: 1, 2, 3, 4.',
          clear: true,
          add: [T('a', '27   41   19   35', 200, 80, { size: 30 }), T('b', '19 → 27 → 35 → 41', 200, 160, { size: 30, c: 'ok' }), T('c', 'kecil ke besar', 200, 200, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Mana yang lebih kecil, 39 atau 43?',
          clear: true,
          add: [T('a', '39', 130, 110, { size: 50, c: 'pos' }), T('b', '43', 270, 110, { size: 50, c: 'acc' })],
          ask: {
            options: [
              { t: '39', ok: true, why: '39 punya 3 puluhan, 43 punya 4 puluhan. 39 lebih kecil.' },
              { t: '43', why: 'Satuan 3 memang kecil, tetapi puluhan 43 lebih besar.' },
              { t: 'sama besar', why: 'Puluhannya berbeda.' },
            ],
          },
        },
        {
          say: 'Puluhan 3 lebih kecil dari puluhan 4. Jadi 39 lebih kecil dari 43.',
          add: [T('k', '39 {n:lebih kecil} dari 43', 200, 200, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Mana yang lebih besar?',
      options: [
        { t: '41', ok: true },
        { t: '29', why: 'Puluhan 41 adalah 4, puluhan 29 adalah 2.' },
      ],
      steps: ['Bandingkan puluhan: 4 > 2.', '41 lebih besar.'],
    },
    {
      q: 'Mana yang lebih kecil?',
      options: [
        { t: '34', ok: true },
        { t: '37', why: 'Puluhan sama. Satuan 4 < 7.' },
      ],
      steps: ['Puluhan sama: 3.', 'Satuan 4 < 7: 34 lebih kecil.'],
    },
    {
      type: 'num',
      q: 'Bilangan terbesar dari 18, 46, 32, 29 adalah …',
      ans: ['46'],
      wrong: { '29': 'Satuan 9 memang besar, tetapi lihat puluhannya.', '32': '46 punya 4 puluhan.' },
      steps: ['Puluhan terbesar: 4.', '46.'],
    },
    {
      type: 'num',
      q: 'Bilangan terkecil dari 25, 21, 28, 30 adalah …',
      ans: ['21'],
      wrong: { '30': '30 justru terbesar.', '25': 'Satuan 1 lebih kecil dari 5.' },
      steps: ['Puluhan 2 paling kecil: 25, 21, 28.', 'Satuan terkecil: 1. Jawabannya 21.'],
    },
    {
      type: 'num',
      q: 'Bilangan sesudah 39 adalah …',
      ans: ['40'],
      wrong: { '310': 'Sesudah 39 adalah 40: 9 satuan tambah 1 menjadi puluhan baru.', '38': '38 datang sebelum 39.' },
      steps: ['39 + 1.', '= 40.'],
    },
  ],
};

export default {
  id: 'k2b1',
  no: 1,
  title: 'Membilang sampai 50',
  desc: 'Puluhan dan satuan dengan balok, membaca dan menulis bilangan sampai 50, serta membandingkan dan mengurutkan.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: '2 puluhan dan 9 satuan adalah …',
      ans: ['29'],
      wrong: { '92': 'Puluhan ditulis di depan.', '11': '2 puluhan = 20.' },
      steps: ['20 + 9 = 29.'],
    },
    {
      type: 'num',
      q: 'Pada bilangan 37, angka 7 menunjukkan berapa satuan?',
      ans: ['7'],
      wrong: { '3': '3 adalah puluhannya.', '70': '7 ada di tempat satuan, nilainya 7.' },
      steps: ['37 = 3 puluhan, 7 satuan.'],
    },
    {
      q: 'Urutan dari yang terkecil adalah …',
      options: [
        { t: '15, 23, 31, 48', ok: true },
        { t: '48, 31, 23, 15', why: 'Itu dari yang terbesar.' },
        { t: '15, 31, 23, 48', why: '23 lebih kecil dari 31.' },
      ],
      steps: ['Bandingkan puluhan: 1, 2, 3, 4.'],
    },
  ],
};
