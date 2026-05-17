

let contador = 1

const intervalo = setInterval(() => {
    console.log(contador)

    if (contador === 5) {
        clearInterval(intervalo)
    }

    contador++
}, 1000)