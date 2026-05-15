const estoque = [
    { nome: "Motor V8", categoria: "A", quantidade: 5 },
    { nome: "Amortecedor", categoria: "A", quantidade: 12 },
    { nome: "Freio ABC", categoria: "B", quantidade: 8 },
    { nome: "Correia Dentada", categoria: "C", quantidade: 3 }
]

console.log("--- Estoque de Peças ---")

estoque.forEach((peca) => {
    console.log(`${peca.nome} | Categoria: ${peca.categoria} | Quantidade: ${peca.quantidade}`)
})