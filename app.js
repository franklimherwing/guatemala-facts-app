const APP_VERSION="1.5";

const app=document.getElementById("app");

function clearApp(){
app.innerHTML="";
}

function createCard(text,size,click){
const div=document.createElement("div");
div.className="card "+size;
div.innerHTML=text+"<div class='small-next'>next</div>";
div.onclick=click;
return div;
}

function showStart(){
clearApp();
app.appendChild(createCard("START","big",showMenu));
}

function showMenu(){
clearApp();

app.appendChild(createCard("Random Game","big",startRandom));
app.appendChild(createCard("By Category","big",showCategories));
}

function startRandom(){
let shuffled=[...facts].sort(()=>Math.random()-0.5);
playFacts(shuffled);
}

function showCategories(){
clearApp();

let categories=[...new Set(facts.map(f=>f.Category))];

categories.forEach(cat=>{
app.appendChild(createCard(cat,"medium",()=>{
let filtered=facts.filter(f=>f.Category===cat);
playFacts(filtered);
}));
});
}

function playFacts(list){
let index=0;

function next(){
clearApp();

if(index>=list.length) index=0;

let fact=list[index];

app.appendChild(createCard(
"<b>"+fact.Title+"</b><br><br>"+fact.Fact,
"big",
()=>{
index++;
next();
}
));

}

next();
}

showStart();

if('serviceWorker' in navigator){
navigator.serviceWorker.register('service-worker.js');
}
