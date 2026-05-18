// 2. Verificar Presença e Índice com includes() e indexOf()
// Verifique se um número está presente em um array e retorne sua posição. 

const numeros = [10, 25, 47, 83, 92, 105];

const numeroBuscado = 83;

console.log(`--- Buscando o número ${numeroBuscado} ---`);

if (numeros.includes(numeroBuscado)) {
    
    const posicao = numeros.indexOf(numeroBuscado);
    console.log(`O número ${numeroBuscado} está presente no array!`);
    console.log(`Ele foi encontrado na posição (índice): ${posicao}`);

} else {
    console.log(`O número ${numeroBuscado} não foi encontrado no array.`);
}
