const logsDeAcesso = [
    {usuario: "admin", status: "sucesso"},
    {usuario: "willer_barros_senai", status: "erro"},
    {usuario: "morso", status: "erro"},
    {usuario: "mosquito", status: "erro"},
    {usuario: "zeca urubu", status: "sucesso"},
];

const falhas = logsDeAcesso.filter(log => log.status === "erro");

console.log(falhas);