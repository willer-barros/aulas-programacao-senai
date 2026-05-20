// ── src/pages/Home/CtaSection/index.jsx ─────────────

import { useReveal } from '../../../hooks/useReveal'
import Button        from '../../../components/Button'
import Container     from '../../../components/Container'
import styles        from './CtaSection.module.css'

export default function CtaSection() {
  const [ref, isRevealed] = useReveal({ delay: 60 })

  return (
    <section className={styles.section}>
      <Container>
        <div
          ref={ref}
          className={`${styles.band} ${isRevealed ? styles.revealed : ''}`}
        >
          <div className={styles.dotGrid} aria-hidden />

          <div className={styles.content}>
            <p className={styles.eyebrow}>Comece hoje</p>
            <h2 className={styles.heading}>
              Sua próxima oportunidade<br />começa com uma linha de código.
            </h2>
            <p className={styles.sub}>
              Crie sua conta gratuitamente e acesse os primeiros módulos agora mesmo.
              Sem cartão de crédito.
            </p>
            <Button variant="primary">Criar conta grátis</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
