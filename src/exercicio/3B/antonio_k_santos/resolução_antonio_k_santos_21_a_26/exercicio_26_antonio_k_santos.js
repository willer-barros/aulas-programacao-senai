const estudantes = [
  { nome: "Antonio Kaue", idade: 18, nota: 8.7 },
  { nome: "Kauany Bairros", idade: 17, nota: 9.2 },
  { nome: "Paula", idade: 19, nota: 6.5 },
  { nome: "Pedro", idade: 18, nota: 5.9 },
];

const aprovados = estudantes
  .filter((estudante) => estudante.nota >= 7)
  .map((estudante) => estudante.nome);

console.log(aprovados);
