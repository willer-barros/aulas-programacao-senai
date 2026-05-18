// Caminhos	Use o módulo path para exibir a extensão de um nome de arquivo fictício
//  (ex: "imagem.png") e o caminho absoluto do diretório atual (__dirname).
const path = require("path")
const nome = "img.png"
const extensao = path.extname(nome)
const pasta = __dirname
console.log(`Extensão do arquivo '${nome}':`, extensao)
console.log(`Caminho absoluto do diretório atual:`, pasta)