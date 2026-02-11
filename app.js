const APP_VERSION = "1.3";

let currentIndex = 0;

const factText = document.getElementById("factText");
const card = document.getElementById("card");

function showFact(index){
    card.classList.add("fade-out");
    setTimeout(()=>{
        factText.textContent = facts[index];
        card.classList.remove("fade-out");
    },250);
}

function nextFact(){
    currentIndex++;
    if(currentIndex>=facts.length){currentIndex=0;}
    showFact(currentIndex);
}

function prevFact(){
    currentIndex--;
    if(currentIndex<0){currentIndex=facts.length-1;}
    showFact(currentIndex);
}

showFact(currentIndex);

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('service-worker.js');
}
