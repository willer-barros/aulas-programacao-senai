// 2. Verificar Presença e Índice com includes() e indexOf()
// Verifique se um número está presente em um array e retorne sua posição. 

const numeros = [10, 20, 30, 40, 50];

const numeroBuscado = 30;

if (numeros.includes(numeroBuscado)) {
    const posicao = numeros.indexOf(numeroBuscado);
    console.log(`O número ${numeroBuscado} está no array, na posição ${posicao}.`);
} else {
    console.log(`O número ${numeroBuscado} não está no array.`);
}

const numeroAusente = 99;

if (numeros.includes(numeroAusente)) {
    const posicao = numeros.indexOf(numeroAusente);
    console.log(`O número ${numeroAusente} está no array, na posição ${posicao}.`);
} else {
    console.log(`O número ${numeroAusente} não está no array.`);
}