import { useState } from 'react';
import { clearToken } from '../../lib/auth';
import HeroEditor from './HeroEditor';
import ProjectsManager from './ProjectsManager';
import SkillsManager from './SkillsManager';
import ExperienceManager from './ExperienceManager';
import ServicesManager from './ServicesManager';
import './AdminDashboard.css';

const SECTIONS = [
  { key: 'hero', label: 'Hero', component: HeroEditor },
  { key: 'projects', label: 'Projects', component: ProjectsManager },
  { key: 'skills', label: 'Skills', component: SkillsManager },
  { key: 'experience', label: 'Experience', component: ExperienceManager },
  { key: 'services', label: 'Services', component: ServicesManager }
];

function AdminDashboard({ onExit }) {
  const [activeSection, setActiveSection] = useState('hero');

  const handleLogout = () => {
    clearToken();
    onExit();
  };

  // Find the active component
  const ActiveComponent =
    SECTIONS.find((s) => s.key === activeSection)?.component || HeroEditor;

  return (
    <div className="admin-dashboard">
      {/* Header */}
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

      {/* Main layout: sidebar + content */}
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              className={`admin-nav-btn ${
                activeSection === section.key ? 'active' : ''
              }`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="admin-main">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;