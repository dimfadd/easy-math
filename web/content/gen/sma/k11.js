// Generator soal Kelas 11 SMA (wajib).
import { L, ri, pick, D, N, F, gcd, G, mi, M, Fr, sup, nz, shuf, fact, C, P, WR, MC, NUM, OPT, poly, pc, xm, plus, pt, triple } from './common.js';

const lin = (a, b, v = 'x') => poly([[a, 1], [b, 0]], v);

// ================= Bab 1: Fungsi =================
const rangeSet = G(
  (rnd, lang) => {
    const a = nz(rnd, -3, 4);
    const b = ri(rnd, -5, 5);
    const d0 = ri(rnd, -2, 2);
    const dom = [d0, d0 + 1, d0 + 2];
    const set = (xs) => `{${xs.map((x) => mi(x)).join(', ')}}`;
    const okT = set(dom.map((x) => a * x + b).sort((p, q) => p - q));
    return OPT(
      L(lang, `Fungsi f(x) = ${lin(a, b)} dengan domain ${set(dom)}. Range-nya adalah …`, `The function f(x) = ${lin(a, b)} has domain ${set(dom)}. Its range is …`),
      okT,
      [
        [set(dom), L(lang, 'Itu domainnya. Range adalah hasil f(x).', 'That is the domain. The range is the set of outputs f(x).')],
        [set(dom.map((x) => a * x - b).sort((p, q) => p - q)), L(lang, `Suku tetapnya ${mi(b)}. Perhatikan tandanya.`, `The constant term is ${mi(b)}. Watch its sign.`)],
        [set(dom.map((x) => a * x).sort((p, q) => p - q)), L(lang, `Jangan lupa menambahkan ${mi(b)}.`, `Remember to add ${mi(b)}.`)],
        [set(dom.map((x) => x + a + b).sort((p, q) => p - q)), L(lang, `x dikali ${mi(a)}, bukan ditambah.`, `x is multiplied by ${mi(a)}, not added to it.`)],
      ],
      [dom.map((x) => `f(${mi(x)}) = ${mi(a * x + b)}`).join(', '), `Range = ${okT}`],
      { a, b, dom },
    );
  },
  (m) => `{${m.dom.map((x) => m.a * x + m.b).sort((p, q) => p - q).map((x) => mi(x)).join(', ')}}`,
);

const KINDS = (lang) => [L(lang, 'bijektif', 'bijective'), L(lang, 'injektif tetapi tidak surjektif', 'injective but not surjective'), L(lang, 'surjektif tetapi tidak injektif', 'surjective but not injective'), L(lang, 'tidak injektif dan tidak surjektif', 'neither injective nor surjective')];
const funcKind = G(
  (rnd, lang) => {
    const nA = ri(rnd, 2, 4);
    const nB = ri(rnd, 2, 4);
    const B = ['a', 'b', 'c', 'd'].slice(0, nB);
    const map = Array.from({ length: nA }, () => ri(rnd, 0, nB - 1));
    const inj = new Set(map).size === nA;
    const sur = new Set(map).size === nB;
    const k = inj && sur ? 0 : inj ? 1 : sur ? 2 : 3;
    const ks = KINDS(lang);
    const why = [
      L(lang, 'Bijektif harus injektif sekaligus surjektif.', 'Bijective must be both injective and surjective.'),
      inj ? L(lang, 'Fungsi ini memang injektif, tetapi cek apakah semua anggota kodomain terkena.', 'It is injective, but check whether every codomain element is hit.') : L(lang, 'Ada dua anggota domain yang menuju anggota yang sama, jadi tidak injektif.', 'Two domain elements go to the same element, so it is not injective.'),
      sur ? L(lang, 'Fungsi ini memang surjektif, tetapi cek apakah ada tujuan yang dipakai dua kali.', 'It is surjective, but check whether some output is used twice.') : L(lang, 'Ada anggota kodomain yang tidak terkena, jadi tidak surjektif.', 'Some codomain element is not hit, so it is not surjective.'),
      L(lang, 'Cek lagi setiap syarat satu per satu.', 'Check each condition again, one at a time.'),
    ];
    const pairs = map.map((j, i) => `(${i + 1}, ${B[j]})`).join(', ');
    return {
      q: L(lang, `Fungsi f dari A = {${Array.from({ length: nA }, (_, i) => i + 1).join(', ')}} ke B = {${B.join(', ')}} adalah {${pairs}}. Fungsi ini …`, `The function f from A = {${Array.from({ length: nA }, (_, i) => i + 1).join(', ')}} to B = {${B.join(', ')}} is {${pairs}}. This function is …`),
      options: ks.map((t, i) => (i === k ? { t, ok: true } : { t, why: why[i] })),
      fixed: true,
      steps: [inj ? L(lang, 'Semua tujuan berbeda → injektif.', 'All outputs differ → injective.') : L(lang, 'Ada tujuan yang dipakai dua kali → tidak injektif.', 'Some output is used twice → not injective.'), sur ? L(lang, 'Semua anggota B terkena → surjektif.', 'Every element of B is hit → surjective.') : L(lang, 'Ada anggota B yang tidak terkena → tidak surjektif.', 'Some element of B is not hit → not surjective.'), ks[k]],
      meta: { nA, nB, map },
    };
  },
  (m, lang) => {
    const used = new Set(m.map);
    const inj = used.size === m.map.length;
    const sur = used.size === m.nB;
    return KINDS(lang)[inj && sur ? 0 : inj ? 1 : sur ? 2 : 3];
  },
);

const countFunc = G(
  (rnd, lang) => {
    const n = ri(rnd, 3, 5);
    const set = (k) => `{${Array.from({ length: k }, (_, i) => i + 1).join(', ')}}`;
    const setB = (k) => `{${'abcde'.slice(0, k).split('').join(', ')}}`;
    return NUM(
      L(lang, `Banyak fungsi bijektif dari A = ${set(n)} ke B = ${setB(n)} adalah …`, `How many bijective functions are there from A = ${set(n)} to B = ${setB(n)}?`),
      D(fact(n)),
      WR(D(fact(n)), [
        [n ** n, L(lang, 'Itu banyak semua fungsi. Fungsi bijektif tidak boleh memakai tujuan yang sama dua kali.', 'That counts all functions. A bijection cannot use the same output twice.')],
        [n, L(lang, `Anggota pertama punya ${n} pilihan, anggota kedua ${n - 1}, dan seterusnya.`, `The first element has ${n} choices, the second ${n - 1}, and so on.`)],
        [n * n, L(lang, 'Pilihannya berkurang satu untuk setiap anggota berikutnya.', 'The choices drop by one for each next element.')],
      ]),
      [L(lang, `Pasangkan satu-satu: ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}`, `Pair one-to-one: ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}`), `= ${fact(n)}`],
      { n },
    );
  },
  (m) => {
    // hitung permutasi dengan menelusuri
    let c = 0;
    const go = (k, used) => {
      if (k === m.n) return void c++;
      for (let j = 0; j < m.n; j++) if (!used[j]) go(k + 1, used.map((u, t) => u || t === j));
    };
    go(0, Array(m.n).fill(false));
    return D(c);
  },
);

// f, g berupa {a, b, sq}: sq ? x² + b : ax + b
const fx = (f, x) => (f.sq ? x * x + f.b : f.a * x + f.b);
const ftxt = (f) => (f.sq ? `x²${plus(f.b)}` : lin(f.a, f.b));
const rlin = (rnd) => ({ a: nz(rnd, -3, 4), b: ri(rnd, -5, 5) });
const compVal = G(
  (rnd, lang) => {
    const f = rnd() < 0.3 ? { sq: true, b: ri(rnd, -4, 4) } : rlin(rnd);
    const g = f.sq ? rlin(rnd) : rnd() < 0.3 ? { sq: true, b: ri(rnd, -4, 4) } : rlin(rnd);
    const x = ri(rnd, -3, 5);
    const gf = rnd() < 0.5;
    const val = gf ? fx(g, fx(f, x)) : fx(f, fx(g, x));
    const wrongV = gf ? fx(f, fx(g, x)) : fx(g, fx(f, x));
    const ex = gf ? `(g ∘ f)(${mi(x)})` : `(f ∘ g)(${mi(x)})`;
    const inner = gf ? fx(f, x) : fx(g, x);
    return NUM(
      L(lang, `Jika f(x) = ${ftxt(f)} dan g(x) = ${ftxt(g)}, nilai ${ex} adalah …`, `If f(x) = ${ftxt(f)} and g(x) = ${ftxt(g)}, the value of ${ex} is …`),
      D(val),
      WR(D(val), [
        [wrongV, L(lang, `Urutannya terbalik. Pada ${gf ? 'g ∘ f' : 'f ∘ g'}, fungsi ${gf ? 'f' : 'g'} dikerjakan lebih dulu.`, `The order is reversed. In ${gf ? 'g ∘ f' : 'f ∘ g'}, ${gf ? 'f' : 'g'} is applied first.`)],
        [inner, L(lang, `Itu baru ${gf ? 'f' : 'g'}(${mi(x)}). Masukkan lagi ke fungsi ${gf ? 'g' : 'f'}.`, `That is only ${gf ? 'f' : 'g'}(${mi(x)}). Feed it into ${gf ? 'g' : 'f'}.`)],
        [fx(f, x) * fx(g, x), L(lang, 'Komposisi bukan perkalian f(x) × g(x).', 'Composition is not the product f(x) × g(x).')],
      ]),
      [`${gf ? 'f' : 'g'}(${mi(x)}) = ${mi(inner)}`, `${gf ? 'g' : 'f'}(${mi(inner)}) = ${mi(val)}`],
      { f, g, x, gf },
    );
  },
  (m) => {
    const ev = (h, x) => (h.sq ? Math.pow(x, 2) + h.b : h.a * x + h.b);
    return D(m.gf ? ev(m.g, ev(m.f, m.x)) : ev(m.f, ev(m.g, m.x)));
  },
);

// (f ∘ g)(x) sebagai polinomial koefisien
const compPoly = (f, g) => {
  // g dalam koefisien [x², x, 1]
  const G2 = g.sq ? [1, 0, g.b] : [0, g.a, g.b];
  if (f.sq) {
    // (G2)² + f.b, G2 linear di sini
    const [, a, b] = G2;
    return [a * a, 2 * a * b, b * b + f.b];
  }
  return [f.a * G2[0], f.a * G2[1], f.a * G2[2] + f.b];
};
const compExpr = G(
  (rnd, lang) => {
    const sqFirst = rnd() < 0.4;
    const f = sqFirst ? { sq: true, b: ri(rnd, -3, 3) } : rlin(rnd);
    const g = sqFirst ? { a: nz(rnd, -2, 3), b: nz(rnd, -4, 4) } : rnd() < 0.3 ? { sq: true, b: nz(rnd, -3, 3) } : { a: nz(rnd, -3, 3), b: nz(rnd, -4, 4) };
    const fg = compPoly(f, g);
    const gf = compPoly(g, f);
    const okT = pc(fg[0] ? fg : fg.slice(1));
    const t = (cs) => pc(cs[0] ? cs : cs.slice(1));
    const ff = f.sq ? [1, 0, f.b] : [0, f.a, f.b];
    const gg = g.sq ? [1, 0, g.b] : [0, g.a, g.b];
    return OPT(
      L(lang, `Jika f(x) = ${ftxt(f)} dan g(x) = ${ftxt(g)}, maka (f ∘ g)(x) = …`, `If f(x) = ${ftxt(f)} and g(x) = ${ftxt(g)}, then (f ∘ g)(x) = …`),
      okT,
      [
        [t(gf), L(lang, 'Itu (g ∘ f)(x). Pada f ∘ g, g(x) dimasukkan ke dalam f.', 'That is (g ∘ f)(x). In f ∘ g, g(x) is substituted into f.')],
        [t([ff[0] + gg[0], ff[1] + gg[1], ff[2] + gg[2]]), L(lang, 'Komposisi bukan penjumlahan f(x) + g(x).', 'Composition is not the sum f(x) + g(x).')],
        [f.sq ? t([fg[0], 0, g.b * g.b + f.b]) : t([fg[0], fg[1], f.a * gg[2]]), f.sq ? L(lang, `(${ftxt(g)})² harus dijabarkan lengkap, termasuk suku tengahnya.`, `(${ftxt(g)})² must be expanded fully, including the middle term.`) : L(lang, `Jangan lupa suku tetap ${mi(f.b)} dari f.`, `Do not forget the constant ${mi(f.b)} from f.`)],
        [t([fg[0], fg[1], fg[2] + 1]), L(lang, 'Periksa lagi suku tetapnya.', 'Check the constant term again.')],
      ],
      [`(f ∘ g)(x) = f(${ftxt(g)})`, `= ${okT}`],
      { f, g },
    );
  },
  (m) => {
    // hitung lewat tiga titik lalu interpolasi
    const ev = (h, x) => (h.sq ? x * x + h.b : h.a * x + h.b);
    const y = [0, 1, -1].map((x) => ev(m.f, ev(m.g, x)));
    const c = y[0];
    const a = (y[1] + y[2]) / 2 - c;
    const b = (y[1] - y[2]) / 2;
    return pc(a ? [a, b, c] : [b, c]);
  },
);

const compFind = G(
  (rnd, lang) => {
    const a = pick(rnd, [2, 3, -2, 4]);
    const b = ri(rnd, -5, 5);
    const p = nz(rnd, -3, 4);
    const q = ri(rnd, -4, 6);
    const k = ri(rnd, -2, 4);
    const gk = p * k + q;
    return NUM(
      L(lang, `Jika f(x) = ${lin(a, b)} dan (f ∘ g)(x) = ${lin(a * p, a * q + b)}, maka g(${mi(k)}) = …`, `If f(x) = ${lin(a, b)} and (f ∘ g)(x) = ${lin(a * p, a * q + b)}, then g(${mi(k)}) = …`),
      D(gk),
      WR(D(gk), [
        [a * p * k + a * q + b, L(lang, `Itu (f ∘ g)(${mi(k)}). Yang ditanya g(${mi(k)}).`, `That is (f ∘ g)(${mi(k)}). The question asks for g(${mi(k)}).`)],
        [a * k + b, L(lang, `Itu f(${mi(k)}).`, `That is f(${mi(k)}).`)],
      ]),
      [`f(g(x)) = ${a}·g(x)${plus(b)} = ${lin(a * p, a * q + b)}`, `g(x) = ${lin(p, q)}`, `g(${mi(k)}) = ${mi(gk)}`],
      { a, b, c: a * p, d: a * q + b, k },
    );
  },
  (m) => D((m.c * m.k + m.d - m.b) / m.a),
);

const invVal = G(
  (rnd, lang) => {
    const a = nz(rnd, -4, 5);
    const b = ri(rnd, -6, 8);
    const x0 = ri(rnd, -4, 6);
    const y = a * x0 + b;
    if (rnd() < 0.4) {
      const p = nz(rnd, -3, 3);
      const q = ri(rnd, -4, 4);
      // (f ∘ g)(x) = a(px + q) + b
      const z = a * (p * x0 + q) + b;
      return NUM(
        L(lang, `Jika f(x) = ${lin(a, b)} dan g(x) = ${lin(p, q)}, nilai (f ∘ g)⁻¹(${mi(z)}) adalah …`, `If f(x) = ${lin(a, b)} and g(x) = ${lin(p, q)}, the value of (f ∘ g)⁻¹(${mi(z)}) is …`),
        D(x0),
        WR(D(x0), [
          [a * (p * z + q) + b, L(lang, `Itu (f ∘ g)(${mi(z)}). Yang ditanya inversnya: cari x dengan (f ∘ g)(x) = ${mi(z)}.`, `That is (f ∘ g)(${mi(z)}). We need the inverse: find x with (f ∘ g)(x) = ${mi(z)}.`)],
          [p * x0 + q, L(lang, 'Itu nilai g(x). Selesaikan sampai x.', 'That is g(x). Solve all the way to x.')],
        ]),
        [`(f ∘ g)(x) = ${lin(a * p, a * q + b)}`, `${lin(a * p, a * q + b)} = ${mi(z)} → x = ${mi(x0)}`],
        { kind: 'comp', a, b, p, q, z },
      );
    }
    return NUM(
      L(lang, `Jika f(x) = ${lin(a, b)}, nilai f⁻¹(${mi(y)}) adalah …`, `If f(x) = ${lin(a, b)}, the value of f⁻¹(${mi(y)}) is …`),
      D(x0),
      WR(D(x0), [
        [a * y + b, L(lang, `Itu f(${mi(y)}). f⁻¹(${mi(y)}) adalah x yang membuat f(x) = ${mi(y)}.`, `That is f(${mi(y)}). f⁻¹(${mi(y)}) is the x with f(x) = ${mi(y)}.`)],
        [(y + b) / a, L(lang, `Pindahkan ${mi(b)} dengan tanda berlawanan.`, `Move ${mi(b)} across with the opposite sign.`)],
        [y - b, L(lang, `Masih harus dibagi ${mi(a)}.`, `You still need to divide by ${mi(a)}.`)],
      ]),
      [`${lin(a, b)} = ${mi(y)}`, `x = (${mi(y)} − ${b < 0 ? `(${mi(b)})` : b}) ÷ ${a < 0 ? `(${mi(a)})` : a} = ${mi(x0)}`],
      { kind: 'f', a, b, y },
    );
  },
  (m) => {
    if (m.kind === 'f') return D((m.y - m.b) / m.a);
    // balik langkah: f dulu, lalu g
    const gx = (m.z - m.b) / m.a;
    return D((gx - m.q) / m.p);
  },
);

// f(x) = (ax + b)/c → f⁻¹(x) = (cx − b)/a
const fracLin = (a, b, c) => (c === 1 ? lin(a, b) : `(${lin(a, b)})/${c}`);
const invExpr = G(
  (rnd, lang) => {
    let a, b, c;
    do {
      a = pick(rnd, [1, 2, 3, 4, 5]);
      b = nz(rnd, -7, 7);
      c = pick(rnd, [1, 1, 2, 3, 4]);
    } while ((a === 1 && c === 1 && rnd() < 0.5) || (a === c && a !== 1) || gcd(gcd(a, Math.abs(b)), c) > 1);
    const okT = `f⁻¹(x) = ${fracLin(c, -b, a)}`;
    return OPT(
      L(lang, `Invers dari f(x) = ${fracLin(a, b, c)} adalah …`, `The inverse of f(x) = ${fracLin(a, b, c)} is …`),
      okT,
      [
        [`f⁻¹(x) = ${fracLin(c, b, a)}`, L(lang, `Saat memindahkan ${mi(b)}, tandanya berubah.`, `When moving ${mi(b)}, its sign changes.`)],
        [`f⁻¹(x) = ${c === 1 && a === 1 ? `1/(${lin(1, b)})` : `${c}/(${lin(a, b)})`}`, L(lang, 'Invers bukan kebalikan (1 per f). Tukar x dan y, lalu selesaikan.', 'The inverse is not the reciprocal. Swap x and y, then solve.')],
        [`f⁻¹(x) = ${fracLin(a, -b, c)}`, L(lang, 'Pembagi dan pengali harus ikut ditukar.', 'The multiplier and divisor must swap too.')],
        [`f⁻¹(x) = ${fracLin(-c, -b, a)}`, L(lang, 'Koefisien x tidak berganti tanda.', 'The coefficient of x does not change sign.')],
      ],
      [`y = ${fracLin(a, b, c)} → ${c === 1 ? '' : c}y = ${lin(a, b)}`, `x = ${fracLin(c, -b, a).replace(/x/g, 'y')}`, okT],
      { a, b, c },
    );
  },
  (m) => {
    // invers dari dua titik: f(0) = b/c, f(1) = (a+b)/c; f⁻¹ linear dengan gradien c/a
    const y0 = m.b / m.c;
    const slope = m.c / m.a;
    // f⁻¹(x) = slope (x − y0) = (c x − b)/a
    return `f⁻¹(x) = ${fracLin(slope * m.a, -y0 * slope * m.a, m.a)}`;
  },
);

// ================= Bab 2: Lingkaran =================
const circAngle = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['c2i', 'i2c', 'cyc', 'diam']);
    if (kind === 'c2i') {
      const c = ri(rnd, 20, 170) * 2;
      return NUM(
        L(lang, `Sudut pusat AOB = ${c}°. Besar sudut keliling ACB yang menghadap busur AB adalah … °`, `The central angle AOB = ${c}°. The inscribed angle ACB on arc AB is … °`),
        D(c / 2),
        WR(D(c / 2), [
          [c * 2, L(lang, 'Sudut keliling setengah sudut pusat, bukan dua kali.', 'The inscribed angle is half the central angle, not double.')],
          [c, L(lang, 'Sudut keliling tidak sama dengan sudut pusat.', 'The inscribed angle is not equal to the central angle.')],
          [180 - c, L(lang, 'Ini bukan sudut berpelurus.', 'These angles are not supplementary.')],
        ]),
        [L(lang, 'sudut keliling = ½ × sudut pusat', 'inscribed angle = ½ × central angle'), `= ½ × ${c}° = ${c / 2}°`],
        { kind, v: c },
      );
    }
    if (kind === 'i2c') {
      const i = ri(rnd, 15, 85);
      return NUM(
        L(lang, `∠ACB = ∠ADB = ${i}°, keduanya menghadap busur AB. Besar sudut pusat AOB adalah … °`, `∠ACB = ∠ADB = ${i}°, both on arc AB. The central angle AOB is … °`),
        D(2 * i),
        WR(D(2 * i), [
          [i / 2, L(lang, 'Sudut pusat dua kali sudut keliling.', 'The central angle is double the inscribed angle.')],
          [i, L(lang, 'Sudut pusat lebih besar dari sudut keliling.', 'The central angle is larger than the inscribed angle.')],
          [4 * i, L(lang, 'Kedua sudut keliling sama besar; jangan dijumlahkan.', 'Both inscribed angles are equal; do not add them.')],
        ]),
        [L(lang, 'sudut pusat = 2 × sudut keliling', 'central angle = 2 × inscribed angle'), `= 2 × ${i}° = ${2 * i}°`],
        { kind, v: i },
      );
    }
    if (kind === 'cyc') {
      const b = ri(rnd, 50, 140);
      const [p, q] = pick(rnd, [
        ['B', 'D'],
        ['A', 'C'],
        ['D', 'B'],
        ['C', 'A'],
      ]);
      return NUM(
        L(lang, `ABCD segi empat tali busur dengan ∠${p} = ${b}°. Besar ∠${q} adalah … °`, `ABCD is a cyclic quadrilateral with ∠${p} = ${b}°. Find ∠${q} in degrees.`),
        D(180 - b),
        WR(D(180 - b), [
          [b, L(lang, 'Sudut yang berhadapan pada segi empat tali busur berjumlah 180°, bukan sama besar.', 'Opposite angles of a cyclic quadrilateral add to 180°; they are not equal.')],
          [360 - b, L(lang, 'Jumlahnya 180°, bukan 360°.', 'They add to 180°, not 360°.')],
        ]),
        [`∠${p} + ∠${q} = 180°`, `∠${q} = 180° − ${b}° = ${180 - b}°`],
        { kind, v: b },
      );
    }
    const a = ri(rnd, 15, 75);
    return NUM(
      L(lang, `AB diameter lingkaran dan C di lingkaran. Jika ∠CAB = ${a}°, maka ∠CBA = … °`, `AB is a diameter and C lies on the circle. If ∠CAB = ${a}°, then ∠CBA = … °`),
      D(90 - a),
      WR(D(90 - a), [
        [180 - a, L(lang, '∠ACB = 90° karena menghadap diameter. Kurangi 90° juga.', '∠ACB = 90° since it faces the diameter. Subtract that 90° too.')],
        [a, L(lang, 'Segitiganya tidak sama kaki.', 'The triangle is not isosceles.')],
      ]),
      [L(lang, '∠ACB = 90° (menghadap diameter)', '∠ACB = 90° (it faces the diameter)'), `∠CBA = 180° − 90° − ${a}° = ${90 - a}°`],
      { kind, v: a },
    );
  },
  (m) => D({ c2i: m.v / 2, i2c: m.v * 2, cyc: 180 - m.v, diam: 180 - 90 - m.v }[m.kind]),
);

const chord = G(
  (rnd, lang) => {
    let [c, d, r] = triple(rnd, 40);
    const kind = pick(rnd, ['dist', 'chord', 'rad', 'diam']);
    if (kind === 'dist' || kind === 'diam') {
      const diam = kind === 'diam';
      return NUM(
        diam ? L(lang, `Diameter lingkaran ${2 * r} cm dan tali busur ${2 * c} cm. Jarak tali busur ke pusat adalah … cm`, `A circle has diameter ${2 * r} cm and a chord of ${2 * c} cm. The distance from the chord to the centre is … cm`) : L(lang, `Jari-jari lingkaran ${r} cm dan panjang tali busur ${2 * c} cm. Jarak tali busur ke pusat adalah … cm`, `A circle has radius ${r} cm and a chord of length ${2 * c} cm. The distance from the chord to the centre is … cm`),
        D(d),
        WR(D(d), [
          [r - c, L(lang, 'Pakai Pythagoras: d² = r² − (½ tali busur)².', 'Use Pythagoras: d² = r² − (½ chord)².')],
          [diam && Number.isInteger(Math.sqrt(4 * r * r - c * c)) ? Math.sqrt(4 * r * r - c * c) : null, L(lang, 'Jari-jari adalah setengah diameter.', 'The radius is half the diameter.')],
          [r * r - c * c, L(lang, 'Itu d². Ambil akarnya.', 'That is d². Take the square root.')],
        ]),
        [L(lang, `Setengah tali busur = ${c}, jari-jari = ${r}`, `Half chord = ${c}, radius = ${r}`), `d = √(${r}² − ${c}²) = √${r * r - c * c} = ${d}`],
        { kind, c, r },
      );
    }
    if (kind === 'chord')
      return NUM(
        L(lang, `Jari-jari lingkaran ${r} cm dan jarak tali busur ke pusat ${d} cm. Panjang tali busur adalah … cm`, `A circle has radius ${r} cm and a chord ${d} cm from the centre. The chord is … cm long`),
        D(2 * c),
        WR(D(2 * c), [
          [c, L(lang, `${c} hanya setengah tali busur. Kalikan 2.`, `${c} is only half the chord. Multiply by 2.`)],
          [2 * (r - d), L(lang, 'Pakai Pythagoras, bukan selisih biasa.', 'Use Pythagoras, not a plain difference.')],
        ]),
        [`½ ${L(lang, 'tali busur', 'chord')} = √(${r}² − ${d}²) = ${c}`, `${L(lang, 'Tali busur', 'Chord')} = 2 × ${c} = ${2 * c}`],
        { kind, d, r },
      );
    return NUM(
      L(lang, `Tali busur ${2 * c} cm berjarak ${d} cm dari pusat. Jari-jari lingkaran adalah … cm`, `A chord of ${2 * c} cm is ${d} cm from the centre. The radius is … cm`),
      D(r),
      WR(D(r), [
        [c + d, L(lang, 'Pakai Pythagoras: r² = d² + (½ tali busur)².', 'Use Pythagoras: r² = d² + (½ chord)².')],
        [Number.isInteger(Math.hypot(2 * c, d)) ? Math.hypot(2 * c, d) : null, L(lang, 'Pakai setengah tali busur.', 'Use half the chord.')],
        [2 * r, L(lang, 'Itu diameternya.', 'That is the diameter.')],
      ]),
      [`½ ${L(lang, 'tali busur', 'chord')} = ${c}`, `r = √(${c}² + ${d}²) = √${r * r} = ${r}`],
      { kind, c, d },
    );
  },
  (m) => {
    if (m.kind === 'chord') return D(2 * Math.sqrt(m.r * m.r - m.d * m.d));
    if (m.kind === 'rad') return D(Math.hypot(m.c, m.d));
    return D(Math.sqrt(m.r * m.r - m.c * m.c));
  },
);

const tangent = G(
  (rnd, lang) => {
    const [r, t, d] = triple(rnd, 50);
    const kind = pick(rnd, ['t', 'd', 'r', 'kite']);
    if (kind === 'kite')
      return NUM(
        L(lang, `Dari titik P ditarik dua garis singgung PA dan PB ke lingkaran berpusat O dan berjari-jari ${r} cm. Jika PA = ${t} cm, luas layang-layang OAPB adalah … cm²`, `From P two tangents PA and PB are drawn to a circle with centre O and radius ${r} cm. If PA = ${t} cm, the area of kite OAPB is … cm²`),
        D(r * t),
        WR(D(r * t), [
          [(r * t) / 2, L(lang, 'Itu luas satu segitiga OAP. Layang-layang terdiri dari dua segitiga.', 'That is one triangle OAP. The kite has two triangles.')],
          [2 * r * t, L(lang, 'Luas segitiga siku-siku = ½ × alas × tinggi.', 'Area of a right triangle = ½ × base × height.')],
        ]),
        [L(lang, `OA ⟂ PA, luas OAP = ½ × ${r} × ${t} = ${(r * t) / 2}`, `OA ⟂ PA, area of OAP = ½ × ${r} × ${t} = ${(r * t) / 2}`), L(lang, `Luas OAPB = 2 × ${(r * t) / 2} = ${r * t}`, `Area of OAPB = 2 × ${(r * t) / 2} = ${r * t}`)],
        { kind, r, t },
      );
    const ask = { t: t, d: d, r: r }[kind];
    const q = {
      t: L(lang, `Jari-jari lingkaran ${r} cm dan jarak titik P ke pusat ${d} cm. Panjang garis singgung dari P adalah … cm`, `The radius is ${r} cm and P is ${d} cm from the centre. The tangent from P is … cm long`),
      d: L(lang, `Panjang garis singgung dari P adalah ${t} cm dan jari-jari lingkaran ${r} cm. Jarak P ke pusat adalah … cm`, `The tangent from P is ${t} cm and the radius is ${r} cm. The distance from P to the centre is … cm`),
      r: L(lang, `Jarak titik P ke pusat lingkaran ${d} cm dan panjang garis singgungnya ${t} cm. Jari-jari lingkaran adalah … cm`, `P is ${d} cm from the centre and its tangent is ${t} cm long. The radius is … cm`),
    }[kind];
    return NUM(
      q,
      D(ask),
      WR(D(ask), [
        [kind === 'd' ? r + t : d - (kind === 't' ? r : t), L(lang, 'Jari-jari tegak lurus garis singgung, jadi pakai Pythagoras.', 'The radius is perpendicular to the tangent, so use Pythagoras.')],
        [kind === 'd' ? null : ask * ask, L(lang, 'Ambil akarnya.', 'Take the square root.')],
        [kind !== 'd' && Number.isInteger(Math.hypot(d, kind === 't' ? r : t)) ? Math.hypot(d, kind === 't' ? r : t) : null, L(lang, 'Sisi miringnya adalah jarak P ke pusat, jadi kurangkan kuadratnya.', 'The hypotenuse is the distance from P to the centre, so subtract the squares.')],
      ]),
      [L(lang, 'Jari-jari ⟂ garis singgung, jadi (jarak ke pusat)² = r² + (garis singgung)².', 'Radius ⟂ tangent, so (distance to centre)² = r² + (tangent)².'), { t: `√(${d}² − ${r}²) = ${t}`, d: `√(${r}² + ${t}²) = ${d}`, r: `√(${d}² − ${t}²) = ${r}` }[kind]],
      { kind, r, t, d },
    );
  },
  (m) => (m.kind === 'kite' ? D(m.r * m.t) : D({ t: Math.sqrt(m.d * m.d - m.r * m.r), d: Math.hypot(m.r, m.t), r: Math.sqrt(m.d * m.d - m.t * m.t) }[m.kind])),
);

const sq = (h, v) => (h === 0 ? `${v}²` : `${xm(h, v)}²`);
const circEq = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['eq', 'center', 'pos']);
    const a = kind === 'pos' ? 0 : ri(rnd, -5, 5);
    const b = kind === 'pos' ? 0 : ri(rnd, -5, 5);
    const r = ri(rnd, 2, 9);
    const eq = (A, B, R2) => `${sq(A, 'x')} + ${sq(B, 'y')} = ${R2}`;
    if (kind === 'eq') {
      const okT = eq(a, b, r * r);
      return OPT(
        L(lang, `Persamaan lingkaran berpusat di ${pt(a, b)} dengan jari-jari ${r} adalah …`, `The equation of the circle with centre ${pt(a, b)} and radius ${r} is …`),
        okT,
        [
          [eq(a, b, r), L(lang, 'Ruas kanan adalah r², bukan r.', 'The right side is r², not r.')],
          [eq(-a, -b, r * r), L(lang, 'Pusat (a, b) memberi (x − a)² dan (y − b)². Tandanya berlawanan.', 'Centre (a, b) gives (x − a)² and (y − b)². The signs are opposite.')],
          [eq(a, b, 2 * r), L(lang, 'Ruas kanan adalah r², bukan 2r.', 'The right side is r², not 2r.')],
          [eq(b, a, r * r), L(lang, 'Koordinat pusatnya tertukar.', 'The centre coordinates are swapped.')],
        ],
        [L(lang, '(x − a)² + (y − b)² = r²', '(x − a)² + (y − b)² = r²'), okT],
        { kind, a, b, r },
      );
    }
    if (kind === 'center') {
      if (rnd() < 0.5) {
        const okT = pt(a, b);
        return OPT(
          L(lang, `Pusat lingkaran ${eq(a, b, r * r)} adalah …`, `The centre of the circle ${eq(a, b, r * r)} is …`),
          okT,
          [
            [pt(-a, -b), L(lang, 'Tanda di dalam kurung dibalik untuk mendapatkan pusat.', 'Flip the signs inside the brackets to get the centre.')],
            [pt(a, -b), L(lang, 'Koordinat y juga dibalik tandanya.', 'The y-coordinate must also be flipped.')],
            [pt(r, r), L(lang, `${r} adalah jari-jari, bukan pusat.`, `${r} is the radius, not the centre.`)],
            [pt(b, a), L(lang, 'Koordinatnya tertukar.', 'The coordinates are swapped.')],
          ],
          [L(lang, '(x − a)² + (y − b)² = r² berpusat di (a, b)', '(x − a)² + (y − b)² = r² has centre (a, b)'), okT],
          { kind, a, b, r, ask: 'c' },
        );
      }
      return NUM(
        L(lang, `Jari-jari lingkaran ${eq(a, b, r * r)} adalah …`, `The radius of the circle ${eq(a, b, r * r)} is …`),
        D(r),
        WR(D(r), [
          [r * r, L(lang, 'Ruas kanan adalah r². Ambil akarnya.', 'The right side is r². Take the square root.')],
          [(r * r) / 2, L(lang, 'Jari-jari = √(ruas kanan), bukan setengahnya.', 'Radius = √(right side), not half of it.')],
        ]),
        [`r² = ${r * r}`, `r = ${r}`],
        { kind, a, b, r, ask: 'r' },
      );
    }
    let x, y;
    do {
      x = ri(rnd, -r - 1, r + 1);
      y = ri(rnd, -r - 1, r + 1);
    } while (rnd() < 0.6 && x * x + y * y !== r * r);
    const s = x * x + y * y;
    const opts = [L(lang, 'di dalam lingkaran', 'inside the circle'), L(lang, 'pada lingkaran', 'on the circle'), L(lang, 'di luar lingkaran', 'outside the circle')];
    const k = s < r * r ? 0 : s === r * r ? 1 : 2;
    return {
      q: L(lang, `Letak titik ${pt(x, y)} terhadap lingkaran x² + y² = ${r * r} adalah …`, `Where is the point ${pt(x, y)} relative to the circle x² + y² = ${r * r}?`),
      options: opts.map((t, i) => (i === k ? { t, ok: true } : { t, why: L(lang, `${x < 0 ? `(${mi(x)})` : x}² + ${y < 0 ? `(${mi(y)})` : y}² = ${s}, bandingkan dengan ${r * r}.`, `${x < 0 ? `(${mi(x)})` : x}² + ${y < 0 ? `(${mi(y)})` : y}² = ${s}; compare it with ${r * r}.`) })),
      fixed: true,
      steps: [`${x < 0 ? `(${mi(x)})` : x}² + ${y < 0 ? `(${mi(y)})` : y}² = ${s}`, `${s} ${k === 0 ? '<' : k === 1 ? '=' : '>'} ${r * r}: ${opts[k]}`],
      meta: { kind, x, y, r },
    };
  },
  (m, lang) => {
    if (m.kind === 'eq') return `${sq(m.a, 'x')} + ${sq(m.b, 'y')} = ${m.r * m.r}`;
    if (m.kind === 'center') return m.ask === 'c' ? pt(m.a, m.b) : D(m.r);
    const dist = Math.hypot(m.x, m.y);
    return dist < m.r - 1e-9 ? L(lang, 'di dalam lingkaran', 'inside the circle') : Math.abs(dist - m.r) < 1e-9 ? L(lang, 'pada lingkaran', 'on the circle') : L(lang, 'di luar lingkaran', 'outside the circle');
  },
);

const circRadPt = G(
  (rnd, lang) => {
    const [x0, y0, r] = triple(rnd, 30);
    const a = ri(rnd, -4, 4);
    const b = ri(rnd, -4, 4);
    const x = a + x0 * (rnd() < 0.5 ? -1 : 1);
    const y = b + y0 * (rnd() < 0.5 ? -1 : 1);
    return NUM(
      L(lang, `Lingkaran berpusat di ${pt(a, b)} melalui titik ${pt(x, y)}. Jari-jarinya adalah …`, `A circle with centre ${pt(a, b)} passes through ${pt(x, y)}. Its radius is …`),
      D(r),
      WR(D(r), [
        [Math.abs(x - a) + Math.abs(y - b), L(lang, 'Jari-jari adalah jarak dua titik: pakai Pythagoras.', 'The radius is the distance between the points: use Pythagoras.')],
        [r * r, L(lang, 'Itu r². Ambil akarnya.', 'That is r². Take the square root.')],
      ]),
      [`r² = (${mi(x)} − ${a < 0 ? `(${mi(a)})` : a})² + (${mi(y)} − ${b < 0 ? `(${mi(b)})` : b})² = ${x0 * x0} + ${y0 * y0} = ${r * r}`, `r = ${r}`],
      { a, b, x, y },
    );
  },
  (m) => D(Math.hypot(m.x - m.a, m.y - m.b)),
);

// ================= Bab 3: Data dua variabel =================
const SCATTER_POOL = [
  ['Titik-titik diagram pencar naik dari kiri bawah ke kanan atas. Hubungan kedua variabel adalah …', 'The points of a scatter plot rise from bottom left to top right. The relationship is …', 'korelasi positif', 'positive correlation', [['korelasi negatif', 'negative correlation', 'Negatif berarti titiknya turun.', 'Negative means the points fall.'], ['tidak ada korelasi', 'no correlation', 'Ada arah naik yang jelas.', 'There is a clear upward trend.'], ['tidak bisa ditentukan', 'cannot be determined', 'Arah titik sudah cukup untuk menentukan jenis korelasi.', 'The direction of the points is enough to decide.']]],
  ['Titik-titik diagram pencar turun dari kiri atas ke kanan bawah. Hubungan kedua variabel adalah …', 'The points of a scatter plot fall from top left to bottom right. The relationship is …', 'korelasi negatif', 'negative correlation', [['korelasi positif', 'positive correlation', 'Positif berarti titiknya naik.', 'Positive means the points rise.'], ['tidak ada korelasi', 'no correlation', 'Ada arah turun yang jelas.', 'There is a clear downward trend.'], ['tidak bisa ditentukan', 'cannot be determined', 'Arah titik sudah cukup untuk menentukan jenis korelasi.', 'The direction of the points is enough to decide.']]],
  ['Pasangan variabel manakah yang kemungkinan besar berkorelasi negatif?', 'Which pair of variables is most likely negatively correlated?', 'kecepatan mobil dan waktu tempuh', 'car speed and travel time', [['tinggi badan dan berat badan', 'height and weight', 'Orang yang lebih tinggi cenderung lebih berat: positif.', 'Taller people tend to be heavier: positive.'], ['nomor absen dan nilai ujian', 'register number and test score', 'Nomor absen tidak berhubungan dengan nilai.', 'Register number has nothing to do with the score.'], ['jam belajar dan nilai ujian', 'study hours and test score', 'Makin lama belajar, nilai cenderung naik: positif.', 'More study tends to raise the score: positive.']]],
  ['Pasangan variabel manakah yang kemungkinan besar berkorelasi positif?', 'Which pair of variables is most likely positively correlated?', 'luas rumah dan harga rumah', 'house size and house price', [['suhu udara dan penjualan jaket', 'air temperature and jacket sales', 'Makin panas, jaket makin jarang dibeli: negatif.', 'The hotter it is, the fewer jackets sold: negative.'], ['ukuran sepatu dan nilai matematika', 'shoe size and maths score', 'Keduanya tidak berhubungan.', 'These are unrelated.'], ['umur mobil dan harga jualnya', 'age of a car and its resale price', 'Mobil makin tua makin murah: negatif.', 'Older cars sell for less: negative.']]],
  ['Pasangan variabel manakah yang kemungkinan besar tidak berkorelasi?', 'Which pair of variables is most likely uncorrelated?', 'tanggal lahir dan tinggi badan', 'day of birth and height', [['jarak tempuh dan bensin yang dipakai', 'distance driven and fuel used', 'Makin jauh, makin banyak bensin: positif.', 'Further means more fuel: positive.'], ['jam bermain gim dan jam tidur', 'gaming hours and sleeping hours', 'Kemungkinan negatif: makin lama main, tidur makin sedikit.', 'Probably negative: more gaming, less sleep.'], ['banyak pekerja dan lama menyelesaikan proyek', 'number of workers and time to finish a project', 'Makin banyak pekerja, makin cepat selesai: negatif.', 'More workers finish faster: negative.']]],
  ['Diagram pencar paling tepat dipakai untuk …', 'A scatter plot is best used to …', 'melihat hubungan dua variabel', 'see the relationship between two variables', [['menunjukkan bagian dari keseluruhan', 'show parts of a whole', 'Itu diagram lingkaran.', 'That is a pie chart.'], ['membandingkan frekuensi kelas', 'compare class frequencies', 'Itu histogram.', 'That is a histogram.'], ['menunjukkan perubahan satu data dari waktu ke waktu', 'show one variable changing over time', 'Itu diagram garis.', 'That is a line graph.']]],
  ['Titik-titik diagram pencar menyebar tanpa arah yang jelas. Artinya …', 'The points of a scatter plot are spread with no clear direction. This means …', 'hampir tidak ada korelasi', 'there is almost no correlation', [['korelasi positif kuat', 'strong positive correlation', 'Korelasi kuat terlihat sebagai titik yang rapat di sekitar garis.', 'A strong correlation shows points close to a line.'], ['korelasi negatif kuat', 'strong negative correlation', 'Tidak ada arah turun yang jelas.', 'There is no clear downward trend.'], ['datanya salah', 'the data is wrong', 'Data yang tidak berkorelasi tetap data yang sah.', 'Uncorrelated data is still valid data.']]],
  ['Pada diagram pencar, satu titik mewakili …', 'On a scatter plot, one point represents …', 'satu pasangan data (x, y)', 'one pair of data (x, y)', [['satu nilai x saja', 'one x-value only', 'Setiap titik punya dua koordinat.', 'Each point has two coordinates.'], ['rata-rata seluruh data', 'the mean of all the data', 'Rata-rata hanya satu titik khusus, bukan setiap titik.', 'The mean is one special point, not every point.'], ['banyak data', 'the number of data values', 'Banyak data sama dengan banyak titik, bukan satu titik.', 'The number of values equals the number of points, not one point.']]],
  ['Titik-titik diagram pencar sangat rapat di sekitar garis naik. Korelasinya …', 'The points lie very close to a rising line. The correlation is …', 'positif kuat', 'strong positive', [['positif lemah', 'weak positive', 'Titik yang rapat di sekitar garis menunjukkan hubungan kuat.', 'Points close to a line show a strong relationship.'], ['negatif kuat', 'strong negative', 'Garisnya naik, jadi positif.', 'The line rises, so it is positive.'], ['tidak ada', 'none', 'Ada pola yang jelas.', 'There is a clear pattern.']]],
  ['Titik-titik naik, tetapi menyebar lebar dari garis. Korelasinya …', 'The points rise but are widely scattered around the line. The correlation is …', 'positif lemah', 'weak positive', [['positif kuat', 'strong positive', 'Kuat kalau titiknya rapat di sekitar garis.', 'Strong would need points close to the line.'], ['negatif lemah', 'weak negative', 'Arahnya naik, jadi positif.', 'The trend rises, so it is positive.'], ['negatif kuat', 'strong negative', 'Arahnya naik, dan sebarannya lebar.', 'It rises, and it is widely scattered.']]],
  ['Penjualan es krim dan kasus terbakar matahari berkorelasi positif. Kesimpulan yang tepat adalah …', 'Ice cream sales and sunburn cases are positively correlated. The right conclusion is …', 'keduanya kemungkinan dipengaruhi cuaca panas', 'both are probably driven by hot weather', [['makan es krim menyebabkan terbakar matahari', 'eating ice cream causes sunburn', 'Korelasi tidak membuktikan sebab-akibat.', 'Correlation does not prove causation.'], ['terbakar matahari menyebabkan orang membeli es krim', 'sunburn makes people buy ice cream', 'Korelasi tidak membuktikan sebab-akibat.', 'Correlation does not prove causation.'], ['datanya pasti salah', 'the data must be wrong', 'Korelasi seperti ini wajar terjadi.', 'This kind of correlation is common.']]],
  ['Pencilan (outlier) pada diagram pencar adalah …', 'An outlier on a scatter plot is …', 'titik yang jauh dari pola titik lainnya', 'a point far from the pattern of the others', [['titik paling kanan', 'the rightmost point', 'Titik paling kanan bisa saja mengikuti pola.', 'The rightmost point may follow the pattern.'], ['titik di (0, 0)', 'the point at (0, 0)', 'Pencilan bisa di mana saja.', 'An outlier can be anywhere.'], ['titik dengan nilai y terbesar', 'the point with the largest y', 'Nilai besar belum tentu menyimpang dari pola.', 'A large value does not have to break the pattern.']]],
];
const scatterPool = G(
  (rnd, lang) => {
    const i = ri(rnd, 0, SCATTER_POOL.length - 1);
    const [qi, qe, ai, ae, ds] = SCATTER_POOL[i];
    const okT = L(lang, ai, ae);
    return OPT(
      L(lang, qi, qe),
      okT,
      ds.map((d) => [L(lang, d[0], d[1]), L(lang, d[2], d[3])]),
      [L(lang, 'Perhatikan arah titik (naik atau turun) dan kerapatannya di sekitar garis.', 'Look at the direction of the points (up or down) and how close they are to a line.'), okT],
      { i },
    );
  },
  (m, lang) => L(lang, SCATTER_POOL[m.i][2], SCATTER_POOL[m.i][3]),
);

const CTX2 = [
  ['jam belajar', 'skor', 'study hours', 'score'],
  ['suhu (°C)', 'es teh terjual', 'temperature (°C)', 'iced teas sold'],
  ['luas rumah (m²)', 'harga (juta rupiah)', 'house size (m²)', 'price (million rupiah)'],
  ['umur pohon (tahun)', 'tinggi (m)', 'tree age (years)', 'height (m)'],
];
const pointMeaning = G(
  (rnd, lang) => {
    const c = pick(rnd, CTX2);
    let x, y;
    do {
      x = ri(rnd, 2, 9);
      y = ri(rnd, 2, 30);
    } while (x === y);
    const X = L(lang, c[0], c[2]);
    const Y = L(lang, c[1], c[3]);
    const okT = L(lang, `${X} = ${x} dan ${Y} = ${y}`, `${X} = ${x} and ${Y} = ${y}`);
    return OPT(
      L(lang, `Pada diagram pencar ${X} (sumbu x) dan ${Y} (sumbu y), titik (${x}, ${y}) berarti …`, `On a scatter plot of ${X} (x-axis) and ${Y} (y-axis), the point (${x}, ${y}) means …`),
      okT,
      [
        [L(lang, `${X} = ${y} dan ${Y} = ${x}`, `${X} = ${y} and ${Y} = ${x}`), L(lang, 'Koordinat pertama adalah nilai x.', 'The first coordinate is the x-value.')],
        [L(lang, `ada ${x} data dengan ${Y} = ${y}`, `there are ${x} data values with ${Y} = ${y}`), L(lang, 'Satu titik mewakili satu pasangan data, bukan banyak data.', 'One point is one data pair, not a count.')],
        [L(lang, `rata-rata ${Y} antara ${x} dan ${y}`, `the mean ${Y} is between ${x} and ${y}`), L(lang, 'Titik tidak menunjukkan rata-rata.', 'A point does not show a mean.')],
      ],
      [L(lang, '(x, y): x dari sumbu mendatar, y dari sumbu tegak.', '(x, y): x from the horizontal axis, y from the vertical axis.'), okT],
      { c: CTX2.indexOf(c), x, y },
    );
  },
  (m, lang) => {
    const c = CTX2[m.c];
    return L(lang, `${c[0]} = ${m.x} dan ${c[1]} = ${m.y}`, `${c[2]} = ${m.x} and ${c[3]} = ${m.y}`);
  },
);

const regPredict = G(
  (rnd, lang) => {
    const a = ri(rnd, -20, 60) / (rnd() < 0.5 ? 1 : 2);
    const b = nz(rnd, -6, 8) / (rnd() < 0.6 ? 1 : 2);
    const x = ri(rnd, 2, 20);
    const y = a + b * x;
    if (rnd() < 0.5) {
      const xb = ri(rnd, 2, 12);
      const yb = a + b * xb;
      return NUM(
        L(lang, `Rata-rata x adalah ${xb}, rata-rata y adalah ${M(lang, yb)}, dan kemiringan garis regresi b = ${M(lang, b)}. Nilai a pada y = a + bx adalah …`, `The mean of x is ${xb}, the mean of y is ${M(lang, yb)} and the regression slope is b = ${M(lang, b)}. Find a in y = a + bx.`),
        D(a),
        WR(D(a), [
          [yb + b * xb, L(lang, 'a = ȳ − b·x̄. Dikurangi, bukan ditambah.', 'a = ȳ − b·x̄. Subtract, do not add.')],
          [yb - b, L(lang, `b dikali x̄ = ${xb} dulu.`, `Multiply b by x̄ = ${xb} first.`)],
        ]),
        [L(lang, 'Garis regresi melalui (x̄, ȳ).', 'The regression line passes through (x̄, ȳ).'), `a = ${M(lang, yb)} − ${M(lang, b)} × ${xb} = ${M(lang, a)}`],
        { kind: 'a', xb, yb, b },
      );
    }
    return NUM(
      L(lang, `Garis regresi y = ${M(lang, a)} ${b < 0 ? '−' : '+'} ${M(lang, Math.abs(b))}x. Perkiraan nilai y untuk x = ${x} adalah …`, `The regression line is y = ${M(lang, a)} ${b < 0 ? '−' : '+'} ${M(lang, Math.abs(b))}x. The predicted y for x = ${x} is …`),
      D(y),
      WR(D(y), [
        [b * x, L(lang, `Jangan lupa a = ${M(lang, a)}.`, `Do not forget a = ${M(lang, a)}.`)],
        [(a + b) * x, L(lang, 'Hanya b yang dikali x.', 'Only b is multiplied by x.')],
        [a - b * x, L(lang, 'Perhatikan tanda b.', 'Watch the sign of b.')],
      ]),
      [`y = ${M(lang, a)} + ${b < 0 ? `(${M(lang, b)})` : M(lang, b)} × ${x}`, `= ${M(lang, y)}`],
      { kind: 'y', a, b, x },
    );
  },
  (m) => (m.kind === 'a' ? D(m.yb - m.b * m.xb) : D(m.a + m.b * m.x)),
);

const regMeaning = G(
  (rnd, lang) => {
    const c = pick(rnd, CTX2);
    const a = ri(rnd, 2, 30);
    const b = ri(rnd, 2, 9) / 2;
    const X = L(lang, c[0], c[2]);
    const Y = L(lang, c[1], c[3]);
    const which = rnd() < 0.6 ? 'b' : 'a';
    const okT = which === 'b' ? L(lang, `setiap ${X} naik 1, ${Y} naik kira-kira ${M(lang, b)}`, `each time ${X} rises by 1, ${Y} rises by about ${M(lang, b)}`) : L(lang, `perkiraan ${Y} saat ${X} = 0`, `the predicted ${Y} when ${X} = 0`);
    return OPT(
      L(lang, `Garis regresi antara ${X} (x) dan ${Y} (y) adalah y = ${a} + ${M(lang, b)}x. Angka ${which === 'b' ? M(lang, b) : a} berarti …`, `The regression line of ${Y} (y) on ${X} (x) is y = ${a} + ${M(lang, b)}x. The number ${which === 'b' ? M(lang, b) : a} means …`),
      okT,
      [
        [which === 'b' ? L(lang, `perkiraan ${Y} saat ${X} = 0`, `the predicted ${Y} when ${X} = 0`) : L(lang, `setiap ${X} naik 1, ${Y} naik kira-kira ${a}`, `each time ${X} rises by 1, ${Y} rises by about ${a}`), which === 'b' ? L(lang, 'Itu arti a (titik potong).', 'That is the meaning of a (the intercept).') : L(lang, 'Itu arti kemiringan b.', 'That is the meaning of the slope b.')],
        [L(lang, `${Y} selalu ${which === 'b' ? M(lang, b) : a} kali ${X}`, `${Y} is always ${which === 'b' ? M(lang, b) : a} times ${X}`), L(lang, 'Garis regresi hanya perkiraan, dan ada suku tetapnya.', 'A regression line is only an estimate, and it has a constant term.')],
        [L(lang, 'kekuatan hubungan x dan y', 'the strength of the relationship'), L(lang, 'Kekuatan hubungan diukur dengan koefisien korelasi r.', 'Strength is measured by the correlation coefficient r.')],
      ],
      [L(lang, 'Pada y = a + bx: a nilai y saat x = 0, b perubahan y untuk setiap x naik 1.', 'In y = a + bx: a is y when x = 0, b is the change in y for each 1 increase in x.'), okT],
      { c: CTX2.indexOf(c), a, b, which },
    );
  },
  (m, lang) => {
    const c = CTX2[m.c];
    const X = L(lang, c[0], c[2]);
    const Y = L(lang, c[1], c[3]);
    return m.which === 'b' ? L(lang, `setiap ${X} naik 1, ${Y} naik kira-kira ${M(lang, m.b)}`, `each time ${X} rises by 1, ${Y} rises by about ${M(lang, m.b)}`) : L(lang, `perkiraan ${Y} saat ${X} = 0`, `the predicted ${Y} when ${X} = 0`);
  },
);

const rDet = G(
  (rnd, lang) => {
    const r10 = nz(rnd, -9, 9);
    const r = r10 / 10;
    if (rnd() < 0.5)
      return NUM(
        L(lang, `Koefisien korelasi r = ${M(lang, r)}. Koefisien determinasinya dalam persen adalah … %`, `The correlation coefficient is r = ${M(lang, r)}. The coefficient of determination as a percentage is … %`),
        D(r10 * r10),
        WR(D(r10 * r10), [
          [Math.abs(r10) * 10, L(lang, 'Koefisien determinasi adalah r², jadi kuadratkan dulu.', 'The coefficient of determination is r², so square it first.')],
          [-r10 * r10, L(lang, 'r² selalu positif.', 'r² is never negative.')],
        ]),
        [`r² = (${M(lang, r)})² = ${M(lang, r * r)}`, `= ${r10 * r10}%`],
        { kind: 'det', r },
      );
    return NUM(
      L(lang, `Koefisien determinasi suatu data adalah ${M(lang, r * r)} dan hubungannya ${r > 0 ? 'positif' : 'negatif'}. Nilai r adalah …`, `The coefficient of determination is ${M(lang, r * r)} and the relationship is ${r > 0 ? 'positive' : 'negative'}. Find r.`),
      D(r),
      WR(D(r), [
        [-r, L(lang, `Hubungannya ${r > 0 ? 'positif' : 'negatif'}, jadi tanda r ${r > 0 ? 'positif' : 'negatif'}.`, `The relationship is ${r > 0 ? 'positive' : 'negative'}, so r is ${r > 0 ? 'positive' : 'negative'}.`)],
        [r * r * r * r, L(lang, 'r adalah akar dari koefisien determinasi, bukan kuadratnya.', 'r is the square root of the coefficient of determination, not its square.')],
        [(r * r) / 2, L(lang, 'Ambil akar, bukan setengah.', 'Take the square root, not half.')],
      ]),
      [`r² = ${M(lang, r * r)} → |r| = ${M(lang, Math.abs(r))}`, L(lang, `Hubungan ${r > 0 ? 'positif' : 'negatif'}: r = ${M(lang, r)}`, `${r > 0 ? 'Positive' : 'Negative'} relationship: r = ${M(lang, r)}`)],
      { kind: 'r', d: r * r, s: Math.sign(r) },
    );
  },
  (m) => (m.kind === 'det' ? D(m.r * m.r * 100) : D(m.s * Math.sqrt(m.d))),
);

const R_LABEL = (lang) => [L(lang, 'korelasi positif yang kuat', 'a strong positive correlation'), L(lang, 'korelasi positif yang lemah', 'a weak positive correlation'), L(lang, 'korelasi negatif yang kuat', 'a strong negative correlation'), L(lang, 'korelasi negatif yang lemah', 'a weak negative correlation')];
const rClass = G(
  (rnd, lang) => {
    if (rnd() < 0.5) {
      const strong = rnd() < 0.5;
      const pos = rnd() < 0.5;
      const v = strong ? ri(rnd, 75, 98) / 100 : ri(rnd, 5, 25) / 100;
      const r = pos ? v : -v;
      const k = (pos ? 0 : 2) + (strong ? 0 : 1);
      const labs = R_LABEL(lang);
      return {
        q: L(lang, `Koefisien korelasi r = ${M(lang, r)} menunjukkan …`, `A correlation coefficient of r = ${M(lang, r)} shows …`),
        options: labs.map((t, i) => (i === k ? { t, ok: true } : { t, why: (i >> 1) !== (k >> 1) ? L(lang, 'Tanda r menunjukkan arah.', 'The sign of r shows the direction.') : L(lang, `|r| = ${M(lang, v)} ${strong ? 'dekat dengan 1, jadi kuat' : 'dekat dengan 0, jadi lemah'}.`, `|r| = ${M(lang, v)} is ${strong ? 'close to 1, so strong' : 'close to 0, so weak'}.`) })),
        fixed: true,
        steps: [L(lang, `Tanda ${pos ? 'positif' : 'negatif'} → arah ${pos ? 'naik' : 'turun'}.`, `${pos ? 'Positive' : 'Negative'} sign → ${pos ? 'rising' : 'falling'} trend.`), L(lang, `|r| = ${M(lang, v)} → ${strong ? 'kuat' : 'lemah'}.`, `|r| = ${M(lang, v)} → ${strong ? 'strong' : 'weak'}.`)],
        meta: { kind: 'class', r },
      };
    }
    const vals = new Set();
    while (vals.size < 4) vals.add(nz(rnd, -19, 19) * 5);
    const rs = [...vals].map((v) => v / 100);
    const best = rs.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a));
    if (rs.filter((v) => Math.abs(v) === Math.abs(best)).length > 1) rs[rs.indexOf(-best)] = best > 0 ? best - 0.15 : best + 0.15;
    return OPT(
      L(lang, 'Manakah nilai r yang menunjukkan hubungan paling kuat?', 'Which value of r shows the strongest relationship?'),
      M(lang, best),
      rs.filter((v) => v !== best).map((v) => [M(lang, v), L(lang, `|${M(lang, v)}| = ${M(lang, Math.abs(v))} lebih kecil dari |${M(lang, best)}|. Kekuatan dilihat dari nilai mutlaknya.`, `|${M(lang, v)}| = ${M(lang, Math.abs(v))} is smaller than |${M(lang, best)}|. Strength depends on the absolute value.`)]),
      [L(lang, 'Kekuatan ditentukan oleh |r|, makin dekat 1 makin kuat. Tanda hanya menunjukkan arah.', 'Strength depends on |r|; the closer to 1, the stronger. The sign only shows direction.'), M(lang, best)],
      { kind: 'max', rs },
    );
  },
  (m, lang) => {
    if (m.kind === 'max') return M(lang, [...m.rs].sort((a, b) => Math.abs(b) - Math.abs(a))[0]);
    const strong = Math.abs(m.r) >= 0.5;
    return R_LABEL(lang)[(m.r > 0 ? 0 : 2) + (strong ? 0 : 1)];
  },
);

// ================= Bab 4: Permutasi, kombinasi, peluang bersyarat =================
const ROLES = [
  ['ketua', 'wakil ketua', 'sekretaris', 'bendahara'],
  ['chair', 'vice chair', 'secretary', 'treasurer'],
];
const perm = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['roles', 'all', 'code']);
    if (kind === 'roles') {
      const n = ri(rnd, 5, 10);
      const r = ri(rnd, 2, 3);
      const roles = ROLES[lang === 'en' ? 1 : 0].slice(0, r);
      const ans = P(n, r);
      return NUM(
        L(lang, `Dari ${n} siswa akan dipilih ${roles.join(', ').replace(/, ([^,]*)$/, ' dan $1')}. Banyak susunan yang mungkin adalah …`, `From ${n} students we choose a ${roles.join(', ').replace(/, ([^,]*)$/, ' and $1')}. How many arrangements are possible?`),
        D(ans),
        WR(D(ans), [
          [C(n, r), L(lang, 'Jabatannya berbeda, jadi urutan penting. Pakai permutasi, bukan kombinasi.', 'The roles differ, so order matters. Use a permutation, not a combination.')],
          [n * r, L(lang, `Pilihan berkurang satu untuk setiap jabatan: ${Array.from({ length: r }, (_, i) => n - i).join(' × ')}.`, `The choices drop by one per role: ${Array.from({ length: r }, (_, i) => n - i).join(' × ')}.`)],
          [n ** r, L(lang, 'Satu orang tidak boleh memegang dua jabatan.', 'One person cannot hold two roles.')],
        ]),
        [`P(${n}, ${r}) = ${Array.from({ length: r }, (_, i) => n - i).join(' × ')}`, `= ${ans}`],
        { kind, n, r },
      );
    }
    if (kind === 'all') {
      const n = ri(rnd, 4, 7);
      const it = pick(rnd, [
        ['buku berbeda disusun berjajar di rak', 'different books are arranged in a row on a shelf'],
        ['orang berbaris dalam satu antrean', 'people stand in a queue'],
        ['siswa duduk berjajar di satu bangku panjang', 'students sit in a row on a bench'],
      ]);
      return NUM(
        L(lang, `${n} ${it[0]}. Banyak susunannya adalah …`, `${n} ${it[1]}. How many arrangements are there?`),
        D(fact(n)),
        WR(D(fact(n)), [
          [n * n, L(lang, `${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}, bukan ${n} × ${n}.`, `${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')}, not ${n} × ${n}.`)],
          [fact(n - 1), L(lang, 'Itu untuk susunan melingkar. Di sini berjajar.', 'That is for a circle. Here it is a row.')],
        ]),
        [`${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' × ')} = ${fact(n)}`],
        { kind, n, r: n },
      );
    }
    const r = ri(rnd, 2, 4);
    const ans = P(10, r);
    return NUM(
      L(lang, `Banyak kode ${r} angka berbeda yang dapat disusun dari angka 0 sampai 9 (angka 0 boleh di depan) adalah …`, `How many ${r}-digit codes with different digits can be made from 0 to 9 (0 may come first)?`),
      D(ans),
      WR(D(ans), [
        [10 ** r, L(lang, 'Angkanya harus berbeda, jadi pilihan berkurang.', 'The digits must differ, so the choices decrease.')],
        [C(10, r), L(lang, 'Urutan angka pada kode penting. Pakai permutasi.', 'Order matters in a code. Use a permutation.')],
      ]),
      [`P(10, ${r}) = ${Array.from({ length: r }, (_, i) => 10 - i).join(' × ')} = ${ans}`],
      { kind, n: 10, r },
    );
  },
  (m) => {
    let v = 1;
    for (let i = 0; i < m.r; i++) v *= m.n - i;
    return D(v);
  },
);

const WORDS = ['KAKAK', 'BUKU', 'MALAM', 'SALSA', 'KERETA', 'SUSU', 'ANANDA', 'LEVEL', 'KUKU', 'APA', 'PAPAYA', 'MAMA', 'BABA', 'TATAP'];
const permRep = G(
  (rnd, lang) => {
    const w = pick(rnd, WORDS);
    const cnt = {};
    for (const ch of w) cnt[ch] = (cnt[ch] || 0) + 1;
    const reps = Object.entries(cnt).filter(([, c]) => c > 1);
    const den = reps.reduce((a, [, c]) => a * fact(c), 1);
    const ans = fact(w.length) / den;
    return NUM(
      L(lang, `Banyak susunan huruf berbeda dari kata ${w} adalah …`, `How many different arrangements of the letters of ${w} are there?`),
      D(ans),
      WR(D(ans), [
        [fact(w.length), L(lang, 'Ada huruf yang sama. Susunan yang hanya menukar huruf kembar terhitung sama.', 'Some letters repeat. Swapping identical letters does not give a new arrangement.')],
        [reps.length > 1 ? fact(w.length) / fact(reps[0][1]) : null, L(lang, 'Semua huruf yang berulang harus dibagi faktorialnya.', 'Divide by the factorial for every repeated letter.')],
      ]),
      [L(lang, `${w.length} huruf: ${reps.map(([ch, c]) => `${ch} muncul ${c} kali`).join(', ')}`, `${w.length} letters: ${reps.map(([ch, c]) => `${ch} appears ${c} times`).join(', ')}`), `${w.length}! ÷ (${reps.map(([, c]) => `${c}!`).join(' × ')}) = ${fact(w.length)} ÷ ${den} = ${ans}`],
      { w },
    );
  },
  (m) => {
    // hitung susunan unik dengan membangkitkan permutasi
    const out = new Set();
    const go = (s, rest) => {
      if (!rest.length) return void out.add(s);
      for (let i = 0; i < rest.length; i++) go(s + rest[i], rest.slice(0, i) + rest.slice(i + 1));
    };
    go('', m.w);
    return D(out.size);
  },
);

const comb = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['basic', 'team', 'solve']);
    if (kind === 'basic') {
      const n = ri(rnd, 5, 12);
      const r = ri(rnd, 2, Math.min(4, n - 2));
      const ctx = pick(rnd, [
        ['siswa untuk mengikuti lomba cerdas cermat', 'students for a quiz team'],
        ['anggota paduan suara', 'choir members'],
        ['buah untuk dibawa piknik', 'fruits to take on a picnic'],
      ]);
      const ans = C(n, r);
      return NUM(
        L(lang, `Dari ${n} pilihan akan dipilih ${r} ${ctx[0]}. Banyak cara memilih adalah …`, `From ${n} options we choose ${r} ${ctx[1]}. How many ways are there?`),
        D(ans),
        WR(D(ans), [
          [P(n, r), L(lang, `Urutan tidak penting, jadi bagi dengan ${r}! = ${fact(r)}.`, `Order does not matter, so divide by ${r}! = ${fact(r)}.`)],
          [n * r, L(lang, `C(${n}, ${r}) = ${n}! ÷ (${r}! × ${n - r}!).`, `C(${n}, ${r}) = ${n}! ÷ (${r}! × ${n - r}!).`)],
        ]),
        [`C(${n}, ${r}) = (${Array.from({ length: r }, (_, i) => n - i).join(' × ')}) ÷ ${r}!`, `= ${P(n, r)} ÷ ${fact(r)} = ${ans}`],
        { kind, n, r },
      );
    }
    if (kind === 'team') {
      const a = ri(rnd, 4, 7);
      const b = ri(rnd, 3, 6);
      const x = ri(rnd, 2, 3);
      const y = ri(rnd, 1, 2);
      const ans = C(a, x) * C(b, y);
      return NUM(
        L(lang, `Sebuah tim terdiri dari ${x} putra (dari ${a} calon putra) dan ${y} putri (dari ${b} calon putri). Banyak cara membentuk tim adalah …`, `A team has ${x} boys (from ${a}) and ${y} girl${y > 1 ? 's' : ''} (from ${b}). How many teams are possible?`),
        D(ans),
        WR(D(ans), [
          [C(a, x) + C(b, y), L(lang, 'Pilihan putra dan putri dipasangkan, jadi dikalikan.', 'Each choice of boys pairs with each choice of girls, so multiply.')],
          [C(a + b, x + y), L(lang, 'Itu memilih sembarang orang. Banyak putra dan putri sudah ditentukan.', 'That chooses anyone. The numbers of boys and girls are fixed.')],
        ]),
        [`C(${a}, ${x}) × C(${b}, ${y}) = ${C(a, x)} × ${C(b, y)}`, `= ${ans}`],
        { kind, a, b, x, y },
      );
    }
    const n = ri(rnd, 4, 12);
    const k = C(n, 2);
    return NUM(
      L(lang, `Jika C(n, 2) = ${k}, nilai n adalah …`, `If C(n, 2) = ${k}, the value of n is …`),
      D(n),
      WR(D(n), [
        [k / 2, L(lang, 'C(n, 2) = n(n − 1)/2. Selesaikan n(n − 1) = ' + 2 * k + '.', 'C(n, 2) = n(n − 1)/2. Solve n(n − 1) = ' + 2 * k + '.')],
        [n - 1, L(lang, `Cek: C(${n - 1}, 2) = ${C(n - 1, 2)}.`, `Check: C(${n - 1}, 2) = ${C(n - 1, 2)}.`)],
        [n + 1, L(lang, `Cek: C(${n + 1}, 2) = ${C(n + 1, 2)}.`, `Check: C(${n + 1}, 2) = ${C(n + 1, 2)}.`)],
      ]),
      [`n(n − 1)/2 = ${k} → n(n − 1) = ${2 * k}`, `${n} × ${n - 1} = ${2 * k}, ${L(lang, 'jadi', 'so')} n = ${n}`],
      { kind, k },
    );
  },
  (m) => {
    if (m.kind === 'basic') return D(C(m.n, m.r));
    if (m.kind === 'team') return D(C(m.a, m.x) * C(m.b, m.y));
    for (let n = 2; n < 100; n++) if ((n * (n - 1)) / 2 === m.k) return D(n);
  },
);

const condDec = G(
  (rnd, lang) => {
    let ab, b;
    do {
      b = ri(rnd, 2, 9) / 10;
      ab = ri(rnd, 1, 9) / 20;
    } while (ab >= b || Math.abs((ab / b) * 100 - Math.round((ab / b) * 100)) > 1e-9);
    const ans = ab / b;
    return NUM(
      L(lang, `Jika P(A ∩ B) = ${M(lang, ab)} dan P(B) = ${M(lang, b)}, maka P(A | B) = …`, `If P(A ∩ B) = ${M(lang, ab)} and P(B) = ${M(lang, b)}, then P(A | B) = …`),
      D(ans),
      WR(D(ans), [
        [ab * b, L(lang, 'P(A | B) = P(A ∩ B) ÷ P(B), dibagi, bukan dikali.', 'P(A | B) = P(A ∩ B) ÷ P(B): divide, do not multiply.')],
        [b / ab, L(lang, 'Pembilangnya P(A ∩ B), penyebutnya P(B).', 'The numerator is P(A ∩ B), the denominator P(B).')],
        [ab, L(lang, 'Itu P(A ∩ B). Bagi dengan P(B).', 'That is P(A ∩ B). Divide by P(B).')],
      ]),
      ['P(A | B) = P(A ∩ B) ÷ P(B)', `= ${M(lang, ab)} ÷ ${M(lang, b)} = ${M(lang, ans)}`],
      { ab, b },
    );
  },
  (m) => D(m.ab / m.b),
);

const COND_EV = [
  ['genap', 'even', (x) => x % 2 === 0],
  ['ganjil', 'odd', (x) => x % 2 === 1],
  ['prima', 'prime', (x) => [2, 3, 5, 7].includes(x)],
  ['lebih dari 3', 'greater than 3', (x) => x > 3],
  ['lebih dari 5', 'greater than 5', (x) => x > 5],
  ['kurang dari 5', 'less than 5', (x) => x < 5],
  ['kelipatan 3', 'a multiple of 3', (x) => x % 3 === 0],
];
const condCount = G(
  (rnd, lang) => {
    const die = rnd() < 0.5;
    const S = die ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let i, j, nB, nAB;
    do {
      i = ri(rnd, 0, COND_EV.length - 1);
      j = ri(rnd, 0, COND_EV.length - 1);
      const B = S.filter(COND_EV[j][2]);
      nB = B.length;
      nAB = B.filter(COND_EV[i][2]).length;
    } while (i === j || nB < 2 || nAB === 0 || nAB === nB);
    const nA = S.filter(COND_EV[i][2]).length;
    const ans = F(nAB, nB);
    const intro = die ? L(lang, 'Sebuah dadu dilempar', 'A die is rolled') : L(lang, 'Satu kartu diambil dari kartu bernomor 1 sampai 10', 'A card is drawn from cards numbered 1 to 10');
    return NUM(
      L(lang, `${intro} dan diketahui hasilnya ${COND_EV[j][0]}. Peluang hasilnya ${COND_EV[i][0]} adalah … (tulis sebagai pecahan)`, `${intro}, and the result is known to be ${COND_EV[j][1]}. The probability that it is ${COND_EV[i][1]} is … (write a fraction)`),
      ans,
      WR(ans, [
        [F(nAB, S.length), L(lang, `Ruang sampelnya menyempit menjadi hasil yang ${COND_EV[j][0]} saja (${nB} hasil).`, `The sample space shrinks to the ${nB} outcomes that are ${COND_EV[j][1]}.`)],
        [F(nA, S.length), L(lang, 'Informasi yang diketahui harus dipakai.', 'You must use the given information.')],
        [F(nAB, nA), L(lang, 'Penyebutnya banyak hasil yang diketahui terjadi, bukan banyak hasil yang ditanya.', 'The denominator is the outcomes known to have happened, not the ones asked about.')],
      ]),
      [L(lang, `Hasil yang ${COND_EV[j][0]}: {${S.filter(COND_EV[j][2]).join(', ')}}`, `Outcomes that are ${COND_EV[j][1]}: {${S.filter(COND_EV[j][2]).join(', ')}}`), L(lang, `Di antaranya yang ${COND_EV[i][0]}: ${nAB}`, `Of these, ${COND_EV[i][1]}: ${nAB}`), `P = ${nAB}/${nB}${gcd(nAB, nB) > 1 ? ` = ${ans}` : ''}`],
      { die, i, j },
    );
  },
  (m) => {
    const S = Array.from({ length: m.die ? 6 : 10 }, (_, k) => k + 1);
    const B = S.filter(COND_EV[m.j][2]);
    return F(B.filter(COND_EV[m.i][2]).length, B.length);
  },
);

const condTable = G(
  (rnd, lang) => {
    const tot = ri(rnd, 30, 45);
    const g = ri(rnd, 12, tot - 8);
    const k = ri(rnd, 3, g - 2);
    const [gi, ge, ki, kp, ks] = pick(rnd, [
      ['ikut OSIS', 'are in the student council', 'perempuan', 'girls', 'a girl'],
      ['ikut pramuka', 'are scouts', 'kelas 11', 'in grade 11', 'in grade 11'],
      ['membawa bekal', 'bring a packed lunch', 'membawa buah', 'bringing fruit', 'bringing fruit'],
    ]);
    const ans = F(k, g);
    return NUM(
      L(lang, `Dari ${tot} siswa, ${g} siswa ${gi}. Di antara ${g} siswa itu, ${k} orang ${ki}. Jika dipilih acak seorang siswa yang ${gi}, peluang ia ${ki} adalah … (tulis sebagai pecahan)`, `Of ${tot} students, ${g} ${ge}. Of those ${g}, ${k} are ${kp}. One of these ${g} students is chosen at random. The probability that the student is ${ks} is … (write a fraction)`),
      ans,
      WR(ans, [
        [F(k, tot), L(lang, `Siswa dipilih hanya dari ${g} orang itu, bukan dari ${tot}.`, `The student is chosen from those ${g} only, not from all ${tot}.`)],
        [F(g, tot), L(lang, 'Itu peluang siswa termasuk kelompok itu.', 'That is the chance of being in the group.')],
      ]),
      [L(lang, `Ruang sampel: ${g} siswa`, `Sample space: ${g} students`), `P = ${k}/${g}${gcd(k, g) > 1 ? ` = ${ans}` : ''}`],
      { g, k },
    );
  },
  (m) => F(m.k, m.g),
);

export const K11 = {
  'k11b1-1': [rangeSet, funcKind, countFunc],
  'k11b1-2': [compVal, compExpr, compFind],
  'k11b1-3': [invVal, invExpr],
  'k11b2-1': [circAngle],
  'k11b2-2': [chord],
  'k11b2-3': [tangent],
  'k11b2-4': [circEq, circRadPt],
  'k11b3-1': [scatterPool, pointMeaning],
  'k11b3-2': [regPredict, regMeaning],
  'k11b3-3': [rDet, rClass],
  'k11b4-1': [perm, permRep],
  'k11b4-2': [comb],
  'k11b4-3': [condDec, condCount, condTable],
};
