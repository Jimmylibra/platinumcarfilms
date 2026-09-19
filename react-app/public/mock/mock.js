const root = document.documentElement;
const preference = matchMedia('(prefers-reduced-motion: reduce)');
let enabled = !preference.matches;
const motionBtn = document.querySelector('#motion');
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
const hero = document.querySelector('.hero');

/* ---------- Single source of truth for motion state ----------
   Every motion-driven feature (carousel autoplay, counters, parallax)
   subscribes here instead of reading `enabled` on its own timer. This is
   what was missing before: the OS-level reduced-motion change listener
   updated `enabled` but had no way to tell the carousel to stop. */
const motionListeners = [];
function onMotionChange(fn) {
  motionListeners.push(fn);
}
function setMotion(value) {
  enabled = value;
  root.classList.toggle('motion-enabled', value);
  root.classList.toggle('motion-off', !value);
  motionBtn.setAttribute('aria-pressed', String(value));
  motionBtn.textContent = value ? 'Motion on' : 'Motion off';
  update();
  motionListeners.forEach((fn) => fn(enabled));
}
motionBtn.addEventListener('click', () => setMotion(!enabled));
preference.addEventListener('change', (e) => setMotion(!e.matches));

/* ---------- Mobile menu ---------- */
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
    if (document.activeElement.closest('nav')) menu.focus();
  }
});
matchMedia('(min-width:1001px)').addEventListener('change', closeMenu);

/* ---------- Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.remove('pending');
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => {
  if (el.getBoundingClientRect().top > innerHeight) el.classList.add('pending');
  revealObserver.observe(el);
});

/* ---------- Hero scroll-linked parallax ---------- */
let ticking = false;
function update() {
  const progress = Math.min(1, Math.max(0, scrollY / hero.offsetHeight));
  root.style.setProperty('--progress', enabled ? progress : 0);
  document.querySelector('.header').classList.toggle('scrolled', scrollY > 50);
  ticking = false;
}
addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  },
  { passive: true }
);
addEventListener('resize', update);

/* ---------- Material section: per-card activation (not a short global
   progress range). Each card's own scroll distance decides when it
   activates, so eight features never race past in one short section. ---------- */
(function materialFeatures() {
  const cards = [...document.querySelectorAll('.ppf-card')];
  const images = [...document.querySelectorAll('.ppf-product-image')];
  const progressBar = document.querySelector('#ppfProgressBar');
  const activeTitle = document.querySelector('#ppfActiveTitle');
  if (!cards.length) return;

  let activeIndex = 0;
  let suppressUntil = 0; // ignore the observer briefly after a direct click

  function setActive(index, { fromClick = false } = {}) {
    if (index < 0 || index >= cards.length) return;
    activeIndex = index;
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === index);
      card.querySelector('[data-feature-trigger]')?.setAttribute('aria-pressed', String(i === index));
    });
    images.forEach((img, i) => img.classList.toggle('is-active', i === index));
    activeTitle.textContent = cards[index].querySelector('.ppf-card-title').textContent;
    if (progressBar) progressBar.style.width = `${((index + 1) / cards.length) * 100}%`;
    if (fromClick) suppressUntil = Date.now() + 700;
  }

  // Multiple cards can cross the 50% band in the same batch on a fast
  // scroll. Picking whichever entry happened to be last in that batch (the
  // previous approach) meant iteration order, not actual position, decided
  // the winner, which let a card in between get skipped over entirely.
  // Tracking every card's current ratio and always activating the one most
  // visible in the band fixes that regardless of scroll speed or batching.
  const ratios = new Array(cards.length).fill(0);

  function mostVisibleIndex() {
    let best = -1;
    let bestRatio = 0;
    ratios.forEach((ratio, i) => {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        best = i;
      }
    });
    return best;
  }

  const cardObserver = new IntersectionObserver(
    (entries) => {
      if (Date.now() < suppressUntil) return;
      entries.forEach((entry) => {
        const index = cards.indexOf(entry.target);
        if (index === -1) return;
        ratios[index] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      const best = mostVisibleIndex();
      if (best !== -1) setActive(best);
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-30% 0px -30% 0px' }
  );
  cards.forEach((card) => cardObserver.observe(card));

  cards.forEach((card, index) => {
    const trigger = card.querySelector('[data-feature-trigger]');
    trigger?.addEventListener('click', () => {
      setActive(index, { fromClick: true });
      // Scrolling to the chosen card is what stops the very next scroll
      // event from immediately reassigning "active" back to whatever was
      // already centered in the viewport.
      card.scrollIntoView({ block: 'center', behavior: enabled ? 'smooth' : 'auto' });
    });
  });

  setActive(0);
})();

/* ---------- Stats count-up (source: counterData in the archived app.js) ---------- */
(function statsCounters() {
  const values = [...document.querySelectorAll('.stat-value')];
  if (!values.length) return;
  let animated = false;
  const frames = new Map();
  function finishCounters() {
    frames.forEach(id => cancelAnimationFrame(id));
    frames.clear();
    values.forEach(el => { el.textContent = String(parseFloat(el.dataset.target)); });
  }

  function runCounter(el) {
    const target = parseFloat(el.dataset.target);
    const hasDecimal = target % 1 !== 0;
    const duration = 1600;
    const start = performance.now();
    function frame(now) {
      if (!enabled) { finishCounters(); return; }
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = hasDecimal ? current.toFixed(1) : String(Math.floor(current));
      if (progress < 1) frames.set(el, requestAnimationFrame(frame));
      else { el.textContent = hasDecimal ? target.toFixed(1) : String(target); frames.delete(el); }
    }
    frames.set(el, requestAnimationFrame(frame));
  }

  function playOnce() {
    if (animated || !enabled) return;
    animated = true;
    values.forEach((el) => {
      el.textContent = '0';
      runCounter(el);
    });
    statsObserver.disconnect();
  }

  const statsObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && playOnce()),
    { threshold: 0.4 }
  );
  const section = document.querySelector('#stats');
  if (section) statsObserver.observe(section);

  // If motion turns on later (it was off/reduced at load), still allow the
  // count-up the next time the section is visible; if it's already in view,
  // play immediately rather than leaving real numbers unanimated forever.
  onMotionChange((isEnabled) => {
    if (!isEnabled) { finishCounters(); return; }
    if (isEnabled && !animated) {
      const rect = section?.getBoundingClientRect();
      if (rect && rect.top < innerHeight && rect.bottom > 0) playOnce();
    }
  });
})();

/* ---------- Banner slider ---------- */
(function bannerSlider() {
  const track = document.querySelector('#bannerTrack');
  if (!track) return;
  const wrap = track.parentElement;
  const slides = [...track.querySelectorAll('.banner-slide')];
  const dotsWrap = document.querySelector('.banner-dots');
  const prevBtn = document.querySelector('.banner-prev');
  const nextBtn = document.querySelector('.banner-next');
  let index = 0;
  let timer = null;
  let hovering = false;
  let focused = false;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('aria-pressed', String(i === 0));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function render(smooth) {
    track.scrollTo({ left: index * track.clientWidth, behavior: smooth && enabled ? 'smooth' : 'auto' });
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.setAttribute('aria-pressed', String(i === index)));
  }
  function goTo(i, smooth) {
    index = (i + slides.length) % slides.length;
    render(smooth !== false);
    syncAutoplay();
  }
  function next() {
    goTo(index + 1);
  }
  function prev() {
    goTo(index - 1);
  }

  // One place decides whether autoplay should be running. Always clear
  // first, then conditionally start — this is what guarantees no duplicate
  // timers after repeated motion toggles or overlapping hover/focus events.
  function shouldAutoplay() {
    return enabled && !hovering && !focused && !document.hidden;
  }
  function syncAutoplay() {
    clearInterval(timer);
    timer = null;
    if (shouldAutoplay()) timer = setInterval(next, 5500);
  }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  wrap.addEventListener('mouseenter', () => {
    hovering = true;
    syncAutoplay();
  });
  wrap.addEventListener('mouseleave', () => {
    hovering = false;
    syncAutoplay();
  });
  wrap.addEventListener('focusin', () => {
    focused = true;
    syncAutoplay();
  });
  wrap.addEventListener('focusout', (e) => {
    if (!wrap.contains(e.relatedTarget)) {
      focused = false;
      syncAutoplay();
    }
  });
  document.addEventListener('visibilitychange', syncAutoplay);
  onMotionChange(syncAutoplay);

  // Keep dots/active-state in sync if the visitor scrolls the track
  // directly (touch/trackpad), not only through the prev/next controls.
  let scrollTicking = false;
  track.addEventListener(
    'scroll',
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const nearest = Math.round(track.scrollLeft / track.clientWidth);
        if (nearest !== index && nearest >= 0 && nearest < slides.length) {
          index = nearest;
          slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
          dots.forEach((d, i) => d.setAttribute('aria-pressed', String(i === index)));
        }
        scrollTicking = false;
      });
    },
    { passive: true }
  );
  addEventListener('resize', () => render(false));

  render(false);
  syncAutoplay();
})();

/* ---------- FAQ: single-open accordion (progressive enhancement over native <details>) ---------- */
document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach((other) => {
        if (other !== item) other.open = false;
      });
    }
  });
});

/* ---------- Partner track prev/next ---------- */
(function partnerTrack() {
  const track = document.querySelector('#partnerTrack');
  const prevBtn = document.querySelector('.partner-prev');
  const nextBtn = document.querySelector('.partner-next');
  if (!track || !prevBtn || !nextBtn) return;
  const step = () => track.clientWidth * 0.6;
  nextBtn.addEventListener('click', () => track.scrollBy({ left: step(), behavior: enabled ? 'smooth' : 'auto' }));
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: enabled ? 'smooth' : 'auto' }));
})();

/* ---------- Newsletter: local-only validation, no fake success ---------- */
(function newsletter() {
  const form = document.querySelector('#newsletterForm');
  const note = document.querySelector('#newsletterNote');
  const input = document.querySelector('#newsletterEmail');
  if (!form) return;
  const defaultNote = note.textContent;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value || !input.checkValidity()) {
      note.textContent = 'Enter a valid email address to preview this field — this design preview does not send data.';
      note.style.color = '#ff9b64';
      return;
    }
    note.textContent = 'This is a design preview — no subscription request was sent.';
    note.style.color = '';
    form.reset();
  });
  input.addEventListener('input', () => {
    note.textContent = defaultNote;
    note.style.color = '';
  });
})();

/* ---------- Quote dialog (native <dialog>: showModal() gives us a real
   top-layer stacking context, focus containment, and Escape-to-close for
   free — matching the pattern already used in ReplicaApp/Overlays.tsx). ---------- */
(function quoteDialog() {
  const dialog = document.querySelector('#quoteDialog');
  const closeBtn = document.querySelector('#quoteDialogClose');
  const form = document.querySelector('#quoteForm');
  const feedback = document.querySelector('#quoteFeedback');
  const triggers = [...document.querySelectorAll('[data-quote-trigger]')];
  if (!dialog || !form) return;

  let lastTrigger = null;
  let previousOverflow = '';

  function open(trigger) {
    lastTrigger = trigger || document.activeElement;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector('#quoteName')?.focus();
  }
  function close() {
    dialog.close();
  }
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    lastTrigger?.focus();
  });
  dialog.addEventListener('cancel', (e) => {
    // Native Escape handling already closes the dialog; nothing extra needed,
    // but prevent any default that would skip the 'close' event above.
    e.preventDefault();
    close();
  });
  // Click on the backdrop (native <dialog> reports clicks on the element
  // itself when they land outside the rendered content box).
  dialog.addEventListener('click', (e) => {
    if (e.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) close();
  });
  closeBtn.addEventListener('click', close);
  triggers.forEach((btn) => btn.addEventListener('click', () => open(btn)));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    feedback.hidden = false;
    feedback.textContent = 'This is a preview. Your inquiry has not been sent. Please use the sales email or WhatsApp link to contact the team.';
  });
})();

/* ---------- Replay hero ---------- */
document.querySelector('#replay').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (enabled) {
    for (const el of document.querySelectorAll('.hero-copy>*,.hero-media,.badge')) {
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    }
  }
});

setMotion(enabled);
update();
/* Re-sync scroll-linked positions after web fonts finish loading — font
   swaps reflow the page and can leave the initial hero progress state
   stale until the next real scroll event. */
window.addEventListener('load', update);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
