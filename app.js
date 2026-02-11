// ===== Facts Flashcard App v2.0 =====

let filteredFacts = [];
let currentIndex = 0;

// Elements
const factText = document.getElementById("factText");
const nextBtn = document.getElementById("nextBtn");
const randomBtn = document.getElementById("randomBtn");
const searchBox = document.getElementById("searchBox");
const counter = document.getElementById("counter");
const darkBtn = document.getElementById("darkBtn");
const card = document.getElementById("card");

// ===== INIT =====
function initApp() {
    if (!Array.isArray(facts) || facts.length === 0) {
        factText.textContent = "No facts loaded.";
        return;
    }

    filteredFacts = [...facts];
    currentIndex = 0;
    showFact();
}

// ===== SHOW FACT =====
function showFact() {

    if (filteredFacts.length === 0) {
        factText.textContent = "No matching facts.";
        counter.textContent = "0 / 0";
        return;
    }

    card.style.opacity = 0;

    setTimeout(() => {
        factText.textContent = filteredFacts[currentIndex];
        counter.textContent =
            (currentIndex + 1) + " / " + filteredFacts.length;
        card.style.opacity = 1;
    }, 180);
}

// ===== NEXT FACT =====
nextBtn.addEventListener("click", () => {

    if (filteredFacts.length === 0) return;

    currentIndex++;

    if (currentIndex >= filteredFacts.length) {
        currentIndex = 0;
    }

    showFact();
});

// ===== RANDOM FACT =====
randomBtn.addEventListener("click", () => {

    if (filteredFacts.length === 0) return;

    currentIndex = Math.floor(
        Math.random() * filteredFacts.length
    );

    showFact();
});

// ===== SEARCH =====
searchBox.addEventListener("input", () => {

    const value = searchBox.value.trim().toLowerCase();

    filteredFacts = facts.filter(f =>
        f.toLowerCase().includes(value)
    );

    currentIndex = 0;
    showFact();
});

// ===== DARK MODE =====
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// ===== SWIPE SUPPORT =====
let startX = 0;

card.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

card.addEventListener("touchend", e => {

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
        nextBtn.click(); // swipe left
    } else {
        randomBtn.click(); // swipe right
    }
});

// ===== SERVICE WORKER =====
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
            .catch(err => console.log("SW failed:", err));
    });
}

// ===== START APP =====
initApp();
