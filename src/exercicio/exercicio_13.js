// 3. Iterar com forEach() e Aplicar Operações
// Use forEach() para percorrer um array de preços e aplicar um desconto de 10% em cada item. 

const precos = [100, 250, 80, 120];
const precosComDesconto = [];

precos.forEach((preco) => {
  const desconto = preco * 0.1;
  precosComDesconto.push(preco - desconto);
});

console.log("Preços originais:", precos);
console.log("Preços com 10% de desconto:", precosComDesconto.map((valor) => valor.toFixed(2)));
