const express = require('express')
const app = express()

app.use(express.json())

const filmes = [
  { id: 1, titulo: 'Inception', genero: 'Ficção', ano: 2010 },
  { id: 2, titulo: 'Clube da Luta', genero: 'Drama', ano: 1999 },
  { id: 3, titulo: 'Matrix', genero: 'Ficção', ano: 1999 },
  { id: 4, titulo: 'O Grande Hotel Budapeste', genero: 'Comédia', ano: 2014 },
  { id: 5, titulo: 'Parasita', genero: 'Thriller', ano: 2019 },
]

app.get('/filmes', (req, res) => {
  const { genero, ano } = req.query

  const resultados = filmes.filter((filme) => {
    let valido = true

    if (genero) {
      valido = valido && filme.genero.toLowerCase() === String(genero).toLowerCase()
    }

    if (ano) {
      valido = valido && filme.ano === Number(ano)
    }

    return valido
  })

  res.json(resultados)
})

const PORTA = 3000
app.listen(PORTA, () => {
  console.log(`API de filmes rodando em http://localhost:${PORTA}`)
})
