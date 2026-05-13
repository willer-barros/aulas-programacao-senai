// Simule um catálogo de produtos onde cada chave é o nome do produto e o valor é o preço. 

// Cria um dicionário (objeto) de produtos
const produtos = {
  Camiseta: 49.9,
  Calca: 99.9,
  Tenis: 199.9,
};

console.log("Catálogo de produtos:");
for (const nome in produtos) {
  if (produtos.hasOwnProperty(nome)) {
    console.log(`- ${nome}: R$ ${produtos[nome].toFixed(2)}`);
  }
}
