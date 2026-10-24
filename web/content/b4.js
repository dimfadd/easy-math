// Bab 4: Persamaan dan Pertidaksamaan Linear Satu Variabel
import { T, balance, numberLine, dot, ln, eqRow } from './helpers.js';

// ---------- Timbangan dengan kantong (x) dan beban satuan (1) ----------
const bagI = (id, x, y) => ({ id, t: 'icon', name: 'bag', x, y, size: 28, label: 'x' });
const unitI = (id, x, y) => ({ id, t: 'icon', name: 'unit', x, y, size: 16, fill: 'acc', label: '1' });

// Beban ditumpuk dari bawah, kolom demi kolom
function stack(ids, x0, yBase, cols) {
  return ids.map((id, i) => unitI(id, x0 + (i % cols) * 18, yBase - 10 - Math.floor(i / cols) * 18));
}

// spec: { tilt, lb: [id kantong kiri], lu: [id beban kiri], rb: [...], ru: [...] }
function scale({ tilt = 0, lb = [], lu = [], rb = [], ru = [] }) {
  const B = balance('bl', 200, 100, tilt, 118);
  const side = (P, bags, units) => {
    const els = bags.map((id, i) => bagI(id, P.x - 38 + i * 26, P.y - 16));
    const x0 = bags.length ? P.x - 38 + bags.length * 26 - 4 : P.x - 45;
    const cols = bags.length ? 2 : 6;
    return [...els, ...stack(units, x0, P.y, cols)];
  };
  return [...B.els, ...side(B.left, lb, lu), ...side(B.right, rb, ru)];
}
const ids = (p, a, b) => Array.from({ length: b - a }, (_, i) => `${p}${a + i}`);
const EQ = (text) => T('eq', text, 200, 248, { size: 30 });

// ---------- 4.1 Persamaan linear ----------
const l1 = {
  id: 'b4-1',
  title: 'Persamaan Linear Satu Variabel',
  hook: 'Persamaan itu timbangan yang seimbang. Apa pun yang kamu lakukan di satu sisi, lakukan juga di sisi lain.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '2x tambah 3 sama dengan 11. Berapa nilai x?',
          add: [T('q', '2x + 3 = 11', 200, 130, { size: 50 }), T('q2', 'x = ?', 200, 195, { size: 30, c: 'mut' })],
          ask: {
            options: [
              { t: '4', ok: true, why: 'Kita lihat dengan timbangan.' },
              { t: '8', why: '8 adalah nilai 2x. Satu x berarti 8 dibagi 2.' },
              { t: '7', why: 'Kurangi 3 dulu: 2x = 8, lalu bagi 2.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Timbangan seimbang',
      steps: [
        {
          say: 'Di kiri ada 2 kantong berisi x kilogram dan 3 beban 1 kilogram. Di kanan ada 11 beban 1 kilogram. Timbangannya seimbang.',
          clear: true,
          add: [...scale({ lb: ['b0', 'b1'], lu: ids('l', 0, 3), ru: ids('r', 0, 11) }), EQ('2x + 3 = 11')],
        },
        { say: 'Persamaan sama seperti timbangan yang seimbang: kiri sama berat dengan kanan.', hl: ['bl*'] },
      ],
    },
    {
      title: 'Ubah kedua sisi',
      steps: [
        {
          say: 'Coba ambil 3 beban dari kiri saja.',
          clear: true,
          add: [...scale({ tilt: 12, lb: ['b0', 'b1'], ru: ids('r', 0, 11) }), EQ('2x  ≠  11'), T('w', 'tidak seimbang lagi', 200, 284, { size: 15, c: 'neg' })],
        },
        {
          say: 'Timbangannya miring. Kalau hanya satu sisi yang diubah, persamaannya rusak. Kembalikan.',
          clear: true,
          add: [...scale({ lb: ['b0', 'b1'], lu: ids('l', 0, 3), ru: ids('r', 0, 11) }), EQ('2x + 3 = 11')],
        },
        {
          say: 'Sekarang ambil 3 beban dari kedua sisi. Tetap seimbang.',
          clear: true,
          add: [...scale({ lb: ['b0', 'b1'], ru: ids('r', 3, 11) }), EQ('2x = 8'), T('w', 'kedua sisi dikurangi 3', 200, 284, { size: 15, c: 'acc' })],
        },
        {
          say: 'Dua kantong seberat 8. Bagi dua kedua sisi: satu kantong seberat 4.',
          clear: true,
          add: [...scale({ lb: ['b0'], ru: ids('r', 3, 7) }), EQ('x = {p:4}'), T('w', 'kedua sisi dibagi 2', 200, 284, { size: 15, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Cek jawaban',
      steps: [
        {
          say: 'Selalu cek dengan mengganti x dengan 4. 2 kali 4 sama dengan 8, tambah 3 sama dengan 11. Benar.',
          clear: true,
          add: [T('c1', '2x + 3 = 11', 200, 80, { size: 30 }), T('c2', '2 × {p:4} + 3', 200, 145, { size: 30 }), T('c3', '= 8 + 3 = 11  ✓', 200, 205, { size: 30, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Variabel di dua sisi',
      steps: [
        { say: 'Kalau x ada di kedua sisi, kumpulkan dulu suku x di satu sisi. Contoh: 5x kurang 2 sama dengan 3x tambah 6.', clear: true, add: [T('a', '5x − 2 = 3x + 6', 170, 55, { size: 30 })] },
        { say: 'Kurangi kedua sisi dengan 3x.', add: [T('b', '2x − 2 = 6', 170, 115, { size: 30 }), T('bn', '(− 3x)', 335, 115, { size: 17, c: 'acc' })] },
        { say: 'Tambah kedua sisi dengan 2.', add: [T('c', '2x = 8', 170, 175, { size: 30 }), T('cn', '(+ 2)', 335, 175, { size: 17, c: 'acc' })] },
        { say: 'Bagi kedua sisi dengan 2. Jadi x sama dengan 4.', add: [T('d', 'x = {p:4}', 170, 235, { size: 32 }), T('dn', '(÷ 2)', 335, 235, { size: 17, c: 'acc' })] },
      ],
    },
    {
      title: 'Soal cerita',
      steps: [
        {
          say: 'Harga 3 buku dan 1 pena adalah 25 ribu rupiah. Harga pena 4 ribu rupiah. Berapa harga satu buku?',
          clear: true,
          add: [T('s', '3 buku + 1 pena = Rp25.000', 200, 52, { size: 20 }), T('s2', 'pena = Rp4.000', 200, 84, { size: 18, c: 'mut' })],
        },
        { say: 'Misalkan harga satu buku x rupiah. Persamaannya 3x tambah 4000 sama dengan 25000.', add: [T('e1', '3x + 4.000 = 25.000', 200, 135, { size: 28 })] },
        { say: 'Kurangi kedua sisi dengan 4000: 3x sama dengan 21000.', add: [T('e2', '3x = 21.000', 200, 190, { size: 28 })] },
        { say: 'Bagi 3: x sama dengan 7000. Harga satu buku 7 ribu rupiah.', add: [T('e3', 'x = {p:7.000}', 200, 245, { size: 30 })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 4x kurang 5 sama dengan 19. Berapa x?',
          clear: true,
          add: [T('q', '4x − 5 = 19', 200, 140, { size: 50 })],
          ask: {
            options: [
              { t: '6', ok: true, why: 'Tambah 5: 4x = 24, lalu bagi 4.' },
              { t: '3,5', why: 'Untuk menghilangkan −5, kedua sisi ditambah 5, bukan dikurangi: 4x = 24.' },
              { t: '24', why: '24 adalah nilai 4x. Bagi 4 untuk mendapat x.' },
            ],
          },
        },
        {
          say: 'Tambah 5 di kedua sisi: 4x sama dengan 24. Bagi 4: x sama dengan 6. Cek: 4 kali 6 kurang 5 sama dengan 19.',
          set: { q: { y: 60, size: 32 } },
          add: [T('a', '4x = 24', 200, 125, { size: 30 }), T('b', 'x = {p:6}', 200, 185, { size: 32 }), T('c', 'cek: 4 × 6 − 5 = 19  ✓', 200, 245, { size: 20, c: 'ok' })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jika x + 9 = 4, maka x = …',
      ans: ['-5'],
      wrong: { '13': 'Untuk menghilangkan +9, kedua sisi dikurangi 9: x = 4 − 9.', '5': '4 − 9 = {n:−5}, hasilnya negatif.' },
      steps: ['Kurangi kedua sisi dengan 9.', 'x = 4 − 9 = {n:−5}.', 'Cek: {n:−5} + 9 = 4.'],
    },
    {
      type: 'num',
      q: 'Jika 3x − 7 = 14, maka x = …',
      ans: ['7'],
      wrong: { '21': 'Itu nilai 3x. Bagi 3 untuk mendapat x.', '7/3': 'Untuk menghilangkan −7, kedua sisi ditambah 7: 3x = 21.' },
      steps: ['Tambah 7 di kedua sisi: 3x = 21.', 'Bagi 3: x = 7.', 'Cek: 3 × 7 − 7 = 14.'],
    },
    {
      q: 'Penyelesaian dari 6x + 4 = 2x − 12 adalah …',
      options: [
        { t: 'x = {n:−4}', ok: true },
        { t: 'x = 4', why: '−12 − 4 = −16, jadi 4x = −16 dan x negatif.' },
        { t: 'x = {n:−2}', why: '6x − 2x = 4x, bukan 8x. Jadi x = −16 ÷ 4.' },
        { t: 'x = 2', why: 'Kurangi kedua sisi dengan 2x dan 4: 4x = −16.' },
      ],
      steps: ['Kurangi kedua sisi dengan 2x: 4x + 4 = −12.', 'Kurangi kedua sisi dengan 4: 4x = −16.', 'Bagi 4: x = {n:−4}.'],
    },
    {
      q: 'Jumlah tiga bilangan genap berurutan adalah 66. Bilangan yang terkecil adalah …',
      options: [
        { t: '20', ok: true },
        { t: '22', why: '22 adalah bilangan yang tengah.' },
        { t: '21', why: 'Bilangan genap berurutan berselisih 2, dan 21 bukan bilangan genap.' },
        { t: '18', why: 'Cek: 18 + 20 + 22 = 60, bukan 66.' },
      ],
      steps: ['Misalkan bilangan terkecil x. Ketiganya: x, x + 2, x + 4.', 'x + x + 2 + x + 4 = 66, jadi 3x + 6 = 66.', '3x = 60, x = 20. Cek: 20 + 22 + 24 = 66.'],
    },
    {
      q: 'Nilai x yang memenuhi 2(x − 3) = 10 adalah …',
      options: [
        { t: '8', ok: true },
        { t: '6,5', why: '2 dikalikan juga ke −3: 2x − 6 = 10, bukan 2x − 3 = 10.' },
        { t: '2', why: 'Setelah dibagi 2: x − 3 = 5, jadi x = 5 + 3.' },
        { t: '13', why: 'Bagi kedua sisi dengan 2 dulu: x − 3 = 5.' },
      ],
      steps: ['Bagi kedua sisi dengan 2: x − 3 = 5.', 'Tambah 3: x = 8.', 'Cek: 2 × (8 − 3) = 10.'],
    },
  ],
};

// ---------- 4.2 Pertidaksamaan linear ----------
const NL = numberLine('nl', 200, 150, 380, -6, 6);
const ray = (id, from, toX, o = {}) => ln(id, from, 150, toX, 150, { c: 'acc', sw: 6, arrow: 'end', z: 1, ...o });
const openDot = (id, v) => dot(id, NL.at(v), 150, 'paper', { stroke: 'acc', sw: 3, z: 2 });
const fullDot = (id, v) => dot(id, NL.at(v), 150, 'acc', { stroke: 'ink', sw: 2, z: 2 });

const l2 = {
  id: 'b4-2',
  title: 'Pertidaksamaan Linear Satu Variabel',
  hook: 'Kenapa tanda < bisa berubah jadi > saat dibagi bilangan negatif? Lihat apa yang terjadi di garis bilangan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Negatif 2x kurang dari 6. Penyelesaiannya apa?',
          add: [T('q', '−2x < 6', 200, 140, { size: 50 })],
          ask: {
            options: [
              { t: 'x > −3', ok: true, why: 'Kita lihat kenapa tandanya berbalik.' },
              { t: 'x < −3', why: 'Saat kedua sisi dibagi bilangan negatif, tanda pertidaksamaan harus dibalik.' },
              { t: 'x > 3', why: '6 dibagi −2 hasilnya −3, bukan 3.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Arti pertidaksamaan',
      steps: [
        {
          say: 'x kurang dari 3 tidak punya satu jawaban saja. Semua bilangan di kiri 3 memenuhi.',
          clear: true,
          add: [T('q', 'x < 3', 200, 60, { size: 34 }), NL.el, ray('r', NL.at(3) - 9, 22), openDot('o', 3)],
        },
        {
          say: 'Bulatan kosong artinya 3 tidak termasuk. 2, 0, minus 5, semuanya memenuhi, tapi 3 tidak.',
          add: [T('n1', 'bulatan kosong: 3 tidak termasuk', 200, 222, { size: 17 })],
        },
        {
          say: 'Kalau x kurang dari atau sama dengan 3, bulatannya diisi, karena 3 ikut termasuk.',
          set: { q: { text: 'x ≤ 3' }, n1: { text: 'bulatan penuh: 3 termasuk' } },
          del: ['o'],
          add: [fullDot('f', 3)],
        },
      ],
    },
    {
      title: 'Timbangan miring',
      steps: [
        {
          say: 'x tambah 2 lebih berat dari 5. Timbangannya miring ke kiri.',
          clear: true,
          add: [...scale({ tilt: -10, lb: ['b0'], lu: ids('l', 0, 2), ru: ids('r', 0, 5) }), EQ('x + 2 > 5')],
        },
        {
          say: 'Ambil 2 beban dari kedua sisi. Timbangannya tetap miring ke arah yang sama.',
          clear: true,
          add: [...scale({ tilt: -10, lb: ['b0'], ru: ids('r', 2, 5) }), EQ('x > {p:3}')],
        },
        { say: 'Jadi x lebih dari 3. Menambah atau mengurangi kedua sisi tidak mengubah arah tanda.', hl: ['eq'] },
      ],
    },
    {
      title: 'Dikali negatif, tanda dibalik',
      steps: [
        {
          say: '2 kurang dari 5. Di garis bilangan, 2 ada di kiri 5.',
          clear: true,
          add: [NL.el, dot('a', NL.at(2), 150, 'pos'), dot('b', NL.at(5), 150, 'pos'), T('la', '2', NL.at(2), 112, { size: 24 }), T('lb', '5', NL.at(5), 112, { size: 24 }), T('s', '2 < 5', 200, 235, { size: 32 })],
        },
        {
          say: 'Sekarang kalikan keduanya dengan minus 1. 2 menjadi minus 2, 5 menjadi minus 5. Posisinya dicerminkan terhadap nol.',
          set: { a: { x: NL.at(-2), fill: 'neg' }, b: { x: NL.at(-5), fill: 'neg' }, la: { x: NL.at(-2), text: '{n:−2}' }, lb: { x: NL.at(-5), text: '{n:−5}' } },
        },
        {
          say: 'Sekarang minus 5 ada di kiri minus 2. Urutannya terbalik: minus 2 lebih dari minus 5. Karena itu, saat dikali atau dibagi bilangan negatif, tanda pertidaksamaan harus dibalik.',
          set: { s: { text: '{n:−2} > {n:−5}' } },
          add: [T('n', 'dikali −1: tanda < berubah jadi >', 200, 272, { size: 17, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Contoh',
      steps: [
        { say: 'Kembali ke soal tadi: negatif 2x kurang dari 6.', clear: true, add: [T('a', '−2x < 6', 200, 55, { size: 32 })] },
        { say: 'Bagi kedua sisi dengan minus 2. Karena pembaginya negatif, tanda kurang dari dibalik menjadi lebih dari.', add: [T('b', 'x > {n:−3}', 200, 110, { size: 34 }), T('bn', '(÷ −2, tanda dibalik)', 200, 148, { size: 16, c: 'acc' })] },
        {
          say: 'Di garis bilangan: bulatan kosong di minus 3, lalu arsir ke kanan.',
          add: [{ ...NL.el, y: 210 }, ln('r', NL.at(-3) + 9, 210, 378, 210, { c: 'acc', sw: 6, arrow: 'end', z: 1 }), dot('o', NL.at(-3), 210, 'paper', { stroke: 'acc', sw: 3, z: 2 })],
        },
      ],
    },
    {
      title: 'Soal cerita',
      steps: [
        {
          say: 'Rani punya uang 50 ribu rupiah. Ia membeli buku tulis seharga 6 ribu per buah, dan ingin sisa uangnya paling sedikit 8 ribu. Paling banyak berapa buku yang bisa dibeli?',
          clear: true,
          add: [T('s1', 'Uang Rp50.000, buku Rp6.000/buah', 200, 48, { size: 19 }), T('s2', 'sisa paling sedikit Rp8.000', 200, 78, { size: 17, c: 'mut' })],
        },
        { say: 'Misalkan banyak buku x. Uang yang dipakai ditambah sisa 8 ribu tidak boleh lebih dari 50 ribu.', add: [T('e1', '6.000x + 8.000 ≤ 50.000', 200, 130, { size: 26 })] },
        { say: 'Kurangi 8000: 6000x kurang dari atau sama dengan 42000. Bagi 6000: x kurang dari atau sama dengan 7.', add: [T('e2', '6.000x ≤ 42.000', 200, 182, { size: 26 }), T('e3', 'x ≤ 7', 200, 232, { size: 30 })] },
        { say: 'Jadi paling banyak 7 buku.', add: [T('e4', 'paling banyak {p:7 buku}', 200, 274, { size: 20 })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 3 kurang x lebih dari atau sama dengan 5. Penyelesaiannya?',
          clear: true,
          add: [T('q', '3 − x ≥ 5', 200, 140, { size: 50 })],
          ask: {
            options: [
              { t: 'x ≤ −2', ok: true, why: '−x ≥ 2, lalu dikali −1 dan tandanya dibalik.' },
              { t: 'x ≥ −2', why: 'Saat dikali atau dibagi −1, tanda ≥ harus dibalik menjadi ≤.' },
              { t: 'x ≤ 2', why: '−x ≥ 2 berarti x ≤ −2. Tanda dibalik dan angkanya ikut berubah tanda.' },
            ],
          },
        },
        {
          say: 'Kurangi 3 di kedua sisi: negatif x lebih dari atau sama dengan 2. Kalikan minus 1 dan balik tandanya: x kurang dari atau sama dengan minus 2.',
          set: { q: { y: 55, size: 32 } },
          add: [T('a', '−x ≥ 2', 200, 110, { size: 30 }), T('b', 'x ≤ {n:−2}', 200, 165, { size: 32 }), { ...NL.el, y: 235 }, ln('r', NL.at(-2) - 9, 235, 22, 235, { c: 'acc', sw: 6, arrow: 'end', z: 1 }), dot('f', NL.at(-2), 235, 'acc', { stroke: 'ink', sw: 2, z: 2 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Penyelesaian dari 2x + 1 > 9 adalah …',
      options: [
        { t: 'x > 4', ok: true },
        { t: 'x < 4', why: 'Pembaginya 2 (positif), jadi tandanya tidak dibalik.' },
        { t: 'x > 5', why: 'Kurangi 1 dulu: 2x > 8, lalu bagi 2.' },
        { t: 'x > 8', why: '8 adalah batas untuk 2x. Bagi 2 untuk x.' },
      ],
      steps: ['Kurangi 1: 2x > 8.', 'Bagi 2 (positif, tanda tetap): x > 4.'],
    },
    {
      q: 'Penyelesaian dari −3x ≤ 12 adalah …',
      options: [
        { t: 'x ≥ −4', ok: true },
        { t: 'x ≤ −4', why: 'Pembaginya −3 (negatif), jadi tanda ≤ harus dibalik menjadi ≥.' },
        { t: 'x ≥ 4', why: '12 dibagi −3 hasilnya −4.' },
        { t: 'x ≤ 4', why: 'Bagi −3: angkanya jadi −4 dan tandanya dibalik.' },
      ],
      steps: ['Bagi kedua sisi dengan −3.', 'Karena pembaginya negatif, tanda dibalik: x ≥ −4.'],
    },
    {
      q: 'Garis bilangan berikut menunjukkan penyelesaian …',
      fig: [numberLine('f', 200, 150, 380, -6, 6).el, ln('r', numberLine('f', 200, 150, 380, -6, 6).at(-1) + 9, 150, 378, 150, { c: 'acc', sw: 6, arrow: 'end', z: 1 }), dot('o', numberLine('f', 200, 150, 380, -6, 6).at(-1), 150, 'paper', { stroke: 'acc', sw: 3, z: 2 })],
      viewBox: '0 120 400 70',
      figLabel: 'Garis bilangan dengan bulatan kosong di −1 dan arsiran ke kanan',
      options: [
        { t: 'x > −1', ok: true },
        { t: 'x ≥ −1', why: 'Bulatan kosong berarti −1 tidak termasuk, jadi tandanya > (bukan ≥).' },
        { t: 'x < −1', why: 'Arsirannya ke kanan, ke arah bilangan yang lebih besar.' },
        { t: 'x ≤ −1', why: 'Arsirannya ke kanan dan bulatannya kosong.' },
      ],
      steps: ['Arsiran ke kanan: x lebih besar.', 'Bulatan kosong: −1 tidak termasuk. Jadi x > −1.'],
    },
    {
      q: 'Lift dapat mengangkut paling banyak 500 kg. Seorang petugas (70 kg) membawa kotak-kotak yang masing-masing 30 kg. Paling banyak berapa kotak yang bisa ikut?',
      options: [
        { t: '14 kotak', ok: true },
        { t: '15 kotak', why: '70 + 15 × 30 = 520 kg, melebihi 500 kg.' },
        { t: '16 kotak', why: 'Berat petugas juga ikut dihitung: 70 + 30x ≤ 500.' },
        { t: '14,3 kotak', why: 'Kotak harus utuh. Ambil bilangan bulat terbesar yang memenuhi.' },
      ],
      steps: ['70 + 30x ≤ 500.', '30x ≤ 430, x ≤ 14,33…', 'Kotak harus utuh: paling banyak 14.'],
    },
    {
      q: 'Bilangan bulat yang memenuhi −2 < x ≤ 1 adalah …',
      options: [
        { t: '−1, 0, 1', ok: true },
        { t: '−2, −1, 0, 1', why: '−2 tidak termasuk karena tandanya < (bukan ≤).' },
        { t: '−1, 0', why: '1 termasuk karena tandanya ≤.' },
        { t: '−2, −1, 0', why: '−2 tidak termasuk, sedangkan 1 termasuk.' },
      ],
      steps: ['x lebih dari −2: −2 tidak ikut.', 'x kurang dari atau sama dengan 1: 1 ikut.', 'Bilangan bulatnya: −1, 0, 1.'],
    },
  ],
};

export default {
  id: 'b4',
  no: 4,
  title: 'Persamaan dan Pertidaksamaan Linear',
  desc: 'Menyelesaikan persamaan dan pertidaksamaan linear satu variabel, termasuk soal cerita.',
  lessons: [l1, l2],
  extra: [
    {
      type: 'num',
      q: 'Jika 5(x + 2) = 3x + 18, maka x = …',
      ans: ['4'],
      wrong: { '8': '8 adalah nilai 2x. Bagi 2: x = 4.', '2': '5(x + 2) = 5x + 10. Jadi 5x + 10 = 3x + 18, 2x = 8.' },
      steps: ['Buka kurung: 5x + 10 = 3x + 18.', 'Kurangi 3x dan 10: 2x = 8.', 'x = 4. Cek: 5 × 6 = 30 dan 3 × 4 + 18 = 30.'],
    },
    {
      q: 'Keliling persegi panjang 46 cm. Panjangnya 5 cm lebih dari lebarnya. Lebar persegi panjang itu adalah …',
      options: [
        { t: '9 cm', ok: true },
        { t: '14 cm', why: 'Itu panjangnya (9 + 5).' },
        { t: '20,5 cm', why: 'Keliling = 2 × (panjang + lebar), bukan panjang + lebar.' },
        { t: '11,5 cm', why: 'Panjang = lebar + 5 harus ikut dihitung: 2(l + l + 5) = 46.' },
      ],
      steps: ['Misalkan lebar l, panjang l + 5.', '2(l + l + 5) = 46, jadi 4l + 10 = 46.', '4l = 36, l = 9 cm.'],
    },
    {
      q: 'Nilai x yang memenuhi x/3 − 2 = 4 adalah …',
      options: [
        { t: '18', ok: true },
        { t: '6', why: '6 adalah nilai x/3. Kalikan 3 untuk mendapat x.' },
        { t: '2', why: 'Tambah 2 dulu: x/3 = 6, lalu kali 3.' },
        { t: '10', why: 'x/3 = 6 berarti x = 6 × 3.' },
      ],
      steps: ['Tambah 2: x/3 = 6.', 'Kali 3: x = 18.'],
    },
  ],
};
