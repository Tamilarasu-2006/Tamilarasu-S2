# AuraQuote • Daily Wisdom & Quote Generator Web Application

A modern, aesthetic, and responsive web application designed for exploring inspiring quotes, listening to text-to-speech audio narration, generating social media image cards, and managing a personal wisdom journal with history and favorites.

![AuraQuote Banner](https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- 🌟 **Dynamic Multi-Source Quote Engine**: Fetches from live APIs with a built-in curated library of 100+ timeless quotes for 100% offline reliability.
- 🎨 **Glassmorphism & Neon Aurora Design**: Modern dark & light mode theme toggle with glowing ambient mesh orbs and fluid animations.
- 🔊 **Voice Audio Narration**: Listen to quotes read aloud using the built-in browser Speech Synthesis API with animated soundwaves.
- 🖼️ **Social Image Card Generator**: Export high-resolution (1200×630) social-ready PNG quote cards directly from your browser.
- 🏷️ **Category & Mood Filters**: Motivation, Wisdom, Success, Philosophy, Life, Tech, and Humor.
- 📚 **Personal Wisdom Journal & History**: Real-time search, favorite bookmarking, and relative timestamps ("Just now", "5m ago").
- ✍️ **Add Custom Quotes**: Record your own thoughts or favorite affirmations.
- 📤 **Export & Backup**: Export your collection to JSON anytime.
- 🎵 **Synthesized Sound Effects**: Pleasant audio feedback using the Web Audio API (with mute toggle).
- ⌨️ **Rich Keyboard Shortcuts**:
  - `Space` or `N` — Generate a new quote
  - `C` — Copy current quote
  - `F` — Toggle favorite
  - `R` — Read quote aloud (TTS)
  - `D` — Download aesthetic quote image card
  - `S` — Open share options (Twitter, WhatsApp, LinkedIn)
  - `T` — Toggle Dark / Light theme
  - `M` — Toggle sound effects
  - `?` — View keyboard shortcuts modal
  - `Esc` — Close modals and dropdowns

---

## 🚀 How to Run

### Option 1: Instant Standalone Web Page (No Installation Needed)
Simply double-click [`index.html`](index.html) or open it in any web browser (Chrome, Edge, Firefox, Safari). It runs 100% client-side with full offline support and local storage persistence.

### Option 2: Run with Node.js Server
1. Ensure Node.js is installed (`node -v`).
2. Run `npm start`.
3. Open `http://localhost:3000` in your browser.

---

## 📁 Project Structure

```
Quote-Generator-with-History/
├── index.html          # Standalone entry web page
├── styles.css          # Design system, glassmorphism & dark/light themes
├── app.js              # Client logic, speech synthesis, canvas export & storage
├── public/             # Static assets served by Node server
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server.js           # Optional Express API & SQLite backend
├── package.json
└── README.md
```

---

## 🌐 Deploying to the Web

You can host this project for free on:
- **GitHub Pages**: Push this repository and enable Pages in repository settings.
- **Vercel / Netlify**: Connect the repository for instant static hosting.
