const fs = require("fs")

const conteudo = fs.readFileSync("mensagem.txt", "utf8")
console.log(conteudo)
