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

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORTA = 3002;

const cursos = [
    {id: 1, titulo: "Curso de React", vagas: 30, categoria: "Frontend"},
    {id: 2, titulo: "Curso de Node.js", vagas: 25, categoria: "Backend"},
    {id: 3, titulo: "Curso de Angular", vagas: 20, categoria: "Frontend"}
]

app.get('/cursos', (req, res)  => {  
    res.json(cursos);
})

app.post('/cursos', (req, res) => {
    const { titulo, vagas, categoria } = req.body;
    if (vagas < 0) {
        res.status(400).json({ error: "Número de vagas não pode ser negativo" });
        return;
    }
    const novoCurso = { id: Date.now(), titulo, vagas, categoria };
    cursos.push(novoCurso);
    res.status(201).json(novoCurso);
})

app.put('/cursos/:id', (req, res) => {
    const id = Number (req.params.id);
    const { titulo, vagas, categoria } = req.body;
    if (vagas < 0) {
        res.status(400).json({ error: "Número de vagas não pode ser negativo" });
        return;
    }
    const curso = cursos.find(curso => curso.id === id);
    if (!curso) {
        res.status(404).json({error: "Curso não encontrado" });
        return;
    }
    curso.titulo = titulo;
    curso.vagas = vagas;
    curso.categoria = categoria;
    res.json(curso);
})


app.delete('/cursos/:id', (req, res) => {
    const id = Number (req.params.id);
    const cursoIndex = cursos.findIndex(curso => curso.id === id);
    if (cursoIndex === -1) {
        res.status(404).json({ error: "Curso não encontrado" });
        return;
        
    }
    cursos.splice(cursoIndex, 1);
    res.status(200).json({ message: "Curso excluído com sucesso" });
})

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});