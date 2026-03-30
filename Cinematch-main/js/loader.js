/**
 * Cinematch — Cinematic Loader / Splash Screen
 */

let loaderEl = null;

export function createLoader() {
  if (document.getElementById('cinematch-loader')) return;

  loaderEl = document.createElement('div');
  loaderEl.id = 'cinematch-loader';

  loaderEl.innerHTML = `
    <div class="loader-strips">
      ${Array.from({ length: 12 }, () => `<div class="loader-strip"></div>`).join('')}
    </div>
    <div class="loader-brand">
      <div class="loader-wordmark">Cine<span>match</span></div>
      <div class="loader-tagline">Find your next obsession</div>
    </div>
    <div class="loader-progress">
      <div class="loader-progress-bar"></div>
    </div>
  `;

  document.body.prepend(loaderEl);
}

export function hideLoader(delay = 2200) {
  const el = document.getElementById('cinematch-loader');
  if (!el) return;
  setTimeout(() => {
    el.classList.add('hidden');
    // Remove from DOM after transition completes
    setTimeout(() => el.remove(), 700);
  }, delay);
}

export function showLoader() {
  const el = document.getElementById('cinematch-loader');
  if (el) el.classList.remove('hidden');
}

/** Initialize loader — call on each page immediately */
export function initLoader(delay = 2200) {
  createLoader();
  hideLoader(delay);
}
