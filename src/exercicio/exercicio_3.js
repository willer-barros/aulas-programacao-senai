// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt
// e escrever o texto "Node.js é poderoso!" dentro dele.

const fs = require("fs")

fs.writeFileSync("mensagem.txt", "Node.js é poderoso!")

console.log("Arquivo criado com sucesso!")