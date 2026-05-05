// 1. Array com os logs de tentativas de login
const logs = [
  { usuario: "admin",    status: "sucesso" },
  { usuario: "willer_barros_senai",  status: "erro" },
  { usuario: "arthur_basilio",  status: "erro" },
  { usuario: "neymar_junior",   status: "erro" },
  { usuario: "kallany_gretchen", status: "sucesso" },
];

//contador de erros
let totalErros = 0;

//repetição
for (const log of logs) {
    if (log.status === "erro"){
        console.log (`erro detectado ${log.usuario}`);
        totalErros = totalErros + 1
    }

else {
    console.log (`acesso normal ${log.usuario}`)
}
}

//alerta

if (totalErros>2){
    console.log("atividade suspeita")
}
else {
    console.log ("tudo normal")
}

