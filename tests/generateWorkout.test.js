import test from "node:test";
import assert from "node:assert/strict";
import { generateWorkout } from "../src/engine/generateWorkout.js";
import { exerciseLibrary, defaultProfile } from "../src/data/workouts.js";

const base = {
  library: exerciseLibrary,
  equipment: defaultProfile.equipment,
  unavailableEquipment: [],
  unavailableExerciseIds: [],
  history: [],
  focusOverride: ["quads"],
  exerciseCount: 5,
  constraints: { timeAvailable: "45", energy: "normal", intensity: "moderate", equipmentModes: ["equipment"] },
};

test("generator returns unique exercises within the selected duration", () => {
  const result = generateWorkout(base);
  const ids = result.exercises.map((exercise) => exercise.id);
  assert.ok(ids.length > 0, "a supported focus should produce exercises");
  assert.ok(ids.length <= 5, "45-minute sessions must not exceed five exercises");
  assert.equal(new Set(ids).size, ids.length, "a workout must not contain duplicate exercise IDs");
});

test("generator never selects an explicitly unavailable exercise", () => {
  const blocked = exerciseLibrary.find((exercise) => exercise.muscles[0] === "quads");
  assert.ok(blocked);
  const result = generateWorkout({ ...base, unavailableExerciseIds: [blocked.id] });
  assert.ok(!result.exercises.some((exercise) => exercise.id === blocked.id));
});

test("generator respects equipment exclusions", () => {
  const result = generateWorkout({
    ...base,
    focusOverride: ["hamstrings"],
    unavailableEquipment: ["leg-curl"],
  });
  assert.ok(result.exercises.every((exercise) => !exercise.equipment.includes("leg-curl")));
});

test("single-exercise shuffle returns at most one eligible replacement", () => {
  const blockedIds = base.library
    .filter((exercise) => exercise.muscles[0] === "quads")
    .slice(0, 3)
    .map((exercise) => exercise.id);
  const result = generateWorkout({
    ...base,
    excludeIds: blockedIds,
    shuffle: true,
    singleExerciseShuffle: true,
  });
  assert.ok(result.exercises.length <= 1);
  assert.ok(result.exercises.every((exercise) => !blockedIds.includes(exercise.id)));
});

test("lower-body sessions include varied movement families when eligible", () => {
  const result = generateWorkout({
    ...base,
    focusOverride: ["glutes", "quads", "hamstrings"],
    exerciseCount: 5,
    constraints: { ...base.constraints, equipmentModes: ["equipment", "bodyweight"] },
  });
  const patterns = new Set(result.exercises.map((exercise) => exercise.pattern));
  assert.ok(patterns.size >= Math.min(3, result.exercises.length), "lower-body programming should avoid clustering into one pattern");
});

test("empty or unsupported focus fails safely with an empty exercise list", () => {
  const result = generateWorkout({ ...base, focusOverride: ["not-a-real-muscle"] });
  assert.deepEqual(result.exercises, []);
});
