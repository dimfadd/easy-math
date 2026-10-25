// Kelas 1 · Bab 1: Ayo Membilang sampai 10
import { T, ln } from '../helpers.js';
import { objs, tenframe, tenDot, card } from './kit.js';

const NAMA = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh'];

// ---------- 1.1 Membilang 1 sampai 5 ----------
const AX = 80;
const AY = 120;
const ADX = 60;

const l1 = {
  id: 'k1b1-1',
  title: 'Membilang 1 sampai 5',
  hook: 'Hitung benda satu per satu. Angka terakhir yang kamu sebut adalah banyaknya benda.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada berapa apel?',
          add: [...objs('a', 'apple', 4, 110, 130, { dx: 60, size: 44 })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Satu, dua, tiga, empat. Ada 4 apel.' },
              { t: '3', why: 'Coba tunjuk satu per satu. Ada satu apel lagi.' },
              { t: '5', why: 'Hitung pelan-pelan. Apel terakhir adalah yang keempat.' },
              { t: '2', why: 'Apelnya lebih dari 2. Hitung satu per satu.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Hitung satu per satu',
      steps: [
        {
          say: 'Satu.',
          clear: true,
          add: [...objs('a', 'apple', 1, AX, AY, { dx: ADX, size: 44 }), T('n0', '1', AX, AY + 55, { size: 30, c: 'pos' })],
        },
        ...[2, 3, 4, 5].map((k) => ({
          say: `${NAMA[k][0].toUpperCase()}${NAMA[k].slice(1)}.`,
          add: [...objs('a', 'apple', 1, AX, AY, { dx: ADX, size: 44, start: k - 1 }), T(`n${k - 1}`, String(k), AX + (k - 1) * ADX, AY + 55, { size: 30, c: 'pos' })],
        })),
        {
          say: 'Angka terakhir yang kita sebut adalah 5. Jadi ada 5 apel.',
          add: [T('a5', 'ada {g:5} apel', 200, 250, { size: 30 })],
          hl: ['n4'],
        },
      ],
    },
    {
      title: 'Angka dan bendanya',
      steps: [
        {
          say: 'Setiap angka punya banyak benda sendiri. 1 bintang, 2 bintang, 3 bintang.',
          clear: true,
          add: [1, 2, 3].flatMap((k) => [card(`c${k}`, k, 50 + (k - 1) * 75, 60), ...objs(`s${k}`, 'star', k, 50 + (k - 1) * 75, 120, { dy: 34, cols: 1, size: 28 })]),
        },
        {
          say: '4 bintang dan 5 bintang. Makin besar angkanya, makin banyak bendanya.',
          add: [4, 5].flatMap((k) => [card(`c${k}`, k, 50 + (k - 1) * 75, 60), ...objs(`s${k}`, 'star', k, 50 + (k - 1) * 75, 120, { dy: 34, cols: 1, size: 28 })]),
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ada berapa bintang?',
          clear: true,
          add: [...objs('s', 'star', 3, 140, 130, { dx: 60, size: 46 })],
          ask: {
            options: [
              { t: '3', ok: true, why: 'Satu, dua, tiga. Ada 3 bintang.' },
              { t: '2', why: 'Ada satu bintang lagi. Hitung semuanya.' },
              { t: '4', why: 'Tunjuk satu per satu. Hanya ada 3.' },
              { t: '5', why: 'Bintangnya lebih sedikit dari 5.' },
            ],
          },
        },
        {
          say: 'Satu, dua, tiga. Ada 3 bintang.',
          add: [...[1, 2, 3].map((k) => T(`n${k}`, String(k), 140 + (k - 1) * 60, 190, { size: 28, c: 'pos' })), T('a', 'ada {g:3} bintang', 200, 250, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Ada berapa apel?',
      fig: objs('f', 'apple', 2, 170, 150, { dx: 60, size: 46 }),
      ans: ['2'],
      wrong: { '1': 'Ada 2 apel. Hitung satu per satu.', '3': 'Tunjuk setiap apel sekali saja.' },
      steps: ['Satu, dua.', 'Ada 2 apel.'],
    },
    {
      type: 'num',
      q: 'Ada berapa bintang?',
      fig: objs('f', 'star', 5, 80, 150, { dx: 60, size: 44 }),
      ans: ['5'],
      wrong: { '4': 'Masih ada satu bintang lagi.', '6': 'Tunjuk setiap bintang sekali saja.' },
      steps: ['Satu, dua, tiga, empat, lima.', 'Ada 5 bintang.'],
    },
    {
      type: 'num',
      q: 'Ada berapa apel?',
      fig: objs('f', 'apple', 1, 200, 150, { size: 50 }),
      ans: ['1'],
      wrong: { '0': 'Ada satu apel.', '2': 'Hanya ada satu apel.' },
      steps: ['Hanya satu.', 'Ada 1 apel.'],
    },
    {
      type: 'num',
      q: 'Ada berapa bintang?',
      fig: objs('f', 'star', 4, 110, 150, { dx: 60, size: 44 }),
      ans: ['4'],
      wrong: { '3': 'Masih ada satu bintang lagi.', '5': 'Hitung pelan-pelan. Ada 4.' },
      steps: ['Satu, dua, tiga, empat.', 'Ada 4 bintang.'],
    },
    {
      q: 'Angka yang dibaca "tiga" adalah …',
      options: [
        { t: '3', ok: true },
        { t: '2', why: '2 dibaca "dua".' },
        { t: '5', why: '5 dibaca "lima".' },
        { t: '8', why: '8 dibaca "delapan".' },
      ],
      steps: ['"Tiga" ditulis 3.'],
    },
  ],
};

// ---------- 1.2 Membilang 6 sampai 10 ----------
const FX = 200;
const FY = 120;

const l2 = {
  id: 'k1b1-2',
  title: 'Membilang 6 sampai 10',
  hook: 'Kotak sepuluh membantu menghitung. Satu baris berisi 5. Dua baris penuh berisi 10.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini kotak sepuluh. Ada berapa bulatan merah?',
          add: tenframe('t', FX, FY, 7),
          ask: {
            options: [
              { t: '7', ok: true, why: 'Baris atas penuh, 5. Baris bawah ada 2. 5 dan 2 adalah 7.' },
              { t: '5', why: '5 hanya baris atas. Ada lagi di baris bawah.' },
              { t: '2', why: '2 hanya baris bawah. Baris atas juga dihitung.' },
              { t: '8', why: 'Baris bawah hanya berisi 2 bulatan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Lima dan lagi',
      steps: [
        {
          say: 'Baris atas penuh. Isinya 5.',
          clear: true,
          add: [...tenframe('t', FX, FY, 5), T('a', '5', FX, 200, { size: 40, c: 'pos' })],
        },
        {
          say: 'Tambah 1 di baris bawah. 5 dan 1 adalah 6.',
          add: [tenDot('t', 5, FX, FY)],
          set: { a: { text: '6' } },
        },
        {
          say: 'Tambah lagi. 7. Lalu 8.',
          add: [tenDot('t', 6, FX, FY), tenDot('t', 7, FX, FY)],
          set: { a: { text: '8' } },
        },
        {
          say: 'Tambah lagi. 9.',
          add: [tenDot('t', 8, FX, FY)],
          set: { a: { text: '9' } },
        },
        {
          say: 'Tambah satu lagi. Kotaknya penuh. Penuh berarti 10.',
          add: [tenDot('t', 9, FX, FY), T('b', 'penuh = {g:10}', FX, 250, { size: 28 })],
          set: { a: { text: '10' } },
        },
      ],
    },
    {
      title: 'Urutan 1 sampai 10',
      steps: [
        {
          say: 'Ini urutan angka 1 sampai 10. Setiap langkah ke kanan, bertambah 1.',
          clear: true,
          add: Array.from({ length: 10 }, (_, i) => card(`k${i}`, i + 1, 38 + i * 36, 120, { w: 32, h: 42, lsize: 20 })),
        },
        {
          say: 'Angka sesudah 6 adalah 7. Angka sebelum 6 adalah 5.',
          hl: ['k4', 'k5', 'k6'],
          add: [T('a', 'sebelum 6: {p:5}    sesudah 6: {g:7}', 200, 200, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ada berapa bulatan?',
          clear: true,
          add: tenframe('t', FX, FY, 9),
          ask: {
            options: [
              { t: '9', ok: true, why: 'Kurang 1 lagi untuk penuh. 10 kurang 1 adalah 9.' },
              { t: '10', why: 'Masih ada satu kotak kosong. Jadi belum 10.' },
              { t: '8', why: 'Baris bawah berisi 4, bukan 3. 5 dan 4 adalah 9.' },
              { t: '4', why: '4 hanya baris bawah. Baris atas juga dihitung.' },
            ],
          },
        },
        {
          say: 'Hanya satu kotak yang kosong. Penuh itu 10. Kurang 1, jadi 9.',
          add: [T('a', '10 kurang 1 = {g:9}', FX, 220, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Ada berapa bulatan?',
      fig: tenframe('f', 200, 150, 6),
      ans: ['6'],
      wrong: { '5': 'Ada satu bulatan di baris bawah. 5 dan 1.', '1': 'Baris atas juga dihitung.' },
      steps: ['Baris atas 5, baris bawah 1.', '5 dan 1 adalah 6.'],
    },
    {
      type: 'num',
      q: 'Ada berapa bulatan?',
      fig: tenframe('f', 200, 150, 10),
      ans: ['10'],
      wrong: { '5': 'Kedua baris penuh. 5 dan 5.', '9': 'Tidak ada kotak kosong. Penuh berarti 10.' },
      steps: ['Kedua baris penuh.', 'Penuh berarti 10.'],
    },
    {
      type: 'num',
      q: 'Angka sesudah 7 adalah …',
      ans: ['8'],
      wrong: { '6': '6 adalah angka sebelum 7.', '7': 'Sesudah 7 adalah angka berikutnya.' },
      steps: ['… 6, 7, 8 …', 'Sesudah 7 adalah 8.'],
    },
    {
      type: 'num',
      q: 'Angka sebelum 10 adalah …',
      ans: ['9'],
      wrong: { '11': 'Itu angka sesudah 10.', '10': 'Sebelum 10 adalah angka di kirinya.' },
      steps: ['… 8, 9, 10.', 'Sebelum 10 adalah 9.'],
    },
    {
      type: 'num',
      q: 'Ada berapa apel?',
      fig: objs('f', 'apple', 8, 60, 120, { dx: 56, cols: 5, dy: 60, size: 42 }),
      ans: ['8'],
      wrong: { '5': 'Baris bawah juga dihitung.', '3': 'Baris atas juga dihitung. 5 dan 3.' },
      steps: ['Baris atas 5, baris bawah 3.', '5 dan 3 adalah 8.'],
    },
  ],
};

// ---------- 1.3 Lebih banyak, lebih sedikit ----------
const PX = 90;
const PDX = 56;

const l3 = {
  id: 'k1b1-3',
  title: 'Lebih Banyak atau Lebih Sedikit',
  hook: 'Pasangkan benda satu dengan satu. Yang masih tersisa adalah yang lebih banyak.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mana yang lebih banyak, apel atau bintang?',
          add: [...objs('a', 'apple', 5, PX, 90, { dx: PDX, size: 40 }), ...objs('s', 'star', 3, PX, 190, { dx: PDX, size: 40 })],
          ask: {
            options: [
              { t: 'apel', ok: true, why: 'Ada 5 apel dan 3 bintang. 5 lebih banyak dari 3.' },
              { t: 'bintang', why: 'Hitung: bintangnya hanya 3, apelnya 5.' },
              { t: 'sama banyak', why: 'Setelah dipasangkan, masih ada apel yang tersisa.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pasangkan satu-satu',
      steps: [
        {
          say: 'Pasangkan satu apel dengan satu bintang.',
          clear: true,
          add: [...objs('a', 'apple', 5, PX, 90, { dx: PDX, size: 40 }), ...objs('s', 'star', 3, PX, 190, { dx: PDX, size: 40 }), ...[0, 1, 2].map((i) => ln(`p${i}`, PX + i * PDX, 115, PX + i * PDX, 165, { sw: 2.5, c: 'ok' }))],
        },
        {
          say: 'Dua apel tidak punya pasangan. Jadi apel lebih banyak. Bintang lebih sedikit.',
          hl: ['a3', 'a4'],
          add: [T('k', 'apel {g:lebih banyak}', 200, 245, { size: 22 }), T('k2', 'bintang {n:lebih sedikit}', 200, 275, { size: 18 })],
        },
      ],
    },
    {
      title: 'Sama banyak',
      steps: [
        {
          say: 'Sekarang 4 apel dan 4 bintang. Pasangkan.',
          clear: true,
          add: [...objs('a', 'apple', 4, PX, 90, { dx: PDX, size: 40 }), ...objs('s', 'star', 4, PX, 190, { dx: PDX, size: 40 })],
        },
        {
          say: 'Semua punya pasangan. Tidak ada yang tersisa. Jadi sama banyak.',
          add: [...[0, 1, 2, 3].map((i) => ln(`p${i}`, PX + i * PDX, 115, PX + i * PDX, 165, { sw: 2.5, c: 'ok' })), T('k', '{p:sama banyak}', 200, 250, { size: 26 })],
        },
      ],
    },
    {
      title: 'Membandingkan angka',
      steps: [
        {
          say: 'Mana lebih besar, 7 atau 5? Di urutan angka, 7 ada di sebelah kanan 5. Yang lebih kanan lebih besar.',
          clear: true,
          add: [...Array.from({ length: 10 }, (_, i) => card(`k${i}`, i + 1, 38 + i * 36, 100, { w: 32, h: 42, lsize: 20 })), T('a', '7 {g:lebih besar} dari 5', 200, 190, { size: 26 })],
          hl: ['k4', 'k6'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Mana yang lebih sedikit, apel atau bintang?',
          clear: true,
          add: [...objs('a', 'apple', 2, PX, 90, { dx: PDX, size: 40 }), ...objs('s', 'star', 6, PX, 190, { dx: PDX, size: 40 })],
          ask: {
            options: [
              { t: 'apel', ok: true, why: 'Ada 2 apel dan 6 bintang. 2 lebih sedikit.' },
              { t: 'bintang', why: 'Bintangnya 6, lebih banyak dari apel.' },
              { t: 'sama banyak', why: 'Banyak bintang yang tidak punya pasangan.' },
            ],
          },
        },
        {
          say: 'Pasangkan. Empat bintang tersisa. Jadi apel lebih sedikit.',
          add: [...[0, 1].map((i) => ln(`p${i}`, PX + i * PDX, 115, PX + i * PDX, 165, { sw: 2.5, c: 'ok' })), T('k', 'apel {n:lebih sedikit}', 200, 250, { size: 24 })],
          hl: ['s2', 's3', 's4', 's5'],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Mana yang lebih banyak?',
      fig: [...objs('a', 'apple', 3, 110, 100, { dx: 56, size: 38 }), ...objs('s', 'star', 4, 110, 190, { dx: 56, size: 38 })],
      options: [
        { t: 'bintang', ok: true },
        { t: 'apel', why: 'Apel 3, bintang 4. Bintang lebih banyak.' },
        { t: 'sama banyak', why: 'Ada satu bintang yang tidak punya pasangan.' },
      ],
      steps: ['Apel 3, bintang 4.', '4 lebih banyak dari 3.'],
    },
    {
      q: 'Mana yang lebih sedikit?',
      fig: [...objs('a', 'apple', 5, 90, 100, { dx: 56, size: 38 }), ...objs('s', 'star', 2, 90, 190, { dx: 56, size: 38 })],
      options: [
        { t: 'bintang', ok: true },
        { t: 'apel', why: 'Apel 5, lebih banyak dari bintang.' },
        { t: 'sama banyak', why: 'Banyak apel yang tidak punya pasangan.' },
      ],
      steps: ['Apel 5, bintang 2.', '2 lebih sedikit dari 5.'],
    },
    {
      q: 'Apel dan bintang …',
      fig: [...objs('a', 'apple', 3, 140, 100, { dx: 56, size: 38 }), ...objs('s', 'star', 3, 140, 190, { dx: 56, size: 38 })],
      options: [
        { t: 'sama banyak', ok: true },
        { t: 'apel lebih banyak', why: 'Setiap apel punya pasangan bintang.' },
        { t: 'bintang lebih banyak', why: 'Setiap bintang punya pasangan apel.' },
      ],
      steps: ['Apel 3, bintang 3.', 'Sama banyak.'],
    },
    {
      q: 'Mana yang lebih besar?',
      options: [
        { t: '9', ok: true },
        { t: '6', why: '9 ada di kanan 6, jadi 9 lebih besar.' },
      ],
      steps: ['Urutan: … 6, 7, 8, 9.', '9 lebih besar.'],
    },
    {
      q: 'Mana yang lebih kecil?',
      options: [
        { t: '4', ok: true },
        { t: '8', why: '8 ada di kanan 4, jadi 8 lebih besar.' },
      ],
      steps: ['Urutan: 4, 5, 6, 7, 8.', '4 lebih kecil.'],
    },
  ],
};

export default {
  id: 'k1b1',
  no: 1,
  title: 'Membilang sampai 10',
  desc: 'Menghitung benda satu per satu, kotak sepuluh, urutan angka 1 sampai 10, dan membandingkan banyak benda.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Ada berapa bintang?',
      fig: objs('f', 'star', 7, 60, 120, { dx: 56, cols: 5, dy: 60, size: 40 }),
      ans: ['7'],
      wrong: { '5': 'Baris bawah juga dihitung. 5 dan 2.', '2': 'Baris atas juga dihitung.' },
      steps: ['Baris atas 5, baris bawah 2.', '5 dan 2 adalah 7.'],
    },
    {
      type: 'num',
      q: 'Angka sesudah 4 adalah …',
      ans: ['5'],
      wrong: { '3': '3 adalah angka sebelum 4.' },
      steps: ['… 3, 4, 5 …', 'Sesudah 4 adalah 5.'],
    },
    {
      q: 'Mana yang lebih banyak?',
      fig: [...objs('a', 'apple', 6, 80, 100, { dx: 50, size: 36 }), ...objs('s', 'star', 4, 80, 190, { dx: 50, size: 36 })],
      options: [
        { t: 'apel', ok: true },
        { t: 'bintang', why: 'Apel 6, bintang 4.' },
        { t: 'sama banyak', why: 'Ada 2 apel yang tidak punya pasangan.' },
      ],
      steps: ['Apel 6, bintang 4.', '6 lebih banyak.'],
    },
  ],
};
