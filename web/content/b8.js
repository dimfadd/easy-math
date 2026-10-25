// Bab 8: Data dan Diagram
import { T, table, box } from './helpers.js';
import { ukuranLessons } from './b8x.js';

// Turus: kelompok empat garis tegak dicoret garis miring kelima
function tallyPath(n) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const g = Math.floor(i / 5);
    const k = i % 5;
    const x = g * 36;
    if (k < 4) d += `M${x + k * 7},-10 L${x + k * 7},10 `;
    else d += `M${x - 4},8 L${x + 25},-8 `;
  }
  return d.trim() || 'M0,0';
}
const tally = (id, n, x, y, o = {}) => ({ id, t: 'path', x, y, d: tallyPath(n), stroke: 'ink', sw: 2.5, ...o });

// Batang yang tumbuh: posisi sama dengan diagram 'bars'
function growBars(prefix, chart, { grown = false, cls = [] } = {}) {
  const { x, y, w, h, data, max } = chart;
  const gap = w / data.length;
  const bw = gap * 0.6;
  return data.map((d, i) =>
    box(`${prefix}${i}`, x - w / 2 + gap * (i + 0.5), y + h / 2, bw, (d.v / max) * h, { anchor: 'bottom', fill: cls[i] || 'pos', stroke: 'ink', sw: 1.5, r: 2, sy: grown ? 1 : 0, pop: false }),
  );
}

// ---------- 8.1 Data dan tabel frekuensi ----------
const RAW = ['Bola', 'Voli', 'Bola', 'Badminton', 'Basket', 'Bola', 'Voli', 'Badminton', 'Bola', 'Voli', 'Bola', 'Basket'];
const KINDS = ['Bola', 'Voli', 'Badminton', 'Basket'];
const rowY = (k) => 126 + k * 34;
const rawEl = (i, o = {}) => T(`w${i}`, RAW[i], 45 + (i % 6) * 62, 26 + Math.floor(i / 6) * 22, { size: 13, w: 700, ...o });
const countUpTo = (m) => KINDS.map((k) => RAW.slice(0, m).filter((x) => x === k).length);
const freqTable = (withFreq) =>
  table('tab', 200, 160, [['Olahraga', 'Turus', 'Frekuensi'], ...KINDS.map((k, i) => [k === 'Bola' ? 'Sepak bola' : k, '', withFreq ? String(countUpTo(12)[i]) : ''])], {
    cw: [120, 150, 90],
    rh: 34,
    size: 15,
    head: true,
  });
// turus baru muncul setelah ada minimal satu garis
const tallies = (m) => countUpTo(m).flatMap((c, i) => (c ? [tally(`ty${i}`, c, 160, rowY(i))] : []));

const l1 = {
  id: 'b8-1',
  title: 'Data dan Tabel Frekuensi',
  hook: 'Data mentah sulit dibaca. Dengan turus dan tabel frekuensi, jawabannya kelihatan dalam sekali lihat.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dua belas siswa ditanya olahraga favoritnya. Ini jawaban mereka. Olahraga apa yang paling banyak dipilih?',
          add: RAW.map((w, i) => T(`w${i}`, w, 75 + (i % 4) * 85, 80 + Math.floor(i / 4) * 50, { size: 18, w: 700 })),
          ask: {
            options: [
              { t: 'Sepak bola', ok: true, why: 'Sepak bola muncul 5 kali. Mari kita susun supaya lebih mudah dihitung.' },
              { t: 'Voli', why: 'Voli muncul 3 kali, sedangkan sepak bola 5 kali. Menghitung dari daftar acak memang mudah keliru.' },
              { t: 'Badminton', why: 'Badminton muncul 2 kali. Coba susun datanya dulu.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Jenis data',
      steps: [
        {
          say: 'Data seperti olahraga favorit berupa kategori atau nama. Ini disebut data kualitatif.',
          clear: true,
          add: [box('k1', 105, 150, 170, 170, { fill: 'pos-soft', r: 12 }), T('h1', 'Kualitatif', 105, 85, { size: 20, font: 'serif', w: 600 }), T('e1', 'olahraga favorit\nwarna kesukaan\njenis kendaraan', 105, 160, { size: 16, w: 700, lh: 1.6 })],
        },
        {
          say: 'Data yang berupa bilangan hasil menghitung atau mengukur disebut data kuantitatif, misalnya tinggi badan atau banyak saudara.',
          add: [box('k2', 295, 150, 170, 170, { fill: 'acc-soft', r: 12 }), T('h2', 'Kuantitatif', 295, 85, { size: 20, font: 'serif', w: 600 }), T('e2', 'tinggi badan\nbanyak saudara\nnilai ulangan', 295, 160, { size: 16, w: 700, lh: 1.6 })],
        },
      ],
    },
    {
      title: 'Turus',
      steps: [
        {
          say: 'Buat tabel. Lalu baca data satu per satu, dan beri satu garis turus di baris yang sesuai.',
          clear: true,
          add: [...RAW.map((_, i) => rawEl(i)), freqTable(false), ...tallies(0)],
        },
        { say: 'Empat data pertama: bola, voli, bola, badminton.', set: { ...Object.fromEntries([0, 1, 2, 3].map((i) => [`w${i}`, { c: 'mut', o: 0.45 }])) }, add: tallies(4), replace: true },
        { say: 'Empat berikutnya.', set: { ...Object.fromEntries([4, 5, 6, 7].map((i) => [`w${i}`, { c: 'mut', o: 0.45 }])) }, add: tallies(8), replace: true },
        {
          say: 'Empat terakhir. Garis kelima selalu dibuat miring mencoret empat garis sebelumnya, supaya mudah dihitung per lima.',
          set: { ...Object.fromEntries([8, 9, 10, 11].map((i) => [`w${i}`, { c: 'mut', o: 0.45 }])) },
          add: tallies(12),
          replace: true,
          pulse: ['ty0'],
        },
      ],
    },
    {
      title: 'Tabel frekuensi',
      steps: [
        {
          say: 'Hitung turus di setiap baris, lalu tulis di kolom frekuensi. Sepak bola 5, voli 3, badminton 2, basket 2.',
          set: { tab: { rows: freqTable(true).rows } },
        },
        {
          say: 'Jumlah semua frekuensi harus sama dengan banyak data: 5 tambah 3 tambah 2 tambah 2 sama dengan 12. Sepak bola paling banyak dipilih.',
          set: { tab: { hl: [[1, 2]] } },
          add: [T('sum', '5 + 3 + 2 + 2 = 12 data', 200, 278, { size: 18, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari tabel ini, berapa siswa yang tidak memilih sepak bola?',
          clear: true,
          add: [freqTable(true)],
          ask: {
            options: [
              { t: '7', ok: true, why: '12 − 5 = 7, atau 3 + 2 + 2.' },
              { t: '5', why: '5 adalah banyak siswa yang memilih sepak bola.' },
              { t: '12', why: '12 adalah banyak semua siswa.' },
            ],
          },
        },
        { say: 'Yang tidak memilih sepak bola: voli, badminton, dan basket. 3 tambah 2 tambah 2 sama dengan 7.', add: [T('r', '3 + 2 + 2 = 7 siswa', 200, 278, { size: 20, c: 'pos' })] },
      ],
    },
  ],
  quiz: [
    {
      q: 'Data berikut yang termasuk data kualitatif (kategori) adalah …',
      options: [
        { t: 'warna kesukaan siswa', ok: true },
        { t: 'tinggi badan siswa', why: 'Tinggi badan berupa bilangan hasil mengukur, jadi kuantitatif.' },
        { t: 'banyak saudara kandung', why: 'Banyak saudara berupa bilangan hasil menghitung, jadi kuantitatif.' },
        { t: 'nilai ulangan matematika', why: 'Nilai ulangan berupa bilangan, jadi kuantitatif.' },
      ],
      steps: ['Kualitatif: berupa kategori atau nama.', 'Warna kesukaan berupa nama warna.'],
    },
    {
      q: 'Turus pada gambar menunjukkan bilangan …',
      fig: [tally('t', 13, 120, 150, { sw: 3 })],
      viewBox: '100 125 140 50',
      figLabel: 'Dua kelompok turus lima dan tiga garis tegak',
      options: [
        { t: '13', ok: true },
        { t: '11', why: 'Setiap kelompok yang dicoret miring bernilai 5, termasuk garis miringnya.' },
        { t: '15', why: 'Kelompok ketiga hanya berisi 3 garis, belum 5.' },
        { t: '3', why: 'Dua kelompok yang dicoret masing-masing bernilai 5.' },
      ],
      steps: ['Dua kelompok berisi 5: 10.', 'Ditambah 3 garis: 13.'],
    },
    {
      type: 'num',
      q: 'Tabel frekuensi nilai ulangan: nilai 6 ada 4 siswa, nilai 7 ada 9 siswa, nilai 8 ada 7 siswa, nilai 9 ada 5 siswa, dan nilai 10 ada 3 siswa. Banyak siswa seluruhnya adalah …',
      ans: ['28'],
      wrong: { '40': 'Itu jumlah nilainya (6 + 7 + 8 + 9 + 10). Banyak siswa adalah jumlah frekuensinya.', '5': 'Ada 5 macam nilai, tapi banyak siswanya adalah jumlah frekuensi.' },
      steps: ['Jumlahkan frekuensi: 4 + 9 + 7 + 5 + 3.', '= 28 siswa.'],
    },
    {
      q: 'Dari tabel pada soal sebelumnya (nilai 6: 4 siswa, 7: 9, 8: 7, 9: 5, 10: 3), banyak siswa yang nilainya lebih dari 8 adalah …',
      options: [
        { t: '8', ok: true },
        { t: '15', why: '"Lebih dari 8" tidak termasuk nilai 8. Hanya nilai 9 dan 10.' },
        { t: '3', why: 'Nilai 9 juga lebih dari 8.' },
        { t: '2', why: 'Yang dihitung banyak siswanya, bukan banyak macam nilainya.' },
      ],
      steps: ['Lebih dari 8: nilai 9 dan 10.', '5 + 3 = 8 siswa.'],
    },
    {
      q: 'Untuk mengetahui ukuran sepatu yang paling banyak dipakai siswa kelas 7, data yang perlu dikumpulkan adalah …',
      options: [
        { t: 'ukuran sepatu setiap siswa kelas 7', ok: true },
        { t: 'merek sepatu setiap siswa kelas 7', why: 'Merek tidak memberi tahu ukuran.' },
        { t: 'harga sepatu setiap siswa kelas 7', why: 'Harga tidak berkaitan dengan ukuran.' },
        { t: 'ukuran sepatu guru di sekolah', why: 'Yang ingin diketahui adalah siswa kelas 7, bukan guru.' },
      ],
      steps: ['Data harus menjawab pertanyaan: ukuran sepatu, dari siswa kelas 7.'],
    },
  ],
};

// ---------- 8.2 Diagram batang dan garis ----------
const SPORT = { x: 215, y: 140, w: 280, h: 170, max: 6, data: [{ l: 'Bola', v: 5 }, { l: 'Voli', v: 3 }, { l: 'Badminton', v: 2 }, { l: 'Basket', v: 2 }] };
const GROW = { l: 'Minggu', data: [2, 5, 9, 12, 14, 15].map((v, i) => ({ l: String(i + 1), v })) };
const PERPUS = [{ l: 'Sen', v: 12 }, { l: 'Sel', v: 8 }, { l: 'Rab', v: 15 }, { l: 'Kam', v: 10 }, { l: 'Jum', v: 5 }];

const l2 = {
  id: 'b8-2',
  title: 'Diagram Batang dan Diagram Garis',
  hook: 'Grafik bisa menipu. Kalau sumbunya tidak mulai dari nol, selisih kecil terlihat raksasa.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Penjualan toko A 85 buah, toko B 90 buah. Di diagram ini, batang B tampak hampir dua kali batang A. Apakah penjualan B hampir dua kali A?',
          add: [{ id: 'g', t: 'bars', x: 215, y: 140, w: 220, h: 170, min: 80, max: 90, tick: 2, data: [{ l: 'Toko A', v: 85 }, { l: 'Toko B', v: 90 }], vals: true }],
          ask: {
            options: [
              { t: 'Tidak, hanya selisih 5', ok: true, why: 'Sumbunya dimulai dari 80, bukan 0.' },
              { t: 'Ya, terlihat dari batangnya', why: 'Perhatikan sumbunya: dimulai dari 80. Selisih sebenarnya hanya 5 dari 85.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Grafik yang menipu',
      steps: [
        {
          say: 'Di kiri, sumbu dimulai dari 80. Di kanan, sumbu dimulai dari 0. Datanya sama persis, tapi kesannya sangat berbeda.',
          clear: true,
          add: [
            { id: 'g1', t: 'bars', x: 120, y: 150, w: 140, h: 160, min: 80, max: 90, tick: 2, data: [{ l: 'A', v: 85 }, { l: 'B', v: 90 }], fc: 'neg' },
            { id: 'g2', t: 'bars', x: 305, y: 150, w: 140, h: 160, max: 90, tick: 15, data: [{ l: 'A', v: 85 }, { l: 'B', v: 90 }] },
            T('t1', 'mulai dari 80', 120, 272, { size: 15, c: 'neg' }),
            T('t2', 'mulai dari 0', 305, 272, { size: 15, c: 'pos' }),
          ],
        },
        { say: 'Saat membaca diagram batang, selalu cek dulu angka di sumbu tegak.', hl: ['g1'] },
      ],
    },
    {
      title: 'Membuat diagram batang',
      steps: [
        {
          say: 'Sekarang buat diagram batang dari data olahraga tadi. Sumbu mendatar berisi kategori, sumbu tegak berisi frekuensi, dimulai dari 0.',
          clear: true,
          add: [{ id: 'ax', t: 'bars', ...SPORT, data: SPORT.data.map((d) => ({ ...d, show: 0 })) }, ...growBars('bar', SPORT), T('ly', 'banyak siswa', 82, 40, { size: 14, c: 'mut' })],
        },
        {
          say: 'Tinggi setiap batang sesuai frekuensinya. Lebar batang sama, dan jaraknya sama.',
          set: Object.fromEntries(SPORT.data.map((_, i) => [`bar${i}`, { sy: 1 }])),
        },
        {
          say: 'Dari diagram ini langsung terlihat: sepak bola paling tinggi. Selisih sepak bola dan voli 2 siswa.',
          add: [T('n', 'Bola 5, Voli 3: selisih 2', 260, 66, { size: 16, c: 'pos' })],
          hl: ['bar0'],
        },
      ],
    },
    {
      title: 'Diagram garis',
      steps: [
        {
          say: 'Untuk data yang berubah dari waktu ke waktu, diagram garis lebih tepat. Ini tinggi tanaman setiap minggu, dalam sentimeter.',
          clear: true,
          add: [{ id: 'g', t: 'lines', x: 215, y: 140, w: 280, h: 170, max: 16, tick: 4, vals: true, data: GROW.data }, T('ly', 'tinggi (cm)', 82, 40, { size: 14, c: 'mut' }), T('lx', 'minggu ke-', 215, 262, { size: 14, c: 'mut' })],
        },
        {
          say: 'Garis yang paling curam menunjukkan kenaikan paling cepat: dari minggu ke-2 ke minggu ke-3, naik 4 sentimeter.',
          add: [T('n', 'minggu 2 → 3: naik 4 cm', 270, 205, { size: 16, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Dari diagram garis ini, antara minggu ke berapa tanaman tumbuh paling lambat?',
          clear: true,
          add: [{ id: 'g', t: 'lines', x: 215, y: 140, w: 280, h: 170, max: 16, tick: 4, vals: true, data: GROW.data }, T('lx', 'minggu ke-', 215, 262, { size: 14, c: 'mut' })],
          ask: {
            options: [
              { t: 'Minggu 5 ke 6', ok: true, why: 'Hanya naik 1 cm, garisnya paling landai.' },
              { t: 'Minggu 1 ke 2', why: 'Dari 2 ke 5 cm naik 3 cm. Cari garis yang paling landai.' },
              { t: 'Minggu 2 ke 3', why: 'Itu justru yang paling cepat (naik 4 cm).' },
            ],
          },
        },
        { say: 'Dari minggu ke-5 ke minggu ke-6 hanya naik 1 sentimeter. Garisnya paling landai.', add: [T('n', 'minggu 5 → 6: naik 1 cm', 280, 200, { size: 16, c: 'pos' })] },
      ],
    },
  ],
  quiz: [
    {
      q: 'Diagram batang menunjukkan banyak pengunjung perpustakaan. Hari dengan pengunjung paling sedikit adalah …',
      fig: [{ id: 'g', t: 'bars', x: 215, y: 140, w: 280, h: 170, max: 15, tick: 5, data: PERPUS }],
      viewBox: '30 40 360 230',
      figLabel: 'Diagram batang pengunjung: Senin 12, Selasa 8, Rabu 15, Kamis 10, Jumat 5',
      options: [
        { t: 'Jumat', ok: true },
        { t: 'Selasa', why: 'Batang Selasa (8) masih lebih tinggi dari Jumat (5).' },
        { t: 'Rabu', why: 'Rabu adalah yang paling banyak.' },
        { t: 'Kamis', why: 'Kamis 10, lebih banyak dari Jumat.' },
      ],
      steps: ['Cari batang yang paling pendek: Jumat (5 pengunjung).'],
    },
    {
      type: 'num',
      q: 'Dari diagram yang sama (Senin 12, Selasa 8, Rabu 15, Kamis 10, Jumat 5), selisih pengunjung hari Rabu dan Selasa adalah …',
      ans: ['7'],
      wrong: { '23': 'Itu jumlahnya. Selisih berarti dikurangkan: 15 − 8.' },
      steps: ['Rabu 15, Selasa 8.', 'Selisih: 15 − 8 = 7.'],
    },
    {
      type: 'num',
      q: 'Dari diagram yang sama, jumlah pengunjung selama lima hari adalah …',
      ans: ['50'],
      wrong: { '15': 'Itu pengunjung terbanyak dalam sehari. Jumlahkan kelima hari.', '5': 'Ada 5 hari, tapi yang ditanya jumlah pengunjungnya.' },
      steps: ['12 + 8 + 15 + 10 + 5 = 50.'],
    },
    {
      q: 'Diagram yang paling tepat untuk menunjukkan perubahan berat badan bayi setiap bulan adalah …',
      options: [
        { t: 'diagram garis', ok: true },
        { t: 'diagram lingkaran', why: 'Diagram lingkaran untuk bagian dari keseluruhan, bukan perubahan dari waktu ke waktu.' },
        { t: 'diagram batang', why: 'Diagram batang bisa dipakai, tapi diagram garis lebih jelas menunjukkan naik-turun dari waktu ke waktu.' },
        { t: 'tabel turus', why: 'Turus dipakai untuk mencacah data, bukan menunjukkan perubahan.' },
      ],
      steps: ['Data berubah seiring waktu: diagram garis paling tepat.'],
    },
    {
      q: 'Diagram garis menunjukkan banyak buku yang dipinjam: Januari 20, Februari 25, Maret 22, April 30, Mei 28. Penurunan terjadi pada …',
      fig: [{ id: 'g', t: 'lines', x: 215, y: 140, w: 280, h: 170, max: 30, tick: 5, vals: true, data: [{ l: 'Jan', v: 20 }, { l: 'Feb', v: 25 }, { l: 'Mar', v: 22 }, { l: 'Apr', v: 30 }, { l: 'Mei', v: 28 }] }],
      viewBox: '30 30 360 240',
      figLabel: 'Diagram garis buku dipinjam Januari sampai Mei',
      options: [
        { t: 'Februari ke Maret dan April ke Mei', ok: true },
        { t: 'Maret ke April', why: 'Dari 22 ke 30 itu naik.' },
        { t: 'hanya April ke Mei', why: 'Februari ke Maret juga turun (25 ke 22).' },
        { t: 'Januari ke Februari', why: 'Dari 20 ke 25 itu naik.' },
      ],
      steps: ['Garis turun: Februari (25) ke Maret (22), dan April (30) ke Mei (28).'],
    },
  ],
};

// ---------- 8.3 Diagram lingkaran ----------
const PIE = { values: [5, 3, 2, 2], cls: ['pos', 'neg', 'acc', 'ok'], names: ['Bola', 'Voli', 'Badminton', 'Basket'] };

const l3 = {
  id: 'b8-3',
  title: 'Diagram Lingkaran',
  hook: 'Diagram lingkaran menunjukkan bagian dari keseluruhan. Kuncinya: satu lingkaran penuh = 360° = 100%.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dari 40 siswa, 10 suka voli. Kalau dibuat diagram lingkaran, berapa derajat juring voli?',
          add: [T('q', '10 dari 40 siswa', 200, 110, { size: 32 }), T('q2', 'juring voli = ? derajat', 200, 165, { size: 22, w: 700 })],
          ask: {
            options: [
              { t: '90°', ok: true, why: '10/40 = 1/4 lingkaran, dan 1/4 × 360° = 90°.' },
              { t: '10°', why: 'Banyak siswa bukan besar sudut. 10 dari 40 adalah seperempat lingkaran.' },
              { t: '25°', why: '25 adalah persennya (25%). Sudutnya 25% × 360°.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Bagian dari keseluruhan',
      steps: [
        {
          say: 'Satu lingkaran penuh mewakili semua data: 12 siswa. Sepak bola dipilih 5 dari 12 siswa.',
          clear: true,
          add: [{ id: 'pie', t: 'pie', x: 118, y: 150, r: 90, values: [5], total: 12, cls: PIE.cls, labels: ['Bola'] }, T('l0', '{p:Bola}: 5 dari 12', 228, 80, { size: 16, a: 'start' })],
        },
        { say: 'Voli 3 dari 12.', set: { pie: { values: [5, 3], labels: ['Bola', 'Voli'] } }, add: [T('l1', '{n:Voli}: 3 dari 12', 228, 115, { size: 16, a: 'start' })] },
        {
          say: 'Badminton 2, basket 2. Semua bagian menutup lingkaran penuh.',
          set: { pie: { values: PIE.values, labels: ['Bola', 'Voli', 'Bdm', 'Bskt'] } },
          add: [T('l2', '{a:Badminton}: 2 dari 12', 228, 150, { size: 16, a: 'start' }), T('l3', '{g:Basket}: 2 dari 12', 228, 185, { size: 16, a: 'start' })],
        },
      ],
    },
    {
      title: 'Menghitung sudut',
      steps: [
        {
          say: 'Besar sudut juring sama dengan bagiannya dikali 360 derajat. Sepak bola: 5 per 12 kali 360, yaitu 150 derajat.',
          clear: true,
          add: [
            table(
              'tab',
              200,
              150,
              [
                ['Olahraga', 'Banyak', 'Sudut juring'],
                ['Bola', '5', '5/12 × 360° = 150°'],
                ['Voli', '3', '3/12 × 360° = 90°'],
                ['Badminton', '2', '2/12 × 360° = 60°'],
                ['Basket', '2', '2/12 × 360° = 60°'],
                ['Jumlah', '12', '360°'],
              ],
              { cw: [100, 70, 180], rh: 34, size: 15, head: true },
            ),
          ],
        },
        { say: 'Jumlah semua sudut harus 360 derajat. Kalau tidak, ada yang salah hitung.', set: { tab: { hl: [[5, 2]] } } },
      ],
    },
    {
      title: 'Dari persen',
      steps: [
        {
          say: 'Kalau datanya dalam persen, ingat: 100 persen sama dengan 360 derajat. Jadi 1 persen sama dengan 3,6 derajat.',
          clear: true,
          add: [T('a', '100% = 360°', 200, 60, { size: 30 }), T('b', '1% = 3,6°', 200, 105, { size: 24, c: 'mut' })],
        },
        {
          say: '25 persen sama dengan 90 derajat. 50 persen sama dengan 180 derajat. 10 persen sama dengan 36 derajat.',
          add: [
            { id: 'p1', t: 'pie', x: 80, y: 200, r: 45, values: [25], total: 100, cls: ['acc'] },
            T('t1', '25% = 90°', 80, 268, { size: 16 }),
            { id: 'p2', t: 'pie', x: 200, y: 200, r: 45, values: [50], total: 100, cls: ['pos'] },
            T('t2', '50% = 180°', 200, 268, { size: 16 }),
            { id: 'p3', t: 'pie', x: 320, y: 200, r: 45, values: [10], total: 100, cls: ['neg'] },
            T('t3', '10% = 36°', 320, 268, { size: 16 }),
          ],
        },
      ],
    },
    {
      title: 'Membaca diagram',
      steps: [
        {
          say: 'Diagram ini menunjukkan cara 200 siswa berangkat ke sekolah. Berapa siswa yang naik motor?',
          clear: true,
          add: [{ id: 'pie', t: 'pie', x: 130, y: 150, r: 100, values: [30, 25, 35, 10], cls: ['pos', 'acc', 'neg', 'ok'], labels: ['30%', '25%', '35%', '10%'], lsize: 14 }, T('l0', '{p:■} jalan kaki', 255, 90, { size: 16, a: 'start' }), T('l1', '{a:■} sepeda', 255, 120, { size: 16, a: 'start' }), T('l2', '{n:■} motor', 255, 150, { size: 16, a: 'start' }), T('l3', '{g:■} bus', 255, 180, { size: 16, a: 'start' })],
        },
        { say: 'Motor 35 persen dari 200: 35 per 100 kali 200, yaitu 70 siswa.', add: [T('r', 'motor: 35% × 200', 248, 222, { size: 17, c: 'neg', a: 'start' }), T('r2', '= 70 siswa', 248, 250, { size: 17, c: 'neg', a: 'start' })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Diagram lingkaran menggambarkan 120 siswa. Juring basket besarnya 72 derajat. Berapa siswa yang memilih basket?',
          clear: true,
          add: [{ id: 'pie', t: 'pie', x: 112, y: 150, r: 82, values: [72], total: 360, cls: ['ok'], labels: ['72°'] }, T('q', 'total 120 siswa', 212, 120, { size: 19, a: 'start' }), T('q2', 'basket = ?', 212, 160, { size: 19, c: 'mut', a: 'start' })],
          ask: {
            options: [
              { t: '24 siswa', ok: true, why: '72/360 = 1/5, dan 1/5 × 120 = 24.' },
              { t: '72 siswa', why: '72 adalah besar sudutnya, bukan banyak siswa.' },
              { t: '20 siswa', why: '72/360 = 1/5, jadi 120 ÷ 5 = 24.' },
            ],
          },
        },
        { say: '72 per 360 sama dengan seperlima. Seperlima dari 120 adalah 24 siswa.', set: { q2: { text: '72/360 × 120 = 24', c: 'ok' } } },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Dari 36 siswa, 9 siswa memilih IPA. Besar sudut juring IPA pada diagram lingkaran adalah …°',
      ans: ['90'],
      wrong: { '9': 'Banyak siswa bukan besar sudut. 9/36 × 360°.', '25': 'Itu persennya. Sudutnya 25% × 360°.' },
      steps: ['9/36 = 1/4.', '1/4 × 360° = 90°.'],
    },
    {
      type: 'num',
      q: 'Juring yang mewakili 20% besarnya …°',
      ans: ['72'],
      wrong: { '20': 'Persen perlu diubah ke derajat: 20% × 360°.', '36': '10% = 36°, jadi 20% = 72°.' },
      steps: ['20% × 360° = 20/100 × 360°.', '= 72°.'],
    },
    {
      q: 'Diagram lingkaran menggambarkan 60 siswa: juring A 90°, juring B 120°, dan juring C 150°. Banyak siswa pada kelompok C adalah …',
      fig: [{ id: 'pie', t: 'pie', x: 200, y: 150, r: 90, values: [90, 120, 150], cls: ['pos', 'acc', 'ok'], labels: ['A 90°', 'B 120°', 'C 150°'], lsize: 13 }],
      viewBox: '100 55 200 190',
      figLabel: 'Diagram lingkaran dengan juring A 90 derajat, B 120 derajat, C 150 derajat',
      options: [
        { t: '25 siswa', ok: true },
        { t: '150 siswa', why: '150 adalah besar sudutnya. Banyak siswa = 150/360 × 60.' },
        { t: '20 siswa', why: '20 siswa adalah kelompok B (120°).' },
        { t: '15 siswa', why: '15 siswa adalah kelompok A (90°).' },
      ],
      steps: ['C = 150/360 × 60.', '= 5/12 × 60 = 25 siswa.'],
    },
    {
      q: 'Data berikut yang paling tidak cocok disajikan dengan diagram lingkaran adalah …',
      options: [
        { t: 'suhu udara setiap jam dalam sehari', ok: true },
        { t: 'persentase siswa berdasarkan hobi', why: 'Ini bagian dari keseluruhan, cocok untuk diagram lingkaran.' },
        { t: 'pembagian uang saku untuk berbagai keperluan', why: 'Ini bagian dari keseluruhan uang saku, cocok untuk diagram lingkaran.' },
        { t: 'komposisi jenis kendaraan di parkiran', why: 'Ini bagian dari keseluruhan kendaraan, cocok untuk diagram lingkaran.' },
      ],
      steps: ['Diagram lingkaran untuk bagian dari keseluruhan.', 'Suhu per jam adalah perubahan dari waktu ke waktu, lebih cocok diagram garis.'],
    },
    {
      q: 'Sebuah desa berpenduduk 800 orang. Petani 40%, pedagang 25%, PNS 15%, dan sisanya bekerja di bidang lain. Banyak penduduk yang bekerja di bidang lain adalah …',
      options: [
        { t: '160 orang', ok: true },
        { t: '20 orang', why: '20% adalah persennya. 20% dari 800 = 160.' },
        { t: '640 orang', why: 'Itu 80% (petani + pedagang + PNS). Bidang lain 100% − 80% = 20%.' },
        { t: '200 orang', why: '200 orang adalah 25% (pedagang).' },
      ],
      steps: ['Bidang lain: 100% − 40% − 25% − 15% = 20%.', '20% × 800 = 160 orang.'],
    },
  ],
};

export default {
  id: 'b8',
  no: 8,
  title: 'Data dan Diagram',
  desc: 'Jenis data, tabel frekuensi, diagram batang, garis, dan lingkaran, serta rata-rata, median, dan modus.',
  lessons: [l1, l2, l3, ...ukuranLessons],
  extra: [
    {
      q: 'Pada sebuah diagram batang, sumbu tegaknya dimulai dari 50, bukan dari 0. Akibatnya …',
      options: [
        { t: 'selisih antarbatang tampak lebih besar daripada kenyataannya', ok: true },
        { t: 'datanya menjadi salah', why: 'Datanya tetap benar, tapi tampilannya bisa menyesatkan.' },
        { t: 'semua batang tampak sama tinggi', why: 'Justru perbedaannya tampak dibesar-besarkan.' },
        { t: 'tidak ada pengaruhnya', why: 'Batang yang dipotong bagian bawahnya membuat perbandingan tinggi batang tidak lagi sesuai data.' },
      ],
      steps: ['Bagian bawah batang (0 sampai 50) tidak digambar.', 'Selisih kecil jadi tampak besar.'],
    },
    {
      type: 'num',
      q: 'Pada diagram lingkaran, 25% siswa naik sepeda, yaitu 45 siswa. Banyak siswa seluruhnya adalah …',
      ans: ['180'],
      wrong: { '11.25': '45 adalah 25% dari total, jadi total = 45 × 4.', '70': 'Persen tidak dijumlahkan dengan banyak siswa. 25% = 1/4, jadi total = 4 × 45.' },
      steps: ['25% = 1/4 dari seluruh siswa.', 'Total = 4 × 45 = 180 siswa.'],
    },
    {
      q: 'Hasil ulangan: 6 siswa mendapat 70, 10 siswa mendapat 80, dan 4 siswa mendapat 90. Jika dibuat diagram lingkaran, besar sudut juring nilai 80 adalah …',
      options: [
        { t: '180°', ok: true },
        { t: '80°', why: '80 adalah nilainya. Sudut juring = 10/20 × 360°.' },
        { t: '10°', why: '10 adalah banyak siswanya. Sudut juring = 10/20 × 360°.' },
        { t: '144°', why: 'Total siswa 6 + 10 + 4 = 20, bukan 25.' },
      ],
      steps: ['Total siswa: 6 + 10 + 4 = 20.', 'Juring nilai 80: 10/20 × 360° = 180°.'],
    },
  ],
};
