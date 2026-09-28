/**
 * IEEE Computer Society MBITS — Avant-Garde Luxury Experience Engine
 * Inspired by Austo Entertainment (OTHRWRLD) & React Bits
 * 
 * Features:
 *  1. Lenis Inertial Smooth Scroll Engine
 *  2. GSAP ScrollTrigger Unified Kinetic Staggers & Reveals
 *  3. Minimal Floating Frosted Navbar & Contextual Header
 *  4. Austo Magnetic Circle Ripple Fill Buttons ([data-btn-hover])
 *  5. Dual-Element Custom Smooth Magnetic Cursor with Contextual Badges
 *  6. Floating Image Trail Follower (.event-follower__inner)
 *  7. Horizontal Draggable Chapter Roadmap (Timeline Engine)
 *  8. Horizontal Draggable Keystone Showcase Slider
 *  9. Interactive CSS Grid Accordion Pillars
 *  10. Fullscreen Cinema Lightbox Modal
 *  11. React Bits Pro Blinking Squares Grid Engine
 *  12. Hero Diagram Vector Draw-on & Masked Headline Animation
 *  13. Calendar Category Filter Tabs
 *  14. Developer CLI Console Drawer (`ieee-cli`)
 *  15. Austo Fullscreen Navigation Drawer & Toggle
 *  16. Live IST Timestamp Clock & Form Ingest Feedback
 *  17. React Bits <TechText /> Interactive Wordmark Canvas
 *  18. Masked Typography Line Reveals on Scroll
 *  19. 3D Perspective Card Physics & Specular Glare Tracking
 */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 1. Page Preloader & Transition
  // =========================================================================
  const pageLoader = document.getElementById('pageLoader');
  const loadProgress = document.getElementById('loadProgress');

  if (pageLoader && loadProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30 + 20;
      if (progress >= 100) {
        progress = 100;
        loadProgress.style.width = '100%';
        clearInterval(interval);
        setTimeout(() => {
          pageLoader.classList.add('is--loaded');
          animateHeroElements();
        }, 220);
      } else {
        loadProgress.style.width = `${progress}%`;
      }
    }, 40);
  } else {
    animateHeroElements();
  }

  // =========================================================================
  // 2. Lenis + GSAP ScrollTrigger Unified Smooth Scroll Engine
  // =========================================================================
  let lenisInstance = null;
  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      infinite: false
    });

    if (typeof gsap !== 'undefined') {
      if (typeof CustomEase !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, CustomEase);
        CustomEase.create("primary-ease", "0.62, 0.05, 0.01, 0.99");
        CustomEase.create("primary-ease-out", "0.17, 0.84, 0.44, 1");
      } else if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Synchronize Lenis with GSAP ScrollTrigger ticker
      lenisInstance.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Smooth Anchor Navigation via Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '#top') {
          e.preventDefault();
          lenisInstance.scrollTo(0, { duration: 1.2 });
          return;
        }
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenisInstance.scrollTo(target, { offset: -50, duration: 1.2 });
        }
      });
    });
  }

  // =========================================================================
  // HABITO STUDIO KINETIC SCROLL & TYPOGRAPHY SUITE
  // =========================================================================

  // 1. Stacked Card Section Overlap Architecture ([data-overlap-previous])
  function initSectionOverlap() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    const overlapSections = gsap.utils.toArray('[data-overlap-previous]');
    overlapSections.forEach((section) => {
      const prevSection = section.previousElementSibling;
      if (!prevSection) return;

      if (getComputedStyle(prevSection).position === 'static') {
        prevSection.style.position = 'relative';
      }

      let overlay = prevSection.querySelector('.g_section-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'g_section-overlay';
        prevSection.appendChild(overlay);
      }

      const getOffsetY = () => window.innerHeight / 4;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          onRefresh: (self) => {
            self.end = `bottom+=${getOffsetY()}px top`;
          }
        }
      });

      tl.to(prevSection, {
        y: () => getOffsetY(),
        rotate: 0.001,
        ease: 'none'
      }, 0);

      tl.to(overlay, {
        opacity: 0.55,
        ease: 'none'
      }, 0);

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top top',
        onEnter: () => {
          gsap.set(section, { zIndex: 10 });
          gsap.set(prevSection, { zIndex: 1 });
        },
        onLeaveBack: () => {
          gsap.set(section, { zIndex: 'auto' });
          gsap.set(prevSection, { zIndex: 'auto' });
        }
      });
    });
  }

  // 2. Expanding Headline Media Chip & Typography Scale Scrub
  function initBrandingAnimation() {
    const section = document.querySelector('.section.is-branding');
    if (!section || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const head = section.querySelector('.branding-head');
      const headWrap = section.querySelector('.branding-head-wrap');
      const textWrap = section.querySelector('[text-wrap]');
      const brandingImg = section.querySelector('[branding-img]');
      if (!head || !headWrap || !textWrap || !brandingImg) return;

      gsap.set(brandingImg, { width: '0em' });
      gsap.set(textWrap, { x: '-0.75em' });
      gsap.set(headWrap, { scale: 0.92 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '80% bottom',
          scrub: 1
        }
      })
      .fromTo(headWrap, { scale: 0.92 }, { scale: 1 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: '15% top',
          end: '75% bottom',
          scrub: 1
        }
      })
      .fromTo(brandingImg, { width: '0em' }, { width: 'clamp(3.5rem, 8vw, 8rem)' })
      .fromTo(textWrap, { x: '-0.75em' }, { x: '0em' }, 0);
    });
  }

  // 3. Client Review Background Color Morph (Paper #F7F7F5 -> Signature Petrol Teal #01565B)
  function initReviewColorMorph() {
    const reviewSection = document.querySelector('.section.is-client-review');
    if (!reviewSection || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    ScrollTrigger.create({
      trigger: reviewSection,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => reviewSection.classList.add('theme-teal'),
      onLeaveBack: () => reviewSection.classList.remove('theme-teal')
    });
  }

  // 4. Habito Interactive Track Switcher Pill
  function initHabitoSwitcher() {
    const switcher = document.getElementById('trackSwitcher');
    const slider = document.getElementById('switchSlider');
    if (!switcher || !slider) return;
    const buttons = switcher.querySelectorAll('.habito-switch-btn');
    const cards = document.querySelectorAll('#directoratesGrid .service-card');
    if (!buttons.length) return;

    function updateSlider(activeBtn) {
      const rect = activeBtn.getBoundingClientRect();
      const parentRect = switcher.getBoundingClientRect();
      slider.style.width = `${rect.width}px`;
      slider.style.transform = `translateX(${rect.left - parentRect.left - 4}px)`;
    }

    const activeBtn = switcher.querySelector('.habito-switch-btn.active') || buttons[0];
    setTimeout(() => updateSlider(activeBtn), 80);

    window.addEventListener('resize', () => {
      const curr = switcher.querySelector('.habito-switch-btn.active') || buttons[0];
      updateSlider(curr);
    });

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateSlider(btn);

        const dir = btn.getAttribute('data-directorate');
        cards.forEach((card) => {
          const type = card.getAttribute('data-directorate-type');
          if (dir === 'all' || type === dir) {
            gsap.to(card, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
          } else {
            gsap.to(card, { opacity: 0.22, scale: 0.98, duration: 0.25, ease: 'power2.out' });
          }
        });
      });
    });
  }

  // 5. Kinetic Marquee Dynamic Velocity Response (Skew on Scroll)
  function initKineticMarqueeVelocity() {
    const marqueeTrack = document.querySelector('.marquee-ticker__track');
    if (!marqueeTrack || !lenisInstance || prefersReducedMotion) return;

    let targetSkew = 0;
    let currentSkew = 0;

    lenisInstance.on('scroll', ({ velocity }) => {
      targetSkew = Math.max(-5, Math.min(5, velocity * 0.15));
    });

    gsap.ticker.add(() => {
      currentSkew += (targetSkew - currentSkew) * 0.1;
      targetSkew *= 0.94;
      if (Math.abs(currentSkew) > 0.01) {
        marqueeTrack.style.transform = `skewX(${currentSkew.toFixed(2)}deg)`;
      } else {
        marqueeTrack.style.transform = 'skewX(0deg)';
      }
    });
  }

  // Initialize Habito Suite
  initSectionOverlap();
  initBrandingAnimation();
  initReviewColorMorph();
  initHabitoSwitcher();
  initKineticMarqueeVelocity();

  // =========================================================================
  // 3. GSAP ScrollTrigger Comprehensive Animations & Staggers
  // =========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    
    // 3.1 Section Headers Stagger (Tag, Title, Index)
    document.querySelectorAll('.section__header').forEach((header) => {
      const innerMasks = header.querySelectorAll('.line-mask__inner');

      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 90%',
          toggleActions: 'play none none none',
          onEnter: () => {
            innerMasks.forEach(mask => mask.classList.add('is--revealed'));
          }
        },
        y: 26,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    });

    // 3.2 Manifesto Lead Paragraph & Accordion Pillars
    const manifestoLead = document.querySelector('.manifesto__lead');
    if (manifestoLead) {
      gsap.from(manifestoLead, {
        scrollTrigger: {
          trigger: manifestoLead,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });
    }

    const accordionPillars = document.querySelectorAll('.accordion-pillars .accordion-item');
    if (accordionPillars.length) {
      gsap.from(accordionPillars, {
        scrollTrigger: {
          trigger: '.accordion-pillars',
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out'
      });
    }

    // 3.3 Roadmap Section Animation
    const roadmapSection = document.querySelector('#roadmap');
    if (roadmapSection) {
      const timelineAxis = roadmapSection.querySelector('.timeline-axis__bar');
      const timelineItems = roadmapSection.querySelectorAll('.timeline-item');
      
      if (timelineAxis) {
        gsap.from(timelineAxis, {
          scrollTrigger: {
            trigger: roadmapSection,
            start: 'top 75%',
            toggleActions: 'play none none none'
          },
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'power3.out'
        });
      }

      if (timelineItems.length) {
        gsap.from(timelineItems, {
          scrollTrigger: {
            trigger: roadmapSection,
            start: 'top 70%',
            toggleActions: 'play none none none'
          },
          y: (i, el) => el.classList.contains('timeline-item--top') ? -24 : 24,
          opacity: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out'
        });
      }
    }

    // 3.4 Keystone Showcase Cards (.featured-card)
    const featuredCards = document.querySelectorAll('.featured-slider-track .featured-card');
    if (featuredCards.length) {
      gsap.from(featuredCards, {
        scrollTrigger: {
          trigger: '#sliderContainer',
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 36,
        opacity: 0,
        scale: 0.97,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }

    // 3.5 Specialized Tracks Bento Cards (.service-card)
    const serviceCards = document.querySelectorAll('.services-grid .service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 38,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out'
      });
    }

    // 3.6 Scheduled Operations Table Rows (.spec-row) & Spotlight Box
    const specRows = document.querySelectorAll('.spec-table-container .spec-row');
    if (specRows.length) {
      gsap.from(specRows, {
        scrollTrigger: {
          trigger: '.spec-table-container',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        x: -24,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }

    const spotlightBox = document.querySelector('.spotlight-box');
    if (spotlightBox) {
      gsap.from(spotlightBox, {
        scrollTrigger: {
          trigger: spotlightBox,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });
    }

    // 3.7 Peer Reviews Cards (.review-card)
    const testCards = document.querySelectorAll('.reviews-grid .review-card');
    if (testCards.length) {
      gsap.from(testCards, {
        scrollTrigger: {
          trigger: '.reviews-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out'
      });
    }

    // 3.8 Field Records Archive Cards (.archive-card)
    const archiveCards = document.querySelectorAll('.archive-grid .archive-card');
    if (archiveCards.length) {
      gsap.from(archiveCards, {
        scrollTrigger: {
          trigger: '.archive-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        scale: 0.95,
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }

    // 3.9 Executive Leadership Roster Rows (.roster-table__row)
    const rosterRows = document.querySelectorAll('.roster-table .roster-table__row');
    if (rosterRows.length) {
      gsap.from(rosterRows, {
        scrollTrigger: {
          trigger: '.roster-table',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        x: -20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }

    // 3.10 Join Protocol Split Entrance
    const protocolIntro = document.querySelector('.protocol-intro');
    const protocolForm = document.querySelector('.protocol-form');
    if (protocolIntro && protocolForm) {
      gsap.from(protocolIntro, {
        scrollTrigger: {
          trigger: '.protocol-split',
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        x: -28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });

      gsap.from(protocolForm, {
        scrollTrigger: {
          trigger: '.protocol-split',
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        x: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out'
      });
    }

    // 3.11 Subtle Parallax on Hero Visual and Footer Watermark
    const heroVisualWrapper = document.getElementById('heroVisualWrapper');
    if (heroVisualWrapper) {
      gsap.to(heroVisualWrapper, {
        scrollTrigger: {
          trigger: '#top',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 45,
        ease: 'none'
      });
    }

    const footerWatermark = document.querySelector('.footer__watermark');
    if (footerWatermark) {
      gsap.to(footerWatermark, {
        scrollTrigger: {
          trigger: '.footer',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1
        },
        xPercent: -4,
        ease: 'none'
      });
    }

    // 3.12 Live Metrics Counter Triggered via ScrollTrigger
    const metricsStrip = document.querySelector('.hero__metrics-strip');
    const counters = document.querySelectorAll('[data-count]');
    let metricsCounted = false;

    if (metricsStrip && counters.length) {
      ScrollTrigger.create({
        trigger: metricsStrip,
        start: 'top 90%',
        onEnter: () => {
          if (metricsCounted) return;
          metricsCounted = true;
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            let current = 0;
            const step = Math.ceil(target / 35);
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              counter.textContent = current < 10 ? `0${current}` : current;
            }, 30);
          });
        }
      });
    }
  }

  // =========================================================================
  // 4. Austo Magnetic Circle Ripple Fill Buttons ([data-btn-hover])
  // =========================================================================
  const rippleButtons = document.querySelectorAll('[data-btn-hover]');

  rippleButtons.forEach((btn) => {
    let circle = btn.querySelector('.btn__circle');
    if (!circle) {
      circle = document.createElement('span');
      circle.className = 'btn__circle';
      circle.setAttribute('aria-hidden', 'true');
      btn.appendChild(circle);
    }

    function handleRipple(e) {
      const rect = btn.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = rect.left + width / 2;

      const clientX = e.clientX;
      const clientY = e.clientY;

      const leftPercent = ((clientX - rect.left) / width) * 100;
      const topPercent = ((clientY - rect.top) / height) * 100;

      let offsetX = Math.abs(((clientX - centerX) / (width / 2)) * 50);
      const diameter = Math.max(width, height) * 2.4 + offsetX;

      circle.style.left = `${leftPercent.toFixed(1)}%`;
      circle.style.top = `${topPercent.toFixed(1)}%`;
      circle.style.width = `${diameter}px`;
      circle.style.height = `${diameter}px`;
    }

    btn.addEventListener('mouseenter', handleRipple);
    btn.addEventListener('mouseleave', handleRipple);
  });

  // Native Default Cursor is preserved across the entire document


  // Row Preview Event Follower (Calendar Table Rows)
  const eventFollower = document.getElementById('eventFollower');
  const eventFollowerInner = document.getElementById('eventFollowerInner');
  const eventFollowerImg = document.getElementById('eventFollowerImg');
  const eventFollowerBadge = document.getElementById('eventFollowerBadge');
  const eventRows = document.querySelectorAll('.spec-row');

  let prevMouseX = 0;
  let isEventFollowerActive = false;

  if (eventFollower && eventFollowerInner && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      if (!isEventFollowerActive) return;
      const vx = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      const tilt = Math.max(-12, Math.min(12, vx * 0.3));

      eventFollower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
    }, { passive: true });

    eventRows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const previewUrl = row.getAttribute('data-preview');
        const cat = row.getAttribute('data-category') || 'SPEC';
        if (previewUrl && eventFollowerImg) {
          eventFollowerImg.src = previewUrl;
          if (eventFollowerBadge) eventFollowerBadge.textContent = cat.toUpperCase();
          eventFollowerInner.classList.add('is--visible');
          isEventFollowerActive = true;
        }
      });

      row.addEventListener('mouseleave', () => {
        isEventFollowerActive = false;
        if (eventFollowerInner) {
          eventFollowerInner.classList.remove('is--visible');
        }
      });
    });
  }

  // =========================================================================
  // 6. Horizontal Draggable Chapter Roadmap (Timeline Slider)
  // =========================================================================
  const timelineContainer = document.getElementById('timelineContainer');
  const timelineTrack = document.getElementById('timelineTrack');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelinePrev = document.getElementById('timelinePrev');
  const timelineNext = document.getElementById('timelineNext');

  if (timelineContainer && timelineTrack) {
    let tlIsDown = false;
    let tlStartX = 0;
    let tlCurrentTranslate = 0;
    let tlPrevTranslate = 0;

    function getTlMaxTranslate() {
      const containerWidth = timelineContainer.clientWidth;
      const trackWidth = timelineTrack.scrollWidth;
      return Math.min(0, containerWidth - trackWidth);
    }

    function setTimelinePosition(translate) {
      const maxTrans = getTlMaxTranslate();
      tlCurrentTranslate = Math.max(maxTrans, Math.min(0, translate));
      timelineTrack.style.transform = `translateX(${tlCurrentTranslate}px)`;
      
      if (timelineProgress && maxTrans < 0) {
        const pct = Math.abs(tlCurrentTranslate / maxTrans) * 100;
        timelineProgress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
      }
    }

    timelineContainer.addEventListener('mousedown', (e) => {
      tlIsDown = true;
      tlStartX = e.pageX - timelineContainer.offsetLeft;
      tlPrevTranslate = tlCurrentTranslate;
      timelineTrack.style.transition = 'none';
    });

    window.addEventListener('mouseup', () => {
      if (!tlIsDown) return;
      tlIsDown = false;
      timelineTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    window.addEventListener('mousemove', (e) => {
      if (!tlIsDown) return;
      e.preventDefault();
      const x = e.pageX - timelineContainer.offsetLeft;
      const walk = (x - tlStartX) * 1.35;
      setTimelinePosition(tlPrevTranslate + walk);
    });

    // Touch Support
    timelineContainer.addEventListener('touchstart', (e) => {
      tlIsDown = true;
      tlStartX = e.touches[0].pageX - timelineContainer.offsetLeft;
      tlPrevTranslate = tlCurrentTranslate;
      timelineTrack.style.transition = 'none';
    }, { passive: true });

    window.addEventListener('touchend', () => {
      tlIsDown = false;
      timelineTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    window.addEventListener('touchmove', (e) => {
      if (!tlIsDown) return;
      const x = e.touches[0].pageX - timelineContainer.offsetLeft;
      const walk = (x - tlStartX) * 1.35;
      setTimelinePosition(tlPrevTranslate + walk);
    }, { passive: true });

    if (timelinePrev && timelineNext) {
      timelinePrev.addEventListener('click', () => {
        timelineTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimelinePosition(tlCurrentTranslate + 380);
      });
      timelineNext.addEventListener('click', () => {
        timelineTrack.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimelinePosition(tlCurrentTranslate - 380);
      });
    }
  }

  // =========================================================================
  // 7. Horizontal Draggable Keystone Showcase Slider
  // =========================================================================
  const sliderContainer = document.getElementById('sliderContainer');
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');

  if (sliderContainer && sliderTrack) {
    let isDown = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function getMaxTranslate() {
      const containerWidth = sliderContainer.clientWidth;
      const trackWidth = sliderTrack.scrollWidth;
      return Math.min(0, containerWidth - trackWidth);
    }

    function setSliderPosition(translate) {
      const maxTrans = getMaxTranslate();
      currentTranslate = Math.max(maxTrans, Math.min(0, translate));
      sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    sliderContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - sliderContainer.offsetLeft;
      prevTranslate = currentTranslate;
      sliderTrack.style.transition = 'none';
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderContainer.offsetLeft;
      const walk = (x - startX) * 1.4;
      setSliderPosition(prevTranslate + walk);
    });

    // Touch Support
    sliderContainer.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - sliderContainer.offsetLeft;
      prevTranslate = currentTranslate;
      sliderTrack.style.transition = 'none';
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDown = false;
      sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - sliderContainer.offsetLeft;
      const walk = (x - startX) * 1.4;
      setSliderPosition(prevTranslate + walk);
    }, { passive: true });

    if (sliderPrev && sliderNext) {
      sliderPrev.addEventListener('click', () => {
        sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        setSliderPosition(currentTranslate + 360);
      });
      sliderNext.addEventListener('click', () => {
        sliderTrack.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)';
        setSliderPosition(currentTranslate - 360);
      });
    }
  }

  // =========================================================================
  // 8. Interactive Accordion Pillars (Austo Style)
  // =========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.getAttribute('data-accordion-status') === 'active';

        // Close other items
        accordionItems.forEach((other) => {
          other.setAttribute('data-accordion-status', 'closed');
          const otherHeader = other.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.setAttribute('data-accordion-status', 'active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // =========================================================================
  // 9. Fullscreen Cinema Lightbox Modal
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxDetails = document.getElementById('lightboxDetails');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.archive-card').forEach((card) => {
    card.addEventListener('click', () => {
      const imgUrl = card.getAttribute('data-img');
      const caption = card.getAttribute('data-caption') || '';
      const meta = card.getAttribute('data-meta') || '';

      if (lightboxImg && lightboxModal) {
        lightboxImg.src = imgUrl;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        if (lightboxDetails) lightboxDetails.textContent = meta;
        lightboxModal.classList.add('is--open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('is--open');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // =========================================================================
  // 10. React Bits Pro "Blinking Squares" Canvas Engine
  // =========================================================================
  const canvas = document.getElementById('heroCanvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    const squareSize = 20;
    const gap = 8;
    const step = squareSize + gap;
    let cols = 0;
    let rows = 0;
    let squares = [];

    function initSquares() {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / step) + 1;
      rows = Math.ceil(height / step) + 1;
      squares = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          squares.push({
            x: c * step,
            y: r * step,
            baseOpacity: 0.03 + Math.random() * 0.03,
            currentOpacity: 0.03,
            targetOpacity: 0.03,
            blinkSpeed: 0.015 + Math.random() * 0.025,
            isAccent: Math.random() < 0.14,
            isBlinking: false,
            blinkProgress: 0,
            hoverGlow: 0
          });
        }
      }
    }

    let heroMouse = { x: -9999, y: -9999 };
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      heroMouse.x = e.clientX - rect.left;
      heroMouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      heroMouse.x = -9999;
      heroMouse.y = -9999;
    });

    let squaresRaf = null;
    let isSquaresRunning = false;
    let isHeroVisible = true;
    let lastRenderTime = 0;

    function renderSquares(timestamp) {
      if (!isHeroVisible) {
        isSquaresRunning = false;
        squaresRaf = null;
        return;
      }

      squaresRaf = requestAnimationFrame(renderSquares);

      // Throttle canvas square updates to ~30 FPS to save CPU/GPU overhead
      if (timestamp && timestamp - lastRenderTime < 33) {
        return;
      }
      lastRenderTime = timestamp || 0;

      ctx.clearRect(0, 0, width, height);

      if (Math.random() < 0.08 && squares.length > 0) {
        const idx = Math.floor(Math.random() * squares.length);
        if (!squares[idx].isBlinking) {
          squares[idx].isBlinking = true;
          squares[idx].targetOpacity = squares[idx].isAccent ? 0.65 : 0.35;
        }
      }

      for (let i = 0; i < squares.length; i++) {
        const sq = squares[i];

        if (sq.isBlinking) {
          sq.currentOpacity += (sq.targetOpacity - sq.currentOpacity) * sq.blinkSpeed;
          if (Math.abs(sq.currentOpacity - sq.targetOpacity) < 0.02) {
            sq.targetOpacity = sq.baseOpacity;
            if (sq.currentOpacity <= sq.baseOpacity + 0.03) {
              sq.isBlinking = false;
              sq.currentOpacity = sq.baseOpacity;
            }
          }
        }

        const dist = Math.hypot(sq.x + squareSize / 2 - heroMouse.x, sq.y + squareSize / 2 - heroMouse.y);
        if (dist < 120) {
          const factor = (1 - dist / 120) * 0.45;
          sq.hoverGlow += (factor - sq.hoverGlow) * 0.2;
        } else {
          sq.hoverGlow *= 0.88;
        }

        const totalAlpha = Math.min(1, sq.currentOpacity + sq.hoverGlow);

        if (sq.isAccent && totalAlpha > sq.baseOpacity + 0.05) {
          ctx.fillStyle = `rgba(255, 59, 48, ${totalAlpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${totalAlpha})`;
        }

        ctx.fillRect(sq.x, sq.y, squareSize, squareSize);
      }
    }

    function startSquares() {
      if (!isSquaresRunning && isHeroVisible) {
        isSquaresRunning = true;
        squaresRaf = requestAnimationFrame(renderSquares);
      }
    }

    function stopSquares() {
      if (squaresRaf) {
        cancelAnimationFrame(squaresRaf);
        squaresRaf = null;
      }
      isSquaresRunning = false;
    }

    // IntersectionObserver to pause rendering when hero section is not in viewport
    if ('IntersectionObserver' in window && canvas.parentElement) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible) {
            startSquares();
          } else {
            stopSquares();
          }
        });
      }, { threshold: 0.05 });
      heroObserver.observe(canvas.parentElement);
    }

    initSquares();
    startSquares();
    window.addEventListener('resize', () => {
      initSquares();
      startSquares();
    });
  }

  // =========================================================================
  // 12. Interactive ASCII Hero Canvas Engine
  // =========================================================================
  let asciiHeroInstance = null;

  function initAsciiHero() {
    const heroAsciiContainer = document.getElementById('heroAsciiArt');
    if (!heroAsciiContainer || asciiHeroInstance) return;

    if (typeof InteractiveAscii !== 'undefined') {
      try {
        asciiHeroInstance = new InteractiveAscii(heroAsciiContainer, {
          imageSrc: 'assets/acsii.jpg',
          theme: 'habito',
          charSet: 'detailed',
          columns: window.innerWidth < 768 ? 95 : (window.innerWidth < 1280 ? 135 : 148),
          hoverRadius: 24,
          contrast: 1.18,
          brightness: 1.08,
          transparentBg: true,
          bgThreshold: 0.08,
          featherWidth: 0.10,
          fontFamily: '"Geist Mono", "JetBrains Mono", "Space Mono", "Courier New", monospace'
        });
      } catch (err) {
        console.warn('Interactive ASCII initialization:', err);
      }
    }
  }

  // Initialize ASCII Canvas
  initAsciiHero();

  function animateHeroElements() {
    // Reveal Hero Headline Masked Lines with Stagger
    const heroLines = document.querySelectorAll('.hero__headline .line-mask__inner');
    heroLines.forEach((line, idx) => {
      setTimeout(() => {
        line.classList.add('is--revealed');
      }, 180 + idx * 120);
    });

    initAsciiHero();

    // Fallback counter animation if GSAP isn't active
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      const counters = document.querySelectorAll('[data-count]');
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count'), 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = current < 10 ? `0${current}` : current;
        }, 35);
      });
    }
  }

  // =========================================================================
  // 13. Calendar Category Filter Tabs
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.spec-row').forEach((row) => {
        const cat = row.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 14. Developer CLI Console Drawer (`ieee-cli`)
  // =========================================================================
  const terminalToggle = document.getElementById('terminalToggle');
  const terminalModal = document.getElementById('terminalModal');
  const terminalClose = document.getElementById('terminalClose');
  const terminalForm = document.getElementById('terminalForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalBody = document.getElementById('terminalBody');

  if (terminalToggle && terminalModal && terminalForm) {
    terminalToggle.addEventListener('click', () => {
      terminalModal.classList.toggle('open');
      if (terminalModal.classList.contains('open')) {
        terminalInput.focus();
      }
    });

    if (terminalClose) {
      terminalClose.addEventListener('click', () => terminalModal.classList.remove('open'));
    }

    function addTerminalLine(text, className = '') {
      const line = document.createElement('div');
      if (className) line.className = className;
      line.innerHTML = text;
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawCmd = terminalInput.value.trim();
      const parts = rawCmd.split(/\s+/);
      const mainCmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      terminalInput.value = '';

      if (!mainCmd) return;
      addTerminalLine(`&gt; ${rawCmd}`, 'terminal-line--accent');

      switch (mainCmd) {
        case 'help':
          addTerminalLine('Available commands:');
          addTerminalLine('&nbsp;&nbsp;events   - View upcoming operations');
          addTerminalLine('&nbsp;&nbsp;about    - Read chapter manifesto');
          addTerminalLine('&nbsp;&nbsp;techtext &lt;text&gt; - Update kinetic wordmark');
          addTerminalLine('&nbsp;&nbsp;reveal &lt;letter|area|off&gt; - Outline reveal style');
          addTerminalLine('&nbsp;&nbsp;join     - Jump to membership protocol');
          addTerminalLine('&nbsp;&nbsp;clear    - Clear console');
          break;

        case 'events':
          addTerminalLine('SCHEDULED OPERATIONS:');
          addTerminalLine('· 30 SEP: WebNova Architecture Challenge (Active)');
          addTerminalLine('· 12 OCT: Kernel Architecture Intensive');
          addTerminalLine('· 28 NOV: IEEE Distinguished Speaker Colloquium');
          break;

        case 'about':
        case 'manifesto':
          addTerminalLine('IEEE CS MBITS SBC-61241 // Built for people who build real systems.');
          break;

        case 'techtext':
          if (args.length > 0 && window.activeTechText) {
            const newWordmark = args.join(' ').toUpperCase();
            window.activeTechText.update({ text: newWordmark });
            addTerminalLine(`TechText wordmark updated to: "${newWordmark}"`, 'terminal-line--success');
          } else {
            addTerminalLine('TechText Kinetic Engine (React Bits):');
            addTerminalLine('Usage: techtext &lt;NEW_TEXT&gt;');
          }
          break;

        case 'reveal':
          if (args[0] && ['letter', 'area', 'off'].includes(args[0].toLowerCase()) && window.activeTechText) {
            window.activeTechText.update({ reveal: args[0].toLowerCase() });
            addTerminalLine(`TechText reveal mode set to: ${args[0].toLowerCase()}`, 'terminal-line--success');
          } else {
            addTerminalLine('Usage: reveal &lt;letter | area | off&gt;');
          }
          break;

        case 'join':
          addTerminalLine('Redirecting to Membership Protocol...', 'terminal-line--success');
          document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
          terminalModal.classList.remove('open');
          break;

        case 'clear':
          terminalBody.innerHTML = '';
          break;

        default:
          addTerminalLine(`Command not found: '${rawCmd}'. Type 'help' for options.`, 'terminal-line--accent');
      }
    });
  }

  // =========================================================================
  // 15. Austo Fullscreen Navigation Drawer & Toggle
  // =========================================================================
  const hamburgerToggle = document.getElementById('hamburgerToggle');
  const hamburgerClose = document.getElementById('hamburgerClose');
  const hamburgerMenu = document.getElementById('hamburgerMenu');

  if (hamburgerToggle && hamburgerMenu) {
    function openMenu() {
      hamburgerMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburgerMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburgerToggle.addEventListener('click', openMenu);
    if (hamburgerClose) hamburgerClose.addEventListener('click', closeMenu);

    hamburgerMenu.querySelectorAll('.hamburger-nav__a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburgerMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // Header Scroll State
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  // Testimonial Controls
  const testPrev = document.getElementById('testPrev');
  const testNext = document.getElementById('testNext');
  const reviewCards = document.querySelectorAll('.review-card');
  let activeReviewIdx = 0;

  if (testPrev && testNext && reviewCards.length > 0) {
    testNext.addEventListener('click', () => {
      activeReviewIdx = (activeReviewIdx + 1) % reviewCards.length;
      reviewCards[activeReviewIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
    testPrev.addEventListener('click', () => {
      activeReviewIdx = (activeReviewIdx - 1 + reviewCards.length) % reviewCards.length;
      reviewCards[activeReviewIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  }

  // =========================================================================
  // 16. Live IST Clock Updater
  // =========================================================================
  const liveClock = document.getElementById('liveClock');
  if (liveClock) {
    function updateClock() {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      liveClock.textContent = `10.05°N, 76.62°E · ${timeStr} IST`;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // =========================================================================
  // 17. Join Form Submission Ingest Feedback
  // =========================================================================
  const joinForm = document.getElementById('joinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = joinForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = 'TRANSMITTING PROTOCOL...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = 'APPLICATION REGISTERED ✓';
        btn.style.backgroundColor = '#10B981';
        btn.style.color = '#ffffff';

        alert('Application registered. Welcome to IEEE Computer Society MBITS student chapter.');

        setTimeout(() => {
          joinForm.reset();
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.backgroundColor = '';
          btn.style.color = '';
        }, 3000);
      }, 650);
    });
  }

  // =========================================================================
  // 18. React Bits <TechText /> Interactive Wordmark Canvas
  // =========================================================================
  const techTextContainer = document.getElementById('footerTechText');
  if (techTextContainer && typeof createTechText === 'function') {
    const techTextInstance = createTechText(techTextContainer, {
      text: 'IEEE CS MBITS',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: 800,
      fontSize: 140,
      letterSpacing: -0.04,
      color: '#ffffff',
      accentColor: '#ff3b30',
      reveal: 'letter',
      softness: 0.7,
      dashLength: 4,
      dashGap: 2,
      strokeWidth: 1.5,
      lineStyle: 'dashed',
      specks: 16,
      selection: true,
      labels: true,
      draggable: true,
      sweep: true,
      speed: 1
    });

    window.activeTechText = techTextInstance;
  }

  // =========================================================================
  // 19. Masked Typography Line Reveals (Austo Magazine Cadence)
  // =========================================================================
  const maskedLines = document.querySelectorAll('.line-mask__inner');
  if (maskedLines.length) {
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is--revealed');
            lineObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

      maskedLines.forEach((line) => lineObserver.observe(line));
    } else {
      maskedLines.forEach((line) => line.classList.add('is--revealed'));
    }
  }

  // =========================================================================
  // 20. 3D Perspective Card Physics & Specular Glare Tracking (Subtle & Silky)
  // =========================================================================
  const perspectiveCards = document.querySelectorAll('.perspective-card');
  if (perspectiveCards.length && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
    perspectiveCards.forEach((card) => {
      const glare = card.querySelector('.perspective-card__glare');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

        const rotateX = -yPct * 3.5;
        const rotateY = xPct * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(3px)`;

        if (glare) {
          glare.style.background = `radial-gradient(circle at ${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%, rgba(255, 255, 255, 0.12) 0%, transparent 55%)`;
          glare.style.opacity = '1';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        if (glare) glare.style.opacity = '0';
      });
    });
  }

});
