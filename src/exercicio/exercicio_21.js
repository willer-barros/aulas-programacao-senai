// 1. API de Gerenciamento de Tarefas (O clássico Todo List)
// Objetivo: Praticar os 4 verbos básicos do CRUD e a manipulação de IDs.

// Estrutura do Objeto: { id: 1, descricao: "Estudar Express", concluida: false }

// Endpoints a criar:

// GET /tarefas: Retorna todas as tarefas.

// POST /tarefas: Adiciona uma nova tarefa (gerar id automático e forçar concluida: false por padrão).

// PUT /tarefas/:id: Permite alterar a descrição ou o status de concluída da tarefa.

// DELETE /tarefas/:id: Remove a tarefa do array pelo ID.

//Testar via postman

// Desafio Técnico: Se o usuário tentar atualizar ou deletar uma tarefa com um ID que não existe, sua API deve retornar o status 404 com a mensagem "Tarefa não encontrada".

const express = require('express');
const app = express();
app.use(express.json());

// armazenamento em memória
const tarefas = [];
let nextId = 1;

// GET /tarefas: Retorna todas as tarefas
app.get('/tarefas', (req, res) => {
    res.json(tarefas);
});

// POST /tarefas: Adiciona uma nova tarefa
app.post('/tarefas', (req, res) => {
    const { descricao } = req.body;
    if (!descricao || typeof descricao !== 'string' || !descricao.trim()) {
        return res.status(400).json({ erro: 'Descrição é obrigatória' });
    }
    const tarefa = { id: nextId++, descricao: descricao.trim(), concluida: false };
    tarefas.push(tarefa);
    res.status(201).json(tarefa);
});

// PUT /tarefas/:id: Atualiza descrição ou estado concluída
app.put('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    const { descricao, concluida } = req.body;
    if (descricao !== undefined) {
        if (typeof descricao !== 'string' || !descricao.trim()) {
            return res.status(400).json({ erro: 'Descrição inválida' });
        }
        tarefa.descricao = descricao.trim();
    }
    if (concluida !== undefined) {
        tarefa.concluida = Boolean(concluida);
    }
    res.json(tarefa);
});

// DELETE /tarefas/:id: Remove a tarefa pelo ID
app.delete('/tarefas/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = tarefas.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }
    tarefas.splice(index, 1);
    res.status(204).send();
});

// inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});