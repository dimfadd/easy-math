// Kelas 12 Tingkat Lanjut · Bab 5: Analisis Data dan Peluang (distribusi peluang)
import { T, box, ln } from '../helpers.js';
import { plane } from '../k8/plot.js';
import { tag, curve } from '../k10/kit.js';

const RX = 335;
const R = (id, text, y, c = 'ink', size = 14) => T(id, text, RX, y, { size, c });
const fmt = (v, d = 2) => String(+v.toFixed(d)).replace('.', ',');

// Diagram batang peluang buatan sendiri (label angka memakai koma desimal)
// data: [{ l, v, txt?, c? }], alas di y0, tinggi maksimum H untuk nilai vmax
function pbars(prefix, data, x0, y0, W, H, vmax, o = {}) {
  const gap = W / data.length;
  const bw = gap * (o.bw ?? 0.62);
  const els = [ln(`${prefix}ax`, x0 - 6, y0, x0 + W + 4, y0, { sw: 2, c: 'ink', draw: false })];
  data.forEach((d, i) => {
    const cx = x0 + gap * (i + 0.5);
    const h = Math.max(1, (d.v / vmax) * H);
    els.push(box(`${prefix}${i}`, cx, y0 - h / 2, bw, h, { fill: d.c ?? o.c ?? 'pos-soft', stroke: d.s ?? o.s ?? 'pos', sw: 2, r: 2 }));
    els.push(T(`${prefix}l${i}`, String(d.l), cx, y0 + 14, { size: o.lsize ?? 14 }));
    if (d.txt !== '') els.push(T(`${prefix}v${i}`, d.txt ?? fmt(d.v), cx, y0 - h - 12, { size: o.vsize ?? 13, c: o.vc ?? 'ink' }));
  });
  return els;
}
const C = (n, k) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
const binom = (n, p) => Array.from({ length: n + 1 }, (_, k) => C(n, k) * p ** k * (1 - p) ** (n - k));

// ---------- 5.1 Variabel acak ----------
const OUT = [['AA', 2], ['AG', 1], ['GA', 1], ['GG', 0]];

const l1 = {
  id: 'k12lb5-1',
  title: 'Variabel Acak dan Distribusinya',
  hook: 'Variabel acak mengubah setiap hasil percobaan menjadi bilangan. Daftar nilai beserta peluangnya disebut distribusi peluang.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua koin dilempar bersamaan. X adalah banyak sisi angka yang muncul. Berapa peluang X sama dengan 1?',
          add: [T('a', '2 koin, X = banyak angka', 200, 80, { size: 24, c: 'pos' }), T('q', 'P(X = 1) = ?', 200, 140, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '1/2', ok: true, why: 'Hasilnya AA, AG, GA, GG. Tepat satu angka ada pada AG dan GA: 2 dari 4.' },
              { t: '1/3', why: 'X bisa 0, 1, atau 2, tetapi peluangnya tidak sama. X = 1 punya dua hasil: AG dan GA.' },
              { t: '1/4', why: 'AG dan GA sama-sama memberi satu angka, jadi ada 2 hasil.' },
              { t: '3/4', why: '3/4 adalah peluang paling sedikit satu angka.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Hasil menjadi bilangan',
      steps: [
        {
          say: 'Ada empat hasil yang sama mungkin: angka-angka, angka-gambar, gambar-angka, dan gambar-gambar.',
          clear: true,
          add: OUT.map(([s], i) => box(`o${i}`, 80, 50 + i * 55, 70, 40, { r: 8, fill: 'paper', sw: 2, label: s, lsize: 18 })),
        },
        {
          say: 'Variabel acak X memberi setiap hasil sebuah bilangan: banyak angkanya. AA menjadi 2, AG dan GA menjadi 1, GG menjadi 0.',
          add: [...OUT.map(([, v], i) => ln(`ar${i}`, 120, 50 + i * 55, 215, 50 + (2 - v) * 70 + 40, { sw: 2, c: 'mut', arrow: 'end' })), ...[2, 1, 0].map((v, i) => box(`x${v}`, 240, 90 + i * 70, 44, 40, { r: 8, fill: 'acc-soft', stroke: 'acc', sw: 2, label: String(v), lsize: 20 })), T('xl', 'X', 240, 50, { size: 18, c: 'acc' })],
        },
        {
          say: 'Peluangnya: X sama dengan 2 hanya dari AA, jadi seperempat. X sama dengan 1 dari dua hasil, jadi setengah. X sama dengan 0, seperempat.',
          add: [T('p2', 'P = 1/4', 335, 90, { size: 18 }), T('p1', 'P = 2/4 = 1/2', 335, 160, { size: 18 }), T('p0', 'P = 1/4', 335, 230, { size: 18 })],
        },
      ],
    },
    {
      title: 'Distribusi peluang',
      steps: [
        {
          say: 'Daftar semua nilai X beserta peluangnya disebut distribusi peluang. Bisa digambar sebagai diagram batang.',
          clear: true,
          add: [...pbars('b', [{ l: 0, v: 0.25, txt: '1/4' }, { l: 1, v: 0.5, txt: '1/2' }, { l: 2, v: 0.25, txt: '1/4' }], 40, 250, 220, 170, 0.5), T('bx', 'X', 275, 264, { size: 14, c: 'mut' })],
        },
        {
          say: 'Jumlah semua peluang selalu 1. Seperempat tambah setengah tambah seperempat sama dengan 1.',
          add: [R('a', 'jumlah semua P = 1', 80, 'ok', 14), R('a2', '1/4 + 1/2 + 1/4 = 1', 105)],
        },
      ],
    },
    {
      title: 'Nilai harapan',
      steps: [
        {
          say: 'Nilai harapan E X adalah rata-rata X kalau percobaan diulang sangat banyak kali. Caranya: kalikan setiap nilai dengan peluangnya, lalu jumlahkan.',
          clear: true,
          add: [T('f', 'E(X) = Σ x · P(X = x)', 200, 60, { size: 26, c: 'pos' })],
        },
        {
          say: '0 kali seperempat, tambah 1 kali setengah, tambah 2 kali seperempat. Hasilnya 0 tambah setengah tambah setengah, yaitu 1.',
          add: [T('a', '0 · 1/4 + 1 · 1/2 + 2 · 1/4', 200, 120, { size: 22 }), T('b', '= 0 + 1/2 + 1/2 = {g:1}', 200, 160, { size: 24 })],
        },
        {
          say: 'Artinya, kalau dua koin dilempar berkali-kali, rata-rata banyak angkanya 1 per lemparan.',
          add: [T('c', 'rata-rata 1 angka per lemparan', 200, 220, { size: 17, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Distribusi peluang X: P X sama dengan 0 adalah 0,2, P X sama dengan 1 adalah 0,5, dan P X sama dengan 2 adalah k. Berapa k?',
          clear: true,
          add: [T('a', 'P(X = 0) = 0,2', 200, 60, { size: 22 }), T('b', 'P(X = 1) = 0,5', 200, 95, { size: 22 }), T('c', 'P(X = 2) = k', 200, 130, { size: 22, c: 'acc' }), T('q', 'k = ?', 200, 180, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '0,3', ok: true, why: 'Jumlah semua peluang 1: 0,2 + 0,5 + k = 1 → k = 0,3.' },
              { t: '0,7', why: '0,7 adalah jumlah dua peluang yang diketahui. k = 1 − 0,7.' },
              { t: '1', why: 'Peluang total yang 1, bukan k sendiri.' },
              { t: '0,5', why: '0,2 + 0,5 + 0,5 = 1,2, lebih dari 1.' },
            ],
          },
        },
        {
          say: 'Jumlah semua peluang harus 1. 0,2 tambah 0,5 sama dengan 0,7, jadi k sama dengan 0,3.',
          add: [T('a2', '0,2 + 0,5 + k = 1 → k = {g:0,3}', 200, 240, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Tiga koin dilempar. X = banyak sisi angka. Nilai P(X = 3) adalah …',
      ans: ['1/8'],
      wrong: { '1/3': 'Ada 8 hasil yang sama mungkin, hanya AAA yang memberi X = 3.', '3/8': 'Itu P(X = 1) atau P(X = 2).' },
      steps: ['Banyak hasil 2³ = 8.', 'Hanya AAA → 1/8.'],
    },
    {
      type: 'num',
      q: 'Distribusi peluang X: P(X = 0) = 0,1; P(X = 1) = 0,4; P(X = 2) = k; P(X = 3) = 0,2. Nilai k adalah …',
      ans: ['0.3', '3/10'],
      wrong: { '0.7': 'Itu jumlah yang diketahui. k = 1 − 0,7.' },
      steps: ['0,1 + 0,4 + k + 0,2 = 1.', 'k = 1 − 0,7 = 0,3.'],
    },
    {
      type: 'num',
      q: 'X bernilai 1, 2, 3 dengan peluang 0,5; 0,3; 0,2. Nilai harapan E(X) adalah …',
      ans: ['1.7', '17/10'],
      wrong: { '2': 'Itu rata-rata 1, 2, 3 tanpa memperhatikan peluang.', '6': 'Kalikan setiap nilai dengan peluangnya, lalu jumlahkan.' },
      steps: ['1(0,5) + 2(0,3) + 3(0,2).', '= 0,5 + 0,6 + 0,6 = 1,7.'],
    },
    {
      q: 'Variabel acak adalah …',
      options: [
        { t: 'aturan yang memberi bilangan pada setiap hasil percobaan', ok: true },
        { t: 'bilangan yang dipilih secara sembarang oleh guru', why: 'Variabel acak ditentukan oleh hasil percobaan.' },
        { t: 'peluang suatu kejadian', why: 'Peluang adalah ukuran kemungkinan, bukan variabel acaknya.' },
        { t: 'banyak percobaan yang dilakukan', why: 'Itu n, banyak percobaan.' },
      ],
      steps: ['Variabel acak: hasil percobaan → bilangan.'],
    },
    {
      type: 'num',
      q: 'Sebuah dadu dilempar. X = mata dadu yang muncul. Nilai E(X) adalah …',
      ans: ['3.5', '7/2'],
      wrong: { '3': '(1 + 2 + 3 + 4 + 5 + 6) ÷ 6 = 21 ÷ 6 = 3,5.', '21': 'Setiap nilai dikali peluang 1/6.' },
      steps: ['Setiap mata berpeluang 1/6.', 'E(X) = 21 × 1/6 = 3,5.'],
    },
  ],
};

// ---------- 5.2 Distribusi binomial ----------
const B4 = binom(4, 0.8);

const l2 = {
  id: 'k12lb5-2',
  title: 'Distribusi Binomial',
  hook: 'Kalau percobaan dua hasil (sukses atau gagal) diulang n kali dengan peluang sukses tetap, peluang tepat k sukses dihitung dengan C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sebuah koin dilempar 3 kali. Berapa peluang muncul tepat 2 angka?',
          add: [T('a', 'koin dilempar 3 kali', 200, 80, { size: 24, c: 'pos' }), T('q', 'P(tepat 2 angka) = ?', 200, 140, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '3/8', ok: true, why: 'Ada 3 urutan dengan tepat 2 angka (AAG, AGA, GAA), masing-masing berpeluang 1/8.' },
              { t: '1/8', why: '1/8 hanya untuk satu urutan, misalnya AAG. Ada 3 urutan.' },
              { t: '2/3', why: 'Banyak hasilnya 8, bukan 3.' },
              { t: '1/4', why: 'Peluang satu urutan (½)³ = 1/8, dikali 3 urutan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Urutan dan peluangnya',
      steps: [
        {
          say: 'Urutan dengan tepat 2 angka: AAG, AGA, dan GAA. Banyaknya C 3 koma 2, yaitu 3: memilih 2 lemparan dari 3 untuk angka.',
          clear: true,
          add: [...['AAG', 'AGA', 'GAA'].map((s, i) => box(`s${i}`, 80 + i * 120, 70, 90, 42, { r: 8, fill: 'acc-soft', stroke: 'acc', sw: 2, label: s, lsize: 20 })), T('c', 'C(3, 2) = 3 urutan', 200, 125, { size: 20 })],
        },
        {
          say: 'Setiap urutan berpeluang setengah kali setengah kali setengah, yaitu seperdelapan. Tiga urutan: 3 kali seperdelapan, 3 per 8.',
          add: [T('p', 'tiap urutan: (½)² · (½) = 1/8', 200, 175, { size: 20 }), T('t', '3 × 1/8 = {g:3/8}', 200, 225, { size: 26 })],
        },
      ],
    },
    {
      title: 'Rumus binomial',
      steps: [
        {
          say: 'Percobaan binomial punya empat ciri: diulang n kali, setiap percobaan hanya punya dua hasil, peluang sukses p selalu sama, dan percobaan saling bebas.',
          clear: true,
          add: [T('a', 'n kali · 2 hasil · p tetap · saling bebas', 200, 50, { size: 17, c: 'mut' })],
        },
        {
          say: 'Peluang tepat k sukses: banyak urutan C n koma k, dikali p pangkat k untuk yang sukses, dikali 1 dikurangi p pangkat n dikurangi k untuk yang gagal.',
          add: [tag('f', 'P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ', 200, 110, 'pos', 20)],
        },
        {
          say: 'Nilai harapannya sederhana: n kali p. Kalau koin dilempar 3 kali, rata-rata muncul 1,5 angka.',
          add: [T('e', 'E(X) = n · p', 200, 175, { size: 24, c: 'acc' }), T('e2', '3 × ½ = 1,5', 200, 210, { size: 18 })],
        },
      ],
    },
    {
      title: 'Contoh: tembakan bebas',
      steps: [
        {
          say: 'Peluang Rina mencetak tembakan bebas 0,8. Ia menembak 4 kali. Peluang tepat 3 kali masuk: C 4 koma 3, kali 0,8 pangkat 3, kali 0,2. Hasilnya sekitar 0,41.',
          clear: true,
          add: [T('a', 'n = 4, p = 0,8', 200, 35, { size: 20, c: 'pos' }), T('b', 'P(X = 3) = 4 · 0,8³ · 0,2 ≈ 0,41', 200, 65, { size: 18 })],
        },
        {
          say: 'Ini diagram distribusinya. Paling mungkin masuk 3 atau 4 kali. Nilai harapannya 4 kali 0,8, yaitu 3,2.',
          add: [...pbars('b', B4.map((v, k) => ({ l: k, v, txt: fmt(v, v < 0.01 ? 3 : 2), ...(k === 3 ? { c: 'acc-soft', s: 'acc' } : {}) })), 60, 270, 280, 150, 0.45), T('e', 'E(X) = 3,2', 120, 110, { size: 18, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dadu dilempar 3 kali. Berapa peluang mata 6 muncul tepat 1 kali?',
          clear: true,
          add: [T('a', 'dadu 3 kali, sukses = mata 6', 200, 70, { size: 22, c: 'pos' }), T('q', 'P(tepat 1 kali) = ?', 200, 130, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: '3 · (1/6) · (5/6)²', ok: true, why: 'C(3, 1) = 3, sukses (1/6)¹, gagal (5/6)².' },
              { t: '(1/6) · (5/6)²', why: 'Itu satu urutan saja. Mata 6 bisa muncul di lemparan ke-1, ke-2, atau ke-3.' },
              { t: '3 · (1/6)', why: 'Dua lemparan lainnya harus gagal: dikali (5/6)².' },
              { t: '1/6', why: '1/6 adalah peluang dalam satu lemparan.' },
            ],
          },
        },
        {
          say: 'C 3 koma 1 sama dengan 3. Sukses seperenam, gagal lima perenam dua kali. 3 kali seperenam kali 25 per 36 sama dengan 75 per 216, sekitar 0,35.',
          add: [T('a2', '3 · 1/6 · 25/36 = 75/216 ≈ {g:0,35}', 200, 200, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Koin dilempar 4 kali. Peluang muncul tepat 2 angka adalah …',
      ans: ['3/8', '6/16'],
      wrong: { '1/2': 'C(4, 2) × (½)⁴ = 6/16 = 3/8.', '1/16': 'Itu satu urutan. Ada C(4, 2) = 6 urutan.' },
      steps: ['C(4, 2) = 6, setiap urutan (½)⁴ = 1/16.', '6/16 = 3/8.'],
    },
    {
      type: 'num',
      q: 'n = 5 dan p = 0,5. Nilai P(X = 0) adalah …',
      ans: ['1/32'],
      wrong: { '0': 'Mungkin saja tidak ada sukses: (0,5)⁵.', '1/5': 'Semua 5 percobaan gagal: (½)⁵ = 1/32.' },
      steps: ['C(5, 0) = 1.', '(½)⁵ = 1/32.'],
    },
    {
      type: 'num',
      q: 'Peluang sebuah bibit tumbuh 0,3. Dari 20 bibit, nilai harapan banyak bibit yang tumbuh adalah …',
      ans: ['6'],
      wrong: { '14': 'Itu yang tidak tumbuh. E(X) = 20 × 0,3.', '0.3': 'Kalikan dengan n = 20.' },
      steps: ['E(X) = n · p.', '20 × 0,3 = 6.'],
    },
    {
      q: 'Manakah yang BUKAN percobaan binomial?',
      options: [
        { t: 'mengambil 3 kartu satu per satu tanpa pengembalian, menghitung kartu As', ok: true },
        { t: 'melempar koin 10 kali, menghitung angka', why: 'Peluang tetap ½ dan saling bebas: binomial.' },
        { t: 'melempar dadu 5 kali, menghitung mata 6', why: 'Peluang tetap 1/6: binomial.' },
        { t: 'menembak 4 kali dengan peluang masuk 0,8 tiap tembakan', why: 'Peluang tetap dan saling bebas: binomial.' },
      ],
      steps: ['Tanpa pengembalian membuat peluang berubah tiap pengambilan.', 'Syarat p tetap tidak terpenuhi.'],
    },
    {
      type: 'num',
      q: 'n = 3 dan p = 0,2. Nilai P(X = 2) adalah …',
      ans: ['0.096', '12/125'],
      wrong: { '0.032': 'Ada C(3, 2) = 3 urutan: 3 × 0,04 × 0,8.', '0.04': 'Kalikan juga dengan 0,8 (satu gagal) dan 3 (banyak urutan).' },
      steps: ['C(3, 2) · 0,2² · 0,8.', '= 3 × 0,04 × 0,8 = 0,096.'],
    },
  ],
};

// ---------- 5.3 Distribusi normal ----------
const CN = { x: 40, y: 40, w: 280, h: 200, xmin: -3.5, xmax: 3.5, ymin: 0, ymax: 0.45 };
const PN = plane('pn', { ...CN, labels: false, step: 1, ystep: 0.1, xl: '', yl: '' });
const phi = (x) => Math.exp((-x * x) / 2) / Math.sqrt(2 * Math.PI);
const band = (id, a, b, c, z = -2) => {
  const pts = [[a, 0]];
  for (let i = 0; i <= 40; i++) {
    const x = a + ((b - a) * i) / 40;
    pts.push([x, phi(x)]);
  }
  pts.push([b, 0]);
  return { id, t: 'poly', x: 0, y: 0, pts: pts.map(([u, v]) => PN.at(u, v)), fill: `${c}-soft`, stroke: 'none', sw: 0, z };
};
const SIG = ['μ−3σ', 'μ−2σ', 'μ−σ', 'μ', 'μ+σ', 'μ+2σ', 'μ+3σ'];
const sigLabels = (vals = SIG) => vals.map((s, i) => T(`sl${i}`, s, PN.X(i - 3), CN.y + CN.h + 14, { size: 11, c: 'mut' }));
const HB = binom(10, 0.5);
// Kurva normal pendekatan binomial n = 10, p = ½ (rata-rata 5, ragam 2,5), digambar di atas batang
const bell = () => {
  const gap = 320 / 11;
  let d = '';
  for (let i = 0; i <= 80; i++) {
    const u = -0.5 + (11 * i) / 80;
    const pdf = Math.exp(-((u - 5) ** 2) / 5) / Math.sqrt(5 * Math.PI);
    d += `${i ? 'L' : 'M'}${(40 + (u + 0.5) * gap).toFixed(1)},${(260 - (pdf / 0.26) * 200).toFixed(1)} `;
  }
  return { id: 'bell', t: 'path', x: 0, y: 0, d: d.trim(), stroke: 'neg', sw: 3 };
};

const l3 = {
  id: 'k12lb5-3',
  title: 'Distribusi Normal',
  hook: 'Banyak data, seperti tinggi badan, membentuk kurva lonceng yang simetris. Sekitar 68% data berada dalam satu simpangan baku dari rata-rata.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Tinggi siswa di sebuah sekolah rata-rata 160 sentimeter dengan simpangan baku 5 sentimeter. Kira-kira berapa persen siswa yang tingginya antara 155 dan 165 sentimeter?',
          add: [T('a', 'rata-rata 160 cm, simpangan baku 5 cm', 200, 80, { size: 20, c: 'pos' }), T('q', 'antara 155 dan 165: …%', 200, 140, { size: 26, c: 'acc' })],
          ask: {
            options: [
              { t: 'sekitar 68%', ok: true, why: '155 sampai 165 adalah satu simpangan baku di kiri dan kanan rata-rata. Pada distribusi normal, isinya sekitar 68%.' },
              { t: 'sekitar 50%', why: '50% adalah separuh data di atas atau di bawah rata-rata.' },
              { t: 'sekitar 95%', why: '95% berada dalam dua simpangan baku: 150 sampai 170.' },
              { t: '100%', why: 'Masih ada siswa yang lebih pendek dari 155 atau lebih tinggi dari 165.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kurva lonceng',
      steps: [
        {
          say: 'Ini distribusi binomial untuk 10 lemparan koin. Bentuknya simetris: tinggi di tengah, rendah di kedua ujung.',
          clear: true,
          add: [...pbars('h', HB.map((v, k) => ({ l: k, v, txt: '' })), 40, 260, 320, 200, 0.26, { lsize: 12 })],
        },
        {
          say: 'Kalau batangnya dibuat makin banyak dan makin tipis, puncaknya membentuk kurva halus seperti lonceng. Inilah kurva distribusi normal.',
          add: [bell()],
        },
        {
          say: 'Kurva normal ditentukan oleh rata-rata mu di tengah dan simpangan baku sigma yang mengatur lebarnya. Kurvanya simetris terhadap rata-rata.',
          add: [T('k', 'simetris terhadap rata-rata μ', 200, 40, { size: 17, c: 'neg' })],
        },
      ],
    },
    {
      title: 'Aturan 68–95–99,7',
      steps: [
        {
          say: 'Daerah satu simpangan baku di kiri dan kanan rata-rata memuat sekitar 68 persen data.',
          clear: true,
          add: [...PN.els.filter((e) => e.id !== 'pnxl' && e.id !== 'pnyl'), curve('cv', PN, phi, CN, { n: 120 }), ...sigLabels(), band('b1', -1, 1, 'pos', -2), T('t1', '68%', PN.X(0), PN.Y(0.15), { size: 18, c: 'pos' })],
        },
        {
          say: 'Dua simpangan baku memuat sekitar 95 persen data.',
          add: [band('b2', -2, 2, 'acc', -3), T('t2', '95%', PN.X(0), PN.Y(0.05), { size: 15, c: 'acc' })],
        },
        {
          say: 'Tiga simpangan baku memuat hampir semuanya, sekitar 99,7 persen. Luas seluruh daerah di bawah kurva sama dengan 1, yaitu 100 persen.',
          add: [band('b3', -3, 3, 'ok', -4), R('t3', '99,7% dalam 3σ', 60, 'ok', 13), R('t4', 'luas total = 1', 85, 'mut', 13)],
        },
      ],
    },
    {
      title: 'Skor z',
      steps: [
        {
          say: 'Untuk membandingkan data dengan kurva normal, hitung skor z: data dikurangi rata-rata, dibagi simpangan baku. Skor z menyatakan berapa simpangan baku data itu dari rata-rata.',
          clear: true,
          add: [tag('f', 'z = (x − μ) ÷ σ', 200, 50, 'pos', 26)],
        },
        {
          say: 'Siswa setinggi 170 sentimeter: 170 dikurangi 160, dibagi 5, sama dengan 2. Ia berada 2 simpangan baku di atas rata-rata.',
          add: [T('a', 'x = 170: z = (170 − 160) ÷ 5 = 2', 200, 110, { size: 20 })],
        },
        {
          say: 'Di antara minus 2 dan 2 ada 95 persen. Sisanya 5 persen terbagi dua ujung, jadi hanya sekitar 2,5 persen siswa yang lebih tinggi dari 170 sentimeter.',
          add: [T('b', '(100% − 95%) ÷ 2 = 2,5% di atas 170 cm', 200, 160, { size: 18, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Nilai ujian berdistribusi normal dengan rata-rata 70 dan simpangan baku 10. Berapa skor z untuk nilai 90?',
          clear: true,
          add: [T('a', 'μ = 70,  σ = 10,  x = 90', 200, 80, { size: 24, c: 'pos' }), T('q', 'z = ?', 200, 140, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '2', ok: true, why: '(90 − 70) ÷ 10 = 2.' },
              { t: '20', why: '20 adalah selisihnya. Bagi dengan σ = 10.' },
              { t: '9', why: 'Itu 90 ÷ 10. Kurangi rata-rata dulu.' },
              { t: '−2', why: '90 di atas rata-rata, jadi z positif.' },
            ],
          },
        },
        {
          say: '90 dikurangi 70 sama dengan 20. Dibagi 10, sama dengan 2. Nilai 90 berada 2 simpangan baku di atas rata-rata.',
          add: [T('a2', 'z = (90 − 70) ÷ 10 = {g:2}', 200, 210, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Data berdistribusi normal dengan μ = 50 dan σ = 4. Skor z untuk x = 58 adalah …',
      ans: ['2'],
      wrong: { '8': 'Bagi selisihnya dengan σ: 8 ÷ 4.', '14.5': 'Kurangi rata-rata dulu: (58 − 50) ÷ 4.' },
      steps: ['z = (58 − 50) ÷ 4.', '= 2.'],
    },
    {
      q: 'Pada distribusi normal, persentase data yang berada dalam dua simpangan baku dari rata-rata sekitar …',
      options: [
        { t: '95%', ok: true },
        { t: '68%', why: '68% untuk satu simpangan baku.' },
        { t: '99,7%', why: '99,7% untuk tiga simpangan baku.' },
        { t: '50%', why: '50% adalah separuh data di satu sisi rata-rata.' },
      ],
      steps: ['Aturan 68–95–99,7.', 'Dua simpangan baku → 95%.'],
    },
    {
      type: 'num',
      q: 'Tinggi siswa berdistribusi normal dengan μ = 160 cm dan σ = 5 cm. Persentase siswa yang tingginya lebih dari 165 cm sekitar … %.',
      ans: ['16'],
      wrong: { '32': 'Di luar satu simpangan baku ada 32%, terbagi dua sisi: 16%.', '34': '34% adalah antara 160 dan 165.' },
      steps: ['Antara 155 dan 165: 68%. Di luar: 32%.', 'Di atas 165: 32% ÷ 2 = 16%.'],
    },
    {
      q: 'Kurva distribusi normal simetris terhadap …',
      options: [
        { t: 'rata-rata μ', ok: true },
        { t: 'sumbu y', why: 'Hanya kalau rata-ratanya 0.' },
        { t: 'simpangan baku σ', why: 'σ mengatur lebar kurva, bukan sumbu simetrinya.' },
        { t: 'titik nol', why: 'Kurva berpusat di rata-rata, yang belum tentu 0.' },
      ],
      steps: ['Puncak kurva normal ada di rata-rata.', 'Kurvanya simetris terhadap μ.'],
    },
    {
      type: 'num',
      q: 'Nilai ujian berdistribusi normal dengan μ = 70 dan σ = 10. Nilai yang memiliki skor z = −1 adalah …',
      ans: ['60'],
      wrong: { '80': 'z negatif berarti di bawah rata-rata: 70 − 10.', '69': 'x = μ + z·σ = 70 + (−1)(10).' },
      steps: ['x = μ + z · σ.', '= 70 − 10 = 60.'],
    },
  ],
};

export default {
  id: 'k12lb5',
  no: 5,
  title: 'Analisis Data dan Peluang',
  desc: 'Variabel acak dan distribusi peluang, nilai harapan, distribusi binomial, serta distribusi normal dengan aturan 68–95–99,7 dan skor z.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'X berdistribusi binomial dengan n = 10 dan p = 0,4. Nilai harapan E(X) adalah …',
      ans: ['4'],
      wrong: { '6': 'Itu banyak gagal. E(X) = 10 × 0,4.', '0.4': 'Kalikan dengan n = 10.' },
      steps: ['E(X) = n · p.', '10 × 0,4 = 4.'],
    },
    {
      q: 'Luas seluruh daerah di bawah kurva distribusi normal adalah …',
      options: [
        { t: '1', ok: true },
        { t: '0,5', why: '0,5 adalah luas di satu sisi rata-rata.' },
        { t: 'σ', why: 'Luas total selalu 1, berapa pun σ-nya.' },
        { t: 'tak hingga', why: 'Kurvanya memanjang tanpa batas, tetapi luasnya tetap 1.' },
      ],
      steps: ['Luas di bawah kurva = jumlah semua peluang.', '= 1.'],
    },
    {
      type: 'num',
      q: 'Dua koin dilempar. Peluang keduanya muncul angka adalah …',
      ans: ['1/4'],
      wrong: { '1/2': 'Ada 4 hasil, hanya AA yang memenuhi.', '1/3': 'AG dan GA adalah dua hasil berbeda, jadi ada 4 hasil.' },
      steps: ['Hasil: AA, AG, GA, GG.', 'P(AA) = 1/4.'],
    },
  ],
};
