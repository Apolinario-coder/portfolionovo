/**
 * Main Entry Point — Orchestrator
 * Imports all modules, registers GSAP plugins, initializes Lenis and all section animations
 */

import './style.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

// Import modules
import { initLenis } from './js/lenis.js';
import { initNavbar } from './js/navbar.js';
import { initHero } from './js/hero.js';
import { initAbout } from './js/about.js';
import { initServices } from './js/services.js';
import { initProjects } from './js/projects.js';
import { initContact } from './js/contact.js';
import { initFormations } from './js/formations.js';
import { initQuote } from './js/quote.js';
import { initFooter } from './js/footer.js';
import { initReactBits } from './react-mount.jsx';
import { initI18n } from './js/i18n.js';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize smooth scroll first
  const lenis = initLenis();

  // Initialize all sections
  initNavbar(lenis);
  initI18n();
  initHero();
  initAbout();
  initServices();
  initProjects();
  initFormations();
  initQuote();
  initContact();
  initFooter();

  // Initialize React Bits components
  initReactBits();

  // Footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Click explosion effect (preserved from original portfolio)
  document.addEventListener('click', (e) => {
    createClickExplosion(e.clientX, e.clientY);
  });
});

/**
 * Click Explosion — Creates colored particle burst at cursor position
 * Preserved from Lucas's original portfolio
 */
function createClickExplosion(x, y) {
  const colors = ['#ff3a3a', '#ffcc00', '#ff6b6b', '#ffffff', '#3af0ff'];
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      pointer-events: none;
      z-index: 99999;
    `;
    document.body.appendChild(particle);

    const angle = (Math.PI * 2 / particleCount) * i + (Math.random() - 0.5) * 0.5;
    const distance = 30 + Math.random() * 50;

    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      scale: 0,
      duration: 0.6 + Math.random() * 0.3,
      ease: 'power2.out',
      onComplete: () => particle.remove(),
    });
  }
}
