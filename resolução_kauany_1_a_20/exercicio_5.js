const os = require("os")

const plataforma = os.platform()
const memoriaLivreGB = os.freemem() / 1024 / 1024 / 1024

console.log("Plataforma: " + plataforma)
console.log("Memória livre: " + memoriaLivreGB.toFixed(2) + " GB")
