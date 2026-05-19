// 2. Verificar Presença e Índice com includes() e indexOf()
// Verifique se um número está presente em um array e retorne sua posição. 

const numeros = [10, 20, 30, 40, 50]

const numeroProcurado = 30

if (numeros.includes(numeroProcurado)) {
    console.log("Número encontrado na posição:", numeros.indexOf(numeroProcurado))
} else {
    console.log("Número não encontrado")
}