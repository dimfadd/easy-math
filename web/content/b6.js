// Bab 6: Garis dan Sudut
import { T, ln, dot } from './helpers.js';

const rad = (d) => (d * Math.PI) / 180;
// Sinar dari titik sudut (vx, vy) ke arah deg (0 = kanan, berlawanan jarum jam positif)
const ray = (id, vx, vy, deg, len, o = {}) => ln(id, vx, vy, vx + len * Math.cos(rad(deg)), vy - len * Math.sin(rad(deg)), { sw: 3, ...o });
const ang = (id, vx, vy, a1, a2, label, o = {}) => ({ id, t: 'arc', x: vx, y: vy, a1, a2, r: 26, label, ...o });
// Sinar yang bisa diputar mulus: digambar ke kanan lalu diputar dengan rot
const spin = (id, vx, vy, deg, len, o = {}) => ({ id, t: 'line', x: vx, y: vy, x2: vx + len, y2: vy, sw: 3.5, c: 'pos', rot: -deg, draw: false, ...o });

// Dua garis sejajar dipotong garis transversal yang condong theta derajat.
// Posisi sudut: P1/P2 (atas/bawah) × TL/TR/BL/BR
function parallels(theta, prefix = 'g') {
  const dx = 50 / Math.tan(rad(theta));
  const P1 = { x: 200 + dx, y: 100 };
  const P2 = { x: 200 - dx, y: 200 };
  const k = 1 / Math.tan(rad(theta));
  const els = [
    ln(`${prefix}L1`, 25, 100, 375, 100, { sw: 3, arrow: 'both', draw: false }),
    ln(`${prefix}L2`, 25, 200, 375, 200, { sw: 3, arrow: 'both', draw: false }),
    ln(`${prefix}T`, P1.x + 60 * k, 40, P2.x - 80 * k, 280, { sw: 3, c: 'mut', draw: false }),
  ];
  const span = { TR: [0, theta], TL: [theta, 180], BL: [180, 180 + theta], BR: [180 + theta, 360] };
  const at = (P, pos, id, label, o = {}) => ang(id, P.x, P.y, span[pos][0], span[pos][1], label, { r: 24, ...o });
  return { els, P1, P2, at, size: { TR: theta, TL: 180 - theta, BL: theta, BR: 180 - theta } };
}

// ---------- 6.1 Mengenal sudut ----------
const l1 = {
  id: 'b6-1',
  title: 'Mengenal dan Mengukur Sudut',
  hook: 'Sudut dengan kaki yang panjang belum tentu lebih besar. Yang diukur adalah bukaannya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sudut mana yang lebih besar, A atau B?',
          add: [
            ray('a1', 40, 200, 0, 140),
            ray('a2', 40, 200, 40, 140),
            ang('aa', 40, 200, 0, 40, undefined, { r: 30 }),
            T('la', 'A', 105, 235, { size: 24 }),
            ray('b1', 280, 200, 0, 60),
            ray('b2', 280, 200, 110, 60),
            ang('bb', 280, 200, 0, 110, undefined, { r: 22 }),
            T('lb', 'B', 300, 235, { size: 24 }),
          ],
          ask: {
            options: [
              { t: 'B', ok: true, why: 'Bukaan B lebih lebar.' },
              { t: 'A', why: 'Kaki sudut A memang lebih panjang, tapi panjang kaki tidak memengaruhi besar sudut. Yang diukur adalah bukaannya.' },
              { t: 'Sama besar', why: 'Bukaannya jelas berbeda. B membuka lebih lebar.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Sudut adalah putaran',
      steps: [
        {
          say: 'Sudut terbentuk dari dua sinar yang berpangkal di satu titik. Bayangkan satu sinar diam, sinar lainnya berputar.',
          clear: true,
          add: [ray('base', 200, 180, 0, 140, { draw: false }), spin('arm', 200, 180, 0, 140), dot('v', 200, 180, 'ink'), T('deg', '0°', 200, 250, { size: 30 })],
        },
        { say: 'Putar seperempat putaran: 90 derajat. Ini sudut siku-siku.', set: { arm: { rot: -90 }, deg: { text: '90°  siku-siku' } }, add: [ang('m', 200, 180, 0, 90, undefined, { right: true, r: 30 })] },
        { say: 'Putar setengah putaran: 180 derajat. Kedua sinar membentuk garis lurus.', del: ['m'], set: { arm: { rot: -180 }, deg: { text: '180°  sudut lurus' } } },
        { say: 'Putar penuh: 360 derajat, kembali ke awal.', set: { arm: { rot: -360 }, deg: { text: '360°  satu putaran' } } },
      ],
    },
    {
      title: 'Jenis sudut',
      steps: [
        {
          say: 'Sudut kurang dari 90 derajat disebut lancip. Tepat 90 derajat disebut siku-siku.',
          clear: true,
          add: [
            ray('a1', 40, 120, 0, 110),
            ray('a2', 40, 120, 50, 110),
            ang('aa', 40, 120, 0, 50, '50°', { r: 30 }),
            T('ta', 'lancip: < 90°', 95, 150, { size: 16 }),
            ray('b1', 230, 120, 0, 110),
            ray('b2', 230, 120, 90, 80),
            ang('bb', 230, 120, 0, 90, undefined, { right: true, r: 30 }),
            T('tb', 'siku-siku: 90°', 285, 150, { size: 16 }),
          ],
        },
        {
          say: 'Lebih dari 90 tapi kurang dari 180 derajat disebut tumpul. Lebih dari 180 derajat disebut refleks.',
          add: [
            ray('c1', 90, 250, 0, 90),
            ray('c2', 90, 250, 130, 80),
            ang('cc', 90, 250, 0, 130, '130°', { r: 28 }),
            T('tc', 'tumpul: 90° – 180°', 95, 280, { size: 16 }),
            ray('d1', 290, 235, 0, 80),
            ray('d2', 290, 235, 300, 60),
            ang('dd', 290, 235, 0, 300, '300°', { r: 22, lpad: 18 }),
            T('td', 'refleks: > 180°', 300, 288, { size: 16 }),
          ],
        },
      ],
    },
    {
      title: 'Mengukur dengan busur',
      steps: [
        {
          say: 'Untuk mengukur, letakkan titik tengah busur tepat di titik sudut, dan garis nol busur berimpit dengan satu kaki sudut.',
          clear: true,
          add: [{ id: 'p', t: 'prot', x: 200, y: 230, r: 150, double: true }, ray('k1', 200, 230, 0, 175, { c: 'pos', sw: 3.5 }), ray('k2', 200, 230, 50, 175, { c: 'pos', sw: 3.5 })],
        },
        {
          say: 'Busur punya dua deret angka. Pakai deret yang dimulai dari 0 pada kaki pertama. Kaki kedua melewati angka 50, jadi sudutnya 50 derajat, bukan 130.',
          add: [ang('m', 200, 230, 0, 50, '50°', { r: 46, lpad: 16 })],
          hl: ['k1'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Berapa besar sudut ini?',
          clear: true,
          add: [{ id: 'p', t: 'prot', x: 200, y: 230, r: 150, double: true }, ray('k1', 200, 230, 0, 175, { c: 'pos', sw: 3.5 }), ray('k2', 200, 230, 135, 175, { c: 'pos', sw: 3.5 })],
          ask: {
            options: [
              { t: '135°', ok: true, why: 'Mulai dari 0 di kaki kanan, kaki kedua melewati 135.' },
              { t: '45°', why: 'Itu bacaan dari deret yang salah. Kaki pertama ada di angka 0 deret bagian dalam.' },
              { t: '150°', why: 'Baca angka tepat di tempat kaki kedua lewat: 135.' },
            ],
          },
        },
        { say: 'Kaki pertama di 0, kaki kedua melewati 135. Sudutnya 135 derajat, termasuk sudut tumpul.', add: [ang('m', 200, 230, 0, 135, '135°', { r: 46, lpad: 16 })] },
      ],
    },
  ],
  quiz: [
    {
      q: 'Sudut 135° termasuk jenis sudut …',
      options: [
        { t: 'tumpul', ok: true },
        { t: 'lancip', why: 'Lancip kurang dari 90°.' },
        { t: 'refleks', why: 'Refleks lebih dari 180°.' },
        { t: 'siku-siku', why: 'Siku-siku tepat 90°.' },
      ],
      steps: ['135° lebih dari 90° dan kurang dari 180°.', 'Jadi termasuk sudut tumpul.'],
    },
    {
      q: 'Besar sudut pada gambar adalah …',
      fig: [{ id: 'p', t: 'prot', x: 200, y: 230, r: 150, double: true }, ray('k1', 200, 230, 0, 175, { c: 'pos', sw: 3.5 }), ray('k2', 200, 230, 70, 175, { c: 'pos', sw: 3.5 })],
      viewBox: '20 50 360 200',
      figLabel: 'Busur derajat dengan satu kaki sudut di angka 0 dan kaki lainnya di angka 70',
      options: [
        { t: '70°', ok: true },
        { t: '110°', why: 'Itu angka dari deret yang tidak dimulai di kaki pertama. Gunakan deret yang 0-nya di kaki pertama.' },
        { t: '90°', why: 'Kaki kedua belum tegak lurus. Baca angka tempat kaki kedua lewat.' },
        { t: '20°', why: 'Baca angka tempat kaki kedua lewat, dihitung dari 0.' },
      ],
      steps: ['Kaki pertama tepat di angka 0 deret dalam.', 'Kaki kedua melewati angka 70 pada deret yang sama.'],
    },
    {
      type: 'num',
      q: 'Pukul 3.00, besar sudut terkecil antara jarum jam dan jarum menit adalah …°',
      ans: ['90'],
      wrong: { '270': 'Itu sudut yang besar (refleks). Yang ditanya sudut terkecil.', '3': 'Satu angka jam sama dengan 360° ÷ 12 = 30°. Dari 12 ke 3 ada 3 angka.' },
      steps: ['Satu putaran 360° dibagi 12 angka: tiap angka 30°.', 'Dari angka 12 ke angka 3 ada 3 angka: 3 × 30° = 90°.'],
    },
    {
      q: 'Besar sudut satu putaran penuh adalah …',
      options: [
        { t: '360°', ok: true },
        { t: '180°', why: '180° adalah setengah putaran (sudut lurus).' },
        { t: '90°', why: '90° adalah seperempat putaran.' },
        { t: '100°', why: 'Satu putaran penuh adalah 360°.' },
      ],
      steps: ['Satu putaran penuh = 360°.'],
    },
    {
      type: 'num',
      q: 'Pukul 4.00, besar sudut terkecil antara jarum jam dan jarum menit adalah …°',
      ans: ['120'],
      wrong: { '240': 'Itu sudut yang besar. Sudut terkecil = 360° − 240°.', '4': 'Tiap angka jam berjarak 30°. Dari 12 ke 4 ada 4 angka.', '40': 'Tiap angka jam berjarak 30°, bukan 10°.' },
      steps: ['Tiap angka jam: 30°.', 'Dari 12 ke 4 ada 4 angka: 4 × 30° = 120°.'],
    },
  ],
};

// ---------- 6.2 Hubungan antarsudut ----------
const l2 = {
  id: 'b6-2',
  title: 'Hubungan Antarsudut',
  hook: 'Sudut berpelurus, berpenyiku, dan bertolak belakang. Satu sudut diketahui, yang lain bisa dihitung.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua sudut saling berpelurus. Satu sudutnya 65 derajat. Berapa sudut pasangannya?',
          add: [ln('l', 30, 190, 370, 190, { sw: 3, draw: false }), ray('r', 200, 190, 65, 140), ang('a', 200, 190, 0, 65, '65°', { r: 32 }), ang('b', 200, 190, 65, 180, '?', { r: 32, c: 'pos' })],
          ask: {
            options: [
              { t: '115°', ok: true, why: 'Berpelurus berarti jumlahnya 180°.' },
              { t: '25°', why: '25° adalah penyikunya (jumlah 90°). Berpelurus jumlahnya 180°.' },
              { t: '65°', why: 'Bukaannya jelas berbeda. Kedua sudut membentuk garis lurus, jadi jumlahnya 180°.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Berpelurus',
      steps: [
        {
          say: 'Dua sudut yang bersama-sama membentuk garis lurus disebut berpelurus. Jumlahnya selalu 180 derajat.',
          clear: true,
          add: [ln('l', 30, 190, 370, 190, { sw: 3, draw: false }), spin('r', 200, 190, 50, 140), ang('a', 200, 190, 0, 50, '50°', { r: 32 }), ang('b', 200, 190, 50, 180, '130°', { r: 32, c: 'pos' }), T('s', '50° + 130° = 180°', 200, 255, { size: 26 })],
        },
        {
          say: 'Kalau sinarnya digeser, satu sudut membesar dan yang lain mengecil. Jumlahnya tetap 180 derajat.',
          set: { r: { rot: -110 }, a: { a2: 110, label: '110°' }, b: { a1: 110, label: '70°' }, s: { text: '110° + 70° = 180°' } },
        },
      ],
    },
    {
      title: 'Berpenyiku',
      steps: [
        {
          say: 'Kalau dua sudut bersama-sama membentuk sudut siku-siku, keduanya disebut berpenyiku. Jumlahnya 90 derajat.',
          clear: true,
          add: [
            ray('h', 120, 220, 0, 220, { draw: false }),
            ray('v', 120, 220, 90, 180, { draw: false }),
            spin('r', 120, 220, 35, 190),
            ang('a', 120, 220, 0, 35, '35°', { r: 48 }),
            ang('b', 120, 220, 35, 90, '55°', { r: 48, c: 'pos' }),
            T('s', '35° + 55° = 90°', 270, 262, { size: 24 }),
          ],
        },
      ],
    },
    {
      title: 'Bertolak belakang',
      steps: [
        {
          say: 'Dua garis yang berpotongan membentuk empat sudut. Sudut yang saling berhadapan disebut bertolak belakang.',
          clear: true,
          add: [ray('l1a', 200, 150, 30, 170, { draw: false }), ray('l1b', 200, 150, 210, 170, { draw: false }), ray('l2a', 200, 150, 150, 170, { draw: false }), ray('l2b', 200, 150, 330, 170, { draw: false }), ang('a', 200, 150, 150, 210, 'a', { r: 30 }), ang('c', 200, 150, 330, 30, 'c', { r: 30 })],
        },
        {
          say: 'Sudut a dan b berpelurus, jadi a tambah b sama dengan 180. Sudut b dan c juga berpelurus, jadi b tambah c sama dengan 180. Berarti a sama dengan c.',
          add: [ang('b', 200, 150, 30, 150, 'b', { r: 30, c: 'pos' }), T('e1', 'a + b = 180°', 90, 250, { size: 18 }), T('e2', 'b + c = 180°', 310, 250, { size: 18 }), T('e3', 'jadi a = c', 200, 282, { size: 22, c: 'acc' })],
        },
        {
          say: 'Sudut bertolak belakang selalu sama besar. Kalau a 60 derajat, c juga 60 derajat, dan b 120 derajat.',
          set: { a: { label: '60°' }, c: { label: '60°' }, b: { label: '120°' } },
          del: ['e1', 'e2', 'e3'],
          add: [T('e4', 'bertolak belakang: sama besar', 200, 275, { size: 20 })],
        },
      ],
    },
    {
      title: 'Mencari x',
      steps: [
        {
          say: 'Dua sudut berpelurus besarnya 2x tambah 10 derajat dan x tambah 20 derajat. Berapa x?',
          clear: true,
          add: [ln('l', 30, 170, 370, 170, { sw: 3, draw: false }), ray('r', 200, 170, 70, 130), ang('a', 200, 170, 0, 70, '(x + 20)°', { r: 30, lpad: 30 }), ang('b', 200, 170, 70, 180, '(2x + 10)°', { r: 30, lpad: 34, c: 'pos' })],
        },
        { say: 'Jumlahnya 180: 3x tambah 30 sama dengan 180. Jadi 3x sama dengan 150, x sama dengan 50.', add: [T('e1', '(2x + 10) + (x + 20) = 180', 200, 215, { size: 20 }), T('e2', '3x + 30 = 180,  x = {p:50}', 200, 250, { size: 22 })] },
        { say: 'Sudutnya 110 derajat dan 70 derajat. Jumlahnya memang 180.', set: { a: { label: '70°' }, b: { label: '110°' } }, add: [T('e3', '110° + 70° = 180°  ✓', 200, 283, { size: 18, c: 'ok' })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dua garis berpotongan. Satu sudutnya 72 derajat. Berapa sudut yang bertolak belakang dengannya?',
          clear: true,
          add: [ray('l1a', 200, 150, 36, 170, { draw: false }), ray('l1b', 200, 150, 216, 170, { draw: false }), ray('l2a', 200, 150, 144, 170, { draw: false }), ray('l2b', 200, 150, 324, 170, { draw: false }), ang('a', 200, 150, 144, 216, '72°', { r: 30 }), ang('c', 200, 150, 324, 36, '?', { r: 30, c: 'pos' })],
          ask: {
            options: [
              { t: '72°', ok: true, why: 'Sudut bertolak belakang sama besar.' },
              { t: '108°', why: '108° adalah sudut di sebelahnya (berpelurus). Sudut yang berhadapan sama besar.' },
              { t: '18°', why: '18° adalah penyiku dari 72°, tidak ada hubungannya di sini.' },
            ],
          },
        },
        { say: 'Sudut yang berhadapan sama besar, jadi 72 derajat. Dua sudut lainnya masing-masing 108 derajat.', set: { c: { label: '72°' } }, add: [ang('b', 200, 150, 36, 144, '108°', { r: 30, c: 'mut' }), ang('d', 200, 150, 216, 324, '108°', { r: 30, c: 'mut' })] },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Penyiku dari sudut 28° adalah …°',
      ans: ['62'],
      wrong: { '152': 'Itu pelurusnya (180° − 28°). Penyiku berjumlah 90°.' },
      steps: ['Penyiku: jumlahnya 90°.', '90° − 28° = 62°.'],
    },
    {
      type: 'num',
      q: 'Pelurus dari sudut 107° adalah …°',
      ans: ['73'],
      wrong: { '-17': 'Pelurus berjumlah 180°, bukan 90°.', '253': 'Pelurus berjumlah 180°, bukan 360°.' },
      steps: ['Pelurus: jumlahnya 180°.', '180° − 107° = 73°.'],
    },
    {
      q: 'Pada gambar, dua garis berpotongan. Nilai x adalah …',
      fig: [ray('l1a', 200, 150, 30, 150, { draw: false }), ray('l1b', 200, 150, 210, 150, { draw: false }), ray('l2a', 200, 150, 105, 150, { draw: false }), ray('l2b', 200, 150, 285, 150, { draw: false }), ang('a', 200, 150, 30, 105, '3x°', { r: 30 }), ang('c', 200, 150, 210, 285, '75°', { r: 30 })],
      viewBox: '40 40 320 220',
      figLabel: 'Dua garis berpotongan, sudut 3x berhadapan dengan sudut 75 derajat',
      options: [
        { t: '25', ok: true },
        { t: '35', why: 'Kedua sudut berhadapan (bertolak belakang), jadi sama besar, bukan berjumlah 180°.' },
        { t: '75', why: '75 adalah besar sudutnya. 3x = 75, jadi x = 25.' },
        { t: '15', why: '3x = 75, jadi x = 75 ÷ 3.' },
      ],
      steps: ['Sudut 3x dan 75° bertolak belakang, jadi sama besar.', '3x = 75, x = 25.'],
    },
    {
      q: 'Dua sudut berpelurus dengan perbandingan 2 : 3. Sudut yang lebih kecil adalah …',
      options: [
        { t: '72°', ok: true },
        { t: '36°', why: 'Berpelurus jumlahnya 180°, bukan 90°.' },
        { t: '108°', why: 'Itu sudut yang lebih besar.' },
        { t: '60°', why: '180° dibagi 5 bagian, tiap bagian 36°. Yang kecil 2 bagian.' },
      ],
      steps: ['Jumlah 180°, dibagi 2 + 3 = 5 bagian: tiap bagian 36°.', 'Sudut kecil: 2 × 36° = 72°.'],
    },
    {
      q: 'Sudut (3x − 5)° dan (x + 15)° saling berpenyiku. Nilai x adalah …',
      options: [
        { t: '20', ok: true },
        { t: '42,5', why: 'Berpenyiku jumlahnya 90°, bukan 180°.' },
        { t: '25', why: '4x + 10 = 90, jadi 4x = 80. Angka 10 dikurangkan, bukan ditambahkan.' },
      ],
      steps: ['(3x − 5) + (x + 15) = 90.', '4x + 10 = 90, 4x = 80, x = 20.'],
    },
  ],
};

// ---------- 6.3 Garis sejajar dan transversal ----------
const G = parallels(60);

const l3 = {
  id: 'b6-3',
  title: 'Garis Sejajar dan Garis Transversal',
  hook: 'Dua garis sejajar dipotong satu garis. Delapan sudut muncul, tapi besarnya cuma dua macam.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua garis sejajar dipotong sebuah garis. Sudut di atas 60 derajat. Berapa sudut yang posisinya sama di persimpangan bawah?',
          add: [...G.els, G.at(G.P1, 'TR', 'a', '60°'), G.at(G.P2, 'TR', 'b', '?', { c: 'pos' })],
          ask: {
            options: [
              { t: '60°', ok: true, why: 'Posisinya sama di persimpangan yang lain.' },
              { t: '120°', why: '120° adalah sudut di sebelahnya. Posisi yang sama di persimpangan lain besarnya sama.' },
              { t: '30°', why: 'Tidak ada sudut 30° di sini. Bandingkan posisi kedua sudut.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Geser saja',
      steps: [
        {
          say: 'Di persimpangan atas ada empat sudut: 60, 120, 60, dan 120 derajat.',
          clear: true,
          add: [...G.els, G.at(G.P1, 'TR', 'm0', '60°'), G.at(G.P1, 'TL', 'm1', '120°', { c: 'pos' }), G.at(G.P1, 'BL', 'm2', '60°'), G.at(G.P1, 'BR', 'm3', '120°', { c: 'pos' })],
        },
        {
          say: 'Karena kedua garis sejajar, persimpangan bawah adalah salinan persimpangan atas yang digeser sepanjang garis potong. Keempat sudutnya ikut tergeser tanpa berubah.',
          set: { m0: { x: G.P2.x, y: G.P2.y }, m1: { x: G.P2.x, y: G.P2.y }, m2: { x: G.P2.x, y: G.P2.y }, m3: { x: G.P2.x, y: G.P2.y } },
          add: [G.at(G.P1, 'TR', 'n0', '60°'), G.at(G.P1, 'TL', 'n1', '120°', { c: 'pos' }), G.at(G.P1, 'BL', 'n2', '60°'), G.at(G.P1, 'BR', 'n3', '120°', { c: 'pos' })],
        },
        { say: 'Jadi hanya ada dua macam besar sudut: 60 derajat dan 120 derajat. Jumlah keduanya 180.', add: [T('s', '60° + 120° = 180°', 300, 262, { size: 18 })] },
      ],
    },
    {
      title: 'Nama pasangan sudut',
      steps: [
        {
          say: 'Sudut sehadap: posisinya sama di kedua persimpangan. Besarnya sama.',
          clear: true,
          add: [...G.els, G.at(G.P1, 'TR', 'a', '60°'), G.at(G.P2, 'TR', 'b', '60°'), T('n', 'sehadap: sama besar', 200, 282, { size: 20 })],
        },
        {
          say: 'Sudut dalam berseberangan: di antara kedua garis sejajar, di sisi berbeda garis potong. Besarnya sama.',
          clear: true,
          add: [...G.els, G.at(G.P1, 'BL', 'a', '60°'), G.at(G.P2, 'TR', 'b', '60°'), T('n', 'dalam berseberangan: sama besar', 200, 282, { size: 20 })],
        },
        {
          say: 'Sudut luar berseberangan: di luar kedua garis sejajar, di sisi berbeda. Besarnya juga sama.',
          clear: true,
          add: [...G.els, G.at(G.P1, 'TL', 'a', '120°', { c: 'pos' }), G.at(G.P2, 'BR', 'b', '120°', { c: 'pos' }), T('n', 'luar berseberangan: sama besar', 200, 282, { size: 20 })],
        },
        {
          say: 'Sudut dalam sepihak: di antara kedua garis sejajar, di sisi yang sama. Besarnya tidak sama, tapi jumlahnya 180 derajat.',
          clear: true,
          add: [...G.els, G.at(G.P1, 'BL', 'a', '60°'), G.at(G.P2, 'TL', 'b', '120°', { c: 'pos' }), T('n', 'dalam sepihak: jumlahnya 180°', 200, 282, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dua sudut dalam sepihak. Satu besarnya 115 derajat. Berapa yang lain?',
          clear: true,
          add: [...parallels(65).els, parallels(65).at(parallels(65).P1, 'BR', 'a', '115°', { c: 'pos' }), parallels(65).at(parallels(65).P2, 'TR', 'b', '?')],
          ask: {
            options: [
              { t: '65°', ok: true, why: 'Dalam sepihak berjumlah 180°.' },
              { t: '115°', why: 'Sudut dalam sepihak tidak sama besar. Jumlahnya yang 180°.' },
              { t: '25°', why: 'Jumlahnya 180°, bukan 90° atau 140°: 180° − 115° = 65°.' },
            ],
          },
        },
        { say: 'Dalam sepihak jumlahnya 180. 180 kurang 115 sama dengan 65 derajat.', set: { b: { label: '65°' } }, add: [T('s', '180° − 115° = 65°', 200, 282, { size: 20 })] },
      ],
    },
  ],
  quiz: [
    {
      q: 'Pada gambar, dua garis sejajar dipotong garis transversal. Besar sudut x adalah …',
      fig: [...parallels(65).els, parallels(65).at(parallels(65).P1, 'TR', 'a', '65°'), parallels(65).at(parallels(65).P2, 'TR', 'b', 'x', { c: 'pos' })],
      viewBox: '10 30 380 260',
      figLabel: 'Sudut 65 derajat di persimpangan atas, sudut x pada posisi yang sama di persimpangan bawah',
      options: [
        { t: '65°', ok: true },
        { t: '115°', why: 'Kedua sudut sehadap (posisinya sama), jadi sama besar.' },
        { t: '25°', why: 'Sudut sehadap sama besar, tidak dikurangkan dari 90°.' },
        { t: '130°', why: 'Sudut sehadap sama besar, tidak dikalikan 2.' },
      ],
      steps: ['x dan 65° berada pada posisi yang sama di kedua persimpangan: sehadap.', 'Sudut sehadap sama besar: x = 65°.'],
    },
    {
      type: 'num',
      q: 'Pada gambar, besar sudut x adalah …°',
      fig: [...parallels(70).els, parallels(70).at(parallels(70).P1, 'BL', 'a', '70°'), parallels(70).at(parallels(70).P2, 'TL', 'b', 'x', { c: 'pos' })],
      viewBox: '10 30 380 260',
      figLabel: 'Sudut 70 derajat dan sudut x berada di antara dua garis sejajar, pada sisi yang sama dari garis transversal',
      ans: ['110'],
      wrong: { '70': 'Kedua sudut berada di antara garis sejajar pada sisi yang sama (dalam sepihak). Jumlahnya 180°, bukan sama besar.' },
      steps: ['70° dan x adalah sudut dalam sepihak.', 'x = 180° − 70° = 110°.'],
    },
    {
      q: 'Pada dua garis sejajar yang dipotong garis transversal, pasangan sudut yang jumlahnya 180° adalah …',
      options: [
        { t: 'sudut dalam sepihak', ok: true },
        { t: 'sudut sehadap', why: 'Sudut sehadap sama besar.' },
        { t: 'sudut dalam berseberangan', why: 'Sudut dalam berseberangan sama besar.' },
        { t: 'sudut luar berseberangan', why: 'Sudut luar berseberangan sama besar.' },
      ],
      steps: ['Sehadap, dalam berseberangan, dan luar berseberangan: sama besar.', 'Dalam sepihak (dan luar sepihak): jumlahnya 180°.'],
    },
    {
      q: 'Pada gambar, nilai x adalah …',
      fig: [...parallels(70).els, parallels(70).at(parallels(70).P1, 'TR', 'a', '(2x + 10)°', { lpad: 34 }), parallels(70).at(parallels(70).P2, 'TR', 'b', '(3x − 20)°', { lpad: 34, c: 'pos' })],
      viewBox: '10 30 380 260',
      figLabel: 'Sudut 2x + 10 di persimpangan atas dan 3x − 20 pada posisi yang sama di persimpangan bawah',
      options: [
        { t: '30', ok: true },
        { t: '38', why: 'Kedua sudut sehadap, jadi sama besar. Jangan dijumlahkan menjadi 180°.' },
        { t: '10', why: '2x + 10 = 3x − 20, jadi x = 10 + 20.' },
        { t: '70', why: '70° adalah besar sudutnya. Yang ditanya nilai x.' },
      ],
      steps: ['Sudut sehadap sama besar: 2x + 10 = 3x − 20.', 'x = 30. Cek: 2(30) + 10 = 70 dan 3(30) − 20 = 70.'],
    },
    {
      q: 'Dua garis sejajar dipotong transversal. Sepasang sudut dalam berseberangan besarnya 3x° dan (2x + 40)°. Nilai x adalah …',
      options: [
        { t: '40', ok: true },
        { t: '28', why: 'Sudut dalam berseberangan sama besar, bukan berjumlah 180°.' },
        { t: '120', why: '120° adalah besar sudutnya. Yang ditanya nilai x.' },
        { t: '8', why: '3x = 2x + 40, jadi x = 40.' },
      ],
      steps: ['Dalam berseberangan sama besar: 3x = 2x + 40.', 'x = 40, sudutnya 120°.'],
    },
  ],
};

export default {
  id: 'b6',
  no: 6,
  title: 'Garis dan Sudut',
  desc: 'Jenis dan ukuran sudut, hubungan antarsudut, serta sudut pada garis sejajar.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Besar sudut terkecil antara jarum jam dan jarum menit pada pukul 10.00 adalah …',
      options: [
        { t: '60°', ok: true },
        { t: '300°', why: 'Itu sudut yang besar. Yang ditanya sudut terkecil.' },
        { t: '100°', why: 'Tiap angka jam 30°. Dari 10 ke 12 ada 2 angka: 60°.' },
        { t: '120°', why: 'Dari angka 10 ke 12 hanya 2 angka, jadi 2 × 30° = 60°.' },
      ],
      steps: ['Tiap angka jam: 30°.', 'Dari angka 10 ke 12 ada 2 angka: 60°.'],
    },
    {
      type: 'num',
      q: 'Tiga sudut x°, 2x°, dan 3x° bersama-sama membentuk sudut lurus. Nilai x adalah …',
      ans: ['30'],
      wrong: { '15': 'Sudut lurus 180°, bukan 90°.', '60': 'x + 2x + 3x = 6x = 180, jadi x = 30.' },
      steps: ['x + 2x + 3x = 180.', '6x = 180, x = 30.'],
    },
    {
      q: 'Penyiku sebuah sudut besarnya 3 kali sudut itu. Besar sudut itu adalah …',
      options: [
        { t: '22,5°', ok: true },
        { t: '67,5°', why: 'Itu besar penyikunya (3 × 22,5°).' },
        { t: '45°', why: 'x + 3x = 90, jadi 4x = 90.' },
        { t: '30°', why: 'Cek: penyiku dari 30° adalah 60°, bukan 90°.' },
      ],
      steps: ['Misalkan sudut x, penyikunya 3x.', 'x + 3x = 90, x = 22,5°.'],
    },
  ],
};
