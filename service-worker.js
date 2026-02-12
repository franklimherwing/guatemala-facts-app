const CACHE_NAME="guatemala-facts-v1.6";

const FILES_TO_CACHE=[
"./",
"index.html",
"style.css",
"app.js",
"facts.js",
"manifest.json"
];

self.addEventListener("install",event=>{
self.skipWaiting();
event.waitUntil(
caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES_TO_CACHE))
);
});

self.addEventListener("activate",event=>{
event.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.filter(k=>k!==CACHE_NAME)
.map(k=>caches.delete(k))
);
})
);
self.clients.claim();
});

self.addEventListener("fetch",event=>{
event.respondWith(
caches.match(event.request).then(response=>{
return response||fetch(event.request);
})
);
});
