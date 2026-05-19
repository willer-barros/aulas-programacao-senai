// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.


const produtos = [
    { nome: 'Coca-Cola', preco: 8.50 },
    { nome: 'Pizza de Calabresa', preco: 65.00 },
    { nome: 'Hambúrguer Artesanal', preco: 35.00 },
    { nome: 'Tênis de Corrida', preco: 250.00 },
    { nome: 'Camiseta Básica', preco: 45.00 },
    { nome: 'Relógio Smart', preco: 150.00 },
    { nome: 'Livro de JavaScript', preco: 55.00 },
    { nome: 'Barra de Chocolate', preco: 12.00 },
    { nome: 'Fone de Ouvido', preco: 85.00 },
    { nome: 'Mouse sem Fio', preco: 40.00 }
];


const produtosCaros = produtos.filter(function(produto){
    return produto.preco >50;
});

console.log(produtosCaros)