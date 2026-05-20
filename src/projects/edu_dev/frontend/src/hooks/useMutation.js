// ── src/hooks/useMutation.js ─────────────────────────

import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Hook genérico para operações de mutação (POST, PUT, DELETE).
 * Não faz fetch automático — precisa chamar mutate() explicitamente.
 *
 * @template TArgs, TResult
 * @param {(...args: TArgs) => Promise<TResult>} mutationFn
 * @returns {{
 *   mutate: (...args: TArgs) => Promise<TResult>,
 *   loading: boolean,
 *   error: string | null,
 *   reset: () => void,
 * }}
 */
export function useMutation(mutationFn) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const fnRef = useRef(mutationFn)
  useEffect(() => { fnRef.current = mutationFn })

  const mutate = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fnRef.current(...args)
      setLoading(false)
      return result
    } catch (err) {
      const message = err.message ?? 'Erro ao processar requisição'
      setError(message)
      setLoading(false)
      throw err
    }
  }, [])

  const reset = useCallback(() => setError(null), [])

  return { mutate, loading, error, reset }
}
