// 2. Buscar e Verificar Chaves no Dicionário
// Verifique se um produto existe e retorne uma mensagem personalizada. 
//voce deve usar a funcao hasOwnProperty()

const produtos = {
  Camiseta: 49.9,
  Calca: 99.9,
  Tenis: 199.9,
};

const produtoProcurado = "Calca";

if (produtos.hasOwnProperty(produtoProcurado)) {
  console.log(`O produto "${produtoProcurado}" está disponível por R$ ${produtos[produtoProcurado].toFixed(2)}.`);
} else {
  console.log(`O produto "${produtoProcurado}" não está cadastrado no catálogo.`);
}
