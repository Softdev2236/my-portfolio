import { useState, useEffect } from 'react';
import { projectsApi } from './adminApi';
import ConfirmModal from './ConfirmModal';
import './AdminForms.css';
import './Managers.css';

// Empty template for a new project
const EMPTY_PROJECT = {
  title: '',
  description: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  technologies: [''],
  featured: false
};

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = list view, object = form view
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const res = await projectsApi.list();
    if (res.success) setProjects(res.data);
    setLoading(false);
  };

  // ---------- Open form for create/edit ----------
  const openNew = () => {
    setEditing({ ...EMPTY_PROJECT });
  };

  const openEdit = (project) => {
    setEditing({
      _id: project._id,
      title: project.title || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      technologies: project.technologies?.length ? project.technologies : [''],
      featured: !!project.featured
    });
  };

  const closeForm = () => setEditing(null);

  // ---------- Field updates ----------
  const handleChange = (field, value) => {
    setEditing((prev) => ({ ...prev, [field]: value }));
  };

  const updateTech = (index, value) => {
    const tech = [...editing.technologies];
    tech[index] = value;
    handleChange('technologies', tech);
  };

  const addTech = () => {
    handleChange('technologies', [...editing.technologies, '']);
  };

  const removeTech = (index) => {
    const tech = editing.technologies.filter((_, i) => i !== index);
    handleChange('technologies', tech.length ? tech : ['']);
  };

  // ---------- Save ----------
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const payload = {
      title: editing.title,
      description: editing.description,
      imageUrl: editing.imageUrl,
      liveUrl: editing.liveUrl,
      githubUrl: editing.githubUrl,
      technologies: editing.technologies.filter((t) => t.trim()),
      featured: editing.featured
    };

    const res = editing._id
      ? await projectsApi.update(editing._id, payload)
      : await projectsApi.create(payload);

    setSaving(false);

    if (res.success) {
      setMessage({ type: 'success', text: editing._id ? '✅ Updated!' : '✅ Created!' });
      await loadProjects();
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
    const res = await projectsApi.remove(deleteTarget._id);
    setDeleteTarget(null);
    if (res.success) await loadProjects();
  };

  // ---------- Render: List view ----------
  if (!editing) {
    return (
      <div className="manager">
        <div className="manager-header">
          <h2 className="admin-form-title">Projects</h2>
          <button className="btn-primary" onClick={openNew}>
            + Add New Project
          </button>
        </div>

        {loading ? (
          <p style={{ color: '#bbb' }}>Loading…</p>
        ) : projects.length === 0 ? (
          <p style={{ color: '#bbb' }}>No projects yet. Add one!</p>
        ) : (
          <div className="manager-grid">
            {projects.map((project) => (
              <div key={project._id} className="manager-card">
                {project.imageUrl && (
                  <div className="manager-card-img">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                )}
                <div className="manager-card-body">
                  <h3>{project.title}</h3>
                  <p>{project.description?.slice(0, 100)}…</p>
                  {project.featured && <span className="manager-badge">Featured</span>}
                </div>
                <div className="manager-card-actions">
                  <button className="btn-edit" onClick={() => openEdit(project)}>
                    Edit
                  </button>
                  <button
                    className="btn-remove"
                    onClick={() => setDeleteTarget(project)}
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
          title="Delete Project?"
          message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      </div>
    );
  }

  // ---------- Render: Form view ----------
  return (
    <div className="admin-form">
      <h2 className="admin-form-title">
        {editing._id ? 'Edit Project' : 'New Project'}
      </h2>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={editing.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          rows={3}
          value={editing.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Image URL</label>
        <input
          type="text"
          value={editing.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="/images/project.jpg or https://…"
        />
      </div>

      <div className="form-group">
        <label>Live URL</label>
        <input
          type="text"
          value={editing.liveUrl}
          onChange={(e) => handleChange('liveUrl', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>GitHub URL</label>
        <input
          type="text"
          value={editing.githubUrl}
          onChange={(e) => handleChange('githubUrl', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Technologies</label>
        {editing.technologies.map((tech, i) => (
          <div key={i} className="form-inline">
            <input
              type="text"
              value={tech}
              onChange={(e) => updateTech(i, e.target.value)}
              placeholder="e.g. React.js"
            />
            <button
              type="button"
              className="btn-remove"
              onClick={() => removeTech(i)}
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={addTech}>
          + Add Technology
        </button>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={editing.featured}
            onChange={(e) => handleChange('featured', e.target.checked)}
          />
          Featured Project
        </label>
      </div>

      <div className="form-actions">
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : editing._id ? 'Save Changes' : 'Create Project'}
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

export default ProjectsManager;