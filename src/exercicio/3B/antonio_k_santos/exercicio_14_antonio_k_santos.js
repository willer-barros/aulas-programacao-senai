const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
}

console.log("Catálogo de produtos:")
for (const [nome, preco] of Object.entries(produtos)) {
    console.log(`${nome}: R$ ${preco.toFixed(2)}`)
}
