const path = require("path");

const arquivo = "foto_das_ferias.imagem.png";
const extensao = path.extname(arquivo);

const diretorioAtual = __dirname;

console.log(`A extensão do arquivo é: ${extensao}`); 

console.log(`O caminho absoluto deste diretório é: ${diretorioAtual}`);
