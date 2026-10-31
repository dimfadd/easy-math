// Uji sistem guru, siswa, dan orang tua: kode kelas, tugas, analisis soal, gabung kelas, target.
// Pakai: BASE=http://localhost:8765/ node tests/roles.cjs
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';

const fails = [];
const check = (name, ok) => ok || fails.push(name);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  const logout = async () => {
    await p.goto(BASE + '#/akun');
    await p.click('[data-act="logout"]');
  };
  await p.goto(BASE + '#/masuk');
  await p.evaluate(() => localStorage.clear());
  await p.goto(BASE + '#/masuk');

  // guru: dasbor kelas
  await p.click('.demo-acc[data-email="guru@demo.id"]');
  await p.waitForSelector('.code-card');
  check('kode kelas tampil', (await p.textContent('.code')).trim() === 'HRP7A2');
  check('4 tugas contoh', (await p.$$('.task-row')).length === 4);
  check('matriks siswa', (await p.$$('.mx tbody tr')).length === 3);
  check('analisis soal tersedia', (await p.$$('.hard-list li')).length > 0);
  await p.click('[data-act="task"]');
  await p.selectOption('#tk-kind', 'materi');
  await p.click('#f-task button[type="submit"]');
  await p.waitForFunction(() => document.querySelectorAll('.task-row').length === 5);
  check('guru bisa memberi tugas', true);
  await p.click('[data-act="student"]');
  await p.fill('#stu-name', 'Dewi');
  await p.click('#f-stu button[type="submit"]');
  await p.waitForSelector('.banner.ok');
  check('guru bisa menambah siswa', (await p.$$('.mx tbody tr')).length === 4);
  await logout();

  // siswa dari akun guru melihat tugas
  await p.goto(BASE + '#/masuk?tab=anak');
  await p.fill('#uname', 'ayu');
  await p.fill('#pin', '1234');
  await p.click('#f-kid button[type="submit"]');
  await p.waitForURL(/#\/belajar/);
  await p.waitForSelector('.tasks', { timeout: 5000 }).catch(() => {});
  check('siswa melihat tugas dari guru', (await p.$$('.tasks .task-row')).length > 0);
  check('kartu runtutan dan target', !!(await p.$('.habit')));
  await logout();

  // orang tua: anak bergabung ke kelas dengan kode, atur target
  await p.goto(BASE + '#/masuk');
  await p.click('.demo-acc[data-email="ortu@demo.id"]');
  await p.waitForSelector('.child-card');
  check('tombol ringkasan WhatsApp', (await p.getAttribute('.child-card a[href^="https://wa.me/"]', 'href')).includes('wa.me/?text='));
  const oldSel = await p.$('[data-goal="p_raka"]');
  await p.selectOption('[data-goal="p_raka"]', '5');
  await p.waitForFunction((el) => !el.isConnected, oldSel);
  await p.waitForSelector('[data-goal="p_raka"]');
  check('target mingguan tersimpan', (await p.inputValue('[data-goal="p_raka"]')) === '5');
  await p.locator('[data-join="p_raka"]').evaluate((f) => (f.closest('details').open = true));
  await p.fill('[data-join="p_raka"] input', 'salah1');
  await p.click('[data-join="p_raka"] button');
  await p.waitForFunction(() => /tidak ditemukan|not found/.test(document.querySelector('[data-join="p_raka"]')?.parentElement.querySelector('.join-msg')?.textContent || ''));
  check('kode kelas salah ditolak', true);
  await p.fill('[data-join="p_raka"] input', 'hrp7a2');
  await p.click('[data-join="p_raka"] button');
  await p.waitForSelector('.kid-tasks', { timeout: 5000 }).catch(() => {});
  check('tugas guru muncul di kartu anak', !!(await p.$('.kid-tasks')));

  await p.evaluate(() => localStorage.clear());
  await b.close();
  if (errs.length) fails.push(...errs.map((e) => 'pageerror: ' + e));
  if (fails.length) {
    console.log(fails.length + ' gagal:');
    fails.forEach((f) => console.log(' - ' + f));
    process.exitCode = 1;
  } else console.log('Semua uji peran lolos.');
})();
