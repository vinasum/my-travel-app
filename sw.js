self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // 暫時不處理快取，僅滿足 PWA 基本要求
});