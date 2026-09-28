import { Mail, UserRound } from 'lucide-react'
import { CollectionView } from './CollectionView.jsx'
import { useCollection } from '../hooks/useCollection.js'

function initials(name) {
  return String(name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function Users() {
  const { items, loading, error } = useCollection('users')

  return (
    <CollectionView
      title="Members"
      eyebrow="THE COMMUNITY / 04"
      description="Meet the people showing up and moving forward."
      items={items}
      loading={loading}
      error={error}
      emptyMessage="Members will appear here when they join OctoFit."
    >
      <div className="member-list">
        {items.map((user, index) => (
          <article className="member-row" key={user._id || user.username || user.email}>
            <span className={`member-avatar avatar-tone-${index % 4}`}>{initials(user.displayName || user.username)}</span>
            <div className="member-info">
              <h2>{user.displayName || user.username || 'OctoFit member'}</h2>
              {user.email && <span><Mail size={13} aria-hidden="true" />{user.email}</span>}
            </div>
            <UserRound className="member-trail" size={18} aria-hidden="true" />
          </article>
        ))}
      </div>
    </CollectionView>
  )
}

export default Users