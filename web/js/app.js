// Router: menghubungkan alamat (#/…) dengan halaman.
//   #/                 halaman jual
//   #/coba             materi gratis SD, SMP, SMA
//   #/masuk, #/daftar  masuk dan daftar akun
//   #/profil           pilih siapa yang belajar (akun orang tua/guru)
//   #/belajar, #/kelas/<k>   peta belajar
//   #/bab/<id>, #/materi/<id>, #/latihan/<id>, #/uji/<id>
//   #/ortu             dasbor orang tua / guru
//   #/paket            paket dan pembayaran
//   #/akun             akun, langganan, sinkronisasi, keluar
import { kelasOf } from '../content/index.js';
import { t } from './i18n.js';
import { ensureContentLang } from './l10n.js';
import { auth } from './auth.js';
import { app, cleanup, setRerender, setKelas, focusMain, topbar, bindTopbar } from './ui.js';
import { viewLanding, viewCoba } from './views/landing.js';
import { viewBelajar, viewBab, viewMateri, viewLatihan, viewUji, viewNotFound } from './views/learn.js';
import { viewMasuk, viewDaftar, viewProfil, viewOrtu, viewAkun } from './views/account.js';
import { viewPaket } from './views/paket.js';

function parse() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  const params = Object.fromEntries(new URLSearchParams(query));
  const [page, id] = path.split('/');
  return { page: page || '', id, params };
}

async function route({ keepScroll = false } = {}) {
  cleanup();
  const { page, id, params } = parse();
  if (!keepScroll) window.scrollTo({ top: 0 });
  try {
    switch (page) {
      case '':
        viewLanding();
        break;
      case 'peta': // alamat lama
        location.replace('#/belajar');
        return;
      case 'coba':
        viewCoba();
        break;
      case 'masuk':
        viewMasuk(params);
        break;
      case 'daftar':
        viewDaftar(params);
        break;
      case 'profil':
        await viewProfil();
        break;
      case 'belajar':
        viewBelajar();
        break;
      case 'kelas':
        if (!kelasOf(id)) return viewNotFound();
        setKelas(id);
        viewBelajar();
        if (!keepScroll) document.getElementById('peta')?.scrollIntoView();
        break;
      case 'bab':
        viewBab(id);
        break;
      case 'materi':
        viewMateri(id);
        break;
      case 'latihan':
        viewLatihan(id);
        break;
      case 'uji':
        viewUji(id);
        break;
      case 'ortu':
        await viewOrtu();
        break;
      case 'paket':
        viewPaket(params);
        break;
      case 'akun':
        viewAkun();
        break;
      default:
        viewNotFound();
    }
    if (!keepScroll && page !== 'kelas') focusMain();
  } catch (err) {
    console.error(err);
    app.innerHTML = `${topbar('app')}<main id="main"><div class="state-box"><h1 class="state-title">${t('err.title')}</h1><p>${t('err.body')}</p><p class="muted small">${String(err && err.message ? err.message : err).replace(/</g, '&lt;')}</p><a class="btn btn-primary" href="#/">${t('nf.back')}</a></div></main>`;
    bindTopbar();
  }
}

setRerender(() => route({ keepScroll: true }));
window.addEventListener('hashchange', () => route());
ensureContentLang().then(() => {
  route();
  // ambil ulang status langganan di latar (misalnya dibayar dari perangkat lain)
  if (auth.loggedIn) auth.refresh();
});

// ---------- PWA ----------
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
