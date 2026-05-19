const os = require("os");


const plataforma = os.platform();


const memoriaLivreBytes = os.freemem();
const memoriaLivreGB = memoriaLivreBytes / (1024 * 1024 * 1024);

console.log(`Plataforma do Sistema: ${plataforma}`);

console.log(`Memória RAM Livre: ${memoriaLivreGB.toFixed(2)} GB`);