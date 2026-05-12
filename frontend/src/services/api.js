const BASE = '/api/v1';

function authHeaders() {
  const token = localStorage.getItem('taskunpc-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
  return data;
}

export const api = {
  login: (email, password) =>
    req('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password) =>
    req('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),

  getTareas: () => req('/tasks'),
  crearTarea: (body) => req('/tasks', { method: 'POST', body: JSON.stringify(body) }),
  actualizarTarea: (id, body) =>
    req(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  eliminarTarea: (id) => req(`/tasks/${id}`, { method: 'DELETE' }),
};
