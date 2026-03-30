/**
 * Cinematch — Favorites Page Logic
 */

import { imgURL } from './api.js';
import { getFavorites, removeFavorite, fmtRating } from './utils.js';
import { initLoader } from './loader.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoader(1400);
  initNavbar();
  renderFavorites();
});

function initNavbar() {
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const navInp = document.getElementById('nav-search-input');
  if (navInp) {
    navInp.addEventListener('keydown', e => {
      if (e.key === 'Enter' && navInp.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(navInp.value.trim())}`;
      }
    });
  }
}

function renderFavorites() {
  const grid     = document.getElementById('favorites-grid');
  const subtitle = document.getElementById('fav-subtitle');
  if (!grid) return;

  const favs = getFavorites();

  if (favs.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">🎬</div>
        <h3>No favorites yet</h3>
        <p>Discover something you love and tap <strong>♥</strong> to save it here.</p>
        <br>
        <a href="index.html" class="btn-primary" style="display:inline-flex;gap:8px;padding:12px 24px;background:var(--text-primary);color:var(--bg-primary);border-radius:999px;font-weight:700;font-size:0.9rem;text-decoration:none;">
          ← Explore Movies
        </a>
      </div>
    `;
    if (subtitle) subtitle.textContent = 'Your saved movies will appear here.';
    return;
  }

  if (subtitle) subtitle.textContent = `${favs.length} movie${favs.length !== 1 ? 's' : ''} saved`;

  grid.innerHTML = '';
  favs.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'fav-card fade-in';
    card.dataset.id = movie.id;

    const poster = imgURL(movie.poster_path, 'w300');
    card.innerHTML = `
      ${poster ? `<img src="${poster}" alt="${movie.title}" loading="lazy">` : `<div class="movie-card-poster-placeholder">🎬</div>`}
      <div class="fav-card-info">
        <div class="fav-card-title">${movie.title}</div>
        <div class="fav-card-rating">⭐ ${fmtRating(movie.vote_average)}</div>
      </div>
      <button class="fav-remove" title="Remove from favorites">✕</button>
    `;

    // Navigate to detail on click
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('fav-remove')) return;
      window.location.href = `movie-detail.html?id=${movie.id}`;
    });

    // Remove
    card.querySelector('.fav-remove')?.addEventListener('click', (e) => {
      e.stopPropagation();
      removeFavorite(movie.id);
      card.style.transition = 'opacity 250ms, transform 250ms';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.85)';
      setTimeout(() => {
        card.remove();
        const remaining = getFavorites();
        if (subtitle) subtitle.textContent = `${remaining.length} movie${remaining.length !== 1 ? 's' : ''} saved`;
        if (remaining.length === 0) renderFavorites();
      }, 260);
    });

    grid.appendChild(card);
  });
}
