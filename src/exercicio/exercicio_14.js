// Simule um catálogo de produtos onde cada chave é o nome do produto e o valor é o preço.

// Cria um dicionário (objeto) de produtos
const produtos = {
    Camiseta: 49.90,
    Calça: 99.90,
    Tênis: 199.90
}

// Exibindo os produtos
for (const produto in produtos) {

    console.log(`${produto}: R$ ${produtos[produto]}`)

}