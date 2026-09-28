export function CollectionView({
  title,
  eyebrow,
  description,
  items,
  loading,
  error,
  emptyMessage,
  children,
}) {
  return (
    <section className="collection-view">
      <header className="view-heading">
        <div>
          <div className="view-eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="record-count" aria-live="polite">
          <span>RECORDS</span>
          <strong>{loading ? '...' : items.length}</strong>
        </div>
      </header>

      <div className="collection-panel">
        {loading && (
          <div className="collection-message" role="status">
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            <span>Loading {title.toLowerCase()}...</span>
          </div>
        )}
        {!loading && error && (
          <div className="collection-message collection-error" role="alert">
            <strong>Could not load {title.toLowerCase()}.</strong>
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && items.length === 0 && (
          <div className="collection-message collection-empty">
            <span className="empty-mark" aria-hidden="true">+</span>
            <strong>Nothing here yet</strong>
            <span>{emptyMessage}</span>
          </div>
        )}
        {!loading && !error && items.length > 0 && children}
      </div>
    </section>
  )
}
