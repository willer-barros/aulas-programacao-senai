const precos = [100, 250, 80, 120]

console.log("Preços com desconto de 10%:")
precos.forEach(preco => {
    const precoComDesconto = preco * 0.9
    console.log(`R$ ${preco.toFixed(2)} → R$ ${precoComDesconto.toFixed(2)}`)
})
