// 1. Adicionar e Remover Elementos com push() e shift()
// Simule uma fila de atendimento em uma clínica veterinária, onde os animais são atendidos na ordem de chegada.

// Cria um array vazio para representar a fila


let fila = []

let acao = String(process.argv[2])

let nomeDoAnimal = String(process.argv[3])


if(acao ==='adicionar'){
    fila.push(nomeDoAnimal);
    console.log("o pet",nomeDoAnimal,"está na fila");
}else if(acao === 'remover'){
    let animalAtendido = fila.shift();
    console.log(animalAtendido,"foi chamado pro consultorio");
}else{
    console.log("comando invalido tente novamente")
}


console.log("fil atual:", fila)


