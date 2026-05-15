const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Nosso Banco de Dados em memória (Array de Objetos)
let carteira = [
  { id: 1, moeda: "Bitcoin", simbolo: "BTC", quantidade: 0.05, valorCompra: 350000 },
];

// ROTA GET: Listar todos os ativos
app.get('/ativos', (req, res) => {
  res.json(carteira);
});

// ROTA POST: Adicionar novo ativo
app.post('/ativos', (req, res) => {
  const { moeda, simbolo, quantidade, valorCompra } = req.body;
  const novoAtivo = {
    id: Date.now(), // Gera um ID único baseado no tempo
    moeda,
    simbolo: simbolo.toUpperCase(),
    quantidade: Number(quantidade),
    valorCompra: Number(valorCompra)
  };
  carteira.push(novoAtivo);
  res.status(201).json(novoAtivo);
});

// ROTA PUT: Editar quantidade ou valor de um ativo
app.put('/ativos/:id', (req, res) => {
  const { id } = req.params;
  const { quantidade, valorCompra } = req.body;
  const index = carteira.findIndex(a => a.id == id);

  if (index !== -1) {
    carteira[index] = { ...carteira[index], quantidade: Number(quantidade), valorCompra: Number(valorCompra) };
    return res.json(carteira[index]);
  }
  res.status(404).send("Ativo não encontrado");
});

// ROTA DELETE: "Vender" ativo (remover da lista)
app.delete('/ativos/:id', (req, res) => {
  const { id } = req.params;
  carteira = carteira.filter(a => a.id != id);
  res.status(204).send();
});

app.listen(3001, () => console.log("🔥 Backend CryptoPulse rodando na porta 3001"));