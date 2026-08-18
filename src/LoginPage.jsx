/**
 * LoginPage.jsx
 * WEB-SPRINT Round 2 — "Code it. Web it. Sling it."
 * Akashganga — Spider-Verse Login Portal
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStarfield } from './hooks/useStarfield';
import { useWebCursor } from './hooks/useWebCursor';
import { useWebShooter } from './hooks/useWebShooter';

import spiderman from './assets/spiderman.png';

/* ─────────────────────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────────────────────── */

const StarIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 1 L13.9 8.9 L21.5 7 L15.8 12 L21.5 17 L13.9 15.1 L12 23 L10.1 15.1 L2.5 17 L8.2 12 L2.5 7 L10.1 8.9 Z" />
  </svg>
);

const SpiderIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <ellipse cx="16" cy="19" rx="5" ry="7" />
    <ellipse cx="16" cy="11" rx="4" ry="4" />

    <circle cx="14.2" cy="10.4" r="1" fill="white" />
    <circle cx="17.8" cy="10.4" r="1" fill="white" />

    <line x1="11" y1="15" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="19" x2="1" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="11" y1="23" x2="2" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    <line x1="21" y1="15" x2="30" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="19" x2="31" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="23" x2="30" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WebGunIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="2.5" />

    <line x1="12" y1="2" x2="12" y2="9.5" />
    <line x1="12" y1="14.5" x2="12" y2="22" />

    <line x1="2" y1="12" x2="9.5" y2="12" />
    <line x1="14.5" y1="12" x2="22" y2="12" />

    <line x1="4.9" y1="4.9" x2="9.8" y2="9.8" />
    <line x1="14.2" y1="14.2" x2="19.1" y2="19.1" />

    <line x1="19.1" y1="4.9" x2="14.2" y2="9.8" />
    <line x1="9.8" y1="14.2" x2="4.9" y2="19.1" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 shrink-0"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   GOLD BORDER
   ───────────────────────────────────────────────────────────── */

const GoldBorder = ({ animated = true }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <defs>
      <filter id="gf">
        <feGaussianBlur stdDeviation="3" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <rect
      x="4"
      y="4"
      width="calc(100% - 8px)"
      height="calc(100% - 8px)"
      rx="22"
      fill="none"
      stroke="#ffd700"
      strokeWidth="4"
      opacity="0.13"
      filter="url(#gf)"
    />

    <rect
      x="2"
      y="2"
      width="calc(100% - 4px)"
      height="calc(100% - 4px)"
      rx="20"
      fill="none"
      stroke="#d4a017"
      strokeWidth="1.6"
      opacity="0.9"
      className={animated ? 'gold-border-path' : ''}
    />

    {[
      [14, 14],
      ['calc(100% - 14)', 14],
      [14, 'calc(100% - 14)'],
      ['calc(100% - 14)', 'calc(100% - 14)'],
    ].map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r="3.5"
        fill="#ffd700"
        opacity="0.75"
      />
    ))}

    {[
      ['50%', '2'],
      ['50%', 'calc(100% - 2)'],
      ['2', '50%'],
      ['calc(100% - 2)', '50%'],
    ].map(([cx, cy], i) => (
      <rect
        key={`d${i}`}
        x={cx}
        y={cy}
        width="6"
        height="6"
        fill="#d4a017"
        opacity="0.5"
        transform={`rotate(45,${cx},${cy})`}
      />
    ))}
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   INPUT
   ───────────────────────────────────────────────────────────── */

const INPUT = [
  'w-full px-5 py-3 rounded-full',
  'bg-[#111111] text-white placeholder-[#3a3a3a]',
  'border border-[#d4a01745]',
  'text-sm font-body outline-none',
  'transition-all duration-200',
  'focus:border-[#e62429] focus:shadow-[0_0_0_2px_#e6242445,0_0_14px_0_#e6242430]',
  'hover:border-[#d4a01785]',
].join(' ');

/* ─────────────────────────────────────────────────────────────
   SIGN IN FORM
   ───────────────────────────────────────────────────────────── */

function SignInForm({ onToggle, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      id="sign-in-form"
      className="form-slide-right flex flex-col gap-4 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <h2 className="font-display text-3xl tracking-widest text-white text-center mb-1">
        Sign In
      </h2>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="si-email"
          className="text-xs font-medium text-[#d4a017] uppercase tracking-widest pl-2"
        >
          Email
        </label>

        <input
          id="si-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={INPUT}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="si-pass"
          className="text-xs font-medium text-[#d4a017] uppercase tracking-widest pl-2"
        >
          Password
        </label>

        <input
          id="si-pass"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className={INPUT}
        />
      </div>

      <button
        id="signin-submit-btn"
        type="submit"
        className="
          w-full py-3 rounded-full mt-1
          font-display tracking-[0.18em] text-xl text-white
          bg-gradient-to-r from-[#e62429] via-[#aa1e54] to-[#1a4bb8]
          border border-[#e6242948]
          transition-all duration-200
          hover:brightness-110
          hover:shadow-[0_0_22px_4px_#1a4bb860,0_0_10px_2px_#e6242950]
          active:scale-[0.97]
        "
      >
        Submit
      </button>

      <div className="flex items-center gap-3 my-0.5">
        <div className="flex-1 h-px bg-[#d4a01740]" />

        <span className="text-xs font-semibold text-[#d4a017] tracking-[0.3em]">
          OR
        </span>

        <div className="flex-1 h-px bg-[#d4a01740]" />
      </div>

      <button
        id="goto-signup-btn"
        type="button"
        onClick={onToggle}
        className="
          w-full py-3 rounded-full
          font-display tracking-[0.14em] text-lg text-[#1a4bb8]
          border-2 border-[#1a4bb8] bg-transparent
          transition-all duration-200
          hover:bg-[#1a4bb818] hover:text-[#4d78e0]
          hover:shadow-[0_0_18px_4px_#1a4bb848]
          active:scale-[0.97]
        "
      >
        Sign Up
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   SIGN UP FORM
   ───────────────────────────────────────────────────────────── */

function SignUpForm({ onToggle, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <form
      id="sign-up-form"
      className="form-slide-left flex flex-col gap-3.5 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <h2 className="font-display text-3xl tracking-widest text-white text-center mb-1">
        Sign Up
      </h2>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="su-name"
          className="text-xs font-medium text-[#d4a017] uppercase tracking-widest pl-2"
        >
          Name
        </label>

        <input
          id="su-name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          className={INPUT}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="su-email"
          className="text-xs font-medium text-[#d4a017] uppercase tracking-widest pl-2"
        >
          Email
        </label>

        <input
          id="su-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={INPUT}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="su-pass"
          className="text-xs font-medium text-[#d4a017] uppercase tracking-widest pl-2"
        >
          Password
        </label>

        <input
          id="su-pass"
          type="password"
          placeholder="••••••••"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          autoComplete="new-password"
          className={INPUT}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="su-conf"
          className="text-xs font-medium text-[#d4a017] uppercase tracking-widest pl-2"
        >
          Confirm Password
        </label>

        <input
          id="su-conf"
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
          className={INPUT}
        />
      </div>

      <button
        id="signup-submit-btn"
        type="submit"
        className="
          w-full py-3 rounded-full mt-1
          font-display tracking-[0.16em] text-xl text-white
          bg-gradient-to-r from-[#1a4bb8] via-[#4422aa] to-[#e62429]
          border border-[#1a4bb848]
          transition-all duration-200
          hover:brightness-110
          hover:shadow-[0_0_22px_4px_#e6242950,0_0_10px_2px_#1a4bb850]
          active:scale-[0.97]
        "
      >
        Create Account
      </button>

      <button
        id="goto-signin-btn"
        type="button"
        onClick={onToggle}
        className="
          w-full py-2.5 rounded-full
          font-display tracking-[0.12em] text-base text-[#e62429]
          border-2 border-[#e62429] bg-transparent
          transition-all duration-200
          hover:bg-[#e6242918] hover:text-[#ff5555]
          hover:shadow-[0_0_16px_3px_#e6242948]
          active:scale-[0.97]
        "
      >
        ← Back to Sign In
      </button>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   SPIDER-MAN IMAGE
   ───────────────────────────────────────────────────────────── */

function HeroLineArt() {
  return (
    <img
      src={spiderman}
      alt="Spider-Man"
      className="
        w-full
        max-w-[360px]
        max-h-[320px]
        object-contain
        drop-shadow-[0_0_12px_rgba(212,160,23,0.12)]
      "
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   SIGN IN CARD
   ───────────────────────────────────────────────────────────── */

function SignInCard({ fireShot }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const toggle = useCallback(
    (e) => {
      const r = e.currentTarget.getBoundingClientRect();

      fireShot(
        r.left + r.width / 2,
        r.top + r.height / 2,
        Math.floor(Math.random() * 2) + 2
      );

      setIsSignIn((v) => !v);
    },
    [fireShot]
  );

  const handleSubmit = useCallback(
    (e) => {
      const btn = e.target.querySelector('button[type="submit"]');

      if (btn) {
        const r = btn.getBoundingClientRect();

        fireShot(
          r.left + r.width / 2,
          r.top + r.height / 2,
          Math.floor(Math.random() * 2) + 2
        );
      }

      setTimeout(() => {
        navigate('/home');
      }, 200);
    },
    [fireShot, navigate]
  );

  return (
    <div className="flex flex-col items-start w-full h-full">

      <div
        className="
          relative w-full rounded-2xl
          bg-[#0d0d0d]
          p-7
          shadow-[0_0_60px_0_#d4a01712,0_20px_60px_rgba(0,0,0,0.85)]
          overflow-hidden flex-1
        "
      >
        <GoldBorder />

        {/* Subtle web pattern watermark */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.038] pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="webpat1"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="24" cy="24" r="1" fill="#d4a017" />
              <circle cx="24" cy="24" r="10" fill="none" stroke="#d4a017" strokeWidth="0.6" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="#d4a017" strokeWidth="0.6" />
              <line x1="24" y1="4" x2="24" y2="44" stroke="#d4a017" strokeWidth="0.5" />
              <line x1="4" y1="24" x2="44" y2="24" stroke="#d4a017" strokeWidth="0.5" />
              <line x1="10" y1="10" x2="38" y2="38" stroke="#d4a017" strokeWidth="0.4" />
              <line x1="38" y1="10" x2="10" y2="38" stroke="#d4a017" strokeWidth="0.4" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#webpat1)" />
        </svg>

        {/* Spinning star */}
        <div
          className="
            absolute bottom-4 right-4
            text-[#d4a017]
            opacity-25
            spin-star
            pointer-events-none
          "
          aria-hidden="true"
        >
          <StarIcon className="w-6 h-6" />
        </div>

        {/* Card heading */}
        <div className="relative z-10 text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">

            <SpiderIcon className="w-4 h-4 text-[#d4a017]" />

            <h1 className="font-display text-2xl sm:text-[1.6rem] tracking-[0.06em] text-white leading-none">
              Spider Verse Secure Portal!
            </h1>

            <SpiderIcon className="w-4 h-4 text-[#d4a017]" />
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#d4a017] to-transparent opacity-35 mt-2.5" />
        </div>

        {/* Form */}
        <div
          className="relative z-10"
          key={isSignIn ? 'signin' : 'signup'}
        >
          {isSignIn ? (
            <SignInForm
              onToggle={toggle}
              onSubmit={handleSubmit}
            />
          ) : (
            <SignUpForm
              onToggle={toggle}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BRAND PANEL
   ───────────────────────────────────────────────────────────── */

function BrandPanel() {
  return (
    <div
      className="
        relative w-full rounded-2xl
        bg-[#0d0d0d]
        overflow-hidden flex-1
        shadow-[0_0_40px_0_#d4a01710,0_20px_60px_rgba(0,0,0,0.85)]
      "
    >
      <GoldBorder animated={false} />

      <div className="relative z-10 flex flex-col h-full p-7 gap-6">

        {/* Wordmark */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-11 h-11 rounded-full shrink-0
              border-2 border-[#d4a017]
              bg-[#d4a01715]
              flex items-center justify-center
            "
          >
            <StarIcon className="w-5 h-5 text-[#ffd700]" />
          </div>

          <div>
            <h2
              className="
                font-display
                text-4xl
                tracking-[0.1em]
                leading-none
                text-white
                drop-shadow-[0_0_14px_#d4a01740]
              "
            >
              AKASH<span className="text-[#d4a017]">GANGA</span>
            </h2>

            <p className="text-[10px] tracking-[0.28em] text-[#d4a01780] mt-0.5">
              ✦ SPACE &amp; PLANETS PORTAL ✦
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#d4a017] to-transparent opacity-30" />

        {/* ─────────────────────────────────────────────
            SPIDER-MAN IMAGE AREA
            ───────────────────────────────────────────── */}
        <div
          className="
            flex-1
            min-h-[280px]
            rounded-xl
            overflow-hidden
            relative
            border
            border-[#d4a01748]
            bg-[#0d0d0d]
            flex
            items-center
            justify-center
            p-4
            shadow-[inset_0_0_20px_rgba(0,0,0,0.06)]
          "
        >

          {/* Dark gold dotted background */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(#d4a01718_1px,transparent_1px)]
              [background-size:12px_12px]
              opacity-70
              pointer-events-none
            "
          />

          {/* Subtle center glow */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.07),transparent_65%)]
              pointer-events-none
            "
          />

          {/* Spider-Man */}
          <div
            className="
              relative
              z-10
              flex
              items-center
              justify-center
              w-full
              h-full
            "
          >
            <HeroLineArt />
          </div>

          {/* Corner gold accents */}
          <div
            className="
              absolute top-2 left-2
              w-5 h-5
              border-t-2 border-l-2
              border-[#d4a017]
              rounded-tl-md
            "
          />

          <div
            className="
              absolute top-2 right-2
              w-5 h-5
              border-t-2 border-r-2
              border-[#d4a017]
              rounded-tr-md
            "
          />

          <div
            className="
              absolute bottom-2 left-2
              w-5 h-5
              border-b-2 border-l-2
              border-[#d4a017]
              rounded-bl-md
            "
          />

          <div
            className="
              absolute bottom-2 right-2
              w-5 h-5
              border-b-2 border-r-2
              border-[#d4a017]
              rounded-br-md
            "
          />
        </div>

        {/* Tagline */}
        <p className="text-center text-xs text-[#d4a01760] tracking-widest font-body">
          Explore the cosmos · Discover the universe
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOGIN PAGE
   ───────────────────────────────────────────────────────────── */

export default function LoginPage() {
  useStarfield();
  useWebCursor();

  const { fireShot } = useWebShooter();

  const [thwipOn, setThwipOn] = useState(true);
  const [thwipAnim, setThwipAnim] = useState(false);

  const handleThwip = useCallback(
    (e) => {
      const r = e.currentTarget.getBoundingClientRect();

      fireShot(
        r.left + r.width / 2,
        r.top + r.height / 2,
        2
      );

      setThwipOn((v) => !v);
      setThwipAnim(true);

      try {
        const ac = new (
          window.AudioContext ||
          window.webkitAudioContext
        )();

        const osc = ac.createOscillator();
        const gain = ac.createGain();

        osc.connect(gain);
        gain.connect(ac.destination);

        osc.type = 'sawtooth';

        osc.frequency.setValueAtTime(
          440,
          ac.currentTime
        );

        osc.frequency.exponentialRampToValueAtTime(
          80,
          ac.currentTime + 0.2
        );

        gain.gain.setValueAtTime(
          0.14,
          ac.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ac.currentTime + 0.22
        );

        osc.start();
        osc.stop(ac.currentTime + 0.22);
      } catch (_) {
        // Audio API unavailable
      }

      setTimeout(() => {
        setThwipAnim(false);
      }, 420);
    },
    [fireShot]
  );

  return (
    <>
      {/* Canvas layers */}
      <canvas id="star-canvas" aria-hidden="true" />
      <canvas id="particle-canvas" aria-hidden="true" />
      <canvas id="shooter-canvas" aria-hidden="true" />
      <canvas id="cursor-canvas" aria-hidden="true" />

      {/* Page */}
      <main
        className="
          relative z-10
          min-h-screen w-full
          flex flex-col items-center justify-center
          px-4 py-10 pb-28
          bg-[#0a0a0a]
        "
      >

        {/* Top glow */}
        <div
          className="
            pointer-events-none
            fixed inset-0 z-0
            bg-[radial-gradient(ellipse_70%_28%_at_50%_0%,#d4a01712_0%,transparent_65%)]
          "
        />

        {/* Two panels */}
        <div
          className="
            relative z-10
            flex flex-col lg:flex-row
            items-stretch justify-center
            gap-6
            w-full max-w-[960px]
          "
        >

          {/* Left panel */}
          <div className="w-full lg:w-[44%]">
            <SignInCard fireShot={fireShot} />
          </div>

          {/* Right panel */}
          <div className="w-full lg:w-[56%]">
            <BrandPanel />
          </div>

        </div>
      </main>
    </>
  );
}