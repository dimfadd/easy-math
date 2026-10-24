// Uji PWA: service worker terpasang, manifest valid, dan aplikasi tetap jalan saat offline.
// Pakai: BASE=http://localhost:8765/ node tests/offline.cjs
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE + '#/');
  await page.waitForSelector('.bab-list');
  const sw = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return !!reg.active;
  });
  const manifest = await page.evaluate(async () => {
    const href = document.querySelector('link[rel=manifest]').href;
    const m = await (await fetch(href)).json();
    return { name: m.name, icons: m.icons.length, display: m.display, start: m.start_url };
  });
  // kunjungi beberapa halaman agar ikut tersimpan
  for (const h of ['#/bab/b1', '#/materi/b1-2', '#/latihan/b1-2', '#/bab/b8', '#/materi/b8-3']) {
    await page.goto(BASE + h);
    await page.waitForTimeout(400);
  }
  await page.reload();
  await page.waitForTimeout(800);
  await ctx.setOffline(true);
  let offlineOk = true;
  for (const h of ['#/', '#/materi/b1-2', '#/latihan/b1-2', '#/materi/b8-3', '#/uji/b5']) {
    try {
      await page.goto(BASE + h, { waitUntil: 'load' });
      await page.waitForSelector('.bab-list, .stage, .q-card', { timeout: 5000 });
    } catch (e) {
      offlineOk = false;
      console.log('offline gagal:', h, e.message.split('\n')[0]);
    }
  }
  console.log(JSON.stringify({ serviceWorkerAktif: sw, manifest, offlineOk, errors }, null, 1));
  await browser.close();
  process.exitCode = sw && offlineOk && !errors.length ? 0 : 1;
})();
