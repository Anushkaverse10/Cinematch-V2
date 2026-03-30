/**
 * Cinematch — TMDB API Module
 * All API calls are centralized here with simple in-memory caching (5-min TTL).
 */

const API_KEY = '8ee85dfe8bd1583b6f33c83e7b52317c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';
const CACHE = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/** Build a TMDB image URL. size: 'w200','w300','w500','w780','original' */
export function imgURL(path, size = 'w500') {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
}

/** Core fetch with TTL cache */
async function tmdbFetch(endpoint, params = {}) {
  const qp = new URLSearchParams({ api_key: API_KEY, ...params });
  const url = `${BASE_URL}/${endpoint}?${qp}`;
  const cached = CACHE.get(url);
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDB ${res.status}`);
    const data = await res.json();
    CACHE.set(url, { data, ts: Date.now() });
    return data;
  } catch (err) {
    console.error('[API]', err.message, url);
    return null;
  }
}

/** Trending movies this week */
export async function getTrending() {
  const d = await tmdbFetch('trending/movie/week');
  return d?.results ?? [];
}

/** Top Indian movies by language code */
export async function getTopIndian(language = 'hi', page = 1) {
  const d = await tmdbFetch('discover/movie', {
    with_original_language: language,
    sort_by: 'popularity.desc',
    'vote_count.gte': 100,
    page,
  });
  return d?.results ?? [];
}

/** Mix of popular Indian-language content */
export async function getIndianPicks() {
  const langs = ['hi', 'ta', 'te', 'ml', 'bn', 'kn'];
  const shuffled = langs.sort(() => 0.5 - Math.random()).slice(0, 3);
  const all = await Promise.all(shuffled.map(l => getTopIndian(l)));
  const flat = all.flat();
  // Deduplicate by id
  const seen = new Set();
  return flat.filter(m => { if (seen.has(m.id)) return false; seen.add(m.id); return true; })
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 20);
}

/** Global hits — popular non-Indian international */
export async function getGlobalHits() {
  const d = await tmdbFetch('discover/movie', {
    sort_by: 'popularity.desc',
    'vote_count.gte': 1000,
    'vote_average.gte': 7,
    without_original_language: 'hi|ta|te|ml|bn|kn',
    page: 1,
  });
  return d?.results ?? [];
}

/** Upcoming movies */
export async function getUpcoming() {
  const d = await tmdbFetch('movie/upcoming', { region: 'IN' });
  return d?.results ?? [];
}

/** Now playing in theatres */
export async function getNowPlaying() {
  const d = await tmdbFetch('movie/now_playing', { region: 'IN' });
  return d?.results ?? [];
}

/** Search movies */
export async function searchMovies(query, { language = '', year = '', page = 1 } = {}) {
  const params = { query, page };
  if (language) params.language = language;
  if (year) params.year = year;
  const d = await tmdbFetch('search/movie', params);
  return { results: d?.results ?? [], totalPages: d?.total_pages ?? 1 };
}

/** Discover with filters */
export async function discoverMovies({
  genre = '', language = '', year = '', minRating = 0, sortBy = 'popularity.desc', page = 1
} = {}) {
  const params = { sort_by: sortBy, 'vote_count.gte': 50, page };
  if (genre) params.with_genres = genre;
  if (language) params.with_original_language = language;
  if (year) params.year = year;
  if (minRating > 0) params['vote_average.gte'] = minRating;
  const d = await tmdbFetch('discover/movie', params);
  return { results: d?.results ?? [], totalPages: d?.total_pages ?? 1 };
}

/** Full movie detail */
export async function getMovieDetail(id) {
  const d = await tmdbFetch(`movie/${id}`, { append_to_response: 'credits,videos,watch/providers,similar' });
  return d;
}

/** Trailer key for YouTube */
export async function getTrailerKey(id) {
  const d = await tmdbFetch(`movie/${id}/videos`);
  const results = d?.results ?? [];
  const trailer = results.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    || results.find(v => v.site === 'YouTube');
  return trailer?.key ?? null;
}

/** OTT watch providers for India */
export async function getWatchProviders(id) {
  const d = await tmdbFetch(`movie/${id}/watch/providers`);
  return d?.results?.IN ?? null;
}

/** Similar movies */
export async function getSimilarMovies(id) {
  const d = await tmdbFetch(`movie/${id}/similar`);
  return d?.results?.slice(0, 20) ?? [];
}

/** Genre list */
export async function getGenres() {
  const d = await tmdbFetch('genre/movie/list');
  return d?.genres ?? [];
}

/** Underrated gems */
export async function getUnderrated(language = '') {
  const params = { 'vote_average.gte': 7, 'vote_count.gte': 100, 'vote_count.lte': 3000, sort_by: 'vote_average.desc' };
  if (language) params.with_original_language = language;
  const d = await tmdbFetch('discover/movie', params);
  return d?.results ?? [];
}
