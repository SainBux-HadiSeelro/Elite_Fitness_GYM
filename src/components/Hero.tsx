import React from 'react';
import { Sparkles, Terminal, ArrowRight, Shield, Activity, Flame, Cpu } from 'lucide-react';

interface HeroProps {
  onOpenAgentConsole: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAgentConsole }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Background Imagery with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
          alt="Elite Fitness Center"
          className="w-full h-full object-cover brightness-[0.28] contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-dark-bg/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Agentic AI Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-dark-card/90 border border-gold/40 text-gold-light text-xs font-semibold tracking-wider mb-6 backdrop-blur-md shadow-gold-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10B981]" />
          <span>MULTI-AGENT AUTONOMOUS SYSTEM ONLINE (v2.0)</span>
          <Cpu className="w-3.5 h-3.5 text-gold ml-1" />
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.12] mb-6">
          THE FUTURE OF FITNESS IS <br />
          <span className="text-gold-gradient font-black">AGENTIC AI POWERED</span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl text-base sm:text-lg text-gray-300 leading-relaxed mb-10 font-normal">
          Experience New York's premier 25,000 sq ft sanctuary, where Olympic-grade hardware converges with a real-time <strong className="text-white font-semibold">Multi-Agent AI Engine</strong> — synthesizing bespoke workouts, macronutrient protocols, and 24/7 concierge assistance.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14 w-full sm:w-auto">
          <button
            onClick={onOpenAgentConsole}
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gold-gradient text-black font-extrabold text-xs uppercase tracking-widest hover:shadow-gold-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>OPEN AGENT WORKSPACE</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <a
            href="#specs"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-dark-card/80 border border-dark-border text-white hover:border-gold hover:text-gold font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4 text-gold" />
            <span>VIEW FACILITY SPECS</span>
          </a>

          <a
            href="#pricing"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-dark-card/50 border border-gold/30 text-gold-light hover:bg-gold/10 font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>MEMBERSHIP TIERS</span>
          </a>
        </div>

        {/* Live Performance Matrix & Stats */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-dark-card/70 border border-dark-border/80 backdrop-blur-xl">
          <div className="p-3 text-center border-r border-dark-border/50 last:border-none">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold font-heading">25,000</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3 text-gold" /> Sq Ft Luxury Area
            </div>
          </div>

          <div className="p-3 text-center border-r border-dark-border/50 last:border-none">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold font-heading">4 Autonomous</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1 flex items-center justify-center gap-1">
              <Cpu className="w-3 h-3 text-gold" /> Specialized Agents
            </div>
          </div>

          <div className="p-3 text-center border-r border-dark-border/50 last:border-none">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold font-heading">&lt; 100ms</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1 flex items-center justify-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" /> Tool Execution Latency
            </div>
          </div>

          <div className="p-3 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-gold font-heading">24/7/365</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-1 flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" /> Continuous Intelligence
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
