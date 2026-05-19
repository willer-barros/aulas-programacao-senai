// Use o módulo os para exibir no console o nome da plataforma do 
// sistema operacional (linux, win32, etc) e a quantidade de memória livre em GB.

const os = require("os");
const sistema_operacional = os.platform();
const memoria = os.freemem() /(1024*1024*1024);
console.log("o sistema operacional é:",sistema_operacional, "a memoria é:",memoria);