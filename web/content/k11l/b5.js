// Kelas 11 Tingkat Lanjut · Bab 5: Fungsi dan Pemodelannya
import { T, ln, dot, table } from '../helpers.js';
import { plane, lineOn } from '../k8/plot.js';
import { tag, curve } from '../k10/kit.js';

const rad = (d) => (d * Math.PI) / 180;

// ---------- 5.1 Grafik fungsi trigonometri ----------
const CX = 68;
const CY = 150;
const R = 48;
const GX0 = 140;
const GW = 240;
const AMP = 48;
const gx = (deg) => GX0 + (deg / 360) * GW;
const gy = (v) => CY - v * AMP;
const onCircle = (deg) => [CX + R * Math.cos(rad(deg)), CY - R * Math.sin(rad(deg))];
const wave = (id, f, o = {}, to = 360) => {
  let d = '';
  for (let k = 0; k <= 120; k++) {
    const deg = (to * k) / 120;
    d += `${k ? 'L' : 'M'}${gx(deg).toFixed(1)},${gy(f(deg)).toFixed(1)} `;
  }
  return { id, t: 'path', x: 0, y: 0, d: d.trim(), stroke: 'pos', sw: 3, ...o };
};
const axes = () => [
  { id: 'uc', t: 'circle', x: CX, y: CY, r: R, fill: 'none', stroke: 'mut', sw: 1.5 },
  ln('ux', CX - R - 8, CY, CX + R + 8, CY, { sw: 1.5, c: 'mut', draw: false }),
  ln('gxa', GX0, CY, GX0 + GW + 8, CY, { sw: 2, arrow: 'end', draw: false }),
  ln('gya', GX0, CY + 70, GX0, CY - 75, { sw: 2, arrow: 'end', draw: false }),
  ...[90, 180, 270, 360].map((d) => T(`tk${d}`, `${d}°`, gx(d), CY + 14, { size: 11, c: 'mut' })),
  T('t1', '1', GX0 - 10, gy(1), { size: 11, c: 'mut' }),
  T('tm1', '−1', GX0 - 12, gy(-1), { size: 11, c: 'mut' }),
];
const trace = (deg) => {
  const [px, py] = onCircle(deg);
  const v = Math.sin(rad(deg));
  return {
    pc: { x: px, y: py },
    pr: { x: CX, y: CY, x2: px, y2: py },
    pg: { x: gx(deg), y: gy(v) },
    ph: { x: px, y: py, x2: gx(deg), y2: gy(v) },
  };
};
const traceEls = (deg) => {
  const s = trace(deg);
  return [
    ln('pr', s.pr.x, s.pr.y, s.pr.x2, s.pr.y2, { sw: 2, c: 'ink', draw: false }),
    ln('ph', s.ph.x, s.ph.y, s.ph.x2, s.ph.y2, { sw: 1.5, dash: '4 4', c: 'acc', z: -1 }),
    dot('pc', s.pc.x, s.pc.y, 'neg', { r: 6 }),
    dot('pg', s.pg.x, s.pg.y, 'neg', { r: 6 }),
  ];
};

const l1 = {
  id: 'k11lb5-1',
  title: 'Grafik Fungsi Trigonometri',
  hook: 'Titik yang berputar di lingkaran naik dan turun berulang-ulang. Jejak ketinggiannya membentuk gelombang sinus.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah titik berputar di lingkaran berjari-jari 1. Ketinggiannya dicatat di grafik sebelah kanan. Bentuk grafiknya seperti apa?',
          add: [axes(), traceEls(0)],
          ask: {
            options: [
              { t: 'gelombang yang naik-turun berulang', ok: true, why: 'Titik naik ke atas, turun ke bawah, lalu kembali. Polanya berulang setiap satu putaran.' },
              { t: 'garis lurus naik', why: 'Ketinggiannya tidak terus naik. Setelah puncak, titik turun lagi.' },
              { t: 'parabola', why: 'Parabola tidak berulang. Putaran berulang terus.' },
              { t: 'lingkaran', why: 'Yang dicatat adalah ketinggian terhadap sudut, bukan posisi titik.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dari putaran ke gelombang',
      steps: [
        {
          say: 'Sudut 0 derajat: tinggi 0. Putar ke 90 derajat: titik di puncak, tinggi 1.',
          set: trace(90),
          add: [wave('w', (d) => Math.sin(rad(d)), { sw: 2.5 }, 90)],
        },
        {
          say: '180 derajat: kembali ke tengah, tinggi 0.',
          set: { ...trace(180), w: wave('w', (d) => Math.sin(rad(d)), { sw: 2.5 }, 180) },
        },
        {
          say: '270 derajat: di bawah, tinggi minus 1.',
          set: { ...trace(270), w: wave('w', (d) => Math.sin(rad(d)), { sw: 2.5 }, 270) },
        },
        {
          say: '360 derajat: kembali ke awal. Tinggi titik pada sudut x adalah sinus x. Grafik ini adalah y sama dengan sin x.',
          set: { ...trace(360), w: wave('w', (d) => Math.sin(rad(d)), { sw: 2.5 }, 360) },
          add: [tag('e', 'y = sin x', 260, 40, 'pos', 15)],
        },
        {
          say: 'Nilai tertingginya 1 dan terendahnya minus 1. Polanya berulang setiap 360 derajat. 360 derajat ini disebut periode.',
          add: [tag('p', 'periode 360°, nilai −1 sampai 1', 260, 270, 'ink', 13)],
        },
      ],
    },
    {
      title: 'Amplitudo, periode, dan geseran',
      steps: [
        {
          say: 'y sama dengan 2 sin x: gelombang dua kali lebih tinggi. Setengah jarak puncak ke lembah disebut amplitudo. Di sini amplitudonya 2.',
          clear: true,
          add: [ln('gxa', GX0 - 120, CY, GX0 + GW + 8, CY, { sw: 2, arrow: 'end', draw: false }), ...[90, 180, 270, 360].map((d) => T(`tk${d}`, `${d}°`, gx(d), CY + 14, { size: 11, c: 'mut' })), wave('w0', (d) => Math.sin(rad(d)), { stroke: 'mut', sw: 1.5, dash: '5 4' }), wave('w', (d) => 2 * Math.sin(rad(d)), { stroke: 'acc' }), tag('e', 'y = 2 sin x', 80, 60, 'acc', 15)],
        },
        {
          say: 'y sama dengan sin 2x: gelombang dua kali lebih rapat. Periodenya menjadi 360 dibagi 2, yaitu 180 derajat.',
          set: { w: wave('w', (d) => Math.sin(rad(2 * d)), { stroke: 'neg' }), e: tag('e', 'y = sin 2x', 80, 60, 'neg', 15) },
          add: [tag('k', 'periode = 360° ÷ 2 = 180°', 290, 270, 'neg', 13)],
        },
        {
          say: 'Bentuk umumnya y sama dengan a sin bx tambah c. a amplitudo, 360 dibagi b periode, dan c menggeser naik atau turun.',
          clear: true,
          add: [T('f', 'y = a sin(bx) + c', 200, 70, { size: 32, c: 'pos' }), T('a', 'a = amplitudo', 200, 130, { size: 18 }), T('b', '360° ÷ b = periode', 200, 165, { size: 18 }), T('c', 'c = geser naik/turun', 200, 200, { size: 18 }), T('d', 'nilai maks = c + a,  nilai min = c − a', 200, 245, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Model: bianglala',
      steps: [
        {
          say: 'Bianglala berjari-jari 15 meter, pusatnya 20 meter di atas tanah, berputar sekali setiap 8 menit. Tinggi penumpang setelah t menit dapat dimodelkan dengan h sama dengan 20 tambah 15 sin 45t.',
          clear: true,
          add: [T('f', 'h = 20 + 15 sin(45t)', 200, 60, { size: 28, c: 'pos' })],
        },
        {
          say: 'Amplitudonya 15, yaitu jari-jari. c sama dengan 20, tinggi pusat. Jadi tinggi tertinggi 35 meter dan terendah 5 meter.',
          add: [T('a', 'maks = 20 + 15 = 35 m', 200, 120, { size: 20, c: 'ok' }), T('b', 'min = 20 − 15 = 5 m', 200, 155, { size: 20, c: 'neg' })],
        },
        {
          say: 'Satu putaran 8 menit, jadi periodenya 8. Dari rumus periode: 360 dibagi 45 sama dengan 8. Cocok.',
          add: [T('c', 'periode = 360 ÷ 45 = 8 menit', 200, 200, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa nilai maksimum y sama dengan 3 sin x tambah 4?',
          clear: true,
          add: [T('q', 'y = 3 sin x + 4', 200, 110, { size: 34 }), T('q2', 'nilai maksimum = ?', 200, 170, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '7', ok: true, why: 'sin x paling besar 1, jadi 3 × 1 + 4 = 7.' },
              { t: '4', why: '4 adalah garis tengahnya. Ditambah amplitudo 3.' },
              { t: '12', why: 'Amplitudo ditambah, bukan dikali: 4 + 3.' },
              { t: '1', why: '1 adalah nilai maksimum sin x saja.' },
            ],
          },
        },
        {
          say: 'Sinus paling besar 1. Jadi 3 kali 1 tambah 4 sama dengan 7.',
          add: [T('a', '3 × 1 + 4 = {g:7}', 200, 230, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Amplitudo fungsi y = 5 sin x adalah …',
      ans: ['5'],
      wrong: { '10': 'Amplitudo adalah setengah jarak puncak ke lembah: 5.', '1': 'Nilai sin x dikali 5.' },
      steps: ['y = a sin x dengan a = 5.'],
    },
    {
      type: 'num',
      q: 'Periode fungsi y = sin 3x adalah … °',
      ans: ['120'],
      wrong: { '1080': 'Dibagi 3, bukan dikali: 360 ÷ 3.', '360': 'Periode = 360° ÷ b = 360° ÷ 3.' },
      steps: ['Periode = 360° ÷ 3.', '= 120°.'],
    },
    {
      type: 'num',
      q: 'Nilai minimum fungsi y = 2 sin x + 6 adalah …',
      ans: ['4'],
      wrong: { '6': '6 adalah garis tengah. Dikurangi amplitudo 2.', '8': '8 adalah nilai maksimum.' },
      steps: ['sin x terkecil −1.', '2 × (−1) + 6 = 4.'],
    },
    {
      q: 'Grafik y = sin x untuk 0° ≤ x ≤ 360° memotong sumbu x di …',
      options: [
        { t: '0°, 180°, dan 360°', ok: true },
        { t: '90° dan 270°', why: 'Di 90° dan 270°, sin x bernilai 1 dan −1.' },
        { t: '0° dan 360° saja', why: 'sin 180° = 0 juga.' },
        { t: '45° dan 225°', why: 'sin 45° ≈ 0,71, bukan 0.' },
      ],
      steps: ['sin x = 0 saat x = 0°, 180°, 360°.'],
    },
    {
      type: 'num',
      q: 'Ketinggian air laut (meter) dimodelkan h = 3 + 2 sin(30t), t dalam jam. Ketinggian air tertinggi adalah … m',
      ans: ['5'],
      wrong: { '3': '3 adalah tinggi rata-rata. Ditambah amplitudo 2.', '6': 'Amplitudo ditambah: 3 + 2.' },
      steps: ['sin terbesar 1.', 'h = 3 + 2 = 5 m.'],
    },
  ],
};

// ---------- 5.2 Fungsi logaritma ----------
const CL = { x: 70, y: 25, w: 250, h: 250, xmin: -2, xmax: 8, ymin: -2, ymax: 8 };
const PL = plane('pl', { ...CL, every: 2 });
const PAIRS = [[0, 1], [1, 2], [2, 4], [3, 8]];

const l2 = {
  id: 'k11lb5-2',
  title: 'Fungsi Logaritma',
  hook: 'Grafik logaritma adalah cerminan grafik eksponen terhadap garis y = x. Tumbuhnya sangat lambat, sehingga cocok untuk skala besar seperti gempa dan bunyi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Titik 3 koma 8 ada di grafik y sama dengan 2 pangkat x. Titik mana yang pasti ada di grafik y sama dengan logaritma basis 2 dari x?',
          add: [...PL.els, curve('ex', PL, (x) => 2 ** x, CL), dot('p', ...PL.at(3, 8), 'pos'), tag('pt', '(3, 8)', ...PL.at(4.2, 7.6), 'pos', 13)],
          ask: {
            options: [
              { t: '(8, 3)', ok: true, why: '2³ = 8 berarti ²log 8 = 3. Koordinatnya bertukar.' },
              { t: '(3, 8)', why: '²log 3 bukan 8.' },
              { t: '(−3, −8)', why: 'Logaritma membalik peran x dan y, bukan tandanya.' },
              { t: '(8, 256)', why: 'Itu 2⁸. Logaritma adalah kebalikan eksponen.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Cerminan eksponen',
      steps: [
        {
          say: 'Gambar garis y sama dengan x. Tukar koordinat titik-titik grafik eksponen: 0 koma 1 menjadi 1 koma 0, 1 koma 2 menjadi 2 koma 1, dan seterusnya.',
          del: ['pt'],
          add: [lineOn('yx', PL, 1, 0, CL, { c: 'mut', sw: 2, dash: '6 5', z: -1 }), ...PAIRS.map(([a, b], i) => dot(`e${i}`, ...PL.at(a, b), 'pos', { r: 5 })), ...PAIRS.map(([a, b], i) => dot(`l${i}`, ...PL.at(b, a), 'acc', { r: 5, from: { x: PL.X(a), y: PL.Y(b) } }))],
        },
        {
          say: 'Hubungkan titik-titik kuning. Inilah grafik y sama dengan logaritma basis 2 dari x.',
          add: [curve('lg', PL, (x) => Math.log2(x), CL, { stroke: 'acc', from: 0.26 }), tag('le', 'y = ²log x', ...PL.at(6.4, 2.2), 'acc', 14), tag('ee', 'y = 2ˣ', ...PL.at(1.2, 6.5), 'pos', 14)],
        },
        {
          say: 'Sifatnya: hanya ada untuk x lebih dari 0, selalu melewati 1 koma 0, dan naik sangat lambat. Dari 1 ke 8, nilainya hanya naik dari 0 ke 3.',
          add: [tag('k', 'x > 0 · melalui (1, 0) · naik lambat', 200, 290, 'ink', 13)],
        },
      ],
    },
    {
      title: 'Model: skala desibel',
      steps: [
        {
          say: 'Kekuatan bunyi diukur dengan desibel. Setiap kali intensitas bunyi menjadi 10 kali lipat, angka desibelnya hanya bertambah 10. Ini sifat logaritma.',
          clear: true,
          add: [table('tb', 200, 130, [['bunyi', 'intensitas', 'desibel'], ['bisikan', '× 100', '20 dB'], ['percakapan', '× 1.000.000', '60 dB'], ['konser', '× 10¹¹', '110 dB']], { cw: [110, 120, 90], rh: 34, size: 15, head: true })],
        },
        {
          say: 'Rumusnya L sama dengan 10 log I per I nol. Percakapan 60 desibel dan bisikan 20 desibel berselisih 40 desibel, artinya intensitasnya berbeda 10 pangkat 4, yaitu 10 ribu kali.',
          add: [T('f', 'L = 10 log(I ÷ I₀)', 200, 230, { size: 22, c: 'pos' }), T('g', 'selisih 40 dB → 10⁴ = 10.000 kali', 200, 265, { size: 16 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Grafik y sama dengan logaritma basis 3 dari x pasti melewati titik …',
          clear: true,
          add: [T('q', 'y = ³log x', 200, 110, { size: 36 })],
          ask: {
            options: [
              { t: '(1, 0)', ok: true, why: '³log 1 = 0, karena 3⁰ = 1.' },
              { t: '(0, 1)', why: 'Logaritma tidak terdefinisi di x = 0.' },
              { t: '(3, 0)', why: '³log 3 = 1, jadi titiknya (3, 1).' },
              { t: '(0, 0)', why: 'Logaritma hanya untuk x > 0.' },
            ],
          },
        },
        {
          say: 'Logaritma 1 dengan basis apa pun sama dengan 0. Jadi titik 1 koma 0 selalu ada di grafik logaritma.',
          add: [T('a', '³log 1 = 0  →  {g:(1, 0)}', 200, 190, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Titik (8, b) terletak pada grafik y = ²log x. Nilai b adalah …',
      ans: ['3'],
      wrong: { '256': 'Itu 2⁸. Logaritma: 2 pangkat berapa = 8?', '4': '2³ = 8, jadi b = 3.' },
      steps: ['b = ²log 8.', '= 3.'],
    },
    {
      q: 'Daerah asal fungsi y = log x adalah …',
      options: [
        { t: 'x > 0', ok: true },
        { t: 'semua bilangan real', why: 'log 0 dan log bilangan negatif tidak terdefinisi.' },
        { t: 'x ≥ 0', why: 'log 0 tidak terdefinisi.' },
        { t: 'x > 1', why: 'log x terdefinisi juga untuk 0 < x < 1, nilainya negatif.' },
      ],
      steps: ['Numerus logaritma harus positif.', 'x > 0.'],
    },
    {
      q: 'Grafik y = ²log x adalah pencerminan grafik y = 2ˣ terhadap …',
      options: [
        { t: 'garis y = x', ok: true },
        { t: 'sumbu x', why: 'Pencerminan sumbu x memberi y = −2ˣ.' },
        { t: 'sumbu y', why: 'Pencerminan sumbu y memberi y = 2⁻ˣ.' },
        { t: 'titik asal', why: 'Fungsi invers dicerminkan terhadap y = x.' },
      ],
      steps: ['Logaritma adalah invers eksponen.', 'Grafik invers = cerminan terhadap y = x.'],
    },
    {
      type: 'num',
      q: 'Suara A 70 dB dan suara B 50 dB. Intensitas suara A adalah … kali intensitas suara B',
      ans: ['100'],
      wrong: { '20': 'Selisih 20 dB berarti 10² kali, bukan 20 kali.', '2': 'Setiap 10 dB = 10 kali. 20 dB = 10 × 10.' },
      steps: ['Selisih 20 dB = 2 × 10 dB.', '10² = 100 kali.'],
    },
    {
      type: 'num',
      q: 'pH larutan dihitung dengan pH = −log[H⁺]. Jika [H⁺] = 10⁻³, nilai pH adalah …',
      ans: ['3'],
      wrong: { '-3': 'log 10⁻³ = −3, lalu diberi tanda minus: −(−3) = 3.' },
      steps: ['log 10⁻³ = −3.', 'pH = −(−3) = 3.'],
    },
  ],
};

// ---------- 5.3 Fungsi aljabar dan pemodelan ----------
const CR = { x: 60, y: 25, w: 280, h: 230, xmin: 0, xmax: 12, ymin: 0, ymax: 12 };
const PR = plane('pl', { ...CR, every: 2, ystep: 1, yevery: 2, xl: 'v', yl: 't' });
const CS = { x: 60, y: 25, w: 280, h: 230, xmin: 0, xmax: 25, ymin: 0, ymax: 6 };
const PS = plane('ps', { ...CS, step: 5, every: 5, xl: 'L', yl: 's' });

const l3 = {
  id: 'k11lb5-3',
  title: 'Fungsi Aljabar dan Memilih Model',
  hook: 'Fungsi rasional dan fungsi akar muncul dari situasi nyata. Memilih model yang tepat dimulai dari melihat pola datanya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Jarak 12 kilometer ditempuh dengan kecepatan v kilometer per jam. Kalau kecepatannya dijadikan dua kali, waktu tempuhnya …',
          add: [T('q', 'jarak tetap 12 km', 200, 90, { size: 24 }), T('q2', 'v × 2  →  waktu ?', 200, 150, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: 'menjadi setengahnya', ok: true, why: 't = 12 ÷ v. Kalau v dua kali, t setengahnya.' },
              { t: 'menjadi dua kali', why: 'Lebih cepat berarti lebih singkat.' },
              { t: 'berkurang 2 jam', why: 'Perubahannya berupa perbandingan, bukan pengurangan tetap.' },
              { t: 'tetap', why: 'Waktu bergantung pada kecepatan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Fungsi rasional',
      steps: [
        {
          say: 'Waktu tempuh t sama dengan 12 dibagi v. Fungsi berbentuk pecahan dengan variabel di penyebut disebut fungsi rasional.',
          clear: true,
          add: [...PR.els, ...[[1, 12], [2, 6], [3, 4], [4, 3], [6, 2], [12, 1]].map(([a, b], i) => dot(`d${i}`, ...PR.at(a, b), 'neg', { r: 5 })), tag('e', 't = 12 ÷ v', 260, 50, 'neg', 15)],
        },
        {
          say: 'Hubungkan titik-titiknya. Kurvanya turun, makin lama makin landai, mendekati sumbu tetapi tidak pernah menyentuhnya.',
          add: [curve('c', PR, (x) => 12 / x, CR, { stroke: 'neg', from: 0.95 })],
        },
        {
          say: 'Garis yang didekati tetapi tidak pernah disentuh disebut asimtot. Di sini asimtotnya sumbu v dan sumbu t. Kecepatan tidak mungkin 0, dan waktu tidak pernah benar-benar 0.',
          add: [tag('k', 'asimtot: v = 0 dan t = 0', 260, 80, 'ink', 13)],
        },
      ],
    },
    {
      title: 'Fungsi akar',
      steps: [
        {
          say: 'Sisi persegi dengan luas L adalah akar L. Grafik s sama dengan akar L naik cepat di awal, lalu melambat.',
          clear: true,
          add: [...PS.els, curve('c', PS, (x) => Math.sqrt(x), CS, { stroke: 'ok' }), ...[[1, 1], [4, 2], [9, 3], [16, 4], [25, 5]].map(([a, b], i) => dot(`d${i}`, ...PS.at(a, b), 'ok', { r: 5 })), tag('e', 's = √L', 120, 50, 'ok', 15)],
        },
        {
          say: 'Luas 4 kali lipat, dari 4 ke 16, sisinya hanya 2 kali lipat, dari 2 ke 4. Fungsi akar hanya ada untuk L lebih dari atau sama dengan 0.',
          add: [tag('k', 'L × 4 → s × 2', 270, 200, 'ink', 14)],
        },
      ],
    },
    {
      title: 'Memilih model',
      steps: [
        {
          say: 'Saat memodelkan data, lihat dulu polanya.',
          clear: true,
          add: [T('h', 'pola data  →  model', 200, 35, { size: 20 })],
        },
        {
          say: 'Bertambah dengan jumlah tetap: linear. Berlipat dengan faktor tetap: eksponen. Naik lalu turun, atau sebaliknya: kuadrat.',
          add: [T('a', 'bertambah tetap → linear (y = mx + c)', 200, 80, { size: 16, c: 'pos' }), T('b', 'berlipat tetap → eksponen (y = a·bˣ)', 200, 112, { size: 16, c: 'acc' }), T('c', 'naik lalu turun → kuadrat (y = ax² + bx + c)', 200, 144, { size: 16, c: 'neg' })],
        },
        {
          say: 'Berulang naik-turun: trigonometri. Berbalik nilai: rasional. Tumbuh cepat lalu melambat: logaritma atau akar.',
          add: [T('d', 'berulang → trigonometri (y = a sin bx + c)', 200, 176, { size: 16, c: 'ok' }), T('e', 'berbalik nilai → rasional (y = k ÷ x)', 200, 208, { size: 16 }), T('f', 'cepat lalu melambat → logaritma atau akar', 200, 240, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Jumlah pengguna sebuah aplikasi menjadi 3 kali lipat setiap bulan. Model apa yang paling cocok?',
          clear: true,
          add: [T('q', 'pengguna × 3 setiap bulan', 200, 100, { size: 26 })],
          ask: {
            options: [
              { t: 'eksponen', ok: true, why: 'Berlipat dengan faktor tetap (× 3) setiap bulan.' },
              { t: 'linear', why: 'Linear bertambah dengan jumlah tetap, bukan berlipat.' },
              { t: 'trigonometri', why: 'Tidak ada pola berulang naik-turun.' },
              { t: 'rasional', why: 'Rasional menggambarkan hubungan berbalik nilai.' },
            ],
          },
        },
        {
          say: 'Dikali 3 setiap bulan berarti berlipat dengan faktor tetap. Modelnya eksponen: P sama dengan P nol kali 3 pangkat t.',
          add: [T('a', 'P = P₀ × 3ᵗ  →  {g:eksponen}', 200, 180, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jika f(x) = 24 ÷ x, nilai f(6) adalah …',
      ans: ['4'],
      wrong: { '144': 'Dibagi, bukan dikali: 24 ÷ 6.', '18': '24 ÷ 6 = 4.' },
      steps: ['24 ÷ 6.', '= 4.'],
    },
    {
      q: 'Asimtot tegak grafik y = 1 ÷ (x − 2) adalah …',
      options: [
        { t: 'x = 2', ok: true },
        { t: 'x = −2', why: 'Penyebut nol saat x − 2 = 0, yaitu x = 2.' },
        { t: 'y = 2', why: 'Asimtot tegak berbentuk x = …' },
        { t: 'x = 0', why: 'Penyebutnya x − 2, bukan x.' },
      ],
      steps: ['Penyebut nol → x − 2 = 0.', 'Asimtot tegak x = 2.'],
    },
    {
      type: 'num',
      q: 'Sisi persegi yang luasnya 49 cm² adalah … cm',
      ans: ['7'],
      wrong: { '24,5': 'Sisi = √luas, bukan luas ÷ 2.', '12,25': 'Sisi = √49.' },
      steps: ['s = √49.', '= 7 cm.'],
    },
    {
      q: 'Banyak bakteri menjadi 2 kali lipat setiap jam. Model yang paling tepat adalah …',
      options: [
        { t: 'fungsi eksponen', ok: true },
        { t: 'fungsi linear', why: 'Linear bertambah dengan jumlah tetap.' },
        { t: 'fungsi kuadrat', why: 'Kuadrat naik lalu turun atau sebaliknya.' },
        { t: 'fungsi trigonometri', why: 'Tidak ada pola berulang.' },
      ],
      steps: ['Berlipat dengan faktor tetap → eksponen.'],
    },
    {
      type: 'num',
      q: 'Waktu (jam) untuk menempuh 120 km dengan kecepatan v km/jam adalah t = 120 ÷ v. Jika v = 40, nilai t adalah …',
      ans: ['3'],
      wrong: { '4800': 'Dibagi, bukan dikali.', '80': '120 ÷ 40 = 3.' },
      steps: ['t = 120 ÷ 40.', '= 3 jam.'],
    },
  ],
};

export default {
  id: 'k11lb5',
  no: 5,
  title: 'Fungsi dan Pemodelannya',
  desc: 'Grafik sinus dari putaran lingkaran, amplitudo dan periode, fungsi logaritma, fungsi rasional dan akar, serta memilih model dari pola data.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Fungsi y = 4 sin(2x) − 1 memiliki nilai maksimum …',
      ans: ['3'],
      wrong: { '4': '4 × 1 − 1 = 3.', '5': 'Dikurangi 1, bukan ditambah.' },
      steps: ['sin terbesar 1.', '4 − 1 = 3.'],
    },
    {
      q: 'Gempa berkekuatan 7 skala Richter dibanding 5 skala Richter (skala logaritma basis 10) melepaskan gelombang dengan amplitudo …',
      options: [
        { t: '100 kali lebih besar', ok: true },
        { t: '2 kali lebih besar', why: 'Skala logaritma: selisih 2 berarti 10² kali.' },
        { t: '20 kali lebih besar', why: 'Selisih 2 → 10 × 10 = 100.' },
        { t: '1,4 kali lebih besar', why: 'Itu 7 ÷ 5. Skalanya logaritma.' },
      ],
      steps: ['Selisih 2 skala Richter.', '10² = 100 kali.'],
    },
    {
      q: 'Suhu harian di suatu kota naik di siang hari dan turun di malam hari, berulang setiap 24 jam. Model yang paling cocok adalah …',
      options: [
        { t: 'fungsi trigonometri', ok: true },
        { t: 'fungsi eksponen', why: 'Eksponen terus naik atau terus turun, tidak berulang.' },
        { t: 'fungsi linear', why: 'Linear tidak berulang.' },
        { t: 'fungsi rasional', why: 'Rasional menggambarkan hubungan berbalik nilai.' },
      ],
      steps: ['Pola berulang dengan periode 24 jam → trigonometri.'],
    },
  ],
};
