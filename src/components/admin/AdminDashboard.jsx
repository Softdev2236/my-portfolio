import { clearToken } from '../../lib/auth';
import './AdminDashboard.css';

function AdminDashboard({ onExit }) {
  const handleLogout = () => {
    clearToken();
    onExit();
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <div className="admin-header-actions">
          <button onClick={onExit} className="admin-btn-secondary">
            View Site
          </button>
          <button onClick={handleLogout} className="admin-btn-danger">
            Logout
          </button>
        </div>
      </header>

      <main className="admin-main">
        <p style={{ color: '#bbb', textAlign: 'center', marginTop: '60px' }}>
          ✅ Logged in! Dashboard content coming next...
        </p>
      </main>
    </div>
  );
}

export default AdminDashboard;