// Crie um script que exiba um contador de 1 a 5 no console, com intervalo de 1 segundo entre cada número, e pare ao chegar no 5.

let contador = 1;

const intervalo = setInterval(() => {
    console.log(contador);

    if (contador === 5) {
        clearInterval(intervalo);
    }

    contador++;
}, 1000);