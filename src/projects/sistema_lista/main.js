const express = require("express");
const cors = require("cors");

const servidor = express();
const PORTA = 3000;

servidor.use(express.json());
servidor.use(cors());

let listaAlunos = [];

servidor.get("/alunos", (requisicao, resposta) => {
    resposta.status(200).json(listaAlunos);
});

servidor.post("/alunos", (requisicao, resposta) => {
    const nomeAluno = requisicao.body.nome;

    if (!nomeAluno) {
        return resposta.status(400).json({
            mensagem: "O campo nome precisa ser preenchido."
        });
    }

<<<<<<< HEAD
    const alunoCriado = {
        id: Date.now(),
        nome: nomeAluno
    };

    listaAlunos.push(alunoCriado);

    resposta.status(201).json({
        mensagem: "Aluno cadastrado com sucesso!",
        aluno: alunoCriado
    });
});

servidor.listen(PORTA, () => {
    console.log(`API funcionando em http://localhost:${PORTA}`);
});
=======
app.put('/alunos/:id', (req, res) =>{
    const id = Number(req.params.id);
    const indice = alunos.findIndex(novoAluno => novoAluno.id === id)
    const { nome } = req.body;
    if(indice === -1) {
        return res.status(404).json({ error: "Aluno não existe"})
    } else { 
        alunos[indice].nome = nome
        return res.json(alunos[indice])
    }
})

app.delete('/alunos/:id', (req, res) =>{
    const id = Number(req.params.id);
    const indice = alunos.findIndex(novoAluno => novoAluno.id === id)
    if(indice === -1) {
        return res.status(404).json({ error: "Aluno não existe"})
    } else {
        alunos.splice(indice, 1)
        return res.json({message: "Aluno removido com sucesso"})
    }
})



app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))
    
>>>>>>> main
