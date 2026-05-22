const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
}

const busca = "Calça"

if (produtos.hasOwnProperty(busca)) {
    console.log(busca + " encontrado! Preço: R$ " + produtos[busca].toFixed(2))
} else {
    console.log(busca + " não encontrado no catálogo.")
}
