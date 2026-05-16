const path = require("path")

const arquivo = "imagem.png"
const extensao = path.extname(arquivo)
const diretorioAtual = path.resolve(__dirname)

console.log("Extensão do arquivo: " + extensao)
console.log("Caminho absoluto do diretório atual: " + diretorioAtual)
