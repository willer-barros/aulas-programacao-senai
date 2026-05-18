// Use o módulo os para exibir no console o nome da plataforma do 
// sistema operacional (linux, win32, etc) e a quantidade de memória livre em GB.

const os = require("os")

const plataforma = os.platform()
const memoriaLivre = os.freemem() / 1024 / 1024 / 1024

console.log("Plataforma do sistema:", plataforma)
console.log("Memória livre:", memoriaLivre.toFixed(2) + " GB")