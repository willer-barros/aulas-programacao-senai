// ── src/pages/Home/CursosSection/index.jsx ──────────

import { useApi }    from '../../../hooks/useApi'
import { useReveal } from '../../../hooks/useReveal'
import { getCursos } from '../../../services/cursos.service'
import { CursosSkeleton } from '../../../components/Skeleton'
import ErrorState    from '../../../components/ErrorState'
import Container     from '../../../components/Container'
import styles        from './CursosSection.module.css'

const NIVEL_MAP = {
  Iniciante:     { label: 'Iniciante',     className: 'nivelInit'  },
  Intermediário: { label: 'Intermediário', className: 'nivelInter' },
  Avançado:      { label: 'Avançado',      className: 'nivelAdv'   },
}

function CursoRow({ curso, staggerDelay }) {
  const [ref, isRevealed] = useReveal({ delay: staggerDelay })
  const nivel = NIVEL_MAP[curso.nivel] ?? { label: curso.nivel, className: '' }

  return (
    <li
      ref={ref}
      className={`${styles.row} ${isRevealed ? styles.revealed : ''}`}
      role="listitem"
    >
      <span className={styles.rowTag}>{curso.categoria}</span>

      <span className={styles.rowTitle}>{curso.titulo}</span>

      <span className={`${styles.rowNivel} ${styles[nivel.className]}`}>
        {nivel.label}
      </span>

      <span className={styles.rowMeta}>{curso.aulas} aulas</span>

      <span className={styles.rowMeta}>
        {curso.alunos.toLocaleString('pt-BR')} alunos
      </span>

      <span className={styles.rowArrow} aria-hidden>→</span>
    </li>
  )
}

export default function CursosSection() {
  const { data: cursos, loading, error, refetch } = useApi(getCursos)

  return (
    <section className={styles.section} id="cursos">
      <Container>

        <header className={styles.header}>
          <div>
            <span className={styles.label}>Catálogo</span>
            <h2 className={styles.heading}>Cursos em destaque</h2>
          </div>
          <p className={styles.sub}>
            Conteúdo atualizado por engenheiros<br />que trabalham no mercado.
          </p>
        </header>

        {loading && <CursosSkeleton count={6} />}

        {error && (
          <ErrorState
            message="Não foi possível carregar os cursos."
            onRetry={refetch}
          />
        )}

        {!loading && !error && cursos && cursos.length > 0 && (
          <>
            <div className={styles.tableHead} aria-hidden>
              <span>Categoria</span>
              <span>Curso</span>
              <span>Nível</span>
              <span>Aulas</span>
              <span>Alunos</span>
              <span />
            </div>
            <ul className={styles.list} role="list" aria-label="Lista de cursos">
              {cursos.map((curso, i) => (
                <CursoRow
                  key={curso.id}
                  curso={curso}
                  staggerDelay={i * 60}
                />
              ))}
            </ul>
          </>
        )}

        {!loading && !error && cursos?.length === 0 && (
          <p className={styles.empty}>Nenhum curso disponível no momento.</p>
        )}

      </Container>
    </section>
  )
}
