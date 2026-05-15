const numeros = [10, 20, 30, 40, 50];

const numeroProcurado = 30;

if (numeros.includes(numeroProcurado)) {
  console.log(`O numero ${numeroProcurado} esta na posicao ${numeros.indexOf(numeroProcurado)}.`);
} else {
  console.log(`O numero ${numeroProcurado} nao foi encontrado.`);
}
