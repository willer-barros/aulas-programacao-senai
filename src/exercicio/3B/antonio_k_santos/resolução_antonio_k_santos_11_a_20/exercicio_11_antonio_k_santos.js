const clinica = []

clinica.push("Rex")
clinica.push("Mia")
clinica.push("Bolinha")

console.log("Fila atual:", clinica)

const atendido = clinica.shift()
console.log(`${atendido} foi atendido.`)
console.log("Fila após atendimento:", clinica)
