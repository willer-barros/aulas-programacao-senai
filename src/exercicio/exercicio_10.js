// 1. Variáveis e Dados (Array de Objetos)
const logsDeAcesso = [
  { usuario: "admin", status: "sucesso" },
  { usuario: "willer", status: "erro" },
  { usuario: "kaua", status: "erro" },
  { usuario: "silva", status: "erro" },
  { usuario: "cpero", status: "sucesso" }
];

let totalErros = 0;

console.log("--- Iniciando Análise de Logs ---");

for (const log of logsDeAcesso) {
  if (log.status === "erro") {
    console.log(`ALERTA: Falha de acesso detectada para o usuário: ${log.usuario}`);
    totalErros = totalErros + 1;
  } else {
    console.log(`Acesso normal: ${log.usuario}`);
  }
}

console.log("---------------------------------");
console.log(`Total de falhas encontradas: ${totalErros}`);

if (totalErros > 2) {
  console.log("STATUS DO SISTEMA: Bloqueio preventivo ativado! (Muitas falhas)");
} else {
  console.log("STATUS DO SISTEMA: Operando normalmente.");
}