import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store'
import { loginUser, registerUser, clearAuthError } from '../../store/slices/authSlice'
import { Button, FormField, PasswordField, ErrorAlert } from '../ui'
import { AuthShell } from './AuthShell'
import { AuthTabs, type AuthMode } from './AuthTabs'

const SUBTITLES: Record<AuthMode, string> = {
  login: 'Welcome back. Sign in to continue.',
  register: 'Create your account to get started.',
}

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.auth.status)
  const error = useAppSelector((state) => state.auth.error)

  const [mode, setMode] = useState<AuthMode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLoading = status === 'loading'

  const handleModeChange = (next: AuthMode) => {
    setMode(next)
    dispatch(clearAuthError())
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    if (mode === 'login') {
      dispatch(loginUser({ email: email.trim(), password }))
    } else {
      dispatch(registerUser({ name: name.trim(), email: email.trim(), password }))
    }
  }

  return (
    <AuthShell subtitle={SUBTITLES[mode]}>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white dark:bg-[#141517] border border-black/5 dark:border-white/5 shadow-sm p-6 flex flex-col gap-4"
      >
        <AuthTabs mode={mode} onChange={handleModeChange} disabled={isLoading} />

        {mode === 'register' && (
          <FormField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={50}
            disabled={isLoading}
          />
        )}

        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={mode === 'register' ? 'At least 8 characters' : 'Your password'}
          autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
          required
          minLength={mode === 'register' ? 8 : undefined}
          disabled={isLoading}
        />

        {error && <ErrorAlert>{error}</ErrorAlert>}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isLoading}
          leftIcon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : undefined}
          className="mt-1 dark:bg-amber-500 dark:text-zinc-950 dark:hover:bg-amber-400"
        >
          {isLoading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </Button>
      </form>

      <p className="mt-5 text-center text-xs text-zinc-400 dark:text-zinc-500 select-none">
        Nixa - an AI assistant by NTechEdge
      </p>
    </AuthShell>
  )
}
