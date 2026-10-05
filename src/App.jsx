import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Dumbbell,
  Flame,
  History,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { dailyWorkout } from "./data/workouts";

function ExerciseCard({ exercise, index, completed, onToggle }) {
  return (
    <article className={`exercise-card ${completed ? "is-complete" : ""}`}>
      <div className="exercise-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="exercise-main">
        <div className="exercise-heading">
          <div>
            <h3>{exercise.name}</h3>
            <p>{exercise.muscles.join(" · ")}</p>
          </div>
          <button className="icon-button" aria-label={`Start ${exercise.name}`}>
            <Play size={16} fill="currentColor" />
          </button>
        </div>
        <div className="exercise-meta">
          <span>{exercise.sets} sets</span>
          <span>{exercise.reps}</span>
          <span>{exercise.rest} rest</span>
        </div>
        <button className={`complete-button ${completed ? "done" : ""}`} onClick={onToggle}>
          {completed ? <Check size={17} /> : null}
          {completed ? "Completed" : "Mark complete"}
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const [completed, setCompleted] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const progress = Math.round((completed.length / dailyWorkout.exercises.length) * 100);
  const visibleExercises = showAll ? dailyWorkout.exercises : dailyWorkout.exercises.slice(0, 3);

  const status = useMemo(() => {
    if (progress === 100) return "Workout complete";
    if (progress > 0) return "You're in";
    return "Ready when you are";
  }, [progress]);

  const toggleExercise = (id) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const reset = () => setCompleted([]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Gymbro home">
          <span className="brand-mark">G</span>
          <span>gymbro</span>
        </a>
        <nav>
          <a className="active" href="#today">Today</a>
          <a href="#history">History</a>
          <a href="#profile">Profile</a>
        </nav>
        <button className="profile-button">N</button>
      </header>

      <main>
        <section className="hero" id="today">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> YOUR DAILY WORKOUT</div>
            <h1>{status}.</h1>
            <p>One focused session. No overthinking. Just show up and move.</p>
          </div>
          <div className="progress-ring" style={{ "--progress": `${progress * 3.6}deg` }}>
            <strong>{progress}%</strong>
            <span>done</span>
          </div>
        </section>

        <section className="workout-overview">
          <div>
            <span className="section-label">TODAY · MONDAY, OCT 5</span>
            <h2>{dailyWorkout.title}</h2>
            <p>{dailyWorkout.subtitle}</p>
          </div>
          <div className="overview-stats">
            <span><Clock3 size={16} /> {dailyWorkout.duration}</span>
            <span><Dumbbell size={16} /> {dailyWorkout.exercises.length} exercises</span>
            <span><Target size={16} /> {dailyWorkout.focus.join(" · ")}</span>
          </div>
        </section>

        <section className="exercise-list">
          {visibleExercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              completed={completed.includes(exercise.id)}
              onToggle={() => toggleExercise(exercise.id)}
            />
          ))}
        </section>

        <div className="list-actions">
          <button className="secondary-button" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "See full workout"} <ChevronRight size={17} />
          </button>
          {completed.length > 0 && (
            <button className="quiet-button" onClick={reset}>
              <RotateCcw size={15} /> Reset
            </button>
          )}
        </div>

        <section className="next-card">
          <div className="next-icon"><Flame size={21} /></div>
          <div>
            <span className="section-label">WHY THIS SESSION</span>
            <h3>Balanced training, without repeating yourself.</h3>
            <p>Gymbro will eventually use your history, preferences, equipment and recovery to build the next session.</p>
          </div>
          <ArrowRight className="next-arrow" size={20} />
        </section>

        <section className="stats-strip" id="history">
          <div><Trophy size={18} /><strong>0</strong><span>workouts logged</span></div>
          <div><Flame size={18} /><strong>0</strong><span>day streak</span></div>
          <div><History size={18} /><strong>New</strong><span>first session</span></div>
        </section>
      </main>

      <footer>
        <span>gymbro · built for consistency</span>
        <span>v0.1</span>
      </footer>
    </div>
  );
}
