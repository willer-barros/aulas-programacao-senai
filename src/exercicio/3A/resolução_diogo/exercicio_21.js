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