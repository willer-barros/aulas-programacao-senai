

const path = require("path")

const arquivo = "imagem.png"

const extensao = path.extname(arquivo)

console.log("Extensão do arquivo:", extensao)
console.log("Diretório atual:", __dirname)