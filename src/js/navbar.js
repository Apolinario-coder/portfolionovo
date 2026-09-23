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

    // Close menu on link click
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        if (lenis) lenis.start();
      });
    });
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
