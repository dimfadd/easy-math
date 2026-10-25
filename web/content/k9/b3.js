// Kelas 9 · Bab 3: Transformasi Geometri
import { T, box, ln, dot, textWidth } from '../helpers.js';
import { plane } from '../k8/plot.js';

const tag = (id, text, x, y, c = 'ink', size = 15) => box(id, x, y, textWidth(text, size) + 12, size + 8, { fill: 'paper', stroke: 'none', sw: 0, r: 4, label: text, lsize: size, lc: c, z: 3 });

// Skala sama di kedua sumbu (26,67 px per satuan)
const CF = { x: 40, y: 25, w: 320, h: 240, xmin: -6, xmax: 6, ymin: -4, ymax: 5 };
const PL = plane('pl', CF);
const at = PL.at;
const O = at(0, 0);
const S = PL.X(1) - PL.X(0);

// Segitiga dengan titik asal di (0, 0) bidang, supaya geser, putar, cermin, dan perbesar bisa dianimasikan
const TRI = [[1, 1], [3, 1], [1, 2]];
const tri = (id, o = {}) => ({ id, t: 'poly', x: O[0], y: O[1], pts: TRI.map(([a, b]) => [a * S, -b * S]), fill: 'pos-soft', stroke: 'pos', sw: 2.5, z: 1, ...o });
const ghost = () => tri('g0', { fill: 'none', stroke: 'mut', dash: '5 4', sw: 2, z: 0 });
const vlab = (prefix, pts, names = ['A', 'B', 'C'], c = 'pos', off = [[-10, 10], [10, 10], [-10, -10]]) =>
  pts.map(([a, b], i) => T(`${prefix}${i}`, names[i], at(a, b)[0] + off[i][0], at(a, b)[1] + off[i][1], { size: 14, c }));

// ---------- 3.1 Translasi ----------
const l1 = {
  id: 'k9b3-1',
  title: 'Translasi (Pergeseran)',
  hook: 'Translasi menggeser setiap titik dengan jarak dan arah yang sama. Bentuk dan ukurannya tidak berubah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segitiga ABC digeser 3 satuan ke kanan dan 2 satuan ke atas. Titik A di 1 koma 1 berpindah ke mana?',
          add: [...PL.els, tri('t'), ...vlab('l', TRI)],
          ask: {
            options: [
              { t: '(4, 3)', ok: true, why: 'x bertambah 3, y bertambah 2.' },
              { t: '(3, 2)', why: 'Itu besar pergeserannya. Tambahkan ke koordinat A.' },
              { t: '(3, 4)', why: 'Ke kanan menambah x, ke atas menambah y: (1 + 3, 1 + 2).' },
              { t: '(−2, −1)', why: 'Ke kanan dan ke atas berarti ditambah, bukan dikurangi.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Menggeser',
      steps: [
        {
          say: 'Simpan bayangan aslinya, lalu geser segitiganya. 3 ke kanan.',
          add: [ghost()],
          set: { t: { x: at(3, 0)[0] }, l0: { o: 0 }, l1: { o: 0 }, l2: { o: 0 } },
        },
        {
          say: '2 ke atas.',
          set: { t: { y: at(0, 2)[1] } },
        },
        {
          say: 'Setiap titik berpindah dengan cara yang sama. A ke 4 koma 3, B ke 6 koma 3, C ke 4 koma 4. Hasilnya disebut bayangan, diberi tanda aksen.',
          add: [...vlab('m', [[4, 3], [6, 3], [4, 4]], ["A'", "B'", "C'"], 'acc'), ln('arr', ...at(1, 1), ...at(4, 3), { sw: 2, c: 'acc', arrow: 'end', dash: '4 4' })],
        },
        {
          say: 'Ukuran dan bentuknya tetap sama. Hanya posisinya yang berubah.',
          add: [tag('n', 'bentuk & ukuran tetap', 110, 40, 'ok')],
        },
      ],
    },
    {
      title: 'Aturannya',
      steps: [
        {
          say: 'Translasi ditulis T dengan dua angka: a untuk mendatar, b untuk tegak. Titik x koma y berpindah ke x tambah a, koma y tambah b.',
          clear: true,
          add: [box('rb', 200, 70, 320, 54, { fill: 'acc-soft', r: 10, label: 'T(a, b): (x, y) → (x + a, y + b)', lsize: 19 })],
        },
        {
          say: 'a positif ke kanan, negatif ke kiri. b positif ke atas, negatif ke bawah.',
          add: [T('a', 'a > 0 → kanan,  a < 0 → kiri', 200, 140, { size: 18 }), T('b', 'b > 0 → atas,  b < 0 → bawah', 200, 175, { size: 18 })],
        },
        {
          say: 'Contoh: titik 2 koma 5 ditranslasi minus 4 koma 1 menjadi minus 2 koma 6.',
          add: [T('c', '(2, 5) → (2 − 4, 5 + 1) = {a:(−2, 6)}', 200, 235, { size: 20 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik P minus 2 koma 5 ditranslasi 4 koma minus 3. Bayangannya di mana?',
          clear: true,
          add: [T('q', 'P(−2, 5) oleh T(4, −3)', 200, 120, { size: 30 })],
          ask: {
            options: [
              { t: "P'(2, 2)", ok: true, why: '−2 + 4 = 2 dan 5 + (−3) = 2.' },
              { t: "P'(−6, 8)", why: 'Itu kalau dikurangi. Translasi menambahkan.' },
              { t: "P'(2, 8)", why: '5 + (−3) = 2, bukan 8.' },
              { t: "P'(4, −3)", why: 'Itu besar pergeserannya saja.' },
            ],
          },
        },
        {
          say: 'Minus 2 tambah 4 sama dengan 2. 5 tambah minus 3 sama dengan 2. Bayangannya 2 koma 2.',
          clear: true,
          add: [...PL.els, dot('P', ...at(-2, 5), 'pos'), dot('P2', ...at(2, 2), 'acc'), ln('arr', ...at(-2, 5), ...at(2, 2), { sw: 2.5, c: 'acc', arrow: 'end' }), T('lp', 'P', at(-2, 5)[0] - 12, at(-2, 5)[1] + 4, { size: 14, c: 'pos' }), T('lp2', "P'(2, 2)", at(2, 2)[0] + 30, at(2, 2)[1] + 4, { size: 14, c: 'acc' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Titik A(3, −1) ditranslasi T(−5, 4). Bayangannya adalah …',
      options: [
        { t: "A'(−2, 3)", ok: true },
        { t: "A'(8, −5)", why: 'Ditambah, bukan dikurangi: 3 + (−5) = −2.' },
        { t: "A'(−2, −5)", why: '−1 + 4 = 3.' },
        { t: "A'(−15, −4)", why: 'Translasi menjumlahkan, bukan mengalikan.' },
      ],
      steps: ['x: 3 + (−5) = −2.', 'y: −1 + 4 = 3.'],
    },
    {
      q: 'Titik B digeser 2 ke kiri dan 6 ke bawah. Translasinya adalah …',
      options: [
        { t: 'T(−2, −6)', ok: true },
        { t: 'T(2, 6)', why: 'Kiri dan bawah bernilai negatif.' },
        { t: 'T(−6, −2)', why: 'Angka pertama mendatar (−2), kedua tegak (−6).' },
        { t: 'T(2, −6)', why: 'Ke kiri berarti negatif.' },
      ],
      steps: ['Kiri 2 → a = −2.', 'Bawah 6 → b = −6.'],
    },
    {
      q: "Titik P(1, 2) ditranslasi menjadi P'(4, −1). Translasinya adalah …",
      options: [
        { t: 'T(3, −3)', ok: true },
        { t: 'T(5, 1)', why: 'Itu jumlah koordinatnya. Translasi = selisih: bayangan − asal.' },
        { t: 'T(−3, 3)', why: 'Asal − bayangan terbalik. Hitung 4 − 1 dan −1 − 2.' },
        { t: 'T(4, −1)', why: 'Itu koordinat bayangannya.' },
      ],
      steps: ['a = 4 − 1 = 3.', 'b = −1 − 2 = −3.'],
    },
    {
      q: 'Pernyataan yang benar tentang translasi adalah …',
      options: [
        { t: 'bentuk dan ukuran bangun tetap', ok: true },
        { t: 'ukuran bangun menjadi dua kali', why: 'Itu dilatasi.' },
        { t: 'bangun menjadi terbalik', why: 'Itu refleksi.' },
        { t: 'bangun berputar', why: 'Itu rotasi.' },
      ],
      steps: ['Translasi hanya menggeser posisi.'],
    },
    {
      type: 'num',
      q: "Titik (k, 3) ditranslasi T(2, −1) menjadi (7, 2). Nilai k adalah …",
      ans: ['5'],
      wrong: { '9': 'k + 2 = 7 → k = 5.', '7': '7 adalah koordinat bayangan.' },
      steps: ['k + 2 = 7.', 'k = 5.'],
    },
  ],
};

// ---------- 3.2 Refleksi ----------
const l2 = {
  id: 'k9b3-2',
  title: 'Refleksi (Pencerminan)',
  hook: 'Refleksi seperti bercermin: bayangan sama jauhnya dari cermin, tapi posisinya terbalik.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segitiga dicerminkan terhadap sumbu x. Titik A di 1 koma 1 berpindah ke mana?',
          add: [...PL.els, tri('t'), ...vlab('l', TRI), ln('mir', ...at(-6, 0), ...at(6, 0), { sw: 3, c: 'acc', draw: false, z: -1 })],
          ask: {
            options: [
              { t: '(1, −1)', ok: true, why: 'Sumbu x seperti cermin mendatar: y berganti tanda.' },
              { t: '(−1, 1)', why: 'Itu pencerminan terhadap sumbu y.' },
              { t: '(−1, −1)', why: 'Hanya y yang berganti tanda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Cermin sumbu x',
      steps: [
        {
          say: 'Sumbu x menjadi cermin. Segitiga dibalik ke bawah.',
          add: [ghost()],
          set: { t: { sy: -1, fill: 'acc-soft', stroke: 'acc' }, l0: { o: 0 }, l1: { o: 0 }, l2: { o: 0 } },
        },
        {
          say: 'Jarak setiap titik ke cermin tetap sama. A berjarak 1 di atas, bayangannya 1 di bawah. Jadi x tetap, y berganti tanda.',
          add: [...vlab('m', [[1, -1], [3, -1], [1, -2]], ["A'", "B'", "C'"], 'acc', [[-10, -10], [10, -10], [-10, 10]]), tag('r', '(x, y) → (x, −y)', 290, 40, 'acc', 17)],
        },
      ],
    },
    {
      title: 'Cermin sumbu y',
      steps: [
        {
          say: 'Sekarang cerminnya sumbu y. Segitiga dibalik ke kiri.',
          clear: true,
          add: [...PL.els, ln('mir', ...at(0, -4), ...at(0, 5), { sw: 3, c: 'acc', draw: false, z: -1 }), ghost(), tri('t')],
        },
        {
          say: 'Balik.',
          set: { t: { sx: -1, fill: 'acc-soft', stroke: 'acc' } },
        },
        {
          say: 'Sekarang y tetap, x berganti tanda. A ke minus 1 koma 1.',
          add: [...vlab('m', [[-1, 1], [-3, 1], [-1, 2]], ["A'", "B'", "C'"], 'acc', [[10, 10], [-10, 10], [10, -10]]), tag('r', '(x, y) → (−x, y)', 290, 40, 'acc', 17)],
        },
      ],
    },
    {
      title: 'Cermin garis y = x',
      steps: [
        {
          say: 'Cermin juga bisa berupa garis miring y sama dengan x. Pada pencerminan ini, x dan y bertukar tempat.',
          clear: true,
          add: [...PL.els, ln('mir', ...at(-4, -4), ...at(5, 5), { sw: 3, c: 'acc', draw: false, z: -1 }), tri('t', { stroke: 'pos' }), tag('lm', 'y = x', 330, 45, 'acc', 15)],
        },
        {
          say: 'A 1 koma 1 tetap, karena ada di cermin. B 3 koma 1 menjadi 1 koma 3. C 1 koma 2 menjadi 2 koma 1.',
          add: [{ id: 'r2', t: 'poly', x: 0, y: 0, pts: [at(1, 1), at(1, 3), at(2, 1)], fill: 'acc-soft', stroke: 'acc', sw: 2.5 }, tag('r', '(x, y) → (y, x)', 120, 40, 'acc', 17)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik Q 4 koma minus 3 dicerminkan terhadap sumbu y. Bayangannya di mana?',
          clear: true,
          add: [T('q', 'Q(4, −3) dicerminkan\nterhadap sumbu y', 200, 120, { size: 24, lh: 1.3 })],
          ask: {
            options: [
              { t: "Q'(−4, −3)", ok: true, why: 'Terhadap sumbu y: x berganti tanda.' },
              { t: "Q'(4, 3)", why: 'Itu terhadap sumbu x.' },
              { t: "Q'(−3, 4)", why: 'Tidak ada pertukaran. Hanya x yang berganti tanda.' },
              { t: "Q'(−4, 3)", why: 'y tetap −3.' },
            ],
          },
        },
        {
          say: 'Cermin sumbu y: x berganti tanda, y tetap. Q aksen di minus 4 koma minus 3.',
          clear: true,
          add: [...PL.els, ln('mir', ...at(0, -4), ...at(0, 5), { sw: 3, c: 'acc', draw: false, z: -1 }), dot('Q', ...at(4, -3), 'pos'), dot('Q2', ...at(-4, -3), 'acc'), ln('dd', ...at(4, -3), ...at(-4, -3), { sw: 1.5, dash: '4 4', c: 'mut' }), T('lq', 'Q', at(4, -3)[0] + 12, at(4, -3)[1] - 10, { size: 14, c: 'pos' }), T('lq2', "Q'", at(-4, -3)[0] - 12, at(-4, -3)[1] - 10, { size: 14, c: 'acc' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bayangan titik (5, 2) oleh refleksi terhadap sumbu x adalah …',
      options: [
        { t: '(5, −2)', ok: true },
        { t: '(−5, 2)', why: 'Itu terhadap sumbu y.' },
        { t: '(2, 5)', why: 'Itu terhadap garis y = x.' },
        { t: '(−5, −2)', why: 'Hanya y yang berganti tanda.' },
      ],
      steps: ['Sumbu x: (x, y) → (x, −y).', '(5, 2) → (5, −2).'],
    },
    {
      q: 'Bayangan titik (−3, 7) oleh refleksi terhadap garis y = x adalah …',
      options: [
        { t: '(7, −3)', ok: true },
        { t: '(3, 7)', why: 'Garis y = x menukar x dan y.' },
        { t: '(−7, 3)', why: 'Tukar tanpa mengubah tanda.' },
        { t: '(−3, −7)', why: 'Itu terhadap sumbu x.' },
      ],
      steps: ['y = x: (x, y) → (y, x).', '(−3, 7) → (7, −3).'],
    },
    {
      q: 'Titik P dicerminkan terhadap sumbu y dan bayangannya (6, −1). Koordinat P adalah …',
      options: [
        { t: '(−6, −1)', ok: true },
        { t: '(6, 1)', why: 'Sumbu y mengubah tanda x, bukan y.' },
        { t: '(−1, 6)', why: 'Tidak ada pertukaran.' },
        { t: '(6, −1)', why: 'Itu bayangannya.' },
      ],
      steps: ['Balik lagi terhadap sumbu y: x berganti tanda.', 'P = (−6, −1).'],
    },
    {
      q: 'Sifat refleksi yang benar adalah …',
      options: [
        { t: 'jarak titik ke cermin sama dengan jarak bayangan ke cermin', ok: true },
        { t: 'bayangan selalu lebih besar', why: 'Ukuran tetap sama.' },
        { t: 'bayangan selalu di kuadran yang sama', why: 'Bayangan biasanya pindah ke sisi seberang cermin.' },
        { t: 'semua titik tidak berubah', why: 'Hanya titik yang tepat di cermin yang tetap.' },
      ],
      steps: ['Cermin: jarak sama, arah berlawanan.'],
    },
    {
      q: 'Bayangan titik (4, 1) oleh refleksi terhadap garis x = 2 adalah …',
      options: [
        { t: '(0, 1)', ok: true },
        { t: '(−4, 1)', why: 'Cerminnya garis x = 2, bukan sumbu y.' },
        { t: '(4, 3)', why: 'Cermin tegak mengubah x, bukan y.' },
        { t: '(2, 1)', why: 'Titik berjarak 2 dari cermin, bayangannya juga 2 di sisi lain.' },
      ],
      steps: ['Jarak x = 4 ke cermin x = 2: 2 satuan.', 'Bayangan 2 satuan di kiri cermin: x = 0. Jadi (0, 1).'],
    },
  ],
};

// ---------- 3.3 Rotasi ----------
const l3 = {
  id: 'k9b3-3',
  title: 'Rotasi (Perputaran)',
  hook: 'Rotasi memutar bangun mengelilingi satu titik pusat. Yang perlu diketahui: pusat, besar sudut, dan arahnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segitiga diputar 90 derajat berlawanan arah jarum jam, dengan pusat 0 koma 0. Titik B di 3 koma 1 berpindah ke mana?',
          add: [...PL.els, tri('t'), ...vlab('l', TRI), dot('o', ...O, 'ink', { r: 5 })],
          ask: {
            options: [
              { t: '(−1, 3)', ok: true, why: 'Rotasi 90° berlawanan jarum jam: (x, y) → (−y, x).' },
              { t: '(1, −3)', why: 'Itu 90° searah jarum jam.' },
              { t: '(−3, −1)', why: 'Itu rotasi 180°.' },
              { t: '(1, 3)', why: 'Tanda x harus negatif setelah berputar ke kiri atas.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Memutar 90 derajat',
      steps: [
        {
          say: 'Putar perlahan, berlawanan arah jarum jam, mengelilingi titik pusat.',
          add: [ghost()],
          set: { t: { rot: -90, fill: 'acc-soft', stroke: 'acc' }, l0: { o: 0 }, l1: { o: 0 }, l2: { o: 0 } },
        },
        {
          say: 'B 3 koma 1 sampai di minus 1 koma 3. Jarak ke pusat tetap sama. Aturannya: x koma y menjadi minus y koma x.',
          add: [...vlab('m', [[-1, 1], [-1, 3], [-2, 1]], ["A'", "B'", "C'"], 'acc', [[10, 10], [-12, 0], [-10, 10]]), tag('r', '90° berlawanan: (x, y) → (−y, x)', 250, 40, 'acc', 14)],
        },
      ],
    },
    {
      title: 'Memutar 180 derajat',
      steps: [
        {
          say: 'Putar lagi 90 derajat, totalnya 180 derajat.',
          set: { t: { rot: -180 } },
          del: ['m0', 'm1', 'm2', 'r'],
        },
        {
          say: 'Setengah putaran membalik kedua tanda: x koma y menjadi minus x koma minus y. A ke minus 1 koma minus 1.',
          add: [...vlab('n', [[-1, -1], [-3, -1], [-1, -2]], ["A'", "B'", "C'"], 'acc', [[-16, 6], [-10, -10], [-16, 6]]), tag('r2', '180°: (x, y) → (−x, −y)', 250, 40, 'acc', 14)],
        },
      ],
    },
    {
      title: 'Arah putaran',
      steps: [
        {
          say: 'Dalam matematika, sudut positif berarti berlawanan arah jarum jam. Sudut negatif searah jarum jam.',
          clear: true,
          add: [box('k1', 105, 120, 180, 120, { fill: 'pos-soft', r: 12, label: '+90°\nberlawanan jarum jam\n(x, y) → (−y, x)', lsize: 14 }), box('k2', 295, 120, 180, 120, { fill: 'neg-soft', r: 12, label: '−90°\nsearah jarum jam\n(x, y) → (y, −x)', lsize: 14 })],
        },
        {
          say: 'Rotasi 180 derajat hasilnya sama ke arah mana pun.',
          add: [box('k3', 200, 235, 280, 44, { fill: 'acc-soft', r: 10, label: '180°: (x, y) → (−x, −y)', lsize: 17 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik R 2 koma 5 diputar 90 derajat searah jarum jam dengan pusat 0 koma 0. Bayangannya di mana?',
          clear: true,
          add: [T('q', 'R(2, 5) diputar −90° (searah jarum jam)', 200, 120, { size: 21 })],
          ask: {
            options: [
              { t: "R'(5, −2)", ok: true, why: 'Searah jarum jam: (x, y) → (y, −x).' },
              { t: "R'(−5, 2)", why: 'Itu berlawanan jarum jam.' },
              { t: "R'(−2, −5)", why: 'Itu rotasi 180°.' },
              { t: "R'(5, 2)", why: 'x yang baru = y lama = 5, y baru = −x lama = −2.' },
            ],
          },
        },
        {
          say: 'Searah jarum jam 90 derajat: x koma y menjadi y koma minus x. R aksen di 5 koma minus 2.',
          clear: true,
          add: [...PL.els, dot('o', ...O, 'ink', { r: 5 }), dot('R', ...at(2, 5), 'pos'), dot('R2', ...at(5, -2), 'acc'), ln('o1', ...O, ...at(2, 5), { sw: 1.5, dash: '4 4', c: 'mut' }), ln('o2', ...O, ...at(5, -2), { sw: 1.5, dash: '4 4', c: 'mut' }), T('lr', 'R', at(2, 5)[0] + 12, at(2, 5)[1] + 4, { size: 14, c: 'pos' }), T('lr2', "R'", at(5, -2)[0] + 14, at(5, -2)[1] + 4, { size: 14, c: 'acc' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bayangan titik (4, 3) oleh rotasi 90° berlawanan arah jarum jam dengan pusat O adalah …',
      options: [
        { t: '(−3, 4)', ok: true },
        { t: '(3, −4)', why: 'Itu searah jarum jam.' },
        { t: '(−4, −3)', why: 'Itu rotasi 180°.' },
        { t: '(4, −3)', why: 'Itu pencerminan terhadap sumbu x.' },
      ],
      steps: ['+90°: (x, y) → (−y, x).', '(4, 3) → (−3, 4).'],
    },
    {
      q: 'Bayangan titik (−2, 6) oleh rotasi 180° dengan pusat O adalah …',
      options: [
        { t: '(2, −6)', ok: true },
        { t: '(6, 2)', why: '180° membalik kedua tanda tanpa menukar.' },
        { t: '(−6, −2)', why: 'Tidak ada pertukaran pada 180°.' },
        { t: '(2, 6)', why: 'y juga berganti tanda.' },
      ],
      steps: ['180°: (x, y) → (−x, −y).', '(−2, 6) → (2, −6).'],
    },
    {
      q: 'Rotasi 270° berlawanan arah jarum jam sama dengan rotasi …',
      options: [
        { t: '90° searah jarum jam', ok: true },
        { t: '90° berlawanan jarum jam', why: '270° ke kiri = 90° ke kanan (360° − 270°).' },
        { t: '180°', why: '270° bukan setengah putaran.' },
        { t: '270° searah jarum jam', why: 'Itu sama dengan 90° berlawanan.' },
      ],
      steps: ['Satu putaran penuh 360°.', '270° ke kiri = 360° − 90° → sama dengan 90° ke kanan.'],
    },
    {
      q: 'Pada rotasi, yang selalu tetap adalah …',
      options: [
        { t: 'jarak setiap titik ke pusat rotasi', ok: true },
        { t: 'koordinat setiap titik', why: 'Koordinatnya berubah, kecuali pusatnya.' },
        { t: 'arah bangun', why: 'Arah bangun berubah karena diputar.' },
        { t: 'kuadran bangun', why: 'Bangun bisa pindah kuadran.' },
      ],
      steps: ['Setiap titik bergerak melingkar mengelilingi pusat.', 'Jaraknya ke pusat tetap.'],
    },
    {
      q: "Titik P diputar 90° berlawanan arah jarum jam dengan pusat O, bayangannya P'(−5, 1). Koordinat P adalah …",
      options: [
        { t: '(1, 5)', ok: true },
        { t: '(5, −1)', why: 'Cek: (5, −1) diputar +90° → (1, 5), bukan (−5, 1).' },
        { t: '(−1, −5)', why: 'Cek: (−1, −5) → (5, −1).' },
        { t: '(−5, 1)', why: 'Itu bayangannya.' },
      ],
      steps: ['(x, y) → (−y, x) = (−5, 1).', '−y = −5 → y = 5; x = 1. P = (1, 5).'],
    },
  ],
};

// ---------- 3.4 Dilatasi ----------
const l4 = {
  id: 'k9b3-4',
  title: 'Dilatasi (Perbesaran)',
  hook: 'Dilatasi memperbesar atau memperkecil bangun dari satu titik pusat. Bentuknya tetap, ukurannya berubah.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Segitiga diperbesar 2 kali dengan pusat 0 koma 0. Titik B di 3 koma 1 berpindah ke mana?',
          add: [...PL.els, tri('t'), ...vlab('l', TRI), dot('o', ...O, 'ink', { r: 5 })],
          ask: {
            options: [
              { t: '(6, 2)', ok: true, why: 'Dilatasi faktor 2: kedua koordinat dikali 2.' },
              { t: '(5, 3)', why: 'Itu ditambah 2. Dilatasi mengalikan.' },
              { t: '(6, 1)', why: 'y juga dikali 2.' },
              { t: '(1,5; 0,5)', why: 'Itu diperkecil (dibagi 2).' },
            ],
          },
        },
      ],
    },
    {
      title: 'Memperbesar',
      steps: [
        {
          say: 'Perbesar 2 kali dari titik pusat.',
          add: [ghost()],
          set: { t: { s: 2, fill: 'acc-soft', stroke: 'acc', sw: 1.25 }, l0: { o: 0 }, l1: { o: 0 }, l2: { o: 0 } },
        },
        {
          say: 'Setiap titik menjauh dari pusat 2 kali lipat. A ke 2 koma 2, B ke 6 koma 2, C ke 2 koma 4.',
          add: [...vlab('m', [[2, 2], [6, 2], [2, 4]], ["A'", "B'", "C'"], 'acc', [[-12, 10], [-6, 14], [-12, -8]]), ln('r1', ...O, ...at(6, 2), { sw: 1.5, dash: '4 4', c: 'mut', z: -1 }), ln('r2', ...O, ...at(2, 4), { sw: 1.5, dash: '4 4', c: 'mut', z: -1 })],
        },
        {
          say: 'Panjang setiap sisi menjadi 2 kali, tapi bentuk dan sudutnya sama. Aturannya: x koma y menjadi k x koma k y.',
          add: [tag('r', 'faktor k: (x, y) → (kx, ky)', 140, 40, 'acc', 15)],
        },
      ],
    },
    {
      title: 'Memperkecil dan faktor negatif',
      steps: [
        {
          say: 'Kalau faktornya antara 0 dan 1, bangunnya mengecil. Faktor setengah membuat setiap sisi menjadi setengahnya.',
          clear: true,
          add: [...PL.els, dot('o', ...O, 'ink', { r: 5 }), tri('g0', { fill: 'none', stroke: 'mut', dash: '5 4', sw: 2, z: 0 }), tri('t'), tag('r', 'k = ½: mengecil', 120, 40, 'acc', 15)],
        },
        {
          say: 'Mengecil.',
          set: { t: { s: 0.5, fill: 'acc-soft', stroke: 'acc', sw: 5 } },
        },
        {
          say: 'Kalau faktornya negatif, bayangannya pindah ke seberang pusat dan terbalik. Faktor minus 2: B 3 koma 1 ke minus 6 koma minus 2.',
          set: { t: { s: -2, fill: 'neg-soft', stroke: 'neg', sw: 1.25 }, r: tag('r', 'k = −2: ke seberang pusat', 130, 40, 'neg', 15) },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Titik M 4 koma minus 6 didilatasi dengan faktor setengah dan pusat 0 koma 0. Bayangannya di mana?',
          clear: true,
          add: [T('q', 'M(4, −6), faktor ½, pusat O', 200, 120, { size: 26 })],
          ask: {
            options: [
              { t: "M'(2, −3)", ok: true, why: '4 × ½ = 2, −6 × ½ = −3.' },
              { t: "M'(8, −12)", why: 'Itu faktor 2. Faktor ½ berarti dibagi 2.' },
              { t: "M'(4,5; −5,5)", why: 'Dilatasi mengalikan, bukan menambah ½.' },
              { t: "M'(−2, 3)", why: 'Faktornya positif, jadi tanda tidak berubah.' },
            ],
          },
        },
        {
          say: 'Kalikan kedua koordinat dengan setengah: 2 dan minus 3.',
          clear: true,
          add: [T('a', '(4, −6) × ½ = {a:(2, −3)}', 200, 110, { size: 30 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bayangan titik (3, −2) oleh dilatasi faktor 3 dengan pusat O adalah …',
      options: [
        { t: '(9, −6)', ok: true },
        { t: '(6, 1)', why: 'Dilatasi mengalikan, bukan menambah 3.' },
        { t: '(1, −⅔)', why: 'Itu dibagi 3.' },
        { t: '(9, 6)', why: '−2 × 3 = −6.' },
      ],
      steps: ['(x, y) → (3x, 3y).', '(3, −2) → (9, −6).'],
    },
    {
      q: 'Sebuah persegi bersisi 4 cm didilatasi dengan faktor 2,5. Panjang sisi bayangannya adalah …',
      options: [
        { t: '10 cm', ok: true },
        { t: '6,5 cm', why: 'Dikali, bukan ditambah: 4 × 2,5.' },
        { t: '1,6 cm', why: 'Itu dibagi 2,5. Faktor > 1 memperbesar.' },
        { t: '40 cm', why: '4 × 2,5 = 10.' },
      ],
      steps: ['Sisi bayangan = k × sisi asal.', '4 × 2,5 = 10 cm.'],
    },
    {
      q: 'Dilatasi dengan faktor k = −1 dan pusat O sama dengan …',
      options: [
        { t: 'rotasi 180° dengan pusat O', ok: true },
        { t: 'refleksi terhadap sumbu x', why: 'Faktor −1 mengubah tanda x dan y sekaligus.' },
        { t: 'translasi', why: 'Translasi tidak mengubah arah bangun.' },
        { t: 'tidak berubah', why: '(x, y) → (−x, −y), jadi berubah.' },
      ],
      steps: ['k = −1: (x, y) → (−x, −y).', 'Sama dengan rotasi 180°.'],
    },
    {
      type: 'num',
      q: "Titik P(6, 9) didilatasi dengan pusat O menjadi P'(4, 6). Faktor dilatasinya adalah … (boleh pecahan)",
      ans: ['2/3'],
      wrong: { '1.5': 'Itu kebalikannya. k = 4 ÷ 6.', '-2': 'Faktor = bayangan ÷ asal, bukan selisih.' },
      steps: ['k = 4 ÷ 6 = 2/3.', 'Cek: 9 × 2/3 = 6 ✓.'],
    },
    {
      type: 'num',
      q: 'Segitiga dengan luas 5 cm² didilatasi dengan faktor 3. Luas bayangannya adalah … cm²',
      ans: ['45'],
      wrong: { '15': 'Panjang dan tinggi sama-sama dikali 3, jadi luas dikali 3 × 3 = 9.', '8': 'Dilatasi mengalikan.' },
      steps: ['Alas dan tinggi masing-masing × 3.', 'Luas × 9: 5 × 9 = 45 cm².'],
    },
  ],
};

export default {
  id: 'k9b3',
  no: 3,
  title: 'Transformasi Geometri',
  desc: 'Translasi, refleksi, rotasi, dan dilatasi pada bidang koordinat.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: 'Titik A(2, 3) dicerminkan terhadap sumbu x, lalu ditranslasi T(1, 4). Bayangan akhirnya adalah …',
      options: [
        { t: '(3, 1)', ok: true },
        { t: '(3, 7)', why: 'Cermin sumbu x dulu: (2, −3), lalu + (1, 4).' },
        { t: '(−1, 1)', why: 'Sumbu x mengubah tanda y, bukan x.' },
        { t: '(3, −7)', why: '(2, −3) + (1, 4) = (3, 1).' },
      ],
      steps: ['Sumbu x: (2, 3) → (2, −3).', 'T(1, 4): (3, 1).'],
    },
    {
      q: 'Transformasi yang mengubah ukuran bangun adalah …',
      options: [
        { t: 'dilatasi', ok: true },
        { t: 'translasi', why: 'Translasi hanya menggeser.' },
        { t: 'refleksi', why: 'Refleksi membalik, ukurannya tetap.' },
        { t: 'rotasi', why: 'Rotasi memutar, ukurannya tetap.' },
      ],
      steps: ['Translasi, refleksi, rotasi: ukuran tetap.', 'Dilatasi: ukuran berubah.'],
    },
    {
      q: 'Titik B(−1, 4) diputar 90° berlawanan arah jarum jam dengan pusat O, lalu dicerminkan terhadap sumbu y. Bayangan akhirnya adalah …',
      options: [
        { t: '(4, −1)', ok: true },
        { t: '(−4, −1)', why: 'Setelah rotasi (−4, −1), cermin sumbu y mengubah tanda x: (4, −1).' },
        { t: '(1, 4)', why: 'Kerjakan rotasi dulu: (−y, x) = (−4, −1).' },
        { t: '(4, 1)', why: 'y tetap −1 saat dicerminkan terhadap sumbu y.' },
      ],
      steps: ['Rotasi +90°: (−1, 4) → (−4, −1).', 'Cermin sumbu y: (4, −1).'],
    },
  ],
};
