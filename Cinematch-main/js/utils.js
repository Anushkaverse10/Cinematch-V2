/**
 * Cinematch — Shared Utilities
 */

/** Language code → display name */
export const LANG_NAMES = {
  hi: 'Hindi', bn: 'Bengali', ta: 'Tamil', te: 'Telugu',
  ml: 'Malayalam', kn: 'Kannada', mr: 'Marathi', pa: 'Punjabi',
  ur: 'Urdu', or: 'Odia', as: 'Assamese', en: 'English',
  ko: 'Korean', ja: 'Japanese', fr: 'French', es: 'Spanish',
  de: 'German', zh: 'Chinese', it: 'Italian', pt: 'Portuguese',
};

/** Genre ID → name */
export const GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV Movie',
  53: 'Thriller', 10752: 'War', 37: 'Western',
};

/** OTT provider metadata */
export const OTT_PROVIDERS = {
  8:   { name: 'Netflix',       logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',  link: 'https://www.netflix.com/search?q=' },
  9:   { name: 'Amazon Prime',  logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png',        link: 'https://www.primevideo.com/search?phrase=' },
  122: { name: 'Hotstar',       logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg', link: 'https://www.hotstar.com/in/search?q=' },
  237: { name: 'SonyLIV',       logo: 'https://upload.wikimedia.org/wikipedia/en/0/0e/SonyLIV_logo.png',            link: 'https://www.sonyliv.com/search?q=' },
  232: { name: 'ZEE5',          logo: 'https://upload.wikimedia.org/wikipedia/en/8/8e/ZEE5_logo.png',               link: 'https://www.zee5.com/search?q=' },
  220: { name: 'Aha',           logo: null,                                                                           link: 'https://www.aha.video/search?q=' },
  11:  { name: 'Mubi',          logo: null,                                                                           link: 'https://mubi.com/en/films/' },
  62:  { name: 'Manorama Max',  logo: null,                                                                           link: 'https://www.manoramamax.com/' },
};

/** Truncate string */
export function truncate(str, len = 150) {
  if (!str) return '';
  return str.length <= len ? str : str.slice(0, len).trim() + '…';
}

/** Format rating to 1 decimal */
export function fmtRating(n) {
  return n ? parseFloat(n).toFixed(1) : 'N/A';
}

/** Star display string */
export function starRating(n) {
  const v = parseFloat(n) || 0;
  const full = Math.round(v / 2);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

/** Language display name */
export function langName(code) {
  return LANG_NAMES[code] || code?.toUpperCase() || '';
}

/** localStorage helpers */
export function getStorage(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
export function setStorage(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

/** Favorites helpers */
export function getFavorites() { return getStorage('cm_favorites') || []; }
export function addFavorite(movie) {
  const favs = getFavorites();
  if (!favs.find(m => m.id === movie.id)) {
    favs.push({ id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average });
    setStorage('cm_favorites', favs);
  }
}
export function removeFavorite(id) {
  const favs = getFavorites().filter(m => m.id !== id);
  setStorage('cm_favorites', favs);
}
export function isFavorite(id) { return getFavorites().some(m => m.id === id); }

/** Recently viewed */
export function addToHistory(movie) {
  let hist = getStorage('cm_history') || [];
  hist = hist.filter(m => m.id !== movie.id);
  hist.unshift({ id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average });
  hist = hist.slice(0, 20);
  setStorage('cm_history', hist);
}
export function getHistory() { return getStorage('cm_history') || []; }

/** Debounce */
export function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/** Get URL search param */
export function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/** Format year from date string */
export function fmtYear(ds) { return ds ? ds.slice(0, 4) : ''; }

/** Format runtime */
export function fmtRuntime(mins) {
  if (!mins) return '';
  const h = Math.floor(mins / 60), m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}
