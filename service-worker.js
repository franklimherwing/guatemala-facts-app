const APP_VERSION="1.5";
const CACHE_NAME="gtfacts-"+APP_VERSION;

const FILES=[
"/",
"/index.html",
"/style.css",
"/app.js",
"/facts.js",
"/manifest.json"
];

self.addEventListener("install",e=>{
self.skipWaiting();
e.waitUntil(
caches.open(CACHE_NAME).then(c=>c.addAll(FILES))
);
});

self.addEventListener("activate",e=>{
e.waitUntil(
caches.keys().then(keys=>{
return Promise.all(
keys.map(k=>{
if(k!==CACHE_NAME){
return caches.delete(k);
}
})
);
})
);
self.clients.claim();
});

self.addEventListener("fetch",e=>{
e.respondWith(
fetch(e.request).catch(()=>caches.match(e.request))
);
});
