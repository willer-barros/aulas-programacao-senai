const express = require('express')
const cors    = require('cors')

const app  = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// ── Data (in-memory) ─────────────────────────────────────
const cursos = [
  { id: 1, titulo: 'JavaScript do Zero ao Avançado', nivel: 'Iniciante',     aulas: 42, alunos: 1240, categoria: 'Web'     },
  { id: 2, titulo: 'React & Hooks na Prática',       nivel: 'Intermediário', aulas: 38, alunos:  876, categoria: 'Frontend' },
  { id: 3, titulo: 'Node.js & APIs REST',            nivel: 'Intermediário', aulas: 31, alunos:  654, categoria: 'Backend'  },
  { id: 4, titulo: 'Python para Data Science',       nivel: 'Intermediário', aulas: 45, alunos:  932, categoria: 'Data'     },
  { id: 5, titulo: 'DevOps & Docker na Prática',     nivel: 'Avançado',      aulas: 28, alunos:  421, categoria: 'DevOps'   },
  { id: 6, titulo: 'UI/UX Design com Figma',         nivel: 'Iniciante',     aulas: 22, alunos: 1087, categoria: 'Design'   },
]

let trilhas = [
  { id: 1, titulo: 'Desenvolvedor Full Stack', cursos: 5, horas: 120, cor: '#6366F1' },
  { id: 2, titulo: 'Cientista de Dados',       cursos: 4, horas:  90, cor: '#10b981' },
  { id: 3, titulo: 'Engenheiro DevOps',        cursos: 3, horas:  70, cor: '#f59e0b' },
]

// ── Cursos ───────────────────────────────────────────────
app.get('/api/cursos', (_req, res) => res.json(cursos))

// ── Trilhas — CRUD ───────────────────────────────────────
app.get('/api/trilhas', (_req, res) => res.json(trilhas))

app.post('/api/trilhas', (req, res) => {
  const { titulo, cursos: nCursos, horas, cor } = req.body

  if (!titulo?.trim() || !nCursos || !horas) {
    return res.status(400).json({ error: 'Campos titulo, cursos e horas são obrigatórios.' })
  }

  const nova = {
    id:     Date.now(),
    titulo: titulo.trim(),
    cursos: Number(nCursos),
    horas:  Number(horas),
    cor:    cor ?? '#6366F1',
  }
  trilhas.push(nova)
  res.status(201).json(nova)
})

app.put('/api/trilhas/:id', (req, res) => {
  const id  = Number(req.params.id)
  const idx = trilhas.findIndex(t => t.id === id)

  if (idx === -1) return res.status(404).json({ error: 'Trilha não encontrada.' })

  const { titulo, cursos: nCursos, horas, cor } = req.body

  if (!titulo?.trim() || !nCursos || !horas) {
    return res.status(400).json({ error: 'Campos titulo, cursos e horas são obrigatórios.' })
  }

  trilhas[idx] = {
    id,
    titulo: titulo.trim(),
    cursos: Number(nCursos),
    horas:  Number(horas),
    cor:    cor ?? trilhas[idx].cor,
  }

  res.json(trilhas[idx])
})

app.delete('/api/trilhas/:id', (req, res) => {
  const id  = Number(req.params.id)
  const idx = trilhas.findIndex(t => t.id === id)

  if (idx === -1) return res.status(404).json({ error: 'Trilha não encontrada.' })

  trilhas.splice(idx, 1)
  res.status(204).send()
})

// ── Stats ────────────────────────────────────────────────
app.get('/api/stats', (_req, res) => {
  res.json({ alunos: 12847, cursos: 48, instrutores: 23, certificados: 8934 })
})

// ── Start ────────────────────────────────────────────────
app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`))
