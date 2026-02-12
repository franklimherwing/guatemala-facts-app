// Guatemala Facts App - Version 1.11
const APP_VERSION = "1.11";
const app = document.getElementById("app");

// State management
let lastFactIndex = -1;
let currentCategoryFacts = [];
let currentCategory = null;

// Footer credit text (shortened version)
const FOOTER_CREDIT = "© Built by Franklim D. Herwing • Trinity EV Guatemala 2026 Mission";

// Debug - verify facts loaded
console.log("Guatemala Facts App v" + APP_VERSION);
console.log("Facts loaded:", facts ? facts.length : 0);

// Initialize app
window.onload = function() {
  showStart();
};

// Helper function to escape HTML and prevent XSS
function escapeHTML(text) {
  if (!text) return "";
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Navigation functions
window.showStart = function() {
  app.innerHTML = `
    <div style="width:100%; display:flex; flex-direction:column; min-height:100vh;">
      <div style="flex:1; display:flex; flex-direction:column; justify-content:center;">
        <div class="card start-card" onclick="showOptions()">
          🇬🇹
          <div style="font-size: 0.7em; margin-top: 20px;">START</div>
          <div class="next">Version ${APP_VERSION}</div>
        </div>
      </div>
      <div class="footer">${FOOTER_CREDIT}</div>
    </div>`;
};

window.showOptions = function() {
  app.innerHTML = `
    <div style="width:100%; display:flex; flex-direction:column; min-height:100vh;">
      <div style="flex:1; display:flex; flex-direction:column; justify-content:center;">
        <div class="card option-card" onclick="startRandom()">
          🎲 Random Game
          <div class="next">surprise me!</div>
        </div>
        <div class="card option-card" onclick="showCategories()">
          📚 By Category
          <div class="next">choose a topic</div>
        </div>
      </div>
      <div class="footer">${FOOTER_CREDIT}</div>
    </div>`;
};

window.goHome = function() {
  showStart();
};

window.goBack = function() {
  showOptions();
};

// Random mode
window.startRandom = function() {
  if (!facts || facts.length === 0) {
    app.innerHTML = `<div class="card fact-card">No facts available</div>`;
    return;
  }
  showRandomFact();
};

window.showRandomFact = function() {
  if (!facts || facts.length === 0) return;
  
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * facts.length);
  } while (randomIndex === lastFactIndex && facts.length > 1);
  
  lastFactIndex = randomIndex;
  const fact = facts[randomIndex];
  
  app.innerHTML = `
    <div style="width:100%; display:flex; flex-direction:column; min-height:100vh;">
      <div style="flex:1; display:flex; flex-direction:column;">
        <div class="nav-buttons">
          <div class="back" onclick="goBack()">← Menu</div>
          <div class="home" onclick="goHome()">🏠 Home</div>
        </div>
        <div class="card fact-card" onclick="showRandomFact()">
          <div class="fact-text">${escapeHTML(fact.Fact)}</div>
          <div class="next">
            📖 tap for next • ${facts.length} facts
          </div>
        </div>
      </div>
      <div class="footer">${FOOTER_CREDIT}</div>
    </div>`;
};

// Category mode
window.showCategories = function() {
  if (!facts || facts.length === 0) return;
  
  // Get unique categories and sort them
  const categories = [...new Set(facts.map(f => f.Category))].sort();
  
  app.innerHTML = `
    <div style="width:100%; display:flex; flex-direction:column; min-height:100vh;">
      <div style="flex:1; display:flex; flex-direction:column;">
        <div class="nav-buttons">
          <div class="back" onclick="goBack()">← Menu</div>
          <div class="home" onclick="goHome()">🏠 Home</div>
        </div>
        <div class="category-grid"></div>
      </div>
      <div class="footer">${FOOTER_CREDIT}</div>
    </div>`;
  
  const grid = app.querySelector('.category-grid');
  if (!grid) return;
  
  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'card category-card';
    card.textContent = category;
    card.onclick = function() { startCategory(category); };
    grid.appendChild(card);
  });
};

window.startCategory = function(category) {
  currentCategory = category;
  currentCategoryFacts = facts.filter(f => f.Category === category);
  
  if (currentCategoryFacts.length === 0) {
    showCategories();
    return;
  }
  
  showCategoryFact();
};

window.showCategoryFact = function() {
  if (!currentCategoryFacts || currentCategoryFacts.length === 0) {
    showCategories();
    return;
  }
  
  const fact = currentCategoryFacts[Math.floor(Math.random() * currentCategoryFacts.length)];
  
  app.innerHTML = `
    <div style="width:100%; display:flex; flex-direction:column; min-height:100vh;">
      <div style="flex:1; display:flex; flex-direction:column;">
        <div class="nav-buttons">
          <div class="back" onclick="showCategories()">← Categories</div>
          <div class="home" onclick="goHome()">🏠 Home</div>
        </div>
        <div class="card fact-card" onclick="showCategoryFact()">
          <div class="fact-text">${escapeHTML(fact.Fact)}</div>
          <div class="next">
            📍 ${currentCategory} • ${currentCategoryFacts.length} facts • tap for next
          </div>
        </div>
      </div>
      <div class="footer">${FOOTER_CREDIT}</div>
    </div>`;
};

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    goHome();
  }
  if (e.key === ' ' || e.key === 'Space') {
    e.preventDefault();
    const factCard = document.querySelector('.fact-card');
    if (factCard) factCard.click();
  }
  if (e.key === 'b' || e.key === 'B') {
    e.preventDefault();
    const backButton = document.querySelector('.back');
    if (backButton) backButton.click();
  }
});

// Touch optimization for mobile
document.addEventListener('touchstart', function(){}, {passive: true});

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .catch(function(err) {
      console.error('SW registration failed:', err);
    });
}
