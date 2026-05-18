// Simule um catálogo de produtos onde cada chave é o nome do produto e o valor é o preço. 

// Cria um dicionário (objeto) de produtos

const catalogoProdutos = {
    "Notebook": 3500.00,
    "Smartphone": 1899.90,
    "Fone de Ouvido": 249.90,
    "Teclado Mecânico": 420.00,
    "Mouse Wireless": 150.00
};

console.log("--- Catálogo de Produtos ---");

const produtoBuscado = "Smartphone";
console.log(`O preço do ${produtoBuscado} é: R$ ${catalogoProdutos[produtoBuscado].toFixed(2)}`);

catalogoProdutos["Monitor 24"] = 899.00;

console.log("\nCatálogo Atualizado:", catalogoProdutos);
