"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    BookOpen, List, PlayCircle, Users, ExternalLink, Code, Server, 
    Database, Cloud, BrainCircuit, ArrowUp, Terminal, ArrowUpRight, 
    Hash, Layers, Smartphone, Wrench, Cpu, Globe, Zap 
} from "lucide-react"; // Changed Tool to Wrench

// --- EXPANDED DATA STRUCTURE ---
const docCategories = [
    {
        category: "Frontend Frameworks",
        refId: "frontend",
        icon: Code,
        technologies: [
            { name: "React", description: "The most popular library for building website screens.", links: [{ type: "Docs", url: "https://react.dev/" }, { type: "Learn", url: "https://react.dev/learn" }] },
            { name: "Next.js", description: "The powerful framework used for modern, fast web apps.", links: [{ type: "Docs", url: "https://nextjs.org/docs" }, { type: "Showcase", url: "https://nextjs.org/showcase" }] },
            { name: "Tailwind CSS", description: "A utility-first CSS framework for rapid UI styling.", links: [{ type: "Docs", url: "https://tailwindcss.com/docs" }, { type: "Components", url: "https://tailwindui.com" }] },
            { name: "Astro", description: "The web framework for content-driven websites like blogs.", links: [{ type: "Docs", url: "https://docs.astro.build" }, { type: "Themes", url: "https://astro.build/themes" }] },
        ]
    },
    {
        category: "Backend Systems",
        refId: "backend",
        icon: Server,
        technologies: [
            { name: "Node.js", description: "Run JavaScript code on your server to handle data.", links: [{ type: "Docs", url: "https://nodejs.org/en/docs" }, { type: "API", url: "https://nodejs.org/api/" }] },
            { name: "Express.js", description: "A fast and minimal web framework for Node.js servers.", links: [{ type: "Docs", url: "https://expressjs.com/" }, { type: "Guide", url: "https://expressjs.com/en/guide/routing.html" }] },
            { name: "Python / Django", description: "A high-level Python web framework for rapid growth.", links: [{ type: "Docs", url: "https://docs.djangoproject.com/" }, { type: "Tutorial", url: "https://www.djangoproject.com/start/" }] },
            { name: "FastAPI", description: "A modern, fast web framework for building APIs with Python.", links: [{ type: "Docs", url: "https://fastapi.tiangolo.com/" }, { type: "Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" }] },
        ]
    },
    {
        category: "Database Storage",
        refId: "databases",
        icon: Database,
        technologies: [
            { name: "PostgreSQL", description: "A very powerful system for storing structured data.", links: [{ type: "Docs", url: "https://www.postgresql.org/docs/" }, { type: "Tutorial", url: "https://www.postgresqltutorial.com/" }] },
            { name: "MongoDB", description: "Store data as simple documents instead of tables.", links: [{ type: "Docs", url: "https://www.mongodb.com/docs/" }, { type: "University", url: "https://university.mongodb.com/" }] },
            { name: "Supabase", description: "The open-source alternative to Firebase for databases.", links: [{ type: "Docs", url: "https://supabase.com/docs" }, { type: "Guides", url: "https://supabase.com/docs/guides" }] },
            { name: "Prisma", description: "A modern tool to map your code objects to your database.", links: [{ type: "Docs", url: "https://www.prisma.io/docs" }, { type: "ORM", url: "https://www.prisma.io/orm" }] },
        ]
    },
    {
        category: "Mobile Development",
        refId: "mobile",
        icon: Smartphone,
        technologies: [
            { name: "React Native", description: "Build real mobile apps using React and JavaScript.", links: [{ type: "Docs", url: "https://reactnative.dev/docs/getting-started" }, { type: "Showcase", url: "https://reactnative.dev/showcase" }] },
            { name: "Flutter", description: "Google’s tool for building apps for mobile, web, and desktop.", links: [{ type: "Docs", url: "https://docs.flutter.dev/" }, { type: "Cookbook", url: "https://docs.flutter.dev/cookbook" }] },
            { name: "Expo", description: "A platform that makes developing React Native apps easier.", links: [{ type: "Docs", url: "https://docs.expo.dev/" }, { type: "Tutorial", url: "https://docs.expo.dev/tutorial/introduction/" }] },
        ]
    },
    {
        category: "AI & Machine Learning",
        refId: "ai-ecosystem",
        icon: BrainCircuit,
        technologies: [
            { name: "OpenAI API", description: "Integrate GPT-4 and other AI models into your apps.", links: [{ type: "Docs", url: "https://platform.openai.com/docs" }, { type: "API Ref", url: "https://platform.openai.com/docs/api-reference" }] },
            { name: "LangChain", description: "A framework for building apps powered by large language models.", links: [{ type: "Docs", url: "https://python.langchain.com/" }, { type: "JS/TS", url: "https://js.langchain.com/" }] },
            { name: "Hugging Face", description: "The platform for sharing and building AI models and datasets.", links: [{ type: "Docs", url: "https://huggingface.co/docs" }, { type: "Models", url: "https://huggingface.co/models" }] },
        ]
    },
    {
        category: "Cloud & DevOps",
        refId: "cloud",
        icon: Cloud,
        technologies: [
            { name: "AWS", description: "Amazon's giant platform for hosting apps worldwide.", links: [{ type: "Docs", url: "https://docs.aws.amazon.com/" }, { type: "Console", url: "https://aws.amazon.com/console/" }] },
            { name: "Vercel", description: "The best platform for deploying and hosting frontend apps.", links: [{ type: "Docs", url: "https://vercel.com/docs" }, { type: "CLI", url: "https://vercel.com/docs/cli" }] },
            { name: "Docker", description: "Package your app into a container so it runs anywhere.", links: [{ type: "Docs", url: "https://docs.docker.com/" }, { type: "Hub", url: "https://hub.docker.com/" }] },
        ]
    },
    {
        category: "Developer Tools",
        refId: "dev-tools",
        icon: Wrench, // Fixed: Changed from Tool to Wrench
        technologies: [
            { name: "Git", description: "The standard tool for tracking code changes and versions.", links: [{ type: "Docs", url: "https://git-scm.com/doc" }, { type: "Reference", url: "https://git-scm.com/docs" }] },
            { name: "TypeScript", description: "Adds type safety to JavaScript for cleaner, safer code.", links: [{ type: "Docs", url: "https://www.typescriptlang.org/docs/" }, { type: "Playground", url: "https://www.typescriptlang.org/play" }] },
            { name: "Vite", description: "The next generation frontend tool for fast development.", links: [{ type: "Docs", url: "https://vitejs.dev/guide/" }, { type: "Plugins", url: "https://vitejs.dev/plugins/" }] },
        ]
    }
];

const DocumentationPage = () => {
    const router = useRouter();
    const [activeId, setActiveId] = useState("frontend");
    const [showBackToTop, setShowBackToTop] = useState(false);

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
            const scrollPos = window.scrollY + 150;
            docCategories.forEach(c => {
                const section = document.getElementById(c.refId);
                if (section && scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                    setActiveId(section.id);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalTech = docCategories.reduce((sum, cat) => sum + cat.technologies.length, 0);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors">
                            {"<"} BACK
                        </button>
                        <div className="h-6 w-px bg-slate-800 mx-2" />
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
                            <span className="text-sm font-black text-white uppercase tracking-tighter">DOCS_ARCHIVE</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end font-mono">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Protocols</span>
                            <span className="text-sm font-bold text-white leading-none">{totalTech}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
                            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Active</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <aside className="lg:col-span-3">
                        <div className="sticky top-24 space-y-2 border-l border-slate-800 pl-6">
                            <h3 className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-6">Directory</h3>
                            {docCategories.map(cat => (
                                <button key={cat.refId} onClick={() => scrollToSection(cat.refId)}
                                    className={`w-full text-left py-2 text-[10px] font-mono uppercase tracking-widest transition-colors block
                                        ${activeId === cat.refId ? 'text-blue-400' : 'text-slate-500 hover:text-blue-400'}`}>
                                    {cat.category.replace(' ', '_')}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <div className="lg:col-span-9 space-y-32">
                        <section>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
                                HELP <span className="text-blue-600">&</span> GUIDES
                            </h2>
                            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.2em] max-w-xl">
                                Your central library for official manuals and technical growth.
                            </p>
                        </section>

                        {docCategories.map((category) => (
                            <section key={category.refId} id={category.refId} className="scroll-mt-24">
                                <div className="flex items-center gap-4 mb-8">
                                    <category.icon className="w-5 h-5 text-blue-500" />
                                    <h3 className="text-sm font-mono text-white uppercase tracking-[0.3em]">
                                        // MODULE_{category.category.toUpperCase().replace(/\s/g, '_')}
                                    </h3>
                                    <div className="h-px flex-grow bg-slate-800" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {category.technologies.map((tech, idx) => (
                                        <div key={idx} className="group relative bg-slate-900/40 border border-slate-800 p-6 hover:border-blue-600/50 transition-all duration-300 overflow-hidden flex flex-col">
                                            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                                            
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-10 h-10 border border-slate-800 bg-slate-950 flex items-center justify-center font-mono text-blue-500 font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    {tech.name.charAt(0)}
                                                </div>
                                                <h4 className="text-base font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                                    {tech.name}
                                                </h4>
                                            </div>

                                            <p className="text-[11px] font-mono text-slate-500 leading-relaxed mb-8 border-l border-slate-800 pl-4 h-10 overflow-hidden">
                                                {tech.description.toUpperCase()}
                                            </p>

                                            <div className="mt-auto space-y-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    {tech.links.map((link, lIdx) => (
                                                        <a key={lIdx} href={link.url} target="_blank" className="flex items-center justify-between px-3 py-2 bg-slate-950 border border-slate-800 hover:border-blue-600 transition-colors">
                                                            <span className="text-[9px] font-mono text-slate-300 uppercase">{link.type}</span>
                                                            <ArrowUpRight className="w-2.5 h-2.5 text-blue-500" />
                                                        </a>
                                                    ))}
                                                </div>
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
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 h-10 w-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 transition-colors">
                    ^
                </button>
            )}

            <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
                CKR.DATAPOINT // 2025
            </footer>
        </div>
    );
};

export default DocumentationPage;