/* MIRAX portal SW — hanya cache ikon/manifest. TIDAK cache data aplikasi atau token. */
var C = 'mirax-shell-v2', ASSETS = ['/icons/icon-192.png', '/icons/icon-512.png', '/icons/icon-180.png', '/icons/icon-32.png', '/manifest.webmanifest'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(C).then(function (c) { return c.addAll(ASSETS); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (x) { return x !== C; }).map(function (x) { return caches.delete(x); })); })); self.clients.claim(); });
self.addEventListener('fetch', function (e) { var u = new URL(e.request.url); if (u.origin !== location.origin || ASSETS.indexOf(u.pathname) < 0) return; e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); })); });
