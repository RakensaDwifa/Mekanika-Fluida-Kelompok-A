import React from 'react';
import { LineChart } from 'lucide-react';

export default function PowerGraph({ debit, head, efisiensi, dayaWatt }) {
  const width = 600;
  const height = 350;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const currentQ = parseFloat(debit) || 0;
  const currentH = parseFloat(head) || 0;
  const eta = (parseFloat(efisiensi) || 0) / 100;
  const currentKw = dayaWatt / 1000;
  
  const maxQ = Math.max(10, Math.ceil(currentQ * 1.5));
  const maxP = (1000 * 9.81 * maxQ * currentH * eta) / 1000;
  const roundedMaxP = maxP > 0 ? Math.ceil(maxP / 10) * 10 : 100;

  const scaleX = (q) => padding.left + (q / maxQ) * innerWidth;
  const scaleY = (p) => padding.top + innerHeight - (p / roundedMaxP) * innerHeight;

  const points = [];
  for(let q = 0; q <= maxQ; q += (maxQ/20)) {
     const p = (1000 * 9.81 * q * currentH * eta) / 1000;
     points.push(`${scaleX(q)},${scaleY(p)}`);
  }

  const currentX = scaleX(currentQ);
  const currentY = scaleY(currentKw);

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group h-full">
      <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <LineChart className="text-emerald-400 w-6 h-6" />
        </div>
        Grafik Korelasi Daya (Linear)
      </h2>
      <p className="text-sm text-slate-400 mb-8">
        Proyeksi kenaikan Daya (kW) terhadap Debit Air (Q) dengan asumsi Ketinggian (H) dikunci di <strong className="text-emerald-400">{currentH} meter</strong>.
      </p>
        
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[450px] h-auto drop-shadow-lg font-sans">
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const yPos = scaleY(roundedMaxP * ratio);
            return <line key={`grid-y-${ratio}`} x1={padding.left} y1={yPos} x2={padding.left + innerWidth} y2={yPos} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
          })}
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map(ratio => {
            const xPos = scaleX(maxQ * ratio);
            return <line key={`grid-x-${ratio}`} x1={xPos} y1={padding.top} x2={xPos} y2={padding.top + innerHeight} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
          })}

          <line x1={padding.left} y1={padding.top + innerHeight} x2={padding.left + innerWidth} y2={padding.top + innerHeight} stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + innerHeight} stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const yVal = roundedMaxP * ratio;
            return (
              <text key={`label-y-${ratio}`} x={padding.left - 15} y={scaleY(yVal) + 4} fill="#94a3b8" fontSize="12" textAnchor="end">
                {yVal.toFixed(0)} kW
              </text>
            );
          })}

          {[0, 0.2, 0.4, 0.6, 0.8, 1].map(ratio => {
            const xVal = maxQ * ratio;
            const xPos = scaleX(xVal);
            return (
              <g key={`label-x-${ratio}`}>
                <line x1={xPos} y1={padding.top + innerHeight} x2={xPos} y2={padding.top + innerHeight + 6} stroke="#64748b" strokeWidth="2" />
                <text x={xPos} y={padding.top + innerHeight + 22} fill="#94a3b8" fontSize="12" textAnchor="middle">{xVal.toFixed(1)}</text>
              </g>
            );
          })}
          <text x={padding.left + (innerWidth / 2)} y={height - 5} fill="#cbd5e1" fontSize="13" textAnchor="middle" fontWeight="600">
            Debit Air (m³/detik)
          </text>
          
          <path d={`M ${points.join(' L ')}`} fill="none" stroke="#10b981" strokeWidth="3" style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))' }} />
          
          {currentKw > 0 && (
            <g style={{ transform: `translate(${currentX}px, ${currentY}px)` }}>
              <circle r="14" fill="rgba(34, 211, 238, 0.3)" className="animate-ping" />
              <circle r="6" fill="#22d3ee" stroke="#0f172a" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 1))' }} />
              <rect x="-70" y="-35" width="60" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="-40" y="-18" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                {currentKw.toFixed(1)} kW
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}