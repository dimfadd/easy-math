// Kelas 8 · Bab 4: Persamaan Garis Lurus
import { T, box, ln, dot, hop, table, textWidth } from '../helpers.js';
import { plane, lineOn } from './plot.js';

// Bidang dengan skala sama di kedua sumbu (30 px per satuan), supaya sudut tampak benar
const CF = { x: 50, y: 30, w: 300, h: 240, xmin: -5, xmax: 5, ymin: -4, ymax: 4 };
const PL = plane('pl', CF);
const at = PL.at;
// Label berlatar kertas, digambar di atas garis supaya tetap terbaca
const tag = (id, text, x, y, c = 'ink', size = 16) => box(id, x, y, textWidth(text, size) + 12, size + 8, { fill: 'paper', stroke: 'none', sw: 0, r: 4, label: text, lsize: size, lc: c, z: 3 });
const ptLabel = (id, txt, x, y, dx = 0, dy = -16, c = 'acc') => T(id, txt, at(x, y)[0] + dx, at(x, y)[1] + dy, { size: 14, c });
const L = (id, m, c, o) => lineOn(id, PL, m, c, CF, o);
// Anak tangga gradien: dari titik (x, y), maju run lalu naik rise
function stair(prefix, x, y, run, rise, o = {}) {
  return [
    ln(`${prefix}r`, ...at(x, y), ...at(x + run, y), { sw: 3, c: 'acc', ...o }),
    ln(`${prefix}u`, ...at(x + run, y), ...at(x + run, y + rise), { sw: 3, c: rise >= 0 ? 'ok' : 'neg', ...o }),
  ];
}

// ---------- 4.1 Bidang koordinat dan grafik garis ----------
const l1 = {
  id: 'k8b4-1',
  title: 'Bidang Koordinat dan Grafik Garis',
  hook: 'Titik (3, −2) artinya: dari titik nol, jalan 3 ke kanan, lalu 2 ke bawah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Di mana letak titik 3 koma minus 2?',
          add: [...PL.els, T('q', '(3, −2) ada di mana?', 305, 15, { size: 16, c: 'mut' })],
          ask: {
            options: [
              { t: '3 ke kanan, 2 ke bawah', ok: true, why: 'Angka pertama (x) untuk kanan-kiri, angka kedua (y) untuk atas-bawah.' },
              { t: '3 ke atas, 2 ke kiri', why: 'Angka pertama selalu x, yaitu arah mendatar.' },
              { t: '2 ke bawah, 3 ke kiri', why: 'x = 3 positif, jadi ke kanan.' },
              { t: '3 ke kanan, 2 ke atas', why: 'y = −2 negatif, jadi ke bawah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membaca titik',
      steps: [
        {
          say: 'Mulai dari titik pusat, yaitu 0 koma 0. Angka pertama adalah x: jalan mendatar. x sama dengan 3, jadi 3 langkah ke kanan.',
          del: ['q'],
          add: [dot('o', ...at(0, 0), 'ink', { r: 5 }), hop('hx', at(0, 0)[0], at(3, 0)[0], at(0, 0)[1], { c: 'pos', label: '3 ke kanan', h: 18 })],
        },
        {
          say: 'Angka kedua adalah y: jalan tegak. y sama dengan minus 2, jadi 2 langkah ke bawah.',
          add: [ln('vy', ...at(3, 0), ...at(3, -2), { sw: 3, c: 'neg', arrow: 'end' }), T('ly', '2 ke bawah', at(3, -1)[0] + 42, at(3, -1)[1], { size: 14, c: 'neg' })],
        },
        {
          say: 'Itulah titik 3 koma minus 2.',
          add: [dot('A', ...at(3, -2), 'acc'), ptLabel('lA', 'A(3, −2)', 3, -2, 0, 18)],
          pulse: ['A'],
        },
      ],
    },
    {
      title: 'Empat kuadran',
      steps: [
        {
          say: 'Sumbu x dan sumbu y membagi bidang menjadi empat bagian yang disebut kuadran.',
          clear: true,
          add: [...PL.els, T('k1', 'I (+, +)', ...at(2.5, 3), { size: 16, c: 'pos' }), T('k2', 'II (−, +)', ...at(-2.5, 3), { size: 16, c: 'acc' }), T('k3', 'III (−, −)', ...at(-2.5, -3), { size: 16, c: 'neg' }), T('k4', 'IV (+, −)', ...at(2.5, -3), { size: 16, c: 'ok' })],
        },
        {
          say: 'Titik A tadi, 3 koma minus 2, ada di kuadran keempat: x positif, y negatif.',
          add: [dot('A', ...at(3, -2), 'acc'), ptLabel('lA', 'A', 3, -2, 12, -10)],
        },
      ],
    },
    {
      title: 'Menggambar garis',
      steps: [
        {
          say: 'Persamaan y sama dengan 2 x dikurangi 1. Buat tabel: pilih beberapa x, hitung y.',
          clear: true,
          add: [table('tb', 200, 50, [['x', '−1', '0', '1', '2'], ['y', '−3', '−1', '1', '3']], { cw: [50, 50, 50, 50, 50], rh: 32, size: 16, head: true }), T('eq', 'y = 2x − 1', 200, 110, { size: 22, c: 'pos' })],
        },
        {
          say: 'Setiap kolom tabel menjadi satu titik.',
          clear: true,
          add: [...PL.els, ...[-1, 0, 1, 2].map((x) => dot(`p${x + 1}`, ...at(x, 2 * x - 1), 'acc')), tag('eq', 'y = 2x − 1', 290, 45, 'pos', 18)],
        },
        {
          say: 'Hubungkan titik-titiknya. Hasilnya garis lurus. Sebenarnya dua titik saja sudah cukup untuk menggambar garis.',
          add: [L('gl', 2, -1, { z: -1 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik mana yang terletak pada garis y sama dengan x tambah 2?',
          clear: true,
          add: [T('q', 'y = x + 2', 200, 110, { size: 34 }), T('q2', 'titik mana yang ada di garis ini?', 200, 170, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: '(1, 3)', ok: true, why: 'x = 1: y = 1 + 2 = 3. Cocok.' },
              { t: '(3, 1)', why: 'x = 3: y = 3 + 2 = 5, bukan 1.' },
              { t: '(2, 2)', why: 'x = 2: y = 4, bukan 2.' },
              { t: '(0, −2)', why: 'x = 0: y = 2, bukan −2.' },
            ],
          },
        },
        {
          say: 'Masukkan x sama dengan 1: y sama dengan 1 tambah 2, yaitu 3. Titik 1 koma 3 ada di garis.',
          clear: true,
          add: [...PL.els, L('gl', 1, 2), dot('B', ...at(1, 3), 'acc'), ptLabel('lB', '(1, 3)', 1, 3, 26, 2), tag('eq', 'y = x + 2', 110, 45, 'pos', 18)],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Titik P(−4, 3) terletak di kuadran …',
      options: [
        { t: 'II', ok: true },
        { t: 'I', why: 'x = −4 negatif, jadi di kiri sumbu y.' },
        { t: 'III', why: 'y = 3 positif, jadi di atas sumbu x.' },
        { t: 'IV', why: 'Kuadran IV: x positif, y negatif.' },
      ],
      steps: ['x negatif (kiri), y positif (atas).', 'Kiri atas = kuadran II.'],
    },
    {
      q: 'Dari titik (0, 0), Rani berjalan 2 satuan ke kiri lalu 5 satuan ke atas. Koordinat Rani sekarang adalah …',
      options: [
        { t: '(−2, 5)', ok: true },
        { t: '(5, −2)', why: 'Koordinat ditulis (x, y): mendatar dulu, baru tegak.' },
        { t: '(2, 5)', why: 'Ke kiri berarti x negatif.' },
        { t: '(−5, 2)', why: 'Mendatar 2 (x = −2), tegak 5 (y = 5).' },
      ],
      steps: ['Kiri 2 → x = −2.', 'Atas 5 → y = 5. Jadi (−2, 5).'],
    },
    {
      type: 'num',
      q: 'Titik (4, k) terletak pada garis y = 3x − 5. Nilai k adalah …',
      ans: ['7'],
      wrong: { '17': '3 × 4 − 5 = 12 − 5 = 7.', '3': 'Ganti x dengan 4: y = 3 × 4 − 5.' },
      steps: ['Ganti x = 4: y = 3 × 4 − 5.', 'k = 12 − 5 = 7.'],
    },
    {
      q: 'Garis y = 2x + 4 memotong sumbu y di titik …',
      options: [
        { t: '(0, 4)', ok: true },
        { t: '(4, 0)', why: 'Di sumbu y, nilai x = 0. y = 2 × 0 + 4 = 4.' },
        { t: '(0, 2)', why: 'Ganti x = 0: y = 4.' },
        { t: '(−2, 0)', why: 'Itu titik potong dengan sumbu x.' },
      ],
      steps: ['Titik potong sumbu y: x = 0.', 'y = 2 × 0 + 4 = 4 → (0, 4).'],
    },
    {
      q: 'Garis y = 2x + 4 memotong sumbu x di titik …',
      options: [
        { t: '(−2, 0)', ok: true },
        { t: '(0, 4)', why: 'Itu titik potong sumbu y.' },
        { t: '(2, 0)', why: 'Ganti y = 0: 2x + 4 = 0, jadi x = −2.' },
        { t: '(4, 0)', why: 'Ganti y = 0: 2x = −4, x = −2.' },
      ],
      steps: ['Titik potong sumbu x: y = 0.', '0 = 2x + 4 → x = −2 → (−2, 0).'],
    },
  ],
};

// ---------- 4.2 Gradien ----------
const ramp = (id, x0, run, rise, fill) => ({ id, t: 'poly', x: 0, y: 0, pts: [[x0, 220], [x0 + run * 22, 220], [x0 + run * 22, 220 - rise * 22]], fill, stroke: 'ink', sw: 2 });

const l2 = {
  id: 'k8b4-2',
  title: 'Gradien (Kemiringan Garis)',
  hook: 'Gradien mengukur seberapa curam garis: berapa naik untuk setiap satu langkah maju.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua papan seluncur. Papan A naik 2 untuk maju 4. Papan B naik 3 untuk maju 3. Mana yang lebih curam?',
          add: [ramp('A', 40, 4, 2, 'pos-soft'), ramp('B', 230, 3, 3, 'acc-soft'), T('la', 'A: naik 2, maju 4', 85, 245, { size: 15 }), T('lb', 'B: naik 3, maju 3', 265, 245, { size: 15 })],
          ask: {
            options: [
              { t: 'B', ok: true, why: 'B naik 1 setiap maju 1. A hanya naik ½ setiap maju 1.' },
              { t: 'A', why: 'A naik 2 tapi untuk maju 4. Setiap maju 1, A hanya naik ½.' },
              { t: 'Sama curam', why: 'Bandingkan naik untuk setiap maju 1: A ½, B 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Naik dibagi maju',
      steps: [
        {
          say: 'Gradien adalah naik dibagi maju. Papan A: 2 dibagi 4, yaitu setengah. Papan B: 3 dibagi 3, yaitu 1. B lebih curam.',
          add: [T('ga', 'm = 2 ÷ 4 = ½', 85, 275, { size: 17, c: 'pos' }), T('gb', 'm = 3 ÷ 3 = 1', 265, 275, { size: 17, c: 'acc' })],
        },
        {
          say: 'Gradien biasanya ditulis dengan huruf m.',
          add: [box('rb', 200, 40, 300, 50, { fill: 'acc-soft', r: 10 }), T('rule', 'gradien m = naik ÷ maju', 200, 40, { size: 20 })],
        },
      ],
    },
    {
      title: 'Gradien pada garis',
      steps: [
        {
          say: 'Pada bidang koordinat, pilih dua titik di garis. Garis ini melalui 0 koma 0 dan 4 koma 2.',
          clear: true,
          add: [...PL.els, L('gl', 0.5, 0, { draw: false }), dot('p', ...at(0, 0), 'ink'), dot('q', ...at(4, 2), 'ink')],
        },
        {
          say: 'Dari titik pertama, maju 4 ke kanan, lalu naik 2. Gradiennya 2 dibagi 4, yaitu setengah.',
          add: [...stair('s', 0, 0, 4, 2), T('lr', 'maju 4', at(2, 0)[0] + 10, at(2, 0)[1] - 12, { size: 14, c: 'acc' }), T('lu', 'naik 2', at(4, 1)[0] + 26, at(4, 1)[1], { size: 14, c: 'ok' }), tag('m', 'm = 2/4 = ½', 115, 50, 'ink', 20)],
        },
      ],
    },
    {
      title: 'Positif, negatif, nol',
      steps: [
        {
          say: 'Garis yang naik dari kiri ke kanan gradiennya positif.',
          clear: true,
          add: [...PL.els, L('g1', 1, 0, { c: 'ok' }), tag('t1', 'naik → m positif', 290, 45, 'ok')],
        },
        {
          say: 'Garis yang turun dari kiri ke kanan gradiennya negatif. Garis ini turun 1 setiap maju 1, jadi gradiennya minus 1.',
          add: [L('g2', -1, 1, { c: 'neg' }), tag('t2', 'turun → m negatif', 110, 45, 'neg'), ...stair('s', 1, 0, 1, -1)],
        },
        {
          say: 'Garis mendatar tidak naik sama sekali, jadi gradiennya nol.',
          add: [L('g3', 0, -2.5, { c: 'acc' }), tag('t3', 'datar → m = 0', 110, at(0, -3.2)[1], 'acc')],
        },
      ],
    },
    {
      title: 'Rumus dua titik',
      steps: [
        {
          say: 'Kalau diketahui dua titik, gradiennya selisih y dibagi selisih x.',
          clear: true,
          add: [box('rb', 200, 55, 260, 56, { fill: 'acc-soft', r: 10 }), T('f', 'm = (y₂ − y₁) ÷ (x₂ − x₁)', 200, 55, { size: 19 })],
        },
        {
          say: 'Contoh: titik 1 koma 2 dan 4 koma 8. Selisih y: 8 dikurangi 2 sama dengan 6. Selisih x: 4 dikurangi 1 sama dengan 3.',
          add: [T('a', '(1, 2) dan (4, 8)', 200, 120, { size: 22 }), T('b', 'selisih y = 8 − 2 = 6,   selisih x = 4 − 1 = 3', 200, 160, { size: 17 })],
        },
        {
          say: 'Gradiennya 6 dibagi 3, yaitu 2.',
          add: [T('c', 'm = 6 ÷ 3 = {a:2}', 200, 210, { size: 28 })],
        },
        {
          say: 'Kalau persamaannya sudah berbentuk y sama dengan m x tambah c, gradiennya langsung terlihat: angka di depan x.',
          add: [T('d', 'y = {a:3}x + 5 → m = 3', 200, 262, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa gradien garis yang melalui 2 koma 1 dan 6 koma 9?',
          clear: true,
          add: [T('q', '(2, 1) dan (6, 9)', 200, 110, { size: 32 }), T('q2', 'm = ?', 200, 170, { size: 26, c: 'mut' })],
          ask: {
            options: [
              { t: '2', ok: true, why: '(9 − 1) ÷ (6 − 2) = 8 ÷ 4 = 2.' },
              { t: '½', why: 'Itu selisih x dibagi selisih y. Yang benar: selisih y dibagi selisih x.' },
              { t: '8', why: '8 adalah selisih y saja. Bagi dengan selisih x.' },
              { t: '−2', why: 'Kedua selisih positif, jadi gradiennya positif.' },
            ],
          },
        },
        {
          say: 'Selisih y: 9 dikurangi 1 sama dengan 8. Selisih x: 6 dikurangi 2 sama dengan 4. 8 dibagi 4 sama dengan 2.',
          clear: true,
          add: [T('a', 'm = (9 − 1) ÷ (6 − 2)', 200, 90, { size: 28 }), T('b', '= 8 ÷ 4 = {a:2}', 200, 150, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Gradien garis yang melalui titik (1, 3) dan (3, 11) adalah …',
      options: [
        { t: '4', ok: true },
        { t: '¼', why: 'Selisih y dibagi selisih x, bukan sebaliknya.' },
        { t: '8', why: '8 adalah selisih y. Bagi dengan selisih x (2).' },
        { t: '7', why: '(11 − 3) ÷ (3 − 1) = 8 ÷ 2 = 4.' },
      ],
      steps: ['m = (11 − 3) ÷ (3 − 1).', '= 8 ÷ 2 = 4.'],
    },
    {
      q: 'Gradien garis y = −3x + 7 adalah …',
      options: [
        { t: '−3', ok: true },
        { t: '7', why: '7 adalah titik potong sumbu y.' },
        { t: '3', why: 'Perhatikan tandanya: −3.' },
        { t: '−3x', why: 'Gradien adalah bilangan di depan x, tanpa x.' },
      ],
      steps: ['Bentuk y = mx + c.', 'm = −3.'],
    },
    {
      type: 'num',
      q: 'Gradien garis yang melalui (−2, 5) dan (2, −3) adalah …',
      ans: ['-2'],
      wrong: { '2': 'Garisnya turun: y berkurang dari 5 ke −3. Gradiennya negatif.', '-0.5': 'Selisih y dibagi selisih x: −8 ÷ 4.' },
      steps: ['Selisih y: −3 − 5 = −8.', 'Selisih x: 2 − (−2) = 4.', 'm = −8 ÷ 4 = −2.'],
    },
    {
      q: 'Gradien garis 2y = 6x − 4 adalah …',
      options: [
        { t: '3', ok: true },
        { t: '6', why: 'Ubah dulu ke bentuk y = …: bagi semua dengan 2.' },
        { t: '−2', why: '−2 adalah titik potong sumbu y setelah dibagi 2.' },
        { t: '2', why: 'Bagi semua suku dengan 2: y = 3x − 2.' },
      ],
      steps: ['Bagi kedua ruas dengan 2: y = 3x − 2.', 'm = 3.'],
    },
    {
      q: 'Sebuah jalan naik 15 m untuk setiap 100 m mendatar. Gradien jalan tersebut adalah …',
      options: [
        { t: '0,15', ok: true },
        { t: '6,67', why: 'Itu 100 ÷ 15. Gradien = naik ÷ maju.' },
        { t: '15', why: 'Bagi dengan jarak mendatar 100 m.' },
        { t: '85', why: 'Gradien adalah pembagian, bukan pengurangan.' },
      ],
      steps: ['m = naik ÷ maju.', '15 ÷ 100 = 0,15.'],
    },
  ],
};

// ---------- 4.3 Persamaan garis ----------
const l3 = {
  id: 'k8b4-3',
  title: 'Menyusun Persamaan Garis',
  hook: 'Pada y = mx + c, m membuat garis miring dan c menggeser garis naik-turun.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah garis memotong sumbu y di 0 koma 1 dan gradiennya 2. Apa persamaannya?',
          add: [...PL.els, dot('c0', ...at(0, 1), 'acc'), ptLabel('lc', '(0, 1)', 0, 1, 32, 4)],
          ask: {
            options: [
              { t: 'y = 2x + 1', ok: true, why: 'm = 2 di depan x, dan c = 1 adalah titik potong sumbu y.' },
              { t: 'y = x + 2', why: 'Gradien (2) adalah angka di depan x.' },
              { t: 'y = 2x', why: 'Garis y = 2x melalui (0, 0), bukan (0, 1).' },
              { t: 'y = 1x + 2', why: 'Tertukar: gradien di depan x, titik potong sumbu y di belakang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Peran m dan c',
      steps: [
        {
          say: 'Bentuk umum: y sama dengan m x tambah c. Ini garis y sama dengan 2 x tambah 1. Memotong sumbu y di 1.',
          add: [L('gl', 2, 1), tag('eq', 'y = 2x + 1', 110, 45, 'pos', 18)],
        },
        {
          say: 'Ubah c menjadi minus 2. Garisnya bergeser turun, kemiringannya tetap. c adalah titik potong sumbu y.',
          set: { gl: L('gl', 2, -2), c0: { y: at(0, -2)[1] }, lc: { text: '(0, −2)', y: at(0, -2)[1] + 4 }, eq: tag('eq', 'y = 2x − 2', 110, 45, 'pos', 18) },
        },
        {
          say: 'Sekarang ubah m. Dengan m sama dengan setengah, garisnya lebih landai.',
          set: { gl: L('gl', 0.5, -2), eq: tag('eq', 'y = ½x − 2', 110, 45, 'pos', 18) },
        },
        {
          say: 'Dengan m sama dengan minus 1, garisnya turun. Jadi m mengatur kemiringan, c mengatur posisi naik-turun.',
          set: { gl: L('gl', -1, -2), eq: tag('eq', 'y = −x − 2', 110, 45, 'pos', 18) },
        },
      ],
    },
    {
      title: 'Dari gradien dan satu titik',
      steps: [
        {
          say: 'Gradien 3, melalui titik 2 koma 5. Gunakan rumus: y dikurangi y satu sama dengan m kali x dikurangi x satu.',
          clear: true,
          add: [box('rb', 200, 45, 300, 50, { fill: 'acc-soft', r: 10 }), T('f', 'y − y₁ = m(x − x₁)', 200, 45, { size: 22 })],
        },
        {
          say: 'Masukkan: y dikurangi 5 sama dengan 3 kali x dikurangi 2.',
          add: [T('a', 'y − 5 = 3(x − 2)', 200, 110, { size: 26 })],
        },
        {
          say: 'Kalikan masuk: y dikurangi 5 sama dengan 3 x dikurangi 6. Pindahkan 5: y sama dengan 3 x dikurangi 1.',
          add: [T('b', 'y − 5 = 3x − 6', 200, 160, { size: 24 }), T('c', 'y = {a:3x − 1}', 200, 215, { size: 30 })],
        },
        {
          say: 'Cek: x sama dengan 2, y sama dengan 6 dikurangi 1, yaitu 5. Cocok.',
          add: [T('d', 'cek: 3 × 2 − 1 = 5 ✓', 200, 262, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Dari dua titik',
      steps: [
        {
          say: 'Garis melalui 1 koma 3 dan 3 koma 7. Langkah pertama: cari gradiennya. 7 dikurangi 3, dibagi 3 dikurangi 1, sama dengan 2.',
          clear: true,
          add: [T('a', '(1, 3) dan (3, 7)', 200, 45, { size: 24 }), T('b', 'm = (7 − 3) ÷ (3 − 1) = 2', 200, 95, { size: 22 })],
        },
        {
          say: 'Langkah kedua: pakai salah satu titik, misalnya 1 koma 3. y dikurangi 3 sama dengan 2 kali x dikurangi 1.',
          add: [T('c', 'y − 3 = 2(x − 1)', 200, 150, { size: 24 })],
        },
        {
          say: 'y dikurangi 3 sama dengan 2 x dikurangi 2. Jadi y sama dengan 2 x tambah 1.',
          add: [T('d', 'y = {a:2x + 1}', 200, 210, { size: 30 })],
        },
      ],
    },
    {
      title: 'Sejajar dan tegak lurus',
      steps: [
        {
          say: 'Dua garis yang gradiennya sama akan sejajar, tidak pernah berpotongan. Contohnya y sama dengan x tambah 2 dan y sama dengan x dikurangi 2.',
          clear: true,
          add: [...PL.els, L('a', 1, 2, { c: 'pos' }), L('b', 1, -2, { c: 'pos' }), tag('ta', 'm₁ = m₂ → sejajar', 110, 45, 'pos')],
        },
        {
          say: 'Dua garis tegak lurus jika hasil kali gradiennya minus 1. Garis y sama dengan 2 x dan y sama dengan minus setengah x saling tegak lurus, karena 2 kali minus setengah sama dengan minus 1.',
          clear: true,
          add: [...PL.els, L('c', 2, 0, { c: 'acc' }), L('d', -0.5, 0, { c: 'neg' }), tag('tb', 'm₁ × m₂ = −1 → tegak lurus', 125, 45, 'ink', 15), tag('tc', '2 × (−½) = −1', 290, 250, 'mut', 15)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Garis yang sejajar dengan y sama dengan 3 x tambah 5 dan melalui 0 koma minus 2 adalah …',
          clear: true,
          add: [T('q', 'sejajar y = 3x + 5', 200, 100, { size: 26 }), T('q2', 'melalui (0, −2)', 200, 150, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: 'y = 3x − 2', ok: true, why: 'Sejajar → gradien sama (3). Melalui (0, −2) → c = −2.' },
              { t: 'y = −2x + 5', why: 'Sejajar berarti gradiennya sama dengan 3.' },
              { t: 'y = −⅓x − 2', why: 'Gradien −⅓ untuk garis tegak lurus, bukan sejajar.' },
              { t: 'y = 3x + 5', why: 'Garis ini tidak melalui (0, −2).' },
            ],
          },
        },
        {
          say: 'Sejajar artinya gradiennya sama, yaitu 3. Titik 0 koma minus 2 ada di sumbu y, jadi c sama dengan minus 2.',
          clear: true,
          add: [...PL.els, L('a', 3, 5, { c: 'mut', draw: false }), L('b', 3, -2, { c: 'acc' }), dot('p', ...at(0, -2), 'acc'), tag('t', 'y = 3x − 2', 290, 45, 'acc', 18)],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Persamaan garis dengan gradien −2 dan memotong sumbu y di (0, 5) adalah …',
      options: [
        { t: 'y = −2x + 5', ok: true },
        { t: 'y = 5x − 2', why: 'Gradien di depan x, titik potong di belakang.' },
        { t: 'y = 2x + 5', why: 'Gradiennya −2, perhatikan tanda.' },
        { t: 'y = −2x − 5', why: 'Titik potongnya (0, 5), jadi c = 5.' },
      ],
      steps: ['y = mx + c dengan m = −2, c = 5.', 'y = −2x + 5.'],
    },
    {
      q: 'Persamaan garis yang melalui (2, 3) dengan gradien 4 adalah …',
      options: [
        { t: 'y = 4x − 5', ok: true },
        { t: 'y = 4x + 3', why: 'Cek x = 2: 8 + 3 = 11, bukan 3.' },
        { t: 'y = 4x − 11', why: 'y − 3 = 4x − 8, jadi y = 4x − 5.' },
        { t: 'y = 2x + 4', why: 'Gradiennya 4.' },
      ],
      steps: ['y − 3 = 4(x − 2).', 'y − 3 = 4x − 8 → y = 4x − 5.'],
    },
    {
      q: 'Persamaan garis yang melalui (0, 1) dan (2, 7) adalah …',
      options: [
        { t: 'y = 3x + 1', ok: true },
        { t: 'y = 6x + 1', why: 'm = (7 − 1) ÷ (2 − 0) = 3.' },
        { t: 'y = x + 3', why: 'Gradien 3, c = 1. Jangan tertukar.' },
        { t: 'y = 3x + 7', why: 'Garis melalui (0, 1), jadi c = 1.' },
      ],
      steps: ['m = (7 − 1) ÷ (2 − 0) = 3.', '(0, 1) → c = 1. y = 3x + 1.'],
    },
    {
      q: 'Garis yang tegak lurus dengan y = 2x + 3 memiliki gradien …',
      options: [
        { t: '−½', ok: true },
        { t: '2', why: 'Gradien sama berarti sejajar.' },
        { t: '−2', why: '2 × (−2) = −4, bukan −1.' },
        { t: '½', why: '2 × ½ = 1, bukan −1. Tanda harus berlawanan.' },
      ],
      steps: ['Tegak lurus: m₁ × m₂ = −1.', '2 × m₂ = −1 → m₂ = −½.'],
    },
    {
      q: 'Manakah pasangan garis yang sejajar?',
      options: [
        { t: 'y = 3x + 1 dan y = 3x − 4', ok: true },
        { t: 'y = 3x + 1 dan y = −3x + 1', why: 'Gradiennya 3 dan −3, berbeda.' },
        { t: 'y = 2x + 5 dan y = 5x + 2', why: 'Gradiennya 2 dan 5.' },
        { t: 'y = x dan y = −x', why: 'Gradiennya 1 dan −1. Keduanya tegak lurus, bukan sejajar.' },
      ],
      steps: ['Sejajar: gradien sama.', 'y = 3x + 1 dan y = 3x − 4 sama-sama bergradien 3.'],
    },
  ],
};

export default {
  id: 'k8b4',
  no: 4,
  title: 'Persamaan Garis Lurus',
  desc: 'Bidang koordinat, menggambar garis, gradien, menyusun persamaan garis, serta garis sejajar dan tegak lurus.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Persamaan garis yang melalui (1, −1) dan tegak lurus dengan y = −⅓x + 2 adalah …',
      options: [
        { t: 'y = 3x − 4', ok: true },
        { t: 'y = −⅓x − ⅔', why: 'Itu garis sejajar. Tegak lurus: gradiennya 3.' },
        { t: 'y = 3x + 2', why: 'Cek titik (1, −1): 3 + 2 = 5, bukan −1.' },
        { t: 'y = −3x + 2', why: '−⅓ × (−3) = 1, bukan −1.' },
      ],
      steps: ['Tegak lurus: m = 3 (karena −⅓ × 3 = −1).', 'y + 1 = 3(x − 1) → y = 3x − 4.'],
    },
    {
      type: 'num',
      q: 'Garis melalui titik (2, 5) dan (k, 11) memiliki gradien 3. Nilai k adalah …',
      ans: ['4'],
      wrong: { '6': '(11 − 5) ÷ (k − 2) = 3 → k − 2 = 2.', '2': 'k − 2 = 2, jadi k = 4.' },
      steps: ['(11 − 5) ÷ (k − 2) = 3.', '6 = 3(k − 2) → k − 2 = 2 → k = 4.'],
    },
    {
      q: 'Biaya sewa sepeda: Rp10.000 di awal, ditambah Rp5.000 per jam. Jika y = biaya dan x = lama sewa (jam), persamaan garisnya adalah …',
      options: [
        { t: 'y = 5.000x + 10.000', ok: true },
        { t: 'y = 10.000x + 5.000', why: 'Yang bertambah setiap jam adalah Rp5.000, jadi itu gradiennya.' },
        { t: 'y = 15.000x', why: 'Biaya awal hanya dibayar sekali, tidak dikali jam.' },
        { t: 'y = 5.000x', why: 'Biaya awal Rp10.000 belum ditambahkan.' },
      ],
      steps: ['Bertambah tiap jam (gradien) = 5.000.', 'Nilai awal (c) = 10.000.', 'y = 5.000x + 10.000.'],
    },
  ],
};
