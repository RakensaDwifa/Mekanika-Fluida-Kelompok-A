import React, { useState } from 'react';
import { Waves, Info } from 'lucide-react';

export default function HydroVisualizer({ debit, setDebit, head, setHead, dayaWatt }) {
  const [hoveredPart, setHoveredPart] = useState(null);

  const isRunning = dayaWatt > 0 && debit > 0 && head > 0;
  const dayaKW = dayaWatt / 1000;
  const turbineDuration = isRunning ? Math.max(0.1, 4 - Math.log10(dayaKW + 1)) : 0; 
  const waterVelocity = Math.sqrt(2 * 9.81 * (parseFloat(head) || 0));
  const waterDuration = isRunning ? Math.max(0.2, 10 / (waterVelocity || 1)) : 0;

  const visualHead = Math.min(Math.max(parseFloat(head) || 0, 0), 100); 
  const waterHeight = (visualHead / 100) * 100; 
  const waterY = 150 - waterHeight;
  const valveRotation = (parseFloat(debit) || 0) * 36; 

  const handleControl = (type, action) => {
    if (type === 'head') {
      const current = parseFloat(head) || 0;
      setHead(action === 'add' ? current + 5 : Math.max(0, current - 5));
    } else if (type === 'debit') {
      const current = parseFloat(debit) || 0;
      const newVal = action === 'add' ? current + 0.5 : Math.max(0, current - 0.5);
      setDebit(parseFloat(newVal.toFixed(1)));
    }
  };

  const tooltips = {
    reservoir: "RESERVOIR (WADUK)\nMenyimpan energi potensial air. Ketinggian (Head) saat ini: " + head + "m",
    penstock: "PENSTOCK (PIPA PESAT)\nMengalirkan air ke turbin. Debit: " + debit + " m³/s",
    turbine: "TURBIN AIR\nMengubah energi kinetik air menjadi rotasi mekanis.",
    generator: "GENERATOR\nMengubah rotasi menjadi listrik. Output: " + dayaKW.toFixed(1) + " kW"
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl h-full min-h-[450px] flex flex-col relative overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <Waves className="text-cyan-400 w-6 h-6" />
            </div>
            Interactive Visualizer
          </h2>
          <p className="text-sm text-slate-400 mt-2 print:hidden">Arahkan kursor ke komponen atau klik tombol <span className="text-cyan-400 font-bold border border-cyan-400/50 px-1 rounded">+/-</span> di diagram.</p>
        </div>
        
        <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-xs font-bold tracking-wider ${isRunning ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-500'} shadow-[0_0_15px_rgba(34,211,238,0.2)]`}>
          <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`}></div>
          {isRunning ? 'SISTEM AKTIF' : 'STANDBY'}
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-slate-950/60 rounded-2xl border border-white/5 p-4 overflow-hidden relative shadow-inner">
        
        {hoveredPart && (
          <div className="absolute top-4 left-4 right-4 bg-slate-800/90 backdrop-blur-md border border-cyan-500/30 p-3 rounded-xl text-cyan-50 text-sm whitespace-pre-line z-10 shadow-lg pointer-events-none animate-in fade-in slide-in-from-top-2 print:hidden">
            <span className="flex items-center gap-2 font-bold text-cyan-400 mb-1">
              <Info className="w-4 h-4" /> INFO SISTEM
            </span>
            {tooltips[hoveredPart]}
          </div>
        )}

        <style>
          {`
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes flow { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }
            @keyframes energyPulse { 0% { opacity: 0.5; filter: brightness(1); } 50% { opacity: 1; filter: brightness(1.5); } 100% { opacity: 0.5; filter: brightness(1); } }
            .neon-glow { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.6)); }
            .interactive-btn { cursor: pointer; transition: all 0.2s; }
            .interactive-btn:hover { filter: brightness(1.5) drop-shadow(0 0 5px rgba(34,211,238,0.8)); }
            .interactive-btn:active { transform: scale(0.95); }
          `}
        </style>

        <svg viewBox="-20 -20 520 440" className="w-full h-full max-w-lg">
          <defs>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="glowGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
            </pattern>
          </defs>

          <rect width="540" height="460" fill="url(#grid)" x="-20" y="-20" />
          <path d="M -20 250 L 520 250 L 520 440 L -20 440 Z" fill="rgba(15, 23, 42, 0.6)" stroke="#1e293b" strokeWidth="2" />
          
          <g onMouseEnter={() => setHoveredPart('reservoir')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
            <path d="M 0 50 L 150 50 L 150 150 L 0 150 Z" fill="rgba(14, 165, 233, 0.05)" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
            <rect x="0" y={waterY} width="150" height={waterHeight} fill="url(#waterGrad)" className="transition-all duration-500 ease-out" />
            <path d={`M 0 ${waterY} Q 75 ${waterY - 5} 150 ${waterY} L 150 ${waterY + 5} L 0 ${waterY + 5} Z`} fill="#67e8f9" opacity="0.5" className="transition-all duration-500 ease-out" />
            <text x="15" y="140" fill="rgba(14, 165, 233, 0.6)" fontSize="14" fontWeight="900" letterSpacing="4">RESERVOIR</text>
            <line x1="10" y1="50" x2="15" y2="50" stroke="#475569" strokeWidth="2" />
            <text x="20" y="54" fill="#64748b" fontSize="10">100m</text>
            <line x1="10" y1="100" x2="15" y2="100" stroke="#475569" strokeWidth="2" />
            <text x="20" y="104" fill="#64748b" fontSize="10">50m</text>
          </g>
          
          <g transform="translate(30, 0)">
            <rect x="0" y="0" width="90" height="26" rx="13" fill="#0f172a" stroke="#22d3ee" strokeWidth="1" />
            <g className="interactive-btn print:hidden" onClick={() => handleControl('head', 'sub')}>
              <circle cx="14" cy="13" r="10" fill="#1e293b" />
              <line x1="10" y1="13" x2="18" y2="13" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            </g>
            <text x="45" y="17" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">HEAD</text>
            <g className="interactive-btn print:hidden" onClick={() => handleControl('head', 'add')}>
              <circle cx="76" cy="13" r="10" fill="#1e293b" />
              <line x1="72" y1="13" x2="80" y2="13" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
              <line x1="76" y1="9" x2="76" y2="17" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          <rect x="150" y="50" width="18" height="200" fill="#334155" rx="3" stroke="#475569" strokeWidth="2" />
          
          <g onMouseEnter={() => setHoveredPart('penstock')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
            <path d="M 168 130 L 350 330" stroke="#0f172a" strokeWidth="32" strokeLinecap="round" fill="none" />
            <path d="M 168 130 L 350 330" stroke="#1e293b" strokeWidth="24" strokeLinecap="round" fill="none" />
            <path 
              d="M 170 130 L 350 330" stroke="#22d3ee" strokeWidth="10" strokeLinecap="round" fill="none" strokeDasharray="15 25" className={isRunning ? 'neon-glow' : ''}
              style={{ animation: isRunning ? `flow ${waterDuration}s linear infinite` : 'none', opacity: isRunning ? 1 : 0.1 }}
            />
          </g>

          <g transform="translate(240, 209)">
            <rect x="-12" y="-18" width="24" height="36" fill="#334155" stroke="#475569" strokeWidth="2" transform="rotate(-48)" />
            <g style={{ transform: `rotate(${valveRotation}deg)`, transformOrigin: '0px 0px', transition: 'transform 0.5s ease-out' }}>
              <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#ef4444" strokeWidth="4" />
              <line x1="-16" y1="0" x2="16" y2="0" stroke="#ef4444" strokeWidth="4" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="#ef4444" strokeWidth="4" />
              <circle cx="0" cy="0" r="5" fill="#fca5a5" />
            </g>
          </g>

          <g transform="translate(130, 196)">
            <rect x="0" y="0" width="90" height="26" rx="13" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
            <g className="interactive-btn print:hidden" onClick={() => handleControl('debit', 'sub')}>
              <circle cx="14" cy="13" r="10" fill="#1e293b" />
              <line x1="10" y1="13" x2="18" y2="13" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </g>
            <text x="45" y="17" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">DEBIT</text>
            <g className="interactive-btn print:hidden" onClick={() => handleControl('debit', 'add')}>
              <circle cx="76" cy="13" r="10" fill="#1e293b" />
              <line x1="72" y1="13" x2="80" y2="13" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="76" y1="9" x2="76" y2="17" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>

          <rect x="310" y="295" width="140" height="100" fill="rgba(30, 41, 59, 0.85)" rx="16" stroke="#334155" strokeWidth="2" />
          
          <path d="M 450 360 L 520 360 L 520 440 L 310 440 Z" fill="rgba(14, 165, 233, 0.08)" />
          <path 
            d="M 450 375 L 520 375 M 420 390 L 520 390 M 440 405 L 520 405" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 12" className={isRunning ? 'neon-glow' : ''}
            style={{ animation: isRunning ? `flow ${waterDuration * 1.5}s linear infinite` : 'none', opacity: isRunning ? 0.5 : 0.1 }}
          />

          <g onMouseEnter={() => setHoveredPart('turbine')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help" style={{ transformOrigin: '380px 355px', animation: isRunning ? `spin ${turbineDuration}s linear infinite` : 'none' }}>
            <circle cx="380" cy="355" r="36" fill="#0f172a" stroke="#475569" strokeWidth="4" />
            <circle cx="380" cy="355" r="12" fill="#22d3ee" className={isRunning ? 'neon-glow' : ''} />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} style={{ transform: `rotate(${angle}deg)`, transformOrigin: '380px 355px' }}>
                <path d="M 380 319 L 380 343" stroke={isRunning ? "#22d3ee" : "#64748b"} strokeWidth="5" strokeLinecap="round" />
              </g>
            ))}
          </g>

          <g onMouseEnter={() => setHoveredPart('generator')} onMouseLeave={() => setHoveredPart(null)} className="cursor-help">
            <path d="M 380 295 L 380 355" stroke="#64748b" strokeWidth="8" />
            <rect x="350" y="235" width="60" height="60" fill="url(#glowGrad)" rx="10" stroke={isRunning ? "#6ee7b7" : "#475569"} strokeWidth="3" className={isRunning ? 'neon-glow' : ''} style={{ animation: isRunning ? 'energyPulse 2s infinite' : 'none' }} />
            <rect x="355" y="240" width="50" height="50" fill="#0f172a" rx="6" />
            <path d="M 382 248 L 372 263 L 380 263 L 378 278 L 388 260 L 378 260 Z" fill={isRunning ? "#34d399" : "#475569"} className={isRunning ? 'neon-glow' : ''} />
            {isRunning && (
              <g>
                <circle cx="380" cy="235" r="15" fill="none" stroke="#34d399" strokeWidth="2" className="animate-ping" opacity="0.5" />
                <circle cx="380" cy="235" r="25" fill="none" stroke="#34d399" strokeWidth="1" className="animate-ping" opacity="0.3" style={{ animationDelay: '0.2s' }} />
              </g>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}