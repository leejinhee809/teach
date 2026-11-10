// 앱을 고쳐서 다시 올릴 때마다 아래 숫자를 하나씩 올려 주세요 (v19 → v20)
const CACHE = 'isaem-v19';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  // AI(구글) 요청처럼 다른 주소나 GET이 아닌 요청은 그대로 인터넷으로 보냄
  if(e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
