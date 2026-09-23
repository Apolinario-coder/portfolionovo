/**
 * About — Paragraph reveals, floating geometric shapes with elastic interactivity, tech badges
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAbout() {
  const section = document.querySelector('.about-section');
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

  // --- Paragraph Reveal ---
  const paragraphs = section.querySelectorAll('.about-paragraph');
  paragraphs.forEach((p, i) => {
    gsap.fromTo(p, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: p,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  });

  // --- Beyond Code Card Reveal ---
  const beyondCard = section.querySelector('.beyond-code-card');
  if (beyondCard) {
    gsap.fromTo(beyondCard,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: beyondCard,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  }

  // --- Technologies Section Reveal ---
  const techSection = section.querySelector('.tech-section');
  if (techSection) {
    gsap.fromTo(techSection,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: techSection,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );

    // Stagger badges
    const badges = techSection.querySelectorAll('.tech-badge');
    gsap.fromTo(badges,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: techSection,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  }

  // --- Floating Geometric Shapes ---
  initFloatingShapes(section);
}

/**
 * Floating Geometric Shapes with elastic hover interactivity
 * Shapes float continuously with sine easing, and on hover they scale up,
 * rotate randomly, and shift hue. On mouse leave they spring back elastically.
 */
function initFloatingShapes(container) {
  const shapes = container.querySelectorAll('.geo-shape');

  shapes.forEach((shape) => {
    const speed = parseFloat(shape.dataset.floatSpeed) || 3;

    // Continuous floating animation
    const floatAnim = gsap.to(shape, {
      y: `random(-20, 20)`,
      x: `random(-10, 10)`,
      rotation: `random(-8, 8)`,
      duration: speed,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 2,
    });

    // Elastic hover interaction
    shape.addEventListener('mouseenter', () => {
      floatAnim.pause();
      gsap.to(shape, {
        scale: 1.2 + Math.random() * 0.2,
        rotation: (Math.random() - 0.5) * 90,
        opacity: 0.3,
        filter: `hue-rotate(${Math.random() * 180}deg)`,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    shape.addEventListener('mouseleave', () => {
      gsap.to(shape, {
        scale: 1,
        rotation: 0,
        opacity: 0.12,
        filter: 'hue-rotate(0deg)',
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        onComplete: () => floatAnim.resume(),
      });
    });
  });
}
