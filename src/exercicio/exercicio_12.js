// 2. Verificar Presença e Índice com includes() e indexOf()

const numeros = [10, 20, 30, 40, 50]

const numeroProcurado = 30

if (numeros.includes(numeroProcurado)) {

    console.log("O número está presente no array")

    console.log("Posição:", numeros.indexOf(numeroProcurado))

} else {

    console.log("O número não foi encontrado")

}