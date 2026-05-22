const express = require("express")

const app = express()

app.use(express.json())

const PORT = 3000

let cupons = [
    { codigo: "PROMO10", descontoPercentual: 10, ativo: true },
    { codigo: "DEV20", descontoPercentual: 20, ativo: true },
    { codigo: "EXPIRADO50", descontoPercentual: 50, ativo: false }
]

let carrinho = [
    { id: 1, produto: "Mouse Gamer", preco: 150.00, quantidade: 2 },
    { id: 2, produto: "Teclado Mecânico", preco: 350.00, quantidade: 1 }
]

app.get("/carrinho", (req, res) => {
    const subtotal = carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade)
    }, 0)

    res.json({
        itens: carrinho,
        subtotal
    })
})

app.post("/carrinho", (req, res) => {
    const { id, produto, preco, quantidade } = req.body

    const produtoExistente = carrinho.find(
        item => item.id === id
    )

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade

        return res.json({
            mensagem: "Quantidade atualizada no carrinho",
            carrinho
        })
    }

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

app.post("/checkout", (req, res) => {
    const { cupom } = req.body

    if (carrinho.length === 0) {
        return res.status(400).json({
            mensagem: "Não é possível finalizar um carrinho vazio"
        })
    }

    const totalBruto = carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade)
    }, 0)

    let descontoAplicado = 0

    if (cupom) {
        const cupomEncontrado = cupons.find(
            c => c.codigo === cupom
        )

        if (!cupomEncontrado) {
            return res.status(404).json({
                mensagem: "Cupom inválido"
            })
        }

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
