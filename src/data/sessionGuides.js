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

export function getSessionGuide(focus = [], goal = "fitness") {
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

  const cooldownType = isLower && !isUpper ? "lower" : "upper";
  const cooldown = cooldownType === "lower"
    ? {
        title: "Bring it down",
        description: "Finish with a few minutes of easy breathing and lower-body mobility. Stretch gently — no forcing range.",
        demo: { youtubeId: guideVideos.lowerCooldown, label: "Watch lower-body cooldown" },
        movements: ["Child's pose", "Low lunge", "Quad stretch", "Glute stretch"],
      }
    : {
        title: "Bring it down",
        description: "Let your breathing settle, then use gentle upper-body stretches for the areas you trained.",
        demo: { youtubeId: guideVideos.upperCooldown, label: "Watch upper-body cooldown" },
        movements: ["Long stretch", "Lat stretch", "Shoulder stretch", "Chest stretch"],
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

  cooldown.movements = cooldown.movements.map(name => ({
    name,
    url: youtubeSearch(`${name} stretch cooldown exercise demonstration`),
  }));

  return { warmup, cooldown };
}
