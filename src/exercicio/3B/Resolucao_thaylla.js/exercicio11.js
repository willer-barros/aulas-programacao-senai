
const clinica = [];

console.log("--- Chegada de Pacientes ---");

clinica.push("Totó (Cachorro)");
clinica.push("Mingau (Gato)");
clinica.push("Pipoca (Calopsita)");

console.log("Fila atual:", clinica);

console.log("\n--- Início dos Atendimentos ---");

const primeiroAtendido = clinica.shift();
console.log(`Chamando para o consultório: ${primeiroAtendido}`);

const segundoAtendido = clinica.shift();
console.log(`Chamando para o consultório: ${segundoAtendido}`);

console.log("\n--- Status Final da Fila ---");
console.log("Animais aguardando:", clinica);
