import { useStatus } from '../StatusContext';

/** Spider Icon */
const SpiderIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
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

/** Web-Shooter Wrist Icon */
const WebGunIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
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

export default function StatusBadges({ fireShot }) {
  const { spiderSenseOn, setSpiderSenseOn, thwipOn, setThwipOn } = useStatus();

  const handleSpiderSenseClick = () => {
    setSpiderSenseOn(!spiderSenseOn);
  };

  const handleThwipClick = (e) => {
    const nextState = !thwipOn;
    setThwipOn(nextState);
    if (nextState && fireShot) {
      const r = e.currentTarget.getBoundingClientRect();
      fireShot(r.left + r.width / 2, r.top + r.height / 2, 2);
    }
  };

  return (
    <div className="
      fixed bottom-4 left-4
      flex flex-row items-center gap-3
      z-50
      bg-black/40 backdrop-blur-sm
      p-2 rounded-full
      border border-[#d4a01730]
      shadow-[0_4px_24px_rgba(0,0,0,0.6)]
    ">
      {/* ── Spider Sense Badge (Clickable Toggle) ── */}
      <button
        id="spidersense-badge-btn"
        type="button"
        onClick={handleSpiderSenseClick}
        aria-label={spiderSenseOn ? 'Spider Sense Engaged — click to disable' : 'Spider Sense Disabled — click to engage'}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full
          text-xs font-semibold tracking-wider transition-all duration-200 select-none cursor-pointer
          ${spiderSenseOn
            ? 'border border-[#d4a017] text-[#ffd700] bg-[#d4a01710] badge-pulse hover:bg-[#d4a01725] hover:shadow-[0_0_12px_#ffd70040]'
            : 'border border-[#444] text-[#666] bg-transparent hover:border-[#666] hover:text-gray-400'
          }
        `}
      >
        <SpiderIcon className={`w-3.5 h-3.5 ${spiderSenseOn ? 'text-[#ffd700]' : 'text-[#666]'}`} />
        {spiderSenseOn ? 'Spider Sense Engaged' : 'Spider Sense Disabled'}
      </button>

      {/* Separator dot */}
      <div className="w-1 h-1 rounded-full bg-[#d4a01750]" aria-hidden="true" />

      {/* ── Thwip Toggle Badge (Clickable Toggle) ── */}
      <button
        id="thwip-badge-btn"
        type="button"
        onClick={handleThwipClick}
        aria-label={thwipOn ? 'Thwip ON — click to turn off' : 'Thwip OFF — click to turn on'}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full
          text-xs font-semibold tracking-widest transition-all duration-200 select-none cursor-pointer
          ${thwipOn
            ? 'border border-[#1a4bb8] text-[#1a4bb8] bg-[#1a4bb812] thwip-active hover:bg-[#1a4bb825] hover:shadow-[0_0_10px_2px_#1a4bb848]'
            : 'border border-[#444] text-[#666] bg-transparent hover:border-[#666] hover:text-gray-400'
          }
        `}
      >
        <WebGunIcon className={`w-3.5 h-3.5 ${thwipOn ? 'text-[#1a4bb8]' : 'text-[#666]'}`} />
        Thwip: {thwipOn ? 'ON' : 'OFF'}
        <span className="ml-1 text-[10px] opacity-50" aria-hidden="true">⋮</span>
      </button>
    </div>
  );
}
