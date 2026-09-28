import { Trophy } from 'lucide-react'
import { CollectionView } from './CollectionView.jsx'
import { useCollection } from '../hooks/useCollection.js'
import { shortId } from '../lib/format.js'

function Leaderboard() {
  const { items, loading, error } = useCollection('leaderboard')

  return (
    <CollectionView
      title="Leaderboard"
      eyebrow="FRIENDLY COMPETITION / 02"
      description="Celebrate consistency across the OctoFit community."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="Points will appear after activities are recorded."
    >
      <div className="table-responsive">
        <table className="table data-table align-middle mb-0">
          <thead><tr><th>RANK</th><th>MEMBER</th><th>TEAM</th><th>PERIOD</th><th className="text-end">POINTS</th></tr></thead>
          <tbody>
            {[...items].sort((first, second) => (second.points || 0) - (first.points || 0)).map((entry, index) => (
              <tr key={entry._id || `${entry.userId}-${entry.period}`}>
                <td><span className={`rank-number ${index === 0 ? 'rank-first' : ''}`}>{String(index + 1).padStart(2, '0')}</span></td>
                <td><span className="member-name"><Trophy size={15} />Member {shortId(entry.userId)}</span></td>
                <td className="secondary-cell">Team {shortId(entry.teamId)}</td>
                <td>{entry.period || '—'}</td>
                <td className="text-end points-value">{entry.points ?? 0}<span> pts</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollectionView>
  )
}

export default Leaderboard