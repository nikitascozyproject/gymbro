export const exerciseLibrary = [
  { id:"hip-thrust",name:"Hip Thrust",muscles:["glutes"],pattern:"hinge",equipment:["barbell","bench"],sets:3,reps:"8–12",rest:"90 sec" },
  { id:"rdl",name:"Romanian Deadlift",muscles:["hamstrings","glutes"],pattern:"hinge",equipment:["dumbbells","barbell"],sets:3,reps:"8–10",rest:"90 sec" },
  { id:"split-squat",name:"Bulgarian Split Squat",muscles:["quads","glutes"],pattern:"squat",equipment:["dumbbells","bench"],sets:3,reps:"8–10 / side",rest:"90 sec",demo:{youtubeId:"W5H-0DMiclY"} },
  { id:"goblet-squat",name:"Goblet Squat",muscles:["quads","glutes"],pattern:"squat",equipment:["dumbbells"],sets:3,reps:"8–12",rest:"75 sec",demo:{youtubeId:"9W5KAqHfDe8"} },
  { id:"leg-extension",name:"Leg Extension",muscles:["quads"],pattern:"knee-extension",equipment:["leg-extension"],sets:3,reps:"10–15",rest:"60 sec" },
  { id:"abduction",name:"Cable Hip Abduction",muscles:["glutes"],pattern:"abduction",equipment:["cable"],sets:3,reps:"12–15 / side",rest:"45 sec" },
  { id:"lat-pulldown",name:"Lat Pulldown",muscles:["back","biceps"],pattern:"pull",equipment:["cable"],sets:3,reps:"8–12",rest:"75 sec" },
  { id:"seated-row",name:"Seated Cable Row",muscles:["back","biceps"],pattern:"pull",equipment:["cable"],sets:3,reps:"8–12",rest:"75 sec",demo:{youtubeId:"xQNrFHEMhI4"} },
  { id:"chest-press",name:"Chest Press",muscles:["chest","triceps"],pattern:"push",equipment:["machine"],sets:3,reps:"8–12",rest:"75 sec" },
  { id:"shoulder-press",name:"Dumbbell Shoulder Press",muscles:["shoulders","triceps"],pattern:"vertical-push",equipment:["dumbbells"],sets:3,reps:"8–12",rest:"75 sec",demo:{youtubeId:"0JfYxMRsUCQ"} },
  { id:"lateral-raise",name:"Dumbbell Lateral Raise",muscles:["shoulders"],pattern:"raise",equipment:["dumbbells"],sets:3,reps:"12–15",rest:"45 sec" },
  { id:"cable-lateral-raise",name:"Cable Lateral Raise",muscles:["shoulders"],pattern:"raise-2",equipment:["cable"],sets:3,reps:"12–15 / side",rest:"45 sec" },
  { id:"rear-delt-fly",name:"Rear Delt Fly",muscles:["shoulders"],pattern:"rear-delt",equipment:["dumbbells","machine"],sets:3,reps:"12–15",rest:"45 sec" },
  { id:"face-pull",name:"Cable Face Pull",muscles:["shoulders","back"],pattern:"face-pull",equipment:["cable"],sets:3,reps:"12–15",rest:"45 sec" },
  { id:"front-raise",name:"Dumbbell Front Raise",muscles:["shoulders"],pattern:"front-raise",equipment:["dumbbells"],sets:3,reps:"10–15",rest:"45 sec" },
  { id:"machine-shoulder-press",name:"Machine Shoulder Press",muscles:["shoulders","triceps"],pattern:"machine-press",equipment:["machine"],sets:3,reps:"8–12",rest:"75 sec" },
  { id:"dead-bug",name:"Dead Bug",muscles:["core"],pattern:"core",equipment:["bodyweight"],sets:3,reps:"8–10 / side",rest:"45 sec" },
  { id:"bird-dog",name:"Bird Dog",muscles:["core"],pattern:"core",equipment:["bodyweight"],sets:3,reps:"8–10 / side",rest:"45 sec" },
  { id:"plank",name:"Forearm Plank",muscles:["core"],pattern:"core",equipment:["bodyweight"],sets:3,reps:"30–45 sec",rest:"45 sec" },
];

export const defaultProfile = {
  goal:"fat-loss",
  trainingDays:4,
  sessionLength:50,
  equipment:["dumbbells","barbell","bench","cable","machine","leg-extension","bodyweight"],
};
