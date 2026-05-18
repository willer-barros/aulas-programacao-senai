const express = require('express')
const app = express()

app.use(express.json())

let tarefas = [
  { id: 1, descricao: 'Estudar Express', concluida: false },
  { id: 2, descricao: 'Ler documentação', concluida: false },
]
let proximoId = tarefas.length ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1

app.get('/tarefas', (req, res) => {
  res.json(tarefas)
})

app.post('/tarefas', (req, res) => {
  const { descricao } = req.body

  if (!descricao || typeof descricao !== 'string') {
    return res.status(400).json({ erro: 'Descrição obrigatória' })
  }

  const novaTarefa = {
    id: proximoId++,
    descricao: descricao.trim(),
    concluida: false,
  }

  tarefas.push(novaTarefa)
  res.status(201).json(novaTarefa)
})

app.put('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id)
  const { descricao, concluida } = req.body
  const tarefa = tarefas.find((t) => t.id === id)

  if (!tarefa) {
    return res.status(404).json({ mensagem: 'Tarefa não encontrada' })
  }

  if (descricao !== undefined) {
    if (typeof descricao !== 'string' || !descricao.trim()) {
      return res.status(400).json({ erro: 'Descrição deve ser uma string não vazia' })
    }
    tarefa.descricao = descricao.trim()
  }

  if (concluida !== undefined) {
    tarefa.concluida = Boolean(concluida)
  }

  res.json(tarefa)
})

app.delete('/tarefas/:id', (req, res) => {
  const id = Number(req.params.id)
  const indice = tarefas.findIndex((t) => t.id === id)

  if (indice === -1) {
    return res.status(404).json({ mensagem: 'Tarefa não encontrada' })
  }

  const tarefaRemovida = tarefas.splice(indice, 1)[0]
  res.json(tarefaRemovida)
})

const PORTA = 3000
app.listen(PORTA, () => {
  console.log(`API de tarefas rodando em http://localhost:${PORTA}`)
})
