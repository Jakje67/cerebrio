(function () {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.textContent = open ? '✕' : '☰';
  });

  // Mobile: expand submenu without navigating away on first tap
  nav.querySelectorAll('.nav-item.has-sub > .nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (!window.matchMedia('(max-width: 920px)').matches) return;
      const item = link.parentElement;
      const wasOpen = item.classList.contains('open');
      // close others
      nav.querySelectorAll('.nav-item.has-sub.open').forEach((el) => {
        if (el !== item) el.classList.remove('open');
      });
      if (!wasOpen) {
        e.preventDefault();
        item.classList.add('open');
      }
      // second click follows the link
    });
  });

  // Close mobile menu after choosing a leaf link
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (!window.matchMedia('(max-width: 920px)').matches) return;
      if (a.parentElement?.classList.contains('has-sub') && a.classList.contains('nav-link')) return;
      nav.classList.remove('open');
      toggle.textContent = '☰';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* Mapa – otevření ve vrstvě (modal), ne nové okno */
(function () {
  const modal = document.getElementById('mapModal');
  if (!modal) return;
  const openers = document.querySelectorAll('[data-map-open]');
  const closers = modal.querySelectorAll('[data-map-close]');

  function openMap() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeMap() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  openers.forEach((el) => el.addEventListener('click', (e) => {
    e.preventDefault();
    openMap();
  }));
  closers.forEach((el) => el.addEventListener('click', closeMap));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeMap();
  });
})();

/* Cookie consent + policy modal */
(function () {
  var root = document.getElementById('cookie-consent');
  var policyModal = document.getElementById('cookie-policy-modal');
  var reopen = document.getElementById('cookie-reopen');
  if (!root) return;

  var KEY = 'cookie_consent';
  var main = document.getElementById('cookie-consent-main');
  var settings = document.getElementById('cookie-consent-settings');
  var analytics = document.getElementById('cookie-opt-analytics');
  var preferences = document.getElementById('cookie-opt-preferences');
  var marketing = document.getElementById('cookie-opt-marketing');

  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function write(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {}
    document.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: data }));
  }

  function showConsent() {
    root.hidden = false;
    if (reopen) reopen.hidden = true;
  }

  function hideConsent() {
    root.hidden = true;
    if (reopen) reopen.hidden = false;
  }

  function showPolicy() {
    if (policyModal) {
      policyModal.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  }

  function hidePolicy() {
    if (policyModal) {
      policyModal.hidden = true;
      document.body.style.overflow = '';
    }
  }

  function showSettings() {
    if (main) main.hidden = true;
    if (settings) settings.hidden = false;
    showConsent();
  }

  function showMain() {
    if (settings) settings.hidden = true;
    if (main) main.hidden = false;
  }

  function applyChoice(choice) {
    write({
      necessary: true,
      analytics: !!choice.analytics,
      preferences: !!choice.preferences,
      marketing: !!choice.marketing,
      ts: new Date().toISOString()
    });
    hidePolicy();
    hideConsent();
  }

  function onAction(action) {
    if (action === 'accept') {
      applyChoice({ analytics: true, preferences: true, marketing: true });
    } else if (action === 'reject') {
      applyChoice({ analytics: false, preferences: false, marketing: false });
    } else if (action === 'settings') {
      hidePolicy();
      showSettings();
    } else if (action === 'back') {
      showMain();
    } else if (action === 'save') {
      applyChoice({
        analytics: analytics ? analytics.checked : false,
        preferences: preferences ? preferences.checked : false,
        marketing: marketing ? marketing.checked : false
      });
    } else if (action === 'policy') {
      showPolicy();
    } else if (action === 'close-policy') {
      hidePolicy();
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-cookie-action]');
    if (!el) return;
    e.preventDefault();
    onAction(el.getAttribute('data-cookie-action'));
  });

  if (reopen) {
    reopen.addEventListener('click', function () {
      showMain();
      showConsent();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && policyModal && !policyModal.hidden) {
      hidePolicy();
    }
  });

  // Footer / external links to open policy or settings
  document.querySelectorAll('a[href*="slug=cookies"], a[data-open-cookie-settings]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showPolicy();
    });
  });

  var existing = read();
  if (!existing) {
    showConsent();
  } else if (reopen) {
    reopen.hidden = false;
  }
})();

/* GDPR policy modal */
(function () {
  var modal = document.getElementById('gdpr-policy-modal');
  if (!modal) return;

  function open() {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var openLink = e.target.closest('a.js-gdpr-modal, a[href*="slug=gdpr"]');
    if (openLink && openLink.classList.contains('js-gdpr-modal')) {
      e.preventDefault();
      open();
      return;
    }
    var act = e.target.closest('[data-gdpr-action]');
    if (act && act.getAttribute('data-gdpr-action') === 'close') {
      e.preventDefault();
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();

/* Lightbox fotogalerie – úvodní náhledy + Ukázky na webu */
(function () {
  var sources = [];
  var index = 0;
  var overlay = null;
  var imgEl = null;
  var captionEl = null;
  var counterEl = null;
  var touchStartX = 0;
  var touchDeltaX = 0;

  function collectFrom(container, itemSel, imgSel) {
    if (!container) return;
    container.querySelectorAll(itemSel).forEach(function (item) {
      var img = item.querySelector(imgSel);
      if (!img || !img.getAttribute('src')) return;
      var src = img.getAttribute('src');
      var alt = img.getAttribute('alt') || '';
      var titleEl = item.querySelector('[data-lb-title], .photo-title');
      var title = (titleEl && titleEl.textContent.trim()) || alt;
      // title from sibling text under photo on galerie page
      if (!title) {
        var next = item.querySelector('div');
        if (next && next.textContent) title = next.textContent.trim();
      }
      var myIndex = sources.length;
      sources.push({ src: src, title: title, el: item, img: img });
      item.style.cursor = 'pointer';
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.addEventListener('click', function (e) {
        e.preventDefault();
        // živý src (po rotaci na úvodní stránce)
        if (img && img.getAttribute('src')) {
          sources[myIndex].src = img.currentSrc || img.getAttribute('src');
          sources[myIndex].title = img.getAttribute('alt') || sources[myIndex].title;
        }
        openAt(myIndex);
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (img && img.getAttribute('src')) {
            sources[myIndex].src = img.currentSrc || img.getAttribute('src');
            sources[myIndex].title = img.getAttribute('alt') || sources[myIndex].title;
          }
          openAt(myIndex);
        }
      });
    });
  }

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML =
      '<button type="button" class="lb-close" aria-label="Zavřít">✕</button>' +
      '<div class="lb-inner">' +
      '  <div class="lb-img-wrap">' +
      '    <button type="button" class="lb-btn lb-prev" aria-label="Předchozí">‹</button>' +
      '    <img alt="" draggable="false">' +
      '    <button type="button" class="lb-btn lb-next" aria-label="Další">›</button>' +
      '  </div>' +
      '  <div class="lb-caption"></div>' +
      '  <div class="lb-counter"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    imgEl = overlay.querySelector('img');
    captionEl = overlay.querySelector('.lb-caption');
    counterEl = overlay.querySelector('.lb-counter');

    overlay.querySelector('.lb-close').addEventListener('click', close);
    overlay.querySelector('.lb-prev').addEventListener('click', function (e) {
      e.stopPropagation();
      show(index - 1);
    });
    overlay.querySelector('.lb-next').addEventListener('click', function (e) {
      e.stopPropagation();
      show(index + 1);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    var wrap = overlay.querySelector('.lb-img-wrap');
    wrap.addEventListener('touchstart', function (e) {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      touchStartX = e.changedTouches[0].clientX;
      touchDeltaX = 0;
    }, { passive: true });
    wrap.addEventListener('touchmove', function (e) {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      touchDeltaX = e.changedTouches[0].clientX - touchStartX;
    }, { passive: true });
    wrap.addEventListener('touchend', function () {
      if (Math.abs(touchDeltaX) > 50) {
        if (touchDeltaX < 0) show(index + 1);
        else show(index - 1);
      }
      touchDeltaX = 0;
    });
  }

  function show(i) {
    if (!sources.length) return;
    index = (i + sources.length) % sources.length;
    var item = sources[index];
    imgEl.src = item.src;
    imgEl.alt = item.title || '';
    captionEl.textContent = item.title || '';
    counterEl.textContent = (index + 1) + ' / ' + sources.length;
  }

  function openAt(i) {
    if (i < 0 || !sources.length) return;
    ensureOverlay();
    show(i);
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!overlay) return;
    overlay.hidden = true;
    document.body.style.overflow = '';
    imgEl.removeAttribute('src');
  }

  document.addEventListener('keydown', function (e) {
    if (!overlay || overlay.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  // Home preview
  collectFrom(document.querySelector('.gallery-preview .gallery-grid'), '.gallery-item', 'img');
  // Ukázky na webu (galerie/)
  collectFrom(document.querySelector('.photo-grid'), '.photo', 'img');
})();


/* Úvod – náhodná obměna náhledů fotogalerie každých N minut */
(function () {
  var grid = document.getElementById('home-gallery-grid');
  var pool = window.HOME_GALLERY_POOL;
  if (!grid || !pool || !Array.isArray(pool) || pool.length < 2) return;

  var minutes = parseFloat(grid.getAttribute('data-rotate-minutes') || '3') || 3;
  var intervalMs = Math.max(30, minutes * 60) * 1000;
  var slots = grid.querySelectorAll('.gallery-item img');
  if (!slots.length) return;

  function pickRandom(n) {
    var copy = pool.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = copy[i];
      copy[i] = copy[j];
      copy[j] = t;
    }
    return copy.slice(0, Math.min(n, copy.length));
  }

  function applySet(items) {
    for (var i = 0; i < slots.length; i++) {
      var img = slots[i];
      if (!items[i]) continue;
      // plynulá výměna
      img.style.opacity = '0.35';
      (function (el, src, title) {
        var pre = new Image();
        pre.onload = function () {
          el.src = src;
          el.alt = title || '';
          el.style.transition = 'opacity .45s ease';
          el.style.opacity = '1';
        };
        pre.onerror = function () {
          el.style.opacity = '1';
        };
        pre.src = src;
      })(img, items[i].src, items[i].title);
    }
  }

  setInterval(function () {
    applySet(pickRandom(slots.length));
  }, intervalMs);
})();
