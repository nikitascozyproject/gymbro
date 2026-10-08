const split = ["lower", "upper", "lower", "upper"];

const focusByDay = {
  lower: ["glutes", "hamstrings", "quads", "core"],
  upper: ["back", "shoulders", "chest", "biceps", "triceps", "core"],
};

const dayNames = { lower: "Lower Body + Core", upper: "Upper Body + Core" };

// Gymbro allocates more exercise slots to larger / higher-volume muscle groups.
// This is deliberately anatomy/programming-based, not gender-based.
const muscleVolumeWeight = {
  glutes: 2,
  quads: 2,
  hamstrings: 1.5,
  back: 2,
  chest: 1.5,
  shoulders: 1,
  triceps: 0.9,
  biceps: 0.8,
  core: 0.8,
};

function getMuscleTargets(focus, totalExercises) {
  if (!focus.length) return {};
  if (focus.length === 1) return { [focus[0]]: totalExercises };

  const weights = focus.map((muscle) => muscleVolumeWeight[muscle] || 1);
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const raw = weights.map((weight) => (weight / totalWeight) * totalExercises);
  const targets = raw.map((value) => Math.max(1, Math.floor(value)));
  let assigned = targets.reduce((sum, value) => sum + value, 0);

  // Distribute rounding leftovers to the muscles with the largest fractional
  // share, so the final total always equals the requested exercise count.
  const order = raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction);

  for (let i = 0; assigned < totalExercises; i += 1) {
    targets[order[i % order.length].index] += 1;
    assigned += 1;
  }

  while (assigned > totalExercises) {
    const removable = targets
      .map((value, index) => ({ value, index }))
      .filter((item) => item.value > 1)
      .sort((a, b) => b.value - a.value)[0];
    if (!removable) break;
    targets[removable.index] -= 1;
    assigned -= 1;
  }

  return Object.fromEntries(focus.map((muscle, index) => [muscle, targets[index]]));
}

function matchesEquipment(exercise, equipment) {
  return exercise.equipment.some((item) => equipment.includes(item));
}

function scoreExercise(exercise, focus, recentIds, energy = "normal", intensity = "moderate", shuffle = false) {
  let score = 0;
  if (exercise.muscles.some((muscle) => focus.includes(muscle))) score += 5;
  if (exercise.muscles.includes("core")) score += 2;
  if (energy === "low" && ["hinge","squat","vertical-push","machine-press"].includes(exercise.pattern)) score -= 3;
  if (energy === "high" && ["raise","raise-2","rear-delt","front-raise"].includes(exercise.pattern)) score += 1;
  if (!recentIds.includes(exercise.id)) score += 4;
  else score -= 6;
  // Shuffle should feel meaningfully different rather than simply selecting the
  // next item in a fixed ranking. The jitter is deliberately small so programming
  // quality still dominates randomness.
  if (shuffle) score += Math.random() * 5;
  return score;
}

function buildCandidates({ library, equipment, equipmentModes, focus, recentIds, energy, intensity, excludeIds, shuffle }) {
  return library
    .filter((exercise) => matchesEquipment(exercise, equipment))
    .filter((exercise) => {
      if (equipmentModes.includes("equipment") && exercise.equipment.some((item) => item !== "bodyweight")) return true;
      if (equipmentModes.includes("dumbbells") && exercise.equipment.includes("dumbbells")) return true;
      if (equipmentModes.includes("bodyweight") && exercise.equipment.includes("bodyweight")) return true;
      return false;
    })
    .filter((exercise) => !excludeIds.includes(exercise.id))
    .map((exercise) => ({
      exercise,
      score: scoreExercise(exercise, focus, recentIds, energy, intensity, shuffle),
    }))
    .sort((a, b) => b.score - a.score);
}

function selectExercises(candidates, focus, maxExercises) {
  const selected = [];
  const usedPatterns = new Set();
  const targets = getMuscleTargets(focus, maxExercises);

  // Larger muscle groups receive more slots. This keeps a seven-exercise
  // back+biceps session closer to 5+2 than an arbitrary 4+3 split.
  focus.forEach((muscle) => {
    const target = targets[muscle] || 1;
    const muscleCandidates = candidates.filter(({ exercise }) =>
      exercise.muscles.includes(muscle) && !selected.some((item) => item.id === exercise.id)
    );

    for (const { exercise } of muscleCandidates) {
      if (selected.length >= maxExercises) break;
      if (selected.filter((item) => item.muscles.includes(muscle)).length >= target) break;
      if (usedPatterns.has(exercise.pattern) && selected.length < Math.min(3, maxExercises)) continue;
      selected.push(exercise);
      usedPatterns.add(exercise.pattern);
    }
  });

  for (const { exercise } of candidates) {
    if (selected.length >= maxExercises) break;
    if (selected.some((item) => item.id === exercise.id)) continue;
    if (usedPatterns.has(exercise.pattern) && selected.length < Math.min(3, maxExercises)) continue;
    if (!exercise.muscles.some((muscle) => focus.includes(muscle))) continue;
    selected.push(exercise);
    usedPatterns.add(exercise.pattern);
  }

  return selected.slice(0, maxExercises);
}

export function generateWorkout({
  library,
  equipment,
  trainingDays = 4,
  history = [],
  focusOverride = null,
  exerciseCount = 5,
  constraints = {},
  excludeIds = [],
  shuffle = false,
}) {
  const recentIds = history.slice(-8).flatMap((session) => session.exerciseIds || []);
  const dayIndex = history.length % Math.max(1, Math.min(trainingDays, split.length));
  const type = focusOverride?.length ? "custom" : split[dayIndex % split.length];
  const focus = focusOverride?.length ? focusOverride : focusByDay[type];
  const {
    timeAvailable = "45",
    energy = "normal",
    intensity = "moderate",
    equipmentModes = ["equipment"],
  } = constraints;
  const timeCaps = { "20": 3, "30": 4, "45": 6, "60+": 7 };
  // A custom session needs enough exercises to give every selected muscle
  // meaningful attention. More muscle groups = more programming volume.
  const minimumExercisesForFocus = focusOverride?.length
    ? Math.min(7, Math.max(exerciseCount, focusOverride.length * 2))
    : exerciseCount;
  const maxExercises = Math.min(
    minimumExercisesForFocus,
    timeCaps[timeAvailable] || minimumExercisesForFocus
  );

  let candidates = buildCandidates({
    library, equipment, equipmentModes, focus, recentIds, energy, intensity, excludeIds, shuffle,
  });

  let selected;
  if (shuffle && maxExercises === 1) {
    // A single-exercise shuffle must stay inside the muscle being replaced.
    // The directory is broad, but the substitution pool is deliberately narrow.
    const focusedCandidates = candidates.filter(({ exercise }) =>
      exercise.muscles.some((muscle) => focus.includes(muscle))
    );

    if (focusedCandidates.length) {
      // Explore the strongest part of the focused pool rather than repeatedly
      // returning the same top-ranked alternative.
      const poolSize = Math.min(8, focusedCandidates.length);
      const pick = Math.floor(Math.random() * poolSize);
      selected = [focusedCandidates[pick].exercise];
    } else {
      selected = [];
    }
  } else {
    selected = selectExercises(candidates, focus, maxExercises);
  }

  // If a very small muscle-specific pool cannot produce the requested number
  // of alternatives, keep the same focus and relax the "different exercise"
  // rule only for the final slots rather than returning an undersized workout.
  if (selected.length < maxExercises && excludeIds.length) {
    const fallbackCandidates = buildCandidates({
      library,
      equipment,
      equipmentModes,
      focus,
      recentIds,
      energy,
      intensity,
      excludeIds: [],
      shuffle,
    }).filter(({ exercise }) => !selected.some((item) => item.id === exercise.id));
    selected = selectExercises(
      [...selected.map((exercise) => ({ exercise, score: 999 })), ...fallbackCandidates],
      focus,
      maxExercises
    );
  }

  return {
    recommendedExerciseCount: focusOverride?.length
      ? Math.min(7, Math.max(2, focusOverride.length * 2))
      : maxExercises,
    recommendedTime: focusOverride?.length
      ? (focusOverride.length >= 3 ? "60+" : focusOverride.length === 2 ? "45" : "30")
      : timeAvailable,
    id: `${type}-${history.length + 1}-${shuffle ? Date.now() : "base"}`,
    type,
    title: focusOverride?.length
      ? focusOverride.map((x) => x[0].toUpperCase() + x.slice(1)).join(" + ") + " Workout"
      : dayNames[type],
    subtitle: focusOverride?.length
      ? `A ${selected.length}-exercise session · ${energy} energy · ${intensity} intensity`
      : type === "lower"
        ? "Glutes, legs & a strong core"
        : "Back, shoulders & a strong core",
    duration: timeAvailable === "60+" ? "45–60 min" : `${timeAvailable} min`,
    focus: focus
      .filter((muscle) => selected.some((exercise) => exercise.muscles.includes(muscle)))
      .map((x) => x[0].toUpperCase() + x.slice(1)),
    exercises: selected,
  };
}
