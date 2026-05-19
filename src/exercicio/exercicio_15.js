// 2. Buscar e Verificar Chaves no Dicionário
// Verifique se um produto existe e retorne uma mensagem personalizada.
// voce deve usar a funcao hasOwnProperty()

const catalogo = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

function buscarProduto(nomeProduto) {
    if (catalogo.hasOwnProperty(nomeProduto)) {
        console.log(`Produto encontrado: ${nomeProduto} custa R$ ${catalogo[nomeProduto].toFixed(2)}`);
    } else {
        console.log(`Produto "${nomeProduto}" não encontrado no catálogo.`);
    }
}

buscarProduto('Camiseta');
buscarProduto('Bermuda');
buscarProduto('Tênis');