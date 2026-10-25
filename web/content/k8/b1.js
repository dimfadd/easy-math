// Kelas 8 · Bab 1: Bilangan Berpangkat dan Bentuk Akar
import { T, box, ln, numberLine, dot, hop, range, areaCells, F } from '../helpers.js';

const P = (b, e) => `${b}{^:${e}}`; // tulis pangkat: P(2, 5) -> 2⁵

// ---------- 1.1 Arti pangkat ----------
// Kertas dilipat: setiap lipatan menggandakan lapisan. Hitung posisi kotak tiap lipatan.
function foldLayouts(maxK) {
  const out = [];
  let pos = [[0, 0]];
  let C = 1;
  let R = 1;
  out.push({ pos: pos.slice(), C, R });
  for (let k = 1; k <= maxK; k++) {
    const right = k % 2 === 1;
    const add = pos.map(([c, r]) => (right ? [c + C, r] : [c, r + R]));
    pos = pos.concat(add);
    if (right) C *= 2;
    else R *= 2;
    out.push({ pos: pos.slice(), C, R });
  }
  return out;
}
const FOLD = foldLayouts(5);
const D = 26;
const xyOf = (k, i) => {
  const { pos, C, R } = FOLD[k];
  const [c, r] = pos[i];
  return { x: 200 + (c - (C - 1) / 2) * D, y: 118 + (r - (R - 1) / 2) * D };
};
const layer = (i, k) => box(`f${i}`, xyOf(k, i).x, xyOf(k, i).y, 23, 23, { fill: 'pos-soft', r: 3, sw: 1.5 });
function foldStep(k) {
  const n = 2 ** (k - 1);
  const set = {};
  for (let i = 0; i < n; i++) set[`f${i}`] = xyOf(k, i);
  const add = range(n, 2 * n).map((i) => ({ ...layer(i, k), from: xyOf(k, i - n), fill: 'acc-soft' }));
  for (let i = 0; i < n; i++) set[`f${i}`].fill = 'pos-soft';
  return { set, add };
}
const EXPR = ['1', '2', '2 × 2 = 4', '2 × 2 × 2 = 8', '2 × 2 × 2 × 2 = 16', '2 × 2 × 2 × 2 × 2 = 32'];

const l1 = {
  id: 'k8b1-1',
  title: 'Arti Bilangan Berpangkat',
  hook: 'Kertas dilipat 5 kali menjadi 32 lapis, bukan 10. Pangkat adalah perkalian yang diulang.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Selembar kertas dilipat dua menjadi 2 lapis. Dilipat dua lagi menjadi 4 lapis. Kalau dilipat 5 kali, ada berapa lapis?',
          add: [box('kertas', 200, 100, 120, 80, { fill: 'pos-soft', r: 4 }), T('q', '1 kali → 2 lapis, 2 kali → 4 lapis', 200, 190, { size: 18 }), T('q2', '5 kali → … lapis?', 200, 230, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: '32', ok: true, why: 'Setiap lipatan menggandakan lapisan. Mari kita lihat.' },
              { t: '10', why: 'Lapisan tidak bertambah 2 setiap kali, tapi menjadi dua kali lipat.' },
              { t: '25', why: '25 = 5 × 5. Yang dikalikan berulang adalah 2, sebanyak 5 kali.' },
              { t: '16', why: '16 adalah hasil 4 kali lipatan. Masih ada satu lipatan lagi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Melipat kertas',
      steps: [
        {
          say: 'Satu kotak ini adalah selembar kertas. Belum dilipat, jadi 1 lapis.',
          clear: true,
          add: [layer(0, 0), T('e', '1 lapis', 200, 222, { size: 24 }), T('k', 'belum dilipat', 200, 258, { size: 16, c: 'mut' })],
        },
        ...[1, 2, 3, 4, 5].map((k) => {
          const st = foldStep(k);
          return {
            say: k === 1 ? 'Lipat sekali: menjadi 2 lapis.' : k === 5 ? 'Lipatan kelima: 32 lapis! Kita mengalikan 2 sebanyak 5 kali.' : `Lipat lagi: dua kali lipat, menjadi ${2 ** k} lapis.`,
            set: { ...st.set, e: { text: EXPR[k] }, k: { text: `lipatan ke-${k}: ${2 ** k} lapis` } },
            add: st.add,
          };
        }),
      ],
    },
    {
      title: 'Ditulis singkat',
      steps: [
        {
          say: 'Menulis 2 kali 2 kali 2 kali 2 kali 2 itu panjang. Kita tulis singkat sebagai 2 pangkat 5.',
          clear: true,
          add: [T('long', '2 × 2 × 2 × 2 × 2', 200, 55, { size: 28 }), T('short', P(2, 5), 200, 155, { size: 64 })],
        },
        {
          say: 'Angka 2 yang besar disebut basis: bilangan yang dikalikan.',
          add: [T('lb', 'basis', 110, 215, { size: 20, c: 'pos' }), ln('ab', 130, 200, 180, 175, { c: 'pos', arrow: 'end', sw: 2.5 })],
        },
        {
          say: 'Angka 5 yang kecil di atas disebut pangkat: berapa kali basisnya dikalikan.',
          add: [T('lp', 'pangkat', 300, 105, { size: 20, c: 'acc' }), ln('ap', 275, 112, 232, 128, { c: 'acc', arrow: 'end', sw: 2.5 })],
        },
        { say: 'Jadi 2 pangkat 5 sama dengan 32.', add: [T('r', `${P(2, 5)} = 32`, 200, 262, { size: 28 })] },
      ],
    },
    {
      title: 'Bukan perkalian biasa',
      steps: [
        {
          say: 'Hati-hati. 2 pangkat 5 bukan 2 kali 5. 2 pangkat 5 sama dengan 32, sedangkan 2 kali 5 hanya 10.',
          clear: true,
          add: [T('a', `${P(2, 5)} = 2 × 2 × 2 × 2 × 2 = {g:32}`, 200, 70, { size: 24 }), T('b', '2 × 5 = {n:10}', 200, 115, { size: 24 })],
        },
        {
          say: 'Basis dan pangkat juga tidak boleh ditukar. 5 pangkat 2 sama dengan 5 kali 5, yaitu 25. Hasilnya berbeda dengan 2 pangkat 5.',
          add: [T('c', `${P(5, 2)} = 5 × 5 = 25`, 200, 185, { size: 24 }), T('d', `${P(5, 2)} ≠ ${P(2, 5)}`, 200, 240, { size: 26, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Basis negatif',
      steps: [
        {
          say: 'Basisnya boleh negatif. Minus 3 dalam kurung pangkat 2 sama dengan minus 3 kali minus 3, yaitu 9.',
          clear: true,
          add: [T('a', `({n:−3}){^:2} = ({n:−3}) × ({n:−3}) = {p:9}`, 200, 60, { size: 24 })],
        },
        {
          say: 'Pangkat 3: minus 3 kali minus 3 kali minus 3, yaitu minus 27.',
          add: [T('b', `({n:−3}){^:3} = ({n:−3}) × ({n:−3}) × ({n:−3}) = {n:−27}`, 200, 110, { size: 20 })],
        },
        {
          say: 'Polanya: basis negatif dengan pangkat genap hasilnya positif. Pangkat ganjil hasilnya negatif.',
          add: [box('k1', 105, 185, 170, 64, { fill: 'pos-soft', r: 10, label: 'pangkat genap\n→ positif', lsize: 16 }), box('k2', 295, 185, 170, 64, { fill: 'neg-soft', r: 10, label: 'pangkat ganjil\n→ negatif', lsize: 16 })],
        },
        {
          say: 'Perhatikan kurungnya. Tanpa kurung, minus 3 pangkat 2 artinya minus dari 3 pangkat 2, yaitu minus 9.',
          add: [T('c', `−${P(3, 2)} = −(3 × 3) = {n:−9}`, 200, 262, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa 3 pangkat 4?',
          clear: true,
          add: [T('q', `${P(3, 4)} = ?`, 200, 130, { size: 56 })],
          ask: {
            options: [
              { t: '81', ok: true, why: '3 × 3 × 3 × 3 = 81.' },
              { t: '12', why: '12 = 3 × 4. Pangkat berarti 3 dikalikan dengan dirinya sendiri 4 kali.' },
              { t: '64', why: '64 = 4 × 4 × 4. Basisnya 3, bukan 4.' },
              { t: '27', why: '27 = 3 × 3 × 3, baru 3 kali. Pangkatnya 4.' },
            ],
          },
        },
        {
          say: '3 kali 3 sama dengan 9. 9 kali 3 sama dengan 27. 27 kali 3 sama dengan 81.',
          clear: true,
          add: [T('a', `${P(3, 4)} = 3 × 3 × 3 × 3`, 200, 80, { size: 30 }), T('b', '= 9 × 3 × 3 = 27 × 3 = {a:81}', 200, 140, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: `Nilai dari ${P(2, 6)} adalah …`,
      ans: ['64'],
      wrong: { '12': '2⁶ bukan 2 × 6. Kalikan 2 sebanyak 6 kali.', '36': '36 = 6 × 6. Basisnya 2.', '32': 'Itu 2⁵. Kalikan sekali lagi dengan 2.' },
      steps: ['2 × 2 × 2 × 2 × 2 × 2.', '= 4 × 2 × 2 × 2 × 2 = 64.'],
    },
    {
      q: 'Bentuk pangkat dari 5 × 5 × 5 × 5 adalah …',
      options: [
        { t: P(5, 4), ok: true },
        { t: P(4, 5), why: 'Yang dikalikan adalah 5 (basis), sebanyak 4 kali (pangkat).' },
        { t: '5 × 4', why: 'Itu perkalian biasa, bernilai 20.' },
        { t: P(5, 5), why: 'Hitung lagi: angka 5 muncul 4 kali.' },
      ],
      steps: ['Basis = bilangan yang dikalikan = 5.', 'Pangkat = banyaknya = 4. Jadi 5⁴.'],
    },
    {
      type: 'num',
      q: `Nilai dari ({n:−2}){^:5} adalah …`,
      ans: ['-32'],
      wrong: { '32': 'Basis negatif dengan pangkat ganjil hasilnya negatif.', '-10': '(−2)⁵ bukan (−2) × 5. Kalikan −2 sebanyak 5 kali.' },
      steps: ['(−2) × (−2) = 4, × (−2) = −8, × (−2) = 16, × (−2) = −32.', 'Pangkat ganjil → hasil negatif.'],
    },
    {
      q: 'Manakah yang nilainya paling besar?',
      options: [
        { t: P(2, 5), ok: true },
        { t: P(5, 2), why: '5² = 25, sedangkan 2⁵ = 32.' },
        { t: P(3, 3), why: '3³ = 27, sedangkan 2⁵ = 32.' },
        { t: P(4, 2), why: '4² = 16.' },
      ],
      steps: ['2⁵ = 32, 5² = 25, 3³ = 27, 4² = 16.', 'Paling besar: 2⁵.'],
    },
    {
      type: 'num',
      q: 'Satu bakteri membelah menjadi 2 setiap 20 menit. Setelah 2 jam, ada berapa bakteri?',
      ans: ['64'],
      wrong: { '12': 'Bakteri tidak bertambah 2, tapi menjadi dua kali lipat. Hitung 2⁶.', '6': '6 adalah banyaknya membelah. Banyak bakteri = 2⁶.', '32': 'Dalam 2 jam ada 6 kali membelah (120 ÷ 20), bukan 5.' },
      steps: ['2 jam = 120 menit. 120 ÷ 20 = 6 kali membelah.', 'Banyak bakteri: 2⁶ = 64.'],
    },
  ],
};

// ---------- 1.2 Sifat-sifat pangkat ----------
const two = (id, x, y, fill = 'pos-soft') => box(id, x, y, 30, 30, { fill, r: 6, label: '2', lsize: 17, sw: 1.5 });

const l2 = {
  id: 'k8b1-2',
  title: 'Sifat-sifat Bilangan Berpangkat',
  hook: 'Kenapa 2³ × 2⁴ = 2⁷? Hitung saja berapa angka 2 yang dikalikan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '2 pangkat 3 dikali 2 pangkat 4 sama dengan 2 pangkat berapa?',
          add: [T('q', `${P(2, 3)} × ${P(2, 4)} = ${P(2, '?')}`, 200, 130, { size: 44 })],
          ask: {
            options: [
              { t: '7', ok: true, why: 'Ada 3 angka 2 dan 4 angka 2, totalnya 7. Kita lihat.' },
              { t: '12', why: 'Pangkatnya tidak dikalikan. Hitung banyak angka 2 yang dikalikan.' },
              { t: '1', why: 'Pangkatnya tidak dikurangkan. Ini perkalian, jadi angka 2-nya bertambah.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Perkalian: pangkat dijumlah',
      steps: [
        {
          say: '2 pangkat 3 artinya tiga angka 2 yang dikalikan.',
          clear: true,
          add: [...range(0, 3).map((i) => two(`a${i}`, 70 + i * 36, 80)), T('la', P(2, 3), 106, 40, { size: 26, c: 'pos' })],
        },
        {
          say: '2 pangkat 4 artinya empat angka 2.',
          add: [...range(0, 4).map((i) => two(`b${i}`, 230 + i * 36, 80, 'acc-soft')), T('lb', P(2, 4), 284, 40, { size: 26, c: 'acc' })],
        },
        {
          say: 'Kalau dikalikan, semua angka 2 berderet. Hitung: ada 7. Jadi hasilnya 2 pangkat 7.',
          set: { ...Object.fromEntries(range(0, 3).map((i) => [`a${i}`, { x: 92 + i * 36, y: 160 }])), ...Object.fromEntries(range(0, 4).map((i) => [`b${i}`, { x: 200 + i * 36, y: 160 }])) },
          add: [T('r', `${P(2, 3)} × ${P(2, 4)} = ${P(2, '3 + 4')} = ${P(2, 7)}`, 200, 220, { size: 26 })],
        },
        {
          say: 'Aturannya: kalau basisnya sama dan dikalikan, pangkatnya dijumlahkan.',
          add: [box('rb', 200, 270, 250, 44, { fill: 'acc-soft', r: 10 }), T('rule', `a{^:m} × a{^:n} = a{^:m + n}`, 200, 270, { size: 22 })],
        },
      ],
    },
    {
      title: 'Pembagian: pangkat dikurang',
      steps: [
        {
          say: 'Sekarang 2 pangkat 5 dibagi 2 pangkat 2. Tulis sebagai pecahan: lima angka 2 di atas, dua angka 2 di bawah.',
          clear: true,
          add: [...range(0, 5).map((i) => two(`t${i}`, 128 + i * 36, 80)), ln('bar', 100, 115, 300, 115, { sw: 3, draw: false }), ...range(0, 2).map((i) => two(`u${i}`, 182 + i * 36, 150, 'acc-soft'))],
        },
        {
          say: 'Angka 2 di atas dan di bawah saling menghabisi, seperti menyederhanakan pecahan. Dua pasang dicoret.',
          set: { t0: { o: 0.2 }, t1: { o: 0.2 }, u0: { o: 0.2 }, u1: { o: 0.2 } },
          add: [ln('x1', 113, 65, 179, 95, { c: 'neg', sw: 3 }), ln('x2', 167, 135, 233, 165, { c: 'neg', sw: 3 })],
        },
        {
          say: 'Tersisa tiga angka 2. Jadi hasilnya 2 pangkat 3.',
          add: [T('r', `${P(2, 5)} ÷ ${P(2, 2)} = ${P(2, '5 − 2')} = ${P(2, 3)}`, 200, 215, { size: 26 })],
          pulse: ['t2', 't3', 't4'],
        },
        {
          say: 'Aturannya: kalau basisnya sama dan dibagi, pangkatnya dikurangkan.',
          add: [box('rb', 200, 270, 250, 44, { fill: 'acc-soft', r: 10 }), T('rule', `a{^:m} ÷ a{^:n} = a{^:m − n}`, 200, 270, { size: 22 })],
        },
      ],
    },
    {
      title: 'Pangkat dari pangkat',
      steps: [
        {
          say: '2 pangkat 3, lalu semuanya dipangkatkan 2. Artinya 2 pangkat 3 dikali 2 pangkat 3.',
          clear: true,
          add: [T('q', `(${P(2, 3)}){^:2} = ${P(2, 3)} × ${P(2, 3)}`, 200, 45, { size: 28 })],
        },
        {
          say: 'Ada dua kelompok, masing-masing tiga angka 2.',
          add: [
            ...range(0, 3).map((i) => two(`a${i}`, 82 + i * 36, 120)),
            ...range(0, 3).map((i) => two(`b${i}`, 246 + i * 36, 120, 'acc-soft')),
            box('g1', 118, 120, 120, 50, { fill: 'none', stroke: 'pos', dash: '5 4', r: 10 }),
            box('g2', 282, 120, 120, 50, { fill: 'none', stroke: 'acc', dash: '5 4', r: 10 }),
          ],
        },
        {
          say: 'Totalnya 2 kali 3, yaitu 6 angka 2. Jadi hasilnya 2 pangkat 6. Pangkatnya dikalikan.',
          add: [T('r', `(${P(2, 3)}){^:2} = ${P(2, '3 × 2')} = ${P(2, 6)}`, 200, 200, { size: 26 }), box('rb', 200, 262, 250, 44, { fill: 'acc-soft', r: 10 }), T('rule', `(a{^:m}){^:n} = a{^:m × n}`, 200, 262, { size: 22 })],
        },
      ],
    },
    {
      title: 'Hanya untuk basis sama',
      steps: [
        {
          say: 'Ketiga aturan tadi hanya berlaku kalau basisnya sama. 2 pangkat 3 dikali 3 pangkat 2 tidak bisa digabung. Hitung satu per satu: 8 kali 9 sama dengan 72.',
          clear: true,
          add: [T('a', `${P(2, 3)} × ${P(3, 2)}`, 200, 90, { size: 36 }), T('b', 'basis berbeda → hitung satu per satu', 200, 145, { size: 17, c: 'neg' }), T('c', '= 8 × 9 = 72', 200, 200, { size: 30 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 5 pangkat 6 dibagi 5 pangkat 4 sama dengan berapa?',
          clear: true,
          add: [T('q', `${P(5, 6)} ÷ ${P(5, 4)} = ?`, 200, 130, { size: 44 })],
          ask: {
            options: [
              { t: '25', ok: true, why: '5⁶ ÷ 5⁴ = 5² = 25.' },
              { t: '5', why: '6 − 4 = 2, jadi hasilnya 5², bukan 5¹.' },
              { t: P(5, 10), why: 'Pada pembagian, pangkatnya dikurangkan, bukan dijumlahkan.' },
              { t: '1', why: 'Pangkatnya berbeda, jadi hasilnya bukan 1.' },
            ],
          },
        },
        {
          say: 'Pembagian dengan basis sama: pangkatnya dikurangkan. 6 dikurangi 4 sama dengan 2. 5 pangkat 2 sama dengan 25.',
          clear: true,
          add: [T('a', `${P(5, 6)} ÷ ${P(5, 4)} = ${P(5, '6 − 4')}`, 200, 90, { size: 32 }), T('b', `= ${P(5, 2)} = {a:25}`, 200, 160, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: `Bentuk sederhana dari ${P(3, 4)} × ${P(3, 5)} adalah …`,
      options: [
        { t: P(3, 9), ok: true },
        { t: P(3, 20), why: 'Pada perkalian, pangkat dijumlahkan, bukan dikalikan.' },
        { t: P(9, 9), why: 'Basisnya tetap 3. Hanya pangkatnya yang dijumlahkan.' },
        { t: P(9, 20), why: 'Basis tetap 3, dan pangkat dijumlahkan.' },
      ],
      steps: ['Basis sama, dikalikan → pangkat dijumlahkan.', '3⁴ × 3⁵ = 3⁴⁺⁵ = 3⁹.'],
    },
    {
      q: `Bentuk sederhana dari ${P(7, 8)} ÷ ${P(7, 5)} adalah …`,
      options: [
        { t: P(7, 3), ok: true },
        { t: P(7, 13), why: 'Pada pembagian, pangkat dikurangkan.' },
        { t: P(1, 3), why: 'Basisnya tetap 7.' },
        { t: P(7, '8/5'), why: 'Pangkatnya dikurangkan, bukan dibagi.' },
      ],
      steps: ['Basis sama, dibagi → pangkat dikurangkan.', '7⁸ ÷ 7⁵ = 7⁸⁻⁵ = 7³.'],
    },
    {
      q: `Bentuk sederhana dari (${P(2, 4)}){^:3} adalah …`,
      options: [
        { t: P(2, 12), ok: true },
        { t: P(2, 7), why: 'Pangkat dari pangkat: pangkatnya dikalikan, bukan dijumlahkan.' },
        { t: P(6, 4), why: 'Basisnya tetap 2.' },
        { t: P(8, 4), why: 'Basisnya tetap 2, pangkatnya 4 × 3.' },
      ],
      steps: ['(2⁴)³ = 2⁴ × 2⁴ × 2⁴.', 'Pangkat: 4 + 4 + 4 = 4 × 3 = 12. Jadi 2¹².'],
    },
    {
      type: 'num',
      q: `Nilai dari ${P(2, 10)} ÷ ${P(2, 7)} adalah …`,
      ans: ['8'],
      wrong: { '3': 'Hasilnya 2³, nilainya 2 × 2 × 2.', '6': '2³ bukan 2 × 3.' },
      steps: ['2¹⁰ ÷ 2⁷ = 2¹⁰⁻⁷ = 2³.', '2³ = 8.'],
    },
    {
      q: `Bentuk sederhana dari a{^:3} × a{^:5} ÷ a{^:2} adalah …`,
      options: [
        { t: 'a{^:6}', ok: true },
        { t: 'a{^:10}', why: 'Pembagian dengan a² berarti pangkatnya dikurangi 2.' },
        { t: 'a{^:13}', why: '3 + 5 = 8, lalu 8 − 2 = 6.' },
        { t: 'a{^:7,5}', why: 'Kerjakan urut: pangkat dijumlah untuk kali, dikurang untuk bagi.' },
      ],
      steps: ['a³ × a⁵ = a⁸.', 'a⁸ ÷ a² = a⁶.'],
    },
  ],
};

// ---------- 1.3 Pangkat nol, negatif, dan notasi ilmiah ----------
const ROWS = [3, 2, 1, 0, -1, -2];
const rowY = (k) => 38 + k * 44;
const VAL = { 3: '8', 2: '4', 1: '2', 0: '1' };
const digit = (id, ch, x, y, o = {}) => T(id, ch, x, y, { size: 30, ...o });

const l3 = {
  id: 'k8b1-3',
  title: 'Pangkat Nol, Pangkat Negatif, dan Notasi Ilmiah',
  hook: 'Kenapa 5⁰ = 1? Ikuti polanya: setiap pangkat turun satu, hasilnya dibagi basisnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa nilai 5 pangkat 0?',
          add: [T('q', `${P(5, 0)} = ?`, 200, 130, { size: 60 })],
          ask: {
            options: [
              { t: '1', ok: true, why: 'Mari kita lihat dari polanya.' },
              { t: '0', why: 'Banyak yang menebak 0. Ikuti polanya, hasilnya bukan 0.' },
              { t: '5', why: '5 adalah 5¹. Pangkat 0 berbeda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ikuti polanya',
      steps: [
        {
          say: 'Mulai dari 2 pangkat 3 sama dengan 8, 2 pangkat 2 sama dengan 4, dan 2 pangkat 1 sama dengan 2.',
          clear: true,
          add: [0, 1, 2].flatMap((k) => [T(`l${k}`, P(2, ROWS[k]), 150, rowY(k), { size: 26 }), T(`v${k}`, `= ${VAL[ROWS[k]]}`, 215, rowY(k), { size: 26 })]),
        },
        {
          say: 'Setiap pangkat turun satu, hasilnya dibagi 2. 8 menjadi 4, 4 menjadi 2.',
          add: [T('d0', '÷ 2', 310, (rowY(0) + rowY(1)) / 2, { size: 16, c: 'acc' }), T('d1', '÷ 2', 310, (rowY(1) + rowY(2)) / 2, { size: 16, c: 'acc' })],
        },
        {
          say: 'Lanjutkan polanya. 2 dibagi 2 sama dengan 1. Jadi 2 pangkat 0 sama dengan 1.',
          add: [T('d2', '÷ 2', 310, (rowY(2) + rowY(3)) / 2, { size: 16, c: 'acc' }), T('l3', P(2, 0), 150, rowY(3), { size: 26 }), T('v3', '= {a:1}', 215, rowY(3), { size: 26 })],
          pulse: ['v3'],
        },
        {
          say: 'Terus lagi. 1 dibagi 2 sama dengan setengah. Jadi 2 pangkat minus 1 sama dengan 1 per 2.',
          add: [T('d3', '÷ 2', 310, (rowY(3) + rowY(4)) / 2, { size: 16, c: 'acc' }), T('l4', P(2, '−1'), 150, rowY(4), { size: 26 }), T('v4e', '=', 196, rowY(4), { size: 26 }), F('v4', 1, 2, 225, rowY(4), { size: 18 })],
        },
        {
          say: 'Dan 2 pangkat minus 2 sama dengan 1 per 4, yaitu 1 per 2 pangkat 2.',
          add: [T('d4', '÷ 2', 310, (rowY(4) + rowY(5)) / 2, { size: 16, c: 'acc' }), T('l5', P(2, '−2'), 150, rowY(5), { size: 26 }), T('v5e', '=', 196, rowY(5), { size: 26 }), F('v5', 1, 4, 225, rowY(5), { size: 18 })],
        },
      ],
    },
    {
      title: 'Aturannya',
      steps: [
        {
          say: 'Jadi, bilangan apa pun selain nol, jika dipangkatkan 0 hasilnya 1.',
          clear: true,
          add: [box('r1', 200, 70, 300, 54, { fill: 'acc-soft', r: 10 }), T('a', `a{^:0} = 1`, 200, 70, { size: 26 }), T('a2', 'untuk a ≠ 0', 200, 112, { size: 15, c: 'mut' })],
        },
        {
          say: 'Pangkat negatif artinya kebalikan: a pangkat minus n sama dengan 1 per a pangkat n.',
          add: [box('r2', 200, 175, 300, 54, { fill: 'acc-soft', r: 10 }), T('b', `a{^:−n} = 1 / a{^:n}`, 200, 175, { size: 26 })],
        },
        {
          say: 'Contoh: 10 pangkat minus 2 sama dengan 1 per 100, yaitu 0 koma 01.',
          add: [T('c', `${P(10, '−2')} = 1/100 = 0,01`, 200, 255, { size: 24 })],
        },
      ],
    },
    {
      title: 'Bilangan sangat besar',
      steps: [
        {
          say: 'Jarak Bumi ke Matahari sekitar 150 juta kilometer. Nolnya banyak sekali, mudah salah hitung.',
          clear: true,
          add: [...'150000000'.split('').map((ch, i) => digit(`g${i}`, ch, 92 + i * 26, 110)), T('u', 'km', 352, 112, { size: 18, c: 'mut' }), T('h', 'jarak Bumi ke Matahari', 200, 50, { size: 18 })],
        },
        {
          say: 'Kita pindahkan koma ke kiri sampai tersisa satu angka di depan. Hitung lompatannya.',
          add: [dot('cm', 92 + 8 * 26 + 13, 124, 'acc', { r: 4 })],
        },
        ...range(0, 8).map((k) => ({
          say: k === 7 ? '8 lompatan.' : `${k + 1}.`,
          add: [hop(`hp${k}`, 92 + (8 - k) * 26 + 13, 92 + (7 - k) * 26 + 13, 92, { c: 'acc', h: 14 })],
          set: { cm: { x: 92 + (7 - k) * 26 + 13 } },
        })),
        {
          say: 'Koma melompat 8 kali. Jadi 150 juta sama dengan 1 koma 5 dikali 10 pangkat 8. Ini disebut notasi ilmiah.',
          add: [T('r', `1,5 × ${P(10, 8)} km`, 200, 190, { size: 32, c: 'acc' }), T('r2', 'bentuk: a × 10{^:n}, dengan 1 ≤ a < 10', 200, 245, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Bilangan sangat kecil',
      steps: [
        {
          say: 'Bilangan kecil juga bisa. Ukuran sel darah merah sekitar 0 koma 000007 meter.',
          clear: true,
          add: [...'0,000007'.split('').map((ch, i) => digit(`s${i}`, ch, 110 + i * 26, 110)), T('u', 'm', 330, 112, { size: 18, c: 'mut' }), T('h', 'ukuran sel darah merah', 200, 50, { size: 18 })],
        },
        {
          say: 'Sekarang koma dipindah ke kanan, melewati angka 7. Ada 6 lompatan.',
          set: { s1: { o: 0.25 } },
          add: range(0, 6).map((k) => hop(`hp${k}`, k === 0 ? 136 : 110 + (k + 1) * 26 + 13, 110 + (k + 2) * 26 + 13, 92, { c: 'acc', h: 14 })),
        },
        {
          say: 'Karena kita pindah ke kanan, pangkatnya negatif. 0 koma 000007 sama dengan 7 dikali 10 pangkat minus 6.',
          add: [T('r', `7 × ${P(10, '−6')} m`, 200, 190, { size: 32, c: 'acc' }), T('r2', 'koma ke kiri → pangkat positif, ke kanan → negatif', 200, 245, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Penduduk sebuah kota 4 juta 500 ribu. Tulis dalam notasi ilmiah.',
          clear: true,
          add: [T('q', '4.500.000', 200, 120, { size: 40 }), T('q2', 'notasi ilmiah = ?', 200, 180, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: `4,5 × ${P(10, 6)}`, ok: true, why: 'Koma melompat 6 kali ke kiri.' },
              { t: `45 × ${P(10, 5)}`, why: 'Nilainya sama, tapi bukan notasi ilmiah: angka depannya harus antara 1 dan 10.' },
              { t: `4,5 × ${P(10, 5)}`, why: 'Hitung lagi lompatannya: ada 6 angka di belakang angka 4.' },
              { t: `4,5 × ${P(10, '−6')}`, why: 'Bilangannya besar, jadi pangkatnya positif.' },
            ],
          },
        },
        {
          say: 'Koma dipindah ke kiri 6 kali, sampai di antara 4 dan 5. Jadi 4 koma 5 dikali 10 pangkat 6.',
          clear: true,
          add: [T('a', '4.500.000 = 4,5 × 1.000.000', 200, 100, { size: 26 }), T('b', `= {a:4,5 × 10}{^:6}`, 200, 160, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: `Nilai dari ${P(2, '−3')} adalah … (boleh ditulis sebagai pecahan)`,
      ans: ['1/8'],
      wrong: { '-8': 'Pangkat negatif bukan berarti hasilnya negatif. 2⁻³ = 1/2³.', '-6': 'Pangkat negatif artinya kebalikan: 1/2³.', '8': 'Itu 2³. Pangkat negatif artinya kebalikannya.' },
      steps: ['2⁻³ = 1/2³.', '2³ = 8, jadi 2⁻³ = 1/8.'],
    },
    {
      q: `Nilai dari ({n:−7}){^:0} adalah …`,
      options: [
        { t: '1', ok: true },
        { t: '0', why: 'Bilangan apa pun (selain 0) pangkat 0 hasilnya 1.' },
        { t: '−1', why: 'Bilangan apa pun (selain 0) pangkat 0 hasilnya 1, termasuk bilangan negatif.' },
        { t: '−7', why: '−7 adalah (−7)¹.' },
      ],
      steps: ['a⁰ = 1 untuk a ≠ 0.', 'Jadi (−7)⁰ = 1.'],
    },
    {
      q: 'Notasi ilmiah dari 3.200.000 adalah …',
      options: [
        { t: `3,2 × ${P(10, 6)}`, ok: true },
        { t: `32 × ${P(10, 5)}`, why: 'Angka depan notasi ilmiah harus antara 1 dan 10.' },
        { t: `3,2 × ${P(10, 5)}`, why: 'Koma melompat 6 kali, bukan 5.' },
        { t: `3,2 × ${P(10, 7)}`, why: 'Koma melompat 6 kali, bukan 7.' },
      ],
      steps: ['Pindahkan koma ke kiri sampai di antara 3 dan 2: 6 lompatan.', '3.200.000 = 3,2 × 10⁶.'],
    },
    {
      q: 'Notasi ilmiah dari 0,00045 adalah …',
      options: [
        { t: `4,5 × ${P(10, '−4')}`, ok: true },
        { t: `4,5 × ${P(10, 4)}`, why: 'Bilangannya lebih kecil dari 1, jadi pangkatnya negatif.' },
        { t: `4,5 × ${P(10, '−5')}`, why: 'Koma melompat 4 kali ke kanan (sampai melewati angka 4).' },
        { t: `45 × ${P(10, '−5')}`, why: 'Nilainya sama, tapi angka depan harus antara 1 dan 10.' },
      ],
      steps: ['Pindahkan koma ke kanan sampai melewati angka 4: 4 lompatan.', 'Ke kanan → pangkat negatif: 4,5 × 10⁻⁴.'],
    },
    {
      type: 'num',
      q: `Nilai dari ${P(5, '−2')} × ${P(5, 4)} adalah …`,
      ans: ['25'],
      wrong: { '5': '−2 + 4 = 2, jadi 5², bukan 5¹.', '625': 'Itu 5⁴. Pangkatnya dijumlahkan: −2 + 4 = 2.' },
      steps: ['Basis sama, dikalikan → pangkat dijumlahkan: −2 + 4 = 2.', '5² = 25.'],
    },
  ],
};

// ---------- 1.4 Bentuk akar ----------
const sq = (prefix, n, cx, cy, cell, fill = 'pos-soft') => areaCells(prefix, cx, cy, n * cell, n * cell, n, n, () => fill);
const rt = (id, coef, rad, x, y, o = {}) => box(id, x, y, 62, 40, { fill: 'acc-soft', r: 8, label: `${coef}√${rad}`, lsize: 18, ...o });

const l4 = {
  id: 'k8b1-4',
  title: 'Bentuk Akar',
  hook: 'Akar kuadrat adalah panjang sisi persegi jika luasnya diketahui. √49 = 7 karena 7 × 7 = 49.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah lantai persegi luasnya 49 meter persegi. Berapa panjang sisinya?',
          add: [box('lantai', 200, 120, 140, 140, { fill: 'pos-soft', r: 2, label: 'luas 49 m²', lsize: 18 }), T('q', 'sisi = ?', 200, 230, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '7 m', ok: true, why: '7 × 7 = 49.' },
              { t: '24,5 m', why: '24,5 = 49 ÷ 2. Luas persegi = sisi × sisi, bukan sisi × 2.' },
              { t: '12,25 m', why: '12,25 = 49 ÷ 4. Itu cara mencari sisi dari keliling, bukan dari luas.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Akar = sisi persegi',
      steps: [
        {
          say: 'Persegi ini terdiri dari 9 kotak kecil. Sisinya 3 kotak, karena 3 kali 3 sama dengan 9.',
          clear: true,
          add: [...sq('a', 3, 110, 130, 30), T('sa', '3', 110, 70, { size: 20 }), T('la', 'luas 9', 110, 200, { size: 18 })],
        },
        {
          say: 'Persegi ini 16 kotak. Sisinya 4, karena 4 kali 4 sama dengan 16.',
          add: [...sq('b', 4, 285, 130, 26, 'acc-soft'), T('sb', '4', 285, 64, { size: 20 }), T('lb', 'luas 16', 285, 200, { size: 18 })],
        },
        {
          say: 'Mencari sisi dari luas disebut menarik akar kuadrat. Akar 9 sama dengan 3, akar 16 sama dengan 4.',
          add: [T('r', '√9 = 3      √16 = 4', 200, 250, { size: 28 })],
        },
      ],
    },
    {
      title: 'Tidak selalu bulat',
      steps: [
        {
          say: 'Bagaimana dengan akar 2? Tidak ada bilangan bulat yang dikali dirinya sendiri hasilnya 2. 1 kali 1 terlalu kecil, 2 kali 2 terlalu besar.',
          clear: true,
          add: [T('a', '1 × 1 = 1  (kurang)', 200, 50, { size: 20 }), T('b', '2 × 2 = 4  (lebih)', 200, 85, { size: 20 }), numberLine('nl', 200, 170, 340, 0, 3, { lsize: 14 }).el],
        },
        {
          say: 'Jadi akar 2 ada di antara 1 dan 2, kira-kira 1 koma 41. Angka di belakang komanya tidak pernah berhenti dan tidak berulang.',
          add: [dot('d', numberLine('nl', 200, 170, 340, 0, 3).at(1.414), 170, 'acc'), T('dl', '√2 ≈ 1,41', numberLine('nl', 200, 170, 340, 0, 3).at(1.414), 138, { size: 18, c: 'acc' })],
        },
        {
          say: 'Bilangan seperti ini disebut bilangan irasional. Kita biarkan saja dalam bentuk akar, yaitu akar 2.',
          add: [T('r', '√2 = 1,41421356… (tidak berhenti)', 200, 250, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Menyederhanakan akar',
      steps: [
        {
          say: 'Akar 12 bisa disederhanakan. Caranya: pecah 12 menjadi perkalian yang memuat bilangan kuadrat. 12 sama dengan 4 kali 3.',
          clear: true,
          add: [T('a', '√12 = √(4 × 3)', 200, 60, { size: 30 }), T('k', 'kuadrat: 4, 9, 16, 25, 36, …', 200, 100, { size: 15, c: 'mut' })],
        },
        {
          say: 'Akar 4 sama dengan 2, jadi angka 2 keluar dari akar. Hasilnya 2 akar 3.',
          add: [T('b', '= √4 × √3 = {a:2√3}', 200, 150, { size: 30 })],
        },
        {
          say: 'Contoh lain: akar 50 sama dengan akar 25 kali 2, yaitu 5 akar 2. Selalu cari bilangan kuadrat terbesar.',
          add: [T('c', '√50 = √(25 × 2) = 5√2', 200, 225, { size: 26 })],
        },
      ],
    },
    {
      title: 'Menjumlah bentuk akar',
      steps: [
        {
          say: 'Bentuk akar dijumlahkan seperti suku sejenis di aljabar. 3 akar 2 tambah 5 akar 2. Bayangkan akar 2 sebagai benda yang sama.',
          clear: true,
          add: [rt('p', 3, 2, 120, 80), T('plus', '+', 200, 80, { size: 30 }), rt('q', 5, 2, 280, 80)],
        },
        {
          say: '3 benda tambah 5 benda sama dengan 8 benda. Jadi 8 akar 2.',
          add: [T('r', '3√2 + 5√2 = {a:8√2}', 200, 145, { size: 28 })],
        },
        {
          say: 'Tapi akar 2 tambah akar 3 tidak bisa digabung, karena bendanya berbeda. Dan hasilnya bukan akar 5.',
          add: [rt('s', '', 2, 120, 210, { fill: 'pos-soft' }), T('plus2', '+', 200, 210, { size: 30 }), rt('t', '', 3, 280, 210, { fill: 'neg-soft' }), T('no', '√2 + √3 ≠ √5', 200, 262, { size: 22, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sederhanakan akar 18.',
          clear: true,
          add: [T('q', '√18 = ?', 200, 130, { size: 50 })],
          ask: {
            options: [
              { t: '3√2', ok: true, why: '18 = 9 × 2, dan √9 = 3.' },
              { t: '9√2', why: '18 = 9 × 2, tapi yang keluar adalah √9 = 3, bukan 9.' },
              { t: '2√3', why: '2√3 = √12. Cari bilangan kuadrat yang membagi 18: 9.' },
              { t: '6√3', why: '6√3 = √108. Coba 18 = 9 × 2.' },
            ],
          },
        },
        {
          say: '18 sama dengan 9 kali 2. Akar 9 sama dengan 3. Jadi akar 18 sama dengan 3 akar 2.',
          clear: true,
          add: [T('a', '√18 = √(9 × 2)', 200, 90, { size: 30 }), T('b', '= √9 × √2 = {a:3√2}', 200, 150, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Nilai dari √81 adalah …',
      ans: ['9'],
      wrong: { '40.5': '√81 bukan 81 ÷ 2. Cari bilangan yang jika dikuadratkan hasilnya 81.', '6561': 'Itu 81². Akar adalah kebalikan dari kuadrat.' },
      steps: ['9 × 9 = 81.', 'Jadi √81 = 9.'],
    },
    {
      q: 'Bentuk sederhana dari √48 adalah …',
      options: [
        { t: '4√3', ok: true },
        { t: '2√12', why: '√12 masih bisa disederhanakan. Pakai bilangan kuadrat terbesar: 48 = 16 × 3.' },
        { t: '16√3', why: 'Yang keluar dari akar adalah √16 = 4, bukan 16.' },
        { t: '3√4', why: '√4 = 2, jadi 3√4 = 6. Dan 6 × 6 = 36, bukan 48.' },
      ],
      steps: ['48 = 16 × 3 (16 bilangan kuadrat terbesar).', '√48 = √16 × √3 = 4√3.'],
    },
    {
      q: 'Hasil dari 2√5 + 7√5 adalah …',
      options: [
        { t: '9√5', ok: true },
        { t: '9√10', why: 'Akarnya tidak dijumlahkan. √5 seperti benda yang sama: 2 + 7 = 9 buah.' },
        { t: '14√5', why: 'Ini penjumlahan, bukan perkalian: 2 + 7 = 9.' },
        { t: '9', why: '√5 tetap ada. Hasilnya 9√5.' },
      ],
      steps: ['√5 sejenis, jadi koefisiennya dijumlahkan.', '2√5 + 7√5 = 9√5.'],
    },
    {
      q: '√30 terletak di antara …',
      options: [
        { t: '5 dan 6', ok: true },
        { t: '15 dan 16', why: '√30 bukan 30 ÷ 2. Cari kuadrat di sekitar 30: 25 dan 36.' },
        { t: '4 dan 5', why: '5² = 25 masih kurang dari 30, jadi √30 lebih dari 5.' },
        { t: '6 dan 7', why: '6² = 36 sudah lebih dari 30, jadi √30 kurang dari 6.' },
      ],
      steps: ['5² = 25 dan 6² = 36.', '25 < 30 < 36, jadi 5 < √30 < 6.'],
    },
    {
      q: 'Sebuah persegi luasnya 72 cm². Panjang sisinya adalah …',
      options: [
        { t: '6√2 cm', ok: true },
        { t: '36 cm', why: '36 = 72 ÷ 2. Sisi persegi = √luas.' },
        { t: '18 cm', why: '18 = 72 ÷ 4. Itu cara mencari sisi dari keliling.' },
        { t: '2√6 cm', why: '2√6 = √24. Seharusnya 72 = 36 × 2, jadi √72 = 6√2.' },
      ],
      steps: ['Sisi = √72.', '72 = 36 × 2, jadi √72 = 6√2 cm.'],
    },
  ],
};

export default {
  id: 'k8b1',
  no: 1,
  title: 'Bilangan Berpangkat dan Bentuk Akar',
  desc: 'Arti pangkat, sifat-sifatnya, pangkat nol dan negatif, notasi ilmiah, serta bentuk akar.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: `Bentuk sederhana dari (${P(2, 3)} × ${P(2, 5)}) ÷ ${P(2, 4)} adalah …`,
      options: [
        { t: P(2, 4), ok: true },
        { t: P(2, 11), why: '2³ × 2⁵ = 2⁸, lalu dibagi 2⁴ → 2⁸⁻⁴.' },
        { t: P(2, '15/4'), why: 'Pangkat dijumlah untuk perkalian, bukan dikalikan.' },
        { t: P(2, 2), why: '3 + 5 = 8, lalu 8 − 4 = 4.' },
      ],
      steps: ['2³ × 2⁵ = 2⁸.', '2⁸ ÷ 2⁴ = 2⁴.'],
    },
    {
      q: `Massa sebuah debu 0,0000032 gram. Dalam notasi ilmiah, massa debu itu adalah …`,
      options: [
        { t: `3,2 × ${P(10, '−6')} gram`, ok: true },
        { t: `3,2 × ${P(10, '−7')} gram`, why: 'Hitung lompatan koma ke kanan sampai melewati angka 3: ada 6.' },
        { t: `3,2 × ${P(10, 6)} gram`, why: 'Bilangannya kecil (kurang dari 1), jadi pangkatnya negatif.' },
        { t: `32 × ${P(10, '−7')} gram`, why: 'Nilainya sama, tapi angka depan notasi ilmiah harus antara 1 dan 10.' },
      ],
      steps: ['Koma dipindah ke kanan 6 kali: 0,0000032 → 3,2.', 'Ke kanan → pangkat negatif: 3,2 × 10⁻⁶.'],
    },
    {
      q: 'Hasil dari √12 + √27 adalah …',
      options: [
        { t: '5√3', ok: true },
        { t: '√39', why: 'Akar tidak bisa dijumlahkan langsung. Sederhanakan dulu: √12 = 2√3 dan √27 = 3√3.' },
        { t: '6√3', why: '√12 = 2√3 dan √27 = 3√3. 2 + 3 = 5.' },
        { t: '13√3', why: 'Yang keluar dari √12 adalah 2, dari √27 adalah 3.' },
      ],
      steps: ['√12 = √(4 × 3) = 2√3.', '√27 = √(9 × 3) = 3√3.', '2√3 + 3√3 = 5√3.'],
    },
  ],
};
