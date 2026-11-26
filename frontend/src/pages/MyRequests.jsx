import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import RequestCard from '../components/RequestCard.jsx';
import api from '../services/api.js';

export default function MyRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => { api.get('/requests').then(({ data }) => setRequests(data)); }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div className="page-title">My Requests</div>
              <div className="page-subtitle">Track all your submitted DSAR requests</div>
            </div>
            <Link to="/requests/new" className="btn btn-primary">➕ New Request</Link>
          </div>
          {requests.map(r => <RequestCard key={r._id} request={r} />)}
          {!requests.length && (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <div className="empty-state-text">No requests submitted yet.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
