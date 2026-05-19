// 2. Buscar e Verificar Chaves no Dicionário
// Verifique se um produto existe e retorne uma mensagem personalizada. 
//voce deve usar a funcao hasOwnProperty()

const produtos = {
    Camiseta: 49.90,
    Calça: 99.90,
    Tênis: 199.90
}

const produtoBuscado = "Calça"

if (produtos.hasOwnProperty(produtoBuscado)) {

    console.log("O produto " + produtoBuscado + " existe no catálogo.")

} else {

    console.log("Produto não encontrado.")

}