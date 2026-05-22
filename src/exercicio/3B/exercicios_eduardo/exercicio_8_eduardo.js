const path = require("path")

const arquivo = "imagem.png"
const extensao = path.extname(arquivo)
const diretorioAtual = __dirname

console.log("Extensão do arquivo: " + extensao)
console.log("Diretório atual: " + diretorioAtual)
