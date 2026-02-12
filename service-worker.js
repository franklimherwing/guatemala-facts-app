const CACHE_NAME="facts-app-v1.5";

const FILES=[
"./",
"./index.html",
"./style.css",
"./app.js",
"./facts.js",
"./manifest.json"
];

self.addEventListener("install",e=>{
self.skipWaiting();
e.waitUntil(
caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES))
);
});

self.addEventListener("activate",e=>{
e.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
);
})
);
self.clients.claim();
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(r=>r||fetch(e.request))
);
});
