import React, { useState } from 'react';
import { Activity, Calculator, Sparkles, ArrowRight, HeartPulse, ShieldAlert, CheckCircle } from 'lucide-react';
import { calculateBiometricsTool } from '../tools/agentTools';

interface BmiSectionProps {
  onAskAgentRoutine: (query: string) => void;
}

export const BmiSection: React.FC<BmiSectionProps> = ({ onAskAgentRoutine }) => {
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('74');
  const [age, setAge] = useState('26');
  const [goal, setGoal] = useState<'fat_loss' | 'muscle_gain' | 'strength' | 'longevity'>('muscle_gain');
  const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'high' | 'athlete'>('high');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);

    if (isNaN(h) || isNaN(w) || isNaN(a) || h <= 0 || w <= 0) return;

    const bio = calculateBiometricsTool({
      heightCm: h,
      weightKg: w,
      age: a,
      gender: 'male',
      goal,
      activityLevel: activity
    });

    setResult(bio);
  };

  return (
    <section id="bmi" className="py-24 px-6 bg-dark-elevated border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Explainer */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold-light text-xs font-bold tracking-widest uppercase mb-3">
              <HeartPulse className="w-3.5 h-3.5 text-gold" />
              <span>Biometric Diagnostic Tool</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              PRECISION <span className="text-gold-gradient font-black">METRIC ENGINE</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Your biometric baseline dictates recovery velocity, volume tolerance, and daily macronutrient targets. Enter your current vitals to compute instant BMI, BMR, and TDEE parameters.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
                <span className="text-blue-400 font-bold block mb-1">&lt; 18.5 BMI</span>
                <span className="text-gray-400">Underweight &bull; Hypertrophy priority</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-card border border-gold/40 bg-gold/5">
                <span className="text-emerald-400 font-bold block mb-1">18.5 - 24.9 BMI</span>
                <span className="text-gray-300 font-medium">Optimal Athletic Baseline</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
                <span className="text-amber-400 font-bold block mb-1">25.0 - 29.9 BMI</span>
                <span className="text-gray-400">Overweight / High Density</span>
              </div>
              <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
                <span className="text-red-400 font-bold block mb-1">30.0+ BMI</span>
                <span className="text-gray-400">Obese &bull; Supervised split</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Box */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-dark-card border border-dark-border shadow-2xl">
              <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-gold" />
                <span>Biometrics & Caloric Estimator</span>
              </h3>

              <form onSubmit={handleCalculate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">Weight (kg)</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">Primary Target Goal</label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value as any)}
                      className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold"
                    >
                      <option value="muscle_gain">Hypertrophy & Muscle Gain</option>
                      <option value="fat_loss">Rapid Fat Loss & Conditioning</option>
                      <option value="strength">Absolute Powerlifting Strength</option>
                      <option value="longevity">Cardiovascular Longevity</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 block mb-1.5">Activity Multiplier</label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value as any)}
                      className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-2.5 text-sm text-white focus:border-gold"
                    >
                      <option value="sedentary">Sedentary (Desk Job)</option>
                      <option value="moderate">Moderate (3-4 workouts/wk)</option>
                      <option value="high">High Activity (5-6 workouts/wk)</option>
                      <option value="athlete">Elite Athlete (Daily 2x training)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gold text-black font-extrabold text-xs uppercase tracking-widest hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-gold-sm"
                >
                  <Activity className="w-4 h-4" />
                  <span>COMPUTE BIOMETRICS & TDEE</span>
                </button>
              </form>

              {/* Result Preview */}
              {result && (
                <div className="mt-8 pt-6 border-t border-dark-border/80">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mb-5">
                    <div className="p-3 rounded-xl bg-dark-elevated border border-gold/40">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">BMI Score</span>
                      <span className="text-2xl font-black text-gold font-heading">{result.bmi}</span>
                      <span className="text-[10px] text-emerald-400 block font-semibold">{result.category}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-elevated border border-dark-border">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Basal BMR</span>
                      <span className="text-2xl font-black text-white font-heading">{result.bmr}</span>
                      <span className="text-[10px] text-gray-400 block">kcal / day</span>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-elevated border border-dark-border">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Active TDEE</span>
                      <span className="text-2xl font-black text-white font-heading">{result.tdee}</span>
                      <span className="text-[10px] text-gray-400 block">kcal / day</span>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-elevated border border-dark-border">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">Ideal Weight</span>
                      <span className="text-base sm:text-lg font-black text-white font-heading mt-1">
                        {result.idealWeightRangeKg[0]}-{result.idealWeightRangeKg[1]}
                      </span>
                      <span className="text-[10px] text-gray-400 block">kilograms</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const query = `My BMI is ${result.bmi} (${result.category}), Height: ${height}cm, Weight: ${weight}kg, Age: ${age}, TDEE: ${result.tdee} kcal, Goal: ${goal}. Synthesize a customized workout split and macronutrient plan for me.`;
                      onAskAgentRoutine(query);
                    }}
                    className="w-full py-3 rounded-xl bg-dark-elevated border border-gold text-gold hover:bg-gold hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Send to Agent Swarm for Custom Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
