import React, { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';
import { ArrowLeft } from 'lucide-react';

/* ============================================================
   PLANET DATA
   ============================================================ */

const PLANETS = {
  'kepler-22b': {
    name: 'Kepler-22B',
    type: 'Super-Earth',
    distance: '635 lightyears',
    description:
      'Kepler-22B is a super-Earth exoplanet located in the habitable zone of its Sun-like star. It was one of the first planets discovered in the habitable zone of a Sun-like star.',
    model: '/models/kepler-22b.glb',
  },

  'lhs-1140-b': {
    name: 'LHS-1140-B',
    type: 'Rocky World',
    distance: '48 lightyears',
    description:
      'LHS-1140-B is a dense rocky exoplanet located in the habitable zone of a red dwarf star. Its characteristics make it an interesting target for studying potentially habitable worlds.',
    model: '/models/lhs-1140-b.glb',
  },

  'wasp-12b': {
    name: 'WASP-12B',
    type: 'Hot Jupiter',
    distance: '1,410 lightyears',
    description:
      'WASP-12B is an extremely hot gas giant orbiting very close to its host star. The intense gravitational forces of its star are causing the planet to become distorted.',
    model: '/models/wasp-12b.glb',
  },

  'proxima-centauri-b': {
    name: 'Proxima Centauri B',
    type: 'Terrestrial',
    distance: '4.24 lightyears',
    description:
      'Proxima Centauri B is one of the closest known exoplanets to our Solar System. It orbits Proxima Centauri, the nearest star to the Sun.',
    model: '/models/proxima-centauri-b.glb',
  },

  'trappist-1e': {
    name: 'TRAPPIST-1e',
    type: 'Earth-sized Habitable',
    distance: '40 lightyears',
    description:
      'TRAPPIST-1e is an Earth-sized exoplanet orbiting the ultra-cool dwarf star TRAPPIST-1. It is one of several rocky planets in this fascinating planetary system.',
    model: '/models/trappist-1e.glb',
  },
};


/* ============================================================
   3D PLANET MODEL
   ============================================================ */

function PlanetModel({ model }) {
  const { scene } = useGLTF(model);

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, 0, 0]}
    />
  );
}


/* ============================================================
   LOADING
   ============================================================ */

function LoadingPlanet() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-[#ffd700] font-display tracking-widest animate-pulse">
        LOADING PLANET...
      </div>
    </div>
  );
}


/* ============================================================
   PLANET PAGE
   ============================================================ */

export default function PlanetPage() {

  const { slug } = useParams();

  const planet = PLANETS[slug];


  /* ==========================================================
     INVALID PLANET
     ========================================================== */

  if (!planet) {
    return (
      <div className="
        min-h-screen
        bg-[#0a0a0a]
        text-white
        flex
        flex-col
        items-center
        justify-center
        gap-6
      ">

        <h1 className="
          font-display
          text-4xl
          text-[#ffd700]
        ">
          PLANET NOT FOUND
        </h1>

        <Link
          to="/"
          className="
            px-6
            py-3
            rounded-full
            border
            border-[#d4a017]
            text-[#ffd700]
            hover:bg-[#d4a01720]
          "
        >
          RETURN TO HOME
        </Link>

      </div>
    );
  }


  return (
    <div className="
      min-h-screen
      bg-[#0a0a0a]
      text-white
      relative
      overflow-hidden
    ">

      {/* ======================================================
          BACKGROUND STARS
          ====================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 45,
          }}
        >

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

        </Canvas>

      </div>


      {/* ======================================================
          HEADER
          ====================================================== */}

      <header className="
        relative
        z-20
        h-20
        border-b
        border-[#d4a01735]
        bg-[#0a0a0a]/80
        backdrop-blur-md
      ">

        <div className="
          max-w-7xl
          mx-auto
          h-full
          px-6
          flex
          items-center
          justify-between
        ">

          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
              text-[#ffd700]
              hover:text-white
              transition
            "
          >

            <ArrowLeft className="w-5 h-5" />

            <span className="
              font-display
              tracking-widest
            ">
              BACK TO EXOPLANETS
            </span>

          </Link>


          <div className="
            font-display
            text-xl
            tracking-[0.15em]
          ">

            AKASH
            <span className="text-[#d4a017]">
              GANGA
            </span>

          </div>

        </div>

      </header>


      {/* ======================================================
          MAIN
          ====================================================== */}

      <main className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        py-12
      ">

        {/* TITLE */}

        <div className="
          text-center
          mb-8
        ">

          <span className="
            inline-block
            px-4
            py-1.5
            rounded-full
            border
            border-[#d4a01750]
            bg-[#d4a01710]
            text-[#ffd700]
            text-xs
            tracking-widest
            uppercase
          ">
            {planet.type}
          </span>


          <h1 className="
            mt-4
            font-display
            text-5xl
            sm:text-7xl
            tracking-[0.1em]
            text-white
          ">
            {planet.name}
          </h1>


          <p className="
            mt-3
            text-[#00d2ff]
            text-sm
            tracking-widest
          ">
            {planet.distance} FROM EARTH
          </p>

        </div>


        {/* ==================================================
            3D MODEL
            ================================================== */}

        <div className="
          w-full
          h-[500px]
          rounded-3xl
          border
          border-[#d4a01750]
          bg-[#050505]
          overflow-hidden
          shadow-[0_0_50px_rgba(212,160,23,0.12)]
        ">

          <Canvas
            camera={{
              position: [0, 0, 6],
              fov: 45,
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

            </Suspense>


            <OrbitControls
              enablePan={false}
              minDistance={3}
              maxDistance={10}
              autoRotate
              autoRotateSpeed={1}
            />

          </Canvas>

          {/* Loading text */}

          <div className="
            absolute
            pointer-events-none
          ">
          </div>

        </div>


        {/* ==================================================
            DESCRIPTION
            ================================================== */}

        <div className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">


          {/* DESCRIPTION */}

          <div className="
            md:col-span-2
            p-6
            rounded-2xl
            border
            border-[#d4a01740]
            bg-[#0d0d0d]
          ">

            <h2 className="
              font-display
              text-2xl
              tracking-widest
              text-[#ffd700]
              mb-4
            ">
              ABOUT THIS WORLD
            </h2>

            <p className="
              text-gray-300
              leading-relaxed
              text-sm
            ">
              {planet.description}
            </p>

          </div>


          {/* PLANET INFORMATION */}

          <div className="
            p-6
            rounded-2xl
            border
            border-[#d4a01740]
            bg-[#0d0d0d]
          ">

            <h2 className="
              font-display
              text-2xl
              tracking-widest
              text-[#ffd700]
              mb-5
            ">
              PLANET DATA
            </h2>


            <div className="
              flex
              flex-col
              gap-4
            ">

              <div>

                <div className="
                  text-xs
                  text-gray-500
                  uppercase
                  tracking-widest
                ">
                  Planet
                </div>

                <div className="
                  text-white
                  mt-1
                ">
                  {planet.name}
                </div>

              </div>


              <div>

                <div className="
                  text-xs
                  text-gray-500
                  uppercase
                  tracking-widest
                ">
                  Classification
                </div>

                <div className="
                  text-[#00d2ff]
                  mt-1
                ">
                  {planet.type}
                </div>

              </div>


              <div>

                <div className="
                  text-xs
                  text-gray-500
                  uppercase
                  tracking-widest
                ">
                  Distance
                </div>

                <div className="
                  text-white
                  mt-1
                ">
                  {planet.distance}
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            BACK BUTTON
            ================================================== */}

        <div className="
          flex
          justify-center
          mt-10
        ">

          <Link
            to="/"
            className="
              px-8
              py-3
              rounded-full
              border-2
              border-[#d4a017]
              text-[#ffd700]
              font-display
              tracking-widest
              hover:bg-[#d4a01720]
              transition-all
              flex
              items-center
              gap-2
            "
          >

            <ArrowLeft className="w-4 h-4" />

            RETURN TO EXOPLANETS

          </Link>

        </div>

      </main>

    </div>
  );
}