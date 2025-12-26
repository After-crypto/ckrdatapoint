"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, ExternalLink, Calendar, Globe, AlertTriangle, Terminal, 
  Search, ArrowUpRight, Building2, Landmark, FlaskConical, Zap, 
  Star, GraduationCap, ShieldCheck
} from "lucide-react";

// --- DATASET 1: THE OPENINGS (Previous + New Data Added) ---
const internships = [
    // --- Corporate Section ---
    { company: "Google India", role: "STEP Intern 2026", type: "Corporate", deadline: "Dec 2025", description: "Program for 1st and 2nd-year students. Focus on coding and software engineering foundations.", url: "https://careers.google.com/students/", region: "India" },
    { company: "Microsoft India", role: "SWE Intern", type: "Corporate", deadline: "Jan 2026", description: "Work on cloud, AI, and developer tools in Bangalore, Hyderabad, or Noida.", url: "https://careers.microsoft.com/", region: "India" },
    { company: "Amazon India", role: "SDE Intern", type: "Corporate", deadline: "Rolling Basis", description: "Work on large-scale systems. High monthly stipend (₹60k - ₹80k).", url: "https://www.amazon.jobs/", region: "India" },
    { company: "Goldman Sachs", role: "Summer Analyst 2026", type: "Corporate", deadline: "Aug 2025", description: "Roles in software engineering and financial modeling for students.", url: "https://www.goldmansachs.com/careers/students/", region: "India" },
    { company: "Adobe India", role: "Product Intern", type: "Corporate", deadline: "Oct 2025", description: "Work on Creative Cloud and digital marketing tools.", url: "https://www.adobe.com/careers/university.html", region: "India" },
    { company: "Nvidia", role: "Deep Learning Intern", type: "Corporate", deadline: "Dec 2025", description: "Work on GPU technology and AI acceleration.", url: "https://www.nvidia.com/en-in/about-nvidia/careers/", region: "India" },
    { company: "Atlassian", role: "Engineering Intern", type: "Corporate", deadline: "Sept 2025", description: "Work on Jira, Confluence, and cloud infrastructure.", url: "https://www.atlassian.com/company/careers/students", region: "India" },
    { company: "Zomato / Swiggy", role: "Product & Tech Intern", type: "Corporate", deadline: "Varies", description: "Exciting roles in fast-paced consumer tech environments.", url: "https://www.zomato.com/careers", region: "India" },

    // --- Government & PSU Section ---
    { company: "NITI Aayog", role: "Policy Research Intern", type: "Government", deadline: "1st-10th Monthly", description: "Work with the Indian government on national policy and strategic analysis.", url: "https://www.niti.gov.in/internship", region: "India" },
    { company: "ISRO", role: "Technical Intern", type: "Government", deadline: "Ongoing", description: "Opportunity to work on satellite and space technology projects.", url: "https://www.isro.gov.in/Careers.html", region: "India" },
    { company: "RBI", role: "Strategic Research", type: "Government", deadline: "Dec 2025", description: "Data science and economic research for the Reserve Bank of India.", url: "https://opportunities.rbi.org.in/", region: "India" },
    { company: "DRDO", role: "Defense Tech Intern", type: "Government", deadline: "Ongoing", description: "Work on robotics, AI, and defense electronics projects.", url: "https://www.drdo.gov.in/careers", region: "India" },
    { company: "NPCI", role: "Fintech Intern", type: "Government", deadline: "Varies", description: "Work on UPI and digital payment infrastructure.", url: "https://www.npci.org.in/", region: "India" },

    // --- Academic Research (IITs & IISc) ---
    { company: "IIT Madras", role: "Summer Fellowship", type: "Research", deadline: "Feb 2026", description: "Research fellowship for engineering students with a monthly stipend and accommodation.", url: "https://sfp.iitm.ac.in/", region: "India" },
    { company: "IIT Bombay", role: "SURP Program", type: "Research", deadline: "Mar 2026", description: "Summer Undergraduate Research Programme in various tech fields.", url: "https://www.iitb.ac.in/", region: "India" },
    { company: "IIT Delhi", role: "GIPEDI Intern", type: "Research", deadline: "Dec 2025", description: "Project-based internship under IIT Delhi faculty guidance.", url: "https://ird.iitd.ac.in/", region: "India" },
    { company: "IISc Bangalore", role: "Summer Intern", type: "Research", deadline: "Varies", description: "High-level research in AI, Quantum, and Physics.", url: "https://www.iisc.ac.in/", region: "India" },
    { company: "CERN", role: "Summer Student Program", type: "Research", deadline: "Jan 2026", description: "Work at the Large Hadron Collider in Switzerland. Highly prestigious.", url: "https://careers.cern/summer", region: "Global" },

    // --- Global & Open Source ---
    { company: "GSoC 2026", role: "Open Source Contributor", type: "Global", deadline: "Mar 2026", description: "Google Summer of Code. Get paid to write code for global open-source organizations.", url: "https://summerofcode.withgoogle.com/", region: "Global" },
    { company: "MLH Fellowship", role: "Software Intern", type: "Global", deadline: "Rolling", description: "Remote internship working on production-level projects.", url: "https://fellowship.mlh.io/", region: "Global" },
];

// --- DATASET 2: CAREER PORTALS (Previous + New Added) ---
const careerPortals = [
    { name: "Google Careers", url: "https://careers.google.com/students/", status: "Hiring_Now" },
    { name: "Unstop India", url: "https://unstop.com/internships", status: "Active_Feeds" },
    { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/", status: "Live_Updates" },
    { name: "Wellfound", url: "https://wellfound.com/jobs", status: "Startup_Jobs" },
    { name: "Internshala", url: "https://internshala.com/", status: "New_Posts" },
    { name: "HackerRank Jobs", url: "https://www.hackerrank.com/jobs", status: "Skill_Hiring" },
];

const InternshipsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredInternships = useMemo(() => {
    return internships.filter(item => {
      const categoryMatch = selectedCategory === "All" || item.type === selectedCategory;
      const searchMatch = item.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.role.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* 1. SYSTEM HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors">
              {"<"} BACK_PROTOCOL
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">CAREER_VAULT</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest uppercase">Job_Feed_Live</span>
          </div>
        </div>
      </header>

      {/* 2. CONTROL DECK */}
      <div className="bg-slate-900/30 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-sm">
         <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="relative w-full lg:w-96 group">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-blue-500">SEARCH:</span>
               <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="COMPANY_OR_ROLE..." 
                  className="w-full bg-[#020617] border border-slate-800 py-3 pl-20 pr-4 text-xs font-mono text-white focus:outline-none focus:border-blue-600 transition-colors uppercase placeholder:text-slate-700"
               />
            </div>

            <div className="flex flex-wrap gap-3">
               {["All", "Corporate", "Government", "Research", "Global"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${
                        selectedCategory === cat 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white hover:border-blue-600/50'
                    }`}
                  >
                    {cat}
                  </button>
               ))}
            </div>
         </div>
      </div>

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
        
        {/* WARNING ALERT */}
        <div className="mb-12 bg-blue-900/5 border border-blue-900/20 p-4 flex items-center gap-4">
            <AlertTriangle className="w-5 h-5 text-blue-400 animate-pulse" />
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-relaxed">
                <span className="text-blue-400 font-bold">Important:</span> Verify all links on official sites. Listings are updated for the 2025-2026 cycle.
            </div>
        </div>

        {/* CAREER PORTALS SECTION */}
        <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Quick_Access_Nodes</h2>
                <div className="h-px flex-grow bg-slate-800" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {careerPortals.map(portal => (
                    <a href={portal.url} target="_blank" key={portal.name} className="group p-4 bg-slate-900/40 border border-slate-800 hover:border-blue-600/50 transition-all flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-white font-bold text-[10px] uppercase">{portal.name}</span>
                            <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <span className="text-[8px] font-mono text-blue-400 bg-blue-900/10 px-2 py-0.5 border border-blue-900/30 uppercase w-fit">{portal.status}</span>
                    </a>
                ))}
            </div>
        </section>

        {/* INTERNSHIP LISTING GRID */}
        <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Opening_Matrix</h2>
                <div className="h-px flex-grow bg-slate-800" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredInternships.map((job, idx) => (
                    <div key={idx} className="group relative bg-slate-900/20 border border-slate-800 flex flex-col hover:border-blue-600/50 transition-all duration-300 overflow-hidden">
                        {/* Hover Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                        
                        <div className="p-6 border-b border-slate-800 bg-slate-900/20 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-mono text-blue-500 border border-blue-900 px-2 py-0.5 uppercase">{job.type}</span>
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{job.region}</span>
                            </div>
                            <span className="text-[9px] font-mono text-slate-700 uppercase tracking-tighter">NODE_ID_{idx + 201}</span>
                        </div>

                        <div className="p-8 relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                                    {job.company}
                                </h3>
                                {job.type === "Research" && <FlaskConical className="w-5 h-5 text-purple-500" />}
                                {job.type === "Corporate" && <Building2 className="w-5 h-5 text-blue-500" />}
                                {job.type === "Government" && <Landmark className="w-5 h-5 text-green-500" />}
                            </div>
                            
                            <h4 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.2em] mb-6">
                                ROLE: {job.role}
                            </h4>
                            <p className="text-[11px] font-mono text-slate-500 leading-relaxed uppercase border-l-2 border-slate-800 pl-6 mb-8 h-12 overflow-hidden">
                                {job.description}
                            </p>

                            <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase">
                                    <Calendar className="w-3 h-3 text-blue-500" /> Deadline: {job.deadline}
                                </div>
                                <a href={job.url} target="_blank" className="flex items-center gap-2 text-[10px] font-mono text-blue-400 hover:text-white transition-colors uppercase font-bold">
                                    Apply_Link <ArrowUpRight className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredInternships.length === 0 && (
                <div className="py-20 text-center border border-dashed border-slate-800">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">No active openings found for this search criteria.</p>
                </div>
            )}
        </section>

        {/* SUBMIT SECTION */}
        <section>
            <div className="bg-blue-600/5 border border-blue-600/20 p-8 md:p-12 relative text-center lg:text-left overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[100px] pointer-events-none" />
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Post a New Opening?</h3>
                        <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest">
                            Help the community by sharing a direct internship link to our database.
                        </p>
                    </div>
                    <a href="mailto:contact@datapoint.com" className="px-10 py-4 bg-blue-600 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                        ADD_PROTOCOL
                    </a>
                </div>
            </div>
        </section>
      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // JOB_MATRIX_V2 // 2025
      </footer>

      {showBackToTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-8 right-8 h-10 w-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 transition-colors">
              ^
          </button>
      )}
    </div>
  );
};

export default InternshipsPage;