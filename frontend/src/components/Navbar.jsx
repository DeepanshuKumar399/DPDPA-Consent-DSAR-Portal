import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">D</div>
        <div>
          <div className="navbar-title">DPDPA Portal</div>
          <div className="navbar-subtitle">Data Protection & Privacy</div>
        </div>
      </div>
      {user && (
        <div className="navbar-right">
          <div className="navbar-user">
            <div className="navbar-avatar">{user.name?.[0]?.toUpperCase()}</div>
            <span>{user.name}</span>
          </div>
          <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
