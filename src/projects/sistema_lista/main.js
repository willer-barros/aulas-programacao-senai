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