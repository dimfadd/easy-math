// Kelas 12 Tingkat Lanjut · Bab 3: Turunan
import { T, ln, dot, table } from '../helpers.js';
import { lineOn } from '../k8/plot.js';
import { tag } from '../k10/kit.js';
import { mk, fpath } from '../k12/kit.js';

const RX = 335;
const R = (id, text, y, c = 'ink', size = 14) => T(id, text, RX, y, { size, c });
const B = mk(5);
const pt = (id, a, b, c = 'neg') => dot(id, B.P.X(a), B.P.Y(b), c, { r: 6, z: 3 });
const at = (a, b) => ({ x: B.P.X(a), y: B.P.Y(b) });
// Ruas garis singgung pendek di x0, panjang total 2L satuan
const tseg = (id, f, df, x0, L = 2.2, c = 'acc') => {
  const m = df(x0);
  const k = L / Math.hypot(1, m);
  return ln(id, B.P.X(x0 - k), B.P.Y(f(x0) - m * k), B.P.X(x0 + k), B.P.Y(f(x0) + m * k), { sw: 3, c, draw: false, z: 2 });
};

// ---------- 3.1 Gradien garis singgung ----------
const sq = (x) => x * x;
const sec = (h) => lineOn('sc', B.P, 2 + h, 1 - (2 + h), B.C, { c: 'acc', sw: 2.5, z: 1 });

const l1 = {
  id: 'k12lb3-1',
  title: 'Gradien Garis Singgung',
  hook: 'Kemiringan kurva di satu titik adalah gradien garis singgungnya. Kita dapatkan dengan mendekatkan garis sekan sampai jaraknya mendekati nol.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Garis kuning menyinggung parabola y sama dengan x kuadrat di titik 1 koma 1. Berapa gradien garis kuning itu?',
          add: [...B.P.els, fpath('cv', B, sq, -2.2, 2.2, { z: -1 }), lineOn('tg', B.P, 2, -1, B.C, { c: 'acc', sw: 2.5 }), pt('p', 1, 1), tag('e', 'y = x²', RX, 50, 'pos', 16), R('q', 'gradien singgung', 90, 'acc'), R('q2', 'di (1, 1) = ?', 112, 'acc')],
          ask: {
            options: [
              { t: '2', ok: true, why: 'Garis itu naik 2 untuk setiap 1 langkah ke kanan. Nanti kita buktikan dengan limit.' },
              { t: '1', why: '1 adalah nilai y di titik itu, bukan kemiringannya.' },
              { t: '0', why: 'Gradien 0 berarti mendatar. Di (1, 1) parabola sedang naik.' },
              { t: '3', why: '3 adalah gradien garis yang menghubungkan (1, 1) dan (2, 4), belum garis singgung.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Garis sekan mendekat',
      steps: [
        {
          say: 'Garis singgung hanya menyentuh satu titik, jadi gradiennya tidak bisa dihitung dari dua titik. Akali dengan titik kedua Q. Q di x sama dengan 3: garis yang melewati P dan Q bergradien 9 dikurangi 1, dibagi 2, yaitu 4.',
          clear: true,
          add: [...B.P.els, fpath('cv', B, sq, -2.2, 2.2, { z: -1 }), pt('p', 1, 1), pt('q', 2.2, 4.84, 'acc'), sec(1.2), R('a', 'Q makin dekat ke P', 50, 'mut', 13), table('tb', RX, 130, [['Q di x', 'gradien'], ['2,2', '3,2'], ['1,5', '2,5'], ['1,1', '2,1'], ['1,01', '2,01']], { cw: [60, 60], rh: 26, size: 13, head: true })],
        },
        {
          say: 'Geser Q ke x sama dengan 1,5. Gradien garisnya menjadi 2,5.',
          set: { q: at(1.5, 2.25), sc: sec(0.5) },
        },
        {
          say: 'Q di 1,1: gradien 2,1. Q di 1,01: gradien 2,01. Makin dekat Q ke P, garisnya makin mirip garis singgung, dan gradiennya mendekati 2.',
          set: { q: at(1.1, 1.21), sc: sec(0.1) },
          add: [tag('k', 'gradien → 2', RX, 230, 'ok', 15)],
        },
      ],
    },
    {
      title: 'Definisi turunan',
      steps: [
        {
          say: 'Tulis jarak P ke Q sebagai h. Gradien garis PQ adalah f x tambah h dikurangi f x, dibagi h. Gradien garis singgung adalah limitnya saat h mendekati 0. Inilah turunan, ditulis f aksen x.',
          clear: true,
          add: [T('a', "f'(x) = lim (h → 0)  [f(x + h) − f(x)] ÷ h", 200, 50, { size: 18, c: 'pos' })],
        },
        {
          say: 'Untuk f x sama dengan x kuadrat: x tambah h, kuadrat, sama dengan x kuadrat tambah 2xh tambah h kuadrat. Kurangi x kuadrat, sisa 2xh tambah h kuadrat.',
          add: [T('b', '(x + h)² − x² = 2xh + h²', 200, 105, { size: 20 })],
        },
        {
          say: 'Bagi dengan h: 2x tambah h. Saat h mendekati 0, hasilnya 2x.',
          add: [T('c', '(2xh + h²) ÷ h = 2x + h → 2x', 200, 150, { size: 20 }), tag('d', "f(x) = x²  →  f'(x) = 2x", 200, 205, 'ok', 20)],
        },
        {
          say: 'Di x sama dengan 1, f aksen 1 sama dengan 2. Cocok dengan tebakan tadi.',
          add: [T('e', "f'(1) = 2 × 1 = 2", 200, 255, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Arti turunan',
      steps: [
        {
          say: 'Turunan adalah laju perubahan. Kalau posisi benda s sama dengan t kuadrat meter setelah t detik, turunannya 2t adalah kecepatannya.',
          clear: true,
          add: [T('a', 's(t) = t²  (posisi, meter)', 200, 70, { size: 20, c: 'pos' }), T('b', "s'(t) = 2t  (kecepatan, m/detik)", 200, 110, { size: 20, c: 'acc' })],
        },
        {
          say: 'Pada detik ke-3, kecepatannya 2 kali 3, yaitu 6 meter per detik.',
          add: [T('c', "t = 3 → s'(3) = 6 m/detik", 200, 170, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa gradien garis singgung parabola y sama dengan x kuadrat di titik x sama dengan 3?',
          clear: true,
          add: [T('q', "y = x²,  f'(x) = 2x", 200, 100, { size: 28, c: 'pos' }), T('q2', 'gradien singgung di x = 3 = ?', 200, 160, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: '6', ok: true, why: "f'(3) = 2 × 3 = 6." },
              { t: '9', why: '9 adalah nilai y di x = 3. Gradien memakai turunan.' },
              { t: '3', why: 'Turunannya 2x, jadi dikali 2.' },
              { t: '5', why: 'f\'(x) = 2x, bukan x + 2.' },
            ],
          },
        },
        {
          say: 'Masukkan x sama dengan 3 ke turunan: 2 kali 3 sama dengan 6.',
          add: [T('a', "f'(3) = 2 × 3 = {g:6}", 200, 230, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: "Jika f(x) = x², nilai f'(4) adalah …",
      ans: ['8'],
      wrong: { '16': 'Itu f(4). Turunannya 2x.', '4': "f'(x) = 2x → 2 × 4 = 8." },
      steps: ["f'(x) = 2x.", "f'(4) = 8."],
    },
    {
      q: "Nilai f'(a) menyatakan …",
      options: [
        { t: 'gradien garis singgung kurva di x = a', ok: true },
        { t: 'nilai fungsi di x = a', why: 'Itu f(a).' },
        { t: 'luas di bawah kurva sampai x = a', why: 'Luas dihitung dengan integral.' },
        { t: 'titik potong kurva dengan sumbu y', why: 'Itu f(0).' },
      ],
      steps: ["f'(a) = gradien garis singgung di x = a."],
    },
    {
      type: 'num',
      q: 'Gradien garis yang menghubungkan titik x = 1 dan x = 3 pada parabola y = x² adalah …',
      ans: ['4'],
      wrong: { '8': '(9 − 1) ÷ (3 − 1) = 8 ÷ 2 = 4.', '2': 'Itu gradien singgung di x = 1. Garis ini melewati dua titik.' },
      steps: ['Titik (1, 1) dan (3, 9).', '(9 − 1) ÷ (3 − 1) = 4.'],
    },
    {
      type: 'num',
      q: 'Gradien garis singgung parabola y = x² di titik (−2, 4) adalah …',
      ans: ['-4'],
      wrong: { '4': "f'(−2) = 2 × (−2) = −4. Di kiri puncak, parabola turun.", '-2': 'Turunannya 2x, jadi dikali 2.' },
      steps: ["f'(x) = 2x.", "f'(−2) = −4."],
    },
    {
      type: 'num',
      q: 'Nilai lim(h → 0) [(3 + h)² − 9] ÷ h adalah …',
      ans: ['6'],
      wrong: { '0': '(9 + 6h + h² − 9) ÷ h = 6 + h → 6.', '9': 'Ini turunan x² di x = 3: 2 × 3 = 6.' },
      steps: ['(3 + h)² − 9 = 6h + h².', '(6h + h²) ÷ h = 6 + h → 6.'],
    },
  ],
};

// ---------- 3.2 Aturan turunan ----------
const l2 = {
  id: 'k12lb3-2',
  title: 'Aturan Turunan',
  hook: 'Menurunkan xⁿ cukup dengan menurunkan pangkatnya ke depan lalu mengurangi pangkat dengan 1. Konstanta turunannya 0.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Turunan x kuadrat adalah 2x. Tebak, turunan x pangkat 3 apa?',
          add: [T('a', 'x²  →  2x', 200, 80, { size: 30, c: 'pos' }), T('b', 'x³  →  ?', 200, 140, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '3x²', ok: true, why: 'Pangkat 3 turun menjadi pengali, pangkat baru 3 − 1 = 2.' },
              { t: '3x', why: 'Pangkatnya berkurang 1, dari 3 menjadi 2, bukan menjadi 1.' },
              { t: 'x²', why: 'Pangkat 3 juga turun menjadi pengali 3.' },
              { t: '2x³', why: 'Pola x² → 2x: pengalinya pangkat lama, pangkatnya berkurang 1.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Aturan pangkat',
      steps: [
        {
          say: 'Pangkat turun ke depan sebagai pengali, lalu pangkat dikurangi 1. x pangkat n turunannya n kali x pangkat n dikurangi 1.',
          clear: true,
          add: [tag('f', 'xⁿ  →  n·xⁿ⁻¹', 200, 50, 'pos', 26)],
        },
        {
          say: 'Contohnya: x kuadrat jadi 2x, x pangkat 3 jadi 3x kuadrat, x pangkat 4 jadi 4x pangkat 3. x sendiri, yaitu x pangkat 1, turunannya 1.',
          add: [table('tb', 200, 160, [['f(x)', 'x²', 'x³', 'x⁴', 'x', '5'], ["f'(x)", '2x', '3x²', '4x³', '1', '0']], { cw: [70, 55, 55, 55, 45, 45], rh: 38, size: 18, head: false })],
        },
        {
          say: 'Konstanta, misalnya 5, turunannya 0. Grafik y sama dengan 5 adalah garis mendatar, gradiennya 0.',
          add: [T('k', 'konstanta → 0 (garis mendatar)', 200, 245, { size: 17, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Pengali dan penjumlahan',
      steps: [
        {
          say: 'Pengali konstanta ikut dibawa. 4x pangkat 3 turunannya 4 kali 3x kuadrat, yaitu 12x kuadrat.',
          clear: true,
          add: [T('a', '4x³  →  4 · 3x² = 12x²', 200, 55, { size: 24, c: 'pos' })],
        },
        {
          say: 'Penjumlahan dan pengurangan diturunkan suku demi suku.',
          add: [T('b', 'f(x) = 4x³ − 5x² + 7x − 2', 200, 120, { size: 22 })],
        },
        {
          say: '4x pangkat 3 jadi 12x kuadrat. Minus 5x kuadrat jadi minus 10x. 7x jadi 7. Minus 2 jadi 0.',
          add: [T('c', "f'(x) = 12x² − 10x + 7", 200, 170, { size: 24, c: 'acc' }), T('d', '−2 → 0, jadi hilang', 200, 210, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. f x sama dengan 2x pangkat 3 tambah x kuadrat dikurangi 4x. Berapa f aksen 1?',
          clear: true,
          add: [T('q', 'f(x) = 2x³ + x² − 4x', 200, 90, { size: 28, c: 'pos' }), T('q2', "f'(1) = ?", 200, 150, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '4', ok: true, why: "f'(x) = 6x² + 2x − 4. f'(1) = 6 + 2 − 4 = 4." },
              { t: '−1', why: 'Itu f(1). Turunkan dulu, baru masukkan x = 1.' },
              { t: '8', why: 'Turunan −4x adalah −4, jadi dikurangi 4.' },
              { t: '2', why: "Turunan 2x³ adalah 6x², bukan 2x²." },
            ],
          },
        },
        {
          say: 'Turunannya 6x kuadrat tambah 2x dikurangi 4. Masukkan x sama dengan 1: 6 tambah 2 dikurangi 4, sama dengan 4.',
          add: [T('a', "f'(x) = 6x² + 2x − 4", 200, 210, { size: 22 }), T('b', "f'(1) = 6 + 2 − 4 = {g:4}", 200, 250, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Turunan f(x) = x⁵ adalah …',
      options: [
        { t: '5x⁴', ok: true },
        { t: '5x⁵', why: 'Pangkatnya berkurang 1.' },
        { t: 'x⁴', why: 'Pangkat lama, 5, menjadi pengali.' },
        { t: '4x⁵', why: 'Pengalinya pangkat lama (5), pangkat barunya 4.' },
      ],
      steps: ['xⁿ → n·xⁿ⁻¹.', 'x⁵ → 5x⁴.'],
    },
    {
      type: 'num',
      q: "f(x) = 3x² + 2x. Nilai f'(2) adalah …",
      ans: ['14'],
      wrong: { '16': 'Itu f(2). Turunannya 6x + 2.', '12': 'Turunan 2x adalah 2, jangan lupa ditambah.' },
      steps: ["f'(x) = 6x + 2.", "f'(2) = 12 + 2 = 14."],
    },
    {
      type: 'num',
      q: "f(x) = 7. Nilai f'(3) adalah …",
      ans: ['0'],
      wrong: { '7': 'Turunan konstanta adalah 0.', '21': 'f(x) = 7 tidak memuat x. Turunannya 0.' },
      steps: ['Konstanta → turunan 0.', "f'(3) = 0."],
    },
    {
      type: 'num',
      q: "f(x) = x³ − 6x. Nilai f'(2) adalah …",
      ans: ['6'],
      wrong: { '-4': 'Itu f(2). Turunannya 3x² − 6.', '0': "f'(2) = 3 × 4 − 6 = 6." },
      steps: ["f'(x) = 3x² − 6.", "f'(2) = 12 − 6 = 6."],
    },
    {
      q: 'Turunan f(x) = 4x³ − 5x² + 7x − 2 adalah …',
      options: [
        { t: '12x² − 10x + 7', ok: true },
        { t: '12x² − 10x + 7 − 2', why: 'Turunan konstanta −2 adalah 0.' },
        { t: '4x² − 5x + 7', why: 'Pangkat lama ikut mengalikan koefisien: 4 × 3 = 12, 5 × 2 = 10.' },
        { t: '12x³ − 10x² + 7x', why: 'Pangkat setiap suku berkurang 1.' },
      ],
      steps: ['Suku demi suku: 12x², −10x, 7, 0.', "f'(x) = 12x² − 10x + 7."],
    },
  ],
};

// ---------- 3.3 Aplikasi turunan ----------
const cub = (x) => x ** 3 - 3 * x;
const dcub = (x) => 3 * x * x - 3;

const l3 = {
  id: 'k12lb3-3',
  title: 'Aplikasi Turunan',
  hook: 'Tanda turunan menunjukkan grafik sedang naik atau turun. Di puncak dan lembah, turunannya 0. Ini dipakai untuk mencari nilai terbesar dan terkecil.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Grafik ini punya puncak bukit dan dasar lembah. Berapa gradien garis singgung tepat di puncak bukit?',
          add: [...B.P.els, fpath('cv', B, cub, -2.2, 2.2, { z: -1 }), pt('p', -1, 2), tag('e', 'f(x) = x³ − 3x', RX, 50, 'pos', 14), R('q', 'gradien di', 85, 'acc'), R('q2', 'puncak = ?', 107, 'acc')],
          ask: {
            options: [
              { t: '0', ok: true, why: 'Di puncak, grafik berhenti naik dan mulai turun. Garis singgungnya mendatar.' },
              { t: '2', why: '2 adalah ketinggian puncak, bukan kemiringan.' },
              { t: 'positif', why: 'Sebelum puncak gradiennya positif, tetapi tepat di puncak garis singgungnya mendatar.' },
              { t: 'negatif', why: 'Gradien negatif terjadi setelah puncak, saat grafik turun.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Naik dan turun',
      steps: [
        {
          say: 'Turunannya f aksen x sama dengan 3x kuadrat dikurangi 3. Di x sama dengan minus 2, f aksen bernilai 9, positif. Garis singgungnya miring ke atas: grafik sedang naik.',
          clear: true,
          add: [...B.P.els, fpath('cv', B, cub, -2.2, 2.2, { z: -1 }), tag('e', "f'(x) = 3x² − 3", RX, 50, 'acc', 14), tseg('tg', cub, dcub, -2), pt('p', -2, -2), R('a', "f'(−2) = 9 > 0 → naik", 82, 'ok', 12)],
        },
        {
          say: 'Di x sama dengan minus 1, f aksen sama dengan 0. Garis singgungnya mendatar. Ini puncak bukit.',
          set: { tg: tseg('tg', cub, dcub, -1), p: at(-1, 2) },
          add: [R('b', "f'(−1) = 0 → puncak", 105, 'acc', 12)],
        },
        {
          say: 'Di x sama dengan 0, f aksen sama dengan minus 3, negatif. Grafik sedang turun.',
          set: { tg: tseg('tg', cub, dcub, 0), p: at(0, 0) },
          add: [R('c', "f'(0) = −3 < 0 → turun", 128, 'neg', 12)],
        },
        {
          say: 'Di x sama dengan 1, f aksen kembali 0. Ini dasar lembah. Setelah itu grafik naik lagi.',
          set: { tg: tseg('tg', cub, dcub, 1), p: at(1, -2) },
          add: [R('d', "f'(1) = 0 → lembah", 190, 'acc', 12)],
        },
      ],
    },
    {
      title: 'Titik stasioner',
      steps: [
        {
          say: 'Titik dengan f aksen sama dengan 0 disebut titik stasioner. Selesaikan 3x kuadrat dikurangi 3 sama dengan 0: x kuadrat sama dengan 1, jadi x sama dengan 1 atau minus 1.',
          clear: true,
          add: [T('a', "f'(x) = 3x² − 3 = 0", 200, 50, { size: 24, c: 'pos' }), T('b', 'x² = 1 → x = −1 atau x = 1', 200, 90, { size: 20 })],
        },
        {
          say: 'f minus 1 sama dengan minus 1 tambah 3, yaitu 2. Ini nilai maksimum lokal. f 1 sama dengan 1 dikurangi 3, yaitu minus 2. Ini nilai minimum lokal.',
          add: [T('c', 'f(−1) = 2 → maksimum lokal', 200, 145, { size: 20, c: 'ok' }), T('d', 'f(1) = −2 → minimum lokal', 200, 180, { size: 20, c: 'neg' })],
        },
        {
          say: 'Ringkasnya: f aksen positif berarti naik, negatif berarti turun, dan nol berarti stasioner.',
          add: [T('e', "f' > 0 naik · f' < 0 turun · f' = 0 stasioner", 200, 240, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Mencari nilai terbesar',
      steps: [
        {
          say: 'Kawat sepanjang 20 meter dipakai memagari kebun persegi panjang. Kalau panjangnya x, lebarnya 10 dikurangi x. Luasnya L sama dengan x kali 10 dikurangi x, yaitu 10x dikurangi x kuadrat.',
          clear: true,
          add: [{ id: 'kb', t: 'rect', x: 110, y: 120, w: 150, h: 90, fill: 'ok-soft', stroke: 'ok', sw: 2.5 }, T('lp', 'x', 110, 178, { size: 16 }), T('ll', '10 − x', 218, 120, { size: 16 }), T('a', 'L = x(10 − x)', 300, 70, { size: 20, c: 'pos' }), T('a2', '= 10x − x²', 300, 100, { size: 20, c: 'pos' })],
        },
        {
          say: 'Luas terbesar terjadi saat turunannya 0. L aksen sama dengan 10 dikurangi 2x sama dengan 0, jadi x sama dengan 5.',
          add: [T('b', "L' = 10 − 2x = 0", 300, 150, { size: 18, c: 'acc' }), T('b2', 'x = 5', 300, 180, { size: 20, c: 'acc' })],
        },
        {
          say: 'Panjang 5, lebar 5. Kebunnya persegi, dengan luas terbesar 25 meter persegi.',
          set: { kb: { w: 120, h: 120 }, ll: { text: '5', x: 185, y: 120 }, lp: { text: '5', x: 110, y: 195 } },
          add: [tag('c', 'L maks = 25 m²', 300, 235, 'ok', 18)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. f x sama dengan x kuadrat dikurangi 6x tambah 5. Di x berapa titik stasionernya?',
          clear: true,
          add: [T('q', 'f(x) = x² − 6x + 5', 200, 90, { size: 30, c: 'pos' }), T('q2', "f'(x) = 0 saat x = ?", 200, 150, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '3', ok: true, why: "f'(x) = 2x − 6 = 0 → x = 3." },
              { t: '6', why: '2x − 6 = 0 → x = 3, bukan 6.' },
              { t: '1 dan 5', why: 'Itu akar-akar f(x) = 0, tempat grafik memotong sumbu x.' },
              { t: '−4', why: 'f(3) = −4 adalah nilai minimumnya, bukan letak x.' },
            ],
          },
        },
        {
          say: 'Turunannya 2x dikurangi 6. Sama dengan 0 saat x sama dengan 3. Nilai minimumnya f 3 sama dengan minus 4.',
          add: [T('a', "2x − 6 = 0 → x = {g:3},  f(3) = −4", 200, 225, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Titik stasioner f(x) = x² − 8x terjadi pada x = …',
      ans: ['4'],
      wrong: { '8': "f'(x) = 2x − 8 = 0 → x = 4.", '-16': 'Itu f(4), nilai minimumnya.' },
      steps: ["f'(x) = 2x − 8.", '2x − 8 = 0 → x = 4.'],
    },
    {
      q: "Jika f'(x) > 0 pada suatu interval, maka pada interval itu grafik f …",
      options: [
        { t: 'naik', ok: true },
        { t: 'turun', why: "Turun terjadi saat f'(x) < 0." },
        { t: 'mendatar', why: "Mendatar terjadi saat f'(x) = 0." },
        { t: 'memotong sumbu x', why: 'Tanda turunan menunjukkan arah, bukan letak titik potong.' },
      ],
      steps: ['Gradien positif → grafik naik.'],
    },
    {
      type: 'num',
      q: 'Nilai maksimum lokal f(x) = x³ − 12x adalah …',
      ans: ['16'],
      wrong: { '-16': 'Itu minimum lokal di x = 2. Maksimum di x = −2.', '-2': '−2 adalah letak x-nya. Nilainya f(−2) = 16.' },
      steps: ["f'(x) = 3x² − 12 = 0 → x = ±2.", 'f(−2) = −8 + 24 = 16 (maksimum).'],
    },
    {
      type: 'num',
      q: 'Dua bilangan positif berjumlah 12. Hasil kali terbesar kedua bilangan itu adalah …',
      ans: ['36'],
      wrong: { '6': '6 adalah masing-masing bilangannya. Hasil kalinya 36.', '35': 'Coba 6 dan 6: 36 lebih besar dari 5 × 7.' },
      steps: ["P = x(12 − x) = 12x − x². P' = 12 − 2x = 0 → x = 6.", 'P = 6 × 6 = 36.'],
    },
    {
      type: 'num',
      q: 'Nilai maksimum f(x) = −x² + 4x + 1 adalah …',
      ans: ['5'],
      wrong: { '2': 'x = 2 adalah letaknya. Nilainya f(2) = −4 + 8 + 1 = 5.', '1': 'f(0) = 1 bukan maksimum.' },
      steps: ["f'(x) = −2x + 4 = 0 → x = 2.", 'f(2) = −4 + 8 + 1 = 5.'],
    },
  ],
};

export default {
  id: 'k12lb3',
  no: 3,
  title: 'Turunan',
  desc: 'Gradien garis singgung dari limit garis sekan, aturan turunan, serta memakai turunan untuk naik-turun grafik, titik stasioner, dan nilai terbesar.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: "f(x) = 5x⁴. Nilai f'(1) adalah …",
      ans: ['20'],
      wrong: { '5': "f'(x) = 20x³ → 20.", '4': '5 × 4 = 20.' },
      steps: ["f'(x) = 20x³.", "f'(1) = 20."],
    },
    {
      type: 'num',
      q: 'Gradien garis singgung kurva y = x² + 3x di x = 1 adalah …',
      ans: ['5'],
      wrong: { '4': 'Itu nilai y. Turunannya 2x + 3.', '3': "y' = 2x + 3 → 2 + 3 = 5." },
      steps: ["y' = 2x + 3.", 'x = 1 → 5.'],
    },
    {
      type: 'num',
      q: 'Posisi benda s(t) = t² + 4t meter. Kecepatannya pada t = 3 detik adalah … m/detik.',
      ans: ['10'],
      wrong: { '21': 'Itu posisinya. Kecepatan = turunan: 2t + 4.', '6': 'Jangan lupa turunan 4t adalah 4.' },
      steps: ["s'(t) = 2t + 4.", "s'(3) = 10 m/detik."],
    },
  ],
};
