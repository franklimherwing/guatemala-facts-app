// Guatemalan Facts App - Version 1.1

const app=document.getElementById("app");
let currentFacts=[];
let index=0;
let categoryName="";

function transition(render){
app.classList.add("fade-out");
setTimeout(()=>{
render();
app.classList.remove("fade-out");
},300);
}

function speak(text){
const msg=new SpeechSynthesisUtterance(text);
speechSynthesis.speak(msg);
}

function welcome(){
transition(()=>{
app.innerHTML=`
<div class="container">
<h1>Welcome to Guatemalan Facts</h1>
<h3>by Franklim Herwing</h3>
<button onclick="menu()">Start</button>
</div>`;
});
}

function menu(){
transition(()=>{
app.innerHTML=`
<div class="container">
<h2>Main Menu</h2>
<button onclick="playRandom()">🎲 Play Random</button>
<button onclick="categories()">📚 Play by Categories</button>
<button onclick="quiz()">🧠 Quiz Mode</button>
<input class="search" placeholder="Search facts..." oninput="searchFacts(this.value)">
<div id="searchResults"></div>
</div>`;
});
}

function categories(){
let buttons="";
for(let c in facts){
buttons+=`<button onclick="startCategory('${c}')">📌 ${c}</button>`;
}

transition(()=>{
app.innerHTML=`<div class="container">
<h2>Select Category</h2>
${buttons}
<button onclick="menu()">Back</button>
</div>`;
});
}

function startCategory(cat){
categoryName=cat;
currentFacts=[...facts[cat]];
index=0;
showFact();
}

function playRandom(){
const all=[].concat(...Object.values(facts));
categoryName="Random Facts";
currentFacts=all.sort(()=>0.5-Math.random());
index=0;
showFact();
}

function showFact(){
transition(()=>{
app.innerHTML=`
<div class="container">
<h2>${categoryName}</h2>
<p>${currentFacts[index]}</p>
<div class="progress">${index+1} / ${currentFacts.length}</div>
<button onclick="nextFact()">Next</button>
<button onclick="speak(currentFacts[index])">🔊 Listen</button>
<button onclick="menu()">Back</button>
</div>`;
});
}

function nextFact(){
index=(index+1)%currentFacts.length;
showFact();
}

function searchFacts(text){
let results="";
for(let cat in facts){
facts[cat].forEach(f=>{
if(f.toLowerCase().includes(text.toLowerCase())){
results+=`<p>${f}</p>`;
}
});
}
document.getElementById("searchResults").innerHTML=results;
}

function quiz(){
const all=[].concat(...Object.values(facts));
const fact=all[Math.floor(Math.random()*all.length)];

transition(()=>{
app.innerHTML=`
<div class="container">
<h2>Quiz Mode</h2>
<p>Read this fact aloud:</p>
<p>${fact}</p>
<button onclick="speak('${fact}')">Play Audio</button>
<button onclick="menu()">Back</button>
</div>`;
});
}

welcome();

