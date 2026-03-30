/**
 * Cinematch — Home Page Logic
 */

import { getTrending, getIndianPicks, getGlobalHits, getUpcoming } from './api.js';
import { imgURL } from './api.js';
import { truncate, fmtRating, langName, addFavorite, isFavorite, removeFavorite, addToHistory, getHistory, fmtYear } from './utils.js';
import { initLoader } from './loader.js';

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initLoader(2400);
  initNavbar();
  initTrailerModal();

  // Fetch all sections in parallel
  const [trending, indian, global, upcoming] = await Promise.all([
    getTrending(),
    getIndianPicks(),
    getGlobalHits(),
    getUpcoming(),
  ]);

  if (trending.length) {
    renderHero(trending[Math.floor(Math.random() * Math.min(5, trending.length))]);
    renderCarousel('trending-track', trending.slice(0, 20));
  }
  renderCarousel('indian-track', indian);
  renderCarousel('global-track', global.slice(0, 20));
  renderCarousel('upcoming-track', upcoming.slice(0, 20));
  renderBecauseYouWatched();
});

// ── Navbar ───────────────────────────────────────────────────
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const searchInput = document.getElementById('nav-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
}

// ── Hero ─────────────────────────────────────────────────────
function renderHero(movie) {
  const backdropEl = document.getElementById('hero-backdrop');
  const titleEl    = document.getElementById('hero-title');
  const metaEl     = document.getElementById('hero-meta');
  const overviewEl = document.getElementById('hero-overview');
  const watchBtn   = document.getElementById('hero-watch-btn');
  const infoBtn    = document.getElementById('hero-info-btn');

  if (!backdropEl) return;

  const backdrop = imgURL(movie.backdrop_path, 'original');
  if (backdrop) backdropEl.style.backgroundImage = `url(${backdrop})`;

  if (titleEl) titleEl.textContent = movie.title || movie.name;
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="rating">⭐ ${fmtRating(movie.vote_average)}</span>
      <span class="dot"></span>
      <span>${fmtYear(movie.release_date)}</span>
      <span class="dot"></span>
      <span>${langName(movie.original_language)}</span>
    `;
  }
  if (overviewEl) overviewEl.textContent = truncate(movie.overview, 200);
  if (watchBtn) watchBtn.onclick = () => openTrailer(movie.id);
  if (infoBtn) infoBtn.href = `movie-detail.html?id=${movie.id}`;
}

// ── Carousel ─────────────────────────────────────────────────
function renderCarousel(trackId, movies) {
  const track = document.getElementById(trackId);
  if (!track) return;
  track.innerHTML = '';
  movies.forEach(movie => {
    track.appendChild(createMovieCard(movie));
  });
  // Set up arrow controls
  const container = track.closest('.carousel-container');
  if (container) initCarouselArrows(container, track);
}

function initCarouselArrows(container, track) {
  const prev = container.querySelector('.carousel-btn.prev');
  const next = container.querySelector('.carousel-btn.next');
  if (prev) prev.onclick = () => track.scrollBy({ left: -600, behavior: 'smooth' });
  if (next) next.onclick = () => track.scrollBy({ left: 600, behavior: 'smooth' });
}

// ── Movie Card ───────────────────────────────────────────────
export function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card fade-in';
  const poster = imgURL(movie.poster_path, 'w300');
  const favActive = isFavorite(movie.id) ? 'active' : '';

  card.innerHTML = `
    ${movie.original_language && movie.original_language !== 'en'
      ? `<span class="movie-card-lang">${langName(movie.original_language)}</span>`
      : ''}
    ${poster
      ? `<img class="movie-card-poster" src="${poster}" alt="${movie.title}" loading="lazy">`
      : `<div class="movie-card-poster-placeholder">🎬</div>`}
    <div class="movie-card-overlay">
      <div class="movie-card-title">${movie.title || movie.name}</div>
      <div class="movie-card-rating">⭐ ${fmtRating(movie.vote_average)}</div>
      <div class="movie-card-btns">
        <button class="card-btn card-btn-watch">▶ Info</button>
        <button class="card-btn card-btn-fav ${favActive}" title="Favorite">♥</button>
      </div>
    </div>
  `;

  // Clicks
  const watchBtn = card.querySelector('.card-btn-watch');
  const favBtn   = card.querySelector('.card-btn-fav');

  card.addEventListener('click', (e) => {
    if (e.target === watchBtn || e.target === favBtn) return;
    addToHistory(movie);
    window.location.href = `movie-detail.html?id=${movie.id}`;
  });

  watchBtn.addEventListener('click', () => {
    addToHistory(movie);
    window.location.href = `movie-detail.html?id=${movie.id}`;
  });

  favBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
      favBtn.classList.remove('active');
    } else {
      addFavorite(movie);
      favBtn.classList.add('active');
      animateFav(favBtn);
    }
  });

  return card;
}

function animateFav(btn) {
  btn.style.transform = 'scale(1.4)';
  setTimeout(() => btn.style.transform = '', 300);
}

// ── Because You Watched ───────────────────────────────────────
function renderBecauseYouWatched() {
  const hist = getHistory();
  if (!hist.length) return;
  const section = document.getElementById('recently-section');
  if (section) {
    section.style.display = '';
    const track = document.getElementById('recently-track');
    if (track) {
      hist.forEach(movie => track.appendChild(createMovieCard(movie)));
      const container = track.closest('.carousel-container');
      if (container) initCarouselArrows(container, track);
    }
    const label = document.getElementById('recently-label');
    if (label && hist[0]) label.textContent = `Because You Watched "${hist[0].title}"`;
  }
}

// ── Trailer Modal ─────────────────────────────────────────────
function initTrailerModal() {
  const modal = document.getElementById('trailer-modal');
  if (!modal) return;
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.onclick = closeTrailer;
  modal.addEventListener('click', (e) => { if (e.target === modal) closeTrailer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeTrailer(); });
}

export async function openTrailer(movieId) {
  const { getTrailerKey } = await import('./api.js');
  const key = await getTrailerKey(movieId);
  const modal = document.getElementById('trailer-modal');
  const frame = document.getElementById('trailer-frame');
  if (!modal || !frame) return;

  if (!key) {
    alert('No trailer found 😢 — Try searching on YouTube!');
    return;
  }
  frame.src = `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTrailer() {
  const modal = document.getElementById('trailer-modal');
  const frame = document.getElementById('trailer-frame');
  if (modal) modal.classList.remove('open');
  if (frame) frame.src = '';
  document.body.style.overflow = '';
}
