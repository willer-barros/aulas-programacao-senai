// 2. Verificar Presença e Índice com includes() e indexOf()
// Verifique se um número está presente em um array e retorne sua posição. 

const numeros = [10, 20, 30, 40, 50];

const numeroBuscado = 30;

if (numeros.includes(numeroBuscado)) {
    console.log(`O número ${numeroBuscado} está presente no array.`);
    console.log(`Posição: índice ${numeros.indexOf(numeroBuscado)}`);
} else {
    console.log(`O número ${numeroBuscado} não está presente no array.`);
}