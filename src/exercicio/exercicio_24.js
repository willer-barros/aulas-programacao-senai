const express = require("express")

const app = express()

app.use(express.json())

const PORT = 3000

// Array de clientes
const clientes = [
    { id: 1, nome: "Carlos" },
    { id: 2, nome: "Ana" },
    { id: 3, nome: "Marcos" }
]

// Array de pedidos
let pedidos = []

let proximoPedidoId = 101

// POST /pedidos
app.post("/pedidos", (req, res) => {

    const { clienteId, produto, valor } = req.body

    // Verifica se o cliente existe
    const clienteExiste = clientes.find(
        cliente => cliente.id === clienteId
    )

    if (!clienteExiste) {

        return res.status(400).json({
            mensagem: "Cliente inexistente"
        })

    }

    // Cria novo pedido
    const novoPedido = {
        id: proximoPedidoId++,
        clienteId,
        produto,
        valor
    }

    pedidos.push(novoPedido)

    res.status(201).json({
        mensagem: "Pedido criado com sucesso",
        pedido: novoPedido
    })

})

// GET /clientes/:id/pedidos
app.get("/clientes/:id/pedidos", (req, res) => {

    const idCliente = Number(req.params.id)

    const pedidosCliente = pedidos.filter(
        pedido => pedido.clienteId === idCliente
    )

    res.json(pedidosCliente)

})

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)

})