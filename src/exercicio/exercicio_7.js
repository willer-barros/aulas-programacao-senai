// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.
const produtos = [
    { nome: "Notebook", preço: 1500 },
    { nome: "Smartphone", preço: 800 },
    { nome: "Tablet", preço: 300 },
    { nome: "Computador", preço: 2000 }
];

const produtosCaros = produtos.filter(function(produto) {
    return produto.preço > 50;
});

console.log("Produtos mais caros que R$ 50,00:");
console.log(produtosCaros);