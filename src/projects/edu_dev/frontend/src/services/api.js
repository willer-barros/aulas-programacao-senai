// ── src/services/api.js ──────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

/**
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method
 * @param {string} path
 * @param {{ params?: Record<string,string>, body?: unknown, signal?: AbortSignal }} [options]
 * @returns {Promise<{ data: unknown }>}
 */
async function request(method, path, options = {}) {
  const { params, body, signal } = options

  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v))
    })
  }

  let timeoutController
  let finalSignal = signal

  if (!signal) {
    timeoutController = new AbortController()
    const id = setTimeout(() => timeoutController.abort(), 10_000)
    timeoutController._timeoutId = id
    finalSignal = timeoutController.signal
  }

  try {
    const token = localStorage.getItem('token')

    const res = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: finalSignal,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (res.status === 401) {
      window.location.href = '/login'
      return
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    return { data: await res.json() }
  } finally {
    if (timeoutController) clearTimeout(timeoutController._timeoutId)
  }
}

export const api = {
  /** @param {string} path @param {object} [options] */
  get:    (path, options) => request('GET', path, options),
  /** @param {string} path @param {unknown} body @param {object} [options] */
  post:   (path, body, options) => request('POST', path, { ...options, body }),
  /** @param {string} path @param {unknown} body @param {object} [options] */
  put:    (path, body, options) => request('PUT', path, { ...options, body }),
  /** @param {string} path @param {object} [options] */
  delete: (path, options) => request('DELETE', path, options),
}
