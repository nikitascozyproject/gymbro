import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Clock3, Dumbbell, Flame, History, Play, RotateCcw, Settings2, Sparkles, Target, Trophy, X, SlidersHorizontal, Shuffle } from "lucide-react";
import { defaultProfile, exerciseLibrary } from "./data/workouts";
import { generateWorkout } from "./engine/generateWorkout";

const STORAGE_KEY = "gymbro-state-v1";
const ONBOARDED_KEY = "gymbro-onboarded";
const MUSCLES = ["glutes", "quads", "hamstrings", "back", "shoulders", "chest", "biceps", "triceps", "core"];
const EXERCISE_COUNTS = [2, 3, 4, 5, 6, 7];
const MUSCLE_PAIRINGS = {
  shoulders: ["back", "triceps", "chest"],
  chest: ["triceps", "shoulders"],
  back: ["biceps", "shoulders"],
  biceps: ["back", "shoulders"],
  triceps: ["chest", "shoulders"],
  glutes: ["hamstrings", "quads", "core"],
  quads: ["glutes", "hamstrings", "core"],
  hamstrings: ["glutes", "core"],
  core: ["glutes", "quads", "back"],
};
const MUSCLE_LABELS = Object.fromEntries(MUSCLES.map(m => [m, m[0].toUpperCase() + m.slice(1)]));

function getDateKey(date = new Date()) {
  const local = new Date(date);
  return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, "0")}-${String(local.getDate()).padStart(2, "0")}`;
}

function loadState() {
  const empty = {
    profile: defaultProfile,
    history: [],
    todayPlan: null,
    todayCustomization: null,
    activeDate: getDateKey(),
    completed: [],
    dayClosed: false,
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || empty;
    const today = getDateKey();
    const hasDateState = Boolean(saved.activeDate);
    const activeDate = saved.activeDate || today;
    const history = Array.isArray(saved.history) ? saved.history : [];
    const completed = Array.isArray(saved.completed) ? saved.completed : [];
    const dayClosed = Boolean(saved.dayClosed);

    // Older Gymbro versions did not store the workout date. Treat that saved
    // plan as stale once the new day-aware version loads.
    if (!hasDateState && saved.todayPlan) {
      return {
        ...empty,
        profile: saved.profile || defaultProfile,
        history,
        activeDate: today,
        dayClosed: false,
      };
    }

    // If the user comes back on a new calendar day, preserve whatever they
    // actually completed yesterday before generating a fresh day.
    if (activeDate !== today) {
      const completedIds = saved.todayPlan ? completed.filter(id =>
        saved.todayPlan.exercises?.some(exercise => exercise.id === id)
      ) : [];
      if (completedIds.length) {
        history.push({
          date: activeDate,
          type: saved.todayPlan.type,
          title: saved.todayPlan.title,
          exerciseIds: completedIds,
          plannedExerciseIds: saved.todayPlan.exercises.map(exercise => exercise.id),
          completedCount: completedIds.length,
          plannedCount: saved.todayPlan.exercises.length,
          status: completedIds.length === saved.todayPlan.exercises.length ? "completed" : "partial",
        });
      }
      return {
        ...empty,
        profile: saved.profile || defaultProfile,
        history,
        activeDate: today,
      };
    }

    return {
      ...empty,
      ...saved,
      history,
      completed,
      activeDate,
    };
  } catch {
    return empty;
  }
}

function ExerciseCard({ exercise, index, completed, onToggle, onPlay, onShuffle }) {
  return <article className={`exercise-card ${completed ? "is-complete" : ""}`}>
    <div className="exercise-number">{String(index + 1).padStart(2,"0")}</div>
    <div className="exercise-main">
      <div className="exercise-heading"><div><h3>{exercise.name}</h3><p>{exercise.muscles.join(" · ")}</p></div><div className="exercise-actions"><button className="icon-button shuffle-exercise-button" onClick={()=>onShuffle(exercise)} aria-label={`Try another ${exercise.name} exercise`} title="Try another exercise"><Shuffle size={16}/></button><button className="icon-button play-demo-button" onClick={()=>onPlay(exercise)} aria-label={`Watch ${exercise.name} demonstration`} title="Watch demonstration"><Play size={16} fill="currentColor"/></button></div></div>
      <div className="exercise-meta"><span>{exercise.sets} sets</span><span>{exercise.reps}</span><span>{exercise.rest} rest</span></div>
      <button className={`complete-button ${completed ? "done" : ""}`} onClick={onToggle}>{completed && <Check size={17}/>} {completed ? "Completed" : "Mark complete"}</button>
    </div>
  </article>;
}

function ExerciseDemo({ exercise, onClose }) {
  const demo = exercise.demo || {};
  const youtubeUrl = demo.youtubeId
    ? `https://www.youtube.com/watch?v=${demo.youtubeId}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " exercise demonstration")}`;

  return <div className="demo-overlay" onClick={onClose}>
    <section className="demo-card" onClick={e=>e.stopPropagation()}>
      <div className="demo-head">
        <div>
          <span className="section-label">EXERCISE DEMO</span>
          <h2>{exercise.name}</h2>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close demonstration"><X size={17}/></button>
      </div>

      {demo.youtubeId ? (
        <div className="demo-video">
          <iframe
            src={`https://www.youtube.com/embed/${demo.youtubeId}?rel=0`}
            title={`${exercise.name} demonstration`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="demo-fallback">
          <div className="demo-fallback-icon"><Play size={22} fill="currentColor"/></div>
          <strong>Demo video coming up</strong>
          <p>We haven't pinned a video for this exercise yet. You can find the YouTube demonstration here.</p>
          <a href={youtubeUrl} target="_blank" rel="noreferrer" className="primary-button">Watch on YouTube <ChevronRight size={16}/></a>
        </div>
      )}

      <div className="demo-details">
        <div>
          <span className="section-label">TODAY'S PRESCRIPTION</span>
          <div className="demo-meta"><span>{exercise.sets} sets</span><span>{exercise.reps}</span><span>{exercise.rest} rest</span></div>
        </div>
        <a className="demo-youtube-link" href={youtubeUrl} target="_blank" rel="noreferrer">Open in YouTube <ChevronRight size={14}/></a>
      </div>
    </section>
  </div>;
}

function WorkoutCustomizer({ focus, count, savedCustomization, onApply, onClose }) {
  const saved = savedCustomization || {};
  const [selected, setSelected] = useState(saved.muscles?.length ? saved.muscles : focus.map(x => x.toLowerCase()));
  const recommendedTime = selected.length >= 3 ? "60+" : selected.length === 2 ? "45" : "30";
  const recommendedExercises = Math.min(7, Math.max(2, selected.length * 2));
  const [timeAvailable, setTimeAvailable] = useState(saved.timeAvailable || recommendedTime);
  const [showMore, setShowMore] = useState(false);
  const [energy, setEnergy] = useState(saved.energy || "normal");
  const [intensity, setIntensity] = useState(saved.intensity || "moderate");
  const [equipmentModes, setEquipmentModes] = useState(saved.equipmentModes || ["equipment"]);

  const toggleMuscle = muscle => setSelected(current => current.includes(muscle) ? current.filter(item => item !== muscle) : [...current, muscle]);
  useEffect(() => {
    if (selected.length >= 3 && timeAvailable !== "60+") setTimeAvailable("60+");
    else if (selected.length === 2 && timeAvailable === "20") setTimeAvailable("45");
    else if (selected.length === 1 && timeAvailable === "60+") setTimeAvailable("30");
  }, [selected.length]);

  const countForTime = time => Math.min(7, Math.max(recommendedExercises, ({ "20": 2, "30": 4, "45": 6, "60+": 7 }[time] || count)));
  const suggestedMuscles = [...new Set(selected.flatMap(m => MUSCLE_PAIRINGS[m] || []))].filter(m => !selected.includes(m)).slice(0, 3);

  return <div className="customizer-overlay" onClick={onClose}><section className="customizer-card simple-customizer" onClick={e=>e.stopPropagation()}>
    <div className="customizer-head"><div><span className="section-label">TODAY'S SESSION</span><h2>What are we doing today?</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><X size={17}/></button></div>
    <p className="customizer-intro">Tell Gymbro what you want. We'll handle the programming.</p>

    <label>Muscle groups</label>
    <div className="muscle-grid">{MUSCLES.map(muscle => <button key={muscle} className={`muscle-choice ${selected.includes(muscle) ? "selected" : ""} ${suggestedMuscles.includes(muscle) && !selected.includes(muscle) ? "suggested" : ""}`} onClick={()=>toggleMuscle(muscle)}><span>{MUSCLE_LABELS[muscle]}</span>{selected.includes(muscle) && <Check size={15}/>}</button>)}</div>

    <label>How much time do you have?</label>
    <div className="time-choice-grid">{["20","30","45","60+"].map(value => <button key={value} className={`${timeAvailable===value ? "selected" : ""} ${recommendedTime===value ? "recommended" : ""}`} onClick={()=>setTimeAvailable(value)}><strong>{value}</strong><span>min</span>{recommendedTime===value && <small>suggested</small>}</button>)}</div>
    {selected.length > 1 && <p className="smart-time-note"><Sparkles size={13}/> {selected.length >= 3 ? "Three or more muscle groups need a longer session. Gymbro suggests 60+ minutes." : "Two muscle groups need enough volume. Gymbro suggests 45 minutes."}</p>}

    <button className={`more-options ${showMore ? "open" : ""}`} onClick={()=>setShowMore(!showMore)}>{showMore ? "Hide extra options" : "More options"} <ChevronRight size={15}/></button>

    {showMore && <div className="more-options-panel">
      <div><label>Energy</label><div className="segmented">{[["low","Low"],["normal","Normal"],["high","High"]].map(([value,label])=><button key={value} className={energy===value?"selected":""} onClick={()=>setEnergy(value)}>{label}</button>)}</div></div>
      <div><label>Intensity</label><div className="segmented">{[["easy","Easy"],["moderate","Moderate"],["hard","Hard"]].map(([value,label])=><button key={value} className={intensity===value?"selected":""} onClick={()=>setIntensity(value)}>{label}</button>)}</div></div>
      <div><label>How do you want to train?</label><div className="segmented equipment-mode">{[
        ["equipment","Gym equipment"],
        ["bodyweight","No equipment"],
        ["dumbbells","Dumbbells"]
      ].map(([value,label])=><button key={value} className={equipmentModes.includes(value)?"selected":""} onClick={()=>setEquipmentModes(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value])}>{label}</button>)}</div><p className="customizer-note">Choose one or more. Gymbro will use the equipment options you selected for the muscles you're training.</p></div>
    </div>}

    <div className="customizer-summary"><span>{selected.length ? selected.map(x=>x[0].toUpperCase()+x.slice(1)).join(" + ") : "Choose a muscle group"}</span><span>{countForTime(timeAvailable)} exercises · {timeAvailable} min</span></div>
    <button className="primary-button" disabled={!selected.length} onClick={()=>onApply(selected, countForTime(timeAvailable), {timeAvailable, energy, intensity, equipmentModes})}>Build today's workout <ChevronRight size={17}/></button>
  </section></div>;
}
function Setup({ profile, onSave, onClose }) {
  const [goal,setGoal]=useState(profile.goal), [days,setDays]=useState(profile.trainingDays), [length,setLength]=useState(profile.sessionLength);
  return <div className="setup-overlay"><section className="setup-card">
    <div className="setup-top"><div className="setup-brand"><span className="brand-mark">G</span><strong>gymbro</strong></div><button className="setup-close" onClick={onClose} aria-label="Close setup"><X size={18}/></button></div>
    <span className="section-label">LET'S SET YOU UP</span><h1>Your workouts should fit <em>you.</em></h1>
    <p className="setup-intro">Gymbro uses these basics to decide what you should train and how much work to give you.</p>
    <label>Primary goal</label><div className="choice-grid">{[["fat-loss","Fat loss"],["strength","Get stronger"],["fitness","General fitness"]].map(([v,l])=><button key={v} className={goal===v?"choice selected":"choice"} onClick={()=>setGoal(v)}>{l}</button>)}</div>
    <label>Training days / week</label><div className="segmented">{[3,4,5].map(v=><button key={v} className={days===v?"selected":""} onClick={()=>setDays(v)}>{v}</button>)}</div>
    <label>Typical session</label><div className="segmented">{[30,45,50,60].map(v=><button key={v} className={length===v?"selected":""} onClick={()=>setLength(v)}>{v} min</button>)}</div>
    <button className="primary-button" onClick={()=>onSave({...profile,goal,trainingDays:days,sessionLength:length})}>Build my Gymbro <ChevronRight size={17}/></button><button className="setup-skip" onClick={onClose}>Skip for now</button>
  </section></div>;
}

function ProfilePanel({ profile, onClose, onSave }) {
  const [goal,setGoal]=useState(profile.goal), [days,setDays]=useState(profile.trainingDays), [length,setLength]=useState(profile.sessionLength);
  return <div className="panel-overlay" onClick={onClose}><aside className="profile-panel" onClick={e=>e.stopPropagation()}>
    <div className="panel-head"><div><span className="section-label">PROFILE</span><h2>Your setup</h2></div><button className="icon-button" onClick={onClose}><X size={17}/></button></div>
    <label>Workout goal</label><div className="choice-grid profile-goals">{[["fat-loss","Fat loss"],["strength","Get stronger"],["fitness","General fitness"]].map(([v,l])=><button key={v} className={goal===v?"choice selected":"choice"} onClick={()=>setGoal(v)}>{l}</button>)}</div><label>Training days</label><div className="segmented">{[3,4,5].map(v=><button key={v} className={days===v?"selected":""} onClick={()=>setDays(v)}>{v}</button>)}</div>
    <label>Session length</label><div className="segmented">{[30,45,50,60].map(v=><button key={v} className={length===v?"selected":""} onClick={()=>setLength(v)}>{v}m</button>)}</div>
    <button className="primary-button" onClick={()=>onSave({...profile,goal,trainingDays:days,sessionLength:length})}>Save changes</button>
  </aside></div>;
}

export default function App() {
  const [state,setState]=useState(loadState), [completed,setCompleted]=useState(()=>loadState().completed || []), [showAll,setShowAll]=useState(false), [showProfile,setShowProfile]=useState(false), [showCustomizer,setShowCustomizer]=useState(false), [demoExercise,setDemoExercise]=useState(null);
  const [todayPlan,setTodayPlan]=useState(()=>loadState().todayPlan || null);
  const [showSetup,setShowSetup]=useState(()=>!localStorage.getItem(ONBOARDED_KEY));
  const activeDate = state.activeDate || getDateKey();
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      todayPlan,
      completed,
      activeDate,
    }));
  }, [state, todayPlan, completed, activeDate]);
  const defaultWorkout=useMemo(()=>generateWorkout({library:exerciseLibrary,equipment:state.profile.equipment,trainingDays:state.profile.trainingDays,history:state.history,sessionLength:state.profile.sessionLength}),[state.profile,state.history]);
  const workout=todayPlan || defaultWorkout;
  const progress=Math.round((completed.length/workout.exercises.length)*100);
  const status=progress===100?"Workout complete":progress>0?"You're in":"Ready when you are";
  const visible=showAll?workout.exercises:workout.exercises.slice(0,3);
  const toggle=id=>setCompleted(c=>c.includes(id)?c.filter(x=>x!==id):[...c,id]);
  const shuffleExercise=(exercise)=>{
  const constraints = state.todayCustomization || {
    timeAvailable: workout.exercises.length <= 3 ? "20" : workout.exercises.length <= 4 ? "30" : workout.exercises.length <= 6 ? "45" : "60+",
    energy:"normal",
    intensity:"moderate",
    equipmentModes:["equipment"],
  };
  const currentIds = workout.exercises.map(item => item.id);
  const alternatives = generateWorkout({
    library:exerciseLibrary,
    equipment:state.profile.equipment,
    trainingDays:state.profile.trainingDays,
    history:state.history,
    focusOverride:[exercise.muscles[0]],
    exerciseCount:1,
    constraints,
    excludeIds:currentIds,
    shuffle:true,
  });
  const replacement = alternatives.exercises[0];
  if(!replacement || replacement.id === exercise.id || currentIds.includes(replacement.id)) return;
  const nextPlan = {
    ...workout,
    id:`${workout.id}-exercise-shuffle-${Date.now()}`,
    exercises:workout.exercises.map(item => item === exercise ? replacement : item),
  };
  setTodayPlan(nextPlan);
  setState(c=>({...c,todayPlan:nextPlan}));
  setCompleted(c=>c.filter(id=>id!==exercise.id));
};

  const shuffleWorkout=()=>{
  const focus = state.todayCustomization?.muscles?.length
    ? state.todayCustomization.muscles
    : [...new Set(workout.exercises.flatMap(item=>item.muscles))];
  const constraints = state.todayCustomization || {
    timeAvailable: workout.exercises.length <= 3 ? "20" : workout.exercises.length <= 4 ? "30" : workout.exercises.length <= 6 ? "45" : "60+",
    energy:"normal",
    intensity:"moderate",
    equipmentModes:["equipment"],
  };
  const shuffled = generateWorkout({
    library:exerciseLibrary,
    equipment:state.profile.equipment,
    trainingDays:state.profile.trainingDays,
    history:state.history,
    focusOverride:focus,
    exerciseCount:workout.exercises.length,
    constraints,
    excludeIds:workout.exercises.map(item=>item.id),
    shuffle:true,
  });
  if(shuffled.exercises.length){
    const nextPlan = {...shuffled, title:workout.title, focus:workout.focus, id:`${workout.id}-shuffle-${Date.now()}`};
    setTodayPlan(nextPlan);
    setState(c=>({...c,todayPlan:nextPlan}));
    setCompleted([]);
    setShowAll(false);
  }
};
  const applyCustomization=(muscles,count,constraints)=>{
  const custom=generateWorkout({library:exerciseLibrary,equipment:state.profile.equipment,trainingDays:state.profile.trainingDays,history:state.history,focusOverride:muscles,exerciseCount:count,constraints});
  setTodayPlan(custom);
  setState(c=>({...c,todayPlan:custom,todayCustomization:{muscles,timeAvailable:constraints.timeAvailable,energy:constraints.energy,intensity:constraints.intensity,equipmentModes:constraints.equipmentModes}}));
  setCompleted([]);
  setShowAll(false);
  setShowCustomizer(false);
};
  const logToday = (status = progress === 100 ? "completed" : "partial") => {
    if (!completed.length) return;

    const nextHistory = [...state.history, {
      date: activeDate,
      type: workout.type,
      title: workout.title,
      exerciseIds: [...completed],
      plannedExerciseIds: workout.exercises.map(x => x.id),
      completedCount: completed.length,
      plannedCount: workout.exercises.length,
      status,
    }];

    // Finishing a workout immediately advances the session. The calendar is
    // only used for dating history; it does not lock the user into one session
    // per day.
    const nextWorkout = generateWorkout({
      library: exerciseLibrary,
      equipment: state.profile.equipment,
      trainingDays: state.profile.trainingDays,
      history: nextHistory,
      sessionLength: state.profile.sessionLength,
    });

    setState(c => ({
      ...c,
      history: nextHistory,
      todayPlan: nextWorkout,
      todayCustomization: null,
    }));
    setTodayPlan(nextWorkout);
    setCompleted([]);
    setShowAll(false);
  };

  const finish = () => {
    if (progress !== 100) return;
    logToday("completed");
  };

  const finishForToday = () => {
    if (!completed.length) return;
    logToday("partial");
  };
  const saveProfile=profile=>{setState(c=>({...c,profile}));setShowProfile(false);};
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#today"><span className="brand-mark">G</span><span>gymbro</span></a><nav><a className="active" href="#today">Today</a><a href="#history">History</a><a href="#profile" onClick={e=>{e.preventDefault();setShowProfile(true)}}>Profile</a></nav><button className="profile-button" onClick={()=>setShowProfile(true)}>N</button></header>
    <main>
      <section className="hero" id="today"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR DAILY WORKOUT</div><h1>{status}.</h1><p>One focused session. No overthinking. Just show up and move.</p></div><div className="progress-ring" style={{"--progress":`${progress*3.6}deg`}}><strong>{progress}%</strong><span>done</span></div></section>
      <section className="workout-overview"><div><span className="section-label">TODAY · {new Date().toLocaleDateString("en-IN",{weekday:"long",month:"short",day:"numeric"}).toUpperCase()}</span><h2>{workout.title}</h2><p>{workout.subtitle}</p></div><div className="overview-right"><div className="overview-stats"><span><Clock3 size={16}/> {workout.duration}</span><span><Dumbbell size={16}/> {workout.exercises.length} exercises</span><span><Target size={16}/> {workout.focus.join(" · ")}</span></div><button className="customize-button shuffle-workout-button" onClick={shuffleWorkout} title="Shuffle the entire workout"><Shuffle size={15}/> Shuffle workout</button><button className="customize-button" onClick={()=>setShowCustomizer(true)}><SlidersHorizontal size={15}/> Change today’s workout</button></div></section>
      <section className="exercise-list">{visible.map((exercise,index)=><ExerciseCard key={exercise.id} exercise={exercise} index={index} completed={completed.includes(exercise.id)} onToggle={()=>toggle(exercise.id)} onShuffle={shuffleExercise} onPlay={setDemoExercise}/>)}</section>
      <div className="list-actions"><button className="secondary-button" onClick={()=>setShowAll(!showAll)}>{showAll?"Show less":"See full workout"} <ChevronRight size={17}/></button>{completed.length>0&&<button className="quiet-button" onClick={()=>setCompleted([])}><RotateCcw size={15}/> Reset</button>}
      {completed.length>0&&progress<100&&<button className="primary-button compact" onClick={finishForToday}>Finish for today <Check size={16}/></button>}
      {progress===100&&<button className="primary-button compact" onClick={finish}>Log workout <Check size={16}/></button>}</div>      <section className="next-card"><div className="next-icon"><Flame size={21}/></div><div><span className="section-label">THE ENGINE</span><h3>Your next workout changes based on what you actually do.</h3><p>Gymbro rotates movement patterns and avoids recently completed exercises when it builds your next session.</p></div><Settings2 className="next-arrow" size={20}/></section>
      <section className="stats-strip" id="history"><div><Trophy size={18}/><strong>{state.history.length}</strong><span>workouts logged</span></div><div><Flame size={18}/><strong>{(() => { const dates=[...new Set(state.history.map(x=>x.date))].sort().reverse(); let n=0,d=new Date(); for(const date of dates){if(date!==getDateKey(d)) break;n++;d.setDate(d.getDate()-1);} return n; })()}</strong><span>day streak</span></div><div><History size={18}/><strong>{state.history.length?"Active":"New"}</strong><span>training history</span></div></section>
      <section className="history-panel"><div className="history-panel-head"><span className="section-label">TRAINING HISTORY</span><h2>What you actually did.</h2></div>{state.history.length ? [...state.history].reverse().map((session,index)=><article className="history-item" key={`${session.date}-${index}`}><div className="history-date"><strong>{new Date(`${session.date}T12:00:00`).toLocaleDateString("en-IN",{weekday:"short",month:"short",day:"numeric"})}</strong><span>{session.status === "completed" ? "Completed" : "Partial"}</span></div><div className="history-main"><h3>{session.title || (session.type === "upper" ? "Upper Body + Core" : session.type === "lower" ? "Lower Body + Core" : "Custom Workout")}</h3><p>{session.completedCount} of {session.plannedCount} exercises completed</p><div className="history-exercises">{(session.exerciseIds || []).map(id => exerciseLibrary.find(ex => ex.id === id)?.name).filter(Boolean).map(name=><span key={name}>{name}</span>)}</div></div></article>) : <p className="history-empty">Your completed and partial sessions will appear here.</p>}</section>
    </main>
    <footer><span>gymbro · built for consistency</span><span>v0.3</span></footer>
    {showSetup&&<Setup profile={state.profile} onSave={profile=>{saveProfile(profile);localStorage.setItem(ONBOARDED_KEY,"1");setShowSetup(false)}} onClose={()=>{localStorage.setItem(ONBOARDED_KEY,"1");setShowSetup(false)}}/>}
    {showProfile&&<ProfilePanel profile={state.profile} onClose={()=>setShowProfile(false)} onSave={saveProfile}/>}
    {showCustomizer&&<WorkoutCustomizer focus={workout.focus} count={workout.exercises.length} savedCustomization={state.todayCustomization} onApply={applyCustomization} onClose={()=>setShowCustomizer(false)}/>}
    {demoExercise&&<ExerciseDemo exercise={demoExercise} onClose={()=>setDemoExercise(null)}/>}
  </div>;
}
