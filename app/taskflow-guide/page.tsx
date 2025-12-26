"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, FolderKanban, Users, Zap, 
  Shield, BarChart3, ChevronRight, Terminal, 
  Activity, Lock, Cpu, Globe, ArrowRight, ArrowLeft
} from 'lucide-react';

// --- GUIDE DATA ---
const guideSections = [
  {
    id: "getting-started",
    title: "GETTING_STARTED",
    icon: Zap,
    description: "Start here to build your workspace and learn the core TaskFlow environment.",
    steps: [
      {
        head: "What is TaskFlow?",
        body: "A high-speed tool for engineering teams to track code and manage projects in one place.",
        tags: ["Project Management", "Team Sync"]
      },
      {
        head: "First Project Build",
        body: "Open the dashboard and click 'New Project' to start your first data node.",
        tags: ["Setup", "Initialization"]
      }
    ]
  },
  {
    id: "task-logic",
    title: "TASK_PROTOCOLS",
    icon: FolderKanban,
    description: "Manage your daily work by breaking projects into actionable tasks.",
    steps: [
      {
        head: "Creating Tasks",
        body: "Add a task title, set the priority level, and assign it to a developer.",
        tags: ["Data Entry", "Assignment"]
      },
      {
        head: "Moving Workflow",
        body: "Drag tasks between 'In Progress' and 'Done' to update the system status.",
        tags: ["Kanban", "Flow Control"]
      }
    ]
  },
  {
    id: "tracking",
    title: "DATA_ANALYTICS",
    icon: BarChart3,
    description: "View real-time charts and reports to see how your team is performing.",
    steps: [
      {
        head: "Progress Monitoring",
        body: "Check the visual dashboard to see completion rates and team speed.",
        tags: ["Metrics", "Reporting"]
      }
    ]
  },
  {
    id: "security",
    title: "SYSTEM_SECURITY",
    icon: Shield,
    description: "Your data is shielded by modern encryption and access control protocols.",
    steps: [
      {
        head: "Information Protection",
        body: "We use end-to-end encryption to keep your project files safe and private.",
        tags: ["Encryption", "Privacy"]
      }
    ]
  }
];

const TaskFlowGuide = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("getting-started");

  // Handle auto-scroll highlight
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      guideSections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el && scrollPos >= el.offsetTop && scrollPos < (el.offsetTop + el.offsetHeight)) {
          setActiveTab(section.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
      
      {/* 1. BACKGROUND GRID */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* 2. SYSTEM HEADER */}
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
               <span className="text-sm font-black text-white uppercase tracking-tighter">TASKFLOW_MANUAL</span>
            </Link>
          </div>
          <div className="flex items-center gap-2 font-mono">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] text-blue-500 uppercase tracking-[0.2em]">Auth: Verified</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* 3. STICKY DIRECTORY (Sidebar) */}
            <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-28">
                    <div className="flex items-center gap-2 mb-8 text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                        <Terminal className="w-3 h-3" /> System_Index
                    </div>
                    <nav className="space-y-1">
                        {guideSections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => scrollTo(section.id)}
                                className={`w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest transition-all border-l-2 flex items-center justify-between group
                                    ${activeTab === section.id 
                                        ? 'border-blue-600 bg-blue-600/5 text-blue-400' 
                                        : 'border-slate-800 text-slate-600 hover:text-slate-400'}`}
                            >
                                {section.title}
                                <ArrowRight className={`w-3 h-3 transition-transform ${activeTab === section.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                            </button>
                        ))}
                    </nav>

                    <div className="mt-12 p-6 border border-slate-800 bg-slate-900/10">
                        <span className="text-[9px] font-mono text-slate-600 uppercase block mb-2">System_Status</span>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-green-500/70">
                            <Cpu className="w-3 h-3" /> ONLINE_STABLE
                        </div>
                    </div>
                </div>
            </aside>

            {/* 4. MAIN GUIDE CONTENT */}
            <div className="lg:col-span-9 space-y-32">
                
                {/* HERO SECTION */}
                <section>
                    <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full mb-8">
                        <Lock className="w-3 h-3 text-blue-500" />
                        <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest">Engineering_Documentation_2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.85]">
                        ANYONE CAN <br /><span className="text-blue-600">MANAGE.</span>
                    </h1>
                    <p className="text-sm font-mono text-slate-500 max-w-xl uppercase leading-relaxed border-l-2 border-blue-600 pl-8">
                        This guide teaches you how to deploy TaskFlow. Master the protocols to track data nodes, sync your team, and protect project integrity.
                    </p>
                </section>

                {/* DYNAMIC MODULE SECTIONS */}
                {guideSections.map((section, sIdx) => {
                    const IconComponent = section.icon;
                    return (
                    <section key={section.id} id={section.id} className="scroll-mt-28">
                        
                        {/* Section Title Node */}
                        <div className="flex items-end gap-4 mb-12">
                            <div className="text-4xl font-mono font-black text-slate-800 leading-none">0{sIdx + 1}</div>
                            <div className="flex-1 border-b border-slate-800 pb-2">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{section.title}</h2>
                                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mt-1">{section.description}</p>
                            </div>
                        </div>

                        {/* Content Blocks */}
                        <div className="grid grid-cols-1 gap-6">
                            {section.steps.map((item, iIdx) => (
                                <div key={iIdx} className="group relative bg-slate-950 border border-slate-800 p-10 hover:border-blue-600/40 transition-all duration-500 overflow-hidden">
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                                    
                                    <div className="flex flex-col md:flex-row gap-12 relative z-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <IconComponent className="w-5 h-5 text-blue-500" />
                                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.head}</h3>
                                            </div>
                                            <p className="text-xs font-mono text-slate-500 mb-8 uppercase leading-relaxed max-w-xl">
                                                {item.body}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-1 bg-blue-900/10 border border-blue-900/30 text-[9px] font-mono text-blue-500 uppercase">
                                                        #{tag.replace(' ', '_')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="hidden md:flex flex-col justify-end items-end gap-2 border-l border-slate-800 pl-12">
                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse shadow-[0_0_8px_#2563eb]" />
                                            <span className="text-[8px] font-mono text-slate-700 uppercase vertical-text tracking-[0.5em]">STATUS_OK</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    );
                })}

                {/* 5. CALL TO ACTION BLOCK */}
                <section>
                    <div className="bg-blue-600 border border-blue-500 p-16 text-center relative overflow-hidden group">
                        {/* Abstract Background Noise */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                        
                        <div className="relative z-10">
                            <Activity className="w-12 h-12 text-white mx-auto mb-8 animate-pulse" />
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                                SYSTEM_DEPLOYMENT_READY
                            </h2>
                            <p className="text-xs font-mono text-blue-100 uppercase tracking-widest max-w-lg mx-auto mb-12 opacity-80 leading-relaxed">
                                Your technical orientation is complete. Initialize your first workspace node and begin team synchronization.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link href="/register" className="px-12 py-5 bg-white text-blue-600 font-mono text-[11px] font-black uppercase tracking-[0.3em] hover:bg-slate-100 transition-all shadow-xl">
                                    CREATE_ACCOUNT
                                </Link>
                                <Link href="/login" className="px-12 py-5 border-2 border-white/30 text-white font-mono text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
                                    ACCESS_PORTAL
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // END_OF_MANUAL_LOG // 2025
      </footer>
    </div>
  );
};

export default TaskFlowGuide;