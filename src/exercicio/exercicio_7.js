// Dado um array de objetos de "produtos" (nome e preço), use o método .filter() para exibir apenas os produtos que custam mais de R$ 50,00.

const produtos = [
  { nome: "Camiseta", preco: 45.0 },
  { nome: "Jaqueta", preco: 120.0 },
  { nome: "Boné", preco: 35.0 },
  { nome: "Tênis", preco: 150.0 },
];

const produtosCaros = produtos.filter((produto) => produto.preco > 50);

console.log("Produtos com preço maior que R$ 50,00:");
produtosCaros.forEach((produto) => {
  console.log(`- ${produto.nome}: R$ ${produto.preco.toFixed(2)}`);
});
