// Use o módulo http para criar um servidor básico que rode na porta 3000 e responda "Bem-vindo ao meu servidor Node!" para qualquer requisição.
// nessa etapa nos começaremos a falar de desenvolvimento web

const http = require("http");

const servidor = http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Bem-vindo ao meu servidor Node!");
});

servidor.listen(3000, function() {
    console.log("Servidor rodando em http://localhost:3000");
});