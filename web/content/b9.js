// Bab 9: Aritmetika Sosial
import { T, box, range, bar } from './helpers.js';

// Batang uang rata kiri: mulai di x0, lebar w
const seg = (id, x0, w, y, fill, o = {}) => box(id, x0 + w / 2, y, w, 36, { fill, r: 3, sw: 1.5, lsize: 13, ...o });
const rp = (v) => 'Rp' + v.toLocaleString('id-ID');

// ---------- 9.1 Untung dan rugi ----------
const X0 = 105;
const l1 = {
  id: 'b9-1',
  title: 'Untung dan Rugi',
  hook: 'Untung 5 ribu dari modal 20 ribu itu 25%, bukan 20%. Persen selalu dihitung dari harga beli.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Dina membeli gantungan kunci 20 ribu rupiah, lalu menjualnya 25 ribu rupiah. Berapa persen untungnya?',
          add: [T('q1', 'beli Rp20.000', 200, 90, { size: 26 }), T('q2', 'jual Rp25.000', 200, 135, { size: 26 }), T('q3', 'untung berapa persen?', 200, 200, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: '25%', ok: true, why: 'Untung 5 ribu dibandingkan modal 20 ribu. Mari kita lihat dengan batang.' },
              { t: '20%', why: '20% didapat dari 5 ribu dibagi 25 ribu. Persen untung dihitung dari harga beli, bukan harga jual.' },
              { t: '5%', why: '5 ribu adalah besar untungnya dalam rupiah, bukan persen.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Untung',
      steps: [
        {
          say: 'Harga beli adalah uang yang dikeluarkan untuk membeli barang. Kita gambar sebagai batang.',
          clear: true,
          add: [T('lb', 'beli', 55, 100, { size: 18 }), seg('b', X0, 180, 100, 'pos-soft', { label: 'Rp20.000' })],
        },
        {
          say: 'Harga jual adalah uang yang diterima saat barang dijual. Batangnya lebih panjang.',
          add: [T('lj', 'jual', 55, 160, { size: 18 }), seg('j1', X0, 180, 160, 'pos-soft', { label: 'Rp20.000' }), seg('j2', X0 + 180, 45, 160, 'ok-soft', { label: '5.000', lsize: 12 })],
        },
        {
          say: 'Harga jual lebih besar dari harga beli. Kelebihannya disebut untung. Untungnya 5 ribu rupiah.',
          pulse: ['j2'],
          add: [T('u', 'untung = jual − beli = {g:Rp5.000}', 200, 230, { size: 22 })],
        },
      ],
    },
    {
      title: 'Persen untung',
      steps: [
        {
          say: 'Berapa persen? Bandingkan untung dengan harga beli. Potong harga beli menjadi bagian-bagian 5 ribu.',
          set: { b: { o: 0 } },
          add: range(0, 4).map((i) => seg(`p${i}`, X0 + i * 45, 45, 100, 'pos-soft', { label: '5.000', lsize: 12 })),
          del: ['u'],
        },
        {
          say: 'Harga beli ada 4 bagian. Satu bagian adalah seperempat, yaitu 25 persen.',
          add: range(0, 4).map((i) => T(`pc${i}`, '25%', X0 + 22.5 + i * 45, 62, { size: 14, c: 'pos' })),
        },
        {
          say: 'Untungnya sama dengan satu bagian. Jadi untungnya 25 persen.',
          add: [T('pu', '25%', X0 + 202, 198, { size: 14, c: 'ok' }), T('r', 'persen untung = {g:25%}', 200, 255, { size: 24 })],
          pulse: ['j2', 'p3'],
        },
        {
          say: 'Rumusnya: untung dibagi harga beli, dikali 100 persen. 5 ribu dibagi 20 ribu, kali 100 persen, sama dengan 25 persen.',
          clear: true,
          add: [box('fb', 200, 90, 360, 64, { fill: 'acc-soft', r: 12 }), T('f', '% untung = untung ÷ beli × 100%', 200, 90, { size: 19 }), T('c', '5.000 ÷ 20.000 × 100% = {g:25%}', 200, 170, { size: 22 })],
        },
      ],
    },
    {
      title: 'Rugi',
      steps: [
        {
          say: 'Kalau harga jual lebih kecil dari harga beli, kita rugi. Pak Amir membeli sepeda bekas 400 ribu dan menjualnya 300 ribu.',
          clear: true,
          add: [
            T('lb', 'beli', 55, 100, { size: 18 }),
            seg('b', X0, 240, 100, 'pos-soft', { label: 'Rp400.000' }),
            T('lj', 'jual', 55, 160, { size: 18 }),
            seg('j1', X0, 180, 160, 'pos-soft', { label: 'Rp300.000' }),
          ],
        },
        {
          say: 'Bagian yang hilang adalah rugi: 400 ribu dikurangi 300 ribu sama dengan 100 ribu.',
          add: [seg('j2', X0 + 180, 60, 160, 'neg-soft', { dash: '5 4', label: 'rugi', lsize: 12 }), T('u', 'rugi = beli − jual = {n:Rp100.000}', 200, 220, { size: 22 })],
        },
        {
          say: 'Persen rugi juga dibandingkan dengan harga beli. 100 ribu dibagi 400 ribu, kali 100 persen, sama dengan 25 persen.',
          add: [T('c', '100.000 ÷ 400.000 × 100% = {n:25%}', 200, 262, { size: 20 })],
        },
      ],
    },
    {
      title: 'Mencari harga jual',
      steps: [
        {
          say: 'Bu Rina membeli tas 60 ribu dan ingin untung 20 persen. Harga jualnya berapa? Harga beli adalah 100 persen. Potong menjadi 5 bagian, masing-masing 20 persen.',
          clear: true,
          add: [
            T('lb', 'beli', 55, 110, { size: 18 }),
            ...range(0, 5).map((i) => seg(`q${i}`, X0 - 25 + i * 48, 48, 110, 'pos-soft', { label: '20%', lsize: 12 })),
            T('h', '100% = Rp60.000', 200, 60, { size: 20 }),
          ],
        },
        {
          say: 'Satu bagian sama dengan 60 ribu dibagi 5, yaitu 12 ribu rupiah.',
          set: Object.fromEntries(range(0, 5).map((i) => [`q${i}`, { label: '12.000', lsize: 11 }])),
          add: [T('h2', '20% = Rp12.000', 200, 165, { size: 20, c: 'ok' })],
        },
        {
          say: 'Untung 20 persen berarti tambah satu bagian lagi. Harga jual: 60 ribu tambah 12 ribu, sama dengan 72 ribu rupiah.',
          add: [seg('q5', X0 - 25 + 5 * 48, 48, 110, 'ok-soft', { label: '12.000', lsize: 11 }), T('r', 'jual = 60.000 + 12.000 = {g:Rp72.000}', 200, 230, { size: 22 })],
          pulse: ['q5'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Buku dibeli 50 ribu, lalu dijual 40 ribu. Untung atau rugi berapa persen?',
          clear: true,
          add: [T('q1', 'beli Rp50.000', 200, 90, { size: 26 }), T('q2', 'jual Rp40.000', 200, 135, { size: 26 }), T('q3', 'untung atau rugi, berapa persen?', 200, 200, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: 'rugi 20%', ok: true, why: 'Rugi 10 ribu dari harga beli 50 ribu, yaitu 20%.' },
              { t: 'rugi 25%', why: '10 ribu dibagi 40 ribu = 25%. Persen rugi dihitung dari harga beli 50 ribu.' },
              { t: 'untung 20%', why: 'Harga jual lebih kecil dari harga beli, jadi rugi.' },
              { t: 'rugi 10%', why: '10 ribu adalah besar ruginya dalam rupiah.' },
            ],
          },
        },
        {
          say: 'Rugi 10 ribu. 10 ribu dibagi 50 ribu, kali 100 persen, sama dengan 20 persen.',
          clear: true,
          add: [
            ...range(0, 5).map((i) => seg(`b${i}`, X0 - 25 + i * 48, 48, 100, i === 4 ? 'neg-soft' : 'pos-soft', { label: '10.000', lsize: 11, ...(i === 4 ? { dash: '5 4' } : {}) })),
            T('lb', 'beli', 45, 100, { size: 16 }),
            T('c', 'rugi 10.000 ÷ 50.000 × 100% = {n:20%}', 200, 180, { size: 20 }),
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Pedagang membeli 1 lusin pensil seharga Rp24.000 dan menjual semuanya dengan harga Rp2.500 per batang. Pedagang itu …',
      options: [
        { t: 'untung Rp6.000', ok: true },
        { t: 'rugi Rp6.000', why: 'Harga jual 12 × Rp2.500 = Rp30.000, lebih besar dari harga beli.' },
        { t: 'untung Rp500', why: 'Itu untung per batang (Rp2.500 − Rp2.000). Ada 12 batang.' },
        { t: 'untung Rp21.500', why: 'Harga jual seluruhnya 12 × Rp2.500, bukan hanya Rp2.500.' },
      ],
      steps: ['1 lusin = 12 batang.', 'Harga jual: 12 × Rp2.500 = Rp30.000.', 'Untung: Rp30.000 − Rp24.000 = Rp6.000.'],
    },
    {
      type: 'num',
      q: 'Sebuah barang dibeli Rp80.000 dan dijual Rp100.000. Persentase untungnya adalah … %',
      ans: ['25'],
      wrong: { '20': 'Rp20.000 ÷ Rp100.000 = 20%. Persen untung dibandingkan dengan harga beli.', '20000': 'Itu untung dalam rupiah. Hitung persennya dari harga beli.' },
      steps: ['Untung: Rp100.000 − Rp80.000 = Rp20.000.', '20.000 ÷ 80.000 × 100% = 25%.'],
    },
    {
      q: 'Ponsel bekas dibeli Rp1.500.000 dan dijual dengan rugi 10%. Harga jualnya adalah …',
      options: [
        { t: 'Rp1.350.000', ok: true },
        { t: 'Rp1.650.000', why: 'Rugi berarti harga jual lebih kecil. Kurangi, jangan tambah.' },
        { t: 'Rp150.000', why: 'Rp150.000 adalah ruginya, bukan harga jual.' },
        { t: 'Rp1.490.000', why: '10% dari Rp1.500.000 adalah Rp150.000, bukan Rp10.000.' },
      ],
      steps: ['Rugi: 10% × Rp1.500.000 = Rp150.000.', 'Harga jual: Rp1.500.000 − Rp150.000 = Rp1.350.000.'],
    },
    {
      type: 'num',
      q: 'Harga beli sebuah barang Rp40.000. Agar untung 15%, barang itu harus dijual seharga Rp …',
      ans: ['46000'],
      wrong: { '6000': 'Rp6.000 adalah untungnya. Harga jual = harga beli + untung.', '34000': 'Untung berarti ditambah, bukan dikurangi.' },
      steps: ['Untung: 15% × 40.000 = 6.000.', 'Harga jual: 40.000 + 6.000 = Rp46.000.'],
    },
    {
      q: 'Rudi menjual sepeda dan mendapat untung Rp50.000. Untung itu sama dengan 20% dari harga beli. Harga beli sepeda adalah …',
      options: [
        { t: 'Rp250.000', ok: true },
        { t: 'Rp10.000', why: '20% dari harga beli = Rp50.000, jadi harga beli lebih besar dari Rp50.000.' },
        { t: 'Rp300.000', why: 'Rp300.000 adalah harga jualnya (beli + untung).' },
        { t: 'Rp1.000.000', why: '20% = 1/5. Harga beli = 5 × Rp50.000.' },
      ],
      steps: ['20% = 1/5 dari harga beli.', 'Harga beli = 5 × Rp50.000 = Rp250.000.'],
    },
  ],
};

// ---------- 9.2 Diskon dan pajak ----------
const D0 = 60;
const l2 = {
  id: 'b9-2',
  title: 'Diskon dan Pajak',
  hook: 'Diskon 25% dari Rp80.000 bukan dikurangi 25 rupiah. Potong harga menjadi 4 bagian, buang satu.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sepatu seharga 80 ribu rupiah sedang diskon 25 persen. Berapa yang harus dibayar?',
          add: [T('q1', 'Rp80.000', 200, 90, { size: 34 }), box('tag', 200, 150, 140, 40, { fill: 'neg', r: 20, label: 'diskon 25%', lsize: 17, lc: 'onfill' }), T('q3', 'harus bayar berapa?', 200, 210, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: 'Rp60.000', ok: true, why: 'Diskonnya Rp20.000, jadi bayar Rp60.000.' },
              { t: 'Rp20.000', why: 'Rp20.000 adalah besar diskonnya. Yang dibayar adalah sisanya.' },
              { t: 'Rp55.000', why: 'Diskon 25% bukan dikurangi 25 ribu. 25% artinya seperempat harga.' },
              { t: 'Rp79.975', why: '25% bukan 25 rupiah. 25% artinya seperempat harga.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Diskon itu potongan',
      steps: [
        {
          say: 'Gambar harga 80 ribu sebagai batang. 25 persen itu seperempat, jadi potong batangnya menjadi 4 bagian sama besar.',
          clear: true,
          add: [T('h', 'harga Rp80.000', 200, 60, { size: 22 }), ...range(0, 4).map((i) => seg(`d${i}`, D0 + i * 70, 70, 120, 'pos-soft', { label: '20.000', lsize: 13 })), ...range(0, 4).map((i) => T(`dp${i}`, '25%', D0 + 35 + i * 70, 160, { size: 14, c: 'pos' }))],
        },
        {
          say: 'Diskon 25 persen berarti satu bagian dibuang. Besar diskonnya 20 ribu rupiah.',
          set: { d3: { fill: 'neg-soft', dash: '5 4', o: 0.6, y: 150 }, dp3: { o: 0 } },
          add: [T('dk', 'diskon {n:Rp20.000}', 305, 200, { size: 17 })],
        },
        {
          say: 'Yang dibayar tinggal 3 bagian: 80 ribu dikurangi 20 ribu sama dengan 60 ribu rupiah.',
          add: [T('r', 'bayar = 80.000 − 20.000 = {p:Rp60.000}', 200, 250, { size: 22 })],
          pulse: ['d0', 'd1', 'd2'],
        },
      ],
    },
    {
      title: 'Cara menghitung',
      steps: [
        {
          say: 'Cara menghitungnya: besar diskon sama dengan persen diskon dikali harga.',
          clear: true,
          add: [box('fb', 200, 70, 340, 56, { fill: 'acc-soft', r: 12 }), T('f', 'diskon = % diskon × harga', 200, 70, { size: 20 })],
        },
        {
          say: 'Trik cepat untuk 10 persen: bagi 10, atau geser koma satu langkah ke kiri. 10 persen dari 150 ribu adalah 15 ribu.',
          add: [T('a', '10% dari 150.000 = 15.000', 200, 140, { size: 22 }), T('a2', 'cukup bagi 10', 200, 170, { size: 15, c: 'mut' })],
        },
        {
          say: 'Dari 10 persen, kita bisa mendapat persen lain. 30 persen sama dengan 3 kali 15 ribu, yaitu 45 ribu.',
          add: [T('b', '30% = 3 × 15.000 = 45.000', 200, 215, { size: 22 })],
        },
        {
          say: 'Dan 5 persen adalah setengah dari 10 persen, yaitu 7 ribu 500.',
          add: [T('c', '5% = 15.000 ÷ 2 = 7.500', 200, 260, { size: 22 })],
        },
      ],
    },
    {
      title: 'Pajak menambah harga',
      steps: [
        {
          say: 'Pajak kebalikan dari diskon. Pajak menambah harga. Contohnya PPN, pajak pertambahan nilai, sebesar 11 persen.',
          clear: true,
          add: [T('h', 'harga Rp200.000 + PPN 11%', 200, 55, { size: 20 }), seg('h0', 50, 250, 120, 'pos-soft', { label: 'Rp200.000' })],
        },
        {
          say: '10 persen dari 200 ribu adalah 20 ribu. 1 persen adalah 2 ribu. Jadi 11 persen sama dengan 22 ribu.',
          add: [T('a', '10% = 20.000, 1% = 2.000', 200, 180, { size: 18, c: 'mut' }), T('b', '11% = 22.000', 200, 210, { size: 20 })],
        },
        {
          say: 'Pajak ditambahkan ke harga. Total yang dibayar 200 ribu tambah 22 ribu, sama dengan 222 ribu rupiah.',
          add: [seg('h1', 300, 28, 120, 'neg-soft'), T('pj', 'pajak', 314, 88, { size: 14, c: 'neg' }), T('r', 'bayar = 200.000 + 22.000 = {n:Rp222.000}', 200, 260, { size: 21 })],
          pulse: ['h1'],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Tas seharga 120 ribu diskon 30 persen. Berapa harga setelah diskon?',
          clear: true,
          add: [T('q1', 'Rp120.000', 200, 90, { size: 34 }), box('tag', 200, 150, 140, 40, { fill: 'neg', r: 20, label: 'diskon 30%', lsize: 17, lc: 'onfill' })],
          ask: {
            options: [
              { t: 'Rp84.000', ok: true, why: 'Diskonnya 36 ribu, jadi bayar 84 ribu.' },
              { t: 'Rp36.000', why: 'Rp36.000 adalah diskonnya. Yang dibayar adalah sisanya.' },
              { t: 'Rp90.000', why: 'Diskon 30% bukan dikurangi 30 ribu. Hitung 30% dari 120 ribu.' },
              { t: 'Rp156.000', why: 'Diskon mengurangi harga, bukan menambah.' },
            ],
          },
        },
        {
          say: '10 persen dari 120 ribu adalah 12 ribu. 30 persen sama dengan 36 ribu. Bayar 120 ribu dikurangi 36 ribu, yaitu 84 ribu.',
          clear: true,
          add: [T('a', '10% = 12.000', 200, 80, { size: 24 }), T('b', '30% = 3 × 12.000 = 36.000', 200, 130, { size: 24 }), T('c', 'bayar = 120.000 − 36.000 = {p:Rp84.000}', 200, 195, { size: 20 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Harga sebuah kaos Rp90.000 dengan diskon 20%. Harga yang harus dibayar adalah …',
      options: [
        { t: 'Rp72.000', ok: true },
        { t: 'Rp18.000', why: 'Rp18.000 adalah besar diskonnya.' },
        { t: 'Rp70.000', why: 'Diskon 20% bukan dikurangi Rp20.000. 20% dari 90.000 = 18.000.' },
        { t: 'Rp108.000', why: 'Diskon mengurangi harga, bukan menambah.' },
      ],
      steps: ['Diskon: 20% × 90.000 = 18.000.', 'Bayar: 90.000 − 18.000 = Rp72.000.'],
    },
    {
      type: 'num',
      q: 'Sebuah buku seharga Rp45.000 mendapat diskon 10%. Besar diskonnya adalah Rp …',
      ans: ['4500'],
      wrong: { '40500': 'Itu harga setelah diskon. Yang ditanya besar diskonnya.', '450': '10% artinya dibagi 10: 45.000 ÷ 10 = 4.500.' },
      steps: ['10% = dibagi 10.', '45.000 ÷ 10 = Rp4.500.'],
    },
    {
      q: 'Harga makanan di restoran Rp150.000, ditambah pajak 10%. Jumlah yang dibayar adalah …',
      options: [
        { t: 'Rp165.000', ok: true },
        { t: 'Rp135.000', why: 'Pajak menambah harga, bukan mengurangi.' },
        { t: 'Rp15.000', why: 'Rp15.000 adalah besar pajaknya saja.' },
        { t: 'Rp160.000', why: 'Pajak 10% dari 150.000 adalah 15.000, bukan 10.000.' },
      ],
      steps: ['Pajak: 10% × 150.000 = 15.000.', 'Bayar: 150.000 + 15.000 = Rp165.000.'],
    },
    {
      type: 'num',
      q: 'Setelah diskon 25%, harga sebuah jaket menjadi Rp150.000. Harga jaket sebelum diskon adalah Rp …',
      ans: ['200000'],
      wrong: { '187500': '150.000 adalah 75% dari harga awal, bukan 100%. Jadi 25% dari harga awal = 150.000 ÷ 3.', '112500': 'Jangan menghitung diskon dari harga setelah diskon. Rp150.000 itu 75% dari harga awal.' },
      steps: ['Setelah diskon 25%, yang tersisa 75% = 3 bagian dari 4.', '1 bagian = 150.000 ÷ 3 = 50.000.', 'Harga awal = 4 × 50.000 = Rp200.000.'],
    },
    {
      q: 'Toko A menjual tas Rp100.000 diskon 15%. Toko B menjual tas yang sama Rp90.000 diskon 5%. Mana yang lebih murah?',
      options: [
        { t: 'Toko A, Rp85.000', ok: true },
        { t: 'Toko B, Rp85.500', why: 'Toko B: 90.000 − 4.500 = 85.500. Toko A: 100.000 − 15.000 = 85.000. Toko A lebih murah 500 rupiah.' },
        { t: 'Sama saja', why: 'Hitung keduanya: Toko A Rp85.000, Toko B Rp85.500.' },
        { t: 'Toko B, karena harga awalnya lebih murah', why: 'Harga awal yang lebih murah belum tentu lebih murah setelah diskon. Hitung keduanya.' },
      ],
      steps: ['Toko A: 100.000 − 15.000 = 85.000.', 'Toko B: 90.000 − 4.500 = 85.500.', 'Toko A lebih murah.'],
    },
  ],
};

// ---------- 9.3 Bunga tunggal ----------
const coin = (id, x, y, fill = 'acc') => ({ id, t: 'circle', x, y, r: 11, fill, stroke: 'ink', sw: 1.5 });
const YX = [90, 170, 250, 330];
const l3 = {
  id: 'b9-3',
  title: 'Bunga Tunggal',
  hook: 'Uang di bank bertambah sedikit demi sedikit. Pada bunga tunggal, tambahannya sama setiap tahun.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Rani menabung 1 juta rupiah di bank dengan bunga 6 persen per tahun. Setelah 1 tahun, tabungannya menjadi berapa?',
          add: [T('q1', 'tabungan Rp1.000.000', 200, 90, { size: 26 }), T('q2', 'bunga 6% per tahun', 200, 135, { size: 22, c: 'acc' }), T('q3', 'setelah 1 tahun = ?', 200, 195, { size: 22, c: 'mut' })],
          ask: {
            options: [
              { t: 'Rp1.060.000', ok: true, why: 'Bunganya 6% dari 1 juta, yaitu 60 ribu.' },
              { t: 'Rp1.006.000', why: '6% dari 1 juta adalah 60.000, bukan 6.000.' },
              { t: 'Rp60.000', why: 'Rp60.000 adalah bunganya saja. Tabungan awal tetap ada.' },
              { t: 'Rp1.600.000', why: '6% dari 1 juta adalah 60.000, bukan 600.000.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Apa itu bunga?',
      steps: [
        {
          say: 'Uang yang kita simpan di awal disebut modal atau tabungan awal. Bank memberi hadiah tambahan uang yang disebut bunga.',
          clear: true,
          add: [box('m', 200, 150, 150, 120, { fill: 'pos-soft', r: 10, label: 'modal\nRp1.000.000', lsize: 17 })],
        },
        {
          say: 'Bunga 6 persen per tahun artinya setiap tahun bank menambah 6 persen dari modal. 6 persen dari 1 juta adalah 60 ribu rupiah.',
          add: [T('a', '6% × 1.000.000 = {a:60.000}', 200, 255, { size: 22 })],
        },
      ],
    },
    {
      title: 'Tahun demi tahun',
      steps: [
        {
          say: 'Kita lihat tabungan Rani dari tahun ke tahun. Batang biru adalah modal, tetap 1 juta.',
          clear: true,
          add: [
            ...YX.map((x, i) => box(`m${i}`, x, 200, 56, 90, { fill: 'pos-soft', r: 3, sw: 1.5 })),
            ...YX.map((x, i) => T(`y${i}`, i === 0 ? 'awal' : `tahun ${i}`, x, 265, { size: 14 })),
            T('lg', 'biru = modal Rp1.000.000', 200, 30, { size: 16, c: 'pos' }),
            T('tt0', 'Rp1.000.000', YX[0], 284, { size: 11, c: 'mut' }),
          ],
        },
        {
          say: 'Tahun pertama, bertambah 60 ribu.',
          add: [coin('c1_0', YX[1], 142), T('tt1', 'Rp1.060.000', YX[1], 284, { size: 11, c: 'mut' })],
        },
        {
          say: 'Tahun kedua, bertambah 60 ribu lagi. Bunganya tetap dihitung dari modal awal, jadi besarnya sama.',
          add: [coin('c2_0', YX[2], 142), coin('c2_1', YX[2], 118), T('tt2', 'Rp1.120.000', YX[2], 284, { size: 11, c: 'mut' })],
        },
        {
          say: 'Tahun ketiga, 60 ribu lagi. Bunga yang selalu sama seperti ini disebut bunga tunggal.',
          add: [coin('c3_0', YX[3], 142), coin('c3_1', YX[3], 118), coin('c3_2', YX[3], 94), T('lg2', 'kuning = bunga Rp60.000', 200, 54, { size: 16, c: 'acc' }), T('tt3', 'Rp1.180.000', YX[3], 284, { size: 11, c: 'mut' })],
        },
        {
          say: 'Setelah 3 tahun, bunganya 3 kali 60 ribu, yaitu 180 ribu. Tabungannya menjadi 1 juta 180 ribu.',
          clear: true,
          add: [T('a', 'bunga 3 tahun = 3 × 60.000 = 180.000', 200, 90, { size: 21 }), T('b', 'tabungan = {a:Rp1.180.000}', 200, 140, { size: 26 })],
        },
      ],
    },
    {
      title: 'Kalau dalam bulan',
      steps: [
        {
          say: 'Bunga ditulis per tahun. Kalau menabung hanya beberapa bulan, bunganya dibagi. Satu tahun ada 12 bulan.',
          clear: true,
          add: [box('fb', 200, 70, 370, 60, { fill: 'acc-soft', r: 12 }), T('f', 'bunga = modal × % × (bulan ÷ 12)', 200, 70, { size: 18 })],
        },
        {
          say: 'Contoh: modal 1 juta, bunga 6 persen per tahun, selama 4 bulan. Bunga setahun 60 ribu.',
          add: [T('a', 'bunga 1 tahun = 60.000', 200, 130, { size: 22 })],
        },
        {
          say: '4 bulan adalah 4 per 12 atau sepertiga tahun. Jadi bunganya 60 ribu dibagi 3, yaitu 20 ribu.',
          add: [bar('bl', 200, 178, 12, 4, { fc: 'acc' }), T('b', '4 dari 12 bulan = 1/3 tahun', 200, 218, { size: 18, c: 'mut' }), T('c', 'bunga 4 bulan = 60.000 ÷ 3 = {a:20.000}', 200, 262, { size: 21 })],
        },
      ],
    },
    {
      title: 'Meminjam uang',
      steps: [
        {
          say: 'Bunga juga ada saat meminjam. Bedanya, kita yang membayar bunga. Pak Joko meminjam 1 juta 200 ribu dengan bunga 10 persen per tahun, selama 6 bulan.',
          clear: true,
          add: [T('a', 'pinjam Rp1.200.000', 200, 50, { size: 22 }), T('a2', 'bunga 10% per tahun, 6 bulan', 200, 82, { size: 18, c: 'mut' })],
        },
        {
          say: 'Bunga setahun 120 ribu. 6 bulan adalah setengah tahun, jadi bunganya setengahnya, yaitu 60 ribu.',
          add: [bar('bp', 200, 125, 12, 6, { fc: 'neg-soft' }), T('b', 'bunga = 120.000 ÷ 2 = 60.000', 200, 168, { size: 21 })],
        },
        {
          say: 'Total yang dikembalikan 1 juta 260 ribu. Kalau dicicil 6 kali, setiap bulan membayar 210 ribu.',
          add: [T('c', 'total = 1.200.000 + 60.000 = 1.260.000', 200, 212, { size: 19 }), T('d', 'cicilan = 1.260.000 ÷ 6 = {n:Rp210.000}', 200, 256, { size: 21 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Modal 2 juta, bunga 5 persen per tahun. Berapa bunga setelah 2 tahun?',
          clear: true,
          add: [T('q1', 'modal Rp2.000.000', 200, 90, { size: 26 }), T('q2', 'bunga 5% per tahun, 2 tahun', 200, 135, { size: 20, c: 'acc' }), T('q3', 'bunga = ?', 200, 195, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: 'Rp200.000', ok: true, why: 'Bunga setahun 100 ribu, dua tahun 200 ribu.' },
              { t: 'Rp100.000', why: 'Itu bunga 1 tahun. Waktunya 2 tahun.' },
              { t: 'Rp2.200.000', why: 'Itu tabungan akhirnya. Yang ditanya bunganya saja.' },
              { t: 'Rp20.000', why: '5% dari 2 juta adalah 100.000 per tahun.' },
            ],
          },
        },
        {
          say: '5 persen dari 2 juta adalah 100 ribu per tahun. Dua tahun: 200 ribu.',
          clear: true,
          add: [T('a', '5% × 2.000.000 = 100.000', 200, 100, { size: 24 }), T('b', '2 tahun: 2 × 100.000 = {a:Rp200.000}', 200, 160, { size: 24 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Ayah menabung Rp5.000.000 dengan bunga tunggal 4% per tahun. Bunga yang diterima setelah 1 tahun adalah …',
      options: [
        { t: 'Rp200.000', ok: true },
        { t: 'Rp20.000', why: '4% × 5.000.000 = 200.000. Perhatikan banyak nol.' },
        { t: 'Rp5.200.000', why: 'Itu tabungan akhirnya. Yang ditanya bunganya.' },
        { t: 'Rp400.000', why: '4% dari 5 juta, bukan dari 10 juta.' },
      ],
      steps: ['1% dari 5.000.000 = 50.000.', '4% = 4 × 50.000 = Rp200.000.'],
    },
    {
      type: 'num',
      q: 'Modal Rp3.000.000 disimpan dengan bunga tunggal 8% per tahun. Besar tabungan setelah 2 tahun adalah Rp …',
      ans: ['3480000'],
      wrong: { '480000': 'Itu bunganya saja. Tambahkan modal awal.', '3240000': 'Itu tabungan setelah 1 tahun. Waktunya 2 tahun.' },
      steps: ['Bunga setahun: 8% × 3.000.000 = 240.000.', 'Bunga 2 tahun: 480.000.', 'Tabungan: 3.000.000 + 480.000 = Rp3.480.000.'],
    },
    {
      q: 'Uang Rp1.200.000 ditabung dengan bunga 10% per tahun selama 3 bulan. Bunganya adalah …',
      options: [
        { t: 'Rp30.000', ok: true },
        { t: 'Rp120.000', why: 'Itu bunga 1 tahun. 3 bulan = 3/12 = 1/4 tahun.' },
        { t: 'Rp360.000', why: 'Bunga 10% per tahun, bukan per bulan.' },
        { t: 'Rp40.000', why: '3 bulan = 1/4 tahun, jadi 120.000 ÷ 4 = 30.000.' },
      ],
      steps: ['Bunga setahun: 10% × 1.200.000 = 120.000.', '3 bulan = 3/12 = 1/4 tahun.', 'Bunga: 120.000 ÷ 4 = Rp30.000.'],
    },
    {
      type: 'num',
      q: 'Bu Ani meminjam Rp2.000.000 dengan bunga tunggal 12% per tahun. Pinjaman dikembalikan dengan 10 kali cicilan bulanan. Besar cicilan per bulan adalah Rp …',
      ans: ['220000'],
      wrong: { '200000': 'Cicilan juga harus membayar bunga, bukan hanya pinjaman.', '224000': 'Waktunya 10 bulan, jadi bunga = 240.000 × 10/12 = 200.000.' },
      steps: ['Bunga setahun: 12% × 2.000.000 = 240.000.', 'Bunga 10 bulan: 240.000 × 10/12 = 200.000.', 'Total: 2.200.000. Cicilan: 2.200.000 ÷ 10 = Rp220.000.'],
    },
    {
      q: 'Tabungan Dimas Rp1.000.000. Setelah 1 tahun menjadi Rp1.050.000. Persentase bunga per tahunnya adalah …',
      options: [
        { t: '5%', ok: true },
        { t: '50%', why: 'Bunganya Rp50.000 dari Rp1.000.000, yaitu 5%.' },
        { t: '0,5%', why: '50.000 ÷ 1.000.000 × 100% = 5%.' },
        { t: '105%', why: '105% adalah tabungan akhir dibanding modal. Bunganya sendiri 5%.' },
      ],
      steps: ['Bunga: 1.050.000 − 1.000.000 = 50.000.', '50.000 ÷ 1.000.000 × 100% = 5%.'],
    },
  ],
};

// ---------- 9.4 Bruto, neto, dan tara ----------
const sack = (id, x, y, w, h, o = {}) => ({ id, t: 'path', x, y, d: `M${-w / 2},${-h / 2 + 8} Q0,${-h / 2 - 6} ${w / 2},${-h / 2 + 8} L${w / 2 - 6},${h / 2} L${-w / 2 + 6},${h / 2} Z`, fill: 'mut-soft', stroke: 'ink', sw: 2.5, ...o });
const l4 = {
  id: 'b9-4',
  title: 'Bruto, Neto, dan Tara',
  hook: 'Berat sekarung beras di timbangan sudah termasuk karungnya. Yang kita beli hanya berasnya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: 'Sekarung beras ditimbang beratnya 50 kilogram. Karungnya sendiri beratnya 1 kilogram. Berapa berat berasnya saja?',
          add: [sack('s', 200, 120, 120, 130), T('w', '50 kg', 200, 130, { size: 26 }), T('q', 'karung 1 kg → beras saja = ?', 200, 240, { size: 20, c: 'mut' })],
          ask: {
            options: [
              { t: '49 kg', ok: true, why: 'Berat karung dikurangkan: 50 − 1 = 49.' },
              { t: '51 kg', why: '50 kg itu sudah termasuk karung. Karung harus dikurangkan, bukan ditambahkan.' },
              { t: '50 kg', why: '50 kg itu berat beras bersama karungnya.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Tiga nama',
      steps: [
        {
          say: 'Berat seluruhnya, beras bersama karung, disebut bruto atau berat kotor.',
          clear: true,
          add: [sack('s', 110, 150, 140, 150), box('isi', 110, 162, 104, 104, { fill: 'acc-soft', r: 8, label: 'beras', lsize: 16 }), T('b', '{k:Bruto} = 50 kg', 290, 80, { size: 22 }), T('b2', 'berat kotor (semuanya)', 290, 106, { size: 14, c: 'mut' })],
        },
        {
          say: 'Berat karungnya saja disebut tara. Taranya 1 kilogram.',
          add: [T('t', '{n:Tara} = 1 kg', 290, 155, { size: 22 }), T('t2', 'berat kemasan', 290, 181, { size: 14, c: 'mut' })],
          hl: ['s'],
        },
        {
          say: 'Berat berasnya saja disebut neto atau berat bersih. Netonya 49 kilogram.',
          add: [T('n', '{a:Neto} = 49 kg', 290, 230, { size: 22 }), T('n2', 'berat bersih (isinya)', 290, 256, { size: 14, c: 'mut' })],
          hl: ['isi'],
        },
      ],
    },
    {
      title: 'Hubungannya',
      steps: [
        {
          say: 'Hubungannya mudah: bruto sama dengan neto ditambah tara.',
          clear: true,
          add: [box('fb', 200, 80, 300, 60, { fill: 'acc-soft', r: 12 }), T('f', 'bruto = neto + tara', 200, 80, { size: 24 })],
        },
        {
          say: 'Jadi neto sama dengan bruto dikurangi tara. Dan tara sama dengan bruto dikurangi neto.',
          add: [T('a', 'neto = bruto − tara', 200, 150, { size: 22 }), T('b', 'tara = bruto − neto', 200, 190, { size: 22 })],
        },
        {
          say: 'Lihat bungkus makanan di rumah. Tulisan berat bersih di bungkus itu adalah neto.',
          add: [T('c', '"Berat bersih 250 g" = neto', 200, 250, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Tara dalam persen',
      steps: [
        {
          say: 'Kadang tara ditulis dalam persen dari bruto. Sekarung gula bruto 80 kilogram, taranya 2 persen.',
          clear: true,
          add: [sack('s', 90, 150, 120, 130), T('w', '80 kg', 90, 160, { size: 22 }), T('a', 'bruto 80 kg, tara 2%', 270, 70, { size: 20 })],
        },
        {
          say: '1 persen dari 80 adalah 0 koma 8. Jadi 2 persen adalah 1 koma 6 kilogram. Itu taranya.',
          add: [T('b', 'tara = 2% × 80 = 1,6 kg', 270, 130, { size: 19 })],
        },
        {
          say: 'Neto sama dengan 80 dikurangi 1 koma 6, yaitu 78 koma 4 kilogram.',
          add: [T('c', 'neto = 80 − 1,6 = {a:78,4 kg}', 270, 190, { size: 19 })],
        },
        {
          say: 'Pedagang membayar sesuai neto, karena yang dijual hanya gulanya. Kalau harga gula 15 ribu per kilogram, harga sekarung adalah 78 koma 4 kali 15 ribu, yaitu 1 juta 176 ribu.',
          add: [T('d', '78,4 × 15.000 = Rp1.176.000', 270, 250, { size: 17 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sekaleng biskuit beratnya 600 gram. Biskuitnya saja 520 gram. Berapa taranya?',
          clear: true,
          add: [T('q1', 'bruto 600 g, neto 520 g', 200, 110, { size: 26 }), T('q2', 'tara = ?', 200, 170, { size: 24, c: 'mut' })],
          ask: {
            options: [
              { t: '80 g', ok: true, why: 'Tara = bruto − neto = 600 − 520.' },
              { t: '1.120 g', why: 'Tara bukan bruto ditambah neto. Tara = bruto − neto.' },
              { t: '520 g', why: '520 g adalah netonya, yaitu berat biskuit.' },
            ],
          },
        },
        {
          say: 'Tara sama dengan bruto dikurangi neto: 600 dikurangi 520, yaitu 80 gram. Itu berat kalengnya.',
          clear: true,
          add: [T('a', 'tara = 600 − 520 = {n:80 g}', 200, 120, { size: 28 }), T('b', 'berat kalengnya', 200, 165, { size: 18, c: 'mut' })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Sebuah karung berisi kentang memiliki bruto 40 kg dan tara 0,5 kg. Netonya adalah …',
      options: [
        { t: '39,5 kg', ok: true },
        { t: '40,5 kg', why: 'Neto = bruto − tara, bukan ditambah.' },
        { t: '35 kg', why: 'Tara 0,5 kg, bukan 5 kg.' },
        { t: '40 kg', why: '40 kg itu bruto, masih termasuk karung.' },
      ],
      steps: ['Neto = bruto − tara.', '40 − 0,5 = 39,5 kg.'],
    },
    {
      type: 'num',
      q: 'Sekotak susu memiliki neto 950 gram dan tara 50 gram. Brutonya adalah … gram',
      ans: ['1000'],
      wrong: { '900': 'Bruto = neto + tara, jadi ditambah.' },
      steps: ['Bruto = neto + tara.', '950 + 50 = 1.000 gram.'],
    },
    {
      q: 'Sekarung beras memiliki bruto 50 kg dengan tara 2%. Netonya adalah …',
      options: [
        { t: '49 kg', ok: true },
        { t: '48 kg', why: '2% dari 50 kg adalah 1 kg, bukan 2 kg.' },
        { t: '1 kg', why: '1 kg adalah taranya.' },
        { t: '51 kg', why: 'Tara dikurangkan dari bruto.' },
      ],
      steps: ['Tara: 2% × 50 = 1 kg.', 'Neto: 50 − 1 = 49 kg.'],
    },
    {
      type: 'num',
      q: 'Pedagang membeli 2 karung gula, masing-masing bruto 50 kg dan tara 1 kg. Harga gula Rp14.000 per kg neto. Pedagang harus membayar Rp …',
      ans: ['1372000'],
      wrong: { '1400000': 'Itu dihitung dari bruto. Pedagang membayar sesuai neto (tanpa karung).', '686000': 'Ada 2 karung.' },
      steps: ['Neto satu karung: 50 − 1 = 49 kg.', 'Neto dua karung: 98 kg.', 'Bayar: 98 × 14.000 = Rp1.372.000.'],
    },
    {
      type: 'num',
      q: 'Sebuah peti buah memiliki bruto 25 kg dan neto 24 kg. Persentase taranya terhadap bruto adalah … %',
      ans: ['4'],
      wrong: { '1': 'Taranya 1 kg. Persennya: 1 ÷ 25 × 100%.', '96': 'Itu persentase neto. Persentase tara = 1 ÷ 25 × 100%.' },
      steps: ['Tara: 25 − 24 = 1 kg.', 'Persen tara: 1 ÷ 25 × 100% = 4%.'],
    },
  ],
};

export default {
  id: 'b9',
  no: 9,
  title: 'Aritmetika Sosial',
  desc: 'Matematika jual beli: untung dan rugi, diskon dan pajak, bunga tabungan, serta bruto, neto, dan tara.',
  lessons: [l1, l2, l3, l4],
  extra: [
    {
      q: 'Harga baju Rp200.000. Toko memberi diskon 20%, lalu ditambah pajak 10% dari harga setelah diskon. Harga yang dibayar adalah …',
      options: [
        { t: 'Rp176.000', ok: true },
        { t: 'Rp180.000', why: 'Diskon dan pajak tidak bisa digabung jadi "diskon 10%". Pajak dihitung dari harga setelah diskon.' },
        { t: 'Rp160.000', why: 'Itu harga setelah diskon. Pajaknya belum ditambahkan.' },
        { t: 'Rp220.000', why: 'Diskonnya belum dikurangkan.' },
      ],
      steps: ['Setelah diskon: 200.000 − 40.000 = 160.000.', 'Pajak: 10% × 160.000 = 16.000.', 'Bayar: 160.000 + 16.000 = Rp176.000.'],
    },
    {
      type: 'num',
      q: 'Pedagang membeli 50 butir telur seharga Rp75.000. Sebanyak 5 butir pecah, dan sisanya dijual Rp2.000 per butir. Untungnya adalah Rp …',
      ans: ['15000'],
      wrong: { '25000': 'Telur yang pecah tidak bisa dijual. Yang dijual hanya 45 butir.', '-15000': 'Harga jual 90.000 lebih besar dari harga beli 75.000, jadi untung.' },
      steps: ['Telur yang dijual: 50 − 5 = 45 butir.', 'Harga jual: 45 × 2.000 = 90.000.', 'Untung: 90.000 − 75.000 = Rp15.000.'],
    },
    {
      q: 'Kak Tia menabung di bank dengan bunga tunggal 6% per tahun. Setelah 8 bulan, bunganya Rp40.000. Tabungan awal Kak Tia adalah …',
      options: [
        { t: 'Rp1.000.000', ok: true },
        { t: 'Rp666.667', why: 'Bunga 8 bulan = 4% dari modal (6% × 8/12). Modal = 40.000 ÷ 4%.' },
        { t: 'Rp2.400.000', why: 'Bunga 6% per tahun, bukan per bulan.' },
        { t: 'Rp1.040.000', why: 'Itu tabungan akhir. Yang ditanya tabungan awal.' },
      ],
      steps: ['Bunga 8 bulan = 6% × 8/12 = 4% dari modal.', '4% modal = 40.000, jadi 1% = 10.000.', 'Modal = 100 × 10.000 = Rp1.000.000.'],
    },
  ],
};
