// 3. Iterar com forEach() e Aplicar Operações

const precos = [100, 250, 80, 120];

precos.forEach((preco) => {
    const precoComDesconto = preco - (preco * 0.10);

    console.log("Preço original: R$" + preco);
    console.log("Preço com desconto: R$" + precoComDesconto);
});