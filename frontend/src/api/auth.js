import { request } from './client'
import { demoStore, withFallback } from './demoStore'

export async function login(credentials) {
  return withFallback(
    () => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    () => demoStore.login(credentials.email, credentials.password),
  )
}

export async function register(data) {
  return withFallback(
    () => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    () => demoStore.register(data),
  )
}

export async function logout() {
  return withFallback(
    () => request('/auth/logout', { method: 'POST' }),
    () => demoStore.logout(),
  )
}

export async function getMe() {
  return withFallback(
    () => request('/auth/me'),
    () => ({ success: true, data: demoStore.getUser() }),
  )
}
