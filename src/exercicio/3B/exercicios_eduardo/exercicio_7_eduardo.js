const produtos = [
    { nome: "Camiseta", preco: 39.90 },
    { nome: "Tênis", preco: 199.90 },
    { nome: "Meia", preco: 14.90 },
    { nome: "Calça", preco: 89.90 },
    { nome: "Boné", preco: 49.90 },
    { nome: "Jaqueta", preco: 259.90 }
]

const produtosCaros = produtos.filter(produto => produto.preco > 50)

produtosCaros.forEach(produto => {
    console.log(produto.nome + " - R$ " + produto.preco.toFixed(2))
})
