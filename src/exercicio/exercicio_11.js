
const clinica = [];

// adicionando animais
clinica.push("cachorro pidao");
clinica.push("gato de botas");
clinica.push("chopper");

console.log("Fila de espera:", clinica);

// Primeiro atendimento (primeiro da fila sai)
const atendido1 = clinica.shift();
console.log("Atendido:", atendido1);

console.log("Fila após atendimento:", clinica);
