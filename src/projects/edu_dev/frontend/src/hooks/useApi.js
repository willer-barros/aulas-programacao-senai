// ── src/hooks/useApi.js ──────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Hook genérico para consumir serviços assíncronos.
 * Cancela a requisição pendente no unmount via AbortController.
 *
 * @template T
 * @param {(signal: AbortSignal) => Promise<T>} serviceFn - Função de serviço que aceita um AbortSignal
 * @returns {{ data: T|null, loading: boolean, error: string|null, refetch: () => void }}
 */
export function useApi(serviceFn) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const fnRef = useRef(serviceFn)
  useEffect(() => { fnRef.current = serviceFn })

  const execute = useCallback(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fnRef.current(controller.signal)
      .then(result => {
        setData(result)
        setLoading(false)
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message ?? 'Erro ao carregar dados')
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  useEffect(() => execute(), [execute])

  return { data, loading, error, refetch: execute }
}
