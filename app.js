let currentLanguage="ES";
let map;
let markers=[];

document.addEventListener("DOMContentLoaded",()=>{
renderFacts(facts);
buildCategories();
initMap();
registerSW();

document.getElementById("search").addEventListener("input",e=>{
searchFacts(e.target.value);
});
});

function renderFacts(data){
const container=document.getElementById("facts-container");
container.innerHTML="";

markers.forEach(m=>map.removeLayer(m));
markers=[];

data.forEach(f=>{
if(!f.active) return;

container.innerHTML+=`
<div class="fact-card">
<h3>${f.title}</h3>
<img src="${f.imageUrl}" loading="lazy">
<p>${f.fact}</p>
<button onclick="toggleFavorite(${f.id})">⭐</button>
</div>
`;

if(f.latitude && f.longitude){
const marker=L.marker([f.latitude,f.longitude]).addTo(map)
.bindPopup(f.title);
markers.push(marker);
}
});
}

function buildCategories(){
const cats=[...new Set(facts.map(f=>f.category))];
const container=document.getElementById("categories");
container.innerHTML="";

cats.forEach(c=>{
container.innerHTML+=`
<button onclick="filterCategory('${c}')">${c}</button>
`;
});
}

function filterCategory(cat){
renderFacts(facts.filter(f=>f.category===cat));
}

function searchFacts(term){
const filtered=facts.filter(f=>
f.title.toLowerCase().includes(term.toLowerCase())
);
renderFacts(filtered);
}

function randomFact(){
const rand=facts[Math.floor(Math.random()*facts.length)];
renderFacts([rand]);
}

function toggleFavorite(id){
let favs=JSON.parse(localStorage.getItem("favorites")||"[]");

if(favs.includes(id)){
favs=favs.filter(f=>f!==id);
}else{
favs.push(id);
}
localStorage.setItem("favorites",JSON.stringify(favs));
}

function toggleLanguage(){
currentLanguage=currentLanguage==="ES"?"EN":"ES";
alert("Language: "+currentLanguage);
}

function initMap(){
map=L.map('map').setView([15.5,-90.25],7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:18
}).addTo(map);
}

function registerSW(){
if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js");
}
}
