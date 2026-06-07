import React from 'react';
import { Waves, Cpu, Zap, Activity } from 'lucide-react';

export default function ResultDisplay({ dayaWatt, kategori }) {
  const dayaKW = (dayaWatt / 1000).toFixed(2);
  const formattedWatt = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(dayaWatt);

  return (
    <div className="bg-gradient-to-br from-cyan-900/80 to-blue-900/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] text-white relative overflow-hidden print:border-2 print:border-cyan-400">
      <Waves className="absolute -bottom-8 -right-8 w-48 h-48 text-cyan-400 opacity-10" />
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>

      <h2 className="text-lg font-medium text-cyan-100 mb-6 flex items-center gap-2 relative z-10">
        <Cpu className="text-cyan-300 w-5 h-5" />
        Estimasi Output Sistem
      </h2>

      <div className="space-y-6 relative z-10">
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 drop-shadow-sm">
              {dayaKW}
            </span>
            <span className="text-xl font-bold text-cyan-300">kW</span>
          </div>
          <p className="text-cyan-200/80 text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            Setara dengan {formattedWatt} Watt
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-cyan-500/50 to-transparent"></div>

        <div className="flex items-center gap-4">
          <div className="bg-cyan-950/50 p-3 rounded-2xl border border-cyan-500/20">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-cyan-200/60 text-xs font-semibold uppercase tracking-wider mb-1">Kategori Skala</p>
            <p className="text-lg font-bold text-white tracking-wide">{kategori}</p>
          </div>
        </div>
      </div>
    </div>
  );
}