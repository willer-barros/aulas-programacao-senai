// Use o módulo os para exibir no console o nome da plataforma do
// sistema operacional (linux, win32, etc) e a quantidade de memória livre em GB.

const os = require("os");

const plataforma = os.platform();
const memoriaLivreGB = (os.freemem() / (1024 ** 3)).toFixed(2);

console.log("Plataforma:", plataforma);
console.log("Memória livre:", memoriaLivreGB, "GB");
