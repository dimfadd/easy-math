// Terjemahan isi materi. Isi asli (bahasa Indonesia) tetap satu-satunya sumber gambar dan jawaban;
// berkas di content/en/ hanya menimpa teks: judul, narasi, pertanyaan, penjelasan, dan teks di panggung.
//
// Bentuk terjemahan satu materi (semua kunci boleh tidak diisi; yang kosong memakai teks asli):
//   'k1b6-1': {
//     title, hook,
//     chapters: [ { title, steps: [ { say, ask: { q, options: [ { t, why } ] }, els: { idElemen: 'teks' } } ] } ],
//     quiz: [ { q, options: [ { t, why } ], wrong: { '12': '…' }, steps: [ … ], unit, hint, okWhy, els: { … } } ],
//   }
// Indeks chapters/steps/quiz/options mengikuti urutan di isi asli. `full: true` menandai materi yang
// seluruh narasinya sudah diterjemahkan (dipakai untuk memilih suara dan menampilkan catatan).
import { getLang, t } from './i18n.js';

let EN = null;

export async function ensureContentLang() {
  if (getLang() === 'en' && !EN) {
    try {
      EN = (await import('../content/en/index.js')).EN;
    } catch (e) {
      console.error(e);
      EN = { kelas: {}, bab: {}, lesson: {} };
    }
  }
}

const en = () => (getLang() === 'en' && EN ? EN : null);

// ---------- Kelas, bab, materi (katalog) ----------
export function kelasName(k) {
  if (getLang() !== 'en') return k.name;
  return t('kelas.name', { no: k.no }) + (/lanjut/i.test(k.key) ? ` ${t('kelas.lanjut')}` : '');
}
export const jenjangName = (j) => t(`jenjang.${j}`);
export function kelasDesc(k) {
  const o = en()?.kelas[k.key];
  return o?.desc ?? k.desc;
}
export function kelasFoot(k) {
  const o = en()?.kelas[k.key];
  return o?.foot ?? k.foot;
}
export function babTitle(b) {
  return en()?.bab[b.id]?.title ?? b.title;
}
export function babDesc(b) {
  return en()?.bab[b.id]?.desc ?? b.desc;
}
export function lessonTitle(l) {
  return en()?.lesson[l.id]?.title ?? l.title;
}
export function lessonHook(l) {
  return en()?.lesson[l.id]?.hook ?? l.hook;
}
export function hasFull(id) {
  return !!en()?.lesson[id]?.full;
}

// ---------- Isi lengkap ----------
function applyEl(e, v) {
  if (typeof v !== 'string') return { ...e, ...v };
  if (e.t && e.t !== 'text' && e.label !== undefined) return { ...e, label: v };
  return { ...e, text: v };
}
function locEls(list, els) {
  if (!els || !list) return list;
  const one = (e) => (e && e.id in els ? applyEl(e, els[e.id]) : e);
  return Array.isArray(list) ? list.map(one) : one(list);
}
function locSet(set, els) {
  if (!els || !set) return set;
  const out = {};
  for (const [id, props] of Object.entries(set)) {
    if (id in els && props && ('text' in props || 'label' in props)) {
      const v = els[id];
      out[id] = typeof v === 'string' ? { ...props, ...('label' in props ? { label: v } : { text: v }) } : { ...props, ...v };
    } else out[id] = props;
  }
  return out;
}
const mergeOpts = (opts, o) => (opts && o ? opts.map((op, i) => ({ ...op, ...(o[i] || {}) })) : opts);

function locStep(s, o) {
  if (!o) return s;
  const out = { ...s };
  if (o.say !== undefined) out.say = o.say;
  if (s.ask && o.ask) out.ask = { ...s.ask, q: o.ask.q ?? s.ask.q, options: mergeOpts(s.ask.options, o.ask.options) };
  if (o.els) {
    if (s.add) out.add = locEls(s.add, o.els);
    if (s.set) out.set = locSet(s.set, o.els);
  }
  return out;
}

export function locQuestion(q, o) {
  if (!o) return q;
  return {
    ...q,
    q: o.q ?? q.q,
    options: mergeOpts(q.options, o.options),
    wrong: o.wrong ? { ...(q.wrong || {}), ...o.wrong } : q.wrong,
    steps: o.steps ?? q.steps,
    unit: o.unit ?? q.unit,
    hint: o.hint ?? q.hint,
    okWhy: o.okWhy ?? q.okWhy,
    exactWhy: o.exactWhy ?? q.exactWhy,
    numHint: o.numHint ?? q.numHint,
    placeholder: o.placeholder ?? q.placeholder,
    fig: o.els ? locEls(q.fig, o.els) : q.fig,
  };
}

// Mengembalikan { lesson, quiz, lang }: narasi hanya diganti bila materi ditandai full (lang 'en');
// soal latihan yang sudah diterjemahkan tetap dipakai walau narasinya belum.
export function localLesson(lesson) {
  const o = en()?.lesson[lesson.id];
  if (!o) return { lesson, quiz: lesson.quiz, lang: 'id' };
  const L = {
    ...lesson,
    title: o.title ?? lesson.title,
    hook: o.hook ?? lesson.hook,
    chapters: lesson.chapters.map((c, ci) => {
      const oc = o.chapters?.[ci];
      return { ...c, title: oc?.title ?? c.title, steps: c.steps.map((s, si) => locStep(s, oc?.steps?.[si])) };
    }),
    quiz: (lesson.quiz || []).map((q, qi) => locQuestion(q, o.quiz?.[qi])),
  };
  return { lesson: o.full ? L : { ...lesson, title: L.title, hook: L.hook }, quiz: L.quiz, lang: o.full ? 'en' : 'id' };
}

export function localExtra(b) {
  const o = en()?.bab[b.id]?.extra;
  return (b.extra || []).map((q, i) => locQuestion(q, o?.[i]));
}
