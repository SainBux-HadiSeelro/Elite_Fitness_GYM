import React, { useState } from 'react';
import { Check, Sparkles, X, Shield, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (tierName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      id: 'basic',
      name: 'BASIC TIER',
      monthlyPrice: 49,
      annualPrice: 39,
      description: 'Ideal for self-directed athletes seeking full floor & cardio access.',
      popular: false,
      features: [
        '25,000 sq ft Gym Floor & Technogym Access',
        'Standard Locker Room & Rainfall Showers',
        '2 Master Group Classes per Month',
        'Ultra-Fast Gigabit Mesh Wi-Fi 6',
        '24/7 AI Concierge (Nova) Access',
        { text: 'Personal Training Sessions', included: false },
        { text: 'Infrared Saunas & Cold Plunges', included: false },
        { text: 'InBody 770 Diagnostic Body Scans', included: false }
      ]
    },
    {
      id: 'standard',
      name: 'STANDARD',
      monthlyPrice: 89,
      annualPrice: 69,
      description: 'Complete athletic access with unlimited group classes & recovery.',
      popular: true,
      features: [
        'Full 24/7 Gym Floor & Turf Track Access',
        'Unlimited HIIT, Boxing & Reformer Pilates',
        'Executive Locker Room Access',
        '2 Private Coaching Sessions / Month',
        'Quarterly InBody 770 Diagnostic Scans',
        'Macronutrient Strategy by MacroCore Agent',
        'Priority 24/7 AI Multi-Agent Swarm',
        { text: 'Dedicated Assigned VIP Suite', included: false }
      ]
    },
    {
      id: 'elite',
      name: 'ELITE VIP',
      monthlyPrice: 149,
      annualPrice: 119,
      description: 'The pinnacle of luxury fitness, private coaching & full contrast recovery.',
      popular: false,
      features: [
        '24/7 Unrestricted Biometric VIP Access',
        'Unlimited Clearlight Infrared Saunas & Cold Plunges',
        '8 Private 1-on-1 Coaching Sessions / Month',
        'Monthly InBody 770 Composition Diagnostics',
        'Custom Periodized Hypertrophy Splits (Titan)',
        'Electrolyte & Alkaline Refill Bar Allowance',
        'Assigned Permanent Private Locker Suite',
        '2 Complimentary VIP Guest Passes per Month'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold-light text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Transparent Investment</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4">
            CHOOSE YOUR <span className="text-gold-gradient font-black">MEMBERSHIP</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            Experience uncompromised luxury. Select flexible month-to-month terms or save 20% with an annual membership commitment.
          </p>

          {/* Billing Switcher Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-dark-card border border-dark-border">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                !isAnnual ? 'bg-gold text-black shadow-gold-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                isAnnual ? 'bg-gold text-black shadow-gold-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black text-gold font-black">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
          {tiers.map(tier => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.id}
                className={`p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                  tier.popular
                    ? 'bg-gradient-to-b from-dark-card to-dark-elevated border-2 border-gold shadow-gold-md scale-[1.02]'
                    : 'bg-dark-card border border-dark-border hover:border-gold/40 shadow-xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-black font-extrabold text-[11px] tracking-widest uppercase shadow-gold-sm">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="border-b border-dark-border/80 pb-6 mb-6 text-center">
                    <h3 className="font-heading font-bold text-xl text-white tracking-wider mb-2">{tier.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 my-3">
                      <span className="text-2xl font-bold text-gold">$</span>
                      <span className="text-5xl font-black text-white font-heading">{price}</span>
                      <span className="text-xs text-gray-400 font-medium">/ month</span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">{tier.description}</p>
                  </div>

                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((f, fIdx) => {
                      const isIncluded = typeof f === 'string' ? true : f.included;
                      const text = typeof f === 'string' ? f : f.text;
                      return (
                        <li key={fIdx} className="flex items-start gap-3 text-xs leading-relaxed">
                          {isIncluded ? (
                            <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={isIncluded ? 'text-gray-200' : 'text-gray-600 line-through'}>
                            {text}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectTier(tier.name)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gold-gradient text-black hover:opacity-95 shadow-gold-sm'
                      : 'bg-dark-elevated border border-dark-border text-white hover:border-gold hover:text-gold'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
