import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';

const TYPES = ['access', 'correction', 'erasure', 'portability', 'nomination'];
const TYPE_DESC = {
  access: 'Request a copy of your personal data we hold',
  correction: 'Request correction of inaccurate personal data',
  erasure: 'Request deletion of your personal data',
  portability: 'Request your data in a portable format',
  nomination: 'Nominate someone to exercise rights on your behalf',
};

export default function CreateRequest() {
  const [form, setForm] = useState({ type: TYPES[0], description: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/requests', form);
      navigate('/requests');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div className="page-title">New DSAR Request</div>
            <div className="page-subtitle">Submit a Data Subject Access Request under DPDPA</div>
          </div>
          <div className="card" style={{ maxWidth: 560 }}>
            <div className="card-header"><span className="card-title">Request Details</span></div>
            <div className="card-body">
              {error && <div className="alert alert-error">⚠️ {error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Request Type</label>
                  <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    {TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.375rem' }}>{TYPE_DESC[form.type]}</p>
                </div>
                <div className="form-group">
                  <label className="form-label">Description <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}>(optional)</span></label>
                  <textarea className="form-textarea" placeholder="Provide additional details about your request..." value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Request'}</button>
                  <button className="btn btn-outline" type="button" onClick={() => navigate('/requests')}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
