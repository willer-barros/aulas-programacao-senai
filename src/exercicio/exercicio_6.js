// Use o módulo http para criar um servidor básico que rode na porta 3000 e responda
//  "Bem-vindo ao meu servidor Node!" para qualquer requisição.HTTP	Use o 
// módulo http para criar um servidor básico que rode na porta 3000 e responda
//  "Bem-vindo ao meu servidor Node!" para qualquer requisição.
// nessa etapa nos começaremos a falar de desenvolvimento web

const http = require("http")
const porta = 3000

const servidor = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("content-type", "text-plain, charset=utf-8")
    res.end("Bem-vindo ao meu servidor Node!")
})
servidor.listen(porta, () => {
   console.log(`Servidor rodando no Willer: ${porta}`)
})
