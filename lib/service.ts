// auth/service.ts
import { api, setAccessToken } from './api';
import { saveRefreshToken, deleteRefreshToken } from './storage';

export async function signIn(username: string, password: string) {
  const r = await api.post('/auth/token/', { username, password });
  // Expect server returns short-lived access + long-lived refresh
  setAccessToken(r.data.access);
  await saveRefreshToken(r.data.refresh);
}

export async function signOut() {
  try { await api.post('/auth/logout'); } catch {}
  setAccessToken(null);
  await deleteRefreshToken();
}
