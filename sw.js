// Sofra service worker — offline app shell. Bump VERSION on every deploy that changes files.
const VERSION = 'sofra-v78';
const FILES = [
  './',
  'index.html',
  'css/app.css',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'js/store.js',
  'js/art.js',
  'js/i18n.js',
  'js/app.js',
  'js/planner.js',
  'js/data/ingredients.js',
  'js/data/recipes-trad.js',
  'js/data/recipes-sweet.js',
  'js/data/recipes-sweet2.js',
  'js/data/guides.js',
  'js/data/recipes-books.js',
  'js/data/recipes-meals.js',
  'js/data/recipes-slo.js',
  'js/data/recipes-more.js',
  'js/data/recipes-combo.js',
  'js/data/recipes-extra.js',
  'js/data/recipes-salads.js',
  'js/pdf.js',
  'js/nutrition.js',
  'js/data/nutrition.js',
  'js/pdf-fonts.js',
  'fonts/DejaVuSans.ttf',
  'fonts/DejaVuSans-Bold.ttf',
  'fonts/DejaVuSans-Oblique.ttf',
  'fonts/DejaVuSerif-Bold.ttf',
  'js/data/index.js'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    // fonts: cache first, so the app keeps its look offline
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); return res;
    })));
    return;
  }
  if (url.origin !== location.origin) return;
  // network first (fresh after deploy), cache fallback (offline)
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
