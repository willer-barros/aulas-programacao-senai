// 1. Adicionar e Remover Elementos com push() e shift()
// Simule uma fila de atendimento em uma clínica veterinária, onde os animais são atendidos na ordem de chegada.

const filaVeterinaria = [];

console.log("--- Chegando animais na clínica ---");

filaVeterinaria.push("Rex (Cachorro)");
filaVeterinaria.push("Mia (Gata)");
filaVeterinaria.push("Mel (Calopsita)");

console.log("Fila atual:", filaVeterinaria);
console.log("-----------------------------------\n");

console.log("--- Iniciando os atendimentos ---");

const primeiroAtendido = filaVeterinaria.shift();
console.log(`Chamando para o consultório: ${primeiroAtendido}`);
console.log("Fila restante:", filaVeterinaria);

const segundoAtendido = filaVeterinaria.shift();
console.log(`Chamando para o consultório: ${segundoAtendido}`);
console.log("Fila restante:", filaVeterinaria);
