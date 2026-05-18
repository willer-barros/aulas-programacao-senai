const express = require('express')
const app = express()

app.use(express.json())

const clientes = [
  { id: 1, nome: 'Carlos' },
  { id: 2, nome: 'Ana' },
  { id: 3, nome: 'Mariana' },
]

const pedidos = [
  { id: 101, clienteId: 1, produto: 'Teclado Mecânico', valor: 250.0 },
  { id: 102, clienteId: 2, produto: 'Mouse Gamer', valor: 150.0 },
]

let proximoPedidoId = pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1

app.post('/pedidos', (req, res) => {
  const { clienteId, produto, valor } = req.body

  if (!clienteId || !produto || typeof produto !== 'string' || !produto.trim() || !valor || valor <= 0) {
    return res.status(400).json({ erro: 'Dados inválidos. Verifique clienteId, produto e valor.' })
  }

  const clienteExiste = clientes.some((cliente) => cliente.id === Number(clienteId))

  if (!clienteExiste) {
    return res.status(400).json({ erro: 'Cliente inexistente' })
  }

  const novoPedido = {
    id: proximoPedidoId++,
    clienteId: Number(clienteId),
    produto: produto.trim(),
    valor: Number(valor),
  }

  pedidos.push(novoPedido)
  res.status(201).json(novoPedido)
})

app.get('/clientes/:id/pedidos', (req, res) => {
  const clienteId = Number(req.params.id)
  const clienteExiste = clientes.some((cliente) => cliente.id === clienteId)

  if (!clienteExiste) {
    return res.status(404).json({ erro: 'Cliente não encontrado' })
  }

  const pedidosDoCliente = pedidos.filter((pedido) => pedido.clienteId === clienteId)
  res.json(pedidosDoCliente)
})

const PORTA = 3000
app.listen(PORTA, () => {
  console.log(`API de pedidos rodando em http://localhost:${PORTA}`)
})
