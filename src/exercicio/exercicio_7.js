// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.

const produtos = [
    { nome: "Teclado", preco: 120 },
    { nome: "Mouse", preco: 40 },
    { nome: "Monitor", preco: 900 },
    { nome: "Caderno", preco: 25 },
    { nome: "Headset", preco: 80 }
]

const produtosFiltrados = produtos.filter(produto => produto.preco > 50)

console.log(produtosFiltrados)