import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Clock3, Dumbbell, Flame, History, Play, RotateCcw, Settings2, Sparkles, Target, Trophy, X } from "lucide-react";
import { defaultProfile, exerciseLibrary } from "./data/workouts";
import { generateWorkout } from "./engine/generateWorkout";

const STORAGE_KEY = "gymbro-state-v1";
const ONBOARDED_KEY = "gymbro-onboarded";

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { profile: defaultProfile, history: [] }; }
  catch { return { profile: defaultProfile, history: [] }; }
}

function ExerciseCard({ exercise, index, completed, onToggle }) {
  return <article className={`exercise-card ${completed ? "is-complete" : ""}`}>
    <div className="exercise-number">{String(index + 1).padStart(2,"0")}</div>
    <div className="exercise-main">
      <div className="exercise-heading"><div><h3>{exercise.name}</h3><p>{exercise.muscles.join(" · ")}</p></div><button className="icon-button" aria-label={`Start ${exercise.name}`}><Play size={16} fill="currentColor"/></button></div>
      <div className="exercise-meta"><span>{exercise.sets} sets</span><span>{exercise.reps}</span><span>{exercise.rest} rest</span></div>
      <button className={`complete-button ${completed ? "done" : ""}`} onClick={onToggle}>{completed && <Check size={17}/>} {completed ? "Completed" : "Mark complete"}</button>
    </div>
  </article>;
}

function Setup({ profile, onSave }) {
  const [goal,setGoal]=useState(profile.goal), [days,setDays]=useState(profile.trainingDays), [length,setLength]=useState(profile.sessionLength);
  return <div className="setup-overlay"><section className="setup-card">
    <div className="setup-brand"><span className="brand-mark">G</span><strong>gymbro</strong></div>
    <span className="section-label">LET'S SET YOU UP</span><h1>Your workouts should fit <em>you.</em></h1>
    <p className="setup-intro">Gymbro uses these basics to decide what you should train and how much work to give you.</p>
    <label>Primary goal</label><div className="choice-grid">{[["fat-loss","Fat loss"],["strength","Get stronger"],["fitness","General fitness"]].map(([v,l])=><button key={v} className={goal===v?"choice selected":"choice"} onClick={()=>setGoal(v)}>{l}</button>)}</div>
    <label>Training days / week</label><div className="segmented">{[3,4,5].map(v=><button key={v} className={days===v?"selected":""} onClick={()=>setDays(v)}>{v}</button>)}</div>
    <label>Typical session</label><div className="segmented">{[30,45,50,60].map(v=><button key={v} className={length===v?"selected":""} onClick={()=>setLength(v)}>{v} min</button>)}</div>
    <button className="primary-button" onClick={()=>onSave({...profile,goal,trainingDays:days,sessionLength:length})}>Build my Gymbro <ChevronRight size={17}/></button>
  </section></div>;
}

function ProfilePanel({ profile, onClose, onSave }) {
  const [days,setDays]=useState(profile.trainingDays), [length,setLength]=useState(profile.sessionLength);
  return <div className="panel-overlay" onClick={onClose}><aside className="profile-panel" onClick={e=>e.stopPropagation()}>
    <div className="panel-head"><div><span className="section-label">PROFILE</span><h2>Your setup</h2></div><button className="icon-button" onClick={onClose}><X size={17}/></button></div>
    <label>Training days</label><div className="segmented">{[3,4,5].map(v=><button key={v} className={days===v?"selected":""} onClick={()=>setDays(v)}>{v}</button>)}</div>
    <label>Session length</label><div className="segmented">{[30,45,50,60].map(v=><button key={v} className={length===v?"selected":""} onClick={()=>setLength(v)}>{v}m</button>)}</div>
    <button className="primary-button" onClick={()=>onSave({...profile,trainingDays:days,sessionLength:length})}>Save changes</button>
  </aside></div>;
}

export default function App() {
  const [state,setState]=useState(loadState), [completed,setCompleted]=useState([]), [showAll,setShowAll]=useState(false), [showProfile,setShowProfile]=useState(false);
  useEffect(()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state)),[state]);
  const workout=useMemo(()=>generateWorkout({library:exerciseLibrary,equipment:state.profile.equipment,trainingDays:state.profile.trainingDays,history:state.history}),[state.profile,state.history]);
  const progress=Math.round((completed.length/workout.exercises.length)*100);
  const status=progress===100?"Workout complete":progress>0?"You're in":"Ready when you are";
  const visible=showAll?workout.exercises:workout.exercises.slice(0,3);
  const toggle=id=>setCompleted(c=>c.includes(id)?c.filter(x=>x!==id):[...c,id]);
  const finish=()=>{if(progress!==100)return;setState(c=>({...c,history:[...c.history,{date:new Date().toISOString(),type:workout.type,exerciseIds:workout.exercises.map(x=>x.id)}]}));setCompleted([]);};
  const saveProfile=profile=>{setState(c=>({...c,profile}));setShowProfile(false);};
  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#today"><span className="brand-mark">G</span><span>gymbro</span></a><nav><a className="active" href="#today">Today</a><a href="#history">History</a><a href="#profile" onClick={e=>{e.preventDefault();setShowProfile(true)}}>Profile</a></nav><button className="profile-button" onClick={()=>setShowProfile(true)}>N</button></header>
    <main>
      <section className="hero" id="today"><div className="hero-copy"><div className="eyebrow"><Sparkles size={14}/> YOUR DAILY WORKOUT</div><h1>{status}.</h1><p>One focused session. No overthinking. Just show up and move.</p></div><div className="progress-ring" style={{"--progress":`${progress*3.6}deg`}}><strong>{progress}%</strong><span>done</span></div></section>
      <section className="workout-overview"><div><span className="section-label">TODAY · {new Date().toLocaleDateString("en-IN",{weekday:"long",month:"short",day:"numeric"}).toUpperCase()}</span><h2>{workout.title}</h2><p>{workout.subtitle}</p></div><div className="overview-stats"><span><Clock3 size={16}/> {workout.duration}</span><span><Dumbbell size={16}/> {workout.exercises.length} exercises</span><span><Target size={16}/> {workout.focus.join(" · ")}</span></div></section>
      <section className="exercise-list">{visible.map((exercise,index)=><ExerciseCard key={exercise.id} exercise={exercise} index={index} completed={completed.includes(exercise.id)} onToggle={()=>toggle(exercise.id)}/>)}</section>
      <div className="list-actions"><button className="secondary-button" onClick={()=>setShowAll(!showAll)}>{showAll?"Show less":"See full workout"} <ChevronRight size={17}/></button>{completed.length>0&&<button className="quiet-button" onClick={()=>setCompleted([])}><RotateCcw size={15}/> Reset</button>}{progress===100&&<button className="primary-button compact" onClick={finish}>Log workout <Check size={16}/></button>}</div>
      <section className="next-card"><div className="next-icon"><Flame size={21}/></div><div><span className="section-label">THE ENGINE</span><h3>Your next workout changes based on what you actually do.</h3><p>Gymbro rotates movement patterns and avoids recently completed exercises when it builds your next session.</p></div><Settings2 className="next-arrow" size={20}/></section>
      <section className="stats-strip" id="history"><div><Trophy size={18}/><strong>{state.history.length}</strong><span>workouts logged</span></div><div><Flame size={18}/><strong>{state.history.length?Math.min(state.history.length,7):0}</strong><span>current streak</span></div><div><History size={18}/><strong>{state.history.length?"Active":"New"}</strong><span>training history</span></div></section>
    </main>
    <footer><span>gymbro · built for consistency</span><span>v0.2</span></footer>
    {!localStorage.getItem(ONBOARDED_KEY)&&<Setup profile={state.profile} onSave={profile=>{saveProfile(profile);localStorage.setItem(ONBOARDED_KEY,"1")}}/>}
    {showProfile&&<ProfilePanel profile={state.profile} onClose={()=>setShowProfile(false)} onSave={saveProfile}/>}
  </div>;
}
