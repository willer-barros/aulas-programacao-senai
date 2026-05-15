const http = require("http")

const servidor = http.createServer((req, res) => {
    res.end("Bem-vindo ao meu servidor Node!")
})

servidor.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})
