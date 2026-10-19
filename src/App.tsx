import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentWorkspace } from './components/AgentWorkspace';
import { SpecsSection } from './components/SpecsSection';
import { ScheduleSection } from './components/ScheduleSection';
import { PricingSection } from './components/PricingSection';
import { BmiSection } from './components/BmiSection';
import { TrainersSection } from './components/TrainersSection';
import { FloatingAgentChat } from './components/FloatingAgentChat';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  const scrollToAgentConsole = () => {
    const el = document.getElementById('agent-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookClass = (className: string) => {
    setChatInitialQuery(`I want to reserve a spot for the "${className}" class.`);
  };

  const handleSelectTier = (tierName: string) => {
    setChatInitialQuery(`I am interested in joining the ${tierName}. What are the next steps to get started?`);
  };

  const handleAskAgentRoutine = (query: string) => {
    setChatInitialQuery(query);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white selection:bg-gold selection:text-black">
      {/* Top Navbar */}
      <Navbar onOpenAgentConsole={scrollToAgentConsole} />

      {/* Main Sections */}
      <main>
        <Hero onOpenAgentConsole={scrollToAgentConsole} />
        <AgentWorkspace />
        <SpecsSection />
        <ScheduleSection onBookClass={handleBookClass} />
        <PricingSection onSelectTier={handleSelectTier} />
        <BmiSection onAskAgentRoutine={handleAskAgentRoutine} />
        <TrainersSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* 24/7 Floating Multi-Agent Concierge Chat */}
      <FloatingAgentChat initialQuery={chatInitialQuery} />
    </div>
  );
};

export default App;
