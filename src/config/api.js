// API configuration for local development vs production
let API_BASE_URL;

// Check if we're in development (localhost) or production
if (typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
  // Local development - use Express backend
  API_BASE_URL = 'http://localhost:5000';
} else {
  // Production (Vercel) - use relative path
  API_BASE_URL = '';
}

export default API_BASE_URL;