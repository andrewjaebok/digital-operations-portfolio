(() => {
  'use strict';

  const menuButton = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-public-nav]');
  const header = document.querySelector('[data-public-header]');
  function closeMenu({ restoreFocus = false } = {}) {
    if (!menuButton || !nav) return;
    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    const menuLabel = menuButton.querySelector('.sr-only');
    if (menuLabel) menuLabel.textContent = 'Open navigation';
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    if (restoreFocus && wasOpen) menuButton.focus();
  }

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    const menuLabel = menuButton.querySelector('.sr-only');
    if (menuLabel) menuLabel.textContent = open ? 'Open navigation' : 'Close navigation';
    nav?.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
    if (!open) nav?.querySelector('a')?.focus();
  });
  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu({ restoreFocus: true });
    if (event.key === 'Tab' && nav?.classList.contains('is-open')) {
      const focusable = [menuButton, ...nav.querySelectorAll('a')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 16);
  }, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeMenu();
  }, { passive: true });

  const featureContent = {
    dashboard: { kicker: 'MONTHLY SNAPSHOT', icon: '⌂', label: 'DASHBOARD', title: 'See the whole month at a glance.', copy: 'Financial Health, monthly flow, balances, goals, and reminders come together in one calm overview.', ring: 'Month' },
    transactions: { kicker: 'WHAT HAPPENED', icon: '↗', label: 'TRANSACTIONS', title: 'Give every dollar a clear place.', copy: 'Record spending, income, transfers, and goal contributions with the categories and accounts that fit your system.', ring: 'Track' },
    planning: { kicker: 'WHAT COMES NEXT', icon: '◇', label: 'PLANNING', title: 'Plan forward without losing the present.', copy: 'Set budgets, organize bills, review account balances, and give upcoming goals room in the month.', ring: 'Plan' },
    reports: { kicker: 'THE BIGGER PICTURE', icon: '▥', label: 'REPORTS', title: 'Turn monthly activity into perspective.', copy: 'Compare periods, follow balances, and understand the patterns building across your financial year.', ring: 'Review' },
    lists: { kicker: 'YOUR FINANCIAL SYSTEM', icon: '☷', label: 'MANAGE LISTS', title: 'Make LumaFi match real life.', copy: 'Control the categories, accounts, tags, owners, and reusable structure behind your financial home.', ring: 'Yours' }
  };
  const featureItems = [...document.querySelectorAll('[data-feature]')];
  function selectFeature(key, focus = false) {
    const content = featureContent[key];
    if (!content) return;
    featureItems.forEach(item => {
      const selected = item.dataset.feature === key;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      if (selected && focus) item.focus();
    });
    Object.entries({
      '[data-feature-kicker]': content.kicker, '[data-feature-icon]': content.icon,
      '[data-feature-label]': content.label, '[data-feature-title]': content.title,
      '[data-feature-copy]': content.copy, '[data-feature-ring]': content.ring
    }).forEach(([selector, value]) => {
      const node = document.querySelector(selector);
      if (node) node.textContent = value;
    });
  }
  featureItems.forEach((item, index) => {
    item.tabIndex = index === 0 ? 0 : -1;
    item.addEventListener('click', () => selectFeature(item.dataset.feature));
    item.addEventListener('keydown', event => {
      if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
      let next = event.key === 'Home' ? 0 : event.key === 'End' ? featureItems.length - 1 : (index + direction + featureItems.length) % featureItems.length;
      selectFeature(featureItems[next].dataset.feature, true);
    });
  });

  const galleryContent = {
    dashboard: ['MONTHLY SNAPSHOT', 'Your month at a glance', 'See Financial Health, monthly flow, balances, goals, and reminders together.'],
    transactions: ['TRANSACTIONS', 'Track what happened', 'Enter, filter, search, and organize spending, income, transfers, and other activity.'],
    planning: ['MONTHLY PLAN', 'Decide what comes next', 'Bring budgets, bills, goals, and expected balances into the same monthly plan.'],
    reports: ['REPORTS', 'Review the bigger picture', 'Compare periods and see the patterns that are building across your financial year.'],
    world: ['LUMAFI WORLD', 'Move through your financial home', 'Use optional visual navigation to open real destinations across LumaFi.']
  };
  const galleryTabs = [...document.querySelectorAll('[data-gallery]')];
  function selectGallery(key, focus = false) {
    const content = galleryContent[key];
    if (!content) return;
    galleryTabs.forEach(tab => {
      const selected = tab.dataset.gallery === key;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    const demo = document.querySelector('[data-gallery-demo]');
    if (demo) demo.dataset.view = key;
    document.querySelector('[data-gallery-kicker]').textContent = content[0];
    document.querySelector('[data-gallery-title]').textContent = content[1];
    document.querySelector('[data-gallery-copy]').textContent = content[2];
  }
  galleryTabs.forEach((tab, index) => {
    tab.tabIndex = index === 0 ? 0 : -1;
    tab.addEventListener('click', () => selectGallery(tab.dataset.gallery));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? galleryTabs.length - 1 : (index + direction + galleryTabs.length) % galleryTabs.length;
      selectGallery(galleryTabs[next].dataset.gallery, true);
    });
  });

})();
