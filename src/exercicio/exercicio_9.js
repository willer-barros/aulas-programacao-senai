// Crie um script que exiba um contador de 1 a 5 no console, com intervalo de 1 segundo entre cada número, e pare ao chegar no 5.

let count = 1;

const interval = setInterval(() => {
    console.log(count);
    if (count === 5) {
        clearInterval(interval);
    }
    count++;
}, 1000);