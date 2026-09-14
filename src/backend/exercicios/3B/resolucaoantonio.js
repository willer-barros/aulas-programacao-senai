const logsDeAcesso = [
    { usuario: "admin", status: "sucesso" },
    { usuario: "willer_barros_senai", status: "erro" },
    { usuario: "arthur_basilio_senai", status: "erro" },
    { usuario: "neymar junior", status: "erro" },
    { usuario: "kallany_gretchen_senai", status: "sucesso" }
];

let contador = 0;
let erros = 0;

while (contador < logsDeAcesso.length) {
    if (logsDeAcesso[contador].status === "erro") {
        erros++
    }
    contador++
}
console.log("Total de Erros: " + erros)
if (erros > 2) {
    console.log("ALERTA! Enviando Relatório...")
}
else {
    console.log("Sem erro de segurança crítico.")
}
