"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Trophy, ExternalLink, Globe, ArrowUp, Terminal, Activity, 
  Hash, Filter, Search, ArrowUpRight, XCircle, Clock, Zap 
} from "lucide-react";

// --- Real-Time Contest Data (Simulated for 2026) ---
const platforms = [
    { name: "LeetCode", url: "https://leetcode.com/contest/" },
    { name: "Codeforces", url: "https://codeforces.com/contests" },
    { name: "CodeChef", url: "https://www.codechef.com/contests" },
    { name: "HackerRank", url: "https://www.hackerrank.com/contests" },
    { name: "AtCoder", url: "https://atcoder.jp/contests/" },
];

const upcomingContests = [
    { platform: "LeetCode", name: "Weekly Contest 480", date: "Jan 11, 2026", time: "08:00 AM IST", url: "https://leetcode.com/contest/" },
    { platform: "Codeforces", name: "Codeforces Round 1024 (Div. 2)", date: "Jan 14, 2026", time: "08:05 PM IST", url: "https://codeforces.com/contests" },
    { platform: "CodeChef", name: "Starters 175 (Rated)", date: "Jan 15, 2026", time: "08:00 PM IST", url: "https://www.codechef.com/contests" },
    { platform: "LeetCode", name: "Biweekly Contest 172", date: "Jan 17, 2026", time: "08:00 PM IST", url: "https://leetcode.com/contest/" },
    { platform: "AtCoder", name: "AtCoder Beginner Contest 410", date: "Jan 18, 2026", time: "05:30 PM IST", url: "https://atcoder.jp/contests/" },
    { platform: "HackerRank", name: "Project Euler Challenge", date: "Jan 20, 2026", time: "Ongoing", url: "https://www.hackerrank.com/contests" },
    { platform: "Google", name: "Hash Code 2026 Practice", date: "Feb 02, 2026", time: "TBD", url: "https://codingcompetitions.withgoogle.com/" },
];

const CodingContestsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredContests = useMemo(() => {
    return upcomingContests.filter(contest => {
        const matchesPlatform = selectedPlatform === "All" || contest.platform === selectedPlatform;
        const matchesSearch = 
            contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contest.platform.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPlatform && matchesSearch;
    });
  }, [selectedPlatform, searchTerm]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* 1. SYSTEM HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors group"
            >
              {"<"} BACK_PROTOCOL
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">CONTEST_TRACKER</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest uppercase">Live_Feed_Active</span>
          </div>
        </div>
      </header>

      {/* 2. CONTROL DECK */}
      <div className="bg-slate-900/30 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-sm">
         <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
            
            <div className="relative w-full xl:w-96 group">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-blue-500">SEARCH:</span>
               <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="CHALLENGE_ID..." 
                  className="w-full bg-[#020617] border border-slate-800 py-3 pl-20 pr-4 text-xs font-mono text-white focus:outline-none focus:border-blue-600 transition-colors uppercase placeholder:text-slate-700"
               />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
               <div className="flex items-center gap-2 mr-2">
                  <Filter className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Filter:</span>
               </div>
               {["All", "LeetCode", "Codeforces", "CodeChef"].map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all border ${
                        selectedPlatform === p 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white hover:border-blue-600/50'
                    }`}
                  >
                    {p}
                  </button>
               ))}
            </div>
         </div>
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12 relative">
        
        {/* PREMIUM CONNECTION CALL-TO-ACTION */}
        <div className="group relative bg-slate-900/40 border border-blue-600/30 p-8 mb-12 flex flex-col md:flex-row items-center justify-between hover:border-blue-600/60 transition-all overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/5 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(37,99,235,0.1) 3px)' }} />
            
            <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/40 flex items-center justify-center">
                    <Trophy className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">GLOBAL_RANKING_SYNC</h3>
                    <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest">Connect your profile to track ratings across all major platforms.</p>
                </div>
            </div>
            <a href="#" className="mt-6 md:mt-0 px-10 py-4 bg-blue-600 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all relative z-10 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                INITIATE_SYNC
            </a>
        </div>

        {/* CONTESTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredContests.map((contest, idx) => (
                <div key={idx} className="group relative bg-slate-900/20 border border-slate-800 p-6 hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
                    {/* Hover Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                    
                    <div className="flex justify-between items-start relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-blue-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {contest.platform.charAt(0)}
                            </div>
                            <div>
                                <span className="text-[8px] font-mono text-blue-500 uppercase tracking-widest border border-blue-900/50 px-2 py-0.5 mb-2 inline-block">
                                    {contest.platform}
                                </span>
                                <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                    {contest.name}
                                </h3>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-[10px] font-mono text-white mb-1 uppercase">{contest.date}</div>
                            <div className="text-[9px] font-mono text-slate-500 flex items-center justify-end gap-2 uppercase">
                                <Clock className="w-3 h-3" /> {contest.time}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center pt-4 border-t border-slate-800/50 relative z-10">
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">PROTOCOL_ID: NODE_{idx + 480}</span>
                        <a href={contest.url} target="_blank" className="flex items-center gap-2 text-[10px] font-mono text-blue-500 hover:text-white transition-colors uppercase">
                            Register_Protocol <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            ))}
        </div>

        {/* EMPTY STATE */}
        {filteredContests.length === 0 && (
            <div className="py-20 text-center border border-dashed border-slate-800">
                <Activity className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">No active protocols found for this filter.</p>
                <button onClick={() => {setSearchTerm(""); setSelectedPlatform("All");}} className="mt-4 text-[10px] text-blue-500 underline uppercase font-mono">Reset_Logic</button>
            </div>
        )}
      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // CONTEST_TRACKER // 2025
      </footer>

      {showBackToTop && (
          <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 h-10 w-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 transition-colors"
          >
              ^
          </button>
      )}
    </div>
  );
};

export default CodingContestsPage;