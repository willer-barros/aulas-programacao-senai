// Use o módulo http para criar um servidor básico que rode na porta 3000 e responda "Bem-vindo ao meu servidor Node!" para qualquer requisição.HTTP	Use o 
// módulo http para criar um servidor básico que rode na porta 3000 e responda "Bem-vindo ao meu servidor Node!" para qualquer requisição.
// nessa etapa nos começaremos a falar de desenvolvimento web

const http = require("http");
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Bem-vindo ao meu servidor Node!");
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
