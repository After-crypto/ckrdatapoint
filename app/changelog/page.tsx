"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const changelogData = [
  {
    version: "2.4.0",
    date: "2025-01-15",
    type: "major",
    changes: [
      { type: "added", text: "New TaskFlow 2.0 with enhanced project tracking" },
      { type: "added", text: "Guide My Journey feature for student mentorship" },
      { type: "improved", text: "Performance optimizations across all modules" },
      { type: "fixed", text: "Resolved template page data structure issues" },
      { type: "security", text: "Enhanced authentication and authorization system" }
    ]
  },
  {
    version: "2.3.1",
    date: "2025-01-08",
    type: "patch",
    changes: [
      { type: "fixed", text: "Fixed rendering issues in templates page" },
      { type: "improved", text: "Improved mobile responsiveness" },
      { type: "security", text: "Security patches for dependency updates" }
    ]
  },
  {
    version: "2.3.0",
    date: "2024-12-20",
    type: "minor",
    changes: [
      { type: "added", text: "New resource matrix with project archive" },
      { type: "added", text: "Enhanced search functionality" },
      { type: "improved", text: "Updated UI components with better accessibility" }
    ]
  },
  {
    version: "2.2.0",
    date: "2024-12-01",
    type: "minor",
    changes: [
      { type: "added", text: "AI Core integration for development tools" },
      { type: "added", text: "Campus notes and resources section" },
      { type: "improved", text: "Database query optimizations" }
    ]
  },
  {
    version: "2.1.0",
    date: "2024-11-15",
    type: "minor",
    changes: [
      { type: "added", text: "New blog system with markdown support" },
      { type: "added", text: "Document management system" },
      { type: "improved", text: "File upload and processing pipeline" }
    ]
  }
];

const ChangelogPage = () => {
  const router = useRouter();

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "added":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "improved":
        return <Sparkles className="w-4 h-4 text-blue-500" />;
      case "fixed":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "security":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getChangeLabel = (type: string) => {
    switch (type) {
      case "added":
        return "ADDED";
      case "improved":
        return "IMPROVED";
      case "fixed":
        return "FIXED";
      case "security":
        return "SECURITY";
      default:
        return "CHANGE";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3 h-3" />
              BACK_PROTOCOL
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">CHANGELOG</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Update_Active</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
        
        {/* HERO SECTION */}
        <section className="text-center mb-24">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                VERSION_HISTORY
            </h1>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                Complete changelog of updates, improvements, and fixes to the CKR.DATAPOINT system.
            </p>
        </section>

        {/* CHANGELOG ENTRIES */}
        <section className="space-y-12">
          {changelogData.map((entry, index) => (
            <div key={entry.version} className="border border-slate-800 bg-slate-900/20 p-8 hover:border-blue-600/50 transition-colors">
              <div className="flex items-start justify-between mb-6 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 border text-[10px] font-mono uppercase tracking-widest ${
                    entry.type === "major" 
                      ? "bg-blue-600/20 border-blue-600 text-blue-400" 
                      : entry.type === "minor"
                      ? "bg-purple-600/20 border-purple-600 text-purple-400"
                      : "bg-slate-800/50 border-slate-700 text-slate-400"
                  }`}>
                    {entry.type.toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                      v{entry.version}
                    </h2>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      {entry.date}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {entry.changes.map((change, changeIndex) => (
                  <div key={changeIndex} className="flex items-start gap-4 p-4 bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors">
                    <div className="mt-0.5">
                      {getChangeIcon(change.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider">
                          {getChangeLabel(change.type)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {change.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // CHANGELOG_ARCHIVE_2025
      </footer>
    </div>
  );
};

export default ChangelogPage;

