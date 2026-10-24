// Bab 3: Bentuk Aljabar
import { T, box, hop, eqRow, textWidth } from './helpers.js';

const bag = (id, x, y, size = 40, label = 'x') => ({ id, t: 'icon', name: 'bag', x, y, size, label });
const marble = (id, x, y) => ({ id, t: 'circle', x, y, r: 10, fill: 'acc', stroke: 'ink', sw: 1.5 });
const tile = (id, kind, x, y, o = {}) => ({ id, t: 'tile', kind, x, y, u: 18, vert: true, ...o });
const estW = (e) => textWidth(e.text, e.size);

// Kotak yang mengelilingi beberapa elemen eqRow (perkiraan lebar teks)
function around(id, els, pad = 8) {
  const left = Math.min(...els.map((e) => e.x - estW(e) / 2)) - pad;
  const right = Math.max(...els.map((e) => e.x + estW(e) / 2)) + pad;
  const e0 = els[0];
  return box(id, (left + right) / 2, e0.y, right - left, e0.size * 1.35, { fill: 'none', stroke: 'acc', dash: '6 5', r: 10, sw: 2.5 });
}

// ---------- 3.1 Mengenal bentuk aljabar ----------
const SUKU = eqRow('s', 110, ['5a', '−', '4b', '+', '7'], { size: 40 });
const SIMP_A = eqRow('a', 100, ['{p:4x}', '+', '{g:3}', '+', '{p:2x}', '−', '{g:1}'], { size: 36 });
const SIMP_B = eqRow('b', 100, ['4x', '+', '2x', '+', '3', '−', '1'], { size: 36 });
const moveTo = (fromIdx, toIdx) => ({ [`a${fromIdx}`]: { x: SIMP_B[toIdx].x } });

const l1 = {
  id: 'b3-1',
  title: 'Mengenal Bentuk Aljabar',
  hook: 'Kenapa 3a + 2b tidak bisa jadi 5ab? Bayangkan kantong berisi kelereng yang jumlahnya belum diketahui.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '3a tambah 2b bisa disederhanakan menjadi apa?',
          add: [T('q', '3a + 2b = ?', 200, 140, { size: 50 })],
          ask: {
            options: [
              { t: 'Tetap 3a + 2b', ok: true, why: 'a dan b mewakili hal yang berbeda, jadi tidak bisa digabung.' },
              { t: '5ab', why: 'a dan b mewakili hal berbeda. 3 apel dan 2 buku tidak sama dengan 5 apel-buku.' },
              { t: '5', why: 'Variabelnya tidak boleh hilang begitu saja.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Kantong misterius',
      steps: [
        {
          say: 'Satu kantong berisi kelereng, tapi banyaknya belum diketahui. Kita sebut isinya x.',
          clear: true,
          add: [bag('k0', 200, 115, 70), T('t1', '1 kantong berisi x kelereng', 200, 205, { size: 19 })],
        },
        {
          say: 'Tiga kantong dan dua kelereng lepas ditulis 3x tambah 2.',
          clear: true,
          add: [bag('k0', 90, 85, 50), bag('k1', 145, 85, 50), bag('k2', 200, 85, 50), marble('m0', 262, 95), marble('m1', 290, 95), T('e', '{p:3}x + {g:2}', 200, 160, { size: 44 })],
        },
        {
          say: '3 disebut koefisien, yaitu banyak kantongnya. x disebut variabel, yaitu isi yang belum diketahui. 2 disebut konstanta, yaitu bilangan tetap.',
          add: [
            T('l1', '{p:3} : koefisien, banyak kantong', 200, 212, { size: 17, w: 700 }),
            T('l2', 'x : variabel, isi yang belum diketahui', 200, 240, { size: 17, w: 700 }),
            T('l3', '{g:2} : konstanta, bilangan tetap', 200, 268, { size: 17, w: 700 }),
          ],
        },
      ],
    },
    {
      title: 'Suku',
      steps: [
        { say: 'Perhatikan bentuk 5a kurang 4b tambah 7.', clear: true, add: SUKU },
        {
          say: 'Bagian yang dipisahkan tanda tambah atau kurang disebut suku. Ada tiga suku: 5a, negatif 4b, dan 7. Tanda di depannya ikut sukunya.',
          add: [
            around('b1', [SUKU[0]]),
            around('b2', [SUKU[1], SUKU[2]]),
            around('b3', [SUKU[4]]),
            T('n1', 'suku 1', SUKU[0].x, 160, { size: 14, c: 'mut' }),
            T('n2', 'suku 2', (SUKU[1].x + SUKU[2].x) / 2, 160, { size: 14, c: 'mut' }),
            T('n3', 'suku 3', SUKU[4].x, 160, { size: 14, c: 'mut' }),
          ],
        },
        {
          say: 'Koefisien a adalah 5. Koefisien b adalah negatif 4, karena tandanya ikut. Konstantanya 7.',
          add: [T('k', 'koefisien a: 5,   koefisien b: {n:−4},   konstanta: 7', 200, 228, { size: 17, w: 700 })],
        },
      ],
    },
    {
      title: 'Suku sejenis',
      steps: [
        {
          say: '2x tambah 5x. Kantongnya sejenis, isinya sama-sama x.',
          clear: true,
          add: [bag('a0', 50, 70, 36), bag('a1', 92, 70, 36), T('p1', '+', 130, 72, { size: 26 }), ...[0, 1, 2, 3, 4].map((i) => bag(`b${i}`, 168 + i * 42, 70, 36))],
        },
        { say: 'Jadi bisa digabung menjadi 7x.', add: [T('r1', '2x + 5x = {p:7x}', 200, 128, { size: 28 })] },
        {
          say: 'Kalau x tambah y, isi kantongnya berbeda. Tidak bisa digabung menjadi 2x, apalagi xy.',
          add: [bag('c0', 160, 185, 40, 'x'), T('p2', '+', 200, 187, { size: 26 }), bag('c1', 240, 185, 40, 'y'), T('r2', 'x + y tidak bisa digabung', 200, 240, { size: 19, c: 'neg' })],
        },
        {
          say: 'Begitu juga x dan x kuadrat. Suku sejenis harus punya variabel dan pangkat yang sama.',
          add: [T('r3', 'x dan x² juga tidak sejenis: pangkatnya beda', 200, 272, { size: 15, w: 700, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Menyederhanakan',
      steps: [
        { say: 'Sederhanakan: 4x tambah 3 tambah 2x kurang 1.', clear: true, add: SIMP_A },
        {
          say: 'Kumpulkan suku sejenis. Suku x bersama suku x, bilangan bersama bilangan. Tandanya ikut berpindah bersama sukunya.',
          set: { ...moveTo(0, 0), ...moveTo(3, 1), ...moveTo(4, 2), ...moveTo(1, 3), ...moveTo(2, 4), ...moveTo(5, 5), ...moveTo(6, 6) },
          pulse: ['a3', 'a4'],
        },
        {
          say: '4x tambah 2x sama dengan 6x. 3 kurang 1 sama dengan 2. Hasilnya 6x tambah 2.',
          add: [...eqRow('c', 180, ['=', '{p:6x}', '+', '{g:2}'], { size: 40 }), T('k1', '4x + 2x = 6x', 115, 245, { size: 17 }), T('k2', '3 − 1 = 2', 290, 245, { size: 17 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. Sederhanakan 5y kurang 2 tambah 3y tambah 6.',
          clear: true,
          add: [T('q', '5y − 2 + 3y + 6', 200, 140, { size: 44 })],
          ask: {
            options: [
              { t: '8y + 4', ok: true, why: '5y + 3y = 8y dan −2 + 6 = 4.' },
              { t: '12y', why: 'Konstanta −2 dan 6 bukan suku sejenis dengan suku y, jadi tidak bisa digabung dengan 8y.' },
              { t: '8y + 8', why: 'Tanda minus ikut angka 2: −2 + 6 = 4, bukan 8.' },
              { t: '2y + 4', why: '5y + 3y = 8y. Tanda di depan 3y adalah tambah.' },
            ],
          },
        },
        {
          say: 'Kumpulkan suku sejenis: 5y tambah 3y sama dengan 8y. Negatif 2 tambah 6 sama dengan 4. Hasilnya 8y tambah 4.',
          set: { q: { y: 80, size: 34 } },
          add: [T('s1', '= 5y + 3y − 2 + 6', 200, 150, { size: 30 }), T('s2', '= {p:8y} + {g:4}', 200, 220, { size: 34 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'Pada bentuk 7p − 3q + 5, koefisien dari q adalah …',
      options: [
        { t: '{n:−3}', ok: true },
        { t: '3', why: 'Tanda ikut sukunya. Suku keduanya {n:−3}q, jadi koefisiennya {n:−3}.' },
        { t: '7', why: '7 adalah koefisien p.' },
        { t: '5', why: '5 adalah konstanta, tidak punya variabel.' },
      ],
      steps: ['Suku-sukunya: 7p, {n:−3}q, dan 5.', 'Koefisien q adalah bilangan di depan q beserta tandanya: {n:−3}.'],
    },
    {
      q: 'Banyak suku pada bentuk 2a² − 5a + ab − 8 adalah …',
      options: [
        { t: '4', ok: true },
        { t: '3', why: 'ab juga suku tersendiri. Hitung bagian yang dipisahkan tanda tambah atau kurang.' },
        { t: '2', why: 'Hitung bagian yang dipisahkan tanda tambah atau kurang: 2a², −5a, ab, dan −8.' },
        { t: '5', why: 'Ada 4 bagian: 2a², −5a, ab, dan −8.' },
      ],
      steps: ['Pisahkan pada setiap tanda tambah atau kurang.', 'Sukunya: 2a², −5a, ab, −8. Ada 4 suku.'],
    },
    {
      q: 'Pasangan berikut yang merupakan suku sejenis adalah …',
      options: [
        { t: '4m dan −9m', ok: true },
        { t: '3x dan 3y', why: 'Variabelnya berbeda (x dan y), jadi tidak sejenis walaupun koefisiennya sama.' },
        { t: '2a dan 2a²', why: 'Variabelnya sama tapi pangkatnya berbeda.' },
        { t: '5 dan 5k', why: '5 adalah konstanta, sedangkan 5k punya variabel.' },
      ],
      steps: ['Suku sejenis: variabel dan pangkatnya sama persis.', '4m dan −9m sama-sama memuat m berpangkat 1.'],
    },
    {
      q: 'Bentuk sederhana dari 6x + 4 − 2x − 9 adalah …',
      options: [
        { t: '4x − 5', ok: true },
        { t: '8x − 5', why: 'Tanda minus ikut 2x, jadi 6x − 2x = 4x.' },
        { t: '4x + 13', why: 'Tanda minus ikut 9, jadi 4 − 9 = −5.' },
        { t: '4x + 5', why: '4 − 9 = −5, bukan 5.' },
      ],
      steps: ['Kumpulkan: 6x − 2x + 4 − 9.', '6x − 2x = 4x dan 4 − 9 = −5.', 'Hasilnya 4x − 5.'],
    },
    {
      q: 'Harga sebuah pensil x rupiah dan harga sebuah buku y rupiah. Rina membeli 3 pensil dan 2 buku. Bentuk aljabar total harganya adalah …',
      options: [
        { t: '3x + 2y', ok: true },
        { t: '5xy', why: 'Pensil dan buku harganya berbeda (x dan y), jadi tidak bisa digabung.' },
        { t: '3y + 2x', why: 'Tertukar: 3 pensil berarti 3 × x, dan 2 buku berarti 2 × y.' },
        { t: '6xy', why: 'Harga total adalah jumlah, bukan perkalian semua bilangan.' },
      ],
      steps: ['3 pensil: 3 × x = 3x.', '2 buku: 2 × y = 2y.', 'Total: 3x + 2y.'],
    },
  ],
};

// ---------- 3.2 Menjumlah dan mengurangkan ----------
const l2 = {
  id: 'b3-2',
  title: 'Menjumlah dan Mengurangkan Bentuk Aljabar',
  hook: '(2x + 3) − (x − 4) bukan x − 1. Tanda minus di depan kurung mengubah semua isinya.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '2x tambah 3, dikurangi x kurang 4. Hasilnya berapa?',
          add: [T('q', '(2x + 3) − (x − 4)', 200, 140, { size: 40 })],
          ask: {
            options: [
              { t: 'x + 7', ok: true, why: 'Sekarang kita lihat dengan ubin.' },
              { t: 'x − 1', why: 'Tanda minus di depan kurung berlaku untuk semua suku di dalamnya: −(x − 4) = −x + 4.' },
              { t: '3x − 1', why: 'x dikurangkan, bukan ditambahkan, dan −4 juga ikut berubah tanda.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Ubin aljabar',
      steps: [
        {
          say: 'Kita pakai ubin. Ubin panjang biru bernilai x. Ubin kecil kuning bernilai 1. Ubin merah adalah lawannya: negatif x dan negatif 1.',
          clear: true,
          add: [
            tile('lx', 'x', 80, 110, { u: 22 }),
            tile('lnx', '-x', 150, 110, { u: 22 }),
            tile('l1', '1', 230, 110, { u: 22 }),
            tile('ln1', '-1', 300, 110, { u: 22 }),
            T('a', 'x', 80, 175, { size: 20 }),
            T('b', '−x', 150, 175, { size: 20, c: 'neg' }),
            T('c', '1', 230, 175, { size: 20 }),
            T('d', '−1', 300, 175, { size: 20, c: 'neg' }),
          ],
        },
        {
          say: 'Seperti keping di Bab 1, ubin dan lawannya membentuk pasangan nol.',
          del: ['a', 'b', 'c', 'd'],
          set: { lx: { x: 100 }, lnx: { x: 126 }, l1: { x: 250 }, ln1: { x: 276 } },
          add: [box('z1', 113, 110, 66, 88, { fill: 'none', stroke: 'acc', dash: '6 5', r: 10 }), box('z2', 263, 110, 66, 46, { fill: 'none', stroke: 'acc', dash: '6 5', r: 10 }), T('e', 'x + (−x) = 0', 113, 200, { size: 19 }), T('e2', '1 + (−1) = 0', 263, 200, { size: 19 })],
        },
      ],
    },
    {
      title: 'Penjumlahan',
      steps: [
        {
          say: 'Tambahkan 2x tambah 3 dengan x kurang 1. Susun ubinnya.',
          clear: true,
          add: [
            T('q', '(2x + 3) + (x − 1)', 200, 38, { size: 26 }),
            tile('ax0', 'x', 60, 110),
            tile('ax1', 'x', 84, 110),
            tile('a0', '1', 130, 110),
            tile('a1', '1', 152, 110),
            tile('a2', '1', 174, 110),
            tile('bx0', 'x', 60, 200),
            tile('bn0', '-1', 130, 200),
            T('la', '2x + 3', 310, 110, { size: 20, c: 'mut' }),
            T('lb', 'x − 1', 310, 200, { size: 20, c: 'mut' }),
          ],
        },
        {
          say: 'Gabungkan ubin sejenis. Ubin x dengan ubin x, ubin kecil dengan ubin kecil.',
          del: ['la', 'lb'],
          set: { bx0: { x: 108, y: 110 }, a0: { x: 150 }, a1: { x: 172 }, a2: { x: 194 }, bn0: { x: 194, y: 134 } },
        },
        { say: 'Ada satu pasangan nol: 1 dan negatif 1.', add: [box('zp', 194, 122, 32, 56, { fill: 'none', stroke: 'acc', dash: '5 4', r: 8, sw: 2.5 })] },
        {
          say: 'Setelah pasangan nol dibuang, tersisa 3 ubin x dan 2 ubin satu. Hasilnya 3x tambah 2.',
          del: ['a2', 'bn0', 'zp'],
          add: [T('r', '= 3x + 2', 200, 220, { size: 36, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Pengurangan',
      steps: [
        {
          say: 'Sekarang 2x tambah 3, dikurangi x kurang 4.',
          clear: true,
          add: [
            T('q', '(2x + 3) − (x − 4)', 200, 38, { size: 26 }),
            tile('ax0', 'x', 60, 105),
            tile('ax1', 'x', 84, 105),
            tile('a0', '1', 130, 105),
            tile('a1', '1', 152, 105),
            tile('a2', '1', 174, 105),
            tile('bx', 'x', 60, 200),
            ...[0, 1, 2, 3].map((i) => tile(`bn${i}`, '-1', 130 + i * 22, 200)),
            T('la', '2x + 3', 315, 105, { size: 20, c: 'mut' }),
            T('lb', 'x − 4', 315, 200, { size: 20, c: 'mut' }),
            T('mn', 'dikurangi', 315, 152, { size: 16, c: 'neg' }),
          ],
        },
        {
          say: 'Mengurangi sama dengan menambah lawannya. Lawan dari x kurang 4 adalah negatif x tambah 4. Semua ubinnya dibalik.',
          set: { bx: { kind: '-x', rot: 360 }, 'bn*': { kind: '1', rot: 360 }, lb: { text: '−x + 4', c: 'ink' }, mn: { text: 'ditambah lawannya', c: 'acc' } },
        },
        {
          say: 'Kumpulkan ubinnya. Satu ubin x berpasangan dengan negatif x, jadi nol.',
          del: ['la', 'lb', 'mn'],
          set: { bx: { x: 108, y: 105 }, bn0: { x: 196, y: 105 }, bn1: { x: 218, y: 105 }, bn2: { x: 240, y: 105 }, bn3: { x: 262, y: 105 } },
          add: [box('zp', 96, 105, 56, 74, { fill: 'none', stroke: 'acc', dash: '5 4', r: 8, sw: 2.5 })],
        },
        {
          say: 'Tersisa 1 ubin x dan 7 ubin satu. Hasilnya x tambah 7.',
          del: ['ax1', 'bx', 'zp'],
          add: [T('r', '= x + 7', 200, 220, { size: 36, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Tanpa ubin',
      steps: [
        { say: 'Tanpa ubin, caranya begini. Contoh: 5a kurang 2b, dikurangi 3a kurang 6b.', clear: true, add: [T('l1', '(5a − 2b) − (3a − 6b)', 200, 60, { size: 30 })] },
        { say: 'Buka kurungnya. Karena ada tanda minus di depan kurung, semua tanda di dalamnya berubah.', add: [T('l2', '= 5a − 2b {n:− 3a + 6b}', 200, 120, { size: 30 })] },
        { say: 'Kumpulkan suku sejenis.', add: [T('l3', '= 5a − 3a − 2b + 6b', 200, 180, { size: 30 })] },
        { say: 'Hasilnya 2a tambah 4b.', add: [T('l4', '= {p:2a + 4b}', 200, 240, { size: 32 })] },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. 4y kurang 1, dikurangi 2y tambah 3. Hasilnya?',
          clear: true,
          add: [T('q', '(4y − 1) − (2y + 3)', 200, 140, { size: 38 })],
          ask: {
            options: [
              { t: '2y − 4', ok: true, why: '−(2y + 3) = −2y − 3, lalu 4y − 2y = 2y dan −1 − 3 = −4.' },
              { t: '2y + 2', why: 'Tanda minus berlaku juga untuk 3: −(2y + 3) = −2y − 3. Jadi −1 − 3 = −4.' },
              { t: '6y + 2', why: 'Bentuk kedua dikurangkan, bukan ditambahkan.' },
            ],
          },
        },
        {
          say: 'Buka kurung: 4y kurang 1 kurang 2y kurang 3. Kumpulkan: 2y kurang 4.',
          set: { q: { y: 70, size: 32 } },
          add: [T('s1', '= 4y − 1 − 2y − 3', 200, 140, { size: 30 }), T('s2', '= {p:2y − 4}', 200, 210, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '(3x + 5) + (2x − 7) = …',
      options: [
        { t: '5x − 2', ok: true },
        { t: '5x + 12', why: 'Tanda minus ikut 7: 5 + (−7) = −2.' },
        { t: 'x − 2', why: '3x + 2x = 5x.' },
        { t: '5x − 12', why: '5 + (−7) = −2, bukan −12.' },
      ],
      steps: ['3x + 2x = 5x.', '5 + (−7) = −2.', 'Hasilnya 5x − 2.'],
    },
    {
      q: '(6a − 4) − (2a − 9) = …',
      options: [
        { t: '4a + 5', ok: true },
        { t: '4a − 13', why: 'Tanda minus di depan kurung mengubah −9 menjadi +9. Jadi −4 + 9 = 5.' },
        { t: '8a + 5', why: 'Bentuk kedua dikurangkan: 6a − 2a = 4a.' },
        { t: '4a − 5', why: '−4 + 9 = 5, bukan −5.' },
      ],
      steps: ['Buka kurung: 6a − 4 − 2a + 9.', '6a − 2a = 4a dan −4 + 9 = 5.', 'Hasilnya 4a + 5.'],
    },
    {
      q: 'Ubin di bawah ini, setelah disederhanakan, menunjukkan bentuk aljabar …',
      fig: [
        tile('a', 'x', 70, 150),
        tile('b', 'x', 94, 150),
        tile('c', 'x', 118, 150),
        tile('d', '-x', 152, 150),
        tile('e', '-x', 176, 150),
        tile('f', '1', 216, 150),
        tile('g', '1', 238, 150),
        tile('h', '1', 260, 150),
        tile('i', '1', 282, 150),
        tile('j', '-1', 322, 150),
      ],
      viewBox: '40 110 310 80',
      figLabel: '3 ubin x, 2 ubin negatif x, 4 ubin satu, dan 1 ubin negatif satu',
      options: [
        { t: 'x + 3', ok: true },
        { t: '5x + 5', why: 'Ubin merah bernilai negatif, jadi membentuk pasangan nol dengan ubin biru dan kuning.' },
        { t: 'x + 5', why: 'Ubin −1 juga berpasangan dengan satu ubin 1, jadi tersisa 3 ubin satu.' },
        { t: '3x + 4', why: 'Ubin merah belum dipasangkan. 3x + (−2x) = x dan 4 + (−1) = 3.' },
      ],
      steps: ['Ubin x: 3 biru dan 2 merah, sisa 1 ubin x.', 'Ubin satu: 4 kuning dan 1 merah, sisa 3.', 'Hasilnya x + 3.'],
    },
    {
      q: 'Kurangkan 2p − q dari 5p + 3q. Hasilnya …',
      options: [
        { t: '3p + 4q', ok: true },
        { t: '3p + 2q', why: 'Tanda minus di depan kurung mengubah −q menjadi +q: 3q + q = 4q.' },
        { t: '−3p − 4q', why: '"Kurangkan A dari B" artinya B − A, jadi (5p + 3q) − (2p − q).' },
        { t: '7p + 2q', why: 'Bentuk 2p − q dikurangkan, bukan ditambahkan.' },
      ],
      steps: ['"Kurangkan A dari B" artinya B − A.', '(5p + 3q) − (2p − q) = 5p + 3q − 2p + q.', '= 3p + 4q.'],
    },
    {
      type: 'num',
      q: 'Jika x = 3, nilai dari (2x + 1) − (x − 4) adalah …',
      ans: ['8'],
      wrong: { '0': 'Tanda minus di depan kurung mengubah −4 menjadi +4: (2x + 1) − (x − 4) = x + 5.', '6': 'Sederhanakan dulu: (2x + 1) − (x − 4) = x + 5, lalu ganti x dengan 3.' },
      steps: ['Sederhanakan: 2x + 1 − x + 4 = x + 5.', 'Ganti x = 3: 3 + 5 = 8.', 'Cek langsung: (7) − (−1) = 8.'],
    },
  ],
};

// ---------- 3.3 Perkalian bentuk aljabar ----------
const DIST = eqRow('e', 130, ['−2', '(', 'a', '−', '5', ')'], { size: 44, gap: 6 });

const l3 = {
  id: 'b3-3',
  title: 'Perkalian Bentuk Aljabar',
  hook: 'Kenapa 3(x + 4) = 3x + 12, bukan 3x + 4? Lihat dengan luas persegi panjang.',
  chapters: [
    {
      title: 'Tebak dulu',
      steps: [
        {
          say: '3 kali, x tambah 4. Hasilnya apa?',
          add: [T('q', '3(x + 4) = ?', 200, 140, { size: 48 })],
          ask: {
            options: [
              { t: '3x + 12', ok: true, why: 'Kita lihat dengan model luas.' },
              { t: '3x + 4', why: '3 dikalikan ke semua suku dalam kurung, termasuk 4.' },
              { t: '3x + 7', why: '3 dikalikan ke 4, bukan ditambahkan.' },
            ],
          },
        },
      ],
    },
    {
      title: 'Model luas',
      steps: [
        {
          say: 'Bayangkan persegi panjang dengan lebar 3 dan panjang x tambah 4.',
          clear: true,
          add: [
            T('q', '3(x + 4)', 200, 38, { size: 28 }),
            box('A', 160, 150, 160, 96, { fill: 'pos-soft', r: 0 }),
            box('B', 285, 150, 90, 96, { fill: 'acc-soft', r: 0 }),
            T('tx', 'x', 160, 88, { size: 22 }),
            T('t4', '4', 285, 88, { size: 22 }),
            T('t3', '3', 62, 150, { size: 22 }),
          ],
        },
        {
          say: 'Bagian kiri luasnya 3 kali x, yaitu 3x. Bagian kanan 3 kali 4, yaitu 12.',
          set: { A: { label: '3x', lsize: 26 }, B: { label: '12', lsize: 26 } },
        },
        {
          say: 'Jadi 3 kali, x tambah 4, sama dengan 3x tambah 12. Pengali di luar kurung dikalikan ke setiap suku di dalamnya.',
          add: [T('r', '3(x + 4) = 3x + 12', 200, 240, { size: 30, c: 'pos' })],
        },
      ],
    },
    {
      title: 'Hati-hati tanda',
      steps: [
        { say: 'Sekarang minus 2 kali, a kurang 5.', clear: true, add: DIST },
        {
          say: 'Kalikan minus 2 ke setiap suku. Minus 2 kali a sama dengan minus 2a. Minus 2 kali minus 5 sama dengan positif 10.',
          add: [hop('h1', DIST[0].x + 4, DIST[2].x, 100, { label: '×', h: 26, lsize: 18 }), hop('h2', DIST[0].x + 4, DIST[4].x, 100, { label: '×', h: 46, lsize: 18 })],
        },
        {
          say: 'Hasilnya negatif 2a tambah 10.',
          add: [...eqRow('r', 195, ['=', '−2a', '+', '10'], { size: 40, c: 'pos' }), T('n', '(−2) × (−5) = +10', 200, 258, { size: 18, c: 'mut' })],
        },
      ],
    },
    {
      title: 'Dua suku kali dua suku',
      steps: [
        {
          say: 'x tambah 2, dikali x tambah 3. Buat persegi panjang dengan sisi x tambah 3 dan x tambah 2.',
          clear: true,
          add: [
            box('c00', 170, 125, 120, 110, { r: 0 }),
            box('c01', 260, 125, 60, 110, { r: 0 }),
            box('c10', 170, 200, 120, 40, { r: 0 }),
            box('c11', 260, 200, 60, 40, { r: 0 }),
            T('tx', 'x', 170, 56, { size: 20 }),
            T('t3', '3', 260, 56, { size: 20 }),
            T('lx', 'x', 92, 125, { size: 20 }),
            T('l2', '2', 92, 200, { size: 20 }),
          ],
        },
        {
          say: 'Ada empat bagian. x kali x sama dengan x kuadrat. x kali 3 sama dengan 3x. 2 kali x sama dengan 2x. 2 kali 3 sama dengan 6.',
          set: {
            c00: { fill: 'pos-soft', label: 'x²', lsize: 26 },
            c01: { fill: 'acc-soft', label: '3x', lsize: 20 },
            c10: { fill: 'acc-soft', label: '2x', lsize: 20 },
            c11: { fill: 'mut-soft', label: '6', lsize: 20 },
          },
        },
        {
          say: 'Jumlahkan semuanya, lalu gabungkan suku sejenis: x kuadrat tambah 5x tambah 6.',
          add: [T('r', 'x² + 3x + 2x + 6 = {p:x² + 5x + 6}', 200, 260, { size: 22 })],
        },
      ],
    },
    {
      title: 'Giliranmu',
      steps: [
        {
          say: 'Giliranmu. x kurang 1, dikali x tambah 4. Hasilnya?',
          clear: true,
          add: [T('q', '(x − 1)(x + 4)', 200, 140, { size: 44 })],
          ask: {
            options: [
              { t: 'x² + 3x − 4', ok: true, why: 'x² + 4x − x − 4 = x² + 3x − 4.' },
              { t: 'x² − 4', why: 'Suku tengahnya terlewat: x × 4 = 4x dan −1 × x = −x, jadi ada 3x.' },
              { t: 'x² + 5x − 4', why: '−1 × x = −x, jadi 4x − x = 3x.' },
              { t: 'x² + 3x + 4', why: '−1 × 4 = −4.' },
            ],
          },
        },
        {
          say: 'Kalikan setiap suku: x kali x, x kali 4, minus 1 kali x, minus 1 kali 4. Hasilnya x kuadrat tambah 4x kurang x kurang 4, sama dengan x kuadrat tambah 3x kurang 4.',
          set: { q: { y: 70, size: 34 } },
          add: [T('s1', '= x² + 4x − x − 4', 200, 145, { size: 30 }), T('s2', '= {p:x² + 3x − 4}', 200, 215, { size: 32 })],
        },
      ],
    },
  ],
  quiz: [
    {
      q: '5(2y − 3) = …',
      options: [
        { t: '10y − 15', ok: true },
        { t: '10y − 3', why: '5 dikalikan juga ke 3: 5 × 3 = 15.' },
        { t: '7y − 8', why: '5 dikalikan, bukan ditambahkan.' },
        { t: '10y + 15', why: '5 × (−3) = −15.' },
      ],
      steps: ['5 × 2y = 10y.', '5 × (−3) = −15.', 'Hasilnya 10y − 15.'],
    },
    {
      q: '−3(4 − m) = …',
      options: [
        { t: '−12 + 3m', ok: true },
        { t: '−12 − 3m', why: '(−3) × (−m) = +3m. Negatif kali negatif hasilnya positif.' },
        { t: '12 − 3m', why: '(−3) × 4 = −12.' },
        { t: '−12 + m', why: '−3 juga dikalikan ke m: (−3) × (−m) = 3m.' },
      ],
      steps: ['(−3) × 4 = −12.', '(−3) × (−m) = +3m.', 'Hasilnya −12 + 3m.'],
    },
    {
      q: '(a + 5)(a + 2) = …',
      options: [
        { t: 'a² + 7a + 10', ok: true },
        { t: 'a² + 10', why: 'Suku tengahnya terlewat: a × 2 = 2a dan 5 × a = 5a.' },
        { t: 'a² + 7a + 7', why: '5 × 2 = 10, bukan 5 + 2.' },
        { t: '2a + 7', why: 'Ini menjumlahkan kedua bentuk, bukan mengalikan.' },
      ],
      steps: ['a × a = a², a × 2 = 2a, 5 × a = 5a, 5 × 2 = 10.', 'a² + 2a + 5a + 10 = a² + 7a + 10.'],
    },
    {
      q: 'Luas persegi panjang pada gambar adalah …',
      fig: [box('r', 200, 150, 240, 80, { fill: 'pos-soft', r: 0 }), T('t', '(x + 6) cm', 200, 96, { size: 18 }), T('l', '4 cm', 55, 150, { size: 18 })],
      viewBox: '20 80 360 120',
      figLabel: 'Persegi panjang dengan panjang x + 6 cm dan lebar 4 cm',
      options: [
        { t: '(4x + 24) cm²', ok: true },
        { t: '(4x + 6) cm²', why: '4 dikalikan juga ke 6: 4 × 6 = 24.' },
        { t: '(x + 10) cm²', why: 'Ini menjumlahkan panjang dan lebar. Luas = panjang × lebar.' },
        { t: '(2x + 20) cm²', why: 'Ini keliling: 2 × (x + 6 + 4). Luas = panjang × lebar.' },
      ],
      steps: ['Luas = 4 × (x + 6).', '= 4x + 24 cm².'],
    },
    {
      q: 'Bentuk 6x + 9 sama dengan …',
      options: [
        { t: '3(2x + 3)', ok: true },
        { t: '3(2x + 9)', why: 'Cek dengan membuka kurung: 3 × 9 = 27, bukan 9.' },
        { t: '6(x + 9)', why: 'Cek: 6 × 9 = 54, bukan 9.' },
        { t: '9(6x + 1)', why: 'Cek: 9 × 6x = 54x, bukan 6x.' },
      ],
      steps: ['Cari bilangan yang membagi 6 dan 9: FPB-nya 3.', '6x = 3 × 2x dan 9 = 3 × 3.', 'Jadi 6x + 9 = 3(2x + 3). Cek: 3 × 2x + 3 × 3 = 6x + 9.'],
    },
  ],
};

export default {
  id: 'b3',
  no: 3,
  title: 'Bentuk Aljabar',
  desc: 'Variabel, koefisien, suku sejenis, menjumlah, mengurangkan, dan mengalikan bentuk aljabar.',
  lessons: [l1, l2, l3],
  extra: [
    {
      q: 'Keliling persegi panjang dengan panjang (2x + 3) cm dan lebar (x − 1) cm adalah …',
      options: [
        { t: '(6x + 4) cm', ok: true },
        { t: '(3x + 2) cm', why: 'Itu baru panjang + lebar. Keliling = 2 × (panjang + lebar).' },
        { t: '(2x² + x − 3) cm', why: 'Itu luas (panjang × lebar), bukan keliling.' },
        { t: '(6x + 8) cm', why: '2 × (x − 1) = 2x − 2, jadi konstantanya 6 − 2 = 4.' },
      ],
      steps: ['Keliling = 2 × (panjang + lebar).', '= 2 × (2x + 3 + x − 1) = 2 × (3x + 2).', '= 6x + 4 cm.'],
    },
    {
      type: 'num',
      q: 'Nilai 3a − 2b jika a = {n:−2} dan b = 5 adalah …',
      ans: ['-16'],
      wrong: { '4': '3 × ({n:−2}) = {n:−6}, bukan 6. Jadi {n:−6} − 10 = {n:−16}.', '-4': '2b = 2 × 5 = 10 dikurangkan: {n:−6} − 10 = {n:−16}.' },
      steps: ['3a = 3 × ({n:−2}) = {n:−6}.', '2b = 2 × 5 = 10.', '{n:−6} − 10 = {n:−16}.'],
    },
    {
      q: 'Umur Ani sekarang n tahun. Kakaknya 4 tahun lebih tua. Jumlah umur mereka 5 tahun lagi adalah …',
      options: [
        { t: '2n + 14', ok: true },
        { t: '2n + 9', why: '5 tahun lagi berlaku untuk keduanya, jadi +5 dua kali.' },
        { t: 'n + 14', why: 'Umur Ani dan kakaknya sama-sama memuat n, jadi ada 2n.' },
        { t: '2n + 4', why: 'Jangan lupa tambahan 5 tahun untuk masing-masing.' },
      ],
      steps: ['Ani 5 tahun lagi: n + 5.', 'Kakak 5 tahun lagi: n + 4 + 5 = n + 9.', 'Jumlah: (n + 5) + (n + 9) = 2n + 14.'],
    },
  ],
};
