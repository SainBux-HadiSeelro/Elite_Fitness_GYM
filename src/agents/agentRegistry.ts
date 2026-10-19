import { Agent } from '../types';

export const AGENT_REGISTRY: Record<string, Agent> = {
  orchestrator: {
    id: 'agent_orchestrator',
    name: 'Elite Orchestrator',
    role: 'orchestrator',
    title: 'Multi-Agent Autonomous Dispatcher',
    avatar: '🌐',
    badge: 'Core Engine',
    description: 'Analyzes user intent, delegates tasks to specialist agents, and synthesizes multi-agent responses.',
    status: 'idle',
    tools: ['dispatch_agent', 'aggregate_traces', 'verify_safety']
  },
  concierge: {
    id: 'agent_concierge',
    name: 'Nova',
    role: 'concierge',
    title: 'Client Experience & Facility Lead',
    avatar: '✨',
    badge: 'Customer Ops',
    description: 'Handles 24/7 guest relations, memberships, timetable access, VIP guest pass issuance, and facility details.',
    status: 'idle',
    tools: ['query_facility_specs', 'book_vip_pass', 'get_membership_tiers', 'lookup_schedule']
  },
  workout: {
    id: 'agent_workout',
    name: 'Titan',
    role: 'workout',
    title: 'Autonomous Workout Architect',
    avatar: '⚡',
    badge: 'Biomechanics',
    description: 'Synthesizes periodized resistance splits, exercise mechanics, volume/frequency modulation, and progressive overload.',
    status: 'idle',
    tools: ['generate_workout_protocol', 'substitute_exercise', 'calculate_volume_landmarks']
  },
  nutrition: {
    id: 'agent_nutrition',
    name: 'MacroCore',
    role: 'nutrition',
    title: 'Metabolic & Nutrition Scientist',
    avatar: '🥗',
    badge: 'Macronutrients',
    description: 'Calculates BMR/TDEE, calibrates caloric deficit/surplus, and formulates athletic macronutrient allocations.',
    tools: ['calculate_tdee', 'formulate_macronutrients', 'supplement_timing_advisor'],
    status: 'idle'
  },
  diagnostics: {
    id: 'agent_diagnostics',
    name: 'BioScan AI',
    role: 'diagnostics',
    title: 'Biometric Diagnostics & Recovery',
    avatar: '🧬',
    badge: 'InBody Diagnostics',
    description: 'Interprets InBody 770 composition scans, calculates body fat estimates, and prescribes infrared sauna & cold plunge protocols.',
    tools: ['evaluate_bmi_biometrics', 'prescribe_recovery_protocol', 'inbody_scan_interpreter'],
    status: 'idle'
  }
};
