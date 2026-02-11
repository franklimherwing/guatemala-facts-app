// Guatemalan Facts App - Version 1.2

const app=document.getElementById("app");

let factList=[];
let index=0;
let startX=0;

function renderWelcome(){
app.innerHTML=`
<div class="container">
<h1>Guatemalan Facts</h1>
<h3>by Franklim Herwing</h3>
<button onclick="menu()">Start</button>
</div>`;
}

function menu(){
app.innerHTML=`
<div class="container">
<button onclick="playRandom()">🎲 Random</button>
<button onclick="showCategories()">📚 Categories</button>
</div>`;
}

function showCategories(){
let buttons="";
Object.keys(facts).forEach(c=>{
buttons+=`<button onclick="startCategory('${c}')">${c}</button>`;
});

app.innerHTML=`
<div class="container">
${buttons}
<button onclick="menu()">Back</button>
</div>`;
}

function startCategory(cat){
factList=[...facts[cat]];
index=0;
showCard();
}

function playRandom(){
factList=[].concat(...Object.values(facts));
factList.sort(()=>0.5-Math.random());
index=0;
showCard();
}

function showCard(){

app.innerHTML=`
<div class="container">
<div id="card" class="card">
${factList[index]}
</div>
<button onclick="next()">Next</button>
<button onclick="menu()">Back</button>
</div>`;

enableSwipe();
}

function next(){
const card=document.getElementById("card");
card.classList.add("slide-out");

setTimeout(()=>{
index=(index+1)%factList.length;
showCard();
},300);
}

function enableSwipe(){
const card=document.getElementById("card");

card.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
});

card.addEventListener("touchend",e=>{
let endX=e.changedTouches[0].clientX;

if(startX-endX>50){
next();
}
});
}

renderWelcome();
