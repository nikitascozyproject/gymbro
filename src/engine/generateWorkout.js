const split = ["lower", "upper", "lower", "upper"];

const focusByDay = {
  lower: ["glutes", "hamstrings", "quads", "core"],
  upper: ["back", "shoulders", "chest", "arms", "core"],
};

const dayNames = { lower: "Lower Body + Core", upper: "Upper Body + Core" };

function matchesEquipment(exercise, equipment) {
  return exercise.equipment.some((item) => equipment.includes(item));
}

function scoreExercise(exercise, focus, recentIds, energy = "normal", intensity = "moderate") {
  let score = 0;
  if (exercise.muscles.some((muscle) => focus.includes(muscle))) score += 5;
  if (exercise.muscles.includes("core")) score += 2;
  if (energy === "low" && ["hinge","squat","vertical-push","machine-press"].includes(exercise.pattern)) score -= 3;
  if (energy === "high" && ["raise","raise-2","rear-delt","front-raise"].includes(exercise.pattern)) score += 1;
  if (!recentIds.includes(exercise.id)) score += 4;
  else score -= 6;
  return score;
}

export function generateWorkout({ library, equipment, trainingDays = 4, history = [], focusOverride = null, exerciseCount = 5, constraints = {} }) {
  const recentIds = history.slice(-8).flatMap((session) => session.exerciseIds || []);
  const dayIndex = history.length % Math.max(1, Math.min(trainingDays, split.length));
  const type = focusOverride?.length ? "custom" : split[dayIndex % split.length];
  const focus = focusOverride?.length ? focusOverride : focusByDay[type];
  const { timeAvailable = "45", energy = "normal", intensity = "moderate", avoid = [] } = constraints;
  const timeCaps = { "20": 3, "30": 4, "45": 6, "60+": 7 };
  const maxExercises = Math.min(exerciseCount, timeCaps[timeAvailable] || exerciseCount);

  const candidates = library
    .filter((exercise) => matchesEquipment(exercise, equipment))
    .filter((exercise) => !avoid.includes("heavy") || !["barbell","machine"].some(item => exercise.equipment.includes(item)))
    .filter((exercise) => !avoid.includes("floor") || !exercise.equipment.includes("bodyweight"))
    .filter((exercise) => !avoid.includes("unilateral") || !["split-squat"].includes(exercise.id))
    .filter((exercise) => !avoid.includes("jumping"))
    .map((exercise) => ({ exercise, score: scoreExercise(exercise, focus, recentIds, energy, intensity) }))
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const usedPatterns = new Set();

  for (const { exercise } of candidates) {
    if (selected.length >= maxExercises) break;
    if (usedPatterns.has(exercise.pattern) && selected.length < Math.min(3, exerciseCount)) continue;
    selected.push(exercise);
    usedPatterns.add(exercise.pattern);
  }

  const core = candidates.find(({ exercise }) =>
    exercise.muscles.includes("core") && !selected.some((item) => item.id === exercise.id)
  );
  if (core && !selected.some((item) => item.muscles.includes("core"))) selected.push(core.exercise);

  return {
    id: `${type}-${history.length + 1}`,
    type,
    title: focusOverride?.length ? focusOverride.map(x => x[0].toUpperCase() + x.slice(1)).join(" + ") + " Workout" : dayNames[type],
    subtitle: focusOverride?.length ? `A ${selected.length}-exercise session · ${energy} energy · ${intensity} intensity` : type === "lower" ? "Glutes, legs & a strong core" : "Back, shoulders & a strong core",
    duration: timeAvailable === "60+" ? "45–60 min" : `${timeAvailable} min`,
    focus: focus.filter((muscle) => selected.some((exercise) => exercise.muscles.includes(muscle)))
      .map((x) => x[0].toUpperCase() + x.slice(1)),
    exercises: selected,
  };
}
