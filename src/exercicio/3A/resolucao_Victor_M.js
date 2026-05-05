const logsDeAcesso = [
    { usuario: "admin", status: "sucesso" },
    { usuario: "willer_barros_senai", status: "erro" },
    { usuario: "arthur_basilio_senai", status: "erro" },
    { usuario: "neymar junior", status: "erro" },
    { usuario: "kallany_gretchen_senai", status: "sucesso" },
];

let erros = 0;

for (let i = 0; i < logsDeAcesso.length; i++) {
    if (logsDeAcesso[i].status === "erro") {
        erros++;
    }
}

console.log("Total de erros:", erros);

if (erros > 2) {
    console.log("ALERTA DE SEGURANÇA");
}