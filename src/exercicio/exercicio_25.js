const express = require("express");
const app = express();

app.use(express.json());

let cupons = [
  { codigo: "PROMO10", descontoPercentual: 10, ativo: true },
  { codigo: "DEV20", descontoPercentual: 20, ativo: true },
  { codigo: "EXPIRADO50", descontoPercentual: 50, ativo: false }
];

let carrinho = [
  { id: 1, produto: "Mouse Gamer", preco: 150.00, quantidade: 2 },
  { id: 2, produto: "Teclado Mecânico", preco: 350.00, quantidade: 1 }
];

app.get("/carrinho", (req, res) => {
  const subtotalBruto = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  
  res.json({
    carrinho,
    subtotalBruto
  });
});

app.post("/carrinho", (req, res) => {
  const { id, produto, preco, quantidade } = req.body;

  const produtoExistente = carrinho.find(item => item.id === id);

  if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
    return res.json(produtoExistente);
  }

  const novoProduto = { id, produto, preco, quantity: quantidade };
  carrinho.push(novoProduto);
  res.status(201).json(novoProduto);
});

app.post("/checkout", (req, res) => {
  const { cupom } = req.body;

  if (carrinho.length === 0) {
    return res.status(400).json({ mensagem: "Não é possível finalizar um carrinho vazio" });
  }

  let descontoPercentual = 0;

  if (cupom) {
    const cupomEncontrado = cupons.find(c => c.codigo === cupom);

    if (!cupomEncontrado) {
      return res.status(404).json({ mensagem: "Cupom inválido" });
    }

    if (!cupomEncontrado.ativo) {
      return res.status(400).json({ mensagem: "Este cupom já expirou" });
    }

    descontoPercentual = cupomEncontrado.descontoPercentual;
  }

  const totalBruto = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const descontoAplicado = (totalBruto * descontoPercentual) / 100;
  const totalAPagar = totalBruto - descontoAplicado;

  res.json({
    mensagem: "Checkout calculado com sucesso!",
    totalBruto,
    descontoAplicado,
    totalAPagar
  });
});

app.listen(3000, () => {
  console.log("API de Checkout rodando em http://localhost:3000");
});
