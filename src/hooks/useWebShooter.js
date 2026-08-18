/**
 * useWebShooter.js
 * Straight + Long Spider-Man style web shooting effect
 */

import { useEffect, useCallback, useRef } from 'react';
import { useStatus } from '../StatusContext';

/* ─────────────────────────────────────────────────────────
   ONE STRAIGHT WEB SHOT
   ───────────────────────────────────────────────────────── */

class WebShot {
  constructor(ox, oy) {
    this.ox = ox;
    this.oy = oy;

    // Random direction
    const angle = Math.random() * Math.PI * 2;

    // LONG WEB
    const len = Math.random() * 300 + 1300;

    this.tx = ox + Math.cos(angle) * len;
    this.ty = oy + Math.sin(angle) * len;

    // Animation
    this.progress = 0;
    this.alpha = 1;
    this.speed = Math.random() * 0.04 + 0.035;
    this.done = false;

    // Number of small web branches
    this.filamentCount = Math.floor(Math.random() * 3) + 4;

    // Store direction
    this.angle = angle;
    this.length = len;
  }

  update() {
    // Shoot outward
    if (this.progress < 1) {
      this.progress = Math.min(
        1,
        this.progress + this.speed
      );
    } else {
      // Fade after reaching the end
      this.alpha -= 0.018;

      if (this.alpha <= 0) {
        this.done = true;
      }
    }
  }

  /* Get position along straight line */
  pointAt(t) {
    return {
      x: this.ox + (this.tx - this.ox) * t,
      y: this.oy + (this.ty - this.oy) * t
    };
  }

  draw(ctx) {
    if (this.done) return;

    const alpha = Math.min(this.alpha, 1);

    ctx.save();

    ctx.globalAlpha = alpha;

    // White web
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';

    // Glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';

    /* ─────────────────────────────────────────
       MAIN STRAIGHT WEB
       ───────────────────────────────────────── */

    const end = this.pointAt(this.progress);

    ctx.beginPath();

    ctx.lineWidth = 2;

    ctx.moveTo(this.ox, this.oy);
    ctx.lineTo(end.x, end.y);

    ctx.stroke();

    /* ─────────────────────────────────────────
       SMALL WEB FILAMENTS
       ───────────────────────────────────────── */

    ctx.lineWidth = 0.8;

    for (let f = 0; f < this.filamentCount; f++) {

      // Position along the main web
      const t =
        ((f + 1) / (this.filamentCount + 1)) *
        this.progress;

      const point = this.pointAt(t);

      /*
       * Make branches perpendicular to the
       * main straight web.
       */
      const sideAngle =
        this.angle +
        (f % 2 === 0 ? Math.PI / 2 : -Math.PI / 2);

      const branchLength =
        Math.random() * 25 + 15;

      const ex =
        point.x +
        Math.cos(sideAngle) * branchLength;

      const ey =
        point.y +
        Math.sin(sideAngle) * branchLength;

      ctx.beginPath();

      ctx.moveTo(point.x, point.y);
      ctx.lineTo(ex, ey);

      ctx.stroke();
    }

    ctx.restore();
  }
}


/* ─────────────────────────────────────────────────────────
   HOOK
   ───────────────────────────────────────────────────────── */

export function useWebShooter() {

  const { thwipOn } = useStatus();

  const thwipOnRef = useRef(thwipOn);

  const shotsRef = useRef([]);


  /* Keep Thwip state updated */
  useEffect(() => {
    thwipOnRef.current = thwipOn;
  }, [thwipOn]);


  /* ─────────────────────────────────────────────
     CANVAS + CLICK LISTENER
     ───────────────────────────────────────────── */

  useEffect(() => {

    const canvas =
      document.getElementById('shooter-canvas');

    if (!canvas) return;

    const ctx =
      canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;


    /* Resize canvas */
    const resize = () => {

      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width = W;
      canvas.height = H;

      /*
       * Make sure the canvas covers the
       * complete screen.
       */
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
    };

    resize();

    window.addEventListener(
      'resize',
      resize
    );


    /* ─────────────────────────────────────────
       CLICK → WEB SHOOT
       ───────────────────────────────────────── */

    const onClick = (e) => {

      if (!thwipOnRef.current) return;


      const isButton =
        e.target.closest(
          'button, a, input, [role="button"], select, textarea'
        );


      /* Button click */
      if (isButton) {

        // 3 or 4 straight long webs
        const count =
          Math.floor(Math.random() * 2) + 3;


        for (let i = 0; i < count; i++) {

          setTimeout(() => {

            if (thwipOnRef.current) {

              shotsRef.current.push(
                new WebShot(
                  e.clientX,
                  e.clientY
                )
              );

            }

          }, i * 110);
        }

      }

      /* Normal click */
      else {

        shotsRef.current.push(
          new WebShot(
            e.clientX,
            e.clientY
          )
        );

      }

    };


    window.addEventListener(
      'click',
      onClick
    );


    /* ─────────────────────────────────────────
       ANIMATION LOOP
       ───────────────────────────────────────── */

    let raf;


    const loop = () => {

      ctx.clearRect(
        0,
        0,
        W,
        H
      );


      for (
        let i = shotsRef.current.length - 1;
        i >= 0;
        i--
      ) {

        const shot =
          shotsRef.current[i];


        shot.update();

        shot.draw(ctx);


        if (shot.done) {

          shotsRef.current.splice(
            i,
            1
          );

        }

      }


      raf =
        requestAnimationFrame(loop);
    };


    loop();


    /* Cleanup */
    return () => {

      cancelAnimationFrame(raf);

      window.removeEventListener(
        'resize',
        resize
      );

      window.removeEventListener(
        'click',
        onClick
      );

    };

  }, []);


  /* ─────────────────────────────────────────────
     MANUAL FIRE
     ───────────────────────────────────────────── */

  const fireShot = useCallback(
    (x, y, count) => {

      if (!thwipOnRef.current) return;


      const shotCount =
        typeof count === 'number'
          ? count
          : Math.floor(Math.random() * 2) + 3;


      for (
        let i = 0;
        i < shotCount;
        i++
      ) {

        setTimeout(() => {

          if (thwipOnRef.current) {

            shotsRef.current.push(
              new WebShot(x, y)
            );

          }

        }, i * 110);

      }

    },
    []
  );


  return {
    fireShot
  };
}