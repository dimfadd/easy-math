// Pemutar materi animasi.
// Materi = daftar bab kecil (chapters), tiap bab berisi langkah (steps).
// Setiap langkah mengubah keadaan panggung: add / set / del / clear.
// Pemutar menghitung keadaan kumulatif tiap langkah, lalu menganimasikan selisihnya.

import { innerSVG, shapeKey, spansHTML, stripMarkup, VIEW } from './shapes.js';
import { speech } from './speech.js';
import { store } from './store.js';

const ns = 'http://www.w3.org/2000/svg';

function matchIds(state, pat) {
  if (pat.endsWith('*')) {
    const pre = pat.slice(0, -1);
    return [...state.keys()].filter((k) => k.startsWith(pre));
  }
  return state.has(pat) ? [pat] : [];
}

export function compileLesson(lesson) {
  const frames = [];
  let state = new Map();
  (lesson.chapters || []).forEach((ch, ci) => {
    (ch.steps || []).forEach((st, si) => {
      state = new Map(state);
      if (st.clear) {
        const keep = new Set((st.keep || []).flatMap((p) => matchIds(state, p)));
        state = new Map([...state].filter(([k]) => keep.has(k)));
      }
      for (const pat of [].concat(st.del || [])) for (const id of matchIds(state, pat)) state.delete(id);
      for (const el of [].concat(st.add || []).flat(Infinity)) {
        if (!el || !el.id) continue;
        state.set(el.id, { ...el });
      }
      for (const [pat, props] of Object.entries(st.set || {})) {
        const ids = matchIds(state, pat);
        if (!ids.length && typeof console !== 'undefined') console.warn(`[${lesson.id}] set: id "${pat}" tidak ada`);
        for (const id of ids) state.set(id, { ...state.get(id), ...props });
      }
      frames.push({ ci, si, step: st, state });
    });
  });
  return frames;
}

// ---------- Panggung ----------
export class Stage {
  constructor(svg) {
    this.svg = svg;
    this.layer = svg.querySelector('.layer');
    this.nodes = new Map();
  }

  render(state, { instant = false, hl = [], pulse = [], focus = null } = {}) {
    const svg = this.svg;
    if (instant) svg.classList.add('instant');
    const hlSet = new Set(hl.flatMap((p) => matchIds(state, p)));
    const pulseSet = new Set(pulse.flatMap((p) => matchIds(state, p)));
    const focusSet = focus ? new Set(focus.flatMap((p) => matchIds(state, p))) : null;

    for (const [id, node] of this.nodes) {
      if (!state.has(id) && !node.removing) this.remove(id, node, instant);
    }

    const items = [...state.values()].sort((a, b) => (a.z || 0) - (b.z || 0));
    const order = [];
    for (const p of items) {
      let node = this.nodes.get(p.id);
      const key = shapeKey(p);
      if (node && node.removing) {
        clearTimeout(node.timer);
        node.removing = false;
      }
      if (!node) {
        node = this.create(p, key, instant);
      } else if (node.key !== key) {
        node.fx.innerHTML = innerSVG(instant ? { ...p, draw: false } : p);
        node.g.setAttribute('data-t', p.t || 'text');
        node.key = key;
      }
      this.place(node, p);
      node.fx.classList.toggle('hl', hlSet.has(p.id));
      node.rs.classList.toggle('dim', !!focusSet && !focusSet.has(p.id));
      if (pulseSet.has(p.id) && !instant) {
        node.fx.classList.remove('pulse');
        void node.fx.getBoundingClientRect();
        node.fx.classList.add('pulse');
      } else if (!pulseSet.has(p.id)) node.fx.classList.remove('pulse');
      order.push(node.g);
    }
    // urutkan hanya jika berbeda, supaya transisi tidak terputus
    const current = [...this.layer.children].filter((g) => !g.__removing);
    const same = current.length === order.length && current.every((g, i) => g === order[i]);
    if (!same) {
      for (const g of order) this.layer.appendChild(g);
    }

    if (instant) {
      void svg.getBoundingClientRect();
      requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.remove('instant')));
    }
  }

  create(p, key, instant) {
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'el');
    g.setAttribute('data-id', p.id);
    g.setAttribute('data-t', p.t || 'text');
    const rs = document.createElementNS(ns, 'g');
    rs.setAttribute('class', 'rs');
    const fx = document.createElementNS(ns, 'g');
    fx.setAttribute('class', 'fx');
    fx.innerHTML = innerSVG(instant ? { ...p, draw: false } : p);
    // rs dipakai untuk rotasi/skala, fx untuk efek
    g.appendChild(rs);
    rs.appendChild(fx);
    const node = { g, rs, fx, key, removing: false };
    const from = p.from || null;
    g.style.opacity = instant ? String(p.o ?? 1) : '0';
    g.style.transform = `translate(${from ? from.x : p.x ?? 0}px, ${from ? from.y : p.y ?? 0}px)`;
    if (!instant && !from && p.pop !== false) fx.classList.add('pop');
    this.layer.appendChild(g);
    this.nodes.set(p.id, node);
    if (!instant) void g.getBoundingClientRect();
    return node;
  }

  place(node, p) {
    node.g.style.transform = `translate(${p.x ?? 0}px, ${p.y ?? 0}px)`;
    node.g.style.opacity = String(p.o ?? 1);
    node.rs.style.transform = `rotate(${p.rot ?? 0}deg) scale(${p.s ?? 1})`;
  }

  remove(id, node, instant) {
    if (instant) {
      node.g.remove();
      this.nodes.delete(id);
      return;
    }
    node.removing = true;
    node.g.__removing = true;
    node.g.style.opacity = '0';
    node.timer = setTimeout(() => {
      node.g.remove();
      if (this.nodes.get(id) === node) this.nodes.delete(id);
    }, 450);
  }

  clear() {
    this.layer.innerHTML = '';
    this.nodes.clear();
  }
}

export function stageSVG(label) {
  return `<svg class="stage" viewBox="0 0 ${VIEW.w} ${VIEW.h}" role="img" aria-label="${label}"><g class="layer"></g></svg>`;
}

// ---------- Pemutar ----------
const SPEEDS = [0.8, 1, 1.25, 1.5];

const ICON = {
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  replay: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12a7 7 0 1 0 2.2-5.1M5 4.5V9h4.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  soundOn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" fill="currentColor"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  soundOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
};

function estDuration(text) {
  const words = stripMarkup(text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1.8, words * 0.42 + 0.8);
}

export class Player {
  constructor(root, lesson, { onComplete, practiceHref, nextHref, nextLabel } = {}) {
    this.root = root;
    this.lesson = lesson;
    this.frames = compileLesson(lesson);
    this.idx = -1;
    this.playing = false;
    this.asking = false;
    this.ended = false;
    this.timers = [];
    this.utter = null;
    this.onComplete = onComplete;
    this.practiceHref = practiceHref;
    this.nextHref = nextHref;
    this.nextLabel = nextLabel;
    this.speedIdx = Math.max(0, SPEEDS.indexOf(store.settings.speed ?? 1));
    this.build();
    this.stage = new Stage(this.root.querySelector('.stage'));
    this.onKey = this.onKey.bind(this);
    document.addEventListener('keydown', this.onKey);
    speech.onChange(() => this.syncSound());
    this.show(0, { instant: true });
  }

  get speed() {
    return SPEEDS[this.speedIdx];
  }

  get soundOn() {
    return speech.available && store.settings.sound !== false;
  }

  build() {
    const L = this.lesson;
    const chapters = L.chapters || [];
    const total = this.frames.length;
    this.root.innerHTML = `
      <div class="player">
        <div class="stage-col">
          <div class="chap-row"><p class="chap-title" aria-live="polite"></p><p class="chap-count"></p></div>
          <div class="stage-wrap">
            ${stageSVG(`Animasi: ${L.title}`)}
          </div>
          <div class="segbar" role="group" aria-label="Bagian materi">
            ${chapters
              .map((c, i) => `<button type="button" class="seg" data-ci="${i}" style="flex-grow:${c.steps.length}" aria-label="Bagian ${i + 1}: ${c.title}"><span class="seg-fill"></span></button>`)
              .join('')}
          </div>
          <div class="caption" aria-live="polite"><p class="cap-text"></p></div>
          <div class="ask" hidden></div>
          <div class="endcard" hidden>
            <p class="end-title">Materi selesai.</p>
            <p class="end-sub">Sekarang uji pemahamanmu dengan soal latihan. Setiap jawaban salah ada penjelasannya.</p>
            <div class="end-actions">
              <a class="btn btn-primary" href="${this.practiceHref}">Kerjakan ${L.quiz?.length || 0} soal latihan</a>
              <button type="button" class="btn btn-ghost" data-act="restart">${ICON.replay}<span>Ulang animasi</span></button>
            </div>
          </div>
          <div class="controls">
            <button type="button" class="ctl" data-act="prev" aria-label="Langkah sebelumnya">${ICON.prev}</button>
            <button type="button" class="ctl ctl-main" data-act="toggle" aria-label="Putar">${ICON.play}</button>
            <button type="button" class="ctl" data-act="next" aria-label="Langkah berikutnya">${ICON.next}</button>
            <span class="ctl-sep" aria-hidden="true"></span>
            <button type="button" class="ctl ctl-text" data-act="speed" aria-label="Kecepatan">${this.speed}×</button>
            <button type="button" class="ctl" data-act="sound" aria-label="Suara"></button>
            <span class="step-count" aria-live="off"></span>
          </div>
          <p class="sound-note" hidden></p>
        </div>
        <aside class="outline" aria-label="Daftar bagian">
          <details class="outline-box" ${window.matchMedia('(min-width: 1080px)').matches ? 'open' : ''}>
            <summary>Daftar bagian <span class="muted">(${chapters.length})</span></summary>
            <ol class="outline-list">
              ${chapters.map((c, i) => `<li><button type="button" class="ol-item" data-ci="${i}"><span class="ol-no">${i + 1}</span><span>${c.title}</span></button></li>`).join('')}
            </ol>
          </details>
          <p class="hint muted">Tombol keyboard: Spasi untuk putar atau jeda, panah kiri dan kanan untuk pindah langkah.</p>
        </aside>
      </div>`;
    this.$ = (s) => this.root.querySelector(s);
    this.root.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b || !this.root.contains(b)) return;
      const act = b.dataset.act;
      if (b.dataset.ci !== undefined) return this.gotoChapter(+b.dataset.ci);
      if (act === 'toggle') this.toggle();
      else if (act === 'prev') this.step(-1);
      else if (act === 'next') this.step(1);
      else if (act === 'speed') this.cycleSpeed();
      else if (act === 'sound') this.toggleSound();
      else if (act === 'restart') this.restart();
    });
    this.syncSound();
    void total;
  }

  syncSound() {
    const b = this.$('[data-act="sound"]');
    const note = this.$('.sound-note');
    if (!b) return;
    if (!speech.available) {
      b.innerHTML = ICON.soundOff;
      b.disabled = true;
      b.setAttribute('aria-label', 'Suara tidak tersedia');
      note.hidden = false;
      note.textContent = 'Perangkat ini tidak punya suara Bahasa Indonesia, jadi narasi tampil sebagai teks saja.';
    } else {
      b.disabled = false;
      b.innerHTML = this.soundOn ? ICON.soundOn : ICON.soundOff;
      b.setAttribute('aria-label', this.soundOn ? 'Matikan suara' : 'Nyalakan suara');
      b.setAttribute('aria-pressed', this.soundOn ? 'true' : 'false');
      note.hidden = true;
    }
  }

  onKey(e) {
    if (!document.body.contains(this.root)) return this.destroy();
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === ' ' && tag !== 'button' && tag !== 'a' && tag !== 'summary') {
      e.preventDefault();
      this.toggle();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.step(-1);
    }
  }

  clearTimers() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    if (this.utter) this.utter.cancel();
    this.utter = null;
    speech.cancel();
  }

  later(fn, ms) {
    this.timers.push(setTimeout(fn, ms));
  }

  show(i, { instant = false } = {}) {
    i = Math.max(0, Math.min(this.frames.length - 1, i));
    const prev = this.idx;
    this.idx = i;
    const f = this.frames[i];
    const st = f.step;
    const jump = prev < 0 || Math.abs(i - prev) > 1;
    this.stage.render(f.state, { instant: instant || jump, hl: [].concat(st.hl || []), pulse: [].concat(st.pulse || []), focus: st.focus ? [].concat(st.focus) : null });

    const ch = this.lesson.chapters[f.ci];
    this.$('.chap-count').textContent = `Bagian ${f.ci + 1} dari ${this.lesson.chapters.length}`;
    const ct = this.$('.chap-title');
    if (ct.textContent !== ch.title) {
      ct.textContent = ch.title;
      ct.classList.remove('swap');
      void ct.offsetWidth;
      ct.classList.add('swap');
    }
    this.renderCaption(st.say || '');
    this.updateProgress();
    this.hideAsk();
    this.$('.endcard').hidden = true;
    this.ended = false;
    if (i === this.frames.length - 1) this.markDone();
  }

  renderCaption(text) {
    const words = [];
    // pecah per kata dengan tetap menjaga markup warna
    const tmp = document.createElement('div');
    tmp.innerHTML = spansHTML(text);
    const out = document.createElement('p');
    out.className = 'cap-text';
    const walk = (nodeList, parent) => {
      for (const nd of nodeList) {
        if (nd.nodeType === 3) {
          nd.textContent.split(/(\s+)/).forEach((tok) => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) parent.appendChild(document.createTextNode(tok));
            else {
              const s = document.createElement('span');
              s.className = 'w';
              s.textContent = tok;
              parent.appendChild(s);
              words.push(s);
            }
          });
        } else {
          const clone = nd.cloneNode(false);
          parent.appendChild(clone);
          walk([...nd.childNodes], clone);
        }
      }
    };
    walk([...tmp.childNodes], out);
    const cap = this.$('.caption');
    cap.replaceChildren(out);
    this.words = words;
    this.wordStarts = [];
    let pos = 0;
    const plain = stripMarkup(text);
    for (const w of words) {
      const at = plain.indexOf(w.textContent, pos);
      this.wordStarts.push(at < 0 ? pos : at);
      pos = (at < 0 ? pos : at) + w.textContent.length;
    }
    if (!this.playing) words.forEach((w) => w.classList.add('said'));
  }

  sayUpTo(k) {
    (this.words || []).forEach((w, i) => w.classList.toggle('said', i <= k));
  }

  updateProgress() {
    const f = this.frames[this.idx];
    const chapters = this.lesson.chapters;
    this.root.querySelectorAll('.seg').forEach((seg, ci) => {
      const n = chapters[ci].steps.length;
      const fill = ci < f.ci ? 1 : ci > f.ci ? 0 : (f.si + 1) / n;
      seg.querySelector('.seg-fill').style.transform = `scaleX(${fill})`;
      seg.classList.toggle('cur', ci === f.ci);
    });
    this.root.querySelectorAll('.ol-item').forEach((b, ci) => {
      b.classList.toggle('cur', ci === f.ci);
      if (ci === f.ci) b.setAttribute('aria-current', 'step');
      else b.removeAttribute('aria-current');
    });
    this.$('.step-count').textContent = `${this.idx + 1}/${this.frames.length}`;
    const t = this.$('[data-act="toggle"]');
    t.innerHTML = this.playing ? ICON.pause : ICON.play;
    t.setAttribute('aria-label', this.playing ? 'Jeda' : 'Putar');
    this.$('[data-act="prev"]').disabled = this.idx === 0;
    this.$('[data-act="next"]').disabled = this.idx === this.frames.length - 1;
  }

  narrate() {
    const f = this.frames[this.idx];
    const st = f.step;
    const text = stripMarkup(st.say || '');
    const extra = (st.hold || 0) * 1000;
    const finish = () => {
      if (!this.playing) return;
      this.sayUpTo(Infinity);
      if (st.ask) return this.showAsk(st.ask, true);
      this.later(() => this.advance(), 350 + extra);
    };
    this.sayUpTo(-1);
    const est = estDuration(text) / this.speed;
    if (this.soundOn && text) {
      let fired = false;
      const done = () => {
        if (fired) return;
        fired = true;
        finish();
      };
      this.utter = speech.speak(text, this.speed, {
        onboundary: (ci) => {
          let k = -1;
          this.wordStarts.forEach((s, i) => {
            if (s <= ci) k = i;
          });
          this.sayUpTo(k);
        },
        onend: done,
      });
      // cadangan: sebagian browser tidak memanggil onend
      this.later(done, est * 2200 + 3000);
      // karaoke cadangan jika tidak ada boundary
      this.karaokeTimer(est);
    } else {
      this.karaokeTimer(est);
      this.later(finish, est * 1000);
    }
  }

  karaokeTimer(est) {
    const n = this.words.length;
    if (!n) return;
    for (let k = 0; k < n; k++) {
      this.later(() => {
        const said = this.words.filter((w) => w.classList.contains('said')).length;
        if (said <= k) this.sayUpTo(k);
      }, ((k + 0.5) / n) * est * 900);
    }
  }

  advance() {
    if (!this.playing) return;
    if (this.idx >= this.frames.length - 1) return this.finish();
    this.show(this.idx + 1);
    this.narrate();
  }

  play() {
    if (this.asking) return;
    if (this.ended || this.idx >= this.frames.length - 1) {
      if (this.ended) return this.restart();
    }
    this.playing = true;
    this.updateProgress();
    this.clearTimers();
    this.narrate();
  }

  pause() {
    this.playing = false;
    this.clearTimers();
    this.sayUpTo(Infinity);
    this.updateProgress();
  }

  toggle() {
    if (this.playing) this.pause();
    else this.play();
  }

  step(d) {
    const wasPlaying = this.playing;
    this.clearTimers();
    if (d > 0 && this.idx >= this.frames.length - 1) return this.finish();
    this.show(this.idx + d);
    if (wasPlaying) this.narrate();
    else if (this.frames[this.idx].step.ask) this.showAsk(this.frames[this.idx].step.ask, false);
  }

  gotoChapter(ci) {
    const i = this.frames.findIndex((f) => f.ci === ci);
    if (i < 0) return;
    const wasPlaying = this.playing;
    this.clearTimers();
    this.show(i, { instant: true });
    if (wasPlaying) this.narrate();
  }

  restart() {
    this.clearTimers();
    this.playing = false;
    this.show(0, { instant: true });
    this.play();
  }

  cycleSpeed() {
    this.speedIdx = (this.speedIdx + 1) % SPEEDS.length;
    store.setSetting('speed', this.speed);
    this.$('[data-act="speed"]').textContent = `${this.speed}×`;
  }

  toggleSound() {
    store.setSetting('sound', !this.soundOn);
    this.syncSound();
    if (!this.soundOn) speech.cancel();
    if (this.playing) {
      this.clearTimers();
      this.narrate();
    }
  }

  markDone() {
    if (this.doneMarked) return;
    this.doneMarked = true;
    this.onComplete && this.onComplete();
  }

  finish() {
    this.playing = false;
    this.clearTimers();
    this.ended = true;
    this.markDone();
    this.updateProgress();
    const end = this.$('.endcard');
    end.hidden = false;
    end.querySelector('a, button')?.focus({ preventScroll: true });
  }

  // ---------- Pertanyaan di tengah materi ----------
  showAsk(ask, resume = true) {
    this.asking = true;
    const box = this.$('.ask');
    const opts = ask.options || [];
    box.hidden = false;
    box.innerHTML = `
      <p class="ask-q">${spansHTML(ask.q || 'Coba jawab dulu sebelum lanjut.')}</p>
      <div class="ask-opts">${opts
        .map((o, i) => `<button type="button" class="opt" data-i="${i}"><span class="opt-key">${'ABCD'[i]}</span><span class="opt-t">${spansHTML(o.t)}</span></button>`)
        .join('')}</div>
      <div class="ask-fb" hidden></div>`;
    box.querySelector('.opt')?.focus({ preventScroll: true });
    box.querySelectorAll('.opt').forEach((b) =>
      b.addEventListener('click', () => {
        const o = opts[+b.dataset.i];
        box.querySelectorAll('.opt').forEach((x) => {
          x.disabled = true;
          const oo = opts[+x.dataset.i];
          if (oo.ok) x.classList.add('is-ok');
        });
        if (!o.ok) b.classList.add('is-bad');
        const fb = box.querySelector('.ask-fb');
        fb.hidden = false;
        fb.className = `ask-fb ${o.ok ? 'fb-ok' : 'fb-bad'}`;
        fb.innerHTML = `<p><strong>${o.ok ? 'Tepat.' : 'Belum tepat.'}</strong> ${spansHTML(o.why || (o.ok ? 'Lanjutkan untuk melihat penjelasannya.' : ''))}</p><button type="button" class="btn btn-primary btn-sm" data-cont>Lanjutkan penjelasan</button>`;
        fb.querySelector('[data-cont]').addEventListener('click', () => {
          this.hideAsk();
          if (resume) {
            this.playing = true;
            this.updateProgress();
            this.advance();
          } else this.step(1);
        });
        fb.querySelector('[data-cont]').focus({ preventScroll: true });
      }),
    );
    this.playing = false;
    this.updateProgress();
  }

  hideAsk() {
    this.asking = false;
    const box = this.$('.ask');
    if (box) {
      box.hidden = true;
      box.innerHTML = '';
    }
  }

  destroy() {
    this.clearTimers();
    document.removeEventListener('keydown', this.onKey);
  }
}
