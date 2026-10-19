import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Check } from 'lucide-react';

interface ScheduleSectionProps {
  onBookClass: (className: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onBookClass }) => {
  const [activeDay, setActiveDay] = useState('all');

  const classes = [
    {
      id: 'c1',
      day: 'mon',
      dayLabel: 'Monday',
      time: '07:00 AM - 08:15 AM',
      title: 'Olympic Strength & Power',
      coach: 'Marcus Johnson',
      category: 'Strength',
      spots: 3
    },
    {
      id: 'c2',
      day: 'mon',
      dayLabel: 'Monday',
      time: '12:00 PM - 01:00 PM',
      title: 'Metabolic HIIT Inferno',
      coach: 'David Chen',
      category: 'Cardio',
      spots: 6
    },
    {
      id: 'c3',
      day: 'mon',
      dayLabel: 'Monday',
      time: '06:30 PM - 07:30 PM',
      title: 'Vinyasa Flow & Decompress',
      coach: 'Sarah Williams',
      category: 'Mind-Body',
      spots: 8
    },
    {
      id: 'c4',
      day: 'wed',
      dayLabel: 'Wednesday',
      time: '08:00 AM - 09:15 AM',
      title: 'Championship Fight Club & MMA',
      coach: 'Emma Rodriguez',
      category: 'Combat',
      spots: 4
    },
    {
      id: 'c5',
      day: 'wed',
      dayLabel: 'Wednesday',
      time: '05:30 PM - 06:45 PM',
      title: 'Heavy Hypertrophy Protocols',
      coach: 'Marcus Johnson',
      category: 'Strength',
      spots: 2
    },
    {
      id: 'c6',
      day: 'wed',
      dayLabel: 'Wednesday',
      time: '07:00 PM - 08:00 PM',
      title: 'Athletic Reformer Pilates',
      coach: 'Sarah Williams',
      category: 'Mind-Body',
      spots: 5
    },
    {
      id: 'c7',
      day: 'fri',
      dayLabel: 'Friday',
      time: '07:00 AM - 08:00 AM',
      title: 'Cross-Functional Turf Challenge',
      coach: 'David Chen',
      category: 'Functional',
      spots: 5
    },
    {
      id: 'c8',
      day: 'fri',
      dayLabel: 'Friday',
      time: '12:30 PM - 01:30 PM',
      title: 'Explosive Striking & Conditioning',
      coach: 'Emma Rodriguez',
      category: 'Combat',
      spots: 6
    },
    {
      id: 'c9',
      day: 'fri',
      dayLabel: 'Friday',
      time: '06:00 PM - 07:15 PM',
      title: 'Full-Spectrum Sauna & Breathwork',
      coach: 'Sarah Williams',
      category: 'Recovery',
      spots: 9
    },
    {
      id: 'c10',
      day: 'sat',
      dayLabel: 'Saturday',
      time: '09:00 AM - 10:30 AM',
      title: 'Weekend Warrior Super-Circuit',
      coach: 'David Chen & Marcus',
      category: 'Endurance',
      spots: 2
    }
  ];

  const filtered = activeDay === 'all' ? classes : classes.filter(c => c.day === activeDay);

  return (
    <section id="schedule" className="py-24 px-6 bg-dark-elevated border-t border-dark-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold-light text-xs font-bold tracking-widest uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Master Coach Schedule</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4">
            WEEKLY CLASS <span className="text-gold-gradient font-black">TIMETABLE</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Reserve spots in high-octane sessions led by our elite coaching faculty. Tap any class to reserve immediately through Nova Concierge.
          </p>
        </div>

        {/* Day Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {[
            { id: 'all', label: 'All Sessions' },
            { id: 'mon', label: 'Monday' },
            { id: 'wed', label: 'Wednesday' },
            { id: 'fri', label: 'Friday' },
            { id: 'sat', label: 'Saturday' }
          ].map(day => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeDay === day.id
                  ? 'bg-gold text-black shadow-gold-sm'
                  : 'bg-dark-card border border-dark-border text-gray-300 hover:border-gold/50 hover:text-white'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/60 transition-all duration-300 flex flex-col justify-between shadow-lg group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-mono font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded">
                    {item.dayLabel} &bull; {item.time}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-white group-hover:text-gold transition-colors mb-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                  <User className="w-3.5 h-3.5 text-gold" />
                  <span>Coach: {item.coach}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  <strong className="text-emerald-400 font-mono">{item.spots} spots</strong> remaining
                </span>
                <button
                  onClick={() => onBookClass(item.title)}
                  className="text-xs font-bold text-gold hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors"
                >
                  <span>Book with Agent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
