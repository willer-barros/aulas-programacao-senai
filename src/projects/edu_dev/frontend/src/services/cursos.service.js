// ── src/services/cursos.service.js ───────────────────

import { api } from './api.js'

/**
 * @typedef {{ id: number, titulo: string, nivel: string, aulas: number, alunos: number, categoria: string }} Curso
 */

/**
 * Busca lista de cursos disponíveis.
 * @param {AbortSignal} [signal]
 * @returns {Promise<Curso[]>}
 */
export const getCursos = (signal) =>
  api.get('/api/cursos', { signal }).then(r => r.data)
