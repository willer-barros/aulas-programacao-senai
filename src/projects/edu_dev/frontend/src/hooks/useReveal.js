// ── src/hooks/useReveal.js ───────────────────────────

import { useState, useEffect, useRef } from 'react'

/**
 * Usa IntersectionObserver para detectar quando o elemento
 * entra na viewport e retorna estado de visibilidade.
 * Suporta delay para efeito de stagger entre filhos.
 *
 * @param {{ delay?: number }} [options]
 * @returns {[React.RefObject, boolean]}
 */
export function useReveal({ delay = 0 } = {}) {
  const [isRevealed, setIsRevealed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsRevealed(true), delay)
          observer.disconnect()
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return [ref, isRevealed]
}
