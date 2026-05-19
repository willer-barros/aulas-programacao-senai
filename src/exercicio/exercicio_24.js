const express = require('express');
const app = express();
app.use(express.json());

// armazenamento em memória
const clientes = [
    { id: 1, nome: "Carlos" },
    { id: 2, nome: "Mariana" },
    { id: 3, nome: "João" }
];

const pedidos = [];
let nextPedidoId = 1;

// POST /pedidos: cria um pedido após validar clienteId
app.post('/pedidos', (req, res) => {
    const { clienteId, produto, valor } = req.body;

    if (clienteId === undefined || produto === undefined || valor === undefined) {
        return res.status(400).json({ erro: 'Campos obrigatórios: clienteId, produto, valor' });
    }

    const clienteExiste = clientes.some(c => c.id === Number(clienteId));
    if (!clienteExiste) {
        return res.status(400).json({ erro: 'Cliente inexistente' });
    }

    if (typeof produto !== 'string' || !produto.trim()) {
        return res.status(400).json({ erro: 'Produto inválido' });
    }

    const valorNum = Number(valor);
    if (Number.isNaN(valorNum) || valorNum <= 0) {
        return res.status(400).json({ erro: 'Valor inválido' });
    }

    const pedido = {
        id: nextPedidoId++,
        clienteId: Number(clienteId),
        produto: produto.trim(),
        valor: valorNum
    };

    pedidos.push(pedido);
    res.status(201).json(pedido);
});

// GET /clientes/:id/pedidos: retorna pedidos do cliente específico
app.get('/clientes/:id/pedidos', (req, res) => {
    const clienteId = Number(req.params.id);
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    const pedidosDoCliente = pedidos.filter(p => p.clienteId === clienteId);
    res.json(pedidosDoCliente);
});

// endpoints auxiliares (opcionais) para facilitar testes
app.get('/clientes', (req, res) => res.json(clientes));
app.get('/pedidos', (req, res) => res.json(pedidos));

// inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de pedidos rodando em http://localhost:${PORT}`);
});