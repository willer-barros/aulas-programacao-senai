// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt e escrever o texto "Node.js é poderoso!" dentro dele.
//para usar esse modulo, usamos o metodo require do node. ficando assim const fs = require("fs")

const fs = require("fs");

//para criar um arquivo e escrever algo dentro dele, usamos o metodo writeFile do fs. ficando assim fs.writeFile("nome do arquivo", "conteudo do arquivo", callback)
fs.writeFile("mensagem.txt", "Node.js é poderoso!", function(err) {
    if (err) {
        console.error("Erro ao criar o arquivo:", err);
    } else {
        console.log("Arquivo criado com sucesso!");
    }
});