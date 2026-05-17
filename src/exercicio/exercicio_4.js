// voce ja aprendeu no exercicio anterior como faz a importacao do modulo fs

const fs = require("fs")

const conteudo = fs.readFileSync("mensagem.txt", "utf8")

console.log(conteudo)


