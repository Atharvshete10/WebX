/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────
 * Application Router Shell.
 * Routes:
 *  - "/"                    => HomePage
 *  - "/login"               => LoginPage
 *  - "/planet/:planetName"  => Stub Planet Detail Page
 * ─────────────────────────────────────────────────────────────
 */
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import HomePage  from './HomePage';
import LoginPage from './LoginPage';
import { ArrowLeft, Globe } from 'lucide-react';
import { useStarfield } from './hooks/useStarfield';
import { useWebCursor } from './hooks/useWebCursor';
import { StatusProvider } from './StatusContext';
import StatusBadges from './components/StatusBadges';
import PlanetPage from './PlanetPage';

/** Stub Planet Detail Component for /planet/:planetName */
function PlanetDetailPage() {
  useStarfield();
  useWebCursor();
  const { planetName } = useParams();
  const formattedName = planetName ? planetName.toUpperCase() : 'UNKNOWN PLANET';

  return (
    <>
      <canvas id="star-canvas"     aria-hidden="true" />
      <canvas id="particle-canvas" aria-hidden="true" />
      <canvas id="shooter-canvas"  aria-hidden="true" />
      <canvas id="cursor-canvas"   aria-hidden="true" />

      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative z-10 text-center">
        <div className="max-w-md w-full p-8 rounded-2xl bg-[#0d0d0d] border border-[#d4a017] shadow-[0_0_40px_#d4a01725] flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full border-2 border-[#ffd700] bg-gradient-to-br from-[#e62429] via-[#1a4bb8] to-[#ffd700] flex items-center justify-center shadow-[0_0_20px_#ffd70050] animate-pulse">
            <Globe className="w-10 h-10 text-white" />
          </div>

          <span className="text-xs font-semibold text-[#ffd700] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-[#d4a01740] bg-[#d4a01710]">
            Dedicated Planet Record
          </span>

          <h1 className="font-display text-4xl sm:text-5xl tracking-widest text-white">
            {formattedName}
          </h1>

          <p className="text-sm text-gray-400 font-body">
            {/* each planet gets its own dedicated page, to be built next */}
            Detailed atmospheric telemetry, orbit visualization, and surface composition data for <strong className="text-white">{formattedName}</strong> will be expanded in the next phase.
          </p>

          <Link
            to="/home"
            className="
              mt-2 px-6 py-3 rounded-full font-display tracking-widest text-sm text-[#ffd700]
              border border-[#d4a017] bg-[#d4a01715] hover:bg-[#d4a01730]
              flex items-center gap-2 transition-all hover:scale-105 active:scale-95
            "
          >
            <ArrowLeft className="w-4 h-4" />
            RETURN TO HOME
          </Link>
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <StatusProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                    element={<LoginPage />} />
          <Route path="/home"                element={<HomePage />} />
          <Route path="/login"               element={<LoginPage />} />
          <Route path="/planet/:slug" element={<PlanetPage />} />
          <Route path="/planet/:planetName"  element={<PlanetDetailPage />} />
        </Routes>
        {/* Site-wide persistent StatusBadges bar (Fixed bottom-left) */}
        <StatusBadges />
      </BrowserRouter>
    </StatusProvider>
  );
}
