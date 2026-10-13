import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '../../types/auth'
import {
  authApi,
  getStoredToken,
  getStoredUser,
  storeSession,
  clearSession,
} from '../../services/authApi'

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated'

interface AuthState {
  status: AuthStatus
  user: AuthUser | null
  error: string | null
  // Separate busy flags so the UI can show per-action spinners
  isUpdating: boolean
  isDeleting: boolean
}

const storedToken = getStoredToken()
const storedUser = getStoredUser()

const initialState: AuthState = {
  status: storedToken && storedUser ? 'authenticated' : 'idle',
  user: storedUser || null,
  error: null,
  isUpdating: false,
  isDeleting: false,
}

// Restore a persisted session on app start (token + cached user, verified via /me)
export const initAuth = createAsyncThunk('auth/init', async (_, { rejectWithValue }) => {
  const token = getStoredToken()
  if (!token) return rejectWithValue('No stored session')
  try {
    const data = await authApi.getMe()
    storeSession(token, data.user)
    return data.user
  } catch (err) {
    clearSession()
    return rejectWithValue((err as Error).message)
  }
})

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { name, email, password }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authApi.register(name, email, password)
      storeSession(data.token, data.user)
      return data.user
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.login(email, password)
      storeSession(data.token, data.user)
      return data.user
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload: { name?: string; avatar?: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.updateProfile(payload)
      storeSession(data.token, data.user)
      return data.user
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await authApi.changePassword(currentPassword, newPassword)
      storeSession(data.token, data.user)
      return data.user
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

export const deleteAccount = createAsyncThunk(
  'auth/deleteAccount',
  async (password: string, { rejectWithValue }) => {
    try {
      await authApi.deleteAccount(password)
      clearSession()
      return true
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  }
)

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authApi.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Session restore
      .addCase(initAuth.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.status = 'authenticated'
        state.user = action.payload
      })
      .addCase(initAuth.rejected, (state) => {
        state.status = 'unauthenticated'
        state.user = null
      })

      // Register / Login
      for (const thunk of [registerUser, loginUser] as const) {
        builder
          .addCase(thunk.pending, (state) => {
            state.status = 'loading'
            state.error = null
          })
          .addCase(thunk.fulfilled, (state, action: PayloadAction<AuthUser>) => {
            state.status = 'authenticated'
            state.user = action.payload
            state.error = null
          })
          .addCase(thunk.rejected, (state, action) => {
            state.status = 'unauthenticated'
            state.error = (action.payload as string) || 'Authentication failed.'
          })
      }

      // Profile update
      builder
        .addCase(updateProfile.pending, (state) => {
          state.isUpdating = true
          state.error = null
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.isUpdating = false
          state.user = action.payload
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.isUpdating = false
          state.error = (action.payload as string) || 'Profile update failed.'
        })

      // Password change
      builder
        .addCase(changePassword.pending, (state) => {
          state.isUpdating = true
          state.error = null
        })
        .addCase(changePassword.fulfilled, (state) => {
          state.isUpdating = false
        })
        .addCase(changePassword.rejected, (state, action) => {
          state.isUpdating = false
          state.error = (action.payload as string) || 'Password change failed.'
        })

      // Account deletion
      builder
        .addCase(deleteAccount.pending, (state) => {
          state.isDeleting = true
          state.error = null
        })
        .addCase(deleteAccount.fulfilled, (state) => {
          state.isDeleting = false
          state.status = 'unauthenticated'
          state.user = null
        })
        .addCase(deleteAccount.rejected, (state, action) => {
          state.isDeleting = false
          state.error = (action.payload as string) || 'Account deletion failed.'
        })

      // Logout
      builder.addCase(logoutUser.fulfilled, (state) => {
        state.status = 'unauthenticated'
        state.user = null
        state.error = null
      })
  },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer
