const logsDeAcesso = [
  { usuario: "admin", status: "sucesso" },
  { usuario: "willer_barros_senai", status: "erro" },
  { usuario: "arthur_basilio_senai", status: "erro" },
  { usuario: "neymar junior", status: "erro" },
  { usuario: "kallany_gretchen_senai", status: "sucesso" }
];

console.log("--- Iniciando Análise de Logs ---");

logsDeAcesso.forEach(log => {
    if (log.status === "erro") {
        console.log(`ALERTA: Falha de acesso para: ${log.usuario}`);
    } else {
        console.log(`Acesso normal: ${log.usuario}`);
    }
});

const logsComErro = logsDeAcesso.filter(log => log.status === "erro");
const totalErros = logsComErro.length;

console.log("---------------------------------");
console.log(`Total de falhas encontradas: ${totalErros}`);

if (totalErros > 2) {
  console.log("STATUS DO SISTEMA: Bloqueio preventivo ativado!");
} else {
  console.log("STATUS DO SISTEMA: Operando normalmente.");
}