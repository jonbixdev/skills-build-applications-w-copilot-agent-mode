import { Clock3, Dumbbell } from 'lucide-react'
import { CollectionView } from './CollectionView.jsx'
import { useCollection } from '../hooks/useCollection.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const { items, loading, error } = useCollection(workoutsEndpoint)

  return (
    <CollectionView
      title="Workouts"
      eyebrow="YOUR NEXT SESSION / 05"
      description="Pick a session that fits your energy and your day."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="Suggested workouts will appear here soon."
    >
      <div className="workout-grid">
        {items.map((workout) => (
          <article className="workout-row" key={workout._id || workout.name}>
            <span className="workout-symbol"><Dumbbell size={19} aria-hidden="true" /></span>
            <div className="workout-info">
              <div className="workout-meta">
                {workout.difficulty && <span className="difficulty-tag">{workout.difficulty}</span>}
                {workout.durationMinutes && <span className="inline-icon"><Clock3 size={13} />{workout.durationMinutes} min</span>}
              </div>
              <h2>{workout.name || 'Workout'}</h2>
              {workout.description && <p>{workout.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </CollectionView>
  )
}

export default Workouts