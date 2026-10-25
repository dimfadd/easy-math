// Kelas 6 · Bab 5: Perbandingan Senilai dan Berbalik Nilai
import { T, table } from '../helpers.js';

const tb = (id, rows, o = {}) => table(id, 200, 110, rows, { cw: [110, 60, 60, 60, 60], rh: 34, size: 16, head: false, ...o });

// ---------- 5.1 Senilai ----------
const PENSIL = [['pensil', '1', '2', '3', '4'], ['harga (Rp)', '2.000', '4.000', '6.000', '8.000']];

const l1 = {
  id: 'k6b5-1',
  title: 'Perbandingan Senilai',
  hook: 'Dua besaran senilai jika yang satu menjadi 2 kali, 3 kali, yang lain juga menjadi 2 kali, 3 kali. Hasil baginya selalu tetap.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Harga 3 buku Rp15.000. Berapa harga 6 buku?',
          add: [T('q', '3 buku → Rp15.000\n6 buku → ?', 200, 110, { size: 28, c: 'pos' })],
          ask: {
            options: [
              { t: 'Rp30.000', ok: true, why: 'Banyak buku 2 kali lipat, harganya juga 2 kali lipat.' },
              { t: 'Rp18.000', why: 'Bukan ditambah 3 ribu. Banyaknya 2 kali, harga juga 2 kali.' },
              { t: 'Rp7.500', why: 'Lebih banyak buku, harganya makin mahal.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tabel senilai',
      steps: [
        {
          say: 'Harga satu pensil Rp2.000. Lihat tabelnya.',
          clear: true,
          add: [tb('t', PENSIL)],
        },
        {
          say: 'Pensil menjadi 2 kali, harga menjadi 2 kali. Pensil 3 kali, harga 3 kali. Ini perbandingan senilai.',
          set: { t: { hl: [[0, 1], [1, 1], [0, 3], [1, 3]] } },
          add: [T('a', '× 3 → × 3', 200, 175, { size: 20, c: 'ok' })],
        },
        {
          say: 'Harga dibagi banyak pensil selalu 2.000. Hasil bagi yang tetap adalah ciri senilai.',
          add: [T('b', 'harga : pensil = {g:2.000} (tetap)', 200, 225, { size: 20 })],
        },
      ],
    },
    {
      title: 'Cara satuan',
      steps: [
        {
          say: 'Mobil memakai 4 liter bensin untuk 48 km. Berapa km untuk 7 liter? Cari dulu satu liter.',
          clear: true,
          add: [T('a', '4 liter → 48 km', 200, 60, { size: 24 })],
        },
        {
          say: '1 liter: 48 dibagi 4, yaitu 12 km.',
          add: [T('b', '1 liter → 48 : 4 = 12 km', 200, 120, { size: 22 })],
        },
        {
          say: '7 liter: 7 kali 12, yaitu 84 km.',
          add: [T('c', '7 liter → 7 × 12 = {g:84 km}', 200, 180, { size: 24 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 5 kg beras harganya Rp60.000. Berapa harga 2 kg?',
          clear: true,
          add: [T('q', '5 kg → Rp60.000\n2 kg → ?', 200, 110, { size: 28, c: 'pos' })],
          ask: {
            options: [
              { t: 'Rp24.000', ok: true, why: '1 kg = 12.000. 2 kg = 24.000.' },
              { t: 'Rp30.000', why: 'Rp30.000 itu setengah dari 60 ribu. 2 kg bukan setengah dari 5 kg.' },
              { t: 'Rp150.000', why: 'Berat lebih sedikit, harganya lebih murah.' },
            ],
          },
        },
        {
          say: '1 kg: 60 ribu dibagi 5, 12 ribu. 2 kg: 24 ribu.',
          add: [T('a', '60.000 : 5 × 2 = {g:Rp24.000}', 200, 200, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '2 kg gula Rp30.000. Harga 5 kg … (rupiah)', ans: ['75000', '75.000'], wrong: { '33000': 'Senilai: cari 1 kg dulu.' }, steps: ['1 kg = 15.000.', '5 × 15.000 = 75.000.'] },
    { type: 'num', q: 'Motor menempuh 90 km dengan 2 liter. Dengan 5 liter … km', ans: ['225'], steps: ['1 liter = 45 km.', '5 × 45 = 225.'] },
    { type: 'num', q: '6 telur untuk 2 kue. 15 telur untuk … kue', ans: ['5'], steps: ['3 telur per kue.', '15 : 3 = 5.'] },
    {
      q: 'Manakah yang senilai?',
      options: [
        { t: 'banyak barang dan total harga', ok: true },
        { t: 'banyak pekerja dan lama pekerjaan', why: 'Makin banyak pekerja, makin cepat selesai. Itu berbalik nilai.' },
        { t: 'kecepatan dan waktu tempuh', why: 'Makin cepat, waktunya makin singkat. Itu berbalik nilai.' },
      ],
      steps: ['Barang naik → harga naik.'],
    },
    { type: 'num', q: 'Dalam 3 menit mesin mencetak 120 lembar. Dalam 10 menit … lembar', ans: ['400'], steps: ['1 menit = 40 lembar.', '10 × 40 = 400.'] },
  ],
};

// ---------- 5.2 Berbalik nilai ----------
const PEKERJA = [['pekerja', '1', '2', '3', '6'], ['hari', '12', '6', '4', '2']];

const l2 = {
  id: 'k6b5-2',
  title: 'Perbandingan Berbalik Nilai',
  hook: 'Dua besaran berbalik nilai jika yang satu menjadi 2 kali, yang lain menjadi setengahnya. Hasil kalinya selalu tetap.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah pagar dicat 2 orang selama 6 hari. Kalau dicat 4 orang yang sama rajin, berapa hari?',
          add: [T('q', '2 orang → 6 hari\n4 orang → ?', 200, 110, { size: 28, c: 'pos' })],
          ask: {
            options: [
              { t: '3 hari', ok: true, why: 'Orangnya 2 kali lipat, waktunya menjadi setengahnya.' },
              { t: '12 hari', why: 'Lebih banyak orang, pekerjaan makin cepat selesai.' },
              { t: '8 hari', why: 'Lebih banyak orang, waktunya justru berkurang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tabel berbalik nilai',
      steps: [
        {
          say: 'Satu pekerja membangun pondok dalam 12 hari. Lihat tabel untuk lebih banyak pekerja.',
          clear: true,
          add: [tb('t', PEKERJA)],
        },
        {
          say: 'Pekerja menjadi 2 kali, hari menjadi setengahnya. Pekerja 3 kali, hari menjadi sepertiganya.',
          set: { t: { hl: [[0, 1], [1, 1], [0, 2], [1, 2]] } },
          add: [T('a', '× 2 → : 2', 200, 175, { size: 20, c: 'ok' })],
        },
        {
          say: 'Pekerja kali hari selalu 12. Hasil kali yang tetap adalah ciri berbalik nilai.',
          add: [T('b', 'pekerja × hari = {g:12} (tetap)', 200, 225, { size: 20 })],
        },
      ],
    },
    {
      title: 'Cara hasil kali',
      steps: [
        {
          say: 'Persediaan makanan cukup untuk 20 ayam selama 15 hari. Kalau ayamnya 30, cukup berapa hari?',
          clear: true,
          add: [T('a', '20 ayam → 15 hari', 200, 60, { size: 24 })],
        },
        {
          say: 'Hitung jatah seluruhnya: 20 kali 15 sama dengan 300 jatah ayam per hari.',
          add: [T('b', '20 × 15 = 300', 200, 120, { size: 22 })],
        },
        {
          say: '30 ayam: 300 dibagi 30, yaitu 10 hari.',
          add: [T('c', '300 : 30 = {g:10 hari}', 200, 180, { size: 24 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dengan kecepatan 60 km per jam, perjalanan butuh 4 jam. Dengan 80 km per jam, berapa jam?',
          clear: true,
          add: [T('q', '60 km/jam → 4 jam\n80 km/jam → ?', 200, 110, { size: 26, c: 'pos' })],
          ask: {
            options: [
              { t: '3 jam', ok: true, why: 'Jaraknya 60 × 4 = 240 km. 240 : 80 = 3.' },
              { t: '5 1/3 jam', why: 'Lebih cepat, waktunya lebih singkat, bukan lebih lama.' },
              { t: '4 jam', why: 'Kecepatan berubah, waktunya pun berubah.' },
            ],
          },
        },
        {
          say: '60 kali 4 sama dengan 240. 240 dibagi 80 sama dengan 3 jam.',
          add: [T('a', '240 : 80 = {g:3 jam}', 200, 200, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    { type: 'num', q: '4 orang menyelesaikan pekerjaan dalam 9 hari. 6 orang selesai dalam … hari', ans: ['6'], wrong: { '13.5': 'Lebih banyak orang, lebih cepat.' }, steps: ['4 × 9 = 36.', '36 : 6 = 6.'] },
    { type: 'num', q: 'Permen dibagi ke 8 anak, masing-masing 6. Jika dibagi ke 12 anak, masing-masing …', ans: ['4'], wrong: { '9': 'Anak lebih banyak, bagian tiap anak lebih sedikit.' }, steps: ['8 × 6 = 48.', '48 : 12 = 4.'] },
    { type: 'num', q: 'Kolam dikuras 3 pompa selama 8 jam. Dengan 4 pompa … jam', ans: ['6'], steps: ['3 × 8 = 24.', '24 : 4 = 6.'] },
    {
      q: 'Manakah yang berbalik nilai?',
      options: [
        { t: 'banyak pekerja dan lama pekerjaan', ok: true },
        { t: 'banyak buku dan harga', why: 'Itu senilai.' },
        { t: 'liter bensin dan jarak tempuh', why: 'Itu senilai.' },
      ],
      steps: ['Pekerja naik → waktu turun.'],
    },
    { type: 'num', q: 'Pakan cukup untuk 10 kambing selama 12 hari. Untuk 15 kambing cukup … hari', ans: ['8'], steps: ['10 × 12 = 120.', '120 : 15 = 8.'] },
  ],
};

export default {
  id: 'k6b5',
  no: 5,
  title: 'Perbandingan Senilai dan Berbalik Nilai',
  desc: 'Mengenali perbandingan senilai lewat hasil bagi tetap dan berbalik nilai lewat hasil kali tetap, lalu menyelesaikan soal cerita dengan cara satuan dan hasil kali.',
  lessons: [l1, l2],
  extra: [
    { type: 'num', q: '4 buku Rp20.000. 9 buku … (rupiah)', ans: ['45000', '45.000'], steps: ['1 buku = 5.000.', '9 × 5.000 = 45.000.'] },
    { type: 'num', q: '5 orang 12 hari. 10 orang … hari', ans: ['6'], steps: ['5 × 12 = 60.', '60 : 10 = 6.'] },
    { type: 'num', q: 'Kecepatan 40 km/jam butuh 3 jam. Kecepatan 60 km/jam butuh … jam', ans: ['2'], steps: ['40 × 3 = 120 km.', '120 : 60 = 2.'] },
  ],
};
