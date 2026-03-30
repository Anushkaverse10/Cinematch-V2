/**
 * Cinematch — Search & Discover Page Logic
 */

import { searchMovies, discoverMovies } from './api.js';
import { debounce, getParam, LANG_NAMES, GENRE_MAP } from './utils.js';
import { initLoader } from './loader.js';
import { createMovieCard } from './home.js';

let currentPage = 1;
let totalPages  = 1;
let currentQuery = '';
let currentFilters = {};

document.addEventListener('DOMContentLoaded', () => {
  initLoader(1500);
  initNavbar();
  populateFilterOptions();

  const q = getParam('q');
  if (q) {
    const inp = document.getElementById('search-input');
    if (inp) inp.value = q;
    currentQuery = q;
  }

  const navInp = document.getElementById('nav-search-input');
  if (navInp && q) navInp.value = q;

  doSearch(true);

  // Live search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(() => {
      currentQuery = searchInput.value.trim();
      doSearch(true);
    }, 400));
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') { currentQuery = searchInput.value.trim(); doSearch(true); }
    });
  }

  // Filters
  ['filter-language','filter-genre','filter-year','filter-sort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', () => { collectFilters(); doSearch(true); });
  });

  // Rating slider
  const ratingSlider = document.getElementById('filter-rating');
  const ratingVal    = document.getElementById('filter-rating-val');
  if (ratingSlider) {
    ratingSlider.addEventListener('input', () => {
      if (ratingVal) ratingVal.textContent = `${ratingSlider.value}+`;
      collectFilters();
      debounce(() => doSearch(true), 400)();
    });
  }

  // Reset filters
  document.getElementById('filter-reset')?.addEventListener('click', resetFilters);

  // Load more
  document.getElementById('load-more-btn')?.addEventListener('click', () => doSearch(false));

  // Nav search
  if (navInp) {
    navInp.addEventListener('keydown', e => {
      if (e.key === 'Enter' && navInp.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(navInp.value.trim())}`;
      }
    });
  }
});

function initNavbar() {
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

function populateFilterOptions() {
  // Languages
  const langSel = document.getElementById('filter-language');
  if (langSel) {
    Object.entries(LANG_NAMES).forEach(([code, name]) => {
      const opt = document.createElement('option');
      opt.value = code; opt.textContent = name;
      langSel.appendChild(opt);
    });
  }

  // Genres
  const genreSel = document.getElementById('filter-genre');
  if (genreSel) {
    Object.entries(GENRE_MAP).forEach(([id, name]) => {
      const opt = document.createElement('option');
      opt.value = id; opt.textContent = name;
      genreSel.appendChild(opt);
    });
  }

  // Years
  const yearSel = document.getElementById('filter-year');
  if (yearSel) {
    const now = new Date().getFullYear();
    for (let y = now; y >= 1980; y--) {
      const opt = document.createElement('option');
      opt.value = y; opt.textContent = y;
      yearSel.appendChild(opt);
    }
  }
}

function collectFilters() {
  currentFilters = {
    language:  document.getElementById('filter-language')?.value || '',
    genre:     document.getElementById('filter-genre')?.value || '',
    year:      document.getElementById('filter-year')?.value || '',
    minRating: parseFloat(document.getElementById('filter-rating')?.value || '0'),
    sortBy:    document.getElementById('filter-sort')?.value || 'popularity.desc',
  };
}

function resetFilters() {
  ['filter-language','filter-genre','filter-year','filter-sort'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const r = document.getElementById('filter-rating');
  const rv = document.getElementById('filter-rating-val');
  if (r) r.value = 0;
  if (rv) rv.textContent = '0+';
  currentFilters = {};
  doSearch(true);
}

async function doSearch(reset = true) {
  if (reset) { currentPage = 1; }

  const grid   = document.getElementById('search-results');
  const count  = document.getElementById('results-count');
  const loadBtn = document.getElementById('load-more-btn');

  if (!grid) return;

  collectFilters();

  if (reset) {
    grid.innerHTML = renderSkeletons(12);
    if (loadBtn) loadBtn.style.display = 'none';
  }

  let results = [], tp = 1;

  if (currentQuery) {
    const data = await searchMovies(currentQuery, { ...currentFilters, page: currentPage });
    results = data.results;
    tp = data.totalPages;
  } else {
    const data = await discoverMovies({ ...currentFilters, page: currentPage });
    results = data.results;
    tp = data.totalPages;
  }

  totalPages = tp;

  if (reset) grid.innerHTML = '';

  if (!results.length && reset) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>No results found</h3><p>Try adjusting your search or filters.</p></div>`;
    if (count) count.textContent = '';
    return;
  }

  if (count && reset) {
    count.textContent = currentQuery ? `Results for "${currentQuery}"` : 'Discover Movies';
  }

  results.forEach(m => {
    const card = createMovieCard(m);
    card.style.width = '';  // Override carousel card width for grid
    grid.appendChild(card);
  });

  // Load more button
  if (loadBtn) {
    loadBtn.style.display = currentPage < totalPages ? 'inline-flex' : 'none';
    loadBtn.onclick = () => { currentPage++; doSearch(false); };
  }
}

function renderSkeletons(n) {
  return Array.from({ length: n }, () => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-card-poster"></div>
      <div class="skeleton skeleton-card-line" style="margin-top:8px"></div>
      <div class="skeleton skeleton-card-line short"></div>
    </div>
  `).join('');
}
