const numeros = [10, 20, 30, 40, 50]
const numeroBuscado = 30

if (numeros.includes(numeroBuscado)) {
    const posicao = numeros.indexOf(numeroBuscado)
    console.log(`O número ${numeroBuscado} está presente na posição ${posicao}.`)
} else {
    console.log(`O número ${numeroBuscado} não foi encontrado.`)
}
