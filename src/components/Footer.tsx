import React from 'react';
import { ShieldCheck, Instagram, Twitter, Linkedin, Github, Cpu, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <a href="#home" className="inline-block mb-4">
            <span className="font-heading font-black text-xl text-white tracking-wider">
              ELITE<span className="text-gold-gradient ml-1">FITNESS</span>
            </span>
          </a>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            New York's premier 25,000 sq ft luxury athletic sanctuary powered by an autonomous Multi-Agent AI system. Delivering real-time training periodization and 24/7 concierge intelligence.
          </p>
          <div className="flex items-center gap-3 text-gray-400">
            <a href="https://github.com/SainBux-HadiSeelro/Elite_Fitness_GYM" target="_blank" rel="noopener" className="p-2 rounded-lg bg-dark-elevated border border-dark-border hover:text-gold hover:border-gold transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-dark-elevated border border-dark-border hover:text-gold hover:border-gold transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-dark-elevated border border-dark-border hover:text-gold hover:border-gold transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-dark-elevated border border-dark-border hover:text-gold hover:border-gold transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Autonomous AI Swarm</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><span className="text-gray-200 font-semibold">Nova</span> &bull; 24/7 Client Experience Lead</li>
            <li><span className="text-gray-200 font-semibold">Titan</span> &bull; Workout Architect Agent</li>
            <li><span className="text-gray-200 font-semibold">MacroCore</span> &bull; Metabolic & Macro Scientist</li>
            <li><span className="text-gray-200 font-semibold">BioScan AI</span> &bull; Biometric Diagnostics</li>
            <li><span className="text-gray-200 font-semibold">Orchestrator</span> &bull; Multi-Agent Dispatcher</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Facility & Programs</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><a href="#specs" className="hover:text-gold transition-colors">25,000 Sq Ft Architecture Specs</a></li>
            <li><a href="#specs" className="hover:text-gold transition-colors">Technogym & Eleiko Olympic Arsenal</a></li>
            <li><a href="#specs" className="hover:text-gold transition-colors">Clearlight Infrared Saunas & Cryo Tubs</a></li>
            <li><a href="#schedule" className="hover:text-gold transition-colors">Weekly Master Coach Class Timetable</a></li>
            <li><a href="#bmi" className="hover:text-gold transition-colors">Biometric BMI & TDEE Engine</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">Developer Architecture</h4>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Built as a benchmark for <strong className="text-white">Agentic AI Front-End Engineering</strong>. Zero framework bloat, sub-100ms tool latency, and modular state management.
          </p>
          <div className="p-3 rounded-xl bg-dark-elevated border border-gold/30 text-[11px] text-gray-300">
            <span className="text-gold font-bold block mb-1">Architected & Engineered by:</span>
            <span className="font-semibold text-white">Sain Bux Hadi Seelro</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">Front-End & Agentic AI Specialist</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-dark-border flex flex-wrap items-center justify-between text-xs text-gray-500 gap-4">
        <p>&copy; 2026 ELITE FITNESS &bull; Multi-Agent System Engineered by Sain Bux Hadi Seelro.</p>
        <div className="flex items-center gap-4 text-xs">
          <a href="https://github.com/SainBux-HadiSeelro/Elite_Fitness_GYM" className="hover:text-gold transition-colors">GitHub Repository</a>
          <span>&bull;</span>
          <a href="#specs" className="hover:text-gold transition-colors">Technical Specs</a>
          <span>&bull;</span>
          <a href="#agent-workspace" className="hover:text-gold transition-colors">Agent Console</a>
        </div>
      </div>
    </footer>
  );
};
