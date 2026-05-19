class BitcoinTransaction {
  constructor(remetente, destinatario, valor) {
    this.remetente = remetente;
    this.destinatario = destinatario;
    this.valor = valor;
    this.taxa = valor * 0.001;
    this.confirmada = false;
  }

  confirmarTransacao() {
    this.confirmada = true;
    console.log(`Sucesso! ${this.valor} BTC enviados de ${this.remetente} para ${this.destinatario}.`);
  }

  resumo() {
    const status = this.confirmada ? "Confirmada" : "Pendente";
    console.log(`Transação: ${this.valor} BTC | Status: ${status} | Taxa: ${this.taxa} BTC`);
  }
}