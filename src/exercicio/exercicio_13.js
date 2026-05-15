const precos = [100, 250, 80, 120];

precos.forEach((preco) => {
  const precoComDesconto = preco * 0.9;

  console.log(`Preco com desconto: R$ ${precoComDesconto.toFixed(2)}`);
});
