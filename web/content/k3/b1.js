// Kelas 3 · Bab 1: Bilangan Cacah sampai 1.000
import { T, table } from '../helpers.js';
import { flat, hto } from './kit.js';

const Y = 110;
// Angka bersusun: setiap digit di kolomnya (ratusan, puluhan, satuan)
const XS = [175, 210, 245];
const D = (p, str, y, o = {}) => [...str].map((ch, i) => T(`${p}${i}`, ch, XS[i], y, { size: 34, ...o }));
const op = (id, ch, y) => T(id, ch, 140, y, { size: 34 });
const bar = { id: 'ln', t: 'line', x: 125, y: 148, x2: 265, y2: 148, sw: 3, draw: false };

// ---------- 1.1 Ratusan, puluhan, satuan ----------
const l1 = {
  id: 'k3b1-1',
  title: 'Ratusan, Puluhan, dan Satuan',
  hook: 'Sepuluh puluhan menjadi satu ratusan. Bilangan 245 berarti 2 ratusan, 4 puluhan, dan 5 satuan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pelat hijau berisi 100. Batang biru berisi 10. Kubus kuning bernilai 1. Bilangan berapa ini?',
          add: hto('b', 2, 4, 5, 40, Y),
          ask: {
            options: [
              { t: '245', ok: true, why: '2 ratusan = 200, 4 puluhan = 40, 5 satuan = 5. 200 + 40 + 5 = 245.' },
              { t: '11', why: 'Setiap pelat bernilai 100 dan setiap batang bernilai 10.' },
              { t: '2405', why: '200, 40, dan 5 digabung ditulis 245.' },
              { t: '542', why: 'Ratusan ditulis paling depan: 245.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sepuluh puluhan jadi ratusan',
      steps: [
        {
          say: 'Satu batang biru berisi 10 kubus. Ingat dari kelas 2: sepuluh satuan menjadi satu puluhan.',
          clear: true,
          add: hto('a', 0, 10, 0, 110, Y),
        },
        {
          say: 'Sepuluh batang disusun rapat menjadi satu pelat. Satu pelat berisi 100. Inilah satu ratusan.',
          add: [flat('f', 300, Y), T('a', '10 puluhan = 1 ratusan = 100', 200, 210, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Nilai tempat',
      steps: [
        {
          say: 'Bilangan 245: angka 2 di tempat ratusan bernilai 200. Angka 4 di tempat puluhan bernilai 40. Angka 5 di tempat satuan bernilai 5.',
          clear: true,
          add: [...hto('b', 2, 4, 5, 40, 85), table('tb', 200, 205, [['ratusan', 'puluhan', 'satuan'], ['2', '4', '5'], ['200', '40', '5']], { cw: [90, 90, 90], rh: 28, size: 16, head: true })],
        },
        {
          say: 'Jadi 245 sama dengan 200 tambah 40 tambah 5. Dibaca dua ratus empat puluh lima.',
          add: [T('a', '245 = 200 + 40 + 5', 200, 278, { size: 20, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Kalau ada nol',
      steps: [
        {
          say: 'Bilangan 306: 3 ratusan, tidak ada puluhan, dan 6 satuan. Angka 0 di tempat puluhan menjaga angka 3 tetap di tempat ratusan.',
          clear: true,
          add: [...hto('b', 3, 0, 6, 30, 90), T('a', '306 = 300 + 0 + 6', 200, 185, { size: 24, c: 'pos' }), T('b', 'tiga ratus enam', 200, 220, { size: 16, c: 'mut' }), T('c', 'tanpa 0 menjadi 36, jauh berbeda', 200, 250, { size: 15, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Bilangan berapa ini?',
          clear: true,
          add: hto('b', 1, 3, 7, 70, Y),
          ask: {
            options: [
              { t: '137', ok: true, why: '1 ratusan, 3 puluhan, 7 satuan: 100 + 30 + 7 = 137.' },
              { t: '11', why: 'Pelat bernilai 100 dan batang bernilai 10.' },
              { t: '731', why: 'Ratusan ditulis paling depan.' },
              { t: '1307', why: '100, 30, dan 7 digabung ditulis 137.' },
            ],
          },
        },
        {
          say: '1 ratusan, 3 puluhan, 7 satuan. Seratus tiga puluh tujuh.',
          add: [T('a', '100 + 30 + 7 = {g:137}', 200, 220, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '4 ratusan, 2 puluhan, dan 8 satuan adalah …',
      ans: ['428'],
      wrong: { '14': 'Ratusan bernilai 100 dan puluhan bernilai 10.', '824': 'Ratusan ditulis paling depan.' },
      steps: ['400 + 20 + 8.', '= 428.'],
    },
    {
      type: 'num',
      q: 'Nilai angka 6 pada bilangan 362 adalah …',
      ans: ['60'],
      wrong: { '6': 'Angka 6 ada di tempat puluhan, nilainya 60.', '600': '6 ada di tempat puluhan, bukan ratusan.' },
      steps: ['362 = 300 + 60 + 2.', 'Nilai angka 6 = 60.'],
    },
    {
      type: 'num',
      q: 'Lima ratus delapan ditulis …',
      ans: ['508'],
      wrong: { '58': 'Ada ratusan: 500. Puluhannya 0.', '5008': '500 + 8 ditulis 508.' },
      steps: ['500 + 0 + 8.', '= 508.'],
    },
    {
      type: 'num',
      q: 'Bilangan berapa ini?',
      fig: hto('f', 2, 1, 3, 70, 150),
      ans: ['213'],
      wrong: { '6': 'Pelat bernilai 100, batang 10.', '312': 'Ratusan ditulis paling depan.' },
      steps: ['200 + 10 + 3.', '= 213.'],
    },
    {
      type: 'num',
      q: '10 ratusan sama dengan …',
      ans: ['1000'],
      wrong: { '100': 'Satu ratusan = 100. Sepuluh ratusan = 1.000.', '10': '10 ratusan, bukan 10 satuan.' },
      steps: ['100 × 10.', '= 1.000 (seribu).'],
    },
  ],
};

// ---------- 1.2 Membandingkan dan mengurutkan ----------
const l2 = {
  id: 'k3b1-2',
  title: 'Membandingkan Bilangan sampai 1.000',
  hook: 'Bandingkan ratusannya dulu. Kalau sama, bandingkan puluhan. Kalau masih sama, bandingkan satuan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mana yang lebih besar, 298 atau 312?',
          add: [T('a', '298', 120, 110, { size: 50, c: 'pos' }), T('b', '312', 280, 110, { size: 50, c: 'acc' })],
          ask: {
            options: [
              { t: '312', ok: true, why: 'Ratusan 3 lebih besar dari ratusan 2. Angka 9 dan 8 tidak perlu dilihat lagi.' },
              { t: '298', why: 'Angka 9 dan 8 memang besar, tetapi ratusannya lebih kecil.' },
              { t: 'sama besar', why: 'Ratusannya berbeda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dari tempat terbesar',
      steps: [
        {
          say: 'Bandingkan ratusan dulu. 298 punya 2 ratusan, 312 punya 3 ratusan. Jadi 312 lebih besar.',
          clear: true,
          add: [table('t1', 200, 85, [['', 'ratusan', 'puluhan', 'satuan'], ['298', '2', '9', '8'], ['312', '3', '1', '2']], { cw: [70, 80, 80, 80], rh: 30, size: 16, head: true }), T('a', '298 < 312', 200, 175, { size: 30, c: 'ok' })],
        },
        {
          say: 'Kalau ratusan sama, lihat puluhan. 475 dan 452: ratusan sama 4. Puluhan 7 lebih besar dari 5. Jadi 475 lebih besar.',
          add: [T('b', '475 > 452', 200, 225, { size: 30, c: 'pos' }), T('c', 'ratusan sama, puluhan 7 > 5', 200, 260, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Mengurutkan',
      steps: [
        {
          say: 'Urutkan 506, 650, 560, dan 605 dari yang terkecil. Ratusan 5: 506 dan 560. Ratusan 6: 605 dan 650.',
          clear: true,
          add: [T('a', '506   650   560   605', 200, 70, { size: 28 }), T('b', '506 < 560 < 605 < 650', 200, 150, { size: 28, c: 'ok' }), T('c', 'angkanya sama, tempatnya berbeda', 200, 200, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tanda apa di antara 734 dan 743?',
          clear: true,
          add: [T('a', '734  ?  743', 200, 110, { size: 46 })],
          ask: {
            options: [
              { t: '<', ok: true, why: 'Ratusan sama 7. Puluhan 3 < 4. Jadi 734 < 743.' },
              { t: '>', why: 'Satuan 4 > 3, tetapi puluhan dibandingkan lebih dulu.' },
              { t: '=', why: 'Angkanya sama, tetapi letaknya berbeda.' },
            ],
          },
        },
        {
          say: 'Ratusan sama. Puluhan 3 lebih kecil dari 4. Jadi 734 kurang dari 743.',
          add: [T('b', '734 {g:<} 743', 200, 200, { size: 40 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '589 … 601',
      options: [
        { t: '<', ok: true },
        { t: '>', why: 'Ratusan 5 < 6.' },
        { t: '=', why: 'Nilainya berbeda.' },
      ],
      steps: ['Ratusan 5 < 6.', '589 < 601.'],
    },
    {
      q: '840 … 804',
      options: [
        { t: '>', ok: true },
        { t: '<', why: 'Ratusan sama. Puluhan 4 > 0.' },
        { t: '=', why: 'Nilainya berbeda.' },
      ],
      steps: ['Ratusan sama 8.', 'Puluhan 4 > 0: 840 > 804.'],
    },
    {
      type: 'num',
      q: 'Bilangan terbesar dari 399, 930, 309, 903 adalah …',
      ans: ['930'],
      wrong: { '903': 'Ratusan sama 9. Puluhan 3 > 0.', '399': 'Ratusan 3 lebih kecil dari 9.' },
      steps: ['Ratusan 9: 930 dan 903.', 'Puluhan 3 > 0: 930.'],
    },
    {
      type: 'num',
      q: 'Bilangan terkecil yang dapat dibuat dari angka 4, 0, 7 (tiap angka sekali, tidak diawali 0) adalah …',
      ans: ['407'],
      wrong: { '47': 'Bilangan harus tiga angka.', '704': '704 adalah yang terbesar kedua. Taruh angka terkecil selain 0 di depan.' },
      steps: ['Ratusan: angka terkecil selain 0, yaitu 4.', 'Lalu 0, lalu 7: 407.'],
    },
    {
      type: 'num',
      q: 'Bilangan sesudah 699 adalah …',
      ans: ['700'],
      wrong: { '6910': 'Sesudah 699 adalah 700.', '698': 'Itu bilangan sebelum 699.' },
      steps: ['699 + 1.', '= 700.'],
    },
  ],
};

// ---------- 1.3 Menjumlah dan mengurangi bersusun ----------
const l3 = {
  id: 'k3b1-3',
  title: 'Penjumlahan dan Pengurangan Bersusun',
  hook: 'Susun bilangan menurut tempatnya. Hitung dari satuan, lalu puluhan, lalu ratusan. Jangan lupa menyimpan dan meminjam.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa 256 tambah 138?',
          add: [T('q', '256 + 138 = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '394', ok: true, why: 'Satuan 6 + 8 = 14: tulis 4, simpan 1. Puluhan 5 + 3 + 1 = 9. Ratusan 2 + 1 = 3.' },
              { t: '384', why: 'Jangan lupa 1 yang disimpan ke puluhan.' },
              { t: '3814', why: '14 satuan harus ditukar: 1 puluhan dan 4 satuan.' },
              { t: '118', why: 'Itu 256 − 138.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menjumlah bersusun',
      steps: [
        {
          say: 'Tulis bersusun: ratusan di bawah ratusan, puluhan di bawah puluhan, satuan di bawah satuan.',
          clear: true,
          add: [...D('a', '256', 68), op('pa', '+', 122), ...D('b', '138', 122), bar],
        },
        {
          say: 'Satuan: 6 tambah 8 sama dengan 14. Tulis 4, simpan 1 ke puluhan.',
          add: [T('c1', '4', XS[2], 180, { size: 34, c: 'ok' }), T('s1', '1', XS[1], 32, { size: 15, c: 'neg' })],
        },
        {
          say: 'Puluhan: 5 tambah 3 tambah 1 simpanan, sama dengan 9.',
          add: [T('c2', '9', XS[1], 180, { size: 34, c: 'ok' })],
        },
        {
          say: 'Ratusan: 2 tambah 1 sama dengan 3. Hasilnya 394.',
          add: [T('c3', '3', XS[0], 180, { size: 34, c: 'ok' }), T('k', '256 + 138 = {g:394}', 200, 238, { size: 24 })],
        },
      ],
    },
    {
      title: 'Mengurangi bersusun',
      steps: [
        {
          say: 'Sekarang 452 kurang 127. Satuan 2 tidak cukup dikurangi 7. Pinjam 1 puluhan: 12 kurang 7 sama dengan 5.',
          clear: true,
          add: [...D('a', '452', 68), op('pa', '−', 122), ...D('b', '127', 122), bar, T('p1', '4', XS[1] - 14, 32, { size: 15, c: 'neg' }), T('p2', '12', XS[2] - 4, 32, { size: 15, c: 'neg' }), T('c1', '5', XS[2], 180, { size: 34, c: 'ok' })],
        },
        {
          say: 'Puluhan tinggal 4. 4 kurang 2 sama dengan 2. Ratusan: 4 kurang 1 sama dengan 3. Hasilnya 325.',
          add: [T('c2', '2', XS[1], 180, { size: 34, c: 'ok' }), T('c3', '3', XS[0], 180, { size: 34, c: 'ok' }), T('k', '452 − 127 = {g:325}', 200, 238, { size: 24 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 600 kurang 250?',
          clear: true,
          add: [T('q', '600 − 250 = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '350', ok: true, why: 'Satuan 0 − 0 = 0. Puluhan 0 − 5: pinjam 1 ratusan, 10 − 5 = 5. Ratusan 5 − 2 = 3.' },
              { t: '450', why: 'Ratusan sudah dipinjam 1, tinggal 5. 5 − 2 = 3.' },
              { t: '850', why: 'Itu 600 + 250.' },
              { t: '400', why: 'Puluhan 0 − 5 tidak bisa langsung. Pinjam 1 ratusan.' },
            ],
          },
        },
        {
          say: 'Pinjam 1 ratusan untuk puluhan. 10 puluhan kurang 5 sama dengan 5. Ratusan tinggal 5, kurang 2 sama dengan 3. Hasilnya 350.',
          add: [T('a', '600 − 250 = {g:350}', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '324 + 152 = …',
      ans: ['476'],
      wrong: { '172': 'Itu pengurangan.' },
      steps: ['Satuan 6, puluhan 7, ratusan 4.', '= 476.'],
    },
    {
      type: 'num',
      q: '187 + 245 = …',
      ans: ['432'],
      wrong: { '322': 'Jangan lupa simpanan di puluhan dan ratusan.', '3212': 'Simpan puluhannya, jangan ditulis 12.' },
      steps: ['Satuan 7 + 5 = 12: tulis 2, simpan 1.', 'Puluhan 8 + 4 + 1 = 13: tulis 3, simpan 1. Ratusan 1 + 2 + 1 = 4. Hasilnya 432.'],
    },
    {
      type: 'num',
      q: '563 − 241 = …',
      ans: ['322'],
      wrong: { '804': 'Itu penjumlahan.' },
      steps: ['Satuan 2, puluhan 2, ratusan 3.', '= 322.'],
    },
    {
      type: 'num',
      q: '731 − 418 = …',
      ans: ['313'],
      wrong: { '327': 'Satuan 1 − 8 tidak bisa langsung. Pinjam 1 puluhan: 11 − 8 = 3.', '1149': 'Itu penjumlahan.' },
      steps: ['Pinjam: 11 − 8 = 3, puluhan 2 − 1 = 1.', 'Ratusan 7 − 4 = 3. Hasilnya 313.'],
    },
    {
      type: 'num',
      q: 'Perpustakaan punya 425 buku cerita dan 368 buku pelajaran. Jumlah semua buku …',
      ans: ['793'],
      wrong: { '57': 'Itu selisihnya. Jumlah memakai penjumlahan.', '783': 'Jangan lupa simpanan dari satuan.' },
      steps: ['425 + 368.', '= 793 buku.'],
    },
  ],
};

export default {
  id: 'k3b1',
  no: 1,
  title: 'Bilangan Cacah sampai 1.000',
  desc: 'Ratusan, puluhan, dan satuan, nilai tempat, membandingkan dan mengurutkan, serta penjumlahan dan pengurangan bersusun.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Nilai angka 7 pada bilangan 784 adalah …',
      ans: ['700'],
      wrong: { '7': 'Angka 7 di tempat ratusan, nilainya 700.', '70': '7 di tempat ratusan, bukan puluhan.' },
      steps: ['784 = 700 + 80 + 4.'],
    },
    {
      type: 'num',
      q: '999 + 1 = …',
      ans: ['1000'],
      wrong: { '9910': 'Sesudah 999 adalah 1.000.' },
      steps: ['Sesudah 999 adalah seribu: 1.000.'],
    },
    {
      type: 'num',
      q: '500 − 175 = …',
      ans: ['325'],
      wrong: { '675': 'Itu penjumlahan.', '435': 'Pinjam dengan teliti: 500 − 175 = 325.' },
      steps: ['500 − 100 = 400, 400 − 75 = 325.'],
    },
  ],
};
