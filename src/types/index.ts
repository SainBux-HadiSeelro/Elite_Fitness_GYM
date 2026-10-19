export type AgentRole = 'concierge' | 'workout' | 'nutrition' | 'diagnostics' | 'orchestrator';

export type AgentStatus = 'idle' | 'thinking' | 'executing_tool' | 'responding';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  title: string;
  avatar: string;
  badge: string;
  description: string;
  status: AgentStatus;
  tools: string[];
}

export interface ToolCall {
  id: string;
  toolName: string;
  input: Record<string, any>;
  output: Record<string, any>;
  durationMs: number;
  timestamp: string;
}

export interface ExecutionTrace {
  id: string;
  agentRole: AgentRole;
  thought: string;
  toolCall?: ToolCall;
  timestamp: string;
}

export interface AgentMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentRole?: AgentRole;
  text: string;
  traces?: ExecutionTrace[];
  timestamp: string;
}

export interface BiometricProfile {
  heightCm: number;
  weightKg: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  goal: 'fat_loss' | 'muscle_gain' | 'strength' | 'endurance' | 'longevity';
  activityLevel: 'sedentary' | 'moderate' | 'high' | 'athlete';
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rpe: number;
  restSecs: number;
  notes: string;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutProtocol {
  id: string;
  title: string;
  split: string;
  frequency: string;
  targetGoal: string;
  days: WorkoutDay[];
  recoveryProtocol: string;
}

export interface NutritionPlan {
  bmr: number;
  tdee: number;
  targetCalories: number;
  goal: string;
  macros: {
    proteinGrams: number;
    carbGrams: number;
    fatGrams: number;
  };
  hydrationLiters: number;
  mealTimingTips: string[];
}
