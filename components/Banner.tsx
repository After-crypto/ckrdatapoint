"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative isolate z-[100] border-b border-white/10 bg-[#0a0f1a] transition-all">
      {/* Precision Edge: A very thin line at the top to give a premium feel */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          
          {/* LEFT: STATUS AND MESSAGE */}
          <div className="flex items-center gap-x-3">
            {/* Status Pill with a Live Pulse */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 border border-blue-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400">
                Update
              </span>
            </div>
            
            {/* Simple English Message */}
            <p className="text-sm leading-6 text-slate-300">
              <span className="font-bold text-white">Version 2.4 is live.</span> 
              <span className="hidden sm:inline ml-1 text-slate-400">The system is now faster and more stable.</span>
            </p>
          </div>

          {/* RIGHT: ACTION AND CLOSE */}
          <div className="flex items-center gap-x-6">
            <Link 
              href="/changelog" 
              className="group flex items-center gap-x-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white transition-all hover:text-blue-400"
            >
              View Changes
              <svg 
                className="h-3 w-3 transition-transform group-hover:translate-x-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3"
              >
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </Link>

            <button 
              onClick={() => setIsVisible(false)} 
              type="button" 
              className="group -m-1 flex-none p-1 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg 
                className="h-4 w-4 text-slate-500 group-hover:text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Background Lighting: Makes the banner feel "techy" */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-8 left-[10%] h-16 w-1/4 bg-blue-600/10 blur-[50px]" />
      </div>
    </div>
  );
};

export default Banner;