// 1. Adicionar e Remover Elementos com push() e shift()
// Simule uma fila de atendimento em uma clínica veterinária, onde os animais são atendidos na ordem de chegada.

// Cria um array vazio para representar a fila
const clinica = [];

// Adicionando animais na fila com push() (adiciona ao final)
clinica.push("Rex (Cachorro)");
clinica.push("Mimi (Gato)");
clinica.push("Pitu (Papagaio)");

console.log("Fila de atendimento:", clinica);

// Atendendo o primeiro da fila com shift() (remove do início)
const atendido1 = clinica.shift();
console.log(`Atendendo: ${atendido1}`);
console.log("Fila restante:", clinica);

clinica.push("Thor (Coelho)");
console.log("Novo animal entrou na fila:", clinica);

const atendido2 = clinica.shift();
console.log(`Atendendo: ${atendido2}`);
console.log("Fila restante:", clinica);