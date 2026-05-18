// Utilize o módulo fs para ler o conteúdo do arquivo mensagem.txt criado no exercício anterior e exibi-lo no terminal.
//voce ja aprendeu no exercicio anterior como faz a importacao do modulo fs

const fs = require("fs")
const arquivo = "mensagem.txt"

fs.readFile(arquivo, "utf8", (erro, dados) => {
  if (erro) {
    console.error("Erro ao ler o arquivo:", erro)
    return
  }
  console.log(`Conteúdo do arquivo '${arquivo}':`, dados)
})
