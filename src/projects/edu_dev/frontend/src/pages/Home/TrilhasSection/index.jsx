// ── src/pages/Home/TrilhasSection/index.jsx ─────────

import { useState, useEffect } from 'react'
import { useApi }        from '../../../hooks/useApi'
import { useMutation }   from '../../../hooks/useMutation'
import { useReveal }     from '../../../hooks/useReveal'
import { getTrilhas, createTrilha, updateTrilha, deleteTrilha } from '../../../services/trilhas.service'
import { TrilhasSkeleton } from '../../../components/Skeleton'
import ErrorState        from '../../../components/ErrorState'
import Modal             from '../../../components/Modal'
import Button            from '../../../components/Button'
import Container         from '../../../components/Container'
import styles            from './TrilhasSection.module.css'

const DEFAULT_COR = '#6366F1'

// ── TrilhaForm ───────────────────────────────────────────
function TrilhaForm({ initialValues, onSubmit, onCancel, isSaving, serverError }) {
  const [titulo, setTitulo] = useState(initialValues?.titulo ?? '')
  const [cursos, setCursos] = useState(initialValues ? String(initialValues.cursos) : '')
  const [horas,  setHoras]  = useState(initialValues ? String(initialValues.horas)  : '')
  const [cor,    setCor]    = useState(initialValues?.cor ?? DEFAULT_COR)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!titulo.trim())                      e.titulo = 'Título obrigatório.'
    if (!cursos || Number(cursos) < 1)       e.cursos = 'Mínimo 1 curso.'
    if (!horas  || Number(horas)  < 1)       e.horas  = 'Mínimo 1 hora.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit({ titulo: titulo.trim(), cursos: Number(cursos), horas: Number(horas), cor })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="tf-titulo">Título da trilha</label>
        <input
          id="tf-titulo"
          type="text"
          value={titulo}
          onChange={e => { setTitulo(e.target.value); setErrors(p => ({ ...p, titulo: null })) }}
          className={`${styles.input} ${errors.titulo ? styles.inputError : ''}`}
          placeholder="Ex: Desenvolvedor Full Stack"
          autoFocus
        />
        {errors.titulo && <span className={styles.fieldError} role="alert">{errors.titulo}</span>}
      </div>

      <div className={styles.fieldRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="tf-cursos">Nº de cursos</label>
          <input
            id="tf-cursos"
            type="number"
            min="1"
            value={cursos}
            onChange={e => { setCursos(e.target.value); setErrors(p => ({ ...p, cursos: null })) }}
            className={`${styles.input} ${errors.cursos ? styles.inputError : ''}`}
            placeholder="5"
          />
          {errors.cursos && <span className={styles.fieldError} role="alert">{errors.cursos}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="tf-horas">Horas de conteúdo</label>
          <input
            id="tf-horas"
            type="number"
            min="1"
            value={horas}
            onChange={e => { setHoras(e.target.value); setErrors(p => ({ ...p, horas: null })) }}
            className={`${styles.input} ${errors.horas ? styles.inputError : ''}`}
            placeholder="120"
          />
          {errors.horas && <span className={styles.fieldError} role="alert">{errors.horas}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="tf-cor">Cor de destaque</label>
        <div className={styles.colorRow}>
          <input
            id="tf-cor"
            type="color"
            value={cor}
            onChange={e => setCor(e.target.value)}
            className={styles.colorInput}
          />
          <span className={styles.colorHex}>{cor.toUpperCase()}</span>
        </div>
      </div>

      {serverError && (
        <p className={styles.serverError} role="alert">{serverError}</p>
      )}

      <div className={styles.formActions}>
        <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" disabled={isSaving}>
          {isSaving ? 'Salvando…' : initialValues ? 'Salvar alterações' : 'Criar trilha'}
        </Button>
      </div>

    </form>
  )
}

// ── TrilhaItem ───────────────────────────────────────────
function TrilhaItem({ trilha, index, staggerDelay, onEdit, onDeleteClick, confirmingDelete }) {
  const [ref, isRevealed] = useReveal({ delay: staggerDelay })
  const num = String(index + 1).padStart(2, '0')

  return (
    <li
      ref={ref}
      className={`${styles.item} ${isRevealed ? styles.revealed : ''}`}
      style={{ '--trilha-cor': trilha.cor }}
    >
      <div className={styles.accentBar} aria-hidden />

      <span className={styles.numBg} aria-hidden>{num}</span>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span className={styles.numLabel} aria-hidden>{num}</span>
          <div className={styles.itemActions}>
            <button
              className={styles.editBtn}
              onClick={() => onEdit(trilha)}
              aria-label={`Editar trilha ${trilha.titulo}`}
            >
              Editar
            </button>
            <button
              className={`${styles.deleteBtn} ${confirmingDelete ? styles.deleteConfirm : ''}`}
              onClick={() => onDeleteClick(trilha.id)}
              aria-label={confirmingDelete ? 'Confirmar exclusão' : `Excluir trilha ${trilha.titulo}`}
            >
              {confirmingDelete ? 'Confirmar?' : 'Excluir'}
            </button>
          </div>
        </div>

        <h3 className={styles.title}>{trilha.titulo}</h3>

        <div className={styles.pills}>
          <span className={styles.pill}>
            <span className={styles.pillDot} aria-hidden />
            {trilha.cursos} curso{trilha.cursos !== 1 ? 's' : ''}
          </span>
          <span className={styles.pill}>
            <span className={styles.pillDot} aria-hidden />
            {trilha.horas}h de conteúdo
          </span>
        </div>
      </div>
    </li>
  )
}

// ── TrilhasSection ───────────────────────────────────────
export default function TrilhasSection() {
  const { data: serverData, loading, error, refetch } = useApi(getTrilhas)
  const [trilhas, setTrilhas]               = useState([])
  const [isModalOpen, setIsModalOpen]       = useState(false)
  const [editingTrilha, setEditingTrilha]   = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const { mutate: mutateCreate, loading: creating, error: createError, reset: resetCreate } = useMutation(createTrilha)
  const { mutate: mutateUpdate, loading: updating, error: updateError, reset: resetUpdate } = useMutation(updateTrilha)
  const { mutate: mutateDelete } = useMutation(deleteTrilha)

  // Inicializa estado local quando os dados do servidor chegam
  useEffect(() => {
    if (serverData) setTrilhas(serverData)
  }, [serverData])

  const handleOpenCreate = () => {
    setEditingTrilha(null)
    resetCreate()
    setIsModalOpen(true)
  }

  const handleOpenEdit = (trilha) => {
    setEditingTrilha(trilha)
    resetUpdate()
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTrilha(null)
  }

  const handleDeleteClick = (id) => {
    if (confirmDeleteId === id) {
      mutateDelete(id)
        .then(() => {
          setTrilhas(prev => prev.filter(t => t.id !== id))
          setConfirmDeleteId(null)
        })
        .catch(() => setConfirmDeleteId(null))
    } else {
      setConfirmDeleteId(id)
      setTimeout(() => setConfirmDeleteId(null), 3000)
    }
  }

  const handleSubmit = async (formData) => {
    try {
      if (editingTrilha) {
        const updated = await mutateUpdate(editingTrilha.id, formData)
        setTrilhas(prev => prev.map(t => t.id === editingTrilha.id ? updated : t))
      } else {
        const nova = await mutateCreate(formData)
        setTrilhas(prev => [...prev, nova])
      }
      handleCloseModal()
    } catch {
      // erro exibido via serverError no formulário
    }
  }

  const isSaving    = creating || updating
  const serverError = editingTrilha ? updateError : createError
  const modalTitle  = editingTrilha ? 'Editar trilha' : 'Nova trilha'

  return (
    <section className={styles.section} id="trilhas">
      <Container>

        <header className={styles.header}>
          <div>
            <span className={styles.label}>Trilhas de carreira</span>
            <h2 className={styles.heading}>Escolha seu<br />caminho.</h2>
          </div>
          <Button variant="outline" onClick={handleOpenCreate}>
            Nova trilha
          </Button>
        </header>

        {loading && <TrilhasSkeleton count={3} />}

        {error && (
          <ErrorState
            message="Não foi possível carregar as trilhas."
            onRetry={refetch}
          />
        )}

        {!loading && !error && trilhas.length === 0 && (
          <p className={styles.empty}>
            Nenhuma trilha cadastrada.{' '}
            <button className={styles.emptyLink} onClick={handleOpenCreate}>
              Criar a primeira
            </button>
          </p>
        )}

        {!loading && !error && trilhas.length > 0 && (
          <ul className={styles.list} role="list">
            {trilhas.map((trilha, i) => (
              <TrilhaItem
                key={trilha.id}
                trilha={trilha}
                index={i}
                staggerDelay={i * 80}
                onEdit={handleOpenEdit}
                onDeleteClick={handleDeleteClick}
                confirmingDelete={confirmDeleteId === trilha.id}
              />
            ))}
          </ul>
        )}

      </Container>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        <TrilhaForm
          initialValues={editingTrilha}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isSaving={isSaving}
          serverError={serverError}
        />
      </Modal>
    </section>
  )
}
