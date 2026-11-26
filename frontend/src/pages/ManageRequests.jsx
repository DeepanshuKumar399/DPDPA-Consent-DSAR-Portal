import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';

const badgeClass = { pending: 'badge-warning', in_progress: 'badge-info', completed: 'badge-success', rejected: 'badge-danger' };

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const fetchRequests = () => api.get('/admin/requests').then(({ data }) => setRequests(data));
  useEffect(() => { fetchRequests(); }, []);

  const handleUpdate = async (id, status) => {
    const adminNote = status === 'rejected' ? prompt('Reason for rejection:') : '';
    await api.put(`/admin/requests/${id}`, { status, adminNote });
    fetchRequests();
  };

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div className="page-title">Manage Requests</div>
            <div className="page-subtitle">Review and update DSAR request statuses</div>
          </div>
          {requests.map(r => (
            <div key={r._id} className="item-card">
              <div className="item-card-header">
                <div>
                  <div className="item-card-title">{r.type} Request</div>
                  <div className="item-card-meta">{r.user?.name} · {r.user?.email}</div>
                </div>
                <span className={`badge ${badgeClass[r.status] || 'badge-gray'}`}>{r.status.replace('_', ' ')}</span>
              </div>
              {r.description && <div className="item-card-desc">{r.description}</div>}
              <div className="item-card-actions">
                {r.status === 'pending' && (
                  <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(r._id, 'in_progress')}>▶ Start</button>
                )}
                {r.status === 'in_progress' && (
                  <button className="btn btn-success btn-sm" onClick={() => handleUpdate(r._id, 'completed')}>✔ Complete</button>
                )}
                {['pending', 'in_progress'].includes(r.status) && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleUpdate(r._id, 'rejected')}>✕ Reject</button>
                )}
              </div>
            </div>
          ))}
          {!requests.length && (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <div className="empty-state-text">No requests found.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
