import { UsersRound } from 'lucide-react'
import { CollectionView } from './CollectionView.jsx'
import { useCollection } from '../hooks/useCollection.js'

function Teams() {
  const { items, loading, error } = useCollection('teams')

  return (
    <CollectionView
      title="Teams"
      eyebrow="MOVE TOGETHER / 03"
      description="Find your people and build momentum as a group."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="Teams will appear here when they are created."
    >
      <div className="team-grid">
        {items.map((team, index) => (
          <article className="team-row" key={team._id || team.name}>
            <span className={`team-number team-tone-${index % 3}`}>{String(index + 1).padStart(2, '0')}</span>
            <div className="team-info">
              <h2>{team.name || 'Unnamed team'}</h2>
              <span>{team.memberIds?.length ?? team.members?.length ?? 0} members</span>
            </div>
            <UsersRound className="team-icon" size={19} aria-hidden="true" />
          </article>
        ))}
      </div>
    </CollectionView>
  )
}

export default Teams