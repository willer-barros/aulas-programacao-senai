// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt e escrever o texto "Node.js é poderoso!" dentro dele.
//para usar esse modulo, usamos o metodo require do node. ficando assim const fs = require("fs")

const fs = require("fs");
const path = require("path");
const arquivo = path.join(__dirname, "mensagem.txt");
const conteudo = "Node.js é poderoso!";

fs.writeFileSync(arquivo, conteudo, "utf8");
console.log(`Arquivo criado em: ${arquivo}`);
console.log(`Conteúdo gravado: ${conteudo}`);


