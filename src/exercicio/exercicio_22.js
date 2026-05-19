const express = require("express");

const app = express();

const filmes = [
  { id: 1, titulo: "Inception", genero: "Ficção", ano: 2010 },
  { id: 2, titulo: "Titanic", genero: "Romance", ano: 1997 },
  { id: 3, titulo: "Vingadores", genero: "Ação", ano: 2012 },
  { id: 4, titulo: "Corra!", genero: "Terror", ano: 2017 },
  { id: 5, titulo: "Toy Story", genero: "Animação", ano: 1995 }
];

app.get("/filmes", (req, res) => {
  let resultado = filmes;

  const { genero, ano } = req.query;

  if (genero) {
    resultado = resultado.filter(
      filme => filme.genero.toLowerCase() === genero.toLowerCase()
    );
  }

  if (ano) {
    resultado = resultado.filter(
      filme => filme.ano === Number(ano)
    );
  }

  res.json(resultado);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});