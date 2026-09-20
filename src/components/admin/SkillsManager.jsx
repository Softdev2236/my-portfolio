import { useState, useEffect } from 'react';
import { skillsApi } from './adminApi';
import ConfirmModal from './ConfirmModal';
import './AdminForms.css';
import './Managers.css';

// Empty template for a new skill
const EMPTY_SKILL = {
  name: '',
  percentage: 50,
  icon: 'FaCode',
  order: 0
};

// Icons available for skills
const ICON_OPTIONS = [
  'FaHtml5',
  'FaCss3',
  'FaJs',
  'FaReact',
  'FaNodeJs',
  'FaPython',
  'FaDatabase',
  'FaGitAlt',
  'FaFigma',
  'FaSass',
  'FaBootstrap',
  'FaCode'
];

function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);
    const res = await skillsApi.list();
    if (res.success) setSkills(res.data);
    setLoading(false);
  };

  const openNew = () => {
    setEditing({ ...EMPTY_SKILL, order: skills.length + 1 });
  };

  const openEdit = (skill) => {
    setEditing({
      _id: skill._id,
      name: skill.name || '',
      percentage: skill.percentage || 0,
      icon: skill.icon || 'FaCode',
      order: skill.order || 0
    });
  };

  const closeForm = () => setEditing(null);

  const handleChange = (field, value) => {
    setEditing((prev) => ({ ...prev, [field]: value }));
  };

  // ---------- Save ----------
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const payload = {
      name: editing.name,
      percentage: Number(editing.percentage),
      icon: editing.icon,
      order: Number(editing.order)
    };

    const res = editing._id
      ? await skillsApi.update(editing._id, payload)
      : await skillsApi.create(payload);

    setSaving(false);

    if (res.success) {
      setMessage({ type: 'success', text: editing._id ? '✅ Updated!' : '✅ Created!' });
      await loadSkills();
      setTimeout(() => {
        setMessage(null);
        closeForm();
      }, 1000);
    } else {
      setMessage({ type: 'error', text: '❌ ' + res.error });
    }
  };

  // ---------- Delete ----------
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const res = await skillsApi.remove(deleteTarget._id);
    setDeleteTarget(null);
    if (res.success) await loadSkills();
  };

  // ---------- List view ----------
  if (!editing) {
    return (
      <div className="manager">
        <div className="manager-header">
          <h2 className="admin-form-title">Skills</h2>
          <button className="btn-primary" onClick={openNew}>
            + Add New Skill
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#bbb' }}>Loading…</p>
        ) : skills.length === 0 ? (
          <p style={{ color: '#bbb' }}>No skills yet. Add one!</p>
        ) : (
          <div className="manager-grid">
            {skills.map((skill) => (
              <div key={skill._id} className="manager-card">
                <div className="manager-card-body">
                  <div className="skill-row">
                    <span className="skill-icon-badge">{skill.icon}</span>
                    <div>
                      <h3>{skill.name}</h3>
                      <p>{skill.percentage}%</p>
                    </div>
                  </div>
                </div>
                <div className="manager-card-actions">
                  <button className="btn-edit" onClick={() => openEdit(skill)}>
                    Edit
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => setDeleteTarget(skill)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmModal
          isOpen={!!deleteTarget}
          title="Delete Skill?"
          message={`Are you sure you want to delete "${deleteTarget?.name}"? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    );
  }

  // ---------- Form view ----------
  return (
    <div className="admin-form">
      <h2 className="admin-form-title">
        {editing._id ? 'Edit Skill' : 'New Skill'}
      </h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={editing.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. React.js"
        />
      </div>

      <div className="form-group">
        <label>Percentage ({editing.percentage}%)</label>
        <input
          type="range"
          min="0"
          max="100"
          value={editing.percentage}
          onChange={(e) => handleChange('percentage', e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div className="form-group">
        <label>Icon</label>
        <select
          value={editing.icon}
          onChange={(e) => handleChange('icon', e.target.value)}
        >
          {ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Order (lower = first)</label>
        <input
          type="number"
          value={editing.order}
          onChange={(e) => handleChange('order', e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : editing._id ? 'Save Changes' : 'Create Skill'}
        </button>
        <button className="btn-cancel" onClick={closeForm} disabled={saving}>
          Cancel
        </button>
        {message && (
          <span className={`form-message ${message.type}`}>
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}

export default SkillsManager;