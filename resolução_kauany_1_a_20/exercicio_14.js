const produtos = {
    Camiseta: 49.90,
    Calça: 99.90,
    Tênis: 199.90
}

console.log("Catálogo de produtos:")

for (const produto in produtos) {
    console.log(produto + ": R$ " + produtos[produto].toFixed(2))
}