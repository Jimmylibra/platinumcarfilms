;(() => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded.');
        return;
      }
      'use strict';

    const features = Object.freeze([
        {
          icon: 'bi-layers-fill',
          title: 'Polymer base',
          image: 'https://platinumcarfilms.com/wp-content/uploads/2026/06/sli1.webp',
          advantage: 'Supports elasticity, durability, and paint-surface protection compared with basic film alternatives.',
          benefit: 'Installers can offer a more professional protection solution with better confidence.'
        },
        {
          icon: 'bi-patch-check-fill',
          title: 'Material positioning',
          image: 'https://platinumcarfilms.com/wp-content/uploads/2026/06/sl2.jpg',
          advantage: 'Connects the product to a recognized PPF material ecosystem.',
          benefit: 'Sellers  have a stronger quality story to explain to customers.'
        },
        {
          icon: 'bi-link-45deg',
          title: 'Adhesive layer positioning',
          image: 'https://platinumcarfilms.com/wp-content/uploads/2026/06/sl3.jpeg',
          advantage: 'Supports reliable surface bonding and professional application behavior.',
          benefit: 'Reduces rework risk and helps installers save time.'
        },
        {
          icon: 'bi-magic',
          title: 'Self-healing \n topcoat',
          image: 'https://platinumcarfilms.com/wp-content/uploads/2026/06/sl4-scaled.jpg',
          advantage: 'Swirl marks and light scratches can recover with heat exposure depending on conditions.',
          benefit: 'The film maintains a cleaner, aesthetic look.'
        },
        {
          icon: 'bi-droplet-half',
          title: 'Nanoceramic \n topcoat',
          image: 'https://platinumcarfilms.com/wp-content/uploads/2026/06/sl5.jpg',
          advantage: 'Enhances Gloss, helps water bead off and makes routine cleaning easier.',
          benefit: 'Easier maintenance as a practical benefit.'
        },
        {
          icon: 'bi-eye-fill',
          title: 'Anti-yellowing and \n high-clarity focus',
          image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1200&q=82',
          advantage: 'Gives aesthetic look to car appearance.',
          benefit: 'The user feels more confident preserving original paint aesthetics.'
        },
        {
          icon: 'bi-rulers',
          title: 'Thickness options',
          image: 'https://platinumcarfilms.com/wp-content/uploads/2026/06/sl6-scaled.jpg',
          advantage: 'More thickness choices for different performance, and needs.',
          benefit: 'Distributors can serve multiple customer tiers.'
        },
        {
          icon: 'bi-box-seam-fill',
          title: 'OEM/ODM \n customization',
          image: 'https://platinumcarfilms.com/wp-content/uploads/2026/06/sl7.jpg',
          advantage: 'Supports branding, packaging, and product-positioning.',
          benefit: 'Can build own market identity with less operational friction.'
        }
      ]);

      const featureList = document.querySelector('[data-feature-list]');
      const imageStack = document.querySelector('[data-image-stack]');
      const progressBar = document.querySelector('[data-progress-bar]');
      const activeTitle = document.querySelector('[data-active-title]');

      if (!featureList || !imageStack || !progressBar || !activeTitle) return;

      const makeEl = (tag, className, text) => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
      };

      const cardFragment = document.createDocumentFragment();
      const imageFragment = document.createDocumentFragment();

      features.forEach((feature, index) => {
        const img = makeEl('img', `ppf-product-image${index === 0 ? ' is-active' : ''}`);
        img.src = feature.image;
        img.alt = `${feature.title} visual`;
        img.loading = index === 0 ? 'eager' : 'lazy';
        img.decoding = 'async';
        img.dataset.imageIndex = String(index);
        imageFragment.append(img);

        const card = makeEl('article', 'ppf-card');
        card.dataset.index = String(index);

        const number = makeEl('div', 'ppf-card-index', String(index + 1).padStart(2, '0'));
        number.setAttribute('aria-hidden', 'true');

        const inner = makeEl('div', 'ppf-card-inner');
        const iconWrap = makeEl('div', 'ppf-icon');
        const icon = makeEl('i', `bi ${feature.icon}`);
        icon.setAttribute('aria-hidden', 'true');
        iconWrap.append(icon);

        const content = makeEl('div');
        content.append(
          makeEl('p', 'ppf-card-kicker', 'Feature / NLP Entity'),
          makeEl('h3', '', feature.title)
        );

        const copyGrid = makeEl('div', 'ppf-copy-grid');
        const advantage = makeEl('div', 'ppf-copy-box');
        advantage.append(
          makeEl('span', 'ppf-copy-label', 'Advantage'),
          makeEl('p', '', feature.advantage)
        );

        const benefit = makeEl('div', 'ppf-copy-box');
        benefit.append(
          makeEl('span', 'ppf-copy-label', 'Human Benefit'),
          makeEl('p', '', feature.benefit)
        );

        copyGrid.append(advantage, benefit);
        content.append(copyGrid);
        inner.append(iconWrap, content);
        card.append(number, inner);
        cardFragment.append(card);
      });

      imageStack.append(imageFragment);
      featureList.append(cardFragment);

      const cards = gsap.utils.toArray('.ppf-card');
      const images = gsap.utils.toArray('.ppf-product-image');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let currentIndex = 0;

      const setActiveCard = (activeIndex) => {
        if (activeIndex < 0 || activeIndex >= features.length) return;
        currentIndex = activeIndex;

        cards.forEach((card, index) => card.classList.toggle('is-active', index === activeIndex));
        images.forEach((image, index) => image.classList.toggle('is-active', index === activeIndex));

        activeTitle.textContent = features[activeIndex].title;

        gsap.to(progressBar, {
          width: `${((activeIndex + 1) / features.length) * 100}%`,
          duration: prefersReducedMotion ? 0 : 0.35,
          ease: 'power2.out',
          overwrite: true
        });
      };

      setActiveCard(0);

      if (prefersReducedMotion) return;

      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();

      mm.add('(min-width: 981px)', () => {
        gsap.from('[data-visual-card]', {
          y: 42,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-visual-card]',
            start: 'top 82%'
          }
        });

        gsap.to('.ppf-product-image', {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.ppf-section',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
          }
        });

        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { opacity: 0.28, y: 44, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 74%',
                end: 'top 38%',
                scrub: 0.55,
                onEnter: () => setActiveCard(index),
                onEnterBack: () => setActiveCard(index)
              }
            }
          );
        });
      });

      mm.add('(max-width: 980px)', () => {
        gsap.from('.ppf-card', {
          opacity: 0,
          y: 34,
          duration: 0.65,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.ppf-cards',
            start: 'top 84%'
          }
        });

        cards.forEach((card, index) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 58%',
            end: 'bottom 58%',
            onEnter: () => setActiveCard(index),
            onEnterBack: () => setActiveCard(index)
          });
        });
      });
    })();
    
    
jQuery(document).ready(function ($) {
    const counterData = [
      {
        value: 7.5,
        label: 'Mil Option'
      },
      {
        value: 8.5,
        label: 'Mil Premium'
      },
      {
        value: 100,
        label: '% PPF Base'
      },
      {
        value: 24,
        label: 'Hr B2B Support'
      }
    ];

    const $wrap = $('#plppfCounterWrap');

    counterData.forEach(function (item, index) {
      const counterHtml = `
        <div class="plppf-counter-item">
          <span 
            class="plppf-counter-value" 
            data-target="${item.value}"
          >0</span>
          <span class="plppf-counter-label">${item.label}</span>
        </div>
      `;

      $wrap.append(counterHtml);
    });

    function runCounter($counter) {
      const target = parseFloat($counter.attr('data-target'));
      const hasDecimal = target % 1 !== 0;
      const duration = 1600;
      const startTime = performance.now();
    
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = easedProgress * target;
    
        if (hasDecimal) {
          $counter.text(currentValue.toFixed(1));
        } else {
          $counter.text(Math.floor(currentValue));
        }
    
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          $counter.text(hasDecimal ? target.toFixed(1) : target);
        }
      }
    
      requestAnimationFrame(updateCounter);
    }

    let hasAnimated = false;

    function isInViewport($element) {
        const elementTop = $element.offset().top;
        const elementBottom = elementTop + $element.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function checkCounterSection() {
        if (hasAnimated) return;

            if (isInViewport($('.plppf-counter-section'))) {
            hasAnimated = true;
    
            $('.plppf-counter-value').each(function () {
              runCounter($(this));
            });
        }
    }

    checkCounterSection();

    $(window).on('scroll resize', checkCounterSection);
 });