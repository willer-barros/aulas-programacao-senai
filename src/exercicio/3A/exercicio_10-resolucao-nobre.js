/*
Exercício: Sistema de Monitoramento de Acessos
el de total de erros.
Contexto:
Você trabalha na equipe de segurança da informação de uma empresa e precisa analisar as tentativas de login (logs) no sistema interno. Caso o sistema identifique muitas falhas de acesso, ele deve emitir um alerta e ativar um bloqueio preventivo.

Tarefa:
Escreva um programa em JavaScript que analise uma lista de acessos. O ponto de partida do seu código deve ser o seguinte array de objetos:

1. Crie uma variável (contador) para rastrear o total de erros encontrados, iniciando em 0.
2. Imprima no console a mensagem inicial: "--- Iniciando Análise de Logs ---".
3. Crie um laço de repetição (como o for...of) para percorrer cada objeto dentro do array `logsDeAcesso`.
4. Dentro do laço, verifique o status de cada log:
   - Se o status for "erro", imprima a mensagem "ALERTA: Falha de acesso detectada para o usuário: [nome do usuario]" e adicione 1 à sua variáv
   - Caso contrário (sucesso), imprima "Acesso normal: [nome do usuario]".
5. Após o laço terminar, imprima uma linha separadora: "---------------------------------".
6. Imprima o total de erros contados no formato: "Total de falhas encontradas: [total]".
7. Por fim, adicione uma regra de segurança:
   - Se o total de erros for maior que 2, o sistema deve imprimir: "STATUS DO SISTEMA: Bloqueio preventivo ativado! (Muitas falhas)".
   - Caso contrário, imprima: "STATUS DO SISTEMA: Operando normalmente.".
*/

// 1. Variáveis e Dados (Array de Objetos)
const logsDeAcesso = [
   { usuario: "admin", status: "sucesso" },
   { usuario: "nobre", status: "erro" },
   { usuario: "diogo", status: "erro" },
   { usuario: "henrique", status: "erro" },
   { usuario: "vitao", status: "sucesso" }
];

let totalDeErros = 0;

// Escreva sua lógica abaixo:


function monitoramento() {
   for (const log of logsDeAcesso) {
      if (log.status === 'erro') {
         console.log('ALERTA: Falha de acesso detectada para o usuário:', log.usuario);
         totalDeErros++;

      } else {
         console.log('Acesso normal:', log.usuario)
      }

   };

   console.log("---------------------------------");

   console.log(totalDeErros);

   if (totalDeErros > 2) {
      console.log("STATUS DO SISTEMA: Bloqueio preventivo ativado! (Muitas falhas)")

   } else {
      console.log("STATUS DO SISTEMA: Operando normalmente.")

   }
}

monitoramento()