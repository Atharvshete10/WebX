/**
 * useStarfield.js
 * Canvas-based animated starfield with subtle mouse parallax.
 * Attach to a <canvas id="star-canvas"> element.
 */
import { useEffect } from 'react';

const STAR_COUNT = 220;

export function useStarfield() {
  useEffect(() => {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // Mouse parallax offset
    let mx = 0, my = 0;
    const onMouseMove = (e) => {
      mx = (e.clientX / W - 0.5) * 18;
      my = (e.clientY / H - 0.5) * 18;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Generate stars
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:       Math.random() * W,
      y:       Math.random() * H,
      r:       Math.random() * 1.4 + 0.3,
      alpha:   Math.random() * 0.7 + 0.15,
      speed:   Math.random() * 0.25 + 0.05,   // twinkle speed
      phase:   Math.random() * Math.PI * 2,
      depth:   Math.random() * 0.8 + 0.2,     // parallax depth 0.2–1.0
    }));

    let t = 0;
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      for (const s of stars) {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
        const px = s.x + mx * s.depth;
        const py = s.y + my * s.depth;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
