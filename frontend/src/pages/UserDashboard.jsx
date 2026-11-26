import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Link } from 'react-router-dom';

const actions = [
  { to: '/consents', icon: '✅', title: 'Manage Consents', desc: 'Grant or revoke data processing consents' },
  { to: '/consents/history', icon: '📋', title: 'Consent History', desc: 'View all past consent activities' },
  { to: '/requests/new', icon: '➕', title: 'New DSAR Request', desc: 'Submit a data subject access request' },
  { to: '/requests', icon: '📁', title: 'My Requests', desc: 'Track your submitted requests' },
];

export default function UserDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="welcome-banner">
            <h2>Welcome back, {user?.name} 👋</h2>
            <p>Manage your data consents and submit access requests under DPDPA.</p>
          </div>
          <div className="page-header">
            <div className="page-title">Quick Actions</div>
            <div className="page-subtitle">What would you like to do today?</div>
          </div>
          <div className="action-grid">
            {actions.map(a => (
              <Link key={a.to} to={a.to} className="action-card">
                <div className="action-card-icon">{a.icon}</div>
                <div className="action-card-title">{a.title}</div>
                <div className="action-card-desc">{a.desc}</div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
