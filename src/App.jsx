import React, { useState } from 'react';
import { Zap, Printer } from 'lucide-react';
import { useHydropower } from './hooks/useHydropower';
import CalculatorForm from './components/CalculatorForm';
import ResultDisplay from './components/ResultDisplay';
import HydroVisualizer from './components/HydroVisualizer';
import FormulaExplanation from './components/FormulaExplanation';
import PowerGraph from './components/Graph';

export default function App() {
  const [debit, setDebit] = useState(0.5); 
  const [head, setHead] = useState(20); 
  const [efisiensi, setEfisiensi] = useState(80); 

  const { dayaWatt, kategori } = useHydropower(debit, head, efisiensi);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          html, body { 
            background-color: #0f172a !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          .shadow-2xl { box-shadow: none !important; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white font-sans p-4 md:p-8 selection:bg-cyan-500/30 print:p-2 print:bg-slate-900">        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="hidden print:block text-center pt-2 pb-6">
            <h2 className="text-3xl font-black text-white tracking-widest uppercase">Laporan Analisis Daya Hidro</h2>
            <p className="text-cyan-400 font-mono mt-2">Dihasilkan oleh HydroX Engine pada {new Date().toLocaleDateString('id-ID')}</p>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-6"></div>
          </div>

          <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 print:hidden">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 flex items-center gap-3 drop-shadow-md">
                <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20 backdrop-blur-md">
                  <Zap className="text-cyan-400 w-8 h-8 fill-cyan-400/20" />
                </div>
                HydroX Engine
              </h1>
              <p className="text-slate-400 mt-2 font-medium tracking-wide">Kalkulator Daya Turbin Air Presisi Tinggi</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrint}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95"
                title="Cetak Laporan ke PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Cetak PDF</span>
              </button>

              <div className="bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg">
                <span className="text-slate-300 text-sm font-semibold flex items-center gap-3 tracking-wide">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  Sistem Aktif
                </span>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 flex flex-col gap-8">
              <CalculatorForm 
                debit={debit} setDebit={setDebit}
                head={head} setHead={setHead}
                efisiensi={efisiensi} setEfisiensi={setEfisiensi}
              />
              
              <ResultDisplay 
                dayaWatt={dayaWatt} 
                kategori={kategori} 
              />

              <FormulaExplanation />
            </div>

            <div className="lg:col-span-7 flex flex-col gap-8">
              <HydroVisualizer 
                debit={debit} setDebit={setDebit}
                head={head} setHead={setHead}
                dayaWatt={dayaWatt} 
              />
              
              <PowerGraph 
                debit={debit}
                head={head}
                efisiensi={efisiensi}
                dayaWatt={dayaWatt}
              />
            </div>
            
          </div>

          <div className="text-center text-xs text-slate-500/80 pt-8 pb-4 font-mono">
            <p>RUMUS DASAR: P = ρ × g × Q × H × η &nbsp;|&nbsp; ρ = 1000 kg/m³ &nbsp;|&nbsp; g = 9.81 m/s²</p>
          </div>

        </div>
      </div>
    </>
  );
}