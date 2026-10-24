// Bab 1: Bilangan Bulat
import { T, chips, place, numberLine, dot, hop, box, range, table } from './helpers.js';

// ---------- 1.1 Bilangan negatif dan garis bilangan ----------
const thermoY = (v) => 50 + (6 - v) * 13;
const TX = 110;
function thermometer() {
  const els = [
    { id: 'tube', t: 'rect', x: TX, y: 154, w: 24, h: 232, r: 12, fill: 'paper', stroke: 'ink', sw: 2.5, z: -2 },
    { id: 'bulb', t: 'circle', x: TX, y: 272, r: 17, fill: 'neg', stroke: 'ink', sw: 2.5, z: -1 },
  ];
  for (let v = 6; v >= -10; v--) {
    const big = v % 2 === 0;
    els.push({ id: `tk${v}`, t: 'line', x: TX - 12, y: thermoY(v), x2: TX - (big ? 24 : 18), y2: thermoY(v), sw: 2, draw: false });
    if (big)
      els.push({ id: `tl${v}`, t: 'text', x: TX - 32, y: thermoY(v), text: v < 0 ? `{n:−${-v}}` : v > 0 ? `{p:${v}}` : '0', size: 13, a: 'end', w: 800 });
  }
  return els;
}
const ptr = (id, v, label, c = 'acc') => [
  { id, t: 'poly', x: TX + 16, y: thermoY(v), pts: [[0, 0], [14, -8], [14, 8]], fill: c, stroke: 'ink', sw: 1.5 },
  { id: `${id}L`, t: 'text', x: TX + 38, y: thermoY(v), text: label, size: 18, a: 'start', w: 800 },
];

const NL = numberLine('nl', 200, 150, 380, -8, 8);

const l1 = {
  id: 'b1-1',
  title: 'Bilangan Negatif dan Garis Bilangan',
  hook: 'Mana yang lebih dingin, {n:−8} °C atau {n:−3} °C? Angka 8 lebih besar, tapi apakah {n:−8} juga lebih besar?',
  chapters: [
    {
      title: 'Mana lebih dingin?',
      steps: [
        {
          say: 'Mana yang lebih dingin, minus 8 derajat atau minus 3 derajat?',
          add: [T('q', 'Mana yang lebih dingin?', 200, 80, { size: 22, w: 700 }), T('a', '{n:−8} °C', 120, 160, { size: 50 }), T('b', '{n:−3} °C', 280, 160, { size: 50 })],
        },
        {
          say: 'Coba jawab dulu sebelum lanjut.',
          ask: {
            q: 'Mana yang lebih dingin?',
            options: [
              { t: '{n:−8} °C', ok: true, why: 'Makin jauh di bawah nol, makin dingin.' },
              { t: '{n:−3} °C', why: 'Angka 3 memang lebih kecil dari 8. Tapi pada bilangan negatif, yang lebih jauh dari nol justru lebih kecil dan lebih dingin.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Termometer',
      steps: [
        {
          say: 'Lihat termometer. Ada angka nol. Di atas nol bilangan positif, di bawah nol bilangan negatif.',
          clear: true,
          add: [...thermometer(), ...ptr('p1', 0, '0 °C')],
        },
        {
          say: 'Minus 3 derajat artinya 3 tingkat di bawah nol.',
          set: { p1: { y: thermoY(-3) }, p1L: { y: thermoY(-3), text: '{n:−3} °C' } },
        },
        {
          say: 'Minus 8 derajat artinya 8 tingkat di bawah nol. Letaknya lebih jauh ke bawah.',
          add: ptr('p2', -8, '{n:−8} °C', 'neg'),
          pulse: ['p2'],
        },
        {
          say: 'Yang letaknya lebih bawah, nilainya lebih kecil. Jadi minus 8 lebih kecil dari minus 3, dan lebih dingin.',
          add: [T('cmp', '{n:−8} < {n:−3}', 300, 140, { size: 36 }), T('cmp2', 'lebih bawah, lebih kecil', 300, 182, { size: 16, w: 700, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Garis bilangan',
      steps: [
        { say: 'Sekarang termometernya kita baringkan. Inilah garis bilangan.', clear: true, add: [NL.el] },
        {
          say: 'Nol ada di tengah. Ke kanan bilangan positif, makin ke kanan makin besar. Ke kiri bilangan negatif.',
          add: [T('rt', 'positif, makin besar →', 290, 100, { size: 15, c: 'pos' }), T('lf', '← negatif', 90, 100, { size: 15, c: 'neg' })],
        },
        {
          say: 'Tandai minus 3 dan minus 8.',
          add: [dot('d3', NL.at(-3), 150, 'neg'), dot('d8', NL.at(-8), 150, 'neg')],
          pulse: ['d3', 'd8'],
        },
        {
          say: 'Aturannya sederhana. Bilangan yang letaknya lebih kiri selalu lebih kecil.',
          add: [T('rule', 'Lebih kiri berarti lebih kecil', 200, 225, { size: 20, w: 800 }), T('cmp', '{n:−8} < {n:−3}', 200, 262, { size: 28 })],
          hl: ['d8'],
        },
      ],
    },
    {
      title: 'Lawan bilangan',
      steps: [
        {
          say: '3 dan minus 3 sama-sama berjarak 3 langkah dari nol, tapi arahnya berlawanan.',
          clear: true,
          keep: ['nl'],
          add: [
            dot('a', NL.at(3), 150, 'pos'),
            dot('b', NL.at(-3), 150, 'neg'),
            hop('h1', NL.at(0), NL.at(3), 150, { c: 'pos', label: '3 langkah' }),
            hop('h2', NL.at(0), NL.at(-3), 150, { c: 'neg', label: '3 langkah', below: true }),
          ],
        },
        {
          say: 'Karena itu, minus 3 disebut lawan dari 3.',
          add: [T('lw', '{n:−3} adalah lawan dari {p:3}', 200, 228, { size: 22 })],
        },
        {
          say: 'Lawan dari 5 adalah minus 5. Lawan dari minus 2 adalah 2.',
          add: [T('lw2', 'lawan {p:5} adalah {n:−5},   lawan {n:−2} adalah {p:2}', 200, 266, { size: 17, w: 700 })],
        },
      ],
    },
    {
      title: 'Mengurutkan',
      steps: [
        {
          say: 'Urutkan dari yang terkecil: minus 4, 2, minus 7, 0, dan 5.',
          clear: true,
          keep: ['nl'],
          add: [-4, 2, -7, 0, 5].map((v, i) => T(`v${i}`, v < 0 ? `{n:−${-v}}` : v > 0 ? `{p:${v}}` : '0', 70 + i * 65, 62, { size: 30 })),
        },
        {
          say: 'Letakkan setiap bilangan di garis bilangan.',
          set: Object.fromEntries([-4, 2, -7, 0, 5].map((v, i) => [`v${i}`, { x: NL.at(v), y: 112, size: 24 }])),
          add: [-4, 2, -7, 0, 5].map((v, i) => dot(`dv${i}`, NL.at(v), 150, v < 0 ? 'neg' : v > 0 ? 'pos' : 'ink')),
        },
        {
          say: 'Lalu baca dari kiri ke kanan: minus 7, minus 4, 0, 2, 5.',
          add: [T('ord', '{n:−7},  {n:−4},  0,  {p:2},  {p:5}', 200, 240, { size: 30 }), { id: 'arr', t: 'line', x: 60, y: 200, x2: 340, y2: 200, c: 'acc', arrow: 'end', sw: 3 }],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Urutkan dari yang terkecil: minus 1, minus 5, 3, dan minus 2.',
          clear: true,
          add: [T('q', 'Urutkan dari yang terkecil', 200, 90, { size: 20, w: 700 }), T('nums', '{n:−1},   {n:−5},   {p:3},   {n:−2}', 200, 150, { size: 36 })],
          ask: {
            q: 'Mana urutan yang benar?',
            options: [
              { t: '{n:−5}, {n:−2}, {n:−1}, {p:3}', ok: true, why: '{n:−5} paling jauh di kiri, jadi paling kecil.' },
              { t: '{n:−1}, {n:−2}, {n:−5}, {p:3}', why: 'Ini mengurutkan angkanya saja. Di garis bilangan, {n:−5} paling kiri, jadi {n:−5} yang paling kecil.' },
              { t: '{p:3}, {n:−1}, {n:−2}, {n:−5}', why: 'Ini urutan dari yang terbesar, bukan terkecil.' },
            ],
          },
        },
        {
          say: 'Di garis bilangan, minus 5 paling kiri, lalu minus 2, minus 1, dan 3.',
          clear: true,
          add: [
            NL.el,
            ...[-1, -5, 3, -2].map((v, i) => dot(`g${i}`, NL.at(v), 150, v < 0 ? 'neg' : 'pos')),
            T('ans', '{n:−5},  {n:−2},  {n:−1},  {p:3}', 200, 240, { size: 30 }),
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Suhu kota A {n:−5} °C dan suhu kota B {n:−2} °C. Pernyataan yang benar adalah …',
      options: [
        { t: 'Kota A lebih dingin', ok: true },
        { t: 'Kota B lebih dingin', why: '{n:−5} letaknya lebih jauh di bawah nol daripada {n:−2}, jadi kota A yang lebih dingin.' },
        { t: 'Sama dinginnya', why: 'Suhunya berbeda: {n:−5} dan {n:−2} tidak di titik yang sama.' },
      ],
      steps: ['Bayangkan termometer: {n:−5} ada 5 tingkat di bawah nol, {n:−2} hanya 2 tingkat di bawah nol.', 'Yang lebih bawah lebih dingin, jadi kota A lebih dingin.'],
    },
    {
      q: 'Tanda yang tepat untuk mengisi {n:−6} … {n:−9} adalah …',
      fixed: true,
      options: [
        { t: '>', ok: true },
        { t: '<', why: '9 memang lebih besar dari 6, tapi {n:−9} letaknya lebih kiri di garis bilangan, jadi {n:−9} lebih kecil.' },
        { t: '=', why: 'Keduanya di titik berbeda pada garis bilangan.' },
      ],
      steps: ['Di garis bilangan, {n:−9} ada di kiri {n:−6}.', 'Lebih kiri berarti lebih kecil, jadi {n:−6} > {n:−9}.'],
    },
    {
      q: 'Titik A pada garis bilangan di bawah menunjukkan bilangan …',
      fig: [numberLine('f', 200, 140, 380, -6, 6).el, dot('A', numberLine('f', 200, 140, 380, -6, 6).at(-4), 140, 'acc'), T('Al', 'A', numberLine('f', 200, 140, 380, -6, 6).at(-4), 112, { size: 20 })],
      viewBox: '0 95 400 75',
      options: [
        { t: '{n:−4}', ok: true },
        { t: '{p:4}', why: 'Titik A ada di kiri nol, jadi bilangannya negatif.' },
        { t: '{n:−3}', why: 'Hitung lagi langkah dari nol ke kiri: ada 4 langkah.' },
        { t: '{n:−5}', why: 'Hitung lagi langkah dari nol ke kiri: ada 4 langkah.' },
      ],
      steps: ['Mulai dari 0, hitung langkah ke kiri sampai titik A.', 'Ada 4 langkah ke kiri, jadi A = {n:−4}.'],
    },
    {
      type: 'num',
      q: 'Lawan dari {n:−12} adalah …',
      ans: ['12'],
      wrong: { '-12': 'Itu bilangannya sendiri. Lawan ada di sisi lain nol dengan jarak yang sama.' },
      hint: 'Lawan sebuah bilangan berjarak sama dari nol tapi arahnya berlawanan.',
      steps: ['{n:−12} berjarak 12 langkah di kiri nol.', 'Lawannya berjarak 12 langkah di kanan nol, yaitu {p:12}.'],
    },
    {
      q: 'Urutan dari yang terkecil untuk 3, {n:−1}, {n:−6}, 0, {n:−2} adalah …',
      options: [
        { t: '{n:−6}, {n:−2}, {n:−1}, 0, 3', ok: true },
        { t: '{n:−1}, {n:−2}, {n:−6}, 0, 3', why: 'Ini mengurutkan angkanya tanpa melihat tanda negatif. Bilangan negatif yang angkanya besar justru paling kecil.' },
        { t: '0, {n:−1}, {n:−2}, {n:−6}, 3', why: 'Bilangan negatif selalu lebih kecil dari 0, jadi semuanya harus di depan 0.' },
        { t: '3, 0, {n:−1}, {n:−2}, {n:−6}', why: 'Ini urutan dari yang terbesar.' },
      ],
      steps: ['Letakkan semua bilangan di garis bilangan.', 'Baca dari kiri ke kanan: {n:−6}, {n:−2}, {n:−1}, 0, 3.'],
    },
  ],
};

// ---------- 1.2 Menjumlahkan bilangan bulat ----------
const pairBoxes = (n, x0, dx, y) => range(0, n).map((i) => box(`pr${i}`, x0 + i * dx, y, 36, 92, { fill: 'none', stroke: 'acc', dash: '5 4', sw: 2.5, r: 10 }));

const l2 = {
  id: 'b1-2',
  title: 'Menjumlahkan Bilangan Bulat',
  hook: 'Kenapa {n:−7} + 4 hasilnya {n:−3}, bukan 3 atau {n:−11}? Jawabannya ada di pasangan nol.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa minus 7 tambah 4? Coba jawab dulu.',
          add: [T('q', '{n:−7} + {p:4} = ?', 200, 140, { size: 50 })],
          ask: {
            options: [
              { t: '{n:−3}', ok: true, why: 'Sekarang kita lihat kenapa.' },
              { t: '{p:3}', why: 'Hasilnya tidak mungkin positif, karena bagian negatifnya (7) lebih besar daripada bagian positifnya (4).' },
              { t: '{n:−11}', why: 'Ini menjumlahkan 7 dan 4 lalu memberi tanda minus. Padahal tandanya berbeda, jadi keduanya saling mengurangi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dua jenis keping',
      steps: [
        {
          say: 'Kita pakai dua jenis keping. Keping biru bernilai positif 1. Keping merah bernilai negatif 1.',
          clear: true,
          add: [
            { id: 'cp', t: 'icon', name: 'chipP', size: 60, x: 130, y: 130 },
            { id: 'cn', t: 'icon', name: 'chipN', size: 60, x: 270, y: 130 },
            T('pv', '{p:+1}', 130, 200, { size: 28 }),
            T('nv', '{n:−1}', 270, 200, { size: 28 }),
          ],
        },
        {
          say: 'Satu keping biru dan satu keping merah saling menghapus. Nilainya nol. Ini kita sebut pasangan nol.',
          del: ['pv', 'nv'],
          set: { cp: { x: 168 }, cn: { x: 232 } },
          add: [T('eq', '{p:+1} + ({n:−1}) = 0', 200, 215, { size: 28 }), box('ring', 200, 130, 140, 80, { fill: 'none', stroke: 'acc', dash: '6 5', r: 40, sw: 3 })],
        },
        {
          say: 'Pasangan nol boleh dibuang atau ditambahkan kapan saja, karena nilainya nol.',
          set: { cp: { o: 0.25 }, cn: { o: 0.25 } },
          add: [T('zero', '0', 200, 130, { size: 44 })],
        },
      ],
    },
    {
      title: 'Tandanya sama',
      steps: [
        {
          say: '3 tambah 2. Ada 3 keping biru dan 2 keping biru.',
          clear: true,
          add: [T('q', '{p:3} + {p:2}', 200, 60, { size: 34 }), ...chips('a', '+', 3, 100, 140), ...chips('b', '+', 2, 260, 140)],
        },
        {
          say: 'Semuanya biru, tidak ada pasangan nol. Hasilnya 5.',
          set: { ...place('b', [0, 1], 208, 140), q: { text: '{p:3} + {p:2} = {p:5}' } },
        },
        {
          say: 'Minus 3 tambah minus 2. Ada 3 keping merah dan 2 keping merah.',
          clear: true,
          add: [T('q', '{n:−3} + ({n:−2})', 200, 60, { size: 34 }), ...chips('a', '-', 3, 100, 140), ...chips('b', '-', 2, 260, 140)],
        },
        {
          say: 'Semuanya merah. Hasilnya minus 5. Jadi kalau tandanya sama, jumlahkan saja, tandanya tetap.',
          set: { ...place('b', [0, 1], 208, 140), q: { text: '{n:−3} + ({n:−2}) = {n:−5}' } },
        },
      ],
    },
    {
      title: 'Tandanya beda',
      steps: [
        {
          say: 'Sekarang 5 tambah minus 3. Ada 5 keping biru dan 3 keping merah.',
          clear: true,
          add: [T('q', '{p:5} + ({n:−3})', 200, 55, { size: 34 }), ...chips('p', '+', 5, 110, 120, { dx: 44 }), ...chips('n', '-', 3, 110, 172, { dx: 44 })],
        },
        { say: 'Pasangkan biru dengan merah. Ada 3 pasangan nol.', add: pairBoxes(3, 110, 44, 146) },
        { say: 'Pasangan nol dibuang, karena nilainya nol.', del: ['p0', 'p1', 'p2', 'n*', 'pr*'] },
        {
          say: 'Tersisa 2 keping biru. Jadi 5 tambah minus 3 sama dengan 2.',
          set: { p3: { x: 178, y: 145 }, p4: { x: 222, y: 145 }, q: { text: '{p:5} + ({n:−3}) = {p:2}' } },
        },
        {
          say: 'Kembali ke soal tadi: minus 7 tambah 4.',
          clear: true,
          add: [T('q', '{n:−7} + {p:4}', 200, 55, { size: 34 }), ...chips('n', '-', 7, 68, 120, { dx: 44 }), ...chips('p', '+', 4, 68, 172, { dx: 44 })],
        },
        { say: 'Ada 4 pasangan nol.', add: pairBoxes(4, 68, 44, 146) },
        { say: 'Buang pasangan nolnya.', del: ['n0', 'n1', 'n2', 'n3', 'p*', 'pr*'] },
        {
          say: 'Tersisa 3 keping merah. Hasilnya minus 3.',
          set: { n4: { x: 156, y: 145 }, n5: { x: 200, y: 145 }, n6: { x: 244, y: 145 }, q: { text: '{n:−7} + {p:4} = {n:−3}' } },
        },
      ],
    },
    {
      title: 'Di garis bilangan',
      steps: [
        {
          say: 'Cara lain, pakai garis bilangan. Mulai dari minus 7.',
          clear: true,
          add: [T('q', '{n:−7} + {p:4}', 200, 55, { size: 32 }), { ...NL.el, y: 180 }, dot('s', NL.at(-7), 180, 'neg')],
        },
        {
          say: 'Menambah 4 berarti melangkah 4 ke kanan. Kita sampai di minus 3.',
          add: [hop('h', NL.at(-7), NL.at(-3), 180, { c: 'pos', label: '+4, ke kanan' }), dot('e', NL.at(-3), 180, 'ok')],
          set: { q: { text: '{n:−7} + {p:4} = {n:−3}' } },
        },
        {
          say: 'Menambah bilangan negatif berarti melangkah ke kiri. 2 tambah minus 5: dari 2 melangkah 5 ke kiri, sampai di minus 3.',
          del: ['s', 'h', 'e'],
          set: { q: { text: '{p:2} + ({n:−5}) = {n:−3}' } },
          add: [dot('s2', NL.at(2), 180, 'pos'), hop('h2', NL.at(2), NL.at(-3), 180, { c: 'neg', label: '−5, ke kiri' }), dot('e2', NL.at(-3), 180, 'ok')],
        },
      ],
    },
    {
      title: 'Aturannya',
      steps: [
        {
          say: 'Kalau tandanya sama, jumlahkan, tandanya tetap.',
          clear: true,
          add: [
            T('r1t', 'Tanda sama', 200, 62, { size: 24, font: 'serif', w: 600 }),
            T('r1', 'jumlahkan, tandanya tetap', 200, 94, { size: 17, w: 700, c: 'mut' }),
            T('r1e', '{n:−4} + ({n:−6}) = {n:−10}', 200, 128, { size: 24 }),
          ],
        },
        {
          say: 'Kalau tandanya beda, kurangkan. Tandanya mengikuti keping yang lebih banyak. Misalnya 9 tambah minus 14: keping merah lebih banyak 5, jadi hasilnya minus 5.',
          add: [
            T('r2t', 'Tanda beda', 200, 180, { size: 24, font: 'serif', w: 600 }),
            T('r2', 'kurangkan, tanda ikut yang lebih banyak', 200, 212, { size: 17, w: 700, c: 'mut' }),
            T('r2e', '{p:9} + ({n:−14}) = {n:−5}', 200, 246, { size: 24 }),
          ],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Minus 9 tambah 6, berapa?',
          clear: true,
          add: [T('q', '{n:−9} + {p:6} = ?', 200, 140, { size: 48 })],
          ask: {
            options: [
              { t: '{n:−3}', ok: true, why: 'Keping merah lebih banyak 3.' },
              { t: '{p:3}', why: 'Keping merahnya 9, birunya cuma 6. Sisanya pasti merah, jadi hasilnya negatif.' },
              { t: '{n:−15}', why: 'Tanda kedua bilangan berbeda, jadi tidak dijumlahkan. Pasangkan dulu, lalu hitung sisanya.' },
            ],
          },
        },
        {
          say: 'Ada 6 pasangan nol. Setelah dibuang, tersisa 3 keping merah. Jawabannya minus 3.',
          clear: true,
          add: [
            T('q', '{n:−9} + {p:6} = {n:−3}', 200, 55, { size: 32 }),
            ...chips('n', '-', 9, 48, 130, { dx: 38 }),
            ...chips('p', '+', 6, 48, 182, { dx: 38 }),
            ...range(0, 6).map((i) => box(`pr${i}`, 48 + i * 38, 156, 34, 92, { fill: 'none', stroke: 'acc', dash: '5 4', sw: 2.5, r: 10 })),
          ],
          hl: ['n6', 'n7', 'n8'],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '{n:−8} + 5 = …',
      ans: ['-3'],
      wrong: {
        '3': 'Keping merah ada 8, biru 5. Setelah 5 pasangan nol dibuang, yang tersisa keping merah, jadi hasilnya negatif.',
        '-13': 'Tandanya berbeda, jadi tidak dijumlahkan. Pasangkan dulu biru dan merah.',
        '13': 'Tandanya berbeda, jadi tidak dijumlahkan. Pasangkan dulu biru dan merah.',
      },
      steps: ['8 keping merah dan 5 keping biru membentuk 5 pasangan nol.', 'Tersisa 3 keping merah, jadi hasilnya {n:−3}.'],
    },
    {
      q: '{n:−4} + ({n:−6}) = …',
      options: [
        { t: '{n:−10}', ok: true },
        { t: '{p:10}', why: 'Semua kepingnya merah (negatif), jadi hasilnya negatif.' },
        { t: '{n:−2}', why: 'Tandanya sama-sama negatif, jadi tidak ada pasangan nol. Jumlahkan: 4 + 6 = 10, tandanya tetap negatif.' },
        { t: '{p:2}', why: 'Tandanya sama-sama negatif, jadi jumlahkan dan tandanya tetap negatif.' },
      ],
      steps: ['4 keping merah ditambah 6 keping merah.', 'Totalnya 10 keping merah, yaitu {n:−10}.'],
    },
    {
      q: 'Nilai total keping di bawah adalah …',
      fig: [...chips('n', '-', 6, 110, 120, { dx: 36 }), ...chips('p', '+', 2, 110, 172, { dx: 36 })],
      viewBox: '60 90 280 110',
      figLabel: '6 keping merah dan 2 keping biru',
      options: [
        { t: '{n:−4}', ok: true },
        { t: '{p:4}', why: 'Keping merah lebih banyak, jadi sisanya merah dan hasilnya negatif.' },
        { t: '{n:−8}', why: 'Keping biru tidak ikut dihitung sebagai negatif. 2 biru menghapus 2 merah.' },
        { t: '{p:8}', why: 'Ini menjumlah semua keping tanpa melihat warnanya.' },
      ],
      steps: ['Ada 6 merah ({n:−6}) dan 2 biru ({p:2}).', '2 pasangan nol dibuang, tersisa 4 merah: {n:−4}.'],
    },
    {
      q: 'Suhu pagi hari {n:−6} °C. Siang harinya naik 9 derajat. Suhu siang hari adalah …',
      options: [
        { t: '{p:3} °C', ok: true },
        { t: '{n:−15} °C', why: 'Naik berarti bergerak ke atas, jadi suhunya bertambah, bukan makin dingin.' },
        { t: '{n:−3} °C', why: 'Dari {n:−6}, 6 langkah pertama baru sampai 0. Masih ada 3 langkah lagi ke atas, jadi hasilnya {p:3}.' },
        { t: '{p:15} °C', why: 'Ini menjumlahkan 6 dan 9 tanpa melihat bahwa {n:−6} ada di bawah nol.' },
      ],
      steps: ['Hitung {n:−6} + 9.', '6 langkah naik membawa ke 0, sisa 3 langkah membawa ke {p:3}.'],
    },
    {
      type: 'num',
      q: '15 + ({n:−22}) = …',
      ans: ['-7'],
      wrong: {
        '7': 'Bagian negatifnya (22) lebih besar daripada bagian positifnya (15), jadi hasilnya negatif.',
        '-37': 'Tandanya berbeda, jadi kurangkan, bukan jumlahkan.',
        '37': 'Tandanya berbeda, jadi kurangkan, bukan jumlahkan.',
      },
      steps: ['Tandanya berbeda, jadi kurangkan: 22 − 15 = 7.', 'Bagian negatif lebih banyak, jadi hasilnya {n:−7}.'],
    },
  ],
};

// ---------- 1.3 Mengurangkan bilangan bulat ----------
const tray = (x = 335, w = 100) => [
  box('tray', x, 150, w, 74, { fill: 'none', stroke: 'mut', dash: '6 5', r: 12 }),
  T('trayL', 'diambil', x, 100, { size: 14, c: 'mut' }),
];

const l3 = {
  id: 'b1-3',
  title: 'Mengurangkan Bilangan Bulat',
  hook: 'Kenapa {p:2} − ({n:−3}) hasilnya 5? Mengurangi itu mengambil, dan kadang yang mau diambil belum ada.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa 2 kurang minus 3? Coba jawab dulu.',
          add: [T('q', '{p:2} − ({n:−3}) = ?', 200, 140, { size: 48 })],
          ask: {
            options: [
              { t: '{p:5}', ok: true, why: 'Sekarang kita lihat kenapa hasilnya justru lebih besar dari 2.' },
              { t: '{n:−1}', why: 'Ini hasil dari 2 + (−3). Mengurangi tidak sama dengan menambah.' },
              { t: '{n:−5}', why: 'Hasilnya positif. Kita lihat kenapa sebentar lagi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Mengurangi itu mengambil',
      steps: [
        {
          say: 'Mengurangi artinya mengambil. 5 kurang 2: ada 5 keping biru, lalu kita ambil 2.',
          clear: true,
          add: [T('q', '{p:5} − {p:2}', 200, 52, { size: 32 }), ...tray(), ...chips('p', '+', 5, 50, 150, { dx: 40 })],
        },
        {
          say: 'Ambil 2 keping biru. Sisanya 3.',
          set: { p3: { x: 315 }, p4: { x: 355 }, q: { text: '{p:5} − {p:2} = {p:3}' } },
        },
      ],
    },
    {
      title: 'Yang diambil tidak ada',
      steps: [
        {
          say: 'Sekarang 2 kurang minus 3. Ada 2 keping biru, dan kita harus mengambil 3 keping merah.',
          clear: true,
          keep: ['tray', 'trayL'],
          add: [T('q', '{p:2} − ({n:−3})', 200, 52, { size: 32 }), ...chips('p', '+', 2, 50, 130, { dx: 40 })],
        },
        {
          say: 'Masalahnya, tidak ada keping merah sama sekali.',
          add: [T('none', 'keping merahnya tidak ada', 140, 220, { size: 16, c: 'neg' })],
        },
        {
          say: 'Tambahkan 3 pasangan nol. Nilainya tetap 2, karena pasangan nol bernilai nol.',
          del: ['none'],
          add: [...chips('zp', '+', 3, 130, 130, { dx: 40 }), ...chips('zn', '-', 3, 130, 182, { dx: 40 }), T('zl', 'nilainya tetap 2', 150, 240, { size: 16, c: 'mut' })],
        },
        {
          say: 'Sekarang ambil 3 keping merah.',
          del: ['zl'],
          set: { zn0: { x: 303, y: 150 }, zn1: { x: 335, y: 150 }, zn2: { x: 367, y: 150 } },
        },
        {
          say: 'Yang tersisa 5 keping biru. Jadi 2 kurang minus 3 sama dengan 5.',
          set: { ...place('zp', [0, 1, 2], 130, 130, { dx: 40 }), q: { text: '{p:2} − ({n:−3}) = {p:5}' } },
          pulse: ['p*', 'zp*'],
        },
      ],
    },
    {
      title: 'Lihat polanya',
      steps: [
        {
          say: 'Hasilnya sama dengan 2 tambah 3.',
          clear: true,
          add: [T('l1', '{p:2} − ({n:−3}) = {p:5}', 200, 100, { size: 34 }), T('l2', '{p:2} + {p:3} = {p:5}', 200, 160, { size: 34 })],
        },
        {
          say: 'Mengambil minus 3 sama saja dengan menambah 3.',
          add: [T('l3', 'mengambil {n:−3} sama dengan menambah {p:3}', 200, 228, { size: 19, w: 800 })],
        },
      ],
    },
    {
      title: 'Contoh kedua',
      steps: [
        {
          say: 'Contoh kedua: minus 4 kurang 2. Ada 4 keping merah, dan kita harus mengambil 2 keping biru.',
          clear: true,
          add: [T('q', '{n:−4} − {p:2}', 200, 52, { size: 32 }), ...tray(340, 90), ...chips('n', '-', 4, 40, 130, { dx: 40 })],
        },
        {
          say: 'Tidak ada keping biru, jadi tambahkan 2 pasangan nol.',
          add: [...chips('zp', '+', 2, 200, 130, { dx: 40 }), ...chips('zn', '-', 2, 200, 182, { dx: 40 })],
        },
        { say: 'Ambil 2 keping biru.', set: { zp0: { x: 322, y: 150 }, zp1: { x: 358, y: 150 } } },
        {
          say: 'Tersisa 6 keping merah. Hasilnya minus 6, sama dengan minus 4 tambah minus 2.',
          set: { ...place('zn', [0, 1], 200, 130, { dx: 40 }), q: { text: '{n:−4} − {p:2} = {n:−6}' } },
          add: [T('alt', 'sama dengan {n:−4} + ({n:−2})', 140, 230, { size: 18, w: 700 })],
        },
      ],
    },
    {
      title: 'Aturannya',
      steps: [
        {
          say: 'Jadi, mengurangi suatu bilangan sama dengan menambah lawannya.',
          clear: true,
          add: [T('rule', 'a − b = a + (lawan b)', 200, 72, { size: 32, font: 'serif', w: 600 })],
        },
        {
          say: '7 kurang 10 sama dengan 7 tambah minus 10, hasilnya minus 3. Minus 5 kurang minus 8 sama dengan minus 5 tambah 8, hasilnya 3.',
          add: [
            table(
              'tab',
              200,
              192,
              [
                ['Soal', 'Ubah jadi tambah', 'Hasil'],
                ['7 − 10', '7 + ({n:−10})', '{n:−3}'],
                ['{n:−5} − ({n:−8})', '{n:−5} + {p:8}', '{p:3}'],
                ['{n:−4} − 2', '{n:−4} + ({n:−2})', '{n:−6}'],
              ],
              { cw: [120, 150, 70], rh: 36, size: 16, head: true },
            ),
          ],
        },
      ],
    },
    {
      title: 'Selisih suhu',
      steps: [
        {
          say: 'Siang hari suhunya 4 derajat. Malam harinya minus 3 derajat. Berapa selisihnya?',
          clear: true,
          add: [T('q', 'Siang {p:4} °C, malam {n:−3} °C', 200, 58, { size: 22 }), { ...NL.el, y: 165 }, dot('a', NL.at(4), 165, 'pos'), dot('b', NL.at(-3), 165, 'neg')],
        },
        {
          say: 'Dari minus 3 ke nol ada 3 langkah. Dari nol ke 4 ada 4 langkah. Totalnya 7.',
          add: [hop('h1', NL.at(-3), NL.at(0), 165, { label: '3' }), hop('h2', NL.at(0), NL.at(4), 165, { label: '4' })],
        },
        {
          say: 'Hitungannya: 4 kurang minus 3, sama dengan 4 tambah 3, sama dengan 7 derajat.',
          add: [T('eq', '{p:4} − ({n:−3}) = {p:4} + {p:3} = {p:7}', 200, 245, { size: 24 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Minus 6 kurang minus 2, berapa?',
          clear: true,
          add: [T('q', '{n:−6} − ({n:−2}) = ?', 200, 140, { size: 46 })],
          ask: {
            options: [
              { t: '{n:−4}', ok: true, why: 'Dari 6 keping merah, diambil 2.' },
              { t: '{n:−8}', why: 'Itu hasil {n:−6} + ({n:−2}), yaitu menambah. Di sini {n:−2} diambil, jadi sama dengan menambah 2.' },
              { t: '{p:4}', why: 'Hasilnya masih negatif: dari 6 keping merah hanya diambil 2.' },
            ],
          },
        },
        {
          say: 'Ada 6 keping merah.',
          clear: true,
          add: [T('q', '{n:−6} − ({n:−2})', 200, 52, { size: 32 }), ...tray(340, 90), ...chips('n', '-', 6, 40, 150, { dx: 40 })],
        },
        {
          say: 'Ambil 2 keping merah. Tersisa 4 keping merah, jadi hasilnya minus 4.',
          set: { n4: { x: 322 }, n5: { x: 358 }, q: { text: '{n:−6} − ({n:−2}) = {n:−6} + {p:2} = {n:−4}', size: 26 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '3 − 8 = …',
      ans: ['-5'],
      wrong: { '5': 'Mengambil 8 dari 3: setelah 3 habis, masih harus mengambil 5 lagi, jadi hasilnya di bawah nol.', '11': 'Ini menjumlahkan, bukan mengurangi.' },
      steps: ['3 − 8 = 3 + ({n:−8}).', 'Bagian negatif lebih besar 5, jadi hasilnya {n:−5}.'],
    },
    {
      q: '{n:−7} − ({n:−4}) = …',
      options: [
        { t: '{n:−3}', ok: true },
        { t: '{n:−11}', why: 'Itu hasil {n:−7} + ({n:−4}). Mengurangi {n:−4} artinya menambah 4.' },
        { t: '{p:3}', why: 'Dari 7 keping merah hanya diambil 4, jadi masih ada 3 keping merah. Hasilnya negatif.' },
        { t: '{p:11}', why: 'Mengurangi {n:−4} sama dengan menambah 4: {n:−7} + 4 = {n:−3}.' },
      ],
      steps: ['Ubah jadi tambah lawannya: {n:−7} − ({n:−4}) = {n:−7} + 4.', '{n:−7} + 4 = {n:−3}.'],
    },
    {
      q: 'Bentuk yang nilainya sama dengan 9 − ({n:−5}) adalah …',
      options: [
        { t: '9 + 5', ok: true },
        { t: '9 − 5', why: 'Ini mengambil 5, padahal yang diambil adalah {n:−5}. Mengambil {n:−5} sama dengan menambah 5.' },
        { t: '{n:−9} + 5', why: 'Bilangan pertama tidak berubah, tetap 9.' },
        { t: '9 + ({n:−5})', why: 'Ini sama dengan 9 − 5. Lawan dari {n:−5} adalah 5, jadi 9 + 5.' },
      ],
      steps: ['a − b = a + (lawan b).', 'Lawan dari {n:−5} adalah 5, jadi 9 − ({n:−5}) = 9 + 5 = 14.'],
    },
    {
      q: 'Suhu di puncak gunung {n:−2} °C dan di kaki gunung 21 °C. Selisih suhunya adalah …',
      options: [
        { t: '23 °C', ok: true },
        { t: '19 °C', why: 'Ini 21 − 2, seolah {n:−2} ada di atas nol. Dari {n:−2} ke 0 ada 2 langkah, lalu dari 0 ke 21 ada 21 langkah.' },
        { t: '{n:−23} °C', why: 'Selisih suhu adalah jarak antara dua suhu, jadi dinyatakan positif.' },
        { t: '2 °C', why: 'Selisih dihitung dari suhu yang tinggi dikurangi suhu yang rendah: 21 − ({n:−2}).' },
      ],
      steps: ['Selisih = suhu tinggi − suhu rendah = 21 − ({n:−2}).', '21 − ({n:−2}) = 21 + 2 = 23 °C.'],
    },
    {
      type: 'num',
      q: '{n:−10} − 5 = …',
      ans: ['-15'],
      wrong: {
        '-5': 'Itu hasil {n:−10} + 5. Mengurangi 5 berarti bergerak 5 langkah ke kiri dari {n:−10}.',
        '15': 'Mulai dari {n:−10} lalu bergerak ke kiri, hasilnya makin negatif.',
        '5': 'Mulai dari {n:−10} lalu bergerak ke kiri, hasilnya makin negatif.',
      },
      steps: ['{n:−10} − 5 = {n:−10} + ({n:−5}).', 'Tandanya sama, jumlahkan: {n:−15}.'],
    },
  ],
};

// ---------- 1.4 Perkalian dan pembagian ----------
const MULT_ROWS = [3, 2, 1, 0, -1, -2, -3];
const multRow = (k, ans = true) => {
  const m = MULT_ROWS[k];
  const mt = m < 0 ? `({n:−${-m}})` : m > 0 ? `{p:${m}}` : '0';
  const r = m * -4;
  const rt = r < 0 ? `{n:−${-r}}` : r > 0 ? `{p:${r}}` : '0';
  return T(`r${k}`, `${mt} × ({n:−4}) = ${ans ? rt : '?'}`, 175, 56 + k * 36, { size: 22 });
};
const plus4 = (k) => T(`d${k}`, '+4', 300, 74 + k * 36, { size: 15, c: 'ok' });

const l4 = {
  id: 'b1-4',
  title: 'Perkalian dan Pembagian Bilangan Bulat',
  hook: 'Kenapa negatif dikali negatif jadi positif? Bukan hafalan: polanya yang memaksa begitu.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Berapa minus 3 kali minus 4? Coba jawab dulu.',
          add: [T('q', '({n:−3}) × ({n:−4}) = ?', 200, 140, { size: 44 })],
          ask: {
            options: [
              { t: '{p:12}', ok: true, why: 'Sekarang kita lihat kenapa hasilnya positif.' },
              { t: '{n:−12}', why: 'Banyak yang mengira negatif dikali negatif tetap negatif. Lihat polanya sebentar lagi.' },
              { t: '{n:−7}', why: 'Ini menjumlahkan, bukan mengalikan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kali itu tambah berulang',
      steps: [
        {
          say: '3 kali 4 artinya 3 kelompok, masing-masing berisi 4. Totalnya 12.',
          clear: true,
          add: [
            T('q', '{p:3} × {p:4}', 200, 44, { size: 30 }),
            ...chips('a', '+', 4, 150, 100, { dx: 34 }),
            ...chips('b', '+', 4, 150, 145, { dx: 34 }),
            ...chips('c', '+', 4, 150, 190, { dx: 34 }),
            T('sum', '4 + 4 + 4 = {p:12}', 200, 250, { size: 24 }),
          ],
        },
        {
          say: '3 kali minus 4 artinya 3 kelompok minus 4. Totalnya minus 12.',
          clear: true,
          add: [
            T('q', '{p:3} × ({n:−4})', 200, 44, { size: 30 }),
            ...chips('a', '-', 4, 150, 100, { dx: 34 }),
            ...chips('b', '-', 4, 150, 145, { dx: 34 }),
            ...chips('c', '-', 4, 150, 190, { dx: 34 }),
            T('sum', '({n:−4}) + ({n:−4}) + ({n:−4}) = {n:−12}', 200, 250, { size: 20 }),
          ],
        },
      ],
    },
    {
      title: 'Ikuti polanya',
      steps: [
        {
          say: 'Perhatikan pola ini. 3 kali minus 4 sama dengan minus 12. 2 kali minus 4 sama dengan minus 8. 1 kali minus 4 sama dengan minus 4.',
          clear: true,
          add: [multRow(0), multRow(1), multRow(2)],
        },
        { say: 'Setiap kali pengalinya turun 1, hasilnya naik 4.', add: [plus4(0), plus4(1)], pulse: ['d0', 'd1'] },
        { say: 'Lanjutkan polanya. 0 kali minus 4 sama dengan 0.', add: [multRow(3), plus4(2)] },
        { say: 'Lalu minus 1 kali minus 4? Polanya harus naik 4 lagi.', add: [multRow(4, false), plus4(3)], hl: ['r4'] },
        {
          say: 'Jadi minus 1 kali minus 4 sama dengan 4. Minus 2 kali minus 4 sama dengan 8. Minus 3 kali minus 4 sama dengan 12.',
          add: [multRow(4), multRow(5), multRow(6), plus4(4), plus4(5)],
        },
        { say: 'Negatif dikali negatif hasilnya positif. Ini bukan aturan sembarangan. Polanya yang memaksa begitu.', hl: ['r6'] },
      ],
    },
    {
      title: 'Aturan tanda',
      steps: [
        {
          say: 'Ini ringkasan tanda pada perkalian.',
          clear: true,
          add: [
            table(
              'tab',
              200,
              122,
              [
                ['×', '{p:positif}', '{n:negatif}'],
                ['{p:positif}', '{p:positif}', '{n:negatif}'],
                ['{n:negatif}', '{n:negatif}', '{p:positif}'],
              ],
              { cw: [92, 100, 100], rh: 46, size: 17, head: true },
            ),
          ],
        },
        {
          say: 'Tandanya sama, hasilnya positif. Tandanya beda, hasilnya negatif.',
          add: [T('s1', 'tanda sama: hasil {p:positif}', 200, 230, { size: 20 }), T('s2', 'tanda beda: hasil {n:negatif}', 200, 262, { size: 20 })],
        },
      ],
    },
    {
      title: 'Pembagian',
      steps: [
        {
          say: 'Pembagian adalah kebalikan perkalian. 12 dibagi minus 3 sama dengan berapa?',
          clear: true,
          add: [T('q', '{p:12} ÷ ({n:−3}) = ?', 200, 66, { size: 36 })],
        },
        { say: 'Cari bilangan yang kalau dikali minus 3 hasilnya 12.', add: [T('think', '? × ({n:−3}) = {p:12}', 200, 132, { size: 28 })] },
        {
          say: 'Jawabannya minus 4, karena minus 4 kali minus 3 sama dengan 12.',
          set: { think: { text: '{n:−4} × ({n:−3}) = {p:12}' }, q: { text: '{p:12} ÷ ({n:−3}) = {n:−4}' } },
          hl: ['think'],
        },
        {
          say: 'Aturan tandanya sama dengan perkalian. Minus 20 dibagi 4 sama dengan minus 5. Minus 18 dibagi minus 6 sama dengan 3.',
          add: [T('e1', '{n:−20} ÷ {p:4} = {n:−5}', 200, 205, { size: 24 }), T('e2', '{n:−18} ÷ ({n:−6}) = {p:3}', 200, 250, { size: 24 })],
        },
      ],
    },
    {
      title: 'Dalam cerita',
      steps: [
        {
          say: 'Suhu turun 2 derajat setiap jam, selama 5 jam. Berapa perubahan suhunya?',
          clear: true,
          add: [T('q', 'Turun 2 °C tiap jam, selama 5 jam', 200, 55, { size: 20 }), numberLine('nl2', 200, 160, 380, -10, 2).el, dot('s', numberLine('nl2', 200, 160, 380, -10, 2).at(0), 160, 'ink')],
        },
        {
          say: 'Setiap jam berubah minus 2. Lima kali berarti 5 kali minus 2.',
          add: range(0, 5).map((i) => {
            const L = numberLine('nl2', 200, 160, 380, -10, 2);
            return hop(`h${i}`, L.at(-2 * i), L.at(-2 * i - 2), 160, { c: 'neg', label: '−2', h: 20 });
          }),
        },
        { say: '5 kali minus 2 sama dengan minus 10. Suhunya turun 10 derajat.', add: [T('eq', '{p:5} × ({n:−2}) = {n:−10}', 200, 245, { size: 28 })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Minus 36 dibagi minus 4, berapa?',
          clear: true,
          add: [T('q', '({n:−36}) ÷ ({n:−4}) = ?', 200, 140, { size: 42 })],
          ask: {
            options: [
              { t: '{p:9}', ok: true, why: 'Tandanya sama, hasilnya positif.' },
              { t: '{n:−9}', why: 'Kedua bilangan negatif, tandanya sama, jadi hasilnya positif.' },
              { t: '{n:−40}', why: 'Ini menjumlahkan, bukan membagi.' },
            ],
          },
        },
        {
          say: 'Cek dengan perkalian: 9 kali minus 4 sama dengan minus 36. Jadi jawabannya 9.',
          set: { q: { text: '({n:−36}) ÷ ({n:−4}) = {p:9}' } },
          add: [T('chk', 'cek: {p:9} × ({n:−4}) = {n:−36}', 200, 210, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '({n:−6}) × 7 = …',
      ans: ['-42'],
      wrong: { '42': 'Tandanya berbeda (negatif dikali positif), jadi hasilnya negatif.', '1': 'Ini menjumlahkan, bukan mengalikan.' },
      steps: ['6 × 7 = 42.', 'Tandanya berbeda, jadi hasilnya {n:−42}.'],
    },
    {
      q: '({n:−5}) × ({n:−8}) = …',
      options: [
        { t: '{p:40}', ok: true },
        { t: '{n:−40}', why: 'Kedua bilangan negatif, tandanya sama, jadi hasilnya positif.' },
        { t: '{n:−13}', why: 'Ini menjumlahkan, bukan mengalikan.' },
        { t: '{p:3}', why: 'Ini mengurangkan, bukan mengalikan.' },
      ],
      steps: ['5 × 8 = 40.', 'Tanda sama (negatif × negatif), hasilnya positif: {p:40}.'],
    },
    {
      type: 'num',
      q: '{n:−56} ÷ 8 = …',
      ans: ['-7'],
      wrong: { '7': 'Tandanya berbeda, jadi hasilnya negatif. Cek: 8 × ({n:−7}) = {n:−56}.' },
      steps: ['56 ÷ 8 = 7.', 'Tandanya berbeda, hasilnya {n:−7}. Cek: 8 × ({n:−7}) = {n:−56}.'],
    },
    {
      q: 'Kapal selam turun 15 meter setiap menit dari permukaan laut. Posisinya setelah 4 menit adalah …',
      options: [
        { t: '{n:−60} m', ok: true },
        { t: '{p:60} m', why: 'Turun berarti arah negatif (di bawah permukaan laut).' },
        { t: '{n:−19} m', why: 'Ini menjumlahkan 15 dan 4. Turun 15 meter sebanyak 4 kali berarti dikali.' },
        { t: '{n:−11} m', why: 'Turun 15 meter sebanyak 4 kali berarti 4 × ({n:−15}).' },
      ],
      steps: ['Setiap menit berubah {n:−15} m.', '4 × ({n:−15}) = {n:−60}, jadi posisinya 60 m di bawah permukaan laut.'],
    },
    {
      q: '({n:−2}) × ({n:−3}) × ({n:−5}) = …',
      options: [
        { t: '{n:−30}', ok: true },
        { t: '{p:30}', why: '({n:−2}) × ({n:−3}) = 6 memang positif, tapi lalu 6 × ({n:−5}) = {n:−30}.' },
        { t: '{n:−10}', why: 'Ini menjumlahkan, bukan mengalikan.' },
        { t: '{p:10}', why: 'Kalikan berurutan: ({n:−2}) × ({n:−3}) = 6, lalu 6 × ({n:−5}).' },
      ],
      steps: ['({n:−2}) × ({n:−3}) = {p:6}.', '{p:6} × ({n:−5}) = {n:−30}. Tiga tanda negatif menghasilkan negatif.'],
    },
  ],
};

export default {
  id: 'b1',
  no: 1,
  title: 'Bilangan Bulat',
  desc: 'Bilangan negatif, garis bilangan, serta operasi tambah, kurang, kali, dan bagi.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      type: 'num',
      q: 'Nilai dari {n:−12} + 20 − ({n:−4}) adalah …',
      ans: ['12'],
      wrong: { '4': '{n:−12} + 20 = 8, lalu 8 − ({n:−4}) = 8 + 4 = 12. Mengurangi {n:−4} sama dengan menambah 4.' },
      steps: ['Kerjakan dari kiri: {n:−12} + 20 = 8.', '8 − ({n:−4}) = 8 + 4 = 12.'],
    },
    {
      q: 'Hasil dari {n:−48} ÷ 6 × ({n:−2}) adalah …',
      options: [
        { t: '{p:16}', ok: true },
        { t: '{n:−16}', why: '{n:−48} ÷ 6 = {n:−8}, lalu {n:−8} × ({n:−2}) = 16. Negatif kali negatif hasilnya positif.' },
        { t: '{p:4}', why: 'Ini menghitung 6 × ({n:−2}) lebih dulu. Kali dan bagi dikerjakan urut dari kiri.' },
        { t: '{n:−4}', why: 'Kali dan bagi dikerjakan urut dari kiri: ({n:−48} ÷ 6) dulu.' },
      ],
      steps: ['Kali dan bagi setara, dikerjakan dari kiri.', '{n:−48} ÷ 6 = {n:−8}.', '{n:−8} × ({n:−2}) = {p:16}.'],
    },
    {
      q: 'Dalam sebuah tes, jawaban benar diberi skor 4, salah diberi skor {n:−2}, dan tidak dijawab 0. Dari 20 soal, Rina menjawab 12 benar dan 5 salah. Skor Rina adalah …',
      options: [
        { t: '38', ok: true },
        { t: '58', why: 'Jawaban salah mengurangi skor: 5 × ({n:−2}) = {n:−10}, bukan +10.' },
        { t: '48', why: 'Jawaban salah juga dihitung: 5 × ({n:−2}) = {n:−10}.' },
        { t: '32', why: 'Soal yang tidak dijawab bernilai 0, jadi tidak mengurangi skor.' },
      ],
      steps: ['Benar: 12 × 4 = 48.', 'Salah: 5 × ({n:−2}) = {n:−10}.', 'Tidak dijawab: 3 × 0 = 0.', 'Skor = 48 + ({n:−10}) + 0 = 38.'],
    },
  ],
};
