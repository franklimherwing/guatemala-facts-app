// Guatemala Facts App - Version 1.7
const APP_VERSION = "1.7";
const app = document.getElementById("app");

// State management
let lastFactIndex = -1;
let currentCategoryFacts = [];
let currentCategory = null;

// Initialize app
showStart();

// Helper function to escape HTML and prevent XSS
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Navigation functions
function showStart() {
  app.innerHTML = `
    <div class="card start-card" onclick="showOptions()">
      START
      <div class="next">Version ${APP_VERSION}</div>
    </div>`;
}

function showOptions() {
  app.innerHTML = `
    <div style="width:100%">
      <div class="card option-card" onclick="startRandom()">🎲 Random Game</div>
      <div class="card option-card" onclick="showCategories()">📚 By Category</div>
    </div>`;
}

function goBack() {
  showOptions();
}

// Random mode
function startRandom() {
  if (!facts || facts.length === 0) {
    app.innerHTML = `<div class="card fact-card">No facts available</div>`;
    return;
  }
  showRandomFact();
}

function showRandomFact() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * facts.length);
  } while (randomIndex === lastFactIndex && facts.length > 1);
  
  lastFactIndex = randomIndex;
  const fact = facts[randomIndex];
  
  app.innerHTML = `
    <div class="card fact-card" onclick="showRandomFact()">
      ${escapeHTML(fact.Fact)}
      <div class="next">📖 click for next fact (${facts.length} total)</div>
    </div>`;
}

// Category mode
function showCategories() {
  if (!facts || facts.length === 0) return;
  
  // Get unique categories and sort them
  const categories = [...new Set(facts.map(f => f.Category))].sort();
  
  app.innerHTML = `<div style="width:100%">
    <div class="back" onclick="goBack()">← Back to menu</div>
    <div class="category-grid"></div>
  </div>`;
  
  const grid = app.querySelector('.category-grid');
  
  categories.forEach(category => {
    const card = document.createElement('div');
    card.className = 'card category-card';
    card.textContent = category;
    card.addEventListener('click', () => startCategory(category));
    grid.appendChild(card);
  });
}

function startCategory(category) {
  currentCategory = category;
  currentCategoryFacts = facts.filter(f => f.Category === category);
  
  if (currentCategoryFacts.length === 0) {
    showCategories();
    return;
  }
  
  showCategoryFact();
}

function showCategoryFact() {
  const fact = currentCategoryFacts[Math.floor(Math.random() * currentCategoryFacts.length)];
  
  app.innerHTML = `
    <div style="width:100%">
      <div class="back" onclick="showCategories()">← Back to categories</div>
      <div class="card fact-card" onclick="showCategoryFact()">
        ${escapeHTML(fact.Fact)}
        <div class="next">
          📍 ${currentCategory} • ${currentCategoryFacts.length} facts • click for next
        </div>
      </div>
    </div>`;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    showOptions();
  }
  if (e.key === ' ' || e.key === 'Space') {
    e.preventDefault();
    const factCard = document.querySelector('.fact-card');
    if (factCard) factCard.click();
  }
});

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .catch(err => console.error('SW registration failed:', err));
}
