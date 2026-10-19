import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenAgentConsole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAgentConsole }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-dark-border shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-dark-bg/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gold-glow border border-gold flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="font-heading font-black text-gold text-lg">E</span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-black tracking-widest text-lg text-white">
              ELITE<span className="text-gold-gradient font-heading ml-1">FITNESS</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-gold/80 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" /> Multi-Agent AI Core
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          <a href="#home" className="text-xs uppercase font-semibold tracking-wider text-gray-300 hover:text-gold transition-colors">Home</a>
          <a href="#agent-workspace" className="text-xs uppercase font-semibold tracking-wider text-amber-400 hover:text-white flex items-center gap-1.5 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" /> Agent Console
          </a>
          <a href="#specs" className="text-xs uppercase font-semibold tracking-wider text-gray-300 hover:text-gold transition-colors">Facility Specs</a>
          <a href="#schedule" className="text-xs uppercase font-semibold tracking-wider text-gray-300 hover:text-gold transition-colors">Schedule</a>
          <a href="#pricing" className="text-xs uppercase font-semibold tracking-wider text-gray-300 hover:text-gold transition-colors">Pricing</a>
          <a href="#bmi" className="text-xs uppercase font-semibold tracking-wider text-gray-300 hover:text-gold transition-colors">BMI Engine</a>
          <a href="#trainers" className="text-xs uppercase font-semibold tracking-wider text-gray-300 hover:text-gold transition-colors">Coaches</a>
        </div>

        {/* CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenAgentConsole}
            className="px-4 py-2 rounded-lg bg-dark-card border border-gold/40 text-gold-light hover:bg-gold hover:text-black font-semibold text-xs tracking-wider transition-all duration-200 flex items-center gap-2 shadow-gold-sm"
          >
            <Bot className="w-4 h-4 text-gold group-hover:text-black" />
            <span>AI CONCIERGE</span>
          </button>
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 hover:shadow-gold-md transition-all duration-200"
          >
            Join VIP
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-gold"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-bg/98 border-b border-dark-border px-6 py-6 flex flex-col gap-4 backdrop-blur-2xl">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-gray-200">Home</a>
          <a href="#agent-workspace" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-gold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Agentic AI Console
          </a>
          <a href="#specs" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-gray-200">Facility Specs</a>
          <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-gray-200">Class Timetable</a>
          <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-gray-200">Membership Tiers</a>
          <a href="#bmi" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-gray-200">BMI & Metabolic Tool</a>
          <a href="#trainers" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold tracking-wider text-gray-200">Master Coaches</a>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAgentConsole();
              }}
              className="w-full py-2.5 rounded-lg bg-gold text-black font-bold text-xs uppercase text-center"
            >
              Open AI Concierge
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
