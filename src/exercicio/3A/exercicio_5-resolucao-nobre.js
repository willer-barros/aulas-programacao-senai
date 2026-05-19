// Use o módulo os para exibir no console o nome da plataforma do 
// sistema operacional (linux, win32, etc) e a quantidade de memória livre em GB.

const os = require('os')

const sistemaOperacional = os.platform();

const memByte = os.freemem();

const memGb = memByte / (1024 * 1024 *1024)


console.log("o sistema operacional é ", sistemaOperacional," e há",memGb,"GB de memória livres")