// Simule um catálogo de produtos onde cada chave é o nome do produto e o valor é o preço. 

// Cria um dicionário (objeto) de produtos
const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

console.log("Catálogo de produtos:");
for (const [nome, preco] of Object.entries(produtos)) {
    console.log(`${nome}: R$ ${preco}`);
}