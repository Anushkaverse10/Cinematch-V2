/**
 * Cinematch — Movie Detail Page Logic
 */

import { getMovieDetail, getTrailerKey, getWatchProviders, getSimilarMovies, imgURL } from './api.js';
import { truncate, fmtRating, langName, fmtYear, fmtRuntime, addFavorite, isFavorite, removeFavorite, OTT_PROVIDERS, addToHistory, getParam } from './utils.js';
import { initLoader } from './loader.js';
import { createMovieCard } from './home.js';

document.addEventListener('DOMContentLoaded', async () => {
  initLoader(1800);

  const id = getParam('id');
  if (!id) {
    document.body.innerHTML = `<div class="empty-state" style="padding:15vh 2rem;"><div class="empty-state-icon">🎬</div><h3>Movie not found</h3><a href="index.html">← Back to home</a></div>`;
    return;
  }

  initNavbar();

  const movie = await getMovieDetail(id);
  if (!movie) { window.location.href = 'index.html'; return; }

  addToHistory(movie);
  renderDetail(movie);
  renderCast(movie.credits?.cast ?? []);
  renderOTT(movie['watch/providers']?.results?.IN ?? null, movie.title);
  renderSimilar(movie.similar?.results ?? []);
  initTrailerModal(id);
  initFavButton(movie);
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

// ── Main detail render ────────────────────────────────────────
function renderDetail(movie) {
  document.title = `${movie.title} — Cinematch`;

  // Backdrop
  const bdWrap = document.querySelector('.detail-backdrop-wrap');
  const bdImg  = document.getElementById('detail-backdrop-img');
  if (bdImg) {
    const src = imgURL(movie.backdrop_path, 'original') || imgURL(movie.poster_path, 'w780');
    if (src) {
      bdImg.src = src;
      bdImg.alt = movie.title;
    } else {
      bdWrap?.classList.add('hidden');
    }
  }

  // Poster
  const posterEl = document.getElementById('detail-poster');
  if (posterEl) {
    const src = imgURL(movie.poster_path, 'w500');
    if (src) { posterEl.src = src; posterEl.alt = movie.title; }
    else posterEl.style.display = 'none';
  }

  // Title
  const titleEl = document.getElementById('detail-title');
  if (titleEl) titleEl.textContent = movie.title;

  // Genres
  const genresEl = document.getElementById('detail-genres');
  if (genresEl && movie.genres) {
    genresEl.innerHTML = movie.genres.map(g => `<span class="genre-tag">${g.name}</span>`).join('');
  }

  // Meta
  const metaEl = document.getElementById('detail-meta');
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="detail-rating">⭐ ${fmtRating(movie.vote_average)}</span>
      ${movie.release_date ? `<span class="detail-meta-dot"></span><span>${fmtYear(movie.release_date)}</span>` : ''}
      ${movie.runtime     ? `<span class="detail-meta-dot"></span><span>${fmtRuntime(movie.runtime)}</span>` : ''}
      ${movie.original_language ? `<span class="detail-meta-dot"></span><span>${langName(movie.original_language)}</span>` : ''}
    `;
  }

  // Overview
  const ovEl = document.getElementById('detail-overview');
  if (ovEl) ovEl.textContent = movie.overview || 'No description available.';
}

// ── Cast ──────────────────────────────────────────────────────
function renderCast(cast) {
  const track = document.getElementById('cast-track');
  if (!track) return;
  const top = cast.slice(0, 15);
  if (!top.length) { track.closest('.cast-section')?.classList.add('hidden'); return; }

  track.innerHTML = top.map(p => {
    const img = imgURL(p.profile_path, 'w185');
    return `
      <div class="cast-card">
        ${img
          ? `<img src="${img}" alt="${p.name}" loading="lazy">`
          : `<div class="cast-card-placeholder">👤</div>`}
        <div class="cast-name">${p.name}</div>
        <div class="cast-character text-muted">${truncate(p.character, 25)}</div>
      </div>
    `;
  }).join('');
}

// ── OTT Providers ─────────────────────────────────────────────
function renderOTT(providers, title) {
  const container = document.getElementById('ott-badges');
  const section   = document.querySelector('.ott-section');
  if (!container) return;

  const flatrate = providers?.flatrate ?? [];
  const rent     = providers?.rent ?? [];
  const buy      = providers?.buy ?? [];
  const all = [...flatrate, ...rent, ...buy];

  if (!all.length) {
    container.innerHTML = `<span class="ott-unavailable">Not available on OTT in India yet</span>`;
    return;
  }

  const seen = new Set();
  const html = all.map(p => {
    if (seen.has(p.provider_id)) return '';
    seen.add(p.provider_id);
    const meta = OTT_PROVIDERS[p.provider_id];
    const logoSrc = meta?.logo || imgURL(p.logo_path, 'w92');
    const link = meta ? `${meta.link}${encodeURIComponent(title)}` : providers?.link || '#';
    const name = meta?.name || p.provider_name;
    return `
      <a href="${link}" target="_blank" rel="noopener" class="ott-badge">
        ${logoSrc ? `<img src="${logoSrc}" alt="${name}" onerror="this.style.display='none'">` : ''}
        <span>${name}</span>
      </a>
    `;
  }).join('');

  container.innerHTML = html || `<span class="ott-unavailable">Not available on OTT in India yet</span>`;
}

// ── Similar Movies ────────────────────────────────────────────
function renderSimilar(movies) {
  const track = document.getElementById('similar-track');
  if (!track) return;
  if (!movies.length) { track.closest('.section')?.classList.add('hidden'); return; }

  movies.slice(0, 15).forEach(m => track.appendChild(createMovieCard(m)));

  // Carousel arrows
  const container = track.closest('.carousel-container');
  if (container) {
    const prev = container.querySelector('.carousel-btn.prev');
    const next = container.querySelector('.carousel-btn.next');
    if (prev) prev.onclick = () => track.scrollBy({ left: -600, behavior: 'smooth' });
    if (next) next.onclick = () => track.scrollBy({ left: 600, behavior: 'smooth' });
  }
}

// ── Trailer modal ─────────────────────────────────────────────
function initTrailerModal(movieId) {
  const modal    = document.getElementById('trailer-modal');
  const frame    = document.getElementById('trailer-frame');
  const closeBtn = modal?.querySelector('.modal-close');

  document.getElementById('detail-trailer-btn')?.addEventListener('click', async () => {
    const key = await getTrailerKey(movieId);
    if (!key) { alert('No trailer available 😢'); return; }
    if (frame) frame.src = `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`;
    modal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeTrailer = () => {
    modal?.classList.remove('open');
    if (frame) frame.src = '';
    document.body.style.overflow = '';
  };
  if (closeBtn) closeBtn.onclick = closeTrailer;
  modal?.addEventListener('click', e => { if (e.target === modal) closeTrailer(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTrailer(); });
}

// ── Favorite button ───────────────────────────────────────────
function initFavButton(movie) {
  const btn = document.getElementById('detail-fav-btn');
  if (!btn) return;

  const update = () => {
    if (isFavorite(movie.id)) {
      btn.textContent = '♥ Saved';
      btn.classList.add('active');
    } else {
      btn.textContent = '♡ Add to Favorites';
      btn.classList.remove('active');
    }
  };
  update();

  btn.addEventListener('click', () => {
    if (isFavorite(movie.id)) removeFavorite(movie.id);
    else addFavorite(movie);
    update();
  });
}
