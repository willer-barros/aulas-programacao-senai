const express = require("express")

const app = express()

app.use(express.json())

const PORT = 3000

let tarefas = []

let proximoId = 1

// GET - listar tarefas
app.get("/tarefas", (req, res) => {

    res.json(tarefas)

})

// POST - adicionar tarefa
app.post("/tarefas", (req, res) => {

    const { descricao } = req.body

    const novaTarefa = {
        id: proximoId++,
        descricao,
        concluida: false
    }

    tarefas.push(novaTarefa)

    res.status(201).json(novaTarefa)

})

// PUT - atualizar tarefa
app.put("/tarefas/:id", (req, res) => {

    const id = Number(req.params.id)

    const tarefa = tarefas.find(t => t.id === id)

    if (!tarefa) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        })
    }

    const { descricao, concluida } = req.body

    if (descricao !== undefined) {
        tarefa.descricao = descricao
    }

    if (concluida !== undefined) {
        tarefa.concluida = concluida
    }

    res.json(tarefa)

})

// DELETE - remover tarefa
app.delete("/tarefas/:id", (req, res) => {

    const id = Number(req.params.id)

    const indice = tarefas.findIndex(t => t.id === id)

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Tarefa não encontrada"
        })
    }

    tarefas.splice(indice, 1)

    res.json({
        mensagem: "Tarefa removida com sucesso"
    })

})

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)

})