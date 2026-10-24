// Uji asap: buka semua halaman di 3 ukuran layar, putar semua langkah animasi,
// kerjakan semua latihan, dan laporkan error, overflow, objek keluar panggung, serta teks bertumpuk.
// Pakai: jalankan server statis untuk folder web/, lalu
//   BASE=http://localhost:8765/ node tests/smoke.cjs
// Opsi: SHOTS=folder  -> simpan gambar panggung tiap langkah (ukuran HP) untuk dicek mata.
//       ONLY=b1-2     -> uji satu materi saja.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'http://localhost:8765/';
const SHOTS = process.env.SHOTS || '';
const ONLY = process.env.ONLY || '';
const VPS = {
  hp: { width: 390, height: 844 },
  tablet: { width: 820, height: 1180 },
  laptop: { width: 1440, height: 900 },
};

const problems = [];
const warn = (m) => problems.push(m);

async function overflow(page, tag) {
  const o = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (o > 1) warn(`${tag}: overflow horizontal ${o}px`);
}

async function validateContent(page) {
  const issues = await page.evaluate(async () => {
    const { BAB } = await import('./content/index.js');
    const out = [];
    const ids = new Set();
    for (const b of BAB) {
      for (const l of b.lessons) {
        if (ids.has(l.id)) out.push(`id ganda ${l.id}`);
        ids.add(l.id);
        if (!l.quiz || l.quiz.length < 5) out.push(`${l.id}: soal latihan kurang dari 5`);
        const qs = [...(l.quiz || [])];
        l.chapters.forEach((c) => c.steps.forEach((s) => s.ask && qs.push({ ...s.ask, q: s.ask.q || '(ask)' })));
        for (const q of qs) {
          if (q.type === 'num') {
            if (!q.ans || !q.ans.length) out.push(`${l.id}: soal isian tanpa kunci: ${q.q}`);
          } else {
            const ok = (q.options || []).filter((o) => o.ok).length;
            if (ok !== 1) out.push(`${l.id}: soal punya ${ok} jawaban benar: ${q.q}`);
            for (const o of q.options || []) if (!o.ok && !o.why) out.push(`${l.id}: opsi salah tanpa penjelasan "${o.t}" di: ${q.q}`);
          }
        }
        for (const c of l.chapters) for (const s of c.steps) if (!s.say) out.push(`${l.id}/${c.title}: langkah tanpa narasi`);
      }
      for (const q of b.extra || []) {
        if (q.type !== 'num' && (q.options || []).filter((o) => o.ok).length !== 1) out.push(`${b.id} extra: jumlah jawaban benar salah: ${q.q}`);
      }
    }
    return out;
  });
  issues.forEach((m) => warn(`konten: ${m}`));
}

async function checkFrames(page, id, vpName) {
  const res = await page.evaluate(() => {
    const P = window.__player;
    const out = [];
    const svg = document.querySelector('.stage');
    P.pause();
    for (let i = 0; i < P.frames.length; i++) {
      P.show(i, { instant: true });
      const sr = svg.getBoundingClientRect();
      const k = 400 / sr.width;
      const boxes = [];
      svg.querySelectorAll('.layer > .el').forEach((g) => {
        if (g.__removing) return;
        const op = parseFloat(g.style.opacity || '1');
        if (op < 0.05) return;
        const r = g.getBoundingClientRect();
        if (!r.width && !r.height) {
          out.push(`langkah ${i + 1}: "${g.dataset.id}" tidak tergambar (kosong)`);
          return;
        }
        boxes.push({ id: g.dataset.id, t: g.dataset.t, x: (r.left - sr.left) * k, y: (r.top - sr.top) * k, w: r.width * k, h: r.height * k });
      });
      for (const b of boxes) {
        if (b.x < -3 || b.y < -3 || b.x + b.w > 403 || b.y + b.h > 303)
          out.push(`langkah ${i + 1}: "${b.id}" keluar panggung (${Math.round(b.x)},${Math.round(b.y)},${Math.round(b.w)}x${Math.round(b.h)})`);
      }
      const texts = boxes.filter((b) => b.t === 'text' || b.t === 'frac');
      for (let a = 0; a < texts.length; a++)
        for (let c = a + 1; c < texts.length; c++) {
          const A = texts[a];
          const B = texts[c];
          const ox = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x);
          const oy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
          if (ox > 4 && oy > 4) out.push(`langkah ${i + 1}: teks "${A.id}" dan "${B.id}" bertumpuk`);
        }
    }
    return out;
  });
  res.forEach((m) => warn(`[${vpName}] ${id} ${m}`));
}

async function shootFrames(page, id) {
  const dir = path.join(SHOTS, id);
  fs.mkdirSync(dir, { recursive: true });
  const n = await page.evaluate(() => window.__player.frames.length);
  const wrap = await page.$('.stage-wrap');
  for (let i = 0; i < n; i++) {
    await page.evaluate((i) => window.__player.show(i, { instant: true }), i);
    await page.waitForTimeout(60);
    await wrap.screenshot({ path: path.join(dir, `f${String(i + 1).padStart(3, '0')}.png`) });
  }
}

async function runQuiz(page, hash, tag) {
  await page.goto(BASE + hash);
  await page.waitForSelector('.q-card, .state-box');
  for (let guard = 0; guard < 30; guard++) {
    if (await page.$('.result')) break;
    await overflow(page, `${tag} soal ${guard + 1}`);
    if (await page.$('.q-opts .opt')) {
      await page.click('.q-opts .opt');
    } else if (await page.$('.q-num input')) {
      await page.fill('.q-num input', '0');
      await page.click('.q-num button');
    } else {
      warn(`${tag}: soal tanpa pilihan atau isian`);
      break;
    }
    await page.waitForSelector('[data-next]');
    await page.click('[data-next]');
  }
  if (!(await page.$('.result'))) warn(`${tag}: halaman hasil tidak muncul`);
  await overflow(page, `${tag} hasil`);
}

(async () => {
  const browser = await chromium.launch();
  for (const [vpName, vp] of Object.entries(VPS)) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => warn(`[${vpName}] pageerror: ${e.message}`));
    page.on('console', (m) => {
      if (m.type() === 'error' || m.type() === 'warning') warn(`[${vpName}] console.${m.type()}: ${m.text()}`);
    });
    await page.goto(BASE + '#/');
    await page.waitForSelector('.bab-list');
    await overflow(page, `[${vpName}] beranda`);
    if (vpName === 'hp') await validateContent(page);
    const { ids, babs } = await page.evaluate(async () => {
      const m = await import('./content/index.js');
      return { ids: m.ORDER, babs: m.BAB.map((b) => b.id) };
    });
    for (const b of babs) {
      await page.goto(BASE + `#/bab/${b}`);
      await page.waitForSelector('.lesson-list');
      await overflow(page, `[${vpName}] bab ${b}`);
    }
    for (const id of ids) {
      if (ONLY && id !== ONLY) continue;
      await page.goto(BASE + `#/materi/${id}`);
      await page.waitForSelector('.stage');
      await page.waitForTimeout(100);
      await overflow(page, `[${vpName}] materi ${id}`);
      await checkFrames(page, id, vpName);
      if (SHOTS && vpName === 'hp') await shootFrames(page, id);
      // putar sungguhan sebentar
      await page.evaluate(() => window.__player.show(0, { instant: true }));
      await page.click('[data-act="toggle"]');
      await page.waitForTimeout(1500);
      if (await page.$('.ask:not([hidden]) .opt')) {
        await page.click('.ask .opt');
        await page.click('.ask [data-cont]');
      }
      await page.waitForTimeout(500);
      if (vpName === 'hp') await runQuiz(page, `#/latihan/${id}`, `[${vpName}] latihan ${id}`);
    }
    if (!ONLY) for (const b of babs) await runQuiz(page, `#/uji/${b}`, `[${vpName}] uji ${b}`);
    await page.goto(BASE + '#/tidak-ada');
    await page.waitForSelector('.state-box');
    await ctx.close();
  }
  await browser.close();
  if (problems.length) {
    console.log(`${problems.length} masalah:`);
    problems.forEach((p) => console.log(' - ' + p));
    process.exitCode = 1;
  } else console.log('Semua pemeriksaan lolos.');
})();
