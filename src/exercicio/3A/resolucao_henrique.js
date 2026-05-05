let contador = 0;
let erros = 0;

const logsDeAcesso = [
    { usuario: "admin", status: "sucesso" },
    { usuario: "willer_barros_senai", status: "erro" },
    { usuario: "arthur_basilio_senai", status: "erro" },
    { usuario: "neymar junior", status: "sucesso" },
    { usuario: "kallany_gretchen_senai", status: "sucesso" }
];


while (contador < logsDeAcesso.length) {
    
    if (logsDeAcesso[contador].status === "erro") {
        erros++
    }
    
    contador++
}

if (erros > 2) {
    console.log("Cuidado! Você possui mais de 2 erros!")
} else {
    console.log ("Seu total de erros foram:" + erros)
}

