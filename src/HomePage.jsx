/**
 * HomePage.jsx
 * WEB-SPRINT Round 2
 * Akashganga — Space / Exoplanets Information Portal
 */

import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box3, Vector3 } from 'three';

import {
  Menu,
  X,
  Rocket,
  Globe,
  Sparkles,
  Send,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Rotate3D,
  ZoomIn,
} from 'lucide-react';

import { Canvas } from '@react-three/fiber';

import {
  OrbitControls,
  useGLTF,
  Environment,
} from '@react-three/drei';

import { useStarfield } from './hooks/useStarfield';
import { useWebCursor } from './hooks/useWebCursor';
import { useWebShooter } from './hooks/useWebShooter';

import spidermanImage from './assets/spiderman.png';

/* ============================================================
   PLANET 3D MODELS
   ============================================================

   IMPORTANT:
   The .glb files are inside the public/planets folder.

   Vite serves files inside public/ directly from the root URL.

   Therefore:
   public/planets/kepler-22b.glb
   becomes:
   /planets/kepler-22b.glb

   DO NOT import these files with ./public/...
   ============================================================ */


/* ============================================================
   SOCIAL ICONS
   ============================================================ */

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
    />

    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

    <line
      x1="17.5"
      y1="6.5"
      x2="17.51"
      y2="6.5"
    />
  </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />

    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


/* ============================================================
   STAR ICON
   ============================================================ */

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


/* ============================================================
   HERO MASK ICON
   ============================================================ */

const HeroMaskIcon = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <ellipse
      cx="20"
      cy="20"
      rx="14"
      ry="17"
      stroke="currentColor"
      strokeWidth="2"
      fill="#0d0d0d"
    />

    <path
      d="M14 18 Q8 14 11 22 Q16 26 18 20 Z"
      fill="#ffd700"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M8 14 L4 10 L10 16"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M26 18 Q32 14 29 22 Q24 26 22 20 Z"
      fill="#ffd700"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <path
      d="M32 14 L36 10 L30 16"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <line
      x1="20"
      y1="3"
      x2="20"
      y2="37"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />

    <line
      x1="6"
      y1="20"
      x2="34"
      y2="20"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.4"
    />
  </svg>
);


/* ============================================================
   ASTRONAUT ICON
   ============================================================ */

const LineAstronaut = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle
      cx="32"
      cy="20"
      r="12"
      stroke="#ffd700"
      strokeWidth="2"
      fill="#0d0d0d"
    />

    <ellipse
      cx="32"
      cy="20"
      rx="7"
      ry="5"
      fill="#1a4bb8"
      stroke="#ffd700"
      strokeWidth="1.2"
      opacity="0.8"
    />

    <path
      d="M20 34 C20 30 44 30 44 34 L46 54 L18 54 Z"
      stroke="currentColor"
      fill="#0d0d0d"
    />

    <path
      d="M20 36 L12 44 M44 36 L52 44"
      stroke="currentColor"
    />

    <circle
      cx="28"
      cy="40"
      r="1.5"
      fill="#e62429"
    />

    <circle
      cx="36"
      cy="40"
      r="1.5"
      fill="#1a4bb8"
    />
  </svg>
);


/* ============================================================
   EXOPLANET DATA
   ============================================================ */

const EXOPLANETS_DATA = [
  {
    id: 1,
    name: 'Kepler-22B',
    slug: 'kepler-22b',
    image: spidermanImage,

    // File is inside public/planets/
    model: '/planets/kepler-22b.glb',

    distance: '635',
    type: 'Super-Earth',
    ringColor: 'rgba(230, 36, 41, 0.6)',

    desc:
      'First transiting planet found in the habitable zone of a Sun-like star.',

    longDesc:
      'Kepler-22b is an exoplanet orbiting within the habitable zone of the Sun-like star Kepler-22. It is larger than Earth and was one of the first planets discovered in a potentially habitable region around a Sun-like star.',
  },

  {
    id: 2,
    name: 'LHS-1140-B',
    slug: 'lhs-1140-b',
    image: spidermanImage,

    model: '/planets/lhs-1140-b.glb',

    distance: '48',
    type: 'Rocky World',
    ringColor: 'rgba(0, 210, 255, 0.6)',

    desc:
      'A dense rocky world in the habitable zone of a quiet red dwarf star.',

    longDesc:
      'LHS 1140 b is a rocky exoplanet located in the habitable zone of its host star. Its relatively close distance makes it an important target for atmospheric studies and future observations.',
  },

  {
    id: 3,
    name: 'WASP-12B',
    slug: 'wasp-12b',
    image: spidermanImage,

    model: '/planets/wasp-12b.glb',

    distance: '1,410',
    type: 'Hot Jupiter',
    ringColor: 'rgba(255, 215, 0, 0.6)',

    desc:
      'An ultra-hot gas giant being stretched into an egg shape by its star.',

    longDesc:
      'WASP-12b is an extremely hot gas giant orbiting very close to its parent star. Its high temperature and intense stellar environment make it one of the most interesting hot Jupiter systems.',
  },

  {
    id: 4,
    name: 'Proxima Centauri B',
    slug: 'proxima-centauri-b',
    image: spidermanImage,

    model: '/planets/proxima-centauri-b.glb',

    distance: '4.24',
    type: 'Terrestrial',
    ringColor: 'rgba(147, 51, 234, 0.6)',

    desc:
      'The closest known exoplanet to our Solar System, orbiting Proxima Centauri.',

    longDesc:
      'Proxima Centauri b is a planet orbiting the closest star to our Sun. Its location within the star’s habitable zone makes it an especially important target in the search for potentially habitable worlds.',
  },

  {
    id: 5,
    name: 'TRAPPIST-1e',
    slug: 'trappist-1e',
    image: spidermanImage,

    model: '/planets/trappist-1e.glb',

    distance: '40',
    type: 'Earth-sized Habitable',
    ringColor: 'rgba(16, 185, 129, 0.6)',

    desc:
      'One of seven Earth-sized worlds orbiting an ultra-cool dwarf star.',

    longDesc:
      'TRAPPIST-1e is one of several Earth-sized planets orbiting the TRAPPIST-1 star. It lies within the system’s habitable zone and is an important candidate for studying the conditions that could support liquid water.',
  },
];


/* ============================================================
   TRIVIA DATA
   ============================================================ */

const TRIVIA_DATA = [
  {
    id: 1,
    title: 'Rocket Man',
    subtitle: 'Cosmic Propulsion',
    desc:
      'Exploring next-gen ion thrusters and antimatter drive concepts.',
    badge: 'Tech Trivia',
    gradient: 'from-[#1a4bb820] to-[#e6242920]',
    icon: Rocket,
  },

  {
    id: 2,
    title: 'Planet Man',
    subtitle: 'Atmospheric Physics',
    desc:
      'How magnetospheres shield planetary atmospheres from cosmic rays.',
    badge: 'Science Fact',
    gradient: 'from-[#d4a01720] to-[#1a4bb820]',
    icon: Globe,
  },

  {
    id: 3,
    title: 'Space Fact',
    subtitle: 'Interstellar Medium',
    desc:
      'Over 99% of visible matter in the universe exists in plasma state.',
    badge: 'Cosmic Knowledge',
    gradient: 'from-[#e6242920] to-[#d4a01720]',
    icon: Sparkles,
  },
];


/* ============================================================
   3D PLANET MODEL
   ============================================================ */

function PlanetModel({ model }) {
  const { scene } = useGLTF(model);

  /*
   * Automatically calculate the model's bounding box.
   * This makes models of completely different original sizes
   * appear at a consistent size inside the viewer.
   */

  const modelData = useMemo(() => {
    const box = new Box3().setFromObject(scene);

    const size = new Vector3();
    const center = new Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(
      size.x,
      size.y,
      size.z
    );

    /*
     * Target size inside the 3D viewer.
     *
     * Increasing this makes the planet larger.
     * Decreasing it makes the planet smaller.
     */
    const TARGET_SIZE = 3.0;

    const scale =
      maxDimension > 0
        ? TARGET_SIZE / maxDimension
        : 1;

    return {
      scale,
      center: center.toArray(),
    };
  }, [scene]);

  return (
    <group
      position={[
        -modelData.center[0] * modelData.scale,
        -modelData.center[1] * modelData.scale,
        -modelData.center[2] * modelData.scale,
      ]}
      scale={modelData.scale}
    >
      <primitive object={scene} />
    </group>
  );
}

/* ============================================================
   PLANET VIEWER
   ============================================================ */

function PlanetViewer({ planet, onClose }) {
  return (
    <div
      className="
        fixed inset-0 z-[100]
        bg-[#050505]/95
        backdrop-blur-xl
        overflow-y-auto
      "
    >

      {/* TOP BAR */}

      <div
        className="
          sticky top-0 z-20
          bg-[#080808]/90
          backdrop-blur-md
          border-b border-[#d4a01740]
        "
      >
        <div
          className="
            max-w-7xl mx-auto
            px-4 sm:px-6
            h-20
            flex items-center
            justify-between
          "
        >

          <button
            type="button"
            onClick={onClose}
            className="
              flex items-center gap-2
              px-5 py-2.5
              rounded-full
              border border-[#d4a017]
              text-[#ffd700]
              font-display
              tracking-wider
              hover:bg-[#d4a01720]
              transition-all
            "
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO CATALOGUE
          </button>

          <div
            className="
              hidden sm:flex
              items-center gap-2
              text-[#ffd700]
              text-xs
              tracking-[0.2em]
              font-display
            "
          >
            <Rotate3D className="w-4 h-4" />
            3D PLANET EXPLORER
          </div>

        </div>
      </div>


      {/* CONTENT */}

      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          py-10
        "
      >

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            items-center
          "
        >

          {/* 3D MODEL */}

          <div
            className="
              relative
              h-[420px]
              sm:h-[520px]
              rounded-3xl
              overflow-hidden
              bg-[#080808]
              border border-[#d4a01750]
              shadow-[0_0_60px_rgba(212,160,23,0.12)]
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                inset-0
                pointer-events-none
                bg-[radial-gradient(circle_at_center,rgba(26,75,184,0.18),transparent_55%)]
              "
            />

            <Canvas
              camera={{
                position: [0, 0, 5.5],
                fov: 40,
                near: 0.1,
                far: 100,
              }}
              dpr={[1, 2]}
              gl={{
                antialias: true,
                alpha: true,
              }}
            >

              <ambientLight intensity={1.5} />

              <directionalLight
                position={[5, 5, 5]}
                intensity={3}
              />

              <pointLight
                position={[-5, -5, -5]}
                intensity={1}
              />

              <Suspense fallback={null}>

                <PlanetModel
                  model={planet.model}
                />

                <Environment
                  preset="night"
                />

              </Suspense>

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={2}
                maxDistance={8}
                autoRotate={false}
              />

            </Canvas>


            {/* 3D CONTROLS INFO */}

            <div
              className="
                absolute
                bottom-4
                left-1/2
                -translate-x-1/2
                flex items-center gap-3
                px-4 py-2
                rounded-full
                bg-black/70
                border border-[#d4a01740]
                text-[10px]
                text-gray-400
                whitespace-nowrap
              "
            >

              <Rotate3D
                className="w-3.5 h-3.5 text-[#ffd700]"
              />

              Drag to rotate

              <span className="text-[#d4a01750]">
                |
              </span>

              <ZoomIn
                className="w-3.5 h-3.5 text-[#00d2ff]"
              />

              Scroll to zoom

            </div>

          </div>


          {/* PLANET INFORMATION */}

          <div
            className="
              flex flex-col
              gap-6
            "
          >

            {/* Label */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                w-fit
                px-3 py-1.5
                rounded-full
                border border-[#d4a01750]
                bg-[#d4a01710]
                text-[#ffd700]
                text-[10px]
                font-semibold
                tracking-[0.2em]
                uppercase
              "
            >

              <StarIcon className="w-3 h-3" />

              EXOPLANET PROFILE

            </div>


            {/* Name */}

            <h1
              className="
                font-display
                text-5xl
                sm:text-7xl
                tracking-[0.08em]
                text-white
                leading-none
              "
            >
              {planet.name}
            </h1>


            {/* Type */}

            <div
              className="
                flex flex-wrap
                gap-3
              "
            >

              <span
                className="
                  px-4 py-2
                  rounded-full
                  border border-[#d4a01750]
                  bg-[#d4a01710]
                  text-[#ffd700]
                  text-xs
                  tracking-widest
                  uppercase
                "
              >
                {planet.type}
              </span>

              <span
                className="
                  px-4 py-2
                  rounded-full
                  border border-[#1a4bb850]
                  bg-[#1a4bb810]
                  text-[#00d2ff]
                  text-xs
                  tracking-widest
                "
              >
                {planet.distance} LY FROM EARTH
              </span>

            </div>


            {/* Divider */}

            <div
              className="
                h-px
                w-full
                bg-gradient-to-r
                from-[#d4a017]
                via-[#e62429]
                to-transparent
              "
            />


            {/* Description */}

            <div>

              <h2
                className="
                  font-display
                  text-2xl
                  tracking-wider
                  text-[#ffd700]
                  mb-3
                "
              >
                ABOUT THIS WORLD
              </h2>

              <p
                className="
                  text-gray-300
                  text-sm sm:text-base
                  leading-8
                  font-body
                "
              >
                {planet.longDesc}
              </p>

            </div>


            {/* QUICK FACTS */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >

              <div
                className="
                  p-5
                  rounded-2xl
                  bg-[#0d0d0d]
                  border border-[#d4a01730]
                "
              >

                <div
                  className="
                    text-[10px]
                    text-gray-500
                    tracking-widest
                    uppercase
                    mb-2
                  "
                >
                  Planet Type
                </div>

                <div
                  className="
                    text-white
                    font-display
                    tracking-wider
                  "
                >
                  {planet.type}
                </div>

              </div>


              <div
                className="
                  p-5
                  rounded-2xl
                  bg-[#0d0d0d]
                  border border-[#d4a01730]
                "
              >

                <div
                  className="
                    text-[10px]
                    text-gray-500
                    tracking-widest
                    uppercase
                    mb-2
                  "
                >
                  Distance
                </div>

                <div
                  className="
                    text-[#00d2ff]
                    font-display
                    tracking-wider
                  "
                >
                  {planet.distance} LY
                </div>

              </div>

            </div>


            {/* BACK BUTTON */}

            <button
              type="button"
              onClick={onClose}
              className="
                mt-2
                w-full
                sm:w-fit
                px-8 py-3.5
                rounded-full
                font-display
                tracking-[0.15em]
                text-sm
                text-[#ffd700]
                border border-[#d4a017]
                bg-transparent
                hover:bg-[#d4a01720]
                hover:shadow-[0_0_20px_#ffd70030]
                transition-all
                flex items-center
                justify-center
                gap-2
              "
            >

              <ArrowLeft className="w-4 h-4" />

              RETURN TO CATALOGUE

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   NAVBAR
   ============================================================ */

function Navbar() {

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState('home');

  const navRef = useRef(null);


  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }

    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    document.addEventListener(
      'touchstart',
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );

      document.removeEventListener(
        'touchstart',
        handleClickOutside
      );

    };

  }, []);


  useEffect(() => {

    const handleScroll = () => {

      const sections = [
        'home',
        'exoplanets',
        'trivia',
        'newsletter',
      ];

      const scrollPos =
        window.scrollY + 200;

      for (const section of sections) {

        const el =
          document.getElementById(section);

        if (el) {

          const top =
            el.offsetTop;

          const height =
            el.offsetHeight;

          if (
            scrollPos >= top &&
            scrollPos < top + height
          ) {

            setActiveSection(section);

            break;

          }

        }

      }

    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () => {

      window.removeEventListener(
        'scroll',
        handleScroll
      );

    };

  }, []);


  const navLinks = [
    {
      name: 'Home',
      href: '#home',
      id: 'home',
    },

    {
      name: 'Exoplanets',
      href: '#exoplanets',
      id: 'exoplanets',
    },

    {
      name: 'Exploration',
      href: '#trivia',
      id: 'trivia',
    },

    {
      name: 'Facts',
      href: '#newsletter',
      id: 'newsletter',
    },
  ];


  return (
    <header
      ref={navRef}
      className="
        sticky top-0 z-40 w-full
        bg-[#0a0a0a]/85
        backdrop-blur-md
        border-b border-[#d4a01735]
      "
    >

      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          h-20
          flex items-center justify-between
        "
      >

        <Link
          to="/"
          className="
            flex items-center gap-3 group
          "
        >

          <div
            className="
              w-10 h-10
              rounded-full
              border-2 border-[#d4a017]
              bg-[#d4a01715]
              flex items-center justify-center
              transition-transform
              group-hover:scale-105
            "
          >
            <StarIcon
              className="w-5 h-5 text-[#ffd700]"
            />
          </div>

          <span
            className="
              font-display
              text-2xl sm:text-3xl
              tracking-[0.1em]
              text-white
              group-hover:text-[#ffd700]
            "
          >
            AKASH
            <span className="text-[#d4a017]">
              GANGA
            </span>
          </span>

        </Link>


        <button
          id="navbar-hamburger-btn"
          type="button"
          onClick={() =>
            setDropdownOpen(!dropdownOpen)
          }
          className="
            p-2.5 rounded-xl
            border border-[#d4a01750]
            text-[#ffd700]
            bg-[#d4a01710]
            hover:border-[#ffd700]
            hover:bg-[#d4a01725]
            transition-all
            active:scale-95
            flex items-center justify-center
          "
          aria-label="Toggle navigation menu"
          aria-expanded={dropdownOpen}
        >

          {dropdownOpen ? (
            <X
              className="w-6 h-6 text-[#e62429]"
            />
          ) : (
            <Menu
              className="w-6 h-6 text-[#ffd700]"
            />
          )}

        </button>

      </div>


      {dropdownOpen && (

        <div
          className="
            absolute top-full left-0 right-0
            bg-[#0d0d0d]/95
            backdrop-blur-md
            border-b-2 border-[#d4a017]
            px-6 py-6
          "
        >

          <div
            className="
              max-w-7xl mx-auto
              w-full
              flex flex-col gap-2
            "
          >

            {navLinks.map((link) => {

              const isActive =
                activeSection === link.id;

              return (

                <a
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setDropdownOpen(false)
                  }
                  className={`
                    flex items-center justify-between
                    px-5 py-3 rounded-xl
                    font-display
                    tracking-[0.12em]
                    text-lg sm:text-xl
                    uppercase
                    border
                    transition-all duration-200

                    ${
                      isActive
                        ? `
                          border-[#ffd700]
                          text-[#ffd700]
                          bg-[#d4a01720]
                        `
                        : `
                          border-[#d4a01730]
                          text-gray-200
                          hover:text-[#ffd700]
                          hover:bg-[#d4a01715]
                        `
                    }
                  `}
                >

                  <span className="flex items-center gap-3">

                    <StarIcon
                      className={`
                        w-4 h-4
                        ${
                          isActive
                            ? 'text-[#ffd700]'
                            : 'text-[#d4a01760]'
                        }
                      `}
                    />

                    {link.name}

                  </span>


                  <ChevronRight
                    className={`
                      w-5 h-5
                      ${
                        isActive
                          ? 'text-[#ffd700]'
                          : 'text-[#d4a01770]'
                      }
                    `}
                  />

                </a>

              );

            })}

          </div>

        </div>

      )}

    </header>
  );
}


/* ============================================================
   HERO SECTION
   ============================================================ */

function HeroSection() {

  return (

    <section
      id="home"
      className="
        relative
        min-h-[85vh]
        flex flex-col
        items-center
        justify-center
        px-4 py-16
        text-center
        overflow-hidden
      "
    >

      <div
        className="
          absolute
          top-1/4 left-8
          sm:left-24
          w-36 h-24
          sm:w-56 sm:h-36
          rounded-[60%_40%_70%_30%/40%_50%_60%_50%]
          border border-[#d4a01745]
          pointer-events-none
          rotate-12
          opacity-60
        "
      />


      <div
        className="
          absolute
          top-1/3 right-8
          sm:right-28
          w-40 h-28
          sm:w-64 sm:h-40
          rounded-[40%_60%_30%_70%/60%_40%_50%_50%]
          border border-[#1a4bb845]
          pointer-events-none
          -rotate-12
          opacity-60
        "
      />


      <div
        className="
          relative z-10
          max-w-4xl mx-auto
          flex flex-col
          items-center
          gap-8
        "
      >

        <div
          className="
            inline-flex items-center gap-2
            px-4 py-1.5
            rounded-full
            border border-[#d4a017]
            bg-[#d4a01710]
            text-[#ffd700]
            text-xs
            font-semibold
            tracking-widest
            uppercase
          "
        >

          <StarIcon
            className="w-3.5 h-3.5"
          />

          INTERSTELLAR EXPLORATION SYSTEM

        </div>


        <h1
          className="
            font-display
            text-6xl sm:text-8xl lg:text-9xl
            tracking-[0.08em]
            text-white
            leading-none
          "
        >

          EXPLORE{' '}

          <span
            className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-[#ffd700]
              via-[#e62429]
              to-[#1a4bb8]
            "
          >
            EXOPLANETS
          </span>

        </h1>


        <p
          className="
            max-w-2xl
            text-base sm:text-lg
            text-gray-300
            font-body
            leading-relaxed
          "
        >
          Journey beyond our solar system.
          Discover distant worlds, alien
          magnetospheres, and potential homes
          across the Milky Way galaxy.
        </p>


        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-4 mt-2
          "
        >

          <a
            href="#exoplanets"
            className="
              px-8 py-3.5
              rounded-full
              font-display
              tracking-[0.16em]
              text-lg
              text-white
              bg-gradient-to-r
              from-[#e62429]
              via-[#c41d22]
              to-[#1a4bb8]
              border border-[#e6242960]
              transition-all
              hover:scale-105
              active:scale-95
              flex items-center gap-2
            "
          >
            VIEW CATALOGUE

            <ArrowRight
              className="w-5 h-5"
            />

          </a>


          <a
            href="#trivia"
            className="
              px-8 py-3.5
              rounded-full
              font-display
              tracking-[0.14em]
              text-lg
              text-[#ffd700]
              border-2 border-[#d4a017]
              bg-transparent
              transition-all
              hover:bg-[#d4a01720]
              active:scale-95
            "
          >
            DISCOVER TRIVIA
          </a>

        </div>


        <div
          className="
            grid grid-cols-1 sm:grid-cols-2
            gap-6
            w-full max-w-xl
            mt-10
          "
        >

          <div
            className="
              relative p-6
              rounded-2xl
              bg-[#0d0d0d]
              border border-[#d4a01740]
              text-center
              hover:border-[#ffd700]
              transition-colors
            "
          >

            <div
              className="
                font-display
                text-4xl sm:text-5xl
                text-[#ffd700]
                tracking-wider
                mb-1
              "
            >
              1,500+
            </div>

            <div
              className="
                text-xs
                text-gray-400
                font-medium
                uppercase
                tracking-widest
              "
            >
              Visible Exoplanets Documented
            </div>

          </div>


          <div
            className="
              relative p-6
              rounded-2xl
              bg-[#0d0d0d]
              border border-[#d4a01740]
              text-center
              hover:border-[#1a4bb8]
              transition-colors
            "
          >

            <div
              className="
                font-display
                text-4xl sm:text-5xl
                text-[#00d2ff]
                tracking-wider
                mb-1
              "
            >
              42.1 LY
            </div>

            <div
              className="
                text-xs
                text-gray-400
                font-medium
                uppercase
                tracking-widest
              "
            >
              Distance from Earth
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   EXOPLANETS CAROUSEL
   ============================================================ */

function ExoplanetsCarousel({
  fireShot,
  onPlanetSelect,
}) {

  const scrollRef = useRef(null);

  const [scrollAngle, setScrollAngle] =
    useState(0);


  const handleScroll = () => {

    if (scrollRef.current) {

      const scrollLeft =
        scrollRef.current.scrollLeft;

      setScrollAngle(
        scrollLeft * 0.35
      );

    }

  };


  return (

    <section
      id="exoplanets"
      className="
        py-20
        px-4 sm:px-6 lg:px-8
        max-w-7xl mx-auto
      "
    >

      <div
        className="
          flex flex-col
          items-center text-center
          mb-14
        "
      >

        <div
          className="
            flex items-center
            justify-center
            gap-3 mb-2
          "
        >

          <StarIcon
            className="w-5 h-5 text-[#ffd700]"
          />

          <h2
            className="
              font-display
              text-4xl sm:text-6xl
              tracking-[0.1em]
              text-white
            "
          >
            EXOPLANETS
          </h2>

          <StarIcon
            className="w-5 h-5 text-[#ffd700]"
          />

        </div>


        <p
          className="
            text-sm
            text-gray-400
            max-w-md
            font-body
          "
        >
          Swipe or scroll horizontally to explore
          distant worlds. Click VIEW PLANET to
          inspect the interactive 3D model.
        </p>


        <div
          className="
            h-0.5 w-32
            bg-gradient-to-r
            from-transparent
            via-[#d4a017]
            to-transparent
            mt-4
            opacity-60
          "
        />

      </div>


      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="
          flex gap-6
          overflow-x-auto
          pb-10 pt-16 px-4
          scroll-smooth
          snap-x snap-mandatory
          no-scrollbar
          cursor-grab
          active:cursor-grabbing
        "
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >

        {EXOPLANETS_DATA.map((planet) => (

          <div
            key={planet.id}
            className="
              shrink-0
              w-80 sm:w-96
              rounded-2xl
              bg-[#0d0d0d]
              border border-[#d4a01740]
              p-6 pt-16
              relative
              flex flex-col
              items-center
              text-center
              snap-center
              shadow-[0_10px_30px_rgba(0,0,0,0.8)]
              hover:border-[#ffd700]
              hover:shadow-[0_0_30px_#d4a01725]
              transition-all
              duration-300
              group
            "
          >

            {/* IMAGE */}

            <div
              className="
                absolute
                -top-16
                left-1/2
                -translate-x-1/2
                w-32 h-32
                rounded-full
                flex items-center
                justify-center
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  blur-md
                  opacity-70
                  group-hover:opacity-100
                  transition-opacity
                "
                style={{
                  backgroundColor:
                    planet.ringColor,
                }}
              />


              <div
                className="
                  w-28 h-28
                  rounded-full
                  relative
                  overflow-hidden
                  transition-transform
                  duration-75
                  z-10
                  bg-black
                "
                style={{
                  transform:
                    `rotate(${scrollAngle}deg)`,
                }}
              >

                <img
                  src={planet.image}
                  alt={planet.name}
                  className="
                    w-full h-full
                    object-cover
                    rounded-full
                  "
                />


                <div
                  className="
                    absolute inset-0
                    rounded-full
                    pointer-events-none
                    bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_45%)]
                  "
                />


                <div
                  className="
                    absolute inset-0
                    rounded-full
                    pointer-events-none
                  "
                  style={{
                    boxShadow:
                      `inset -12px -10px 20px ${planet.ringColor},
                       inset 8px 8px 15px rgba(255,255,255,0.12)`,
                  }}
                />

              </div>


              <div
                className="
                  absolute
                  w-36 h-10
                  border-2
                  rounded-full
                  transform
                  -rotate-12
                  pointer-events-none
                  z-20
                "
                style={{
                  borderColor:
                    planet.ringColor,
                }}
              />

            </div>


            {/* PLANET INFO */}

            <div
              className="
                mt-4
                flex flex-col
                items-center
                gap-2
              "
            >

              <span
                className="
                  text-[10px]
                  tracking-[0.25em]
                  text-[#ffd700]
                  uppercase
                  font-semibold
                  px-2.5 py-0.5
                  rounded-full
                  border border-[#d4a01740]
                  bg-[#d4a01710]
                "
              >
                {planet.type}
              </span>


              <h3
                className="
                  font-display
                  text-3xl
                  tracking-wider
                  text-white
                  group-hover:text-[#ffd700]
                  transition-colors
                "
              >
                {planet.name}
              </h3>


              <p
                className="
                  text-xs
                  text-gray-400
                  font-body
                  px-2
                  mb-2
                  line-clamp-2
                "
              >
                {planet.desc}
              </p>


              <div
                className="
                  text-xs
                  font-medium
                  text-gray-300
                  bg-[#111]
                  px-4 py-1.5
                  rounded-full
                  border border-gray-800
                "
              >

                Distance from Earth:{' '}

                <span
                  className="
                    text-[#00d2ff]
                    font-semibold
                  "
                >
                  {planet.distance} lightyears
                </span>

              </div>

            </div>


            {/* VIEW PLANET */}

            <button
              type="button"
              onClick={(e) => {

                const r =
                  e.currentTarget.getBoundingClientRect();

                fireShot(
                  r.left + r.width / 2,
                  r.top + r.height / 2,
                  2
                );

                onPlanetSelect(planet);

              }}
              className="
                mt-6
                w-full
                py-2.5
                rounded-full
                font-display
                tracking-[0.14em]
                text-sm
                text-[#ffd700]
                border border-[#d4a017]
                bg-transparent
                flex items-center
                justify-center
                gap-2
                transition-all
                duration-200
                hover:bg-[#d4a01720]
                hover:shadow-[0_0_16px_#ffd70040]
                active:scale-95
              "
            >

              VIEW PLANET

              <ChevronRight
                className="w-4 h-4"
              />

            </button>

          </div>

        ))}

      </div>

    </section>
  );
}


/* ============================================================
   TRIVIA SECTION
   ============================================================ */

function TriviaSection({ fireShot }) {

  return (

    <section
      id="trivia"
      className="
        py-20
        px-4 sm:px-6 lg:px-8
        max-w-7xl mx-auto
        border-t border-[#d4a01725]
      "
    >

      <div className="flex justify-center mb-4">

        <div
          className="
            w-14 h-14
            rounded-full
            border-2 border-[#d4a017]
            bg-[#d4a01715]
            flex items-center
            justify-center
          "
        >

          <HeroMaskIcon
            className="
              w-8 h-8
              text-[#ffd700]
            "
          />

        </div>

      </div>


      <div
        className="
          flex flex-col
          items-center text-center
          mb-14
        "
      >

        <h2
          className="
            font-display
            text-4xl sm:text-6xl
            tracking-[0.1em]
            text-white
          "
        >
          EXPLORE TRIVIA
        </h2>


        <p
          className="
            text-sm
            text-gray-400
            max-w-md
            font-body
            mt-2
          "
        >
          Dive into cosmic phenomena,
          propulsion physics, and galactic mysteries.
        </p>


        <div
          className="
            h-0.5 w-32
            bg-gradient-to-r
            from-transparent
            via-[#e62429]
            to-transparent
            mt-4
            opacity-60
          "
        />

      </div>


      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        "
      >

        {TRIVIA_DATA.map((item) => {

          const IconComp = item.icon;

          return (

            <div
              key={item.id}
              className="
                relative
                rounded-2xl
                bg-[#0d0d0d]
                border border-[#d4a01740]
                p-6
                flex flex-col
                gap-4
                overflow-hidden
                shadow-[0_10px_30px_rgba(0,0,0,0.8)]
                hover:border-[#ffd700]
                transition-all
                duration-300
                group
              "
            >

              <div
                className={`
                  absolute
                  top-0 right-0
                  w-32 h-32
                  rounded-full
                  bg-gradient-to-br
                  ${item.gradient}
                  blur-2xl
                  pointer-events-none
                  opacity-50
                `}
              />


              <div
                className="
                  flex items-center
                  justify-between
                  z-10
                "
              >

                <span
                  className="
                    text-[10px]
                    tracking-widest
                    uppercase
                    font-semibold
                    text-[#ffd700]
                    px-3 py-1
                    rounded-full
                    border border-[#d4a01740]
                    bg-[#d4a01710]
                  "
                >
                  {item.badge}
                </span>


                <div
                  className="
                    w-10 h-10
                    rounded-full
                    border border-[#d4a01750]
                    bg-[#111]
                    flex items-center
                    justify-center
                  "
                >

                  <IconComp
                    className="
                      w-5 h-5
                      text-[#e62429]
                    "
                  />

                </div>

              </div>


              <div
                className="
                  w-full h-40
                  rounded-xl
                  bg-gradient-to-br
                  from-[#1a0a0a]
                  via-[#0a0a18]
                  to-[#0d0d0d]
                  border border-[#d4a01730]
                  flex flex-col
                  items-center
                  justify-center
                  p-4
                  relative
                  overflow-hidden
                "
              >

                <IconComp
                  className="
                    w-12 h-12
                    text-[#ffd700]
                    opacity-40
                    mb-2
                  "
                />


                <span
                  className="
                    text-xs
                    font-display
                    tracking-widest
                    text-[#ffd700]
                    opacity-70
                  "
                >
                  {item.title} GRAPHIC
                </span>


                <div
                  className="
                    absolute top-2 left-2
                    w-3 h-3
                    border-t
                    border-l
                    border-[#d4a017]
                  "
                />


                <div
                  className="
                    absolute bottom-2 right-2
                    w-3 h-3
                    border-b
                    border-r
                    border-[#d4a017]
                  "
                />

              </div>


              <div
                className="
                  z-10
                  flex flex-col gap-1
                "
              >

                <h3
                  className="
                    font-display
                    text-2xl
                    tracking-wider
                    text-white
                    group-hover:text-[#ffd700]
                  "
                >
                  {item.title}
                </h3>


                <span
                  className="
                    text-xs
                    font-medium
                    text-[#00d2ff]
                  "
                >
                  {item.subtitle}
                </span>


                <p
                  className="
                    text-xs
                    text-gray-400
                    font-body
                    leading-relaxed
                    mt-1
                  "
                >
                  {item.desc}
                </p>

              </div>


              <button
                type="button"
                onClick={(e) => {

                  const r =
                    e.currentTarget.getBoundingClientRect();

                  fireShot(
                    r.left + r.width / 2,
                    r.top + r.height / 2,
                    2
                  );

                }}
                className="
                  mt-2
                  text-xs
                  font-semibold
                  text-[#ffd700]
                  hover:text-white
                  flex items-center
                  gap-1.5
                "
              >
                READ FULL ARTICLE →
              </button>

            </div>

          );

        })}

      </div>

    </section>
  );
}


/* ============================================================
   NEWSLETTER
   ============================================================ */

function NewsletterSection({ fireShot }) {

  const [email, setEmail] =
    useState('');

  const [subscribed, setSubscribed] =
    useState(false);


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!email) return;


    const btn =
      e.target.querySelector(
        'button[type="submit"]'
      );


    if (btn) {

      const r =
        btn.getBoundingClientRect();

      fireShot(
        r.left + r.width / 2,
        r.top + r.height / 2,
        3
      );

    }


    console.log(
      'Newsletter subscription email:',
      email
    );


    setSubscribed(true);

    setEmail('');


    setTimeout(() => {
      setSubscribed(false);
    }, 5000);

  };


  return (

    <section
      id="newsletter"
      className="
        py-20
        px-4 sm:px-6 lg:px-8
        max-w-4xl mx-auto
        border-t border-[#d4a01725]
        text-center
      "
    >

      <div className="flex justify-center mb-4">

        <div
          className="
            w-16 h-16
            rounded-full
            border-2 border-[#d4a017]
            bg-[#d4a01710]
            flex items-center
            justify-center
          "
        >

          <LineAstronaut
            className="w-10 h-10"
          />

        </div>

      </div>


      <h2
        className="
          font-display
          text-4xl sm:text-5xl
          tracking-[0.08em]
          text-white
          mb-2
        "
      >
        GET OUR LATEST NEWS
      </h2>


      <p
        className="
          text-sm
          text-gray-400
          font-body
          max-w-md
          mx-auto
          mb-8
        "
      >
        Subscribe to receive astronomical updates,
        exoplanet discoveries, and cosmic research
        direct to your inbox.
      </p>


      <form
        onSubmit={handleSubmit}
        className="
          flex flex-col
          sm:flex-row
          items-center
          gap-3
          max-w-lg
          mx-auto
        "
      >

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="
            w-full
            px-6 py-3.5
            rounded-full
            bg-[#111111]
            text-white
            placeholder-gray-500
            border border-[#d4a01750]
            text-sm
            font-body
            outline-none
            focus:border-[#e62429]
          "
        />


        <button
          type="submit"
          className="
            w-full sm:w-auto
            px-8 py-3.5
            rounded-full
            font-display
            tracking-[0.16em]
            text-lg
            text-white
            bg-gradient-to-r
            from-[#e62429]
            via-[#c41d22]
            to-[#1a4bb8]
            border border-[#e6242960]
            shrink-0
            transition-all
            hover:scale-105
            active:scale-95
            flex items-center
            justify-center
            gap-2
          "
        >
          SUBMIT

          <Send className="w-4 h-4" />

        </button>

      </form>


      {subscribed && (

        <div
          className="
            mt-4
            p-3
            rounded-full
            bg-[#10b98120]
            border border-[#10b981]
            text-[#10b981]
            text-xs
            font-semibold
            tracking-wider
          "
        >
          ✦ Subscribed!
          Welcome aboard, cosmic traveler!
        </div>

      )}

    </section>
  );
}


/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {

  return (

    <footer
      className="
        bg-[#070707]
        border-t border-[#d4a01735]
        pt-16 pb-12
        px-4 sm:px-6 lg:px-8
        text-gray-400
        font-body
      "
    >

      <div
        className="
          max-w-7xl mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
          mb-12
        "
      >

        {/* LEFT */}

        <div
          className="
            flex flex-col
            gap-6
            items-start
          "
        >

          <div
            className="
              flex items-center
              gap-3
            "
          >

            <div
              className="
                w-10 h-10
                rounded-full
                border-2
                border-[#d4a017]
                bg-[#d4a01715]
                flex items-center
                justify-center
              "
            >

              <StarIcon
                className="
                  w-5 h-5
                  text-[#ffd700]
                "
              />

            </div>


            <span
              className="
                font-display
                text-3xl
                tracking-[0.1em]
                text-white
              "
            >
              AKASH

              <span className="text-[#d4a017]">
                GANGA
              </span>

            </span>

          </div>


          <p
            className="
              text-xs
              text-[#d4a01790]
              italic
              tracking-widest
              font-medium
            "
          >
            "Connecting the dots of the universe"
          </p>


          <div
            className="
              flex flex-col
              gap-2
              border-l-2
              border-[#d4a01740]
              pl-4
              my-2
            "
          >

            <span
              className="
                text-xs
                font-semibold
                text-white
                uppercase
                tracking-wider
                mb-1
              "
            >
              Navigation
            </span>


            <a
              href="#home"
              className="
                text-xs
                hover:text-[#ffd700]
              "
            >
              — Home
            </a>


            <a
              href="#exoplanets"
              className="
                text-xs
                hover:text-[#ffd700]
              "
            >
              — Exoplanets
            </a>


            <a
              href="#trivia"
              className="
                text-xs
                hover:text-[#ffd700]
              "
            >
              — Exploration & Trivia
            </a>


            <a
              href="#newsletter"
              className="
                text-xs
                hover:text-[#ffd700]
              "
            >
              — Latest Facts & News
            </a>

          </div>


          <button
            type="button"
            className="
              px-6 py-2.5
              rounded-full
              font-display
              tracking-[0.14em]
              text-sm
              text-[#ffd700]
              border border-[#d4a017]
              bg-[#d4a01710]
              hover:bg-[#d4a01725]
              transition-all
            "
          >
            DOWNLOAD APP
          </button>


          <div
            className="
              mt-4
              p-4
              rounded-xl
              border border-[#d4a01730]
              bg-[#0d0d0d]
              flex items-center
              gap-4
              overflow-hidden
            "
          >

            <img
              src={spidermanImage}
              alt="Spider-Man"
              className="
                w-[180px]
                h-[180px]
                object-contain
                shrink-0
              "
            />


            <div
              className="
                flex flex-col
                gap-1
              "
            >

              <span
                className="
                  text-[10px]
                  tracking-widest
                  uppercase
                  font-display
                  text-[#ffd700]
                "
              >
                HERO ILLUSTRATION
              </span>


              <p
                className="
                  text-[11px]
                  text-gray-400
                "
              >
                Cosmic web-slinger
                illustration.
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT */}

        <div
          className="
            flex flex-col
            items-center
            lg:items-end
            justify-center
          "
        >

          <div
            className="
              relative
              w-44 h-44
              sm:w-52 sm:h-52
              rounded-full
              border-2
              border-[#d4a01750]
              bg-gradient-to-br
              from-[#1a4bb820]
              via-[#0d0d0d]
              to-[#e6242920]
              flex items-center
              justify-center
            "
          >

            <div
              className="
                absolute
                inset-2
                rounded-full
                border
                border-[#d4a01730]
                border-dashed
                animate-spinSlow
              "
            />


            <div
              className="
                absolute
                -inset-4
                rounded-full
                border
                border-[#1a4bb840]
                transform rotate-45
                pointer-events-none
              "
            />


            <Globe
              className="
                w-24 h-24
                text-[#ffd700]
                drop-shadow-[0_0_12px_#ffd70060]
              "
            />

          </div>


          <span
            className="
              text-[10px]
              tracking-[0.25em]
              text-[#d4a01780]
              font-display
              mt-4
            "
          >
            ORBITAL SATELLITE NETWORK
          </span>

        </div>

      </div>


      {/* BOTTOM */}

      <div
        className="
          max-w-7xl mx-auto
          pt-8
          border-t border-gray-800
          flex flex-col
          sm:flex-row
          items-center
          justify-between
          gap-4
        "
      >

        <div
          className="
            flex items-center
            gap-6
            text-xs
            text-gray-400
          "
        >

          <a
            href="#home"
            className="hover:text-[#ffd700]"
          >
            Home
          </a>


          <a
            href="#exoplanets"
            className="hover:text-[#ffd700]"
          >
            Exoplanets
          </a>


          <a
            href="#trivia"
            className="hover:text-[#ffd700]"
          >
            Facts
          </a>


          <Link
            to="/login"
            className="
              hover:text-[#ffd700]
              text-[#e62429]
            "
          >
            Login Portal
          </Link>

        </div>


        <div
          className="
            flex items-center
            gap-4
            text-[#ffd700]
          "
        >

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="
              p-2
              rounded-full
              border border-[#d4a01740]
              hover:border-[#ffd700]
              transition-colors
            "
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>


          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="
              p-2
              rounded-full
              border border-[#d4a01740]
              hover:border-[#ffd700]
              transition-colors
            "
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>


          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="
              p-2
              rounded-full
              border border-[#d4a01740]
              hover:border-[#ffd700]
              transition-colors
            "
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>


          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="
              p-2
              rounded-full
              border border-[#d4a01740]
              hover:border-[#ffd700]
              transition-colors
            "
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>

        </div>


        <div
          className="
            text-xs
            text-gray-500
          "
        >
          © 2026 Akashganga.
          All rights reserved.
        </div>

      </div>

    </footer>
  );
}


/* ============================================================
   HOME PAGE
   ============================================================ */

export default function HomePage() {

  useStarfield();

  useWebCursor();


  const { fireShot } =
    useWebShooter();


  const [selectedPlanet, setSelectedPlanet] =
    useState(null);


  return (
    <>

      {/* CANVAS EFFECTS */}

      <canvas
        id="star-canvas"
        aria-hidden="true"
      />

      <canvas
        id="particle-canvas"
        aria-hidden="true"
      />

      <canvas
        id="shooter-canvas"
        aria-hidden="true"
      />

      <canvas
        id="cursor-canvas"
        aria-hidden="true"
      />


      {/* PAGE */}

      <div
        className="
          min-h-screen
          bg-[#0a0a0a]
          text-gray-100
          relative z-10
          selection:bg-[#e62429]
          selection:text-white
        "
      >

        <Navbar />


        <main>

          <HeroSection />


          <ExoplanetsCarousel
            fireShot={fireShot}
            onPlanetSelect={setSelectedPlanet}
          />


          <TriviaSection
            fireShot={fireShot}
          />


          <NewsletterSection
            fireShot={fireShot}
          />

        </main>


        <Footer />

      </div>


      {/* =====================================================
          3D PLANET VIEW
          ===================================================== */}

      {selectedPlanet && (

        <PlanetViewer
          planet={selectedPlanet}
          onClose={() =>
            setSelectedPlanet(null)
          }
        />

      )}

    </>
  );
}