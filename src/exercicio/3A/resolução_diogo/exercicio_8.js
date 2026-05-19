// Caminhos	Use o módulo path para exibir a extensão de um nome de arquivo fictício (ex: "imagem.png") e o caminho absoluto do diretório atual (__dirname).
const path = require('path');
const nomeArquivo = "imagem.png";
const extensao = path.extname(nomeArquivo);
console.log(`A extensão do arquivo é: ${extensao}`);
console.log(`O caminho absoluto do diretório atual é: ${__dirname}`);