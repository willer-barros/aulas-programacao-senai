// ── src/services/trilhas.service.js ──────────────────

import { api } from './api.js'

/**
 * @typedef {{ id: number, titulo: string, cursos: number, horas: number, cor: string }} Trilha
 * @typedef {{ titulo: string, cursos: number, horas: number, cor: string }} TrilhaPayload
 */

/**
 * Busca trilhas de aprendizado.
 * @param {AbortSignal} [signal]
 * @returns {Promise<Trilha[]>}
 */
export const getTrilhas = (signal) =>
  api.get('/api/trilhas', { signal }).then(r => r.data)

/**
 * Cria uma nova trilha.
 * @param {TrilhaPayload} payload
 * @param {AbortSignal} [signal]
 * @returns {Promise<Trilha>}
 */
export const createTrilha = (payload, signal) =>
  api.post('/api/trilhas', payload, { signal }).then(r => r.data)

/**
 * Atualiza uma trilha existente.
 * @param {number} id
 * @param {TrilhaPayload} payload
 * @param {AbortSignal} [signal]
 * @returns {Promise<Trilha>}
 */
export const updateTrilha = (id, payload, signal) =>
  api.put(`/api/trilhas/${id}`, payload, { signal }).then(r => r.data)

/**
 * Remove uma trilha pelo ID.
 * @param {number} id
 * @param {AbortSignal} [signal]
 * @returns {Promise<void>}
 */
export const deleteTrilha = (id, signal) =>
  api.delete(`/api/trilhas/${id}`, { signal }).then(() => null)
