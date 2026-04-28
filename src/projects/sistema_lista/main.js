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

app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))
    