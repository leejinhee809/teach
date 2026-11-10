/* 수업내용 PWA 서비스 워커
   - 앱 파일을 저장해 두고 인터넷이 없어도 열리게 함
   - 앱을 고쳐서 다시 올릴 때는 VERSION 숫자를 올려 주세요 (예: v2) */
const VERSION = 'v7';
const CACHE = `sueopnaeyong-${VERSION}`;
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-192.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-64.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  // 화면(index.html): 인터넷 되면 최신 파일, 안 되면 저장본
  if(req.mode === 'navigate'){
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // 아이콘·글꼴 등: 저장본 먼저, 없으면 받아서 저장
  if(url.origin === location.origin || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')){
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if(res.ok || res.type === 'opaque'){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit)));
  }
});
