// Simule um catálogo de produtos onde cada chave é o nome do produto e o valor é o preço. 

// Cria um dicionário (objeto) de produtos
const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

console.log("--- Catálogo de Produtos ---");
for (const produto in produtos) {
    console.log(`${produto}: R$ ${produtos[produto].toFixed(2)}`);
}

const total = Object.values(produtos).reduce((soma, preco) => soma + preco, 0);
console.log(`\nValor total do catálogo: R$ ${total.toFixed(2)}`);