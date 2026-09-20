import API_BASE_URL from '../../config/api';
import { getToken } from '../../lib/auth';

// --------------------------------------------------
// Base fetch helper — adds the auth token automatically
// --------------------------------------------------
async function adminFetch(path, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/api/${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  return data;
}

// --------------------------------------------------
// Generic CRUD factory for any collection
// --------------------------------------------------
export function createAdminApi(resource) {
  return {
    // GET all
    list: () => adminFetch(resource),

    // GET one by ID
    get: (id) => adminFetch(`${resource}/${id}`),

    // CREATE new
    create: (payload) =>
      adminFetch(resource, {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    // UPDATE by ID
    update: (id, payload) =>
      adminFetch(`${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      }),

    // DELETE by ID
    remove: (id) =>
      adminFetch(`${resource}/${id}`, {
        method: 'DELETE'
      })
  };
}

// --------------------------------------------------
// Hero is special — no ID, single document
// --------------------------------------------------
export const heroApi = {
  get: () => adminFetch('hero'),
  update: (payload) =>
    adminFetch('hero', {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
};

// --------------------------------------------------
// Admin APIs for each section
// --------------------------------------------------
export const projectsApi = createAdminApi('projects');
export const skillsApi = createAdminApi('skills');
export const experienceApi = createAdminApi('experience');
export const servicesApi = createAdminApi('services');