const split = ["lower", "upper", "lower", "upper"];

const focusByDay = {
  lower: ["glutes", "hamstrings", "quads", "core"],
  upper: ["back", "shoulders", "chest", "arms", "core"],
};

const dayNames = { lower: "Lower Body + Core", upper: "Upper Body + Core" };

function matchesEquipment(exercise, equipment) {
  return exercise.equipment.some((item) => equipment.includes(item));
}

function scoreExercise(exercise, focus, recentIds) {
  let score = 0;
  if (exercise.muscles.some((muscle) => focus.includes(muscle))) score += 5;
  if (exercise.muscles.includes("core")) score += 2;
  if (!recentIds.includes(exercise.id)) score += 4;
  else score -= 6;
  return score;
}

export function generateWorkout({ library, equipment, trainingDays = 4, history = [], focusOverride = null, exerciseCount = 5 }) {
  const recentIds = history.slice(-8).flatMap((session) => session.exerciseIds || []);
  const dayIndex = history.length % Math.max(1, Math.min(trainingDays, split.length));
  const type = focusOverride?.length ? "custom" : split[dayIndex % split.length];
  const focus = focusOverride?.length ? focusOverride : focusByDay[type];

  const candidates = library
    .filter((exercise) => matchesEquipment(exercise, equipment))
    .map((exercise) => ({ exercise, score: scoreExercise(exercise, focus, recentIds) }))
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const usedPatterns = new Set();

  for (const { exercise } of candidates) {
    if (selected.length >= exerciseCount) break;
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
    subtitle: focusOverride?.length ? `A ${selected.length}-exercise session built around what you chose` : type === "lower" ? "Glutes, legs & a strong core" : "Back, shoulders & a strong core",
    duration: selected.length <= 3 ? "20–30 min" : selected.length <= 5 ? "35–45 min" : "45–60 min",
    focus: focus.filter((muscle) => selected.some((exercise) => exercise.muscles.includes(muscle)))
      .map((x) => x[0].toUpperCase() + x.slice(1)),
    exercises: selected,
  };
}
