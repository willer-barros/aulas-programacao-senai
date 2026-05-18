// API de Sistema de Pedidos (Relacionamento de Dados)
// Objetivo: Simular como uma API lida com tabelas/entidades relacionadas (Ex: Clientes e Pedidos).

// Estrutura dos Dados: Você terá dois arrays separados: clientes e pedidos.

// Cliente: { id: 1, nome: "Carlos" }

// Pedido: { id: 101, clienteId: 1, produto: "Teclado Mecânico", valor: 250.00 } (Note que clienteId amarra o pedido ao Carlos).

// Endpoints a criar:

// POST /pedidos: Cria um pedido.

//Testar via POSTMAN

// Validação Crítica: Antes de dar o push no array de pedidos, sua API precisa verificar se o clienteId enviado realmente existe no array de clientes. Se não existir, barre a criação com o status 400 ("Cliente inexistente").

// GET /clientes/:id/pedidos: Retorna apenas os pedidos daquele cliente específico.