const produtos = {
    Camiseta: 49.90,
    Calça: 99.90,
    Tênis: 199.90
}

const produtoBuscado = "Tênis"

if (produtos.hasOwnProperty(produtoBuscado)) {
    console.log("Produto encontrado: " + produtoBuscado)
    console.log("Preço: R$ " + produtos[produtoBuscado].toFixed(2))
} else {
    console.log("Produto não encontrado: " + produtoBuscado)
}