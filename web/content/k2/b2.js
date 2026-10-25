// Kelas 2 · Bab 2: Penjumlahan dan Pengurangan
import { T } from '../helpers.js';
import { rod, unit, blocks, unitAt, U } from './kit.js';

const Y = 120;
const G = 22; // jarak antarbalok
const pos = (i, uX) => {
  const [x, y] = unitAt(i, uX, Y);
  return { x, y };
};

// ---------- 2.1 Menjumlah puluhan dan satuan ----------
const l1 = {
  id: 'k2b2-1',
  title: 'Menjumlah Puluhan dan Satuan',
  hook: 'Jumlahkan puluhan dengan puluhan, satuan dengan satuan. 23 + 14: puluhan 2 + 1 = 3, satuan 3 + 4 = 7, hasilnya 37.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa 23 tambah 14?',
          add: [...blocks('a', 2, 3, 70, Y, { gap: G }), T('la', '23', 100, 215, { size: 26, c: 'pos' }), ...blocks('b', 1, 4, 250, Y, { gap: G }), T('lb', '14', 270, 215, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '37', ok: true, why: 'Puluhan 2 + 1 = 3, satuan 3 + 4 = 7. Hasilnya 37.' },
              { t: '10', why: 'Itu jika semua angka dijumlah begitu saja: 2 + 3 + 1 + 4. Puluhan dan satuan harus dipisah.' },
              { t: '73', why: 'Puluhannya 3 dan satuannya 7: ditulis 37.' },
              { t: '9', why: 'Balok puluhan bernilai 10, bukan 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Gabungkan baloknya',
      steps: [
        {
          say: '23 adalah 2 puluhan dan 3 satuan. 14 adalah 1 puluhan dan 4 satuan.',
          clear: true,
          add: [...blocks('a', 2, 3, 70, Y, { gap: G }), T('la', '23', 100, 215, { size: 26, c: 'pos' }), ...blocks('b', 1, 4, 250, Y, { gap: G }), T('lb', '14', 270, 215, { size: 26, c: 'acc' })],
        },
        {
          say: 'Gabungkan. Balok puluhan bersama balok puluhan, kubus satuan bersama kubus satuan.',
          del: ['la', 'lb'],
          set: { br0: { x: 70 + 2 * G }, ...Object.fromEntries([0, 1, 2].map((i) => [`au${i}`, pos(i, 70 + 3 * G + 14)])), ...Object.fromEntries([0, 1, 2, 3].map((i) => [`bu${i}`, pos(3 + i, 70 + 3 * G + 14)])) },
        },
        {
          say: 'Puluhan: 2 tambah 1 sama dengan 3. Satuan: 3 tambah 4 sama dengan 7. Hasilnya 37.',
          add: [T('a', 'puluhan: 2 + 1 = 3', 290, 80, { size: 18, c: 'pos' }), T('b', 'satuan: 3 + 4 = 7', 290, 115, { size: 18, c: 'acc' }), T('c', '23 + 14 = {g:37}', 290, 165, { size: 26 })],
        },
      ],
    },
    {
      title: 'Cara bersusun',
      steps: [
        {
          say: 'Bisa juga ditulis bersusun. Satuan di bawah satuan, puluhan di bawah puluhan. Jumlahkan satuan dulu, lalu puluhan.',
          clear: true,
          add: [T('a', '  2 3', 200, 50, { size: 34 }), T('b', '+ 1 4', 200, 100, { size: 34 }), { id: 'ln', t: 'line', x: 150, y: 130, x2: 250, y2: 130, sw: 3, draw: false }, T('c', '  3 7', 200, 160, { size: 36, c: 'ok' }), T('d', 'satuan: 3 + 4 = 7', 200, 215, { size: 16, c: 'acc' }), T('e', 'puluhan: 2 + 1 = 3', 200, 240, { size: 16, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 31 tambah 25?',
          clear: true,
          add: [T('q', '31 + 25 = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '56', ok: true, why: 'Puluhan 3 + 2 = 5, satuan 1 + 5 = 6. Hasilnya 56.' },
              { t: '65', why: 'Puluhannya 5, satuannya 6: ditulis 56.' },
              { t: '11', why: 'Puluhan dan satuan harus dijumlah terpisah.' },
              { t: '6', why: '6 hanya satuannya. Puluhannya 5.' },
            ],
          },
        },
        {
          say: 'Puluhan 3 tambah 2 sama dengan 5. Satuan 1 tambah 5 sama dengan 6. Jadi 56.',
          add: [T('a', '31 + 25 = {g:56}', 200, 190, { size: 34 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '12 + 15 = …',
      ans: ['27'],
      wrong: { '9': 'Puluhan 1 + 1 = 2, satuan 2 + 5 = 7.', '72': 'Puluhan ditulis di depan.' },
      steps: ['Puluhan 1 + 1 = 2, satuan 2 + 5 = 7.', '= 27.'],
    },
    {
      type: 'num',
      q: '40 + 30 = …',
      ans: ['70'],
      wrong: { '7': '4 puluhan + 3 puluhan = 7 puluhan = 70.', '43': 'Itu 40 + 3.' },
      steps: ['4 puluhan + 3 puluhan.', '= 7 puluhan = 70.'],
    },
    {
      type: 'num',
      q: '24 + 13 = …',
      fig: [...blocks('a', 2, 4, 90, 150, { gap: 22 }), T('p', '+', 200, 150, { size: 30 }), ...blocks('b', 1, 3, 250, 150, { gap: 22 })],
      ans: ['37'],
      wrong: { '10': 'Balok puluhan bernilai 10.', '73': 'Puluhan ditulis di depan.' },
      steps: ['Puluhan 2 + 1 = 3, satuan 4 + 3 = 7.', '= 37.'],
    },
    {
      type: 'num',
      q: 'Ibu membeli 21 telur. Lalu membeli 16 telur lagi. Telur ibu sekarang …',
      ans: ['37'],
      wrong: { '5': 'Itu selisihnya. Membeli lagi berarti bertambah.' },
      steps: ['21 + 16.', '= 37 telur.'],
    },
    {
      type: 'num',
      q: '53 + 6 = …',
      ans: ['59'],
      wrong: { '113': '6 adalah satuan, jumlahkan dengan satuan 3.', '119': '6 hanya satuan: 3 + 6 = 9, puluhan tetap 5.' },
      steps: ['Satuan 3 + 6 = 9, puluhan tetap 5.', '= 59.'],
    },
  ],
};

// ---------- 2.2 Mengurangi puluhan dan satuan ----------
const l2 = {
  id: 'k2b2-2',
  title: 'Mengurangi Puluhan dan Satuan',
  hook: 'Kurangi satuan dengan satuan, puluhan dengan puluhan. 38 − 15: satuan 8 − 5 = 3, puluhan 3 − 1 = 2, hasilnya 23.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa 38 kurang 15?',
          add: [...blocks('a', 3, 8, 120, Y, { gap: G }), T('q', '38 − 15 = ?', 200, 230, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '23', ok: true, why: 'Satuan 8 − 5 = 3, puluhan 3 − 1 = 2. Hasilnya 23.' },
              { t: '53', why: '53 adalah 38 + 15. Kurang berarti mengambil.' },
              { t: '32', why: 'Puluhannya 2, satuannya 3: ditulis 23.' },
              { t: '13', why: 'Hanya 1 balok puluhan yang diambil, sisa 2 balok.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ambil baloknya',
      steps: [
        {
          say: '38 adalah 3 puluhan dan 8 satuan. Kita ambil 15: 1 puluhan dan 5 satuan.',
          clear: true,
          add: [...blocks('a', 3, 8, 120, Y, { gap: G })],
        },
        {
          say: 'Ambil 5 kubus satuan. Tinggal 3 satuan.',
          set: Object.fromEntries([3, 4, 5, 6, 7].map((i) => [`au${i}`, { o: 0.15 }])),
          add: [T('a', 'satuan: 8 − 5 = 3', 300, 80, { size: 18, c: 'acc' })],
        },
        {
          say: 'Ambil 1 balok puluhan. Tinggal 2 puluhan. Hasilnya 23.',
          set: { ar2: { o: 0.15 } },
          add: [T('b', 'puluhan: 3 − 1 = 2', 300, 115, { size: 18, c: 'pos' }), T('c', '38 − 15 = {g:23}', 300, 165, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 47 kurang 23?',
          clear: true,
          add: [T('q', '47 − 23 = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '24', ok: true, why: 'Satuan 7 − 3 = 4, puluhan 4 − 2 = 2. Hasilnya 24.' },
              { t: '70', why: '70 adalah 47 + 23.' },
              { t: '42', why: 'Puluhannya 2, satuannya 4: ditulis 24.' },
              { t: '4', why: '4 hanya satuannya.' },
            ],
          },
        },
        {
          say: 'Satuan 7 kurang 3 sama dengan 4. Puluhan 4 kurang 2 sama dengan 2. Jadi 24.',
          add: [T('a', '47 − 23 = {g:24}', 200, 190, { size: 34 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '29 − 14 = …',
      ans: ['15'],
      wrong: { '43': 'Itu 29 + 14.', '51': 'Puluhan ditulis di depan: 15.' },
      steps: ['Satuan 9 − 4 = 5, puluhan 2 − 1 = 1.', '= 15.'],
    },
    {
      type: 'num',
      q: '50 − 20 = …',
      ans: ['30'],
      wrong: { '3': '5 puluhan − 2 puluhan = 3 puluhan = 30.', '70': 'Itu tambah.' },
      steps: ['5 puluhan − 2 puluhan.', '= 3 puluhan = 30.'],
    },
    {
      type: 'num',
      q: '46 − 5 = …',
      ans: ['41'],
      wrong: { '51': 'Itu tambah.', '-4': '5 dikurangkan dari satuan 6: 6 − 5 = 1. Puluhan tetap 4.' },
      steps: ['Satuan 6 − 5 = 1, puluhan tetap 4.', '= 41.'],
    },
    {
      type: 'num',
      q: 'Ada 36 balon. 12 balon pecah. Balon yang tersisa …',
      ans: ['24'],
      wrong: { '48': 'Pecah berarti berkurang.' },
      steps: ['36 − 12.', '= 24 balon.'],
    },
    {
      type: 'num',
      q: '58 − 33 = …',
      ans: ['25'],
      wrong: { '91': 'Itu tambah.', '52': 'Puluhan 2, satuan 5: ditulis 25.' },
      steps: ['Satuan 8 − 3 = 5, puluhan 5 − 3 = 2.', '= 25.'],
    },
  ],
};

// ---------- 2.3 Menyimpan dan meminjam ----------
const UX = 70 + 2 * G + 14; // kolom satuan untuk 2 puluhan mulai x 70

const l3 = {
  id: 'k2b2-3',
  title: 'Menyimpan dan Meminjam',
  hook: 'Kalau satuannya lebih dari 9, tukar 10 satuan dengan 1 puluhan. Kalau satuannya kurang untuk dikurangi, tukar 1 puluhan dengan 10 satuan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa 27 tambah 5?',
          add: [...blocks('a', 2, 7, 70, Y, { gap: G }), ...Array.from({ length: 5 }, (_, i) => unit(`bu${i}`, 260 + i * 20, Y + 40)), T('q', '27 + 5 = ?', 200, 230, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '32', ok: true, why: 'Satuan 7 + 5 = 12. Sepuluh satuan menjadi 1 puluhan. 2 + 1 = 3 puluhan, sisa 2 satuan: 32.' },
              { t: '212', why: 'Satuan tidak boleh 12. Tukar 10 satuan dengan 1 puluhan.' },
              { t: '22', why: 'Itu 27 − 5. Tambah berarti bertambah.' },
              { t: '31', why: '7 + 5 = 12, jadi sisa satuannya 2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menyimpan: 10 satuan jadi 1 puluhan',
      steps: [
        {
          say: '27 dan 5 kubus. Gabungkan satuannya: 7 tambah 5 sama dengan 12 kubus.',
          clear: true,
          add: [...blocks('a', 2, 7, 70, Y, { gap: G }), ...Array.from({ length: 5 }, (_, i) => unit(`bu${i}`, 260 + i * 20, Y + 40))],
        },
        {
          say: 'Kubus-kubusnya dikumpulkan.',
          set: Object.fromEntries([0, 1, 2, 3, 4].map((i) => [`bu${i}`, pos(7 + i, UX)])),
        },
        {
          say: '12 kubus terlalu banyak untuk satuan. Ambil 10 kubus dan susun menjadi 1 balok puluhan.',
          set: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i < 7 ? `au${i}` : `bu${i - 7}`, { x: 70 + 2 * G, y: Y + 65 - U / 2 - i * U }])),
        },
        {
          say: 'Sekarang ada 3 puluhan dan 2 satuan. Hasilnya 32.',
          del: ['au0', 'au1', 'au2', 'au3', 'au4', 'au5', 'au6', 'bu0', 'bu1', 'bu2'],
          add: [rod('nr', 70 + 2 * G, Y, { fill: 'ok-soft', stroke: 'ok' }), T('c', '27 + 5 = {g:32}', 290, 120, { size: 26 })],
          set: { bu3: pos(0, UX + G), bu4: pos(1, UX + G) },
        },
      ],
    },
    {
      title: 'Meminjam: 1 puluhan jadi 10 satuan',
      steps: [
        {
          say: 'Sekarang 32 kurang 5. Satuannya hanya 2, tidak cukup untuk diambil 5.',
          clear: true,
          add: [...blocks('a', 3, 2, 70, Y, { gap: G }), T('q', '32 − 5', 300, 60, { size: 26, c: 'pos' })],
        },
        {
          say: 'Pinjam 1 balok puluhan dan pecah menjadi 10 satuan. Sekarang 2 puluhan dan 12 satuan.',
          del: ['ar2'],
          set: { au0: pos(0, 70 + 2 * G + 12), au1: pos(1, 70 + 2 * G + 12) },
          add: Array.from({ length: 10 }, (_, i) => unit(`nu${i}`, ...unitAt(2 + i, 70 + 2 * G + 12, Y), { from: { x: 70 + 2 * G, y: Y } })),
        },
        {
          say: 'Ambil 5 satuan. Tinggal 2 puluhan dan 7 satuan: 27.',
          set: Object.fromEntries([5, 6, 7, 8, 9].map((i) => [`nu${i}`, { o: 0.15 }])),
          add: [T('c', '32 − 5 = {g:27}', 300, 120, { size: 26 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 18 tambah 6?',
          clear: true,
          add: [T('q', '18 + 6 = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '24', ok: true, why: 'Satuan 8 + 6 = 14: 1 puluhan dan 4 satuan. Puluhan 1 + 1 = 2. Hasilnya 24.' },
              { t: '114', why: 'Satuan 14 harus ditukar: 10 menjadi 1 puluhan.' },
              { t: '12', why: 'Itu 18 − 6.' },
              { t: '23', why: '8 + 6 = 14, jadi sisa satuannya 4.' },
            ],
          },
        },
        {
          say: 'Satuan 8 tambah 6 sama dengan 14. Simpan 10 menjadi 1 puluhan, sisa 4. Puluhan 1 tambah 1 sama dengan 2. Jadi 24.',
          add: [T('a', '18 + 6 = {g:24}', 200, 190, { size: 34 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '26 + 7 = …',
      ans: ['33'],
      wrong: { '213': 'Satuan 13 ditukar: 1 puluhan dan 3 satuan.', '19': 'Itu 26 − 7.' },
      steps: ['Satuan 6 + 7 = 13 → simpan 1 puluhan.', 'Puluhan 2 + 1 = 3, satuan 3: 33.'],
    },
    {
      type: 'num',
      q: '35 + 18 = …',
      ans: ['53'],
      wrong: { '413': 'Satuan 13 ditukar menjadi 1 puluhan dan 3 satuan.', '43': 'Jangan lupa puluhan yang disimpan: 3 + 1 + 1 = 5.' },
      steps: ['Satuan 5 + 8 = 13 → simpan 1.', 'Puluhan 3 + 1 + 1 = 5. Hasilnya 53.'],
    },
    {
      type: 'num',
      q: '41 − 6 = …',
      ans: ['35'],
      wrong: { '45': 'Satuan 1 tidak cukup. Pinjam 1 puluhan: 11 − 6 = 5, puluhan tinggal 3.', '47': 'Itu tambah.' },
      steps: ['Pinjam 1 puluhan: 11 − 6 = 5.', 'Puluhan tinggal 3. Hasilnya 35.'],
    },
    {
      type: 'num',
      q: '50 − 8 = …',
      ans: ['42'],
      wrong: { '58': 'Itu tambah.', '52': 'Pinjam 1 puluhan: 10 − 8 = 2, puluhan tinggal 4.' },
      steps: ['Pinjam 1 puluhan: 10 − 8 = 2.', 'Puluhan tinggal 4. Hasilnya 42.'],
    },
    {
      type: 'num',
      q: 'Rudi punya 29 kelereng, lalu mendapat 13 kelereng. Kelereng Rudi sekarang …',
      ans: ['42'],
      wrong: { '312': 'Satuan 12 ditukar: 1 puluhan dan 2 satuan.', '16': 'Mendapat berarti bertambah.' },
      steps: ['Satuan 9 + 3 = 12 → simpan 1.', 'Puluhan 2 + 1 + 1 = 4. Hasilnya 42.'],
    },
  ],
};

export default {
  id: 'k2b2',
  no: 2,
  title: 'Penjumlahan dan Pengurangan',
  desc: 'Menjumlah dan mengurangi puluhan dan satuan, cara bersusun, serta menyimpan dan meminjam dengan balok puluhan.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: '43 + 25 = …',
      ans: ['68'],
      wrong: { '18': 'Itu selisihnya.', '86': 'Puluhan 6, satuan 8: 68.' },
      steps: ['Puluhan 4 + 2 = 6, satuan 3 + 5 = 8.', '= 68.'],
    },
    {
      type: 'num',
      q: '64 − 32 = …',
      ans: ['32'],
      wrong: { '96': 'Itu tambah.' },
      steps: ['Satuan 4 − 2 = 2, puluhan 6 − 3 = 3.', '= 32.'],
    },
    {
      type: 'num',
      q: '37 + 5 = …',
      ans: ['42'],
      wrong: { '312': 'Satuan 12 ditukar: 1 puluhan dan 2 satuan.', '32': 'Itu 37 − 5.' },
      steps: ['Satuan 7 + 5 = 12 → simpan 1.', 'Puluhan 3 + 1 = 4. Hasilnya 42.'],
    },
  ],
};
