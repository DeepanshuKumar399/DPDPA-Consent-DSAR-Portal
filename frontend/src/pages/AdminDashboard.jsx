import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    api.get('/admin/requests').then(({ data }) => {
      setStats({
        total: data.length,
        pending: data.filter(r => r.status === 'pending').length,
        inProgress: data.filter(r => r.status === 'in_progress').length,
        completed: data.filter(r => r.status === 'completed').length,
      });
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="welcome-banner">
            <h2>Admin Dashboard 🛡️</h2>
            <p>Monitor and manage all DSAR requests and system activity.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Requests</div>
              <div className="stat-value primary">{stats.total}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value warning">{stats.pending}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">In Progress</div>
              <div className="stat-value" style={{ color: 'var(--info)' }}>{stats.inProgress}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Completed</div>
              <div className="stat-value success">{stats.completed}</div>
            </div>
          </div>
          <div className="action-grid">
            <Link to="/admin/requests" className="action-card">
              <div className="action-card-icon">⚙️</div>
              <div className="action-card-title">Manage Requests</div>
              <div className="action-card-desc">Review and update DSAR request statuses</div>
            </Link>
            <Link to="/admin/audit-logs" className="action-card">
              <div className="action-card-icon">🔍</div>
              <div className="action-card-title">Audit Logs</div>
              <div className="action-card-desc">View complete system activity logs</div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
