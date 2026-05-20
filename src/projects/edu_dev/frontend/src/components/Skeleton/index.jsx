// ── src/components/Skeleton/index.jsx ───────────────

import styles from './Skeleton.module.css'

/**
 * Bloco de loading com animação shimmer.
 * @param {{ height?: string, width?: string, radius?: string }} props
 */
export default function Skeleton({ height = '20px', width = '100%', radius = '6px' }) {
  return (
    <span
      className={styles.skeleton}
      style={{ '--h': height, '--w': width, '--r': radius }}
      aria-hidden="true"
    />
  )
}

/**
 * Layout de skeleton para lista de cursos.
 * @param {{ count?: number }} props
 */
export function CursosSkeleton({ count = 5 }) {
  return (
    <div className={styles.cursosList}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.cursosItem}>
          <Skeleton height="14px" width="60px" />
          <Skeleton height="14px" width="200px" />
          <Skeleton height="14px" width="80px" />
          <Skeleton height="14px" width="60px" />
        </div>
      ))}
    </div>
  )
}

/**
 * Layout de skeleton para trilhas.
 * @param {{ count?: number }} props
 */
export function TrilhasSkeleton({ count = 3 }) {
  return (
    <div className={styles.trilhasList}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.trilhasItem}>
          <Skeleton height="48px" width="48px" radius="4px" />
          <div className={styles.trilhasItemText}>
            <Skeleton height="16px" width="220px" />
            <Skeleton height="12px" width="140px" />
          </div>
        </div>
      ))}
    </div>
  )
}
