const produtos = [
  { nome: "Caderno", preco: 25 },
  { nome: "Mochila", preco: 120 },
  { nome: "Caneta", preco: 5 },
  { nome: "Fone de ouvido", preco: 80 },
  { nome: "Estojo", preco: 35 }
];

const produtosCaros = produtos.filter((produto) => produto.preco > 50);

console.log(produtosCaros);
