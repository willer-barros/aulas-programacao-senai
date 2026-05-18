// 3. Iterar com forEach() e Aplicar Operações
// Use forEach() para percorrer um array de preços e aplicar um desconto de 10% em cada item. 

const precos = [10.00, 50.00, 100.00, 250.00];

console.log("--- Aplicando Desconto de 10% ---");

precos.forEach((precoOriginal, indice) => {
    const precoComDesconto = precoOriginal * 0.90;
    
    console.log(`Item ${indice + 1} - Original: R$ ${precoOriginal.toFixed(2)} | Com Desconto: R$ ${precoComDesconto.toFixed(2)}`);
});
