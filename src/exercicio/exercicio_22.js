// API de Catálogo de Filmes com Filtros (Query Params)
// Objetivo: Aprender a capturar parâmetros de busca na URL utilizando req.query.

// Estrutura do Objeto: { id: 1, titulo: "Inception", genero: "Ficção", ano: 2010 }

// Povoamento: Inicie o array com pelo menos 5 filmes de gêneros e anos diferentes.

// Endpoints a criar:

// GET /filmes: Este endpoint deve ser inteligente.

// Se o usuário acessar /filmes, retorna todos.

// Se o usuário acessar /filmes?genero=Ficção, deve retornar apenas os filmes desse gênero.

// Se acessar /filmes?ano=2010, retorna apenas os daquele ano.

//Testar via postman

// Desafio Técnico: Use o método .filter() do JavaScript para aplicar os filtros dinamicamente caso as variáveis cheguem através do req.query.