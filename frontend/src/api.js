
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = localStorage.getItem('tm_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const resp = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(data.error || 'API error');
  }
  return data;
}

export async function register(username, password) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify({ username, password }) });
}
export async function login(username, password) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
}
export async function getProfile() { return request('/auth/me', { method: 'GET' }); }
export async function getTasks() { return request('/tasks', { method: 'GET' }); }
export async function createTask(task) { return request('/tasks', { method: 'POST', body: JSON.stringify(task) }); }
export async function updateTask(id, updates) { return request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(updates) }); }
export async function deleteTask(id) { return request(`/tasks/${id}`, { method: 'DELETE' }); }
export async function saveSettings(settings) { return request('/users/me/settings', { method: 'POST', body: JSON.stringify(settings) }); }
export async function getSettings() { return request('/users/me/settings', { method: 'GET' }); }
export async function adminGetUsers(adminKey) {
  const headers = { 'x-admin-key': adminKey };
  const resp = await fetch(`${API_BASE}/admin/users`, { headers });
  return resp.json();
}
