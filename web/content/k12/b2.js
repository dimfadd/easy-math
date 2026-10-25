// Kelas 12 · Bab 2: Busur dan Juring Lingkaran (ukuran radian dan tembereng)
import { T, ln, dot, table } from '../helpers.js';
import { tag } from '../k10/kit.js';

const RAD = 180 / Math.PI;
const CX = 110;
const CY = 150;
const R = 95;
const RX = 305; // kolom kanan
const P = (a, r = R) => [CX + r * Math.cos(a), CY - r * Math.sin(a)]; // a dalam radian
const circ = (id = 'cc') => ({ id, t: 'circle', x: CX, y: CY, r: R, fill: 'none', stroke: 'ink', sw: 2.5 });
const ctr = () => dot('o', CX, CY, 'ink', { r: 4, stroke: 'none' });
const rad = (id, a, c = 'ink', o = {}) => ln(id, CX, CY, ...P(a), { sw: 2.5, c, draw: false, ...o });
// Busur saja (tanpa isi), dari sudut a1 ke a2 berlawanan jarum jam
const busur = (id, a1, a2, c = 'neg', sw = 5) => {
  const [sx, sy] = P(a1);
  const [ex, ey] = P(a2);
  const large = a2 - a1 > Math.PI ? 1 : 0;
  return { id, t: 'path', x: 0, y: 0, d: `M${sx.toFixed(1)},${sy.toFixed(1)} A${R},${R} 0 ${large} 0 ${ex.toFixed(1)},${ey.toFixed(1)}`, stroke: c, sw };
};
// Juring berisi warna lembut, sudut dalam radian
const juring = (id, a1, a2, c = 'pos', r = R) => ({ id, t: 'arc', x: CX, y: CY, r, a1: a1 * RAD, a2: a2 * RAD, c, z: -1 });
const mark = (id, a1, a2, c = 'acc') => ({ id, t: 'arc', x: CX, y: CY, r: 24, a1: a1 * RAD, a2: a2 * RAD, c });
const R_ = (id, text, y, c = 'ink', size = 16) => T(id, text, RX, y, { size, c });

// ---------- 2.1 Ukuran radian ----------
const l1 = {
  id: 'k12b2-1',
  title: 'Ukuran Radian',
  hook: 'Selain derajat, sudut bisa diukur dengan radian: berapa kali panjang jari-jari muat di busurnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Jari-jari sebuah lingkaran dilengkungkan dan ditempelkan pada kelilingnya. Kira-kira berapa besar sudut pusat yang terbentuk?',
          add: [circ(), ctr(), rad('ra', 0, 'neg'), busur('bs', 0, 1), rad('rb', 1), mark('m', 0, 1), R_('q', 'busur = jari-jari', 110, 'neg'), R_('q2', 'sudut pusat ≈ ?', 150, 'acc', 18)],
          ask: {
            options: [
              { t: 'sekitar 57°', ok: true, why: 'Sudut ini disebut 1 radian, kira-kira 57,3°.' },
              { t: 'tepat 60°', why: 'Kalau sisinya lurus, segitiganya sama sisi dan sudutnya 60°. Busur yang melengkung membuat sudutnya sedikit lebih kecil.' },
              { t: 'tepat 90°', why: '90° membutuhkan busur seperempat keliling, sekitar 1,57 kali jari-jari.' },
              { t: 'sekitar 30°', why: 'Busur 30° jauh lebih pendek dari jari-jari, hanya sekitar setengahnya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Satu radian',
      steps: [
        {
          say: 'Ambil jari-jari berwarna merah, panjangnya r.',
          clear: true,
          add: [circ(), ctr(), rad('ra', 0, 'neg'), T('rl', 'r', CX + R / 2, CY + 14, { size: 16, c: 'neg' })],
        },
        {
          say: 'Salin jari-jari itu, lalu tegakkan di ujungnya.',
          add: [ln('tg', CX + R, CY, CX + R, CY - R, { sw: 5, c: 'neg' })],
        },
        {
          say: 'Lengkungkan mengikuti lingkaran. Busurnya sama panjang dengan jari-jari.',
          del: ['tg'],
          add: [busur('bs', 0, 1), T('bl', 'panjang r', ...P(0.5, R + 30), { size: 14, c: 'neg' })],
        },
        {
          say: 'Tarik jari-jari ke ujung busur. Sudut pusat yang terbentuk disebut 1 radian, kira-kira 57,3 derajat.',
          add: [rad('rb', 1), mark('m', 0, 1), R_('a', '1 radian', 190, 'acc', 22), R_('a2', '≈ 57,3°', 225, 'acc', 18)],
        },
      ],
    },
    {
      title: 'Satu putaran',
      steps: [
        {
          say: 'Berapa juring 1 radian yang muat dalam satu putaran? Kita tempel satu per satu.',
          clear: true,
          add: [circ(), ctr(), juring('j0', 0, 1, 'pos'), juring('j1', 1, 2, 'acc')],
        },
        {
          say: 'Muat 6 juring, dan masih ada sisa kecil sekitar 0,28 radian.',
          add: [juring('j2', 2, 3, 'pos'), juring('j3', 3, 4, 'acc'), juring('j4', 4, 5, 'pos'), juring('j5', 5, 6, 'acc'), juring('j6', 6, 2 * Math.PI, 'neg'), R_('a', '6 juring + sisa 0,28', 90, 'ink', 15)],
        },
        {
          say: 'Keliling lingkaran 2 pi r. Dibagi panjang r, hasilnya 2 pi, kira-kira 6,28. Jadi satu putaran sama dengan 2 pi radian.',
          add: [R_('b', '2πr ÷ r = 2π ≈ 6,28', 135, 'ink', 15), tag('c', '360° = 2π rad', RX, 185, 'pos', 18)],
        },
        {
          say: 'Bagi dua: setengah putaran, 180 derajat, sama dengan pi radian. Ini kunci untuk mengubah satuan.',
          add: [tag('d', '180° = π rad', RX, 235, 'ok', 20)],
        },
      ],
    },
    {
      title: 'Mengubah satuan',
      steps: [
        {
          say: 'Karena 180 derajat sama dengan pi radian, derajat diubah ke radian dengan dikali pi per 180. Radian diubah ke derajat dengan dikali 180 per pi.',
          clear: true,
          add: [T('a', 'derajat → radian: × π/180', 200, 50, { size: 20, c: 'pos' }), T('b', 'radian → derajat: × 180/π', 200, 85, { size: 20, c: 'acc' })],
        },
        {
          say: 'Contoh: 60 derajat kali pi per 180 sama dengan pi per 3 radian. Sudut-sudut yang sering dipakai ada di tabel.',
          add: [table('tb', 200, 175, [['derajat', '30°', '45°', '60°', '90°', '180°'], ['radian', 'π/6', 'π/4', 'π/3', 'π/2', 'π']], { cw: [80, 50, 50, 50, 50, 50], rh: 36, size: 16, head: true })],
        },
        {
          say: 'Sebaliknya, 2 pi per 3 radian kali 180 per pi sama dengan 120 derajat. Pi-nya saling coret.',
          add: [T('c', '2π/3 × 180/π = 360/3 = {g:120°}', 200, 255, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 45 derajat sama dengan berapa radian?',
          clear: true,
          add: [T('q', '45° = … rad', 200, 120, { size: 36, c: 'pos' })],
          ask: {
            options: [
              { t: 'π/4', ok: true, why: '45 × π/180 = π/4.' },
              { t: 'π/2', why: 'π/2 = 90°.' },
              { t: '4π', why: '4π adalah dua putaran penuh, 720°.' },
              { t: 'π/45', why: '45 × π/180 = 45π/180, lalu disederhanakan menjadi π/4.' },
            ],
          },
        },
        {
          say: '45 kali pi per 180 sama dengan 45 pi per 180. Sederhanakan dengan membagi 45: pi per 4.',
          add: [T('a', '45 × π/180 = 45π/180 = {g:π/4}', 200, 200, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Sudut 30° jika dinyatakan dalam radian adalah …',
      options: [
        { t: 'π/6', ok: true },
        { t: 'π/3', why: 'π/3 = 60°.' },
        { t: 'π/30', why: '30 × π/180 = π/6, bukan π/30.' },
        { t: '6π', why: '6π adalah tiga putaran penuh.' },
      ],
      steps: ['30 × π/180 = 30π/180.', '= π/6.'],
    },
    {
      type: 'num',
      q: 'Sudut 3π/4 radian sama dengan … derajat.',
      ans: ['135'],
      wrong: { '45': 'Itu π/4. Dikali 3: 135°.', '540': '3π/4 × 180/π = 540/4 = 135.' },
      steps: ['3π/4 × 180/π = 540/4.', '= 135°.'],
    },
    {
      type: 'num',
      q: 'Sudut π/5 radian sama dengan … derajat.',
      ans: ['36'],
      wrong: { '900': 'Dibagi 5, bukan dikali: 180 ÷ 5.', '72': '180 ÷ 5 = 36.' },
      steps: ['π/5 × 180/π = 180/5.', '= 36°.'],
    },
    {
      q: 'Besar sudut 1 radian kira-kira …',
      options: [
        { t: '57°', ok: true },
        { t: '1°', why: '1 radian jauh lebih besar dari 1°: busurnya sepanjang jari-jari.' },
        { t: '180°', why: '180° = π radian, sekitar 3,14 radian.' },
        { t: '3,14°', why: 'π adalah banyak radian dalam 180°, bukan besar 1 radian.' },
      ],
      steps: ['180° = π rad ≈ 3,14 rad.', '1 rad = 180° ÷ 3,14 ≈ 57°.'],
    },
    {
      type: 'num',
      q: 'Sudut 270° = kπ radian. Nilai k adalah …',
      ans: ['3/2', '1.5'],
      wrong: { '270': 'Kalikan dengan π/180: 270/180 = 3/2.', '2/3': 'Terbalik: 270 ÷ 180 = 3/2.' },
      steps: ['270 × π/180 = 270π/180.', '= 3π/2, jadi k = 3/2.'],
    },
  ],
};

// ---------- 2.2 Busur dan juring dalam radian ----------
const l2 = {
  id: 'k12b2-2',
  title: 'Busur dan Juring dalam Radian',
  hook: 'Dengan radian, rumus busur dan juring menjadi sangat ringkas: s = rθ dan L = ½r²θ.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Lingkaran berjari-jari 10 sentimeter. Sudut pusatnya 2 radian. Berapa panjang busurnya?',
          add: [circ(), ctr(), juring('j', 0, 2, 'pos'), busur('bs', 0, 2), rad('ra', 0), rad('rb', 2), T('rl', 'r = 10', CX + R / 2, CY + 14, { size: 14 }), mark('m', 0, 2), R_('q', 'θ = 2 rad', 110, 'acc', 18), R_('q2', 'busur = ?', 150, 'neg', 18)],
          ask: {
            options: [
              { t: '20 cm', ok: true, why: '1 radian membuat busur sepanjang r. 2 radian membuat busur 2r = 20 cm.' },
              { t: '10 cm', why: 'Busur 10 cm hanya untuk sudut 1 radian.' },
              { t: '20π cm', why: '20π cm adalah keliling penuh, sudutnya 2π radian.' },
              { t: '5 cm', why: 'Sudut 2 radian membuat busur lebih panjang dari jari-jari.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Panjang busur',
      steps: [
        {
          say: 'Sudut 1 radian membuat busur sepanjang r.',
          clear: true,
          add: [circ(), ctr(), juring('j', 0, 1, 'pos'), busur('bs', 0, 1), rad('ra', 0), rad('rb', 1), R_('a', 'θ = 1 → busur r', 80, 'ink', 15)],
        },
        {
          say: 'Sudut 2 radian membuat busur 2r. Sudut 3 radian, busurnya 3r.',
          set: { j: juring('j', 0, 3, 'pos'), bs: busur('bs', 0, 3), rb: rad('rb', 3) },
          add: [R_('b', 'θ = 3 → busur 3r', 110, 'ink', 15)],
        },
        {
          say: 'Jadi untuk sudut theta radian, panjang busurnya r kali theta.',
          add: [tag('f', 's = r × θ', RX, 165, 'neg', 24), R_('c', 'θ dalam radian', 205, 'mut', 14)],
        },
        {
          say: 'Rumus kelas 9, sudut per 360 kali 2 pi r, memberi hasil yang sama. Dengan radian, kita tidak perlu membagi 360.',
          add: [R_('d', 'sama dengan  α/360° × 2πr', 245, 'mut', 13)],
        },
      ],
    },
    {
      title: 'Luas juring',
      steps: [
        {
          say: 'Satu putaran penuh 2 pi radian, luasnya pi r kuadrat. Juring theta radian adalah theta per 2 pi bagian dari lingkaran.',
          clear: true,
          add: [circ(), ctr(), juring('j', 0, 2, 'acc'), rad('ra', 0), rad('rb', 2), mark('m', 0, 2, 'neg'), R_('a', 'bagian = θ/2π', 80, 'ink', 16)],
        },
        {
          say: 'Luas juring sama dengan theta per 2 pi kali pi r kuadrat. Pi-nya saling coret, sisa setengah r kuadrat theta.',
          add: [R_('b', 'θ/2π × πr²', 125, 'ink', 18), tag('f', 'L = ½ r² θ', RX, 180, 'acc', 24)],
        },
      ],
    },
    {
      title: 'Contoh: potongan pizza',
      steps: [
        {
          say: 'Pizza berjari-jari 12 sentimeter dipotong dengan sudut pusat pi per 3 radian, yaitu 60 derajat.',
          clear: true,
          add: [circ(), ctr(), juring('j', Math.PI / 3, (2 * Math.PI) / 3, 'acc'), busur('bs', Math.PI / 3, (2 * Math.PI) / 3), rad('ra', Math.PI / 3), rad('rb', (2 * Math.PI) / 3), R_('q', 'r = 12, θ = π/3', 70, 'ink', 17)],
        },
        {
          say: 'Panjang tepi pizza: s sama dengan 12 kali pi per 3, yaitu 4 pi, sekitar 12,6 sentimeter.',
          add: [R_('a', 's = 12 × π/3 = 4π', 125, 'neg', 16), R_('a2', '≈ 12,6 cm', 150, 'neg', 15)],
        },
        {
          say: 'Luas potongan: setengah kali 144 kali pi per 3, yaitu 24 pi, sekitar 75,4 sentimeter persegi.',
          add: [R_('b', 'L = ½ × 144 × π/3 = 24π', 205, 'acc', 14), R_('b2', '≈ 75,4 cm²', 230, 'acc', 15)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Juring berjari-jari 6 sentimeter dengan sudut pusat 1,5 radian. Berapa luasnya?',
          clear: true,
          add: [T('q', 'r = 6 cm,  θ = 1,5 rad', 200, 100, { size: 28, c: 'pos' }), T('q2', 'luas juring = ?', 200, 155, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '27 cm²', ok: true, why: '½ × 36 × 1,5 = 27.' },
              { t: '9 cm²', why: '9 adalah panjang busur 6 × 1,5, satuannya cm, bukan luas.' },
              { t: '54 cm²', why: 'Jangan lupa dikali ½.' },
              { t: '4,5 cm²', why: 'Jari-jari dikuadratkan: 6² = 36.' },
            ],
          },
        },
        {
          say: 'Setengah kali 6 kuadrat kali 1,5. Setengah kali 36 sama dengan 18, dikali 1,5 sama dengan 27.',
          add: [T('a', 'L = ½ × 6² × 1,5 = 18 × 1,5 = {g:27 cm²}', 200, 225, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Lingkaran berjari-jari 5 cm. Panjang busur dengan sudut pusat 3 radian adalah … cm.',
      ans: ['15'],
      wrong: { '8': 'Dikali, bukan ditambah: 5 × 3.', '37.5': 'Itu luas juring. Panjang busur s = r × θ.' },
      steps: ['s = r × θ.', '= 5 × 3 = 15 cm.'],
    },
    {
      type: 'num',
      q: 'Luas juring dengan jari-jari 4 cm dan sudut pusat 2 radian adalah … cm².',
      ans: ['16'],
      wrong: { '8': 'Itu panjang busur. Luas juring L = ½ r² θ.', '32': 'Jangan lupa dikali ½.' },
      steps: ['L = ½ × 4² × 2.', '= ½ × 16 × 2 = 16 cm².'],
    },
    {
      type: 'num',
      q: 'Busur sepanjang 18 cm terletak pada lingkaran berjari-jari 6 cm. Besar sudut pusatnya … radian.',
      ans: ['3'],
      wrong: { '108': 'θ = s ÷ r = 18 ÷ 6.', '1/3': 'Terbalik: θ = s ÷ r.' },
      steps: ['s = r × θ → θ = s ÷ r.', 'θ = 18 ÷ 6 = 3 radian.'],
    },
    {
      q: 'Panjang busur dengan jari-jari 12 cm dan sudut pusat π/6 radian adalah …',
      options: [
        { t: '2π cm', ok: true },
        { t: '12π cm', why: '12 × π/6 = 2π.' },
        { t: '72π cm', why: 'π/6 berarti dibagi 6, bukan dikali 6.' },
        { t: '12π cm²', why: 'Itu luas juring, dan satuan busur adalah cm.' },
      ],
      steps: ['s = 12 × π/6.', '= 2π cm.'],
    },
    {
      type: 'num',
      q: 'Juring berjari-jari 10 cm memiliki luas 50 cm². Besar sudut pusatnya … radian.',
      ans: ['1'],
      wrong: { '5': '½ × 100 × θ = 50 → 50θ = 50.', '0.5': '½ × 10² = 50, jadi 50θ = 50 → θ = 1.' },
      steps: ['50 = ½ × 10² × θ = 50θ.', 'θ = 1 radian.'],
    },
  ],
};

// ---------- 2.3 Tembereng ----------
const A1 = (5 * Math.PI) / 4;
const A2 = (7 * Math.PI) / 4;
const TCY = 120;
const TR = 100;
const TP = (a) => [CX + TR * Math.cos(a), TCY - TR * Math.sin(a)];
const [AX, AY] = TP(A1);
const [BX, BY] = TP(A2);
const tcirc = { id: 'cc', t: 'circle', x: CX, y: TCY, r: TR, fill: 'none', stroke: 'ink', sw: 2.5 };
const tjur = (c = 'pos') => ({ id: 'jr', t: 'arc', x: CX, y: TCY, r: TR, a1: 225, a2: 315, c, z: -2 });
const tseg = { id: 'sg', t: 'poly', x: 0, y: 0, pts: [[CX, TCY], [AX, AY], [BX, BY]], fill: 'neg-soft', stroke: 'neg', sw: 2.5, z: -1 };
const tem = { id: 'tm', t: 'path', x: 0, y: 0, d: `M${AX.toFixed(1)},${AY.toFixed(1)} A${TR},${TR} 0 0 0 ${BX.toFixed(1)},${BY.toFixed(1)} Z`, fill: 'acc-soft', stroke: 'acc', sw: 3, z: -1 };
const tbase = () => [tcirc, dot('o', CX, TCY, 'ink', { r: 4, stroke: 'none' }), T('lo', 'O', CX, TCY - 14, { size: 14 }), T('la', 'A', AX - 10, AY + 12, { size: 14 }), T('lb', 'B', BX + 10, BY + 12, { size: 14 })];

const l3 = {
  id: 'k12b2-3',
  title: 'Luas Tembereng',
  hook: 'Tembereng adalah daerah antara busur dan tali busur. Luasnya didapat dari luas juring dikurangi luas segitiga.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Daerah kuning dibatasi busur AB dan tali busur AB. Bagaimana cara menghitung luasnya?',
          add: [tbase(), tem, R_('q', 'luas daerah kuning?', 110, 'acc', 16)],
          ask: {
            options: [
              { t: 'luas juring OAB − luas segitiga OAB', ok: true, why: 'Juring OAB terdiri dari segitiga OAB dan daerah kuning. Buang segitiganya.' },
              { t: 'luas juring OAB + luas segitiga OAB', why: 'Segitiga sudah ada di dalam juring, jadi harus dikurangi.' },
              { t: 'luas lingkaran − luas juring OAB', why: 'Itu daerah di luar juring, jauh lebih besar.' },
              { t: 'panjang busur × panjang tali busur', why: 'Perkalian dua panjang itu bukan luas daerah melengkung ini.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Juring dikurangi segitiga',
      steps: [
        {
          say: 'Mulai dari juring OAB dengan sudut pusat 90 derajat.',
          clear: true,
          add: [tbase(), tjur('pos'), R_('a', 'juring OAB', 80, 'pos', 17)],
        },
        {
          say: 'Di dalam juring ada segitiga OAB, dibatasi dua jari-jari dan tali busur AB.',
          add: [tseg, R_('b', '− segitiga OAB', 115, 'neg', 17)],
        },
        {
          say: 'Buang segitiganya. Yang tersisa adalah tembereng, daerah antara busur dan tali busur.',
          del: ['jr', 'sg'],
          add: [tem, tag('c', '= tembereng', RX, 160, 'acc', 18)],
        },
      ],
    },
    {
      title: 'Rumusnya',
      steps: [
        {
          say: 'Luas juring setengah r kuadrat theta. Luas segitiga dengan dua sisi r dan sudut apit theta adalah setengah r kuadrat sinus theta, seperti di kelas 10.',
          clear: true,
          add: [T('a', 'juring = ½ r² θ', 200, 60, { size: 22, c: 'pos' }), T('b', 'segitiga = ½ r² sin θ', 200, 100, { size: 22, c: 'neg' })],
        },
        {
          say: 'Kurangkan, lalu keluarkan setengah r kuadrat. Ingat, theta di bagian pertama harus dalam radian.',
          add: [T('c', 'tembereng = ½ r² (θ − sin θ)', 200, 160, { size: 24, c: 'acc' }), T('d', 'θ dalam radian', 200, 200, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Contoh: sudut 90°',
      steps: [
        {
          say: 'Jari-jari 10 sentimeter, sudut pusat 90 derajat, yaitu pi per 2 radian. Luas juring: setengah kali 100 kali pi per 2, sama dengan 25 pi.',
          clear: true,
          add: [tbase(), tjur('pos'), R_('q', 'r = 10, θ = π/2', 60, 'ink', 16), R_('a', 'juring = 25π', 95, 'pos', 16)],
        },
        {
          say: 'Sudut 90 derajat membuat segitiga siku-siku. Luasnya setengah kali 10 kali 10, sama dengan 50.',
          add: [tseg, R_('b', 'segitiga = 50', 125, 'neg', 16)],
        },
        {
          say: 'Luas tembereng sama dengan 25 pi dikurangi 50, kira-kira 78,5 dikurangi 50, yaitu 28,5 sentimeter persegi.',
          del: ['jr', 'sg'],
          add: [tem, tag('c', '25π − 50', RX, 175, 'acc', 18), R_('c2', '≈ 28,5 cm²', 210, 'acc', 16)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Jari-jari 6 sentimeter, sudut pusat 60 derajat. Luas juringnya 6 pi dan luas segitiganya 9 akar 3. Berapa luas temberengnya?',
          clear: true,
          add: [T('q', 'r = 6,  θ = 60° = π/3', 200, 70, { size: 26, c: 'pos' }), T('q2', 'juring = 6π,  segitiga = 9√3', 200, 120, { size: 20 }), T('q3', 'tembereng = ?', 200, 165, { size: 24, c: 'acc' })],
          ask: {
            options: [
              { t: '6π − 9√3', ok: true, why: 'Tembereng = juring − segitiga.' },
              { t: '6π + 9√3', why: 'Segitiga ada di dalam juring, jadi dikurangi.' },
              { t: '9√3 − 6π', why: 'Hasilnya negatif, padahal luas selalu positif. Juring lebih besar dari segitiga.' },
              { t: '36π − 9√3', why: '36π adalah luas seluruh lingkaran. Pakai luas juring.' },
            ],
          },
        },
        {
          say: 'Juring dikurangi segitiga: 6 pi dikurangi 9 akar 3, kira-kira 18,85 dikurangi 15,59, yaitu 3,26 sentimeter persegi.',
          add: [T('a', '6π − 9√3 ≈ 18,85 − 15,59 ≈ {g:3,26 cm²}', 200, 230, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Juring OAB berjari-jari 10 cm dengan sudut pusat 90°. Luas segitiga OAB adalah … cm².',
      ans: ['50'],
      wrong: { '100': 'Segitiga siku-siku: ½ × 10 × 10.', '25': '½ × 10 × 10 = 50.' },
      steps: ['Sudut 90° → segitiga siku-siku.', 'L = ½ × 10 × 10 = 50 cm².'],
    },
    {
      q: 'Tembereng adalah daerah yang dibatasi oleh …',
      options: [
        { t: 'busur dan tali busur', ok: true },
        { t: 'dua jari-jari dan busur', why: 'Itu juring.' },
        { t: 'dua jari-jari dan tali busur', why: 'Itu segitiga.' },
        { t: 'dua tali busur', why: 'Tembereng dibatasi satu busur dan satu tali busur.' },
      ],
      steps: ['Tembereng: antara busur dan tali busurnya.'],
    },
    {
      type: 'num',
      q: 'Luas tembereng dengan jari-jari 4 cm dan sudut pusat 90° dapat ditulis aπ − b. Nilai a + b adalah …',
      ans: ['12'],
      wrong: { '24': 'Luas juring ½ × 16 × π/2 = 4π, bukan 16π.', '6': 'Segitiga = ½ × 4 × 4 = 8, juring = 4π. a + b = 4 + 8.' },
      steps: ['Juring = ½ × 4² × π/2 = 4π. Segitiga = ½ × 4 × 4 = 8.', 'Tembereng = 4π − 8, a + b = 12.'],
    },
    {
      type: 'num',
      q: 'Lingkaran berjari-jari 8 cm. Panjang tali busur di depan sudut pusat 60° adalah … cm.',
      ans: ['8'],
      wrong: { '4': 'Segitiga OAB sama sisi karena sudut pusatnya 60° dan dua sisinya jari-jari.', '16': 'Tali busur = sisi segitiga sama sisi = 8.' },
      steps: ['OA = OB = 8 dan sudut O = 60°, jadi segitiga OAB sama sisi.', 'AB = 8 cm.'],
    },
    {
      q: 'Rumus luas tembereng dengan sudut pusat θ (radian) dan jari-jari r adalah …',
      options: [
        { t: '½ r² (θ − sin θ)', ok: true },
        { t: '½ r² (θ + sin θ)', why: 'Segitiga dikurangi, bukan ditambah.' },
        { t: 'r (θ − sin θ)', why: 'Luas memuat r², bukan r.' },
        { t: '½ r² θ', why: 'Itu luas juring, belum dikurangi segitiga.' },
      ],
      steps: ['Juring ½ r² θ dikurangi segitiga ½ r² sin θ.', '= ½ r² (θ − sin θ).'],
    },
  ],
};

export default {
  id: 'k12b2',
  no: 2,
  title: 'Busur dan Juring Lingkaran',
  desc: 'Ukuran sudut radian, panjang busur dan luas juring dengan radian, serta luas tembereng.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Sudut 150° = kπ/6 radian. Nilai k adalah …',
      ans: ['5'],
      wrong: { '25': '150 × π/180 = 5π/6, jadi k = 5.', '6': '150/180 = 5/6.' },
      steps: ['150 × π/180 = 150π/180 = 5π/6.', 'k = 5.'],
    },
    {
      type: 'num',
      q: 'Roda berjari-jari 30 cm berputar sejauh 4 radian. Titik di tepi roda menempuh lintasan sepanjang … cm.',
      ans: ['120'],
      wrong: { '34': 'Dikali: 30 × 4.', '1800': 'Itu luas juring. Lintasan titik tepi adalah panjang busur.' },
      steps: ['s = r × θ.', '= 30 × 4 = 120 cm.'],
    },
    {
      q: 'Luas juring dengan jari-jari 2 cm dan sudut pusat π radian adalah …',
      options: [
        { t: '2π cm²', ok: true },
        { t: '4π cm²', why: '4π adalah luas seluruh lingkaran. Sudut π radian hanya setengah lingkaran.' },
        { t: 'π cm²', why: '½ × 2² × π = 2π.' },
        { t: '2 cm²', why: 'Jangan lupa faktor π dari sudutnya.' },
      ],
      steps: ['L = ½ × 2² × π.', '= 2π cm² (setengah lingkaran).'],
    },
  ],
};
