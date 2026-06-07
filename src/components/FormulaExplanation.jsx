import React from 'react';
import { BookOpen } from 'lucide-react';

export default function FormulaExplanation() {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group h-full">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <BookOpen className="text-purple-400 w-6 h-6" />
        </div>
        Anatomi Rumus Fisika
      </h2>
      
      <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5 mb-6 flex flex-col items-center justify-center">
        <p className="text-sm text-slate-400 mb-2 uppercase tracking-widest font-semibold">Persamaan Daya Turbin Air</p>
        <p className="text-2xl md:text-3xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-cyan-300 to-emerald-300 tracking-wider">
          P = ρ × g × Q × H × η
        </p>
      </div>

      <ul className="space-y-4">
        {[
          { sym: 'P', name: 'Power (Daya)', desc: 'Total daya listrik teoritis yang dihasilkan (Watt).', color: 'text-cyan-400' },
          { sym: 'ρ', name: 'Rho (Massa Jenis Air)', desc: 'Tetapan massa jenis air tawar, bernilai 1000 kg/m³.', color: 'text-slate-400' },
          { sym: 'g', name: 'Gravitasi', desc: 'Percepatan gravitasi bumi, yaitu 9.81 m/s².', color: 'text-slate-400' },
          { sym: 'Q', name: 'Debit Air (Q)', desc: 'Volume air yang melewati turbin per detik (m³/s). Semakin banyak aliran air, semakin besar tenaga dorong.', color: 'text-cyan-400' },
          { sym: 'H', name: 'Net Head (H)', desc: 'Jarak vertikal efektif air jatuh (meter). Berpengaruh besar terhadap energi potensial.', color: 'text-emerald-400' },
          { sym: 'η', name: 'Efisiensi (Eta)', desc: 'Persentase rasio energi yang berhasil diubah turbin & generator menjadi listrik.', color: 'text-amber-400' },
        ].map((item, idx) => (
          <li key={idx} className="flex gap-4 text-sm md:text-base">
            <span className={`font-bold font-mono text-lg w-6 shrink-0 ${item.color}`}>{item.sym}</span>
            <p className="text-slate-300 leading-relaxed"><strong className="text-white">{item.name}</strong>: {item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}