// Kelas 5 · Bab 5: Sudut
import { T, ln } from '../helpers.js';

const rad = (d) => (d * Math.PI) / 180;
const ray = (id, x, y, deg, L, o = {}) => ln(id, x, y, x + L * Math.cos(rad(deg)), y - L * Math.sin(rad(deg)), { sw: 3.5, c: 'pos', ...o });
const prot = (id, x, y, r = 140) => ({ id, t: 'prot', x, y, r, double: true });
const marker = (id, x, y, deg, c = 'neg', r = 26) => ({ id, t: 'arc', x, y, r, a1: 0, a2: deg, c, right: deg === 90 });
const OX = 200;
const OY = 225;

// ---------- 5.1 Mengukur sudut ----------
const l1 = {
  id: 'k5b5-1',
  title: 'Mengukur Sudut',
  hook: 'Besar sudut diukur dalam derajat (°) dengan busur derajat. Letakkan titik tengah busur di titik sudut, garis 0 di salah satu kaki, lalu baca angka di kaki lainnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Busur derajat diletakkan pada sudut ini. Satu kaki di angka 0. Kaki lainnya menunjuk angka berapa?',
          add: [prot('p', OX, OY), ray('k1', OX, OY, 0, 165), ray('k2', OX, OY, 60, 165)],
          ask: {
            options: [
              { t: '60°', ok: true, why: 'Kaki kedua menunjuk angka 60 pada skala yang dimulai dari 0.' },
              { t: '120°', why: '120 adalah skala sebaliknya. Pakai skala yang 0-nya di kaki pertama.' },
              { t: '90°', why: '90° tegak lurus. Kaki ini lebih miring.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Cara memakai busur',
      steps: [
        {
          say: 'Satu: letakkan titik tengah busur tepat di titik sudut.',
          clear: true,
          add: [prot('p', OX, OY), ray('k1', OX, OY, 0, 165), ray('k2', OX, OY, 45, 165)],
          hl: ['p'],
        },
        {
          say: 'Dua: garis 0 busur berimpit dengan salah satu kaki sudut.',
          hl: ['k1'],
        },
        {
          say: 'Tiga: baca angka yang ditunjuk kaki lainnya, mulai dari skala yang 0-nya di kaki pertama. Sudut ini 45 derajat.',
          add: [marker('m', OX, OY, 45), T('a', '45°', 290, 70, { size: 30, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Dua skala',
      steps: [
        {
          say: 'Busur punya dua baris angka. Baris luar dari kanan, baris dalam dari kiri. Pakai baris yang angka 0-nya berada di kaki pertama.',
          clear: true,
          add: [prot('p', OX, OY), ray('k1', OX, OY, 180, 165), ray('k2', OX, OY, 130, 165), { ...marker('m', OX, OY, 180), a1: 130 }],
        },
        {
          say: 'Di sini kaki pertama ke kiri. Baca baris dalam yang 0-nya di kiri: 50 derajat, bukan 130.',
          add: [T('a', '50°, bukan 130°', 200, 40, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa besar sudut ini?',
          clear: true,
          add: [prot('p', OX, OY), ray('k1', OX, OY, 0, 165), ray('k2', OX, OY, 110, 165)],
          ask: {
            options: [
              { t: '110°', ok: true, why: 'Kaki pertama di 0 kanan. Kaki kedua menunjuk 110 pada skala itu.' },
              { t: '70°', why: '70 adalah skala yang 0-nya di kiri.' },
              { t: '100°', why: 'Lihat lebih teliti: kaki di antara 100 dan 120, tepat di 110.' },
            ],
          },
        },
        {
          say: 'Mulai dari 0 di kanan, kaki kedua menunjuk 110. Sudutnya 110 derajat.',
          add: [marker('m', OX, OY, 110), T('a', '{g:110°}', 320, 70, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Berapa derajat sudut ini?',
      fig: [prot('p', 200, 230, 150), ray('k1', 200, 230, 0, 175), ray('k2', 200, 230, 30, 175)],
      ans: ['30', '30°'],
      wrong: { '150': 'Pakai skala yang 0-nya di kaki pertama.' },
      steps: ['Kaki kedua di 30.'],
    },
    {
      type: 'num',
      q: 'Berapa derajat sudut ini?',
      fig: [prot('p', 200, 230, 150), ray('k1', 200, 230, 0, 175), ray('k2', 200, 230, 150, 175)],
      ans: ['150', '150°'],
      wrong: { '30': 'Kaki pertama di 0 kanan. Baca skala dari kanan.' },
      steps: ['Kaki kedua di 150.'],
    },
    {
      q: 'Saat mengukur sudut, titik tengah busur diletakkan di …',
      options: [
        { t: 'titik sudut', ok: true },
        { t: 'ujung kaki sudut', why: 'Titik tengah busur harus di titik pertemuan kedua kaki.' },
        { t: 'mana saja', why: 'Posisinya harus tepat agar hasilnya benar.' },
      ],
      steps: ['Titik tengah busur di titik sudut.'],
    },
    {
      type: 'num',
      q: 'Satu putaran penuh besarnya … derajat.',
      ans: ['360', '360°'],
      wrong: { '180': '180° adalah setengah putaran.', '100': 'Satu putaran 360°.' },
      steps: ['Satu putaran = 360°.'],
    },
    {
      type: 'num',
      q: 'Sudut siku-siku besarnya … derajat.',
      ans: ['90', '90°'],
      wrong: { '180': '180° adalah sudut lurus.' },
      steps: ['Siku-siku = 90°.'],
    },
  ],
};

// ---------- 5.2 Jenis sudut ----------
const KINDS = [['lancip', 50, 'ok'], ['siku-siku', 90, 'pos'], ['tumpul', 130, 'acc'], ['lurus', 180, 'neg']];

const l2 = {
  id: 'k5b5-2',
  title: 'Jenis-jenis Sudut',
  hook: 'Sudut kurang dari 90° disebut lancip, tepat 90° siku-siku, antara 90° dan 180° tumpul, dan tepat 180° lurus.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sudut ini besarnya 130 derajat. Termasuk jenis apa?',
          add: [ray('k1', 150, 200, 0, 150), ray('k2', 150, 200, 130, 150), marker('m', 150, 200, 130, 'acc', 30)],
          ask: {
            options: [
              { t: 'tumpul', ok: true, why: '130° lebih dari 90° dan kurang dari 180°.' },
              { t: 'lancip', why: 'Lancip kurang dari 90°.' },
              { t: 'siku-siku', why: 'Siku-siku tepat 90°.' },
              { t: 'lurus', why: 'Lurus tepat 180°.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Empat jenis sudut',
      steps: [
        {
          say: 'Lancip: kurang dari 90 derajat. Siku-siku: tepat 90 derajat.',
          clear: true,
          add: KINDS.slice(0, 2).flatMap(([n, d, c], i) => [ray(`a${i}`, 40 + i * 190, 120, 0, 110, { c: 'ink' }), ray(`b${i}`, 40 + i * 190, 120, d, 90, { c: 'ink' }), marker(`m${i}`, 40 + i * 190, 120, d, c, 24), T(`l${i}`, n, 95 + i * 190, 145, { size: 16, c }), T(`d${i}`, d === 90 ? '= 90°' : '< 90°', 95 + i * 190, 165, { size: 13, c: 'mut' })]),
        },
        {
          say: 'Tumpul: lebih dari 90 tetapi kurang dari 180 derajat. Lurus: tepat 180 derajat, seperti garis lurus.',
          add: KINDS.slice(2).flatMap(([n, d, c], i) => [ray(`a${i + 2}`, 110 + i * 170, 255, 0, 80, { c: 'ink' }), ray(`b${i + 2}`, 110 + i * 170, 255, d, 80, { c: 'ink' }), marker(`m${i + 2}`, 110 + i * 170, 255, d, c, 22), T(`l${i + 2}`, n, 110 + i * 170, 280, { size: 16, c }), T(`d${i + 2}`, d === 180 ? '= 180°' : '90°–180°', 175 + i * 170, 230, { size: 12, c: 'mut' })]),
        },
      ],
    },
    {
      title: 'Sudut pada jam',
      steps: [
        {
          say: 'Satu putaran jam 360 derajat dibagi 12 angka. Setiap angka 30 derajat. Pukul 2 membentuk sudut 2 kali 30, yaitu 60 derajat, lancip.',
          clear: true,
          add: [{ id: 'cl', t: 'circle', x: 200, y: 140, r: 90, fill: 'paper', stroke: 'ink', sw: 3 }, ...Array.from({ length: 12 }, (_, i) => T(`h${i}`, String(i === 0 ? 12 : i), 200 + 74 * Math.sin(rad(i * 30)), 140 - 74 * Math.cos(rad(i * 30)), { size: 13 })), ray('jm', 200, 140, 90, 70, { c: 'ink', sw: 4 }), ray('jp', 200, 140, 30, 50, { c: 'neg', sw: 5 }), { ...marker('m', 200, 140, 90, 'ok', 22), a1: 30, right: false }],
        },
        {
          say: 'Sudut di antara jarum: dari angka 12 ke angka 2 ada 2 langkah. 2 kali 30 sama dengan 60 derajat.',
          hl: ['m'],
          add: [T('a', '2 × 30° = {g:60°}', 200, 260, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sudut 90 derajat termasuk jenis apa?',
          clear: true,
          add: [ray('k1', 150, 200, 0, 140), ray('k2', 150, 200, 90, 140), marker('m', 150, 200, 90, 'pos', 26)],
          ask: {
            options: [
              { t: 'siku-siku', ok: true, why: 'Tepat 90° adalah sudut siku-siku.' },
              { t: 'lancip', why: 'Lancip kurang dari 90°, bukan tepat 90°.' },
              { t: 'tumpul', why: 'Tumpul lebih dari 90°.' },
            ],
          },
        },
        {
          say: 'Tepat 90 derajat adalah sudut siku-siku, ditandai kotak kecil.',
          add: [T('a', '{g:siku-siku}', 290, 110, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Sudut 35° termasuk sudut …',
      options: [
        { t: 'lancip', ok: true },
        { t: 'tumpul', why: 'Tumpul lebih dari 90°.' },
        { t: 'siku-siku', why: 'Siku-siku tepat 90°.' },
      ],
      steps: ['35° < 90° → lancip.'],
    },
    {
      q: 'Sudut 150° termasuk sudut …',
      options: [
        { t: 'tumpul', ok: true },
        { t: 'lancip', why: 'Lancip kurang dari 90°.' },
        { t: 'lurus', why: 'Lurus tepat 180°.' },
      ],
      steps: ['90° < 150° < 180° → tumpul.'],
    },
    {
      type: 'num',
      q: 'Sudut yang dibentuk jarum jam pada pukul 3.00 adalah … derajat.',
      ans: ['90', '90°'],
      wrong: { '3': 'Setiap angka 30°: 3 × 30.', '45': '3 × 30 = 90.' },
      steps: ['3 langkah × 30°.', '= 90°.'],
    },
    {
      type: 'num',
      q: 'Sudut yang dibentuk jarum jam pada pukul 6.00 adalah … derajat.',
      ans: ['180', '180°'],
      wrong: { '6': '6 × 30 = 180.', '360': 'Itu satu putaran penuh.' },
      steps: ['6 × 30°.', '= 180° (sudut lurus).'],
    },
    {
      q: 'Pojok buku membentuk sudut …',
      options: [
        { t: 'siku-siku', ok: true },
        { t: 'lancip', why: 'Pojok buku tepat 90°.' },
        { t: 'tumpul', why: 'Pojok buku tepat 90°.' },
      ],
      steps: ['Pojok buku = 90°.'],
    },
  ],
};

export default {
  id: 'k5b5',
  no: 5,
  title: 'Sudut',
  desc: 'Mengukur sudut dengan busur derajat dan memilih skala yang benar, jenis sudut lancip, siku-siku, tumpul, dan lurus, serta sudut pada jam.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Sudut pada jarum jam pukul 4.00 adalah … derajat.',
      ans: ['120', '120°'],
      wrong: { '4': '4 × 30.', '240': 'Ambil sudut yang lebih kecil: 4 × 30 = 120.' },
      steps: ['4 × 30° = 120°.'],
    },
    {
      q: 'Sudut 90°–180° (tidak termasuk keduanya) disebut …',
      options: [
        { t: 'tumpul', ok: true },
        { t: 'lancip', why: 'Lancip kurang dari 90°.' },
        { t: 'lurus', why: 'Lurus tepat 180°.' },
      ],
      steps: ['Di antara 90° dan 180° → tumpul.'],
    },
    {
      type: 'num',
      q: 'Setengah putaran sama dengan … derajat.',
      ans: ['180', '180°'],
      wrong: { '90': '90° seperempat putaran.' },
      steps: ['360° : 2 = 180°.'],
    },
  ],
};
