const produtos = {
  Camiseta: 49.90,
  Calca: 99.90,
  Tenis: 199.90
};

console.log("Catalogo de produtos:");

for (const produto in produtos) {
  console.log(`${produto}: R$ ${produtos[produto].toFixed(2)}`);
}
