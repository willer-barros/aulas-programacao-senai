const express = require("express")

const app = express()

app.use(express.json())

const PORT = 3000

// Cupons válidos
let cupons = [
  { codigo: "PROMO10", descontoPercentual: 10, ativo: true },
  { codigo: "DEV20", descontoPercentual: 20, ativo: true },
  { codigo: "EXPIRADO50", descontoPercentual: 50, ativo: false }
]

// Carrinho
let carrinho = [
  { id: 1, produto: "Mouse Gamer", preco: 150.00, quantidade: 2 },
  { id: 2, produto: "Teclado Mecânico", preco: 350.00, quantidade: 1 }
]

// GET /carrinho
app.get("/carrinho", (req, res) => {

    const subtotal = carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade)
    }, 0)

    res.json({
        itens: carrinho,
        subtotal
    })

})

// POST /carrinho
app.post("/carrinho", (req, res) => {

    const { id, produto, preco, quantidade } = req.body

    const produtoExistente = carrinho.find(
        item => item.id === id
    )

    // Se produto já existe, soma quantidade
    if (produtoExistente) {

        produtoExistente.quantidade += quantidade

        return res.json({
            mensagem: "Quantidade atualizada no carrinho",
            carrinho
        })

    }

    // Adiciona novo produto
    const novoProduto = {
        id,
        produto,
        preco,
        quantidade
    }

    carrinho.push(novoProduto)

    res.status(201).json({
        mensagem: "Produto adicionado ao carrinho",
        carrinho
    })

})

// POST /checkout
app.post("/checkout", (req, res) => {

    const { cupom } = req.body

    // Validação carrinho vazio
    if (carrinho.length === 0) {

        return res.status(400).json({
            mensagem: "Não é possível finalizar um carrinho vazio"
        })

    }

    // Calcula total bruto
    const totalBruto = carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade)
    }, 0)

    let descontoAplicado = 0

    // Se usuário enviou cupom
    if (cupom) {

        const cupomEncontrado = cupons.find(
            c => c.codigo === cupom
        )

        // Cupom inexistente
        if (!cupomEncontrado) {

            return res.status(404).json({
                mensagem: "Cupom inválido"
            })

        }

        // Cupom expirado
        if (!cupomEncontrado.ativo) {

            return res.status(400).json({
                mensagem: "Este cupom já expirou"
            })

        }

        descontoAplicado =
            totalBruto * (cupomEncontrado.descontoPercentual / 100)

    }

    const totalAPagar = totalBruto - descontoAplicado

    res.json({
        mensagem: "Checkout calculado com sucesso!",
        totalBruto,
        descontoAplicado,
        totalAPagar
    })

})

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)

})