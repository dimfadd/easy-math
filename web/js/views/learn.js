// Halaman belajar: peta belajar, bab, materi, latihan, dan uji bab (dengan kunci untuk materi berbayar).
import { BAB, KELAS, LESSONS, kelasOf } from '../../content/index.js';
import { Player } from '../player.js';
import { renderQuiz, shuffle } from '../quiz.js';
import { buildSession, sessionSize, ujiSize, mastery, hasGen, genQuestion, genCount as localGenCount } from '../practice.js';
import { store } from '../store.js';
import { spansHTML } from '../shapes.js';
import { t, getLang } from '../i18n.js';
import { kelasName, jenjangName, kelasDesc, kelasFoot, babTitle, babDesc, lessonTitle, lessonHook, localLesson, localExtra } from '../l10n.js';
import { auth } from '../auth.js';
import { FREE } from '../config.js';
import {
  app, topbar, bindTopbar, setCurrent, kelasNo, setKelas, kName, ICON, avatar,
  lessonHref, practiceHref, isFree, babProgress, scoreBadge, nextLessonId, continueTarget, setTitle, stateBox,
} from '../ui.js';
import { capie } from '../capie.js';

// ---------- Pemilih kelas ----------
const JENJANG = ['SD', 'SMP', 'SMA'];
function kelasPicker() {
  return `<nav class="kelas-pick" aria-label="${t('map.pick')}">${JENJANG.map((j) => {
    const ks = KELAS.filter((k) => k.jenjang === j);
    return `<div class="kp-group"><span class="kp-label">${jenjangName(j)}</span><div class="kp-row">${ks
      .map((k) => {
        const lanjut = /lanjut/i.test(k.key);
        return `<a class="kp-chip" href="#/kelas/${k.key}" aria-label="${kelasName(k)}"${k.key === kelasNo ? ' aria-current="page"' : ''}>${k.no}${lanjut ? `<small>${t('kelas.lanjut')}</small>` : ''}</a>`;
      })
      .join('')}</div></div>`;
  }).join('')}</nav>`;
}

function babState(pr) {
  if (pr.watched === pr.total) return { cls: 'is-done', text: t('bab.done') };
  if (pr.watched > 0 || pr.practiced > 0) return { cls: 'is-cur', text: t('bab.cur') };
  return { cls: '', text: t('bab.todo') };
}

// Pita ajakan di atas peta untuk tamu dan akun tanpa langganan
function accessBanner() {
  if (auth.hasAccess) return '';
  if (!auth.loggedIn)
    return `<div class="banner"><div><strong>${t('learn.guestTitle')}</strong><p>${t('learn.guestBody')}</p></div><div class="banner-act"><a class="btn btn-primary" href="#/daftar">${t('learn.signup')}</a><a class="btn btn-ghost" href="#/masuk">${t('nav.login')}</a></div></div>`;
  if (auth.role === 'anak') return `<div class="banner"><div><strong>${t('learn.kidTitle')}</strong><p>${t('learn.kidBody')}</p></div></div>`;
  return `<div class="banner"><div><strong>${t('learn.noPlanTitle')}</strong><p>${t('learn.noPlanBody')}</p></div><div class="banner-act"><a class="btn btn-primary" href="#/paket">${t('learn.seePlans')}</a></div></div>`;
}

export function viewBelajar() {
  const K = kelasOf(kelasNo);
  setTitle(t('map.title'));
  const babs = K.babs;
  const cont = auth.profile ? continueTarget() : null;
  const contEntry = cont && LESSONS.get(cont.id);
  const needProfile = auth.loggedIn && !auth.profile;
  const freeHere = babs.flatMap((b) => b.lessons).filter((l) => isFree(l.id)).length;
  app.innerHTML = `
    ${topbar('app')}
    <main id="main" class="page-learn">
      <header class="learn-head">
        ${
          auth.profile
            ? `<div class="hello">${avatar(auth.profile, 52)}<div><p class="hello-sub">${kName()} · ${jenjangName(K.jenjang)}</p><h1>${t('learn.hello', { name: auth.profile.name })}</h1></div></div>`
            : `<h1>${t('map.title')}</h1>`
        }
      </header>
      ${capie(contEntry ? 'talk' : 'hi', { size: 'sm', say: !auth.loggedIn ? t('capie.homeGuest') : contEntry ? t('capie.home') : t('capie.homeNew'), cls: 'learn-capie' })}
      ${needProfile ? `<div class="banner"><div><strong>${t('learn.pickTitle')}</strong><p>${t('learn.pickBody')}</p></div><div class="banner-act"><a class="btn btn-primary" href="#/profil">${t('learn.pick')}</a></div></div>` : ''}
      ${accessBanner()}
      ${
        contEntry
          ? `<a class="cont-card" href="${lessonHref(cont.id)}">
              <span class="cont-body">
                <span class="cont-kicker">${cont.label}</span>
                <span class="cont-title">${lessonTitle(contEntry.lesson)}</span>
                <span class="cont-sub">${kName()} · ${t('bab.short', { no: contEntry.bab.no, title: babTitle(contEntry.bab) })}</span>
              </span>
              <span class="cont-play" aria-hidden="true">${ICON.play}</span>
            </a>`
          : ''
      }
      <section id="peta" class="map" aria-labelledby="peta-h">
        <div class="map-head">
          <h2 id="peta-h">${auth.profile ? t('map.title') : t('map.pick')}</h2>
          ${kelasPicker()}
          <p class="kelas-desc"><strong>${kName()} · ${jenjangName(K.jenjang)} ${t('kelas.fase', { fase: K.fase })}.</strong> ${kelasDesc(K)}${!auth.hasAccess && freeHere ? ` <span class="tag tag-free">${t('learn.freeHere', { n: freeHere })}</span>` : ''}</p>
        </div>
        <ol class="bab-list">
          ${babs
            .map((b) => {
              const pr = babProgress(b);
              const pct = Math.round((pr.watched / pr.total) * 100);
              const st = babState(pr);
              const uji = store.score(b.id);
              const free = b.lessons.filter((l) => isFree(l.id)).length;
              const locked = !auth.hasAccess && !free;
              return `<li class="bab-item">
              <a class="bab-link ${st.cls}${locked ? ' is-locked' : ''}" href="#/bab/${b.id}">
                <span class="bab-no" aria-hidden="true">${st.cls === 'is-done' ? ICON.check : b.no}</span>
                <span class="bab-body">
                  <span class="bab-title">${t('bab.full', { no: b.no, title: babTitle(b) })}</span>
                  <span class="bab-desc">${babDesc(b)}</span>
                  <span class="bab-meta"><span class="bab-state">${st.text}</span> · ${t('bab.count', { w: pr.watched, n: pr.total })}${uji ? ` · ${t('bab.uji', { b: uji.best, t: uji.total })}` : ''}${!auth.hasAccess ? (free ? ` · <span class="free-word">${t('learn.nFree', { n: free })}</span>` : ` · <span class="lock-word">${ICON.lock}${t('learn.locked')}</span>`) : ''}</span>
                  <span class="meter" aria-hidden="true"><span style="transform:scaleX(${pct / 100})"></span></span>
                </span>
              </a>
            </li>`;
            })
            .join('')}
        </ol>
      </section>
      <footer class="foot"><p>${kelasFoot(K)}</p></footer>
    </main>`;
  bindTopbar();
}

export function viewBab(id) {
  const b = BAB.find((x) => x.id === id);
  if (!b) return viewNotFound();
  setKelas(b.kelas);
  setTitle(t('bab.short', { no: b.no, title: babTitle(b) }));
  const uji = store.score(b.id);
  const nextBab = kelasOf(b.kelas).babs[b.no];
  const pr = babProgress(b);
  const curIdx = b.lessons.findIndex((l) => !store.isWatched(l.id) && auth.canOpen(l.id));
  app.innerHTML = `
    ${topbar('app')}
    <main id="main" class="page-bab">
      <a class="back" href="#/kelas/${b.kelas}">← ${t('map.mapOf', { kelas: kName(b.kelas) })}</a>
      <header class="bab-head">
        <p class="pill">${kName(b.kelas)} · ${t('bab.label', { no: b.no })}</p>
        <h1>${babTitle(b)}</h1>
        <p class="lead">${babDesc(b)}</p>
        <div class="bab-progress">
          <span class="meter" aria-hidden="true"><span style="transform:scaleX(${pr.watched / pr.total})"></span></span>
          <span class="bab-progress-t">${t('bab.watched', { w: pr.watched, n: pr.total })}</span>
        </div>
      </header>
      ${auth.hasAccess ? '' : accessBanner()}
      <ol class="path lesson-list">
        ${b.lessons
          .map((l, k) => {
            const done = store.isWatched(l.id);
            const open = auth.canOpen(l.id);
            const cls = !open ? 'is-locked' : done ? 'is-done' : k === curIdx ? 'is-cur' : '';
            return `<li class="path-item ${cls}">
            <span class="path-node" aria-hidden="true">${!open ? ICON.lock : done ? ICON.check : `${b.no}.${k + 1}`}</span>
            <div class="path-card">
              ${k === curIdx ? `<p class="path-flag">${t('bab.startHere')}</p>` : ''}
              <h2 class="lesson-title">${lessonTitle(l)}</h2>
              <p class="lesson-hook">${spansHTML(lessonHook(l) || '')}</p>
              <p class="lesson-tags">${isFree(l.id) && !auth.hasAccess ? `<span class="tag tag-free">${t('learn.free')}</span>` : ''}${!open ? `<span class="tag">${t('learn.subOnly')}</span>` : ''}${done ? `<span class="tag tag-ok">${t('bab.tagWatched')}</span>` : ''}${mastery(l.id).mastered ? `<span class="tag tag-mastered">${t('m.tag')}</span>` : scoreBadge(l.id)}</p>
              <div class="lesson-actions">
                ${
                  open
                    ? `<a class="btn ${done ? 'btn-ghost' : 'btn-primary'}" href="${lessonHref(l.id)}">${done ? t('bab.rewatch') : t('bab.watch')}</a>
                <a class="btn ${done && !store.score(l.id) ? 'btn-primary' : 'btn-ghost'}" href="${practiceHref(l.id)}">${t('bab.practice', { n: hasGen(l.id) ? sessionSize(b.kelas) : Math.min(l.quiz.length, sessionSize(b.kelas)) })}</a>`
                    : `<a class="btn btn-ghost" href="${lessonHref(l.id)}">${ICON.lock}<span>${t('learn.unlock')}</span></a>`
                }
              </div>
            </div>
          </li>`;
          })
          .join('')}
        <li class="path-item path-uji${uji ? ' is-done' : ''}${auth.hasAccess ? '' : ' is-locked'}">
          <span class="path-node" aria-hidden="true">${auth.hasAccess ? ICON.star : ICON.lock}</span>
          <div class="path-card uji-box">
            <div>
              <h2>${t('bab.ujiTitle', { no: b.no })}</h2>
              <p>${t('bab.ujiDesc')}${uji ? ` ${t('bab.ujiBest', { b: uji.best, t: uji.total })}` : ''}${auth.hasAccess ? '' : ` ${t('learn.ujiLocked')}`}</p>
            </div>
            <a class="btn ${auth.hasAccess ? 'btn-primary' : 'btn-ghost'}" href="#/uji/${b.id}">${auth.hasAccess ? (uji ? t('bab.ujiRedo') : t('bab.ujiStart')) : t('learn.unlock')}</a>
          </div>
        </li>
      </ol>
      ${nextBab ? `<p class="next-bab"><a href="#/bab/${nextBab.id}">${t('bab.short', { no: nextBab.no, title: babTitle(nextBab) })} →</a></p>` : ''}
    </main>`;
  bindTopbar();
}

// ---------- Halaman terkunci ----------
function freeCards() {
  return `<div class="free-mini">${Object.entries(FREE)
    .map(([j, ids]) => {
      const l = LESSONS.get(ids[0]);
      return `<a class="free-mini-card" href="${lessonHref(ids[0])}"><span class="tag tag-free">${jenjangName(j)}</span><strong>${lessonTitle(l.lesson)}</strong></a>`;
    })
    .join('')}</div>`;
}

function lockView(kind) {
  setTitle(t('lock.title'));
  const guest = !auth.loggedIn;
  const kid = auth.role === 'anak';
  const actions = guest
    ? `<a class="btn btn-primary" href="#/daftar?next=paket">${t('lock.signup')}</a><a class="btn btn-ghost" href="#/masuk">${t('nav.login')}</a>`
    : kid
      ? ''
      : `<a class="btn btn-primary" href="#/paket">${t('learn.seePlans')}</a>`;
  app.innerHTML = `
    ${topbar('app')}
    <main id="main">
      <div class="state-box lock-box">
        ${capie('worried', { size: 'sm', say: kid ? t('capie.lockKid') : t('capie.lock'), cls: 'lock-capie' })}
        <h1 class="state-title">${kind === 'uji' ? t('lock.ujiTitle') : t('lock.title')}</h1>
        <p>${kid ? t('lock.kidBody') : guest ? t('lock.guestBody') : t('lock.planBody')}</p>
        ${actions ? `<div class="end-actions">${actions}</div>` : ''}
        <p class="muted small">${t('lock.tryFree')}</p>
        ${freeCards()}
      </div>
    </main>`;
  bindTopbar();
}

export function viewMateri(id) {
  const entry = LESSONS.get(id);
  if (!entry) return viewNotFound();
  const { bab, i } = entry;
  setKelas(bab.kelas);
  if (!auth.canOpen(id)) return lockView('materi');
  const loc = localLesson(entry.lesson);
  const lesson = loc.lesson;
  setTitle(lesson.title);
  store.setLast(id);
  app.innerHTML = `
    ${topbar('app')}
    <main id="main" class="page-materi">
      <div class="materi-head">
        <a class="back" href="#/bab/${bab.id}">← ${t('bab.short', { no: bab.no, title: babTitle(bab) })}</a>
        <h1 class="materi-title"><span class="materi-no">${bab.no}.${i + 1}</span> ${lesson.title}</h1>
        ${isFree(id) && !auth.hasAccess ? `<p class="lang-note free-note">${t('learn.freeNote')}</p>` : ''}
        ${getLang() === 'en' && loc.lang !== 'en' ? `<p class="lang-note" lang="en">${t('materi.idOnly')}</p>` : ''}
      </div>
      <div id="player"${loc.lang !== getLang() ? ` lang="${loc.lang}"` : ''}></div>
      <p class="skip"><a href="${practiceHref(id)}">${t('materi.skip')}</a></p>
    </main>`;
  bindTopbar();
  const nx = nextLessonId(id);
  const player = new Player(app.querySelector('#player'), lesson, {
    onComplete: () => store.markWatched(id),
    practiceHref: practiceHref(id),
    nextHref: nx ? lessonHref(nx) : null,
    lang: loc.lang,
  });
  setCurrent(player);
  window.__player = player; // dipakai skrip uji otomatis
}

// Petunjuk isian yang sesuai jenjang: anak SD tidak perlu membaca soal bilangan negatif
function numHint(kelas) {
  if (kelasOf(kelas).jenjang !== 'SD') return getLang() === 'en' ? t('hint.default') : undefined;
  return +kelasOf(kelas).no >= 4 ? t('hint.sdHigh') : t('hint.sdLow');
}

export function viewLatihan(id) {
  const entry = LESSONS.get(id);
  if (!entry) return viewNotFound();
  const { bab, i } = entry;
  setKelas(bab.kelas);
  if (!auth.canOpen(id)) return lockView('materi');
  const loc = localLesson(entry.lesson);
  const title = loc.lesson.title;
  setTitle(t('latihan.title', { no: `${bab.no}.${i + 1}`, title }));
  const isLastInBab = i === bab.lessons.length - 1;
  const nx = nextLessonId(id);
  const nxOpen = nx && auth.canOpen(nx);
  app.innerHTML = `${topbar('app')}<main id="main" class="page-quiz"></main>`;
  bindTopbar();
  renderQuiz(app.querySelector('#main'), {
    id,
    title: t('latihan.title', { no: `${bab.no}.${i + 1}`, title }),
    backHref: `#/bab/${bab.id}`,
    backLabel: t('bab.short', { no: bab.no, title: babTitle(bab) }),
    build: () => buildSession(id, loc.quiz, sessionSize(bab.kelas), { lang: getLang() }),
    fresh: hasGen(id),
    onAnswer: (q, ok) => store.recordAnswer(id, q.key, ok),
    masteryOf: () => mastery(id),
    nextHref: !auth.hasAccess ? (auth.loggedIn ? '#/paket' : '#/daftar?next=paket') : isLastInBab ? `#/uji/${bab.id}` : nxOpen ? lessonHref(nx) : null,
    nextLabel: !auth.hasAccess ? t('lock.after') : isLastInBab ? t('latihan.toUji', { no: bab.no }) : nxOpen ? t('latihan.nextMateri', { title: lessonTitle(LESSONS.get(nx).lesson) }) : '',
    numHint: numHint(bab.kelas),
  });
}

// Uji bab: SD 15 soal, SMP/SMA 20 soal. Satu soal dari tiap materi dulu, lalu soal bank dan
// soal generator diacak sampai cukup. Kunci soal tetap dicatat untuk analisis guru.
function pickUji(b) {
  const n = ujiSize(b.kelas);
  const lang = getLang();
  const pool = b.lessons.map((l) => shuffle(localLesson(l).quiz.map((q, i) => ({ ...q, key: `${l.id}#${i}` }))));
  const picked = [];
  pool.forEach((qs) => qs.length && picked.push(qs.shift()));
  const rest = shuffle([...pool.flat(), ...localExtra(b).map((q, i) => ({ ...q, key: `${b.id}#x${i}` }))]);
  const withGen = b.lessons.filter((l) => hasGen(l.id));
  const gens = [];
  for (let k = 0; withGen.length && gens.length < n; k++) {
    const l = withGen[k % withGen.length];
    gens.push(genQuestion(l.id, Math.floor(Math.random() * localGenCount(l.id)), Math.random, lang));
  }
  // separuh sisa dari bank, separuh dari generator (bila ada)
  const mix = shuffle([...rest.slice(0, Math.ceil((n - picked.length) / (gens.length ? 2 : 1))), ...gens]);
  while (picked.length < n && mix.length) picked.push(mix.shift());
  return shuffle(picked);
}

export function viewUji(id) {
  const b = BAB.find((x) => x.id === id);
  if (!b) return viewNotFound();
  setKelas(b.kelas);
  if (!auth.hasAccess) return lockView('uji');
  const title = t('uji.title', { no: b.no, title: babTitle(b) });
  setTitle(title);
  const nextBab = kelasOf(b.kelas).babs[b.no];
  app.innerHTML = `${topbar('app')}<main id="main" class="page-quiz"></main>`;
  bindTopbar();
  renderQuiz(app.querySelector('#main'), {
    id: b.id,
    title,
    backHref: `#/bab/${b.id}`,
    backLabel: t('bab.short', { no: b.no, title: babTitle(b) }),
    build: () => pickUji(b),
    fresh: true,
    onAnswer: (q, ok) => store.recordAnswer(b.id, q.key, ok),
    nextHref: nextBab ? `#/bab/${nextBab.id}` : `#/kelas/${b.kelas}`,
    nextLabel: nextBab ? t('uji.next', { no: nextBab.no, title: babTitle(nextBab) }) : t('uji.back'),
    kind: t('q.kindUji'),
    numHint: numHint(b.kelas),
  });
}

export function viewNotFound() {
  setTitle(t('nf.title'));
  app.innerHTML = `${topbar('app')}<main id="main"><div class="nf-wrap">${capie('oops', { size: 'md', say: t('capie.nf'), cls: 'nf-capie' })}${stateBox(t('nf.title'), t('nf.body'), `<a class="btn btn-primary" href="#/">${t('nf.back')}</a>`)}</div></main>`;
  bindTopbar();
}
