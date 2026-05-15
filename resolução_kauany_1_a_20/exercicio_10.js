const logsDeAcesso = [
    { usuario: "admin", status: "sucesso" },
    { usuario: "willer_barros_senai", status: "erro" },
    { usuario: "arthur_basilio_senai", status: "erro" },
    { usuario: "neymar junior", status: "erro" },
    { usuario: "kallany_gretchen_senai", status: "sucesso" }
]

let totalErros = 0

console.log("--- Análise de Logs ---")

for (const log of logsDeAcesso) {
    if (log.status === "erro") {
        totalErros++
        console.log(`ALERTA: Falha de acesso - ${log.usuario}`)
    } else {
        console.log(`OK: Acesso permitido - ${log.usuario}`)
    }
}

console.log("-----------------------")
console.log(`Total de falhas: ${totalErros}`)

const statusSistema = totalErros > 2
    ? "Bloqueio preventivo ativado! Muitas falhas detectadas."
    : "Sistema operando normalmente."

console.log(`STATUS DO SISTEMA: ${statusSistema}`)