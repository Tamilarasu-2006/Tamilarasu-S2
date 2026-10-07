const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDirectory = path.join(__dirname, 'data');

// Initialize SQLite database
let db = null;
let saveQuote = null;
let getHistory = null;
let deleteQuote = null;

try {
  const { DatabaseSync } = require('node:sqlite');
  fs.mkdirSync(dataDirectory, { recursive: true });
  db = new DatabaseSync(path.join(dataDirectory, 'quotes.db'));

  db.exec(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT DEFAULT 'wisdom',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(content, author)
    )
  `);

  saveQuote = db.prepare(`
    INSERT OR IGNORE INTO quotes (content, author, category) VALUES (?, ?, ?)
  `);
  getHistory = db.prepare(`
    SELECT id, content, author, category, created_at AS createdAt
    FROM quotes
    ORDER BY datetime(created_at) DESC, id DESC
    LIMIT ?
  `);
  deleteQuote = db.prepare(`
    DELETE FROM quotes WHERE id = ?
  `);
} catch (err) {
  console.warn('SQLite not available in this Node runtime. Operating in in-memory / static mode.');
}

// In-memory fallback if SQLite is unavailable
const memoryQuotes = [];

// Middleware
app.use(express.json());
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Serve static assets from public/ and root
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Fallback curated quotes pool for server
const SERVER_FALLBACK_QUOTES = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "success" },
  { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
  { content: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "philosophy" },
  { content: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama", category: "life" },
  { content: "Stay hungry, stay foolish.", author: "Whole Earth Catalog", category: "motivation" },
  { content: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "tech" }
];

app.get('/api/quotes/random', async (_request, response) => {
  try {
    const apiResponse = await fetch('https://dummyjson.com/quotes/random', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(6000)
    });

    if (!apiResponse.ok) {
      throw new Error(`Quote provider responded with ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    const quote = {
      content: data.quote,
      author: data.author || 'Unknown',
      category: 'wisdom'
    };

    if (!quote.content) throw new Error('Quote provider returned an invalid quote');

    if (db && saveQuote) {
      saveQuote.run(quote.content, quote.author, quote.category);
    } else {
      memoryQuotes.unshift({ ...quote, id: Date.now(), createdAt: new Date().toISOString() });
    }

    response.json(quote);
  } catch (error) {
    console.warn('API fetch failed, selecting fallback quote:', error.message);
    const fallback = SERVER_FALLBACK_QUOTES[Math.floor(Math.random() * SERVER_FALLBACK_QUOTES.length)];
    if (db && saveQuote) {
      saveQuote.run(fallback.content, fallback.author, fallback.category);
    }
    response.json(fallback);
  }
});

app.get('/api/quotes/history', (request, response) => {
  const requestedLimit = Number.parseInt(request.query.limit, 10);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 100)
    : 50;

  if (db && getHistory) {
    response.json(getHistory.all(limit));
  } else {
    response.json(memoryQuotes.slice(0, limit));
  }
});

app.post('/api/quotes/custom', (request, response) => {
  const { content, author, category } = request.body || {};
  if (!content || !author) {
    return response.status(400).json({ error: 'content and author are required' });
  }

  const newQuote = {
    content: content.trim(),
    author: author.trim(),
    category: (category || 'wisdom').trim()
  };

  if (db && saveQuote) {
    saveQuote.run(newQuote.content, newQuote.author, newQuote.category);
  } else {
    memoryQuotes.unshift({ ...newQuote, id: Date.now(), createdAt: new Date().toISOString() });
  }

  response.status(201).json({ success: true, quote: newQuote });
});

app.delete('/api/quotes/:id', (request, response) => {
  const id = Number.parseInt(request.params.id, 10);
  if (db && deleteQuote && Number.isFinite(id)) {
    deleteQuote.run(id);
    response.json({ success: true });
  } else {
    response.json({ success: true });
  }
});

app.listen(PORT, () => {
  console.log(`✨ AuraQuote Web Application is live at http://localhost:${PORT}`);
});
