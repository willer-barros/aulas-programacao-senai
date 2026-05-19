// Use o módulo os para exibir no console o nome da plataforma do 
// sistema operacional (linux, win32, etc) e a quantidade de memória livre em GB.

const os = require('os')

console.log('Plataforma:', os.platform())
console.log('Memória livre (GB):', (os.freemem() / 1e9).toFixed(2))