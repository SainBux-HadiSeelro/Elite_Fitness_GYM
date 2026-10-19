import { BiometricProfile, NutritionPlan, WorkoutProtocol } from '../types';

/**
 * AGENT TOOL 1: Calculate Biometrics, BMI, BMR, and TDEE
 */
export function calculateBiometricsTool(profile: BiometricProfile) {
  const heightM = profile.heightCm / 100;
  const bmi = parseFloat((profile.weightKg / (heightM * heightM)).toFixed(1));

  // Mifflin-St Jeor Equation for BMR
  let bmr = (10 * profile.weightKg) + (6.25 * profile.heightCm) - (5 * profile.age);
  if (profile.gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  bmr = Math.round(bmr);

  // Activity Multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    moderate: 1.55,
    high: 1.725,
    athlete: 1.9
  };
  const multiplier = activityMultipliers[profile.activityLevel] || 1.55;
  const tdee = Math.round(bmr * multiplier);

  let category = 'Healthy Weight';
  let riskLevel = 'Low';
  if (bmi < 18.5) {
    category = 'Underweight';
    riskLevel = 'Mild (Hypertrophy Advised)';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight / Muscular';
    riskLevel = 'Moderate (Recomposition Advised)';
  } else if (bmi >= 30) {
    category = 'Obesity Class I+';
    riskLevel = 'High (Structured Fat Loss Advised)';
  }

  return {
    bmi,
    category,
    riskLevel,
    bmr,
    tdee,
    idealWeightRangeKg: [
      Math.round(18.5 * heightM * heightM),
      Math.round(24.9 * heightM * heightM)
    ]
  };
}

/**
 * AGENT TOOL 2: Generate Periodized Workout Protocol
 */
export function generateWorkoutProtocolTool(params: {
  goal: string;
  daysPerWeek: number;
  experienceLevel: string;
  focus?: string;
}): WorkoutProtocol {
  const { goal, daysPerWeek } = params;

  if (daysPerWeek <= 3) {
    return {
      id: `proto_${Date.now()}`,
      title: '3-Day Full Body Athletic Density Protocol',
      split: 'Full Body Push/Pull/Legs Combined',
      frequency: '3 Days / Week (Alternate Days)',
      targetGoal: goal.replace('_', ' ').toUpperCase(),
      recoveryProtocol: 'Infrared Sauna (20 mins at 140°F) + Cold Plunge (3 mins at 42°F) post-session',
      days: [
        {
          dayName: 'Day 1: Compound Foundations',
          focus: 'Posterior Chain & Horizontal Press',
          exercises: [
            { name: 'Barbell Back Squat', sets: 4, reps: '6-8', rpe: 8, restSecs: 150, notes: 'Technogym Olympic Rack, explosive concentric' },
            { name: 'Flat Dumbbell Bench Press', sets: 4, reps: '8-10', rpe: 8, restSecs: 120, notes: 'Full clavicular stretch' },
            { name: 'Neutral Grip Lat Pulldown', sets: 3, reps: '10-12', rpe: 8.5, restSecs: 90, notes: 'Pause 1s at sternum' },
            { name: 'Romanian Deadlift', sets: 3, reps: '8-10', rpe: 7.5, restSecs: 120, notes: 'Hinge back to mid-shin' }
          ]
        },
        {
          dayName: 'Day 2: Explosive & Anterior Power',
          focus: 'Vertical Press & Knee Flexion',
          exercises: [
            { name: 'Standing Overhead Barbell Press', sets: 4, reps: '6-8', rpe: 8, restSecs: 120, notes: 'Glutes locked, clean overhead lock' },
            { name: 'Barbell Hip Thrust', sets: 4, reps: '10-12', rpe: 8.5, restSecs: 90, notes: 'Hold contraction 2s at peak' },
            { name: 'Incline Dumbbell Chest Fly', sets: 3, reps: '12-15', rpe: 9, restSecs: 75, notes: 'Deep pectoral myofascial stretch' },
            { name: 'Standing Cable Face Pulls', sets: 3, reps: '15-20', rpe: 8, restSecs: 60, notes: 'External shoulder rotation focus' }
          ]
        },
        {
          dayName: 'Day 3: Hypertrophy & Metabolic Burn',
          focus: 'Functional Conditioning & Full Core',
          exercises: [
            { name: 'Trap Bar Deadlift', sets: 4, reps: '5-6', rpe: 8.5, restSecs: 150, notes: 'Drive feet into ground, neutral spine' },
            { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rpe: 8.5, restSecs: 90, notes: '30-degree bench angle' },
            { name: 'Keiser Pneumatic Functional Cable Chops', sets: 3, reps: '12/side', rpe: 8, restSecs: 60, notes: 'Rotational core power' },
            { name: 'Assault Bike Sprint Intervals', sets: 5, reps: '20s max / 40s easy', rpe: 9.5, restSecs: 60, notes: 'VO2 max conditioning' }
          ]
        }
      ]
    };
  }

  // 4 or 5 Day Split: Upper / Lower Hypertrophy
  return {
    id: `proto_${Date.now()}`,
    title: '4-Day Precision Upper / Lower Hypertrophy Split',
    split: 'Upper Power, Lower Power, Upper Hypertrophy, Lower Volume',
    frequency: '4 Days / Week (Mon/Tue/Thu/Fri)',
    targetGoal: goal.replace('_', ' ').toUpperCase(),
    recoveryProtocol: 'Cold Plunge Contrast Therapy (3 rounds of 3 mins cold @ 42°F / 10 mins infrared sauna @ 140°F)',
    days: [
      {
        dayName: 'Day 1: Upper Power Focus',
        focus: 'Heavy Horizontal & Vertical Press/Pull',
        exercises: [
          { name: 'Competition Barbell Bench Press', sets: 4, reps: '5-6', rpe: 8.5, restSecs: 180, notes: 'Controlled 2-second eccentric phase' },
          { name: 'Weighted Pull-Ups', sets: 4, reps: '6-8', rpe: 8.5, restSecs: 120, notes: 'Full dead-hang to chin over bar' },
          { name: 'Incline Dumbbell Row', sets: 3, reps: '8-10', rpe: 8, restSecs: 90, notes: 'Squeeze scapulae at peak' },
          { name: 'Seated Dumbbell Shoulder Press', sets: 3, reps: '8-10', rpe: 8, restSecs: 90, notes: 'Stop right above shoulder level' }
        ]
      },
      {
        dayName: 'Day 2: Lower Power & Core',
        focus: 'Squat & Hinge Mechanics',
        exercises: [
          { name: 'Olympic Barbell Squat', sets: 4, reps: '5-6', rpe: 8.5, restSecs: 180, notes: 'Below parallel depth' },
          { name: 'Stiff-Legged Deadlift', sets: 4, reps: '6-8', rpe: 8, restSecs: 120, notes: 'Feel deep hamstring stretch' },
          { name: 'Walking Dumbbell Lunges', sets: 3, reps: '10/leg', rpe: 8.5, restSecs: 90, notes: 'Upright torso posture' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rpe: 8, restSecs: 60, notes: 'Posterior pelvic tilt focus' }
        ]
      },
      {
        dayName: 'Day 3: Upper Hypertrophy & Pump',
        focus: 'Myofibrillar Hypertrophy & Arms',
        exercises: [
          { name: 'Incline Barbell Bench Press', sets: 3, reps: '8-10', rpe: 8.5, restSecs: 90, notes: 'Upper chest shelf activation' },
          { name: 'Chest-Supported T-Bar Row', sets: 3, reps: '10-12', rpe: 8.5, restSecs: 90, notes: 'Wide grip elbow flare' },
          { name: 'Dumbbell Lateral Raises (Drop-set)', sets: 4, reps: '12-15', rpe: 9, restSecs: 60, notes: 'Lean slightly forward' },
          { name: 'Triceps Overhead Cable Extension', sets: 3, reps: '12-15', rpe: 9, restSecs: 60, notes: 'Long head tricep stretch' }
        ]
      },
      {
        dayName: 'Day 4: Lower Volume & Posterior',
        focus: 'Quad Pump & Glute/Hamstring Isolation',
        exercises: [
          { name: 'Leg Press (Artis Technogym)', sets: 4, reps: '10-12', rpe: 8.5, restSecs: 120, notes: 'Mid-foot drive, deep descent' },
          { name: 'Lying Hamstring Leg Curl', sets: 4, reps: '10-12', rpe: 9, restSecs: 75, notes: 'Slow 3-second negative' },
          { name: 'Bulgarian Split Squats', sets: 3, reps: '10/leg', rpe: 9, restSecs: 90, notes: 'Dumbbells at sides' },
          { name: 'Standing Calf Raises', sets: 4, reps: '15-20', rpe: 9, restSecs: 60, notes: 'Pause 2s in full stretch' }
        ]
      }
    ]
  };
}

/**
 * AGENT TOOL 3: Formulate Precision Nutrition & Macro Plan
 */
export function formulateNutritionPlanTool(params: {
  weightKg: number;
  tdee: number;
  goal: string;
}): NutritionPlan {
  const { weightKg, tdee, goal } = params;

  let targetCalories = tdee;
  let proteinRatio = 2.0; // grams per kg

  if (goal === 'fat_loss') {
    targetCalories = Math.round(tdee - 450); // Moderate 450 kcal deficit
    proteinRatio = 2.2; // Elevated protein to preserve lean muscle tissue
  } else if (goal === 'muscle_gain') {
    targetCalories = Math.round(tdee + 350); // Clean lean surplus
    proteinRatio = 2.0;
  } else if (goal === 'strength') {
    targetCalories = Math.round(tdee + 150);
    proteinRatio = 2.1;
  }

  const proteinGrams = Math.round(weightKg * proteinRatio);
  const proteinCalories = proteinGrams * 4;

  // Fat allocation: 25% of target calories
  const fatCalories = Math.round(targetCalories * 0.25);
  const fatGrams = Math.round(fatCalories / 9);

  // Remainder to Carbohydrates
  const carbCalories = Math.max(targetCalories - (proteinCalories + fatCalories), 0);
  const carbGrams = Math.round(carbCalories / 4);

  const hydrationLiters = parseFloat(((weightKg * 0.035) + 0.75).toFixed(1));

  return {
    bmr: Math.round(tdee / 1.55),
    tdee,
    targetCalories,
    goal: goal.replace('_', ' '),
    macros: {
      proteinGrams,
      carbGrams,
      fatGrams
    },
    hydrationLiters,
    mealTimingTips: [
      `Consume 35-45g protein within 2 hours post-resistance workout to trigger muscle protein synthesis (MPS).`,
      `Position 60% of total daily carbohydrates around your pre- and post-workout windows for glycogen replenishment.`,
      `Maintain 500ml water intake upon waking with a pinch of Himalayan pink salt for adrenal and cellular hydration.`,
      `Discontinue caffeine intake 8 hours prior to sleep to safeguard deep REM and growth hormone (GH) secretion.`
    ]
  };
}

/**
 * AGENT TOOL 4: Book VIP Trial Pass
 */
export function bookVipTrialPassTool(params: {
  clientName: string;
  contactPhone: string;
  interestDomain?: string;
}) {
  const passCode = `ELITE-VIP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  return {
    success: true,
    passCode,
    clientName: params.clientName,
    contactPhone: params.contactPhone,
    status: 'ACTIVE_RESERVED',
    validityHours: 48,
    includedPerks: [
      '25,000 sq ft Floor & Technogym Access',
      'Complimentary InBody 770 Diagnostic Body Scan',
      'Infrared Sauna & Cold Plunge Recovery Suite',
      '15-Minute Consultation with Head Coach Marcus Johnson'
    ],
    redemptionInstructions: `Present code ${passCode} at the 123 Fitness Blvd reception desk.`
  };
}

/**
 * AGENT TOOL 5: Query Facility Specifications
 */
export function queryFacilitySpecsTool(domain?: string) {
  const specs = {
    facility: {
      sqFt: 25000,
      ceilingHeight: '18 ft Acoustic Dampened',
      airFiltration: 'Medical Grade HEPA-13 HVAC (Air turnaround every 12 mins)',
      flooring: 'Regupol Shock-Absorptive Rubber Compound',
      access: '24/7 Biometric Turnstiles & Keyless RFID'
    },
    hardware: {
      strengthTech: 'Technogym Artis Pure Strength',
      freeWeights: 'Eleiko IWF Certified Olympic Barbells & Urethane Plates',
      powerRacks: '12 Custom Olympic Power Stations with Drop Platforms',
      cardio: 'Woodway Curved Slat Treadmills & Keiser M3i Indoor Bikes',
      turfTrack: '40-Yard Sprint & Prowler Turf Track'
    },
    recovery: {
      infraredSauna: 'Clearlight Sanctuary Full-Spectrum (130°F - 150°F)',
      coldPlunge: 'Twin Commercial Chilled Tubs at 42°F (5.5°C)',
      percussiveLounge: 'Hyperice & Normatec Dynamic Compression Boots',
      diagnostics: 'InBody 770 Multi-Frequency Composition Analyzer'
    }
  };

  if (domain && domain in specs) {
    return (specs as any)[domain];
  }
  return specs;
}
