const estudantes = [
    { nome: "Ana", idade: 18, nota: 8.5 },
    { nome: "Pedro", idade: 17, nota: 6.0 },
    { nome: "Julia", idade: 19, nota: 9.0 },
    { nome: "Marcos", idade: 18, nota: 5.5 }
]

const aprovados = estudantes
    .filter(estudante => estudante.nota >= 7.0)
    .map(estudante => estudante.nome)

console.log(aprovados)
