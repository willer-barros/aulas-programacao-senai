const express = require("express")

const app = express()

const PORT = 3000

app.use(express.json())

const filmes = [
    { id: 1, titulo: "Inception", genero: "Ficção", ano: 2010 },
    { id: 2, titulo: "Titanic", genero: "Romance", ano: 1997 },
    { id: 3, titulo: "Vingadores", genero: "Ação", ano: 2012 },
    { id: 4, titulo: "Interestelar", genero: "Ficção", ano: 2014 },
    { id: 5, titulo: "Corra!", genero: "Terror", ano: 2017 }
]

app.get("/filmes", (req, res) => {

    const { genero, ano } = req.query

    let resultado = filmes

    if (genero) {
        resultado = resultado.filter(
            filme => filme.genero.toLowerCase() === genero.toLowerCase()
        )
    }

    if (ano) {
        resultado = resultado.filter(
            filme => filme.ano === Number(ano)
        )
    }

    res.json(resultado)

})

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)

})
