const estoque = [
    { nome: "Motor V8 Turbo", categoria: "A", quantidade: 5, preco: 18500.00, fornecedor: "AutoPeças Brasil" },
    { nome: "Amortecedor Dianteiro", categoria: "A", quantidade: 12, preco: 420.00, fornecedor: "Suspensões Ltda" },
    { nome: "Freio ABS Premium", categoria: "B", quantidade: 30, preco: 275.50, fornecedor: "FreioTec" },
    { nome: "Correia Dentada Reforçada", categoria: "C", quantidade: 50, preco: 89.90, fornecedor: "Distribuidora Central" },
    { nome: "Radiador Alumínio", categoria: "A", quantidade: 8, preco: 630.00, fornecedor: "ThermoAuto" },
    { nome: "Bomba d'Água", categoria: "B", quantidade: 20, preco: 195.00, fornecedor: "HydroMotor" },
    { nome: "Filtro de Óleo", categoria: "C", quantidade: 100, preco: 32.00, fornecedor: "Distribuidora Central" },
    { nome: "Vela de Ignição NGK", categoria: "C", quantidade: 200, preco: 18.50, fornecedor: "ElectroPeças" },
    { nome: "Embreagem Completa", categoria: "A", quantidade: 7, preco: 980.00, fornecedor: "TransmiAuto" },
    { nome: "Sensor de Oxigênio", categoria: "B", quantidade: 25, preco: 145.00, fornecedor: "ElectroPeças" },
];

function listarPorCategoria(cat) {
    return estoque.filter(item => item.categoria === cat);
}

function totalEmEstoque() {
    return estoque.reduce((total, item) => total + item.quantidade * item.preco, 0);
}

function buscarPorNome(termo) {
    return estoque.filter(item => item.nome.toLowerCase().includes(termo.toLowerCase()));
}

module.exports = { estoque, listarPorCategoria, totalEmEstoque, buscarPorNome };
