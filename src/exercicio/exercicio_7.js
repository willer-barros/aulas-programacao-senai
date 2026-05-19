// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.
const produtos = [
    { nome: "Notebook", preço: 3000 },
    { nome: "Mouse", preço: 50 },
    { nome: "Teclado", preço: 150 },
    { nome: "Monitor", preço: 800 }
];

const produtosCaros = produtos.filter(produto => produto.preço > 50);
console.log("Produtos mais caros que R$ 50,00:");
console.log(produtosCaros);