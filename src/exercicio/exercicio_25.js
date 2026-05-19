// Atividade: API de Checkout e Cupons (E-commerce)
// Objetivo: Criar os endpoints de um sistema que calcula o valor final de uma compra aplicando cupons de desconto, simulando as regras de integridade de um e-commerce.

// 📋 Estrutura dos Dados (Arrays em memória)
// Você terá dois arrays globais no seu arquivo:

// JavaScript
// // Cupons válidos no sistema
// let cupons = [
//   { codigo: "PROMO10", descontoPercentual: 10, ativo: true },
//   { codigo: "DEV20", descontoPercentual: 20, ativo: true },
//   { codigo: "EXPIRADO50", descontoPercentual: 50, ativo: false }
// ];

// // Itens atualmente no carrinho do cliente
// let carrinho = [
//   { id: 1, produto: "Mouse Gamer", preco: 150.00, quantidade: 2 },
//   { id: 2, produto: "Teclado Mecânico", preco: 350.00, quantidade: 1 }
// ];
// 🛠️ Endpoints a Criar
// GET /carrinho

// O que faz: Retorna os itens atuais do carrinho e o subtotal bruto (soma de preco * quantidade de todos os itens), sem desconto.

// POST /carrinho

// O que faz: Adiciona um novo produto ao carrinho.

// Regra de validação: Se o produto já existir no carrinho (mesmo id), em vez de adicionar um novo objeto, você deve somar a quantidade enviada à quantidade que já existia lá.

// POST /checkout

// O que faz: Finaliza a compra. Este endpoint recebe no corpo da requisição (req.body) apenas o código do cupom (ex: { "cupom": "PROMO10" }). O cupom também pode vir vazio.

// O que deve retornar: Um resumo financeiro contendo:

// O valor bruto total dos itens.

// O valor do desconto aplicado (em Reais).

// O valor final a ser pago.

// ⚠️ Regras de Negócio e Validações Críticas (O Desafio do Exercício)
// No endpoint POST /checkout, sua API precisa validar três cenários antes de calcular o valor final:

// Validação 1 (Carrinho Vazio): Se o array carrinho estiver vazio, retorne status 400 (Bad Request) com a mensagem "Não é possível finalizar um carrinho vazio".

// Validação 2 (Cupom Inexistente): Se o usuário enviar um código de cupom que não existe no array cupons, retorne status 404 (Not Found) com a mensagem "Cupom inválido".

// Validação 3 (Cupom Inativo): Se o cupom existir, mas o campo ativo for false, retorne status 400 (Bad Request) com a mensagem "Este cupom já expirou".

// 💡 Exemplo de Retorno Esperado no /checkout (Sucesso)
// Se o cliente enviar o cupom "PROMO10" para o carrinho padrão acima (Bruto: R$ 650,00):

// JSON
// {
//   "mensagem": "Checkout calculado com sucesso!",
//   "totalBruto": 650.00,
//   "descontoAplicado": 65.00,
//   "totalAPagar": 585.00
// }
// 🔍 Conceitos que você vai praticar aqui:
// Método .reduce() para somar os valores do carrinho.

// Método .find() para buscar o cupom correto dentro do array de cupons.

// Tratamento rigoroso de condicionais (if/else) para garantir as regras de segurança do e-commerce.

const express = require('express');
const app = express();
app.use(express.json());

// cupons válidos no sistema
let cupons = [
  { codigo: "PROMO10", descontoPercentual: 10, ativo: true },
  { codigo: "DEV20", descontoPercentual: 20, ativo: true },
  { codigo: "EXPIRADO50", descontoPercentual: 50, ativo: false }
];

// itens atualmente no carrinho do cliente
let carrinho = [
  { id: 1, produto: "Mouse Gamer", preco: 150.00, quantidade: 2 },
  { id: 2, produto: "Teclado Mecânico", preco: 350.00, quantidade: 1 }
];

// utilitário: calcula subtotal bruto do carrinho
function calcularSubtotal() {
    return carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
}

// GET /carrinho -> retorna itens e subtotal bruto
app.get('/carrinho', (req, res) => {
    const subtotal = Number(calcularSubtotal().toFixed(2));
    res.json({ itens: carrinho, subtotal });
});

// POST /carrinho -> adiciona item ou soma a quantidade se já existir
app.post('/carrinho', (req, res) => {
    const { id, produto, preco, quantidade } = req.body;

    if (id === undefined || produto === undefined || preco === undefined || quantidade === undefined) {
        return res.status(400).json({ erro: 'Campos obrigatórios: id, produto, preco, quantidade' });
    }

    const idNum = Number(id);
    const precoNum = Number(preco);
    const qtdNum = Number(quantidade);

    if (Number.isNaN(idNum) || typeof produto !== 'string' || produto.trim() === '' ||
        Number.isNaN(precoNum) || precoNum <= 0 || Number.isNaN(qtdNum) || qtdNum <= 0) {
        return res.status(400).json({ erro: 'Dados inválidos do produto' });
    }

    const existente = carrinho.find(item => item.id === idNum);
    if (existente) {
        existente.quantidade += qtdNum;
        // opcional: atualizar nome/preço caso diferentes
        existente.produto = produto.trim();
        existente.preco = precoNum;
        return res.status(200).json(existente);
    }

    const novoItem = { id: idNum, produto: produto.trim(), preco: precoNum, quantidade: qtdNum };
    carrinho.push(novoItem);
    res.status(201).json(novoItem);
});

// POST /checkout -> finaliza compra aplicando cupom (cupom pode ser vazio)
app.post('/checkout', (req, res) => {
    const { cupom } = req.body;

    // Validação 1: carrinho vazio
    if (!carrinho || carrinho.length === 0) {
        return res.status(400).json({ erro: 'Não é possível finalizar um carrinho vazio' });
    }

    const totalBruto = Number(calcularSubtotal().toFixed(2));
    let descontoAplicado = 0;
    let totalAPagar = totalBruto;

    if (cupom && String(cupom).trim() !== '') {
        const codigo = String(cupom).trim().toUpperCase();
        const encontrado = cupons.find(c => c.codigo.toUpperCase() === codigo);

        // Validação 2: cupom inexistente
        if (!encontrado) {
            return res.status(404).json({ erro: 'Cupom inválido' });
        }

        // Validação 3: cupom inativo
        if (!encontrado.ativo) {
            return res.status(400).json({ erro: 'Este cupom já expirou' });
        }

        descontoAplicado = Number((totalBruto * (encontrado.descontoPercentual / 100)).toFixed(2));
        totalAPagar = Number((totalBruto - descontoAplicado).toFixed(2));
    }

    res.json({
        mensagem: 'Checkout calculado com sucesso!',
        totalBruto,
        descontoAplicado,
        totalAPagar
    });
});

// endpoint opcional para listar cupons (útil para testes)
app.get('/cupons', (req, res) => res.json(cupons));

// inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API de checkout rodando em http://localhost:${PORT}`);
});