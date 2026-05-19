// Utilize o módulo fs para ler o conteúdo do arquivo mensagem.txt criado no exercício anterior e exibi-lo no terminal.
//voce ja aprendeu no exercicio anterior como faz a importacao do modulo fs

const fs = require("fs")

fs.readFile("mensagem.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Erro ao ler o arquivo:", err)
    } else {
        console.log("Conteúdo do arquivo:", data)
    }
})
