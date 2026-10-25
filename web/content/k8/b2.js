// Kelas 8 · Bab 2: Teorema Pythagoras
import { T, box, ln, dot, range } from '../helpers.js';

const P = (b, e) => `${b}{^:${e}}`;
const r1 = (v) => Math.round(v * 10) / 10;

// Persegi di atas sisi p→q (ke arah luar: normal kiri dari p ke q), dengan garis kisi n × n
function sideSquare(id, p, q, n, fill, o = {}) {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  const nx = dy;
  const ny = -dx;
  const c = [q[0] + nx, q[1] + ny];
  const d = [p[0] + nx, p[1] + ny];
  let path = `M${r1(p[0])},${r1(p[1])} L${r1(q[0])},${r1(q[1])} L${r1(c[0])},${r1(c[1])} L${r1(d[0])},${r1(d[1])} Z`;
  if (n > 1)
    for (let k = 1; k < n; k++) {
      const t = k / n;
      path += ` M${r1(p[0] + dx * t)},${r1(p[1] + dy * t)} L${r1(d[0] + dx * t)},${r1(d[1] + dy * t)}`;
      path += ` M${r1(p[0] + nx * t)},${r1(p[1] + ny * t)} L${r1(q[0] + nx * t)},${r1(q[1] + ny * t)}`;
    }
  return { id, t: 'path', x: 0, y: 0, d: path, fill, stroke: 'ink', sw: 1.5, ...o };
}
const centerOf = (p, q) => [(p[0] + q[0]) / 2 + (q[1] - p[1]) / 2, (p[1] + q[1]) / 2 - (q[0] - p[0]) / 2];
// Segitiga siku-siku dengan sudut siku di C
const tri = (id, A, B, C, o = {}) => ({ id, t: 'poly', x: 0, y: 0, pts: [A, B, C], fill: 'paper', stroke: 'ink', sw: 2.5, ...o });
function rightMark(id, C, A, B, s = 12) {
  const ua = [(A[0] - C[0]) / Math.hypot(A[0] - C[0], A[1] - C[1]), (A[1] - C[1]) / Math.hypot(A[0] - C[0], A[1] - C[1])];
  const ub = [(B[0] - C[0]) / Math.hypot(B[0] - C[0], B[1] - C[1]), (B[1] - C[1]) / Math.hypot(B[0] - C[0], B[1] - C[1])];
  const p1 = [C[0] + ua[0] * s, C[1] + ua[1] * s];
  const p2 = [p1[0] + ub[0] * s, p1[1] + ub[1] * s];
  const p3 = [C[0] + ub[0] * s, C[1] + ub[1] * s];
  return { id, t: 'path', x: 0, y: 0, d: `M${r1(p1[0])},${r1(p1[1])} L${r1(p2[0])},${r1(p2[1])} L${r1(p3[0])},${r1(p3[1])}`, stroke: 'ink', sw: 1.5 };
}

// ---------- 2.1 Teorema Pythagoras ----------
const U = 20;
const C0 = [130, 185];
const A0 = [130, 185 - 3 * U];
const B0 = [130 + 4 * U, 185];
const sqA = () => sideSquare('sa', C0, A0, 3, 'pos-soft');
const sqB = () => sideSquare('sb', B0, C0, 4, 'acc-soft');
const sqC = () => sideSquare('sc', A0, B0, 5, 'ok-soft');
const [cax, cay] = centerOf(C0, A0);
const [cbx, cby] = centerOf(B0, C0);
const [ccx, ccy] = centerOf(A0, B0);
const baseTri = () => [tri('tr', A0, B0, C0, { z: 2 }), rightMark('rm', C0, A0, B0)];

const l1 = {
  id: 'k8b2-1',
  title: 'Teorema Pythagoras',
  hook: 'Di segitiga siku-siku, persegi di dua sisi pendek luasnya sama dengan persegi di sisi miring.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segitiga siku-siku ini sisi tegaknya 3 dan sisi mendatarnya 4. Berapa panjang sisi miringnya?',
          add: [...baseTri(), T('la', '3', C0[0] - 16, (A0[1] + C0[1]) / 2, { size: 20 }), T('lb', '4', (C0[0] + B0[0]) / 2, C0[1] + 18, { size: 20 }), T('lc', '?', 182, 140, { size: 22, c: 'acc' })],
          ask: {
            options: [
              { t: '5', ok: true, why: 'Kita buktikan dengan persegi-persegi.' },
              { t: '7', why: '3 + 4 = 7. Sisi miring selalu lebih pendek dari jumlah dua sisi lainnya.' },
              { t: '6', why: 'Hampir. Kita hitung dengan persegi di setiap sisi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Persegi di setiap sisi',
      steps: [
        {
          say: 'Gambar persegi di sisi yang panjangnya 3. Isinya 3 kali 3, yaitu 9 kotak.',
          add: [sqA(), T('na', '9', cax, cay, { size: 24, c: 'pos' })],
          del: ['lc', 'la'],
        },
        {
          say: 'Persegi di sisi 4 berisi 4 kali 4, yaitu 16 kotak.',
          add: [sqB(), T('nb', '16', cbx, cby, { size: 24, c: 'acc' })],
          del: ['lb'],
        },
        {
          say: 'Sekarang persegi di sisi miring. Hitung kotaknya: 25 kotak.',
          add: [sqC(), T('nc', '25', ccx, ccy, { size: 24, c: 'ok' })],
        },
        {
          say: 'Lihat! 9 tambah 16 sama dengan 25. Dua persegi kecil, jika digabung, sama luasnya dengan persegi besar.',
          add: [T('e', '{p:9} + {a:16} = {g:25}', 320, 230, { size: 24 })],
          pulse: ['sa', 'sb', 'sc'],
        },
        {
          say: '25 kotak berarti sisinya 5, karena 5 kali 5 sama dengan 25. Jadi sisi miringnya 5.',
          add: [T('e2', `${P(3, 2)} + ${P(4, 2)} = ${P(5, 2)}`, 320, 268, { size: 22 })],
        },
      ],
    },
    {
      title: 'Nama-nama sisi',
      steps: [
        {
          say: 'Sisi di depan sudut siku-siku disebut sisi miring atau hipotenusa. Sisi ini selalu paling panjang.',
          clear: true,
          add: [tri('tr', [100, 70], [300, 220], [100, 220]), rightMark('rm', [100, 220], [100, 70], [300, 220], 16), T('c', 'c', 215, 132, { size: 26, c: 'ok' }), T('cl', 'sisi miring', 262, 110, { size: 15, c: 'ok' })],
          hl: ['c'],
        },
        {
          say: 'Dua sisi lainnya, yang membentuk sudut siku-siku, disebut sisi siku-siku. Kita beri nama a dan b.',
          add: [T('a', 'a', 82, 145, { size: 26, c: 'pos' }), T('b', 'b', 200, 242, { size: 26, c: 'acc' })],
        },
        {
          say: 'Teorema Pythagoras: a kuadrat ditambah b kuadrat sama dengan c kuadrat.',
          add: [box('rb', 290, 36, 200, 44, { fill: 'acc-soft', r: 10 }), T('rule', `{p:a}{^:2} + {a:b}{^:2} = {g:c}{^:2}`, 290, 36, { size: 22 })],
        },
      ],
    },
    {
      title: 'Hanya untuk siku-siku',
      steps: [
        {
          say: 'Teorema ini hanya berlaku untuk segitiga siku-siku. Untuk segitiga lain, persegi kecil tidak pas mengisi persegi besar.',
          clear: true,
          add: [tri('t2', [90, 210], [290, 210], [150, 90]), T('n', 'bukan siku-siku', 200, 245, { size: 18, c: 'neg' }), T('n2', 'a² + b² ≠ c²', 200, 275, { size: 18, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga siku-siku sisi siku-sikunya 6 dan 8. Berapa luas persegi di sisi miringnya?',
          clear: true,
          add: [tri('tr', [120, 70], [280, 190], [120, 190]), rightMark('rm', [120, 190], [120, 70], [280, 190]), T('a', '6', 104, 130, { size: 20 }), T('b', '8', 200, 210, { size: 20 }), T('q', 'luas persegi di sisi miring = ?', 200, 255, { size: 18, c: 'mut' })],
          ask: {
            options: [
              { t: '100', ok: true, why: '6² + 8² = 36 + 64 = 100.' },
              { t: '14', why: '6 + 8 = 14. Yang dijumlahkan adalah kuadratnya.' },
              { t: '48', why: '6 × 8 = 48. Hitung 6² + 8².' },
              { t: '10', why: '10 adalah panjang sisi miring. Luas perseginya 10 × 10.' },
            ],
          },
        },
        {
          say: '6 kuadrat sama dengan 36, 8 kuadrat sama dengan 64. Jumlahnya 100. Jadi sisi miringnya akar 100, yaitu 10.',
          clear: true,
          add: [T('a', `${P(6, 2)} + ${P(8, 2)} = 36 + 64 = {g:100}`, 200, 100, { size: 26 }), T('b', 'sisi miring = √100 = 10', 200, 160, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Pada segitiga siku-siku, sisi miring adalah sisi yang …',
      options: [
        { t: 'berhadapan dengan sudut siku-siku', ok: true },
        { t: 'paling pendek', why: 'Sisi miring justru paling panjang.' },
        { t: 'membentuk sudut siku-siku', why: 'Sisi yang membentuk sudut siku-siku adalah sisi siku-siku (a dan b).' },
        { t: 'selalu tegak', why: 'Sisi miring bisa digambar dalam posisi apa pun. Cirinya: berhadapan dengan sudut siku-siku.' },
      ],
      steps: ['Sisi miring (hipotenusa) berhadapan dengan sudut 90°.', 'Sisi ini selalu yang terpanjang.'],
    },
    {
      q: 'Segitiga siku-siku dengan sisi miring c dan sisi siku-siku a dan b. Pernyataan yang benar adalah …',
      options: [
        { t: 'c² = a² + b²', ok: true },
        { t: 'a² = b² + c²', why: 'Yang sendirian di satu ruas adalah sisi miring (c).' },
        { t: 'c = a + b', why: 'Yang dijumlahkan adalah kuadratnya, bukan panjangnya.' },
        { t: 'c² = a² − b²', why: 'Kuadrat dua sisi siku-siku dijumlahkan.' },
      ],
      steps: ['Teorema Pythagoras: kuadrat sisi miring = jumlah kuadrat dua sisi siku-siku.'],
    },
    {
      type: 'num',
      q: 'Luas persegi pada dua sisi siku-siku sebuah segitiga adalah 25 cm² dan 144 cm². Luas persegi pada sisi miringnya adalah … cm²',
      ans: ['169'],
      wrong: { '119': 'Luasnya dijumlahkan, bukan dikurangkan.', '13': '13 adalah panjang sisi miring. Yang ditanya luas perseginya.' },
      steps: ['Luas persegi sisi miring = jumlah luas dua persegi lainnya.', '25 + 144 = 169 cm².'],
    },
    {
      type: 'num',
      q: 'Segitiga siku-siku memiliki sisi siku-siku 9 cm dan 12 cm. Panjang sisi miringnya adalah … cm',
      ans: ['15'],
      wrong: { '21': '9 + 12 = 21. Yang dijumlahkan adalah kuadratnya.', '225': '225 adalah c². Panjang sisi miring = √225.' },
      steps: ['c² = 9² + 12² = 81 + 144 = 225.', 'c = √225 = 15 cm.'],
    },
    {
      q: 'Segitiga dengan sisi 3 cm, 4 cm, dan 6 cm …',
      options: [
        { t: 'bukan segitiga siku-siku', ok: true },
        { t: 'segitiga siku-siku', why: '3² + 4² = 25, sedangkan 6² = 36. Tidak sama.' },
        { t: 'segitiga sama sisi', why: 'Ketiga sisinya berbeda panjang.' },
        { t: 'tidak bisa dibentuk', why: '3 + 4 = 7 lebih dari 6, jadi segitiganya bisa dibentuk.' },
      ],
      steps: ['Cek: 3² + 4² = 9 + 16 = 25.', '6² = 36 ≠ 25, jadi bukan siku-siku.'],
    },
  ],
};

// ---------- 2.2 Mencari panjang sisi ----------
const TA = [110, 60];
const TC = [110, 200];
const TB = [290, 200];
const triLabel = (a, b, c, o = {}) => [
  tri('tr', TA, TB, TC),
  rightMark('rm', TC, TA, TB),
  T('a', a, 90, 130, { size: 20, c: 'pos', ...o.a }),
  T('b', b, 200, 222, { size: 20, c: 'acc', ...o.b }),
  T('c', c, 215, 115, { size: 20, c: 'ok', ...o.c }),
];

const l2 = {
  id: 'k8b2-2',
  title: 'Mencari Panjang Sisi Segitiga Siku-siku',
  hook: 'Cari sisi miring: jumlahkan kuadratnya. Cari sisi siku-siku: kurangkan kuadratnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sisi miring 13, satu sisi siku-sikunya 5. Berapa sisi yang lain?',
          add: [...triLabel('5', '?', '13')],
          ask: {
            options: [
              { t: '12', ok: true, why: '13² − 5² = 169 − 25 = 144, dan √144 = 12.' },
              { t: '8', why: '13 − 5 = 8. Yang dikurangkan adalah kuadratnya.' },
              { t: '√194', why: 'Itu kalau menjumlahkan. Sisi miring sudah diketahui, jadi kita mengurangkan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mencari sisi miring',
      steps: [
        {
          say: 'Sisi siku-sikunya 6 dan 8. Sisi miringnya kita sebut c.',
          clear: true,
          add: [...triLabel('6', '8', 'c')],
        },
        {
          say: 'Kuadratkan dan jumlahkan: 6 kuadrat tambah 8 kuadrat, 36 tambah 64, sama dengan 100.',
          add: [T('s1', `c{^:2} = ${P(6, 2)} + ${P(8, 2)} = 36 + 64 = 100`, 200, 252, { size: 20 })],
        },
        {
          say: 'c kuadrat sama dengan 100, jadi c sama dengan akar 100, yaitu 10.',
          set: { c: { text: '10' } },
          add: [T('s2', 'c = √100 = {g:10}', 200, 282, { size: 20 })],
        },
      ],
    },
    {
      title: 'Mencari sisi siku-siku',
      steps: [
        {
          say: 'Sekarang sisi miring 13, satu sisi siku-siku 5. Sisi yang dicari kita sebut b.',
          clear: true,
          add: [...triLabel('5', 'b', '13')],
        },
        {
          say: 'Mulai dari aturan: 5 kuadrat tambah b kuadrat sama dengan 13 kuadrat. Jadi b kuadrat sama dengan 13 kuadrat dikurangi 5 kuadrat.',
          add: [T('s1', `b{^:2} = ${P(13, 2)} − ${P(5, 2)} = 169 − 25 = 144`, 200, 252, { size: 20 })],
        },
        {
          say: 'b sama dengan akar 144, yaitu 12.',
          set: { b: { text: '12' } },
          add: [T('s2', 'b = √144 = {a:12}', 200, 282, { size: 20 })],
        },
      ],
    },
    {
      title: 'Cara mengingat',
      steps: [
        {
          say: 'Cara mengingatnya: kalau mencari sisi miring yang paling panjang, kuadratnya dijumlahkan. Hasilnya jadi lebih besar.',
          clear: true,
          add: [box('k1', 200, 85, 340, 80, { fill: 'ok-soft', r: 12 }), T('h1', 'cari sisi miring', 200, 65, { size: 18 }), T('f1', `c = √(a{^:2} + b{^:2})`, 200, 100, { size: 22 })],
        },
        {
          say: 'Kalau mencari sisi siku-siku yang lebih pendek, kuadratnya dikurangkan. Selalu kuadrat terbesar dikurangi kuadrat yang lebih kecil.',
          add: [box('k2', 200, 195, 340, 80, { fill: 'pos-soft', r: 12 }), T('h2', 'cari sisi siku-siku', 200, 175, { size: 18 }), T('f2', `a = √(c{^:2} − b{^:2})`, 200, 210, { size: 22 })],
        },
      ],
    },
    {
      title: 'Hasil tidak bulat',
      steps: [
        {
          say: 'Hasilnya tidak selalu bulat. Sisi siku-siku 2 dan 3: c kuadrat sama dengan 4 tambah 9, yaitu 13. Jadi c sama dengan akar 13.',
          clear: true,
          add: [...triLabel('2', '3', 'c'), T('s1', `c{^:2} = 4 + 9 = 13 → c = √13`, 200, 255, { size: 20 })],
        },
        {
          say: 'Akar 13 kira-kira 3 koma 6. Biarkan dalam bentuk akar jika soal tidak meminta desimal.',
          set: { c: { text: '√13' } },
          add: [T('s2', '√13 ≈ 3,6', 200, 284, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sisi miring 10, satu sisi siku-siku 6. Berapa sisi yang lain?',
          clear: true,
          add: [...triLabel('6', '?', '10')],
          ask: {
            options: [
              { t: '8', ok: true, why: '10² − 6² = 100 − 36 = 64. √64 = 8.' },
              { t: '4', why: '10 − 6 = 4. Yang dikurangkan kuadratnya.' },
              { t: '√136', why: 'Sisi miringnya sudah diketahui. Kurangkan, jangan jumlahkan.' },
              { t: '64', why: '64 adalah kuadratnya. Sisinya √64.' },
            ],
          },
        },
        {
          say: '10 kuadrat dikurangi 6 kuadrat: 100 dikurangi 36 sama dengan 64. Akar 64 sama dengan 8.',
          clear: true,
          add: [T('a', `${P(10, 2)} − ${P(6, 2)} = 100 − 36 = 64`, 200, 100, { size: 26 }), T('b', 'sisi = √64 = {a:8}', 200, 160, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Sisi siku-siku sebuah segitiga 5 cm dan 12 cm. Panjang sisi miringnya adalah … cm',
      ans: ['13'],
      wrong: { '17': '5 + 12 = 17. Kuadratkan dulu, lalu jumlahkan.', '169': '169 adalah c². c = √169.' },
      steps: ['c² = 5² + 12² = 25 + 144 = 169.', 'c = √169 = 13 cm.'],
    },
    {
      type: 'num',
      q: 'Sisi miring sebuah segitiga siku-siku 17 cm dan satu sisi siku-sikunya 8 cm. Panjang sisi siku-siku yang lain adalah … cm',
      ans: ['15'],
      wrong: { '9': '17 − 8 = 9. Kurangkan kuadratnya.', '225': '225 adalah kuadratnya. Sisinya √225.' },
      steps: ['b² = 17² − 8² = 289 − 64 = 225.', 'b = √225 = 15 cm.'],
    },
    {
      q: 'Sisi siku-siku sebuah segitiga 1 cm dan 3 cm. Panjang sisi miringnya adalah …',
      options: [
        { t: '√10 cm', ok: true },
        { t: '4 cm', why: '1 + 3 = 4. Kuadratkan dulu: 1 + 9 = 10.' },
        { t: '√8 cm', why: 'Itu 3² − 1². Untuk sisi miring, kuadratnya dijumlahkan.' },
        { t: '10 cm', why: '10 adalah c². Sisinya √10.' },
      ],
      steps: ['c² = 1² + 3² = 1 + 9 = 10.', 'c = √10 cm.'],
    },
    {
      q: 'Sebuah persegi panjang berukuran 8 cm × 6 cm. Panjang diagonalnya adalah …',
      options: [
        { t: '10 cm', ok: true },
        { t: '14 cm', why: 'Diagonal membagi persegi panjang menjadi dua segitiga siku-siku. Pakai Pythagoras.' },
        { t: '48 cm', why: '48 adalah luasnya.' },
        { t: '√28 cm', why: 'Itu 8² − 6². Diagonal adalah sisi miring, jadi kuadratnya dijumlahkan.' },
      ],
      steps: ['Diagonal = sisi miring segitiga dengan sisi 8 dan 6.', '√(64 + 36) = √100 = 10 cm.'],
    },
    {
      type: 'num',
      q: 'Sebuah segitiga sama kaki memiliki alas 10 cm dan kaki 13 cm. Tinggi segitiga itu adalah … cm',
      ans: ['12'],
      wrong: { '3': '13 − 10 = 3. Tinggi membagi alas menjadi dua (5 cm), lalu pakai Pythagoras.', '√69': 'Tinggi membagi alas menjadi 5 cm dan 5 cm. Hitung √(13² − 5²).' },
      steps: ['Tinggi membagi alas menjadi dua: 5 cm dan 5 cm.', 'Tinggi = √(13² − 5²) = √(169 − 25) = √144 = 12 cm.'],
    },
  ],
};

// ---------- 2.3 Tripel Pythagoras dan jenis segitiga ----------
// Engsel: sisi 4 mendatar, sisi 3 berputar di titik V dengan sudut θ
const V = [120, 210];
const hinge = (deg) => {
  const L = 4 * 36;
  const S = 3 * 36;
  const a = (deg * Math.PI) / 180;
  const Bp = [V[0] + L, V[1]];
  const Ap = [V[0] + S * Math.cos(a), V[1] - S * Math.sin(a)];
  const c = Math.hypot(Bp[0] - Ap[0], Bp[1] - Ap[1]) / 36;
  return { Ap, Bp, c };
};
const l3 = {
  id: 'k8b2-3',
  title: 'Tripel Pythagoras dan Jenis Segitiga',
  hook: '3, 4, 5 adalah tripel Pythagoras. Dengan membandingkan kuadrat, kita tahu segitiga itu lancip, siku-siku, atau tumpul.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tiga tongkat panjangnya 5, 12, dan 13. Kalau disusun menjadi segitiga, apakah segitiganya siku-siku?',
          add: [ln('s1', 80, 90, 80 + 5 * 12, 90, { sw: 8, c: 'pos' }), ln('s2', 80, 140, 80 + 12 * 12, 140, { sw: 8, c: 'acc' }), ln('s3', 80, 190, 80 + 13 * 12, 190, { sw: 8, c: 'ok' }), T('l1', '5', 60, 90, { size: 18 }), T('l2', '12', 60, 140, { size: 18 }), T('l3', '13', 60, 190, { size: 18 })],
          ask: {
            options: [
              { t: 'Ya, siku-siku', ok: true, why: '5² + 12² = 25 + 144 = 169 = 13².' },
              { t: 'Tidak', why: 'Coba cek kuadratnya: 25 + 144 = 169, dan 13² juga 169.' },
              { t: 'Tidak bisa dibentuk segitiga', why: '5 + 12 = 17 lebih dari 13, jadi segitiganya bisa dibentuk.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tripel Pythagoras',
      steps: [
        {
          say: 'Tiga bilangan bulat yang memenuhi teorema Pythagoras disebut tripel Pythagoras. Contoh paling terkenal: 3, 4, 5.',
          clear: true,
          add: [T('h', 'tripel Pythagoras', 200, 40, { size: 22, font: 'serif', w: 600 }), T('t1', '3, 4, 5', 110, 95, { size: 24 }), T('c1', '9 + 16 = 25', 290, 95, { size: 18, c: 'mut' })],
        },
        { say: '5, 12, 13.', add: [T('t2', '5, 12, 13', 110, 135, { size: 24 }), T('c2', '25 + 144 = 169', 290, 135, { size: 18, c: 'mut' })] },
        { say: '8, 15, 17.', add: [T('t3', '8, 15, 17', 110, 175, { size: 24 }), T('c3', '64 + 225 = 289', 290, 175, { size: 18, c: 'mut' })] },
        {
          say: 'Kelipatannya juga tripel. 3, 4, 5 dikali 2 menjadi 6, 8, 10. Hafalkan beberapa tripel ini, hitunganmu jadi lebih cepat.',
          add: [T('t4', '6, 8, 10', 110, 225, { size: 24, c: 'acc' }), T('c4', '= 2 × (3, 4, 5)', 290, 225, { size: 18, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Lancip, siku-siku, tumpul',
      steps: [
        {
          say: 'Dua sisi segitiga ini tetap: 3 dan 4. Sudut di antaranya 90 derajat, jadi sisi ketiga 5. 5 kuadrat sama dengan 3 kuadrat tambah 4 kuadrat.',
          clear: true,
          add: [{ id: 'tr', t: 'poly', x: 0, y: 0, pts: [hinge(90).Ap, hinge(90).Bp, V], fill: 'ok-soft', stroke: 'ink', sw: 2.5 }, T('st', 'siku-siku: c² = a² + b²', 280, 60, { size: 17, c: 'ok' }), T('cv', 'sisi ketiga = 5', 280, 90, { size: 17 })],
        },
        {
          say: 'Kalau sudutnya dipersempit, sisi ketiga menjadi lebih pendek. c kuadrat lebih kecil dari a kuadrat tambah b kuadrat. Segitiganya lancip.',
          set: { tr: { pts: [hinge(60).Ap, hinge(60).Bp, V], fill: 'pos-soft' }, st: { text: 'lancip: c² < a² + b²', c: 'pos' }, cv: { text: `sisi ketiga ≈ ${hinge(60).c.toFixed(1).replace('.', ',')}` } },
        },
        {
          say: 'Kalau sudutnya diperlebar, sisi ketiga menjadi lebih panjang. c kuadrat lebih besar dari a kuadrat tambah b kuadrat. Segitiganya tumpul.',
          set: { tr: { pts: [hinge(125).Ap, hinge(125).Bp, V], fill: 'neg-soft' }, st: { text: 'tumpul: c² > a² + b²', c: 'neg' }, cv: { text: `sisi ketiga ≈ ${hinge(125).c.toFixed(1).replace('.', ',')}` } },
        },
        {
          say: 'Jadi, bandingkan kuadrat sisi terpanjang dengan jumlah kuadrat dua sisi lainnya.',
          clear: true,
          add: [
            box('k1', 200, 70, 330, 50, { fill: 'pos-soft', r: 10, label: 'c² < a² + b²  →  lancip', lsize: 18 }),
            box('k2', 200, 140, 330, 50, { fill: 'ok-soft', r: 10, label: 'c² = a² + b²  →  siku-siku', lsize: 18 }),
            box('k3', 200, 210, 330, 50, { fill: 'neg-soft', r: 10, label: 'c² > a² + b²  →  tumpul', lsize: 18 }),
            T('n', 'c = sisi terpanjang', 200, 265, { size: 15, c: 'mut' }),
          ],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga dengan sisi 6, 7, dan 9. Jenisnya apa?',
          clear: true,
          add: [T('q', 'sisi 6, 7, 9', 200, 110, { size: 34 }), T('q2', 'lancip, siku-siku, atau tumpul?', 200, 170, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: 'lancip', ok: true, why: '9² = 81, sedangkan 6² + 7² = 85. 81 < 85.' },
              { t: 'siku-siku', why: '81 tidak sama dengan 85.' },
              { t: 'tumpul', why: '81 lebih kecil dari 85, bukan lebih besar.' },
            ],
          },
        },
        {
          say: 'Sisi terpanjang 9. 9 kuadrat sama dengan 81. 6 kuadrat tambah 7 kuadrat sama dengan 85. 81 lebih kecil dari 85, jadi lancip.',
          clear: true,
          add: [T('a', `${P(9, 2)} = 81`, 200, 80, { size: 26 }), T('b', `${P(6, 2)} + ${P(7, 2)} = 36 + 49 = 85`, 200, 130, { size: 24 }), T('c', '81 < 85 → {p:lancip}', 200, 190, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Manakah yang merupakan tripel Pythagoras?',
      options: [
        { t: '7, 24, 25', ok: true },
        { t: '4, 5, 6', why: '4² + 5² = 41, sedangkan 6² = 36.' },
        { t: '5, 10, 15', why: '5² + 10² = 125, sedangkan 15² = 225.' },
        { t: '6, 8, 12', why: '6² + 8² = 100, sedangkan 12² = 144.' },
      ],
      steps: ['7² + 24² = 49 + 576 = 625.', '25² = 625. Sama, jadi tripel Pythagoras.'],
    },
    {
      q: 'Segitiga dengan sisi 4 cm, 5 cm, dan 7 cm termasuk segitiga …',
      options: [
        { t: 'tumpul', ok: true },
        { t: 'lancip', why: '7² = 49 lebih besar dari 4² + 5² = 41.' },
        { t: 'siku-siku', why: '49 ≠ 41.' },
        { t: 'sama kaki', why: 'Ketiga sisinya berbeda.' },
      ],
      steps: ['Sisi terpanjang 7: 7² = 49.', '4² + 5² = 16 + 25 = 41.', '49 > 41 → tumpul.'],
    },
    {
      q: 'Jika 9, 12, dan x adalah tripel Pythagoras dengan x sisi terpanjang, maka x = …',
      options: [
        { t: '15', ok: true },
        { t: '21', why: '9 + 12 = 21. Pakai kuadrat: √(81 + 144).' },
        { t: '13', why: '9² + 12² = 225, dan √225 = 15.' },
        { t: '√63', why: 'Itu 12² − 9². x adalah sisi terpanjang, jadi kuadratnya dijumlahkan.' },
      ],
      steps: ['9, 12, 15 = 3 × (3, 4, 5).', 'Cek: 81 + 144 = 225 = 15².'],
    },
    {
      q: 'Segitiga dengan sisi 8 cm, 10 cm, dan 12 cm termasuk segitiga …',
      options: [
        { t: 'lancip', ok: true },
        { t: 'tumpul', why: '12² = 144 lebih kecil dari 8² + 10² = 164.' },
        { t: 'siku-siku', why: '144 ≠ 164.' },
        { t: 'tidak bisa dibentuk', why: '8 + 10 = 18 lebih dari 12, jadi bisa dibentuk.' },
      ],
      steps: ['12² = 144.', '8² + 10² = 64 + 100 = 164.', '144 < 164 → lancip.'],
    },
    {
      type: 'num',
      q: 'Bilangan 20, 21, dan p adalah tripel Pythagoras dengan p sisi terpanjang. Nilai p adalah …',
      ans: ['29'],
      wrong: { '41': '20 + 21 = 41. Kuadratkan dulu: 400 + 441 = 841.', '841': '841 adalah p². p = √841.' },
      steps: ['p² = 20² + 21² = 400 + 441 = 841.', 'p = √841 = 29.'],
    },
  ],
};

// ---------- 2.4 Penerapan ----------
const G0 = [60, 250]; // titik (0,0) pada kisi
const GS = 30;
const gp = (x, y) => [G0[0] + x * GS, G0[1] - y * GS];

const l4 = {
  id: 'k8b2-4',
  title: 'Penerapan Teorema Pythagoras',
  hook: 'Tangga yang bersandar di tembok, jarak dua titik, dan rute kapal semuanya membentuk segitiga siku-siku.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tangga sepanjang 5 meter bersandar di tembok. Kaki tangga 3 meter dari tembok. Setinggi apa ujung tangga di tembok?',
          add: [
            box('wall', 300, 150, 24, 200, { fill: 'mut-soft', r: 0 }),
            ln('ground', 60, 250, 340, 250, { sw: 3, draw: false }),
            ln('ladder', 138, 250, 288, 50, { sw: 6, c: 'acc' }),
            T('l5', '5 m', 195, 140, { size: 18, c: 'acc' }),
            T('l3', '3 m', 213, 270, { size: 18 }),
            T('lq', '?', 268, 150, { size: 22, c: 'pos' }),
          ],
          ask: {
            options: [
              { t: '4 m', ok: true, why: '5² − 3² = 16, dan √16 = 4.' },
              { t: '2 m', why: '5 − 3 = 2. Kurangkan kuadratnya.' },
              { t: '√34 m', why: 'Tangga adalah sisi miring, jadi kuadratnya dikurangkan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tangga',
      steps: [
        {
          say: 'Tembok, tanah, dan tangga membentuk segitiga siku-siku. Tangga adalah sisi miringnya.',
          add: [rightMark('rm', [288, 250], [288, 50], [138, 250], 14), ln('h', 288, 250, 288, 50, { sw: 2.5, dash: '6 5', c: 'pos' })],
          del: ['lq'],
          hl: ['ladder'],
        },
        {
          say: 'Tinggi kuadrat sama dengan 5 kuadrat dikurangi 3 kuadrat, yaitu 25 dikurangi 9, sama dengan 16. Tingginya akar 16, yaitu 4 meter.',
          add: [T('s', `${P(5, 2)} − ${P(3, 2)} = 16`, 120, 60, { size: 20 }), T('s2', 'tinggi = √16 = {p:4 m}', 120, 95, { size: 20 }), T('lt', '4 m', 262, 150, { size: 18, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Jarak dua titik',
      steps: [
        {
          say: 'Pada bidang berpetak, titik A di 1 koma 1 dan titik B di 4 koma 5. Berapa jarak lurus dari A ke B?',
          clear: true,
          add: [
            { id: 'grid', t: 'path', x: 0, y: 0, d: range(0, 9).map((i) => `M${gp(i, 0)[0]},${gp(i, 0)[1]} V${gp(i, 7)[1]}`).join(' ') + ' ' + range(0, 8).map((j) => `M${gp(0, j)[0]},${gp(0, j)[1]} H${gp(8, j)[0]}`).join(' '), stroke: 'mut', sw: 0.8 },
            dot('A', ...gp(1, 1), 'pos'),
            dot('B', ...gp(4, 5), 'neg'),
            T('lA', 'A', gp(1, 1)[0] - 14, gp(1, 1)[1] + 14, { size: 18, c: 'pos' }),
            T('lB', 'B', gp(4, 5)[0] + 14, gp(4, 5)[1] - 12, { size: 18, c: 'neg' }),
          ],
        },
        {
          say: 'Buat segitiga siku-siku. Mendatar 3 petak, tegak 4 petak.',
          add: [
            ln('dx', ...gp(1, 1), ...gp(4, 1), { sw: 3, c: 'acc' }),
            ln('dy', ...gp(4, 1), ...gp(4, 5), { sw: 3, c: 'acc' }),
            rightMark('rm', gp(4, 1), gp(1, 1), gp(4, 5), 10),
            T('ldx', '3', gp(2.5, 1)[0], gp(2.5, 1)[1] + 16, { size: 18, c: 'acc' }),
            T('ldy', '4', gp(4, 3)[0] + 16, gp(4, 3)[1], { size: 18, c: 'acc' }),
          ],
        },
        {
          say: 'Jarak AB adalah sisi miring: akar dari 3 kuadrat tambah 4 kuadrat, yaitu akar 25, sama dengan 5 satuan.',
          add: [ln('ab', ...gp(1, 1), ...gp(4, 5), { sw: 3.5, c: 'ok' }), T('r', 'AB = √(3² + 4²) = {g:5}', 300, 60, { size: 18 })],
        },
      ],
    },
    {
      title: 'Kapal berlayar',
      steps: [
        {
          say: 'Sebuah kapal berlayar 8 kilometer ke timur, lalu 6 kilometer ke utara. Seberapa jauh kapal dari pelabuhan?',
          clear: true,
          add: [dot('port', 90, 230, 'ink'), T('pl', 'pelabuhan', 80, 252, { size: 14 }), ln('e', 90, 230, 250, 230, { sw: 3, c: 'pos', arrow: 'end' }), T('le', '8 km ke timur', 192, 250, { size: 15, c: 'pos' })],
        },
        {
          say: 'Lalu ke utara 6 kilometer.',
          add: [ln('n', 250, 230, 250, 110, { sw: 3, c: 'acc', arrow: 'end' }), T('ln', '6 km', 280, 170, { size: 15, c: 'acc' }), rightMark('rm', [250, 230], [90, 230], [250, 110], 12)],
        },
        {
          say: 'Jarak lurusnya adalah sisi miring: akar dari 64 tambah 36, yaitu akar 100, sama dengan 10 kilometer. Lebih pendek dari 8 tambah 6.',
          add: [ln('d', 90, 230, 250, 110, { sw: 3.5, c: 'ok', dash: '7 5' }), T('ld', '10 km', 150, 155, { size: 18, c: 'ok' }), T('r', '√(8² + 6²) = √100 = 10', 200, 50, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Layar televisi berukuran 48 sentimeter kali 36 sentimeter. Berapa panjang diagonalnya?',
          clear: true,
          add: [box('tv', 200, 120, 192, 144, { fill: 'mut-soft', r: 6 }), ln('dg', 104, 192, 296, 48, { sw: 2.5, dash: '6 5', c: 'acc' }), T('w', '48 cm', 200, 210, { size: 16 }), T('h', '36 cm', 330, 120, { size: 16 }), T('q', 'diagonal = ?', 200, 250, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: '60 cm', ok: true, why: '48, 36, 60 adalah 12 × (4, 3, 5).' },
              { t: '84 cm', why: '48 + 36 = 84. Pakai Pythagoras.' },
              { t: '√1.008 cm', why: 'Itu 48² − 36². Diagonal adalah sisi miring, jadi dijumlahkan.' },
              { t: '42 cm', why: 'Diagonal pasti lebih panjang dari sisi terpanjang (48 cm).' },
            ],
          },
        },
        {
          say: '48 kuadrat tambah 36 kuadrat sama dengan 2304 tambah 1296, yaitu 3600. Akar 3600 sama dengan 60 sentimeter. Atau ingat tripel: 3, 4, 5 dikali 12.',
          clear: true,
          add: [T('a', `${P(48, 2)} + ${P(36, 2)} = 2.304 + 1.296 = 3.600`, 200, 90, { size: 20 }), T('b', 'diagonal = √3.600 = {a:60 cm}', 200, 140, { size: 26 }), T('c', '(36, 48, 60) = 12 × (3, 4, 5)', 200, 195, { size: 17, c: 'mut' })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Tangga sepanjang 10 m bersandar pada tembok. Ujung atas tangga berada 8 m dari tanah. Jarak kaki tangga ke tembok adalah … m',
      ans: ['6'],
      wrong: { '2': '10 − 8 = 2. Kurangkan kuadratnya.', '36': '36 adalah kuadratnya. Jaraknya √36.' },
      steps: ['Tangga = sisi miring.', 'Jarak = √(10² − 8²) = √(100 − 64) = √36 = 6 m.'],
    },
    {
      type: 'num',
      q: 'Jarak antara titik A(1, 2) dan B(7, 10) adalah … satuan',
      ans: ['10'],
      wrong: { '14': '6 + 8 = 14. Jarak lurus memakai Pythagoras.', '100': '100 adalah kuadrat jaraknya. Jarak = √100.' },
      steps: ['Selisih mendatar: 7 − 1 = 6. Selisih tegak: 10 − 2 = 8.', 'Jarak = √(6² + 8²) = √100 = 10.'],
    },
    {
      q: 'Seorang anak berjalan 12 m ke barat, lalu 9 m ke selatan. Jarak anak itu dari titik awal adalah …',
      options: [
        { t: '15 m', ok: true },
        { t: '21 m', why: '21 m adalah panjang jalan yang dilalui. Jarak lurus memakai Pythagoras.' },
        { t: '3 m', why: '12 − 9 = 3. Gunakan √(12² + 9²).' },
        { t: '√63 m', why: 'Itu 12² − 9². Jarak lurus adalah sisi miring.' },
      ],
      steps: ['Jalur barat dan selatan membentuk sudut siku-siku.', 'Jarak = √(144 + 81) = √225 = 15 m.'],
    },
    {
      type: 'num',
      q: 'Sebuah layang-layang tersangkut di pohon. Benangnya lurus sepanjang 25 m, dan jarak mendatar dari anak ke pohon 7 m. Tinggi layang-layang (dari tangan anak) adalah … m',
      ans: ['24'],
      wrong: { '18': '25 − 7 = 18. Kurangkan kuadratnya.', '576': '576 adalah kuadratnya. Tinggi = √576.' },
      steps: ['Benang = sisi miring.', 'Tinggi = √(25² − 7²) = √(625 − 49) = √576 = 24 m.'],
    },
    {
      q: 'Sebuah lapangan berbentuk persegi panjang 40 m × 30 m. Budi berjalan dari satu pojok ke pojok seberang melalui diagonal, sedangkan Ani berjalan memutar melalui tepi. Selisih jarak tempuh mereka adalah …',
      options: [
        { t: '20 m', ok: true },
        { t: '50 m', why: '50 m adalah jarak Budi. Ani menempuh 40 + 30 = 70 m.' },
        { t: '70 m', why: '70 m adalah jarak Ani. Hitung selisihnya dengan jarak Budi.' },
        { t: '10 m', why: 'Budi: √(40² + 30²) = 50 m. Ani: 70 m. Selisih 20 m.' },
      ],
      steps: ['Budi (diagonal): √(1.600 + 900) = √2.500 = 50 m.', 'Ani (tepi): 40 + 30 = 70 m.', 'Selisih: 70 − 50 = 20 m.'],
    },
  ],
};

export default {
  id: 'k8b2',
  no: 2,
  title: 'Teorema Pythagoras',
  desc: 'Kuadrat sisi segitiga siku-siku, mencari panjang sisi, tripel Pythagoras, jenis segitiga, dan penerapannya.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      type: 'num',
      q: 'Keliling sebuah segitiga siku-siku 24 cm. Kedua sisi siku-sikunya 6 cm dan 8 cm. Luas segitiga itu adalah … cm²',
      ans: ['24'],
      wrong: { '48': 'Luas segitiga = ½ × alas × tinggi = ½ × 6 × 8.' },
      steps: ['Sisi siku-siku adalah alas dan tinggi.', 'Luas = ½ × 6 × 8 = 24 cm².'],
    },
    {
      q: 'Sebuah kubus memiliki rusuk 3 cm. Panjang diagonal salah satu sisinya adalah …',
      options: [
        { t: '3√2 cm', ok: true },
        { t: '6 cm', why: 'Diagonal sisi = √(3² + 3²) = √18.' },
        { t: '9 cm', why: '9 adalah luas sisi kubus.' },
        { t: '3√3 cm', why: '3√3 adalah diagonal ruang kubus, bukan diagonal sisi.' },
      ],
      steps: ['Diagonal sisi = √(3² + 3²) = √18.', '√18 = √(9 × 2) = 3√2 cm.'],
    },
    {
      type: 'num',
      q: 'Pesawat terbang 30 km ke utara, lalu 40 km ke timur. Jarak pesawat dari tempat semula adalah … km',
      ans: ['50'],
      wrong: { '70': 'Itu panjang lintasan. Jarak lurus = √(30² + 40²).', '2500': '2.500 adalah kuadrat jaraknya.' },
      steps: ['Utara dan timur saling tegak lurus.', 'Jarak = √(900 + 1.600) = √2.500 = 50 km.'],
    },
  ],
};
