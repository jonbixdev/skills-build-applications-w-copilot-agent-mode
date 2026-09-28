import { CalendarDays, Flame, Footprints } from 'lucide-react'
import { CollectionView } from './CollectionView.jsx'
import { useCollection } from '../hooks/useCollection.js'
import { formatDate, shortId } from '../lib/format.js'

function Activities() {
  const { items, loading, error } = useCollection('activities')

  return (
    <CollectionView
      title="Activities"
      eyebrow="MOVEMENT LOG / 01"
      description="A clear view of the work you have put in."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="New activity will show up here once it is logged."
    >
      <div className="table-responsive">
        <table className="table data-table align-middle mb-0">
          <thead>
            <tr><th>ACTIVITY</th><th>MEMBER</th><th>DATE</th><th>DURATION</th><th>DISTANCE</th><th>CALORIES</th></tr>
          </thead>
          <tbody>
            {items.map((activity) => (
              <tr key={activity._id || `${activity.userId}-${activity.completedAt}`}>
                <td><span className="activity-symbol"><Footprints size={16} /></span>{activity.activityType || 'Activity'}</td>
                <td className="secondary-cell">{shortId(activity.userId)}</td>
                <td><span className="inline-icon"><CalendarDays size={14} />{formatDate(activity.completedAt)}</span></td>
                <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '—'}</td>
                <td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td>
                <td><span className="inline-icon"><Flame size={14} />{activity.caloriesBurned || '—'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionView>
  )
}

export default Activities