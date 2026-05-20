// Utilize o módulo fs para ler o conteúdo do arquivo mensagem.txt criado no exercício anterior e exibi-lo no terminal.
//voce ja aprendeu no exercicio anterior como faz a importacao do modulo fs

let fs = require('fs')
let path = require("path");

const caminhoArquivo = path.join(__dirname, 'message.txt')

const mensagem = fs.readFileSync(caminhoArquivo, 'utf-8')

console.log(mensagem)