// Use o módulo http para criar um servidor básico que rode na porta 3000 e responda "Bem-vindo ao meu servidor Node!" para qualquer requisição.HTTP	Use o 
// módulo http para criar um servidor básico que rode na porta 3000 e responda "Bem-vindo ao meu servidor Node!" para qualquer requisição.
// nessa etapa nos começaremos a falar de desenvolvimento web


const server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Bem-vindo ao meu servidor Node!");
});

server.listen(3000, function() {
    console.log("Servidor rodando na porta 3000");
});