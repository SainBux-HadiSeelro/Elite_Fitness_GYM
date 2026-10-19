import React from 'react';
import { Award, Instagram, Twitter, Linkedin, Shield } from 'lucide-react';

export const TrainersSection: React.FC = () => {
  const coaches = [
    {
      name: 'Marcus Johnson',
      role: 'Head Strength & Powerlifting Coach',
      photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
      bio: '15+ years coaching national powerlifters. NSCA-CSCS Certified master of progressive overload and kinetic form analysis.',
      badge: 'Strength & Hypertrophy'
    },
    {
      name: 'Sarah Williams',
      role: 'Yoga, Reformer Pilates & Recovery Lead',
      photo: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      bio: 'E-RYT 500 accredited specialist in athletic spinal decompression, breathwork protocols, and functional hip mobility.',
      badge: 'Mobility & Recovery'
    },
    {
      name: 'David Chen',
      role: 'HIIT & Metabolic Conditioning Director',
      photo: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
      bio: 'Former NCAA athlete specializing in VO2 max expansion, Keiser pneumatic intervals, and targeted fat loss protocols.',
      badge: 'Cardio & Conditioning'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Boxing & Functional Combat Arts',
      photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80',
      bio: 'Golden Gloves champion and martial artist. Teaches rotational strike mechanics, explosive footwork, and mental fortitude.',
      badge: 'Combat & Fight Club'
    }
  ];

  return (
    <section id="trainers" className="py-24 px-6 bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold-light text-xs font-bold tracking-widest uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>World-Class Faculty</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4">
            EXPERT MASTER <span className="text-gold-gradient font-black">COACHES</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Every coach at Elite Fitness holds elite international certifications, championship credentials, and an obsessive focus on client results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((coach, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden group hover:border-gold/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={coach.photo}
                  alt={coach.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded bg-black/80 border border-gold/40 text-gold-light backdrop-blur-md">
                  {coach.badge}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-lg text-white group-hover:text-gold transition-colors">{coach.name}</h3>
                <p className="text-xs font-semibold text-gold mt-0.5 mb-3">{coach.role}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-5">{coach.bio}</p>

                <div className="flex items-center gap-3 pt-4 border-t border-dark-border text-gray-400">
                  <a href="#" className="hover:text-gold transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-gold transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="hover:text-gold transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
