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
  // ADDITIONAL LOWER BODY — GLUTES
  { id:"smith-machine-hip-thrust", name:"Smith Machine Hip Thrust", muscles:["glutes"], pattern:"hip-extension", equipment:["smith-machine","bench"], tags:["compound","glute-focus"] },
  { id:"barbell-glute-bridge", name:"Barbell Glute Bridge", muscles:["glutes"], pattern:"hip-extension", equipment:["barbell","floor"], tags:["compound","glute-focus"] },
  { id:"hip-thrust-machine", name:"Hip Thrust Machine", muscles:["glutes"], pattern:"hip-extension", equipment:["machine"], tags:["compound","glute-focus"] },
  { id:"frog-pump", name:"Frog Pump", muscles:["glutes"], pattern:"hip-extension", equipment:["bodyweight","floor"], tags:["isolation","bodyweight"] },
  { id:"weighted-frog-pump", name:"Weighted Frog Pump", muscles:["glutes"], pattern:"hip-extension", equipment:["dumbbells","plate","floor"], tags:["isolation"] },
  { id:"cable-glute-kickback-bent-knee", name:"Bent-Knee Cable Glute Kickback", muscles:["glutes"], pattern:"hip-extension-isolation", equipment:["cable"], tags:["isolation","glute-focus"] },
  { id:"quadruped-glute-kickback", name:"Quadruped Glute Kickback", muscles:["glutes"], pattern:"hip-extension", equipment:["bodyweight","floor"], tags:["bodyweight","floor"] },
  { id:"fire-hydrant", name:"Fire Hydrant", muscles:["glutes"], pattern:"abduction", equipment:["bodyweight","floor"], tags:["bodyweight","floor"] },
  { id:"band-lateral-walk", name:"Band Lateral Walk", muscles:["glutes"], pattern:"abduction", equipment:["resistance-band"], tags:["activation","unilateral"] },
  { id:"band-glute-bridge", name:"Banded Glute Bridge", muscles:["glutes"], pattern:"hip-extension", equipment:["resistance-band","floor"], tags:["activation","bodyweight"] },
  { id:"single-leg-hip-thrust", name:"Single-Leg Hip Thrust", muscles:["glutes"], pattern:"hip-extension-unilateral", equipment:["bodyweight","bench"], tags:["unilateral","glute-focus"] },
  { id:"single-leg-dumbbell-hip-thrust", name:"Single-Leg Dumbbell Hip Thrust", muscles:["glutes"], pattern:"hip-extension-unilateral", equipment:["dumbbells","bench"], tags:["unilateral","glute-focus"] },
  { id:"cable-diagonal-kickback", name:"Cable Diagonal Glute Kickback", muscles:["glutes"], pattern:"hip-extension-isolation", equipment:["cable"], tags:["isolation"] },
  { id:"smith-reverse-lunge", name:"Smith Machine Reverse Lunge", muscles:["glutes","quads"], pattern:"lunge", equipment:["smith-machine"], tags:["compound","unilateral"] },
  { id:"deficit-reverse-lunge", name:"Deficit Reverse Lunge", muscles:["glutes","quads"], pattern:"lunge", equipment:["dumbbells","plate"], tags:["compound","unilateral"] },
  { id:"dumbbell-sumo-squat", name:"Dumbbell Sumo Squat", muscles:["glutes","quads"], pattern:"squat", equipment:["dumbbells"], tags:["compound"] },
  { id:"barbell-sumo-squat", name:"Barbell Sumo Squat", muscles:["glutes","quads"], pattern:"squat", equipment:["barbell"], tags:["compound"] },
  { id:"cable-squat", name:"Cable Squat", muscles:["glutes","quads"], pattern:"squat", equipment:["cable"], tags:["compound"] },

  // ADDITIONAL LOWER BODY — QUADS
  { id:"hack-squat", name:"Hack Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["machine"], tags:["compound"] },
  { id:"smith-squat", name:"Smith Machine Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["smith-machine"], tags:["compound"] },
  { id:"belt-squat", name:"Belt Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["machine"], tags:["compound"] },
  { id:"sissy-squat", name:"Sissy Squat", muscles:["quads"], pattern:"knee-dominant", equipment:["bodyweight"], tags:["bodyweight","advanced"] },
  { id:"cyclist-squat", name:"Cyclist Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["barbell"], tags:["compound","quad-focus"] },
  { id:"front-foot-elevated-split-squat", name:"Front-Foot-Elevated Split Squat", muscles:["quads","glutes"], pattern:"split-squat", equipment:["dumbbells","bench"], tags:["unilateral","quad-focus"] },
  { id:"heel-elevated-split-squat", name:"Heel-Elevated Split Squat", muscles:["quads","glutes"], pattern:"split-squat", equipment:["dumbbells"], tags:["unilateral","quad-focus"] },
  { id:"dumbbell-step-down", name:"Dumbbell Step-Down", muscles:["quads","glutes"], pattern:"step-down", equipment:["dumbbells","bench"], tags:["unilateral"] },
  { id:"machine-single-leg-press", name:"Single-Leg Press", muscles:["quads","glutes"], pattern:"leg-press", equipment:["machine"], tags:["compound","unilateral"] },
  { id:"reverse-sled-drag", name:"Reverse Sled Drag", muscles:["quads"], pattern:"knee-dominant", equipment:["sled"], tags:["conditioning","quad-focus"] },
  { id:"wall-sit", name:"Wall Sit", muscles:["quads","glutes"], pattern:"isometric-squat", equipment:["bodyweight"], tags:["isometric","bodyweight"] },
  { id:"spanish-squat", name:"Spanish Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["resistance-band"], tags:["quad-focus"] },
  { id:"bodyweight-squat", name:"Bodyweight Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["bodyweight"], tags:["compound","bodyweight"] },
  { id:"pause-goblet-squat", name:"Pause Goblet Squat", muscles:["quads","glutes"], pattern:"squat", equipment:["dumbbells"], tags:["compound","quad-focus"] },

  // ADDITIONAL LOWER BODY — HAMSTRINGS
  { id:"barbell-hip-hinge", name:"Barbell Hip Hinge", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["barbell"], tags:["compound","hinge"] },
  { id:"dumbbell-stiff-leg-deadlift", name:"Dumbbell Stiff-Leg Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["dumbbells"], tags:["compound","hinge"] },
  { id:"barbell-stiff-leg-deadlift", name:"Barbell Stiff-Leg Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["barbell"], tags:["compound","hinge"] },
  { id:"deficit-rdl", name:"Deficit Romanian Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["barbell"], tags:["compound","hinge"] },
  { id:"kickstand-rdl", name:"Kickstand Romanian Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge-unilateral", equipment:["dumbbells"], tags:["unilateral","hinge"] },
  { id:"cable-rdl", name:"Cable Romanian Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge", equipment:["cable"], tags:["compound","hinge"] },
  { id:"single-leg-cable-rdl", name:"Single-Leg Cable Romanian Deadlift", muscles:["hamstrings","glutes"], pattern:"hinge-unilateral", equipment:["cable"], tags:["unilateral","hinge"] },
  { id:"slider-leg-curl", name:"Slider Leg Curl", muscles:["hamstrings","glutes"], pattern:"knee-flexion", equipment:["bodyweight","floor"], tags:["bodyweight","floor"] },
  { id:"stability-ball-leg-curl", name:"Stability Ball Leg Curl", muscles:["hamstrings","glutes"], pattern:"knee-flexion", equipment:["stability-ball"], tags:["bodyweight"] },
  { id:"assisted-nordic-curl", name:"Assisted Nordic Hamstring Curl", muscles:["hamstrings"], pattern:"knee-flexion", equipment:["bodyweight"], tags:["advanced","bodyweight"] },
  { id:"seated-dumbbell-leg-curl", name:"Seated Dumbbell Leg Curl", muscles:["hamstrings"], pattern:"knee-flexion", equipment:["dumbbells","bench"], tags:["isolation"] },
  { id:"single-leg-leg-curl-machine", name:"Single-Leg Leg Curl", muscles:["hamstrings"], pattern:"knee-flexion", equipment:["leg-curl"], tags:["isolation","unilateral"] },

  // ADDITIONAL BACK
  { id:"close-grip-lat-pulldown", name:"Close-Grip Lat Pulldown", muscles:["back","biceps"], pattern:"vertical-pull", equipment:["cable"], tags:["compound"] },
  { id:"wide-grip-lat-pulldown", name:"Wide-Grip Lat Pulldown", muscles:["back","biceps"], pattern:"vertical-pull", equipment:["cable"], tags:["compound"] },
  { id:"underhand-lat-pulldown", name:"Underhand Lat Pulldown", muscles:["back","biceps"], pattern:"vertical-pull", equipment:["cable"], tags:["compound"] },
  { id:"single-arm-lat-pulldown", name:"Single-Arm Lat Pulldown", muscles:["back","biceps"], pattern:"vertical-pull-unilateral", equipment:["cable"], tags:["compound","unilateral"] },
  { id:"straight-arm-pulldown-rope", name:"Rope Straight-Arm Pulldown", muscles:["back"], pattern:"shoulder-extension", equipment:["cable"], tags:["isolation"] },
  { id:"dumbbell-row-elbow-out", name:"Dumbbell Row — Elbow Out", muscles:["back","rear-shoulders"], pattern:"horizontal-pull", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"renegade-row", name:"Renegade Row", muscles:["back","core","biceps"], pattern:"horizontal-pull", equipment:["dumbbells","floor"], tags:["compound","core"] },
  { id:"seal-row", name:"Dumbbell Seal Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"inverted-row", name:"Inverted Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["bodyweight","bar"], tags:["compound","bodyweight"] },
  { id:"feet-elevated-inverted-row", name:"Feet-Elevated Inverted Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["bodyweight","bar","bench"], tags:["compound","advanced"] },
  { id:"landmine-row", name:"Landmine Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["barbell"], tags:["compound"] },
  { id:"meadows-row", name:"Meadows Row", muscles:["back","biceps"], pattern:"horizontal-pull-unilateral", equipment:["barbell"], tags:["compound","unilateral"] },
  { id:"machine-high-row", name:"Machine High Row", muscles:["back","biceps"], pattern:"horizontal-pull", equipment:["machine"], tags:["compound"] },
  { id:"machine-pullover", name:"Machine Pullover", muscles:["back"], pattern:"shoulder-extension", equipment:["machine"], tags:["isolation"] },

  // ADDITIONAL SHOULDERS
  { id:"seated-dumbbell-shoulder-press", name:"Seated Dumbbell Shoulder Press", muscles:["shoulders","triceps"], pattern:"vertical-push", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"single-arm-dumbbell-press", name:"Single-Arm Dumbbell Shoulder Press", muscles:["shoulders","triceps","core"], pattern:"vertical-push-unilateral", equipment:["dumbbells"], tags:["compound","unilateral"] },
  { id:"landmine-press", name:"Landmine Press", muscles:["shoulders","chest","triceps"], pattern:"angled-push", equipment:["barbell"], tags:["compound"] },
  { id:"single-arm-landmine-press", name:"Single-Arm Landmine Press", muscles:["shoulders","triceps","core"], pattern:"angled-push-unilateral", equipment:["barbell"], tags:["compound","unilateral"] },
  { id:"machine-lateral-raise", name:"Machine Lateral Raise", muscles:["shoulders"], pattern:"lateral-raise", equipment:["machine"], tags:["isolation"] },
  { id:"cable-y-raise", name:"Cable Y-Raise", muscles:["shoulders","back"], pattern:"raise", equipment:["cable"], tags:["isolation"] },
  { id:"prone-y-raise", name:"Prone Y-Raise", muscles:["shoulders","back"], pattern:"raise", equipment:["bodyweight","bench"], tags:["isolation"] },
  { id:"prone-t-raise", name:"Prone T-Raise", muscles:["shoulders","back"], pattern:"rear-delt", equipment:["dumbbells","bench"], tags:["isolation"] },
  { id:"cable-upright-row", name:"Cable Upright Row", muscles:["shoulders"], pattern:"upright-pull", equipment:["cable"], tags:["compound"] },
  { id:"dumbbell-upright-row", name:"Dumbbell Upright Row", muscles:["shoulders"], pattern:"upright-pull", equipment:["dumbbells"], tags:["compound"] },
  { id:"plate-front-raise", name:"Plate Front Raise", muscles:["shoulders"], pattern:"front-raise", equipment:["plate"], tags:["isolation"] },
  { id:"dumbbell-rear-delt-row", name:"Dumbbell Rear-Delt Row", muscles:["shoulders","back"], pattern:"rear-delt", equipment:["dumbbells"], tags:["compound"] },

  // ADDITIONAL CHEST
  { id:"decline-dumbbell-press", name:"Decline Dumbbell Press", muscles:["chest","triceps"], pattern:"decline-push", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"decline-barbell-press", name:"Decline Barbell Bench Press", muscles:["chest","triceps"], pattern:"decline-push", equipment:["barbell","bench"], tags:["compound"] },
  { id:"flat-dumbbell-squeeze-press", name:"Dumbbell Squeeze Press", muscles:["chest","triceps"], pattern:"horizontal-push", equipment:["dumbbells","bench"], tags:["compound"] },
  { id:"floor-press", name:"Dumbbell Floor Press", muscles:["chest","triceps"], pattern:"horizontal-push", equipment:["dumbbells","floor"], tags:["compound","floor"] },
  { id:"barbell-floor-press", name:"Barbell Floor Press", muscles:["chest","triceps"], pattern:"horizontal-push", equipment:["barbell","floor"], tags:["compound","floor"] },
  { id:"single-arm-dumbbell-floor-press", name:"Single-Arm Dumbbell Floor Press", muscles:["chest","triceps","core"], pattern:"horizontal-push-unilateral", equipment:["dumbbells","floor"], tags:["compound","unilateral"] },
  { id:"cable-low-to-high-fly", name:"Low-to-High Cable Fly", muscles:["chest"], pattern:"fly", equipment:["cable"], tags:["isolation"] },
  { id:"cable-high-to-low-fly", name:"High-to-Low Cable Fly", muscles:["chest"], pattern:"fly", equipment:["cable"], tags:["isolation"] },
  { id:"deficit-push-up", name:"Deficit Push-Up", muscles:["chest","triceps","shoulders"], pattern:"horizontal-push", equipment:["bodyweight"], tags:["compound","bodyweight"] },
  { id:"feet-elevated-push-up", name:"Feet-Elevated Push-Up", muscles:["chest","triceps","shoulders"], pattern:"horizontal-push", equipment:["bodyweight","bench"], tags:["compound","bodyweight"] },

  // ADDITIONAL BICEPS
  { id:"barbell-curl", name:"Barbell Biceps Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["barbell"], tags:["isolation"] },
  { id:"ez-bar-curl", name:"EZ-Bar Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["ez-bar"], tags:["isolation"] },
  { id:"reverse-curl", name:"Reverse Curl", muscles:["biceps","forearms"], pattern:"elbow-flexion-pronated", equipment:["barbell"], tags:["isolation"] },
  { id:"cross-body-hammer-curl", name:"Cross-Body Hammer Curl", muscles:["biceps"], pattern:"elbow-flexion-neutral", equipment:["dumbbells"], tags:["isolation"] },
  { id:"cable-hammer-curl", name:"Cable Rope Hammer Curl", muscles:["biceps"], pattern:"elbow-flexion-neutral", equipment:["cable"], tags:["isolation"] },
  { id:"bayesian-curl", name:"Bayesian Cable Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["cable"], tags:["isolation"] },
  { id:"spider-curl", name:"Dumbbell Spider Curl", muscles:["biceps"], pattern:"elbow-flexion", equipment:["dumbbells","bench"], tags:["isolation"] },
  { id:"zottman-curl", name:"Zottman Curl", muscles:["biceps","forearms"], pattern:"elbow-flexion", equipment:["dumbbells"], tags:["isolation"] },

  // ADDITIONAL TRICEPS
  { id:"rope-pushdown", name:"Rope Triceps Pushdown", muscles:["triceps"], pattern:"elbow-extension", equipment:["cable"], tags:["isolation"] },
  { id:"straight-bar-pushdown", name:"Straight-Bar Triceps Pushdown", muscles:["triceps"], pattern:"elbow-extension", equipment:["cable"], tags:["isolation"] },
  { id:"single-arm-cable-pushdown", name:"Single-Arm Cable Pushdown", muscles:["triceps"], pattern:"elbow-extension-unilateral", equipment:["cable"], tags:["isolation","unilateral"] },
  { id:"cross-body-cable-extension", name:"Cross-Body Cable Triceps Extension", muscles:["triceps"], pattern:"elbow-extension-unilateral", equipment:["cable"], tags:["isolation","unilateral"] },
  { id:"triceps-cable-kickback", name:"Cable Triceps Kickback", muscles:["triceps"], pattern:"elbow-extension", equipment:["cable"], tags:["isolation"] },
  { id:"triceps-dumbbell-kickback", name:"Dumbbell Triceps Kickback", muscles:["triceps"], pattern:"elbow-extension", equipment:["dumbbells"], tags:["isolation"] },
  { id:"close-grip-floor-press", name:"Close-Grip Dumbbell Floor Press", muscles:["triceps","chest"], pattern:"horizontal-push", equipment:["dumbbells","floor"], tags:["compound","floor"] },
  { id:"diamond-push-up", name:"Diamond Push-Up", muscles:["triceps","chest"], pattern:"horizontal-push", equipment:["bodyweight"], tags:["compound","bodyweight"] },

  // ADDITIONAL CORE — FLOOR / BODYWEIGHT / WEIGHTED
  { id:"hollow-body-hold", name:"Hollow Body Hold", muscles:["core"], pattern:"anti-extension", equipment:["bodyweight","floor"], tags:["core","bodyweight","floor"] },
  { id:"dead-bug-heel-tap", name:"Dead Bug Heel Tap", muscles:["core"], pattern:"anti-extension", equipment:["bodyweight","floor"], tags:["core","bodyweight"] },
  { id:"plank-shoulder-tap", name:"Plank Shoulder Tap", muscles:["core","shoulders"], pattern:"anti-rotation", equipment:["bodyweight","floor"], tags:["core","bodyweight"] },
  { id:"bear-plank", name:"Bear Plank", muscles:["core"], pattern:"anti-extension", equipment:["bodyweight","floor"], tags:["core","bodyweight"] },
  { id:"bear-crawl", name:"Bear Crawl", muscles:["core","shoulders"], pattern:"locomotion", equipment:["bodyweight","floor"], tags:["core","conditioning"] },
  { id:"mountain-climber", name:"Mountain Climber", muscles:["core"], pattern:"dynamic-core", equipment:["bodyweight","floor"], tags:["core","conditioning"] },
  { id:"slow-mountain-climber", name:"Slow Mountain Climber", muscles:["core"], pattern:"dynamic-core", equipment:["bodyweight","floor"], tags:["core","bodyweight"] },
  { id:"toe-touch-crunch", name:"Toe-Touch Crunch", muscles:["core"], pattern:"spinal-flexion", equipment:["bodyweight","floor"], tags:["core","bodyweight"] },
  { id:"cross-body-crunch", name:"Cross-Body Crunch", muscles:["core"], pattern:"rotation", equipment:["bodyweight","floor"], tags:["core","bodyweight"] },
  { id:"heel-tap", name:"Heel Tap", muscles:["core"], pattern:"anti-extension", equipment:["bodyweight","floor"], tags:["core","bodyweight"] },
  { id:"weighted-sit-up", name:"Weighted Sit-Up", muscles:["core"], pattern:"spinal-flexion", equipment:["plate","dumbbells","floor"], tags:["core","weighted"] },
  { id:"v-up", name:"V-Up", muscles:["core"], pattern:"spinal-flexion", equipment:["bodyweight","floor"], tags:["core","advanced"] },

];

export const exerciseDirectoryByMuscle = exerciseDirectory.reduce((groups, exercise) => {
  exercise.muscles.forEach((muscle) => {
    groups[muscle] ||= [];
    groups[muscle].push(exercise);
  });
  return groups;
}, {});
