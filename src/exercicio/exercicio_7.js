// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.

const produtos = [
    { nome: "Camiseta", preco: 39.90 },
    { nome: "Tênis Esportivo", preco: 189.90 },
    { nome: "Meias", preco: 15.00 },
    { nome: "Calça Jeans", preco: 120.00 },
    { nome: "Boné", preco: 45.00 }
];

const produtosCaros = produtos.filter(produto => produto.preco > 50.00);

console.log(produtosCaros);
