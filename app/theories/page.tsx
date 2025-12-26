"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    BookOpen, Clock, Brain, Cpu, Zap, Lightbulb, CheckCircle, 
    BrainCircuit, Atom, Network, Terminal, ArrowUp, ArrowUpRight, Hash, Layers 
} from "lucide-react";

// --- DATA SETS (PRESERVED) ---
const theoryCategories = [
    {
      category: "First Year - Foundations",
      icon: Atom,
      theories: [
       { id: "set-theory", title: "Set Theory and Mathematical Logic", description: "Fundamental concepts of sets, relations, functions, and logical reasoning", difficulty: "Beginner", readTime: "45 min", applications: "Database design, Programming logic", year: "1st Year" },
        { id: "number-theory", title: "Number Theory Fundamentals", description: "Prime numbers, modular arithmetic, and cryptographic applications", difficulty: "Intermediate", readTime: "50 min", applications: "Cryptography, Computer Security", year: "1st Year" },
        { id: "linear-algebra", title: "Linear Algebra Theory", description: "Vector spaces, matrices, eigenvalues, and linear transformations", difficulty: "Intermediate", readTime: "60 min", applications: "Computer Graphics, Machine Learning", year: "1st Year" },
        { id: "calculus-engineering", title: "Calculus in Engineering", description: "Differential and integral calculus applications in engineering problems", difficulty: "Intermediate", readTime: "55 min", applications: "Signal Processing, Control Systems", year: "1st Year" },
        { id: "physics-computation", title: "Physics of Computation", description: "Physical principles underlying computational processes and electronic devices", difficulty: "Beginner", readTime: "40 min", applications: "Hardware Design, Quantum Computing", year: "1st Year" },
        { id: "chemistry-materials", title: "Chemistry in Materials Science", description: "Chemical bonding, properties of materials used in computing systems", difficulty: "Beginner", readTime: "35 min", applications: "Semiconductor Design, Battery Technology", year: "1st Year" },
        { id: "boolean-algebra", title: "Boolean Algebra Theory", description: "Fundamental operations, laws, and simplification techniques", difficulty: "Beginner", readTime: "40 min", applications: "Digital Circuit Design, Logic Gates", year: "1st Year" }
      ]
    },
    {
      category: "Second Year - CS Fundamentals",
      icon: Cpu,
      theories: [
        { id: "computational-complexity", title: "Computational Complexity Theory", description: "Study of P vs NP problems, complexity classes, and algorithmic efficiency analysis", difficulty: "Advanced", readTime: "75 min", applications: "Algorithm Design, Optimization", year: "2nd Year" },
        { id: "automata-theory", title: "Automata Theory", description: "Finite state machines, regular expressions, context-free grammars, and formal languages", difficulty: "Intermediate", readTime: "65 min", applications: "Compiler Design, Pattern Matching", year: "2nd Year" },
        { id: "graph-theory", title: "Graph Theory Applications", description: "Mathematical study of graphs, algorithms for connectivity, shortest paths, and network analysis", difficulty: "Intermediate", readTime: "70 min", applications: "Social Networks, Route Planning", year: "2nd Year" },
        { id: "information-theory", title: "Information Theory", description: "Entropy, data compression, error correction, and information transmission principles", difficulty: "Advanced", readTime: "60 min", applications: "Data Compression, Communication Systems", year: "2nd Year" },
        { id: "probability-computing", title: "Probability Theory in Computing", description: "Random variables, probability distributions, and stochastic processes", difficulty: "Intermediate", readTime: "55 min", applications: "Machine Learning, Statistical Analysis", year: "2nd Year" },
        { id: "digital-logic", title: "Digital Logic Design Theory", description: "Combinational and sequential circuit design principles", difficulty: "Intermediate", readTime: "50 min", applications: "Processor Design, Digital Systems", year: "2nd Year" },
        { id: "data-structure-theory", title: "Data Structure Theory", description: "Abstract data types, complexity analysis, and optimal data organization", difficulty: "Intermediate", readTime: "65 min", applications: "Database Systems, Algorithm Implementation", year: "2nd Year" },
        { id: "computer-architecture", title: "Computer Architecture Theory", description: "Von Neumann architecture, instruction sets, and processor design principles", difficulty: "Advanced", readTime: "80 min", applications: "Processor Design, System Optimization", year: "2nd Year" }
      ]
    },
    {
      category: "Third Year - Systems",
      icon: Network,
      theories: [
       { id: "solid-principles", title: "SOLID Principles", description: "Five fundamental design principles for writing maintainable and scalable object-oriented software", difficulty: "Intermediate", readTime: "45 min", applications: "Software Architecture, Code Quality", year: "3rd Year" },
        { id: "design-patterns", title: "Design Patterns Theory", description: "Reusable solutions to commonly occurring problems in software design and architecture", difficulty: "Advanced", readTime: "90 min", applications: "Framework Development, System Design", year: "3rd Year" },
        { id: "software-architecture", title: "Software Architecture Patterns", description: "High-level structural patterns including MVC, MVP, MVVM, and microservices architecture", difficulty: "Advanced", readTime: "85 min", applications: "Enterprise Applications, Web Services", year: "3rd Year" },
        { id: "database-theory", title: "Database Theory", description: "Relational algebra, normalization theory, transaction processing, and ACID properties", difficulty: "Advanced", readTime: "75 min", applications: "Database Design, Data Management", year: "3rd Year" },
        { id: "network-protocol", title: "Network Protocol Theory", description: "OSI model, TCP/IP stack, routing algorithms, and network security principles", difficulty: "Advanced", readTime: "70 min", applications: "Network Design, Internet Protocols", year: "3rd Year" },
        { id: "operating-system", title: "Operating System Theory", description: "Process management, memory allocation, file systems, and concurrent programming", difficulty: "Advanced", readTime: "80 min", applications: "System Programming, Resource Management", year: "3rd Year" },
        { id: "compiler-design", title: "Compiler Design Theory", description: "Lexical analysis, parsing, code generation, and optimization techniques", difficulty: "Advanced", readTime: "95 min", applications: "Programming Languages, Code Optimization", year: "3rd Year" },
        { id: "distributed-systems", title: "Distributed Systems Theory", description: "Consistency models, consensus algorithms, and fault tolerance in distributed computing", difficulty: "Advanced", readTime: "85 min", applications: "Cloud Computing, Blockchain", year: "3rd Year" },
        { id: "cryptography-theory", title: "Cryptography Theory", description: "Mathematical foundations of encryption, digital signatures, and security protocols", difficulty: "Advanced", readTime: "80 min", applications: "Information Security, Blockchain", year: "3rd Year" }
      ]
    },
    {
      category: "Fourth Year - Specialization",
      icon: Zap,
      theories: [
        { id: "machine-learning-theory", title: "Machine Learning Theory", description: "Statistical learning theory, bias-variance tradeoff, and generalization bounds", difficulty: "Advanced", readTime: "100 min", applications: "AI Systems, Data Science", year: "4th Year" },
        { id: "ai-foundations", title: "Artificial Intelligence Foundations", description: "Search algorithms, knowledge representation, reasoning, and planning", difficulty: "Advanced", readTime: "110 min", applications: "Expert Systems, Robotics", year: "4th Year" },
        { id: "deep-learning-theory", title: "Deep Learning Theory", description: "Neural network architectures, backpropagation, and optimization in deep networks", difficulty: "Advanced", readTime: "120 min", applications: "Computer Vision, NLP", year: "4th Year" },
        { id: "quantum-computing", title: "Quantum Computing Theory", description: "Quantum mechanics principles, quantum algorithms, and quantum supremacy", difficulty: "Expert", readTime: "130 min", applications: "Quantum Algorithms, Cryptography", year: "4th Year" },
        { id: "blockchain-theory", title: "Blockchain Technology Theory", description: "Distributed ledger technology, consensus mechanisms, and smart contracts", difficulty: "Advanced", readTime: "85 min", applications: "Cryptocurrency, Decentralized Apps", year: "4th Year" },
        { id: "computer-vision", title: "Computer Vision Theory", description: "Image processing, feature extraction, and pattern recognition algorithms", difficulty: "Advanced", readTime: "95 min", applications: "Image Analysis, Autonomous Systems", year: "4th Year" },
        { id: "nlp-theory", title: "Natural Language Processing Theory", description: "Linguistic theory, statistical models, and language understanding algorithms", difficulty: "Advanced", readTime: "90 min", applications: "Chatbots, Translation Systems", year: "4th Year" },
        { id: "game-theory", title: "Game Theory in Computing", description: "Strategic decision making, mechanism design, and algorithmic game theory", difficulty: "Advanced", readTime: "75 min", applications: "Resource Allocation, Network Security", year: "4th Year" },
        { id: "cloud-computing-theory", title: "Cloud Computing Theory", description: "Virtualization, service models, scalability, and cloud architecture patterns", difficulty: "Advanced", readTime: "80 min", applications: "Cloud Services, DevOps", year: "4th Year" },
        { id: "iot-theory", title: "Internet of Things Theory", description: "Sensor networks, edge computing, and IoT system architecture", difficulty: "Intermediate", readTime: "70 min", applications: "Smart Cities, Industrial IoT", year: "4th Year" }
      ]
    }
];

// --- HELPER STYLES ---
const getDifficultyStyle = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-slate-400 border-slate-800 bg-slate-900/20";
      case "Intermediate": return "text-blue-400 border-blue-900/50 bg-blue-900/10";
      case "Advanced": return "text-cyan-400 border-cyan-900/50 bg-cyan-900/10";
      case "Expert": return "text-purple-400 border-purple-900/50 bg-purple-900/10";
      default: return "text-slate-500 border-slate-800 bg-slate-900/20";
    }
};

const getYearStyle = (year: string) => {
    switch (year) {
      case "1st Year": return "border-slate-800 text-slate-500";
      case "2nd Year": return "border-blue-900/50 text-blue-500";
      case "3rd Year": return "border-cyan-900/50 text-cyan-500";
      case "4th Year": return "border-indigo-900/50 text-indigo-500";
      default: return "border-slate-800 text-slate-500";
    }
};

const TheoriesPage = () => {
    const router = useRouter();
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const totalTheories = theoryCategories.reduce((sum, cat) => sum + cat.theories.length, 0);

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
                            <span className="text-sm font-black text-white uppercase tracking-tighter">THEORY_VAULT</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
                        <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Archive_Live</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
                {/* HERO SECTION */}
                <div className="text-center mb-24">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
                        THEORETICAL_ARCHIVE
                    </h2>
                    <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                        Accessing core protocols. Displaying {totalTheories} verified theoretical nodes.
                    </p>
                </div>

                {/* CATEGORIES SECTION */}
                {theoryCategories.map((category, catIdx) => (
                    <section key={catIdx} className="mb-24">
                        <div className="flex items-center gap-4 mb-10">
                            <category.icon className="w-5 h-5 text-blue-500" />
                            <h2 className="text-sm font-mono text-white uppercase tracking-[0.3em]">
                                // {category.category.replace(/\s/g, '_').toUpperCase()}
                            </h2>
                            <div className="h-px flex-grow bg-slate-800" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.theories.map((theory, idx) => (
                                <div key={idx} className="group relative bg-slate-900/40 border border-slate-800 p-6 hover:border-blue-600/50 transition-all duration-300 overflow-hidden flex flex-col">
                                    {/* Hover Scanline Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />

                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`text-[8px] font-mono px-2 py-0.5 border uppercase ${getYearStyle(theory.year)}`}>
                                            {theory.year}
                                        </span>
                                        <span className="text-[9px] font-mono text-slate-700">REF_ID_{theory.id.slice(0,3).toUpperCase()}</span>
                                    </div>

                                    <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                                        {theory.title}
                                    </h3>
                                    
                                    <p className="text-[10px] font-mono text-slate-500 leading-relaxed mb-8 border-l border-slate-800 pl-4 h-12 line-clamp-2">
                                        {theory.description}
                                    </p>

                                    <div className="mt-auto space-y-4">
                                        <div className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">
                                            Main_Application: <span className="text-slate-300">{theory.applications}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center pt-4 border-t border-slate-800/50">
                                            <span className={`text-[8px] font-mono px-2 py-0.5 border ${getDifficultyStyle(theory.difficulty)}`}>
                                                {theory.difficulty.toUpperCase()}
                                            </span>
                                            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-600 uppercase">
                                                <Clock className="w-3 h-3" /> {theory.readTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {/* METHODOLOGY SECTION (THEMED BLOCK) */}
                <section className="mb-20">
                    <div className="bg-blue-600/5 border border-blue-600/20 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[80px] pointer-events-none" />
                        
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
                           <Layers className="w-5 h-5 text-blue-500" /> STUDY_METHODOLOGY
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">01_CONCEPT</h3>
                                <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase">
                                    Focus on core definitions. Don't move forward until you can explain the concept in simple English.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">02_EXECUTE</h3>
                                <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase">
                                    Turn theory into code. Implement a simple model or script to prove the math works in reality.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">03_REVIEW</h3>
                                <p className="text-[10px] font-mono text-slate-500 leading-relaxed uppercase">
                                    Use spaced repetition. Re-visit complex nodes every 7 days to ensure long-term memory storage.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {showBackToTop && (
                <button 
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className="fixed bottom-8 right-8 w-10 h-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50 transition-colors"
                >
                    ^
                </button>
            )}

            <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
                CKR.DATAPOINT // THEORY_VAULT_CORE // 2025
            </footer>
        </div>
    );
};

export default TheoriesPage;