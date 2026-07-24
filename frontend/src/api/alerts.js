import { request } from './client'
import { demoStore, withFallback } from './demoStore'

export async function getAlerts() {
  return withFallback(
    () => request('/alerts'),
    () => demoStore.getAlerts(),
  )
}

export async function createAlert(data) {
  return withFallback(
    () => request('/alerts', { method: 'POST', body: JSON.stringify(data) }),
    () => demoStore.createAlert(data),
  )
}

export async function acknowledgeAlert(id) {
  return withFallback(
    () => request(`/alerts/${id}/acknowledge`, { method: 'PATCH' }),
    () => demoStore.acknowledgeAlert(id),
  )
}

export async function resolveAlert(id) {
  return withFallback(
    () => request(`/alerts/${id}/resolve`, { method: 'PATCH' }),
    () => demoStore.resolveAlert(id),
  )
}
