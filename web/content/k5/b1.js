// Kelas 5 · Bab 1: Bilangan Cacah sampai 1.000.000
import { T, box, table } from '../helpers.js';

const PL = ['ratus ribuan', 'puluh ribuan', 'ribuan', 'ratusan', 'puluhan', 'satuan'];
const PC = ['neg', 'acc', 'ok', 'pos', 'neg', 'acc'];
const PX = [65, 120, 175, 235, 290, 345];
const digits = (p, str, y) => [...str].map((d, i) => box(`${p}${i}`, PX[i], y, 46, 54, { r: 8, fill: `${PC[i]}-soft`, stroke: PC[i], sw: 2.5, label: d, lsize: 28 }));
const heads = (y) => PL.map((n, i) => T(`h${i}`, n.replace(' ', '\n'), PX[i], y, { size: 10, c: PC[i], lh: 1.1 }));
// Angka bersusun 6 kolom
const XS = [130, 160, 190, 220, 250, 280];
const D = (p, str, y, o = {}) => [...str.padStart(6, ' ')].map((ch, i) => (ch === ' ' ? null : T(`${p}${i}`, ch, XS[i], y, { size: 28, ...o }))).filter(Boolean);

// ---------- 1.1 Bilangan besar ----------
const l1 = {
  id: 'k5b1-1',
  title: 'Bilangan sampai Satu Juta',
  hook: 'Setiap tempat bernilai 10 kali tempat di kanannya. Titik memisahkan setiap tiga angka dari kanan supaya bilangan besar mudah dibaca.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa nilai angka 4 pada bilangan 245.318?',
          add: [...heads(40), ...digits('d', '245318', 100)],
          ask: {
            options: [
              { t: '40.000', ok: true, why: 'Angka 4 ada di tempat puluh ribuan: 4 × 10.000 = 40.000.' },
              { t: '4.000', why: '4.000 untuk tempat ribuan. Angka 4 di puluh ribuan.' },
              { t: '400.000', why: 'Itu tempat ratus ribuan, diisi angka 2.' },
              { t: '4', why: 'Nilai angka tergantung tempatnya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tempat yang makin besar',
      steps: [
        {
          say: 'Setelah ribuan ada puluh ribuan, lalu ratus ribuan. Setiap tempat 10 kali lebih besar dari tempat di kanannya.',
          clear: true,
          add: [...heads(40), ...digits('d', '245318', 100)],
        },
        {
          say: '245.318 sama dengan 200.000 tambah 40.000 tambah 5.000 tambah 300 tambah 10 tambah 8.',
          add: [T('a', '200.000 + 40.000 + 5.000', 200, 170, { size: 20 }), T('b', '+ 300 + 10 + 8', 200, 200, { size: 20 })],
        },
        {
          say: 'Dibaca dua ratus empat puluh lima ribu tiga ratus delapan belas. Titik membantu: bagian sebelum titik dibaca dengan kata ribu.',
          add: [T('c', 'dua ratus empat puluh lima ribu · tiga ratus delapan belas', 200, 245, { size: 13, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Satu juta',
      steps: [
        {
          say: '999.999 tambah 1 sama dengan 1.000.000, satu juta. Sepuluh ratus ribuan sama dengan satu juta.',
          clear: true,
          add: [T('a', '999.999 + 1 = 1.000.000', 200, 90, { size: 28, c: 'pos' }), T('b', '10 × 100.000 = 1.000.000', 200, 150, { size: 24 }), T('c', 'satu juta', 200, 200, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tiga ratus enam ribu lima puluh ditulis bagaimana?',
          clear: true,
          add: [T('q', 'tiga ratus enam ribu lima puluh', 200, 100, { size: 22, c: 'pos' })],
          ask: {
            options: [
              { t: '306.050', ok: true, why: '306 ribu, lalu 050: tidak ada ratusan, 5 puluhan, 0 satuan.' },
              { t: '3.650', why: 'Tiga ratus enam ribu ditulis 306.000.' },
              { t: '306.500', why: 'Lima puluh di tempat puluhan, bukan ratusan.' },
              { t: '36.050', why: 'Tiga ratus enam ribu, bukan tiga puluh enam ribu.' },
            ],
          },
        },
        {
          say: 'Bagian ribu: 306. Bagian sisanya: lima puluh, ditulis 050. Jadi 306.050.',
          add: [...heads(150), ...digits('d', '306050', 205)],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai angka 7 pada 172.405 adalah …',
      ans: ['70000', '70.000'],
      wrong: { '7000': '7 di tempat puluh ribuan, bukan ribuan.', '7': 'Nilai bergantung pada tempat.' },
      steps: ['172.405: 1 ratus ribuan, 7 puluh ribuan.', 'Nilai = 70.000.'],
    },
    {
      type: 'num',
      q: 'Lima ratus ribu dua puluh ditulis …',
      ans: ['500020', '500.020'],
      wrong: { '520': 'Lima ratus ribu = 500.000.', '500200': 'Dua puluh di tempat puluhan.' },
      steps: ['500.000 + 20.', '= 500.020.'],
    },
    {
      type: 'num',
      q: '400.000 + 30.000 + 6 = …',
      ans: ['430006', '430.006'],
      wrong: { '436': 'Isi tempat yang kosong dengan 0.', '430060': '6 adalah satuan.' },
      steps: ['430.000 + 6.', '= 430.006.'],
    },
    {
      q: 'Bilangan terbesar adalah …',
      options: [
        { t: '512.003', ok: true },
        { t: '99.999', why: 'Bilangan 5 angka lebih kecil dari bilangan 6 angka.' },
        { t: '510.300', why: 'Ribuan: 512 > 510.' },
      ],
      steps: ['Bandingkan bagian ribu: 512 terbesar.'],
    },
    {
      type: 'num',
      q: 'Berapa ratus ribuan dalam 1.000.000?',
      ans: ['10'],
      wrong: { '100': '100 × 100.000 = 10.000.000.', '1': '1 ratus ribuan = 100.000 saja.' },
      steps: ['100.000 × 10 = 1.000.000.'],
    },
  ],
};

// ---------- 1.2 Menjumlah dan mengurangi bilangan besar ----------
const l2 = {
  id: 'k5b1-2',
  title: 'Menjumlah dan Mengurangi Bilangan Besar',
  hook: 'Bilangan besar dijumlah dan dikurangi dengan cara bersusun yang sama: sejajarkan tempatnya, mulai dari satuan, simpan dan pinjam bila perlu.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah kota punya 45.380 penduduk laki-laki dan 47.250 penduduk perempuan. Berapa semua penduduknya?',
          add: [T('q', '45.380 + 47.250 = ?', 200, 110, { size: 34, c: 'pos' })],
          ask: {
            options: [
              { t: '92.630', ok: true, why: 'Satuan 0, puluhan 8 + 5 = 13 (simpan 1), ratusan 3 + 2 + 1 = 6, ribuan 5 + 7 = 12 (simpan 1), puluh ribuan 4 + 4 + 1 = 9.' },
              { t: '82.630', why: 'Jangan lupa simpanan dari ribuan ke puluh ribuan.' },
              { t: '1.870', why: 'Itu selisihnya.' },
              { t: '92.530', why: 'Puluhan 8 + 5 = 13: simpan 1 ke ratusan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bersusun',
      steps: [
        {
          say: 'Tulis bersusun dengan tempat yang sejajar. Satuan: 0 tambah 0 sama dengan 0. Puluhan: 8 tambah 5 sama dengan 13, tulis 3, simpan 1.',
          clear: true,
          add: [...D('a', '45380', 55), T('op', '+', 100, 95, { size: 28 }), ...D('b', '47250', 95), { id: 'ln', t: 'line', x: 95, y: 118, x2: 295, y2: 118, sw: 3, draw: false }, T('r5', '0', XS[5], 148, { size: 28, c: 'ok' }), T('r4', '3', XS[4], 148, { size: 28, c: 'ok' })],
        },
        {
          say: 'Ratusan: 3 tambah 2 tambah 1 sama dengan 6. Ribuan: 5 tambah 7 sama dengan 12, tulis 2, simpan 1. Puluh ribuan: 4 tambah 4 tambah 1 sama dengan 9.',
          add: [T('r3', '6', XS[3], 148, { size: 28, c: 'ok' }), T('r2', '2', XS[2], 148, { size: 28, c: 'ok' }), T('r1', '9', XS[1], 148, { size: 28, c: 'ok' }), T('k', '45.380 + 47.250 = {g:92.630}', 200, 210, { size: 22 })],
        },
      ],
    },
    {
      title: 'Mengurangi',
      steps: [
        {
          say: '60.000 kurang 23.450. Banyak angka 0 yang harus dipinjam. Cara mudah: 60.000 kurang 1 sama dengan 59.999. Kurangi 23.450, lalu tambah 1 lagi.',
          clear: true,
          add: [T('a', '60.000 − 23.450', 200, 55, { size: 28, c: 'pos' }), T('b', '59.999 − 23.450 = 36.549', 200, 115, { size: 22 }), T('c', '36.549 + 1 = {g:36.550}', 200, 165, { size: 24 })],
        },
        {
          say: '59.999 tidak perlu meminjam karena semua angkanya 9. Ini trik yang berguna untuk bilangan berakhiran banyak nol.',
          add: [T('d', 'trik: kurangi 1 dulu, tambah 1 di akhir', 200, 225, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 72.418 kurang 35.206?',
          clear: true,
          add: [T('q', '72.418 − 35.206 = ?', 200, 110, { size: 34, c: 'pos' })],
          ask: {
            options: [
              { t: '37.212', ok: true, why: 'Satuan 8 − 6 = 2, puluhan 1 − 0 = 1, ratusan 4 − 2 = 2, ribuan 2 − 5: pinjam, 12 − 5 = 7, puluh ribuan 6 − 3 = 3.' },
              { t: '47.212', why: 'Puluh ribuan sudah dipinjam 1: 6 − 3 = 3.' },
              { t: '107.624', why: 'Itu penjumlahan.' },
              { t: '37.222', why: 'Puluhan 1 − 0 = 1.' },
            ],
          },
        },
        {
          say: 'Ribuan 2 kurang 5 tidak cukup. Pinjam dari puluh ribuan: 12 kurang 5 sama dengan 7. Puluh ribuan tinggal 6, kurang 3 sama dengan 3. Hasilnya 37.212.',
          add: [T('a', '72.418 − 35.206 = {g:37.212}', 200, 190, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '23.415 + 14.302 = …',
      ans: ['37717', '37.717'],
      wrong: { '9113': 'Itu selisihnya.' },
      steps: ['Jumlahkan tiap tempat.', '= 37.717.'],
    },
    {
      type: 'num',
      q: '58.760 + 21.580 = …',
      ans: ['80340', '80.340'],
      wrong: { '79340': 'Jangan lupa simpanan.', '37180': 'Itu pengurangan.' },
      steps: ['Puluhan 6 + 8 = 14, ratusan 7 + 5 + 1 = 13, ribuan 8 + 1 + 1 = 10, puluh ribuan 5 + 2 + 1 = 8.', '= 80.340.'],
    },
    {
      type: 'num',
      q: '50.000 − 12.345 = …',
      ans: ['37655', '37.655'],
      wrong: { '62345': 'Itu penjumlahan.', '38655': 'Coba trik: 49.999 − 12.345 = 37.654, lalu tambah 1.' },
      steps: ['49.999 − 12.345 = 37.654.', '+ 1 = 37.655.'],
    },
    {
      type: 'num',
      q: 'Tabungan Ayah Rp85.000. Ayah memakai Rp37.500. Sisa tabungan Rp …',
      ans: ['47500', '47.500', 'Rp47.500'],
      wrong: { '122500': 'Memakai berarti berkurang.' },
      steps: ['85.000 − 37.500.', '= 47.500.'],
    },
    {
      type: 'num',
      q: 'Sebuah stadion terisi 24.650 penonton di tribun utara dan 31.275 di tribun selatan. Jumlah penonton …',
      ans: ['55925', '55.925'],
      wrong: { '6625': 'Itu selisihnya.' },
      steps: ['24.650 + 31.275.', '= 55.925.'],
    },
  ],
};

export default {
  id: 'k5b1',
  no: 1,
  title: 'Bilangan Cacah sampai 1.000.000',
  desc: 'Nilai tempat sampai ratus ribuan, membaca dan menulis bilangan besar, satu juta, serta penjumlahan dan pengurangan bersusun bilangan besar.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Nilai angka 9 pada 395.120 adalah …',
      ans: ['90000', '90.000'],
      wrong: { '9000': '9 di tempat puluh ribuan.' },
      steps: ['395.120 = 300.000 + 90.000 + …', 'Nilai = 90.000.'],
    },
    {
      type: 'num',
      q: '100.000 − 1 = …',
      ans: ['99999', '99.999'],
      wrong: { '99000': 'Kurang 1 dari 100.000 adalah 99.999.' },
      steps: ['99.999.'],
    },
    {
      type: 'num',
      q: '36.204 + 13.796 = …',
      ans: ['50000', '50.000'],
      wrong: { '49000': 'Ikuti simpanan sampai puluh ribuan.' },
      steps: ['Setiap tempat menghasilkan 10 dan menyimpan 1.', '= 50.000.'],
    },
  ],
};
