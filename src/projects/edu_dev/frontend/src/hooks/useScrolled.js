// ── src/hooks/useScrolled.js ─────────────────────────

import { useState, useEffect } from 'react'

/**
 * Retorna true quando window.scrollY ultrapassa 10px.
 * Usado na Navbar para ativar backdrop-blur e border.
 *
 * @returns {boolean}
 */
export function useScrolled() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrolled
}
