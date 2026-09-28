const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const candidates = [payload.results, payload.items, payload.records, payload.data]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate
    if (candidate && typeof candidate === 'object') {
      for (const nested of [candidate.results, candidate.items, candidate.records]) {
        if (Array.isArray(nested)) return nested
      }
    }
  }

  return []
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })

  if (!response.ok) {
    throw new Error(`Could not load collection (${response.status})`)
  }

  return normalizeCollection(await response.json())
}