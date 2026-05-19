// Calculadora Simples
// Crie um script que receba dois números 
// (podem ser variáveis fixas por enquanto) e exiba a soma, subtração, multiplicação e divisão entre eles.

const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);

function Calculadora(){
    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let division = num1 / num2;
    let multiplicacao = num1 * num2;

    console.log("soma =", soma, "subtracao = ", subtracao, "divisão =", division, "e multiplicação =", multiplicacao)
}

Calculadora();