// Utilize o módulo fs para ler o conteúdo do arquivo mensagem.txt criado no exercício anterior e exibi-lo no terminal.
//voce ja aprendeu no exercicio anterior como faz a importacao do modulo fs

const fs = require("fs");

fs.readFile("mensagem.txt", "utf8", function(erro, conteudo) {
    if (erro) {
        console.log("Erro ao ler o arquivo:", erro);
    } else {
        console.log("Conteúdo do arquivo:", conteudo);
    }
});
