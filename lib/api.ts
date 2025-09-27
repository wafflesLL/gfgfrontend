// auth/api.ts
import axios from 'axios';
import { loadRefreshToken, saveRefreshToken, deleteRefreshToken } from '../lib/storage';

let accessToken: string | null = null; // keep in memory only

export const getAccessToken = () => accessToken;
export function setAccessToken(token: string | null) {
  accessToken = token;
}

export const api = axios.create({
  baseURL: 'https://api.example.com', // your API
  timeout: 15000,
});

// Attach access token on every request
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle 401 -> try refresh once, then logout
let refreshingPromise: Promise<void> | null = null;

async function refreshAccessTokenOnce() {
  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      const rt = await loadRefreshToken();
      if (!rt) throw new Error('No refresh token');

      const resp = await axios.post('https://api.example.com/auth/refresh', { refresh_token: rt });
      // Expect { access_token, refresh_token } with rotation
      setAccessToken(resp.data.access_token);
      if (resp.data.refresh_token) {
        await saveRefreshToken(resp.data.refresh_token);
      }
    })().finally(() => {
      refreshingPromise = null;
    });
  }
  return refreshingPromise;
}

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await refreshAccessTokenOnce();
        return api(original); // retry with new token
      } catch {
        // hard logout
        setAccessToken(null);
        await deleteRefreshToken();
      }
    }
    return Promise.reject(error);
  }
);
