"use client";

import React from 'react';
import Link from 'next/link';

const StudentPathCTA = () => {
  return (
    <section className="w-full bg-[#000000] border-y border-white/5 relative overflow-hidden">
      
      {/* 1. TECHNICAL GRID: 40px Engineering Blueprint overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* 2. ULTRA-COMPACT STUDENT CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-10 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-x-16 gap-y-6">
          
          {/* THE QUESTION: Centered and Impactful */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-1 w-1 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-500/80">Student Mentor Online</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-none">
              Are you confused?
            </h2>
          </div>

          {/* THE SOLUTION: Simple Career/Journey English */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-slate-400 text-xs md:text-sm font-medium max-w-[320px] text-center md:text-left leading-tight">
              Not sure which branch to choose or how to start your career? Let our experts help you navigate your engineering journey.
            </p>
            
            <Link 
              href="/journey"
              className="group relative bg-white text-black px-8 py-3 rounded-md font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all overflow-hidden"
            >
              <span className="relative z-10">Guide My Journey</span>
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </div>

      {/* 3. CENTER GLOW: Focused blue depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[100px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
      
    </section>
  );
};

export default StudentPathCTA;