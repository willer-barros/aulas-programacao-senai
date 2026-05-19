const precos = [100, 250, 80, 120];

console.log("Preços originais:", precos);


precos.forEach((precoAtual, index) => {
    const desconto = precoAtual * 0.10; 
    const novoPreco = precoAtual - desconto; 
    
    precos[index] = novoPreco;
});

console.log("Preços com 10% de desconto:", precos);
