// ── src/components/Modal/index.jsx ──────────────────

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

/**
 * Modal acessível renderizado via portal em document.body.
 * Fecha ao clicar no overlay ou pressionar Escape.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title: string,
 *   children: React.ReactNode,
 * }} props
 */
export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </header>
        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
