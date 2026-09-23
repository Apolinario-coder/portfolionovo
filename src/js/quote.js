/**
 * Quote — Santos Dumont quote card reveal with fade + scale
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initQuote() {
  const section = document.querySelector('.quote-section');
  if (!section) return;

  const card = section.querySelector('.quote-card');
  if (!card) return;

  // Quote card reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
      toggleActions: 'play reverse play reverse',
    },
  });

  tl.fromTo(card,
    { y: 50, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
  );

  // Image separate entrance
  const img = card.querySelector('.quote-image');
  if (img) {
    tl.from(img, {
      scale: 0.8,
      opacity: 0,
      rotation: -5,
      duration: 0.7,
      ease: 'back.out(1.5)',
    }, '<+0.2');
  }

  // Quote text
  const text = card.querySelector('.quote-text p');
  if (text) {
    tl.from(text, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    }, '<+0.2');
  }

  // Citation
  const cite = card.querySelector('.quote-text cite');
  if (cite) {
    tl.from(cite, {
      y: 10,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '<+0.2');
  }
}
