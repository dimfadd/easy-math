// Kelas 5 · Bab 2: KPK dan FPB (dengan mendaftar kelipatan dan faktor)
import { T, box, ln } from '../helpers.js';

// Garis bilangan 0–24 dengan lompatan kelipatan
const NX = (v) => 30 + v * 14.2;
const line = (y) => [ln('nl', 25, y, 375, y, { sw: 2.5, c: 'ink', draw: false }), ...Array.from({ length: 25 }, (_, v) => [ln(`t${v}`, NX(v), y - 5, NX(v), y + 5, { sw: 1.5, c: 'ink', draw: false }), ...(v % 2 === 0 ? [T(`n${v}`, String(v), NX(v), y + 17, { size: 10, c: 'mut' })] : [])]).flat()];
const hops = (p, step, y, c, up = true) => {
  const els = [];
  for (let v = step; v <= 24; v += step) els.push({ id: `${p}${v}`, t: 'hop', x: NX(v - step), x2: NX(v), y, c, below: !up, h: step * 4 + 6 });
  return els;
};
const mark = (id, v, y, c) => ({ id, t: 'circle', x: NX(v), y, r: 6, fill: c, stroke: 'ink', sw: 1.5 });

// ---------- 2.1 Kelipatan dan KPK ----------
const Y = 150;
const l1 = {
  id: 'k5b2-1',
  title: 'Kelipatan dan KPK',
  hook: 'Kelipatan adalah hasil lompatan yang sama berulang-ulang. Kelipatan persekutuan terkecil (KPK) adalah tempat pertama dua lompatan bertemu.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Katak biru melompat 4-4. Katak kuning melompat 6-6. Keduanya mulai dari 0. Di angka berapa mereka pertama kali mendarat di tempat yang sama?',
          add: [...line(Y), ...hops('a', 4, Y, 'pos', true), ...hops('b', 6, Y, 'acc', false)],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Kelipatan 4: 4, 8, 12. Kelipatan 6: 6, 12. Pertama sama di 12.' },
              { t: '24', why: '24 juga sama, tetapi bukan yang pertama.' },
              { t: '10', why: '10 bukan kelipatan 4 maupun 6.' },
              { t: '2', why: '2 adalah faktor, bukan kelipatan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mendaftar kelipatan',
      steps: [
        {
          say: 'Kelipatan 4 adalah 4, 8, 12, 16, 20, 24, dan seterusnya. Hasil 4 kali 1, 4 kali 2, 4 kali 3, dan seterusnya.',
          clear: true,
          add: [...line(Y), ...hops('a', 4, Y, 'pos', true), T('a', 'kelipatan 4: 4, 8, 12, 16, 20, 24, …', 200, 40, { size: 16, c: 'pos' })],
        },
        {
          say: 'Kelipatan 6 adalah 6, 12, 18, 24, dan seterusnya.',
          add: [...hops('b', 6, Y, 'acc', false), T('b', 'kelipatan 6: 6, 12, 18, 24, …', 200, 250, { size: 16, c: 'acc' })],
        },
        {
          say: 'Kelipatan yang sama disebut kelipatan persekutuan: 12 dan 24. Yang terkecil, 12, disebut KPK dari 4 dan 6.',
          add: [mark('m12', 12, Y, 'ok'), mark('m24', 24, Y, 'ok'), T('k', 'KPK(4, 6) = {g:12}', 200, 280, { size: 22 })],
        },
      ],
    },
    {
      title: 'Soal cerita KPK',
      steps: [
        {
          say: 'Lampu merah berkedip setiap 4 detik, lampu hijau setiap 6 detik. Keduanya baru saja berkedip bersama. Kapan berkedip bersama lagi? Setelah KPK dari 4 dan 6, yaitu 12 detik.',
          clear: true,
          add: [{ id: 'l1', t: 'circle', x: 140, y: 90, r: 26, fill: 'neg', stroke: 'ink', sw: 2 }, T('t1', 'tiap 4 detik', 140, 140, { size: 15 }), { id: 'l2', t: 'circle', x: 260, y: 90, r: 26, fill: 'ok', stroke: 'ink', sw: 2 }, T('t2', 'tiap 6 detik', 260, 140, { size: 15 }), T('k', 'bersama lagi: KPK = {g:12 detik}', 200, 200, { size: 22 })],
        },
        {
          say: 'Kata kunci soal KPK: bersama-sama lagi, bertemu lagi, setiap sekian waktu.',
          add: [T('k2', 'kata kunci: "bersama lagi", "bertemu lagi"', 200, 245, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa KPK dari 3 dan 5?',
          clear: true,
          add: [T('q', 'KPK(3, 5) = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '15', ok: true, why: 'Kelipatan 3: 3, 6, 9, 12, 15. Kelipatan 5: 5, 10, 15. Pertama sama: 15.' },
              { t: '8', why: '3 + 5 = 8 bukan kelipatan 3.' },
              { t: '1', why: '1 adalah faktor persekutuan. KPK adalah kelipatan.' },
              { t: '30', why: '30 kelipatan bersama, tetapi bukan yang terkecil.' },
            ],
          },
        },
        {
          say: 'Daftar kelipatan 3 dan 5. Yang pertama sama adalah 15.',
          add: [T('a', '3: 3, 6, 9, 12, {g:15}', 200, 180, { size: 20 }), T('b', '5: 5, 10, {g:15}', 200, 215, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'KPK dari 2 dan 3 adalah …',
      ans: ['6'],
      wrong: { '5': '5 bukan kelipatan 2.', '1': 'KPK adalah kelipatan, bukan faktor.' },
      steps: ['2: 2, 4, 6. 3: 3, 6.', 'KPK = 6.'],
    },
    {
      type: 'num',
      q: 'KPK dari 6 dan 8 adalah …',
      ans: ['24'],
      wrong: { '48': '48 kelipatan bersama, tetapi 24 lebih kecil.', '2': '2 adalah FPB.' },
      steps: ['6: 6, 12, 18, 24. 8: 8, 16, 24.', 'KPK = 24.'],
    },
    {
      type: 'num',
      q: 'Kelipatan 7 yang ketiga adalah …',
      ans: ['21'],
      wrong: { '10': '7 + 3 bukan kelipatan.', '14': '14 adalah kelipatan kedua.' },
      steps: ['7, 14, 21.'],
    },
    {
      type: 'num',
      q: 'Ani berenang setiap 3 hari, Budi setiap 4 hari. Hari ini mereka berenang bersama. Mereka akan berenang bersama lagi … hari lagi.',
      ans: ['12'],
      wrong: { '7': '3 + 4 bukan kelipatan 3.', '1': 'Cari KPK, bukan FPB.' },
      steps: ['KPK(3, 4).', '= 12 hari.'],
    },
    {
      type: 'num',
      q: 'KPK dari 5 dan 10 adalah …',
      ans: ['10'],
      wrong: { '50': '10 sudah kelipatan 5 dan 10.', '5': 'KPK adalah kelipatan; 5 bukan kelipatan 10.' },
      steps: ['10 adalah kelipatan 5.', 'KPK = 10.'],
    },
  ],
};

// ---------- 2.2 Faktor dan FPB ----------
const cookie = (id, x, y, f = 'acc') => ({ id, t: 'circle', x, y, r: 10, fill: f, stroke: 'ink', sw: 1.5 });
const arr = (p, rows, cols, x0, y0, d = 26, f) => Array.from({ length: rows * cols }, (_, i) => cookie(`${p}${i}`, x0 + (i % cols) * d, y0 + Math.floor(i / cols) * d, f));

const l2 = {
  id: 'k5b2-2',
  title: 'Faktor dan FPB',
  hook: 'Faktor adalah bilangan yang membagi habis. Faktor persekutuan terbesar (FPB) adalah faktor bersama yang paling besar.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 12 kue cokelat dan 18 kue keju. Kue akan dimasukkan ke kantong, setiap kantong isinya sama dan tidak ada sisa. Paling banyak berapa kantong?',
          add: [...arr('a', 2, 6, 60, 70, 26, 'neg'), ...arr('b', 3, 6, 60, 150, 26, 'acc'), T('la', '12', 240, 83, { size: 20, c: 'neg' }), T('lb', '18', 240, 176, { size: 20, c: 'acc' })],
          ask: {
            options: [
              { t: '6', ok: true, why: '6 membagi habis 12 dan 18, dan tidak ada faktor bersama yang lebih besar.' },
              { t: '36', why: '36 adalah KPK. Banyak kantong harus membagi habis 12 dan 18.' },
              { t: '3', why: '3 bisa, tetapi 6 kantong juga bisa dan lebih banyak.' },
              { t: '12', why: '18 tidak bisa dibagi habis menjadi 12 kantong.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mendaftar faktor',
      steps: [
        {
          say: 'Faktor 12 adalah bilangan yang membagi habis 12: 1, 2, 3, 4, 6, 12.',
          clear: true,
          add: [T('a', 'faktor 12: 1, 2, 3, 4, 6, 12', 200, 70, { size: 20, c: 'neg' })],
        },
        {
          say: 'Faktor 18: 1, 2, 3, 6, 9, 18.',
          add: [T('b', 'faktor 18: 1, 2, 3, 6, 9, 18', 200, 120, { size: 20, c: 'acc' })],
        },
        {
          say: 'Faktor yang sama: 1, 2, 3, dan 6. Ini faktor persekutuan. Yang terbesar, 6, disebut FPB.',
          add: [T('c', 'faktor sama: 1, 2, 3, 6', 200, 175, { size: 20, c: 'ok' }), T('k', 'FPB(12, 18) = {g:6}', 200, 225, { size: 26 })],
        },
      ],
    },
    {
      title: 'Soal cerita FPB',
      steps: [
        {
          say: 'Jadi 6 kantong. Setiap kantong berisi 12 bagi 6, yaitu 2 kue cokelat, dan 18 bagi 6, yaitu 3 kue keju.',
          clear: true,
          add: [...Array.from({ length: 6 }, (_, k) => box(`k${k}`, 50 + k * 60, 125, 52, 94, { r: 8, fill: 'paper', stroke: 'mut', sw: 2 })), ...Array.from({ length: 6 }, (_, k) => [cookie(`c${k}a`, 39 + k * 60, 97, 'neg'), cookie(`c${k}b`, 61 + k * 60, 97, 'neg'), cookie(`c${k}c`, 39 + k * 60, 127, 'acc'), cookie(`c${k}d`, 61 + k * 60, 127, 'acc'), cookie(`c${k}e`, 50 + k * 60, 152, 'acc')]).flat(), T('k', '6 kantong: 2 cokelat + 3 keju', 200, 205, { size: 20, c: 'ok' })],
        },
        {
          say: 'Kata kunci soal FPB: dibagi sama banyak, paling banyak kelompok, tanpa sisa.',
          add: [T('kk', 'kata kunci: "sama banyak", "paling banyak", "tanpa sisa"', 200, 245, { size: 14, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa FPB dari 8 dan 20?',
          clear: true,
          add: [T('q', 'FPB(8, 20) = ?', 200, 110, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Faktor 8: 1, 2, 4, 8. Faktor 20: 1, 2, 4, 5, 10, 20. Terbesar yang sama: 4.' },
              { t: '40', why: '40 adalah KPK.' },
              { t: '2', why: '2 faktor bersama, tetapi 4 lebih besar.' },
              { t: '8', why: '8 tidak membagi habis 20.' },
            ],
          },
        },
        {
          say: 'Faktor bersama 8 dan 20: 1, 2, 4. Yang terbesar 4.',
          add: [T('a', '8: 1, 2, {g:4}, 8', 200, 180, { size: 20 }), T('b', '20: 1, 2, {g:4}, 5, 10, 20', 200, 215, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'FPB dari 6 dan 9 adalah …',
      ans: ['3'],
      wrong: { '18': '18 adalah KPK.', '1': '3 juga faktor bersama dan lebih besar.' },
      steps: ['6: 1, 2, 3, 6. 9: 1, 3, 9.', 'FPB = 3.'],
    },
    {
      type: 'num',
      q: 'FPB dari 16 dan 24 adalah …',
      ans: ['8'],
      wrong: { '4': '8 juga membagi habis keduanya.', '48': '48 adalah KPK.' },
      steps: ['16: 1, 2, 4, 8, 16. 24: 1, 2, 3, 4, 6, 8, 12, 24.', 'FPB = 8.'],
    },
    {
      q: 'Faktor dari 15 adalah …',
      options: [
        { t: '1, 3, 5, 15', ok: true },
        { t: '15, 30, 45', why: 'Itu kelipatan 15.' },
        { t: '1, 2, 3, 5, 15', why: '2 tidak membagi habis 15.' },
      ],
      steps: ['15 = 1 × 15 = 3 × 5.'],
    },
    {
      type: 'num',
      q: '20 apel dan 30 jeruk dibagi ke beberapa keranjang sama banyak tanpa sisa. Paling banyak … keranjang.',
      ans: ['10'],
      wrong: { '60': 'Itu KPK. Cari FPB.', '5': '10 juga membagi habis 20 dan 30.' },
      steps: ['FPB(20, 30).', '= 10.'],
    },
    {
      type: 'num',
      q: 'FPB dari 7 dan 11 adalah …',
      ans: ['1'],
      wrong: { '77': '77 adalah KPK.', '0': 'FPB paling kecil 1.' },
      steps: ['7 dan 11 hanya punya faktor bersama 1.', 'FPB = 1.'],
    },
  ],
};

export default {
  id: 'k5b2',
  no: 2,
  title: 'KPK dan FPB',
  desc: 'Kelipatan dan KPK dengan lompatan pada garis bilangan, faktor dan FPB dengan mendaftar, serta soal cerita keduanya.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'KPK dari 4 dan 10 adalah …',
      ans: ['20'],
      wrong: { '40': '20 sudah kelipatan keduanya.', '2': '2 adalah FPB.' },
      steps: ['4: 4, 8, 12, 16, 20. 10: 10, 20.', 'KPK = 20.'],
    },
    {
      type: 'num',
      q: 'FPB dari 12 dan 30 adalah …',
      ans: ['6'],
      wrong: { '60': '60 adalah KPK.', '3': '6 juga membagi habis keduanya.' },
      steps: ['12: 1, 2, 3, 4, 6, 12. 30: 1, 2, 3, 5, 6, 10, 15, 30.', 'FPB = 6.'],
    },
    {
      q: 'Soal "dua bus berangkat bersama setiap 15 dan 20 menit, kapan berangkat bersama lagi?" diselesaikan dengan …',
      options: [
        { t: 'KPK', ok: true },
        { t: 'FPB', why: '"Bersama lagi" mencari kelipatan yang sama.' },
      ],
      steps: ['Kata kunci "bersama lagi" → KPK.'],
    },
  ],
};
