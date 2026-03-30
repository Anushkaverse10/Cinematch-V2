/* ============================================================
   CINEMATCH — Complete Design System
   Dark, cinematic, minimal — Apple/A24 inspired
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');

/* ── CSS Custom Properties ─────────────────────────────────── */
:root {
  /* Colors */
  --bg-primary: #0a0a0f;
  --bg-surface: #12121a;
  --bg-card: #1a1a26;
  --bg-elevated: #22223a;
  --text-primary: #f0f0f0;
  --text-secondary: #a0a0b8;
  --text-muted: #5a5a7a;
  --accent: #f5c518;
  --accent-dim: rgba(245, 197, 24, 0.15);
  --accent-red: #e8375a;
  --glass: rgba(18, 18, 26, 0.82);
  --glass-border: rgba(255, 255, 255, 0.07);
  --overlay: rgba(10, 10, 15, 0.75);
  --shadow-card: 0 8px 40px rgba(0, 0, 0, 0.55);
  --shadow-hover: 0 16px 60px rgba(0, 0, 0, 0.7);
  --radius-card: 12px;
  --radius-pill: 999px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;

  /* Typography */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;

  /* Transitions */
  --tr-fast: 150ms ease;
  --tr-smooth: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --tr-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ── Reset ─────────────────────────────────────────────────── */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: var(--font-body);
}

input,
select,
textarea {
  font-family: var(--font-body);
}

/* ── Scrollbar ─────────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--bg-elevated);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}

/* ═══════════════════════════════════════════════════════════
   LOADER / SPLASH SCREEN
   ═══════════════════════════════════════════════════════════ */
#cinematch-loader {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
  transition: opacity 600ms ease, visibility 600ms ease;
}

#cinematch-loader.hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Film strip pipe animation */
.loader-strips {
  display: flex;
  gap: 6px;
  align-items: flex-end;
  height: 64px;
}

.loader-strip {
  width: 5px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--accent) 0%, transparent 100%);
  animation: stripFlow 1.2s ease-in-out infinite;
}

.loader-strip:nth-child(1) {
  height: 20px;
  animation-delay: 0s;
}

.loader-strip:nth-child(2) {
  height: 40px;
  animation-delay: 0.1s;
}

.loader-strip:nth-child(3) {
  height: 55px;
  animation-delay: 0.2s;
}

.loader-strip:nth-child(4) {
  height: 64px;
  animation-delay: 0.3s;
}

.loader-strip:nth-child(5) {
  height: 55px;
  animation-delay: 0.4s;
}

.loader-strip:nth-child(6) {
  height: 40px;
  animation-delay: 0.5s;
}

.loader-strip:nth-child(7) {
  height: 25px;
  animation-delay: 0.6s;
}

.loader-strip:nth-child(8) {
  height: 40px;
  animation-delay: 0.7s;
}

.loader-strip:nth-child(9) {
  height: 55px;
  animation-delay: 0.8s;
}

.loader-strip:nth-child(10) {
  height: 64px;
  animation-delay: 0.9s;
}

.loader-strip:nth-child(11) {
  height: 55px;
  animation-delay: 1.0s;
}

.loader-strip:nth-child(12) {
  height: 40px;
  animation-delay: 1.1s;
}

@keyframes stripFlow {

  0%,
  100% {
    opacity: 0.25;
    transform: scaleY(0.5);
  }

  50% {
    opacity: 1;
    transform: scaleY(1.15);
  }
}

.loader-brand {
  text-align: center;
}

.loader-wordmark {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.loader-wordmark span {
  color: var(--accent);
}

.loader-tagline {
  font-size: 0.85rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-top: var(--space-xs);
  animation: pulse 2s ease infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.4
  }

  50% {
    opacity: 1
  }
}

/* ── Progress bar ──────────────────────────────────────────── */
.loader-progress {
  width: 200px;
  height: 2px;
  background: var(--bg-elevated);
  border-radius: 1px;
  overflow: hidden;
}

.loader-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-red));
  border-radius: 1px;
  animation: loadProgress 2s ease forwards;
}

@keyframes loadProgress {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 var(--space-xl);
  gap: var(--space-lg);
  background: linear-gradient(to bottom, rgba(10, 10, 15, 0.95) 0%, transparent 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: background var(--tr-smooth), border-color var(--tr-smooth);
}

.navbar.scrolled {
  background: var(--glass);
  border-color: var(--glass-border);
}

.nav-logo {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  white-space: nowrap;
  flex-shrink: 0;
}

.nav-logo span {
  color: var(--accent);
}

.nav-logo:hover {
  opacity: 0.85;
}

.nav-links {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  list-style: none;
  flex-shrink: 0;
}

.nav-links a {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: 6px;
  transition: color var(--tr-fast), background var(--tr-fast);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--text-primary);
  background: var(--accent-dim);
}

.nav-search {
  flex: 1;
  max-width: 420px;
  margin-left: auto;
  position: relative;
}

.nav-search input {
  width: 100%;
  padding: 10px 16px 10px 42px;
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
  color: var(--text-primary);
  font-size: 0.9rem;
  outline: none;
  transition: border-color var(--tr-fast), background var(--tr-fast);
}

.nav-search input::placeholder {
  color: var(--text-muted);
}

.nav-search input:focus {
  border-color: var(--accent);
  background: var(--bg-card);
}

.nav-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
  font-size: 1rem;
}

.nav-fav-btn {
  background: none;
  border: 1px solid var(--glass-border);
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--tr-fast);
  flex-shrink: 0;
}

.nav-fav-btn:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* Mobile hamburger */
.nav-hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 1.4rem;
  margin-left: auto;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════ */
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  max-height: 900px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
  transform: scale(1.04);
  transition: transform 8s ease;
  filter: brightness(0.55);
}

.hero:hover .hero-backdrop {
  transform: scale(1);
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
      rgba(10, 10, 15, 0) 0%,
      rgba(10, 10, 15, 0.3) 40%,
      rgba(10, 10, 15, 0.85) 80%,
      var(--bg-primary) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: var(--space-2xl) var(--space-xl);
  max-width: 680px;
  animation: heroSlideUp 0.8s ease both;
  animation-delay: 0.3s;
}

@keyframes heroSlideUp {
  from {
    opacity: 0;
    transform: translateY(32px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--accent-dim);
  border: 1px solid var(--accent);
  color: var(--accent);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  margin-bottom: var(--space-md);
}

.hero-tag::before {
  content: '●';
  font-size: 0.5rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-md);
}

.hero-meta {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
}

.hero-meta .rating {
  color: var(--accent);
  font-weight: 600;
}

.hero-meta .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-muted);
}

.hero-overview {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: var(--space-lg);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.hero-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--text-primary);
  color: var(--bg-primary);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  transition: all var(--tr-smooth);
  white-space: nowrap;
}

.btn-primary:hover {
  background: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(245, 197, 24, 0.35);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--glass-border);
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all var(--tr-smooth);
  white-space: nowrap;
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* ═══════════════════════════════════════════════════════════
   CAROUSELS / SECTIONS
   ═══════════════════════════════════════════════════════════ */
.page-content {
  padding-top: 0;
}

.section {
  padding: var(--space-xl) 0 var(--space-lg);
}

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 var(--space-xl);
  margin-bottom: var(--space-lg);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.section-see-all {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--accent);
  transition: opacity var(--tr-fast);
}

.section-see-all:hover {
  opacity: 0.7;
}

/* Carousel wrapper */
.carousel-container {
  position: relative;
}

.carousel-track {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: var(--space-sm) var(--space-xl);
  scrollbar-width: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  background: var(--glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--tr-smooth);
  z-index: 10;
  opacity: 0;
  pointer-events: none;
}

.carousel-container:hover .carousel-btn {
  opacity: 1;
  pointer-events: auto;
}

.carousel-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #000;
}

.carousel-btn.prev {
  left: 8px;
}

.carousel-btn.next {
  right: 8px;
}

/* ═══════════════════════════════════════════════════════════
   MOVIE CARDS
   ═══════════════════════════════════════════════════════════ */
.movie-card {
  flex-shrink: 0;
  width: 180px;
  scroll-snap-align: start;
  cursor: pointer;
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  transition: transform var(--tr-spring), box-shadow var(--tr-smooth);
}

.movie-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: var(--shadow-hover);
  z-index: 5;
}

.movie-card-poster {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  display: block;
  background: var(--bg-elevated);
}

.movie-card-poster-placeholder {
  width: 100%;
  aspect-ratio: 2/3;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--text-muted);
}

.movie-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.2) 60%, transparent 100%);
  opacity: 0;
  transition: opacity var(--tr-smooth);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-md) var(--space-sm);
  gap: var(--space-xs);
}

.movie-card:hover .movie-card-overlay {
  opacity: 1;
}

.movie-card-title {
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.25;
  white-space: normal;
}

.movie-card-rating {
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 600;
}

.movie-card-btns {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-xs);
}

.card-btn {
  flex: 1;
  padding: 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 600;
  transition: all var(--tr-fast);
}

.card-btn-watch {
  background: var(--text-primary);
  color: var(--bg-primary);
}

.card-btn-watch:hover {
  background: var(--accent);
}

.card-btn-fav {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.card-btn-fav:hover {
  background: var(--accent-red);
}

.card-btn-fav.active {
  background: var(--accent-red);
}

/* Language badge */
.movie-card-lang {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--glass);
  backdrop-filter: blur(8px);
  border: 1px solid var(--glass-border);
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 2px 6px;
  text-transform: uppercase;
  color: var(--text-primary);
}

/* ── Grid layout for search results ─────────────────────────── */
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: var(--space-lg);
  padding: var(--space-md) var(--space-xl);
}

/* ═══════════════════════════════════════════════════════════
   TRAILER MODAL
   ═══════════════════════════════════════════════════════════ */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--tr-smooth), visibility var(--tr-smooth);
}

.modal-backdrop.open {
  opacity: 1;
  visibility: visible;
}

.modal-box {
  position: relative;
  width: min(90vw, 860px);
  background: var(--bg-surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 32px 80px rgba(0, 0, 0, 0.8);
  transform: scale(0.95);
  transition: transform var(--tr-smooth);
}

.modal-backdrop.open .modal-box {
  transform: scale(1);
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--tr-fast);
}

.modal-close:hover {
  background: var(--accent-red);
  border-color: var(--accent-red);
}

.modal-video {
  width: 100%;
  aspect-ratio: 16/9;
  display: block;
}

.modal-video iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* ═══════════════════════════════════════════════════════════
   MOVIE DETAIL PAGE
   ═══════════════════════════════════════════════════════════ */
.detail-page {
  padding-top: 0;
}

.detail-backdrop-wrap {
  position: relative;
  height: 60vh;
  min-height: 400px;
  max-height: 650px;
  overflow: hidden;
}

.detail-backdrop-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4);
}

.detail-backdrop-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
      rgba(10, 10, 15, 0.1) 0%,
      var(--bg-primary) 100%);
}

.detail-main {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-xl);
  padding: 0 var(--space-xl) var(--space-2xl);
  margin-top: -180px;
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.detail-poster-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.detail-poster {
  width: 100%;
  border-radius: 16px;
  box-shadow: var(--shadow-hover);
  aspect-ratio: 2/3;
  object-fit: cover;
  background: var(--bg-card);
}

.detail-info {
  padding-top: var(--space-xl);
}

.detail-genres {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin-bottom: var(--space-md);
}

.genre-tag {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  background: var(--bg-elevated);
  color: var(--text-secondary);
  border: 1px solid var(--glass-border);
}

.detail-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1.08;
  margin-bottom: var(--space-md);
}

.detail-meta {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-lg);
}

.detail-rating {
  color: var(--accent);
  font-weight: 700;
  font-size: 1.1rem;
}

.detail-meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--text-muted);
  flex-shrink: 0;
}

.detail-overview {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin-bottom: var(--space-xl);
  max-width: 640px;
}

.detail-actions {
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
  margin-bottom: var(--space-xl);
}

/* OTT Platforms */
.ott-section {
  margin-bottom: var(--space-xl);
}

.ott-section h3 {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--space-md);
}

.ott-badges {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  align-items: center;
}

.ott-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  padding: 8px 14px;
  transition: all var(--tr-fast);
  cursor: pointer;
}

.ott-badge:hover {
  border-color: var(--accent);
  background: var(--accent-dim);
}

.ott-badge img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 4px;
  background: #fff;
  padding: 2px;
}

.ott-badge span {
  font-size: 0.82rem;
  font-weight: 500;
}

.ott-unavailable {
  color: var(--text-muted);
  font-size: 0.88rem;
}

/* Cast row */
.cast-section {
  margin-bottom: var(--space-xl);
}

.cast-section h3 {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--space-md);
}

.cast-track {
  display: flex;
  gap: var(--space-md);
  overflow-x: auto;
  padding-bottom: var(--space-sm);
  scrollbar-width: none;
}

.cast-track::-webkit-scrollbar {
  display: none;
}

.cast-card {
  flex-shrink: 0;
  width: 100px;
  text-align: center;
}

.cast-card img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-elevated);
  margin: 0 auto var(--space-xs);
  border: 2px solid var(--glass-border);
}

.cast-card-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--bg-elevated);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: var(--text-muted);
  margin: 0 auto var(--space-xs);
  border: 2px solid var(--glass-border);
}

.cast-name {
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.2;
}

.cast-character {
  font-size: 0.7rem;
  color: var(--text-muted);
}

/* ═══════════════════════════════════════════════════════════
   SEARCH PAGE
   ═══════════════════════════════════════════════════════════ */
.search-page {
  padding: 100px var(--space-xl) var(--space-2xl);
  max-width: 1300px;
  margin: 0 auto;
}

.search-header {
  margin-bottom: var(--space-xl);
}

.search-header h1 {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  letter-spacing: -0.02em;
  margin-bottom: var(--space-md);
}

.search-bar-wrap {
  position: relative;
  max-width: 600px;
}

.search-bar-wrap input {
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
  color: var(--text-primary);
  font-size: 1rem;
  outline: none;
  transition: border-color var(--tr-fast);
}

.search-bar-wrap input:focus {
  border-color: var(--accent);
}

.search-bar-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1.2rem;
}

.search-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: var(--space-xl);
  align-items: start;
}

.filter-panel {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: var(--space-lg);
  position: sticky;
  top: 90px;
}

.filter-panel h3 {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: var(--space-lg);
}

.filter-group {
  margin-bottom: var(--space-lg);
}

.filter-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}

.filter-group select,
.filter-group input[type="range"] {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-primary);
  padding: 10px 12px;
  font-size: 0.88rem;
  outline: none;
  cursor: pointer;
}

.filter-group select option {
  background: var(--bg-card);
}

.filter-group input[type="range"] {
  padding: 0;
  height: 4px;
  border: none;
  cursor: pointer;
  accent-color: var(--accent);
}

.filter-reset {
  width: 100%;
  padding: 10px;
  background: none;
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--tr-fast);
}

.filter-reset:hover {
  border-color: var(--accent-red);
  color: var(--accent-red);
}

.filter-rating-value {
  font-size: 0.78rem;
  color: var(--accent);
  text-align: right;
  margin-top: 4px;
}

#search-results {
  min-height: 300px;
}

.results-count {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: var(--space-md);
}

/* ── Load more button ─────────────────────────────────────── */
.load-more-wrap {
  text-align: center;
  padding: var(--space-xl) 0;
}

.btn-load-more {
  padding: 12px 36px;
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--tr-smooth);
}

.btn-load-more:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* ═══════════════════════════════════════════════════════════
   FAVORITES PAGE
   ═══════════════════════════════════════════════════════════ */
.favorites-page {
  padding: 100px var(--space-xl) var(--space-2xl);
  max-width: 1300px;
  margin: 0 auto;
}

.favorites-page h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.favorites-page .subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin-bottom: var(--space-xl);
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: var(--space-lg);
}

.fav-card {
  cursor: pointer;
  position: relative;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: var(--bg-card);
  box-shadow: var(--shadow-card);
  transition: transform var(--tr-spring), box-shadow var(--tr-smooth);
}

.fav-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.fav-card img {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  display: block;
}

.fav-card-info {
  padding: var(--space-sm) var(--space-md);
}

.fav-card-title {
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.25;
}

.fav-card-rating {
  font-size: 0.72rem;
  color: var(--accent);
  margin-top: 2px;
}

.fav-remove {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--tr-fast);
  opacity: 0;
}

.fav-card:hover .fav-remove {
  opacity: 1;
}

.fav-remove:hover {
  background: var(--accent-red);
  color: #fff;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: var(--space-2xl);
  color: var(--text-muted);
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: var(--space-md);
}

.empty-state h3 {
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-sm);
}

.empty-state a {
  color: var(--accent);
}

.empty-state a:hover {
  text-decoration: underline;
}

/* ═══════════════════════════════════════════════════════════
   SKELETON LOADERS
   ═══════════════════════════════════════════════════════════ */
@keyframes shimmer {
  0% {
    background-position: -400px 0;
  }

  100% {
    background-position: 400px 0;
  }
}

.skeleton {
  background: linear-gradient(90deg, var(--bg-card) 25%, var(--bg-elevated) 50%, var(--bg-card) 75%);
  background-size: 400px;
  animation: shimmer 1.4s infinite;
  border-radius: var(--radius-card);
}

.skeleton-card {
  width: 180px;
  flex-shrink: 0;
}

.skeleton-card-poster {
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: var(--radius-card);
}

.skeleton-card-line {
  height: 12px;
  margin: 6px;
  border-radius: 4px;
}

.skeleton-card-line.short {
  width: 60%;
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
.site-footer {
  border-top: 1px solid var(--glass-border);
  padding: var(--space-xl);
  text-align: center;
  color: var(--text-muted);
  font-size: 0.82rem;
}

.site-footer .footer-logo {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.site-footer .footer-logo span {
  color: var(--accent);
}

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .detail-main {
    grid-template-columns: 220px 1fr;
    gap: var(--space-lg);
  }

  .detail-main {
    margin-top: -140px;
  }

  .search-layout {
    grid-template-columns: 200px 1fr;
  }
}

@media (max-width: 768px) {
  :root {
    --space-xl: 24px;
    --space-2xl: 40px;
  }

  .navbar {
    padding: 0 var(--space-md);
  }

  .nav-links {
    display: none;
  }

  .nav-search {
    max-width: 100%;
  }

  .nav-hamburger {
    display: flex;
  }

  .hero-content {
    padding: var(--space-xl) var(--space-md);
  }

  .hero-overview {
    -webkit-line-clamp: 2;
  }

  .section-head {
    padding: 0 var(--space-md);
  }

  .carousel-track {
    padding: var(--space-sm) var(--space-md);
  }

  .movies-grid {
    padding: var(--space-md);
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .detail-main {
    grid-template-columns: 1fr;
    margin-top: 0;
    padding: var(--space-md);
  }

  .detail-poster-wrap {
    max-width: 220px;
    margin: 0 auto;
  }

  .detail-info {
    padding-top: var(--space-md);
  }

  .detail-backdrop-wrap {
    height: 45vh;
  }

  .search-page {
    padding: 90px var(--space-md) var(--space-xl);
  }

  .search-layout {
    grid-template-columns: 1fr;
  }

  .filter-panel {
    position: relative;
    top: 0;
  }

  .favorites-page {
    padding: 90px var(--space-md) var(--space-xl);
  }

  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .carousel-btn {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .movie-card {
    width: 140px;
  }

  .skeleton-card {
    width: 140px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-primary,
  .btn-ghost {
    padding: 12px 20px;
    font-size: 0.88rem;
  }

  .detail-title {
    font-size: 1.8rem;
  }
}

/* ═══════════════════════════════════════════════════════════
   UTILITY CLASSES
   ═══════════════════════════════════════════════════════════ */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.text-accent {
  color: var(--accent);
}

.text-muted {
  color: var(--text-muted);
}

.mt-auto {
  margin-top: auto;
}

.hidden {
  display: none !important;
}

.fade-in {
  animation: fadeIn 0.5s ease both;
}

@keyframes fadeIn {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

.slide-up {
  animation: heroSlideUp 0.5s ease both;
}