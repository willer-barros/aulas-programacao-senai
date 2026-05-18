const produtos = {
    'Camiseta': 49.90,
    'Calça': 99.90,
    'Tênis': 199.90
};

const produtoProcurado = "Calça";

if (produtos.hasOwnProperty(produtoProcurado)) {
    console.log("Produto encontrado! Preço: R$" + produtos[produtoProcurado]);
} else {
    console.log("Produto não encontrado.");
}