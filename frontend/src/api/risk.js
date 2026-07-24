import { request } from './client'
import { demoStore, withFallback } from './demoStore'

export async function getLatestRisk() {
  return withFallback(
    () => request('/risk/latest'),
    () => demoStore.getLatestRisk(),
  )
}

export async function getRiskHistory() {
  return withFallback(
    () => request('/risk/history'),
    () => demoStore.getRiskHistory(),
  )
}

export async function predictRisk(data) {
  return withFallback(
    () => request('/risk/predict', { method: 'POST', body: JSON.stringify(data) }),
    () => demoStore.predictRisk(data),
  )
}
