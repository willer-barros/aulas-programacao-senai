// ── src/pages/Home/StatsSection/index.jsx ───────────

import { useState, useEffect, useRef } from 'react'
import { useApi } from '../../../hooks/useApi'
import { getStats } from '../../../services/stats.service'
import Container from '../../../components/Container'
import styles from './StatsSection.module.css'

const STATS_META = [
  { key: 'alunos',        label: 'Alunos ativos'          },
  { key: 'cursos',        label: 'Cursos disponíveis'      },
  { key: 'certificados',  label: 'Certificados emitidos'   },
  { key: 'instrutores',   label: 'Instrutores especializados' },
]

function CountUp({ target }) {
  const [value, setValue] = useState(0)
  const ref     = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const duration = 1600

        const tick = (now) => {
          const p    = Math.min((now - t0) / duration, 1)
          const ease = 1 - (1 - p) ** 4
          setValue(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: 0.2 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className={styles.statNum} aria-label={target.toLocaleString('pt-BR')}>
      {value.toLocaleString('pt-BR')}
    </span>
  )
}

export default function StatsSection() {
  const { data, loading } = useApi(getStats)

  if (loading || !data) return null

  return (
    <section className={styles.section} aria-label="Números da plataforma">
      <Container>
        <dl className={styles.list}>
          {STATS_META.map(({ key, label }, i) => (
            <div key={key} className={styles.item}>
              <dt className={styles.label}>{label}</dt>
              <dd>
                <CountUp target={data[key]} />
              </dd>
              {i < STATS_META.length - 1 && (
                <span className={styles.divider} aria-hidden />
              )}
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
