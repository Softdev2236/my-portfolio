import { useState, useEffect } from 'react';
import { heroApi } from './adminApi';
import './AdminForms.css';

// Fields shown in the form
const EMPTY_HERO = {
  greeting: "Hello, I'm",
  name: '',
  bio: '',
  profileImageUrl: '',
  cvUrl: '',
  hireMeLink: '#contact',
  roles: [''],
  socials: []
};

function HeroEditor() {
  const [hero, setHero] = useState(EMPTY_HERO);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  // Load existing hero on mount
  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    setLoading(true);
    const res = await heroApi.get();
    if (res.success && res.data) {
      setHero({
        ...EMPTY_HERO,
        ...res.data,
        roles: res.data.roles?.length ? res.data.roles : [''],
        socials: res.data.socials || []
      });
    }
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setHero((prev) => ({ ...prev, [field]: value }));
  };

  // ---------- Roles ----------
  const updateRole = (index, value) => {
    const roles = [...hero.roles];
    roles[index] = value;
    handleChange('roles', roles);
  };

  const addRole = () => {
    handleChange('roles', [...hero.roles, '']);
  };

  const removeRole = (index) => {
    const roles = hero.roles.filter((_, i) => i !== index);
    handleChange('roles', roles.length ? roles : ['']);
  };

  // ---------- Socials ----------
  const updateSocial = (index, field, value) => {
    const socials = [...hero.socials];
    socials[index] = { ...socials[index], [field]: value };
    handleChange('socials', socials);
  };

  const addSocial = () => {
    handleChange('socials', [
      ...hero.socials,
      { platform: 'github', url: '' }
    ]);
  };

  const removeSocial = (index) => {
    handleChange(
      'socials',
      hero.socials.filter((_, i) => i !== index)
    );
  };

  // ---------- Save ----------
 const handleSave = async () => {
  setSaving(true);
  setMessage(null);

  // Build a clean payload — only the fields we want to save
  const payload = {
    greeting: hero.greeting,
    name: hero.name,
    bio: hero.bio,
    profileImageUrl: hero.profileImageUrl,
    cvUrl: hero.cvUrl,
    hireMeLink: hero.hireMeLink,
    roles: hero.roles.filter((r) => r.trim()),
    socials: hero.socials.filter((s) => s.url.trim())
  };

  const res = await heroApi.update(payload);
  setSaving(false);

  if (res.success) {
    setMessage({ type: 'success', text: '✅ Hero updated!' });
    // Reload to get fresh data (including any MongoDB-generated fields)
    loadHero();
  } else {
    setMessage({ type: 'error', text: '❌ ' + res.error });
  }

  setTimeout(() => setMessage(null), 3000);
};

  if (loading) {
    return <p style={{ color: '#bbb' }}>Loading hero…</p>;
  }

  return (
    <div className="admin-form">
      <h2 className="admin-form-title">Edit Hero</h2>

      {/* Greeting */}
      <div className="form-group">
        <label>Greeting</label>
        <input
          type="text"
          value={hero.greeting}
          onChange={(e) => handleChange('greeting', e.target.value)}
        />
      </div>

      {/* Name */}
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={hero.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      {/* Bio */}
      <div className="form-group">
        <label>Bio</label>
        <textarea
          rows={3}
          value={hero.bio}
          onChange={(e) => handleChange('bio', e.target.value)}
        />
      </div>

      {/* Profile Image URL */}
      <div className="form-group">
        <label>Profile Image URL</label>
        <input
          type="text"
          value={hero.profileImageUrl}
          onChange={(e) => handleChange('profileImageUrl', e.target.value)}
        />
      </div>

      {/* CV URL */}
      <div className="form-group">
        <label>CV URL</label>
        <input
          type="text"
          value={hero.cvUrl}
          onChange={(e) => handleChange('cvUrl', e.target.value)}
        />
      </div>

      {/* Hire Me Link */}
      <div className="form-group">
        <label>Hire Me Link</label>
        <input
          type="text"
          value={hero.hireMeLink}
          onChange={(e) => handleChange('hireMeLink', e.target.value)}
        />
      </div>

      {/* Roles */}
      <div className="form-group">
        <label>Scrolling Roles</label>
        {hero.roles.map((role, i) => (
          <div key={i} className="form-inline">
            <input
              type="text"
              value={role}
              onChange={(e) => updateRole(i, e.target.value)}
              placeholder="e.g. Front-End Developer"
            />
            <button
              type="button"
              className="btn-remove"
              onClick={() => removeRole(i)}
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={addRole}>
          + Add Role
        </button>
      </div>

      {/* Socials */}
      <div className="form-group">
        <label>Social Links</label>
        {hero.socials.map((social, i) => (
          <div key={i} className="form-inline">
            <select
              value={social.platform}
              onChange={(e) => updateSocial(i, 'platform', e.target.value)}
            >
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter/X</option>
              <option value="youtube">YouTube</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="globe">Website</option>
            </select>
            <input
              type="text"
              value={social.url}
              onChange={(e) => updateSocial(i, 'url', e.target.value)}
              placeholder="https://…"
            />
            <button
              type="button"
              className="btn-remove"
              onClick={() => removeSocial(i)}
            >
              ✕
            </button>
          </div>
        ))}
        <button type="button" className="btn-add" onClick={addSocial}>
          + Add Social
        </button>
      </div>

      {/* Save button */}
      <div className="form-actions">
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save Changes'}
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

export default HeroEditor;