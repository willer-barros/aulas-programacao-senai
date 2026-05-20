// ── src/components/ErrorState/index.jsx ─────────────

import Button from '../Button'
import styles from './ErrorState.module.css'

/**
 * Estado de erro com mensagem contextual e botão de retry.
 * @param {{ message?: string, onRetry?: () => void }} props
 */
export default function ErrorState({
  message = 'Não foi possível carregar os dados.',
  onRetry,
}) {
  return (
    <div className={styles.wrapper} role="alert">
      <span className={styles.icon} aria-hidden>⚠</span>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  )
}
