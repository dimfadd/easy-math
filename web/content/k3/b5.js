// Kelas 3 · Bab 5: Penyajian Data dalam Tabel
import { T, box, table } from '../helpers.js';

const NAMES = [['Ani', 'merah'], ['Budi', 'biru'], ['Citra', 'merah'], ['Dodi', 'hijau'], ['Eka', 'biru'], ['Fani', 'merah'], ['Gita', 'kuning'], ['Hadi', 'biru'], ['Indah', 'merah'], ['Joko', 'hijau']];
const CNT = { merah: 4, biru: 3, hijau: 2, kuning: 1 };
const COL = { merah: 'neg', biru: 'pos', hijau: 'ok', kuning: 'acc' };
const chip = (id, name, warna, x, y) => box(id, x, y, 84, 26, { r: 13, fill: `${COL[warna]}-soft`, stroke: COL[warna], sw: 2, label: name, lsize: 13 });
const raw = () => NAMES.map(([n, w], i) => chip(`n${i}`, n, w, 60 + (i % 4) * 94, 50 + Math.floor(i / 4) * 40));

// ---------- 5.1 Membuat tabel ----------
const l1 = {
  id: 'k3b5-1',
  title: 'Membuat Tabel',
  hook: 'Data yang masih acak sulit dibaca. Kelompokkan, hitung, lalu tulis dalam tabel dengan judul kolom.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sepuluh anak menyebutkan warna kesukaannya. Warna kartu menunjukkan pilihannya. Warna apa yang paling banyak dipilih?',
          add: raw(),
          ask: {
            options: [
              { t: 'merah', ok: true, why: 'Merah dipilih 4 anak: Ani, Citra, Fani, Indah.' },
              { t: 'biru', why: 'Biru dipilih 3 anak.' },
              { t: 'hijau', why: 'Hijau hanya 2 anak.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kelompokkan dan hitung',
      steps: [
        {
          say: 'Data ini masih acak. Kita kelompokkan menurut warnanya.',
          clear: true,
          add: raw(),
        },
        {
          say: 'Kartu dengan warna yang sama dikumpulkan dalam satu baris.',
          set: (() => {
            const seen = { merah: 0, biru: 0, hijau: 0, kuning: 0 };
            const row = { merah: 0, biru: 1, hijau: 2, kuning: 3 };
            return Object.fromEntries(NAMES.map(([, w], i) => [`n${i}`, { x: 125 + seen[w]++ * 64, y: 50 + row[w] * 45, w: 60, lsize: 12 }]));
          })(),
          add: Object.keys(CNT).map((w, r) => T(`w${r}`, w, 50, 50 + r * 45, { size: 15, c: COL[w] })),
        },
        {
          say: 'Hitung setiap baris. Merah 4, biru 3, hijau 2, kuning 1.',
          add: Object.entries(CNT).map(([, v], r) => T(`c${r}`, String(v), 382, 50 + r * 45, { size: 20, c: 'ok' })),
        },
      ],
    },
    {
      title: 'Tulis dalam tabel',
      steps: [
        {
          say: 'Tabel punya judul kolom. Kolom pertama warna, kolom kedua banyak anak. Setiap baris berisi satu warna.',
          clear: true,
          add: [T('h', 'Warna Kesukaan Kelas 3', 200, 30, { size: 18, c: 'pos' }), table('tb', 200, 130, [['warna', 'banyak anak'], ...Object.entries(CNT).map(([w, v]) => [w, String(v)])], { cw: [130, 130], rh: 32, size: 17, head: true })],
        },
        {
          say: 'Jumlah semua baris harus sama dengan banyak anak yang ditanya: 4 tambah 3 tambah 2 tambah 1 sama dengan 10.',
          add: [T('k', '4 + 3 + 2 + 1 = 10 anak', 200, 240, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari tabel tadi, berapa anak yang memilih biru?',
          clear: true,
          add: [table('tb', 200, 120, [['warna', 'banyak anak'], ...Object.entries(CNT).map(([w, v]) => [w, String(v)])], { cw: [130, 130], rh: 32, size: 17, head: true })],
          ask: {
            options: [
              { t: '3', ok: true, why: 'Baris biru berisi angka 3.' },
              { t: '4', why: '4 adalah merah.' },
              { t: '10', why: '10 adalah semua anak.' },
            ],
          },
        },
        {
          say: 'Cari baris biru, lalu baca kolom banyak anak: 3.',
          add: [T('a', 'biru: {g:3} anak', 200, 240, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Tabel: merah 4, biru 3, hijau 2, kuning 1. Berapa anak yang memilih hijau?',
      ans: ['2'],
      wrong: { '4': '4 adalah merah.' },
      steps: ['Baris hijau: 2.'],
    },
    {
      q: 'Bagian paling atas tabel yang berisi nama setiap kolom disebut …',
      options: [
        { t: 'judul kolom', ok: true },
        { t: 'baris terakhir', why: 'Judul kolom ada di paling atas.' },
        { t: 'jumlah', why: 'Jumlah adalah hasil penjumlahan data.' },
      ],
      steps: ['Baris paling atas: judul kolom.'],
    },
    {
      type: 'num',
      q: 'Data: 3 anak suka bola, 5 anak suka renang, 2 anak suka lari. Berapa anak semuanya?',
      ans: ['10'],
      wrong: { '5': 'Jumlahkan semuanya: 3 + 5 + 2.' },
      steps: ['3 + 5 + 2.', '= 10.'],
    },
    {
      q: 'Mengapa data ditulis dalam tabel?',
      options: [
        { t: 'supaya mudah dibaca dan dibandingkan', ok: true },
        { t: 'supaya datanya bertambah', why: 'Tabel tidak menambah data.' },
        { t: 'supaya angkanya berubah', why: 'Angka data tetap sama.' },
      ],
      steps: ['Tabel merapikan data.'],
    },
    {
      type: 'num',
      q: 'Turus untuk warna ungu berisi satu ikatan (5) dan 2 garis lagi. Banyaknya …',
      ans: ['7'],
      wrong: { '6': 'Satu ikatan turus = 5, ditambah 2.' },
      steps: ['Ikatan 5 + 2.', '= 7.'],
    },
  ],
};

// ---------- 5.2 Membaca tabel ----------
const BUKU = [['Senin', 12], ['Selasa', 8], ['Rabu', 15], ['Kamis', 10], ['Jumat', 5]];
const bukuTable = (id = 'tb', y = 125) => table(id, 200, y, [['hari', 'buku dipinjam'], ...BUKU.map(([h, v]) => [h, String(v)])], { cw: [120, 140], rh: 30, size: 16, head: true });

const l2 = {
  id: 'k3b5-2',
  title: 'Membaca Tabel',
  hook: 'Dari tabel kita bisa menjawab: mana yang terbanyak, mana yang paling sedikit, berapa selisihnya, dan berapa jumlah semuanya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tabel ini mencatat buku yang dipinjam di perpustakaan setiap hari. Hari apa paling banyak buku dipinjam?',
          add: [bukuTable()],
          ask: {
            options: [
              { t: 'Rabu', ok: true, why: 'Rabu 15 buku, angka terbesar di tabel.' },
              { t: 'Senin', why: 'Senin 12, masih lebih kecil dari Rabu 15.' },
              { t: 'Jumat', why: 'Jumat justru paling sedikit, 5 buku.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Terbanyak dan tersedikit',
      steps: [
        {
          say: 'Bandingkan semua angka di kolom buku dipinjam. Terbesar 15, hari Rabu. Terkecil 5, hari Jumat.',
          clear: true,
          add: [bukuTable('tb', 115), T('a', 'terbanyak: {g:Rabu (15)}', 200, 230, { size: 18 }), T('b', 'paling sedikit: {n:Jumat (5)}', 200, 260, { size: 18 })],
        },
      ],
    },
    {
      title: 'Selisih dan jumlah',
      steps: [
        {
          say: 'Berapa lebih banyak buku dipinjam hari Senin dibanding Selasa? 12 kurang 8 sama dengan 4.',
          clear: true,
          add: [bukuTable('tb', 115), T('a', 'Senin − Selasa = 12 − 8 = 4', 200, 230, { size: 18 })],
        },
        {
          say: 'Berapa buku dipinjam selama 5 hari? Jumlahkan semuanya: 12, 8, 15, 10, dan 5. Hasilnya 50.',
          add: [T('b', '12 + 8 + 15 + 10 + 5 = {g:50}', 200, 265, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa lebih banyak buku dipinjam hari Rabu dibanding hari Kamis?',
          clear: true,
          add: [bukuTable('tb', 115)],
          ask: {
            options: [
              { t: '5', ok: true, why: 'Rabu 15, Kamis 10. 15 − 10 = 5.' },
              { t: '25', why: 'Selisih memakai pengurangan.' },
              { t: '15', why: '15 adalah banyak buku hari Rabu.' },
            ],
          },
        },
        {
          say: 'Rabu 15, Kamis 10. 15 kurang 10 sama dengan 5.',
          add: [T('a', '15 − 10 = {g:5}', 200, 245, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Dari tabel buku: Senin 12, Selasa 8, Rabu 15, Kamis 10, Jumat 5. Berapa buku dipinjam hari Kamis?',
      ans: ['10'],
      wrong: { '15': '15 adalah Rabu.' },
      steps: ['Baris Kamis: 10.'],
    },
    {
      type: 'num',
      q: 'Dari tabel buku: Senin 12, Selasa 8, Rabu 15, Kamis 10, Jumat 5. Selisih Rabu dan Jumat adalah …',
      ans: ['10'],
      wrong: { '20': 'Selisih memakai pengurangan.' },
      steps: ['15 − 5.', '= 10.'],
    },
    {
      type: 'num',
      q: 'Dari tabel buku: Senin 12, Selasa 8, Rabu 15, Kamis 10, Jumat 5. Jumlah buku Senin dan Selasa adalah …',
      ans: ['20'],
      wrong: { '4': 'Itu selisihnya. Jumlah memakai penjumlahan.' },
      steps: ['12 + 8.', '= 20.'],
    },
    {
      q: 'Dari tabel buku: Senin 12, Selasa 8, Rabu 15, Kamis 10, Jumat 5. Hari dengan peminjaman paling sedikit adalah …',
      options: [
        { t: 'Jumat', ok: true },
        { t: 'Selasa', why: 'Selasa 8, Jumat 5.' },
        { t: 'Rabu', why: 'Rabu paling banyak.' },
      ],
      steps: ['Angka terkecil 5: Jumat.'],
    },
    {
      type: 'num',
      q: 'Tabel nilai: Ani 80, Budi 75, Citra 90. Nilai Citra lebih tinggi … dari nilai Budi.',
      ans: ['15'],
      wrong: { '165': 'Selisih memakai pengurangan.', '10': '90 − 75 = 15.' },
      steps: ['90 − 75.', '= 15.'],
    },
  ],
};

export default {
  id: 'k3b5',
  no: 5,
  title: 'Penyajian Data dalam Tabel',
  desc: 'Mengelompokkan data acak, menuliskannya dalam tabel dengan judul kolom, dan membaca tabel untuk mencari terbanyak, selisih, dan jumlah.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Dari tabel buku: Senin 12, Selasa 8, Rabu 15, Kamis 10, Jumat 5. Berapa jumlah buku hari Rabu dan Kamis?',
      ans: ['25'],
      wrong: { '5': 'Itu selisihnya.' },
      steps: ['15 + 10.', '= 25.'],
    },
    {
      type: 'num',
      q: 'Tabel hewan peliharaan: kucing 6, ikan 4, burung 3. Berapa semua hewan?',
      ans: ['13'],
      wrong: { '6': 'Jumlahkan semua baris.' },
      steps: ['6 + 4 + 3.', '= 13.'],
    },
    {
      q: 'Tabel hewan peliharaan: kucing 6, ikan 4, burung 3. Hewan yang paling banyak dipelihara adalah …',
      options: [
        { t: 'kucing', ok: true },
        { t: 'ikan', why: 'Ikan 4, kucing 6.' },
        { t: 'burung', why: 'Burung paling sedikit.' },
      ],
      steps: ['Angka terbesar 6: kucing.'],
    },
  ],
};
