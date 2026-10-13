import type { AuthResponse, AuthUser, MeResponse } from '../types/auth'

const rawBase = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').trim().replace(/\/+$/, '')
const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`

const TOKEN_KEY = 'nixa_token'
const USER_KEY = 'nixa_user'

// ---------------------------------------------------------------------------
// Token / session persistence (per-browser localStorage)
// ---------------------------------------------------------------------------

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function storeSession(token: string, user: AuthUser): void {
  try {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    // Storage unavailable (private mode) — session lives in memory only
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    // ignore
  }
}

/**
 * Fetch wrapper that attaches the JWT and clears the session on 401
 * (forces the app back to the login screen via reload)
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getStoredToken()
  const headers = new Headers(options.headers || {})
  headers.set('Content-Type', 'application/json')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401 && !url.includes('/auth/login') && !url.includes('/auth/register')) {
    // Token expired/invalid — drop local session and restart cleanly
    clearSession()
    window.location.reload()
    throw new Error('Session expired. Please log in again.')
  }

  return res
}

// ---------------------------------------------------------------------------
// Auth CRUD API
// ---------------------------------------------------------------------------

export const authApi = {
  /** CREATE — register a new account (returns token + user) */
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = (await res.json()) as AuthResponse & { error?: string }
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Registration failed (${res.status})`)
    }
    return data
  },

  /** READ — login with credentials (returns token + user) */
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = (await res.json()) as AuthResponse & { error?: string }
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Login failed (${res.status})`)
    }
    return data
  },

  /** READ — fetch the current authenticated user */
  async getMe(): Promise<MeResponse> {
    const res = await authFetch(`${API_BASE_URL}/auth/me`)
    const data = (await res.json()) as MeResponse
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Failed to fetch profile (${res.status})`)
    }
    return data
  },

  /** UPDATE — update profile fields (returns fresh token + user) */
  async updateProfile(payload: { name?: string; avatar?: string }): Promise<AuthResponse> {
    const res = await authFetch(`${API_BASE_URL}/auth/me`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    const data = (await res.json()) as AuthResponse & { error?: string }
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Profile update failed (${res.status})`)
    }
    return data
  },

  /** UPDATE — change password (returns fresh token + user) */
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    const res = await authFetch(`${API_BASE_URL}/auth/password`, {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    const data = (await res.json()) as AuthResponse & { error?: string }
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Password change failed (${res.status})`)
    }
    return data
  },

  /** DELETE — permanently remove the account and all its chats */
  async deleteAccount(password: string): Promise<{ success: boolean; message?: string }> {
    const res = await authFetch(`${API_BASE_URL}/auth/me`, {
      method: 'DELETE',
      body: JSON.stringify({ password }),
    })
    const data = (await res.json()) as { success: boolean; message?: string; error?: string }
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Account deletion failed (${res.status})`)
    }
    return data
  },

  /** Logout — server is stateless; primarily clears the local session */
  async logout(): Promise<void> {
    try {
      await authFetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' })
    } catch {
      // Local session is cleared regardless
    } finally {
      clearSession()
    }
  },
}
