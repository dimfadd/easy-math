// Generator soal Kelas 12 SMA (wajib).
import { L, ri, pick, D, N, F, gcd, G, mi, M, Fr, sup, nz, shuf, fact, C, P, WR, MC, NUM, OPT, poly, pc, xm, plus, pt } from './common.js';

const lin = (a, b) => poly([[a, 1], [b, 0]]);
// y = s(x − h)² + k sebagai teks
const qv = (s, h, k) => `y = ${s === 1 ? '' : s === -1 ? '−' : mi(s)}${h === 0 ? 'x²' : `${xm(h)}²`}${plus(k)}`;
const shiftTxt = (lang, h, k) =>
  [h ? (h > 0 ? L(lang, `${h} satuan ke kanan`, `${h} units right`) : L(lang, `${-h} satuan ke kiri`, `${-h} units left`)) : '', k ? (k > 0 ? L(lang, `${k} satuan ke atas`, `${k} units up`) : L(lang, `${-k} satuan ke bawah`, `${-k} units down`)) : '']
    .filter(Boolean)
    .join(L(lang, ' dan ', ' and '));

// ================= Bab 1: Transformasi fungsi =================
const transl = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['eq', 'eq', 'line', 'point']);
    if (kind === 'eq') {
      const h = ri(rnd, -6, 6);
      let k = ri(rnd, -6, 6);
      if (!h && !k) k = 3;
      const okT = qv(1, h, k);
      return OPT(
        L(lang, `Grafik y = x² digeser ${shiftTxt(lang, h, k)}. Persamaan bayangannya adalah …`, `The graph of y = x² is shifted ${shiftTxt(lang, h, k)}. The equation of the image is …`),
        okT,
        [
          [qv(1, -h, k), L(lang, 'Geser ke kanan h berarti x diganti (x − h); ke kiri berarti (x + h).', 'Shifting right by h replaces x with (x − h); left uses (x + h).')],
          [qv(1, h, -k), L(lang, 'Geser ke atas berarti menambah, ke bawah mengurangi.', 'Up means add, down means subtract.')],
          [qv(1, k, h), L(lang, 'Pergeseran mendatar dan tegak tertukar.', 'The horizontal and vertical shifts are swapped.')],
          [`y = x²${plus(h + k)}`, L(lang, 'Pergeseran mendatar terjadi di dalam kuadrat, bukan ditambahkan di luar.', 'A horizontal shift goes inside the square, not outside.')],
        ],
        [L(lang, 'Translasi (h, k): y = f(x − h) + k', 'Translation (h, k): y = f(x − h) + k'), okT],
        { kind, h, k },
      );
    }
    if (kind === 'line') {
      const m = nz(rnd, -4, 4);
      const c = ri(rnd, -5, 5);
      const a = ri(rnd, -4, 4);
      const b = nz(rnd, -5, 5);
      const x0 = ri(rnd, -3, 4);
      const v = m * (x0 - a) + c + b;
      return NUM(
        L(lang, `Garis f(x) = ${lin(m, c)} ditranslasi ${pt(a, b)} menjadi g(x). Nilai g(${mi(x0)}) adalah …`, `The line f(x) = ${lin(m, c)} is translated by ${pt(a, b)} to give g(x). Find g(${mi(x0)}).`),
        D(v),
        WR(D(v), [
          [a ? m * (x0 + a) + c + b : null, L(lang, `Geser mendatar ${mi(a)} berarti x diganti (x − ${a < 0 ? `(${mi(a)})` : a}).`, `A horizontal shift of ${mi(a)} replaces x with (x − ${a < 0 ? `(${mi(a)})` : a}).`)],
          [m * x0 + c + b, L(lang, 'Pergeseran mendatar juga harus dipakai.', 'The horizontal shift must be used too.')],
          [m * (x0 - a) + c - b, L(lang, 'Pergeseran tegak ditambahkan.', 'The vertical shift is added.')],
        ]),
        [`g(x) = f(x − ${a < 0 ? `(${mi(a)})` : a})${plus(b)} = ${lin(m, -m * a + c + b)}`, `g(${mi(x0)}) = ${mi(v)}`],
        { kind, m, c, a, b, x0 },
      );
    }
    const x = ri(rnd, -3, 3);
    const a = nz(rnd, -5, 5);
    const b = nz(rnd, -5, 5);
    return NUM(
      L(lang, `Titik (${mi(x)}, ${x * x}) pada grafik y = x² ditranslasi ${pt(a, b)} menjadi (p, q). Nilai p + q adalah …`, `The point (${mi(x)}, ${x * x}) on y = x² is translated by ${pt(a, b)} to (p, q). Find p + q.`),
      D(x + a + x * x + b),
      WR(D(x + a + x * x + b), [
        [x - a + x * x - b, L(lang, 'Translasi menambahkan vektornya.', 'A translation adds the vector.')],
        [x + a + x * x - b, L(lang, 'Kedua komponen ditambahkan.', 'Both components are added.')],
      ]),
      [`p = ${mi(x)} + ${a < 0 ? `(${mi(a)})` : a} = ${mi(x + a)}, q = ${x * x} + ${b < 0 ? `(${mi(b)})` : b} = ${mi(x * x + b)}`, `p + q = ${mi(x + a + x * x + b)}`],
      { kind, x, a, b },
    );
  },
  (m) => {
    if (m.kind === 'eq') {
      // bentuk ulang dari titik puncak (h, k)
      return `y = ${m.h === 0 ? 'x²' : m.h > 0 ? `(x − ${m.h})²` : `(x + ${-m.h})²`}${m.k === 0 ? '' : m.k > 0 ? ` + ${m.k}` : ` − ${-m.k}`}`;
    }
    if (m.kind === 'line') return D(m.m * (m.x0 - m.a) + m.c + m.b);
    return D(m.x + m.a + m.x * m.x + m.b);
  },
);

// fungsi untuk refleksi/dilatasi: lin, kuadrat, eksponen
const FN = [
  { id: 'q', t: (p) => `x²${plus(p)}`, f: (p) => (x) => x * x + p },
  { id: 'l', t: (p) => lin(2, p), f: (p) => (x) => 2 * x + p },
  { id: 'l3', t: (p) => lin(3, p), f: (p) => (x) => 3 * x + p },
  { id: 'c', t: (p) => `(x${plus(p)})²`, f: (p) => (x) => (x + p) ** 2 },
];
const reflEq = G(
  (rnd, lang) => {
    const kind = rnd() < 0.5 ? 'sx' : 'sy';
    const ex = rnd() < 0.3;
    if (ex) {
      const b = pick(rnd, [2, 3, 5]);
      const okT = kind === 'sx' ? `y = −${b}${sup('x')}` : `y = ${b}${sup('−x')}`;
      return OPT(
        L(lang, `Grafik y = ${b}${sup('x')} dicerminkan terhadap sumbu ${kind === 'sx' ? 'x' : 'y'}. Persamaan bayangannya adalah …`, `The graph of y = ${b}${sup('x')} is reflected in the ${kind === 'sx' ? 'x' : 'y'}-axis. The equation of the image is …`),
        okT,
        [
          [kind === 'sx' ? `y = ${b}${sup('−x')}` : `y = −${b}${sup('x')}`, kind === 'sx' ? L(lang, 'Itu cermin terhadap sumbu y. Cermin sumbu x: y menjadi −y.', 'That is the reflection in the y-axis. In the x-axis, y becomes −y.') : L(lang, 'Itu cermin terhadap sumbu x. Cermin sumbu y: x menjadi −x.', 'That is the reflection in the x-axis. In the y-axis, x becomes −x.')],
          [`y = −${b}${sup('−x')}`, L(lang, 'Itu rotasi 180°, bukan satu pencerminan.', 'That is a 180° rotation, not one reflection.')],
          [`y = ${b}${sup('x')} − 1`, L(lang, 'Pencerminan bukan pergeseran.', 'A reflection is not a shift.')],
        ],
        [kind === 'sx' ? L(lang, 'Cermin sumbu x: y = −f(x)', 'Reflection in the x-axis: y = −f(x)') : L(lang, 'Cermin sumbu y: y = f(−x)', 'Reflection in the y-axis: y = f(−x)'), okT],
        { kind, b, ex },
      );
    }
    const p = nz(rnd, -6, 6);
    const okT = kind === 'sx' ? `y = −x²${plus(-p)}` : `y = x²${plus(p)}`;
    // untuk sumbu y pakai bentuk (x − h)²
    const h = nz(rnd, -5, 5);
    if (kind === 'sy') {
      const ok2 = `y = ${xm(-h)}²${plus(p)}`;
      return OPT(
        L(lang, `Grafik y = ${xm(h)}²${plus(p)} dicerminkan terhadap sumbu y. Persamaan bayangannya adalah …`, `The graph of y = ${xm(h)}²${plus(p)} is reflected in the y-axis. The equation of the image is …`),
        ok2,
        [
          [`y = −${xm(h)}²${plus(-p)}`, L(lang, 'Itu cermin terhadap sumbu x.', 'That is the reflection in the x-axis.')],
          [`y = ${xm(h)}²${plus(-p)}`, L(lang, 'Cermin sumbu y mengganti x dengan −x; suku tetap tidak berubah.', 'Reflecting in the y-axis replaces x with −x; the constant stays.')],
          [`y = −${xm(-h)}²${plus(p)}`, L(lang, 'Nilai y tidak dikali −1 pada cermin sumbu y.', 'y is not multiplied by −1 in a y-axis reflection.')],
        ],
        [L(lang, `Cermin sumbu y: y = f(−x). Puncak (${mi(h)}, ${mi(p)}) menjadi (${mi(-h)}, ${mi(p)}).`, `Reflection in the y-axis: y = f(−x). Vertex (${mi(h)}, ${mi(p)}) becomes (${mi(-h)}, ${mi(p)}).`), ok2],
        { kind, h, p, ex },
      );
    }
    return OPT(
      L(lang, `Grafik y = x²${plus(p)} dicerminkan terhadap sumbu x. Persamaan bayangannya adalah …`, `The graph of y = x²${plus(p)} is reflected in the x-axis. The equation of the image is …`),
      okT,
      [
        [`y = −x²${plus(p)}`, L(lang, 'Seluruh f(x) dikali −1, termasuk suku tetapnya.', 'All of f(x) is multiplied by −1, including the constant.')],
        [`y = x²${plus(-p)}`, L(lang, 'Suku x² juga berganti tanda.', 'The x² term changes sign too.')],
        [`y = (−x)²${plus(p)}`, L(lang, 'Itu cermin terhadap sumbu y (dan sama dengan grafik semula).', 'That is the y-axis reflection (which gives the same graph).')],
      ],
      [L(lang, 'Cermin sumbu x: y = −f(x)', 'Reflection in the x-axis: y = −f(x)'), `y = −(x²${plus(p)}) = ${okT.slice(4)}`],
      { kind, p, ex },
    );
  },
  (m) => {
    if (m.ex) return m.kind === 'sx' ? `y = −${m.b}${sup('x')}` : `y = ${m.b}${sup('−x')}`;
    if (m.kind === 'sy') return `y = ${xm(-m.h)}²${plus(m.p)}`;
    return `y = −x²${plus(-m.p)}`;
  },
);

const reflVal = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['gx', 'gy', 'pt', 'vtx']);
    if (kind === 'pt') {
      const x = ri(rnd, -6, 6);
      const y = nz(rnd, -9, 9);
      const ax = rnd() < 0.5 ? 'x' : 'y';
      const ans = ax === 'x' ? -y : -x;
      return NUM(
        ax === 'x' ? L(lang, `Titik ${pt(x, y)} ada pada grafik y = f(x). Setelah grafik dicerminkan terhadap sumbu x, titik itu menjadi (${mi(x)}, b). Nilai b adalah …`, `The point ${pt(x, y)} is on y = f(x). After reflecting the graph in the x-axis, it becomes (${mi(x)}, b). Find b.`) : L(lang, `Titik ${pt(x, y)} ada pada grafik y = f(x). Setelah grafik dicerminkan terhadap sumbu y, titik itu menjadi (a, ${mi(y)}). Nilai a adalah …`, `The point ${pt(x, y)} is on y = f(x). After reflecting the graph in the y-axis, it becomes (a, ${mi(y)}). Find a.`),
        D(ans),
        WR(D(ans), [[-ans, L(lang, 'Pencerminan membalik tanda koordinat itu.', 'The reflection flips the sign of that coordinate.')], [ax === 'x' ? -x : -y, L(lang, 'Koordinat yang berubah tergantung sumbunya.', 'Which coordinate changes depends on the axis.')]]),
        [ax === 'x' ? L(lang, 'Cermin sumbu x: (x, y) → (x, −y)', 'Reflection in the x-axis: (x, y) → (x, −y)') : L(lang, 'Cermin sumbu y: (x, y) → (−x, y)', 'Reflection in the y-axis: (x, y) → (−x, y)'), `= ${mi(ans)}`],
        { kind, x, y, ax },
      );
    }
    if (kind === 'vtx') {
      const h = nz(rnd, -6, 6);
      return NUM(
        L(lang, `Grafik y = ${xm(h)}² dicerminkan terhadap sumbu y. Puncak bayangannya di (a, 0). Nilai a adalah …`, `The graph of y = ${xm(h)}² is reflected in the y-axis. The image has vertex (a, 0). Find a.`),
        D(-h),
        WR(D(-h), [[h, L(lang, `Puncak semula (${mi(h)}, 0). Cermin sumbu y membalik tanda x.`, `The original vertex is (${mi(h)}, 0). The y-axis reflection flips the sign of x.`)]]),
        [L(lang, `Puncak (${mi(h)}, 0) → (${mi(-h)}, 0)`, `Vertex (${mi(h)}, 0) → (${mi(-h)}, 0)`), `a = ${mi(-h)}`],
        { kind, h },
      );
    }
    const fi = ri(rnd, 0, FN.length - 1);
    const p = nz(rnd, -6, 6);
    const x0 = nz(rnd, -3, 3);
    const f = FN[fi].f(p);
    const v = kind === 'gx' ? -f(x0) : f(-x0);
    const other = kind === 'gx' ? f(-x0) : -f(x0);
    return NUM(
      L(lang, `f(x) = ${FN[fi].t(p)} dicerminkan terhadap sumbu ${kind === 'gx' ? 'x' : 'y'} menjadi g(x). Nilai g(${mi(x0)}) adalah …`, `f(x) = ${FN[fi].t(p)} is reflected in the ${kind === 'gx' ? 'x' : 'y'}-axis to give g(x). Find g(${mi(x0)}).`),
      D(v),
      WR(D(v), [
        [other, L(lang, `Itu cermin terhadap sumbu ${kind === 'gx' ? 'y' : 'x'}.`, `That is the reflection in the ${kind === 'gx' ? 'y' : 'x'}-axis.`)],
        [f(x0), L(lang, 'Itu f(x) sebelum dicerminkan.', 'That is f before the reflection.')],
      ]),
      [kind === 'gx' ? `g(x) = −f(x)` : `g(x) = f(−x)`, kind === 'gx' ? `g(${mi(x0)}) = −f(${mi(x0)}) = −(${mi(f(x0))}) = ${mi(v)}` : `g(${mi(x0)}) = f(${mi(-x0)}) = ${mi(v)}`],
      { kind, fi, p, x0 },
    );
  },
  (m) => {
    if (m.kind === 'pt') return D(m.ax === 'x' ? -m.y : -m.x);
    if (m.kind === 'vtx') return D(-m.h);
    const f = FN[m.fi].f(m.p);
    return D(m.kind === 'gx' ? -f(m.x0) : f(-m.x0));
  },
);

const dilat = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['gv', 'gh', 'ptv', 'pth']);
    const k = pick(rnd, [2, 3, 4, 5]);
    if (kind === 'ptv' || kind === 'pth') {
      const x = nz(rnd, -6, 6);
      const y = nz(rnd, -6, 8);
      const v = kind === 'ptv';
      const ans = v ? k * y : k * x;
      return NUM(
        v ? L(lang, `Titik ${pt(x, y)} ada pada grafik y = f(x). Grafik didilatasi tegak dengan faktor ${k}, sehingga titik menjadi (${mi(x)}, b). Nilai b adalah …`, `The point ${pt(x, y)} is on y = f(x). The graph is stretched vertically by factor ${k}, so the point becomes (${mi(x)}, b). Find b.`) : L(lang, `Titik ${pt(x, y)} ada pada grafik y = f(x). Grafik didilatasi mendatar dengan faktor ${k}, sehingga titik menjadi (a, ${mi(y)}). Nilai a adalah …`, `The point ${pt(x, y)} is on y = f(x). The graph is stretched horizontally by factor ${k}, so the point becomes (a, ${mi(y)}). Find a.`),
        D(ans),
        WR(D(ans), [
          [Number.isInteger(v ? y / k : x / k) ? (v ? y / k : x / k) : null, L(lang, 'Dilatasi faktor k mengalikan jarak dengan k, bukan membagi.', 'A stretch by factor k multiplies distances by k, not divides.')],
          [v ? y + k : x + k, L(lang, 'Dilatasi mengalikan, bukan menambah.', 'A stretch multiplies; it does not add.')],
          [v ? k * x : k * y, L(lang, `Dilatasi ${v ? 'tegak' : 'mendatar'} hanya mengubah koordinat ${v ? 'y' : 'x'}.`, `A ${v ? 'vertical' : 'horizontal'} stretch only changes the ${v ? 'y' : 'x'}-coordinate.`)],
        ]),
        [v ? `(x, y) → (x, ${k}y)` : `(x, y) → (${k}x, y)`, `= ${mi(ans)}`],
        { kind, k, x, y },
      );
    }
    const fi = ri(rnd, 0, 1);
    const p = nz(rnd, -5, 5);
    const f = FN[fi].f(p);
    const x0 = kind === 'gh' ? k * nz(rnd, -3, 3) : nz(rnd, -3, 3);
    const v = kind === 'gv' ? k * f(x0) : f(x0 / k);
    return NUM(
      kind === 'gv' ? L(lang, `f(x) = ${FN[fi].t(p)} dan g(x) = ${k}·f(x). Nilai g(${mi(x0)}) adalah …`, `f(x) = ${FN[fi].t(p)} and g(x) = ${k}·f(x). Find g(${mi(x0)}).`) : L(lang, `f(x) = ${FN[fi].t(p)} didilatasi mendatar dengan faktor ${k} menjadi g(x) = f(x ÷ ${k}). Nilai g(${mi(x0)}) adalah …`, `f(x) = ${FN[fi].t(p)} is stretched horizontally by factor ${k} to give g(x) = f(x ÷ ${k}). Find g(${mi(x0)}).`),
      D(v),
      WR(D(v), [
        [kind === 'gv' ? f(k * x0) : f(k * x0), kind === 'gv' ? L(lang, `g(x) = ${k}·f(x): kalikan hasil f, bukan x.`, `g(x) = ${k}·f(x): multiply the output of f, not x.`) : L(lang, `Mendatar dengan faktor ${k} berarti x dibagi ${k}, bukan dikali.`, `A horizontal stretch by ${k} divides x by ${k}, not multiplies.`)],
        [f(x0), L(lang, 'Itu f sebelum didilatasi.', 'That is f before the stretch.')],
        [kind === 'gh' ? k * f(x0) : null, L(lang, 'Itu dilatasi tegak.', 'That is a vertical stretch.')],
      ]),
      [kind === 'gv' ? `f(${mi(x0)}) = ${mi(f(x0))}` : `x ÷ ${k} = ${mi(x0 / k)}, f(${mi(x0 / k)}) = ${mi(f(x0 / k))}`, kind === 'gv' ? `g(${mi(x0)}) = ${k} × ${f(x0) < 0 ? `(${mi(f(x0))})` : f(x0)} = ${mi(v)}` : `g(${mi(x0)}) = ${mi(v)}`],
      { kind, k, fi, p, x0 },
    );
  },
  (m) => {
    if (m.kind === 'ptv') return D(m.k * m.y);
    if (m.kind === 'pth') return D(m.k * m.x);
    const f = FN[m.fi].f(m.p);
    return D(m.kind === 'gv' ? m.k * f(m.x0) : f(m.x0 / m.k));
  },
);

const DIL_POOL = [
  ['Grafik y = f(x) didilatasi mendatar dengan faktor k. Persamaan bayangannya adalah …', 'The graph y = f(x) is stretched horizontally by factor k. The equation of the image is …', 'y = f(x ÷ k)', 'y = f(x ÷ k)', [['y = f(kx)', 'y = f(kx)', 'f(kx) justru memampatkan grafik dengan faktor 1/k.', 'f(kx) actually compresses by a factor 1/k.'], ['y = k·f(x)', 'y = k·f(x)', 'Itu dilatasi tegak.', 'That is a vertical stretch.'], ['y = f(x) + k', 'y = f(x) + k', 'Itu translasi ke atas.', 'That is a translation upward.']]],
  ['Grafik y = f(x) didilatasi tegak dengan faktor k. Persamaan bayangannya adalah …', 'The graph y = f(x) is stretched vertically by factor k. The equation of the image is …', 'y = k·f(x)', 'y = k·f(x)', [['y = f(x ÷ k)', 'y = f(x ÷ k)', 'Itu dilatasi mendatar.', 'That is a horizontal stretch.'], ['y = f(kx)', 'y = f(kx)', 'Itu pemampatan mendatar.', 'That is a horizontal compression.'], ['y = f(x) + k', 'y = f(x) + k', 'Itu translasi ke atas.', 'That is a translation upward.']]],
  ['Pada dilatasi tegak, titik grafik yang tidak berpindah adalah titik yang …', 'Under a vertical stretch, the points that do not move are those that …', 'terletak pada sumbu x', 'lie on the x-axis', [['terletak pada sumbu y', 'lie on the y-axis', 'Titik di sumbu y tetap ikut berpindah naik/turun kecuali y-nya 0.', 'Points on the y-axis still move up or down unless y = 0.'], ['merupakan puncak grafik', 'are vertices', 'Puncak berpindah kecuali nilai y-nya 0.', 'A vertex moves unless its y is 0.'], ['semua titik grafik', 'are all points', 'Titik dengan y ≠ 0 berpindah.', 'Points with y ≠ 0 move.']]],
  ['Pada dilatasi mendatar, titik grafik yang tidak berpindah adalah titik yang …', 'Under a horizontal stretch, the points that do not move are those that …', 'terletak pada sumbu y', 'lie on the y-axis', [['terletak pada sumbu x', 'lie on the x-axis', 'Titik di sumbu x bergeser mendatar kecuali x-nya 0.', 'Points on the x-axis move sideways unless x = 0.'], ['merupakan puncak grafik', 'are vertices', 'Puncak berpindah kecuali x-nya 0.', 'A vertex moves unless its x is 0.'], ['tidak ada', 'there are none', 'Titik dengan x = 0 tetap.', 'Points with x = 0 stay.']]],
  ['Grafik y = 3·f(x) dibandingkan y = f(x) menjadi …', 'Compared with y = f(x), the graph of y = 3·f(x) is …', '3 kali lebih tinggi (direnggangkan tegak)', 'stretched vertically by 3', [['3 kali lebih lebar', 'stretched horizontally by 3', 'Pengali di luar f mengubah arah tegak.', 'A multiplier outside f acts vertically.'], ['bergeser 3 satuan ke atas', 'shifted up 3', 'Itu y = f(x) + 3.', 'That is y = f(x) + 3.'], ['dicerminkan terhadap sumbu x', 'reflected in the x-axis', 'Pencerminan butuh tanda minus.', 'A reflection needs a minus sign.']]],
  ['Grafik y = f(2x) dibandingkan y = f(x) menjadi …', 'Compared with y = f(x), the graph of y = f(2x) is …', 'dimampatkan mendatar menjadi setengah lebarnya', 'compressed horizontally to half the width', [['direnggangkan mendatar 2 kali', 'stretched horizontally by 2', 'x dikali 2 membuat grafik lebih sempit.', 'Multiplying x by 2 makes the graph narrower.'], ['2 kali lebih tinggi', 'stretched vertically by 2', 'Itu y = 2·f(x).', 'That is y = 2·f(x).'], ['bergeser 2 satuan ke kiri', 'shifted 2 left', 'Itu y = f(x + 2).', 'That is y = f(x + 2).']]],
  ['Dilatasi tegak dengan faktor ½ membuat grafik …', 'A vertical stretch by factor ½ makes the graph …', 'lebih pendek (tingginya setengah)', 'flatter (half the height)', [['lebih tinggi 2 kali', 'twice as tall', 'Faktor kurang dari 1 memampatkan.', 'A factor below 1 compresses.'], ['bergeser setengah satuan', 'shift by half a unit', 'Dilatasi tidak menggeser.', 'A stretch does not shift.'], ['terbalik', 'upside down', 'Tidak ada tanda minus.', 'There is no minus sign.']]],
  ['Titik potong sumbu x dari y = f(x) setelah dilatasi tegak faktor 4 …', 'After a vertical stretch by factor 4, the x-intercepts of y = f(x) …', 'tetap di tempat yang sama', 'stay in the same place', [['dikali 4', 'are multiplied by 4', 'Titik potong sumbu x punya y = 0, dan 4 × 0 = 0.', 'x-intercepts have y = 0, and 4 × 0 = 0.'], ['dibagi 4', 'are divided by 4', 'Koordinat x tidak berubah pada dilatasi tegak.', 'x-coordinates do not change in a vertical stretch.'], ['hilang', 'disappear', 'Titik itu tetap ada.', 'They are still there.']]],
  ['Titik potong sumbu y dari y = f(x) setelah dilatasi mendatar faktor 3 …', 'After a horizontal stretch by factor 3, the y-intercept of y = f(x) …', 'tetap di tempat yang sama', 'stays in the same place', [['dikali 3', 'is multiplied by 3', 'Titik potong sumbu y punya x = 0, dan 3 × 0 = 0.', 'The y-intercept has x = 0, and 3 × 0 = 0.'], ['dibagi 3', 'is divided by 3', 'Koordinat y tidak berubah pada dilatasi mendatar.', 'y does not change in a horizontal stretch.'], ['bergeser ke kanan 3', 'moves 3 to the right', 'Dilatasi tidak menggeser titik di x = 0.', 'A stretch does not move points at x = 0.']]],
  ['Grafik y = −2·f(x) adalah grafik y = f(x) yang …', 'The graph of y = −2·f(x) is y = f(x) …', 'dilatasi tegak faktor 2 lalu dicerminkan terhadap sumbu x', 'stretched vertically by 2 and reflected in the x-axis', [['dilatasi mendatar faktor 2 lalu dicerminkan terhadap sumbu y', 'stretched horizontally by 2 and reflected in the y-axis', 'Pengali di luar f bekerja tegak.', 'A multiplier outside f acts vertically.'], ['digeser 2 ke bawah', 'shifted down 2', 'Itu y = f(x) − 2.', 'That is y = f(x) − 2.'], ['dimampatkan tegak faktor ½', 'compressed vertically by ½', 'Faktornya 2, bukan ½, dan ada pencerminan.', 'The factor is 2, not ½, and there is a reflection.']]],
];
const dilPool = G(
  (rnd, lang) => {
    const i = ri(rnd, 0, DIL_POOL.length - 1);
    const [qi, qe, ai, ae, ds] = DIL_POOL[i];
    return OPT(L(lang, qi, qe), L(lang, ai, ae), ds.map((d) => [L(lang, d[0], d[1]), L(lang, d[2], d[3])]), [L(lang, 'Pengali di luar f bekerja tegak (pada y); di dalam f bekerja mendatar (pada x) dengan efek terbalik.', 'A multiplier outside f acts vertically (on y); inside f it acts horizontally (on x) with the opposite effect.'), L(lang, ai, ae)], { i });
  },
  (m, lang) => L(lang, DIL_POOL[m.i][2], DIL_POOL[m.i][3]),
);

const rot = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['pt', 'pt', 'vtx', 'grad']);
    if (kind === 'pt') {
      const x = nz(rnd, -7, 7);
      const y = nz(rnd, -7, 7);
      const a = pick(rnd, [90, -90, 180]);
      const img = a === 90 ? [-y, x] : a === -90 ? [y, -x] : [-x, -y];
      const ask = pick(rnd, ['a', 'b', 'a + b']);
      const ans = ask === 'a' ? img[0] : ask === 'b' ? img[1] : img[0] + img[1];
      const alt = a === 90 ? [y, -x] : a === -90 ? [-y, x] : [x, y];
      const nm = { 90: L(lang, '90° berlawanan arah jarum jam', '90° anticlockwise'), '-90': L(lang, '90° searah jarum jam', '90° clockwise'), 180: '180°' }[a];
      const pickA = (P0) => (ask === 'a' ? P0[0] : ask === 'b' ? P0[1] : P0[0] + P0[1]);
      return NUM(
        L(lang, `Titik ${pt(x, y)} diputar ${nm} dengan pusat O menjadi (a, b). Nilai ${ask} adalah …`, `The point ${pt(x, y)} is rotated ${nm} about O to (a, b). Find ${ask}.`),
        D(ans),
        WR(D(ans), [
          [pickA(alt), L(lang, 'Arah putarannya terbalik.', 'The direction of rotation is reversed.')],
          [pickA([y, x]), L(lang, 'Itu cermin terhadap y = x. Rotasi juga mengubah tanda.', 'That is the reflection in y = x. A rotation also changes a sign.')],
          [pickA([x, y]), L(lang, 'Titiknya harus berpindah.', 'The point must move.')],
        ]),
        [{ 90: '(x, y) → (−y, x)', '-90': '(x, y) → (y, −x)', 180: '(x, y) → (−x, −y)' }[a], `${pt(x, y)} → ${pt(...img)}`, `${ask} = ${mi(ans)}`],
        { kind, x, y, a, ask },
      );
    }
    if (kind === 'vtx') {
      const h = nz(rnd, -6, 6);
      const k = nz(rnd, -6, 6);
      return NUM(
        L(lang, `Grafik ${qv(1, h, k)} diputar 180° dengan pusat O. Puncak bayangannya (a, b). Nilai a + b adalah …`, `The graph ${qv(1, h, k)} is rotated 180° about O. The image has vertex (a, b). Find a + b.`),
        D(-h - k),
        WR(D(-h - k), [
          [h + k, L(lang, 'Rotasi 180° membalik tanda kedua koordinat puncak.', 'A 180° rotation flips the signs of both vertex coordinates.')],
          [-h + k, L(lang, 'Koordinat y juga berganti tanda.', 'The y-coordinate changes sign too.')],
          [h - k, L(lang, 'Koordinat x juga berganti tanda.', 'The x-coordinate changes sign too.')],
        ]),
        [L(lang, `Puncak (${mi(h)}, ${mi(k)}) → (${mi(-h)}, ${mi(-k)})`, `Vertex (${mi(h)}, ${mi(k)}) → (${mi(-h)}, ${mi(-k)})`), `a + b = ${mi(-h - k)}`],
        { kind, h, k },
      );
    }
    const m = nz(rnd, -5, 5);
    const ans = F(-1, m);
    return NUM(
      L(lang, `Garis y = ${m === 1 ? '' : m === -1 ? '−' : mi(m)}x diputar 90° dengan pusat O. Gradien garis bayangannya adalah … (boleh pecahan)`, `The line y = ${m === 1 ? '' : m === -1 ? '−' : mi(m)}x is rotated 90° about O. The gradient of the image is … (fraction allowed)`),
      ans,
      WR(ans, [
        [F(1, m), L(lang, 'Garis yang tegak lurus punya gradien −1/m. Perhatikan tandanya.', 'A perpendicular line has gradient −1/m. Watch the sign.')],
        [-m, L(lang, 'Gradien tegak lurus adalah kebalikan negatif, bukan hanya lawan tanda.', 'The perpendicular gradient is the negative reciprocal, not just the opposite sign.')],
        [m, L(lang, 'Rotasi 90° mengubah arah garis.', 'A 90° rotation changes the direction of the line.')],
      ]),
      [L(lang, `Rotasi 90° membuat garis tegak lurus garis semula: m₁ × m₂ = −1.`, `A 90° rotation makes the line perpendicular to the original: m₁ × m₂ = −1.`), `m = −1/${m < 0 ? `(${mi(m)})` : m} = ${mi(ans)}`],
      { kind, m },
    );
  },
  (mm) => {
    if (mm.kind === 'pt') {
      const t = (mm.a * Math.PI) / 180;
      const a = Math.round(mm.x * Math.cos(t) - mm.y * Math.sin(t));
      const b = Math.round(mm.x * Math.sin(t) + mm.y * Math.cos(t));
      return D(mm.ask === 'a' ? a : mm.ask === 'b' ? b : a + b);
    }
    if (mm.kind === 'vtx') return D(-mm.h - mm.k);
    // dua titik garis diputar 90°: (0,0) dan (1, m) → (−m, 1)
    return F(1, -mm.m);
  },
);

const compTrans = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['order', 'mc', 'vtx']);
    if (kind === 'order') {
      const k = pick(rnd, [2, 3, 4]);
      const c = nz(rnd, -4, 5);
      const x0 = ri(rnd, -3, 3);
      const first = rnd() < 0.5 ? 'dil' : 'tr';
      const f = x0 * x0;
      const v = first === 'dil' ? k * f + c : k * (f + c);
      const w = first === 'dil' ? k * (f + c) : k * f + c;
      const dTxt = L(lang, `didilatasi tegak dengan faktor ${k}`, `stretched vertically by factor ${k}`);
      const tTxt = c > 0 ? L(lang, `digeser ${c} satuan ke atas`, `shifted ${c} units up`) : L(lang, `digeser ${-c} satuan ke bawah`, `shifted ${-c} units down`);
      return NUM(
        L(lang, `f(x) = x² ${first === 'dil' ? dTxt : tTxt}, lalu ${first === 'dil' ? tTxt : dTxt}, menjadi g(x). Nilai g(${mi(x0)}) adalah …`, `f(x) = x² is ${first === 'dil' ? dTxt : tTxt}, then ${first === 'dil' ? tTxt : dTxt}, giving g(x). Find g(${mi(x0)}).`),
        D(v),
        WR(D(v), [
          [w, L(lang, 'Urutannya terbalik. Transformasi pertama dikerjakan lebih dulu.', 'The order is reversed. Apply the first transformation first.')],
          [f + c, L(lang, `Dilatasi faktor ${k} belum dipakai.`, `The stretch by ${k} has not been applied.`)],
        ]),
        [first === 'dil' ? `g(x) = ${k}x²${plus(c)}` : `g(x) = ${k}(x²${plus(c)})`, `g(${mi(x0)}) = ${mi(v)}`],
        { kind, k, c, x0, first },
      );
    }
    if (kind === 'vtx') {
      const a = pick(rnd, [2, 3, -2, -1, 4]);
      const h = nz(rnd, -6, 6);
      const k = nz(rnd, -6, 6);
      return NUM(
        L(lang, `Puncak grafik y = ${a === -1 ? '−' : mi(a)}${xm(h)}²${plus(k)} adalah (a, b). Nilai a + b adalah …`, `The vertex of y = ${a === -1 ? '−' : mi(a)}${xm(h)}²${plus(k)} is (a, b). Find a + b.`),
        D(h + k),
        WR(D(h + k), [
          [-h + k, L(lang, '(x − h)² berpuncak di x = h. Tanda di dalam kurung dibalik.', '(x − h)² has its vertex at x = h. Flip the sign inside the bracket.')],
          [h + a * k, L(lang, 'Dilatasi tegak tidak mengubah puncak jika suku tetap ditambah setelahnya.', 'The stretch does not change the vertex when the constant is added afterwards.')],
        ]),
        [L(lang, `Puncak (${mi(h)}, ${mi(k)})`, `Vertex (${mi(h)}, ${mi(k)})`), `a + b = ${mi(h + k)}`],
        { kind, h, k },
      );
    }
    const h = nz(rnd, -5, 5);
    const ref = rnd() < 0.5 ? 'x' : 'k';
    const dirTxt = h > 0 ? L(lang, `${h} satuan ke kanan`, `${h} units right`) : L(lang, `${-h} satuan ke kiri`, `${-h} units left`);
    if (ref === 'x') {
      const okT = `y = −${xm(h)}²`;
      return OPT(
        L(lang, `Grafik y = x² digeser ${dirTxt}, lalu dicerminkan terhadap sumbu x. Persamaan akhirnya adalah …`, `The graph of y = x² is shifted ${dirTxt}, then reflected in the x-axis. The final equation is …`),
        okT,
        [
          [`y = −${xm(-h)}²`, L(lang, 'Arah pergeserannya terbalik.', 'The direction of the shift is reversed.')],
          [`y = ${xm(-h).replace('x', '−x')}²`, L(lang, 'Itu cermin terhadap sumbu y.', 'That is the reflection in the y-axis.')],
          [`y = −x²${plus(h)}`, L(lang, 'Pergeseran mendatar ada di dalam kuadrat.', 'A horizontal shift goes inside the square.')],
        ],
        [`y = ${xm(h)}²`, L(lang, `Cermin sumbu x: ${okT}`, `Reflect in the x-axis: ${okT}`)],
        { kind, h, ref },
      );
    }
    const okT = L(lang, `geser ${Math.abs(h)} ke ${h > 0 ? 'kanan' : 'kiri'}, lalu cermin terhadap sumbu x`, `shift ${Math.abs(h)} ${h > 0 ? 'right' : 'left'}, then reflect in the x-axis`);
    return OPT(
      L(lang, `Grafik y = −${xm(h)}² dapat diperoleh dari y = x² dengan cara …`, `The graph y = −${xm(h)}² can be obtained from y = x² by …`),
      okT,
      [
        [L(lang, `geser ${Math.abs(h)} ke ${h > 0 ? 'kiri' : 'kanan'}, lalu cermin terhadap sumbu x`, `shift ${Math.abs(h)} ${h > 0 ? 'left' : 'right'}, then reflect in the x-axis`), L(lang, `${xm(h)} berarti geser ke ${h > 0 ? 'kanan' : 'kiri'}.`, `${xm(h)} means a shift ${h > 0 ? 'right' : 'left'}.`)],
        [L(lang, `geser ${Math.abs(h)} ke ${h > 0 ? 'kanan' : 'kiri'}, lalu cermin terhadap sumbu y`, `shift ${Math.abs(h)} ${h > 0 ? 'right' : 'left'}, then reflect in the y-axis`), L(lang, 'Tanda minus di depan berarti cermin sumbu x.', 'A minus in front means reflection in the x-axis.')],
        [L(lang, `geser ${Math.abs(h)} ke bawah, lalu cermin terhadap sumbu x`, `shift ${Math.abs(h)} down, then reflect in the x-axis`), L(lang, 'Pergeseran di dalam kurung adalah pergeseran mendatar.', 'A shift inside the bracket is horizontal.')],
      ],
      [L(lang, `${xm(h)}²: geser ${Math.abs(h)} ke ${h > 0 ? 'kanan' : 'kiri'}`, `${xm(h)}²: shift ${Math.abs(h)} ${h > 0 ? 'right' : 'left'}`), L(lang, 'Tanda minus di depan: cermin terhadap sumbu x', 'Minus in front: reflect in the x-axis')],
      { kind, h, ref },
    );
  },
  (m, lang) => {
    if (m.kind === 'order') {
      const f = m.x0 * m.x0;
      return D(m.first === 'dil' ? m.k * f + m.c : m.k * (f + m.c));
    }
    if (m.kind === 'vtx') return D(m.h + m.k);
    if (m.ref === 'x') return `y = −${xm(m.h)}²`;
    return L(lang, `geser ${Math.abs(m.h)} ke ${m.h > 0 ? 'kanan' : 'kiri'}, lalu cermin terhadap sumbu x`, `shift ${Math.abs(m.h)} ${m.h > 0 ? 'right' : 'left'}, then reflect in the x-axis`);
  },
);

// ================= Bab 2: Radian, busur, juring, tembereng =================
const piFrac = (p, q) => {
  const g = gcd(p, q);
  p /= g;
  q /= g;
  const top = p === 1 ? 'π' : `${p}π`;
  return q === 1 ? top : `${top}/${q}`;
};
const DEGS = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360, 36, 72, 20, 18];
const radian = G(
  (rnd, lang) => {
    const d = pick(rnd, DEGS);
    if (rnd() < 0.5) {
      const okT = piFrac(d, 180);
      const g = gcd(d, 180);
      return OPT(
        L(lang, `Sudut ${d}° jika dinyatakan dalam radian adalah …`, `The angle ${d}° in radians is …`),
        okT,
        [
          [piFrac(180, d), L(lang, 'Pecahannya terbalik: radian = derajat × π/180.', 'The fraction is upside down: radians = degrees × π/180.')],
          [piFrac(d, 360), L(lang, 'π radian = 180°, bukan 360°.', 'π radians = 180°, not 360°.')],
          [`${d}π`, L(lang, 'Kalikan dengan π/180, bukan π.', 'Multiply by π/180, not by π.')],
          [piFrac(d, 90), L(lang, 'π radian = 180°, bukan 90°.', 'π radians = 180°, not 90°.')],
        ],
        [`${d}° × π/180 = ${okT}`],
        { kind: 'd2r', d },
      );
    }
    const p = d / gcd(d, 180);
    const q = 180 / gcd(d, 180);
    return NUM(
      L(lang, `Sudut ${piFrac(d, 180)} radian sama dengan … derajat.`, `The angle ${piFrac(d, 180)} radians equals … degrees.`),
      D(d),
      WR(D(d), [
        [(p * 360) / q, L(lang, 'π radian = 180°, bukan 360°.', 'π radians = 180°, not 360°.')],
        [Number.isInteger((q * 180) / p) ? (q * 180) / p : null, L(lang, 'Pecahannya terbalik.', 'The fraction is upside down.')],
        [Number.isInteger((p / q) * 3.14 * 100) ? null : null, ''],
      ].filter((w) => w[1])),
      [L(lang, 'Ganti π dengan 180°.', 'Replace π with 180°.'), `${p === 1 ? '' : p + ' × '}180° ÷ ${q} = ${d}°`],
      { kind: 'r2d', p, q },
    );
  },
  (m) => (m.kind === 'd2r' ? piFrac(m.d, 180) : D((m.p * 180) / m.q)),
);

const arcSector = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['s', 'L', 'th_s', 'th_L']);
    const r = ri(rnd, 2, 12);
    const th = ri(rnd, 1, 4) / (rnd() < 0.3 ? 2 : 1);
    const s = r * th;
    const A = (r * r * th) / 2;
    if (kind === 's')
      return NUM(
        L(lang, `Lingkaran berjari-jari ${r} cm. Panjang busur dengan sudut pusat ${M(lang, th)} radian adalah … cm.`, `A circle has radius ${r} cm. The arc length for a central angle of ${M(lang, th)} radian${th === 1 ? '' : 's'} is … cm.`),
        D(s),
        WR(D(s), [
          [A, L(lang, 'Itu luas juring. Panjang busur = r × θ.', 'That is the sector area. Arc length = r × θ.')],
          [2 * Math.PI * r * th / 360 > 0 ? Math.round(((2 * 3.14 * r * th) / 360) * 100) / 100 : null, L(lang, 'Sudutnya sudah dalam radian, tidak perlu dibagi 360°.', 'The angle is already in radians; do not divide by 360°.')],
        ]),
        [L(lang, 's = r × θ', 's = r × θ'), `= ${r} × ${M(lang, th)} = ${M(lang, s)}`],
        { kind, r, th },
      );
    if (kind === 'L')
      return NUM(
        L(lang, `Luas juring dengan jari-jari ${r} cm dan sudut pusat ${M(lang, th)} radian adalah … cm².`, `The area of a sector with radius ${r} cm and central angle ${M(lang, th)} radian${th === 1 ? '' : 's'} is … cm².`),
        D(A),
        WR(D(A), [
          [r * r * th, L(lang, 'Rumusnya ½ r² θ. Jangan lupa ½.', 'The formula is ½ r² θ. Remember the ½.')],
          [s, L(lang, 'Itu panjang busur.', 'That is the arc length.')],
        ]),
        [L(lang, 'L = ½ r² θ', 'A = ½ r² θ'), `= ½ × ${r * r} × ${M(lang, th)} = ${M(lang, A)}`],
        { kind, r, th },
      );
    if (kind === 'th_s')
      return NUM(
        L(lang, `Busur sepanjang ${M(lang, s)} cm terletak pada lingkaran berjari-jari ${r} cm. Besar sudut pusatnya … radian.`, `An arc of length ${M(lang, s)} cm lies on a circle of radius ${r} cm. The central angle is … radians.`),
        D(th),
        WR(D(th), [
          [s * r, L(lang, 'θ = s ÷ r, bagi, bukan kali.', 'θ = s ÷ r: divide, do not multiply.')],
          [r / s, L(lang, 'Pecahannya terbalik.', 'The fraction is upside down.')],
        ]),
        [`θ = s ÷ r = ${M(lang, s)} ÷ ${r}`, `= ${M(lang, th)}`],
        { kind, r, s },
      );
    return NUM(
      L(lang, `Juring berjari-jari ${r} cm memiliki luas ${M(lang, A)} cm². Besar sudut pusatnya … radian.`, `A sector of radius ${r} cm has area ${M(lang, A)} cm². Its central angle is … radians.`),
      D(th),
      WR(D(th), [
        [A / (r * r), L(lang, 'θ = 2L ÷ r². Jangan lupa dikali 2.', 'θ = 2A ÷ r². Remember to multiply by 2.')],
        [(2 * A) / r, L(lang, 'Bagi dengan r², bukan r.', 'Divide by r², not r.')],
      ]),
      [`${M(lang, A)} = ½ × ${r}² × θ`, `θ = ${M(lang, 2 * A)} ÷ ${r * r} = ${M(lang, th)}`],
      { kind, r, A },
    );
  },
  (m) => {
    if (m.kind === 's') return D(m.r * m.th);
    if (m.kind === 'L') return D(0.5 * m.r * m.r * m.th);
    if (m.kind === 'th_s') return D(m.s / m.r);
    return D((2 * m.A) / (m.r * m.r));
  },
);

const arcPi = G(
  (rnd, lang) => {
    const q = pick(rnd, [2, 3, 4, 6, 12]);
    const p = pick(rnd, [1, 1, 2, 3, 5].filter((v) => gcd(v, q) === 1 && v < 2 * q));
    const r = q * ri(rnd, 1, 4);
    const sCoef = (r * p) / q;
    const okT = `${sCoef === 1 ? '' : M(lang, sCoef)}π cm`;
    return OPT(
      L(lang, `Panjang busur dengan jari-jari ${r} cm dan sudut pusat ${piFrac(p, q)} radian adalah …`, `The arc length with radius ${r} cm and central angle ${piFrac(p, q)} radians is …`),
      okT,
      [
        [`${M(lang, r * p)}π cm`, L(lang, `Jangan lupa membagi dengan ${q}.`, `Remember to divide by ${q}.`)],
        [`${M(lang, (r * r * p) / q / 2)}π cm`, L(lang, 'Itu angka luas juring (½ r² θ).', 'That number is the sector area (½ r² θ).')],
        [`${sCoef === 1 ? '' : M(lang, sCoef)}π cm²`, L(lang, 'Panjang busur bersatuan cm, bukan cm².', 'Arc length is in cm, not cm².')],
        [`${M(lang, (r * q) / p)}π cm`, L(lang, 'Kalikan r dengan θ, jangan dibagi.', 'Multiply r by θ; do not divide.')],
      ],
      [`s = r θ = ${r} × ${piFrac(p, q)}`, `= ${okT}`],
      { r, p, q },
    );
  },
  (m, lang) => {
    const c = (m.r * m.p) / m.q;
    return `${c === 1 ? '' : M(lang, c)}π cm`;
  },
);

const segment = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['tri', 'seg', 'chord']);
    if (kind === 'tri') {
      const a = pick(rnd, [90, 30, 150]);
      const r = ri(rnd, 1, 8) * 2;
      const ans = (r * r * (a === 90 ? 1 : 0.5)) / 2;
      return NUM(
        L(lang, `Juring OAB berjari-jari ${r} cm dengan sudut pusat ${a}°. Luas segitiga OAB adalah … cm².`, `Sector OAB has radius ${r} cm and central angle ${a}°. The area of triangle OAB is … cm².`),
        D(ans),
        WR(D(ans), [
          [r * r * (a === 90 ? 1 : 0.5), L(lang, 'Luas segitiga = ½ r² sin θ. Jangan lupa ½.', 'Triangle area = ½ r² sin θ. Remember the ½.')],
          [a === 90 ? null : (r * r) / 2, L(lang, `sin ${a}° = ½, bukan 1.`, `sin ${a}° = ½, not 1.`)],
        ]),
        [L(lang, `Luas = ½ × r × r × sin ${a}°`, `Area = ½ × r × r × sin ${a}°`), `= ½ × ${r} × ${r} × ${a === 90 ? '1' : '½'} = ${M(lang, ans)}`],
        { kind, r, a },
      );
    }
    if (kind === 'seg') {
      const r = ri(rnd, 1, 6) * 2;
      const a = (r * r) / 4;
      const b = (r * r) / 2;
      const ask = pick(rnd, ['a + b', 'a', 'b']);
      const ans = { 'a + b': a + b, a, b }[ask];
      return NUM(
        L(lang, `Luas tembereng dengan jari-jari ${r} cm dan sudut pusat 90° dapat ditulis aπ − b. Nilai ${ask} adalah …`, `The area of the segment with radius ${r} cm and central angle 90° can be written aπ − b. Find ${ask}.`),
        D(ans),
        WR(D(ans), [
          [ask === 'a + b' ? r * r + b : ask === 'a' ? r * r : null, L(lang, 'Juring 90° adalah seperempat lingkaran: ¼ π r².', 'A 90° sector is a quarter circle: ¼ π r².')],
          [ask === 'a + b' ? a + r * r : ask === 'b' ? r * r : null, L(lang, 'Luas segitiga = ½ × r × r.', 'Triangle area = ½ × r × r.')],
          [ask === 'a + b' ? a - b : null, L(lang, 'Yang ditanya a + b, bukan a − b.', 'The question asks for a + b, not a − b.')],
        ]),
        [L(lang, `Juring: ¼ × π × ${r * r} = ${a === 1 ? '' : a}π. Segitiga: ½ × ${r} × ${r} = ${b}.`, `Sector: ¼ × π × ${r * r} = ${a === 1 ? '' : a}π. Triangle: ½ × ${r} × ${r} = ${b}.`), `${L(lang, 'Tembereng', 'Segment')} = ${a === 1 ? '' : a}π − ${b} → ${ask} = ${ans}`],
        { kind, r, ask },
      );
    }
    const a = pick(rnd, [60, 90, 120, 180]);
    const r = ri(rnd, 2, 12);
    const fmt = (k, rt) => `${k === 1 && rt ? '' : k}${rt ? `√${rt}` : ''} cm`;
    const okT = { 60: fmt(r, 0), 90: fmt(r, 2), 120: fmt(r, 3), 180: fmt(2 * r, 0) }[a];
    return OPT(
      L(lang, `Lingkaran berjari-jari ${r} cm. Panjang tali busur di depan sudut pusat ${a}° adalah …`, `A circle has radius ${r} cm. The chord opposite a central angle of ${a}° is …`),
      okT,
      [
        [fmt(r, 0), L(lang, 'Itu hanya benar untuk 60° (segitiga sama sisi).', 'That is only right for 60° (an equilateral triangle).')],
        [fmt(r, 2), L(lang, 'Itu untuk sudut 90° (segitiga siku-siku sama kaki).', 'That is for 90° (a right isosceles triangle).')],
        [fmt(r, 3), L(lang, 'Itu untuk sudut 120°.', 'That is for 120°.')],
        [fmt(2 * r, 0), L(lang, 'Itu diameter (sudut 180°).', 'That is the diameter (180°).')],
        [fmt(r / 2, 0), L(lang, 'Tali busur tidak lebih pendek dari setengah jari-jari untuk sudut ini.', 'The chord is not that short for this angle.')],
      ],
      [L(lang, 'Tali busur = 2r sin(θ/2)', 'Chord = 2r sin(θ/2)'), `= 2 × ${r} × sin ${a / 2}° = ${okT}`],
      { kind, r, a },
    );
  },
  (m) => {
    if (m.kind === 'tri') return D(0.5 * m.r * m.r * Math.round(Math.sin((m.a * Math.PI) / 180) * 1e6) / 1e6);
    if (m.kind === 'seg') {
      const a = (Math.PI * m.r * m.r) / 4 / Math.PI;
      const b = (m.r * m.r) / 2;
      return D({ 'a + b': a + b, a, b }[m.ask]);
    }
    const len = 2 * m.r * Math.sin((m.a * Math.PI) / 360);
    for (const rt of [0, 2, 3]) {
      const k = rt ? len / Math.sqrt(rt) : len;
      if (Math.abs(k - Math.round(k)) < 1e-9) return `${Math.round(k) === 1 && rt ? '' : Math.round(k)}${rt ? `√${rt}` : ''} cm`;
    }
  },
);

const SEG_POOL = [
  ['Tembereng adalah daerah yang dibatasi oleh …', 'A segment of a circle is the region bounded by …', 'busur dan tali busur', 'an arc and a chord', [['dua jari-jari dan busur', 'two radii and an arc', 'Itu juring.', 'That is a sector.'], ['dua jari-jari dan tali busur', 'two radii and a chord', 'Itu segitiga.', 'That is a triangle.'], ['dua tali busur', 'two chords', 'Tembereng dibatasi satu busur.', 'A segment is bounded by one arc.']]],
  ['Rumus luas tembereng dengan sudut pusat θ (radian) dan jari-jari r adalah …', 'The area of a segment with central angle θ (radians) and radius r is …', '½ r² (θ − sin θ)', '½ r² (θ − sin θ)', [['½ r² (θ + sin θ)', '½ r² (θ + sin θ)', 'Luas segitiga dikurangkan dari juring.', 'The triangle is subtracted from the sector.'], ['r (θ − sin θ)', 'r (θ − sin θ)', 'Luas memakai r², bukan r.', 'Area uses r², not r.'], ['½ r² θ', '½ r² θ', 'Itu luas juring saja.', 'That is only the sector.']]],
  ['Juring adalah daerah yang dibatasi oleh …', 'A sector is the region bounded by …', 'dua jari-jari dan busur', 'two radii and an arc', [['busur dan tali busur', 'an arc and a chord', 'Itu tembereng.', 'That is a segment.'], ['dua tali busur', 'two chords', 'Juring memakai jari-jari.', 'A sector uses radii.'], ['diameter dan tali busur', 'a diameter and a chord', 'Juring memakai dua jari-jari.', 'A sector uses two radii.']]],
  ['Luas tembereng sama dengan …', 'The area of a segment equals …', 'luas juring − luas segitiga', 'sector area − triangle area', [['luas juring + luas segitiga', 'sector area + triangle area', 'Segitiga ada di dalam juring, jadi dikurangkan.', 'The triangle is inside the sector, so subtract it.'], ['luas lingkaran − luas juring', 'circle area − sector area', 'Itu luas juring besar.', 'That is the major sector.'], ['luas segitiga − luas juring', 'triangle area − sector area', 'Hasilnya negatif; urutannya terbalik.', 'That is negative; the order is reversed.']]],
  ['Satu radian adalah sudut pusat yang …', 'One radian is the central angle that …', 'busurnya sama panjang dengan jari-jari', 'cuts off an arc equal to the radius', [['busurnya sama dengan diameter', 'cuts off an arc equal to the diameter', 'Busurnya sama dengan jari-jari, bukan diameter.', 'The arc equals the radius, not the diameter.'], ['besarnya 1°', 'measures 1°', '1 radian ≈ 57°.', '1 radian ≈ 57°.'], ['besarnya 180°', 'measures 180°', 'Itu π radian.', 'That is π radians.']]],
  ['Besar sudut 1 radian kira-kira …', 'One radian is about …', '57°', '57°', [['1°', '1°', '1 radian jauh lebih besar dari 1°.', 'One radian is much bigger than 1°.'], ['180°', '180°', 'Itu π radian.', 'That is π radians.'], ['3,14°', '3.14°', '3,14 adalah π, bukan derajat.', '3.14 is π, not degrees.']]],
  ['Satu putaran penuh sama dengan …', 'One full turn equals …', '2π radian', '2π radians', [['π radian', 'π radians', 'π radian = 180°, setengah putaran.', 'π radians = 180°, half a turn.'], ['360 radian', '360 radians', '360 adalah derajat.', '360 is in degrees.'], ['1 radian', '1 radian', '1 radian ≈ 57°.', '1 radian ≈ 57°.']]],
  ['Jika sudut pusat dijadikan dua kali lipat (jari-jari tetap), luas tembereng …', 'If the central angle is doubled (same radius), the segment area …', 'berubah, tetapi belum tentu dua kali lipat', 'changes, but not necessarily doubles', [['pasti dua kali lipat', 'always doubles', 'Luas segitiga tidak ikut dua kali lipat (sin 2θ ≠ 2 sin θ).', 'The triangle does not double too (sin 2θ ≠ 2 sin θ).'], ['tetap', 'stays the same', 'Busurnya lebih panjang, jadi luasnya berubah.', 'The arc is longer, so the area changes.'], ['menjadi empat kali lipat', 'becomes four times as big', 'Empat kali terjadi jika jari-jari yang dua kali lipat.', 'Four times happens when the radius doubles.']]],
  ['Jika jari-jari dijadikan dua kali lipat (sudut tetap), luas tembereng menjadi …', 'If the radius is doubled (same angle), the segment area becomes …', '4 kali semula', '4 times as big', [['2 kali semula', '2 times as big', 'Luas sebanding dengan r².', 'Area is proportional to r².'], ['tetap', 'the same', 'Jari-jari yang lebih besar memperbesar luas.', 'A bigger radius makes a bigger area.'], ['8 kali semula', '8 times as big', 'Itu untuk volume, bukan luas.', 'That would be volume, not area.']]],
  ['Tembereng dengan sudut pusat 180° adalah …', 'A segment with central angle 180° is …', 'setengah lingkaran', 'a semicircle', [['seperempat lingkaran', 'a quarter circle', 'Itu juring 90°.', 'That is a 90° sector.'], ['segitiga', 'a triangle', 'Tali busurnya diameter; luas segitiganya 0.', 'Its chord is a diameter; the triangle has zero area.'], ['tidak ada', 'impossible', 'Tembereng 180° ada, yaitu setengah lingkaran.', 'It exists: a semicircle.']]],
];
const segPool = G(
  (rnd, lang) => {
    const i = ri(rnd, 0, SEG_POOL.length - 1);
    const [qi, qe, ai, ae, ds] = SEG_POOL[i];
    return OPT(L(lang, qi, qe), L(lang, ai, ae), ds.map((d) => [L(lang, d[0], d[1]), L(lang, d[2], d[3])]), [L(lang, 'Juring: dua jari-jari + busur. Tembereng: busur + tali busur = juring − segitiga.', 'Sector: two radii + arc. Segment: arc + chord = sector − triangle.'), L(lang, ai, ae)], { i });
  },
  (m, lang) => L(lang, SEG_POOL[m.i][2], SEG_POOL[m.i][3]),
);

// ================= Bab 3: Kombinatorik =================
const countBrute = (digits, len, distinct, ok) => {
  let c = 0;
  const go = (s) => {
    if (s.length === len) return void (ok(s) && c++);
    for (const d of digits) if (!distinct || !s.includes(d)) go([...s, d]);
  };
  go([]);
  return c;
};
const fillPlaces = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['zero', 'odd', 'sum', 'code']);
    if (kind === 'zero') {
      const k = ri(rnd, 3, 6);
      const len = ri(rnd, 2, 3);
      const rep = rnd() < 0.4;
      const n = k + 1;
      const ans = rep ? k * n ** (len - 1) : k * P(k, len - 1);
      return NUM(
        L(lang, `Dari angka ${Array.from({ length: n }, (_, i) => i).join(', ')} dibuat bilangan ${len} angka${rep ? '. Angka boleh berulang' : ' dengan angka berbeda'}. Banyak bilangan yang dapat dibuat adalah …`, `Using the digits ${Array.from({ length: n }, (_, i) => i).join(', ')}, ${len}-digit numbers are formed${rep ? ' (digits may repeat)' : ' with different digits'}. How many such numbers are there?`),
        D(ans),
        WR(D(ans), [
          [rep ? n ** len : P(n, len), L(lang, 'Angka 0 tidak boleh di depan, jadi tempat pertama hanya punya ' + k + ' pilihan.', 'A number cannot start with 0, so the first place has only ' + k + ' choices.')],
          [rep ? null : k * P(k, len - 1) - P(k - 1, len - 1), L(lang, 'Setelah tempat pertama diisi, angka 0 boleh dipakai di tempat lain.', 'After the first place, 0 may be used elsewhere.')],
        ]),
        [L(lang, `Tempat pertama: ${k} pilihan (tanpa 0).`, `First place: ${k} choices (no 0).`), rep ? `${k} × ${Array(len - 1).fill(n).join(' × ')} = ${ans}` : `${k} × ${Array.from({ length: len - 1 }, (_, i) => k - i).join(' × ')} = ${ans}`],
        { kind, n, len, rep },
      );
    }
    if (kind === 'odd') {
      const m = ri(rnd, 4, 7);
      const even = rnd() < 0.4;
      const ds = Array.from({ length: m }, (_, i) => i + 1);
      const e = ds.filter((d) => (even ? d % 2 === 0 : d % 2 === 1)).length;
      const ans = e * (m - 1) * (m - 2);
      return NUM(
        L(lang, `Dari angka ${ds.join(', ')} dibuat bilangan tiga angka berbeda yang ${even ? 'genap' : 'ganjil'}. Banyak bilangan itu adalah …`, `Using ${ds.join(', ')}, three-digit ${even ? 'even' : 'odd'} numbers with different digits are formed. How many are there?`),
        D(ans),
        WR(D(ans), [
          [m * (m - 1) * (m - 2), L(lang, `Syarat ${even ? 'genap' : 'ganjil'} belum dipakai. Isi tempat satuan lebih dulu.`, `The ${even ? 'even' : 'odd'} condition was not used. Fill the units place first.`)],
          [e * m * m, L(lang, 'Angkanya harus berbeda.', 'The digits must be different.')],
          [e * (m - 1) * (m - 1), L(lang, 'Setelah dua angka dipakai, sisa pilihan berkurang lagi.', 'After two digits are used, the choices drop again.')],
        ]),
        [L(lang, `Satuan: ${e} pilihan (${even ? 'genap' : 'ganjil'}). Ratusan: ${m - 1}. Puluhan: ${m - 2}.`, `Units: ${e} choices (${even ? 'even' : 'odd'}). Hundreds: ${m - 1}. Tens: ${m - 2}.`), `${e} × ${m - 1} × ${m - 2} = ${ans}`],
        { kind, m, even },
      );
    }
    if (kind === 'sum') {
      const a = ri(rnd, 2, 6);
      const b = ri(rnd, 2, 5);
      const nm = pick(rnd, ['Rani', 'Dewi', 'Bima', 'Andi']);
      return NUM(
        L(lang, `Dari rumah ke perpustakaan ${nm} bisa naik salah satu dari ${a} angkot atau salah satu dari ${b} ojek. Banyak cara ${nm} pergi adalah …`, `To get to the library, ${nm} can take one of ${a} minibuses or one of ${b} motorbike taxis. How many ways are there?`),
        D(a + b),
        WR(D(a + b), [[a * b, L(lang, 'Pilihannya "atau" (tidak dipakai bersamaan), jadi dijumlah, bukan dikali.', 'The choices are "or" (not used together), so add, do not multiply.')]]),
        [L(lang, 'Aturan penjumlahan: pilihan yang tidak terjadi bersamaan dijumlah.', 'Addition rule: options that cannot happen together are added.'), `${a} + ${b} = ${a + b}`],
        { kind, a, b },
      );
    }
    const v = ri(rnd, 1, 3);
    const d = ri(rnd, 1, 3);
    const ans = 5 ** v * 10 ** d;
    return NUM(
      L(lang, `Kode loker terdiri dari ${v} huruf vokal (A, I, U, E, O) diikuti ${d} angka (0–9). Huruf dan angka boleh berulang. Banyak kode yang mungkin adalah …`, `A locker code is ${v} vowel${v > 1 ? 's' : ''} (A, I, U, E, O) followed by ${d} digit${d > 1 ? 's' : ''} (0–9). Repeats are allowed. How many codes are possible?`),
      D(ans),
      WR(D(ans), [
        [5 * v + 10 * d, L(lang, 'Setiap tempat dipasangkan dengan semua pilihan tempat lain, jadi dikalikan.', 'Each place pairs with every choice of the others, so multiply.')],
        [v + d > 2 ? P(5, Math.min(v, 5)) * P(10, d) : null, L(lang, 'Boleh berulang, jadi pilihan tidak berkurang.', 'Repeats are allowed, so choices do not decrease.')],
      ]),
      [`${[...Array(v).fill(5), ...Array(d).fill(10)].join(' × ')} = ${ans}`],
      { kind, v, d },
    );
  },
  (m) => {
    if (m.kind === 'zero') {
      const ds = Array.from({ length: m.n }, (_, i) => i);
      return D(countBrute(ds, m.len, !m.rep, (s) => s[0] !== 0));
    }
    if (m.kind === 'odd') {
      const ds = Array.from({ length: m.m }, (_, i) => i + 1);
      return D(countBrute(ds, 3, true, (s) => s[2] % 2 === (m.even ? 0 : 1)));
    }
    if (m.kind === 'sum') return D(m.a + m.b);
    return D(Math.pow(5, m.v) * Math.pow(10, m.d));
  },
);

const cyclic = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['table', 'table', 'bead', 'pair']);
    const n = ri(rnd, 4, 8);
    if (kind === 'table')
      return NUM(
        L(lang, `${n} orang duduk mengelilingi meja bundar. Banyak susunan duduk yang berbeda adalah …`, `${n} people sit around a round table. How many different seating arrangements are there?`),
        D(fact(n - 1)),
        WR(D(fact(n - 1)), [
          [fact(n), L(lang, `Pada susunan melingkar, putaran yang sama dihitung satu. Pakai (n − 1)!.`, `In a circle, rotations count as the same. Use (n − 1)!.`)],
          [fact(n - 1) / 2, L(lang, 'Dibagi 2 hanya untuk kalung/gelang yang bisa dibalik.', 'Divide by 2 only for necklaces/bracelets that can be flipped.')],
        ]),
        [`(${n} − 1)! = ${n - 1}!`, `= ${fact(n - 1)}`],
        { kind, n },
      );
    if (kind === 'bead')
      return NUM(
        L(lang, `${n} manik-manik berbeda warna dirangkai menjadi gelang. Banyak gelang berbeda yang dapat dibuat adalah …`, `${n} beads of different colours are made into a bracelet. How many different bracelets can be made?`),
        D(fact(n - 1) / 2),
        WR(D(fact(n - 1) / 2), [
          [fact(n - 1), L(lang, 'Gelang bisa dibalik, jadi setiap susunan terhitung dua kali. Bagi 2.', 'A bracelet can be flipped, so each arrangement is counted twice. Divide by 2.')],
          [fact(n) / 2, L(lang, 'Susunan melingkar memakai (n − 1)!.', 'A circular arrangement uses (n − 1)!.')],
        ]),
        [`(${n} − 1)! ÷ 2 = ${fact(n - 1)} ÷ 2`, `= ${fact(n - 1) / 2}`],
        { kind, n },
      );
    const [a, b] = pick(rnd, [
      ['Ana', 'Budi'],
      ['Sinta', 'Raka'],
      ['Dimas', 'Fajar'],
    ]);
    const ans = 2 * fact(n - 2);
    return NUM(
      L(lang, `${n} orang duduk mengelilingi meja bundar. ${a} dan ${b} harus duduk berdampingan. Banyak susunannya adalah …`, `${n} people sit around a round table. ${a} and ${b} must sit next to each other. How many arrangements are there?`),
      D(ans),
      WR(D(ans), [
        [fact(n - 2), L(lang, `${a} dan ${b} bisa bertukar tempat: kalikan 2.`, `${a} and ${b} can swap seats: multiply by 2.`)],
        [2 * fact(n - 1), L(lang, `${a} dan ${b} dianggap satu, jadi ada ${n - 1} unit melingkar: (${n - 1} − 1)!.`, `Treat ${a} and ${b} as one unit, so ${n - 1} units in a circle: (${n - 1} − 1)!.`)],
        [fact(n - 1), L(lang, 'Itu tanpa syarat berdampingan.', 'That ignores the condition.')],
      ]),
      [L(lang, `Gabungkan ${a}–${b} menjadi satu unit: ${n - 1} unit melingkar → (${n - 2})! = ${fact(n - 2)}`, `Join ${a}–${b} into one unit: ${n - 1} units in a circle → (${n - 2})! = ${fact(n - 2)}`), L(lang, `Keduanya bisa bertukar: × 2 = ${ans}`, `They can swap: × 2 = ${ans}`)],
      { kind, n },
    );
  },
  (m) => {
    // hitung susunan melingkar dengan menetapkan orang pertama
    const n = m.n;
    const rest = Array.from({ length: n - 1 }, (_, i) => i + 1);
    let c = 0;
    const go = (arr, left) => {
      if (!left.length) {
        const seat = [0, ...arr];
        if (m.kind === 'pair') {
          const i = seat.indexOf(0);
          const j = seat.indexOf(1);
          if (Math.abs(i - j) === 1 || Math.abs(i - j) === n - 1) c++;
        } else c++;
        return;
      }
      left.forEach((v, i) => go([...arr, v], [...left.slice(0, i), ...left.slice(i + 1)]));
    };
    go([], rest);
    return D(m.kind === 'bead' ? c / 2 : c);
  },
);

const binom = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['coef', 'coef', 'const', 'sum', 'pascal']);
    const n = ri(rnd, 3, 6);
    const a = pick(rnd, [1, 2, 3, -1, -2]);
    const base = `${xm(-a)}${sup(n)}`;
    if (kind === 'pascal') {
      const k = ri(rnd, 1, n - 1);
      const row = Array.from({ length: n }, (_, i) => C(n - 1, i)).join(', ');
      const ans = C(n, k);
      return NUM(
        L(lang, `Baris segitiga Pascal ${row}. Pada baris berikutnya, angka ke-${k + 1} adalah …`, `A row of Pascal's triangle is ${row}. In the next row, number ${k + 1} is …`),
        D(ans),
        WR(D(ans), [
          [C(n - 1, k), L(lang, 'Itu angka pada baris yang sama. Baris berikutnya: jumlahkan dua angka di atasnya.', 'That is from the same row. The next row adds the two numbers above.')],
          [C(n - 1, k - 1) * C(n - 1, k), L(lang, 'Dua angka di atasnya dijumlah, bukan dikali.', 'Add the two numbers above; do not multiply.')],
        ]),
        [L(lang, `Angka ke-${k + 1} = ${C(n - 1, k - 1)} + ${C(n - 1, k)}`, `Number ${k + 1} = ${C(n - 1, k - 1)} + ${C(n - 1, k)}`), `= ${ans}`],
        { kind, n, k },
      );
    }
    if (kind === 'sum')
      return NUM(
        L(lang, `Jumlah semua koefisien pada penjabaran ${base} adalah …`, `The sum of all coefficients in the expansion of ${base} is …`),
        D((1 + a) ** n),
        WR(D((1 + a) ** n), [
          [2 ** n, L(lang, `Itu untuk (x + 1)${sup(n)}. Substitusikan x = 1 ke ${base}.`, `That is for (x + 1)${sup(n)}. Substitute x = 1 into ${base}.`)],
          [n + 1, L(lang, 'Itu banyak suku, bukan jumlah koefisien.', 'That is the number of terms, not the sum of coefficients.')],
        ]),
        [L(lang, 'Jumlah koefisien = nilai saat x = 1', 'Sum of coefficients = value at x = 1'), `(1${plus(a)})${sup(n)} = ${mi((1 + a) ** n)}`],
        { kind, n, a },
      );
    const k = kind === 'const' ? 0 : ri(rnd, 1, n - 1);
    const ans = C(n, k) * a ** (n - k);
    return NUM(
      kind === 'const' ? L(lang, `Suku konstanta (tanpa x) pada penjabaran ${base} adalah …`, `The constant term in the expansion of ${base} is …`) : L(lang, `Koefisien x${k === 1 ? '' : sup(k)} pada penjabaran ${base} adalah …`, `The coefficient of x${k === 1 ? '' : sup(k)} in the expansion of ${base} is …`),
      D(ans),
      WR(D(ans), [
        [a !== 1 ? C(n, k) : null, L(lang, `Jangan lupa (${mi(a)})${sup(n - k)}.`, `Remember (${mi(a)})${sup(n - k)}.`)],
        [kind === 'const' ? a * n : C(n, k) * a, L(lang, `Pangkat ${mi(a)} adalah ${n - k}.`, `The power of ${mi(a)} is ${n - k}.`)],
        [a < 0 ? -ans : null, L(lang, 'Perhatikan tanda: bilangan negatif berpangkat ganjil tetap negatif.', 'Watch the sign: a negative number to an odd power stays negative.')],
        [kind === 'const' ? null : C(n, n - k - 1 >= 0 ? k + 1 : k) * a ** (n - k - 1), L(lang, 'Koefisien binomialnya C(n, k) dengan k pangkat x.', 'The binomial coefficient is C(n, k) where k is the power of x.')],
      ]),
      [`C(${n}, ${k}) × x${sup(k)} × (${mi(a)})${sup(n - k)}`, `= ${C(n, k)} × ${mi(a ** (n - k))} = ${mi(ans)}`],
      { kind, n, a, k },
    );
  },
  (m) => {
    if (m.kind === 'pascal') {
      let row = [1];
      for (let i = 0; i < m.n; i++) row = [1, ...row.slice(1).map((v, j) => v + row[j]), 1];
      return D(row[m.k]);
    }
    // jabarkan (x + a)^n
    let cs = [1];
    for (let i = 0; i < m.n; i++) {
      const nx = Array(cs.length + 1).fill(0);
      cs.forEach((c, j) => {
        nx[j] += c; // × x (indeks = pangkat x)
        nx[j + 1] += 0;
      });
      // susun ulang: cs[j] = koefisien x^j
      const out = Array(cs.length + 1).fill(0);
      cs.forEach((c, j) => {
        out[j + 1] += c;
        out[j] += c * m.a;
      });
      cs = out;
    }
    if (m.kind === 'sum') return D(cs.reduce((s, c) => s + c, 0));
    return D(cs[m.k]);
  },
);

const probComb = G(
  (rnd, lang) => {
    const kind = pick(rnd, ['allR', 'mix', 'count']);
    const r = ri(rnd, 3, 7);
    const b = ri(rnd, 2, 6);
    const n = r + b;
    const [cr, cb, er, eb] = pick(rnd, [
      ['merah', 'biru', 'red', 'blue'],
      ['putih', 'hitam', 'white', 'black'],
      ['putra', 'putri', 'boys', 'girls'],
    ]);
    const people = cr === 'putra';
    const intro = people ? L(lang, `Dari ${r} siswa putra dan ${b} siswa putri`, `From ${r} boys and ${b} girls`) : L(lang, `Kantong berisi ${r} bola ${cr} dan ${b} bola ${cb}`, `A bag holds ${r} ${er} and ${b} ${eb} balls`);
    if (kind === 'count') {
      const k = ri(rnd, 2, Math.min(3, r));
      return NUM(
        people ? L(lang, `${intro} dipilih ${k} siswa putra. Banyak cara memilih adalah …`, `${intro}, ${k} boys are chosen. How many ways are there?`) : L(lang, `${intro}. Banyak cara mengambil ${k} bola ${cr} sekaligus adalah …`, `${intro}. How many ways are there to take ${k} ${er} balls at once?`),
        D(C(r, k)),
        WR(D(C(r, k)), [
          [P(r, k), L(lang, 'Diambil sekaligus, jadi urutan tidak penting: kombinasi.', 'Taken at once, so order does not matter: a combination.')],
          [C(n, k), L(lang, `Hanya dipilih dari yang ${cr}.`, `Choose only from the ${er} ones.`)],
        ]),
        [`C(${r}, ${k}) = ${C(r, k)}`],
        { kind, r, b, k },
      );
    }
    if (kind === 'allR') {
      const k = ri(rnd, 2, Math.min(3, r));
      const ans = F(C(r, k), C(n, k));
      return NUM(
        people ? L(lang, `${intro} dipilih ${k} orang secara acak. Peluang semuanya putra adalah … (tulis sebagai pecahan)`, `${intro}, ${k} people are chosen at random. The probability that all are boys is … (write a fraction)`) : L(lang, `${intro}. Diambil ${k} bola sekaligus. Peluang semuanya ${cr} adalah … (tulis sebagai pecahan)`, `${intro}. ${k} balls are taken at once. The probability that all are ${er} is … (write a fraction)`),
        ans,
        WR(ans, [
          [F(r ** k, n ** k), L(lang, 'Itu kalau bola dikembalikan. Diambil sekaligus berarti tanpa pengembalian.', 'That would be with replacement. Taking at once means without replacement.')],
          [F(k, n), L(lang, `Pakai kombinasi: C(${r}, ${k}) ÷ C(${n}, ${k}).`, `Use combinations: C(${r}, ${k}) ÷ C(${n}, ${k}).`)],
          [F(r, n), L(lang, 'Itu peluang satu pengambilan saja.', 'That is the probability for one draw only.')],
        ]),
        [`C(${r}, ${k}) = ${C(r, k)}, C(${n}, ${k}) = ${C(n, k)}`, `P = ${C(r, k)}/${C(n, k)} = ${ans}`],
        { kind, r, b, k },
      );
    }
    const ans = F(r * b, C(n, 2));
    return NUM(
      people ? L(lang, `${intro} dipilih 2 orang secara acak. Peluang terpilih 1 putra dan 1 putri adalah … (tulis sebagai pecahan)`, `${intro}, 2 people are chosen at random. The probability of 1 boy and 1 girl is … (write a fraction)`) : L(lang, `${intro}. Diambil 2 bola sekaligus. Peluang terambil 1 ${cr} dan 1 ${cb} adalah … (tulis sebagai pecahan)`, `${intro}. 2 balls are taken at once. The probability of 1 ${er} and 1 ${eb} is … (write a fraction)`),
      ans,
      WR(ans, [
        [F(r * b, n * n), L(lang, 'Itu dengan pengembalian dan tanpa urutan yang benar. Pakai C(n, 2).', 'That treats it like replacement. Use C(n, 2).')],
        [F(r * b, n * (n - 1)), L(lang, 'Itu hanya satu urutan (merah dulu). Diambil sekaligus: bagi dengan C(n, 2).', 'That counts one order only. Taken at once: divide by C(n, 2).')],
        [F(r + b, C(n, 2)), L(lang, 'Banyak cara memilih 1 dan 1 adalah perkalian.', 'Choosing 1 and 1 is a product.')],
      ]),
      [`C(${r}, 1) × C(${b}, 1) = ${r * b}`, `C(${n}, 2) = ${C(n, 2)}`, `P = ${r * b}/${C(n, 2)} = ${ans}`],
      { kind, r, b },
    );
  },
  (m) => {
    // hitung semua himpunan bagian
    const n = m.r + m.b;
    const k = m.kind === 'mix' ? 2 : m.k;
    let all = 0;
    let good = 0;
    for (let mask = 0; mask < 1 << n; mask++) {
      let bits = 0;
      let reds = 0;
      for (let i = 0; i < n; i++)
        if (mask & (1 << i)) {
          bits++;
          if (i < m.r) reds++;
        }
      if (bits !== k) continue;
      all++;
      if (m.kind === 'mix' ? reds === 1 : reds === k) good++;
    }
    if (m.kind === 'count') {
      let c = 0;
      for (let mask = 0; mask < 1 << m.r; mask++) {
        let bits = 0;
        for (let i = 0; i < m.r; i++) if (mask & (1 << i)) bits++;
        if (bits === m.k) c++;
      }
      return D(c);
    }
    return F(good, all);
  },
);

export const K12 = {
  'k12b1-1': [transl],
  'k12b1-2': [reflEq, reflVal],
  'k12b1-3': [dilat, dilPool],
  'k12b1-4': [rot],
  'k12b1-5': [compTrans],
  'k12b2-1': [radian],
  'k12b2-2': [arcSector, arcPi],
  'k12b2-3': [segment, segPool],
  'k12b3-1': [fillPlaces],
  'k12b3-2': [cyclic],
  'k12b3-3': [binom],
  'k12b3-4': [probComb],
};
