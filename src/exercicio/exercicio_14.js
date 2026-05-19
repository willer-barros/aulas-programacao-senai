// Simule um catálogo de produtos onde cada chave é o nome do produto e o valor é o preço. 

// Cria um dicionário (objeto) de produtos
const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

// Adiciona um novo produto
produtos['Boné'] = 39.90;
console.log("Catálogo atualizado:", produtos);

// Remove um produto
delete produtos['Camiseta'];
console.log("Após remover Camiseta:", produtos);

// Exibe todos os produtos e preços
console.log("\nLista de produtos:");
for (const produto in produtos) {
    console.log(`${produto}: R$ ${produtos[produto].toFixed(2)}`);
}