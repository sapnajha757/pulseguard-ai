import { request } from './client'
import { demoStore, withFallback } from './demoStore'

export async function getMedicines() {
  return withFallback(
    () => request('/medicines'),
    () => demoStore.getMedicines(),
  )
}

export async function createMedicine(data) {
  return withFallback(
    () => request('/medicines', { method: 'POST', body: JSON.stringify(data) }),
    () => demoStore.createMedicine(data),
  )
}

export async function deleteMedicine(id) {
  return withFallback(
    () => request(`/medicines/${id}`, { method: 'DELETE' }),
    () => demoStore.deleteMedicine(id),
  )
}

export async function logAdherence(id, status) {
  return withFallback(
    () => request(`/medicines/${id}/log`, { method: 'POST', body: JSON.stringify({ status }) }),
    () => demoStore.logAdherence(id, status),
  )
}
