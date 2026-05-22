const clinica = []

clinica.push("Rex")
clinica.push("Mimi")
clinica.push("Bolinha")

console.log("Fila atual: " + clinica)

const atendido = clinica.shift()
console.log(atendido + " foi atendido!")
console.log("Fila atual: " + clinica)
