const http = require("http");

// Criamos o servidor
const servidor = http.createServer((req, res) => {
    // Definimos o cabeçalho HTTP com o status 200 (OK) e o tipo de conteúdo
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    
    // Enviamos a resposta que aparecerá na tela do navegador
    res.end("Bem-vindo ao meu servidor Node!");
});

// Escolhemos a porta 3000 para o servidor ficar "ouvindo" as requisições
const PORTA = 3000;
servidor.listen(PORTA, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORTA}`);
});