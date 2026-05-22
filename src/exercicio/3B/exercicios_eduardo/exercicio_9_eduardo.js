let contador = 1

const intervalo = setInterval(() => {
    console.log(contador)
    contador++

    if (contador > 5) {
        clearInterval(intervalo)
    }
}, 1000)
