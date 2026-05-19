const catalogo = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

const produtoProcurado = 'Boné';

console.log(`--- Verificando Disponibilidade: ${produtoProcurado} ---`);

if (catalogo.hasOwnProperty(produtoProcurado)) {
    const preco = catalogo[produtoProcurado];
    console.log(`🎉 Ótima notícia! Temos "${produtoProcurado}" em estoque. Valor: R$ ${preco.toFixed(2)}.`);
} else {
    console.log(`❌ Desculpe, o produto "${produtoProcurado}" não está disponível no momento.`);
}