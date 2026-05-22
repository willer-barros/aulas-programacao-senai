const produtos = [
    { nome: "Caneta", preco: 2.50 },
    { nome: "Mochila", preco: 120.00 },
    { nome: "Caderno", preco: 35.00 },
    { nome: "Fone de ouvido", preco: 89.90 },
    { nome: "Borracha", preco: 1.50 }
]

const productosCaro = produtos.filter(produto => produto.preco > 50)

productosCaro.forEach(produto => {
    console.log(`${produto.nome} - R$ ${produto.preco.toFixed(2)}`)
})
