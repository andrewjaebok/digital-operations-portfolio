(() => {
  'use strict';

  const storageKey = 'hearth-public-theme';
  const themeColor = {
    light: '#f1ede5',
    dark: '#171b1a'
  };

  function readTheme() {
    try {
      return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
    } catch (_) {
      return 'light';
    }
  }

  function applyTheme(theme, { persist = false } = {}) {
    const isDark = theme === 'dark';
    document.body?.classList.toggle('dark-mode', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = themeColor[isDark ? 'dark' : 'light'];

    document.querySelectorAll('[data-public-theme-toggle]').forEach(button => {
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('aria-pressed', String(isDark));
      const icon = button.querySelector('[data-public-theme-icon]');
      const label = button.querySelector('[data-public-theme-label]');
      if (icon) icon.textContent = isDark ? '☀️' : '🌙';
      if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
    });

    if (persist) {
      try {
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
      } catch (_) {}
    }
  }

  function initialize() {
    applyTheme(readTheme());
    document.querySelectorAll('[data-public-theme-toggle]').forEach(button => {
      button.addEventListener('click', () => {
        applyTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark', { persist: true });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
