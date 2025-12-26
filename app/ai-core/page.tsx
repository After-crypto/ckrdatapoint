"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Rocket, Users, Code, Palette, Globe, CheckCircle, ExternalLink,
  Target, Zap, Settings, BrainCircuit, Shuffle, Focus,
  Layers, Smartphone, Sparkles, Monitor, ArrowUp, Command, Database, Lightbulb,
  ArrowUpRight, Server, Terminal, Hash, Activity, BookOpen
} from "lucide-react";

// --- FULL DATA PRESERVED ---
const corePrinciples = [
  { icon: BrainCircuit, title: "AI as Your Collaborator", description: "Shift your mindset from viewing AI as a simple tool to seeing it as a creative partner. It can brainstorm, write boilerplate code, suggest designs, and even debug, freeing you to focus on high-level architecture and user experience." },
  { icon: Shuffle, title: "Embrace Iterative Development", description: "Use AI to rapidly prototype and test ideas. Generate multiple versions of a component or layout, get real-time feedback, and refine your work in cycles. This agile approach leads to better products, faster." },
  { icon: Focus, title: "Focus on the 'What', Not Just the 'How'", description: "Delegate the tedious 'how' of implementation to AI. Clearly define 'what' you want to achieve—the features, the user flow, the design aesthetic—and let AI tools handle much of the syntactical heavy lifting." }
];

const traditionalDevelopment = {
  id: "traditional-development",
  icon: Layers,
  title: "The Traditional Development Path",
  description: "While AI accelerates development, understanding the traditional path provides a powerful foundation. This approach involves manual coding and a deep understanding of core technologies, giving you full control and insight into your web applications.",
  pillars: [
    { title: "HTML, CSS, & JavaScript", description: "The three pillars of the web. HTML structures the content, CSS styles it, and JavaScript adds interactivity." },
    { title: "Frameworks & Libraries", description: "Tools like React, Vue, and Angular provide structured ways to build complex user interfaces efficiently." },
    { title: "Backend & Databases", description: "Server-side logic (Node.js, Python) and databases (SQL, NoSQL) handle data, user accounts, and business logic." },
    { title: "Version Control with Git", description: "Essential for tracking changes, collaborating with others, and managing code history." }
  ]
};

const appDevelopment = [
  { id: "react-native", title: "React Native", icon: Code, description: "Leverage your React knowledge to build native mobile apps for both iOS and Android from a single codebase. Ideal for web developers transitioning to mobile.", points: ["Write once, run anywhere.", "Large ecosystem and community support.", "Hot-reloading for faster development cycles."], tools: ["Expo", "React Navigation", "Redux Toolkit"] },
  { id: "flutter", title: "Flutter", icon: Sparkles, description: "Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. Known for its performance and expressive UI.", points: ["High-performance 60/120fps rendering.", "Rich, customizable widget library.", "Excellent documentation and tooling."], tools: ["Dart", "Firebase", "Bloc/Provider"] },
  { id: "native", title: "Native (Kotlin/Swift)", icon: Smartphone, description: "Build apps directly for a specific platform (Android or iOS) for the best possible performance, latest features, and deepest integration with the operating system.", points: ["Unmatched performance and responsiveness.", "Immediate access to new OS features and APIs.", "The ultimate user experience for a specific platform."], tools: ["Android Studio", "Xcode", "SwiftUI"] }
];

const skillLevels = [
  { id: "beginner", level: "Beginners", icon: Users, description: "For those new to web development, AI can build the foundation for you. You can create clean, single-page websites like a personal bio, a project showcase, or a simple landing page with a contact form. AI helps with code, content, and design.", examples: ["Personal portfolio site", "Hobby showcase page", "Functional contact forms", "Event landing pages"] },
  { id: "intermediate", level: "Intermediate", icon: Code, description: "If you have some coding knowledge, AI becomes a powerful accelerator. Build multi-page websites like blogs or small business sites. AI can help you structure your code, manage state, and integrate with services like payment gateways or CMS platforms.", examples: ["Small business websites", "Personal blog platforms", "Basic e-commerce stores", "Interactive portfolio sites"] },
  { id: "advanced", level: "Advanced", icon: Rocket, description: "For seasoned developers, AI is a force multiplier. Scaffold entire full-stack applications with databases, authentication, and APIs in minutes. Use AI for complex tasks like algorithm optimization, automated testing, and integrating advanced features like AI-powered search.", examples: ["Full-stack web applications", "SaaS starter platforms", "Social media concepts", "AI-native tools and utilities"] }
];

const developmentSteps = [
    { step: 1, id: 'step-1', title: "Planning the Webpage", icon: Target, objective: "Define purpose, target audience, and structure.", importance: "A clear plan ensures the webpage aligns with its goals. AI can brainstorm and structure this plan.", tools: [ { name: "Grok", url: "https://grok.x.ai/", description: "Brainstorm creative ideas." }, { name: "ChatGPT", url: "https://chat.openai.com/", description: "Generate content plans." } ], actionSteps: [ "Define your webpage's primary purpose.", "Identify target audience needs.", "Use AI to generate a sitemap." ], output: "A comprehensive outline with technical requirements." },
    { step: 2, id: 'step-2', title: "Designing the UI", icon: Palette, objective: "Create an attractive, user-friendly interface.", importance: "Good design increases engagement. AI can generate production-ready design code.", tools: [ { name: "Lovable", url: "https://lovable.dev/", description: "Create React UI via prompts." }, { name: "Vercel v0", url: "https://v0.dev/", description: "Generate modern components." } ], actionSteps: [ "Create a mood board.", "Digitize wireframes with AI.", "Prompt generative UI tools." ], output: "Production-ready code for your layouts." },
    { step: 3, id: 'step-3', title: "Frontend Development", icon: Code, objective: "Build the actual structure and interactivity.", importance: "The frontend defines the user experience. AI assistants write and debug code.", tools: [ { name: "Replit", url: "https://replit.com/", description: "Browser-based IDE with AI Agent." }, { name: "Cursor", url: "https://cursor.sh/", description: "AI-first code editor." } ], actionSteps: [ "Set up your environment.", "Use AI-generated UI as a base.", "Refactor code using Copilot." ], output: "A fully functional, responsive frontend." },
    { step: 4, id: 'step-4', title: "Backend & Systems", icon: Zap, objective: "Implement databases and user accounts.", importance: "Interactivity turns a static page into a dynamic app.", tools: [ { name: "Bolt.new", url: "https://bolt.new/", description: "Generate full-stack apps." }, { name: "Supabase", url: "https://supabase.com/", description: "Open-source Firebase alternative." } ], actionSteps: [ "Generate stack with Bolt.new.", "Setup Auth with Supabase.", "Integrate external APIs." ], output: "A dynamic app with database persistence." },
    { step: 5, id: 'step-5', title: "QA & Testing", icon: Settings, objective: "Ensure functionality across all devices.", importance: "Thorough testing prevents bugs and ensures a seamless experience.", tools: [ { name: "Testim", url: "https://www.testim.io/", description: "AI-powered automated testing." }, { name: "Lighthouse", url: "https://developers.google.com/web/tools/lighthouse", description: "Audit performance & SEO." } ], actionSteps: [ "Generate unit tests with AI.", "Perform cross-browser checks.", "Run Lighthouse audits." ], output: "A tested, accessible web application." },
    { step: 6, id: 'step-6', title: "Deployment", icon: Globe, objective: "Make the site accessible to the world.", importance: "Proper deployment ensures 24/7 uptime and security.", tools: [ { name: "Vercel", url: "https://vercel.com/", description: "Standard for frontend deployment." }, { name: "Netlify", url: "https://www.netlify.com/", description: "Simple Git-based deployment." } ], actionSteps: [ "Connect GitHub to Vercel.", "Configure custom DNS records.", "Apply SSL certificates." ], output: "A live URL with global accessibility." }
];

const additionalResources = [
  { category: "Learning Platforms", tools: [{ name: "freeCodeCamp", url: "https://www.freecodecamp.org/" }, { name: "Codecademy", url: "https://www.codecademy.com/" }] },
  { category: "Design Resources", tools: [{ name: "Google Fonts", url: "https://fonts.google.com/" }, { name: "Coolors", url: "https://coolors.co/" }] },
  { category: "Developer Tools", tools: [{ name: "Git", url: "https://git-scm.com/" }, { name: "Prettier", url: "https://prettier.io/" }] }
];

const AnyoneCanDevelop = () => {
  const router = useRouter();
  const [activeLevel, setActiveLevel] = useState('beginner');
  const [activeApp, setActiveApp] = useState('react-native');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const offset = 100;
        const position = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
    }
  };

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
              <span className="inline-block group-hover:-translate-x-1 transition-transform">{"<"}</span> BACK_PROTOCOL
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">DEVOPS_MANUAL</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest uppercase">System_Active</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* SIDEBAR NAVIGATION */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div className="border-l border-slate-800 pl-6 space-y-2">
                <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-6">Access_Logs</h3>
                {['introduction', 'principles', 'legacy-stack', 'capability', 'dev-steps', 'mobile'].map((id) => (
                    <button key={id} onClick={() => scrollTo(id)} className="w-full text-left py-1.5 text-[10px] font-mono uppercase text-slate-500 hover:text-blue-400 transition-colors block">
                        {id.replace('-', '_')}
                    </button>
                ))}
              </div>

              <div className="p-6 bg-slate-900/20 border border-slate-800">
                <h4 className="text-[10px] font-mono text-blue-500 uppercase mb-4 tracking-widest">Quick_Nodes</h4>
                <div className="space-y-4">
                    {additionalResources.map(cat => (
                        <div key={cat.category}>
                            <span className="text-[9px] text-slate-600 uppercase block mb-2">{cat.category}</span>
                            {cat.tools.map(t => (
                                <a key={t.name} href={t.url} target="_blank" className="text-[10px] font-mono text-slate-400 hover:text-white block mb-1 underline decoration-slate-800 underline-offset-4">{t.name}</a>
                            ))}
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="lg:col-span-9 space-y-32">
            
            {/* HERO SECTION */}
            <section id="introduction">
                <span className="inline-block px-3 py-1 bg-blue-900/20 border border-blue-900/50 text-blue-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-6">
                    Module_Engineering_01
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                    ANYONE CAN <br /> <span className="text-blue-600">DEVELOP</span>
                </h1>
                <p className="text-sm font-mono text-slate-400 max-w-2xl border-l-2 border-blue-600/50 pl-6 leading-relaxed uppercase">
                    Software creation is undergoing a shift. Powerful AI allows anyone to build complex systems. This manual acts as your protocol for rapid engineering.
                </p>
            </section>

            {/* CORE PRINCIPLES */}
            <section id="principles">
                <h2 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                    <Target className="w-4 h-4" /> // CORE_PRINCIPLES
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {corePrinciples.map((item, i) => (
                        <div key={i} className="group relative bg-slate-900/40 border border-slate-800 p-8 hover:border-blue-600/50 transition-all overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                            <item.icon className="w-8 h-8 text-blue-500 mb-6" />
                            <h3 className="text-sm font-bold text-white uppercase mb-3">{item.title}</h3>
                            <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* TRADITIONAL PATH */}
            <section id="legacy-stack">
                <h2 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                    <Layers className="w-4 h-4" /> // LEGACY_STACK
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-900/20 border border-slate-800 p-10">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tighter">{traditionalDevelopment.title}</h3>
                        <p className="text-xs font-mono text-slate-500 mb-8 uppercase leading-relaxed">{traditionalDevelopment.description}</p>
                        <div className="space-y-4">
                            {traditionalDevelopment.pillars.map(p => (
                                <div key={p.title} className="flex gap-4">
                                    <Database className="w-4 h-4 text-blue-600 shrink-0" />
                                    <div>
                                        <h4 className="text-[10px] font-bold text-white uppercase">{p.title}</h4>
                                        <p className="text-[9px] font-mono text-slate-600 uppercase mt-1">{p.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-center border-l border-slate-800 lg:pl-12">
                        <Terminal className="w-32 h-32 text-blue-600/10" />
                    </div>
                </div>
            </section>

            {/* SKILL CAPABILITY MATRIX */}
            <section id="capability">
                <h2 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                    <Zap className="w-4 h-4" /> // CAPABILITY_MATRIX
                </h2>
                <div className="bg-slate-900/20 border border-slate-800 overflow-hidden">
                    <div className="flex border-b border-slate-800 bg-slate-950/50">
                        {skillLevels.map(l => (
                            <button key={l.id} onClick={() => setActiveLevel(l.id)} className={`flex-1 py-4 text-[10px] font-mono uppercase tracking-widest transition-all ${activeLevel === l.id ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'text-slate-500'}`}>
                                {l.level}
                            </button>
                        ))}
                    </div>
                    <div className="p-10">
                        {skillLevels.filter(l => l.id === activeLevel).map(l => (
                            <div key={l.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tighter">{l.level}_Protocol</h3>
                                    <p className="text-xs font-mono text-slate-400 mb-8 uppercase leading-relaxed">{l.description}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {l.examples.map((ex, i) => (
                                            <div key={i} className="flex items-center gap-3 text-[9px] font-mono text-slate-500 bg-slate-950 border border-slate-800 p-2 uppercase">
                                                <CheckCircle className="w-3 h-3 text-blue-500" /> {ex}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden lg:flex justify-center"><l.icon className="w-32 h-32 text-blue-600/10" /></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEVELOPMENT STEPS */}
            <section id="dev-steps">
                <h2 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                    <Code className="w-4 h-4" /> // EXECUTION_PROTOCOL
                </h2>
                <div className="space-y-4">
                    {developmentSteps.map((step) => (
                        <div key={step.step} id={step.id} className="group relative bg-slate-900/20 border border-slate-800 p-8 hover:border-blue-600/30 transition-all">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-12 h-12 bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-blue-500 text-xs shadow-[0_0_10px_rgba(37,99,235,0.1)]">
                                    0{step.step}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-black text-white uppercase tracking-tight">{step.title}</h3>
                                            <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">{step.objective}</p>
                                        </div>
                                        <span className="text-[8px] font-mono text-blue-500 border border-blue-900 px-2 py-0.5 uppercase">NODE_STP_{step.step}</span>
                                    </div>
                                    <p className="text-[10px] font-mono text-slate-400 border-l border-slate-800 pl-4 mb-8 uppercase leading-relaxed">{step.importance}</p>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-slate-800/50">
                                        <div>
                                            <span className="text-[8px] font-mono text-blue-500 uppercase block mb-4">Tool_Nodes:</span>
                                            <div className="space-y-3">
                                                {step.tools.map(t => (
                                                    <a key={t.name} href={t.url} target="_blank" className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 hover:border-blue-600 transition-colors">
                                                        <span className="text-[10px] font-mono text-white">{t.name}</span>
                                                        <ArrowUpRight className="w-3 h-3 text-blue-500" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-mono text-blue-500 uppercase block mb-4">Action_Queue:</span>
                                            <ul className="space-y-2">
                                                {step.actionSteps.map((a, i) => (
                                                    <li key={i} className="text-[9px] font-mono text-slate-500 uppercase flex gap-2">
                                                        <span className="text-blue-900">[{i+1}]</span> {a}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <span className="text-[8px] font-mono text-green-500 uppercase block mb-4">Expected_Output:</span>
                                            <div className="p-4 bg-green-900/5 border border-green-900/20">
                                                <p className="text-[10px] font-mono text-green-500/80 leading-relaxed uppercase">{step.output}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* APP DEVELOPMENT */}
            <section id="mobile">
                <h2 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                    <Smartphone className="w-4 h-4" /> // MOBILE_MAINFRAME
                </h2>
                <div className="bg-slate-900/20 border border-slate-800 overflow-hidden">
                    <div className="flex border-b border-slate-800 bg-slate-950/50">
                        {appDevelopment.map(t => (
                            <button key={t.id} onClick={() => setActiveApp(t.id)} className={`flex-1 py-4 text-[10px] font-mono uppercase tracking-widest transition-all ${activeApp === t.id ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'text-slate-500'}`}>
                                {t.title}
                            </button>
                        ))}
                    </div>
                    <div className="p-10">
                        {appDevelopment.filter(t => t.id === activeApp).map(t => (
                            <div key={t.id}>
                                <div className="flex flex-col lg:flex-row gap-12 items-start">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{t.title}_Framework</h3>
                                        <p className="text-xs font-mono text-slate-400 mb-8 uppercase leading-relaxed">{t.description}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-800">
                                            <div>
                                                <span className="text-[8px] font-mono text-blue-500 uppercase block mb-4">Advantages:</span>
                                                {t.points.map((p, i) => (
                                                    <div key={i} className="text-[10px] font-mono text-slate-500 uppercase mb-2 flex gap-3">
                                                        <span className="text-blue-600">»</span> {p}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <span className="text-[8px] font-mono text-blue-500 uppercase block mb-4">Core_Tools:</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {t.tools.map(tool => (
                                                        <span key={tool} className="px-2 py-1 bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-400 uppercase">{tool}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:flex w-32 h-32 bg-slate-950 border border-slate-800 items-center justify-center">
                                        <t.icon className="w-12 h-12 text-blue-600/50" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section>
                <div className="bg-blue-600/5 border border-blue-600/20 p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[120px] pointer-events-none" />
                    <Rocket className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">INITIATE DEVELOPMENT</h2>
                    <p className="text-xs font-mono text-slate-500 uppercase tracking-widest max-w-xl mx-auto mb-10 leading-relaxed">
                        The tools and protocols are mapped. Access the global network and start your build today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="https://v0.dev" target="_blank" className="px-10 py-4 bg-blue-600 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                            INITIALIZE_V0
                        </a>
                        <a href="https://bolt.new" target="_blank" className="px-10 py-4 border border-slate-800 text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] hover:border-blue-600 hover:text-white transition-all">
                            EXECUTE_BOLT
                        </a>
                    </div>
                </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // DEVOPS_MANUAL_V2 // 2025
      </footer>

      {showBackToTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 h-10 w-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 transition-colors">
              ^
          </button>
      )}
    </div>
  );
};

export default AnyoneCanDevelop;