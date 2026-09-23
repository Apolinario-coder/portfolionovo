/**
 * Services — Number roulette counters + typewriter text effect
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initServices() {
  const section = document.querySelector('.services-section');
  if (!section) return;

  // --- Section Title Outline-to-Solid ---
  const title = section.querySelector('.outline-text');
  if (title) {
    ScrollTrigger.create({
      trigger: title,
      start: 'top 60%',
      onEnter: () => title.classList.add('reveal'),
      onLeaveBack: () => title.classList.remove('reveal'),
    });
  }

  // --- Service Cards Reveal ---
  const cards = section.querySelectorAll('.service-card');

  cards.forEach((card, index) => {
    const numberEl = card.querySelector('.service-number');
    const descEl = card.querySelector('.service-desc');
    const targetVal = parseInt(numberEl?.dataset.counter) || index + 1;

    // Prepare typewriter text
    if (descEl) {
      prepareTypewriter(descEl);
    }

    // Create reveal timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
    });

    // Card fade in
    tl.fromTo(card,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );

    // Number roulette effect
    if (numberEl) {
      const counterObj = { val: 10 + Math.floor(Math.random() * 90) };
      tl.to(counterObj, {
        val: targetVal,
        duration: 1.2,
        ease: 'power2.out',
        roundProps: 'val',
        onUpdate: () => {
          numberEl.textContent = counterObj.val < 10
            ? '0' + counterObj.val
            : String(counterObj.val);
        },
      }, '<+0.2');

      // Number slide in from above
      tl.from(numberEl, {
        yPercent: -100,
        duration: 1.2,
        ease: 'back.out(1.2)',
      }, '<');
    }

    // Typewriter reveal
    if (descEl) {
      const chars = descEl.querySelectorAll('span');
      tl.to(chars, {
        opacity: 1,
        duration: 0.02,
        stagger: 0.008,
        ease: 'none',
      }, '<+0.3');
    }
  });
}

/**
 * Typewriter Preparation — Anti-overflow technique
 * Decomposes text into individual character <span>s for GSAP stagger reveal.
 * Spaces are kept as native text nodes to prevent line-break issues.
 */
function prepareTypewriter(el) {
  const text = el.textContent;
  el.innerHTML = '';

  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      // Use native text node for spaces (prevents overflow/break issues)
      el.appendChild(document.createTextNode(' '));
    } else {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.opacity = '0';
      span.style.display = 'inline';
      el.appendChild(span);
    }
  }
}
