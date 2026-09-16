import API_BASE_URL from '../config/api';

const TOKEN_KEY = 'admin_token';

// --------------------------------------------------
// Save the token to localStorage
// --------------------------------------------------
export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// --------------------------------------------------
// Read the token from localStorage
// --------------------------------------------------
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// --------------------------------------------------
// Remove the token (logout)
// --------------------------------------------------
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// --------------------------------------------------
// Check if we're logged in (has a token)
// --------------------------------------------------
export function isLoggedIn() {
  return !!getToken();
}

// --------------------------------------------------
// Send a login request to the server
// Returns { success, token?, error? }
// --------------------------------------------------
export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success && data.token) {
      saveToken(data.token);
      return { success: true, token: data.token };
    }

    return { success: false, error: data.error || 'Login failed' };

  } catch (err) {
    return { success: false, error: 'Could not reach server' };
  }
}

// --------------------------------------------------
// Verify the current token is still valid
// --------------------------------------------------
export async function verifyToken() {
  const token = getToken();
  if (!token) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth?action=verify`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    return data.success === true;

  } catch (err) {
    return false;
  }
}