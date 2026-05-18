// 2. Buscar e Verificar Chaves no Dicionário
// Verifique se um produto existe e retorne uma mensagem personalizada. 
//voce deve usar a funcao hasOwnProperty()

const catalogoProdutos = {
    "Notebook": 3500.00,
    "Smartphone": 1899.90,
    "Fone de Ouvido": 249.90
};

const produtoParaVerificar = "Smartphone";

console.log(`--- Verificando Estoque: ${produtoParaVerificar} ---`);

if (catalogoProdutos.hasOwnProperty(produtoParaVerificar)) {
    const preco = catalogoProdutos[produtoParaVerificar];
    console.log(`✅ Produto localizado! O ${produtoParaVerificar} está disponível e custa R$ ${preco.toFixed(2)}.`);
} else {
    console.log(`Desculpe, o produto "${produtoParaVerificar}" não foi encontrado no catálogo.`);
}
