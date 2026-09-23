/**
 * Footer — Geometric shapes, social links, and clean copyright line
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initFooter() {
  const section = document.querySelector('.footer-section');
  if (!section) return;

  // Social Links Area entrance
  const socialArea = section.querySelector('.footer-social-area');
  if (socialArea) {
    const socialTl = gsap.timeline({
      scrollTrigger: {
        trigger: socialArea,
        start: 'top 90%',
        toggleActions: 'play reverse play reverse',
      },
    });

    socialTl.from('.footer-social-area .social-area-title', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
    .from('.footer-social-area .social-link', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
    }, '-=0.3');
  }

  // Floating Geometric Shapes
  initFooterShapes(section);
}

/**
 * Footer Geometric Shapes — Floating + elastic hover interaction
 */
function initFooterShapes(container) {
  const shapes = container.querySelectorAll('.geo-shape');

  shapes.forEach((shape) => {
    const speed = parseFloat(shape.dataset.floatSpeed) || 3;

    // Continuous floating
    const floatAnim = gsap.to(shape, {
      y: `random(-25, 25)`,
      x: `random(-15, 15)`,
      rotation: `random(-10, 10)`,
      duration: speed,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 2,
    });

    // Elastic hover
    shape.addEventListener('mouseenter', () => {
      floatAnim.pause();
      gsap.to(shape, {
        scale: 1.3 + Math.random() * 0.2,
        rotation: (Math.random() - 0.5) * 90,
        opacity: 0.35,
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
