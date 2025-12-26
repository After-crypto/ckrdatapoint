"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Terminal, Github, ArrowUpRight, Hash, Eye, 
    Layers, Activity, Cpu, Zap 
} from "lucide-react";

// --- DATA SETS (Safe and Validated) ---
const aimlDeptProjects = [
  { sno: 1, title: "Sponge Attack ... Data Poisoning", gitLink: "Cinofix/sponge_poisoning", devResources: "Sponge attack paper and repo", aiTools: "Gemini, Claude, Fire Studio" },
  { sno: 2, title: "Explainable Data‑Driven Digital Twins ... Battery States", gitLink: "(No public code)", devResources: "XAI applied digital twin paper", aiTools: "Claude, Gemini" },
  { sno: 3, title: "Revolutionizing Agriculture: ML & DL Solutions for Crop Quality", gitLink: "(No public code)", devResources: "Agri‑DL tutorials, UNet/segmentation", aiTools: "Lovable, Gemini" },
  { sno: 4, title: "Ensemble DL Model for Vehicular Engine Health Prediction", gitLink: "(No public code)", devResources: "Predictive maintenance ML papers", aiTools: "Gemini, Cursor" },
  { sno: 5, title: "Web Attack Vulnerabilities: MITM & Session Hijacking", gitLink: "(No public code)", devResources: "OWASP MITM guides and ML anomaly detection", aiTools: "Claude, Bolt" },
  { sno: 6, title: "Criminal Evidence Management Using Blockchain", gitLink: "(No public code)", devResources: "Blockchain evidence chain frameworks", aiTools: "Gemini, Cursor" },
  { sno: 7, title: "Customer Behaviour Analysis with AI Recommendations", gitLink: "(No public code)", devResources: "Customer recommender tutorials", aiTools: "Lovable, Claude" },
  { sno: 8, title: "Fake News Detection Using Feature‑Based Optimized MSVM", gitLink: "nishitpatel01/Fake_News_Detection", devResources: "Fake news classification ML pipelines", aiTools: "Gemini, Cursor, Claude" },
  { sno: 9, title: "AI‑Based Financial Identification Based on Demography & Economics", gitLink: "(No public code)", devResources: "Credit scoring ML frameworks", aiTools: "Gemini, Claude" },
  { sno: 10, title: "Centralized Application‑Context Aware Firewall", gitLink: "(No public code)", devResources: "Context-aware firewall research", aiTools: "Claude, Bolt" },
  { sno: 11, title: "Hybrid AI for Stock Markets: Transformers & Q‑Learning", gitLink: "(No public code)", devResources: "Transformer-based forecasting + RL trading", aiTools: "Gemini, Fire Studio" },
  { sno: 12, title: "Authentication & Key Agreement Using Anonymous Identity for P2P Cloud", gitLink: "(No public code)", devResources: "ZKP and credential systems research", aiTools: "Claude, Cursor" },
  { sno: 13, title: "Paper Evaluation Using AI", gitLink: "(No public code)", devResources: "NLP similarity, summarization methods", aiTools: "Claude, GitHub Copilot" },
  { sno: 14, title: "Quantum Resistance Blockchain for Secure Health Data", gitLink: "(No public code)", devResources: "Post‑quantum blockchain literature", aiTools: "Gemini, Cursor" },
  { sno: 15, title: "Enhancing Sanskrit Isolated Word Recognition", gitLink: "(No public code)", devResources: "ASR for Sanskrit datasets", aiTools: "Lovable, Gemini" },
  { sno: 16, title: "Decentralized Examination Platform for Secure Question Papers", gitLink: "(No public code)", devResources: "Secure exam blockchain platforms", aiTools: "Claude, Cursor" },
  { sno: 17, title: "SMS Spam Detection & URL Malicious Classification", gitLink: "shrudex/sms-spam-detection", devResources: "Streamlit-based SMS spam ML", aiTools: "Claude, Gemini, Cursor" },
  { sno: 18, title: "DL-Based Spectrum Sensing for Cognitive Radio Applications", gitLink: "(No public code)", devResources: "DL classification for radio signals", aiTools: "Gemini, Fire Studio" },
  { sno: 19, title: "Multi-Modal Speech Transformer Decoders", gitLink: "(No public code)", devResources: "Audio-text multimodal transformers", aiTools: "Claude, Gemini" },
  { sno: 20, title: "Stock Market Prediction via Multi-Source Multiple Instance Learning", gitLink: "(No public code)", devResources: "MIL for time series + news embedding methods", aiTools: "Gemini, Fire Studio" },
  { sno: 21, title: "Explainable AI for Military Supply Chain Optimization Using SAR Images", gitLink: "(No public code)", devResources: "SAR imagery + XAI Grad-CAM papers", aiTools: "Claude, Cursor" },
  { sno: 22, title: "SymptotrackAI: Hybrid RAG Chatbot for Symptom Monitoring", gitLink: "(No public code)", devResources: "RAG chatbot design with medical dataset", aiTools: "Claude, Gemini, Bolt" },
  { sno: 23, title: "Telugu Text Summarization Using Extractive Method", gitLink: "(No public code)", devResources: "Telugu-BERT summarization resources", aiTools: "Gemini, Claude" },
  { sno: 24, title: "Water Scarcity Management via Centralized Knowledge-Sharing Platform", gitLink: "(No public code)", devResources: "Water forecasting, dashboard frameworks", aiTools: "Lovable, Claude" },
  { sno: 25, title: "Smart Campus Placement System Using Machine Learning", gitLink: "(No public code)", devResources: "Student placement ML tutorials", aiTools: "Gemini, Cursor" },
  { sno: 26, title: "Protein Family Classification Using Deep Learning", gitLink: "(No public code)", devResources: "Bioinformatics deep learning pipelines", aiTools: "Claude, Gemini" },
  { sno: 27, title: "AI & ML Pet Feeding System Using Image Processing", gitLink: "(No public code)", devResources: "Object detection (YOLO) and IoT embedding", aiTools: "Bolt, Fire Studio" },
  { sno: 28, title: "Detecting AI‑Generated Images with CNN & Explainable AI", gitLink: "(No public code)", devResources: "GAN detection XAI frameworks", aiTools: "Claude, Gemini" },
  { sno: 29, title: "Colorectal Cancer Detection Using Ensemble Pre‑Trained Algorithms", gitLink: "Dimnir/CancerClassification", devResources: "Colorectal histology ensemble models", aiTools: "Gemini, Claude, Cursor" },
  { sno: 30, title: "Personalized E‑Learning Course Recommendation System", gitLink: "(No public code)", devResources: "Recommendation system for e-learning tutorials", aiTools: "Gemini, Lovable" }
];

const allTemplates = [
   // Landing Pages
  { id: 5, title: "SaaS Landing Page", author: "Cruip", category: "Landing Page", description: "A free, modern landing page template for SaaS products, built with Tailwind CSS and React.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/cruip/open-react-template", demoUrl: "https://open-react-template.cruip.com/", tags: ["React", "Tailwind CSS"] },
  { id: 6, title: "AstroWind", author: "onWidget", category: "Landing Page", description: "Production-ready template for marketing websites built with Astro and Tailwind CSS.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/onwidget/astrowind", demoUrl: "https://astrowind.vercel.app/", tags: ["Astro", "Tailwind CSS"] },
  { id: 11, title: "Next.js SaaS Stripe Starter", author: "mickasmt", category: "Landing Page", description: "A starter kit to build a SaaS with Next.js, and manage payments with Stripe.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/mickasmt/next-saas-stripe-starter", demoUrl: "https://next-saas-stripe-starter.vercel.app/", tags: ["Next.js", "Stripe", "Prisma"] },
  { id: 12, title: "Simple Landing Page", author: "tuanphungcz", category: "Landing Page", description: "A clean landing page template built with basic HTML, CSS, and JavaScript.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/tuanphungcz/simple-landing-page", demoUrl: "https://tuanphungcz.github.io/simple-landing-page/", tags: ["HTML5", "CSS3", "JS"] },
  { id: 14, title: "Agency Website Template", author: "cruip", category: "Landing Page", description: "A stunning and professional website template for creative agencies and studios.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/cruip/open-purpose-template", demoUrl: "https://open-purpose-template.cruip.com/", tags: ["HTML5", "Tailwind CSS"] },
  
  // E-commerce
  { id: 15, title: "Next.js Commerce", author: "Vercel", category: "E-commerce", description: "The all-in-one starter kit for high-performance e-commerce sites.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/vercel/commerce", demoUrl: "https://demo.vercel.store/", tags: ["Next.js", "Headless"] },
  { id: 16, title: "Next.js Starter by Medusa", author: "Medusa.js", category: "E-commerce", description: "A production-ready Next.js starter for building a storefront with Medusa.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/medusajs/nextjs-starter-medusa", demoUrl: "https://next.medusajs.com/", tags: ["Next.js", "Medusa", "Stripe"] },
  { id: 17, title: "Hydrogen", author: "Shopify", category: "E-commerce", description: "Shopify's official React-based framework for building custom, headless storefronts.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/Shopify/hydrogen", demoUrl: "https://hydrogen.shopify.dev/", tags: ["React", "Shopify API", "Vite"] },
  { id: 18, title: "React Storefront", author: "Saleor", category: "E-commerce", description: "A GraphQL-first, high-performance e-commerce storefront for the Saleor platform.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/saleor/react-storefront", demoUrl: "https://react-storefront.saleor.io/", tags: ["Next.js", "GraphQL", "Saleor"] },
  { id: 24, title: "Next.js Boilerplate", author: "Teespring", category: "E-commerce", description: "An opinionated boilerplate for Next.js, featuring TypeScript, Redux, and more.",image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg",  githubUrl: "https://github.com/Teespring/nextjs-boilerplate", demoUrl: "https://github.com/Teespring/nextjs-boilerplate", tags: ["Next.js", "Redux", "TypeScript"] },

  // Portfolios
  { id: 2, title: "Spotlight", author: "Code-the-World", category: "Portfolio", description: "A sleek, dark-themed portfolio template for developers to showcase their projects.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/Code-the-World/Spotlight", demoUrl: "https://spotlight-dev.vercel.app/", tags: ["Next.js", "Framer Motion"] },
  { id: 4, title: "Minimal Portfolio", author: "Sridhar-C-25", category: "Portfolio", description: "An elegant portfolio that focuses on typography and content to make your work shine.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/sridhar-c-25/minimal-portfolio-website", demoUrl: "https://sridhar-c-25.github.io/minimal-portfolio-website/", tags: ["HTML5", "CSS3", "JS"] },
  { id: 20, title: "Portfolio Template", author: "Braydon Coyer", category: "Portfolio", description: "A highly polished personal portfolio template built with Next.js and Sanity CMS.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/braydoncoyer/portfolio-template", demoUrl: "https://braydoncoyer.dev/", tags: ["Next.js", "Sanity"] },
  { id: 21, title: "Portfolio v2", author: "Savio Martin", category: "Portfolio", description: "A stunning portfolio website built with Astro, featuring smooth animations.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/saviomartin/portfolio-v2", demoUrl: "https://v2.saviomartin.com/", tags: ["Astro", "Animations"] },
  { id: 22, title: "React Portfolio", author: "Chetan Verma", category: "Portfolio", description: "A modern and responsive portfolio template built with React and featuring a beautiful UI.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/chetanverma16/react-portfolio-template", demoUrl: "https://chetanverma.com/", tags: ["React", "Styled Comp."] },

  // Dashboards & Blogs
  { id: 1, title: "Taxonomy", author: "Vercel", category: "Dashboard", description: "An open-source app built with everything new in Next.js 13. A great starting point.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/vercel/taxonomy", demoUrl: "https://taxonomy.vercel.app/", tags: ["Next.js", "Auth"] },
  { id: 8, title: "Next.js Starter Blog", author: "timlrx", category: "Blog", description: "A feature-packed starter blog with MDX, search, and themes for content creators.", image: "https://www.bleepstatic.com/content/hl-images/2022/04/08/GitHub__headpic.jpg", githubUrl: "https://github.com/timlrx/tailwind-nextjs-starter-blog", demoUrl: "https://tailwind-nextjs-starter-blog.vercel.app/", tags: ["Next.js", "MDX"] },
];

const filterCategories = ["All", "Landing Page", "Portfolio", "E-commerce", "Dashboard"];

const ResourceMatrixPage = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTemplates = activeFilter === "All"
    ? allTemplates
    : allTemplates.filter(t => t.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* 1. SYSTEM HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="px-3 py-1.5 border border-slate-800 hover:border-blue-500 hover:text-blue-400 text-[10px] font-mono transition-colors"
            >
              {"<"} BACK_PROTOCOL
            </button>
            <div className="h-6 w-px bg-slate-800 mx-2" />
            <Link href="/" className="group flex items-center gap-3">
               <div className="w-8 h-8 bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">CKR</div>
               <span className="text-sm font-black text-white uppercase tracking-tighter">RESOURCE_MATRIX</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Vault_Active</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
        
        {/* HERO SECTION */}
        <section className="text-center mb-24">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                DEVELOPMENT_VAULT
            </h1>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
                Project logs and code templates for the 2025 update stream.
            </p>
        </section>

        {/* 2. PROJECT LOGS (FIXED REPLACEMENT ERROR) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Project_Archive</h2>
                <div className="h-px flex-grow bg-slate-800" />
            </div>
            
            <div className="border border-slate-800 bg-slate-900/20 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800 bg-slate-900/40 text-[9px] font-mono text-slate-500 uppercase">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-5">Title</div>
                    <div className="col-span-2">Source</div>
                    <div className="col-span-4">Stack</div>
                </div>
                <div className="divide-y divide-slate-800/50 font-mono">
                    {aimlDeptProjects.map((p) => (
                        <div key={p.sno} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-blue-600/5 transition-colors">
                            <div className="col-span-1 text-[10px] text-slate-600">{p.sno < 10 ? `0${p.sno}` : p.sno}</div>
                            
                            <div className="col-span-5 text-[11px] font-bold text-white uppercase">
                                {p.title?.replace(/\s/g, '_') || "UNTITLED_PROJECT"}
                            </div>

                            <div className="col-span-2">
                                <span className={`text-[9px] border px-2 py-0.5 uppercase tracking-tighter ${p.gitLink?.includes("(No public code)") ? "text-slate-500 border-slate-800" : "text-blue-500 border-blue-900"}`}>
                                    {p.gitLink?.includes("(No public code)") ? "Private" : "Public"}
                                </span>
                            </div>
                            <div className="col-span-4 text-[9px] text-slate-500 uppercase">
                                {p.aiTools || "NOT_LISTED"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 3. TEMPLATE VAULT */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">Code_Templates</h2>
                <div className="h-px flex-grow bg-slate-800" />
            </div>

            <div className="flex flex-wrap gap-3 mb-12 justify-center">
                {filterCategories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-2 text-[10px] font-mono uppercase tracking-widest border transition-all ${
                            activeFilter === cat 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((item) => (
                    <div key={item.id} className="group relative bg-slate-900/40 border border-slate-800 p-6 hover:border-blue-600/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[8px] font-mono px-2 py-0.5 border border-blue-900 text-blue-500 uppercase">
                                {item.category}
                            </span>
                        </div>
                        <h3 className="text-[13px] font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-400">
                            {item.title}
                        </h3>
                        <p className="text-[10px] font-mono text-slate-500 leading-relaxed mb-6 border-l border-slate-800 pl-4">
                            {item.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                            <a href={item.githubUrl} className="flex items-center justify-center gap-2 py-2 border border-slate-800 text-[9px] font-mono text-slate-400 hover:bg-slate-800 uppercase">
                                <Github className="w-3 h-3" /> Source
                            </a>
                            <a href={item.demoUrl} className="flex items-center justify-center gap-2 py-2 bg-blue-600 text-white text-[9px] font-mono uppercase hover:bg-blue-500">
                                <Eye className="w-3 h-3" /> Demo
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // 2025
      </footer>
    </div>
  );
};

export default ResourceMatrixPage;