/**
 * Formations — Stacking cards + typewriter dates + social area
 * Matches the example portfolio layout exactly
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initFormations() {

  // 1. Typewriter preparation (dates)
  const dateElements = document.querySelectorAll('[data-typewriter-form]');
  dateElements.forEach((el) => {
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
  const titleEl = document.querySelector('.formations-title');
  if (titleEl) {
    ScrollTrigger.create({
      trigger: '.formations-section',
      start: 'top 60%',
      onEnter: () => titleEl.classList.add('reveal'),
      onLeaveBack: () => titleEl.classList.remove('reveal'),
    });
  }

  // Subtitle animation
  const subtitle = document.querySelector('.formations-subtitle');
  if (subtitle) {
    gsap.from(subtitle, {
      scrollTrigger: {
        trigger: '.formations-section',
        start: 'top 60%',
        toggleActions: 'play reverse play reverse',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  // 3. Card animations
  const cards = document.querySelectorAll('.formation-card');

  cards.forEach((card) => {
    const status = card.querySelector('.formation-status');
    const logo = card.querySelector('.formation-logo-wrapper');
    const name = card.querySelector('.formation-name');
    const inst = card.querySelector('.formation-institution');
    const chars = card.querySelectorAll('.formation-date span');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play reverse play reverse',
      },
    });

    // Card slides up
    tl.from(card, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
    // Status and Logo appear
    .from([status, logo].filter(Boolean), {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    }, '-=0.2')

    // Name and institution
    if (name || inst) {
      tl.from(
        [name, inst].filter(Boolean),
        {
          y: 15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.2',
      );
    }

    // Typewriter date
    if (chars.length > 0) {
      tl.to(chars, {
        opacity: 1,
        duration: 0.01,
        stagger: 0.01,
        ease: 'none',
      }, '-=0.2');
    }
  });
}
