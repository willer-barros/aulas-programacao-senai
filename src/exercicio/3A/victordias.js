const logsDeAcesso = [
  {usuario: "admin",            status: "sucesso"},
  {usuario: "willer_barros",    status: "erro"},
  {usuario: "arthur_basilio",   status: "erro"},
  {usuario: "neymar_junior",    status: "erro"},
  {usuario: "kallany_gretchen", status: "sucesso"},
];

let contadorErros = 0;

for (let i = 0; i < logsDeAcesso.length; i++) {
  const log = logsDeAcesso[i];

  if (log.status === "erro") {
    contadorErros++;
  }
}

console.log("===== RELATÓRIO DE ACESSOS =====");
console.log(`Total de registros : ${logsDeAcesso.length}`);
console.log(`Acessos com sucesso: ${logsDeAcesso.length - contadorErros}`);
console.log(`Erros de login     : ${contadorErros}`);

if (contadorErros > 2) {
  console.warn("ALERTA DE SEGURANÇA: Múltiplas tentativas de login com falha detectadas!");
}