let contador = 1;


const temporizador = setInterval(() => {
    console.log(contador);


    if (contador === 5) {
        clearInterval(temporizador);
        console.log("Fim do contador!");
    }


    contador++;
}, 1000);