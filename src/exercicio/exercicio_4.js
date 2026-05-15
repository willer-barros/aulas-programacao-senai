const fs = require("fs");

const conteudo = fs.readFileSync("mensagem.txt", "utf-8");

console.log(conteudo);
