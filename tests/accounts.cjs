// Uji alur akun, kunci materi, pembayaran tiruan, dan sinkronisasi.
// Pakai: BASE=http://localhost:8765/ node tests/accounts.cjs
const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8765/';

const fails = [];
const check = (name, ok) => {
  if (!ok) fails.push(name);
};

(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  const go = async (h, sel) => {
    await p.goto(BASE + h);
    if (sel) await p.waitForSelector(sel);
  };
  const logout = async () => {
    await go('#/akun', '[data-act="logout"]');
    await p.click('[data-act="logout"]');
    await p.waitForTimeout(200);
  };

  // tamu: materi gratis terbuka, materi lain terkunci
  await go('#/', '.hero-demo');
  await go('#/materi/k1b6-1', '.stage');
  check('tamu bisa membuka materi gratis', !!(await p.$('.stage')));
  await go('#/materi/k3b1-1', '.state-box');
  check('tamu melihat kunci di materi berbayar', !!(await p.$('.lock-box')));
  await go('#/uji/k1b6', '.state-box');
  check('uji bab terkunci untuk tamu', !!(await p.$('.lock-box')));

  // kata sandi salah
  await go('#/masuk', '#f-acc');
  await p.fill('#email', 'ortu@demo.id');
  await p.fill('#pass', 'salah');
  await p.click('#f-acc button[type="submit"]');
  await p.waitForSelector('.form-err');
  check('kata sandi salah ditolak', !!(await p.$('.form-err')));

  // orang tua tanpa langganan → bayar → terbuka
  await p.click('.demo-acc[data-email="ortu.baru@demo.id"]');
  await p.waitForURL(/#\/ortu/);
  await go('#/materi/k5b2-1', '.state-box');
  check('akun tanpa langganan terkunci', !!(await p.$('.lock-box')));
  await go('#/paket', '[data-act="pay"]');
  await p.click('[data-act="pay"]');
  await p.waitForSelector('[data-act="paid"]');
  check('tagihan QRIS tampil', !!(await p.$('.qr')));
  await p.click('[data-act="paid"]');
  await p.waitForSelector('.success-box');
  await go('#/materi/k5b2-1', '.stage, .state-box');
  check('setelah bayar materi terbuka', !!(await p.$('.stage')));

  // sinkronisasi: progres Dimas di perangkat ini terkirim ke "server" dan muncul di dasbor
  await go('#/profil', '[data-pid="p_dimas"]');
  await p.click('[data-pid="p_dimas"]');
  await p.waitForURL(/#\/belajar/);
  await p.evaluate(async () => {
    const { store } = await import('./js/store.js');
    store.markWatched('k5b2-2');
    store.saveScore('k5b2-2', 1, 5);
  });
  await p.waitForTimeout(2500);
  const synced = await p.evaluate(() => JSON.parse(localStorage.getItem('easymath.mockdb.v1')).progress.p_dimas.watched['k5b2-2']);
  check('progres terkirim ke server', !!synced);
  await go('#/ortu', '.child-card');
  const att = await p.textContent('.child-card');
  check('dasbor menampilkan materi bernilai rendah', /benar 1 dari 5|1 of 5/.test(att));
  await logout();

  // anak masuk dengan PIN memakai langganan orang tuanya, progres gabungan ikut
  await go('#/masuk?tab=anak', '#f-kid');
  await p.fill('#uname', 'dimas');
  await p.fill('#pin', '1234');
  await p.click('#f-kid button[type="submit"]');
  await p.waitForURL(/#\/belajar/);
  await p.waitForTimeout(800);
  const kidWatched = await p.evaluate(async () => {
    const { store } = await import('./js/store.js');
    return store.isWatched('k5b2-2');
  });
  check('anak melihat progres yang sama', kidWatched);
  await go('#/materi/k5b3-1', '.stage, .state-box');
  check('anak ikut langganan orang tua', !!(await p.$('.stage')));
  await logout();

  // PIN salah
  await go('#/masuk?tab=anak', '#f-kid');
  await p.fill('#uname', 'raka');
  await p.fill('#pin', '0000');
  await p.click('#f-kid button[type="submit"]');
  await p.waitForSelector('.form-err');
  check('PIN salah ditolak', !!(await p.$('.form-err')));

  // daftar akun baru + uji coba
  await go('#/daftar', '#f-su');
  await p.fill('#nm', 'Uji Coba');
  await p.fill('#em', `uji${Date.now()}@contoh.id`);
  await p.fill('#pw', 'rahasia1');
  await p.click('#f-su button[type="submit"]');
  await p.waitForURL(/#\/profil/);
  await p.click('[data-act="add"]');
  await p.fill('#cn', 'Ani');
  await p.selectOption('#ck', '2');
  await p.click('#f-add button[type="submit"]');
  await p.waitForSelector('.prof-card:not(.prof-add)');
  await go('#/paket', '[data-act="trial"]');
  await p.click('[data-act="trial"]');
  await p.waitForSelector('.success-box');
  await go('#/uji/k2b1', '.q-card, .state-box');
  check('uji coba membuka uji bab', !!(await p.$('.q-card')));

  // kembalikan data demo agar uji berikutnya mulai dari keadaan awal
  await p.evaluate(() => localStorage.clear());
  await b.close();
  if (errs.length) fails.push(...errs.map((e) => 'pageerror: ' + e));
  if (fails.length) {
    console.log(fails.length + ' gagal:');
    fails.forEach((f) => console.log(' - ' + f));
    process.exitCode = 1;
  } else console.log('Semua uji akun lolos.');
})();
