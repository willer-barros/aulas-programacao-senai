// Use o módulo os para exibir no console o nome da plataforma do 
// sistema operacional (linux, win32, etc) e a quantidade de memória livre em GB.

const os = require("os")
const sisop = os.platform()
const memoria = os.freemem() / (1024*1024*1024)

console.log(`Sistema operacional: ${sisop}`)
console.log (`Memória disponível: ${memoria} GB`)

