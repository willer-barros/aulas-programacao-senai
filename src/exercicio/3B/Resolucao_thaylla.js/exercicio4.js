const fs = require("fs");

try {

    const dados = fs.readFileSync("mensagem.txt", "utf8");
    console.log("Conteúdo do arquivo:");
    console.log(dados);
} catch (err) {
    console.error("Erro ao ler o arquivo:", err);
}