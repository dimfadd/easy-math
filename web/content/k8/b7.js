// Kelas 8 · Bab 7: Statistika
import { T, box, ln, dot, range, table, numberLine } from '../helpers.js';

// Kartu angka
const card = (id, x, y, v, o = {}) => box(id, x, y, 38, 46, { fill: 'paper', r: 7, label: String(v), lsize: 19, ...o });
// Balok kecil untuk diagram titik (satu siswa = satu kotak)
const chip = (id, x, y, fill = 'pos-soft') => box(id, x, y, 30, 18, { fill, r: 3, sw: 1.2 });

// ---------- 7.1 Pemusatan data dari tabel ----------
const VALS = [6, 7, 8];
const FREQ = [3, 5, 2];
const VX = [130, 200, 270];
const stackEls = (fill = 'pos-soft') => VALS.flatMap((v, i) => range(0, FREQ[i]).map((k) => chip(`c${v}_${k}`, VX[i], 210 - k * 21, fill)));

const l1 = {
  id: 'k8b7-1',
  title: 'Rata-rata dari Tabel Frekuensi',
  hook: 'Kalau satu nilai dimiliki banyak siswa, nilai itu harus dihitung sebanyak siswanya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Hasil ulangan 10 siswa: 3 siswa mendapat 6, 5 siswa mendapat 7, dan 2 siswa mendapat 8. Berapa rata-ratanya?',
          add: [table('tb', 200, 110, [['Nilai', '6', '7', '8'], ['Banyak siswa', '3', '5', '2']], { cw: [120, 60, 60, 60], rh: 40, size: 18, head: true })],
          ask: {
            options: [
              { t: '6,9', ok: true, why: 'Jumlah semua nilai 69, dibagi 10 siswa.' },
              { t: '7', why: '(6 + 7 + 8) ÷ 3 = 7 mengabaikan banyak siswa tiap nilai.' },
              { t: '3,33', why: '10 ÷ 3 = 3,33 adalah banyak siswa dibagi banyak jenis nilai, bukan rata-rata nilai.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Setiap siswa dihitung',
      steps: [
        {
          say: 'Gambarkan setiap siswa sebagai satu kotak di atas nilainya. Nilai 7 punya tumpukan paling tinggi.',
          clear: true,
          add: [ln('ax', 90, 222, 310, 222, { sw: 2, draw: false }), ...VALS.map((v, i) => T(`v${v}`, String(v), VX[i], 240, { size: 18 })), ...stackEls()],
        },
        {
          say: 'Jumlahkan nilai semua siswa. Nilai 6 ada 3 kali: 18. Nilai 7 ada 5 kali: 35. Nilai 8 ada 2 kali: 16.',
          add: [T('a', '6 × 3 = 18', 200, 40, { size: 18 }), T('b', '7 × 5 = 35', 200, 66, { size: 18 }), T('c', '8 × 2 = 16', 200, 92, { size: 18 })],
        },
        {
          say: 'Total 69. Dibagi banyak siswa, yaitu 10. Rata-ratanya 6 koma 9.',
          add: [T('r', '69 ÷ 10 = {a:6,9}', 330, 66, { size: 20 })],
        },
      ],
    },
    {
      title: 'Kolom f kali x',
      steps: [
        {
          say: 'Dengan tabel, tambahkan kolom f kali x, yaitu frekuensi kali nilai.',
          clear: true,
          add: [table('tb', 200, 110, [['Nilai (x)', 'Frek. (f)', 'f × x'], ['6', '3', '18'], ['7', '5', '35'], ['8', '2', '16'], ['Jumlah', '10', '69']], { cw: [100, 100, 100], rh: 34, size: 17, head: true, hl: [[4, 1], [4, 2]] })],
        },
        {
          say: 'Rata-rata sama dengan jumlah f kali x, dibagi jumlah f.',
          add: [box('rb', 200, 240, 340, 44, { fill: 'acc-soft', r: 10, label: 'rata-rata = Σ(f × x) ÷ Σf = 69 ÷ 10 = 6,9', lsize: 16 })],
        },
      ],
    },
    {
      title: 'Median dan modus dari tabel',
      steps: [
        {
          say: 'Median: urutkan 10 nilai itu. Nilai ke-5 dan ke-6 ada di tengah. Keduanya 7, jadi mediannya 7.',
          clear: true,
          add: [...[6, 6, 6, 7, 7, 7, 7, 7, 8, 8].map((v, k) => card(`k${k}`, 38 + k * 36.5, 100, v, k === 4 || k === 5 ? { fill: 'acc', lc: 'onacc' } : {})), T('m', 'median = (7 + 7) ÷ 2 = {a:7}', 200, 170, { size: 22 })],
        },
        {
          say: 'Modus: nilai dengan frekuensi terbesar. Nilai 7 dimiliki 5 siswa, paling banyak. Modusnya 7.',
          add: [T('mo', 'modus = 7 (frekuensi 5)', 200, 220, { size: 20 })],
        },
      ],
    },
    {
      title: 'Rata-rata gabungan',
      steps: [
        {
          say: 'Kelas A, 20 siswa, rata-ratanya 70. Kelas B, 30 siswa, rata-ratanya 80. Rata-rata gabungannya bukan 75!',
          clear: true,
          add: [box('A', 110, 110, 140, 80, { fill: 'pos-soft', r: 10, label: 'Kelas A\n20 siswa, rata 70', lsize: 14 }), box('B', 290, 110, 140, 80, { fill: 'acc-soft', r: 10, label: 'Kelas B\n30 siswa, rata 80', lsize: 14 })],
        },
        {
          say: 'Hitung total nilainya dulu. Kelas A: 20 kali 70 sama dengan 1400. Kelas B: 30 kali 80 sama dengan 2400.',
          add: [T('a', '20 × 70 = 1.400', 110, 175, { size: 17 }), T('b', '30 × 80 = 2.400', 290, 175, { size: 17 })],
        },
        {
          say: 'Total 3800, dibagi 50 siswa: 76. Lebih dekat ke 80, karena kelas B siswanya lebih banyak.',
          add: [T('r', '(1.400 + 2.400) ÷ 50 = {a:76}', 200, 230, { size: 22 }), T('n', 'kelas yang lebih banyak siswanya lebih berpengaruh', 200, 265, { size: 14, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 4 anak berumur 12 tahun dan 6 anak berumur 13 tahun. Berapa rata-rata umurnya?',
          clear: true,
          add: [table('tb', 200, 110, [['Umur', '12', '13'], ['Banyak anak', '4', '6']], { cw: [120, 70, 70], rh: 40, size: 18, head: true })],
          ask: {
            options: [
              { t: '12,6', ok: true, why: '(48 + 78) ÷ 10 = 126 ÷ 10 = 12,6.' },
              { t: '12,5', why: 'Itu rata-rata 12 dan 13 tanpa memperhitungkan banyak anak.' },
              { t: '12,4', why: 'Yang berumur 13 lebih banyak, jadi rata-ratanya lebih dekat ke 13.' },
              { t: '13', why: '13 adalah modusnya.' },
            ],
          },
        },
        {
          say: '12 kali 4 sama dengan 48. 13 kali 6 sama dengan 78. Jumlah 126, dibagi 10 anak: 12 koma 6.',
          clear: true,
          add: [T('a', '12 × 4 + 13 × 6 = 48 + 78 = 126', 200, 90, { size: 22 }), T('b', '126 ÷ 10 = {a:12,6}', 200, 150, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Data: nilai 5 (2 siswa), 6 (3 siswa), 9 (5 siswa). Rata-ratanya adalah …',
      options: [
        { t: '7,3', ok: true },
        { t: '6,67', why: '(5 + 6 + 9) ÷ 3 mengabaikan frekuensi.' },
        { t: '9', why: '9 adalah modusnya.' },
        { t: '7', why: 'Σ(f × x) = 10 + 18 + 45 = 73, dibagi 10.' },
      ],
      steps: ['Σ(f × x) = 5 × 2 + 6 × 3 + 9 × 5 = 73.', 'Σf = 10. Rata-rata = 7,3.'],
    },
    {
      q: 'Tabel ukuran sepatu: 37 (4 anak), 38 (9 anak), 39 (6 anak), 40 (1 anak). Modusnya adalah …',
      options: [
        { t: '38', ok: true },
        { t: '9', why: '9 adalah frekuensinya. Modus adalah ukurannya.' },
        { t: '40', why: '40 hanya dipakai 1 anak.' },
        { t: '38,5', why: 'Modus adalah data yang paling sering muncul, bukan rata-rata.' },
      ],
      steps: ['Frekuensi terbesar 9, yaitu ukuran 38.'],
    },
    {
      type: 'num',
      q: 'Data: nilai 6 (4 siswa), 7 (3 siswa), 8 (3 siswa). Mediannya adalah …',
      ans: ['7'],
      wrong: { '6': 'Ada 10 data. Median = rata-rata data ke-5 dan ke-6. Data ke-5 dan ke-6 sama-sama 7.', '6.5': 'Data ke-5: 7 (setelah empat angka 6). Data ke-6: juga 7.' },
      steps: ['Urutan: 6, 6, 6, 6, 7, 7, 7, 8, 8, 8.', 'Data ke-5 dan ke-6: 7 dan 7. Median = 7.'],
    },
    {
      type: 'num',
      q: 'Rata-rata nilai 15 siswa putra 72 dan rata-rata 25 siswa putri 80. Rata-rata nilai seluruh siswa adalah …',
      ans: ['77'],
      wrong: { '76': '(72 + 80) ÷ 2 = 76 mengabaikan banyak siswa. Hitung total nilai dulu.', '3080': '3.080 adalah total nilai. Bagi 40 siswa.' },
      steps: ['Total putra: 15 × 72 = 1.080. Total putri: 25 × 80 = 2.000.', '(1.080 + 2.000) ÷ 40 = 3.080 ÷ 40 = 77.'],
    },
    {
      type: 'num',
      q: 'Rata-rata berat 5 anak 40 kg. Setelah satu anak keluar, rata-rata 4 anak yang tersisa menjadi 38 kg. Berat anak yang keluar adalah … kg',
      ans: ['48'],
      wrong: { '2': '2 kg adalah selisih rata-ratanya. Hitung total berat sebelum dan sesudah.', '42': 'Total 5 anak: 200. Total 4 anak: 152. Selisih 48.' },
      steps: ['Total 5 anak: 5 × 40 = 200.', 'Total 4 anak: 4 × 38 = 152.', 'Yang keluar: 200 − 152 = 48 kg.'],
    },
  ],
};

// ---------- 7.2 Ukuran penyebaran ----------
const NL = numberLine('nl', 200, 200, 360, 30, 110, { step: 10, every: 10, lsize: 12, mono: true });
const DATA7 = [3, 5, 6, 7, 9, 10, 12];
const NB = numberLine('nb', 200, 210, 340, 0, 14, { lsize: 12, mono: true });

const l2 = {
  id: 'k8b7-2',
  title: 'Jangkauan, Kuartil, dan Diagram Kotak Garis',
  hook: 'Dua tim bisa punya rata-rata sama tapi sebarannya beda jauh. Jangkauan dan kuartil mengukur sebaran itu.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Nilai Tim A: 60, 70, 80. Nilai Tim B: 40, 70, 100. Rata-rata keduanya sama-sama 70. Tim mana yang nilainya lebih merata?',
          add: [NL.el, ...[60, 70, 80].map((v, i) => dot(`a${i}`, NL.at(v), 165, 'pos', { r: 8 })), ...[40, 70, 100].map((v, i) => dot(`b${i}`, NL.at(v), 130, 'neg', { r: 8 })), T('la', 'Tim A', 40, 165, { size: 15, c: 'pos' }), T('lb', 'Tim B', 40, 130, { size: 15, c: 'neg' })],
          ask: {
            options: [
              { t: 'Tim A', ok: true, why: 'Nilai Tim A berkumpul dekat 70. Nilai Tim B menyebar jauh.' },
              { t: 'Tim B', why: 'Nilai Tim B ada yang 40 dan ada yang 100. Sebarannya lebar.' },
              { t: 'Sama saja', why: 'Rata-ratanya memang sama, tapi sebarannya berbeda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jangkauan',
      steps: [
        {
          say: 'Jangkauan adalah data terbesar dikurangi data terkecil. Tim A: 80 dikurangi 60 sama dengan 20.',
          add: [ln('ja', NL.at(60), 182, NL.at(80), 182, { sw: 3, c: 'pos', arrow: 'both' }), T('ra', 'jangkauan A = 20', 300, 60, { size: 17, c: 'pos' })],
        },
        {
          say: 'Tim B: 100 dikurangi 40 sama dengan 60. Jangkauan lebih besar berarti data lebih menyebar.',
          add: [ln('jb', NL.at(40), 112, NL.at(100), 112, { sw: 3, c: 'neg', arrow: 'both' }), T('rb', 'jangkauan B = 60', 300, 85, { size: 17, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Kuartil',
      steps: [
        {
          say: 'Kuartil membagi data yang sudah urut menjadi empat bagian sama banyak. Ini 7 data yang sudah urut.',
          clear: true,
          add: DATA7.map((v, k) => card(`d${k}`, 80 + k * 40, 90, v)),
        },
        {
          say: 'Kuartil tengah, Q2, adalah median: data ke-4, yaitu 7.',
          set: { d3: { fill: 'acc', lc: 'onacc' } },
          add: [T('q2', 'Q2 = 7', 200, 140, { size: 17, c: 'acc' })],
        },
        {
          say: 'Kuartil bawah, Q1, adalah median dari separuh bawah: 3, 5, 6. Q1 sama dengan 5.',
          set: { d1: { fill: 'pos', lc: 'onfill' } },
          add: [T('q1', 'Q1 = 5', 120, 140, { size: 17, c: 'pos' }), box('lo', 120, 90, 118, 58, { fill: 'none', stroke: 'pos', dash: '5 4', r: 9 })],
        },
        {
          say: 'Kuartil atas, Q3, adalah median separuh atas: 9, 10, 12. Q3 sama dengan 10.',
          set: { d5: { fill: 'neg', lc: 'onfill' } },
          add: [T('q3', 'Q3 = 10', 280, 140, { size: 17, c: 'neg' }), box('hi', 280, 90, 118, 58, { fill: 'none', stroke: 'neg', dash: '5 4', r: 9 })],
        },
        {
          say: 'Jarak Q3 ke Q1 disebut jangkauan antarkuartil: 10 dikurangi 5 sama dengan 5. Ini sebaran setengah data yang di tengah.',
          add: [T('iq', 'jangkauan antarkuartil = Q3 − Q1 = 10 − 5 = {a:5}', 200, 200, { size: 17 })],
        },
      ],
    },
    {
      title: 'Diagram kotak garis',
      steps: [
        {
          say: 'Lima angka penting: data terkecil 3, Q1 5, median 7, Q3 10, dan data terbesar 12. Kita gambar pada garis bilangan.',
          clear: true,
          add: [NB.el, ...[3, 5, 7, 10, 12].map((v, i) => T(`t${i}`, ['min', 'Q1', 'Q2', 'Q3', 'maks'][i], NB.at(v), 70, { size: 13, c: 'mut' }))],
        },
        {
          say: 'Gambar kotak dari Q1 sampai Q3, dengan garis di median.',
          add: [box('bx', (NB.at(5) + NB.at(10)) / 2, 130, NB.at(10) - NB.at(5), 50, { fill: 'acc-soft', r: 0 }), ln('md', NB.at(7), 105, NB.at(7), 155, { sw: 3, c: 'neg' })],
        },
        {
          say: 'Tarik garis dari kotak ke data terkecil dan terbesar. Inilah diagram kotak garis. Kotaknya berisi setengah data yang di tengah.',
          add: [ln('w1', NB.at(3), 130, NB.at(5), 130, { sw: 2.5 }), ln('w2', NB.at(10), 130, NB.at(12), 130, { sw: 2.5 }), ln('e1', NB.at(3), 115, NB.at(3), 145, { sw: 2.5 }), ln('e2', NB.at(12), 115, NB.at(12), 145, { sw: 2.5 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Data: 4, 8, 2, 9, 5, 7, 3. Berapa jangkauannya?',
          clear: true,
          add: [T('q', '4, 8, 2, 9, 5, 7, 3', 200, 110, { size: 30 }), T('q2', 'jangkauan = ?', 200, 170, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '7', ok: true, why: 'Terbesar 9, terkecil 2. 9 − 2 = 7.' },
              { t: '1', why: '4 − 3? Jangkauan memakai data terbesar dan terkecil, setelah dicari.' },
              { t: '5', why: '5 adalah mediannya.' },
              { t: '9', why: '9 adalah data terbesar. Kurangi dengan data terkecil.' },
            ],
          },
        },
        {
          say: 'Urutkan: 2, 3, 4, 5, 7, 8, 9. Terbesar 9, terkecil 2. Jangkauannya 7.',
          clear: true,
          add: [...[2, 3, 4, 5, 7, 8, 9].map((v, k) => card(`g${k}`, 80 + k * 40, 100, v, k === 0 || k === 6 ? { fill: 'acc', lc: 'onacc' } : {})), T('r', '9 − 2 = {a:7}', 200, 175, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jangkauan dari data 15, 8, 23, 12, 19, 10 adalah …',
      ans: ['15'],
      wrong: { '7': '15 − 8 memakai data pertama, bukan terbesar. Terbesar 23.', '23': 'Kurangi dengan data terkecil (8).' },
      steps: ['Terbesar 23, terkecil 8.', 'Jangkauan = 23 − 8 = 15.'],
    },
    {
      q: 'Data urut: 2, 4, 5, 7, 8, 10, 11. Kuartil bawah (Q1) adalah …',
      options: [
        { t: '4', ok: true },
        { t: '7', why: '7 adalah median (Q2).' },
        { t: '10', why: '10 adalah Q3.' },
        { t: '2', why: '2 adalah data terkecil.' },
      ],
      steps: ['Median (Q2) = 7.', 'Separuh bawah: 2, 4, 5. Mediannya 4 = Q1.'],
    },
    {
      type: 'num',
      q: 'Data urut: 1, 3, 4, 6, 7, 9, 12. Jangkauan antarkuartilnya adalah …',
      ans: ['6'],
      wrong: { '11': '11 adalah jangkauan (12 − 1). Antarkuartil = Q3 − Q1.', '3': 'Q1 = 3 dan Q3 = 9. 9 − 3 = 6.' },
      steps: ['Q2 = 6. Q1 = median dari 1, 3, 4 = 3.', 'Q3 = median dari 7, 9, 12 = 9.', 'Q3 − Q1 = 6.'],
    },
    {
      q: 'Pada diagram kotak garis, garis di dalam kotak menunjukkan …',
      options: [
        { t: 'median', ok: true },
        { t: 'rata-rata', why: 'Diagram kotak garis memakai median, bukan rata-rata.' },
        { t: 'modus', why: 'Modus tidak digambar di diagram kotak garis.' },
        { t: 'jangkauan', why: 'Jangkauan adalah panjang dari ujung kiri ke ujung kanan.' },
      ],
      steps: ['Kotak: dari Q1 ke Q3.', 'Garis di dalam kotak: Q2 = median.'],
    },
    {
      q: 'Kelompok P: 50, 60, 70, 80, 90. Kelompok Q: 68, 69, 70, 71, 72. Pernyataan yang benar adalah …',
      options: [
        { t: 'rata-ratanya sama, Q lebih merata', ok: true },
        { t: 'rata-ratanya sama, P lebih merata', why: 'Jangkauan P = 40, jangkauan Q = 4. Q jauh lebih merata.' },
        { t: 'rata-rata P lebih besar', why: 'Keduanya rata-rata 70.' },
        { t: 'jangkauannya sama', why: 'Jangkauan P = 40, Q = 4.' },
      ],
      steps: ['Rata-rata P = 350 ÷ 5 = 70, rata-rata Q = 350 ÷ 5 = 70.', 'Jangkauan P = 40, Q = 4. Q lebih merata.'],
    },
  ],
};

export default {
  id: 'k8b7',
  no: 7,
  title: 'Statistika',
  desc: 'Rata-rata, median, dan modus dari tabel frekuensi, rata-rata gabungan, jangkauan, kuartil, dan diagram kotak garis.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Rata-rata 6 bilangan adalah 8. Jika satu bilangan 13 ditambahkan, rata-ratanya menjadi …',
      ans: ['61/7', '8.71'],
      wrong: { '10.5': 'Total 6 bilangan = 48. Ditambah 13 = 61, dibagi 7.', '9': 'Total baru 61, dibagi 7 ≈ 8,71.' },
      steps: ['Total 6 bilangan: 6 × 8 = 48.', 'Total baru: 48 + 13 = 61. Rata-rata = 61 ÷ 7 ≈ 8,71.'],
    },
    {
      q: 'Data: 3, 7, 7, 8, 10, 12. Pernyataan yang benar adalah …',
      options: [
        { t: 'median 7,5 dan modus 7', ok: true },
        { t: 'median 7 dan modus 7', why: 'Datanya genap (6). Median = (7 + 8) ÷ 2 = 7,5.' },
        { t: 'median 8 dan modus 7', why: 'Dua data di tengah adalah 7 dan 8.' },
        { t: 'median 7,5 dan modus 12', why: 'Modus = paling sering muncul, yaitu 7.' },
      ],
      steps: ['Data ke-3 dan ke-4: 7 dan 8 → median 7,5.', '7 muncul dua kali → modus 7.'],
    },
    {
      type: 'num',
      q: 'Data 5, 9, x, 12, 14 sudah urut dan jangkauannya 9. Jika rata-ratanya 10, nilai x adalah …',
      ans: ['10'],
      wrong: { '9': 'Total = 5 × 10 = 50. 5 + 9 + 12 + 14 = 40, jadi x = 10.' },
      steps: ['Jangkauan: 14 − 5 = 9 ✓.', 'Total = 50. x = 50 − 40 = 10.'],
    },
  ],
};
