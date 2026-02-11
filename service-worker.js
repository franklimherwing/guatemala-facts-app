// Guatemalan Facts App - Version 1.2

self.addEventListener("install",e=>{
e.waitUntil(
caches.open("gtfacts-v1.2").then(cache=>{
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
caches.match(e.request).then(res=>res||fetch(e.request))
);
});
