const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors()) // comunicacao eficiente entre front e back

const PORT = 3000

let alunos = [] // simular um db

// ==========================
// GET - listar alunos
// ==========================
app.get("/alunos", (req, res) => {
    res.json(alunos)
})

// ==========================
// POST - cadastrar aluno
// ==========================
app.post("/alunos", (req, res) => {
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ error: "Nome é obrigatório" })
    }

    const novoAluno = {
        id: Date.now(),
        nome
    }

    alunos.push(novoAluno)

    res.status(201).json(novoAluno)
})

// ==========================
// PUT - atualizar aluno inteiro
// ==========================
app.put("/alunos/:id", (req, res) => {
    const { id } = req.params
    const { nome } = req.body

    const aluno = alunos.find(aluno => aluno.id == id)

    if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado" })
    }

    if (!nome) {
        return res.status(400).json({ error: "Nome é obrigatório" })
    }

    aluno.nome = nome

    res.json({
        mensagem: "Aluno atualizado com sucesso",
        aluno
    })
})

// ==========================
// PATCH - atualizar parcialmente
// ==========================
app.patch("/alunos/:id", (req, res) => {
    const { id } = req.params
    const { nome } = req.body

    const aluno = alunos.find(aluno => aluno.id == id)

    if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado" })
    }

    // atualiza apenas o campo enviado
    if (nome) {
        aluno.nome = nome
    }

    res.json({
        mensagem: "Aluno atualizado parcialmente",
        aluno
    })
})

// ==========================
// DELETE - deletar aluno
// ==========================
app.delete("/alunos/:id", (req, res) => {
    const { id } = req.params

    const alunoExiste = alunos.find(aluno => aluno.id == id)

    if (!alunoExiste) {
        return res.status(404).json({ error: "Aluno não encontrado" })
    }

    alunos = alunos.filter(aluno => aluno.id != id)

    res.json({
        mensagem: "Aluno deletado com sucesso"
    })
})

// ==========================
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})