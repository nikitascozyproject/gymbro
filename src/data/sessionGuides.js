const youtubeSearch = query => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

const guideVideos = {
  lowerWarmup: "5p8YKdeohPc",
  upperWarmup: "ell71uw3jR4",
  treadmill: "tBNqEwcvYjU",
  elliptical: "t9KVWTROVb0",
  lowerCooldown: "_FnoTkJzZgA",
  upperCooldown: "uUC882k8zxk",
};

const lower = new Set(["glutes", "quads", "hamstrings"]);
const upper = new Set(["back", "shoulders", "chest", "biceps", "triceps"]);
const core = new Set(["core"]);

export function getSessionGuide(focus = [], goal = "fitness", variationKey = "default") {
  const selected = new Set(focus.map(m => m.toLowerCase()));
  const isLower = focus.some(m => lower.has(m));
  const isUpper = focus.some(m => upper.has(m));
  const isCore = focus.some(m => core.has(m));

  const warmupType = isLower && !isUpper ? "lower" : "upper";
  const warmup = warmupType === "lower"
    ? {
        title: "Prime your lower body",
        description: "A short, dynamic warm-up for the muscles you're about to train. Keep it easy — this is preparation, not the workout.",
        demo: { youtubeId: guideVideos.lowerWarmup, label: "Watch lower-body warm-up" },
        movements: [
          { name: "Easy cardio", detail: "5–10 min · treadmill or elliptical · comfortable pace" },
          { name: "Leg swings", detail: "8–10 each side · controlled", instruction: "Hold a wall or rack. Swing one leg forward and back in a small, comfortable range; keep your torso still." },
          { name: "Bodyweight squats", detail: "8–10 reps · easy range", instruction: "Stand with feet about shoulder-width apart. Push hips back, bend knees, then stand tall. Stop at a comfortable depth." },
          ...(selected.has("glutes") || selected.has("hamstrings")
            ? [{ name: "Glute bridges", detail: "10–12 reps · squeeze, don't fatigue", instruction: "Lie on your back with knees bent and feet flat. Lift hips by squeezing your glutes, pause briefly, then lower." }]
            : []),
        ],
      }
    : {
        title: "Prime your upper body",
        description: "Get your shoulders, upper back and joints moving before the first working set. Keep everything controlled and easy.",
        demo: { youtubeId: guideVideos.upperWarmup, label: "Watch upper-body warm-up" },
        movements: [
          { name: "Easy cardio", detail: "5–10 min · treadmill or elliptical · comfortable pace" },
          { name: "Arm circles", detail: "8–10 each direction · controlled", instruction: "Stretch arms out to the sides. Make small circles, gradually a little larger, then reverse direction." },
          { name: "Thoracic rotations", detail: "6–8 each side · easy range", instruction: "Stand or kneel comfortably, cross arms over chest, and gently rotate your upper back side to side without forcing it." },
          ...(selected.has("back") || selected.has("shoulders")
            ? [{ name: "Band pull-aparts", detail: "10–12 reps · light resistance", instruction: "Hold a light band at chest height with soft elbows. Pull hands apart until the band reaches your chest, then return slowly." }]
            : []),
        ],
      };

  if (isCore && !isLower && !isUpper) {
    warmup.title = "Prime your core";
    warmup.description = "Raise your temperature first, then switch to controlled trunk movement. Nothing here should fatigue your core.";
    warmup.movements = [
      { name: "Easy cardio", detail: "5–10 min · treadmill or elliptical · comfortable pace" },
      { name: "Cat-cow", detail: "6–8 slow reps · breathe through the movement", instruction: "On hands and knees, gently round your back as you exhale, then lift your chest and let your back arch slightly as you inhale." },
      { name: "Bird dog", detail: "6–8 each side · controlled", instruction: "On hands and knees, reach one arm forward and the opposite leg back. Keep hips level, return, and switch sides." },
      { name: "Dead bug", detail: "6–8 each side · easy, deliberate reps", instruction: "Lie on your back with arms up and knees bent. Slowly lower opposite arm and leg while keeping your lower back gently against the floor; alternate." },
    ];
    warmup.demo = { youtubeId: "o4GKiEoYClI", label: "Watch a core warm-up movement" };
  }

  // A small whole-body flow, weighted toward the selected muscles.
  // The workout id seeds the choices so sessions vary without changing on rerender.
  const seedText = String(variationKey || "default") + [...selected].sort().join(",");
  const seed = [...seedText].reduce((value, char) => (value * 31 + char.charCodeAt(0)) >>> 0, 7);
  const pick = items => items[seed % items.length];
  const targetedWarmup = [
    { name: "Easy cardio", detail: "3–4 min · treadmill or stationary cycle", instruction: "Start gently and build until you feel warmer while still able to speak comfortably." },
    { name: "Reach and breathe", detail: "5 slow breaths", instruction: "Stand tall, reach both arms overhead as you inhale, then lower them as you exhale. Let your shoulders relax." },
  ];
  const addTargeted = movement => { if (!targetedWarmup.some(item => item.name === movement.name)) targetedWarmup.push(movement); };
  if (selected.has("glutes")) addTargeted(pick([
    { name: "Glute bridges", detail: "10 reps", instruction: "Lie on your back, knees bent. Lift hips by squeezing your glutes, pause, then lower." },
    { name: "Standing hip extensions", detail: "8 each side", instruction: "Hold a rack lightly, move one leg gently behind you without arching your back, then switch." },
    { name: "Lateral steps", detail: "8 each way", instruction: "Take small controlled side steps with soft knees; a light band is optional." },
  ]));
  if (selected.has("quads")) addTargeted(pick([
    { name: "Squat-to-stand", detail: "8 smooth reps", instruction: "Sit into a comfortable bodyweight squat, then stand tall and reach overhead. Use a pain-free depth." },
    { name: "Bench sit-to-stand", detail: "8 reps", instruction: "Stand from a stable bench smoothly and sit back down with control." },
    { name: "Alternating reverse step", detail: "6 each side", instruction: "Step one foot back and bend both knees only as far as comfortable; use support if needed." },
  ]));
  if (selected.has("hamstrings")) addTargeted(pick([
    { name: "Hip-hinge reach", detail: "8 reps", instruction: "Soften knees, push hips back with a long back, then stand tall." },
    { name: "Alternating hamstring sweeps", detail: "6 each side", instruction: "Place one heel forward, hinge slightly and sweep hands toward that foot; alternate." },
    { name: "Bodyweight good morning", detail: "8 reps", instruction: "Hands on hips, soften knees, push hips back while keeping your back long, then stand." },
  ]));
  if (selected.has("back")) addTargeted(pick([
    { name: "Scapular retractions", detail: "10 reps", instruction: "Draw shoulder blades gently back and down without shrugging, pause, then release." },
    { name: "Standing thoracic rotations", detail: "6 each side", instruction: "Cross arms over chest and rotate your upper back gently while hips face forward." },
    { name: "Wall scapular push-ups", detail: "8 reps", instruction: "Hands on wall, elbows straight; let chest move toward wall, then push away through shoulder blades." },
  ]));
  if (selected.has("shoulders")) addTargeted(pick([
    { name: "Arm circles", detail: "8 each direction", instruction: "Make small controlled circles, gradually enlarge them, then reverse." },
    { name: "Wall slides", detail: "8 reps", instruction: "Slide arms up a wall only as far as comfortable, then lower slowly." },
    { name: "Shoulder rolls", detail: "8 forward and backward", instruction: "Roll shoulders slowly up, back and down, then reverse." },
  ]));
  if (selected.has("chest")) addTargeted(pick([
    { name: "Wall push-ups", detail: "8–10 easy reps", instruction: "Hands on wall at chest height; bring chest toward it, then press away smoothly." },
    { name: "Arm sweeps", detail: "8 reps", instruction: "Bring arms forward at chest height, then open them out gently, keeping shoulders relaxed." },
    { name: "Incline push-ups", detail: "6 easy reps", instruction: "Use a stable raised surface, lower chest toward it, then press away with easy effort." },
  ]));
  if (selected.has("biceps") || selected.has("triceps")) addTargeted({
    name: "Elbow bends and reaches", detail: "10 easy reps", instruction: "Bend and straighten elbows without weights, then gently reach arms overhead and lower." });
  if (selected.has("core")) addTargeted(pick([
    { name: "Bird dog", detail: "6 each side", instruction: "Reach one arm forward and the opposite leg back on hands and knees; keep hips level." },
    { name: "Standing brace and march", detail: "6 each side", instruction: "Gently brace your abdomen and lift one knee at a time without leaning back." },
    { name: "Cat-cow", detail: "6 slow reps", instruction: "On hands and knees, gently round your back, then arch slightly with your breath." },
  ]));
  // Keep at least six movements and build a gentle whole-body arc: warm, mobilize,
  // activate the selected area, then finish with trunk/shoulder coordination.
  if (!selected.has("core")) addTargeted({ name: "Standing brace and march", detail: "6 each side", instruction: "Gently brace your abdomen and lift one knee at a time without leaning back." });
  if (!selected.has("shoulders")) addTargeted({ name: "Arm sweeps", detail: "8 reps", instruction: "Sweep arms forward and open them out gently, keeping shoulders relaxed." });
  if (!selected.has("hamstrings") && !selected.has("glutes")) addTargeted({ name: "Hip hinges", detail: "8 reps", instruction: "Soften knees, push hips back with a long back, then stand tall." });
  warmup.movements = targetedWarmup.slice(0, 7);
  warmup.demo = null;

  const muscleLabels = [...selected].map(m => ({
    glutes: "glutes", quads: "quads", hamstrings: "hamstrings", back: "back",
    shoulders: "shoulders", chest: "chest", biceps: "biceps", triceps: "triceps", core: "core"
  }[m] || m));
  const focusText = muscleLabels.length > 1
    ? muscleLabels.slice(0, -1).join(", ") + " and " + muscleLabels[muscleLabels.length - 1]
    : muscleLabels[0] || "the muscles you trained";

  warmup.title = isLower && isUpper
    ? "Prime your full body"
    : isLower && !isUpper
      ? "Prime your lower body"
      : isCore && !isUpper
        ? "Prime your core"
        : "Prime your upper body";
  warmup.description = `A short, easy warm-up for ${focusText}. Do the movements below at a comfortable pace; they should prepare you, not tire you out.`;

  const cooldownMovements = [];
  const addCooldown = (name, detail, instruction) => {
    if (!cooldownMovements.some(item => item.name === name)) {
      cooldownMovements.push({ name, detail, instruction });
    }
  };
  if (selected.has("glutes")) addCooldown("Figure-four glute stretch", "20–30 sec each side", "Lie on your back, cross one ankle over the opposite thigh, and gently draw the legs toward you until you feel a mild glute stretch.");
  if (selected.has("quads")) addCooldown("Standing quad stretch", "20–30 sec each side", "Hold a wall for balance, bring your heel toward your glute, and keep knees close. Stop if your knee hurts.");
  if (selected.has("hamstrings")) addCooldown("Hamstring stretch", "20–30 sec each side", "Place one heel slightly forward, soften the standing knee, hinge at the hips, and keep your back long until you feel a gentle stretch.");
  if (selected.has("back")) addCooldown("Child's pose with reach", "20–30 sec", "Kneel and sit hips back toward heels, reach arms forward, and breathe into your upper back. Skip if kneeling is uncomfortable.");
  if (selected.has("chest")) addCooldown("Doorway chest stretch", "20–30 sec each side", "Place your forearm on a doorframe with elbow below shoulder height and gently turn away until the front of your chest stretches.");
  if (selected.has("shoulders")) addCooldown("Cross-body shoulder stretch", "20–30 sec each side", "Bring one arm across your chest and gently draw it closer with the other arm. Keep shoulders relaxed.");
  if (selected.has("biceps")) addCooldown("Gentle biceps stretch", "20 sec each side", "Place your palm against a wall behind you at a comfortable height and slowly turn your body away until you feel a mild stretch in the front of the arm.");
  if (selected.has("triceps")) addCooldown("Overhead triceps stretch", "20–30 sec each side", "Reach one arm overhead, bend the elbow so your hand moves behind your head, and gently support the elbow with the other hand.");
  if (selected.has("core")) addCooldown("Easy cobra / abdominal stretch", "15–20 sec · gentle", "Lie on your stomach and press up lightly through your hands, keeping hips down. Only lift as far as your lower back feels comfortable.");
  if (!cooldownMovements.length) {
    addCooldown("Slow breathing", "5–6 relaxed breaths", "Sit or stand comfortably. Breathe in gently through your nose and exhale slowly, letting your heart rate settle.");
    addCooldown("Gentle full-body reach", "20 sec", "Reach arms overhead, lengthen through your body, and breathe normally without forcing the stretch.");
  }
  const cooldown = {
    title: "Bring it down",
    description: `Finish with gentle stretches for ${focusText}. Hold each position without bouncing, breathe normally, and ease off if anything feels painful.`,
    movements: cooldownMovements,
  };

  if (goal === "fat-loss") {
    warmup.cardioNote = "Gymbro suggestion: use the cardio as an easy warm-up, not a punishment. You choose the duration.";
  } else if (goal === "strength") {
    warmup.cardioNote = "Gymbro suggestion: keep cardio easy so you arrive at your working sets fresh.";
  } else {
    warmup.cardioNote = "Gymbro suggestion: choose the duration that feels right today.";
  }

  warmup.cardioOptions = [
    { name: "Treadmill", detail: "5–10 min · easy walk", youtubeId: guideVideos.treadmill },
    { name: "Elliptical", detail: "5–10 min · easy resistance", youtubeId: guideVideos.elliptical },
  ];

  cooldown.movements = cooldown.movements.map(movement => ({
    ...movement,
    url: youtubeSearch(`${movement.name} stretch cooldown exercise demonstration`),
  }));

  return { warmup, cooldown };
}
