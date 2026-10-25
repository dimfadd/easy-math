// Kelas 10 · Bab 7: Statistika (data berkelompok dan ukuran penyebaran)
import { T, ln, dot, box, table, numberLine } from '../helpers.js';
import { tag } from './kit.js';

// Data tinggi badan 30 siswa (cm)
const KELAS = ['150–154', '155–159', '160–164', '165–169', '170–174'];
const FREK = [3, 6, 10, 7, 4];
const MID = [152, 157, 162, 167, 172];

// Histogram: elemen bars dengan batang rapat
const HX = 200;
const HY = 140;
const HW = 300;
const HH = 170;
const HMAX = 10;
const GAP = HW / 5;
const barX = (i) => HX - HW / 2 + GAP * (i + 0.5);
const barTop = (v) => HY + HH / 2 - (v / HMAX) * HH;
const valX = (v) => HX - HW / 2 + ((v - 149.5) / 5) * GAP; // nilai tinggi → posisi
const hist = (id = 'h', o = {}) => ({
  id,
  t: 'bars',
  x: HX,
  y: HY,
  w: HW,
  h: HH,
  max: HMAX,
  tick: 2,
  bw: 1,
  vals: true,
  lsize: 11,
  data: FREK.map((v, i) => ({ l: KELAS[i], v })),
  ...o,
});

// ---------- 7.1 Data berkelompok dan histogram ----------
const l1 = {
  id: 'k10b7-1',
  title: 'Data Berkelompok dan Histogram',
  hook: 'Kalau datanya banyak, kelompokkan dulu ke dalam rentang. Polanya langsung terlihat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Ini tinggi badan 30 siswa dalam sentimeter. Cara apa yang paling cepat untuk melihat tinggi yang paling umum?',
          add: [
            T('d', '162 157 171 165 160 153 168 163 159 166\n161 172 156 164 150 167 162 158 170 163\n165 155 161 174 160 168 152 164 157 166', 200, 120, { size: 16, lh: 1.6 }),
          ],
          ask: {
            options: [
              { t: 'kelompokkan ke dalam rentang, lalu hitung banyaknya', ok: true, why: 'Dengan rentang seperti 160–164, kita cukup melihat kelompok mana yang paling banyak.' },
              { t: 'cari angka terbesar', why: 'Angka terbesar hanya menunjukkan satu siswa, bukan yang paling umum.' },
              { t: 'baca satu per satu dari kiri', why: 'Bisa, tetapi lama dan polanya sulit terlihat.' },
              { t: 'jumlahkan semua angkanya', why: 'Jumlah dipakai untuk rata-rata, tetapi tidak memperlihatkan sebarannya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tabel distribusi frekuensi',
      steps: [
        {
          say: 'Bagi tinggi badan ke dalam lima kelas, masing-masing selebar 5 sentimeter. Hitung berapa siswa di setiap kelas.',
          clear: true,
          add: [table('tb', 125, 140, [['tinggi (cm)', 'frekuensi'], ...KELAS.map((k, i) => [k, String(FREK[i])]), ['jumlah', '30']], { cw: [120, 100], rh: 30, size: 16, head: true })],
        },
        {
          say: 'Setiap baris disebut kelas. Panjang kelas di sini 5, karena 150 sampai 154 memuat lima bilangan bulat: 150, 151, 152, 153, 154.',
          add: [T('p', 'panjang kelas = 5', 318, 70, { size: 15 })],
        },
        {
          say: 'Titik tengah kelas adalah nilai tengahnya. Untuk 150 sampai 154, titik tengahnya 152.',
          add: [T('m', 'titik tengah', 318, 120, { size: 15, c: 'mut' }), T('m2', '(150 + 154) ÷ 2 = 152', 318, 145, { size: 14 })],
        },
        {
          say: 'Tepi bawah kelas adalah batas bawah dikurangi 0,5. Untuk kelas 160 sampai 164, tepi bawahnya 159,5. Batas ini dipakai supaya kelas-kelas tersambung tanpa celah.',
          add: [T('t', 'tepi bawah', 318, 195, { size: 15, c: 'mut' }), T('t2', '160 − 0,5 = 159,5', 318, 220, { size: 14 })],
        },
      ],
    },
    {
      title: 'Histogram',
      steps: [
        {
          say: 'Gambarkan tabel itu sebagai histogram. Mirip diagram batang, tetapi batangnya rapat tanpa celah, karena kelasnya tersambung.',
          clear: true,
          add: [hist()],
        },
        {
          say: 'Batang tertinggi ada di kelas 160 sampai 164, dengan 10 siswa. Sebagian besar siswa tingginya di sekitar situ.',
          set: { h: hist('h', { data: FREK.map((v, i) => ({ l: KELAS[i], v, c: i === 2 ? 'acc' : 'pos' })) }) },
        },
        {
          say: 'Hubungkan titik tengah puncak setiap batang. Garis ini disebut poligon frekuensi.',
          add: [{ id: 'pg', t: 'poly', x: 0, y: 0, pts: FREK.map((v, i) => [barX(i), barTop(v)]), open: true, stroke: 'neg', sw: 3, z: 2 }, ...FREK.map((v, i) => dot(`pd${i}`, barX(i), barTop(v), 'neg', { r: 5, z: 3 }))],
        },
      ],
    },
    {
      title: 'Membaca histogram',
      steps: [
        {
          say: 'Berapa siswa yang tingginya 165 sentimeter atau lebih? Jumlahkan dua batang terakhir: 7 tambah 4, yaitu 11 siswa.',
          set: { h: hist('h', { data: FREK.map((v, i) => ({ l: KELAS[i], v, c: i >= 3 ? 'ok' : 'pos' })) }) },
          del: ['pg', 'pd*'],
          add: [tag('a', '≥ 165 cm: 7 + 4 = 11 siswa', 290, 30, 'ok', 15)],
        },
        {
          say: 'Dalam persen: 11 dari 30, kira-kira 36,7 persen.',
          add: [tag('b', '11 ÷ 30 × 100% ≈ 36,7%', 318, 80, 'ink', 13)],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari histogram yang sama, berapa siswa yang tingginya kurang dari 160 sentimeter?',
          clear: true,
          add: [hist()],
          ask: {
            options: [
              { t: '9', ok: true, why: 'Dua batang pertama: 3 + 6 = 9.' },
              { t: '19', why: '19 sudah termasuk kelas 160–164. Kurang dari 160 hanya dua kelas pertama.' },
              { t: '6', why: 'Kelas 150–154 juga kurang dari 160: 3 + 6.' },
              { t: '3', why: 'Kelas 155–159 juga kurang dari 160.' },
            ],
          },
        },
        {
          say: 'Kelas 150 sampai 154 dan 155 sampai 159 semuanya kurang dari 160. 3 tambah 6 sama dengan 9 siswa.',
          set: { h: hist('h', { data: FREK.map((v, i) => ({ l: KELAS[i], v, c: i < 2 ? 'ok' : 'pos' })) }) },
          add: [tag('a', '< 160 cm: 3 + 6 = 9 siswa', 290, 30, 'ok', 15)],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Panjang kelas interval 41–50 adalah …',
      ans: ['10'],
      wrong: { '9': '41 sampai 50 memuat 10 bilangan: 41, 42, …, 50. Atau tepi atas − tepi bawah = 50,5 − 40,5.' },
      steps: ['Tepi bawah 40,5, tepi atas 50,5.', 'Panjang kelas = 50,5 − 40,5 = 10.'],
    },
    {
      type: 'num',
      q: 'Titik tengah kelas 61–70 adalah … (boleh pakai koma)',
      ans: ['65,5'],
      wrong: { '65': '(61 + 70) ÷ 2 = 131 ÷ 2 = 65,5.', '66': '(61 + 70) ÷ 2 = 65,5.' },
      steps: ['(61 + 70) ÷ 2.', '= 65,5.'],
    },
    {
      type: 'num',
      q: 'Tepi bawah kelas 61–70 adalah … (boleh pakai koma)',
      ans: ['60,5'],
      wrong: { '61': 'Tepi bawah = batas bawah − 0,5.', '61,5': 'Dikurangi 0,5, bukan ditambah.' },
      steps: ['Tepi bawah = 61 − 0,5.', '= 60,5.'],
    },
    {
      type: 'num',
      q: 'Histogram nilai ujian memiliki frekuensi 4, 8, 12, 5, dan 1 untuk lima kelas berurutan. Banyak siswa seluruhnya adalah …',
      ans: ['30'],
      wrong: { '12': '12 adalah frekuensi terbesar. Jumlahkan semua batang.', '5': '5 adalah banyak kelas, bukan banyak siswa.' },
      steps: ['4 + 8 + 12 + 5 + 1.', '= 30 siswa.'],
    },
    {
      type: 'num',
      q: 'Dari 40 siswa, histogram menunjukkan 10 siswa berada di kelas tertinggi. Persentase siswa di kelas tertinggi adalah … %',
      ans: ['25'],
      wrong: { '10': '10 dari 40, bukan dari 100. 10 ÷ 40 × 100%.', '4': 'Terbalik. 10 ÷ 40, bukan 40 ÷ 10.' },
      steps: ['10 ÷ 40 × 100%.', '= 25%.'],
    },
  ],
};

// ---------- 7.2 Rata-rata, median, modus data berkelompok ----------
const MEDF = 0.6; // (15 − 9) ÷ 10
const l2 = {
  id: 'k10b7-2',
  title: 'Rata-rata, Median, dan Modus Data Berkelompok',
  hook: 'Data asli sudah tidak terlihat, tetapi rata-rata, median, dan modus tetap bisa diperkirakan dari histogram.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dari histogram tinggi badan tadi, kira-kira berapa rata-ratanya?',
          add: [hist()],
          ask: {
            options: [
              { t: 'sekitar 162 cm', ok: true, why: 'Batang tertinggi di 160–164, dan sisi kanan sedikit lebih berat dari kiri.' },
              { t: 'sekitar 152 cm', why: 'Hanya 3 siswa di kelas paling kiri. Sebagian besar ada di tengah.' },
              { t: 'sekitar 172 cm', why: 'Kelas paling kanan hanya berisi 4 siswa.' },
              { t: 'tidak bisa diperkirakan', why: 'Bisa, dengan menganggap setiap siswa berada di titik tengah kelasnya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Rata-rata: titik seimbang',
      steps: [
        {
          say: 'Data aslinya tidak ada. Jadi kita anggap setiap siswa tingginya sama dengan titik tengah kelasnya. Kalikan titik tengah dengan frekuensi.',
          clear: true,
          add: [table('tb', 200, 135, [['kelas', 'f', 'titik tengah', 'f × tengah'], ...KELAS.map((k, i) => [k, String(FREK[i]), String(MID[i]), String(FREK[i] * MID[i]).replace(/\B(?=(\d{3})+$)/g, '.')]), ['jumlah', '30', '', '4.875']], { cw: [90, 50, 100, 100], rh: 30, size: 15, head: true })],
        },
        {
          say: 'Rata-rata sama dengan jumlah f kali titik tengah, dibagi banyak data: 4.875 dibagi 30, yaitu 162,5.',
          add: [T('r', 'rata-rata = 4.875 ÷ 30 = {g:162,5} cm', 200, 268, { size: 20 })],
        },
        {
          say: 'Rata-rata adalah titik seimbang histogram. Bayangkan batang-batangnya di atas papan jungkat-jungkit: papan itu seimbang tepat di 162,5.',
          clear: true,
          add: [hist(), ln('beam', HX - HW / 2, HY + HH / 2 + 22, HX + HW / 2, HY + HH / 2 + 22, { sw: 4, draw: false }), { id: 'fc', t: 'poly', x: valX(162.5), y: HY + HH / 2 + 24, pts: [[0, 0], [-13, 22], [13, 22]], fill: 'acc', stroke: 'ink', sw: 2 }, tag('ft', 'rata-rata 162,5', valX(162.5), 30, 'acc', 15)],
        },
      ],
    },
    {
      title: 'Median: hitung sampai tengah',
      steps: [
        {
          say: 'Median adalah data ke-15, separuh dari 30. Hitung dari kiri: kelas pertama 3, kelas kedua 6, jumlahnya 9. Belum sampai 15.',
          clear: true,
          add: [hist('h', { data: FREK.map((v, i) => ({ l: KELAS[i], v, c: i < 2 ? 'ok' : 'pos' })) }), tag('a', 'data ke-15? sudah 9', 300, 30, 'ink', 14)],
        },
        {
          say: 'Data ke-15 ada di kelas ketiga, yang berisi 10 siswa. Masih perlu 15 dikurangi 9, yaitu 6 siswa dari 10. Itu 6 per 10 dari lebar kelas.',
          add: [box('mf', valX(159.5) + (GAP * MEDF) / 2, barTop(10) + (HH * 10) / HMAX / 2, GAP * MEDF, (HH * 10) / HMAX, { r: 0, fill: 'ok', stroke: 'ink', sw: 1.5, z: 1 }), ln('ml', valX(159.5 + 5 * MEDF), barTop(10) - 12, valX(159.5 + 5 * MEDF), HY + HH / 2, { sw: 2.5, c: 'neg', draw: false, z: 2 })],
          set: { a: tag('a', 'perlu 6 dari 10', 300, 30, 'ink', 14) },
        },
        {
          say: 'Median sama dengan tepi bawah 159,5 ditambah 6 per 10 kali 5, yaitu 159,5 tambah 3, sama dengan 162,5.',
          add: [T('f', 'Me = 159,5 + (15 − 9) ÷ 10 × 5 = {g:162,5}', 200, 275, { size: 17 })],
        },
        {
          say: 'Rumus umumnya: tepi bawah kelas median, ditambah n per 2 dikurangi frekuensi kumulatif sebelumnya, dibagi frekuensi kelas median, dikali panjang kelas.',
          set: { f: { text: 'Me = Tb + (n/2 − fk) ÷ f × p', size: 19, c: 'pos' } },
        },
      ],
    },
    {
      title: 'Modus: condong ke tetangga',
      steps: [
        {
          say: 'Modus ada di kelas dengan batang tertinggi, yaitu 160 sampai 164. Tetangga kanannya, 7, lebih tinggi dari tetangga kirinya, 6. Jadi modus sedikit condong ke kanan.',
          clear: true,
          add: [hist('h', { data: FREK.map((v, i) => ({ l: KELAS[i], v, c: i === 2 ? 'acc' : 'pos' })) })],
        },
        {
          say: 'Tarik dua garis silang dari pojok batang tertinggi ke pojok batang tetangganya. Titik silangnya menunjukkan modus.',
          add: [ln('x1', valX(159.5), barTop(10), valX(164.5), barTop(7), { sw: 2, c: 'neg', z: 2 }), ln('x2', valX(164.5), barTop(10), valX(159.5), barTop(6), { sw: 2, c: 'neg', z: 2 })],
        },
        {
          say: 'Selisih dengan tetangga kiri 4, dengan tetangga kanan 3. Modus sama dengan 159,5 ditambah 4 per 7 kali 5, kira-kira 162,4.',
          add: [ln('mo', valX(159.5 + (5 * 4) / 7), barTop(10) - 14, valX(159.5 + (5 * 4) / 7), HY + HH / 2, { sw: 2, dash: '4 3', c: 'ink', z: 2 }), T('f', 'Mo = 159,5 + 4 ÷ (4 + 3) × 5 ≈ {g:162,4}', 200, 275, { size: 17 })],
        },
        {
          say: 'Rumus umumnya: tepi bawah kelas modus, ditambah d1 per d1 tambah d2, dikali panjang kelas. d1 dan d2 adalah selisih frekuensi dengan kelas sebelum dan sesudahnya.',
          set: { f: { text: 'Mo = Tb + d1 ÷ (d1 + d2) × p', size: 19, c: 'pos' } },
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Kelas median suatu data punya tepi bawah 59,5, panjang kelas 10, dan frekuensi 16. Banyak data 40, dan frekuensi kumulatif sebelum kelas median 12. Berapa mediannya?',
          clear: true,
          add: [T('q1', 'Tb = 59,5   p = 10   f = 16', 200, 80, { size: 20 }), T('q2', 'n = 40   fk = 12', 200, 115, { size: 20 }), T('q3', 'Me = ?', 200, 170, { size: 28, c: 'acc' })],
          ask: {
            options: [
              { t: '64,5', ok: true, why: '59,5 + (20 − 12) ÷ 16 × 10 = 59,5 + 5 = 64,5.' },
              { t: '59,5', why: 'Tepi bawah masih harus ditambah (20 − 12) ÷ 16 × 10.' },
              { t: '67,0', why: 'Gunakan n/2 = 20, bukan 24: (20 − 12) ÷ 16 × 10 = 5.' },
              { t: '69,5', why: 'Itu tepi atas kelas. Median ada di dalam kelas.' },
            ],
          },
        },
        {
          say: 'n per 2 sama dengan 20. 20 dikurangi 12 sama dengan 8. 8 per 16 kali 10 sama dengan 5. Median 59,5 tambah 5, yaitu 64,5.',
          set: { q3: { text: 'Me = 59,5 + (20 − 12) ÷ 16 × 10 = {g:64,5}', size: 18 } },
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Data berkelompok: kelas 1–5 (frekuensi 2), 6–10 (frekuensi 5), 11–15 (frekuensi 3). Rata-ratanya adalah … (boleh pakai koma)',
      ans: ['8,5'],
      wrong: { '8': 'Titik tengahnya 3, 8, 13. (2×3 + 5×8 + 3×13) ÷ 10 = 85 ÷ 10.', '28,3': 'Bagi dengan banyak data (10), bukan banyak kelas.' },
      steps: ['Titik tengah: 3, 8, 13.', '(6 + 40 + 39) ÷ 10 = 8,5.'],
    },
    {
      q: 'Frekuensi lima kelas berurutan adalah 5, 9, 12, 8, 6 (jumlah 40). Median ada di kelas ke- …',
      options: [
        { t: '3', ok: true },
        { t: '2', why: 'Kumulatif sampai kelas 2 baru 14. Data ke-20 belum tercapai.' },
        { t: '4', why: 'Kumulatif sampai kelas 3 sudah 26, melewati 20.' },
        { t: '5', why: 'Median ada di tengah, data ke-20.' },
      ],
      steps: ['n/2 = 20.', 'Kumulatif: 5, 14, 26 → data ke-20 di kelas 3.'],
    },
    {
      type: 'num',
      q: 'Kelas median memiliki Tb = 49,5, p = 10, f = 10. Jika n = 30 dan fk = 11, median data adalah … (boleh pakai koma)',
      ans: ['53,5'],
      wrong: { '49,5': 'Masih harus ditambah (15 − 11) ÷ 10 × 10 = 4.', '60,5': 'Gunakan n/2 = 15.' },
      steps: ['Me = 49,5 + (15 − 11) ÷ 10 × 10.', '= 49,5 + 4 = 53,5.'],
    },
    {
      type: 'num',
      q: 'Kelas modus memiliki tepi bawah 69,5 dan panjang kelas 10. Selisih frekuensinya dengan kelas sebelum 6 dan dengan kelas sesudah 4. Modusnya adalah … (boleh pakai koma)',
      ans: ['75,5'],
      wrong: { '73,5': 'Itu memakai 4 ÷ 10. Yang benar d1 ÷ (d1 + d2) = 6 ÷ 10.', '79,5': 'Itu tepi atas kelas.' },
      steps: ['Mo = 69,5 + 6 ÷ (6 + 4) × 10.', '= 69,5 + 6 = 75,5.'],
    },
    {
      q: 'Saat menghitung rata-rata data berkelompok, setiap data dianggap bernilai …',
      options: [
        { t: 'titik tengah kelasnya', ok: true },
        { t: 'tepi bawah kelasnya', why: 'Tepi bawah dipakai untuk median dan modus, bukan rata-rata.' },
        { t: 'frekuensi kelasnya', why: 'Frekuensi adalah banyaknya data, bukan nilainya.' },
        { t: 'nilai terbesar kelasnya', why: 'Itu membuat rata-rata terlalu besar.' },
      ],
      steps: ['Data asli tidak diketahui.', 'Titik tengah adalah perkiraan terbaik untuk setiap data di kelas itu.'],
    },
  ],
};

// ---------- 7.3 Simpangan rata-rata, ragam, simpangan baku ----------
const NL = numberLine('nl', 200, 230, 340, 2, 12, { step: 1, every: 1, mono: true });
const nx = NL.at;
const A = [5, 6, 7, 8, 9];
const B = [3, 5, 7, 9, 11];
const UNIT = nx(1) - nx(0);
const dots = (p, arr, y, c) => arr.map((v, i) => dot(`${p}${i}`, nx(v), y, c, { r: 8 }));

const l3 = {
  id: 'k10b7-3',
  title: 'Ragam dan Simpangan Baku',
  hook: 'Dua kelompok data bisa punya rata-rata sama tetapi sebaran berbeda. Simpangan baku mengukur seberapa menyebar datanya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Nilai lima siswa kelompok A: 5, 6, 7, 8, 9. Kelompok B: 3, 5, 7, 9, 11. Rata-rata keduanya 7. Kelompok mana yang nilainya lebih merata?',
          add: [NL.el, ...dots('a', A, 150, 'pos'), ...dots('b', B, 195, 'neg'), T('la', 'A', 22, 150, { size: 18, c: 'pos' }), T('lb', 'B', 22, 195, { size: 18, c: 'neg' })],
          ask: {
            options: [
              { t: 'A', ok: true, why: 'Nilai A lebih rapat di sekitar 7. Nilai B lebih jauh menyebar.' },
              { t: 'B', why: 'B ada yang 3 dan 11, jauh dari rata-rata 7.' },
              { t: 'sama saja, karena rata-ratanya sama', why: 'Rata-rata sama tidak berarti sebarannya sama.' },
              { t: 'tidak bisa dibandingkan', why: 'Bisa, dengan melihat jarak setiap data dari rata-rata.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jarak dari rata-rata',
      steps: [
        {
          say: 'Tarik garis rata-rata di 7. Lalu ukur jarak setiap data ke garis itu.',
          add: [ln('mean', nx(7), 120, nx(7), 222, { sw: 2.5, dash: '6 4', c: 'acc' }), T('ml', 'rata-rata 7', nx(7), 105, { size: 14, c: 'acc' })],
        },
        {
          say: 'Kelompok A: jaraknya 2, 1, 0, 1, 2. Kelompok B: 4, 2, 0, 2, 4.',
          add: [...A.filter((v) => v !== 7).map((v, i) => ln(`da${i}`, nx(v), 150, nx(7), 150, { sw: 3, c: 'pos', z: -1 })), ...B.filter((v) => v !== 7).map((v, i) => ln(`db${i}`, nx(v), 195, nx(7), 195, { sw: 3, c: 'neg', z: -1 }))],
        },
        {
          say: 'Rata-rata jarak itu disebut simpangan rata-rata. A: 6 dibagi 5, yaitu 1,2. B: 12 dibagi 5, yaitu 2,4. B dua kali lebih menyebar.',
          add: [tag('sa', 'SR A = 6 ÷ 5 = 1,2', 105, 40, 'pos', 15), tag('sb', 'SR B = 12 ÷ 5 = 2,4', 295, 40, 'neg', 15)],
        },
      ],
    },
    {
      title: 'Ragam: rata-rata luas persegi',
      steps: [
        {
          say: 'Cara lain yang lebih sering dipakai: kuadratkan setiap jarak. Bayangkan setiap jarak sebagai sisi persegi. Ini untuk kelompok B.',
          clear: true,
          add: [NL.el, ...dots('b', B, 230, 'neg'), ln('mean', nx(7), 90, nx(7), 230, { sw: 2.5, dash: '6 4', c: 'acc' })],
        },
        {
          say: 'Data 3 berjarak 4, perseginya 4 kali 4, luasnya 16. Data 11 juga 16. Data 5 dan 9 masing-masing 4. Data 7 nol.',
          add: [
            box('s0', nx(3) + (2 * UNIT), 230 - 2 * UNIT, 4 * UNIT, 4 * UNIT, { r: 0, fill: 'neg-soft', stroke: 'neg', sw: 2, z: -2 }),
            box('s4', nx(11) - (2 * UNIT), 230 - 2 * UNIT, 4 * UNIT, 4 * UNIT, { r: 0, fill: 'neg-soft', stroke: 'neg', sw: 2, z: -2, dash: '5 4' }),
            T('l0', '16', nx(4), 230 - 3 * UNIT, { size: 18, c: 'neg' }),
            T('l4', '16', nx(10), 230 - 3 * UNIT, { size: 18, c: 'neg' }),
            box('s1', nx(5) + UNIT, 230 - UNIT, 2 * UNIT, 2 * UNIT, { r: 0, fill: 'acc-soft', stroke: 'ink', sw: 1.5, label: '4', lsize: 15, z: -1 }),
            box('s3', nx(9) - UNIT, 230 - UNIT, 2 * UNIT, 2 * UNIT, { r: 0, fill: 'acc-soft', stroke: 'ink', sw: 1.5, label: '4', lsize: 15, z: -1 }),
          ],
        },
        {
          say: 'Rata-rata luas persegi itu disebut ragam atau varians. Ragam B: 16 tambah 4 tambah 0 tambah 4 tambah 16, dibagi 5, sama dengan 8.',
          add: [tag('r', 'ragam B = (16 + 4 + 0 + 4 + 16) ÷ 5 = 8', 200, 30, 'neg', 15)],
        },
        {
          say: 'Untuk kelompok A, perseginya 4, 1, 0, 1, 4. Ragamnya 10 dibagi 5, yaitu 2.',
          add: [tag('ra', 'ragam A = (4 + 1 + 0 + 1 + 4) ÷ 5 = 2', 200, 58, 'pos', 15)],
        },
      ],
    },
    {
      title: 'Simpangan baku',
      steps: [
        {
          say: 'Ragam memakai satuan kuadrat. Supaya kembali ke satuan semula, ambil akarnya. Hasilnya disebut simpangan baku.',
          clear: true,
          add: [T('f1', 'ragam = rata-rata dari (x − x̄)²', 200, 60, { size: 20 }), T('f2', 'simpangan baku = √ragam', 200, 100, { size: 22, c: 'pos' })],
        },
        {
          say: 'Simpangan baku A: akar 2, kira-kira 1,41. Simpangan baku B: akar 8, kira-kira 2,83. Semakin besar simpangan baku, semakin menyebar datanya.',
          add: [T('a', 'A: √2 ≈ 1,41', 200, 165, { size: 24, c: 'pos' }), T('b', 'B: √8 ≈ 2,83', 200, 205, { size: 24, c: 'neg' })],
        },
        {
          say: 'Simpangan baku sering dipakai untuk menilai konsistensi, misalnya hasil panen, waktu tempuh, atau nilai ujian.',
          add: [T('c', 'kecil → rapat dan konsisten · besar → menyebar', 200, 260, { size: 15, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Data 1, 3, 5, 7. Rata-ratanya 4. Berapa ragamnya?',
          clear: true,
          add: [T('q', 'data: 1, 3, 5, 7    (rata-rata 4)', 200, 90, { size: 22 }), T('q2', 'ragam = ?', 200, 150, { size: 30, c: 'acc' })],
          ask: {
            options: [
              { t: '5', ok: true, why: 'Jarak 3, 1, 1, 3. Kuadratnya 9, 1, 1, 9. (9 + 1 + 1 + 9) ÷ 4 = 5.' },
              { t: '2', why: '2 adalah simpangan rata-rata (8 ÷ 4). Ragam memakai kuadrat jarak.' },
              { t: '20', why: '20 adalah jumlah kuadratnya. Bagi dengan 4.' },
              { t: '√5', why: '√5 adalah simpangan baku. Ragam belum diakarkan.' },
            ],
          },
        },
        {
          say: 'Jaraknya 3, 1, 1, 3. Kuadratnya 9, 1, 1, 9, jumlahnya 20. Dibagi 4, ragamnya 5. Simpangan bakunya akar 5.',
          add: [T('a', '(9 + 1 + 1 + 9) ÷ 4 = {g:5}', 200, 205, { size: 26 }), T('b', 'simpangan baku = √5 ≈ 2,24', 200, 250, { size: 20, c: 'mut' })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Simpangan rata-rata data 4, 6, 8 adalah … (boleh pecahan)',
      ans: ['4/3'],
      wrong: { '0': 'Jarak dihitung tanpa tanda negatif: 2, 0, 2.', '2': 'Jumlah jarak 4, dibagi banyak data 3.' },
      steps: ['Rata-rata 6. Jarak: 2, 0, 2.', 'SR = 4 ÷ 3.'],
    },
    {
      type: 'num',
      q: 'Ragam data 2, 4, 6, 8 adalah …',
      ans: ['5'],
      wrong: { '20': 'Bagi dengan banyak data, 4.', '2': 'Itu simpangan rata-rata. Ragam memakai kuadrat jarak.' },
      steps: ['Rata-rata 5. Jarak: 3, 1, 1, 3.', 'Ragam = (9 + 1 + 1 + 9) ÷ 4 = 5.'],
    },
    {
      type: 'num',
      q: 'Simpangan baku data 5, 5, 5, 5 adalah …',
      ans: ['0'],
      wrong: { '5': 'Semua data sama dengan rata-ratanya, jadi tidak ada simpangan.' },
      steps: ['Rata-rata 5, semua jarak 0.', 'Simpangan baku 0.'],
    },
    {
      type: 'num',
      q: 'Ragam suatu data adalah 9. Simpangan bakunya adalah …',
      ans: ['3'],
      wrong: { '81': 'Simpangan baku = akar ragam, bukan kuadratnya.', '4,5': 'Akar, bukan dibagi 2.' },
      steps: ['Simpangan baku = √ragam.', '√9 = 3.'],
    },
    {
      q: 'Dua kelompok punya rata-rata sama. Simpangan baku kelompok P = 1,5 dan Q = 4,2. Pernyataan yang benar adalah …',
      options: [
        { t: 'data P lebih konsisten daripada Q', ok: true },
        { t: 'data Q lebih konsisten daripada P', why: 'Simpangan baku besar berarti data lebih menyebar.' },
        { t: 'nilai Q lebih tinggi daripada P', why: 'Rata-ratanya sama. Simpangan baku tidak menunjukkan tinggi rendahnya nilai.' },
        { t: 'P dan Q sama sebarannya', why: 'Simpangan bakunya berbeda.' },
      ],
      steps: ['Simpangan baku kecil → data rapat di sekitar rata-rata.', 'P lebih konsisten.'],
    },
  ],
};

export default {
  id: 'k10b7',
  no: 7,
  title: 'Statistika',
  desc: 'Tabel distribusi frekuensi, histogram, rata-rata, median, dan modus data berkelompok, serta ragam dan simpangan baku.',
  lessons: [l1, l2, l3],
  extra: [
    {
      type: 'num',
      q: 'Rata-rata 10 data adalah 6. Jika ditambah satu data bernilai 17, rata-rata yang baru adalah …',
      ans: ['7'],
      wrong: { '11,5': 'Jumlah data lama 60. (60 + 17) ÷ 11 = 7.', '6': 'Data baru lebih besar, jadi rata-rata naik.' },
      steps: ['Jumlah lama = 10 × 6 = 60.', '(60 + 17) ÷ 11 = 7.'],
    },
    {
      q: 'Setiap data ditambah 5. Simpangan baku data yang baru …',
      options: [
        { t: 'tetap sama', ok: true },
        { t: 'bertambah 5', why: 'Semua data bergeser bersama, jarak ke rata-rata tidak berubah.' },
        { t: 'menjadi 5 kali lipat', why: 'Ditambah, bukan dikali.' },
        { t: 'berkurang 5', why: 'Sebarannya tidak berubah.' },
      ],
      steps: ['Rata-rata ikut bertambah 5.', 'Jarak setiap data ke rata-rata tetap, jadi simpangan baku tetap.'],
    },
    {
      type: 'num',
      q: 'Tabel tinggi badan: 150–154 (3), 155–159 (6), 160–164 (10), 165–169 (7), 170–174 (4). Banyak siswa dengan tinggi lebih dari 164,5 cm adalah …',
      ans: ['11'],
      wrong: { '21': 'Kelas 160–164 tidak termasuk. Hanya 7 + 4.', '4': 'Kelas 165–169 juga di atas 164,5.' },
      steps: ['Kelas di atas 164,5: 165–169 dan 170–174.', '7 + 4 = 11.'],
    },
  ],
};
