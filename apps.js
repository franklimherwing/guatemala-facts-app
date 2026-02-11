const app = document.getElementById("app");

function showWelcome(){
app.innerHTML = `
<div class="container">
<h1>Welcome to Guatemalan Facts</h1>
<h3>by Franklim Herwing</h3>
<button onclick="showMenu()">Start</button>
</div>
`;
}

function showMenu(){
app.innerHTML = `
<div class="container">
<h2>Select Mode</h2>
<button onclick="playRandom()">Play Random</button>
<button onclick="showCategories()">Play by Categories</button>
</div>
`;
}

function showCategories(){
let buttons="";
for(let category in facts){
buttons+=`<button onclick="playCategory('${category}')">${category}</button>`;
}

app.innerHTML=`
<div class="container">
<h2>Categories</h2>
${buttons}
<button onclick="showMenu()">Back</button>
</div>
`;
}

function playRandom(){
const categories=Object.keys(facts);
const randomCategory=categories[Math.floor(Math.random()*categories.length)];
playCategory(randomCategory);
}

function playCategory(category){
const factList=facts[category];
let index=0;

function render(){
app.innerHTML=`
<div class="container">
<h2>${category}</h2>
<p>${factList[index]}</p>
<button onclick="next()">Next Fact</button>
<button onclick="showMenu()">Back</button>
</div>
`;
}

window.next=function(){
index=(index+1)%factList.length;
render();
}

render();
}

showWelcome();
