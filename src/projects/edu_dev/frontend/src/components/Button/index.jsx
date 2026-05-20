// ── src/components/Button/index.jsx ─────────────────

import styles from './Button.module.css'

/**
 * Botão reutilizável com animação de seta no hover.
 * @param {{
 *   children: React.ReactNode,
 *   variant?: 'primary' | 'ghost' | 'outline',
 *   onClick?: () => void,
 *   type?: 'button' | 'submit',
 *   disabled?: boolean,
 *   className?: string,
 * }} props
 */
export default function Button({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) {
  const variantClass = {
    primary: styles.primary,
    ghost:   styles.ghost,
    outline: styles.outline,
  }[variant]

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${variantClass} ${className}`}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden>→</span>
    </button>
  )
}
