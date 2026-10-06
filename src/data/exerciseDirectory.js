// Gymbro's exercise directory.
// This is the structured catalogue used to expand programming safely.
// Each entry describes the movement pattern, primary/secondary muscles,
// equipment, and useful tags so the engine can later make substitutions,
// shuffle sessions, and build goal-specific programmes.

export const exerciseDirectory = [
  // LOWER BODY — GLUTES
  { id:"barbell-hip-thrust", name:"Barbell Hip Thrust", muscles:["glutes"], pattern:"hip-extension", equipment:["barbell","bench"], tags:["compound","glute-focus"] },
  { id:"dumbbell-hip-thrust", name:"Dumbbell Hip Thrust", muscles:["glutes"], pattern:"hip-extension", equipment:["dumbbells","bench"], tags:["compound","glute-focus"] },
  { id:"glute-bridge", name:"Glute Bridge", muscles:["glutes"], pattern:"hip-extension", equipment:["bodyweight"], tags:["bodyweight","glute-focus"] },
  { id:"single-leg-glute-bridge", name:"Single-Leg Glute Bridge", muscles:["glutes"], pattern:"hip-extension-unilateral", equipment:["bodyweight"], tags:["unilateral","bodyweight"] },
  { id:"cable-kickback", name:"Cable Glute Kickback", muscles:["glutes"], pattern:"hip-extension-isolation", equipment:["cable"], tags:["isolation","glute-focus"] },
  { id:"dumbbell-kickback", name:"Dumbbell Glute Kickback", muscles:["glutes"], pattern:"hip-extension-isolation", equipment:["dumbbells"], tags:["isolation"] },
  { id:"cable-hip-abduction", name:"Cable Hip Abduction", muscles:["glutes"], pattern:"abduction", equipment:["cable"], tags:["isolation","glute-focus"] },
  { id:"side-lying-leg-raise", name:"Side-Lying Leg Raise", muscles:["glutes"], pattern:"abduction", equipment:["bodyweight"], tags:["isolation","bodyweight"] },
  { id:"step-up", name:"Dumbbell Step-Up", muscles:["glutes","quads"], pattern:"step-up", equipment:["dumbbells","bench"], tags:["compound","unilateral"] },
  { id:"reverse-lunge", name:"Reverse Lunge", muscles:["glutes","quads"], pattern:"lunge", equipment:["bodyweight","dumbbells"], tags:["compound","unilateral"] },
  { id:"walking-lunge", name:"Walking Lunge", muscles:["glutes","quads"], pattern:"lunge", equipment:["bodyweight","dumbbells"], tags:["compound","unilateral"] },
  { id:"curtsy-lunge", name:"Curtsy Lunge", muscles:["glutes","quads"], pattern:"lunge-diagonal", equipment:["bodyweight","dumbbells"], tags:["unilateral"] },

  // LOWER BODY — QUADS
  { id:"back-squat", name:"Barbell Back Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["barbell"], tags:["compound"] },
  { id:"front-squat", name:"Barbell Front Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["barbell"], tags:["compound"] },
  { id:"goblet-squat", name:"Goblet Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["dumbbells"], tags:["compound"] },
  { id:"heel-elevated-squat", name:"Heel-Elevated Goblet Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["dumbbells"], tags:["compound","quad-focus"] },
  { id:"split-squat", name:"Bulgarian Split Squat", muscles:["quads","glutes"], pattern:"split-squat", equipment:["dumbbells","bench"], tags:["compound","unilateral"] },
  { id:"reverse-step-down", name:"Reverse Step-Down", muscles:["quads","glutes"], pattern:"step-down", equipment:["bodyweight","bench"], tags:["unilateral"] },
  { id:"leg-press", name:"Leg Press", muscles:["quads","glutes"], pattern:"leg-press", equipment:["machine"], tags:["compound"] },
  { id:"leg-extension", name:"Leg Extension", muscles:["quads"], pattern:"knee-extension", equipment:["leg-extension"], tags:["isolation","quad-focus"] },

  // LOWER BODY — HAMSTRINGS
  { id:"romanian-deadlift", name:"Romanian Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["dumbbells","barbell"], tags:["compound","hinge"] },
  { id:"stiff-leg-deadlift", name:"Stiff-Leg Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["dumbbells","barbell"], tags:["compound","hinge"] },
  { id:"single-leg-rdl", name:"Single-Leg Romanian Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge-unilateral", equipment:["dumbbells"], tags:["unilateral","hinge"] },
  { id:"good-morning", name:"Barbell Good Morning", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["barbell"], tags:["compound","hinge"] },
  { id:"cable-pull-through", name:"Cable Pull-Through", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["cable"], tags:["compound","hinge"] },
  { id:"lying-leg-curl", name:"Lying Leg Curl", muscles:["hamstrings"], pattern:"knee-flexion", equipment:["leg-curl"], tags:["isolation"] },
  { id:"seated-leg-curl", name:"Seated Leg Curl", muscles:["hamstrings"], pattern:"knee-flexion", equipment:["leg-curl"], tags:["isolation"] },
  { id:"nordic-curl", name:"Nordic Hamstring Curl", muscles:["hamstrings"], pattern:"knee-flexion", equipment:["bodyweight"], tags:["advanced","bodyweight"] },

  // BACK
  { id:"lat-pulldown", name:"Lat Pulldown", muscles:["back","biceps"], pattern:"vertical-pull", equipment:["cable"], tags:["compound"] },
  { id:"assisted-pull-up", name:"Assisted Pull-Up", muscles:["back","biceps"], pattern:"vertical-pull", equipment:["machine"], tags:["compound"] },
  { id:"pull-up", name:"Pull-Up", muscles:["back","biceps"], pattern:"vertical-pull", equipment:["bodyweight"], tags:["compound","advanced"] },
  { id:"neutral-grip-pulldown", name:"Neutral-Grip Lat Pulldown", muscles:["back","biceps"], pattern:"vertical-pull", equipment:["cable"], tags:["compound"] },
  { id:"seated-cable-row", name:"Seated Cable Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["cable"], tags:["compound"] },
  { id:"chest-supported-row", name:"Chest-Supported Dumbbell Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"one-arm-dumbbell-row", name:"One-Arm Dumbbell Row", muscles:["back","biceps"], pattern:"horizontal-pull-unilateral", equipment:["dumbbells","bench"], tags:["compound","unilateral"] },
  { id:"barbell-row", name:"Barbell Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["barbell"], tags:["compound"] },
  { id:"cable-straight-arm-pulldown", name:"Cable Straight-Arm Pulldown", muscles:["back"], pattern:"shoulder-extension", equipment:["cable"], tags:["isolation"] },
  { id:"dumbbell-pullover", name:"Dumbbell Pullover", muscles:["back","chest"], pattern:"shoulder-extension", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"machine-row", name:"Machine Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["machine"], tags:["compound"] },

  // SHOULDERS
  { id:"dumbbell-shoulder-press", name:"Dumbbell Shoulder Press", muscles:["shoulders","triceps"], pattern:"vertical-push", equipment:["dumbbells"], tags:["compound"] },
  { id:"machine-shoulder-press", name:"Machine Shoulder Press", muscles:["shoulders","triceps"], pattern:"vertical-push", equipment:["machine"], tags:["compound"] },
  { id:"barbell-overhead-press", name:"Barbell Overhead Press", muscles:["shoulders","triceps"], pattern:"vertical-push", equipment:["barbell"], tags:["compound"] },
  { id:"arnold-press", name:"Arnold Press", muscles:["shoulders","triceps"], pattern:"vertical-push-rotation", equipment:["dumbbells"], tags:["compound"] },
  { id:"dumbbell-lateral-raise", name:"Dumbbell Lateral Raise", muscles:["shoulders"], pattern:"lateral-raise", equipment:["dumbbells"], tags:["isolation"] },
  { id:"cable-lateral-raise", name:"Cable Lateral Raise", muscles:["shoulders"], pattern:"lateral-raise", equipment:["cable"], tags:["isolation"] },
  { id:"leaning-lateral-raise", name:"Leaning Dumbbell Lateral Raise", muscles:["shoulders"], pattern:"lateral-raise", equipment:["dumbbells"], tags:["isolation"] },
  { id:"rear-delt-fly", name:"Rear Delt Fly", muscles:["shoulders"], pattern:"rear-delt", equipment:["dumbbells","machine"], tags:["isolation"] },
  { id:"cable-rear-delt-fly", name:"Cable Rear Delt Fly", muscles:["shoulders"], pattern:"rear-delt", equipment:["cable"], tags:["isolation"] },
  { id:"face-pull", name:"Cable Face Pull", muscles:["shoulders","back"], pattern:"face-pull", equipment:["cable"], tags:["isolation","posture"] },
  { id:"front-raise", name:"Dumbbell Front Raise", muscles:["shoulders"], pattern:"front-raise", equipment:["dumbbells"], tags:["isolation"] },
  { id:"cable-front-raise", name:"Cable Front Raise", muscles:["shoulders"], pattern:"front-raise", equipment:["cable"], tags:["isolation"] },

  // CHEST
  { id:"machine-chest-press", name:"Chest Press", muscles:["chest","triceps"], pattern:"horizontal-push", equipment:["machine"], tags:["compound"] },
  { id:"dumbbell-bench-press", name:"Dumbbell Bench Press", muscles:["chest","triceps"], pattern:"horizontal-push", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"barbell-bench-press", name:"Barbell Bench Press", muscles:["chest","triceps"], pattern:"horizontal-push", equipment:["barbell","bench"], tags:["compound"] },
  { id:"incline-dumbbell-press", name:"Incline Dumbbell Press", muscles:["chest","shoulders","triceps"], pattern:"incline-push", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"incline-machine-press", name:"Incline Machine Press", muscles:["chest","shoulders","triceps"], pattern:"incline-push", equipment:["machine"], tags:["compound"] },
  { id:"cable-chest-fly", name:"Cable Chest Fly", muscles:["chest"], pattern:"fly", equipment:["cable"], tags:["isolation"] },
  { id:"dumbbell-chest-fly", name:"Dumbbell Chest Fly", muscles:["chest"], pattern:"fly", equipment:["dumbbells","bench"], tags:["isolation"] },
  { id:"push-up", name:"Push-Up", muscles:["chest","triceps","shoulders"], pattern:"horizontal-push", equipment:["bodyweight"], tags:["compound","bodyweight"] },

  // BICEPS
  { id:"dumbbell-curl", name:"Dumbbell Biceps Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["dumbbells"], tags:["isolation"] },
  { id:"hammer-curl", name:"Dumbbell Hammer Curl", muscles:["biceps"], pattern:"elbow-flexion-neutral", equipment:["dumbbells"], tags:["isolation"] },
  { id:"incline-dumbbell-curl", name:"Incline Dumbbell Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["dumbbells","bench"], tags:["isolation"] },
  { id:"cable-curl", name:"Cable Biceps Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["cable"], tags:["isolation"] },
  { id:"preacher-curl", name:"Preacher Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["machine","bench"], tags:["isolation"] },
  { id:"concentration-curl", name:"Concentration Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["dumbbells","bench"], tags:["isolation"] },

  // TRICEPS
  { id:"cable-pushdown", name:"Cable Triceps Pushdown", muscles:["triceps"], pattern:"elbow-extension", equipment:["cable"], tags:["isolation"] },
  { id:"overhead-cable-extension", name:"Overhead Cable Triceps Extension", muscles:["triceps"], pattern:"elbow-extension-overhead", equipment:["cable"], tags:["isolation"] },
  { id:"dumbbell-overhead-extension", name:"Dumbbell Overhead Triceps Extension", muscles:["triceps"], pattern:"elbow-extension-overhead", equipment:["dumbbells"], tags:["isolation"] },
  { id:"skull-crusher", name:"Dumbbell Skull Crusher", muscles:["triceps"], pattern:"elbow-extension", equipment:["dumbbells","bench"], tags:["isolation"] },
  { id:"close-grip-push-up", name:"Close-Grip Push-Up", muscles:["triceps","chest"], pattern:"horizontal-push", equipment:["bodyweight"], tags:["compound","bodyweight"] },
  { id:"bench-dip", name:"Bench Dip", muscles:["triceps","chest"], pattern:"dip", equipment:["bench"], tags:["bodyweight"] },

  // CORE
  { id:"dead-bug", name:"Dead Bug", muscles:["core"], pattern:"anti-extension", equipment:["bodyweight"], tags:["core","bodyweight"] },
  { id:"bird-dog", name:"Bird Dog", muscles:["core"], pattern:"anti-rotation", equipment:["bodyweight"], tags:["core","bodyweight"] },
  { id:"forearm-plank", name:"Forearm Plank", muscles:["core"], pattern:"anti-extension", equipment:["bodyweight"], tags:["core","bodyweight"] },
  { id:"side-plank", name:"Side Plank", muscles:["core"], pattern:"anti-lateral-flexion", equipment:["bodyweight"], tags:["core","bodyweight"] },
  { id:"high-plank", name:"High Plank", muscles:["core"], pattern:"anti-extension", equipment:["bodyweight"], tags:["core","bodyweight"] },
  { id:"dead-bug-band", name:"Band-Resisted Dead Bug", muscles:["core"], pattern:"anti-extension", equipment:["resistance-band"], tags:["core"] },
  { id:"pallof-press", name:"Pallof Press", muscles:["core"], pattern:"anti-rotation", equipment:["cable","resistance-band"], tags:["core"] },
  { id:"cable-crunch", name:"Cable Crunch", muscles:["core"], pattern:"spinal-flexion", equipment:["cable"], tags:["core","weighted"] },
  { id:"reverse-crunch", name:"Reverse Crunch", muscles:["core"], pattern:"spinal-flexion", equipment:["bodyweight"], tags:["core","bodyweight"] },
  { id:"hanging-knee-raise", name:"Hanging Knee Raise", muscles:["core"], pattern:"hip-flexion", equipment:["bodyweight"], tags:["core"] },
  { id:"bicycle-crunch", name:"Bicycle Crunch", muscles:["core"], pattern:"rotation", equipment:["bodyweight"], tags:["core","bodyweight"] },
];

export const exerciseDirectoryByMuscle = exerciseDirectory.reduce((groups, exercise) => {
  exercise.muscles.forEach((muscle) => {
    groups[muscle] ||= [];
    groups[muscle].push(exercise);
  });
  return groups;
}, {});
