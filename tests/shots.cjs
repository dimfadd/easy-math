// Ambil gambar panggung tiap langkah (ukuran HP) + halaman utama di 3 ukuran layar.
// Pakai: BASE=http://localhost:8765/ OUT=folder [ONLY=b1-2] node tests/shots.cjs
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const BASE = process.env.BASE || 'http://localhost:8765/';
const OUT = process.env.OUT || 'shots';
const ONLY = (process.env.ONLY || '').split(',').filter(Boolean);
const PAGES = (process.env.PAGES || '1') === '1';
(async () => {
  const browser = await chromium.launch();
  const vps = { hp: { width: 390, height: 844 }, tablet: { width: 820, height: 1180 }, laptop: { width: 1440, height: 900 } };
  for (const theme of ['light', 'dark']) {
    for (const [name, vp] of Object.entries(vps)) {
      if (!PAGES && !(name === 'hp' && theme === 'light')) continue;
      const ctx = await browser.newContext({ viewport: vp, colorScheme: theme });
      const page = await ctx.newPage();
      await page.goto(BASE + '#/');
      await page.waitForSelector('.bab-list');
      const ids = await page.evaluate(async () => (await import('./content/index.js')).ORDER);
      if (PAGES) {
        fs.mkdirSync(path.join(OUT, 'pages'), { recursive: true });
        await page.waitForTimeout(2500);
        await page.screenshot({ path: path.join(OUT, 'pages', `${theme}-${name}-home.png`), fullPage: true });
        await page.goto(BASE + '#/bab/b1');
        await page.waitForSelector('.lesson-list');
        await page.screenshot({ path: path.join(OUT, 'pages', `${theme}-${name}-bab.png`), fullPage: true });
        await page.goto(BASE + `#/materi/${ids[1]}`);
        await page.waitForSelector('.stage');
        await page.evaluate(() => window.__player.show(9, { instant: true }));
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(OUT, 'pages', `${theme}-${name}-materi.png`), fullPage: false });
        await page.goto(BASE + `#/latihan/${ids[0]}`);
        await page.waitForSelector('.q-card');
        await page.click('.q-opts .opt >> nth=1');
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(OUT, 'pages', `${theme}-${name}-latihan.png`), fullPage: true });
      }
      if (name === 'hp' && theme === 'light') {
        for (const id of ids) {
          if (ONLY.length && !ONLY.includes(id)) continue;
          const dir = path.join(OUT, id);
          fs.mkdirSync(dir, { recursive: true });
          await page.goto(BASE + `#/materi/${id}`);
          await page.waitForSelector('.stage');
          const n = await page.evaluate(() => window.__player.frames.length);
          const wrap = await page.$('.stage-wrap');
          for (let i = 0; i < n; i++) {
            await page.evaluate((i) => window.__player.show(i, { instant: true }), i);
            await page.waitForTimeout(50);
            await wrap.screenshot({ path: path.join(dir, `f${String(i + 1).padStart(3, '0')}.png`) });
          }
        }
      }
      await ctx.close();
    }
  }
  await browser.close();
})();
