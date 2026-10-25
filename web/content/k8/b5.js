// Kelas 8 · Bab 5: Sistem Persamaan Linear Dua Variabel (SPLDV)
import { T, box, ln, dot, range } from '../helpers.js';
import { plane, lineOn } from './plot.js';

const apple = (id, x, y, o = {}) => ({ id, t: 'circle', x, y, r: 14, fill: 'neg', stroke: 'ink', sw: 1.5, ...o });
const orange = (id, x, y, o = {}) => ({ id, t: 'circle', x, y, r: 14, fill: 'acc', stroke: 'ink', sw: 1.5, ...o });
const price = (id, txt, x, y, o = {}) => box(id, x, y, 92, 32, { fill: 'paper', r: 16, label: txt, lsize: 16, ...o });

// Persamaan dalam kolom tetap, supaya suku sejenis bertumpuk rapi saat eliminasi
const COL = [110, 155, 205, 255, 310];
const eqc = (prefix, y, cells, o = {}) => cells.map((c, i) => (c === '' ? null : T(`${prefix}${i}`, c, COL[i], y, { size: 24, ...o }))).filter(Boolean);

// ---------- 5.1 Mengenal SPLDV ----------
const R1 = 85;
const R2 = 165;
const CFG1 = { x: 70, y: 30, w: 240, h: 230, xmin: 0, xmax: 6, ymin: 0, ymax: 9 };
const PL1 = plane('pl', { ...CFG1, every: 1 });

const l1 = {
  id: 'k8b5-1',
  title: 'Mengenal SPLDV dan Metode Grafik',
  hook: 'Dua catatan belanja bisa membongkar dua harga yang belum diketahui. Itulah sistem persamaan linear dua variabel.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Belanja pertama: 2 apel dan 1 jeruk harganya 8 ribu. Belanja kedua: 1 apel dan 1 jeruk harganya 5 ribu. Berapa harga 1 apel?',
          add: [T('lg', '{n:merah} = apel,  {a:kuning} = jeruk', 200, 32, { size: 15, c: 'mut' }), apple('a1', 60, R1), apple('a2', 95, R1), orange('j1', 130, R1), T('e1', '=', 175, R1, { size: 26 }), price('p1', 'Rp8.000', 240, R1), apple('a3', 60, R2), orange('j2', 95, R2), T('e2', '=', 175, R2, { size: 26 }), price('p2', 'Rp5.000', 240, R2)],
          ask: {
            options: [
              { t: 'Rp3.000', ok: true, why: 'Bandingkan dua belanja: bedanya tepat 1 apel, dan harganya beda Rp3.000.' },
              { t: 'Rp4.000', why: 'Rp8.000 ÷ 2 = Rp4.000, tapi belanja pertama juga ada jeruknya.' },
              { t: 'Rp2.500', why: 'Rp5.000 ÷ 2 = Rp2.500 hanya benar jika apel dan jeruk sama harga.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bandingkan dua belanja',
      steps: [
        {
          say: 'Perhatikan: belanja pertama berisi semua barang belanja kedua, yaitu 1 apel dan 1 jeruk, ditambah 1 apel lagi.',
          hl: ['a2', 'j1', 'a3', 'j2'],
        },
        {
          say: 'Coret barang yang sama dari kedua belanja. Harganya juga dikurangi: 8 ribu dikurangi 5 ribu.',
          set: { a2: { o: 0.2 }, j1: { o: 0.2 }, a3: { o: 0.2 }, j2: { o: 0.2 } },
          add: [ln('x1', 75, R1 - 18, 150, R1 + 18, { c: 'neg', sw: 3 }), ln('x2', 40, R2 - 18, 115, R2 + 18, { c: 'neg', sw: 3 })],
        },
        {
          say: 'Yang tersisa: 1 apel sama dengan 3 ribu rupiah.',
          add: [apple('ar', 120, 240), T('er', '=', 165, 240, { size: 26 }), price('pr', 'Rp3.000', 230, 240, { fill: 'ok-soft' })],
        },
        {
          say: 'Lalu dari belanja kedua: 1 apel tambah 1 jeruk sama dengan 5 ribu. Apel 3 ribu, jadi jeruk 2 ribu.',
          add: [T('jr', 'jeruk = 5.000 − 3.000 = {a:Rp2.000}', 200, 285, { size: 18 })],
        },
      ],
    },
    {
      title: 'Menjadi persamaan',
      steps: [
        {
          say: 'Misalkan harga apel x dan harga jeruk y, dalam ribuan. Belanja pertama: 2 x tambah y sama dengan 8.',
          clear: true,
          add: [T('m', 'x = harga apel, y = harga jeruk (ribu rupiah)', 200, 40, { size: 15, c: 'mut' }), T('q1', '2x + y = 8', 200, 100, { size: 30 })],
        },
        { say: 'Belanja kedua: x tambah y sama dengan 5.', add: [T('q2', 'x + y = 5', 200, 150, { size: 30 })] },
        {
          say: 'Dua persamaan dengan dua variabel yang sama ini disebut sistem persamaan linear dua variabel, disingkat SPLDV.',
          add: [box('br', 112, 125, 10, 90, { fill: 'ink', r: 2, sw: 0 }), T('n', 'SPLDV', 200, 205, { size: 22, font: 'serif', w: 600, c: 'acc' })],
        },
        {
          say: 'Penyelesaiannya x sama dengan 3 dan y sama dengan 2, karena memenuhi kedua persamaan sekaligus.',
          add: [T('s', '(x, y) = (3, 2):  2·3 + 2 = 8 ✓,  3 + 2 = 5 ✓', 200, 255, { size: 17, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Metode grafik',
      steps: [
        {
          say: 'Setiap persamaan linear adalah sebuah garis. Garis pertama: 2 x tambah y sama dengan 8. Melalui 0 koma 8 dan 4 koma 0.',
          clear: true,
          add: [...PL1.els, lineOn('g1', PL1, -2, 8, CFG1, { c: 'pos' }), T('l1', '2x + y = 8', 120, 45, { size: 16, c: 'pos' })],
        },
        {
          say: 'Garis kedua: x tambah y sama dengan 5. Melalui 0 koma 5 dan 5 koma 0.',
          add: [lineOn('g2', PL1, -1, 5, CFG1, { c: 'neg' }), T('l2', 'x + y = 5', 290, 175, { size: 16, c: 'neg' })],
        },
        {
          say: 'Kedua garis berpotongan di 3 koma 2. Titik potong itulah penyelesaiannya.',
          add: [dot('s', ...PL1.at(3, 2), 'acc', { r: 8 }), T('ls', '(3, 2)', PL1.at(3, 2)[0] + 30, PL1.at(3, 2)[1] - 10, { size: 16, c: 'acc' })],
          pulse: ['s'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. x tambah y sama dengan 6, dan x dikurangi y sama dengan 2. Berapa x dan y?',
          clear: true,
          add: [T('q1', 'x + y = 6', 200, 100, { size: 30 }), T('q2', 'x − y = 2', 200, 150, { size: 30 })],
          ask: {
            options: [
              { t: 'x = 4, y = 2', ok: true, why: '4 + 2 = 6 dan 4 − 2 = 2. Keduanya terpenuhi.' },
              { t: 'x = 3, y = 3', why: '3 + 3 = 6 benar, tapi 3 − 3 = 0, bukan 2.' },
              { t: 'x = 2, y = 4', why: '2 − 4 = −2, bukan 2.' },
              { t: 'x = 5, y = 3', why: '5 + 3 = 8, bukan 6.' },
            ],
          },
        },
        {
          say: 'Penyelesaian harus memenuhi kedua persamaan. 4 tambah 2 sama dengan 6, dan 4 dikurangi 2 sama dengan 2. Cocok.',
          clear: true,
          add: [T('a', '4 + 2 = 6 ✓', 200, 100, { size: 28, c: 'ok' }), T('b', '4 − 2 = 2 ✓', 200, 150, { size: 28, c: 'ok' }), T('c', '(x, y) = {a:(4, 2)}', 200, 215, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Manakah yang merupakan penyelesaian dari x + y = 7 dan x − y = 1?',
      options: [
        { t: '(4, 3)', ok: true },
        { t: '(3, 4)', why: '3 − 4 = −1, bukan 1.' },
        { t: '(5, 2)', why: '5 − 2 = 3, bukan 1.' },
        { t: '(6, 1)', why: '6 − 1 = 5, bukan 1.' },
      ],
      steps: ['Cek (4, 3): 4 + 3 = 7 ✓, 4 − 3 = 1 ✓.'],
    },
    {
      q: 'Harga 3 buku dan 1 pensil Rp14.000. Jika x = harga buku dan y = harga pensil, persamaannya adalah …',
      options: [
        { t: '3x + y = 14.000', ok: true },
        { t: 'x + 3y = 14.000', why: 'Bukunya 3, jadi 3 dikalikan dengan x (harga buku).' },
        { t: '3x + 1 = 14.000', why: 'Pensil juga punya harga y, bukan 1.' },
        { t: '4xy = 14.000', why: 'Harga buku dan pensil dijumlahkan, bukan dikalikan.' },
      ],
      steps: ['3 buku = 3x. 1 pensil = y.', 'Total: 3x + y = 14.000.'],
    },
    {
      q: 'Pada metode grafik, penyelesaian SPLDV adalah …',
      options: [
        { t: 'titik potong kedua garis', ok: true },
        { t: 'titik potong garis dengan sumbu y', why: 'Itu hanya untuk satu garis. Penyelesaian harus ada di kedua garis.' },
        { t: 'gradien kedua garis', why: 'Gradien menunjukkan kemiringan, bukan penyelesaian.' },
        { t: 'titik (0, 0)', why: 'Belum tentu kedua garis melalui (0, 0).' },
      ],
      steps: ['Titik yang memenuhi kedua persamaan ada di kedua garis.', 'Itulah titik potongnya.'],
    },
    {
      type: 'num',
      q: '2 tas dan 1 topi harganya Rp130.000. 1 tas dan 1 topi harganya Rp80.000. Harga 1 tas adalah Rp …',
      ans: ['50000'],
      wrong: { '65000': '130.000 ÷ 2 belum memperhitungkan topi. Bandingkan dua belanja: bedanya 1 tas.', '30000': 'Itu harga topi.' },
      steps: ['Selisih belanja: 1 tas.', '130.000 − 80.000 = Rp50.000.'],
    },
    {
      q: 'Dua garis sejajar pada metode grafik berarti SPLDV-nya …',
      options: [
        { t: 'tidak punya penyelesaian', ok: true },
        { t: 'punya tepat satu penyelesaian', why: 'Garis sejajar tidak pernah berpotongan.' },
        { t: 'penyelesaiannya (0, 0)', why: 'Garis sejajar tidak punya titik potong sama sekali.' },
        { t: 'punya dua penyelesaian', why: 'Dua garis lurus berbeda paling banyak berpotongan di satu titik.' },
      ],
      steps: ['Sejajar → tidak berpotongan.', 'Tidak ada titik yang memenuhi keduanya.'],
    },
  ],
};

// ---------- 5.2 Metode substitusi ----------
const l2 = {
  id: 'k8b5-2',
  title: 'Metode Substitusi',
  hook: 'Substitusi artinya mengganti. Kalau y = 2x, setiap ada y boleh diganti dengan 2x.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'y sama dengan 2 x, dan x tambah y sama dengan 9. Berapa x?',
          add: [T('q1', 'y = 2x', 200, 100, { size: 30 }), T('q2', 'x + y = 9', 200, 150, { size: 30 })],
          ask: {
            options: [
              { t: '3', ok: true, why: 'x + 2x = 9, jadi 3x = 9, x = 3.' },
              { t: '4,5', why: '9 ÷ 2 = 4,5 hanya kalau x dan y sama besar. Padahal y = 2x.' },
              { t: '6', why: '6 adalah y. Cek: x = 3, y = 6.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mengganti y',
      steps: [
        {
          say: 'Persamaan pertama bilang: y sama dengan 2 x. Jadi di mana pun ada y, boleh kita ganti dengan 2 x.',
          clear: true,
          add: [T('a', 'y = 2x', 200, 50, { size: 26, c: 'acc' }), T('b0', 'x +', 165, 120, { size: 30 }), box('by', 220, 120, 44, 40, { fill: 'pos-soft', r: 8, label: 'y', lsize: 24 }), T('b2', '= 9', 280, 120, { size: 30 })],
        },
        {
          say: 'Ganti y dengan 2 x.',
          set: { by: { label: '2x', fill: 'acc-soft', w: 56 } },
          pulse: ['by'],
        },
        {
          say: 'Sekarang hanya ada satu variabel. x tambah 2 x sama dengan 3 x. Jadi 3 x sama dengan 9, dan x sama dengan 3.',
          add: [T('c', '3x = 9', 200, 180, { size: 28 }), T('d', 'x = {a:3}', 200, 225, { size: 28 })],
        },
        {
          say: 'Kembali ke y sama dengan 2 x: y sama dengan 2 kali 3, yaitu 6.',
          add: [T('e', 'y = 2 × 3 = {a:6}', 200, 270, { size: 24 })],
        },
      ],
    },
    {
      title: 'Contoh kedua',
      steps: [
        {
          say: 'x tambah y sama dengan 7, dan 2 x tambah 3 y sama dengan 18. Belum ada yang berbentuk y sama dengan sesuatu. Kita buat dulu dari persamaan pertama: y sama dengan 7 dikurangi x.',
          clear: true,
          add: [T('q1', 'x + y = 7', 110, 45, { size: 22 }), T('q2', '2x + 3y = 18', 290, 45, { size: 22 }), T('a', 'y = 7 − x', 200, 95, { size: 26, c: 'acc' })],
        },
        {
          say: 'Substitusikan ke persamaan kedua: 2 x tambah 3 kali, 7 dikurangi x, sama dengan 18.',
          add: [T('b', '2x + 3(7 − x) = 18', 200, 140, { size: 24 })],
        },
        {
          say: 'Kalikan masuk: 2 x tambah 21 dikurangi 3 x sama dengan 18. Sederhanakan: minus x tambah 21 sama dengan 18. Jadi x sama dengan 3.',
          add: [T('c', '2x + 21 − 3x = 18', 200, 180, { size: 22 }), T('d', '−x = −3  →  x = {a:3}', 200, 220, { size: 22 })],
        },
        {
          say: 'y sama dengan 7 dikurangi 3, yaitu 4. Penyelesaiannya 3 koma 4.',
          add: [T('e', 'y = 7 − 3 = {a:4}', 200, 262, { size: 22 })],
        },
      ],
    },
    {
      title: 'Kiat memilih',
      steps: [
        {
          say: 'Kiatnya: pilih variabel yang koefisiennya 1, supaya tidak muncul pecahan. Di x tambah y sama dengan 7, x dan y sama-sama berkoefisien 1.',
          clear: true,
          add: [T('a', 'x + y = 7', 200, 80, { size: 30 }), T('b', '↑ koefisien 1, mudah diubah: y = 7 − x', 200, 125, { size: 16, c: 'ok' }), T('c', '2x + 3y = 18', 200, 185, { size: 30 }), T('d', '↑ kalau dari sini: y = (18 − 2x) ÷ 3, lebih repot', 200, 230, { size: 16, c: 'neg' })],
        },
        {
          say: 'Selalu cek jawabanmu di kedua persamaan.',
          add: [T('e', 'cek (3, 4): 3 + 4 = 7 ✓,  6 + 12 = 18 ✓', 200, 275, { size: 16, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. x sama dengan y tambah 1, dan x tambah 2 y sama dengan 10. Berapa x dan y?',
          clear: true,
          add: [T('q1', 'x = y + 1', 200, 100, { size: 30 }), T('q2', 'x + 2y = 10', 200, 150, { size: 30 })],
          ask: {
            options: [
              { t: 'x = 4, y = 3', ok: true, why: '(y + 1) + 2y = 10 → 3y = 9 → y = 3, x = 4.' },
              { t: 'x = 3, y = 4', why: 'x = y + 1, jadi x lebih besar dari y.' },
              { t: 'x = 6, y = 2', why: 'x = y + 1 = 3, bukan 6.' },
              { t: 'x = 5, y = 4', why: '5 + 2 × 4 = 13, bukan 10.' },
            ],
          },
        },
        {
          say: 'Ganti x dengan y tambah 1: y tambah 1 tambah 2 y sama dengan 10. 3 y sama dengan 9, y sama dengan 3. x sama dengan 4.',
          clear: true,
          add: [T('a', '(y + 1) + 2y = 10', 200, 70, { size: 26 }), T('b', '3y + 1 = 10 → y = {a:3}', 200, 125, { size: 26 }), T('c', 'x = 3 + 1 = {a:4}', 200, 180, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Penyelesaian dari y = 3x dan x + y = 12 adalah …',
      options: [
        { t: 'x = 3, y = 9', ok: true },
        { t: 'x = 4, y = 8', why: 'y harus 3 kali x. 3 × 4 = 12, bukan 8.' },
        { t: 'x = 6, y = 6', why: 'y = 3x, jadi y tidak sama dengan x.' },
        { t: 'x = 9, y = 3', why: 'Tertukar: y = 3x, jadi y yang lebih besar.' },
      ],
      steps: ['x + 3x = 12 → 4x = 12 → x = 3.', 'y = 3 × 3 = 9.'],
    },
    {
      type: 'num',
      q: 'Diketahui x + y = 10 dan 2x − y = 5. Nilai x adalah …',
      ans: ['5'],
      wrong: { '15': 'Dari y = 10 − x: 2x − (10 − x) = 5 → 3x = 15 → x = 5.', '7.5': 'Hati-hati tanda: 2x − (10 − x) = 3x − 10.' },
      steps: ['y = 10 − x.', '2x − (10 − x) = 5 → 3x − 10 = 5 → x = 5.'],
    },
    {
      type: 'num',
      q: 'Diketahui x = 2y dan 3x + y = 14. Nilai y adalah …',
      ans: ['2'],
      wrong: { '4': '4 adalah x. y = x ÷ 2.', '14': '3(2y) + y = 7y = 14 → y = 2.' },
      steps: ['3(2y) + y = 14 → 7y = 14.', 'y = 2.'],
    },
    {
      q: 'Dari x − y = 3, bentuk yang tepat untuk substitusi adalah …',
      options: [
        { t: 'x = y + 3', ok: true },
        { t: 'x = y − 3', why: 'Pindahkan −y ke kanan menjadi +y: x = 3 + y.' },
        { t: 'x = 3 − y', why: 'Pindahkan −y ke kanan menjadi +y.' },
        { t: 'y = x + 3', why: 'Jika y = x + 3, maka x − y = −3, bukan 3.' },
      ],
      steps: ['x − y = 3.', 'Tambahkan y ke kedua ruas: x = y + 3.'],
    },
    {
      type: 'num',
      q: 'Umur ayah 3 kali umur Andi. Jumlah umur mereka 48 tahun. Umur Andi adalah … tahun',
      ans: ['12'],
      wrong: { '36': '36 adalah umur ayah.', '16': 'Umur ayah = 3 × umur Andi. Jadi a + 3a = 48 → 4a = 48.' },
      steps: ['Misalkan umur Andi = a, umur ayah = 3a.', 'a + 3a = 48 → 4a = 48 → a = 12.'],
    },
  ],
};

// ---------- 5.3 Metode eliminasi ----------
const l3 = {
  id: 'k8b5-3',
  title: 'Metode Eliminasi dan Soal Cerita',
  hook: 'Eliminasi artinya menghilangkan. Jumlahkan atau kurangkan dua persamaan supaya satu variabel lenyap.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'x tambah y sama dengan 10, dan x dikurangi y sama dengan 4. Kalau kedua persamaan dijumlahkan, apa yang terjadi pada y?',
          add: [...eqc('a', 100, ['x', '+', 'y', '=', '10']), ...eqc('b', 150, ['x', '−', 'y', '=', '4'])],
          ask: {
            options: [
              { t: 'y hilang', ok: true, why: '+y dan −y saling menghabisi, seperti keping positif dan negatif.' },
              { t: 'y menjadi 2y', why: '+y ditambah −y hasilnya 0, bukan 2y.' },
              { t: 'x hilang', why: 'x + x = 2x, tidak hilang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menjumlahkan persamaan',
      steps: [
        {
          say: 'Tumpuk kedua persamaan, lalu jumlahkan per kolom.',
          add: [ln('bar', 85, 178, 335, 178, { sw: 2.5, draw: false }), T('plus', '+', 60, 150, { size: 26, c: 'acc' })],
        },
        {
          say: 'x tambah x sama dengan 2 x. Tambah y dan minus y saling menghabisi. 10 tambah 4 sama dengan 14.',
          add: [...eqc('c', 210, ['2x', '', '0', '=', '14'])],
          hl: ['a2', 'b2'],
        },
        {
          say: '2 x sama dengan 14, jadi x sama dengan 7.',
          add: [T('x', 'x = {a:7}', 200, 255, { size: 26 })],
        },
        {
          say: 'Masukkan ke x tambah y sama dengan 10: 7 tambah y sama dengan 10, jadi y sama dengan 3.',
          add: [T('y', 'y = 10 − 7 = {a:3}', 200, 288, { size: 20 })],
        },
      ],
    },
    {
      title: 'Menyamakan koefisien',
      steps: [
        {
          say: '2 x tambah 3 y sama dengan 12, dan x tambah y sama dengan 5. Tidak ada yang langsung hilang.',
          clear: true,
          add: [...eqc('a', 70, ['2x', '+', '3y', '=', '12']), ...eqc('b', 120, ['x', '+', 'y', '=', '5'])],
        },
        {
          say: 'Kalikan persamaan kedua dengan 2, supaya x-nya sama: 2 x tambah 2 y sama dengan 10.',
          set: { b0: { text: '2x' }, b2: { text: '2y' }, b4: { text: '10' } },
          add: [T('k', '× 2', 365, 120, { size: 18, c: 'acc' })],
          pulse: ['b0', 'b2', 'b4'],
        },
        {
          say: 'Sekarang kurangkan. 2 x dikurangi 2 x habis. 3 y dikurangi 2 y sama dengan y. 12 dikurangi 10 sama dengan 2.',
          add: [ln('bar', 85, 148, 335, 148, { sw: 2.5, draw: false }), T('minus', '−', 60, 120, { size: 26, c: 'acc' }), ...eqc('c', 180, ['0', '', 'y', '=', '2'])],
        },
        {
          say: 'y sama dengan 2. Masukkan ke x tambah y sama dengan 5: x sama dengan 3.',
          add: [T('r', 'y = {a:2},  x = 5 − 2 = {a:3}', 200, 235, { size: 24 })],
        },
      ],
    },
    {
      title: 'Soal cerita',
      steps: [
        {
          say: 'Tiket masuk kebun binatang: 2 dewasa dan 3 anak membayar 95 ribu. 1 dewasa dan 1 anak membayar 40 ribu. Berapa harga tiket anak?',
          clear: true,
          add: [T('s1', '2 dewasa + 3 anak = Rp95.000', 200, 50, { size: 18 }), T('s2', '1 dewasa + 1 anak = Rp40.000', 200, 80, { size: 18 })],
        },
        {
          say: 'Langkah 1: misalkan. d untuk harga tiket dewasa, a untuk tiket anak, dalam ribuan.',
          add: [T('m', 'misal: d = dewasa, a = anak (ribu)', 200, 118, { size: 15, c: 'mut' }), T('e1', '2d + 3a = 95', 200, 150, { size: 22 }), T('e2', 'd + a = 40', 200, 180, { size: 22 })],
        },
        {
          say: 'Langkah 2: selesaikan. Kalikan persamaan kedua dengan 2: 2 d tambah 2 a sama dengan 80. Kurangkan dari persamaan pertama: a sama dengan 15.',
          add: [T('e3', '(2d + 3a) − (2d + 2a) = 95 − 80', 200, 218, { size: 17 }), T('e4', 'a = 15', 200, 245, { size: 22, c: 'acc' })],
        },
        {
          say: 'Langkah 3: jawab pertanyaannya. Harga tiket anak 15 ribu rupiah. Tiket dewasa 40 dikurangi 15, yaitu 25 ribu.',
          add: [T('ans', 'anak {a:Rp15.000}, dewasa Rp25.000', 200, 280, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Di kandang ada ayam dan kambing. Jumlah kepala 10, jumlah kaki 28. Berapa ekor kambing?',
          clear: true,
          add: [T('q1', 'kepala: 10', 200, 100, { size: 28 }), T('q2', 'kaki: 28', 200, 150, { size: 28 }), T('q3', 'ayam 2 kaki, kambing 4 kaki', 200, 200, { size: 16, c: 'mut' })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'a + k = 10 dan 2a + 4k = 28 → k = 4.' },
              { t: '6', why: '6 adalah banyak ayam.' },
              { t: '7', why: '28 ÷ 4 = 7, tapi ada ayam juga.' },
              { t: '5', why: '5 ayam + 5 kambing = 10 + 20 = 30 kaki, bukan 28.' },
            ],
          },
        },
        {
          say: 'Misalkan ayam a dan kambing k. a tambah k sama dengan 10. 2 a tambah 4 k sama dengan 28. Kalikan yang pertama dengan 2, lalu kurangkan: 2 k sama dengan 8, jadi k sama dengan 4.',
          clear: true,
          add: [T('a', 'a + k = 10   → × 2 → 2a + 2k = 20', 200, 70, { size: 18 }), T('b', '2a + 4k = 28', 200, 110, { size: 20 }), T('c', '(2a + 4k) − (2a + 2k) = 28 − 20', 200, 155, { size: 17 }), T('d', '2k = 8 → k = {a:4} kambing', 200, 200, { size: 24 }), T('e', 'ayam = 10 − 4 = 6', 200, 245, { size: 18, c: 'mut' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Penyelesaian dari x + y = 8 dan x − y = 2 adalah …',
      options: [
        { t: 'x = 5, y = 3', ok: true },
        { t: 'x = 3, y = 5', why: 'x − y = 2 berarti x lebih besar.' },
        { t: 'x = 6, y = 2', why: '6 − 2 = 4, bukan 2.' },
        { t: 'x = 10, y = −2', why: '10 + (−2) = 8 benar, tapi 10 − (−2) = 12.' },
      ],
      steps: ['Jumlahkan: 2x = 10 → x = 5.', 'y = 8 − 5 = 3.'],
    },
    {
      type: 'num',
      q: 'Diketahui 3x + 2y = 16 dan x + 2y = 8. Nilai x adalah …',
      ans: ['4'],
      wrong: { '2': '2 adalah y. Kurangkan kedua persamaan: 2x = 8.', '6': '16 − 8 = 8, lalu 2x = 8 → x = 4.' },
      steps: ['Kurangkan: (3x + 2y) − (x + 2y) = 16 − 8.', '2x = 8 → x = 4.'],
    },
    {
      type: 'num',
      q: 'Harga 2 kg gula dan 1 kg beras Rp40.000. Harga 1 kg gula dan 2 kg beras Rp44.000. Harga 1 kg beras adalah Rp …',
      ans: ['16000'],
      wrong: { '12000': '12.000 adalah harga gula.', '28000': 'Kalikan persamaan kedua dengan 2 lalu kurangkan: 3b = 48.000.' },
      steps: ['2g + b = 40.000 dan g + 2b = 44.000.', 'Kalikan yang kedua dengan 2: 2g + 4b = 88.000.', 'Kurangkan: 3b = 48.000 → b = 16.000.'],
    },
    {
      q: 'Keliling persegi panjang 30 cm. Panjangnya 3 cm lebih dari lebarnya. Ukuran persegi panjang itu adalah …',
      options: [
        { t: 'p = 9 cm, l = 6 cm', ok: true },
        { t: 'p = 16,5 cm, l = 13,5 cm', why: 'Keliling = 2(p + l), jadi p + l = 15, bukan 30.' },
        { t: 'p = 6 cm, l = 9 cm', why: 'Panjang lebih besar dari lebar.' },
        { t: 'p = 10 cm, l = 5 cm', why: 'Selisihnya 5, bukan 3.' },
      ],
      steps: ['p + l = 15 dan p − l = 3.', 'Jumlahkan: 2p = 18 → p = 9, l = 6.'],
    },
    {
      type: 'num',
      q: 'Di tempat parkir ada 20 kendaraan terdiri dari mobil (4 roda) dan motor (2 roda). Jumlah roda 56. Banyak mobil adalah …',
      ans: ['8'],
      wrong: { '12': '12 adalah banyak motor.', '14': '56 ÷ 4 = 14, tapi ada motor juga.' },
      steps: ['m + t = 20 dan 4m + 2t = 56.', 'Kalikan yang pertama dengan 2: 2m + 2t = 40.', 'Kurangkan: 2m = 16 → m = 8.'],
    },
  ],
};

export default {
  id: 'k8b5',
  no: 5,
  title: 'Sistem Persamaan Linear Dua Variabel',
  desc: 'Dua persamaan dengan dua variabel: metode grafik, substitusi, eliminasi, dan soal cerita.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Nilai x + y dari sistem 2x + y = 11 dan x + 2y = 10 adalah …',
      options: [
        { t: '7', ok: true },
        { t: '21', why: '21 adalah 3(x + y). Bagi 3.' },
        { t: '4', why: '4 adalah x saja.' },
        { t: '3', why: '3 adalah y saja.' },
      ],
      steps: ['Jumlahkan kedua persamaan: 3x + 3y = 21.', 'x + y = 7.'],
    },
    {
      type: 'num',
      q: 'Selisih dua bilangan 6 dan jumlahnya 30. Bilangan yang lebih besar adalah …',
      ans: ['18'],
      wrong: { '12': '12 adalah bilangan yang lebih kecil.', '24': 'a + b = 30 dan a − b = 6 → 2a = 36.' },
      steps: ['a + b = 30, a − b = 6.', 'Jumlahkan: 2a = 36 → a = 18.'],
    },
    {
      q: 'Sistem 2x + 4y = 8 dan x + 2y = 4 memiliki …',
      options: [
        { t: 'tak terhingga banyak penyelesaian', ok: true },
        { t: 'tepat satu penyelesaian', why: 'Persamaan pertama = 2 × persamaan kedua. Garisnya berimpit.' },
        { t: 'tidak ada penyelesaian', why: 'Garisnya berimpit (sama), bukan sejajar terpisah.' },
        { t: 'penyelesaian x = 0, y = 0', why: '0 + 0 = 0, bukan 4.' },
      ],
      steps: ['2x + 4y = 8 sama dengan 2 × (x + 2y = 4).', 'Dua persamaan menggambarkan garis yang sama → tak terhingga penyelesaian.'],
    },
  ],
};
