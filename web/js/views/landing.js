// Halaman jual (landing page) dan halaman "coba gratis".
import { LESSONS } from '../../content/index.js';
import { Stage, stageSVG, compileLesson } from '../player.js';
import { spansHTML } from '../shapes.js';
import { t, getLang } from '../i18n.js';
import { jenjangName, kelasName, lessonTitle, lessonHook, babTitle } from '../l10n.js';
import { kelasOf } from '../../content/index.js';
import { DEMOS } from '../demos.js';
import { FREE, TRIAL_DAYS } from '../config.js';
import { auth } from '../auth.js';
import { app, topbar, bindTopbar, setCurrent, reduceMotion, ICON, lessonHref, practiceHref, setTitle, contentFacts, fmt } from '../ui.js';
import { planCards } from './paket.js';

const demoText = (D) => (getLang() === 'en' && D.en ? { ...D, ...D.en } : D);

function mountDemo(fig) {
  const el = fig.querySelector('.demo-stage');
  el.innerHTML = stageSVG('');
  const svg = el.querySelector('svg');
  const stage = new Stage(svg);
  const compiled = DEMOS.map((d) => compileLesson(d.lesson));
  const $ = (s) => fig.querySelector(s);
  const dots = [...fig.querySelectorAll('.demo-dot')];
  let d = 0;
  let i = 0;
  let timer = null;

  const label = (k) => {
    const D = demoText(DEMOS[k]);
    $('.demo-badge').textContent = D.badge;
    $('.demo-title').textContent = D.title;
    $('.demo-cap').textContent = D.cap;
    $('.demo-link').href = D.href;
    svg.setAttribute('aria-label', t('home.demoAria', { badge: D.badge, title: D.title, cap: D.cap }));
    dots.forEach((b, j) => b.setAttribute('aria-current', j === k ? 'true' : 'false'));
  };
  const showDemo = (k, { frame = 0 } = {}) => {
    d = (k + DEMOS.length) % DEMOS.length;
    i = frame;
    label(d);
    stage.render(compiled[d][i].state, { instant: true });
  };
  const tick = () => {
    const frames = compiled[d];
    const last = i === frames.length - 1;
    const wait = last ? 2600 : i === 0 ? 900 : 1200;
    timer = setTimeout(() => {
      if (last) {
        fig.classList.add('demo-fade');
        timer = setTimeout(() => {
          showDemo(d + 1);
          fig.classList.remove('demo-fade');
          tick();
        }, 260);
        return;
      }
      i++;
      stage.render(frames[i].state, { instant: false });
      tick();
    }, wait);
  };
  dots.forEach((b, j) =>
    b.addEventListener('click', () => {
      clearTimeout(timer);
      if (reduceMotion) return showDemo(j, { frame: compiled[j].length - 1 });
      showDemo(j);
      tick();
    }),
  );
  if (reduceMotion) {
    showDemo(0, { frame: compiled[0].length - 1 });
    return { destroy() {} };
  }
  showDemo(0);
  tick();
  return { destroy: () => clearTimeout(timer) };
}

function demoFigure() {
  return `<figure class="hero-demo">
    <div class="demo-top"><span class="demo-badge"></span><span class="demo-title"></span></div>
    <div class="demo-stage"></div>
    <figcaption class="demo-foot">
      <span class="demo-cap"></span>
      <span class="demo-nav">
        <span class="demo-dots" role="group" aria-label="${t('home.demoGroup')}">${DEMOS.map((D0, j) => {
          const D = demoText(D0);
          return `<button type="button" class="demo-dot" aria-label="${t('home.demoN', { n: j + 1, badge: D.badge, title: D.title })}"></button>`;
        }).join('')}</span>
        <a class="demo-link" href="#/">${t('home.demoOpen')}</a>
      </span>
    </figcaption>
  </figure>`;
}

// Kartu materi gratis per jenjang
function freeLessonCards(j) {
  return FREE[j]
    .map((id) => {
      const e = LESSONS.get(id);
      const k = kelasOf(e.kelas);
      return `<article class="free-card">
        <p class="free-meta"><span class="tag tag-free">${t('learn.free')}</span><span>${kelasName(k)} · ${t('bab.label', { no: e.bab.no })}</span></p>
        <h3>${lessonTitle(e.lesson)}</h3>
        <p class="free-hook">${spansHTML(lessonHook(e.lesson) || '')}</p>
        <p class="free-sub">${babTitle(e.bab)}</p>
        <div class="free-act"><a class="btn btn-primary btn-sm" href="${lessonHref(id)}">${ICON.play}<span>${t('free.watch')}</span></a><a class="btn btn-ghost btn-sm" href="${practiceHref(id)}">${t('free.practice', { n: e.lesson.quiz.length })}</a></div>
      </article>`;
    })
    .join('');
}

function freeTabs(id = 'free') {
  const tabs = Object.keys(FREE);
  return `<div class="free-tabs" role="tablist" aria-label="${t('free.tabs')}">${tabs
    .map((j, k) => `<button type="button" role="tab" id="${id}-t-${j}" aria-controls="${id}-p" aria-selected="${k === 0}" data-j="${j}">${jenjangName(j)}</button>`)
    .join('')}</div>
    <div class="free-grid" id="${id}-p" role="tabpanel" aria-labelledby="${id}-t-${tabs[0]}">${freeLessonCards(tabs[0])}</div>`;
}
function bindFreeTabs(id = 'free') {
  const tabs = [...app.querySelectorAll('.free-tabs [role="tab"]')];
  const panel = app.querySelector(`#${id}-p`);
  const pick = (b) => {
    tabs.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    panel.setAttribute('aria-labelledby', b.id);
    panel.innerHTML = freeLessonCards(b.dataset.j);
  };
  tabs.forEach((b, k) => {
    b.addEventListener('click', () => pick(b));
    b.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const nb = tabs[(k + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      nb.focus();
      pick(nb);
    });
  });
}

const feat = (icon, key) => `<article class="feat"><span class="feat-ic" aria-hidden="true">${ICON[icon]}</span><h3>${t(`feat.${key}.t`)}</h3><p>${t(`feat.${key}.b`)}</p></article>`;

export function viewLanding() {
  setTitle('');
  const f = contentFacts();
  const nFree = Object.values(FREE).flat().length;
  const ctaMain = auth.loggedIn ? `<a class="btn btn-primary btn-lg" href="#/belajar">${t('land.openApp')}</a>` : `<a class="btn btn-primary btn-lg" href="#/coba">${t('land.ctaTry')}</a>`;
  app.innerHTML = `
    ${topbar('landing')}
    <main id="main" class="landing">
      <section class="hero">
        <div class="hero-text">
          <p class="pill">${t('home.pill')}</p>
          <h1>${spansHTML(t('brand.tagline'))}</h1>
          <p class="lead">${t('land.lead')}</p>
          <div class="hero-cta">${ctaMain}<a class="btn btn-ghost btn-lg" href="#harga">${t('land.ctaPlans')}</a></div>
          <ul class="trust">
            <li>${ICON.check}${t('land.trust1', { n: nFree })}</li>
            <li>${ICON.check}${t('land.trust2')}</li>
            <li>${ICON.check}${t('land.trust3')}</li>
          </ul>
        </div>
        ${demoFigure()}
      </section>

      <section class="facts" aria-label="${t('home.factsAria')}">
        <div class="fact"><strong>${fmt(f.materi)}</strong><span>${t('fact.materi')}</span></div>
        <div class="fact"><strong>${fmt(f.soal)}</strong><span>${t('fact.soal')}</span></div>
        <div class="fact"><strong>${t('fact.kelas')}</strong><span>${t('fact.kelasSub')}</span></div>
        <div class="fact"><strong>${t('fact.offline')}</strong><span>${t('fact.offlineSub')}</span></div>
      </section>

      <section class="sec sec-problem" aria-labelledby="masalah-h">
        <h2 id="masalah-h">${t('land.probH')}</h2>
        <p class="sec-lead">${t('land.probLead')}</p>
        <div class="grid3">
          <article class="pain"><h3>${t('land.pain1.t')}</h3><p>${t('land.pain1.b')}</p></article>
          <article class="pain"><h3>${t('land.pain2.t')}</h3><p>${t('land.pain2.b')}</p></article>
          <article class="pain"><h3>${t('land.pain3.t')}</h3><p>${t('land.pain3.b')}</p></article>
        </div>
      </section>

      <section id="cara" class="sec" aria-labelledby="cara-h">
        <p class="kicker">${t('land.howKicker')}</p>
        <h2 id="cara-h">${t('land.howH')}</h2>
        <p class="sec-lead">${t('land.howLead')}</p>
        <ol class="steps3">
          <li><span class="step-no">1</span><h3>${t('land.step1.t')}</h3><p>${t('land.step1.b')}</p></li>
          <li><span class="step-no">2</span><h3>${t('land.step2.t')}</h3><p>${t('land.step2.b')}</p></li>
          <li><span class="step-no">3</span><h3>${t('land.step3.t')}</h3><p>${t('land.step3.b')}</p></li>
        </ol>
      </section>

      <section id="unggul" class="sec" aria-labelledby="unggul-h">
        <p class="kicker">${t('land.whyKicker')}</p>
        <h2 id="unggul-h">${t('land.whyH')}</h2>
        <div class="grid3 feats">
          ${feat('bulb', 'concept')}${feat('chat', 'explain')}${feat('books', 'complete')}${feat('chart', 'report')}${feat('wifi', 'offline')}${feat('globe', 'lang')}
        </div>
      </section>

      <section class="sec" aria-labelledby="banding-h">
        <h2 id="banding-h">${t('land.cmpH')}</h2>
        <div class="cmp-wrap">
          <table class="cmp">
            <thead><tr><th scope="col"><span class="sr-only">${t('land.cmpAspect')}</span></th><th scope="col">${t('land.cmpOld')}</th><th scope="col" class="cmp-us">${t('land.cmpNew')}</th></tr></thead>
            <tbody>
              ${[1, 2, 3, 4, 5].map((n) => `<tr><th scope="row">${t(`land.cmp${n}.a`)}</th><td>${t(`land.cmp${n}.o`)}</td><td class="cmp-us">${ICON.check}<span>${t(`land.cmp${n}.n`)}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <section id="coba" class="sec" aria-labelledby="coba-h">
        <p class="kicker">${t('land.freeKicker')}</p>
        <h2 id="coba-h">${t('land.freeH', { n: nFree })}</h2>
        <p class="sec-lead">${t('land.freeLead')}</p>
        ${freeTabs()}
      </section>

      <section id="ortu" class="sec sec-split" aria-labelledby="ortu-h">
        <div>
          <p class="kicker">${t('land.parentKicker')}</p>
          <h2 id="ortu-h">${t('land.parentH')}</h2>
          <p class="sec-lead">${t('land.parentLead')}</p>
          <ul class="ticks">
            <li>${ICON.check}${t('land.parent1')}</li>
            <li>${ICON.check}${t('land.parent2')}</li>
            <li>${ICON.check}${t('land.parent3')}</li>
            <li>${ICON.check}${t('land.parent4')}</li>
          </ul>
        </div>
        <figure class="mock-report" aria-label="${t('land.mockAria')}">
          <p class="mock-h">${t('land.mockH')}</p>
          <div class="mock-row"><span>${t('land.mockA')}</span><span class="m-ok">${t('dash.mastered')}</span></div>
          <span class="meter"><span style="transform:scaleX(.92)" class="m-okbar"></span></span>
          <div class="mock-row"><span>${t('land.mockB')}</span><span class="m-cur">${t('bab.cur')}</span></div>
          <span class="meter"><span style="transform:scaleX(.55)"></span></span>
          <div class="mock-row"><span>${t('land.mockC')}</span><span class="m-bad">${t('dash.needHelp')}</span></div>
          <span class="meter"><span style="transform:scaleX(.25)" class="m-badbar"></span></span>
          <p class="mock-note">${t('land.mockNote')}</p>
          <figcaption class="muted small">${t('land.mockCap')}</figcaption>
        </figure>
      </section>

      <section id="harga" class="sec" aria-labelledby="harga-h">
        <p class="kicker">${t('land.priceKicker')}</p>
        <h2 id="harga-h">${t('land.priceH')}</h2>
        <p class="sec-lead">${t('land.priceLead', { d: TRIAL_DAYS })}</p>
        ${planCards({ landing: true })}
      </section>

      <section class="sec faq" aria-labelledby="faq-h">
        <h2 id="faq-h">${t('land.faqH')}</h2>
        ${[1, 2, 3, 4, 5, 6].map((n) => `<details><summary>${t(`faq${n}.q`)}</summary><p>${t(`faq${n}.a`, { d: TRIAL_DAYS })}</p></details>`).join('')}
      </section>

      <section class="final-cta">
        <h2>${t('land.finalH')}</h2>
        <p>${t('land.finalB')}</p>
        <div class="hero-cta">${ctaMain}<a class="btn btn-ghost btn-lg" href="#/daftar">${t('land.finalSignup')}</a></div>
      </section>

      <footer class="foot land-foot">
        <p>${t('land.foot')}</p>
        <p class="foot-links"><a href="#/coba">${t('nav.free')}</a><a href="#/paket">${t('nav.price')}</a><a href="#/masuk">${t('nav.login')}</a><a href="#/belajar">${t('nav.catalog')}</a></p>
      </footer>
    </main>`;
  bindTopbar();
  bindFreeTabs();
  setCurrent(mountDemo(app.querySelector('.hero-demo')));
}

export function viewCoba() {
  setTitle(t('free.title'));
  app.innerHTML = `
    ${topbar(auth.loggedIn ? 'app' : 'landing')}
    <main id="main" class="landing">
      <header class="coba-head">
        <p class="pill">${t('land.freeKicker')}</p>
        <h1>${t('free.title')}</h1>
        <p class="lead">${t('free.lead')}</p>
      </header>
      ${Object.keys(FREE)
        .map((j) => `<section class="sec coba-sec" aria-labelledby="coba-${j}"><h2 id="coba-${j}">${jenjangName(j)}</h2><div class="free-grid">${freeLessonCards(j)}</div></section>`)
        .join('')}
      <section class="final-cta">
        <h2>${t('free.moreH')}</h2>
        <p>${t('free.moreB')}</p>
        <div class="hero-cta"><a class="btn btn-primary btn-lg" href="${auth.loggedIn ? '#/paket' : '#/daftar?next=paket'}">${t('free.moreCta', { d: TRIAL_DAYS })}</a><a class="btn btn-ghost btn-lg" href="#/belajar">${t('nav.catalog')}</a></div>
      </section>
    </main>`;
  bindTopbar();
}
