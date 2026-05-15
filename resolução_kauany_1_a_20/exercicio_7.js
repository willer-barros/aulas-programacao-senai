const produtos = [
    { nome: "Camiseta", preco: 35 },
    { nome: "Tênis", preco: 120 },
    { nome: "Boné", preco: 45 },
    { nome: "Mochila", preco: 80 }
]

const produtosCaros = produtos.filter((produto) => {
    return produto.preco > 50
})

console.log(produtosCaros)
