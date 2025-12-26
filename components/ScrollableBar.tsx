import React from 'react';

const EngineeringMarquee = () => {
  const terms = [
    "FAST DATA SYNC", "SECURE STORAGE", "GLOBAL NETWORK", 
    "AI POWERED", "REAL-TIME UPDATES", "24/7 SUPPORT",
    "EASY INTEGRATION", "SMART TOOLS", "SYSTEM STABLE"
  ];

  return (
    <div className="relative border-y border-white/10 bg-black py-7 overflow-hidden">
      {/* Subtle Gradient Fades on edges to make text "appear" from the dark */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* The animation container */}
      <div className="flex w-max animate-marquee">
        {/* Doubled list for seamless infinite loop */}
        {[...terms, ...terms].map((term, i) => (
          <div key={i} className="flex items-center mx-12">
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-white whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity">
              {term}
            </span>
            
            {/* Minimalist Diamond Separator */}
            <div className="ml-12 h-1 w-1 rotate-45 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
};

export default EngineeringMarquee;