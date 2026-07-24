import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)
const SESSION_KEY = 'pulseguard_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      authApi
        .getMe()
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem(SESSION_KEY))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (credentials) => {
    const res = await authApi.login(credentials)
    // Merge role from credentials into user data so dashboards route correctly
    const userData = { ...res.data, role: credentials.role || res.data?.role || 'patient' }
    setUser(userData)
    localStorage.setItem(SESSION_KEY, '1')
    return { ...res, data: userData }
  }, [])

  const register = useCallback(async (data) => {
    const res = await authApi.register(data)
    const userData = { ...res.data, role: data.role || 'patient' }
    setUser(userData)
    localStorage.setItem(SESSION_KEY, '1')
    return { ...res, data: userData }
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout()
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthenticated: !!user }),
    [user, loading, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
