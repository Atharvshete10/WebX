/**
 * SpiderManSVG.jsx
 * Spider-Man in a crouching/leaping pose — white body with black outlines/details.
 * Completely self-contained SVG, no external assets needed.
 * Easily swappable with an <img> tag if a real image is provided later.
 */
export default function SpiderManSVG({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 480"
      className={className}
      aria-label="Spider-Man crouching pose"
      role="img"
    >
      {/* ── Ambient glow behind figure ── */}
      <defs>
        <radialGradient id="bodyGlow" cx="50%" cy="55%" r="45%">
          <stop offset="0%"   stopColor="#e62429" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Glow halo */}
      <ellipse cx="160" cy="310" rx="110" ry="130" fill="url(#bodyGlow)" />

      {/* ══════════════════════════════════
          BODY (white fill, black strokes)
          ══════════════════════════════════ */}

      {/* ── Torso ── */}
      <path
        d="M130 190 Q120 220 118 260 Q116 290 130 310 L190 310 Q204 290 202 260 Q200 220 190 190 Z"
        fill="white" stroke="black" strokeWidth="3" strokeLinejoin="round"
      />

      {/* ── Chest spider emblem ── */}
      <path
        d="M160 205 L155 220 L147 218 L155 228 L152 240 L160 233 L168 240 L165 228 L173 218 L165 220 Z"
        fill="black"
      />

      {/* ── Head ── */}
      <ellipse cx="160" cy="165" rx="36" ry="42" fill="white" stroke="black" strokeWidth="3" />

      {/* Face mask details — eyes (white lenses, black outline) */}
      <ellipse cx="145" cy="158" rx="13" ry="10" fill="white" stroke="black" strokeWidth="2.5" transform="rotate(-12, 145, 158)" />
      <ellipse cx="175" cy="158" rx="13" ry="10" fill="white" stroke="black" strokeWidth="2.5" transform="rotate(12, 175, 158)" />
      {/* Inner eye shading */}
      <ellipse cx="145" cy="158" rx="9" ry="7" fill="#ddd" stroke="black" strokeWidth="1.2" transform="rotate(-12, 145, 158)" />
      <ellipse cx="175" cy="158" rx="9" ry="7" fill="#ddd" stroke="black" strokeWidth="1.2" transform="rotate(12, 175, 158)" />

      {/* Spider-Man head web lines */}
      <line x1="160" y1="123" x2="130" y2="165" stroke="black" strokeWidth="1" opacity="0.4" />
      <line x1="160" y1="123" x2="160" y2="207" stroke="black" strokeWidth="1" opacity="0.4" />
      <line x1="160" y1="123" x2="190" y2="165" stroke="black" strokeWidth="1" opacity="0.4" />
      <path d="M133 148 Q160 155 187 148" fill="none" stroke="black" strokeWidth="0.8" opacity="0.4" />
      <path d="M128 165 Q160 172 192 165" fill="none" stroke="black" strokeWidth="0.8" opacity="0.4" />
      <path d="M130 182 Q160 189 190 182" fill="none" stroke="black" strokeWidth="0.8" opacity="0.4" />

      {/* ── Hips/pelvis ── */}
      <path
        d="M118 285 Q120 305 128 316 L192 316 Q200 305 202 285 Z"
        fill="white" stroke="black" strokeWidth="2.5"
      />

      {/* ── Left arm (raised, web-shooter hand) ── */}
      <path
        d="M130 195 Q105 175 82 148 Q74 138 78 128 Q82 118 92 122 L102 142 Q115 165 128 218 Z"
        fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* Web-shooter wrist band */}
      <rect x="78" y="127" width="20" height="10" rx="3" fill="black" stroke="black" strokeWidth="1" transform="rotate(-30, 88, 132)" />
      {/* Left hand fingers (spread for web shooting) */}
      <line x1="79" y1="124" x2="68" y2="112" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <line x1="85" y1="120" x2="77" y2="107" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <line x1="91" y1="118" x2="87" y2="104" stroke="black" strokeWidth="2" strokeLinecap="round" />

      {/* Web strand shooting from wrist */}
      <path
        d="M80 118 Q60 90 30 50"
        fill="none" stroke="#c8a97e" strokeWidth="1.8" strokeLinecap="round" opacity="0.9"
        filter="url(#glow)"
      />
      <path
        d="M82 120 Q55 95 25 55"
        fill="none" stroke="#c8a97e" strokeWidth="1" strokeLinecap="round" opacity="0.5"
      />

      {/* ── Right arm (down/back) ── */}
      <path
        d="M190 195 Q212 200 230 220 Q244 236 238 250 Q232 264 222 258 L210 238 Q200 215 188 218 Z"
        fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* Right hand */}
      <ellipse cx="228" cy="260" rx="11" ry="8" fill="white" stroke="black" strokeWidth="2" transform="rotate(20, 228, 260)" />

      {/* ── Left leg (forward/crouching) ── */}
      <path
        d="M128 316 Q118 345 108 375 Q102 398 112 412 Q122 426 138 418 L142 395 Q138 370 142 345 L148 316 Z"
        fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* Left knee cap */}
      <ellipse cx="118" cy="372" rx="10" ry="8" fill="white" stroke="black" strokeWidth="2" />
      {/* Left foot */}
      <path d="M112 412 Q105 420 96 426 Q86 430 90 440 Q94 448 106 444 L128 430 L138 418 Z"
        fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* ── Right leg (back/crouching) ── */}
      <path
        d="M172 316 L176 345 Q180 370 176 395 L174 416 Q188 428 202 424 Q216 420 218 408 Q216 396 206 388 L198 368 Q190 345 182 316 Z"
        fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"
      />
      {/* Right knee */}
      <ellipse cx="200" cy="374" rx="10" ry="8" fill="white" stroke="black" strokeWidth="2" />
      {/* Right foot */}
      <path d="M174 416 Q168 428 172 440 Q178 450 192 446 L218 432 L218 408 Z"
        fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"
      />

      {/* ── Torso web pattern lines ── */}
      <path d="M160 190 L140 260 M160 190 L180 260" fill="none" stroke="black" strokeWidth="0.8" opacity="0.3" />
      <path d="M118 220 Q160 228 202 220" fill="none" stroke="black" strokeWidth="0.8" opacity="0.3" />
      <path d="M118 240 Q160 248 202 240" fill="none" stroke="black" strokeWidth="0.8" opacity="0.3" />
      <path d="M118 260 Q160 268 202 260" fill="none" stroke="black" strokeWidth="0.8" opacity="0.3" />
      <path d="M120 280 Q160 288 200 280" fill="none" stroke="black" strokeWidth="0.8" opacity="0.3" />

      {/* ── Subtle shadow/shading on limbs ── */}
      <path d="M110 370 Q112 390 112 412" fill="none" stroke="#ccc" strokeWidth="4" opacity="0.2" />
      <path d="M196 370 Q200 390 202 410" fill="none" stroke="#ccc" strokeWidth="4" opacity="0.2" />
    </svg>
  );
}
