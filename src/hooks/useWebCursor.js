/**
 * useWebCursor.js
 * ─────────────────────────────────────────────────────────────
 * Draws a golden spider-web that follows the cursor (#cursor-canvas).
 * Also renders purple/blue/red glowing particles on mouse move (#particle-canvas).
 * Both canvases have pointer-events: none — they NEVER block interaction.
 */
import { useEffect, useRef } from 'react';
import { useStatus } from '../StatusContext';

/* ── Particle colours (Spider-Verse palette) ─────────────── */
const P_COLORS = [
  'rgba(160,80,255,',  // purple
  'rgba(26,75,184,',   // spidey blue
  'rgba(230,36,41,',   // spidey red
  'rgba(212,160,23,',  // gold
];

class Particle {
  constructor(x, y) {
    this.x     = x + (Math.random() - 0.5) * 26;
    this.y     = y + (Math.random() - 0.5) * 26;
    this.vx    = (Math.random() - 0.5) * 1.6;
    this.vy    = Math.random() * 2.0 + 0.8;
    this.r     = Math.random() * 3.2 + 1.2;
    this.alpha = 1;
    this.decay = Math.random() * 0.03 + 0.018;
    this.color = P_COLORS[Math.floor(Math.random() * P_COLORS.length)];
  }
  update() {
    this.x     += this.vx;
    this.y     += this.vy;
    this.vy    += 0.055;
    this.alpha -= this.decay;
  }
  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.shadowBlur  = 10;
    ctx.shadowColor = this.color + '0.9)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha.toFixed(2) + ')';
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  get alive() { return this.alpha > 0; }
}

/* ── Draw pure white spider-web at (cx, cy) ────────────────── */
function drawWeb(ctx, cx, cy) {
  const RINGS  = 5;
  const SPOKES = 8;
  const MAX_R  = 36;
  const gap    = MAX_R / RINGS;

  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth   = 1.0;
  ctx.globalAlpha = 0.95;

  // Spokes
  for (let i = 0; i < SPOKES; i++) {
    const a = (i / SPOKES) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * MAX_R, cy + Math.sin(a) * MAX_R);
    ctx.stroke();
  }

  // Rings (slightly curved quadratic)
  for (let r = 1; r <= RINGS; r++) {
    const rad  = r * gap;
    ctx.beginPath();
    for (let i = 0; i < SPOKES; i++) {
      const a0  = (i / SPOKES) * Math.PI * 2;
      const a1  = ((i + 1) / SPOKES) * Math.PI * 2;
      const aM  = (a0 + a1) / 2;
      const cr  = rad * 1.09;
      const x0  = cx + Math.cos(a0) * rad;
      const y0  = cy + Math.sin(a0) * rad;
      const x1  = cx + Math.cos(a1) * rad;
      const y1  = cy + Math.sin(a1) * rad;
      const cpx = cx + Math.cos(aM)  * cr;
      const cpy = cy + Math.sin(aM)  * cr;
      if (i === 0) ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(cpx, cpy, x1, y1);
    }
    ctx.stroke();
  }

  // Centre dot (pure white)
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle   = '#ffffff';
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.restore();
}

/* ── Hook ─────────────────────────────────────────────────── */
export function useWebCursor() {
  const { thwipOn } = useStatus();
  const thwipOnRef  = useRef(thwipOn);

  useEffect(() => {
    thwipOnRef.current = thwipOn;
  }, [thwipOn]);

  useEffect(() => {
    const cursorC   = document.getElementById('cursor-canvas');
    const particleC = document.getElementById('particle-canvas');
    if (!cursorC || !particleC) return;

    const cCtx = cursorC.getContext('2d');
    const pCtx = particleC.getContext('2d');

    let W = window.innerWidth, H = window.innerHeight;
    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      cursorC.width   = W; cursorC.height   = H;
      particleC.width = W; particleC.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    let mx = -200, my = -200, lx = mx, ly = my;
    const particles = [];

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      const dx = mx - lx, dy = my - ly;
      const spd = Math.sqrt(dx * dx + dy * dy);
      const n   = Math.min(Math.floor(spd / 6) + 1, 6);
      for (let i = 0; i < n; i++) particles.push(new Particle(mx, my));
      lx = mx; ly = my;
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const loop = () => {
      cCtx.clearRect(0, 0, W, H);
      if (thwipOnRef.current) {
        drawWeb(cCtx, mx, my);
      }

      pCtx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(pCtx);
        if (!particles[i].alive) particles.splice(i, 1);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);
}
