// 3. Iterar com forEach() e Aplicar Operações
// Use forEach() para percorrer um array de preços e aplicar um desconto de 10% em cada item. 

const precos = [100, 250, 80, 120];
const desconto = 0.10;

precos.forEach((preco, index) => {
    precos[index] = preco - (preco * desconto);
});

console.log("Preços com desconto:");
console.log(precos);