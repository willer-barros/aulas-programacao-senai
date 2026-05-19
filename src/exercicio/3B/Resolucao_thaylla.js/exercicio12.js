const numeros = [10, 20, 30, 40, 50];

const numeroProcurado = 30;

console.log(`--- Buscando o número ${numeroProcurado} ---`);

if (numeros.includes(numeroProcurado)) {
    
    const indice = numeros.indexOf(numeroProcurado);
    
    console.log(`O número ${numeroProcurado} ESTÁ presente no array.`);
    console.log(`Ele foi encontrado no índice: ${indice}.`);

} else {
    console.log(`O número ${numeroProcurado} NÃO está no array.`);
}

console.log("\n--- Testando um número inexistente ---");
console.log("O array tem o número 99?", numeros.includes(99)); 
console.log("Qual o índice do número 99?", numeros.indexOf(99)); 