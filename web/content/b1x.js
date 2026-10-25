// Bab 1 (lanjutan): Faktor, Kelipatan, Bilangan Prima, FPB dan KPK
import { T, box, ln, numberLine, dot, hop, range, table } from './helpers.js';

// ---------- 1.5 Faktor, kelipatan, dan bilangan prima ----------
const cookie = (id, x, y, fill = 'acc') => ({ id, t: 'circle', x, y, r: 11, fill, stroke: 'ink', sw: 1.5 });
// susun n kue menjadi `rows` baris, berpusat di (cx, cy)
function grid(prefix, n, rows, cx, cy, d = 30) {
  const cols = Math.ceil(n / rows);
  const out = {};
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    out[`${prefix}${i}`] = { x: cx + (c - (cols - 1) / 2) * d, y: cy + (r - (rows - 1) / 2) * d };
  }
  return out;
}
// susun `rows` baris rapi, sisa kue diletakkan terpisah di kanan
function leftover(prefix, n, rows, cx, cy, d = 30) {
  const cols = Math.floor(n / rows);
  const out = grid(prefix, cols * rows, rows, cx - d * 0.8, cy, d);
  for (let i = cols * rows; i < n; i++) {
    const k = i - cols * rows;
    out[`${prefix}${i}`] = { x: cx - d * 0.8 + ((cols - 1) / 2) * d + d * 1.6, y: cy - ((rows - 1) / 2) * d + k * d, fill: 'neg-soft' };
  }
  return out;
}
const cookies = (prefix, n, rows, cx, cy, d, fill) => {
  const pos = grid(prefix, n, rows, cx, cy, d);
  return range(0, n).map((i) => cookie(`${prefix}${i}`, pos[`${prefix}${i}`].x, pos[`${prefix}${i}`].y, fill));
};

// pohon faktor
const node = (id, x, y, v, prime = false) => ({ id, t: 'circle', x, y, r: 19, fill: prime ? 'acc' : 'paper', stroke: 'ink', sw: 2, label: String(v), lsize: 17, lc: prime ? 'onacc' : 'ink' });

const NL4 = numberLine('nk', 200, 160, 360, 0, 24, { every: 2, lsize: 12 });

const l5 = {
  id: 'b1-5',
  title: 'Faktor, Kelipatan, dan Bilangan Prima',
  hook: '12 kue bisa disusun rapi dengan beberapa cara. Setiap cara menunjukkan faktor dari 12.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 12 kue. Kamu ingin menyusunnya menjadi persegi panjang yang rapi, setiap baris sama banyak. Ada berapa cara?',
          add: [...cookies('k', 12, 1, 200, 120, 30), T('q', '12 kue, disusun rapi. Ada berapa cara?', 200, 220, { size: 20, w: 700 })],
          ask: {
            options: [
              { t: '3 cara', ok: true, why: '1 baris isi 12, 2 baris isi 6, dan 3 baris isi 4. Mari kita lihat.' },
              { t: '2 cara', why: 'Masih ada yang terlewat. Coba juga 3 baris.' },
              { t: '12 cara', why: 'Tidak semua banyak baris bisa rapi. Misalnya 5 baris pasti ada yang kurang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Faktor = cara menyusun',
      steps: [
        {
          say: 'Cara pertama: 1 baris berisi 12 kue. Jadi 1 kali 12 sama dengan 12.',
          clear: true,
          add: [...cookies('k', 12, 1, 200, 110, 30), T('e', '1 × 12 = 12', 200, 220, { size: 28 })],
        },
        {
          say: 'Cara kedua: 2 baris, masing-masing 6 kue. 2 kali 6 sama dengan 12.',
          set: { ...grid('k', 12, 2, 200, 110, 34), e: { text: '2 × 6 = 12' } },
        },
        {
          say: 'Cara ketiga: 3 baris, masing-masing 4 kue. 3 kali 4 sama dengan 12.',
          set: { ...grid('k', 12, 3, 200, 110, 34), e: { text: '3 × 4 = 12' } },
        },
        {
          say: 'Coba 5 baris. Setiap baris dapat 2, tapi tersisa 2 kue. Tidak rapi, jadi 5 bukan faktor dari 12.',
          set: { ...leftover('k', 12, 5, 200, 110, 26), e: { text: '5 baris: {n:sisa 2}' } },
        },
        {
          say: 'Semua bilangan yang dipakai untuk menyusun rapi disebut faktor. Faktor dari 12 adalah 1, 2, 3, 4, 6, dan 12.',
          set: { ...grid('k', 12, 3, 200, 100, 30), 'k*': { fill: 'acc' }, e: { text: 'faktor 12: {a:1, 2, 3, 4, 6, 12}', y: 210 } },
          add: [T('e2', 'faktor = bilangan yang membagi habis', 200, 255, { size: 17, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Faktor berpasangan',
      steps: [
        {
          say: 'Faktor selalu datang berpasangan. Mencarinya dari 1 ke atas, lalu pasangkan.',
          clear: true,
          add: [T('h', 'faktor dari 18', 200, 40, { size: 22, font: 'serif', w: 600 }), T('p1', '1 × 18', 200, 90, { size: 24 })],
        },
        { say: '2 kali 9 sama dengan 18.', add: [T('p2', '2 × 9', 200, 130, { size: 24 })] },
        { say: '3 kali 6 sama dengan 18.', add: [T('p3', '3 × 6', 200, 170, { size: 24 })] },
        {
          say: '4 dan 5 tidak membagi habis 18. Setelah 6, pasangannya sudah pernah muncul, jadi kita berhenti.',
          add: [T('x', '4 dan 5 tidak bisa', 200, 210, { size: 18, c: 'neg' })],
        },
        { say: 'Jadi faktor dari 18 adalah 1, 2, 3, 6, 9, dan 18.', add: [T('r', '{a:1, 2, 3, 6, 9, 18}', 200, 255, { size: 26 })] },
      ],
    },
    {
      title: 'Kelipatan',
      steps: [
        {
          say: 'Kelipatan itu kebalikannya. Kelipatan 4 didapat dengan melompat 4 langkah terus-menerus dari nol.',
          clear: true,
          add: [NL4.el, dot('z', NL4.at(0), 160, 'ink')],
        },
        ...[4, 8, 12, 16, 20, 24].map((v, i) => ({
          say: i === 0 ? '4.' : i === 5 ? '24, dan seterusnya.' : `${v}.`,
          add: [hop(`h${i}`, NL4.at(v - 4), NL4.at(v), 160, { label: '+4', c: 'pos' }), dot(`m${i}`, NL4.at(v), 160, 'pos')],
        })),
        {
          say: 'Kelipatan 4 adalah 4, 8, 12, 16, 20, 24, dan seterusnya. Kelipatan tidak pernah habis.',
          add: [T('r', 'kelipatan 4: {p:4, 8, 12, 16, 20, 24, …}', 200, 240, { size: 20 })],
        },
        {
          say: 'Hubungannya: 3 adalah faktor dari 12, dan 12 adalah kelipatan dari 3.',
          add: [T('r2', '3 faktor dari 12, jadi 12 kelipatan 3', 200, 275, { size: 17, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Bilangan prima',
      steps: [
        {
          say: 'Sekarang 7 kue. Satu baris berisi 7 bisa.',
          clear: true,
          add: [...cookies('k', 7, 1, 200, 110, 34), T('e', '1 × 7', 200, 210, { size: 28 })],
        },
        {
          say: 'Dua baris? Setiap baris dapat 3, tapi satu kue tersisa.',
          set: { ...leftover('k', 7, 2, 200, 110, 34), e: { text: '2 baris: {n:sisa 1}' } },
        },
        {
          say: '7 hanya bisa disusun satu baris. Faktornya hanya 1 dan 7. Bilangan seperti ini disebut bilangan prima.',
          set: { ...grid('k', 7, 1, 200, 110, 34), 'k*': { fill: 'acc' }, e: { text: 'faktor 7: 1 dan 7 saja' } },
          add: [T('p', 'bilangan {a:prima}: faktornya tepat dua', 200, 255, { size: 19 })],
        },
        {
          say: 'Bilangan prima yang kecil: 2, 3, 5, 7, 11, 13, 17, 19. Angka 1 bukan prima, karena faktornya hanya satu.',
          clear: true,
          add: [
            ...[2, 3, 5, 7, 11, 13, 17, 19].map((v, i) => node(`pr${i}`, 60 + (i % 4) * 93, 90 + Math.floor(i / 4) * 60, v, true)),
            T('n1', '1 bukan prima: faktornya hanya 1', 200, 230, { size: 18, c: 'neg' }),
            T('n2', '2 satu-satunya prima yang genap', 200, 265, { size: 18, c: 'mut' }),
          ],
        },
      ],
    },
    {
      title: 'Pohon faktor',
      steps: [
        {
          say: 'Setiap bilangan bisa dipecah sampai tinggal bilangan prima. Kita pakai pohon faktor. Mulai dari 36.',
          clear: true,
          add: [node('n0', 200, 45, 36)],
        },
        {
          say: '36 sama dengan 4 kali 9.',
          add: [ln('e1', 190, 60, 150, 105, { sw: 2.5 }), ln('e2', 210, 60, 250, 105, { sw: 2.5 }), node('n1', 140, 120, 4), node('n2', 260, 120, 9)],
        },
        {
          say: '4 dipecah menjadi 2 kali 2. 9 dipecah menjadi 3 kali 3. Semuanya sudah prima, jadi pohonnya selesai.',
          add: [
            ln('e3', 132, 136, 112, 178, { sw: 2.5 }),
            ln('e4', 148, 136, 168, 178, { sw: 2.5 }),
            ln('e5', 252, 136, 232, 178, { sw: 2.5 }),
            ln('e6', 268, 136, 288, 178, { sw: 2.5 }),
            node('n3', 108, 195, 2, true),
            node('n4', 172, 195, 2, true),
            node('n5', 228, 195, 3, true),
            node('n6', 292, 195, 3, true),
          ],
        },
        {
          say: 'Kalikan semua daun yang kuning: 2 kali 2 kali 3 kali 3. Ditulis singkat: 2 pangkat 2 kali 3 pangkat 2. Ini disebut faktorisasi prima.',
          add: [T('r', '36 = 2 × 2 × 3 × 3 = {a:2² × 3²}', 200, 258, { size: 24 })],
          pulse: ['n3', 'n4', 'n5', 'n6'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Manakah yang termasuk bilangan prima?',
          clear: true,
          add: [T('q', 'Mana yang bilangan prima?', 200, 120, { size: 26 }), T('q2', '9   ·   15   ·   17   ·   21', 200, 175, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '17', ok: true, why: '17 hanya bisa dibagi 1 dan 17.' },
              { t: '9', why: '9 = 3 × 3, jadi 3 adalah faktornya.' },
              { t: '15', why: '15 = 3 × 5.' },
              { t: '21', why: '21 = 3 × 7.' },
            ],
          },
        },
        {
          say: '17 tidak bisa disusun rapi selain satu baris. Faktornya hanya 1 dan 17. Jadi 17 prima.',
          clear: true,
          add: [...cookies('k', 17, 1, 200, 110, 21), T('r', '17 = 1 × 17 saja → {a:prima}', 200, 200, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Faktor dari 20 adalah …',
      options: [
        { t: '1, 2, 4, 5, 10, 20', ok: true },
        { t: '2, 4, 5, 10', why: '1 dan 20 juga faktor, karena 1 × 20 = 20.' },
        { t: '20, 40, 60, 80', why: 'Itu kelipatan 20, bukan faktornya.' },
        { t: '1, 2, 3, 4, 5, 10, 20', why: '3 tidak membagi habis 20.' },
      ],
      steps: ['Pasangan: 1 × 20, 2 × 10, 4 × 5.', 'Faktor 20: 1, 2, 4, 5, 10, 20.'],
    },
    {
      q: 'Bilangan berikut yang merupakan kelipatan 6 adalah …',
      options: [
        { t: '42', ok: true },
        { t: '3', why: '3 adalah faktor dari 6, bukan kelipatannya.' },
        { t: '26', why: '26 ÷ 6 = 4 sisa 2. Tidak habis.' },
        { t: '33', why: '33 ÷ 6 = 5 sisa 3. Tidak habis.' },
      ],
      steps: ['Kelipatan 6: 6, 12, 18, 24, 30, 36, 42, …', '42 = 6 × 7.'],
    },
    {
      q: 'Bilangan prima di antara 20 dan 30 adalah …',
      options: [
        { t: '23 dan 29', ok: true },
        { t: '21, 23, 27, 29', why: '21 = 3 × 7 dan 27 = 3 × 9, jadi bukan prima.' },
        { t: '23 saja', why: '29 juga prima, faktornya hanya 1 dan 29.' },
        { t: '25 dan 27', why: '25 = 5 × 5 dan 27 = 3 × 9.' },
      ],
      steps: ['Bilangan genap pasti bukan prima (habis dibagi 2).', 'Cek yang ganjil: 21 = 3 × 7, 23 prima, 25 = 5 × 5, 27 = 3 × 9, 29 prima.'],
    },
    {
      q: 'Faktorisasi prima dari 24 adalah …',
      options: [
        { t: '2³ × 3', ok: true },
        { t: '4 × 6', why: '4 dan 6 bukan bilangan prima. Pecah lagi sampai prima.' },
        { t: '2 × 3', why: '2 × 3 = 6, bukan 24.' },
        { t: '2² × 3²', why: '2² × 3² = 4 × 9 = 36, bukan 24.' },
      ],
      steps: ['24 = 4 × 6.', '4 = 2 × 2 dan 6 = 2 × 3.', '24 = 2 × 2 × 2 × 3 = 2³ × 3.'],
    },
    {
      type: 'num',
      q: 'Berapa banyak faktor dari 16?',
      ans: ['5'],
      wrong: { '4': 'Jangan lupa 16 sendiri: 1, 2, 4, 8, 16.', '6': '4 × 4 hanya dihitung sekali. Faktornya 1, 2, 4, 8, 16.' },
      steps: ['Pasangan: 1 × 16, 2 × 8, 4 × 4.', 'Faktor 16: 1, 2, 4, 8, 16. Ada 5.'],
    },
  ],
};

// ---------- 1.6 FPB dan KPK ----------
const apple = (id, x, y) => ({ id, t: 'circle', x, y, r: 8, fill: 'neg', stroke: 'ink', sw: 1.5 });
const orange = (id, x, y) => ({ id, t: 'circle', x, y, r: 8, fill: 'acc', stroke: 'ink', sw: 1.5 });
const BX = range(0, 6).map((i) => 45 + i * 62);
const NLK = numberLine('nl', 200, 150, 360, 0, 24, { every: 2, lsize: 12 });

const l6 = {
  id: 'b1-6',
  title: 'FPB dan KPK',
  hook: 'FPB untuk membagi rata sebanyak mungkin. KPK untuk mencari kapan dua hal terjadi bersamaan lagi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ada 12 apel dan 18 jeruk. Semuanya dimasukkan ke keranjang. Isi setiap keranjang harus sama persis. Paling banyak berapa keranjang?',
          add: [
            ...range(0, 12).map((i) => apple(`a${i}`, 70 + i * 24, 60)),
            ...range(0, 18).map((i) => orange(`j${i}`, 92 + (i % 9) * 24, 95 + Math.floor(i / 9) * 22)),
            T('la', 'apel', 33, 60, { size: 14, c: 'neg' }),
            T('lj', 'jeruk', 52, 106, { size: 14, c: 'mut' }),
            T('q', 'paling banyak berapa keranjang?', 200, 185, { size: 20, w: 700 }),
          ],
          ask: {
            options: [
              { t: '6', ok: true, why: 'Setiap keranjang berisi 2 apel dan 3 jeruk. Mari kita lihat.' },
              { t: '3', why: '3 keranjang bisa, tapi masih ada jawaban yang lebih banyak.' },
              { t: '30', why: '30 keranjang berarti isinya tidak sama: ada yang apel, ada yang jeruk.' },
              { t: '36', why: '36 adalah KPK. Di sini kita membagi, jadi pakai FPB.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Membagi rata',
      steps: [
        {
          say: 'Banyak keranjang harus membagi habis 12 dan juga membagi habis 18. Kita coba 6 keranjang.',
          add: [...BX.map((x, i) => box(`bk${i}`, x, 245, 56, 70, { fill: 'mut-soft', r: 8, z: -1 }))],
          del: ['q', 'la', 'lj'],
        },
        {
          say: 'Setiap keranjang mendapat 2 apel dan 3 jeruk. Pas, tidak ada sisa.',
          set: Object.fromEntries([
            ...range(0, 12).map((i) => [`a${i}`, { x: BX[Math.floor(i / 2)] + (i % 2 ? 10 : -10), y: 228 }]),
            ...range(0, 18).map((i) => [`j${i}`, { x: BX[Math.floor(i / 3)] + ((i % 3) - 1) * 16, y: 256 }]),
          ]),
          add: [T('r', '6 keranjang: 2 apel + 3 jeruk', 200, 70, { size: 22 })],
        },
        {
          say: '6 adalah bilangan terbesar yang membagi habis 12 dan 18. Namanya FPB, singkatan dari Faktor Persekutuan Terbesar.',
          add: [T('f', '{a:FPB} dari 12 dan 18 = 6', 200, 125, { size: 26 })],
        },
      ],
    },
    {
      title: 'FPB dengan daftar faktor',
      steps: [
        {
          say: 'Cara pertama: tulis faktor masing-masing bilangan.',
          clear: true,
          add: [
            T('l1', '12:', 52, 90, { size: 22 }),
            ...[1, 2, 3, 4, 6, 12].map((v, i) => ({ id: `f1_${v}`, t: 'circle', x: 105 + i * 50, y: 90, r: 18, fill: 'paper', stroke: 'ink', sw: 1.5, label: String(v), lsize: 16 })),
            T('l2', '18:', 52, 160, { size: 22 }),
            ...[1, 2, 3, 6, 9, 18].map((v, i) => ({ id: `f2_${v}`, t: 'circle', x: 105 + i * 50, y: 160, r: 18, fill: 'paper', stroke: 'ink', sw: 1.5, label: String(v), lsize: 16 })),
          ],
        },
        {
          say: 'Tandai faktor yang ada di keduanya: 1, 2, 3, dan 6. Ini faktor persekutuan.',
          set: Object.fromEntries([1, 2, 3, 6].flatMap((v) => [[`f1_${v}`, { fill: 'pos-soft' }], [`f2_${v}`, { fill: 'pos-soft' }]])),
          add: [T('s', 'sama-sama: 1, 2, 3, 6', 200, 220, { size: 20, c: 'pos' })],
        },
        {
          say: 'Yang paling besar adalah 6. Itulah FPB.',
          set: { f1_6: { fill: 'acc', lc: 'onacc' }, f2_6: { fill: 'acc', lc: 'onacc' } },
          add: [T('r', 'terbesar → {a:FPB = 6}', 200, 262, { size: 24 })],
          pulse: ['f1_6', 'f2_6'],
        },
      ],
    },
    {
      title: 'Kapan bersamaan lagi?',
      steps: [
        {
          say: 'Lampu biru berkedip setiap 4 detik. Lampu merah setiap 6 detik. Keduanya menyala bersama di detik nol. Kapan bersama lagi?',
          clear: true,
          add: [NLK.el, dot('z', NLK.at(0), 150, 'ink'), T('t', 'detik', 375, 190, { size: 13, c: 'mut' })],
        },
        {
          say: 'Lampu biru: 4, 8, 12, 16, 20, 24.',
          add: range(1, 7).flatMap((k) => [hop(`b${k}`, NLK.at(4 * k - 4), NLK.at(4 * k), 150, { c: 'pos' }), dot(`bd${k}`, NLK.at(4 * k), 150, 'pos')]),
        },
        {
          say: 'Lampu merah: 6, 12, 18, 24.',
          add: range(1, 5).flatMap((k) => [hop(`r${k}`, NLK.at(6 * k - 6), NLK.at(6 * k), 150, { c: 'neg', below: true }), dot(`rd${k}`, NLK.at(6 * k), 150, 'neg')]),
        },
        {
          say: 'Keduanya bertemu di 12, lalu 24. Yang paling kecil adalah 12. Namanya KPK, Kelipatan Persekutuan Terkecil.',
          set: { bd3: { fill: 'acc', r: 10 }, rd2: { fill: 'acc', r: 10 }, bd6: { fill: 'acc', r: 10 }, rd4: { fill: 'acc', r: 10 } },
          pulse: ['bd3', 'rd2'],
          add: [T('r', '{a:KPK} dari 4 dan 6 = 12', 200, 260, { size: 26 }), T('r0', 'bersama lagi di detik ke-12', 200, 40, { size: 20 })],
        },
      ],
    },
    {
      title: 'Cara cepat: faktorisasi prima',
      steps: [
        {
          say: 'Untuk bilangan besar, pakai faktorisasi prima. 12 sama dengan 2 pangkat 2 kali 3. 18 sama dengan 2 kali 3 pangkat 2.',
          clear: true,
          add: [T('a', '12 = 2² × 3', 200, 50, { size: 26 }), T('b', '18 = 2 × 3²', 200, 92, { size: 26 })],
        },
        {
          say: 'FPB: ambil faktor yang ada di keduanya, dengan pangkat terkecil. 2 dan 3. Jadi FPB-nya 6.',
          add: [T('f', '{a:FPB} = 2 × 3 = 6', 200, 150, { size: 26 }), T('f2', 'faktor yang sama, pangkat terkecil', 200, 182, { size: 15, c: 'mut' })],
        },
        {
          say: 'KPK: ambil semua faktor, dengan pangkat terbesar. 2 pangkat 2 kali 3 pangkat 2, yaitu 36.',
          add: [T('k', '{a:KPK} = 2² × 3² = 36', 200, 230, { size: 26 }), T('k2', 'semua faktor, pangkat terbesar', 200, 262, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'FPB atau KPK?',
      steps: [
        {
          say: 'Bagaimana tahu harus pakai yang mana? Kalau soalnya membagi rata menjadi kelompok, pakai FPB.',
          clear: true,
          add: [box('c1', 105, 150, 175, 190, { fill: 'pos-soft', r: 12 }), T('h1', 'FPB', 105, 75, { size: 24, font: 'serif', w: 600 }), T('e1', 'membagi rata\nkelompok, paket,\nkeranjang', 105, 150, { size: 16, w: 700, lh: 1.6 })],
        },
        {
          say: 'Kalau soalnya tentang kejadian berulang yang bertemu lagi, misalnya jadwal atau lampu, pakai KPK.',
          add: [box('c2', 295, 150, 175, 190, { fill: 'acc-soft', r: 12 }), T('h2', 'KPK', 295, 75, { size: 24, font: 'serif', w: 600 }), T('e2', 'bertemu lagi\njadwal, lampu,\nbersamaan', 295, 150, { size: 16, w: 700, lh: 1.6 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Andi berenang setiap 3 hari, Budi setiap 5 hari. Hari ini mereka berenang bersama. Berapa hari lagi mereka bersama lagi?',
          clear: true,
          add: [T('q', 'Andi tiap 3 hari, Budi tiap 5 hari', 200, 110, { size: 22 }), T('q2', 'bersama lagi setelah … hari', 200, 165, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: '15', ok: true, why: 'Kelipatan 3 dan 5 yang sama paling kecil adalah 15.' },
              { t: '8', why: '3 + 5 = 8. Hari bertemu harus kelipatan 3 dan juga kelipatan 5.' },
              { t: '1', why: '1 adalah FPB dari 3 dan 5. Soal bertemu lagi memakai KPK.' },
              { t: '30', why: '30 memang bersama, tapi mereka sudah bertemu lebih dulu.' },
            ],
          },
        },
        {
          say: 'Kelipatan 3: 3, 6, 9, 12, 15. Kelipatan 5: 5, 10, 15. Pertama bertemu di 15. Jadi 15 hari lagi.',
          clear: true,
          add: [
            table('tb', 200, 130, [['Andi', '3', '6', '9', '12', '{a:15}'], ['Budi', '5', '10', '{a:15}', '', '']], { cw: [70, 50, 50, 50, 50, 50], rh: 40, size: 18, hl: [[0, 5], [1, 3]] }),
            T('r', 'KPK(3, 5) = {a:15}', 200, 230, { size: 28 }),
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'FPB dari 16 dan 24 adalah …',
      options: [
        { t: '8', ok: true },
        { t: '4', why: '4 memang faktor persekutuan, tapi 8 juga membagi habis keduanya dan lebih besar.' },
        { t: '48', why: '48 adalah KPK dari 16 dan 24.' },
        { t: '2', why: '2 faktor persekutuan, tapi bukan yang terbesar.' },
      ],
      steps: ['Faktor 16: 1, 2, 4, 8, 16.', 'Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24.', 'Yang sama dan terbesar: 8.'],
    },
    {
      q: 'KPK dari 6 dan 8 adalah …',
      options: [
        { t: '24', ok: true },
        { t: '48', why: '48 = 6 × 8 memang kelipatan bersama, tapi ada yang lebih kecil: 24.' },
        { t: '2', why: '2 adalah FPB dari 6 dan 8.' },
        { t: '14', why: '6 + 8 = 14. 14 bukan kelipatan 6.' },
      ],
      steps: ['Kelipatan 6: 6, 12, 18, 24, …', 'Kelipatan 8: 8, 16, 24, …', 'Yang sama pertama kali: 24.'],
    },
    {
      type: 'num',
      q: 'Bu Sari punya 24 pensil dan 36 buku. Semuanya dibagikan sama rata ke beberapa siswa tanpa sisa. Paling banyak berapa siswa yang mendapat bagian?',
      ans: ['12'],
      wrong: { '72': 'Ini soal membagi rata, jadi pakai FPB, bukan KPK.', '6': '6 siswa bisa, tapi 12 siswa juga bisa: masing-masing 2 pensil dan 3 buku.' },
      steps: ['Membagi rata → FPB.', '24 = 2³ × 3, 36 = 2² × 3².', 'FPB = 2² × 3 = 12.'],
    },
    {
      type: 'num',
      q: 'Bus A berangkat setiap 10 menit, bus B setiap 15 menit. Pukul 07.00 keduanya berangkat bersama. Berapa menit kemudian keduanya berangkat bersama lagi?',
      ans: ['30'],
      wrong: { '5': '5 adalah FPB. Soal bersamaan lagi memakai KPK.', '150': '150 = 10 × 15 memang bersama, tapi mereka sudah bersama lebih dulu.', '25': '10 + 15 = 25 bukan kelipatan 10.' },
      steps: ['Bersamaan lagi → KPK.', 'Kelipatan 10: 10, 20, 30. Kelipatan 15: 15, 30.', 'KPK = 30, jadi 30 menit kemudian (pukul 07.30).'],
    },
    {
      q: '18 = 2 × 3² dan 30 = 2 × 3 × 5. KPK dari 18 dan 30 adalah …',
      options: [
        { t: '90', ok: true },
        { t: '6', why: '6 adalah FPB. KPK memakai semua faktor dengan pangkat terbesar.' },
        { t: '540', why: '540 = 18 × 30. Faktor yang sama tidak boleh dihitung dua kali.' },
        { t: '30', why: '30 bukan kelipatan 18.' },
      ],
      steps: ['Semua faktor dengan pangkat terbesar: 2, 3², 5.', 'KPK = 2 × 9 × 5 = 90.'],
    },
  ],
};

export const faktorLessons = [l5, l6];
export const faktorExtra = [
  {
    type: 'num',
    q: 'Dua bilangan memiliki FPB 4 dan KPK 24. Jika salah satu bilangannya 8, bilangan yang lain adalah …',
    ans: ['12'],
    wrong: { '3': 'Hasil kali dua bilangan = FPB × KPK = 96, jadi bilangan lain = 96 ÷ 8.' },
    steps: ['Hasil kali dua bilangan = FPB × KPK = 4 × 24 = 96.', 'Bilangan lain = 96 ÷ 8 = 12.', 'Cek: FPB(8, 12) = 4 dan KPK(8, 12) = 24.'],
  },
];
