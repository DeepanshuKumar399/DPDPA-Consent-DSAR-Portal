import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import api from '../services/api.js';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  useEffect(() => { api.get('/admin/audit-logs').then(({ data }) => setLogs(data)); }, []);

  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <div className="page-title">Audit Logs</div>
            <div className="page-subtitle">Complete system activity trail</div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {['Timestamp', 'User', 'Action', 'Entity', 'Details'].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log._id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{new Date(log.createdAt).toLocaleString('en-IN')}</td>
                    <td>{log.user?.email || '—'}</td>
                    <td><span className="badge badge-info">{log.action}</span></td>
                    <td>{log.entity}</td>
                    <td style={{ color: 'var(--gray-500)' }}>{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!logs.length && (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <div className="empty-state-text">No audit logs found.</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
