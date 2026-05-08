// 1. Adicionar e Remover Elementos com push() e shift()
// Simule uma fila de atendimento em uma clínica veterinária, onde os animais são atendidos na ordem de chegada.

// Cria um array vazio para representar a fila
const clinica = [];

clinica.push("Rex");
clinica.push("Mingau");
clinica.push("Luna");

console.log("Fila inicial de atendimento:", clinica);

while (clinica.length > 0) {
  const atendido = clinica.shift();
  console.log(`Atendendo: ${atendido}`);
}

console.log("Todos os animais já foram atendidos.");
