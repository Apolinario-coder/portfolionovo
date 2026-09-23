import React from 'react';
import { createRoot } from 'react-dom/client';
import Particles from './components/react/Particles.jsx';

/**
 * Initializes React Bits components on designated DOM mount points
 */
export function initReactBits() {
  // Hero Background Particles (React Bits)
  const particlesContainer = document.getElementById('hero-particles-bg');
  if (particlesContainer) {
    const root = createRoot(particlesContainer);
    root.render(
      <Particles
        particleCount={45}
        particleColors={['#ff3a3a', '#ffffff', '#ff6b6b']}
        speed={0.35}
        particleBaseSize={1.8}
        sizeRandomness={1.5}
        alpha={0.55}
        moveParticlesOnHover={true}
        particleHoverFactor={2}
      />
    );
  }
}
