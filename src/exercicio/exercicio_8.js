const path = require("path");

const nomeArquivo = "imagem.png";

const extensao = path.extname(nomeArquivo);

console.log(`Extensao do arquivo: ${extensao}`);
console.log(`Diretorio atual: ${__dirname}`);
