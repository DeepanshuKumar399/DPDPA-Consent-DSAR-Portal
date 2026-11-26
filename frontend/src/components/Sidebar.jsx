import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Link = ({ to, icon, label }) => (
  <NavLink to={to} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}>
    <span className="sidebar-icon">{icon}</span>
    {label}
  </NavLink>
);

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-label">Main</div>
        <Link to="/dashboard" icon="🏠" label="Dashboard" />
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Consents</div>
        <Link to="/consents" icon="✅" label="Manage Consents" />
        <Link to="/consents/history" icon="📋" label="Consent History" />
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Requests</div>
        <Link to="/requests/new" icon="➕" label="New Request" />
        <Link to="/requests" icon="📁" label="My Requests" />
      </div>
      {user?.role === 'admin' && (
        <div className="sidebar-section">
          <div className="sidebar-label">Admin</div>
          <Link to="/admin" icon="📊" label="Admin Dashboard" />
          <Link to="/admin/requests" icon="⚙️" label="Manage Requests" />
          <Link to="/admin/audit-logs" icon="🔍" label="Audit Logs" />
        </div>
      )}
    </aside>
  );
}
