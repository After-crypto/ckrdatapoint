"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Target, TrendingUp, Users, Award, Lightbulb, CheckCircle } from 'lucide-react';

const journeySteps = [
  {
    id: 1,
    title: "Assess Your Interests",
    description: "Understand your passions and strengths in engineering domains",
    icon: Lightbulb,
    details: [
      "Take our interest assessment quiz",
      "Explore different engineering branches",
      "Review career path projections",
      "Identify your core strengths"
    ]
  },
  {
    id: 2,
    title: "Choose Your Path",
    description: "Select the engineering branch that aligns with your goals",
    icon: Target,
    details: [
      "Compare branch curriculums",
      "Review industry demand trends",
      "Understand job opportunities",
      "Get personalized recommendations"
    ]
  },
  {
    id: 3,
    title: "Build Your Skills",
    description: "Follow a structured learning path tailored to your branch",
    icon: BookOpen,
    details: [
      "Access curated resources",
      "Follow semester-wise roadmaps",
      "Complete practical projects",
      "Track your progress"
    ]
  },
  {
    id: 4,
    title: "Connect with Mentors",
    description: "Get guidance from experienced professionals and alumni",
    icon: Users,
    details: [
      "Find branch-specific mentors",
      "Schedule consultation sessions",
      "Get career advice",
      "Network with industry experts"
    ]
  },
  {
    id: 5,
    title: "Gain Experience",
    description: "Build your portfolio through internships and projects",
    icon: TrendingUp,
    details: [
      "Apply for internships",
      "Work on real-world projects",
      "Contribute to open source",
      "Build your portfolio"
    ]
  },
  {
    id: 6,
    title: "Achieve Your Goals",
    description: "Land your dream job with our placement support",
    icon: Award,
    details: [
      "Prepare for interviews",
      "Access placement resources",
      "Practice coding challenges",
      "Get career placement assistance"
    ]
  }
];

const GuideJourneyPage = () => {
  const router = useRouter();
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* HEADER */}
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
               <span className="text-sm font-black text-white uppercase tracking-tighter">GUIDE_MY_JOURNEY</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#2563eb]" />
             <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Mentor_Active</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto p-6 lg:p-12">
        
        {/* HERO SECTION */}
        <section className="text-center mb-24">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                YOUR_ENGINEERING_JOURNEY
            </h1>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed mb-8">
                Navigate your path from student to professional with personalized guidance and structured learning.
            </p>
            <Link 
              href="/register"
              className="inline-block px-8 py-4 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-500 transition-all"
            >
              START YOUR JOURNEY
            </Link>
        </section>

        {/* JOURNEY STEPS */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-12">
                <h2 className="text-sm font-mono text-blue-500 uppercase tracking-[0.3em]">JOURNEY_MAP</h2>
                <div className="h-px flex-grow bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div 
                    key={step.id}
                    className="group relative bg-slate-900/40 border border-slate-800 p-6 hover:border-blue-600/50 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-600/20 border border-blue-600/50 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[8px] font-mono text-slate-600 uppercase tracking-wider mb-2">
                          STEP_{String(step.id).padStart(2, '0')}
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-500 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {selectedStep === step.id && (
                      <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-300 leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="bg-blue-600/5 border border-blue-600/20 p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[120px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
              READY TO BEGIN?
            </h2>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of students who are building successful engineering careers with our guidance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/register" 
                className="px-10 py-4 bg-blue-600 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)]"
              >
                GET_STARTED
              </Link>
              <Link 
                href="/login" 
                className="px-10 py-4 border border-slate-800 text-slate-400 font-mono text-[10px] uppercase tracking-[0.3em] hover:border-blue-600 hover:text-white transition-all"
              >
                SIGN_IN
              </Link>
            </div>
          </div>
        </section>

      </main>

      <footer className="p-12 border-t border-slate-800 text-center opacity-20 text-[9px] font-mono uppercase tracking-[0.3em]">
        CKR.DATAPOINT // MENTOR_PROGRAM_2025
      </footer>
    </div>
  );
};

export default GuideJourneyPage;

