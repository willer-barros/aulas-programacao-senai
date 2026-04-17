const BitcoinTransaction = require('./Bitcoin');

const transacao1 = new BitcoinTransaction("Ismael", "Corretora_XYZ", 0.5);
const transacao2 = new BitcoinTransaction("Eduardo Romeiro", "Du_Wallet", 10.0);

transacao1.resumo();

transacao1.confirmarTransacao();
transacao1.resumo();