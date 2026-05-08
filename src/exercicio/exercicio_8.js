// Caminhos	Use o módulo path para exibir a extensão de um nome de arquivo fictício (ex: "imagem.png") e o caminho absoluto do diretório atual (__dirname).

const path = require("path");

console.log("Extensão:", path.extname("imagem.png"));
console.log("Diretório atual:", __dirname);