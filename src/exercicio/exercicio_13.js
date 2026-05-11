// 3. Iterar com forEach() e Aplicar Operações
// Use forEach() para percorrer um array de preços e aplicar um desconto de 10% em cada item. 

const precos = [100, 250, 80, 120];

console.log("Preços com 10% de desconto:");
precos.forEach(function(preco) {
    const precoComDesconto = preco * 0.9;
    console.log(`R$ ${preco.toFixed(2)} → R$ ${precoComDesconto.toFixed(2)}`);
});