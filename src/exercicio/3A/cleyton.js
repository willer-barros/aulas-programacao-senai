// toda vez que voce resolver um exercicio, coloque resolucao_seu_nome.js na pasta da sua turma

const logsDeAcesso = [
    { usuario: "admin", status: "sucesso" },
    { usuario: "willer_barros_senai", status: "erro" },
    { usuario: "arthur_basilio_senai", status: "erro" },
    { usuario: "neymar junior", status: "erro" },
    { usuario: "kallany_gretchen_senai", status: "sucesso" }
];

let totalErros = 0;

for (let i = 0; i < logsDeAcesso.length; i++) {
    if (logsDeAcesso[i].status === "erro") {
        totalErros++;
    }
}

console.log("Relatorio de acesso");
console.log("Total de tentativas:", logsDeAcesso.length);
console.log("Total de erros:", totalErros);
console.log("Total de sucessos:", logsDeAcesso.length - totalErros);

if (totalErros > 2) {
    console.log(" Numero de erros suspeito!");
}
