// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt e escrever o texto "Node.js é poderoso!" dentro dele.
//para usar esse modulo, usamos o metodo require do node. ficando assim const fs = require("fs")

let fs = require("fs");
let path = require("path");

const caminhoArquivo = path.join(__dirname, 'message.txt')

fs.writeFileSync('message.txt', 'Node.js é poderoso!');

