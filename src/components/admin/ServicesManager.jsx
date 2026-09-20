import { useState, useEffect } from 'react';
import { servicesApi } from './adminApi';
import ConfirmModal from './ConfirmModal';
import './AdminForms.css';
import './Managers.css';

// Empty template for a new service
const EMPTY_SERVICE = {
  title: '',
  description: '',
  icon: 'FaCode',
  order: 0
};

// Icons available for services
const ICON_OPTIONS = [
  'FaReact',
  'FaPaintBrush',
  'FaVideo',
  'FaRobot',
  'FaFileExcel',
  'FaCode',
  'FaMobile',
  'FaPalette',
  'FaCamera',
  'FaChartLine'
];

function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const res = await servicesApi.list();
    if (res.success) setServices(res.data);
    setLoading(false);
  };

  const openNew = () => {
    setEditing({ ...EMPTY_SERVICE, order: services.length + 1 });
  };

  const openEdit = (service) => {
    setEditing({
      _id: service._id,
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || 'FaCode',
      order: service.order || 0
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
      title: editing.title,
      description: editing.description,
      icon: editing.icon,
      order: Number(editing.order)
    };

    const res = editing._id
      ? await servicesApi.update(editing._id, payload)
      : await servicesApi.create(payload);

    setSaving(false);

    if (res.success) {
      setMessage({
        type: 'success',
        text: editing._id ? '✅ Updated!' : '✅ Created!'
      });
      await loadServices();
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
    const res = await servicesApi.remove(deleteTarget._id);
    setDeleteTarget(null);
    if (res.success) await loadServices();
  };

  // ---------- List view ----------
  if (!editing) {
    return (
      <div className="manager">
        <div className="manager-header">
          <h2 className="admin-form-title">Services</h2>
          <button className="btn-primary" onClick={openNew}>
            + Add New Service
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#bbb' }}>Loading…</p>
        ) : services.length === 0 ? (
          <p style={{ color: '#bbb' }}>No services yet. Add one!</p>
        ) : (
          <div className="manager-grid">
            {services.map((service) => (
              <div key={service._id} className="manager-card">
                <div className="manager-card-body">
                  <div className="skill-row">
                    <span className="skill-icon-badge">{service.icon}</span>
                    <div>
                      <h3>{service.title}</h3>
                      <p style={{ color: '#888', fontSize: '12px' }}>
                        Order: {service.order}
                      </p>
                    </div>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '13px', marginTop: '10px', lineHeight: 1.5 }}>
                    {service.description?.slice(0, 120)}…
                  </p>
                </div>
                <div className="manager-card-actions">
                  <button className="btn-edit" onClick={() => openEdit(service)}>
                    Edit
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => setDeleteTarget(service)}
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
          title="Delete Service?"
          message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
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
        {editing._id ? 'Edit Service' : 'New Service'}
      </h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={editing.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="e.g. React Web Development"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows={4}
          value={editing.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="What does this service do?"
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
          {saving ? 'Saving…' : editing._id ? 'Save Changes' : 'Create Service'}
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

export default ServicesManager;