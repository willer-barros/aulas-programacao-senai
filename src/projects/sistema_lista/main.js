const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

let alunos = [];

// GET — listar todos
app.get('/alunos', (req, res) => {
    res.json(alunos);
});

// POST — cadastrar
app.post('/alunos', (req, res) => {
    const { nome } = req.body;
    if (!nome) return res.status(400).json({ error: "Nome é obrigatório" });

    const novoAluno = { id: Date.now(), nome };
    alunos.push(novoAluno);
    res.status(201).json(novoAluno);
});

// PUT — editar
app.put('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    const aluno = alunos.find(a => a.id === id);
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
    if (!nome)  return res.status(400).json({ error: "Nome é obrigatório" });

    aluno.nome = nome;
    res.json(aluno);
});

// DELETE — remover
app.delete('/alunos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = alunos.findIndex(a => a.id === id);

    if (index === -1) return res.status(404).json({ error: "Aluno não encontrado" });

    alunos.splice(index, 1);
    res.json({ message: "Aluno deletado com sucesso" });
});

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));