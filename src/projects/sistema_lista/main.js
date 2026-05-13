const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors()) //comunicacao eficiente entre front e back
const PORT = 3000

let alunos= [] //simular um db

//rota para pegar
app.get('/alunos', (req, res) => {
    res.json(alunos);
})

//rota para cadastrar novos alunos
app.post('/alunos', (req, res) =>{
    const { nome } = req.body;
    if(!nome){
        return res.status(400).json({ error: "Nome é Obrigatorio"})
    }
    
    const novoAluno = {id: Date.now(), nome}
    alunos.push(novoAluno); // salvando no array(banco de dados)
    
    res.status(201).json(novoAluno)
})

//rota para atualizar um aluno pelo id
app.put('/alunos/:id', (req, res) => {
    const { id } = req.params
    const { nome } = req.body

    if(!nome){
        return res.status(400).json({ error: 'Nome é Obrigatorio' })
    }

    const idx = alunos.findIndex(a => String(a.id) === String(id))
    if(idx === -1){
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    alunos[idx].nome = nome
    return res.json(alunos[idx])
})

//rota para deletar um aluno pelo id
app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params

    const idx = alunos.findIndex(a => String(a.id) === String(id))
    if(idx === -1){
        return res.status(404).json({ error: 'Aluno não encontrado' })
    }

    const removed = alunos.splice(idx, 1)[0]
    return res.json({ message: 'Aluno removido com sucesso', aluno: removed })
})

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))
    