// 3. Iterar com forEach() e Aplicar Operações
// Use forEach() para percorrer um array de preços e aplicar um desconto de 10% em cada item. 

const precos = [100, 250, 80, 120]

precos.forEach((preco) => {

    const precoComDesconto = preco - (preco * 0.10)

    console.log("Preço original: R$" + preco)
    console.log("Preço com desconto: R$" + precoComDesconto)
})