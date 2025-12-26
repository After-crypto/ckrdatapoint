import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#020617] text-slate-200 border-b border-slate-800">
      {/* --- COMPACT BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)`, 
            backgroundSize: '30px 30px',
            maskImage: 'linear-gradient(to bottom, black, transparent)'
          }}
        />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Increased padding from py-10 to py-24 (mobile) and py-14 to py-32 (desktop) */}
      <div className="container relative z-10 mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          {/* LEFT SIDE: PRIMARY INFO */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 mb-4">
              <Activity className="text-blue-400 animate-pulse" size={12} />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-300">
                Core v2.4 Active
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.85] mb-4">
              CKR<span className="text-blue-600">.</span>DATAPOINT
            </h1>

            <p className="max-w-md text-sm text-slate-400 leading-relaxed mb-8">
              Next-gen protocol for <span className="text-white font-medium">engineering intelligence.</span> 
              Unified file management and automated project governance.
            </p>

            <div className="flex items-center gap-4">
              <Link href="/login" className="px-6 py-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-500 transition-all">
                Dashboard
              </Link>
              <Link href="/register" className="px-6 py-3 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">
                User Guide
              </Link>
            </div>
          </div>

        </div>

        {/* Increased margin top from mt-12 to mt-24 for extra height */}
        <div className="mt-24 pt-4 border-t border-slate-800/50 flex flex-wrap gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-[9px] font-mono flex items-center gap-2">
            <div className="h-1 w-1 bg-blue-500" /> AES-256 ENCRYPTION
          </div>
          <div className="text-[9px] font-mono flex items-center gap-2">
            <div className="h-1 w-1 bg-blue-500" /> MULTI-LATERAL SYNC
          </div>
          <div className="text-[9px] font-mono flex items-center gap-2">
            <div className="h-1 w-1 bg-blue-500" /> ISO-27001 COMPLIANT
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;