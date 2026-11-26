import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import ConsentManagement from './pages/ConsentManagement.jsx';
import ConsentHistory from './pages/ConsentHistory.jsx';
import CreateRequest from './pages/CreateRequest.jsx';
import MyRequests from './pages/MyRequests.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ManageRequests from './pages/ManageRequests.jsx';
import AuditLogs from './pages/AuditLogs.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/consents" element={<ConsentManagement />} />
          <Route path="/consents/history" element={<ConsentHistory />} />
          <Route path="/requests/new" element={<CreateRequest />} />
          <Route path="/requests" element={<MyRequests />} />
        </Route>

        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/requests" element={<ManageRequests />} />
          <Route path="/admin/audit-logs" element={<AuditLogs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
