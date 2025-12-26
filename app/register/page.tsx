"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex overflow-hidden font-sans text-slate-900">
      
      {/* --- LEFT SIDE: THE CORE (Visual Storytelling) --- */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#020617] relative flex-col justify-between p-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-20" 
            style={{ 
              backgroundImage: `radial-gradient(#3b82f6 0.5px, transparent 0.5px)`, 
              backgroundSize: '24px 24px' 
            }} 
          />
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-200/70">Node: Global-South-01</span>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">the Digital Spine.</span>
          </h1>
          <p className="text-slate-400 max-w-sm leading-relaxed font-light">
            Access the centralized nexus for aerospace and high-precision engineering data. 
          </p>
        </div>

        {/* Data Points Card */}
        <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter mb-1">Infrastructure Load</p>
              <p className="text-2xl font-mono text-white tracking-tighter">0.024<span className="text-xs text-slate-500">ms</span></p>
            </div>
            <div className="h-12 w-24 flex items-end gap-1">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500/40 rounded-t-sm animate-bounce" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
            </div>
          </div>
          <div className="space-y-3">
             <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
             <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>SYSTEM_UPTIME</span>
                <span className="text-slate-300">99.998%</span>
             </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="relative z-10 flex items-center justify-between font-mono">
           <div className="flex flex-col">
              <span className="text-[9px] text-slate-500 uppercase">Current Session</span>
              <span className="text-xs text-blue-200">{time || "00:00:00"}</span>
           </div>
           <div className="text-right">
              <span className="text-[9px] text-slate-500 uppercase">Security Grade</span>
              <span className="text-xs text-emerald-400 block tracking-widest">LEVEL_A</span>
           </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE REGISTRY (The Studio UI) --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-[440px] bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-slate-100">
          
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 text-sm">
              Enter your credentials to join the network.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Identity Name</label>
              <input 
                type="text" 
                placeholder="e.g. Alexander Pierce"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Network Email</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 ml-1">Security Key</label>
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl text-sm font-bold mt-4 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.99]">
              Generate Identity
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold"><span className="bg-white px-4 text-slate-400">Or Connect Via</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fillOpacity=".9"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Already have an identity? {' '}
            <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
          </p>
        </div>
        
        <div className="mt-10 flex gap-6">
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Privacy</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Terms</span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">Nodes</span>
        </div>
      </div>
    </div>
  );
}