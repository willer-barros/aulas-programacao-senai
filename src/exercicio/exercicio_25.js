const express = require('express')
const app = express()

app.use(express.json())

let cupons = [
  { codigo: 'PROMO10', descontoPercentual: 10, ativo: true },
  { codigo: 'DEV20', descontoPercentual: 20, ativo: true },
  { codigo: 'EXPIRADO50', descontoPercentual: 50, ativo: false },
]

let carrinho = [
  { id: 1, produto: 'Mouse Gamer', preco: 150.0, quantidade: 2 },
  { id: 2, produto: 'Teclado Mecânico', preco: 350.0, quantidade: 1 },
]

app.get('/carrinho', (req, res) => {
  const totalBruto = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  res.json({ itens: carrinho, totalBruto })
})

app.post('/carrinho', (req, res) => {
  const { id, produto, preco, quantidade } = req.body

  if (id === undefined || !produto || preco === undefined || quantidade === undefined) {
    return res.status(400).json({ erro: 'id, produto, preco e quantidade são obrigatórios' })
  }

  if (typeof preco !== 'number' || typeof quantidade !== 'number' || quantidade <= 0) {
    return res.status(400).json({ erro: 'preco e quantidade devem ser números válidos' })
  }

  const itemExistente = carrinho.find((item) => item.id === id)

  if (itemExistente) {
    itemExistente.quantidade += quantidade
    return res.status(200).json({ mensagem: 'Quantidade atualizada no carrinho', item: itemExistente })
  }

  const novoItem = { id, produto, preco, quantidade }
  carrinho.push(novoItem)
  res.status(201).json({ mensagem: 'Item adicionado ao carrinho', item: novoItem })
})

app.post('/checkout', (req, res) => {
  const { cupom } = req.body

  if (carrinho.length === 0) {
    return res.status(400).json({ mensagem: 'Não é possível finalizar um carrinho vazio' })
  }

  const totalBruto = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  if (!cupom) {
    return res.json({
      mensagem: 'Checkout calculado com sucesso!',
      totalBruto,
      descontoAplicado: 0,
      totalAPagar: Number(totalBruto.toFixed(2)),
    })
  }

  const cupomBuscado = cupons.find((c) => c.codigo === String(cupom).trim())

  if (!cupomBuscado) {
    return res.status(404).json({ mensagem: 'Cupom inválido' })
  }

  if (!cupomBuscado.ativo) {
    return res.status(400).json({ mensagem: 'Este cupom já expirou' })
  }

  const descontoAplicado = Number((totalBruto * (cupomBuscado.descontoPercentual / 100)).toFixed(2))
  const totalAPagar = Number((totalBruto - descontoAplicado).toFixed(2))

  res.json({
    mensagem: 'Checkout calculado com sucesso!',
    totalBruto: Number(totalBruto.toFixed(2)),
    descontoAplicado,
    totalAPagar,
  })
})

const PORTA = 3000
app.listen(PORTA, () => {
  console.log(`API de checkout rodando em http://localhost:${PORTA}`)
})
