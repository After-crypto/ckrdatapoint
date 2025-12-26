import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <footer className="bg-[#0a0f1a] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- TOP: BRANDING & STATUS --- */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-16">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tighter">
              CKR <span className="text-blue-500">/</span> DATAPOINT
            </h3>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Making engineering data simple. We help you organize design files and project rules in one secure place.
            </p>
          </div>

          {/* Creative Status Box */}
          <div className="grid grid-cols-2 gap-8 p-6 bg-white/5 border border-white/10 rounded-lg">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">System Status</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase">All Green</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Local Node</p>
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">Global_01</span>
            </div>
          </div>
        </div>

        {/* --- MIDDLE: SIMPLE LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Main Tools</h4>
            <nav className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Data Dashboard</a>
              <a href="#" className="hover:text-white transition-colors">File Manager</a>
              <a href="#" className="hover:text-white transition-colors">Security Hub</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Support</h4>
            <nav className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">User Guides</a>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
              <a href="#" className="hover:text-white transition-colors">Tech Updates</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">The Company</h4>
            <nav className="flex flex-col gap-3 text-sm text-slate-400">
              <a href="#" className="hover:text-white transition-colors">About Us</a>
              <a href="#" className="hover:text-white transition-colors">Our Team</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Talk to Us</h4>
            <div className="text-sm text-slate-400">
              <p>Email: <span className="text-white">hi@datapoint.com</span></p>
              <p className="mt-2 text-[10px] font-mono opacity-50 uppercase tracking-widest">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM: METADATA BAR --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            <span>&copy; {currentYear} Datapoint</span>
            <span className="hidden sm:block text-slate-800">|</span>
            <span>Time: {currentTime} UTC</span>
            <span className="hidden sm:block text-slate-800">|</span>
            <span>Encrypted: AES-256</span>
          </div>

          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Use</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;