// 3. Iterar com forEach() e Aplicar Operações
// Use forEach() para percorrer um array de preços e aplicar um desconto de 10% em cada item. 

const precos = [100, 200, 300]
const precoDesconto = []
precos.forEach((preco) => {
    const desconto = preco * 0.1
    const precoFinal = preco - desconto
    precoDesconto.push(precoFinal)
})
console.log(precoDesconto)