// 3. Iterar com forEach() e Aplicar Operações

const precos = [100, 250, 80, 120]

precos.forEach((preco) => {

    const desconto = preco * 0.10
    const precoFinal = preco - desconto

    console.log(`Preço original: R$${preco}`)
    console.log(`Preço com desconto: R$${precoFinal}`)
})