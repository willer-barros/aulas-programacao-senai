// Caminhos	Use o módulo path para exibir a extensão de um nome de arquivo fictício (ex: "imagem.png") e o caminho absoluto do diretório atual (__dirname).


const path = require('path')

const arquivoFake = 'imagme.png'

const extensao = path.extname(arquivoFake)

console.log("o arquivo é em", extensao,"e o caminho até ele é este:", __dirname)