// Kelas 1 · Bab 5: Membilang sampai 20
import { T } from '../helpers.js';
import { tenframe, card } from './kit.js';

const NAMA = ['', 'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas', 'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'];
const TX = 200;
const TY1 = 70;
const TY2 = 150;
const teen = (n, p = 't') => [...tenframe(`${p}a`, TX, TY1, Math.min(10, n)), ...tenframe(`${p}b`, TX, TY2, Math.max(0, n - 10), { c: 'pos' })];
const track = (y = 100, hl = []) =>
  Array.from({ length: 20 }, (_, i) => card(`k${i}`, i + 1, 38 + (i % 10) * 36, y + Math.floor(i / 10) * 52, { w: 32, h: 42, lsize: 18, ...(hl.includes(i + 1) ? { fill: 'acc-soft' } : {}) }));

// ---------- 5.1 Sepuluh dan sekian ----------
const l1 = {
  id: 'k1b5-1',
  title: 'Sepuluh dan Sekian',
  hook: 'Bilangan belasan terdiri dari 10 dan sekian. 13 adalah 10 dan 3.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kotak atas penuh. Kotak bawah berisi 3. Ada berapa bulatan semuanya?',
          add: teen(13),
          ask: {
            options: [
              { t: '13', ok: true, why: 'Kotak penuh berisi 10. 10 dan 3 adalah 13.' },
              { t: '3', why: '3 hanya kotak bawah. Kotak atas juga dihitung.' },
              { t: '10', why: '10 hanya kotak atas.' },
              { t: '12', why: 'Kotak bawah berisi 3, bukan 2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sepuluh dan sekian',
      steps: [
        {
          say: 'Satu kotak penuh berisi 10. Tidak perlu dihitung satu per satu lagi.',
          clear: true,
          add: [...tenframe('ta', TX, TY1, 10), T('a', '10', 340, TY1, { size: 30, c: 'neg' })],
        },
        {
          say: 'Tambah 1 di kotak bawah. 10 dan 1 adalah 11, sebelas.',
          add: [...tenframe('tb', TX, TY2, 1, { c: 'pos' }), T('b', '1', 340, TY2, { size: 30, c: 'pos' }), T('n', '10 dan 1 = 11', TX, 225, { size: 26 })],
        },
        {
          say: '10 dan 3 adalah 13, tiga belas.',
          add: tenframe('tb', TX, TY2, 3, { c: 'pos', start: 1 }),
          set: { b: { text: '3' }, n: { text: '10 dan 3 = 13' } },
        },
        {
          say: '10 dan 8 adalah 18, delapan belas.',
          add: tenframe('tb', TX, TY2, 8, { c: 'pos', start: 3 }),
          set: { b: { text: '8' }, n: { text: '10 dan 8 = 18' } },
        },
        {
          say: 'Kalau kotak bawah juga penuh, ada dua kali 10. Itu 20, dua puluh.',
          add: tenframe('tb', TX, TY2, 10, { c: 'pos', start: 8 }),
          set: { b: { text: '10' }, n: { text: '10 dan 10 = {g:20}' } },
        },
      ],
    },
    {
      title: 'Cara membaca',
      steps: [
        {
          say: 'Bilangan 11 sampai 19 disebut belasan. 11 sebelas, 12 dua belas, 13 tiga belas, dan seterusnya sampai 19, sembilan belas.',
          clear: true,
          add: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((k, i) => T(`r${k}`, `${10 + k}  ${NAMA[k]}`, i < 5 ? 110 : 290, 50 + (i % 5) * 40, { size: 18 })),
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Ada berapa bulatan?',
          clear: true,
          add: teen(17),
          ask: {
            options: [
              { t: '17', ok: true, why: '10 dan 7 adalah 17.' },
              { t: '7', why: 'Kotak atas yang penuh juga dihitung, isinya 10.' },
              { t: '16', why: 'Kotak bawah berisi 7. 10 dan 7.' },
              { t: '70', why: '10 dan 7 adalah tujuh belas, 17.' },
            ],
          },
        },
        {
          say: 'Kotak atas 10, kotak bawah 7. 10 dan 7 adalah 17, tujuh belas.',
          add: [T('a', '10 dan 7 = {g:17}', TX, 225, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Ada berapa bulatan?',
      fig: teen(14, 'f'),
      ans: ['14'],
      wrong: { '4': 'Kotak atas yang penuh juga dihitung.', '10': 'Kotak bawah juga dihitung.' },
      steps: ['Kotak atas 10, kotak bawah 4.', '10 dan 4 = 14.'],
    },
    {
      type: 'num',
      q: '10 dan 6 adalah …',
      ans: ['16'],
      wrong: { '4': '10 dan 6 digabung.', '106': 'Ditulis 16, enam belas.' },
      steps: ['10 dan 6.', '= 16.'],
    },
    {
      type: 'num',
      q: 'Dua belas ditulis …',
      ans: ['12'],
      wrong: { '2': 'Dua belas adalah 10 dan 2.', '20': '20 dibaca dua puluh.' },
      steps: ['Dua belas = 10 dan 2.', '= 12.'],
    },
    {
      type: 'num',
      q: '19 = 10 dan …',
      ans: ['9'],
      wrong: { '1': '19 adalah 10 dan 9.', '19': 'Cari bagian setelah 10.' },
      steps: ['19 = 10 + 9.'],
    },
    {
      type: 'num',
      q: 'Ada berapa bulatan?',
      fig: teen(20, 'f'),
      ans: ['20'],
      wrong: { '10': 'Ada dua kotak penuh.', '2': 'Dua kotak penuh adalah dua puluh.' },
      steps: ['Dua kotak penuh.', '10 dan 10 = 20.'],
    },
  ],
};

// ---------- 5.2 Urutan sampai 20 ----------
const l2 = {
  id: 'k1b5-2',
  title: 'Urutan Bilangan sampai 20',
  hook: 'Dalam urutan bilangan, setiap langkah ke kanan bertambah 1. Bilangan yang lebih kanan lebih besar.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Angka berapa yang datang sesudah 15?',
          add: [T('q', '13, 14, 15, …', 200, 100, { size: 36, c: 'pos' })],
          ask: {
            options: [
              { t: '16', ok: true, why: 'Setiap langkah bertambah 1. Sesudah 15 adalah 16.' },
              { t: '14', why: '14 datang sebelum 15.' },
              { t: '20', why: 'Ada angka lain di antara 15 dan 20.' },
              { t: '51', why: '51 jauh lebih besar. Sesudah 15 adalah 16.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Urutan 1 sampai 20',
      steps: [
        {
          say: 'Ini urutan angka 1 sampai 20. Baris kedua dimulai dari 11.',
          clear: true,
          add: track(70),
        },
        {
          say: 'Perhatikan baris bawah. 11 ada tepat di bawah 1, 12 di bawah 2. Bilangan di bawah selalu 10 lebih banyak.',
          hl: ['k0', 'k10', 'k1', 'k11'],
          add: [T('a', '1 → 11,  2 → 12,  3 → 13', 200, 200, { size: 20, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Sebelum, sesudah, di antara',
      steps: [
        {
          say: 'Sebelum 14 adalah 13. Sesudah 14 adalah 15.',
          clear: true,
          add: [...track(70, [13, 14, 15]), T('a', 'sebelum 14: {p:13}    sesudah 14: {g:15}', 200, 195, { size: 20 })],
        },
        {
          say: 'Mana lebih besar, 17 atau 12? 17 ada lebih kanan. Jadi 17 lebih besar.',
          add: [T('b', '17 {g:lebih besar} dari 12', 200, 240, { size: 22 })],
          hl: ['k11', 'k16'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Angka berapa yang ada di antara 18 dan 20?',
          clear: true,
          add: [T('q', '18, …, 20', 200, 100, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '19', ok: true, why: '18, 19, 20.' },
              { t: '17', why: '17 ada sebelum 18.' },
              { t: '21', why: '21 ada sesudah 20.' },
              { t: '10', why: '10 jauh di depan.' },
            ],
          },
        },
        {
          say: '18, 19, 20. Angka di antaranya 19.',
          add: [T('a', '18, {g:19}, 20', 200, 190, { size: 36 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Angka sesudah 12 adalah …',
      ans: ['13'],
      wrong: { '11': '11 datang sebelum 12.' },
      steps: ['12, 13.', 'Sesudah 12 adalah 13.'],
    },
    {
      type: 'num',
      q: 'Angka sebelum 20 adalah …',
      ans: ['19'],
      wrong: { '21': '21 datang sesudah 20.' },
      steps: ['19, 20.', 'Sebelum 20 adalah 19.'],
    },
    {
      q: 'Mana yang lebih besar?',
      options: [
        { t: '18', ok: true },
        { t: '15', why: '18 ada lebih kanan dari 15.' },
      ],
      steps: ['… 15, 16, 17, 18.', '18 lebih besar.'],
    },
    {
      q: 'Mana yang lebih kecil?',
      options: [
        { t: '11', ok: true },
        { t: '16', why: '11 ada lebih kiri dari 16.' },
      ],
      steps: ['11, 12, …, 16.', '11 lebih kecil.'],
    },
    {
      type: 'num',
      q: '14, 15, …, 17. Angka yang hilang adalah …',
      ans: ['16'],
      wrong: { '18': '18 datang sesudah 17.', '13': '13 datang sebelum 14.' },
      steps: ['14, 15, 16, 17.'],
    },
  ],
};

export default {
  id: 'k1b5',
  no: 5,
  title: 'Membilang sampai 20',
  desc: 'Bilangan belasan sebagai 10 dan sekian, cara membacanya, urutan bilangan sampai 20, dan membandingkan.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: '10 dan 5 adalah …',
      ans: ['15'],
      wrong: { '5': '10 dan 5 digabung.' },
      steps: ['10 + 5 = 15.'],
    },
    {
      type: 'num',
      q: 'Delapan belas ditulis …',
      ans: ['18'],
      wrong: { '8': 'Delapan belas adalah 10 dan 8.', '80': '80 dibaca delapan puluh.' },
      steps: ['10 dan 8 = 18.'],
    },
    {
      type: 'num',
      q: 'Angka di antara 16 dan 18 adalah …',
      ans: ['17'],
      wrong: { '15': '15 ada sebelum 16.', '19': '19 ada sesudah 18.' },
      steps: ['16, 17, 18.'],
    },
  ],
};
