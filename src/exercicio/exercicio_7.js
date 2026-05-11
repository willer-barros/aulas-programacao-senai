// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.

const produtos = [
    { nome: "Caneta", preco: 2.50 },
    { nome: "Mochila", preco: 120.00 },
    { nome: "Caderno", preco: 35.00 },
    { nome: "Fone de Ouvido", preco: 199.90 },
    { nome: "Borracha", preco: 1.00 },
    { nome: "Calculadora", preco: 75.00 }
];

const produtosCaros = produtos.filter(function(produto) {
    return produto.preco > 50;
});

console.log("Produtos acima de R$ 50,00:");
produtosCaros.forEach(function(produto) {
    console.log(`- ${produto.nome}: R$ ${produto.preco.toFixed(2)}`);
});