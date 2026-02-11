// Guatemalan Facts App - Version 1.1

self.addEventListener("install",e=>{
e.waitUntil(
caches.open("gtfacts-v1.1").then(cache=>{
return cache.addAll([
"./",
"./index.html",
"./style.css",
"./app.js",
"./facts.js"
]);
})
);
});

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(res=>{
return res||fetch(e.request);
})
);
});

