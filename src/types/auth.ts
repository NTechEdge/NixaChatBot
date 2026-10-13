export interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
  plan: string
  createdAt?: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  token: string
  user: AuthUser
}

export interface MeResponse {
  success: boolean
  user: AuthUser
  error?: string
}
