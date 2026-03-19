// FOCUS Service Worker v11
// オフライン対応：HTMLとアイコンをキャッシュする

var CACHE_NAME = 'focus-v16';
var CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// インストール時：静的ファイルをキャッシュ
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_URLS);
    })
  );
  self.skipWaiting();
});

// アクティベーション時：古いキャッシュを削除
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// フェッチ時：キャッシュ優先、なければネットワーク
// ただしAPI呼び出しはキャッシュしない
self.addEventListener('fetch', function(event) {
  var url = event.request.url;

  // API呼び出しはキャッシュしない（常にネットワーク）
  if (url.indexOf('api.anthropic.com') !== -1 ||
      url.indexOf('generativelanguage.googleapis.com') !== -1) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      });
    }).catch(function() {
      return new Response('オフラインです。インターネットに接続してください。', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })
  );
});
