// Escreva um código que verifique se um número é par ou ímpar e exiba o resultado no console.
// para se um numero é par você precisa calcular o modulo, em js é representado com "%"

const num1 = Number(process.argv[2]);

function parImpar(){
    if (num1 % 2 === 0){
        console.log("par");
    } else {
        console.log("impar");
    }
}

parImpar();

