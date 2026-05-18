const express = require("express");
const app = express();

app.use(express.json());

const filmes = [
  { id: 1, titulo: "Inception", genero: "Ficção", ano: 2010 },
  { id: 2, titulo: "The Matrix", genero: "Ficção", ano: 1999 },
  { id: 3, titulo: "O Poderoso Chefão", genero: "Drama", ano: 1972 },
  { id: 4, titulo: "Interestelar", genero: "Ficção", ano: 2014 },
  { id: 5, titulo: "Bastardos Inglórios", genero: "Ação", ano: 2009 }
];

app.get("/filmes", (req, res) => {
  const { genero, ano } = req.query;
  let filmesFiltrados = filmes;

  if (genero) {
    filmesFiltrados = filmesFiltrados.filter(
      f => f.genero.toLowerCase() === genero.toLowerCase()
    );
  }

  if (ano) {
    filmesFiltrados = filmesFiltrados.filter(
      f => f.ano === parseInt(ano)
    );
  }

  res.json(filmesFiltrados);
});

app.listen(3000, () => {
  console.log("API de Filmes rodando em http://localhost:3000");
});
