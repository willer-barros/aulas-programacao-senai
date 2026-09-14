// Um dicionário (ou dict) é uma estrutura de dados que armazena pares de chave-valor, onde cada chave é única e usada para acessar seu valor correspondente.  Diferente de arrays, que usam índices numéricos, os dicionários permitem o acesso aos dados por meio de chaves, que podem ser strings, números ou outros tipos imutáveis. 

// 1. Em Objetos (chave-valor)
// Adicionar/Atualizar:
// obj.chave = valor ou obj['chave'] = valor 
// Remover:
// delete obj.chave
// Verificar existência:
// obj.hasOwnProperty('chave') ou 'chave' in obj 
// Acessar chaves, valores e entradas:
// Object.keys(obj) → array de chaves
// Object.values(obj) → array de valores
// Object.entries(obj) → array de [chave, valor] 
// Iterar:
// for (const [k, v] of Object.entries(obj)) { ... }

// 2. Em Map (alternativa moderna)
// Adicionar: map.set(chave, valor)
// Ler: map.get(chave)
// Verificar: map.has(chave)
// Remover: map.delete(chave)
// Tamanho: map.size
// Iterar:
// for (const [k, v] of map) { ... }

// Por exemplo

const pessoa = {
    nome: "Ana",
    idade: 30,
    cidade: "São Paulo"
};

console.log(pessoa.nome); // Saída: Ana