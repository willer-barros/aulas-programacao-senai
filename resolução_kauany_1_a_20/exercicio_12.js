const numeros = [10, 20, 30, 40, 50]

const numeroProcurado = 30

if (numeros.includes(numeroProcurado)) {
    console.log("Número encontrado na posição: " + numeros.indexOf(numeroProcurado))
} else {
    console.log("Número não encontrado")
}