// 1. Adicionar e Remover Elementos com push() e shift()
// Simule uma fila de atendimento em uma clínica veterinária, onde os animais são atendidos na ordem de chegada.

// Cria um array vazio para representar a fila

const clinica = []

// Adicionando animais na fila
clinica.push("Rex")
clinica.push("Mingau")
clinica.push("Bolt")

console.log("Fila atual:", clinica)

// Atendendo o primeiro animal da fila
const animalAtendido = clinica.shift()

console.log("Animal atendido:", animalAtendido)
console.log("Fila restante:", clinica)