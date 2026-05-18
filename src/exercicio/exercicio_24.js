const express = require("express");
const app = express();

app.use(express.json());

const clientes = [
  { id: 1, nome: "Carlos" },
  { id: 2, nome: "Ana" }
];

const pedidos = [
  { id: 101, clienteId: 1, produto: "Teclado Mecânico", valor: 250.00 }
];

let proximoPedidoId = 102;

app.post("/pedidos", (req, res) => {
  const { clienteId, produto, valor } = req.body;

  const clienteExiste = clientes.find(c => c.id === clienteId);
  if (!clienteExiste) {
    return res.status(400).json({ mensagem: "Cliente inexistente" });
  }

  const novoPedido = {
    id: proximoPedidoId++,
    clienteId: clienteId,
    produto: produto,
    valor: valor
  };

  pedidos.push(novoPedido);
  res.status(201).json(novoPedido);
});

app.get("/clientes/:id/pedidos", (req, res) => {
  const idClienteBuscado = parseInt(req.params.id);

  const clienteExiste = clientes.find(c => c.id === idClienteBuscado);
  if (!clienteExiste) {
    return res.status(404).json({ mensagem: "Cliente não encontrado" });
  }

  const pedidosDoCliente = pedidos.filter(p => p.clienteId === idClienteBuscado);
  res.json(pedidosDoCliente);
});

app.listen(3000, () => {
  console.log("API de Pedidos rodando em http://localhost:3000");
});
