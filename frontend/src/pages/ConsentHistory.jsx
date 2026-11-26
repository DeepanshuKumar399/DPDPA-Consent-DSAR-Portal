import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import ConsentCard from '../components/ConsentCard.jsx';
import api from '../services/api.js';

export default function ConsentHistory() {
  const [consents, setConsents] = useState([]);

  useEffect(() => { api.get('/consents').then(({ data }) => setConsents(data)); }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div className="page-title">Consent History</div>
            <div className="page-subtitle">Full history of all your consent activities</div>
          </div>
          {consents.map(c => <ConsentCard key={c._id} consent={c} onRevoke={() => {}} />)}
          {!consents.length && (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <div className="empty-state-text">No consent history found.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
