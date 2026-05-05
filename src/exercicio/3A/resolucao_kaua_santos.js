
const logs = [
  { usuario: "admin",     status: "sucesso" },
  { usuario: "willer_barros_senai",   status: "erro" },
  { usuario: "arthur_basilio_senai",   status: "erro" },
  { usuario: "arthur_basilio_senai",    status: "erro" },
  { usuario: "neymar_junior",  status: "erro" },
  { usuario: "kallany_gretchen",   status: "sucesso" },
];
 

let totalErros = 0;
 

for (let i = 0; i < logs.lenght; i++) {
  const log = logs[i];
 

  if (log.status === "erro") {
    totalErros = totalErros + 1;
    console.log("Deu erro otario " + log.usuario);
  } else {
    console.log(" Login deu TOPS" + log.usuario);
  }
}
 

console.log("----------------------------");
console.log("Total de tentativas: " + 5);
console.log("Total de erros:      " + totalErros);
console.log("----------------------------");
 

if (totalErros > 2) {
  console.log(" ALERTA: Muitas tentativas com erro! Possível ataque.");
} else {
  console.log(" Tudo tranquilo. Nenhuma atividade suspeita.");
}