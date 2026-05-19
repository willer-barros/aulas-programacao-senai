// 2. Buscar e Verificar Chaves no Dicionário
// Verifique se um produto existe e retorne uma mensagem personalizada. 
//voce deve usar a funcao hasOwnProperty()

const produtos = {
    "Notebook": 3000,
    "Mouse": 50,
    "Teclado": 150,
    "Monitor": 800
};

const produtoProcurado = "Notebook";

if (produtos.hasOwnProperty(produtoProcurado)) {
    console.log(`O produto "${produtoProcurado}" existe no dicionário.`);
} else {
    console.log(`O produto "${produtoProcurado}" não existe no dicionário.`);
}