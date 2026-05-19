// 2. Verificar Presença e Índice com includes() e indexOf()
// Verifique se um número está presente em um array e retorne sua posição. 

const numeros = [10, 20, 30, 40, 50];

const numeroProcurado = 30;
const estaPresente = numeros.includes(numeroProcurado);
const indice = numeros.indexOf(numeroProcurado);

console.log(`O número ${numeroProcurado} está presente no array: ${estaPresente}`);
console.log(`A posição do número ${numeroProcurado} é: ${indice}`);