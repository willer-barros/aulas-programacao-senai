// 2. Buscar e Verificar Chaves no Dicionário
// Verifique se um produto existe e retorne uma mensagem personalizada. 
//voce deve usar a funcao hasOwnProperty()

const produtos = {
    'camiseta': 49.90,
    'calça': 99.90,
    'tenis': 199.90
};

const nomeProduto = prompt("Digite o nome do produto para verificar: ")
const nomeAjustado = nomeProduto.toLowerCase()
if (produtos.hasOwnProperty(nomeAjustado)){
    console.log(`O produto '${nomeProduto}' existe e custa R$ ${produtos[nomeAjustado]}.`)
} else {
    console.log(`O produto '${nomeProduto}' não existe no catálogo.`)
}
