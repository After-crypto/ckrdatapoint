"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Terminal, Activity, Clock, ArrowUpRight, Cpu, Lock } from "lucide-react";

const ResearchPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* 1. HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors"
            >
              {"<"} GO_BACK
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">RESEARCH_LAB</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-slate-600" />
             <span className="text-[10px] font-mono text-slate-500 uppercase">Offline</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative flex items-center justify-center p-6">
        
        <div className="max-w-2xl w-full">
            {/* 2. MESSAGE BOX */}
            <div className="bg-slate-900/20 border border-slate-800 p-8 md:p-16 text-center relative overflow-hidden">
                
                {/* Visual Accents */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />
                
                <div className="relative z-10">
                    <div className="w-16 h-16 border border-slate-800 bg-slate-950 flex items-center justify-center mx-auto mb-8">
                        <Lock className="w-6 h-6 text-slate-700 animate-pulse" />
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
                        COMING SOON
                    </h1>
                    
                    <p className="text-[11px] font-mono text-slate-500 max-w-md mx-auto mb-10 leading-relaxed uppercase tracking-wider">
                        We are still working on this section. Research papers and project reports will be added here in the 2025 update.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
                        <div className="flex items-center gap-3 text-[9px] font-mono text-slate-600 uppercase">
                            <Clock className="w-3 h-3 text-blue-500/50" /> STATUS: WAITING
                        </div>
                        <div className="flex items-center gap-3 text-[9px] font-mono text-slate-600 uppercase">
                            <Activity className="w-3 h-3 text-blue-500/50" /> PROGRESS: 0%
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            href="/" 
                            className="px-8 py-3 bg-slate-950 border border-slate-800 text-slate-400 font-mono text-[10px] uppercase hover:border-blue-600 hover:text-white transition-all"
                        >
                            GO_TO_HOME
                        </Link>
                        <a 
                            href="mailto:contact@datapoint.io" 
                            className="px-8 py-3 bg-blue-600 text-white font-mono text-[10px] uppercase hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                        >
                            EMAIL US <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-800" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-800" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-800" />
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-800" />
            </div>
        </div>
      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // RESEARCH // 2025
      </footer>
    </div>
  );
};

export default ResearchPage;