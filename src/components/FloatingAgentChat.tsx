import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Minimize2,
  Trash2,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { AGENT_REGISTRY } from '../agents/agentRegistry';
import { executeAgentOrchestrator } from '../agents/orchestrator';
import { AgentMessage, AgentRole } from '../types';

interface FloatingAgentChatProps {
  initialQuery?: string;
}

export const FloatingAgentChat: React.FC<FloatingAgentChatProps> = ({ initialQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentRole>('concierge');
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'welcome_1',
      sender: 'agent',
      agentRole: 'concierge',
      text: "👋 Welcome to **ELITE FITNESS**! I am **Nova**, your 24/7 AI Concierge. I have full facility knowledge, membership pricing, and direct access to our specialist agents (**Titan** for workouts, **MacroCore** for nutrition, and **BioScan AI** for recovery).\n\nHow can our agent swarm assist your transformation today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery) {
      setIsOpen(true);
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMsg: AgentMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const result = await executeAgentOrchestrator(text, selectedAgent === 'orchestrator' ? undefined : selectedAgent);
      setMessages(prev => [...prev, result.message]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const quickChips = [
    { label: '⏱ Hours & Location', query: 'What are the exact gym hours and address?' },
    { label: '💳 Membership Pricing', query: 'Break down the membership tiers and pricing' },
    { label: '🎁 1-Day Free VIP Pass', query: 'Issue me a 1-day free VIP trial pass' },
    { label: '🏋️‍♂️ 4-Day Workout Split', query: 'Titan, generate a 4-day hypertrophy split' },
    { label: '🥗 Macro & Calorie Plan', query: 'MacroCore, calculate diet macros for fat loss' },
    { label: '📐 Facility Hardware Specs', query: 'What are the gym hardware and equipment specs?' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gold-gradient shadow-gold-lg flex items-center justify-center text-black hover:scale-105 transition-all duration-200 relative group"
          aria-label="Open AI Concierge"
        >
          <Bot className="w-8 h-8 text-black" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-black" />
          <span className="absolute -inset-1 rounded-full border-2 border-gold/50 animate-ping pointer-events-none" />
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] rounded-2xl bg-dark-card border border-gold/60 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
          {/* Header */}
          <div className="bg-[#121212] px-4 py-3.5 border-b border-dark-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-2xl">{AGENT_REGISTRY[selectedAgent]?.avatar || '🤖'}</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-dark-card" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  {AGENT_REGISTRY[selectedAgent]?.name || 'Elite Concierge'}
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                    24/7 Agent
                  </span>
                </h4>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" /> Multi-Agent Engine Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 text-gray-400 hover:text-white rounded"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded"
                title="Minimize Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Agent Switcher Bar */}
          <div className="bg-[#0c0c0c] px-3 py-2 border-b border-dark-border flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] flex items-center gap-1 whitespace-nowrap pl-1">
              <Layers className="w-3 h-3 text-gold" /> Agent:
            </span>
            {(['concierge', 'workout', 'nutrition', 'diagnostics'] as AgentRole[]).map(role => (
              <button
                key={role}
                onClick={() => setSelectedAgent(role)}
                className={`px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedAgent === role
                    ? 'bg-gold text-black font-bold shadow-xs'
                    : 'bg-dark-elevated text-gray-400 hover:text-white border border-dark-border'
                }`}
              >
                <span>{AGENT_REGISTRY[role].avatar}</span>
                <span>{AGENT_REGISTRY[role].name}</span>
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gold text-black font-semibold rounded-tr-none'
                      : 'bg-dark-elevated border border-dark-border text-gray-200 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Collapsible Execution Traces for Agent Messages */}
                {msg.traces && msg.traces.length > 0 && (
                  <div className="mt-1.5 w-[85%] text-[10px] font-mono">
                    <button
                      onClick={() => setExpandedTraceId(expandedTraceId === msg.id ? null : msg.id)}
                      className="text-gray-500 hover:text-gold flex items-center gap-1 transition-colors"
                    >
                      <span>{expandedTraceId === msg.id ? 'Hide' : 'Inspect'} {msg.traces.length} Agent Traces</span>
                      {expandedTraceId === msg.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {expandedTraceId === msg.id && (
                      <div className="mt-1 p-2 rounded bg-black/80 border border-dark-border space-y-1.5 text-gray-400">
                        {msg.traces.map((t, tIdx) => (
                          <div key={tIdx} className="border-b border-dark-border/50 pb-1 last:border-none">
                            <span className="text-gold uppercase font-bold">[{t.agentRole}]</span> {t.thought}
                            {t.toolCall && (
                              <div className="text-emerald-400 mt-0.5">
                                &gt; Tool: {t.toolCall.toolName} ({t.toolCall.durationMs}ms)
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <span className="text-[9px] text-gray-400 px-1 mt-1 font-mono">{msg.timestamp}</span>
              </div>
            ))}

            {/* Typing Animation */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-dark-elevated border border-dark-border w-fit text-gray-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] font-mono text-gray-400 ml-1">Agent reasoning...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-dark-elevated/60 border-t border-dark-border flex gap-1.5 overflow-x-auto">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                className="px-2.5 py-1 rounded-full bg-dark-card border border-dark-border text-gray-300 hover:border-gold hover:text-white text-[11px] font-medium whitespace-nowrap transition-colors flex-shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#111111] border-t border-dark-border flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask ${AGENT_REGISTRY[selectedAgent]?.name}...`}
              className="flex-1 bg-dark-elevated border border-dark-border rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gold text-black hover:bg-gold-light disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
