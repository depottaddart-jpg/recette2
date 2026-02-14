// Recipe Data Storage
let allRecipes = [];
let displayedRecipes = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM Elements
const recipesGrid = document.getElementById('recipesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');
const favoritesBtn = document.getElementById('favoritesBtn');
const favoritesModal = document.getElementById('favoritesModal');
const favoritesModalClose = document.getElementById('favoritesModalClose');
const favoritesModalOverlay = document.getElementById('favoritesModalOverlay');
const favoritesGrid = document.getElementById('favoritesGrid');
const noFavorites = document.getElementById('noFavorites');
const favoritesCount = document.querySelector('.favorites-count');

// Initialize App
async function init() {
    try {
        loading.style.display = 'block';
        await loadRecipes();
        updateFavoritesCount();
        setupEventListeners();
        displayRecipes(allRecipes);
        calculateStats();
        loading.style.display = 'none';
    } catch (error) {
        console.error('Error initializing app:', error);
        loading.innerHTML = '<p>حدث خطأ في تحميل الوصفات. الرجاء تحديث الصفحة.</p>';
    }
}

// Load Recipes from JSON
async function loadRecipes() {
    try {
        const response = await fetch('recipes-ar.json');
        allRecipes = await response.json();
        displayedRecipes = [...allRecipes];
    } catch (error) {
        console.error('Error loading recipes:', error);
        throw error;
    }
}

// Display Recipes
function displayRecipes(recipes) {
    recipesGrid.innerHTML = '';
    
    if (recipes.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    recipes.forEach((recipe, index) => {
        const card = createRecipeCard(recipe, index);
        recipesGrid.appendChild(card);
    });
}

// Create Recipe Card
function createRecipeCard(recipe, index) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    const isFavorite = favorites.includes(recipe.id);
    
    card.innerHTML = `
        <div class="recipe-image-container">
            <div class="recipe-image-placeholder">
                ${getRecipeEmoji(recipe.title)}
            </div>
            <button class="favorite-badge ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                ${isFavorite ? '♥' : '♡'}
            </button>
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <div class="recipe-meta">
                <div class="meta-item">
                    <div class="meta-icon">⏱️</div>
                    <div class="meta-label">الوقت</div>
                    <div class="meta-value">${recipe.time}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-icon">👥</div>
                    <div class="meta-label">الحصص</div>
                    <div class="meta-value">${recipe.servings}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-icon">💰</div>
                    <div class="meta-label">التكلفة</div>
                    <div class="meta-value">${recipe.cost}</div>
                </div>
            </div>
        </div>
        <div class="recipe-footer">
            <button class="view-recipe-btn">عرض الوصفة</button>
        </div>
    `;
    
    // Event Listeners
    const favoriteBtn = card.querySelector('.favorite-badge');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(recipe.id);
    });
    
    const viewBtn = card.querySelector('.view-recipe-btn');
    viewBtn.addEventListener('click', () => showRecipeDetail(recipe));
    
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('favorite-badge')) {
            showRecipeDetail(recipe);
        }
    });
    
    return card;
}

// Get Recipe Emoji based on title
function getRecipeEmoji(title) {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('سمك') || lowerTitle.includes('ميرنا')) return '🐟';
    if (lowerTitle.includes('كيك') || lowerTitle.includes('حلو')) return '🍰';
    if (lowerTitle.includes('دجاج') || lowerTitle.includes('فراخ')) return '🍗';
    if (lowerTitle.includes('لحم') || lowerTitle.includes('بقر')) return '🥩';
    if (lowerTitle.includes('خضر') || lowerTitle.includes('سلطة')) return '🥗';
    if (lowerTitle.includes('شوربة') || lowerTitle.includes('حساء')) return '🍲';
    if (lowerTitle.includes('أرز') || lowerTitle.includes('رز')) return '🍚';
    if (lowerTitle.includes('معكرون') || lowerTitle.includes('باستا')) return '🍝';
    if (lowerTitle.includes('بيتزا')) return '🍕';
    if (lowerTitle.includes('خبز')) return '🍞';
    if (lowerTitle.includes('عصير') || lowerTitle.includes('مشروب')) return '🥤';
    if (lowerTitle.includes('قهوة')) return '☕';
    if (lowerTitle.includes('فطور')) return '🥞';
    
    return '🍽️';
}

// Show Recipe Detail Modal
function showRecipeDetail(recipe) {
    const isFavorite = favorites.includes(recipe.id);
    
    modalBody.innerHTML = `
        <div class="recipe-detail-header">
            <h2 class="recipe-detail-title">${recipe.title}</h2>
            <div class="recipe-detail-meta">
                <div class="detail-meta-item">
                    <span class="detail-meta-icon">⏱️</span>
                    <div class="detail-meta-content">
                        <span class="detail-meta-label">وقت التحضير</span>
                        <span class="detail-meta-value">${recipe.time}</span>
                    </div>
                </div>
                <div class="detail-meta-item">
                    <span class="detail-meta-icon">👥</span>
                    <div class="detail-meta-content">
                        <span class="detail-meta-label">عدد الأشخاص</span>
                        <span class="detail-meta-value">${recipe.servings}</span>
                    </div>
                </div>
                <div class="detail-meta-item">
                    <span class="detail-meta-icon">💰</span>
                    <div class="detail-meta-content">
                        <span class="detail-meta-label">التكلفة التقديرية</span>
                        <span class="detail-meta-value">${recipe.cost}</span>
                    </div>
                </div>
                <div class="detail-meta-item">
                    <button class="favorite-badge ${isFavorite ? 'active' : ''}" data-id="${recipe.id}">
                        ${isFavorite ? '♥' : '♡'}
                    </button>
                </div>
            </div>
        </div>
        
        <div class="recipe-section">
            <h3 class="recipe-section-title">المقادير</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ingredient => `
                    <li class="ingredient-item">${ingredient}</li>
                `).join('')}
            </ul>
        </div>
        
        <div class="recipe-section">
            <h3 class="recipe-section-title">طريقة التحضير</h3>
            <ol class="instructions-list">
                ${recipe.instructions.map(instruction => `
                    <li class="instruction-item">${instruction}</li>
                `).join('')}
            </ol>
        </div>
        
        ${recipe.chef_tip ? `
            <div class="recipe-section">
                <div class="tip-box">
                    <strong>نصيحة الطاهي:</strong> ${recipe.chef_tip}
                </div>
            </div>
        ` : ''}
        
        ${recipe.presentation ? `
            <div class="recipe-section">
                <h3 class="recipe-section-title">التقديم</h3>
                <p>${recipe.presentation}</p>
            </div>
        ` : ''}
    `;
    
    // Add favorite toggle to modal
    const modalFavoriteBtn = modalBody.querySelector('.favorite-badge');
    if (modalFavoriteBtn) {
        modalFavoriteBtn.addEventListener('click', () => {
            toggleFavorite(recipe.id);
            showRecipeDetail(recipe); // Refresh modal
        });
    }
    
    recipeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Recipe Modal
function closeRecipeModal() {
    recipeModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle Favorite
function toggleFavorite(recipeId) {
    const index = favorites.indexOf(recipeId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(recipeId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
    
    // Update all favorite buttons for this recipe
    const allFavoriteBtns = document.querySelectorAll(`[data-id="${recipeId}"]`);
    allFavoriteBtns.forEach(btn => {
        const isFavorite = favorites.includes(recipeId);
        btn.classList.toggle('active', isFavorite);
        btn.textContent = isFavorite ? '♥' : '♡';
    });
    
    // Refresh favorites modal if open
    if (favoritesModal.classList.contains('active')) {
        showFavoritesModal();
    }
}

// Update Favorites Count
function updateFavoritesCount() {
    favoritesCount.textContent = favorites.length;
}

// Show Favorites Modal
function showFavoritesModal() {
    const favoriteRecipes = allRecipes.filter(recipe => favorites.includes(recipe.id));
    
    favoritesGrid.innerHTML = '';
    
    if (favoriteRecipes.length === 0) {
        noFavorites.style.display = 'block';
        favoritesGrid.style.display = 'none';
    } else {
        noFavorites.style.display = 'none';
        favoritesGrid.style.display = 'grid';
        
        favoriteRecipes.forEach((recipe, index) => {
            const card = createRecipeCard(recipe, index);
            favoritesGrid.appendChild(card);
        });
    }
    
    favoritesModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Favorites Modal
function closeFavoritesModal() {
    favoritesModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Search Recipes
function searchRecipes() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        displayedRecipes = [...allRecipes];
    } else {
        displayedRecipes = allRecipes.filter(recipe => {
            return recipe.title.toLowerCase().includes(searchTerm) ||
                   recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
        });
    }
    
    sortRecipes();
}

// Filter Recipes
function filterRecipes(filter) {
    const currentSearch = searchInput.value.trim().toLowerCase();
    let filtered = allRecipes;
    
    // Apply search filter first
    if (currentSearch) {
        filtered = filtered.filter(recipe => {
            return recipe.title.toLowerCase().includes(currentSearch) ||
                   recipe.ingredients.some(ing => ing.toLowerCase().includes(currentSearch));
        });
    }
    
    // Apply category filter
    switch(filter) {
        case 'quick':
            filtered = filtered.filter(recipe => {
                const time = parseInt(recipe.time);
                return time <= 30;
            });
            break;
        case 'budget':
            filtered = filtered.filter(recipe => {
                const cost = parseInt(recipe.cost);
                return cost <= 50;
            });
            break;
        case 'family':
            filtered = filtered.filter(recipe => {
                const servings = parseInt(recipe.servings);
                return servings >= 4;
            });
            break;
        case 'all':
        default:
            // Already filtered by search
            break;
    }
    
    displayedRecipes = filtered;
    sortRecipes();
}

// Sort Recipes
function sortRecipes() {
    const sortValue = sortSelect.value;
    let sorted = [...displayedRecipes];
    
    switch(sortValue) {
        case 'time-asc':
            sorted.sort((a, b) => parseInt(a.time) - parseInt(b.time));
            break;
        case 'time-desc':
            sorted.sort((a, b) => parseInt(b.time) - parseInt(a.time));
            break;
        case 'cost-asc':
            sorted.sort((a, b) => parseInt(a.cost) - parseInt(b.cost));
            break;
        case 'cost-desc':
            sorted.sort((a, b) => parseInt(b.cost) - parseInt(a.cost));
            break;
        case 'servings-asc':
            sorted.sort((a, b) => parseInt(a.servings) - parseInt(b.servings));
            break;
        case 'servings-desc':
            sorted.sort((a, b) => parseInt(b.servings) - parseInt(a.servings));
            break;
        default:
            // Keep original order
            break;
    }
    
    displayRecipes(sorted);
}

// Calculate Stats
function calculateStats() {
    const totalRecipes = allRecipes.length;
    
    let totalTime = 0;
    let totalCost = 0;
    
    allRecipes.forEach(recipe => {
        totalTime += parseInt(recipe.time) || 0;
        totalCost += parseInt(recipe.cost) || 0;
    });
    
    const avgTime = Math.round(totalTime / totalRecipes);
    const avgCost = Math.round(totalCost / totalRecipes);
    
    // Animate numbers
    animateNumber('totalRecipes', totalRecipes);
    animateNumber('avgTime', avgTime);
    animateNumber('avgCost', avgCost);
    
    document.getElementById('footerRecipeCount').textContent = totalRecipes;
}

// Animate Number
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Setup Event Listeners
function setupEventListeners() {
    // Search
    searchBtn.addEventListener('click', searchRecipes);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });
    
    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() === '') {
            searchRecipes();
        }
    });
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterRecipes(btn.dataset.filter);
        });
    });
    
    // Sort
    sortSelect.addEventListener('change', sortRecipes);
    
    // Modal close
    modalClose.addEventListener('click', closeRecipeModal);
    modalOverlay.addEventListener('click', closeRecipeModal);
    
    // Favorites modal
    favoritesBtn.addEventListener('click', showFavoritesModal);
    favoritesModalClose.addEventListener('click', closeFavoritesModal);
    favoritesModalOverlay.addEventListener('click', closeFavoritesModal);
    
    // Footer links
    document.getElementById('allRecipesLink').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.getElementById('favoritesLink').addEventListener('click', (e) => {
        e.preventDefault();
        showFavoritesModal();
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (recipeModal.classList.contains('active')) {
                closeRecipeModal();
            }
            if (favoritesModal.classList.contains('active')) {
                closeFavoritesModal();
            }
        }
    });
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
