/**
 * AuraQuote - Modern Interactive Wisdom & Quote Web Application
 */

// ==========================================================================
// Curated Timeless Quotes Library (100% Offline & Fallback Engine)
// ==========================================================================
const CURATED_QUOTES = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "success", desc: "Visionary & Co-founder of Apple" },
  { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom", desc: "Theoretical Physicist" },
  { content: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "philosophy", desc: "Greek Philosopher" },
  { content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "life", desc: "Spiritual Leader" },
  { content: "Stay hungry, stay foolish.", author: "Whole Earth Catalog", category: "motivation", desc: "Counterculture Publication" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "tech", desc: "Author & Inventor" },
  { content: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom", desc: "Ancient Wisdom" },
  { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "motivation", desc: "26th U.S. President" },
  { content: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "success", desc: "Former President of South Africa" },
  { content: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", category: "tech", desc: "Inventor & Innovator" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life", desc: "Musician & Peace Activist" },
  { content: "Waste no more time arguing what a good man should be. Be one.", author: "Marcus Aurelius", category: "philosophy", desc: "Roman Emperor & Stoic Philosopher" },
  { content: "The unexamined life is not worth living.", author: "Socrates", category: "philosophy", desc: "Classical Greek Philosopher" },
  { content: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "wisdom", desc: "Cultural Leader & Philanthropist" },
  { content: "If you cannot do great things, do small things in a great way.", author: "Napoleon Hill", category: "motivation", desc: "Author of Think and Grow Rich" },
  { content: "Talk is cheap. Show me the code.", author: "Linus Torvalds", category: "tech", desc: "Creator of Linux & Git" },
  { content: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "motivation", desc: "Inspirational Speaker" },
  { content: "Knowledge speaks, but wisdom listens.", author: "Jimi Hendrix", category: "wisdom", desc: "Guitar Legend" },
  { content: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "success", desc: "Industrialist" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation", desc: "Diplomat & Human Rights Pioneer" },
  { content: "Life isn't about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw", category: "life", desc: "Playwright & Critic" },
  { content: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House", category: "tech", desc: "Software Architect" },
  { content: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", category: "philosophy", desc: "Philosopher & Writer" },
  { content: "I never said most of the things I said.", author: "Yogi Berra", category: "humor", desc: "Baseball Hall of Famer" },
  { content: "Behind every great man is a woman rolling her eyes.", author: "Jim Carrey", category: "humor", desc: "Actor & Comedian" },
  { content: "Don't count the days, make the days count.", author: "Muhammad Ali", category: "motivation", desc: "Boxing Champion & Activist" }
];

// ==========================================================================
// Application State & Storage
// ==========================================================================
const STORAGE_KEYS = {
  HISTORY: 'auraquote_history_v2',
  FAVORITES: 'auraquote_favorites_v2',
  THEME: 'auraquote_theme',
  SOUND: 'auraquote_sound_enabled',
  EXPLORED_COUNT: 'auraquote_explored_count'
};

const state = {
  currentQuote: {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "success",
    desc: "Visionary & Co-founder of Apple"
  },
  currentCategory: "all",
  history: [],
  favorites: [],
  exploredCount: 0,
  isSpeaking: false,
  soundEnabled: true,
  searchQuery: "",
  activeTab: "history"
};

// ==========================================================================
// DOM Elements
// ==========================================================================
const DOM = {
  quoteCard: document.getElementById('quote-card'),
  quoteText: document.getElementById('quote-text'),
  quoteAuthor: document.getElementById('quote-author'),
  quoteSourceLabel: document.getElementById('quote-source-label'),
  quoteCategoryBadge: document.getElementById('quote-category-badge'),
  authorAvatar: document.getElementById('author-avatar'),
  newQuoteBtn: document.getElementById('new-quote'),
  favoriteBtn: document.getElementById('favorite-btn'),
  copyBtn: document.getElementById('copy-btn'),
  speakBtn: document.getElementById('speak-btn'),
  ttsLabel: document.getElementById('tts-label'),
  soundToggle: document.getElementById('sound-toggle'),
  themeToggle: document.getElementById('theme-toggle'),
  shortcutsBtn: document.getElementById('shortcuts-btn'),
  statusMessage: document.getElementById('status-message'),
  statusText: document.getElementById('status-text'),
  streakCount: document.getElementById('streak-count'),
  filterPills: document.querySelectorAll('.filter-pill'),
  
  // Tabs & Hub
  tabHistory: document.getElementById('tab-history'),
  tabFavorites: document.getElementById('tab-favorites'),
  tabAddCustom: document.getElementById('tab-add-custom'),
  viewHistory: document.getElementById('view-history'),
  viewFavorites: document.getElementById('view-favorites'),
  viewAddCustom: document.getElementById('view-add-custom'),
  historyList: document.getElementById('history-list'),
  favoritesList: document.getElementById('favorites-list'),
  historyBadgeCount: document.getElementById('history-badge-count'),
  favoritesBadgeCount: document.getElementById('favorites-badge-count'),
  
  // Hub Controls
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  exportBtn: document.getElementById('export-btn'),
  clearHistoryBtn: document.getElementById('clear-history-btn'),
  
  // Tools & Modals
  downloadCardBtn: document.getElementById('download-card-btn'),
  shareMenuBtn: document.getElementById('share-menu-btn'),
  shareDropdown: document.getElementById('share-dropdown'),
  shareTwitter: document.getElementById('share-twitter'),
  shareWhatsapp: document.getElementById('share-whatsapp'),
  shareLinkedin: document.getElementById('share-linkedin'),
  shareNative: document.getElementById('share-native'),
  shortcutsModal: document.getElementById('shortcuts-modal'),
  closeShortcutsModal: document.getElementById('close-shortcuts-modal'),
  confirmModal: document.getElementById('confirm-modal'),
  closeConfirmModal: document.getElementById('close-confirm-modal'),
  cancelClearBtn: document.getElementById('cancel-clear-btn'),
  confirmClearBtn: document.getElementById('confirm-clear-btn'),
  customQuoteForm: document.getElementById('custom-quote-form'),
  customContentInput: document.getElementById('custom-content-input'),
  customAuthorInput: document.getElementById('custom-author-input'),
  customCategorySelect: document.getElementById('custom-category-select'),
  toastContainer: document.getElementById('toast-container'),
  quoteCanvas: document.getElementById('quote-canvas')
};

// ==========================================================================
// Web Audio Synthesizer Sound Engine
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playPop() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playChime() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  playHeart() {
    if (!state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.07); // E5
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }
}
const sfx = new SoundFX();

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let icon = '✨';
  if (type === 'success') icon = '✓';
  if (type === 'heart') icon = '❤️';
  if (type === 'copy') icon = '📋';
  if (type === 'trash') icon = '🗑️';

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px) scale(0.95)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// ==========================================================================
// Storage & State Sync
// ==========================================================================
function loadPersistedData() {
  try {
    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    state.history = savedHistory ? JSON.parse(savedHistory) : [];

    const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    state.favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    const savedExplored = localStorage.getItem(STORAGE_KEYS.EXPLORED_COUNT);
    state.exploredCount = savedExplored ? parseInt(savedExplored, 10) : 0;

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateThemeIcon(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      updateThemeIcon(prefersDark ? 'dark' : 'light');
    }

    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
    if (savedSound !== null) {
      state.soundEnabled = savedSound === 'true';
      updateSoundIcon();
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function saveHistory() {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
  } catch (e) {}
}

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
  } catch (e) {}
}

function saveExploredCount() {
  try {
    localStorage.setItem(STORAGE_KEYS.EXPLORED_COUNT, state.exploredCount.toString());
  } catch (e) {}
}

// ==========================================================================
// Theme & Sound Toggle
// ==========================================================================
function updateThemeIcon(theme) {
  const moon = DOM.themeToggle.querySelector('.icon-moon');
  const sun = DOM.themeToggle.querySelector('.icon-sun');
  if (theme === 'light') {
    moon.classList.add('hidden');
    sun.classList.remove('hidden');
  } else {
    moon.classList.remove('hidden');
    sun.classList.add('hidden');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEYS.THEME, next);
  updateThemeIcon(next);
  sfx.playPop();
  showToast(`Switched to ${next} theme`);
}

function updateSoundIcon() {
  const on = DOM.soundToggle.querySelector('.icon-sound-on');
  const off = DOM.soundToggle.querySelector('.icon-sound-off');
  if (state.soundEnabled) {
    on.classList.remove('hidden');
    off.classList.add('hidden');
  } else {
    on.classList.add('hidden');
    off.classList.remove('hidden');
  }
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  localStorage.setItem(STORAGE_KEYS.SOUND, state.soundEnabled.toString());
  updateSoundIcon();
  if (state.soundEnabled) sfx.playPop();
  showToast(state.soundEnabled ? "Sound effects enabled" : "Sound effects muted");
}

// ==========================================================================
// Quote Presentation & Rendering
// ==========================================================================
function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("") || "Q";
}

function getCategoryEmoji(category = "wisdom") {
  const map = {
    motivation: "🚀 Motivation",
    wisdom: "🦉 Wisdom",
    success: "🏆 Success",
    life: "🌱 Life",
    philosophy: "🏛️ Philosophy",
    tech: "💻 Innovation",
    humor: "😄 Humor",
    general: "✨ Inspiration"
  };
  return map[category.toLowerCase()] || `✨ ${category.charAt(0).toUpperCase() + category.slice(1)}`;
}

function isQuoteFavorited(content, author) {
  return state.favorites.some(f => f.content.trim() === content.trim() && f.author.trim() === author.trim());
}

function renderActiveQuote(quote, animate = true) {
  state.currentQuote = quote;

  if (animate) {
    DOM.quoteText.classList.add('quote-fading');
    setTimeout(() => {
      DOM.quoteText.textContent = `“${quote.content}”`;
      DOM.quoteAuthor.textContent = quote.author || "Unknown";
      DOM.quoteSourceLabel.textContent = quote.desc || (quote.category ? `${quote.category.toUpperCase()} PERSPECTIVE` : "Timeless Wisdom");
      DOM.authorAvatar.textContent = getInitials(quote.author);
      DOM.quoteCategoryBadge.textContent = getCategoryEmoji(quote.category || "wisdom");
      DOM.quoteText.classList.remove('quote-fading');
    }, 150);
  } else {
    DOM.quoteText.textContent = `“${quote.content}”`;
    DOM.quoteAuthor.textContent = quote.author || "Unknown";
    DOM.quoteSourceLabel.textContent = quote.desc || (quote.category ? `${quote.category.toUpperCase()} PERSPECTIVE` : "Timeless Wisdom");
    DOM.authorAvatar.textContent = getInitials(quote.author);
    DOM.quoteCategoryBadge.textContent = getCategoryEmoji(quote.category || "wisdom");
  }

  // Update Favorite Heart State
  const isFav = isQuoteFavorited(quote.content, quote.author);
  DOM.favoriteBtn.classList.toggle('favorited', isFav);

  // Update streak / explore counter
  DOM.streakCount.textContent = state.exploredCount;
}

// ==========================================================================
// Quote Fetcher Engine (Backend + Public APIs + Fallbacks)
// ==========================================================================
async function fetchQuote() {
  DOM.newQuoteBtn.disabled = true;
  DOM.newQuoteBtn.style.opacity = '0.75';
  sfx.playChime();

  // If a specific category is chosen, filter or pick from curated
  if (state.currentCategory !== 'all') {
    const matching = CURATED_QUOTES.filter(q => q.category.toLowerCase() === state.currentCategory.toLowerCase());
    if (matching.length) {
      const randomItem = matching[Math.floor(Math.random() * matching.length)];
      recordQuote(randomItem);
      renderActiveQuote(randomItem);
      finishFetch();
      return;
    }
  }

  // Multi-tier fetch attempt
  let quote = null;

  // Tier 1: Try local Express API if backend is running
  try {
    const res = await fetch('/api/quotes/random', { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      if (data.content) {
        quote = {
          content: data.content,
          author: data.author || 'Unknown',
          category: 'wisdom',
          desc: 'World Perspective'
        };
      }
    }
  } catch (e) {
    // Backend offline / running standalone web page directly in browser
  }

  // Tier 2: Try direct DummyJSON API
  if (!quote) {
    try {
      const res = await fetch('https://dummyjson.com/quotes/random', { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const data = await res.json();
        quote = {
          content: data.quote,
          author: data.author || 'Unknown',
          category: 'wisdom',
          desc: 'Curated Quote'
        };
      }
    } catch (e) {
      // Offline or network error
    }
  }

  // Tier 3: Curated Offline Pool Fallback
  if (!quote) {
    const pool = CURATED_QUOTES;
    quote = pool[Math.floor(Math.random() * pool.length)];
  }

  recordQuote(quote);
  renderActiveQuote(quote);
  finishFetch();
}

function finishFetch() {
  DOM.newQuoteBtn.disabled = false;
  DOM.newQuoteBtn.style.opacity = '1';
  showStatus('Saved to your history');
}

function recordQuote(quote) {
  state.exploredCount += 1;
  saveExploredCount();

  const newEntry = {
    id: Date.now() + Math.random().toString(36).substr(2, 4),
    content: quote.content,
    author: quote.author || 'Unknown',
    category: quote.category || 'wisdom',
    desc: quote.desc || 'Wisdom Entry',
    timestamp: new Date().toISOString()
  };

  // Avoid duplicates at top of history
  const alreadyIndex = state.history.findIndex(h => h.content === newEntry.content && h.author === newEntry.author);
  if (alreadyIndex !== -1) {
    state.history.splice(alreadyIndex, 1);
  }
  state.history.unshift(newEntry);

  if (state.history.length > 200) {
    state.history.pop();
  }

  saveHistory();
  renderHistoryView();
  renderFavoritesView();
}

function showStatus(text) {
  DOM.statusText.textContent = text;
  DOM.statusMessage.classList.add('visible');
  setTimeout(() => {
    DOM.statusMessage.classList.remove('visible');
  }, 2500);
}

// ==========================================================================
// Relative Time Helper
// ==========================================================================
function formatRelativeTime(isoString) {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch (e) {
    return "Recently";
  }
}

// ==========================================================================
// Views Rendering (History & Favorites)
// ==========================================================================
function filterQuotes(items) {
  if (!state.searchQuery.trim()) return items;
  const q = state.searchQuery.toLowerCase();
  return items.filter(item =>
    item.content.toLowerCase().includes(q) ||
    item.author.toLowerCase().includes(q) ||
    (item.category && item.category.toLowerCase().includes(q))
  );
}

function createQuoteCardElement(item, isFavoriteTab = false) {
  const li = document.createElement('li');
  li.className = 'history-quote-item glass-panel';

  const isFav = isQuoteFavorited(item.content, item.author);

  li.innerHTML = `
    <div class="item-top-row">
      <span class="item-badge">${getCategoryEmoji(item.category || 'wisdom')}</span>
      <div class="item-actions">
        <button class="mini-action-btn item-fav-btn ${isFav ? 'favorited' : ''}" type="button" title="Favorite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button class="mini-action-btn item-copy-btn" type="button" title="Copy">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
        <button class="mini-action-btn item-delete-btn" type="button" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
    <p class="history-quote-text">“${item.content}”</p>
    <div class="item-footer-row">
      <span class="item-author">— ${item.author}</span>
      <span class="item-time">${item.timestamp ? formatRelativeTime(item.timestamp) : 'Saved'}</span>
    </div>
  `;

  // Attach handlers
  const favBtn = li.querySelector('.item-fav-btn');
  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFavoriteFromItem(item);
  });

  const copyBtn = li.querySelector('.item-copy-btn');
  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copyTextToClipboard(`“${item.content}” — ${item.author}`);
  });

  const delBtn = li.querySelector('.item-delete-btn');
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteQuoteItem(item, isFavoriteTab);
  });

  // Clicking the item displays it on the main stage
  li.addEventListener('click', () => {
    renderActiveQuote(item);
    window.scrollTo({ top: DOM.quoteCard.offsetTop - 100, behavior: 'smooth' });
    sfx.playPop();
  });

  return li;
}

function renderHistoryView() {
  DOM.historyBadgeCount.textContent = state.history.length;
  DOM.historyList.innerHTML = '';

  const filtered = filterQuotes(state.history);

  if (!filtered.length) {
    DOM.historyList.innerHTML = `
      <li class="empty-hub-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <h4>${state.searchQuery ? 'No matching quotes' : 'Your history is clear'}</h4>
        <p>${state.searchQuery ? 'Try searching for a different keyword or author.' : 'Generate quotes above to start your personal wisdom log.'}</p>
      </li>
    `;
    return;
  }

  filtered.forEach(item => {
    DOM.historyList.appendChild(createQuoteCardElement(item, false));
  });
}

function renderFavoritesView() {
  DOM.favoritesBadgeCount.textContent = state.favorites.length;
  DOM.favoritesList.innerHTML = '';

  const filtered = filterQuotes(state.favorites);

  if (!filtered.length) {
    DOM.favoritesList.innerHTML = `
      <li class="empty-hub-state">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <h4>${state.searchQuery ? 'No favorites found' : 'No favorites saved yet'}</h4>
        <p>${state.searchQuery ? 'Check your spelling or clear search filters.' : 'Click the heart icon on any quote to collect your most cherished thoughts.'}</p>
      </li>
    `;
    return;
  }

  filtered.forEach(item => {
    DOM.favoritesList.appendChild(createQuoteCardElement(item, true));
  });
}

// ==========================================================================
// Favorites Management
// ==========================================================================
function toggleFavoriteActive() {
  const quote = state.currentQuote;
  toggleFavoriteFromItem(quote);
}

function toggleFavoriteFromItem(quote) {
  const index = state.favorites.findIndex(f => f.content.trim() === quote.content.trim() && f.author.trim() === quote.author.trim());

  if (index !== -1) {
    state.favorites.splice(index, 1);
    showToast("Removed from favorites", "trash");
  } else {
    state.favorites.unshift({
      id: Date.now() + Math.random().toString(36).substr(2, 4),
      content: quote.content,
      author: quote.author || "Unknown",
      category: quote.category || "wisdom",
      desc: quote.desc || "Favorite Entry",
      timestamp: new Date().toISOString()
    });
    sfx.playHeart();
    showToast("Added to favorites ❤️", "heart");
  }

  saveFavorites();
  renderFavoritesView();
  renderHistoryView();

  const isFav = isQuoteFavorited(state.currentQuote.content, state.currentQuote.author);
  DOM.favoriteBtn.classList.toggle('favorited', isFav);
}

function deleteQuoteItem(item, fromFavorites = false) {
  if (fromFavorites) {
    state.favorites = state.favorites.filter(f => !(f.content === item.content && f.author === item.author));
    saveFavorites();
    renderFavoritesView();
  } else {
    state.history = state.history.filter(h => h.id !== item.id && h.content !== item.content);
    saveHistory();
    renderHistoryView();
  }
  showToast("Quote removed", "trash");
}

// ==========================================================================
// Clipboard & Share Engine
// ==========================================================================
async function copyCurrentQuote() {
  const formatted = `“${state.currentQuote.content}” — ${state.currentQuote.author}`;
  await copyTextToClipboard(formatted);
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    sfx.playPop();

    // Visual button check state
    const copyIcon = DOM.copyBtn.querySelector('.copy-icon');
    const checkIcon = DOM.copyBtn.querySelector('.check-icon');
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');

    showToast("Copied to clipboard!", "copy");

    setTimeout(() => {
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast("Copied to clipboard!", "copy");
  }
}

function shareOnTwitter() {
  const text = encodeURIComponent(`“${state.currentQuote.content}” — ${state.currentQuote.author}\n\n#Quote #Inspiration #AuraQuote`);
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  DOM.shareDropdown.classList.add('hidden');
}

function shareOnWhatsApp() {
  const text = encodeURIComponent(`“${state.currentQuote.content}” — ${state.currentQuote.author}`);
  const url = `https://api.whatsapp.com/send?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  DOM.shareDropdown.classList.add('hidden');
}

function shareOnLinkedIn() {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  DOM.shareDropdown.classList.add('hidden');
}

async function shareNativeDialog() {
  DOM.shareDropdown.classList.add('hidden');
  if (navigator.share) {
    try {
      await navigator.share({
        title: `Quote by ${state.currentQuote.author}`,
        text: `“${state.currentQuote.content}” — ${state.currentQuote.author}`,
        url: window.location.href
      });
    } catch (e) {}
  } else {
    copyCurrentQuote();
  }
}

// ==========================================================================
// Text-to-Speech (Audio Voice Narration)
// ==========================================================================
function speakQuote() {
  if (!('speechSynthesis' in window)) {
    showToast("Speech synthesis not supported in this browser");
    return;
  }

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    state.isSpeaking = false;
    DOM.speakBtn.classList.remove('speaking');
    DOM.ttsLabel.textContent = "Listen";
    return;
  }

  const utterance = new SpeechSynthesisUtterance(`${state.currentQuote.content}. By ${state.currentQuote.author}`);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  utterance.onstart = () => {
    state.isSpeaking = true;
    DOM.speakBtn.classList.add('speaking');
    DOM.ttsLabel.textContent = "Speaking...";
  };

  utterance.onend = utterance.onerror = () => {
    state.isSpeaking = false;
    DOM.speakBtn.classList.remove('speaking');
    DOM.ttsLabel.textContent = "Listen";
  };

  window.speechSynthesis.speak(utterance);
}

// ==========================================================================
// Download Quote Image Card (Canvas Export)
// ==========================================================================
function downloadQuoteCard() {
  sfx.playChime();
  const canvas = DOM.quoteCanvas;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Background Gradient
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  if (isDark) {
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e1b4b');
    gradient.addColorStop(1, '#090d16');
  } else {
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(0.5, '#e0e7ff');
    gradient.addColorStop(1, '#fdf2f8');
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Subtle Card Border & Glow
  ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.35)' : 'rgba(99, 102, 241, 0.2)';
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Category Badge Tag
  ctx.font = '700 20px Outfit, sans-serif';
  ctx.fillStyle = '#818cf8';
  ctx.fillText(`✨ ${state.currentQuote.category.toUpperCase() || 'WISDOM'}`, 80, 110);

  // Large Quote Marks
  ctx.font = 'italic 120px Georgia, serif';
  ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
  ctx.fillText('“', 80, 220);

  // Wrap Quote Text
  const quoteText = state.currentQuote.content;
  ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
  ctx.font = '500 38px Georgia, serif';
  
  const words = quoteText.split(' ');
  let line = '';
  let y = 240;
  const maxWidth = width - 200;
  const lineHeight = 54;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, 100, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 100, y);

  // Author Stamp
  ctx.font = '700 28px Outfit, sans-serif';
  ctx.fillStyle = isDark ? '#c7d2fe' : '#4338ca';
  ctx.fillText(`— ${state.currentQuote.author}`, 100, y + 80);

  // Watermark Brand
  ctx.font = '600 18px Outfit, sans-serif';
  ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';
  ctx.fillText('AuraQuote Web • Daily Wisdom', width - 340, height - 70);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `AuraQuote-${state.currentQuote.author.replace(/\s+/g, '_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  showToast("Quote card downloaded! 📸", "success");
}

// ==========================================================================
// Export & Data Management
// ==========================================================================
function exportJournalData() {
  const exportObject = {
    exportedAt: new Date().toISOString(),
    stats: { exploredCount: state.exploredCount, favoritesCount: state.favorites.length },
    favorites: state.favorites,
    history: state.history
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObject, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `auraquote_journal_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast("Quotes exported to JSON! 📁", "success");
}

function clearAllHistory() {
  state.history = [];
  saveHistory();
  renderHistoryView();
  DOM.confirmModal.classList.add('hidden');
  showToast("History cleared", "trash");
}

// ==========================================================================
// Custom Quote Submission
// ==========================================================================
function handleCustomQuoteSubmit(e) {
  e.preventDefault();
  const content = DOM.customContentInput.value.trim();
  const author = DOM.customAuthorInput.value.trim() || "Anonymous";
  const category = DOM.customCategorySelect.value;

  if (!content) return;

  const newQuote = {
    content,
    author,
    category,
    desc: "Personal Journal Entry"
  };

  recordQuote(newQuote);
  renderActiveQuote(newQuote);

  DOM.customContentInput.value = "";
  DOM.customAuthorInput.value = "";

  // Switch back to history tab
  switchTab('history');
  showToast("Your quote was saved! ✍️", "success");
  sfx.playHeart();
}

// ==========================================================================
// Tabs & Category Filtering
// ==========================================================================
function switchTab(tabKey) {
  state.activeTab = tabKey;

  DOM.tabHistory.classList.toggle('active', tabKey === 'history');
  DOM.tabFavorites.classList.toggle('active', tabKey === 'favorites');
  DOM.tabAddCustom.classList.toggle('active', tabKey === 'add-custom');

  DOM.viewHistory.classList.toggle('hidden', tabKey !== 'history');
  DOM.viewFavorites.classList.toggle('hidden', tabKey !== 'favorites');
  DOM.viewAddCustom.classList.toggle('hidden', tabKey !== 'add-custom');

  sfx.playPop();
}

function handleCategoryFilterClick(btn) {
  DOM.filterPills.forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  state.currentCategory = btn.getAttribute('data-category');
  fetchQuote();
}

// ==========================================================================
// Keyboard Shortcuts Engine
// ==========================================================================
function handleKeyDown(e) {
  // If typing in an input or textarea, ignore single key shortcuts
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
    if (e.key === 'Escape') document.activeElement.blur();
    return;
  }

  const key = e.key.toLowerCase();

  if (e.code === 'Space' || key === 'n') {
    e.preventDefault();
    fetchQuote();
  } else if (key === 'c') {
    e.preventDefault();
    copyCurrentQuote();
  } else if (key === 'f') {
    e.preventDefault();
    toggleFavoriteActive();
  } else if (key === 'r') {
    e.preventDefault();
    speakQuote();
  } else if (key === 't') {
    e.preventDefault();
    toggleTheme();
  } else if (key === 'm') {
    e.preventDefault();
    toggleSound();
  } else if (key === 'd') {
    e.preventDefault();
    downloadQuoteCard();
  } else if (key === 's') {
    e.preventDefault();
    DOM.shareDropdown.classList.toggle('hidden');
  } else if (key === '?') {
    e.preventDefault();
    DOM.shortcutsModal.classList.toggle('hidden');
  } else if (key === 'escape') {
    DOM.shortcutsModal.classList.add('hidden');
    DOM.confirmModal.classList.add('hidden');
    DOM.shareDropdown.classList.add('hidden');
  }
}

// ==========================================================================
// Event Listeners Initialization
// ==========================================================================
function setupEventListeners() {
  // Quote Controls
  DOM.newQuoteBtn.addEventListener('click', fetchQuote);
  DOM.favoriteBtn.addEventListener('click', toggleFavoriteActive);
  DOM.copyBtn.addEventListener('click', copyCurrentQuote);
  DOM.speakBtn.addEventListener('click', speakQuote);
  DOM.downloadCardBtn.addEventListener('click', downloadQuoteCard);

  // Theme & Sound
  DOM.themeToggle.addEventListener('click', toggleTheme);
  DOM.soundToggle.addEventListener('click', toggleSound);

  // Category Filter Pills
  DOM.filterPills.forEach(pill => {
    pill.addEventListener('click', () => handleCategoryFilterClick(pill));
  });

  // Hub Tabs
  DOM.tabHistory.addEventListener('click', () => switchTab('history'));
  DOM.tabFavorites.addEventListener('click', () => switchTab('favorites'));
  DOM.tabAddCustom.addEventListener('click', () => switchTab('add-custom'));

  // Live Search
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    DOM.clearSearchBtn.classList.toggle('hidden', !state.searchQuery);
    renderHistoryView();
    renderFavoritesView();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.clearSearchBtn.classList.add('hidden');
    renderHistoryView();
    renderFavoritesView();
  });

  // Hub Actions
  DOM.exportBtn.addEventListener('click', exportJournalData);
  DOM.clearHistoryBtn.addEventListener('click', () => {
    DOM.confirmModal.classList.remove('hidden');
  });

  // Modals & Confirmations
  DOM.closeConfirmModal.addEventListener('click', () => DOM.confirmModal.classList.add('hidden'));
  DOM.cancelClearBtn.addEventListener('click', () => DOM.confirmModal.classList.add('hidden'));
  DOM.confirmClearBtn.addEventListener('click', clearAllHistory);

  DOM.shortcutsBtn.addEventListener('click', () => DOM.shortcutsModal.classList.remove('hidden'));
  DOM.closeShortcutsModal.addEventListener('click', () => DOM.shortcutsModal.classList.add('hidden'));

  // Share Dropdown
  DOM.shareMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    DOM.shareDropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!DOM.shareMenuBtn.contains(e.target) && !DOM.shareDropdown.contains(e.target)) {
      DOM.shareDropdown.classList.add('hidden');
    }
  });

  DOM.shareTwitter.addEventListener('click', shareOnTwitter);
  DOM.shareWhatsapp.addEventListener('click', shareOnWhatsApp);
  DOM.shareLinkedin.addEventListener('click', shareOnLinkedIn);
  DOM.shareNative.addEventListener('click', shareNativeDialog);

  // Custom Quote Form
  DOM.customQuoteForm.addEventListener('submit', handleCustomQuoteSubmit);

  // Global Keyboard Navigation
  window.addEventListener('keydown', handleKeyDown);
}

// ==========================================================================
// App Initialization
// ==========================================================================
function initApp() {
  loadPersistedData();
  setupEventListeners();

  // If we already have saved history, display the top item or initial quote
  if (state.history.length > 0) {
    renderActiveQuote(state.history[0], false);
  } else {
    // Initial inspirational quote
    const initial = CURATED_QUOTES[0];
    recordQuote(initial);
    renderActiveQuote(initial, false);
  }

  renderHistoryView();
  renderFavoritesView();
}

// Bootstrap once DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
