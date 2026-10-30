// Latihan soal: pilihan ganda (mc) dan isian (num).
// Setiap jawaban salah punya penjelasan "kenapa", dan setiap soal punya pembahasan langkah demi langkah.

import { spansHTML, staticSVG } from './shapes.js';
import { store } from './store.js';
import { t, getLang } from './i18n.js';
import { capie } from './capie.js';

export function shuffle(arr, rnd = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Format angka: 'id' = titik ribuan dan koma desimal (1.250,5); 'en' = koma ribuan dan titik desimal (1,250.5).
// Kunci jawaban di isi materi selalu ditulis gaya Indonesia; jawaban siswa dibaca sesuai bahasa yang dipakai.
export function normalize(s, fmt = 'id') {
  // awalan "Rp"/"$" dan akhiran satuan (%, kg) boleh ikut diketik
  let x = String(s ?? '').trim().replace(/^(rp\.?|\$)\s*/i, '').replace(/\s*(%|kg)$/i, '');
  const bare = x.replace(/\s+/g, '');
  if (fmt === 'en') {
    if (/^[−–-]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(bare)) x = x.replace(/,/g, '');
  } else if (/^[−–-]?\d{1,3}(\.\d{3})+(,\d+)?$/.test(bare)) x = x.replace(/\./g, '');
  return x
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/,/g, '.')
    .replace(/°$/, '');
}

export function toNumber(s, fmt = 'id') {
  // pecahan campuran "1 1/2" dicek dari teks asli, sebelum spasi dibuang
  let m = String(s ?? '').trim().replace(/[−–]/g, '-').match(/^(-?)(\d+)\s+(\d+)\/(\d+)$/);
  if (m && +m[4] !== 0) return (m[1] ? -1 : 1) * (+m[2] + +m[3] / +m[4]);
  const v = normalize(s, fmt);
  if (/^-?\d+(\.\d+)?$/.test(v)) return parseFloat(v);
  m = v.match(/^(-?)(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (m && +m[3] !== 0) return (m[1] ? -1 : 1) * (+m[2] / +m[3]);
  return null;
}

export function checkNum(q, input, fmt = 'id') {
  const val = normalize(input, fmt);
  if (!val) return { empty: true };
  const asNum = toNumber(input, fmt);
  for (const a of q.ans) {
    if (normalize(a) === val) return { ok: true };
    const an = toNumber(a);
    if (!q.exact && an !== null && asNum !== null && Math.abs(an - asNum) < 1e-9) return { ok: true };
  }
  const wrong = q.wrong || {};
  for (const [k, why] of Object.entries(wrong)) {
    const kn = toNumber(k);
    if (normalize(k) === val || (kn !== null && asNum !== null && Math.abs(kn - asNum) < 1e-9)) return { ok: false, why };
  }
  if (q.exact && asNum !== null && q.ans.some((a) => toNumber(a) !== null && Math.abs(toNumber(a) - asNum) < 1e-9))
    return { ok: false, why: q.exactWhy || t('q.exactWhy') };
  return { ok: false, why: q.hint || '' };
}

function figHTML(q) {
  if (!q.fig) return '';
  return `<div class="q-fig">${staticSVG(q.fig, { viewBox: q.viewBox, label: q.figLabel || t('q.fig') })}</div>`;
}

// Kunci jawaban ditulis gaya Indonesia; saat bahasa Inggris, angkanya ditampilkan gaya Inggris.
function showNum(a) {
  if (getLang() !== 'en') return a;
  const s = String(a);
  if (/^[−-]?\d{1,3}(\.\d{3})+$/.test(s)) return Number(s.replace(/\./g, '').replace('−', '-')).toLocaleString('en-US').replace('-', '−');
  if (/^[−-]?\d+,\d+$/.test(s)) return s.replace(',', '.');
  return s;
}
const ansText = (q) => (q.type === 'num' ? showNum(q.ans[0]) : (q.options.find((o) => o.ok) || {}).t);

export function renderQuiz(root, opts) {
  const { id, title, backHref, backLabel, questions, nextHref, nextLabel, kind = t('q.kindLatihan'), numHint } = opts;
  if (!questions || !questions.length) {
    root.innerHTML = `<div class="state-box"><p class="state-title">${t('q.none')}</p><p>${t('q.noneBody')}</p><a class="btn btn-ghost" href="${backHref}">${backLabel}</a></div>`;
    return;
  }
  const qs = questions.map((q) => (q.type === 'num' ? q : { ...q, options: q.fixed ? q.options : shuffle(q.options) }));
  const results = [];
  let i = 0;

  const head = () => `
    <header class="quiz-head">
      <a class="back" href="${backHref}">← ${backLabel}</a>
      <h1 class="quiz-title">${title}</h1>
      <div class="quiz-dots" aria-hidden="true">${qs.map((_, k) => `<span class="dot ${k < results.length ? (results[k] ? 'd-ok' : 'd-bad') : k === i ? 'd-cur' : ''}"></span>`).join('')}</div>
    </header>`;

  function renderQ() {
    const q = qs[i];
    const isNum = q.type === 'num';
    root.innerHTML = `
      ${head()}
      <section class="q-card" aria-labelledby="qtext">
        <div class="q-top"><p class="q-count">${t('q.count', { n: i + 1, t: qs.length })}</p>${capie('think', { size: 'xs', cls: 'q-capie' })}</div>
        <h2 id="qtext" class="q-text">${spansHTML(q.q)}</h2>
        ${figHTML(q)}
        ${
          isNum
            ? `<form class="q-num" autocomplete="off">
                 <label for="ans" class="sr-only">${t('q.yourAns')}</label>
                 <input id="ans" name="ans" inputmode="${q.inputmode || 'text'}" placeholder="${q.placeholder || t('q.placeholder')}" aria-describedby="numhint">
                 ${q.unit ? `<span class="unit">${q.unit}</span>` : ''}
                 <button class="btn btn-primary" type="submit">${t('q.check')}</button>
               </form>
               <p id="numhint" class="muted small">${q.numHint || numHint || t('hint.default')}</p>
               <p class="num-err" role="alert" hidden>${t('q.empty')}</p>`
            : `<div class="q-opts" role="group" aria-label="${t('q.opts')}">${q.options
                .map((o, k) => `<button type="button" class="opt" data-k="${k}"><span class="opt-key">${'ABCDE'[k]}</span><span class="opt-t">${spansHTML(o.t)}</span></button>`)
                .join('')}</div>`
        }
        <div class="q-fb" aria-live="polite" hidden></div>
      </section>`;
    if (isNum) {
      const form = root.querySelector('form');
      const input = form.querySelector('input');
      input.focus({ preventScroll: true });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const r = checkNum(q, input.value, getLang());
        if (r.empty) {
          root.querySelector('.num-err').hidden = false;
          return;
        }
        input.readOnly = true;
        form.querySelector('button').disabled = true;
        input.classList.add(r.ok ? 'is-ok' : 'is-bad');
        answer(r.ok, r.why);
      });
    } else {
      root.querySelectorAll('.opt').forEach((b) =>
        b.addEventListener('click', () => {
          const o = q.options[+b.dataset.k];
          root.querySelectorAll('.opt').forEach((x) => {
            x.disabled = true;
            if (q.options[+x.dataset.k].ok) x.classList.add('is-ok');
          });
          if (!o.ok) b.classList.add('is-bad');
          answer(!!o.ok, o.why);
        }),
      );
    }
  }

  function answer(ok, why) {
    const q = qs[i];
    results.push(ok);
    const fb = root.querySelector('.q-fb');
    fb.hidden = false;
    fb.className = `q-fb ${ok ? 'fb-ok' : 'fb-bad'}`;
    const last = i === qs.length - 1;
    fb.innerHTML = `
      ${capie(ok ? 'yes' : 'no', { size: 'xs', cls: 'fb-capie' })}
      <p class="fb-head"><strong>${ok ? t('q.right') : t('q.wrong')}</strong> ${ok ? spansHTML(q.okWhy || '') : `${spansHTML(why || '')} ${q.type === 'num' ? t('q.correctIs', { a: spansHTML(ansText(q)) }) : ''}`}</p>
      ${q.steps && q.steps.length ? `<details class="steps" ${ok ? '' : 'open'}><summary>${t('q.steps')}</summary><ol>${q.steps.map((s) => `<li>${spansHTML(s)}</li>`).join('')}</ol></details>` : ''}
      <button type="button" class="btn btn-primary" data-next>${last ? t('q.result') : t('q.next')}</button>`;
    root.querySelector('.quiz-dots').outerHTML = head().match(/<div class="quiz-dots"[\s\S]*?<\/div>/)[0];
    const nb = fb.querySelector('[data-next]');
    nb.addEventListener('click', () => {
      i++;
      if (i < qs.length) {
        renderQ();
        window.scrollTo({ top: 0 });
      } else done();
    });
    nb.focus({ preventScroll: true });
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function done() {
    const correct = results.filter(Boolean).length;
    store.saveScore(id, correct, qs.length);
    const best = store.score(id);
    const pct = correct / qs.length;
    const msg =
      pct === 1
        ? t('q.all')
        : pct >= 0.6
          ? t('q.most')
          : t('q.few');
    root.innerHTML = `
      ${head()}
      <section class="result">
        <p class="result-score"><span class="big">${correct}</span><span class="of">${t('q.of', { t: qs.length })}</span></p>
        ${capie(pct === 1 ? 'fly' : pct >= 0.6 ? 'cheer' : 'worried', { size: 'md', say: msg, cls: 'result-capie', tag: 'div' })}
        ${best && best.best > correct ? `<p class="muted">${t('q.best', { b: best.best, t: best.total })}</p>` : ''}
        <div class="end-actions">
          ${nextHref && pct >= 0.6 ? `<a class="btn btn-primary" href="${nextHref}">${nextLabel}</a>` : ''}
          <button type="button" class="btn ${nextHref && pct >= 0.6 ? 'btn-ghost' : 'btn-primary'}" data-retry>${t('q.retry', { kind })}</button>
          <a class="btn btn-ghost" href="${backHref}">${backLabel}</a>
        </div>
        <h2 class="review-title">${t('q.review')}</h2>
        <ol class="review">
          ${qs
            .map(
              (q, k) => `<li class="${results[k] ? 'r-ok' : 'r-bad'}"><span class="r-mark">${results[k] ? t('q.ok') : t('q.bad')}</span><span class="r-q">${spansHTML(q.q)}</span><span class="r-a">${t('q.ans', { a: spansHTML(ansText(q)) })}</span></li>`,
            )
            .join('')}
        </ol>
      </section>`;
    root.querySelector('[data-retry]').addEventListener('click', () => {
      renderQuiz(root, opts);
      window.scrollTo({ top: 0 });
    });
    root.querySelector('.result-score').focus?.();
  }

  renderQ();
}
