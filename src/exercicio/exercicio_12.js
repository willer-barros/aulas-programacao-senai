// 2. Verificar Presença e Índice com includes() e indexOf()
// Verifique se um número está presente em um array e retorne sua posição. 
const valor = Number(prompt("Digita aí Willer: "))
const numeros = [10, 20, 30, 40, 50];
const include = numeros.includes(valor)
const indexOf = numeros.indexOf(valor)
if (include) {
    console.log(`O número ${valor} está presente no array.`)
    console.log(`A posição do número ${valor} é: ${indexOf}`)
}
else{
    console.log("ta aqui nao man")
}