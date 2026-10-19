import { AgentMessage, AgentRole, ExecutionTrace } from '../types';
import { AGENT_REGISTRY } from './agentRegistry';
import {
  calculateBiometricsTool,
  formulateNutritionPlanTool,
  generateWorkoutProtocolTool,
  bookVipTrialPassTool,
  queryFacilitySpecsTool
} from '../tools/agentTools';

export interface OrchestrationResult {
  message: AgentMessage;
  agentRole: AgentRole;
  traces: ExecutionTrace[];
  toolPayload?: any;
}

/**
 * Autonomous Multi-Agent Orchestrator
 */
export async function executeAgentOrchestrator(
  userQuery: string,
  preferredAgent?: AgentRole
): Promise<OrchestrationResult> {
  const q = userQuery.toLowerCase();
  const traces: ExecutionTrace[] = [];
  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 1. Orchestrator Intent Decomposition Trace
  traces.push({
    id: `trace_orch_${Date.now()}_1`,
    agentRole: 'orchestrator',
    thought: `[Intent Classifier] Deconstructing query: "${userQuery}". Analyzing semantic intent vector and routing requirements.`,
    timestamp: now()
  });

  // Determine Primary Specialist Agent
  let selectedRole: AgentRole = preferredAgent || 'concierge';

  if (!preferredAgent) {
    if (q.includes('workout') || q.includes('split') || q.includes('exercise') || q.includes('hypertrophy') || q.includes('chest') || q.includes('squat') || q.includes('routine')) {
      selectedRole = 'workout';
    } else if (q.includes('diet') || q.includes('macro') || q.includes('calorie') || q.includes('protein') || q.includes('nutrition') || q.includes('meal')) {
      selectedRole = 'nutrition';
    } else if (q.includes('bmi') || q.includes('biometric') || q.includes('inbody') || q.includes('cold plunge') || q.includes('recovery') || q.includes('sauna') || q.includes('fat percentage')) {
      selectedRole = 'diagnostics';
    } else {
      selectedRole = 'concierge';
    }
  }

  const assignedAgent = AGENT_REGISTRY[selectedRole];

  traces.push({
    id: `trace_orch_${Date.now()}_2`,
    agentRole: 'orchestrator',
    thought: `[Task Delegation] Assigned task to specialist agent: ${assignedAgent.name} (${assignedAgent.title}). Context transferred.`,
    timestamp: now()
  });

  let responseText = '';
  let toolPayload: any = null;

  // ============================================
  // WORKOUT ARCHITECT (TITAN)
  // ============================================
  if (selectedRole === 'workout') {
    traces.push({
      id: `trace_titan_${Date.now()}_1`,
      agentRole: 'workout',
      thought: `[Titan Biomechanics Engine] Parsing target hypertrophy split and volume landmarks. Calling tool: generate_workout_protocol.`,
      timestamp: now()
    });

    const isFullBody = q.includes('3 day') || q.includes('beginner');
    const days = isFullBody ? 3 : 4;
    const protocol = generateWorkoutProtocolTool({
      goal: q.includes('strength') ? 'strength' : 'muscle_gain',
      daysPerWeek: days,
      experienceLevel: 'Intermediate',
      focus: 'Periodized Hypertrophy'
    });

    toolPayload = protocol;

    traces.push({
      id: `trace_titan_${Date.now()}_2`,
      agentRole: 'workout',
      thought: `[Tool Execution Complete] Generated "${protocol.title}" with ${protocol.days.length} structured sessions. Ready for client preview.`,
      toolCall: {
        id: `call_${Date.now()}`,
        toolName: 'generate_workout_protocol',
        input: { daysPerWeek: days, target: protocol.targetGoal },
        output: { split: protocol.split, sessions: protocol.days.map(d => d.dayName) },
        durationMs: 84,
        timestamp: now()
      },
      timestamp: now()
    });

    responseText = `⚡ **${protocol.title}** (${protocol.frequency})\n\n` +
      `Here is your scientific blueprint engineered by **Titan**:\n\n` +
      protocol.days.map(d => `### 📌 ${d.dayName} (${d.focus})\n` +
        d.exercises.map(ex => `&bull; **${ex.name}**: ${ex.sets} sets &times; ${ex.reps} reps (RPE ${ex.rpe}) — *${ex.notes}*`).join('\n')
      ).join('\n\n') +
      `\n\n🛡️ **Recovery Prescription**: ${protocol.recoveryProtocol}`;
  }

  // ============================================
  // NUTRITION SCIENTIST (MACROCORE)
  // ============================================
  else if (selectedRole === 'nutrition') {
    traces.push({
      id: `trace_macro_${Date.now()}_1`,
      agentRole: 'nutrition',
      thought: `[MacroCore Metabolic Engine] Calculating caloric requirements and athletic macronutrient breakdown.`,
      timestamp: now()
    });

    // Detect weight if provided, else default to 75kg
    const weightMatch = q.match(/(\d{2,3})\s*(kg|kilos|lbs)/);
    const weightKg = weightMatch ? parseInt(weightMatch[1]) : 75;
    const tdee = Math.round(weightKg * 33);
    const goal = q.includes('fat loss') || q.includes('cut') ? 'fat_loss' : 'muscle_gain';

    const plan = formulateNutritionPlanTool({ weightKg, tdee, goal });
    toolPayload = plan;

    traces.push({
      id: `trace_macro_${Date.now()}_2`,
      agentRole: 'nutrition',
      thought: `[Tool Execution Complete] Calibrated TDEE (${plan.tdee} kcal) and target intake (${plan.targetCalories} kcal). Formulated protein/carb/fat grams.`,
      toolCall: {
        id: `call_${Date.now()}`,
        toolName: 'formulate_macronutrients',
        input: { weightKg, tdee, goal },
        output: { calories: plan.targetCalories, protein: `${plan.macros.proteinGrams}g`, carbs: `${plan.macros.carbGrams}g`, fats: `${plan.macros.fatGrams}g` },
        durationMs: 62,
        timestamp: now()
      },
      timestamp: now()
    });

    responseText = `🥗 **Precision Macronutrient Strategy by MacroCore**\n\n` +
      `&bull; **Daily Caloric Target:** **${plan.targetCalories} kcal** (Maintenance TDEE: ${plan.tdee} kcal)\n` +
      `&bull; **Protein Target:** **${plan.macros.proteinGrams}g** (Muscle Protein Synthesis priority)\n` +
      `&bull; **Carbohydrate Target:** **${plan.macros.carbGrams}g** (Glycogen fuel)\n` +
      `&bull; **Fats Target:** **${plan.macros.fatGrams}g** (Hormonal health)\n` +
      `&bull; **Optimal Hydration:** **${plan.hydrationLiters} Liters/day**\n\n` +
      `💡 **Nutritional Timing Directives:**\n` +
      plan.mealTimingTips.map(tip => `&bull; ${tip}`).join('\n');
  }

  // ============================================
  // DIAGNOSTICS & RECOVERY (BIOSCAN AI)
  // ============================================
  else if (selectedRole === 'diagnostics') {
    traces.push({
      id: `trace_bio_${Date.now()}_1`,
      agentRole: 'diagnostics',
      thought: `[BioScan AI] Accessing InBody 770 composition model and recovery benchmarks.`,
      timestamp: now()
    });

    const heightMatch = q.match(/(\d{3})\s*cm/);
    const weightMatch = q.match(/(\d{2,3})\s*kg/);
    const heightCm = heightMatch ? parseInt(heightMatch[1]) : 175;
    const weightKg = weightMatch ? parseInt(weightMatch[1]) : 75;

    const bio = calculateBiometricsTool({
      heightCm,
      weightKg,
      age: 26,
      gender: 'male',
      goal: 'muscle_gain',
      activityLevel: 'high'
    });

    toolPayload = bio;

    traces.push({
      id: `trace_bio_${Date.now()}_2`,
      agentRole: 'diagnostics',
      thought: `[Tool Execution Complete] Evaluated BMI (${bio.bmi}), Category (${bio.category}), and ideal weight parameters.`,
      toolCall: {
        id: `call_${Date.now()}`,
        toolName: 'calculate_biometrics',
        input: { heightCm, weightKg },
        output: { bmi: bio.bmi, category: bio.category, bmr: bio.bmr, tdee: bio.tdee },
        durationMs: 45,
        timestamp: now()
      },
      timestamp: now()
    });

    responseText = `🧬 **BioScan AI Diagnostic Breakdown**\n\n` +
      `&bull; **Calculated BMI:** **${bio.bmi}** (${bio.category})\n` +
      `&bull; **Basal Metabolic Rate (BMR):** **${bio.bmr} kcal** (Energy required at rest)\n` +
      `&bull; **Total Daily Energy Expenditure (TDEE):** **${bio.tdee} kcal**\n` +
      `&bull; **Optimal Athletic Weight Window:** **${bio.idealWeightRangeKg[0]} kg – ${bio.idealWeightRangeKg[1]} kg**\n\n` +
      `🧊 **Prescribed Contrast Therapy:**\n` +
      `&bull; **Cryo Cold Plunge:** 3 minutes at 42°F (5.5°C) to attenuate systemic inflammation.\n` +
      `&bull; **Clearlight Infrared Sauna:** 20 minutes at 145°F to stimulate heat-shock proteins (HSPs).`;
  }

  // ============================================
  // CONCIERGE & CLIENT RELATIONS (NOVA)
  // ============================================
  else {
    traces.push({
      id: `trace_nova_${Date.now()}_1`,
      agentRole: 'concierge',
      thought: `[Nova Concierge] Searching facility database, membership tiers, and booking credentials.`,
      timestamp: now()
    });

    if (q.includes('pass') || q.includes('trial') || q.includes('book') || q.includes('join')) {
      const pass = bookVipTrialPassTool({ clientName: 'VIP Guest', contactPhone: '+1-555-ELITE' });
      toolPayload = pass;

      traces.push({
        id: `trace_nova_${Date.now()}_2`,
        agentRole: 'concierge',
        thought: `[Tool Execution Complete] Generated active trial pass: ${pass.passCode}.`,
        toolCall: {
          id: `call_${Date.now()}`,
          toolName: 'book_vip_pass',
          input: { clientName: pass.clientName },
          output: { passCode: pass.passCode, status: pass.status },
          durationMs: 50,
          timestamp: now()
        },
        timestamp: now()
      });

      responseText = `🎁 **VIP Guest Pass Generated by Nova!**\n\n` +
        `Pass Code: **${pass.passCode}** (Valid for 48 Hours)\n\n` +
        `**Included VIP Privileges:**\n` +
        pass.includedPerks.map(p => `&bull; ${p}`).join('\n') +
        `\n\n${pass.redemptionInstructions}`;
    } else if (q.includes('spec') || q.includes('facility') || q.includes('equipment') || q.includes('sq ft')) {
      const specs = queryFacilitySpecsTool();
      toolPayload = specs;

      responseText = `📐 **Elite Facility Specifications (Verified):**\n\n` +
        `&bull; **Area:** 25,000 sq ft across multi-level functional zones.\n` +
        `&bull; **Filtration:** Medical Grade HEPA-13 HVAC air replacement every 12 minutes.\n` +
        `&bull; **Strength Machines:** Technogym Artis Pure Strength series.\n` +
        `&bull; **Free Weights:** Eleiko IWF Certified Olympic Barbells up to 150 lbs.\n` +
        `&bull; **Power Stations:** 12 Olympic Racks with built-in acoustic shock drop platforms.\n` +
        `&bull; **Recovery:** Clearlight full-spectrum infrared saunas & twin cold plunge tubs (42°F).`;
    } else {
      responseText = `Welcome to **ELITE FITNESS**! I am **Nova**, your 24/7 Client Experience Lead.\n\n` +
        `&bull; **Hours:** Mon-Fri 5:00 AM - 11:00 PM | Sat-Sun 7:00 AM - 9:00 PM (24/7 for VIP members)\n` +
        `&bull; **Address:** 123 Fitness Boulevard, Downtown Financial District, New York, NY 10001\n` +
        `&bull; **Memberships:** Basic ($49/mo), Standard ($89/mo), and Elite VIP ($149/mo)\n\n` +
        `You can also collaborate directly with our specialist agents: **Titan** (Workouts), **MacroCore** (Nutrition), or **BioScan AI** (Diagnostics)!`;
    }
  }

  const message: AgentMessage = {
    id: `msg_${Date.now()}`,
    sender: 'agent',
    agentRole: selectedRole,
    text: responseText,
    traces,
    timestamp: now()
  };

  return {
    message,
    agentRole: selectedRole,
    traces,
    toolPayload
  };
}
