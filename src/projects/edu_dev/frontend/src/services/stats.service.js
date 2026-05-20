// ── src/services/stats.service.js ────────────────────

import { api } from './api.js'

/**
 * @typedef {{ alunos: number, cursos: number, instrutores: number, certificados: number }} Stats
 */

/**
 * Busca estatísticas da plataforma.
 * @param {AbortSignal} [signal]
 * @returns {Promise<Stats>}
 */
export const getStats = (signal) =>
  api.get('/api/stats', { signal }).then(r => r.data)
