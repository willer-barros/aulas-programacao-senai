// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.

const produtos = [
    { nome: "Mouse", preco: 40 },
    { nome: "Teclado", preco: 120 },
    { nome: "Monitor", preco: 900 },
    { nome: "Mousepad", preco: 30 }
]

const produtosCaros = produtos.filter(produto => produto.preco > 50)

console.log(produtosCaros)