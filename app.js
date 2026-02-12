const app=document.getElementById("app");
let currentFacts=[];
let index=0;

document.addEventListener("DOMContentLoaded",()=>{
showStart();
registerSW();
});

function showStart(){
app.innerHTML=`
<div class="flashcard start" onclick="showModes()">
<h2>START</h2>
<div class="next">next</div>
</div>
`;
}

function showModes(){
app.innerHTML=`
<div class="flashcard large" onclick="startRandom()">
Random Game
<div class="next">next</div>
</div>

<div class="flashcard large" onclick="showCategories()">
By Category
<div class="next">next</div>
</div>
`;
}

function startRandom(){
currentFacts=[...facts].filter(f=>f.active);
shuffle(currentFacts);
index=0;
showFact();
}

function showCategories(){
const cats=[...new Set(facts.map(f=>f.category))];

app.innerHTML="";

cats.forEach(c=>{
app.innerHTML+=`
<div class="flashcard medium" onclick="startCategory('${c}')">
${c}
<div class="next">next</div>
</div>
`;
});
}

function startCategory(cat){
currentFacts=facts.filter(f=>f.category===cat && f.active);
shuffle(currentFacts);
index=0;
showFact();
}

function showFact(){
if(currentFacts.length===0){
showStart();
return;
}

const f=currentFacts[index];

app.innerHTML=`
<div class="flashcard large" onclick="nextFact()">
<h3>${f.title}</h3>
<p>${f.fact}</p>
<div class="next">next</div>
</div>
`;
}

function nextFact(){
index++;
if(index>=currentFacts.length){
index=0;
shuffle(currentFacts);
}
showFact();
}

function shuffle(array){
for(let i=array.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[array[i],array[j]]=[array[j],array[i]];
}
}

function registerSW(){
if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js");
}
}
