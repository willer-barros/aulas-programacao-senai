// Use o módulo nativo fs para criar um arquivo chamado mensagem.txt e escrever o texto "Node.js é poderoso!" dentro dele.
//para usar esse modulo, usamos o metodo require do node. ficando assim const fs = require("fs")

const fs = require("fs")

const texto = "Nodejs é poderoso"

fs.writeFile("mensagem.txt", texto, (error) =>{
    if(error){
        console.error("Erro na criacao do arquivo", error);
        return
    }
    console.log("O Arquivo foi criado com sucesso")
})

