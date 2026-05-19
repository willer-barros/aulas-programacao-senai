// Caminhos	Use o módulo path para exibir a extensão de um nome de arquivo fictício (ex: "imagem.png") e o caminho absoluto do diretório atual (__dirname).


const nomeArquivo = "imagem.png";
const extensao = path.extname(nomeArquivo);
const caminhoAbsoluto = __dirname;

console.log("Extensão do arquivo:", extensao);
console.log("Caminho absoluto:", caminhoAbsoluto);