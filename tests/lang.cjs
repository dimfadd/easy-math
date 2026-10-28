// Uji mode bahasa Inggris: buka semua materi, latihan, dan uji bab; tidak boleh ada error.
// Jalankan: BASE=http://localhost:8765/ node tests/lang.cjs
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(`${p.url()} ${e.message}`));
  p.on('console', (m) => m.type() === 'error' && errs.push(`${p.url()} ${m.text()}`));
  await p.goto(BASE + '#/masuk');
  await p.click('.demo-acc[data-email="ortu@demo.id"]');
  await p.waitForURL(/#\/ortu/);
  await p.click('.lang-seg [data-lang="en"]');
  await p.waitForTimeout(500);
  const { ids, babs } = await p.evaluate(async () => {
    const m = await import('./content/index.js');
    return { ids: m.ORDER, babs: m.BAB.map((x) => x.id) };
  });
  for (const id of ids) {
    await p.goto(BASE + `#/materi/${id}`);
    await p.waitForSelector('.stage');
    await p.goto(BASE + `#/latihan/${id}`);
    await p.waitForSelector('.q-card');
  }
  for (const id of babs) {
    await p.goto(BASE + `#/bab/${id}`);
    await p.waitForSelector('.lesson-list');
    await p.goto(BASE + `#/uji/${id}`);
    await p.waitForSelector('.q-card');
  }
  const lang = await p.evaluate(() => document.documentElement.lang);
  if (lang !== 'en') errs.push('lang bukan en: ' + lang);
  await b.close();
  if (errs.length) {
    console.log(errs.length + ' masalah:');
    errs.slice(0, 30).forEach((e) => console.log(' - ' + e));
    process.exitCode = 1;
  } else console.log(`Mode bahasa Inggris lolos: ${ids.length} materi, ${babs.length} bab.`);
})();
