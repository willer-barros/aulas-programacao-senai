// Seu objetivo é criar uma API REST funcional. Como ainda não estamos usando um banco de dados real, vocês utilizarão um Array de Objetos em memória para armazenar as informações.

// 📋 Especificações do "Banco de Dados" (Array)
// O array deve começar com pelo menos 3 cursos já cadastrados. Cada curso (objeto) deve possuir:

// id (Número ou String única)

// titulo (String)

// vagas (Número)

// categoria (String - ex: "Frontend", "Backend")

// 🛠️ Desafio das Rotas (Endpoints)
// Vocês devem programar um servidor Express que escute na porta 3002 e responda às seguintes requisições:

// Listagem Geral (GET /cursos): Deve retornar o array completo de cursos em formato JSON.

// Cadastro (POST /cursos): Deve receber os dados do novo curso pelo corpo da requisição (req.body), gerar um ID único automaticamente (Dica: use Date.now()) e adicionar o novo objeto ao array.

// Atualização (PUT /cursos/:id): Deve receber o ID do curso pelos parâmetros da URL e os novos dados pelo corpo da requisição. O servidor deve localizar o curso correspondente no array e atualizar suas informações.

// Exclusão (DELETE /cursos/:id): Deve receber o ID pelos parâmetros da URL e remover o curso correspondente do array.

// ⚠️ Regra de Negócio Obligatória (H1): No cadastro e na atualização, o sistema não deve aceitar números negativos no campo vagas. Se o usuário tentar enviar um valor menor que zero, o servidor deve responder com o status de erro 400 (Bad Request) e uma mensagem explicativa.

const express = require("express");

const app = express();

app.use(express.json());

let cursos = [
    {
        id: 1,
        titulo: "React Completo",
        vagas: 30,
        categoria: "Frontend"
    },
    {
        id: 2,
        titulo: "Node API",
        vagas: 20,
        categoria: "Backend"
    },
    {
        id: 3,
        titulo: "Python",
        vagas: 40,
        categoria: "Backend"
    }
];

app.get("/", (req, res) => {
    res.send("API funcionando");
});

// GET
app.get("/cursos", (req, res) => {
    res.json(cursos);
});

// POST
app.post("/cursos", (req, res) => {

    const { titulo, vagas, categoria } = req.body;

    if (vagas < 0) {

        return res.status(400).json({
            mensagem: "Número de vagas inválido"
        });

    }

    const novoCurso = {

        id: Date.now(),
        titulo,
        vagas,
        categoria

    };

    cursos.push(novoCurso);

    res.status(201).json(novoCurso);

});

// PUT
app.put("/cursos/:id", (req, res) => {

    const id = Number(req.params.id);

    const { titulo, vagas, categoria } = req.body;

    if (vagas < 0) {

        return res.status(400).json({
            mensagem: "Número de vagas inválido"
        });

    }

    const curso = cursos.find(c => c.id === id);

    if (!curso) {

        return res.status(404).json({
            mensagem: "Curso não encontrado"
        });

    }

    curso.titulo = titulo;
    curso.vagas = vagas;
    curso.categoria = categoria;

    res.json(curso);

});

// DELETE
app.delete("/cursos/:id", (req, res) => {

    const id = Number(req.params.id);

    const indice = cursos.findIndex(c => c.id === id);

    if (indice === -1) {

        return res.status(404).json({
            mensagem: "Curso não encontrado"
        });

    }

    cursos.splice(indice, 1);

    res.json({
        mensagem: "Curso removido"
    });

});

app.listen(3002, () => {
    console.log("Servidor rodando na porta 3002");
});