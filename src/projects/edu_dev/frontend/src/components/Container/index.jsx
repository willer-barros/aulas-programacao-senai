// ── src/components/Container/index.jsx ──────────────

import styles from './Container.module.css'

/**
 * Wrapper de largura máxima com padding responsivo.
 * @param {{ children: React.ReactNode, className?: string }} props
 */
export default function Container({ children, className = '' }) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  )
}
