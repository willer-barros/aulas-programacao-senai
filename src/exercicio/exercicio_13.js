// 3. Iterar com forEach() e Aplicar Operações
// Use forEach() para percorrer um array de preços e aplicar um desconto de 10% em cada item. 

const precos = [100, 250, 80, 120];

precos.forEach(function(preco, indice) {
    const precoComDesconto = preco * 0.9;
    console.log(`Preço original: R$ ${preco.toFixed(2)}, Preço com desconto: R$ ${precoComDesconto.toFixed(2)}`);
});