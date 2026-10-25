// Kelas 11 · Bab 3: Statistika (data dua variabel)
import { T, ln, dot, table } from '../helpers.js';
import { plane, lineOn } from '../k8/plot.js';
import { tag } from '../k10/kit.js';

// Data: jam belajar (x) dan skor kuis (y). Regresi y = 2,6 + 0,8x, r = 0,8.
const XY = [[1, 3], [2, 5], [3, 4], [4, 7], [5, 6]];
const CS = { x: 60, y: 25, w: 280, h: 220, xmin: 0, xmax: 6, ymin: 0, ymax: 9 };
const PS = plane('pl', CS);
const pts = (p, data, c = 'pos', P = PS) => data.map(([a, b], i) => dot(`${p}${i}`, ...P.at(a, b), c, { r: 6 }));

// Contoh pola lain (bidang kecil tanpa label)
const CM = { x: 60, y: 25, w: 280, h: 220, xmin: 0, xmax: 10, ymin: 0, ymax: 10 };
const PM = plane('pm', { ...CM, labels: false, xl: 'suhu', yl: 'jaket' });
const NEG = [[1, 9], [2, 8.5], [3, 7], [4, 7.5], [5, 5.5], [6, 5], [7, 3.5], [8, 3], [9, 1.5]];
const NONE = [[1, 4], [2, 8], [3, 2], [4, 6], [5, 9], [6, 3], [7, 7], [8, 4.5], [9, 6.5]];

// ---------- 3.1 Diagram pencar ----------
const l1 = {
  id: 'k11b3-1',
  title: 'Diagram Pencar',
  hook: 'Kalau setiap siswa punya dua data, misalnya jam belajar dan skor, kita bisa melihat apakah keduanya berhubungan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Lima siswa mencatat jam belajar dan skor kuisnya. Siswa yang belajar lebih lama cenderung mendapat skor …',
          add: [table('tb', 200, 130, [['jam belajar', '1', '2', '3', '4', '5'], ['skor', '3', '5', '4', '7', '6']], { cw: [110, 45, 45, 45, 45, 45], rh: 40, size: 18, head: true })],
          ask: {
            options: [
              { t: 'lebih tinggi, walaupun tidak selalu', ok: true, why: 'Secara umum skornya naik, tetapi ada yang turun sedikit (dari 5 ke 4, dari 7 ke 6).' },
              { t: 'selalu lebih tinggi', why: 'Siswa 3 jam mendapat 4, lebih rendah dari siswa 2 jam.' },
              { t: 'lebih rendah', why: 'Skor 1 jam adalah 3, sedangkan 4–5 jam mendapat 6–7.' },
              { t: 'tidak ada hubungannya', why: 'Kecenderungannya terlihat naik.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Titik untuk setiap siswa',
      steps: [
        {
          say: 'Gambarkan setiap siswa sebagai satu titik: jam belajar di sumbu mendatar, skor di sumbu tegak. Siswa pertama: 1 jam, skor 3.',
          clear: true,
          add: [...PS.els, dot('d0', ...PS.at(1, 3), 'pos', { r: 6 }), tag('t0', '(1, 3)', ...PS.at(1, 3.9), 'pos', 13)],
        },
        {
          say: 'Tambahkan semua siswa. Gambar seperti ini disebut diagram pencar.',
          del: ['t0'],
          add: [pts('d', XY.slice(1)).map((e, i) => ({ ...e, id: `d${i + 1}` }))],
        },
        {
          say: 'Titik-titiknya cenderung naik dari kiri bawah ke kanan atas. Ini disebut hubungan atau korelasi positif: x naik, y cenderung ikut naik.',
          add: [ln('tr', ...PS.at(0.5, 2.8), ...PS.at(5.5, 7.4), { sw: 8, c: 'pos', o: 0.25, z: -1 }), tag('k', 'korelasi positif', 140, 40, 'pos', 15)],
        },
      ],
    },
    {
      title: 'Pola lain',
      steps: [
        {
          say: 'Contoh lain: suhu udara dan banyak jaket yang terjual. Semakin panas, jaket semakin sedikit terjual. Titiknya turun dari kiri atas ke kanan bawah. Ini korelasi negatif.',
          clear: true,
          add: [...PM.els, ...pts('n', NEG, 'neg', PM), tag('k', 'korelasi negatif', 280, 40, 'neg', 15)],
        },
        {
          say: 'Kalau titiknya menyebar tanpa arah yang jelas, misalnya nomor sepatu dan nilai matematika, berarti tidak ada korelasi.',
          del: ['n*'],
          add: [...pts('z', NONE, 'mut', PM)],
          set: { k: tag('k', 'tidak ada korelasi', 280, 40, 'ink', 15), pmxl: { text: 'x' }, pmyl: { text: 'y' } },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Pasangan data manakah yang kemungkinan besar berkorelasi negatif?',
          clear: true,
          add: [T('q', 'korelasi negatif: x naik, y turun', 200, 120, { size: 22 })],
          ask: {
            options: [
              { t: 'harga barang dan banyak pembeli', ok: true, why: 'Semakin mahal, biasanya semakin sedikit yang membeli.' },
              { t: 'tinggi badan dan berat badan', why: 'Orang yang lebih tinggi cenderung lebih berat: positif.' },
              { t: 'luas rumah dan harga rumah', why: 'Rumah lebih luas cenderung lebih mahal: positif.' },
              { t: 'nomor rumah dan nilai ujian', why: 'Keduanya tidak berhubungan.' },
            ],
          },
        },
        {
          say: 'Saat harga naik, pembeli cenderung berkurang. Satu naik, yang lain turun. Itu korelasi negatif.',
          add: [T('a', 'harga ↑  →  pembeli ↓', 200, 190, { size: 28, c: 'neg' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Titik-titik diagram pencar turun dari kiri atas ke kanan bawah. Hubungan kedua variabel adalah …',
      options: [
        { t: 'korelasi negatif', ok: true },
        { t: 'korelasi positif', why: 'Positif berarti naik dari kiri bawah ke kanan atas.' },
        { t: 'tidak ada korelasi', why: 'Polanya jelas turun.' },
        { t: 'tidak bisa ditentukan', why: 'Arah titik-titiknya menunjukkan korelasi negatif.' },
      ],
      steps: ['x naik, y turun → korelasi negatif.'],
    },
    {
      q: 'Pasangan variabel manakah yang kemungkinan besar berkorelasi positif?',
      options: [
        { t: 'tinggi badan dan berat badan', ok: true },
        { t: 'kecepatan mobil dan waktu tempuh', why: 'Semakin cepat, waktu tempuh makin singkat: negatif.' },
        { t: 'nomor absen dan nilai', why: 'Tidak berhubungan.' },
        { t: 'suhu udara dan penjualan jaket', why: 'Makin panas, jaket makin jarang dibeli: negatif.' },
      ],
      steps: ['Orang yang lebih tinggi cenderung lebih berat.'],
    },
    {
      q: 'Pada diagram pencar jam belajar (x) dan skor (y), titik (4, 7) berarti …',
      options: [
        { t: 'seorang siswa belajar 4 jam dan mendapat skor 7', ok: true },
        { t: 'seorang siswa belajar 7 jam dan mendapat skor 4', why: 'Koordinat pertama adalah x (jam belajar).' },
        { t: '4 siswa mendapat skor 7', why: 'Setiap titik mewakili satu siswa.' },
        { t: 'skor rata-rata 4 sampai 7', why: 'Titik bukan rentang.' },
      ],
      steps: ['(x, y) = (jam, skor).', '(4, 7): 4 jam, skor 7.'],
    },
    {
      q: 'Diagram pencar paling tepat dipakai untuk …',
      options: [
        { t: 'melihat hubungan dua variabel', ok: true },
        { t: 'menunjukkan bagian dari keseluruhan', why: 'Itu diagram lingkaran.' },
        { t: 'membandingkan frekuensi kelas', why: 'Itu histogram atau diagram batang.' },
        { t: 'menunjukkan perubahan satu data dari waktu ke waktu', why: 'Itu diagram garis.' },
      ],
      steps: ['Setiap titik memuat dua data sekaligus.'],
    },
    {
      q: 'Titik-titik diagram pencar menyebar tanpa arah yang jelas. Artinya …',
      options: [
        { t: 'hampir tidak ada korelasi', ok: true },
        { t: 'korelasi positif kuat', why: 'Korelasi kuat terlihat sebagai titik-titik yang rapat di sekitar garis.' },
        { t: 'korelasi negatif kuat', why: 'Tidak ada arah turun yang jelas.' },
        { t: 'datanya salah', why: 'Data bisa benar, hanya saja kedua variabel tidak berhubungan.' },
      ],
      steps: ['Tidak ada pola naik atau turun → tidak ada korelasi.'],
    },
  ],
};

// ---------- 3.2 Garis regresi ----------
const SUMS = [['x', 'y', 'xy', 'x²'], ...XY.map(([a, b]) => [String(a), String(b), String(a * b), String(a * a)]), ['15', '25', '83', '55']];

const l2 = {
  id: 'k11b3-2',
  title: 'Garis Regresi',
  hook: 'Garis regresi adalah garis lurus yang paling mewakili titik-titik pada diagram pencar. Garis ini dipakai untuk memperkirakan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Kalau ada siswa yang belajar 6 jam, kira-kira berapa skornya? Lihat kecenderungan titik-titiknya.',
          add: [...PS.els, ...pts('d', XY), dot('q', ...PS.at(6, 7.4), 'acc', { r: 7, o: 0.35 }), tag('qt', '6 jam → ?', ...PS.at(4.9, 8.5), 'acc', 14)],
          ask: {
            options: [
              { t: 'sekitar 7', ok: true, why: 'Kecenderungannya naik kira-kira 0,8 per jam. Dari garis regresi: 2,6 + 0,8 × 6 = 7,4.' },
              { t: 'sekitar 10', why: 'Kenaikannya tidak secepat itu. Rata-rata naik kurang dari 1 per jam.' },
              { t: 'sekitar 4', why: 'Polanya naik, jadi skor 6 jam mestinya lebih tinggi dari skor 5 jam.' },
              { t: 'pasti 8', why: 'Perkiraan dari pola tidak pernah pasti, hanya mendekati.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Garis yang paling pas',
      steps: [
        {
          say: 'Kita cari garis lurus yang sedekat mungkin dengan semua titik. Jarak tegak setiap titik ke garis disebut sisaan.',
          del: ['q', 'qt'],
          add: [lineOn('rg', PS, 0.8, 2.6, CS, { c: 'ok' }), ...XY.map(([a, b], i) => ln(`e${i}`, ...PS.at(a, b), ...PS.at(a, 2.6 + 0.8 * a), { sw: 2, dash: '3 3', c: 'neg', z: -1 }))],
        },
        {
          say: 'Garis regresi dibuat supaya jumlah kuadrat sisaan sekecil mungkin. Cara ini disebut metode kuadrat terkecil.',
          pulse: ['e0', 'e1', 'e2', 'e3', 'e4'],
        },
        {
          say: 'Garis ini selalu melewati titik rata-rata. Rata-rata jam 3, rata-rata skor 5. Jadi garis melewati 3 koma 5.',
          add: [dot('mn', ...PS.at(3, 5), 'acc', { r: 8 }), tag('mt', '(x̄, ȳ) = (3, 5)', ...PS.at(1.6, 6.6), 'acc', 14)],
        },
      ],
    },
    {
      title: 'Menghitung persamaannya',
      steps: [
        {
          say: 'Persamaan garis regresi ditulis y sama dengan a tambah bx. Hitung dulu jumlah-jumlah dari tabel.',
          clear: true,
          add: [table('tb', 92, 145, SUMS, { cw: [38, 38, 46, 46], rh: 30, size: 15, head: true })],
        },
        {
          say: 'Kemiringan b sama dengan n kali jumlah xy dikurangi jumlah x kali jumlah y, dibagi n kali jumlah x kuadrat dikurangi jumlah x dikuadratkan.',
          add: [T('b0', 'b = (nΣxy − ΣxΣy) ÷ (nΣx² − (Σx)²)', 290, 50, { size: 12 }), T('b1', '= (5·83 − 15·25) ÷ (5·55 − 15²)', 290, 85, { size: 13 }), T('b2', '= 40 ÷ 50 = {g:0,8}', 290, 115, { size: 17 })],
        },
        {
          say: 'a sama dengan rata-rata y dikurangi b kali rata-rata x: 5 dikurangi 0,8 kali 3, yaitu 2,6.',
          add: [T('a0', 'a = ȳ − b·x̄', 290, 165, { size: 15 }), T('a1', '= 5 − 0,8 · 3 = {g:2,6}', 290, 195, { size: 17 })],
        },
        {
          say: 'Jadi garis regresinya y sama dengan 2,6 tambah 0,8x. Artinya setiap tambahan 1 jam belajar, skor naik kira-kira 0,8.',
          add: [tag('f', 'y = 2,6 + 0,8x', 290, 250, 'ok', 18)],
        },
      ],
    },
    {
      title: 'Memperkirakan',
      steps: [
        {
          say: 'Perkiraan skor untuk 6 jam belajar: 2,6 tambah 0,8 kali 6, yaitu 7,4.',
          clear: true,
          add: [...PS.els, ...pts('d', XY), lineOn('rg', PS, 0.8, 2.6, CS, { c: 'ok' }), dot('q', ...PS.at(6, 7.4), 'acc', { r: 7 }), ln('qv', ...PS.at(6, 0), ...PS.at(6, 7.4), { sw: 2, dash: '4 4', c: 'acc' }), tag('qt', 'x = 6 → y = 7,4', ...PS.at(4.5, 8.6), 'acc', 14)],
        },
        {
          say: 'Hati-hati memperkirakan terlalu jauh di luar data. Belajar 20 jam tidak berarti skornya 18,6, karena skor maksimal 10. Garis regresi hanya dapat dipercaya di sekitar data.',
          add: [tag('w', 'jangan terlalu jauh di luar data', 200, 280, 'neg', 14)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Garis regresi antara luas toko (x, dalam puluhan meter persegi) dan omzet (y, juta rupiah) adalah y sama dengan 5 tambah 3x. Berapa perkiraan omzet toko seluas 40 meter persegi?',
          clear: true,
          add: [T('q', 'y = 5 + 3x', 200, 80, { size: 32 }), T('q2', 'x dalam puluhan m², y dalam juta rupiah', 200, 125, { size: 16, c: 'mut' }), T('q3', 'luas 40 m² → omzet = ?', 200, 175, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '17 juta', ok: true, why: '40 m² berarti x = 4. y = 5 + 3 × 4 = 17.' },
              { t: '125 juta', why: 'x dalam puluhan m², jadi x = 4, bukan 40.' },
              { t: '32 juta', why: 'Itu (5 + 3) × 4. Kalikan 3 dengan x dulu.' },
              { t: '12 juta', why: 'Jangan lupa + 5.' },
            ],
          },
        },
        {
          say: 'Luas 40 meter persegi berarti x sama dengan 4. y sama dengan 5 tambah 12, yaitu 17 juta rupiah.',
          add: [T('a', 'y = 5 + 3 × 4 = {g:17}', 200, 235, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Garis regresi y = 2 + 3x. Perkiraan nilai y untuk x = 4 adalah …',
      ans: ['14'],
      wrong: { '20': 'Itu (2 + 3) × 4. Kalikan 3 dengan 4 dulu, lalu tambah 2.', '12': 'Jangan lupa + 2.' },
      steps: ['y = 2 + 3 × 4.', '= 14.'],
    },
    {
      type: 'num',
      q: 'Rata-rata x adalah 4, rata-rata y adalah 10, dan kemiringan garis regresi b = 2. Nilai a pada y = a + bx adalah …',
      ans: ['2'],
      wrong: { '18': 'a = ȳ − b·x̄ = 10 − 8, bukan 10 + 8.', '6': 'Kalikan b dengan x̄ dulu: 2 × 4 = 8.' },
      steps: ['a = ȳ − b·x̄.', '= 10 − 2 × 4 = 2.'],
    },
    {
      q: 'Pada garis regresi y = 10 + 1,5x, angka 1,5 berarti …',
      options: [
        { t: 'setiap x naik 1, y naik kira-kira 1,5', ok: true },
        { t: 'nilai y saat x = 0', why: 'Itu a = 10.' },
        { t: 'y selalu 1,5 kali x', why: 'Masih ada tambahan 10.' },
        { t: 'kekuatan hubungan x dan y', why: 'Kekuatan hubungan diukur dengan koefisien korelasi.' },
      ],
      steps: ['b adalah kemiringan: perubahan y untuk setiap kenaikan 1 pada x.'],
    },
    {
      type: 'num',
      q: 'Garis regresi antara harga (x, ribu rupiah) dan banyak pembeli (y) adalah y = 50 − 2x. Perkiraan banyak pembeli jika harganya 10 ribu rupiah adalah …',
      ans: ['30'],
      wrong: { '480': 'Itu (50 − 2) × 10.', '70': 'Kemiringannya negatif: 50 − 20.' },
      steps: ['y = 50 − 2 × 10.', '= 30 pembeli.'],
    },
    {
      q: 'Garis regresi dengan metode kuadrat terkecil selalu melalui titik …',
      options: [
        { t: '(x̄, ȳ), titik rata-rata', ok: true },
        { t: '(0, 0)', why: 'Tidak harus. a bisa bernilai berapa saja.' },
        { t: 'titik data pertama', why: 'Garis regresi tidak harus melewati titik data mana pun.' },
        { t: 'titik dengan y terbesar', why: 'Garis regresi mewakili semua titik, bukan satu titik.' },
      ],
      steps: ['a = ȳ − b·x̄ → ȳ = a + b·x̄.', 'Jadi (x̄, ȳ) ada di garis.'],
    },
  ],
};

// ---------- 3.3 Koefisien korelasi ----------
const CR = { x: 0, y: 0, w: 110, h: 90, xmin: 0, xmax: 10, ymin: 0, ymax: 10 };
const mini = (p, ox, oy, data, c) => {
  const P = plane(p, { ...CR, x: ox, y: oy, labels: false, xl: '', yl: '' });
  return [...P.els.filter((e) => !e.id.endsWith('xl') && !e.id.endsWith('yl')), ...data.map(([a, b], i) => dot(`${p}d${i}`, ...P.at(a, b), c, { r: 4 }))];
};
const STRONG = [[1, 1.5], [2, 2.2], [3, 3.4], [4, 3.9], [5, 5.2], [6, 6.1], [7, 6.8], [8, 8.2], [9, 8.8]];
const WEAK = [[1, 3], [2, 1.5], [3, 5], [4, 2.5], [5, 6], [6, 3.5], [7, 7.5], [8, 4.5], [9, 6.5]];
const NEGS = [[1, 8.8], [2, 8.1], [3, 7], [4, 6.2], [5, 5.1], [6, 3.8], [7, 3.1], [8, 2.2], [9, 1.2]];

const l3 = {
  id: 'k11b3-3',
  title: 'Koefisien Korelasi',
  hook: 'Koefisien korelasi r adalah satu angka antara −1 dan 1 yang menyatakan seberapa kuat dan ke arah mana hubungan dua variabel.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Mana yang hubungannya paling kuat?',
          add: [...mini('a', 20, 40, STRONG, 'pos'), ...mini('b', 145, 40, WEAK, 'acc'), ...mini('c', 270, 40, NONE, 'mut'), T('la', 'A', 75, 150, { size: 18 }), T('lb', 'B', 200, 150, { size: 18 }), T('lc', 'C', 325, 150, { size: 18 })],
          ask: {
            options: [
              { t: 'A', ok: true, why: 'Titik-titik A hampir membentuk garis lurus.' },
              { t: 'B', why: 'B naik, tetapi titiknya jauh dari garis lurus.' },
              { t: 'C', why: 'C tidak menunjukkan pola.' },
              { t: 'sama kuat', why: 'Kerapatan titik di sekitar garis berbeda-beda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Arti nilai r',
      steps: [
        {
          say: 'Hubungan yang titiknya rapat di sekitar garis naik punya r dekat 1. A kira-kira 0,99. B kira-kira 0,6. C mendekati 0.',
          add: [T('ra', 'r ≈ 0,99', 75, 175, { size: 16, c: 'pos' }), T('rb', 'r ≈ 0,6', 200, 175, { size: 16, c: 'acc' }), T('rc', 'r ≈ 0', 325, 175, { size: 16, c: 'mut' })],
        },
        {
          say: 'Kalau titiknya rapat di sekitar garis turun, r dekat minus 1. Tanda menunjukkan arah, besar angka menunjukkan kekuatan.',
          clear: true,
          add: [...mini('d', 145, 30, NEGS, 'neg'), T('rd', 'r ≈ −0,99', 200, 140, { size: 16, c: 'neg' }), T('s', '−1  ←  lemah ≈ 0  →  +1', 200, 200, { size: 20 }), T('s2', 'negatif kuat · tidak ada · positif kuat', 200, 235, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Menghitung r',
      steps: [
        {
          say: 'Kembali ke data jam belajar dan skor. Selain jumlah x, y, xy, dan x kuadrat, kita butuh jumlah y kuadrat: 135.',
          clear: true,
          add: [T('s1', 'n = 5,  Σx = 15,  Σy = 25', 200, 40, { size: 18 }), T('s2', 'Σxy = 83,  Σx² = 55,  Σy² = 135', 200, 70, { size: 18 })],
        },
        {
          say: 'Rumus r: n kali jumlah xy dikurangi jumlah x kali jumlah y, dibagi akar dari dua bagian. Bagian atas sama seperti saat menghitung b, yaitu 40.',
          add: [T('f', 'r = (nΣxy − ΣxΣy) ÷ √(P × Q)', 200, 105, { size: 18, c: 'pos' }), T('f2', 'P = nΣx² − (Σx)²,  Q = nΣy² − (Σy)²', 200, 132, { size: 14, c: 'pos' }), T('a', 'atas: 5·83 − 15·25 = 40', 200, 165, { size: 17 })],
        },
        {
          say: 'Bawah: n kali jumlah x kuadrat dikurangi jumlah x dikuadratkan sama dengan 50. n kali jumlah y kuadrat dikurangi jumlah y dikuadratkan juga 50. Akar dari 50 kali 50 sama dengan 50.',
          add: [T('b', 'P = 275 − 225 = 50,  Q = 675 − 625 = 50,  √(50 × 50) = 50', 200, 198, { size: 14 })],
        },
        {
          say: 'r sama dengan 40 dibagi 50, yaitu 0,8. Korelasi positif yang kuat.',
          add: [T('r', 'r = 40 ÷ 50 = {g:0,8}', 200, 240, { size: 26 })],
        },
      ],
    },
    {
      title: 'Koefisien determinasi',
      steps: [
        {
          say: 'Kuadrat dari r disebut koefisien determinasi. 0,8 kuadrat sama dengan 0,64. Artinya kira-kira 64 persen perbedaan skor bisa dijelaskan oleh perbedaan jam belajar. Sisanya karena hal lain.',
          clear: true,
          add: [T('a', 'r² = 0,8² = 0,64', 200, 80, { size: 30 }), T('b', '≈ 64% dijelaskan oleh jam belajar', 200, 130, { size: 20, c: 'ok' })],
        },
        {
          say: 'Satu hal penting: korelasi bukan berarti sebab-akibat. Penjualan es krim dan kasus tenggelam sama-sama naik di musim panas, tetapi es krim tidak menyebabkan orang tenggelam.',
          add: [tag('w', 'korelasi ≠ sebab-akibat', 200, 200, 'neg', 18), T('c', 'es krim ↑ dan kasus tenggelam ↑ karena musim panas', 200, 240, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Koefisien korelasi antara jarak rumah ke sekolah dan waktu tidur siswa adalah minus 0,2. Apa artinya?',
          clear: true,
          add: [T('q', 'r = −0,2', 200, 110, { size: 40 })],
          ask: {
            options: [
              { t: 'korelasi negatif yang lemah', ok: true, why: 'Tanda negatif menunjukkan arah, dan 0,2 dekat dengan 0, jadi lemah.' },
              { t: 'korelasi negatif yang kuat', why: 'Kuat kalau mendekati −1. 0,2 masih dekat 0.' },
              { t: 'korelasi positif yang lemah', why: 'Tandanya negatif.' },
              { t: 'rumah jauh menyebabkan kurang tidur', why: 'Korelasi tidak membuktikan sebab-akibat, apalagi korelasinya lemah.' },
            ],
          },
        },
        {
          say: 'Negatif berarti satu naik yang lain cenderung turun. Tetapi 0,2 dekat dengan nol, jadi hubungannya lemah.',
          add: [T('a', 'arah: negatif · kekuatan: lemah', 200, 190, { size: 22, c: 'ok' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Koefisien korelasi r = −0,9 menunjukkan …',
      options: [
        { t: 'korelasi negatif yang kuat', ok: true },
        { t: 'korelasi positif yang kuat', why: 'Tandanya negatif.' },
        { t: 'korelasi negatif yang lemah', why: '0,9 dekat dengan 1, jadi kuat.' },
        { t: 'tidak ada korelasi', why: 'Tidak ada korelasi jika r mendekati 0.' },
      ],
      steps: ['Tanda negatif → arah turun.', '|r| = 0,9 dekat 1 → kuat.'],
    },
    {
      type: 'num',
      q: 'Koefisien korelasi r = 0,6. Koefisien determinasinya dalam persen adalah … %',
      ans: ['36'],
      wrong: { '60': 'Koefisien determinasi = r², bukan r.', '6': '0,6² = 0,36 = 36%.' },
      steps: ['r² = 0,6² = 0,36.', '= 36%.'],
    },
    {
      q: 'Manakah nilai r yang menunjukkan hubungan paling kuat?',
      options: [
        { t: '−0,95', ok: true },
        { t: '0,7', why: 'Kekuatan dilihat dari besar angka tanpa tanda: 0,95 > 0,7.' },
        { t: '0,1', why: '0,1 sangat lemah.' },
        { t: '−0,5', why: '0,95 lebih dekat ke 1.' },
      ],
      steps: ['Bandingkan |r|.', '|−0,95| = 0,95 paling besar.'],
    },
    {
      type: 'num',
      q: 'Koefisien determinasi suatu data adalah 0,81 dan hubungannya positif. Nilai r adalah …',
      ans: ['0,9'],
      wrong: { '0,81': 'r² = 0,81, jadi r = √0,81.', '-0,9': 'Hubungannya positif, jadi r positif.' },
      steps: ['r = √0,81.', '= 0,9 (positif).'],
    },
    {
      q: 'Penjualan payung dan banyak orang yang memakai sepatu bot berkorelasi positif kuat. Kesimpulan yang tepat adalah …',
      options: [
        { t: 'keduanya kemungkinan dipengaruhi hal lain, misalnya hujan', ok: true },
        { t: 'membeli payung menyebabkan orang memakai sepatu bot', why: 'Korelasi tidak membuktikan sebab-akibat.' },
        { t: 'memakai sepatu bot menyebabkan orang membeli payung', why: 'Korelasi tidak membuktikan sebab-akibat.' },
        { t: 'datanya pasti salah', why: 'Datanya wajar. Keduanya naik saat musim hujan.' },
      ],
      steps: ['Korelasi ≠ sebab-akibat.', 'Ada faktor ketiga: musim hujan.'],
    },
  ],
};

export default {
  id: 'k11b3',
  no: 3,
  title: 'Statistika Data Dua Variabel',
  desc: 'Diagram pencar, arah hubungan, garis regresi dengan kuadrat terkecil, koefisien korelasi, dan koefisien determinasi.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Data x: 1, 2, 3 dan y: 2, 4, 6. Kemiringan garis regresinya (b) adalah …',
      ans: ['2'],
      wrong: { '4': 'Setiap x naik 1, y naik 2.', '0,5': 'Terbalik. b = perubahan y ÷ perubahan x.' },
      steps: ['Titiknya tepat segaris: y = 2x.', 'b = 2.'],
    },
    {
      q: 'Koefisien korelasi r = 0 berarti …',
      options: [
        { t: 'tidak ada hubungan linear antara kedua variabel', ok: true },
        { t: 'kedua variabel selalu bernilai nol', why: 'r = 0 tentang hubungan, bukan nilai datanya.' },
        { t: 'hubungannya sangat kuat', why: 'r = 0 berarti tidak ada hubungan linear.' },
        { t: 'garis regresinya melalui (0, 0)', why: 'Itu tidak berhubungan dengan r.' },
      ],
      steps: ['r mendekati 0 → titik tidak membentuk pola garis.'],
    },
    {
      type: 'num',
      q: 'Dengan garis regresi y = 2,6 + 0,8x (x jam belajar, y skor), perkiraan skor siswa yang belajar 2,5 jam adalah … (boleh pakai koma)',
      ans: ['4,6'],
      wrong: { '8,5': 'Itu (2,6 + 0,8) × 2,5. Kalikan 0,8 dengan 2,5 dulu.', '2': 'Jangan lupa + 2,6.' },
      steps: ['0,8 × 2,5 = 2.', '2,6 + 2 = 4,6.'],
    },
  ],
};
