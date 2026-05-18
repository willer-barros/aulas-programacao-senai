// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt
//  e escrever o texto "Node.js é poderoso!" dentro dele.
//para usar esse modulo, usamos o metodo require do node. 
// ficando assim const fs = require("fs")

const fs = require ("fs")
const txt = ("Node.js é poderoso!")
const arquivo = "mensagem.txt"

fs.writeFile(arquivo, txt, (erro) => {
  if (erro) {
    console.error("Erro ao criar o arquivo:", erro)
    return
  }
  console.log(`Arquivo '${arquivo}' criado com sucesso!`)
})