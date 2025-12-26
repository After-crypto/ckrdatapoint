"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    BookOpen, Clock, Star, ExternalLink, Download, FileText, 
    Terminal, Activity, ArrowUp, ArrowUpRight, Hash, Database, Layers
} from "lucide-react";

// --- DATA SETS (ALL PRESERVED) ---
const noteCategories = [
    {
      category: "First Year - Foundations",
      refId: "year-1",
      notes: [
        { id: "math-1", title: "Engineering Mathematics I", description: "Calculus, differential equations, and linear algebra notes.", subject: "Mathematics", pages: 45, downloads: 1250, rating: 4.8, lastUpdated: "Jan 2025" },
        { id: "physics", title: "Physics for Engineers", description: "Mechanics, thermodynamics, and electromagnetic theory.", subject: "Physics", pages: 38, downloads: 980, rating: 4.7, lastUpdated: "Dec 2024" },
        { id: "c-prog", title: "C Programming Quick Notes", description: "Syntax, functions, pointers, and data structures in C.", subject: "Programming", pages: 28, downloads: 1450, rating: 4.9, lastUpdated: "Jan 2025" },
      ]
    },
    {
      category: "Second Year - Core CS",
      refId: "year-2",
      notes: [
        { id: "dsa", title: "Data Structures & Algorithms", description: "Arrays, linked lists, trees, graphs, and algorithm analysis.", subject: "DSA", pages: 52, downloads: 2100, rating: 4.9, lastUpdated: "Jan 2025" },
        { id: "dbms", title: "Database Systems", description: "SQL, normalization, transactions, and database design.", subject: "DBMS", pages: 46, downloads: 1750, rating: 4.8, lastUpdated: "Jan 2025" },
        { id: "os", title: "Operating Systems", description: "Process management, memory allocation, and file systems.", subject: "OS", pages: 48, downloads: 1620, rating: 4.7, lastUpdated: "Dec 2024" },
      ]
    },
    {
      category: "Third Year - Advanced",
      refId: "year-3",
      notes: [
        { id: "networks", title: "Computer Networks", description: "OSI model, TCP/IP, routing protocols, and network security.", subject: "Networks", pages: 50, downloads: 1650, rating: 4.7, lastUpdated: "Dec 2024" },
        { id: "web-dev", title: "Web Frameworks", description: "React, Node.js, Express, and full-stack development.", subject: "Web Dev", pages: 62, downloads: 2250, rating: 4.9, lastUpdated: "Jan 2025" },
        { id: "sys-design", title: "System Design Basics", description: "Scalability, microservices, and distributed systems.", subject: "Architecture", pages: 52, downloads: 1980, rating: 4.8, lastUpdated: "Jan 2025" },
      ]
    },
    {
      category: "Fourth Year - Specials",
      refId: "year-4",
      notes: [
        { id: "ml-basics", title: "Machine Learning", description: "Supervised learning, neural networks, and model evaluation.", subject: "ML/AI", pages: 65, downloads: 2850, rating: 4.9, lastUpdated: "Jan 2025" },
        { id: "blockchain", title: "Blockchain Tech", description: "Cryptocurrency, smart contracts, and distributed ledgers.", subject: "Blockchain", pages: 48, downloads: 1650, rating: 4.7, lastUpdated: "Jan 2025" },
      ]
    },
    {
      category: "Interview Preparation",
      refId: "interview",
      notes: [
        { id: "tech-interview", title: "Technical Questions", description: "Coding problems, system design, and technical discussions.", subject: "Interview", pages: 85, downloads: 3250, rating: 4.9, lastUpdated: "Jan 2025" },
        { id: "resume-guide", title: "Resume Building", description: "Professional resume templates and writing strategies.", subject: "Career", pages: 25, downloads: 2150, rating: 4.7, lastUpdated: "Dec 2024" },
      ]
    }
];

const NotesPage = () => {
    const router = useRouter();
    const [activeId, setActiveId] = useState("year-1");
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Total files logic
    const totalFiles = useMemo(() => noteCategories.reduce((sum, cat) => sum + cat.notes.length, 0), []);

    // Scroll Logic
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const position = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
            
            // Sync Sidebar
            const scrollPos = window.scrollY + 150;
            noteCategories.forEach(cat => {
                const section = document.getElementById(cat.refId);
                if (section && scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                    setActiveId(section.id);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
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
                            <span className="inline-block group-hover:-translate-x-1 transition-transform">{"<"}</span> BACK_PROTOCOL
                        </button>
                        <div className="h-6 w-px bg-slate-800 mx-2" />
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
                            <span className="text-sm font-black text-white uppercase tracking-tighter">NOTES_VAULT</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end font-mono">
                            <span className="text-[10px] text-slate-500 uppercase">Documents_Sync</span>
                            <span className="text-sm font-bold text-white">{totalFiles} ARCHIVES</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
                            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">System_Online</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* SIDEBAR NAVIGATION */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-24 space-y-2 border-l border-slate-800 pl-6">
                            <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-6">Directory</h3>
                            {noteCategories.map(cat => (
                                <button
                                    key={cat.refId}
                                    onClick={() => scrollToSection(cat.refId)}
                                    className={`w-full text-left py-2 text-[10px] font-mono uppercase tracking-widest transition-colors block
                                        ${activeId === cat.refId ? 'text-blue-400' : 'text-slate-500 hover:text-blue-400'}`}
                                >
                                    {cat.category.replace(' - ', '_').replace(' ', '_').toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <div className="lg:col-span-9 space-y-32">
                        
                        {/* HERO BLOCK */}
                        <section>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                                ACADEMIC <span className="text-blue-600">&</span> CAREER NOTES
                            </h2>
                            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em] max-w-xl">
                                Verified technical study materials for engineering students and developers.
                            </p>
                        </section>

                        {noteCategories.map((category) => (
                            <section key={category.refId} id={category.refId} className="scroll-mt-24">
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">
                                        // MODULE_{category.refId.toUpperCase()}
                                    </h3>
                                    <div className="h-px flex-grow bg-slate-800" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {category.notes.map((note, idx) => (
                                        <div key={idx} className="group relative bg-slate-900/40 border border-slate-800 flex flex-col hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
                                            {/* Hover Scanline Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                                            
                                            <div className="p-6 border-b border-slate-800 bg-slate-900/20 flex justify-between items-center relative z-10">
                                                <span className="text-[9px] font-mono text-blue-500 uppercase border border-blue-900 px-2 py-0.5 tracking-tighter">
                                                    SUB: {note.subject}
                                                </span>
                                                <span className="text-[8px] font-mono text-slate-600 uppercase">
                                                    SYNCED: {note.lastUpdated}
                                                </span>
                                            </div>

                                            <div className="p-6 flex-grow relative z-10">
                                                <h4 className="text-base font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors mb-3">
                                                    {note.title}
                                                </h4>
                                                <p className="text-[11px] font-mono text-slate-500 leading-relaxed uppercase border-l border-slate-800 pl-4 mb-6">
                                                    {note.description}
                                                </p>
                                                
                                                <div className="flex items-center gap-6 mt-auto">
                                                    <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600">
                                                        <FileText className="w-3 h-3" /> {note.pages} PGS
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600">
                                                        <Download className="w-3 h-3" /> {note.downloads.toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[9px] font-mono text-yellow-500">
                                                        <Star className="w-3 h-3 fill-yellow-500" /> {note.rating}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-slate-950/50 border-t border-slate-800 relative z-10">
                                                <a href="#" className="flex items-center justify-between group/link">
                                                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest group-hover/link:text-white transition-colors">Open_Protocol</span>
                                                    <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover/link:translate-x-1 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </main>

            {showBackToTop && (
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 h-10 w-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 transition-colors"
                >
                    ^
                </button>
            )}

            <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
                CKR.DATAPOINT // NOTES_VAULT_CORE // 2025
            </footer>
        </div>
    );
};

export default NotesPage;