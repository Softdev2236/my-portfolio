import { useState, useEffect, useRef } from 'react';
import { login } from '../../lib/auth';
import './PasswordModal.css';

function PasswordModal({ isOpen, onClose, onSuccess }) {
  const USERNAME = 'aliraxa';
const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // Focus the input when the modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(USERNAME, password);

    setLoading(false);

    if (result.success) {
      onSuccess();  // Tell parent login succeeded
      onClose();    // Close the modal
    } else {
      setError(result.error || 'Invalid credentials');
      setPassword('');
    }
  };

  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="pm-title">Unlock</h2>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            className="pm-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />

          {error && <p className="pm-error">{error}</p>}

          <div className="pm-buttons">
            <button
              type="button"
              className="pm-btn pm-btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="pm-btn pm-btn-unlock"
              disabled={loading || !password}
            >
              {loading ? 'Verifying…' : 'Unlock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;