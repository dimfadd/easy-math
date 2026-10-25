// Kelas 11 · Bab 2: Lingkaran
import { T, ln, dot } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag } from '../k10/kit.js';

const rad = (d) => (d * Math.PI) / 180;
const r1 = (v) => Math.round(v * 10) / 10;
const onC = (o, r, d) => [r1(o[0] + r * Math.cos(rad(d))), r1(o[1] - r * Math.sin(rad(d)))];
const circle = (id, o, r, o2 = {}) => ({ id, t: 'circle', x: o[0], y: o[1], r, fill: 'none', stroke: 'ink', sw: 2.5, z: -2, ...o2 });
const seg = (id, a, b, o = {}) => ln(id, a[0], a[1], b[0], b[1], { sw: 2.5, c: 'ink', draw: false, ...o });
// Busur penanda sudut di titik V antara arah ke A dan arah ke B (selalu sudut yang < 180°)
function angle(id, V, A, B, o = {}) {
  const t = (p) => (Math.atan2(-(p[1] - V[1]), p[0] - V[0]) * 180) / Math.PI;
  let a1 = t(A);
  let a2 = t(B);
  if ((((a2 - a1) % 360) + 360) % 360 > 180) [a1, a2] = [a2, a1];
  return { id, t: 'arc', x: V[0], y: V[1], r: 22, a1, a2, lsize: 13, lpad: 14, ...o };
}
const lab = (id, text, p, o, dx = 0, dy = 0) => {
  const v = [p[0] - o[0], p[1] - o[1]];
  const n = Math.hypot(...v) || 1;
  return T(id, text, p[0] + (v[0] / n) * 16 + dx, p[1] + (v[1] / n) * 16 + dy, { size: 16, c: 'mut' });
};

// ---------- 2.1 Sifat sudut pada lingkaran ----------
const O = [200, 150];
const R = 100;
const P = (d) => onC(O, R, d);
const tri = (c) => [seg('ca', P(c), P(180)), seg('cb', P(c), P(0)), dot('C', ...P(c), 'neg', { r: 6 }), angle('ac', P(c), P(180), P(0), { right: true, c: 'neg' })];

const QUAD = [30, 120, 190, 290];
const QANG = { 30: 85, 120: 100, 190: 95, 290: 80 };

const l1 = {
  id: 'k11b2-1',
  title: 'Sifat Sudut pada Lingkaran',
  hook: 'Sudut keliling punya sifat tetap: menghadap diameter selalu siku-siku, dan menghadap busur yang sama selalu sama besar.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'AB adalah diameter lingkaran. Titik C ada di lingkaran. Berapa besar sudut ACB?',
          add: [circle('c', O, R), seg('ab', P(180), P(0)), dot('O', ...O, 'ink', { r: 4 }), seg('ca', P(120), P(180)), seg('cb', P(120), P(0)), dot('C', ...P(120), 'neg', { r: 6 }), lab('lA', 'A', P(180), O), lab('lB', 'B', P(0), O), lab('lC', 'C', P(120), O)],
          ask: {
            options: [
              { t: '90°', ok: true, why: 'Sudut keliling yang menghadap diameter selalu siku-siku.' },
              { t: '60°', why: 'Coba geser C ke mana pun: sudutnya selalu 90°.' },
              { t: '180°', why: '180° adalah sudut pusat AOB. Sudut kelilingnya setengahnya.' },
              { t: 'tergantung letak C', why: 'Selama C di lingkaran dan AB diameter, sudutnya tetap 90°.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menghadap diameter',
      steps: [
        {
          say: 'Sudut pusat AOB adalah garis lurus, 180 derajat. Sudut keliling yang menghadap busur yang sama besarnya setengah sudut pusat. Jadi sudut ACB sama dengan 90 derajat.',
          add: [angle('ac', P(120), P(180), P(0), { right: true, c: 'neg' }), tag('k', 'sudut keliling = ½ × sudut pusat = ½ × 180° = 90°', 200, 280, 'neg', 13)],
        },
        {
          say: 'Pindahkan C ke tempat lain. Sudutnya tetap siku-siku.',
          del: ['lC'],
          set: Object.fromEntries(tri(60).map((e) => [e.id, e])),
        },
        {
          say: 'Di sini pun tetap 90 derajat. Ini sering dipakai untuk mencari sisi segitiga dengan Pythagoras.',
          set: Object.fromEntries(tri(150).map((e) => [e.id, e])),
        },
      ],
    },
    {
      title: 'Menghadap busur yang sama',
      steps: [
        {
          say: 'Sekarang tali busur AB yang bukan diameter. Sudut pusat AOB-nya 90 derajat.',
          clear: true,
          add: [circle('c', O, R), seg('ab', P(225), P(315)), dot('O', ...O, 'ink', { r: 4 }), seg('oa', O, P(225), { c: 'mut', sw: 2 }), seg('ob', O, P(315), { c: 'mut', sw: 2 }), angle('ao', O, P(225), P(315), { c: 'pos', label: '90°', r: 18 }), lab('lA', 'A', P(225), O), lab('lB', 'B', P(315), O)],
        },
        {
          say: 'Ambil titik C di lingkaran. Sudut ACB setengah dari 90, yaitu 45 derajat.',
          add: [seg('c1', P(90), P(225), { c: 'neg' }), seg('c2', P(90), P(315), { c: 'neg' }), angle('a1', P(90), P(225), P(315), { c: 'neg', label: '45°', r: 26 })],
        },
        {
          say: 'Titik D dan E di bagian lingkaran yang sama juga memberi 45 derajat. Semua sudut keliling yang menghadap busur yang sama besarnya sama.',
          add: [seg('d1', P(145), P(225), { c: 'acc' }), seg('d2', P(145), P(315), { c: 'acc' }), angle('a2', P(145), P(225), P(315), { c: 'acc', label: '45°', r: 22 }), seg('e1', P(35), P(225), { c: 'ok' }), seg('e2', P(35), P(315), { c: 'ok' }), angle('a3', P(35), P(225), P(315), { c: 'ok', label: '45°', r: 22 })],
        },
      ],
    },
    {
      title: 'Segi empat tali busur',
      steps: [
        {
          say: 'Segi empat yang keempat titik sudutnya di lingkaran disebut segi empat tali busur.',
          clear: true,
          add: [circle('c', O, R), { id: 'q', t: 'poly', x: 0, y: 0, pts: QUAD.map(P), fill: 'pos-soft', stroke: 'ink', sw: 2.5, z: -1 }],
        },
        {
          say: 'Ukur keempat sudutnya: 85, 100, 95, dan 80 derajat.',
          add: QUAD.map((d, i) => angle(`q${i}`, P(d), P(QUAD[(i + 3) % 4]), P(QUAD[(i + 1) % 4]), { c: i % 2 ? 'acc' : 'neg', label: `${QANG[d]}°`, r: 20, lpad: 16 })),
        },
        {
          say: 'Sudut yang berhadapan selalu berjumlah 180 derajat: 85 tambah 95, dan 100 tambah 80.',
          add: [tag('k', 'sudut berhadapan: 85° + 95° = 180°, 100° + 80° = 180°', 200, 282, 'ink', 13)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. ABCD segi empat tali busur dengan sudut A sama dengan 70 derajat. Berapa sudut C?',
          clear: true,
          add: [T('q', 'ABCD segi empat tali busur', 200, 90, { size: 24 }), T('q2', '∠A = 70°,  ∠C = ?', 200, 150, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '110°', ok: true, why: 'A dan C berhadapan: 180° − 70° = 110°.' },
              { t: '70°', why: 'Sudut berhadapan berjumlah 180°, bukan sama besar.' },
              { t: '140°', why: 'Itu sudut pusat yang menghadap busur yang sama dengan A.' },
              { t: '20°', why: '90° − 70°. Yang benar 180° − 70°.' },
            ],
          },
        },
        {
          say: 'Sudut A dan C berhadapan, jadi jumlahnya 180. Sudut C sama dengan 110 derajat.',
          add: [T('a', '∠C = 180° − 70° = {g:110°}', 200, 220, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Sudut pusat AOB = 140°. Besar sudut keliling ACB yang menghadap busur AB adalah … °',
      ans: ['70'],
      wrong: { '280': 'Sudut keliling setengah sudut pusat, bukan dua kali.', '140': 'Sudut keliling = ½ × 140°.' },
      steps: ['Sudut keliling = ½ × sudut pusat.', '½ × 140° = 70°.'],
    },
    {
      type: 'num',
      q: 'ABCD segi empat tali busur dengan ∠B = 105°. Besar ∠D adalah … °',
      ans: ['75'],
      wrong: { '105': 'Sudut berhadapan berjumlah 180°.', '255': '180° − 105° = 75°.' },
      steps: ['B dan D berhadapan.', '∠D = 180° − 105° = 75°.'],
    },
    {
      type: 'num',
      q: 'AB diameter lingkaran dan C di lingkaran. Jika ∠CAB = 35°, maka ∠CBA = … °',
      ans: ['55'],
      wrong: { '35': '∠ACB = 90°, jadi ∠CBA = 180° − 90° − 35°.', '145': 'Sudut C siku-siku: 90° − 35° = 55°.' },
      steps: ['∠ACB = 90° (menghadap diameter).', '∠CBA = 180° − 90° − 35° = 55°.'],
    },
    {
      type: 'num',
      q: '∠ACB = ∠ADB = 40°, keduanya menghadap busur AB. Besar sudut pusat AOB adalah … °',
      ans: ['80'],
      wrong: { '40': 'Sudut pusat dua kali sudut keliling.', '20': 'Sudut pusat lebih besar dari sudut keliling: 2 × 40°.' },
      steps: ['Sudut pusat = 2 × sudut keliling.', '2 × 40° = 80°.'],
    },
    {
      q: 'Sudut keliling yang menghadap diameter selalu …',
      options: [
        { t: 'siku-siku', ok: true },
        { t: 'lancip', why: 'Sudut pusatnya 180°, jadi sudut kelilingnya 90°.' },
        { t: 'tumpul', why: 'Setengah dari 180° adalah 90°.' },
        { t: '180°', why: '180° adalah sudut pusatnya.' },
      ],
      steps: ['Sudut pusat yang menghadap diameter = 180°.', 'Sudut keliling = 90°.'],
    },
  ],
};

// ---------- 2.2 Tali busur dan apotema ----------
const O2 = [200, 150];
const R2 = 110;
const U2 = R2 / 10;
const M2 = [200, 150 + 6 * U2];
const CA = [200 - 8 * U2, M2[1]];
const CB = [200 + 8 * U2, M2[1]];

const l2 = {
  id: 'k11b2-2',
  title: 'Tali Busur dan Apotema',
  hook: 'Garis dari pusat yang tegak lurus tali busur membelahnya tepat di tengah. Dari situ muncul segitiga siku-siku.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Lingkaran berjari-jari 10 sentimeter. Sebuah tali busur berjarak 6 sentimeter dari pusat. Berapa panjang tali busur itu?',
          add: [circle('c', O2, R2), dot('O', ...O2, 'ink', { r: 4 }), seg('ch', CA, CB, { c: 'pos', sw: 3 }), seg('om', O2, M2, { c: 'acc', dash: '5 4', sw: 2 }), T('d', '6', 212, 185, { size: 16, c: 'acc' }), T('r', 'r = 10', 340, 70, { size: 18 })],
          ask: {
            options: [
              { t: '16 cm', ok: true, why: 'Setengah tali busur = √(10² − 6²) = 8. Jadi tali busur 16 cm.' },
              { t: '8 cm', why: '8 cm baru setengahnya.' },
              { t: '4 cm', why: '10 − 6 = 4 bukan caranya. Pakai Pythagoras.' },
              { t: '20 cm', why: '20 cm adalah diameter, tali busur terpanjang. Tali ini tidak lewat pusat.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Dibelah dua sama panjang',
      steps: [
        {
          say: 'Garis dari pusat yang tegak lurus tali busur disebut apotema. Garis ini membagi tali busur menjadi dua bagian yang sama panjang.',
          add: [angle('rt', M2, O2, CB, { right: true, c: 'acc', r: 16 }), T('h1', 'sama', 156, M2[1] + 16, { size: 14, c: 'pos' }), T('h2', 'sama', 244, M2[1] + 16, { size: 14, c: 'pos' })],
        },
        {
          say: 'Tarik jari-jari ke ujung tali busur. Terbentuk segitiga siku-siku: jari-jari sebagai sisi miring, apotema dan setengah tali busur sebagai sisi tegak.',
          add: [seg('ob', O2, CB, { c: 'neg' }), { id: 'tr', t: 'poly', x: 0, y: 0, pts: [O2, M2, CB], fill: 'acc-soft', stroke: 'none', sw: 0, z: -3 }, T('lr', '10', 262, 172, { size: 16, c: 'neg' })],
        },
        {
          say: 'Setengah tali busur sama dengan akar dari 10 kuadrat dikurangi 6 kuadrat, yaitu akar 64, sama dengan 8. Tali busurnya 16 sentimeter.',
          set: { h1: { text: '8' }, h2: { text: '8' } },
          add: [tag('f', '½ tali = √(10² − 6²) = 8 → tali = 16', 200, 25, 'ok', 14)],
        },
      ],
    },
    {
      title: 'Hubungan umum',
      steps: [
        {
          say: 'Hubungan ketiganya: r kuadrat sama dengan d kuadrat tambah setengah tali busur dikuadratkan, dengan d jarak tali busur ke pusat.',
          clear: true,
          add: [T('f', 'r² = d² + (½ × tali)²', 200, 80, { size: 30, c: 'pos' })],
        },
        {
          say: 'Semakin dekat tali busur ke pusat, semakin panjang. Tali busur terpanjang melewati pusat, yaitu diameter. Tali busur yang sama panjang berjarak sama dari pusat.',
          add: [T('a', 'd = 0  →  tali = diameter (terpanjang)', 200, 150, { size: 18 }), T('b', 'tali sama panjang  ⟺  jarak ke pusat sama', 200, 190, { size: 18 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Jari-jari lingkaran 13 sentimeter dan jarak tali busur ke pusat 5 sentimeter. Berapa panjang tali busurnya?',
          clear: true,
          add: [T('q', 'r = 13 cm,  d = 5 cm', 200, 90, { size: 28 }), T('q2', 'panjang tali busur = ?', 200, 150, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '24 cm', ok: true, why: '√(169 − 25) = 12, dikali 2 = 24 cm.' },
              { t: '12 cm', why: '12 cm baru setengahnya.' },
              { t: '8 cm', why: '13 − 5 bukan caranya.' },
              { t: '26 cm', why: 'Itu diameter. Tali busur ini tidak melewati pusat.' },
            ],
          },
        },
        {
          say: 'Setengah tali busur sama dengan akar dari 169 dikurangi 25, yaitu akar 144, sama dengan 12. Tali busurnya 24 sentimeter.',
          add: [T('a', '½ tali = √(169 − 25) = 12', 200, 210, { size: 24 }), T('b', 'tali = {g:24 cm}', 200, 255, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jari-jari lingkaran 5 cm dan panjang tali busur 8 cm. Jarak tali busur ke pusat adalah … cm',
      ans: ['3'],
      wrong: { '√39': 'Pakai setengah tali busur: √(25 − 16).', '1': '√(5² − 4²) = 3.' },
      steps: ['Setengah tali = 4.', 'd = √(25 − 16) = 3 cm.'],
    },
    {
      type: 'num',
      q: 'Jari-jari lingkaran 17 cm dan jarak tali busur ke pusat 8 cm. Panjang tali busur adalah … cm',
      ans: ['30'],
      wrong: { '15': '15 baru setengah tali busur.', '9': 'Pakai Pythagoras: √(289 − 64).' },
      steps: ['½ tali = √(289 − 64) = 15.', 'Tali = 30 cm.'],
    },
    {
      type: 'num',
      q: 'Tali busur 24 cm berjarak 5 cm dari pusat. Jari-jari lingkaran adalah … cm',
      ans: ['13'],
      wrong: { '24,5': 'Pakai setengah tali busur: √(12² + 5²).', '29': 'Jari-jari = √(144 + 25).' },
      steps: ['½ tali = 12.', 'r = √(144 + 25) = 13 cm.'],
    },
    {
      q: 'Dua tali busur pada lingkaran yang sama panjangnya sama. Maka …',
      options: [
        { t: 'jarak keduanya ke pusat sama', ok: true },
        { t: 'keduanya pasti sejajar', why: 'Tali busur sama panjang bisa berada di arah mana saja.' },
        { t: 'keduanya pasti diameter', why: 'Tidak harus. Diameter hanyalah tali busur terpanjang.' },
        { t: 'keduanya saling tegak lurus', why: 'Tidak ada aturan seperti itu.' },
      ],
      steps: ['r² = d² + (½ tali)².', 'r dan tali sama → d sama.'],
    },
    {
      type: 'num',
      q: 'Diameter lingkaran 20 cm dan tali busur 12 cm. Jarak tali busur ke pusat adalah … cm',
      ans: ['8'],
      wrong: { '16': 'Jari-jarinya 10, bukan 20: √(100 − 36).', '4': '√(10² − 6²) = 8.' },
      steps: ['r = 10, ½ tali = 6.', 'd = √(100 − 36) = 8 cm.'],
    },
  ],
};

// ---------- 2.3 Garis singgung ----------
const O3 = [125, 150];
const U3 = 16;
const R3 = 5 * U3;
const P3 = [O3[0] + 13 * U3, 150];
const AL = (Math.acos(5 / 13) * 180) / Math.PI;
const T1 = onC(O3, R3, AL);
const T2 = onC(O3, R3, -AL);

const l3 = {
  id: 'k11b2-3',
  title: 'Garis Singgung Lingkaran',
  hook: 'Garis singgung hanya menyentuh lingkaran di satu titik, dan selalu tegak lurus jari-jari di titik itu.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Lingkaran berjari-jari 5. Titik P berjarak 13 dari pusat. Dari P ditarik garis yang menyinggung lingkaran. Berapa panjang garis singgung itu?',
          add: [circle('c', O3, R3), dot('O', ...O3, 'ink', { r: 4 }), dot('P', ...P3, 'neg', { r: 6 }), seg('op', O3, P3, { c: 'mut', dash: '5 4', sw: 2 }), T('d', '13', (O3[0] + P3[0]) / 2 + 20, 165, { size: 16, c: 'mut' }), T('lp', 'P', P3[0] + 14, 150, { size: 16, c: 'neg' }), T('lo', 'O', O3[0] - 12, 162, { size: 15, c: 'mut' })],
          ask: {
            options: [
              { t: '12', ok: true, why: 'Garis singgung tegak lurus jari-jari, jadi √(13² − 5²) = 12.' },
              { t: '8', why: '13 − 5 = 8 adalah jarak P ke lingkaran lewat garis lurus ke pusat, bukan garis singgung.' },
              { t: '13', why: '13 adalah jarak P ke pusat. Garis singgung lebih pendek.' },
              { t: '18', why: 'Tidak dijumlah. Pakai Pythagoras.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tegak lurus jari-jari',
      steps: [
        {
          say: 'Tarik garis dari P yang menyentuh lingkaran tepat di satu titik, T. Itulah garis singgung.',
          add: [seg('pt', P3, T1, { c: 'pos', sw: 3 }), dot('T', ...T1, 'pos', { r: 5 }), T('lt', 'T', T1[0] - 2, T1[1] - 16, { size: 15, c: 'pos' })],
        },
        {
          say: 'Jari-jari OT selalu tegak lurus garis singgung di titik singgungnya. Jadi segitiga OTP siku-siku di T.',
          add: [seg('ot', O3, T1, { c: 'neg' }), angle('rt', T1, O3, P3, { right: true, c: 'acc', r: 16 }), T('l5', '5', (O3[0] + T1[0]) / 2 - 10, (O3[1] + T1[1]) / 2 - 4, { size: 16, c: 'neg' })],
        },
        {
          say: 'Panjang garis singgung sama dengan akar dari OP kuadrat dikurangi r kuadrat: akar dari 169 dikurangi 25, yaitu 12.',
          add: [tag('f', 'PT = √(OP² − r²) = √(169 − 25) = 12', 200, 270, 'ok', 15), T('l12', '12', (P3[0] + T1[0]) / 2 + 10, (P3[1] + T1[1]) / 2 - 12, { size: 16, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Dua garis singgung',
      steps: [
        {
          say: 'Dari P bisa ditarik dua garis singgung, ke T dan ke titik S di bawah. Keduanya sama panjang, sama-sama 12.',
          add: [seg('ps', P3, T2, { c: 'pos', sw: 3 }), seg('os', O3, T2, { c: 'neg' }), dot('S', ...T2, 'pos', { r: 5 }), T('ls', 'S', T2[0] - 2, T2[1] + 16, { size: 15, c: 'pos' }), angle('rs', T2, O3, P3, { right: true, c: 'acc', r: 16 })],
          del: ['f'],
        },
        {
          say: 'Bangun OTPS berbentuk layang-layang. Luasnya dua kali luas segitiga OTP: 2 kali setengah kali 5 kali 12, yaitu 60.',
          add: [{ id: 'kt', t: 'poly', x: 0, y: 0, pts: [O3, T1, P3, T2], fill: 'acc-soft', stroke: 'none', sw: 0, z: -3 }, tag('f2', 'luas OTPS = 2 × ½ × 5 × 12 = 60', 200, 272, 'ink', 14)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Jari-jari lingkaran 6 dan jarak titik P ke pusat 10. Berapa panjang garis singgung dari P?',
          clear: true,
          add: [T('q', 'r = 6,  OP = 10', 200, 100, { size: 30 }), T('q2', 'panjang garis singgung = ?', 200, 160, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '8', ok: true, why: '√(100 − 36) = √64 = 8.' },
              { t: '4', why: '10 − 6 bukan caranya.' },
              { t: '√136', why: 'Itu √(100 + 36). Garis singgung adalah sisi tegak, jadi dikurangi.' },
              { t: '16', why: 'Pakai Pythagoras, bukan penjumlahan.' },
            ],
          },
        },
        {
          say: 'Akar dari 10 kuadrat dikurangi 6 kuadrat, yaitu akar 64, sama dengan 8.',
          add: [T('a', '√(10² − 6²) = √64 = {g:8}', 200, 225, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Jari-jari lingkaran 7 cm dan jarak titik P ke pusat 25 cm. Panjang garis singgung dari P adalah … cm',
      ans: ['24'],
      wrong: { '18': '25 − 7 bukan caranya. √(625 − 49).', '26': 'Garis singgung lebih pendek dari OP.' },
      steps: ['PT = √(25² − 7²) = √576.', '= 24 cm.'],
    },
    {
      type: 'num',
      q: 'Panjang garis singgung dari P adalah 15 cm dan jari-jari lingkaran 8 cm. Jarak P ke pusat adalah … cm',
      ans: ['17'],
      wrong: { '23': 'OP = √(15² + 8²), bukan 15 + 8.', '√161': 'OP adalah sisi miring: √(225 + 64).' },
      steps: ['OP² = PT² + r² = 225 + 64 = 289.', 'OP = 17 cm.'],
    },
    {
      type: 'num',
      q: 'Besar sudut antara jari-jari dan garis singgung di titik singgungnya adalah … °',
      ans: ['90'],
      wrong: { '180': 'Keduanya tegak lurus, bukan segaris.', '45': 'Jari-jari selalu tegak lurus garis singgung.' },
      steps: ['Garis singgung ⟂ jari-jari.', 'Sudutnya 90°.'],
    },
    {
      type: 'num',
      q: 'Jarak titik P ke pusat lingkaran 10 cm dan panjang garis singgungnya 8 cm. Jari-jari lingkaran adalah … cm',
      ans: ['6'],
      wrong: { '2': '10 − 8 bukan caranya. r = √(100 − 64).', '√164': 'r adalah sisi tegak: √(100 − 64).' },
      steps: ['r = √(OP² − PT²).', '= √(100 − 64) = 6 cm.'],
    },
    {
      type: 'num',
      q: 'Dari titik P ditarik dua garis singgung PA dan PB ke lingkaran berpusat O dan berjari-jari 5 cm. Jika PA = 12 cm, luas layang-layang OAPB adalah … cm²',
      ans: ['60'],
      wrong: { '30': '30 adalah luas satu segitiga OAP. Layang-layang terdiri dari dua segitiga.', '120': 'Luas segitiga = ½ × 5 × 12 = 30, dikali 2.' },
      steps: ['Luas OAP = ½ × 5 × 12 = 30.', 'Luas OAPB = 2 × 30 = 60 cm².'],
    },
  ],
};

// ---------- 2.4 Persamaan lingkaran ----------
const C4 = { x: 80, y: 25, w: 240, h: 240, xmin: -6, xmax: 6, ymin: -6, ymax: 6 };
const P4 = plane('pl', { ...C4, every: 2 });
const UN = P4.X(1) - P4.X(0);
const ring = (id, a, b, r, o = {}) => ({ id, t: 'circle', x: P4.X(a), y: P4.Y(b), r: r * UN, fill: 'none', stroke: 'pos', sw: 3, z: -1, ...o });

const l4 = {
  id: 'k11b2-4',
  title: 'Persamaan Lingkaran',
  hook: 'Setiap titik di lingkaran berjarak sama dari pusat. Dengan Pythagoras, syarat itu menjadi sebuah persamaan.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Lingkaran berpusat di 0 koma 0 dengan jari-jari 5. Apakah titik 3 koma 4 terletak tepat pada lingkaran?',
          add: [...P4.els, ring('c', 0, 0, 5), dot('p', ...P4.at(3, 4), 'neg')],
          ask: {
            options: [
              { t: 'ya, karena jaraknya ke pusat tepat 5', ok: true, why: '√(3² + 4²) = √25 = 5.' },
              { t: 'tidak, karena 3 + 4 = 7', why: 'Jarak bukan penjumlahan koordinat. Pakai Pythagoras.' },
              { t: 'tidak, titik itu di dalam', why: 'Jaraknya √25 = 5, tepat sama dengan jari-jari.' },
              { t: 'tidak bisa ditentukan', why: 'Bisa, dengan menghitung jaraknya ke pusat.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pythagoras di bidang',
      steps: [
        {
          say: 'Tarik garis dari pusat ke titik 3 koma 4. Bersama garis mendatar 3 dan tegak 4, terbentuk segitiga siku-siku dengan sisi miring 5.',
          add: [seg('r', P4.at(0, 0), P4.at(3, 4), { c: 'neg' }), seg('hx', P4.at(0, 0), P4.at(3, 0), { c: 'acc', dash: '5 4' }), seg('hy', P4.at(3, 0), P4.at(3, 4), { c: 'acc', dash: '5 4' }), tag('e', '3² + 4² = 25', 330, 40, 'neg', 15)],
        },
        {
          say: 'Untuk sembarang titik x koma y di lingkaran, berlaku x kuadrat tambah y kuadrat sama dengan 25. Inilah persamaan lingkarannya.',
          add: [tag('f', 'x² + y² = 25', 330, 70, 'pos', 16)],
        },
        {
          say: 'Cek titik lain, misalnya minus 4 koma 3: 16 tambah 9 sama dengan 25. Juga di lingkaran.',
          add: [dot('q', ...P4.at(-4, 3), 'ok')],
          set: { e: tag('e', '(−4)² + 3² = 25', 330, 40, 'ok', 15) },
        },
        {
          say: 'Bentuk umumnya: lingkaran berpusat di 0 koma 0 dengan jari-jari r punya persamaan x kuadrat tambah y kuadrat sama dengan r kuadrat.',
          set: { f: tag('f', 'x² + y² = r²', 330, 70, 'pos', 16) },
        },
      ],
    },
    {
      title: 'Pusat bergeser',
      steps: [
        {
          say: 'Sekarang lingkaran berjari-jari 3 yang pusatnya digeser ke 2 koma 1.',
          clear: true,
          keep: ['pl*'],
          add: [ring('c2', 2, 1, 3, { from: { x: P4.X(0), y: P4.Y(0) } }), dot('m', ...P4.at(2, 1), 'acc', { r: 5 })],
        },
        {
          say: 'Jarak mendatar titik x koma y ke pusat adalah x dikurangi 2. Jarak tegaknya y dikurangi 1. Dengan Pythagoras, persamaannya: x dikurangi 2 dikuadratkan, tambah y dikurangi 1 dikuadratkan, sama dengan 9.',
          add: [tag('f', '(x − 2)² + (y − 1)² = 9', 200, 280, 'pos', 15)],
        },
        {
          say: 'Bentuk umumnya: pusat a koma b, jari-jari r. x dikurangi a dikuadratkan, tambah y dikurangi b dikuadratkan, sama dengan r kuadrat.',
          set: { f: tag('f', '(x − a)² + (y − b)² = r²', 200, 280, 'pos', 15) },
        },
      ],
    },
    {
      title: 'Di dalam, pada, atau di luar',
      steps: [
        {
          say: 'Masukkan koordinat titik ke ruas kiri. Titik 4 koma 1: 4 tambah 0 sama dengan 4, kurang dari 9. Titiknya di dalam lingkaran.',
          del: ['f'],
          add: [dot('a', ...P4.at(4, 1), 'ok'), tag('ta', '(4, 1): 4 < 9 → di dalam', 200, 280, 'ok', 14)],
        },
        {
          say: 'Titik 5 koma 1: 9 tambah 0 sama dengan 9. Tepat pada lingkaran.',
          add: [dot('b', ...P4.at(5, 1), 'acc')],
          set: { ta: tag('ta', '(5, 1): 9 = 9 → pada lingkaran', 200, 280, 'acc', 14) },
        },
        {
          say: 'Titik 2 koma 5: 0 tambah 16 sama dengan 16, lebih dari 9. Titiknya di luar.',
          add: [dot('d', ...P4.at(2, 5), 'neg')],
          set: { ta: tag('ta', '(2, 5): 16 > 9 → di luar', 200, 280, 'neg', 14) },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Persamaan lingkaran yang berpusat di minus 1 koma 3 dengan jari-jari 4 adalah …',
          clear: true,
          add: [T('q', 'pusat (−1, 3),  r = 4', 200, 110, { size: 28 })],
          ask: {
            options: [
              { t: '(x + 1)² + (y − 3)² = 16', ok: true, why: 'x − (−1) = x + 1, y − 3, dan r² = 16.' },
              { t: '(x − 1)² + (y + 3)² = 16', why: 'Tandanya terbalik. Pusat (−1, 3) memberi (x + 1) dan (y − 3).' },
              { t: '(x + 1)² + (y − 3)² = 4', why: 'Ruas kanan adalah r², yaitu 16.' },
              { t: 'x² + y² = 16', why: 'Itu lingkaran berpusat di (0, 0).' },
            ],
          },
        },
        {
          say: 'x dikurangi minus 1 sama dengan x tambah 1, lalu y dikurangi 3, dan 4 kuadrat sama dengan 16.',
          add: [T('a', '{g:(x + 1)² + (y − 3)² = 16}', 200, 190, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Persamaan lingkaran berpusat di (0, 0) dengan jari-jari 6 adalah …',
      options: [
        { t: 'x² + y² = 36', ok: true },
        { t: 'x² + y² = 6', why: 'Ruas kanan adalah r² = 36.' },
        { t: 'x² + y² = 12', why: 'r² = 6 × 6 = 36.' },
        { t: '(x − 6)² + (y − 6)² = 36', why: 'Itu lingkaran berpusat di (6, 6).' },
      ],
      steps: ['x² + y² = r².', 'r² = 36.'],
    },
    {
      type: 'num',
      q: 'Jari-jari lingkaran x² + y² = 49 adalah …',
      ans: ['7'],
      wrong: { '49': '49 adalah r². r = √49.', '24,5': 'Akar, bukan dibagi 2.' },
      steps: ['r² = 49.', 'r = 7.'],
    },
    {
      q: 'Pusat lingkaran (x − 3)² + (y + 2)² = 25 adalah …',
      options: [
        { t: '(3, −2)', ok: true },
        { t: '(−3, 2)', why: '(x − 3) berarti a = 3, dan (y + 2) = (y − (−2)) berarti b = −2.' },
        { t: '(3, 2)', why: '(y + 2) memberi b = −2.' },
        { t: '(5, 5)', why: '5 adalah jari-jari.' },
      ],
      steps: ['(x − a)² + (y − b)² = r².', 'a = 3, b = −2.'],
    },
    {
      q: 'Letak titik (1, 2) terhadap lingkaran x² + y² = 9 adalah …',
      options: [
        { t: 'di dalam lingkaran', ok: true },
        { t: 'pada lingkaran', why: '1 + 4 = 5, tidak sama dengan 9.' },
        { t: 'di luar lingkaran', why: '5 < 9, jadi di dalam.' },
        { t: 'di pusat lingkaran', why: 'Pusatnya (0, 0).' },
      ],
      steps: ['1² + 2² = 5.', '5 < 9 → di dalam.'],
    },
    {
      type: 'num',
      q: 'Lingkaran berpusat di (0, 0) melalui titik (5, 12). Jari-jarinya adalah …',
      ans: ['13'],
      wrong: { '17': 'Jarak bukan penjumlahan koordinat: √(25 + 144).', '169': '169 adalah r². r = 13.' },
      steps: ['r² = 5² + 12² = 169.', 'r = 13.'],
    },
  ],
};

export default {
  id: 'k11b2',
  no: 2,
  title: 'Lingkaran',
  desc: 'Sifat sudut pada lingkaran, segi empat tali busur, tali busur dan apotema, garis singgung, dan persamaan lingkaran.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      type: 'num',
      q: 'Segitiga ABC berada di dalam lingkaran dengan AB sebagai diameter. Jika AC = 6 cm dan BC = 8 cm, diameter lingkaran adalah … cm',
      ans: ['10'],
      wrong: { '14': 'Sudut C siku-siku, jadi AB = √(36 + 64).', '5': '5 adalah jari-jarinya.' },
      steps: ['∠C = 90° karena menghadap diameter.', 'AB = √(36 + 64) = 10 cm.'],
    },
    {
      type: 'num',
      q: 'Panjang garis singgung dari titik (13, 0) ke lingkaran x² + y² = 25 adalah …',
      ans: ['12'],
      wrong: { '8': 'Jarak ke pusat 13, jari-jari 5. √(169 − 25).' },
      steps: ['OP = 13, r = 5.', '√(169 − 25) = 12.'],
    },
    {
      q: 'Lingkaran berpusat di (2, −1) melalui titik (5, 3). Persamaannya adalah …',
      options: [
        { t: '(x − 2)² + (y + 1)² = 25', ok: true },
        { t: '(x + 2)² + (y − 1)² = 25', why: 'Pusat (2, −1) memberi (x − 2) dan (y + 1).' },
        { t: '(x − 2)² + (y + 1)² = 5', why: 'Ruas kanan adalah r² = 25.' },
        { t: '(x − 5)² + (y − 3)² = 25', why: '(5, 3) adalah titik di lingkaran, bukan pusat.' },
      ],
      steps: ['r² = (5 − 2)² + (3 + 1)² = 9 + 16 = 25.', '(x − 2)² + (y + 1)² = 25.'],
    },
  ],
};
