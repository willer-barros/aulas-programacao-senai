const produtos = {
  Camiseta: 49.90,
  Calca: 99.90,
  Tenis: 199.90
};

const produtoProcurado = "Camiseta";

if (produtos.hasOwnProperty(produtoProcurado)) {
  console.log(`${produtoProcurado} encontrado! Preco: R$ ${produtos[produtoProcurado].toFixed(2)}`);
} else {
  console.log(`${produtoProcurado} nao encontrado no catalogo.`);
}
