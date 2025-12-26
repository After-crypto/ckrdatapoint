"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Calendar, Ticket, PlusCircle, Terminal, ArrowUp, ArrowUpRight, 
    Activity, Clock, AlertTriangle, Pin, Zap 
} from "lucide-react";

// --- Real Tech Events in India (2025-2026) ---
const indiaEventsData = [
    { title: "NASSCOM Tech Forum 2026", date: "Feb 10-12, 2026", location: "Mumbai, India", type: "Conference", url: "https://nasscom.in/events" },
    { title: "Google DevFest Bangalore", date: "Dec 15-16, 2025", location: "Bangalore, India", type: "Workshop", url: "https://devfest.withgoogle.com/" },
    { title: "Microsoft Ignite India", date: "Jan 20, 2026", location: "Hyderabad, India", type: "Summit", url: "https://ignite.microsoft.com/" },
    { title: "Unstop Mega Hackathon", date: "Jan 5-7, 2026", location: "New Delhi, India", type: "Hackathon", url: "https://unstop.com/" },
    { title: "Python India (PyCon)", date: "Feb 22-24, 2026", location: "Bangalore, India", type: "Conference", url: "https://in.pycon.org/" },
    { title: "AWS Cloud Day Delhi", date: "Mar 12, 2026", location: "Gurugram, India", type: "Cloud Expo", url: "https://aws.amazon.com/events/" },
];

const IndiaEventsPage = () => {
  const router = useRouter();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Featured Event: NASSCOM (The biggest tech event in India)
  const featuredEvent = {
    title: "NASSCOM TECHNOLOGY FORUM 2026",
    date: "February 10-12, 2026",
    location: "JIOWS CONVENTION CENTRE, MUMBAI",
    description: "The biggest tech meeting in India. Learn about AI, software growth, and new startups. Thousands of tech leaders from India and around the world will meet here to build the future of the Indian IT industry.",
    url: "https://nasscom.in/",
  };

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Background Grid Pattern */}
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
              {"<"} GO_BACK
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">INDIA_EVENTS</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase">Live_In_India</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full relative p-6 lg:p-12">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Page Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              INDIA_TECH_TRACKER
            </h2>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em]">
              Tracking upcoming hackathons and conferences across India.
            </p>
          </div>

          {/* WARNING ALERT */}
          <div className="mb-12 bg-blue-900/5 border border-blue-900/20 p-4 flex items-center gap-4">
              <AlertTriangle className="w-5 h-5 text-blue-400 animate-pulse" />
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  <span className="text-blue-400 font-bold">Location Filter:</span> Currently showing events in Bangalore, Mumbai, Delhi, and Hyderabad.
              </div>
          </div>

          {/* FEATURED EVENT SECTION */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">Featured_Protocol_India</h3>
                <div className="h-px flex-grow bg-slate-800" />
            </div>
            
            <div className="group relative bg-slate-900/20 border border-slate-800 flex flex-col lg:flex-row hover:border-blue-600/40 transition-all duration-500 overflow-hidden">
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 border border-blue-600/50 text-blue-400 bg-blue-900/10">PREMIUM_FORUM</span>
                  </div>
                  
                  <h4 className="text-3xl md:text-4xl font-black text-white mb-6 group-hover:text-blue-400 transition-colors uppercase tracking-tighter leading-none">
                    {featuredEvent.title}
                  </h4>
                  
                  <div className="space-y-3 mb-8 border-l-2 border-blue-600/20 pl-6 py-2">
                      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300 uppercase">
                          <Clock className="w-4 h-4 text-blue-500" /> {featuredEvent.date}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-slate-300 uppercase">
                          <Pin className="w-4 h-4 text-blue-500" /> {featuredEvent.location}
                      </div>
                  </div>
                  
                  <p className="text-[11px] font-mono text-slate-500 leading-relaxed uppercase mb-10 max-w-lg">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href={featuredEvent.url} target="_blank" className="px-8 py-3 bg-blue-600 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all text-center">
                        VISIT WEBSITE
                    </a>
                  </div>
                </div>

                <div className="lg:w-1/2 min-h-[300px] relative bg-slate-900 flex items-center justify-center border-l border-slate-800">
                    <Zap className="w-24 h-24 text-blue-600/20" />
                    <div className="absolute bottom-6 right-6 text-[8px] font-mono text-slate-700 uppercase">India_Hub_01</div>
                </div>
            </div>
          </section>

          {/* UPCOMING EVENTS LIST */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
                <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">Live_Events_India</h3>
                <div className="h-px flex-grow bg-slate-800" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {indiaEventsData.map((event, index) => (
                <a href={event.url} target="_blank" rel="noopener noreferrer" key={index} className="group relative bg-slate-900/20 border border-slate-800 p-6 hover:border-blue-600/50 transition-all duration-300">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <span className="text-[8px] font-mono text-blue-500 uppercase tracking-widest">{event.type}</span>
                            <h4 className="text-sm font-black text-white uppercase group-hover:text-blue-400 transition-colors leading-tight">
                                {event.title}
                            </h4>
                            <p className="text-[9px] font-mono text-slate-600 uppercase">
                                <Pin className="inline w-2 h-2 mb-0.5 mr-1" /> {event.location}
                            </p>
                        </div>
                        
                        <div className="text-right">
                            <div className="text-[10px] font-mono text-white mb-1 uppercase">
                                {event.date}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-800/50">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">GO_TO_EVENT</span>
                        <ArrowUpRight className="w-3 h-3 text-blue-500" />
                    </div>
                </a>
              ))}
            </div>
          </section>

          {/* SUBMIT SECTION */}
          <section>
            <div className="bg-blue-600/5 border border-blue-600/20 p-8 md:p-12 relative text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">HAVE AN EVENT IN INDIA?</h3>
                        <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest">
                            Add your local hackathon or meetup to our Indian Tech Archive.
                        </p>
                    </div>
                    
                    <Link href="/submit-event" className="px-10 py-4 bg-blue-600 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all">
                        SUBMIT_INDIA_EVENT
                    </Link>
                </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // INDIA_TECH_VAULT // 2025
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

export default IndiaEventsPage;