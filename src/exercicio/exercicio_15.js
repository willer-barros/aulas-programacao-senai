// 2. Buscar e Verificar Chaves no Dicionário
// Verifique se um produto existe e retorne uma mensagem personalizada.
//voce deve usar a funcao hasOwnProperty()

const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

const busca = 'Tênis';

if (produtos.hasOwnProperty(busca)) {
    console.log(`Produto "${busca}" encontrado! Preço: R$ ${produtos[busca].toFixed(2)}`);
} else {
    console.log(`Produto "${busca}" não encontrado no catálogo.`);
}