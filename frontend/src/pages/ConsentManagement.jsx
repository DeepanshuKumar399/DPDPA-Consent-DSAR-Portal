import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ConsentCard from '../components/ConsentCard.jsx';
import api from '../services/api.js';

const PURPOSES = ['Marketing', 'Analytics', 'Personalization', 'Third-party Sharing'];

export default function ConsentManagement() {
  const [consents, setConsents] = useState([]);
  const [purpose, setPurpose] = useState(PURPOSES[0]);

  const fetchConsents = async () => {
    const { data } = await api.get('/consents');
    setConsents(data.filter(c => c.status === 'granted'));
  };

  useEffect(() => { fetchConsents(); }, []);

  const handleGrant = async () => { await api.post('/consents', { purpose }); fetchConsents(); };
  const handleRevoke = async (id) => { await api.put(`/consents/${id}/revoke`); fetchConsents(); };

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div className="page-title">Consent Management</div>
            <div className="page-subtitle">Grant or revoke your data processing consents</div>
          </div>
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-header"><span className="card-title">Grant New Consent</span></div>
            <div className="card-body">
              <div className="toolbar">
                <div className="form-group" style={{ margin: 0, flex: 1, maxWidth: 280 }}>
                  <select className="form-select" value={purpose} onChange={e => setPurpose(e.target.value)}>
                    {PURPOSES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <button className="btn btn-primary" onClick={handleGrant}>✅ Grant Consent</button>
              </div>
            </div>
          </div>
          <div className="page-header">
            <div className="page-title" style={{ fontSize: '1rem' }}>Active Consents</div>
          </div>
          {consents.map(c => <ConsentCard key={c._id} consent={c} onRevoke={handleRevoke} />)}
          {!consents.length && (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <div className="empty-state-text">No active consents. Grant one above.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
