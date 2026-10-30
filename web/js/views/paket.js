// Paket langganan dan pembayaran (tiruan). Alurnya sama dengan gerbang pembayaran sungguhan:
// pilih paket → pilih metode → tagihan dibuat → pengguna membayar → server menerima konfirmasi.
// Di prototipe, langkah konfirmasi dipicu tombol "Simulasikan pembayaran berhasil".
import * as api from '../api.js';
import { t } from '../i18n.js';
import { auth } from '../auth.js';
import { PLANS, PAY_METHODS, TRIAL_DAYS, MAX_CHILDREN, rupiah } from '../config.js';
import { app, topbar, bindTopbar, ICON, setTitle, fmtDate, esc } from '../ui.js';
import { capie } from '../capie.js';

const perMonth = (p) => Math.round(p.price / p.months);
const saving = () => {
  const m = PLANS.find((p) => p.months === 1);
  const y = PLANS.find((p) => p.months === 12);
  return m && y ? Math.round((1 - y.price / (m.price * 12)) * 100) : 0;
};

const FEATURES = ['plan.f1', 'plan.f2', 'plan.f3', 'plan.f4', 'plan.f5'];

export function planCards({ landing = false, selected = null } = {}) {
  const sv = saving();
  const cards = PLANS.map((p) => {
    const sel = selected ? selected === p.id : p.best;
    const cta = landing
      ? `<a class="btn ${p.best ? 'btn-primary' : 'btn-ghost'}" href="#/paket?plan=${p.id}">${t('plan.choose')}</a>`
      : `<button type="button" class="btn ${sel ? 'btn-primary' : 'btn-ghost'}" data-plan="${p.id}" aria-pressed="${sel}">${sel ? t('plan.chosen') : t('plan.choose')}</button>`;
    return `<article class="plan${p.best ? ' plan-best' : ''}${sel && !landing ? ' plan-sel' : ''}">
      <div class="plan-top"><h3>${t(`plan.${p.id}`)}</h3>${p.best ? `<span class="plan-badge">${t('plan.save', { n: sv })}</span>` : ''}</div>
      <p class="plan-price"><strong>${rupiah(p.price)}</strong><span>/${t(p.months === 1 ? 'plan.month' : 'plan.year')}</span></p>
      <p class="plan-sub">${p.months === 1 ? t('plan.monthSub') : t('plan.yearSub', { pm: rupiah(perMonth(p)) })}</p>
      <ul class="ticks">${FEATURES.map((k) => `<li>${ICON.check}${t(k, { n: MAX_CHILDREN })}</li>`).join('')}</ul>
      ${cta}
    </article>`;
  }).join('');
  const school = `<article class="plan plan-school">
      <div class="plan-top"><h3>${t('plan.school')}</h3></div>
      <p class="plan-price"><strong>${t('plan.schoolPrice')}</strong></p>
      <p class="plan-sub">${t('plan.schoolSub')}</p>
      <ul class="ticks"><li>${ICON.check}${t('plan.s1')}</li><li>${ICON.check}${t('plan.s2')}</li><li>${ICON.check}${t('plan.s3')}</li></ul>
      <a class="btn btn-ghost" href="mailto:halo@contoh.id?subject=Paket%20Sekolah">${t('plan.contact')}</a>
    </article>`;
  return `<div class="plans">${cards}${landing ? school : ''}</div>
    <p class="plan-note">${t('plan.note', { d: TRIAL_DAYS })}</p>`;
}

// ---------- QR tiruan (bukan QRIS sungguhan) ----------
function fakeQR(seed) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => ((h = (h * 1103515245 + 12345) >>> 0) / 4294967296);
  const N = 25;
  let cells = '';
  const finder = (x, y) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) if (!finder(x, y) && rnd() > 0.52) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  const fp = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7"/><rect x="${x + 1}" y="${y + 1}" width="5" height="5" fill="#fff"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
  return `<svg class="qr" viewBox="-2 -2 29 29" role="img" aria-label="${t('pay.qrAria')}"><rect x="-2" y="-2" width="29" height="29" fill="#fff"/><g fill="#15213B">${cells}${fp(0, 0)}${fp(N - 7, 0)}${fp(0, N - 7)}</g></svg>`;
}

function invoiceBody(inv) {
  const m = inv.method;
  if (m === 'qris') return `<div class="pay-box">${fakeQR(inv.id)}<p>${t('pay.qris')}</p></div>`;
  if (m === 'va')
    return `<div class="pay-box"><p>${t('pay.vaNo')}</p><p class="va">${inv.payCode.replace(/(\d{4})/g, '$1 ').trim()}</p><p class="muted small">${t('pay.vaHow')}</p></div>`;
  if (m === 'ewallet') return `<div class="pay-box"><p>${t('pay.ewallet')}</p></div>`;
  return `<form class="pay-box card-form" onsubmit="return false">
    <label>${t('pay.cardNo')}<input inputmode="numeric" autocomplete="off" placeholder="4111 1111 1111 1111" value="4111 1111 1111 1111"></label>
    <div class="card-row"><label>${t('pay.cardExp')}<input autocomplete="off" value="12/30"></label><label>CVV<input inputmode="numeric" autocomplete="off" value="123"></label></div>
    <p class="muted small">${t('pay.cardNote')}</p>
  </form>`;
}

export function viewPaket(params = {}) {
  setTitle(t('nav.price'));
  const st = { plan: PLANS.some((p) => p.id === params.plan) ? params.plan : PLANS.find((p) => p.best).id, method: 'qris', invoice: null, done: false, busy: false, err: '' };

  const render = () => {
    const a = auth.account;
    const plan = PLANS.find((p) => p.id === st.plan);
    let body = '';
    if (!auth.loggedIn) {
      body = `${planCards({ selected: st.plan })}
        <div class="checkout-guest"><p>${t('pay.guest')}</p><div class="end-actions"><a class="btn btn-primary btn-lg" href="#/daftar?next=paket">${t('lock.signup')}</a><a class="btn btn-ghost btn-lg" href="#/masuk?next=paket">${t('nav.login')}</a></div></div>`;
    } else if (auth.role === 'anak') {
      body = `<div class="state-box"><h2 class="state-title">${t('pay.kidH')}</h2><p>${t('pay.kidB')}</p></div>`;
    } else if (st.done) {
      body = `<div class="state-box success-box">${capie('fly', { size: 'md', cls: 'pay-capie' })}<h2 class="state-title">${t('pay.okH')}</h2><p class="capie-line">${t('capie.paid')}</p><p>${t('pay.okB', { date: fmtDate(a.plan.until) })}</p><div class="end-actions"><a class="btn btn-primary btn-lg" href="${a.role === 'ortu' ? '#/profil' : '#/belajar'}">${t('pay.okCta')}</a><a class="btn btn-ghost" href="#/akun">${t('pay.okAcc')}</a></div></div>`;
    } else if (st.invoice) {
      const inv = st.invoice;
      body = `<section class="invoice" aria-labelledby="inv-h">
        <h2 id="inv-h">${t('pay.invH')}</h2>
        <dl class="inv-dl"><dt>${t('pay.invNo')}</dt><dd>${esc(inv.id)}</dd><dt>${t('pay.invPlan')}</dt><dd>${t(`plan.${inv.planId}`)}</dd><dt>${t('pay.invTotal')}</dt><dd><strong>${rupiah(inv.amount)}</strong></dd><dt>${t('pay.invDue')}</dt><dd>${fmtDate(inv.expiresAt)}</dd></dl>
        ${invoiceBody(inv)}
        <div class="demo-note"><strong>${t('pay.demoH')}</strong> ${t('pay.demoB')}</div>
        <div class="end-actions">
          <button type="button" class="btn btn-primary btn-lg" data-act="paid" ${st.busy ? 'disabled' : ''}>${st.busy ? t('pay.checking') : t('pay.simulate')}</button>
          <button type="button" class="btn btn-ghost" data-act="back">${t('pay.change')}</button>
        </div>
        ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
      </section>`;
    } else {
      const status = a.plan && api.planActive(a.plan)
        ? `<div class="banner ok"><div><strong>${a.plan.status === 'trial' ? t('pay.trialOn', { date: fmtDate(a.plan.until) }) : t('pay.activeOn', { date: fmtDate(a.plan.until) })}</strong><p>${t('pay.extend')}</p></div></div>`
        : '';
      const trial = !a.trialUsed && !api.planActive(a.plan)
        ? `<div class="banner"><div><strong>${t('pay.trialH', { d: TRIAL_DAYS })}</strong><p>${t('pay.trialB')}</p></div><div class="banner-act"><button type="button" class="btn btn-primary" data-act="trial" ${st.busy ? 'disabled' : ''}>${t('pay.trialCta', { d: TRIAL_DAYS })}</button></div></div>`
        : '';
      body = `${status}${trial}
        <h2 class="step-h"><span class="step-no">1</span>${t('pay.step1')}</h2>
        ${planCards({ selected: st.plan })}
        <h2 class="step-h"><span class="step-no">2</span>${t('pay.step2')}</h2>
        <div class="methods" role="radiogroup" aria-label="${t('pay.step2')}">
          ${PAY_METHODS.map((m) => `<label class="method${st.method === m.id ? ' on' : ''}"><input type="radio" name="method" value="${m.id}" ${st.method === m.id ? 'checked' : ''}><span>${m.id === 'card' ? t('pay.card') : m.id === 'va' ? t('pay.va') : m.label}</span></label>`).join('')}
        </div>
        <div class="summary">
          <p>${t('pay.total')} <strong>${rupiah(plan.price)}</strong> <span class="muted">· ${t(`plan.${plan.id}`)}</span></p>
          <button type="button" class="btn btn-primary btn-lg" data-act="pay" ${st.busy ? 'disabled' : ''}>${t('pay.next')}</button>
        </div>
        ${st.err ? `<p class="form-err" role="alert">${st.err}</p>` : ''}
        <p class="muted small">${t('pay.terms')}</p>`;
    }
    app.innerHTML = `${topbar('app')}<main id="main" class="page-paket">
      <header class="bab-head"><p class="pill">${t('land.priceKicker')}</p><h1>${t('pay.h')}</h1><p class="lead">${t('pay.lead')}</p></header>
      ${body}
    </main>`;
    bindTopbar();
    bind();
  };

  const run = async (fn) => {
    st.busy = true;
    st.err = '';
    render();
    try {
      await fn();
    } catch (e) {
      st.err = e && e.code === 'offline' ? t('err.offline') : t('err.generic');
    }
    st.busy = false;
    render();
  };

  const bind = () => {
    app.querySelectorAll('[data-plan]').forEach((b) =>
      b.addEventListener('click', () => {
        st.plan = b.dataset.plan;
        render();
        app.querySelector(`[data-plan="${st.plan}"]`)?.focus();
      }),
    );
    app.querySelectorAll('input[name="method"]').forEach((r) =>
      r.addEventListener('change', () => {
        st.method = r.value;
        render();
        app.querySelector(`input[value="${st.method}"]`)?.focus();
      }),
    );
    const on = (act, fn) => app.querySelector(`[data-act="${act}"]`)?.addEventListener('click', fn);
    on('pay', () => run(async () => (st.invoice = await api.createInvoice(auth.account.id, st.plan, st.method))));
    on('back', () => {
      st.invoice = null;
      render();
    });
    on('paid', () =>
      run(async () => {
        auth.setAccount(await api.simulatePaid(auth.account.id, st.invoice.id));
        st.invoice = null;
        st.done = true;
      }),
    );
    on('trial', () =>
      run(async () => {
        auth.setAccount(await api.startTrial(auth.account.id));
        st.done = true;
      }),
    );
  };
  render();
}
