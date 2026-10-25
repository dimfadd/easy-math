// Kelas 5 · Bab 4: Keliling dan Luas Bangun Datar
import { T, box, ln } from '../helpers.js';

const U = 24; // piksel per cm
const grid = (p, cols, rows, x0, y0, o = {}) => {
  let d = '';
  for (let c = 0; c <= cols; c++) d += `M${x0 + c * U},${y0} v${rows * U} `;
  for (let r = 0; r <= rows; r++) d += `M${x0},${y0 + r * U} h${cols * U} `;
  return { id: `${p}g`, t: 'path', x: 0, y: 0, d, stroke: 'mut', sw: 0.8, z: -1, ...o };
};
const rect = (id, x0, y0, w, h, c = 'pos', o = {}) => ({ id, t: 'rect', x: x0 + (w * U) / 2, y: y0 + (h * U) / 2, w: w * U, h: h * U, r: 0, fill: `${c}-soft`, stroke: c, sw: 3, ...o });
const side = (id, text, x, y, c = 'ink') => T(id, text, x, y, { size: 15, c });

// ---------- 4.1 Keliling ----------
const l1 = {
  id: 'k5b4-1',
  title: 'Keliling',
  hook: 'Keliling adalah panjang seluruh tepi bangun. Jumlahkan semua sisinya. Untuk persegi panjang: 2 × (panjang + lebar).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Semut berjalan mengelilingi tepi kebun berbentuk persegi panjang 6 meter kali 4 meter, sampai kembali ke titik awal. Berapa meter yang ditempuh?',
          add: [rect('k', 80, 60, 6, 4, 'ok'), side('lp', '6 m', 152, 50), side('ll', '4 m', 240, 108)],
          ask: {
            options: [
              { t: '20 m', ok: true, why: '6 + 4 + 6 + 4 = 20 m.' },
              { t: '10 m', why: '6 + 4 baru setengah jalan. Ada sisi atas dan bawah, kiri dan kanan.' },
              { t: '24 m', why: '6 × 4 = 24 adalah luas, bukan keliling.' },
              { t: '16 m', why: 'Jumlahkan keempat sisinya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jumlahkan semua sisi',
      steps: [
        {
          say: 'Keliling adalah panjang seluruh tepi. Persegi panjang punya 4 sisi: 6, 4, 6, dan 4.',
          clear: true,
          add: [rect('k', 80, 60, 6, 4, 'ok'), side('a', '6 m', 152, 50), side('b', '4 m', 240, 108), side('c', '6 m', 152, 170), side('d', '4 m', 65, 108)],
        },
        {
          say: '6 tambah 4 tambah 6 tambah 4 sama dengan 20 meter. Karena panjang dan lebar muncul dua kali, bisa ditulis 2 kali, kurung 6 tambah 4.',
          add: [T('a1', '6 + 4 + 6 + 4 = 20 m', 200, 215, { size: 20 }), T('a2', 'K = 2 × (p + l)', 200, 255, { size: 22, c: 'ok' })],
        },
      ],
    },
    {
      title: 'Persegi',
      steps: [
        {
          say: 'Persegi keempat sisinya sama. Kalau sisinya 5 cm, kelilingnya 5 tambah 5 tambah 5 tambah 5, yaitu 4 kali 5, sama dengan 20 cm.',
          clear: true,
          add: [rect('s', 140, 50, 5, 5, 'acc'), side('a', '5 cm', 200, 40), T('k', 'K = 4 × s = 4 × 5 = {g:20 cm}', 200, 205, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Persegi panjang 9 cm kali 3 cm. Berapa kelilingnya?',
          clear: true,
          add: [rect('k', 92, 80, 9, 3, 'pos'), side('a', '9 cm', 200, 70), side('b', '3 cm', 325, 116)],
          ask: {
            options: [
              { t: '24 cm', ok: true, why: '2 × (9 + 3) = 2 × 12 = 24 cm.' },
              { t: '12 cm', why: '9 + 3 baru setengah keliling.' },
              { t: '27 cm', why: '9 × 3 = 27 adalah luas.' },
            ],
          },
        },
        {
          say: '2 kali, kurung 9 tambah 3, sama dengan 2 kali 12, yaitu 24 cm.',
          add: [T('a1', '2 × (9 + 3) = {g:24 cm}', 200, 200, { size: 26 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Keliling persegi dengan sisi 7 cm adalah … cm.',
      ans: ['28'],
      wrong: { '49': 'Itu luasnya.', '14': '4 sisi: 4 × 7.' },
      steps: ['4 × 7.', '= 28 cm.'],
    },
    {
      type: 'num',
      q: 'Keliling persegi panjang 10 cm × 4 cm adalah … cm.',
      ans: ['28'],
      wrong: { '40': 'Itu luasnya.', '14': '2 × 14 = 28.' },
      steps: ['2 × (10 + 4).', '= 28 cm.'],
    },
    {
      type: 'num',
      q: 'Segitiga dengan sisi 5 cm, 6 cm, dan 7 cm kelilingnya … cm.',
      ans: ['18'],
      wrong: { '210': 'Keliling dijumlah, bukan dikali.' },
      steps: ['5 + 6 + 7.', '= 18 cm.'],
    },
    {
      type: 'num',
      q: 'Kebun persegi berkeliling 36 m. Panjang sisinya … m.',
      ans: ['9'],
      wrong: { '6': '6 × 6 = 36 adalah luas. Keliling: 4 × s = 36.', '18': '36 : 4 = 9.' },
      steps: ['4 × s = 36.', 's = 9 m.'],
    },
    {
      type: 'num',
      q: 'Pak Tani memagari kebun 12 m × 8 m. Panjang pagar … m.',
      ans: ['40'],
      wrong: { '96': 'Itu luas kebun.', '20': '2 × 20 = 40.' },
      steps: ['2 × (12 + 8).', '= 40 m.'],
    },
  ],
};

// ---------- 4.2 Luas persegi panjang dan persegi ----------
const l2 = {
  id: 'k5b4-2',
  title: 'Luas Persegi Panjang dan Persegi',
  hook: 'Luas persegi panjang = panjang × lebar, karena ada "lebar" baris yang masing-masing berisi "panjang" persegi satuan. Satuannya cm² (sentimeter persegi).',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Persegi panjang 6 cm kali 4 cm. Berapa persegi satuan 1 cm kali 1 cm yang menutupinya?',
          add: [grid('a', 6, 4, 80, 60), rect('k', 80, 60, 6, 4, 'ok', { fill: 'none' }), side('lp', '6 cm', 152, 48), side('ll', '4 cm', 240, 108)],
          ask: {
            options: [
              { t: '24', ok: true, why: '4 baris, setiap baris 6 persegi: 4 × 6 = 24.' },
              { t: '20', why: '20 adalah keliling. Hitung persegi di dalam.' },
              { t: '10', why: '6 + 4 bukan luas.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Panjang kali lebar',
      steps: [
        {
          say: 'Setiap baris berisi 6 persegi satuan, sepanjang panjangnya. Ada 4 baris, sebanyak lebarnya. 6 kali 4 sama dengan 24.',
          clear: true,
          add: [grid('a', 6, 4, 80, 60), rect('k', 80, 60, 6, 4, 'ok', { fill: 'ok-soft', o: 0.6 }), side('lp', '6 cm', 152, 48), side('ll', '4 cm', 240, 108), T('a1', 'L = p × l = 6 × 4 = {g:24 cm²}', 200, 205, { size: 22 })],
        },
        {
          say: 'Satuannya sentimeter persegi, ditulis cm kecil dua di atas, karena kita menghitung persegi berukuran 1 cm kali 1 cm.',
          add: [T('a2', 'cm² = sentimeter persegi', 200, 245, { size: 16, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Persegi',
      steps: [
        {
          say: 'Persegi: panjang dan lebarnya sama. Sisi 5 cm, luasnya 5 kali 5 sama dengan 25 cm persegi.',
          clear: true,
          add: [grid('a', 5, 5, 140, 40), rect('s', 140, 40, 5, 5, 'acc', { fill: 'acc-soft', o: 0.6 }), side('a', '5 cm', 200, 30), T('k', 'L = s × s = 5 × 5 = {g:25 cm²}', 200, 190, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Lantai kamar 4 m kali 3 m. Berapa luasnya?',
          clear: true,
          add: [rect('k', 128, 60, 6, 4.5, 'pos'), side('a', '4 m', 200, 48), side('b', '3 m', 290, 114)],
          ask: {
            options: [
              { t: '12 m²', ok: true, why: '4 × 3 = 12 meter persegi.' },
              { t: '14 m', why: '14 m adalah keliling.' },
              { t: '7 m²', why: '4 + 3 bukan luas.' },
            ],
          },
        },
        {
          say: '4 kali 3 sama dengan 12 meter persegi.',
          add: [T('a1', '4 × 3 = {g:12 m²}', 200, 210, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Luas persegi panjang 8 cm × 5 cm adalah … cm².',
      ans: ['40'],
      wrong: { '26': 'Itu keliling.', '13': 'Kalikan, bukan jumlahkan.' },
      steps: ['8 × 5.', '= 40 cm².'],
    },
    {
      type: 'num',
      q: 'Luas persegi dengan sisi 9 cm adalah … cm².',
      ans: ['81'],
      wrong: { '36': 'Itu keliling.', '18': '9 × 9.' },
      steps: ['9 × 9.', '= 81 cm².'],
    },
    {
      type: 'num',
      q: 'Persegi panjang luasnya 36 cm² dan panjangnya 9 cm. Lebarnya … cm.',
      ans: ['4'],
      wrong: { '27': 'Bagi, bukan kurangi: 36 : 9.', '324': 'Bagi, bukan kali.' },
      steps: ['9 × l = 36.', 'l = 4 cm.'],
    },
    {
      q: 'Satuan luas yang tepat untuk lantai kelas adalah …',
      options: [
        { t: 'm²', ok: true },
        { t: 'm', why: 'm adalah satuan panjang.' },
        { t: 'kg', why: 'kg adalah satuan berat.' },
      ],
      steps: ['Luas lantai → meter persegi.'],
    },
    {
      type: 'num',
      q: 'Dinding 5 m × 3 m dicat. Satu kaleng cat untuk 5 m². Butuh … kaleng.',
      ans: ['3'],
      wrong: { '15': '15 m² adalah luasnya. Bagi 5.', '16': 'Luas 15 m², bagi 5.' },
      steps: ['Luas = 15 m².', '15 : 5 = 3 kaleng.'],
    },
  ],
};

// ---------- 4.3 Luas segitiga ----------
const TX = 90;
const TY = 60;

const l3 = {
  id: 'k5b4-3',
  title: 'Luas Segitiga',
  hook: 'Segitiga siku-siku adalah setengah persegi panjang. Karena itu luas segitiga = ½ × alas × tinggi.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Persegi panjang 8 cm kali 5 cm dipotong miring menjadi dua segitiga yang sama. Berapa luas satu segitiga?',
          add: [rect('k', TX, TY, 8, 5, 'pos'), ln('d', TX, TY, TX + 8 * U, TY + 5 * U, { sw: 2.5, c: 'neg', dash: '6 4' }), side('a', '8 cm', TX + 4 * U, TY - 12), side('b', '5 cm', TX + 8 * U + 25, TY + 2.5 * U)],
          ask: {
            options: [
              { t: '20 cm²', ok: true, why: 'Persegi panjang 8 × 5 = 40. Setengahnya 20.' },
              { t: '40 cm²', why: '40 adalah luas persegi panjang utuh.' },
              { t: '13 cm²', why: '8 + 5 bukan luas.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Setengah persegi panjang',
      steps: [
        {
          say: 'Garis miring membagi persegi panjang menjadi dua segitiga yang sama besar.',
          clear: true,
          add: [{ id: 't1', t: 'poly', x: 0, y: 0, pts: [[TX, TY], [TX, TY + 5 * U], [TX + 8 * U, TY + 5 * U]], fill: 'acc-soft', stroke: 'acc', sw: 3 }, { id: 't2', t: 'poly', x: 0, y: 0, pts: [[TX, TY], [TX + 8 * U, TY], [TX + 8 * U, TY + 5 * U]], fill: 'pos-soft', stroke: 'pos', sw: 3 }, side('a', 'alas 8 cm', TX + 4 * U, TY + 5 * U + 16), side('b', 'tinggi 5 cm', TX - 45, TY + 2.5 * U)],
        },
        {
          say: 'Satu segitiga adalah setengah dari 8 kali 5. Setengah kali 40 sama dengan 20 cm persegi.',
          set: { t2: { o: 0.15 } },
          add: [T('k', 'L = ½ × a × t = ½ × 8 × 5 = {g:20 cm²}', 200, 240, { size: 20 })],
        },
      ],
    },
    {
      title: 'Tinggi harus tegak lurus',
      steps: [
        {
          say: 'Pada segitiga lain, tinggi adalah garis tegak lurus dari puncak ke alas. Bukan sisi miringnya.',
          clear: true,
          add: [{ id: 't', t: 'poly', x: 0, y: 0, pts: [[80, 200], [300, 200], [180, 70]], fill: 'ok-soft', stroke: 'ok', sw: 3 }, ln('h', 180, 70, 180, 200, { sw: 2.5, c: 'neg', dash: '6 4' }), { id: 'm', t: 'arc', x: 180, y: 200, r: 14, a1: 0, a2: 90, c: 'neg', right: true }, side('a', 'alas', 240, 218), side('b', 'tinggi', 210, 140, 'neg')],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Segitiga beralas 10 cm dan tinggi 6 cm. Berapa luasnya?',
          clear: true,
          add: [T('q', 'a = 10 cm, t = 6 cm', 200, 90, { size: 28, c: 'pos' }), T('q2', 'L = ?', 200, 145, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '30 cm²', ok: true, why: '½ × 10 × 6 = 30.' },
              { t: '60 cm²', why: 'Jangan lupa dikali setengah.' },
              { t: '16 cm²', why: '10 + 6 bukan luas.' },
            ],
          },
        },
        {
          say: 'Setengah kali 10 kali 6 sama dengan 30 cm persegi.',
          add: [T('a1', '½ × 10 × 6 = {g:30 cm²}', 200, 210, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Luas segitiga dengan alas 8 cm dan tinggi 7 cm adalah … cm².',
      ans: ['28'],
      wrong: { '56': 'Kalikan setengah.', '15': 'Luas memakai perkalian.' },
      steps: ['½ × 8 × 7.', '= 28 cm².'],
    },
    {
      type: 'num',
      q: 'Luas segitiga siku-siku dengan sisi siku 6 cm dan 4 cm adalah … cm².',
      ans: ['12'],
      wrong: { '24': 'Setengah dari 24.', '10': 'Luas memakai perkalian.' },
      steps: ['½ × 6 × 4.', '= 12 cm².'],
    },
    {
      q: 'Tinggi segitiga adalah garis dari puncak ke alas yang …',
      options: [
        { t: 'tegak lurus alas', ok: true },
        { t: 'paling panjang', why: 'Sisi miring bisa lebih panjang, tetapi bukan tinggi.' },
        { t: 'sejajar alas', why: 'Garis sejajar alas tidak mengenai alas.' },
      ],
      steps: ['Tinggi selalu tegak lurus alas.'],
    },
    {
      type: 'num',
      q: 'Segitiga luasnya 24 cm² dan alasnya 8 cm. Tingginya … cm.',
      ans: ['6'],
      wrong: { '3': '½ × 8 × t = 24 → 4t = 24.', '12': '4 × t = 24 → t = 6.' },
      steps: ['½ × 8 = 4.', '4 × t = 24 → t = 6 cm.'],
    },
    {
      type: 'num',
      q: 'Persegi panjang 12 cm × 5 cm dipotong diagonal. Luas satu bagian … cm².',
      ans: ['30'],
      wrong: { '60': 'Itu luas utuh.' },
      steps: ['12 × 5 = 60.', 'Setengahnya 30 cm².'],
    },
  ],
};

export default {
  id: 'k5b4',
  no: 4,
  title: 'Keliling dan Luas Bangun Datar',
  desc: 'Keliling sebagai panjang tepi, luas persegi panjang dan persegi dengan petak, serta luas segitiga sebagai setengah persegi panjang.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Keliling persegi panjang 15 m × 5 m adalah … m.',
      ans: ['40'],
      wrong: { '75': 'Itu luas.' },
      steps: ['2 × (15 + 5) = 40 m.'],
    },
    {
      type: 'num',
      q: 'Luas persegi dengan keliling 20 cm adalah … cm².',
      ans: ['25'],
      wrong: { '400': 'Cari sisi dulu: 20 : 4 = 5.', '20': '20 adalah keliling.' },
      steps: ['Sisi = 20 : 4 = 5 cm.', 'Luas = 5 × 5 = 25 cm².'],
    },
    {
      type: 'num',
      q: 'Luas segitiga beralas 14 cm dan tinggi 10 cm adalah … cm².',
      ans: ['70'],
      wrong: { '140': 'Jangan lupa setengah.' },
      steps: ['½ × 14 × 10 = 70 cm².'],
    },
  ],
};
