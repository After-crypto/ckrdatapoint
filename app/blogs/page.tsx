"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Data (Keeping the full list for context, showing a few as a reminder) ---
const blogPosts = [
  {
    title: "React 19 Features That Will Change How You Code",
    author: "Dan Abramov",
    readTime: "8 min read",
    category: "React",
    date: "Aug 15, 2025",
    description: "Explore the revolutionary features in React 19 including automatic batching, concurrent features, and the new use hook.",
    tags: ["React", "JavaScript", "Frontend"],
    url: "https://react.dev/blog/2024/04/25/react-19"
  },
  {
    title: "The Future of TypeScript: What's Coming in 2025",
    author: "Anders Hejlsberg",
    readTime: "12 min read",
    category: "TypeScript",
    date: "Jul 28, 2025",
    description: "A deep dive into TypeScript's roadmap with new features like explicit resource management and improved inference.",
    tags: ["TypeScript", "JavaScript", "Development"],
    url: "https://devblogs.microsoft.com/typescript/"
  },
  {
    title: "Building Scalable Applications with Next.js 15",
    author: "Vercel Team",
    readTime: "15 min read",
    category: "Next.js",
    date: "Jul 10, 2025",
    description: "Learn about Next.js 15's new features including partial prerendering, improved caching, and better developer experience.",
    tags: ["Next.js", "React", "Full-stack"],
    url: "https://nextjs.org/blog"
  },
  {
    title: "State Management in 2025: Beyond Redux",
    author: "Kent C. Dodds",
    readTime: "10 min read",
    category: "State Management",
    date: "Jun 22, 2025",
    description: "Exploring modern state management solutions including Zustand, Jotai, and the latest patterns in React.",
    tags: ["State Management", "React", "Architecture"],
    url: "https://kentcdodds.com/blog"
  },
  {
    title: "CSS Container Queries: The Game Changer",
    author: "Una Kravets",
    readTime: "9 min read",
    category: "CSS",
    date: "May 18, 2025",
    description: "How container queries are revolutionizing responsive design and component-based styling approaches.",
    tags: ["CSS", "Responsive Design", "Frontend"],
    url: "https://web.dev/new-responsive/"
  },
  {
    title: "Mastering Web Performance in 2025",
    author: "Addy Osmani",
    readTime: "14 min read",
    category: "Performance",
    date: "Apr 30, 2025",
    description: "Advanced techniques for optimizing web performance including Core Web Vitals, lazy loading, and modern bundling.",
    tags: ["Performance", "Web Vitals", "Optimization"],
    url: "https://web.dev/articles/optimize-lcp"
  },
  {
    title: "The Rise of Edge Computing in Web Development",
    author: "Guillermo Rauch",
    readTime: "11 min read",
    category: "Edge Computing",
    date: "Mar 25, 2025",
    description: "Understanding edge computing benefits and how to leverage edge functions for better user experiences.",
    tags: ["Edge Computing", "Serverless", "Performance"],
    url: "https://vercel.com/blog"
  },
  {
    title: "AI-Powered Development Tools That Actually Work",
    author: "GitHub Team",
    readTime: "13 min read",
    category: "AI Tools",
    date: "Feb 14, 2025",
    description: "A comprehensive review of AI coding assistants, automated testing tools, and productivity enhancers for developers.",
    tags: ["AI", "Developer Tools", "Productivity"],
    url: "https://github.blog/2024-01-09-github-copilot-in-2024-a-year-of-growth-and-evolution/"
  },
  {
    title: "Security Best Practices for Modern Web Apps",
    author: "Troy Hunt",
    readTime: "16 min read",
    category: "Security",
    date: "Jan 28, 2025",
    description: "Essential security practices including HTTPS, CSP, authentication patterns, and protecting against modern threats.",
    tags: ["Security", "Web Security", "Best Practices"],
    url: "https://www.troyhunt.com/"
  },
  {
    title: "The Evolution of JavaScript Frameworks in 2025",
    author: "Evan You",
    readTime: "12 min read",
    category: "JavaScript",
    date: "Jan 10, 2025",
    description: "Comparing Vue 3.4, React 19, Svelte 5, and emerging frameworks, discussing their strengths and use cases.",
    tags: ["JavaScript", "Frameworks", "Vue", "React"],
    url: "https://blog.vuejs.org/"
  }
];


const FilterPill = ({ label, active, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      relative group px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-all border
      ${active 
        ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
        : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:border-blue-600/50 hover:text-white'}
    `}
  >
    <div className="flex items-center gap-2">
      <span className={`w-1.5 h-1.5 bg-white rounded-full transition-opacity ${active ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
      {label}
    </div>
  </button>
);

const BlogsPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allCategories = useMemo(() => {
    return ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))].sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);
  
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : (filteredPosts.length === 1 ? [] : []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-900 selection:text-white flex flex-col">
      
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
               <span className="text-sm font-black text-white uppercase tracking-tighter">CKR.DATAPOINT</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Archive_Live</span>
          </div>
        </div>
      </header>

      {/* 2. CONTROL DECK */}
      <div className="bg-slate-900/30 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-sm">
         <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
            <div className="relative w-full xl:w-96 group">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-blue-500">QUERY:</span>
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH_ARTICLES..." 
                  className="w-full bg-[#020617] border border-slate-800 py-3 pl-16 pr-4 text-xs font-mono text-white focus:outline-none focus:border-blue-600 transition-colors uppercase placeholder:text-slate-700"
               />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
               <select
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value)}
                   className="bg-[#020617] border border-slate-800 py-2 px-4 text-[10px] font-mono uppercase text-slate-400 focus:border-blue-600 outline-none"
               >
                   {allCategories.map(c => <option key={c} value={c}>{c === "All" ? "CATEGORY: ALL" : c.toUpperCase()}</option>)}
               </select>
            </div>
         </div>
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        {/* Featured Post */}
        {featuredPost && (
            <div className="group relative bg-slate-900/40 border border-blue-600/50 mb-8 flex flex-col md:flex-row hover:border-blue-500 transition-all duration-300 overflow-hidden">
                <div className="md:w-1/3 p-8 bg-blue-900/10 border-r border-slate-800 flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] font-mono text-blue-400 border border-blue-600 px-2 py-1 uppercase">Featured_Intel</span>
                    </div>
                    <div className="mt-8">
                        <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Timestamp</p>
                        <span className="text-sm font-bold text-white font-mono">{featuredPost.date}</span>
                    </div>
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-black text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                            {featuredPost.title}
                        </h2>
                        <p className="text-slate-400 text-sm mb-6 font-mono border-l border-slate-800 pl-4 leading-relaxed">
                            {featuredPost.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex gap-6 text-[9px] font-mono text-slate-500 uppercase">
                            <span>Author: {featuredPost.author}</span>
                            <span>Time: {featuredPost.readTime}</span>
                        </div>
                        <a href={featuredPost.url} className="px-4 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors">
                            Initialize &raquo;
                        </a>
                    </div>
                </div>
            </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {regularPosts.map((post, idx) => (
                <div key={idx} className="group relative bg-slate-900/40 border border-slate-800 flex flex-col hover:border-blue-600/50 transition-all duration-300">
                    <div className="flex justify-between items-center p-4 border-b border-slate-800/50 bg-slate-900/20 text-[9px] font-mono text-slate-500 uppercase">
                        <span>{post.category}</span>
                        <span>{post.date}</span>
                    </div>
                    <div className="p-6 flex-grow">
                        <h3 className="font-bold text-white text-base leading-tight mb-3 group-hover:text-blue-400 transition-colors uppercase">
                            {post.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono border-l border-slate-800 pl-4 line-clamp-3 mb-6">
                            {post.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(t => (
                                <span key={t} className="text-[9px] font-mono px-2 py-0.5 border border-slate-800 text-slate-500 bg-slate-950">
                                    #{t.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="px-6 py-4 border-t border-slate-800/50 flex justify-between items-center bg-slate-900/20">
                        <span className="text-[9px] font-mono text-slate-600 uppercase">READ_TIME: {post.readTime}</span>
                        <a href={post.url} className="text-[10px] font-bold uppercase tracking-widest text-blue-400 hover:text-white transition-colors">
                            Open &raquo;
                        </a>
                    </div>
                </div>
            ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
            <div className="w-full h-[40vh] flex flex-col items-center justify-center border border-dashed border-slate-800">
                <span className="text-blue-500 text-2xl font-mono mb-4">404</span>
                <h3 className="text-xs font-mono text-slate-500 uppercase">No Archive Matching Query</h3>
                <button onClick={() => {setSearchQuery(""); setSelectedCategory("All");}} className="mt-4 text-[9px] font-mono text-blue-400 underline uppercase">Reset</button>
            </div>
        )}
      </main>

      {showBackToTop && (
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="fixed bottom-8 right-8 w-10 h-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50">
          ^
        </button>
      )}

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // INSIGHTS_MODULE // 2025
      </footer>
    </div>
  );
};

export default BlogsPage;