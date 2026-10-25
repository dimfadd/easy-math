// Kelas 11 Tingkat Lanjut · Bab 3: Matriks
import { T, ln, dot, table } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag } from '../k10/kit.js';
import { mat } from './kit.js';

// ---------- 3.1 Mengenal matriks ----------
const SALES = [[3, 5, 2], [4, 2, 6]];
const M1 = mat('m', SALES, 200, 175, { size: 26 });
const MT = mat('m', [[3, 4], [5, 2], [2, 6]], 200, 175, { size: 26 });

const l1 = {
  id: 'k11lb3-1',
  title: 'Mengenal Matriks',
  hook: 'Matriks adalah susunan bilangan dalam baris dan kolom, seperti tabel tanpa judul.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Toko kue mencatat penjualan dua hari untuk tiga jenis kue. Kalau angka-angkanya saja yang ditulis dalam kurung, susunannya berapa baris dan berapa kolom?',
          add: [table('tb', 200, 110, [['', 'roti', 'kue', 'donat'], ['Senin', '3', '5', '2'], ['Selasa', '4', '2', '6']], { cw: [80, 70, 70, 70], rh: 36, size: 18, head: true })],
          ask: {
            options: [
              { t: '2 baris, 3 kolom', ok: true, why: 'Dua hari menjadi baris, tiga jenis kue menjadi kolom.' },
              { t: '3 baris, 2 kolom', why: 'Baris itu mendatar: ada 2 (Senin, Selasa).' },
              { t: '6 baris', why: 'Angkanya tetap tersusun dalam baris dan kolom seperti tabel.' },
              { t: '2 baris, 2 kolom', why: 'Ada tiga jenis kue, jadi tiga kolom.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dari tabel ke matriks',
      steps: [
        {
          say: 'Ambil angkanya saja dan apit dengan kurung siku. Inilah matriks. Biasanya diberi nama huruf kapital, misalnya A.',
          clear: true,
          add: [T('n', 'A =', 105, 175, { size: 26 }), ...M1.els, T('h', 'roti  kue  donat', 200, 115, { size: 14, c: 'mut' })],
        },
        {
          say: 'Matriks ini punya 2 baris dan 3 kolom. Ukurannya disebut ordo, ditulis 2 kali 3. Baris selalu disebut lebih dulu.',
          add: [tag('o', 'ordo 2 × 3 (baris × kolom)', 200, 250, 'pos', 15)],
        },
        {
          say: 'Setiap angka disebut elemen. Elemen baris 2 kolom 3 ditulis a dua tiga. Nilainya 6: donat yang terjual hari Selasa.',
          hl: ['m_12'],
          add: [tag('e', 'a₂₃ = 6', 320, 175, 'acc', 16)],
        },
      ],
    },
    {
      title: 'Transpos',
      steps: [
        {
          say: 'Transpos matriks A, ditulis A pangkat t, didapat dengan menukar baris menjadi kolom. Baris pertama 3, 5, 2 menjadi kolom pertama.',
          clear: true,
          add: [T('n', 'Aᵗ =', 100, 175, { size: 26 }), ...M1.els],
        },
        {
          say: 'Lihat elemen-elemennya berpindah. Ordo 2 kali 3 menjadi 3 kali 2.',
          set: Object.fromEntries([[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]].map(([r, k]) => [`m_${r}${k}`, { x: MT.pos(k, r)[0], y: MT.pos(k, r)[1] }])),
          add: [{ ...MT.els.find((e) => e.id === 'mL'), id: 'mL2' }, { ...MT.els.find((e) => e.id === 'mR'), id: 'mR2' }],
          del: ['mL', 'mR'],
        },
        {
          say: 'Elemen a dua tiga di A menjadi elemen baris 3 kolom 2 di transposnya.',
          hl: ['m_12'],
          add: [tag('o', 'ordo 3 × 2', 320, 175, 'pos', 15)],
        },
      ],
    },
    {
      title: 'Jenis matriks',
      steps: [
        {
          say: 'Matriks persegi punya banyak baris sama dengan banyak kolom.',
          clear: true,
          add: [...mat('p', [[2, 7], [1, 5]], 80, 110).els, T('pl', 'persegi', 80, 170, { size: 15, c: 'mut' })],
        },
        {
          say: 'Matriks identitas, ditulis I, berisi 1 di diagonal utama dan 0 di tempat lain. Perannya seperti angka 1 pada perkalian.',
          add: [...mat('i', [[1, 0], [0, 1]], 200, 110, { c: 'pos' }).els, T('il', 'identitas I', 200, 170, { size: 15, c: 'pos' })],
        },
        {
          say: 'Matriks nol berisi 0 semua. Perannya seperti angka 0 pada penjumlahan.',
          add: [...mat('z', [[0, 0], [0, 0]], 320, 110, { c: 'mut' }).els, T('zl', 'nol', 320, 170, { size: 15, c: 'mut' })],
        },
        {
          say: 'Dua matriks sama jika ordonya sama dan setiap elemen yang seletak sama. Dari sini bisa dicari nilai yang belum diketahui.',
          add: [T('k', '[x+1  4] = [5  4]  →  x + 1 = 5  →  x = 4', 200, 240, { size: 17 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Matriks B berordo 4 kali 2. Berapa ordo transposnya?',
          clear: true,
          add: [T('q', 'B berordo 4 × 2', 200, 100, { size: 30 }), T('q2', 'ordo Bᵗ = ?', 200, 160, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '2 × 4', ok: true, why: 'Baris dan kolom bertukar.' },
              { t: '4 × 2', why: 'Transpos menukar baris dan kolom.' },
              { t: '8 × 1', why: 'Banyak elemen tetap 8, tetapi susunannya 2 baris dan 4 kolom.' },
              { t: '2 × 2', why: 'Banyak elemen tidak berubah, tetap 8.' },
            ],
          },
        },
        {
          say: 'Empat baris menjadi empat kolom, dua kolom menjadi dua baris. Ordonya 2 kali 4.',
          add: [T('a', 'Bᵗ berordo {g:2 × 4}', 200, 225, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Matriks [[1, 4, 0], [2, 5, 7]] berordo …',
      options: [
        { t: '2 × 3', ok: true },
        { t: '3 × 2', why: 'Baris disebut dulu: ada 2 baris.' },
        { t: '6', why: 'Ordo ditulis baris × kolom.' },
        { t: '2 × 2', why: 'Setiap baris punya 3 elemen.' },
      ],
      steps: ['2 baris, 3 kolom.', 'Ordo 2 × 3.'],
    },
    {
      type: 'num',
      q: 'Pada matriks [[3, −1, 8], [6, 2, −4]], elemen a₂₁ adalah …',
      ans: ['6'],
      wrong: { '-1': '−1 adalah a₁₂. a₂₁ berarti baris 2, kolom 1.', '2': '2 adalah a₂₂.' },
      steps: ['Baris 2: 6, 2, −4.', 'Kolom 1 dari baris itu: 6.'],
    },
    {
      type: 'num',
      q: 'Jika A = [[2, 5], [7, 1]], elemen baris 1 kolom 2 dari Aᵗ adalah …',
      ans: ['7'],
      wrong: { '5': '5 adalah elemen baris 1 kolom 2 dari A. Di transpos, posisinya bertukar.' },
      steps: ['Aᵗ = [[2, 7], [5, 1]].', 'Baris 1 kolom 2 = 7.'],
    },
    {
      type: 'num',
      q: 'Jika [[x + 2, 3], [4, 2y]] = [[7, 3], [4, 10]], nilai x + y adalah …',
      ans: ['10'],
      wrong: { '12': 'x = 5 dan y = 5, jadi x + y = 10.', '15': '2y = 10 → y = 5, bukan 10.' },
      steps: ['x + 2 = 7 → x = 5.', '2y = 10 → y = 5. x + y = 10.'],
    },
    {
      q: 'Matriks identitas berordo 2 × 2 adalah …',
      options: [
        { t: '[[1, 0], [0, 1]]', ok: true },
        { t: '[[1, 1], [1, 1]]', why: 'Identitas berisi 0 di luar diagonal utama.' },
        { t: '[[0, 1], [1, 0]]', why: 'Angka 1 harus di diagonal utama (kiri atas ke kanan bawah).' },
        { t: '[[0, 0], [0, 0]]', why: 'Itu matriks nol.' },
      ],
      steps: ['Diagonal utama 1, lainnya 0.'],
    },
  ],
};

// ---------- 3.2 Operasi matriks ----------
const A2 = [[1, 2], [3, 4]];
const B2 = [[5, 6], [7, 8]];
const MA = mat('a', A2, 80, 85, { size: 22 });
const MB = mat('b', B2, 200, 85, { size: 22 });
const MC = mat('c', [[19, 22], [43, 50]], 320, 85, { size: 22, cw: 40 });

const l2 = {
  id: 'k11lb3-2',
  title: 'Operasi pada Matriks',
  hook: 'Penjumlahan matriks dilakukan per elemen. Perkalian matriks memasangkan baris dengan kolom.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Matriks 1, 2, 3, 4 ditambah matriks 5, 0, 1, 2 sama dengan …',
          add: [...mat('p', [[1, 2], [3, 4]], 90, 120).els, T('pl', '+', 145, 120, { size: 26 }), ...mat('q', [[5, 0], [1, 2]], 200, 120).els, T('eq', '= ?', 270, 120, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '[[6, 2], [4, 6]]', ok: true, why: 'Jumlahkan elemen yang seletak: 1 + 5, 2 + 0, 3 + 1, 4 + 2.' },
              { t: '[[5, 0], [3, 8]]', why: 'Itu perkalian per elemen. Soalnya penjumlahan.' },
              { t: '[[6, 6]]', why: 'Hasil penjumlahan tetap berordo sama, 2 × 2.' },
              { t: '18', why: 'Matriks tidak dijumlah menjadi satu angka.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jumlah dan kali bilangan',
      steps: [
        {
          say: 'Jumlahkan elemen yang seletak. Syaratnya, ordo kedua matriks harus sama.',
          set: { eq: { text: '=' } },
          add: [...mat('r', [[6, 2], [4, 6]], 320, 120, { c: 'ok' }).els],
        },
        {
          say: 'Mengalikan matriks dengan bilangan, disebut skalar, berarti mengalikan setiap elemennya. 3 kali matriks 1, 2, 3, 4 sama dengan 3, 6, 9, 12.',
          add: [T('s0', '3 ×', 90, 225, { size: 24 }), ...mat('s', [[1, 2], [3, 4]], 160, 225).els, T('s1', '=', 220, 225, { size: 24 }), ...mat('t', [[3, 6], [9, 12]], 290, 225, { c: 'pos' }).els],
        },
      ],
    },
    {
      title: 'Perkalian: baris kali kolom',
      steps: [
        {
          say: 'Perkalian matriks A kali B: setiap baris A dipasangkan dengan setiap kolom B.',
          clear: true,
          add: [T('la', 'A', 80, 35, { size: 18, c: 'mut' }), T('lb', 'B', 200, 35, { size: 18, c: 'mut' }), T('lc', 'AB', 320, 35, { size: 18, c: 'mut' }), ...MA.els, T('x', '×', 140, 85, { size: 24 }), ...MB.els, T('e', '=', 258, 85, { size: 24 }), MC.els.find((e) => e.id === 'cL'), MC.els.find((e) => e.id === 'cR')],
        },
        {
          say: 'Elemen baris 1 kolom 1 hasil: baris 1 A kali kolom 1 B. 1 kali 5 tambah 2 kali 7 sama dengan 19.',
          hl: ['a_00', 'a_01', 'b_00', 'b_10'],
          add: [MC.els.find((e) => e.id === 'c_00'), T('w', '1·5 + 2·7 = 19', 200, 170, { size: 22 })],
        },
        {
          say: 'Baris 1 kali kolom 2: 1 kali 6 tambah 2 kali 8 sama dengan 22.',
          hl: ['a_00', 'a_01', 'b_01', 'b_11'],
          add: [MC.els.find((e) => e.id === 'c_01')],
          set: { w: { text: '1·6 + 2·8 = 22' } },
        },
        {
          say: 'Baris 2 kali kolom 1: 3 kali 5 tambah 4 kali 7 sama dengan 43.',
          hl: ['a_10', 'a_11', 'b_00', 'b_10'],
          add: [MC.els.find((e) => e.id === 'c_10')],
          set: { w: { text: '3·5 + 4·7 = 43' } },
        },
        {
          say: 'Baris 2 kali kolom 2: 3 kali 6 tambah 4 kali 8 sama dengan 50.',
          hl: ['a_10', 'a_11', 'b_01', 'b_11'],
          add: [MC.els.find((e) => e.id === 'c_11')],
          set: { w: { text: '3·6 + 4·8 = 50' } },
        },
        {
          say: 'Syaratnya: banyak kolom A harus sama dengan banyak baris B. Ordo m kali n dikali n kali p menghasilkan m kali p.',
          add: [tag('k', '(m × n)(n × p) → m × p', 200, 220, 'pos', 16)],
        },
        {
          say: 'Hati-hati, B kali A biasanya berbeda dengan A kali B. Di sini B kali A sama dengan 23, 34, 31, 46.',
          add: [T('ba', 'BA = [[23, 34], [31, 46]] ≠ AB', 200, 265, { size: 17, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Matriks baris 2, 1 dikali matriks kolom 3, 4 sama dengan …',
          clear: true,
          add: [...mat('p', [[2, 1]], 120, 120).els, T('x', '×', 175, 120, { size: 24 }), ...mat('q', [[3], [4]], 220, 120).els, T('e', '= ?', 280, 120, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '[10]', ok: true, why: '2 × 3 + 1 × 4 = 10. Ordo (1 × 2)(2 × 1) = 1 × 1.' },
              { t: '[[6, 3], [8, 4]]', why: 'Itu B × A, berordo 2 × 2. Urutannya A × B.' },
              { t: '[6, 4]', why: 'Baris dikali kolom lalu dijumlah: 6 + 4.' },
              { t: 'tidak bisa dikalikan', why: 'Kolom A ada 2 dan baris B ada 2, jadi bisa.' },
            ],
          },
        },
        {
          say: 'Satu baris kali satu kolom: 2 kali 3 tambah 1 kali 4 sama dengan 10. Hasilnya matriks 1 kali 1.',
          add: [T('a', '2·3 + 1·4 = {g:10}', 200, 210, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '[[2, −1], [0, 3]] + [[4, 1], [5, −2]] = …',
      options: [
        { t: '[[6, 0], [5, 1]]', ok: true },
        { t: '[[6, −2], [5, 1]]', why: '−1 + 1 = 0.' },
        { t: '[[8, −1], [0, −6]]', why: 'Itu perkalian per elemen.' },
        { t: '[[6, 0], [5, 5]]', why: '3 + (−2) = 1.' },
      ],
      steps: ['Jumlahkan per elemen.', '[[6, 0], [5, 1]].'],
    },
    {
      q: 'Jika A = [[1, −2], [3, 0]], maka 2A = …',
      options: [
        { t: '[[2, −4], [6, 0]]', ok: true },
        { t: '[[3, 0], [5, 2]]', why: 'Itu A + 2. Skalar mengalikan setiap elemen.' },
        { t: '[[2, −2], [3, 0]]', why: 'Semua elemen dikali 2.' },
        { t: '[[1, 4], [9, 0]]', why: 'Itu kuadrat setiap elemen.' },
      ],
      steps: ['Kalikan setiap elemen dengan 2.'],
    },
    {
      type: 'num',
      q: 'Jika A = [[2, 1], [0, 3]] dan B = [[1, 4], [2, 5]], elemen baris 1 kolom 2 dari AB adalah …',
      ans: ['13'],
      wrong: { '4': 'Baris 1 A: (2, 1). Kolom 2 B: (4, 5). 2·4 + 1·5.', '9': '2 × 4 + 1 × 5 = 13.' },
      steps: ['Baris 1 A × kolom 2 B.', '2·4 + 1·5 = 13.'],
    },
    {
      q: 'Matriks A berordo 2 × 3 dan B berordo 3 × 4. Ordo AB adalah …',
      options: [
        { t: '2 × 4', ok: true },
        { t: '3 × 3', why: 'Ordo hasil = baris A × kolom B.' },
        { t: '2 × 3', why: 'Ordo hasil = (baris A) × (kolom B) = 2 × 4.' },
        { t: 'tidak bisa dikalikan', why: 'Kolom A = 3 = baris B, jadi bisa.' },
      ],
      steps: ['(2 × 3)(3 × 4).', 'Hasil 2 × 4.'],
    },
    {
      q: 'Matriks P berordo 2 × 2 dan Q berordo 3 × 2. Manakah perkalian yang dapat dilakukan?',
      options: [
        { t: 'QP', ok: true },
        { t: 'PQ', why: 'Kolom P = 2, baris Q = 3. Tidak sama.' },
        { t: 'keduanya', why: 'PQ tidak bisa karena 2 ≠ 3.' },
        { t: 'tidak keduanya', why: 'QP bisa: kolom Q = 2 = baris P.' },
      ],
      steps: ['QP: (3 × 2)(2 × 2) → bisa, hasil 3 × 2.', 'PQ: (2 × 2)(3 × 2) → tidak bisa.'],
    },
  ],
};

// ---------- 3.3 Determinan dan invers ----------
const CD = { x: 70, y: 25, w: 240, h: 240, xmin: -1, xmax: 5, ymin: -1, ymax: 5 };
const PD = plane('pl', CD);
const para = (id, u, v, fill = 'pos-soft', o = {}) => ({ id, t: 'poly', x: 0, y: 0, pts: [PD.at(0, 0), PD.at(u[0], u[1]), PD.at(u[0] + v[0], u[1] + v[1]), PD.at(v[0], v[1])], fill, stroke: 'ink', sw: 2, z: -1, ...o });

const l3 = {
  id: 'k11lb3-3',
  title: 'Determinan dan Invers Matriks',
  hook: 'Determinan matriks 2 × 2 adalah ad − bc. Angka ini menunjukkan berapa kali luas bertambah, dan menentukan apakah matriks punya invers.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Determinan matriks a, b, c, d dihitung dengan a kali d dikurangi b kali c. Berapa determinan matriks 3, 1, 2, 4?',
          add: [T('n', 'det', 70, 120, { size: 24 }), ...mat('m', [[3, 1], [2, 4]], 140, 120, { size: 26 }).els, T('q', '= ?', 225, 120, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '10', ok: true, why: '3 × 4 − 1 × 2 = 12 − 2 = 10.' },
              { t: '14', why: 'Hasil kali diagonal kedua dikurangi, bukan ditambah.' },
              { t: '−10', why: 'Diagonal utama dikurangi diagonal lain: 12 − 2.' },
              { t: '2', why: '2 hanya hasil kali diagonal kedua (1 × 2). Kurangkan dari 3 × 4 = 12.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Rumus determinan',
      steps: [
        {
          say: 'Kalikan diagonal utama, dari kiri atas ke kanan bawah: 3 kali 4 sama dengan 12. Kurangi hasil kali diagonal lainnya: 1 kali 2 sama dengan 2.',
          add: [ln('d1', 112, 96, 168, 144, { sw: 2.5, c: 'ok' }), ln('d2', 168, 96, 112, 144, { sw: 2.5, c: 'neg', dash: '4 3' })],
        },
        {
          say: 'Determinannya 12 dikurangi 2, yaitu 10.',
          set: { q: { text: '= 12 − 2 = {g:10}', x: 280 } },
          add: [T('f', 'det [[a, b], [c, d]] = ad − bc', 200, 220, { size: 22, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Determinan sebagai luas',
      steps: [
        {
          say: 'Persegi satuan dibentuk oleh dua panah: 1 koma 0 dan 0 koma 1. Luasnya 1.',
          clear: true,
          add: [...PD.els, para('sq', [1, 0], [0, 1])],
        },
        {
          say: 'Matriks 3, 1, 0, 2 mengubah kedua panah itu menjadi kolom-kolomnya: 3 koma 0 dan 1 koma 2. Persegi berubah menjadi jajargenjang.',
          set: { sq: para('sq', [3, 0], [1, 2]) },
          add: [tag('m', 'kolom: (3, 0) dan (1, 2)', 290, 40, 'ink', 13)],
        },
        {
          say: 'Luas jajargenjang ini alas 3 kali tinggi 2, yaitu 6. Determinannya juga 3 kali 2 dikurangi 1 kali 0, yaitu 6. Determinan menunjukkan berapa kali luas diperbesar.',
          add: [tag('d', 'luas = 6 = det', 290, 70, 'ok', 15)],
        },
        {
          say: 'Kalau determinannya 0, jajargenjangnya gepeng menjadi garis. Matriks 1, 2, 1, 2 punya determinan 2 dikurangi 2, yaitu 0.',
          set: { sq: para('sq', [1, 1], [2, 2], 'neg-soft', { sw: 4, stroke: 'neg' }), m: tag('m', 'kolom: (1, 1) dan (2, 2)', 290, 40, 'ink', 13), d: tag('d', 'det = 0 → gepeng', 290, 70, 'neg', 15) },
        },
      ],
    },
    {
      title: 'Invers matriks',
      steps: [
        {
          say: 'Invers matriks A, ditulis A pangkat minus 1, adalah matriks yang jika dikalikan dengan A menghasilkan identitas. Rumusnya: 1 per determinan, dikali matriks d, minus b, minus c, a.',
          clear: true,
          add: [T('f', 'A⁻¹ = (1 ÷ det A) × [[d, −b], [−c, a]]', 200, 50, { size: 20, c: 'pos' })],
        },
        {
          say: 'Contoh A sama dengan 3, 1, 5, 2. Determinannya 6 dikurangi 5, yaitu 1. Tukar a dan d, beri tanda minus pada b dan c.',
          add: [T('n', 'A =', 70, 125, { size: 22 }), ...mat('a', [[3, 1], [5, 2]], 125, 125).els, T('n2', 'A⁻¹ =', 225, 125, { size: 22 }), ...mat('b', [[2, -1], [-5, 3]].map((r) => r.map((v) => (v < 0 ? `−${-v}` : v))), 300, 125, { c: 'ok' }).els],
        },
        {
          say: 'Cek: A kali A invers sama dengan identitas. 3 kali 2 tambah 1 kali minus 5 sama dengan 1, dan seterusnya.',
          add: [T('c', 'A × A⁻¹ = [[1, 0], [0, 1]] = I ✓', 200, 195, { size: 20 })],
        },
        {
          say: 'Matriks yang determinannya 0 tidak punya invers, karena tidak bisa dibagi 0. Matriks seperti ini disebut singular.',
          add: [T('s', 'det = 0  →  tidak punya invers (singular)', 200, 245, { size: 18, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Menyelesaikan SPLDV',
      steps: [
        {
          say: 'Sistem 3x tambah y sama dengan 5 dan 5x tambah 2y sama dengan 9 bisa ditulis sebagai matriks A kali kolom x, y sama dengan kolom 5, 9.',
          clear: true,
          add: [T('a', '3x + y = 5,   5x + 2y = 9', 200, 45, { size: 22 }), ...mat('a', [[3, 1], [5, 2]], 100, 120).els, ...mat('x', [['x'], ['y']], 165, 120).els, T('e', '=', 205, 120, { size: 24 }), ...mat('k', [[5], [9]], 245, 120).els],
        },
        {
          say: 'Kalikan kedua ruas dengan A invers dari kiri. Kolom x, y sama dengan A invers kali kolom 5, 9.',
          add: [T('b', '(x, y) = A⁻¹ (5, 9) = (2·5 − 1·9, −5·5 + 3·9)', 200, 195, { size: 16 })],
        },
        {
          say: 'Hasilnya x sama dengan 1 dan y sama dengan 2. Cek: 3 tambah 2 sama dengan 5, dan 5 tambah 4 sama dengan 9.',
          add: [T('c', 'x = 1,  y = 2', 200, 240, { size: 26, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Manakah matriks yang tidak punya invers?',
          clear: true,
          add: [...mat('p', [[2, 4], [1, 2]], 80, 110).els, ...mat('q', [[1, 2], [3, 4]], 200, 110).els, ...mat('r', [[3, 0], [0, 3]], 320, 110).els, T('l1', 'P', 80, 165, { size: 18 }), T('l2', 'Q', 200, 165, { size: 18 }), T('l3', 'R', 320, 165, { size: 18 })],
          ask: {
            options: [
              { t: 'P', ok: true, why: 'det P = 2 · 2 − 4 · 1 = 0.' },
              { t: 'Q', why: 'det Q = 4 − 6 = −2, tidak nol.' },
              { t: 'R', why: 'det R = 9, tidak nol.' },
              { t: 'semua punya invers', why: 'det P = 0, jadi P tidak punya invers.' },
            ],
          },
        },
        {
          say: 'Determinan P sama dengan 4 dikurangi 4, yaitu 0. Kolom-kolomnya searah, jadi luasnya gepeng. P tidak punya invers.',
          add: [T('a', 'det P = 2·2 − 4·1 = {n:0}', 200, 230, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Determinan matriks [[5, 2], [3, 4]] adalah …',
      ans: ['14'],
      wrong: { '26': '20 − 6, bukan 20 + 6.', '-14': 'ad − bc = 20 − 6 = 14.' },
      steps: ['5 × 4 − 2 × 3.', '= 14.'],
    },
    {
      type: 'num',
      q: 'Determinan [[x, 3], [2, x]] sama dengan 10. Jika x positif, nilai x adalah …',
      ans: ['4'],
      wrong: { '16': 'x² − 6 = 10 → x² = 16 → x = 4.', '2': 'x² − 6 = 10, bukan x² = 4.' },
      steps: ['x² − 6 = 10.', 'x² = 16 → x = 4.'],
    },
    {
      q: 'Invers matriks [[2, 1], [5, 3]] adalah …',
      options: [
        { t: '[[3, −1], [−5, 2]]', ok: true },
        { t: '[[3, 1], [5, 2]]', why: 'b dan c harus diberi tanda minus.' },
        { t: '[[−2, −1], [−5, −3]]', why: 'Itu −A, bukan invers.' },
        { t: '[[2, −5], [−1, 3]]', why: 'a dan d ditukar, b dan c diberi tanda minus tanpa ditukar.' },
      ],
      steps: ['det = 6 − 5 = 1.', 'A⁻¹ = [[3, −1], [−5, 2]].'],
    },
    {
      q: 'Matriks manakah yang singular?',
      options: [
        { t: '[[3, 6], [1, 2]]', ok: true },
        { t: '[[3, 6], [2, 1]]', why: 'det = 3 − 12 = −9.' },
        { t: '[[1, 0], [0, 1]]', why: 'det = 1.' },
        { t: '[[2, 1], [1, 2]]', why: 'det = 4 − 1 = 3.' },
      ],
      steps: ['det [[3, 6], [1, 2]] = 6 − 6 = 0.', 'Singular.'],
    },
    {
      type: 'num',
      q: 'A matriks 2 × 2 dengan det A = 3. Nilai det(2A) adalah …',
      ans: ['12'],
      wrong: { '6': 'Setiap elemen dikali 2, jadi ad − bc dikali 2 × 2 = 4.', '9': 'det(2A) = 2² × det A.' },
      steps: ['det(kA) = k² det A untuk matriks 2 × 2.', '4 × 3 = 12.'],
    },
  ],
};

export default {
  id: 'k11lb3',
  no: 3,
  title: 'Matriks',
  desc: 'Ordo, elemen, transpos, jenis matriks, penjumlahan, perkalian, determinan sebagai luas, invers, dan penyelesaian SPLDV.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Jika A = [[1, 2], [3, 4]], maka A + Aᵗ = …',
      options: [
        { t: '[[2, 5], [5, 8]]', ok: true },
        { t: '[[2, 4], [6, 8]]', why: 'Itu 2A. Aᵗ = [[1, 3], [2, 4]].' },
        { t: '[[1, 5], [5, 4]]', why: 'Diagonal utama juga dijumlah: 1 + 1, 4 + 4.' },
        { t: '[[2, 5], [5, 4]]', why: '4 + 4 = 8.' },
      ],
      steps: ['Aᵗ = [[1, 3], [2, 4]].', 'A + Aᵗ = [[2, 5], [5, 8]].'],
    },
    {
      type: 'num',
      q: 'Jika [[2, 1], [1, 1]] × [[x], [y]] = [[5], [3]], nilai x adalah …',
      ans: ['2'],
      wrong: { '1': '1 adalah nilai y.', '3': '2x + y = 5 dan x + y = 3 → x = 2.' },
      steps: ['2x + y = 5 dan x + y = 3.', 'Dikurangkan: x = 2.'],
    },
    {
      type: 'num',
      q: 'Determinan [[4, −2], [3, 1]] adalah …',
      ans: ['10'],
      wrong: { '-2': '4 × 1 − (−2) × 3 = 4 + 6.', '4': 'Ingat (−2) × 3 = −6, dikurangi menjadi + 6.' },
      steps: ['4 × 1 − (−2)(3).', '= 4 + 6 = 10.'],
    },
  ],
};
