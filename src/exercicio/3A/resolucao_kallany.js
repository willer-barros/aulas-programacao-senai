const logsDeAcesso = [
  { usuario: "admin", status: "sucesso" },
  { usuario: "willer_barros_senai", status: "erro" },
  { usuario: "arthur_basilio_senai", status: "erro" },
  { usuario: "neymar junior", status: "erro" },
  { usuario: "kallany_gretchen_senai", status: "sucesso" }
];

let contadorErros = 0;

for (let i = 0; i < logsDeAcesso.length; i++) {
  const log = logsDeAcesso[i];

  if (log.status === "erro") {
    contadorErros++;
    console.log(login falho: ${log.usuario});
  } else {
    console.log(Login deu boa: ${log.usuario});
  }
}

if (contadorErros > 2) {
    console.log(numero total de erros é: ${contadorErros});
}