// Use o módulo os para exibir no console o nome da plataforma do 
// sistema operacional (linux, win32, etc) e a quantidade de memória livre em GB.

const os = require("os");

//para exibir o nome da plataforma do sistema operacional, usamos a propriedade platform do os. ficando assim os.platform()
const plataforma = os.platform();
console.log("Plataforma do sistema operacional:", plataforma);

//para exibir a quantidade de memória livre em GB, usamos a propriedade freemem do os. ficando assim os.freemem()
const memoriaLivre = os.freemem() / (1024 * 1024 * 1024);
console.log("Memória livre:", memoriaLivre.toFixed(2), "GB");