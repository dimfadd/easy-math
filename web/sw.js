// Service worker: aplikasi tetap bisa dibuka tanpa internet setelah kunjungan pertama.
// Strategi: file inti di-cache saat instal; file lain di-cache saat pertama diminta,
// lalu disajikan dari cache sambil diperbarui di latar (stale-while-revalidate).
const VERSION = 'easymath-v73';
const CORE = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './js/player.js',
  './js/shapes.js',
  './js/quiz.js',
  './js/store.js',
  './js/speech.js',
  './js/brand.js',
  './js/demos.js',
  './js/i18n.js',
  './js/l10n.js',
  './content/index.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './fonts/nunito-latin-400-normal.woff2',
  './fonts/nunito-latin-700-normal.woff2',
  './fonts/nunito-latin-800-normal.woff2',
  './fonts/fraunces-latin-600-normal.woff2',
  './fonts/fredoka-latin-500-normal.woff2',
  './fonts/fredoka-latin-600-normal.woff2',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html')),
    );
    return;
  }

  e.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req).then((hit) => {
        const net = fetch(req)
          .then((res) => {
            if (res && res.ok) cache.put(req, res.clone());
            return res;
          })
          .catch(() => hit);
        return hit || net;
      }),
    ),
  );
});
