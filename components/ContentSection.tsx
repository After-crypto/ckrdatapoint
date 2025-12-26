import React from 'react';
import Link from 'next/link';

const DataCardsSection = () => {
  const units = [
    { id: "01", code: "UNIT_CRT", title: "Certificates", desc: "Digital security keys", size: "2.4 GB", path: "/certificates", status: "SECURE" },
    { id: "02", code: "UNIT_PRJ", title: "Projects", desc: "Main work files", size: "14.0 TB", path: "/projects", status: "PUBLIC" },
    { id: "03", code: "UNIT_IDE", title: "Ideas", desc: "New concept notes", size: "840 MB", path: "/ideas", status: "LOCAL" },
    { id: "04", code: "UNIT_BLG", title: "Blogs", desc: "Public articles", size: "1.2 GB", path: "/blogs", status: "PUBLIC" },
    { id: "05", code: "UNIT_DSA", title: "Algorithms", desc: "Code optimization", size: "500 MB", path: "/algorithms", status: "CORE" },
    { id: "06", code: "UNIT_CHL", title: "Challenges", desc: "Practice tasks", size: "450 MB", path: "/challenges", status: "ACTIVE" },
    { id: "07", code: "UNIT_INT", title: "Work Info", desc: "Job protocols", size: "120 MB", path: "/internships", status: "EXTERNAL" },
    { id: "08", code: "UNIT_NTS", title: "Private Notes", desc: "Encrypted memos", size: "60 MB", path: "/notes", status: "PRIVATE" },
    { id: "09", code: "UNIT_DOC", title: "Documents", desc: "System manuals", size: "300 MB", path: "/documents", status: "STATIC" },
    { id: "10", code: "UNIT_THY", title: "Theories", desc: "Science data", size: "1.5 GB", path: "/theories", status: "CORE" },
    { id: "11", code: "UNIT_MAP", title: "Roadmaps", desc: "Future plans", size: "25 MB", path: "/roadmaps", status: "GUIDE" },
    { id: "12", code: "UNIT_STU", title: "Research", desc: "Old archives", size: "8.0 TB", path: "/research", status: "ARCHIVE" },
    { id: "13", code: "UNIT_EVT", title: "Events", desc: "Live timeline", size: "LIVE", path: "/events", status: "SYNC" },
    { id: "14", code: "UNIT_ASN", title: "Tasks", desc: "Daily work list", size: "200 MB", path: "/assignments", status: "BATCH" },
    { id: "15", code: "UNIT_CAM", title: "Campus", desc: "Network hubs", size: "4.0 GB", path: "/campus", status: "SHARED" },
    { id: "16", code: "UNIT_TMP", title: "Templates", desc: "Ready designs", size: "900 MB", path: "/templates", status: "ASSET" },
    { id: "17", code: "UNIT_AI", title: "AI Core", desc: "Neural networks", size: "AUTO", path: "/ai-core", status: "ADMIN" },
  ];

  return (
    <section className="py-24 bg-[#fcfcfc] text-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-4 w-[2px] bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Resource Registry</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Database Index</h2>
          <p className="text-slate-500 max-w-lg text-sm font-medium">
            Select a module to view detailed technical specifications and stored data assets.
          </p>
        </div>

        {/* --- CARD GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {units.map((unit, index) => (
            <Link 
              key={index}
              href={unit.path}
              className="group relative block bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:border-blue-600"
            >
              {/* Top Row: Unit Code & Status */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  {unit.code}
                </span>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                  <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black tracking-widest text-slate-500 group-hover:text-blue-600">
                    {unit.status}
                  </span>
                </div>
              </div>

              {/* Middle: Info */}
              <div className="mb-10">
                <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-blue-600 transition-colors">
                  {unit.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {unit.desc}
                </p>
              </div>

              {/* Bottom: Specs & CTA */}
              <div className="flex justify-between items-end pt-5 border-t border-slate-50">
                <div>
                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Allocation</p>
                  <p className="text-xs font-mono font-bold text-slate-700">{unit.size}</p>
                </div>
                
                {/* Visual Arrow Indicator */}
                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14m-7-7 7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* Creative Detail: Animated Border Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none">
                 <div className="absolute top-4 right-4 w-[1px] h-0 bg-blue-600 transition-all duration-500 group-hover:h-4" />
                 <div className="absolute top-4 right-4 h-[1px] w-0 bg-blue-600 transition-all duration-500 group-hover:w-4" />
              </div>

              {/* The "Scanning" Line Overlay */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent -translate-y-full group-hover:animate-scan pointer-events-none" />
            </Link>
          ))}

          {/* ADD MODULE MOCK CARD */}
          <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:border-blue-300 hover:text-blue-600 transition-all bg-white/50">
            <span className="text-3xl font-light mb-2">+</span>
            <span className="text-[10px] font-black uppercase tracking-widest">New Module</span>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(280px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}} />
    </section>
  );
};

export default DataCardsSection;
