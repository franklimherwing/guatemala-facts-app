// Guatemala Facts App — Auto Update Service Worker
// Version 2 — Auto Refresh + Cache Cleanup

const APP_VERSION = "1.4";
const CACHE_NAME = "gtfacts-auto-" + APP_VERSION;

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/facts.js",
  "/manifest.json"
];

// INSTALL — cache new files immediately
self.addEventListener("install", event => {
  console.log("SW installing version:", APP_VERSION);

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// ACTIVATE — remove old caches automatically
self.addEventListener("activate", event => {
  console.log("SW activating version:", APP_VERSION);

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// FETCH — always try network first, fallback to cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const clone = response.clone();

        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });

        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
