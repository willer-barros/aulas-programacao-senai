// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.

const produtos = [
    { nome: "Produto A", preco: 30 },
    { nome: "Produto B", preco: 60 },
    { nome: "Produto C", preco: 80 },
    { nome: "Produto D", preco: 40 }
];

const produtosCaros = produtos.filter(produto => produto.preco > 50);

console.log(produtosCaros);