/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Akashganga / Spider-Verse palette ──────────────────
        spidey: {
          red:      '#e62429',   // Spider-Man red
          blue:     '#1a4bb8',   // Spider-Man blue
          gold:     '#d4a017',   // golden card borders
          gold2:    '#ffd700',   // brighter gold accent
          black:    '#0a0a0a',   // page background
          card:     '#0d0d0d',   // card surface
          input:    '#111111',   // input background
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // Card border slow shimmer
        goldShimmer: {
          '0%,100%': { opacity: '0.75' },
          '50%':     { opacity: '1' },
        },
        // Badge glow pulse
        badgePulse: {
          '0%,100%': { boxShadow: '0 0 6px 1px #d4a01760' },
          '50%':     { boxShadow: '0 0 16px 4px #ffd70099' },
        },
        // Form fade-slide in from right
        slideRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        // Form fade-slide in from left
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        // Thwip shake
        thwipBounce: {
          '0%,100%': { transform: 'scale(1)' },
          '30%':     { transform: 'scale(1.18) rotate(-6deg)' },
          '60%':     { transform: 'scale(1.1) rotate(4deg)' },
        },
        // Star spin
        spinStar: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        // Button shimmer sweep
        btnShimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        goldShimmer:  'goldShimmer 3s ease-in-out infinite',
        badgePulse:   'badgePulse 2.4s ease-in-out infinite',
        slideRight:   'slideRight 0.32s ease-out forwards',
        slideLeft:    'slideLeft 0.32s ease-out forwards',
        thwipBounce:  'thwipBounce 0.38s ease-in-out',
        spinStar:     'spinStar 10s linear infinite',
        btnShimmer:   'btnShimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
