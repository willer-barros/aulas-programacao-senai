// 1. Adicionar e Remover Elementos com push() e shift()
// Simule uma fila de atendimento em uma clínica veterinária, onde os animais são atendidos na ordem de chegada.

// Cria um array vazio para representar a fila
const clinica = [];

// Animais chegando à clínica
clinica.push("Rex (cachorro)")
clinica.push("Mimi (gato)")
clinica.push("Piolho (hamster)")
clinica.push("Thor (cachorro)")

console.log("Fila de espera:", clinica)

// Atendendo os animais na ordem de chegada
const atendido1 = clinica.shift()
console.log(`Atendendo: ${atendido1}`)
console.log("Fila restante:", clinica)

const atendido2 = clinica.shift()
console.log(`Atendendo: ${atendido2}`)
console.log("Fila restante:", clinica)