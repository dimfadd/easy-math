// Kelas 9 · Bab 5: Lingkaran
import { T, box, ln, dot, range } from '../helpers.js';

const r1 = (v) => Math.round(v * 10) / 10;
const rad = (d) => (d * Math.PI) / 180;
// Juring berpuncak di (0,0), menghadap ke bawah, selebar span derajat
function wedge(id, r, span, x, y, o = {}) {
  const a1 = rad(90 - span / 2);
  const a2 = rad(90 + span / 2);
  const d = `M0,0 L${r1(r * Math.cos(a1))},${r1(r * Math.sin(a1))} A${r},${r} 0 0 1 ${r1(r * Math.cos(a2))},${r1(r * Math.sin(a2))} Z`;
  return { id, t: 'path', x, y, d, fill: 'pos-soft', stroke: 'ink', sw: 1.5, ...o };
}
// Busur/juring dari sudut a ke b (derajat, 0 = kanan, berlawanan jarum jam seperti matematika)
function sector(id, cx, cy, r, a, b, o = {}) {
  const p = (t) => [r1(cx + r * Math.cos(rad(t))), r1(cy - r * Math.sin(rad(t)))];
  const [x1, y1] = p(a);
  const [x2, y2] = p(b);
  const large = b - a > 180 ? 1 : 0;
  return { id, t: 'path', x: 0, y: 0, d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 0 ${x2},${y2} Z`, fill: 'acc-soft', stroke: 'ink', sw: 2, ...o };
}
const circ = (id, x, y, r, o = {}) => ({ id, t: 'circle', x, y, r, fill: 'paper', stroke: 'ink', sw: 2.5, ...o });

// ---------- 5.1 Unsur dan keliling ----------
const RR = 30;
const GY = 220;
const X0 = 50;
const CIRC = 2 * Math.PI * RR;

const l1 = {
  id: 'k9b5-1',
  title: 'Unsur dan Keliling Lingkaran',
  hook: 'Gelindingkan roda satu putaran: jejaknya selalu sekitar 3,14 kali diameternya. Angka itu disebut π.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah roda berdiameter 60 sentimeter digelindingkan tepat satu putaran. Kira-kira sejauh apa roda itu berpindah?',
          add: [circ('w', 200, 130, 60), ln('d', 140, 130, 260, 130, { sw: 2, c: 'acc', arrow: 'both' }), T('ld', '60 cm', 200, 115, { size: 15, c: 'acc' })],
          ask: {
            options: [
              { t: 'sekitar 188 cm', ok: true, why: 'Sekitar 3,14 × 60. Kita lihat roda menggelinding.' },
              { t: '60 cm', why: 'Satu putaran menempuh keliling roda, bukan diameternya.' },
              { t: '120 cm', why: 'Lebih jauh dari dua diameter. Kita lihat.' },
              { t: '360 cm', why: '360 adalah derajat satu putaran, bukan jaraknya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Nama-nama bagian',
      steps: [
        {
          say: 'Titik tengah lingkaran disebut pusat. Garis dari pusat ke tepi disebut jari-jari, ditulis r.',
          clear: true,
          add: [circ('c', 150, 150, 90), dot('o', 150, 150, 'ink', { r: 5 }), T('lo', 'pusat', 150, 168, { size: 14 }), ln('r', 150, 150, 240, 150, { sw: 3, c: 'pos' }), T('lr', 'jari-jari (r)', 300, 150, { size: 15, c: 'pos' })],
        },
        {
          say: 'Garis yang melewati pusat dari tepi ke tepi disebut diameter, ditulis d. Diameter sama dengan 2 kali jari-jari.',
          add: [ln('dm', 150 - 90 * 0.6, 150 - 90 * 0.8, 150 + 90 * 0.6, 150 + 90 * 0.8, { sw: 3, c: 'acc' }), T('ld', 'diameter (d = 2r)', 300, 225, { size: 15, c: 'acc' })],
        },
        {
          say: 'Garis lurus yang menghubungkan dua titik di tepi, tapi tidak lewat pusat, disebut tali busur. Lengkungan di tepinya disebut busur.',
          add: [ln('tb', 150 - 90 * 0.94, 150 - 90 * 0.34, 150 - 90 * 0.17, 150 - 90 * 0.98, { sw: 3, c: 'neg' }), T('ltb', 'tali busur', 70, 55, { size: 15, c: 'neg' }), { id: 'bs', t: 'path', x: 0, y: 0, d: `M${r1(150 - 90 * 0.94)},${r1(150 - 90 * 0.34)} A90,90 0 0 1 ${r1(150 - 90 * 0.17)},${r1(150 - 90 * 0.98)}`, stroke: 'ok', sw: 5 }, T('lbs', 'busur', 50, 100, { size: 15, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Menggelindingkan roda',
      steps: [
        {
          say: 'Roda berdiameter 60 berdiri di garis. Titik merah menandai tempat roda menyentuh tanah.',
          clear: true,
          add: [ln('g', 20, GY, 380, GY, { sw: 2.5, draw: false }), circ('w', X0, GY - RR, RR, { z: 1 }), ln('sp', X0, GY - RR, X0, GY, { sw: 2.5, c: 'neg', z: 2 }), dot('m0', X0, GY, 'neg', { r: 5 })],
        },
        {
          say: 'Gelindingkan satu putaran penuh.',
          set: { w: { x: X0 + CIRC }, sp: { x: X0 + CIRC, x2: X0 + CIRC, rot: 360 } },
          add: [ln('trail', X0, GY, X0 + CIRC, GY, { sw: 5, c: 'neg', z: -1 }), dot('m1', X0 + CIRC, GY, 'neg', { r: 5 })],
        },
        {
          say: 'Bandingkan jejaknya dengan diameter. Satu diameter, dua, tiga, dan masih ada sisa sedikit.',
          add: [...range(0, 3).map((k) => box(`dd${k}`, X0 + 30 + k * 60, GY + 18, 58, 14, { fill: 'acc-soft', r: 3, sw: 1.5, label: 'd', lsize: 11 })), box('rest', X0 + 180 + (CIRC - 180) / 2, GY + 18, CIRC - 180 - 1, 14, { fill: 'neg-soft', r: 2, sw: 1 })],
        },
        {
          say: 'Keliling selalu sekitar 3 koma 14 kali diameter, untuk lingkaran sebesar apa pun. Angka ini disebut pi.',
          add: [T('pi', 'keliling ÷ diameter = π ≈ 3,14', 200, 70, { size: 22, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Rumus keliling',
      steps: [
        {
          say: 'Jadi keliling lingkaran sama dengan pi kali diameter, atau 2 kali pi kali jari-jari.',
          clear: true,
          add: [box('rb', 200, 70, 300, 50, { fill: 'acc-soft', r: 10, label: 'K = π × d = 2 × π × r', lsize: 20 })],
        },
        {
          say: 'Pi bisa ditulis 3 koma 14, atau 22 per 7. Pakai 22 per 7 kalau angkanya kelipatan 7.',
          add: [T('a', 'π ≈ 3,14  atau  π ≈ 22/7', 200, 135, { size: 20 })],
        },
        {
          say: 'Contoh: roda diameter 60. Keliling: 3 koma 14 kali 60, sama dengan 188 koma 4 sentimeter. Jari-jari 7: 2 kali 22 per 7 kali 7, sama dengan 44.',
          add: [T('b', 'd = 60: K = 3,14 × 60 = 188,4 cm', 200, 190, { size: 18 }), T('c', 'r = 7: K = 2 × 22/7 × 7 = 44 cm', 200, 225, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Lingkaran berjari-jari 14 sentimeter. Berapa kelilingnya? Pakai pi sama dengan 22 per 7.',
          clear: true,
          add: [circ('c', 200, 130, 70), ln('r', 200, 130, 270, 130, { sw: 3, c: 'pos' }), T('lr', '14 cm', 235, 115, { size: 15, c: 'pos' })],
          ask: {
            options: [
              { t: '88 cm', ok: true, why: '2 × 22/7 × 14 = 88.' },
              { t: '44 cm', why: '44 = 22/7 × 14. Keliling = 2πr, jangan lupa dikali 2.' },
              { t: '616 cm', why: '616 adalah luasnya (πr²).' },
              { t: '28 cm', why: '28 adalah diameternya.' },
            ],
          },
        },
        {
          say: 'Keliling: 2 kali 22 per 7 kali 14. 14 dibagi 7 sama dengan 2, jadi 2 kali 22 kali 2 sama dengan 88 sentimeter.',
          clear: true,
          add: [T('a', 'K = 2 × 22/7 × 14', 200, 90, { size: 28 }), T('b', '= 2 × 22 × 2 = {a:88 cm}', 200, 150, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Keliling lingkaran berdiameter 20 cm adalah … cm (π = 3,14)',
      ans: ['62.8'],
      wrong: { '125.6': 'Itu 2 × π × 20. Diameter sudah 2r, jadi cukup π × d.', '314': '314 adalah luas.' },
      steps: ['K = π × d = 3,14 × 20 = 62,8 cm.'],
    },
    {
      type: 'num',
      q: 'Keliling lingkaran berjari-jari 21 cm adalah … cm (π = 22/7)',
      ans: ['132'],
      wrong: { '66': 'K = 2πr. Jangan lupa dikali 2.', '1386': '1.386 adalah luas.' },
      steps: ['K = 2 × 22/7 × 21 = 2 × 22 × 3 = 132 cm.'],
    },
    {
      q: 'Garis yang menghubungkan pusat dengan titik pada lingkaran disebut …',
      options: [
        { t: 'jari-jari', ok: true },
        { t: 'diameter', why: 'Diameter dari tepi ke tepi melewati pusat.' },
        { t: 'tali busur', why: 'Tali busur menghubungkan dua titik di tepi.' },
        { t: 'busur', why: 'Busur adalah lengkungan, bukan garis lurus.' },
      ],
      steps: ['Pusat ke tepi = jari-jari.'],
    },
    {
      type: 'num',
      q: 'Keliling sebuah lingkaran 44 cm. Jari-jarinya adalah … cm (π = 22/7)',
      ans: ['7'],
      wrong: { '14': '14 adalah diameternya.', '22': '44 ÷ 2 = 22 belum dibagi π.' },
      steps: ['2 × 22/7 × r = 44.', '44/7 × r = 44 → r = 7 cm.'],
    },
    {
      type: 'num',
      q: 'Roda sepeda berdiameter 70 cm berputar 100 kali. Jarak yang ditempuh adalah … m (π = 22/7)',
      ans: ['220'],
      wrong: { '22000': 'Itu dalam cm. 22.000 cm = 220 m.', '2.2': 'Keliling 220 cm × 100 = 22.000 cm = 220 m.' },
      steps: ['Keliling roda: 22/7 × 70 = 220 cm.', '100 putaran: 22.000 cm = 220 m.'],
    },
  ],
};

// ---------- 5.2 Luas lingkaran ----------
const N = 12;
const SPAN = 360 / N;
const RW = 70;
const CX = 200;
const CY = 140;
const CW = 2 * RW * Math.sin(rad(SPAN / 2)); // lebar tali busur satu juring
const ROWX = CX - (N / 2) * CW / 2 - CW / 2 + 10;
const rowPos = (i) =>
  i % 2 === 0
    ? { x: ROWX + (i / 2) * CW, y: 105, rot: 0 }
    : { x: ROWX + ((i - 1) / 2) * CW + CW / 2, y: 105 + RW * Math.cos(rad(SPAN / 2)), rot: 180 };

const l2 = {
  id: 'k9b5-2',
  title: 'Luas Lingkaran',
  hook: 'Potong lingkaran menjadi juring-juring kecil, lalu susun berselang-seling. Hasilnya hampir persegi panjang.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Lingkaran berjari-jari r dipotong-potong lalu disusun ulang menjadi bentuk mirip persegi panjang. Berapa tinggi persegi panjang itu?',
          add: range(0, N).map((i) => wedge(`w${i}`, RW, SPAN, CX, CY, { rot: i * SPAN, fill: i % 2 ? 'acc-soft' : 'pos-soft' })),
          ask: {
            options: [
              { t: 'r', ok: true, why: 'Setiap juring setinggi jari-jari. Kita susun ulang.' },
              { t: 'd', why: 'Juring hanya setinggi jari-jari, setengah diameter.' },
              { t: 'π', why: 'π adalah bilangan, bukan panjang.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menyusun ulang',
      steps: [
        {
          say: 'Lingkaran ini dipotong menjadi 12 juring yang sama.',
          set: Object.fromEntries(range(0, N).map((i) => [`w${i}`, { x: CX + 6 * Math.cos(rad(i * SPAN + 90)), y: CY + 6 * Math.sin(rad(i * SPAN + 90)) }])),
        },
        {
          say: 'Susun berselang-seling: satu menghadap ke bawah, satu ke atas.',
          set: Object.fromEntries(range(0, N).map((i) => [`w${i}`, rowPos(i)])),
        },
        {
          say: 'Bentuknya hampir persegi panjang. Tingginya jari-jari r. Panjangnya setengah keliling, karena setengah busur di atas dan setengah di bawah: setengah kali 2 pi r, yaitu pi r.',
          add: [ln('h', ROWX - 22, 105, ROWX - 22, 105 + RW * Math.cos(rad(SPAN / 2)), { sw: 2.5, c: 'pos', arrow: 'both' }), T('lh', 'r', ROWX - 34, 140, { size: 18, c: 'pos' }), ln('w', ROWX - CW / 2, 205, ROWX + (N / 2 - 0.5) * CW + CW / 2 - CW / 2, 205, { sw: 2.5, c: 'acc', arrow: 'both' }), T('lw', '½ × keliling = πr', 200, 225, { size: 17, c: 'acc' })],
        },
        {
          say: 'Luas persegi panjang: panjang kali tinggi, pi r kali r. Jadi luas lingkaran sama dengan pi r kuadrat.',
          add: [box('rb', 200, 268, 220, 40, { fill: 'acc-soft', r: 10, label: 'L = π × r × r = πr²', lsize: 19 })],
        },
      ],
    },
    {
      title: 'Menghitung luas',
      steps: [
        {
          say: 'Contoh: jari-jari 7 sentimeter. Luas: 22 per 7 kali 7 kali 7. 22 kali 7 sama dengan 154 sentimeter persegi.',
          clear: true,
          add: [circ('c', 110, 140, 70, { fill: 'pos-soft' }), ln('r', 110, 140, 180, 140, { sw: 3, c: 'acc' }), T('lr', '7 cm', 145, 125, { size: 15, c: 'acc' }), T('a', 'L = 22/7 × 7 × 7', 295, 110, { size: 20 }), T('b', '= 22 × 7 = {a:154 cm²}', 295, 150, { size: 20 })],
        },
        {
          say: 'Hati-hati kalau yang diketahui diameter. Bagi 2 dulu untuk mendapat jari-jari.',
          add: [T('n', 'd = 20 → r = 10 → L = 3,14 × 100 = 314', 200, 245, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Meja bundar berdiameter 140 sentimeter. Berapa luas permukaannya? Pakai pi sama dengan 22 per 7.',
          clear: true,
          add: [circ('c', 200, 125, 80, { fill: 'acc-soft' }), ln('d', 120, 125, 280, 125, { sw: 2, c: 'ink', arrow: 'both' }), T('ld', '140 cm', 200, 110, { size: 15 })],
          ask: {
            options: [
              { t: '15.400 cm²', ok: true, why: 'r = 70. 22/7 × 70 × 70 = 15.400.' },
              { t: '61.600 cm²', why: 'Itu memakai diameter sebagai jari-jari. r = 140 ÷ 2 = 70.' },
              { t: '440 cm²', why: '440 adalah keliling (dalam cm), bukan luas.' },
              { t: '220 cm²', why: 'Luas = π × r × r.' },
            ],
          },
        },
        {
          say: 'Jari-jari 70. Luas: 22 per 7 kali 70 kali 70, yaitu 22 kali 10 kali 70, sama dengan 15.400 sentimeter persegi.',
          clear: true,
          add: [T('a', 'r = 140 ÷ 2 = 70', 200, 70, { size: 24 }), T('b', 'L = 22/7 × 70 × 70', 200, 120, { size: 26 }), T('c', '= 22 × 10 × 70 = {a:15.400 cm²}', 200, 170, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Luas lingkaran berjari-jari 10 cm adalah … cm² (π = 3,14)',
      ans: ['314'],
      wrong: { '62.8': '62,8 adalah keliling.', '31.4': 'r² = 100, bukan 10.' },
      steps: ['L = 3,14 × 10 × 10 = 314 cm².'],
    },
    {
      type: 'num',
      q: 'Luas lingkaran berdiameter 28 cm adalah … cm² (π = 22/7)',
      ans: ['616'],
      wrong: { '2464': 'Jari-jarinya 14, bukan 28.', '88': '88 adalah keliling.' },
      steps: ['r = 14.', 'L = 22/7 × 14 × 14 = 616 cm².'],
    },
    {
      type: 'num',
      q: 'Luas sebuah lingkaran 154 cm². Jari-jarinya adalah … cm (π = 22/7)',
      ans: ['7'],
      wrong: { '49': '49 adalah r². r = √49.', '14': '14 adalah diameter.' },
      steps: ['22/7 × r² = 154 → r² = 49.', 'r = 7 cm.'],
    },
    {
      q: 'Jika jari-jari lingkaran dijadikan 2 kali semula, luasnya menjadi …',
      options: [
        { t: '4 kali semula', ok: true },
        { t: '2 kali semula', why: 'Luas = πr². (2r)² = 4r².' },
        { t: '8 kali semula', why: '(2r)² = 4r², bukan 8r².' },
        { t: 'tetap', why: 'Lingkarannya membesar.' },
      ],
      steps: ['L baru = π(2r)² = 4πr².'],
    },
    {
      type: 'num',
      q: 'Taman berbentuk setengah lingkaran dengan diameter 14 m. Luas taman adalah … m² (π = 22/7)',
      ans: ['77'],
      wrong: { '154': '154 adalah luas lingkaran penuh. Ini setengahnya.', '308': 'Jari-jari 7, bukan 14.' },
      steps: ['r = 7. Lingkaran penuh: 22/7 × 49 = 154.', 'Setengah: 77 m².'],
    },
  ],
};

// ---------- 5.3 Sudut pusat, busur, dan juring ----------
const SC = [130, 150];
const SR = 90;

const l3 = {
  id: 'k9b5-3',
  title: 'Sudut Pusat, Panjang Busur, dan Luas Juring',
  hook: 'Juring 90° adalah seperempat lingkaran. Busur dan luasnya juga seperempat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Pizza bundar seluas 600 sentimeter persegi dipotong dengan sudut 90 derajat di tengah. Berapa luas potongan itu?',
          add: [circ('c', ...SC, SR, { fill: 'acc-soft' }), sector('s', ...SC, SR, 0, 90, { fill: 'neg-soft' }), T('a', '90°', SC[0] + 22, SC[1] - 18, { size: 15 }), T('q', 'luas pizza 600 cm²', 300, 150, { size: 16 })],
          ask: {
            options: [
              { t: '150 cm²', ok: true, why: '90° adalah ¼ dari 360°. ¼ × 600 = 150.' },
              { t: '90 cm²', why: '90 adalah sudutnya. Bandingkan dengan 360°.' },
              { t: '300 cm²', why: '300 adalah setengahnya. 90° hanya seperempat.' },
              { t: '200 cm²', why: '90° dari 360° = ¼, bukan ⅓.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bagian dari 360 derajat',
      steps: [
        {
          say: 'Sudut yang titik sudutnya di pusat lingkaran disebut sudut pusat. Satu lingkaran penuh 360 derajat.',
          clear: true,
          add: [circ('c', ...SC, SR), dot('o', ...SC, 'ink', { r: 5 }), sector('s', ...SC, SR, 0, 90), T('a', '90°', SC[0] + 22, SC[1] - 18, { size: 15 })],
        },
        {
          say: 'Daerah yang dibatasi dua jari-jari dan busur disebut juring. Juring 90 derajat adalah 90 per 360, yaitu seperempat lingkaran.',
          add: [T('f', '90/360 = ¼ lingkaran', 310, 100, { size: 17 })],
          pulse: ['s'],
        },
        {
          say: 'Juring 120 derajat: 120 per 360, yaitu sepertiga lingkaran.',
          set: { s: sector('s', ...SC, SR, 0, 120), a: { text: '120°', x: SC[0] + 14, y: SC[1] - 26 }, f: { text: '120/360 = ⅓ lingkaran' } },
        },
      ],
    },
    {
      title: 'Rumus busur dan juring',
      steps: [
        {
          say: 'Panjang busur adalah bagian dari keliling. Luas juring adalah bagian dari luas lingkaran. Bagiannya sama: sudut pusat dibagi 360.',
          clear: true,
          add: [box('k1', 200, 70, 340, 50, { fill: 'pos-soft', r: 10, label: 'panjang busur = (α ÷ 360) × 2πr', lsize: 17 }), box('k2', 200, 135, 340, 50, { fill: 'acc-soft', r: 10, label: 'luas juring = (α ÷ 360) × πr²', lsize: 17 })],
        },
        {
          say: 'Contoh: jari-jari 14, sudut 90 derajat. Panjang busur: seperempat kali 88, sama dengan 22. Luas juring: seperempat kali 616, sama dengan 154.',
          add: [T('a', 'r = 14, α = 90° → ¼ bagian', 200, 195, { size: 17 }), T('b', 'busur = ¼ × 88 = {a:22 cm},  juring = ¼ × 616 = {a:154 cm²}', 200, 235, { size: 15 })],
        },
      ],
    },
    {
      title: 'Sudut keliling',
      steps: [
        {
          say: 'Sudut yang titik sudutnya di tepi lingkaran disebut sudut keliling. Kalau menghadap busur yang sama, sudut keliling besarnya setengah sudut pusat.',
          clear: true,
          add: [
            circ('c', 200, 150, 100),
            ln('p1', 200, 150, 200 + 100 * Math.cos(rad(-30)), 150 - 100 * Math.sin(rad(-30)), { sw: 2.5, c: 'pos' }),
            ln('p2', 200, 150, 200 + 100 * Math.cos(rad(210)), 150 - 100 * Math.sin(rad(210)), { sw: 2.5, c: 'pos' }),
            ln('k1', 200, 50, 200 + 100 * Math.cos(rad(-30)), 150 - 100 * Math.sin(rad(-30)), { sw: 2.5, c: 'acc' }),
            ln('k2', 200, 50, 200 + 100 * Math.cos(rad(210)), 150 - 100 * Math.sin(rad(210)), { sw: 2.5, c: 'acc' }),
            T('lp', '120°', 200, 178, { size: 15, c: 'pos' }),
            T('lk', '60°', 200, 82, { size: 15, c: 'acc' }),
          ],
        },
        {
          say: 'Sudut pusat 120 derajat, sudut kelilingnya 60 derajat.',
          add: [T('r', 'sudut keliling = ½ × sudut pusat', 200, 278, { size: 17 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Lingkaran berjari-jari 7 sentimeter. Sudut pusat 72 derajat. Berapa luas juringnya? Pakai pi sama dengan 22 per 7.',
          clear: true,
          add: [circ('c', ...SC, SR), sector('s', ...SC, SR, 0, 72), T('a', '72°', SC[0] + 26, SC[1] - 16, { size: 14 }), T('q', 'r = 7 cm', 300, 120, { size: 18 }), T('q2', 'luas juring = ?', 300, 160, { size: 18, c: 'mut' })],
          ask: {
            options: [
              { t: '30,8 cm²', ok: true, why: '72/360 = ⅕. ⅕ × 154 = 30,8.' },
              { t: '8,8 cm²', why: '8,8 adalah panjang busur (⅕ × 44).' },
              { t: '154 cm²', why: '154 adalah luas lingkaran penuh.' },
              { t: '72 cm²', why: '72 adalah sudutnya.' },
            ],
          },
        },
        {
          say: '72 per 360 sama dengan seperlima. Luas lingkaran 154. Seperlima kali 154 sama dengan 30 koma 8.',
          clear: true,
          add: [T('a', '72/360 = ⅕', 200, 80, { size: 26 }), T('b', 'luas juring = ⅕ × 154 = {a:30,8 cm²}', 200, 140, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Panjang busur dengan sudut pusat 90° pada lingkaran berjari-jari 14 cm adalah … cm (π = 22/7)',
      ans: ['22'],
      wrong: { '88': '88 adalah keliling penuh. Ambil ¼-nya.', '154': '154 adalah luas juring.' },
      steps: ['Keliling = 88.', 'Busur = ¼ × 88 = 22 cm.'],
    },
    {
      type: 'num',
      q: 'Luas juring dengan sudut pusat 60° pada lingkaran berjari-jari 21 cm adalah … cm² (π = 22/7)',
      ans: ['231'],
      wrong: { '1386': 'Itu luas lingkaran penuh. Ambil ⅙-nya.', '22': 'Itu panjang busur.' },
      steps: ['Luas lingkaran = 22/7 × 441 = 1.386.', 'Juring = ⅙ × 1.386 = 231 cm².'],
    },
    {
      type: 'num',
      q: 'Sudut pusat 140° menghadap busur yang sama dengan sudut keliling. Besar sudut keliling adalah … °',
      ans: ['70'],
      wrong: { '280': 'Sudut keliling setengah sudut pusat, bukan dua kali.', '40': 'Setengah dari 140 adalah 70.' },
      steps: ['Sudut keliling = ½ × 140° = 70°.'],
    },
    {
      q: 'Sebuah juring memiliki luas ⅛ luas lingkaran. Sudut pusatnya adalah …',
      options: [
        { t: '45°', ok: true },
        { t: '8°', why: '⅛ × 360° = 45°.' },
        { t: '90°', why: '90° = ¼ lingkaran.' },
        { t: '60°', why: '60° = ⅙ lingkaran.' },
      ],
      steps: ['α = ⅛ × 360° = 45°.'],
    },
    {
      type: 'num',
      q: 'Panjang busur suatu juring 11 cm dan keliling lingkarannya 44 cm. Besar sudut pusatnya adalah … °',
      ans: ['90'],
      wrong: { '4': '11/44 = ¼, lalu ¼ × 360°.', '11': 'Bandingkan busur dengan keliling.' },
      steps: ['11/44 = ¼.', 'α = ¼ × 360° = 90°.'],
    },
  ],
};

export default {
  id: 'k9b5',
  no: 5,
  title: 'Lingkaran',
  desc: 'Unsur lingkaran, keliling dan bilangan π, luas lingkaran, sudut pusat, panjang busur, luas juring, dan sudut keliling.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Sebuah persegi bersisi 14 cm. Di dalamnya digambar lingkaran terbesar yang muat. Luas daerah persegi di luar lingkaran adalah … cm² (π = 22/7)',
      ans: ['42'],
      wrong: { '154': '154 adalah luas lingkaran.', '196': '196 adalah luas persegi.' },
      steps: ['Lingkaran: r = 7 → 154 cm².', 'Persegi: 196 cm².', 'Sisa: 196 − 154 = 42 cm².'],
    },
    {
      type: 'num',
      q: 'Jarum panjang jam sepanjang 7 cm bergerak 30 menit. Panjang lintasan ujung jarum adalah … cm (π = 22/7)',
      ans: ['22'],
      wrong: { '44': '44 adalah satu putaran penuh (60 menit).', '11': '30 menit = setengah putaran.' },
      steps: ['30 menit = ½ putaran.', '½ × 2 × 22/7 × 7 = 22 cm.'],
    },
    {
      q: 'Dua lingkaran berjari-jari 3 cm dan 6 cm. Perbandingan kelilingnya adalah …',
      options: [
        { t: '1 : 2', ok: true },
        { t: '1 : 4', why: '1 : 4 untuk luas. Keliling sebanding dengan jari-jari.' },
        { t: '3 : 6π', why: 'π ada di kedua keliling dan saling menghabisi.' },
        { t: '2 : 1', why: 'Lingkaran pertama lebih kecil.' },
      ],
      steps: ['K₁ : K₂ = 2π(3) : 2π(6) = 1 : 2.'],
    },
  ],
};
