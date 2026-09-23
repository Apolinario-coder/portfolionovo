/**
 * Projects — Stacking cards + GSAP Flip lightbox + typewriter + counters
 * Matches the example portfolio layout exactly
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

export function initProjects() {

  // 1. Typewriter preparation
  const descElements = document.querySelectorAll('[data-typewriter-proj]');
  descElements.forEach((el) => {
    const text = el.innerText;
    el.innerHTML = '';

    text.split('').forEach((char) => {
      if (char === ' ') {
        el.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        el.appendChild(span);
      }
    });
  });

  // 2. Title reveal (outline to solid)
  const titleEl = document.querySelector('.projects-title');
  if (titleEl) {
    ScrollTrigger.create({
      trigger: '.projects-section',
      start: 'top 60%',
      onEnter: () => titleEl.classList.add('reveal'),
      onLeaveBack: () => titleEl.classList.remove('reveal'),
    });
  }

  // 3. Card animations with counter roulette + typewriter
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    const numberEl = card.querySelector('.project-number');
    const chars = card.querySelectorAll('.project-desc span');
    const techIcons = card.querySelectorAll('.tech-icons img');
    const gallery = card.querySelector('.project-gallery');

    // Counter roulette setup
    const targetVal = parseInt(numberEl?.innerText, 10) || 1;
    const counterObj = { val: 10 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
    });

    // Card entrance
    tl.from(card, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Number roulette
    if (numberEl) {
      tl.to(counterObj, {
        val: targetVal,
        duration: 1.2,
        ease: 'power2.out',
        roundProps: 'val',
        onUpdate: () => {
          numberEl.innerText = counterObj.val < 10
            ? '0' + counterObj.val
            : String(counterObj.val);
        },
      }, '-=0.4')
      .from(numberEl, {
        yPercent: -100,
        duration: 1.2,
        ease: 'back.out(1.2)',
      }, '<');
    }

    // Header elements + gallery appear
    const textEl = card.querySelector('.project-text');
    if (textEl || gallery) {
      tl.from(
        [textEl, gallery].filter(Boolean),
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=1',
      );
    }

    // Tech icons subtle entrance (never manipulate opacity directly to avoid invisibility bugs)
    if (techIcons.length > 0) {
      tl.from(techIcons, {
        y: 15,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        clearProps: 'transform',
      }, '-=0.5');
    }

    // Typewriter text
    if (chars.length > 0) {
      tl.to(chars, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.004,
        ease: 'none',
      }, '-=0.3');
    }
  });

  // 4. GSAP Flip Lightbox
  const overlay = document.querySelector('.image-zoom-overlay');
  const closeBtn = document.querySelector('.close-zoom-btn');
  const zoomableImages = document.querySelectorAll('.zoomable-img');

  let activeImage = null;
  let originalParent = null;

  if (overlay && closeBtn) {
    zoomableImages.forEach((img) => {
      img.addEventListener('click', () => {
        const state = Flip.getState(img);
        activeImage = img;
        originalParent = img.parentElement;
        overlay.appendChild(img);
        overlay.classList.add('active');
        Flip.from(state, {
          duration: 0.6,
          ease: 'power3.inOut',
          scale: true,
        });
      });
    });

    const closeModal = () => {
      if (!activeImage) return;
      const state = Flip.getState(activeImage);
      originalParent.appendChild(activeImage);
      overlay.classList.remove('active');
      Flip.from(state, {
        duration: 0.6,
        ease: 'power3.inOut',
        scale: true,
        onComplete: () => { activeImage = null; },
      });
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target !== closeBtn && activeImage) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });
  }

  // 5. Counter Badge Animation
  const counterBadge = document.querySelector('.projects-counter-badge');
  const numberDisplay = document.querySelector('.counter-number');

  if (counterBadge && numberDisplay) {
    const targetNumber = parseInt(numberDisplay.getAttribute('data-target'), 10) || 5;
    const fakeObj = { val: 0 };

    const tlCounter = gsap.timeline({
      scrollTrigger: {
        trigger: counterBadge,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
    });

    tlCounter.to(counterBadge, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
    .to(fakeObj, {
      val: targetNumber,
      duration: 2,
      ease: 'power2.out',
      roundProps: 'val',
      onUpdate: () => {
        numberDisplay.innerText = fakeObj.val;
      },
    }, '-=0.4');
  }
}
