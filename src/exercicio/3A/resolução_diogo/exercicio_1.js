// Calculadora Simples
// Crie um script que receba dois números 
// (podem ser variáveis fixas por enquanto) e exiba a soma, subtração, multiplicação e divisão entre eles.
const num1 = Number(200);
const num2 = Number(100);

function calcular(){
    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let multilicacao = num1 * num2;
    let divisao = num1 / num2;
    console.log("soma",soma,"subtração",subtracao,"multiplicação",multilicacao,"divisão",divisao)
}; 
calcular();