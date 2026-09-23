/**
 * Hero — Title animations, parallax background, badge stagger entrance
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initHero() {
  const heroSection = document.querySelector('.hero-section');
  const heroBg = document.getElementById('hero-bg');
  const heroContent = document.querySelector('.hero-content');

  if (!heroSection) return;

  // --- Entrance Timeline ---
  const tl = gsap.timeline({ delay: 0.3 });

  // Title reveal
  tl.from('.hero-title', {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  }, '-=0.3');

  // Subtitle
  tl.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.5');

  // Description
  tl.from('.hero-description', {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: 'power3.out',
  }, '-=0.4');

  // CTA buttons
  tl.from('.hero-ctas > *', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out',
  }, '-=0.3');

  // Scroll indicator
  tl.from('.scroll-indicator', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.2');

  // --- Manga Background Parallax ---
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  // --- Mouse Parallax (Desktop) ---
  if (window.innerWidth > 992) {
    const title = document.querySelector('.hero-title');

    document.addEventListener('mousemove', (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 2;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

      if (heroBg) {
        gsap.to(heroBg, {
          x: xPos * -15,
          y: yPos * -10,
          duration: 1.5,
          ease: 'power2.out',
        });
      }

      if (title) {
        gsap.to(title, {
          x: xPos * 8,
          y: yPos * 5,
          duration: 1.5,
          ease: 'power2.out',
        });
      }
    });
  }

  // --- Hide scroll indicator on scroll ---
  ScrollTrigger.create({
    trigger: heroSection,
    start: 'top -100',
    onEnter: () => {
      gsap.to('.scroll-indicator', { opacity: 0, duration: 0.4 });
    },
    onLeaveBack: () => {
      gsap.to('.scroll-indicator', { opacity: 1, duration: 0.4 });
    },
  });
}
