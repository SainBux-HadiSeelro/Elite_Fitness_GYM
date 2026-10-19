import React from 'react';
import { Building2, Dumbbell, Sparkles, Cpu, Wind, ShieldCheck, Gauge } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const specCategories = [
    {
      icon: <Building2 className="w-6 h-6 text-gold" />,
      title: 'Architecture & Environmental Engineering',
      metrics: [
        { label: 'Total Floor Space', value: '25,000 sq ft Multi-Level' },
        { label: 'Ceiling Acoustics', value: '18 ft High Dampened Baffles' },
        { label: 'Air Filtration', value: 'Medical HEPA-13 HVAC (12-min cycles)' },
        { label: 'Shock Absorption', value: 'Regupol Multi-Density Compound' },
        { label: 'Access Control', value: '24/7 Biometric & RFID Turnstiles' }
      ]
    },
    {
      icon: <Dumbbell className="w-6 h-6 text-gold" />,
      title: 'Olympic Hardware & Machinery Matrix',
      metrics: [
        { label: 'Selectorized Line', value: 'Technogym Artis Pure Strength' },
        { label: 'Competition Bars', value: 'Eleiko IWF Certified Olympic Bars' },
        { label: 'Lifting Stations', value: '12 Power Racks with Drop Decks' },
        { label: 'Cardio Fleet', value: 'Woodway Curved & Keiser M3i Bikes' },
        { label: 'Sprint & Turf', value: '40-Yard Prowler Sled Track' }
      ]
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: 'Contrast Cryo & Thermal Recovery Suite',
      metrics: [
        { label: 'Infrared Saunas', value: 'Clearlight Sanctuary (145°F)' },
        { label: 'Cold Plunge Tubs', value: 'Twin Chilled Commercial Tubs (42°F)' },
        { label: 'Compression Lounge', value: 'Hyperice & Normatec Dynamic Boots' },
        { label: 'Locker Amenities', value: 'Rainfall Showers & Keyless Suites' },
        { label: 'Hydration Station', value: 'Electrolyte & Alkaline Chilled Hub' }
      ]
    },
    {
      icon: <Cpu className="w-6 h-6 text-gold" />,
      title: 'Digital Concierge & Bio-Diagnostics',
      metrics: [
        { label: 'AI Agent Swarm', value: '4 Autonomous Specialized Agents' },
        { label: 'Composition Scans', value: 'InBody 770 Multi-Frequency System' },
        { label: 'Connectivity', value: 'Gigabit Mesh Wi-Fi 6 Across Zones' },
        { label: 'Telemetry', value: 'Heart Rate Screen Sync in Cardio Zone' },
        { label: 'Occupancy Meter', value: 'Live Real-time Crowd Density Feed' }
      ]
    }
  ];

  return (
    <section id="specs" className="py-24 px-6 bg-dark-bg relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold-light text-xs font-bold tracking-widest uppercase mb-3">
            <Gauge className="w-3.5 h-3.5 text-gold" />
            <span>Hardware Benchmarks</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4">
            FACILITY & HARDWARE <span className="text-gold-gradient font-black">SPECIFICATIONS</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Every square foot and piece of steel at Elite Fitness is engineered for maximum athletic efficiency, safety, and rapid neuromuscular adaptation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/50 transition-all duration-300 shadow-xl group"
            >
              <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-dark-border/80">
                <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg sm:text-xl text-white">{cat.title}</h3>
              </div>

              <div className="space-y-3.5">
                {cat.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="flex items-center justify-between text-sm py-2 border-b border-dark-border/40 last:border-none"
                  >
                    <span className="text-gray-400 font-medium">{m.label}</span>
                    <span className="text-white font-semibold text-right font-mono text-xs sm:text-sm">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
