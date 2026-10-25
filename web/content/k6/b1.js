// Kelas 6 · Bab 1: Operasi Pecahan dan Persen
import { T, bar } from '../helpers.js';
import { grid } from './kit.js';

// ---------- 1.1 Perkalian pecahan ----------
// Model luas: persegi 4 kolom × 3 baris. 2/3 baris diarsir biru, 3/4 kolom diarsir kuning.
const G = 50;
const GX = 100;
const GY = 60;
const area = (p, fill) => grid(p, GX, GY, G, 3, 4, fill);

const l1 = {
  id: 'k6b1-1',
  title: 'Perkalian Pecahan',
  hook: 'Mengalikan pecahan berarti mengambil bagian dari bagian. Pembilang dikali pembilang, penyebut dikali penyebut.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ibu punya 3/4 loyang kue. Dua pertiganya dimakan. Berapa loyang yang dimakan? Hitung 2/3 kali 3/4.',
          add: [T('q', '2/3 × 3/4 = ?', 200, 120, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '6/12 = 1/2', ok: true, why: '2 × 3 = 6 dan 3 × 4 = 12. 6/12 = 1/2.' },
              { t: '5/7', why: 'Pada perkalian, pembilang dan penyebut dikalikan, bukan dijumlahkan.' },
              { t: '8/9', why: 'Itu hasil kali silang 2 × 4 dan 3 × 3. Kalikan lurus: atas × atas, bawah × bawah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bagian dari bagian',
      steps: [
        {
          say: 'Ini satu loyang, dibagi 4 kolom. Yang tersisa 3/4, yaitu 3 kolom kuning.',
          clear: true,
          add: [...area('a', (r, c) => (c < 3 ? 'acc-soft' : 'paper')), T('l', '3/4', GX + 1.5 * G, 230, { size: 22, c: 'acc' })],
        },
        {
          say: 'Bagi juga menjadi 3 baris. Ambil 2/3 dari bagian kuning: 2 baris dari 3 kolom kuning.',
          set: Object.fromEntries([0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => [`a${r}_${c}`, { fill: c < 3 && r < 2 ? 'ok' : c < 3 ? 'acc-soft' : 'paper' }]))),
          add: [T('m', '2/3 dari 3/4', 352, 110, { size: 15, c: 'ok' })],
        },
        {
          say: 'Petak hijau ada 2 kali 3, yaitu 6. Seluruh loyang ada 3 kali 4, yaitu 12 petak. Hasilnya 6/12, sama dengan 1/2.',
          add: [T('a', '2/3 × 3/4 = {g:6/12} = {g:1/2}', 200, 270, { size: 22 })],
        },
      ],
    },
    {
      title: 'Aturannya',
      steps: [
        {
          say: 'Aturannya: pembilang kali pembilang, penyebut kali penyebut, lalu sederhanakan.',
          clear: true,
          add: [T('r', 'a/b × c/d = (a × c)/(b × d)', 200, 90, { size: 26, c: 'pos' })],
        },
        {
          say: 'Bilangan asli dikali pecahan: tulis bilangan asli sebagai per satu. 4 kali 2/5 sama dengan 8/5, atau 1 3/5.',
          add: [T('b', '4 × 2/5 = 4/1 × 2/5 = {g:8/5} = {g:1 3/5}', 200, 170, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 3/5 kali 1/2?',
          clear: true,
          add: [T('q', '3/5 × 1/2 = ?', 200, 120, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '3/10', ok: true, why: '3 × 1 = 3 dan 5 × 2 = 10.' },
              { t: '4/7', why: 'Jangan dijumlahkan. Kalikan atas dengan atas, bawah dengan bawah.' },
              { t: '6/5', why: 'Itu hasil kali silang. Kalikan lurus.' },
            ],
          },
        },
        {
          say: '3 kali 1 sama dengan 3. 5 kali 2 sama dengan 10. Hasilnya 3/10.',
          add: [T('a', '= {g:3/10}', 200, 190, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '1/2 × 1/3 = …', ans: ['1/6'], wrong: { '2/5': 'Kalikan, jangan jumlahkan.', '2/6': 'Pembilang 1 × 1 = 1.' }, steps: ['1 × 1 = 1, 2 × 3 = 6.', '= 1/6.'] },
    { type: 'num', q: '2/5 × 3/4 = … (sederhanakan)', ans: ['3/10', '6/20'], wrong: { '5/9': 'Kalikan, jangan jumlahkan.', '8/15': 'Itu kali silang.' }, steps: ['2 × 3 = 6, 5 × 4 = 20.', '6/20 = 3/10.'] },
    { type: 'num', q: '6 × 2/3 = …', ans: ['4', '12/3'], wrong: { '12': 'Jangan lupa dibagi 3.', '8/3': '6 × 2 = 12, lalu 12/3.' }, steps: ['6/1 × 2/3 = 12/3.', '= 4.'] },
    { type: 'num', q: 'Pita 3/4 m dipotong 1/3 bagiannya. Panjang potongan … m.', ans: ['1/4', '3/12'], wrong: { '4/7': 'Bagian dari bagian berarti dikali.' }, steps: ['1/3 × 3/4 = 3/12.', '= 1/4 m.'] },
    {
      q: 'Hasil 1/2 × 4/5 dibandingkan 4/5 adalah …',
      options: [
        { t: 'lebih kecil', ok: true },
        { t: 'lebih besar', why: 'Mengalikan dengan pecahan kurang dari 1 membuat hasil lebih kecil.' },
        { t: 'sama', why: 'Setengah dari 4/5 tidak sama dengan 4/5.' },
      ],
      steps: ['1/2 × 4/5 = 2/5 < 4/5.'],
    },
  ],
};

// ---------- 1.2 Pembagian pecahan ----------
const l2 = {
  id: 'k6b1-2',
  title: 'Pembagian Pecahan',
  hook: 'Membagi dengan pecahan sama dengan mengalikan dengan kebalikannya. 3 : 1/4 artinya ada berapa potong 1/4 di dalam 3.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 3 roti. Setiap anak mendapat 1/4 roti. Berapa anak yang mendapat roti? Hitung 3 bagi 1/4.',
          add: [T('q', '3 : 1/4 = ?', 200, 120, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Satu roti berisi 4 potong. 3 roti berisi 12 potong.' },
              { t: '3/4', why: 'Itu 3 × 1/4. Pembagian menanyakan berapa potong 1/4 di dalam 3.' },
              { t: '7', why: 'Hitung potongannya: 4 + 4 + 4.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menghitung potongan',
      steps: [
        {
          say: 'Gambar 3 roti. Potong setiap roti menjadi 4 bagian.',
          clear: true,
          add: [0, 1, 2].map((i) => bar(`r${i}`, 200, 70 + i * 55, 4, 0, { w: 240, h: 36, colors: ['acc', 'acc', 'acc', 'acc'] })),
        },
        {
          say: 'Setiap roti 4 potong. Tiga roti: 3 kali 4 sama dengan 12 potong.',
          add: [T('a', '3 : 1/4 = 3 × 4 = {g:12}', 200, 250, { size: 26 })],
        },
        {
          say: 'Jadi membagi dengan 1/4 sama dengan mengalikan dengan 4. Bilangan 4/1 disebut kebalikan dari 1/4.',
          add: [T('b', 'kebalikan 1/4 adalah 4/1', 200, 285, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Kali kebalikan',
      steps: [
        {
          say: 'Aturannya: balik pecahan pembagi, lalu kalikan.',
          clear: true,
          add: [T('r', 'a/b : c/d = a/b × d/c', 200, 80, { size: 28, c: 'pos' })],
        },
        {
          say: 'Contoh: 2/3 bagi 1/6. Balik 1/6 menjadi 6/1. 2/3 kali 6 sama dengan 12/3, yaitu 4.',
          add: [T('c', '2/3 : 1/6 = 2/3 × 6/1 = 12/3 = {g:4}', 200, 160, { size: 22 })],
        },
        {
          say: 'Cek: ada berapa 1/6 di dalam 2/3? 2/3 sama dengan 4/6. Ada 4. Cocok.',
          add: [bar('cb', 200, 225, 6, 4, { w: 240, h: 34, fc: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 3/4 bagi 3/8?',
          clear: true,
          add: [T('q', '3/4 : 3/8 = ?', 200, 120, { size: 40, c: 'pos' })],
          ask: {
            options: [
              { t: '2', ok: true, why: '3/4 × 8/3 = 24/12 = 2.' },
              { t: '9/32', why: 'Itu hasil kali biasa. Pembagi harus dibalik dulu.' },
              { t: '1/2', why: 'Yang dibalik pembaginya, 3/8, bukan yang dibagi.' },
            ],
          },
        },
        {
          say: 'Balik 3/8 menjadi 8/3. 3/4 kali 8/3 sama dengan 24/12, yaitu 2.',
          add: [T('a', '3/4 × 8/3 = 24/12 = {g:2}', 200, 190, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '2 : 1/3 = …', ans: ['6'], wrong: { '2/3': 'Itu perkalian. Pembagian: 2 × 3.' }, steps: ['2 × 3/1.', '= 6.'] },
    { type: 'num', q: '1/2 : 1/4 = …', ans: ['2', '4/2'], wrong: { '1/8': 'Balik pembagi: 1/2 × 4.' }, steps: ['1/2 × 4/1 = 4/2.', '= 2.'] },
    { type: 'num', q: '4/5 : 2 = …', ans: ['2/5', '4/10'], wrong: { '8/5': 'Dibagi 2 berarti dikali 1/2.' }, steps: ['4/5 × 1/2 = 4/10.', '= 2/5.'] },
    { type: 'num', q: 'Air 6 liter dituang ke botol berisi 3/4 liter. Banyak botol …', ans: ['8'], wrong: { '4.5': '6 : 3/4 = 6 × 4/3.', '9/2': '6 × 4/3 = 24/3.' }, steps: ['6 : 3/4 = 6 × 4/3.', '= 24/3 = 8.'] },
    {
      q: 'Kebalikan dari 2/7 adalah …',
      options: [
        { t: '7/2', ok: true },
        { t: '−2/7', why: 'Itu lawan, bukan kebalikan.' },
        { t: '2/7', why: 'Kebalikan menukar pembilang dan penyebut.' },
      ],
      steps: ['Tukar pembilang dan penyebut: 7/2.'],
    },
  ],
};

// ---------- 1.3 Persen ----------
const pg = (p, k, c = 'pos') => grid(p, 110, 50, 18, 10, 10, (r, cc) => (r * 10 + cc < k ? c : 'paper'), { sw: 0.8 });

const l3 = {
  id: 'k6b1-3',
  title: 'Persen',
  hook: 'Persen artinya per seratus. 25% sama dengan 25/100 = 1/4 = 0,25.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dari 100 petak, 30 diwarnai. Berapa persen yang diwarnai?',
          add: pg('g', 30),
          ask: {
            options: [
              { t: '30%', ok: true, why: '30 dari 100 = 30 per seratus = 30%.' },
              { t: '70%', why: '70% adalah bagian yang tidak diwarnai.' },
              { t: '3%', why: '3% hanya 3 petak dari 100.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Per seratus',
      steps: [
        {
          say: 'Persen ditulis dengan tanda %. 30% berarti 30 dari 100, yaitu 30/100 atau 0,30.',
          clear: true,
          add: [...pg('g', 30), T('a', '30% = 30/100 = 0,3', 200, 260, { size: 22 })],
        },
        {
          say: '25 petak dari 100 sama dengan 25%, yaitu seperempat.',
          set: Object.fromEntries(Array.from({ length: 100 }, (_, i) => [`g${Math.floor(i / 10)}_${i % 10}`, { fill: i < 25 ? 'ok' : 'paper' }])),
          del: ['a'],
          add: [T('b', '25% = 25/100 = {g:1/4}', 200, 260, { size: 22 })],
        },
      ],
    },
    {
      title: 'Persen dari suatu bilangan',
      steps: [
        {
          say: 'Berapa 20% dari 60 kelereng? 20% sama dengan 20/100.',
          clear: true,
          add: [T('q', '20% dari 60', 200, 70, { size: 30, c: 'pos' })],
        },
        {
          say: '20/100 kali 60 sama dengan 1200/100, yaitu 12 kelereng.',
          add: [T('a', '20/100 × 60 = 1200/100 = {g:12}', 200, 140, { size: 24 })],
        },
        {
          say: 'Cara cepat: 10% dari 60 adalah 6. 20% adalah dua kalinya, 12.',
          add: [T('b', '10% → 6, 20% → {g:12}', 200, 200, { size: 22, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Harga sepatu Rp200.000 diberi diskon 25%. Berapa besar diskonnya?',
          clear: true,
          add: [T('q', '25% dari Rp200.000', 200, 110, { size: 28, c: 'pos' })],
          ask: {
            options: [
              { t: 'Rp50.000', ok: true, why: '25% = 1/4. 200.000 : 4 = 50.000.' },
              { t: 'Rp25.000', why: '25% bukan 25 ribu. 25% dari 200.000 = 50.000.' },
              { t: 'Rp150.000', why: 'Itu harga setelah diskon. Yang ditanya besar diskonnya.' },
            ],
          },
        },
        {
          say: '25% sama dengan seperempat. Seperempat dari 200 ribu adalah 50 ribu.',
          add: [T('a', '200.000 : 4 = {g:Rp50.000}', 200, 180, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '50% dari 80 = …', ans: ['40'], wrong: { '50': '50% = setengah. 80 : 2.' }, steps: ['50% = 1/2.', '80 : 2 = 40.'] },
    { type: 'num', q: '10% dari 350 = …', ans: ['35'], wrong: { '3.5': '10% = 1/10. 350 : 10 = 35.' }, steps: ['350 : 10 = 35.'] },
    { type: 'num', q: '3/4 = …% (tulis angkanya)', ans: ['75', '75%'], wrong: { '34': 'Ubah ke per seratus: 3/4 = 75/100.', '0.75': 'Itu desimalnya. Persennya 75.' }, steps: ['3/4 = 75/100.', '= 75%.'] },
    { type: 'num', q: '0,4 = …% (tulis angkanya)', ans: ['40', '40%'], wrong: { '4': '0,4 = 40/100.' }, steps: ['0,4 = 40/100 = 40%.'] },
    { type: 'num', q: 'Dari 40 siswa, 30% suka voli. Banyak siswa yang suka voli …', ans: ['12'], wrong: { '30': '30% dari 40, bukan 30 siswa.' }, steps: ['30/100 × 40.', '= 12.'] },
  ],
};

export default {
  id: 'k6b1',
  no: 1,
  title: 'Operasi Pecahan dan Persen',
  desc: 'Perkalian pecahan dengan model luas, pembagian pecahan dengan kebalikan, dan persen sebagai per seratus.',
  lessons: [l1, l2, l3],
  extra: [
    { type: 'num', q: '2/3 × 9 = …', ans: ['6', '18/3'], steps: ['18/3 = 6.'] },
    { type: 'num', q: '5 : 1/2 = …', ans: ['10'], wrong: { '5/2': 'Dibagi 1/2 berarti dikali 2.' }, steps: ['5 × 2 = 10.'] },
    { type: 'num', q: '15% dari 200 = …', ans: ['30'], wrong: { '15': '10% = 20, 5% = 10.' }, steps: ['10% = 20, 5% = 10.', '20 + 10 = 30.'] },
  ],
};
