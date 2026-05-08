// 1. Adicionar e Remover Elementos com push() e shift()
// Simule uma fila de atendimento em uma clínica veterinária, onde os animais são atendidos na ordem de chegada.

// Cria um array vazio para representar a fila
const clinica = [];

// Adicionando animais à fila
clinica.push("Cachorro");
clinica.push("Gato");
clinica.push("Pássaro");

console.log("Fila inicial:", clinica);

// Atendendo o primeiro animal
const atendido = clinica.shift();
console.log("Animal atendido:", atendido);
console.log("Fila após atendimento:", clinica);