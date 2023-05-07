//Offline page service worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

const offlineFallbackPage = "offline.html";
const offlineFallbackPageStyle1 = "/css/style.css"
const offlineFallbackPageStyle2 = "/css/pages/offline.css"
const offlineFallbackPageImg = "/assets/images/pages/offline/offline.png"

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll([
        offlineFallbackPage,
        offlineFallbackPageStyle1,
        offlineFallbackPageStyle2,
        offlineFallbackPageImg
      ]))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(offlineFallbackPage))
    );
  }
});
