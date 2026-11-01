// Generator soal Kelas 12 SMA (matematika lanjut).
import { L, ri, pick, D, N, F, gcd, G, mi, M, Fr, sup, sub, nz, shuf, fact, C, WR, MC, NUM, OPT, poly, pc, xm, plus, pt } from './common.js';

const pp = (v) => (v < 0 ? `(${mi(v)})` : String(v));
const lin = (a, b) => poly([[a, 1], [b, 0]]);

// ================= Bab 1: Irisan kerucut =================
const parabola = G(
  (rnd, lang) => {
    const p = nz(rnd, -6, 6);
    const ax = rnd() < 0.5 ? 'x' : 'y'; // sumbu simetri: 'x' berarti y² = 4px
    const eq = ax === 'x' ? `y² = ${mi(4 * p)}x` : `x² = ${mi(4 * p)}y`;
    const kind = pick(rnd, ['p', 'focus', 'dir', 'k', 'pt']);
    if (kind === 'p')
      return NUM(
        L(lang, `Parabola ${eq} memiliki fokus ${ax === 'x' ? '(p, 0)' : '(0, p)'}. Nilai p adalah …`, `The parabola ${eq} has focus ${ax === 'x' ? '(p, 0)' : '(0, p)'}. Find p.`),
        D(p),
        WR(D(p), [
          [4 * p, L(lang, `Bentuknya ${ax === 'x' ? 'y² = 4px' : 'x² = 4py'}, jadi bagi dengan 4.`, `The form is ${ax === 'x' ? 'y² = 4px' : 'x² = 4py'}, so divide by 4.`)],
          [2 * p, L(lang, 'Koefisiennya 4p, bukan 2p.', 'The coefficient is 4p, not 2p.')],
          [-p, L(lang, 'Perhatikan tanda.', 'Watch the sign.')],
        ]),
        [`4p = ${mi(4 * p)}`, `p = ${mi(p)}`],
        { kind, ax, c: 4 * p },
      );
    if (kind === 'focus' || kind === 'dir') {
      const focus = ax === 'x' ? pt(p, 0) : pt(0, p);
      const dir = ax === 'x' ? `x = ${mi(-p)}` : `y = ${mi(-p)}`;
      const okT = kind === 'focus' ? focus : dir;
      const ds =
        kind === 'focus'
          ? [
              [ax === 'x' ? pt(0, p) : pt(p, 0), L(lang, `Parabola ${eq} terbuka ${ax === 'x' ? 'ke samping, fokus di sumbu x' : 'ke atas/bawah, fokus di sumbu y'}.`, `${eq} opens ${ax === 'x' ? 'sideways, so the focus is on the x-axis' : 'up/down, so the focus is on the y-axis'}.`)],
              [ax === 'x' ? pt(4 * p, 0) : pt(0, 4 * p), L(lang, 'Koefisiennya 4p; bagi dengan 4.', 'The coefficient is 4p; divide by 4.')],
              [ax === 'x' ? pt(-p, 0) : pt(0, -p), L(lang, 'Tanda p ikut koefisien.', 'p has the same sign as the coefficient.')],
            ]
          : [
              [ax === 'x' ? `x = ${mi(p)}` : `y = ${mi(p)}`, L(lang, 'Itu melalui fokus. Direktris ada di sisi berlawanan.', 'That passes through the focus. The directrix is on the other side.')],
              [ax === 'x' ? `y = ${mi(-p)}` : `x = ${mi(-p)}`, L(lang, 'Direktris tegak lurus sumbu simetri.', 'The directrix is perpendicular to the axis of symmetry.')],
              [ax === 'x' ? `x = ${mi(-4 * p)}` : `y = ${mi(-4 * p)}`, L(lang, 'Pakai p, bukan 4p.', 'Use p, not 4p.')],
            ];
      return OPT(
        L(lang, `${kind === 'focus' ? 'Fokus' : 'Persamaan direktris'} parabola ${eq} adalah …`, `The ${kind === 'focus' ? 'focus' : 'directrix'} of the parabola ${eq} is …`),
        okT,
        ds,
        [`4p = ${mi(4 * p)} → p = ${mi(p)}`, okT],
        { kind, ax, c: 4 * p },
      );
    }
    if (kind === 'k')
      return NUM(
        L(lang, `Parabola memiliki fokus ${ax === 'x' ? pt(p, 0) : pt(0, p)} dan direktris ${ax === 'x' ? 'x' : 'y'} = ${mi(-p)}. Persamaannya ${ax === 'x' ? 'y² = kx' : 'x² = ky'}. Nilai k adalah …`, `A parabola has focus ${ax === 'x' ? pt(p, 0) : pt(0, p)} and directrix ${ax === 'x' ? 'x' : 'y'} = ${mi(-p)}. Its equation is ${ax === 'x' ? 'y² = kx' : 'x² = ky'}. Find k.`),
        D(4 * p),
        WR(D(4 * p), [
          [p, L(lang, 'k = 4p, bukan p.', 'k = 4p, not p.')],
          [2 * p, L(lang, 'k = 4p, bukan 2p.', 'k = 4p, not 2p.')],
        ]),
        [`p = ${mi(p)}`, `k = 4p = ${mi(4 * p)}`],
        { kind, ax, c: 4 * p },
      );
    const t = nz(rnd, -6, 6);
    // titik (t, b) pada x² = 4py: b = t²/(4p); pilih p yang membagi
    const P4 = 4 * p;
    const t2 = P4 * nz(rnd, -3, 3);
    const tt = Math.abs(t2) <= 30 ? t2 : P4;
    const b = (tt * tt) / P4;
    return NUM(
      L(lang, `Titik (${mi(tt)}, b) terletak pada parabola x² = ${mi(P4)}y. Nilai b adalah …`, `The point (${mi(tt)}, b) lies on the parabola x² = ${mi(P4)}y. Find b.`),
      D(b),
      WR(D(b), [
        [tt / P4, L(lang, 'x dikuadratkan dulu.', 'Square x first.')],
        [tt * tt * P4, L(lang, `Bagi x² dengan ${mi(P4)}, jangan dikali.`, `Divide x² by ${mi(P4)}, do not multiply.`)],
        [-b, L(lang, 'Perhatikan tanda.', 'Watch the sign.')],
      ]),
      [`${tt * tt} = ${mi(P4)}b`, `b = ${mi(b)}`],
      { kind, ax: 'y', c: P4, t: tt },
    );
  },
  (m) => {
    const p = m.c / 4;
    if (m.kind === 'p') return D(p);
    if (m.kind === 'k') return D(4 * p);
    if (m.kind === 'pt') return D((m.t * m.t) / m.c);
    if (m.kind === 'focus') return m.ax === 'x' ? pt(p, 0) : pt(0, p);
    return m.ax === 'x' ? `x = ${mi(-p)}` : `y = ${mi(-p)}`;
  },
);

// tripel (c, b, a) dengan a² = b² + c²
const ELL = [
  [3, 4, 5],
  [4, 3, 5],
  [5, 12, 13],
  [12, 5, 13],
  [8, 15, 17],
  [15, 8, 17],
  [6, 8, 10],
  [8, 6, 10],
  [7, 24, 25],
];
const ellipse = G(
  (rnd, lang) => {
    const [c, b, a] = pick(rnd, ELL);
    const eq = `x²/${a * a} + y²/${b * b} = 1`;
    const kind = pick(rnd, ['c', 'major', 'minor', 'b', 'sum', 'yint']);
    const data = {
      c: [L(lang, `Elips ${eq} memiliki fokus (±c, 0). Nilai c adalah …`, `The ellipse ${eq} has foci (±c, 0). Find c.`), c, [[a * a - b * b, L(lang, 'Itu c². Ambil akarnya.', 'That is c². Take the square root.')], [Number.isInteger(Math.hypot(a, b)) ? Math.hypot(a, b) : null, L(lang, 'Pada elips c² = a² − b², bukan a² + b².', 'For an ellipse c² = a² − b², not a² + b².')], [a - b, L(lang, 'c = √(a² − b²), bukan a − b.', 'c = √(a² − b²), not a − b.')]], [`a² = ${a * a}, b² = ${b * b}`, `c = √(${a * a} − ${b * b}) = ${c}`]],
      major: [L(lang, `Panjang sumbu mayor elips ${eq} adalah …`, `The length of the major axis of ${eq} is …`), 2 * a, [[a, L(lang, 'Itu setengah sumbu mayor. Panjangnya 2a.', 'That is the semi-major axis. The length is 2a.')], [a * a, L(lang, 'a² adalah penyebutnya. a = √penyebut.', 'a² is the denominator. a = √denominator.')], [2 * b, L(lang, 'Itu sumbu minor.', 'That is the minor axis.')]], [`a = √${a * a} = ${a}`, `2a = ${2 * a}`]],
      minor: [L(lang, `Panjang sumbu minor elips ${eq} adalah …`, `The length of the minor axis of ${eq} is …`), 2 * b, [[b, L(lang, 'Panjangnya 2b.', 'The length is 2b.')], [2 * a, L(lang, 'Itu sumbu mayor.', 'That is the major axis.')], [b * b, L(lang, 'b = √penyebut.', 'b = √denominator.')]], [`b = √${b * b} = ${b}`, `2b = ${2 * b}`]],
      b: [L(lang, `Elips berpusat di O dengan fokus (±${c}, 0) dan sumbu mayor ${2 * a}. Nilai b adalah …`, `An ellipse centred at O has foci (±${c}, 0) and major axis ${2 * a}. Find b.`), b, [[Number.isInteger(Math.sqrt(4 * a * a - c * c)) ? Math.sqrt(4 * a * a - c * c) : null, L(lang, `a adalah setengah sumbu mayor: ${a}.`, `a is half the major axis: ${a}.`)], [b * b, L(lang, 'Itu b².', 'That is b².')], [a - c, L(lang, 'b² = a² − c².', 'b² = a² − c².')]], [`a = ${a}, c = ${c}`, `b = √(${a * a} − ${c * c}) = ${b}`]],
      sum: [L(lang, `Titik P terletak pada elips ${eq}. Jumlah jarak P ke kedua fokus adalah …`, `P lies on the ellipse ${eq}. The sum of its distances to the two foci is …`), 2 * a, [[a, L(lang, 'Jumlahnya 2a, bukan a.', 'The sum is 2a, not a.')], [2 * c, L(lang, '2c adalah jarak kedua fokus.', '2c is the distance between the foci.')], [2 * b, L(lang, 'Jumlah jarak sama dengan sumbu mayor 2a.', 'The sum equals the major axis 2a.')]], [`a = ${a}`, `PF₁ + PF₂ = 2a = ${2 * a}`]],
      yint: [L(lang, `Elips ${eq} memotong sumbu y positif di (0, b). Nilai b adalah …`, `The ellipse ${eq} meets the positive y-axis at (0, b). Find b.`), b, [[b * b, L(lang, 'Itu b². Ambil akarnya.', 'That is b². Take the square root.')], [a, L(lang, 'a untuk sumbu x.', 'a is for the x-axis.')]], [`x = 0: y² = ${b * b}`, `y = ${b}`]],
    }[kind];
    return NUM(data[0], D(data[1]), WR(D(data[1]), data[2]), data[3], { kind, a, b, c });
  },
  (m) => {
    const A = m.kind === 'b' ? m.a : Math.sqrt(m.a * m.a);
    const B = m.kind === 'b' ? Math.sqrt(A * A - m.c * m.c) : Math.sqrt(m.b * m.b);
    return D({ c: Math.sqrt(A * A - B * B), major: 2 * A, minor: 2 * B, b: B, sum: 2 * A, yint: B }[m.kind]);
  },
);

const CONIC_POOL = (lang) => [
  [L(lang, 'Untuk setiap titik pada elips, jumlah jaraknya ke kedua fokus sama dengan …', 'For every point on an ellipse, the sum of its distances to the foci equals …'), '2a', [['2b', L(lang, '2b adalah sumbu minor.', '2b is the minor axis.')], ['2c', L(lang, '2c adalah jarak antar fokus.', '2c is the distance between the foci.')], ['a + b', L(lang, 'Jumlahnya selalu sumbu mayor.', 'It is always the major axis.')]]],
  [L(lang, 'Pada elips x²/a² + y²/b² = 1 (a > b), hubungan a, b, dan c adalah …', 'For the ellipse x²/a² + y²/b² = 1 (a > b), the relation between a, b and c is …'), 'c² = a² − b²', [['c² = a² + b²', L(lang, 'Itu untuk hiperbola.', 'That is for a hyperbola.')], ['c = a − b', L(lang, 'Hubungannya lewat kuadrat.', 'The relation uses squares.')], ['a² = b² − c²', L(lang, 'a adalah yang terbesar.', 'a is the largest.')]]],
  [L(lang, 'Panjang sumbu minor elips x²/a² + y²/b² = 1 (a > b) adalah …', 'The minor axis of the ellipse x²/a² + y²/b² = 1 (a > b) has length …'), '2b', [['2a', L(lang, 'Itu sumbu mayor.', 'That is the major axis.')], ['b', L(lang, 'Itu setengahnya.', 'That is half of it.')], ['2c', L(lang, 'Itu jarak antar fokus.', 'That is the distance between the foci.')]]],
  [L(lang, 'Fokus elips x²/a² + y²/b² = 1 (a > b) terletak di …', 'The foci of the ellipse x²/a² + y²/b² = 1 (a > b) are at …'), '(±c, 0)', [['(0, ±c)', L(lang, 'Fokus ada di sumbu mayor, yaitu sumbu x karena a > b.', 'The foci lie on the major axis, the x-axis since a > b.')], ['(±a, 0)', L(lang, 'Itu titik puncak.', 'Those are the vertices.')], ['(±b, 0)', L(lang, 'Fokus memakai c = √(a² − b²).', 'The foci use c = √(a² − b²).')]]],
  [L(lang, 'Untuk setiap titik pada hiperbola, selisih (mutlak) jaraknya ke kedua fokus sama dengan …', 'For every point on a hyperbola, the (absolute) difference of its distances to the foci equals …'), '2a', [['2b', L(lang, '2b bukan jarak puncak.', '2b is not the vertex distance.')], ['2c', L(lang, '2c adalah jarak antar fokus.', '2c is the distance between the foci.')], ['a + b', L(lang, 'Selisihnya selalu 2a.', 'The difference is always 2a.')]]],
  [L(lang, 'Pada hiperbola x²/a² − y²/b² = 1, hubungan a, b, dan c adalah …', 'For the hyperbola x²/a² − y²/b² = 1, the relation between a, b and c is …'), 'c² = a² + b²', [['c² = a² − b²', L(lang, 'Itu untuk elips.', 'That is for an ellipse.')], ['c = a + b', L(lang, 'Hubungannya lewat kuadrat.', 'The relation uses squares.')], ['a² = b² + c²', L(lang, 'Pada hiperbola, c paling besar.', 'For a hyperbola, c is the largest.')]]],
  [L(lang, 'Asimtot hiperbola x²/a² − y²/b² = 1 adalah …', 'The asymptotes of the hyperbola x²/a² − y²/b² = 1 are …'), 'y = ±(b/a)x', [['y = ±(a/b)x', L(lang, 'Gradiennya b/a.', 'The gradient is b/a.')], ['y = ±(c/a)x', L(lang, 'Asimtot memakai a dan b.', 'The asymptotes use a and b.')], ['x = ±a', L(lang, 'Itu garis melalui puncak, bukan asimtot.', 'Those pass through the vertices; they are not asymptotes.')]]],
  [L(lang, 'Titik puncak hiperbola x²/a² − y²/b² = 1 adalah …', 'The vertices of the hyperbola x²/a² − y²/b² = 1 are …'), '(±a, 0)', [['(0, ±b)', L(lang, 'Hiperbola ini tidak memotong sumbu y.', 'This hyperbola does not meet the y-axis.')], ['(±c, 0)', L(lang, 'Itu fokusnya.', 'Those are the foci.')], ['(±b, 0)', L(lang, 'Puncak memakai a.', 'The vertices use a.')]]],
];
const ANS_CONIC = ['2a', 'c² = a² − b²', '2b', '(±c, 0)', '2a', 'c² = a² + b²', 'y = ±(b/a)x', '(±a, 0)'];
const conicConcept = (lo) =>
  G(
    (rnd, lang) => {
      const i = lo + ri(rnd, 0, 3);
      const it = CONIC_POOL(lang)[i];
      return OPT(it[0], it[1], it[2], [L(lang, 'Elips: jumlah jarak 2a, c² = a² − b². Hiperbola: selisih jarak 2a, c² = a² + b².', 'Ellipse: sum of distances 2a, c² = a² − b². Hyperbola: difference 2a, c² = a² + b².'), it[1]], { i });
    },
    (m) => ANS_CONIC[m.i],
  );
const ellConcept = conicConcept(0);
const hypConcept = conicConcept(4);

const HYP = [
  [3, 4, 5],
  [4, 3, 5],
  [5, 12, 13],
  [12, 5, 13],
  [6, 8, 10],
  [8, 6, 10],
  [8, 15, 17],
  [9, 12, 15],
];
const hyperbola = G(
  (rnd, lang) => {
    const [a, b, c] = pick(rnd, HYP);
    const eq = `x²/${a * a} − y²/${b * b} = 1`;
    const kind = pick(rnd, ['c', 'vert', 'diff', 'asym', 'asym']);
    if (kind === 'asym') {
      const okT = `y = ±(${Fr(b, a)})x`;
      return OPT(
        L(lang, `Persamaan asimtot hiperbola ${eq} adalah …`, `The asymptotes of the hyperbola ${eq} are …`),
        okT,
        [
          [`y = ±(${Fr(a, b)})x`, L(lang, 'Gradiennya b/a, bukan a/b.', 'The gradient is b/a, not a/b.')],
          [`y = ±(${Fr(b * b, a * a)})x`, L(lang, 'Pakai a dan b, bukan a² dan b².', 'Use a and b, not a² and b².')],
          [`y = ±${b}x`, L(lang, `Bagi dengan a = ${a}.`, `Divide by a = ${a}.`)],
        ],
        [`a = ${a}, b = ${b}`, okT],
        { kind, a, b },
      );
    }
    const d = {
      c: [L(lang, `Hiperbola ${eq} memiliki fokus (±c, 0). Nilai c adalah …`, `The hyperbola ${eq} has foci (±c, 0). Find c.`), c, [[c * c, L(lang, 'Itu c². Ambil akarnya.', 'That is c². Take the square root.')], [Number.isInteger(Math.sqrt(Math.abs(a * a - b * b))) ? Math.sqrt(Math.abs(a * a - b * b)) : null, L(lang, 'Pada hiperbola c² = a² + b².', 'For a hyperbola c² = a² + b².')], [a + b, L(lang, 'c = √(a² + b²), bukan a + b.', 'c = √(a² + b²), not a + b.')]], [`c² = ${a * a} + ${b * b} = ${c * c}`, `c = ${c}`]],
      vert: [L(lang, `Jarak kedua titik puncak hiperbola ${eq} adalah …`, `The distance between the vertices of ${eq} is …`), 2 * a, [[a, L(lang, 'Puncak di (±a, 0), jaraknya 2a.', 'The vertices are at (±a, 0), so the distance is 2a.')], [2 * c, L(lang, 'Itu jarak kedua fokus.', 'That is the distance between the foci.')], [a * a, L(lang, 'a = √penyebut.', 'a = √denominator.')]], [`a = ${a}`, `2a = ${2 * a}`]],
      diff: [L(lang, `Titik P pada hiperbola ${eq}. Selisih jarak P ke kedua fokus adalah …`, `P lies on the hyperbola ${eq}. The difference of its distances to the foci is …`), 2 * a, [[a, L(lang, 'Selisihnya 2a.', 'The difference is 2a.')], [2 * c, L(lang, 'Itu jarak antar fokus.', 'That is the distance between the foci.')], [2 * b, L(lang, 'Pakai a, bukan b.', 'Use a, not b.')]], [`a = ${a}`, `|PF₁ − PF₂| = 2a = ${2 * a}`]],
    }[kind];
    return NUM(d[0], D(d[1]), WR(D(d[1]), d[2]), d[3], { kind, a, b });
  },
  (m) => {
    if (m.kind === 'asym') return `y = ±(${Fr(m.b, m.a)})x`;
    return D(m.kind === 'c' ? Math.hypot(m.a, m.b) : 2 * m.a);
  },
);

// ================= Bab 2: Limit =================
const limSub = G(
  (rnd, lang) => {
    const cs = rnd() < 0.5 ? [0, nz(rnd, -5, 5), ri(rnd, -6, 6)] : [nz(rnd, -3, 3), ri(rnd, -5, 5), ri(rnd, -6, 6)];
    const a = ri(rnd, -3, 4);
    const v = cs[0] * a * a + cs[1] * a + cs[2];
    const t = pc(cs[0] ? cs : cs.slice(1));
    return NUM(
      L(lang, `Nilai lim(x → ${mi(a)}) (${t}) adalah …`, `The value of lim(x → ${mi(a)}) (${t}) is …`),
      D(v),
      WR(D(v), [
        [cs[0] * a * a - cs[1] * a + cs[2], L(lang, `Substitusi x = ${mi(a)} dengan tandanya.`, `Substitute x = ${mi(a)} with its sign.`)],
        [cs[0] * 2 * a + cs[1] * a + cs[2], L(lang, 'x² berarti x × x.', 'x² means x × x.')],
      ]),
      [L(lang, 'Fungsi polinomial: limitnya cukup dengan substitusi.', 'For a polynomial, substitute directly.'), `${[[cs[0], 2], [cs[1], 1], [cs[2], 0]].filter(([c]) => c).map(([c, p], j) => `${c < 0 ? (j ? ' − ' : '−') : j ? ' + ' : ''}${p === 0 ? Math.abs(c) : `${Math.abs(c) === 1 ? '' : Math.abs(c) + '·'}${pp(a)}${p === 2 ? '²' : ''}`}`).join('')} = ${mi(v)}`],
      { cs, a },
    );
  },
  (m) => {
    const f = (x) => m.cs[0] * x * x + m.cs[1] * x + m.cs[2];
    return D(Math.round(((f(m.a + 1e-7) + f(m.a - 1e-7)) / 2) * 1e6) / 1e6);
  },
);

const limFactor = G(
  (rnd, lang) => {
    const a = nz(rnd, -6, 6);
    let b;
    do b = ri(rnd, -6, 6);
    while (b === a);
    const quad = rnd() < 0.3;
    let c;
    if (quad) do c = nz(rnd, -6, 6);
    while (c === a || c === b);
    const num = [1, -(a + b), a * b];
    const den = quad ? [1, -(a + c), a * c] : [1, -a];
    const ans = quad ? F(a - b, a - c) : D(a - b);
    return NUM(
      L(lang, `Nilai lim(x → ${mi(a)}) (${pc(num)}) ÷ (${pc(den)}) adalah …${quad ? L(lang, ' (boleh pecahan)', ' (fraction allowed)') : ''}`, `The value of lim(x → ${mi(a)}) (${pc(num)}) ÷ (${pc(den)}) is …${quad ? ' (fraction allowed)' : ''}`),
      ans,
      WR(ans, [
        [0, L(lang, 'Bentuk 0/0 bukan berarti limitnya 0. Faktorkan dulu.', '0/0 does not mean the limit is 0. Factor first.')],
        [quad ? F(a + b, a + c) : a + b, L(lang, `Setelah ${xm(a)} dicoret, substitusi x = ${mi(a)} dengan tanda yang benar.`, `After cancelling ${xm(a)}, substitute x = ${mi(a)} with the right sign.`)],
        [quad ? F(-a - b, a - c) : -a - b, L(lang, 'Perhatikan tanda faktor yang tersisa.', 'Check the sign of the remaining factor.')],
      ]),
      [`${pc(num)} = ${xm(a)}${xm(b)}${quad ? `, ${pc(den)} = ${xm(a)}${xm(c)}` : ''}`, L(lang, `Coret ${xm(a)}, lalu x = ${mi(a)}: ${quad ? `${pp(a - b)}/${pp(a - c)} = ` : ''}${mi(ans)}`, `Cancel ${xm(a)}, then x = ${mi(a)}: ${quad ? `${pp(a - b)}/${pp(a - c)} = ` : ''}${mi(ans)}`)],
      { num, den, a },
    );
  },
  (m) => {
    // limit numerik dari dua sisi
    const f = (x) => (m.num[0] * x * x + m.num[1] * x + m.num[2]) / (m.den.length === 3 ? m.den[0] * x * x + m.den[1] * x + m.den[2] : m.den[0] * x + m.den[1]);
    const v = (f(m.a + 1e-6) + f(m.a - 1e-6)) / 2;
    for (let d = 1; d <= 12; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-4) return F(Math.round(v * d), d);
  },
);

const limRoot = G(
  (rnd, lang) => {
    const a = ri(rnd, 1, 6);
    const ans = F(1, 2 * a);
    return NUM(
      L(lang, `Nilai lim(x → ${a * a}) (√x − ${a}) ÷ (x − ${a * a}) adalah … (boleh pecahan)`, `The value of lim(x → ${a * a}) (√x − ${a}) ÷ (x − ${a * a}) is … (fraction allowed)`),
      ans,
      WR(ans, [
        [0, L(lang, 'Bentuk 0/0. Faktorkan x − a² = (√x − a)(√x + a).', '0/0 form. Factor x − a² = (√x − a)(√x + a).')],
        [F(1, a), L(lang, `Penyebut sisa √x + ${a} = ${2 * a}, bukan ${a}.`, `The remaining denominator is √x + ${a} = ${2 * a}, not ${a}.`)],
        [2 * a, L(lang, 'Hasilnya 1 ÷ (√x + a), bukan √x + a.', 'The result is 1 ÷ (√x + a), not √x + a.')],
      ]),
      [`x − ${a * a} = (√x − ${a})(√x + ${a})`, `= 1 ÷ (√${a * a} + ${a}) = 1/${2 * a}`],
      { a },
    );
  },
  (m) => {
    const x = m.a * m.a + 1e-7;
    const v = (Math.sqrt(x) - m.a) / (x - m.a * m.a);
    return F(1, Math.round(1 / v));
  },
);

const limSide = G(
  (rnd, lang) => {
    const c = ri(rnd, -3, 6);
    const l = ri(rnd, -4, 8);
    const same = rnd() < 0.5;
    const r = same ? l : l + nz(rnd, -3, 3);
    const opts = same ? [String(mi(l)), String(mi(c)), L(lang, 'tidak ada', 'does not exist'), `f(${mi(c)})`] : [L(lang, 'tidak ada', 'does not exist'), mi(l), mi(r), M(lang, (l + r) / 2)];
    const okT = same ? mi(l) : L(lang, 'tidak ada', 'does not exist');
    const why = same
      ? [null, L(lang, `${mi(c)} adalah nilai x yang didekati.`, `${mi(c)} is the x-value being approached.`), L(lang, 'Limit kiri dan kanan sama, jadi limitnya ada.', 'The left and right limits agree, so the limit exists.'), L(lang, 'Limit tidak bergantung pada nilai f di titik itu.', 'The limit does not depend on the value of f at that point.')]
      : [null, L(lang, 'Itu hanya limit kiri.', 'That is only the left limit.'), L(lang, 'Itu hanya limit kanan.', 'That is only the right limit.'), L(lang, 'Limit bukan rata-rata limit kiri dan kanan.', 'A limit is not the average of the two sides.')];
    return OPT(
      L(lang, `Saat x mendekati ${mi(c)} dari kiri, f(x) mendekati ${mi(l)}. Saat x mendekati ${mi(c)} dari kanan, f(x) mendekati ${mi(r)}. Nilai lim(x → ${mi(c)}) f(x) …`, `As x approaches ${mi(c)} from the left, f(x) approaches ${mi(l)}. From the right, f(x) approaches ${mi(r)}. The value of lim(x → ${mi(c)}) f(x) …`),
      okT,
      opts.slice(1).map((t, i) => [t, why[i + 1]]),
      [L(lang, 'Limit ada jika limit kiri = limit kanan.', 'The limit exists when the left limit = the right limit.'), okT],
      { l, r },
    );
  },
  (m, lang) => (m.l === m.r ? mi(m.l) : L(lang, 'tidak ada', 'does not exist')),
);

const limInf = G(
  (rnd, lang) => {
    const n = ri(rnd, 1, 3);
    const mm = rnd() < 0.6 ? n : n + ri(rnd, 1, 2);
    const a = nz(rnd, -6, 8);
    const b = nz(rnd, -4, 5);
    const num = [a, ...Array.from({ length: n }, () => ri(rnd, -5, 5))];
    const den = [b, ...Array.from({ length: mm }, () => ri(rnd, -5, 5))];
    const ans = mm === n ? F(a, b) : '0';
    return NUM(
      L(lang, `Nilai lim(x → ∞) (${pc(num)}) ÷ (${pc(den)}) adalah …`, `The value of lim(x → ∞) (${pc(num)}) ÷ (${pc(den)}) is …`),
      ans,
      WR(ans, [
        [den[den.length - 1] ? F(num[num.length - 1], den[den.length - 1]) : null, L(lang, 'Untuk x → ∞ yang menentukan adalah suku pangkat tertinggi, bukan suku tetap.', 'As x → ∞ the highest powers decide, not the constants.')],
        [mm > n ? F(a, b) : null, L(lang, `Pangkat penyebut (${mm}) lebih tinggi, jadi limitnya 0.`, `The denominator has a higher power (${mm}), so the limit is 0.`)],
        [mm === n ? F(b, a) : null, L(lang, 'Pecahannya terbalik.', 'The fraction is upside down.')],
      ]),
      [L(lang, `Bagi pembilang dan penyebut dengan x${mm === 1 ? '' : sup(mm)}.`, `Divide top and bottom by x${mm === 1 ? '' : sup(mm)}.`), mm === n ? `${mi(a)} ÷ ${pp(b)} = ${mi(ans)}` : L(lang, 'Pembilang tumbuh lebih lambat: limit = 0', 'The numerator grows more slowly: limit = 0')],
      { num, den },
    );
  },
  (m) => {
    const f = (x) => m.num.reduce((s, c) => s * x + c, 0) / m.den.reduce((s, c) => s * x + c, 0);
    const v = f(1e7);
    for (let d = 1; d <= 12; d++) if (Math.abs(v * d - Math.round(v * d)) < 1e-4) return F(Math.round(v * d), d);
  },
);

const limInfMC = G(
  (rnd, lang) => {
    const n = ri(rnd, 2, 4);
    const mm = n - 1;
    const a = nz(rnd, -5, 5);
    const b = ri(rnd, 1, 4);
    const okT = a > 0 ? '∞' : '−∞';
    return OPT(
      L(lang, `Nilai lim(x → ∞) (${pc([a, ...Array(n).fill(0).map((_, i) => (i === n - 1 ? 1 : 0))])}) ÷ (${pc([b, ...Array(mm - 1).fill(0), 3])}) adalah …`, `The value of lim(x → ∞) (${pc([a, ...Array(n).fill(0).map((_, i) => (i === n - 1 ? 1 : 0))])}) ÷ (${pc([b, ...Array(mm - 1).fill(0), 3])}) is …`),
      okT,
      [
        [a > 0 ? '−∞' : '∞', L(lang, 'Tanda koefisien utama menentukan arah.', 'The sign of the leading coefficients decides the direction.')],
        ['0', L(lang, 'Itu kalau pangkat penyebut lebih tinggi.', 'That is when the denominator has the higher power.')],
        [mi(Fr(a, b)), L(lang, 'Itu kalau pangkatnya sama.', 'That is when the powers are equal.')],
      ],
      [L(lang, `Pangkat pembilang (${n}) lebih tinggi dari penyebut (${mm}).`, `The numerator power (${n}) is higher than the denominator (${mm}).`), okT],
      { a, b, n },
    );
  },
  (m) => (m.a / m.b > 0 ? '∞' : '−∞'),
);

// ================= Bab 3: Turunan =================
const deriv = (cs) => cs.slice(0, -1).map((c, i) => c * (cs.length - 1 - i));
const ev = (cs, x) => cs.reduce((s, c) => s * x + c, 0);
const slope = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['der', 'sec', 'lim']);
    const a = pick(rnd, [1, 1, 2, 3, -1]);
    const c = nz(rnd, -5, 6);
    const f = `${a === 1 ? '' : a === -1 ? '−' : a}x²`;
    if (kind === 'der')
      return NUM(
        L(lang, `Gradien garis singgung kurva y = ${f} di x = ${mi(c)} adalah …`, `The gradient of the tangent to y = ${f} at x = ${mi(c)} is …`),
        D(2 * a * c),
        WR(D(2 * a * c), [
          [a * c * c, L(lang, 'Itu nilai y, bukan gradien. Gradien = f\'(x).', "That is the y-value, not the gradient. Gradient = f'(x).")],
          [a * c, L(lang, `Turunan ${f} adalah ${2 * a}x.`, `The derivative of ${f} is ${2 * a}x.`)],
        ]),
        [`f'(x) = ${mi(2 * a)}x`, `f'(${mi(c)}) = ${mi(2 * a * c)}`],
        { kind, a, c },
      );
    if (kind === 'sec') {
      let d;
      do d = ri(rnd, -4, 6);
      while (d === c);
      return NUM(
        L(lang, `Gradien garis yang menghubungkan titik x = ${mi(c)} dan x = ${mi(d)} pada parabola y = ${f} adalah …`, `The gradient of the line joining x = ${mi(c)} and x = ${mi(d)} on y = ${f} is …`),
        D(a * (c + d)),
        WR(D(a * (c + d)), [
          [a * (d * d - c * c), L(lang, 'Bagi selisih y dengan selisih x.', 'Divide the change in y by the change in x.')],
          [2 * a * c, L(lang, 'Itu gradien garis singgung di satu titik.', 'That is the tangent gradient at one point.')],
        ]),
        [`(${mi(a * d * d)} − ${pp(a * c * c)}) ÷ (${mi(d)} − ${pp(c)})`, `= ${mi(a * (c + d))}`],
        { kind, a, c, d },
      );
    }
    return NUM(
      L(lang, `Nilai lim(h → 0) [(${c} + h)² − ${c * c}] ÷ h adalah …`.replace(`(${c} + h)`, c < 0 ? `(${mi(c)} + h)` : `(${c} + h)`), `The value of lim(h → 0) [(${mi(c)} + h)² − ${c * c}] ÷ h is …`),
      D(2 * c),
      WR(D(2 * c), [
        [0, L(lang, 'Sederhanakan dulu sebelum h = 0.', 'Simplify before setting h = 0.')],
        [c * c, L(lang, `(${mi(c)} + h)² − ${c * c} = ${mi(2 * c)}h + h².`, `(${mi(c)} + h)² − ${c * c} = ${mi(2 * c)}h + h².`)],
      ]),
      [`[(${mi(c)} + h)² − ${c * c}] ÷ h = ${mi(2 * c)} + h`, `h → 0: ${mi(2 * c)}`],
      { kind, a: 1, c },
    );
  },
  (m) => {
    const f = (x) => m.a * x * x;
    if (m.kind === 'sec') return D((f(m.d) - f(m.c)) / (m.d - m.c));
    const h = 1e-6;
    return D(Math.round(((f(m.c + h) - f(m.c - h)) / (2 * h)) * 1e4) / 1e4);
  },
);

const DER_POOL = [
  ["Nilai f'(a) menyatakan …", "f'(a) represents …", 'gradien garis singgung kurva di x = a', 'the gradient of the tangent at x = a', [['nilai fungsi di x = a', 'the value of the function at x = a', "Itu f(a), bukan f'(a).", "That is f(a), not f'(a)."], ['luas di bawah kurva sampai x = a', 'the area under the curve up to x = a', 'Itu integral.', 'That is an integral.'], ['titik potong kurva dengan sumbu y', 'the y-intercept', 'Itu f(0).', 'That is f(0).']]],
  ["Jika f'(x) > 0 pada suatu interval, maka grafik f pada interval itu …", "If f'(x) > 0 on an interval, then on that interval f is …", 'naik', 'increasing', [['turun', 'decreasing', "Turun jika f'(x) < 0.", "Decreasing when f'(x) < 0."], ['mendatar', 'constant', "Mendatar jika f'(x) = 0.", "Constant when f'(x) = 0."], ['memotong sumbu x', 'crossing the x-axis', 'Turunan tidak memberi tahu titik potong.', 'The derivative does not give intercepts.']]],
  ["Jika f'(x) < 0 pada suatu interval, maka grafik f pada interval itu …", "If f'(x) < 0 on an interval, then on that interval f is …", 'turun', 'decreasing', [['naik', 'increasing', "Naik jika f'(x) > 0.", "Increasing when f'(x) > 0."], ['mendatar', 'constant', "Mendatar jika f'(x) = 0.", "Constant when f'(x) = 0."], ['negatif', 'negative', 'Nilai f bisa positif walau turun.', 'f can be positive while decreasing.']]],
  ['Titik stasioner adalah titik dengan …', 'A stationary point is a point where …', "f'(x) = 0", "f'(x) = 0", [['f(x) = 0', 'f(x) = 0', 'Itu titik potong sumbu x.', 'That is an x-intercept.'], ["f'(x) > 0", "f'(x) > 0", 'Itu grafik naik.', 'There the graph increases.'], ['x = 0', 'x = 0', 'Itu sumbu y.', 'That is the y-axis.']]],
  ['Turunan dari fungsi konstan f(x) = c adalah …', 'The derivative of a constant f(x) = c is …', '0', '0', [['c', 'c', 'Fungsi konstan tidak berubah, jadi gradiennya 0.', 'A constant does not change, so its gradient is 0.'], ['1', '1', 'Itu turunan dari x.', 'That is the derivative of x.'], ['cx', 'cx', 'Itu integral dari c.', 'That is the integral of c.']]],
  ['Gradien garis singgung di titik puncak parabola adalah …', 'The gradient of the tangent at the vertex of a parabola is …', '0', '0', [['1', '1', 'Di puncak garis singgungnya mendatar.', 'At the vertex the tangent is horizontal.'], ['tidak terdefinisi', 'not defined', 'Garis singgungnya mendatar, bukan tegak.', 'The tangent is horizontal, not vertical.'], ['sama dengan nilai puncak', 'equal to the vertex value', 'Gradien tidak sama dengan nilai y.', 'The gradient is not the y-value.']]],
  ['Gradien garis singgung didapat dari gradien garis potong saat …', 'The tangent gradient is obtained from secant gradients as …', 'kedua titiknya makin berdekatan (h → 0)', 'the two points get closer (h → 0)', [['kedua titiknya makin berjauhan', 'the two points move apart', 'Justru harus mendekat.', 'They must get closer.'], ['h = 1', 'h = 1', 'h harus mendekati 0.', 'h must approach 0.'], ['salah satu titiknya di (0, 0)', 'one point is at (0, 0)', 'Titiknya bebas, yang penting berdekatan.', 'Any points, as long as they get closer.']]],
  ['Jika f(x) = x² maka f\'(x) = …', "If f(x) = x² then f'(x) = …", '2x', '2x', [['x', 'x', 'Pangkat 2 turun menjadi koefisien.', 'The power 2 comes down as a coefficient.'], ['2x²', '2x²', 'Pangkatnya berkurang 1.', 'The power drops by 1.'], ['x³/3', 'x³/3', 'Itu integral.', 'That is the integral.']]],
  ['Pada titik maksimum lokal, nilai turunan berubah dari …', 'At a local maximum, the derivative changes from …', 'positif ke negatif', 'positive to negative', [['negatif ke positif', 'negative to positive', 'Itu minimum lokal.', 'That is a local minimum.'], ['positif ke positif', 'positive to positive', 'Tanpa perubahan tanda tidak ada ekstrem.', 'Without a sign change there is no extremum.'], ['nol ke nol', 'zero to zero', 'Turunan nol hanya di titik itu.', 'The derivative is zero only at that point.']]],
  ['Kecepatan adalah turunan dari …', 'Velocity is the derivative of …', 'posisi terhadap waktu', 'position with respect to time', [['percepatan', 'acceleration', 'Percepatan adalah turunan kecepatan.', 'Acceleration is the derivative of velocity.'], ['waktu terhadap posisi', 'time with respect to position', 'Urutannya terbalik.', 'The order is reversed.'], ['jarak total', 'total distance', 'Kecepatan adalah laju perubahan posisi.', 'Velocity is the rate of change of position.']]],
];
const derPool = G(
  (rnd, lang) => {
    const i = ri(rnd, 0, DER_POOL.length - 1);
    const [qi, qe, ai, ae, ds] = DER_POOL[i];
    return OPT(L(lang, qi, qe), L(lang, ai, ae), ds.map((d) => [L(lang, d[0], d[1]), L(lang, d[2], d[3])]), [L(lang, "f'(x) adalah gradien garis singgung: positif = naik, negatif = turun, nol = stasioner.", "f'(x) is the tangent gradient: positive = increasing, negative = decreasing, zero = stationary."), L(lang, ai, ae)], { i });
  },
  (m, lang) => L(lang, DER_POOL[m.i][2], DER_POOL[m.i][3]),
);

const randCubic = (rnd) => [ri(rnd, -2, 3), ri(rnd, -5, 5), ri(rnd, -7, 7), ri(rnd, -9, 9)];
const derRule = G(
  (rnd, lang) => {
    let cs;
    do cs = randCubic(rnd);
    while (!cs[0] && !cs[1]);
    const t = (c) => pc(c.slice(c.findIndex((v) => v !== 0)));
    if (rnd() < 0.5) {
      const x = ri(rnd, -3, 3);
      const v = ev(deriv(cs), x);
      return NUM(
        L(lang, `f(x) = ${t(cs)}. Nilai f'(${mi(x)}) adalah …`, `f(x) = ${t(cs)}. Find f'(${mi(x)}).`),
        D(v),
        WR(D(v), [
          [ev(cs, x), L(lang, 'Itu f, bukan turunannya.', 'That is f, not its derivative.')],
          [ev(deriv(cs), x) + cs[3], L(lang, 'Turunan konstanta adalah 0.', 'The derivative of a constant is 0.')],
          [ev([cs[0], cs[1], cs[2]], x), L(lang, 'Pangkatnya turun menjadi pengali: (axⁿ)\' = n·axⁿ⁻¹.', "The power comes down: (axⁿ)' = n·axⁿ⁻¹.")],
        ]),
        [`f'(x) = ${t(deriv(cs))}`, `f'(${mi(x)}) = ${mi(v)}`],
        { cs, x },
      );
    }
    const okT = t(deriv(cs));
    return OPT(
      L(lang, `Turunan f(x) = ${t(cs)} adalah …`, `The derivative of f(x) = ${t(cs)} is …`),
      okT,
      [
        [`${okT}${plus(cs[3])}`, L(lang, 'Turunan konstanta adalah 0.', 'The derivative of a constant is 0.')],
        [t([cs[0], cs[1], cs[2]]), L(lang, 'Kalikan dengan pangkatnya.', 'Multiply by the power.')],
        [t([cs[0] * 3, cs[1] * 2, cs[2], 0]), L(lang, 'Pangkatnya juga turun 1.', 'The power also drops by 1.')],
        [t([cs[0] * 3, cs[1] * 2 + 1, cs[2]]), L(lang, 'Periksa koefisien x.', 'Check the x coefficient.')],
      ],
      [L(lang, '(axⁿ)\' = n·axⁿ⁻¹, konstanta menjadi 0', "(axⁿ)' = n·axⁿ⁻¹, constants become 0"), okT],
      { cs },
    );
  },
  (m) => {
    const h = 1e-5;
    const d = (x) => (ev(m.cs, x + h) - ev(m.cs, x - h)) / (2 * h);
    if (m.x !== undefined) return D(Math.round(d(m.x) * 1000) / 1000);
    // koefisien turunan dari tiga nilai
    const y0 = Math.round(d(0) * 1000) / 1000;
    const y1 = Math.round(d(1) * 1000) / 1000;
    const ym = Math.round(d(-1) * 1000) / 1000;
    const A = (y1 + ym) / 2 - y0;
    const B = (y1 - ym) / 2;
    const cs = [A, B, y0];
    return pc(cs.slice(cs.findIndex((v) => v !== 0)));
  },
);

const derApp = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['stat', 'max', 'cubic', 'prod', 'inc']);
    if (kind === 'stat' || kind === 'max') {
      const a = pick(rnd, [1, -1, 2, -2]);
      const h = nz(rnd, -5, 5);
      const k = ri(rnd, -8, 9);
      const cs = [a, -2 * a * h, a * h * h + k];
      const ask = kind === 'stat' ? h : k;
      return NUM(
        kind === 'stat' ? L(lang, `Titik stasioner f(x) = ${pc(cs)} terjadi pada x = …`, `The stationary point of f(x) = ${pc(cs)} is at x = …`) : L(lang, `Nilai ${a < 0 ? 'maksimum' : 'minimum'} f(x) = ${pc(cs)} adalah …`, `The ${a < 0 ? 'maximum' : 'minimum'} value of f(x) = ${pc(cs)} is …`),
        D(ask),
        WR(D(ask), [
          [kind === 'stat' ? -h : h, kind === 'stat' ? L(lang, `f'(x) = ${pc(deriv(cs))} = 0, selesaikan dengan tanda yang benar.`, `f'(x) = ${pc(deriv(cs))} = 0; solve with the right sign.`) : L(lang, `Itu letak x-nya. Substitusikan ke f.`, `That is the x-value. Substitute it into f.`)],
          [kind === 'stat' ? 2 * h : cs[2], kind === 'stat' ? L(lang, `Bagi dengan ${mi(2 * a)}.`, `Divide by ${mi(2 * a)}.`) : L(lang, 'Itu f(0), belum tentu ekstrem.', 'That is f(0), not necessarily the extreme.')],
        ]),
        [`f'(x) = ${pc(deriv(cs))} = 0 → x = ${mi(h)}`, kind === 'max' ? `f(${mi(h)}) = ${mi(k)}` : `x = ${mi(h)}`],
        { kind, cs },
      );
    }
    if (kind === 'cubic') {
      const p = ri(rnd, 1, 4);
      const q = ri(rnd, -5, 5);
      const cs = [1, 0, -3 * p * p, q];
      const mx = rnd() < 0.5;
      const v = mx ? 2 * p ** 3 + q : -2 * p ** 3 + q;
      return NUM(
        L(lang, `Nilai ${mx ? 'maksimum' : 'minimum'} lokal f(x) = ${pc(cs)} adalah …`, `The local ${mx ? 'maximum' : 'minimum'} of f(x) = ${pc(cs)} is …`),
        D(v),
        WR(D(v), [
          [mx ? -p : p, L(lang, 'Itu letak x-nya. Hitung f di titik itu.', 'That is the x-value. Evaluate f there.')],
          [mx ? -2 * p ** 3 + q : 2 * p ** 3 + q, L(lang, mx ? 'Itu minimum lokal.' : 'Itu maksimum lokal.', mx ? 'That is the local minimum.' : 'That is the local maximum.')],
        ]),
        [`f'(x) = 3x² − ${3 * p * p} = 0 → x = ±${p}`, `${mx ? `f(${mi(-p)})` : `f(${p})`} = ${mi(v)}`],
        { kind, cs, mx },
      );
    }
    if (kind === 'prod') {
      const S = ri(rnd, 3, 20) * 2;
      return NUM(
        L(lang, `Dua bilangan positif berjumlah ${S}. Hasil kali terbesar kedua bilangan itu adalah …`, `Two positive numbers add up to ${S}. Their greatest product is …`),
        D((S * S) / 4),
        WR(D((S * S) / 4), [[S / 2, L(lang, 'Itu bilangannya. Yang ditanya hasil kali.', 'That is each number. The question asks for the product.')]]),
        [`P(x) = x(${S} − x), P'(x) = ${S} − 2x = 0 → x = ${S / 2}`, `P = ${S / 2} × ${S / 2} = ${(S * S) / 4}`],
        { kind, S },
      );
    }
    const h = nz(rnd, -6, 6);
    const c = ri(rnd, -5, 5);
    const up = rnd() < 0.5;
    const okT = up ? `x > ${mi(h)}` : `x < ${mi(h)}`;
    return OPT(
      L(lang, `Fungsi f(x) = ${pc([1, -2 * h, c])} ${up ? 'naik' : 'turun'} pada interval …`, `The function f(x) = ${pc([1, -2 * h, c])} is ${up ? 'increasing' : 'decreasing'} on …`),
      okT,
      [
        [up ? `x < ${mi(h)}` : `x > ${mi(h)}`, L(lang, up ? "Di sana f'(x) < 0, jadi turun." : "Di sana f'(x) > 0, jadi naik.", up ? "There f'(x) < 0, so it decreases." : "There f'(x) > 0, so it increases.")],
        [up ? `x > ${mi(-h)}` : `x < ${mi(-h)}`, L(lang, `f'(x) = 2x ${h > 0 ? '−' : '+'} ${Math.abs(2 * h)} = 0 di x = ${mi(h)}.`, `f'(x) = 2x ${h > 0 ? '−' : '+'} ${Math.abs(2 * h)} = 0 at x = ${mi(h)}.`)],
        [up ? `x > ${mi(2 * h)}` : `x < ${mi(2 * h)}`, L(lang, 'Bagi dengan 2.', 'Divide by 2.')],
      ],
      [`f'(x) = ${pc([2, -2 * h])}`, `f'(x) ${up ? '>' : '<'} 0 → ${okT}`],
      { kind, h, up },
    );
  },
  (m) => {
    if (m.kind === 'inc') return m.up ? `x > ${mi(m.h)}` : `x < ${mi(m.h)}`;
    if (m.kind === 'prod') {
      let b = 0;
      for (let x = 0; x <= m.S; x += 0.5) b = Math.max(b, x * (m.S - x));
      return D(b);
    }
    // cari titik stasioner dengan turunan
    const d = deriv(m.cs);
    const roots = [];
    for (let x = -20; x <= 20; x++) if (ev(d, x) === 0) roots.push(x);
    if (m.kind === 'stat') return D(roots[0]);
    if (m.kind === 'max') return D(ev(m.cs, roots[0]));
    const vals = roots.map((x) => ev(m.cs, x));
    return D(m.mx ? Math.max(...vals) : Math.min(...vals));
  },
);

// ================= Bab 4: Integral =================
const antider = (cs) => [...cs.map((c, i) => c / (cs.length - i)), 0];
const intIndef = G(
  (rnd, lang) => {
    const n = ri(rnd, 0, 5);
    const a = (n + 1) * pick(rnd, [1, 1, 2, 3]);
    const term = (c, p) => (p === 0 ? mi(c) : `${c === 1 ? '' : mi(c)}x${p === 1 ? '' : sup(p)}`);
    const okT = `${term(a / (n + 1), n + 1)} + C`;
    return OPT(
      L(lang, `Hasil ∫ ${term(a, n)} dx adalah …`, `∫ ${term(a, n)} dx equals …`),
      okT,
      [
        [`${n === 0 ? '0' : term(a * n, n - 1)} + C`, L(lang, 'Itu turunan, bukan integral.', 'That is the derivative, not the integral.')],
        [`${term(a, n + 1)} + C`, L(lang, `Bagi dengan pangkat baru ${n + 1}.`, `Divide by the new power ${n + 1}.`)],
        [n > 0 ? `${a === n ? '' : Fr(a, n).includes('/') ? `(${Fr(a, n)})` : Fr(a, n)}x${sup(n + 1)} + C` : `${mi(a)} + C`, L(lang, 'Pangkat baru adalah n + 1, dan pembaginya juga n + 1.', 'The new power is n + 1, and so is the divisor.')],
        [term(a / (n + 1), n + 1), L(lang, 'Jangan lupa + C.', 'Remember + C.')],
      ],
      [`∫ axⁿ dx = a/(n + 1) xⁿ⁺¹ + C`, okT],
      { a, n },
    );
  },
  (m) => {
    const c = m.a / (m.n + 1);
    const p = m.n + 1;
    return `${c === 1 ? '' : mi(c)}x${p === 1 ? '' : sup(p)} + C`;
  },
);

const intIVP = G(
  (rnd, lang) => {
    const cs = [pick(rnd, [0, 3, 6, -3]), pick(rnd, [2, 4, -2, 6]), ri(rnd, -5, 5)].filter((c, i, arr) => i > 0 || c !== 0);
    const F0 = ri(rnd, -6, 8);
    const x = ri(rnd, 1, 3);
    const A = antider(cs);
    const v = ev(A, x) + F0;
    return NUM(
      L(lang, `f'(x) = ${pc(cs)} dan f(0) = ${mi(F0)}. Nilai f(${x}) adalah …`, `f'(x) = ${pc(cs)} and f(0) = ${mi(F0)}. Find f(${x}).`),
      D(v),
      WR(D(v), [
        [ev(A, x), L(lang, `Jangan lupa konstanta C = f(0) = ${mi(F0)}.`, `Remember the constant C = f(0) = ${mi(F0)}.`)],
        [ev(cs, x), L(lang, "Itu f'(x). Integralkan dulu.", "That is f'(x). Integrate first.")],
      ]),
      [`f(x) = ${pc(A.slice(0, -1).concat([F0]))}`, `f(${x}) = ${mi(v)}`],
      { cs, F0, x },
    );
  },
  (m) => {
    // integrasi numerik (Simpson) dari 0 sampai x
    const N0 = 200;
    const h = m.x / N0;
    let s = ev(m.cs, 0) + ev(m.cs, m.x);
    for (let i = 1; i < N0; i++) s += (i % 2 ? 4 : 2) * ev(m.cs, i * h);
    return D(Math.round(((s * h) / 3 + m.F0) * 1e6) / 1e6);
  },
);

const simpson = (f, a, b) => {
  const n = 400;
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h);
  return Math.round(((s * h) / 3) * 1e6) / 1e6;
};
const intDef = G(
  (rnd, lang) => {
    const deg = ri(rnd, 0, 3);
    const cs = Array.from({ length: deg + 1 }, (_, i) => (i === deg ? ri(rnd, -4, 5) : (deg - i + 1) * ri(rnd, -2, 2)));
    if (!cs.some((c) => c)) cs[deg] = 3;
    const t = pc(cs.slice(Math.max(0, cs.findIndex((c) => c !== 0))));
    const a = ri(rnd, -1, 2);
    const b = a + ri(rnd, 1, 3);
    const A = antider(cs);
    const v = ev(A, b) - ev(A, a);
    const lim = `∫${sub(a).replace('-', '₋')}${sup(b)}`;
    return NUM(
      L(lang, `Nilai ${lim} (${t}) dx adalah …`, `The value of ${lim} (${t}) dx is …`),
      D(v),
      WR(D(v), [
        [a !== 0 ? ev(A, b) : null, L(lang, `Kurangi dengan F(${mi(a)}).`, `Subtract F(${mi(a)}).`)],
        [ev(A, a) - ev(A, b), L(lang, 'Urutannya F(b) − F(a).', 'It is F(b) − F(a).')],
        [ev(cs, b) - ev(cs, a), L(lang, 'Integralkan dulu, baru substitusi batas.', 'Integrate first, then substitute the limits.')],
      ]),
      [`F(x) = ${pc(A.slice(0, -1).concat([0]).slice(Math.max(0, A.findIndex((c) => c !== 0))))}`, `F(${mi(b)}) − F(${mi(a)}) = ${mi(ev(A, b))} − ${pp(ev(A, a))} = ${mi(v)}`],
      { cs, a, b },
    );
  },
  (m) => D(simpson((x) => ev(m.cs, x), m.a, m.b)),
);

const area = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['line', 'par', 'between']);
    if (kind === 'line') {
      const m = ri(rnd, 1, 4);
      const b = ri(rnd, 1, 6);
      const ans = F(m * b * b, 2);
      return NUM(
        L(lang, `Luas daerah di bawah garis y = ${m === 1 ? '' : m}x, di atas sumbu x, dari x = 0 sampai x = ${b} adalah …`, `The area under y = ${m === 1 ? '' : m}x, above the x-axis, from x = 0 to x = ${b} is …`),
        ans,
        WR(ans, [
          [m * b * b, L(lang, 'Integral dari mx adalah (m/2)x². Jangan lupa ½.', 'The integral of mx is (m/2)x². Remember the ½.')],
          [m * b, L(lang, 'Itu tinggi segitiga di x = ' + b + '.', 'That is the height at x = ' + b + '.')],
        ]),
        [`∫₀${sup(b)} ${m === 1 ? '' : m}x dx = ${m === 1 ? '' : m}x²/2 |₀${sup(b)}`, `= ${mi(ans)}`],
        { kind, m, b },
      );
    }
    if (kind === 'par') {
      const a = ri(rnd, 1, 3);
      const ans = F(4 * a ** 3, 3);
      return NUM(
        L(lang, `Luas daerah antara kurva y = x² − ${a * a} dan sumbu x untuk −${a} ≤ x ≤ ${a} adalah … (boleh pecahan)`, `The area between y = x² − ${a * a} and the x-axis for −${a} ≤ x ≤ ${a} is … (fraction allowed)`),
        ans,
        WR(ans, [
          [F(-4 * a ** 3, 3), L(lang, 'Daerahnya di bawah sumbu x, jadi integralnya negatif. Luas selalu positif.', 'The region is below the x-axis, so the integral is negative. Area is always positive.')],
          [F(2 * a ** 3, 3), L(lang, `Batasnya dari −${a} sampai ${a}, bukan 0 sampai ${a}.`, `The limits are −${a} to ${a}, not 0 to ${a}.`)],
        ]),
        [`∫ (x² − ${a * a}) dx = x³/3 − ${a * a}x`, `|${mi(F(-4 * a ** 3, 3))}| = ${ans}`],
        { kind, a },
      );
    }
    let p, q;
    do {
      p = ri(rnd, -3, 1);
      q = ri(rnd, 1, 4);
    } while (q <= p);
    // garis y = (p + q)x − pq memotong y = x² di p dan q
    const ans = F((q - p) ** 3, 6);
    return NUM(
      L(lang, `Luas daerah antara garis y = ${lin(p + q, -p * q)} dan parabola y = x² (berpotongan di x = ${mi(p)} dan x = ${q}) adalah … (boleh pecahan)`, `The area between the line y = ${lin(p + q, -p * q)} and the parabola y = x² (meeting at x = ${mi(p)} and x = ${q}) is … (fraction allowed)`),
      ans,
      WR(ans, [
        [F(-((q - p) ** 3), 6), L(lang, 'Kurangkan yang bawah dari yang atas: garis − parabola.', 'Subtract the lower from the upper: line − parabola.')],
        [F((q ** 3 - p ** 3), 3), L(lang, 'Itu hanya luas di bawah parabola.', 'That is only the area under the parabola.')],
      ]),
      [`∫${sub(p).replace('-', '₋')}${sup(q)} [(${lin(p + q, -p * q)}) − x²] dx`, `= ${mi(ans)}`],
      { kind, p, q },
    );
  },
  (m) => {
    if (m.kind === 'line') return F(Math.round(simpson((x) => m.m * x, 0, m.b) * 2), 2);
    if (m.kind === 'par') return F(Math.round(Math.abs(simpson((x) => x * x - m.a * m.a, -m.a, m.a)) * 3), 3);
    const v = simpson((x) => (m.p + m.q) * x - m.p * m.q - x * x, m.p, m.q);
    return F(Math.round(v * 6), 6);
  },
);

// ================= Bab 5: Peluang =================
const randVar = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['k', 'E', 'coin', 'die']);
    if (kind === 'coin') {
      const n = ri(rnd, 2, 5);
      const k = ri(rnd, 0, n);
      const ans = F(C(n, k), 2 ** n);
      return NUM(
        L(lang, `${n} koin dilempar. X = banyak sisi angka. Nilai P(X = ${k}) adalah … (pecahan)`, `${n} coins are tossed. X = number of heads. Find P(X = ${k}). (fraction)`),
        ans,
        WR(ans, [
          [F(1, 2 ** n), L(lang, `Ada ${C(n, k)} cara mendapat ${k} angka.`, `There are ${C(n, k)} ways to get ${k} heads.`)],
          [F(1, n + 1), L(lang, 'Nilai X tidak sama mungkin.', 'The values of X are not equally likely.')],
        ]),
        [`C(${n}, ${k}) = ${C(n, k)}, ${L(lang, 'ruang sampel', 'sample space')} 2${sup(n)} = ${2 ** n}`, `P = ${C(n, k)}/${2 ** n} = ${ans}`],
        { kind, n, k },
      );
    }
    if (kind === 'die')
      return NUM(
        L(lang, 'Sebuah dadu dilempar. X = mata dadu yang muncul. Nilai E(X) adalah …', 'A die is rolled. X = the number shown. Find E(X).'),
        D(3.5),
        WR(D(3.5), [[21, L(lang, 'Setiap nilai dikali peluangnya 1/6.', 'Multiply each value by its probability 1/6.')], [3, L(lang, '(1 + 2 + … + 6) ÷ 6 = 3,5.', '(1 + 2 + … + 6) ÷ 6 = 3.5.')]]),
        ['E(X) = (1 + 2 + 3 + 4 + 5 + 6) × 1/6', `= ${M(lang, 3.5)}`],
        { kind, xs: [1, 2, 3, 4, 5, 6], ps: Array(6).fill(1 / 6) },
      );
    let ps;
    do {
      const a = ri(rnd, 1, 5);
      const b = ri(rnd, 1, 5);
      const c = ri(rnd, 1, 4);
      ps = [a, b, c, 10 - a - b - c].map((v) => v / 10);
    } while (ps[3] <= 0);
    const x0 = ri(rnd, 0, 2);
    const xs = [0, 1, 2, 3].map((v) => v + x0);
    if (kind === 'k') {
      const j = ri(rnd, 0, 3);
      return NUM(
        L(lang, `Distribusi peluang X: ${xs.map((x, i) => `P(X = ${x}) = ${i === j ? 'k' : M(lang, ps[i])}`).join('; ')}. Nilai k adalah …`, `The distribution of X: ${xs.map((x, i) => `P(X = ${x}) = ${i === j ? 'k' : M(lang, ps[i])}`).join('; ')}. Find k.`),
        D(ps[j]),
        WR(D(ps[j]), [[1 + ps[j], L(lang, 'Jumlah semua peluang adalah 1. k = 1 − jumlah yang lain.', 'All probabilities add to 1. k = 1 − the others.')]]),
        [L(lang, 'Jumlah peluang = 1', 'Probabilities add to 1'), `k = 1 − ${M(lang, 1 - ps[j])} = ${M(lang, ps[j])}`],
        { kind, ps, j, xs },
      );
    }
    const E = xs.reduce((s, x, i) => s + x * ps[i], 0);
    return NUM(
      L(lang, `X bernilai ${xs.join(', ')} dengan peluang ${ps.map((p) => M(lang, p)).join('; ')}. Nilai harapan E(X) adalah …`, `X takes the values ${xs.join(', ')} with probabilities ${ps.map((p) => M(lang, p)).join('; ')}. Find E(X).`),
      D(E),
      WR(D(E), [
        [xs.reduce((s, x) => s + x, 0) / 4, L(lang, 'Itu rata-rata biasa. Setiap nilai harus dikali peluangnya.', 'That is a plain average. Multiply each value by its probability.')],
        [Math.max(...ps), L(lang, 'E(X) = Σ x·P(X = x).', 'E(X) = Σ x·P(X = x).')],
      ]),
      [`E(X) = ${xs.map((x, i) => `${x} × ${M(lang, ps[i])}`).join(' + ')}`, `= ${M(lang, E)}`],
      { kind: 'E', xs, ps },
    );
  },
  (m) => {
    if (m.kind === 'coin') {
      let good = 0;
      for (let mask = 0; mask < 1 << m.n; mask++) {
        let b = 0;
        for (let i = 0; i < m.n; i++) if (mask & (1 << i)) b++;
        if (b === m.k) good++;
      }
      return F(good, 1 << m.n);
    }
    if (m.kind === 'k') return D(1 - m.ps.filter((_, i) => i !== m.j).reduce((s, p) => s + p, 0));
    return D(m.xs.reduce((s, x, i) => s + x * m.ps[i], 0));
  },
);

const binomial = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['p', 'p', 'E']);
    if (kind === 'E') {
      const n = pick(rnd, [10, 20, 25, 40, 50]);
      const p = pick(rnd, [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8]);
      const ctx = pick(rnd, [
        ['bibit tumbuh', 'bibit', 'a seed grows', 'seeds', 'seeds that grow'],
        ['tembakan masuk', 'tembakan', 'a shot scores', 'shots', 'shots that score'],
        ['soal dijawab benar dengan menebak', 'soal', 'a guessed answer is right', 'questions', 'correct answers'],
      ]);
      return NUM(
        L(lang, `Peluang ${ctx[0]} ${M(lang, p)}. Dari ${n} ${ctx[1]}, nilai harapan banyaknya adalah …`, `The probability that ${ctx[2]} is ${M(lang, p)}. Out of ${n} ${ctx[3]}, the expected number of ${ctx[4]} is …`),
        D(n * p),
        WR(D(n * p), [
          [n * (1 - p), L(lang, 'Itu harapan yang gagal. E = n × p.', 'That is the expected failures. E = n × p.')],
          [p, L(lang, 'Kalikan dengan n.', 'Multiply by n.')],
        ]),
        [`E = n × p = ${n} × ${M(lang, p)}`, `= ${M(lang, n * p)}`],
        { kind, n, p },
      );
    }
    const n = ri(rnd, 2, 5);
    const k = ri(rnd, 0, n);
    const half = rnd() < 0.4;
    const p = half ? 0.5 : pick(rnd, [0.1, 0.2, 0.3, 0.4]);
    const v = C(n, k) * p ** k * (1 - p) ** (n - k);
    const ans = half ? F(C(n, k), 2 ** n) : D(v);
    return NUM(
      L(lang, `X berdistribusi binomial dengan n = ${n} dan p = ${M(lang, p)}. Nilai P(X = ${k}) adalah …`, `X is binomial with n = ${n} and p = ${M(lang, p)}. Find P(X = ${k}).`),
      ans,
      WR(ans, [
        [C(n, k) > 1 ? D(p ** k * (1 - p) ** (n - k)) : null, L(lang, `Kalikan dengan C(${n}, ${k}) = ${C(n, k)}.`, `Multiply by C(${n}, ${k}) = ${C(n, k)}.`)],
        [k < n && !half ? D(C(n, k) * p ** k) : null, L(lang, `Jangan lupa (1 − p)${sup(n - k)}.`, `Remember (1 − p)${sup(n - k)}.`)],
        [!half ? D(C(n, k) * (1 - p) ** k * p ** (n - k)) : null, L(lang, 'p untuk sukses (k kali), 1 − p untuk gagal.', 'p is for the k successes, 1 − p for the failures.')],
      ]),
      [`P = C(${n}, ${k}) × ${M(lang, p)}${sup(k)} × ${M(lang, 1 - p)}${sup(n - k)}`, `= ${C(n, k)} × ${M(lang, p ** k)} × ${M(lang, (1 - p) ** (n - k))} = ${half ? ans : M(lang, v)}`],
      { kind, n, k, p },
    );
  },
  (m) => {
    if (m.kind === 'E') return D(m.n * m.p);
    // jumlahkan semua barisan sukses/gagal
    let tot = 0;
    for (let mask = 0; mask < 1 << m.n; mask++) {
      let b = 0;
      for (let i = 0; i < m.n; i++) if (mask & (1 << i)) b++;
      if (b === m.k) tot += Math.pow(m.p, b) * Math.pow(1 - m.p, m.n - b);
    }
    return m.p === 0.5 ? F(Math.round(tot * (1 << m.n)), 1 << m.n) : D(tot);
  },
);

const BIN_POOL = [
  ['mengambil 3 kartu satu per satu tanpa pengembalian, menghitung kartu As', 'drawing 3 cards one by one without replacement, counting aces', 0],
  ['melempar koin 10 kali, menghitung angka', 'tossing a coin 10 times, counting heads', 1],
  ['melempar dadu 5 kali, menghitung mata 6', 'rolling a die 5 times, counting sixes', 1],
  ['menembak 4 kali dengan peluang masuk 0,8 tiap tembakan', 'taking 4 shots, each scoring with probability 0.8', 1],
  ['melempar dadu sampai muncul mata 6, menghitung banyak lemparan', 'rolling a die until a six appears, counting the rolls', 0],
  ['memilih 5 siswa dari kelas tanpa pengembalian, menghitung yang berkacamata', 'choosing 5 students from a class without replacement, counting those with glasses', 0],
  ['menjawab 10 soal pilihan ganda dengan menebak, menghitung jawaban benar', 'guessing 10 multiple-choice answers, counting correct ones', 1],
  ['mencatat suhu harian selama seminggu', 'recording the daily temperature for a week', 0],
  ['mengetes 20 lampu dengan peluang rusak 0,05 masing-masing, menghitung yang rusak', 'testing 20 bulbs, each faulty with probability 0.05, counting faulty ones', 1],
  ['mengambil bola dari kantong dan mengembalikannya, 6 kali, menghitung bola merah', 'drawing a ball and putting it back, 6 times, counting red balls', 1],
];
const binPool = G(
  (rnd, lang) => {
    const notB = rnd() < 0.6;
    const ok = shuf(rnd, BIN_POOL.filter((b) => b[2] === (notB ? 0 : 1)))[0];
    const others = shuf(rnd, BIN_POOL.filter((b) => b[2] === (notB ? 1 : 0))).slice(0, 3);
    return OPT(
      notB ? L(lang, 'Manakah yang BUKAN percobaan binomial?', 'Which one is NOT a binomial experiment?') : L(lang, 'Manakah yang merupakan percobaan binomial?', 'Which one is a binomial experiment?'),
      L(lang, ok[0], ok[1]),
      others.map((o) => [L(lang, o[0], o[1]), notB ? L(lang, 'Banyak percobaan tetap, saling bebas, dan peluang sukses tetap: ini binomial.', 'Fixed number of independent trials with a constant success probability: this is binomial.') : L(lang, 'Ini bukan binomial: banyak percobaan tidak tetap, tidak saling bebas, atau tidak ada sukses/gagal.', 'Not binomial: the number of trials is not fixed, trials are not independent, or there is no success/failure.')]),
      [L(lang, 'Syarat binomial: n tetap, tiap percobaan sukses/gagal, saling bebas, p tetap.', 'Binomial needs: fixed n, success/failure trials, independence, constant p.'), L(lang, ok[0], ok[1])],
      { i: BIN_POOL.indexOf(ok) },
    );
  },
  (m, lang) => L(lang, BIN_POOL[m.i][0], BIN_POOL[m.i][1]),
);

const normal = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['z', 'x', 'pct']);
    const mu = ri(rnd, 10, 80) * (rnd() < 0.5 ? 1 : 2);
    const s = pick(rnd, [2, 4, 5, 8, 10]);
    if (kind !== 'pct') {
      const z = nz(rnd, -3, 3) / (rnd() < 0.3 ? 2 : 1);
      const x = mu + z * s;
      if (kind === 'z')
        return NUM(
          L(lang, `Data berdistribusi normal dengan μ = ${mu} dan σ = ${s}. Skor z untuk x = ${M(lang, x)} adalah …`, `Data are normal with μ = ${mu} and σ = ${s}. The z-score of x = ${M(lang, x)} is …`),
          D(z),
          WR(D(z), [
            [x - mu, L(lang, `Bagi dengan σ = ${s}.`, `Divide by σ = ${s}.`)],
            [-z, L(lang, 'z = (x − μ)/σ. Perhatikan urutannya.', 'z = (x − μ)/σ. Watch the order.')],
            [x / s, L(lang, 'Kurangi μ dulu.', 'Subtract μ first.')],
          ]),
          [`z = (${M(lang, x)} − ${mu}) ÷ ${s}`, `= ${M(lang, z)}`],
          { kind, mu, s, x },
        );
      return NUM(
        L(lang, `Nilai ujian berdistribusi normal dengan μ = ${mu} dan σ = ${s}. Nilai yang memiliki skor z = ${M(lang, z)} adalah …`, `Scores are normal with μ = ${mu} and σ = ${s}. The score with z = ${M(lang, z)} is …`),
        D(x),
        WR(D(x), [
          [mu - z * s, L(lang, 'x = μ + zσ. Perhatikan tanda z.', 'x = μ + zσ. Watch the sign of z.')],
          [mu + z, L(lang, `Kalikan z dengan σ = ${s}.`, `Multiply z by σ = ${s}.`)],
        ]),
        [`x = μ + zσ = ${mu} + ${pp(z)} × ${s}`, `= ${M(lang, x)}`],
        { kind, mu, s, z },
      );
    }
    const k = pick(rnd, ['gt1', 'lt1', 'in1', 'in2', 'gt2', 'gt0', 'mid']);
    const [q, ans] = {
      gt1: [L(lang, `lebih dari ${mu + s}`, `more than ${mu + s}`), 16],
      lt1: [L(lang, `kurang dari ${mu - s}`, `less than ${mu - s}`), 16],
      in1: [L(lang, `antara ${mu - s} dan ${mu + s}`, `between ${mu - s} and ${mu + s}`), 68],
      in2: [L(lang, `antara ${mu - 2 * s} dan ${mu + 2 * s}`, `between ${mu - 2 * s} and ${mu + 2 * s}`), 95],
      gt2: [L(lang, `lebih dari ${mu + 2 * s}`, `more than ${mu + 2 * s}`), 2.5],
      gt0: [L(lang, `lebih dari ${mu}`, `more than ${mu}`), 50],
      mid: [L(lang, `antara ${mu} dan ${mu + s}`, `between ${mu} and ${mu + s}`), 34],
    }[k];
    return NUM(
      L(lang, `Data berdistribusi normal dengan μ = ${mu} dan σ = ${s}. Menurut aturan 68–95–99,7, persentase data yang ${q} sekitar … %`, `Data are normal with μ = ${mu} and σ = ${s}. By the 68–95–99.7 rule, the percentage of data ${q} is about … %`),
      D(ans),
      WR(D(ans), [
        [{ gt1: 32, lt1: 32, in1: 95, in2: 68, gt2: 5, gt0: 100, mid: 68 }[k], L(lang, 'Ingat: 68% dalam 1σ, 95% dalam 2σ; sisanya dibagi dua sisi.', 'Remember: 68% within 1σ, 95% within 2σ; the rest splits between two tails.')],
        [{ gt1: 34, lt1: 34, in1: 34, in2: 47.5, gt2: 47.5, gt0: 68, mid: 16 }[k], L(lang, 'Gambar kurvanya dan tandai daerah yang ditanya.', 'Sketch the curve and shade the asked region.')],
      ]),
      [L(lang, '68% dalam μ ± σ, 95% dalam μ ± 2σ, kurva simetris.', '68% within μ ± σ, 95% within μ ± 2σ, the curve is symmetric.'), `≈ ${M(lang, ans)}%`],
      { kind, k },
    );
  },
  (m) => {
    if (m.kind === 'z') return D((m.x - m.mu) / m.s);
    if (m.kind === 'x') return D(m.mu + m.z * m.s);
    // aturan empiris: luas pita
    const W = { 1: 68, 2: 95 };
    return D({ gt1: (100 - W[1]) / 2, lt1: (100 - W[1]) / 2, in1: W[1], in2: W[2], gt2: (100 - W[2]) / 2, gt0: 50, mid: W[1] / 2 }[m.k]);
  },
);

export const K12L = {
  'k12lb1-1': [parabola],
  'k12lb1-2': [ellipse, ellConcept],
  'k12lb1-3': [hyperbola, hypConcept],
  'k12lb2-1': [limSub, limSide],
  'k12lb2-2': [limFactor, limRoot, limSub],
  'k12lb2-3': [limInf, limInfMC],
  'k12lb3-1': [slope, derPool],
  'k12lb3-2': [derRule],
  'k12lb3-3': [derApp, derPool],
  'k12lb4-1': [intIndef, intIVP],
  'k12lb4-2': [intDef],
  'k12lb4-3': [area],
  'k12lb5-1': [randVar],
  'k12lb5-2': [binomial, binPool],
  'k12lb5-3': [normal],
};
