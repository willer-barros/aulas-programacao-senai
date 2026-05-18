// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt e escrever o texto "Node.js é poderoso!" dentro dele.
//para usar esse modulo, usamos o metodo require do node. ficando assim const fs = require("fs")

const fs = require("fs")

fs.writeFile("mensagem.txt", "Node.js é poderoso!", (err) => {
    if (err) {
        console.log("Erro ao criar o arquivo")
    } else {
        console.log("Arquivo criado com sucesso!")
    }
})