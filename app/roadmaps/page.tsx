"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, Clock, Code, Brain, 
  Lightbulb, Github, ExternalLink, 
  Terminal, Layers, Activity, Bot, 
  Zap, Cpu, Globe, ShieldAlert
} from "lucide-react";

// --- DATA CONSTANTS ---
const aiGenerators = [
  { name: "Venngage AI", desc: "Visual roadmap generator for custom layouts based on project data.", link: "https://venngage.com/features/ai-roadmap-generator", type: "Visual" },
  { name: "MyMap.AI", desc: "Chat-based builder for strategic roadmaps with daily free credits.", link: "https://www.mymap.ai/", type: "Chat-Based" },
  { name: "ChatDiagram", desc: "No-signup flowchart and roadmap tool using natural language description.", link: "https://chatdiagram.com/", type: "Flowchart" },
  { name: "AI Roadmap Gen", desc: "Structured learning paths with visualizations and topic suggestions.", link: "https://airoadmapgenerator.com/", type: "Learning" },
  { name: "Scribe", desc: "Annotated visual roadmaps perfect for project process planning.", link: "https://getscribe.ai/", type: "Process" }
];

const manualTools = [
  { name: "Canva Roadmap", desc: "Professional templates for manual visual polishing.", link: "https://www.canva.com/", icon: "Template" },
  { name: "GravityWrite", desc: "Generates basic product roadmap outlines and plans.", link: "https://gravitywrite.com/", icon: "Writing" },
  { name: "Miro AI", desc: "Structure inputs into collaborative roadmaps (Free tier available).", link: "https://miro.com/", icon: "Collab" }
];

// ... (dsaRoadmap and webDevRoadmap remain the same as previous code)
const dsaRoadmap = [
    { month: "Month 1", title: "Foundations & Arrays", topics: [{ id: "dsa-1-1", name: "Big O Notation & Complexity Analysis", hours: "8-10", difficulty: "Beginner" }, { id: "dsa-1-2", name: "Arrays & Two Pointers Technique", hours: "15-20", difficulty: "Beginner" }, { id: "dsa-1-3", name: "Sliding Window Problems", hours: "10-15", difficulty: "Beginner" }, { id: "dsa-1-4", name: "Basic Sorting Algorithms", hours: "8-12", difficulty: "Beginner" }], projects: ["Implement sorting visualizer", "Array manipulation exercises"], goals: "Master basic array operations and understand time/space complexity" },
    { month: "Month 2", title: "Strings & Hashing", topics: [{ id: "dsa-2-1", name: "String Manipulation & Pattern Matching", hours: "12-15", difficulty: "Beginner" }, { id: "dsa-2-2", name: "Hash Tables & Hash Maps", hours: "10-12", difficulty: "Intermediate" }, { id: "dsa-2-3", name: "Character Frequency Problems", hours: "8-10", difficulty: "Beginner" }, { id: "dsa-2-4", name: "Anagram & Palindrome Problems", hours: "6-8", difficulty: "Beginner" }], projects: ["Build a word frequency counter", "Implement custom hash table"], goals: "Master string algorithms and hash-based problem solving" },
    { month: "Month 3", title: "Linked Lists & Stacks/Queues", topics: [{ id: "dsa-3-1", name: "Singly & Doubly Linked Lists", hours: "15-18", difficulty: "Intermediate" }, { id: "dsa-3-2", name: "Stack Operations & Applications", hours: "10-12", difficulty: "Beginner" }, { id: "dsa-3-3", name: "Queue & Deque Operations", hours: "8-10", difficulty: "Beginner" }, { id: "dsa-3-4", name: "Linked List Reversal & Cycles", hours: "12-15", difficulty: "Intermediate" }], projects: ["Implement expression evaluator", "Build undo/redo functionality"], goals: "Master linear data structures and their applications" },
    { month: "Month 4", title: "Trees & Binary Search Trees", topics: [{ id: "dsa-4-1", name: "Binary Trees & Tree Traversals", hours: "15-20", difficulty: "Intermediate" }, { id: "dsa-4-2", name: "Binary Search Trees (BST)", hours: "12-15", difficulty: "Intermediate" }, { id: "dsa-4-3", name: "Tree Height & Depth Problems", hours: "8-10", difficulty: "Intermediate" }, { id: "dsa-4-4", name: "Lowest Common Ancestor", hours: "10-12", difficulty: "Intermediate" }], projects: ["Build a file system tree", "Implement autocomplete with trie"], goals: "Master tree data structures and recursive thinking" },
    { month: "Month 5", title: "Heaps & Priority Queues", topics: [{ id: "dsa-5-1", name: "Min/Max Heaps Implementation", hours: "12-15", difficulty: "Intermediate" }, { id: "dsa-5-2", name: "Priority Queue Applications", hours: "10-12", difficulty: "Intermediate" }, { id: "dsa-5-3", name: "Heap Sort Algorithm", hours: "6-8", difficulty: "Intermediate" }, { id: "dsa-5-4", name: "K-way Merge Problems", hours: "8-10", difficulty: "Advanced" }], projects: ["Build task scheduler", "Implement Dijkstra's algorithm"], goals: "Master heap data structure and priority-based algorithms" },
    { month: "Month 6", title: "Graphs & Advanced Algorithms", topics: [{ id: "dsa-6-1", name: "Graph Representation & Traversals", hours: "15-18", difficulty: "Advanced" }, { id: "dsa-6-2", name: "BFS & DFS Applications", hours: "12-15", difficulty: "Advanced" }, { id: "dsa-6-3", name: "Shortest Path Algorithms", hours: "15-20", difficulty: "Advanced" }, { id: "dsa-6-4", name: "Topological Sort & Cycle Detection", hours: "10-12", difficulty: "Advanced" }], projects: ["Build social network analyzer", "Implement GPS route finder"], goals: "Master graph algorithms and complex problem solving" },
    { month: "Month 7", title: "Dynamic Programming", topics: [{ id: "dsa-7-1", name: "1D Dynamic Programming", hours: "15-20", difficulty: "Advanced" }, { id: "dsa-7-2", name: "2D Dynamic Programming", hours: "18-25", difficulty: "Advanced" }, { id: "dsa-7-3", name: "Knapsack Problems", hours: "10-12", difficulty: "Advanced" }, { id: "dsa-7-4", name: "String DP Problems", hours: "12-15", difficulty: "Advanced" }], projects: ["Build optimal strategy game", "Implement text similarity checker"], goals: "Master dynamic programming and optimization techniques" },
    { month: "Month 8", title: "Advanced Topics & System Design", topics: [{ id: "dsa-8-1", name: "Tries & String Algorithms", hours: "10-12", difficulty: "Advanced" }, { id: "dsa-8-2", name: "Union Find (Disjoint Set)", hours: "8-10", difficulty: "Advanced" }, { id: "dsa-8-3", name: "Bit Manipulation", hours: "8-10", difficulty: "Intermediate" }, { id: "dsa-8-4", name: "System Design Basics", hours: "15-20", difficulty: "Advanced" }], projects: ["Build distributed cache", "Design URL shortener"], goals: "Master advanced data structures and system design principles" }
];

const webDevRoadmap = [
    { month: "Month 1", title: "HTML & CSS Fundamentals", topics: [{ id: "web-1-1", name: "HTML5 Semantic Elements", hours: "10-12", difficulty: "Beginner" }, { id: "web-1-2", name: "CSS3 & Flexbox", hours: "15-18", difficulty: "Beginner" }, { id: "web-1-3", name: "CSS Grid Layout", hours: "12-15", difficulty: "Beginner" }, { id: "web-1-4", name: "Responsive Design Principles", hours: "10-12", difficulty: "Beginner" }], projects: ["Build responsive portfolio website", "Create CSS art project"], goals: "Master HTML structure and CSS styling fundamentals" },
    { month: "Month 2", title: "JavaScript Fundamentals", topics: [{ id: "web-2-1", name: "ES6+ Features & Syntax", hours: "15-20", difficulty: "Beginner" }, { id: "web-2-2", name: "DOM Manipulation", hours: "12-15", difficulty: "Beginner" }, { id: "web-2-3", name: "Event Handling", hours: "8-10", difficulty: "Beginner" }, { id: "web-2-4", name: "Async JavaScript & Promises", hours: "12-15", difficulty: "Intermediate" }], projects: ["Interactive calculator", "Todo list application"], goals: "Master JavaScript fundamentals and DOM interactions" },
    { month: "Month 3", title: "Advanced JavaScript & APIs", topics: [{ id: "web-3-1", name: "Fetch API & AJAX", hours: "10-12", difficulty: "Intermediate" }, { id: "web-3-2", name: "Local Storage & Session Storage", hours: "6-8", difficulty: "Beginner" }, { id: "web-3-3", name: "Error Handling & Debugging", hours: "8-10", difficulty: "Intermediate" }, { id: "web-3-4", name: "Module Systems (ES6 Modules)", hours: "8-10", difficulty: "Intermediate" }], projects: ["Weather app with API", "Movie search application"], goals: "Master API integration and advanced JavaScript concepts" },
    { month: "Month 4", title: "React.js Fundamentals", topics: [{ id: "web-4-1", name: "React Components & JSX", hours: "15-18", difficulty: "Intermediate" }, { id: "web-4-2", name: "Props & State Management", hours: "12-15", difficulty: "Intermediate" }, { id: "web-4-3", name: "Event Handling in React", hours: "8-10", difficulty: "Intermediate" }, { id: "web-4-4", name: "React Hooks (useState, useEffect)", hours: "15-20", difficulty: "Intermediate" }], projects: ["React todo app", "Component library"], goals: "Master React fundamentals and component-based architecture" },
    { month: "Month 5", title: "Advanced React & State Management", topics: [{ id: "web-5-1", name: "Custom Hooks", hours: "10-12", difficulty: "Advanced" }, { id: "web-5-2", name: "Context API", hours: "8-10", difficulty: "Intermediate" }, { id: "web-5-3", name: "React Router", hours: "10-12", difficulty: "Intermediate" }, { id: "web-5-4", name: "Performance Optimization", hours: "12-15", difficulty: "Advanced" }], projects: ["Multi-page React app", "E-commerce frontend"], goals: "Master advanced React patterns and performance optimization" },
    { month: "Month 6", title: "Backend Development - Node.js", topics: [{ id: "web-6-1", name: "Node.js Fundamentals", hours: "12-15", difficulty: "Intermediate" }, { id: "web-6-2", name: "Express.js Framework", hours: "15-18", difficulty: "Intermediate" }, { id: "web-6-3", name: "RESTful API Design", hours: "12-15", difficulty: "Intermediate" }, { id: "web-6-4", name: "Middleware & Authentication", hours: "15-20", difficulty: "Advanced" }], projects: ["RESTful API server", "Authentication system"], goals: "Master backend development and API creation" },
    { month: "Month 7", title: "Database & Full Stack Integration", topics: [{ id: "web-7-1", name: "MongoDB & Mongoose", hours: "12-15", difficulty: "Intermediate" }, { id: "web-7-2", name: "SQL & PostgreSQL", hours: "15-18", difficulty: "Intermediate" }, { id: "web-7-3", name: "Database Design & Relationships", hours: "10-12", difficulty: "Intermediate" }, { id: "web-7-4", name: "Full Stack CRUD Operations", hours: "15-20", difficulty: "Advanced" }], projects: ["Full stack blog platform", "Social media clone"], goals: "Master database integration and full stack development" },
    { month: "Month 8", title: "DevOps & Deployment", topics: [{ id: "web-8-1", name: "Git & Version Control", hours: "8-10", difficulty: "Beginner" }, { id: "web-8-2", name: "Docker Containerization", hours: "12-15", difficulty: "Advanced" }, { id: "web-8-3", name: "Cloud Deployment (AWS/Vercel)", hours: "15-18", difficulty: "Advanced" }, { id: "web-8-4", name: "CI/CD Pipelines", hours: "10-12", difficulty: "Advanced" }], projects: ["Deploy full stack app", "Set up monitoring dashboard"], goals: "Master deployment and DevOps practices" }
];

const exampleProjects = [
    { title: "E-Commerce MERN", description: "Online store with product listings, cart, and JWT auth.", roadmap: "Web Dev", technologies: ["React", "Node.js", "MongoDB"] },
    { title: "Pathfinding Visualizer", description: "Visualizes Dijkstra's and A* algorithms on a dynamic grid.", roadmap: "DSA", technologies: ["JavaScript", "React", "Canvas"] },
    { title: "Task Scheduler", description: "Priority-based scheduler using Min-Heaps for efficiency.", roadmap: "DSA", technologies: ["TypeScript", "Heaps", "DS"] },
    { title: "Social Dashboard", description: "Responsive user metrics dashboard with real-time Firebase sync.", roadmap: "Web Dev", technologies: ["React", "Firebase", "Tailwind"] }
];

const roadmapsData: Record<string, any> = {
    dsa: { title: "DSA_ARCHIVE", data: dsaRoadmap, icon: Brain },
    webdev: { title: "WEB_FULLSTACK", data: webDevRoadmap, icon: Code },
};

const getStatusStyle = (val: string) => {
    switch (val) {
        case "Advanced": return 'text-cyan-400 border-cyan-900/50 bg-cyan-900/10';
        case "Intermediate": return 'text-blue-400 border-blue-900/50 bg-blue-900/10';
        default: return 'text-slate-500 border-slate-800 bg-slate-900/20';
    }
};

const RoadmapsPage = () => {
    const router = useRouter();
    const [selectedRoadmap, setSelectedRoadmap] = useState("dsa");
    const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentRoadmapData = roadmapsData[selectedRoadmap]?.data || [];

    const completionPercentage = useMemo(() => {
        const totalItems = currentRoadmapData.reduce((acc: number, month: any) => acc + month.topics.length, 0);
        if (totalItems === 0) return 0;
        const completedCount = currentRoadmapData.reduce((acc: number, month: any) => acc + month.topics.filter((t: any) => completedItems.has(t.id)).length, 0);
        return Math.round((completedCount / totalItems) * 100);
    }, [completedItems, currentRoadmapData]);

    const toggleCompletion = (itemId: string) => {
        const newCompleted = new Set(completedItems);
        if (newCompleted.has(itemId)) newCompleted.delete(itemId);
        else newCompleted.add(itemId);
        setCompletedItems(newCompleted);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors group">
                            <span className="inline-block group-hover:-translate-x-1 transition-transform">{"<"}</span> BACK_PROTOCOL
                        </button>
                        <div className="h-6 w-px bg-slate-800 mx-2" />
                        <Link href="/" className="group flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
                            <span className="text-sm font-black text-white uppercase tracking-tighter">ROADMAP_CORE</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
                        <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest uppercase">System_Sync_Active</span>
                    </div>
                </div>
            </header>

            {/* CONTROL DECK */}
            <div className="bg-slate-900/30 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-sm">
                <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col lg:flex-row gap-8 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                        {Object.entries(roadmapsData).map(([key, { title }]) => (
                            <button key={key} onClick={() => setSelectedRoadmap(key)} className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all border ${selectedRoadmap === key ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-blue-600/50'}`}>
                                {title}
                            </button>
                        ))}
                    </div>
                    <div className="w-full lg:w-96 space-y-2">
                        <div className="flex justify-between text-[9px] font-mono text-blue-500 uppercase"><span>Execution_Progress</span><span>{completionPercentage}%</span></div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${completionPercentage}%` }} /></div>
                    </div>
                </div>
            </div>

            <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
                
                {/* 1. TIMELINE */}
                <div className="space-y-16 mb-32">
                    {currentRoadmapData.map((month: any, idx: number) => (
                        <div key={idx} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-1 flex lg:flex-col items-center">
                                <div className="w-12 h-12 border border-slate-800 bg-slate-950 flex items-center justify-center font-mono text-blue-500 text-xs">{idx + 1}</div>
                                <div className="flex-grow w-px bg-slate-800 my-4 hidden lg:block" />
                            </div>
                            <div className="lg:col-span-11 group border border-slate-800 bg-slate-900/20 p-8 hover:border-blue-600/30 transition-all relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-6">
                                    <div><span className="text-[10px] font-mono text-blue-500 uppercase">{month.month}</span><h2 className="text-2xl font-black text-white uppercase mt-1">{month.title}</h2></div>
                                    <div className="text-[10px] font-mono text-slate-500 max-w-md italic">{month.goals}</div>
                                </div>
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-mono text-slate-400 uppercase mb-4 flex items-center gap-2"><Layers className="w-3 h-3 text-blue-500" /> Topic_Modules</h4>
                                        {month.topics.map((topic: any) => (
                                            <div key={topic.id} onClick={() => toggleCompletion(topic.id)} className="flex items-center justify-between p-4 bg-[#020617] border border-slate-800 cursor-pointer hover:border-blue-900">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-4 h-4 border ${completedItems.has(topic.id) ? 'bg-blue-600 border-blue-600' : 'border-slate-700'}`}>{completedItems.has(topic.id) && <CheckCircle className="w-3 h-3 text-white" />}</div>
                                                    <span className={`text-xs font-mono ${completedItems.has(topic.id) ? 'text-slate-600 line-through' : 'text-slate-300'}`}>{topic.name}</span>
                                                </div>
                                                <span className={`text-[8px] font-mono px-2 py-0.5 border ${getStatusStyle(topic.difficulty)}`}>{topic.difficulty.toUpperCase()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] font-mono text-slate-400 uppercase mb-4 flex items-center gap-2"><Activity className="w-3 h-3 text-blue-500" /> Practice_Labs</h4>
                                        {month.projects.map((project: string, pIdx: number) => (
                                            <div key={pIdx} className="p-4 bg-slate-900/40 border-l-2 border-blue-600/50 flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /><span className="text-[10px] font-mono text-slate-300 uppercase">{project}</span></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. AI ROADMAP GENERATORS SECTION */}
                <section className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-grow bg-slate-800" />
                        <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">External_AI_Protocols</h2>
                        <div className="h-px flex-grow bg-slate-800" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aiGenerators.map((gen, idx) => (
                            <div key={idx} className="p-6 bg-slate-900/20 border border-slate-800 group hover:border-blue-600/50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <Bot className="w-5 h-5 text-blue-500" />
                                    <span className="text-[8px] font-mono text-slate-500 border border-slate-800 px-2 py-0.5">{gen.type}</span>
                                </div>
                                <h3 className="text-white font-bold text-sm uppercase mb-2 group-hover:text-blue-400">{gen.name}</h3>
                                <p className="text-[10px] text-slate-400 font-mono mb-6 leading-relaxed">{gen.desc}</p>
                                <a href={gen.link} target="_blank" className="text-[9px] font-mono text-blue-500 flex items-center gap-2 hover:underline">ACCESS_TOOL <ExternalLink className="w-3 h-3" /></a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 bg-blue-900/5 border border-blue-900/20">
                        <h4 className="text-[10px] font-mono text-blue-500 uppercase mb-4 flex items-center gap-2"><Zap className="w-3 h-3" /> AUXILIARY_TOOLS</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {manualTools.map((tool, idx) => (
                                <div key={idx}>
                                    <h5 className="text-white text-[11px] font-bold uppercase mb-1">{tool.name}</h5>
                                    <p className="text-[10px] text-slate-500 font-mono mb-2">{tool.desc}</p>
                                    <a href={tool.link} target="_blank" className="text-[8px] font-mono text-blue-700 hover:text-blue-400 transition-colors">INITIATE_SESSION</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. CAPSTONE PROTOCOLS (NO IMAGES) */}
                <section>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-px flex-grow bg-slate-800" />
                        <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Capstone_Protocols</h2>
                        <div className="h-px flex-grow bg-slate-800" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {exampleProjects.map((project, idx) => (
                            <div key={idx} className="group relative bg-slate-900/40 border border-slate-800 flex flex-col hover:border-blue-600/50 transition-all p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-blue-600/10 border border-blue-900/50 flex items-center justify-center">
                                        <Cpu className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <span className="text-[8px] font-mono text-blue-500 border border-blue-900 px-2 py-0.5">NODE_CAP_{800+idx}</span>
                                </div>
                                <h3 className="font-bold text-white text-lg uppercase tracking-tight mb-2">{project.title}</h3>
                                <p className="text-xs text-slate-400 font-mono border-l border-slate-800 pl-4 mb-6 leading-relaxed">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.technologies.map(tech => <span key={tech} className="text-[8px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-500 uppercase">{tech}</span>)}
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-auto">
                                    <button className="flex items-center justify-center gap-2 py-2 border border-slate-800 text-[10px] font-mono hover:bg-slate-800 transition-colors uppercase"><Github className="w-3 h-3" /> SOURCE</button>
                                    <button className="flex items-center justify-center gap-2 py-2 bg-blue-600 text-white text-[10px] font-mono hover:bg-blue-500 transition-colors uppercase"><ExternalLink className="w-3 h-3" /> EXECUTE</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
                CKR.ROADMAP_CORE // DATA_ARCHIVE_2025
            </footer>
        </div>
    );
};

export default RoadmapsPage;