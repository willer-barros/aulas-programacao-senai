const express = require('express');
const app = express();
app.use(express.json());

// povoamento inicial com 6 filmes variados
const filmes = [
    { id: 1, titulo: "Inception", genero: "Ficção", ano: 2010 },
    { id: 2, titulo: "O Poderoso Chefão", genero: "Drama", ano: 1972 },
    { id: 3, titulo: "Matrix", genero: "Ficção", ano: 1999 },
    { id: 4, titulo: "Toy Story", genero: "Animação", ano: 1995 },
    { id: 5, titulo: "Parasita", genero: "Suspense", ano: 2019 },
    { id: 6, titulo: "Interstellar", genero: "Ficção", ano: 2014 }
];

// GET /filmes: retorna todos ou aplica filtros via query params
app.get('/filmes', (req, res) => {
    let resultados = filmes;

    const { genero, ano } = req.query;

    if (genero) {
        const generoLower = String(genero).toLowerCase();
        resultados = resultados.filter(f => String(f.genero).toLowerCase() === generoLower);
    }

    if (ano) {
        const anoNum = Number(ano);
        if (!Number.isNaN(anoNum)) {
            resultados = resultados.filter(f => f.ano === anoNum);
        } else {
            return res.status(400).json({ erro: 'Ano inválido' });
        }
    }

    res.json(resultados);
});

// inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de filmes rodando em http://localhost:${PORT}`);
});