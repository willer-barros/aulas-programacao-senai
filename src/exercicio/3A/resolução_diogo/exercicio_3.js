// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt e escrever o texto "Node.js é poderoso!" dentro dele.
//para usar esse modulo, usamos o metodo require do node. ficando assim const fs = require("fs")


const fs = require("fs");
const path = require("path");
const criando_arquivo = path.join(__dirname, "mensagem.txt");
fs.writeFileSync (criando_arquivo, "Node.js é poderoso!");