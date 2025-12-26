"use client";

import React from 'react';
import Link from 'next/link';

const TaskFlowCTA = () => {
  return (
    <section className="w-full bg-[#000000] border-y border-white/5 relative overflow-hidden">
      
      {/* 1. TECHNICAL GRID: Subtle white-on-black blueprint overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* LEFT SIDE: SIMPLE MESSAGE */}
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                New: TaskFlow 2.0
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-2">
              Simple work tracking <span className="text-slate-500">built for engineers.</span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
              Organize your projects and see your team&apos;s progress in one simple, secure place.
            </p>
          </div>

          {/* RIGHT SIDE: ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <Link 
              href="/register" 
              className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5 text-center flex items-center justify-center"
            >
              Start for free
            </Link>
            <Link 
              href="/taskflow-guide" 
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all text-center flex items-center justify-center"
            >
              View Guide
            </Link>
          </div>

        </div>

        {/* BOTTOM METADATA (Compact Engineering Detail) */}
        <div className="mt-8 pt-6 border-t border-white/5 flex gap-8 text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em]">
          <span>Security: AES-256</span>
          <span className="hidden sm:block">Status: Operational</span>
          <span className="hidden sm:block">Cloud: Global</span>
        </div>
      </div>

      {/* Decorative Glow: Soft blue light behind the text */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
      
    </section>
  );
};

export default TaskFlowCTA;
