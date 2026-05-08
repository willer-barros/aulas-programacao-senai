// 2. Verificar Presença e Índice com includes() e indexOf()
// Verifique se um número está presente em um array e retorne sua posição. 

const numeros = [10, 20, 30, 40, 50];

const numero = 30;

if (numeros.includes(numero)) {
    console.log(`O número ${numero} está presente no array na posição ${numeros.indexOf(numero)}`);
} else {
    console.log(`O número ${numero} não está presente no array`);
}