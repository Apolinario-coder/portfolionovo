/**
 * Contact — Link animations with back.out overshoot, WhatsApp CTA glow
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initContact() {
  const section = document.querySelector('.contact-section');
  if (!section) return;

  // --- Section Title Outline-to-Solid ---
  const title = section.querySelector('.outline-text');
  if (title) {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => title.classList.add('reveal'),
      onLeaveBack: () => title.classList.remove('reveal'),
    });
  }

  // --- Contact Grid Reveal ---
  const grid = section.querySelector('.contact-grid');
  if (grid) {
    gsap.fromTo(grid,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }

  // --- Contact Links Stagger with Back.out ---
  const links = section.querySelectorAll('.contact-link');
  if (links.length > 0) {
    gsap.fromTo(links,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }

  // --- WhatsApp Button Pulse ---
  const whatsappBtn = section.querySelector('.btn-whatsapp');
  if (whatsappBtn) {
    gsap.fromTo(whatsappBtn,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );

    // Subtle pulse glow loop
    gsap.to(whatsappBtn, {
      boxShadow: '0 4px 30px rgba(255, 58, 58, 0.5)',
      duration: 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}
