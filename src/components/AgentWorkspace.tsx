import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Zap,
  Cpu,
  Terminal,
  Activity,
  Send,
  CheckCircle2,
  Layers,
  ChevronDown,
  ChevronUp,
  Dumbbell,
  Salad,
  HeartPulse,
  Ticket
} from 'lucide-react';
import { AGENT_REGISTRY } from '../agents/agentRegistry';
import { executeAgentOrchestrator, OrchestrationResult } from '../agents/orchestrator';
import { AgentRole } from '../types';

export const AgentWorkspace: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentRole>('orchestrator');
  const [query, setQuery] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastResult, setLastResult] = useState<OrchestrationResult | null>(null);
  const [showDevTraces, setShowDevTraces] = useState(true);

  const samplePrompts = [
    { label: '🏋️‍♂️ Titan: 4-Day Hypertrophy Split', text: 'Generate a 4-day periodized upper/lower hypertrophy workout protocol.', agent: 'workout' as AgentRole },
    { label: '🥗 MacroCore: Cutting Diet for 75kg', text: 'Calculate TDEE and athletic macros for a 75kg individual targeting fat loss.', agent: 'nutrition' as AgentRole },
    { label: '🧬 BioScan: BMI & Cryo Protocol', text: 'Evaluate biometrics for 178cm and 74kg with sauna and cold plunge recovery.', agent: 'diagnostics' as AgentRole },
    { label: '🎁 Nova: Claim 1-Day VIP Pass', text: 'Issue me an instant complimentary 1-day VIP pass to Elite Fitness.', agent: 'concierge' as AgentRole }
  ];

  const handleRunAgent = async (promptText?: string, targetAgent?: AgentRole) => {
    const textToRun = promptText || query;
    if (!textToRun.trim() || isExecuting) return;

    setIsExecuting(true);
    setQuery(textToRun);
    if (targetAgent) setSelectedAgent(targetAgent);

    try {
      // Simulate realistic execution timing
      const result = await executeAgentOrchestrator(
        textToRun,
        targetAgent === 'orchestrator' ? undefined : targetAgent
      );
      setLastResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <section id="agent-workspace" className="py-24 px-6 bg-dark-elevated border-t border-b border-dark-border relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold-light text-xs font-bold tracking-widest uppercase mb-3">
            <Cpu className="w-3.5 h-3.5 text-gold" />
            <span>Autonomous Multi-Agent Architecture</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white mb-4">
            LIVE AGENTIC <span className="text-gold-gradient font-black">COMMAND CENTER</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Directly interact with our swarm of specialized AI agents. Watch autonomous reasoning, tool execution, and multi-agent coordination unfold in real-time.
          </p>
        </div>

        {/* Agent Roster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {Object.entries(AGENT_REGISTRY).map(([key, agent]) => {
            const isSelected = selectedAgent === agent.role;
            return (
              <button
                key={key}
                onClick={() => setSelectedAgent(agent.role)}
                className={`p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-dark-card border-gold shadow-gold-sm ring-1 ring-gold/50'
                    : 'bg-dark-card/60 border-dark-border hover:border-gray-600'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 m-3 shadow-[0_0_8px_#10B981]" />
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{agent.avatar}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-gold">
                      {agent.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-gold transition-colors">{agent.name}</h3>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{agent.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-dark-border/60 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-gold" /> {agent.tools.length} Tools
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">READY</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <span className="text-xs uppercase font-bold tracking-wider text-gray-400 whitespace-nowrap flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-gold" /> Quick Prompts:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleRunAgent(p.text, p.agent)}
              className="px-3.5 py-1.5 rounded-full bg-dark-card border border-dark-border hover:border-gold text-xs text-gray-300 hover:text-white font-medium whitespace-nowrap transition-all shadow-sm flex-shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Agent Console Box */}
        <div className="rounded-2xl bg-dark-card border border-dark-border overflow-hidden shadow-2xl">
          {/* Console Header Bar */}
          <div className="bg-[#101010] px-6 py-4 border-b border-dark-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-gold" />
                agent_dispatch://{selectedAgent}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDevTraces(!showDevTraces)}
                className="text-xs font-mono font-medium text-gray-400 hover:text-gold flex items-center gap-1 transition-colors"
              >
                <span>{showDevTraces ? 'Hide Execution Traces' : 'Show Execution Traces'}</span>
                {showDevTraces ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              <div className="h-4 w-[1px] bg-dark-border" />
              <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                {isExecuting ? 'EXECUTING...' : 'ONLINE'}
              </span>
            </div>
          </div>

          {/* Interactive Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAgent();
            }}
            className="p-4 sm:p-6 border-b border-dark-border bg-dark-bg/60 flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Ask ${AGENT_REGISTRY[selectedAgent].name} or enter any fitness / nutrition / booking request...`}
                className="w-full bg-dark-elevated border border-dark-border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isExecuting || !query.trim()}
              className="px-6 py-3.5 rounded-xl bg-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-gold-sm"
            >
              {isExecuting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Run Agent</span>
                </>
              )}
            </button>
          </form>

          {/* Live Execution Traces Feed */}
          {showDevTraces && lastResult && (
            <div className="bg-[#0b0b0b] px-6 py-4 border-b border-dark-border font-mono text-xs">
              <div className="text-gray-400 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-gold" />
                <span>Live Autonomous Execution Traces ({lastResult.traces.length} steps):</span>
              </div>
              <div className="space-y-2.5">
                {lastResult.traces.map((trace, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-dark-elevated/70 border border-dark-border/80 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px] text-gray-500">
                      <span className="text-gold font-semibold uppercase tracking-wider">
                        [{trace.agentRole.toUpperCase()}]
                      </span>
                      <span>{trace.timestamp}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{trace.thought}</p>
                    {trace.toolCall && (
                      <div className="mt-2 p-2.5 rounded bg-black/60 border border-dark-border text-[11px] text-emerald-400">
                        <div className="font-bold flex items-center justify-between mb-1">
                          <span>&gt; Tool Invoked: {trace.toolCall.toolName}()</span>
                          <span className="text-gray-400 font-mono">{trace.toolCall.durationMs}ms</span>
                        </div>
                        <div className="text-gray-400">
                          Input: <code className="text-yellow-300">{JSON.stringify(trace.toolCall.input)}</code>
                        </div>
                        <div className="text-gray-400 mt-0.5">
                          Output: <code className="text-emerald-300">{JSON.stringify(trace.toolCall.output)}</code>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Synthesized Response Output */}
          <div className="p-6 sm:p-8">
            {lastResult ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-dark-border">
                  <span className="text-2xl">{AGENT_REGISTRY[lastResult.agentRole].avatar}</span>
                  <div>
                    <h4 className="font-bold text-base text-white flex items-center gap-2">
                      {AGENT_REGISTRY[lastResult.agentRole].name}
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/30">
                        {AGENT_REGISTRY[lastResult.agentRole].title}
                      </span>
                    </h4>
                    <span className="text-xs text-gray-400">Autonomous Synthesis Output &bull; {lastResult.message.timestamp}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line font-sans">
                  {lastResult.message.text}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400 flex flex-col items-center justify-center">
                <Bot className="w-12 h-12 text-gray-600 mb-3" />
                <h4 className="font-semibold text-white text-base">Agent Workspace Ready</h4>
                <p className="text-xs text-gray-400 max-w-md mt-1">
                  Choose a specialist agent above, enter any fitness or facility query, and press <strong>Run Agent</strong> to watch the autonomous multi-agent pipeline execute.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
