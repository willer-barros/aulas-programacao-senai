const numeros = [10, 20, 30, 40, 50]

const busca = 30

if (numeros.includes(busca)) {
    console.log("O número " + busca + " está na posição " + numeros.indexOf(busca))
} else {
    console.log("O número " + busca + " não foi encontrado")
}
