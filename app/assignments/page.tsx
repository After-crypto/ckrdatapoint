import React from 'react';
import Link from 'next/link';

export default function AssignmentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-4 w-[2px] bg-blue-600" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Unit_ASN</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Tasks</h1>
        <p className="text-slate-600 max-w-2xl">Daily work list and assignments.</p>
        <div className="mt-10">
          <Link href="/" className="text-sm font-bold uppercase tracking-widest text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

