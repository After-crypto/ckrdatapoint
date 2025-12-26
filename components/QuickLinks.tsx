import React from 'react';

const QuickLinks = () => {
  const links = [
    { name: 'System Home', active: true },
    { name: 'Data Hubs', active: false },
    { name: 'Developer Tools', active: false },
    { name: 'Security', active: false },
    { name: 'User Guides', active: false },
    { name: 'Network Status', active: false }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-12 items-center">
          
          {/* LEFT: FIXED MENU LABEL */}
          <div className="flex items-center gap-3 pl-4 md:pl-6 border-r border-slate-200 h-full pr-4 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
              Menu
            </span>
          </div>

          {/* CENTER: SCROLLABLE LINKS WITH MASK */}
          <div className="relative flex-1 h-full overflow-hidden">
            {/* Left Fade Overlay (for scroll indication) */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none md:hidden" />
            
            <div className="flex h-full items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth px-4 snap-x">
              {links.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative flex h-full items-center px-3 md:px-4 shrink-0 transition-all snap-start"
                >
                  <span className={`text-[10px] whitespace-nowrap font-bold uppercase tracking-widest transition-colors ${
                    link.active ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}>
                    {link.name}
                  </span>

                  {/* Underline Effect */}
                  {link.active ? (
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-blue-600" />
                  ) : (
                    <div className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-slate-200 transition-all duration-300 md:group-hover:w-full" />
                  )}
                </a>
              ))}
            </div>

            {/* Right Fade Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none" />
          </div>

          {/* RIGHT: SYSTEM CLOCK (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-6 pr-6 shrink-0">
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                Last Updated
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-600">
                DEC 23, 2025 // 23:30
              </span>
            </div>
            
            <div className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[9px] font-mono font-bold text-slate-400">
              ID: 0x4492
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </nav>
  );
};

export default QuickLinks;