const app=document.getElementById("app");

function showStart(){
app.innerHTML=`
<div class="card start-card" onclick="showOptions()">
START
<div class="next">Version ${APP_VERSION}</div>
</div>`;
}

function showOptions(){
app.innerHTML=`
<div>
<div class="card option-card" onclick="startRandom()">Random Game</div>
<div class="card option-card" onclick="showCategories()">By Category</div>
</div>`;
}

function startRandom(){
showRandomFact();
}

function showRandomFact(){
let fact=facts[Math.floor(Math.random()*facts.length)];

app.innerHTML=`
<div class="card fact-card" onclick="showRandomFact()">
${fact.Fact}
<div class="next">next</div>
</div>`;
}

function showCategories(){

let categories=[...new Set(facts.map(f=>f.Category))];

let html="<div>";

categories.forEach(c=>{
html+=`<div class="card category-card" onclick="startCategory('${c}')">${c}</div>`;
});

html+="</div>";

app.innerHTML=html;
}

let currentCategoryFacts=[];

function startCategory(cat){
currentCategoryFacts=facts.filter(f=>f.Category===cat);
showCategoryFact();
}

function showCategoryFact(){
let fact=currentCategoryFacts[Math.floor(Math.random()*currentCategoryFacts.length)];

app.innerHTML=`
<div class="card fact-card" onclick="showCategoryFact()">
${fact.Fact}
<div class="next">next</div>
</div>`;
}

showStart();
