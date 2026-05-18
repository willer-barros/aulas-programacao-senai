// Caminhos	Use o módulo path para exibir a extensão de um nome de arquivo fictício (ex: "imagem.png") e o caminho absoluto do diretório atual (__dirname).

const path = require("path");

const arquivoFicticio = "imagem.png";

const extensao = path.extname(arquivoFicticio);

const caminhoAbsoluto = path.resolve(__dirname);

console.log("Extensão do arquivo: " + extensao);
console.log("Caminho absoluto do diretório: " + caminhoAbsoluto);
