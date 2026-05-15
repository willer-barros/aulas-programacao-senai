const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(__dirname))

const PORT = 3000

let alunos = []

// GET
app.get('/alunos', (req, res) => {
    res.json(alunos);
})

// POST
app.post('/alunos', (req, res) =>{
    const { nome } = req.body;

    if(!nome){
        return res.status(400).json({
            error: "Nome é Obrigatorio"
        })
    }

    const novoAluno = {
        id: Date.now(),
        nome
    }

    alunos.push(novoAluno);

    res.status(201).json(novoAluno)
})

// PUT
app.put('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    const aluno = alunos.find(a => a.id == id);

    if (!aluno) {
        return res.status(404).json({
            error: "Aluno não encontrado"
        });
    }

    aluno.nome = nome;

    res.json(aluno);
});

// DELETE
app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;

    alunos = alunos.filter(a => a.id != id);

    res.json({
        mensagem: "Aluno removido"
    });
});

app.listen(PORT, () =>
    console.log(`Servidor rodando na porta: ${PORT}`)
)