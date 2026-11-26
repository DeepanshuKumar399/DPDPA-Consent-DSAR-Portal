const badgeClass = { pending: 'badge-warning', in_progress: 'badge-info', completed: 'badge-success', rejected: 'badge-danger' };

export default function RequestCard({ request }) {
  return (
    <div className="item-card">
      <div className="item-card-header">
        <div>
          <div className="item-card-title">{request.type} Request</div>
          <div className="item-card-meta">Submitted {new Date(request.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
        <span className={`badge ${badgeClass[request.status] || 'badge-gray'}`}>{request.status.replace('_', ' ')}</span>
      </div>
      {request.description && <div className="item-card-desc">{request.description}</div>}
      {request.adminNote && (
        <div className="alert alert-error" style={{ marginTop: '0.75rem', marginBottom: 0 }}>
          <strong>Admin Note:</strong> {request.adminNote}
        </div>
      )}
    </div>
  );
}
