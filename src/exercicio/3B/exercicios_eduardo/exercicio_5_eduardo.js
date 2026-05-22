const os = require("os")

const plataforma = os.platform()
const memoriaLivreGB = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)

console.log("Plataforma: " + plataforma)
console.log("Memória livre: " + memoriaLivreGB + " GB")
