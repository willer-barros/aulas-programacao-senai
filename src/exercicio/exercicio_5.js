const fs = require("fs")

console.log("ANTES")

fs.writeFileSync("mensagem.txt", "teste")

console.log("DEPOIS")
