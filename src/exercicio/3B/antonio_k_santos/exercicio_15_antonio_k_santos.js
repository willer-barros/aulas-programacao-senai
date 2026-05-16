const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
}

const busca = "Calça"

if (produtos.hasOwnProperty(busca)) {
    console.log(`Produto encontrado: ${busca} custa R$ ${produtos[busca].toFixed(2)}`)
} else {
    console.log(`Produto "${busca}" não encontrado no catálogo.`)
}
