// Utilize o módulo fs para ler o conteúdo do arquivo mensagem.txt criado no exercício anterior e exibi-lo no terminal.
//voce ja aprendeu no exercicio anterior como faz a importacao do modulo fs

const fs = require("fs");

const conteudo = fs.readFileSync("mensagem.txt", "utf-8");

console.log(conteudo);

