// Utilize o módulo fs para ler o conteúdo do arquivo mensagem.txt criado no exercício anterior e exibi-lo no terminal.
//voce ja aprendeu no exercicio anterior como faz a importacao do modulo fs

const fs = require("fs");
const path = require("path");
const arquivo = path.join(__dirname, "mensagem.txt");

if (fs.existsSync(arquivo)) {
  const conteudo = fs.readFileSync(arquivo, "utf8");
  console.log("Conteúdo de mensagem.txt:");
  console.log(conteudo);
} else {
  console.log("Arquivo mensagem.txt não encontrado. Execute exercicio_3.js primeiro.");
}


