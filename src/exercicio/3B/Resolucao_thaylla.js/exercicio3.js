const fs = require("fs");

try {
    fs.writeFileSync("mensagem.txt", "Node.js é poderoso!");
    console.log("Arquivo 'mensagem.txt' criado com sucesso!");
} catch (err) {
    console.error("Erro ao criar o arquivo:", err);
}