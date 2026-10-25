// Kelas 12 Tingkat Lanjut · Bab 4: Integral
import { T, ln, dot } from '../helpers.js';
import { plane, lineOn } from '../k8/plot.js';
import { tag, curve } from '../k10/kit.js';
import { mk, fpath } from '../k12/kit.js';

const RX = 335;
const R = (id, text, y, c = 'ink', size = 14) => T(id, text, RX, y, { size, c });
const region = (id, P, pts, c = 'acc') => ({ id, t: 'poly', x: 0, y: 0, pts: pts.map(([a, b]) => P.at(a, b)), fill: `${c}-soft`, stroke: 'none', sw: 0, z: -2 });
const samp = (f, a, b, n = 40) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n).map((x) => [x, f(x)]);

// ---------- 4.1 Integral tak tentu ----------
const B = mk(5);
const tseg = (id, c0, x0 = 1, c = 'acc') => {
  const k = 0.9 / Math.hypot(1, 2 * x0);
  const y0 = x0 * x0 + c0;
  return ln(id, B.P.X(x0 - k), B.P.Y(y0 - 2 * x0 * k), B.P.X(x0 + k), B.P.Y(y0 + 2 * x0 * k), { sw: 3, c, draw: false, z: 2 });
};

const l1 = {
  id: 'k12lb4-1',
  title: 'Integral Tak Tentu',
  hook: 'Integral adalah kebalikan turunan. Karena turunan konstanta selalu 0, hasil integral selalu ditambah konstanta C.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Turunan suatu fungsi adalah 2x. Fungsi apa itu?',
          add: [T('a', "f'(x) = 2x", 200, 80, { size: 32, c: 'pos' }), T('b', 'f(x) = ?', 200, 140, { size: 32, c: 'acc' })],
          ask: {
            options: [
              { t: 'x², atau x² + 5, atau x² − 1, …', ok: true, why: 'Semua bentuk x² + C turunannya 2x, karena turunan konstanta adalah 0.' },
              { t: 'hanya x²', why: 'x² + 5 juga turunannya 2x. Ada banyak jawaban.' },
              { t: '2', why: '2 adalah turunan dari 2x. Kita mencari ke arah sebaliknya.' },
              { t: '2x²', why: 'Turunan 2x² adalah 4x.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kebalikan turunan',
      steps: [
        {
          say: 'x kuadrat, x kuadrat tambah 2, dan x kuadrat dikurangi 2 bentuknya sama, hanya bergeser naik atau turun.',
          clear: true,
          add: [...B.P.els, fpath('c0', B, (x) => x * x - 2, -2.6, 2.6, { stroke: 'neg', z: -1 }), fpath('c1', B, (x) => x * x, -2.2, 2.2, { z: -1 }), fpath('c2', B, (x) => x * x + 2, -1.7, 1.7, { stroke: 'ok', z: -1 }), tag('e0', 'x² − 2', RX, 60, 'neg', 14), tag('e1', 'x²', RX, 90, 'pos', 14), tag('e2', 'x² + 2', RX, 120, 'ok', 14)],
        },
        {
          say: 'Di x sama dengan 1, ketiganya punya garis singgung yang sejajar, gradiennya sama-sama 2. Jadi turunan ketiganya sama: 2x.',
          add: [tseg('t0', -2), tseg('t1', 0), tseg('t2', 2), R('a', "semua f'(x) = 2x", 190, 'acc', 14)],
        },
        {
          say: 'Karena itu, integral 2x ditulis x kuadrat tambah C. C adalah konstanta sembarang.',
          add: [tag('f', '∫ 2x dx = x² + C', RX, 228, 'ok', 15)],
        },
      ],
    },
    {
      title: 'Aturan pangkat',
      steps: [
        {
          say: 'Turunan menurunkan pangkat. Integral kebalikannya: pangkat dinaikkan 1, lalu dibagi pangkat yang baru.',
          clear: true,
          add: [tag('f', '∫ xⁿ dx = xⁿ⁺¹ ÷ (n + 1) + C', 200, 50, 'pos', 22)],
        },
        {
          say: 'Integral x kuadrat sama dengan x pangkat 3 per 3, tambah C. Integral 3x kuadrat sama dengan x pangkat 3 tambah C. Integral 5 sama dengan 5x tambah C.',
          add: [T('a', '∫ x² dx = x³/3 + C', 200, 110, { size: 22 }), T('b', '∫ 3x² dx = 3 · x³/3 = x³ + C', 200, 150, { size: 22 }), T('c', '∫ 5 dx = 5x + C', 200, 190, { size: 22 })],
        },
        {
          say: 'Selalu bisa dicek: turunkan hasilnya. Turunan x pangkat 3 per 3 adalah x kuadrat. Cocok.',
          add: [T('d', 'cek: (x³/3)\' = x²  ✓', 200, 245, { size: 18, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Mencari nilai C',
      steps: [
        {
          say: 'Kalau ada satu titik yang diketahui, nilai C bisa dicari. Misalnya f aksen x sama dengan 2x dan grafik f melewati titik 1 koma 4.',
          clear: true,
          add: [T('a', "f'(x) = 2x,  f(1) = 4", 200, 60, { size: 24, c: 'pos' })],
        },
        {
          say: 'Integralkan: f x sama dengan x kuadrat tambah C. Masukkan x sama dengan 1: 1 tambah C sama dengan 4, jadi C sama dengan 3.',
          add: [T('b', 'f(x) = x² + C', 200, 115, { size: 22 }), T('c', '1 + C = 4 → C = 3', 200, 155, { size: 22 })],
        },
        {
          say: 'Jadi f x sama dengan x kuadrat tambah 3. Dari banyak parabola tadi, hanya satu yang lewat titik 1 koma 4.',
          add: [T('d', 'f(x) = x² + 3', 200, 210, { size: 26, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa integral 4x pangkat 3 tambah 2x?',
          clear: true,
          add: [T('q', '∫ (4x³ + 2x) dx = ?', 200, 110, { size: 30, c: 'pos' })],
          ask: {
            options: [
              { t: 'x⁴ + x² + C', ok: true, why: '4 · x⁴/4 = x⁴ dan 2 · x²/2 = x².' },
              { t: '12x² + 2', why: 'Itu turunannya. Integral menaikkan pangkat.' },
              { t: 'x⁴ + x²', why: 'Jangan lupa + C.' },
              { t: '4x⁴ + 2x² + C', why: 'Setelah pangkat naik, bagi dengan pangkat baru: 4x⁴/4 = x⁴.' },
            ],
          },
        },
        {
          say: '4x pangkat 3 menjadi 4 kali x pangkat 4 per 4, yaitu x pangkat 4. 2x menjadi 2 kali x kuadrat per 2, yaitu x kuadrat. Tambah C.',
          add: [T('a', '= {g:x⁴ + x² + C}', 200, 190, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Hasil ∫ x⁴ dx adalah …',
      options: [
        { t: 'x⁵/5 + C', ok: true },
        { t: '4x³ + C', why: 'Itu turunan x⁴.' },
        { t: 'x⁵ + C', why: 'Bagi dengan pangkat baru, 5.' },
        { t: 'x⁵/4 + C', why: 'Dibagi pangkat baru (5), bukan pangkat lama.' },
      ],
      steps: ['Pangkat naik: x⁵.', 'Bagi 5: x⁵/5 + C.'],
    },
    {
      q: 'Hasil ∫ 6x dx adalah …',
      options: [
        { t: '3x² + C', ok: true },
        { t: '6x² + C', why: '6 · x²/2 = 3x².' },
        { t: '6 + C', why: 'Itu turunan 6x.' },
        { t: '12x² + C', why: 'Dibagi 2, bukan dikali 2.' },
      ],
      steps: ['6 · x²/2.', '= 3x² + C.'],
    },
    {
      type: 'num',
      q: 'F(x) = ∫ (3x² + 2) dx dan F(0) = 1. Nilai F(1) adalah …',
      ans: ['4'],
      wrong: { '3': 'F(x) = x³ + 2x + 1. F(1) = 1 + 2 + 1 = 4.', '5': 'F(x) = x³ + 2x + 1, jadi F(1) = 1 + 2 + 1 = 4.' },
      steps: ['F(x) = x³ + 2x + C. F(0) = C = 1.', 'F(1) = 1 + 2 + 1 = 4.'],
    },
    {
      type: 'num',
      q: "f'(x) = 2x + 1 dan f(0) = 3. Nilai f(2) adalah …",
      ans: ['9'],
      wrong: { '6': 'Jangan lupa C = 3: f(2) = 4 + 2 + 3.', '5': "Itu f'(2). f(x) = x² + x + 3." },
      steps: ['f(x) = x² + x + C, f(0) = C = 3.', 'f(2) = 4 + 2 + 3 = 9.'],
    },
    {
      q: 'Hasil ∫ 7 dx adalah …',
      options: [
        { t: '7x + C', ok: true },
        { t: '0', why: '0 adalah turunan dari 7. Integral sebaliknya.' },
        { t: '7 + C', why: 'Turunan 7 + C adalah 0, bukan 7.' },
        { t: '7x²/2 + C', why: '7 = 7x⁰, naik menjadi 7x¹.' },
      ],
      steps: ['7 = 7x⁰ → 7x¹/1.', '= 7x + C.'],
    },
  ],
};

// ---------- 4.2 Integral tentu sebagai luas ----------
const CR = { x: 40, y: 30, w: 230, h: 240, xmin: -0.2, xmax: 2.3, ymin: -0.4, ymax: 4.4 };
const PR = plane('pl', { ...CR, step: 0.5, every: 1, ystep: 1, yevery: 1 });
const rects = (n) => {
  const w = 2 / n;
  let d = '';
  for (let k = 1; k <= n; k++) {
    const x0 = PR.X((k - 1) * w);
    const x1 = PR.X(k * w);
    const yt = PR.Y((k * w) ** 2);
    d += `M${x0.toFixed(1)},${PR.Y(0).toFixed(1)} V${yt.toFixed(1)} H${x1.toFixed(1)} V${PR.Y(0).toFixed(1)} Z `;
  }
  return { id: 'rc', t: 'path', x: 0, y: 0, d: d.trim(), fill: 'acc-soft', stroke: 'acc', sw: 1.5, z: -1 };
};
const CT = { x: 40, y: 30, w: 230, h: 240, xmin: -0.5, xmax: 4, ymin: -0.5, ymax: 7.5 };
const PT = plane('pl', { ...CT, every: 1, ystep: 1, yevery: 2 });

const l2 = {
  id: 'k12lb4-2',
  title: 'Integral Tentu dan Luas',
  hook: 'Luas di bawah kurva bisa didekati dengan banyak persegi panjang tipis. Hasil tepatnya dihitung dengan integral tentu: F(b) − F(a).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa luas daerah di bawah garis y sama dengan x, dari x sama dengan 0 sampai 4?',
          add: [...PT.els, region('rg', PT, [[0, 0], [4, 0], [4, 4]]), lineOn('ln', PT, 1, 0, CT, { sw: 3 }), tag('e', 'y = x', RX, 60, 'pos', 16), R('q', 'luas dari 0', 95, 'acc'), R('q2', 'sampai 4 = ?', 117, 'acc')],
          ask: {
            options: [
              { t: '8', ok: true, why: 'Daerahnya segitiga dengan alas 4 dan tinggi 4: ½ × 4 × 4 = 8.' },
              { t: '16', why: '4 × 4 adalah luas persegi. Daerahnya hanya setengahnya.' },
              { t: '4', why: '4 adalah tingginya. Luas segitiga ½ × alas × tinggi.' },
              { t: '2', why: '½ × 4 × 4 = 8.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Didekati persegi panjang',
      steps: [
        {
          say: 'Bagaimana dengan daerah di bawah parabola y sama dengan x kuadrat dari 0 sampai 2? Bentuknya melengkung, tidak ada rumus bangun datar. Coba isi dengan 4 persegi panjang. Jumlah luasnya 3,75.',
          clear: true,
          add: [...PR.els, rects(4), curve('cv', PR, (x) => x * x, CR, { from: 0, to: 2.1 }), tag('e', 'y = x²', RX, 50, 'pos', 16), R('a', '4 persegi: 3,75', 95)],
        },
        {
          say: 'Dengan 8 persegi panjang yang lebih tipis, jumlahnya 3,19. Kelebihannya berkurang.',
          set: { rc: rects(8) },
          add: [R('b', '8 persegi: 3,19', 120)],
        },
        {
          say: 'Dengan 32 persegi panjang, jumlahnya 2,79. Makin banyak, makin dekat ke luas sebenarnya, yaitu 8 per 3, sekitar 2,67.',
          set: { rc: rects(32) },
          add: [R('c', '32 persegi: 2,79', 145), tag('k', '→ 8/3 ≈ 2,67', RX, 190, 'ok', 15)],
        },
      ],
    },
    {
      title: 'Teorema dasar kalkulus',
      steps: [
        {
          say: 'Luas tepat itu ditulis integral x kuadrat dari 0 sampai 2. Angka 0 dan 2 disebut batas bawah dan batas atas.',
          clear: true,
          add: [T('a', '∫₀² x² dx', 200, 60, { size: 32, c: 'pos' })],
        },
        {
          say: 'Cara menghitungnya: cari antiturunan F x, lalu hitung F batas atas dikurangi F batas bawah. Antiturunan x kuadrat adalah x pangkat 3 per 3.',
          add: [T('b', '= [x³/3] dari 0 sampai 2', 200, 115, { size: 22 }), T('c', '= F(2) − F(0)', 200, 155, { size: 22, c: 'mut' })],
        },
        {
          say: '8 per 3 dikurangi 0 sama dengan 8 per 3. Sama dengan hasil persegi panjang yang makin tipis tadi. C tidak perlu ditulis, karena saat dikurangkan C-nya hilang.',
          add: [T('d', '= 8/3 − 0 = {g:8/3}', 200, 205, { size: 28 }), T('e', 'C saling hilang saat dikurangkan', 200, 250, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Cek dengan trapesium',
      steps: [
        {
          say: 'Integral 2x dari 1 sampai 3. Antiturunannya x kuadrat. 9 dikurangi 1 sama dengan 8.',
          clear: true,
          add: [...PT.els, region('rg', PT, [[1, 0], [3, 0], [3, 6], [1, 2]]), lineOn('ln', PT, 2, 0, CT, { sw: 3 }), tag('e', 'y = 2x', RX, 50, 'pos', 16), R('a', '∫₁³ 2x dx = [x²]', 95), R('a2', '= 9 − 1 = 8', 120, 'acc', 16)],
        },
        {
          say: 'Daerahnya trapesium dengan sisi sejajar 2 dan 6, tingginya 2. Luasnya setengah kali 8 kali 2, yaitu 8. Hasilnya sama.',
          add: [R('b', 'trapesium:', 170, 'mut'), R('b2', '½ × (2 + 6) × 2 = 8', 195, 'ok', 13)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa integral x kuadrat dari 0 sampai 3?',
          clear: true,
          add: [T('q', '∫₀³ x² dx = ?', 200, 110, { size: 34, c: 'pos' })],
          ask: {
            options: [
              { t: '9', ok: true, why: '[x³/3] dari 0 sampai 3 = 27/3 − 0 = 9.' },
              { t: '27', why: 'Jangan lupa dibagi 3: x³/3.' },
              { t: '6', why: 'Itu turunan x² di x = 3. Integral menaikkan pangkat.' },
              { t: '3', why: 'F(3) = 27/3 = 9.' },
            ],
          },
        },
        {
          say: 'Antiturunannya x pangkat 3 per 3. Di 3: 27 per 3 sama dengan 9. Di 0: 0. Selisihnya 9.',
          add: [T('a', '[x³/3] = 27/3 − 0 = {g:9}', 200, 190, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai ∫₀² 3x² dx adalah …',
      ans: ['8'],
      wrong: { '12': 'Itu turunan di x = 2. Antiturunannya x³: 8 − 0.', '24': 'Antiturunan 3x² adalah x³, bukan 3x³.' },
      steps: ['Antiturunan: x³.', '2³ − 0³ = 8.'],
    },
    {
      type: 'num',
      q: 'Nilai ∫₁⁴ 2x dx adalah …',
      ans: ['15'],
      wrong: { '16': 'Kurangi F(1): 16 − 1 = 15.', '6': '[x²] dari 1 sampai 4 = 16 − 1.' },
      steps: ['Antiturunan: x².', '16 − 1 = 15.'],
    },
    {
      type: 'num',
      q: 'Nilai ∫₀¹ (4x³ + 1) dx adalah …',
      ans: ['2'],
      wrong: { '1': 'Jangan lupa suku 1 → x: [x⁴ + x] = 1 + 1.', '5': 'Itu nilai 4x³ + 1 di x = 1. Integralkan dulu.' },
      steps: ['Antiturunan: x⁴ + x.', '(1 + 1) − 0 = 2.'],
    },
    {
      type: 'num',
      q: 'Nilai ∫₀⁵ 3 dx adalah …',
      ans: ['15'],
      wrong: { '3': 'Antiturunan 3 adalah 3x: 15 − 0.', '0': 'Integral konstanta bukan 0. Luasnya persegi panjang 5 × 3.' },
      steps: ['[3x] dari 0 sampai 5.', '15 − 0 = 15.'],
    },
    {
      q: 'Nilai ∫ₐᵃ f(x) dx (batas bawah dan atas sama) adalah …',
      options: [
        { t: '0', ok: true },
        { t: 'f(a)', why: 'F(a) − F(a) = 0.' },
        { t: 'a', why: 'Lebar daerahnya 0, jadi luasnya 0.' },
        { t: 'tidak dapat ditentukan', why: 'F(a) − F(a) selalu 0.' },
      ],
      steps: ['F(a) − F(a) = 0.'],
    },
  ],
};

// ---------- 4.3 Luas daerah ----------
const CZ = { x: 40, y: 30, w: 230, h: 240, xmin: -0.2, xmax: 1.3, ymin: -0.2, ymax: 1.3 };
const PZ = plane('pl', { ...CZ, step: 0.25, every: 1, ystep: 0.25, yevery: 1 });
const lens = [...samp((x) => x * x, 0, 1), ...samp((x) => x, 1, 0, 1)];

const l3 = {
  id: 'k12lb4-3',
  title: 'Luas Daerah',
  hook: 'Integral bernilai negatif untuk daerah di bawah sumbu x. Luas antara dua kurva adalah integral kurva atas dikurangi kurva bawah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Integral x dikurangi 2 dari 0 sampai 2 hasilnya minus 2. Berapa luas daerahnya?',
          add: [...B.P.els, region('rg', B.P, [[0, 0], [2, 0], [0, -2]], 'neg'), lineOn('ln', B.P, 1, -2, B.C, { sw: 3 }), tag('e', 'y = x − 2', RX, 60, 'pos', 15), R('q', '∫₀² (x − 2) dx = −2', 100), R('q2', 'luas = ?', 130, 'acc', 16)],
          ask: {
            options: [
              { t: '2', ok: true, why: 'Daerahnya di bawah sumbu x, jadi integralnya negatif. Luas selalu positif: 2.' },
              { t: '−2', why: 'Luas tidak pernah negatif. Tanda minus hanya menunjukkan daerah di bawah sumbu x.' },
              { t: '4', why: 'Segitiga dengan alas 2 dan tinggi 2: ½ × 2 × 2 = 2.' },
              { t: '0', why: 'Daerahnya ada, jadi luasnya tidak 0.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Di bawah sumbu x',
      steps: [
        {
          say: 'Pada daerah ini, nilai y negatif. Persegi panjang tipisnya punya tinggi negatif, jadi jumlahnya negatif.',
          clear: true,
          add: [...B.P.els, region('rg', B.P, [[0, 0], [2, 0], [0, -2]], 'neg'), lineOn('ln', B.P, 1, -2, B.C, { sw: 3 }), tag('e', 'y = x − 2', RX, 60, 'pos', 15), R('a', '[x²/2 − 2x] = 2 − 4', 100), R('a2', '= −2', 125, 'neg', 16)],
        },
        {
          say: 'Untuk luas, ambil nilai mutlaknya: 2. Kalau daerahnya sebagian di atas dan sebagian di bawah sumbu x, hitung tiap bagian terpisah.',
          add: [tag('k', 'luas = |−2| = 2', RX, 175, 'ok', 15), R('k2', 'pisahkan bagian atas', 205, 'mut', 12), R('k3', 'dan bawah sumbu x', 222, 'mut', 12)],
        },
      ],
    },
    {
      title: 'Antara dua kurva',
      steps: [
        {
          say: 'Garis y sama dengan x dan parabola y sama dengan x kuadrat berpotongan di x sama dengan 0 dan x sama dengan 1. Di antaranya, garis ada di atas.',
          clear: true,
          add: [...PZ.els, lineOn('ln', PZ, 1, 0, CZ, { sw: 3, c: 'acc' }), curve('cv', PZ, (x) => x * x, CZ, { from: -0.2, to: 1.14 }), dot('d0', ...PZ.at(0, 0), 'neg', { r: 5 }), dot('d1', ...PZ.at(1, 1), 'neg', { r: 5 }), tag('e1', 'y = x', RX, 55, 'acc', 15), tag('e2', 'y = x²', RX, 85, 'pos', 15)],
        },
        {
          say: 'Luas daerah di antaranya sama dengan integral kurva atas dikurangi kurva bawah: x dikurangi x kuadrat, dari 0 sampai 1.',
          add: [region('rg', PZ, lens, 'ok'), R('a', '∫₀¹ (x − x²) dx', 130, 'ok', 15)],
        },
        {
          say: 'Antiturunannya x kuadrat per 2 dikurangi x pangkat 3 per 3. Di 1: setengah dikurangi sepertiga, yaitu seperenam.',
          add: [R('b', '= [x²/2 − x³/3]', 160), R('b2', '= 1/2 − 1/3 = 1/6', 185, 'ok', 15)],
        },
      ],
    },
    {
      title: 'Langkah-langkahnya',
      steps: [
        {
          say: 'Langkah pertama: cari titik potong kedua kurva untuk batas integral.',
          clear: true,
          add: [T('a', '1. titik potong → batas a dan b', 200, 70, { size: 20, c: 'pos' })],
        },
        {
          say: 'Langkah kedua: tentukan kurva mana yang di atas. Langkah ketiga: integralkan atas dikurangi bawah dari a sampai b.',
          add: [T('b', '2. tentukan kurva atas dan bawah', 200, 120, { size: 20, c: 'acc' }), T('c', '3. luas = ∫ₐᵇ (atas − bawah) dx', 200, 170, { size: 20, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Garis y sama dengan 2x dan parabola y sama dengan x kuadrat berpotongan di x sama dengan 0 dan 2. Berapa luas daerah di antaranya?',
          clear: true,
          add: [T('q', 'y = 2x  dan  y = x²', 200, 80, { size: 28, c: 'pos' }), T('q2', 'potong di x = 0 dan x = 2', 200, 125, { size: 20 }), T('q3', 'luas = ?', 200, 170, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '4/3', ok: true, why: '∫₀² (2x − x²) dx = [x² − x³/3] = 4 − 8/3 = 4/3.' },
              { t: '−4/3', why: 'Itu bawah dikurangi atas. Garis 2x yang di atas.' },
              { t: '4', why: '4 adalah luas di bawah garis saja. Kurangi luas di bawah parabola.' },
              { t: '8/3', why: '8/3 adalah luas di bawah parabola. Luas di antaranya 4 − 8/3.' },
            ],
          },
        },
        {
          say: 'Garis di atas. Integral 2x dikurangi x kuadrat dari 0 sampai 2: x kuadrat dikurangi x pangkat 3 per 3. 4 dikurangi 8 per 3 sama dengan 4 per 3.',
          add: [T('a', '[x² − x³/3] = 4 − 8/3 = {g:4/3}', 200, 235, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Luas daerah di bawah garis y = 2x, di atas sumbu x, dari x = 0 sampai x = 3 adalah …',
      ans: ['9'],
      wrong: { '6': 'Itu tingginya di x = 3. Luas = [x²] = 9.', '18': 'Luas segitiga ½ × 3 × 6 = 9.' },
      steps: ['∫₀³ 2x dx = [x²].', '9 − 0 = 9.'],
    },
    {
      type: 'num',
      q: 'Luas daerah antara kurva y = x² − 4 dan sumbu x untuk −2 ≤ x ≤ 2 adalah …',
      ans: ['32/3'],
      wrong: { '-32/3': 'Integralnya negatif karena di bawah sumbu x. Luas selalu positif.', '16': 'Kurangi bagian x²: [x³/3 − 4x] dari −2 sampai 2 = −32/3, luasnya 32/3.' },
      steps: ['∫ (x² − 4) dx dari −2 sampai 2 = (8/3 − 8) − (−8/3 + 8) = −32/3.', 'Luas = 32/3.'],
    },
    {
      type: 'num',
      q: 'Luas daerah antara garis y = x + 2 dan parabola y = x² (berpotongan di x = −1 dan x = 2) adalah …',
      ans: ['9/2', '4.5'],
      wrong: { '-9/2': 'Garis ada di atas, jadi (x + 2) − x².', '6': 'Hitung [x²/2 + 2x − x³/3] dari −1 sampai 2: 10/3 − (−7/6) = 9/2.' },
      steps: ['∫ (x + 2 − x²) dx dari −1 sampai 2.', '= 10/3 − (−7/6) = 27/6 = 9/2.'],
    },
    {
      q: 'Jika f(x) ≥ g(x) pada a ≤ x ≤ b, luas daerah di antara kedua kurva adalah …',
      options: [
        { t: '∫ₐᵇ (f(x) − g(x)) dx', ok: true },
        { t: '∫ₐᵇ (g(x) − f(x)) dx', why: 'Itu bawah dikurangi atas, hasilnya negatif.' },
        { t: '∫ₐᵇ (f(x) + g(x)) dx', why: 'Luas di antara kurva memakai selisih, bukan jumlah.' },
        { t: 'f(b) − g(a)', why: 'Luas dihitung dengan integral.' },
      ],
      steps: ['Atas dikurangi bawah: f − g.'],
    },
    {
      type: 'num',
      q: 'Nilai ∫₀² (x − 2) dx adalah …',
      ans: ['-2'],
      wrong: { '2': 'Itu luasnya. Nilai integralnya negatif karena di bawah sumbu x.', '0': '[x²/2 − 2x] = 2 − 4 = −2.' },
      steps: ['[x²/2 − 2x] dari 0 sampai 2.', '2 − 4 = −2.'],
    },
  ],
};

export default {
  id: 'k12lb4',
  no: 4,
  title: 'Integral',
  desc: 'Integral sebagai kebalikan turunan, aturan pangkat dan konstanta C, integral tentu sebagai luas, serta luas daerah antara dua kurva.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Nilai ∫₀² (2x + 1) dx adalah …',
      ans: ['6'],
      wrong: { '4': 'Jangan lupa suku 1 → x: [x² + x] = 4 + 2.', '5': 'Itu nilai 2x + 1 di x = 2. Integralkan dulu.' },
      steps: ['[x² + x] dari 0 sampai 2.', '4 + 2 = 6.'],
    },
    {
      q: 'Hasil ∫ (x² + 1) dx adalah …',
      options: [
        { t: 'x³/3 + x + C', ok: true },
        { t: '2x + C', why: 'Itu turunan x² + 1.' },
        { t: 'x³/3 + C', why: 'Suku 1 diintegralkan menjadi x.' },
        { t: 'x³ + x + C', why: 'x² → x³/3, dibagi pangkat baru.' },
      ],
      steps: ['x² → x³/3, 1 → x.', 'x³/3 + x + C.'],
    },
    {
      type: 'num',
      q: 'Luas daerah di bawah kurva y = x³ dari x = 0 sampai x = 2 adalah …',
      ans: ['4'],
      wrong: { '8': 'Antiturunannya x⁴/4: 16/4 = 4.', '16': 'Bagi 4: x⁴/4.' },
      steps: ['[x⁴/4] dari 0 sampai 2.', '16/4 = 4.'],
    },
  ],
};
