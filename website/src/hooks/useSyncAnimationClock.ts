import { useState, useEffect } from 'react';

/**
 * Provides a coordinated, continuous hue cycling clock for Hero and Footer WebGL animations.
 */
export function useSyncAnimationClock(cycleSeconds = 90, heroBaseHue = 114, footerBaseHue = -134) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    let frameId: number;
    const start = performance.now();

    const tick = (now: number) => {
      if (!document.hidden) {
        const elapsed = (now - start) / 1000;
        const currentPhase = (elapsed / cycleSeconds) % 1;
        setPhase(currentPhase);
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [cycleSeconds]);

  const heroHue = Math.round(heroBaseHue + phase * 360);
  const footerHue = Math.round(footerBaseHue + phase * 360);

  return {
    heroHue,
    footerHue,
    phase
  };
}
