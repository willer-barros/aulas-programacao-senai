const clinica = []

clinica.push("Rex")
clinica.push("Mimi")
clinica.push("Thor")

console.log("Fila inicial:", clinica)

const primeiroAtendido = clinica.shift()

console.log("Animal atendido:", primeiroAtendido)
console.log("Fila atual:", clinica)