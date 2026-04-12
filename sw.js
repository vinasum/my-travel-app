const CACHE_NAME = 'nagoya-v2';
// 這裡列出妳需要離線使用的檔案
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './sw.js'
];

// 1. 安裝階段：把檔案存入快取
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在預存離線檔案...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. 激活階段：清理舊版本的快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

// 3. 抓取階段：這是解決「離線畫面」的關鍵
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // 優先從網路抓取，如果失敗（斷網），則從快取拿資料
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});