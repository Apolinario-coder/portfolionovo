/**
 * Navbar — Liquid Glass Floating Dock
 * Shrinks on scroll, active section tracking, mobile hamburger menu
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initNavbar(lenis) {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!navbar) return;

  // --- Scroll Shrink Effect ---
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top -50',
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });

  // --- Active Section Tracking ---
  const sections = ['about', 'services', 'projects', 'formations', 'contact'];

  sections.forEach((sectionId) => {
    const sectionEl = document.getElementById(sectionId);
    if (!sectionEl) return;

    ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => setActiveLink(sectionId),
      onEnterBack: () => setActiveLink(sectionId),
      onLeave: () => clearActiveLink(sectionId),
      onLeaveBack: () => clearActiveLink(sectionId),
    });
  });

  function setActiveLink(sectionId) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === sectionId);
    });
  }

  function clearActiveLink(sectionId) {
    navLinks.forEach((link) => {
      if (link.dataset.section === sectionId) {
        link.classList.remove('active');
      }
    });
  }

  // --- Mobile Menu ---
  if (hamburger && mobileMenu) {
    const closeMobileMenu = () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      if (lenis) lenis.start();
    };

    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active', isActive);

      // Prevent body scroll when menu is open
      if (isActive && lenis) {
        lenis.stop();
      } else if (lenis) {
        lenis.start();
      }
    });

    // Close menu and navigate smoothly on link click
    mobileLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // 1. Close menu & resume smooth scroll
        closeMobileMenu();

        // 2. Scroll to target section
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            setTimeout(() => {
              if (lenis) {
                lenis.scrollTo(targetEl, {
                  offset: -70,
                  duration: 1.2,
                });
              } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
            }, 60);
          }
        }
      });
    });

    // Close on clicking backdrop outside links
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMobileMenu();
      }
    });

    // Close if logo is clicked while menu is open
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
      navLogo.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
          closeMobileMenu();
        }
      });
    }
  }

  // --- Entrance Animation ---
  gsap.from(navbar, {
    y: -100,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
  });
}
