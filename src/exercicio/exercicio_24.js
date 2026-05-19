const express = require("express");

const app = express();

app.use(express.json());

const clientes = [
  { id: 1, nome: "Carlos" },
  { id: 2, nome: "Ana" },
  { id: 3, nome: "João" }
];

let pedidos = [];
let proximoPedidoId = 101;

app.post("/pedidos", (req, res) => {
  const { clienteId, produto, valor } = req.body;

  const clienteExiste = clientes.find(
    cliente => cliente.id === clienteId
  );

  if (!clienteExiste) {
    return res.status(400).json({
      mensagem: "Cliente inexistente"
    });
  }

  const novoPedido = {
    id: proximoPedidoId++,
    clienteId,
    produto,
    valor
  };

  pedidos.push(novoPedido);

  res.status(201).json(novoPedido);
});

app.get("/clientes/:id/pedidos", (req, res) => {
  const id = Number(req.params.id);

  const pedidosCliente = pedidos.filter(
    pedido => pedido.clienteId === id
  );

  res.json(pedidosCliente);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});