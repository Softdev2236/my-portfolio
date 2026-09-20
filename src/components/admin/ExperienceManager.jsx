import { useState, useEffect } from 'react';
import { experienceApi } from './adminApi';
import ConfirmModal from './ConfirmModal';
import './AdminForms.css';
import './Managers.css';

// Empty template for a new experience
const EMPTY_EXPERIENCE = {
  position: '',
  company: '',
  duration: '',
  description: '',
  order: 0
};

function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    setLoading(true);
    const res = await experienceApi.list();
    if (res.success) setExperiences(res.data);
    setLoading(false);
  };

  const openNew = () => {
    setEditing({ ...EMPTY_EXPERIENCE, order: experiences.length + 1 });
  };

  const openEdit = (exp) => {
    setEditing({
      _id: exp._id,
      position: exp.position || '',
      company: exp.company || '',
      duration: exp.duration || '',
      description: exp.description || '',
      order: exp.order || 0
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
      position: editing.position,
      company: editing.company,
      duration: editing.duration,
      description: editing.description,
      order: Number(editing.order)
    };

    const res = editing._id
      ? await experienceApi.update(editing._id, payload)
      : await experienceApi.create(payload);

    setSaving(false);

    if (res.success) {
      setMessage({
        type: 'success',
        text: editing._id ? '✅ Updated!' : '✅ Created!'
      });
      await loadExperiences();
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
    const res = await experienceApi.remove(deleteTarget._id);
    setDeleteTarget(null);
    if (res.success) await loadExperiences();
  };

  // ---------- List view ----------
  if (!editing) {
    return (
      <div className="manager">
        <div className="manager-header">
          <h2 className="admin-form-title">Experience</h2>
          <button className="btn-primary" onClick={openNew}>
            + Add New Experience
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#bbb' }}>Loading…</p>
        ) : experiences.length === 0 ? (
          <p style={{ color: '#bbb' }}>No experience yet. Add one!</p>
        ) : (
          <div className="manager-grid">
            {experiences.map((exp) => (
              <div key={exp._id} className="manager-card">
                <div className="manager-card-body">
                  <h3>{exp.position}</h3>
                  <h4 style={{ color: 'goldenrod', fontSize: '14px', marginBottom: '6px' }}>
                    {exp.company}
                  </h4>
                  <p style={{ color: '#888', fontSize: '12px', marginBottom: '8px' }}>
                    {exp.duration}
                  </p>
                  <p style={{ color: '#aaa', fontSize: '13px', lineHeight: 1.5 }}>
                    {exp.description?.slice(0, 120)}…
                  </p>
                  <span className="manager-badge" style={{ marginTop: '10px' }}>
                    Order: {exp.order}
                  </span>
                </div>
                <div className="manager-card-actions">
                  <button className="btn-edit" onClick={() => openEdit(exp)}>
                    Edit
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => setDeleteTarget(exp)}
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
          title="Delete Experience?"
          message={`Are you sure you want to delete "${deleteTarget?.position} at ${deleteTarget?.company}"? This cannot be undone.`}
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
        {editing._id ? 'Edit Experience' : 'New Experience'}
      </h2>

      <div className="form-group">
        <label>Position / Job Title</label>
        <input
          type="text"
          value={editing.position}
          onChange={(e) => handleChange('position', e.target.value)}
          placeholder="e.g. Front-End Developer"
        />
      </div>

      <div className="form-group">
        <label>Company</label>
        <input
          type="text"
          value={editing.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="e.g. VOR DEVELOPERS PRIVATE LIMITED"
        />
      </div>

      <div className="form-group">
        <label>Duration</label>
        <input
          type="text"
          value={editing.duration}
          onChange={(e) => handleChange('duration', e.target.value)}
          placeholder="e.g. 2022-2026"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows={4}
          value={editing.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="What did you do in this role?"
        />
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
          {saving ? 'Saving…' : editing._id ? 'Save Changes' : 'Create Experience'}
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

export default ExperienceManager;