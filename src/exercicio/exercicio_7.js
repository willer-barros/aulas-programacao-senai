const produtos = [
    { nome: "Chuteira", preco: 450 },
    { nome: "Bola", preco: 180 },
    { nome: "Caneleira", preco: 45 },
    { nome: "Camisa da seleça", preco: 320 }
]

const produtosCaros = produtos.filter(produto => produto.preco > 50)

console.log(produtosCaros)