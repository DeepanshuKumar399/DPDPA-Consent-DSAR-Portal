export default function ConsentCard({ consent, onRevoke }) {
  return (
    <div className="item-card">
      <div className="item-card-header">
        <div>
          <div className="item-card-title">{consent.purpose}</div>
          <div className="item-card-meta">Granted on {new Date(consent.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        </div>
        <span className={`badge ${consent.status === 'granted' ? 'badge-success' : 'badge-danger'}`}>
          {consent.status}
        </span>
      </div>
      {consent.status === 'granted' && (
        <div className="item-card-actions">
          <button className="btn btn-danger btn-sm" onClick={() => onRevoke(consent._id)}>Revoke Consent</button>
        </div>
      )}
    </div>
  );
}
