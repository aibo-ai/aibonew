/**
 * Admin API helper — always sends/receives the httpOnly auth cookie
 * via `credentials: 'include'`. The auth token never touches JS,
 * which removes XSS exfiltration risk.
 */
import { BACKEND_URL } from '@/lib/constants';

const ADMIN_BASE = `${window.location.origin}/api/cms/auth`;

/**
 * Credentialed fetch against /api/admin/*. Returns the raw Response so
 * callers can branch on status (e.g., 401 → redirect, 204 → no body).
 */
export async function adminFetch(path, { method = 'GET', body, headers = {} } = {}) {
  const token = sessionStorage.getItem('admin_token');
  const init = {
    method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...headers,
    },
  };
  };
  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  return fetch(`${ADMIN_BASE}${path}`, init);
}

/** Convenience wrappers. They throw on non-2xx; callers can catch. */
export async function adminGet(path) {
  const r = await adminFetch(path);
  if (r.status === 401) throw new AdminAuthError();
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).detail || `GET ${path} failed`);
  return r.json();
}

export async function adminMutate(path, method, body) {
  const r = await adminFetch(path, { method, body });
  if (r.status === 401) throw new AdminAuthError();
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).detail || `${method} ${path} failed`);
  if (r.status === 204) return null;
  return r.json();
}

export class AdminAuthError extends Error {
  constructor() {
    super('Not authenticated');
    this.name = 'AdminAuthError';
  }
}
