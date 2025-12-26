"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Types ---
interface Idea {
  title: string;
  description: string;
  category: string;
  marketPotential: string;
  complexity: string;
  tags: string[];
  timeToMarket: string;
  targetAudience: string;
}

// --- Data (Keeping the full list for context, showing a few as a reminder) ---
const ideas = [ /* ... Your full list of ideas remains here ... */ 
  {
    title: "Smart Home Energy Optimizer",
    description: "AI-powered system that learns usage patterns and automatically optimizes energy consumption",
    category: "IoT & AI",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["IoT", "Machine Learning", "Energy", "Smart Home"],
    timeToMarket: "6-12 months",
    targetAudience: "Homeowners",
  },
  {
    title: "Code Review Assistant",
    description: "AI tool that provides intelligent code reviews, suggests improvements, and detects security vulnerabilities",
    category: "Developer Tools",
    marketPotential: "Very High",
    complexity: "High",
    tags: ["AI", "Code Analysis", "Security", "DevOps"],
    timeToMarket: "8-14 months",
    targetAudience: "Developers",
  },
  {
    title: "Virtual Study Buddy",
    description: "Platform connecting students for virtual study sessions with AI-powered matching and progress tracking",
    category: "EdTech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Education", "Social", "AI Matching", "Study"],
    timeToMarket: "4-8 months",
    targetAudience: "Students",
  },
  {
    title: "Sustainable Transport Router",
    description: "App that finds eco-friendly route combinations including public transport, bike-sharing, and walking",
    category: "GreenTech",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["Sustainability", "Transportation", "Mobile", "APIs"],
    timeToMarket: "3-6 months",
    targetAudience: "Eco-conscious travelers",
  },
  {
    title: "Mental Health Companion",
    description: "AI-powered mental health support app with mood tracking, personalized insights, and professional connections",
    category: "HealthTech",
    marketPotential: "Very High",
    complexity: "High",
    tags: ["Mental Health", "AI", "Healthcare", "Privacy"],
    timeToMarket: "12-18 months",
    targetAudience: "General public",
  },
  {
    title: "Local Skill Exchange Platform",
    description: "Community platform where people can trade skills and services without money, using a credit system",
    category: "Social Impact",
    marketPotential: "Medium",
    complexity: "Low",
    tags: ["Community", "Skills", "Barter", "Local"],
    timeToMarket: "2-4 months",
    targetAudience: "Local communities",
  },
  {
    title: "AR Interior Designer",
    description: "Augmented reality app for visualizing furniture and decor in real spaces before purchasing",
    category: "AR/VR",
    marketPotential: "High",
    complexity: "High",
    tags: ["AR", "Interior Design", "E-commerce", "3D"],
    timeToMarket: "10-15 months",
    targetAudience: "Homeowners",
  },
  {
    title: "Blockchain Voting System",
    description: "Secure, transparent voting platform using blockchain technology for elections and polls",
    category: "Blockchain",
    marketPotential: "Very High",
    complexity: "Very High",
    tags: ["Blockchain", "Security", "Democracy", "Transparency"],
    timeToMarket: "18-24 months",
    targetAudience: "Government & Organizations",
  },
  {
    title: "Voice-Controlled Recipe Assistant",
    description: "Smart kitchen companion that guides cooking with voice commands and ingredient recognition",
    category: "IoT",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["Voice AI", "Cooking", "Smart Kitchen", "IoT"],
    timeToMarket: "6-10 months",
    targetAudience: "Home cooks",
  },
  {
    title: "Personal Finance AI Coach",
    description: "AI-driven financial advisor that analyzes spending patterns and provides personalized money management tips",
    category: "FinTech",
    marketPotential: "Very High",
    complexity: "High",
    tags: ["AI", "Finance", "Budgeting", "Investment"],
    timeToMarket: "8-12 months",
    targetAudience: "Young professionals",
  },
  {
    title: "Pet Health Monitor",
    description: "Wearable device and app to track pet vital signs, activity, and health metrics",
    category: "PetTech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["IoT", "Health", "Pets", "Wearables"],
    timeToMarket: "8-12 months",
    targetAudience: "Pet owners",
  },
  {
    title: "Language Exchange VR",
    description: "Virtual reality platform for immersive language learning through conversation with native speakers",
    category: "EdTech",
    marketPotential: "High",
    complexity: "High",
    tags: ["VR", "Language Learning", "Social", "Education"],
    timeToMarket: "12-18 months",
    targetAudience: "Language learners",
  },
  {
    title: "Micro-Investment Game",
    description: "Gamified investment platform teaching financial literacy through small, real investments",
    category: "FinTech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Gaming", "Investment", "Education", "Finance"],
    timeToMarket: "6-9 months",
    targetAudience: "Young adults",
  },
  {
    title: "Smart Garden Assistant",
    description: "IoT system monitoring soil, weather, and plant health with automated watering and care recommendations",
    category: "AgriTech",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["IoT", "Agriculture", "Automation", "Sustainability"],
    timeToMarket: "5-8 months",
    targetAudience: "Garden enthusiasts",
  },
  {
    title: "Mood-Based Music Generator",
    description: "AI that creates personalized music based on detected emotions and environmental factors",
    category: "AI & Music",
    marketPotential: "Medium",
    complexity: "High",
    tags: ["AI", "Music", "Emotion Detection", "Personalization"],
    timeToMarket: "10-14 months",
    targetAudience: "Music lovers",
  },
  {
    title: "Collaborative Workspace VR",
    description: "Virtual reality platform for remote teams to collaborate in shared 3D workspaces",
    category: "Remote Work",
    marketPotential: "Very High",
    complexity: "Very High",
    tags: ["VR", "Collaboration", "Remote Work", "3D"],
    timeToMarket: "15-20 months",
    targetAudience: "Remote teams",
  },
  {
    title: "Habit Formation Tracker",
    description: "Psychology-based app using behavioral science to help users build and maintain healthy habits",
    category: "Wellness",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Psychology", "Habits", "Wellness", "Gamification"],
    timeToMarket: "4-7 months",
    targetAudience: "Self-improvement seekers",
  },
  {
    title: "AI-Powered Resume Builder",
    description: "Intelligent resume creation tool that adapts content based on job descriptions and industry trends",
    category: "Career Tools",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["AI", "Career", "Resume", "Job Search"],
    timeToMarket: "3-6 months",
    targetAudience: "Job seekers",
  },
  {
    title: "Smart Wardrobe Assistant",
    description: "AI-powered closet organizer that suggests outfits based on weather, events, and personal style",
    category: "Fashion Tech",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["AI", "Fashion", "Style", "Weather"],
    timeToMarket: "6-9 months",
    targetAudience: "Fashion conscious",
  },
  {
    title: "Neighborhood Safety Network",
    description: "Community-driven platform for sharing safety information and coordinating neighborhood watch activities",
    category: "Safety",
    marketPotential: "Medium",
    complexity: "Low",
    tags: ["Community", "Safety", "Social", "Location"],
    timeToMarket: "3-5 months",
    targetAudience: "Local communities",
  },
  {
    title: "Elderly Care Companion",
    description: "AI companion app for elderly users providing medication reminders, emergency alerts, and social interaction",
    category: "HealthTech",
    marketPotential: "Very High",
    complexity: "High",
    tags: ["Healthcare", "AI", "Elderly Care", "Emergency"],
    timeToMarket: "10-15 months",
    targetAudience: "Elderly & families",
  },
  {
    title: "Event Planning Assistant",
    description: "Comprehensive platform for planning events with vendor matching, budget tracking, and timeline management",
    category: "Event Management",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Events", "Planning", "Budget", "Vendor Management"],
    timeToMarket: "5-8 months",
    targetAudience: "Event planners",
  },
  {
    title: "Skill Assessment Platform",
    description: "AI-driven platform for evaluating technical and soft skills through interactive challenges and simulations",
    category: "HR Tech",
    marketPotential: "High",
    complexity: "High",
    tags: ["AI", "Skills", "Assessment", "HR"],
    timeToMarket: "8-12 months",
    targetAudience: "HR departments",
  },
  {
    title: "Local Food Discovery",
    description: "App connecting users with local food producers, farmers markets, and authentic regional cuisine",
    category: "Food Tech",
    marketPotential: "Medium",
    complexity: "Low",
    tags: ["Food", "Local", "Discovery", "Community"],
    timeToMarket: "3-6 months",
    targetAudience: "Food enthusiasts",
  },
  {
    title: "Meditation Space Finder",
    description: "Platform for finding and booking quiet spaces for meditation, yoga, and mindfulness practices",
    category: "Wellness",
    marketPotential: "Medium",
    complexity: "Low",
    tags: ["Meditation", "Wellness", "Booking", "Mindfulness"],
    timeToMarket: "2-4 months",
    targetAudience: "Wellness seekers",
  },
  {
    title: "Smart Water Quality Monitor",
    description: "IoT device and app for real-time monitoring of home water quality with health recommendations",
    category: "HealthTech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["IoT", "Health", "Water Quality", "Monitoring"],
    timeToMarket: "6-10 months",
    targetAudience: "Health-conscious families",
  },
  {
    title: "Virtual Art Gallery",
    description: "VR/AR platform for artists to showcase work in immersive digital galleries with social features",
    category: "Art & Culture",
    marketPotential: "Medium",
    complexity: "High",
    tags: ["VR", "AR", "Art", "Gallery", "Social"],
    timeToMarket: "8-12 months",
    targetAudience: "Artists & art lovers",
  },
  {
    title: "Freelancer Project Matcher",
    description: "AI-powered platform matching freelancers with projects based on skills, availability, and preferences",
    category: "Gig Economy",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["AI", "Freelancing", "Matching", "Gig Economy"],
    timeToMarket: "4-7 months",
    targetAudience: "Freelancers & businesses",
  },
  {
    title: "Sleep Optimization Coach",
    description: "Comprehensive sleep tracking and improvement platform using environmental data and personal habits",
    category: "HealthTech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Sleep", "Health", "Tracking", "Optimization"],
    timeToMarket: "5-8 months",
    targetAudience: "Sleep-troubled individuals",
  },
  {
    title: "Carbon Footprint Gamifier",
    description: "Gamified app for tracking and reducing personal carbon footprint with community challenges",
    category: "Sustainability",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["Sustainability", "Gaming", "Carbon", "Community"],
    timeToMarket: "4-6 months",
    targetAudience: "Environmentally conscious",
  },
  {
    title: "Remote Team Building Hub",
    description: "Platform offering virtual team building activities, games, and collaboration exercises",
    category: "Remote Work",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Remote Work", "Team Building", "Games", "Collaboration"],
    timeToMarket: "3-5 months",
    targetAudience: "Remote teams",
  },
  {
    title: "AI Recipe Optimizer",
    description: "Smart cooking assistant that optimizes recipes based on available ingredients and dietary preferences",
    category: "Food Tech",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["AI", "Cooking", "Recipe", "Optimization"],
    timeToMarket: "4-7 months",
    targetAudience: "Home cooks",
  },
  {
    title: "Digital Detox Companion",
    description: "App helping users reduce screen time through mindful usage tracking and alternative activity suggestions",
    category: "Digital Wellness",
    marketPotential: "Medium",
    complexity: "Low",
    tags: ["Digital Wellness", "Screen Time", "Mindfulness", "Health"],
    timeToMarket: "2-4 months",
    targetAudience: "Digital wellness seekers",
  },
  {
    title: "Smart Parking Solution",
    description: "IoT-based parking management system with real-time availability tracking and reservation features",
    category: "Smart City",
    marketPotential: "High",
    complexity: "High",
    tags: ["IoT", "Smart City", "Parking", "Real-time"],
    timeToMarket: "8-12 months",
    targetAudience: "City planners & drivers",
  },
  {
    title: "Volunteer Matching Platform",
    description: "Platform connecting volunteers with organizations based on skills, interests, and availability",
    category: "Social Impact",
    marketPotential: "Medium",
    complexity: "Low",
    tags: ["Volunteering", "Social Impact", "Matching", "Community"],
    timeToMarket: "3-5 months",
    targetAudience: "Volunteers & nonprofits",
  },
  {
    title: "Language Pronunciation Coach",
    description: "AI-powered app for improving pronunciation using speech recognition and personalized feedback",
    category: "EdTech",
    marketPotential: "High",
    complexity: "High",
    tags: ["AI", "Language Learning", "Speech Recognition", "Education"],
    timeToMarket: "6-10 months",
    targetAudience: "Language learners",
  },
  {
    title: "Sustainable Shopping Guide",
    description: "App scanning products to provide sustainability ratings and eco-friendly alternatives",
    category: "Sustainability",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["Sustainability", "Shopping", "Eco-friendly", "Scanner"],
    timeToMarket: "5-8 months",
    targetAudience: "Conscious consumers",
  },
  {
    title: "Personal Brand Builder",
    description: "Comprehensive platform for building and managing personal brand across social media and professional networks",
    category: "Personal Development",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Personal Branding", "Social Media", "Professional", "Content"],
    timeToMarket: "4-7 months",
    targetAudience: "Professionals & creators",
  },
  {
    title: "Micro-Learning Platform",
    description: "Bite-sized learning platform delivering personalized educational content in 5-minute sessions",
    category: "EdTech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["Education", "Micro-learning", "Personalization", "Mobile"],
    timeToMarket: "5-8 months",
    targetAudience: "Busy professionals",
  },
  {
    title: "Smart Home Security Hub",
    description: "Integrated security system with AI-powered threat detection and automated response protocols",
    category: "Smart Home",
    marketPotential: "Very High",
    complexity: "High",
    tags: ["Smart Home", "Security", "AI", "Automation"],
    timeToMarket: "10-15 months",
    targetAudience: "Homeowners",
  },
  {
    title: "Wellness Challenge Creator",
    description: "Platform for creating and participating in personalized wellness challenges with friends and community",
    category: "Wellness",
    marketPotential: "Medium",
    complexity: "Low",
    tags: ["Wellness", "Challenges", "Community", "Gamification"],
    timeToMarket: "3-5 months",
    targetAudience: "Health enthusiasts",
  },
  {
    title: "AI Code Documentation",
    description: "Automated tool for generating comprehensive code documentation using AI analysis of codebases",
    category: "Developer Tools",
    marketPotential: "High",
    complexity: "High",
    tags: ["AI", "Documentation", "Code Analysis", "Developer Tools"],
    timeToMarket: "6-9 months",
    targetAudience: "Developers",
  },
  {
    title: "Virtual Interior Design",
    description: "AI-powered interior design service offering personalized room makeovers through virtual consultations",
    category: "Design Tech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["AI", "Interior Design", "Virtual", "Personalization"],
    timeToMarket: "6-10 months",
    targetAudience: "Homeowners",
  },
  {
    title: "Fitness Form Checker",
    description: "AI-powered app using computer vision to analyze workout form and provide real-time corrections",
    category: "FitnesssTech",
    marketPotential: "High",
    complexity: "High",
    tags: ["AI", "Computer Vision", "Fitness", "Form Analysis"],
    timeToMarket: "8-12 months",
    targetAudience: "Fitness enthusiasts",
  },
  {
    title: "Startup Idea Validator",
    description: "Platform for validating startup ideas through market research, competitor analysis, and user feedback",
    category: "Business Tools",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["Startup", "Validation", "Market Research", "Analysis"],
    timeToMarket: "4-6 months",
    targetAudience: "Entrepreneurs",
  },
  {
    title: "Smart Study Scheduler",
    description: "AI-powered study planner that optimizes learning schedules based on retention patterns and deadlines",
    category: "EdTech",
    marketPotential: "High",
    complexity: "Medium",
    tags: ["AI", "Education", "Scheduling", "Learning Optimization"],
    timeToMarket: "5-8 months",
    targetAudience: "Students",
  },
  {
    title: "Community Garden Network",
    description: "Platform connecting community gardens with volunteers, resources, and knowledge sharing",
    category: "Community",
    marketPotential: "Low",
    complexity: "Low",
    tags: ["Community", "Gardening", "Volunteering", "Sustainability"],
    timeToMarket: "2-4 months",
    targetAudience: "Community gardeners",
  },
  {
    title: "Expense Splitting Smart App",
    description: "Advanced expense splitting app with OCR receipt scanning, automatic categorization, and payment integration",
    category: "FinTech",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["Finance", "Expense Splitting", "OCR", "Payment"],
    timeToMarket: "4-6 months",
    targetAudience: "Groups & roommates",
  },
  {
    title: "Senior Tech Support",
    description: "Simplified tech support platform specifically designed for elderly users with patient, step-by-step guidance",
    category: "Accessibility",
    marketPotential: "High",
    complexity: "Low",
    tags: ["Accessibility", "Senior Citizens", "Tech Support", "Simplicity"],
    timeToMarket: "3-5 months",
    targetAudience: "Elderly users",
  },
  {
    title: "Travel Memory Keeper",
    description: "AI-powered travel journal that automatically organizes photos, routes, and experiences into beautiful travel stories",
    category: "Travel Tech",
    marketPotential: "Medium",
    complexity: "Medium",
    tags: ["Travel", "AI", "Photo Organization", "Storytelling"],
    timeToMarket: "5-8 months",
    targetAudience: "Travelers",
  }
];


const FilterPill = ({ label, active, onClick, count }: any) => (
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
      {count !== undefined && <span className="opacity-40">[{count}]</span>}
    </div>
  </button>
);

const getStatusStyle = (val: string) => {
  switch (val) {
    case "Very High": return 'text-cyan-400 border-cyan-900/50 bg-cyan-900/10';
    case "High": return 'text-blue-400 border-blue-900/50 bg-blue-900/10';
    case "Medium": return 'text-slate-400 border-slate-800 bg-slate-800/20';
    default: return 'text-slate-500 border-slate-800 bg-slate-900/20';
  }
};

const IdeasPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allCategories = useMemo(() => ["All", ...Array.from(new Set(ideas.map(i => i.category)))].sort(), []);

  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      const matchesCat = selectedCategory === "All" || idea.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

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
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest uppercase">Idea_Vault_Active</span>
          </div>
        </div>
      </header>

      {/* 2. CONTROL DECK */}
      <div className="bg-slate-900/30 border-b border-slate-800 sticky top-16 z-40 backdrop-blur-sm">
         <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center">
            <div className="relative w-full xl:w-96 group">
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-blue-500">CONCEPT:</span>
               <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH_LOGIC..." 
                  className="w-full bg-[#020617] border border-slate-800 py-3 pl-20 pr-4 text-xs font-mono text-white focus:outline-none focus:border-blue-600 transition-colors uppercase placeholder:text-slate-700"
               />
            </div>

            <div className="flex flex-wrap gap-3 items-center">
               <select
                   value={selectedCategory}
                   onChange={(e) => setSelectedCategory(e.target.value)}
                   className="bg-[#020617] border border-slate-800 py-2 px-4 text-[10px] font-mono uppercase text-slate-400 focus:border-blue-600 outline-none"
               >
                   {allCategories.map(c => <option key={c} value={c}>{c === "All" ? "CAT: ALL_ARCHIVE" : c.toUpperCase()}</option>)}
               </select>
               <div className="h-4 w-px bg-slate-800 mx-2" />
               {["High", "Very High"].map(p => (
                  <FilterPill key={p} label={`POTENTIAL: ${p}`} active={false} onClick={() => {}} />
               ))}
            </div>
         </div>
      </div>

      <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredIdeas.map((idea, idx) => (
                <div key={idx} className="group relative bg-slate-900/40 border border-slate-800 flex flex-col hover:border-blue-600/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/5 to-blue-600/0 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />
                    
                    <div className="p-4 border-b border-slate-800/50 bg-slate-900/20 flex justify-between text-[9px] font-mono text-slate-500 uppercase">
                        <span>{idea.category}</span>
                        <span className="text-blue-500/50 font-bold">NODE_{100 + idx}</span>
                    </div>

                    <div className="p-6 flex-grow">
                        <div className="w-10 h-10 mb-5 border border-slate-800 bg-slate-950 flex items-center justify-center font-mono text-blue-500 text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            IDEA
                        </div>
                        <h3 className="font-bold text-white text-base uppercase mb-2 group-hover:text-blue-400 transition-colors tracking-tight">
                            {idea.title}
                        </h3>
                        <p className="text-[10px] font-mono text-blue-500/70 uppercase tracking-widest mb-4">
                            TARGET: {idea.targetAudience}
                        </p>
                        <p className="text-xs text-slate-400 font-mono border-l border-slate-800 pl-4 mb-6 leading-relaxed">
                            {idea.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {idea.tags.map(tag => (
                                <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-500">
                                    #{tag.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-800/50 bg-slate-900/20 flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-[8px] font-mono text-slate-600 uppercase">Complexity</span>
                            <span className={`text-[9px] font-mono px-2 py-0.5 border ${getStatusStyle(idea.complexity)}`}>
                                {idea.complexity}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <span className="text-[8px] font-mono text-slate-600 uppercase">TTM_EST</span>
                            <span className="text-[10px] font-mono text-slate-300">{idea.timeToMarket.split(' ')[0]} MO</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </main>

      {showBackToTop && (
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="fixed bottom-8 right-8 w-10 h-10 bg-blue-600 text-white font-mono flex items-center justify-center shadow-lg hover:bg-blue-500 z-50">
          ^
        </button>
      )}

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // CONCEPTUAL_INTEL_STREAM // 2025
      </footer>
    </div>
  );
};

export default IdeasPage;