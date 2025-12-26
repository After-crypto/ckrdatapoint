"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Terminal, BookOpen, FileText, Award, Download, 
    ArrowUp, Activity, ArrowUpRight, Hash, Clock, Database, HardDrive
} from "lucide-react";

// --- DATA SET ---
const academicYears = [
    {
      year: "First Year",
      refId: "year-1",
      description: "Foundation subjects and basic engineering logic.",
      driveLink: "#",
      subjects: ["Math", "Physics", "Chemistry", "Programming", "Graphics"],
      resources: [
        { name: "Lab Notes", count: 25, desc: "Physics and Chemistry experiments." },
        { name: "Previous Papers", count: 80, desc: "Last 5 years of solved exams." },
        { name: "Subject Notes", count: 50, desc: "Full notes for all semesters." },
      ]
    },
    {
      year: "Second Year",
      refId: "year-2",
      description: "Core computer science and logic fundamentals.",
      driveLink: "#",
      subjects: ["Data Structures", "DBMS", "Digital Logic", "Java", "Discrete Math"],
      resources: [
        { name: "Lab Records", count: 42, desc: "Java and SQL lab solutions." },
        { name: "Core Notes", count: 65, desc: "Handwritten and digital core notes." },
        { name: "Micro Projects", count: 22, desc: "Small web and app templates." },
      ]
    },
    {
      year: "Third Year",
      refId: "year-3",
      description: "Advanced systems and specialization modules.",
      driveLink: "#",
      subjects: ["OS", "Computer Networks", "Software Eng", "AI/ML", "Web Tech"],
      resources: [
        { name: "Lab Notes", count: 45, desc: "Network and OS lab manuals." },
        { name: "Specialized Notes", count: 75, desc: "AI and ML theory guides." },
        { name: "Project Blueprints", count: 28, desc: "Mini project ideas and reports." },
      ]
    },
    {
      year: "Fourth Year",
      refId: "year-4",
      description: "Final projects and industry placement preparation.",
      driveLink: "#",
      subjects: ["Capstone", "Blockchain", "Cloud Computing", "Security"],
      resources: [
        { name: "Project Reports", count: 30, desc: "Sample final year documentation." },
        { name: "Interview Prep", count: 50, desc: "Company-specific coding notes." },
        { name: "Placement Papers", count: 120, desc: "Previous year aptitude tests." },
      ]
    }
];

const CampusNotesPage = () => {
    const router = useRouter();
    const [activeId, setActiveId] = useState("year-1");
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Calculate total file count for the header
    const totalFiles = 4250; 

    // Smooth scroll to section
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
            
            // Update active sidebar link based on scroll position
            const sections = academicYears.map(y => document.getElementById(y.refId));
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                if (section && scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight)) {
                    setActiveId(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
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
                            {"<"} BACK_PROTOCOL
                        </button>
                        <div className="h-6 w-px bg-slate-800 mx-2" />
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
                            <span className="text-sm font-black text-white uppercase tracking-tighter">CAMPUS_NOTES</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Total_Files</span>
                            <span className="text-sm font-bold text-white font-mono">{totalFiles.toLocaleString()}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-800 hidden md:block" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Archive_Live</span>
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
                            {academicYears.map(year => (
                                <button
                                    key={year.refId}
                                    onClick={() => scrollToSection(year.refId)}
                                    className={`w-full text-left py-2 text-[10px] font-mono uppercase tracking-widest transition-colors block
                                        ${activeId === year.refId ? 'text-blue-400' : 'text-slate-500 hover:text-blue-400'}`}
                                >
                                    {year.year.replace(' ', '_')}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-9 space-y-32">
                        {academicYears.map((yearData) => (
                            <section key={yearData.refId} id={yearData.refId} className="scroll-mt-24">
                                
                                {/* YEAR HEADER */}
                                <div className="border border-slate-800 bg-slate-900/20 p-8 mb-8 relative overflow-hidden border-l-4 border-l-blue-600">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                        <div>
                                            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">Node_Module</span>
                                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mt-1">{yearData.year}</h2>
                                            <p className="text-[11px] font-mono text-slate-500 mt-4 max-w-lg leading-relaxed uppercase">
                                                {yearData.description}
                                            </p>
                                        </div>
                                        <a href={yearData.driveLink} target="_blank" className="px-6 py-3 bg-blue-600 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center gap-2">
                                            ACCESS_STORAGE <HardDrive className="w-3 h-3" />
                                        </a>
                                    </div>

                                    {/* SUBJECT BADGES */}
                                    <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-800/50">
                                        {yearData.subjects.map((sub, i) => (
                                            <span key={i} className="text-[8px] font-mono uppercase px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-500">
                                                {sub.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* RESOURCE LOGS */}
                                <div className="grid grid-cols-1 gap-4">
                                    {yearData.resources.map((res, i) => (
                                        <div key={i} className="group relative bg-slate-900/40 border border-slate-800 p-5 flex items-center justify-between hover:border-blue-600/50 transition-all overflow-hidden">
                                            {/* Hover Scanline Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                                            
                                            <div className="flex items-center gap-6 relative z-10">
                                                <div className="w-12 h-12 bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-blue-500 group-hover:border-blue-900 transition-colors">
                                                    {i % 2 === 0 ? <BookOpen className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                                        {res.name.replace(' ', '_')}
                                                    </h4>
                                                    <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">{res.desc}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end relative z-10 font-mono">
                                                <span className="text-[10px] text-blue-500 font-bold">{res.count}+ FILES</span>
                                                <span className="text-[8px] text-slate-700 uppercase tracking-tighter mt-1">LOG_ID: {yearData.year.charAt(0)}{i+1}</span>
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
                    className="fixed bottom-8 right-8 w-10 h-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 transition-colors"
                >
                    ^
                </button>
            )}

            <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
                CKR.DATAPOINT // CAMPUS_ARCHIVE // 2025
            </footer>
        </div>
    );
};

export default CampusNotesPage;