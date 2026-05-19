const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

const precoCamiseta = produtos['Camiseta']; 
console.log(`O preço da Camiseta é: R$ ${precoCamiseta}`);

produtos['Boné'] = 29.90;

produtos['Calça'] = 89.90;

console.log("\n--- Catálogo Completo ---");

Object.entries(produtos).forEach(([nome, preco]) => {
    console.log(`Produto: ${nome.padEnd(10, '.')} Preço: R$ ${preco.toFixed(2)}`);
});