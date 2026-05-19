const produtos = [
    { nome: "Camiseta", preco: 39.90 },
    { nome: "Tênis Esportivo", preco: 189.90 },
    { nome: "Caneca Nerd", preco: 25.00 },
    { nome: "Fone de Ouvido Bluetooth", preco: 120.00 },
    { nome: "Caderno Universitário", preco: 15.50 }
];


const produtosCaros = produtos.filter(produto => {
    return produto.preco > 50.00;
});


console.log("Produtos que custam mais de R$ 50,00:");
console.log(produtosCaros);