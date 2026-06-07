import React from 'react';
import { Droplets, Settings, ArrowRight, ActivitySquare } from 'lucide-react';

export default function CalculatorForm({ debit, setDebit, head, setHead, efisiensi, setEfisiensi }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-all duration-500"></div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <Settings className="text-cyan-400 w-6 h-6" />
        </div>
        Parameter Input
      </h2>

      <div className="space-y-8">
        {/* Input Debit */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300 flex justify-between">
            <span>Debit Air (Q)</span>
            <span className="text-cyan-400/70 text-xs">m³/detik</span>
          </label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Droplets className="h-5 w-5 text-cyan-500 group-focus-within/input:text-cyan-300 transition-colors" />
            </div>
            <input
              type="number" min="0" step="0.1" value={debit} onChange={(e) => setDebit(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-white placeholder-slate-600 outline-none print:border-cyan-500/50"
              placeholder="0.0"
            />
          </div>
        </div>

        {/* Input Head */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300 flex justify-between">
            <span>Net Head (H)</span>
            <span className="text-emerald-400/70 text-xs">meter</span>
          </label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ArrowRight className="h-5 w-5 text-emerald-500 transform rotate-90 group-focus-within/input:text-emerald-300 transition-colors" />
            </div>
            <input
              type="number" min="0" step="1" value={head} onChange={(e) => setHead(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-white placeholder-slate-600 outline-none print:border-emerald-500/50"
              placeholder="0"
            />
          </div>
        </div>

        {/* Input Efisiensi */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-300 flex justify-between">
            <span>Efisiensi Sistem (η)</span>
            <span className="text-amber-400/70 text-xs">%</span>
          </label>
          <div className="relative group/input">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ActivitySquare className="h-5 w-5 text-amber-500 group-focus-within/input:text-amber-300 transition-colors" />
            </div>
            <input
              type="number" min="0" max="100" step="1" value={efisiensi} onChange={(e) => setEfisiensi(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950/50 border border-white/10 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-white placeholder-slate-600 outline-none print:border-amber-500/50"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}