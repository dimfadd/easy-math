// Kelas 10 · Bab 5: Sistem Persamaan dan Pertidaksamaan Linear
import { T, dot } from '../helpers.js';
import { plane, lineOn } from '../k8/plot.js';
import { tag } from './kit.js';

// ---------- 5.1 SPLTV ----------
const FR = { a: ['neg', 'a'], j: ['acc', 'j'], m: ['ok', 'm'] };
const fruit = (id, k, x, y, o = {}) => ({ id, t: 'circle', x, y, r: 12, fill: FR[k][0], stroke: 'ink', sw: 1.5, label: FR[k][1], lsize: 13, lc: k === 'j' ? 'ink' : 'onfill', ...o });
const row = (p, list, y) => list.split('').map((k, i) => fruit(`${p}${i}`, k, 50 + i * 28, y));

const l1 = {
  id: 'k10b5-1',
  title: 'Sistem Persamaan Linear Tiga Variabel',
  hook: 'Tiga hal yang belum diketahui bisa ditemukan dari tiga persamaan, dengan menghilangkan satu per satu.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Satu apel, satu jeruk, satu mangga harganya 10 ribu. Dua apel, satu jeruk, satu mangga harganya 12 ribu. Berapa harga satu apel?',
          add: [T('lg', 'harga dalam ribu rupiah', 200, 24, { size: 14, c: 'mut' }), row('r1', 'ajm', 80), T('p1', '= 10', 250, 80, { size: 22 }), row('r2', 'aajm', 140), T('p2', '= 12', 250, 140, { size: 22 })],
          ask: {
            options: [
              { t: '2 ribu', ok: true, why: 'Bedanya hanya satu apel, dan harganya berbeda 12 − 10 = 2 ribu.' },
              { t: '6 ribu', why: '12 ÷ 2 bukan caranya. Bandingkan kedua keranjang: bedanya hanya satu apel.' },
              { t: '4 ribu', why: 'Selisih kedua keranjang adalah satu apel dan 2 ribu.' },
              { t: 'tidak bisa dicari', why: 'Bisa. Selisih kedua keranjang tepat satu apel.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membandingkan keranjang',
      steps: [
        {
          say: 'Keranjang kedua sama dengan keranjang pertama ditambah satu apel. Coret yang sama.',
          set: { r21: { o: 0.25 }, r22: { o: 0.25 }, r23: { o: 0.25 }, r10: { o: 0.25 }, r11: { o: 0.25 }, r12: { o: 0.25 } },
        },
        {
          say: 'Tersisa satu apel, dengan selisih harga 12 dikurangi 10. Jadi satu apel 2 ribu. Inilah cara eliminasi: mengurangkan dua persamaan supaya sebagian hilang.',
          add: [T('r', 'a = 12 − 10 = {g:2}', 200, 200, { size: 24 })],
          pulse: ['r20'],
        },
        {
          say: 'Keranjang ketiga: satu apel, dua jeruk, tiga mangga, harganya 23 ribu.',
          clear: true,
          keep: ['lg'],
          add: [row('r1', 'ajm', 60), T('p1', '= 10', 250, 60, { size: 20 }), row('r3', 'ajjmmm', 105), T('p3', '= 23', 250, 105, { size: 20 }), T('ka', 'a = 2', 350, 60, { size: 18, c: 'ok' })],
        },
        {
          say: 'Apel sudah diketahui 2 ribu. Ganti apel dengan 2, ini disebut substitusi. Sisanya: jeruk tambah mangga sama dengan 8, dan dua jeruk tambah tiga mangga sama dengan 21.',
          add: [T('e1', 'j + m = 8', 200, 160, { size: 22 }), T('e2', '2j + 3m = 21', 200, 195, { size: 22 })],
          set: { r10: { o: 0.25 }, r30: { o: 0.25 } },
        },
        {
          say: 'Sekarang tinggal dua variabel, seperti SPLDV di kelas 8. Hasilnya jeruk 3 ribu dan mangga 5 ribu.',
          add: [T('e3', 'm = 21 − 2 × 8 = 5,  j = 8 − 5 = 3', 200, 240, { size: 18 }), T('e4', 'a = 2, j = 3, m = 5 (ribu)', 200, 275, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Langkah umum',
      steps: [
        {
          say: 'Sistem persamaan linear tiga variabel, disingkat SPLTV, berisi tiga persamaan dengan tiga variabel, misalnya x, y, dan z.',
          clear: true,
          add: [T('q1', '(1)  x + y + z = 6', 200, 35, { size: 20 }), T('q2', '(2)  x − y + z = 2', 200, 63, { size: 20 }), T('q3', '(3)  2x + y − z = 1', 200, 91, { size: 20 })],
        },
        {
          say: 'Langkah 1: eliminasi satu variabel. Persamaan 1 dikurangi persamaan 2: x dan z hilang, tersisa 2y sama dengan 4. Jadi y sama dengan 2.',
          add: [T('s1', '(1) − (2):  2y = 4  →  y = 2', 200, 135, { size: 19, c: 'pos' })],
          hl: ['q1', 'q2'],
        },
        {
          say: 'Langkah 2: substitusi y sama dengan 2 ke persamaan 1 dan 3. Didapat dua persamaan dengan x dan z.',
          add: [T('s2', 'x + z = 4    dan    2x − z = −1', 200, 170, { size: 19 })],
        },
        {
          say: 'Langkah 3: selesaikan seperti SPLDV. Jumlahkan keduanya: 3x sama dengan 3, jadi x sama dengan 1. Lalu z sama dengan 4 dikurangi 1, yaitu 3.',
          add: [T('s3', 'dijumlah: 3x = 3  →  x = 1', 200, 205, { size: 19 }), T('s4', 'z = 4 − 1 = 3', 200, 238, { size: 19 })],
        },
        {
          say: 'Langkah 4: periksa di persamaan 3. 2 tambah 2 dikurangi 3 sama dengan 1. Benar.',
          add: [T('s5', 'cek (3): 2 + 2 − 3 = 1 ✓', 200, 275, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. x tambah y tambah z sama dengan 9, y sama dengan 3, dan z sama dengan dua kali x. Berapa z?',
          clear: true,
          add: [T('q1', 'x + y + z = 9', 200, 70, { size: 26 }), T('q2', 'y = 3', 200, 110, { size: 26 }), T('q3', 'z = 2x', 200, 150, { size: 26 }), T('qq', 'z = ?', 200, 205, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'x + 3 + 2x = 9 → 3x = 6 → x = 2, jadi z = 4.' },
              { t: '2', why: '2 adalah nilai x. z = 2x = 4.' },
              { t: '6', why: '3x = 6 memberi x = 2, lalu z = 2 × 2.' },
              { t: '3', why: '3 adalah nilai y.' },
            ],
          },
        },
        {
          say: 'Substitusi y dan z ke persamaan pertama: x tambah 3 tambah 2x sama dengan 9. Jadi 3x sama dengan 6, x sama dengan 2, dan z sama dengan 4.',
          set: { qq: { text: 'x + 3 + 2x = 9 → x = 2 → z = {g:4}', size: 22 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Diketahui x + y + z = 12, x = 2y, dan z = 3y. Nilai x adalah …',
      ans: ['4'],
      wrong: { '2': '2 adalah nilai y. x = 2y = 4.', '6': '6 adalah nilai z.' },
      steps: ['2y + y + 3y = 12 → 6y = 12 → y = 2.', 'x = 2 × 2 = 4.'],
    },
    {
      type: 'num',
      q: 'Harga 1 pensil, 1 buku, dan 1 penghapus Rp9.000. Harga 2 pensil, 1 buku, dan 1 penghapus Rp11.000. Harga 1 pensil, 2 buku, dan 1 penghapus Rp13.000. Harga 1 penghapus adalah Rp …',
      ans: ['3000'],
      wrong: { '2000': 'Rp2.000 adalah harga pensil.', '4000': 'Rp4.000 adalah harga buku.' },
      steps: ['(2) − (1): pensil = 2.000. (3) − (1): buku − pensil = 4.000 − 2.000 → buku = 4.000.', 'penghapus = 9.000 − 2.000 − 4.000 = Rp3.000.'],
    },
    {
      type: 'num',
      q: 'Diketahui x + 2y = 5, y + 2z = 8, dan z + 2x = 5. Nilai x + y + z adalah …',
      ans: ['6'],
      wrong: { '18': '18 adalah 3(x + y + z). Bagi dengan 3.', '9': 'Jumlahkan ketiganya: 3x + 3y + 3z = 18.' },
      steps: ['Jumlahkan ketiga persamaan: 3x + 3y + 3z = 18.', 'x + y + z = 6.'],
    },
    {
      q: 'Manakah penyelesaian dari x + y − z = 1, 2x − y + z = 5, x + 2y + z = 6?',
      options: [
        { t: '(2, 1, 2)', ok: true },
        { t: '(1, 2, 2)', why: 'Cek persamaan kedua: 2 − 2 + 2 = 2, bukan 5.' },
        { t: '(2, 2, 3)', why: 'Cek persamaan ketiga: 2 + 4 + 3 = 9, bukan 6.' },
        { t: '(1, 1, 1)', why: 'Cek persamaan kedua: 2 − 1 + 1 = 2.' },
      ],
      steps: ['(1) + (2): 3x = 6 → x = 2.', 'Cek (2, 1, 2): 2 + 1 − 2 = 1, 4 − 1 + 2 = 5, 2 + 2 + 2 = 6.'],
    },
    {
      type: 'num',
      q: 'Jumlah tiga bilangan adalah 20. Bilangan pertama 2 lebih besar dari bilangan kedua. Bilangan ketiga sama dengan jumlah bilangan pertama dan kedua. Bilangan ketiga adalah …',
      ans: ['10'],
      wrong: { '6': '6 adalah bilangan pertama.', '4': '4 adalah bilangan kedua.' },
      steps: ['a = b + 2, c = a + b.', 'a + b + c = 2(a + b) = 20 → a + b = 10 → c = 10.'],
    },
  ],
};

// ---------- 5.2 Pertidaksamaan linear dua variabel ----------
const CF = { x: 60, y: 25, w: 240, h: 230, xmin: -1, xmax: 6, ymin: -1, ymax: 6 };
const PF = plane('pl', CF);
const at = PF.at;
const region = (id, pts, fill = 'pos-soft', o = {}) => ({ id, t: 'poly', x: 0, y: 0, pts: pts.map(([a, b]) => at(a, b)), fill, stroke: 'none', sw: 0, z: -2.5, ...o });

const l2 = {
  id: 'k10b5-2',
  title: 'Pertidaksamaan Linear Dua Variabel',
  hook: 'Penyelesaian pertidaksamaan dua variabel bukan satu titik, melainkan satu daerah di bidang koordinat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Garis x tambah y sama dengan 4 membagi bidang menjadi dua. Titik-titik yang memenuhi x tambah y kurang dari atau sama dengan 4 ada di sisi mana?',
          add: [...PF.els, lineOn('ln', PF, -1, 4, CF), tag('le', 'x + y = 4', 250, 50, 'pos', 15)],
          ask: {
            options: [
              { t: 'sisi bawah, yang memuat (0, 0)', ok: true, why: 'Coba (0, 0): 0 + 0 = 0 ≤ 4. Benar, jadi sisi itu daerahnya.' },
              { t: 'sisi atas', why: 'Coba titik di atas, misalnya (4, 3): 7 ≤ 4 salah.' },
              { t: 'hanya di garis', why: 'Garis hanya untuk "= 4". "Kurang dari" juga mencakup satu sisi.' },
              { t: 'seluruh bidang', why: 'Titik (4, 3) tidak memenuhi, jadi bukan seluruh bidang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Uji satu titik',
      steps: [
        {
          say: 'Ambil titik uji yang mudah, yaitu 0 koma 0. 0 tambah 0 sama dengan 0, dan 0 kurang dari 4. Benar.',
          add: [dot('o', ...at(0, 0), 'ok', { r: 8 }), tag('to', '(0, 0): 0 ≤ 4 ✓', ...at(1.6, 0.9), 'ok', 14)],
        },
        {
          say: 'Coba titik di seberang, 4 koma 3. 4 tambah 3 sama dengan 7, dan 7 tidak kurang dari 4. Salah.',
          add: [dot('p', ...at(4, 3), 'neg', { r: 8 }), tag('tp', '(4, 3): 7 ≤ 4 ✗', 250, 90, 'neg', 14)],
        },
        {
          say: 'Jadi semua titik di sisi yang memuat 0 koma 0 memenuhi. Arsir daerah itu. Inilah daerah penyelesaiannya.',
          add: [region('rg', [[-1, -1], [5, -1], [-1, 5]])],
        },
        {
          say: 'Garisnya digambar utuh karena ada tanda sama dengan. Kalau tandanya kurang dari saja, garisnya putus-putus karena titik di garis tidak termasuk.',
          add: [tag('k', '≤ atau ≥: garis utuh · < atau >: putus-putus', 200, 278, 'ink', 13)],
        },
      ],
    },
    {
      title: 'Sistem pertidaksamaan',
      steps: [
        {
          say: 'Beberapa pertidaksamaan sekaligus disebut sistem. Daerah penyelesaiannya adalah bagian yang memenuhi semuanya. Mulai dengan x lebih dari atau sama dengan 0 dan y lebih dari atau sama dengan 0: kuadran kanan atas.',
          clear: true,
          keep: ['pl*'],
          add: [region('q', [[0, 0], [6, 0], [6, 6], [0, 6]], 'acc-soft'), tag('l0', 'x ≥ 0, y ≥ 0', 250, 50, 'acc', 14)],
        },
        {
          say: 'Tambahkan x tambah y kurang dari atau sama dengan 4. Yang tersisa hanya segitiga.',
          add: [lineOn('l1', PF, -1, 4, CF)],
          set: { q: region('q', [[0, 0], [4, 0], [0, 4]], 'acc-soft'), l0: tag('l0', 'x + y ≤ 4', 250, 50, 'pos', 14) },
        },
        {
          say: 'Tambahkan lagi 2x tambah y kurang dari atau sama dengan 6. Pojok kanan terpotong. Daerah penyelesaiannya segi empat dengan titik pojok 0 koma 0, 3 koma 0, 2 koma 2, dan 0 koma 4.',
          add: [lineOn('l2', PF, -2, 6, CF, { c: 'neg' }), tag('l2t', '2x + y ≤ 6', 250, 80, 'neg', 14), ...[[0, 0], [3, 0], [2, 2], [0, 4]].map(([a, b], i) => dot(`c${i}`, ...at(a, b), 'ink', { r: 5 }))],
          set: { q: region('q', [[0, 0], [3, 0], [2, 2], [0, 4]], 'ok', { o: 0.45 }) },
        },
        {
          say: 'Titik 2 koma 2 adalah perpotongan kedua garis. Didapat dengan menyelesaikan x tambah y sama dengan 4 dan 2x tambah y sama dengan 6.',
          add: [tag('c2t', '(2, 2)', ...at(2.9, 2.4), 'ink', 13)],
          pulse: ['c2'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Apakah titik 1 koma 3 termasuk daerah penyelesaian sistem tadi?',
          add: [dot('t', ...at(1, 3), 'acc', { r: 8 })],
          ask: {
            options: [
              { t: 'ya', ok: true, why: 'x + y = 4 ≤ 4 dan 2x + y = 5 ≤ 6. Keduanya terpenuhi, dan x, y ≥ 0.' },
              { t: 'tidak, karena 1 + 3 = 4 tidak kurang dari 4', why: 'Tandanya ≤, jadi 4 ≤ 4 boleh. Titik di garis utuh termasuk.' },
              { t: 'tidak, karena 2 × 1 + 3 > 6', why: '2 + 3 = 5, dan 5 ≤ 6.' },
              { t: 'tidak bisa ditentukan', why: 'Cukup uji ke semua pertidaksamaan.' },
            ],
          },
        },
        {
          say: '1 tambah 3 sama dengan 4, memenuhi kurang dari atau sama dengan 4. 2 tambah 3 sama dengan 5, memenuhi kurang dari atau sama dengan 6. Jadi titik itu termasuk, tepat di garis batas.',
          add: [tag('tt', '(1, 3): 4 ≤ 4 ✓, 5 ≤ 6 ✓', 250, 110, 'ok', 13)],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Titik manakah yang memenuhi 2x + y ≤ 6?',
      options: [
        { t: '(1, 3)', ok: true },
        { t: '(3, 1)', why: '2 × 3 + 1 = 7 > 6.' },
        { t: '(2, 3)', why: '4 + 3 = 7 > 6.' },
        { t: '(4, 0)', why: '8 > 6.' },
      ],
      steps: ['Masukkan setiap titik.', '(1, 3): 2 + 3 = 5 ≤ 6.'],
    },
    {
      q: 'Daerah penyelesaian y > 2 dibatasi garis …',
      options: [
        { t: 'y = 2 putus-putus, daerahnya di atas garis', ok: true },
        { t: 'y = 2 utuh, daerahnya di atas garis', why: 'Tanda > tanpa sama dengan, jadi garisnya putus-putus.' },
        { t: 'y = 2 putus-putus, daerahnya di bawah garis', why: 'y lebih dari 2 berarti di atas.' },
        { t: 'x = 2, daerahnya di kanan garis', why: 'Pertidaksamaannya tentang y.' },
      ],
      steps: ['Tanda > → garis putus-putus.', 'y > 2 → di atas garis y = 2.'],
    },
    {
      q: 'Pada pertidaksamaan x + 2y ≥ 4, apakah daerah penyelesaiannya memuat titik (0, 0)?',
      options: [
        { t: 'tidak, karena 0 ≥ 4 salah', ok: true },
        { t: 'ya, karena 0 ≥ 4 benar', why: '0 tidak lebih dari atau sama dengan 4.' },
        { t: 'ya, titik (0, 0) selalu termasuk', why: 'Tidak selalu. Harus diuji.' },
        { t: 'hanya kalau garisnya putus-putus', why: 'Jenis garis tidak menentukan sisi daerah.' },
      ],
      steps: ['Uji (0, 0): 0 + 0 = 0.', '0 ≥ 4 salah, jadi daerahnya di sisi yang tidak memuat (0, 0).'],
    },
    {
      q: 'Daerah di bawah garis yang melalui (0, 3) dan (3, 0), memuat (0, 0), dan garisnya utuh, adalah penyelesaian dari …',
      options: [
        { t: 'x + y ≤ 3', ok: true },
        { t: 'x + y ≥ 3', why: 'Daerah ≥ 3 tidak memuat (0, 0).' },
        { t: 'x + y < 3', why: 'Garis utuh berarti ada tanda sama dengan.' },
        { t: 'x − y ≤ 3', why: 'Garis x − y = 3 tidak melalui (0, 3).' },
      ],
      steps: ['Garis melalui (0, 3) dan (3, 0): x + y = 3.', '(0, 0) termasuk dan garis utuh → x + y ≤ 3.'],
    },
    {
      type: 'num',
      q: 'Banyak titik dengan koordinat bilangan bulat (x, y) yang memenuhi x ≥ 0, y ≥ 0, dan x + y ≤ 2 adalah …',
      ans: ['6'],
      wrong: { '3': 'Jangan lupa titik di dalam dan di sumbu: (0,0), (1,0), (2,0), (0,1), (1,1), (0,2).', '4': 'Ada 6 titik: 3 di baris y = 0, 2 di y = 1, 1 di y = 2.' },
      steps: ['y = 0: x = 0, 1, 2 (3 titik). y = 1: x = 0, 1 (2 titik). y = 2: x = 0 (1 titik).', 'Total 6 titik.'],
    },
  ],
};

// ---------- 5.3 Nilai optimum ----------
const CORNERS = [[0, 0, 0], [3, 0, 90], [2, 2, 100], [0, 4, 80]];
const l3 = {
  id: 'k10b5-3',
  title: 'Nilai Optimum di Daerah Penyelesaian',
  hook: 'Untung terbesar selalu ada di salah satu titik pojok daerah penyelesaian.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Bu Rina membuat roti dan kue. Oven muat paling banyak 4 loyang. Tepung tersedia 6 kilogram: roti butuh 2 kilogram per loyang, kue 1 kilogram. Untung roti 30 ribu, kue 20 ribu per loyang. Berapa untung terbesar?',
          add: [T('a', 'roti: 2 kg tepung, untung 30 ribu', 200, 70, { size: 18 }), T('b', 'kue: 1 kg tepung, untung 20 ribu', 200, 105, { size: 18 }), T('c', 'oven ≤ 4 loyang, tepung ≤ 6 kg', 200, 150, { size: 18, c: 'acc' }), T('d', 'untung terbesar = ?', 200, 205, { size: 24, c: 'pos' })],
          ask: {
            options: [
              { t: '100 ribu', ok: true, why: '2 loyang roti dan 2 loyang kue: 60 + 40 = 100 ribu.' },
              { t: '90 ribu', why: '3 loyang roti memakai semua tepung. Campuran 2 roti + 2 kue lebih untung.' },
              { t: '120 ribu', why: '4 loyang roti butuh 8 kg tepung, padahal hanya ada 6 kg.' },
              { t: '80 ribu', why: '4 loyang kue memang boleh, tetapi ada pilihan yang lebih untung.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membuat model',
      steps: [
        {
          say: 'Misalkan x loyang roti dan y loyang kue. Oven: x tambah y kurang dari atau sama dengan 4. Tepung: 2x tambah y kurang dari atau sama dengan 6. Banyaknya tidak boleh negatif.',
          clear: true,
          add: [T('m1', 'x + y ≤ 4', 200, 60, { size: 22 }), T('m2', '2x + y ≤ 6', 200, 95, { size: 22 }), T('m3', 'x ≥ 0, y ≥ 0', 200, 130, { size: 22 })],
        },
        {
          say: 'Untung yang ingin dibuat sebesar-besarnya disebut fungsi tujuan: f sama dengan 30x tambah 20y, dalam ribu rupiah.',
          add: [T('f', 'f = 30x + 20y', 200, 190, { size: 26, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Cek titik pojok',
      steps: [
        {
          say: 'Daerah penyelesaiannya sama dengan materi sebelumnya: segi empat dengan pojok 0 koma 0, 3 koma 0, 2 koma 2, dan 0 koma 4.',
          clear: true,
          add: [...PF.els, lineOn('l1', PF, -1, 4, CF), lineOn('l2', PF, -2, 6, CF, { c: 'neg' }), region('q', [[0, 0], [3, 0], [2, 2], [0, 4]], 'ok', { o: 0.45 }), ...CORNERS.map(([a, b], i) => dot(`c${i}`, ...at(a, b), 'ink', { r: 6 }))],
        },
        {
          say: 'Hitung untung di setiap pojok. 0 koma 0: 0. 3 koma 0: 90 ribu. 0 koma 4: 80 ribu.',
          add: [tag('v0', 'f = 0', ...at(0.8, 0.45), 'ink', 12), tag('v1', 'f = 90', ...at(3.6, 0.5), 'ink', 13), tag('v3', 'f = 80', ...at(1, 4.3), 'ink', 13)],
        },
        {
          say: '2 koma 2: 30 kali 2 tambah 20 kali 2, yaitu 100 ribu. Ini yang terbesar.',
          add: [tag('v2', 'f = 100', ...at(3.1, 2.6), 'ok', 14)],
          pulse: ['c2'],
        },
        {
          say: 'Jadi untung terbesar 100 ribu, dengan membuat 2 loyang roti dan 2 loyang kue. Nilai terbesar atau terkecil selalu muncul di titik pojok, jadi cukup cek pojok-pojoknya.',
          add: [tag('k', 'maksimum 100 ribu di (2, 2)', 230, 30, 'ok', 15)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kalau untung roti naik menjadi 40 ribu dan kue tetap 20 ribu, pojok mana yang paling untung?',
          clear: true,
          add: [T('q', 'f = 40x + 20y', 200, 60, { size: 28 }), T('q2', 'pojok: (0, 0), (3, 0), (2, 2), (0, 4)', 200, 115, { size: 18 })],
          ask: {
            options: [
              { t: 'keduanya, (3, 0) dan (2, 2) sama-sama 120 ribu', ok: true, why: '40 × 3 = 120 dan 40 × 2 + 20 × 2 = 120. Keduanya sama besar.' },
              { t: '(0, 4)', why: '(0, 4) memberi 80 ribu saja.' },
              { t: 'hanya (2, 2)', why: 'Hitung (3, 0) juga: 40 × 3 = 120, sama dengan (2, 2).' },
              { t: 'hanya (3, 0)', why: 'Hitung (2, 2): 80 + 40 = 120, sama besar.' },
            ],
          },
        },
        {
          say: 'Hitung di setiap pojok: 0, 120, 120, dan 80. Ada dua pojok yang sama-sama memberi 120 ribu. Ini bisa terjadi, dan keduanya sama baiknya.',
          add: [T('a', '(0, 0): 0    (3, 0): {g:120}', 200, 175, { size: 20 }), T('b', '(2, 2): {g:120}    (0, 4): 80', 200, 210, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Titik pojok daerah penyelesaian adalah (0, 0), (4, 0), (2, 2), dan (0, 3). Nilai maksimum f = x + 3y adalah …',
      ans: ['9'],
      wrong: { '8': 'Cek (0, 3): 0 + 9 = 9, lebih besar dari (2, 2) = 8.', '4': 'Cek semua pojok, termasuk (0, 3).' },
      steps: ['f(0,0) = 0, f(4,0) = 4, f(2,2) = 8, f(0,3) = 9.', 'Maksimum 9.'],
    },
    {
      type: 'num',
      q: 'Titik pojok daerah penyelesaian adalah (1, 1), (4, 1), dan (1, 5). Nilai minimum f = 2x + y adalah …',
      ans: ['3'],
      wrong: { '7': 'Itu f(1, 5). Cari yang terkecil.', '9': 'Itu nilai maksimum.' },
      steps: ['f(1,1) = 3, f(4,1) = 9, f(1,5) = 7.', 'Minimum 3.'],
    },
    {
      q: 'Lahan parkir 400 m². Satu mobil butuh 10 m² dan satu bus butuh 20 m². Jika x = banyak mobil dan y = banyak bus, pertidaksamaan untuk luas lahan adalah …',
      options: [
        { t: 'x + 2y ≤ 40', ok: true },
        { t: '2x + y ≤ 40', why: 'Bus butuh 2 kali luas mobil, jadi koefisien 2 ada di y.' },
        { t: 'x + y ≤ 400', why: 'Luas setiap kendaraan berbeda. 10x + 20y ≤ 400.' },
        { t: 'x + 2y ≥ 40', why: 'Luas yang dipakai tidak boleh lebih dari tersedia, jadi ≤.' },
      ],
      steps: ['10x + 20y ≤ 400.', 'Dibagi 10: x + 2y ≤ 40.'],
    },
    {
      type: 'num',
      q: 'Titik pojok daerah penyelesaian adalah (0, 0), (6, 0), (4, 3), dan (0, 5). Nilai maksimum f = 5x + 4y adalah …',
      ans: ['32'],
      wrong: { '30': 'Cek (4, 3): 20 + 12 = 32.', '20': 'Itu f(0, 5).' },
      steps: ['f(6,0) = 30, f(4,3) = 32, f(0,5) = 20.', 'Maksimum 32.'],
    },
    {
      q: 'Untuk mencari nilai maksimum fungsi tujuan pada daerah penyelesaian berbentuk segi banyak, kita cukup memeriksa …',
      options: [
        { t: 'titik-titik pojoknya', ok: true },
        { t: 'titik (0, 0) saja', why: '(0, 0) sering justru memberi nilai terkecil.' },
        { t: 'titik tengah daerah', why: 'Nilai terbesar ada di tepi, tepatnya di pojok.' },
        { t: 'semua titik di dalam daerah', why: 'Tidak perlu. Cukup pojoknya.' },
      ],
      steps: ['Nilai optimum fungsi linear pada daerah segi banyak selalu ada di titik pojok.'],
    },
  ],
};

export default {
  id: 'k10b5',
  no: 5,
  title: 'Sistem Persamaan dan Pertidaksamaan Linear',
  desc: 'SPLTV dengan eliminasi dan substitusi, daerah penyelesaian pertidaksamaan dua variabel, dan nilai optimum di titik pojok.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Diketahui x + y + z = 6, x + y = 3, dan y + z = 5. Nilai y adalah …',
      ans: ['2'],
      wrong: { '3': 'z = 6 − 3 = 3, x = 6 − 5 = 1, maka y = 3 − 1 = 2.', '1': '1 adalah nilai x.' },
      steps: ['z = 6 − (x + y) = 3. x = 6 − (y + z) = 1.', 'y = 3 − x = 2.'],
    },
    {
      q: 'Titik (2, 1) memenuhi sistem pertidaksamaan …',
      options: [
        { t: 'x + y ≤ 4 dan x − y ≥ 0', ok: true },
        { t: 'x + y < 3 dan x ≥ 0', why: '2 + 1 = 3, tidak kurang dari 3.' },
        { t: 'x + 2y ≥ 5 dan y ≥ 0', why: '2 + 2 = 4, tidak ≥ 5.' },
        { t: 'y > x', why: '1 tidak lebih dari 2.' },
      ],
      steps: ['2 + 1 = 3 ≤ 4 ✓.', '2 − 1 = 1 ≥ 0 ✓.'],
    },
    {
      type: 'num',
      q: 'Daerah penyelesaian x ≥ 0, y ≥ 0, 2x + y ≤ 8, x + 3y ≤ 9 memiliki pojok (0, 0), (4, 0), (3, 2), dan (0, 3). Nilai maksimum f = x + y adalah …',
      ans: ['5'],
      wrong: { '4': 'Cek (3, 2): 3 + 2 = 5.', '3': 'Itu f(0, 3).' },
      steps: ['f(4,0) = 4, f(3,2) = 5, f(0,3) = 3.', 'Maksimum 5.'],
    },
  ],
};
