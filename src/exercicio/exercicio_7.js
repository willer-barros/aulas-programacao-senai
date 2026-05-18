// Dado um array de objetos de "produtos"
//(nome e preço), use o método .filter() 
// para exibir apenas os produtos que custam mais de R$ 50,00.

const produtos = [
    {nome: "drogas", preco: 15 },
    {nome: "picanha", preco: 154830}
];

const caros = produtos.filter((produto) => produto.preco > 50)
console.log(caros)