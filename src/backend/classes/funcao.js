
//essa eh uma funcao simples que multiplica os numeros e valida se 
// foram inseridos apenas numeros
function multi(a, b) {
    console.log("Iniciando a multiplicacoa");

    if (typeof a !== 'number' || typeof b !== 'number') {
        return "Erro: Por favor, insira apenas numeros.";
    }

    const resultado = a * b;

    return resultado;
}

const resultadoFinal = multi(5, 8);
console.log(resultadoFinal);