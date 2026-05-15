const precos = [100, 250, 80, 120]

precos.forEach((preco) => {
    const precoComDesconto = preco - (preco * 0.10)
    console.log("Preço com desconto: R$ " + precoComDesconto.toFixed(2))
})