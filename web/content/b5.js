// Bab 5: Rasio dan Perbandingan
import { T, box, ln, eqRow, table, range } from './helpers.js';

const kotak = (id, x, y, fill, o = {}) => box(id, x, y, 44, 34, { fill, r: 4, ...o });
const bead = (id, x, y, c) => ({ id, t: 'circle', x, y, r: 9, fill: c, stroke: 'ink', sw: 1.5 });

// ---------- 5.1 Rasio ----------
const GX = [65, 155, 245, 335];
const group = (g, x) => [
  bead(`r${g}a`, x - 11, 92, 'neg'),
  bead(`r${g}b`, x + 11, 92, 'neg'),
  bead(`b${g}a`, x - 22, 122, 'pos'),
  bead(`b${g}b`, x, 122, 'pos'),
  bead(`b${g}c`, x + 22, 122, 'pos'),
  box(`g${g}`, x, 107, 74, 64, { fill: 'none', stroke: 'acc', dash: '5 4', r: 10 }),
];

const l1 = {
  id: 'b5-1',
  title: 'Rasio',
  hook: 'Rasio merah dan biru 2 : 3, totalnya 20. Bukan berarti 10 merah dan 10 biru.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Rasio kelereng merah dan biru adalah 2 banding 3. Totalnya 20 kelereng. Berapa kelereng merah?',
          add: [T('q', 'merah : biru = 2 : 3', 200, 110, { size: 32 }), T('q2', 'total 20 kelereng, merah = ?', 200, 170, { size: 22, w: 700 })],
          ask: {
            options: [
              { t: '8', ok: true, why: 'Kita lihat dengan kelompok-kelompok kecil.' },
              { t: '10', why: 'Rasio 2 : 3 artinya merah lebih sedikit dari biru, jadi bukan setengah-setengah.' },
              { t: '12', why: '12 adalah banyak kelereng biru.' },
              { t: '4', why: '4 adalah isi satu bagian. Merah punya 2 bagian.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Arti rasio',
      steps: [
        {
          say: 'Rasio 2 banding 3 artinya: setiap ada 2 merah, ada 3 biru.',
          clear: true,
          add: [...group(0, GX[0]), T('r', 'setiap 2 merah ada 3 biru', 200, 200, { size: 20 })],
        },
        {
          say: 'Kelompok seperti ini diulang terus. Dengan 4 kelompok, ada 8 merah dan 12 biru, totalnya 20. Rasionya tetap 2 banding 3.',
          add: [...group(1, GX[1]), ...group(2, GX[2]), ...group(3, GX[3])],
          set: { r: { text: '4 kelompok: {n:8 merah}, {p:12 biru}, total 20' } },
        },
        { say: '8 banding 12 sama dengan 2 banding 3, karena keduanya dibagi 4.', add: [T('s', '8 : 12 = 2 : 3', 200, 245, { size: 28 })] },
      ],
    },
    {
      title: 'Model batang',
      steps: [
        {
          say: 'Cara yang lebih cepat: model batang. Merah 2 kotak, biru 3 kotak. Semua kotak isinya sama banyak.',
          clear: true,
          add: [
            T('lm', 'merah', 45, 90, { size: 17, c: 'neg' }),
            T('lb', 'biru', 45, 140, { size: 17, c: 'pos' }),
            kotak('m0', 110, 90, 'neg-soft'),
            kotak('m1', 156, 90, 'neg-soft'),
            kotak('k0', 110, 140, 'pos-soft'),
            kotak('k1', 156, 140, 'pos-soft'),
            kotak('k2', 202, 140, 'pos-soft'),
          ],
        },
        { say: 'Totalnya 5 kotak, dan 5 kotak itu berisi 20 kelereng. Jadi satu kotak berisi 4.', add: [T('tot', '5 kotak = 20', 312, 92, { size: 21 }), T('per', '1 kotak = 4', 312, 132, { size: 21, c: 'acc' })] },
        {
          say: 'Merah 2 kotak, jadi 8. Biru 3 kotak, jadi 12.',
          set: { m0: { label: '4' }, m1: { label: '4' }, k0: { label: '4' }, k1: { label: '4' }, k2: { label: '4' } },
          add: [T('a1', 'merah = 2 × 4 = {n:8}', 200, 210, { size: 24 }), T('a2', 'biru = 3 × 4 = {p:12}', 200, 250, { size: 24 })],
        },
      ],
    },
    {
      title: 'Menyederhanakan',
      steps: [
        { say: 'Rasio bisa disederhanakan seperti pecahan. 12 banding 18, bagi dengan FPB-nya, yaitu 6. Hasilnya 2 banding 3.', clear: true, add: [T('a', '12 : 18', 200, 70, { size: 34 }), T('b', '= (12 ÷ 6) : (18 ÷ 6) = 2 : 3', 200, 120, { size: 24 })] },
        {
          say: 'Hati-hati dengan satuan. 50 sentimeter banding 2 meter bukan 50 banding 2. Samakan satuannya dulu: 2 meter sama dengan 200 sentimeter. Jadi 50 banding 200, atau 1 banding 4.',
          add: [T('c', '50 cm : 2 m', 200, 180, { size: 30 }), T('d', '= 50 cm : 200 cm = 1 : 4', 200, 228, { size: 24 }), T('e', 'samakan satuan dulu', 200, 268, { size: 17, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Kalau yang diketahui selisihnya',
      steps: [
        {
          say: 'Rasio uang A dan B adalah 5 banding 3. Uang A lebih banyak 12 ribu rupiah. Berapa uang A?',
          clear: true,
          add: [T('lA', 'A', 50, 95, { size: 20 }), T('lB', 'B', 50, 145, { size: 20 }), ...range(0, 5).map((i) => kotak(`a${i}`, 100 + i * 46, 95, 'pos-soft')), ...range(0, 3).map((i) => kotak(`b${i}`, 100 + i * 46, 145, 'pos-soft'))],
        },
        {
          say: 'Selisihnya 2 kotak. 2 kotak itu bernilai 12 ribu, jadi satu kotak 6 ribu.',
          set: { a3: { fill: 'acc' }, a4: { fill: 'acc' } },
          add: [T('s', 'selisih 2 kotak = Rp12.000', 200, 200, { size: 20 }), T('s2', '1 kotak = Rp6.000', 200, 232, { size: 20 })],
        },
        {
          say: 'Uang A ada 5 kotak: 5 kali 6 ribu, yaitu 30 ribu rupiah.',
          set: { 'a*': { label: '6.000', lsize: 11 }, 'b*': { label: '6.000', lsize: 11 } },
          add: [T('res', 'A = 5 × 6.000 = {p:Rp30.000}', 200, 272, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Perbandingan siswa laki-laki dan perempuan 4 banding 5. Jumlah siswa 36. Berapa siswa perempuan?',
          clear: true,
          add: [T('q', 'laki-laki : perempuan = 4 : 5', 200, 110, { size: 26 }), T('q2', 'jumlah 36 siswa, perempuan = ?', 200, 165, { size: 20, w: 700 })],
          ask: {
            options: [
              { t: '20', ok: true, why: '9 kotak = 36, satu kotak 4, perempuan 5 kotak.' },
              { t: '16', why: '16 adalah banyak siswa laki-laki (4 kotak).' },
              { t: '18', why: 'Rasio 4 : 5 berarti tidak sama banyak.' },
              { t: '45', why: 'Totalnya 36, jadi perempuan pasti kurang dari 36.' },
            ],
          },
        },
        {
          say: 'Total 9 kotak sama dengan 36, jadi satu kotak 4. Perempuan 5 kotak, yaitu 20 siswa.',
          clear: true,
          add: [
            T('lL', 'L', 50, 95, { size: 20 }),
            T('lP', 'P', 50, 145, { size: 20 }),
            ...range(0, 4).map((i) => kotak(`l${i}`, 100 + i * 46, 95, 'pos-soft', { label: '4' })),
            ...range(0, 5).map((i) => kotak(`p${i}`, 100 + i * 46, 145, 'acc-soft', { label: '4' })),
            T('c', '9 kotak = 36, 1 kotak = 4', 200, 210, { size: 20 }),
            T('ans', 'perempuan = 5 × 4 = {p:20}', 200, 252, { size: 24 }),
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Bentuk paling sederhana dari 24 : 36 adalah …',
      options: [
        { t: '2 : 3', ok: true },
        { t: '4 : 6', why: 'Masih bisa disederhanakan, keduanya habis dibagi 2.' },
        { t: '3 : 2', why: 'Urutannya tertukar. Urutan rasio harus sama dengan urutan soal.' },
        { t: '6 : 9', why: 'Masih bisa disederhanakan, keduanya habis dibagi 3.' },
      ],
      steps: ['FPB dari 24 dan 36 adalah 12.', '24 ÷ 12 = 2 dan 36 ÷ 12 = 3. Jadi 2 : 3.'],
    },
    {
      q: 'Rasio 40 cm : 2 m dalam bentuk paling sederhana adalah …',
      options: [
        { t: '1 : 5', ok: true },
        { t: '20 : 1', why: 'Satuannya harus disamakan dulu: 2 m = 200 cm.' },
        { t: '40 : 2', why: 'Satuannya berbeda. Ubah 2 m menjadi 200 cm.' },
        { t: '1 : 50', why: '2 m = 200 cm, bukan 2.000 cm.' },
      ],
      steps: ['2 m = 200 cm.', '40 : 200 = 1 : 5.'],
    },
    {
      type: 'num',
      q: 'Rasio apel dan jeruk 3 : 7. Jumlah buah seluruhnya 50. Banyak jeruk adalah …',
      ans: ['35'],
      wrong: { '15': 'Itu banyak apel (3 bagian).', '21': 'Total ada 3 + 7 = 10 bagian, jadi satu bagian 50 ÷ 10 = 5.' },
      steps: ['Total bagian: 3 + 7 = 10.', 'Satu bagian: 50 ÷ 10 = 5.', 'Jeruk: 7 × 5 = 35.'],
    },
    {
      q: 'Rasio uang Dita dan Edo 7 : 4. Uang Dita Rp18.000 lebih banyak dari uang Edo. Uang Edo adalah …',
      options: [
        { t: 'Rp24.000', ok: true },
        { t: 'Rp42.000', why: 'Itu uang Dita (7 bagian).' },
        { t: 'Rp72.000', why: 'Rp18.000 adalah selisih 3 bagian, bukan 1 bagian. Satu bagian = Rp6.000.' },
        { t: 'Rp18.000', why: 'Rp18.000 adalah selisihnya, bukan uang Edo.' },
      ],
      steps: ['Selisih bagian: 7 − 4 = 3 bagian = Rp18.000.', 'Satu bagian: Rp6.000.', 'Edo: 4 × Rp6.000 = Rp24.000.'],
    },
    {
      q: 'Rasio panjang dan lebar sebuah persegi panjang 5 : 2. Kelilingnya 56 cm. Panjangnya adalah …',
      options: [
        { t: '20 cm', ok: true },
        { t: '40 cm', why: 'Keliling = 2 × (p + l), jadi p + l = 28, bukan 56.' },
        { t: '8 cm', why: 'Itu lebarnya.' },
        { t: '16 cm', why: 'p + l = 28 dibagi 7 bagian, satu bagian 4. Panjang 5 bagian.' },
      ],
      steps: ['p + l = 56 ÷ 2 = 28.', 'Total bagian 5 + 2 = 7, satu bagian = 4.', 'Panjang = 5 × 4 = 20 cm.'],
    },
  ],
};

// ---------- 5.2 Perbandingan senilai ----------
const l2 = {
  id: 'b5-2',
  title: 'Perbandingan Senilai',
  hook: 'Kalau 3 buku harganya Rp12.000, berapa 7 buku? Cari dulu harga satu buku.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Harga 3 buku 12 ribu rupiah. Berapa harga 7 buku?',
          add: [T('q', '3 buku = Rp12.000', 200, 110, { size: 32 }), T('q2', '7 buku = ?', 200, 170, { size: 28, c: 'mut' })],
          ask: {
            options: [
              { t: 'Rp28.000', ok: true, why: 'Satu buku Rp4.000, tujuh buku Rp28.000.' },
              { t: 'Rp16.000', why: 'Bukunya bertambah 4, tapi harga tidak bertambah Rp4.000. Hitung harga satu buku dulu.' },
              { t: 'Rp84.000', why: 'Ini 12.000 × 7. Rp12.000 adalah harga 3 buku, bukan 1 buku.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Cari harga satu',
      steps: [
        {
          say: 'Mulai dari yang diketahui: 3 buku, 12 ribu rupiah.',
          clear: true,
          add: [table('t', 170, 150, [['Buku', 'Harga'], ['3', 'Rp12.000']], { cw: [90, 130], rh: 40, size: 18, head: true })],
        },
        {
          say: 'Bagi 3: satu buku harganya 4 ribu rupiah.',
          set: { t: { rows: [['Buku', 'Harga'], ['3', 'Rp12.000'], ['1', 'Rp4.000']] } },
          add: [T('d', '÷ 3', 320, 150, { size: 20, c: 'acc' })],
        },
        {
          say: 'Kalikan 7: tujuh buku harganya 28 ribu rupiah.',
          set: { t: { rows: [['Buku', 'Harga'], ['3', 'Rp12.000'], ['1', 'Rp4.000'], ['7', 'Rp28.000']], hl: [[3, 1]] } },
          add: [T('m', '× 7', 320, 190, { size: 20, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Naik bersama',
      steps: [
        {
          say: 'Pada perbandingan senilai, kalau satu besaran naik, yang lain ikut naik dengan kelipatan yang sama. Harga dibagi banyak buku selalu sama, yaitu 4 ribu.',
          clear: true,
          add: [
            table(
              't',
              200,
              150,
              [
                ['Buku', 'Harga', 'Harga ÷ Buku'],
                ['1', '4.000', '4.000'],
                ['2', '8.000', '4.000'],
                ['3', '12.000', '4.000'],
                ['4', '16.000', '4.000'],
                ['5', '20.000', '4.000'],
              ],
              { cw: [80, 100, 140], rh: 34, size: 17, head: true },
            ),
          ],
        },
      ],
    },
    {
      title: 'Grafiknya lurus',
      steps: [
        {
          say: 'Kalau digambar, titik-titiknya membentuk garis lurus yang terus naik.',
          clear: true,
          add: [
            { id: 'g', t: 'lines', x: 215, y: 140, w: 280, h: 170, max: 20, tick: 4, vals: true, data: [1, 2, 3, 4, 5].map((n) => ({ l: String(n), v: 4 * n })) },
            T('ly', 'harga (ribu Rp)', 82, 38, { size: 14, c: 'mut' }),
            T('lx', 'banyak buku', 215, 262, { size: 14, c: 'mut' }),
          ],
        },
      ],
    },
    {
      title: 'Cara cepat',
      steps: [
        {
          say: 'Cara cepatnya: buat pecahan yang sama. 3 per 12000 sama dengan 7 per x.',
          clear: true,
          add: eqRow('a', 90, [[3, '12.000'], '=', [7, 'x']], { size: 30 }),
        },
        { say: 'Kali silang: 3x sama dengan 7 kali 12000, yaitu 84000. Jadi x sama dengan 28000.', add: [T('b', '3x = 7 × 12.000 = 84.000', 200, 170, { size: 24 }), T('c', 'x = {p:28.000}', 200, 225, { size: 30 })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Mobil menempuh 180 kilometer dengan 15 liter bensin. Untuk 240 kilometer, perlu berapa liter?',
          clear: true,
          add: [T('q', '180 km → 15 liter', 200, 110, { size: 30 }), T('q2', '240 km → ? liter', 200, 165, { size: 30, c: 'mut' })],
          ask: {
            options: [
              { t: '20 liter', ok: true, why: '1 liter untuk 12 km, jadi 240 ÷ 12 = 20.' },
              { t: '12 liter', why: 'Makin jauh perjalanannya, makin banyak bensin yang dipakai, jadi harus lebih dari 15 liter.' },
              { t: '75 liter', why: 'Tambahan jaraknya 60 km, bukan 60 liter. Cari dulu jarak per liter.' },
            ],
          },
        },
        {
          say: '180 dibagi 15 sama dengan 12. Jadi 1 liter untuk 12 kilometer. 240 dibagi 12 sama dengan 20 liter.',
          set: { q: { y: 70, size: 26 }, q2: { y: 110, size: 26 } },
          add: [T('a', '1 liter → 180 ÷ 15 = 12 km', 200, 175, { size: 22 }), T('b', '240 km → 240 ÷ 12 = {p:20 liter}', 200, 225, { size: 22 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Harga 5 kg beras Rp70.000. Harga 8 kg beras adalah Rp …',
      ans: ['112000'],
      numHint: 'Boleh ditulis 112000 atau 112.000.',
      wrong: { '73000': 'Beratnya bertambah 3 kg, tapi harga tidak bertambah Rp3.000. Hitung harga 1 kg: 70.000 ÷ 5.', '560000': 'Rp70.000 adalah harga 5 kg, bukan 1 kg.' },
      steps: ['1 kg: 70.000 ÷ 5 = 14.000.', '8 kg: 8 × 14.000 = 112.000.'],
    },
    {
      q: 'Tabel berikut menunjukkan perbandingan senilai. Nilai yang tepat untuk mengisi tanda tanya adalah …',
      fig: [table('t', 200, 150, [['x', '2', '5', '8'], ['y', '6', '15', '?']], { cw: [60, 70, 70, 70], rh: 40, size: 20, head: true })],
      viewBox: '40 100 320 100',
      figLabel: 'Tabel x: 2, 5, 8 dan y: 6, 15, tanda tanya',
      options: [
        { t: '24', ok: true },
        { t: '18', why: 'Pada perbandingan senilai, y ÷ x selalu sama: 6 ÷ 2 = 3. Jadi y = 3 × 8.' },
        { t: '21', why: 'Pola "ditambah 9 untuk tiap +3 di x" tidak berlaku umum. Gunakan y = 3x.' },
        { t: '16', why: 'y selalu 3 kali x, jadi untuk x = 8, y = 24.' },
      ],
      steps: ['y ÷ x = 6 ÷ 2 = 3, dan 15 ÷ 5 = 3.', 'Jadi y = 3x. Untuk x = 8, y = 24.'],
    },
    {
      q: 'Pasangan besaran berikut yang merupakan perbandingan senilai adalah …',
      options: [
        { t: 'Banyak bensin dan jarak tempuh', ok: true },
        { t: 'Banyak pekerja dan lama pekerjaan selesai', why: 'Makin banyak pekerja, makin cepat selesai. Satu naik, yang lain turun: itu berbalik nilai.' },
        { t: 'Kecepatan dan waktu tempuh', why: 'Makin cepat, makin singkat waktunya. Itu berbalik nilai.' },
        { t: 'Umur dan tinggi badan', why: 'Tinggi badan tidak naik dengan kelipatan yang sama setiap tahun, jadi bukan perbandingan senilai.' },
      ],
      steps: ['Senilai: kalau satu naik dua kali lipat, yang lain juga naik dua kali lipat.', 'Bensin dua kali lipat, jarak tempuh juga dua kali lipat.'],
    },
    {
      q: 'Resep kue untuk 4 porsi membutuhkan 300 g tepung. Untuk 10 porsi dibutuhkan tepung …',
      options: [
        { t: '750 g', ok: true },
        { t: '1.200 g', why: '300 g untuk 4 porsi, bukan 1 porsi. Satu porsi = 75 g.' },
        { t: '450 g', why: 'Hitung per porsi dulu: 300 ÷ 4 = 75 g, lalu × 10.' },
        { t: '3.000 g', why: '300 g untuk 4 porsi, jadi tidak dikali 10 langsung.' },
      ],
      steps: ['1 porsi: 300 ÷ 4 = 75 g.', '10 porsi: 10 × 75 = 750 g.'],
    },
    {
      type: 'num',
      q: 'Pada sebuah peta, 2 cm mewakili 5 km. Jarak 7 cm pada peta itu mewakili … km',
      ans: ['17.5'],
      inputmode: 'decimal',
      wrong: { '35': '5 km untuk 2 cm, bukan untuk 1 cm. 1 cm = 2,5 km.', '14': 'Hitung 1 cm dulu: 5 ÷ 2 = 2,5 km.' },
      steps: ['1 cm mewakili 5 ÷ 2 = 2,5 km.', '7 cm mewakili 7 × 2,5 = 17,5 km.'],
    },
  ],
};

// ---------- 5.3 Perbandingan berbalik nilai ----------
const cellA = (i) => ({ x: 122 + 13 + (i % 6) * 26, y: 98 + 13 + Math.floor(i / 6) * 26 });
const cellB = (i) => ({ x: 161 + 13 + (i % 3) * 26, y: 46 + 13 + Math.floor(i / 3) * 26 });

const l3 = {
  id: 'b5-3',
  title: 'Perbandingan Berbalik Nilai',
  hook: '4 pekerja butuh 6 hari. Kalau pekerjanya 8, harinya bukan 12, tapi 3. Kenapa?',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '4 pekerja menyelesaikan sebuah pekerjaan dalam 6 hari. Kalau pekerjanya 8 orang, berapa hari?',
          add: [T('q', '4 pekerja → 6 hari', 200, 110, { size: 32 }), T('q2', '8 pekerja → ? hari', 200, 170, { size: 30, c: 'mut' })],
          ask: {
            options: [
              { t: '3 hari', ok: true, why: 'Pekerja dua kali lipat, waktunya jadi setengah.' },
              { t: '12 hari', why: 'Makin banyak pekerja, makin cepat selesai. Harinya harus berkurang, bukan bertambah.' },
              { t: '10 hari', why: 'Pekerja bertambah 4 tidak berarti hari bertambah 4. Makin banyak pekerja, makin cepat.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Pekerjaannya tetap',
      steps: [
        {
          say: 'Setiap kotak adalah kerja satu orang selama satu hari. 4 pekerja selama 6 hari menghasilkan 24 kotak. Itulah besar pekerjaannya.',
          clear: true,
          add: [
            ...range(0, 24).map((i) => box(`c${i}`, cellA(i).x, cellA(i).y, 24, 24, { fill: 'pos-soft', r: 3, sw: 1.5 })),
            ...range(0, 4).map((i) => ({ id: `p${i}`, t: 'icon', name: 'person', size: 22, x: 104, y: cellA(i * 6).y })),
            T('h', '6 hari', 200, 82, { size: 17, c: 'mut' }),
            T('lbl', '4 pekerja × 6 hari = 24', 200, 240, { size: 22 }),
          ],
        },
        {
          say: 'Pekerjaannya tetap 24 kotak. Kalau ada 8 pekerja, kotak yang sama dibagi ke 8 baris. Setiap baris tinggal 3 kotak, jadi selesai dalam 3 hari.',
          set: {
            ...Object.fromEntries(range(0, 24).map((i) => [`c${i}`, cellB(i)])),
            ...Object.fromEntries(range(0, 4).map((i) => [`p${i}`, { x: 143, y: cellB(i * 3).y }])),
            h: { y: 32, text: '3 hari' },
            lbl: { x: 300, y: 150, text: '8 × 3 = 24', size: 24 },
          },
          add: range(4, 8).map((i) => ({ id: `p${i}`, t: 'icon', name: 'person', size: 22, x: 143, y: cellB(i * 3).y })),
        },
        {
          say: 'Pada perbandingan berbalik nilai, hasil kalinya selalu tetap. Kalau satu besaran naik dua kali lipat, yang lain turun menjadi setengahnya.',
          add: [T('n', 'hasil kali tetap', 300, 190, { size: 17, c: 'acc' })],
        },
      ],
    },
    {
      title: 'Tabelnya',
      steps: [
        {
          say: 'Lihat tabelnya. Pekerja naik, hari turun. Tapi pekerja kali hari selalu 24.',
          clear: true,
          add: [
            table(
              't',
              200,
              150,
              [
                ['Pekerja', 'Hari', 'Pekerja × Hari'],
                ['2', '12', '24'],
                ['4', '6', '24'],
                ['6', '4', '24'],
                ['8', '3', '24'],
                ['12', '2', '24'],
              ],
              { cw: [90, 70, 140], rh: 34, size: 17, head: true },
            ),
          ],
        },
      ],
    },
    {
      title: 'Grafiknya melengkung turun',
      steps: [
        {
          say: 'Grafiknya bukan garis lurus. Makin banyak pekerja, harinya makin sedikit, tapi turunnya makin landai.',
          clear: true,
          add: [
            { id: 'g', t: 'lines', x: 215, y: 140, w: 280, h: 170, max: 12, tick: 2, vals: true, fc: 'acc', data: [2, 4, 6, 8, 12].map((n) => ({ l: String(n), v: 24 / n })) },
            T('ly', 'hari', 82, 38, { size: 14, c: 'mut' }),
            T('lx', 'banyak pekerja', 215, 262, { size: 14, c: 'mut' }),
          ],
        },
      ],
    },
    {
      title: 'Contoh kecepatan',
      steps: [
        { say: 'Dengan kecepatan 60 kilometer per jam, perjalanan ditempuh dalam 4 jam. Kalau kecepatannya 80 kilometer per jam, berapa jam?', clear: true, add: [T('a', '60 km/jam → 4 jam', 200, 70, { size: 28 }), T('b', '80 km/jam → ? jam', 200, 115, { size: 28, c: 'mut' })] },
        { say: 'Jaraknya tetap: 60 kali 4 sama dengan 240 kilometer.', add: [T('c', 'jarak = 60 × 4 = 240 km', 200, 175, { size: 22 })] },
        { say: '240 dibagi 80 sama dengan 3 jam. Lebih cepat, jadi waktunya lebih singkat.', add: [T('d', 'waktu = 240 ÷ 80 = {p:3 jam}', 200, 225, { size: 24 })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Persediaan makanan untuk 30 ekor ayam habis dalam 12 hari. Kalau ayamnya 40 ekor, makanan itu habis dalam berapa hari?',
          clear: true,
          add: [T('q', '30 ayam → 12 hari', 200, 110, { size: 30 }), T('q2', '40 ayam → ? hari', 200, 165, { size: 30, c: 'mut' })],
          ask: {
            options: [
              { t: '9 hari', ok: true, why: '30 × 12 = 360 = 40 × 9.' },
              { t: '16 hari', why: 'Makin banyak ayam, makanannya makin cepat habis. Harinya harus lebih sedikit.' },
              { t: '22 hari', why: 'Ayam bertambah 10 tidak membuat hari bertambah 10. Makanannya justru lebih cepat habis.' },
            ],
          },
        },
        {
          say: 'Banyak makanan tetap: 30 kali 12 sama dengan 360 jatah. 360 dibagi 40 sama dengan 9 hari.',
          set: { q: { y: 70, size: 26 }, q2: { y: 110, size: 26 } },
          add: [T('a', 'jatah makanan = 30 × 12 = 360', 200, 175, { size: 22 }), T('b', '360 ÷ 40 = {p:9 hari}', 200, 225, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: '6 orang dapat membangun sebuah pos dalam 10 hari. Jika dikerjakan 15 orang, pos itu selesai dalam … hari',
      ans: ['4'],
      wrong: { '25': 'Makin banyak orang, makin cepat selesai. Jawaban 25 menghitungnya seolah perbandingan senilai.', '1': 'Pekerjaan = 6 × 10 = 60. Bagi dengan 15 orang.' },
      steps: ['Pekerjaan = 6 × 10 = 60 orang-hari.', '60 ÷ 15 = 4 hari.'],
    },
    {
      q: 'Dengan kecepatan 45 km/jam, sebuah perjalanan ditempuh dalam 4 jam. Jika kecepatannya 60 km/jam, waktu tempuhnya …',
      options: [
        { t: '3 jam', ok: true },
        { t: '5 1/3 jam', why: 'Lebih cepat berarti waktunya lebih singkat, bukan lebih lama.' },
        { t: '4 jam', why: 'Kecepatan berubah, jadi waktunya ikut berubah.' },
        { t: '2 jam', why: 'Jarak = 45 × 4 = 180 km. 180 ÷ 60 = 3 jam.' },
      ],
      steps: ['Jarak = 45 × 4 = 180 km.', 'Waktu = 180 ÷ 60 = 3 jam.'],
    },
    {
      q: 'Pasangan besaran berikut yang merupakan perbandingan berbalik nilai adalah …',
      options: [
        { t: 'Banyak pekerja dan lama pekerjaan selesai', ok: true },
        { t: 'Banyak barang dan harga total', why: 'Barang dua kali lipat, harganya juga dua kali lipat. Itu senilai.' },
        { t: 'Jarak tempuh dan bensin yang dipakai', why: 'Jarak dua kali lipat, bensinnya juga dua kali lipat. Itu senilai.' },
        { t: 'Sisi persegi dan kelilingnya', why: 'Sisi dua kali lipat, keliling juga dua kali lipat. Itu senilai.' },
      ],
      steps: ['Berbalik nilai: satu naik, yang lain turun, dan hasil kalinya tetap.', 'Pekerja dua kali lipat, waktunya menjadi setengah.'],
    },
    {
      q: 'Suatu pekerjaan selesai dalam 20 hari oleh 9 orang. Agar selesai dalam 15 hari, diperlukan tambahan pekerja sebanyak …',
      options: [
        { t: '3 orang', ok: true },
        { t: '12 orang', why: '12 adalah jumlah pekerja yang dibutuhkan. Yang ditanyakan tambahannya: 12 − 9.' },
        { t: '5 orang', why: 'Pekerjaan = 9 × 20 = 180. 180 ÷ 15 = 12 orang, jadi tambahannya 3.' },
        { t: '6 orang', why: 'Pekerjaan = 9 × 20 = 180. 180 ÷ 15 = 12 orang, jadi tambahannya 3.' },
      ],
      steps: ['Pekerjaan = 9 × 20 = 180 orang-hari.', 'Untuk 15 hari: 180 ÷ 15 = 12 orang.', 'Tambahan: 12 − 9 = 3 orang.'],
    },
    {
      q: 'Tabel berikut menunjukkan perbandingan berbalik nilai. Nilai yang tepat untuk tanda tanya adalah …',
      fig: [table('t', 200, 150, [['x', '2', '3', '6'], ['y', '9', '6', '?']], { cw: [60, 70, 70, 70], rh: 40, size: 20, head: true })],
      viewBox: '40 100 320 100',
      figLabel: 'Tabel x: 2, 3, 6 dan y: 9, 6, tanda tanya',
      options: [
        { t: '3', ok: true },
        { t: '18', why: 'Itu pola senilai. Pada berbalik nilai, x × y tetap: 2 × 9 = 18.' },
        { t: '0', why: 'x × y harus tetap 18, jadi 6 × y = 18.' },
        { t: '4', why: 'x × y = 18, jadi y = 18 ÷ 6 = 3.' },
      ],
      steps: ['x × y = 2 × 9 = 18, dan 3 × 6 = 18.', 'Untuk x = 6: y = 18 ÷ 6 = 3.'],
    },
  ],
};

// ---------- 5.4 Skala ----------
const STEPS = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'];

const l4 = {
  id: 'b5-4',
  title: 'Skala',
  hook: 'Skala 1 : 100.000 artinya 1 cm di peta sama dengan 1 km di tempat aslinya. Kok bisa?',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Skala peta 1 banding 100 ribu. Jarak dua kota di peta 3 sentimeter. Berapa jarak sebenarnya?',
          add: [T('q', 'skala 1 : 100.000', 200, 100, { size: 32 }), T('q2', 'di peta 3 cm, sebenarnya = ?', 200, 160, { size: 22, w: 700 })],
          ask: {
            options: [
              { t: '3 km', ok: true, why: '3 cm × 100.000 = 300.000 cm = 3 km.' },
              { t: '300 m', why: '300.000 cm sama dengan 3.000 m, bukan 300 m.' },
              { t: '30 km', why: '300.000 cm = 3 km. Hitung lagi pengubahan satuannya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Arti skala',
      steps: [
        {
          say: 'Peta adalah gambar yang diperkecil. Skala 1 banding 100 ribu artinya 1 sentimeter di peta mewakili 100 ribu sentimeter di tempat aslinya.',
          clear: true,
          add: [
            box('map', 200, 110, 320, 150, { fill: 'ok-soft', stroke: 'ink', r: 14, sw: 2 }),
            { id: 'A', t: 'icon', name: 'pin', size: 32, x: 100, y: 130 },
            { id: 'B', t: 'icon', name: 'pin', size: 32, x: 300, y: 80 },
            ln('d', 100, 146, 300, 96, { dash: '6 6', c: 'ink', sw: 2.5 }),
            T('dl', '3 cm', 214, 138, { size: 18 }),
            T('sk', 'skala 1 : 100.000', 290, 168, { size: 14 }),
          ],
        },
        {
          say: 'Jadi 3 sentimeter di peta mewakili 3 kali 100 ribu, yaitu 300 ribu sentimeter.',
          add: [T('a', '1 cm di peta = 100.000 cm asli', 200, 222, { size: 19 }), T('b', '3 cm di peta = 300.000 cm asli', 200, 258, { size: 19 })],
        },
      ],
    },
    {
      title: 'Tangga satuan',
      steps: [
        {
          say: 'Lalu ubah satuannya. Setiap turun satu anak tangga, dikali 10. Dari kilometer ke sentimeter ada 5 anak tangga, jadi 1 kilometer sama dengan 100 ribu sentimeter.',
          clear: true,
          add: [
            ...STEPS.map((u, i) => box(`s${i}`, 52 + i * 48, 70 + i * 30, 46, 28, { fill: i === 0 || i === 5 ? 'acc-soft' : 'paper', label: u, lsize: 15, r: 5 })),
            T('x10', 'turun 1 anak tangga: × 10', 280, 62, { size: 15, c: 'acc' }),
            T('r', '1 km = 100.000 cm', 280, 98, { size: 20 }),
          ],
        },
        { say: 'Jadi 300 ribu sentimeter sama dengan 3 kilometer.', add: [T('r2', '300.000 cm = 3 km', 280, 132, { size: 20, c: 'pos' })] },
      ],
    },
    {
      title: 'Menghitung jarak',
      steps: [
        { say: 'Rumusnya: jarak sebenarnya sama dengan jarak di peta dikali penyebut skala. Contoh: skala 1 banding 200 ribu, jarak di peta 4,5 sentimeter.', clear: true, add: [T('f', 'jarak asli = jarak peta × penyebut skala', 200, 60, { size: 18 }), T('a', '4,5 cm × 200.000', 200, 120, { size: 28 })] },
        { say: '4,5 kali 200 ribu sama dengan 900 ribu sentimeter, yaitu 9 kilometer.', add: [T('b', '= 900.000 cm', 200, 175, { size: 28 }), T('c', '= {p:9 km}', 200, 230, { size: 30 })] },
      ],
    },
    {
      title: 'Mencari skala',
      steps: [
        { say: 'Sebaliknya, kalau jarak di peta 5 sentimeter dan jarak sebenarnya 25 kilometer, skalanya berapa?', clear: true, add: [T('a', 'peta 5 cm, asli 25 km', 200, 60, { size: 24 })] },
        { say: 'Samakan satuannya: 25 kilometer sama dengan 2 juta 500 ribu sentimeter.', add: [T('b', '25 km = 2.500.000 cm', 200, 115, { size: 24 })] },
        { say: 'Skala sama dengan 5 banding 2 juta 500 ribu. Bagi 5: 1 banding 500 ribu.', add: [T('c', '5 : 2.500.000', 200, 170, { size: 26 }), T('d', '= {p:1 : 500.000}', 200, 225, { size: 28 })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Denah rumah berskala 1 banding 200. Panjang kamar di denah 2 sentimeter. Berapa panjang sebenarnya?',
          clear: true,
          add: [T('q', 'skala 1 : 200', 200, 100, { size: 32 }), T('q2', 'di denah 2 cm, sebenarnya = ?', 200, 160, { size: 22, w: 700 })],
          ask: {
            options: [
              { t: '4 m', ok: true, why: '2 × 200 = 400 cm = 4 m.' },
              { t: '400 m', why: '400 cm sama dengan 4 m, bukan 400 m.' },
              { t: '100 cm', why: 'Jarak asli = jarak di denah × 200, bukan dibagi.' },
            ],
          },
        },
        {
          say: '2 kali 200 sama dengan 400 sentimeter, yaitu 4 meter.',
          set: { q: { y: 70, size: 26 }, q2: { y: 115, size: 20 } },
          add: [T('a', '2 cm × 200 = 400 cm', 200, 180, { size: 24 }), T('b', '= {p:4 m}', 200, 230, { size: 28 })],
        },
      ],
    },
  ],
  quiz: [
    {
      type: 'num',
      q: 'Skala peta 1 : 250.000. Jarak dua kota di peta 6 cm. Jarak sebenarnya … km',
      ans: ['15'],
      inputmode: 'decimal',
      wrong: { '1500000': 'Itu dalam cm. Ubah ke km: bagi 100.000.', '150': '1.500.000 cm = 15 km. Dari cm ke km dibagi 100.000.' },
      steps: ['6 × 250.000 = 1.500.000 cm.', '1.500.000 cm = 15 km.'],
    },
    {
      q: 'Jarak dua kota 120 km. Pada peta, jaraknya 4 cm. Skala peta itu adalah …',
      options: [
        { t: '1 : 3.000.000', ok: true },
        { t: '1 : 30', why: 'Satuannya harus disamakan dulu: 120 km = 12.000.000 cm.' },
        { t: '1 : 300.000', why: '120 km = 12.000.000 cm, bukan 1.200.000 cm.' },
        { t: '1 : 480.000.000', why: 'Skala didapat dengan membagi, bukan mengalikan: 12.000.000 ÷ 4.' },
      ],
      steps: ['120 km = 12.000.000 cm.', 'Skala = 4 : 12.000.000 = 1 : 3.000.000.'],
    },
    {
      type: 'num',
      q: 'Lapangan sepanjang 80 m digambar dengan skala 1 : 1.000. Panjang lapangan pada gambar adalah … cm',
      ans: ['8'],
      inputmode: 'decimal',
      wrong: { '0.08': '80 m = 8.000 cm. 8.000 ÷ 1.000 = 8 cm.', '80000': 'Gambarnya lebih kecil, jadi dibagi 1.000, bukan dikali.' },
      steps: ['80 m = 8.000 cm.', 'Pada gambar: 8.000 ÷ 1.000 = 8 cm.'],
    },
    {
      q: 'Model mobil dibuat dengan skala 1 : 40. Panjang model 11 cm. Panjang mobil sebenarnya adalah …',
      options: [
        { t: '4,4 m', ok: true },
        { t: '440 m', why: '440 cm sama dengan 4,4 m.' },
        { t: '51 cm', why: 'Panjang asli = 11 × 40, bukan 11 + 40.' },
        { t: '0,275 cm', why: 'Mobil asli lebih besar dari modelnya, jadi dikali 40.' },
      ],
      steps: ['11 × 40 = 440 cm.', '440 cm = 4,4 m.'],
    },
    {
      q: 'Peta A berskala 1 : 500.000 dan peta B berskala 1 : 1.000.000. Jarak dua kota yang sama digambar di peta B …',
      options: [
        { t: 'setengah dari panjang di peta A', ok: true },
        { t: 'dua kali panjang di peta A', why: 'Penyebut skala B lebih besar, artinya gambarnya lebih diperkecil.' },
        { t: 'sama panjang dengan di peta A', why: 'Skalanya berbeda, jadi panjang gambarnya juga berbeda.' },
        { t: 'empat kali panjang di peta A', why: 'Peta B lebih diperkecil (2 kali), jadi gambarnya lebih pendek.' },
      ],
      steps: ['Di peta B, 1 cm mewakili jarak 2 kali lebih jauh daripada di peta A.', 'Jadi jarak yang sama tergambar setengahnya.'],
    },
  ],
};

export default {
  id: 'b5',
  no: 5,
  title: 'Rasio dan Perbandingan',
  desc: 'Rasio, perbandingan senilai, perbandingan berbalik nilai, dan skala.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: 'Uang Ani, Budi, dan Cici berbanding 2 : 3 : 5. Jumlah uang mereka Rp150.000. Uang Cici adalah …',
      options: [
        { t: 'Rp75.000', ok: true },
        { t: 'Rp50.000', why: 'Total ada 10 bagian, satu bagian Rp15.000. Cici punya 5 bagian.' },
        { t: 'Rp45.000', why: 'Itu uang Budi (3 bagian).' },
        { t: 'Rp30.000', why: 'Itu uang Ani (2 bagian).' },
      ],
      steps: ['Total bagian: 2 + 3 + 5 = 10.', 'Satu bagian: 150.000 ÷ 10 = 15.000.', 'Cici: 5 × 15.000 = Rp75.000.'],
    },
    {
      q: 'Jika a : b = 3 : 4 dan b : c = 2 : 5, maka a : c adalah …',
      options: [
        { t: '3 : 10', ok: true },
        { t: '3 : 5', why: 'Nilai b pada kedua rasio harus disamakan dulu: b : c = 2 : 5 = 4 : 10.' },
        { t: '6 : 5', why: 'Samakan b menjadi 4: a : b : c = 3 : 4 : 10.' },
        { t: '3 : 20', why: 'b : c = 2 : 5 dikali 2 menjadi 4 : 10, bukan 4 : 20.' },
      ],
      steps: ['Samakan b: a : b = 3 : 4 dan b : c = 4 : 10.', 'a : b : c = 3 : 4 : 10, jadi a : c = 3 : 10.'],
    },
    {
      q: '8 mesin dapat membuat 120 barang dalam 5 jam. Berapa jam yang dibutuhkan 10 mesin untuk membuat 120 barang yang sama?',
      options: [
        { t: '4 jam', ok: true },
        { t: '6,25 jam', why: 'Makin banyak mesin, makin cepat. Waktunya harus kurang dari 5 jam.' },
        { t: '3 jam', why: 'Kerja total = 8 × 5 = 40 mesin-jam. 40 ÷ 10 = 4 jam.' },
        { t: '5 jam', why: 'Mesin bertambah, jadi waktunya berkurang.' },
      ],
      steps: ['Kerja total: 8 mesin × 5 jam = 40 mesin-jam.', 'Dengan 10 mesin: 40 ÷ 10 = 4 jam.'],
    },
  ],
};
